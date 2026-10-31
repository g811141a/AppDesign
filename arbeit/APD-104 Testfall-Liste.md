# APD-104 – Testfall-Liste: Großanzeige für Leisten-Knöpfe

Stand 31.10.2026, Sitzung 0067 · Muster `arbeit/APD-104 Muster.html` · **Variante A gewählt** (Nutzer 31.10.2026: Mitte, Loslassen löst aus) – für den Bau gelten L-1 bis L-9; L-10 und L-11 (B) entfallen.

## Apple-Abgleich (0 Nr. 23, 2.6)

- **So macht es Apple** (WWDC19 Session 261 ‚Large Content Viewer‘, https://developer.apple.com/videos/play/wwdc2019/261/):
  Standard-Leisten zeigen die Großanzeige **nur bei den Textgrößen für Bedienungshilfen** (AX1 bis AX5). Langes Drücken auf
  einen Leisten-Knopf zeigt Icon und Namen groß. Gleitet der Finger über die Leiste, wechselt die Anzeige zum Knopf darunter.
  Loslassen löst den Knopf darunter aus (wie ein Tipp).
- **Ort:** in der Mitte des Bildschirms (Designrichtlinie 15.8 und 16 ‚Keine Großanzeige‘).
- **Betroffen:** Designrichtlinie 16 ‚Keine Großanzeige‘ (Abweichung fiele weg), R-1.10 (Leisten wachsen nur bis XXXL), R-2.5
  (gekürzter Titel – Sprechblase), R-3.5 (langes Drücken still, 0,6 s), R-1.8 (VoiceOver nennt jeden Knopf – die Anzeige ist nur
  zu sehen, `aria-hidden`).
- **Abweichung im Web:** keine Systemanzeige; nachgebaut als eigene Ebene. Die Bildschirm-Lupe und das Safari-Menü beim langen
  Drücken werden unterdrückt (`-webkit-touch-callout: none`).

## Testfälle (automatisch) – im Muster schon geprüft

`arbeit/APD-104 Muster prüfen` (im Notizordner der Sitzung), Chromium und WebKit: **68 grün, 0 rot**.

| Nr. | Fall | Erwartet |
|---|---|---|
| L-1 | Textgröße L, langes Drücken auf einen Leisten-Knopf | keine Anzeige; wirkt wie Antippen |
| L-2 | L, Antippen | Knopf löst aus |
| L-3 | AX1, Antippen | Knopf löst aus, keine Anzeige |
| L-4 | AX1, 0,3 s halten | noch keine Anzeige |
| L-5 | AX1, 0,6 s halten | Anzeige mit Icon und Namen |
| L-6 | AX1, vor 0,6 s mehr als 10 px bewegen | keine Anzeige |
| L-7 | A, C: gleiten zum Nachbarknopf | Anzeige wechselt |
| L-8 | A: Loslassen über einem Knopf | Anzeige zu, Knopf löst aus |
| L-9 | C: Loslassen | Anzeige zu, nichts ausgelöst |
| L-10 | B: Loslassen | Blase bleibt; nächster Tipp schließt nur sie |
| L-11 | B: Blase unter dem Knopf, ganz sichtbar; ‚Nach oben‘ unten rechts → Blase darüber | ganz auf dem Bildschirm |

## Für den Bau dazu (nach der Wahl der Variante)

- Alle Ansichten: iPad quer/hoch, iPhone hoch/quer (iPhone quer niedrig, R-2.4), Fensterkopf (15.8), Seitenleiste (15.4),
  schwebende Knöpfe (15.1), Kapsel mit Rollen (15.5); nach Drehen, Rollen, Esc: Anzeige zu.
- Gekürzter Titel (R-2.5) und Großanzeige stören sich nicht; offenes Menü oder Fenster: keine Anzeige auf verdeckten Knöpfen.
- AX2 bis AX5: Anzeige wächst mit, bleibt ganz auf dem Bildschirm.
- Testfälle (User) am Gerät: Gefühl beim Gleiten, keine Lupe und kein Safari-Menü, VoiceOver unverändert.
