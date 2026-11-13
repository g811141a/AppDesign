# RLB-121 Statistik: teuerste und günstigste Quartiere – Klärung

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0108‘ · noch nichts gebaut, kein Muster · **Antworten (Nutzer 13.11.2026): 1 a, 2 a, 3 a, 4 a** – RLB-121/D-1 bis D-4 im Backlog

## Stand im Code (Reiselogbuch 3.55.1)

- Die Statistik entsteht in `tripStats(trip)` und erscheint in der App, in der Vorschau und in der Ausgabe (HTML/PDF), überall dieselben Zeilen.
- Preise gibt es nur mit **‚Preis der Quartiere erfassen‘** (`trip.priceOn`, RLB-111). Gespeichert wird der Preis je **Aufenthalt**: Das sind
  aufeinanderfolgende Nächte im selben Quartier (`quarterStays`, Preis = Summe der eingetragenen Preise, dazu `nights`).
- Schon heute gibt es die Zeile ‚Quartierkosten‘ mit Summe und ‚(Ø … € je Nacht)‘. Wetter und Smileys stehen als Aufzählung mit ‚·‘ (RLB-122,
  `aufzaehlung` aus AppDesign).

## So macht es Apple

Dazu habe ich in dieser Sitzung nichts belegt. Den Apple-Abgleich (0 Nr. 23) mache ich vor dem Muster.

## Fragen

1. **Wort:** a) ‚Günstigste Quartiere‘ (Empfohlen – neutral, der Vorschlag aus dem Backlog) · b) ‚Billigste Quartiere‘
2. **Darstellung:** a) zwei neue Zeilen in der Statistik unter ‚Quartierkosten‘: ‚Teuerste Quartiere:‘ und ‚Günstigste Quartiere:‘, je eine
   Aufzählung ‚Name (123,45 €) · Name (98,00 €) · …‘, umgebrochen nur nach dem ‚·‘ wie bei Wetter und Smileys (Empfohlen – gleiches Muster
   wie die vorhandenen Zeilen, in App und Ausgabe gleich) · b) eine kleine Tabelle mit Rang, Quartier und Preis je Nacht
3. **Preis je Nacht:** a) je Aufenthalt Preis ÷ Nächte; ist dasselbe Quartier zweimal besucht, zählt jeder Aufenthalt für sich, wie in der
   Quartierliste (Empfohlen) · b) je Quartiername zusammengefasst (Summe ÷ Nächte aller Aufenthalte)
4. **Weniger als 6 Aufenthalte mit Preis:** a) kein Quartier doppelt: die teurere Hälfte oben, der Rest unten, je höchstens 3; ab 2
   Aufenthalten mit Preis, mit nur einem keine der beiden Zeilen (Empfohlen) · b) immer je bis zu 3, auch wenn ein Quartier in beiden Zeilen steht

Danach: Apple-Abgleich, Muster (nur hell, iPad quer) mit Testfall-Liste, dann ‚allgemein oder App?‘ (0 Nr. 4).
