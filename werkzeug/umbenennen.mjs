// AppDesign 4.36.0 · Umbau des Nummernschemas (APD-78, Testfall-Liste `arbeit/APD-78 Testfall-Liste.md` U-1 bis U-6).
// Benennt in den lebenden Dateien von AppDesign, ReiseLogBuch und ReiseLogBuch-Import (nebeneinander) alle Nummern nach dem
// Schema in Zusammenarbeit 2.4 ‚Nummern und Präfixe‘ um – nach den Tabellen in ZUORDNUNG.md, nicht von Hand:
//   Themen A-n → APD-n, T-n → RLB-n (T-Treffer bis 66 nach ZUORDNUNG 4), Import-Regeln N-n → I-n, Erledigt ohne E-Nummer
//   (ZUORDNUNG 2 und 3), lokale Nummern außerhalb ihrer Datei mit Elternnummer (APD-63/X-2), lokale Buchstaben, die überall
//   gelten, neu (ZUORDNUNG 5), keine führenden Nullen, Begriffe (Usertest, Testfälle, Testfall-Liste), Dateinamen in arbeit/.
// Unverändert bleiben fassung/, .git/, Messdateien, Bilder, JSON und ZUORDNUNG.md (U-2).
//   node werkzeug/umbenennen.mjs              zeigt nur, was sich ändern würde (Bericht in werkzeug/out/umbenennen.txt)
//   node werkzeug/umbenennen.mjs --schreiben  schreibt (ein zweiter Lauf ändert nichts, U-1)
// Rückgabewert 0 = in Ordnung, 1 = Stellen ohne Entscheidung (nichts geschrieben).
import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const AD = fileURLToPath(new URL('../', import.meta.url));
const REPOS = [['AppDesign', AD], ['ReiseLogBuch', AD + '../ReiseLogBuch/'], ['ReiseLogBuch-Import', AD + '../ReiseLogBuch-Import/']];
const schreiben = process.argv.includes('--schreiben');
const bericht = [], offen = [];
const zahl = n => String(+n);

