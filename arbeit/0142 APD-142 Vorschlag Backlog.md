# Vorschlag: neues Thema APD-142 (aus APD-135/J-32)

**Stand 19.11.2026** · Sitzung 0142 · Grundlage: `arbeit/0123 Entscheidungen APD-135.md` (J-32: „als eigenes Thema ins Backlog, nach B-3“) und
`arbeit/APD-135 Befund U Bausteine ui.js.md` (U-14 bis U-25)

## Eintrag im Backlog AppDesign, Abschnitt 2 (Wortlaut)

> | APD-142 | 2 | **Allgemeines aus der App nach AppDesign (aus APD-135/J-32, Sitzung 0123; übernommen Sitzung 0142):** was im Reiselogbuch
> (`index.html`, `sw.js`) steht, aber jede weitere App gleich bräuchte, wandert nach AppDesign (als AD-Bean nach R-1.13, mit Katalogeintrag) – laut
> Befund APD-135/U-25 rund 450 Zeilen, davon rund 175 eindeutig: Versionsprüfung beim Start (U-14), Seitenleiste/Startliste (U-15), beide Suchzeilen
> (U-16), Mehr-Menü der Seitenleiste (U-17), Backup-Ablauf (U-18), Ausgabe/PDF (U-19), Start und Umgebung (U-20), `sw.js` als Basis (U-21), Kopfzeile
> (U-22), Kleineres (U-23), allgemeines CSS (U-24); Reihenfolge nach APD-135/B-3; je Schritt eine Version mit Gegenprobe | allgemein | offen |

## So macht es Apple

Laut Apple-Abgleich aus 0141 (`arbeit/0141 APD-140 Muster.md`, Quelle UIKit Catalog) liegen die Bausteine in UIKit, und jede App nutzt sie nur über die
Schnittstelle. Das entspricht R-1.13 und R-1.14: In der App steht nur, was zur App gehört.

## Priorität – Empfehlung 2 (mittel)

- Das Thema ist groß, und J-32 hat es ausdrücklich **nach B-3** gelegt. B-3.3 kommt jetzt erst mit 4.65.0.
- Fehler oder Wünsche des Nutzers hängen nicht davon ab.
- Es ist aber die Voraussetzung für jede zweite App. Darum nicht 3.
