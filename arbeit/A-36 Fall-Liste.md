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

## 6. Erster Versuch am Gerät (20.10.2026) – ‚springt in verschiedensten Konstellationen‘

- **Fehler im Muster (Claude):** das Umschalten der Variante lud die Seite neu und verwarf die Messung – geteilt kamen nur die
  Läufe mit V3 an (iPhone hoch, iPad hoch). Welche Konstellationen bei Heute, V1, V1m und V2 sprangen, ist deshalb nicht gemessen.
- **V3 scheidet aus:** Safari kennt `interactive-widget=resizes-content` nicht (iPhone: verschiebt trotzdem 218 px), kein
  `navigator.virtualKeyboard`.
- **Regel bestätigt und geschärft (S-5):** Safari verschiebt nur, wenn das Feld **zu nah** über der künftigen Tastatur endet
  (iPad hoch: Ort endet 80 px darüber → nichts; iPhone quer Suche: 22–28 px → verschoben), und dann **bis zur Mitte** (iPhone hoch
  Ort 393–435 bei sichtbar 409 → Mitte 210, gemessen 218). Der 21-px-Schub quer ist dieselbe Regel (Suche 62–104 → 20 px). Der
  nötige Abstand liegt zwischen 29 und 80 px; das Modell nimmt vorsichtig 80 (`ABSTAND`), das Lineal misst ihn.
- **Warum V1 am Gerät sprang (Vermutung aus dem Modell mit der geschärften Regel):** V1 stellte das Feld nur **16 px** über die
  Tastatur – zu nah, Safari stellt es trotzdem in die Mitte; im iPhone-Fenster reichte zudem der Platz unter dem Inhalt nicht, um
  Ort hoch genug zu rollen; beim Schließen rutschte der Inhalt zurück (Rollstand gekürzt, als der Rahmen wuchs).
- **iPad hoch:** Tastatur 340 px (sichtbar 822 von 1162) – ins Modell und in die Schätzung übernommen.

**Muster 2. Fassung:** Umschalten ohne Neuladen, alle Varianten in einer Messung (bleibt auch beim Neuladen), Spalten Variante und
Lage des Felds mit Fokus. Varianten **Heute · V1 · Lineal**:
- **V1 neu:** Feld beim Antippen in die **obere Hälfte** des künftigen sichtbaren Bereichs (nie unter Kopf- bzw. Fensterkopf); dafür
  reichlich Platz unter dem Inhalt, danach genau so viel, dass der Rollstand bleibt – auch beim Schließen der Tastatur. iPad-Fenster:
  zuerst das Fenster höher, beim Schließen gleitet es in 0,25 s zurück in die Mitte.
- **Lineal:** Feld beim Antippen 24, 40, 56, 72, 88, 104 px über der künftigen Tastatur (je Antippen der nächste) – zeigt den Abstand,
  ab dem Safari nicht mehr verschiebt.
- Im Modell (Chromium und WebKit, `ABSTAND` 80): V1 still beim Öffnen und Schließen – iPhone hoch (Fenster und Inhalt), iPhone quer
  Gesamtausgaben, iPad quer (Fenster bleibt mittig). **Offen: iPhone quer im Fenster** – unter dem Fensterkopf (57 px) bleiben bei
  126 px Sicht nur 69 px; das Feld kann nicht weit genug über die Tastatur, Safari verschiebt ~23 px. Hängt am gemessenen Abstand.

## 6a. Zweiter Versuch am Gerät (20.10.2026, Muster 2. Fassung) – Auswertung Sitzung 0021

Messungen: `arbeit/A-36 Messungen/` (vier Dateien, alle Home-Bildschirm, je Fenster mit Heute, V1 und Lineal; Tastatur jeweils mit
‚Fertig‘ geschlossen, also zusammen mit dem Fenster). Nicht im Ordner `tests/messungen/` – anderes Format. Jedes Bild geprüft.

