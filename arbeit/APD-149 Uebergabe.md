# Übergabe APD-149 – Sitzung ‚AppDesign 0001‘ an ‚AppDesign 0002‘

**Stand 27.11.2026** · geschrieben in ‚AppDesign 0001 – APD-149 Muster im Bean-Katalog‘ bei Kontext 241.700 (`messung.mjs`). Übergabe vor dem Muster,
weil es nicht sicher bis 300.000 passt (Nutzer im Fenster, APD-149/J-4).
- Die Kette Reiselogbuch läuft **parallel**: Sitzung 0167 baut AppDesign 4.71.0 / Reiselogbuch 3.59.0 mit RLB-126. Deshalb steht diese Übergabe hier
  und nicht in `UEBERGABE.md`. Die Hauptübergabe schreibt die Kette Reiselogbuch.
- Vorige Fassung dieser Datei (Konzept-Chat → 0001): Git-Verlauf, Commit 3d65ac0.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | 3.58.5 (0167 baut 3.59.0) |
| AppDesign | 4.70.2 (0167 baut 4.71.0); von 0001 nur `arbeit/`, `BACKLOG.md` und eine Zeile in `UEBERGABE.md` |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Chatnummer:** AppDesign-Kette, nächste Sitzung **AppDesign 0002**, danach 0003.
- **Modell und Aufwand:** 0001 lief mit Opus 5.5, Aufwand **hoch** (eingestellt und tatsächlich; kein `model_fallback`; `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt).
  Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** five_hour · allowed.
- **Hooks:** keine (`~/.claude/settings.json` nur `create_session` erlauben).
- **Prüfumgebung:** 4 Kerne, Chromium 158 (Verweise 1194 → 1243), WebKit 26.0; Probelauf `bean-katalog` und `doku-regeln` (Chromium) grün.
- **Offene Usertests:** keine.

## 2. Ergebnisse der Sitzung 0001

- **Wortlaut ‚Beans im Entwurf im Bean-Katalog‘ freigegeben** (APD-149/J-1). Er betrifft Designrichtlinie 14 (neuer Punkt), R-1.13 (ein Satz und die
  Spalte Prüfung) und `checkKatalog` (7 Prüfungen, Gegenprobe `beans:entwurf`). Text: `arbeit/APD-149 0001 Wortlaut Entwurf im Katalog.md`.
- **APD-149/J-2:** Der Wortlaut kommt mit der **nächsten AppDesign-Version** in Richtlinie und `checkBeans`. Er steht als APD-149/J-1 in ‚0. Nächste Version‘
  im Backlog. Bis dahin gilt er durch die Freigabe. Den Entwurf prüft Claude selbst.
  - Sitzung 0167 ist informiert (`send_message`). Ihr ‚Ja‘ zu 4.71.0 umfasst nur RLB-126. Ob J-1 mitkommt, entscheidet der Nutzer dort.
- **H-6 gemessen:** Heute braucht jede andere Schaltfläche der Kopfzeile bei offenem Menü zwei Tipps (`blockingLayer` und `klickVerschlucken`).
  Apple lässt alle anderen Schaltflächen der Leiste durch, mit Quellen. Unterlage: `arbeit/APD-149 0001 H-6 Befund und Apple-Abgleich.md`.
- **APD-149/J-3:** Bei offenem Menü wirkt jede andere Schaltfläche der Kopfzeile beim ersten Tipp, **auch ohne Menü**. Das Menü geht dabei zu, die
  eigene Schaltfläche schließt.
- **Behoben:** In der APD-149-Zeile des Backlogs fehlten bei V-3, H-1 bis H-9 und W-1 die Elternnummern (APD-78/S-1). Das hat `doku-regeln` der
  Kette RLB-126 rot gemacht. Commit 72a9894.

## 3. Nächster Schritt – Muster im Bean-Katalog (APD-149/W-1)

1. Lesen, Lagebild als eigene Antwort mit Kachel (0 Nr. 15). Tests einrichten (CLAUDE.md, ReiseLogBuch dazuholen). Vorher `git fetch origin main`:
   Sitzung 0167 ändert `katalog/` (neue Bean `recentlydeleted`), `v4/` und die Designrichtlinie.
2. `katalog/entwurf/presentation-commands.js` nach `arbeit/APD-149 Grobentwurf V-3.md` 2.1 und 2.2, mit H-1 bis H-9 und J-3. Die Regeln aus dem
   Wortlaut (J-1) gelten:
   - eigener Code auf `v4/`
   - CSS nur unter `.ad-<kennung>…`
   - `draft: true`
   - in der Seitenleiste unter ‚Entwurf‘
   - `katalog/index.html` lädt die Datei
   Ausprobieren:
   - Kopfzeile mit zwei Menüs, Untermenü und einer Schaltfläche ohne Menü (J-3)
   - Fenster und Hinweisfenster
   - Teilen
   - Protokoll des Stapels
3. Die Schicht deckt die Kopfzeile nicht ab. Außerhalb der Kopfzeile wird weiter geschluckt, denn Safari gibt nach dem Schließen sonst den Klick weiter.
4. APD-149/S-1 bis S-15 automatisch gegen die Katalogseite, in Chromium und WebKit, mit Gegenprobe S-15. Dazu kommen:
   - **S-5 mit J-3:** Eine Schaltfläche ohne Menü wirkt beim ersten Tipp.
   - die Fälle aus RLB-126 (Grobentwurf-Übergabe 3a): Endgültig löschen, Wiederherstellen in Kontextmenü und Wischen, die Listen-Ebene.
   - `katalog.mjs` in beiden Browsern.
   - ein Skript für die Prüfungen aus Abschnitt 4 des Wortlauts.
   Als Vorlage für die Messung von heute dient das Skript `h6c.mjs`. Es ist im Notizordner von 0001 nicht dauerhaft, der Aufbau steht im Befund Abschnitt 1.
5. Bericht mit Link, nummerierten Schritten und ‚Erwartet‘ (0 Nr. 11). Vor dem Hochladen auf `main` fragen (Pages; der volle Lauf des
   Reiselogbuchs öffnet jede angemeldete Bean im Katalog).

## 4. Danach

- `v5/` mit APD-145 (Namensraum `AD`, AppDesign 5.0.0).
- APD-150 wird durch S-3 gelöst.
- APD-148 und APD-142 bauen auf `presentation` und `commands`.
- `recentlydeleted` zieht mit `v5/` um (RLB-126/J-11).

## 5. Neue Vereinbarungen

- APD-149/J-1 bis J-4 (siehe 2.). J-1 kommt mit der nächsten AppDesign-Version in die Richtlinie.

## 6. Starttext für die neue Sitzung

```
AppDesign 0002 – APD-149 Muster im Bean-Katalog bauen

Lies im Repo g811141a/AppDesign (Branch main) zuerst arbeit/APD-149 Uebergabe.md, dann UEBERGABE.md (nur Lagebild, die Kette Reiselogbuch läuft parallel), dann die GANZE Zusammenarbeit allgemein (3.19.0) und die Überschriften der Designrichtlinien, dazu arbeit/APD-149 Grobentwurf V-3.md, arbeit/APD-149 0001 Wortlaut Entwurf im Katalog.md und arbeit/APD-149 0001 H-6 Befund und Apple-Abgleich.md. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL) und ob in ~/.claude/settings.json Hooks stehen; richte die Tests ein, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (ReiseLogBuch dazuholen). Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach arbeit/APD-149 Uebergabe.md Abschnitt 3: Muster katalog/entwurf/presentation-commands.js bauen und APD-149/S-1 bis S-15 automatisch prüfen. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```

**Name der neuen Sitzung:** ‚AppDesign 0002 – APD-149 Muster im Bean-Katalog bauen‘.
