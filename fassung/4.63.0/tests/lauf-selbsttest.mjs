// AppDesign 4.13.0 · Selbsttest des Lauf-Werkzeugs (lauf.mjs, Testfall-Liste APD-5/B-1 bis APD-5/B-4, APD-5/B-8, APD-5/A-5; seit 4.42.0 APD-85/W-1 bis
// APD-85/W-10: rote Läufe einmal allein wiederholen, ‚wackelt‘, Abbruch ab dem dritten roten Lauf; seit 4.49.0 APD-85/Z-1, Z-2, Z-6: warteBis) mit Schein-Tests
// (schnell, langsam, rot, hängt) in einem Ordner auf Zeit. Aufruf: node tests/lauf-selbsttest.mjs (braucht kein Playwright).
// Seit 4.63.0 (APD-135 Paket 5): APD-135/Z-1 bis Z-7 – Vorlauf mit sofortigem Abbruch, die längsten zuerst, doku-regeln einmal,
// Ausgabe eines Wacklers in tests/out/wackelt-…txt, Abdeckung je Teil.
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
// APD-135/Z-5 (C-43, ersetzt APD-5/B-1 ‚schnellste zuerst‘): die längsten zuerst (nach der gemessenen Dauer des ersten Laufs) – mit einem Job nacheinander
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['schnell', 'langsam', 'mittel'], argv: ['--browser', 'chromium', '--jobs', '1'] }));
const reihe = [...out.matchAll(/✓ (\w+)/g)].map(m => m[1]).join(',');
pruefe(reihe === 'langsam,mittel,schnell', `APD-135/Z-5 Reihenfolge (die längsten zuerst): ${reihe}`);
// APD-135/Z-5: nie gemessene ganz vorne (vor dem längsten gemessenen)
schein('neu', 50, 0);
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['schnell', 'langsam', 'neu'], argv: ['--browser', 'chromium', '--jobs', '1'] }));
const reihe2 = [...out.matchAll(/✓ (\w+)/g)].map(m => m[1]).join(',');
pruefe(reihe2 === 'neu,langsam,schnell', `APD-135/Z-5 nie gemessene vorne: ${reihe2}`);
pruefe(Object.keys(JSON.parse(readFileSync(join(dir, 'tests/out/dauer.json'), 'utf8'))).length === 4, 'APD-5/B-1 Dauer nicht gespeichert (schnell, mittel, langsam, neu)');
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
// APD-135/Z-6 (C-68): die Ausgabe des roten Laufs bleibt in tests/out/wackelt-<Name>-<Browser>.txt, die Schlusszeile nennt die Datei
let wDatei = ''; try { wDatei = readFileSync(join(dir, 'tests/out/wackelt-wackel-chromium.txt'), 'utf8'); } catch {}
pruefe(/✗ Schein-Wackler/.test(wDatei) && /rot unter Last/.test(wDatei) && /davon 1 wackelt: wackel · chromium \(Ausgabe: tests\/out\/wackelt-wackel-chromium\.txt\)/.test(out),
  `APD-135/Z-6 Ausgabe des Wacklers: Datei ${wDatei ? 'ohne die Meldung' : 'fehlt'}\n${out}`);
// APD-135/Z-6 mit Teil: der Teil steht im Dateinamen (Leerzeichen → _)
merkWeg();
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: [{ name: 'wackel', teile: { 'Text 53': {} } }], argv: ['--browser', 'chromium'] }));
let wDatei2 = ''; try { wDatei2 = readFileSync(join(dir, 'tests/out/wackelt-wackel-Text_53-chromium.txt'), 'utf8'); } catch {}
pruefe(rc === 0 && /✗ Schein-Wackler/.test(wDatei2) && /Ausgabe: tests\/out\/wackelt-wackel-Text_53-chromium\.txt/.test(out), `APD-135/Z-6 Wackler mit Teil: Rückgabewert ${rc}\n${out}`);
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

