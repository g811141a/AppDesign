# Bau-Frage – AppDesign 4.59.3 mit Reiselogbuch 3.56.3

**Stand 15.11.2026** · Sitzung ‚Reiselogbuch 0118‘ · Korrekturversion, drei kleine Punkte, zwei davon abgerundet

## Was gebaut wird

1. **APD-85 Teil 6 – Wackler WebKit beheben** (nur Prüfungen)
   - Neu `langDruecken` in `tests/ablauf.mjs`: wartet nach dem langen Drücken auf die Endlage des Kontextmenüs statt einer festen Pause.
   - `ruhe()` meldet ‚Seite nicht zur Ruhe gekommen‘, statt still zu enden.
   - Die 8 Prüfungen des Reiselogbuchs mit langem Drücken stellen darauf um: `ablauf-seitenleiste-position`, `ablauf-seitenleiste-hoch`, `ablauf-seitenleiste-kontextmenue`, `ablauf-einstellen`, `ablauf-iphone`, `ablauf-markierung-menues`, `ablauf-messung`, `ablauf-texte-ablaeufe`.
   - Testfall-Liste: `arbeit/APD-85 Teil 6 Befund und Testfall-Liste.md` (APD-85/F-1 bis F-8).
   - Dazu **APD-132:** `checkSchema` (`tests/doku.mjs`) lässt die Nummer allein zu, wenn dieselbe Liste in der Zeile davor mit Elternnummer steht (Zusammenarbeit 2.4); Gegenprobe bleibt rot.

2. **APD-131 – Reste aus 0106, Texte nachführen** (Wortlaut APD-131/V-1 bis V-4 bestätigt)
   - Reiselogbuch `PROMPT.md` ‚Tage als Kästen‘: Bezeichnung halbfett, Emojis so groß wie im Wert.
   - Designrichtlinie 15.11: VoiceOver-Namen ‚Eingabe löschen‘ und ‚Löschen widerrufen‘.
   - Designrichtlinie 16: neue bewusste Abweichung ‚Cursor am Ende‘.
   - `tests/README.md` in beiden Repos nachführen.

3. **APD-54 – Fremden Text bereinigen** (Testfall-Liste APD-54/T-1 bis APD-54/T-9 bestätigt, keine allgemeine Regel)
   - `index.html`: Smileys der Schnellauswahl in der Smiley-Leiste und in der Sprechblase ‚… aus der Schnellauswahl entfernen?‘ mit `esc()`.
   - `normalize` übernimmt aus `moodUsage`, `foodUsage`, `hiddenMoods`, `hiddenFood` nur Schlüssel aus Emojis (Backup laden, Abgleich).
   - Neue Prüfung `tests/ablauf-fremdtext.mjs` im Reiselogbuch, mit APD-54/T-10: fremder Text in jedem Textfeld und jeder Ansicht; gefundene Stellen behebe ich mit `esc()` und nenne sie im Bericht.

## Was sich nicht ändert

- Aussehen und Bedienung der App bleiben gleich; `ui.js` und `design.css` ändern sich nur an den Versionsstellen.
- APD-30 Wischaktionen bleibt bereit und kommt danach als AppDesign 4.60.0 mit Reiselogbuch 3.57.0.

## Prüflauf

- **Voll** (Chromium und WebKit, alle Ansichten), weil sich Prüfungen in `tests/` und Code der App ändern – nach `CLAUDE.md` etwa 60 min.
- Das Skript `stufe` schlägt zurzeit ‚Text‘ vor, weil noch nichts geändert ist; nach dem Bau frage ich es erneut.

## Usertest

Am Gerät ist nur die Version zu prüfen (Testfall /0); die Nummer des Usertests lese ich beim Bau aus dem CHANGELOG ab.

## Backlog

Nächste Version: 5 Punkte bereit (APD-85 Teil 6, APD-30 Wischaktionen, APD-131, APD-54, APD-132) · Offen im Backlog: APD-32 · APD-55 · RLB-6 · APD-1 · APD-70.

## Hinweis Kontext

Der Kontext steht bei etwa 255.000. Nach der Version und dem Bericht ist die Übergabe fällig (ab 300.000); APD-30 Wischaktionen baut dann die nächste Sitzung.
