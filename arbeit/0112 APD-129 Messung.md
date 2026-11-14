# APD-129 – App rutscht am iPhone nach dem Drehen nach unten

**14.11.2026 · Sitzung 0112**

## Eingetragen

- **P-103 alles ok:** in beiden Backlogs unter ‚Erledigt‘ (ReiseLogBuch `c6e3a2a`, AppDesign `6203a7b`).
- **Neu APD-129, Prio 1, offen** (AppDesign-Backlog, allgemein, weil Drehen, Ränder und Rollen in `ui.js` liegen): am iPhone hoch → quer
  → hoch rutscht die ganze App um etwa 1 cm nach unten und bleibt dort. Manche Funktionen gehen dann nicht mehr, erst ein Neustart hilft.

## Was ich weiß

- Die Prüfungen von 3.56.0 / 4.59.0 waren grün. Das Safari-Modell bildet diesen Fall also nicht ab.
- 1 cm sind am iPhone etwa 60 px, ungefähr die Höhe der Statusleiste bzw. des sicheren Rands oben. **Vermutung:** Nach dem Zurückdrehen
  meldet iOS einen falschen sicheren Rand oder eine falsche Fensterlage (`env(safe-area-inset-top)`, `visualViewport.offsetTop`). Oder die
  Seite bleibt um diesen Betrag gerollt. Die Antippflächen liegen dann nicht mehr dort, wo die Knöpfe zu sehen sind.
- Im Netz gibt es ähnliche Meldungen zu iOS 26 bei Web-Apps vom Home-Bildschirm: falsche Ränder nach dem Drehen, abgeschnittene
  Leisten nach hoch → quer → hoch. Eine bestätigte Abhilfe habe ich nicht gefunden.

## Vorgehen (Zusammenarbeit 0 Nr. 20 und Nr. 1)

1. **Messung am Gerät:** Sie zeigt genau, was Safari beim Drehen meldet.
2. Daraus baue ich eine feste Prüfung, die gegen 4.59.0 rot ist, und korrigiere das Safari-Modell.
3. Dann behebe ich den Fehler und suche dieselbe Lücke überall. Danach kommt die Bau-Frage für eine **Korrekturversion** (0 Nr. 8, 21).

## Schritte für die Messung (iPhone, App vom Home-Bildschirm)

1. App ganz schließen und neu öffnen, iPhone **hoch**.
2. In der Startliste oben auf ‚…‘ (Mehr) tippen und **lange auf die graue Versionszeile** drücken.
   Erwartet: Im selben Menü erscheint ‚Messung starten‘ (activity).
3. ‚Messung starten‘ antippen. Erwartet: Das Menü schließt sich, auf dem Bildschirm ist nichts zu sehen.
4. Genau so weitermachen wie beim Fehler: dieselbe Ansicht öffnen (Startliste oder Reiselogbuch), auf **quer** drehen, kurz warten,
   wieder auf **hoch** drehen. Erwartet: Die App rutscht wie gemeldet nach unten.
5. Eine Funktion antippen, die dann nicht geht (z. B. einen Knopf in der Kopfzeile), und eine, die geht.
6. Oben auf ‚…‘ (Mehr) tippen (wenn es nicht reagiert, etwas tiefer tippen) und ‚Messung beenden und teilen‘ wählen.
   Erwartet: Das Teilen-Menü mit `messung-2026-11-14-….txt` erscheint.
7. Die Datei sichern (z. B. ‚In Dateien sichern‘) und hier im Chat anhängen.

Dazu hilft mir kurz im Chat: In welcher Ansicht war es (Startliste, geöffnetes Reiselogbuch, Fenster offen)? Welche Funktionen gingen
nicht? Welche iOS-Version hat das iPhone?

Quellen: [WebKit Bug 301994](https://bugs.webkit.org/show_bug.cgi?id=301994) ·
[Glide-Forum: Leiste nach dem Drehen in der Home-Bildschirm-App abgeschnitten](https://community.glideapps.com/t/navbar-buttons-cut-off-after-orientation-change-in-ios-pwa-add-to-home-screen/86135) ·
[Apple-Forum: sicherer Rand nach dem Drehen falsch](https://developer.apple.com/forums/thread/800134)
