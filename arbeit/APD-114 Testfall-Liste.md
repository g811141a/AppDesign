# APD-114 Testfall-Liste – Kontext in der Bau-Frage, ein Fenster je Antwort

Stand 05.11.2026 · Sitzung Reiselogbuch 0080 · Wortlaut: `arbeit/APD-114 Wortlaut.md`. Neue Prüfungen des Regelwächters: APD-84/W-16
(Bau-Frage mit ‚Kontext N‘ im Fragetext) und APD-84/W-17 (ein Fenster je Antwort). Prüfung: `tests/regelwaechter.mjs` (je Fall vor dem
Zeigen bzw. am Ende der Antwort), Gegenprobe `--gegenprobe` schaltet W-16 und W-17 einzeln ab und muss rot werden.

| Nr. | Fall | Erwartet |
|---|---|---|
| B-1 | Bau-Frage ‚Soll ich Version … erstellen? (Kontext N)‘, N = letzter Wert aus `messung.mjs`, Satz davor im Chat | durchgelassen |
| B-2 | Bau-Frage ohne ‚Kontext N‘ im Fragetext (Satz davor vorhanden) | abgelehnt W-16, Hinweis ‚Kontext N in die Frage‘ |
| B-3 | Bau-Frage mit einer Zahl im Fragetext, die `messung.mjs` nicht gemeldet hat | abgelehnt W-16 (nie schätzen, 0 Nr. 27) |
| B-4 | Bau-Frage als zweite von mehreren Fragen im Fenster | wie B-1 bis B-3 für diese Frage |
| B-5 | andere Frage (Rückmeldung, Backlog) ohne ‚Kontext N‘ im Fragetext | durchgelassen (nur W-14 gilt) |
| B-6 | erstes Fenster nach einer Nachricht des Nutzers | durchgelassen |
| B-7 | zweites Fenster, nachdem in derselben Antwort schon eines beantwortet wurde | abgelehnt W-17 vor dem Zeigen |
| B-8 | Fenster neu gestellt, nachdem der Wächter das vorige abgelehnt hat (nie gezeigt) | zählt nicht als zweites – durchgelassen |
| B-9 | Nachholen nach einer Zurückweisung des Stop-Hooks (keine Nachricht des Nutzers dazwischen) | gehört zur selben Antwort – schon beantwortetes Fenster zählt, zweites abgelehnt |
| B-10 | Übergabe ohne Fenster | unverändert erlaubt (0 Nr. 14) |
| B-11 | echte Antwort aus 0080 mit vier Fenstern nacheinander | das zweite bis vierte abgelehnt (Gegenbeleg) |
| B-12 | echte Bau-Frage aus 0080 ohne Kontext im Fragetext | abgelehnt W-16 (Gegenbeleg) |
| B-14 | nach dem beantworteten Fenster meldet sich eine Hintergrundaufgabe (neuer Zug ohne Nachricht des Nutzers), dann ein Fenster | durchgelassen – der Zug ist eine neue Antwort (Befund 0080, 14:15) |
| B-13 | Doku: Zusammenarbeit 0 Nr. 21, Kasten Punkt 9 und 2.8 mit dem bestätigten Wortlaut | `doku.mjs` – `checkCollab` grün |
