# APD-135 Paket 2 – Testfall-Liste (0 Nr. 1)

**Stand 18.11.2026** · Sitzung Reiselogbuch 0132 · Wortlaut: `arbeit/APD-135 Paket 2 Wortlaut.md` (bestätigt 18.11.2026, Sitzung 0132)

Paket 2 ändert das Import-Repo (Anleitung, Werkzeug) und eine Zeile der AppDesign-`CLAUDE.md`. Die App und die feste Fassung ändern sich nicht
(`CLAUDE.md` gehört nicht zur Fassung, `tests/version.mjs` `TEXTE`). Gerät × Lage × Darstellung × Handlung trifft deshalb keine Ansicht der App; was nur
das Gerät zeigt, ist das Laden einer Import-Datei mit Kilometern und Preis – das prüft das Werkzeug in der echten App (Chromium und WebKit). Die
Nummern Q-n gelten nur in dieser Datei (außerhalb: APD-135/Q-n).

## Umfang und Bau

- **Version:** ReiseLogBuch-Import **1.4.0** (`CLAUDE.md` 1.2.0, `PROMPT.md` 1.4.0, `pruefen.mjs`, README) · AppDesign-`CLAUDE.md` 2.13.0 → **2.14.0** (W-19).
  Keine neue AppDesign- oder Reiselogbuch-Version, kein App-Prüflauf (Befund Abschnitt 5, Paket 2).
- **Neue Werkzeug-Fälle:** RLB-5/F-23 (Kilometer) und RLB-5/F-24 (Quartierpreis) – Fortsetzung der Fälle des Werkzeugs (F-20 bis F-22 kamen mit Import 1.2.0).
- **Prüfung:** `pruefen.mjs --selbsttest` (Chromium und WebKit) und einmal `doku.mjs` (liest das Import-Repo mit, `checkSchema`).

## Testfälle (automatisch)

| Nr. | Fall | Erwartet | Prüfung | gegen heute (c747fee) |
|---|---|---|---|---|
| Q-1 | Beispielreise mit `km` 12,5 und `price` 89 am ersten Tag eines eigenen Quartiers, `kmColumn: true`, `priceOn: true` | grün: Inhalt (F-13) und in der echten App leer, zweimal, korrigiert, zum Bestand (F-2 bis F-5), unverändert angekommen (F-14), Tagestabelle hell und dunkel ohne Konsolenfehler (F-15), HTML-Ausgabe (F-16) | `pruefen.mjs --selbsttest` mit `beispiel.json` | **rot** (F-13 unbekanntes Feld `km`, `price`) |
| Q-2 | `km` 120 | rot RLB-5/F-23 | Gegenprobe im Selbsttest | rot erst mit F-23 |
| Q-3 | `km` 12,55 (zwei Nachkommastellen) | rot RLB-5/F-23 | Gegenprobe im Selbsttest | rot erst mit F-23 |
| Q-4 | `km` vorhanden, `kmColumn: false` | rot RLB-5/F-23 (‚dann in der Reise `kmColumn: true`‘) | Gegenprobe im Selbsttest | rot erst mit F-23 |
| Q-5 | `price` an einem Tag mit `sameQuarter: true` (nicht der erste Tag des Aufenthalts) | rot RLB-5/F-24 | Gegenprobe im Selbsttest | rot erst mit F-24 |
| Q-6 | `price` als Text ‚89 €‘ bzw. negativ | rot RLB-5/F-24 | Gegenprobe im Selbsttest | rot erst mit F-24 |
| Q-7 | `price` vorhanden, `priceOn: false` | rot RLB-5/F-24 (‚dann in der Reise `priceOn: true`‘) | Gegenprobe im Selbsttest | rot erst mit F-24 |
| Q-8 | eine Import-Datei prüfen **ohne** `--zone` (J-34) | Abbruch mit Hinweis auf `--zone` und I-13, Rückgabe ≠ 0, ohne Browser | Selbsttest startet das Werkzeug ohne `--zone` | **rot** (heute Vorgabe Wien) |
| Q-9 | `leseFormat` liest Tagesfelder auch aus `next.x =` | `km` und `price` unter den Tagesfeldern | Selbsttest (F-13 in Q-1), dazu eigene Meldung, wenn sie fehlen | **rot** |
| Q-10 | Nummernschema in allen lebenden Dateien, auch Import-Repo und diese Datei | keine Meldung | `doku.mjs` `checkSchema` | grün (bleibt) |
| Q-11 | Wortlaut nach `APD-135 Paket 2 Wortlaut.md` | alte Sätze weg, neue da | Selbstkontrolle mit `grep` je Satz | – |

**Lauf gegen heute (18.11.2026, Sitzung 0132):** Selbsttest mit den neuen Fällen **rot, 12 Meldungen** – F-13 `km`/`price` unbekannt (Q-1, 2×),
`leseFormat` ohne `km`/`price` (Q-9, 2×), I-13 kein Abbruch ohne `--zone` (Q-8), 7 Gegenproben F-23/F-24 nicht rot (Q-2 bis Q-7). Vorher ohne die neuen
Fälle: grün (Format aus Reiselogbuch 3.57.4). `veroeffentlichen.mjs stufe --app reiselogbuch`: ‚Stufe Text – doku-regeln, version-regeln, text-regeln‘.

**Nicht geändert, bleibt grün:** F-1 bis F-22, I-2, I-8, I-9 (Selbsttest), Datenschutz F-18.

## Testfälle (User)

Keine – die App ändert sich nicht, und eine Konvertierung prüft der Nutzer erst, wenn er wieder eine Unterlage bringt (dann nach `PROMPT.md`
Abschnitt 8). Hinweis aus Befund L-24 (in der Bau-Frage): bei Änderungen an `index.html`-Mustern oder `ui.js`-Klassen einmal `pruefen.mjs --selbsttest`.
