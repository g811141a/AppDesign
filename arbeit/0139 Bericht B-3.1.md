# Bericht – APD-135 Paket 6 Schritt 2, Teil B-3.1 (vorbereitet, nicht gebaut)

**Stand 19.11.2026** · Sitzung 0139 · Commits: AppDesign `513addf` (`vorbereitung-4.64.0`), Reiselogbuch `d166a33` (`vorbereitung-3.57.7`)

B-3.1 ist fertig und von mir nachgeprüft. Die Vorlage ist jetzt eine kleine neutrale App, gebaut wie das Reiselogbuch, und dient zugleich als Prüfseite.
Auf der daraus abgeleiteten Mindestseite werden die 8 Bausteine der Gruppe A als Werte geprüft. Für jeden Baustein wird ein Fehler eingeschleust, und jeder
wird rot. `ui.js` und `design.css` sind unverändert (`git diff` leer), Bedienung und Aussehen der App ändern sich nicht.

## Alle Änderungen

**AppDesign**
1. `vorlage/index.html` (526 Zeilen): ‚Neue App‘ mit Einträgen und Unterpunkten.
   - Seitenleiste mit `#newItem`, `#sideMore`, `#sideHide` und Backup-Kachel; Kopfzeile mit Teilen und Mehr.
   - iPhone-Navigation, Rollbereich, ‚Nach oben / Ans Ende‘.
   - Mehr-Menü mit Suchen, Backup, Darstellung, Messmodus und Versionszeile.
   - Kontextmenü, rotes ‚Eintrag löschen‘ mit Sprechblase, Fenster ‚Eintrag bearbeiten‘.
   - Suche, Backup laden mit Abgleich.
   - `APPEARANCES`/`setAppearance` sind weg (verletzten R-1.14).
2. `tests/pruefseite.mjs` (neu): öffnet die Vorlage bzw. die Mindestseite mit `ui.js`/`design.css` der eigenen Fassung und enthält `checkWerte` (Gruppe A) mit 8 Gegenproben.
3. `tests/lauf.mjs`: neue Gegenprobe `--gegenprobe pruefseite`; `tests/lauf-selbsttest.mjs` mit Fall APD-135/E-15.
4. `tests/schnittstelle.mjs`: prüft auch die Vorlage (APD-135/E-1); `tests/version.mjs`: die Vorlage gehört zur festen Fassung.
5. Texte nach dem bestätigten Wortlaut: Designrichtlinie 14 (Inhalt, Feste Fassung, Prüfen), 17 Kopf, R-1.14; Versionsgeschichte; `tests/README.md`; `README.md`; CHANGELOG-Thema heißt jetzt ‚APD-135 Paket 6 – Schnittstelle und Prüfseite‘.
6. `fassung/4.64.0` neu angelegt.
7. Nebenbei behoben (offensichtlicher Fehler): in `UEBERGABE.md` stand `(W-73)` ohne Themennummer – `doku-regeln` wurde dadurch rot; jetzt `(APD-30/W-73)`.

**Reiselogbuch**
8. `tests/bausteine-pruefseite.mjs` (neu, 9 Zeilen, Teil `werte`), Eintrag in `tests/alle.mjs`, `tests/README.md`, CHANGELOG 3.57.7.

## Abweichungen vom Vorschlag
- Die Mindestseite braucht `createSync({ …, subAt: 'subAt' })`, sonst wird R-9.4 rot. Kandidat für später: `subAt` in `ui.js` mit Standardwert.
- Die Regelnummern in `checkWerte` sind genauer zugeordnet (z. B. Beträge R-5.1, `esc` R-10.1).
- Befund: `ic('unbekannt')` erzeugt ein unsichtbares `svg` mit dem Text ‚undefined‘ – kein sichtbarer Fehler, Kandidat für APD-136.

## Prüfungen (von mir nachgeprüft, wörtlich)
- `doku-regeln (chromium): alles in Ordnung`
- `schnittstelle-regeln (chromium): alles in Ordnung`
- `bausteine-pruefseite (chromium): alles in Ordnung` · `bausteine-pruefseite (webkit): alles in Ordnung`
- laut Hilfsagent: `version-regeln` in beiden Browsern grün, `lauf-selbsttest: alles in Ordnung`, Gegenprobe ‚alle 16 Läufe wurden rot – jeder mit der passenden Meldung‘.

## Was noch fehlt bis zur Bau-Frage
- **B-3.2** (Punkte 7 bis 10: die 5 Abläufe auf die Prüfseite, Gegenprobe vorher, `ablauf-bausteine` in der App), dann `fassung`, `doku-regeln`, `stufe` und die Bau-Frage (Stufe voll).
- **Kontext 270.391** – die Übergabe ist ab 300.000 fällig. B-3.2 ist groß; es passt nicht mehr sicher in diese Sitzung. Mein Vorschlag: jetzt übergeben, und die Sitzung **Reiselogbuch 0140** macht B-3.2 auf denselben Zweigen weiter.

## Offene Usertests
- **P-114** (Reiselogbuch 3.57.7, AppDesign 4.64.0 – noch nicht gebaut): /0 Version prüfen · /1 iPad quer, Backup ‚In Dateien sichern‘ – Dateiname in einer Zeile.

## Backlog
- **Nächste Version** AppDesign 4.64.0 / Reiselogbuch 3.57.7: APD-138 sowie APD-135 Paket 6 Schritt 1 und 2 (B-3.1 fertig, B-3.2 offen).
- **Neu: APD-140** Bean-Katalog (Prio 1, Aufbau bestätigt; eigene Version 4.65.0 nach P-114).
- **Offen:** APD-135 (danach Paket 7) · APD-136 · APD-140 · APD-139 · APD-70 · RLB-125 · RLB-126 · RLB-6.
