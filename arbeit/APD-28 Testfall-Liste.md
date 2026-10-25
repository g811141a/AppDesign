# APD-28 Umbau B (mit APD-29) – Testfall-Liste und Muster

**Stand 19.10.2026** · Sitzung Reiselogbuch 0016 · Grundlage: `arbeit/APD-27 Auswertung P-57.md`, Entscheidung des Nutzers
19.10.2026 (Umbau B statt kleiner Korrektur)

## 1. Schritt 1 ist erledigt: Safari-Modell und rote Prüfung

- **`AppDesign/tests/safari.mjs`** (neu, Zweig `a28-safari-modell`) ist das **eine** Safari-Modell (Zusammenarbeit 0 Nr. 20).
  Es bildet zwei Bereiche nach. Der **Layout-Bereich** ist der Bereich, an dem die festen Leisten hängen. Der **sichtbare
  Bereich** ist das, was der Bildschirm zeigt. Bei offener Tastatur ist er 409 px hoch (quer 126 px).
  Rollt die App, bewegt sich zuerst nur der sichtbare Bereich. Der Layout-Bereich folgt erst, wenn der sichtbare Bereich an
  seinen Rand stößt. Safari meldet die neue Lage 2 Bilder später. Antippen von ⓧ nimmt dem Feld den Fokus. Beim neuen
  Fokus rollt Safari hoch um 120 px nach oben bzw. schiebt quer um 21 px. Alle Werte stammen aus der Messung P-57.
- **`ReiseLogBuch/tests/ablauf-suche-iphone.mjs`** stellt jetzt den gemessenen Ablauf nach: langsam tippen, ⓧ, noch einmal
  tippen. Die Prüfung ist **rot gegen 3.24.0**, in Chromium und WebKit, genau im gemessenen Muster:

  | | gemessen am iPhone (P-57) | Modell |
  |---|---|---|
  | scrollY je Buchstabe nach ⓧ | 230 ↔ 109 | 234 ↔ 114 |
  | offsetTop | 121 ↔ 0 | 120 ↔ 0 |
  | Kopfzeile / Suchzeile | −120 / −58, dann +121 / 183 | −120 / −58, dann +120 / 182 |
  | Dauer | 2 Bilder (33 ms) | 2 Bilder (33 ms) |
  | vor ⓧ (hoch) | ein Sprung, Leisten ruhig | Leisten ruhig |
  | quer | ±21 px, schon vor ⓧ | 21 px, schon vor ⓧ |

- **Gegenprobe mit der kleinen Korrektur** (Abzug von `offsetTop` probeweise entfernt): **weiterhin rot**. Es bleibt ein
  Sprung um 120 px (hoch, nach ⓧ) bzw. 21 px (quer). Der Grund: Jedes Rollen des Fensters bei offener Tastatur verschiebt
  den sichtbaren Bereich, und der Ausgleich kommt immer 2 Bilder zu spät. Das Hin und Her ist mit der kleinen Korrektur weg,
  der einzelne Sprung bleibt. **Das spricht für Umbau B.** Dort rollt das Fenster nie.

## 2. Was Umbau B ist

Heute rollt die **ganze Seite**. Kopf- und Suchzeile sind `position: fixed` und laufen über `--vv-top` hinter Safari her.
**Mit Umbau B rollt die Seite nie.** Ein Rahmen füllt den Bildschirm und hat feste Zeilen: oben die Kopfzeile, darunter die
Suchzeile, dann der **Rollbereich mit dem Inhalt**. Nur der Rollbereich rollt. Weil das Fenster nicht mehr rollt, hat Safari
beim Tippen nichts zu verschieben. Treffer, Nach oben/Ans Ende, Öffnen und Drehen rollen nur noch den Rollbereich.

```
iPhone hoch, Tastatur offen           B1 (Vorschlag)                      B2
┌──────────────────────────┐   ┌──────────────────────────┐   ┌──────────────────────────┐
│ ‹  Australien   🔍 ⋯     │   │ Kopfzeile (feste Zeile)  │   │ Kopfzeile (feste Zeile)  │
│ [Sydney        1 von 4 ⓧ]│   │ Suchzeile (feste Zeile)  │   │ Suchzeile (feste Zeile)  │
│ Datum │ Programm │ …     │   │ ┌──────────────────────┐ │   │ ┌──────────────────────┐ │
│ Mo 21 │ Bus nach Sydney  │   │ │ Rollbereich          │ │   │ │ Rollbereich          │ │
│ …                    ↑ ↓ │   │ │ endet über der       │ │   │ │ geht bis zum unteren │ │
├──────────────────────────┤   │ │ Tastatur        ↑ ↓  │ │   │ │ Rand (unter der      │ │
│        Tastatur          │   │ └──────────────────────┘ │   │ │ Tastatur)            │ │
└──────────────────────────┘   └──────────────────────────┘   └──────────────────────────┘
```