// Dateiname: ‚arbeit/A-74 Fall-Liste.md‘ → ‚arbeit/APD-74 Testfall-Liste.md‘
function neuerName(f) { return /^arbeit\//.test(f) ? f.replace(/(?<![\w-])A-0*(\d+[a-z]?)(?=[ .\/-])/g, 'APD-$1').replace(/(?<![\w-])T-(0\d|\d{3}|6[7-9]|[7-9]\d)(?=[ .\/])/g, (m, n) => `RLB-${+n}`).replace(/(?<!Test)Fall-Liste/g, 'Testfall-Liste') : f; }

// ---------- Tabellen aus ZUORDNUNG.md ----------
const zu = readFileSync(AD + 'ZUORDNUNG.md', 'utf8');
const abschnitt = n => zu.split(new RegExp(`\\n## ${n}\\. `))[1]?.split(/\n## /)[0] || '';
const zeilen = n => abschnitt(n).split('\n').filter(l => /^\| (?!-)/.test(l) && !/^\| (alt|Datei|Thema|Thema oder Datei|Repo) \|/.test(l)).map(l => l.slice(2, -2).split(' | ').map(s => s.trim().replace(/^`|`$/g, '')));
const erledigt = { AppDesign: Object.fromEntries(zeilen(2).map(([a, b]) => [a, b])), ReiseLogBuch: Object.fromEntries(zeilen(3).map(([a, b]) => [a, b])) };
const tTreffer = new Map(zeilen(4).flatMap(([repo, f, z, , d]) => [[`${repo}/${f}:${z}`, d], [`${repo}/${neuerName(f)}:${z}`, d]]));
const buchstaben = {}; for (const [t, a, b] of zeilen(5)) (buchstaben[t] ??= {})[a] = b;
const dateiBuchstaben = (f, L) => Object.entries(buchstaben).find(([k, v]) => k.includes(' ') && neuerName(f).includes(k.replace(/^T-0?(\d)/, 'RLB-$1')) && v[L])?.[1][L];
const stellen = new Map(zeilen(6).flatMap(([repo, f, z, a, b]) => [[`${repo}/${f}:${z}:${a}`, b], [`${repo}/${neuerName(f)}:${z}:${a}`, b]]));
const frueh = new Map(zeilen(7).map(([a, b]) => [a, b]));   // frühe Nummern (S-01, F-01, B-01 …) → neue Form

// ---------- Dateien ----------
// Von Hand umgeschrieben (Texte über das alte Schema): nur der Dateiname ändert sich
const vonHand = new Set(['arbeit/APD-78 Recherche Präfixe.md', 'arbeit/APD-78 Testfall-Liste.md']);
const ausgenommen = f => /^fassung\/|node_modules\/|(^|\/)messungen\/|Messungen\/|\.(png|jpe?g|gif|heic|pdf|ico|webp|json)$/i.test(f)
  || f === 'ZUORDNUNG.md' || f === 'werkzeug/umbenennen.mjs' || f === 'tests/doku.mjs' || vonHand.has(f);   // doku.mjs: die Schema-Prüfung selbst
const alleDateien = dir => execFileSync('git', ['-C', dir, 'ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(f => f && !/^fassung\//.test(f));
const liste = dir => alleDateien(dir).filter(f => !ausgenommen(f));
const istCode = f => /\.(m?js|css|html|sh)$/.test(f) || f === '.gitignore';

// Themen im Dateinamen einer Arbeitsdatei: ‚A-21 A-22 Fall-Liste.md‘ → APD-21, APD-22
const thema = (p, n) => `${p === 'A' || p === 'APD' ? 'APD' : 'RLB'}-${zahl(n)}`;
const themenImNamen = f => /^arbeit\//.test(f) ? [...f.slice(7).matchAll(/(?<![\w/-])(APD|RLB|A|T)-(\d+)[a-z]?(?=[ .])/g)].map(m => thema(m[1], m[2])) : [];

// Definitionen: welche lokalen Nummern stehen in den Arbeitsdateien eines Themas (für die Wahl der Elternnummer)
const definiert = {};
for (const f of liste(AD).filter(f => /^arbeit\//.test(f))) {
  const ts = themenImNamen(f); if (!ts.length) continue;
  const t = readFileSync(AD + f, 'utf8');
  const add = (L, n) => { for (const x of ts) (definiert[x] ??= new Set()).add(`${L}-${zahl(n)}`); };
  for (const m of t.matchAll(/(?<![\w/.-])([A-Z])-?(\d+)(?![\w])/g)) add(m[1], m[2]);
  // Bereiche ‚Q-1 bis Q-12‘ bzw. ‚Q1–Q12‘ definieren alle Nummern dazwischen
  for (const m of t.matchAll(/(?<![\w/.-])([A-Z])-?(\d+) ?(?:bis|–|-) ?\1-?(\d+)(?![\w])/g)) for (let k = +m[2]; k <= +m[3] && k - m[2] < 60; k++) add(m[1], k);
}
// Streng: Nummern, die eine Arbeitsdatei selbst festlegt (Zeilenanfang einer Tabelle oder Liste) – für A, T, E, N, die wie alte
// Nummern aussehen, gilt nur das als ‚eigene Datei‘
const festgelegt = {};
for (const f of liste(AD).filter(f => /^arbeit\//.test(f))) for (const m of readFileSync(AD + f, 'utf8').matchAll(/^(?:\| ?|- |\d+\. )?\**([A-Z])-(\d+)\b|<td[^>]*>\s*(T)-(\d+)\b/gm))
  (festgelegt[f] ??= new Set()).add(`${m[1] || m[3]}-${zahl(m[2] || m[4])}`);
const festThema = {};
for (const [f, set] of Object.entries(festgelegt)) for (const t of themenImNamen(f)) for (const x of set) (festThema[t] ??= new Set()).add(x);
const GLOBAL = new Set(['APD', 'RLB', 'RLI', 'P', 'R', 'G', 'I', 'K']);

// ---------- Begriffe (K5) – längere zuerst ----------
const BEGRIFFE = [
  [/Fall-Listen/g, 'Testfall-Listen'], [/(?<!Test)Fall-Liste/g, 'Testfall-Liste'],
  [/Punkte? der Prüfliste/g, m => m.startsWith('Punkte ') ? 'Testfälle (User)' : 'Testfall (User)'],
  [/Geräte-Prüfliste/g, 'Testfälle (User)'], [/in der Prüfliste/g, 'in den Testfällen'], [/mit nummerierter Prüfliste/g, 'mit nummerierten Testfällen'],
  [/(mit|ohne) Prüfliste/g, (m, w) => `${w} Testfällen`.replace('ohne Testfällen', 'ohne Testfälle')], [/eine Prüfliste/g, 'Testfälle'],
  [/Prüfliste((?: [^ .,;:()‚]+){0,4}) beginnt/g, 'Testfälle$1 beginnen'], [/Prüfliste mit \/0 ‚Version prüfen‘ fehlt/g, 'Testfälle mit /0 ‚Version prüfen‘ fehlen'],
  [/Prüflisten/g, 'Testfälle'], [/Prüfliste/g, 'Testfälle'],
  [/Prüfpunkt(?:en|es|s)\b/g, 'Usertests'], [/Prüfpunkte\b/g, 'Usertests'], [/Prüfpunkt\b/g, 'Usertest'],
];

// ---------- eine Datei ----------
function umbauen(repo, f, text) {
  const code = istCode(f);   // im Code steht jede lokale Nummer mit Elternnummer (Kennungen werden verglichen)
  const ownTopics = themenImNamen(f);
  const lines = text.split('\n');
  const kopf = lines.slice(0, 6).join('\n');
  const standard = repo === 'ReiseLogBuch-Import' ? [] : ownTopics.length ? ownTopics
    : [...kopf.matchAll(/(?<![\w/-])(APD|RLB|A|T)-(\d+)/g)].filter(m => !(m[1] === 'A' && m[2].length === 1) && !(m[1] === 'T' && repo === 'AppDesign')).map(m => thema(m[1], m[2]));
  const imErledigt = f === 'BACKLOG.md' ? lines.findIndex(l => /^## Erledigt/.test(l)) : -1;
  // Themen je Zeile (für die Elternnummer)
  const themen = lines.map(l => [...l.matchAll(/(?<![\w-])(?:(?<=arbeit\/)|(?<!\/))(APD|RLB|A|T)-(\d+)(?![\w])/g)]
    .filter(m => m[1] === 'APD' || m[1] === 'RLB' || (m[1] === 'A' && (m[2].length > 1)) || (m[1] === 'T' && (m[2].startsWith('0') || +m[2] >= 67 || repo !== 'AppDesign' && m[2].length > 1)))
    .map(m => ({ t: thema(m[1], m[2]), i: m.index, e: m.index + m[0].length })));
  // Grenze für die Suche nach dem Thema: Überschrift; Tabellenzeilen außerhalb von arbeit/ stehen je für sich
  const grenze = i => /^#/.test(lines[i]) || (!/^arbeit\//.test(f) && /^\|/.test(lines[i]));

  const out = lines.map((l, i) => {
    const key = `${repo}/${f}:${i + 1}`;
    if (tTreffer.get(key) === 'Hand') return l;
    let line = l;
    // K1: Nr. der Erledigt-Zeile
    if (imErledigt >= 0 && i > imErledigt) line = line.replace(/^\| E-(\d+) \|/, (m, n) => {
      const neu = erledigt[repo]?.[`E-${n}`];
      if (!neu) { offen.push(`${key}: E-${n} ohne Zeile in ZUORDNUNG 2/3`); return m; }
      return `| ${neu} |`;
    });
    const qualifiziert = new Set();   // Eltern, die in dieser Zeile schon genannt sind
    let zuletzt = null;               // Elternnummer der vorigen lokalen Nummer dieser Zeile (‚B-1 bis B-12‘)
    for (const m of line.matchAll(/(APD|RLB|RLI)-\d+\//g)) qualifiziert.add(m[0].slice(0, -1));
    const ersetzungen = [];
    for (const m of line.matchAll(/(?<![\w.\-])(APD|RLB|RLI|[A-Z])-(\d+)([a-z]?)(?![\w]|-\d)/g)) {
      const [ganz, L, n, sfx] = m, at = m.index;
      const sk0 = `${key}:${L}-${n}`;
      if (stellen.get(sk0) === 'weg') { const s0 = line[at - 1] === '/' ? at - 1 : at; ersetzungen.push({ at: s0, len: at - s0 + ganz.length, neu: '' }); continue; }
      if (!code && !GLOBAL.has(L) && !/^[ATEN]$/.test(L) && /(?:(?:APD|RLB|RLI)-\d+[a-z]?|(?:APD|RLB|RLI) \d+\.\d+\.\d+)\/[A-Z]-\d+/.test(line.slice(0, at)) && !stellen.has(sk0)) continue;
      // nach einem Schrägstrich: schon mit Elternnummer (APD-63/X-2) oder lokale Folge (T-1/T-2) – nur Themen (A-27/A-28) werden umbenannt
      if (line[at - 1] === '/' && (/(?:(?:APD|RLB|RLI)-\d+[a-z]?|(?:APD|RLB|RLI) \d+\.\d+\.\d+)\/$/.test(line.slice(0, at)) || !/^(A|T)$/.test(L) || (L === 'A' && n.length === 1) || (L === 'T' && repo === 'AppDesign' && !n.startsWith('0') && +n < 67) || (L === 'T' && n.length === 1))) continue;
      const neu = entscheide(L, n, sfx, at);
      if (neu !== null && neu !== ganz) ersetzungen.push({ at, len: ganz.length, neu });
    }
    function entscheide(L, n, sfx, at) {
      const tok = `${L}-${zahl(n)}`, sk = `${key}:${L}-${n}`;
      if (stellen.has(sk)) return stellen.get(sk) === 'bleibt' ? null : stellen.get(sk);
      if (frueh.has(`${L}-${n}`) && n.startsWith('0')) {
        const [e, nr] = frueh.get(`${L}-${n}`).split('/');
        if (nr && zuletzt === e) return nr + sfx;
        if (nr) zuletzt = e;
        return frueh.get(`${L}-${n}`) + sfx;
      }
      if (L === 'APD' || L === 'RLB' || L === 'RLI') return `${L}-${zahl(n)}${sfx}`;
      if (L === 'R') return null;
      // lokaler Buchstabe, der überall gilt, in seiner eigenen Datei (K2)
      if (GLOBAL.has(L)) {
        const d = dateiBuchstaben(f, L); if (d) return `${d}-${zahl(n)}${sfx}`;
        const t = ownTopics.find(t => definiert[t]?.has(tok) && buchstaben[t]?.[L]); if (t) return `${buchstaben[t][L]}-${zahl(n)}${sfx}`;
      }
      if (L === 'P' || L === 'G') return `${L}-${zahl(n)}${sfx}`;
      if (L === 'A' && n.length > 1) return `APD-${zahl(n)}${sfx}`;
      if (L === 'T') {
        if (repo !== 'AppDesign' && n.length > 1) return `RLB-${zahl(n)}${sfx}`;
        if (repo === 'AppDesign' && (n.startsWith('0') || +n >= 67)) return `RLB-${zahl(n)}${sfx}`;
        const d = tTreffer.get(key) || (festgelegt[f]?.has(tok) ? 'eigen' : null);
        if (d === 'eigen') return lokal(L, n, sfx, at);
        if (!d) { offen.push(`${key}: ${tok} – keine Entscheidung in ZUORDNUNG 4 (K3)`); return null; }
        if (d === 'RLB') return `RLB-${zahl(n)}${sfx}`;
        return lokal(L, n, sfx, at, d);
      }
      if (L === 'N' && (repo === 'ReiseLogBuch-Import' || /T-05 Anforderungen|RLB-5 Anforderungen/.test(f))) return `I-${zahl(n)}${sfx}`;
      if (L === 'I' && repo === 'ReiseLogBuch-Import') return null;
      if (L === 'K' && (repo === 'ReiseLogBuch-Import' || f === 'README - Zusammenarbeit allgemein.md')) return null;   // Erkenntnis (Import), überall gültig
      if (L === 'I') return null;
      if (L === 'E' && f === 'BACKLOG.md') { offen.push(`${key}: ${tok} – Verweis auf Erledigt (ZUORDNUNG 6)`); return null; }
      return lokal(L, n, sfx, at);
    }
    function lokal(L, n, sfx, at, fest) {
      const tok = `${L}-${zahl(n)}`;
      // in der eigenen Datei bleibt die Nummer (nur ein Buchstabe, der überall gilt, wird neu – K2)
      const eigen = /^[ATEN]$/.test(L) ? festgelegt[f]?.has(tok) : ownTopics.some(t => definiert[t]?.has(tok));
      if (fest ? ownTopics.includes(fest) : eigen) { const b = buchstaben[fest || ownTopics.find(t => definiert[t]?.has(tok))]?.[L]; return b ? `${b}-${zahl(n)}${sfx}` : `${L}-${zahl(n)}${sfx}`; }
      // Elternnummer: direkt davor, in der Zeile, in den Zeilen davor (bis zur Überschrift), Kopf der Datei
      let eltern = fest, direkt = null, sicher = !!fest;
      const vor = themen[i].filter(x => x.e <= at).reverse(), nach = themen[i].filter(x => x.i > at);
      const nah = vor.find(x => /^\s*$/.test(lines[i].slice(x.e, at)));
      if (!eltern && nah) { eltern = nah.t; direkt = nah; sicher = !!definiert[nah.t]?.has(tok); }
      if (!eltern && zuletzt) { eltern = zuletzt; sicher = true; }
      if (!eltern && repo === 'ReiseLogBuch-Import') { eltern = 'RLB-5'; sicher = true; }   // Import-Fälle setzen RLB-5 (Testfall-Liste) fort
      if (!eltern) {
        const kand = [...vor, ...nach].map(x => x.t);
        for (let j = i - 1; j >= 0 && j >= i - 200 && !(grenze(i) && /^\|/.test(lines[i])); j--) { kand.push(...themen[j].map(x => x.t).reverse()); if (grenze(j)) break; }
        kand.push(...standard);
        const def = /^[ATEN]$/.test(L) ? festThema : definiert;
        eltern = kand.find(t => def[t]?.has(tok)); sicher = !!eltern;
        // E- und N- ohne Definition sind meist Verweise auf eine alte Erledigt- bzw. Import-Nummer: nur nach ZUORDNUNG 6
        if (!eltern && /^[EN]$/.test(L)) { offen.push(`${key}: ${tok} – alte Nummer? Entscheidung in ZUORDNUNG 6`); return null; }
        if (!eltern) eltern = kand[0];
      }
      if (!eltern) { offen.push(`${key}: ${tok} – keine Elternnummer gefunden`); return null; }
      zuletzt = eltern;
      if (!sicher) bericht.push(`unsicher ${key}: ${tok} → ${eltern}/ :: ${lines[i].trim().slice(0, 120)}`);
      const b = buchstaben[eltern]?.[L] || L, neu = `${b}-${zahl(n)}${sfx}`;
      if (direkt) { ersetzungen.push({ at: direkt.i, len: at - direkt.i, neu: '' }); qualifiziert.add(eltern); return `${eltern}/${neu}`; }
      // Buchstaben alter Präfixe (A, T, E, N) immer mit Elternnummer – sonst sähen sie wie eine alte Nummer aus
      if (qualifiziert.has(eltern) && !/^[ATEN]$/.test(b) && !code) return neu;
      qualifiziert.add(eltern);
      return `${eltern}/${neu}`;
    }
    // ein Thema direkt vor der lokalen Nummer wird ganz entfernt – seine eigene Umbenennung entfällt dann
    const weg = ersetzungen.filter(r => r.neu === '' && r.len);
    const bleiben = ersetzungen.filter(e => !weg.some(r => r !== e && r.at <= e.at && e.at + e.len <= r.at + r.len));
    ersetzungen.length = 0; ersetzungen.push(...bleiben);
    ersetzungen.sort((a, b) => b.at - a.at);
    for (const r of ersetzungen) line = line.slice(0, r.at) + r.neu + line.slice(r.at + r.len);
    // Themen direkt vor einer Elternnummer (‚APD-63 APD-63/S-1‘) zusammenfassen
    line = line.replace(/(?<![\w/-])((?:APD|RLB)-\d+) \1\//g, '$1/');
    return line;
  });
  let neu = out.join('\n');
  // Begriffe nicht im Code-Bezeichner – nur Text (Kommentare und Meldungen sind Text)
  for (const [re, by] of BEGRIFFE) neu = neu.replace(re, by);
  return neu;
}


let geaendert = 0;
const schritte = [];
for (const [repo, dir] of REPOS) {
  if (!existsSync(dir)) { console.log(`✗ ${repo} fehlt neben AppDesign`); process.exit(1); }
  for (const f of alleDateien(dir)) {
    const inhalt = !ausgenommen(f);
    if (!inhalt && !(repo === 'AppDesign' && neuerName(f) !== f)) continue;
    const alt = inhalt ? readFileSync(dir + f, 'utf8') : null, neu = inhalt ? umbauen(repo, f, alt) : null;
    const nf = repo === 'AppDesign' ? neuerName(f) : f;
    if (neu !== alt || nf !== f) {
      geaendert++;
      const a = (alt ?? '').split('\n'), b = (neu ?? '').split('\n');
      const diff = a.map((l, i) => l !== b[i] ? `  ${i + 1}: ${l.trim().slice(0, 160)}\n   → ${b[i].trim().slice(0, 160)}` : null).filter(Boolean);
      bericht.push(`${istCode(f) ? '[Code] ' : ''}${repo}/${f}${nf !== f ? ` → ${nf}` : ''} (${diff.length} Zeilen)\n${diff.join('\n')}`);
      schritte.push({ dir, f, nf, neu, alt });
    }
  }
}
mkdirSync(AD + 'werkzeug/out', { recursive: true });
writeFileSync(AD + 'werkzeug/out/umbenennen.txt', [...offen.map(o => 'OFFEN ' + o), ...bericht].join('\n') + '\n');
const unsicher = bericht.filter(b => b.startsWith('unsicher')).length;
console.log(`${geaendert} Dateien betroffen, ${unsicher} unsichere Elternnummern, ${offen.length} offene Stellen – Bericht werkzeug/out/umbenennen.txt`);
if (offen.length) { console.log(offen.slice(0, 20).map(o => '  ' + o).join('\n')); process.exit(1); }
if (schreiben) {
  for (const s of schritte) {
    if (s.neu !== null && s.neu !== s.alt) writeFileSync(s.dir + s.f, s.neu);
    if (s.nf !== s.f) { mkdirSync(dirname(s.dir + s.nf), { recursive: true }); execFileSync('git', ['-C', s.dir, 'mv', s.f, s.nf]); }
  }
  console.log(`✓ geschrieben (${schritte.length} Dateien)`);
}
