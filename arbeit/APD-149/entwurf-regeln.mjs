// APD-149 – Regeln für Beans im Entwurf prüfen (Sitzung AppDesign 0002): die 7 Prüfungen aus arbeit/APD-149 0001 Wortlaut Entwurf im Katalog.md Abschnitt 4
// (freigegeben APD-149/J-1). Sie kommen mit der nächsten AppDesign-Version in checkKatalog (APD-149/J-2); bis dahin prüft dieses Skript.
// Aufruf aus dem Ordner AppDesign:  node arbeit/APD-149/entwurf-regeln.mjs   ·   Gegenprobe (Punkt 7):  APD149_GEGENPROBE=entwurf node arbeit/APD-149/entwurf-regeln.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const AD = new URL('../../', import.meta.url), APP = new URL('../ReiseLogBuch/', AD);
const lies = (u, f) => { try { return readFileSync(new URL(f, u), 'utf8'); } catch { return ''; } };
const GP = process.env.APD149_GEGENPROBE === 'entwurf';
const fehler = [], E = (nr, t) => fehler.push(`✗ R-1.13 Punkt ${nr}: ${t}`);

// Liste der AD-Beans (Designrichtlinie 15) und Sperrliste deutscher Namen (doku.mjs, checkBeans)
const guide = lies(AD, 'README - Designrichtlinie allgemein.md');
const tabelle = guide.split('\n## 15. ')[1]?.split('\n### ')[0]?.split('**Liste der AD-Beans**')[1] || '';
const liste = [...tabelle.matchAll(/^\| `([a-z]+)` \|/gm)].map(m => m[1]);
const sperr = new Set(JSON.parse('[' + (lies(AD, 'tests/doku.mjs').match(/const SPERRLISTE = new Set\(\[([^\]]*)\]\)/)?.[1] || '').replace(/'/g, '"').replace(/\s+/g, '') + ']'));
if (!liste.length || !sperr.size) E(0, 'Liste der AD-Beans oder Sperrliste nicht gefunden');

// Eine Katalogdatei lesen: alles außer catalogBean ist ein Platzhalter, der jeden Zugriff schluckt (der Entwurf greift beim Laden auf DOM und v4 zu)
const platz = new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : k === Symbol.iterator ? function* () {} : platz,
  apply: () => platz, construct: () => platz, set: () => true, has: () => true });
function melde(datei) {
  const beans = [];
  const ctx = new Proxy({ catalogBean: b => beans.push(b) }, { has: () => true,
    get: (t, k) => k in t ? t[k] : k in globalThis ? globalThis[k] : k === Symbol.unscopables ? undefined : platz });
  runInNewContext(readFileSync(datei, 'utf8'), ctx, { filename: datei.pathname });
  return beans;
}

let index = lies(AD, 'katalog/index.html');
const ui = lies(AD, 'v4/ui.js');
const oben = readdirSync(new URL('katalog/', AD)).filter(f => /^[a-z]+\.js$/.test(f));
const entwurfDir = new URL('katalog/entwurf/', AD);
const entwuerfe = (() => { try { return readdirSync(entwurfDir).filter(f => f.endsWith('.js')); } catch { return []; } })();
if (GP) { liste.push('presentation'); index = index.replace('<script src="entwurf/presentation-commands.js"></script>', ''); }

const gebaut = new Map();
for (const f of oben) {
  const beans = melde(new URL(`katalog/${f}`, AD));
  for (const b of beans) { gebaut.set(b.id, f); if (b.draft) E(6, `katalog/${f}: draft: true in der obersten Ebene`); }
}
const imEntwurf = new Map();
for (const f of entwuerfe) {
  let beans = [];
  try { beans = melde(new URL(f, entwurfDir)); } catch (e) { E(1, `katalog/entwurf/${f} lässt sich nicht lesen: ${e.message}`); continue; }
  if (!beans.length) E(1, `katalog/entwurf/${f} meldet keine Bean an`);
  for (const b of beans) {
    if (b.draft !== true) E(6, `katalog/entwurf/${f}: ${b.id} ohne draft: true`);
    if (liste.includes(b.id)) E(3, `${b.id} steht in der Liste der AD-Beans (15)`);
    const anlegen = 'create' + b.id[0].toUpperCase() + b.id.slice(1);
    if (new RegExp(`function ${anlegen}\\b|const ${anlegen}\\b`).test(ui)) E(3, `${b.id}: ${anlegen} steht in v4/ui.js`);
    if (gebaut.has(b.id) || imEntwurf.has(b.id)) E(3, `${b.id} kommt im Katalog doppelt vor`);
    imEntwurf.set(b.id, f);
    // Punkt 4: Namen englisch – Kennung, Anlegen, Eigenschaften, Nur lesen, Methoden, Ereignisse
    const namen = [b.id, b.create, ...[b.properties, b.readOnly, b.methods, b.events].flatMap(l => (l || []).map(x => x[0]))]
      .flatMap(s => String(s).replace(/'[^']*'/g, '').match(/[A-Za-zÄÖÜäöüß_$][\wÄÖÜäöüß$]*/g) || []);
    for (const n of new Set(namen)) {
      const teile = n.replace(/([a-zäöüß])([A-ZÄÖÜ])/g, '$1 $2').toLowerCase().split(/[\s_]+/);
      const wort = [n.toLowerCase(), ...teile].find(w => sperr.has(w));
      if (/[ÄÖÜäöüß]/.test(n) || wort) E(4, `${b.id}: Name ‚${n}‘ ist nicht englisch${wort ? ` (Sperrliste: ‚${wort}‘)` : ''}`);
    }
  }
  if (!index.includes(`<script src="entwurf/${f}"></script>`)) E(2, `katalog/index.html lädt entwurf/${f} nicht`);
}
// Punkt 5: keine App, kein v4/, keine Fassung nennt katalog/entwurf/
const durch = (u, rel) => { let out = []; for (const f of readdirSync(u)) { const v = new URL(f, u); if (statSync(v).isDirectory()) out = out.concat(durch(new URL(f + '/', u), rel + f + '/')); else out.push([v, rel + f]); } return out; };
const nennen = [...durch(new URL('v4/', AD), 'v4/'), ...durch(new URL('fassung/', AD), 'fassung/'), [new URL('index.html', APP), 'ReiseLogBuch/index.html'], [new URL('sw.js', APP), 'ReiseLogBuch/sw.js']];
for (const [u, name] of nennen) if (/\.(js|css|html|json|md)$/.test(name) && lies(u, '').includes('katalog/entwurf/')) E(5, `${name} nennt katalog/entwurf/`);

const geprueft = `${entwuerfe.length} Entwurfsdatei(en), Beans im Entwurf: ${[...imEntwurf.keys()].join(', ') || '–'}; ${oben.length} Katalogdateien oben, ${nennen.length} Dateien für Punkt 5`;
if (GP) {
  const p3 = fehler.some(f => /Punkt 3: presentation steht in der Liste/.test(f)), p2 = fehler.some(f => /Punkt 2: .*lädt entwurf\/presentation-commands\.js nicht/.test(f));
  console.log(`Gegenprobe beans:entwurf – Liste: ${p3 ? 'rot' : 'NICHT rot'}, index.html: ${p2 ? 'rot' : 'NICHT rot'} (${geprueft})`);
  process.exit(p2 && p3 ? 0 : 1);
}
for (const f of fehler) console.log(f);
console.log(fehler.length ? `entwurf-regeln: ${fehler.length} Fehler (${geprueft})` : `entwurf-regeln: alles in Ordnung (${geprueft})`);
process.exit(fehler.length ? 1 : 0);
