# APD-90 – Icon und Text bleiben zusammen: Testfall-Liste

Stand 30.10.2026 · Sitzung Reiselogbuch 0055 · **bestätigt** (Nutzer 30.10.2026), Muster iPad hoch hell (heute: Umbruch zwischen 🚐 und
‚Wohnmobil‘; neu: jeder Eintrag bleibt zusammen). Version 4.42.0 mit APD-85 und APD-87.

## Regeltext (Wortlaut bestätigt, 0 Nr. 29)

- Designrichtlinie 3 ‚Schrift und Abstände‘, neu: „**Icon und Text bleiben zusammen:** In einer Reihe aus Einträgen mit Icon und Text
  (z. B. Reisemittel) bricht die Zeile nur zwischen den Einträgen um, nie zwischen Icon und Text; ist ein Eintrag allein breiter als die
  Zeile, bricht er im Text um, nie direkt nach dem Icon.“
- Katalog 10, nächste freie Nummer: „Icon und Text eines Eintrags bleiben zusammen – Umbruch nur zwischen Einträgen“ (Prüfung `pruefe.mjs`:
  Icon und erstes Wort auf derselben Zeile).

## Fälle

| Nr. | Gerät / Lage | Daten | Erwartet |
|---|---|---|---|
| U-1 | iPad hoch | 8 Reisemittel | Umbruch nur nach dem Komma |
| U-2 | iPad quer mit Seitenleiste, große Schrift | 8 Reisemittel | wie U-1 |
| U-3 | Ausgabe HTML und PDF | 8 Reisemittel | wie U-1 |
| U-4 | iPhone | 8 Reisemittel | Wischzeile (APD-86) unverändert |
| U-5 | alle | ein Eintrag allein zu lang | Umbruch im Text, nie direkt nach dem Icon |
| U-6 | iPad | Drehen | neu umbrochen, Regel gilt |
| U-7 | – | Gegenprobe ohne Zusammenhalt | Prüfung rot |
