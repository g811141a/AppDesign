// AppDesign 4.13.0 · Selbsttest des Lauf-Werkzeugs (lauf.mjs, Fall-Liste A-05 B-1 bis B-4, B-8, A-5) mit Schein-Tests
// (schnell, langsam, rot, hängt) in einem Ordner auf Zeit. Aufruf: node tests/lauf-selbsttest.mjs (braucht kein Playwright).
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { lauf } from './lauf.mjs';

const fehler = [], pruefe = (ok, text) => { if (!ok) fehler.push(text); };
const dir = mkdtempSync(join(tmpdir(), 'lauf-')); mkdirSync(join(dir, 'tests'));
const schein = (name, ms, rc) => writeFileSync(join(dir, 'tests', `${name}.mjs`),
  `setTimeout(() => { console.log('${name} ' + process.env.PRUEF_BROWSER${rc ? ` + ' ✗ Schein-Fehler'` : ''}); process.exit(${rc}); }, ${ms});`);
schein('schnell', 100, 0); schein('mittel', 600, 0); schein('langsam', 2500, 0); schein('rot', 300, 1); schein('haengt', 60000, 0);
const pw = { chromium: { executablePath: () => process.execPath }, webkit: { executablePath: () => join(dir, 'gibt-es-nicht') } };
const url = pathToFileURL(dir + '/');
const mitschreiben = async fn => { const log = console.log, out = []; console.log = (...a) => out.push(a.join(' ')); try { return [await fn(), out.join('\n')]; } finally { console.log = log; } };

// B-3 alles grün, Rückgabewert 0, Zeile ‚Alle N Läufe grün‘
let [rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['langsam', 'schnell', 'mittel'], argv: ['--browser', 'chromium'] }));
pruefe(rc === 0 && /Alle 3 Läufe grün/.test(out), `B-3 alles grün: Rückgabewert ${rc}\n${out}`);
// B-1 schnellste zuerst (nach der gemessenen Dauer des ersten Laufs) – mit einem Job nacheinander
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['langsam', 'schnell', 'mittel'], argv: ['--browser', 'chromium', '--jobs', '1'] }));
const reihe = [...out.matchAll(/✓ (\w+)/g)].map(m => m[1]).join(',');
pruefe(reihe === 'schnell,mittel,langsam', `B-1 Reihenfolge: ${reihe}`);
pruefe(Object.keys(JSON.parse(readFileSync(join(dir, 'tests/out/dauer.json'), 'utf8'))).length === 3, 'B-1 Dauer nicht gespeichert');
// B-2 roter Test: übrige werden beendet, Rückgabewert 1, Fehlerzeile des roten Tests wird gezeigt
let t0 = Date.now();
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['rot', 'langsam'], argv: ['--browser', 'chromium'] }));
pruefe(rc === 1 && /✗ Schein-Fehler/.test(out) && !/✓ langsam/.test(out) && Date.now() - t0 < 2000, `B-2 Abbruch: Rückgabewert ${rc}, ${Date.now() - t0} ms\n${out}`);
// B-4 --alle läuft weiter und zeigt am Ende alle roten
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['rot', 'langsam'], argv: ['--browser', 'chromium', '--alle'] }));
pruefe(rc === 1 && /✓ langsam/.test(out) && /1 Test\(s\) rot/.test(out), `B-4 --alle: Rückgabewert ${rc}\n${out}`);
// A-5 Zeitgrenze: hängender Test wird abgebrochen und ist rot
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['haengt'], argv: ['--browser', 'chromium', '--zeit', '1'] }));
pruefe(rc === 1 && /Zeitgrenze 1 s überschritten/.test(out), `A-5 Zeitgrenze: Rückgabewert ${rc}\n${out}`);
// B-8 WebKit fehlt: Abbruch mit Hinweis, Rückgabewert 2, kein Test gestartet
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['schnell'] }));
pruefe(rc === 2 && /webkit fehlt/.test(out) && !/✓/.test(out), `B-8 WebKit fehlt: Rückgabewert ${rc}\n${out}`);
// Zwei Browser: jeder Test je Browser (WebKit hier als vorhanden nachgebildet)
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw: { ...pw, webkit: pw.chromium }, tests: ['schnell'] }));
pruefe(rc === 0 && /schnell · chromium/.test(out) && /schnell · webkit/.test(out), `B-7 beide Browser\n${out}`);

rmSync(dir, { recursive: true, force: true });
for (const f of fehler) console.log('✗ ' + f);
console.log(fehler.length ? `lauf-selbsttest: ${fehler.length} Fehler` : 'lauf-selbsttest: alles in Ordnung');
process.exit(fehler.length ? 1 : 0);
