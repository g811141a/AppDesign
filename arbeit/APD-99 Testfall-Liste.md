# APD-99 – Testfall-Liste: Kontextstand vor jedem Auswahlfenster

Stand 31.10.2026, Sitzung 0062 · Wortlaut: `arbeit/APD-99 Wortlaut.md` (bestätigt 31.10.2026) · Prüfung `tests/regelwaechter.mjs`
(neue Nummer **W-14**, Gegenprobe `--gegenprobe`).

## Was der Wächter prüft (W-14)

Vor jedem Auswahlfenster (PreToolUse ‚fenster‘, und noch einmal beim Stop, falls der Hook fehlte – wie W-5): die **letzte Ausgabe
vor dem Fenster** in derselben Antwort, nach der vorigen Nachricht bzw. dem vorigen Fenster, enthält außerhalb der Zeitzeile einen
Satz mit ‚Kontext N‘, und N ist der Kontext aus dem letzten Aufruf von `messung.mjs` davor (abgelesen, nie geschätzt).

Befund aus dieser Sitzung: steht vor dem Fenster ein Denkschritt, speichert die Sitzungsdatei die Ausgabe nicht wörtlich
(‚unsicher‘, Zusammenarbeit 2.8 ‚Grenze‘) – dann lässt der Wächter durch (Selbstkontrolle). Vor dem Zeigen prüft er nur, wenn das
Fenster selbst schon in der Sitzungsdatei steht (sonst ist die Ausgabe davor vielleicht noch nicht geschrieben); der Stop prüft immer.

## Testfälle (automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| C-1 | Ausgabe vor dem Fenster mit ‚Der Kontextstand ist jetzt Kontext 120.000 (aus `messung.mjs`).‘, `messung.mjs` vorher mit Kontext 120.000 | durch (vor dem Zeigen und beim Stop) |
| C-2 | Ausgabe vor dem Fenster ohne ‚Kontext N‘ | vor dem Zeigen abgelehnt, beim Stop W-14 |
| C-3 | keine Ausgabe zwischen voriger Nachricht und Fenster | abgelehnt, W-14 |
| C-4 | ‚Kontext N‘ nur in einer Ausgabe vor dem vorigen Fenster, vor dem zweiten Fenster keiner | W-14 für das zweite Fenster |
| C-5 | ‚Kontext 130.000‘, aber `messung.mjs` meldete 120.000 bzw. wurde vorher gar nicht aufgerufen | W-14 ‚nicht abgelesen‘ |
| C-6 | ‚Kontext N‘ steht nur in einer Zeitzeile `<sub>⏱ …</sub>` vor dem Fenster | W-14 (dazu W-6 wie bisher) |
| C-7 | letzte Ausgabe vor dem Fenster ‚unsicher‘ (nach einem Denkschritt) | durch |
| C-8 | Fenster noch nicht in der Sitzungsdatei (PreToolUse vor dem Schreiben) | vor dem Zeigen durch; beim Stop geprüft |
| C-9 | Übergabe ohne Fenster | kein W-14 |
| C-10 | Zahl mit Tausenderpunkten (‚Kontext 195.814‘) und ohne (‚Kontext 195814‘) | beide erkannt |
| C-11 | regelgerechte Antwort aus W-8 (jetzt mit Kontext-Satz) | durch |
| C-12 | Gegenprobe: W-14 abgeschaltet (`REGELWAECHTER_AUS=W-14`) | Prüfung rot |
| C-13 | echte Antwort aus dieser Sitzung 0062 (Fenster zu Regel 13 ohne Kontext-Satz; das zu 15.4 ist nicht wörtlich gespeichert) in `regelwaechter-faelle.json` | W-14 |

## Regeltext (bestätigt) – Zusammenarbeit 3.4.0

Kasten ‚Jede Antwort‘ Punkt 9, 0 Nr. 28 und 0 Nr. 21 nach `arbeit/APD-99 Wortlaut.md`; 2.8 ‚Vor jedem Auswahlfenster‘ um ‚… oder
davor kein Satz mit ‚Kontext N‘ aus `messung.mjs` steht‘ ergänzt (Beschreibung der Prüfung, gehört zum bestätigten **W** in Punkt 9).
