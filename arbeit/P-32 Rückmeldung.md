# P-32 – Rückmeldung, Ursachen und Vorschlag

**Stand 14.10.2026** · Sitzung ‚Reiselogbuch 0001‘

## 1) Reisemittel im Abgleichbericht klein geschrieben

- **Ursache:** Der Bericht schreibt den gespeicherten Wert hin. Gespeichert werden die Reisemittel als interne Kürzel
  (‚flug, pkw‘), angezeigt werden sonst die Namen (‚✈️ Flugzeug, 🚗 PKW‘). Der Baustein `createSync` in AppDesign kennt
  die Namen nicht.
- **Vorschlag (allgemein, AppDesign 4.12.1):** `createSync` bekommt eine Angabe `values`, mit der die App je Feld sagt,
  wie ein Wert angezeigt wird (z. B. Reisemittel → ‚✈️ Flugzeug, 🚗 PKW‘). Im Bericht steht dann dasselbe wie im
  Fenster ‚Einstellungen‘ und in der Ausgabe (R-10.1).
- **Warum die Prüfung es übersah:** Die neue Prüfung aus 3.11.5 verglich nur die Feldnamen (Spalte ‚Feld‘), nicht die
  Werte (‚Neu‘, ‚Vorher‘).
- **Prüfung schärfen:** Bericht mit geändertem Reisemittel erzeugen. In ‚Neu‘ und ‚Vorher‘ muss der Name wie im Fenster
  stehen. Die Prüfung ist erst rot, dann grün.

## 2) iPad: Seitenleiste rutscht beim Sprung zum ersten Treffer nach oben

- **Ursache:** Bei offener Tastatur verschiebt Safari den sichtbaren Bereich, sobald die Seite weit nach unten springt.
  Die Kopfzeile folgt dieser Verschiebung (`--vv-top`), die Seitenleiste nicht. Sie bleibt am alten Platz und
  erscheint um die Verschiebung nach oben gerückt.
- **Vorschlag (allgemein, AppDesign 4.12.1, design.css):** Die Seitenleiste folgt dem sichtbaren Bereich genauso wie die
  Kopfzeile (R-2.1 – ‚Leisten stehen fest‘ gilt auch für den Kopf der Seitenleiste).
- **Warum die Prüfung es übersah:** Der Test bildet die Tastatur nur durch ein niedrigeres Fenster nach. Chrome
  verschiebt den sichtbaren Bereich dabei nie, Safari schon – das Verhalten von Safari war nicht nachgebildet.
- **Prüfung schärfen:** In `barStill` die Verschiebung durch Safari nachbilden (sichtbarer Bereich um z. B. 200 px
  verschoben). Danach müssen Kopfzeile, Suchzeile und Kopf der Seitenleiste an derselben Stelle auf dem Bildschirm
  stehen. Die Prüfung ist erst rot, dann grün.

## 4) Vorschau: letzte Spalte zusammengequetscht

- **Ursache:** Die Tabelle verteilt die Breite nach der Textmenge (‚automatisch‘). Spalten mit viel Text werden breit,
  die letzte Spalte (Quartier) bleibt schmal. Mit viel Inhalt in allen Spalten bekommt sie am wenigsten Platz.
- **So macht es Apple:** In Numbers und Pages haben Tabellen feste Spaltenbreiten, der Inhalt bricht in der Zelle um.
  Die Breite hängt nicht vom Text ab.
- **Betroffen:** HIG-Checkliste 2 (Schrift, Lesbarkeit) · R-6.2 Mustertabelle der Ausgabe · R-6.3 kein Text ragt
  hinaus · R-6.4 Vorschau. Die Änderung gilt für Vorschau, HTML und PDF gleich.
- **Vorschlag:** Die Spalte ‚Tag‘ ist so schmal wie das Datum. Die übrigen Spalten bekommen **feste Anteile**, unabhängig
  vom Inhalt. Die letzten beiden Spalten sind immer gleich breit. Fehlt eine Spalte (z. B. ohne ‚Essen‘), teilen sich
  die übrigen den Platz im selben Verhältnis.

| Variante | Verlauf | Wie war was? | Essen und Trinken | Quartier |
|---|---|---|---|---|
| jetzt | 335 px | 257 px | 195 px | 173 px |
| a) Verlauf breiter, Rest gleich | 30 % · 288 px | 23 % · 224 px | 23 % · 224 px | 23 % · 224 px |
| b) alle gleich | 25 % · 240 px | 25 % · 240 px | 25 % · 240 px | 25 % · 240 px |
| c) zwei breit, zwei schmal | 28 % · 269 px | 28 % · 269 px | 22 % · 211 px | 22 % · 211 px |

**Empfehlung: a.** Im Verlauf steht meist der meiste Text. Die letzten beiden Spalten sind gleich breit, und
das Quartier passt in eine Zeile mehr als heute.

**Allgemeine Regel?** Vorschlag für R-6.2: ‚Die erste Spalte ist so schmal wie ihr Inhalt; die Textspalten haben feste
Anteile, die letzten Spalten sind gleich breit – die Breite hängt nicht von der Textmenge ab.‘ Jede App legt die
Anteile ihrer Spalten fest.

## Sonstiges: ‚Gesamtkosten‘ → ‚Gesamtausgaben‘

- Betrifft die App (Überschrift unter dem Fazit, iPad und iPhone), die Ausgabe (HTML/PDF/Vorschau), den Feldnamen im
  Abgleichbericht, PROMPT.md und die Designrichtlinie Reiselogbuch. Das ist eine App-Bezeichnung, keine allgemeine Regel.

## Version

**AppDesign 4.12.1 und Reiselogbuch 3.11.6** (Korrektur nach Prüfung, Zusammenarbeit 0 Nr. 8). Darin: 1, 2 und 4 mit
geschärften Prüfungen, dazu ‚Gesamtausgaben‘. Danach folgt die Prüfliste P-33.
