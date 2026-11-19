# APD-138 – Testfall-Liste (Dateiname am iPad in einer Zeile)

**Stand 19.11.2026** · Sitzung 0136 · Muster bestätigt und Wortlaut R-10.8 bestätigt (Nutzer 19.11.2026, im Fenster) · Muster: `arbeit/APD-138 Muster/`
(1 heute 360 px, 2 neu 416 px, 3 sehr langer Name 600 px; iPad quer 1180 × 820, hell, WebKit) · Klärung: `arbeit/0136 APD-138 Klärung.md`

## Umfang

- **Allgemein (AppDesign):** das Hinweisfenster (`inform`, `ui.js`) bekommt die Eigenschaft ‚Breite nach Dateiname‘: steht ein Dateiname (`.fname`) darin,
  wird es am iPad so breit, dass der Name in einer Zeile steht – mindestens die Grundbreite von `#msg`, höchstens die Breite von `#msg.wide`
  (600 px × Textgröße, höchstens Bildschirmbreite − 32 px); darüber Umbruch nur nach einem Leerzeichen. iPhone unverändert. Keine neue AD-Bean (R-1.13).
- **Regel:** R-10.8 im bestätigten Wortlaut (Designrichtlinie 17), Prüfung `ablauf.mjs` – `checkDateiname` erweitert.
- **Prüfstufe:** voll (Code in AppDesign und neue Fassung in der App).

## Testfälle (automatisch)

Alle in Chromium und WebKit; nach jedem Schritt die Grundregeln (`pruefe.mjs`).

| Nr. | Fall | Erwartet | Prüfung | gegen 4.63.0 |
|---|---|---|---|---|
| D-1 | iPad quer, Backup-Name ‚Ω Backup Reiselogbuch 2026.11.19 08.15.json‘ | Name in einer Zeile; Fenster breiter als die Grundbreite und höchstens Höchstbreite | `checkDateiname` | rot (2 Zeilen) |
| D-2 | iPad hoch, derselbe Name | wie D-1 | `checkDateiname` | rot |
| D-3 | iPad, kurzer Name | Fenster bleibt bei der Grundbreite (360 px × Textgröße) | `checkDateiname` | grün |
| D-4 | iPad, sehr langer Name (länger als die Höchstbreite) | Fenster = Höchstbreite; Umbruch nur nach einem Leerzeichen | `checkDateiname` | rot |
| D-5 | große Textgröße (Text 53) | Höchstbreite wächst mit der Textgröße, nie über Bildschirmbreite − 32 px; Umbruch nur nach einem Leerzeichen | `checkDateiname` | rot |
| D-6 | schmales Fenster (geteilter Bildschirm) | Fenster höchstens Bildschirmbreite − 32 px, kein waagrechtes Rollen | `checkDateiname` | grün |
| D-7 | iPhone hoch und quer | unverändert: Breite wie jedes Hinweisfenster | `checkDateiname` | grün |
| D-8 | alle Hinweise mit Dateinamen: geteilt, geladen, abgebrochen, Fehler, Drucken – Backup, Ausgabe HTML/PDF, Abgleichbericht | D-1 bis D-7 gelten für jeden | `checkDateiname` | rot |
| D-9 | drehen bei offenem Hinweis (quer → hoch → quer) | Breite neu berechnet, Name weiter einzeilig; Grundregeln danach | `checkDateiname` | rot |
| D-10 | Gegenprobe: Prüfkopie ohne Breitenanpassung | `checkDateiname` rot mit ‚R-10.8‘ | Gegenprobe | – |
| D-11 | Texte: R-10.8 neu genau einmal, alter Text nur in der Geschichte | `doku-regeln` grün | `doku-regeln` | rot |

## Testfall (User)

Am iPad (quer) ein Backup erstellen und ‚In Dateien sichern‘ wählen – Erwartet: im Hinweisfenster ‚Backup‘ steht der Dateiname in einer Zeile.
