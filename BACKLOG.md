# AppDesign – Backlog (allgemeine Themen)

**Stand 19.10.2026** · Aktuelle Version: AppDesign 4.27.0

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
| P-58 | 1 | **AppDesign 4.27.0 / Reiselogbuch 3.25.0 am Gerät prüfen** (Prüfliste im CHANGELOG des Reiselogbuchs): A-28 Umbau B (B1) – Zittern beim Tippen (Ablauf P-57), Wischgefühl im Rollbereich, Nach oben / Ans Ende über der Tastatur, Drucken der ganzen Liste, neue Messung; A-29 Suche öffnen und ⓧ nach oben; damit auch A-24 (in der Nachbildung behoben, am Gerät zu bestätigen) | zu prüfen |

## 2. Weitere Themen (in Klärung)

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| A-24 | 1 | Korrektur: Kopf- und Suchzeile zittern beim Tippen am iPhone (P-56/1, /2) – mit A-28 Umbau B (4.27.0) **in der Nachbildung behoben, am Gerät zu bestätigen** (P-58) | wartet auf P-58 |
| A-26 | 1 | **Datumsfeld: Tag antippen übernimmt und schließt (allgemeine Regel, R-5.x – Nutzer 18.10.2026):** nach dem Antippen eines Tages im Kalender übernimmt das System den Tag ins Datumsfeld und kehrt in die Ausgangsmaske zurück (heute bleibt der Kalender offen). Apple-Abgleich (iOS-Datumsauswahl), Machbarkeit in Safari (Schließen nach `change`), Fall-Liste und Muster | in Klärung |
| A-30 | 3 | Vorschläge von Claude (19.10.2026, Analyse Abschnitt 5): Rückgängig nach Löschen (‚Gelöscht · Widerrufen‘), einheitliche leere Zustände, ‚Ziehen zum Aktualisieren‘ bewusst aus – je einzeln entscheiden | Vorschlag |
| A-31 | 1 | **Messung abspielen (Vorschlag V8, Nutzer 19.10.2026):** eine geteilte Messdatei wird in einer Prüfung als Vorgabe für das Safari-Modell geladen – die Prüfung macht genau, was das Gerät gemessen hat; nach der Auswertung von P-57, mit `tests/safari.mjs` | in Klärung |
| A-32 | 3 | **‚Problem melden‘ (Vorschlag V9, Nutzer 19.10.2026):** Messung, Version und Gerät in einer Datei | später |
| A-01 | 3 | Startseite g811141a.github.io mit allen Apps (früher S-03) | später |

---

## Erledigt

