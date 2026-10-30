// AppDesign 4.13.0 · Selbsttest des Lauf-Werkzeugs (lauf.mjs, Testfall-Liste APD-5/B-1 bis APD-5/B-4, APD-5/B-8, APD-5/A-5; seit 4.42.0 APD-85/W-1 bis
// APD-85/W-10: rote Läufe einmal allein wiederholen, ‚wackelt‘, Abbruch ab dem dritten roten Lauf) mit Schein-Tests
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
// APD-85: ‚wackel‘ ist beim ersten Lauf rot, danach grün (Merkdatei); ‚rot2‘, ‚rot3‘ immer rot; ‚zeitweise‘ hängt beim ersten Lauf
const wackler = (name, ms) => writeFileSync(join(dir, 'tests', `${name}.mjs`), `import { existsSync, writeFileSync } from 'node:fs';
const f = ${JSON.stringify(join(dir, 'merk-'))} + '${name}-' + process.env.PRUEF_BROWSER; const erst = !existsSync(f); writeFileSync(f, '1');
setTimeout(() => { console.log('${name} ' + (erst ? '✗ Schein-Wackler' : 'grün')); process.exit(erst ? 1 : 0); }, erst ? ${ms} : 50);`);
const zeitweise = name => writeFileSync(join(dir, 'tests', `${name}.mjs`), `import { existsSync, writeFileSync } from 'node:fs';
const f = ${JSON.stringify(join(dir, 'merk-'))} + '${name}'; const erst = !existsSync(f); writeFileSync(f, '1');
setTimeout(() => process.exit(0), erst ? 60000 : 50);`);
const merkWeg = () => { for (const n of ['wackel', 'wackel2', 'zeitweise']) for (const b of ['', '-chromium', '-webkit']) rmSync(join(dir, `merk-${n}${b}`), { force: true }); };
wackler('wackel', 200); wackler('wackel2', 200); zeitweise('zeitweise'); schein('rot2', 300, 1); schein('rot3', 300, 1);
const pw = { chromium: { executablePath: () => process.execPath }, webkit: { executablePath: () => join(dir, 'gibt-es-nicht') } };
const url = pathToFileURL(dir + '/');
const mitschreiben = async fn => { const log = console.log, out = []; console.log = (...a) => out.push(a.join(' ')); try { return [await fn(), out.join('\n')]; } finally { console.log = log; } };

