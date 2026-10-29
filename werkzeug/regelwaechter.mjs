// AppDesign 4.39.0 · Regelwächter (APD-84/M-3, Testfall-Liste arbeit/APD-84 APD-83 Testfall-Liste.md APD-84/W-1 bis W-13; Zusammenarbeit
// allgemein 0, Kasten ‚Jede Antwort‘). Läuft als Hook von Claude Code – eingerichtet einmal über das Setup-Skript der Umgebung, den Text
// gibt `node werkzeug/regelwaechter.mjs setup` aus. Befehle (das JSON des Hooks kommt auf stdin, `transcript_path` = Sitzungsdatei):
//   uhrzeit  UserPromptSubmit und PostToolUse: gibt Claude die abgelesene Uhrzeitzeile für die nächste Ausgabe (0 Nr. 26 – nie schätzen)
//            und meldet, wenn die Sitzung nicht mit Opus 5.5 läuft (2.5); nach einem Werkzeug nur, wenn sich etwas geändert hat (W-10)
//   fenster  PreToolUse für AskUserQuestion: ein Fenster ohne ‚(Empfohlen)‘ zuerst bzw. ohne ‚Ich schreibe im Chat‘ wird gar nicht erst
//            gezeigt (W-5, 2.1)
//   stop     Stop: prüft die Antwort in der Sitzungsdatei (W-1 bis W-7) und lässt sie nicht enden, bis die Formpflichten stimmen –
//            höchstens zweimal je Antwort (W-9); danach werden nur noch neue Ausgaben geprüft
//   setup    gibt den Text für das Setup-Skript aus (W-13)
// Jeder Fehler (keine Sitzungsdatei, kaputtes JSON) lässt durch: Rückgabewert 0, keine Ausgabe (W-12) – nie eine Sitzung festhalten.
// Für die Prüfung: REGELWAECHTER_ORDNER (Zustand), REGELWAECHTER_JETZT (ISO-Zeit), REGELWAECHTER_AUS (Gegenprobe: W-n abschalten).
import { readFileSync, writeFileSync, mkdirSync, existsSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { istNachricht } from './messung.mjs';

export const SOLL_MODELL = 'claude-opus-5-5';
export const MAX_ABWEISUNGEN = 2;
const NBSP = '&nbsp;'.repeat(5);
const UHR = /^<sub>Aktuelle Uhrzeit: (\d{2}:\d{2})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\(Zeitabstand zu vorher: (–|\d{2}:\d{2})\)<\/sub>/;
const ZEIT = /<sub>⏱ [^\n]*?<\/sub>/;
const UEBERGABE = 'Die Sitzung (Chat) ist damit beendet!';
const CHAT = 'Ich schreibe im Chat';
const MESSUNG = fileURLToPath(new URL('messung.mjs', import.meta.url));

// Uhrzeit in deutscher Zeit (Europe/Berlin), Zeitabstand über Mitternacht (W-10)
export const uhr = ms => new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(ms);
const minute = s => +s.slice(0, 2) * 60 + +s.slice(3, 5);
const hm = m => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
export const abstand = (von, bis) => hm(((minute(bis) - minute(von)) % 1440 + 1440) % 1440);
export const uhrzeitzeile = (jetzt, vorher) => `<sub>Aktuelle Uhrzeit: ${jetzt}${NBSP}(Zeitabstand zu vorher: ${vorher ? abstand(vorher, jetzt) : '–'})</sub>`;
// genannte Uhrzeit hh:mm als Zeitpunkt – der nächstgelegene zum Zeitpunkt t (±12 h)
const zeitpunkt = (hhmm, t) => { let d = ((minute(hhmm) - minute(uhr(t))) % 1440 + 1440) % 1440; if (d > 720) d -= 1440; return Math.floor(t / 60000) * 60000 + d * 60000; };
const kurz = (s, n = 70) => { const z = s.trim().split('\n')[0]; return z.length > n ? z.slice(0, n) + ' …' : z; };
const text = c => typeof c === 'string' ? c : Array.isArray(c) ? c.map(b => b?.text || '').join('\n') : '';

export function lies(datei) {
  return readFileSync(datei, 'utf8').split('\n').flatMap(z => { try { return z.trim() ? [JSON.parse(z)] : []; } catch { return []; } });
}

// Der Verlauf der Hauptsitzung (ohne Hilfsagenten): Nachrichten des Nutzers, Ausgaben (Text je Modell-Aufruf, mit dem Zeitpunkt ihres
// Anlasses – letzte Nachricht bzw. letztes Werkzeug-Ergebnis davor), Auswahlfenster, Werkzeuge und ihre Ergebnisse.
export function verlauf(zeilen) {
  const ev = [], ausgabe = new Map();
  let anlass = null;
  for (const z of zeilen) {
    if (z.isSidechain) continue;
    const t = Date.parse(z.timestamp);
    const c = z.message?.content;
    if (z.type === 'user') {
      if (istNachricht(z)) ev.push({ art: 'nachricht', t, z });
      if (Array.isArray(c)) for (const b of c) if (b?.type === 'tool_result') ev.push({ art: 'ergebnis', t, id: b.tool_use_id, text: text(b.content) });
      if (!Number.isNaN(t)) anlass = t;
      continue;
    }
    if (z.type !== 'assistant' || !Array.isArray(c)) continue;
    for (const b of c) {
      // Befund 26.10.2026 (Sitzung 0051): Ausgaben nach einem Denkschritt in derselben Nachricht stehen in der Sitzungsdatei nicht
      // wörtlich, sondern als nicht leerer ‚thinking‘-Baustein (umformuliert, ohne Uhrzeitzeile) – sie sind ‚unsicher‘ und werden nicht
      // geprüft (Selbstkontrolle); echte Denkschritte sind leer
      if (b?.type === 'thinking' && b.thinking?.trim()) ev.push({ art: 'unsicher', t });
      else if (b?.type === 'text' && b.text?.trim()) {
        const id = z.message.id || z.uuid, a = ausgabe.get(id);
        if (a && ev.at(-1) === a) { a.text += '\n\n' + b.text; a.t = t; }
        else { const n = { art: 'text', t, anlass: anlass ?? t, text: b.text }; ausgabe.set(id, n); ev.push(n); }
      } else if (b?.type === 'tool_use') ev.push({ art: b.name === 'AskUserQuestion' ? 'fenster' : 'werkzeug', t, id: b.id, name: b.name, input: b.input || {} });
    }
  }
  return ev;
}
// Beginn der laufenden Antwort: die letzte echte Nachricht des Nutzers (wie messung.mjs); Kennung für den Zustand
const beginn = ev => ev.findLastIndex(e => e.art === 'nachricht');
const kennung = (ev, i) => i < 0 ? 'start' : ev[i].z.uuid || ev[i].z.timestamp || String(i);

// W-5: jede Frage mit ‚Ich schreibe im Chat‘ und der Empfehlung zuerst – ausgenommen Rückmeldungen zu Usertests ‚P-n: …‘
export function pruefeFenster(input, aus = []) {
  const fehler = [], F = (nr, t) => { if (!aus.includes(nr)) fehler.push(`${nr} ${t}`); };
  for (const q of input?.questions || []) {
    const l = (q.options || []).map(o => (o.label || '').trim()), frage = `„${kurz(q.question || '', 60)}“`;
    if (!l.includes(CHAT)) F('W-5', `${frage} ohne ‚${CHAT}‘ (0 Nr. 7)`);
    if (/^P-\d+(\/\d+)?:/.test(q.question || '')) continue;
    if (l.some(x => /\(Empfehlung\)/.test(x))) F('W-5', `${frage}: ‚(Empfehlung)‘ statt ‚(Empfohlen)‘ (2.1)`);
    else if (!l.some(x => x.endsWith('(Empfohlen)'))) F('W-5', `${frage} ohne Möglichkeit mit ‚(Empfohlen)‘ (2.1)`);
    else if (!l[0].endsWith('(Empfohlen)')) F('W-5', `${frage}: die Empfehlung steht nicht zuerst (2.1)`);
  }
  return fehler;
}

// Prüft die laufende Antwort (W-1 bis W-7). seit: Ausgaben und Fenster bis zu diesem Zeitpunkt wurden schon gemeldet (W-9).
export function pruefe(zeilen, { seit = null, aus = [] } = {}) {
  const ev = verlauf(zeilen), antwort = ev.slice(beginn(ev) + 1);
  const fehler = [], F = (nr, t) => { if (!aus.includes(nr)) fehler.push(`${nr} ${t}`); };
  const neu = e => !seit || e.t > seit;
  const texte = antwort.filter(e => e.art === 'text'), fenster = antwort.filter(e => e.art === 'fenster');
  const pos = e => ev.indexOf(e);
  // W-1 bis W-3: jede Ausgabe beginnt mit der abgelesenen Uhrzeitzeile, der Zeitabstand zählt ab der vorigen (0 Nr. 26, 2.2)
  const vorige = e => { for (let k = pos(e) - 1; k >= 0; k--) { const m = ev[k].art === 'text' && ev[k].text.trimStart().match(UHR); if (m) return m[1]; } return null; };
  for (const e of texte.filter(neu)) {
    const s = e.text.trimStart();
    if (/^<sub>⏱ [^\n]*<\/sub>\s*$/.test(s)) continue;   // nur die Zeitzeile
    const m = s.match(UHR);
    if (!m) { F('W-1', `Ausgabe ohne Uhrzeitzeile in der ersten Zeile: „${kurz(s)}“`); continue; }
    const ist = zeitpunkt(m[1], e.t), von = Math.floor(e.anlass / 60000) * 60000 - 60000, bis = e.t + 60000;
    if (ist < von || ist > bis) F('W-2', `Uhrzeit ${m[1]} nicht abgelesen – die Ausgabe entstand zwischen ${uhr(e.anlass)} und ${uhr(e.t)} (nie schätzen, 0 Nr. 27)`);
    // fehlt eine Ausgabe in der Sitzungsdatei (unsicher), lag die vorige Uhrzeitzeile später – der Abstand darf dann kleiner sein
    const v = vorige(e), soll = v ? abstand(v, m[1]) : '–';
    if (v ? m[2] === '–' || minute(m[2]) > minute(soll) : false) F('W-3', `Zeitabstand ${m[2]} statt ${soll} (vorige Uhrzeitzeile ${v})`);
  }
  // W-4: jede Antwort endet mit einem Auswahlfenster – einzige Ausnahme die Übergabe (0 Nr. 28)
  if (!fenster.length && !texte.some(e => e.text.includes(UEBERGABE)))
    F('W-4', 'die Antwort hat kein Auswahlfenster – jede Frage kommt ins Fenster, jede Antwort endet mit einem, nie ‚Sag Bescheid‘ (0 Nr. 28)');
  // W-5 (wie beim Zeigen, falls der Hook ‚fenster‘ fehlte)
  for (const e of fenster.filter(neu)) fehler.push(...pruefeFenster(e.input, aus));
  // W-6: die Zeitzeile steht ganz am Ende, nach dem letzten Fenster (2.1, 2.2)
  const letztes = fenster.at(-1), schluss = antwort.filter(e => e.art === 'text' || e.art === 'unsicher').at(-1);
  if (schluss?.art === 'unsicher' && (!letztes || pos(schluss) > pos(letztes))) return fehler;   // Schluss nicht wörtlich gespeichert
  if (letztes) for (const e of texte.filter(neu)) if (pos(e) < pos(letztes) && ZEIT.test(e.text))
    F('W-6', `Zeitzeile vor dem Auswahlfenster in „${kurz(e.text.trimStart())}“ – sie steht ganz am Ende, nach der letzten Antwort im Fenster (2.1)`);
  const ende = schluss && (!letztes || pos(schluss) > pos(letztes)) ? schluss.text.trimEnd().match(/<sub>⏱ [^\n]*<\/sub>$/)?.[0] : null;
  if (!ende) F('W-6', 'die Antwort endet nicht mit der Zeitzeile (nach dem letzten Fenster, 2.2)');
  // W-7: die Zeitzeile kommt unverändert aus messung.mjs, aufgerufen nach dem letzten Fenster (nie schätzen, 2.2)
  else {
    const ab = letztes ? pos(letztes) : -1;
    const aufrufe = new Set(antwort.filter(e => e.art === 'werkzeug' && pos(e) > ab && /messung\.mjs/.test(JSON.stringify(e.input))).map(e => e.id));
    if (!antwort.some(e => e.art === 'ergebnis' && aufrufe.has(e.id) && e.text.split('\n').some(z => z.trim() === ende)))
      F('W-7', `Zeitzeile nicht unverändert aus messung.mjs (nach dem letzten Fenster aufgerufen): „${ende}“`);
  }
  return fehler;
}

// Zustand je Sitzung (Zurückweisungen der laufenden Antwort, zuletzt gegebene Uhrzeitzeile)
const zustandDatei = (env, eingabe) => join(env.REGELWAECHTER_ORDNER || join(homedir(), '.regelwaechter'), `${String(eingabe.session_id || 'sitzung').replace(/[^\w-]/g, '_')}.json`);
const ladeZustand = d => { try { return JSON.parse(readFileSync(d, 'utf8')) || {}; } catch { return {}; } };
const speichere = (d, z) => { try { mkdirSync(join(d, '..'), { recursive: true }); writeFileSync(d, JSON.stringify(z)); } catch {} };
// nur die Sitzungsdatei aus dem Hook – ohne sie (z. B. kaputtes JSON) lässt der Wächter durch (W-12)
const datei = eingabe => { const f = eingabe.transcript_path; return typeof f === 'string' && existsSync(f) ? f : null; };
const letzteUhrzeit = ev => { for (let k = ev.length - 1; k >= 0; k--) { const m = ev[k].art === 'text' && ev[k].text.trimStart().match(UHR); if (m) return m[1]; } return null; };

export function fuehreAus(befehl, eingabe, { env = process.env, jetzt = Date.now() } = {}) {
  const aus = (env.REGELWAECHTER_AUS || '').split(',').filter(Boolean);
  if (befehl === 'fenster') {
    const fehler = pruefeFenster(eingabe.tool_input, aus);
    return fehler.length ? { hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason:
      `Regelwächter (Zusammenarbeit 0 Nr. 7, 2.1) – Fenster so nicht zeigen:\n${fehler.map(f => '- ' + f).join('\n')}\nNeu stellen: die Empfehlung zuerst mit ‚(Empfohlen)‘ und Grund in der Beschreibung, immer ‚${CHAT}‘.` } } : null;
  }
  const f = datei(eingabe);
  const zeilen = f ? lies(f) : [];
  const ev = verlauf(zeilen), zd = zustandDatei(env, eingabe), zustand = ladeZustand(zd);
  const zeile = uhrzeitzeile(uhr(jetzt), letzteUhrzeit(ev));
  if (befehl === 'uhrzeit') {
    // W-11: Modell des letzten eigenen Aufrufs – weicht es ab, mit dem Grund aus der Sitzungsdatei (model_fallback)
    const modell = zeilen.findLast(z => z.type === 'assistant' && !z.isSidechain && z.message?.model && z.message.model !== '<synthetic>')?.message.model;
    const rueck = zeilen.findLast(z => z.subtype === 'model_fallback');
    const warnung = modell && modell !== SOLL_MODELL ? ` ⚠ Modell: ${modell} statt ${SOLL_MODELL}${rueck?.content ? ` (${rueck.content})` : ''} – in der nächsten Ausgabe nennen (2.5).` : '';
    const ereignis = eingabe.hook_event_name || 'UserPromptSubmit', schluessel = `${zeile}|${modell}`;
    if (ereignis === 'PostToolUse' && zustand.uhrzeit === schluessel) return null;
    speichere(zd, { ...zustand, uhrzeit: schluessel });
    const v = letzteUhrzeit(ev);
    return { hookSpecificOutput: { hookEventName: ereignis, additionalContext: `Regelwächter: erste Zeile der nächsten Ausgabe: ${zeile} – Zeitabstand ab ${v ? `der letzten Uhrzeitzeile in der Sitzungsdatei (${v}); stand danach schon eine weitere, ab ihr rechnen` : '– (keine Uhrzeitzeile in der Sitzungsdatei)'}.${warnung}` } };
  }
  if (befehl === 'stop') {
    if (!f) return null;
    const k = kennung(ev, beginn(ev)), z = zustand.antwort === k ? zustand : { ...zustand, antwort: k, abweisungen: 0, seit: null };
    if (z.abweisungen >= MAX_ABWEISUNGEN) return null;
    const fehler = pruefe(zeilen, { seit: z.seit, aus });
    if (!fehler.length) return null;
    speichere(zd, { ...z, abweisungen: z.abweisungen + 1, seit: z.seit ?? jetzt });
    const fenster = fehler.some(x => x.startsWith('W-4'));
    return { decision: 'block', reason: `Regelwächter (Zusammenarbeit 0, Kasten ‚Jede Antwort‘) – Zurückweisung ${z.abweisungen + 1} von ${MAX_ABWEISUNGEN}, die Antwort ist noch nicht fertig:\n${fehler.map(x => '- ' + x).join('\n')}\n` +
      `Hole jetzt nach, in dieser Reihenfolge: (1) eine neue Ausgabe, erste Zeile die Uhrzeitzeile ${zeile} (Zeitabstand ab der letzten Uhrzeitzeile, die du ausgegeben hast) – nenne darin kurz den Regelbruch (schon Gesendetes lässt sich nicht ändern)` +
      `${fenster ? `; (2) das Auswahlfenster: kurze Frage, die Empfehlung zuerst mit ‚(Empfohlen)‘, immer ‚${CHAT}‘` : ''}; (${fenster ? 3 : 2}) zuletzt \`node ${MESSUNG}\` aufrufen und die Zeitzeile unverändert ans Ende setzen.` };
  }
  return null;
}

