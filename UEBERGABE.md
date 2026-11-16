# Übergabe an die nächste Sitzung

**Stand 16.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0120‘ (Übergabe mit Zustimmung des Nutzers, Kontext etwa 190.000; die
Konsolidierung bekommt eine eigene Sitzung mit Aufwand hoch) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn
jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.56.3** veröffentlicht (Commit c3c9915, Usertest P-106 alles ok) |
| AppDesign | **4.59.3** veröffentlicht (Pages ‚success‘) |
| Zusammenarbeit allgemein | **3.14.1** |
| AppDesign-`CLAUDE.md` | **2.12.0** |
| ReiseLogBuch-Import (privat) | Commit c747fee (‚1.3.0‘), `CLAUDE.md` 1.1.0 – in 0120 geholt, nichts geändert |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0121**; die danach 0122.
- **Modell und Aufwand:** 0120 lief mit **Fable 5.2** (`claude-fable-5-2`), eingestellt und tatsächlich, kein `model_fallback`; Aufwand
  eingestellt und tatsächlich ‚mittel‘; `CLAUDE_CODE_EFFORT_LEVEL` nicht gesetzt. `~/.claude/settings.json` = `{}`.
  **Der Nutzer hat für die Konsolidierung Fable 5.2 mit Aufwand ‚hoch‘ gewählt (16.11.2026, Sitzung 0120)** – 0121 wird so gestartet.
