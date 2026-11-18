# APD-135 Pakete 1 und 3 – Testfall-Liste (0 Nr. 1)

**Stand 18.11.2026** · Sitzung Reiselogbuch 0131 · Wortlaut: `arbeit/APD-135 Pakete 1 und 3 Wortlaut.md` (bestätigt in 0124, W-57 in 0127)

Die Version ändert nur Texte (Regeln, Doku, Kommentare) und die Doku-Prüfung, die App selbst nicht. Gerät × Lage × Darstellung ×
Handlung trifft deshalb nur die Versionszeile (P-111/0). Die Nummern M-n gelten nur in dieser Datei (außerhalb: APD-135/M-n).

## Umfang und Bau

- **Usertest P-110:** alles ok (Nutzer 18.11.2026, Sitzung 0131) – kommt mit dem Bau unter ‚Erledigt‘ in beide Backlogs.
- **Version:** AppDesign **4.61.0** (neue Regeln, neue Prüfung) · Reiselogbuch **3.57.4** (App unverändert, nur Fassung, `CLAUDE.md`, `PROMPT.md`,
  Designrichtlinie Reiselogbuch) · Zusammenarbeit 3.14.1 → **3.15.0** · AppDesign-`CLAUDE.md` 2.12.0 → **2.13.0** · Reiselogbuch-`CLAUDE.md` 3.9.0 → **3.10.0**.
- **Inhalt:** 47 W-Punkte der Pakete 1 (32) und 3 (15), dazu APD-135/W-57 (0 Nr. 25 – AD-Bean klären) und die Backlog-Ordnung APD-135/L-18 –
  alle mit dem bestätigten Wortlaut. **Nicht dabei:** APD-135/W-19 (kommt mit Paket 2), W-29, W-30, W-48 bis W-50, W-53 bis W-56.
- **Neue Dateien:** `README - Zusammenarbeit Versionsgeschichte.md`, `README - Designrichtlinie allgemein Versionsgeschichte.md`, je Repo
  `CLAUDE Versionsgeschichte.md` (Versionsgeschichten ausgelagert, W-31).
- **Prüfstufe: voll** – `tests/` in AppDesign ändert sich (neue Prüfung, W-1, W-2, W-52). `stufe` schlägt vor dem Bau noch ‚Text‘ vor, weil es die
  ungesicherten Änderungen in AppDesign nicht sieht; nach `vorbereiten` frage ich es noch einmal, gebaut wird in jedem Fall voll (im Zweifel voll, 0 Nr. 2).
  Vorher `doku-regeln` und `--gegenprobe schema`. Der letzte volle Lauf dauerte 81:41.

## Testfälle (automatisch)

| Nr. | Fall | Erwartet | Prüfung | gegen 4.60.3 |
|---|---|---|---|---|
| M-1 | Zusammenarbeit allgemein, Designrichtlinie allgemein, AppDesign-`CLAUDE.md`, Reiselogbuch-`CLAUDE.md`: Abschnitt ‚## Versionsgeschichte‘ | dort nur der Verweis auf die Datei daneben, keine Tabellenzeile (W-31) | `doku.mjs` – `checkVersionsgeschichte` (neu), Gegenprobe `schema:APD-135/M-1` | **rot** (4 Meldungen) |
| M-2 | die vier Dateien `… Versionsgeschichte.md` | vorhanden; die erste Zeile ist die eigene Version der Datei – so fehlt nie eine Zeile, wenn eine Version steigt | `checkVersionsgeschichte`, Gegenprobe `schema:APD-135/M-2` | **rot** (4 Meldungen) |
| M-3 | Kasten ‚Immer‘ der Zusammenarbeit | nennt Nr. 21, 22, 1, 8, 27, 29 und 19 (W-18) | `checkVersionsgeschichte`, Gegenprobe `schema:APD-135/M-3` | **rot** (Nr. 1 und Nr. 19 fehlen) |
| M-4 | ‚Verpflichtend‘ der AppDesign-`CLAUDE.md` | nur der Verweis auf den Kasten, keine Regel mit ‚Nr. n‘ wiederholt (W-18) | `checkVersionsgeschichte`, Gegenprobe `schema:APD-135/M-4` | **rot** |
| M-5 | Wortlaute, die wörtlich bleiben müssen (Zeilenumbruch in Abschnitt 0, ‚Folgen beim Bau‘ im Wortlaut) | Kasten, 0 Nr. 11, 15, 26, 28, 29, 2.8 unverändert prüfbar | `checkKasten`, `checkKachel`, `checkCollab`; Gegenproben APD-84/C-1 bis C-5, APD-123/K-1 | grün (bleibt) |
| M-6 | Nummernschema in allen lebenden Dateien, auch den vier neuen | keine Meldung | `checkSchema`, Gegenproben APD-78/S-1 bis S-10 | grün (bleibt) |
| M-7 | Regelkatalog, Versionen, Verweise | keine Meldung; Designrichtlinie, Zusammenarbeit, `PROMPT.md`, README nennen die neuen Versionen | `checkCatalog`, `checkDocs`, `checkCollab` | grün (bleibt) |
| M-8 | feste Fassung `fassung/4.61.0/` | enthält Designrichtlinie und Zusammenarbeit (Regeltext), **nicht** die Versionsgeschichten (Entscheidung 0123, offene Frage 2) | `version.mjs` – `checkFassungen` | grün (bleibt) |
| M-9 | App unverändert | alle Ansichten in Chromium und WebKit wie bisher | voller Prüflauf | grün (bleibt) |

**Rot gegen 4.60.3** (heute, Arbeitsstand `tests/doku.mjs` gegen die Texte von AppDesign 4.60.3 und Reiselogbuch 3.57.3): `checkVersionsgeschichte`
meldet 11 Fehler (4 × M-1, 4 × M-2, 2 × M-3, 1 × M-4); alle übrigen Meldungen von `checkCollab` (Katalog, Schema, Kasten) 0.

## Testfälle (User) – Usertest P-111

**P-111/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.4 · erstellt am … · AppDesign 4.61.0‘.
