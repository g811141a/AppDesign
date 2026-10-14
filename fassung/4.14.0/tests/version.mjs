// AppDesign 4.14.0 · Prüfung der Versionskopplung App ↔ AppDesign (Regel R-10.3, Designrichtlinie allgemein 15.20).
// Seit 4.14.0 (A-05 Version B, feste Fassung): Jede AppDesign-Version liegt unveränderlich in fassung/X.Y.Z/ (design.css,
// ui.js, tests/); die App lädt genau ihre Fassung: ../AppDesign/fassung/X.Y.Z/ui.js und …/design.css in index.html und in der
// Dateiliste von sw.js (ohne ?v=, der Pfad enthält die Version), AD_NEEDED = X.Y.Z = AD_VERSION (ui.js) = --ad-version
// (design.css) der Fassung; Cache-Name in sw.js mit der App-Version. checkFassungen: Prüfsummen (fassung/PRUEFSUMMEN) –
// keine Datei geändert, keine fehlt, keine dazu; v4/ und tests/ = neueste Fassung (D-5).
// Mit einer Seite (page) zusätzlich: Hinweis beim Start bei einer älteren ui.js; kein Abruf aus v4/ (D-3).
// Einbinden im Prüfskript der App (Repo-Ordner der App, AppDesign daneben):
//   import { checkVersions } from '../../AppDesign/fassung/4.14.0/tests/version.mjs';
//   const fehler = await checkVersions(new URL('..', import.meta.url), browser);   // [] = alles richtig
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

export const vergleiche = (a, b) => { const x = a.split('.').map(Number), y = b.split('.').map(Number); return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]; };
const hash = buf => createHash('sha256').update(buf).digest('hex');
const dateien = (dir, pre = '') => readdirSync(dir).flatMap(f => statSync(new URL(f, dir)).isDirectory() ?
  dateien(new URL(f + '/', dir), pre + f + '/') : [pre + f]).sort();

// Die Dateien einer Fassung: Ziel in fassung/X.Y.Z/ → Quelle im Arbeitsstand von AppDesign.
export function fassungQuellen(ad) {
  const q = { 'design.css': 'v4/design.css', 'ui.js': 'v4/ui.js' };
  for (const f of readdirSync(new URL('tests/', ad))) if (statSync(new URL('tests/' + f, ad)).isFile()) q['tests/' + f] = 'tests/' + f;
  return q;
}
export const fassungListe = ad => existsSync(new URL('fassung/', ad)) ?
  readdirSync(new URL('fassung/', ad)).filter(f => /^\d+\.\d+\.\d+$/.test(f)).sort(vergleiche) : [];
// PRUEFSUMMEN: je Zeile ‚<sha256>  X.Y.Z/<Datei>‘, sortiert.
export function pruefsummen(ad, nur = null) {
  return fassungListe(ad).filter(v => !nur || v === nur).flatMap(v => dateien(new URL(`fassung/${v}/`, ad)).map(f =>
    `${hash(readFileSync(new URL(`fassung/${v}/${f}`, ad)))}  ${v}/${f}`)).join('\n') + '\n';
}

