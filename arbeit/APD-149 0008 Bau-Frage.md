# Bau-Frage AppDesign 5.0.0 (`v5/`) – Sitzung AppDesign 0008

**27.11.2026** · 0 Nr. 21. Alle Punkte sind bereit (Backlog ‚0. Nächste Version‘: 7 Punkte, `e2ae23d`).

## Was gebaut wird

| Punkt | Inhalt | AD-Bean |
|---|---|---|
| APD-145 | `v5/` als Kopie von `v4/` (4.71.0); global nur `AD`; alle deutschen Namen der Schnittstelle mit ihren Schlüsseln englisch (APD-145/J-4); Wortlaut R-1.14, R-1.13, 14, 15, R-10.3, R-10.9, `CLAUDE.md` 2.15.0; Veröffentlichungs-Skript und Prüfungen auf `v5/` | keine neue, alle unter `AD` |
| APD-149 (Beans) | `commands` und `presentation` aus dem Entwurf, mit J-5 (R-1.4 Durchlass, 15.6, `hig.mjs`) und J-7 (S-17); Liste 15 und Katalog; die App nutzt sie noch nicht (J-9) | `commands`, `presentation` (neu) |
| APD-149/J-1 | Beans im Entwurf im Bean-Katalog (Designrichtlinie 14, R-1.13, `checkBeans`) | keine (Regel und Prüfung) |
| APD-151 | Fenster am iPhone wie am iPad, für alle Fenster in `ui.js`; Korrektur Aufgefallen Nr. 1; Wortlaut R-4.6, R-4.5, 15.17, 7 und Folgestellen; `checkSheet`, `hig.mjs` R-4.5/R-4.8; Reiselogbuch `ablauf-blatt`, `ablauf-fenster` | bestehendes Fenster, neues Verhalten |
| APD-152 | Wiederherstellen behält die Zeitpunkte der Felder; Hinweis zu `keptDeleted` | `createSync` (Option `recentlyDeleted`, erweitertes Verhalten) |
| APD-153 | Gegenprobe APD-30/W-97, `checkGegenproben` (Stellen in `v5/`); Zusammenarbeit 3.20.0 | keine, weil nur Prüfungen |
| APD-154 | Drehprüfung kennt ‚beside‘, `topKeep` für die Seitenleiste; Spalte Prüfung R-8.1 | keine, weil nur Prüfungen |

- `recentlydeleted` zieht mit `v5/` unter `AD` um (RLB-126/J-11).
- **Reiselogbuch:** gehoben auf AppDesign 5.0.0 (R-10.3, Rückfrage mit dieser Bau-Frage). Alle Aufrufe gehen auf `AD.<Name>`. Vorschlag: **Reiselogbuch 3.60.0**, weil die Kette Reiselogbuch vorher 3.59.2 (RLB-129) baut (`UEBERGABE.md`, `93bb26b`).

## Prüflauf

- **Voll.** `veroeffentlichen.mjs stufe --app reiselogbuch` schlägt heute ‚Text‘ vor (3 Prüfungen: doku-regeln, version-regeln, text-regeln). Das liegt daran, dass noch nichts gebaut ist. Der Bau ändert Code in `v5/ui.js` und `index.html`, darum gilt voll (0 Nr. 2, im Zweifel voll). `stufe` rufe ich nach dem Bau vor `los` noch einmal auf.
- Feste Prüfungen nach 0 Nr. 1, die gegen 4.71.0 / 3.59.1 rot sein müssen: APD-151/M-19, APD-154/T-5 bis T-8 (RLB-128 ist mit 3.59.1 schon in der App, die Prüfung fehlt noch in AppDesign) und die freigegebenen roten Fälle von APD-152.

## Ablauf und Sitzung

- **Empfehlung: Bau in einer neuen Sitzung ‚AppDesign 0009 – Bau v5/ (AppDesign 5.0.0)‘.** Der Kontext steht hier bei rund 230.000. Der Bau ist groß (317 Aufrufstellen im Reiselogbuch laut 0150, dazu Prüfungen, Werkzeug und Richtlinien) und reicht sicher über 300.000. Mitten im Bau darf nicht übergeben werden (0 Nr. 13).
- Diese Sitzung kann keine neue starten (`lineage` 8 von 8). Nach deinem Ja schreibe ich die Übergabe mit Starttext. Den neuen Chat öffnest du selbst in derselben Umgebung (Opus 5.5, Aufwand hoch).
- Die neue Sitzung baut erst nach Reiselogbuch 3.59.2 bzw. stimmt sich vorher mit der Kette Reiselogbuch ab (`send_message` vor `vorbereiten`, beim Start von `los`, nach ‚fertig‘).

## Nachrichten der Kette Reiselogbuch (27.11.2026)

- **0170:** Usertest P-127 (3.59.1) fehlgeschlagen; `arbeit/RLB-129 Testfall-Liste.md` neu, Übergabe an 0171.
- **0171:** `vorbereiten --app reiselogbuch=3.59.2` ist gelaufen, Bau 3.59.2 mit RLB-129 (Nutzer: Ja), AppDesign 4.71.0 unverändert. Laut 0171 will der Nutzer die beiden Ketten zusammenführen: erst 3.59.2, dann übergibt 0171 an die Kette AppDesign. Die Übernahme bestätigt der Nutzer selbst.
- **Folge für `v5/`:** Der Bau beginnt erst nach Reiselogbuch 3.59.2 auf `main`. Die Übergabe an AppDesign 0009 nimmt den Stand von 0171 mit auf.
