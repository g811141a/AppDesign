# Aufgefallen, Punkt 3 – Sprechblase am iPad wird beim Drehen nicht gemessen

**27.11.2026 · Sitzung 0168** · aus `arbeit/0167 Bericht 4.71.0 – 3.59.0.md`

Punkt 2 ist als **APD-153** bereit (`20721a0`).

## Befund (belegt)

- **Lage am iPad:** Die Sprechblase ‚Endgültig löschen‘ steht in der Seitenleiste neben der Kachel (`placeAt(…, 'beside')`, `v4/ui.js:786`).
  - Sie steht oben bündig, links bei ‚rechter Rand der Kachel − 40 px‘. Ohne Platz daneben steht sie darunter bzw. darüber.
- **Die Drehprüfung `rotate` in `tests/hig.mjs:392` kennt nur ‚unter der Schaltfläche‘.**
  - Sie meldet ‚Menü nach dem Drehen nicht unterhalb der Schaltfläche‘, sobald das Menü nicht unter seiner Schaltfläche beginnt.
  - Bei ‚beside‘ ist das immer so, denn die Sprechblase steht oben bündig mit der Kachel.
- **Deshalb misst das Reiselogbuch sie nur am iPhone** (`ReiseLogBuch/tests/hig.mjs:110–112`). `ablauf-zuletzt-geloescht` prüft sie am iPad ohne Drehen.
- **Folge:** R-8.1 (‚Sprechblasen werden neu ausgerichtet‘) ist für Sprechblasen neben einer Kachel am iPad nicht automatisch geprüft.
  - Ob sie nach dem Drehen richtig steht, weiß ich nicht, ich habe es nicht gemessen.

## Möglichkeiten

- **a) Drehprüfung kennt ‚beside‘ (Empfohlen), als eigenes Thema APD-154 für die Version danach:**
  - `rotate` erwartet bei Sprechblase und Kontextmenü an einer Kachel der Seitenleiste ‚daneben, oben bündig, ganz sichtbar, über der Backup-Kachel‘ und sonst ‚darunter bzw. darüber, an der Kachel ausgerichtet‘.
  - Dann misst `hig` die Sprechblase auch am iPad mit Drehen. Die Gegenprobe rückt die Sprechblase nach dem Drehen unter die Kachel und muss rot werden.
  - Der Wortlaut von R-8.1 bleibt, nur der Kommentar in `rotate` wird genauer.
  - **Grund:** Damit schließt sich die Lücke für alle Apps. Die Korrekturversion hat mit APD-152 und APD-153 schon 2 Themen (0 Nr. 8).
- **b) Wie a, aber gleich in der Korrekturversion:** Das wären 3 Themen, gegen 0 Nr. 8.
- **c) Lassen und ins Backlog als ‚später‘.**
