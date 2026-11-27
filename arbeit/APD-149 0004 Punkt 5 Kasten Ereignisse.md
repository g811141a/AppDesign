# APD-149 – Punkt 5: der Kasten ‚Ereignisse‘ lesbar machen (Sitzung AppDesign 0004)

**27.11.2026** · Anlass: Nachricht von AppDesign 0003 (Vorschlag in `arbeit/APD-149 0003 Kasten Ereignisse.md`). Nur das Muster (`katalog/`), keine Regel, keine Version.

## Heute (gelesen in dieser Sitzung)

- `katalog/index.html` Zeile 121: Der Kasten behält nur die **6** neuesten Zeilen.
- `katalog/entwurf/presentation-commands.js`:
  - **Zeile 455:** Jede Änderung am Stapel schreibt ‚Stapel · menu › submenu‘. Dieselbe Angabe steht schon in der Zeile ‚Stapel‘ über dem Kasten (`#adStapel`).
  - **Zeile 456:** Jeder Befehl schreibt zusätzlich ‚execute · view.compact‘ – doppelt zu ‚Ansicht kompakt‘ (Zeile 422).
  - **Zeile 404:** Gründe wie ‚Fenster ‚…‘ zu · replaced‘ bzw. ‚· user‘.
  - **Zeile 456:** Abgelehnt heißt ‚abgelehnt · menu‘.
- Dadurch verdrängen Code-Zeilen die Zeilen, auf die es in den Schritten ankommt, etwa ‚Ansicht kompakt‘ oder ‚Kachel angetippt‘.

## Vorschlag (Wortlaut der Zeilen)

| Ereignis | heute | neu |
|---|---|---|
| Stapel ändert sich | Stapel · menu › submenu | **Offen: Menü › Untermenü** (grau) |
| Stapel leer | Stapel · leer | **Nichts offen** (grau) |
| Arten | menu, submenu, sheet, alert, popover, activity | Menü, Untermenü, Fenster, Hinweisfenster, Sprechblase, Teilen (Begriffe Designrichtlinie 6) |
| Befehl | execute · view.compact **und** Ansicht kompakt | nur **Ansicht kompakt** (fett) |
| Fenster zu | Fenster ‚Eintrag bearbeiten‘ zu · replaced / · user | Fenster ‚Eintrag bearbeiten‘ zu · **ersetzt** / · **vom Nutzer** |
| abgelehnt | abgelehnt · menu | **Abgelehnt: Menü** |
| Zeilen im Kasten | 6 | **12** |
| Zeile ‚Stapel‘ über dem Kasten | menu › submenu / leer | **Menü › Untermenü / nichts offen** |

- Fett stehen die Befehle und Tipps: Ansicht, Löschen bestätigt, Wiederherstellen, Kachel angetippt, Teilen. Grau stehen die Zeilen zum Stapel.
- Die Vorführung (Ausprobieren) bleibt sonst gleich.

## Prüfungen

- `muster-pruefen.mjs` liest den Stapel aus `AD.presentation.stack`, nicht aus dem Kasten. Nur S-9 sucht im Kasten ‚… zu · replaced‘. Das wird ‚… zu · ersetzt‘.
- Neu in `muster-pruefen.mjs` als Testfall APD-149/S-17:
  - nach ‚Mehr › Ansicht › Kompakt‘ steht ‚Ansicht kompakt‘ fett im Kasten, dazu ‚Nichts offen‘
  - keine Zeile mit Code-Namen (`menu`, `sheet`, `execute`, `replaced`)
  - der Kasten hat höchstens 12 Zeilen
- Danach laufen `muster-pruefen.mjs` (mit Gegenprobe S-15) und `bean-katalog` in Chromium und WebKit.
- Die Schritte in der Datei 0003 und im Bericht 0002 nennen ‚Stapel · …‘. Für das nächste Ausprobieren am Gerät schreibe ich sie mit den neuen Zeilen.

## Entschieden (Nutzer 27.11.2026, Sitzung AppDesign 0004, im Fenster)

- „Vergiss diesen punkt 5, ich melde mich bei bedarf wieder“. Der Kasten bleibt, wie er ist. Am Muster wird nichts geändert.

Nächste Version AppDesign (mit `v5/`): 3 Punkte bereit (APD-149/J-1, APD-152, APD-153). Offen im Backlog: APD-135, APD-136, APD-149, APD-148, APD-151, APD-154 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150, APD-155 (Prio 2) · APD-70, APD-147, APD-156 (Prio 3).
