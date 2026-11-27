# Übergabe APD-149 – Sitzung ‚AppDesign 0005‘ an ‚AppDesign 0006‘

**Stand 27.11.2026** · geschrieben in ‚AppDesign 0005 – APD-151 Muster Stufen am iPhone‘ bei Kontext 281.887 (`messung.mjs`). Übergabe vom Nutzer im Fenster bestätigt, nach dem Klären von APD-151.
- Die Kette Reiselogbuch läuft **parallel**, zurzeit Reiselogbuch 0169 (`session_01HyGMKPwyJeAsB4cAWW9HVG`). Sie arbeitet an APD-154 und RLB-128. Die Vorgabe in Abschnitt 5 hat sie übernommen.
- Vorige Fassung dieser Datei (0004 → 0005): Git-Verlauf, Commit 588cacc.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | 3.59.0 |
| AppDesign | 4.71.0; seither auf `main` nur `arbeit/`, `BACKLOG.md` und ein Kommentar in `katalog/entwurf/presentation-commands.js` |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Chatnummer:** AppDesign-Kette, nächste Sitzung **AppDesign 0006**, danach 0007.
- **Modell und Aufwand:** 0005 lief mit Opus 5.5, Aufwand **hoch**, eingestellt und tatsächlich gleich. Es gab keinen `model_fallback`, und `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt.
  Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** seven_day · **allowed_warning**, setzt am 03.12.2026 um 07:00 UTC zurück (Stand Beginn 0005).
- **Hooks:** keine (`~/.claude/settings.json` erlaubt nur `create_session`).
- **Prüfumgebung:** 4 Kerne, Chromium 158 (Verweise 1194 → 1243), WebKit 26.0, Playwright 1.56.1.
- **Offene Usertests:** keine.
- **Netz:** `github.io` ist gesperrt. Den Stand der Pages über die GitHub-API prüfen.
- **Nächste Version AppDesign** (mit `v5/`): 3 Punkte bereit (APD-149/J-1, APD-152, APD-153).
- **`doku-regeln`** (Stand c4c0632): 2 Fehler, beide in der `UEBERGABE.md` der Kette Reiselogbuch (Z. 41 ‚W-97‘ ohne Elternnummer, Z. 59 alte Nummer). 0169 weiß davon.

## 2. Ergebnisse der Sitzung 0005

- **Kette Reiselogbuch:**
  - 0169 hat die Vorgabe übernommen: keine Bau-Frage, keine Zweige 4.71.1 / 3.59.1.
  - Der Nutzer hat dort ‚APD-154 klären‘ gewählt und für RLB-128 eine reine App-Version erlaubt.
- **APD-151 Apple-Abgleich** mit Quellen dieser Sitzung: `arbeit/APD-151 Apple-Abgleich und Testfall-Liste.md` Abschnitt 2.
  - Gelesen: HIG ‚Sheets‘ (24.03.2026), UIKit `UISheetPresentationController`, SwiftUI `presentationDetents`, ‚Adopting Liquid Glass‘.
  - Der Vorschlag mit Stufen (Abschnitt 3 und 4 dort) **entfällt**.
- **APD-151/J-2** (Nutzer, im Fenster): „Kannst du es einfach so bauen wie auf dem ipad?“
  - Am iPhone ist jedes Fenster außer Meldungen so hoch wie sein Inhalt und steht **in der Mitte wie am iPad**.
  - Keine Stufen, kein Griff, keine neue Option.
  - Bewusste Abweichungen von Apple: Blätter liegen am iPhone bei Apple unten an, Fenster zum Schreiben sind dort groß.
  - Datei: `arbeit/APD-151 Rueckfrage wie am iPad.md`.
- **APD-151/J-3** (Nutzer, im Fenster): Breite 90 % (R-4.8 unverändert), quer wie hoch, Tastatur wie am iPad, Antippen der Abdunkelung schließt nicht.
  Datei: `arbeit/APD-151 Klaerung J-2.md`.
- **Testfall-Liste APD-151/M-1 bis M-18 freigegeben** (Nutzer, im Fenster): `arbeit/APD-151 Testfall-Liste.md`.
- **Fehler von mir, berichtigt:** cc5e51e brachte Konfliktmarken in `BACKLOG.md` auf `main`, weil 0169 gleichzeitig APD-154 geändert hatte.
  - Berichtigt in 281b5ca, beide Zeilen sind erhalten, und 0169 wurde informiert.
  - **Lehre:** Nach `git stash pop` bzw. `rebase` alles mit `&&` anhängen und vor jedem Commit `grep -c '^<<<<<<<' BACKLOG.md` ausführen.
- Dateien: `arbeit/APD-149 0005 Lagebild.md`, `… 0005 Stand.md`, `… 0005 RLB-Backlog.md`, `arbeit/APD-151 Apple-Abgleich und Testfall-Liste.md`, `… Rueckfrage wie am iPad.md`, `… Klaerung J-2.md`, `… Testfall-Liste.md`.

## 3. Nächster Schritt

1. Lesen, dann das Lagebild als eigene Antwort mit Kachel (0 Nr. 15). Tests einrichten wie in der `CLAUDE.md`, ReiseLogBuch dazuholen.
2. **Muster APD-151 ‚Fenster am iPhone wie am iPad‘** im Entwurf (`katalog/entwurf/presentation-commands.js`):
   - **Weiche:** Für die Fenster der Vorführung schaltet sie das Blatt im iPhone-Aufbau ab. Sie sitzt um `isPhone()` in `placeDialogs`, `blattOben`, `blattBild`, `blattZu` und `blattDunkel` (v4/ui.js ab Z. 3375 bzw. 3621).
     - Funktionsdeklarationen in `ui.js` sind global und lassen sich ersetzen. `let`-Variablen wie `blattY` und `blattZug` lassen sich aus einem anderen klassischen Skript lesen und setzen, `const` lässt sich nicht ersetzen.
     - `v4/` bleibt unverändert.
   - **Iphone-CSS umgehen:** `html.phone dialog#dlg` (v4/design.css Z. 808) macht das Blatt 100 % breit, mit `height: var(--dlg-max)` und Ecken nur oben. Für die Fenster der Vorführung braucht das Muster eine eigene Klasse mit den iPad-Werten.
   - **Abdunkelung:** Das Antippen schließt am iPhone heute über `blattDraussen` und `isPhone()`. Künftig schließt es nicht.
   - **Prüfungen:** Feste Prüfungen M-1 bis M-18 in `arbeit/APD-149/muster-pruefen.mjs`, in Chromium und WebKit, Gegenprobe `__adPresentationGegenprobe = 'blatt'`. Dazu `tests/katalog.mjs` und `bean-katalog` grün.
   - **Ausprobieren am Gerät:** mit Bericht nach 0 Nr. 11 (vollständiger Link, nummerierte Schritte mit ‚Erwartet‘).
