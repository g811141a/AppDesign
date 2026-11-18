# APD-135 Paket 4 – Testfall-Liste (0 Nr. 1)

**Stand 18.11.2026** · Sitzung Reiselogbuch 0133 · Wortlaut: `arbeit/APD-135 Paket 4 Wortlaut.md` (bestätigt 18.11.2026, Sitzung 0132)

Paket 4 ändert nur Texte: die Designrichtlinie allgemein (Grundsatz APD-135/W-49 und die Paare D-27 bis D-39), die Designrichtlinie Reiselogbuch und das
`PROMPT.md` des Reiselogbuchs (APD-135/W-50). Die App, `ui.js`, `design.css` und die Prüfungen ändern sich nicht. Gerät × Lage × Darstellung × Handlung trifft
deshalb nur die Versionszeile (P-112/0). Die Nummern V-n gelten nur in dieser Datei (außerhalb: APD-135/V-n).

## Umfang und Bau

- **Version:** AppDesign **4.62.0** (Designrichtlinie mit neuer Versionszeile, neue Fassung `fassung/4.62.0/`) · Reiselogbuch **3.57.5** (App
  unverändert: Fassung, Designrichtlinie Reiselogbuch, `PROMPT.md`) · Zusammenarbeit bleibt 3.15.0 · `CLAUDE.md` bleiben.
- **Inhalt:** 46 Stellen nach dem bestätigten Wortlaut – W-49 (1), D-27 bis D-39 (21 Blöcke), RLB-DR (3), PROMPT (21). Nicht dabei: Kopf von 17 und der
  G-Regeln (bleibt), G-16 → R-Regel (Paket 5), W-51.
- **Einsetzen:** mit dem Skript `arbeit/APD-135 Paket 4 pruefen.mjs --einsetzen` – es nimmt die Blöcke ‚alt‘ und ‚neu‘ wörtlich aus der Wortlaut-Datei,
  nichts wird abgeschrieben; erst nach `vorbereiten`.
- **Prüfstufe: voll** – die Designrichtlinie gehört zur festen Fassung (Plan Paket 4); vorher `stufe` fragen, im Zweifel voll (0 Nr. 2). Der letzte volle
  Lauf dauerte 82:23 (0131).

## Testfälle (automatisch)

| Nr. | Fall | Erwartet | Prüfung | gegen heute (4.61.0 / 3.57.4) |
|---|---|---|---|---|
| V-1 | jede der 46 Stellen: alter Text | steht nicht mehr in der Datei | `APD-135 Paket 4 pruefen.mjs` | **rot** (46 alte Texte da) |
| V-2 | jede der 46 Stellen: neuer Text (D-46 Nr. 1: Zeile gestrichen) | steht genau einmal in der Datei | `APD-135 Paket 4 pruefen.mjs` | **rot** (0 von 46) |
| V-3 | **Wert bleibt:** jedes Code-Wort der Liste ‚bleibt‘ (z. B. `.fclear`, `sideFootRect()`, `iconText`, `settings.appearance`) | steht im neuen Text oder weiter an anderer Stelle der Datei (z. B. `.fab` in 15.1) | `APD-135 Paket 4 pruefen.mjs`; Gegenprobe `GP="D-28\|.fclear"` → rot | grün (Trockenlauf) |
| V-4 | **Nummer stimmt:** jede Regel der Überschrift eines Paars (R-2.4 … R-9.1) | steht im neuen Text des Paars | `APD-135 Paket 4 pruefen.mjs`; Gegenprobe `GP="D-37\|R-7.2"` → rot | grün (Trockenlauf) |
| V-5 | jede R- und G-Nummer der neuen Texte | hat eine Zeile im Katalog, keine alte Nummer | `doku.mjs` `checkCatalog` | grün (bleibt) |
| V-6 | verbotene Sätze, PROMPT ohne ‚siehe Designrichtlinie allgemein n‘, Versionszeilen | keine Meldung | `doku.mjs` `checkCollab`, `checkDocs` | grün (bleibt) |
| V-7 | Nummernschema in allen lebenden Dateien, auch diese Liste und die Übergabe | keine Meldung | `doku.mjs` `checkSchema`, Gegenproben `--gegenprobe schema` (APD-78/S-1 bis S-10) | war **rot** – 5 Meldungen in `UEBERGABE.md` (Nummern ohne APD-135/, Verweis auf diese Liste); nach dieser Datei und der Korrektur der Übergabe **grün**, Gegenprobe 20 von 20 rot |
| V-8 | feste Fassung `fassung/4.62.0/` | enthält die neue Designrichtlinie | `version.mjs` `checkFassungen` | grün nach `fassung` |
| V-9 | App unverändert | alle Ansichten in Chromium und WebKit wie bisher | voller Prüflauf | grün (bleibt) |

**Lauf gegen heute (18.11.2026, Sitzung 0133):** `APD-135 Paket 4 pruefen.mjs` **rot** – 46 alte Texte gefunden, 0 neue (V-1, V-2); Trockenlauf mit
eingesetztem Wortlaut **grün** (46 neue, 0 alte, kein Wert und keine Nummer fehlt); beide Gegenproben rot. `doku-regeln` erst **rot**, 5 Meldungen in
`UEBERGABE.md` (V-7); nach der Korrektur grün, `--gegenprobe schema`: alle 20 Läufe rot mit der passenden Meldung.

## Testfälle (User) – Usertest P-112

**P-112/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.5 · erstellt am … · AppDesign 4.62.0‘.
