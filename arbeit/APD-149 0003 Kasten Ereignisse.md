# APD-149 – Was der Kasten ‚Ereignisse‘ zeigt (Sitzung AppDesign 0003)

**27.11.2026** · Antwort auf deine Frage mit Screenshot (16:25 Uhr).

## Was die Zeilen bedeuten

Der Kasten zeigt immer nur die **6 neuesten** Zeilen, die neueste oben (`katalog/index.html` Zeile 121–122).
Er bekommt zwei Arten von Zeilen:

| Zeile | Bedeutung |
|---|---|
| ‚Stapel · leer‘ | nichts ist offen |
| ‚Stapel · menu‘ | ein Menü ist offen (z. B. ‚Mehr‘) |
| ‚Stapel · menu › submenu‘ | Menü und Untermenü (z. B. ‚Ansicht‘) sind offen |
| ‚Stapel · sheet‘, ‚… › alert‘ | Fenster, Hinweisfenster darüber |
| ‚Ansicht kompakt‘, ‚Ansicht groß‘ | ein Befehl lief |
| ‚Kachel angetippt · Rom 2025‘ | ein Tipp hat die Kachel erreicht |

Jedes Öffnen und Schließen schreibt eine ‚Stapel‘-Zeile. Darum schieben sie die anderen Zeilen schnell aus den 6 sichtbaren hinaus.

## Schritt 5 (‚kein Kachel angetippt‘)

Tippst du bei offenem Menü auf die Kachel ‚Rom 2025‘, soll nur das Menü zugehen. Erreicht der Tipp die Kachel trotzdem, erscheint die Zeile ‚Kachel angetippt · Rom 2025‘. Erwartet ist: diese Zeile erscheint nicht, nur ‚Stapel · leer‘.

## Dein Screenshot

- 15:51:57 bis 15:51:59: Menü auf, zu, wieder auf, dann ‚Ansicht‘ offen (‚menu › submenu‘).
- 15:52:09 (10 s später, mit Neuaufbau alle 2 s): erst ‚menu‘, dann ‚leer‘ – das Untermenü blieb also 10 s offen (Schritt 15 ok) und ging dann zusammen mit dem Menü zu.
- Eine Zeile ‚Ansicht kompakt‘ fehlt dazwischen. Hättest du ‚Kompakt‘ gewählt, stünde sie zwischen 15:51:59 und 15:52:09 (der Befehl schreibt sie, bevor das Menü zugeht). Vermutung: das Menü ging durch einen Tipp daneben zu, nicht über ‚Kompakt‘ – aus dem Bild allein kann ich das nicht sicher sagen.
- Die Prüfung S-16 prüft nach ‚Kompakt‘, dass der Befehl lief (Ansicht kompakt), aber nicht die Zeile im Kasten.

## Vorschlag für das Muster

Den Kasten lesbarer machen: deutsche Texte statt der Namen aus dem Code (‚Menü offen‘, ‚Menü und Untermenü offen‘, ‚nichts offen‘), mehr als 6 Zeilen (z. B. 12) und die Befehle hervorgehoben. Das Muster gehört jetzt der Sitzung AppDesign 0004 (läuft parallel) – ich würde ihr den Vorschlag schicken, damit nicht zwei Sitzungen dieselbe Datei ändern.
