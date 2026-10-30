# APD-91 – Suche im Mehr-Menü: Testfall-Liste

Stand 30.10.2026 · Sitzung Reiselogbuch 0056 · **bestätigt** (Nutzer 30.10.2026): Testfall-Liste, Menüs (Muster Bild 1 und 2), Suche in allen (Bild 4 und 5), x-Knopf (Bild 3). Muster iPad quer und iPhone hoch, hell, aus der echten App (Playwright); Regeltexte noch offen (0 Nr. 29).

Entschieden: In der Seitenleiste (iPhone: Startliste) und auf der Seite eines Eintrags steht ‚Suchen‘ (`search`) als erster Punkt
im Mehr-Menü, darunter ein Strich. Die eigenen Lupen-Knöpfe entfallen. Die geöffnete Suchzeile bleibt oben, auch am iPhone. ⌘F sucht
im offenen Eintrag, ohne offenen Eintrag in allen. Beenden: runder x-Knopf rechts in der Suchzeile (`x`, ‚Suche beenden‘, Muster Bild 3) – entschieden (Nutzer 30.10.2026). Der Mehr-Knopf bleibt bei offener Suche normal (nicht blau, waagrecht) – blau und senkrecht heißen ‚Menü offen‘ (APD-87). Abweichungen von Apple: Seitenleiste (Suche im Menü statt sichtbar) und iPhone (Suchzeile oben statt über der Tastatur).

## Fälle

| Nr. | Gerät / Lage | Handlung | Erwartet |
|---|---|---|---|
| S-1 | iPad quer und hoch, iPhone hoch und quer | Mehr der Seitenleiste bzw. Startliste antippen | ‚Suchen‘ mit Lupe als erster Punkt, darunter ein Strich, dann Backup erstellen, Backup laden, Darstellung |
| S-2 | wie S-1 | Mehr der Seite eines Eintrags antippen | ‚Suchen‘ als erster Punkt, darunter ein Strich, dann Alle Tage … |
| S-3 | alle | Kopfzeilen ansehen | keine eigene Lupe mehr in Seitenleiste und Seite; Kapseln ohne Lücke |
| S-4 | alle | ‚Suchen‘ im Menü der Seitenleiste wählen | Menü zu, Suchzeile ‚In allen suchen‘ offen, Cursor im Feld, Tastatur offen (R-2.3) |
| S-5 | alle | ‚Suchen‘ im Menü der Seite wählen | Menü zu, Suchzeile offen, Cursor im Feld; Verhalten wie heute (15.2) |
| S-6 | alle | runden x-Knopf rechts in der Suchzeile antippen (Seite und Seitenleiste bzw. Startliste) | Suchzeile zu, Filter und Markierung weg, Inhalt ganz oben |
| S-7 | iPhone hoch und quer | Suche öffnen, tippen | Suchzeile oben, springt nicht (R-4.5), niedrig quer 32 px (R-2.4) |
| S-8 | iPad mit Tastatur | ⌘F mit offenem Eintrag | Suche im Eintrag offen, Cursor im Feld |
| S-9 | iPad mit Tastatur | ⌘F ohne offenen Eintrag (Start, iPhone-Liste) | Suche in allen offen |
| S-10 | iPad mit Tastatur | ⌘F bei offener Suche | nur Cursor ins Feld, Begriff bleibt |
| S-11 | iPad mit Tastatur | ⌘F bei offenem Fenster oder Menü | nichts |
| S-12 | alle | ohne Reiselogbuch | kein ‚Suchen‘ im Menü der Seitenleiste (heute: keine Lupe, RLB-92/F-10) |
| S-13 | alle | Drehen mit offener Suche | Begriff, Filter und Treffer bleiben (R-8.1) |
| S-14 | alle | hell / dunkel, große Schrift, Kontrast erhöhen | Menü und Suchzeile lesbar, Strich sichtbar |
| S-15 | alle | Bildschirmleser | ‚Suchen‘ als Menüpunkt; x-Knopf heißt ‚Suche beenden‘ |
| S-16 | alle | Mehr-Knopf bei offenem Menü (APD-87) | senkrechte Punkte auch mit ‚Suchen‘ im Menü |
| S-18 | alle | Suche offen, Menü zu | Mehr-Knopf normal: waagrecht, nicht blau (APD-87 nur bei offenem Menü) |
| S-17 | – | Gegenprobe: Lupe wieder in der Kapsel bzw. ‚Suchen‘ nicht zuerst | Prüfung rot |

## Testfälle (User)

- ⌘F in der Home-Bildschirm-App am iPad mit Hardware-Tastatur: kommt das Kürzel an (Vermutung: ja)?
- Menü und Suchzeile am Gerät ansehen (iPad quer, iPhone hoch).
