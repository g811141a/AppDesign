# Wird der Bau schneller, wenn AppDesign fertig ist? (Sitzung 0161)

**26.11.2026** · nur Einschätzung, keine Änderung

## Kurz

**Von allein nicht.** Mit den heutigen Regeln wird der Bau eher länger, auch wenn AppDesign stillsteht. Schneller wird er erst, wenn wir die Regel ‚voll = alle‘ ändern. Ein fertiges AppDesign ist dafür die Voraussetzung.

## Warum nicht von allein (belegt)

- **Stufe voll läuft bei jeder Code-Änderung der App.** Stufe Text gibt es nur, wenn sich bloß Texte der App ändern (0 Nr. 2). Ein stillstehendes AppDesign hilft da nicht: Jede Korrektur am App-Code (wie jetzt `showOutputResult`) startet wieder alle 192 Läufe.
- **Nach einer Version in Stufe Text** muss die nächste Version wieder voll laufen (`veroeffentlichen.mjs`, APD-128/D-4).
- **Die Prüfungen wachsen.** Jedes ‚nicht ok‘ wird für immer eine feste Prüfung im vollen Lauf (0 Nr. 1). Diese Version bringt drei neue Teile (P-123/F-1 bis P-123/F-3). Im Reiselogbuch gibt es 64 Prüfdateien.
- **Die Prüfungen der App prüfen die AD-Beans mit.** `hig.mjs` (rund 28 min) prüft die allgemeinen Regeln nach jedem Schritt jeder Prüfung. Das passiert in jeder App-Version, auch wenn AppDesign gleich bleibt.

## Was ein fertiges AppDesign möglich macht (Vermutung)

Sind alle allgemeinen Teile AD-Beans und in AppDesign selbst geprüft (Katalog, Prüfseite), muss eine App-Version, die AppDesign **nicht** ändert, die Beans nicht noch einmal ganz prüfen:

- **Prüfungen nach Herkunft trennen:** Bean-Prüfungen laufen voll nur, wenn sich die AppDesign-Fassung ändert. Bei einer reinen App-Version laufen nur die App-Prüfungen und eine kurze Stichprobe der Beans.
- Das ist der Punkt d) ‚feiner wählen, was läuft‘ aus APD-147. Er ändert 0 Nr. 2 (‚voll = alle‘) und braucht deine Freigabe zum Wortlaut (0 Nr. 29) und eine Gegenprobe.
- Wie viel das spart, weiß ich nicht. Ich müsste dafür jede der 192 Läufe als ‚Bean‘ oder ‚App‘ einordnen und die Zeiten zusammenzählen. Das wäre eine Messung für APD-147.

## Zusammen mit dem Rest von APD-147

- Weniger Arbeit je Lauf: Wartezeiten ersetzen (APD-147/M-3), Browser wiederverwenden (e).
- Weniger rote Läufe: Vorprüfung (APD-147/M-1).
- Mehr Maschinen: GitHub Actions (a).
- Weniger Läufe je Version: Auswahl nach Herkunft (d) – mit fertigem AppDesign am wirksamsten.