export function checkFassungen(ad) {
  const errors = [], E = t => errors.push(`R-10.3 ${t}`);
  const liste = fassungListe(ad);
  if (!liste.length) { E('kein Ordner fassung/X.Y.Z in AppDesign'); return errors; }
  let soll = {};
  try { soll = Object.fromEntries(readFileSync(new URL('fassung/PRUEFSUMMEN', ad), 'utf8').trim().split('\n').map(l => l.split('  ').reverse())); }
  catch { E('fassung/PRUEFSUMMEN fehlt'); }
  const ist = Object.fromEntries(pruefsummen(ad).trim().split('\n').map(l => l.split('  ').reverse()));
  // D-1: jede Datei unverändert, keine fehlt, keine dazu
  for (const [f, h] of Object.entries(soll)) {
    if (!(f in ist)) E(`fassung/${f} fehlt (steht in PRUEFSUMMEN)`);
    else if (ist[f] !== h) E(`fassung/${f} wurde geändert – eine Fassung ist unveränderlich (neue Version statt Änderung)`);
  }
  for (const f of Object.keys(ist)) if (!(f in soll)) E(`fassung/${f} steht nicht in PRUEFSUMMEN`);
  for (const v of liste) {
    const read = f => { try { return readFileSync(new URL(`fassung/${v}/${f}`, ad), 'utf8'); } catch { return ''; } };
    const js = read('ui.js').match(/const AD_VERSION = '([\d.]+)'/)?.[1], css = read('design.css').match(/--ad-version:\s*"([\d.]+)"/)?.[1];
    if (js !== v || css !== v) E(`fassung/${v}: AD_VERSION ${js || 'fehlt'} bzw. --ad-version ${css || 'fehlt'} statt ${v}`);
  }
  // D-5: v4/ (und tests/) zeigen die neueste Fassung – oder sind schon weiter (neue Version in Arbeit, noch ohne Fassung).
  const neu = readFileSync(new URL('v4/ui.js', ad), 'utf8').match(/const AD_VERSION = '([\d.]+)'/)?.[1] || '0.0.0', letzte = liste.at(-1);
  if (vergleiche(neu, letzte) < 0) E(`v4/ hat AppDesign ${neu}, die neueste Fassung ist ${letzte} – v4/ muss die neueste Fassung zeigen`);
  if (liste.includes(neu)) {
    const q = fassungQuellen(ad), inFassung = dateien(new URL(`fassung/${neu}/`, ad));
    const ab = Object.entries(q).filter(([z, s]) => !existsSync(new URL(`fassung/${neu}/${z}`, ad)) ||
      !readFileSync(new URL(s, ad)).equals(readFileSync(new URL(`fassung/${neu}/${z}`, ad)))).map(([, s]) => s);
    ab.push(...inFassung.filter(z => !(z in q)).map(z => `fassung/${neu}/${z} (ohne Quelle)`));
    if (ab.length) E(`v4/ bzw. tests/ weicht von fassung/${neu} ab: ${ab.join(', ')} – vor dem Veröffentlichen ‚node werkzeug/veroeffentlichen.mjs fassung‘, danach nur mit neuer Version`);
  }
  return errors;
}

