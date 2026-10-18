# Übergabe an die nächste Sitzung

**Stand 18.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0012‘
(Zusammenarbeit allgemein 2.9.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.21.2** online (Fassung 4.23.2) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.23.2** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.9.0** | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0013**; die danach 0014.
- **Offene Prüfpunkte:** keine (P-51 bis P-53 geprüft, T-92 / A-19 abgeschlossen).
- **Sitzungsgröße:** Grenze etwa 300.000 Token Kontext; die Zeile Zeit und Token zeigt ihn.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0012‘:**
- **4.23.0 / 3.21.0 veröffentlicht** (Suche über alle Reiselogbücher, T-92 / A-19) mit Korrektur R-7.3 (`revealRow` rollte eine
  ganz sichtbare Zeile direkt unter dem Kopf um bis zu 6 px; F-11 misst den besten von 3 Durchgängen).
- **P-51/5 nicht ok → 4.23.1 / 3.21.1:** oberste Zeile beim Öffnen merken, danach genau dort ausrichten (Wunsch des Nutzers).
- **P-52/2–4 nicht ok → 4.23.2 / 3.21.2:** nach dem Schließen die oberste Zeile 1,5 s festhalten (Safari rollt beim Zugehen der
  Tastatur nach), Tastaturhöhe ist kein Drehen, **auch nach ‹ › rollt nichts mehr** (Wunsch des Nutzers). **P-53 alles ok.**
- **Neue feste Prüfung** `ReiseLogBuch/tests/ablauf-liste-still.mjs` (AppDesign `checkListStill` neu): Start mit Lücke, 11 Fälle,
  Safari-Tastatur einzeln und zusammen (`vv`, `resize`, `late`, `alle`), iPad quer/hoch, iPhone hoch/quer. R-7.3 nur noch dort.
- **Zusammenarbeit 2.9.0 (0 Nr. 1):** bei ‚nicht ok‘ zuerst genau den Ablauf des Nutzers als feste Prüfung nachbauen, sie muss
  gegen den veröffentlichten Stand rot sein, dann korrigieren; sie bleibt im vollen Lauf.
- **Lehren aus 0012:** (1) Prüfungen beginnen im Zustand des Geräts (Daten mit Lücke, Öffnen wie der Nutzer), nicht bei einem
  bequemen Scrollstand. (2) Safari-Eigenheiten einzeln **und** zusammen nachbilden – zusammen heben sich Fehler auf.
  (3) Die nachgebildete Tastatur darf das iPad nicht unter 500 px Höhe drücken (sonst iPhone-Ansicht).

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

Backlog-Spitze (alle Prio 1, je mit Fall-Liste und Muster, vor dem Bau ‚Ja‘; höchstens 2 Themen je Version):
1. **A-23** Hervorhebung nach dem Fenster länger (allgemein, R-7.3; Vorschlag ~2 s voll blau + ~1 s ausblenden).
2. **T-94** Verlauf im Fenster ‚Tag‘: ‚Tour …‘ und ‚Sonstiges …‘ (neue Zeile am Ende, Cursor dorthin) nach ‚Freetour …‘.
3. **A-21 / T-93** Suche mit mehreren Begriffen (UND, allgemeine Regel); danach **A-22** Lupe am Ende der Kapsel (2 Varianten).
Vorschlag: A-23 + T-94 als eine Version (AppDesign 4.24.0 / Reiselogbuch 3.22.0), dann A-21.

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
| Muster, Fall-Listen, Auswertungen | g811141a/AppDesign | `arbeit/A-06 Muster und Fall-Liste.md`, `arbeit/P-39 Rückmeldung.md`, `arbeit/T-84 Fall-Liste.md` |
| Prüf-Bausteine | g811141a/AppDesign | `tests/pruefe.mjs`, `tests/lauf.mjs`, `tests/offline.mjs`, `tests/start.mjs`, `tests/README.md` |
| Regeln (Zusammenarbeit, Design) | g811141a/AppDesign | `README - Zusammenarbeit allgemein.md`, `README - Designrichtlinie allgemein.md` |
| Backlog allgemein | g811141a/AppDesign | `BACKLOG.md` |
| App: Backlog, Richtlinie, Funktionsbeschreibung, Prüfliste im CHANGELOG, Tests | g811141a/ReiseLogBuch | `BACKLOG.md`, `README - Designrichtlinie Reiselogbuch.md`, `PROMPT.md`, `CHANGELOG.md`, `tests/alle.mjs` |

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein, für Konvertierungen auch **ReiseLogBuch-Import** (privat).

## 7. Starttext für die neue Sitzung

```
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und arbeite dann Abschnitt 3 ab (Fall-Listen und Muster für A-23 und T-94, vor dem Bau mein Ja). Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
