# Übergabe an die nächste Sitzung

**Stand 17.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0011‘
(Zusammenarbeit allgemein 2.8.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.20.1** online (Fassung 4.21.1) · **3.21.0 gebaut, nicht veröffentlicht** | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.22.0** online · **4.23.0 gebaut, nicht veröffentlicht** | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | 2.8.0 | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0012**; die danach 0013.
- **Offene Prüfpunkte:** keine online. P-51 (Reiselogbuch 3.21.0) entsteht erst mit dem Veröffentlichen.
- **Auf `main` steht noch der alte Backlog-Stand:** T-92 / A-19 in ‚0. Nächste Version‘ (bereit). Die Zweige
  `vorbereitung-*` verschieben sie nach ‚1. Prüfen‘ (P-51), mit E-43 bzw. E-90.
- **Sitzungsgröße:** Grenze etwa 300.000 Token Kontext; die Zeile Zeit und Token zeigt ihn (‚⚠ Übergabe fällig‘).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0011‘:**
- **T-92 / A-19 geklärt und gebaut** (Fall-Liste `arbeit/T-92 Fall-Liste.md`, alle Fragen entschieden, Muster bestätigt):
  Lupe in der Kopfzeile der Seitenleiste/Startliste, Zählung je Fundstelle (= ‚1 von N‘ drinnen, `hitCount` zählt die
  Markierungen wie `hitMarks`), Öffnen mit gefüllter Suche, Liste bleibt gefiltert, Backup-Kachel bleibt, rechts offenes
  Reiselogbuch bleibt unberührt – **Zusatz des Nutzers:** sind beide Suchfelder offen, laufen sie **1:1** (beide Richtungen,
  auch x). Als **allgemeine Regel** (R-2.3 erweitert, 15.2, 15.4, `checkListSearch`, CSS `#side .side-search`).
- Neue App-Prüfung `tests/ablauf-suche-liste.mjs`; Gegenprobe rot, Chromium und WebKit grün.
- **`… los` abgebrochen (nichts veröffentlicht):** `regeln-ablauf` in WebKit rot –
  `iPad quer: R-7.3 Häkchen: Seite steht nach dem Schließen nicht wie vorher (Scrollstand 1200 → 1195, Zeile 2026-08-31 111 → 116 px)`.
  **Ursache eingegrenzt:** die Lupe macht den Kopf breiter → Seitenleiste 401 statt 340 px (`width: max-content`) → Tabelle
  schmaler. **Der alte App-Stand 3.20.1 fällt mit `#side { min-width: 401px }` genauso durch** – es ist eine bestehende
  Schwäche von R-7.3 (ui.js oder `checkListStill`), die T-92 nur sichtbar macht. Vermutung: ` neu` im Verlauf ändert bei
  `table-layout: auto` die Spaltenbreiten, Zeilen darüber werden höher; die Wiederherstellung landet 5 px daneben
  (Scrollstand sinkt, statt zu steigen). Chromium grün.
- **Entscheidung des Nutzers:** Ursache an der Wurzel beheben (nicht die Seitenleiste schmal halten), in neuer Sitzung; die
  Korrektur kommt mit in AppDesign 4.23.0 (noch nicht veröffentlicht).
- **Lehren aus 0011:** (1) Neue Schaltflächen im Kopf ändern die Breite der Seitenleiste – Gegenprobe immer auch mit dem
  alten Stand bei gleicher Geometrie. (2) Muster als echter Code auf lokalem Zweig + Playwright-Screenshots ging schnell.
  (3) Nach Neustart des Arbeitsprozesses: lokale Zweige sofort nach GitHub sichern.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. Zweige `vorbereitung-4.23.0` und `vorbereitung-3.21.0` holen (Abschnitt 5), Playwright installieren.
2. R-7.3-Fehler nachstellen: `PRUEF_BROWSER=webkit node tests/regeln-ablauf.mjs` (im ReiseLogBuch). Ursache in ui.js
   (Wiederherstellung nach dem Fenster, R-7.3) bzw. `checkListStill` finden, im Zweig `vorbereitung-4.23.0` beheben, als
   Teil von 4.23.0 im CHANGELOG nennen (mit ‚warum die Prüfung es bisher nicht sah‘: Seitenleiste immer 340 px).
   Fall-Liste kurz, vor dem Bau ‚Ja‘ einholen.
3. `node werkzeug/veroeffentlichen.mjs fassung`, betroffene Prüfungen, dann `node /home/user/AppDesign/werkzeug/veroeffentlichen.mjs los --app reiselogbuch`
   im Hintergrund. Danach Bericht (0 Nr. 11) mit Prüfliste P-51.

## 4. Danach

- T-06 Ausschreibungstexte (Prio 3) · **A-01** Startseite (später).

## 5. Arbeitsumgebung (für Claude)

- **Vorbereitungs-Zweige 4.23.0 / 3.21.0 (aus 0011):** liegen auf GitHub (`vorbereitung-4.23.0` in AppDesign,
  `vorbereitung-3.21.0` in ReiseLogBuch). Nach dem Klonen: `git fetch origin vorbereitung-4.23.0 && git checkout -b
  vorbereitung-4.23.0 origin/vorbereitung-4.23.0` (ReiseLogBuch entsprechend). Nach dem Veröffentlichen lokal löschen.
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
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und arbeite dann Abschnitt 3 ab (R-7.3-Fehler beheben, 4.23.0 / 3.21.0 veröffentlichen). Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
