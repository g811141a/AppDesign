# P-108 – Wischen in Notizen, gemessen (Sitzung 0128)

Stand 18.11.2026 · Quelle: Bildschirmaufnahme des Nutzers, iPad quer, Notizen, Seitenleiste (2388 × 1668 px = 1194 × 834 pt, 2 px je pt,
13,3 s, 617 Bilder). Das Video und die Einzelbilder bleiben im Notizordner der Sitzung (private Inhalte) – hier nur die Messwerte.
Gemessen je Bild in der Mitte der Kapseln (Farbton je Kapsel, Rand der Kachel am grauen Hintergrund der gewischten Zeile).

## Maße (offen, ruhend)

| Was | px | pt |
|---|---|---|
| Kapsel (Teilen, Bewegen, Löschen) | 120 × 64 | **60 × 32**, darunter das Wort |
| Abstand Kachel–Kapsel | 22 | **11** |
| Abstand zwischen den Kapseln | 21–23 | **11** |
| Abstand rechte Kapsel–Rand der geschlossenen Zeile | 21 | **11** |
| Offene Breite bei 3 Aktionen | 442 | 221 |

→ **Ein Abstand für alles: 11 pt** (bei uns heute Kachel–Kapsel 11, zwischen den Kapseln 8).

## Erscheinen beim Aufwischen (P-108/F-1)

- Jede Kapsel steht **an ihrem Platz** (rückt nicht mit der Kachel) und **wächst aus ihrer Mitte** – Breite und Höhe gemeinsam (Mitte bleibt bei
  Löschen auf 568 px, bei Bewegen auf 423 px); die Deckkraft steigt mit der Größe.
- **Beginn:** wenn der Rand der Kachel etwa die Mitte der Kapsel erreicht – also die **Hälfte der Kapsel frei** ist (Löschen: Kante 551 px bei
  Mitte 568; Bewegen: 412 bei 423).
- **Voll:** wenn auch der Abstand frei ist (Löschen voll bei Kante 483 px, linke Kapselkante 508 → 25 px ≈ ein Abstand).
- Dazwischen **linear** mit dem Weg (Löschen: Breite 38 → 120 px auf 46 px Weg).
- Die nächste Kapsel beginnt erst, wenn die Kachel wieder die Hälfte von ihr freigibt – dazwischen läuft die Kachel ein Stück mit voller Kapsel daneben.

## Zurückwischen (P-108/F-4)

Genau umgekehrt und nur vom Weg abhängig: Teilen schrumpft zur Mitte (Mitte bleibt auf 288 px), weg bei Kante ≈ 290; dann Bewegen (weg ≈ 408), dann
Löschen (weg ≈ 552). Kein Unterschied zwischen hin und zurück (keine Schwelle mit Gedächtnis).

## Über die letzte Kapsel hinaus (P-108/F-2)

- **Kein Durchwischen**, nichts wird langgezogen.
- Die Kachel geht nur noch **mit starkem Widerstand** weiter: 28 px (14 pt) über ‚offen‘ hinaus.
- Die Kapseln **rücken anteilig mit** – je weiter links, desto mehr (Teilen 26 px, Bewegen 18 px, Löschen 8 px; entspricht dem Abstand ihrer
  linken Kante vom rechten Rand) – und **wachsen leicht** (120 → 127 px, ≈ 6 %); die Abstände bleiben 11 pt.
- **Loslassen:** federt in etwa 0,4 s auf ‚offen‘ zurück, Kapseln wieder in normaler Größe.

## Nebenbei beobachtet (nicht gewünscht, nur zur Info)

- Die gewischte Zeile bekommt einen grauen Hintergrund (wie beim Antippen).
- Die Kapseln in Notizen sind 32 pt hoch, unsere 44 pt (R-7.8, HIG-Mindestgröße für Antippen 44 pt).

## Umsetzung im Muster (Stand 2, ‚N wie Notizen‘)

Kapsel 66 × 44 (unverändert), Abstand **11 pt** überall, Wachsen aus der Mitte von ‚halbe Kapsel frei‘ bis ‚Abstand frei‘, Überwischen mit
Widerstand (höchstens 60 px), Kapseln rücken anteilig mit und wachsen bis 6 %, Loslassen federt auf ‚offen‘. Geprüft in Chromium und WebKit
(iPad quer): Löschen sichtbar ab 44 px Weg, halb bei 66, voll bei 88; Einstellen ab 121, voll bei 165 (offene Breite); offen 11 pt Abstand
Kachel–Einstellen und Einstellen–Löschen; bei 400 px Fingerweg steht die Kachel bei 206 px, Abstand zur Kapsel 12 px; nach dem Loslassen 165 px.
