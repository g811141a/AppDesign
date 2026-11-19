# Lagebild – Reiselogbuch 0137

**19.11.2026** · Thema: APD-135 Paket 6 Schritt 1 und APD-138 vorbereiten (AppDesign 4.64.0 / Reiselogbuch 3.57.7)

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.6** veröffentlicht (`main` 7fe9766, P-113 ok) |
| AppDesign | **4.63.0** veröffentlicht (`main` e3577ef); **4.64.0** in Vorbereitung – Zweig `vorbereitung-4.64.0` (0680bb4, B-4.1) geholt |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03), unverändert |
| Zusammenarbeit allgemein | **3.16.0** (ganz gelesen) |
| `CLAUDE.md` | AppDesign 2.14.0 |

- Reiselogbuch: Zweig **`vorbereitung-3.57.7`** von `origin/main` (7fe9766) angelegt, noch ohne Änderung.
- `vorbereiten` ist noch nicht gelaufen.

## Offene Usertests

Keine (P-113 ok, 19.11.2026).

## Backlog-Spitze

- **AppDesign ‚0. Nächste Version‘:** 1 Punkt bereit – APD-138 (Dateiname am iPad in einer Zeile).
- **Dazu bestätigt für dieselbe Sammelversion:** APD-135 Paket 6 Schritt 1 (B-4.1 umgesetzt, B-4.2, J-28, J-19 offen).
- **Offen im Backlog AppDesign:** APD-135 (Prio 1), APD-136 (1), APD-139 (2), APD-70 (3).
- **Reiselogbuch:** 0 Punkte bereit · offen RLB-125 (2), RLB-126 (3), RLB-6 (3).

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`) – eingestellt (`get_session`) und tatsächlich (Sitzungsdatei, alle 23 Aufrufe), **kein `model_fallback`**.
- **Aufwand:** hoch – eingestellt (`effort_level: high`) und tatsächlich (alle 23 Aufrufe `"effort":"high"`); `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** Fünf-Stunden-Grenze, ‚erlaubt‘, keine Überziehung; zurückgesetzt um 17:50.

## Arbeitsumgebung

- Repos geklont: AppDesign, ReiseLogBuch, ReiseLogBuch-Import; Verweise kleingeschrieben angelegt und registriert.
- Tests eingerichtet: Playwright 1.56.1 in `ReiseLogBuch/tests` (`package*.json` gelöscht); Verweise Chromium 1194 → 1243 gesetzt.
  Probestart: Chromium 157.0.8103.78 und WebKit 26.0 starten.
- 4 Kerne.
- **Hooks:** `~/.claude/settings.json` ist leer (`{}`) – keine Hooks.

## Nächster Schritt (UEBERGABE.md Abschnitt 3)

1. **B-4.1 fertig verdrahten:** `tests/schnittstelle-regeln.mjs` im Reiselogbuch, in `alle.mjs` und in den Vorlauf von `lauf.mjs`, Fall S-6 in `lauf-selbsttest`, S-1 prüfen.
2. **B-4.2:** `placeDialogs` in den `resize` von `ui.js`, `markHeld(root)` neu, App `setOpener('#shareBtn')`, `capNext` streichen,
   ‚Bewegung reduzieren‘ und ⓧ-SVG je einmal, Kopf von `ui.js` als Verweis auf `v4/schnittstelle.json`. Gegenproben S-8, S-10.
3. **J-28:** `.iconbtn` aus `design.css` und Designrichtlinie 15.1. **J-19:** prüfen und berichten.
4. **APD-138:** Breite nach Dateiname in `inform`, `checkDateiname` mit D-1 bis D-10.
5. `vorbereiten --ad 4.64.0 --app reiselogbuch=3.57.7`, Texte, `fassung`, `stufe` (erwartet voll), Bericht, dann die Bau-Frage.

Jede Prüfung zuerst rot gegen den veröffentlichten Stand.
