# Übergabe APD-149 – Sitzung ‚AppDesign 0006‘ an ‚AppDesign 0007‘

**Stand 27.11.2026** · geschrieben in ‚AppDesign 0006 – APD-151 Muster Fenster am iPhone wie am iPad‘ bei Kontext 391.226 (`messung.mjs`: ‚⚠ Übergabe fällig‘). Die Übergabe ist automatisch nach 0 Nr. 13, nachdem das Muster gebaut, geprüft und der Bericht geschrieben war.
- Hinweis zur Messung: `get_session` zeigte kurz vorher `context_usage.used_tokens` 185.411. Nach dem Neustart des Arbeitsprozesses liegt die Sitzungsdatei unter `/root/.claude/projects/-home-user/…`. Maßgeblich ist `messung.mjs` (2.2).
- Die Kette Reiselogbuch läuft **parallel**. Zuletzt ist 0169 an 0170 übergeben (`2025bab`, Reiselogbuch 3.59.1 mit RLB-128, eine reine App-Version). Die Vorgabe in Abschnitt 5 gilt weiter.
- Vorige Fassung dieser Datei (0005 → 0006): Git-Verlauf, Commit 9388823.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | 3.59.0 (0170 baut 3.59.1, nur App) |
| AppDesign | 4.71.0; seither auf `main` nur `arbeit/`, `BACKLOG.md`, `UEBERGABE.md` und der Entwurf `katalog/entwurf/presentation-commands.js` |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Chatnummer:** AppDesign-Kette, nächste Sitzung **AppDesign 0007**, danach 0008.
- **Modell und Aufwand:** 0006 lief mit Opus 5.5, Aufwand **hoch**, eingestellt und tatsächlich gleich. Es gab keinen `model_fallback`, und `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt.
  Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** seven_day · **allowed_warning**, setzt am 03.12.2026 um 07:00 UTC zurück (Stand Ende 0006). Zu Beginn von 0006: five_hour · allowed_warning.
- **Hooks:** keine (`~/.claude/settings.json` erlaubt nur `create_session`).
- **Prüfumgebung:** 4 Kerne, Chromium 158 (Verweise 1194 → 1243), WebKit 26.0, Playwright 1.56.1.
- **Offene Usertests:** keine. **Offen ist die Rückmeldung vom Gerät zum Muster APD-151** (Abschnitt 3).
- **Netz:** `github.io` ist gesperrt. Den Stand der Pages über die GitHub-API prüfen.
- **Nächste Version AppDesign** (mit `v5/`): 3 Punkte bereit (APD-149/J-1, APD-152, APD-153).
- **`doku-regeln`** (Stand 8fd6831): alles in Ordnung.

## 2. Ergebnisse der Sitzung 0006

- **Muster APD-151 ‚Fenster am iPhone wie am iPad‘** liegt auf `main` (52ca53d, Pages ‚success‘), mit Bericht und Schritten fürs Gerät: `arbeit/APD-151 0006 Bericht Muster.md` (8fd6831).
  - **Weiche** in `katalog/entwurf/presentation-commands.js`: die Klasse `ad-presentation-sheet` am `#dlg` für die Fenster des Stapels.
    - 10 Funktionen von `ui.js` (`blattBild`, `blattFahre`, `blattAuf`, `blattGeist`, `blattWeg`, `blattLos`, `placeDialogs`, `noetig`, `feldZeigen`, `gemeldet`) werden aus ihrem eigenen Text neu gebaut.
    - Darin fragen `isPhone()`, `blattOben()`, `blattZu()` und `blattDunkel()` über die Weiche. Ohne die Klasse gilt genau v4. `gemeldet` ist am `visualViewport` ausgetauscht.
  - Dazu CSS mit den Maßen des iPad-Fensters und `dlgFest` beim Antippen (Hörer am window). Antippen der Abdunkelung schließt nicht, weil ein Klick-Hörer am window es abfängt.
  - `v4/` ist unverändert.
- **Prüfungen** in `arbeit/APD-149/muster-pruefen.mjs`:
  - **M-1 bis M-17** sind in Chromium und WebKit grün.
  - **Gegenprobe M-18** (`APD151_GEGENPROBE=1`) ist rot wie verlangt: M-1 fünfmal, M-7 einmal.
  - **S-, L- und Gegenprobe S-15** sind grün. Es bleibt nur die bekannte Abweichung R-1.4 (Durchlass, APD-149, auch vor 0006).
  - `entwurf-regeln`, `bean-katalog` (beide Browser) und `doku-regeln` sind grün.
  - Aufrufe: `MUSTER=apd151 node arbeit/APD-149/muster-pruefen.mjs` (nur APD-151, etwa 2 min), ohne Variable alles (etwa 4 min je Browser).
- **Aufgefallen** (Bericht Abschnitt ‚Aufgefallen‘):
  1. **Fehler in v4, auch am iPad:** Nach dem Schließen der Tastatur wird das Fenster bildschirmhoch (Safari-Modell, iPad hoch 454 → 1160 px).
     - Ursache: `gemeldet` gibt jedem Rollbereich vorher Platz.
     - Im Muster ist es behoben: Der Platz fällt weg, wenn der Inhalt passt. M-9 war vorher rot.
     - Vorschlag: mit APD-151 in `v5/` in `ui.js` übernehmen (noch nicht gefragt).
  2. **Antippen neben das Fenster** schließt im Entwurf auch am iPad nicht mehr (aus J-3 Nr. 4). S-10 ist angepasst, Escape fragt weiter.
  3. **Fenster ersetzen (H-3)** gleitet auf beiden Geräten (M-13).
  4. **M-11:** Mit Fokus im Feld bleibt das Fenster nach dem Drehen stehen, wo es ganz sichtbar ist (APD-36, am iPad gleich). Ohne Fokus steht es in der Mitte.