| Gerät | Variante · Feld | Feld beim Fokus (Abstand zur Tastatur) | Safari verschiebt | Leisten (Kopf / Seite / Fensterkopf) | Fenster links | Kapsel |
|---|---|---|---|---|---|---|
| iPhone hoch | Heute · Ort | 400–444 (−35) | **218** = Mitte | −218 auf, +218 zu (je 1–2 Bilder) | – | 135 px unter der Tastatur |
| iPhone hoch | V1 · Ort | 159–203 (206) | nichts | still | – | 16 px darüber |
| iPhone hoch | Lineal · Ort | 341–385 (**24**) | **nichts** | still | – | 16 px darüber |
| iPhone quer | Heute · Ort | 253–297 (−171) | **212** = Mitte | −212 auf, +212 zu | – | 28 px unter der Tastatur |
| iPhone quer | V1 · Ort | 67–111 (**15**) | **nichts** | still | – | 16 px darüber |
| iPhone quer | Lineal · Ort | 26–70 (56) | nichts | still; danach rollt der Inhalt 49 px (nur Lineal) | – | 16 px darüber |
| iPad quer | Heute · Ort | 527–571 (−197) | **362** = Mitte | −362 / −362 / 127 → −235; zu +362 | **327 → 0** | 30 px unter der Tastatur |
| iPad quer | V1 · Ort | 141–185 (189) | nichts | still (Fenster beim Antippen 127 → 10) | 327 still | 16 px darüber |
| iPad quer | Lineal · Ort | 306–350 (**24**) | **nichts** | still | 327 still | 16 px darüber |
| iPad hoch | Heute · Notiz | 788–832 (−10) | **340** = ganzer Raum (Mitte wäre 399) | −340 / −340 / 307 → −33; zu +340 | 147 still | 36 px darüber |
| iPad hoch | V1 · Ort | 365–409 (413) | nichts | still (Fenster beim Antippen **307 → 10**) | 147 still | 16 px darüber |
| iPad hoch | Lineal · Ort | 410–454 (368) | nichts | still | 147 still | 16 px darüber |

- **Bestätigt (Modell stimmt):** S-1 ‚bis zur Mitte, höchstens um den ganzen Raum‘ viermal genau (218, 212, 362; 340 begrenzt),
  S-3 (`innerHeight` = Höhe − `scrollY`), Kapsel-Fehler `--vv-bottom` (Heute: 135, 28 und 30 px unter der Tastatur), `isPhone()`
  schiebt das iPad-Fenster quer an den linken Rand (hoch nicht: `innerHeight` bleibt 822 ≥ 500), Tastatur 403 / 276 / 428 / 340 px.
- **V1 still beim Öffnen und Schließen in allen vier Lagen** (Schließen zusammen mit dem Fenster). Offene Frage aus 0020 – iPhone quer
  im Fenster – am Gerät geklärt: V1 stellt Ort 15 px über die Tastatur, Safari verschiebt **nicht**.
- **Abstand (S-5):** im Fenster verschiebt Safari bei 15, 24, 40–80 px nicht; nur das **Suchfeld der Kopfzeile** (Reiselogbuch
  3.25.1, quer, 0019) wurde bei 20 px verschoben (21 px). Eine einzige Grenze erklärt das nicht – entweder gilt für die Suche
  (`type=search`, feste Kopfzeile) etwas anderes, oder die Messung 0019 hatte eine andere Ursache. **Modell: `ABSTAND` 80 → 24**
  (sichere Seite: alles darüber nie verschoben); am Gerät zu klären mit der Suche im Muster quer.
  `ablauf-tastatur-still.mjs` gegen 3.26.0 weiter rot (59 Fehler, Chromium und WebKit).
- **Fehler im Muster (Claude):** die Bewertung ‚Tastatur zu‘ beginnt erst 50 ms nach dem Verlassen des Felds; die Meldung von Safari
  liegt oft davor – der Sprung fehlt (‚still ✓‘, die Zeilen zeigen +362 bzw. +340) oder wird vom gesprungenen Bild aus gemessen
  (‚bis 0 px‘ statt +218 bzw. +212). Die Rohzeilen stimmen; ausgewertet wurde aus den Zeilen.
- **Nur Messartefakt:** beim Öffnen des Fensters steht der Fensterkopf in der Zeile ‚focus dlgX‘ noch an der alten Stelle –
  `showModal` setzt den Fokus, bevor `place()` das Fenster stellt; im nächsten Bild richtig, nie gezeichnet.
