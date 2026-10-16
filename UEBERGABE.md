# Übergabe an die nächste Sitzung

**Stand 16.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0007 – T-05 Alte Reiselogbücher‘
(Zusammenarbeit allgemein 2.6.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | 3.15.1 (unverändert) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign (ui.js, design.css, tests; feste Fassung `fassung/4.16.1/`) | 4.16.1 (unverändert) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| **ReiseLogBuch-Import (neu, privat)** | 1.2.1 | g811141a/ReiseLogBuch-Import – `README.md`, `PROMPT.md`, `CLAUDE.md`, `ERKENNTNISSE.md`, `werkzeug/pruefen.mjs` |
| Designrichtlinie allgemein | 4.16.1 (R-1.1 bis R-10.4) | `README - Designrichtlinie allgemein.md` |
| Designrichtlinie Reiselogbuch | 3.15.1 | im Repo ReiseLogBuch |
| Zusammenarbeit allgemein | **2.6.0** (neu: 0 Nr. 19 Startfrage) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0008** (Zusammenarbeit 0 Nr. 13); die danach 0009.
- **Offene Prüfpunkte:** **T-05** – der Nutzer lädt die Import-Datei ‚Ω Import Reiselogbuch 2026.10.16 19.52.json‘ (aus dem
  Chat der Sitzung 0007) mit ‚Backup laden‘ → ‚Abgleichen‘. Erwartet: die Reise steht unter ‚Hinzugefügt‘; Stichprobe 23.09.
  (vier Punkte mit ▫️), 14./15.10. (ergänzte ▫️), Fazit mit Smileys, ab 16.10. kein Wetter. Zuerst nach dem Ergebnis fragen.
- **Nächste Version:** AppDesign – **A-12** bereit (Werkzeug `messung.mjs` für die Zeile Zeit und Token, Prio 1). Bis dahin
  Zeit und Token am Ende jeder Antwort von Hand aus den Sitzungsdaten messen – nie schätzen, nie weglassen.
- **Neu im Backlog:** **A-13** (AppDesign, Prio 2, allgemeine Regel): nach dem Schließen des Fensters ‚Tag‘ steht die Zeile
  des bearbeiteten Tages ganz oben – zu klären (Fall-Liste, Abgrenzung R-7.1, letzte Tage, iPhone).
- **Sitzungsgröße:** unsere Grenze bleibt **etwa 300.000 Token** (0007 endete bei etwa 330.000).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0007 – T-05 Alte Reiselogbücher‘ – T-05 Werkzeug fertig, erste Konvertierung erledigt:**
- **Weg:** Kein Umbau der App. Claude macht aus einer alten Unterlage eine Datei im Backup-Format (nur die alten Reisen,
  feste Kennung `import-<Beginn>-<titel>`, Zeitpunkte). Der Nutzer lädt sie mit ‚Backup laden‘ → **‚Abgleichen‘**.
- **Privates Repo `ReiseLogBuch-Import`:** Anleitung `PROMPT.md` (N-1 bis N-15, E-1 bis E-11), `CLAUDE.md` mit Startfrage,
  `ERKENNTNISSE.md` (K-1 bis K-12, ohne Daten), Prüfwerkzeug `werkzeug/pruefen.mjs`: F-1 bis F-22 in der echten App,
  Chromium und WebKit, hell und dunkel; Apps unverändert (N-2); Datenschutz-Sperre (F-18); Selbsttest mit Gegenprobe.
  Anforderungen und Fall-Liste: AppDesign `arbeit/T-05 Anforderungen.md`, `arbeit/T-05 Fall-Liste.md`.
- **Wichtigste Regeln:** Daten nie in ein Repo. Apps bei einer Konvertierung nie ändern. Format jedes Mal frisch aus
  `ReiseLogBuch/index.html` lesen. Kachelfragen bei Unklarem und bei fehlenden Pflichtangaben (Titel, Teilnehmer,
  Zeitraum, Reisemittel), Bestätigung vor der Ausgabe. Grammatik in Verlauf, Wie war was? und Fazit verbessern.
  Verlauf mit ▫️. Fazit mit Smileys. Kein Wetter ab heute. Uhrzeit in der Ortszeit des Nutzers (Kachelfrage).
  Konvertierungsprotokoll.
- **Fund K-12:** Löscht der Nutzer eine Reise mit derselben Kennung, **nachdem** die Datei erstellt wurde, gewinnt beim
  Abgleichen die Löschung (‚bleibt gelöscht‘) → Datei neu erstellen.
- **Zusammenarbeit 2.6.0:** 0 Nr. 19 **Startfrage** – Sitzung ohne Auftrag beginnt mit dem Auswahlfenster ‚Was möchtest
  du als Nächstes tun?‘ je angehängtem Repo (CLAUDE.md AppDesign 2.3.0, Reiselogbuch 3.4.0, Import 1.0.0).
- **Fehler in 0007:** ReiseLogBuch-Import 1.0.0 wurde hochgeladen, obwohl der Selbsttest rot war (Ergebnis nicht
  ausgewertet) → Korrektur 1.0.1. Lehre: Ergebnis jeder Prüfung vor dem Hochladen lesen.

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. Ergebnis der Prüfung T-05 erfragen (Import-Datei geladen?). Bei Fehler: Konvertierung im Import-Repo nach `PROMPT.md`
   korrigieren (das Original hängt der Nutzer erneut an – es liegt nirgends gespeichert).
2. Weitere alte Reiselogbücher konvertieren, sobald der Nutzer sie anhängt (Startfrage → ‚Reiselogbücher konvertieren‘).
3. A-12 (bereit, Prio 1) bauen – erst nach ‚Ja‘.
4. A-13 klären (Apple-Abgleich, Fall-Liste, Muster).

## 4. Danach

- **T-06** (Ausschreibungstexte in Reiselogbücher umwandeln, Prio 3) – kann das Import-Repo mitnutzen.
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
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md und gezielt die Regeln (Zusammenarbeit 0 Nr. 15), gib mir das Lagebild und frag mich zuerst nach dem Ergebnis der Prüfung T-05 (Import-Datei geladen?) – danach Startfrage (0 Nr. 19).
```
