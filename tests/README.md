# Prüfungen des Regelkatalogs

Die Dateien in `tests/` prüfen alle Regeln des Regelkatalogs (Designrichtlinie allgemein, Abschnitt 17, R-1.1 …) –
**je Regel genau eine Prüfung**; jede Meldung beginnt mit ihrer Regelnummer (seit 4.12.0). Jede App bindet sie in
eigene Prüfskripte ein (Beispiele in `ReiseLogBuch/tests/`); AppDesign liegt dazu neben dem App-Repo, Playwright wird
im Ordner `tests/` der App installiert.

## HIG- und Regel-Prüfung `hig.mjs`

Misst jede Ansicht gegen die HIG-Checkliste (Abschnitt 16) und alle Regeln mit ‚hig.mjs‘ im Katalog: Antippflächen
(R-3.1), Schrift und Kontrast hell und dunkel (R-10.2), Anführungszeichen (R-10.1), Menüs (R-4.1), gedrückte
Schaltfläche bleibt blau (R-3.3) usw.; dazu automatisch beim Drehen (R-8.1), Leisten beim Wischen (`barStill`, R-2.1)
und der Gerätevergleich iPad ↔ iPhone (`shape`, R-1.1).

```js
import { createCheck } from '../../AppDesign/tests/hig.mjs';
const hig = createCheck({ skipTargets: [/* bewusste Abweichungen der App als Selektoren */] });
await hig.measure(page, 'Mehr-Menü (hell quer)');
process.exit(hig.report());
```

## Weitere allgemeine Prüfungen

| Datei | Regeln | Prüft |
|---|---|---|
| `ablauf.mjs` (seit 4.12.0) | R-2.3, R-4.4, R-5.2, R-5.3, R-6.4 | Abläufe mit Handlung: Suche (`checkSearch`), Fenster-Kopfzeile (`checkDialogHead`), Großbuchstaben (`checkCapital`), Fehlermeldungen (`checkFieldErrors`), Vorschau (`checkPreview`) |
| `abgleich.mjs` | R-9.2 bis R-9.4 | alle Fälle des Abgleichs in beide Richtungen, kurzes Fenster und Abgleichbericht |
| `backup.mjs` | R-9.1, R-9.2 | Backup erstellen und laden (Menü, Abfrage mit Kacheln, Abbrechen, unlesbare Datei) |
| `kontextmenue.mjs` | R-4.2 | Kontextmenü jeder sichtbaren Kachel und des letzten Eintrags, ganz sichtbar, über der Backup-Kachel |
| `doku.mjs` | R-10.4, Zusammenarbeit 7, Katalog | README mit ‚Verwendete Versionen‘, Prüfliste beginnt mit /0; `checkCatalog` (seit 4.12.0): jede Regel hat eine Prüfung, alte Nummern zugeordnet und nirgends mehr verwendet |
| `version.mjs` | R-10.3 | `?v=` in `index.html` und `sw.js`, gleiche Versionen, Hinweis beim Start bei älterer Fassung |

**Erst rot, dann grün:** Jede neue Prüfung wird einmal mit einem eingebauten Fehler laufen gelassen und muss ihn melden.