- **Schwächen von V1 (für den Bau):**
  1. **iPad-Fenster springt beim Antippen ohne Übergang hoch** (quer 117 px, hoch 297 px) – hoch unnötig: Ort läge ohne V1 etwa
     71 px über der Tastatur, Safari hätte nichts verschoben. Besser: nur so weit wie nötig (≥ ABSTAND + Reserve), und das Fenster
     gleitet (0,25 s) – wie die Formularblätter von iPadOS.
  2. **Kapsel** springt beim Öffnen und Schließen sofort an die neue Stelle, während die Tastatur noch gleitet (1 Bild).
  3. **Im Modell: iPad, Tastatur zu bei offenem Fenster** – das Fenster wird fast bildschirmhoch (oben 20 statt 132 bzw. 312), weil
     der Platz unter dem Inhalt mit dem Fenster wächst. Abhilfe: Fensterhöhe wie vor dem Antippen. Am Gerät nicht gemessen.
- **Noch nicht gemessen:** Tastatur schließen bei offenem Fenster, Feld wechseln mit V1, Feld im Inhalt (Gesamtausgaben), Suche
  (vor allem quer), Lineal unter 24 px.

## 6b. Muster 3. Fassung (Zusammenarbeit 2.15.0, 0 Nr. 20) – Fall-Liste

**V1 neu** (aus 6a): beim Antippen rollt der Inhalt **nur so weit wie nötig** – das Feld endet mindestens **32 px** (ABSTAND 24 + 8
Reserve) über der künftigen Tastatur, nie über dem oberen Rand seines Bereichs (+8 px); liegt es schon so, bewegt sich nichts.
Das **iPad-Fenster bleibt beim Antippen stehen**; erst wenn die Tastatur da ist, **gleitet** es (0,25 s) in die Mitte des sichtbaren
Bereichs (nur wenn es verdeckt wäre) und beim Schließen zurück; seine **Höhe bleibt wie vor dem Antippen** (kein fast
bildschirmhohes Fenster mehr). Heute bleibt wie 4.28.0 zum Vergleich.

**Geführter Versuch** – je Lage (iPhone hoch/quer, iPad hoch/quer) dieselben 9 Schritte, das Muster zeigt ‚Nächster Schritt‘, hakt ab
und zeigt nur ‚aufgenommen‘; ‚Messung teilen‘ erst, wenn beide Lagen des Geräts fertig sind (sonst Rückfrage ‚trotzdem teilen‘):

| Schritt | Handlung | prüft (Auswertung aus den Rohdaten) |
|---|---|---|
| S1 | ‚Fenster öffnen‘ | Fenster mittig, kein Messartefakt mehr beim Öffnen |
| S2 | ‚Ort‘ antippen | Tastatur auf im Fenster: Safari verschiebt nicht, Leisten still, Fenster gleitet (iPad), Kapsel über der Tastatur |
| S3 | ‚Notiz (ganz unten)‘ antippen | Feld wechseln bei offener Tastatur (neu) |
| S4 | nur die Tastatur schließen, Fenster bleibt offen | Tastatur zu bei offenem Fenster (neu): Leisten still, iPad-Fenster gleitet zurück, Höhe wie vorher |
| S5 | ‚Fertig‘ im Fenster | Fenster zu ohne Sprung |
| S6 | mit ↓ ans Ende, ‚Gesamtausgaben‘ antippen | Feld im Inhalt, Zifferntastatur (neu am Gerät) |
| S7 | Tastatur schließen | Inhalt rutscht nicht zurück |
| S8 | ‚Suche ein/aus‘, ins Suchfeld tippen | Suche der Kopfzeile (offen aus 6a: 20 px quer verschoben?) |
| S9 | Tastatur schließen, ‚Suche ein/aus‘ | – |

