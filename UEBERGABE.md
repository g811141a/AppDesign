# Übergabe an die nächste Sitzung

**Stand 14.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0114‘ (Übergabe nach 0 Nr. 13: die Sitzung wurde automatisch zusammengefasst;
Version veröffentlicht, Bericht gegeben) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann
die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.56.2** veröffentlicht (`99b13f0` auf `main`, Pages ‚success‘) |
| AppDesign | **4.59.2** veröffentlicht (`7968cf3` auf `main`, Pages ‚success‘) |
| Zusammenarbeit allgemein | **3.13.1** |
| AppDesign-`CLAUDE.md` | **2.12.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0115**; die danach 0116.
- **Modell und Aufwand:** in 0114 Opus 5.5 (`claude-opus-5-5`), Aufwand hoch, kein `model_fallback`; `~/.claude/settings.json` = `{}` (keine Hooks).
- **Offener Usertest:** **P-105** (Reiselogbuch 3.56.2 mit AppDesign 4.59.2) – noch keine Rückmeldung. P-104 ist damit überholt (/1 bis /3 prüft P-105 neu).
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1`; ein eigenes `node -e` mit
  Playwright braucht `createRequire('/home/user/ReiseLogBuch/tests/')('playwright')`.

## 2. Ergebnisse der Sitzung 0114

- **AppDesign 4.59.2 mit Reiselogbuch 3.56.2 veröffentlicht** – Bericht `arbeit/0114 Bericht 4.59.2.md` (an den Nutzer gesendet), Usertest P-105 im
  CHANGELOG des Reiselogbuchs 3.56.2.
  - APD-129 Teil 2: `randOben()` (`--safe-top` am iPhone vom Home-Bildschirm selbst bestimmt, nimmt nur den eigenen Wert zurück) und `drehRestWeg()`.
  - Safari-Modell meldet die sichtbare Höhe beim Drehen schon im `resize` des Fensters (APD-129/M-12). Gegenprobe APD-129/M-18 rot.
  - APD-130/W-5 `messung.mjs` mit dem eingestellten Modell, Designrichtlinie 13 nach APD-129/W-1, Zusammenarbeit 3.13.1 (2.2).
- **Zwei rote Läufe vor der Veröffentlichung:**
  - Erster Lauf: `doku-regeln` (UEBERGABE.md aus `main`, Elternnummern) – behoben.
  - Zweiter Lauf: `hig` R-1.7, weil `randOben()` das `--safe-top` der Prüfung entfernte – behoben.
  - Lehre: auch bei einer Korrektur `hig` mitlaufen lassen, wenn `--safe-top` oder Ränder betroffen sind.
- **Dritter Lauf:** 156 Läufe grün in 71:23. Gewackelt hat `ablauf-seitenleiste-position` in WebKit; das ist unter APD-85 Teil 6 im Backlog
  eingetragen.

## 3. Nächster Schritt

1. Lesen wie immer, Repo ReiseLogBuch dazuholen, Tests einrichten. **Lagebild als eigene Antwort – im Chat und als Markdown-Datei – mit Kachel.**
2. **Rückmeldung zu P-105 erfragen** (Testfälle P-105/0 bis /4 im CHANGELOG des Reiselogbuchs 3.56.2 und in `arbeit/0114 Bericht 4.59.2.md`, im Chat
   wörtlich wiederholen); Ergebnis in beide Backlogs; Abweichungen in ‚0. Nächste Version‘.

## 4. Danach

APD-85 Teil 6 (Wackler WebKit: `ablauf-gesamt`, neu `ablauf-seitenleiste-position`) · APD-80 · APD-30 übrige Teile · APD-57 · APD-62 · APD-44 bis APD-60 ·
APD-70 · RLB-6 · APD-1; aus 0106 ohne bestätigten Wortlaut: PROMPT.md ‚Emojis klein‘, VoiceOver-Name für Rückgängig, ‚Cursor am Ende‘ in
Designrichtlinie 16, `tests/README.md`, `color-mix` am Gerät. Später: nach einem iOS-Update, das `print()` in der App vom Home-Bildschirm wieder
zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein.

```
Reiselogbuch 0115 – Rückmeldung P-105

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.13.1) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; darin die Rückmeldung zu Usertest P-105 (Reiselogbuch 3.56.2 mit AppDesign 4.59.2) erfragen, nach UEBERGABE.md Abschnitt 3.
```
