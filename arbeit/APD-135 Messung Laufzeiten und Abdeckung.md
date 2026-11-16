# APD-135 Konsolidierung 3 – Messung: Laufzeiten und Abdeckung

**Stand 16.11.2026** · Sitzung 0121 · nur gemessen, nichts gebaut

## Wie gemessen wurde

- Voller Prüflauf im Reiselogbuch 3.56.3 mit AppDesign 4.59.3: `node tests/alle.mjs --alle --abdeckung`, 4 Kerne, erst Chromium, dann WebKit.
- `--abdeckung` zeigt nur Prüfung × Ansicht. Welche Funktionen ein Lauf ausführt, zeichnet eine Messhilfe auf (unten, `cov.cjs`), die über `NODE_OPTIONS=--require` in jeden Chromium-Lauf geladen wird (`page.coverage`); WebKit läuft ohne sie. In der Probe kostete sie etwa 3 s auf 115 s (`ablauf-leer`: 1:55 ohne, 1:58 mit).
- Die Rohdaten liegen in `arbeit/APD-135 Messung Daten.json`.

## Ergebnis

- **160 Läufe grün in 75:27**, davon 2 Wackler: `ablauf-titel-blase` in Chromium (rot nach 00:40, allein grün in 01:02) und `ablauf-seitenleiste-kontextmenue` in WebKit (rot nach 00:29, allein grün in 00:23). Die Meldungen der roten Läufe stehen nicht im Protokoll (`lauf.mjs` druckt sie nur, wenn der Lauf allein wieder rot ist). Der Chromium-Lauf lief mit der Messhilfe.
- `ablauf-markierung-menues` (APD-134) war in beiden Browsern grün.
- Läufe 160 · Summe Rechenzeit 286.8 min (Chromium 138.7, WebKit 148.2) · Prüfdateien 60
- ui.js: 249 Funktionen oberster Ebene, in keinem Chromium-Lauf ausgeführt: 1 (capNext)
- Spalte ‚nur hier‘: Funktionen, die keine andere Prüfdatei ausführt. Eine 0 beweist nicht, dass die Prüfung entbehrlich ist (sie prüft Verhalten, nicht nur Aufrufe) – sie zeigt nur, wo sich das Nachsehen lohnt.

## Tabelle je Prüfdatei (nach Rechenzeit)