// W-13: Text für das Setup-Skript der Umgebung – ein Starter, der den Wächter im AppDesign-Repo der Sitzung sucht (fehlt es, läuft
// nichts), und ~/.claude/settings.json mit den vier Hooks
export function setupText() {
  const hook = (befehl, matcher) => ({ ...(matcher !== undefined ? { matcher } : {}), hooks: [{ type: 'command', command: `~/.claude/regelwaechter.sh ${befehl}`, timeout: 30 }] });
  const settings = { hooks: { UserPromptSubmit: [hook('uhrzeit')], PostToolUse: [hook('uhrzeit', '')], PreToolUse: [hook('fenster', 'AskUserQuestion')], Stop: [hook('stop')] } };
  return `# Regelwächter (AppDesign APD-84): Hooks für jede Sitzung dieser Umgebung
mkdir -p ~/.claude
cat > ~/.claude/regelwaechter.sh <<'ENDE'
#!/bin/sh
# Regelwächter aus dem AppDesign-Repo der Sitzung – fehlt es, läuft nichts
N=$(command -v node || echo /opt/node22/bin/node)
for d in /home/user/appdesign /home/user/AppDesign /home/user/g811141a/appdesign; do
  [ -f "$d/werkzeug/regelwaechter.mjs" ] && exec "$N" "$d/werkzeug/regelwaechter.mjs" "$@"
done
exit 0
ENDE
chmod +x ~/.claude/regelwaechter.sh
cat > ~/.claude/settings.json <<'ENDE'
{"hooks": {
${Object.entries(settings.hooks).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n')}
}}
ENDE
`;
}

export function hauptprogramm(argv = process.argv.slice(2), env = process.env) {
  const befehl = argv[0];
  if (befehl === 'setup') { process.stdout.write(setupText()); return 0; }
  try {
    let eingabe = {};
    try { eingabe = JSON.parse(readFileSync(0, 'utf8') || '{}') || {}; } catch {}
    const jetzt = env.REGELWAECHTER_JETZT ? Date.parse(env.REGELWAECHTER_JETZT) : Date.now();
    const r = fuehreAus(befehl, eingabe, { env, jetzt });
    if (r) process.stdout.write(JSON.stringify(r));
  } catch (e) { if (env.REGELWAECHTER_FEHLER) console.error(e); }
  return 0;
}

// seit 4.40.0: über den echten Pfad vergleichen – der Starter ruft über den Verweis /home/user/appdesign (CLAUDE.md), sonst liefe nichts
if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) process.exit(hauptprogramm());
