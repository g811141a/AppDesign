# Lagebild – Sitzung AppDesign 0008 (v5/, AppDesign 5.0.0)

**27.11.2026** · gelesen: `arbeit/APD-149 Uebergabe.md`, `UEBERGABE.md` (Lagebild), die ganze Zusammenarbeit allgemein 3.19.0, die Überschriften der Designrichtlinie, `arbeit/APD-151 0007 Wortlaut.md`, Backlog bis ‚Erledigt‘.

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| AppDesign | **4.71.0** (`AD_VERSION` in `v4/ui.js`); `main` = `8b0a7ee`, Pages ‚success‘ | Datei, GitHub-API |
| Reiselogbuch | **3.59.1** (`APP_VERSION`, `AD_NEEDED` 4.71.0); `main` = `d1e19d0` | Datei |
| Zusammenarbeit allgemein | 3.19.0 | Datei |
| `CLAUDE.md` AppDesign | 2.14.0 | Datei |

- **Kette Reiselogbuch** läuft parallel. Sie hat 3.59.1 (RLB-128) veröffentlicht, AppDesign blieb unverändert.
- **Vorgabe parallele Ketten** gilt weiter: Die Kette Reiselogbuch schreibt in AppDesign bis `v5/` nur ins Backlog.

## Offene Usertests

- keine.

## Backlog-Spitze AppDesign

- Nächste Version AppDesign (mit `v5/`): **4 Punkte bereit** (APD-149/J-1, APD-152, APD-153, APD-151).
- Für `v5/` laut Übergabe dazu: APD-145 (Namensraum `AD`), die Beans `commands` und `presentation` (APD-149), APD-149/J-5, APD-154. Diese stehen im Backlog noch als ‚offen‘.
- Offen, Priorität 1: APD-135, APD-136, APD-149, APD-148, APD-154.
- Priorität 2: APD-139, APD-141, APD-142, APD-145, APD-150, APD-155, APD-157 · Priorität 3: APD-70, APD-147, APD-156.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`), eingestellt (`session_context.model`) und tatsächlich (`last_served_model`, Sitzungsdatei) gleich. Kein `model_fallback`.
- **Aufwand:** **hoch**, eingestellt (`effort_level`) und tatsächlich (`"effort":"high"` in der Sitzungsdatei) gleich. `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt.
- **Nutzungsgrenze:** seven_day · **allowed_warning**, setzt am 03.12.2026 um 07:00 UTC zurück.
- **Hilfsagenten:** nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Sitzungskette:** `get_session` meldet `lineage` Tiefe **8 von höchstens 8**. Vermutung: Diese Sitzung kann mit `create_session` keine neue mehr starten. Bei der Übergabe öffnest du den neuen Chat selbst und fügst den Starttext ein (2.5).

## Arbeitsumgebung

- **Hooks:** keine. `~/.claude/settings.json` erlaubt nur `create_session`.
- **Repos:** AppDesign und ReiseLogBuch nebeneinander unter `/home/user`, Verweise `appdesign` und `reiselogbuch`, beide registriert.
- **Prüfumgebung:** 4 Kerne, Playwright 1.56.1 im Ordner `ReiseLogBuch/tests` (die `package.json` gelöscht), Verweise Chromium 1194 → 1243. Start getestet: Chromium 158.0.8127.36, WebKit 26.0. `lauf-selbsttest`: alles in Ordnung.
- **Netz:** `github.io` ist gesperrt, den Stand der Pages prüfe ich über die GitHub-API.

## Nächster Schritt

- Nach `arbeit/APD-149 Uebergabe.md` Abschnitt 3: für jeden Punkt von `v5/` prüfen, ob eine freigegebene Testfall-Liste vorliegt (0 Nr. 1).
- Fehlende lege ich dir vor. Bekannt ist schon: Für APD-145 gibt es keine eigene Testfall-Liste, im Backlog steht ‚als Nächstes Wortlaut R-1.14 und Testfall-Liste‘. Bei APD-154 fehlt noch der Wortlaut der Spalte Prüfung von R-8.1.
- Danach die Bau-Frage für AppDesign 5.0.0 (Prüflauf voll), vorher `veroeffentlichen.mjs stufe`.