3. Nach ‚ok‘ vom Gerät den Wortlaut für R-4.6, 15.17 und Designrichtlinie 7 vorlegen (0 Nr. 29). Eingetragen wird er mit `v5/`.

## 4. Danach

- `v5/` mit APD-145 (Namensraum `AD`, AppDesign 5.0.0). Darin kommen:
  - die Beans `commands` und `presentation` aus dem Entwurf
  - APD-149/J-5 (Wortlaut R-1.4, 15.6, `hig.mjs`)
  - APD-151 (Fenster am iPhone wie am iPad, dazu `checkSheet` und Reiselogbuch `ablauf-blatt`, `ablauf-fenster` umstellen)
  - die bereiten Punkte APD-149/J-1, APD-152, APD-153 und APD-154
- `v5/` entsteht als Kopie des neuesten `v4/` (4.71.0). Für APD-149/J-7 den Testfall ‚Navigation schließt alles auf dem Stapel‘ bauen.
- APD-150 löst S-3. APD-148 und APD-142 bauen auf `presentation` und `commands` auf. `recentlydeleted` zieht mit `v5/` um (RLB-126/J-11).
- Nach `v5/` die dauerhafte Regel zu parallelen Ketten klären (`arbeit/APD-149 0004 Parallele Ketten.md`).

## 5. Neue Vereinbarungen

- **Vorgabe des Nutzers (27.11.2026, gilt weiter):** Bis `v5/` fertig ist, schreibt die Kette Reiselogbuch in AppDesign nur ins Backlog. Sie baut keine AppDesign-Version.
  - Für RLB-128 hat der Nutzer in 0169 eine **reine App-Version** des Reiselogbuchs erlaubt.
  - `v4/`, `tests/`, `werkzeug/`, `katalog/`, Richtlinien und `CLAUDE.md` liegen bei der AppDesign-Kette.
- **APD-151/J-2 und J-3** (siehe Abschnitt 2). Der Wortlaut der Regeln kommt nach dem Muster (0 Nr. 29).
- **Vor jedem Commit** `git fetch origin main` ausführen, darauf aufsetzen, auf Konfliktmarken prüfen und sofort hochladen.

## 6. Starttext für die neue Sitzung

```
AppDesign 0006 – APD-151 Muster Fenster am iPhone wie am iPad

Lies im Repo g811141a/AppDesign (Branch main) zuerst arbeit/APD-149 Uebergabe.md, dann UEBERGABE.md (nur Lagebild, die Kette Reiselogbuch läuft parallel und schreibt bis v5/ nur ins Backlog), dann die GANZE Zusammenarbeit allgemein (3.19.0) und die Überschriften der Designrichtlinien, dazu arbeit/APD-151 Testfall-Liste.md, arbeit/APD-151 Rueckfrage wie am iPad.md und arbeit/APD-151 Klaerung J-2.md. Das Muster entsteht in katalog/entwurf/presentation-commands.js, die Prüfungen in arbeit/APD-149/muster-pruefen.mjs. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL) und ob in ~/.claude/settings.json Hooks stehen; richte die Tests ein, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (ReiseLogBuch dazuholen). Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach arbeit/APD-149 Uebergabe.md Abschnitt 3: Muster APD-151 mit festen Prüfungen M-1 bis M-18 (Chromium und WebKit, Gegenprobe), dann Ausprobieren am Gerät mit Bericht. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```

**Name der neuen Sitzung:** ‚AppDesign 0006 – APD-151 Muster Fenster am iPhone wie am iPad‘.
