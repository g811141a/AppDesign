# Bau-Frage – AppDesign 4.59.3 mit Reiselogbuch 3.56.3

**Stand 15.11.2026** · Sitzung ‚Reiselogbuch 0118‘ · Korrekturversion, zwei kleine Themen

## Was gebaut wird

1. **APD-85 Teil 6 – Wackler WebKit beheben** (nur Prüfungen)
   - Neu `langDruecken` in `tests/ablauf.mjs`: wartet nach dem langen Drücken auf die Endlage des Kontextmenüs statt einer festen Pause.
   - `ruhe()` meldet ‚Seite nicht zur Ruhe gekommen‘, statt still zu enden.
   - Die 8 Prüfungen des Reiselogbuchs mit langem Drücken stellen darauf um: `ablauf-seitenleiste-position`, `ablauf-seitenleiste-hoch`, `ablauf-seitenleiste-kontextmenue`, `ablauf-einstellen`, `ablauf-iphone`, `ablauf-markierung-menues`, `ablauf-messung`, `ablauf-texte-ablaeufe`.
   - Testfall-Liste: `arbeit/APD-85 Teil 6 Befund und Testfall-Liste.md` (APD-85/F-1 bis F-8).

2. **APD-131 – Reste aus 0106, Texte nachführen** (Wortlaut APD-131/V-1 bis V-4 bestätigt)
   - Reiselogbuch `PROMPT.md` ‚Tage als Kästen‘: Bezeichnung halbfett, Emojis so groß wie im Wert.
   - Designrichtlinie 15.11: VoiceOver-Namen ‚Eingabe löschen‘ und ‚Löschen widerrufen‘.
   - Designrichtlinie 16: neue bewusste Abweichung ‚Cursor am Ende‘.
   - `tests/README.md` in beiden Repos nachführen.

## Was sich nicht ändert

- Die App selbst (`index.html`, `ui.js`, `design.css`) bleibt im Verhalten gleich; es ändern sich nur die Versionsstellen.
- APD-30 Wischaktionen bleibt bereit und kommt danach als AppDesign 4.60.0 mit Reiselogbuch 3.57.0.

## Prüflauf

- **Voll** (Chromium und WebKit, alle Ansichten), weil sich Prüfungen in `tests/` ändern – nach `CLAUDE.md` etwa 60 min.
- Das Skript `stufe` schlägt zurzeit ‚Text‘ vor, weil noch nichts geändert ist; nach dem Bau frage ich es erneut.

## Usertest

Am Gerät ist nur die Version zu prüfen (Testfall /0); die Nummer des Usertests lese ich beim Bau aus dem CHANGELOG ab.

## Backlog

Nächste Version: 3 Punkte bereit (APD-85 Teil 6, APD-30 Wischaktionen, APD-131) · Offen im Backlog: APD-32 · APD-55 · RLB-6 · APD-1 · APD-70.
