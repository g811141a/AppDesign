# Lagebild – Reiselogbuch 0156

**Stand 22.11.2026** · Auftrag: P-121 Korrekturen bauen

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.58.1** veröffentlicht (`main` 870a41b) · Arbeitszweig `claude/p121-korrekturen` (cfae69c auf GitHub): P-121/F-1 und P-121/F-2, nicht gebaut |
| AppDesign | **4.68.1** veröffentlicht (`main` 0146d6d, danach nur die Übergabe 81cfa0c) |
| ReiseLogBuch-Import | **1.4.0** (`main` 2ec7d03) |
| Zusammenarbeit allgemein | **3.19.0** |
| `CLAUDE.md` | AppDesign 2.14.0 |

## Offene Usertests

- **P-121** (Reiselogbuch 3.58.1, AppDesign 4.68.1) – **nicht ok** bei /5 und /8 (Nutzer 22.11.2026), alle übrigen Punkte ok:
  - **P-121/F-1** (zu /5): Sperren mit offenen Tagen weiter unten → Vorschau stand danach am Ende statt am Anfang.
  - **P-121/F-2** (zu /8): PDF bzw. Teilen aus der Vorschau schloss die Vorschau, die Meldung stand allein.
  - Beide laut Übergabe im Arbeitszweig behoben; feste Prüfung `ablauf-p120` (Teile P-121/F-1 und F-2) rot gegen 3.58.1, grün mit dem Zweig.

## Backlog-Spitze

- **Reiselogbuch, Nächste Version:** 0 Punkte bereit (die Korrekturen P-121/F-1 und F-2 werden als Korrekturversion 3.58.2 gebaut, 0 Nr. 8).
- **Reiselogbuch, Prüfen:** P-121.
- **AppDesign:** nichts in ‚Nächste Version‘.
- Danach: APD-135/B-3.3 Schritt 2 · APD-145 · APD-142 · RLB-126 · APD-139 · APD-141.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`get_session`: eingestellt `claude-opus-5-5`, zuletzt bedient `claude-opus-5-5`; Sitzungsdatei: alle Aufrufe
  `claude-opus-5-5`, **kein** `model_fallback`).
- **Aufwand:** eingestellt **hoch** (`effort_level: high`), tatsächlich **hoch** (Modell-Aufrufe `"effort":"high"`);
  `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** Sieben-Tage-Grenze **‚allowed_warning‘** (zurückgesetzt 26.11.2026, 8:00) – sparsam arbeiten; ein voller Prüflauf
  dauert laut CLAUDE.md rund 75 min.

## Umgebung

- Repos unter `/home/user` geklont, Verweise klein angelegt, alle drei registriert.
- Tests eingerichtet: Playwright 1.56.1 in `ReiseLogBuch/tests` (`package.json` und `package-lock.json` gelöscht), Chromium-Verweise
  1194 → 1243, WebKit 2215; 4 Kerne.
- **Hooks:** keine – `~/.claude/settings.json` enthält nur die Erlaubnis für `create_session`.

## Nächster Schritt (UEBERGABE Abschnitt 3)

1. Arbeitszweig `claude/p121-korrekturen` im ReiseLogBuch holen.
2. Bericht über P-121/F-1 und P-121/F-2 (0 Nr. 11).
3. Stufe mit `veroeffentlichen.mjs stufe` (Vermutung: voll, weil Code geändert), dann Bau-Frage **Reiselogbuch 3.58.2** (AppDesign bleibt 4.68.1).