// APD-135/Z-1 (C-44): Vorlauf doku-regeln rot → sofortiger Abbruch, kein weiterer Lauf, Ausgabe da, Rückgabewert 1
schein('doku-regeln', 50, 1); schein('version-regeln', 50, 0);
t0 = Date.now();
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['langsam', 'doku-regeln', 'version-regeln'], argv: ['--browser', 'chromium', '--jobs', '4'] }));
pruefe(rc === 1 && /Vorlauf rot: doku-regeln · chromium – Abbruch/.test(out) && /✗ Schein-Fehler/.test(out) && !/✓ langsam|version-regeln · chromium  /.test(out) && Date.now() - t0 < 2000,
  `APD-135/Z-1 Vorlauf doku-regeln rot: Rückgabewert ${rc}, ${Date.now() - t0} ms\n${out}`);
// APD-135/Z-1 auch mit --alle: der Vorlauf bricht ab
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['schnell', 'doku-regeln'], argv: ['--browser', 'chromium', '--alle'] }));
pruefe(rc === 1 && /Vorlauf rot/.test(out) && !/✓ schnell/.test(out), `APD-135/Z-1 Vorlauf mit --alle: Rückgabewert ${rc}\n${out}`);
// APD-135/Z-2: Vorlauf version-regeln rot (im zweiten Browser) → Abbruch vor den übrigen
schein('doku-regeln', 50, 0);
writeFileSync(join(dir, 'tests', 'version-regeln.mjs'), `console.log('version ' + process.env.PRUEF_BROWSER + (process.env.PRUEF_BROWSER === 'webkit' ? ' ✗ Schein-Fehler' : '')); process.exit(process.env.PRUEF_BROWSER === 'webkit' ? 1 : 0);`);
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw: { ...pw, webkit: pw.chromium }, tests: ['schnell', 'doku-regeln', 'version-regeln'], argv: ['--jobs', '4'] }));
pruefe(rc === 1 && /Vorlauf rot: version-regeln · webkit/.test(out) && !/✓ schnell/.test(out), `APD-135/Z-2 Vorlauf version-regeln rot: Rückgabewert ${rc}\n${out}`);
// APD-135/Z-3 (C-44, C-37): Vorlauf grün → erst doku-regeln (nur im ersten Browser) und version-regeln (je Browser), dann die übrigen
schein('version-regeln', 50, 0);
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw: { ...pw, webkit: pw.chromium }, tests: ['langsam', 'schnell', 'doku-regeln', 'version-regeln'], argv: ['--jobs', '4'] }));
const folge3 = [...out.matchAll(/✓ ([\w-]+) · (\w+)/g)].map(m => m[1] + ':' + m[2]);
pruefe(rc === 0 && folge3.slice(0, 3).join(',') === 'doku-regeln:chromium,version-regeln:chromium,version-regeln:webkit' && folge3.length === 7
  && folge3.filter(f => f.startsWith('doku-regeln')).length === 1 && /Alle 7 Läufe grün/.test(out), `APD-135/Z-3 Vorlauf zuerst, doku-regeln einmal: ${folge3.join(',')}\n${out}`);
// APD-135/Z-4: in der Gegenprobe kein Abbruch durch den Vorlauf – alle laufen
schein('doku-regeln', 50, 1);
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: ['rot', 'doku-regeln'], argv: ['--browser', 'chromium', '--gegenprobe'] }));
pruefe(!/Vorlauf/.test(out) && /✗ rot · chromium/.test(out) && /✗ doku-regeln · chromium/.test(out), `APD-135/Z-4 Gegenprobe ohne Vorlauf-Abbruch\n${out}`);
// APD-135/Z-7 (C-29): --abdeckung je Teil eine eigene Zeile (Schein-Prüfung mit pruefung().abdeckung(), PRUEF_TEIL von lauf.mjs)
writeFileSync(join(dir, 'tests', 'deckt.mjs'), `import { pruefung } from ${JSON.stringify(new URL('./pruefe.mjs', import.meta.url).href)};
const t = pruefung('deckt', {}, { out: new URL('out/', import.meta.url) }); t.ort = 'Ansicht ' + (process.env.PRUEF_TEIL || 'ohne'); t.abdeckung(); process.exit(0);`);
[rc, out] = await mitschreiben(() => lauf({ dir: url, pw, tests: [{ name: 'deckt', teile: { '': {}, Bedienungshilfen: {}, 'Text 53': {} } }], argv: ['--browser', 'chromium', '--abdeckung'] }));
pruefe(rc === 0 && /deckt · chromium +Ansicht ohne/.test(out) && /deckt \(Bedienungshilfen\) · chromium +Ansicht Bedienungshilfen/.test(out) && /deckt \(Text 53\) · chromium +Ansicht Text 53/.test(out),
  `APD-135/Z-7 Abdeckung je Teil: Rückgabewert ${rc}\n${out}`);

