# A-36 – Tastatur ohne Springen: Fall-Liste (Korrektur AppDesign 4.28.1 / Reiselogbuch 3.26.1)

**Stand 20.10.2026** · Sitzung Reiselogbuch 0020 · Grundlage: `arbeit/A-36 Analyse P-60.md` und die drei Messungen in `tests/messungen/`.
Ziel (Nutzer): **Kopfzeile, Suchzeile, Seitenleiste und Fensterkopf stehen beim Öffnen und Schließen der Tastatur in jedem Bild
still**; das Fenster bleibt mittig; die Kapsel steht über der Tastatur. Erst Muster am Gerät mit Messung, dann Ja zum Bau.

## 1. Was die Messungen zusätzlich zeigen (Nachtrag zur Analyse)

| Messung | Feld | `sy` = `vt` | `ih` | `vh` | Raum (Höhe − `vh`) | verschoben |
|---|---|---|---|---|---|---|
| iPhone hoch, Fenster | Ort | 403 | 409 | 409 | 403 | ganz |
| iPad quer, Fenster | Ort | 428 | 374 | 374 | 428 | ganz |
| iPhone quer, Inhalt | Gesamtausgaben (Ziffern) | 232 | 170 | 170 | 232 | ganz |
| iPhone quer, Fenster | Ort | 225 | 177 | 126 | 276 | **nur 225** |
| iPhone quer, Suche oben | Suche | 21 | 381 | 126 | 276 | 21 (Schub, kein Verschieben) |

- **Safari rollt dabei die Seite selbst** (`scrollY` = `offsetTop`), obwohl `html`/`body` `overflow: hidden` haben.
- **`innerHeight` = Bildschirmhöhe − `scrollY`** (in allen fünf Fällen genau). Daraus folgt der Fehler der Kapsel:
  `--vv-bottom = innerHeight − top − h` wird 0 (Suche oben: 381 − 21 − 126 = 234 statt 255), richtig ist
  **`innerHeight + scrollY − top − h`** (= Bildschirmhöhe − top − h).
- Verschoben wird, **bis das Feld in der Mitte des sichtbaren Bereichs steht, höchstens um den ganzen Raum** (quer im Fenster nur
  225 – das Feld lag höher). ‚So weit wie nötig‘ ergäbe hoch nur 291 statt 403; ‚bis zur Mitte‘ trifft alle vier Messungen (im
  Modell quer im Fenster 223 statt 225). Ob Safari auch ein Feld **knapp über** der Tastatur in die Mitte stellt, ist nicht
  gemessen → Muster (V1 gegen V1m, Lineal).
- **Neu gefunden – Ursache P-60/5 (iPad-Fenster am linken Rand):** `isPhone()` in ui.js ist `innerWidth < 700 || innerHeight < 500`.
  Schrumpft `innerHeight` beim Verschieben auf 374, hält ui.js das iPad für ein iPhone: `html.phone`, Fenster über die ganze Breite
  (links 40 → 0 px), Neuaufbau. In der Nachbildung gezeigt (S-3). Abhilfe: Höhe ohne Tastatur (`innerHeight + scrollY`).
- **Quer schiebt Safari beim Fokus 21 px** (A-27 3; Messung 19.10. Zeile 11: Kopfzeile −21 bei der Suche oben, P-60/2), auch wenn
  das Feld sichtbar ist. Das Modell schiebt seit A-36 bei jedem Fokus quer – ob das für jedes Feld gilt, zeigt das Muster.

## 2. Lösung (Vorschlag) – Safari muss nie verschieben

Safari verschiebt nur, wenn das Feld beim Fokus **unter der künftigen Tastatur** liegt. Liegt es darüber, bleibt `offsetTop` 0
(iPad hoch, Suche hoch: ‚alles top‘). Deshalb:

