# Lagebild – Reiselogbuch 0153

**Stand 22.11.2026** · Sitzung ‚Reiselogbuch 0153 – RLB-125 fertig bauen (Kontextmenü iPhone quer)‘

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.12** veröffentlicht (`main` 3e3715a); **3.58.0 im Bau** auf `vorbereitung-3.58.0` |
| AppDesign | **4.67.2** veröffentlicht (`main`); **4.68.0 im Bau** auf `vorbereitung-4.68.0` |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03), unverändert |
| Zusammenarbeit allgemein | **3.19.0** |
| `CLAUDE.md` | AppDesign **2.14.0** |

## Offene Usertests

Keiner (P-119 ok). P-120 kommt mit Reiselogbuch 3.58.0.

## Backlog-Spitze

- **Reiselogbuch, 0. Nächste Version:** RLB-125 (Reiselogbuch sperren) – Bau-Frage mit Ja aus 0152, gebaut bis auf das rote
  `kontextmenue-regeln (iPhone)` (iPhone quer: Kontextmenü passt weder unter noch über die Kachel, R-4.2).
- **AppDesign, 0. Nächste Version:** keine Punkte; danach APD-135/B-3.3 Schritt 2, dann APD-145 (AppDesign 5.0.0).
- Offen: APD-135, APD-136, APD-139, APD-141, APD-142, APD-145, APD-70 · RLB-126, RLB-6.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`get_session`: eingestellt `claude-opus-5-5`, zuletzt bedient `claude-opus-5-5`; Sitzungsdatei: alle
  Modell-Aufrufe `claude-opus-5-5`, kein `model_fallback`).
- **Aufwand:** hoch – eingestellt `high`, tatsächlich `high` in allen Modell-Aufrufen; `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** Sieben-Tage-Grenze **‚allowed_warning‘** (Warnstufe, keine Überziehung), zurückgesetzt 26.11.2026, 8:00.
  Der Bau mit vollem Prüflauf (~75 min) kann die Grenze belasten.

## Umgebung

- Repos geklont: ReiseLogBuch, ReiseLogBuch-Import (Verweise kleingeschrieben, `register_repo_root`).
- Tests eingerichtet: Playwright 1.56.1 in `ReiseLogBuch/tests`; Chromium 1243 (Verweise 1194 → 1243), WebKit 2215; 4 Kerne.
- **Hooks:** `~/.claude/settings.json` leer (`{}`).

## Nächster Schritt (UEBERGABE 3)

1. Auf `vorbereitung-4.68.0` und `vorbereitung-3.58.0` wechseln, `arbeit/0152 RLB-125 Stand Bau.md` lesen.
2. Kontextmenü iPhone quer klären: Lage von Kachel, Menü und Fuß und Rollstand vor und nach dem Öffnen messen. Ist es ein Fehler
   in `ui.js`: beheben (R-4.2 bleibt). Fehlt der Platz: Vorschlag mit Wortlaut und Muster, dann Rückfrage.
3. Die fünf angepassten Prüfungen und `kontextmenue-regeln` laufen lassen, `fassung`, `stufe`, `los` (voll), Bericht mit P-120.
