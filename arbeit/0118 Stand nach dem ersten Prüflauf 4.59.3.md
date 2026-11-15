# Stand nach dem ersten Prüflauf – AppDesign 4.59.3 mit Reiselogbuch 3.56.3

**Stand 15.11.2026** · Sitzung ‚Reiselogbuch 0118‘ · **nichts veröffentlicht** – beide Versionen liegen fertig gebaut auf den Zweigen
`vorbereitung-4.59.3` (AppDesign) und `vorbereitung-3.56.3` (Reiselogbuch) auf GitHub.

## Prüflauf (voll)

- 158 Läufe, Abbruch nach 68:24 beim dritten roten Lauf; 154 grün, 3 rot, nichts veröffentlicht.
- Veröffentlicht sind weiter Reiselogbuch 3.56.2 und AppDesign 4.59.2.

| Roter Lauf | Meldung | Befund |
|---|---|---|
| `kontextmenue-regeln` (iPad) · WebKit | Kontextmenü nicht linksbündig, weder unter noch über der Kachel | Wackler: dieselbe feste Pause wie in APD-85 Teil 6, aber in AppDesign `tests/kontextmenue.mjs` – der Befund aus 0115 hatte die Stelle übersehen. **Behoben** mit `langDruecken`; danach allein grün (Chromium und WebKit). |
| `kapsel-iphone` · Chromium | Abbruch: Rollbereich fehlt beim ersten Messen des Schnellroll-Griffs | Einmal im vollen Lauf; allein danach 5-mal grün. Ursache nicht gefunden. `checkGriff` wartet jetzt bis zu 5 s auf den Rollbereich und meldet sonst klar. (Meine ersten drei ‚roten‘ Einzelläufe waren ein Fehler von mir: Zeitgrenze kürzer als die Laufzeit.) |
| `ablauf-seitenleiste-hoch` · WebKit | APD-97/L-6: nach dem Drehen kein oberster Tag | **Kein reiner Wackler der Prüfung** – siehe unten. |

## Offener Befund: nach dem Drehen steht der Inhalt am Ende (WebKit der Prüfumgebung, unter Last)

- Ablauf der Prüfung: iPad hoch, Reiselogbuch ‚Australien‘, oberster Tag 20.08.; drehen hoch → 1000×1000 (80 ms) → quer, dann zurück nach hoch.
- Gemessen (4 Läufe gleichzeitig, 3 Runden): **10 von 12 Läufen rot**. Auch nach 3 s Warten steht der Rollbereich ganz am Ende
  (quer: Rollstand 2574 von 3329 − 755; hoch: 5511 von 6626 − 1115) – alle 30 Tage liegen über dem Bild, zu sehen sind nur Fazit und Quartierliste.
- Allein lief die Prüfung 2 von 3-mal grün; in Chromium grün.
- Das gab es schon vor dieser Version (‚wackelte schon in 0111‘, Befund APD-85 Teil 6) – es kommt nicht von 4.59.3.
- **Vermutung:** die App stellt nach dem Drehen den obersten Eintrag wieder her; kommt die Zwischengröße unter Last zur falschen Zeit, landet
  sie am Ende. Ob das am Gerät auftreten kann, weiß ich nicht – dort wurde es bisher nicht gemeldet.
- Das zu klären heißt: Ursache in `ui.js` suchen (R-8.1). Das ist ein eigenes Thema und nicht Teil der bestätigten Version.

## Was in den Zweigen steht (gebaut, einzeln geprüft)

- APD-85 Teil 6: `langDruecken`, `menueZu`, `ruhe()` meldet; 8 Prüfungen im Reiselogbuch und `kontextmenue.mjs` umgestellt.
- APD-132: `checkSchema`; Gegenprobe rot.
- APD-131: Wortlaut V-1 bis V-4 eingetragen.
- APD-54: `esc()` an beiden Stellen, `normalize` nur mit Emoji-Schlüsseln, `tests/ablauf-fremdtext.mjs` (Chromium und WebKit grün, gegen 3.56.2 rot).
- CHANGELOG mit Testfällen P-106, Backlogs, `tests/README.md`.
- Nicht gelaufen: Gegenprobe APD-85/F-4, Lastnachweis F-7 und F-8.

## Kontext

Der Kontext steht bei 394.840 – die Übergabe ist fällig. Ein weiterer voller Lauf dauert etwa 70 min.

## Möglichkeiten

- **a) Übergabe jetzt, nächste Sitzung klärt das Drehen und veröffentlicht dann (Empfohlen):** die Version bleibt auf den Zweigen; die
  nächste Sitzung sucht die Ursache mit frischem Kontext, legt dir den Befund vor und startet danach den Prüflauf.
- **b) Jetzt noch einmal `los`:** die zwei behobenen Wackler sind weg; bleibt `ablauf-seitenleiste-hoch` allein rot, bricht der Lauf wieder
  ohne Veröffentlichung ab (gemessen unter Last 10 von 12 rot, allein 1 von 3).
