# RLB-127 – Dateiname am iPad nie umbrechen

**Stand 19.11.2026** · Sitzung 0134 · **entschieden:** allgemein, Prio 2 (Nutzer 19.11.2026) – jetzt **APD-138** im Backlog von AppDesign; RLB-127 ist ‚ersetzt durch APD-138‘

## Wunsch (Nutzer 19.11.2026)

Nach einem Backup steht der Dateiname im kleinen Hinweisfenster umgebrochen. Am iPad soll sich die Breite des Fensters dynamisch nach dem Dateinamen
richten, sodass er nicht umbricht. Das gilt auch für die anderen Fenster, die einen Dateinamen zeigen.

## Heutiger Stand (aus dem Code)

- Der Dateiname kommt aus dem AppDesign-Baustein `fileNameHtml` (`v4/ui.js` Z. 1368); jedes Wort steht am Stück, Umbruch nur nach einem Leerzeichen.
- Das Hinweisfenster `#msg` ist 360 px breit (mit der Textgröße wachsend, höchstens 90 % der Breite – `design.css` Z. 581).
- Regel heute **R-10.8**: ‚Dateiname im Hinweisfenster: steht allein in einer eigenen Zeile unter dem Satz, fett und zentriert, ohne Punkt danach;
  Umbruch nur nach einem Leerzeichen – nur ein Wort, das länger ist als die Zeile, bricht in sich (R-6.3)‘ · Prüfung `checkDateiname`.
- Betroffen: Backup (Hinweisfenster und Schritt im Backup-Fenster), Ausgabe HTML/PDF, Abgleichbericht. Beispiel Backup-Name:
  ‚Ω Backup Reiselogbuch 2026.11.19 08.15.json‘.

## Zu klären

1. **Allgemein oder App:** Baustein und Regel liegen in AppDesign – eine Änderung wirkt für alle Apps (R-10.8 neu fassen) und wäre ein APD-Thema mit
   Verweis in RLB-127. Meine Empfehlung: allgemein (eine Stelle, gleiche Darstellung in jeder App, 0 Nr. 4).
2. **Priorität:** vorläufig 2 (mittel) – stört nur die Darstellung, keine Daten.
3. Später in der Klärung: Höchstbreite (Rand des Bildschirms, iPad hoch, geteilter Bildschirm), große Textgröße (bricht dann doch?), iPhone bleibt wie
   heute; So macht es Apple – weiß ich noch nicht, ich prüfe es in der Klärung mit Quelle.
