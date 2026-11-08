# APD-116 – fertig klären

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0103‘ · Vorgeschichte: `arbeit/APD-116 Klärung.md` (Muster iPad quer und iPhone hoch ok, Sitzung 0102)

## 1. Als allgemeine Regel festhalten? (0 Nr. 4)

- **Worum es geht:** In jedem Hinweisfenster mit einem Dateinamen steht der Name **allein in einer neuen Zeile** unter dem Satz, fett und
  zentriert. Er bricht **nur nach einem Leerzeichen** um.
- **Wo der Text herkommt:** `SHARE_RESULT` / `shareResultText()` in `v4/ui.js` (AppDesign). Dieselbe Stelle nutzen:
  - Reiselogbuch: Ergebnis der **Ausgabe** (`showOutputResult`) und das Fenster nach **‚Backup erstellen‘**;
  - AppDesign selbst: der **Abgleichbericht** (HTML und PDF, `ui.js` Zeilen 1676 und 1681).
- **Empfehlung: ja, allgemein.** Der Baustein liegt in AppDesign und gilt damit in jeder App, die ein Backup, eine Ausgabe oder einen Abgleich hat
  (gleiche Formatierung überall, 0 Nr. 4). In der App muss nichts geändert werden.
- **So macht es Apple:** In WWDC17 ‚Writing Great Alerts‘ nennt Apple den Dateinamen im Hinweis, dort im Satz in Anführungszeichen. Eine Regel
  ‚Name in eigener Zeile‘ habe ich bei Apple nicht gefunden. Die eigene Zeile ist eine kleine, bewusste Abweichung (dein Wunsch), weil ein langer
  Name so besser zu lesen ist.

**Ergebnis:** ja, allgemein (Nutzer 08.11.2026, Sitzung 0103).

## 2. Wortlaut (0 Nr. 29) – alt und neu

### APD-116/W-1 Regelkatalog (Designrichtlinie 17, Thema 10) – neue Regel

**Alt:** – (gibt es nicht)

**Neu:**

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-10.8 | **Dateiname im Hinweisfenster:** steht allein in einer eigenen Zeile unter dem Satz, fett und zentriert, ohne Punkt danach; Umbruch nur nach einem Leerzeichen – nur ein Wort, das länger ist als die Zeile, bricht in sich (R-6.3) | ablauf.mjs – `checkDateiname` (Backup, Ausgabe, Abgleichbericht; vier Lagen, große Schrift; Gegenprobe) | – | 10, 15.19 |

### APD-116/W-2 Designrichtlinie 10 ‚Ausgabe, Teilen und Meldungen‘, dritter Punkt

**Alt:** Speichern immer über das Teilen-Menü („In Dateien sichern“); PDF über das Drucken-Menü. Die App meldet ehrlich, dass das Menü
geöffnet bzw. abgebrochen wurde.

**Neu:** Speichern immer über das Teilen-Menü („In Dateien sichern“); PDF über das Drucken-Menü. Die App meldet ehrlich, dass das Menü
geöffnet bzw. abgebrochen wurde; **der Dateiname steht dabei allein in einer Zeile unter dem Satz (R-10.8).**

### APD-116/W-3 Designrichtlinie 15.19 ‚Backup erstellen‘, Punkt ‚Danach‘

**Alt:** kleines Fenster ‚Backup‘ mit ✅ und Ort der Datei bzw. ⚠️ bei Abbruch; ‚Letztes Backup‘ zählt nur, …

**Neu:** kleines Fenster ‚Backup‘ mit ✅ und Ort der Datei bzw. ⚠️ bei Abbruch, **der Dateiname allein in einer Zeile unter dem Satz
(R-10.8)**; ‚Letztes Backup‘ zählt nur, …

### APD-116/W-4 Meldungstexte (`SHARE_RESULT` in `v4/ui.js`) – Name jeweils in der eigenen Zeile darunter

| Fall | Alt | Neu |
|---|---|---|
| geteilt | ✅ Teilen-Menü abgeschlossen für **Name**. | ✅ Teilen-Menü abgeschlossen für<br>**Name** |
| heruntergeladen (ohne Teilen-Menü) | ✅ **Name** wird geladen. | ✅ Wird geladen:<br>**Name** |
| abgebrochen | ⚠️ Teilen-Menü abgebrochen – **Name** wurde nicht gespeichert. | ⚠️ Teilen-Menü abgebrochen – nicht gespeichert:<br>**Name** |
| Fehler | ⚠️ **Name** konnte nicht übergeben werden. | ⚠️ Konnte nicht übergeben werden:<br>**Name** |
| PDF (Drucken) | ✅ Drucken-Menü geöffnet für **Name**. | ✅ Drucken-Menü geöffnet für<br>**Name** |

Die grauen Hinweise darunter (‚Wenn du ‚In Dateien sichern‘ gewählt hast, …‘, ‚Du findest die Datei …‘, ‚Dort über ‚Teilen‘ …‘) bleiben
unverändert. ‚Geteilt‘, ‚abgebrochen‘ und ‚PDF‘ sind im Muster bestätigt; ‚heruntergeladen‘ und ‚Fehler‘ sind neu nach demselben Schema.

**Technisch beim Bau:** In der Prüfung des Reiselogbuchs `ablauf-abgleich.mjs` wird der Text ‚Drucken-Menü geöffnet für Abgleichbericht
Reiselogbuch‘ abgefragt; der Name steht künftig in einem eigenen Block, deshalb wird die Abfrage dort angepasst.

