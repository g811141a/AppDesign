// AppDesign 4.22.0 · Zeile ‚Zeit und Token‘ aus den Sitzungsdaten (A-12, Fall-Liste arbeit/A-12 Fall-Liste.md M-1 bis M-14;
// Zusammenarbeit allgemein §2). Claude ruft es am Ende jeder Antwort auf und übernimmt die Zeile unverändert – nie schätzen.
//   node werkzeug/messung.mjs [--datei <sitzung.jsonl>] [--jetzt <ISO-Zeit>]
// Zeit: ab der letzten Nachricht des Nutzers bis jetzt, ohne Wartezeit in Auswahlfenstern (M-1 bis M-4).
// Token: alle Modell-Aufrufe zwischen der vorletzten und der letzten Nachricht des Nutzers, je Aufruf einmal (M-5, Fund 2);
// ‚neu‘ = Eingabe + Ausgabe, ‚aus Zwischenspeicher‘ = gelesen, ‚geschrieben‘ = in den Zwischenspeicher geschrieben.
// Kontext (seit 4.22.0, A-20, Fall-Liste arbeit/A-20 Fall-Liste.md K-1 bis K-12): Größe der Sitzung = Eingabe + gelesen +
// geschrieben des letzten eigenen Modell-Aufrufs (nicht die Summe der Antwort, nicht die Hilfsagenten); ab GRENZE oder nach einer
// automatischen Zusammenfassung ‚⚠ Übergabe fällig‘ (Zusammenarbeit 0 Nr. 13).
// Rückgabewert 0 = Zeile ausgegeben, 1 = keine Sitzungsdaten (M-9).
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJEKTE = '/root/.claude/projects';
export const GRENZE = 300000;

// M-7/M-8: Datei der Sitzung – bei mehreren Ordnern (Neustart) die zuletzt geänderte; ohne Kennung die neueste überhaupt.
export function sitzungsdatei(kennung = process.env.CLAUDE_CODE_SESSION_ID, wurzel = PROJEKTE) {
  if (!existsSync(wurzel)) return null;
  const alle = readdirSync(wurzel).flatMap(o => {
    try { return readdirSync(join(wurzel, o)).filter(f => f.endsWith('.jsonl')).map(f => join(wurzel, o, f)); } catch { return []; }
  });
  const passend = kennung ? alle.filter(f => f.endsWith(`/${kennung}.jsonl`)) : [];
  const liste = passend.length ? passend : alle;
  return liste.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)[0] || null;
}

function lies(datei) {
  const zeilen = [], kaputt = [];
  readFileSync(datei, 'utf8').split('\n').forEach((z, i) => {
    if (!z.trim()) return;
    try { zeilen.push(JSON.parse(z)); } catch { kaputt.push(i + 1); }
  });
  return { zeilen, kaputt };
}

// M-12: Nebenstränge der Hilfsagenten liegen im Ordner <kennung>/subagents/
function nebenstraenge(datei) {
  const ordner = join(datei.replace(/\.jsonl$/, ''), 'subagents');
  if (!existsSync(ordner)) return [];
  return readdirSync(ordner).filter(f => f.endsWith('.jsonl')).flatMap(f => lies(join(ordner, f)).zeilen);
}

const inhalt = z => z.message?.content;
// M-3/M-4: echte Nachricht des Nutzers – Text, kein Werkzeug-Ergebnis, keine Systemmeldung (Neustart, Hintergrund, Start)
function istNachricht(z) {
  if (z.type !== 'user' || z.isMeta || z.isSidechain || z.isCompactSummary) return false;
  if (z.origin && !['human', 'user'].includes(z.origin.kind)) return false;
  const c = inhalt(z);
  if (typeof c === 'string') return c.trim() !== '';
  return Array.isArray(c) && c.some(b => b.type === 'text') && !c.some(b => b.type === 'tool_result');
}
const zeit = z => Date.parse(z.timestamp);