| Prüfdatei | Läufe | Chromium min | WebKit min | Summe min | Anteil kum. | ui.js-Fkt. | nur hier (ui.js) | App-Fkt. | nur hier (App) |
|---|---|---|---|---|---|---|---|---|---|
| hig | 16 | 27.8 | 29.8 | 57.6 | 20 % | 199 | 0 | 140 | 0 |
| ablauf-navigation | 6 | 13.2 | 12.7 | 25.9 | 29 % | 171 | 0 | 96 | 0 |
| ablauf-blatt | 4 | 10.6 | 10.4 | 21.0 | 36 % | 186 | 1 | 118 | 0 |
| oeffnen-position | 4 | 6.1 | 6.6 | 12.7 | 41 % | 139 | 0 | 90 | 0 |
| ablauf-suche-liste | 6 | 4.9 | 5.1 | 10.0 | 44 % | 172 | 0 | 117 | 0 |
| regeln-ablauf | 2 | 4.1 | 4.3 | 8.4 | 47 % | 203 | 1 | 152 | 1 |
| ablauf-suche-woerter | 2 | 3.9 | 4.4 | 8.3 | 50 % | 164 | 0 | 119 | 0 |
| ablauf-feld-rollen | 2 | 3.8 | 4.4 | 8.1 | 53 % | 167 | 0 | 104 | 0 |
| ablauf-backup-kachel | 2 | 3.6 | 4.0 | 7.7 | 56 % | 170 | 0 | 101 | 0 |
| ablauf-liste-still | 2 | 3.2 | 3.5 | 6.7 | 58 % | 156 | 0 | 110 | 0 |
| kontextmenue-regeln | 4 | 3.2 | 3.3 | 6.5 | 60 % | 133 | 0 | 81 | 0 |
| kapsel-iphone | 2 | 3.5 | 2.9 | 6.5 | 63 % | 173 | 0 | 112 | 0 |
| ablauf-tastatur-still | 2 | 3.1 | 3.2 | 6.3 | 65 % | 204 | 0 | 126 | 0 |
| ablauf-grossanzeige | 2 | 2.7 | 2.8 | 5.5 | 67 % | 161 | 3 | 83 | 0 |
| ablauf-gesamt | 2 | 2.5 | 2.9 | 5.4 | 69 % | 196 | 0 | 160 | 3 |
| ablauf-preis-km | 2 | 2.3 | 2.6 | 4.8 | 70 % | 178 | 0 | 126 | 2 |
| ablauf-feld-cursor | 2 | 2.2 | 2.5 | 4.7 | 72 % | 159 | 0 | 111 | 0 |
| ablauf-markierung-menues | 2 | 1.9 | 2.8 | 4.7 | 74 % | 166 | 0 | 109 | 0 |
| backup-regeln | 2 | 2.0 | 2.2 | 4.3 | 75 % | 158 | 0 | 86 | 0 |
| ablauf-leer | 2 | 2.0 | 2.1 | 4.1 | 76 % | 162 | 0 | 104 | 1 |
| ablauf-smiley-leiste | 2 | 2.0 | 2.0 | 4.0 | 78 % | 155 | 0 | 105 | 0 |
| offline-regeln | 2 | 1.9 | 2.0 | 3.9 | 79 % | 121 | 0 | 65 | 0 |
| ablauf-beruehren | 2 | 1.9 | 1.9 | 3.8 | 81 % | 155 | 0 | 105 | 1 |
| ablauf-iphone | 6 | 1.7 | 1.8 | 3.5 | 82 % | 186 | 0 | 141 | 0 |
| start-regeln | 2 | 1.6 | 1.8 | 3.4 | 83 % | 174 | 0 | 97 | 0 |
| ablauf-titel-oben | 2 | 1.6 | 1.7 | 3.3 | 84 % | 150 | 0 | 99 | 0 |
| ablauf-suche-iphone | 2 | 1.5 | 1.6 | 3.1 | 85 % | 154 | 0 | 93 | 0 |
| ablauf-kapsel-pfeile | 2 | 1.3 | 1.3 | 2.5 | 86 % | 157 | 0 | 102 | 0 |
| text-regeln | 2 | 1.3 | 1.3 | 2.5 | 87 % | 161 | 0 | 112 | 0 |
| ablauf-bedienung | 2 | 1.1 | 1.2 | 2.4 | 88 % | 203 | 0 | 150 | 0 |
| ablauf-schicht-oben | 2 | 1.1 | 1.2 | 2.3 | 89 % | 156 | 0 | 87 | 0 |
| ablauf-abspielen | 2 | 1.0 | 1.1 | 2.1 | 89 % | 190 | 0 | 124 | 0 |
| ablauf-suche-menue | 2 | 1.0 | 1.1 | 2.1 | 90 % | 161 | 0 | 115 | 0 |
| ablauf-abgleich-ui | 2 | 0.9 | 1.1 | 2.0 | 91 % | 176 | 0 | 108 | 0 |
| ablauf-seitenleiste-position | 6 | 0.9 | 1.0 | 1.9 | 91 % | 161 | 0 | 99 | 0 |
| ablauf-texte-ablaeufe | 2 | 0.9 | 1.0 | 1.9 | 92 % | 173 | 0 | 118 | 0 |
| ablauf-messung | 2 | 0.9 | 0.9 | 1.8 | 93 % | 171 | 3 | 96 | 0 |
| ablauf-titel-blase | 2 | 0.7 | 1.1 | 1.8 | 93 % | 153 | 0 | 97 | 0 |
| ablauf-seitenleiste-hoch | 2 | 0.8 | 0.9 | 1.7 | 94 % | 168 | 0 | 114 | 0 |
| ablauf-einstellen | 2 | 0.8 | 0.9 | 1.7 | 94 % | 156 | 0 | 87 | 0 |
| tastatur | 2 | 0.6 | 0.9 | 1.5 | 95 % | 120 | 0 | 103 | 0 |
| ablauf-fenster-breite | 2 | 0.7 | 0.8 | 1.5 | 95 % | 134 | 0 | 108 | 0 |
| ablauf-glas | 2 | 0.7 | 0.8 | 1.5 | 96 % | 155 | 1 | 85 | 0 |
| ablauf-jahre | 2 | 0.7 | 0.8 | 1.4 | 97 % | 190 | 0 | 121 | 0 |
| ablauf-fremdtext | 2 | 0.6 | 0.7 | 1.3 | 97 % | 164 | 0 | 119 | 1 |
| ablauf-abgleich | 2 | 0.5 | 0.5 | 1.0 | 97 % | 157 | 0 | 85 | 0 |
| ablauf-feld-tastatur | 2 | 0.4 | 0.5 | 0.9 | 98 % | 152 | 0 | 103 | 0 |
| ablauf-verwerfen-abgleich | 2 | 0.3 | 0.5 | 0.9 | 98 % | 147 | 0 | 100 | 0 |
| ablauf-seitenleiste-kontextmenue | 2 | 0.4 | 0.5 | 0.8 | 98 % | 150 | 0 | 82 | 0 |
| ablauf-reisemittel-zeile | 2 | 0.4 | 0.4 | 0.8 | 99 % | 127 | 0 | 86 | 0 |
| ablauf-fenster | 6 | 0.3 | 0.4 | 0.7 | 99 % | 98 | 0 | 78 | 0 |
| ablauf-drehen-luecke | 2 | 0.3 | 0.4 | 0.7 | 99 % | 132 | 0 | 88 | 0 |
| ablauf-abgleich-faelle | 2 | 0.3 | 0.4 | 0.7 | 99 % | 109 | 0 | 80 | 0 |
| verlauf-vorschlaege | 2 | 0.3 | 0.4 | 0.7 | 99 % | 140 | 0 | 101 | 0 |
| link-name | 2 | 0.2 | 0.3 | 0.5 | 100 % | 154 | 0 | 110 | 0 |
| ablauf-suche-tabelle | 2 | 0.2 | 0.3 | 0.5 | 100 % | 157 | 0 | 119 | 0 |
| ablauf-drehen-iphone | 2 | 0.2 | 0.2 | 0.4 | 100 % | 138 | 0 | 83 | 0 |
| version-regeln | 2 | 0.0 | 0.1 | 0.1 | 100 % | 104 | 0 | 35 | 0 |
| doku-regeln | 2 | 0.0 | 0.0 | 0.0 | 100 % | 0 | 0 | 0 | 0 |
| abgleich-regeln | 2 | 0.0 | 0.0 | 0.0 | 100 % | 76 | 0 | 35 | 0 |


## Abdeckung Prüfung × Ansicht (Ausgabe von `--abdeckung`)

