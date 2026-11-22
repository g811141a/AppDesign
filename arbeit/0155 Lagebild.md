# Lagebild – Reiselogbuch 0155

**Stand 22.11.2026** · Auftrag: P-120 Korrekturen fertig und bauen

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.58.0** veröffentlicht (`main` db718f3) · Arbeitszweig `claude/vigilant-babbage-sa79op` (fe57fa7): P-120-Korrekturen, nicht gebaut |
| AppDesign | **4.68.0** veröffentlicht (`main` 33b75b2; Arbeitszweig = `main`) |
| ReiseLogBuch-Import | **1.4.0** (`main` 2ec7d03) |
| Zusammenarbeit allgemein | **3.19.0** |
| `CLAUDE.md` | AppDesign 2.14.0 |

## Offene Usertests

- **P-120** (Reiselogbuch 3.58.0, AppDesign 4.68.0) – **nicht ok**: P-120/F-1 bis F-4 in ‚0. Nächste Version‘, alle übrigen Punkte ok.

## Backlog-Spitze

- **Reiselogbuch, Nächste Version:** 4 Punkte bereit – P-120/F-1 Textauswahl nur in Eingabefeldern (allgemein, R-1.15) · F-2 Sperren springt
  ans Ende · F-3 Ausgabe-Version zählt bei Abbruch · F-4 Hinweis ‚gesperrt‘ rollt weg.
  Umgesetzt: F-2 Sperren/Entsperren, F-3 HTML, F-4. **Offen:** F-1 Regel und CSS, F-2 Einstellen/Löschen, F-3 PDF (`beforeprint`),
  `ablauf-p120` in `alle.mjs` und `tests/README.md`.
- **AppDesign, Nächste Version:** APD-146 Icon-Zeile Sperren/Entsperren (bereit).
- Danach: APD-135/B-3.3 Schritt 2 · APD-145 · APD-142 · RLB-126.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`get_session`: eingestellt `claude-opus-5-5`, zuletzt bedient `claude-opus-5-5`; Sitzungsdatei: alle Aufrufe
  `claude-opus-5-5`, **kein** `model_fallback`).
- **Aufwand:** eingestellt **hoch** (`effort_level: high`), tatsächlich **hoch** (Modell-Aufrufe `"effort":"high"`);
  `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** Sieben-Tage-Grenze **‚allowed_warning‘** (zurückgesetzt 26.11.2026, 8:00) – sparsam arbeiten; der volle Prüflauf
  dauert rund 75 min.

## Umgebung

- Repos unter `/home/user` geklont, Verweise klein angelegt, alle drei registriert.
- Tests eingerichtet: Playwright 1.56.1 in `ReiseLogBuch/tests`, Chromium-Verweise 1194 → 1243, WebKit 2215; 4 Kerne.
- **Hooks:** keine – `~/.claude/settings.json` enthält nur die Erlaubnis für `create_session`.

## Nächster Schritt (UEBERGABE Abschnitt 3)

1. `arbeit/0154 P-120 Korrekturen.md` lesen.
2. F-1 (Katalog R-1.15, R-3.6, Designrichtlinie 13, `v4/design.css`, `hig.mjs`), F-2 Einstellen/Löschen (zuerst rot in `ablauf-p120`),
   F-3 PDF `beforeprint`, `ablauf-p120` in `alle.mjs` und `tests/README.md`.
3. Bau-Frage: Reiselogbuch 3.58.1 mit AppDesign 4.68.1, Prüflauf voll.
