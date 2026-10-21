# Übergabe an die nächste Sitzung

**Stand 21.10.2026** · fortgeschrieben in der Sitzung ‚Reiselogbuch 0024‘ (nach dem Bau, wartet auf P-61)
(Zusammenarbeit allgemein 2.16.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.26.1** online (Fassung 4.28.1) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.28.1** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.16.0** (0 Nr. 11: Link und Schritte zusätzlich im Auswahlfenster) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0024**; die danach 0025.
- **Sitzungsgröße:** 0023 endete bei ~300.000 Token Kontext.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch (0023: alle Aufrufe ‚high‘, `CLAUDE_CODE_EFFORT_LEVEL=high`). Prüfen nach 0 Nr. 15.
- **Per du!** Versuche **kurz** (3–6 Handgriffe je Gerät). **Neu (2.16.0): Link und Schritte immer auch im Auswahlfenster selbst** –
  der Text davor kam beim Nutzer zweimal nicht an (Nutzer verärgert: ‚Schon wieder kein Link und keine Anleitung‘).
- **Kein Mac** – nur Versuche des Nutzers am Gerät.
- **0024: A-36 gebaut (AppDesign 4.28.1 / Reiselogbuch 3.26.1, Fall-Liste Abschnitt 8, B-1 bis B-18), alle 66 Läufe grün – P-61 am Gerät
  steht aus (mit Messmodus, Messungen aus Rohdaten auswerten).** Früher: **P-60 (A-36, Tastatur: Leisten springen) – Lösung V3.** Alles in **`arbeit/A-36 Fall-Liste.md`: zuerst
  Abschnitte 6h bis 6n lesen**. Messungen: `arbeit/A-36 Messungen/` (20 Dateien). Werkzeuge: `arbeit/A-36 auswerten.mjs` (‚Feld springt‘,
  ‚Fokus verloren‘, `--selbsttest` 39/39), `arbeit/A-36 Muster prüfen.mjs` (alle vier Lagen, Chromium und WebKit, Gegenproben G-1 bis G-6,
  ‚wieder ans Ende‘), Muster `arbeit/A-36 Muster.html` (Fassung 9, am Gerät aktuell).
- **Entscheidungen des Nutzers:** niedrige Leisten quer am iPhone (Kopfzeile und Fensterkopf 32 statt 44 px) übernehmen und **als
  allgemeine Regel** (Designrichtlinie 15 und Regelkatalog, eine Prüfung) – Fall-Liste 6d.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0023‘ (21.10.2026), Muster 6 bis 9 am Gerät:**
- **V3 = Lösung:** Berührung bleibt bei Safari; im `focusin` das Feld in die obere Hälfte rollen und – bei geschlossener Tastatur, nur
  wenn gerollt wurde – **sofort `blur()` + `focus({ preventScroll: true })`** (synchron im focusin, noch in der Berührung). Safari liest die
  Lage beim neuen Fokus neu (S-8, bestätigt): **Safari verschiebt nie, Fokus beim ersten Mal, Leisten still, kein Flackern** (iPhone hoch,
  iPad quer, 10 von 10 und alle späteren). Bei offener Tastatur (Wechsel) kein neuer Fokus. Klick nach dem Rollen unterdrücken,
  Tastatur-Taste (iPad) gibt den Fokus ab (aus V2).
- **readonly (Muster 6, Art b) verworfen.** Felder **im Inhalt** rollt Safari beim Erscheinen der Tastatur auf den Stand vor dem Rollen
  zurück (S-9, auch ohne readonly; im Fenster nie) → **Rückstellung**: im scroll-Ereignis des Rollbereichs sofort zurück (solange das
  Feld den Fokus hat, ≤ 1,5 s, eigenes Wischen beendet sie) – am Gerät wirksam (Muster 8, 9).
- **Platz unter dem Inhalt** schrumpft nach dem Schließen der Tastatur beim Rollen wieder (nur padding, nie scrollTop) – sonst rollt ↓
  beim 2. Mal zu weit (Muster 8, Nutzer: ‚die gesamte Tabelle verschwand nach oben‘). Muster 9: behoben.
- **Offen für den Bau (6n):** ↑/↓ bei offener Tastatur braucht zwei Antipper (Ausgleich beim Schließen bricht das sanfte Rollen ab);
  iPad: ‚Feld springt‘ in der Meldungszeile, im selben ms zurückgestellt (vermutlich nie gezeichnet).

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

0. **Stand 0024:** Schritte 1 und 2 erledigt (Ja zur Fall-Liste, gebaut, online). Offen: **Rückmeldung P-61** (Prüfliste im CHANGELOG des
   Reiselogbuchs) und die zwei geteilten Messungen (P-61/1, P-61/3) aus den Rohdaten auswerten; bei ‚nicht ok‘ zuerst nachbauen (0 Nr. 1).
1. ~~**Fall-Liste für den Bau AppDesign 4.28.1 / Reiselogbuch 3.26.1** schreiben~~ (0 Nr. 1) und das **Ja** des Nutzers holen. Inhalt:
   V3 in `ui.js` (Ersatz für bzw. Erweiterung von `fieldIntoView`, R-4.5), Rückstellung, Platz schrumpft nach dem Schließen,
   ↑/↓ bei offener Tastatur (6n), Tastatur-Taste iPad, iPad-Fenster gleitet und bleibt oben (6d), **niedrige Leisten quer am iPhone als
   allgemeine Regel** (Designrichtlinie 15, Regelkatalog, eine Prüfung). Jeder Fall eine Prüfung im Safari-Modell (S-1 bis S-9); die
   Prüfungen aus `A-36 Muster prüfen.mjs` (vier Lagen, G-1 bis G-6, ‚wieder ans Ende‘) in die App-Prüfungen übernehmen; gegen 3.26.0
   rot (P-60 nachgebaut). Safari-Eigenheiten S-6 bis S-9 mit Quelle in Designrichtlinie 13.
2. Bau, `… los`, Bericht mit Prüfpunkten (Link und Schritte **auch im Auswahlfenster**), am Gerät mit Messmodus bestätigen.
3. Danach A-37 (‚Nach oben / Ans Ende‘ wie in der Gemini-App, allgemeine Regel).

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
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann arbeit/A-36 Fall-Liste.md (Abschnitte 6d und 6h bis 6n) und gezielt die Regeln (Zusammenarbeit Abschnitte 0 und 1), prüfe Modell und Aufwand (Sitzungsdatei), gib mir das Lagebild und arbeite dann Abschnitt 3 ab. Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
