# Lagebild – AppDesign 0002 (APD-149 Muster im Bean-Katalog bauen)

**27.11.2026** · Thema: **APD-149 Framework mit Steuer-Bean** – Muster `katalog/entwurf/presentation-commands.js` (W-1) und APD-149/S-1 bis S-15
automatisch. Die Kette Reiselogbuch (Sitzung 0167, RLB-126) läuft parallel.

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| Reiselogbuch | 3.58.5 (0167 baut 3.59.0) | `APP_VERSION` in `index.html` |
| AppDesign | 4.70.2 (0167 baut 4.71.0) | `AD_VERSION` in `v4/ui.js` |
| Zusammenarbeit allgemein | 3.19.0 | gelesen |
| `CLAUDE.md` AppDesign | 2.14.0 | gelesen |

- `main` von AppDesign steht auf `7f79372` (Übergabe 0001). Von 0167 ist noch nichts auf `main` (`git fetch origin main`).
- ReiseLogBuch-Import ist nicht dazugeholt. Für das Muster brauche ich es nicht.

## Offene Usertests

- **keine** (Abschnitt 1 in beiden Backlogs leer).

## Backlog-Spitze

- **AppDesign, 0. Nächste Version:** 1 Punkt bereit (APD-149/J-1, Wortlaut ‚Beans im Entwurf im Bean-Katalog‘).
- Prio 1: APD-135, APD-136, **APD-149 (dieses Thema)**, APD-148.
- Prio 2: APD-139, APD-141, APD-142, APD-145, APD-150.
- Prio 3: APD-70, APD-147.
- **Reiselogbuch, 0. Nächste Version:** 1 Punkt bereit (RLB-126, baut Sitzung 0167).

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`). Eingestellt (`session_context.model`) und tatsächlich (`last_served_model`) gleich.
- **Aufwand:** hoch – eingestellt (`effort_level`) und tatsächlich (`"effort":"high"` in der Sitzungsdatei, 10 von 10 Aufrufen) gleich.
- **Kein `model_fallback`:** In der Sitzungsdatei steht kein solcher Eintrag. Die Treffer sind nur Text aus der Zusammenarbeit.
- `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt.
- **Nutzungsgrenze:** seven_day · **allowed_warning** (Warnung, noch erlaubt; keine Überziehung). Sie setzt am 03.12.2026 um 08:00 Uhr zurück.
  In 0001 stand five_hour · allowed.
- **Hilfsagenten:** nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch). Fable 5.2 vorerst nicht.

## Arbeitsumgebung

- **Hooks:** keine. `~/.claude/settings.json` enthält nur die Regel ‚`create_session` erlauben‘.
- **Repos:** AppDesign und ReiseLogBuch nebeneinander, Verweise `appdesign` und `reiselogbuch`, beide angemeldet (`register_repo_root`).
- **Prüfumgebung:** 4 Kerne, Chromium 158.0.8127.36 (Verweise 1194 → 1243), WebKit (Ordner 2215), Playwright 1.56.1.
- **Probelauf:** `bean-katalog` (Chromium) – „alles in Ordnung“ (73 s).

## Nächster Schritt (Übergabe APD-149 Abschnitt 3)

1. Muster `katalog/entwurf/presentation-commands.js` mit den Beans `commands` und `presentation` nach Grobentwurf 2.1 und 2.2, mit H-1 bis H-9
   und J-3. Regeln aus dem Wortlaut J-1: eigener Code auf `v4/`, CSS nur unter `.ad-<kennung>…`, `draft: true`, Seitenleiste ‚Entwurf‘,
   `katalog/index.html` lädt die Datei.
2. Ausprobieren im Katalog: Kopfzeile mit zwei Menüs, Untermenü und einer Schaltfläche ohne Menü (J-3), Fenster und Hinweisfenster, Teilen,
   Protokoll des Stapels.
3. APD-149/S-1 bis S-15 automatisch in Chromium und WebKit, Gegenprobe S-15; dazu S-5 mit J-3, die Fälle aus RLB-126, `katalog.mjs` in beiden
   Browsern und ein Skript für die Prüfungen aus Abschnitt 4 des Wortlauts.
4. Bericht mit Link, Schritten und ‚Erwartet‘. **Vor dem Hochladen auf `main` frage ich** (Pages; der volle Lauf des Reiselogbuchs öffnet jede
   angemeldete Bean).

- Keine Version, kein Bau (0 Nr. 21): nur die Entwurfsdatei, eine Zeile in `katalog/index.html` und Prüfskripte im Notizordner bzw. `arbeit/`.
