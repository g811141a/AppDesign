# Bau-Frage AppDesign 4.60.0 mit Reiselogbuch 3.57.0 – Sitzung 0123

**Stand 17.11.2026**

## APD-135 – alle 35 Entscheidungen getroffen

Fenster 1 bis 5 dieser Sitzung (J-7, J-11, J-13, J-16, J-17, J-21 bis J-35) stehen in Abschnitt 7 der Plan-Datei und im Backlog, jeweils mit
`doku-regeln` grün hochgeladen (Commits 6f4f2b3, 2b5807e, 2faba5f, df15b35, 5c62457). Eigene Antwort bei **J-23**: keine feste Regel – Claude
fragt jedes Mal (Bau-Frage mit Stufe) und weist darauf hin, wenn ein voller Lauf nötig ist. Die Konsolidierung kommt **nach** 4.60.0 als eigene
Version (J-3): zuerst Pakete 1 und 3 zusammen (J-4), mit Wortlaut zur Bestätigung (0 Nr. 29) und eigener Bau-Frage.

## Was in 4.60.0 / 3.57.0 käme (2 Punkte bereit)

**1. APD-30 Wischaktionen der Kacheln und sperrende Sprechblase** (allgemein, Prio 1)
- Wischen nach links auf einer Kachel der zentralen Liste (am iPhone die Startliste) zeigt zwei Kapseln 66 × 44 mit Wort: ‚Einstellen‘
  (settings) und ‚Löschen‘ (trash, rot) – dieselben Aktionen wie das Kontextmenü (gemeinsamer Baustein in `ui.js`).
- Offen 162 px, bleibt offen ab 81 px, sonst federt die Kachel zurück; Durchwischen ab 60 % der Breite löst ‚Löschen‘ aus; beim
  Zurückwischen werden die Kapseln kleiner und blasser.
- ‚Löschen‘ fragt immer mit der Sprechblase; **jede Abfrage graut die Umgebung ein (Schwarz 20 %) und sperrt sie** – daneben tippen ändert nichts
  (bisher: daneben tippen bricht ab).
- Kontextmenü (langes Drücken) unverändert; höchstens eine Kachel offen (schließt bei Tippen, Rollen, Neuaufbau, Drehen, Esc …).
- Grundlage, bestätigt 15.11.2026: Muster D, Testfall-Liste `arbeit/APD-30 Wischaktionen Testfall-Liste.md` (D-1 bis D-11, 71 Testfälle W-1 bis W-71),
  Wortlaut `arbeit/APD-30 Wischaktionen Wortlaut.md` (V-1 bis V-11, neue Regel R-7.8, R-1.4, Abschnitte 15.4, 15.7, 15.18, 15.19, 15.21, 16).
- Prüfungen: neu `checkWischen` (AppDesign `tests/ablauf.mjs`) und `tests/ablauf-wischen.mjs` (Reiselogbuch), dazu `checkErstFragen`,
  `checkNavigation`, `hig.mjs`, `safari.mjs`, Gegenproben; Prüfungen mit ‚daneben tippen bricht ab‘ werden auf ‚ändert nichts‘ umgestellt.

**2. APD-133/V-1** (allgemein, Prio 2, nur Text): Designrichtlinie 13 neuer Punkt ‚Neue Fenstergröße vor `resize`‘ nach ‚Kein Scroll-Anker‘
(Wortlaut bestätigt 16.11.2026, `arbeit/APD-133 Wortlaut Designrichtlinie 13.md`).

## Ablauf nach dem ‚Ja‘

`vorbereiten --ad 4.60.0 --app reiselogbuch=3.57.0` → bauen und Prüfungen schreiben (Hilfsagenten nur einzeln, Opus 5.5, Aufwand hoch) →
Texte (CHANGELOG mit Usertest P-107 ab /0, Backlog, Versionsgeschichten) → `fassung` → `stufe` → `los` im Hintergrund → Bericht mit Usertest.

- **Prüflauf: voll** – `ui.js` und `index.html` ändern sich, AppDesign ändert sich; Stufe Text ist damit ausgeschlossen (0 Nr. 2). `stufe` bestätige ich vor `los`.
- **Kontext:** zurzeit rund 197.500; die Übergabe kommt ab etwa 300.000 (0 Nr. 13). Bau und Prüfungen sind umfangreich – reicht der Kontext
  nicht bis zum Bericht, übergebe ich nach einem abgeschlossenen Schritt (nie mitten im Prüflauf).

## Offene Usertests

Keine.
