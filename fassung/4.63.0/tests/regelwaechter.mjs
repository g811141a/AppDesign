// AppDesign 4.54.0 · Prüfung des Regelwächters werkzeug/regelwaechter.mjs (APD-84/M-3, Testfall-Liste arbeit/APD-84 APD-83 Testfall-Liste.md
// APD-84/W-1 bis W-13) mit künstlichen Sitzungsdaten in einem Ordner auf Zeit und den echten Antworten aus 0050 und 0051
// (tests/regelwaechter-faelle.json). Aufruf: node tests/regelwaechter.mjs (braucht kein Playwright).
// Gegenprobe: node tests/regelwaechter.mjs --gegenprobe – je W-1 bis W-7 und W-14 wird genau diese Prüfung im Wächter abgeschaltet
// (REGELWAECHTER_AUS); die Prüfung muss jedes Mal rot werden.
import { mkdtempSync, writeFileSync, readFileSync, rmSync, existsSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { fuehreAus, uhrzeitzeile, uhr, setupText, SOLL_MODELL } from '../werkzeug/regelwaechter.mjs';
// seit 4.45.0: W-14 Kontextstand vor jedem Fenster (APD-99, Testfall-Liste arbeit/APD-99 Testfall-Liste.md C-1 bis C-13)
// seit 4.48.0: W-14 Rückfall, wenn der Satz nicht prüfbar ist (APD-103, Testfall-Liste arbeit/APD-103 Testfall-Liste.md D-1 bis D-9)
// seit 4.50.0: W-15 Link und Schritte im Chat vor einem Fenster mit Link (APD-110, Testfall-Liste arbeit/APD-110 Testfall-Liste.md L-1 bis L-13;
// L-1 nach der Antwort aus Sitzung 0076, 17:14, nachgebaut – die Sitzungsdatei liegt nicht im Repo)
// seit 4.51.0: W-16 Kontext in der Bau-Frage, W-17 ein Fenster je Antwort (APD-114, Testfall-Liste arbeit/APD-114 Testfall-Liste.md B-1 bis B-12;
// B-11 und B-12 nach der Antwort aus Sitzung 0080, 12:12 bis 12:15, nachgebaut); seit 4.53.0 (APD-113, Testfall-Liste arbeit/APD-113 Push und Kontext
// Wortlaut und Testfall-Liste.md H-1 bis H-9): W-16 für jede Frage, W-17 erlaubt ein weiteres Fenster nach einem Werkzeug (messung.mjs zählt nicht)
// seit 4.54.0 (APD-113 Teil (6), Testfall-Liste arbeit/APD-113 Teil 6 Testfall-Liste.md M-1 bis M-17; ersetzt APD-110/L-1 bis L-13 und APD-114/B-9):
// W-15 lehnt jedes Fenster mit Link ab und prüft die letzte Ausgabe nach ‚… anzeigen?‘, W-4 ohne Grenze und ab der letzten Meldung bzw.
// Zurückweisung, W-17 zählt einen Aufruf mit messung.mjs und etwas anderem sowie eine Zurückweisung als Werkzeug. Nachgebaut nach den Antworten
// aus 0086 (00:30, 00:31, 19:00, 19:22, 19:27) und 0087 (00:42) – die Sitzungsdateien liegen nicht im Repo. Gegenprobe M-12: je Teil abgeschaltet.

const ordner = mkdtempSync(join(tmpdir(), 'regelwaechter-'));
const WAECHTER = fileURLToPath(new URL('../werkzeug/regelwaechter.mjs', import.meta.url));
const T0 = Date.parse('2026-10-26T13:00:00Z');                       // 14:00 deutscher Zeit
const iso = s => new Date(T0 + s * 1000).toISOString();
let n = 0, datei = 0;
const nachricht = (s, text = 'Bitte bauen') => ({ type: 'user', uuid: `n${++n}`, timestamp: iso(s), message: { role: 'user', content: text } });
const bausteine = (s, content, model = SOLL_MODELL) => ({ type: 'assistant', uuid: `a${++n}`, timestamp: iso(s), message: { id: `msg_${n}`, model, role: 'assistant', content } });
const ausgabe = (s, text, model) => bausteine(s, [{ type: 'text', text }], model);
const werkzeug = (s, id, name, input = {}) => bausteine(s, [{ type: 'tool_use', id, name, input }]);
const ergebnis = (s, id, content) => ({ type: 'user', uuid: `e${++n}`, timestamp: iso(s), message: { role: 'user', content: [{ type: 'tool_result', tool_use_id: id, content }] } });
const UZ = (jetzt, vorher) => uhrzeitzeile(jetzt, vorher);
const Z = '<sub>⏱ 01:00 · Token vorige Antwort: 1.000 neu · 2.000 aus Zwischenspeicher · 300 geschrieben · Kontext 120.000</sub>';
const option = (label) => ({ label, description: 'Grund' });
const frage = (labels, question = 'Soll ich Version 4.39.0 mit APD-84 erstellen? (Kontext 120.000)') => ({ questions: [{ question, header: 'Version', multiSelect: false, options: labels.map(option) }] });
const GUT = ['Ja (Empfohlen)', 'Nein', 'Ich schreibe im Chat'];
const KS = 'Der Kontextstand ist jetzt Kontext 120.000 (aus `messung.mjs`).';

// W-8: regelgerechte Antwort – Uhrzeit abgelesen, Arbeit, Zwischenmeldung, Fenster, Antwort im Fenster, Zeitzeile aus messung.mjs,
// Zusammenfassung; jeder Teil lässt sich für einen Fall ersetzen
function antwort({ erste, zwischen, fenster = frage(GUT), ohneFenster = false, schluss, messung = Z, messungVorFenster = false, messungDavor = Z, ohneMessungDavor = false, ohneKontext = false } = {}) {
  return [
    nachricht(0),
    werkzeug(5, 'b1', 'Bash', { command: 'TZ=Europe/Berlin date +%H:%M' }), ergebnis(6, 'b1', '14:00'),
    ausgabe(10, erste ?? `${UZ('14:00', null)}\n\nIch prüfe jetzt den Stand.`),
    werkzeug(70, 'b2', 'Bash', { command: 'node tests/alle.mjs' }), ergebnis(130, 'b2', 'ok'),
    ...(ohneMessungDavor ? [] : [werkzeug(131, 'mk', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(132, 'mk', `ℹ messung: ab …\n${messungDavor}`)]),
    ausgabe(135, (zwischen ?? `${UZ('14:02', '14:00')}\n\nDie Prüfungen sind grün, jetzt die Frage.`) + (ohneKontext ? '' : `\n\n${KS}`)),
    ...(messungVorFenster ? [werkzeug(138, 'm0', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(139, 'm0', `ℹ messung: ab …\n${messung}`)] : []),
    ...(ohneFenster ? [] : [werkzeug(140, 'f1', 'AskUserQuestion', fenster), ergebnis(400, 'f1', 'Ja (Empfohlen)')]),
    ...(messungVorFenster ? [] : [werkzeug(405, 'm1', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(406, 'm1', `ℹ messung: ab der Nachricht vom …\n${messung}`)]),
    ausgabe(410, schluss ?? `${UZ('14:06', '14:02')}\n\nDu hast Ja gewählt – ich baue.\n\n${Z}`),
  ];
}

const schreibe = zeilen => { const f = join(ordner, `sitzung-${++datei}.jsonl`); writeFileSync(f, zeilen.map(z => JSON.stringify(z)).join('\n') + '\n'); return f; };
const hook = (befehl, zeilen, { env = {}, jetzt = T0 + 420000, eingabe = {} } = {}) =>
  fuehreAus(befehl, { session_id: `s${datei + 1}`, transcript_path: zeilen && schreibe(zeilen), ...eingabe }, { env: { REGELWAECHTER_ORDNER: ordner, ...env }, jetzt });
const meldungen = r => r?.decision === 'block' ? r.reason.split('\n').filter(z => /^- W-\d/.test(z)).map(z => z.slice(2)) : [];

function lauf(env = {}) {
  const fehler = [], pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const stop = (zeilen, o = {}) => meldungen(hook('stop', zeilen, { env, ...o }));
  const genau = (m, nr, text) => pruefe(m.length && m.every(x => x.startsWith(nr)), `${nr} ${text}: ${m.join(' | ') || 'nicht zurückgewiesen'}`);
  // W-8 regelgerecht
  let m = stop(antwort());
  pruefe(!m.length, `W-8 regelgerechte Antwort wird zurückgewiesen: ${m.join(' | ')}`);
  // W-1 ohne Uhrzeitzeile
  genau(stop(antwort({ zwischen: 'Die Prüfungen sind grün, jetzt die Frage.' })), 'W-1', 'Zwischenmeldung ohne Uhrzeitzeile');
  // W-2 Uhrzeit geschätzt: 3 min in der Zukunft (wie 0050 ‚14:09‘), 2 min alt; abgelesen eine Minute vor der Ausgabe ist richtig
  genau(stop(antwort({ zwischen: `${UZ('14:05', '14:00')}\n\nGeschätzt.`, schluss: `${UZ('14:06', '14:05')}\n\nZusammenfassung.\n\n${Z}` })), 'W-2', 'Uhrzeit in der Zukunft');
  genau(stop(antwort({ zwischen: `${UZ('14:00', '14:00')}\n\nAlt.` })), 'W-2', 'Uhrzeit vor dem Anlass der Ausgabe');
  m = stop(antwort({ schluss: `${UZ('14:05', '14:02')}\n\nZusammenfassung.\n\n${Z}` }));
  pruefe(!m.length, `W-2 abgelesen in der Minute vor der Ausgabe (14:05 statt 14:06) wird zurückgewiesen: ${m.join(' | ')}`);
  // W-3 Zeitabstand: zu groß bzw. ‚–‘ trotz voriger Uhrzeitzeile; kleiner ist erlaubt (fehlende Ausgabe in der Sitzungsdatei)
  genau(stop(antwort({ zwischen: `${UZ('14:02', '13:57')}\n\nZu groß.` })), 'W-3', 'Zeitabstand größer als seit der vorigen Uhrzeitzeile');
  genau(stop(antwort({ zwischen: `${UZ('14:02', null)}\n\nStrich.` })), 'W-3', '‚–‘ trotz voriger Uhrzeitzeile');
  m = stop(antwort({ zwischen: `${UZ('14:02', '14:01')}\n\nKleiner.` }));
  pruefe(!m.length, `W-3 kleinerer Zeitabstand (Uhrzeitzeile dazwischen nicht in der Sitzungsdatei) wird zurückgewiesen: ${m.join(' | ')}`);
  // W-4 ohne Fenster; die Übergabe ohne Fenster ist richtig
  genau(stop(antwort({ ohneFenster: true, schluss: `${UZ('14:06', '14:02')}\n\nSag Bescheid, wann ich bauen soll.\n\n${Z}` })), 'W-4', 'Antwort ohne Fenster');
  m = stop(antwort({ ohneFenster: true, schluss: `${UZ('14:06', '14:02')}\n\nÜbergabe geschrieben.\n\n**Die Sitzung (Chat) ist damit beendet!**\n\n${Z}` }));
  pruefe(!m.length, `W-4 Übergabe ohne Fenster wird zurückgewiesen: ${m.join(' | ')}`);
  // W-5 Fenster
  for (const [labels, was] of [[['Ja', 'Nein', 'Ich schreibe im Chat'], 'ohne (Empfohlen)'], [['Ja (Empfehlung)', 'Nein', 'Ich schreibe im Chat'], '‚(Empfehlung)‘'],
    [['Nein', 'Ja (Empfohlen)', 'Ich schreibe im Chat'], 'Empfehlung nicht zuerst'], [['Ja (Empfohlen)', 'Nein'], 'ohne ‚Ich schreibe im Chat‘']]) {
    genau(stop(antwort({ fenster: frage(labels) })), 'W-5', `Fenster ${was} (Stop)`);
    const r = hook('fenster', null, { env, eingabe: { tool_name: 'AskUserQuestion', tool_input: frage(labels) } });
    pruefe(r?.hookSpecificOutput?.permissionDecision === 'deny' && /W-5/.test(r.hookSpecificOutput.permissionDecisionReason), `W-5 Fenster ${was} wird vor dem Zeigen nicht abgelehnt`);
  }
  const rueck = frage(['Alles ok', 'Nicht ok – ich schreibe im Chat', 'Ich prüfe später', 'Ich schreibe im Chat'], 'P-77: Wie ist die Prüfung ausgegangen? (Kontext 120.000)');
  m = stop(antwort({ fenster: rueck }));
  pruefe(!m.length && !hook('fenster', null, { env, eingabe: { tool_input: rueck } }), `W-5 Rückmeldung ‚P-n: …‘ ohne Empfehlung wird abgelehnt: ${m.join(' | ')}`);
  pruefe(!hook('fenster', null, { env, eingabe: { tool_input: frage(GUT) } }), 'W-5 regelgerechtes Fenster wird vor dem Zeigen abgelehnt');
  // W-6 Zeitzeile vor dem Fenster bzw. fehlt am Ende
  genau(stop(antwort({ zwischen: `${UZ('14:02', '14:00')}\n\nVor dem Fenster.\n\n${Z}` })), 'W-6', 'Zeitzeile vor dem Fenster');
  genau(stop(antwort({ schluss: `${UZ('14:06', '14:02')}\n\nOhne Zeitzeile.` })), 'W-6', 'Antwort endet ohne Zeitzeile');
  // W-7 Zeitzeile nicht aus messung.mjs bzw. nur vor dem Fenster gemessen
  genau(stop(antwort({ schluss: `${UZ('14:06', '14:02')}\n\nGeschätzt.\n\n${Z.replace('01:00', '01:05')}` })), 'W-7', 'Zeitzeile abgeändert');
  genau(stop(antwort({ messungVorFenster: true })), 'W-7', 'Zeitzeile vor dem Fenster gemessen');
  // Befund 0051: Ausgaben nach einem Denkschritt stehen nur umformuliert in der Sitzungsdatei – nichts wird falsch angemahnt
  const unsicher = (s, t) => bausteine(s, [{ type: 'thinking', thinking: t, signature: 'x' }]);
  const a = antwort();
  a.splice(a.findIndex(z => z.message?.content?.[0]?.text?.includes('Die Prüfungen sind grün')), 1, unsicher(135, 'Die Prüfungen sind grün, jetzt die Frage.'));
  a.splice(-1, 1, unsicher(410, 'Du hast Ja gewählt – ich baue.'));
  m = stop(a);
  pruefe(!m.length, `W-1/W-6 nicht wörtlich gespeicherte Ausgaben werden angemahnt: ${m.join(' | ')}`);

  // W-14 Kontextstand vor jedem Fenster (APD-99/C-1 bis C-11)
  const vorher = (zeilen, id = 'f1') => hook('fenster', zeilen, { env, eingabe: { tool_name: 'AskUserQuestion', tool_use_id: id, tool_input: frage(GUT) } });
  const abgelehnt = r => r?.hookSpecificOutput?.permissionDecision === 'deny' && /W-14/.test(r.hookSpecificOutput.permissionDecisionReason);
  pruefe(!vorher(antwort()), 'W-14 C-1 Fenster mit ‚Kontext N‘ davor wird vor dem Zeigen abgelehnt');
  const k2 = antwort({ ohneKontext: true });
  genau(stop(k2), 'W-14', 'C-2 ohne Satz mit ‚Kontext N‘ (Stop)');
  pruefe(abgelehnt(vorher(k2)), 'W-14 C-2 ohne Satz mit ‚Kontext N‘ wird vor dem Zeigen nicht abgelehnt');
  const k3 = antwort(); k3.splice(k3.findIndex(z => z.message?.content?.[0]?.text?.includes('Die Prüfungen sind grün')), 1);
  pruefe(abgelehnt(vorher(k3)), 'W-14 C-3 ohne Ausgabe vor dem Fenster wird nicht abgelehnt');
  const k4 = [...antwort(), werkzeug(420, 'f2', 'AskUserQuestion', frage(GUT)), ergebnis(430, 'f2', 'Ja (Empfohlen)')];
  pruefe(abgelehnt(vorher(k4, 'f2')), 'W-14 C-4 ‚Kontext N‘ nur vor dem vorigen Fenster wird nicht abgelehnt');
  pruefe(abgelehnt(vorher(antwort({ messungDavor: Z.replace('120.000', '130.000') }))), 'W-14 C-5 ‚Kontext N‘ anders als messung.mjs wird nicht abgelehnt');
  { const c5 = stop(antwort({ ohneMessungDavor: true, fenster: frage(GUT, 'Passt es so? (Kontext 120.000)') }));   // seit 4.53.0 meldet W-16 die Frage zusätzlich (APD-113)
    pruefe(c5.some(x => x.startsWith('W-14')) && c5.every(x => /^W-1[46]/.test(x)), `W-14 C-5 ‚Kontext N‘ ohne messung.mjs davor: ${c5.join(' | ') || 'nicht zurückgewiesen'}`); }
  const k6 = antwort({ ohneKontext: true, zwischen: `${UZ('14:02', '14:00')}\n\nJetzt die Frage.\n\n${Z}` });
  pruefe(abgelehnt(vorher(k6)), 'W-14 C-6 ‚Kontext N‘ nur in der Zeitzeile wird nicht abgelehnt');
  const k7 = antwort({ ohneKontext: true, zwischen: `${UZ('14:02', '14:00')}\n\nOhne Kontext.` }); k7.splice(k7.findIndex(z => z.message?.content?.[0]?.text?.includes('Ohne Kontext')), 1, bausteine(135, [{ type: 'thinking', thinking: 'umformuliert' }]));
  pruefe(!vorher(k7) && !stop(k7).some(x => x.startsWith('W-14')), 'W-14 C-7 nicht wörtlich gespeicherte Ausgabe vor dem Fenster wird abgelehnt');
  const k8 = antwort({ ohneKontext: true, ohneFenster: true }); k8.splice(-3);   // ohne früheres Fenster (sonst W-17)
  pruefe(!vorher(k8, 'gibt-es-noch-nicht'), 'W-14 C-8 Fenster noch nicht in der Sitzungsdatei wird vor dem Zeigen abgelehnt');
  pruefe(!stop(antwort({ ohneFenster: true, ohneMessungDavor: true, ohneKontext: true, zwischen: `${UZ('14:02', '14:00')}\n\nOhne Kontext.`, schluss: `${UZ('14:06', '14:02')}\n\nÜbergabe.\n\n**Die Sitzung (Chat) ist damit beendet!**\n\n${Z}` })).length, 'W-14 C-9 Übergabe ohne Fenster wird zurückgewiesen');
  pruefe(!vorher(antwort({ ohneKontext: true, zwischen: `${UZ('14:02', '14:00')}\n\nKontext 120000 ohne Punkte.` })), 'W-14 C-10 ‚Kontext 120000‘ ohne Tausenderpunkte wird abgelehnt');

  // W-14 Rückfall (seit 4.48.0, APD-103/D-1 bis D-9): Satz nicht prüfbar → Aufruf von messung.mjs seit der vorigen Nachricht bzw. dem vorigen Fenster
  const ohneSatz = o => { const a = antwort({ ohneKontext: true, zwischen: `${UZ('14:02', '14:00')}\n\nUnsicher.`, ...o });
    a.splice(a.findIndex(z => z.message?.content?.[0]?.text?.includes('Unsicher.')), 1, bausteine(135, [{ type: 'thinking', thinking: 'umformuliert' }])); return a; };
  const d1 = ohneSatz();
  pruefe(!vorher(d1) && !stop(d1).some(x => x.startsWith('W-14')), 'W-14 D-1 Ausgabe unsicher, messung.mjs seit der Nachricht aufgerufen – wird abgelehnt');
  const d2 = ohneSatz({ ohneMessungDavor: true });
  pruefe(abgelehnt(vorher(d2)), 'W-14 D-2 Ausgabe unsicher, ohne messung.mjs – wird vor dem Zeigen nicht abgelehnt');
  pruefe(stop(d2).some(x => x.startsWith('W-14') && /messung\.mjs davor nicht aufgerufen/.test(x)), 'W-14 D-2 Ausgabe unsicher, ohne messung.mjs – beim Stop keine Meldung W-14');
  // D-3: messung.mjs nur vor dem vorigen Fenster derselben Antwort, dann unsicher und das zweite Fenster
  const d3 = [...antwort(), bausteine(415, [{ type: 'thinking', thinking: 'umformuliert' }]), werkzeug(420, 'f2', 'AskUserQuestion', frage(GUT)), ergebnis(430, 'f2', 'Ja (Empfohlen)')];
  d3.splice(d3.findIndex(z => z.message?.content?.[0]?.id === 'm1'), 2);   // die Messung nach dem ersten Fenster fehlt
  pruefe(abgelehnt(vorher(d3, 'f2')), 'W-14 D-3 messung.mjs nur vor dem vorigen Fenster – wird nicht abgelehnt');
  // D-4 und D-5: Fenster noch nicht in der Sitzungsdatei
  const d4 = antwort({ ohneFenster: true }); d4.splice(-3);   // bis zur Ausgabe vor dem Fenster
  pruefe(!vorher(d4, 'gibt-es-noch-nicht'), 'W-14 D-4 Fenster noch nicht gespeichert, messung.mjs aufgerufen – wird vor dem Zeigen abgelehnt');
  const d5 = antwort({ ohneFenster: true, ohneMessungDavor: true }); d5.splice(-3);
  pruefe(abgelehnt(vorher(d5, 'gibt-es-noch-nicht')), 'W-14 D-5 Fenster noch nicht gespeichert, ohne messung.mjs – wird vor dem Zeigen nicht abgelehnt');
  // D-6: messung.mjs meldet einen Fehler statt ‚Kontext N‘
  const d6 = ohneSatz(); d6[d6.findIndex(z => z.message?.content?.[0]?.tool_use_id === 'mk')].message.content[0].content = '✗ messung: keine Sitzungsdatei';
  pruefe(abgelehnt(vorher(d6)), 'W-14 D-6 messung.mjs ohne ‚Kontext N‘ – wird nicht abgelehnt');
  // D-7: Ablauf aus 0065 – voriges Fenster mit Messung, Neustart des Arbeitsprozesses (Systemzeile), neue Nachricht, Ausgabe unsicher,
  // kein messung.mjs, Fenster beim Zeigen noch nicht gespeichert
  const d7 = [...antwort(), { type: 'system', subtype: 'restart', timestamp: iso(500), content: 'Arbeitsprozess neu gestartet' },
    nachricht(520, 'w'), werkzeug(530, 'b9', 'Bash', { command: 'git status' }), ergebnis(531, 'b9', 'sauber'), bausteine(540, [{ type: 'thinking', thinking: 'umformuliert' }])];
  pruefe(abgelehnt(vorher(d7, 'gibt-es-noch-nicht')), 'W-14 D-7 Ablauf aus 0065 (nach Neustart, unsicher, ohne messung.mjs) – wird vor dem Zeigen nicht abgelehnt');
  pruefe(abgelehnt(vorher([...d7, werkzeug(545, 'f9', 'AskUserQuestion', frage(GUT))], 'f9')), 'W-14 D-7 Ablauf aus 0065, Fenster schon gespeichert – wird nicht abgelehnt');

  // W-15, W-4 und W-17 nach APD-113 Teil (6) (seit 4.54.0, Testfall-Liste arbeit/APD-113 Teil 6 Testfall-Liste.md M-1 bis M-17)
  { const M = 'https://g811141a.github.io/AppDesign/arbeit/APD-30%20Muster.html';
    const zeige = (zeilen, fenster, id = 'f1') => hook('fenster', zeilen, { env, eingabe: { tool_name: 'AskUserQuestion', tool_use_id: id, tool_input: fenster } });
    const grund = (r, nr) => r?.hookSpecificOutput?.permissionDecision === 'deny' && new RegExp(nr).test(r.hookSpecificOutput.permissionDecisionReason) ? r.hookSpecificOutput.permissionDecisionReason : '';
    const nur = (m, nr) => m.filter(x => x.startsWith(nr));
    const ANZ = frage(['Anzeigen (Empfohlen)', 'Ich schreibe im Chat'], 'Muster APD-30 bereit – anzeigen? (Kontext 120.000)');
    const SCHRITTE = `Das Muster: ${M}\n\n1. Öffne den Link am iPad quer.\n2. Sieh dir die Varianten A, B und C an.\nErwartet: Symbol, Titel, Satz und Knopf stehen mittig.`;
    const LETZTE = (t = `${SCHRITTE}\n\nAntworte im Chat, z. B. „A ok“ oder „B, weil …“.`) => `${UZ('14:06', '14:02')}\n\n${t}\n\n${Z}`;
    const mitAnz = t => antwort({ fenster: ANZ, schluss: LETZTE(t) });
    // M-1: Fenster mit Link im Fragetext – auch wenn Link und Schritte davor im Chat stehen (früher erlaubt, APD-110/L-5)
    const m1f = { questions: [{ question: `Muster APD-30 ${M} – passt Variante A? (Kontext 120.000)`, header: 'Muster', multiSelect: false, options: GUT.map(option) }] };
    const m1 = antwort({ zwischen: `${UZ('14:02', '14:00')}\n\n${SCHRITTE}`, fenster: m1f });
    pruefe(/W-15 Fenster/.test(grund(zeige(m1, m1f), 'W-15')) && nur(stop(m1), 'W-15').length, 'W-15 APD-113/M-1 Fenster mit Link wird nicht abgelehnt (Zeigen bzw. Stop)');
    const m1b = { questions: [{ question: 'Welche Variante passt? (Kontext 120.000)', header: 'Muster', multiSelect: false, options: [{ label: 'A (Empfohlen)', description: `wie Apple – ${M}` }, option('B'), option('Ich schreibe im Chat')] }] };
    pruefe(grund(zeige(antwort({ fenster: m1b }), m1b), 'W-15') && grund(hook('fenster', null, { env, eingabe: { tool_input: m1b } }), 'W-15'), 'W-15 APD-113/M-1 Link nur in der Beschreibung einer Möglichkeit bzw. ohne Sitzungsdatei wird nicht abgelehnt');
    // M-2: Fenster ‚… bereit – anzeigen?‘ ohne Link
    pruefe(!zeige(antwort({ fenster: ANZ }), ANZ), `W-15 APD-113/M-2 Fenster ‚… anzeigen?‘ ohne Link wird abgelehnt: ${grund(zeige(antwort({ fenster: ANZ }), ANZ), 'W-')}`);
    // M-3: letzte Ausgabe mit Link, Schritten, ‚Erwartet:‘ und ‚Antworte im Chat‘, Zeitzeile am Ende – kein Fenster danach
    { const m = stop(mitAnz()); pruefe(!m.length, `W-15 APD-113/M-3 letzte Ausgabe nach ‚… anzeigen?‘ regelgerecht wird zurückgewiesen: ${m.join(' | ')}`); }
    // M-4: ohne nummerierte Schritte bzw. ohne ‚Erwartet:‘
    genau(stop(mitAnz(`Das Muster: ${M}\nErwartet: mittig.\n\nAntworte im Chat, z. B. „ok“.`)), 'W-15', 'APD-113/M-4 letzte Ausgabe ohne nummerierte Schritte');
    genau(stop(mitAnz(`Das Muster: ${M}\n\n1. Öffne den Link.\n2. Sieh dir die Varianten an.\n\nAntworte im Chat, z. B. „ok“.`)), 'W-15', 'APD-113/M-4 letzte Ausgabe ohne ‚Erwartet:‘');
    // M-15: wie 0086, 00:31 – Wortlaut ohne Link bzw. ohne ‚Antworte im Chat‘
    genau(stop(mitAnz('Wortlaut APD-113/N-1 bis APD-113/N-5:\n\n1. APD-113/N-1 erledigt durch Teil (6).\n2. APD-113/N-2 entfällt.\nErwartet: alles bestätigt.\n\nAntworte im Chat, z. B. „APD-113/N-1 bis APD-113/N-5 ja“.')), 'W-15', 'APD-113/M-15 letzte Ausgabe ohne Link');
    genau(stop(mitAnz(SCHRITTE)), 'W-15', 'APD-113/M-15 letzte Ausgabe ohne ‚Antworte im Chat‘');
    // ‚Ich schreibe im Chat‘ gewählt – Claude beendet die Antwort, keine letzte Ausgabe mit Link nötig
    { const a = antwort({ fenster: ANZ, schluss: LETZTE('Du schreibst im Chat.') }); a[a.findIndex(z => z.message?.content?.[0]?.tool_use_id === 'f1')].message.content[0].content = 'Your questions have been answered: "Muster …"="Ich schreibe im Chat"';
      const m = stop(a); pruefe(!m.length, `W-15 APD-113/M-3 ‚Ich schreibe im Chat‘ gewählt – letzte Ausgabe wird angemahnt: ${m.join(' | ')}`); }
    // M-5: Antwort ganz ohne Fenster, dreimal hintereinander – jedes Mal abgelehnt, auch nach der zweiten Zurückweisung
    { const a = antwort({ ohneFenster: true }), s5 = { env, eingabe: { session_id: 'm5' } };
      const r = [0, 1, 2].map(k => hook('stop', a, { ...s5, jetzt: T0 + 420000 + k * 10000 }));
      pruefe(r.every(x => x?.decision === 'block' && /- W-4/.test(x.reason)) && /Zurückweisung 3 – ohne beantwortetes Fenster endet keine Antwort/.test(r[2]?.reason || ''),
        `W-4 APD-113/M-5 Antwort ohne Fenster nach der zweiten Zurückweisung durchgelassen (${r.map(x => x?.decision || 'durch').join(', ')})`); }
    // M-6: wie 0086, 19:00 – Neustart des Arbeitsprozesses mitten in der Antwort (Meldung als Systemanstoß), danach ‚No response requested‘ ohne Fenster
    const nachMeldung = (meldung, text) => [...antwort(), { type: 'system', subtype: 'restart', timestamp: iso(500), content: 'Arbeitsprozess neu gestartet' }, meldung,
      werkzeug(605, 'k6m', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(606, 'k6m', Z), ausgabe(610, `${UZ('14:10', '14:06')}\n\n${text}\n\n${Z}`)];
    const anstoss = (s, t) => ({ type: 'user', uuid: `an${++n}`, timestamp: iso(s), origin: { kind: 'task-notification' }, promptSource: 'system', turnOrigin: 'task_notification', message: { role: 'user', content: t } });
    genau(stop(nachMeldung(anstoss(520, '[SYSTEM NOTIFICATION - NOT USER INPUT] Der Arbeitsprozess wurde neu gestartet.'), 'No response requested.')), 'W-4', 'APD-113/M-6 nach einem Neustart Antwort ohne Fenster');
    // M-7: wie 0086, 19:22 – Meldung einer Hintergrundaufgabe bzw. einer anderen Sitzung, danach Antwort ohne Fenster
    genau(stop(nachMeldung(anstoss(520, '<task-notification>Der Prüflauf ist fertig.</task-notification>'), 'Der Prüflauf ist fertig, alles grün.')), 'W-4', 'APD-113/M-7 nach der Meldung einer Hintergrundaufgabe Antwort ohne Fenster');
    // M-8: Übergabe ohne Fenster bleibt erlaubt (auch nach einer Meldung)
    { const m = stop(nachMeldung(anstoss(520, '<task-notification>fertig</task-notification>'), 'Übergabe geschrieben.\n\n**Die Sitzung (Chat) ist damit beendet!**'));
      pruefe(!m.length, `W-4 APD-113/M-8 Übergabe ohne Fenster wird zurückgewiesen: ${m.join(' | ')}`); }
    // M-9: Zeitzeile mitten in der Antwort, danach noch ein Fenster (0086, 19:22)
    genau(stop(antwort({ zwischen: `${UZ('14:02', '14:00')}\n\nZwischenstand.\n\n${Z}\n\n${KS}` })), 'W-6', 'APD-113/M-9 Zeitzeile vor einem späteren Fenster');
    // M-10: gewöhnliche Frage am Ende ohne Link
    { const m = stop(antwort()); pruefe(!m.length, `W-15 APD-113/M-10 gewöhnliche Frage ohne Link wird zurückgewiesen: ${m.join(' | ')}`); }
    // M-13 und M-14: zwei Fenster in einer Antwort, dazwischen ein Aufruf mit Commit und messung.mjs (0086, 19:27) bzw. nur messung.mjs
    const zwischen = befehl => [...antwort({ schluss: `${UZ('14:06', '14:02')}\n\nDu hast Ja gewählt – ich trage es ein.` }),
      werkzeug(411, 'c13', 'Bash', { command: befehl }), ergebnis(412, 'c13', `[main abc1234] Eintrag\n${Z}`), ausgabe(418, `${UZ('14:07', '14:06')}\n\nEingetragen, jetzt die Priorität.\n\n${KS}`)];
    const f13 = frage(GUT, 'Mit welcher Priorität? (Kontext 120.000)');
    pruefe(!grund(zeige(zwischen('cd /home/user/AppDesign && git commit -qam "Eintrag" && git push -q && node werkzeug/messung.mjs'), f13, 'gibt-es-noch-nicht'), 'W-17'),
      'W-17 APD-113/M-13 zweites Fenster nach Commit und messung.mjs in einem Aufruf wird abgelehnt');
    pruefe(/seitdem lief kein Werkzeug/.test(grund(zeige(zwischen('cd /home/user/AppDesign && node werkzeug/messung.mjs | tail -1'), f13, 'gibt-es-noch-nicht'), 'W-17')),
      'W-17 APD-113/M-14 zweites Fenster, dazwischen nur messung.mjs (mit cd), wird nicht abgelehnt');
    // M-16 und M-17: Zurückweisung des Stop-Hooks nach einem beantworteten Fenster (0086, 00:30; 0087, 00:42)
    const zurueck = s => ({ type: 'user', uuid: `sh${++n}`, timestamp: iso(s), isMeta: true, message: { role: 'user', content: 'Stop hook feedback:\nRegelwächter (Zusammenarbeit 0, Kasten ‚Jede Antwort‘) – Zurückweisung 1 von 2, die Antwort ist noch nicht fertig:\n- W-1 Ausgabe ohne Uhrzeitzeile …' } });
    const nachZurueck = [...antwort(), zurueck(412), werkzeug(415, 'k16', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(416, 'k16', Z)];
    genau(stop([...nachZurueck, ausgabe(418, `${UZ('14:07', '14:06')}\n\nRegelbruch W-1: die Zwischenmeldung hatte keine Uhrzeitzeile.\n\n${Z}`)]), 'W-4', 'APD-113/M-16 Nachholen nach einer Zurückweisung ohne neues Fenster');
    pruefe(!grund(zeige([...nachZurueck, ausgabe(418, `${UZ('14:07', '14:06')}\n\nRegelbruch W-1 nachgeholt. ${KS}`)], frage(GUT, 'Hinweis bereit – anzeigen? (Kontext 120.000)'), 'gibt-es-noch-nicht'), 'W-17'),
      'W-17 APD-113/M-17 Fenster nach einer Zurückweisung (seitdem nur messung.mjs) wird abgelehnt');
    // eine Zurückweisung eines anderen Stop-Hooks (z. B. Git ‚unpushed‘) zählt nicht als Zurückweisung des Regelwächters
    { const fremd = [...antwort(), { type: 'user', uuid: 'shg', timestamp: iso(412), isMeta: true, message: { role: 'user', content: 'Stop hook feedback:\nThere are unpushed commits.' } },
        werkzeug(414, 'gp', 'Bash', { command: 'git push' }), ergebnis(415, 'gp', 'ok'), werkzeug(416, 'k17', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(417, 'k17', Z), ausgabe(418, `${UZ('14:07', '14:06')}\n\nGepusht.\n\n${Z}`)];
      const m = stop(fremd); pruefe(!m.length, `W-4 APD-113/M-16 Zurückweisung eines anderen Stop-Hooks verlangt ein Fenster: ${m.join(' | ')}`); } }

  // W-16 Kontext in der Bau-Frage, W-17 ein Fenster je Antwort (seit 4.51.0, APD-114, Testfall-Liste arbeit/APD-114 Testfall-Liste.md)
  { const BF = 'Soll ich Version 4.51.0 mit APD-40 erstellen?';
    const zeige = (zeilen, fenster, id = 'f1') => hook('fenster', zeilen, { env, eingabe: { tool_name: 'AskUserQuestion', tool_use_id: id, tool_input: fenster } });
    const grund = (r, nr) => r?.hookSpecificOutput?.permissionDecision === 'deny' && new RegExp(nr).test(r.hookSpecificOutput.permissionDecisionReason) ? r.hookSpecificOutput.permissionDecisionReason : '';
    const nur = (m, nr) => m.filter(x => x.startsWith(nr));
    // B-1: Bau-Frage mit abgelesenem ‚(Kontext N)‘ in der Frage
    const b1 = frage(GUT, `${BF} (Kontext 120.000)`);
    pruefe(!zeige(antwort({ fenster: b1 }), b1) && !nur(stop(antwort({ fenster: b1 })), 'W-16').length, 'W-16 B-1 Bau-Frage mit abgelesenem Kontext in der Frage wird abgelehnt');
    // B-2: ohne Kontext in der Frage (Satz davor vorhanden) – beim Zeigen, beim Stop und ohne Sitzungsdatei
    const b2 = frage(GUT, BF);
    pruefe(/in der Bau-Frage selbst/.test(grund(zeige(antwort({ fenster: b2 }), b2), 'W-16')) && nur(stop(antwort({ fenster: b2 })), 'W-16').length && grund(hook('fenster', null, { env, eingabe: { tool_input: b2 } }), 'W-16'),
      'W-16 B-2 Bau-Frage ohne Kontext in der Frage wird nicht abgelehnt (Zeigen, Stop, ohne Sitzungsdatei)');
    // B-3: Zahl in der Frage, die messung.mjs nicht gemeldet hat
    const b3 = frage(GUT, `${BF} (Kontext 125.000)`);
    pruefe(/nicht abgelesen/.test(grund(zeige(antwort({ fenster: b3 }), b3), 'W-16')), 'W-16 B-3 Bau-Frage mit geschätztem Kontext wird nicht abgelehnt');
    // B-4: Bau-Frage als zweite Frage im Fenster
    const b4 = { questions: [frage(GUT, 'Mit welcher Priorität?').questions[0], frage(GUT, BF).questions[0]] };
    pruefe(grund(zeige(antwort({ fenster: b4 }), b4), 'W-16'), 'W-16 B-4 Bau-Frage als zweite Frage ohne Kontext wird nicht abgelehnt');
    const b4b = { questions: [frage(GUT, 'Mit welcher Priorität? (Kontext 120.000)').questions[0], b1.questions[0]] };
    pruefe(!zeige(antwort({ fenster: b4b }), b4b), 'W-16 B-4 Bau-Frage als zweite Frage mit Kontext wird abgelehnt');
    // APD-113/H-1 (seit 4.53.0, ersetzt B-5): jede Frage ohne ‚(Kontext N)‘ wird abgelehnt, der Hinweis nennt die Frage – Zeigen, Stop, ohne Sitzungsdatei
    const h1 = frage(GUT, 'Ins Backlog übernehmen?');
    pruefe(/W-16 Frage „Ins Backlog übernehmen\?“ ohne ‚\(Kontext N\)‘/.test(grund(zeige(antwort({ fenster: h1 }), h1), 'W-16')) && nur(stop(antwort({ fenster: h1 })), 'W-16').length === 1
      && grund(hook('fenster', null, { env, eingabe: { tool_input: h1 } }), 'W-16'), 'W-16 APD-113/H-1 Frage ohne Kontext wird nicht abgelehnt bzw. der Hinweis nennt sie nicht');
    // H-2: zwei Fragen, nur eine mit ‚(Kontext N)‘
    const h2 = { questions: [frage(GUT, 'Ins Backlog übernehmen? (Kontext 120.000)').questions[0], frage(GUT, 'Mit welcher Priorität?').questions[0]] };
    pruefe(/Mit welcher Priorität/.test(grund(zeige(antwort({ fenster: h2 }), h2), 'W-16')) && !/Ins Backlog/.test(grund(zeige(antwort({ fenster: h2 }), h2), 'W-16 Frage „Ins')),
      'W-16 APD-113/H-2 zwei Fragen, nur eine mit Kontext – nicht (nur die ohne) abgelehnt');
    // H-3: ‚(Kontext N)‘ mit einem anderen Wert als der letzte von messung.mjs
    const h3 = frage(GUT, 'Ins Backlog übernehmen? (Kontext 118.500)');
    pruefe(/nicht abgelesen/.test(grund(zeige(antwort({ fenster: h3 }), h3), 'W-16')), 'W-16 APD-113/H-3 Frage mit geschätztem Kontext wird nicht abgelehnt');
    // H-4: Kontext in jeder Frage, Satz davor, gleicher Wert
    const h4 = { questions: [frage(GUT, 'Ins Backlog übernehmen? (Kontext 120.000)').questions[0], frage(GUT, 'Mit welcher Priorität? (Kontext 120.000)').questions[0]] };
    pruefe(!zeige(antwort({ fenster: h4 }), h4) && !stop(antwort({ fenster: h4 })).length, 'W-16 APD-113/H-4 jede Frage mit abgelesenem Kontext wird abgelehnt');
    // B-6: erstes Fenster nach einer Nachricht; danach eine neue Nachricht und wieder ein Fenster
    pruefe(!grund(zeige(antwort(), frage(GUT)), 'W-17'), 'W-17 B-6 erstes Fenster der Antwort wird abgelehnt');
    const neueAntwort = [...antwort(), nachricht(500, 'weiter'), werkzeug(505, 'k6', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(506, 'k6', Z), ausgabe(510, `${UZ('14:08', '14:06')}\n\n${KS}`)];
    pruefe(!zeige(neueAntwort, frage(GUT), 'gibt-es-noch-nicht'), 'W-17 B-6 erstes Fenster nach einer neuen Nachricht wird abgelehnt');
    // B-7: zweites Fenster, nachdem in derselben Antwort schon eines beantwortet wurde
    const zweites = (vor = []) => [...antwort(), ...vor, werkzeug(415, 'k7', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(416, 'k7', Z),
      ausgabe(418, `${UZ('14:07', '14:06')}\n\nNoch eine Frage.\n\n${KS}`)];
    const b7 = zweites();
    // APD-113/H-5: zweites Fenster direkt nach dem ersten – dazwischen nur messung.mjs (liest nur ab), kein Werkzeug
    pruefe(/seitdem lief kein Werkzeug/.test(grund(zeige(b7, frage(GUT), 'gibt-es-noch-nicht'), 'W-17')), 'W-17 B-7/APD-113/H-5 zweites Fenster ohne Werkzeug dazwischen wird vor dem Zeigen nicht abgelehnt');
    // APD-113/H-6: das erste ist beantwortet, danach lief ein Werkzeug (Eintrag ins Backlog), neue Ausgabe mit ‚Kontext N‘ – zugelassen; H-7 Stop danach ohne Zurückweisung
    // die Antwort auf das erste Fenster ohne Zeitzeile – sie steht nur ganz am Ende, nach dem letzten Fenster (W-6)
    const h6 = [...antwort({ schluss: `${UZ('14:06', '14:02')}\n\nDu hast Ja gewählt – ich trage es ein.` }), werkzeug(411, 'bl6', 'Edit', { file_path: '/home/user/AppDesign/BACKLOG.md', old_string: 'a', new_string: 'b' }), ergebnis(412, 'bl6', 'ok'),
      werkzeug(415, 'k6b', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(416, 'k6b', Z), ausgabe(418, `${UZ('14:07', '14:06')}\n\nEingetragen, jetzt die Priorität.\n\n${KS}`)];
    pruefe(!zeige(h6, frage(GUT, 'Ins Backlog übernehmen? (Kontext 120.000)'), 'gibt-es-noch-nicht'), 'W-17 APD-113/H-6 zweites Fenster nach einem Werkzeug wird abgelehnt');
    const h7 = [...h6, werkzeug(420, 'f2', 'AskUserQuestion', frage(GUT, 'Ins Backlog übernehmen? (Kontext 120.000)')), ergebnis(430, 'f2', 'Ja (Empfohlen)'),
      werkzeug(432, 'm2', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(433, 'm2', Z), ausgabe(435, `${UZ('14:07', '14:07')}\n\nZusammenfassung.\n\n${Z}`)];
    pruefe(!stop(h7).length, `APD-113/H-7 Stop nach H-6 (Zeitzeile nach dem letzten Fenster) wird zurückgewiesen: ${stop(h7).join(' | ')}`);
    // H-6 ohne neue Ausgabe mit ‚Kontext N‘ davor: W-14 lehnt ab
    const h6f = frage(GUT, 'Ins Backlog übernehmen? (Kontext 120.000)');
    const h6o = [...antwort({ schluss: `${UZ('14:06', '14:02')}\n\nDu hast Ja gewählt.` }), werkzeug(411, 'bl7', 'Edit', { file_path: 'BACKLOG.md' }), ergebnis(412, 'bl7', 'ok'), werkzeug(420, 'f7', 'AskUserQuestion', h6f)];
    pruefe(grund(zeige(h6o, h6f, 'f7'), 'W-14'), 'W-14 APD-113/H-6 zweites Fenster nach einem Werkzeug ohne Ausgabe mit Kontext davor wird nicht abgelehnt');
    const b7s = [...b7, werkzeug(420, 'f2', 'AskUserQuestion', frage(GUT)), ergebnis(430, 'f2', 'Ja (Empfohlen)'), werkzeug(432, 'm2', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(433, 'm2', Z), ausgabe(435, `${UZ('14:07', '14:07')}\n\nZusammenfassung.\n\n${Z}`)];
    pruefe(nur(stop(b7s), 'W-17').length === 1, `W-17 B-7 zweites gezeigtes Fenster wird beim Stop nicht genau einmal gemeldet: ${stop(b7s).join(' | ')}`);
    // B-8: das vorige Fenster hat der Wächter abgelehnt (nie gezeigt) – das neu gestellte zählt nicht als zweites
    const b8 = antwort(); const j = b8.findIndex(z => z.message?.content?.[0]?.tool_use_id === 'f1');
    b8[j].message.content[0].content = 'PreToolUse:AskUserQuestion hook error: Regelwächter (Zusammenarbeit 0 Nr. 7, Nr. 28, 2.1) – Fenster so nicht zeigen:\n- W-15 …';
    const b8n = [...b8.slice(0, j + 1), werkzeug(150, 'k8', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(151, 'k8', Z), ausgabe(152, `${UZ('14:02', '14:02')}\n\nNeu gestellt.\n\n${KS}`)];
    pruefe(!zeige(b8n, frage(GUT), 'gibt-es-noch-nicht'), 'W-17 B-8 neu gestelltes Fenster nach einer Ablehnung durch den Wächter wird abgelehnt');
    // B-9 (seit 4.54.0 umgekehrt, APD-113/M-17): Nachholen nach einer Zurückweisung des Stop-Hooks gehört zur selben Antwort, die Zurückweisung zählt
    // für W-17 wie ein Werkzeug – das Fenster, das APD-113/N-6 verlangt, ist erlaubt
    const b9 = zweites([{ type: 'user', uuid: 'sh9', timestamp: iso(412), isMeta: true, message: { role: 'user', content: 'Stop hook feedback:\nRegelwächter … Zurückweisung 1 von 2' } }]);
    pruefe(!grund(zeige(b9, frage(GUT), 'gibt-es-noch-nicht'), 'W-17'), 'W-17 B-9/APD-113/M-17 Fenster beim Nachholen nach dem Stop-Hook wird abgelehnt');
    // B-14: wie Sitzung 0080, 14:15 – nach dem Fenster kam die Meldung einer Hintergrundaufgabe (neuer Zug ohne Nachricht des Nutzers)
    const b14 = [...antwort(), { type: 'user', uuid: 'tn14', timestamp: iso(600), origin: { kind: 'task-notification' }, message: { role: 'user', content: '<task-notification>fertig</task-notification>' } },
      werkzeug(605, 'k14', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(606, 'k14', Z), ausgabe(610, `${UZ('14:10', '14:06')}\n\nDer Nebenstrang ist fertig.\n\n${KS}`)];
    pruefe(!grund(zeige(b14, frage(GUT), 'gibt-es-noch-nicht'), 'W-17'), 'W-17 B-14 Fenster nach der Meldung einer Hintergrundaufgabe wird abgelehnt');
    // B-10: Übergabe ohne Fenster bleibt erlaubt
    pruefe(!stop(antwort({ ohneFenster: true, schluss: `${UZ('14:06', '14:02')}\n\nÜbergabe.\n\n**Die Sitzung (Chat) ist damit beendet!**\n\n${Z}` })).length, 'W-17 B-10 Übergabe ohne Fenster wird zurückgewiesen');
    // B-11: wie Sitzung 0080, 12:12 bis 12:15 – vier Fenster in einer Antwort (Backlog, Backlog, Bau-Frage, Nächstes)
    const vier = [nachricht(0, 'alles ok')];
    for (const [k, q] of [['Wackler ins Backlog übernehmen?', 0], ['Fund zum Regelwächter ins Backlog übernehmen?', 1], [`${BF} (Kontext 120.000)`, 2], ['Was soll ich als Nächstes klären?', 3]].map(([q], k) => [k, q])) {
      vier.push(werkzeug(10 + k * 100, `mv${k}`, 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(11 + k * 100, `mv${k}`, Z),
        ausgabe(12 + k * 100, `${UZ(uhr(T0 + (12 + k * 100) * 1000), k ? uhr(T0 + (12 + (k - 1) * 100) * 1000) : null)}\n\nFrage ${k + 1}.\n\n${KS}`),
        werkzeug(14 + k * 100, `fv${k}`, 'AskUserQuestion', frage(GUT, q)), ergebnis(60 + k * 100, `fv${k}`, 'Ja (Empfohlen)'));
    }
    vier.push(werkzeug(470, 'mz', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(471, 'mz', Z), ausgabe(472, `${UZ(uhr(T0 + 472000), uhr(T0 + 312000))}\n\nZusammenfassung.\n\n${Z}`));
    pruefe(nur(stop(vier), 'W-17').length === 3, `W-17 B-11 vier Fenster in einer Antwort – nicht das zweite bis vierte gemeldet: ${stop(vier).join(' | ') || 'durchgelassen'}`);
    // B-12: wie Sitzung 0080, 12:14 – Bau-Frage ohne Kontext in der Frage (der Satz stand davor)
    const b12 = frage(['Ja (Empfohlen)', 'Nein, erst weitere Punkte sammeln', 'Ich schreibe im Chat'], 'Soll ich Version 4.51.0 / Reiselogbuch 3.49.0 mit APD-40 Paket A erstellen (Reiselogbuch auf Fassung 4.51.0 heben)?');
    pruefe(grund(zeige(antwort({ fenster: b12 }), b12), 'W-16'), 'W-16 B-12 Bau-Frage aus 0080 ohne Kontext in der Frage wird nicht abgelehnt'); }

  // W-1 bis W-7 und W-14 echte Antworten aus 0050, 0051 und 0062
  const { faelle } = JSON.parse(readFileSync(new URL('regelwaechter-faelle.json', import.meta.url), 'utf8'));
  for (const f of faelle) {
    const t = Date.parse(f.bausteine[0].zeit), s = x => (Date.parse(x) - T0) / 1000, zeilen = [nachricht(s(f.bausteine[0].zeit) - 60)];
    for (const [i, b] of f.bausteine.entries()) {
      if (b.text) zeilen.push(ausgabe(s(b.zeit), b.text));
      else { zeilen.push(werkzeug(s(b.zeit), `q${i}`, 'AskUserQuestion', b.frage), ergebnis(s(b.zeit) + 30, `q${i}`, 'Ja')); }
    }
    const r = meldungen(hook('stop', zeilen, { env, jetzt: t + 120000 }));
    for (const nr of f.erwartet) pruefe(r.some(x => x.startsWith(nr)), `${nr} echte Antwort ${f.name} wird nicht zurückgewiesen (${r.join(' | ') || 'lässt durch'})`);
  }

  // W-9 höchstens zwei Zurückweisungen je Antwort; danach nur noch neue Ausgaben – außer ohne Fenster (W-4 ohne Grenze, seit 4.54.0, APD-113/M-5)
  const w9 = antwort({ schluss: `${UZ('14:06', '14:02')}\n\nOhne Zeitzeile.` });
  const s9 = { env, eingabe: { session_id: 'w9' } };
  const r1 = hook('stop', w9, { ...s9, jetzt: T0 + 420000 }), r2 = hook('stop', w9, { ...s9, jetzt: T0 + 430000 }), r3 = hook('stop', w9, { ...s9, jetzt: T0 + 440000 });
  pruefe(r1?.decision === 'block' && r2?.decision === 'block' && /Zurückweisung 2 von 2/.test(r2.reason) && r3 === null, `W-9 dritte Zurückweisung derselben Antwort (${[r1, r2, r3].map(r => r?.decision || 'durch').join(', ')})`);
  const w9b = antwort({ zwischen: 'Ohne Uhrzeit.' });
  w9b.splice(w9b.findIndex(z => z.message?.content?.[0]?.name === 'AskUserQuestion'), 2);   // altes Fenster weg
  const sb = { env, eingabe: { session_id: 'w9b' } };
  const ra = meldungen(hook('stop', w9b, { ...sb, jetzt: T0 + 420000 }));
  const nachgeholt = [...w9b, werkzeug(421, 'k9', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(422, 'k9', Z), ausgabe(424, `${UZ('14:07', '14:06')}\n\n${KS}`),
    werkzeug(425, 'f9', 'AskUserQuestion', frage(GUT)), ergebnis(430, 'f9', 'Ja (Empfohlen)'),
    werkzeug(432, 'm9', 'Bash', { command: 'node werkzeug/messung.mjs' }), ergebnis(433, 'm9', Z), ausgabe(435, `${UZ('14:07', '14:07')}\n\nNachgeholt.\n\n${Z}`)];
  const rb = meldungen(hook('stop', nachgeholt, { ...sb, jetzt: T0 + 440000 }));
  pruefe(ra.some(x => x.startsWith('W-1')) && !rb.length, `W-9 nach der Zurückweisung werden ältere Ausgaben erneut gemeldet: ${rb.join(' | ')}`);

  // W-10 Uhrzeitzeile: erste ‚–‘, sonst Abstand zur letzten (auch über Mitternacht); nach einem Werkzeug nur bei Änderung
  const kontext = r => r?.hookSpecificOutput?.additionalContext || '';
  let r = hook('uhrzeit', [nachricht(0)], { env, jetzt: T0 + 61000, eingabe: { hook_event_name: 'UserPromptSubmit' } });
  pruefe(kontext(r).includes(UZ('14:01', null)) && r.hookSpecificOutput.hookEventName === 'UserPromptSubmit', `W-10 erste Uhrzeitzeile: ${kontext(r)}`);
  const mitte = [nachricht(0), ausgabe(30, `${uhrzeitzeile('23:58', null)}\n\nSpät.\n\n${Z}`)];
  r = hook('uhrzeit', mitte, { env, jetzt: Date.parse('2026-10-26T23:03:10Z'), eingabe: { hook_event_name: 'UserPromptSubmit' } });
  pruefe(kontext(r).includes(UZ('00:03', '23:58')) && /00:05/.test(kontext(r)), `W-10 Zeitabstand über Mitternacht: ${kontext(r)}`);
  const w10 = { env, jetzt: T0 + 125000, eingabe: { hook_event_name: 'PostToolUse', session_id: 'w10' } };
  const p1 = hook('uhrzeit', antwort().slice(0, 4), w10), p2 = hook('uhrzeit', antwort().slice(0, 4), w10), p3 = hook('uhrzeit', antwort().slice(0, 4), { ...w10, jetzt: T0 + 185000 });
  pruefe(kontext(p1).includes(UZ('14:02', '14:00')) && p2 === null && kontext(p3).includes(UZ('14:03', '14:00')), `W-10 nach einem Werkzeug: ${[p1, p2, p3].map(kontext).join(' | ')}`);
  pruefe(uhr(T0) === '14:00', `W-10 deutsche Zeit: ${uhr(T0)} statt 14:00`);
  // W-11 Modell nicht Opus 5.5 – mit dem Grund aus der Sitzungsdatei
  const rueckfall = { type: 'system', subtype: 'model_fallback', timestamp: iso(1), content: 'Switched to Opus 5 (1M context) due to high demand for Opus 5.5', originalModel: SOLL_MODELL, fallbackModel: 'claude-opus-5[1m]' };
  r = hook('uhrzeit', [nachricht(0), rueckfall, ausgabe(5, `${UZ('14:00', null)}\n\nText`, 'claude-opus-5')], { env, eingabe: { hook_event_name: 'UserPromptSubmit' } });
  pruefe(/⚠ Modell: claude-opus-5 statt claude-opus-5-5 \(Switched to Opus 5 \(1M context\) due to high demand for Opus 5\.5\)/.test(kontext(r)), `W-11 Modell-Warnung fehlt: ${kontext(r)}`);
  r = hook('uhrzeit', antwort(), { env, eingabe: { hook_event_name: 'UserPromptSubmit' } });
  pruefe(!/Modell/.test(kontext(r)), `W-11 Warnung trotz Opus 5.5: ${kontext(r)}`);
  return fehler;
}

const fehler = [];
const gegenprobe = process.argv.includes('--gegenprobe');
if (!gegenprobe) {
  fehler.push(...lauf());
  // W-12 Fehler lassen durch: keine Sitzungsdatei, kaputtes JSON, unbekannter Befehl
  for (const [args, stdin, was] of [[['stop'], '{"transcript_path":"/gibt/es/nicht.jsonl"}', 'keine Sitzungsdatei'], [['stop'], '{kaputt', 'kaputtes JSON'], [['quatsch'], '{}', 'unbekannter Befehl']]) {
    const r = spawnSync(process.execPath, [WAECHTER, ...args], { input: stdin, encoding: 'utf8', env: { ...process.env, REGELWAECHTER_ORDNER: ordner, CLAUDE_CODE_SESSION_ID: 'gibt-es-nicht' } });
    if (r.status !== 0 || r.stdout.trim()) fehler.push(`W-12 ${was}: Rückgabewert ${r.status}, Ausgabe ‚${r.stdout.trim().slice(0, 80)}‘`);
  }
  // W-13 Setup-Skript in einem leeren HOME: settings.json mit den vier Hooks, der Starter ruft den Wächter
  const home = join(ordner, 'home'); mkdirSync(home);
  execFileSync('sh', ['-c', setupText()], { env: { ...process.env, HOME: home } });
  let s = null; try { s = JSON.parse(readFileSync(join(home, '.claude/settings.json'), 'utf8')); } catch {}
  const h = s?.hooks || {}, cmd = (e, i = 0) => h[e]?.[0]?.hooks?.[i]?.command || '';
  if (!/uhrzeit$/.test(cmd('UserPromptSubmit')) || !/uhrzeit$/.test(cmd('PostToolUse')) || !/stop$/.test(cmd('Stop')) || !/fenster$/.test(cmd('PreToolUse')) || h.PreToolUse?.[0]?.matcher !== 'AskUserQuestion')
    fehler.push(`W-13 settings.json ohne die vier Hooks: ${JSON.stringify(h).slice(0, 200)}`);
  const starter = join(home, '.claude/regelwaechter.sh');
  if (!existsSync(starter)) fehler.push('W-13 Starter ~/.claude/regelwaechter.sh fehlt');
  else {
    const r = spawnSync('sh', ['-c', cmd('UserPromptSubmit').replace('~', home)], { input: JSON.stringify({ hook_event_name: 'UserPromptSubmit', transcript_path: schreibe([nachricht(0)]) }), encoding: 'utf8', env: { ...process.env, HOME: home, REGELWAECHTER_ORDNER: ordner } });
    // Der Starter sucht AppDesign unter /home/user – liegt es woanders (z. B. in der Prüfung), läuft er leer durch (Rückgabewert 0)
    const da = ['/home/user/appdesign', '/home/user/AppDesign', '/home/user/g811141a/appdesign'].some(d => existsSync(join(d, 'werkzeug/regelwaechter.mjs')));
    if (r.status !== 0 || (da && !/Regelwächter: erste Zeile/.test(r.stdout)) || (!da && r.stdout.trim())) fehler.push(`W-13 Starter: Rückgabewert ${r.status}, Ausgabe ‚${r.stdout.slice(0, 100)}‘`);
  }
} else {
  // Gegenprobe: jede Prüfung des Wächters einzeln abgeschaltet – die Prüfung muss sie vermissen
  const gruen = [];
  for (const nr of ['W-1', 'W-2', 'W-3', 'W-4', 'W-5', 'W-6', 'W-7', 'W-14', 'W-15', 'W-16', 'W-17']) {
    const f = lauf({ REGELWAECHTER_AUS: nr });
    if (!f.some(x => x.startsWith(nr))) gruen.push(nr);
  }
  if (gruen.length) fehler.push(`Gegenprobe: ohne ${gruen.join(', ')} bleibt die Prüfung grün – sie prüft diese Fälle nicht`);
  // APD-113/M-12 (seit 4.54.0): je neuer Teil abgeschaltet – genau seine Fälle werden rot
  for (const [teil, faelle] of [['W-15-Link', ['M-1']], ['W-15-Ende', ['M-4', 'M-15']], ['W-4-ohne-Grenze', ['M-5']], ['W-4-Abschnitt', ['M-6', 'M-7', 'M-16']],
    ['W-17-Commit', ['M-13']], ['W-17-Zurückweisung', ['M-17']]]) {
    const f = lauf({ REGELWAECHTER_AUS: teil }), fehlt = faelle.filter(m => !f.some(x => x.includes(`APD-113/${m} `)));
    if (fehlt.length) fehler.push(`Gegenprobe APD-113/M-12: ohne ${teil} bleiben ${fehlt.join(', ')} grün`);
  }
  // D-9: nur der Rückfall abgeschaltet – D-2, D-3, D-5 und D-7 müssen rot werden
  const r = lauf({ REGELWAECHTER_AUS: 'W-14-Rückfall' });
  const fehlt = ['D-2', 'D-3', 'D-5', 'D-7'].filter(d => !r.some(x => x.startsWith(`W-14 ${d}`)));
  if (fehlt.length) fehler.push(`Gegenprobe D-9: ohne Rückfall bleiben ${fehlt.join(', ')} grün`);
}
rmSync(ordner, { recursive: true, force: true });
if (fehler.length) { console.log(`✗ regelwaechter${gegenprobe ? ' (Gegenprobe)' : ''}: ${fehler.length} Fehler\n${fehler.map(f => '  - ' + f).join('\n')}`); process.exit(1); }
console.log(gegenprobe ? '✓ regelwaechter Gegenprobe: jede der Prüfungen W-1 bis W-7, W-14 (mit Rückfall D-2, D-3, D-5, D-7), W-15, W-16 und W-17 wird rot, wenn sie im Wächter fehlt; APD-113/M-1, M-4, M-5, M-6, M-7, M-13, M-15, M-16 und M-17 werden rot, wenn ihr Teil fehlt (M-12)' : '✓ regelwaechter: W-1 bis W-17 und APD-113/M-1 bis M-17 in Ordnung');
