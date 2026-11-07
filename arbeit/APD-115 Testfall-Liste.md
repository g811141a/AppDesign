# APD-115 – Rollen wie Apple (APD-115/V-3) und Bezeichnung über dem Feld: Apple-Abgleich, Muster, Testfall-Liste

Stand 07.11.2026 · Sitzung Reiselogbuch 0090 · Grundlage `arbeit/APD-115 Befund.md` (APD-115/E-3, APD-115/E-4, APD-115/E-5) · **Muster: Variante A gewählt, Wortlaut R-4.5 bestätigt, am Gerät ‚nicht ok‘ (Einzelheiten offen)**

## Rückmeldung (Nutzer 07.11.2026, Sitzung 0091)

- APD-115/E-6 Variante A (APD-115/V-4): ‚Verlauf‘ direkt über dem Feld, Vorschläge darunter.
- APD-115/E-7 Wortlaut R-4.5 ‚Neu‘ (unten) bestätigt (0 Nr. 29) – geht mit dem Bau von APD-115.
- APD-115/E-8 Schritte am Gerät ‚nicht ok‘ – welche Schritte und was, wird erfragt; danach nach 0 Nr. 1 zuerst den Ablauf als feste Prüfung
  nachbauen (rot gegen das Muster), dann beheben.

## Befund Schritt 7 ‚Feld wechseln‘ (Nutzer 07.11.2026, Sitzung 0091: ‚am iPad und iPhone herumgesprungen, sehr irritierend‘)

Messung `arbeit/APD-115 Messungen/2026-11-07 iPad quer Quartier dann Ort.txt` (iPad quer, Safari mit Adressleiste: Seitenhöhe 702, sichtbar mit
Tastatur 274) und Nachstellung im Safari-Modell (Skript nur in der Sitzung):

- APD-115/N-1 Quartier antippen (Fenster oben): ‚V-3 fQuarter rollt 342‘, Tastatur auf – ruhig.
- APD-115/N-2 Ort antippen (iPad quer **in derselben Zeile** wie Quartier, ganz über der Tastatur): ‚V-3 fPlace rollt 178‘ – die Mitte-Regel
  (APD-115/A-2) rollt, obwohl das Feld schon ganz sichtbar ist. 136 ms danach verschiebt Safari zusätzlich die Seite um 179 px (`scrollY` 179,
  Kopfzeile 6 ms lang bei −179, dann von `placeDialogs` zurückgestellt) – das Springen.
- APD-115/N-3 beim Tippen in Ort zweimal ‚zurückgestellt fPlace 1251 → 1284‘: etwas rollt den Fensterinhalt 33 px zurück, die App stellt ihn
  wieder hin – kleines Zucken bei jedem Zeichen.
- APD-115/N-4 Safari-Modell: iPad quer rollt die App beim Wechsel 777 → 924 (147 px) statt 0; iPhone hoch zweimal (43, dann 201 px) statt einmal
  59 px bis 16 px über die Tastatur. Die Verschiebung von Safari (N-2) bildet das Modell nicht nach – darum war APD-115/M-7 grün.
- APD-115/N-5 Folgerung: beim Wechsel wie beim ersten Antippen nur so weit rollen wie nötig (ganz sichtbar: nichts); das Modell bekommt den
  Befund N-2 (Rollen der App beim Wechsel → Safari verschiebt zusätzlich), M-7 wird geschärft (gleiche Zeile: nichts rollt; Feld unter der
  Tastatur: einmal bis 16 px darüber). Ob Safari ohne das Rollen der App noch selbst verschiebt (APD-36/S-6 b), zeigt erst die nächste Messung.
- APD-115/N-6 Geschärfte Prüfung APD-115/M-7 (Fenster oben bzw. unten, Quartier antippen, tippen, Ort antippen; ‚ganz sichtbar: nichts rollt,
  sonst einmal bis 16 px über die Tastatur, ein Schub‘) gegen das Muster: **rot**, 20 Fehler in allen vier Ansichten (iPad quer 777 → 924,
  iPad hoch 385 → 756, iPhone hoch zwei Schübe 43 und 201 px bis 248 statt 433, iPhone quer 11 px zu wenig).
- APD-115/N-7 Versuch ohne die Mitte-Regel (Sitzung 0091, nicht eingecheckt): die neuen Fälle werden grün bis auf iPhone quer, dafür wird die
  bisherige Sprungprüfung von M-7 rot – im Modell stellt Safari das Feld beim Wechsel selbst in die Mitte (APD-36/S-6 b, am Gerät gemessen:
  iPad quer Notiz 34 px über der Tastatur → 132 px), iPad hoch Ort 768 → 445, der Fensterkopf springt kurz mit. Ohne die Regel springt also
  Safari, mit ihr springen App und Safari (N-2). Grund vermutlich APD-36/S-7: Safari liest die Lage beim Fokus, vor dem Rollen der App – bei offener
  Tastatur macht das Muster keinen neuen Fokus (APD-36/S-8), Safari sieht also die alte Lage.