```
  abgleich-regeln · chromium                   iPad quer
  abgleich-regeln · webkit                     iPad quer
  ablauf-abgleich · chromium                   iPhone hoch · iPad quer
  ablauf-abgleich · webkit                     iPhone hoch · iPad quer
  ablauf-abgleich-faelle · chromium            –
  ablauf-abgleich-faelle · webkit              –
  ablauf-abgleich-ui · chromium                Fall 8 – iPad · Fall 8 – iPhone · Fall 9 – iPad · Fall 9 – iPhone · Fall 9a – iPad · Fall 9a – iPhone · Fall 9b – iPad · Fall 9b – iPhone · Fall 9c – iPad · Fall 9c – iPhone
  ablauf-abgleich-ui · webkit                  Fall 8 – iPad · Fall 8 – iPhone · Fall 9 – iPad · Fall 9 – iPhone · Fall 9a – iPad · Fall 9a – iPhone · Fall 9b – iPad · Fall 9b – iPhone · Fall 9c – iPad · Fall 9c – iPhone
  ablauf-abspielen · chromium                  2026-10-19 iPhone quer Suche Fenster Gesamtausgaben · 2026-10-19 iPhone quer Suche Fenster Gesamtausgaben (Gegenprobe APD-34/M-5) · 2026-10-20 iPad quer Fenster Ort · 2026-10-20 iPad quer Fenster Ort (Gegenprobe APD-34/M-5) · 2026-10-20 iPhone hoch Fenster Ort · 2026-10-20 iPhone hoch Fenster Ort (Gegenprobe APD-34/M-5) · 2026-10-26 iPhone quer Blatt Ort Quartier · 2026-10-26 iPhone quer Blatt Ort Quartier (Gegenprobe APD-34/M-5)
  ablauf-abspielen · webkit                    2026-10-19 iPhone quer Suche Fenster Gesamtausgaben · 2026-10-19 iPhone quer Suche Fenster Gesamtausgaben (Gegenprobe APD-34/M-5) · 2026-10-20 iPad quer Fenster Ort · 2026-10-20 iPad quer Fenster Ort (Gegenprobe APD-34/M-5) · 2026-10-20 iPhone hoch Fenster Ort · 2026-10-20 iPhone hoch Fenster Ort (Gegenprobe APD-34/M-5) · 2026-10-26 iPhone quer Blatt Ort Quartier · 2026-10-26 iPhone quer Blatt Ort Quartier (Gegenprobe APD-34/M-5)
  ablauf-backup-kachel · chromium              iPad quer hell · iPad quer dunkel · iPad hoch hell · iPhone hoch hell · iPhone quer hell
  ablauf-backup-kachel · webkit                iPad quer hell · iPad quer dunkel · iPad hoch hell · iPhone hoch hell · iPhone quer hell
  ablauf-bedienung · chromium                  iPad quer · iPad quer · Kontrast · ruhig · iPad hoch · iPad hoch · Kontrast · ruhig · iPhone hoch · iPhone hoch · Kontrast · ruhig
  ablauf-bedienung · webkit                    iPad quer · iPad quer · Kontrast · ruhig · iPad hoch · iPad hoch · Kontrast · ruhig · iPhone hoch · iPhone hoch · Kontrast · ruhig
  ablauf-beruehren · chromium                  iPad quer hell · iPad quer dunkel · iPhone hoch hell · iPhone hoch dunkel · iPhone hoch dunkel · ruhig
  ablauf-beruehren · webkit                    iPad quer hell · iPad quer dunkel · iPhone hoch hell · iPhone hoch dunkel · iPhone hoch dunkel · ruhig
  ablauf-blatt · chromium                      iPhone hoch hell · iPhone quer hell · iPhone hoch dunkel · iPhone hoch hell Bewegung reduzieren
  ablauf-blatt · webkit                        iPhone hoch hell · iPhone quer hell · iPhone hoch dunkel · iPhone hoch hell Bewegung reduzieren
  ablauf-drehen-iphone · chromium              iPhone hoch hell
  ablauf-drehen-iphone · webkit                iPhone hoch hell
  ablauf-drehen-luecke · chromium              iPad hoch hell · iPad hoch hell, am Ende · iPad hoch hell, ganz oben
  ablauf-drehen-luecke · webkit                iPad hoch hell · iPad hoch hell, am Ende · iPad hoch hell, ganz oben
  ablauf-einstellen · chromium                 iPad quer hell · iPad hoch hell · iPhone hoch hell · iPhone quer hell · iPhone hoch · Text 53 · iPad hoch · Text 53
  ablauf-einstellen · webkit                   iPad quer hell · iPad hoch hell · iPhone hoch hell · iPhone quer hell · iPhone hoch · Text 53 · iPad hoch · Text 53
  ablauf-feld-cursor · chromium                iPad quer hell · iPad quer hell, Drehen · iPad quer dunkel · iPad quer dunkel · Text 33 · iPhone hoch hell · iPhone hoch hell, Drehen · iPhone hoch dunkel · iPhone hoch dunkel · Text 33 · iPad hoch hell · iPad hoch hell, Drehen · iPad hoch dunkel · iPad hoch dunkel · Text 33 · iPhone quer hell · iPhone quer hell, Drehen · iPhone quer dunkel · iPhone quer dunkel · Text 33
  ablauf-feld-cursor · webkit                  iPad quer hell · iPad quer hell, Drehen · iPad quer dunkel · iPad quer dunkel · Text 33 · iPhone hoch hell · iPhone hoch hell, Drehen · iPhone hoch dunkel · iPhone hoch dunkel · Text 33 · iPad hoch hell · iPad hoch hell, Drehen · iPad hoch dunkel · iPad hoch dunkel · Text 33 · iPhone quer hell · iPhone quer hell, Drehen · iPhone quer dunkel · iPhone quer dunkel · Text 33
  ablauf-feld-rollen · chromium                iPhone hoch hell · iPad quer hell · iPad hoch hell · iPhone quer hell
  ablauf-feld-rollen · webkit                  iPhone hoch hell · iPad quer hell · iPad hoch hell · iPhone quer hell
  ablauf-feld-tastatur · chromium              iPhone quer hell · iPhone hoch hell · iPhone quer dunkel · iPhone hoch dunkel · iPad hoch hell
  ablauf-feld-tastatur · webkit                iPhone quer hell · iPhone hoch hell · iPhone quer dunkel · iPhone hoch dunkel · iPad hoch hell
  ablauf-fenster · chromium                    iPad quer hell · Text 53 · iPad quer dunkel · Text 53 · iPad hoch hell · Text 53 · iPad hoch dunkel · Text 53
  ablauf-fenster · webkit                      iPad quer hell · Text 53 · iPad quer dunkel · Text 53 · iPad hoch hell · Text 53 · iPad hoch dunkel · Text 53
  ablauf-fenster-breite · chromium             iPad quer hell · iPad hoch hell · iPad quer dunkel
  ablauf-fenster-breite · webkit               iPad quer hell · iPad hoch hell · iPad quer dunkel
  ablauf-fremdtext · chromium                  iPad quer hell · iPhone hoch hell
  ablauf-fremdtext · webkit                    iPad quer hell · iPhone hoch hell
  ablauf-gesamt · chromium                     iPad quer hell · iPad hoch hell · iPad quer dunkel · iPad hoch dunkel
  ablauf-gesamt · webkit                       iPad quer hell · iPad hoch hell · iPad quer dunkel · iPad hoch dunkel
  ablauf-glas · chromium                       iPad quer hell · iPad quer dunkel · iPad hoch hell · iPhone hoch hell · iPhone quer dunkel · iPad quer · Backup
  ablauf-glas · webkit                         iPad quer hell · iPad quer dunkel · iPad hoch hell · iPhone hoch hell · iPhone quer dunkel · iPad quer · Backup
  ablauf-grossanzeige · chromium               iPad quer hell · iPad quer · Text 28 (AX1) · iPad hoch hell · iPad hoch · Text 28 (AX1) · iPhone hoch hell · iPhone hoch · Text 28 (AX1) · iPhone quer hell · iPhone quer · Text 28 (AX1) · iPhone hoch · Text 53 (AX5) · iPhone quer · Text 53 (AX5) · iPad quer · Text 17 (L) · iPhone hoch · Text 17 (L)
  ablauf-grossanzeige · webkit                 iPad quer hell · iPad quer · Text 28 (AX1) · iPad hoch hell · iPad hoch · Text 28 (AX1) · iPhone hoch hell · iPhone hoch · Text 28 (AX1) · iPhone quer hell · iPhone quer · Text 28 (AX1) · iPhone hoch · Text 53 (AX5) · iPhone quer · Text 53 (AX5) · iPad quer · Text 17 (L) · iPhone hoch · Text 17 (L)
  ablauf-iphone · chromium                     iPhone hoch hell · Text 53 · iPhone hoch dunkel · Text 53
  ablauf-iphone · webkit                       iPhone hoch hell · Text 53 · iPhone hoch dunkel · Text 53
  ablauf-jahre · chromium                      iPad quer hell · iPad quer dunkel · iPad hoch hell · iPad hoch dunkel · iPhone hoch hell · iPhone hoch dunkel · iPhone quer hell · iPhone quer dunkel
  ablauf-jahre · webkit                        iPad quer hell · iPad quer dunkel · iPad hoch hell · iPad hoch dunkel · iPhone hoch hell · iPhone hoch dunkel · iPhone quer hell · iPhone quer dunkel
  ablauf-kapsel-pfeile · chromium              iPhone hoch hell · iPhone quer hell · iPhone hoch dunkel · iPhone hoch hell Bewegung reduzieren · iPad quer hell
  ablauf-kapsel-pfeile · webkit                iPhone hoch hell · iPhone quer hell · iPhone hoch dunkel · iPhone hoch hell Bewegung reduzieren · iPad quer hell
  ablauf-leer · chromium                       iPad quer hell · iPad quer dunkel · iPad hoch hell · iPhone hoch hell · iPhone quer hell · iPad quer hell · Kontrast erhöhen · iPhone hoch dunkel · iPhone hoch dunkel · Kontrast erhöhen
  ablauf-leer · webkit                         iPad quer hell · iPad quer dunkel · iPad hoch hell · iPhone hoch hell · iPhone quer hell · iPad quer hell · Kontrast erhöhen · iPhone hoch dunkel · iPhone hoch dunkel · Kontrast erhöhen
  ablauf-liste-still · chromium                iPad quer hell · iPad quer · iPad hoch hell · iPad hoch · iPhone hoch hell · iPhone hoch · iPhone quer hell · iPhone quer
  ablauf-liste-still · webkit                  iPad quer hell · iPad quer · iPad hoch hell · iPad hoch · iPhone hoch hell · iPhone hoch · iPhone quer hell · iPhone quer
  ablauf-markierung-menues · chromium          iPad quer hell · iPad quer dunkel · iPad hoch hell · iPad hoch dunkel · iPhone hoch hell · iPhone hoch hell · Mehr-Knopf · iPhone quer hell · iPhone quer hell · Mehr-Knopf · iPad quer hell Bewegung reduzieren · Mehr-Knopf
  ablauf-markierung-menues · webkit            iPad quer hell · iPad quer dunkel · iPad hoch hell · iPad hoch dunkel · iPhone hoch hell · iPhone hoch hell · Mehr-Knopf · iPhone quer hell · iPhone quer hell · Mehr-Knopf · iPad quer hell Bewegung reduzieren · Mehr-Knopf
  ablauf-messung · chromium                    iPad quer · iPad quer leer · iPhone hoch dunkel · iPhone hoch dunkel leer · iPhone quer · iPhone quer leer
  ablauf-messung · webkit                      iPad quer · iPad quer leer · iPhone hoch dunkel · iPhone hoch dunkel leer · iPhone quer · iPhone quer leer
  ablauf-navigation · chromium                 iPhone hoch hell · Text 53 · iPhone quer dunkel · Text 53 · iPad hoch hell · Text 53 · iPad quer dunkel · Text 53 · iPhone hoch dunkel · Text 53 · iPad hoch dunkel · Text 53 · iPhone hoch hell · Text 53 · Bewegung reduzieren · iPad hoch hell · Text 53 · Bewegung reduzieren · iPad quer hell · Text 53 · iPad quer hell · Text 53 · Bewegung reduzieren
  ablauf-navigation · webkit                   iPhone hoch hell · Text 53 · iPhone quer dunkel · Text 53 · iPad hoch hell · Text 53 · iPad quer dunkel · Text 53 · iPhone hoch dunkel · Text 53 · iPad hoch dunkel · Text 53 · iPhone hoch hell · Text 53 · Bewegung reduzieren · iPad hoch hell · Text 53 · Bewegung reduzieren · iPad quer hell · Text 53 · iPad quer hell · Text 53 · Bewegung reduzieren
  ablauf-preis-km · chromium                   iPad quer hell · iPad hoch dunkel · iPhone hoch hell · iPhone quer dunkel · iPhone hoch hell RLB-122 · iPad hoch hell · iPad hoch hell RLB-122 · iPad quer hell RLB-122 · iPhone quer hell · iPhone quer hell RLB-122 · iPad quer RLB-121 · iPad hoch RLB-121 · iPhone hoch dunkel · iPhone hoch RLB-121 · iPhone quer RLB-121 · iPad quer hell U-1 · iPhone hoch hell U-1 · iPad quer leer
  ablauf-preis-km · webkit                     iPad quer hell · iPad hoch dunkel · iPhone hoch hell · iPhone quer dunkel · iPhone hoch hell RLB-122 · iPad hoch hell · iPad hoch hell RLB-122 · iPad quer hell RLB-122 · iPhone quer hell · iPhone quer hell RLB-122 · iPad quer RLB-121 · iPad hoch RLB-121 · iPhone hoch dunkel · iPhone hoch RLB-121 · iPhone quer RLB-121 · iPad quer hell U-1 · iPhone hoch hell U-1 · iPad quer leer
  ablauf-reisemittel-zeile · chromium          iPhone hoch hell · iPhone hoch hell · 8 Reisemittel · iPhone hoch dunkel · iPhone hoch dunkel · 8 Reisemittel · iPhone hoch hell Bewegung reduzieren · 8 Reisemittel · iPhone quer hell · iPhone quer hell · 8 Reisemittel · iPhone hoch hell · 1 Reisemittel · iPad quer hell · iPad quer hell · 8 Reisemittel · iPad hoch dunkel · iPad hoch dunkel · 8 Reisemittel · iPad quer hell · große Schrift · 8 Reisemittel
  ablauf-reisemittel-zeile · webkit            iPhone hoch hell · iPhone hoch hell · 8 Reisemittel · iPhone hoch dunkel · iPhone hoch dunkel · 8 Reisemittel · iPhone hoch hell Bewegung reduzieren · 8 Reisemittel · iPhone quer hell · iPhone quer hell · 8 Reisemittel · iPhone hoch hell · 1 Reisemittel · iPad quer hell · iPad quer hell · 8 Reisemittel · iPad hoch dunkel · iPad hoch dunkel · 8 Reisemittel · iPad quer hell · große Schrift · 8 Reisemittel
  ablauf-schicht-oben · chromium               iPhone quer hell · iPhone quer dunkel · iPhone hoch hell · iPad quer hell · iPad hoch hell · Messung iPhone quer · APD-121/Y-5 2026-11-07 iPhone quer Mehr-Knopf oben 1 · APD-121/Y-5 2026-11-07 iPhone quer Mehr-Knopf oben 2
  ablauf-schicht-oben · webkit                 iPhone quer hell · iPhone quer dunkel · iPhone hoch hell · iPad quer hell · iPad hoch hell · Messung iPhone quer · APD-121/Y-5 2026-11-07 iPhone quer Mehr-Knopf oben 1 · APD-121/Y-5 2026-11-07 iPhone quer Mehr-Knopf oben 2
  ablauf-seitenleiste-hoch · chromium          iPad hoch hell · iPad hoch dunkel · iPad mini hoch · iPad 13″ hoch · iPad 11″ quer · iPad 13″ quer · iPad Grenze
  ablauf-seitenleiste-hoch · webkit            iPad hoch hell · iPad hoch dunkel · iPad mini hoch · iPad 13″ hoch · iPad 11″ quer · iPad 13″ quer · iPad Grenze
  ablauf-seitenleiste-kontextmenue · chromium  iPad quer hell · iPad quer dunkel
  ablauf-seitenleiste-kontextmenue · webkit    iPad quer hell · iPad quer dunkel
  ablauf-seitenleiste-position · chromium      iPad quer · iPad hoch · iPhone · iPhone hoch
  ablauf-seitenleiste-position · webkit        iPad quer · iPad hoch · iPhone · iPhone hoch
  ablauf-smiley-leiste · chromium              iPhone hoch · iPhone quer · iPad quer
  ablauf-smiley-leiste · webkit                iPhone hoch · iPhone quer · iPad quer
  ablauf-suche-iphone · chromium               iPhone hoch hell · iPhone hoch dunkel · iPhone quer hell · iPhone quer dunkel
  ablauf-suche-iphone · webkit                 iPhone hoch hell · iPhone hoch dunkel · iPhone quer hell · iPhone quer dunkel
  ablauf-suche-liste · chromium                iPad quer hell · Text 53 · iPad quer hell · iPad quer dunkel · Text 53 · iPad quer dunkel · iPad hoch hell · Text 53 · iPad hoch hell · iPhone hoch hell · Text 53 · iPhone hoch hell · iPhone hoch dunkel · Text 53 · iPhone hoch dunkel
  ablauf-suche-liste · webkit                  iPad quer hell · Text 53 · iPad quer hell · iPad quer dunkel · Text 53 · iPad quer dunkel · iPad hoch hell · Text 53 · iPad hoch hell · iPhone hoch hell · Text 53 · iPhone hoch hell · iPhone hoch dunkel · Text 53 · iPhone hoch dunkel
  ablauf-suche-menue · chromium                iPad quer hell · iPad quer · iPad hoch hell · iPad hoch · iPhone hoch hell · iPhone hoch · iPhone quer hell · iPhone quer
  ablauf-suche-menue · webkit                  iPad quer hell · iPad quer · iPad hoch hell · iPad hoch · iPhone hoch hell · iPhone hoch · iPhone quer hell · iPhone quer
  ablauf-suche-tabelle · chromium              iPad quer hell · iPad quer dunkel
  ablauf-suche-tabelle · webkit                iPad quer hell · iPad quer dunkel
  ablauf-suche-woerter · chromium              iPad quer hell · iPad hoch dunkel · iPhone hoch hell · iPhone quer dunkel
  ablauf-suche-woerter · webkit                iPad quer hell · iPad hoch dunkel · iPhone hoch hell · iPhone quer dunkel
  ablauf-tastatur-still · chromium             iPhone hoch hell · iPhone hoch hell · Fenster Ort · iPhone quer hell · iPhone quer hell · Fenster Ort · iPad quer hell · iPad quer hell · Fenster Ort · iPad hoch hell · iPad hoch hell · Fenster Ort · iPhone quer hell · Gesamtausgaben · iPhone hoch hell · Gesamtausgaben · iPad quer hell · Gesamtausgaben · iPad hoch hell · Gesamtausgaben · iPhone hoch hell · Gesamtausgaben, 1 Tag · iPhone hoch hell · Suche · iPhone hoch dunkel · iPhone hoch dunkel · Fenster Ort · iPhone quer dunkel · iPhone quer dunkel · Fenster Ort · iPad quer dunkel · iPad quer dunkel · Fenster Ort · iPad hoch dunkel · iPad hoch dunkel · Fenster Ort · iPhone quer dunkel · Gesamtausgaben · iPhone hoch dunkel · Gesamtausgaben · iPad quer dunkel · Gesamtausgaben · iPad hoch dunkel · Gesamtausgaben · iPhone hoch dunkel · Gesamtausgaben, 1 Tag · iPhone hoch dunkel · Suche · APD-36/T-8 2026-10-19 iPhone quer Suche Fenster Gesamtausgaben · APD-36/T-8 2026-10-20 iPad quer Fenster Ort · APD-36/T-8 2026-10-20 iPhone hoch Fenster Ort · APD-36/T-8 2026-10-22 iPhone hoch Ränder · APD-36/T-8 2026-10-22 iPhone quer Ränder · APD-36/T-8 2026-10-24 iPhone hoch Blatt Zug am Rand · APD-36/T-8 2026-10-26 iPhone quer Blatt Ort Quartier · APD-36/T-8 2026-11-06 iPhone quer Mehr-Menü oberer Rand
  ablauf-tastatur-still · webkit               iPhone hoch hell · iPhone hoch hell · Fenster Ort · iPhone quer hell · iPhone quer hell · Fenster Ort · iPad quer hell · iPad quer hell · Fenster Ort · iPad hoch hell · iPad hoch hell · Fenster Ort · iPhone quer hell · Gesamtausgaben · iPhone hoch hell · Gesamtausgaben · iPad quer hell · Gesamtausgaben · iPad hoch hell · Gesamtausgaben · iPhone hoch hell · Gesamtausgaben, 1 Tag · iPhone hoch hell · Suche · iPhone hoch dunkel · iPhone hoch dunkel · Fenster Ort · iPhone quer dunkel · iPhone quer dunkel · Fenster Ort · iPad quer dunkel · iPad quer dunkel · Fenster Ort · iPad hoch dunkel · iPad hoch dunkel · Fenster Ort · iPhone quer dunkel · Gesamtausgaben · iPhone hoch dunkel · Gesamtausgaben · iPad quer dunkel · Gesamtausgaben · iPad hoch dunkel · Gesamtausgaben · iPhone hoch dunkel · Gesamtausgaben, 1 Tag · iPhone hoch dunkel · Suche · APD-36/T-8 2026-10-19 iPhone quer Suche Fenster Gesamtausgaben · APD-36/T-8 2026-10-20 iPad quer Fenster Ort · APD-36/T-8 2026-10-20 iPhone hoch Fenster Ort · APD-36/T-8 2026-10-22 iPhone hoch Ränder · APD-36/T-8 2026-10-22 iPhone quer Ränder · APD-36/T-8 2026-10-24 iPhone hoch Blatt Zug am Rand · APD-36/T-8 2026-10-26 iPhone quer Blatt Ort Quartier · APD-36/T-8 2026-11-06 iPhone quer Mehr-Menü oberer Rand
  ablauf-texte-ablaeufe · chromium             iPad quer · iPhone hoch
  ablauf-texte-ablaeufe · webkit               iPad quer · iPhone hoch
  ablauf-titel-blase · chromium                iPhone hoch hell · iPhone hoch · Text 53 · iPad quer hell · iPad hoch hell · iPhone quer hell
  ablauf-titel-blase · webkit                  iPhone hoch hell · iPhone hoch · Text 53 · iPad quer hell · iPad hoch hell · iPhone quer hell
  ablauf-titel-oben · chromium                 iPad quer hell · iPad hoch hell · iPhone hoch hell · iPhone quer hell · iPad quer hell · Bewegung reduzieren · iPhone hoch hell · Bewegung reduzieren
  ablauf-titel-oben · webkit                   iPad quer hell · iPad hoch hell · iPhone hoch hell · iPhone quer hell · iPad quer hell · Bewegung reduzieren · iPhone hoch hell · Bewegung reduzieren
  ablauf-verwerfen-abgleich · chromium         iPad quer, Tag · iPad quer, leerer Tag · iPad quer, Fazit · iPad quer, Tag ohne Zwischenspeichern · iPhone 10:00 geändert, iPad 11:00 verworfen, Tag · iPhone 10:00 geändert, iPad 11:00 verworfen, Fazit · iPad verworfen, iPhone unverändert
  ablauf-verwerfen-abgleich · webkit           iPad quer, Tag · iPad quer, leerer Tag · iPad quer, Fazit · iPad quer, Tag ohne Zwischenspeichern · iPhone 10:00 geändert, iPad 11:00 verworfen, Tag · iPhone 10:00 geändert, iPad 11:00 verworfen, Fazit · iPad verworfen, iPhone unverändert
  backup-regeln · chromium                     iPad quer hell · iPad quer dunkel · iPad hoch hell · iPad hoch dunkel · iPhone hoch hell · iPhone hoch dunkel · iPhone quer hell · iPhone quer dunkel
  backup-regeln · webkit                       iPad quer hell · iPad quer dunkel · iPad hoch hell · iPad hoch dunkel · iPhone hoch hell · iPhone hoch dunkel · iPhone quer hell · iPhone quer dunkel
  doku-regeln · chromium                       –
  doku-regeln · webkit                         –
  kapsel-iphone · chromium                     iPhone hoch hell · iPhone quer hell · iPad schmal hell · iPad quer hell · iPhone hoch dunkel · iPhone quer dunkel · iPad schmal dunkel · iPad quer dunkel
  kapsel-iphone · webkit                       iPhone hoch hell · iPhone quer hell · iPad schmal hell · iPad quer hell · iPhone hoch dunkel · iPhone quer dunkel · iPad schmal dunkel · iPad quer dunkel
  kontextmenue-regeln · chromium               iPad quer, 3 Einträge · iPad quer, 6 Einträge · iPad quer, 8 Einträge · iPad quer, 9 Einträge · iPad quer, 12 Einträge · iPad hoch, 3 Einträge · iPad hoch, 6 Einträge · iPad hoch, 8 Einträge · iPad hoch, 9 Einträge · iPad hoch, 12 Einträge
  kontextmenue-regeln · webkit                 iPad quer, 3 Einträge · iPad quer, 6 Einträge · iPad quer, 8 Einträge · iPad quer, 9 Einträge · iPad quer, 12 Einträge · iPad hoch, 3 Einträge · iPad hoch, 6 Einträge · iPad hoch, 8 Einträge · iPad hoch, 9 Einträge · iPad hoch, 12 Einträge
  link-name · chromium                         iPad quer · iPhone hoch
  link-name · webkit                           iPad quer · iPhone hoch
  oeffnen-position · chromium                  iPad quer hell · Text 23 · iPad quer hell · iPad hoch hell · Text 23 · iPad hoch hell · iPhone hoch hell · Text 23 · iPhone hoch hell · iPhone quer hell · Text 23 · iPhone quer hell · iPad quer dunkel · Text 23 · iPad quer dunkel · iPad hoch dunkel · Text 23 · iPad hoch dunkel · iPhone hoch dunkel · Text 23 · iPhone hoch dunkel · iPhone quer dunkel · Text 23 · iPhone quer dunkel
  oeffnen-position · webkit                    iPad quer hell · Text 23 · iPad quer hell · iPad hoch hell · Text 23 · iPad hoch hell · iPhone hoch hell · Text 23 · iPhone hoch hell · iPhone quer hell · Text 23 · iPhone quer hell · iPad quer dunkel · Text 23 · iPad quer dunkel · iPad hoch dunkel · Text 23 · iPad hoch dunkel · iPhone hoch dunkel · Text 23 · iPhone hoch dunkel · iPhone quer dunkel · Text 23 · iPhone quer dunkel
  offline-regeln · chromium                    –
  offline-regeln · webkit                      –
  regeln-ablauf · chromium                     iPad quer · iPhone hoch · iPad quer dunkel · iPhone hoch dunkel · iPad hoch · iPhone quer
  regeln-ablauf · webkit                       iPad quer · iPhone hoch · iPad quer dunkel · iPhone hoch dunkel · iPad hoch · iPhone quer
  start-regeln · chromium                      iPhone hoch hell · iPhone quer hell · iPad schmal hell · iPhone hoch hell · RLB-84/F-3 nur beendet · iPhone hoch hell · RLB-84/F-3 nur geplant · iPhone hoch hell · RLB-84/F-4 leer · iPhone hoch hell · RLB-84/F-5 viele · iPad quer hell · iPad hoch hell · iPad quer · RLB-88 · iPad hoch · RLB-88 · iPad quer · RLB-88 S3 · iPad quer · RLB-88 S6 · iPad quer · RLB-88 Ersetzen · iPad quer · RLB-88 Abgleichen · iPad schmal · RLB-88 S11 · iPhone hoch hell · RLB-84/F-17 · iPhone hoch dunkel · iPhone quer dunkel · iPad schmal dunkel · iPhone hoch dunkel · RLB-84/F-3 nur beendet · iPhone hoch dunkel · RLB-84/F-3 nur geplant · iPhone hoch dunkel · RLB-84/F-4 leer · iPhone hoch dunkel · RLB-84/F-5 viele · iPad quer dunkel · iPad hoch dunkel · iPhone hoch dunkel · RLB-84/F-17
  start-regeln · webkit                        iPhone hoch hell · iPhone quer hell · iPad schmal hell · iPhone hoch hell · RLB-84/F-3 nur beendet · iPhone hoch hell · RLB-84/F-3 nur geplant · iPhone hoch hell · RLB-84/F-4 leer · iPhone hoch hell · RLB-84/F-5 viele · iPad quer hell · iPad hoch hell · iPad quer · RLB-88 · iPad hoch · RLB-88 · iPad quer · RLB-88 S3 · iPad quer · RLB-88 S6 · iPad quer · RLB-88 Ersetzen · iPad quer · RLB-88 Abgleichen · iPad schmal · RLB-88 S11 · iPhone hoch hell · RLB-84/F-17 · iPhone hoch dunkel · iPhone quer dunkel · iPad schmal dunkel · iPhone hoch dunkel · RLB-84/F-3 nur beendet · iPhone hoch dunkel · RLB-84/F-3 nur geplant · iPhone hoch dunkel · RLB-84/F-4 leer · iPhone hoch dunkel · RLB-84/F-5 viele · iPad quer dunkel · iPad hoch dunkel · iPhone hoch dunkel · RLB-84/F-17
  tastatur · chromium                          iPad quer hell · iPad quer dunkel · iPad hoch hell · iPad hoch dunkel · iPhone hoch hell · iPhone hoch dunkel
  tastatur · webkit                            iPad quer hell · iPad quer dunkel · iPad hoch hell · iPad hoch dunkel · iPhone hoch hell · iPhone hoch dunkel
  text-regeln · chromium                       iPad quer · iPad hoch · iPhone hoch · iPhone quer
  text-regeln · webkit                         iPad quer · iPad hoch · iPhone hoch · iPhone quer
  verlauf-vorschlaege · chromium               iPad quer hell · iPad hoch dunkel · iPhone hoch dunkel · iPhone quer hell
  verlauf-vorschlaege · webkit                 iPad quer hell · iPad hoch dunkel · iPhone hoch dunkel · iPhone quer hell
  version-regeln · chromium                    –
  version-regeln · webkit                      –
```