- **B1 (Vorschlag):** Der Rahmen ist so hoch wie der sichtbare Bereich (`visualViewport.height`) und endet über der Tastatur.
  Das letzte Ergebnis lässt sich bis über die Tastatur rollen, und Nach oben/Ans Ende bleiben über ihr sichtbar.
- **B2:** Der Rahmen bleibt immer bildschirmhoch. Die Tastatur deckt den unteren Teil des Rollbereichs ab. Das ist einfacher
  (keine Höhe nachführen), aber die letzten Zeilen und Nach oben/Ans Ende liegen bei offener Tastatur darunter.

## 3. Muster zum Ausprobieren am iPhone (vor dem Bau)

**Datei:** `arbeit/APD-28 Muster.html`, auf GitHub Pages unter
`https://g811141a.github.io/AppDesign/arbeit/APD-28%20Muster.html` (oben links umschalten: **A** = heute, **B1**, **B2**).
Unter dem Titel steht **‚Zittern N px‘**. Das ist die größte Abweichung der Kopfzeile auf dem Bildschirm seit dem Öffnen der
Suche, in jedem Bild gemessen. Ablauf wie bei P-57: in die Mitte rollen, 🔍, „Sydney“ langsam tippen, ⓧ, noch einmal tippen.

- **Unter dem Modell gemessen:** A zittert (hoch 111 px, quer 42 px), B1 und B2 stehen still (0 px, hoch und quer).
- **Was nur das Gerät zeigt:** ob Safari den sichtbaren Bereich auch dann schiebt, wenn die Seite gar nicht rollen kann
  (quer schob Safari beim Fokus 21 px). Das Modell kann das nicht wissen. Deshalb kommt der Versuch am Gerät **vor** dem Bau
  (Zusammenarbeit 0 Nr. 20: erst messen). Zeigt B am Gerät mehr als 0 px, wird das Modell ergänzt, bevor gebaut wird.
- **Ergebnis am iPhone (Versuch M-1, Nutzer 19.10.2026): alles wie erwartet.** A zittert (hoch etwa 120 px nach ⓧ), B1 zeigt
  hoch und quer 0 px, Suche öffnen und ⓧ rollen nach oben, das Ende der Liste und ↑ ↓ liegen über der Tastatur. Safari schiebt
  bei B1 also nichts. Das Modell braucht keine Ergänzung.

## 4. Betroffene Regeln und was sich ändert

| Regel / Baustein | heute (Fenster rollt) | mit Umbau B |
|---|---|---|
| R-2.1 Leisten stehen fest | `position: fixed` + `--vv-top`, Ausgleich 2 Bilder spät | feste Zeilen im Rahmen; `--vv-top` bleibt nur für Schübe von Safari (quer) |
| R-2.3 Treffer unter der Suchzeile | `scrollUnderBar`: Fenster rollen, minus `offsetTop` | Rollbereich rollen, ohne `offsetTop` |
| APD-29 Suche öffnen und ⓧ | Lage bleibt | Rollbereich ganz nach oben (iPad und iPhone, Eintrag und Startliste) |
| R-7.1 Kacheln unter dem Kopf | Kacheln laufen unter dem festen Kopf durch | Kacheln laufen im Rollbereich unter der Kopfzeile durch (Lichtkante und Haarlinie bleiben) |
| R-7.3 Liste steht still | `lockPage`, Stand merken, 1,5 s festhalten (Safari schiebt die Seite) | Rollbereich wird beim Fenster nicht bewegt; Merken und Festhalten bleiben als Sicherung, rechnen mit dem Rollbereich |
| R-7.4 Position beim Öffnen | `openAt`: Fenster rollen | `openAt`: Rollbereich rollen; ganz oben = `scrollTop` 0 |
| R-8.1 Drehen | `rememberTop`/`restoreTop`/`keepPlace` mit `scrollY` | dieselben Bausteine mit dem Rollbereich |
| R-3.2 Nach oben / Ans Ende | Fenster; ‚nur wenn es etwas zu rollen gibt‘ über `scrollHeight` | Rollbereich; dieselbe Bedingung am Rollbereich |
| Großer Titel / Haarlinie (`updateBar`) | `scrollY > 4`, Fenster-`scroll` | `scrollTop > 4`, `scroll` des Rollbereichs |
| Tabellenkopf haftet | `top: calc(var(--bar-h) + var(--vv-top))` | `top: 0` im Rollbereich |
| Seitenleiste (iPad) | `#side` fest mit `translateY(--vv-top)` | unverändert (eigener Rollbereich, fest neben dem Rahmen) |
| Druck | Seite druckt, wie sie rollt | Rahmen und Rollbereich im Druck aufgelöst (`height: auto`, `overflow: visible`), sonst druckt nur ein Bildschirm |
| Messmodus (15.21) | `sy` = Fenster | neue Spalte `inh` = `scrollTop` des Rollbereichs (über `rollen`) |
| Startliste, Zurück (iPhone) | `window.scrollTo(0, 0)` | Rollbereich nach oben |
| Fenster (Dialoge) | unverändert | unverändert (liegen über dem Rahmen, Tastatur wie bisher) |

