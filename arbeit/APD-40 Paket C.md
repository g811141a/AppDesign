# APD-40 Paket C – Abläufe (Vorschlag für Wortlaut und Testfall-Liste)

Stand 05.11.2026 · Sitzung Reiselogbuch 0081 · **Wortlaut bestätigt (Nutzer 05.11.2026, Sitzung 0081, 0 Nr. 29);** C-F1 und C-F2 wie empfohlen; mit Paket B bereit für die nächste Version.
Einordnung: `arbeit/APD-40 Einordnung.md` (Paket C = G-7, G-13). Bau zusammen mit Paket B (`arbeit/APD-40 Paket B.md`, Nutzer 05.11.2026).

## So macht es Apple

- **Automatisch speichern:** Notizen, Erinnerungen und Pages sichern Eingaben laufend, ohne Knopf; ein Fenster mit ‚Abbrechen‘ (Kalender ‚Neuer
  Termin‘, Kontakte ‚Bearbeiten‘) verwirft alles seit dem Öffnen – bei uns: Zwischenspeichern alle 10 s (Schutz, falls Safari die App beendet)
  und ‚Änderungen verwerfen‘ über x stellt den Stand beim Öffnen wieder her (R-4.4).
- **Vor Zerstörendem fragen:** Apple fragt vor Löschen, Ersetzen und Zurücksetzen mit einer Abfrage, deren rote Schaltfläche das Verb trägt
  (HIG Alerts, Action sheets; Fotos ‚Foto löschen‘, Einstellungen ‚Zurücksetzen‘). Wo Apple stattdessen ‚Widerrufen‘ anbietet (Mail), gibt es bei
  uns keinen Widerruf – deshalb immer die Sprechblase (R-4.3).

## Befund im Reiselogbuch (gelesen 05.11.2026)

- Erfassungsfenster mit Zwischenspeichern: **Tag** (`openDayDialog`) und **Fazit** (`openFazitDialog`), `AUTOSAVE_MS = 10000`
  (`index.html` Zeile 192, 1690, 1743); beim Verwerfen wird der Stand beim Öffnen zurückgeschrieben.
- Rote bzw. zerstörende Aktionen: ‚Reiselogbuch löschen‘ (Mehr-Menü und Kontextmenü, Zeile 1246, 1256 → Sprechblase Zeile 1261), Smiley
  ‚entfernen‘ (Zeile 1333), ‚Standard-Smileys wiederherstellen‘ (‚Zurücksetzen‘, Zeile 1341), Backup laden ‚Ersetzen‘ (ui.js, Auswahl in einer
  Sprechblase), x mit Änderungen ‚Änderungen verwerfen‘ (R-4.4, schon geprüft).

## Wortlaut – neu im Regelkatalog (Designrichtlinie allgemein 17)

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-5.10 | **Automatisch speichern:** ein Erfassungsfenster sichert Eingaben spätestens 10 s nach der Änderung, ohne Häkchen; ‚Änderungen verwerfen‘ (x) stellt danach den Stand beim Öffnen wieder her | ablauf.mjs – `checkAutoSpeichern` (Uhr der Prüfung vorgestellt; die App nennt ihre Erfassungsfenster und ihren Speicher) | – | 8 |
| R-4.12 | **Erst fragen, dann zerstören:** jede Lösch-, Ersetz- oder Rücksetz-Aktion (roter Menüpunkt, Schaltfläche mit ‚Löschen‘, ‚Entfernen‘, ‚Ersetzen‘, ‚Zurücksetzen‘) zeigt zuerst die Sprechblase (R-4.3); bis zur Bestätigung ändert sich nichts, ‚Abbrechen‘ lässt alles, wie es war | ablauf.mjs – `checkErstFragen` (jede solche Aktion in jeder Ansicht antippen, Speicher vorher und nachher vergleichen) | – | 10, 16 |

## Wortlaut – geändert unter ‚Regeln ohne automatische Prüfung‘

| Nr. | alt | neu |
|---|---|---|
| G-7 | automatisches Speichern alle 10 s; ‚Änderungen verwerfen‘ stellt den Zustand beim Öffnen her · Sicht | ersetzt durch R-5.10 |
| G-13 | Sicherheitsabfrage vor jeder Lösch-, Ersetz- oder Rücksetz-Aktion · Abläufe der App (Löschen) | ersetzt durch R-4.12 |

Inhaltliche Änderung: ‚alle 10 s‘ wird ‚spätestens 10 s nach der Änderung‘ (prüfbar mit vorgestellter Uhr; die App darf früher sichern).

## Fragen (geklärt)

| Nr. | Frage | Befund | Empfehlung |
|---|---|---|---|
| C-F1 | Woran erkennt die Prüfung eine zerstörende Aktion? | Menüpunkte haben `red` (ui.js `mi red`); Schaltflächen in der App nicht einheitlich | **entschieden** (Nutzer 05.11.2026): Menüpunkte über `red`, Schaltflächen über ihren Text (‚löschen‘, ‚entfernen‘, ‚ersetzen‘, ‚zurücksetzen‘, ‚wiederherstellen‘) bzw. `aria-label` |
| C-F2 | Gilt ‚Speicher vorher = nachher‘ auch für Zähler und Einstellungen? | ‚Abbrechen‘ in der Sprechblase darf nichts ändern | ja – verglichen wird der ganze localStorage der App (mit C-F1 bestätigt) |

## Testfälle (automatisch), Chromium und WebKit, alle Ansichten (iPad quer/hoch, iPhone), hell

| Nr. | Regel | Fall | Gegenprobe (muss rot werden) |
|---|---|---|---|
| C-1 | R-5.10 | Erfassungsfenster öffnen, ein Feld ändern, Uhr 10 s vor: der Speicher enthält die Änderung, das Fenster bleibt offen | Zwischenspeichern aus (bzw. 20 s) |
| C-2 | R-5.10 | wie C-1, dann x → ‚Änderungen verwerfen‘: der Speicher ist wieder wie beim Öffnen (auch bei einem vorher leeren Tag: Tag wieder leer) | Verwerfen schreibt den Stand beim Öffnen nicht zurück |
| C-3 | R-5.10 | wie C-1, dann Häkchen: Speicher mit der Änderung, kein doppelter Eintrag, Zähler (Smileys) einmal gezählt | Zähler doppelt nach Zwischenspeichern und Häkchen |
| C-4 | R-5.10 | Fenster geschlossen: Uhr 60 s vor ändert den Speicher nicht (kein Zwischenspeichern ohne offenes Fenster) | Zeitgeber läuft nach dem Schließen weiter |
| C-5 | R-4.12 | jeder rote Menüpunkt (Mehr-Menü, Kontextmenü) und jede zerstörende Schaltfläche: nach dem Antippen steht eine Sprechblase mit roter Schaltfläche (Verb) und ‚Abbrechen‘; Speicher unverändert | ‚Reiselogbuch löschen‘ löscht sofort |
| C-6 | R-4.12 | ‚Abbrechen‘ (bzw. Esc, Tippen daneben): Speicher und Ansicht wie vorher | Abbrechen löscht trotzdem |
| C-7 | alle | Textgröße groß (R-1.10) und nach dem Drehen (Grundregeln): dieselben Ergebnisse | – |