## Messhilfe `cov.cjs`

Aufruf im Ordner des Reiselogbuchs: `COV_OUT=<Ordner> NODE_OPTIONS="--require <Pfad>/cov.cjs" node tests/alle.mjs --alle --abdeckung`

```js
// Messhilfe (nur Notizordner, APD-135/B-1): zeichnet in Chromium auf, welche Funktionen von ui.js und index.html ein Prüflauf ausführt.
const path = require('path'), fs = require('fs');
if (process.env.PRUEF_BROWSER !== 'webkit' && /tests\/[^/]+\.mjs$/.test(process.argv[1] || '') && !/alle\.mjs$/.test(process.argv[1])) {
  let pw; try { pw = require('/home/user/ReiseLogBuch/tests/node_modules/playwright'); } catch {}
  if (pw) {
    const OUT = process.env.COV_OUT, hits = {}, seiten = new Set();
    const merke = eintraege => { for (const e of eintraege) {
      const datei = /\/ui\.js$/.test(e.url) ? 'ui.js' : /index\.html/.test(e.url) || /_alt\.html/.test(e.url) ? 'index.html' : null; if (!datei) continue;
      const h = hits[datei] ||= {};
      for (const f of e.functions) { const r = f.ranges[0]; if (r && r.count > 0) { const k = `${f.functionName}@${r.startOffset}-${r.endOffset}`; h[k] = (h[k] || 0) + r.count; } }
    } };
    const stop = async p => { if (!seiten.has(p)) return; seiten.delete(p); try { merke(await p.coverage.stopJSCoverage()); } catch {} };
    const haenge = async p => { try { await p.coverage.startJSCoverage({ resetOnNavigation: false }); seiten.add(p); const zu = p.close.bind(p); p.close = async (...a) => { await stop(p); return zu(...a); }; } catch {} return p; };
    const schreibe = () => { try { const teil = Object.entries(process.env).filter(([k]) => /^PRUEF_(DARSTELLUNG|BEDIENUNG|TEXT|BLATT|GERAET)$/.test(k)).map(([k, v]) => k.slice(6) + '=' + v).join(','); 
      fs.writeFileSync(path.join(OUT, `${path.basename(process.argv[1], '.mjs')}${teil ? '~' + teil : ''}.json`), JSON.stringify(hits)); } catch (e) { console.error('cov', e.message); } };
    const start = pw.chromium.launch.bind(pw.chromium);
    pw.chromium.launch = async (...a) => {
      const b = await start(...a);
      const np = b.newPage.bind(b), nc = b.newContext.bind(b), zu = b.close.bind(b);
      b.newPage = async (...x) => haenge(await np(...x));
      b.newContext = async (...x) => { const c = await nc(...x); const cp = c.newPage.bind(c), cz = c.close.bind(c); c.newPage = async (...y) => haenge(await cp(...y)); c.close = async (...y) => { for (const p of [...seiten]) if (p.context() === c) await stop(p); return cz(...y); }; return c; };
      b.close = async (...x) => { for (const p of [...seiten]) await stop(p); schreibe(); return zu(...x); };
      return b;
    };
    process.on('exit', schreibe);
  }
}
```

