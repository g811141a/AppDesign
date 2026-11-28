# Lagebild – AppDesign 0011 – Bau v5/ (AppDesign 5.0.0, Reiselogbuch 3.60.0)

**Stand 28.11.2026**

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| Reiselogbuch | **3.59.3** veröffentlicht (`APP_VERSION`, `AD_NEEDED` 4.71.1, lädt `fassung/4.71.1/`); `main` = `182c4ae`, Pages ‚success‘ | `index.html`, GitHub-API |
| AppDesign | **4.71.1** veröffentlicht (`AD_VERSION` in `v4/ui.js`, neueste Fassung `fassung/4.71.1/`); `main` = `c906069`, Pages ‚success‘ | `v4/ui.js`, GitHub-API |
| Zusammenarbeit allgemein | **3.20.0** | Kopf der Datei |
| Designrichtlinie allgemein | 4.71.1 | Kopf der Datei |
| `CLAUDE.md` | AppDesign 2.14.0 · Reiselogbuch 3.10.0 | Kopf der Dateien |

## Offene Usertests

- **Keine.** P-129 ist ok (Nutzer 28.11.2026). Beide Backlogs haben unter ‚1. Auf iPad und iPhone prüfen‘ keinen Eintrag.

## Backlog-Spitze

- **AppDesign – Nächste Version 5.0.0: 7 Punkte bereit:**
  - APD-149/J-1 (Beans im Entwurf im Bean-Katalog),
  - APD-152 (Wiederherstellen behält die Zeitpunkte),
  - APD-153 (Gegenprobe `wischen` und `checkGegenproben`, bringt Zusammenarbeit **3.21.0**),
  - APD-151 (Blatt am iPhone wie am iPad),
  - APD-145 (Namensraum `AD`, `v5/`),
  - APD-149 (Beans `commands`, `presentation`),
  - APD-154 (Drehprüfung kennt ‚beside‘).
- **Offen im Backlog AppDesign** (Prio 1): APD-135, APD-136, APD-149, APD-148. Prio 2: APD-139, APD-141, APD-142, APD-150, APD-155, APD-157. Prio 3: APD-70, APD-147, APD-156.
- **Reiselogbuch:** keine Punkte bereit; offen RLB-6 (Prio 3).

## Bau-Frage

- Das **Ja** zum Bau liegt vor: AppDesign 5.0.0 mit Reiselogbuch 3.60.0, Prüflauf voll (Nutzer 27.11.2026, Sitzung AppDesign 0008, `arbeit/APD-149 0008 Bau-Frage.md`).
- Vorgehen nach `arbeit/APD-149 Uebergabe.md` Abschnitt 3. Zuerst wird `v5/` als Kopie von `v4/` (Stand 4.71.1) angelegt. Dann werden Skript und Selbsttest auf `v5/` umgestellt. Danach folgt `vorbereiten --ad 5.0.0 --app reiselogbuch=3.60.0`.

## Modell, Aufwand, Umgebung

- **Modell:** Opus 5.5 (`claude-opus-5-5`), eingestellt und tatsächlich gleich (`get_session`: `session_context.model`, `last_served_model`). In der Sitzungsdatei gibt es keinen Eintrag `model_fallback`.
- **Aufwand:** hoch – eingestellt (`effort_level`) und tatsächlich gleich (alle Modell-Aufrufe in der Sitzungsdatei `"effort":"high"`). `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt.
- **Hilfsagenten:** nur Opus 5.5 mit Aufwand hoch, einzeln nacheinander; Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** 7 Tage, ‚allowed_warning‘, setzt am 03.12.2026 um 07:00 UTC zurück.
- **Sitzungskette:** `lineage` Tiefe 2 von 8.
- **Hooks:** keine. `~/.claude/settings.json` und `AppDesign/.claude/settings.json` erlauben nur `create_session`.
- **Prüfumgebung:** 4 Kerne, Playwright 1.56.1, Chromium 158.0.8127.36 (Verweise 1194 → 1243), WebKit 26.0 (Build 2215). Beide Browser starten, `lauf-selbsttest` ist grün.
- **Repos:** AppDesign (HEAD lose auf `c906069`) und ReiseLogBuch (`182c4ae`) liegen unter `/home/user`, dazu die kleingeschriebenen Verweise.

## Nächster Schritt

- Bau `v5/` (AppDesign 5.0.0, Reiselogbuch 3.60.0) mit Zusammenarbeit 3.21.0 (APD-153).
- Danach der Bericht mit Usertest **P-130** (0 Nr. 11).
- Der Bau ist groß. Bei ‚⚠ Übergabe fällig‘ übergebe ich erst nach dem laufenden Schritt, nie mitten im Prüflauf (0 Nr. 13).
