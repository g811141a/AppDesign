# Übergabe an die nächste Sitzung

**Stand 14.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0112‘ (3.56.1 veröffentlicht; Übergabe nach 0 Nr. 13, Sitzung einmal zusammengefasst,
Kontext 104.317) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.56.1** veröffentlicht (Fassung 4.59.1, Commit `f5be8d2`) |
| AppDesign | **4.59.1** veröffentlicht (Commit `7dffc70`) |
| Zusammenarbeit allgemein | **3.12.0** |
| AppDesign-`CLAUDE.md` | **2.12.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0113**; die danach 0114.
- **Modell und Aufwand:** in 0112 Opus 5.5, Aufwand hoch (alle Aufrufe `"effort":"high"`), kein `model_fallback`.
  `~/.claude/settings.json` = `{}` (keine Hooks).
- **Offener Usertest:** **P-104** (Testfälle P-104/0 bis P-104/4, CHANGELOG Reiselogbuch 3.56.1) – Rückmeldung des Nutzers steht aus.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1`; `g811141a.github.io` ist aus der
  Sitzung nicht erreichbar. Ein eigenes `node -e` mit Playwright braucht `createRequire('/home/user/ReiseLogBuch/tests/')('playwright')`.

## 2. Ergebnisse der Sitzung 0112

- **P-103 alles ok** (Nutzer 14.11.2026) – in beiden Backlogs unter ‚Erledigt‘.
- **APD-129 (Nutzer 14.11.2026):** am iPhone vom Home-Bildschirm rutschte die App nach hoch → quer → hoch um etwa 1 cm nach unten, Antippen traf daneben.
  Messung am Gerät `arbeit/APD-129/messung-2026-11-14-0948.txt`: Safari lässt die Seite um die Statusleiste (62 px) verschoben, ohne Tastatur. Befund und
  Testfall-Liste `arbeit/APD-129 Befund und Testfall-Liste.md`.
- **Veröffentlicht:** Reiselogbuch 3.56.1 mit AppDesign 4.59.1 (Korrektur APD-129: `ui.js` `placeDialogs` setzt ohne Tastatur auf 0 zurück; Safari-Modell
  `drehRest`, `safariDrehenHoch`; neue Prüfung `ablauf-drehen-iphone`, gegen 4.59.0 rot; Designrichtlinie 13 neuer Punkt, Wortlaut bestätigt). Prüfstufe voll,
  alle 156 Läufe grün (1 wackelt: `ablauf-seitenleiste-position` (Text 53) in WebKit – APD-85 Teil 6). Beide Pages-Läufe ‚success‘.
- **Bericht** mit Apple-Review und Usertest P-104: `arbeit/0112 Bericht 3.56.1.md`. Am Gerät noch zu bestätigen (0 Nr. 20).

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten. **Lagebild als eigene Antwort – im Chat und als Markdown-Datei – mit Kachel.**
2. **Rückmeldung zum Usertest P-104 erfragen** (Kachel: ‚P-104: alles ok‘ / ‚nicht ok‘ / ‚Ich schreibe im Chat‘); die Testfälle P-104/0 bis P-104/4 vollständig
   aus dem CHANGELOG Reiselogbuch 3.56.1 mit Link in die Datei neben der Kachel. Bei ‚alles ok‘ P-104 nach ‚Erledigt‘ (beide Backlogs), APD-129 gilt dann am
   Gerät als bestätigt; Abweichungen kommen in ‚0. Nächste Version‘ (bei Bewegungsfehlern zuerst messen, 0 Nr. 20).
3. Danach Backlog-Spitze (Abschnitt 4) vorschlagen.

## 4. Danach

APD-85 Teil 6 (Wackler WebKit) · APD-80 · APD-30 übrige Teile · APD-57 · APD-62 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1; aus 0106 ohne bestätigten
Wortlaut: PROMPT.md ‚Emojis klein‘, VoiceOver-Name für Rückgängig, ‚Cursor am Ende‘ in Designrichtlinie 16, `tests/README.md`, `color-mix` am Gerät.
Später: nach einem iOS-Update, das `print()` in der App vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein.

```
Reiselogbuch 0113 – Usertest P-104

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.12.0) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach die Rückmeldung zum Usertest P-104 (Reiselogbuch 3.56.1 mit AppDesign 4.59.1, Testfälle P-104/0 bis P-104/4 im CHANGELOG) erfragen, nach UEBERGABE.md Abschnitt 3.
```
