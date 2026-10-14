# Übergabe an die nächste Sitzung

**Stand 14.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0003 – A-05 Prüfungen 2.0‘
(Zusammenarbeit allgemein 2.0.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | 3.12.0 (14.10.2026 15:31) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign (ui.js, design.css, tests) | 4.13.0 | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Designrichtlinie allgemein | 4.13.0 (Regelkatalog R-1.1 bis R-10.4, 34 Regeln in 10 Themen) | `README - Designrichtlinie allgemein.md` |
| Designrichtlinie Reiselogbuch | 3.12.0 | im Repo ReiseLogBuch |
| Zusammenarbeit allgemein | 2.3.1 (Abschnitt 0 = Arbeitsprozess 2.0, hat Vorrang) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0004** (Zusammenarbeit 0 Nr. 13); die danach 0005.
- **Offene Prüfpunkte:** keine – P-35 erledigt (alles in Ordnung, 14.10.2026).
- **Nächste Version:** nichts bereit.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0003 – A-05 Prüfungen 2.0‘** (Fall-Liste `arbeit/A-05 Fall-Liste.md`, freigegeben):
- **WebKit eingerichtet (F-1 erledigt):** `cdn.playwright.dev` und `playwright.download.prss.microsoft.com` unter Umgebung
  ‚Standard‘ → Netzwerkzugriff freigegeben (auf claude.ai/code in Safari – in der iPad-App fand der Nutzer das Umgebungsmenü
  nicht); Setup-Skript der Umgebung: `#!/bin/bash`, `npx -y playwright@1.56.1 install webkit`, `npx -y playwright@1.56.1
  install-deps webkit` – **wirkt erst ab Sitzung 0004, dort zuerst prüfen** (`ls /opt/pw-browsers` muss `webkit-2215` zeigen).
- **Version A gebaut und geprüft (AppDesign 4.13.0 · Reiselogbuch 3.12.0, P-35 ok):** `tests/pruefe.mjs` (Sollwerte,
  Rückgabewert, Grundregeln nach jedem Schritt, Gegenprobe), `tests/lauf.mjs` (parallel, schnellste zuerst, Abbruch beim
  ersten Fehler, Chromium und WebKit), `lauf-selbsttest.mjs`; alle 19 Prüfskripte der App umgestellt; 40 Läufe in etwa 4 min.
  Fund R-3.1 (Quartier-Link ‚Hotel‘ 42 px) mit unsichtbarer Tippfläche behoben (Entscheidung a,
  `arbeit/A-05 Fund R-3.1 Quartier-Link.md`).
- **Entschieden:** feste Fassung enthält `design.css`, `ui.js` **und `tests/`**; zwei Versionen (A erledigt, B offen).
- **Neu im Backlog Reiselogbuch:** T-84 (Prio 2, nur Reiselogbuch): iPhone startet nach Neustart in der Startliste, iPad
  bleibt wie es ist.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

**A-05 Version B** (Sitzung ‚Reiselogbuch 0004 – A-05 Version B‘, Prio 1): AppDesign 4.14.0 · Reiselogbuch 3.13.0 –
Fall-Liste Teil D (feste Fassung `fassung/X.Y.Z/` mit `design.css`, `ui.js`, `tests/`, Prüfsummen, Tag je Version, App lädt
genau ihre Fassung, `v4/` bleibt neueste, W-4 nachführen) und Teil E (Veröffentlichungs-Skript `werkzeug/veroeffentlichen.mjs`
mit `vorbereiten` und `los`). Die Fall-Liste ist freigegeben; **vor dem Bau ausdrücklich fragen: ‚Soll ich Version
AppDesign 4.14.0 / Reiselogbuch 3.13.0 mit … erstellen? Ja/Nein‘.** Vorher prüfen, ob das Setup-Skript WebKit installiert hat.

## 4. Danach

- **T-84** (Prio 2): iPhone startet in der Startliste – zuerst Fall-Liste.
- **T-05, T-06** (Funktionen).

## 5. Arbeitsumgebung (für Claude)

- Repos nebeneinander klonen: `/home/user/AppDesign` und `/home/user/ReiseLogBuch` (`add_repo` ReiseLogBuch mit Zugriff
  push; die Sitzung erwartet den Pfad `/home/user/reiselogbuch` – ein Verweis `ln -s ReiseLogBuch reiselogbuch` genügt).
- Tests: im Ordner `ReiseLogBuch/tests` `npm install playwright@1.56.1` (die entstehenden `package.json`/`package-lock.json`
  nicht hochladen – löschen), dann im Repo-Ordner `node tests/alle.mjs` (`--alle`, `--browser chromium`, `--gegenprobe
  [grundregeln]`, `--abdeckung`); AppDesign-Selbsttest `node tests/lauf-selbsttest.mjs`.
- Veröffentlichen: Vorbereitungs-Zweig, `--no-ff` nach `main`, erst AppDesign, dann App; Pages-Lauf über
  `gh api repos/g811141a/<Repo>/actions/runs?head_sha=<sha>` abwarten (`github.io` ist aus der Cloud gesperrt).
- Zeit und Token am Ende jeder Antwort aus den Sitzungsdaten (`/root/.claude/projects/…/*.jsonl`).

## 6. Ablage auf GitHub (alles auf Branch `main`)

| Was | Repo | Datei |
|---|---|---|
| Diese Übergabe | g811141a/AppDesign | `UEBERGABE.md` |
| Verlauf aller Wünsche und Entscheidungen | g811141a/AppDesign | `VERLAUF.md` |
| A-05 Fall-Liste (Teile A–C erledigt, D–E für Version B) | g811141a/AppDesign | `arbeit/A-05 Fall-Liste.md` |
| A-05 Fund R-3.1 | g811141a/AppDesign | `arbeit/A-05 Fund R-3.1 Quartier-Link.md` |
| Prüf-Bausteine | g811141a/AppDesign | `tests/pruefe.mjs`, `tests/lauf.mjs`, `tests/README.md` |
| Regeln (Zusammenarbeit, Design) | g811141a/AppDesign | `README - Zusammenarbeit allgemein.md`, `README - Designrichtlinie allgemein.md` |
| Backlog allgemein | g811141a/AppDesign | `BACKLOG.md` |
| App: Backlog, Richtlinie, Funktionsbeschreibung, Prüfliste im CHANGELOG, Tests | g811141a/ReiseLogBuch | `BACKLOG.md`, `README - Designrichtlinie Reiselogbuch.md`, `PROMPT.md`, `CHANGELOG.md`, `tests/alle.mjs` |

In der neuen Sitzung müssen **beide Repos** (AppDesign und ReiseLogBuch) verfügbar sein.

## 7. Starttext für die neue Sitzung

```
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die Zusammenarbeit allgemein und die Designrichtlinien, gib mir das Lagebild und beginne mit A-05 Version B – prüfe zuerst, ob WebKit installiert ist, und frage dann, ob du Version 4.14.0 / 3.13.0 bauen sollst.
```
