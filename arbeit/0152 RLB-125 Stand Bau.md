# RLB-125 – Stand des Baus (Sitzung 0152)

Stand 22.11.2026 · Reiselogbuch 3.58.0 / AppDesign 4.68.0 · **nichts veröffentlicht** – alles auf den Zweigen `vorbereitung-3.58.0` (ReiseLogBuch) und
`vorbereitung-4.68.0` (AppDesign), beide hochgeladen.

## Fertig gebaut

- **AppDesign:** `createSync` mit `protect` (Fall 23, beide Richtungen), ‚Ersetzen‘ nennt die gesperrten, Icons `lock`/`lock-open`, `choosePop` in der
  Schnittstelle (R-1.14), R-4.14 (neuer Wortlaut, RLB-125/J-12), 15.18 (‚Technisch‘, Fälle 21–23), R-9.3; Prüfungen: `abgleich.mjs` (Fälle 21–23 mit Gegenprobe),
  Prüfseite Teil `menue` (R-4.14 mit Gegenprobe), `hig.mjs` (Ausgabe-Tabellen `.rt` nach R-6.2), `checkWischen` je Zahl der Kapseln.
- **Reiselogbuch:** Sperren/Entsperren (Kontextmenü, Wischen, Mehr), Schloss vor dem Titel, gesperrt nur die Vorschau-Seite mit Hinweis, iPhone hoch 960 px,
  Kontextmenü und Wischen gesperrt nur ‚Entsperren‘, Lösch-Abfrage L-4/L-5, Backup und `normalize`; neue Prüfung `ablauf-sperre` (mit Gegenprobe).
- CHANGELOG beider Repos (Testfälle P-120), Backlogs, Versionsgeschichten.

## Geprüft (während der Arbeit, nur die betroffenen)

Grün in Chromium **und** WebKit: `ablauf-sperre`, `ablauf-wischen` (iPad, iPhone), `kontextmenue-regeln (iPad)`, `regeln-ablauf`.
Grün in Chromium: `abgleich-regeln` (Gegenprobe Fall 23 rot), `bausteine-pruefseite` Teil `menue` (Gegenprobe rot), `doku-regeln`, `schnittstelle-regeln`,
`version-regeln`, `ablauf-abgleich`, `ablauf-abgleich-faelle`, `ablauf-abgleich-ui`, `ablauf-fremdtext`, `ablauf-markierung-menues`, `backup-regeln`,
`ablauf-verwerfen-abgleich`. Angepasst und noch nicht wieder gelaufen: `ablauf-gesamt`, `ablauf-einstellen`, `ablauf-preis-km`, `ablauf-seitenleiste-kontextmenue`,
`ablauf-texte-ablaeufe` (Sollwerte mit ‚Reiselogbuch sperren‘).

## Offen – rot: `kontextmenue-regeln (iPhone)`, Chromium und WebKit, auch allein

**Befund:** Das Kontextmenü der Kachel hat jetzt drei Punkte (‚Reiselogbuch einstellen‘, ‚Reiselogbuch sperren‘, Strich, ‚Reiselogbuch löschen‘). Am **iPhone quer**
(390 px hoch) passt es bei 3 bis 12 Einträgen weder unter noch über die gedrückte Kachel. Die Liste rückt dann (R-4.2 erlaubt das), aber die gedrückte Kachel ist
danach **nicht mehr zu sehen** – Meldung ‚R-4.2 Eintrag t0 nach dem Öffnen des Menüs nicht mehr sichtbar‘ (je oberste, zweite und unterste Kachel).
iPhone hoch und iPad sind grün. Mit zwei Punkten (bis 3.57.12) passte es.

**Noch nicht geklärt:** ob die Platzierung in `ui.js` (Rücken der Liste) für diesen Fall einen Fehler hat (dann Korrektur in AppDesign, R-4.2 bleibt) oder ob am
iPhone quer schlicht der Platz fehlt (dann braucht es eine Entscheidung, z. B. Menü neben der Kachel wie am iPad – Änderung von R-4.2, Wortlaut zur Freigabe).

## Nächster Schritt

1. Ursache am iPhone quer messen (Lage von Kachel, Menü, Fuß; Rollstand vor und nach dem Öffnen).
2. Ist es ein Fehler der Platzierung: in `ui.js` beheben, `kontextmenue-regeln` und die fünf angepassten Prüfungen laufen lassen.
   Fehlt der Platz: Vorschlag mit Wortlaut (R-4.2) und Muster, Rückfrage.
3. Dann `node werkzeug/veroeffentlichen.mjs stufe --app reiselogbuch` und `… los --app reiselogbuch` (voll), Bericht mit P-120.

## Ebenfalls offen (Frage im Bericht)

- Designrichtlinie 5, Tabelle der Icons: Zeile ‚Sperren / Entsperren | `lock` / `lock-open`‘ fehlt noch (Ergänzung einer Regel → erst mit deinem Ja, 0 Nr. 29).
