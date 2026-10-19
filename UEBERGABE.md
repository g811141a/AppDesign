# Übergabe an die nächste Sitzung

**Stand 19.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0016‘
(Zusammenarbeit allgemein 2.11.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.24.0** online (Fassung 4.26.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.26.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.11.0** (2.12.0 kommt mit 4.27.0) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0017**; die danach 0018.
- **Offene Prüfpunkte:** keine. Versuch **M-1** (Muster A-28 am iPhone) ist **alles wie erwartet**.
- **Sitzungsgröße:** Grenze etwa 300.000 Token Kontext (0016 endete bei ~222.000; gewechselt, damit der Umbau nicht abreißt).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0016‘:**
- **Safari-Modell `AppDesign/tests/safari.mjs`** (neu, **Zweig `a28-safari-modell`**, noch nicht auf `main`). Es bildet zwei
  Bereiche nach: den Layout-Bereich, an dem die festen Leisten hängen, und den sichtbaren Bereich. Bei offener Tastatur ist
  der sichtbare Bereich 403 px (hoch) bzw. 276 px (quer) kleiner. Rollt die App, bewegt sich zuerst nur der sichtbare Bereich.
  Safari meldet die neue Lage 2 Bilder später. Antippen einer Schaltfläche nimmt dem Feld den Fokus. Beim neuen Fokus rollt
  Safari hoch um −120 px bzw. schiebt quer um 21 px. API: `safariModell(p, ansicht)`, dann `__safari.tastatur(true)`,
  `__safari.bilder(true/false)`.
- **`ReiseLogBuch/tests/ablauf-suche-iphone.mjs`** (Zweig `a28-safari-modell`) stellt den Ablauf von P-57 nach (langsam
  tippen, ⓧ, noch einmal tippen). Die Prüfung ist **rot gegen 3.24.0** (hoch ±120 px nach ⓧ, quer 21 px), in Chromium und
  WebKit. Sie bindet das Modell vorerst über `../../AppDesign/tests/safari.mjs` ein; mit `vorbereiten` auf
  `fassung/4.27.0/tests/` umstellen.
- **Gegenprobe:** Auch mit der kleinen Korrektur (ohne Abzug von `offsetTop`) bleibt die Prüfung rot, weil ein einzelner
  Sprung bleibt. Das bestätigt Umbau B.
- **Fall-Liste und Muster** liegen auf `main`: `arbeit/A-28 Fall-Liste.md` (**zuerst lesen**: Abschnitte 2, 4, 5, 6, 7) und
  `arbeit/A-28 Muster.html` (Pages, Varianten A/B1/B2 mit Zitter-Anzeige). Unter dem Modell und am iPhone (M-1) zittert A,
  B1 steht still (0 px hoch und quer).
- **Entscheidungen des Nutzers 19.10.2026:**
  - **Variante B1:** Der Rahmen ist so hoch wie der sichtbare Bereich und endet über der Tastatur.
  - **Allgemeine Regeln:** ‚Die Seite rollt nie, nur der Inhalt‘ ergänzt R-2.1 (Prüfung `hig.mjs`: `scrollY` bleibt 0).
    ‚Suche öffnen und ⓧ rollen ganz nach oben‘ ergänzt R-2.3 (Prüfung `checkSearchTop`).
  - **Statusleiste:** Dass das Antippen nicht mehr nach oben rollt, ist in Ordnung.
  - **Neue Regel für die Zusammenarbeit (2.12.0, Ergänzung von 0 Nr. 11):** Jede Bitte, etwas am Gerät zu prüfen oder
    auszuprobieren, enthält im Chat immer den vollständigen Link und nummerierte Schritte mit ‚Erwartet: …‘. Anlass: In 0016
    fehlten sie beim Muster, und der Nutzer musste nachfragen.
  - **‚Ja‘ zum Bau** von A-28 + A-29 als **AppDesign 4.27.0 / Reiselogbuch 3.25.0**, in der neuen Sitzung 0017.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **Bauen (Ja liegt vor):** Vorbereitungs-Zweige anlegen, mit `vorbereiten --ad 4.27.0 --app reiselogbuch=3.25.0`, dabei
   `tests/safari.mjs` vom Zweig `a28-safari-modell` übernehmen und die geänderte `ablauf-suche-iphone.mjs` ebenso.
   Dann nach der Fall-Liste bauen:
   - Rahmen und Rollbereich `rolle` in `ui.js`/`design.css`. Alle Bausteine von Abschnitt 4 rechnen damit; die App ruft nie
     mehr `window.scrollTo`.
   - `pruefe.mjs` mit `rolle(p, y)`/`rollstand(p)`; alle rund 55 Rollstellen der Prüfungen umstellen.
   - Neue Prüfungen F-3/F-4 (`checkSearchTop`), F-12 (`checkFab`), F-16 (`checkPrint`) und die Grundregel ‚Seite rollt nie‘.
   - Designrichtlinie 13 berichtigen; 15.x zum Rahmen; Regelkatalog R-2.1, R-2.3 ergänzen; Zusammenarbeit 2.12.0 (neue Regel).
   - Messmodus-Spalte `inh`.
   - **Hinweis:** In Playwright meldete ein Klick auf ⓧ im Rahmen (quer, Tastatur offen) ‚outside of the viewport‘;
     `mouse.click` auf die Mitte des Felds ging.
2. Bericht mit Prüfpunkten P-58 (am Gerät: Zittern, Wischgefühl, Drucken, neue Messung), dann **A-26** Datumsfeld.

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
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann arbeit/A-28 Fall-Liste.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und arbeite dann Abschnitt 3 ab: das Ja zum Bau von A-28 Umbau B (Variante B1) mit A-29 als AppDesign 4.27.0 / Reiselogbuch 3.25.0 liegt vor – bauen, prüfen, veröffentlichen, Bericht mit Prüfpunkten P-58. Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5; die Vorarbeit liegt in beiden Repos auf dem Zweig a28-safari-modell.
```
