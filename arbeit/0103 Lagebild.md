# Lagebild – Reiselogbuch 0103

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0103 – APD-116 und Bau-Frage 4.57.0‘

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.54.0** veröffentlicht (Fassung 4.56.0) |
| AppDesign | **4.56.0** veröffentlicht |
| Zusammenarbeit allgemein | **3.10.0** (3.11.0 mit APD-125 bestätigt, kommt mit 4.57.0) |
| AppDesign-`CLAUDE.md` | **2.11.0** |

## Umgebung

- **Modell:** Opus 5.5 (`get_session`: `claude-opus-5-5`, auch `last_served_model`); kein `model_fallback` in der Sitzungsdatei.
- **Aufwand:** hoch – `CLAUDE_CODE_EFFORT_LEVEL=high`, alle 15 Modell-Aufrufe in der Sitzungsdatei mit `"effort":"high"`.
- **Hooks:** `~/.claude/settings.json` = `{}` – keine Hooks.
- **Repos:** AppDesign und ReiseLogBuch auf `main`, Verweise klein angelegt.
- **Tests eingerichtet:** Playwright 1.56.1, Chromium-Verweise 1194 → 1243; Probe `version-regeln` in Chromium und WebKit grün, `lauf-selbsttest` grün.

## Offene Usertests

- **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – ok bis auf **P-100/1** (→ RLB-123, kommt mit 3.55.0); P-100/2 Schritt 3 ohne Änderung erledigt.

## Backlog-Spitze

- **AppDesign ‚0. Nächste Version 4.57.0‘: 4 Punkte bereit** – APD-125 (Datei vor jeder Kachel), APD-126 (Cursor am Ende, leer einzeilig), APD-127 (Gleitbewegungen), APD-124 (Rückgängig nach dem Leeren).
- **Reiselogbuch ‚0. Nächste Version 3.55.0‘: 1 Punkt bereit** – RLB-123 (Verlauf: Vorschläge über dem Feld).
- **In Klärung:** APD-116 (Prio 2, Dateiname nicht mitten im Wort umbrechen) – Muster iPad quer und iPhone hoch ok.
- **Testfall-Liste 4.57.0 / 3.55.0 bestätigt** (`arbeit/4.57.0 Testfall-Liste.md`).
- **Bau-Freigabe:** keine gültige – in 0102 ‚Nein‘ (Nutzer 08.11.2026).

## Plan dieser Sitzung (UEBERGABE.md Abschnitt 3)

1. **APD-116 fertig klären:** ‚Als allgemeine Regel festhalten?‘ (Empfehlung ja), Wortlaut alt/neu, Muster iPad hoch und iPhone quer, Testfälle.
2. **Bau-Frage neu stellen:** AppDesign 4.57.0 / Reiselogbuch 3.55.0 mit APD-125, APD-126, RLB-123, APD-124, APD-127 (+ APD-116, wenn bereit).

## Vereinbarungen

- Muster bis auf Weiteres **nur hell** (Nutzer 30.10.2026).
- Erinnerung ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
