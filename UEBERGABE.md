# Übergabe an die nächste Sitzung

**Stand 15.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0118‘ (Übergabe nach 0 Nr. 13 mit Zustimmung des Nutzers, Kontext etwa 400.000;
der Bau ist **nicht veröffentlicht**) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann
die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.56.2** veröffentlicht (Pages ‚success‘, in 0118 geprüft) · **3.56.3 gebaut, nicht veröffentlicht** (Zweig `vorbereitung-3.56.3`, Commit 5877259) |
| AppDesign | **4.59.2** veröffentlicht (ebenso) · **4.59.3 gebaut, nicht veröffentlicht** (Zweig `vorbereitung-4.59.3`, Commit 76d892f) |
| Zusammenarbeit allgemein | **3.14.1** (auf `main`, in die feste Fassung mit 4.59.3) |
| AppDesign-`CLAUDE.md` | **2.12.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 (in 0118 nicht geholt) |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0119**; die danach 0120.
- **Modell und Aufwand:** 0118 lief mit **Fable 5.2** (`claude-fable-5-2`), eingestellt und tatsächlich, kein `model_fallback`; Aufwand eingestellt
  und tatsächlich ‚mittel‘; `CLAUDE_CODE_EFFORT_LEVEL` nicht gesetzt. `~/.claude/settings.json` = `{}`.
