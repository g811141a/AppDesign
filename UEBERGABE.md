# Übergabe an die nächste Sitzung

**Stand 19.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0015‘
(Zusammenarbeit allgemein 2.11.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.24.0** online (Fassung 4.26.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.26.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.11.0** | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0016**; die danach 0017.
- **Offene Prüfpunkte:** keine – P-57 alles ok (**A-27 abgeschlossen**). A-24 bleibt offen → Umbau B (A-28).
- **Sitzungsgröße:** Grenze etwa 300.000 Token Kontext (0015 endete bei ~295.000).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0015‘:**
- **4.26.0 / 3.24.0 veröffentlicht:** Messmodus (R-1.6, Designrichtlinie 15.21, Baustein `messungMenuItems` in ui.js, Prüfung
  `checkMessung`, App-Prüfung `tests/ablauf-messung.mjs`); Zusammenarbeit **2.11.0** mit **0 Nr. 20** (zuerst messen, ein
  Safari-Modell, ‚in der Nachbildung behoben, am Gerät zu bestätigen‘, Safari-Eigenheiten mit Quelle in Designrichtlinie 13);
  Backlog A-31 (Messung abspielen, V8) und A-32 (‚Problem melden‘, V9). Prüfungen robuster: `kapsel-iphone` wartet auf den Aufbau,
  `ablauf-suche-liste` F-11 misst über 5 Runden mit Pause (Grenze 50 ms bleibt; 3.23.1 und 3.24.0 maßen unter Last gleich 42–58 ms).
- **Messung P-57 ausgewertet** (`arbeit/A-27 Auswertung P-57.md` – **zuerst lesen**): Das Zittern kommt **nicht** von einer zu kurzen
  Seite. Ursache ist ein **Hin und Her**: 0,5 s nach jedem Buchstaben rollt die App den Treffer unter die Suchzeile (`showHit` →
  `scrollUnderBar`, zieht `visualViewport.offsetTop` ab); am iPhone schiebt Safari den sichtbaren Bereich dann um 121 px (quer
  21 px), beim nächsten Buchstaben rollt die App zurück. scrollY 230 ↔ 109, `offsetTop` 121 ↔ 0, Kopf- und Suchzeile je Buchstabe
  **2 Bilder (33 ms) um ±121 px** falsch, bis `vv scroll` und `--vv-top` nachziehen. Vor ⓧ nur einmal (leicht), nach ⓧ bei jedem
  Buchstaben (massiv); iPad `offsetTop` immer 0. Neu: quer schrumpft `innerHeight` mit jedem Fokus um 19 px (402 → 383 → 364).
  Messartefakt: in der Zeile eines `scroll`-Ereignisses ist die Lage fester Leisten um den Rollweg versetzt – nicht nachbilden.
- **Entscheidung des Nutzers 19.10.2026:** trotz der engen Ursache **Umbau B** (A-28), nicht die kleine Korrektur.
- **Noch nachzutragen (mit der nächsten Version):** Designrichtlinie 13 berichtigen (Ursache = Rollen bei offener Tastatur, nicht
  kurze Seite; `innerHeight` quer).

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **Safari-Modell `AppDesign/tests/safari.mjs`** nach den gemessenen Werten (Auswertung Abschnitt 6): Tastatur offen = sichtbare
   Höhe 409 (iPhone hoch) bzw. 126 (quer); `scrollTo` der App bei offener Tastatur verschiebt den sichtbaren Bereich wie gemessen
   (230 → offsetTop 121, 109 → 0), `vv scroll` 2 Bilder später. `ReiseLogBuch/tests/ablauf-suche-iphone.mjs` damit **rot gegen
   3.24.0** (±121 px bei jedem Buchstaben nach ⓧ) – Zusammenarbeit 0 Nr. 1 und 20.
2. **A-28 Umbau B** + **A-29** (Suche öffnen und ⓧ rollen nach oben): Fall-Liste (alle betroffenen Regeln R-2.1, R-2.3, R-7.3,
   R-7.4, R-8.1, Nach oben/Ans Ende, Druck, Seitenleiste, Messmodus-Spalten) mit Muster und ‚Vorschläge für AppDesign‘, **Ja**,
   eine gut vorbereitete Version (AppDesign 4.27.0 / Reiselogbuch 3.25.0?). Danach neue Messung am Gerät.
3. Danach **A-26** Datumsfeld (allgemeine Regel).

## 4. Danach

- A-31 Messung abspielen (mit safari.mjs) · A-30 Vorschläge (Rückgängig nach Löschen, leere Zustände, Ziehen zum Aktualisieren aus) ·
  A-32 ‚Problem melden‘ · T-06 Ausschreibungstexte (Prio 3) · **A-01** Startseite (später).

## 5. Arbeitsumgebung (für Claude)

- **Klonen (aus 0012):** `git clone --depth 50 …` nach `/home/user/ReiseLogBuch` bzw. `/home/user/ReiseLogBuch-Import`, dann
  die Verweise. Ein im flachen Klon neu angelegter Zweig hat nach dem Push keine Verfolgung (Stop-Hook meldet ‚unpushed‘):
  `git config --add remote.origin.fetch '+refs/heads/<zweig>:refs/remotes/origin/<zweig>' && git fetch origin`.
- **Nie `… fassung` für eine schon veröffentlichte Version** – erst `vorbereiten` (neue Version), dann ändern.
- **Import-Repo (neu):** `g811141a/ReiseLogBuch-Import` ist **privat**. Mit `add_repo` (push) dazuholen, nach
  `/home/user/ReiseLogBuch-Import` klonen und `ln -s ReiseLogBuch-Import reiselogbuch-import` anlegen. `register_repo_root`
  mit `/home/user/reiselogbuch-import`. Dort **nie Reisedaten** ablegen (Datenschutz): Originale, Ergebnisse und Protokolle
  nur im Notizordner der Sitzung. Im Ordner `werkzeug` einmal `npm install`, dann `node werkzeug/pruefen.mjs <Datei> --zone <Zeitzone>`.
- **Lokaler `main` im AppDesign-Klon kann veraltet sein (0014):** vor dem ersten Commit `git fetch origin main` und auf `origin/main`
  aufsetzen (`git checkout -b neu origin/main`), sonst wird der Push abgelehnt; `git reset --hard` ist gesperrt.
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
| Muster, Fall-Listen, Auswertungen | g811141a/AppDesign | `arbeit/A-27 Auswertung P-57.md`, `arbeit/A-27 Fall-Liste.md`, `arbeit/A-24 Analyse nach P-56.md` und ältere in `arbeit/` |
| Prüf-Bausteine | g811141a/AppDesign | `tests/pruefe.mjs`, `tests/lauf.mjs`, `tests/offline.mjs`, `tests/start.mjs`, `tests/README.md` |
| Regeln (Zusammenarbeit, Design) | g811141a/AppDesign | `README - Zusammenarbeit allgemein.md`, `README - Designrichtlinie allgemein.md` |
| Backlog allgemein | g811141a/AppDesign | `BACKLOG.md` |
| App: Backlog, Richtlinie, Funktionsbeschreibung, Prüfliste im CHANGELOG, Tests | g811141a/ReiseLogBuch | `BACKLOG.md`, `README - Designrichtlinie Reiselogbuch.md`, `PROMPT.md`, `CHANGELOG.md`, `tests/alle.mjs` |

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein, für Konvertierungen auch **ReiseLogBuch-Import** (privat).

## 7. Starttext für die neue Sitzung

```
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann arbeit/A-27 Auswertung P-57.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und arbeite dann Abschnitt 3 ab (zuerst Safari-Modell und rote Prüfung, dann A-28 Umbau B: Fall-Liste mit Muster, vor dem Bau mein Ja). Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
