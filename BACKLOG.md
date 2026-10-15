# AppDesign – Backlog (allgemeine Themen)

**Stand 15.10.2026** · Aktuelle Version: AppDesign 4.15.1

Allgemeine Themen, die alle Apps betreffen. App-Themen stehen im Backlog der jeweiligen App.
Aufbau und Regeln wie in `README - Zusammenarbeit allgemein.md`, Abschnitt 4.

---

## 0. Nächste Version – gesammelt, noch nicht gebaut

| Nr. | Prio | Thema | bereit seit |
|---|---|---|---|
| – | – | zurzeit nichts bereit | – |

**0 Punkte bereit** · gebaut wird erst nach ‚Ja‘

## 1. Auf iPad und iPhone prüfen

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| – | – | zurzeit nichts zu prüfen | – |

## 2. Weitere Themen (in Klärung)

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| A-01 | 3 | Startseite g811141a.github.io mit allen Apps (früher S-03) | später |

---

## Erledigt

| Nr. | Thema | Version | Datum |
|---|---|---|---|
| E-19 | Geprüft: P-40 alles in Ordnung (AppDesign 4.15.1 mit Reiselogbuch 3.14.1); **A-06 damit abgeschlossen** | AppDesign 4.15.1 | 15.10.2026 |
| E-18 | K-07 Korrektur zu P-39/1 und /2: App fragt alle 10 s den Service Worker, laufende Nummer statt `navigator.onLine`, Prüfung F-17 (Gerät ohne Safari-Meldung) | AppDesign 4.15.1 | 15.10.2026 |
| E-17 | Geprüft: P-39 ok bis auf /1 und /2 (iPad ohne Meldung beim Wechsel bei offener App) → K-07 | AppDesign 4.15.0 | 15.10.2026 |
| E-16 | A-06 Offline-Hinweis (Variante c, R-1.5 ergänzt): graue Zeile unter der Backup-Kachel, kurze Meldung beim Wechsel und beim Start ohne Netz, Nachrichten des Service Workers, Prüfung F-1 bis F-16 | AppDesign 4.15.0 | 15.10.2026 |
| E-15 | Geprüft: P-38 alles in Ordnung (AppDesign 4.14.2 mit Reiselogbuch 3.13.2); **A-05 damit abgeschlossen** | AppDesign 4.14.2 | 15.10.2026 |
| E-14 | Korrektur zu P-37: Schrittkopf als Gruppe (R-5.1), Offline-Start mit Frist 3 s (neue Regel R-1.5, Prüfung `offline.mjs`) | AppDesign 4.14.2 | 14.10.2026 |
| E-13 | Korrektur: Fassung enthält Designrichtlinie und Zusammenarbeit statt Git-Markierung (aus der Cloud gesperrt); Skript ohne Markierung | AppDesign 4.14.1 | 14.10.2026 |
| E-12 | A-05 Version B: feste Fassung `fassung/X.Y.Z/` (design.css, ui.js, tests/, Prüfsummen, Markierung), Apps laden genau ihre Fassung, `v4/` = neueste Fassung, W-4 nachgeführt; Veröffentlichungs-Skript `werkzeug/veroeffentlichen.mjs` (vorbereiten, fassung, los) mit Selbsttest | AppDesign 4.14.0 | 14.10.2026 |
| E-11 | Geprüft: P-35 alles in Ordnung (AppDesign 4.13.0 mit Reiselogbuch 3.12.0); A-05 Version A damit abgeschlossen | AppDesign 4.13.0 | 14.10.2026 |
| E-10 | A-05 Version A: `pruefe.mjs` (Fehler mit Rückgabewert, Grundregeln nach jedem Schritt), `lauf.mjs` (parallel, schnellste zuerst, Abbruch, Chromium und WebKit), Gegenproben, Selbsttest; Fund R-3.1 Quartier-Link im Reiselogbuch behoben | AppDesign 4.13.0 | 14.10.2026 |
| E-09 | Geprüft: P-34 alles in Ordnung (AppDesign 4.12.2 mit Reiselogbuch 3.11.7); A-02 damit abgeschlossen | AppDesign 4.12.2 | 14.10.2026 |
| E-08 | A-02 Schritte 3 und 4: Allgemeines aus der App nach AppDesign (F-4, W-7, W-8), Zusammenarbeit an Abschnitt 0 angepasst (W-1 bis W-3), CLAUDE.md beider Repos neu (W-5), Prüfung `checkCollab`; W-6 war schon erledigt, W-4 bleibt bis A-05 | AppDesign 4.12.2 | 14.10.2026 |
| E-07 | Geprüft: P-33 alles in Ordnung (AppDesign 4.12.1 mit Reiselogbuch 3.11.6); A-02a damit abgeschlossen | AppDesign 4.12.1 | 14.10.2026 |
| E-06 | Korrekturen aus P-32: Seitenleiste folgt dem sichtbaren Bereich (R-2.1, Safari nachgebildet), `createSync` mit `values` (R-10.1), Katalogprüfung in Code-Kommentaren | AppDesign 4.12.1 | 14.10.2026 |
| E-05 | A-02a Regelkatalog neu: 34 Regeln in 10 Themen (R-<Thema>.<Nr>), je Regel eine Prüfung, 5 neue Regeln, `ablauf.mjs` und `checkCatalog` neu, Zebra auch in App-Tabellen | AppDesign 4.12.0 | 14.10.2026 |
| E-04 | T-02 iPhone-Ansicht geprüft (P-31 alles in Ordnung, Reiselogbuch 3.11.4) | AppDesign 4.11.4 | 14.10.2026 |
| E-03 | A-04 Arbeitsprozess 2.0 festgeschrieben (Zusammenarbeit allgemein 2.0.0, Abschnitt 0), Übergabe-Datei UEBERGABE.md, Verlauf VERLAUF.md | Zusammenarbeit 2.0.0 | 14.10.2026 |
| E-02 | A-03 Sprache (jede Meldung deutsch), R-37 überall geprüft, R-51 oberster Eintrag beim Drehen, Zusammenarbeit 1.16.0 (Prüfung zuerst schärfen, Testfälle selbst ableiten) | AppDesign 4.11.2 | 14.10.2026 |
| E-01 | Design-Repo angelegt (S-01) und Komponenten einmal programmiert (S-02) | AppDesign 4.0.0 | 09.10.2026 |