- **Offene Usertests:** keine veröffentlichten. P-106 (2 Testfälle) steht im CHANGELOG der Zweige und wird erst nach der Veröffentlichung gestellt.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1` (github.io ist aus der
  Cloud nicht erreichbar); ein eigenes `node -e` mit Playwright braucht `createRequire('/home/user/ReiseLogBuch/tests/')('playwright')`.
  Einzelne Prüfungen dauern bis zu 3 min – eine Zeitgrenze (`timeout`) darunter sieht wie ein roter Lauf aus (Fehler in 0118).
- **Achtung `main`:** die Backlogs auf `main` zeigen noch ‚5 Punkte bereit‘ und Version 4.59.2 / 3.56.2 – der Stand nach dem Bau steht nur in den
  Zweigen. Auf `main` bis zur Veröffentlichung **nichts an `BACKLOG.md`, `CHANGELOG.md` und den Richtlinien ändern** (sonst Konflikt bei `los`).

## 2. Ergebnisse der Sitzung 0118

- **Der Nutzer wollte statt 4.60.0 (Wischaktionen) zuerst kleine Themen** – Bau-Frage mit ‚Ja‘ beantwortet für **AppDesign 4.59.3 mit Reiselogbuch
  3.56.3** (Korrektur, Prüflauf voll) mit:
  - **APD-85 Teil 6** (Wackler WebKit): `langDruecken` und `menueZu` in `tests/ablauf.mjs`, `ruhe()` gibt null oder ‚Seite nicht zur Ruhe gekommen‘
    zurück (`hig.mjs` – `measure` meldet es), Selbsttest APD-85/F-5; 8 Prüfungen im Reiselogbuch und `tests/kontextmenue.mjs` umgestellt.
    Nicht gelaufen: Gegenprobe APD-85/F-4, Lastnachweis F-7 und F-8.
  - **APD-132** (neu): `checkSchema` lässt die Nummer allein zu, wenn dieselbe Liste davor mit Elternnummer steht (Zusammenarbeit 2.4); Gegenprobe `schema:APD-78/S-2` rot.
  - **APD-131** (neu, Reste aus 0106): Wortlaut `arbeit/APD-131 Reste aus 0106 Wortlaut.md` bestätigt und eingetragen (PROMPT ‚Tage als Kästen‘,
    Designrichtlinie 15.11 VoiceOver-Namen, 16 ‚Cursor am Ende‘, `tests/README.md` beider Repos).
  - **APD-54** (Fremden Text bereinigen, keine allgemeine Regel): `arbeit/APD-54 Befund und Testfall-Liste.md` bestätigt; `index.html` – `esc()` in
    Smiley-Leiste und Sprechblase, `nurEmoji` in `normalize`; neu `tests/ablauf-fremdtext.mjs` (Chromium und WebKit grün, gegen 3.56.2 rot; in den
    übrigen Ansichten keine Lücke).
- **Aufgeräumt (auf `main`):** APD-113 nach ‚Erledigt‘ (ersetzt durch APD-123); `color-mix` am Gerät ist mit P-101/15 belegt.
- **Erster voller Prüflauf rot, nichts veröffentlicht** (158 Läufe, 68:24, Abbruch beim dritten roten) –
  `arbeit/0118 Stand nach dem ersten Prüflauf 4.59.3.md` (im Zweig `vorbereitung-4.59.3`):
  - `kontextmenue-regeln` (iPad) · WebKit: feste Pause in `tests/kontextmenue.mjs` – behoben, allein grün.
  - `kapsel-iphone` · Chromium: Rollbereich fehlte einmal beim ersten Messen von `checkGriff` – Ursache nicht gefunden; `checkGriff` wartet jetzt
    bis 5 s und meldet; allein 5-mal grün.
  - **`ablauf-seitenleiste-hoch` · WebKit (APD-97/L-6): offen → neues Thema APD-133** (im Backlog des Zweigs unter ‚2.‘, Prio 1).

## 3. Nächster Schritt

1. Lesen wie immer, Repo ReiseLogBuch dazuholen, Tests einrichten. **Zweige holen:** in beiden Repos
   `git config --add remote.origin.fetch '+refs/heads/vorbereitung-X:refs/remotes/origin/vorbereitung-X' && git fetch origin &&
   git checkout vorbereitung-X` (AppDesign `vorbereitung-4.59.3`, Reiselogbuch `vorbereitung-3.56.3`). **Nicht `vorbereiten` neu laufen lassen** –
   die Versionen sind schon erhöht. **Lagebild als eigene Antwort – im Chat und als Markdown-Datei – mit Kachel.**
2. **APD-133 klären (ein Thema):** `ablauf-seitenleiste-hoch` in WebKit – iPad hoch, Reiselogbuch ‚Australien‘, oberster Tag 20.08., drehen über
   1000×1000 (80 ms) nach quer und zurück. Gemessen in 0118 (4 Läufe gleichzeitig, 3 Runden): 10 von 12 rot; der Rollbereich steht ganz am Ende
   (quer 2574 = 3329 − 755, hoch 5511 = 6626 − 1115), alle 30 Tage über dem Bild; allein 2 von 3 grün; Chromium grün; schon vor 4.59.3
   (‚wackelte in 0111‘). Die Prüfung druckt den Zustand jetzt selbst (‚Zustand ohne obersten Tag: …‘). Nachstellen:
   `seq 4 | PRUEF_BROWSER=webkit xargs -P4 -I{} sh -c 'node tests/ablauf-seitenleiste-hoch.mjs 2>&1 | grep -E "Zustand|\(webkit\)"'`.
   Vermutung: das Wiederherstellen des obersten Eintrags nach dem Drehen (R-8.1, `ui.js`) trifft unter Last die Zwischengröße. Zuerst Ursache
   suchen (App oder Prüfung/Prüfumgebung), **Befund dem Nutzer vorlegen**; eine Änderung an `ui.js` gehört nicht zur bestätigten Version –
   dafür Testfall-Liste und Frage (in 4.59.3 aufnehmen oder eigene Version).
3. Danach `node werkzeug/veroeffentlichen.mjs stufe --app reiselogbuch` (sagte in 0118 ‚voll‘) und `… los --app reiselogbuch` im Hintergrund;
   nach Änderungen an `v4/` oder `tests/` vorher `… fassung` und committen. Das ‚Ja‘ des Nutzers zum Bau von 4.59.3 / 3.56.3 liegt vor; kommt
   etwas Neues dazu, neu fragen.
4. Nach der Veröffentlichung: Bericht mit Usertest P-106 (CHANGELOG), lokale Vorbereitungs-Zweige löschen.
5. Danach die Bau-Frage für **AppDesign 4.60.0 mit Reiselogbuch 3.57.0** (APD-30 Wischaktionen mit sperrender Sprechblase, Prüflauf voll) –
   Einzelheiten wie in der Übergabe 0117: Testfall-Liste `arbeit/APD-30 Wischaktionen Testfall-Liste.md`, Wortlaut
   `arbeit/APD-30 Wischaktionen Wortlaut.md` (APD-30/V-1 bis V-11, noch nicht in der Designrichtlinie), allgemeine Regel R-7.8. Im Code gelesen
   (0117): die Kachel ist ein `<button class="side-row">` (`renderSide`, `onLongPress`) – die Kapseln brauchen eine Hülle daneben (APD-30/W-64);
   `choosePop` nutzt `blockingLayer(() => done(null))` – dort entfällt das Schließen, dazu das Grau.

## 4. Danach

APD-32 · APD-55 · RLB-6 · APD-1 · APD-70 · APD-30 Kurzmeldung (zurückgestellt) · APD-57 · APD-44 bis APD-60 · zuletzt APD-80. Später: nach einem
iOS-Update, das `print()` in der App vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein.

```
Reiselogbuch 0119 – APD-133 Drehen klären, 4.59.3 veröffentlichen

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.14.1) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (get_session: eingestellt; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein, hole die Zweige vorbereitung-4.59.3 (AppDesign) und vorbereitung-3.56.3 (ReiseLogBuch) wie in UEBERGABE.md Abschnitt 3 und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach weiter nach UEBERGABE.md Abschnitt 3 (APD-133: nach dem Drehen steht der Inhalt in WebKit am Ende – Ursache suchen, Befund vorlegen; dann AppDesign 4.59.3 mit Reiselogbuch 3.56.3 veröffentlichen, Prüflauf voll).
```