**Prüfung des Musters vor der Übergabe** (`arbeit/A-36 Muster prüfen.mjs`, Chromium und WebKit, alle vier Lagen): spielt S1–S9 im
Safari-Modell durch, wie das Muster sie anzeigt; die geteilte Datei wird mit `arbeit/A-36 auswerten.mjs` ausgewertet – V1 muss in
jedem Schritt still sein, alle 9 Schritte je Lage müssen in der Datei stehen. **Gegenproben:** (1) ein eingebauter Sprung der
Kopfzeile von 50 px beim Öffnen **und** Schließen der Tastatur muss in der Auswertung rot werden (der Fehler der 2. Fassung lag beim
Schließen); (2) Heute muss ‚Safari verschiebt‘ zeigen. **Auswertung selbst geprüft** (`auswerten.mjs --selbsttest`): an den vier
Messungen der 2. Fassung muss sie die Werte aus 6a liefern (218/212/362/340, Sprünge beim Schließen +218/+212/+362/+340).

**Stand nach dem Bau des Musters (20.10.2026):** `Muster prüfen.mjs` grün in Chromium und WebKit (alle vier Lagen, je 9 Schritte,
7 Handlungen mit Tastatur still), G-1 und G-2 rot wie verlangt; `auswerten.mjs --selbsttest` liefert an den vier Messungen alle 26
von Hand gelesenen Werte (dabei gefunden: Heute am iPad quer **verschwindet die Seitenleiste**, solange die Tastatur offen ist –
`isPhone()`, P-60). Die Prüfung fand vor der Übergabe zwei Fehler: (1) **‚Suche ein/aus‘ blendete die ganze Seite aus** (Klasse
`suche` am `html` traf `.suche { display: none }`) – schon in der 2. Fassung, dort nicht ausprobiert; behoben (`mitsuche`).
(2) Das Modell verschob V1 quer im Fenster (Ort 19 px über der Tastatur, Modell verlangte 24) – am Gerät verschob Safari bei 15 px im
Fenster nicht → Modell nach dem Gerät korrigiert: **`ABSTAND_FENSTER` 15** für Felder in Fenstern, sonst weiter 24 (Suche 0019).
`ablauf-tastatur-still.mjs` gegen 3.26.0 weiter rot (59).

**Nur am Gerät (Prüfliste):** ob die Kapsel mit der Tastatur mitgeht oder vorausspringt; ob das Gleiten des iPad-Fensters zur Tastatur
passt; Pfeile ∧ ∨ über der Tastatur (Safari wählt das Feld, kein Antippen) – nicht im Versuch.

## 6c. Dritter Versuch am Gerät (20.10.2026 abends, Muster 3. Fassung) – Auswertung aus den Rohdaten

Dateien `arbeit/A-36 Messungen/2026-10-20 21-56 Muster 3 iPhone (Heute).txt` und `… 22-06 Muster 3 iPad.txt`;
`auswerten.mjs` erkennt jetzt auch die Tastatur-Taste des iPad (Tastatur zu, Feld behält den Fokus).
- **iPhone lief in ‚Heute‘, nicht in V1:** das Symbol auf dem Home-Bildschirm startet mit der alten Adresse `?v=heute`; die Anleitung
  im Muster zeigte nur ‚Variante Heute – tippe V1‘ (Fehler Claude: V1 hätte erzwungen bzw. im Chat genannt werden müssen).
  Trotzdem neu gelernt: (a) **Suche quer** 50–94 bei sichtbar 126 (32 px darüber) → Safari verschiebt 9 px (= Mitte); (b) **Feld
  wechseln bei offener Tastatur** (Notiz 24 px darüber, hoch) → Safari verschiebt weiter bis zum Raum (403); (c) **iPhone quer im
  Fenster ist ‚Notiz‘ mit offener Tastatur nicht erreichbar** (Heute = 4.28.0: der Fensterinhalt rollt nur ~35 px, Notiz bleibt unter
  der Tastatur – Nutzer: ‚Feld kann nicht angeklickt werden‘) – Fehler auch im Reiselogbuch 3.26.0 zu vermuten.
