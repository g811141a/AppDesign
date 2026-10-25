# 2/12 · T-3 Inhalt unter durchscheinender Leiste

## Zeile aus der Auswertung (`arbeit/APD-38 Framework-Vergleich.html`)

| Spalte | Inhalt |
|---|---|
| Nr. | T-3 (Bereich: Leisten und Navigation) |
| Framework | Framework7, Ionic |
| Thema | **Inhalt unter durchscheinender Leiste.** Die Leiste ist aus Glas; der Inhalt läuft sichtbar und unscharf darunter durch. *Quelle: Framework7: navbar.js snapPageScrollToTransparentNavbar, Glas-Variablen in framework7-bundle.css · Ionic: ion-header translucent, ion-content fullscreen* |
| So macht es Apple | iOS 26 lässt Inhalt unter die Glas-Leisten laufen und blendet ihn am Rand weich aus. |
| In AppDesign | **nein** – Bewusst nicht: deckende Leiste, Haarlinie erst nach dem Rollen, Glas-Leiste verworfen. *Beleg: README - Designrichtlinie allgemein.md:45, :486, v4/design.css:170, v4/ui.js:1127* |
| Aufwand | mittel – alle Leisten und Prüfungen anpassen |
| Empfehlung | **nicht übernehmen** – Feste Vorgabe: kein Inhalt unter durchscheinenden Leisten. *Hinweis: Die Abweichung von iOS 26 fehlt in der Tabelle ‚Bewusste Abweichungen‘ (README - Designrichtlinie allgemein.md:856-861) – nachtragen.* |

## Neue Einschätzung (zukunftsfit): **geändert auf Ja, ins Backlog**

- Liquid Glass ist Apples Richtung für die nächsten Jahre; mit deckenden Leisten wirkt die App mit der Zeit veraltet.
- Dein Einwand (Lesbarkeit, keine Fragmente über dem Titel) löst iOS 26 mit weichem Ausblenden am Rand.
- Die heutige Festlegung bleibt, bis ein Muster am Gerät zeigt, ob es lesbar ist. Bei Nein trage ich die Abweichung in
  ‚Bewusste Abweichungen‘ nach.
