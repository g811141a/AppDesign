# Bau-Frage AppDesign 4.60.0 mit Reiselogbuch 3.57.0 – Sitzung 0125

**Stand 17.11.2026**

## Was in 4.60.0 / 3.57.0 käme (2 Themen)

**1. APD-30 Wischaktionen der Kacheln und sperrende Sprechblase – als erste AD-Bean `swipeactions`, mit der Regel APD-136** (allgemein, Prio 1)
- Wischen nach links auf einer Kachel der zentralen Liste (am iPhone die Startliste) zeigt zwei Kapseln 66 × 44 mit Wort: ‚Einstellen‘ (settings) und
  ‚Löschen‘ (trash, rot, ganz außen) – dieselben Aktionen wie das Kontextmenü.
- Offen 162 px, bleibt offen ab 81 px, sonst federt die Kachel zurück; Durchwischen ab 60 % der Breite löst ‚Löschen‘ aus; beim Zurückwischen werden
  die Kapseln kleiner und blasser.
- ‚Löschen‘ fragt immer mit der Sprechblase; **jede Abfrage graut die Umgebung ein (Schwarz 20 %) und sperrt sie** – daneben tippen ändert nichts
  (bisher: daneben tippen bricht ab).
- Kontextmenü (langes Drücken) unverändert; höchstens eine Kachel offen.
- **Gebaut als AD-Bean** `createSwipeactions(liste, { kacheln, aktionen, durchwischen })` nach der bestätigten Schnittstelle
  (`arbeit/0125 APD-136 Schnittstelle swipeactions.md`); das Reiselogbuch übergibt eine Aktionsliste für Kontextmenü und Wischen.
- **Neue Regel R-1.13 ‚AD-Beans‘** mit Prüfung `checkBeans`, Liste der AD-Beans in Designrichtlinie 15, Verweise in 14 und 15.4 (APD-136/V-1 bis V-4).
- Grundlage, bestätigt: Muster D, Testfall-Liste `arbeit/APD-30 Wischaktionen Testfall-Liste.md` (APD-30/D-1 bis D-11, W-1 bis W-80), Wortlaut
  `arbeit/APD-30 Wischaktionen Wortlaut.md` (APD-30/V-1 bis V-11) und `arbeit/0125 APD-136 Wortlaut allgemeine Regel.md` (APD-136/V-1 bis V-4).
- Prüfungen: neu `checkWischen` (AppDesign `tests/ablauf.mjs`), `checkBeans` (`tests/doku.mjs`), `tests/ablauf-wischen.mjs` (Reiselogbuch); dazu
  `checkErstFragen`, `checkNavigation`, `hig.mjs`, `safari.mjs`, Gegenproben; Prüfungen mit ‚daneben tippen bricht ab‘ werden auf ‚ändert nichts‘ umgestellt.

**2. APD-133/V-1** (allgemein, Prio 2, nur Text): Designrichtlinie 13 neuer Punkt ‚Neue Fenstergröße vor `resize`‘ nach ‚Kein Scroll-Anker‘.

## Ablauf nach dem ‚Ja‘

`vorbereiten --ad 4.60.0 --app reiselogbuch=3.57.0` → AD-Bean bauen und Prüfungen schreiben (Hilfsagenten nur einzeln, Opus 5.5, Aufwand hoch) →
Texte (CHANGELOG mit Usertest P-107 ab /0, Backlog, Versionsgeschichten) → `fassung` → `stufe` → `los` im Hintergrund → Bericht mit Usertest.

- **Prüflauf: voll** – `ui.js`, `design.css` und `index.html` ändern sich; Stufe Text ist ausgeschlossen (0 Nr. 2). `stufe` bestätige ich vor `los`.
- **Kontext:** zurzeit 249.762; die Übergabe kommt ab etwa 300.000 (0 Nr. 13), nie mitten in einem Bau. Der Bau mit Prüfungen und vollem Lauf passt
  nicht mehr in diese Sitzung. **Empfehlung:** ‚Ja‘ jetzt, gebaut wird in der neuen Sitzung 0126 – ich schreibe die Übergabe mit ‚Bau-Frage 4.60.0 mit
  Ja beantwortet (Nutzer 17.11.2026, Sitzung 0125)‘ als erstem Schritt.
- **Neue Sitzung:** `get_session` meldet für diese Sitzung `lineage: depth 8, limit 8`. Vermutung: `create_session` scheitert. Dann öffnest du einen
  neuen Chat in derselben Umgebung und fügst den Starttext aus `UEBERGABE.md` ein (2.5).
- **Warum 4.60.0 in 0123 ‚Nein‘ war,** steht nicht in den Dateien. Vermutung: Erst sollte APD-30 als AD-Bean geklärt werden – das ist jetzt erledigt.

## Offene Usertests

Keine.

## Backlog-Erinnerung

Nächste Version AppDesign 4.60.0: 2 Punkte bereit (APD-30 mit APD-136/V-1 bis V-4, APD-133) · Reiselogbuch 3.57.0: 1 Punkt bereit (APD-30)
· Offen im Backlog: APD-135 Pakete 1 und 3 (Wortlaut bestätigt, nach 4.60.0), APD-136 Umbau bestehender Elemente (mit APD-135 Paket 6 und 7),
APD-137 (Prio 2), APD-62, APD-134, APD-44 bis APD-52 (später).