- **iPad (V1, beide Lagen, alle Schritte):** Öffnen, Schließen, Suche und Inhalt meist still; das Fenster gleitet sauber
  (93 → 10 in 15 Bildern, zurück ebenso). **Neue Fehler von V1:**
  1. **Erstes Antippen eines Felds im Fenster öffnet die Tastatur oft nicht** – Fokus nach 35 ms zurück ans Fenster (‚blur fPlace,
     focus dlg‘), erst das zweite Antippen wirkt (6-mal). In der 2. Fassung nicht aufgetreten; Ursache offen (Abfangen der Berührung).
  2. **Feld wechseln bei offener Tastatur:** Notiz 296–340 (34 px darüber) → **Safari verschiebt 132 px** (= Mitte), Leisten springen.
     Die Regel ‚32 px genügen‘ gilt nur beim ersten Öffnen im Fenster; beim Wechseln zentriert Safari schon bei 34 px.
  3. **Gesamtausgaben iPad quer:** nach dem Öffnen rutscht das Feld von 299–343 auf 618–662 – unter die Tastatur (Ursache offen, im
     Modell nicht nachgebildet).
  4. **Erneutes Antippen nach der Tastatur-Taste** (Feld hat noch den Fokus): V1 bereitet nicht vor → Safari verschiebt 428 px.
- **Folgerung:** ‚nur so weit wie nötig‘ ist zu knapp – sicher ist die **obere Hälfte** (2. Fassung, in allen vier Lagen still),
  beim Wechseln und erneuten Antippen ebenso; die Suche quer braucht eine niedrigere Kopfzeile (iOS quer: kompakte Leiste) oder
  9 px bleiben. Das Modell kennt (b), (2), (3) und (4) noch nicht.

## 6d. Muster 4. Fassung (Sitzung 0022, 20.10.2026) – Lehren aus 0021, Modell um 6c ergänzt

**Lehren (Nutzer verärgert):** Anleitung **nur im Chat**, nichts im Muster, was wegrollt oder eine Reihenfolge erzwingt; **nur V1**
(keine Variante aus der Adresse – das Symbol auf dem Home-Bildschirm mit `?v=heute` startet trotzdem V1 –, kein Umschalter; ‚Heute‘
nur noch für die Gegenprobe über `a36.variante`). Das Muster zeigt oben rechts nur ‚n aufgenommen‘; ‚Messung teilen‘ jederzeit.

**Ursache ‚2× tippen‘ (6c 1), aus den Rohdaten aller iPad-Messungen:** jede Berührung, die das Muster abfängt (`preventDefault`, eigener
Fokus), ohne dabei etwas zu bewegen, und vor der eine Schaltfläche (`dlgX`, Fokus von `showModal`) oder ein Feld bei geschlossener Tastatur
den Fokus hatte, verlor den Fokus nach 34–37 ms ans Fenster (6 von 6). Ging es, hatte vorher das Fenster den Fokus (nach einem
verlorenen) oder die Tastatur war offen (Wechsel). In der 2. Fassung bewegte V1 bei jeder Berührung das Fenster – nie verloren (4 von 4).
Die Berührungen, die Safari selbst behandelte (‚focus‘ mit ‚tippen‘ danach), gingen immer. Der Mechanismus in WebKit ist nicht bekannt
→ **Vermutung, am Gerät zu bestätigen**. Abhilfe in V1: abfangen **nur, wenn etwas bewegt wird**, sonst bleibt die Berührung bei Safari;
bei geschlossener Tastatur vorher den alten Fokus lösen. Jede Berührung steht als Zeile ‚berührung <Feld> abgefangen n | bei Safari‘
in der Messung.
**Gesamtausgaben iPad quer (6c 3):** trat nur direkt nach so einem verlorenen Fokus auf (2. Antippen), beim zweiten Durchgang ohne
Verlust nicht (299 → 322 → 315). Im Modell nicht nachgestellt; Vermutung: Folge von 6c 1.

**Safari-Modell (`tests/safari.mjs`, S-6):** die Grenze ABSTAND gilt nur beim **ersten Öffnen** für ein Feld **in einem Rollbereich**;
sonst stellt Safari das Feld in die Mitte, sobald seine Mitte unter der Mitte des sichtbaren Bereichs liegt: (a) Feld außerhalb eines
Rollbereichs (Suche der Kopfzeile: 50–94 bei 126 → 9 px, 0019: 62–106 → 20 px), (b) Wechsel bei offener Tastatur (34 px darüber
→ 132), (c) erneutes Antippen nach der Tastatur-Taste (Tastatur öffnet ohne neuen Fokus; im Modell `__safari.tastatur(false)` bei
bleibendem Fokus). Mit dem Modell ist das Muster 3 rot (iPad quer Wechsel 125 px, erneut 213 px; iPad hoch 258 / 340; iPhone quer
Wechsel 23 px; Suche quer 8 px) – passt zu den Messungen.

