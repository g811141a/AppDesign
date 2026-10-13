# HIG- und Regel-Prüfung

`hig.mjs` misst eine App-Ansicht gegen die HIG-Checkliste (Designrichtlinie allgemein, Abschnitt 16):
Antippflächen, Schriftgrößen, Kontraste (hell und dunkel), doppelte Anführungszeichen, Löschen am Ende
von Menüs, keine Linien zwischen Menüpunkten, gedrückte Schaltfläche bleibt blau.

Jede App hat ein eigenes Prüfskript (z. B. `ReiseLogBuch/tests/hig.mjs`), das ihre Ansichten durchgeht
und diese Prüfung einbindet:

```js
import { createCheck } from '../../AppDesign/tests/hig.mjs';
const hig = createCheck({ skipTargets: [/* bewusste Abweichungen der App als Selektoren */] });
await hig.measure(page, 'Mehr-Menü (hell quer)');
process.exit(hig.report());
```

AppDesign liegt dazu neben dem App-Repo; Playwright wird im Ordner `tests/` der App installiert.


Seit 4.6.0 prüft `hig.mjs` zusätzlich alle automatisch prüfbaren Regeln des Regelkatalogs
(Designrichtlinie allgemein, Abschnitt 17, R-01 …) in jeder Ansicht; Funde erscheinen als ‚Regel: R-xx …‘.

## Weitere allgemeine Prüfungen

Jede App bindet sie in eigene Prüfskripte ein (Beispiele in `ReiseLogBuch/tests/`):

| Datei | Regeln | Prüft |
|---|---|---|
| `abgleich.mjs` | R-41 bis R-44 | alle Fälle des Abgleichs in beide Richtungen, kurzes Fenster und Abgleichbericht |
| `backup.mjs` | R-45, R-46 | Backup erstellen und laden (Menü, Abfrage mit Kacheln, Abbrechen, unlesbare Datei) |
| `kontextmenue.mjs` | R-40 | Kontextmenü jeder sichtbaren Kachel und des letzten Eintrags, ganz sichtbar, über der Backup-Kachel |
| `version.mjs` | R-48 (seit 4.11.0) | `?v=` in `index.html` und `sw.js`, gleiche Versionen, Hinweis beim Start bei älterer Fassung |
