# APD-30 Wischaktionen – allgemeine Regel? Sperrende Sprechblase für alle Abfragen?

**Stand 15.11.2026** · Sitzung Reiselogbuch 0117 · **entschieden (Nutzer 15.11.2026): Frage 1 Ja – allgemeine Regel; Frage 2 a – alle Abfragen** · Testfall-Liste bestätigt (`arbeit/APD-30 Wischaktionen Testfall-Liste.md`, D-1 bis D-11,
W-1 bis W-71, Nutzer 15.11.2026)

## Frage 1 – Wischaktionen als allgemeine Regel festhalten? (0 Nr. 4)

**Empfehlung: Ja.**

- Die zentrale Liste mit Kacheln und Kontextmenü ist ein allgemeiner Baustein (15.4, R-4.2, R-7.1); jede App mit dieser Liste bekommt
  das Wischen dann gleich.
- Der Baustein liegt in AppDesign (`ui.js`, bestätigte Annahme D-1); die App nennt nur ihre Aktionen.
- Folge für die Richtlinie: in 15.4 entfällt ‚Kein Wischen‘, dazu kommt ein Absatz ‚Wischaktionen‘ und eine neue Regel im Katalog (17,
  Thema 7 ‚Seitenleiste und Liste‘, nächste freie Nummer R-7.8) mit der Prüfung `checkWischen`; in 16 die bewussten Abweichungen
  (Durchwischen fragt, statt sofort zu löschen; keine VoiceOver-Aktionen am Element).
- Bei ‚Nein‘ stünde dasselbe nur in der App-Richtlinie des Reiselogbuchs, der Baustein läge in `index.html`.

## Frage 2 – Gilt die eingegraute, sperrende Sprechblase für alle Abfragen?

**Heute (15.7, `choosePop` in `ui.js`):** hinter jeder Sprechblase liegt eine unsichtbare Sperre; **daneben tippen bricht ab**
(= ‚Abbrechen‘), nichts wird eingegraut.

**Im bestätigten Muster (Rückmeldung 15.11.2026, wie Notizen):** die Umgebung ist leicht eingegraut (Schwarz 20 %), **daneben tippen
ändert nichts** – man entscheidet sich für die rote Schaltfläche oder ‚Abbrechen‘.

**So macht es Apple (Quellen dieser Sitzung):**

- **Alert** (Warnung, Bestätigung): Tippen daneben schließt nicht ([Stack Overflow, UIAlertController](https://kiwix.lema.org/stackoverflow.com_en_all_2023-11/questions/25466718/uialertcontroller-handle-dismiss-upon-click-outside-ipad) – Forum, keine Apple-Seite).
- **Action Sheet am iPad** (Popover): Tippen daneben schließt und gilt als ‚Abbrechen‘ ([UIActionSheet](https://developer.apple.com/documentation/uikit/uiactionsheet.md), [Entwicklerforum 720480](https://developer.apple.com/forums/thread/720480)).
- **HIG Popovers:** Popover lassen sich leicht versehentlich schließen – für Warnungen deshalb Alerts verwenden ([HIG – Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers.md)).
- **Notizen:** Abfrage beim Löschen graut ein und sperrt – Beobachtung des Nutzers am Gerät (15.11.2026).
- Nicht belegt: ein HIG-Text zur Abdunkelung; der Wert Schwarz 20 % stammt aus dem Muster.

| | Variante | Folge |
|---|---|---|
| **a** | **Alle Abfragen** (`confirmPop`, `choosePop`): eingegraut, daneben tippen ändert nichts; Esc bzw. ⌘. bleibt ‚Abbrechen‘ (R-4.7) | Eine Sprechblase, ein Verhalten. 15.7 ‚daneben tippen bricht ab‘ und der Kommentar in `ui.js` ändern sich; betroffen sind alle Abfragen: Löschen (Kontextmenü, Mehr-Menü, Zeilen), ‚Änderungen verwerfen‘, Abgleich mit mehreren Wegen, ⓧ im Feld. Prüfungen, die heute ‚daneben tippen bricht ab‘ erwarten, werden umgestellt (W-22 bis W-25 für jede Sprechblase). |
| **b** | **Nur die Abfrage aus der Wischaktion** eingegraut und sperrend; alle anderen wie heute | Kleinere Änderung; aber dieselbe Frage ‚Reiselogbuch löschen?‘ verhält sich über Wischen anders als über das Kontextmenü. |
| **c** | **Alle Abfragen eingegraut, daneben tippen bricht weiter ab** | Sichtbar wie Notizen, Bedienung wie heute; weicht vom bestätigten Muster ab (dort ändert daneben tippen nichts). |

**Empfehlung: a.** Unsere Sprechblase stellt immer eine Entscheidung, meist vor dem Zerstören (R-4.12) – das ist bei Apple der Alert, und
der schließt nicht durch Tippen daneben; die HIG rät bei Warnungen ausdrücklich vom leicht wegzutippenden Popover ab. Ein Verhalten für
alle Abfragen hält die Regel schlank (0 Nr. 3). Ein Nachteil: wer heute durch Tippen daneben abbricht, braucht künftig ‚Abbrechen‘.

Offene Einzelheit bei a (kommt in den Wortlaut): die Abfrage am ⓧ eines Textfelds (`feld`, APD-81) lässt Fokus und Tastatur im Feld –
das bleibt, eingegraut wird trotzdem.

## Danach

Wortlaut alt und neu für 15.4, 15.7 (bei a oder c), Katalog 17 (R-7.8 neu, R-4.3 bzw. R-4.12 nur, wenn betroffen), 16 – mit ‚Ja/Nein‘
nach 0 Nr. 29; dann die Bau-Frage für APD-85 Teil 6 + Wischaktionen.
