# Punkt 1 – Vorschlag: Wiederherstellen behält die Zeitpunkte der Felder

**27.11.2026 · Sitzung 0168** · Thema **APD-152** · Entscheidung: a) in AppDesign (Nutzer 27.11.2026, im Fenster) · Befund `arbeit/0168 Aufgefallen Punkt 1.md`

## 1. Schnittstelle

- **AD-Bean:** `createSync`. Die Option `recentlyDeleted` bekommt erweitertes Verhalten, eine **neue Schnittstelle gibt es nicht**.
  - Die AD-Bean `recentlydeleted` bleibt unverändert, ebenso das Reiselogbuch (nur `AD_NEEDED` und der Fassungs-Pfad).
- **So geht es:**
  - `snapshot()` merkt sich auch die Einträge in ‚Zuletzt gelöscht‘, mit der Kennzeichnung ‚gelöscht‘.
  - Kommt ein Eintrag von dort in die Liste zurück, vergleicht `stamp()` ihn mit seinem Stand beim Löschen.
  - Felder und Tage behalten dabei ihre Zeitpunkte. Nur `changedAt` und `changedOn` werden neu gesetzt, damit das Wiederherstellen die Löschung auf dem anderen Gerät schlägt.
  - Ändert man ihn danach, wird nur das geänderte Feld gestempelt.
- **Unverändert:**
  - Löschen schreibt weiter den Eintrag in `deleted`.
  - Endgültig löschen und Ablauf der Frist schreiben keinen neuen Eintrag.
  - ‚Backup laden – Ersetzen‘ und ‚Abgleichen‘ ohne Wiederherstellen bleiben wie bisher.
  - Gespeicherte Daten und Backup bleiben gleich. Kein `normalize` nötig, denn der Stand liegt nur im Speicher.
- **Warum nicht ‚jeder Eintrag mit eigenen Zeitpunkten‘:** Das würde auch Einträge aus ‚Ersetzen‘ verändern.
- **Nachgespielt** (Chromium, `createSync` 4.71.0, Ablauf von Hand):
  - Heute geht die Änderung vom iPhone verloren.
  - Mit dem Verfahren bleibt sie erhalten.
  - Kennt das andere Gerät die Löschung schon, kommt der Eintrag dort trotzdem zurück.

## 2. Wortlaut (0 Nr. 29) – alt und neu

**R-7.10** (Designrichtlinie 17), der Satz zum Abgleich:
- alt: „Löschen, Wiederherstellen und endgültig Löschen gelten beim Abgleich auf beiden Geräten; ‚Zuletzt gelöscht‘ kommt mit Löschdatum ins Backup“
- neu: „Löschen, Wiederherstellen und endgültig Löschen gelten beim Abgleich auf beiden Geräten; **Wiederherstellen behält die Zeitpunkte der Felder (beim Abgleich gilt je Feld weiter das Neuere, R-9.3);** ‚Zuletzt gelöscht‘ kommt mit Löschdatum ins Backup“
- Spalte Prüfung alt: „ablauf.mjs – `checkRecentlyDeleted` (neu: RLB-126/T-1 bis T-15)“
- Spalte Prüfung neu: „ablauf.mjs – `checkRecentlyDeleted` (RLB-126/T-1 bis T-15, Teil ‚Wiederherstellen und Abgleich‘); abgleich.mjs Fall 24“

**R-9.3**, Spalte Prüfung:
- alt: „abgleich.mjs (Fälle 1–23, Gegenprobe Fall 23)“
- neu: „abgleich.mjs (Fälle 1–24, Gegenproben Fall 23 und 24)“

**15.18**, neue Zeile der Tabelle:
- neu: „| 24 | Auf dem iPad gelöscht und wiederhergestellt, auf dem iPhone **dazwischen** geändert (das iPhone kannte die Löschung noch nicht) | die Änderung vom iPhone bleibt | übernimmt die Änderung vom iPhone |“

**15.24**, Punkt ‚Verhalten‘, am Ende:
- alt: „… Abgleich über `createSync({ …, recentlyDeleted: 'recentlyDeleted' })`.“
- neu: „… Abgleich über `createSync({ …, recentlyDeleted: 'recentlyDeleted' })`; **beim Wiederherstellen behalten Felder und Unterdaten ihre Zeitpunkte, nur ‚geändert am‘ ist neu.**“

## 3. Testfall-Liste (automatisch) – APD-152/T-1 bis T-9

| Nr. | Fall | Prüfung |
|---|---|---|
| T-1 | Fall 24: iPad löscht, iPhone ändert ohne Abgleich ein Feld und einen Tag, iPad stellt wieder her; das iPhone lädt das Backup vom iPad → die Änderungen vom iPhone bleiben | `abgleich.mjs` Fall 24, rot gegen 4.71.0 |
| T-2 | wie T-1, das iPad lädt das Backup vom iPhone → übernimmt die Änderungen vom iPhone | `abgleich.mjs` Fall 24 |
| T-3 | Nach dem Wiederherstellen: `metaAt` und `dayAt` wie vor dem Löschen, `changedAt` und `changedOn` neu | `abgleich.mjs` Fall 24 |
| T-4 | Das andere Gerät kennt die Löschung: nach dem Abgleich ist der Eintrag zurück, ‚Zuletzt gelöscht‘ leer (wie RLB-126/T-9) | `abgleich.mjs` Fall 24 und `ablauf-zuletzt-geloescht` |
| T-5 | Nach dem Wiederherstellen ein Feld ändern → nur dieses Feld neu gestempelt | `abgleich.mjs` Fall 24 |
| T-6 | Löschen schreibt `deleted`; endgültig löschen und Ablauf der Frist schreiben keinen neuen Eintrag | `abgleich.mjs` Fall 24 |
| T-7 | ‚Ersetzen‘ und ‚Abgleichen‘ ohne Wiederherstellen unverändert | Fälle 1–23 und RLB-126/T-10 grün |
| T-8 | In der App zwei Geräte über ‚Backup laden‘ wie T-1, mit Abgleichbericht und den Grundregeln | `ablauf-zuletzt-geloescht`, neuer Teil, rot gegen 3.59.0 |
| T-9 | Gegenprobe `abgleich:24`: die Erkennung ‚kommt aus Zuletzt gelöscht zurück‘ abgeschaltet → T-1 rot | `abgleich.mjs` |

Keine Oberfläche ändert sich, also kein Muster (0 Nr. 6). HIG: kein Thema.

## 4. Version

- **Korrekturversion vor allem Neuen** (0 Nr. 8): AppDesign **4.71.1**, Reiselogbuch **3.59.1** (hebt die feste Fassung auf 4.71.1, R-10.3).
- Prüflauf **voll**, weil sich AppDesign ändert (0 Nr. 2).
- **nächster freier Usertest:** /0 Version, /1 Ablauf T-1 mit zwei Geräten.
- APD-149/J-1 kommt nicht mit (eigene Bau-Frage).
- Gebaut wird erst nach der Bau-Frage und deinem ‚Ja‘ (0 Nr. 21).
