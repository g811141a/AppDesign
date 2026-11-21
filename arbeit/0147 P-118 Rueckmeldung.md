# P-118 – Rückmeldung

**Stand 21.11.2026** · Sitzung 0147 · Reiselogbuch 3.57.11 · AppDesign 4.67.1

## Rückmeldung

/0 und /2 bis /5 ok. **/1 nicht ok:** Die Mehr-Schaltfläche ist jetzt rund, verhält sich beim Drücken aber nicht wie andere einzelne Schaltflächen. Eine gedrückte
Schaltfläche soll sich vergrößern, grundsätzlich und im Regelwerk verankert. Dazu dein Hinweis: nicht ‚Knopf‘ sagen, wenn eine Schaltfläche gemeint ist.

## Befund

- In `design.css` vergrößern sich gedrückte Schaltflächen **nur in Leisten und Kapseln** (`.nb`, `.pnav`, `.bbar`, Fenster-Kopfzeile, Seitenleisten-Kopf, Suchfeld,
  Nach oben / Ans Ende) auf das **1,3-fache**. **Alle übrigen** werden blass (35 %), so auch die Mehr-Schaltfläche des Katalogs.
- Das entspricht heute **R-3.6** (‚solange der Finger liegt, wird eine Schaltfläche blass …, ein Leisten-Knopf hebt sich … 1,3-fach‘). Es ist also kein Fehler gegen
  die Regel, sondern eine **Regeländerung**. Dafür brauche ich den Apple-Abgleich, ein Muster, deinen Ja zum Wortlaut und eine Prüfung, die gegen 4.67.1 rot ist
  (0 Nr. 1).
- ‚Knopf‘ steht heute an vielen Stellen: Designrichtlinie allgemein 63-mal, `ui.js` 51-mal (Kommentare), Katalog `sourcehighlight.js` 9-mal (u. a. ‚Erster Knopf‘),
  PROMPT.md 4-mal, index.html 3-mal. Ab sofort verwende ich in meinen Antworten und Texten ‚Schaltfläche‘.

## Backlog

- AppDesign ‚2. In Klärung‘: **P-118/F-1** (gedrückte Schaltfläche vergrößert sich, Prio 1) und **P-118/F-2** (Begriff ‚Schaltfläche‘ statt ‚Knopf‘, Prio 1).
- Reiselogbuch: Usertest P-118 mit deiner Rückmeldung eingetragen (bleibt ‚prüfen‘).

## Vorschlag

Der Kontext liegt bei rund 266.000, ab 300.000 ist die Übergabe fällig (0 Nr. 13). Die Klärung (Apple-Abgleich, Muster, Wortlaut R-3.6 und Begriffsregel) passt
nicht mehr sicher in diese Sitzung. **Empfehlung:** jetzt übergeben. Die Sitzung 0148 beginnt dann mit P-118/F-1 und P-118/F-2.
