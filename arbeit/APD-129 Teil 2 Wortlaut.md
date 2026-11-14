# APD-129 Teil 2 – Wortlaut Designrichtlinie 13 (0 Nr. 29)

**14.11.2026 · Sitzung 0113** · Befund `arbeit/APD-129 Teil 2 Befund und Testfall-Liste.md` (von dir bestätigt: A + B, APD-129/M-10 bis M-18).

## APD-129/W-1 – Designrichtlinie allgemein 13, neuer Punkt direkt nach ‚Verschiebung nach dem Drehen (iPhone, Home-Bildschirm)‘

**Alt:** – (kein Punkt)

**Neu:**

> - **Oberer Rand nach dem Drehen (iPhone, Home-Bildschirm):** quer → hoch – nach der Meldung 812 bleibt `env(safe-area-inset-top)` noch
>   250–300 ms auf 62 (Statusleiste); alles mit `--safe-top` (Kopfzeile, Seitenleiste bzw. Startliste, Blatt) steht so lange 62 px zu tief und
>   springt dann hoch – zugleich mit der Verschiebung oben. ui.js setzt `--safe-top` deshalb am iPhone vom Home-Bildschirm auf 0, sobald die
>   Fensterhöhe kleiner als die Bildschirmhöhe ist, und stellt die Verschiebung im selben Ereignis zurück (`placeDialogs`, R-8.1); quer, am iPad
>   und in Safari gilt `env(…)`. Safari-Modell `safeOben` (Messung 14.11.2026 21:37, Safari 27.2, APD-129 Teil 2).

Regelkatalog (17): keine Änderung – R-8.1 deckt es schon ab (nach dem Drehen bleibt alles an seinem Platz); die neue Prüfung nimmt dazu jedes Bild auf.

## Stand nach der Bestätigung (14.11.2026, Sitzung 0113)

- APD-129/W-1: **Ja** (Nutzer 14.11.2026).
- Backlog AppDesign ‚0. Nächste Version‘: APD-129 Teil 2, **1 Punkt bereit** (`9ec54b1`).
- **Bau-Frage:** Korrekturversion **AppDesign 4.59.2** mit **Reiselogbuch 3.56.2**.
  - Inhalt: Teil A `--safe-top` selbst bestimmen, Teil B Verschiebung im selben Ereignis zurücksetzen, Safari-Modell `safeOben`, Prüfung
    APD-129/M-10 bis M-18 (rot gegen 4.59.1), Designrichtlinie 13 nach W-1, CHANGELOG mit Usertest P-105.
  - **Prüfstufe voll:** AppDesign ändert sich, Stufe Text scheidet damit aus (0 Nr. 2). `stufe` läuft nach `vorbereiten`; schlägt es
    etwas anderes vor, melde ich das vor `los`.
  - Dauer des vollen Laufs etwa 60 min (AppDesign-`CLAUDE.md`). Bei einem Kontext von etwa 209.000 kann die Übergabe (ab 300.000) nach dem
    Bericht fällig werden (0 Nr. 13).
