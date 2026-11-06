# APD-113 Teile (5), (7) bis (9) und APD-117 – Wortlaut

Stand 06.11.2026 · Sitzung Reiselogbuch 0086 · Nummern gelten nur in dieser Datei (außerhalb: APD-113/N-n). Anlass: der Nutzer will vor dem
Bau den Rest der Zusammenarbeit klären (06.11.2026, 19:40). **N-1 bis N-6 bestätigt** (Nutzer 07.11.2026, 00:38, Sitzung 0086: ‚N-1 bis N-6 ja‘). Testfälle: `arbeit/APD-113 Teil 6 Testfall-Liste.md` M-13 bis M-16.

| Nr. | Punkt | Vorschlag |
|---|---|---|
| N-1 | APD-113/(5) Neustart | erledigt durch Teil (6) L-8 (Antwort ohne Fenster endet nie, auch nach einem Neustart; Prüfung APD-113/M-6) – kein eigener Wortlaut |
| N-2 | APD-113/(7) W-15 nach einem Neustart | entfällt durch Teil (6) L-6 (ein Fenster mit Link wird immer abgelehnt, es gibt keine ‚Ausgabe davor‘ mehr zu prüfen) |
| N-3 | APD-113/(8) W-17 und `messung.mjs` | 2.8 alt: „… ebenso ein weiteres Fenster in derselben Antwort, solange seit dem vorigen Fenster kein Werkzeug lief.“ – neu: „… ebenso ein weiteres Fenster in derselben Antwort, solange seit dem vorigen Fenster kein Werkzeug lief; ein Aufruf, der nur `messung.mjs` startet, zählt nicht, einer, der daneben etwas anderes tut (z. B. Commit), zählt.“ |
| N-4 | APD-113/(9) Uhrzeitzeile | kein neuer Wortlaut: 0 Nr. 26 und der Regelwächter gelten; Ausgaben nach einem Denkschritt bleiben Selbstkontrolle (2.8 ‚Grenze‘). Mit Teil (6) hat eine Antwort meist nur noch eine Ausgabe vor und eine nach dem Fenster – weniger Stellen für Fehler. Punkt schließen |
| N-5 | APD-117 Lagebild als eigene Antwort | 0 Nr. 15 alt: „Dann das **Lagebild** (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand – 2.5), dann die Arbeit.“ – neu: „Dann das **Lagebild** (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand – 2.5) als **eigene Antwort** vor jeder Arbeit, auch wenn der Starttext einen Auftrag hat: Fenster ‚Lagebild bereit – anzeigen?‘, danach das Lagebild als letzte Ausgabe (2.1); die Arbeit beginnt erst nach der Antwort des Nutzers.“ |
| N-6 | Link und Schritte bei jeder Aufgabe (Ergänzung zu APD-113/L-1; Anlass 07.11.2026, 00:30: Wortlaut ohne Link und Anleitung, Korrektur nach Zurückweisung ohne Fenster) | Kasten Punkt 4, neu angefügt: „Das gilt für **jede** letzte Ausgabe, nach der der Nutzer etwas tun soll (lesen, entscheiden, prüfen, antworten): vollständiger Link zur Datei bzw. zum Muster und nummerierte Schritte mit ‚Erwartet: …‘, zuletzt ‚Antworte im Chat: …‘ mit Beispiel. Endet eine Antwort nach einer Zurückweisung des Regelwächters, steht davor wieder ein Fenster (Push).“ |
