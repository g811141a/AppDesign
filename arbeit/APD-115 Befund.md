# APD-115 – Überschrift bleibt beim Feld sichtbar: Befund

Stand 07.11.2026 · Sitzung Reiselogbuch 0089 · **nachgestellt, noch nicht geklärt**

## Entscheidungen (Nutzer 07.11.2026, Sitzung 0089)

- APD-115/E-1 Vorrang: passen Überschrift, Smiley-Leiste und Feld nicht zusammen über die Tastatur, hat das **Feld** Vorrang (ganz sichtbar, R-4.5),
  die Überschrift kommt dazu, so weit Platz ist.
- APD-115/E-2 erst in der Prüfumgebung nachstellen, dann Muster.

## Nachgestellt (Reiselogbuch 3.52.0 / AppDesign 4.54.0, Chromium mit Safari-Modell und Tastatur, Tageserfassung)

Ablauf je Fall: Tageserfassung öffnen, das Feld an den unteren (‚unten‘) bzw. oberen Rand (‚oben‘) des Rollbereichs rollen, Feld antippen,
Tastatur auf; gemessen auf dem Bildschirm (sichtbar = unter der Fenster-Kopfzeile bis zur Tastatur). Skript nur in der Sitzung (nicht eingecheckt).

| Ansicht | sichtbar über der Tastatur | Ergebnis |
|---|---|---|
| iPhone hoch | 73–449 (376 px) | APD-115/B-1 **Verlauf** (unten): die Überschrift war sichtbar und ist nach dem Antippen weg (63–89, Feld 263–433) – Überschrift, Vorschläge und Feld bräuchten 380 px, das Feld stünde dann 6 statt 16 px über der Tastatur. APD-115/B-2 **Wie war was?** (oben): Überschrift und Smiley-Leiste waren schon weg und bleiben weg (Feld 98–194, Platz genug). Übrige Felder: Überschrift sichtbar. |
| iPhone quer | 41–117 (76 px) | APD-115/B-3 nie sichtbar: schon das Feld passt nicht ganz (96–170 px hoch bzw. 46 px bei Quartier mit 44 px Überschrift) – nach APD-115/E-1 bleibt es so. |
| iPad quer | 79–392 (313 px) | APD-115/B-4 **Verlauf** und **Wie war was?** (oben): Überschrift war schon weg und bleibt weg, obwohl Platz genug ist. Übrige Felder: sichtbar. |
| iPad hoch | 79–840 (761 px) | APD-115/B-5 immer sichtbar (das Feld rollt in die Mitte, die Überschrift kommt mit). |

Folgerung APD-115/B-6: Die App rollt heute nur nach dem Feld (R-4.5: ganz über der Tastatur, bis zur Mitte) und nie nach seiner Überschrift.
Betroffen sind Felder mit großem Abstand zur Überschrift (Verlauf: Vorschläge dazwischen) und Felder, deren Überschrift vor dem Antippen schon
hinausgerollt war.

## Vorschlag (zur Klärung)

- APD-115/V-1 Beim Antippen eines Felds rollt der Inhalt so, dass das Feld ganz über der Tastatur steht (wie heute, R-4.5) und – wenn der Platz
  reicht – auch die Überschrift seines Abschnitts (`.step-head`) mit allem dazwischen (z. B. Smiley-Leiste, Vorschläge); reicht er nicht, hat das
  Feld Vorrang und die Überschrift steht so weit sichtbar, wie es geht (APD-115/E-1). Allgemein in `ui.js`, für alle Formulare.
- So macht es Apple (Vermutung, nicht geprüft): iOS rollt in Formularen nur so weit, dass das Feld über der Tastatur steht; die Überschrift einer
  Gruppe bleibt dabei nicht eigens stehen.
- Offen: ob 16 px Abstand zur Tastatur zugunsten der Überschrift auf z. B. 8 px sinken dürfen (B-1).

## Variante des Nutzers (07.11.2026, Sitzung 0089) und Apple-Abgleich

- APD-115/V-2 (Nutzer): wie Apple nur so weit rollen, dass das Feld über der Tastatur liegt; passt ein mehrzeiliges Feld nicht ganz, liegen nur
  seine ersten 1,5 Zeilen über der Tastatur.
- APD-115/V-3 (Claude, Abwandlung von V-2): statt der ersten 1,5 Zeilen die Zeile mit dem Cursor und eine halbe Zeile darunter – sonst läge der Cursor
  bei einem langen Text unter der Tastatur.
- Apple (HIG ‚Text fields‘, gelesen 07.11.2026): ‚Show a hint in a text field to help communicate its purpose.‘ · ‚Because placeholder text disappears
  when people start typing, it can also be useful to include a separate label describing the field to remind people of its purpose.‘ · ‚To let people
  input larger amounts of text, use a text view instead.‘ – zum Rollen bei der Tastatur sagt die Seite nichts.
- UIKit (Zweitquellen, nicht Apple selbst): Tabellen rollen das Feld mit Fokus von selbst über die Tastatur; ein Textbereich (UITextView) rollt so,
  dass der Cursor sichtbar ist.
- Eigene Regeln: R-5.1 (Bezeichnung und Feld gehören zusammen), R-5.8 (Schrift der Bezeichnungen) – eine Regel ‚jedes Feld hat eine sichtbare
  Bezeichnung‘ gibt es nicht; z. B. ‚Ort für Google Maps‘ (`#fPlace`) hat nur Platzhalter und `aria-label`.
