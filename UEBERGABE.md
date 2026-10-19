# Übergabe an die nächste Sitzung

**Stand 19.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0014‘
(Zusammenarbeit allgemein 2.10.1, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.23.1** online (Fassung 4.25.1) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.25.1** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| ReiseLogBuch-Import (privat) | 1.2.1 (unverändert) | g811141a/ReiseLogBuch-Import |
| Zusammenarbeit allgemein | **2.10.1** | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0015**; die danach 0016.
- **Offene Prüfpunkte:** keine offenen Schritte; P-56/1 und /2 waren **nicht ok** → A-24 bleibt offen (Abschnitt 3).
- **Sitzungsgröße:** Grenze etwa 300.000 Token Kontext (0014 endete bei ~275.000).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0014‘:**
- **4.25.1 / 3.23.1 veröffentlicht:** Baustein `setHtml(el, html)` (ui.js) – Neuaufbau ohne das Feld mit dem Fokus zu ersetzen
  (App ruft ihn statt `innerHTML`); Markierung bei Icons in Kapseln als Kreis 36 × 36 (vorher 42 × 36); Prüfungen `checkSearch`/
  `checkListSearch` tippen Buchstabe für Buchstabe (Feld bleibt), Grundregel R-3.1 ‚rund ist ein Kreis‘, neue feste Prüfung
  `ReiseLogBuch/tests/ablauf-suche-iphone.mjs`. **P-56:** /0, /3, /4 ok (**A-25 abgeschlossen**); **/1, /2 nicht ok.**
- **Rückmeldung des Nutzers (sehr deutlich):** das Zittern am iPhone ist ‚schon unzählige Male gemeldet‘ – nach einigen Buchstaben
  leicht, **nach ⓧ massiv**, nur bei offener Tastatur (mit ⌃ ⌄ ruhig), iPad ruhig. Er will **kein Hin und Her mit Testen** mehr.
- **Analyse** `arbeit/A-24 Analyse nach P-56.md`: Safari verschiebt am iPhone den sichtbaren Bereich (`visualViewport.offsetTop`)
  – wenig Platz über der Tastatur (quer ~100–150 px), kurze Seite nach dem Filtern, iOS-26-Fehler bei Home-Bildschirm-Apps
  (Apple-Forum 824765, WebKit 300523); `--vv-top` gleicht erst ein Bild später aus. Meine Nachbildung verschob um eine **feste**
  Strecke statt aus der Geometrie – deshalb grün. iPad und iPhone sind **gleich gebaut**; der Unterschied ist Safari.
- **Angaben des Nutzers:** iPad mit **Bildschirmtastatur**; iPhone **vom Home-Bildschirm**, **iOS 26**.
- **Entscheidungen 19.10.2026:** Suche **bleibt oben**; **Umbau B** (nur der Inhalt rollt, die Seite nie – Leisten nicht mehr
  `position: fixed`) **mit Messung vorher** (A-27 Messmodus, A-28 Umbau). Neue allgemeine Regel: **Suche öffnen und ⓧ rollen ganz
  nach oben** (A-29). Weg A (Leerraum) und C (Suche unten) verworfen.
- **Wünsche an Claude:** (1) mehr eigene Vorschläge für AppDesign – jede Fall-Liste endet mit ‚Vorschläge für AppDesign‘ (erste
  in A-30); (2) nicht wieder dieselben Fehler: **Vorschlag 0 Nr. 20** (noch nicht bestätigt, in 0015 fragen): bei Bewegungsfehlern am
  Gerät zuerst messen; **ein** Safari-Modell (`tests/safari.mjs`) für alle Prüfungen; im Bericht ‚in der Nachbildung behoben, am Gerät
  zu bestätigen‘; Safari-Eigenheiten mit Quelle in Designrichtlinie 13.
- **Lehre:** Schon in 0010 gab es Messungen am iPad (Messseite als Kopie der App, A-18) – der Nutzer ließ sie wieder entfernen
  (E-42). Den Messmodus deshalb **schlank** als Baustein in der App, abschaltbar, keine Kopie.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **A-27 Messmodus** (AppDesign 4.26.0 / Reiselogbuch 3.24.0?, oder Korrekturversion – mit dem Nutzer klären): Fall-Liste
   (was je Bild aufgezeichnet wird: Zeit, `scrollY`, `visualViewport.height/offsetTop`, `innerHeight`, Lage von Leiste und Suchfeld,
   Fokus, Ereignisse; Start/Stopp im Mehr-Menü; ‚Messung teilen‘ als Text), Muster, **Ja**, bauen, veröffentlichen. Dann misst der
   Nutzer am iPhone (hoch und quer: Suche öffnen, tippen, ⓧ, weitertippen) und am iPad zum Vergleich.
2. **Auswertung** der Messung → gemeinsames Safari-Modell `AppDesign/tests/safari.mjs` an den echten Werten ausrichten;
   `ablauf-suche-iphone.mjs` damit **rot gegen 4.25.1/3.23.1** machen (genau das gemessene Muster).
3. **A-28 Umbau B** + **A-29** (nach oben bei Suche öffnen/ⓧ): Fall-Liste (alle betroffenen Regeln R-2.1, R-7.3, R-7.4, R-8.1,
   Nach oben/Ans Ende, Druck, Seitenleiste) mit Muster, **Ja**, eine gut vorbereitete Version.
4. Danach **A-26** Datumsfeld (allgemeine Regel).

## 4. Danach

- A-30 Vorschläge (Rückgängig nach Löschen, leere Zustände, Ziehen zum Aktualisieren aus) · T-06 Ausschreibungstexte (Prio 3) ·
  **A-01** Startseite (später).

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
| Muster, Fall-Listen, Auswertungen | g811141a/AppDesign | `arbeit/A-21 A-22 Fall-Liste.md`, `arbeit/A-23 T-94 Fall-Liste.md` (je mit Muster) und ältere in `arbeit/` |
| Prüf-Bausteine | g811141a/AppDesign | `tests/pruefe.mjs`, `tests/lauf.mjs`, `tests/offline.mjs`, `tests/start.mjs`, `tests/README.md` |
| Regeln (Zusammenarbeit, Design) | g811141a/AppDesign | `README - Zusammenarbeit allgemein.md`, `README - Designrichtlinie allgemein.md` |
| Backlog allgemein | g811141a/AppDesign | `BACKLOG.md` |
| App: Backlog, Richtlinie, Funktionsbeschreibung, Prüfliste im CHANGELOG, Tests | g811141a/ReiseLogBuch | `BACKLOG.md`, `README - Designrichtlinie Reiselogbuch.md`, `PROMPT.md`, `CHANGELOG.md`, `tests/alle.mjs` |

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein, für Konvertierungen auch **ReiseLogBuch-Import** (privat).

## 7. Starttext für die neue Sitzung

```
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und arbeite dann Abschnitt 3 ab (zuerst A-27 Messmodus: Fall-Liste, vor dem Bau mein Ja). Hole vorher die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu (add_repo, Zugriff push), wie in UEBERGABE.md Abschnitt 5.
```