| Variante | Was ui.js tut | Vorteil | Risiko |
|---|---|---|---|
| **V1 Feld vorher hoch** (Empfehlung) | Beim Antippen eines Felds (Ende der Berührung, vor dem Fokus) Rahmen bzw. Fenster schon so stellen wie nach der Tastatur: Rollbereich bekommt unten Platz in Tastaturhöhe und rollt das Feld 16 px über die künftige Tastatur; Fenster am iPad rückt in die künftige Mitte; erst dann Fokus | Inhalt bewegt sich einmal beim Antippen (wie in Apps von Apple), Leisten stehen | Tastaturhöhe muss vorher bekannt sein: gemessen je Gerät, Lage und Tastaturart (merkt sich ui.js nach dem ersten Öffnen); zu niedrig geschätzt → einmal Verschieben wie heute |
| **V1m Feld in die Mitte** | wie V1, das Feld rückt aber in die Mitte des künftigen sichtbaren Bereichs | hilft, falls Safari ein Feld knapp über der Tastatur trotzdem in die Mitte stellt (quer 21 px) | Inhalt rollt weiter als nötig |
| **V2 Ersatzfeld oben** | Beim Antippen erst ein unsichtbares Feld oben fokussieren (Tastatur geht auf, nichts verschiebt), nach der Meldung die genaue Höhe nehmen, Feld darüber stellen, Fokus aufs echte Feld | genaue Höhe, keine Schätzung | Tastaturart muss gleich sein (Ziffern), erste Tasten in 100 ms, mögliches Flackern der Tastatur |
| **V3 Systemweg** | Viewport `interactive-widget=resizes-content`; `navigator.virtualKeyboard` | kein eigener Code | Safari kennt beides vermutlich nicht – das Muster misst es |
| **Heute (4.28.0)** | Safari verschiebt, ui.js gleicht 2 Bilder später aus | – | springt (P-60) |

Dazu in allen Varianten:
- **K-Kapsel:** `--vv-bottom = innerHeight + scrollY − offsetTop − height` (Abschnitt 1).
- **∧ ∨ in der Tastaturleiste (iPhone):** bei offener Tastatur ist der Rahmen schon so hoch wie der sichtbare Bereich; ein Feld
  darunter liegt dann im Rollbereich, Safari rollt nur den Rollbereich – das Muster prüft es.
- **iPad-Fenster am linken Rand:** `isPhone()` nach der Höhe ohne Tastatur (Abschnitt 1).
- **Ein offenes Fenster macht alles außerhalb unbedienbar:** ein Ersatzfeld (V2) muss im Fenster stehen.

## 3. Fall-Liste (jeder Fall wird eine automatische Prüfung; ‚jedes Bild‘ = Aufnahme `__safari.bilder` von vor dem Antippen bis 600 ms nach der Meldung)

Gerät × Lage: iPhone hoch, iPhone quer, iPad quer, iPad hoch (nicht gemessen, nur am Gerät) · hell und dunkel ändern nichts an
der Lage (einmal hell, einmal dunkel im vollen Lauf wie immer).

| Nr. | Fall | Erwartet (in **jedem** Bild) | Prüfung |
|---|---|---|---|
| T-1 | Feld im **Fenster** unter der künftigen Tastatur antippen (Ort; iPhone hoch, iPhone quer, iPad quer) | Kopfzeile 0 ± 1, Fensterkopf an seiner Stelle ± 1, Seitenleiste (iPad) ± 1; Feld danach ganz über der Tastatur | neu `checkTastaturStill` (AppDesign `tests/ablauf.mjs`) |
| T-2 | Feld im **Inhalt** unter der künftigen Tastatur (Gesamtausgaben, Ziffern; iPhone quer und hoch) | Kopf- und Suchzeile ± 1; Feld 16 px über der Tastatur (R-4.5) | `checkTastaturStill` |
| T-3 | Feld **über** der künftigen Tastatur (Suche oben; Feld oben im Fenster) | nichts bewegt sich (wie heute iPad hoch) | `checkTastaturStill` |
| T-4 | **Tastatur schließen** (Fertig, Wischen) nach T-1 bis T-3 | Leisten ± 1 in jedem Bild; Fenster wieder mittig; Inhalt bleibt, wo er war | `checkTastaturStill` |
| T-5 | **Feld wechseln** bei offener Tastatur (anderes Feld antippen, ∧ ∨) | Leisten ± 1; neues Feld über der Tastatur | `checkTastaturStill` |
| T-6 | **iPad-Fenster** beim Öffnen und Schließen | links/rechts ± 1 (mittig), oben in der Mitte des sichtbaren Bereichs | `checkTastaturStill` |
| T-7 | **Kapsel** (Nach oben / Ans Ende) bei offener Tastatur | Unterkante ≤ Oberkante der Tastatur − 10 (iPhone hoch; quer mit Suche bleibt sie ausgeblendet – P-60/2) | `checkTastaturStill` + `checkFab` |
| T-8 | **Nachspielen** der drei Messungen (A-31): **jede Zeile**, auch ‚vv resize‘ | Kopfzeile auf dem Bildschirm 0 ± 1 (heute −403/−428/−232) | `spieleAb` mit `jedeZeile` |
| T-9 | Erstes Antippen ohne gemerkte Tastaturhöhe (neues Gerät, neue Lage) | Schätzung reicht (Feld nicht unter der Tastatur) | `checkTastaturStill` mit leerem Speicher |
| T-10 | Drehen bei offener Tastatur | Leisten nach dem Drehen ± 1, Höhe für die neue Lage | Gerät (Prüfliste), Modell kennt kein Drehen mit Tastatur |
| T-11 | Antippen und Wischen (Berührung bewegt sich) | kein Vorab-Rollen, kein Fokus | `checkTastaturStill` (Wischen auf einem Feld) |
| T-12 | Gegenprobe | ohne die Korrektur rot (gegen 4.28.0) | `--gegenprobe` |

