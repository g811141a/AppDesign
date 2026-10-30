# APD-81 ⓧ auch in mehrzeiligen Feldern – Testfall-Liste

**Stand 29.10.2026** · Sitzung Reiselogbuch 0053 · Anlass: Rückmeldung P-73/1 · geklärt in `arbeit/APD-81 Klärung.md` (APD-81/F-1 bis
F-5, Messung M-1 bis M-4) · allgemeine Regel (R-5.6 erweitert), gebaut in AppDesign 4.41.0 / Reiselogbuch 3.39.0 (dein Ja vom
30.10.2026, Sitzung 0054).

---

## 1. Was sich ändert (allgemein, R-5.6 und 15.11)

- **Mehrzeilige Textfelder** (`textarea`, nicht `readonly`, `disabled`, `data-noclear`) zeigen wie die einzeiligen ein graues ⓧ, solange
  sie den Fokus haben und etwas drinsteht – **oben rechts auf Höhe der ersten Zeile**; der Text läuft in allen Zeilen nicht darunter
  (F-1). Wächst das Feld oder rollt es in sich, bleibt das ⓧ oben rechts am Feld.
- **Antippen:** eine Zeile → sofort leeren; mehr als eine Zeile → Sprechblase ‚Text löschen?‘ mit ‚Löschen‘ (rot) und ‚Abbrechen‘
  (R-4.3) (F-2). Fokus und Tastatur bleiben.
- **Leeren über den Bearbeiten-Befehl** (Text auswählen, `execCommand('delete')`) in **allen** Feldern mit ⓧ, ein- und mehrzeilig (F-5):
  die Undo-Taste der iPad-Tastatur und drei Finger holen den Text zurück (gemessen M-2, M-3); die App erfährt Leeren und Zurückholen
  über input-Ereignisse und speichert. Liefert der Befehl false, leert es über den Wert (wie bisher).
- **Reiselogbuch:** Programm, Kommentar (‚Wie war was?‘), Essen und Trinken, Fazit (F-3); nichts App-Eigenes nötig.
- **So macht es Apple:** mehrzeilige Textbereiche (UITextView) haben kein ⓧ – bewusste Abweichung, kommt in Designrichtlinie 16
  ‚Bewusste Abweichungen‘; Rückgängig wie bei Apple über Undo-Taste, drei Finger, Schütteln. Die Safari-Eigenheit (M-1 bis M-4: Wert
  leeren löscht das Rückgängig, Befehl nicht; Leeren und Tippen ein Schritt) kommt mit Quelle in Designrichtlinie 13.

## 2. Testfälle (automatisch)

`checkClear` (ablauf.mjs) erweitert; Grundregeln nach jedem Schritt. Rückgängig im Modell = Bearbeiten-Befehl ‚undo‘ (am Gerät gemessen
gleich, M-2, M-4).

| Nr. | Gerät × Lage × Darstellung | Daten | Handlung | Erwartet |
|---|---|---|---|---|
| C1 | iPad quer, hell | Programm, eine Zeile | ins Feld tippen | ⓧ oben rechts auf Höhe der ersten Zeile, 44 × 44, Innenabstand rechts ≥ ⓧ |
| C2 | iPad quer, hell | eine Zeile | ⓧ antippen | sofort leer, Fokus bleibt, input-Ereignis, gespeichert leer, ⓧ weg |
| C3 | iPad quer, hell | drei Zeilen | ⓧ antippen | Sprechblase ‚Text löschen?‘ am ⓧ, ‚Löschen‘ rot, ‚Abbrechen‘; Text unverändert |
| C4 | iPad quer | drei Zeilen | ‚Abbrechen‘ | Text unverändert, Fokus wieder im Feld, nichts gespeichert |
| C5 | iPad quer | drei Zeilen | ‚Löschen‘ | leer, Fokus im Feld, gespeichert leer |
| C6 | iPad quer | eine bzw. drei Zeilen | nach C2 bzw. C5 Rückgängig | ganzer Text zurück, input `historyUndo`, gespeichert wie vorher |
| C7 | iPad quer | Reisetitel (einzeilig) | ⓧ, dann Rückgängig | leer, dann Titel zurück und gespeichert (F-5) |
| C8 | iPad quer | drei Zeilen | ⓧ, Löschen, ein Wort tippen, Rückgängig | Text vom Anfang zurück (WebKit, M-4) |
| C9 | iPad quer | 30 Zeilen | im Feld ans Ende rollen | ⓧ bleibt oben rechts am Feld; Feld wächst beim Tippen: ⓧ bleibt oben |
| C10 | iPad quer → hoch | drei Zeilen | mit Fokus drehen | ⓧ bleibt oben rechts am Feld |
| C11 | iPhone hoch und quer, Blatt | eine bzw. drei Zeilen | wie C1–C6 | ⓧ im Feld, Sprechblase ganz auf dem Bildschirm über der Tastatur |
| C12 | iPad hoch, dunkel | drei Zeilen | wie C1, C3 | ⓧ grau wie im Suchfeld (mit ‚Kontrast erhöhen‘ `--muted`, R-1.9), Sprechblase dunkel |
| C13 | iPad quer, Textgröße groß | drei Zeilen | wie C1 | ⓧ wächst mit (R-1.10), Text läuft nicht darunter |
| C14 | alle | leer; `readonly`; `data-noclear`; Datum, Suche | Fokus | kein ⓧ |
| C15 | iPad quer, Hardware-Tastatur | drei Zeilen | Tab durch das Fenster | ⓧ nicht fokussierbar (`tabIndex -1`), Bezeichnung ‚Eingabe löschen‘ |
| C16 | Reiselogbuch, alle Ansichten | Programm, Kommentar, Essen, Fazit | Fokus | ⓧ in allen vier Feldern (F-3) |

Gegenprobe: ⓧ leert über den Wert → C6–C8 rot; ⓧ mittig statt oben → C1 rot; Sprechblase fehlt → C3 rot.

## 3. Testfälle (User) – Usertest mit der Version

- iPad: Programm mit einer Zeile – ⓧ leert sofort; Undo-Taste holt den Text zurück.
- iPad: Programm mit mehreren Zeilen – Sprechblase ‚Text löschen?‘; ‚Löschen‘, dann drei Finger nach links: Text zurück.
- iPad: Reisetitel – ⓧ, dann Undo-Taste: Titel zurück.
- iPhone: Programm mit mehreren Zeilen – Sprechblase über der Tastatur; nach ‚Löschen‘ das iPhone schütteln: ‚Widerrufen‘ holt den Text
  zurück (nicht gemessen – zeigt erst das Gerät).
- Beim Leeren kein Aufblitzen der Textauswahl, keine Lupe, kein Bearbeiten-Menü.
