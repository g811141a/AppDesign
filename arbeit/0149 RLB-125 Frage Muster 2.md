# RLB-125 – Was ist am Muster 2 nicht ok?

Stand 21.11.2026 · Sitzung 0149

## Link (unverändert seit 0148)

https://g811141a.github.io/AppDesign/arbeit/RLB-125/index.html

## Was Muster 2 heute zeigt

- **Gesperrtes Reiselogbuch öffnen** (Kachel antippen oder beim Start) → die **Vorschau** öffnet; oben ein Hinweis mit `lock`:
  ‚Dieses Reiselogbuch ist gesperrt. Es lässt sich lesen und ausgeben, aber nicht ändern oder löschen.‘ – daneben **‚Entsperren‘** (heute blau gefüllt).
- **‚Entsperren‘** → Vorschau schließt, normale Seite offen, keine Abfrage.
- **x ohne Entsperren** → normale Seite, aber gesperrt (Tage nur lesen, Menüpunkte blass – wie Muster 1).
- **Kachel:** `lock` heute **rot** auf weißem Kreis unten rechts.

## Schon entschieden (0148), noch nicht eingebaut

- **RLB-125/J-5:** Schloss auf der Kachel **orange** (`--warn`) statt rot.
- **RLB-125/J-6:** ‚Entsperren‘ **hell mit blauer Schrift**, Teilen bleibt die einzige blaue Hauptaktion.

## Frage

Was passt nicht? Mehrfachauswahl möglich:

- a) **Hinweis in der Vorschau** (Text, Lage oder Aussehen)
- b) **Ablauf** (z. B. dass nach x die gesperrte normale Seite kommt, oder dass ‚Entsperren‘ ohne Abfrage entsperrt)
- c) **Schloss auf der Kachel** (über J-5 hinaus: Größe, Lage, Form)
- Ich schreibe im Chat – für alles andere oder Einzelheiten
