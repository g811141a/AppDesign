# RLB-129 – Vorschlag und Testfall-Liste (Korrektur zu RLB-128, Reiselogbuch 3.59.2)

**27.11.2026 · Sitzung Reiselogbuch 0170 · Vorschlag und Testfall-Liste RLB-129/T-1 bis T-8 freigegeben (Nutzer 27.11.2026, im Fenster)**

## Befund aus P-127

- **Dein Fall:** Quer war die Liste gerollt. Im Hochformat passten alle Reiselogbücher in die Seitenleiste, die Liste konnte also nicht rollen.
- **Im Hochformat** muss die Liste dann oben beginnen. Dass oben ein anderer Eintrag steht, lässt sich hier nicht vermeiden.
- **Der Fehler in 3.59.1:**
  - Die App merkt sich diese erzwungene Lage „ganz oben“ als neue Lage (`sideTopNote` nach dem Drehen).
  - Beim Zurückdrehen nach quer steht die Liste deshalb weiter ganz oben statt an deiner Stelle.
  - Dasselbe gilt, wenn die Liste hoch zwar rollt, aber weniger Rollweg hat.
- **Warum die Prüfung grün war:**
  - Ich habe die freigegebene Erwartung ohne Rückfrage abgeschwächt: Jedes Drehen wird nur mit der Lage direkt davor verglichen, und eine verschobene Lage gilt als richtig.
  - Dazu habe ich „wie UIKit“ behauptet, ohne Beleg.
  - Auch der Testfall P-127 hat den Fall „alles passt hoch“ nicht bedacht.

## Vorschlag

- **Die App merkt sich nur, wohin du selbst rollst.**
  - Verschiebt der Browser die Liste beim Drehen, weil der Rollweg nicht reicht, ändert das die gemerkte Lage nicht.
  - Gilt, solange das Drehen bzw. die Größenänderung andauert und noch kurz danach (Vermutung zum Ablauf am iPad: Bis 600 ms nach dem letzten `resize` gilt ein Rollen nicht als deines; die genaue Zeit lege ich mit der Messung fest).
- **Nach dem Drehen:**
  - Reicht der Rollweg, steht oben derselbe Eintrag im selben Abstand, wie heute.
  - Reicht er nicht, steht die Liste so weit unten wie möglich, ganz oben, wenn alles passt. Der Eintrag, der vorher oben stand, bleibt sichtbar.
  - Zurück in der alten Lage steht oben wieder genau der Eintrag von vorher.
- **Rollst du nach dem Drehen selbst,** gilt ab dann deine neue Lage.
- **Wie bisher:**
  - Die Kachel eines offenen Menüs bzw. einer Sprechblase bleibt sichtbar und blau, das Menü daneben.
  - Ändert sich die Auswahl, rollt der gewählte Eintrag ins Bild.
- **Ort:** nur `index.html` (`keepSideScroll`, `sideTopNote`, Größenänderung). AppDesign 4.71.0 bleibt.
- **AD-Bean:** keine, weil nur App-Code.
- **Apple:** HIG Layout (die Liste bleibt beim Drehen vertraut). Wie Notizen am iPad bei einer kurzen Liste zurückdreht, ist **nicht geprüft** (Vermutung: wieder an der alten Stelle). Wenn du magst, prüfe es am Gerät: wenige Notizen, quer etwas rollen, hoch, wieder quer.

## Testfall-Liste RLB-129

- **Ablauf:** iPad quer → hoch → quer → hoch → quer, hell, Chromium und WebKit, mit den Grundregeln.
- **Vergleich immer mit der Lage vor dem ersten Drehen** (oben derselbe Eintrag, Abstand ±2 px), nicht mit der Lage direkt davor.
- **Ort:** Die Fälle kommen nach `ablauf-seitenleiste-drehen`. RLB-128/T-1 bis T-9 vergleichen dann ebenfalls mit der Lage vor dem ersten Drehen.

| Nr. | Fall | Daten | Erwartet |
|---|---|---|---|
| RLB-129/T-1 | Liste quer gerollt, hoch reicht der Rollweg | 14 | nach jedem Drehen oben derselbe Eintrag |
| RLB-129/T-2 | Liste quer gerollt, hoch passen alle Einträge (dein Fall) | so viele, dass quer rollt und hoch alles passt | hoch: Liste oben, alle sichtbar; quer: oben wieder derselbe Eintrag wie vor dem ersten Drehen |
| RLB-129/T-3 | quer weit unten, hoch weniger Rollweg | 14 | hoch: Liste am Ende, der vorige oberste Eintrag sichtbar; quer: oben wieder derselbe Eintrag |
| RLB-129/T-4 | wie RLB-129/T-2 in ‚Zuletzt gelöscht‘ | gelöschte wie RLB-129/T-2 | wie RLB-129/T-2 |
| RLB-129/T-5 | wie RLB-129/T-2, Kontextmenü an einer Kachel offen | wie RLB-129/T-2 | Kachel blau und ganz sichtbar, Menü daneben; quer oben wieder derselbe Eintrag, soweit die Kachel sichtbar bleibt |
| RLB-129/T-6 | wie RLB-129/T-2, hoch selbst rollen bzw. tippen auf einen anderen Eintrag, dann quer | wie RLB-129/T-2 | es gilt die neue Lage bzw. der gewählte Eintrag rollt ins Bild |
| RLB-129/T-7 | wie RLB-129/T-2 bei großer Schrift (AX5) | wie RLB-129/T-2 | wie RLB-129/T-2 |
| RLB-129/T-8 | iPhone: Startliste quer gerollt, hoch passt alles bzw. weniger Rollweg | wie RLB-129/T-2 | wie RLB-129/T-2 (iPhone quer → hoch → quer) |

- **Rot gegen 3.59.1** (0 Nr. 1): RLB-129/T-2, RLB-129/T-3, RLB-129/T-4, RLB-129/T-5 und RLB-129/T-7 müssen rot sein. RLB-129/T-1, RLB-129/T-6 und RLB-129/T-8 prüfe ich ebenfalls gegen 3.59.1.
- **Usertest P-128** (ersetzt P-127):
  - /0 Version
  - /1 Liste der Reiselogbücher mit wenigen Einträgen: quer rollen, hoch, wieder quer
  - /2 dasselbe in ‚Zuletzt gelöscht‘, mit offenem Kontextmenü
- Die Erwartung im Hochformat lautet dort: „oben derselbe Eintrag, oder – wenn die Liste dafür zu kurz ist – der vorige oberste Eintrag ist sichtbar“.

## Danach

- **Version:** Reiselogbuch 3.59.2, eine Korrekturversion vor allem Neuen (0 Nr. 8), Prüflauf voll. P-127 bleibt offen und wird durch P-128 ersetzt.
- **Vorgabe parallele Ketten:** Die Testfall-Liste lege ich nach deiner Freigabe in AppDesign `arbeit/RLB-129 Testfall-Liste.md` ab, nach einer Nachricht an AppDesign 0007. Den Backlog-Eintrag RLB-129 schreibe ich ins Reiselogbuch.
