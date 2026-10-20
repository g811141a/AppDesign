# Übergabe an die nächste Sitzung

**Stand 20.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0021‘ (Ende)
(Zusammenarbeit allgemein 2.15.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.26.0** online (Fassung 4.28.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.28.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.15.0** (0 Nr. 20: Muster mit Messung vorher im Modell geprüft, führen durch den Versuch, zeigen nur ‚aufgenommen‘) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0022**; die danach 0023.
- **Sitzungsgröße:** 0021 endete bei ~325.000 Token Kontext.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch (0021: alle Aufrufe ‚high‘). Prüfen nach 0 Nr. 15 (`"effort"` in der Sitzungsdatei).
- **Per du!** Der Nutzer ist nach drei Muster-Versuchen **verärgert** (‚nur Arbeit ohne Mehrwert‘, ‚Test extrem schwer, Anleitungen
  nicht sichtbar‘). Nächster Versuch nur, wenn er **kurz** ist und **sicher** sauber misst.
- **Kein Mac** (Nutzer 20.10.2026): Claude kann nicht selbst am Gerät oder im iOS-Simulator testen – nur Versuche des Nutzers.
- **P-60 nicht ok (A-36, Tastatur: Leisten springen)** – alles in **`arbeit/A-36 Fall-Liste.md`: zuerst Abschnitte 6a, 6b, 6c lesen**
  (dazu 1 und 2 bei Bedarf). Messungen: `arbeit/A-36 Messungen/` (6 Dateien). Werkzeuge: `arbeit/A-36 auswerten.mjs` (Auswertung aus den
  Rohdaten, `--selbsttest`), `arbeit/A-36 Muster prüfen.mjs` (Muster im Safari-Modell, Chromium und WebKit, Gegenproben).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0021‘ (20.10.2026):**
- Muster 2. Fassung am Gerät in allen vier Lagen: **V1 (Feld vorher in die obere Hälfte) still** beim Öffnen und Schließen, auch
  iPhone quer im Fenster (15 px über der Tastatur, kein Verschieben). Bestätigt: Safari verschiebt bis zur Mitte, höchstens um den
  ganzen Raum (218/212/362, 340 begrenzt), Kapsel-Fehler `--vv-bottom`, `isPhone()` (iPad quer: Fenster links 327 → 0, Seitenleiste
  verschwindet mit Tastatur).
- Safari-Modell: `ABSTAND` 80 → 24, neu `ABSTAND_FENSTER` 15 (`tests/safari.mjs`); `ablauf-tastatur-still.mjs` gegen 3.26.0 weiter rot (59).
- **Zusammenarbeit 2.15.0** (0 Nr. 20, Ja des Nutzers): Muster mit Messung vorher im Modell geprüft (mit Gegenprobe), führen durch den
  Versuch, zeigen nur ‚aufgenommen‘.
- Muster 3. Fassung (geführt, V1 ‚nur so weit wie nötig‘) – **am Gerät gescheitert:** Anleitung scrollte weg; iPhone lief in ‚Heute‘
  (Home-Bildschirm-Symbol mit alter Adresse `?v=heute`); iPad: vier neue V1-Fehler (Fall-Liste 6c): 2× tippen nötig, Feld wechseln
  bei offener Tastatur → Safari zentriert (132), Gesamtausgaben rutscht unter die Tastatur, erneutes Antippen nach Tastatur-Taste → 428.
  Neu gelernt: Suche quer bei 32 px → 9 px verschoben; Wechsel bei offener Tastatur → Safari zentriert schon bei 24–34 px;
  **iPhone quer im Fenster ist ‚Notiz‘ mit offener Tastatur nicht erreichbar** (Heute = 4.28.0, vermutlich auch Reiselogbuch 3.26.0).

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **Lehren aus 0021 zuerst umsetzen** (Nutzer verärgert): Anleitung **nur im Chat** (vollständig, nummeriert, 0 Nr. 11), wenige
   Schritte, **V1 im Muster erzwingen** (keine Variante aus der Adresse, kein Umschalter – Heute ist ausreichend gemessen), nichts im
   Muster, was weg-scrollt oder eine Reihenfolge erzwingt.
2. **Safari-Modell** um 6c ergänzen (0 Nr. 20): Wechsel bei offener Tastatur zentriert ab ≥ 34 px (Mitte), Suche quer 32 px → Mitte,
   erneutes Antippen nach der Tastatur-Taste; Prüfungen erst rot, dann V1 so ändern, dass sie grün werden: Feld **immer in die obere
   Hälfte** (wie 2. Fassung) – beim ersten Antippen, beim Wechseln und beim erneuten Antippen; iPad-Fenster gleitet (3. Fassung, gut);
   Ursache ‚2× tippen‘ suchen (Unterschied 2. ↔ 3. Fassung im Abfangen der Berührung); Gesamtausgaben iPad quer nachstellen.
3. Dem Nutzer Vorschlag machen: kurzer Versuch (iPad und iPhone, je ~4 Schritte) **oder** gleich Ja zum Bau 4.28.1 / 3.26.1 mit
   Prüfliste – der Nutzer entscheidet; ohne ausdrückliches Ja wird nicht gebaut. Für die Suche quer: kompakte Kopfzeile quer
   (iOS: niedrige Leiste) vorschlagen oder 9 px hinnehmen (Nutzer entscheidet).
4. Danach A-37 (‚Nach oben / Ans Ende‘ wie in der Gemini-App, allgemeine Regel).

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
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann arbeit/A-36 Fall-Liste.md (Abschnitte 6a, 6b, 6c) und gezielt die Regeln (Zusammenarbeit Abschnitte 0 und 1), prüfe Modell und Aufwand (Sitzungsdatei), gib mir das Lagebild und arbeite dann Abschnitt 3 ab. Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
