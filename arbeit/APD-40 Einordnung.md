# APD-40 Einordnung – Regeln ohne automatische Prüfung (G-1 bis G-19)

Stand 03.11.2026 · Sitzung Reiselogbuch 0078 · Vorschlag von Claude, noch nicht entschieden. Quelle: Designrichtlinie allgemein 17
‚Regeln ohne automatische Prüfung‘ (Version 4.50.0).

Wird eine G-Regel automatisch geprüft, bekommt sie eine R-Nummer im Katalog und die G-Nummer heißt ‚ersetzt durch R-…‘ (Zusammenarbeit
2.4); der Wortlaut kommt vorher zur Genehmigung (0 Nr. 29).

## Pakete

| Paket | Regeln | Prüfung (Vorschlag) | Art |
|---|---|---|---|
| A – Maße und Stile | G-1, G-2, G-5, G-10 (ohne ‚Statistik als Liste‘), G-15 (`[hidden]`), G-17, G-18 | `hig.mjs` in jeder Ansicht: berechnete Stile und Maße | automatisch |
| B – Texte | G-4, G-12, G-19 (kein ‚…‘ am Menüende, Icons einer Gruppe alle oder keine, höchstens etwa 3 Gruppen im Kontextmenü, ohne ‚wir‘, ‚tippen‘ statt ‚klicken‘) | `hig.mjs`/`ablauf.mjs`: Menüs öffnen, Texte und Titel vergleichen; Dateinamen in `checkPreview` | automatisch |
| C – Abläufe | G-7 (10 s mit gestellter Uhr, ‚Änderungen verwerfen‘), G-13 (jede rote Aktion → Sprechblase) | `ablauf.mjs`, allgemein für jede App | automatisch |
| D – bleibt | G-3, G-6, G-8, G-9, G-11, G-14, G-16; aus G-10 ‚Statistik als Liste‘, aus G-15 Emoji-Varianten, aus G-19 ‚Farbe nie einziges Merkmal‘ | Sicht, Gerät oder Abläufe der App | wie heute |

## Je Regel

| Nr. | Regel (kurz) | Vorschlag | Wie |
|---|---|---|---|
| G-1 | keine Hover-Farbe auf dem iPad | A | Stilregeln mit `:hover` nur unter `@media (hover: hover)` |
| G-2 | gesperrt 40 %; ‚Abbrechen‘ ohne Icon, normal | A | `:disabled` → Deckkraft 0,4; Knopf ‚Abbrechen‘ ohne `svg`, Schriftgewicht 400 |
| G-3 | Icon-Zuordnung der Tabelle | D | Bedeutung – Sicht |
| G-4 | Menüpunkt und Fenster heißen gleich | B | jeden Menüpunkt mit Fenster öffnen, Titel vergleichen |
| G-5 | Fensterbreite 90 % / 480 px / 1100 px | A | Fenster in jeder Ansicht messen |
| G-6 | ‚Neues …‘ öffnet einmal von selbst | D | Abläufe der App |
| G-7 | automatisch speichern alle 10 s; verwerfen | C | Uhr der Prüfung vorstellen (`page.clock`), Speicher vergleichen |
| G-8 | Beträge ‚,00‘, Tausenderpunkt | D | Abläufe der App |
| G-9 | Smiley-Leiste | D | Abläufe der App (teilweise) |
| G-10 | Kopf haftet, Links ohne Unterstreichung, Zahlen rechtsbündig | A | `position: sticky`, `text-decoration`, `text-align` der Zahlenspalten |
| G-11 | Teilen-Menü, ehrliche Meldung | D | Gerät |
| G-12 | Dateinamen-, Datums-, Zeitformat | B | Muster der Dateinamen und Datumsangaben in `checkPreview` |
| G-13 | Abfrage vor Löschen, Ersetzen, Zurücksetzen | C | jede rote Aktion antippen → Sprechblase |
| G-14 | Service Worker, Versionen | D | `offline.mjs`, `version.mjs`, Veröffentlichungs-Skript |
| G-15 | `[hidden]` bei `display`; Emoji-Varianten | A (Teil) | jedes `[hidden]` ist `display: none` |
| G-16 | Filter beim Öffnen auf ‚Alle‘ | D | Abläufe der App |
| G-17 | Menü 340 px, Einträge 46 px, Untermenü ≤ 5 | A | Menüs öffnen und messen |
| G-18 | Info-Icon, Schalterzeilen 52 px, Kapsel 15 px | A | messen |
| G-19 | HIG ‚außerdem‘ | B (Teil) | Texte und Menüs, siehe Paket B |

Reihenfolge: A (Maße, wenig Aufwand, viele Regeln), dann B, dann C. Je Paket eine Testfall-Liste mit Gegenprobe vor dem Bau.
