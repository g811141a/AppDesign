# Lagebild – Reiselogbuch 0116

**Stand 15.11.2026**

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| Reiselogbuch | **3.56.2**, bindet AppDesign `fassung/4.59.2` ein | `index.html` (`APP_VERSION`) |
| AppDesign | **4.59.2**, letzter Pages-Lauf ‚success‘ (Commit 462b205) | GitHub Actions |
| Zusammenarbeit allgemein | **3.14.0** (auf `main`, kommt mit der nächsten AppDesign-Version in die feste Fassung) | Datei |
| AppDesign-`CLAUDE.md` | 2.12.0 | Datei |

## Modell und Aufwand

- **Modell:** Opus 5.5 (`claude-opus-5-5`), eingestellt und tatsächlich gleich (`get_session`: `session_context.model`, `last_served_model`); **kein `model_fallback`** in der Sitzungsdatei.
- **Aufwand eingestellt:** mittel (`get_session`: `effort_level` = medium).
- **Aufwand tatsächlich:** mittel – alle 8 bisherigen Aufrufe mit `"effort":"medium"` (Sitzungsdatei).
- **Umgebungsvariable `CLAUDE_CODE_EFFORT_LEVEL`: gelöscht** (leer). Eingestellt und tatsächlich stimmen jetzt überein – die Abweichung aus 0115 ist behoben.
- `~/.claude/settings.json` = `{}` – **keine Hooks**.

## Arbeitsumgebung

- ReiseLogBuch geklont (Commit a935023), Verweise `appdesign`, `reiselogbuch` angelegt, beide registriert.
- Tests eingerichtet: Playwright 1.56.1, Chromium-Verweise 1194 → 1243 angelegt; Chromium 153 und WebKit 26.0 starten; `lauf-selbsttest`: alles in Ordnung.

## Offene Usertests

Keine (P-105 alles ok).

## Backlog-Spitze

- **Nächste Version AppDesign 4.59.3 / Reiselogbuch 3.56.3: 1 Punkt bereit** – APD-85 Teil 6 (Wackler WebKit: `langDruecken` statt fester Pause, `ruhe()` meldet; Testfälle APD-85/F-1 bis F-8; nur Prüfungen). Bau-Frage in 0115: ‚Nein‘.
- **Offen:** Wortlaut zum Satz ‚… dauerhaft über die Umgebungsvariable‘ in Zusammenarbeit 2.5 ‚Lagebild‘ – widerspricht APD-130/W-7 (0 Nr. 29).
- Danach: APD-80 · APD-30 übrige Teile · APD-57 · APD-62 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## Vereinbarung

Muster bis auf Weiteres **nur hell** (Nutzer 30.10.2026).

## Womit geht es weiter?

a) **Wortlaut zum Satz in 2.5 ‚Lagebild‘** (Empfohlen) – kleine, offene Regel-Unstimmigkeit, schnell zu klären; danach APD-85 Teil 6.
b) APD-85 Teil 6 bauen (bereit).
c) Ein anderes Thema.
