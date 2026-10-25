# APD-38 – Auftrag: Analyse Framework7 und Ionic

**Stand 21.10.2026** · Sitzung ‚Reiselogbuch 0027‘ · noch nicht begonnen – wartet auf dein Ja

## 1. Auftrag (so habe ich ihn verstanden)

1. **Framework7** (aktuelle Version 9.2.0) und **Ionic** (Ionic Framework 8, mit Blick auf Capacitor) gründlich analysieren –
   Quelltext und Doku, nicht nur die Tastatur wie in der ersten Auswertung.
2. Daraus eine **Tabelle aller Themen**, die wir in unser allgemeines Regelwerk (AppDesign) übernehmen könnten, mit den Spalten:

| Framework | Thema (kurz) | In AppDesign vorhanden? | Empfehlung |
|---|---|---|---|
| Framework7 oder Ionic (oder beide) | Kurzbeschreibung | ja / nein – bei ja kurz die Abweichungen | übernehmen ja / nein / später – mit kurzer Begründung |

3. Themenbereiche, die ich durchgehe: Leisten und Navigation, Listen (Wischaktionen, Index, lange Listen), Fenster und
   Blätter (Höhenstufen), Menüs und Aktionsblätter, Meldungen (Toast), Eingaben und Auswahlen (Datum, Segmente, Schalter),
   Suche, Antippen und Gesten (Rückmeldung, Zurückwischen, Ziehen zum Aktualisieren), sichere Ränder und Tastatur, Rollen,
   Farben und Dunkelmodus, Schrift, Bewegung und Übergänge, Barrierefreiheit, Leistung, Prüfbarkeit.
4. **Nichts wird geändert:** kein Eintrag ins Backlog, keine Regel, kein Bau. Entschieden wird danach gemeinsam.

## 2. Weitere Punkte für die Entscheidungsgrundlage (mein Vorschlag)

| Nr. | Zusatz | warum |
|---|---|---|
| **Z1** | Zusätzliche Spalte **‚So macht es Apple‘** (HIG bzw. Apple-App) je Thema | unser Maßstab ist Apple (0 Nr. 23), nicht das Framework – ein Thema lohnt nur, wenn es Apple näherkommt |
| **Z2** | Zusätzliche Spalte **Aufwand** (klein / mittel / groß) | zeigt, was sich mit wenig Arbeit lohnt |
| **Z3** | **Gesamtvergleich Framework7 / Ionic** als eigene kurze Tabelle: Technik, Größe, iOS-26-Aussehen, Lizenz, Pflege und Zukunftssicherheit, mit reinem JavaScript nutzbar, Tastatur unter iOS, prüfbar mit unseren Tests | Grundlage für die große Frage ‚Framework ja/nein‘ |
| **Z4** | **Drei Wege nebeneinander bewertet:** a) eigener Code wie heute, b) Mischform (Framework als Unterbau, AppDesign 5), c) echte App mit Capacitor – je Nutzen, Aufwand, Kosten, Risiken; dazu ein Rückblick, wie viele Sitzungen unser eigener Weg bisher für Tastatur und Rollen gekostet hat (aus `VERLAUF.md`) | die eigentliche Entscheidung, mit Zahlen statt Gefühl |
| **Z5** | Kurzer Blick auf **weitere Kandidaten** (z. B. Konsta UI, Onsen UI) | damit wir nichts Besseres übersehen |
| **Z6** | **Barrierefreiheit** als eigener Block (VoiceOver, größere Schrift, ‚Bewegung reduzieren‘) | beide Frameworks bringen viel mit; bei uns vermutlich eine Lücke |

## 3. Vorgehen

- Beide Pakete in ihrer aktuellen Version laden (npm) und den Quelltext lesen, Doku ergänzend – nicht in die Apps einbinden.
- **Zwei Hilfsagenten parallel** (je Framework einer), damit diese Sitzung schlank bleibt (Kontext jetzt etwa 107.000 Token,
  Übergabe ab etwa 150.000); ich gleiche ihre Ergebnisse mit AppDesign (`v4/design.css`, `v4/ui.js`, Regelkatalog) ab und prüfe
  jede Aussage über AppDesign selbst nach.
- Ergebnis: `arbeit/APD-38 Framework-Vergleich.html` (Tabelle, Z1–Z6) und eine Zusammenfassung im Chat; danach gehen wir die
  Empfehlungen gemeinsam durch – in dieser oder, wenn die Grenze erreicht ist, in der nächsten Sitzung.
