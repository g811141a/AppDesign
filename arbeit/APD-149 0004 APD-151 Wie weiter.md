# APD-151 – Blatt am iPhone mit Höhe nach Inhalt: wie weiter (Sitzung AppDesign 0004)

**27.11.2026** · Übergabe `arbeit/APD-149 Uebergabe.md` Abschnitt 3 Nr. 2.4. Backlog APD-151, Priorität 1. Apple-Abgleich mit Quellen in `arbeit/APD-149 0003 Schritt 15 und Blatt iPhone.md` Abschnitt 2.

## Stand

- **Rückmeldung** zu den Schritten 4, 7 und 9: Am iPhone hoch haben ‚Neuer Eintrag‘, ‚Eintrag bearbeiten‘ und ‚Anderes Fenster‘ die volle Höhe. Am iPad richtet sich die Höhe nach dem Inhalt.
- **Heute** (R-4.6, Designrichtlinie 15.17): am iPhone ein Blatt ‚nur groß‘, am iPad ein Formblatt.
- **Apple** (HIG ‚Sheets‘, aus der Datei 0003):
  - Standard ist ‚large‘. Dazu sind ‚medium‘ und eigene Stufen möglich (`Detent.custom`, eine Höhe nach Inhalt).
  - Wer zwischen den Stufen wechseln kann, bekommt einen Griff.
  - Fenster zum Schreiben bleiben groß, „the compose sheets in Messages and Mail display only at full height“.
- **Durch deine Vorgabe von heute** gibt es keine AppDesign-Version mehr auf `v4/`. Alles Neue kommt mit `v5/`, also mit den Beans `presentation` und `commands`.

## Die zwei Wege

**a) Jetzt im Entwurf (`presentation`, Art `sheet`) als Muster.**
- **Schnittstelle:** neue Option bei `present('sheet', …)`, Name nach dem Vorbild von UIKit `detents`. Zum Beispiel `detents: ['fit', 'large']` (‚fit‘ = Höhe nach Inhalt), dazu ein Griff (Vorbild `prefersGrabberVisible`).
  Die Namen stehen im Muster zur Entscheidung.
- **Ausprobieren:** in der Vorführung ‚Ausprobieren‘ ein kurzes Fenster (z. B. ‚Anderes Fenster‘) mit Stufe nach Inhalt und Griff. ‚Neuer Eintrag‘ bleibt groß (HIG: Fenster zum Schreiben).
- **Vorher:** eine Testfall-Liste (0 Nr. 1), z. B. Ziehen zwischen den Stufen, Tastatur macht groß, Drehen, Neuaufbau, Fokus, die Grundregeln.
- **Am Gerät prüfen,** weil Ziehen und Federn nur das Gerät zeigt.
- **Vorteil:** Die Schnittstelle von `sheet` ist geklärt, bevor `v5/` sie festschreibt.
- **Nachteil:** ein weiteres Muster mit Gerätetest, bevor `v5/` beginnt.

**b) Erst beim Bau von `v5/`.**
- **Vorgehen:** `v5/` mit Blatt ‚nur groß‘ wie heute bauen, die Stufen danach.
- **Vorteil:** `v5/` kommt schneller.
- **Nachteil:** Die Schnittstelle von `sheet` ändert sich kurz nach 5.0.0 noch einmal.

## Empfehlung

**a)** Die Stufen gehören zur Schnittstelle von `sheet`, und `v5/` soll eine Schnittstelle bekommen, die hält. Weil auf `v4/` nichts mehr gebaut wird, kostet der Umweg über das Muster keine Version.
Muster, Testfall-Liste und Wortlaut für R-4.6 und 15.17 kommen in einer der nächsten Sitzungen (0 Nr. 6, 25, 29).

## Entschieden (Nutzer 27.11.2026, Sitzung AppDesign 0004, im Fenster)

- **APD-151/J-1:** Weg a. Die Stufen am iPhone (Höhe nach Inhalt, Griff, Ziehen zwischen den Stufen) werden jetzt als Muster im Entwurf geklärt (`presentation`, Art `sheet`).
  Vorher kommen Apple-Abgleich und Testfall-Liste, danach der Test am Gerät. Der Wortlaut für R-4.6 und 15.17 kommt nach 0 Nr. 29.

Nächste Version AppDesign (mit `v5/`): 3 Punkte bereit (APD-149/J-1, APD-152, APD-153). Offen im Backlog: APD-135, APD-136, APD-149, APD-148, APD-151, APD-154 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150, APD-155 (Prio 2) · APD-70, APD-147, APD-156 (Prio 3).