## 5. Testfall-Liste (jeder Fall wird eine automatische Prüfung)

Gerät (iPad, iPhone) × Lage (quer, hoch) × Darstellung (hell, dunkel), WebKit und Chromium – soweit nicht anders genannt.
iPhone-Fälle mit dem Safari-Modell.

| Nr. | Handlung | Daten | Erwartet | Prüfung |
|---|---|---|---|---|
| F-1 | Suche, langsam tippen, ⓧ, noch einmal tippen (Ablauf P-57) | 40 Tage, Mitte und Ende | Kopf- und Suchzeile 0 px in jedem Bild; Feld bleibt, Fokus bleibt | `ablauf-suche-iphone.mjs` (heute rot, danach grün) |
| F-2 | Suche schnell tippen | 40 Tage, Mitte und Ende | wie F-1 | `ablauf-suche-iphone.mjs` |
| F-3 | Lupe antippen (Suche öffnen) | Mitte der Liste | Rollbereich ganz oben, Leisten 0 px (APD-29) | neu in `ablauf.mjs` (`checkSearchTop`) |
| F-4 | ⓧ | Treffer weit unten | Rollbereich ganz oben, Fokus bleibt, Leisten 0 px (APD-29) | `checkSearchTop` |
| F-5 | Treffer ‹ › und Eingabetaste | viele Treffer | Treffer direkt unter der Suchzeile (halbe Zeile Abstand), Leisten 0 px | `checkSearch` (angepasst) |
| F-6 | Wischen im Inhalt, am oberen und unteren Rand | lang, kurz (passt auf den Bildschirm) | Leisten 0 px, nichts federt außer dem Inhalt selbst | `hig.barStill` (Rollbereich) |
| F-7 | Erstes Wischen bei offener Tastatur | Suche offen | schließt nur die Tastatur, Inhalt rollt nicht mit | `hig.barStill` |
| F-8 | Fenster aus einer Zeile öffnen, schreiben, Häkchen bzw. x | Zeile oben, 3 tiefer, untere Hälfte | Liste steht still, oberste Zeile an derselben Stelle, Zeile 2 s blau | `checkListStill` (Rollbereich) |
| F-9 | Eintrag öffnen | mit und ohne ‚nächsten offenen‘ Tag | ganz oben bzw. Tag direkt unter Kopf und Tabellenkopf | `checkOpenAt`, `oeffnen-position.mjs` |
| F-10 | Drehen quer ↔ hoch | Mitte, ganz oben, ganz unten | derselbe Eintrag oben; oben bleibt oben, unten bleibt unten | `hig.rotate` (Rollbereich) |
| F-11 | Seitenleiste ein/aus (iPad quer) | Mitte | derselbe Eintrag oben | `keepPlace`-Prüfung, `ablauf-seitenleiste-position.mjs` |
| F-12 | Nach oben / Ans Ende | lang; kurz (Kapsel ausgeblendet) | rollt den Inhalt ganz nach oben bzw. unten; Kapsel nur, wenn es etwas zu rollen gibt; bei offener Tastatur über ihr (B1) | `checkFab` (neu, Rollbereich) |
| F-13 | Großer Titel und Haarlinie (iPhone) | ganz oben, gerollt | Titel wandert in die Leiste, Haarlinie ab 4 px | `hig.measure` (Rollbereich) |
| F-14 | Kacheln der Startliste / Seitenleiste rollen | viele Einträge | laufen unter dem Kopf und hinter der Backup-Kachel durch | `hig.measure` |
| F-15 | Zurück zur Startliste (iPhone) | Eintrag gerollt | Startliste wie vorher; Kopfzeile 0 px (APD-27 5) | `ablauf-iphone.mjs` |
| F-16 | Drucken / PDF | lang | ganze Liste, nicht nur ein Bildschirm; keine Leisten | `checkPrint` (neu, `page.pdf` / Druckansicht) |
| F-17 | Messmodus | Suche wie F-1 | Spalte `inh` zeigt den Rollstand | `ablauf-messung.mjs` |
| F-18 | Offline-Start, Neustart in der Startliste | – | unverändert | `offline.mjs`, `start.mjs` |
| F-19 | Gegenprobe | – | jede neue Prüfung schlägt mit `--gegenprobe` an | `lauf.mjs --gegenprobe` |

