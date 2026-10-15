# Übergabe an die nächste Sitzung

**Stand 15.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0004 – A-05 Version B‘
(Zusammenarbeit allgemein 2.3.2, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | 3.13.2 | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign (ui.js, design.css, tests; feste Fassung `fassung/4.14.2/`) | 4.14.2 | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Designrichtlinie allgemein | 4.14.2 (Regelkatalog R-1.1 bis R-10.4, 35 Regeln in 10 Themen) | `README - Designrichtlinie allgemein.md` |
| Designrichtlinie Reiselogbuch | 3.13.2 | im Repo ReiseLogBuch |
| Zusammenarbeit allgemein | 2.3.2 (Abschnitt 0 = Arbeitsprozess 2.0, hat Vorrang) | `README - Zusammenarbeit allgemein.md` |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0005** (Zusammenarbeit 0 Nr. 13); die danach 0006.
- **Offene Prüfpunkte:** keine – P-38 erledigt (alles in Ordnung, 15.10.2026).
- **Nächste Version:** nichts bereit.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse

**Sitzung ‚Reiselogbuch 0004 – A-05 Version B‘ – A-05 abgeschlossen:**
- **Feste Fassung (AppDesign 4.14.0 · Reiselogbuch 3.13.0):** jede AppDesign-Version unveränderlich in `fassung/X.Y.Z/`
  (`design.css`, `ui.js`, `tests/`, seit 4.14.1 auch Designrichtlinie und Zusammenarbeit; Prüfsummen `fassung/PRUEFSUMMEN`);
  die App lädt und prüft genau ihre Fassung, Heben nur nach Rückfrage; `v4/` = Arbeitsstand = neueste Fassung; W-4 nachgeführt.
- **Veröffentlichungs-Skript** `werkzeug/veroeffentlichen.mjs` (`vorbereiten`, `fassung`, `los`) mit Selbsttest (20 Fälle);
  alle drei Versionen dieser Sitzung damit veröffentlicht.
- **Funde:** Git-Tags (Markierungen) lassen sich aus der Cloud nicht hochladen (HTTP 403) → Richtlinien-Text in der Fassung
  (4.14.1, Entscheidung a). `ruhe()` misst erst nach einem echten Bildwechsel (Volllast in WebKit).
- **P-37 → Korrektur 4.14.2 · 3.13.2 (P-38 ok):** Schrittkopf-Schaltflächen als Gruppe (R-5.1 ergänzt, allgemeine Regel);
  Offline-Start mit Frist 3 s (neue Regel R-1.5, Prüfung `offline.mjs` mit echtem Service Worker – iPad zeigte offline eine
  weiße Seite, nachgebaut bei hängendem Netz). Auswertung `arbeit/P-37 Rückmeldung.md`.
- **Entschieden (15.10.2026 bzw. 14.10.2026):** Offline-Hinweis als allgemeine Regel, Prio 1 (A-06).

Frühere Sitzungen: siehe `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

**A-06 Offline-Hinweis** (Sitzung ‚Reiselogbuch 0005 – A-06 Offline-Hinweis‘, Prio 1, allgemeine Regel – Ergänzung von
R-1.5): Arbeitet die App offline, sieht man es – Wunsch des Nutzers: ein kurzer Hinweis oder eine kleine, gut sichtbare
Dauer-Anzeige, z. B. ganz unten. Vorgehen:
1. Apple-Abgleich (So macht es Apple: Musik – Band oben ‚Du bist offline‘; Mail – Zustand klein in der unteren Leiste der
   Liste; Notizen – nichts), HIG-Checkliste und Regelkatalog (R-1.5, R-2.1 Leisten stehen fest, R-1.1 iPad = iPhone).
2. **Muster mit Varianten** (zuerst hell und quer, als Bilder vor dem Auswahlfenster): a) graue Zeile ganz unten in
   Seitenleiste bzw. Startliste, b) Band oben, c) a + kurze Meldung beim Wechsel offline/online.
3. Fall-Liste (iPad/iPhone × quer/hoch × hell/dunkel × Wechsel online ↔ offline, Start ohne Netz, hängendes Netz) – die
   Prüfung `offline.mjs` kann Netz ‚aus‘ und ‚hängt‘ schon nachbilden.
4. Baustein in AppDesign (`ui.js`/`design.css`), dann fragen: ‚Soll ich Version AppDesign 4.15.0 / Reiselogbuch 3.14.0 mit
   … erstellen? Ja/Nein‘.

## 4. Danach

- **T-84** (Prio 2): iPhone startet in der Startliste – zuerst Fall-Liste.
- **T-05, T-06** (Funktionen).

## 5. Arbeitsumgebung (für Claude)

- Repos nebeneinander klonen: `/home/user/AppDesign` und `/home/user/ReiseLogBuch` (`add_repo` ReiseLogBuch mit Zugriff
  push; die Sitzung erwartet den Pfad `/home/user/reiselogbuch` – ein Verweis `ln -s ReiseLogBuch reiselogbuch` genügt).
- Tests: im Ordner `ReiseLogBuch/tests` `npm install playwright@1.56.1` (die entstehenden `package.json`/`package-lock.json`
  nicht hochladen – löschen), dann im Repo-Ordner `node tests/alle.mjs` (`--alle`, `--browser chromium`, `--gegenprobe
  [grundregeln]`, `--abdeckung`); AppDesign-Selbsttest `node tests/lauf-selbsttest.mjs`.
- Veröffentlichen (seit 4.14.0): Vorbereitungs-Zweige in beiden Repos, `node werkzeug/veroeffentlichen.mjs vorbereiten --ad X.Y.Z
  --app reiselogbuch=X.Y.Z`, Texte schreiben, committen, `node werkzeug/veroeffentlichen.mjs los` (prüft, alle Tests, erst
  AppDesign, dann die App, wartet über `gh api …/actions/runs?head_sha=` auf Pages; `github.io` ist gesperrt).
  Nach Änderungen an `v4/` oder `tests/`: `… fassung`. Selbsttest `node werkzeug/veroeffentlichen-selbsttest.mjs`.
  Git-Markierungen (Tags) lassen sich aus der Cloud nicht hochladen (HTTP 403) – deshalb steht seit 4.14.1 der Richtlinien-Text
  in der Fassung.
- Zeit und Token am Ende jeder Antwort aus den Sitzungsdaten (`/root/.claude/projects/…/*.jsonl`).

## 6. Ablage auf GitHub (alles auf Branch `main`)

| Was | Repo | Datei |
|---|---|---|
| Diese Übergabe | g811141a/AppDesign | `UEBERGABE.md` |
| Verlauf aller Wünsche und Entscheidungen | g811141a/AppDesign | `VERLAUF.md` |
| A-05 Fall-Liste (erledigt) und Funde | g811141a/AppDesign | `arbeit/A-05 Fall-Liste.md`, `arbeit/A-05 Fund Markierung.md`, `arbeit/P-37 Rückmeldung.md` |
| A-05 Fund R-3.1 | g811141a/AppDesign | `arbeit/A-05 Fund R-3.1 Quartier-Link.md` |
| Prüf-Bausteine | g811141a/AppDesign | `tests/pruefe.mjs`, `tests/lauf.mjs`, `tests/README.md` |
| Regeln (Zusammenarbeit, Design) | g811141a/AppDesign | `README - Zusammenarbeit allgemein.md`, `README - Designrichtlinie allgemein.md` |
| Backlog allgemein | g811141a/AppDesign | `BACKLOG.md` |
| App: Backlog, Richtlinie, Funktionsbeschreibung, Prüfliste im CHANGELOG, Tests | g811141a/ReiseLogBuch | `BACKLOG.md`, `README - Designrichtlinie Reiselogbuch.md`, `PROMPT.md`, `CHANGELOG.md`, `tests/alle.mjs` |

In der neuen Sitzung müssen **beide Repos** (AppDesign und ReiseLogBuch) verfügbar sein.

## 7. Starttext für die neue Sitzung

```
Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die Zusammenarbeit allgemein und die Designrichtlinien, gib mir das Lagebild und beginne mit A-06 Offline-Hinweis – zuerst Apple-Abgleich und Muster mit Varianten.
```
