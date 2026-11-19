# APD-138 – Dateiname am iPad nie umbrechen: Klärung

**Stand 19.11.2026** · Sitzung 0136 · Grundlage `arbeit/0134 RLB-127 Dateiname.md` · Thema allgemein (AppDesign), Prio 2

## Heute (aus dem Code von AppDesign 4.63.0)

- Ein Dateiname steht nur im **Hinweisfenster `#msg`**, und zwar nach dem Teilen bzw. Laden, nach einem Abbruch, bei einem Fehler und nach dem Öffnen des
  Drucken-Menüs (`shareMsg` in `v4/ui.js` Z. 1370–1374). Er kommt aus dem Baustein `fileNameHtml` (Z. 1368): fett, zentriert, in einer eigenen Zeile, jedes Wort
  am Stück (`.fw`), Umbruch nur nach einem Leerzeichen.
- Breite `#msg` am iPad: `min(max(360px, 360px × Textgröße), 90vw)` (`design.css` Z. 581). Für breite Hinweise gibt es schon `#msg.wide`:
  `min(max(600px, 600px × Textgröße), 100vw − 32px)` (Z. 590). Am iPhone gilt `min(360px, 100vw − 32px)` (Z. 792).
- Regel R-10.8 (Designrichtlinie 17): ‚… Umbruch nur nach einem Leerzeichen – nur ein Wort, das länger ist als die Zeile, bricht in sich (R-6.3)‘ ·
  Prüfung `ablauf.mjs` – `checkDateiname`.
- Beispiel: ‚Ω Backup Reiselogbuch 2026.11.19 08.15.json‘ (43 Zeichen) passt in 360 px nicht in eine Zeile. Die genaue Breite messe ich nach dem Prüflauf im
  Browser (während `los` läuft, starte ich keinen Browser).

## So macht es Apple (Quellen dieser Sitzung)

- **HIG ‚Alerts‘** (developer.apple.com, JSON der HIG): Titel sollen nicht mehr als zwei Zeilen umbrechen (‚avoid overly long titles that wrap to more than two
  lines‘); in iOS und iPadOS kann ein Alert bei großer Schrift rollen, das soll man durch kurze Texte vermeiden. **Eine Breite oder ein Mitwachsen mit dem
  Inhalt nennt die HIG nicht.**
- **UIKit `NSLineBreakMode.byTruncatingMiddle`** (developer.apple.com): Anfang und Ende stehen in der Zeile, die Mitte wird durch ‚…‘ ersetzt; gedacht für
  einzeilige Darstellung.
- **Vermutung (nicht belegt):** Alerts haben in iOS und iPadOS eine feste Breite, und lange Dateinamen kürzt Apple in Listen, z. B. in der Dateien-App, in der
  Mitte. Einen Beleg dafür habe ich in dieser Sitzung nicht.
- **Folge:** Ein Fenster, das mit dem Dateinamen breiter wird, ist eine **bewusste Abweichung** von Apples fester Alert-Breite (Vermutung). Der Grund: Der
  Dateiname ist die wichtigste Information des Hinweises und soll vollständig und in einer Zeile lesbar sein. Kürzen in der Mitte wie Apple würde Datum und
  Uhrzeit verstecken.

## Vorschlag

1. **Verhalten am iPad:** Das Hinweisfenster wird so breit, dass der Dateiname in einer Zeile steht, mindestens aber so breit wie heute. Es wächst höchstens bis
   zur Breite von `#msg.wide`, also 600 px (wächst mit der Textgröße) und höchstens Bildschirmbreite − 32 px. Ist der Name selbst dafür zu lang (große
   Textgröße, geteilter Bildschirm), bricht er wie heute nur nach einem Leerzeichen um.
2. **iPhone:** bleibt wie heute (360 px bzw. Bildschirmbreite − 32 px, Umbruch nach einem Leerzeichen).
3. **Umsetzung allgemein:** in `fileNameHtml`/`shareMsg` (`ui.js`) und `#msg` (`design.css`). AD-Bean: das bestehende Hinweisfenster `#msg` bekommt die
   Eigenschaft ‚breite nach Dateiname‘, keine neue Bean (R-1.13).
4. **R-10.8 neu fassen** (Wortlaut folgt mit dem Muster, 0 Nr. 29) und `checkDateiname` erweitern: iPad quer und hoch mit dem Beispielnamen in einer Zeile,
   Fenster nicht breiter als die Höchstbreite, große Textgröße und geteilter Bildschirm brechen nur nach einem Leerzeichen um, iPhone unverändert, dazu eine
   Gegenprobe.
5. **Nächste Schritte:** nach dem Prüflauf ein Muster (iPad quer, hell; heute und neu nebeneinander), dazu Wortlaut R-10.8 und Testfall-Liste; danach ‚0.
   Nächste Version‘.

## Entschieden (Nutzer 19.11.2026, Sitzung 0136, im Fenster)

- **Verhalten:** Das Fenster wächst mit dem Dateinamen (Vorschlag 1); nicht in der Mitte kürzen.
- **Höchstbreite:** wie das breite Hinweisfenster `#msg.wide`: 600 px (wächst mit der Textgröße), höchstens Bildschirmbreite − 32 px.