export async function checkVersions(appDir, browser = null) {
  const errors = [], E = t => errors.push(`R-10.3 ${t}`);
  const read = f => readFileSync(new URL(f, appDir), 'utf8');
  const html = read('index.html'), sw = read('sw.js'), ad = new URL('../AppDesign/', appDir);
  const needed = html.match(/const AD_NEEDED = '([\d.]+)'/)?.[1], app = html.match(/const APP_VERSION = '([\d.]+)'/)?.[1];
  if (!needed) E('AD_NEEDED fehlt in index.html');
  // D-2, D-8: genau die eigene Fassung, in index.html und sw.js, ohne ?v=; nichts mehr aus v4/
  const refs = (text, q) => [...text.matchAll(new RegExp(`\\.\\./AppDesign/([^"'\\s]+?)(\\?[^"'\\s]*)?${q}`, 'g'))].map(m => m[1] + (m[2] || ''));
  for (const f of ['ui.js', 'design.css']) {
    const soll = `fassung/${needed}/${f}`;
    const inHtml = refs(html, '"').filter(r => r.split('?')[0].endsWith('/' + f)), inSw = refs(sw, "'").filter(r => r.split('?')[0].endsWith('/' + f));
    if (!inHtml.length) E(`${f} nicht in index.html eingebunden`);
    if (inHtml.some(r => r !== soll)) E(`${f} in index.html nicht aus der eigenen Fassung ${soll} (${inHtml.join(', ')})`);
    if (inSw.length !== 1 || inSw[0] !== soll) E(`${f} in sw.js nicht genau einmal aus ${soll} (${inSw.join(', ') || 'keins'})`);
  }
  if (/AppDesign\/v4\//.test(html.replace(/<!--[\s\S]*?-->/g, '').replace(/^\s*\/\/.*$/gm, '')) || /AppDesign\/v4\//.test(sw.replace(/^\s*\/\/.*$/gm, '')))
    E('index.html bzw. sw.js lädt noch aus v4/ – die App lädt nur ihre Fassung (D-2)');
  const fdir = new URL(`fassung/${needed}/`, ad);
  if (needed && !existsSync(fdir)) E(`AppDesign/fassung/${needed}/ fehlt`);
  else if (needed) {
    const ui = readFileSync(new URL('ui.js', fdir), 'utf8'), css = readFileSync(new URL('design.css', fdir), 'utf8');
    const adJs = ui.match(/const AD_VERSION = '([\d.]+)'/)?.[1], adCss = css.match(/--ad-version:\s*"([\d.]+)"/)?.[1];
    if (adJs !== needed || adCss !== needed) E(`App braucht AppDesign ${needed}, die Fassung nennt ${adJs || '–'} (ui.js) bzw. ${adCss || '–'} (design.css)`);
  }
  if (app && !sw.includes(`-${app}'`)) E(`Cache-Name in sw.js passt nicht zur App-Version ${app}`);
  errors.push(...checkFassungen(ad));
  if (browser && needed && existsSync(fdir)) {
    const ui = readFileSync(new URL('ui.js', fdir), 'utf8');
    // Ältere ui.js simulieren (ohne AD_VERSION): beim Start muss der Hinweis erscheinen.
    const p = await browser.newPage();
    await p.route(/AppDesign\/fassung\/[\d.]+\/ui\.js/, async r => r.fulfill({ contentType: 'text/javascript', body: ui.replace(/const AD_VERSION = '[\d.]+';/, '') }));
    await p.goto(new URL('index.html', appDir).href); await p.waitForTimeout(400);
    const t = await p.evaluate(() => document.querySelector('#msg[open]')?.textContent || '');
    if (!/AppDesign/.test(t) || !/neu öffnen/.test(t)) E('kein Hinweis beim Start, obwohl eine ältere AppDesign-Fassung geladen ist');
    await p.close();
    // Frische Seite (WebKit nähme sonst die untergeschobene alte ui.js aus dem Zwischenspeicher). D-3: ein geänderter
    // Arbeitsstand v4/ (anderer Knopf, Skriptfehler) darf die App nicht erreichen – sie ruft v4/ gar nicht ab.
    const q = await browser.newPage(), v4 = [], fehler = [];
    q.on('pageerror', e => fehler.push(e.message));
    await q.route(/AppDesign\/v4\//, async r => { v4.push(r.request().url()); await r.fulfill({ contentType: r.request().url().endsWith('.css') ? 'text/css' : 'text/javascript',
      body: r.request().url().endsWith('.css') ? 'button{background:red!important}' : 'throw new Error("v4 geladen")' }); });
    await q.goto(new URL('index.html', appDir).href); await q.waitForTimeout(400);
    if (await q.evaluate(() => /AppDesign/.test(document.querySelector('#msg[open]')?.textContent || ''))) E('Hinweis erscheint, obwohl die passende Fassung geladen ist');
    const geladen = await q.evaluate(() => typeof AD_VERSION === 'string' ? AD_VERSION : '');
    if (geladen !== needed) E(`geladen ist AppDesign ${geladen || '–'} statt der Fassung ${needed}`);
    if (v4.length) E(`die App ruft den Arbeitsstand v4/ ab (${v4.map(u => u.split('/AppDesign/')[1]).join(', ')}) – eine neue AppDesign-Version würde sie ändern (D-3)`);
    if (fehler.length) E(`Skriptfehler beim Start: ${fehler.join('; ')}`);
    await q.close();
  }
  return errors;
}