- **Offene Usertests:** keine.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1` (github.io ist aus der
  Cloud nicht erreichbar); ein eigenes `node -e` mit Playwright braucht `createRequire('/home/user/ReiseLogBuch/tests/')('playwright')`.
  Einzelne Prüfungen dauern bis zu 3 min – eine Zeitgrenze (`timeout`) darunter sieht wie ein roter Lauf aus. `los` führt eine neuere `main`
  in den Vorbereitungs-Zweig zusammen – danach den Zweig hochladen, sonst meldet der Stop-Hook ‚unpushed‘. `npm install` im Ordner
  `werkzeug` von ReiseLogBuch-Import verändert `package-lock.json` – danach `git checkout -- werkzeug/package-lock.json`.

## 2. Ergebnisse der Sitzung 0120

- **Nichts gebaut, keine Version.** Der Nutzer hat die Bau-Frage für 4.60.0 zurückgestellt und eine **Konsolidierung 3 über alle Repos**
  beauftragt – neu im Backlog als **APD-135** (Prio 1, offen).
- **Auftrag (Nutzer 16.11.2026):** alle Regeln durchgehen, gegeneinander abgleichen, Mehrgleisigkeiten entfernen, die Reihenfolge der
  Regelprüfungen prüfen, Einsparungen beim Bau einer Version suchen. **Oberste Priorität: die Wahrscheinlichkeit eines Fehlers darf nicht
  steigen**, nichts Entferntes darf später in einer App oder einem Repo einen Querschlag auslösen. Dazu: die Bausteine in AppDesign wie
  gekapselte Klassen behandeln – ein unveränderter Baustein wird beim Bau nicht jedes Mal vollständig geprüft, in der App nur sein Ergebnis;
  wird ein Baustein geändert, wird er intensiv geprüft. Jede weitere App nutzt dieselben Bausteine (Wischaktionen, Untermenüs, sperrende
  graue Abfrage) mit demselben Aussehen und Verhalten.
- **Umfang und Entscheidungen** stehen in `arbeit/APD-135 Konsolidierung 3 Vorschlag.md` (Abschnitt H): Auftrag A, Paket 1 Prüfungen und
  Bauzeit (mit APD-134), Paket 2 Lesekosten und Ablage, Paket 3 Backlog, Import, Code, Paket 4 gekapselte Bausteine **APD-135/B-1 bis B-5
  mit Umbau von `ui.js`** (Claude hatte B-5 nicht empfohlen, der Nutzer hat ihn gewählt); Reihenfolge **Befund → 4.60.0 (APD-30) → Bau der
  Konsolidierung in kleinen Versionen**; neue Sitzung mit Aufwand hoch.
- **Erste Befunde aus dem Code (0120 gelesen):** `v4/ui.js` ist ein klassisches Skript mit 3.325 Zeilen und 169 globalen Funktionen, rund
  20 Hörer auf `resize`, geteilter Zustand; AppDesign hat keine Seite, auf der Bausteine allein laufen (`vorlage/index.html` wird nur als
  Text gelesen); die Stufe kennt nur ‚Text‘ oder ‚voll‘ (`werkzeug/pruefstufe.mjs`); die Kachel der Seitenleiste baut die App selbst
  (`renderSide`); `choosePop` schließt heute noch beim Tippen daneben (sperrend und grau erst mit APD-30).

## 3. Nächster Schritt

1. Lesen wie immer, Repos ReiseLogBuch und ReiseLogBuch-Import dazuholen, Tests einrichten. **Lagebild als eigene Antwort – im Chat und
   als Markdown-Datei – mit Kachel.**
2. **Befund und Plan zu APD-135 – nur lesen und messen, nichts bauen.** Ergebnis: eine Datei ‚APD-135 Konsolidierung 3 Befund und Plan‘
   im Ordner `arbeit` mit
   - Liste der Mehrgleisigkeiten und Widersprüche über alle Regeldateien (Zusammenarbeit, Designrichtlinie allgemein mit Katalog,
     Designrichtlinie Reiselogbuch, beide `PROMPT.md`, alle drei `CLAUDE.md`, `ERKENNTNISSE.md`), mit Wortlaut alt und neu (0 Nr. 29);
   - Tabelle Prüfung → Baustein → Regel, gemessen mit `--abdeckung`; Laufzeit je Prüfung; Vorschlag für neue Stufen (‚App‘, ‚Baustein‘);
   - Karte der Bausteine in `ui.js` (in sich geschlossen oder greift in die Seite ein) und Plan für B-3 bis B-5 in kleinen Schritten;
   - Nachweis-Tabelle ‚stand in … → steht jetzt in … → geprüft durch …‘, Einsparung in Minuten und Risiko je Vorschlag;
   - jeder Punkt einzeln zum Entscheiden im Auswahlfenster. Die Sicherheitsregeln stehen im Vorschlag, Abschnitt B.
3. **Danach Bau-Frage für AppDesign 4.60.0 mit Reiselogbuch 3.57.0** (Nebenversion, Prüflauf voll) mit den 2 bereiten Punkten:
   - **APD-30** Wischaktionen mit sperrender Sprechblase: Testfall-Liste `arbeit/APD-30 Wischaktionen Testfall-Liste.md`, Wortlaut
     `arbeit/APD-30 Wischaktionen Wortlaut.md` (APD-30/V-1 bis V-11, noch nicht in der Designrichtlinie), allgemeine Regel R-7.8. Im Code
     gelesen (0117): die Kachel ist ein `<button class="side-row">` (`renderSide`, `onLongPress`) – die Kapseln brauchen eine Hülle daneben
     (APD-30/W-64); `choosePop` nutzt `blockingLayer(() => done(null))` – dort entfällt das Schließen, dazu das Grau.
   - **APD-133/V-1** – den bestätigten Wortlaut in Designrichtlinie 13 nach ‚Kein Scroll-Anker‘ eintragen (nur Text).
4. Nach dem ‚Ja‘: `vorbereiten --ad 4.60.0 --app reiselogbuch=3.57.0`, bauen, Texte, `fassung`, `stufe`, `los` im Hintergrund; Bericht mit
   Usertest. Danach die Konsolidierung in kleinen Versionen, jede nach eigener Bau-Frage.

## 4. Danach

APD-32 · APD-55 · RLB-6 · APD-1 · APD-70 · APD-30 Kurzmeldung (zurückgestellt) · APD-57 · APD-44 bis APD-60 · zuletzt APD-80. APD-134 läuft
mit APD-135 (Paket 1). Später: nach einem iOS-Update, das `print()` in der App vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124)
entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign**, **ReiseLogBuch** und **ReiseLogBuch-Import** verfügbar sein.

```
Reiselogbuch 0121 – Konsolidierung 3 Befund

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.14.1) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (get_session: eingestellt; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL), hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach weiter nach UEBERGABE.md Abschnitt 3 (Befund und Plan zu APD-135 Konsolidierung 3 nach arbeit/APD-135 Konsolidierung 3 Vorschlag.md – nur lesen und messen, nichts bauen; danach Bau-Frage für AppDesign 4.60.0 mit Reiselogbuch 3.57.0).
```
