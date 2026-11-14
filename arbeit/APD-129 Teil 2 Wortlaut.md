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
