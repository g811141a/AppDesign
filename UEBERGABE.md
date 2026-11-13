# Übergabe an die nächste Sitzung

**Stand 13.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0110‘ (RLB-121 gebaut bis vor `los`; Übergabe nach 0 Nr. 13, Kontext 290.073) –
Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15);
die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.55.1** veröffentlicht (Fassung 4.57.0); **3.56.0 vorbereitet** auf Zweig `vorbereitung-3.56.0` (gepusht) |
| AppDesign | **4.58.0** veröffentlicht; **4.59.0 vorbereitet** auf Zweig `vorbereitung-4.59.0` (gepusht, `a07989a`) |
| Zusammenarbeit allgemein | **3.12.0** |
| AppDesign-`CLAUDE.md` | **2.12.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0111**; die danach 0112.
- **Modell und Aufwand:** in 0110 Opus 5.5 (`get_session`), Aufwand hoch (alle Aufrufe `"effort":"high"`), kein `model_fallback`.
  `~/.claude/settings.json` = `{}` (keine Hooks).
- **Offener Usertest:** keiner (P-103 kommt mit 3.56.0).
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1`; `g811141a.github.io` ist aus der
  Sitzung nicht erreichbar. Ein eigenes `node -e` mit Playwright braucht `createRequire('/home/user/ReiseLogBuch/tests/')('playwright')`.

## 2. Ergebnisse der Sitzung 0110

- **Bau-Frage bestätigt** (Nutzer 13.11.2026, Kachel ‚Ja, bauen‘): Reiselogbuch 3.56.0 mit AppDesign 4.59.0, Fassung 4.59.0, Prüfstufe voll.
- **Gebaut auf den Vorbereitungs-Zweigen** (`vorbereiten`, `fassung`, Commit, Push): AppDesign `aufzaehlung` mit langen Einträgen (`.ict.az`
  als Block, ‚·‘ und Zusatz in `.az-n`), `checkAufzaehlung` erweitert (Option `fenster`); Reiselogbuch `quarterRanks`/`quarterRankRows` in
  `tripStats`, Prüfungen RLB-121/M-1 bis M-14, M-16 in `ablauf-preis-km`, Fall 18 (RLB-121/M-15) in `ablauf-abgleich-faelle`; PROMPT.md,
  Backlogs, CHANGELOGs (Testfälle P-103/0 bis P-103/4), Designrichtlinie 4.59.0 mit RLB-121/W-1 bis W-4.
- **Befund beim Bau** (`arbeit/0110 RLB-121 iPad hoch.md`): am iPad hoch neben der Seitenleiste ragte die Statistik bei Text XXL/XXXL hinaus
  (Muster bildete iPad hoch nur ohne Seitenleiste nach). **Entschieden (Nutzer 13.11.2026): Variante A, allgemein** – `ts-um` ab 21 px, wenn `main`
  schmaler als 600 px ist (`textUm` in `ui.js`, ResizeObserver auf `main`). **Wortlaut RLB-121/W-3 (Designrichtlinie 3) und W-4 (R-1.10)
  bestätigt** (`arbeit/0110 RLB-121 Wortlaut ts-um.md`).
- **Geprüft (einzeln):** `ablauf-preis-km` und `ablauf-abgleich-faelle` in Chromium und WebKit grün; `ablauf-navigation`, `ablauf-jahre`,
  `ablauf-seitenleiste-position`, `ablauf-feld-cursor` (Chromium), `version-regeln`, `text-regeln` grün; `doku-regeln` grün bis auf die alte
  `UEBERGABE.md` (mit dieser Fassung behoben). `stufe --app reiselogbuch`: **voll**.
- **Offensichtliche Korrektur:** in `arbeit/0109 …` (Lagebild, Bau-Frage, allgemein) bei APD-62 die Elternnummer ergänzt: ‚APD-62 (APD-38/T-1)‘ (doku-regeln APD-78/S-2).

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen (`git clone --depth 50 …`), dann **die Vorbereitungs-Zweige auschecken**: in beiden Repos
   `git fetch origin vorbereitung-4.59.0` bzw. `vorbereitung-3.56.0` und `git checkout -b <zweig> origin/<zweig>` (Verfolgung wie in der
   `CLAUDE.md`). Tests einrichten. **Lagebild als eigene Antwort – im Chat und als Markdown-Datei – mit Kachel.**
2. **Veröffentlichen (das ‚Ja‘ liegt vor, Prüfstufe voll):** `node werkzeug/veroeffentlichen.mjs los --app reiselogbuch` im Hintergrund (~60 min;
   führt die neuere `main` mit dieser Übergabe vorher zusammen). Bei Rot: Fehler beheben, `fassung`, committen, erneut `los`.
3. Danach Bericht mit Apple-Review, alle Änderungen und **Usertest P-103** vollständig (CHANGELOG Reiselogbuch 3.56.0), lokale Vorbereitungs-Zweige löschen.

## 4. Danach

APD-85 Teil 6 (Wackler WebKit) · APD-80 · APD-30 übrige Teile · APD-57 · APD-62 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1; aus 0106 ohne bestätigten
Wortlaut: PROMPT.md ‚Emojis klein‘, VoiceOver-Name für Rückgängig, ‚Cursor am Ende‘ in Designrichtlinie 16, `tests/README.md`, `color-mix` am Gerät.
Später: nach einem iOS-Update, das `print()` in der App vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein.

```
Reiselogbuch 0111 – Reiselogbuch 3.56.0 veröffentlichen

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.12.0) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, checke in beiden Repos die Vorbereitungs-Zweige aus (vorbereitung-4.59.0, vorbereitung-3.56.0), richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach Reiselogbuch 3.56.0 mit AppDesign 4.59.0 veröffentlichen (RLB-121, gebaut in 0110, das ‚Ja‘ liegt vor, Prüfstufe voll) nach UEBERGABE.md Abschnitt 3, dann Bericht mit Usertest P-103.
```
