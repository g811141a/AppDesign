# APD-149 – Fund 2: Escape am Fenster in v4 (Sitzung AppDesign 0004)

**27.11.2026** · aus `arbeit/APD-149 0002 Bericht Muster.md`, ‚Funde und Entscheidungen‘ Nr. 2. Geprüft nach 0 Nr. 27, keine Änderung.

## Frage aus 0002

In Chromium kam das `click()` aus dem `cancel`-Hörer von v4 (`dlg` → `#dlgX`, `v4/ui.js` Zeile 2447) nicht an, wenn der Fokus im Feld lag.
Vermutung damals: v4 ist in Chromium selbst betroffen.

## Nachgebaut (diese Sitzung)

- **Seite:** Bean-Katalog mit `v4/ui.js`. Der Entwurf `presentation-commands.js` ist abgeschaltet, also gilt nur v4. `v4/ui.js` ist gleich `fassung/4.71.0/ui.js` (`cmp`).
- **Ablauf:** Fenster mit `openDialog` und `dlgHead` (x, Häkchen), Feld ‚Titel‘ und Knopf. Dann echter Tipp bzw. Tippen und danach die Taste.
- **Ansicht:** iPad quer (1180 × 820).
- **Skripte:** Fälle A bis E in `esc-v4.mjs`, Fälle F und G in `esc-v4b.mjs`, beide im Notizordner der Sitzung.

| Fall | Chromium 158 | WebKit 26.0 |
|---|---|---|
| A Fokus im Feld, ohne Änderung, Esc → soll zu | zu, x 1-mal geklickt | zu, x 1-mal |
| B Fokus im Feld, getippt, Esc → soll Sprechblase | Sprechblase, x 1-mal | Sprechblase, x 1-mal |
| C Fokus auf Knopf, ohne Änderung → soll zu | zu | zu |
| D Fokus auf Knopf, mit Änderung → soll Sprechblase | Sprechblase | Sprechblase |
| E ⌘. im Feld, ohne Änderung → soll zu | zu | zu |
| F getippt, dann Esc viermal → Sprechblase · zu · Sprechblase · zu | ebenso | ebenso |
| G nur Tastatur (Fokus und Änderung ohne Tipp), Esc viermal | wie F | wie F |

- Bei F und G schließt jedes zweite Esc die Sprechblase, das Fenster bleibt offen. Das nächste Esc fragt wieder. Ohne Tipp geht keine Änderung verloren.
- Escape am Fenster prüft schon `tests/ablauf.mjs` (Zeile 2208: x, Häkchen und Escape).

## Ergebnis

- **v4 ist nicht betroffen**, weder in Chromium noch in WebKit. Die Vermutung aus 0002 stimmt nicht.
- Das Verhalten in 0002 kam damit aus dem Muster selbst. Die Ursache habe ich nicht gesucht. **Vermutung:** das Zusammenspiel des eigenen `cancel`-Hörers im Entwurf mit
  `x.onclick = () => anfragen(h)` (Entwurf Zeilen 232 und 280).
- Der Entwurf leitet Escape ohnehin über den Stapel (`shouldDismiss`, Grobentwurf 2.2). Das ist so gewollt und bleibt.
- Der Kommentar im Entwurf (Zeilen 278–279) nennt noch die Vermutung als Grund. Er sollte stattdessen auf den Stapel als Grund verweisen.

## Vorschlag

- **Kein Backlog-Eintrag.** v4 ist in Ordnung, und die Prüfung gibt es schon.
- Im Entwurf nur den Kommentar berichtigen. Neu: ‚Escape geht an das oberste (Grobentwurf 2.2): beim Fenster über shouldDismiss.‘ Die Code-Zeile bleibt gleich.
  Danach laufen `muster-pruefen.mjs` und `bean-katalog` in Chromium und WebKit.

Nächste Version AppDesign: 2 Punkte bereit (APD-149/J-1, APD-152). Offen im Backlog: APD-135, APD-136, APD-149, APD-148, APD-151 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150 (Prio 2) · APD-70, APD-147 (Prio 3).
