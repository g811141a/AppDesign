# RLB-114 – Testfall-Liste

Stand 31.10.2026 · Sitzung Reiselogbuch 0063 · Muster nur hell (Vereinbarung 30.10.2026). In der Liste der Reiselogbücher (iPad
Seitenleiste, iPhone Startliste) steht über jeder Gruppe eine Überschrift mit dem Jahr. Geklärt (Nutzer 31.10.2026): **Jahr des
Reisebeginns** · **auch über dem obersten** · bei der Suche **nur Jahre mit Treffern** · **rollt mit** (nicht haftend, APD-46 bleibt
später) · Aussehen **Variante A2**: genau wie die Leistenüberschrift ‚Reiselogbücher‘ (Title 3 `--tb-title3`, fett, Textfarbe, wächst
mit der Textgröße).

Muster: AppDesign `arbeit/bilder/RLB-114 1 heute iPad quer.png`, `… 4 Variante A2 wie Leistenueberschrift iPad quer.png`,
`… 5 Variante A2 iPad hoch.png`, `… 6 Variante A2 iPhone hoch.png` (A und B verworfen).

## Ablauf in einem Satz

Die Liste bleibt nach Reisebeginn absteigend sortiert; vor dem ersten Reiselogbuch jedes Jahres steht das Jahr als Überschrift, auch
ganz oben – eine Reise über Silvester steht unter dem Jahr, in dem sie beginnt.

## So macht es Apple

Notizen (iPhone, `apple-referenz/iphone/notizen/notizen-06-notizliste.png`): über jeder Gruppe eine eigene Überschrift, kräftig,
groß, schwarz, linksbündig (‚Pinned‘, ‚Notes‘), auch über der ersten Gruppe; darunter die Einträge. Ob Notizen ältere Einträge nach
Jahren gruppiert, zeigt das Bild nicht.

## Y – Testfälle (automatisch)

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| Y-1 | iPad quer und hoch, iPhone hoch und quer; hell und dunkel | Liste ansehen | 7 Reiselogbücher 2024–2027, eins über Silvester (27.12.2025–04.01.2026) | Köpfe ‚2027‘ · ‚2026‘ · ‚2025‘ · ‚2024‘ in dieser Reihenfolge, je direkt vor dem ersten Reiselogbuch des Jahres; der erste Kopf steht über dem obersten; ‚Silvester in Lissabon‘ unter ‚2025‘ |
| Y-2 | alle; hell und dunkel | Kopf mit Leistenüberschrift vergleichen | wie Y-1 | Schriftgröße, Stärke, Farbe und Schrift gleich wie `.side-head h2` |
| Y-3 | iPad hoch, iPhone hoch; größte Textgröße (`ts-gross`) | Liste ansehen | wie Y-1 | Kopf wächst wie `.side-head h2`, steht ganz in der Liste, nichts überlappt (Grundregeln `pruefe.mjs`) |
| Y-4 | iPad quer, iPhone hoch | Suche in der Liste: Treffer in einem Jahr, in zwei Jahren, keine Treffer; Suche leeren | wie Y-1 | nur Köpfe der Jahre mit Treffern; keine Treffer → kein Kopf, Text ‚Keine Treffer‘ wie bisher; nach dem Leeren wieder alle Köpfe |
| Y-5 | alle | Liste ansehen | ein Reiselogbuch · zwei im selben Jahr · keins | ein Kopf · ein Kopf · kein Kopf (Leertext wie bisher) |
| Y-6 | iPad quer, iPhone hoch | Liste rollen | 20 Reiselogbücher über 6 Jahre | Köpfe rollen mit (haften nicht) und laufen unter dem Kopf und hinter der Backup-Kachel durch (R-7.1) |
| Y-7 | iPad quer ↔ hoch, iPhone hoch ↔ quer | drehen, Seitenleiste aus und ein (panel-left) | wie Y-6, etwas gerollt | oberster Eintrag der Liste bleibt; das aktuelle Reiselogbuch bleibt sichtbar und als einziges blau (R-7.1) |
| Y-8 | iPad quer | neues Reiselogbuch in einem neuen Jahr anlegen; Beginn eines Reiselogbuchs in ein anderes Jahr verschieben; das letzte eines Jahres löschen | wie Y-1 | neuer Kopf erscheint · Reiselogbuch steht unter dem neuen Jahr · Kopf verschwindet |
| Y-9 | iPad quer, iPhone hoch | Kopf antippen und lange drücken | wie Y-1 | nichts geschieht (kein Öffnen, kein Kontextmenü); Kachel lange drücken zeigt weiter das Kontextmenü |
| Y-10 | alle | Barrierefreiheit | wie Y-1 | Kopf ist eine Überschrift (Rolle heading), Text nur das Jahr; Kacheln bleiben Schaltflächen |
| Y-11 | iPad und iPhone | Abgleich bringt ein Reiselogbuch eines anderen Jahres | Gerät A 2026, Gerät B 2023 | nach dem Abgleich auf beiden Geräten Kopf ‚2023‘ |
| Y-12 | iPad quer | Gegenprobe: oberster Kopf fehlt · Jahr des Endes statt Beginns · Kopf halbfett | wie Y-1 | Y-1 bzw. Y-2 werden rot |

Dazu: Prüfungen, die heute die Kinder von `.side-list` zählen oder die erste Zeile erwarten, auf `.side-row` umstellen bzw. die Köpfe
einrechnen; `PROMPT.md` (Seitenleiste bzw. Startliste) nachziehen.

## Testfälle (User), nur am Gerät

- iPad quer und hoch, iPhone hoch: die Köpfe ansehen (Abstand, Wirkung neben der Leistenüberschrift).
- iPhone hoch mit größter Textgröße: Köpfe wachsen mit und stehen ganz.
- Liste mit vielen Reiselogbüchern rollen: Köpfe rollen ruhig mit.
