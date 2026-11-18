# Muster P-108 – Wischaktionen wie Notizen (Sitzung 0128)

Stand 18.11.2026 · zu P-108/F-1 bis P-108/F-4 · Antworten P-108/Q-1 bis P-108/Q-4 in `arbeit/0128 P-108 Rückmeldung und Klärung.md` · nur hell, quer

## Link

https://g811141a.github.io/AppDesign/arbeit/0128%20P-108%20Wischaktionen%20Muster.html

(auf `main` von AppDesign seit Commit d5e4335, Nutzer ‚Ja, hochladen‘ 18.11.2026)

## Was gleich ist in allen Varianten

- Abstand **8 px** zwischen Kachel und Kapsel und zwischen den Kapseln, rechts außen 11 px; offen ist die Kachel 159 px nach links verschoben.
- **Kein Durchwischen:** ‚Löschen‘ wird nie langgezogen, Loslassen löst nichts aus.
- **Über die letzte Kapsel hinaus** folgt die Kachel mit Widerstand (wie am Ende einer Rollfläche); beim Loslassen federt sie auf ‚offen‘ zurück.
- Loslassen ab halber offener Breite (80 px): offen, sonst zurück. Zurückwischen und Tippen auf die offene Kachel laufen genau umgekehrt.

## Die vier Varianten

| | Erscheinen (P-108/F-1) | Über die letzte Kapsel hinaus (P-108/F-2) |
|---|---|---|
| **A** | **rasch einblenden:** die Kapsel liegt an ihrem Platz unter der Kachel; sobald die Hälfte ihrer Breite frei ist, blendet sie in 0,15 s in voller Größe ein (darunter ebenso rasch aus) | **Kapseln bleiben** an ihrem Platz, der Abstand zur Kachel wird größer |
| **B** | rasch einblenden wie A | **Kapseln wandern mit** der Kachel, der Abstand bleibt 8 px, rechts wird es frei |
| **C** | **mitwachsend einblenden:** die Kapsel wächst mit dem freien Platz (8 px Abstand zur Kachel); unsichtbar bis zur Hälfte, dann blendet sie bis zur vollen Größe ein | Kapseln bleiben wie A |
| **D** | mitwachsend wie C | Kapseln wandern mit wie B |

Gemessen im Muster (Chromium und WebKit, iPad quer 1180 × 820): ‚Löschen‘ erscheint bei A/B ab 44 px Weg, bei C/D ab 52 px; ‚Einstellen‘ bei A/B ab
118 px, bei C/D ab 126 px; offen 8 px Abstand Kachel–‚Einstellen‘ und ‚Einstellen‘–‚Löschen‘; bei 400 px Fingerweg steht die Kachel bei 229 px
(Widerstand), Kapseln bei A/C unverändert, bei B/D 70 px mitgewandert; nach dem Loslassen wieder 159 px. Keine Fehler in der Konsole.

## Schritte am Gerät

1. Den Link in Safari öffnen, iPad quer. Erwartet: vier Felder A, B, C, D mit je zwei Kacheln.
2. In Feld A die obere Kachel langsam nach links wischen. Erwartet: zuerst nichts; wenn etwa die halbe Breite von ‚Löschen‘ frei ist, blendet ‚Löschen‘ rasch ein; ebenso danach ‚Einstellen‘.
3. Langsam zurückwischen. Erwartet: umgekehrt – zuerst blendet ‚Einstellen‘ aus, wenn weniger als die Hälfte frei ist, dann ‚Löschen‘.
4. Die Kachel öffnen und weit über die Kapseln hinaus nach links wischen. Erwartet: die Kachel geht schwerer mit, die Kapseln bleiben stehen, ‚Löschen‘ wird nicht breit; loslassen – die Kachel federt auf ‚offen‘ zurück.
5. Schritte 2–4 in den Feldern B, C und D. Erwartet: B wie A, aber in Schritt 4 wandern die Kapseln mit; C und D: die Kapsel wächst mit dem freien Platz und blendet ab der Hälfte ein; D wandert in Schritt 4 mit.
6. Eine Kachel öffnen und auf sie tippen bzw. daneben tippen. Erwartet: sie gleitet zurück, die Kapseln vergehen umgekehrt (erst ‚Einstellen‘, dann ‚Löschen‘).
7. Optional am iPhone hoch: dieselben Schritte. Erwartet: wie am iPad.

## So macht es Apple

- **Notizen (deine Beobachtung, 18.11.2026):** Kapsel erscheint erst ab halber Breite, über die letzte hinaus wird nichts langgezogen, die Zeile federt
  zurück, gleicher Abstand Zeile–Kapsel wie zwischen den Kapseln.
- **SwiftUI** `swipeActions(edge:allowsFullSwipe:content:)` (developer.apple.com, gelesen 18.11.2026): „A Boolean value that indicates whether a full
  swipe automatically performs the first action. The default is `true`.“ – „You can opt out of this behavior for an edge by setting the
  `allowsFullSwipe` parameter to `false`.“ **UIKit** `performsFirstActionWithFullSwipe`: „When this property is set to `true`, a full swipe in the
  row performs the first action …“. → Durchwischen ist bei Apple Standard, das Abschalten ist vorgesehen; Notizen nutzt es nach deiner Beobachtung
  nicht. Abweichung vom Standard, aber wie Notizen – im Bericht nennen.
- HIG ‚Lists and tables‘ (gelesen 18.11.2026) sagt zu Wischaktionen nichts Näheres; zu Abstand und Federn gibt es dort keine Angabe.