- Die Grundregeln melden am iPhone R-4.5 ‚Fenster nicht bildschirmbreit‘. Das ist erwartet: Der Wrapper in `muster-pruefen.mjs` meldet es als ‚ℹ erwartet‘, bis der Wortlaut mit `v5/` kommt.
- Dateien: `arbeit/APD-149 0006 Lagebild.md`, `arbeit/APD-151 0006 Bericht Muster.md`.

## 3. Nächster Schritt

1. Lesen, dann das Lagebild als eigene Antwort mit Kachel (0 Nr. 15). Tests einrichten wie in der `CLAUDE.md`, ReiseLogBuch dazuholen.
2. **Rückmeldung vom Gerät zum Muster APD-151 erfragen**:
   - Den Bericht `arbeit/APD-151 0006 Bericht Muster.md` vollständig in die Datei neben der Kachel und in den Chat geben (0 Nr. 11). Dazu gehören der Link https://g811141a.github.io/AppDesign/katalog/index.html#presentation und die Schritte 0 bis 15 mit ‚Erwartet‘.
   - Dann das Fenster: „Muster APD-151 am Gerät: alles ok / nicht ok (Nummer) / Ich schreibe im Chat“, ohne Empfehlung.
   - Im selben Fenster als zweite Frage Aufgefallen Nr. 1: „Fehler ‚Fenster nach dem Schließen der Tastatur bildschirmhoch‘ (v4, auch iPad) mit APD-151 in `v5/` beheben?“, mit Empfehlung ‚Ja, mit APD-151 (Empfohlen)‘.
   - Bei ‚nicht ok‘ gilt 0 Nr. 1: den Ablauf als feste Prüfung nachbauen, rot gegen den jetzigen Stand, dann beheben.
3. Nach ‚ok‘ vom Gerät den Wortlaut vorlegen (0 Nr. 29): R-4.6, R-4.5 (‚Fenster bildschirmbreit‘ entfällt), 15.17 und Designrichtlinie 7, dazu der Verweis zu Antippen der Abdunkelung. Eingetragen wird er mit `v5/`.

## 4. Danach

- `v5/` mit APD-145 (Namensraum `AD`, AppDesign 5.0.0). Darin kommen:
  - die Beans `commands` und `presentation` aus dem Entwurf
  - APD-149/J-5 (Wortlaut R-1.4, 15.6, `hig.mjs`)
  - APD-151: die Weiche entfällt, der iPad-Weg gilt in `ui.js` für alle Fenster. Dazu kommen `checkSheet`, `hig.mjs` R-4.5 und R-4.8 sowie im Reiselogbuch `ablauf-blatt` und `ablauf-fenster`, alle umgestellt, und die Korrektur aus Aufgefallen Nr. 1.
  - die bereiten Punkte APD-149/J-1, APD-152, APD-153 und APD-154
- `v5/` entsteht als Kopie des neuesten `v4/` (4.71.0, bzw. neuer, falls bis dahin gebaut). Für APD-149/J-7 den Testfall ‚Navigation schließt alles auf dem Stapel‘ bauen.
- APD-150 löst S-3. APD-148 und APD-142 bauen auf `presentation` und `commands` auf. `recentlydeleted` zieht mit `v5/` um (RLB-126/J-11).
- Nach `v5/` die dauerhafte Regel zu parallelen Ketten klären (`arbeit/APD-149 0004 Parallele Ketten.md`).

## 5. Neue Vereinbarungen

- **Vorgabe des Nutzers (27.11.2026, gilt weiter):** Bis `v5/` fertig ist, schreibt die Kette Reiselogbuch in AppDesign nur ins Backlog. Sie baut keine AppDesign-Version.
  - `v4/`, `tests/`, `werkzeug/`, `katalog/`, Richtlinien und `CLAUDE.md` liegen bei der AppDesign-Kette.
- Keine neuen Regeln in 0006.
- **Vor jedem Commit** `git fetch origin main` ausführen, darauf aufsetzen, auf Konfliktmarken prüfen und sofort hochladen.
- **Katalog am iPhone:** `#presentation` öffnet die Startliste. In Prüfungen die Bean mit `showBean('presentation')` öffnen.

## 6. Starttext für die neue Sitzung

```
AppDesign 0007 – APD-151 Rückmeldung vom Gerät

Lies im Repo g811141a/AppDesign (Branch main) zuerst arbeit/APD-149 Uebergabe.md, dann UEBERGABE.md (nur Lagebild, die Kette Reiselogbuch läuft parallel und schreibt bis v5/ nur ins Backlog), dann die GANZE Zusammenarbeit allgemein (3.19.0) und die Überschriften der Designrichtlinien, dazu arbeit/APD-151 0006 Bericht Muster.md und arbeit/APD-151 Testfall-Liste.md. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL) und ob in ~/.claude/settings.json Hooks stehen; richte die Tests ein, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (ReiseLogBuch dazuholen). Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach arbeit/APD-149 Uebergabe.md Abschnitt 3: den Bericht zum Muster APD-151 mit Link und Schritten vollständig geben und die Rückmeldung vom Gerät erfragen, dazu die Frage zu Aufgefallen Nr. 1; nach ‚ok‘ der Wortlaut nach 0 Nr. 29. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```

**Name der neuen Sitzung:** ‚AppDesign 0007 – APD-151 Rückmeldung vom Gerät‘.
