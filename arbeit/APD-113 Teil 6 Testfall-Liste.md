# APD-113 Teil (6) Testfall-Liste – Text nach dem Fenster, Push bei jeder Aufgabe

Stand 07.11.2026 · Sitzung Reiselogbuch 0086 · M-1 bis M-12 bestätigt (Nutzer 06.11.2026), **M-13 bis M-17 bestätigt** (Nutzer 07.11.2026, 00:47, Sitzung 0087: ‚M-13 bis M-16 ja · M-17 ja · N-3-Zusatz ja‘) · Wortlaut `arbeit/APD-113 Teil 6 Wortlaut.md` (L-1 bis L-8, bestätigt). Nummern gelten nur
in dieser Datei (außerhalb: APD-113/M-n). Jeder Fall wird eine feste Prüfung in `tests/regelwaechter.mjs` (Sitzungsdaten nachgebaut bzw. echte
Antworten aus 0085 und 0086).

| Nr. | Ausgangslage | Handlung | Erwartet (feste Prüfung) |
|---|---|---|---|
| M-1 | Antwort mit Bitte, am Gerät zu prüfen | Fenster mit Link im Fragetext | Fenster-Hook lehnt ab (W-15 neu, L-6) |
| M-2 | wie M-1 | Fenster ‚Muster … bereit – anzeigen?‘ ohne Link | Fenster-Hook lässt durch |
| M-3 | M-2 beantwortet | letzte Ausgabe: Uhrzeitzeile, Link, nummerierte Schritte mit ‚Erwartet: …‘, Zeitzeile – kein Fenster danach | Stop-Hook lässt durch (W-6 Zeitzeile nach dem letzten Fenster und der letzten Ausgabe) |
| M-4 | wie M-3, aber die letzte Ausgabe ohne nummerierte Schritte oder ohne ‚Erwartet:‘ | Antwort enden | Stop-Hook lehnt ab (L-6) |
| M-5 | Antwort ganz ohne Fenster (keine Übergabe) | Antwort enden, dreimal hintereinander | Stop-Hook lehnt jedes Mal ab, auch nach der zweiten Zurückweisung (L-8) |
| M-6 | Neustart des Arbeitsprozesses mitten in der Antwort (echte Daten 0086, 19:00: ‚No response requested‘) | Antwort ohne Fenster enden | Stop-Hook lehnt ab (L-8, APD-113/(5)) |
| M-7 | Meldung einer Hintergrundaufgabe bzw. Nachricht einer anderen Sitzung (echte Daten 0086, 19:22) | Antwort ohne Fenster enden | Stop-Hook lehnt ab (L-8) |
| M-8 | Übergabe (‚Die Sitzung (Chat) ist damit beendet!‘) | Antwort ohne Fenster enden | Stop-Hook lässt durch |
| M-9 | Zeitzeile mitten in der Antwort, danach noch ein Fenster (echte Daten 0086, 19:22) | Antwort enden | Stop-Hook lehnt ab (W-6 wie bisher) |
| M-10 | Antwort mit Fenster am Ende ohne Link (gewöhnliche Frage) | Antwort enden | Stop-Hook lässt durch (unverändert) |
| M-11 | Zusammenarbeit nach L-1 bis L-8 | `doku.mjs` `checkCollab` | Kasten Punkt 4 und 6, 0 Nr. 11, 28, 29, 2.1, 2.3, 2.8 im neuen Wortlaut; kein ‚unmittelbar vor dem Fenster‘ und kein ‚als Datei oder Bild vor dem Fenster‘ mehr |
| M-12 | Gegenprobe | Wächter ohne die neuen Prüfungen | M-1, M-4, M-5, M-6, M-13, M-15, M-16, M-17 rot (`--gegenprobe`) |
| M-13 | zwei Fenster in einer Antwort, dazwischen ein Aufruf mit Commit **und** `messung.mjs` (echte Daten 0086, 19:27) | zweites Fenster | Fenster-Hook lässt durch (APD-113/N-3) |
| M-14 | wie M-13, dazwischen nur `messung.mjs` | zweites Fenster | Fenster-Hook lehnt ab (W-17 wie bisher) |
| M-15 | letzte Ausgabe nach ‚… anzeigen?‘ mit Wortlaut, aber ohne Link oder ohne nummerierte Schritte bzw. ‚Antworte im Chat‘ (echte Daten 0086, 00:31) | Antwort enden | Stop-Hook lehnt ab (APD-113/N-6) |
| M-16 | Zurückweisung des Stop-Hooks, Nachholen endet ohne neues Fenster (echte Daten 0086, 00:30) | Antwort enden | Stop-Hook lehnt ab (APD-113/N-6, L-8) |
| M-17 | Fenster beantwortet, danach eine Zurückweisung des Stop-Hooks, seitdem nur `messung.mjs` (echte Daten 0087, 00:42: W-17 lehnte das von N-6 verlangte Fenster ab) | Fenster nach der Zurückweisung | Fenster-Hook lässt durch – eine Zurückweisung zählt für W-17 wie ein Werkzeug (APD-113/N-3 Zusatz) |

Nur am Gerät (Usertest): Push kommt bei ‚… anzeigen?‘, danach ist der Text sichtbar und lässt sich kopieren; nach einem Neustart kommt trotzdem ein Push.