- APD-115/N-8 Nächster Schritt (Vorschlag): Muster mit zwei Varianten für den Wechsel, beide mit Messmodus –
  APD-115/W-1 ‚nur so weit wie nötig‘ (Safari entscheidet selbst) und APD-115/W-2 ‚Mitte-Regel und neuer Fokus (APD-36/S-8) auch bei offener
  Tastatur‘ (Safari liest die Lage nach dem Rollen, eine Bewegung). Am Gerät messen, welche ruhig ist; das Safari-Modell danach korrigieren
  (0 Nr. 20), die Erwartung von M-7 nach der gewählten Variante.

## Apple-Abgleich (0 Nr. 23, 2.6)

- **So macht es Apple (Quellen dieser Sitzung):**
  - HIG ‚Text fields‘ (gelesen 07.11.2026, zitiert im Befund): eine eigene Bezeichnung neben dem Platzhalter erinnert an den Zweck des Felds,
    für mehr Text ein Textbereich (text view).
  - Archivierte UIKit-Doku ‚Table View Styles‘ (developer.apple.com, gefunden 07.11.2026): gruppierte Tabellen teilen
    zusammengehörige Zeilen in Blöcke, jeder Block kann Kopf- oder Fußtext haben. Der Kopf steht direkt über seinem Block.
  - UIKit (Zweitquellen, im Befund): Tabellen rollen das Feld mit Fokus von selbst nur über die Tastatur; ein Textbereich (UITextView)
    rollt so, dass der Cursor sichtbar ist.
- **Folgerung:** Die Bezeichnung ‚Verlauf‘ gehört direkt über das Feld, die Vorschläge darunter (Variante A). Das ist eine Vermutung
  nach dem Aufbau gruppierter Tabellen, eine Apple-App mit Vorschlägen unter einem Textbereich ist nicht belegt. Gerollt wird nur so
  weit wie nötig (APD-115/V-3).
- **HIG-Checkliste (16) und Katalog (17):** R-4.5 wird geändert (Wortlaut unten). R-5.1 (Bezeichnung und Feld gehören zusammen) stützt
  Variante A. Antippflächen der Vorschläge bleiben 44 px (R-3.1). Keine neue Regel ‚jedes Feld hat eine Bezeichnung‘ (APD-115/E-4).
- **Bewusste Abweichungen von Apple (Safari, Designrichtlinie 13):**
  - APD-115/A-1 Im Inhalt (außerhalb eines Fensters) endet das Feld 28 statt 16 px über der Tastatur. Sonst verschiebt Safari beim
    ersten Öffnen selbst (APD-36/S-5: unter 24 px).
  - APD-115/A-2 Feld wechseln bei offener Tastatur: Liegt die Mitte des Felds unter der Mitte des sichtbaren Teils, rollt es bis zur
    Mitte, sonst stellt Safari es selbst dorthin (APD-36/S-6 b, im Modell; die Grenze ist am Gerät nicht gemessen, das Muster misst).
  - APD-115/A-3 Ist ein Textbereich höher als der sichtbare Teil (iPhone quer immer, sonst bei langem Verlauf), verschiebt Safari im
    Modell beim ersten Öffnen trotzdem (das Feld endet unter der Tastatur). Das ist am Gerät nicht gemessen und bisher genauso.

## Muster (nur hell, Vereinbarung 30.10.2026)

Eine Kopie des Reiselogbuchs 3.52.0 mit AppDesign-Fassung 4.54.0 und eigenem Speicher (`reiselogbuch.muster-apd115`, die echten Reisen
bleiben unberührt), Beispielreise ‚Muster A …‘ bzw. ‚Muster B …‘. In `ui.js` rollt sie nach APD-115/V-3. Gebaut mit `arbeit/APD-115 Muster bauen.mjs`.

- **APD-115/V-4 Variante A** (`arbeit/APD-115/index.html?v=a`, Empfehlung): ‚2 Verlauf‘ direkt über dem Feld, die Vorschläge
  (Kapseln) darunter.
