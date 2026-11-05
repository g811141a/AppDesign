# APD-40 Paket B – Texte (Vorschlag für Wortlaut und Testfall-Liste)

Stand 05.11.2026 · Sitzung Reiselogbuch 0081 · **Vorschlag von Claude, noch nicht bestätigt** (Wortlaut braucht dein Ja, 0 Nr. 29).
Einordnung: `arbeit/APD-40 Einordnung.md` (Paket B = G-4, G-12, Teile von G-19). Vorbild: `arbeit/APD-40 Paket A.md`.

## So macht es Apple

- **Menüpunkt = Fenstertitel:** Einstellungen, Notizen, Kalender – ‚Neuer Termin‘ öffnet ‚Neuer Termin‘, ‚Info‘ öffnet ‚Info‘ (HIG Menus:
  Beschriftung sagt, was passiert).
- **Kein ‚…‘ am Menüende:** die HIG nennt ‚…‘ für Befehle, die weitere Eingaben verlangen; Apples iPad- und iPhone-Apps verwenden es nicht
  (‚Notiz bewegen‘, ‚Umbenennen‘) – so steht es schon in Designrichtlinie 16 Nr. 5.
- **Icons einer Gruppe alle oder keine** (HIG Menus), **Kontextmenü kurz, nicht Verfügbares ausblenden** (HIG Context menus).
- **Texte** (HIG Writing): du-Form ohne ‚wir‘, ‚tippen‘ statt ‚klicken‘.
- **Datum** im deutschen Format TT.MM.JJJJ wie in Dateien und Kalender bei Region Deutschland.

## Wortlaut – neu im Regelkatalog (Designrichtlinie allgemein 17)

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-4.10 | **Menütexte:** kein ‚…‘ am Ende eines Menüpunkts; in einer Gruppe haben alle Punkte ein Icon oder keiner; ein Kontextmenü hat höchstens 3 Gruppen und zeigt keine gesperrten Punkte (ausblenden statt grau) | hig.mjs – `menueTexte` (jedes offene Menü, Untermenü und Kontextmenü nach jedem Schritt) | – | 15.6, 16 |
| R-4.11 | **Menüpunkt und Fenster heißen gleich:** öffnet ein Menüpunkt ein Fenster, ist der Fenstertitel der Text des Menüpunkts; Systembeschriftungen bleiben | ablauf.mjs – `checkMenueFenster` (jeden Menüpunkt mit Fenster antippen) | – | 6 |
| R-10.6 | **Ansprache:** sichtbare Texte ohne ‚wir/uns/unser‘ und ohne ‚klicken‘ (‚tippen‘) | hig.mjs (alle sichtbaren Texte, `title`, `aria-label`, Platzhalter) | – | 16 |
| R-10.7 | **Datum und Dateinamen:** Datum in Texten TT.MM.JJJJ, Uhrzeit hh:mm; Dateinamen nach den Mustern aus 10 (Ausgabe, Backup, Abgleichbericht; Datum JJJJ.MM.TT, Uhrzeit hh.mm, nie zwei Leerzeichen) | ablauf.mjs – `checkPreview` und die Abläufe Backup/Abgleich (Dateinamen); hig.mjs (Datumsangaben in Texten) | – | 10 |

## Wortlaut – geändert unter ‚Regeln ohne automatische Prüfung‘

| Nr. | alt | neu |
|---|---|---|
| G-4 | Menüpunkt und Fenster heißen gleich; Systembeschriftungen bleiben · Sicht | ersetzt durch R-4.11 |
| G-12 | Dateinamen-, Datums- und Zeitformat · teilweise `checkPreview` (R-6.4) | ersetzt durch R-10.7 |
| G-19 | HIG ‚außerdem‘: Farbe nie einziges Merkmal; kein ‚…‘ am Menüende, Icons einer Gruppe alle oder keine; im Kontextmenü Unverfügbares ausblenden, höchstens etwa 3 Gruppen; Texte ohne ‚wir‘, ‚tippen‘ statt ‚klicken‘, ein leerer Bildschirm nennt den nächsten Schritt · Sicht | HIG ‚außerdem‘: Farbe nie einziges Merkmal; ein leerer Bildschirm nennt den nächsten Schritt · Sicht (Rest ersetzt durch R-4.10 und R-10.6) |

