# Übergabe an die nächste Sitzung

**Stand 14.10.2026** · geschrieben am Ende der Sitzung ‚Abgleich, Abgleichbericht, Arbeitsprozess 2.0‘
(Zusammenarbeit allgemein 2.0.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | 3.11.4 (14.10.2026 03:59) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign (ui.js, design.css) | 4.11.4 | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Designrichtlinie allgemein | 4.11.4 (Regelkatalog R-01 bis R-52) | `README - Designrichtlinie allgemein.md` |
| Designrichtlinie Reiselogbuch | 3.11.4 | im Repo ReiseLogBuch |
| Zusammenarbeit allgemein | **2.0.0** (Abschnitt 0 = Arbeitsprozess 2.0, hat Vorrang) | `README - Zusammenarbeit allgemein.md` |

- **Offene Prüfpunkte:** keine (P-31 zuletzt, alles in Ordnung).
- **Nächste Version:** nichts gesammelt.

## 2. Nächster Schritt: A-02 Richtlinien aufräumen (eigene Sitzung)

1. **Verlauf prüfen:** `VERLAUF.md` (alle Nachrichten des Nutzers und alle Entscheidungen seit 04.10.2026) von unten
   nach oben durchgehen und je Wunsch prüfen, ob er umgesetzt und in den Richtlinien festgehalten ist. Ergebnis als
   Liste ‚umgesetzt / fehlt / widersprüchlich‘; Fehlendes ins Backlog.
2. **Regeln zusammenfassen und neu ordnen:** R-01 bis R-52 nach Themen gliedern (Tabellen und Ausgabe, Menüs und
   Sprechblasen, Fenster, Seitenleiste, Drehen, Abgleich und Backup, Versionen und Doku …); Doppeltes zusammenführen
   (z. B. Abgleich in 15.4 und 15.18, Tabellen in 9, 10, R-37, R-52), Veraltetes streichen; je Regel genau eine
   Prüfung. Erwartung: etwa 30–35 Regeln.
3. **Allgemein statt App:** Was in der Designrichtlinie Reiselogbuch und im PROMPT eigentlich allgemein ist, wandert
   in die allgemeinen Regeln; die App behält nur Ausnahmen und Ausprägungen.
4. **Zusammenarbeit allgemein** ebenso aufräumen (Abschnitte 1–9 an Abschnitt 0 anpassen, z. B. die alte
   ‚Antwortzeile zum Kopieren‘ in Abschnitt 2, Sammelversionen in Abschnitt 6).
5. Kleine Versionen: höchstens 2 Themen je Version (Abschnitt 0 Nr. 8).

## 3. Danach

- **A-05 Prüfungen 2.0 (eigene Sitzung):** Veröffentlichungs-Skript (Versionen, Tests, AppDesign vor App, Pages
  abwarten); **feste AppDesign-Fassung je App** (unveränderlicher Ordner je Version, App nur nach Rückfrage heben –
  heute lädt jede App den Letztstand von `v4/`!); Tests parallel und schnellste zuerst; Grundregeln nach jeder
  Handlung in jeder Ansicht; **WebKit** – Download war blockiert (`cdn.playwright.dev`,
  `playwright.download.prss.microsoft.com`); prüfen, ob der Nutzer die Adressen freigegeben hat.
- **Danach Funktionen:** T-05 (alte Reiselogbücher aufbereiten), T-06 (Ausschreibungstexte umwandeln).

## 4. Arbeitsumgebung (für Claude)

- Repos nebeneinander klonen: `/home/user/AppDesign` und `/home/user/reiselogbuch` (App lädt `../AppDesign/v4/…`).
- Tests: im Ordner `reiselogbuch/tests` `npm install` (Playwright 1.56, Chromium unter `/opt/pw-browsers`), dann
  `sh tests/alle.sh` (alle Abläufe, Regeln und HIG-Prüfung).
- Veröffentlichen: Vorbereitungs-Zweig, `--no-ff` nach `main`, erst AppDesign, dann App; Pages-Läufe abwarten.
- Zeit und Token am Ende jeder Antwort aus den Sitzungsdaten (`/root/.claude/projects/…/*.jsonl`).

## 5. Starttext für die neue Sitzung

> Lies im Repo g811141a/AppDesign zuerst UEBERGABE.md, dann die Zusammenarbeit allgemein und die Designrichtlinien,
> gib mir das Lagebild und beginne mit A-02.
