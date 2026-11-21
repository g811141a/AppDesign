# P-118/F-1 – Prüfung rot, Bau-Frage

**Stand 21.11.2026** · Sitzung 0147

## Feste Prüfung (0 Nr. 1) – rot gegen 4.67.1

- `checkBeruehren` (`ablauf.mjs`): jede Schaltfläche hebt sich als helle Fläche mit Schatten, Faktor 1,3, höchstens 24 px breiter (Variante B); im Rollbereich
  nach 80 ms; ‚Bewegung reduzieren‘ ohne Wachsen; senkt sich in 0,2 s.
- `katalog.mjs` APD-140/Z-7: Seite ‚Hervorgehobene Quelle‘, `#bkMenu` und die erste Schaltfläche, in allen 4 Ansichten.
- **Ergebnis gegen 4.67.1 (Chromium):** rot. Beispiel iPad quer: ‚`#bkMenu`: die Schaltfläche wird blass (Deckkraft 0.35)‘, ‚wächst nicht auf das 1,30-Fache
  (44 px breit)‘; ‚`#bkQ1`: … wächst nicht auf das 1,18-Fache (130 px breit)‘.

## Vorschlag Korrekturversion AppDesign 4.67.2 / Reiselogbuch 3.57.12

1. `design.css` und `ui.js` (`GROSS_SEL`): das Heben gilt für **jede Schaltfläche**, nicht nur in Leisten; Faktor nach Variante B (`--s` aus der Breite); das Blass-
   Werden entfällt. Listen- und Tabellenzeilen sowie Menüeinträge werden weiter grau.
2. R-3.6 im freigegebenen Wortlaut.
3. Prüfungen wie oben; dazu in der App `ablauf-beruehren` mit einer Schaltfläche außerhalb der Leisten.
4. AD-Bean: keine, weil das Heben ein Grundstil ist.
5. Prüflauf **Stufe voll** (`design.css`, `ui.js` und die Prüfungen ändern sich).

## Offene Frage vor dem Bau

**Schaltflächen in der Auswahl-Kapsel** (Smileys, Wetter, Reisemittel – `.cap`, rollt seitlich, schneidet ab): heute werden sie nach 80 ms blass, beim langen
Drücken hebt sich ein Smiley schon (R-3.5 ‚Anheben‘). Vorschlag: **wie heute lassen**. Ein 1,3-faches Heben würde von der Kapsel abgeschnitten, und die Markierung
(Tapback) ist dort Apples Rückmeldung. Das wäre eine bewusste Ausnahme, die in R-3.6 genannt wird: ‚… (Auswahl-Kapsel: blass, R-3.5)‘.