Inhaltliche Änderung: R-4.10 ‚höchstens 3 Gruppen‘ statt ‚höchstens etwa 3‘ (sonst nicht prüfbar) – wie bei R-4.9 in Paket A.

## Offene Fragen (vor dem Wortlaut zu klären)

| Nr. | Frage | Befund | Empfehlung |
|---|---|---|---|
| B-F1 | Textbausteine mit ‚…‘ | Das Reiselogbuch hat Vorschläge wie ‚Weiterfahrt nach …‘, ‚Rundgang durch …‘ (`PROGRAM_SUGGESTIONS`, `index.html` Zeile 184 ff.); dort heißt ‚…‘ ‚hier weiterschreiben‘ – das ist der ursprüngliche HIG-Sinn. Stehen sie in einem Menü, wird R-4.10 rot. | Ausnahme in R-4.10: ‚außer Textbausteinen, die einen angefangenen Satz einsetzen‘ – vorher am Code prüfen, ob sie überhaupt in einem Menü stehen |
| B-F2 | ‚höchstens 3 Gruppen‘ streng | heutige Kontextmenüs (R-4.2) noch nicht gezählt | streng 3; zeigt die Messung mehr, entscheidest du je Menü |
| B-F3 | Datum in Texten | `index.html` misst die Breite des Datumsfelds auch mit `toLocaleDateString()` ohne Sprache (Zeile 627) – nur zum Messen, nicht sichtbar | R-10.7 prüft nur sichtbare Texte |

## Testfälle (automatisch), Chromium und WebKit, alle Ansichten (iPad quer/hoch, iPhone), hell

| Nr. | Regel | Fall | Gegenprobe (muss rot werden) |
|---|---|---|---|
| B-1 | R-4.10 | kein Menüpunkt (Menü, Untermenü, Kontextmenü) endet auf ‚…‘ oder ‚...‘ | ein Punkt ‚Umbenennen …‘ |
| B-2 | R-4.10 | jede Gruppe (zwischen zwei Strichen): alle Punkte mit `svg` oder keiner | eine Gruppe, in der einem Punkt das Icon fehlt |
| B-3 | R-4.10 | jedes Kontextmenü (Kachel, Zeile): höchstens 3 Gruppen | Kontextmenü mit 4 Gruppen |
| B-4 | R-4.10 | kein Kontextmenü zeigt einen gesperrten Punkt (`disabled`, `aria-disabled`) | ein gesperrter Punkt im Kontextmenü |
| B-5 | R-4.11 | jeder Menüpunkt, der ein Fenster öffnet: Fenstertitel = Text des Menüpunkts (ohne Icon) | Fenstertitel ‚Optionen‘ zum Punkt ‚Einstellungen‘ |
| B-6 | R-10.6 | kein sichtbarer Text, `title`, `aria-label` oder Platzhalter mit ‚wir‘, ‚uns‘, ‚unser…‘ oder ‚klick…‘ (ganzes Wort, Groß/klein) | Hinweis ‚Klicken Sie …‘ bzw. ‚Wir haben …‘ |
| B-7 | R-10.7 | jedes Datum in sichtbaren Texten TT.MM.JJJJ (keine JJJJ-MM-TT, keine einstellige Tageszahl mit Jahr) | Versionszeile ‚erstellt am 2026-11-05‘ |
| B-8 | R-10.7 | Dateinamen von Ausgabe (HTML, PDF), Backup und Abgleichbericht passen genau zu den Mustern aus 10 | Backup-Name mit ‚2026-11-05‘ bzw. zwei Leerzeichen |
| B-9 | alle | Textgröße groß (R-1.10) und nach dem Drehen (Grundregeln): dieselben Ergebnisse | – |

Ausgenommen von B-6 und B-7: Eingaben des Nutzers (Feldinhalte, Reisetexte) – geprüft werden nur Texte der App.
