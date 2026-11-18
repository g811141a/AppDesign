# P-109 – Rückmeldung und Messung in Notizen (Sitzung 0130)

Stand 18.11.2026 · Quelle: deine Bildschirmaufnahme von Notizen am iPhone hoch (1206 × 2622 px, 3 px je pt, 60 Bilder/s, 15,4 s, 923 Bilder).
Video und Einzelbilder bleiben im Notizordner der Sitzung (private Inhalte) – hier nur die Messwerte. Gemessen Bild für Bild: rechter Rand der
gewischten Zeile, Breite, Höhe und Farbsättigung (≈ Deckkraft) jeder Kapsel.

## Deine Rückmeldung (18.11.2026)

- Darstellung der Kapseln beim Wischen und das Ein- und Ausblenden an sich: **ok**.
- **P-109/F-1:** Die Kapseln blenden beim Auf- und Zuwischen **viel zu schnell** ein und aus.
- **P-109/F-2:** Sind die Kapseln offen und du tippst auf eine **andere Kachel**, schließt alles **viel zu schnell** und nicht so weich wie in Notizen.
- Wunsch: genau so weich wie Notizen.

## Messung in Notizen

| Was | Notizen (gemessen) | bei uns heute (4.60.2) |
|---|---|---|
| Zeile gleitet zu (Tippen auf eine andere Zeile) | **Feder ohne Nachschwingen**, ω ≈ 12,6/s (Antwortzeit ≈ 0,5 s): halb nach 0,13 s, 82 % nach 0,25 s, 99 % nach 0,5 s, ganz still nach ≈ 0,75 s – **unabhängig vom Weg** | `ease-in-out` in 0,25 s, bei kürzerem Weg anteilig kürzer (mindestens 0,15 s) |
| Zeile gleitet auf (nach dem Loslassen, auch Zurückfedern nach dem Überwischen) | dieselbe Feder (ω ≈ 13/s) | Feder mit 0,35 s Antwortzeit (ω ≈ 18/s), anteilig gekürzt, mindestens 0,15 s |
| Kapsel erscheint | sobald die Zeile sie **ganz freigibt** (Rand der Zeile an der linken Kante der Kapsel); dann wächst sie **mit eigener Zeit** aus ihrer Mitte: voll nach **≈ 0,25 s**, Deckkraft voll nach ≈ 0,1 s – auch wenn der Finger schon weiter ist | wächst **mit dem Weg** (von halber Kapsel bis Abstand frei) – bei schnellem Wischen in wenigen Hundertstelsekunden |
| Kapseln vergehen beim Schließen (Tippen auf eine andere Zeile) | **alle gleichzeitig**, schrumpfen zur Mitte und blenden aus in **≈ 0,23 s**; die Zeile gleitet **über** sie | nacheinander mit dem Weg, jede in ≈ 0,05 s |
| Kapseln vergehen beim Tippen auf die offene Zeile selbst | Zeile ≈ 0,33 s; jede Kapsel blendet aus, wenn die Zeile sie erreicht (≈ 0,1 s) | wie oben |
| Kapsel (zur Kontrolle) | 60 × 34 pt, Abstand 10 pt | 66 × 44 pt, Abstand 11 pt (bleibt, Nutzer 18.11.2026) |

Kurz: In Notizen hängen die Kapseln **nicht Bild für Bild am Weg**, sondern haben eine **eigene Bewegung von etwa 0,25 s**; die Zeile gleitet
immer mit einer weichen Feder von etwa 0,5 s. Bei uns hängt alles am Weg und an 0,25 s `ease-in-out` – daher das zu schnelle Ein- und Ausblenden.

## Vorschlag (Muster zuerst, 0 Nr. 6)

Ein Muster ‚wie Notizen gemessen‘ (eine Variante, nur hell) mit:

1. **Zeile:** auf und zu mit der Feder ω ≈ 12,6/s (Antwortzeit 0,5 s), unabhängig vom Weg – auch beim Tippen auf eine andere Kachel und auf die offene Kachel.
2. **Kapsel erscheint:** sobald die Kachel sie ganz freigibt, wächst sie in 0,25 s aus ihrer Mitte und blendet in 0,1 s ein (eigene Zeit, nicht am Weg).
3. **Kapseln vergehen:** beim Schließen alle zugleich in 0,23 s (zur Mitte, ausblenden), die Kachel gleitet darüber; beim Zurückwischen mit dem
   Finger jede, sobald die Kachel sie erreicht.
4. Unverändert: Kapseln 66 × 44, Abstand 11 pt, kein Durchwischen, Zurückfedern, ‚Bewegung reduzieren‘ nur Überblenden, Textgröße.

**Abweichung von einer Regel:** R-1.12 schreibt heute für Schließen `ease-in-out` in 0,25 s vor. Für die Wischaktionen bräuchte es eine Ausnahme bzw.
neue Werte – den Wortlaut lege ich dir nach dem Muster zur Bestätigung vor (0 Nr. 29).

**Danach:** Testfall-Liste, Prüfung nach deinem Ablauf (rot gegen 4.60.2), Wortlaut, Bau-Frage für die Korrekturversion (AppDesign 4.60.3 /
Reiselogbuch 3.57.3). APD-135 Pakete 1 und 3 warten bis dahin (0 Nr. 22).
