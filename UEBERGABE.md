# Übergabe an die nächste Sitzung

**Stand 19.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0017‘ (Ende), ergänzt in ‚Reiselogbuch 0018‘ nach 4.27.1
(Zusammenarbeit allgemein 2.12.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.25.1** online (Fassung 4.27.1) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.27.1** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.13.0** (0 Nr. 13/15: Opus 5.5, Aufwand hoch) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die laufende Sitzung ist **Reiselogbuch 0018**; die nächste heißt **0019**.
- **Offene Prüfpunkte:** keine. **P-59 geprüft:** alles ok (A-33 abgeschlossen).
- **P-58 geprüft:** /0, /1, /3–/6 ok – das Zittern ist am Gerät weg (A-24, A-28, T-95 (1)
  abgeschlossen). /2 nicht ok: am iPhone quer mit offener Tastatur verdeckt die Kapsel ‚Nach oben / Ans Ende‘ ⌄ der Suche → A-33.
- **Messung P-58/6** (iPhone hoch): `sy`, `offsetTop` und `--vv-top` immer 0; Kopfzeile 0, Suchzeile 62 in jeder Zeile → A-34.
- **Sitzungsgröße:** 0017 endete bei ~350.000 Token Kontext.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0018‘ (19.10.2026):**
- **A-33 gebaut und veröffentlicht** (AppDesign 4.27.1 / Reiselogbuch 3.25.1, Weg A): `updateFab` blendet die Kapsel aus, wenn sie
  nicht mit 16 px Abstand in den sichtbaren Inhalt passt (auch bei Tastatur auf/zu); R-3.2 ergänzt. Dabei gefunden: der Rollbereich
  ragte quer mit Tastatur 55 px unter sie (120 px Innenabstand) – jetzt Platzhalter `.rolle::after`.
- **Prüfungen:** `checkFab` mit `sichtbar` (409/126 px) und `suche`, Grundregel ‚Kapsel schneidet keine Leiste‘ (`hig.mjs`),
  `kapsel-iphone.mjs` mit dem Ablauf P-58/2 (Safari-Modell). Gegen 4.27.0 rot (18 Fehler), jetzt grün.

**Sitzung ‚Reiselogbuch 0017‘ (19.10.2026):**
- **A-28 Umbau B (B1) und A-29 gebaut und veröffentlicht** (AppDesign 4.27.0 / Reiselogbuch 3.25.0):
  - `#app` ist ein Rahmen aus festen Zeilen (Kopfzeile mit Suchzeile), darunter der Rollbereich `<div class="rolle" id="rolle">`.
  - Der Rahmen ist so hoch wie der sichtbare Bereich (`--vv-h`).
  - Baustein `rolle` in `ui.js`; `setHtml` behält den Rollbereich. Lupe und ⓧ rollen nach oben.
  - Designrichtlinie 13 berichtigt, neu 15.22, R-2.1/R-2.3 ergänzt.
- **Prüfungen:** `pruefe.mjs` `rolle(p, y)`/`rollstand(p)`/`ROLL`; neu `checkSearchTop`, `checkFab`, `checkPrint`, Grundregel ‚Seite rollt
  nie‘; Safari-Modell `tests/safari.mjs`. Voller Lauf: 62 Läufe grün.
- **Entscheidungen des Nutzers 19.10.2026 zu A-33** (`arbeit/A-33 Fall-Liste.md`, **zuerst lesen**):
  - **Weg A:** die Kapsel erscheint nur, wenn sie ganz in den Inhalt unter der Suchzeile passt (Inhalt mindestens Kapsel + 2 × 16 px), sonst ausgeblendet.
  - **Allgemeine Regel:** R-3.2 wird ergänzt: ‚Die Kapsel überdeckt nie Kopf- oder Suchzeile; passt sie nicht, ist sie ausgeblendet‘.
    Prüfung: `checkFab` (Abstand zu Kopf- und Suchzeile, auch mit Tastatur iPhone quer 126 px sichtbar) und eine Grundregel in `hig.mjs`
    (Kapsel schneidet keine Leiste).
  - **‚Ja‘ zum Bau** als Korrektur **AppDesign 4.27.1 / Reiselogbuch 3.25.1**, in der Sitzung 0018.
- **Vorsicht (Lehre aus 0017):** während einer Gegenprobe nie `git checkout <datei>` auf nicht committete Arbeit – erst committen.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **A-26** Datumsfeld (Tag antippen übernimmt und schließt, allgemeine Regel): Fall-Liste und Muster, Ja abwarten.

## 4. Danach

- A-34 `--vv-top` entfernen (vorher quer und iPad messen) · A-31 Messung abspielen (mit safari.mjs) · A-30 Vorschläge (Rückgängig nach Löschen, leere Zustände, Ziehen zum Aktualisieren aus) ·
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
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann arbeit/A-33 Fall-Liste.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und arbeite dann Abschnitt 3 ab: das Ja zum Bau der Korrektur A-33 (Weg A, R-3.2 ergänzt) als AppDesign 4.27.1 / Reiselogbuch 3.25.1 liegt vor – Prüfung zuerst rot, bauen, prüfen, veröffentlichen, Bericht mit Prüfpunkten P-59. Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
