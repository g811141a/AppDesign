# Lagebild – Reiselogbuch 0122

**Stand 16.11.2026**

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| Reiselogbuch | **3.56.3**, bindet AppDesign `fassung/4.59.3` ein (Commit c3c9915) | `index.html` (`APP_VERSION`, `AD_NEEDED`) |
| AppDesign | **4.59.3**, letzter Pages-Lauf ‚success‘ (Commit 129c620) | `v4/ui.js` (`AD_VERSION`), GitHub Actions |
| Zusammenarbeit allgemein | **3.14.1** | Datei |
| AppDesign-`CLAUDE.md` | **2.12.0** | Datei |
| ReiseLogBuch-Import (privat) | Commit c747fee (‚1.3.0‘) | `git log` |

## Modell und Aufwand

- **Modell:** Fable 5.2 (`claude-fable-5-2`), eingestellt und tatsächlich gleich (`get_session`: `session_context.model`,
  `last_served_model`; Sitzungsdatei: alle 17 bisherigen Aufrufe); **kein `model_fallback`** in der Sitzungsdatei.
- **Aufwand eingestellt:** hoch (`get_session`: `effort_level` = high).
- **Aufwand tatsächlich:** hoch – alle 17 bisherigen Aufrufe mit `"effort":"high"` (Sitzungsdatei).
- **Umgebungsvariable `CLAUDE_CODE_EFFORT_LEVEL`:** nicht gesetzt (leer).
- `~/.claude/settings.json` = `{}` – **keine Hooks**.

## Nutzungsgrenze

- `get_session` zeigt zu Beginn dieser Sitzung **kein `rate_limit_info`** (in 0121 stand dort am Ende ‚seven_day‘, ‚allowed_warning‘ –
  Quelle: `UEBERGABE.md`). Ob die Warnung noch gilt, weiß ich nicht – Nutzung in Prozent und Rücksetzzeiten zeigt nur die Claude-App.
- Ich halte mich an die Übergabe: **Hilfsagenten nur einzeln nacheinander**, jedes Ergebnis sofort nach `arbeit` sichern.

## Arbeitsumgebung

- ReiseLogBuch (c3c9915) und ReiseLogBuch-Import (c747fee) geklont, Verweise `appdesign`, `reiselogbuch`, `reiselogbuch-import`
  angelegt, alle drei registriert.
- Tests eingerichtet: Playwright 1.56.1, Chromium-Verweise 1194 → 1243 angelegt; Chromium 153.0.8010.12 und WebKit 26.0 starten;
  `lauf-selbsttest`: alles in Ordnung.

## Offene Usertests

Keine (P-106 alles ok – Quelle: `UEBERGABE.md`, Backlog Abschnitt 1 leer).

## Backlog-Spitze

- **Nächste Version AppDesign 4.60.0 / Reiselogbuch 3.57.0: 2 Punkte bereit** – APD-30 (Wischaktionen der Kacheln mit sperrender
  Sprechblase, Prio 1) und APD-133 (Designrichtlinie 13 ‚Neue Fenstergröße vor `resize`‘, nur Text, Prio 2).
- **In Klärung, Prio 1:** APD-135 Konsolidierung 3 über alle Repos – Messung fertig (0121), Lesen und Abgleichen fehlt noch ganz.
- Offen im Backlog danach: APD-134 (läuft mit APD-135) · APD-62 · APD-32 · APD-55 · RLB-6 · APD-1 · APD-70 · APD-57 · APD-44 bis
  APD-60 · zuletzt APD-80.

## Nächster Schritt (nach `UEBERGABE.md` Abschnitt 3)

1. **Befund und Plan zu APD-135 – nur lesen, nichts bauen.** Fünf Aufträge aus `arbeit/APD-135 Befund Aufträge.md` einzeln
   nacheinander: Prüfungen → Bausteine in `ui.js` → Arbeitsregeln → Designregeln → Ablage; jedes Ergebnis sofort als Arbeitsdatei
   sichern und hochladen. Danach die Datei ‚APD-135 Konsolidierung 3 Befund und Plan‘, jeder Punkt einzeln zum Entscheiden.
2. Danach die **Bau-Frage für AppDesign 4.60.0 mit Reiselogbuch 3.57.0** (APD-30, APD-133/V-1; Prüflauf voll).

## Vereinbarung

Muster bis auf Weiteres **nur hell** (Nutzer 30.10.2026).
