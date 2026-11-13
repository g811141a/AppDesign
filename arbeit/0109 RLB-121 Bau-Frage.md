# RLB-121 – Bau-Frage

**13.11.2026** · Sitzung ‚Reiselogbuch 0109‘

## Stand

- RLB-121 ist **bereit** (ReiseLogBuch-Backlog ‚0. Nächste Version‘, `7928116`): Muster, Testfall-Liste RLB-121/M-1 bis M-17, Reihenfolge D-5,
  allgemein, Wortlaut W-1 und W-2 bestätigt (AppDesign `f34f2a0`).
- Die Version enthält: Reiselogbuch – zwei Zeilen ‚Teuerste Quartiere‘ und ‚Günstigste Quartiere‘ (App, Vorschau, Ausgabe); AppDesign –
  `aufzaehlung` mit langen Einträgen (R-10.5, Designrichtlinie 3), Prüfung `checkAufzaehlung` erweitert.
- Versionen voraussichtlich **Reiselogbuch 3.56.0** und **AppDesign 4.59.0** (Fassung des Reiselogbuchs auf 4.59.0 heben – Rückfrage nach
  R-10.3 hiermit gestellt).

## Prüfstufe

`veroeffentlichen.mjs stufe --app reiselogbuch` meldet heute ‚Stufe Text – doku-regeln, version-regeln, text-regeln‘. Das liegt daran,
dass noch nichts geändert ist. Mit der Änderung (neue Logik in `index.html`, AppDesign `ui.js`) ist es die Stufe **voll**
(0 Nr. 2, im Zweifel voll), etwa 60 min.

## Empfehlung

Kontext 277.475 – ab 300.000 ist die Übergabe fällig (0 Nr. 13). Bau und voller Prüflauf brauchen deutlich mehr als die verbleibenden rund
20.000. **Empfehlung:** jetzt übergeben und in der Sitzung **Reiselogbuch 0110** bauen; dort steht das ‚Ja‘ als Auftrag im Starttext.

## Hinweis zu meiner Arbeit

Vor der Frage zum Wortlaut stand der Wortlaut alt und neu nur in der Datei, nicht im Chat – 0 Nr. 29 verlangt ihn auch im Chat. Hier
nachgetragen: RLB-121/W-1 und W-2 stehen wörtlich in `arbeit/0109 RLB-121 Wortlaut.md`.

## Offene Usertests

keine.

## Backlog-Erinnerung

Nächste Version Reiselogbuch 3.56.0: 1 Punkt bereit (RLB-121) · Offen im Backlog: RLB-6 · AppDesign: APD-85 Teil 6, APD-80, APD-30,
APD-62 (APD-38/T-1), APD-70.
