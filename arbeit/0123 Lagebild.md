# Lagebild – Sitzung Reiselogbuch 0123

**Stand 17.11.2026**

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| Reiselogbuch | **3.56.3** (Commit c3c9915) | `index.html` `APP_VERSION`, `AD_NEEDED` = 4.59.3 |
| AppDesign | **4.59.3** | `v4/ui.js` `AD_VERSION` |
| Zusammenarbeit allgemein | **3.14.1** | Kopf der Datei |
| AppDesign-`CLAUDE.md` | **2.12.0** | Kopf der Datei |
| ReiseLogBuch-Import | Commit c747fee (‚1.3.0‘) | `git log` |

## Offene Usertests

Keine (Backlog AppDesign und Reiselogbuch, Abschnitt 1 leer; P-106 alles ok).

## Backlog-Spitze

- **Nächste Version AppDesign: 2 Punkte bereit** – APD-30 Wischaktionen mit sperrender Sprechblase (Prio 1), APD-133/V-1 Designrichtlinie 13 (nur Text, Prio 2).
- **Reiselogbuch: 1 Punkt bereit** – APD-30 (Wischaktionen der Kacheln).
- **In Klärung:** APD-135 Konsolidierung 3 (Prio 1, Entscheidungen offen) · APD-62 · APD-134 Wackler · RLB-6 · Später-Punkte (APD-44 bis APD-60, APD-32, APD-1, APD-70, APD-80).

## Modell, Aufwand, Nutzungsgrenze

| Prüfung | Ergebnis |
|---|---|
| Modell eingestellt (`get_session` `session_context.model`) | `claude-opus-5-5` |
| Modell tatsächlich (`last_served_model`, Sitzungsdatei) | `claude-opus-5-5` (alle 20 Aufrufe) |
| `model_fallback` in der Sitzungsdatei | keiner |
| Aufwand eingestellt (`session_context.effort_level`) | hoch |
| Aufwand tatsächlich (Sitzungsdatei `"effort"`) | hoch (alle 20 Aufrufe) – stimmt überein |
| `CLAUDE_CODE_EFFORT_LEVEL` | nicht gesetzt (richtig) |
| Nutzungsgrenze (`rate_limit_info`) | 5-Stunden-Fenster, Status ‚allowed‘, keine Mehrnutzung; zurückgesetzt 17.11.2026 17:00 UTC |
| Hooks in `~/.claude/settings.json` | keine (`{}`) |

## Arbeitsumgebung

- ReiseLogBuch (c3c9915) und ReiseLogBuch-Import (c747fee) geklont, Verweise in Kleinschreibung angelegt, alle drei Repos angemeldet.
- Tests eingerichtet: Playwright 1.56.1 in `ReiseLogBuch/tests` (`package.json`/`package-lock.json` gelöscht), Chromium-Verweise 1194 → 1243;
  Probe: Chromium 153.0.8010.12 und WebKit 26.0 starten. Import-Werkzeug `npm install` (Lock-Datei zurückgesetzt). 4 Kerne.
- Vereinbarung: Muster bis auf Weiteres **nur hell**. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander; Fable 5.2 vorerst nicht.

## Nächster Schritt (UEBERGABE.md Abschnitt 3)

1. Restliche Entscheidungen zu APD-135 im Auswahlfenster – zuerst Paket 3 (APD-135/J-16, J-17, J-7, J-11, J-25), dann Paket 2 (J-13, J-33 bis J-35), dann Pakete 4 bis 7 (J-21 bis J-24, J-26 bis J-32).
2. Danach Bau-Frage für AppDesign 4.60.0 mit Reiselogbuch 3.57.0 (APD-30, APD-133/V-1; Prüflauf voll).
