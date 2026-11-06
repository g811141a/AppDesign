# APD-62 Teil APD-38/T-37 – Schwebendes aus Glas: Wortlaut und Testfall-Liste

Stand 06.11.2026 · Sitzung Reiselogbuch 0083 · Muster `arbeit/APD-62 Glas Muster.html` (heute, Glas 75 %, Glas 55 %; nur hell, Vereinbarung
30.10.2026). Die Nummern gelten nur in dieser Datei (außerhalb APD-62/L-n).

**Entscheidungen (Nutzer 06.11.2026, Sitzung 0083):** Variante Glas 75 %; Muster iPad quer/hoch und iPhone hoch/quer bestätigt; allgemeine
Regel ja; Wortlaut R-3.9 und die Verweise bestätigt. **Apple:** iOS 26 Liquid Glass – schwebende Bedienelemente aus Glas, ‚Transparenz
reduzieren‘ macht sie milchiger bzw. deckend (WWDC25 ‚Meet Liquid Glass‘, ‚Get to know the new design system‘). **Bewusst nicht:** Leuchten beim
Drücken (würde R-3.6 ändern), Glas-Leiste (Designrichtlinie 1).

## Wortlaut (bestätigt, Katalog Abschnitt 3 – kommt mit dem Bau)

| R-3.9 | **Schwebendes aus Glas:** die Kapsel Nach oben / Ans Ende, Menü, Untermenü und Kontextmenü sowie Suchfeld und runde Knöpfe der unteren Leiste (iPhone) sind aus Glas – Grundfarbe (hell Weiß, dunkel `--btn` bzw. `--card`) zu 75 % deckend, Unschärfe 20 px, Sättigung 180 %, Lichtkante und Schatten wie R-3.2; ‚Transparenz reduzieren‘ des Geräts: deckend wie bisher; Leisten, Fenster, Sprechblasen und alle übrigen Schaltflächen bleiben deckend | hig.mjs – `masseStile` (Unschärfe und Deckkraft genau an diesen Bausteinen, deckend bei ‚Transparenz reduzieren‘, keine Glas-Leiste) | Lesbarkeit und Flüssigkeit am Gerät | 4, 15.1, 15.6, 15.17 |

**Verweise (bestätigt):** Designrichtlinie 1 ‚… Glas-Leiste (schlechter lesbar); schwebende Kapseln und Menüs sind aus Glas (R-3.9).‘ ·
15.1 ‚… die Kapsel Nach oben / Ans Ende aus Glas (R-3.9)‘ · 15.6 ‚aus Glas, Lichtkante und Schatten wie die Schaltflächen (R-3.9)‘ · 15.17
untere Leiste ‚Suchfeld und runde Knöpfe aus Glas (R-3.9)‘.

## Testfall-Liste (Entwurf – vor dem Bau bestätigen, 0 Nr. 1)

| Nr. | Fall | Erwartet |
|---|---|---|
| L-1 | Kapsel Nach oben / Ans Ende (iPad quer und hoch, iPhone hoch und quer) | Glas: Hintergrund 75 % deckend, Unschärfe 20 px, Sättigung 180 %, Lichtkante und Schatten; Lage und Größe wie heute (R-3.2) |
| L-2 | Menü, Untermenü, Kontextmenü einer Kachel | Glas wie L-1; Lage, Breite und Einträge wie heute (R-4.1); ‚… löschen‘ rot (R-3.3) |
| L-3 | Untere Leiste iPhone: Suchfeld und runde Knöpfe, auch bei offener Tastatur | Glas wie L-1; die Leiste wandert wie heute mit der Tastatur (R-4.5) |
| L-4 | ‚Transparenz reduzieren‘ (prefers-reduced-transparency) | alle Bausteine aus L-1 bis L-3 deckend wie heute, keine Unschärfe |
| L-5 | Darstellung dunkel | Grundfarbe `--btn` bzw. `--card` zu 75 % deckend, Unschärfe wie hell |
| L-6 | ‚Kontrast erhöhen‘ (R-1.9) | Lichtkante kräftiger wie heute (`--btn-rim`), Glas bleibt |
| L-7 | Leisten, Fenster, Sprechblasen, Kapseln der Kopfzeile, übrige Schaltflächen | unverändert deckend – keine Unschärfe (R-2.1, Designrichtlinie 1) |
| L-8 | Drehen bei offenem Menü, Großanzeige (R-2.6) | Endzustand wie heute (R-8.1), Glas bleibt |
| L-9 | Drucken bzw. Ausgabe (R-6.2) | keine Unschärfe in der Ausgabe |
| L-10 | Zusammen mit APD-62/T-16 (Menü wächst, R-4.13) | Glas schon während des Wachsens, Endlage wie ohne Bewegung |
