# P-109 – Wortlaut der Korrektur (Sitzung 0130)

Stand 18.11.2026 · Muster P-109 ‚passt‘ (Nutzer 18.11.2026) · Messung `arbeit/0130 P-109 Notizen Messung.md` · Muster `arbeit/0130 P-109 Wischaktionen Muster.md`
Korrekturversion: AppDesign 4.60.3 / Reiselogbuch 3.57.3 (voll). Kapseln 66 × 44 und Abstand 11 pt bleiben.

## P-109/V-1 – Designrichtlinie allgemein 15.4 ‚Wischaktionen‘

**Alt:** Die Kapseln erscheinen wie in Notizen: jede steht an ihrem Platz und **wächst aus ihrer Mitte** (Größe und Deckkraft gemeinsam, gleichmäßig
mit dem Weg) – sie beginnt, wenn die Kachel die halbe Kapsel freigibt, und ist voll, wenn auch der Abstand dahinter frei ist; so kommt zuerst ‚Löschen‘,
dann die nächste. Beim Zurückwischen und Gleiten genau umgekehrt, allein vom Weg bestimmt; keine Kapsel rückt dabei nach rechts über ihren Platz hinaus.

**Neu:** Die Kachel gleitet auf und zu mit der Feder aus Notizen (ohne Nachschwingen, Antwortzeit 0,5 s, gleich lang, egal wie weit). Die Kapseln
erscheinen wie in Notizen: jede steht an ihrem Platz und **wächst mit eigener Zeit aus ihrer Mitte** – sobald die Kachel sie ganz freigibt, in 0,25 s
(Deckkraft voll nach 0,1 s), auch wenn die Kachel schon steht; so kommt zuerst ‚Löschen‘, dann die nächste. Beim Zurückwischen und beim Tippen auf die
offene Kachel vergeht jede, sobald die Kachel sie erreicht, beim Schließen durch Tippen daneben oder auf eine andere Kachel alle zugleich – je in
0,23 s, zur Mitte schrumpfend und ausblendend, die Kachel gleitet darüber. Keine Kapsel rückt dabei nach rechts über ihren Platz hinaus.

**Alt:** ‚Bewegung reduzieren‘: die Kapseln stehen an ihrem Platz in voller Größe und blenden an denselben Stellen nur ein und aus (kein Wachsen, kein Mitrücken).

**Neu:** ‚Bewegung reduzieren‘: die Kapseln stehen an ihrem Platz in voller Größe und blenden zu denselben Zeitpunkten nur ein und aus (0,1 s bzw. 0,23 s;
kein Wachsen, kein Mitrücken).

## P-109/V-2 – Regelkatalog R-7.8

**Alt:** … jede Kapsel steht an ihrem Platz und wächst aus ihrer Mitte (Größe und Deckkraft gleichmäßig mit dem Weg) – unsichtbar, bis die Kachel die
halbe Kapsel freigibt, voll, wenn auch der Abstand dahinter frei ist –, beim Zurückwischen und Gleiten genau umgekehrt; keine rückt dabei nach rechts über
ihren Platz hinaus. …

**Neu:** … die Kachel gleitet auf und zu mit einer Feder ohne Nachschwingen, Antwortzeit 0,5 s, unabhängig vom Weg (gemessen in Notizen, Ausnahme von
R-1.12); jede Kapsel steht an ihrem Platz und wächst, sobald die Kachel sie ganz freigibt, mit eigener Zeit aus ihrer Mitte (0,25 s, Deckkraft voll nach
0,1 s); beim Zurückwischen und Tippen auf die offene Kachel vergeht jede, sobald die Kachel sie erreicht, beim Schließen durch Tippen daneben oder auf eine
andere Kachel alle zugleich (je 0,23 s); keine rückt dabei nach rechts über ihren Platz hinaus. …

**Alt (Ende):** ‚Bewegung reduzieren‘: die Kachel folgt dem Finger, die Kapseln stehen an ihrem Platz in voller Größe und blenden an denselben Stellen nur ein und aus; …

**Neu (Ende):** ‚Bewegung reduzieren‘: die Kachel folgt dem Finger, die Kapseln stehen an ihrem Platz in voller Größe und blenden zu denselben Zeitpunkten nur ein und aus; …

## P-109/V-3 – Regelkatalog R-1.12 ‚Gleitbewegungen‘

**Alt:** … Ausgenommen: das Feld beim Antippen springt (Safari, 13, APD-127/W-4), Rückmeldungen beim Drücken und Überblenden; …

**Neu:** … Ausgenommen: das Feld beim Antippen springt (Safari, 13, APD-127/W-4), die Wischaktionen (R-7.8: Feder mit 0,5 s Antwortzeit auf und zu,
gemessen in Notizen, P-109), Rückmeldungen beim Drücken und Überblenden; …

## Testfall-Liste P-109/M-1 bis P-109/M-12

Wie im Entwurf in `arbeit/0130 P-109 Wischaktionen Muster.md` (Feder, Kapsel mit eigener Zeit, Schließen durch Tippen auf eine andere Kachel, daneben,
auf die offene Kachel, Zurückwischen, Überwischen, neu anfassen während des Gleitens, ‚Bewegung reduzieren‘, Textgröße, Drehen, Gegenprobe mit der
alten Kurve). Prüfung: `ablauf.mjs` – `checkWischen` und `tests/ablauf-wischen.mjs` im Reiselogbuch, rot gegen 4.60.2.
