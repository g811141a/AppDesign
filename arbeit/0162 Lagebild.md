# Lagebild – Reiselogbuch 0162

**26.11.2026** · Auftrag: Korrektur P-124/F-1 und P-124/F-2 (AppDesign 4.70.2 / Reiselogbuch 3.58.5)

## Versionen (auf `main`)

| Teil | Version | Stand |
|---|---|---|
| Reiselogbuch | **3.58.4** (`APP_VERSION`, `AD_NEEDED` 4.70.1) | `main` 2a2cf09, Pages success |
| AppDesign | **4.70.1** (`AD_VERSION`) | `main` d8562b7, Pages success |
| ReiseLogBuch-Import | 1.4.0 laut Übergabe | `main` 2ec7d03 |
| Zusammenarbeit allgemein | 3.19.0 | |

## Offene Usertests

- **P-124** (Reiselogbuch 3.58.4 / AppDesign 4.70.1): **nicht ok** zu /1 – alle übrigen Punkte ok.
  - **P-124/F-1:** Hinweisfenster ‚Ausgabe V…‘ über der Vorschau nutzt die mögliche Breite nicht, langer Dateiname bricht um; am iPad quer offenbar gleich breit wie hoch (AD-Bean `alert`).
  - **P-124/F-2:** nach Sichern aus der Vorschau und Verlassen der Vorschau ist Teilen (Kopfzeile) noch hellblau (`outputSource`, AD-Bean `sourcehighlight`).
- P-123 und P-122: nicht ok, ihre Fehler sind über P-124 weitergeführt.

## Backlog-Spitze

- Reiselogbuch ‚0.‘: P-124/F-1, P-124/F-2 (Prio 1, offen) – 0 Punkte bereit.
- AppDesign ‚0.‘: leer. Danach laut Übergabe: Usertest P-125 · APD-145 (5.0.0, `v5/`) · APD-148 `backup` · APD-135/B-3.3 Schritt 3 · APD-142 · RLB-126 · APD-139 · APD-141 · **APD-147 zuletzt**.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 – eingestellt (`session_context.model`) und tatsächlich (`last_served_model`) `claude-opus-5-5`; kein `model_fallback` in der Sitzungsdatei.
- **Aufwand:** eingestellt **hoch** (`effort_level` high); tatsächlich hoch (alle 17 Modell-Aufrufe `"effort":"high"`); `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** five_hour · allowed, zurückgesetzt 26.11.2026, 14:20 MEZ.

## Arbeitsumgebung

- Repos geklont (ReiseLogBuch, ReiseLogBuch-Import), kleingeschriebene Verweise angelegt, alle drei registriert.
- Tests: Playwright 1.56.1 in `ReiseLogBuch/tests` (package-Dateien gelöscht); Chromium 158 (Ordner 1243, Verweise 1194 → 1243), WebKit Ordner 2215; 4 Kerne.
- **Hooks:** keine – `~/.claude/settings.json` enthält nur die Regel `create_session` erlauben.

## Nächster Schritt (Übergabe Abschnitt 3)

1. P-124/F-1 und P-124/F-2 genau als Ablauf des Nutzers in `ReiseLogBuch/tests/ablauf-p120.mjs` nachbauen – rot gegen 3.58.4 in Chromium und WebKit; klären, warum Teil P-123/F-1 grün war.
2. Dieselbe Lücke überall suchen (Tönung `sourcehighlight` nach dem Ergebnis im Hinweisfenster).
3. Ursachen, Apple-Abgleich, Vorschlag mit Testfall-Liste und Entwurf Usertest P-125 – gebaut wird erst nach ‚Ja‘.
