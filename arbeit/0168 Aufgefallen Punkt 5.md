# Aufgefallen, Punkt 5 – iPad hoch mit Seitenleiste: Breiten in ‚Zuletzt gelöscht‘

**27.11.2026 · Sitzung 0168** · aus `arbeit/0167 Bericht 4.71.0 – 3.59.0.md`

APD-154 (Priorität 1) und APD-155 (Priorität 2) stehen im Backlog (`5f42ff7`).

## Gemessen (Chromium, Reiselogbuch 3.59.0, ein gelöschtes Reiselogbuch, Seitenleiste ein)

| Ansicht | Seitenleiste | Inhalt | Hinweis (Textspalte) | Zeilen des Hinweises (13 Wörter) |
|---|---|---|---|---|
| iPad hoch, ‚Reiselogbücher‘ | 353 px | 453 px | – | – |
| iPad hoch, ‚Zuletzt gelöscht‘, Standardschrift | **340 px** | 466 px | 434 px (Text 372) | 3 |
| dto., Schrift 23 px | 420 px | 386 px | 354 px (Text 324) | 5 |
| dto., Schrift 36 px | 420 px | 386 px | 354 px (Text 324) | 6 |
| iPad quer, ‚Zuletzt gelöscht‘ | **340 px** | 826 px | 794 px | 2 |
| iPad quer, ‚Reiselogbücher‘ | 353 px | 813 px | – | – |

- **Seitenleiste springt um 13 px:** Sie ist `width: max-content` zwischen 340 und 420 px (`v4/design.css:341`), richtet sich also nach ihrem Inhalt. ‚Zuletzt gelöscht‘ hat schmaleren Inhalt und fällt auf die Mindestbreite 340 px zurück.
  - Das passiert hoch und quer. RLB-126/T-3 prüft nur ‚nicht breiter‘.
- **Umbruch des Hinweises:** Bei Standardschrift sind es 3 Zeilen. Mit wachsender Schrift werden es mehr, bei 36 px 6 Zeilen. Die größte Stufe (53 px) habe ich nicht gemessen.
  - Das ist das Mitwachsen nach R-6.3 (Dynamic Type), kein Abschneiden.
- **So macht es Apple:** nicht belegt.
  - **Vermutung:** In Notizen und Dateien bleibt die Seitenleiste beim Wechsel in einen Ordner gleich breit.

## Möglichkeiten

- **a) Seitenleiste behält ihre Breite (Empfohlen), als APD-156 mit Priorität 3, allgemein:**
  - Beim Wechsel nach ‚Zuletzt gelöscht‘ und zurück bleibt die Breite der Liste. Den Umbruch lasse ich, er ist Mitwachsen nach R-6.3.
  - Vorher kommen Apple-Abgleich mit Quelle und Testfall-Liste.
  - **Grund:** Ein Sprung der Seitenleiste ist unruhig. Die Ursache sitzt in AppDesign (`#side` mit `max-content`), also allgemein.
- **b) Beides lassen:** Die Breite nach Inhalt ist so gewollt (Designrichtlinie, ‚B3‘).