export function messe(zeilen, jetzt = Date.now()) {
  const nutzer = zeilen.filter(z => z.type === 'user' && z.timestamp);
  const nachrichten = nutzer.filter(istNachricht);
  // M-3: Sitzung von einer anderen Sitzung gestartet – dann zählt der Starttext (erster Eintrag) als erste Nachricht
  if (nutzer.length && nachrichten[0] !== nutzer[0]) nachrichten.unshift(nutzer[0]);
  if (!nachrichten.length) return null;
  const letzte = zeit(nachrichten.at(-1)), vorletzte = nachrichten.length > 1 ? zeit(nachrichten.at(-2)) : null;

  // M-2: Wartezeit in Auswahlfenstern (AskUserQuestion gezeigt → Antwort als Werkzeug-Ergebnis)
  const frage = new Map();
  for (const z of zeilen) if (z.type === 'assistant' && Array.isArray(inhalt(z)))
    for (const b of inhalt(z)) if (b.type === 'tool_use' && b.name === 'AskUserQuestion') frage.set(b.id, zeit(z));
  let warten = 0;
  for (const z of nutzer) if (Array.isArray(inhalt(z))) for (const b of inhalt(z)) {
    const ab = b.type === 'tool_result' && frage.get(b.tool_use_id);
    if (ab && ab >= letzte) warten += Math.max(0, Math.min(zeit(z), jetzt) - ab);
  }
  const ms = Math.max(0, jetzt - letzte - warten);

  // M-5: Token der vorigen Antwort, je Modell-Aufruf (message.id) einmal; M-6: keine vorige Antwort
  let token = null;
  if (vorletzte !== null) {
    const gesehen = new Set();
    token = { neu: 0, gelesen: 0, geschrieben: 0 };
    for (const z of zeilen) {
      if (z.type !== 'assistant' || !z.timestamp || zeit(z) < vorletzte || zeit(z) >= letzte) continue;
      const u = z.message?.usage, id = z.message?.id || z.requestId || z.uuid;
      if (!u || gesehen.has(id)) continue;
      gesehen.add(id);
      token.neu += (u.input_tokens || 0) + (u.output_tokens || 0);
      token.gelesen += u.cache_read_input_tokens || 0;
      token.geschrieben += u.cache_creation_input_tokens || 0;
    }
  }
  // K-4/K-6/K-8: Kontext des letzten eigenen Modell-Aufrufs; K-7: nach einer Zusammenfassung immer Übergabe fällig
  const aufruf = zeilen.findLast(z => z.type === 'assistant' && !z.isSidechain && z.message?.usage && (!z.timestamp || zeit(z) <= jetzt));
  const u = aufruf?.message.usage;
  const kontext = u ? (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0) : null;
  const faellig = zeilen.some(z => z.isCompactSummary) || (kontext ?? 0) >= GRENZE;
  return { ms, token, kontext, faellig, ab: nachrichten.at(-1).timestamp };
}

// M-10: ab 60 Minuten hh:mm:ss; M-11: Tausenderpunkt
export const dauer = ms => {
  const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), z = n => String(n).padStart(2, '0');
  return h ? `${z(h)}:${z(Math.floor(s / 60) % 60)}:${z(s % 60)}` : `${z(Math.floor(s / 60))}:${z(s % 60)}`;
};
export const zahl = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export function zeile({ ms, token, kontext = null, faellig = false }) {
  const t = token ? `${zahl(token.neu)} neu · ${zahl(token.gelesen)} aus Zwischenspeicher · ${zahl(token.geschrieben)} geschrieben` : '–';
  const k = `Kontext ${kontext === null ? '–' : zahl(kontext)}${faellig ? ' ⚠ Übergabe fällig' : ''}`;
  return `<sub>⏱ ${dauer(ms)} · Token vorige Antwort: ${t} · ${k}</sub>`;
}

export function hauptprogramm(argv = process.argv.slice(2), env = process.env) {
  const opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
  const datei = opt('--datei') || sitzungsdatei(env.CLAUDE_CODE_SESSION_ID);
  if (!datei || !existsSync(datei)) { console.error('✗ messung: keine Sitzungsdaten gefunden – Zeile nicht schätzen, Fehler nennen'); return 1; }
  const { zeilen, kaputt } = lies(datei);
  const m = messe([...zeilen, ...nebenstraenge(datei)].sort((a, b) => (zeit(a) || 0) - (zeit(b) || 0)), opt('--jetzt') ? Date.parse(opt('--jetzt')) : Date.now());
  if (!m) { console.error(`✗ messung: keine Nachricht des Nutzers in ${datei}`); return 1; }
  if (kaputt.length) console.error(`ℹ messung: ${kaputt.length} unlesbare Zeile(n) übersprungen (${kaputt.slice(0, 5).join(', ')})`);
  console.error(`ℹ messung: ab der Nachricht vom ${m.ab} · ${datei}`);
  console.log(zeile(m));
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exit(hauptprogramm());
