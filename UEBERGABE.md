# Übergabe an die nächste Sitzung

**Stand 16.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0119‘ (Übergabe mit Zustimmung des Nutzers, Thema abgeschlossen, Kontext etwa
270.000) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.56.3** veröffentlicht (Commit a25adaa, Pages ‚success‘, Usertest P-106 alles ok) |
| AppDesign | **4.59.3** veröffentlicht (Commit 6e75d23, Pages ‚success‘) |
| Zusammenarbeit allgemein | **3.14.1** |
| AppDesign-`CLAUDE.md` | **2.12.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 (in 0119 nicht geholt) |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0120**; die danach 0121.
- **Modell und Aufwand:** 0119 lief mit **Fable 5.2** (`claude-fable-5-2`), eingestellt und tatsächlich, kein `model_fallback`; Aufwand eingestellt
  und tatsächlich ‚mittel‘; `CLAUDE_CODE_EFFORT_LEVEL` nicht gesetzt. `~/.claude/settings.json` = `{}`.
- **Offene Usertests:** keine.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1` (github.io ist aus der
  Cloud nicht erreichbar); ein eigenes `node -e` mit Playwright braucht `createRequire('/home/user/ReiseLogBuch/tests/')('playwright')`.
  Einzelne Prüfungen dauern bis zu 3 min – eine Zeitgrenze (`timeout`) darunter sieht wie ein roter Lauf aus. `los` führt eine neuere `main`
  in den Vorbereitungs-Zweig zusammen – danach den Zweig hochladen, sonst meldet der Stop-Hook ‚unpushed‘.

## 2. Ergebnisse der Sitzung 0119

- **APD-133 geklärt und behoben** (`arbeit/APD-133 Befund Drehen.md`): Ursache in `ui.js` – das Fenster kann die neue Größe haben, bevor `resize`
  ankommt (WebKit der Prüfumgebung unter Last, rund 200 ms); lief `restoreTop` in dieser Lücke, überschrieb `rememberTop` nach dem Umbau der App
  das Gedächtnis mit ‚ganz am Ende‘. Korrektur: `restoreTop` übernimmt nur die mit `resize` gemeldete Größe (`keepMeldW`, `keepMeldH`). Neue
  Prüfung im Reiselogbuch `tests/ablauf-drehen-luecke.mjs` (hält `resize` zurück; gegen den alten Stand in Chromium und WebKit rot). Der Nutzer
  hat die Aufnahme in 4.59.3 bestätigt.
- **AppDesign 4.59.3 mit Reiselogbuch 3.56.3 veröffentlicht:** voller Prüflauf 160 Läufe grün in 74:37, davon 1 wackelt
  (`ablauf-markierung-menues` · WebKit).
- **Usertest P-106: alles ok** (Nutzer 16.11.2026). Der Testfall P-106/1 war falsch formuliert (Smiley-Leiste ‚unter Verlauf‘ gibt es nicht –
  sie stehen unter ‚Wie war was?‘ und ‚Essen und Trinken‘); im CHANGELOG beider Repos berichtigt. **Lehre:** Testfälle (User) vor dem Schreiben
  gegen `index.html` prüfen (Bezeichnungen der Schritte).
- **Neu im Backlog:** APD-134 Wackler `ablauf-markierung-menues` in WebKit (Prio 3, offen; die Meldung des roten Laufs steht nicht im Protokoll
  von `los`). APD-133/V-1 Wortlaut für Designrichtlinie 13 bestätigt (`arbeit/APD-133 Wortlaut Designrichtlinie 13.md`) – bereit unter ‚0.‘.

## 3. Nächster Schritt

1. Lesen wie immer, Repo ReiseLogBuch dazuholen, Tests einrichten. **Lagebild als eigene Antwort – im Chat und als Markdown-Datei – mit Kachel.**
2. **Bau-Frage für AppDesign 4.60.0 mit Reiselogbuch 3.57.0** (Nebenversion, Prüflauf voll) mit den 2 bereiten Punkten:
   - **APD-30** Wischaktionen mit sperrender Sprechblase: Testfall-Liste `arbeit/APD-30 Wischaktionen Testfall-Liste.md`, Wortlaut
   `arbeit/APD-30 Wischaktionen Wortlaut.md` (APD-30/V-1 bis V-11, noch nicht in der Designrichtlinie), allgemeine Regel R-7.8. Im Code gelesen
   (0117): die Kachel ist ein `<button class="side-row">` (`renderSide`, `onLongPress`) – die Kapseln brauchen eine Hülle daneben (APD-30/W-64);
   `choosePop` nutzt `blockingLayer(() => done(null))` – dort entfällt das Schließen, dazu das Grau.
   - **APD-133/V-1** – den bestätigten Wortlaut in Designrichtlinie 13 nach ‚Kein Scroll-Anker‘ eintragen (nur Text).
3. Nach dem ‚Ja‘: `vorbereiten --ad 4.60.0 --app reiselogbuch=3.57.0`, bauen, Texte, `fassung`, `stufe`, `los` im Hintergrund; Bericht mit Usertest.

## 4. Danach

APD-32 · APD-55 · RLB-6 · APD-1 · APD-70 · APD-30 Kurzmeldung (zurückgestellt) · APD-57 · APD-44 bis APD-60 · APD-134 (Prio 3) · zuletzt APD-80.
Später: nach einem iOS-Update, das `print()` in der App vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein.

```
Reiselogbuch 0120 – APD-30 Wischaktionen, 4.60.0 bauen

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.14.1) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (get_session: eingestellt; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach weiter nach UEBERGABE.md Abschnitt 3 (Bau-Frage für AppDesign 4.60.0 mit Reiselogbuch 3.57.0: APD-30 Wischaktionen mit sperrender Sprechblase und APD-133/V-1 Wortlaut Designrichtlinie 13, Prüflauf voll).
```
