# Lagebild – Sitzung AppDesign 0007 (APD-151 Rückmeldung vom Gerät)

**27.11.2026** · gelesen: `arbeit/APD-149 Uebergabe.md`, `UEBERGABE.md` (Lagebild), die ganze Zusammenarbeit allgemein 3.19.0, die Überschriften der Designrichtlinie, `arbeit/APD-151 0006 Bericht Muster.md`, `arbeit/APD-151 Testfall-Liste.md`, Backlog bis ‚Weitere Themen‘.

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| AppDesign | **4.71.0** (`AD_VERSION` in `v4/ui.js`); `main` = `afc439b`, Pages ‚success‘ | Datei, GitHub-API |
| Reiselogbuch | **3.59.0** (`APP_VERSION`); `main` = `bce6d49` (Backlog RLB-128) | Datei |
| Zusammenarbeit allgemein | 3.19.0 | Datei |
| `CLAUDE.md` AppDesign | 2.14.0 | Datei |

- **Kette Reiselogbuch** läuft parallel. Laut Übergabe baut 0170 Reiselogbuch 3.59.1 (RLB-128, nur App). Auf `main` ist das noch nicht angekommen.
- **Vorgabe parallele Ketten** gilt weiter: Die Kette Reiselogbuch schreibt in AppDesign bis `v5/` nur ins Backlog.

## Offene Usertests

- keine.
- **Offen ist die Rückmeldung vom Gerät zum Muster APD-151** (Bericht folgt nach deiner Antwort).

## Backlog-Spitze AppDesign

- Nächste Version AppDesign (mit `v5/`): **3 Punkte bereit** (APD-149/J-1, APD-152, APD-153).
- Offen, Priorität 1: APD-135, APD-136, APD-149, APD-148, **APD-151**, APD-154.
- Priorität 2: APD-139, APD-141, APD-142, APD-145, APD-150, APD-155, APD-157 · Priorität 3: APD-70, APD-147, APD-156.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`), eingestellt (`session_context.model`) und tatsächlich (`last_served_model`, Sitzungsdatei) gleich. Kein `model_fallback`.
- **Aufwand:** **hoch**, eingestellt (`effort_level`) und tatsächlich (`"effort":"high"` in der Sitzungsdatei) gleich. `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt.
- **Nutzungsgrenze:** seven_day · **allowed_warning**, setzt am 03.12.2026 um 07:00 UTC zurück.
- **Hilfsagenten:** nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Hinweis Sitzungskette:** `get_session` meldet `lineage` Tiefe 7 von höchstens 8. Vermutung: Die nächste Übergabe kann `create_session` noch einmal starten, danach nicht mehr – dann öffnest du den neuen Chat selbst und fügst den Starttext ein (2.5).

## Arbeitsumgebung

- **Hooks:** keine. `~/.claude/settings.json` erlaubt nur `create_session`.
- **Repos:** AppDesign und ReiseLogBuch nebeneinander unter `/home/user`, Verweise `appdesign` und `reiselogbuch`, beide registriert.
- **Prüfumgebung:** 4 Kerne, Playwright 1.56.1 im Ordner `ReiseLogBuch/tests` (die `package.json` gelöscht), Verweise Chromium 1194 → 1243. Start getestet: Chromium 158.0.8127.36, WebKit 26.0.
- **Netz:** `github.io` ist gesperrt, den Stand der Pages prüfe ich über die GitHub-API.

## Nächster Schritt

- Nach `arbeit/APD-149 Uebergabe.md` Abschnitt 3: den Bericht zum Muster APD-151 vollständig geben, mit Link und den Schritten 0 bis 15.
- Dann deine Rückmeldung vom Gerät erfragen, dazu die Frage zu Aufgefallen Nr. 1 (Fehler ‚Fenster nach dem Schließen der Tastatur bildschirmhoch‘).
- Nach ‚ok‘ vom Gerät der Wortlaut nach 0 Nr. 29 (R-4.6, R-4.5, 15.17, Designrichtlinie 7).
