# APD-106 und RLB-115 – Testfall-Liste (Korrektur AppDesign 4.48.1 · Reiselogbuch 3.46.1)

Stand 01.11.2026 · Sitzung Reiselogbuch 0070 · Muster nur hell (Vereinbarung 30.10.2026). Korrektur aus P-87 (nicht ok) und RLB-115.

**Geklärt (Nutzer 01.11.2026, Sitzung 0070):** Am iPad war ‚Größere dynamische Schrift‘ aus (deshalb dort nur `xxxl`). Am iPhone kam
mit dem Muster AX5 an, und die Großanzeige war zu sehen. Damit gibt es keinen Widerspruch mehr. Die Frage nach langem Drücken auf
einen Smiley kommt nach **etwa 1 s**. Das Abheben zeigt ein **runder heller Hintergrund mit Schatten** hinter dem Smiley.
**Geklärt danach (Sitzung 0070):** Großanzeige bleibt ab AX1; Wortlaut der Regeln bestätigt (Backlog APD-106); Muster Smiley Variante C (Kreis schwebt über der Leiste).

## Ablauf in einem Satz

Beim Berühren zeigt Safari kein eigenes Grau mehr, sondern nur unsere Rückmeldung (Knopf blass, Zeile grau). Langes Drücken auf
antippbare Zeilen und Leisten markiert keinen Text und zeigt keine Lupe. Ein gehaltener Smiley hebt sich sichtbar mit Kreis und
Schatten und fragt nach etwa 1 s. Nach dem Aus- und Einblenden der Seitenleiste steht der oberste Eintrag ganz zu sehen unter der
Leiste und dem haftenden Tabellenkopf.

## So macht es Apple

- **Antippen:** Apple-Apps zeigen beim Berühren nur die eigene Rückmeldung (Knopf blass, Zelle grau), kein zusätzliches Grau.
  `-webkit-tap-highlight-color` ist Safaris Web-Markierung und gehört nicht dazu.
