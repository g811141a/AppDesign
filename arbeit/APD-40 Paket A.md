# APD-40 Paket A – Maße und Stile (Wortlaut und Testfall-Liste)

Stand 03.11.2026 · Sitzung Reiselogbuch 0078 · **Wortlaut bestätigt (Nutzer 03.11.2026, Sitzung 0078, 0 Nr. 29).** Einordnung:
`arbeit/APD-40 Einordnung.md`.

## Wortlaut – neu im Regelkatalog (Designrichtlinie allgemein 17)

Spalten wie im Katalog: Nr. · Regel · Prüfung · Gerät · Bau. Maße bei Textgröße Standard; mit größerer Textgröße wachsen sie wie heute (R-1.10).

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-1.11 | **Verborgen heißt unsichtbar:** jedes Element mit `hidden` ist nicht zu sehen – eine eigene `display`-Regel hebt `[hidden]` nie auf | hig.mjs (jede Ansicht, alle `[hidden]`) | – | 13 |
| R-3.7 | **Keine Hover-Farbe:** auf iPad und iPhone ändert eine Schaltfläche beim Darüberfahren nichts; Stilregeln mit `:hover` stehen nur unter `@media (hover: hover)` | hig.mjs (Stilregeln) | – | 4 |
| R-3.8 | **Gesperrt und Abbrechen:** gesperrte Schaltflächen, Schalter und Options-Kapseln 40 % Deckkraft; ‚Abbrechen‘ ohne Icon, normale Schrift | hig.mjs (jede Ansicht, jedes Fenster) | – | 4, 15.15, 15.16 |
| R-4.8 | **Fensterbreite:** ein Fenster (außer Meldungen, R-4.3) ist höchstens 90 % der Breite und mindestens 480 px breit (schmaler nur, wenn der Bildschirm es verlangt); Erfassung und Vorschau bis 1100 px | hig.mjs bzw. ablauf.mjs (jedes Fenster, iPad quer und hoch) | – | 7 |
| R-4.9 | **Menümaße:** Menü 340 px breit, Einträge 46 px hoch; ein Untermenü hat höchstens 5 Einträge | ablauf.mjs (jedes Menü öffnen) | – | 15.6 |
| R-5.9 | **Schalterzeilen und Options-Kapsel:** Schalterzeilen 52 px hoch, Options-Kapsel 44 px hoch mit Schrift 15 px | hig.mjs (jedes Fenster mit Schaltern bzw. Kapseln) | – | 15.15, 15.16 |
| R-6.7 | **Tabelle:** der Tabellenkopf haftet beim Rollen, Links ohne Unterstreichung, Zahlenspalten rechtsbündig | hig.mjs (jede Tabelle, App und Ausgabe) | – | 9 |

## Wortlaut – geändert unter ‚Regeln ohne automatische Prüfung‘

| Nr. | alt | neu |
|---|---|---|
| G-1 | keine Hover-Farbe auf dem iPad · Sicht | ersetzt durch R-3.7 |
| G-2 | gesperrt 40 % Deckkraft; ‚Abbrechen‘ ohne Icon, normale Schrift · Sicht | ersetzt durch R-3.8 |
| G-5 | Fensterbreite höchstens 90 %, mindestens 480 px, Erfassung und Vorschau bis 1100 px · Sicht | ersetzt durch R-4.8 |
| G-10 | Tabellenkopf haftet; Links ohne Unterstreichung; Statistik als Liste; Zahlenspalten rechtsbündig · Sicht | Statistik als Liste · Sicht (Rest ersetzt durch R-6.7) |
| G-15 | `[hidden]`-Regel bei Elementen mit `display`; Emoji-Varianten gleich behandeln · Sicht | Emoji-Varianten gleich behandeln · Sicht (Rest ersetzt durch R-1.11) |
| G-17 | Menü 340 px, Einträge 46 px; Untermenü höchstens etwa 5 Punkte · Sicht | ersetzt durch R-4.9 |
| G-18 | Info-Icon; Schalterzeilen 52 px; Options-Kapsel Schrift 15 px · Sicht | Info-Icon · Sicht (Rest ersetzt durch R-5.9) |

Inhaltliche Änderung: R-4.9 ‚höchstens 5‘ statt ‚höchstens etwa 5‘ (sonst nicht prüfbar).

## Testfälle (automatisch), Chromium und WebKit, alle Ansichten (iPad quer/hoch, iPhone), hell und dunkel

| Nr. | Regel | Fall | Gegenprobe (muss rot werden) |
|---|---|---|---|
| A-1 | R-1.11 | jedes `[hidden]` in jeder Ansicht und jedem Fenster hat `display: none` | `.x[hidden]` mit `display: flex` |
| A-2 | R-3.7 | keine Stilregel mit `:hover` außerhalb von `@media (hover: hover)` (design.css und App) | eine `button:hover { background … }` ohne Medienabfrage |
| A-3 | R-3.8 | jede `:disabled` Schaltfläche, jeder gesperrte Schalter und jede gesperrte Kapsel hat Deckkraft 0,4 | Deckkraft 0,5 |
| A-4 | R-3.8 | jeder Knopf ‚Abbrechen‘ ohne `svg`, Schriftgewicht 400 | ‚Abbrechen‘ halbfett bzw. mit Icon |
| A-5 | R-4.8 | jedes Fenster: Breite ≤ 90 % und ≥ 480 px (bzw. volle Breite, wenn schmaler); Erfassung und Vorschau ≤ 1100 px | Fenster 95 % bzw. 400 px |
| A-6 | R-4.9 | jedes Menü 340 px, Einträge 46 px; jedes Untermenü ≤ 5 Einträge | Menü 320 px, sechs Einträge im Untermenü |
| A-7 | R-5.9 | Schalterzeilen 52 px, Options-Kapseln 44 px mit Schrift 15 px | Zeile 48 px, Kapsel 16 px |
| A-8 | R-6.7 | Tabellenkopf `position: sticky`, Links `text-decoration: none`, Zahlenspalten `text-align: right` | Kopf ohne `sticky`, Link unterstrichen |
| A-9 | alle | Textgröße groß (R-1.10): Maße wachsen mit, keine Meldung | – |
| A-10 | alle | nach dem Drehen (Grundregeln) dieselben Maße | – |

Nachtrag 05.11.2026 (Sitzung 0080, Nutzer bestätigt): R-4.8 ‚ein Fenster (außer Meldungen, R-4.3) ist höchstens 90 % …‘; R-6.7 ohne Ausnahme – im Reiselogbuch haftet jetzt auch der Kopf der Quartierliste.
