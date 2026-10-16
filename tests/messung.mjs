// AppDesign 4.17.0 · Prüfung des Werkzeugs werkzeug/messung.mjs (A-12, Fall-Liste arbeit/A-12 Fall-Liste.md M-1 bis M-14)
// mit künstlichen Sitzungsdaten in einem Ordner auf Zeit. Aufruf: node tests/messung.mjs (braucht kein Playwright).
// Gegenprobe: node tests/messung.mjs --gegenprobe – zählt jede Zeile einzeln (Fund 2) und muss rot werden.
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, utimesSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { messe, zeile, dauer, zahl, sitzungsdatei, hauptprogramm } from '../werkzeug/messung.mjs';

const gegenprobe = process.argv.includes('--gegenprobe');
const fehler = [], pruefe = (ok, text) => { if (!ok) fehler.push(text); };
const T = s => new Date(Date.parse('2026-10-16T10:00:00Z') + s * 1000).toISOString();
let n = 0;
const nutzer = (s, text, extra = {}) => ({ type: 'user', timestamp: T(s), message: { role: 'user', content: text }, ...extra });
const ergebnis = (s, id) => ({ type: 'user', timestamp: T(s), message: { role: 'user', content: [{ type: 'tool_result', tool_use_id: id, content: 'ok' }] } });
// Eine Modell-Antwort steht auf mehreren Zeilen (je Baustein) mit derselben Kennung und denselben Token (Fund 2)
const modell = (s, bausteine, u, extra = {}) => {
  const id = gegenprobe ? undefined : `msg_${++n}`;
  return bausteine.map((b, i) => ({ type: 'assistant', timestamp: T(s + i * 0.1), uuid: `u${n}-${i}`, ...extra,
    message: { id: id ?? `msg_${n}_${i}`, role: 'assistant', content: [b], usage: { input_tokens: u[0], cache_read_input_tokens: u[1], cache_creation_input_tokens: u[2], output_tokens: u[3] } } }));
};
const frage = id => ({ type: 'tool_use', id, name: 'AskUserQuestion', input: {} });
const bash = id => ({ type: 'tool_use', id, name: 'Bash', input: {} });

// Ablauf: Start durch andere Sitzung (M-3) → Antwort 1 mit Fenster → Neustart-Hinweis (M-3) → echte Nachricht → Antwort 2 …
const daten = [
  nutzer(0, 'Starttext der Sitzung', { origin: { kind: 'task-notification' } }),
  ...modell(5, [{ type: 'thinking' }, bash('b1')], [2, 1000, 500, 100]),
  ergebnis(8, 'b1'),                                                    // M-4: Werkzeug-Ergebnis zählt nicht
  ...modell(10, [frage('f1')], [3, 2000, 100, 50]),
  nutzer(300, 'Worker neu gestartet', { isMeta: true }),               // M-3: Systemmeldung zählt nicht
  ergebnis(400, 'f1'),                                                  // Fenster 10 → 400 s beantwortet
  ...modell(405, [{ type: 'text' }], [1, 2500, 0, 20]),
  nutzer(1000, 'Hintergrund fertig', { origin: { kind: 'task-notification' } }),  // M-3
  nutzer(2000, [{ type: 'text', text: 'Bitte A-12 bauen' }]),          // echte Nachricht (Bausteine)
  ...modell(2010, [bash('b2')], [5, 3000, 200, 300]),
  { type: 'assistant', timestamp: T(2015), isSidechain: true, message: { id: 'msg_hilf', usage: { input_tokens: 10, cache_read_input_tokens: 0, cache_creation_input_tokens: 1000, output_tokens: 90 } } }, // M-12
  ergebnis(2020, 'b2'),
  ...modell(2030, [frage('f2'), frage('f3')], [1, 3500, 0, 40]),
  ergebnis(2100, 'f2'), ergebnis(2160, 'f3'),                           // M-2: zwei Fenster, 70 + 130 s Wartezeit
  { type: 'summary', summary: 'Zusammenfassung' },                     // M-13: Zeile ohne Zeitpunkt
  nutzer(2170, 'Zusammenfassung', { isCompactSummary: true }),
];

// M-6: erste Antwort einer Sitzung – keine vorige Antwort
let m = messe(daten.slice(0, 4), Date.parse(T(9)));
pruefe(m && m.token === null && zeile(m) === '<sub>⏱ 00:09 · Token vorige Antwort: –</sub>', `M-6 erste Antwort: ${m && zeile(m)}`);
// M-2/M-3: Zeit der ersten Antwort ohne Fensterzeit (10 → 400 s), Neustart-Hinweis zählt nicht
m = messe(daten.slice(0, 8), Date.parse(T(410)));
pruefe(m.ms === 20000, `M-2 Wartezeit abgezogen (erwartet 00:20): ${dauer(m.ms)}`);
// M-1/M-5/M-12: zweite Antwort – Zeit ab 2000 s, Token der ersten Antwort (je Aufruf einmal)
m = messe(daten.slice(0, 12), Date.parse(T(2025)));
pruefe(m.ms === 25000, `M-1 Zeit ab letzter Nachricht (erwartet 00:25): ${dauer(m.ms)}`);
const neu = (2 + 100) + (3 + 50) + (1 + 20);
pruefe(m.token && m.token.neu === neu && m.token.gelesen === 5500 && m.token.geschrieben === 600,
  `M-5 Token vorige Antwort (je Aufruf einmal, erwartet ${neu}/5500/600): ${JSON.stringify(m.token)}`);
