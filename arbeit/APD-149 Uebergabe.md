# Übergabe APD-149 – Sitzung ‚AppDesign 0007‘ an ‚AppDesign 0008‘

**Stand 27.11.2026** · geschrieben in ‚AppDesign 0007 – APD-151 Rückmeldung vom Gerät‘ bei Kontext 202.698 (`messung.mjs`). Die Übergabe ist vorgezogen nach 0 Nr. 13: Das Thema der Sitzung ist abgeschlossen, und der Bau von `v5/` braucht eine frische Sitzung (Nutzer 27.11.2026, im Fenster).
- Die Kette Reiselogbuch läuft **parallel**. 0170 hat Reiselogbuch **3.59.1** (RLB-128) veröffentlicht (ReiseLogBuch `main` `d1e19d0`, 198 Läufe grün, Pages ‚success‘; Nachricht an 0007). AppDesign blieb dabei unverändert. Die Vorgabe in Abschnitt 5 gilt weiter.
- Vorige Fassung dieser Datei (0006 → 0007): Git-Verlauf, Commit afc439b.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.59.1** (veröffentlicht von 0170) |
| AppDesign | 4.71.0; seither auf `main` nur `arbeit/`, `BACKLOG.md`, `UEBERGABE.md` und der Entwurf `katalog/entwurf/presentation-commands.js` |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Chatnummer:** AppDesign-Kette, nächste Sitzung **AppDesign 0008**, danach 0009.
- **Modell und Aufwand:** 0007 lief mit Opus 5.5, Aufwand **hoch**, eingestellt und tatsächlich gleich. Es gab keinen `model_fallback`, und `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt.
  Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** seven_day · **allowed_warning**, setzt am 03.12.2026 um 07:00 UTC zurück (Stand Beginn 0007).
- **Sitzungskette:** `get_session` meldete in 0007 `lineage` Tiefe 7 von höchstens 8. 0008 ist damit vermutlich die letzte Sitzung, die `create_session` starten kann. Danach öffnet der Nutzer den neuen Chat selbst und fügt den Starttext ein (2.5).
- **Hooks:** keine (`~/.claude/settings.json` erlaubt nur `create_session`).
- **Prüfumgebung:** 4 Kerne, Chromium 158 (Verweise 1194 → 1243), WebKit 26.0, Playwright 1.56.1.
- **Offene Usertests:** keine.
- **Netz:** `github.io` ist gesperrt. Den Stand der Pages über die GitHub-API prüfen.
- **Nächste Version AppDesign** (mit `v5/`): **4 Punkte bereit** (APD-149/J-1, APD-151, APD-152, APD-153).
- **`doku-regeln`** (Stand 25ad6e9): alles in Ordnung.

## 2. Ergebnisse der Sitzung 0007

- **Muster APD-151 am Gerät: alles ok** (Nutzer 27.11.2026, im Fenster, Schritte 0 bis 15 aus `arbeit/APD-151 0007 Bericht Muster.md`).
- **Aufgefallen Nr. 1** (Fenster nach dem Schließen der Tastatur bildschirmhoch, v4, auch am iPad): **wird mit APD-151 in `v5/` behoben** (Nutzer, im Fenster).
- **Wortlaut freigegeben** (Nutzer, im Fenster): R-4.6, R-4.5, 15.17, Designrichtlinie 7 und die abhängigen Stellen (3, 10, 13, 15.22, R-1.4, R-1.12, Prüfspalte R-4.8) – `arbeit/APD-151 0007 Wortlaut.md`.
  - Eingetragen wird er **mit `v5/`**. Die Nummern in der Spalte ‚Prüfung‘ und die Namen der Technik (15.17 ‚Technisch‘) werden beim Bau festgelegt.
  - Die Prüfung R-4.5 ‚Fenster nicht bildschirmbreit‘ am iPhone in `tests/hig.mjs:654–656` entfällt, R-4.8 (`masseStile`) prüft dann auch am iPhone.
  - Grobentwurf H-9 (‚Tippen außerhalb‘) beim Bau der Bean `presentation` anpassen.
- **Backlog:** APD-151 steht in ‚0. Nächste Version‘, bereit seit 27.11.2026.
- Dateien: `arbeit/APD-149 0007 Lagebild.md`, `arbeit/APD-151 0007 Bericht Muster.md`, `arbeit/APD-151 0007 Wortlaut.md`, `arbeit/APD-151 0007 Stand.md`.

## 3. Nächster Schritt

1. Lesen, dann das Lagebild als eigene Antwort mit Kachel (0 Nr. 15). Tests einrichten wie in der `CLAUDE.md`, ReiseLogBuch dazuholen.
2. **Vorbereitung `v5/` (AppDesign 5.0.0)** mit APD-145 (Namensraum `AD`). Inhalt wie in Abschnitt 4.
   - Zuerst für jeden Punkt prüfen, ob eine freigegebene Testfall-Liste vorliegt (0 Nr. 1), und fehlende vorlegen. In 0007 fand ich für APD-145 keine eigene Datei `arbeit/APD-145 …` (nur `arbeit/0150 APD-145 APD-142 RLB-126 Klaerung.md`); das Backlog bis ‚Erledigt‘ und die Testfall-Listen genau lesen.
   - Dann die **Bau-Frage** (0 Nr. 21): AppDesign 5.0.0 mit Reiselogbuch (Heben auf 5.0.0 nur nach Rückfrage, R-10.3), Prüflauf **voll**. Vorher `node werkzeug/veroeffentlichen.mjs stufe --app reiselogbuch`.
   - Die Kette Reiselogbuch vor `vorbereiten` per `send_message` informieren (Abschnitt 5).

## 4. Danach (Inhalt von `v5/`)

- `v5/` mit APD-145 (Namensraum `AD`, AppDesign 5.0.0). Darin kommen:
  - die Beans `commands` und `presentation` aus dem Entwurf
  - APD-149/J-5 (Wortlaut R-1.4, 15.6, `hig.mjs`)
  - APD-151: Die Weiche entfällt, der iPad-Weg gilt in `ui.js` für alle Fenster. Dazu kommen `checkSheet`, `hig.mjs` R-4.5 und R-4.8 sowie im Reiselogbuch `ablauf-blatt` und `ablauf-fenster`, alle umgestellt, die Korrektur aus Aufgefallen Nr. 1 und der freigegebene Wortlaut (`arbeit/APD-151 0007 Wortlaut.md`). Die Tageserfassung im Reiselogbuch zeigt am iPhone, ob M-3 und M-8 dort gelten.
  - die bereiten Punkte APD-149/J-1, APD-152, APD-153 und APD-154
- `v5/` entsteht als Kopie des neuesten `v4/` (4.71.0). Für APD-149/J-7 den Testfall ‚Navigation schließt alles auf dem Stapel‘ bauen.
- APD-150 löst S-3. APD-148 und APD-142 bauen auf `presentation` und `commands` auf. `recentlydeleted` zieht mit `v5/` um (RLB-126/J-11).
- Nach `v5/` die dauerhafte Regel zu parallelen Ketten klären (`arbeit/APD-149 0004 Parallele Ketten.md`).

## 5. Neue Vereinbarungen

- **Vorgabe des Nutzers (27.11.2026, gilt weiter):** Bis `v5/` fertig ist, schreibt die Kette Reiselogbuch in AppDesign nur ins Backlog. Sie baut keine AppDesign-Version.
  - `v4/`, `tests/`, `werkzeug/`, `katalog/`, Richtlinien und `CLAUDE.md` liegen bei der AppDesign-Kette.
- Keine neuen Regeln in 0007 (der Wortlaut APD-151 ist freigegeben, aber erst mit `v5/` in Kraft).
- **Vor jedem Commit** `git fetch origin main` ausführen, darauf aufsetzen, auf Konfliktmarken prüfen und sofort hochladen.
- **Katalog am iPhone:** `#presentation` öffnet die Startliste. In Prüfungen die Bean mit `showBean('presentation')` öffnen.

## 6. Starttext für die neue Sitzung

```
AppDesign 0008 – v5/ (AppDesign 5.0.0)

Lies im Repo g811141a/AppDesign (Branch main) zuerst arbeit/APD-149 Uebergabe.md, dann UEBERGABE.md (nur Lagebild, die Kette Reiselogbuch läuft parallel und schreibt bis v5/ nur ins Backlog), dann die GANZE Zusammenarbeit allgemein (3.19.0) und die Überschriften der Designrichtlinien, dazu arbeit/APD-151 0007 Wortlaut.md und BACKLOG.md bis ‚## Erledigt‘. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info und lineage; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL) und ob in ~/.claude/settings.json Hooks stehen; richte die Tests ein, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (ReiseLogBuch dazuholen). Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach arbeit/APD-149 Uebergabe.md Abschnitt 3: Testfall-Listen aller Punkte von v5/ prüfen, fehlende vorlegen, dann die Bau-Frage für AppDesign 5.0.0 (Prüflauf voll). Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```

**Name der neuen Sitzung:** ‚AppDesign 0008 – v5/ (AppDesign 5.0.0)‘.
