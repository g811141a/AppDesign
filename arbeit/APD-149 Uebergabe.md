# Übergabe APD-149 – Sitzung ‚AppDesign 0008‘ an ‚AppDesign 0009‘

**Stand 27.11.2026** · geschrieben in ‚AppDesign 0008 – v5/ (AppDesign 5.0.0)‘ bei Kontext 246.500 (`messung.mjs`). Die Übergabe ist vorgezogen (0 Nr. 13): Die Bau-Frage ist beantwortet, und der Bau braucht eine frische Sitzung (Nutzer 27.11.2026, im Fenster: „Ja, in AppDesign 0009“).
- Vorige Fassung dieser Datei (0007 → 0008): Git-Verlauf, Commit 8b0a7ee.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.59.1** veröffentlicht; **3.59.2** (RLB-129) baut gerade die Kette Reiselogbuch (0171, `vorbereiten` gelaufen) |
| AppDesign | 4.71.0; seither auf `main` nur `arbeit/`, `BACKLOG.md`, `UEBERGABE.md` und der Entwurf `katalog/entwurf/presentation-commands.js` |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Chatnummer:** AppDesign-Kette, nächste Sitzung **AppDesign 0009**, danach 0010.
- **Modell und Aufwand:** 0008 lief mit Opus 5.5, Aufwand **hoch**, eingestellt und tatsächlich gleich, kein `model_fallback`, `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt. Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** seven_day · **allowed_warning**, setzt am 03.12.2026 um 07:00 UTC zurück.
- **Sitzungskette:** `lineage` Tiefe 8 von 8 – 0008 konnte 0009 nicht starten. **Der Nutzer öffnet den neuen Chat selbst** in derselben Umgebung (Opus 5.5, Aufwand hoch) und fügt den Starttext ein.
- **Hooks:** keine (`~/.claude/settings.json` erlaubt nur `create_session`).
- **Prüfumgebung:** 4 Kerne, Chromium 158 (Verweise 1194 → 1243), WebKit 26.0, Playwright 1.56.1; `lauf-selbsttest` grün.
- **Offene Usertests (AppDesign):** keine. Im Reiselogbuch kommt mit 3.59.2 ein Usertest (P-128) dazu – Stand in `UEBERGABE.md` der Kette Reiselogbuch.
- **Netz:** `github.io` ist gesperrt; Pages über die GitHub-API.
- **Nächste Version AppDesign 5.0.0: 7 Punkte bereit** (APD-149/J-1, APD-152, APD-153, APD-151, APD-145, APD-149 Beans, APD-154).

## 2. Ergebnisse der Sitzung 0008

- **Testfall-Listen aller Punkte von `v5/` geprüft**, Fehlendes vorgelegt und freigegeben (Nutzer 27.11.2026, im Fenster) – `arbeit/APD-149 0008 Testfall-Listen v5.md`:
  - **APD-145/J-3:** Wortlaut R-1.14, R-1.13, Designrichtlinie 14, 15, R-10.3, R-10.9 und `CLAUDE.md` (→ 2.15.0) freigegeben.
  - **APD-145/J-4:** alle deutschen Namen der Schnittstelle mit ihren Schlüsseln englisch – 23 App-Namen, ihre Optionsschlüssel und 15 Namen im Teil `pruefungen` (Tabelle Abschnitt 2.2).
  - **APD-154/J-1:** Wortlaut Spalte Prüfung R-8.1 freigegeben.
  - **APD-149/J-9:** Das Reiselogbuch nutzt `commands` und `presentation` in `v5/` noch nicht.
  - **Testfall-Listen freigegeben:** APD-145/T-1 bis T-13, APD-149/S-10 (geändert), S-17, S-18, APD-151/M-17 bis M-20.
- **Bau-Frage beantwortet:** **Ja** – AppDesign 5.0.0 mit Reiselogbuch 3.60.0 (gehoben auf 5.0.0), Prüflauf **voll**, Bau in AppDesign 0009 (Nutzer 27.11.2026, im Fenster) – `arbeit/APD-149 0008 Bau-Frage.md`.
- **Backlog:** APD-145, ‚APD-149 (Beans)‘ und APD-154 stehen in ‚0. Nächste Version‘ (7 Punkte bereit, `e2ae23d`).
- **Nachrichten der Kette Reiselogbuch:** 0170 (P-127 fehlgeschlagen, RLB-129) und 0171 (baut 3.59.2; laut 0171 will der Nutzer die Ketten zusammenführen – erst 3.59.2, dann übergibt 0171 an die Kette AppDesign; die Übernahme bestätigt der Nutzer selbst).
- Dateien: `arbeit/APD-149 0008 Lagebild.md`, `arbeit/APD-149 0008 Testfall-Listen v5.md`, `arbeit/APD-149 0008 Bau-Frage.md`.

## 3. Nächster Schritt

1. Lesen (Starttext), Tests einrichten, Lagebild als eigene Antwort mit Kachel (0 Nr. 15). Dabei prüfen, ob Reiselogbuch 3.59.2 auf `main` ist und die Pages ‚success‘ melden, und den Stand aus `UEBERGABE.md` (Kette Reiselogbuch) übernehmen.
2. **Bau AppDesign 5.0.0 / Reiselogbuch 3.60.0** – das Ja liegt vor (0 Nr. 21), erst nach 3.59.2 auf `main`:
   - Zweige `vorbereitung-5.0.0` (AppDesign) und `vorbereitung-3.60.0` (Reiselogbuch); vor `vorbereiten` die Kette Reiselogbuch per `send_message` informieren, falls sie noch läuft.
   - **Das Veröffentlichungs-Skript kennt nur `v4/`** (`werkzeug/veroeffentlichen.mjs` Zeilen 49, 104–105, 108, 118, 131–132, 281, 358). Zuerst `v5/` als Kopie von `v4/` anlegen und Skript und Selbsttest auf `v5/` umstellen (APD-145/T-12), dann `vorbereiten --ad 5.0.0 --app reiselogbuch=3.60.0`.
   - Inhalt nach `arbeit/APD-149 0008 Bau-Frage.md` und den freigegebenen Listen: APD-145 (Namensraum `AD`, Namen nach Tabelle 2.2, Prüfungen und Richtlinien auf `v5/`), Beans aus `katalog/entwurf/presentation-commands.js` nach `v5/ui.js` mit Liste 15 und Katalogdateien, APD-149/J-1, J-5, J-7, APD-151 (Weiche entfällt, Wortlaut `arbeit/APD-151 0007 Wortlaut.md`), APD-152, APD-153 (Stellen in `v5/`), APD-154, `recentlydeleted` unter `AD`.
   - **Feste Prüfungen rot gegen 4.71.0 / 3.59.x** (0 Nr. 1): APD-151/M-19, APD-154/T-5 bis T-8, die freigegebenen roten Fälle von APD-152.
   - Die freigegebenen Erwartungen gelten wörtlich; lässt sich eine nicht halten, vorher fragen.
   - CHANGELOG mit Testfällen (Usertest P-n, /0 Version: Reiselogbuch 3.60.0, AppDesign 5.0.0), Backlog, Versionsgeschichten; `stufe` vor `los` (erwartet: voll), dann `los` im Hintergrund.
   - Prüfseite und Katalog am iPhone: `#presentation` öffnet die Startliste; in Prüfungen die Bean mit `showBean('presentation')` öffnen.
