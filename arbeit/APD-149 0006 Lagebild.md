# Lagebild – Sitzung AppDesign 0006 (APD-151 Muster Fenster am iPhone wie am iPad)

**27.11.2026**

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | 3.59.0 (`APP_VERSION` in `index.html`) |
| AppDesign | 4.71.0 (`AD_VERSION` in `v4/ui.js`); Pages-Lauf zu `ae7ad06` ‚success‘ |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- Auf `main` seit 4.71.0 nur `arbeit/`, `BACKLOG.md` und ein Kommentar im Entwurf; neuester Commit `ae7ad06` (AppDesign 0005).
- **Parallel:** Die Kette Reiselogbuch (0169) schreibt bis `v5/` in AppDesign nur ins Backlog.

## Modell, Aufwand, Grenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`), eingestellt und tatsächlich gleich; kein `model_fallback` in der Sitzungsdatei.
- **Aufwand:** hoch, eingestellt (`get_session`) und tatsächlich (`"effort":"high"` in allen Aufrufen) gleich. `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt.
- **Nutzungsgrenze:** five_hour · **allowed_warning**, setzt am 27.11.2026 um 19:20 UTC zurück.
- **Hooks:** keine (`~/.claude/settings.json` erlaubt nur `create_session`).
- Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 nicht.

## Prüfumgebung

- 4 Kerne · Chromium 158.0.8127.36 (Verweise 1194 → 1243) · WebKit 26.0 · Playwright 1.56.1 im Ordner `ReiseLogBuch/tests`.
- ReiseLogBuch geklont (`052f5db`), Verweise `appdesign` und `reiselogbuch` angelegt.

## Offene Usertests

- keine.

## Backlog-Spitze

- **Nächste Version AppDesign (mit `v5/`):** 3 Punkte bereit (APD-149/J-1, APD-152, APD-153).
- **Offen, Priorität 1:** APD-135, APD-136, APD-148, APD-149, APD-151, APD-154.
- **Priorität 2:** APD-139, APD-141, APD-142, APD-145, APD-150, APD-155, APD-157.
- **Priorität 3:** APD-70, APD-147, APD-156 und ältere.

## Nächster Schritt (Übergabe APD-149 Abschnitt 3)

1. **Muster APD-151 ‚Fenster am iPhone wie am iPad‘** im Entwurf `katalog/entwurf/presentation-commands.js`:
   - Weiche um `isPhone()` für die Fenster der Vorführung (`placeDialogs`, `blattOben`, `blattBild`, `blattZu`, `blattDunkel`), eigene CSS-Klasse mit den iPad-Werten, Antippen der Abdunkelung schließt nicht. `v4/` bleibt unverändert.
   - Feste Prüfungen APD-151/M-1 bis M-18 in `arbeit/APD-149/muster-pruefen.mjs`, Chromium und WebKit, Gegenprobe `__adPresentationGegenprobe = 'blatt'`; dazu `tests/katalog.mjs` und `bean-katalog` grün.
2. Danach **Ausprobieren am Gerät** mit Bericht (vollständiger Link, Schritte mit ‚Erwartet‘).
3. Nach ‚ok‘ vom Gerät der Wortlaut für R-4.6, 15.17 und Designrichtlinie 7 (0 Nr. 29).
