# Lagebild – Reiselogbuch 0161

**26.11.2026** · Auftrag: Korrekturversion AppDesign 4.70.1 / Reiselogbuch 3.58.4 (P-123/F-1 bis P-123/F-3)

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.58.3** veröffentlicht (`APP_VERSION`); Korrektur **3.58.4** liegt im Zweig `arbeit-0160` (cee905e), nicht gebaut |
| AppDesign | **4.70.0** veröffentlicht (`AD_VERSION`); Korrektur **4.70.1** liegt im Zweig `arbeit-0160` (b5293ab), nicht gebaut |
| ReiseLogBuch-Import (privat) | **1.4.0** (PROMPT.md), unverändert |
| Zusammenarbeit allgemein | **3.19.0** |
| `CLAUDE.md` | AppDesign 2.14.0 · Reiselogbuch 3.10.0 · Import 1.2.0 |

## Offene Usertests

- **P-123** (Reiselogbuch 3.58.3 / AppDesign 4.70.0): **nicht ok** – P-123/F-1 (Hinweisfenster über der Vorschau am iPad schmal), P-123/F-2 (am iPhone verschieden hoch), P-123/F-3 (Backup abgebrochen: keine Meldung; vom Nutzer als erledigt betrachtet, Korrektur bleibt). Alle übrigen Punkte ok.
- **P-122** (Reiselogbuch 3.58.2 / AppDesign 4.69.0): nicht ok, ersetzt durch P-123.
- Beide werden mit der Korrektur 4.70.1 / 3.58.4 durch den neuen Usertest **P-124** abgelöst.

## Backlog-Spitze

- Reiselogbuch ‚0.‘: P-123/F-1, P-123/F-2, P-123/F-3 (Priorität 1) – Korrektur vorbereitet.
- AppDesign ‚0.‘: leer. Offen Priorität 1: APD-135 (Konsolidierung 3), APD-136 (AD-Beans), APD-148 (AD-Bean `backup`); Priorität 2: APD-139, APD-141, APD-142, APD-145, APD-147.
- Reiselogbuch offen: RLB-126 (‚Zuletzt gelöscht‘, Priorität 3), RLB-6.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`) – eingestellt (`session_context.model`) und tatsächlich (`last_served_model`, Sitzungsdatei); **kein** `model_fallback`.
- **Aufwand:** **mittel** – eingestellt (`effort_level`) und tatsächlich (alle Aufrufe `"effort":"medium"`); `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** five_hour · allowed, zurückgesetzt 26.11.2026, 14:20; keine Mehrnutzung.

## Umgebung

- Repos: AppDesign (main, f7eea08), ReiseLogBuch (ac7cefd), ReiseLogBuch-Import (2ec7d03) geklont, Verweise kleingeschrieben, registriert.
- Tests: Playwright 1.56.1 im Ordner `ReiseLogBuch/tests` (package-Dateien gelöscht); Chromium 158 (Ordner 1243, Verweise 1194 → 1243) und WebKit 26.0 (Ordner 2215) starten. 4 Kerne.
- **Hooks:** keine – `~/.claude/settings.json` enthält nur die Regel `create_session` erlauben.

## Nächster Schritt (UEBERGABE Abschnitt 3)

1. Zweige `arbeit-0160` holen, `vorbereiten --ad 4.70.1 --app reiselogbuch=3.58.4`.
2. Korrektur einspielen (AppDesign `v4/ui.js`; ReiseLogBuch `index.html` und 3 Prüfdateien, Fassungs-Pfad 4.70.1), Wortlaut Designrichtlinie 10 und 7 eintragen (am 23.11.2026 bestätigt), CHANGELOG mit Testfällen P-124, Backlog, Versionsgeschichten, `fassung`, `stufe`.
3. Bau-Frage (Prüflauf Stufe voll erwartet).
