# RLB-121 Muster – Teuerste und günstigste Quartiere

**13.11.2026** · Sitzung ‚Reiselogbuch 0109‘ · nur hell, iPad quer · Entscheidungen RLB-121/D-1 bis D-4 (`arbeit/0108 RLB-121 Klärung.md`)

## Link

https://g811141a.github.io/AppDesign/arbeit/RLB-121/index.html

## Schritte

1. iPad quer, hell: den Link in Safari öffnen.
   Erwartet: oben ‚RLB-121 · Statistik: teuerste und günstigste Quartiere‘, darunter 6 Fälle, je oben ‚App‘ und darunter ‚Ausgabe (HTML/PDF)‘.
2. Fall 1 ‚Rundreise mit 8 Aufenthalten‘ ansehen.
   Erwartet: unter ‚Quartierkosten‘ blau hinterlegt ‚Teuerste Quartiere: Hotel Sacher (305,00 €) · Hotel Adlon (260,00 €) · Hotel Post (115,00 €)‘
   und ‚Günstigste Quartiere: Jugendherberge Lindau (42,00 €) · B&B Rosengarten (74,00 €) · Pension Seeblick (85,00 €)‘.
3. Fall 2 ‚5 Aufenthalte‘ ansehen.
   Erwartet: oben 3 (Hotel Elephant, Hotel Krone, Hotel Bären), unten 2 (Gasthaus Linde, Pension Ruth) – kein Quartier in beiden Zeilen.
4. Fall 3 und Fall 4 ansehen.
   Erwartet: Fall 3 je ein Quartier oben und unten; Fall 4 (nur 1 Aufenthalt mit Preis) keine der beiden Zeilen.
5. Fall 5 ‚Dasselbe Quartier zweimal, lange Namen‘ ansehen.
   Erwartet: ‚Hotel Krone‘ zweimal in ‚Teuerste Quartiere‘; ‚Romantik-Hotel Schloss Hohenstein an der Weinstraße (199,00 €) ·‘ bricht nur
   im Namen um, der Preis in Klammern bleibt zusammen; ‚Camping am See (0,00 €)‘ steht vorn bei den günstigsten.
6. Oben ‚Text sehr groß‘ antippen, Fall 5 ansehen.
   Erwartet: in der App stehen Bezeichnung und Wert untereinander; jede Zeile endet mit ‚·‘ oder dem letzten Eintrag, keine beginnt mit ‚·‘;
   nichts ragt rechts hinaus. Die Ausgabe bleibt 11 pt.
7. Fall 6 ‚‚Preis der Quartiere erfassen‘ aus‘ ansehen.
   Erwartet: weder ‚Quartierkosten‘ noch die zwei neuen Zeilen.

## So macht es Apple (Apple-Abgleich, 0 Nr. 23)

