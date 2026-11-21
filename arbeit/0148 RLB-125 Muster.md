# RLB-125 – Muster ‚Reiselogbuch sperren‘

Stand 21.11.2026 · Sitzung 0148 · iPad quer, hell (0 Nr. 6) · Pages ‚success‘ (AppDesign f243ab7)

## Link

https://g811141a.github.io/AppDesign/arbeit/RLB-125/index.html

Das Muster ist eine Kopie des Reiselogbuchs 3.57.11 mit AppDesign 4.67.1 und Sperre. Es hat **eigene Beispieldaten** (Australien gesperrt,
Toskana offen), deine echten Reiselogbücher bleiben unberührt. Neu laden setzt nichts zurück. Zum Zurücksetzen Safari-Daten der Seite löschen.

## Schritte (iPad quer, hell)

1. Link in Safari öffnen. Erwartet: Seitenleiste mit ‚Toskana‘ und ‚Australien‘. Auf der Kachel ‚Australien‘ unten rechts `lock`, auf ‚Toskana‘ keines.
2. ‚Australien‘ antippen. Erwartet: In der Kopfzeile steht neben ‚Australien‘ ein `lock`.
3. Kachel ‚Australien‘ lange drücken. Erwartet: Kontextmenü ‚Reiselogbuch entsperren‘, ‚Reiselogbuch einstellen‘ blass mit ‚Gesperrt‘,
   ‚Reiselogbuch löschen‘ blass mit ‚Gesperrt‘. Die blassen Einträge reagieren nicht.
4. Daneben tippen, dann auf der Kachel ‚Australien‘ nach links wischen. Erwartet: nur die Kapsel ‚Entsperren‘.
5. Mehr (`ellipsis`) der Kopfzeile. Erwartet: wie in Schritt 3, dazu ‚Suchen‘ und die Ansicht.
6. Tag ‚Mo, 24.08.‘ antippen. Erwartet: Tagesfenster mit ‚Gesperrt – nur lesen‘ unter dem Datum, oben links x, kein Häkchen. Texte lassen sich
   nicht ändern, keine Vorschläge, keine Smiley-Leisten. Mit `chevron-right` zum Folgetag, auch er nur lesen.
7. Fenster mit x schließen, `lock` neben dem Titel antippen. Erwartet: Sprechblase ‚‚Australien‘ entsperren? Danach lässt es sich wieder ändern
   und löschen.‘ mit ‚Entsperren‘ (blau) und ‚Abbrechen‘.
8. ‚Entsperren‘. Erwartet: `lock` in Kopfzeile und auf der Kachel weg; Tage lassen sich wieder bearbeiten.
9. Kachel ‚Toskana‘ lange drücken. Erwartet: ‚Reiselogbuch einstellen‘, ‚Reiselogbuch sperren‘, ‚Reiselogbuch löschen‘. ‚Reiselogbuch sperren‘
   sperrt sofort, ohne Abfrage.

Bilder (Chromium, iPad quer): `arbeit/RLB-125/bilder/1` bis `5`.

## Noch nicht im Muster

- Fenster ‚Fazit‘ nur lesen.
- RLB-125/L-4: Anzahl in der Abfrage beim Löschen.
- RLB-125/L-5: ‚Erst Backup erstellen‘.
- RLB-125/J-3: Hinweis bei ‚Ersetzen‘.
- RLB-125/L-3: Abgleich der Sperre.

Das kommt mit dem Bau, die Texte zeige ich vorher.

## Fragen zum Muster

1. **Wischaktionen, nicht gesperrt:** heute ‚Einstellen‘ und ‚Löschen‘. Im Muster kommt ‚Sperren‘ als dritte Kapsel dazu.
   - a) **(Empfohlen)** ‚Sperren‘ nur im Kontextmenü und im Mehr-Menü, beim Wischen bleiben zwei Kapseln. Das entspricht deiner Festlegung
     ‚Sperren über langes Drücken‘, und das Wischen bleibt einfach. Vermutung, nicht belegt: Apple bietet Seltenes eher im Kontextmenü an.
   - b) Drei Kapseln beim Wischen.
2. **Leere Felder im Lesefenster** (z. B. Quartier ohne Eintrag): a) **(Empfohlen)** wie im Muster als leere Felder, weil der Aufbau gleich bleibt
   wie beim Bearbeiten · b) leere Schritte ausblenden.
3. **Als allgemeine Regel festhalten?** (0 Nr. 4) ‚Nicht verfügbare Menüpunkte bleiben blass sichtbar, darunter der Grund (z. B. ‚Gesperrt‘)‘ –
   belegt durch HIG ‚Menus‘: „Show people when a menu item is unavailable.“ a) **(Empfohlen)** Ja, Wortlaut zeige ich vor dem Bau · b) Nein.

## Testfall-Liste (automatisch), Entwurf

| Nr. | Fall |
|---|---|
| RLB-125/T-1 | Kachel gesperrt: `lock` unten rechts, nicht über dem Text (iPad, iPhone-Startliste, hell, dunkel, große Schrift); nicht gesperrt kein Symbol |
| RLB-125/T-2 | Kontextmenü und Mehr gesperrt: Einträge, blass, nicht antippbar; ‚Entsperren‘ wirkt |
| RLB-125/T-3 | Wischen gesperrt: nur ‚Entsperren‘ |
| RLB-125/T-4 | Kopfzeile `lock` → Sprechblase → ‚Entsperren‘ / ‚Abbrechen‘; langer Titel mit `lock` gekürzt, nichts ragt hinaus |
| RLB-125/T-5 | Tagesfenster und Fazit nur lesen: kein Häkchen, Felder nur lesbar, keine ⓧ, keine Smiley-Leisten, Vortag/Folgetag bleiben nur lesen |
| RLB-125/T-6 | Drehen und Wechsel iPad/iPhone: Sperre und Lesefenster bleiben (Grundregeln) |
| RLB-125/T-7 | Abgleich: Sperre wird abgeglichen; ein gesperrtes Reiselogbuch wird nicht gelöscht; ‚Ersetzen‘ nennt ‚Darunter N gesperrte Reiselogbücher.‘ |
| RLB-125/T-8 | Backup erstellen und laden behält die Sperre; alte Backups ohne Sperre gelten als nicht gesperrt (`normalize`) |
| RLB-125/T-9 | Löschen: Anzahl in der Abfrage (L-4), ‚Erst Backup erstellen‘ (L-5) |
| RLB-125/T-10 | Gegenprobe: gesperrt, aber Häkchen im Tagesfenster → rot |
