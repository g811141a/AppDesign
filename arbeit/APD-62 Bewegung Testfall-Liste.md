# APD-62 Teil APD-38/T-16 – Öffnen und Schließen mit Bewegung: Testfall-Liste (Entwurf zum Muster)

Stand 06.11.2026 · Sitzung Reiselogbuch 0082 · Muster `arbeit/APD-62 Bewegung Muster.html` (Varianten heute, A, B, C). Die Nummern gelten
nur in dieser Datei (außerhalb APD-62/M-n). Wird nach der Wahl der Variante vervollständigt und vor dem Bau bestätigt (0 Nr. 1).

| Nr. | Fall | Erwartet |
|---|---|---|
| M-1 | Fenster öffnen (iPad quer und hoch, iPhone hoch und quer) | gleitet von unten herein, Abdunkelung blendet ein; am Ende genau an der Stelle wie heute |
| M-2 | Fenster schließen mit Häkchen, x → ‚Änderungen verwerfen‘, Esc | gleitet hinunter, schneller als herein; Fokus danach auf der Schaltfläche (R-1.9) |
| M-3 | Schließen während des Hereingleitens | schließt ab der aktuellen Stelle, kein Sprung |
| M-4 | Menü und Untermenü öffnen und schließen | wächst aus der Schaltfläche, schrumpft dorthin zurück; Antippen daneben schließt |
| M-5 | Sprechblase (Abfrage) | wächst aus der Schaltfläche |
| M-6 | Seitenleiste ein/aus (iPad), Blatt am iPhone | gleitet; Inhalt rollt nicht (R-7.3) |
| M-7 | ‚Bewegung reduzieren‘ | nur Überblenden (0,2 s), sonst keine Bewegung (R-1.8) |
| M-8 | Drehen während einer Bewegung | Endzustand wie ohne Bewegung (R-8.1) |
| M-9 | Tastatur geht auf, während das Fenster hereingleitet | Fenster passt danach in den sichtbaren Bereich (R-4.5) |
| M-10 | Prüfungen | jede Prüfung wartet auf das Ende der Bewegung (`warteBis`), keine festen Pausen (APD-85) |
