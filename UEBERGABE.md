# Übergabe an die nächste Sitzung

**Stand 15.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0005 – A-06 Offline-Hinweis‘
(Zusammenarbeit allgemein 2.4.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | 3.15.0 | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign (ui.js, design.css, tests; feste Fassung `fassung/4.16.0/`) | 4.16.0 | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Designrichtlinie allgemein | 4.16.0 (Regelkatalog R-1.1 bis R-10.4, 36 Regeln in 10 Themen; neu R-7.2) | `README - Designrichtlinie allgemein.md` |
| Designrichtlinie Reiselogbuch | 3.15.0 | im Repo ReiseLogBuch |
| Zusammenarbeit allgemein | 2.4.0 (Abschnitt 0 = Arbeitsprozess 2.0, hat Vorrang) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0006** (Zusammenarbeit 0 Nr. 13); die danach 0007.
- **Offene Prüfpunkte:** **P-41** (Reiselogbuch 3.15.0 · AppDesign 4.16.0, Prüfliste /0 bis /5 im CHANGELOG des Reiselogbuchs) – zuerst prüfen, dann Neues.
- **Nächste Version:** nichts bereit.
- **Sitzungsgröße:** höchstens 1.000.000 Token Kontext (Sitzungsdaten, `get_session` → `context_usage`); unsere Grenze
  bleibt **etwa 300.000 Token** (Nutzer, 15.10.2026: keine Änderung der Grenze).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0006 – T-84 iPhone-Start‘ (läuft):**
- **AppDesign 4.16.0 · Reiselogbuch 3.15.0 veröffentlicht:** T-84 wurde allgemeine Regel **R-7.2** (A-09): jedes
  Neuladen beginnt im iPhone-Aufbau (auch iPad im schmalen Fenster) in der Startliste ohne blauen Eintrag; iPad-Aufbau
  unverändert. Prüfung `start.mjs` (AppDesign) und `start-regeln.mjs` (F-1 bis F-18). Fall-Liste `arbeit/T-84 Fall-Liste.md`.
  Designrichtlinie 13: Neustart ist in einer Web-App nicht erkennbar.
- **A-07 (Zusammenarbeit 2.4.0):** zu Beginn gezielt lesen (UEBERGABE, Abschnitt 0, Überschriften), nur ein voller
  Prüflauf je Version im Veröffentlichungs-Skript. Nicht übernommen: Versionsgeschichten auslagern, weniger
  Pflichtschritte bei Korrekturen; Dunkelmodus bleibt in jedem Lauf (Wunsch zurückgenommen).
- **Fund beim Veröffentlichen:** zweimal rot durch WebKit unter Last (4 Prozessoren, 8 Browser gleichzeitig; einzeln
  grün), erst der dritte Lauf grün.

**Sitzung ‚Reiselogbuch 0005 – A-06 Offline-Hinweis‘ – A-06 abgeschlossen:**
- **Offline-Hinweis (AppDesign 4.15.0 · Reiselogbuch 3.14.0, Variante c, allgemeine Regel – R-1.5 ergänzt):** graue
  Zeile `wifi-off` ‚Offline – alles bleibt auf diesem Gerät‘ unter der Backup-Kachel (in `backupTileHtml()`, jede App hat
  sie); kurze Meldung ‚Du bist offline‘ bzw. ‚Wieder online‘ beim Wechsel und beim Start ohne Netz (4 s, mittig neben der
  Seitenleiste, iPhone über der Backup-Kachel, oberste Ebene). Erkennen über Safari-Ereignisse und Nachrichten des Service
  Workers (`{ netz: '?' | 'pruefe', id }` → `{ netz: 'aus' | 'an', id }`) – **jede App übernimmt das in ihren `sw.js`**
  (Vorbild Reiselogbuch). Komponente 15.20, Prüfung `offline.mjs` F-1 bis F-17. Muster und Fall-Liste:
  `arbeit/A-06 Muster und Fall-Liste.md`.
- **P-39 → Korrektur 4.15.1 · 3.14.1 (P-40 ok):** das iPad als Home-Bildschirm-App meldet den Wechsel nicht (keine
  Ereignisse `offline`/`online`) → die App fragt alle 10 s den Service Worker (`HEAD`), laufende Nummer statt
  `navigator.onLine`. Auswertung `arbeit/P-39 Rückmeldung.md`.
- **Funde für Prüfungen:** `setOffline()` von Playwright sendet immer `offline`/`online` (Gerät verhält sich anders) und
  erreicht in Chromium den Service Worker nicht → Netz am Prüf-Webserver wegnehmen. `elementFromPoint` trifft bei offenem
  Fenster (modal) nichts außerhalb – ‚oberste Ebene‘ über `:popover-open` prüfen.
- **Bekannte Lücke (nicht entschieden):** ist die Liste leer, gibt es keine Backup-Kachel und damit keine graue Zeile – dann
  nur die kurze Meldung.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

**T-84** (Reiselogbuch, Prio 2): iPhone startet beim Neustart in der **Startliste ‚Reiselogbücher‘**, nicht im ersten
offenen Tag einer Reise; iPad bleibt wie es ist. Entschieden: nur Reiselogbuch, keine allgemeine Regel (14.10.2026).
Vorgehen: Apple-Abgleich (Notizen/Erinnerungen am iPhone: Start in der Liste bzw. letzter Ort), Fall-Liste (iPhone
hoch/quer, Neustart vs. Rückkehr aus dem Hintergrund, leere Liste, Wechsel iPad ↔ iPhone), bei Bedarf Muster, dann
fragen: ‚Soll ich Version Reiselogbuch 3.15.0 mit … erstellen? Ja/Nein‘ (AppDesign nur, wenn Gemeinsames betroffen ist).

## 4. Danach

- **T-05, T-06** (Funktionen, Reiselogbuch).
- **A-01** Startseite (später).

## 5. Arbeitsumgebung (für Claude)

- Repos nebeneinander klonen: `/home/user/AppDesign` und `/home/user/ReiseLogBuch` (`add_repo` ReiseLogBuch mit Zugriff
  push; die Sitzung erwartet den Pfad `/home/user/reiselogbuch` – ein Verweis `ln -s ReiseLogBuch reiselogbuch` genügt;
  `register_repo_root` mit `/home/user/reiselogbuch`).
- Tests: im Ordner `ReiseLogBuch/tests` `npm install playwright@1.56.1` (die entstehenden `package.json`/`package-lock.json`
  nicht hochladen – löschen), dann im Repo-Ordner `node tests/alle.mjs` (`--alle`, `--gegenprobe [grundregeln]`,
  `--abdeckung`); einzelne Prüfung in WebKit: `PRUEF_BROWSER=webkit node tests/<datei>.mjs`. AppDesign-Selbsttest
  `node tests/lauf-selbsttest.mjs`. Unter Volllast (8 Browser parallel) kann WebKit einzeln schwanken – einzeln wiederholen.
- Veröffentlichen: Vorbereitungs-Zweige in beiden Repos (`vorbereitung-X.Y.Z`), `node werkzeug/veroeffentlichen.mjs
  vorbereiten --ad X.Y.Z --app reiselogbuch=X.Y.Z` (ohne `--ad`, wenn nur die App), Texte schreiben, committen,
  `node werkzeug/veroeffentlichen.mjs los --app reiselogbuch` (prüft, alle Tests, erst AppDesign, dann die App, wartet auf
  Pages; im Hintergrund starten, dauert ~8 min). Nach Änderungen an `v4/` oder `tests/`: `… fassung`. Danach lokale
  Vorbereitungs-Zweige löschen (sonst meldet der Stop-Hook ‚unpushed‘).
- Zeit und Token am Ende jeder Antwort aus den Sitzungsdaten (`/root/.claude/projects/…/*.jsonl`).

## 6. Ablage auf GitHub (alles auf Branch `main`)

| Was | Repo | Datei |
|---|---|---|
| Diese Übergabe | g811141a/AppDesign | `UEBERGABE.md` |
| Verlauf aller Wünsche und Entscheidungen | g811141a/AppDesign | `VERLAUF.md` |
| A-06 Muster und Fall-Liste, P-39 Auswertung | g811141a/AppDesign | `arbeit/A-06 Muster und Fall-Liste.md`, `arbeit/P-39 Rückmeldung.md` |
| Prüf-Bausteine | g811141a/AppDesign | `tests/pruefe.mjs`, `tests/lauf.mjs`, `tests/offline.mjs`, `tests/README.md` |
| Regeln (Zusammenarbeit, Design) | g811141a/AppDesign | `README - Zusammenarbeit allgemein.md`, `README - Designrichtlinie allgemein.md` |
| Backlog allgemein | g811141a/AppDesign | `BACKLOG.md` |
| App: Backlog, Richtlinie, Funktionsbeschreibung, Prüfliste im CHANGELOG, Tests | g811141a/ReiseLogBuch | `BACKLOG.md`, `README - Designrichtlinie Reiselogbuch.md`, `PROMPT.md`, `CHANGELOG.md`, `tests/alle.mjs` |

In der neuen Sitzung müssen **beide Repos** (AppDesign und ReiseLogBuch) verfügbar sein.

## 7. Starttext für die neue Sitzung

```
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die Zusammenarbeit allgemein und die Designrichtlinien, gib mir das Lagebild und beginne mit T-84 (iPhone startet in der Startliste) – zuerst Apple-Abgleich und Fall-Liste.
```
