# Übergabe an die nächste Sitzung

**Stand 18.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0013‘
(Zusammenarbeit allgemein 2.10.1, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.23.0** online (Fassung 4.25.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.25.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.10.1** | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0014**; die danach 0015.
- **Offene Prüfpunkte:** keine (P-54 und P-55 geprüft, A-21/A-22/A-23, T-93/T-94 abgeschlossen).
- **Sitzungsgröße:** Grenze etwa 300.000 Token Kontext; die Zeile Zeit und Token zeigt ihn (0013 endete bei ~262.000).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0013‘:**
- **4.24.0 / 3.22.0 veröffentlicht:** A-23 Hervorhebung nach dem Fenster 2 s voll blau + 1 s ausblenden (‚Bewegung
  reduzieren‘ 2 s), endet beim nächsten Fenster; T-94 Verlauf mit ‚Tour …‘ und ‚Sonstiges …‘ (leere Zeile **am Anfang**,
  Cursor dorthin). Neue Prüfung `ReiseLogBuch/tests/verlauf-vorschlaege.mjs`, `checkListStill` prüft Farbe und Dauer. **P-54 ok.**
- **4.25.0 / 3.23.0 veröffentlicht:** A-21 Suche mit mehreren Wörtern (alle müssen vorkommen, Reihenfolge egal), **„…“ =
  genaue Wortfolge (allgemeine Regel)**; Einheit im Reiselogbuch = ganzes Reiselogbuch (gezeigt die Tage mit mindestens einem
  Wort); A-22 Lupe am Ende der Kapsel vor ‚…‘ (Liste [plus | search | ellipsis]). Bausteine `searchWords`, `findsAll`,
  `findsAny`, `markWords` (ui.js), Prüfungen `checkSearchWords`, `checkSearchPlace`, `ReiseLogBuch/tests/ablauf-suche-woerter.mjs`.
  **P-55 ok.**
- **Zusammenarbeit 2.10.0 / 2.10.1 (0 Nr. 11, Wunsch des Nutzers):** nach jeder Version **alle Prüfpunkte vollständig Schritt
  für Schritt im Chat** (nie nur Verweis aufs CHANGELOG), **danach immer ein Auswahlfenster zur Rückmeldung** – nur das löst
  auf dem iPad eine Push-Nachricht aus. Claude hatte die Regel zweimal nicht eingehalten → **immer anwenden.**
- **Lehren aus 0013:** (1) Prüfdaten müssen lang genug zum Rollen sein (Treffer unter der Suchzeile). (2) Gegenprobe gegen
  einen alten Stand: alte `ui.js` meldet Versionsabweichung – stattdessen die neue `ui.js` gezielt zurückdrehen.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

Neue Rückmeldungen des Nutzers vom 18.10.2026 (Backlog AppDesign A-24 bis A-26, Reiselogbuch T-95), alle Prio 1:
1. **A-24 Korrektur:** iPhone – in der Tabelle eines Reiselogbuchs zittern Symbolleisten- und Suchzeile mit jedem Buchstaben im
   Suchfeld; beide müssen fest stehen. **Zuerst den Ablauf als feste Prüfung nachbauen, rot gegen 4.25.0** (0 Nr. 1).
2. **A-25 Korrektur:** runde Schaltflächen (Lupe, …) sind eiförmig statt rund – sie waren schon einmal rund; Ursache und seit
   welcher Version, Prüfung ‚Kreis = gleiche Breite und Höhe‘.
3. **A-26 allgemeine Regel:** Datumsfeld – nach dem Antippen eines Tages übernimmt das System den Tag und kehrt in die
   Ausgangsmaske zurück (Apple-Abgleich, Machbarkeit in Safari).
Vorschlag: A-24 + A-25 als Korrekturversion (AppDesign 4.25.1 / Reiselogbuch 3.23.1), dann A-26 (4.26.0). Je Fall-Liste,
vor dem Bau ‚Ja‘.

## 4. Danach

- T-06 Ausschreibungstexte (Prio 3) · **A-01** Startseite (später).

## 5. Arbeitsumgebung (für Claude)

- **Klonen (aus 0012):** `git clone --depth 50 …` nach `/home/user/ReiseLogBuch` bzw. `/home/user/ReiseLogBuch-Import`, dann
  die Verweise. Ein im flachen Klon neu angelegter Zweig hat nach dem Push keine Verfolgung (Stop-Hook meldet ‚unpushed‘):
  `git config --add remote.origin.fetch '+refs/heads/<zweig>:refs/remotes/origin/<zweig>' && git fetch origin`.
- **Nie `… fassung` für eine schon veröffentlichte Version** – erst `vorbereiten` (neue Version), dann ändern.
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
| Muster, Fall-Listen, Auswertungen | g811141a/AppDesign | `arbeit/A-21 A-22 Fall-Liste.md`, `arbeit/A-23 T-94 Fall-Liste.md` (je mit Muster) und ältere in `arbeit/` |
| Prüf-Bausteine | g811141a/AppDesign | `tests/pruefe.mjs`, `tests/lauf.mjs`, `tests/offline.mjs`, `tests/start.mjs`, `tests/README.md` |
| Regeln (Zusammenarbeit, Design) | g811141a/AppDesign | `README - Zusammenarbeit allgemein.md`, `README - Designrichtlinie allgemein.md` |
| Backlog allgemein | g811141a/AppDesign | `BACKLOG.md` |
| App: Backlog, Richtlinie, Funktionsbeschreibung, Prüfliste im CHANGELOG, Tests | g811141a/ReiseLogBuch | `BACKLOG.md`, `README - Designrichtlinie Reiselogbuch.md`, `PROMPT.md`, `CHANGELOG.md`, `tests/alle.mjs` |

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein, für Konvertierungen auch **ReiseLogBuch-Import** (privat).

## 7. Starttext für die neue Sitzung

```
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und arbeite dann Abschnitt 3 ab (zuerst A-24: Ablauf als feste Prüfung nachbauen, dann Fall-Listen für A-24 und A-25, vor dem Bau mein Ja). Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