- **Halten:** In Listen und Leisten markiert langes Drücken keinen Text. Es öffnet das Kontextmenü, sonst geschieht nichts.
- **Kontextmenü durch Halten (Haptic Touch):** öffnet nach etwa 0,5 s, mit ‚Schnell‘ nach etwa 0,2 s, einstellbar unter
  Bedienungshilfen → Berühren → Haptic Touch. Die Zahlen hat 9to5Mac gemessen, sie stehen nicht bei Apple
  (https://9to5mac.com/2023/06/22/ios-17-fast-long-press-menu/,
  https://www.devontechnologies.com/blog/20231003-speed-up-haptic-touch). Das Element wächst dabei sichtbar.
  **Abweichung:** Ein Smiley fragt erst nach etwa 1 s, weil Entfernen nicht rückgängig zu machen ist (Nutzer 01.11.2026).
- **Großanzeige (Large Content Viewer):** nur bei den Bedienungshilfen-Größen (AX1–AX5), WWDC19 Session 261.

## T – Testfälle (automatisch)

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| T-1 | iPad quer und hoch, iPhone hoch und quer; hell und dunkel | jede Ansicht laden | Beispielreise | `-webkit-tap-highlight-color` ist überall transparent (`html` und jede Schaltfläche, Zeile und Kachel) – AppDesign-Bausteine und die Ansichten der App |
| T-2 | iPad quer, iPhone hoch | eine Tageszeile 1 s halten (Finger, still) | Beispielreise mit Tagen | kein `selectstart`, `getSelection()` leer, `user-select: none` und `-webkit-touch-callout: none` an der Zeile; Zeile grau (R-3.6) |
| T-3 | iPad quer, iPhone hoch | Seitenleisten-Zeile, Kachel, Menüeintrag und Leisten-Knopf je 1 s halten | wie T-2 | wie T-2: keine Textauswahl, kein Callout |
| T-4 | iPad quer, iPhone hoch | einen Smiley halten | Smiley-Leiste mit 8 Smileys | ab 0,15 s hebt sich über dem Smiley eine eigene Ebene (Variante C, Muster `arbeit/APD-106 Smiley Muster.html`): heller Kreis mit `box-shadow` (berechnet ≠ none), mittig über dem Smiley, ganz zu sehen (nicht von der Kapsel abgeschnitten), wächst auf 1,3, fängt kein Antippen ab, `aria-hidden`; verschwindet mit der Frage und bei Abbruch; ‚Bewegung reduzieren‘: nur Kreis und Schatten, keine Vergrößerung |
| T-5 | iPad quer, iPhone hoch | Smiley halten, nach 0,6 s und nach 0,9 s nachsehen, dann weiter halten | wie T-4 | bei 0,6 s und 0,9 s keine Frage; nach etwa 1 s die Sprechblase ‚Entfernen‘, der Smiley senkt sich |
| T-6 | iPad quer, iPhone hoch | Smiley halten, dabei die ganze Zeit Textauswahl prüfen; Frage erscheint | wie T-4 | kein `selectstart`, keine Auswahl im Fenster, kein Callout an der Smiley-Leiste (auch nicht nach dem Erscheinen der Frage) |
| T-7 | iPad quer, iPhone hoch | Smiley halten und vor 1 s die Leiste seitlich ziehen bzw. 10 px wandern | wie T-4 | abgebrochen, keine Frage, der Smiley senkt sich (R-3.5 wie bisher) |
| T-8 | iPad quer, iPhone hoch | Versionszeile (Messmodus) und Leisten-Knopf lange drücken | – | lösen weiter nach 0,6 s aus (nur Entfernen wartet 1 s) |
| T-9 | iPhone hoch, Textgröße AX1 und AX5 (`ts-ax`) | Leisten-Knopf halten, gleiten, loslassen | – | Großanzeige in der Mitte, ganz zu sehen; Loslassen löst genau einmal aus (R-2.6 wie bisher) – **bei Schwelle XXXL zusätzlich:** bei `xxxl` ebenso, bei `xxl` nichts |
| T-10 | iPad quer | laufende Reise öffnen (heute oben), Seitenleiste aus (panel-left), wieder ein; 5-mal | Reise mit Tabelle, lange Zeile am heutigen Tag | heute steht nach jedem Umschalten **ganz** unter der Leiste und dem haftenden Tabellenkopf (Oberkante ≥ Unterkante Tabellenkopf − 1 px, Abstand ≤ 2 px) |
| T-11 | iPad hoch | wie T-10 | Reise ohne Tabelle (Kästen), mit Seitenleiste | wie T-10; mit Kästen ohne Tabellenkopf: ganz unter der Leiste |
| T-12 | iPad quer ↔ hoch, iPhone hoch ↔ quer | drehen, ein Stück gerollt, Eintrag mitten in der Tabelle | wie T-10 | oberster Eintrag bleibt und ist ganz unter dem Tabellenkopf zu sehen (R-8.1) |
| T-13 | alle | nach jeder Handlung | – | Grundregeln `pruefe.mjs` (nichts überlappt, letzter Eintrag erreichbar, Vordergrund) |
| T-14 | iPad quer | Gegenprobe: Antipp-Markierung wieder grau · `user-select` an der Tageszeile weg · Smiley-Zeit 0,6 s · `keepEdge` ohne Tabellenkopf | – | T-1, T-2, T-5 bzw. T-10 werden rot |

**Rot gegen 4.48.0 / 3.46.0 (0 Nr. 1):** T-1 (Markierung nicht gesetzt), T-2 (Tageszeile wählbar), T-4 (nur `drop-shadow`), T-5
(Frage nach 0,6 s), T-6 (Smiley-Leiste wählbar), T-10 und T-11 (heute halb unter dem Tabellenkopf, Befund 0069).

**Safari-Modell (`tests/safari.mjs`, Designrichtlinie 13):** neu die Antipp-Markierung (Grau über dem berührten Element, solange
`-webkit-tap-highlight-color` nicht transparent ist) und die Textauswahl beim langen Drücken (Safari wählt ab etwa 0,5 s das Wort
unter dem Finger, wenn `user-select` es zulässt, und zeigt die Lupe). Beides gibt es in Chromium und WebKit der Prüfumgebung
nicht. Das Modell meldet es deshalb aus dem berechneten Stil.

**Warum die Prüfungen es übersahen:** `finger` schickt nur nachgebildete Zeiger-Ereignisse. Antipp-Markierung, Textauswahl und Lupe
erzeugt erst das echte Berühren in Safari, und die Prüfung sah nur unsere Klasse `.beruehrt`. `checkLangDruecken` prüfte, dass
der Schatten berechnet ist, nicht ob Safari ihn an einem Emoji zeichnet. `checkSideToggle` prüfte nach dem Umschalten nur,
welcher Tag oben steht, nicht ob er ganz unter dem haftenden Tabellenkopf zu sehen ist.

## Testfälle (User) – nur am Gerät (kommen in den Usertest P-88)

- Knopf berühren und halten: nur blass, kein Grau (iPad, iPhone).
- Tageszeile lange halten: grau, kein markierter Text, keine Lupe.
- Smiley halten: hebt sich sichtbar mit Kreis und Schatten, Frage nach etwa 1 s, keine Markierung, keine Lupe.
- iPhone mit ‚Größere dynamische Schrift‘ und AX-Größe: Großanzeige in der Mitte (bei XXXL-Schwelle auch iPad mit XXXL).
- iPad quer: laufende Reise, Seitenleiste aus und ein – der heutige Tag ganz zu sehen.
