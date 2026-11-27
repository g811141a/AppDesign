# APD-151 – Rückfrage zu deiner Antwort ‚wie auf dem iPad‘ (Sitzung AppDesign 0005)

**27.11.2026** · Deine Antwort im Fenster: „Kannst du es einfach so bauen wie auf dem ipad? Auf dem ipad funktioniert es bestens.“

## So verstehe ich es

- Am iPhone hoch hat jedes Fenster **eine einzige Höhe: die seines Inhalts**, wie das Formblatt am iPad. Es gibt keine Stufen, keinen Griff und kein Hochziehen auf ‚groß‘.
- **Ziehen nach unten** schließt wie heute, mit Änderungen fragt es am x (R-4.4).
- **Ist der Inhalt höher als der Bildschirm,** reicht das Fenster bis knapp unter die Statusleiste wie heute, und der Inhalt rollt.
- **Tastatur:** Das Fenster gleitet mit ihr nach oben, wie das Fenster am iPad (R-4.5). Das Feld steht über der Tastatur.
- **Schnittstelle:** keine neue Option. Die Höhe nach Inhalt gilt von selbst. Damit entfallen `detents`, `selectedDetent`, `h.detent` und der Griff aus meinem Vorschlag.

**So macht es Apple:** Ein Blatt mit nur einer kleineren Stufe ist erlaubt. HIG ‚Sheets‘: „specifying only medium prevents the sheet from expanding to full height“, und eine eigene Höhe geht über `Detent.custom`.
**Abweichung:** Die HIG nennt für Fenster zum Schreiben die volle Höhe („the compose sheets in Messages and Mail display only at full height“). Bei dir sind dann auch ‚Neuer Eintrag‘ und die Tagerfassung nur so hoch wie ihr Inhalt. Das ist eine kleine, begründete Abweichung: Am iPad ist es schon so, und es funktioniert dort gut.

## Offene Frage: Wo steht das Fenster am iPhone?

- **a) Unten als Blatt, nur so hoch wie der Inhalt (Empfohlen).** Es gleitet von unten herein, oben hat es runde Ecken und liegt am unteren Rand an. So stehen Blätter am iPhone bei Apple immer. Die Seite dahinter dunkelt ab und bleibt groß.
- **b) In der Mitte wie am iPad.** Ein schwebendes Fenster mit Rand rundum. Das gibt es bei Apple am iPhone nur für Meldungen.

Danach kommt die angepasste Testfall-Liste, dann das Muster. Der Wortlaut für R-4.6 und 15.17 kommt nach 0 Nr. 29.

## Entschieden (Nutzer 27.11.2026, Sitzung AppDesign 0005, im Fenster) – APD-151/J-2

- **Wie am iPad:** Am iPhone hoch hat jedes Fenster außer Meldungen eine Höhe nach Inhalt und steht **in der Mitte wie am iPad** (Formblatt, Variante B). Es gibt keine Stufen, keinen Griff und keine neue Option.
- Der Vorschlag mit Stufen aus `arbeit/APD-151 Apple-Abgleich und Testfall-Liste.md` Abschnitt 3 und 4 entfällt. Der Apple-Abgleich in Abschnitt 2 bleibt als Quelle.
- **Bewusste Abweichungen von Apple:**
  - Blätter liegen am iPhone bei Apple unten an. In der Mitte stehen dort nur Meldungen.
  - Für Fenster zum Schreiben nennt die HIG die volle Höhe.
  - Grund: Am iPad funktioniert es so bestens, und es gilt dieselbe Bedienung auf beiden Geräten (R-1.1).
- **Offen für die nächste Sitzung:**
  - Wie quer? Heute volle Höhe, R-4.6.
  - Wie verhält es sich mit der Tastatur? Wie am iPad gleiten.
  - Breite am iPhone: R-4.8, mindestens 480 px gehen nicht. Vorschlag: volle Breite mit Rand.
  - Die Abdunkelung antippen schließt am iPad nicht.
  - Danach kommen die neue Testfall-Liste, das Muster im Entwurf und der Wortlaut für R-4.6, 15.17 und R-4.8 (0 Nr. 29).