// APD-5/B-3 alles grün, Rückgabewert 0, Zeile ‚Alle N Läufe grün‘
let [rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['langsam', 'schnell', 'mittel'], argv: ['--browser', 'chromium'] }));
pruefe(rc === 0 && /Alle 3 Läufe grün/.test(out), `APD-5/B-3 alles grün: Rückgabewert ${rc}\n${out}`);
// APD-5/B-1 schnellste zuerst (nach der gemessenen Dauer des ersten Laufs) – mit einem Job nacheinander
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['langsam', 'schnell', 'mittel'], argv: ['--browser', 'chromium', '--jobs', '1'] }));
const reihe = [...out.matchAll(/✓ (\w+)/g)].map(m => m[1]).join(',');
pruefe(reihe === 'schnell,mittel,langsam', `APD-5/B-1 Reihenfolge: ${reihe}`);
pruefe(Object.keys(JSON.parse(readFileSync(join(dir, 'tests/out/dauer.json'), 'utf8'))).length === 3, 'APD-5/B-1 Dauer nicht gespeichert');
// APD-5/B-2 roter Test (seit 4.42.0, APD-85/W-3): kein Abbruch beim ersten, allein wieder rot → Rückgabewert 1, Meldung des zweiten Laufs
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['rot', 'langsam'], argv: ['--browser', 'chromium'] }));
pruefe(rc === 1 && /✗ Schein-Fehler/.test(out) && /✓ langsam/.test(out) && /allein wieder rot/.test(out) && !/wackelt/.test(out), `APD-85/W-3 allein wieder rot: Rückgabewert ${rc}\n${out}`);
// APD-85/W-1 alles grün: keine Wiederholung
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['schnell', 'mittel'], argv: ['--browser', 'chromium'] }));
pruefe(rc === 0 && !/wiederholen|wackelt/.test(out), `APD-85/W-1 alles grün ohne Wiederholung: Rückgabewert ${rc}\n${out}`);
// APD-85/W-2 rot unter Last, allein grün → ‚⚠ wackelt‘, Schlusszeile ‚davon 1 wackelt‘, Rückgabewert 0; W-10 Dauer bleibt die unter Last
merkWeg();
const dauerVor = JSON.parse(readFileSync(join(dir, 'tests/out/dauer.json'), 'utf8'));
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['wackel', 'schnell'], argv: ['--browser', 'chromium'] }));
pruefe(rc === 0 && /⚠ wackelt: wackel · chromium \(rot unter Last, allein grün\)/.test(out) && /Alle 2 Läufe grün in .* – davon 1 wackelt/.test(out), `APD-85/W-2 wackelt: Rückgabewert ${rc}\n${out}`);
const dauerNach = JSON.parse(readFileSync(join(dir, 'tests/out/dauer.json'), 'utf8'));
pruefe(dauerNach['wackel|chromium'] === dauerVor['wackel|chromium'], `APD-85/W-10 Dauer des Wiederholungslaufs gespeichert: ${dauerNach['wackel|chromium']}`);
// APD-85/W-4 drei rote Läufe: Abbruch, übrige beendet, keine Wiederholung, Rückgabewert 1
let t0 = Date.now();
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['rot', 'rot2', 'rot3', 'langsam'], argv: ['--browser', 'chromium', '--jobs', '4'] }));
pruefe(rc === 1 && !/✓ langsam/.test(out) && !/wiederholen/.test(out) && /Abbruch ab dem 3\. roten Lauf/.test(out) && Date.now() - t0 < 2000, `APD-85/W-4 Abbruch ab dem dritten: Rückgabewert ${rc}, ${Date.now() - t0} ms\n${out}`);
// APD-85/W-5 --alle: alle bis zum Ende, rote allein wiederholt, Schluss nennt Fehler und Wackler getrennt
merkWeg();
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['rot', 'rot2', 'rot3', 'wackel', 'langsam'], argv: ['--browser', 'chromium', '--alle', '--jobs', '4'] }));
pruefe(rc === 1 && /✓ langsam/.test(out) && /4 rote Läufe – einmal allein wiederholen/.test(out) && /3 Test\(s\) rot nach .* · 1 wackelt: wackel · chromium/.test(out), `APD-85/W-5 --alle: Rückgabewert ${rc}\n${out}`);
// APD-85/W-6 Gegenprobe: keine Wiederholung
merkWeg();
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['wackel'], argv: ['--browser', 'chromium', '--gegenprobe'] }));
pruefe(!/wiederholen|wackelt/.test(out), `APD-85/W-6 Gegenprobe ohne Wiederholung\n${out}`);
// APD-85/W-8 Zeitgrenze zählt wie rot und wird allein wiederholt
merkWeg();
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['zeitweise'], argv: ['--browser', 'chromium', '--zeit', '1'] }));
pruefe(rc === 0 && /Zeitgrenze|Rückgabewert/.test(out) && /⚠ wackelt: zeitweise · chromium/.test(out), `APD-85/W-8 Zeitgrenze wiederholt: Rückgabewert ${rc}\n${out}`);
// APD-85/W-9 Wiederholung erst, wenn alle übrigen fertig sind (beide Browser), einer nach dem anderen
merkWeg();
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw: { ...pw, webkit: pw.chromium }, tests: ['wackel', 'langsam'], argv: ['--jobs', '4'] }));
const zeilen = out.split('\n'), letzterLauf = Math.max(...zeilen.map((z, i) => /^[✓✗] /.test(z) ? i : -1)), ersteWdh = zeilen.findIndex(z => /^⚠ wackelt/.test(z));
pruefe(rc === 0 && ersteWdh > letzterLauf && (out.match(/⚠ wackelt/g) || []).length === 2, `APD-85/W-9 Wiederholung nach allen, einzeln: Rückgabewert ${rc}\n${out}`);
// APD-5/B-4 --alle läuft weiter und zeigt am Ende alle roten
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['rot', 'langsam'], argv: ['--browser', 'chromium', '--alle'] }));
pruefe(rc === 1 && /✓ langsam/.test(out) && /1 Test\(s\) rot/.test(out), `APD-5/B-4 --alle: Rückgabewert ${rc}\n${out}`);
// APD-5/A-5 Zeitgrenze: hängender Test wird abgebrochen und ist rot
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['haengt'], argv: ['--browser', 'chromium', '--zeit', '1'] }));
pruefe(rc === 1 && /Zeitgrenze 1 s überschritten/.test(out), `APD-5/A-5 Zeitgrenze: Rückgabewert ${rc}\n${out}`);
// APD-5/B-8 WebKit fehlt: Abbruch mit Hinweis, Rückgabewert 2, kein Test gestartet
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['schnell'] }));
pruefe(rc === 2 && /webkit fehlt/.test(out) && !/✓/.test(out), `APD-5/B-8 WebKit fehlt: Rückgabewert ${rc}\n${out}`);
// APD-11 (seit 4.16.1): Browser nacheinander – WebKit beginnt erst, wenn alle Chromium-Läufe fertig sind, auch bei freien Plätzen
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw: { ...pw, webkit: pw.chromium }, tests: ['langsam', 'schnell'], argv: ['--jobs', '4'] }));
const folge = [...out.matchAll(/✓ (\w+) · (\w+)/g)].map(m => m[2]).join(',');
pruefe(rc === 0 && folge === 'chromium,chromium,webkit,webkit' && /Browser nacheinander/.test(out), `APD-11 Browser nacheinander: ${folge}\n${out}`);
// Zwei Browser: jeder Test je Browser (WebKit hier als vorhanden nachgebildet)
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw: { ...pw, webkit: pw.chromium }, tests: ['schnell'] }));
pruefe(rc === 0 && /schnell · chromium/.test(out) && /schnell · webkit/.test(out), `APD-5/B-7 beide Browser\n${out}`);

rmSync(dir, { recursive: true, force: true });
for (const f of fehler) console.log('✗ ' + f);
console.log(fehler.length ? `lauf-selbsttest: ${fehler.length} Fehler` : 'lauf-selbsttest: alles in Ordnung');
process.exit(fehler.length ? 1 : 0);