- **Bildschirmzeit, ‚Meistgenutzt‘:** eine Rangliste, das Meiste zuerst, je Zeile Name und Wert
  ([Apple Support 108806](https://support.apple.com/en-lamr/108806)).
- **Wallet, Apple Card:** Ausgaben nach Woche, Monat, Jahr, auch nach Händlern; bei verbundenen Konten Einblicke wie ‚häufige Händler‘ und
  ‚große Transaktionen‘ ([Apple Support 102329](https://support.apple.com/102329), [Apple Support 123096](https://support.apple.com/en-by/123096)).
- **Was wir übernehmen:** Rangfolge mit dem Extrem zuerst (teuerster bzw. günstigster vorn), höchstens 3 je Zeile, Beträge wie bei Apple
  ‚305,00 €‘ (R-5.1).
- **Bewusste Abweichung:** Apple zeigt eine Rangliste mit je einer Zeile pro Eintrag. Wir zeigen eine Aufzählung mit ‚·‘ in **einer** Zeile der
  Statistik (RLB-121/D-2) – gleich wie Wetter und Smileys, kurz in App und Ausgabe.
- **HIG-Checkliste (16):** Nr. 2 Schrift – Body, wächst mit der Textgröße; Nr. 3 Kontrast – keine neue Farbe; Nr. 8 Texte – ‚Günstigste‘
  statt ‚Billigste‘ (D-1). **Katalog (17):** R-10.5 Aufzählung, R-6.3 nichts ragt hinaus, R-5.1 Beträge, R-1.1 iPad = iPhone, R-10.2 Schrift.

## Was das Muster zeigt (Technik)

- Preis je Nacht = Preis ÷ Nächte je Aufenthalt (D-3); ab 2 Aufenthalten mit Preis; teurere Hälfte oben, Rest unten, je höchstens 3 (D-4).
  **Neu festgelegt (zur Bestätigung):** bei ungerader Zahl steht der mittlere oben; bei gleichem Preis je Nacht der frühere Aufenthalt zuerst.
- Die Aufzählung von heute (`aufzaehlung`, R-10.5: Eintrag ‚am Stück‘ ohne Umbruch) lässt einen langen Namen am iPhone hoch rechts
  hinausragen (Gegenprobe `nowrap` rot: 55 Fehler). Im Muster ist jeder Eintrag ein Block: Er bleibt am Stück, wenn er in die Zeile passt,
  sonst bricht er im Namen um; ‚(Preis) ·‘ bleibt immer zusammen. Der ‚·‘ steht im Block des Eintrags davor (sonst bricht die Zeile vor dem
  ‚·‘ um – in Chromium und WebKit gemessen).

## Prüfung des Musters

`node "arbeit/RLB-121 Muster prüfen.mjs"` – iPad quer und hoch, iPhone hoch und quer, Text Standard, XXXL, AX3, App und Ausgabe:

| Lauf | Ergebnis |
|---|---|
| Chromium | alles in Ordnung · 391 Umbrüche geprüft |
| WebKit | alles in Ordnung · 391 Umbrüche geprüft |
| Gegenprobe `umbruch` (Einträge ohne Schutz) | 258 Fehler (rot, richtig) |
| Gegenprobe `nowrap` (Aufzählung wie heute) | 55 Fehler (rot, richtig) |
| Gegenprobe `doppelt` (unten immer 3, auch doppelt) | 99 Fehler (rot, richtig) |

## Testfall-Liste

`arbeit/RLB-121 Testfall-Liste.md` – RLB-121/M-1 bis M-17:

| Nr. | Fall | Erwartet |
|---|---|---|
| M-1 | Zeilen und Reihenfolge (App, Vorschau, Ausgabe) | direkt unter ‚Quartierkosten‘: ‚Teuerste Quartiere:‘, dann ‚Günstigste Quartiere:‘ |
| M-2 | Teuerste, 8 Aufenthalte | die 3 teuersten je Nacht, teuerster zuerst, ‚Name (123,45 €)‘ |
| M-3 | Günstigste, 8 bzw. 5 Aufenthalte | 8: 3 günstigste, günstigster zuerst · 5: oben 3, unten 2, keiner doppelt, mittlerer oben |
| M-4 | Keine Zeilen | 0/1 Aufenthalt mit Preis, Preis aus oder Spalte Quartier aus |
| M-5 | Quartier zweimal | jeder Aufenthalt für sich |
| M-6 | Gleicher Preis je Nacht | früherer Aufenthalt zuerst |
| M-7 | Preis 0, ohne Preis | ‚(0,00 €)‘ zählt, ohne Preis zählt nicht |
| M-8 | Preis bleibt ganz | ‚(123,45 €)‘ nie getrennt |
| M-9 | Aufzählung (R-10.5) | Eintrag am Stück, wenn er passt; ‚·‘ am Zeilenende, nie am Anfang |
| M-10 | Nichts ragt hinaus (R-6.3) | alle Lagen, Textgrößen bis AX5; iPhone hoch ab 21 px untereinander |
| M-11 | Prüfung prüft etwas | Umbrüche geprüft, Gegenproben rot |
| M-12 | Sonderzeichen im Namen | wörtlich, kein HTML |
| M-13 | Drehen iPad | neu umbrochen, Grundregeln |
| M-14 | Preis ändern und sichern / verwerfen | Statistik sofort neu bzw. wie vorher |
| M-15 | Abgleich iPad ↔ iPhone | dieselben Zeilen auf beiden Geräten |
| M-16 | Ausgabe (HTML/PDF) | dieselben Zeilen, A4-Breite |
| M-17 | Dunkel, Bedienungshilfen | keine neue Farbe, Kontrast wie die übrige Statistik |

Testfälle (User) für den Usertest: Statistik am iPad quer ansehen; Ausgabe teilen bzw. als PDF sichern.

## Offene Usertests

keine.

## Bilder

`arbeit/RLB-121 Muster iPad quer 1.png` bis `4.png` (WebKit, 1180 × 820): Fall 1, Fall 2, Fall 5, Fall 5 mit ‚Text sehr groß‘.