**V1 4. Fassung:**

| Fall | V1 | geprüft (Modell, `Muster prüfen.mjs`) |
|---|---|---|
| erstes Antippen (Fenster, Inhalt) | Feld in die **obere Hälfte** (Mitte ≤ Mitte − 24, nie über dem Rand seines Bereichs + 4) | alle vier Lagen still |
| Wechsel bei offener Tastatur | ebenso | still (vorher 125 / 258 / 23 px) |
| Tastatur-Taste (iPad), Feld behält den Fokus | iPad-Fenster **bleibt oben**, solange ein Feld darin den Fokus hat | still |
| erneutes Antippen danach | Feld schon in der oberen Hälfte → bei Safari; sonst abfangen | still (vorher 213 / 340 px) |
| nichts zu bewegen | Berührung bleibt bei Safari | – (nur am Gerät, 6c 1) |
| iPhone quer, Fenster offen, Tastatur offen | ‚Notiz‘ erreichbar | G-3: Heute nicht erreichbar (wie am Gerät), V1 erreichbar |
| iPhone quer: Suche, Fensterfelder | **niedrige Leisten** quer (Kopfzeile 32 statt 44 px, wie iOS quer) | Suche quer still (vorher 8 px) |
| iPad-Fenster | gleitet mit der Tastatur (0,25 s), Höhe bleibt (3. Fassung, am Gerät gut) | Fensterkopf gleitet, sonst still |

Auswertung korrigiert: bei der Tastatur-Taste begann die nächste Handlung eine Zeile zu früh, der vorigen fehlte ihr letztes Bild
(‚Kapsel −412 px‘ war deshalb falsch); Selbsttest weiter 26/26.

**Kurzer Versuch (Anleitung nur im Chat):** iPad (eine Lage genügt, quer) und iPhone (hoch und quer), je: Fenster öffnen → ‚Ort‘ einmal
antippen → ‚Notiz‘ → Tastatur schließen (iPad: Tastatur-Taste) → ‚Notiz‘ erneut → ‚Fertig‘ → ↓ → ‚Gesamtausgaben‘ → Tastatur
schließen → ‚Gesamtausgaben‘ erneut → Tastatur schließen → teilen. Die Prüfung spielt genau das in allen vier Lagen durch.

**Entscheidung des Nutzers (20.10.2026, 0022):** kurzer Versuch mit Muster 4 vor dem Bau; **niedrige Leisten quer am iPhone werden
übernommen** (Kopfzeile und Fensterkopf 32 statt 44 px, wie iOS quer) – kommt in den Bau 4.28.1 / 3.26.1. **Als allgemeine Regel**
(Zusammenarbeit 0 Nr. 4, Ja des Nutzers): ‚iPhone quer: Kopfzeile und Fensterkopf niedrig (32 px, wie iOS quer), damit Felder darunter
und die Suche in der oberen Hälfte über der Tastatur liegen‘ – kommt mit 4.28.1 in Designrichtlinie allgemein 15 und den Regelkatalog
(eine Prüfung).

## 6e. Vierter Versuch am Gerät (20.10.2026 spät, Muster 4. Fassung) – Auswertung aus den Rohdaten

Dateien `arbeit/A-36 Messungen/2026-10-20 22-58 Muster 4 iPhone.txt` (hoch und quer) und `… 23-01 Muster 4 iPad.txt` (quer, zwischendurch
gedreht). `auswerten.mjs` meldet jetzt auch **‚Fokus nach n ms verloren‘** (Selbsttest 32/32).
- **Still:** in keiner Handlung verschiebt Safari, Kopfzeile, Seitenleiste und Fenster bleiben stehen – erstes Antippen, Wechsel bei
  offener Tastatur (iPhone hoch und quer, iPad), erneutes Antippen nach der Tastatur-Taste (iPad), Gesamtausgaben mit Zifferntastatur.
  iPad-Fenster gleitet 127 → 10 und **bleibt nach der Tastatur-Taste oben** (wie gewollt). iPhone quer: ‚Notiz‘ bei offener Tastatur
  erreicht (35–79, 47 px über der Tastatur). Kapsel 16 px über der Tastatur. Das einzige ✗ (Fenster links −180) ist das Drehen.
