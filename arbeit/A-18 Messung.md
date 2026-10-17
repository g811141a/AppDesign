# A-18 / T-91 – Tastatur im Fenster ‚Tag‘ · Plan der Messung

**Stand 17.10.2026** · Sitzung Reiselogbuch 0010

## Was springt (vermutet)

Tippst du im Fenster ‚Tag‘ auf ein Feld, fährt die Tastatur in etwa 0,3 s hoch. Dabei geschieht Folgendes:

1. Safari meldet bei **jedem Schritt** `visualViewport` resize/scroll. `placeDialogs` setzt das Fenster jedes Mal neu
   in die Mitte des kleiner werdenden Bereichs → das Fenster wandert in vielen kleinen Sprüngen.
2. Safari schiebt zugleich die **Seite dahinter** (trotz Sperre), damit das Feld sichtbar ist → die Tabelle bewegt sich.
3. Nach 350 ms rollt `scrollIntoView` das Feld noch einmal → ein letzter Ruck.

Die Prüfung `checkListStill` setzt nur den Endzustand der Tastatur, deshalb sieht sie die Zwischenschritte nicht.

## Messseite (nur zum Messen, keine App-Änderung)

`messen/tastatur.html` in AppDesign, erreichbar über GitHub Pages. Sie baut auf der Vorlage auf (echtes `ui.js` der Fassung 4.22.0).

- Hinten eine lange Tabelle (60 Zeilen) wie die Tage im Reiselogbuch, mit haftendem Kopf.
- Antippen einer Zeile öffnet ein Fenster wie ‚Tag‘: einzeilige Felder und ein großes Textfeld (‚Verlauf‘).
- Ein Protokoll zeichnet ab dem Antippen eines Feldes 2 s lang jede Änderung auf: Zeit in ms, `visualViewport`
  (Höhe, offsetTop), `scrollY` der Seite, Oberkante des Fensters, Feld sichtbar ja/nein, und wer es ausgelöst hat
  (resize, scroll, 350 ms).
- **Drei Versuche**, umschaltbar oben auf der Seite:
  - **A – wie heute:** zum Vergleich mit der App.
  - **B – Fenster erst setzen, wenn die Tastatur steht:** während die Tastatur fährt, bleibt das Fenster stehen;
    sobald 150 ms lang nichts kommt, wird es einmal gesetzt.
  - **C – Fenster oben verankern:** das Fenster steht bei offener Tastatur oben im sichtbaren Bereich statt in der Mitte,
    dadurch muss es kaum wandern.
- Schaltfläche **‚Protokoll kopieren‘** – den Text fügst du hier im Chat ein.

## Was du tust (ca. 5 Minuten, iPad quer)

1. Seite öffnen, Versuch A, Zeile antippen, ins Textfeld tippen, Tastatur abwarten, ‚Protokoll kopieren‘, im Chat einfügen.
2. Dasselbe mit B und C. Sag dazu kurz, wie es sich angefühlt hat (springt / ruhig).
3. Wenn du magst: dasselbe einmal hochkant.

Aus dem Protokoll und deinem Eindruck mache ich dann die Fall-Liste für die Korrektur (AppDesign 4.22.1, R-7.3 erweitert),
dazu eine Prüfung, die die Tastatur **schrittweise** nachbildet, nicht nur ihren Endzustand.

## Veröffentlichung

Die Messseite liegt in AppDesign `main` (Ordner `messen/`). Sie ist keine Version und keine Fassung, und keine App lädt sie.
Nach der Korrektur wird sie gelöscht.
