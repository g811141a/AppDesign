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

## Prüfskripte melden Fehler `pruefe.mjs` (seit 4.13.0, A-05)

Gemeinsamer Baustein für jedes Prüfskript einer App: Sollwerte statt ausgegebener Werte, Rückgabewert 1 bei jedem Fehler
(auch bei Skriptfehlern der Seite), Browser nach `PRUEF_BROWSER` (chromium | webkit), gemeinsame Ansichten (`ANSICHTEN`:
iPad quer und hoch, iPhone hoch und quer, je hell oder dunkel) und die **Grundregeln nach jedem Schritt**: `schritt()` führt
eine Handlung aus und misst danach mit `hig.measure(…, { schnell: true })` – dieselben Prüfungen wie `hig.mjs`, ohne Drehen,
erst wenn die Seite ruht (`ruhe`: keine Animation, Fenster und Menüs bewegen sich nicht mehr).

```js
import * as pw from 'playwright';
import { pruefung } from '../../AppDesign/tests/pruefe.mjs';
import { createCheck } from '../../AppDesign/tests/hig.mjs';
const t = pruefung('ablauf-fenster', pw, { hig: createCheck(), out: new URL('out/', import.meta.url) });
const b = await t.browser(); const p = await t.seite(b, 'iPad quer', { theme: 'dark' });
await t.schritt(p, 'Mehr-Menü', () => p.click('#mainMore'));
t.ist('Mehr-Menü', await p.locator('.menu .mi').allTextContents(), ['Alle Tage', /Darstellung/], 'R-4.1');   // Wert, RegExp, Funktion, Liste
t.liste(await checkSync(p));                                                                                 // Meldungen allgemeiner Prüfungen
await t.ende(b);
```

Meldung: `✗ R-4.1 webkit · iPad quer dunkel · Mehr-Menü: … – ist …, soll …`. Safari nachgebildet: kein Fokus beim Antippen
einer Schaltfläche (Chromium und das Linux-WebKit setzen ihn). **Gegenprobe:** `PRUEF_GEGENPROBE=1` macht den ersten Vergleich
absichtlich falsch, `PRUEF_GEGENPROBE=grundregeln` legt beim ersten Schritt zu breiten Text in den Vordergrund (R-6.3) – der
Test muss rot werden.

## Alle Prüfungen einer App `lauf.mjs` (seit 4.13.0, A-05)

Startet alle Prüfskripte parallel (Standard 2 × Kerne), die schnellsten zuerst (gemessene Dauer in `tests/out/dauer.json`
der App), in Chromium und WebKit; beim ersten roten Test werden die übrigen beendet und seine Fehlerzeilen gezeigt.
Aufruf über `tests/alle.mjs` der App: `node tests/alle.mjs [--alle] [--browser chromium] [--nur hig] [--abdeckung]
[--gegenprobe [grundregeln]] [--jobs N] [--zeit S]`. Fehlt WebKit, bricht der Lauf mit Hinweis ab (Rückgabewert 2) – nie
stillschweigend nur Chromium. WebKit einmalig: `npx playwright install webkit` und `npx playwright install-deps webkit`
(im Setup-Skript der Umgebung ‚Standard‘ eingetragen). Lange Prüfungen lassen sich teilen (`teile`, z. B. hig nach
Darstellung). Selbsttest mit Schein-Tests: `node tests/lauf-selbsttest.mjs` (in AppDesign).

## Weitere allgemeine Prüfungen

| Datei | Regeln | Prüft |
|---|---|---|
| `ablauf.mjs` (seit 4.12.0) | R-2.3, R-4.4, R-5.2, R-5.3, R-6.4 | Abläufe mit Handlung: Suche (`checkSearch`), Fenster-Kopfzeile (`checkDialogHead`), Großbuchstaben (`checkCapital`), Fehlermeldungen (`checkFieldErrors`), Vorschau (`checkPreview`) |
| `abgleich.mjs` | R-9.2 bis R-9.4 | alle Fälle des Abgleichs in beide Richtungen, kurzes Fenster und Abgleichbericht |
| `backup.mjs` | R-9.1, R-9.2 | Backup erstellen und laden (Menü, Abfrage mit Kacheln, Abbrechen, unlesbare Datei) |
| `kontextmenue.mjs` | R-4.2 | Kontextmenü jeder sichtbaren Kachel und des letzten Eintrags, ganz sichtbar, über der Backup-Kachel |
| `doku.mjs` | R-10.4, Zusammenarbeit 7, Katalog | README mit ‚Verwendete Versionen‘ (seit 4.14.0: Links nach AppDesign auf die Markierung `vX.Y.Z` der Fassung, Richtlinien-Versionen aus dieser Markierung), Prüfliste beginnt mit /0; `checkCatalog` (seit 4.12.0): jede Regel hat eine Prüfung, alte Nummern zugeordnet und nirgends mehr verwendet; `checkCollab` (seit 4.14.0 auch W-4: kein ‚gilt sofort für alle Apps‘, kein `?v=`) |
| `version.mjs` | R-10.3 | seit 4.14.0 feste Fassung: `index.html` und `sw.js` laden genau `fassung/<AD_NEEDED>/` (ohne `?v=`, nichts aus `v4/`), Versionen der Fassung stimmen, Prüfsummen `fassung/PRUEFSUMMEN` (keine Datei geändert, fehlt oder dazu), `v4/` und `tests/` = neueste Fassung; Hinweis beim Start bei älterer Fassung; ein geänderter Arbeitsstand `v4/` erreicht die App nicht (kein Abruf) |

## Feste Fassung (seit 4.14.0)

Die Prüfskripte einer App binden die Prüfungen **ihrer** Fassung ein: `import … from '../../AppDesign/fassung/X.Y.Z/tests/pruefe.mjs'`
(das Veröffentlichungs-Skript setzt die Pfade mit `vorbereiten`). Nach Änderungen an `v4/` oder `tests/` vor dem
Veröffentlichen `node werkzeug/veroeffentlichen.mjs fassung` – sonst meldet `version.mjs` die Abweichung. Ist eine Fassung
mit `los` veröffentlicht (Markierung `vX.Y.Z`), ist sie unveränderlich. Richtlinien-Versionen liest `doku.mjs` aus der
Markierung; in einer flachen Kopie ohne Markierungen einmal `git fetch --depth 1 origin tag vX.Y.Z`.

**Erst rot, dann grün:** Jede neue Prüfung wird einmal mit einem eingebauten Fehler laufen gelassen und muss ihn melden.
