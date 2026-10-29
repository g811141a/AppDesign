# APD-81 – ⓧ auch in mehrzeiligen Feldern: Klärung

Sitzung ‚Reiselogbuch 0050‘ · 26.10.2026. Wunsch des Nutzers aus P-73/1 (25.10.2026): das graue ⓧ zum Leeren auch in
mehrzeiligen Feldern, z. B. ‚Programm‘ im Tagesfenster.

**Heute (R-5.6, Designrichtlinie 15.11):** nur in einzeiligen Feldern (Reisetitel, Reiseteilnehmer, Quartier, Ort, Gesamtausgaben);
solange das Feld den Fokus hat und etwas drinsteht, rechts im Feld ein graues ⓧ (44 × 44, Text läuft nicht darunter); Antippen
leert sofort, Cursor und Tastatur bleiben. Ausdrücklich **nicht** in mehrzeiligen, Datums- und Suchfeldern.

**So macht es Apple:** Mehrzeilige Textbereiche (UITextView – Notizen, Mail, die Notizfelder in Kalender, Erinnerungen und
Kontakte) haben **kein** ⓧ; geleert wird mit Auswählen → ‚Ausschneiden‘ bzw. Löschtaste, rückgängig mit der Undo-Taste der
iPad-Tastatur, Schütteln oder Wischen mit drei Fingern. Das ⓧ ist bei Apple nur für einzeilige Felder (UITextField,
`clearButtonMode`). Ein ⓧ im mehrzeiligen Feld ist also eine **bewusste Abweichung** und kommt in Designrichtlinie 16
‚Bewusste Abweichungen‘.

Betroffen im Reiselogbuch: Programm, Kommentar (‚Wie war was?‘), Essen und Trinken, Fazit.

## Entschieden (Nutzer 26.10.2026, Sitzung 0050)

F-1 a, F-2 a, F-3 a, F-4 a – jeweils die Empfehlung. Status: bereit (Backlog ‚0. Nächste Version‘).

## Fragen (Empfehlung jeweils a)

- **F-1 Platz des ⓧ:** a) **oben rechts**, auf Höhe der ersten Zeile, der Text läuft rechts in **allen** Zeilen nicht darunter (wie
  einzeilig) · b) unten rechts · c) senkrecht in der Mitte des Felds. *Warum a:* Wer oben zu lesen beginnt, sieht es; beim Wachsen
  des Felds bleibt es stehen, statt zu wandern.
- **F-2 Langer Text – sofort leeren?** a) **eine Zeile: sofort leeren wie heute; mehr als eine Zeile: Sprechblase ‚Text löschen?‘ mit
  ‚Löschen‘ (rot) und ‚Abbrechen‘** (R-4.3) · b) immer sofort leeren · c) sofort leeren mit ‚Widerrufen‘ (Rückgängig, wartet auf
  den Baustein Kurzmeldung aus APD-30). *Warum a:* in einem mehrzeiligen Feld steckt oft ein ganzer Tag; ein Fehltipp darf ihn nicht
  ohne Rückfrage löschen, und bis APD-30 gibt es kein Rückgängig. *Vermutung, vor dem Bau zu messen:* Leert die App das Feld über
  die Bearbeiten-Befehle des Browsers statt über den Wert, könnte die Undo-Taste der iPad-Tastatur den Text zurückholen – dann wäre
  später c) ohne eigenen Baustein möglich.
- **F-3 Welche Felder:** a) **alle mehrzeiligen Textfelder**, abschaltbar je Feld wie heute (`data-noclear`) · b) nur ‚Programm‘ ·
  c) nur Felder ab einer bestimmten Länge.
- **F-4 Allgemeine Regel:** a) **Ja** – R-5.6 gilt für ein- und mehrzeilige Felder (Prüfung `checkClear` erweitert), dazu die
  Abweichung in 16 · b) Nein, nur im Reiselogbuch.

Nach der Klärung: Status ‚bereit‘, Testfall-Liste (0 Nr. 1) mit dem Bau; Gerät × Lage × Darstellung × Handlung (Antippen,
Tastatur, Drehen, Rollen im Feld, Abfrage) × Daten (eine Zeile, viele Zeilen, leer).

## Messung am iPad (Nutzer 29.10.2026, Sitzung 0053)

Muster `arbeit/APD-81 Muster.html` (vorher im Modell geprüft: `arbeit/APD-81 Muster prüfen.mjs`, Chromium und WebKit, Gegenprobe rot),
Messdatei `arbeit/APD-81 Messung 2026-10-29 iPad hoch Safari.txt` (iPad hoch, Safari 26.6.3, Bildschirm 834 × 1194), ausgewertet mit
`arbeit/APD-81 auswerten.mjs`.

- **M-1 Leeren über den Wert (heute, `value = ''`):** die Undo-Taste tut nichts – kein `historyUndo`, das Feld bleibt leer (Zeilen 8–11).
- **M-2 Leeren über den Bearbeiten-Befehl** (Text auswählen, `document.execCommand('delete')`, Ergebnis ‚ja‘): ein `beforeinput`/`input`
  `deleteContentBackward` wie beim Löschen per Taste; die Undo-Taste holt den ganzen Text zurück – `input historyUndo`, Länge 0 → 103
  (Zeilen 16–20). Die App erfährt es über das input-Ereignis, speichert also wie bei jeder Eingabe.
- **M-3 Mit drei Fingern nach links wischen** holt ihn genauso zurück (Zeilen 27–33).
- **M-4 Nach dem Leeren getippt:** ein einziges Rückgängig holt den ursprünglichen Text zurück – Safari fasst Leeren und Tippen zu einem
  Schritt zusammen (Zeilen 56–64); danach Ausschneiden (`deleteByCut`) und Rückgängig ebenso (65–68). Das WebKit-Modell der Prüfung
  verhielt sich genauso (Chromium braucht zwei Schritte).
- Der Fokus bleibt in allen Fällen, die Tastatur bleibt offen (`vv` 274 bis zum Antippen von ‚Fall fertig‘).
- **Vermutung bestätigt (iPad, Safari):** über den Bearbeiten-Befehl geleert, ist das ⓧ mit der Undo-Taste und drei Fingern rückgängig zu
  machen. Nicht gemessen: App vom Home-Bildschirm, iPhone (dort Schütteln statt Undo-Taste).

## Entschieden nach der Messung (Nutzer 29.10.2026, Sitzung 0053)

- **F-2 bleibt a** (eine Zeile sofort, mehr als eine Zeile Sprechblase ‚Text löschen?‘) – **dazu** leert das ⓧ über den Bearbeiten-Befehl
  (Text auswählen, `execCommand('delete')`), damit die Undo-Taste und drei Finger den Text zurückholen (M-2, M-3). Sicher, weil iPhone
  und Home-Bildschirm nicht gemessen sind.
- **F-5 (neu) einzeilige Felder:** auch das ⓧ der einzeiligen Felder (R-5.6) leert über den Bearbeiten-Befehl – heute holt die
  Undo-Taste dort nichts zurück (M-1). Ein Verhalten für alle Felder. Ist der Befehl nicht verfügbar (`execCommand` liefert false),
  leert es wie bisher über den Wert.
- Testfall-Liste: `arbeit/APD-81 Testfall-Liste.md`.
