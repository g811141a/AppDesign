# AppDesign – Backlog (allgemeine Themen)

**Stand 17.10.2026** · Aktuelle Version: AppDesign 4.22.0

Allgemeine Themen, die alle Apps betreffen. App-Themen stehen im Backlog der jeweiligen App.
Aufbau und Regeln wie in `README - Zusammenarbeit allgemein.md`, Abschnitt 4.

---

## 0. Nächste Version – gesammelt, noch nicht gebaut

| Nr. | Prio | Thema | bereit seit |
|---|---|---|---|
| – | – | zurzeit nichts bereit | – |

## 1. Auf iPad und iPhone prüfen

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| P-50 | 1 | **AppDesign 4.22.0 (A-20):** die Zeile Zeit und Token am Ende jeder Antwort endet mit ‚Kontext N‘ (ab 300.000 ‚⚠ Übergabe fällig‘) – im Chat prüfen | offen |

## 2. Weitere Themen (in Klärung)

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| A-18 | 1 | **R-7.3 erweitert (aus Reiselogbuch T-91):** iPad – beim Erscheinen der Tastatur im Fenster ‚Tag‘ springen Fenster und Tabelle hin und her; Ursache vermutlich `placeDialogs` bei jedem Schritt der Tastatur plus Rollen zum Feld; Prüfung bildet nur den Endzustand nach. Plan: Messung auf dem iPad, dann Korrektur (Version B) | offen |
| A-19 | 2 | **Suche in der zentralen Liste (aus Reiselogbuch T-92, Variante C):** Suchfeld in Startliste/Seitenleiste filtert die Einträge, Kachel zeigt die Trefferzahl, Öffnen übergibt den Begriff an die Suche im Eintrag – Erweiterung von R-2.3, 15.2, 15.4 (`arbeit/T-92 Vorschläge.md`) | in Klärung |
| A-01 | 3 | Startseite g811141a.github.io mit allen Apps (früher S-03) | später |

---

## Erledigt

| Nr. | Thema | Version | Datum |
|---|---|---|---|
| E-40 | **A-20 gebaut:** Kontext in der Zeile Zeit und Token, ab 300.000 bzw. nach Zusammenfassung ‚⚠ Übergabe fällig‘ | AppDesign 4.22.0 | 17.10.2026 |
| E-39 | Geprüft: P-49 alles in Ordnung (Reiselogbuch 3.20.1 mit AppDesign 4.21.1); **A-17 damit abgeschlossen** | AppDesign 4.21.1 | 17.10.2026 |
| E-38 | Korrektur A-17: Drehen am Ende der Seite – Abstand zum Ende statt nichts (`topAnchor` mit `{ rest }`), Prüfung `checkTurnEnd` | AppDesign 4.21.1 | 17.10.2026 |
| E-37 | Geprüft: P-48 – A-16 in Ordnung (**A-16 abgeschlossen**); A-17 Seitenleiste ein/aus in Ordnung, Drehen am Ende nicht ok → Korrektur 4.21.1 | AppDesign 4.21.0 | 17.10.2026 |
| E-36 | A-16 Position beim Öffnen (R-7.4, `openAt`) und A-17 R-8.1 bei jeder Änderung der Anordnung (`keepPlace`, Seitenleiste ein/aus) | AppDesign 4.21.0 | 17.10.2026 |
| E-35 | Geprüft: P-47 alles in Ordnung (Reiselogbuch 3.19.0 mit AppDesign 4.20.0); **A-15 damit abgeschlossen** | AppDesign 4.20.0 | 17.10.2026 |
| E-34 | A-15 Kapsel ‚Nach oben / Ans Ende‘ auch im iPhone-Aufbau (Inhaltsansicht, nicht Startliste), ohne Scrollen ausgeblendet (`updateFab`); widerruft E-33 | AppDesign 4.20.0 | 17.10.2026 |
| E-33 | Entscheidung (aus P-45): iPhone ohne Kapsel ‚Nach oben / Ans Ende‘ – nach oben über Tippen auf die Statusleiste, nach unten über die Scroll-Leiste (festhalten und ziehen), wie bei Apple; Satz kommt mit der nächsten Version in 15.17 | – | 17.10.2026 |
| E-32 | Geprüft: P-45 alles in Ordnung (Reiselogbuch 3.17.0 mit AppDesign 4.19.0); **A-14 damit abgeschlossen** | AppDesign 4.19.0 | 17.10.2026 |
| E-31 | A-14 Eingabetaste in Eingabefeldern (R-5.5): einzeilige Felder ‚Fertig‘ schließt die Tastatur, Fenster bleiben offen (vorher schickte die Eingabetaste das Formular ab), mehrzeilige Zeilenumbruch; Prüfung `checkEnterDone` | AppDesign 4.19.0 | 17.10.2026 |
| E-30 | Geprüft: P-44 alles in Ordnung (Reiselogbuch 3.16.0 mit AppDesign 4.18.0); **A-13 damit abgeschlossen** | AppDesign 4.18.0 | 17.10.2026 |
| E-29 | A-13 Liste steht still (R-7.3): Scrollstand beim Öffnen eines Fensters gemerkt und beim Schließen wiederhergestellt, Zeile kurz hervorgehoben, nach ‹ › sichtbar gerollt – Ursache: Safari schiebt beim Öffnen der Tastatur die ganze Seite (Klärung `arbeit/A-13 Klärung und Fall-Liste.md`) | AppDesign 4.18.0 | 16.10.2026 |
| E-28 | Geprüft: P-43 alles in Ordnung (Zeile aus `messung.mjs`); **A-12 damit abgeschlossen** | AppDesign 4.17.0 | 16.10.2026 |
| E-27 | A-12 Werkzeug `werkzeug/messung.mjs` für die Zeile Zeit und Token (Fall-Liste `arbeit/A-12 Fall-Liste.md`, Prüfung `tests/messung.mjs`) | AppDesign 4.17.0 | 16.10.2026 |
| E-26 | Geprüft: T-05 erste Konvertierung (Import-Datei mit ‚Abgleichen‘ geladen, Stichprobe in Ordnung) | ReiseLogBuch-Import 1.2.1 | 16.10.2026 |
| E-25 | Geprüft: P-42 alles in Ordnung (AppDesign 4.16.1 mit Reiselogbuch 3.15.1); **A-10 und A-11 damit abgeschlossen** | AppDesign 4.16.1 | 16.10.2026 |
| E-24 | A-11 Lauf-Werkzeug: Browser nacheinander (erst Chromium, dann WebKit) – schwankende WebKit-Prüfungen im gemeinsamen Lauf | AppDesign 4.16.1 | 15.10.2026 |
| E-23 | A-10 Lauf-Werkzeug mit höchstens so vielen Browsern wie Kernen (4 statt 8) | AppDesign 4.16.1 | 15.10.2026 |
| E-22 | Geprüft: P-41 alles in Ordnung (AppDesign 4.16.0 mit Reiselogbuch 3.15.0); **A-09 (R-7.2) und A-07 damit abgeschlossen** | AppDesign 4.16.0 | 15.10.2026 |
| E-21 | A-09 neue Regel R-7.2 (aus Reiselogbuch T-84): Start im iPhone-Aufbau in der Startliste ohne blauen Eintrag, Prüfung `start.mjs`; Abschnitt 13 Neustart nicht erkennbar | AppDesign 4.16.0 | 15.10.2026 |
| E-20 | A-07 Schneller arbeiten: gezielt lesen, ein voller Prüflauf je Version (Zusammenarbeit 2.4.0, CLAUDE.md 2.2.0) | AppDesign 4.16.0 | 15.10.2026 |
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