Safari-Modell (`tests/safari.mjs`, Zusammenarbeit 0 Nr. 20) – zuerst ändern, damit T-1 bis T-8 gegen 4.28.0 rot werden:
- **S-1** Verschieben für **jedes** Feld unter der künftigen Tastatur (Inhalt **und Fenster**), so weit wie nötig, höchstens um den
  Raum (bisher nur der Rollbereich).
- **S-2** iPad quer: Tastatur 428 px (sichtbar 374 von 802); iPad hoch nicht gemessen.
- **S-3** `innerHeight` = Höhe − `scrollY` (bisher nicht nachgebildet).
- **S-4** Option `auto`: Fokus auf ein Feld öffnet die Tastatur im nächsten Bild, Fokus weg schließt sie (wie am Gerät).

## 4. Muster am Gerät (Zusammenarbeit 0 Nr. 20, vor dem Bau)

`https://g811141a.github.io/AppDesign/arbeit/A-36%20Muster.html?v=heute` – oben umschalten **Heute · V1 · V1m · V2 · V3**; Inhalt mit Feldern in mehreren Höhen (Lineal) und einem
Ziffernfeld unten, Kapsel, Fenster mit Feldern oben und unten (iPhone: ganzer Bildschirm, iPad: mittig). Das Muster zeigt nach
jedem Öffnen und Schließen der Tastatur sofort an: **‚still‘** oder **‚Sprung n px in k Bildern‘** (Kopfzeile, Fensterkopf,
Fenster links, Kapsel), und zeichnet jedes Bild auf (Teilen als Datei für Claude).

## 5. Stand 20.10.2026 (Sitzung 0020) – Prüfungen zuerst rot

- **Safari-Modell** S-1 bis S-4 umgesetzt (`tests/safari.mjs`, Arbeitsstand), **`checkTastaturStill`** (`tests/ablauf.mjs`),
  **`spieleAb … modell: true`** (`tests/abspielen.mjs`, T-8). Im Reiselogbuch neu `tests/ablauf-tastatur-still.mjs` (bis zum Bau
  gegen den Arbeitsstand von AppDesign, beim Bau gegen die Fassung 4.28.1); `ablauf-abspielen.mjs`: Grenze `bis` für die zwei neuen
  Messungen (Beenden der Messung im Menü), Gegenprobe ohne Suche über die Kopfzeile – grün wie bisher (vergleicht nur den Endzustand).
- **Gegen Reiselogbuch 3.26.0 / AppDesign 4.28.0 rot** (Chromium und WebKit gleich, 56 Fehler): Kopfzeile springt beim Antippen um
  −403 (iPhone hoch, Fenster und Gesamtausgaben), −276 (quer, Fenster), −232 (quer, Gesamtausgaben), −428 (iPad quer), beim Schließen
  zurück; Seitenleiste und Fensterkopf ebenso; **iPad-Fenster rutscht an den linken Rand (40 → 0 px)**; quer bei der Suche −21.
  T-8: alle drei Messungen Bild für Bild rot (−403, −428, −223/−21). Suche hoch (T-3): grün – dort verschiebt Safari nichts.
- **Probelauf des Musters im Modell** (Chromium und WebKit): Heute springt wie gemessen; **V1, V1m und V2 verschieben nicht** (iPhone
  hoch, iPad quer; iPad-Fenster bleibt mittig, Kapsel 16 px über der Tastatur); quer bleibt der 21-px-Schub (Modellannahme, offen);
  V3 wie Heute (das Modell kennt `interactive-widget` nicht – das zeigt nur das Gerät).

## 6. Grenzen

- Was Safari zwischen zwei Bildern zeigt, kennt die Prüfung nur aus dem Modell – deshalb Muster und Messung am Gerät.
- Drehen mit offener Tastatur, iPad hoch und Zifferntastatur hoch sind nicht gemessen → Muster bzw. Prüfliste.