// APD-85 Teil 3 (seit 4.49.0, APD-85/Z-1, Z-2, Z-6): warteBis aus pruefe.mjs mit einer nachgebildeten Seite (evaluate läuft in Node,
// ein Bild = 16 ms). Z-1: Bedingung nach 50 ms wahr → zurück nach höchstens einem Bild danach (Spielraum für Node 40 ms), Rückgabe null;
// Z-2: nie wahr → nach max die Meldung mit ‚was‘, kein Hängen. Gegenprobe (Z-6): ein warteBis, das nicht wartet, muss Z-1 verletzen.
globalThis.requestAnimationFrame ??= cb => setTimeout(cb, 16);
const seite = { evaluate: (fn, a) => fn(a) };
const z1 = async (warte) => { globalThis.__z1 = false; setTimeout(() => { globalThis.__z1 = true; }, 50);
  const t0 = performance.now(), m = await warte(seite, () => globalThis.__z1, { was: 'Z-1', max: 2000 }); const ms = performance.now() - t0;
  return { ok: m === null && ms >= 48 && ms <= 50 + 16 + 40, ms: Math.round(ms), m }; };
const { warteBis } = await import('./pruefe.mjs');
let z = await z1(warteBis);
pruefe(z.ok, `APD-85/Z-1 warteBis kehrt ${z.ms} ms nach dem Start zurück (soll 50 bis 106 ms), Rückgabe ${z.m}`);
const z2 = performance.now(), m2 = await warteBis(seite, () => false, { was: 'Z-2 Menü offen', max: 300 }), ms2 = performance.now() - z2;
pruefe(/Z-2 Menü offen – nach 300 ms nicht erreicht/.test(m2 || '') && ms2 >= 290 && ms2 < 1000, `APD-85/Z-2 nie wahr: ${Math.round(ms2)} ms, Rückgabe ${m2}`);
z = await z1(async () => null);
pruefe(!z.ok, `APD-85/Z-6 Gegenprobe: ein warteBis, das nicht wartet, fällt in Z-1 nicht auf (${z.ms} ms)`);

// APD-85 Teil 6 (seit 4.59.3, APD-85/F-5): ruhe() meldet, wenn die Seite nicht zur Ruhe kommt – nachgebildete Seite, deren Bewegung nie
// endet; Gegenprobe: eine ruhige Seite gibt null zurück.
const { ruhe } = await import('./pruefe.mjs');
const unruhigeSeite = { evaluate: async () => 'läuft', waitForTimeout: () => new Promise(r => setTimeout(r, 1)) };
const f5 = await ruhe(unruhigeSeite);
pruefe(/^Seite nicht zur Ruhe gekommen \(zuletzt: läuft\)$/.test(f5 || ''), `APD-85/F-5 Bewegung endet nie: Rückgabe ${f5}`);
const ruhigeSeite = { evaluate: async () => '[0,0]', waitForTimeout: () => new Promise(r => setTimeout(r, 1)) };
const f5g = await ruhe(ruhigeSeite);
pruefe(f5g === null, `APD-85/F-5 Gegenprobe: ruhige Seite, Rückgabe ${f5g}`);

rmSync(dir, { recursive: true, force: true });
for (const f of fehler) console.log('✗ ' + f);
console.log(fehler.length ? `lauf-selbsttest: ${fehler.length} Fehler` : 'lauf-selbsttest: alles in Ordnung');
process.exit(fehler.length ? 1 : 0);
