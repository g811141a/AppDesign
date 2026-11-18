# Bau-Frage AppDesign 4.60.3 / Reiselogbuch 3.57.3 (Sitzung 0130)

**Inhalt (Korrektur P-109/F-1, P-109/F-2 – Wortlaut P-109/V-1 bis P-109/V-3, Testfall-Liste P-109/M-1 bis P-109/M-12 bestätigt):**

- `createSwipeactions`: Kachel gleitet auf und zu mit der Feder aus Notizen (Antwortzeit 0,5 s, unabhängig vom Weg).
- Kapseln mit eigener Zeit: erscheinen, sobald die Kachel sie ganz freigibt, wachsen in 0,25 s (Deckkraft voll nach 0,1 s); vergehen beim
  Zurückwischen und Tippen auf die offene Kachel, sobald die Kachel sie erreicht, beim Schließen durch Tippen daneben bzw. auf eine andere Kachel
  alle zugleich – je 0,23 s. ‚Bewegung reduzieren‘: nur Ein- und Ausblenden zu denselben Zeitpunkten.
- Designrichtlinie 15.4, R-7.8, R-1.12 nach dem bestätigten Wortlaut.
- Prüfungen: neu W-100 (Feder auf und zu), W-101 (Kapsel mit eigener Zeit), W-102 (Schließen: alle zugleich, Feder); W-83 und W-91 ersetzt;
  W-81/W-82 prüfen die Reihenfolge; Gegenproben werden auf den neuen Code umgestellt.

**Rot gegen 4.60.2** (Chromium, alle Ansichten von `ablauf-wischen.mjs`): W-100 ‚nach 130 ms 97 % des Wegs‘ (Feder: ≈ 50 %),
W-101 ‚ganz deckend 32 ms nach dem Erscheinen statt ≈ 100 ms‘, W-102 ‚vergehen nicht zugleich‘ und ‚nach 250 ms 100 % des Wegs‘ (Feder: ≈ 82 %).

**Stufe:** voll (AppDesign ändert sich, Zusammenarbeit 0 Nr. 2) – zuletzt 77 Minuten.

**Kontext:** 297.374 – Grenze 300.000 ist fast erreicht; du hast ‚hier weiter bauen‘ gewählt.