## Betroffene Regeln

- **R-7.8** (Wischaktionen) und Designrichtlinie **15.4 ‚Wischaktionen‘**: Erscheinen ab halber Breite, Abstand 8 px, kein Durchwischen, Federn
  über die letzte Kapsel hinaus – neuer Wortlaut nach deiner Wahl (0 Nr. 29).
- **16 ‚Bewusste Abweichungen‘:** Zeile ‚Durchwischen fragt‘ entfällt; neu ggf. ‚kein Durchwischen (Apple-Standard `allowsFullSwipe: true`), wie Notizen‘.
- **15 Liste der AD-Beans**, `swipeactions`: Eigenschaft `durchwischen` entfällt (oder Standard `false`).
- Unverändert: R-1.12 (Bewegung), R-1.10 (Kapseln wachsen mit der Textgröße), ‚Bewegung reduzieren‘ (Kapseln an ihrem Platz, nur ein- und ausblenden – bei
  A/B ohnehin so), R-4.12 (Löschen fragt, jetzt nur noch über die Kapsel).

## Testfall-Liste (Entwurf, wird nach deiner Wahl fest)

Geräte iPad quer und hoch, iPhone hoch und quer · hell und dunkel · ‚Bewegung reduzieren‘ · größte Textgröße · Daten: leer, 30 Reiselogbücher, langer Titel.

| Nr. | Fall | Feste Prüfung (`checkWischen`) |
|---|---|---|
| M-1 | Langsam aufwischen: ‚Löschen‘ unsichtbar bis zur halben Breite, dann sichtbar; ‚Einstellen‘ erst danach ebenso | Deckkraft 0 knapp unter, sichtbar ab der Schwelle (je Kapsel) – **rot gegen 4.60.1** (dort ab dem ersten Pixel) |
| M-2 | Zurückwischen: umgekehrt | Deckkraft je Kapsel beim Zurückwischen an denselben Schwellen |
| M-3 | Offen: Abstand Kachel–Kapsel = Kapsel–Kapsel = 8 px, rechts 11 px | Rechtecke – **rot gegen 4.60.1** (dort 11 px zur Kachel) |
| M-4 | Weit über die letzte Kapsel hinaus: ‚Löschen‘ behält seine Breite, alle Kapseln sichtbar, Kachel mit Widerstand | Breite und Deckkraft der Kapseln, Weg der Kachel < Fingerweg – **rot gegen 4.60.1** (dort wird ‚Löschen‘ breit) |
| M-5 | Loslassen nach dem Überwischen: federt auf ‚offen‘, keine Sprechblase | Endlage = offene Breite, keine Sprechblase – **rot gegen 4.60.1** (dort fragt sie) |
| M-6 | Tippen auf die offene Kachel und daneben: gleitet zurück, Kapseln vergehen umgekehrt | Reihenfolge der Deckkraft beim Gleiten |
| M-7 | Kapsel ‚Löschen‘ antippen fragt weiterhin (R-4.12) | Sprechblase ‚… löschen?‘ |
| M-8 | ‚Bewegung reduzieren‘: Kapseln an ihrem Platz, nur ein- und ausblenden, ab halber Breite | Kein scale, Deckkraft an den Schwellen |
| M-9 | Größte Textgröße: Schwellen und Abstände wachsen mit, nichts ragt hinaus | Rechtecke bei größter Textgröße |
| M-10 | Drehen bei offener Kachel und beim Überwischen: Zustand wie vorher | Grundregeln nach dem Drehen (`pruefe.mjs`) |
| M-11 | iPhone hoch und quer, 320 × 568: nichts ragt über den Bildrand, auch beim Überwischen | Rechtecke |

Am Gerät (Testfall (User) im nächsten Usertest): Wischgefühl, Widerstand beim Überwischen, Zurückfedern.

## Stand 2 – wie Notizen (18.11.2026, nach der Bildschirmaufnahme)

Die Varianten A–D sind ersetzt durch **N wie Notizen** (Messwerte: `arbeit/0128 P-108 Notizen Messung.md`), auf `main` seit Commit aab2381.
Link: https://g811141a.github.io/AppDesign/arbeit/0128%20P-108%20Wischaktionen%20Muster.html?v=3

1. Link in Safari öffnen, iPad quer. Erwartet: zwei Felder ‚N · wie Notizen – Reiselogbuch (2 Aktionen)‘ und ‚… zum Vergleich mit 3 Aktionen‘.
2. Im ersten Feld eine Kachel langsam nach links wischen. Erwartet: ‚Löschen‘ wächst aus seiner Mitte, sobald die halbe Kapsel frei ist, und ist voll, wenn auch der Abstand frei ist; danach ebenso ‚Einstellen‘.
3. Langsam zurückwischen. Erwartet: genau umgekehrt – erst schrumpft ‚Einstellen‘ zur Mitte, dann ‚Löschen‘.
4. Aufwischen und weit darüber hinaus ziehen. Erwartet: die Kachel geht nur noch wenig und schwer mit, die Kapseln rücken etwas mit und werden minimal größer, nichts wird langgezogen; loslassen – federt auf ‚offen‘ zurück.
5. Abstände ansehen. Erwartet: Kachel–Kapsel, zwischen den Kapseln und rechts außen gleich (11 pt).
6. Im zweiten Feld dasselbe und daneben Notizen öffnen. Erwartet: Ablauf wie in Notizen.
