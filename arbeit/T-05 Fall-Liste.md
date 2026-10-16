# T-05 – Fall-Liste: Import-Repo `ReiseLogBuch-Import`

Stand 16.10.2026 · Sitzung ‚Reiselogbuch 0007‘ · enthält **keine Reisedaten** (darum hier im öffentlichen AppDesign)

## 1. Was ins private Repo kommt

| Datei | Inhalt |
|---|---|
| `CLAUDE.md` | Startfrage (Zusammenarbeit 0 Nr. 19) mit ‚Reiselogbücher konvertieren‘; zuerst `PROMPT.md` lesen; **Datenschutz-Regel**: Originale und Ergebnisse nur im Notizordner der Sitzung, nie in einem Repo |
| `PROMPT.md` | die Anleitung: Ablauf, Format der Backup-Datei, Zuordnung alter Text → Felder, Regeln, Rückfragen, Dateiname |
| `werkzeug/pruefen.mjs` | prüft jede erzeugte Datei in der echten App (Reiselogbuch aus dem öffentlichen Repo, Chromium und WebKit) |
| `werkzeug/beispiel.json` | **erfundene** Beispielreise für die Selbstprüfung des Werkzeugs |
| `.gitignore` | sperrt alle Daten (`*.json` außer `werkzeug/beispiel.json`, `*.docx`, `*.pdf`, `*.xlsx`, Bilder …) |

## 2. Ablauf einer Konvertierung (steht in `PROMPT.md`)

1. Startfrage → ‚Reiselogbücher konvertieren‘ → ‚Häng die alte Datei an‘ (eine oder mehrere, auch mehrere Reisen in
   einer Datei).
2. Auslesen (Word, PDF, Excel, HTML, Fotos) in den Notizordner der Sitzung.
3. Zuordnen: Titel, Reiseteilnehmer, Beginn/Ende, Reisemittel; je Tag Wetter (nur genannt: ‚sonnig‘ → ☀️), Verlauf
   (eine Zeile je Punkt), Wie war was?, Essen und Trinken, Quartier (+ Ort); Fazit, Gesamtausgaben. **Tippfehler
   korrigieren, sonst nichts umformulieren, nichts erfinden.** Spalte Essen nur an, wenn Essen vorkommt.
4. Rückfragen gesammelt (Auswahlfenster, bis 4 Fragen; mehr → Antwortzeile): fehlendes Jahr, fehlende Teilnehmer,
   unleserliche Stellen, Widersprüche, Reise schon in der App?
5. Datei bauen, `werkzeug/pruefen.mjs` laufen lassen, erst bei Grün weitergeben.
6. Antwort: kurze Übersicht je Reise (Zeitraum, n Tage, Quartiere, was korrigiert, was leer blieb) + Datei
   **‚Ω Import Reiselogbuch JJJJ.MM.TT hh.mm.json‘** als Anhang → du: in Dateien sichern → ‚Backup laden‘ → ‚Abgleichen‘.

## 3. Fälle für `werkzeug/pruefen.mjs` (je Fall eine automatische Prüfung)

| Nr. | Fall | erwartet |
|---|---|---|
| F-1 | Datei lesbar, `trips` ist eine Liste | App meldet keinen Fehler beim Laden |
| F-2 | Laden in **leere** App über ‚Backup laden‘ → ‚Abgleichen‘ | alle Reisen unter ‚Hinzugefügt‘ |
| F-3 | Laden in App **mit vorhandenen** Reisen | vorhandene bleiben unverändert, neue kommen dazu |
| F-4 | **dieselbe Datei zweimal** laden | nichts doppelt, beim 2. Mal ‚unverändert‘ |
| F-5 | **korrigierte Datei** (gleiche Kennung, Text geändert) | Reise aktualisiert, nicht doppelt |
| F-6 | Pflichtfelder: Titel, Reiseteilnehmer, Beginn, Ende; Ende ≥ Beginn | sonst rot mit Grund |
| F-7 | jeder Tag ist ein Datum zwischen Beginn und Ende | sonst rot |
| F-8 | kein leerer Tag | sonst rot |
| F-9 | Reisemittel nur bekannte (PKW, Zug, Fahrrad, Flugzeug, Leihwagen, Schiff, Wohnmobil, Fuß) | sonst rot |
| F-10 | Wetter nur Symbole der App (☀️ 🌤 🌦 🌧 ☁️ ⛈ ❄️) | sonst rot |
| F-11 | Gesamtausgaben Zahl oder leer | sonst rot |
| F-12 | feste Kennung `import-JJJJ-MM-TT-<titel>`, eindeutig | sonst rot |
| F-13 | unbekannte Feldnamen (Tippfehler) | rot mit Feldname |
| F-14 | Umlaute, ß, Emojis kommen unverändert in der App an | Text in der Tagestabelle gleich |
| F-15 | Reise öffnen: Tagestabelle, Fazit, Quartierliste ohne Fehler in der Konsole, hell und dunkel | grün |
| F-16 | HTML-Ausgabe der Reise lässt sich erzeugen | grün |
| F-17 | viele Tage (60) und lange Texte | wird gelesen und angezeigt |
| F-18 | **Datenschutz:** Datei liegt im Repo-Ordner oder `git status` zeigt Daten | Werkzeug bricht ab |
| F-19 | Gegenprobe: absichtlich kaputte Beispieldateien (je F-6 bis F-13) | jede wird rot |

## 4. Nur auf dem Gerät (Prüfliste für dich)

- P-1 Datei aus dem Chat in Dateien (iCloud Drive) sichern.
- P-2 iPad: vorher Backup erstellen → ‚Backup laden‘ → Datei → ‚Abgleichen‘ → Ergebnisfenster zeigt die neuen Reisen.
- P-3 Stichprobe: eine importierte Reise öffnen, Tage und Quartiere ansehen.
- P-4 iPhone: Abgleich wie gewohnt – die importierten Reisen kommen mit.
- Bei Fehler: das vorher erstellte Backup mit ‚Ersetzen‘ zurückladen.

## 5. Keine App-Version

Reiselogbuch und AppDesign bleiben unverändert (3.15.1 · 4.16.1). Das Werkzeug nutzt die veröffentlichte App aus dem
öffentlichen Repo, liest nur.

## Entscheidungen (16.10.2026)

- Dateiname: **‚Ω Import Reiselogbuch JJJJ.MM.TT hh.mm.json‘** → ja.
- Anlegen des Import-Repos: offen (Nutzer schreibt im Chat).
