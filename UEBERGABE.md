# Übergabe an die nächste Sitzung

**Stand 21.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0025‘ (Ende)
(Zusammenarbeit allgemein 2.16.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.26.1** online (Fassung 4.28.1) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.28.1** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.16.0** | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0026**; die danach 0027.
- **Sitzungsgröße:** 0025 endete bei ~220.000 Token Kontext und wurde spürbar langsamer – **künftig ab ~150.000 Token übergeben**
  (wird mit A-39 in Zusammenarbeit 0 Nr. 13 festgehalten).
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch (0025: alle Aufrufe ‚high‘, `CLAUDE_CODE_EFFORT_LEVEL=high`). Prüfen nach 0 Nr. 15.
- **Per du!** Versuche **kurz** (3–6 Handgriffe je Gerät). **Link und Schritte immer auch im Auswahlfenster selbst** (2.16.0).
- **Kein Mac** – nur Versuche des Nutzers am Gerät; Messungen (Messmodus) wertet Claude aus den Rohdaten aus.
- **Offene Prüfpunkte:** keine.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0025‘ (21.10.2026), nichts gebaut:**
- **A-37** ‚Nach oben / Ans Ende‘: Apple-Abgleich, Muster mit Varianten Heute · A (wie Gemini, ein Knopf unten Mitte, Pfeil folgt der
  Wischrichtung) · B (Kapsel zeigt nur wirksame Pfeile) · C (Griff mit Tages-Blase wie Apple Fotos) – in Chromium und WebKit geprüft
  (`arbeit/A-37 Muster prüfen.mjs`, alles grün), online: https://g811141a.github.io/AppDesign/arbeit/A-37%20Muster.html;
  Erklärung und Fall-Liste `arbeit/A-37 Fall-Liste.md`. **Wahl des Nutzers steht aus** (Link und Schritte noch nicht gegeben).
- **A-38** Frameworks (Prio 1, gemeinsam durchgehen): Nutzer fragte nach Ionic und Framework7. Empfehlung Claude: Framework7 für reines JS
  und eigene Regeln, Ionic bei App Store/Vue/React; Mischform = Framework7 als Unterbau, AppDesign als Regelschicht (AppDesign 5).
  Quelltext Framework7 9.2.0 ausgewertet (`arbeit/A-38 Framework7 Auswertung.md`): **Tastatur unter iOS löst Framework7 nicht**
  (kein `visualViewport`, Feld rollen nur unter Android); Vorschläge V1 sichere Ränder prüfbar (42 × `env()`, nie geprüft),
  V2 Rückmeldung beim Antippen (kein `:active`), V3 Titel antippen = nach oben, V4 Glas-Optik, V5 = A-37 C, V6 lange Listen.
  Selbstkritik an den Nutzer: die Vorgabe ‚keine Frameworks‘ (Prompt 04.10.2026) schließt ein fest abgelegtes Framework offline nicht aus –
  das hätte Claude früher sagen sollen.
- **A-39** Konsolidierung aller Regeln: Nutzer – ‚du wirst immer langsamer‘. Ursache vor allem die Sitzungsgröße; Konsolidierung bringt
  Klarheit und weniger Fehler. Auftrag im Starttext (Abschnitt 7), Opus 5.5, Aufwand hoch.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **A-39** Konsolidierung (Prio 1) – genau nach dem Starttext in Abschnitt 7.
2. Danach **A-38** Frameworks mit dem Nutzer durchgehen (Prio 1), dann **A-37** (Prio 2): Link und nummerierte Schritte zum Muster
   im Chat und im Auswahlfenster, Wahl der Variante, Fall-Liste ergänzen, Ja.
3. Startfrage nur, wenn kein Auftrag: Auswahlfenster mit den Repos (0 Nr. 19).

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
Reiselogbuch 0026 – A-39 Konsolidierung aller Regeln

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md und gezielt die Regeln (Zusammenarbeit Abschnitte 0 und 1), prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5. Dann Auftrag A-39:

Ziel: Alle Regelwerke konsolidieren – kürzer, ohne Doppelungen und Widersprüche, jede Regel genau an einer Stelle mit genau einer Prüfung (Zusammenarbeit 0 Nr. 3). Inhaltlich geht keine Regel verloren und keine ändert sich ohne mein Ja.

Umfang: AppDesign – README - Zusammenarbeit allgemein.md, README - Designrichtlinie allgemein.md (inkl. Komponenten 15, HIG-Checkliste 16, Regelkatalog 17), CLAUDE.md, UEBERGABE.md, tests/README.md; ReiseLogBuch – README - Designrichtlinie Reiselogbuch.md, PROMPT.md, CLAUDE.md, tests/README.md; ReiseLogBuch-Import – CLAUDE.md (nur Verweise prüfen). Kein Code: v4/, fassung/, index.html und die Prüfskripte bleiben unverändert.

Grundsätze:
1. Geschichte raus aus dem Regeltext: Vermerke wie „seit 4.27.1 (A-33)“, „Nutzer 19.10.2026“, „Anlass …“ wandern in die Versionsgeschichte bzw. ins CHANGELOG; im Regeltext steht nur, was heute gilt.
2. Überholte Stellen (z. B. Zusammenarbeit Abschnitte 2–9 neben Abschnitt 0) zusammenführen oder streichen; Abschnitt 0 wird das eine Arbeitsmodell.
3. Eine Regel, ein Ort: Doppelungen zwischen Designrichtlinie, Komponenten, Regelkatalog und App-Richtlinie auflösen; die App-Richtlinie enthält nur Abweichungen von den allgemeinen Regeln.
4. Jede Regel behält ihre Nummer (R-x.y) oder bekommt einen Eintrag „Zuordnung alt → neu“; jede Regel nennt ihre Prüfung.
5. Neu in Zusammenarbeit 0 Nr. 13: Übergabe und neue Sitzung schon ab etwa 150.000 Token Kontext (statt 300.000).

Vorgehen:
Schritt 1 (ohne Änderung): Bestandsaufnahme als Datei arbeit/A-39 Konsolidierung Plan.md – Größe jeder Datei (Zeichen), gefundene Doppelungen, Widersprüche, überholte Stellen, Regeln ohne Prüfung, Prüfungen ohne Regel, geplanter neuer Aufbau und geschätzte Größe danach. Widersprüche und inhaltliche Fragen einzeln im Auswahlfenster mit Empfehlung. Dann mein Ja abwarten.
Schritt 2: Umsetzen. Danach eine Abgleichliste: jede Regel und jede Vereinbarung von vorher mit ihrer neuen Stelle – nichts darf fehlen. Größe vorher/nachher.
Schritt 3: Veröffentlichen nach unseren Regeln (Versionen, Veröffentlichungs-Skript, ein voller Prüflauf); die Prüfungen müssen unverändert grün sein, weil kein Code geändert wurde.
Schritt 4: Bericht nach Zusammenarbeit 0 Nr. 11 und Übergabe (offen bleiben A-38 Prio 1 und A-37 Prio 2).
```
