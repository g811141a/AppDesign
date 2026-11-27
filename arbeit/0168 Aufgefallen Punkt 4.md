# Aufgefallen, Punkt 4 – Zurückwischen am iPhone wirkt in der Vorschau nicht

**27.11.2026 · Sitzung 0168** · aus `arbeit/0167 Bericht 4.71.0 – 3.59.0.md`

Punkt 3 ist entschieden: APD-154 kommt in die Version nach der Korrekturversion. Offen ist noch die Priorität, die Frage steht im Fenster.

## Befund (belegt)

- **Code:** `navKandidat` (`v4/ui.js:2899`) gibt am iPhone das Zurückwischen ab, sobald der Finger in einem waagrecht rollenden Bereich aufsetzt (`navEigenesRollen`, `v4/ui.js:2893`). Das gilt **auch am linken Rand**.
  - Die Vorschau eines gelöschten bzw. gesperrten Reiselogbuchs ist 960 px breit und rollt seitlich.
  - Zurückwischen geht deshalb dort nur über den Hinweis oben. Unten bleibt nur ‹.
- **So entschieden in RLB-125:** RLB-125/T-11 heißt ‚seitlich wischen nur in der Seite‘. Usertest P-120/5 war ok.
  - `ablauf-zuletzt-geloescht` wischt deshalb auf dem Hinweis (RLB-126/T-4).
- **Betroffen ist jeder seitlich rollende Bereich am iPhone,** z. B. auch die Reisemittel-Zeile und breite Tabellen.

## So macht es Apple

Das weiß ich nicht belegt, ich habe in dieser Sitzung keine Quelle dazu gelesen.
- **Vermutung:** In iOS beginnt das Zurückwischen am linken Bildschirmrand und geht auch über seitlich rollendem Inhalt. Weiter innen gehört das Wischen dem Inhalt.
- Vor einem Muster käme der Apple-Abgleich mit Quelle (0 Nr. 23). Dafür nehme ich einen Hilfsagenten mit Opus 5.5, Aufwand hoch.

## Möglichkeiten

- **a) Ins Backlog als APD-155 (allgemein), Priorität 2 (Empfohlen):**
  - Ziel: Zurückwischen vom linken Rand geht auch über seitlich rollendem Inhalt, weiter innen rollt der Inhalt.
  - Vorher Apple-Abgleich mit Quelle, Messung am Gerät nur wenn nötig (0 Nr. 20), Testfall-Liste. Gebaut wird erst nach eigener Bau-Frage.
  - **Grund:** Am iPhone ist das Zurückwischen die gewohnte Geste. Die Lücke betrifft jede App mit breiten Inhalten.
- **b) Lassen wie entschieden (RLB-125/T-11):** ‹ und der Hinweis genügen.
