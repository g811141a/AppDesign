# Muster P-109 – Wischaktionen weich wie Notizen (Sitzung 0130)

Stand 18.11.2026 · zu P-109/F-1 und P-109/F-2 · Messung `arbeit/0130 P-109 Notizen Messung.md` · nur hell

## Link

Auf `main` von AppDesign seit Commit 9063ade (Nutzer ‚Ja, hochladen‘ 18.11.2026), Pages-Lauf ‚success‘ 14:58 UTC.

https://g811141a.github.io/AppDesign/arbeit/0130%20P-109%20Wischaktionen%20Muster.html

## Was im Muster steht

- **N · wie Notizen (2 Aktionen)** – so würde das Reiselogbuch: Kachel gleitet auf und zu mit der Feder aus Notizen (ω = 12,6/s, Antwortzeit
  0,5 s, gleich lang egal wie weit); jede Kapsel erscheint, sobald die Kachel sie ganz freigibt, und wächst in 0,25 s aus ihrer Mitte (Deckkraft
  voll nach 0,1 s); Schließen durch Tippen auf eine andere Kachel oder daneben: beide Kapseln vergehen zugleich in 0,23 s, die Kachel gleitet darüber;
  Zurückwischen mit dem Finger und Tippen auf die offene Kachel: jede Kapsel vergeht, sobald die Kachel sie erreicht.
- **N · mit 3 Aktionen** – dasselbe wie Notizen (Teilen, Bewegen, Löschen) zum direkten Vergleich.
- **H · heute (4.60.2)** – zum Vergleich: Kapseln am Weg, Schließen `ease-in-out` 0,25 s.
- Unverändert: Kapseln 66 × 44, Abstand 11 pt, kein Durchwischen, Widerstand und Zurückfedern, ‚Bewegung reduzieren‘ (nur Einblenden).

Geprüft im Muster (iPhone 402 × 874, Chromium und WebKit, keine Fehler in der Konsole): nach dem Loslassen bei 120 px ist ‚Löschen‘ nach
≈ 0,1 s voll deckend und nach ≈ 0,25 s voll groß, ‚Einstellen‘ beginnt, sobald die Kachel sie freigibt (≈ 0,25 s), die Kachel steht nach ≈ 0,5 s;
Tippen auf die andere Kachel: beide Kapseln zugleich auf 64 % nach 0,09 s, weg nach 0,25 s, die Kachel ist nach 0,25 s bei 30 px und nach ≈ 0,7 s still.

## Schritte am Gerät (Notizen daneben öffnen)

1. iPhone hoch: Link öffnen. Im Feld ‚N · wie Notizen‘ eine Kachel zügig nach links wischen und loslassen.
   Erwartet: die Kachel gleitet weich auf ‚offen‘; ‚Löschen‘ und danach ‚Einstellen‘ wachsen sichtbar aus ihrer Mitte, nicht schlagartig – wie in Notizen.
2. Auf die **andere** Kachel tippen.
   Erwartet: beide Kapseln schrumpfen zugleich und blenden aus, die Kachel gleitet weich darüber zurück und kommt sanft zum Stehen – wie in Notizen.
3. Eine Kachel öffnen und langsam mit dem Finger zurückwischen.
   Erwartet: zuerst vergeht ‚Einstellen‘, dann ‚Löschen‘, jeweils wenn die Kachel sie erreicht.
4. Eine Kachel öffnen und auf die offene Kachel tippen.
   Erwartet: sie gleitet weich zurück, die Kapseln vergehen nacheinander.
5. Dasselbe im Feld ‚mit 3 Aktionen‘ direkt neben Notizen.
   Erwartet: Tempo und Weichheit wie in Notizen.
6. Zum Vergleich 1 und 2 im Feld ‚H · heute‘.
   Erwartet: dort deutlich schneller – das ist der heutige Stand.
7. Dasselbe am iPad quer.
   Erwartet: wie 1 bis 6.

## Testfall-Liste (Entwurf, wird nach dem Muster bestätigt)

| Nr. | Gerät × Lage | Handlung | Erwartet (feste Prüfung) |
|---|---|---|---|
| M-1 | iPad quer, iPhone hoch | schnell wischen, loslassen (Rest) | Kachel folgt der Feder ω = 12,6/s: halb nach ≈ 0,13 s, ≥ 99 % nach 0,5 s, unabhängig vom Weg |
| M-2 | iPad quer, iPhone hoch | Kapsel wird ganz frei | Kapsel wächst mit eigener Zeit: Deckkraft 1 nach 0,1 s, Größe 1 nach 0,25 s, auch wenn die Kachel steht |
| M-3 | iPad quer, iPhone hoch | offen, Tippen auf eine andere Kachel | alle Kapseln vergehen zugleich in 0,23 s; die Kachel gleitet mit der Feder zu; die andere Kachel öffnet nichts |
| M-4 | iPad quer, iPhone hoch | offen, Tippen daneben bzw. auf eine Kapsel nach der Aktion | wie M-3 |
| M-5 | iPad quer, iPhone hoch | offen, Tippen auf die offene Kachel | Kachel mit der Feder zu, jede Kapsel vergeht, sobald die Kachel sie erreicht |
| M-6 | iPad quer, iPhone hoch | langsam zurückwischen | erst ‚Einstellen‘, dann ‚Löschen‘ vergehen, je wenn die Kachel sie erreicht |
| M-7 | iPad quer, iPhone hoch | weit überwischen, loslassen | Widerstand, Kapseln rücken mit und wachsen ≤ 6 %, Zurückfedern mit der Feder; nichts gelöscht |
| M-8 | iPad quer, iPhone hoch | während des Gleitens neu anfassen | Kachel bleibt an der Stelle, folgt dem Finger ohne Sprung |
| M-9 | beide | ‚Bewegung reduzieren‘ | Kapseln blenden nur ein und aus (0,1 bzw. 0,23 s), wachsen und rücken nicht |
| M-10 | beide | größte Textgröße | Kapseln und Abstände wachsen mit, nichts ragt hinaus (wie P-109/5) |
| M-11 | iPad quer → hoch | drehen mit offener Kachel | Grundregeln nach dem Drehen (pruefe.mjs) |
| M-12 | beide | Gegenprobe | mit der alten Kurve (ease-in-out 0,25 s, Kapseln am Weg) wird die Prüfung rot an M-1 bis M-3 |

Als Testfall (User) am Gerät: das Wischgefühl im Vergleich mit Notizen (Tempo, Weichheit).