**Ergebnis:** Wortlaut W-1 bis W-4 bestätigt (Nutzer 08.11.2026, Sitzung 0103).

## 3. Muster iPad hoch und iPhone quer (0 Nr. 6)

Neu im Muster: die Fälle 5 ‚Ausgabe (ohne Teilen-Menü)‘ und 6 ‚Backup (Fehler)‘ mit den Texten aus W-4. Prüfung `arbeit/APD-116 Muster prüfen.mjs`
(vier Lagen, Textgröße l, xxxl, ax3): Chromium und WebKit **alles in Ordnung**, Gegenprobe in beiden rot (61 Fehler).

**Link:** https://g811141a.github.io/AppDesign/arbeit/APD-116/index.html – Safari, hell.

1. iPad **hoch**: den Link öffnen (falls nötig neu laden). Erwartet: sechs Paare ‚heute‘ und ‚neu‘; rechts steht der fette Dateiname jeweils allein
   unter dem Satz, zentriert.
2. Die Paare 2 ‚Ausgabe‘ und 5 ‚Ausgabe (ohne Teilen-Menü)‘ ansehen. Erwartet: rechts bricht der Name nur an Leerzeichen um,
   ‚2026.08.24-2026.11.11‘ bleibt zusammen.
3. Die Paare 5 und 6 lesen. Erwartet: rechts ‚✅ Wird geladen:‘ bzw. ‚⚠️ Konnte nicht übergeben werden:‘, darunter der Name.
4. Oben ‚Text groß‘ und ‚Text sehr groß‘ antippen. Erwartet: rechts weiterhin nur Umbrüche an Leerzeichen, nichts ragt aus dem Kasten.
5. iPhone **quer**: die Schritte 1 bis 4 wiederholen. Erwartet: wie oben.

**Ergebnis:** Muster iPad hoch und iPhone quer **alles ok** (Nutzer 08.11.2026, Sitzung 0103) – damit in allen vier Lagen ok.

## 4. Testfälle für den Bau

### Testfall (automatisch) – Ort in den festen Prüfungen (Chromium und WebKit, vier Lagen, Textgröße l, xxxl, ax3)

Neue Funktion `checkDateiname` in AppDesign `tests/ablauf.mjs` (aus `arbeit/APD-116 Muster prüfen.mjs`). Aufgerufen aus AppDesign
`tests/backup.mjs` (Backup: geteilt, abgebrochen, Fehler), Reiselogbuch `ablauf-abgleich.mjs` (Abgleichbericht HTML und PDF; die Textabfrage
‚Drucken-Menü geöffnet für …‘ wird angepasst) und `ablauf-gesamt.mjs` (Ausgabe HTML und PDF).

| Nr. | Fall | Erwartet |
|---|---|---|
| APD-116/B-1 | jedes Hinweisfenster mit Dateinamen (Backup, Ausgabe, Abgleichbericht; alle fünf Fälle aus W-4) | der Name beginnt in einer neuen Zeile unter dem Satz |
| APD-116/B-2 | langer Name, schmales Fenster (iPhone hoch), große Schrift | Umbruch nur nach einem Leerzeichen, nie nach ‚-‘ oder ‚.‘ |
| APD-116/B-3 | danach | der Name ist unverändert (kein Zeichen ersetzt), ohne Punkt danach |
| APD-116/B-4 | danach | nichts ragt aus dem Fenster (R-6.3) |
| APD-116/B-5 | Name in einer Zeile | zentriert, fett |
| APD-116/B-6 | Texte | wörtlich nach W-4 |
| APD-116/B-7 | Gegenprobe (Name wieder im Satz) | B-1 und B-2 rot |
| APD-116/B-8 | Katalog R-10.8 mit Prüfung genannt | `doku.mjs` (`checkCatalog`) |

### Testfälle (User) – Entwurf für Usertest P-101 (Nummern vorläufig, nach den vier Testfällen zu APD-124)

**P-101/12 – Dateiname nach ‚Backup erstellen‘**
1. iPad hoch, hell: in der Seitenleiste oben ‚…‘ (Mehr) → ‚Backup erstellen‘.
2. Im Teilen-Menü ‚In Dateien sichern‘ wählen und sichern.
3. Erwartet: kleines Fenster ‚Backup‘ mit ‚✅ Teilen-Menü abgeschlossen für‘, darunter fett und allein ‚Ω Backup Reiselogbuch JJJJ.MM.TT hh.mm.json‘;
   bricht der Name um, dann nur an einem Leerzeichen.

**P-101/13 – Dateiname nach abgebrochener Ausgabe**
1. iPhone quer, hell: ein Reiselogbuch öffnen, oben das Teilen-Icon (share) → ‚HTML‘.
2. Das Teilen-Menü ohne Auswahl schließen.
3. Erwartet: kleines Fenster ‚Ausgabe V…‘ mit ‚⚠️ Teilen-Menü abgebrochen – nicht gespeichert:‘, darunter fett und allein der Name
   ‚Reiselogbuch <Titel> JJJJ.MM.TT-JJJJ.MM.TT V….html‘; das Datum ‚JJJJ.MM.TT-JJJJ.MM.TT‘ bleibt zusammen.

## Offene Usertests

- **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – ok bis auf **P-100/1** (→ RLB-123, kommt mit 3.55.0).
