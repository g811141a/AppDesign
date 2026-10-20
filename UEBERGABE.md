# Übergabe an die nächste Sitzung

**Stand 20.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0019‘ (Ende)
(Zusammenarbeit allgemein 2.14.1, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.26.0** online (Fassung 4.28.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.28.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.14.1** (0 Nr. 15: zu Beginn auch Abschnitt 1 – per du; Aufwand aus der Sitzungsdatei) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0020**; die danach 0021.
- **Sitzungsgröße:** 0019 endete bei ~365.000 Token Kontext.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch. Prüfen nach 0 Nr. 15 (seit 2.14.1): `"effort"` in der Sitzungsdatei
  (`/root/.claude/projects/…/*.jsonl`) ist maßgeblich – die App zeigte in 0019 ‚mittel‘, obwohl alle Aufrufe mit ‚high‘ liefen; der
  Nutzer hat sie auf ‚hoch‘ gestellt.
- **Per du!** (Zusammenarbeit Abschnitt 1) – in 0019 sprach Claude anfangs mit ‚Sie‘ an, weil Abschnitt 1 nicht gelesen war.
- **P-60 geprüft (20.10.2026): nicht ok** – Kopf- und Suchzeile (iPad auch Seitenleiste) springen beim Ein- und Ausblenden der
  Tastatur (iPhone hoch und quer, iPad quer, auch in Fenstern); Kapsel unter der Tastatur bzw. am iPad weg; iPad-Fenster rutscht an
  den linken Rand. iPad hoch: alles top. /0 und der Rest ok. **Ursache gemessen:** `arbeit/A-36 Analyse P-60.md` (**zuerst lesen**).
  Der Nutzer ist zu Recht verärgert (‚katastrophal schlecht getestet‘) – diesmal jedes Bild prüfen, nicht nur den Endzustand.
- **Neue Messungen** in `tests/messungen/` (2026-10-20 iPhone hoch und iPad quer, Fenster ‚Ort‘) – `ablauf-abspielen.mjs` spielt
  sie im nächsten vollen Lauf mit (iPad-Datei braucht passende Ziele/Ansicht; erwartet rot bis A-36 behoben).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0019‘ (19./20.10.2026):**
- **A-26 entfällt** (E-62): Muster C2 am iPad ok, aber Safari meldet nur den Wert – drei Fälle (31. → letzter Tag eines anderen
  Monats, gleicher Tag, heute im leeren Feld) und eine 400-ms-Annahme bleiben. Nutzer: ‚Wenn nicht alles funktioniert, bauen wir es
  so nicht ein.‘ Antworten zu Apple, anderen Apps und Zeitraum durch Ziehen: `arbeit/A-26 Datumserfassung Apple und andere Apps.md`.
- **A-35 und A-31 gebaut und veröffentlicht** (AppDesign 4.28.0 / Reiselogbuch 3.26.0, Ja 20.10.2026):
  - R-4.5 ergänzt: ein Feld mit Fokus steht immer ganz über der Tastatur, auch im Inhalt (`fieldIntoView`, 16 px darüber; reicht der
    Platz nicht – quer mit Suchzeile 55 px –, direkt unter der Suchzeile).
  - Safari-Modell: Feld im Rollbereich unter der Tastatur verschiebt den sichtbaren Bereich um den ganzen Raum (quer 232 px),
    Zifferntastatur quer 170 px sichtbar, `__safari.setze` für das Abspielen; Designrichtlinie 13.
  - `tests/abspielen.mjs` (A-31): Messdatei nachspielen, Kopf-/Suchzeile ± 1 px und Fokus je Schritt; Reiselogbuch
    `ablauf-abspielen.mjs` (mit Gegenprobe) und `ablauf-feld-tastatur.mjs` (gegen 3.25.1 rot). Voller Lauf: 66 Läufe grün.
- **Zusammenarbeit 2.14.0/2.14.1**, CLAUDE.md AppDesign 2.5.0, ReiseLogBuch 3.5.0.
- Fall-Liste `arbeit/A-26 A-31 A-34 Fall-Liste.md` Abschnitte 9–14.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **A-36 Tastatur ohne Springen** (Korrektur AppDesign 4.28.1 / Reiselogbuch 3.26.1): `arbeit/A-36 Analyse P-60.md` Abschnitt 4 –
   Fall-Liste, Prüfungen zuerst rot gegen 4.28.0 (jedes Bild, alle drei Messungen), Muster am Gerät mit Messung (V1–V3), dann
   **Ja zum Bau** einholen. Ziel: Safari muss nie verschieben.
2. Danach A-37 (‚Nach oben / Ans Ende‘ wie in der Gemini-App, allgemeine Regel) und Abschnitt 4.

## 4. Danach

- A-30 Vorschläge (Rückgängig nach Löschen, leere Zustände, Ziehen zum Aktualisieren aus) ·
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
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann arbeit/A-36 Analyse P-60.md und gezielt die Regeln (Zusammenarbeit Abschnitte 0 und 1), prüfe Modell und Aufwand (Sitzungsdatei), gib mir das Lagebild und arbeite dann Abschnitt 3 ab: A-36 Tastatur ohne Springen – Fall-Liste, Prüfungen zuerst rot, Muster am Gerät. Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
