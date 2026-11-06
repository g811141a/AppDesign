# APD-62 Teil APD-38/T-16 – Menüs und Sprechblasen wachsen aus der Schaltfläche: Wortlaut und Testfall-Liste

Stand 06.11.2026 · Sitzung Reiselogbuch 0082 · Muster `arbeit/APD-62 Bewegung Muster.html` (Varianten heute, A, B, C; nur hell, Vereinbarung
30.10.2026). Die Nummern gelten nur in dieser Datei (außerhalb APD-62/M-n).

**Entscheidungen (Nutzer 06.11.2026, Sitzung 0082):** Variante A Apple-nah; Muster iPad quer/hoch und iPhone bestätigt; allgemeine Regel ja;
Wortlaut R-4.13 bestätigt. **Befund:** Fenster und Blatt gleiten schon seit 4.38.0 (APD-72, R-4.6, `BLATT_KURVE`), die Seitenleiste gleitet
(15.4) – neu sind nur Menüs, Untermenüs, Kontextmenüs und Sprechblasen (heute sofort, ohne Bewegung).

## Wortlaut (bestätigt, Katalog Abschnitt 4)

| R-4.13 | **Menüs und Sprechblasen wachsen aus der Schaltfläche:** Menü, Untermenü, Kontextmenü (aus der Kachel) und Sprechblase (R-4.3) wachsen beim Öffnen in 0,35 s aus ihrer Schaltfläche (von 20 % auf volle Größe, Kurve wie das Blatt `cubic-bezier(.32,.72,0,1)`) und schrumpfen beim Schließen in 0,25 s dorthin zurück; Schließen während des Öffnens beginnt an der aktuellen Stelle; ‚Bewegung reduzieren‘: nur Überblenden in 0,2 s; die Endlage ist dieselbe wie ohne Bewegung; Fenster und Blatt gleiten wie bisher (R-4.6) | ablauf.mjs – neue Prüfung (Herkunft, Dauer, Endlage, Schließen mitten im Öffnen, ‚Bewegung reduzieren‘) | Gefühl am Gerät | 15.6, 15.7 |

## Testfall-Liste (Entwurf – vor dem Bau bestätigen, 0 Nr. 1)

| Nr. | Fall | Erwartet |
|---|---|---|
| M-1 | Mehr-Menü öffnen (iPad quer und hoch, iPhone hoch und quer) | wächst aus dem Knopf (Ursprung = Mitte der Schaltfläche), nach 0,35 s genau Lage und Größe wie ohne Bewegung (R-4.5, R-4.9) |
| M-2 | Menü schließen: daneben tippen, Menüpunkt, Esc (R-4.7) | schrumpft in 0,25 s zum Knopf; Fokus danach wie heute (R-1.9) |
| M-3 | Schließen während des Öffnens | beginnt an der aktuellen Größe, kein Sprung |
| M-4 | Untermenü (z. B. Darstellung) | wächst aus seinem Menüpunkt; zurück schrumpft es dorthin |
| M-5 | Kontextmenü einer Kachel (langes Drücken, R-4.2) | wächst aus der Kachel; Liste rückt wie heute |
| M-6 | Sprechblase: x mit Änderung, roter Menüpunkt (R-4.12) | wächst aus der Schaltfläche; ‚Abbrechen‘ schrumpft zurück |
| M-7 | ‚Bewegung reduzieren‘ | nur Überblenden 0,2 s, keine Größenänderung (R-1.8) |
| M-8 | Drehen bei offenem bzw. wachsendem Menü | Endzustand wie ohne Bewegung (R-8.1) |
| M-9 | Großanzeige (R-2.6) bei offenem Menü | unverändert |
| M-10 | Prüfungen | jede Prüfung wartet auf das Ende der Bewegung (`warteBis`), keine festen Pausen (APD-85) |
