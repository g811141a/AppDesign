# P-108 – Rückmeldung und Klärung (Sitzung 0128)

Stand 18.11.2026 · Reiselogbuch 3.57.1 · AppDesign 4.60.1 · AD-Bean `swipeactions` (R-7.8, Designrichtlinie 15.4)

## Rückmeldung des Nutzers (18.11.2026, wörtlich)

> Add 1) beim wischen nach links soll die kapsel erst dann herausgefadet werden wenn 50% der breite welche die kapsel im endstadium benötigt
> nach links gewischt wurde. Auch bei den weiteren kapseln soll es so sein. Wenn über die letzte kapseln weiter hinaus gewischt wird, soll nicht
> die löschenkapsel langgezogen werden sondern es sollen alle kapseln sichtbar sein und die kachel nach dem loslassen zurückfedern. Wie in der
> apple notes app. Beim wischen nach links soll zwischen kachel und kapsel der gleiche abstand wie zwischen den kapseln sein. Wie in der apple
> notes app. Beim zurückwischen soll sich das System umgekehrt verhalten
>
> Alle anderen punkte ok

**Ergebnis:** P-108/0, P-108/3, P-108/4 ok · P-108/1 nicht ok · P-108/2 nicht ok (‚zurück umgekehrt‘).

## Befunde

| Nr. | Wunsch | Heute (4.60.1, belegt aus `v4/ui.js` `createSwipeactions`) |
|---|---|---|
| F-1 | Eine Kapsel erscheint erst, wenn 50 % ihrer Endbreite freigewischt sind; jede weitere ebenso | Jede Kapsel wächst ab dem ersten Pixel ihres Platzes von 0 auf 100 % (Größe und Deckkraft), rechts bündig im frei werdenden Stück (`bild()`: `q = a / d.w`) |
| F-2 | Über die letzte Kapsel hinaus: die rote Kapsel wird nicht langgezogen, alle Kapseln bleiben sichtbar, nach dem Loslassen federt die Kachel zurück | Ab der vollen Breite weichen die Kapseln anteilig; ab 60 % der Kachelbreite (‚Durchwischen‘, `durchwischen: true`) wird ‚Löschen‘ breit, die anderen blenden aus, Loslassen fragt ‚… löschen?‘ |
| F-3 | Abstand Kachel–Kapsel gleich dem Abstand zwischen den Kapseln | Kachel–Kapsel 11 px (`rand`), zwischen den Kapseln 8 px (`abstand`) |
| F-4 | Beim Zurückwischen alles umgekehrt | Zurück vergehen die Kapseln umgekehrt zum heutigen Erscheinen (folgt aus F-1 bis F-3) |

**So macht es Apple:** nach deiner Beobachtung in Notizen (18.11.2026) – keine eigene Quelle dieser Sitzung; support.apple.com ist von hier
gesperrt. Den HIG-Abgleich mache ich vor dem Muster (0 Nr. 23).

**Warum die Prüfung es nicht fand:** `checkWischen` prüft R-7.8 so, wie die Regel heute lautet (Kapsel wächst ab 0 px, Durchwischen macht
‚Löschen‘ breit). Die Regel selbst weicht von Notizen ab – es ist eine Lücke in der Regel, keine in der Prüfung.

**Betroffene Regeln (Änderung nur mit deinem Ja zum Wortlaut, 0 Nr. 29):** R-7.8 und Designrichtlinie 15.4 ‚Wischaktionen‘; entfällt das
Durchwischen, auch die Zeile ‚Durchwischen fragt‘ in 16 ‚Bewusste Abweichungen‘ und die Eigenschaft `durchwischen` der Bean (Liste der AD-Beans 15).

## Offene Fragen

| Nr. | Frage | Möglichkeiten (Empfehlung zuerst) |
|---|---|---|
| Q-1 | Wie erscheint eine Kapsel ab 50 %? | a) beide Arten im Muster nebeneinander (Empfohlen – am Gerät vergleichbar) · b) sie blendet ab 50 % rasch in voller Größe ein · c) sie wächst und blendet zwischen 50 % und 100 % ein |
| Q-2 | Entfällt das Löschen durch Durchwischen ganz? | a) Ja, Löschen nur noch über die Kapsel (Empfohlen – so beschreibst du Notizen) · b) Nein, Durchwischen bleibt, nur ohne Langziehen |
| Q-3 | Was passiert über die letzte Kapsel hinaus? | a) Die Kachel folgt mit Widerstand, die Kapseln bleiben an ihrem Platz, Loslassen federt auf ‚offen‘ zurück (Empfohlen) · b) wie a, aber die Kapseln wandern mit der Kachel (Abstand bleibt gleich) · c) beides im Muster |
| Q-4 | Welcher Abstand gilt? | a) überall 8 px, rechts außen 11 px wie bisher (Empfohlen – kompakter, wie Apple-Listen) · b) überall 11 px |

## Nächste Schritte

1. Deine Antworten auf Q-1 bis Q-4.
2. Apple-Abgleich (HIG) und Muster (nur hell, quer) mit Testfall-Liste und neuem Wortlaut für R-7.8 und 15.4.
3. Nach deinem Ja zum Wortlaut: eine feste Prüfung für deinen Ablauf, die gegen 4.60.1 rot wird (0 Nr. 1), dann die Korrektur.
4. Die Korrekturversion (AppDesign 4.60.2, Reiselogbuch 3.57.2) kommt vor APD-135 (0 Nr. 8, 22), gebaut wird erst nach deinem Ja (0 Nr. 21).