| Nr. | Thema | Version | Datum |
|---|---|---|---|
| E-57 | **A-28 Umbau B (B1) und A-29 gebaut:** Rahmen mit festen Zeilen und Rollbereich `rolle` (die Seite rollt nie, so hoch wie der sichtbare Bereich), alle Bausteine rollen darüber; Suche öffnen und ⓧ nach oben; `ablauf-suche-iphone.mjs` grün (vorher rot gegen 3.24.0); neue Prüfungen `checkSearchTop`, `checkFab`, `checkPrint`, Grundregel ‚Seite rollt nie‘ (Gegenprobe rot); Designrichtlinie 13 berichtigt, 15.22, R-2.1/R-2.3 ergänzt; Zusammenarbeit 2.12.0 (Link und Schritte bei jeder Bitte am Gerät). A-24 wartet auf P-58 | AppDesign 4.27.0 | 19.10.2026 |
| E-56 | Geprüft P-57: alles ok – **A-27 abgeschlossen**; Auswertung `arbeit/A-27 Auswertung P-57.md`: Ursache des Zitterns ist das Hin und Her zwischen Rollen zum Treffer (`scrollUnderBar` zieht `offsetTop` ab) und Safari (±121 px hoch, ±21 px quer je Buchstabe nach ⓧ), nicht eine zu kurze Seite; Nutzer 19.10.2026: trotzdem **Umbau B** (A-28) | AppDesign 4.26.0 | 19.10.2026 |
| E-55 | **A-27 gebaut:** Messmodus als Baustein (`messungMenuItems`), Regel R-1.6, Prüfung `checkMessung` (F1–F12, Gegenprobe rot); Zusammenarbeit 0 Nr. 20 übernommen; V8/V9 als A-31/A-32 aufgenommen | AppDesign 4.26.0 | 19.10.2026 |
| E-54 | Geprüft P-56: /0, /3, /4 ok – **A-25 abgeschlossen** (Markierung als Kreis); /1, /2 nicht ok → A-24 offen (Umbau B, A-27/A-28) | AppDesign 4.25.1 | 19.10.2026 |
| E-53 | **A-24 und A-25 gebaut:** Ablauf als feste Prüfung nachgebaut (rot gegen 4.25.0: Suchfeld bei jedem Buchstaben ersetzt, Leiste springt 120 px); Baustein `setHtml` (Feld mit Fokus bleibt), Markierung als Kreis 36 × 36 (seit 4.0.0 42 × 36); Prüfungen Feld bleibt beim Tippen (`checkSearch`, `checkListSearch`), Grundregel ‚rund ist ein Kreis‘ | AppDesign 4.25.1 | 19.10.2026 |
| E-52 | Geprüft: P-55 alles in Ordnung (Lupe am Ende, zwei Wörter, „…“, zentrale Liste, Tippen und Diktieren); **A-21 und A-22 damit abgeschlossen** | AppDesign 4.25.0 | 18.10.2026 |
| E-51 | **A-21 und A-22 gebaut:** Suche mit mehreren Wörtern (alle müssen vorkommen, „…“ = genaue Folge, allgemeine Regel; Einheit legt die App fest), Lupe am Ende der Kapsel; Bausteine und Prüfungen `checkSearchWords`, `checkSearchPlace` | AppDesign 4.25.0 | 18.10.2026 |
| E-50 | Geprüft: P-54 alles in Ordnung (Hervorhebung 2 s + 1 s, iPad und iPhone); **A-23 damit abgeschlossen**; Zusammenarbeit 2.10.0/2.10.1 (0 Nr. 11: Prüfpunkte vollständig im Chat, danach Auswahlfenster zur Rückmeldung) | AppDesign 4.24.0 | 18.10.2026 |
| E-49 | **A-23 gebaut:** Hervorhebung nach dem Fenster 2 s voll blau, 1 s ausblenden (Variante A; ‚Bewegung reduzieren‘ 2 s), endet beim nächsten Fenster; `checkListStill` prüft Farbe und Dauer | AppDesign 4.24.0 | 18.10.2026 |
| E-48 | Geprüft: P-53 alles in Ordnung (Liste steht still nach dem Fenster ‚Tag‘, auch nach ‹ ›, iPad und iPhone); **A-19 damit abgeschlossen**; Zusammenarbeit 2.9.0 (0 Nr. 1: bei ‚nicht ok‘ zuerst den Ablauf des Nutzers als feste Prüfung) | AppDesign 4.23.2 | 18.10.2026 |
| E-47 | **Korrektur R-7.3 gebaut (P-52/2–4):** oberste Zeile nach dem Schließen 1,5 s festhalten, Tastaturhöhe ist kein Drehen, auch nach ‹ › kein Rollen; `checkListStill` neu gefasst (Start mit Lücke, 11 Fälle, Safari-Tastatur einzeln und zusammen), Reiselogbuch-Prüfung `ablauf-liste-still` | AppDesign 4.23.2 | 18.10.2026 |
| E-46 | Geprüft: P-52/1 in Ordnung; **P-52/2–4 nicht ok** – nach dem Öffnen (erster fehlender Tag oben) rückt die Liste nach dem Erfassen eines tieferen Tages bzw. nach ‹ › weg (iPad und iPhone). Wunsch des Nutzers: auch nach ‹ › bei der Zeile bleiben, von der das Fenster kam; feste Prüffälle genau dieser Abläufe | AppDesign 4.23.1 | 18.10.2026 |
| E-45 | **Korrektur R-7.3 gebaut (P-51/5):** beim Öffnen wird die oberste Zeile samt Abstand gemerkt, nach dem Schließen steht sie genau wieder dort; gerollt wird nur nach ‹ › (und gegen die ganze Fensterhöhe statt gegen den Bereich über der Tastatur); `checkListStill` mit nachgebildeter Tastatur | AppDesign 4.23.1 | 18.10.2026 |
| E-44 | Geprüft: P-51/0–4 in Ordnung; **P-51/5 nicht ok** – die Liste rückt nach dem Fenster ‚Tag‘ 1–3 Zeilen hoch (Häkchen und x, sobald die Tastatur offen war) → Korrektur 4.23.1; Wunsch des Nutzers: oberen Stand der Tabelle merken und genau dort wieder ausrichten | AppDesign 4.23.0 | 18.10.2026 |
| E-43 | **A-19 gebaut:** Suche in der zentralen Liste (R-2.3 erweitert, 15.4, `checkListSearch`), beide Suchfelder 1:1 | AppDesign 4.23.0 | 17.10.2026 |
| E-42 | **A-18 verworfen (Nutzer, 17.10.2026):** Tastatur im Fenster ‚Tag‘ – das Mitfahren beim ersten Hochfahren kommt von Safari (rollt die Seite unabhängig vom Feld); Messungen in Sitzung 0010, Messseiten entfernt; R-7.3 bleibt unverändert | – | 17.10.2026 |
| E-41 | Geprüft: P-50 in Ordnung (Zeile Zeit und Token mit Kontext); **A-20 damit abgeschlossen** | AppDesign 4.22.0 | 17.10.2026 |
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