3. Nach ‚fertig‘ Bericht mit Usertest (0 Nr. 11).
4. **Achtung Kontext:** Der Bau ist groß. Bei ‚⚠ Übergabe fällig‘ erst nach dem laufenden Schritt übergeben, nie mitten im Prüflauf (0 Nr. 13).

## 4. Danach

- APD-150 löst S-3. APD-148 und APD-142 bauen auf `presentation` und `commands` auf; dann stellt die App auf die Beans um (APD-149/J-9).
- Nach `v5/` die dauerhafte Regel zu parallelen Ketten klären (`arbeit/APD-149 0004 Parallele Ketten.md`), mit der Zusammenführung der Ketten.
- Hinweis aus 0170: RLB-129 zeigt, dass die Drehprüfung auch mit der Lage vor dem ersten Drehen vergleichen muss (bei APD-154 mitprüfen).

## 5. Neue Vereinbarungen

- Keine neuen Regeln in Kraft. Der freigegebene Wortlaut (APD-151, APD-145/J-3, APD-154/J-1, APD-149/J-5) gilt erst mit `v5/`.
- **Vorgabe parallele Ketten** gilt bis `v5/` fertig ist: Die Kette Reiselogbuch schreibt in AppDesign nur ins Backlog; reine Reiselogbuch-Versionen mit AppDesign 4.71.0 sind erlaubt.
- **Vor jedem Commit** `git fetch origin main`, darauf aufsetzen, auf Konfliktmarken prüfen, sofort hochladen.

## 6. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (ReiseLogBuch holt die Sitzung mit `add_repo` dazu).

```
AppDesign 0009 – Bau v5/ (AppDesign 5.0.0)

Lies im Repo g811141a/AppDesign (Branch main) zuerst arbeit/APD-149 Uebergabe.md, dann UEBERGABE.md (Stand der Kette Reiselogbuch, Reiselogbuch 3.59.2 mit RLB-129), dann die GANZE Zusammenarbeit allgemein (3.19.0) und die Überschriften der Designrichtlinien, dazu arbeit/APD-149 0008 Bau-Frage.md, arbeit/APD-149 0008 Testfall-Listen v5.md, arbeit/APD-151 0007 Wortlaut.md und BACKLOG.md bis ‚## Erledigt‘. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info und lineage; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL) und ob in ~/.claude/settings.json Hooks stehen; hole g811141a/ReiseLogBuch dazu und richte die Tests ein, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach arbeit/APD-149 Uebergabe.md Abschnitt 3: Bau AppDesign 5.0.0 mit Reiselogbuch 3.60.0 (Ja des Nutzers liegt vor, Sitzung AppDesign 0008), erst wenn Reiselogbuch 3.59.2 auf main ist; Prüflauf voll. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```

**Name der neuen Sitzung:** ‚AppDesign 0009 – Bau v5/ (AppDesign 5.0.0)‘.
