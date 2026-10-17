# Übergabe an die nächste Sitzung

**Stand 17.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0008 – T-05 Prüfung und A-12‘
(Zusammenarbeit allgemein 2.7.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.16.0** (Fassung 4.18.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign (ui.js, design.css, tests; feste Fassung `fassung/4.18.0/`) | **4.18.0** | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import – `README.md`, `PROMPT.md`, `CLAUDE.md`, `ERKENNTNISSE.md`, `werkzeug/pruefen.mjs` |
| Designrichtlinie allgemein | **4.18.0** (R-1.1 bis R-10.4, neu R-7.3) | `README - Designrichtlinie allgemein.md` |
| Designrichtlinie Reiselogbuch | 3.16.0 | im Repo ReiseLogBuch |
| Zusammenarbeit allgemein | **2.7.0** (§2: Zeile mit `messung.mjs`) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0009** (Zusammenarbeit 0 Nr. 13); die danach 0010.
- **Offene Prüfpunkte:** keine – T-05, P-43 und P-44 geprüft.
- **Nächste Version:** nichts bereit (AppDesign und Reiselogbuch: Abschnitt 0 der Backlogs leer).
- **Zeit und Token (seit AppDesign 4.17.0):** am Ende jeder Antwort `node ../AppDesign/werkzeug/messung.mjs` aufrufen und
  die Zeile unverändert übernehmen – nie schätzen. Token ‚vorige Antwort‘ beziehen sich auf die Antwort vor der letzten
  **Chat**-Nachricht; Antworten in Auswahlfenstern sind keine neue Nachricht.
- **Sitzungsgröße:** unsere Grenze bleibt **etwa 300.000 Token**.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0008 – T-05 Prüfung und A-12‘ – drei Themen abgeschlossen:**
- **T-05 geprüft:** die erste Import-Datei wurde mit ‚Backup laden‘ → ‚Abgleichen‘ geladen, alles in Ordnung (E-75, E-26).
- **A-12 → AppDesign 4.17.0:** Werkzeug `werkzeug/messung.mjs` (Fall-Liste `arbeit/A-12 Fall-Liste.md`, Prüfung
  `tests/messung.mjs` mit Gegenprobe). Funde: eine Modell-Antwort steht auf mehreren Zeilen der Sitzungsdaten (Handmessung
  zählte mehrfach); nach einem Neustart liegt die Sitzung in einem zweiten Ordner. ‚neu‘ = Eingabe + Ausgabe (Entscheidung
  des Nutzers). Zusammenarbeit 2.7.0, CLAUDE.md 2.4.0. P-43 ok.
- **A-13 → AppDesign 4.18.0 und Reiselogbuch 3.16.0:** Wunsch geändert von ‚Zeile immer ganz oben‘ zu ‚Tabelle eingefroren,
  bis man von der Tageserfassung zurück ist‘. Ursache des Fehlers: Safari schiebt beim Öffnen der Tastatur die ganze Seite
  (overflow: hidden hält das nicht auf) und schiebt nicht zurück. Lösung in `ui.js`: Scrollstand beim Öffnen merken, beim
  Schließen wiederherstellen; `revealRow` hebt die Zeile kurz hervor und zeigt sie nach ‹ ›. Neue Regel **R-7.3**, Prüfung
  `checkListStill` (Tastatur nachgebildet, Gegenprobe rot). Nutzer: iPhone und iPad verhalten sich gleich, Änderungen gelten
  allgemein. Klärung `arbeit/A-13 Klärung und Fall-Liste.md`. P-44 ok.
- **Fehler in 0008:** nach dem ersten (roten) Veröffentlichungslauf die Vorbereitungs-Zweige gelöscht, bevor das Ergebnis
  gelesen war – aus dem lokalen Verlauf wiederhergestellt. Lehre (wie 0007): erst das Ergebnis lesen, dann aufräumen.
  Ursache des roten Laufs: die Prüfung erwartete die Hervorhebung nach 120 ms, unter Last in WebKit später → wartet bis 800 ms.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. Startfrage (0 Nr. 19). Kein Prüfpunkt offen, nichts bereit.
2. Weitere alte Reiselogbücher konvertieren, sobald der Nutzer sie anhängt (Import-Repo, `PROMPT.md` vollständig lesen).
3. T-06 klären (Ausschreibungstexte in Reiselogbücher umwandeln, Prio 3) – kann das Import-Repo mitnutzen.

## 4. Danach

- **A-01** Startseite (später).

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
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und dann die Startfrage (0 Nr. 19).
```
