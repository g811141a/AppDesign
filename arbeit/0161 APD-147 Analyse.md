# APD-147 – Warum der Versionsbau so lange dauert (Analyse, Sitzung 0161)

**26.11.2026** · nur Analyse, keine Änderung · Quelle: Protokoll des ersten vollen Laufs von 4.70.1 / 3.58.4 (abgebrochen nach 52:23, 128 von 192 Läufen fertig)

## Was schon im Backlog steht (APD-147, Reihenfolge vom 23.11.2026)

1. messen · 2. e) Browser je Prozess wiederverwenden · 3. d) feiner wählen, was läuft · 4. a) GitHub Actions (Chromium und WebKit gleichzeitig) · später b), c), f).

## Messung (Schritt 1, aus diesem Lauf)

| Wert | Zahl |
|---|---|
| Dauer bisheriger voller Läufe | 86 min (0157) · 83:25 (0159) |
| dieser Lauf bis zum Abbruch | 52:23 für 128 Läufe |
| Summe aller Laufzeiten | 202 min (Chromium 97 Läufe / 157 min, WebKit 31 Läufe / 45 min) |
| genutzte Kerne im Schnitt | 202 ÷ 52 ≈ **3,9 von 4** – die Maschine ist voll ausgelastet |
| feste Wartezeiten im Prüfcode | **686** Aufrufe `waitForTimeout` (App-Prüfungen und AppDesign-Fassung) |

**Größte Blöcke** (alle Teile, Sekunden, bisher meist nur Chromium):

| Prüfung | s |
|---|---|
| `hig` | **1.662** (≈ 28 min – mit Abstand die größte) |
| `ablauf-wischen` | 772 |
| `bausteine-pruefseite` | 760 |
| `ablauf-navigation` | 753 |
| `ablauf-blatt` | 629 |
| `ablauf-suche-woerter` | 493 |
| `ablauf-feld-rollen` | 485 |

## Was diesmal am meisten Zeit gekostet hat

**Ein roter Lauf.** Zwei Prüfungen (`regeln-ablauf`, die Gegenprobe in `ablauf-gesamt` in WebKit) waren nicht an die Änderung angepasst. Das zeigte sich erst nach 52 min, danach kommt noch einmal der ganze Lauf (≈ 75–85 min). Einzeln liefen die drei roten Prüfungen in rund 4 min. In 0160 waren die betroffenen Prüfungen nur in Chromium gelaufen.

## Folgerungen

- Die 4 Kerne sind voll. Mehr Gleichzeitigkeit auf dieser Maschine bringt nichts. Schneller wird es nur mit **weniger Arbeit** (Wartezeiten, Browserstarts, Auswahl) oder **mehr Maschinen** (GitHub Actions).
- Der größte vermeidbare Verlust sind **rote Läufe**. Ein Fehler nach 50 min kostet fast einen zweiten vollen Lauf.

## Mögliche Maßnahmen (Vorschlag, noch nichts umgesetzt)

| Nr. | Maßnahme | Wirkung (Vermutung) | berührt |
|---|---|---|---|
| APD-147/M-1 | **Vorprüfung vor `los`:** die von der Änderung betroffenen Prüfungen (Dateien, die geänderte Funktionen oder Selektoren nennen) einmal in Chromium **und** WebKit, rund 5–10 min | spart bei einem Fehler rund 50–80 min | 0 Nr. 2 (‚nicht zusätzlich vorher‘) – Wortlaut nach 0 Nr. 29 |
| APD-147/M-2 | **`hig.mjs` zuerst untersuchen:** ≈ 28 min, größter Block – messen, welche Ansicht und welcher Schritt die Zeit braucht | Vermutung: deutlicher Anteil am Ganzen | nur Prüfcode |
| APD-147/M-3 | **Feste Wartezeiten ersetzen:** `waitForTimeout` durch Warten auf einen Zustand (wie `bis(…)` schon heute), Datei für Datei mit Gegenprobe | jede Wartezeit läuft heute in jedem Schritt voll ab | nur Prüfcode, Gegenprobe nötig |
| (schon im Backlog) | e) Browser wiederverwenden · d) feiner wählen · a) GitHub Actions | a) ist der einzige Weg zu mehr Kernen | wie im Backlog |

## Frage

Welche der Maßnahmen APD-147/M-1 bis M-3 soll ins Backlog (als Ergänzung zu APD-147)?
