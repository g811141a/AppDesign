# APD-149 – neue Teile der Schnittstelle bestätigen (Sitzung AppDesign 0004)

**27.11.2026** · Übergabe `arbeit/APD-149 Uebergabe.md` Abschnitt 3 Nr. 3: vor `v5/` bestätigen. Die Teile sind neu gegenüber dem Grobentwurf und stehen im Muster (`katalog/entwurf/presentation-commands.js`, im Katalog unter ‚Schnittstelle‘). Keine Änderung.

| Teil | Was es tut (aus dem Muster) | Vorbild für den Namen (Zusammenarbeit 1) |
|---|---|---|
| `commands.toolbar(element, ids, { label })` | baut die Kopfzeile aus Befehlen und Menüs; bei offenem Menü wirkt jede andere Schaltfläche beim ersten Tipp (H-6, J-3) | Rolle `toolbar` (ARIA) bzw. UIKit `UIToolbar` |
| `commands.items(id, { place, ctx })` | die Einträge eines Menüs für den Ort `menu`, `context` oder `swipe` – gedimmt im Menü, fehlt im Kontextmenü und beim Wischen, Zerstörendes rot zuletzt (H-7) | UIKit `UIToolbar.items` und `UIMenu.children` |
| `commands.context` | der Zustand der App, den `validate` und `execute` bekommen (z. B. `{ selection }`) | – (eigener Name) |
| Option `from` bei `present` | der neue Eintrag übernimmt die Quelle eines offenen Eintrags. Beispiel: das Hinweisfenster ‚Teilen‘ nach dem Teilen-Menü, ‚Ausgabe‘ bleibt blau (Zeilen 260, 415) | – (eigener Name) |
| Option `dirty` bei `present('sheet')` | eine Funktion, die sagt, ob im Fenster etwas geändert wurde; dann fragt die Sprechblase vor dem Schließen (heute `dlgDirty` in v4) | – (Apple: `isModalInPresentation`; ‚dirty‘ ist im Web üblich) |
| Option `align` bei `present('menu')` | Lage des Menüs: `right` (unter der Schaltfläche, Standard) oder `beside` (neben dem Eintrag, Kontextmenü) | CSS `align`, Apple: `permittedArrowDirections` |
| Ereignis `reject` | eine zweite laufende Aktion wurde abgelehnt (H-8), mit `{ kind, command }` | – (Gegenstück zu `change`) |

**Einschätzung:** Alle Teile hat das Muster gebraucht und am Gerät gezeigt (Schritte 1 bis 16 ok, Sitzung 0003). Die Namen folgen, wo es geht, einem Vorbild. Eigene Namen sind `context`, `from`, `dirty` und `reject`.

**Empfehlung:** So bestätigen. Kommt mit APD-151/J-1 die Option für die Stufen dazu (Vorbild `detents`), wird sie mit jenem Muster bestätigt.

## Entschieden (Nutzer 27.11.2026, Sitzung AppDesign 0004, im Fenster)

- **APD-149/J-8:** Die Teile oben sind für `v5/` bestätigt: `commands.toolbar`, `commands.items`, `commands.context`, die Optionen `from`, `dirty` und `align` bei `present` und das Ereignis `reject`.

Nächste Version AppDesign (mit `v5/`): 3 Punkte bereit (APD-149/J-1, APD-152, APD-153). Offen im Backlog: APD-135, APD-136, APD-149, APD-148, APD-151, APD-154 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150, APD-155 (Prio 2) · APD-70, APD-147, APD-156 (Prio 3).
