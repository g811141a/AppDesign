# A-37 ‚Nach oben / Ans Ende‘ verbessern – Apple-Abgleich, Varianten, Fall-Liste

**Stand 22.10.2026** · Sitzung ‚Reiselogbuch 0025‘, **gewählt: B+C** (Nutzer 22.10.2026, Sitzung ‚Reiselogbuch 0029‘) ·
Muster: `arbeit/A-37 Muster.html` (Umschalter ‚B+C‘)
(https://g811141a.github.io/AppDesign/arbeit/A-37%20Muster.html)

## 1. Heute (R-3.2, 15.17, 15.22)

Senkrechte Kapsel unten rechts mit `arrow-up-to-line` und `arrow-down-to-line`, iPad und iPhone in der Inhaltsansicht,
sichtbar sobald es etwas zu rollen gibt – auch ganz oben (dann bewirkt ‚Nach oben‘ nichts) und ganz am Ende (‚Ans Ende‘
bewirkt nichts). Über der Tastatur, nie über Kopf- oder Suchzeile (A-33); bei offener Tastatur rollt sie erst nach dem
Schließen (A-36). Bewusste Abweichung von Apple (A-15: Statusleiste und Rollbalken waren zu schwerfällig).

## 2. Apple-Abgleich

| Wo | Was Apple macht | Für uns |
|---|---|---|
| iOS allgemein | Statusleiste antippen → ganz nach oben (`scrollsToTop`) | wirkt nicht im eigenen Rollbereich (Designrichtlinie 13); nur nach oben |
| Fotos, Kontakte, lange Listen | Rollbalken halten und ziehen → schnell durch die Liste; Fotos zeigt dabei das Datum | Vorbild für **C** |
| iOS 26, Tab-Leiste | aktiven Tab nochmals antippen → nach oben | keine Tab-Leiste |
| HIG Scroll views | Standardgesten unterstützen, sichtbar machen, dass Inhalt rollt | erfüllt |
| Chat-Apps (Gemini, ChatGPT, WhatsApp) | runder Knopf mit ↓ unten in der Mitte, sobald man nicht am Ende ist; verschwindet am Ende | Vorbild für **A** |

Apple selbst hat keinen allgemeinen ‚Ans Ende‘-Knopf; der Knopf ist ein Muster der Chat-Apps. Die Beschreibung der
Gemini-App stammt aus meinem Wissen und ließ sich per Suche nicht bestätigen – bitte am Gerät mit Gemini vergleichen.
Quellen: [HIG – Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views),
[UIScrollView.scrollsToTop](https://developer.apple.com/documentation/uikit/uiscrollview/scrollstotop).

## 3. Varianten im Muster (Umschalter oben rechts: Heute · A · B · C · B+C)

| | Aussehen | Verhalten | Vorteil | Nachteil |
|---|---|---|---|---|
| **Heute** | Kapsel unten rechts, ↑ und ↓ | immer beide | bekannt | ein Pfeil oft ohne Wirkung, deckt rechts unten ab |
| **A (wie Gemini)** | ein runder Knopf unten in der Mitte | Pfeil folgt der letzten Wischrichtung (↓ Ans Ende, ↑ Nach oben); erscheint erst, wenn das Ziel weiter als eine halbe Bildschirmhöhe weg ist; am Ziel dreht er auf die andere Richtung | ein Knopf, zeigt nur, was du gerade willst | in der Mitte deckt er Text ab; Meldungen (Toast) müssen darüber |
| **B (Kapsel, die mitdenkt)** | Kapsel unten rechts wie heute | oben nur ↓, am Ende nur ↑, dazwischen beide; nahe einem Ende fehlt dessen Pfeil | kleine Änderung, nichts ohne Wirkung | Kapsel wechselt die Höhe |
| **C (wie Apple Fotos)** | Griff rechts am Rand | erscheint beim Wischen, ziehen springt durch das ganze Reiselogbuch, Blase zeigt den Tag; blendet nach 1,5 s aus; ganz oben/unten ziehen = Anfang/Ende | jeder Tag direkt erreichbar, Apple-Muster | erst wischen, dann ziehen; kein Antippen |

**Gewählt: B+C** (Nutzer 22.10.2026) – Kapsel wie B, dazu der Griff wie C. Festlegungen für die Kombination (im Muster so
umgesetzt):

- Der **Griff läuft nur bis über die Kapsel** – Platz für ihre volle Höhe (2 × 48 px + 8 px), damit seine Bahn nicht springt,
  wenn ein Pfeil wegfällt.
- Der Griff erscheint erst ab **drei Bildschirmhöhen** Inhalt; darunter genügt die Kapsel.
- Die **Blase** zeigt die Marke des Abschnitts oben im Bild. Die App liefert die Marken (`data-marke`); im Reiselogbuch
  ‚Tag 19 · Fr 20.03.‘, danach ‚Quartierliste‘, ‚Statistik‘, ‚Fazit‘. Ohne Marken gibt es keine Blase.
- Damit ist auch **A-45** (ziehbarer Index) entschieden; A-46 (haftende Abschnittsköpfe) und ‚Titel antippen = nach oben‘
  (A-62) bleiben eigene Themen.

## 4. Fall-Liste B+C (für den Bau)

Jeder Fall wird eine automatische Prüfung (Chromium und WebKit, hell und dunkel), Ausnahmen in der Prüfliste.

| Nr. | Fall | Erwartet |
|---|---|---|
| F-1 | iPad quer/hoch, iPhone hoch/quer | Lage wie gewählt, im sicheren Bereich, nie über Kopf- oder Suchzeile (R-3.2) |
| F-2 | Inhalt kürzer als der Bildschirm | nichts sichtbar |
| F-3 | ganz oben · Mitte · ganz am Ende · knapp vor einem Ende (näher als eine halbe Bildschirmhöhe) | oben nur ↓, am Ende nur ↑, dazwischen beide, knapp vor einem Ende fehlt dessen Pfeil; die Kapsel steht unten fest (unterer Rand bleibt) |
| F-4 | Griff: wischen, dann 1,5 s Ruhe | erscheint beim Rollen, blendet nach 1,5 s aus; nie ohne Rollen sichtbar |
| F-5 | Antippen während des weichen Rollens · Griff ziehen während des weichen Rollens | rollt zum Ziel bzw. folgt dem Finger; Anzeige danach richtig |
| F-6 | Tastatur offen (Feld im Inhalt, Suche) | Kapsel über der Tastatur; passt sie nicht (iPhone quer), ausgeblendet; rollt erst nach dem Schließen (wie 4.28.1); Griff bei offener Tastatur ausgeblendet |
| F-7 | Suche mit Treffern, Treffer weiter | Anzeige folgt dem neuen Rollstand |
| F-8 | Drehen | Rollstand bleibt, Anzeige neu berechnet |
| F-9 | Fenster offen | nicht sichtbar und nicht bedienbar |
| F-10 | Neuaufbau (`setHtml`), Tag gespeichert | Anzeige neu berechnet |
| F-11 | sehr langes Reiselogbuch (365 Tage) | ‚Ans Ende‘ kommt schnell an; Blase zeigt den richtigen Tag, Ziehen bleibt flüssig |
| F-12 | Startliste, Seitenleiste | wie heute keine Kapsel |
| F-13 | Drucken | ausgeblendet |
| F-14 | Meldung (Toast) gleichzeitig | überdeckt sich nicht (Platz neben der Kapsel wie heute) |
| F-15 | VoiceOver | Kapsel: ‚Nach oben‘ / ‚Ans Ende‘ nur für sichtbare Pfeile; Griff: ‚Schnell rollen‘ als Regler (Wert = Marke), Wischen hoch/runter springt einen Abschnitt |
| F-16 | Griff ganz nach oben / ganz nach unten ziehen, über die Bahn hinaus | Anfang bzw. Ende des Inhalts |
| F-17 | Griff-Bahn | unter der Kopf- bzw. Suchzeile, endet über der Kapsel in voller Höhe; im sicheren Bereich (rechts `--safe-right`) |
| F-18 | Inhalt kürzer als drei Bildschirmhöhen | nur die Kapsel, kein Griff |
| F-19 | Blase | zeigt die Marke des Abschnitts oben im Bild; ohne Marken keine Blase; links neben dem Griff, nie abgeschnitten |
| F-20 | Griff ziehen | der Inhalt rollt nicht zusätzlich mit; kein Antippen eines Tages darunter; das Zurückwischen vom linken Rand (A-61) bleibt frei |
| F-21 | ‚Bewegung reduzieren‘ | Ein- und Ausblenden ohne Bewegung (nur Deckkraft) |
| F-22 | nur am Gerät (Prüfliste) | Gefühl beim Antippen und Ziehen, Verdeckung von Text, Griff mit dem Daumen, Vergleich mit Apple Fotos |

## 5. Danach

R-3.2 ergänzen (eine Regel, eine Prüfung: `checkFab` deckt Kapsel und Griff), Designrichtlinie 4, 15.1 (neuer Abschnitt
‚Schnellroll-Griff‘), 15.17, 15.22; Baustein in `ui.js` (Kapsel B, Griff mit Marken `data-marke`), im Reiselogbuch die Marken
an den Tageskästen und Abschnitten; A-45 erledigt. Bau nach dem Ja des Nutzers als **AppDesign 4.30.0 / Reiselogbuch 3.28.0**.
