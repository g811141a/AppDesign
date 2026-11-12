# RLB-124 – Versuch ‚Drucken in der App vom Home-Bildschirm‘

**Stand 12.11.2026** · Sitzung ‚Reiselogbuch 0107‘ · Muster mit Messung (0 Nr. 20, 2.7)

## Wozu

‚PDF‘ öffnet das Drucken-Menü in der App vom Home-Bildschirm nicht, in Safari schon (Proben A–D). Der Versuch prüft am Gerät, welcher
Weg zum PDF in der App vom Home-Bildschirm noch geht. Erst danach wählen wir den Weg, gebaut wird nur nach deinem ‚Ja‘.

## Vorher geprüft

`arbeit/RLB-124/pruefen.mjs` spielt alle 8 Fälle in Chromium und WebKit durch, auf iPad quer und iPhone hoch, mit ‚Fall neu‘ und Neuladen.
Ergebnis: **grün**. Die Auswertung der geteilten Datei passt zum Modell, das PDF aus Fall 8 ist gültig. Die **Gegenprobe**, in der die Knöpfe
nicht drucken, wird **rot** gemeldet. Am Gerät zeigt der Versuch nur ‚aufgenommen‘, bewertet wird aus den Rohdaten.

## Link

https://g811141a.github.io/AppDesign/arbeit/RLB-124/

## Schritte (iPad quer, hell)

1. Den Link in **Safari** öffnen. Erwartet: Seite ‚RLB-124 Drucken‘ mit dem gelben Kasten ‚Diese Seite läuft in Safari.‘
2. Teilen-Icon (share) › ‚Zum Home-Bildschirm‘ (falls angeboten: ‚Als Web-App öffnen‘ ein) › ‚Hinzufügen‘.
3. Safari schließen und auf dem Home-Bildschirm ‚RLB-124‘ öffnen. Erwartet: dieselbe Seite **ohne** gelben Kasten.
4. Oben steht ‚Nächster Schritt: Fall 1 von 8 …‘. Jeden Fall genau so ausführen, wie es dort steht: den blauen Knopf (‚Drucken‘, ‚Ausgabe öffnen‘,
   ‚HTML teilen‘, ‚PDF teilen‘) tippen, Drucken-Menü bzw. Teilen-Menü bzw. Fenster wieder schließen, dann mit einem der Knöpfe darunter
   antworten. Erwartet: Der Fall wird in der Liste abgehakt, und der nächste erscheint.
   - Fall 1–5: nach dem Tippen kommt das Drucken-Menü oder nicht. Bei Fall 2 und 4 geht zuerst ein Fenster ‚Ausgabe V001‘ auf; es danach mit x schließen.
   - Fall 6: Es öffnet sich eine Seite ‚RLB-124 Probedruck‘ oder nicht. Wenn ja, dort ‚Drucken‘ tippen, dann die Seite schließen und zurück.
   - Fall 7: Im Teilen-Menü nach unten rollen und ‚Drucken‘ suchen. Wenn es da ist, antippen.
   - Fall 8: Im Teilen-Menü ‚In Dateien sichern‘ wählen und sichern.
5. Nach Fall 8: ‚Messung teilen‘ › ‚In Dateien sichern‘. Die Datei `messung-RLB-124-….txt` im Chat anhängen. Klappt das nicht: Der Text erscheint
   unter den Knöpfen, ihn kopieren und im Chat einfügen.
   Erwartet: ‚8 von 8 aufgenommen‘.

Danach kannst du ‚RLB-124‘ vom Home-Bildschirm löschen. Die gesicherten Probedateien (Probedruck.pdf) kannst du ebenfalls löschen.

## Offener Usertest

- **P-101** (Reiselogbuch 3.55.0, AppDesign 4.57.0): ok bis auf /16 Schritt 3 → **RLB-124**.
