# APD-124 – Rückgängig im Feld nach dem Leeren: Klärung, Muster, Testfall-Liste

Stand 07.11.2026 · Sitzung Reiselogbuch 0095 · Backlog AppDesign APD-124 (Prio 1, allgemein, ändert R-5.6)

## Wunsch (Nutzer 07.11.2026)

Das Löschen in einem Eingabefeld soll ein Rückgängig bis zur ersten Eingabe anbieten: das ⓧ im Feld wird durch ein Rückgängig-Icon ersetzt,
nach dem Rückgängig steht wieder das ⓧ zum Löschen. Der ausgeschnittene Wert bleibt in der Zwischenablage, um ihn später zu verwenden.

## Heute (AppDesign 4.54.0)

- R-5.6 / Designrichtlinie 15.11: ⓧ in ein- und mehrzeiligen Feldern, solange das Feld den Fokus hat und etwas drinsteht; eine Zeile sofort leeren,
  mehr als eine Zeile erst nach der Sprechblase ‚Text löschen?‘ (APD-81, 4.41.0, Usertest P-79 ok).
- Rückgängig nur über Undo-Taste (iPad), drei Finger nach links, Schütteln (iPhone) – möglich, weil das ⓧ über den Bearbeiten-Befehl leert
  (Designrichtlinie 13 ‚Leeren und Rückgängig‘, APD-81/M-1 bis M-4). Kein Icon, keine Zwischenablage.

## Apple-Abgleich (0 Nr. 23, 2.6)

- So macht es Apple (Designrichtlinie 16 Nr. 11 und ‚bewusste Abweichungen‘, R-5.6): das ⓧ (‚whileEditing‘) leert nur; Rückgängig über Undo-Taste,
  drei Finger, Schütteln; mehrzeilige Felder (UITextView) haben kein ⓧ. Ein Icon, das nach dem Leeren zu Rückgängig wird, hat Apple nicht.
- **Bewusste Abweichung** (Wunsch des Nutzers): am iPhone gibt es keine Undo-Taste, Schütteln und drei Finger sind wenig bekannt. Das Icon steht an
  der Stelle des ⓧ, in derselben Größe (44 × 44, wächst mit der Textgröße) und Farbe (`--muted`).
- Katalog: R-5.6 (ändert sich), R-4.3 (Sprechblase – entfällt hier), R-1.10 (Textgröße), R-3.x Trefferfläche 44 × 44 (bleibt).

## Entscheidungen (Nutzer 07.11.2026, Sitzung 0095)

- APD-124/E-1 Die Sprechblase ‚Text löschen?‘ bei mehrzeiligen Feldern **entfällt** – das Rückgängig im Feld macht das Leeren sicher.
- APD-124/E-2 Verliert das leere Feld den Fokus, **verschwindet** das Rückgängig-Icon (wie das ⓧ nur mit Fokus); der Text bleibt in der Zwischenablage.
- APD-124/E-3 (aus dem Wunsch) Rückgängig bis zur ersten Eingabe; nach dem Rückgängig bzw. der ersten Eingabe wieder das ⓧ. Der geleerte Text kommt
  beim Leeren in die Zwischenablage.

- APD-124/E-4 Muster am iPad und iPhone geprüft: **Variante A (graue Linie, `undo-2`), alles ok** (Nutzer 07.11.2026, Sitzung 0095). Schritt 10
  (Undo-Taste nach dem Rückgängig) ohne eigene Angabe. Offen vor ‚bereit‘: Wortlaut R-5.6 und Designrichtlinie 15.11/16 (0 Nr. 29), Muster iPad hoch
  und iPhone quer (0 Nr. 6), Testfälle (User).

## Muster (nur hell, Vereinbarung 30.10.2026)

`arbeit/APD-124/index.html` – drei Felder (Titel, Ort, Verlauf mehrzeilig), design.css der Fassung 4.54.0, ui.js aus `arbeit/APD-124 Muster bauen.mjs`
(Kopie von `fassung/4.54.0/ui.js`). Unten zeigt die Seite, ob Safari die Zwischenablage beschreiben ließ (‚Zwischenablage: N Zeichen kopiert‘ bzw.
‚… abgelehnt‘) – nur zum Prüfen, nicht für die App.

- APD-124/V-1 Variante A (`?v=a`, Empfehlung): Rückgängig als graue Linie (Lucide `undo-2`) – leichter als das ⓧ, sofort als ‚anderer‘ Knopf erkennbar.
- APD-124/V-2 Variante B (`?v=b`): `undo-2` weiß im grauen Kreis wie das ⓧ.
- Technik: Rückgängig setzt den Text über den Bearbeiten-Befehl wieder ein (`execCommand('insertText')`, sonst über den Wert); Zwischenablage mit
  `navigator.clipboard.writeText` im Tipp (Geste des Nutzers).

## Testfall-Liste (Testfall (automatisch), `arbeit/APD-124 Muster prüfen.mjs`, Chromium und WebKit, Varianten A und B, Titel, Ort, Verlauf)

| Nr. | Handlung | Erwartet |
|---|---|---|
| APD-124/T-1 | Feld mit Text antippen | ⓧ rechts im Feld |
| APD-124/T-2 | ⓧ antippen (auch mehrzeilig, mehrere Zeilen) | sofort leer, ohne Sprechblase, Fokus bleibt |
| APD-124/T-3 | danach | an Stelle des ⓧ das Rückgängig-Icon |
| APD-124/T-4 | danach (Chromium) | der geleerte Text liegt in der Zwischenablage |
| APD-124/T-5 | Rückgängig antippen | der ganze Text ist zurück, wieder das ⓧ |
| APD-124/T-6 | leeren, ein Zeichen tippen, per Taste löschen | nach dem Tippen das ⓧ; nach dem Löschen kein Knopf (Rückgängig verfallen) |
| APD-124/T-7 | leeren, Fokus weg, wieder ins Feld | kein Knopf (APD-124/E-2) |
| APD-124/Y-1 | Gegenprobe `PRUEF_V=heute` (ui.js 4.54.0) | APD-124/T-2 bis APD-124/T-7 rot |

Ergebnis Sitzung 0095: Chromium und WebKit ‚alles in Ordnung‘; Gegenprobe rot (APD-124/T-2 Sprechblase im Verlauf, APD-124/T-3, APD-124/T-5, APD-124/T-6, APD-124/T-7).

**Am Gerät (Testfall (User) des Musters):** ob Safari die Zwischenablage beim Tipp auf ⓧ beschreiben lässt (Meldung unten auf der Seite, dann in
Notizen einsetzen), Rückgängig per Icon mit der Undo-Taste danach, Aussehen A gegen B, iPhone ohne Undo-Taste.