## Auswertung `tabelle.mjs`

```js
import { readFileSync, readdirSync, writeFileSync } from 'fs';
const S = process.argv[2];
const src = readFileSync('/home/user/AppDesign/fassung/4.59.3/ui.js', 'utf8');
// Funktionen oberster Ebene: Zeilenanfang ohne Einrückung
const top = []; const re = /^(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)|^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/gm;
let m; while ((m = re.exec(src))) top.push({ name: m[1] || m[2], a: m.index });
top.forEach((t, i) => t.e = i + 1 < top.length ? top[i + 1].a : src.length);
const log = readFileSync(S + '/mess/lauf.log', 'utf8').split('\n');
const sek = t => { const [a, b] = t.split(':').map(Number); return a * 60 + b; };
const seen = new Set(), zz = [];
for (const z of log) { const x = z.match(/^([✓✗]) (.+?) · (chromium|webkit)\s+(\d\d:\d\d)/); if (!x) continue; const k = x[2] + '|' + x[3]; if (seen.has(k)) continue; seen.add(k); zz.push({ lauf: x[2], br: x[3], s: sek(x[4]), ok: x[1] === '✓' }); }
const grp = {};
for (const x of zz) { const n = x.lauf.replace(/ \(.*/, ''); const g = grp[n] ??= { name: n, c: 0, w: 0, laeufe: 0 }; g[x.br === 'chromium' ? 'c' : 'w'] += x.s; g.laeufe++; }
const arr = Object.values(grp).map(g => ({ ...g, t: g.c + g.w })).sort((a, b) => b.t - a.t);
const tot = arr.reduce((a, g) => a + g.t, 0), mm = s => (s / 60).toFixed(1);
const cov = {};
for (const f of readdirSync(S + '/mess/cov').filter(f => f.endsWith('.json'))) {
  const h = JSON.parse(readFileSync(S + '/mess/cov/' + f, 'utf8')); const ui = new Set(), app = new Set();
  for (const k of Object.keys(h['ui.js'] || {})) { const a = +k.match(/@(\d+)-\d+$/)[1]; const t = top.find(t => a >= t.a && a < t.e); if (t) ui.add(t.name); }
  for (const k of Object.keys(h['index.html'] || {})) { const n = k.split('@')[0]; if (n) app.add(n); }
  cov[f.replace(/\.json$/, '')] = { ui: [...ui].sort(), app: [...app].sort() };
}
const alleUi = new Set(Object.values(cov).flatMap(c => c.ui)), nie = top.map(t => t.name).filter(n => !alleUi.has(n));
// je Prüfdatei: Funktionen, die nur dieser Lauf (Datei) ausführt
const jeDatei = {}; for (const [k, v] of Object.entries(cov)) { const n = k.split('~')[0]; (jeDatei[n] ??= { ui: new Set(), app: new Set() }); v.ui.forEach(x => jeDatei[n].ui.add(x)); v.app.forEach(x => jeDatei[n].app.add(x)); }
const zaehl = {}; for (const d of Object.values(jeDatei)) for (const f of d.ui) zaehl[f] = (zaehl[f] || 0) + 1;
const zaehlApp = {}; for (const d of Object.values(jeDatei)) for (const f of d.app) zaehlApp[f] = (zaehlApp[f] || 0) + 1;
let out = `Läufe ${zz.length} · Summe Rechenzeit ${mm(tot)} min (Chromium ${mm(arr.reduce((a, g) => a + g.c, 0))}, WebKit ${mm(arr.reduce((a, g) => a + g.w, 0))}) · Prüfdateien ${arr.length}\n`;
out += `ui.js: ${top.length} Funktionen oberster Ebene, in keinem Chromium-Lauf ausgeführt: ${nie.length} (${nie.join(', ')})\n\n| Prüfdatei | Läufe | Chromium min | WebKit min | Summe min | Anteil kum. | ui.js-Fkt. | nur hier (ui.js) | App-Fkt. | nur hier (App) |\n|---|---|---|---|---|---|---|---|---|---|\n`;
let kum = 0; for (const g of arr) { kum += g.t; const d = jeDatei[g.name]; const nurUi = d ? [...d.ui].filter(f => zaehl[f] === 1) : [], nurApp = d ? [...d.app].filter(f => zaehlApp[f] === 1) : [];
  out += `| ${g.name} | ${g.laeufe} | ${mm(g.c)} | ${mm(g.w)} | ${mm(g.t)} | ${(100 * kum / tot).toFixed(0)} % | ${d ? d.ui.size : '–'} | ${d ? nurUi.length : '–'} | ${d ? d.app.size : '–'} | ${d ? nurApp.length : '–'} |\n`; }
writeFileSync(S + '/mess/Laufzeiten und Abdeckung.md', out);
writeFileSync(S + '/mess/ergebnis.json', JSON.stringify({ zz, top: top.map(t => t.name), cov, nie, zaehl }, null, 1));
console.log(out.split('\n').slice(0, 34).join('\n'));
```
