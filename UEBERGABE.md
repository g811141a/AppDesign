# Übergabe an die nächste Sitzung

**Stand 14.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0113‘ (Übergabe nach 0 Nr. 13 mitten im Bau – Kontext etwa 285.000, der volle
Prüflauf hätte die Grenze überschritten) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die
ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.56.1** veröffentlicht; **3.56.2 in Vorbereitung** (Zweig `vorbereitung-3.56.2`, Zwischenstand `834579f`) |
| AppDesign | **4.59.1** veröffentlicht; **4.59.2 in Vorbereitung** (Zweig `vorbereitung-4.59.2`, Zwischenstand `1892fa6`) |
| Zusammenarbeit allgemein | **3.13.0** auf `main` (APD-130 W-1 bis W-4, Wortlaut bestätigt, ‚sofort umsetzen‘) |
| AppDesign-`CLAUDE.md` | **2.12.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0114**; die danach 0115.
- **Modell und Aufwand:** in 0113 Opus 5.5, Aufwand hoch, kein `model_fallback`; `~/.claude/settings.json` = `{}` (keine Hooks).
  Neu (APD-130): die neue Sitzung startet mit dem Modell und Aufwand dieses Chats.
- **Offener Usertest:** **P-104** – /0 und /4 ok, **/1, /2, /3 nicht ok** (Bild springt nach dem Zurückdrehen auf hoch nach oben; erwartet wie iPad).
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1`; ein eigenes `node -e` mit
  Playwright braucht `createRequire('/home/user/ReiseLogBuch/tests/')('playwright')`.

## 2. Ergebnisse der Sitzung 0113

- **P-104 Rückmeldung** in beiden Backlogs. **Messung am iPhone** `arbeit/APD-129/messung-2026-11-14-2137.txt`; Befund, Vorschlag A + B und
  Testfall-Liste APD-129/M-10 bis M-18 **bestätigt**: `arbeit/APD-129 Teil 2 Befund und Testfall-Liste.md`. Ursache: nach der Meldung 812 bleibt
  `env(safe-area-inset-top)` 250–300 ms auf 62 – alles mit `--safe-top` steht so lange 62 px zu tief, dann springt es hoch.
- **Wortlaut Designrichtlinie 13 APD-129/W-1 bestätigt** (`arbeit/APD-129 Teil 2 Wortlaut.md`) – **noch nicht eingetragen** (gehört in 4.59.2).
- **APD-130** (Nutzer): neue Sitzung mit Modell und Aufwand dieses Chats – W-1 bis W-4 in Zusammenarbeit 3.13.0 auf `main`; **W-5 offen**
  (`werkzeug/messung.mjs` vergleicht mit dem eingestellten Modell statt fest `claude-opus-5-5`, Prüfung `tests/messung.mjs`, Wortlaut 2.2 nach W-5).
- **Bau-Frage mit ‚Jetzt 4.59.2 bauen‘ beantwortet** (APD-129 Teil 2 und APD-130/W-5, Prüfstufe voll). Begonnen:
  - `vorbereiten --ad 4.59.2 --app reiselogbuch=3.56.2` gelaufen.
  - `v4/ui.js`: `randOben()` (am iPhone vom Home-Bildschirm, hoch und Fenster niedriger als der Bildschirm → `--safe-top: 0px` am Element
    `html`, sonst entfernt; ändert es sich, sofort `placeDialogs()`), `drehRestWeg()` (Rückstellung der Verschiebung, jetzt auch direkt im ersten
    `resize`-Hörer, Teil B); `placeDialogs` ruft beide.
  - `tests/safari.mjs`: `safeOben(p, px)`, `RAND_NACH` 280, `safariDrehenHoch(p, { rand, bilder })` mit Home-Bildschirm und Bildschirmhöhe,
    wartet vor `drehRest` auf die sichtbare Höhe.
  - ReiseLogBuch `tests/ablauf-drehen-iphone.mjs`: jedes Bild ab der Meldung (nur nach `resize`) – M-10, M-11, M-12, M-13, M-15, M-16.
  - **Stand:** WebKit ‚alles in Ordnung‘; **Chromium rot nur M-12** (2 Bilder Kopf 72 statt 10): das Modell meldet `visualViewport.height` in
    Chromium nach dem Drehen noch mit der Höhe von quer (393) – `kbOffen()` hält das für die Tastatur, `drehRestWeg` setzt nicht zurück. Am Gerät
    war die Höhe zu dem Zeitpunkt schon 812 (Messung Zeile 269). **Das Modell anpassen** (`s.gemeldet.h` beim Drehen nachführen), nicht den Code.

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen (die Zweige `vorbereitung-4.59.2` und `vorbereitung-3.56.2` holen und auschecken), Tests einrichten.
   **Lagebild als eigene Antwort – im Chat und als Markdown-Datei – mit Kachel.**
2. Den Bau fortsetzen (das ‚Ja‘ liegt vor, Nutzer 14.11.2026): Modell M-12 in Chromium; Gegenprobe M-18 (ohne Teil A gegen 4.59.1 rot, Chromium
   und WebKit); APD-130/W-5 (`messung.mjs` und Prüfung, Zusammenarbeit 2.2 nach W-5 → 3.13.1 bzw. nach Skript); Designrichtlinie 13 nach W-1 mit
   Versionsgeschichte; CHANGELOG 3.56.2 mit **Usertest P-105** (/0 Version 3.56.2 · AppDesign 4.59.2; Drehen Startliste, Reiselogbuch, Blatt;
   Tastatur), Backlogs (APD-129 Teil 2, APD-130 → Prüfen), `fassung`, committen, `stufe` (voll erwartet), `los --app reiselogbuch` im Hintergrund.
3. Bericht nach 0 Nr. 11 und 2.3, danach Rückmeldung zu P-105 erfragen.

## 4. Danach

APD-85 Teil 6 (Wackler WebKit) · APD-80 · APD-30 übrige Teile · APD-57 · APD-62 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1; aus 0106 ohne bestätigten
Wortlaut: PROMPT.md ‚Emojis klein‘, VoiceOver-Name für Rückgängig, ‚Cursor am Ende‘ in Designrichtlinie 16, `tests/README.md`, `color-mix` am Gerät.
Später: nach einem iOS-Update, das `print()` in der App vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein.

```
Reiselogbuch 0114 – AppDesign 4.59.2 (APD-129 Teil 2) fertig bauen

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.13.0) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, hole in beiden Repos die Zweige vorbereitung-4.59.2 bzw. vorbereitung-3.56.2, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach den Bau von AppDesign 4.59.2 mit Reiselogbuch 3.56.2 fortsetzen, nach UEBERGABE.md Abschnitt 3 (das Ja zum Bau liegt vor).
```
