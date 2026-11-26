# RLB-126 ‚Zuletzt gelöscht‘ – Bau-Frage

**Stand 26.11.2026 · Sitzung Reiselogbuch 0166**

## Abstimmung erledigt

Du hast im Chat ‚AppDesign Framework Steuer-Bean Konzept‘ um 23:29 Uhr ‚Ja, jetzt in 4.x bauen‘ gewählt (dort im Verlauf nachgelesen). Damit
gilt **RLB-126/J-11**: `recentlydeleted` wird jetzt in `v4/` gebaut und zieht später mit `v5/` auf `commands`/`presentation` um. Im
Reiselogbuch-Backlog steht RLB-126 jetzt unter ‚0. Nächste Version‘ als **bereit** (Commit `e050549`).

## Was gebaut würde

**AppDesign 4.71.0** (Designrichtlinie allgemein 4.71.0)
- Neue AD-Bean **`recentlydeleted`** (`createRecentlydeleted(…)`) mit Katalogdatei. Eigenschaft `days` (Standard 30). Methoden `remove`,
  `restore`, `purge`, `purgeAll` und `daysLeft`. Nur lesen: `items`. Ereignisse `restore`, `purge` und `change`. Daten je Eintrag
  `{ id, item, at, on }`. Sie arbeitet mit `createSync` (`data.deleted`) und dem Backup.
- Oberfläche der AD-Bean (wie im Muster, J-7, J-8):
  - letzte Kachel ‚Zuletzt gelöscht‘ mit Papierkorb und Anzahl, nur wenn nicht leer
  - eigene Liste mit Kopf ‹, Fristhinweis und ‚Gelöscht am … · noch N Tage‘
  - Vorschau nur zum Lesen mit Hinweis und ‚Wiederherstellen‘
  - Kontextmenü und Wischen ‚Wiederherstellen‘ · ‚Endgültig löschen‘ (rot, einzige Abfrage)
- Regeln mit dem freigegebenen Wortlaut (J-10, `0165 RLB-126 Muster.md` Abschnitt 5):
  - **R-4.12** mit der Ausnahme ‚Löschen nach Zuletzt gelöscht fragt nicht‘
  - **R-7.8** ein Satz
  - neue **R-7.10 ‚Zuletzt gelöscht‘**
  - Zeile der AD-Bean in Designrichtlinie 15
- Prüfungen: `checkErstFragen` (R-4.12) übergeht das Löschen nach ‚Zuletzt gelöscht‘ und prüft stattdessen, dass der Eintrag dort liegt.
  Dazu kommt eine neue Prüfung für R-7.10.

**Reiselogbuch 3.59.0**
- Lädt die Fassung 4.71.0. Mehr-Menü, Kontextmenü und Wischen ‚Reiselogbuch löschen‘ verschieben ohne Abfrage nach ‚Zuletzt gelöscht‘.
  Danach öffnet die Startreise (iPhone: die Startliste). ‚Erst Backup erstellen‘ entfällt (J-9).
- Abgleich (RLB-126/T-9) und Backup (T-10) werden umgebaut. Im Muster waren sie noch nicht umgebaut.
- `PROMPT.md` bekommt die neue Lösch-Abfrage (Wortlaut 5.1).
- Prüfungen mit der alten Lösch-Abfrage werden angepasst: `ablauf-sperre` (RLB-125/T-12), `ablauf-seitenleiste-kontextmenue` und
  `ablauf-wischen`. Neu kommen die Fälle RLB-126/T-1 bis T-15 dazu.

## Testfall-Liste (aus `0165 RLB-126 Muster.md` Abschnitt 4)

Alle Fälle laufen in Chromium und WebKit, nach jedem Schritt mit den Grundregeln. Ansichten: iPad quer und hoch, iPhone hoch und quer, hell und
dunkel.

- RLB-126/T-1 Löschen aus Mehr, Kontextmenü und Wischen: ohne Sprechblase, der Eintrag liegt danach in ‚Zuletzt gelöscht‘.
- RLB-126/T-2 Kachel ‚Zuletzt gelöscht‘
- RLB-126/T-3 Liste ‚Zuletzt gelöscht‘
- RLB-126/T-4 Vorschau nur zum Lesen
- RLB-126/T-5 Wiederherstellen aus der Vorschau
- RLB-126/T-6 Wiederherstellen aus Kontextmenü und Wischen
- RLB-126/T-7 Endgültig löschen (Abfrage, Abbrechen)
- RLB-126/T-8 Frist von 30 Kalendertagen
- RLB-126/T-9 Abgleich
- RLB-126/T-10 Backup
- RLB-126/T-11 Drehen, Seitenleiste aus und ein, Textgröße
- RLB-126/T-12 Tastatur
- RLB-126/T-13 Gesperrt
- RLB-126/T-14 Daten lang und viele
- RLB-126/T-15 Gegenprobe

Am Gerät kommen Testfälle (User) in den Usertest **P-126**: Wischgefühl, Abgleich zweier Geräte über ‚Backup laden‘, Backup in Dateien sichern
und laden, VoiceOver.

## Prüflauf

**Voll** – AppDesign ändert sich, Stufe Text ist damit ausgeschlossen (0 Nr. 2). Die Stufe bestätige ich vor `los` mit
`veroeffentlichen.mjs stufe`. Ablauf: Zweige `vorbereitung-4.71.0` und `vorbereitung-3.59.0`, bauen, betroffene Prüfungen, dann genau ein
voller Lauf in `los`. Erst AppDesign, dann die App; laut `CLAUDE.md` rund 75 Minuten.

Hinweis: Der Framework-Chat lädt gerade seine Übergabe auf `main` von AppDesign. `los` führt eine neuere `main` vorher zusammen.

## Weitere bereite Punkte

Keine: AppDesign ‚0. Nächste Version‘ 0 Punkte, Reiselogbuch nur RLB-126.