- **Neu gemessen:** Zifferntastatur **iPhone hoch 376 px** (sichtbar 436; Modell und Muster nahmen 403 an).
- **Nicht ok – ‚2× tippen‘ bleibt:** 5 von 11 abgefangenen Berührungen verloren den Fokus nach 33–36 ms (iPhone hoch Ort und
  Gesamtausgaben, iPhone quer Gesamtausgaben, iPad Ort und Gesamtausgaben) – **auch mit Bewegung** (60–477 px) und auch ohne vorherigen
  Fokus. Die Vermutung aus 6d (‚nur ohne Bewegung‘) ist damit **widerlegt**. Zusammen mit 6c: 12 von rund 35 abgefangenen Berührungen
  verloren, **keine einzige** der Berührungen, die Safari selbst behandelte (‚bei Safari‘, ‚focus‘ mit ‚tippen‘). Nach dem Verlust
  rollte der Inhalt am iPhone um genau den vorbereiteten Betrag zurück (456 bzw. 60 px) – so entsteht auch das Rutschen von
  ‚Gesamtausgaben‘ (6c 3).
- **Folgerung:** Abfangen der Berührung (`preventDefault` am Ende der Berührung, eigener Fokus) ist am Gerät nicht verlässlich und
  scheidet aus. **Vorschlag V2:** die Berührung bleibt immer bei Safari; im Fokus-Ereignis (`focusin`, sofort, vor dem ersten Bild)
  rollt das Muster das Feld in die obere Hälfte – wenn Safari die Lage des Felds erst danach liest (WebKit fragt die Lage für das
  Verschieben beim Anzeigen der Tastatur ab, ~90 ms nach dem Fokus), verschiebt es nicht. Ob das so ist, zeigt nur das Gerät (im Modell
  nicht entscheidbar) → kurzer Versuch mit 3 Handgriffen je Gerät.

## 6f. Muster 5. Fassung (V2, Ja des Nutzers 20.10.2026, Sitzung 0022)

| Fall | V2 | geprüft (Modell, `Muster prüfen.mjs`) |
|---|---|---|
| jede Berührung | bleibt bei Safari (nie `preventDefault`) | auf jeden Fokus eines Felds folgt Safaris ‚tippen‘ oder ‚klick unterdrückt‘; gegen Muster 4 rot |
| Feld bekommt den Fokus (erstes Antippen, Wechsel) | im `focusin` sofort in die obere Hälfte rollen | alle vier Lagen still |
| Klick nach dem Rollen trifft etwas anderes | genau diesen Klick unterdrücken (in einer App läge dort womöglich eine Schaltfläche) | Zeile ‚klick unterdrückt‘ |
| Tastatur-Taste (iPad) | Feld gibt den Fokus ab (nur beim Übergang offen → zu; Hardware-Tastatur unberührt) – erneutes Antippen ist gewöhnlich | iPad hoch/quer still |
| Zifferntastatur iPhone hoch | 376 px (Versuch 4) in Muster und Modell | still |
| iPhone quer, Fenster | ‚Notiz‘ erreichbar, niedrige Leisten | G-3 Heute rot, V2 erreichbar |

**Annahme, nur am Gerät zu klären:** Safari liest die Lage des Felds erst beim Anzeigen der Tastatur, nicht schon beim Fokus. Stimmt
sie nicht, verschiebt Safari wie ‚Heute‘ – dann sieht man es in der Messung (‚Safari verschiebt n px‘) und das Modell wird korrigiert.
**Kurzer Versuch:** iPhone hoch und iPad quer, je: Fenster öffnen → ‚Ort‘ einmal → ‚Notiz‘ → ‚Fertig‘ → ↓ → ‚Gesamtausgaben‘ einmal → teilen.

## 7. Grenzen

- Was Safari zwischen zwei Bildern zeigt, kennt die Prüfung nur aus dem Modell – deshalb Muster und Messung am Gerät.
- Drehen mit offener Tastatur, iPad hoch und Zifferntastatur hoch sind nicht gemessen → Muster bzw. Prüfliste.
