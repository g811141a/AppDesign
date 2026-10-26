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
