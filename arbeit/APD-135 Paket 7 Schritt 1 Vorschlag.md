# APD-135 Paket 7 – B-3.3 Schritt 1: Menü, Sprechblase, Fenster auf der Prüfseite

**Stand 19.11.2026** · Sitzung 0142 · Vorschlag, noch nichts gebaut · Nummern Q-n gelten nur in dieser Datei (außerhalb: APD-135/Q-1 …)

Grundlage:
- Plan `arbeit/APD-135 Konsolidierung 3 Befund und Plan.md`, Abschnitt 3: B-3.3 = „Gruppe B (25), zuerst Menü, Sprechblase, Fenster“, Risiko mittel
- Befund `arbeit/APD-135 Befund U Bausteine ui.js.md`, U-27 und U-28: Gruppe B braucht nur eigene Elemente; Menü, Sprechblase und Fenster zuerst, weil sie die
  meisten Regeln der Bedienungshilfen tragen
- B-3.1 und B-3.2 sind seit 4.64.0 gebaut (Prüfseite = Vorlage, Mindestseite, 6 Teile in der Hülle `bausteine-pruefseite.mjs`)

## Worum es geht

Heute prüfen vor allem die Prüfungen des Reiselogbuchs Menü, Sprechblase und Fenster mit, gemischt mit Inhalten der App (Befund C, z. B.
`ablauf-markierung-menues`: „gemischt: Markierung und Menü-Inhalt sind App, `checkMehrKnopf`, `checkWachsen` …“). B-3.3 prüft den **Baustein-Anteil** neu
auf der Prüfseite, also der Vorlage mit neutralen Daten. Das hat zwei Vorteile: Jede künftige App bekommt die Prüfung ohne eigenen Aufwand, und ein Fehler
in `ui.js` fällt in AppDesign auf, nicht erst in einer App. Vorgehen wie bei B-3.2: erst auf der Prüfseite rot, dann in der App entfernen.

## Umfang Schritt 1 (für 4.65.0)

Drei neue Teile in `tests/pruefseite.mjs` und in der Hülle der App, auf der Vorlage in allen 4 Ansichten, Chromium und WebKit:

| Nr. | Teil | Fall | Erwartet | Prüffunktion (vorhanden in `tests/ablauf.mjs`) |
|---|---|---|---|---|
| Q-1 | `menue` | Mehr-Menü der Liste und der Kopfzeile, Untermenü ‚Darstellung‘, Kontextmenü öffnen | jedes Menü wächst aus seiner Schaltfläche, auch nach der Großanzeige | `checkWachsen` |
| Q-2 | `menue` | Mehr-Knopf mit offenem Menü bzw. Untermenü | der Knopf bleibt blau, solange sein Menü offen ist | `checkMehrKnopf` |
| Q-3 | `menue` | Menü mit der Tastatur bedienen | Fokus im Menü, Esc schließt, der Fokus geht zurück auf die Schaltfläche | `checkFokus`, `checkFokusZurueck` |
| Q-4 | `sprechblase` | ‚Eintrag löschen‘ antippen | die Sprechblase wächst aus dem Knopf, der Rest ist gesperrt, Esc = Abbrechen, der Fokus geht zurück | `checkFokus`, `checkFokusZurueck` |
| Q-5 | `sprechblase` | dasselbe mit ‚Bewegung reduzieren‘ | ohne Animation | `checkRuhig` |
| Q-6 | `fenster` | ‚Eintrag bearbeiten‘ öffnen, ein Feld ändern | das Häkchen ist erst nach der Änderung blau | `checkDialogHead` |
| Q-7 | `fenster` | Fenster mit der Tastatur bedienen | Fokus im Fenster, Esc schließt, der Fokus geht zurück | `checkFokus`, `checkFokusZurueck` |
| Q-8 | alle | Grundregeln nach jedem Schritt | wie in den bisherigen Teilen (nichts ragt hinaus, die Seite rollt nicht) | `hig.mjs` |
| Q-9 | Gegenprobe | je Teil ein eingeschleuster Fehler in `ui.js` (`--gegenprobe pruefseite`) | rot auf der Prüfseite **und** in der bisherigen Prüfung der App, bevor sie dort wegfällt | `GEGENPROBEN_PRUEFSEITE` |
| Q-10 | Wegfall in der App | `checkMehrKnopf` und `checkWachsen` in `ablauf-markierung-menues` | fallen weg, sobald Q-9 belegt, dass die Prüfseite denselben Fehler findet. Die Anteile der App (Markierung, Inhalt der Menüs) bleiben. | – |

**Nicht in Schritt 1:**
- `ablauf-bedienung`, `regeln-ablauf` (`checkDialogHead`) und `ablauf-fenster-breite` bleiben unverändert. Ob dort noch etwas wegfallen kann, steht im
  nächsten Schritt.
- Die übrigen 22 Bausteine der Gruppe B kommen in weiteren Schritten.

## Bezug zum Bean-Katalog (APD-140)

Menü, Sprechblase und Fenster sind noch **keine AD-Beans** (Liste in 15: nur `swipeactions` und `hinweis`). Darum stehen sie nicht im Katalog. Werden sie
mit APD-136 zu Beans, bekommen sie ihre Katalogseite (R-1.13 neu), und die Prüfseite kann dann dieselbe Seite nutzen.

## Für die Bau-Frage

- 4.65.0 hat damit **2 Themen** (APD-140, APD-135 Paket 7) und 2 Punkte. Das passt zu 0 Nr. 8.
- AD-Bean: keine, weil nur Prüfungen dazukommen (`ui.js` und `design.css` unverändert).
- Prüflauf voll (AppDesign ändert sich).
- Weiß ich nicht: wie viele Minuten die drei Teile kosten. Ich messe es beim Bau und nenne es im Bericht.
- Regeln: keine neue Regel, kein neuer Wortlaut. Der Abschnitt ‚Prüfseite‘ in `tests/README.md` und Designrichtlinie 14 ‚Prüfen‘ nennen die Teile schon
  allgemein (Bausteine, die ohne den Inhalt einer App gleich laufen).
