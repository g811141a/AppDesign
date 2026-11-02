# APD-85 Teil 4 – Testfall-Liste: Schalter beim Hereingleiten (R-3.1)

Stand 02.11.2026 · Sitzung Reiselogbuch 0075 · **bestätigt (Nutzer 02.11.2026), bereit für 4.49.2** · Werkzeug, keine Regel der App · Vorschlag für AppDesign 4.49.2 (mit APD-108, 0 Nr. 8)

## Befund

- **V-A (UEBERGABE 0074, zweites `los` für 4.49.1):** `ablauf-markierung-menues` · WebKit meldete R-3.1 ‚`input ‚#fPriceOn‘ 51×31 px (mind. 44)`‘ –
  allein grün, unter Last rot (sechster Wackler, Backlog APD-85).
- **V-B (Code `tests/hig.mjs` Zeile 174):** ein Schalter gilt nur dann als Schalter (mindestens 28 statt 44), wenn seine Klasse oder die
  Klasse darüber `switch`/`toggle` enthält **oder** er mindestens 51 × 31 px misst. Im Reiselogbuch haben alle Schalter `switch role="switch"`
  (`index.html`, z. B. Zeile 1383), die Klasse darüber heißt `check sw` – es zählt also nur die Größe. Gleitet das Fenster gerade herein
  (verkleinert oder verschoben, wie schon beim Rundungsfehler APD-72 in derselben Prüfung), misst der Schalter knapp unter 51 × 31
  (gerundet 51×31) und wird mit 44 gemessen. **Vermutung** – unter Last nicht nachgestellt; die Meldung passt genau dazu.

## Änderung

`hig.mjs`: ein Schalter ist, was `[switch]` oder `role="switch"` hat (wie Apple: ein Schalter ist ein eigenes Bedienelement mit 51 × 31 pt,
Antippfläche ab 28 pt laut Designrichtlinie R-3.1) – die Größe entscheidet nicht mehr.

## Testfälle (automatisch)

| Nr. | Fall | Erwartet | Prüfung | gegen 4.49.1 |
|---|---|---|---|---|
| V-1 | Fenster mit Schalter (`#fPriceOn`) halb hereingeglitten (Fenster auf 98 % verkleinert) | kein R-3.1 für den Schalter | `ablauf-markierung-menues` (neuer Schritt) | rot |
| V-2 | Gegenprobe: ein Kästchen ohne `switch`/`role="switch"`, 30 × 30 px | R-3.1 (mind. 44) gemeldet | `ablauf-markierung-menues` | grün |
| V-3 | Gegenprobe: ein Schalter, auf 26 px Höhe verkleinert | R-3.1 (mind. 28) gemeldet | `ablauf-markierung-menues` | rot (heute 44 statt 28) |
| V-4 | alle Ansichten, nach jedem Schritt | Grundregeln (`pruefe.mjs`) | alle | grün |

Die übrigen Wackler (`ablauf-titel-blase`, `ablauf-jahre`, `ablauf-gesamt`, Laufzeit `ablauf-blatt`) bleiben wie vereinbart im Backlog, bis sie
wieder als ‚⚠ wackelt‘ gemeldet werden.

## Testfälle (User)

keine – nur die Prüfung ändert sich.