// M-2 zwei Fenster, M-13 Zusammenfassung und Zeile ohne Zeitpunkt, M-14 Aufruf mitten in der Antwort
m = messe(daten, Date.parse(T(2200)));
pruefe(dauer(m.ms) === '00:00', `M-2 zwei Fenster, 200 s Wartezeit (erwartet 00:00): ${dauer(m.ms)}`);
m = messe(daten, Date.parse(T(2300)));
pruefe(dauer(m.ms) === '01:40', `M-2/M-13 (erwartet 01:40): ${dauer(m.ms)}`);
m = messe(daten.slice(0, 14), Date.parse(T(2060)));                       // Fenster f2 noch offen
pruefe(m.ms === 60000, `M-14 mitten in der Antwort, Fenster offen (erwartet 01:00): ${dauer(m.ms)}`);
// M-10/M-11 Darstellung
pruefe(dauer(3599000) === '59:59' && dauer(3600000) === '01:00:00' && dauer(7384000) === '02:03:04', 'M-10 hh:mm:ss ab 60 Minuten');
pruefe(zahl(0) === '0' && zahl(999) === '999' && zahl(1234) === '1.234' && zahl(1234567) === '1.234.567', 'M-11 Tausenderpunkt');

// M-7/M-8/M-9 Dateien
const dir = mkdtempSync(join(tmpdir(), 'messung-'));
const schreibe = (pfad, zeilen, alter) => { writeFileSync(pfad, zeilen.map(z => typeof z === 'string' ? z : JSON.stringify(z)).join('\n') + '\n'); utimesSync(pfad, alter, alter); };
mkdirSync(join(dir, '-home-user-AppDesign')); mkdirSync(join(dir, '-home-user'));
schreibe(join(dir, '-home-user-AppDesign/abc.jsonl'), daten.slice(0, 4), 1000);
schreibe(join(dir, '-home-user/abc.jsonl'), daten, 2000);
schreibe(join(dir, '-home-user/andere.jsonl'), daten, 3000);
pruefe(sitzungsdatei('abc', dir) === join(dir, '-home-user/abc.jsonl'), `M-7 zuletzt geänderte Datei der Sitzung: ${sitzungsdatei('abc', dir)}`);
pruefe(sitzungsdatei(undefined, dir) === join(dir, '-home-user/andere.jsonl'), 'M-8 ohne Kennung: neueste Datei');
pruefe(sitzungsdatei('abc', join(dir, 'fehlt')) === null, 'M-9 kein Ordner → null');
const mitschreiben = fn => { const log = console.log, err = console.error, out = []; console.log = console.error = (...a) => out.push(a.join(' ')); try { return [fn(), out.join('\n')]; } finally { console.log = log; console.error = err; } };
let [rc, out] = mitschreiben(() => hauptprogramm(['--datei', join(dir, 'fehlt.jsonl')], {}));
pruefe(rc === 1 && /keine Sitzungsdaten/.test(out) && !/⏱/.test(out), `M-9 fehlende Datei: Rückgabewert ${rc}\n${out}`);
schreibe(join(dir, 'kaputt.jsonl'), [...daten.slice(0, 4), '{kaputt', ...daten.slice(4, 12)], 1000);
[rc, out] = mitschreiben(() => hauptprogramm(['--datei', join(dir, 'kaputt.jsonl'), '--jetzt', T(2025)], {}));
pruefe(rc === 0 && /1 unlesbare Zeile/.test(out) && out.includes(`<sub>⏱ 00:25 · Token vorige Antwort: ${neu} neu · 5.500 aus Zwischenspeicher · 600 geschrieben</sub>`),
  `M-9 kaputte Zeile übersprungen und genannt\n${out}`);
// M-12 Nebenstrang im Ordner subagents wird mitgezählt
mkdirSync(join(dir, 'neben/subagents'), { recursive: true });
schreibe(join(dir, 'neben.jsonl'), [...daten.slice(0, 8), daten[8], nutzer(2600, 'nächste Nachricht')], 1000);
schreibe(join(dir, 'neben/subagents/agent-1.jsonl'), [{ type: 'assistant', timestamp: T(2050), isSidechain: true, message: { id: 'msg_neben', usage: { input_tokens: 0, cache_read_input_tokens: 7, cache_creation_input_tokens: 0, output_tokens: 0 } } }], 1000);
[rc, out] = mitschreiben(() => hauptprogramm(['--datei', join(dir, 'neben.jsonl'), '--jetzt', T(2601)], {}));
pruefe(rc === 0 && out.includes(`${neu} neu · 5.507 aus Zwischenspeicher · 600 geschrieben`), `M-12 Nebenstrang mitgezählt\n${out}`);
// M-3 nur Starttext einer anderen Sitzung → ab Starttext
[rc, out] = mitschreiben(() => hauptprogramm(['--datei', join(dir, '-home-user-AppDesign/abc.jsonl'), '--jetzt', T(9)], {}));
pruefe(rc === 0 && /⏱ 00:09 · Token vorige Antwort: –/.test(out), `M-3 Start durch andere Sitzung\n${out}`);

rmSync(dir, { recursive: true, force: true });
for (const f of fehler) console.log('✗ ' + f);
console.log(fehler.length ? `messung${gegenprobe ? ' (Gegenprobe)' : ''}: ${fehler.length} Fehler` : `messung${gegenprobe ? ' (Gegenprobe)' : ''}: alles in Ordnung`);
process.exit(gegenprobe ? (fehler.length ? 0 : 1) : (fehler.length ? 1 : 0));
