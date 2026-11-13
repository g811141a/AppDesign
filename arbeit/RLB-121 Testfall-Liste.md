# RLB-121 Teuerste und günstigste Quartiere – Testfall-Liste

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0109‘ · Entscheidungen RLB-121/D-1 bis D-4 (`arbeit/0108 RLB-121 Klärung.md`) · Muster
`arbeit/RLB-121/index.html`, Prüfung `arbeit/RLB-121 Muster prüfen.mjs` · **bestätigt (Nutzer 13.11.2026, Sitzung 0109):** Muster, Testfall-Liste M-1 bis M-17, Reihenfolge – bei ungerader Zahl der mittlere oben, bei gleichem Preis je Nacht der frühere Aufenthalt zuerst (RLB-121/D-5)

Nach Zusammenarbeit 0 Nr. 1: Gerät (iPad, iPhone) × Lage (quer, hoch) × Darstellung (hell, dunkel, Bedienungshilfen) × Handlung (ansehen, drehen,
Textgröße, Preis ändern, abgleichen, Ausgabe teilen) × Daten (0, 1, 2, 3, 5, 8 Aufenthalte mit Preis; Preis 0; gleicher Preis; langer Name;
Quartier zweimal; Sonderzeichen). Nach jeder Handlung gelten die Grundregeln (`pruefe.mjs`).

## Testfälle (automatisch)

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| RLB-121/M-1 | Zeilen und Reihenfolge – App (iPad und iPhone), Vorschau, Ausgabe | direkt unter ‚Quartierkosten‘: ‚Teuerste Quartiere:‘, dann ‚Günstigste Quartiere:‘ | Muster; neu in `ablauf-preis-km.mjs` |
| RLB-121/M-2 | Teuerste: 8 Aufenthalte mit Preis | die 3 mit dem höchsten Preis je Nacht (Preis ÷ Nächte), teuerster zuerst, je ‚Name (123,45 €)‘ | Muster; `ablauf-preis-km.mjs` |
| RLB-121/M-3 | Günstigste: 8 bzw. 5 Aufenthalte | 8: die 3 günstigsten, günstigster zuerst · 5: oben 3, unten 2 – kein Aufenthalt in beiden Zeilen; bei ungerader Zahl der mittlere oben | Muster; `ablauf-preis-km.mjs` |
| RLB-121/M-4 | Keine Zeilen | 0 oder 1 Aufenthalt mit Preis, ‚Preis der Quartiere erfassen‘ aus oder Spalte Quartier aus: keine der beiden Zeilen | Muster; `ablauf-preis-km.mjs` |
| RLB-121/M-5 | Dasselbe Quartier zweimal (nicht direkt hintereinander) | jeder Aufenthalt für sich, wie in der Quartierliste – der Name kann zweimal stehen | Muster; `ablauf-preis-km.mjs` |
| RLB-121/M-6 | Gleicher Preis je Nacht | der frühere Aufenthalt zuerst (in beiden Zeilen) | Muster (Fall 2); `ablauf-preis-km.mjs` |
| RLB-121/M-7 | Preis 0 und Aufenthalt ohne Preis | ‚(0,00 €)‘ zählt mit; ein Aufenthalt ohne Preis zählt nicht | Muster (Fälle 4, 5); `ablauf-preis-km.mjs` |
| RLB-121/M-8 | Preis bleibt ganz | ‚(123,45 €)‘ nie getrennt, in keiner Lage und Textgröße | Muster |
| RLB-121/M-9 | Aufzählung (R-10.5) | ein Eintrag, der in die Zeile passt, bleibt am Stück; der ‚·‘ steht am Zeilenende, nie am Anfang; ein Eintrag, der allein nicht passt, bricht im Namen um | Muster; `checkAufzaehlung` |
| RLB-121/M-10 | Nichts ragt hinaus (R-6.3) | iPad quer/hoch, iPhone hoch/quer; Text Standard, XXXL, AX3 (App: AX5 53 px); am iPhone hoch ab 21 px untereinander (`ts-um`) | Muster; `hig.mjs` |
| RLB-121/M-11 | Prüfung prüft etwas | mindestens ein Umbruch geprüft; Gegenproben `umbruch`, `nowrap`, `doppelt` werden rot | Muster |
| RLB-121/M-12 | Sonderzeichen im Namen (‚B&B <Rosen>‘) | erscheint wörtlich, kein HTML | `ablauf-preis-km.mjs` |
| RLB-121/M-13 | Drehen iPad quer → hoch → quer | Zeilen neu umbrochen, M-8 bis M-10 gelten; oberster Eintrag bleibt (Grundregeln) | `ablauf-preis-km.mjs` mit `pruefe.mjs` |
| RLB-121/M-14 | Preis im Fenster Tag ändern und sichern | Statistik zeigt sofort die neuen Zeilen; ‚Änderungen verwerfen‘ stellt sie wieder her | `ablauf-preis-km.mjs` |
| RLB-121/M-15 | Abgleich iPad ↔ iPhone | auf beiden Geräten dieselben zwei Zeilen | `ablauf-abgleich-faelle.mjs` |
| RLB-121/M-16 | Ausgabe (HTML/PDF) | dieselben Zeilen wie in der App, 11 pt, M-8 bis M-10 auf A4-Breite | Muster; `ablauf-gesamt.mjs` |
| RLB-121/M-17 | Dunkel und Bedienungshilfen | keine neue Farbe; Kontrast wie die übrigen Zeilen der Statistik | `hig.mjs` (alle Teile) |

## Testfälle (User) für den Usertest

- Statistik am iPad quer ansehen (Aussehen, Lesbarkeit).
- Ausgabe teilen bzw. als PDF sichern – zwei Zeilen im PDF (Teilen-Menü, Druckbild nur am Gerät).
