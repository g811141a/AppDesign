# Bericht – ReiseLogBuch-Import 1.4.0 (APD-135 Paket 2)

**18.11.2026** · Sitzung 0132

## Bericht

ReiseLogBuch-Import 1.4.0 ist hochgeladen (`main` 2ec7d03), dazu die AppDesign-`CLAUDE.md` 2.14.0 (`main` f2ebd93, Pages ‚success‘). Die nächste
Konvertierung kann Kilometer und Quartierpreis in die Felder `km` und `price` übernehmen. Das Werkzeug prüft beide (RLB-5/F-23, F-24) und bricht ohne
`--zone` ab, statt Wien anzunehmen. Die Anleitungen verweisen auf die Zusammenarbeit statt sie zu wiederholen. Die App und die feste Fassung sind unverändert.

## Alle Änderungen

1. Import `CLAUDE.md` 1.2.0: Startfrage nur als Verweis auf 0 Nr. 19 (APD-135/W-16); Verweis auf die ganze Zusammenarbeit mit dem Kasten; Repos dazuholen wie
   in der AppDesign-`CLAUDE.md`, nur lesen (I-2); Prüfen mit `--zone`, sonst Abbruch (W-29).
2. Import `PROMPT.md` 1.4.0: JSON-Muster mit `kmColumn`, `priceOn`, `km`, `price`; neuer Absatz ‚Kilometer und Quartierpreis‘; zwei neue Zeilen in der
   Zuordnung, ‚Kilometer‘ nicht mehr Kachelfrage (J-13); Fenster nach 2.1, die wichtigsten 4 Fragen zuerst (J-33); Format ‚Stand bei Reiselogbuch 3.57.4‘;
   Herkunft mit `arbeit/RLB-5 Brainstorming.md`; Testfall 4 mit dem Abgleich-Text von 4.61.0 (W-30); keine eigene Versionsgeschichte (J-35).
3. `werkzeug/pruefen.mjs`: ohne `--zone` Abbruch (J-34); `leseFormat` liest auch `next.x =`; neue Fälle RLB-5/F-23 (Kilometer 0,1–99,9, eine
   Nachkommastelle, `kmColumn`) und RLB-5/F-24 (Preis als Zahl nur am ersten Tag eines Aufenthalts, `priceOn`); Selbsttest mit Abbruch-Probe und 7 Gegenproben.
4. `werkzeug/beispiel.json`: Beispielreise mit `km` 12,5 und `price` 89.
5. Import `README.md` 1.4.0: Versionsgeschichte; ‚Geprüft mit‘ Reiselogbuch 3.57.4, AppDesign 4.61.0.
6. AppDesign-`CLAUDE.md` 2.14.0: W-19 – Satz zu ReiseLogBuch-Import verweist auf dessen `CLAUDE.md` und `PROMPT.md`; Zeile in `CLAUDE Versionsgeschichte.md`.
7. AppDesign-Backlog: APD-135 ‚Paket 2 gebaut‘, Zeile unter ‚Erledigt‘; Usertest P-111 ok in beiden Backlogs (Sitzung 0132).

## Prüfungen

- Vorher rot: Selbsttest mit den neuen Fällen 12 Meldungen (Q-1 bis Q-9).
- Nachher: `pruefen.mjs --selbsttest` **grün** (Format aus Reiselogbuch 3.57.4, RLB-5/F-1 bis F-24, I-2, I-8, I-9, I-13); ohne `--zone` Abbruch mit Rückgabe 2.
- Stufe Text: doku-regeln, version-regeln, text-regeln in Chromium und WebKit – **6 Läufe grün in 02:26**.
- Q-11 Selbstkontrolle: keiner der alten Sätze steht mehr in `CLAUDE.md`, `PROMPT.md`, `pruefen.mjs`.
- Apple-Review: entfällt – die App ändert sich nicht.

## Offene Usertests

Keine. P-111 ist ok; für Import 1.4.0 gibt es keinen Usertest (die App bleibt unverändert, eine Konvertierung prüfst du nach `PROMPT.md` Abschnitt 8, wenn du
wieder eine Unterlage bringst).

## Wie weiter

- Nächstes Paket: **APD-135 Paket 4** (Doppeltext der Designrichtlinie, Grundsatz und alle 12 Paare in einer Version, J-21) – Wortlaut aus Befund D vorlegen.
- Kontext jetzt 231.520; Paket 4 ist umfangreich (12 Absatzpaare), die Übergabe bei ~300.000 käme mitten im Wortlaut. Darum empfehle ich die Übergabe
  jetzt (0 Nr. 13: Thema abgeschlossen → Übergabe vorschlagen).
