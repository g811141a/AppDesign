# HIG-Prüfung

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
