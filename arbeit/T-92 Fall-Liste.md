# T-92 / A-19 – Suche über alle Reiselogbücher: Fall-Liste

Stand 17.10.2026 · Sitzung Reiselogbuch 0011 · Variante C, **Lupe in der Kopfzeile**, Zählung **je Fundstelle**
(Zusammenarbeit 0 Nr. 1: jeder Fall wird ein automatischer Test; was nur das Gerät zeigt, kommt in die Prüfliste)

## Ablauf in einem Satz

Lupe in der Kopfzeile der Seitenleiste bzw. Startliste → Suchzeile darunter (Aussehen wie 15.2, ohne ⌃ ⌄) → beim Tippen
bleiben nur Reiselogbücher mit Treffer stehen, jede Kachel zeigt ‚12 Treffer‘ statt ‚geändert am …‘ → Antippen öffnet
das Reiselogbuch mit gefüllter Suche, erster Treffer markiert, ‚1 von 12‘ → zurück: die Liste ist noch gefiltert, bis
ⓧ oder die Lupe die Suche beendet.

## Fälle

| Nr. | Gerät / Lage | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| F-1 | iPad quer (Seitenleiste angedockt) | Lupe antippen | 3 Reiselogbücher | Suchzeile unter ‚Reiselogbücher‘, Feld hat den Fokus, Lupe ‚on‘; Liste unverändert, solange das Feld leer ist |
| F-2 | iPad quer | ‚Paella‘ tippen | Treffer in 2 von 3 | 2 Kacheln, je ‚N Treffer‘; Untertitel ‚2 von 3 Reiselogbüchern‘ |
| F-3 | alle | Kachelzahl prüfen | Begriff 3× an einem Tag, auch in Essen und Quartier | Zahl auf der Kachel = ‚von N‘ nach dem Öffnen (gleiche Zählung wie `hitMarks`, auch bei ausgeblendeten Spalten) |
| F-4 | alle | Kachel antippen | – | Reiselogbuch öffnet mit Suchzeile, Begriff gefüllt, ‚1 von N‘, erster Treffer hellorange und unter die Leiste gerollt (R-7.4 gilt dann nicht) |
| F-5 | iPhone hoch (Startliste) | Antippen, dann ‚Zurück‘ | – | Startliste wieder gefiltert, Begriff im Feld, Position der Liste erhalten (`keepSideScroll`) |
| F-6 | alle | ⓧ in der Suchzeile der Liste | – | Begriff weg, alle Kacheln und ‚geändert am …‘ wieder da, Suchzeile bleibt offen |
| F-7 | alle | Lupe erneut antippen | – | Suchzeile zu, Begriff gelöscht, Liste vollständig |
| F-8 | alle | Begriff ohne Treffer | 3 Reiselogbücher | Hinweis ‚Keine Treffer‘ statt der Kacheln, Untertitel ‚0 von 3 Reiselogbüchern‘ |
| F-9 | alle | Groß/klein, Umlaute | ‚paella‘ / ‚PAELLA‘, ‚Größe‘ | gleiche Treffer wie die Suche im Reiselogbuch (`toLocaleLowerCase('de')`) |
| F-10 | alle | Suche bei leerer Liste | 0 Reiselogbücher | keine Lupe (nichts zu durchsuchen) |
| F-11 | alle | viele Reiselogbücher | 30 Reiselogbücher, langer Text | Tippen bleibt flüssig (Zählung je Tastendruck unter 50 ms) |
| F-12 | alle | Backup-Kachel unten | Suche aktiv | Backup-Kachel bleibt stehen (entschieden, Frage 2) |
| F-13 | iPad quer | Suche in der Liste, rechts ist ein Reiselogbuch offen | – | rechts bleibt alles unverändert; erst Antippen einer Kachel übergibt den Begriff (entschieden, Frage 1) |
| F-14 | iPad hoch / schmales Fenster (Seitenleiste überlagernd) | Kachel antippen | – | Seitenleiste schließt, Reiselogbuch mit gefüllter Suche (wie F-4) |
| F-15 | iPad | Drehen mit offener Suchzeile | Begriff gefüllt | Begriff und Filter bleiben, Fokus nur, wenn er vorher im Feld war |
| F-16 | iPad / iPhone | Tastatur ‚Suchen‘-Taste (Eingabetaste) | – | schließt die Tastatur, nichts wird geöffnet (R-5.5) |
| F-17 | alle | hell / dunkel | – | Suchzeile und ‚N Treffer‘ in beiden Darstellungen lesbar (Grundregeln) |
| F-18 | alle | Abgleich (iCloud) ändert ein Reiselogbuch während der Suche | – | Liste und Zahlen neu, Begriff bleibt |
| F-19 | alle | Neuladen der Seite | Suche aktiv | Suche beginnt leer (wie im Reiselogbuch, nichts gespeichert) |
| F-20 | alle | Begriff im Reiselogbuch ändern, dann zurück | ‚Paella‘ → ‚Tapas‘ | Liste ist nach ‚Tapas‘ gefiltert – ein Begriff für beide Suchen (entschieden, Frage 3) |

## Nur am Gerät (Prüfliste)

- Lupe, Suchzeile und Tastatur in Safari am iPad und iPhone (Fokus öffnet die Tastatur, Seite rollt nicht weg).
- Gefühl beim Tippen mit vielen echten Reiselogbüchern.

## Fragen (alle entschieden 17.10.2026, jeweils die Empfehlung; Bau freigegeben)

1. **iPad, Reiselogbuch rechts offen (F-13):** Übernimmt das offene Reiselogbuch den Begriff sofort (eigene Suchzeile
   geht auf) oder erst, wenn man eine Kachel antippt? **Empfehlung: erst beim Antippen**; rechts bleibt alles, wie es ist.
2. **Backup-Kachel während der Suche (F-12):** **Empfehlung: bleibt stehen**, die Erinnerung soll nicht verschwinden.
3. **Begriff drinnen geändert (F-20):** Übernimmt die Liste den neuen Begriff? **Empfehlung: ja**, ein Begriff für beide
   Suchen, so wie in Notizen.

## Allgemeine Regel (AppDesign A-19)

Erweiterung von R-2.3 und Komponenten 15.2/15.4: ‚Lupe in der Kopfzeile der zentralen Liste öffnet eine Suchzeile; sie
filtert die Einträge, jede Kachel zeigt die Trefferzahl je Fundstelle, Öffnen übergibt den Begriff an die Suche im
Eintrag.‘ Damit ist es eine AppDesign-Version (4.23.0) plus eine Reiselogbuch-Version (3.21.0, hebt auf Fassung 4.23.0 –
Rückfrage nach 0 Nr. 10).
