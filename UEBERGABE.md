# Übergabe an die nächste Sitzung

**Stand 17.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0010‘
(Zusammenarbeit allgemein 2.8.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.20.1** (Fassung 4.21.1) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign (ui.js, design.css, tests; feste Fassung `fassung/4.22.0/`) | **4.22.0** | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import – `README.md`, `PROMPT.md`, `CLAUDE.md`, `ERKENNTNISSE.md`, `werkzeug/pruefen.mjs` |
| Designrichtlinie allgemein | **4.22.0** (keine Regeländerung) | `README - Designrichtlinie allgemein.md` |
| Designrichtlinie Reiselogbuch | 3.20.1 | im Repo ReiseLogBuch |
| Zusammenarbeit allgemein | **2.8.0** (§2 Kontext in der Zeile Zeit und Token) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0011** (Zusammenarbeit 0 Nr. 13); die danach 0012.
- **Offene Prüfpunkte:** keine – P-50 geprüft (A-20 abgeschlossen).
- **Nächste Version (bereit):** keine.
- **Verworfen:** A-18 / T-91 (Tastatur im Fenster ‚Tag‘) – vom Nutzer in 0010 beendet, Messseiten entfernt (E-42 / E-89);
  **nicht wieder aufgreifen**, außer der Nutzer bringt es selbst.
- **Nächstes Thema:** **A-19 / T-92** (jetzt Spitze, Prio 2) – Suche über alle
  Reiselogbücher, entschieden **Variante C** (`arbeit/T-92 Vorschläge.md`); offen: Platz des Feldes, Zählweise.
  T-06 (Prio 3), A-01 (später).
- **Zeit und Token:** am Ende jeder Antwort `node ../AppDesign/werkzeug/messung.mjs`, Zeile unverändert übernehmen.
- **Sitzungsgröße (wichtig):** Grenze **etwa 300.000 Token Kontext**. ‚Token vorige Antwort‘ ist **nicht** der Kontext
  (Summe aller Modell-Aufrufe der Antwort). Seit 4.22.0 (A-20) zeigt die Zeile Zeit und Token den
  Kontext; bei ‚⚠ Übergabe fällig‘ die Übergabe vorschlagen. Sitzung 0009 lag unbemerkt bei ~451.600.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0010‘:**
- **AppDesign 4.22.0 (A-20, P-50 ok):** `werkzeug/messung.mjs` – die Zeile endet mit ‚Kontext N‘ (letzter eigener Aufruf),
  ab 300.000 oder nach Zusammenfassung ‚⚠ Übergabe fällig‘; Zusammenarbeit 2.8.0. Reiselogbuch blieb auf Fassung 4.21.1.
- **A-18 / T-91 verworfen:** Messungen am iPad (Messseite, Kopie der App, Versuche A–D). Ergebnis: beim ersten Hochfahren
  der Tastatur rollt Safari die Seite (Fenster und Tabelle fahren mit) – **unabhängig von der Lage des Feldes**; Feld vorab
  nach oben (D) half nicht. Nutzer: Thema vergessen, Messeinrichtungen entfernt (Ordner `messen/` gelöscht).
- **Lehren aus 0010:** (1) Lokaler Zweig `main` kann nach dem Start veraltet sein (Sitzung stand auf losgelöstem HEAD) – vor
  einem neuen Zweig `git fetch origin main` und vom Stand `origin/main` abzweigen. (2) GitHub Pages hält Seiten bis 10 min im
  Zwischenspeicher – für Messungen einen Link mit `?neu=N` geben. (3) Eine Rückmeldung erst wörtlich klären (‚Zittern‘ hieß
  ‚fährt mit hoch‘), bevor gemessen wird. (4) github.io ist aus der Cloud gesperrt (403); den Pages-Lauf über
  `gh api repos/…/actions/runs?head_sha=…` prüfen.

**Sitzung ‚Reiselogbuch 0009‘ – sechs Versionen, alle geprüft:**
- **AppDesign 4.19.0 / Reiselogbuch 3.17.0:** R-5.5 Eingabetaste ‚Fertig‘ in einzeiligen Feldern (A-14, T-87); Fund: die
  Eingabetaste schickte die Fenster ‚Tag‘ und ‚Einstellungen‘ ab. T-88 zuletzt verwendetes Reiselogbuch öffnet beim Start
  (iPad; iPhone-Startliste ohne Blau, R-7.2). T-85 (Emoji-Taste) geschlossen – nicht steuerbar.
- **Reiselogbuch 3.18.0:** T-86 Maps-Link nur über den Namen (endet an ‚ – ‘, Komma, Doppelpunkt, Klammer; nicht vor Ziffer;
  auch Quartier).
- **AppDesign 4.20.0 / Reiselogbuch 3.19.0:** R-3.2 Kapsel ‚Nach oben / Ans Ende‘ auch am iPhone (A-15), nicht in der
  Startliste; widerruft E-33 (Apple-Weg war zu schwerfällig).
- **AppDesign 4.21.0 / Reiselogbuch 3.20.0:** R-7.4 Position beim Öffnen (A-16, T-89: ganz oben bzw. erster offener Tag
  direkt unter dem Kopf; `openAt`), R-8.1 erweitert auf Seitenleiste ein/aus (A-17, T-90; `keepPlace`).
- **Korrektur 4.21.1 / 3.20.1 (aus P-48/3):** Drehen am Ende der Seite – ganz unten bleibt ganz unten (`topAnchor` mit
  `{ rest }`, Prüfung `checkTurnEnd`).
- **Lehren aus 0009:** (1) Den Kontext beobachten (A-20). (2) `… los` im Hintergrund immer mit **vollem Pfad** starten
  (`node /home/user/AppDesign/werkzeug/veroeffentlichen.mjs …`) – ein `cd` davor wirkt im Hintergrund nicht. (3) Jeder
  Prüflisten-Schritt braucht ‚Erwartet‘ (doku-regeln bricht sonst ab). (4) WebKit-Netzprozess stürzte einmal ab
  (offline-regeln, ‚nicht prüfbar‘) – einzeln wiederholt grün, dann `los` neu.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. A-19 / T-92 Suche über alle Reiselogbücher (Variante C, Einzelheiten klären, Fall-Liste).
2. Weitere alte Reiselogbücher konvertieren, sobald der Nutzer sie anhängt (Import-Repo, `PROMPT.md` vollständig lesen).

## 4. Danach

- T-06 Ausschreibungstexte (Prio 3) · **A-01** Startseite (später).

## 5. Arbeitsumgebung (für Claude)

- **Import-Repo (neu):** `g811141a/ReiseLogBuch-Import` ist **privat**. Mit `add_repo` (push) dazuholen, nach
  `/home/user/ReiseLogBuch-Import` klonen und `ln -s ReiseLogBuch-Import reiselogbuch-import` anlegen. `register_repo_root`
  mit `/home/user/reiselogbuch-import`. Dort **nie Reisedaten** ablegen (Datenschutz): Originale, Ergebnisse und Protokolle
  nur im Notizordner der Sitzung. Im Ordner `werkzeug` einmal `npm install`, dann `node werkzeug/pruefen.mjs <Datei> --zone <Zeitzone>`.
- Für AppDesign gilt dasselbe: Verweis `ln -s AppDesign appdesign`, `register_repo_root` mit `/home/user/appdesign`.

- Repos nebeneinander klonen: `/home/user/AppDesign` und `/home/user/ReiseLogBuch` (`add_repo` ReiseLogBuch mit Zugriff
  push; die Sitzung erwartet den Pfad `/home/user/reiselogbuch` – ein Verweis `ln -s ReiseLogBuch reiselogbuch` genügt;
  `register_repo_root` mit `/home/user/reiselogbuch`).
- Tests: im Ordner `ReiseLogBuch/tests` `npm install playwright@1.56.1` (die entstehenden `package.json`/`package-lock.json`
  nicht hochladen – löschen), dann im Repo-Ordner `node tests/alle.mjs` (`--alle`, `--gegenprobe [grundregeln]`,
  `--abdeckung`); einzelne Prüfung in WebKit: `PRUEF_BROWSER=webkit node tests/<datei>.mjs`. AppDesign-Selbsttest
  `node tests/lauf-selbsttest.mjs`. Seit 4.16.1 laufen höchstens so viele Browser wie Kerne, erst Chromium, dann WebKit
  (A-10, A-11); `offline.mjs` erkennt den Absturz des WebKit-Netzprozesses der Prüfumgebung und prüft die Ansicht einmal neu.
  Während der Arbeit nur betroffene Prüfungen, der volle Lauf einmal in `… los` (Zusammenarbeit 0 Nr. 2).
- Veröffentlichen: Vorbereitungs-Zweige in beiden Repos (`vorbereitung-X.Y.Z`), `node werkzeug/veroeffentlichen.mjs
  vorbereiten --ad X.Y.Z --app reiselogbuch=X.Y.Z` (ohne `--ad`, wenn nur die App), Texte schreiben, committen,
  `node werkzeug/veroeffentlichen.mjs los --app reiselogbuch` (prüft, alle Tests, erst AppDesign, dann die App, wartet auf
  Pages; im Hintergrund starten, dauert ~8 min). Nach Änderungen an `v4/` oder `tests/`: `… fassung`. Danach lokale
  Vorbereitungs-Zweige löschen (sonst meldet der Stop-Hook ‚unpushed‘). Zweige auf GitHub löschen geht aus der Cloud nicht
  (403) – `vorbereitung-4.16.1` (AppDesign) und `vorbereitung-3.15.1` (ReiseLogBuch) liegen noch dort, schaden nicht.
- Zeit und Token am Ende jeder Antwort aus den Sitzungsdaten (`/root/.claude/projects/…/*.jsonl`).

## 6. Ablage auf GitHub (alles auf Branch `main`)

| Was | Repo | Datei |
|---|---|---|
| Diese Übergabe | g811141a/AppDesign | `UEBERGABE.md` |
| Verlauf aller Wünsche und Entscheidungen | g811141a/AppDesign | `VERLAUF.md` |
| Muster, Fall-Listen, Auswertungen | g811141a/AppDesign | `arbeit/A-06 Muster und Fall-Liste.md`, `arbeit/P-39 Rückmeldung.md`, `arbeit/T-84 Fall-Liste.md` |
| Prüf-Bausteine | g811141a/AppDesign | `tests/pruefe.mjs`, `tests/lauf.mjs`, `tests/offline.mjs`, `tests/start.mjs`, `tests/README.md` |
| Regeln (Zusammenarbeit, Design) | g811141a/AppDesign | `README - Zusammenarbeit allgemein.md`, `README - Designrichtlinie allgemein.md` |
| Backlog allgemein | g811141a/AppDesign | `BACKLOG.md` |
| App: Backlog, Richtlinie, Funktionsbeschreibung, Prüfliste im CHANGELOG, Tests | g811141a/ReiseLogBuch | `BACKLOG.md`, `README - Designrichtlinie Reiselogbuch.md`, `PROMPT.md`, `CHANGELOG.md`, `tests/alle.mjs` |

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein, für Konvertierungen auch **ReiseLogBuch-Import** (privat).

## 7. Starttext für die neue Sitzung

```
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und dann die Startfrage (0 Nr. 19). Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
