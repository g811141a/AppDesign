# Lagebild – Sitzung AppDesign 0003

**27.11.2026, 09:42 Uhr** · APD-149 Muster hochladen und am Gerät prüfen

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | 3.58.5 veröffentlicht (`APP_VERSION`); 0167 baut 3.59.0 |
| AppDesign | 4.70.2 veröffentlicht (`AD_VERSION`); 0167 baut 4.71.0 |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Chatnummer:** diese Sitzung AppDesign 0003, die nächste AppDesign 0004.
- **Muster:** Zweig `apd-149-muster` (Commit 198eb6d), ein Commit über `main` (822d012). Geändert: `katalog/index.html`, `katalog/entwurf/presentation-commands.js`, `arbeit/APD-149/muster-pruefen.mjs`, `arbeit/APD-149/entwurf-regeln.mjs`.

## Kette Reiselogbuch (parallel)

- Sitzung 0167 hat den **vollen Prüflauf** für 4.71.0 / 3.59.0 um 08:47 Uhr neu gestartet (der erste wurde durch einen Neustart der Umgebung abgebrochen). Dauer laut 0167 rund 75 min, danach Pages.
- Die Vorbereitungs-Zweige `vorbereitung-4.71.0` und `vorbereitung-3.59.0` liegen auf GitHub.
- **4.71.0 ändert `katalog/index.html` und `v4/`** (Bean `recentlydeleted`). Das Muster ändert dieselbe `katalog/index.html`. Nach 4.71.0 setze ich den Zweig auf die neue `main` und lasse die Prüfungen erneut laufen (Übergabe Abschnitt 3.2).

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`), eingestellt und tatsächlich (alle 13 Modell-Aufrufe der Sitzungsdatei). Kein `model_fallback`.
- **Aufwand:** hoch, eingestellt (`get_session`) und tatsächlich (Sitzungsdatei). `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** five_hour · allowed (setzt am 27.11.2026 um 13:40 Uhr zurück).
- **Hooks:** keine. `~/.claude/settings.json` enthält nur ‚`create_session` erlauben‘.

## Prüfumgebung

- 4 Kerne, Chromium 158.0.8127.36 (Ordner 1243, Verweise 1194 → 1243 angelegt), WebKit (Ordner 2215), Playwright 1.56.1 in `ReiseLogBuch/tests`.
- ReiseLogBuch geklont (Stand e050549), Verweise `appdesign` und `reiselogbuch` angelegt und angemeldet.

## Offene Usertests

- keine.

## Backlog

- Nächste Version AppDesign: 1 Punkt bereit (APD-149/J-1).
- Offen im Backlog: APD-135, APD-136, APD-149, APD-148 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150 (Prio 2) · APD-70, APD-147 (Prio 3).

## Nächster Schritt

Nach der Übergabe Abschnitt 3: Bericht zum Muster zeigen und fragen, ob das Muster auf `main` kommt. Empfehlung dann: erst nach 4.71.0 hochladen, weil 0167 gerade voll prüft und der volle Lauf jede Bean im Katalog öffnet.
