# APD-85 – Voller Prüflauf wackelt in WebKit unter Last: Testfall-Liste (Teil 1)

Stand 30.10.2026 · Sitzung Reiselogbuch 0055 · Zusammenarbeit 0 Nr. 1: jeder Fall wird ein automatischer Test
(`tests/lauf-selbsttest.mjs`, `werkzeug/veroeffentlichen-selbsttest.mjs`).

## Messung (30.10.2026, Sitzung 0055)

Reiselogbuch 3.39.0 / AppDesign 4.41.0, nur WebKit, `node tests/alle.mjs --browser webkit --alle --jobs 4` (4 Kerne):
**alle 59 Läufe grün in 24:53**, kein Wackler. Längste: `ablauf-blatt` 08:32, `ablauf-navigation` (drei Teile) je etwa 03:50,
`ablauf-liste-still` 03:22, `hig` (fünf Teile) je etwa 03:17. Zum Vergleich 0054: voller Lauf beider Browser mit `--jobs 2`,
118 Läufe in 101:20. Folgerung: Die Wackler von 4.39.0 lassen sich nicht gezielt nachstellen. Deshalb zuerst Teil 1
(Wiederholen und Melden); Teil 3 (feste Pausen ersetzen) erst für einen Test, der wiederholt als Wackler gemeldet wird.

## Ablauf in einem Satz

Ein roter Lauf bricht den Prüflauf nicht mehr sofort ab; am Ende läuft jeder rote Lauf einmal allein (ohne Last) – grün heißt
‚wackelt‘ (gemeldet, der Lauf gilt als grün), wieder rot heißt Fehler; ab dem dritten roten Lauf wird wie bisher abgebrochen.

## Fälle

| Nr. | Lage | Erwartet |
|---|---|---|
| W-1 | alle Läufe grün | wie bisher: ‚Alle N Läufe grün in mm:ss‘, Rückgabe 0, keine Wiederholung |
| W-2 | ein Lauf rot, allein grün | Zeile ‚⚠ wackelt: <Test> · <Browser> (rot unter Last, allein grün)‘ und in der Schlusszeile ‚davon 1 wackelt‘, Rückgabe 0 |
| W-3 | ein Lauf rot, allein wieder rot | Meldungen des zweiten Laufs, Rückgabe 1 |
| W-4 | drei rote Läufe | die übrigen Läufe werden beendet (wie bisher), keine Wiederholung, Rückgabe 1 |
| W-5 | `--alle` | alle Läufe bis zum Ende; rote am Ende einmal allein; Schluss nennt Fehler und Wackler getrennt |
| W-6 | `--gegenprobe` (alle Arten) | keine Wiederholung – rot ist dort gewollt |
| W-7 | Browser fehlt (Rückgabe 2) | keine Wiederholung, Rückgabe 2 wie bisher |
| W-8 | Zeitgrenze (`--zeit`) überschritten | zählt wie rot, wird allein wiederholt |
| W-9 | Wiederholung | läuft erst, wenn alle übrigen Läufe fertig sind (beide Browser), immer nur einer gleichzeitig |
| W-10 | `dauer.json` | die Dauer eines Wiederholungslaufs ersetzt nicht die gemessene Dauer unter Last |
| W-11 | `veroeffentlichen.mjs los` | Wackler stehen in der Zusammenfassung des Skripts; die Version wird trotzdem veröffentlicht |
| W-12 | Bericht (Selbstkontrolle) | Claude nennt jeden Wackler im Bericht und zählt ihn in APD-85 mit; derselbe Test zum zweiten Mal → Teil 3 für diesen Test |

**Bestätigt 30.10.2026** (Nutzer, Sitzung 0055): W-1 bis W-12, Abbruch ab dem dritten roten Lauf; Bau in der nächsten Sitzung.