**Nur am Gerät (Testfälle):** Gefühl beim Wischen im Rollbereich (Schwung, Federn am Rand), Antippen der Statusleiste
rollt nach oben (geht bei einem eigenen Rollbereich in iOS **nicht** mehr – siehe Frage 3), echte Tastatur und Diktieren,
Drucken über das Teilen-Menü, neue Messung mit dem Messmodus (P-58).

## 6. Vorschläge für AppDesign

1. **Ein Baustein für alle Apps:** `ui.js` bekommt den Rahmen und einen Rollbereich `rolle` (Lage, rollen, Ende, Ereignis).
   Alle Bausteine (Leiste, R-7.3, R-7.4, R-8.1, Nach oben/Ans Ende, Messmodus) rechnen nur noch damit. Die App setzt ihren
   Inhalt in den Rollbereich und ruft nie mehr `window.scrollTo`.
2. **Prüfungen:** `pruefe.mjs` bekommt `rolle(p, y)` und `rollstand(p)`. Alle rund 55 Stellen in den Prüfungen, die das
   Fenster rollen, gehen darüber, damit keine Prüfung aus Versehen das Fenster misst.
3. **Neue Grundregel ‚Die Seite rollt nie‘** in `hig.mjs`: nach jedem Schritt `scrollY === 0`. Damit fällt jede Stelle auf,
   die doch noch das Fenster rollt.
4. **Designrichtlinie 13 berichtigen** (war für diese Version vorgemerkt): Die Ursache ist das Rollen bei offener Tastatur,
   nicht eine kurze Seite. Dazu kommen das Modell der zwei Bereiche, `innerHeight` quer und der Grundsatz ‚nur der Inhalt rollt‘.
5. **`--vv-top` bleibt vorerst** für Schübe von Safari bei offener Tastatur. Er fällt weg, wenn die Messung nach dem Umbau
   zeigt, dass `offsetTop` immer 0 bleibt.

## 7. Vorschlag Version und Fragen

- **AppDesign 4.27.0 / Reiselogbuch 3.25.0** mit den Themen Umbau B (APD-28) und Suche nach oben (APD-29). APD-29 ist mit dem
  Rollbereich nur eine Zeile, deshalb kommt es mit. Danach misst du am Gerät (P-58).
**Entscheidungen des Nutzers 19.10.2026:**
- **Variante B1:** Der Rahmen endet über der Tastatur.
- **Allgemeine Regeln (Zusammenarbeit 0 Nr. 4):** ‚Die Seite rollt nie, nur der Inhalt‘ ergänzt R-2.1, ‚Suche öffnen und ⓧ
  rollen ganz nach oben‘ ergänzt R-2.3. Beide gelten für alle Apps und bekommen je eine Prüfung (`hig.mjs`: `scrollY` bleibt 0;
  `checkSearchTop`).
- **Statusleiste:** Dass das Antippen nicht mehr nach oben rollt, ist in Ordnung. ‚Nach oben‘ genügt.
- Testfall-Liste und Muster liegen auf `main` (GitHub Pages). Vor dem Bau probierst du das Muster am iPhone aus; das ‚Ja‘ zum Bau steht noch aus.
- **Neue Regel (Nutzer 19.10.2026, kommt mit 4.27.0 als Zusammenarbeit 2.12.0, Ergänzung von 0 Nr. 11):** Jede Bitte, etwas am
  Gerät zu prüfen oder auszuprobieren (Muster, Versuch, Messung), enthält im Chat immer den vollständigen Link und nummerierte
  Schritte mit ‚Erwartet: …‘.
- **B2** wird nicht am Gerät geprüft (Entscheidung B1). Der Vergleich ist mit dem Muster freiwillig möglich.
