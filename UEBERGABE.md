# Übergabe an die nächste Sitzung

**Stand 14.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0002 – A-02 Schritte 3 und 4‘
(Zusammenarbeit allgemein 2.0.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | 3.11.7 (14.10.2026 12:58) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign (ui.js, design.css) | 4.12.2 | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Designrichtlinie allgemein | 4.12.2 (Regelkatalog R-1.1 bis R-10.4, 34 Regeln in 10 Themen) | `README - Designrichtlinie allgemein.md` |
| Designrichtlinie Reiselogbuch | 3.11.7 | im Repo ReiseLogBuch |
| Zusammenarbeit allgemein | 2.3.0 (Abschnitt 0 = Arbeitsprozess 2.0, hat Vorrang; Abschnitte 1–9 angepasst) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0003** (Zusammenarbeit 0 Nr. 13).
- **Offene Prüfpunkte:** keine – P-34 erledigt (alles in Ordnung, 14.10.2026).
- **Nächste Version:** nichts bereit (AppDesign und Reiselogbuch).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58 – startet jede Woche eine frische
  Sitzung, liest diese Datei und beide Backlogs und endet mit dem Starttext.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0002 – A-02 Schritte 3 und 4‘** (Fall-Liste `arbeit/A-02b Fall-Liste.md`, freigegeben):
- AppDesign 4.12.2 / Reiselogbuch 3.11.7: Vorschau seitlich wischen jetzt in der allgemeinen Richtlinie (Abschnitt 7,
  R-6.4); Designrichtlinie Reiselogbuch nur noch Ausprägungen mit Verweisen; alter Text ‚Backup laden … ersetzt‘ weg;
  Feldnamen ‚Reisemittel‘; PROMPT-Versionszeile nachgeführt.
- Zusammenarbeit 2.2.0: Korrekturen sofort (auch ohne Datenverlust), Antwortzeile nur bei mehr als 4 Fragen, Muster als
  Datei vor dem Fenster, Doppeltes durch Verweise auf Abschnitt 0. CLAUDE.md AppDesign 2.0.0, Reiselogbuch 3.0.0.
- Neue Prüfung `checkCollab` (doku.mjs) gegen veraltete Stellen; `checkCatalog` prüft jetzt auch die Zusammenarbeit
  (stand versehentlich im Kommentar); Vorschau-Prüfung auch iPad hoch und iPhone quer.
- A-02 ist damit abgeschlossen (W-4 bleibt bis A-05).
- **Neue allgemeine Regel (Zusammenarbeit 2.3.0, 0 Nr. 14):** nach der Übergabe am Ende der Antwort fett
  ‚Die Sitzung (Chat) ist damit beendet!‘, danach nur die Zeile mit Zeit und Token.

**Sitzung ‚Reiselogbuch 0001 – AppDesign 4.12.0‘:**

- **Fall-Liste:** `arbeit/A-02a Fall-Liste.md` (freigegeben), mit Ergebnis je Fall.
- **AppDesign 4.12.0 (A-02a):** Regelkatalog neu (Abschnitt 17, mit Spalte ‚ersetzt‘ und Zuordnung alt → neu); alle
  Prüfskripte melden die neuen Nummern; neu `tests/ablauf.mjs` (R-2.3, R-4.4, R-5.2, R-5.3, R-6.4) und `checkCatalog`
  in `doku.mjs` (jede Regel hat eine Prüfung, keine alte Nummer mehr); neu in `hig.mjs`: R-6.1 Zebra in App-Tabellen,
  R-5.4, R-3.3 (höchstens eine blaue Hauptaktion), R-10.1 (gleiches Icon je Bezeichnung). `v4/` nur Versionsnummer.
- **Reiselogbuch 3.11.5:** T-83 ‚Reisemittel‘ im Abgleichbericht (mit Prüfung), `tests/regeln-ablauf.mjs` neu,
  `alle.sh` ruft es auf; README ‚Verwendete Versionen‘ nachgeführt.
- **Entschieden:** AD_VERSION steigt mit jeder AppDesign-Version, auch wenn sich nur Richtlinie und Prüfungen ändern
  (Versionszeile, README und Richtlinie zeigen dieselbe Nummer). Feste Fassung je App bleibt A-05.
- **3.11.6 / 4.12.1 (Korrektur aus P-32):** Reisemittel mit Namen im Abgleichbericht (`createSync` mit `values`),
  Seitenleiste folgt bei offener Tastatur dem von Safari verschobenen Bereich (Prüfung bildet Safari nach), feste
  Spaltenanteile der Ausgabe 28 : 28 : 22 : 22 (nur Reiselogbuch, keine allgemeine Regel), ‚Gesamtausgaben‘;
  Muster und Ursachen in `arbeit/P-32 Rückmeldung.md`.
- **Gefunden:** Viele `ablauf-*.mjs` der App geben Werte nur aus und melden keine Fehler (`alle.sh` zeigt nur
  Skriptfehler) → in A-05 aufgenommen.

## 3. Nächster Schritt

**A-05 Prüfungen 2.0** (eigene Sitzung ‚Reiselogbuch 0003 – A-05 Prüfungen 2.0‘, Prio 1) – zuerst die Fall-Liste,
Umfang siehe 4. Bekannt aus 0002: `github.io` ist aus der Cloud-Umgebung gesperrt (403) – das Veröffentlichungs-Skript
muss auf den Pages-Lauf über die GitHub-Actions-Liste warten, nicht über die Pages-Adresse; das ReiseLogBuch-Repo muss
mit Schreibzugriff in der Sitzung sein (`add_repo`, Zugriff push).

## 4. Danach

- **A-05 Prüfungen 2.0 (eigene Sitzung):** Veröffentlichungs-Skript; feste AppDesign-Fassung je App (danach W-4);
  Tests parallel; Ablauf-Tests melden Fehler statt nur Werte; WebKit – gesperrte Adressen `cdn.playwright.dev`,
  `playwright.download.prss.microsoft.com` und den Ort der Freigabe nennen (F-1).
- **Danach Funktionen:** T-05, T-06.

## 5. Arbeitsumgebung (für Claude)

- Repos nebeneinander klonen: `/home/user/AppDesign` und `/home/user/ReiseLogBuch` (App lädt `../AppDesign/v4/…`).
- Tests: im Ordner `ReiseLogBuch/tests` `npm install` (Playwright 1.56, Chromium unter `/opt/pw-browsers`), dann
  `sh tests/alle.sh`.
- Veröffentlichen: Vorbereitungs-Zweig, `--no-ff` nach `main`, erst AppDesign, dann App; Pages-Läufe abwarten.
- Zeit und Token am Ende jeder Antwort aus den Sitzungsdaten (`/root/.claude/projects/…/*.jsonl`).

## 6. Ablage auf GitHub (alles auf Branch `main`)

| Was | Repo | Datei |
|---|---|---|
| Diese Übergabe | g811141a/AppDesign | `UEBERGABE.md` |
| Verlauf aller Wünsche und Entscheidungen | g811141a/AppDesign | `VERLAUF.md` |
| A-02 Schritt 1: Verlauf-Abgleich | g811141a/AppDesign | `arbeit/A-02 Verlauf-Abgleich.md` |
| A-02 Schritt 2: Regelkatalog-Entwurf (gebaut in 4.12.0) | g811141a/AppDesign | `arbeit/A-02 Regelkatalog-Entwurf.md` |
| A-02a Fall-Liste mit Ergebnis | g811141a/AppDesign | `arbeit/A-02a Fall-Liste.md` |
| A-02b Fall-Liste (Schritte 3 und 4) | g811141a/AppDesign | `arbeit/A-02b Fall-Liste.md` |
| Regeln (Zusammenarbeit, Design) | g811141a/AppDesign | `README - Zusammenarbeit allgemein.md`, `README - Designrichtlinie allgemein.md` |
| Backlog allgemein | g811141a/AppDesign | `BACKLOG.md` |
| App: Backlog, Richtlinie, Funktionsbeschreibung, Prüfliste im CHANGELOG | g811141a/ReiseLogBuch | `BACKLOG.md`, `README - Designrichtlinie Reiselogbuch.md`, `PROMPT.md` |

In der neuen Sitzung müssen **beide Repos** (AppDesign und ReiseLogBuch) ausgewählt sein.

## 7. Starttext für die neue Sitzung

```
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die Zusammenarbeit allgemein und die Designrichtlinien, gib mir das Lagebild und beginne mit A-05 Prüfungen 2.0 – zuerst die Fall-Liste.
```