- **APD-115/V-5 Variante B** (`?v=b`): wie heute, die Vorschläge zwischen Überschrift und Feld. Zum Vergleich, auch mit APD-115/V-3.
- **APD-115/V-3 in beiden:** Beim Antippen rollt der Inhalt nur, wenn das Feld sonst unter der Tastatur läge, und dann nur so weit, dass es
  16 px über ihr endet. Ist ein mehrzeiliges Feld zu hoch, liegen die Zeile mit dem Cursor (beim Antippen die Zeile unter dem Finger)
  und eine halbe Zeile darunter über der Tastatur. Beim Tippen bleibt die Cursorzeile mit einer halben Zeile darunter über der
  Tastatur. Am iPad zählt die Lage des Fensters, nachdem es mit der Tastatur in die Mitte darüber geglitten ist. Der Messmodus
  schreibt je Antippen ‚APD-115/V-3 … rollt N‘.

## Testfall-Liste (Testfall (automatisch), Muster: `arbeit/APD-115 Muster prüfen.mjs`, Chromium und WebKit mit Safari-Modell)

Gerät und Lage: iPhone hoch, iPhone quer, iPad quer, iPad hoch · Darstellung: hell · Variante A und B · Daten: kurzer Verlauf (Tag 2),
langer Verlauf mit 14 Zeilen (Tag 4).

| Nr. | Handlung | Erwartet |
|---|---|---|
| APD-115/M-1 | Verlauf an den unteren Rand des Fensters rollen, antippen | liegt das Feld schon über der Tastatur, rollt nichts; sonst endet es 16 px (± 3) über der Tastatur bzw. dem Fensterende. Kein Sprung (Kopfzeile, Fensterkopf, Feld; `checkTastaturStill`) |
| APD-115/M-2 | ebenso ‚Wie war was?‘ | wie APD-115/M-1 |
| APD-115/M-3 | ebenso Quartier und Preis | wie APD-115/M-1 |
| APD-115/M-4 | Verlauf oben im Fenster antippen (iPhone hoch, iPad hoch) | lag das Feld über der künftigen Tastatur, rollt nichts |
| APD-115/M-5 | langer Verlauf, eine Zeile unten antippen | Cursorzeile und eine halbe Zeile darunter zwischen Fensterkopf und Tastatur; verschiebt Safari im Modell, wird es berichtet (APD-115/A-3) |
| APD-115/M-6 | am Ende des langen Verlaufs zwei Zeilen tippen | die neue Zeile mit einer halben Zeile darunter bleibt über der Tastatur |
| APD-115/M-7 | Quartier antippen, dann Ort (Feld wechseln) | kein Sprung, Ort ganz über der Tastatur (APD-115/A-2) |
| APD-115/M-8 | Variante A öffnen | Feld höchstens 12 px unter der Bezeichnung ‚Verlauf‘, Vorschläge darunter |
| APD-115/M-9 | Variante B öffnen | Vorschläge zwischen Bezeichnung und Feld |
| APD-115/M-10 | jede Ansicht | Grundregeln (`pruefe.mjs`) |
| APD-115/Y-1 | Gegenprobe `PRUEF_V=heute` (ui.js 4.54.0) | APD-115/M-1 bis APD-115/M-3 rot (heute rollt das Feld in die obere Hälfte, also zu weit) |

**Am Gerät (Testfall (User) des Musters):** Gefühl beim Rollen, ob Safari bei Feldwechsel (APD-115/A-2) und hohem Textbereich (APD-115/A-3)
verschiebt (Messmodus), Lesbarkeit von Variante A gegen B.

## Wortlaut R-4.5 (0 Nr. 29, zum ‚Ja‘ vor dem Bau)

- **Alt (Designrichtlinie 17, Satz 2):** ‚Ein Feld mit Fokus steht immer ganz über der Tastatur – in Fenstern und im Inhalt, 16 px
  darüber (reicht der Platz nicht, oben unter Kopf- bzw. Suchzeile, mit Platz für Fokus-Umrandung und Schatten) – und zwar **ohne
  Springen**: beim Antippen rollt das Feld in die obere Hälfte, Safari verschiebt nichts; …‘
- **Neu:** ‚Ein Feld mit Fokus steht immer über der Tastatur, **wie bei Apple nur so weit gerollt wie nötig**: es endet 16 px über
  ihr (im Inhalt 28 px); ein mehrzeiliges Feld, das nicht ganz passt, zeigt die Zeile mit dem Cursor und eine halbe Zeile darunter,
  auch beim Tippen; liegt es schon darüber, rollt nichts; beim Wechsel bei offener Tastatur höchstens bis zur Mitte des sichtbaren
  Teils. Das alles **ohne Springen**: Safari verschiebt nichts; …‘ (der Rest bleibt; Designrichtlinie 13 ‚Lösung in ui.js‘ wird
  entsprechend angepasst).
