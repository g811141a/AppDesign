// AppDesign 4.39.0 · Prüfung des Regelwächters werkzeug/regelwaechter.mjs (APD-84/M-3, Testfall-Liste arbeit/APD-84 APD-83 Testfall-Liste.md
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
const frage = (labels, question = 'Soll ich Version 4.39.0 mit APD-84 erstellen?') => ({ questions: [{ question, header: 'Version', multiSelect: false, options: labels.map(option) }] });
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
  const rueck = frage(['Alles ok', 'Nicht ok – ich schreibe im Chat', 'Ich prüfe später', 'Ich schreibe im Chat'], 'P-77: Wie ist die Prüfung ausgegangen?');
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
  genau(stop(antwort({ ohneMessungDavor: true })), 'W-14', 'C-5 ‚Kontext N‘ ohne messung.mjs davor');
  const k6 = antwort({ ohneKontext: true, zwischen: `${UZ('14:02', '14:00')}\n\nJetzt die Frage.\n\n${Z}` });
  pruefe(abgelehnt(vorher(k6)), 'W-14 C-6 ‚Kontext N‘ nur in der Zeitzeile wird nicht abgelehnt');
  const k7 = antwort({ ohneKontext: true, zwischen: `${UZ('14:02', '14:00')}\n\nOhne Kontext.` }); k7.splice(k7.findIndex(z => z.message?.content?.[0]?.text?.includes('Ohne Kontext')), 1, bausteine(135, [{ type: 'thinking', thinking: 'umformuliert' }]));
  pruefe(!vorher(k7) && !stop(k7).some(x => x.startsWith('W-14')), 'W-14 C-7 nicht wörtlich gespeicherte Ausgabe vor dem Fenster wird abgelehnt');
  pruefe(!vorher(k2, 'gibt-es-noch-nicht'), 'W-14 C-8 Fenster noch nicht in der Sitzungsdatei wird vor dem Zeigen abgelehnt');
  pruefe(!stop(antwort({ ohneFenster: true, ohneMessungDavor: true, ohneKontext: true, zwischen: `${UZ('14:02', '14:00')}\n\nOhne Kontext.`, schluss: `${UZ('14:06', '14:02')}\n\nÜbergabe.\n\n**Die Sitzung (Chat) ist damit beendet!**\n\n${Z}` })).length, 'W-14 C-9 Übergabe ohne Fenster wird zurückgewiesen');
  pruefe(!vorher(antwort({ ohneKontext: true, zwischen: `${UZ('14:02', '14:00')}\n\nKontext 120000 ohne Punkte.` })), 'W-14 C-10 ‚Kontext 120000‘ ohne Tausenderpunkte wird abgelehnt');

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

  // W-9 höchstens zwei Zurückweisungen je Antwort; danach nur noch neue Ausgaben
  const w9 = antwort({ ohneFenster: true });
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
  for (const nr of ['W-1', 'W-2', 'W-3', 'W-4', 'W-5', 'W-6', 'W-7', 'W-14']) {
    const f = lauf({ REGELWAECHTER_AUS: nr });
    if (!f.some(x => x.startsWith(nr))) gruen.push(nr);
  }
  if (gruen.length) fehler.push(`Gegenprobe: ohne ${gruen.join(', ')} bleibt die Prüfung grün – sie prüft diese Fälle nicht`);
}
rmSync(ordner, { recursive: true, force: true });
if (fehler.length) { console.log(`✗ regelwaechter${gegenprobe ? ' (Gegenprobe)' : ''}: ${fehler.length} Fehler\n${fehler.map(f => '  - ' + f).join('\n')}`); process.exit(1); }
console.log(gegenprobe ? '✓ regelwaechter Gegenprobe: jede der Prüfungen W-1 bis W-7 und W-14 wird rot, wenn sie im Wächter fehlt' : '✓ regelwaechter: W-1 bis W-14 in Ordnung');
