// AppDesign · tests/schnittstelle.mjs – R-1.14 Schnittstelle von ui.js (APD-135/B-4.1, seit 4.64.0; Namensraum AD seit 5.0.0, APD-145).
// checkSchnittstelle(appDir, { browser, … }) liefert Fehlertexte (Testfall-Liste APD-145/T-1 bis APD-145/T-7, arbeit/APD-149 0008 Testfall-Listen v5.md 2.3):
//   APD-145/T-1 ui.js stellt global nur AD bereit – die globalen Namen vor und nach dem Laden von ui.js (Eigenschaften von window und globale
//       Bindungen const/let/class), im Browser (ohne browser: nur der Teil ohne Browser)
//   APD-145/T-2 AD hat genau die Namen aus schnittstelle.json (Teile app und pruefungen), nicht mehr und nicht weniger; jeder Name steht in ui.js
//   APD-145/T-3 die App (index.html mit Skripten und on…-Attributen, sw.js) nutzt nur AD.<Name aus app>: kein Name von ui.js ohne AD., kein Name aus
//       pruefungen, keine Deklaration AD
//   APD-145/T-4 ebenso die Vorlage derselben Fassung (vorlage/index.html, Prüfseite) und der Bean-Katalog (katalog/index.html und katalog/*.js)
//   APD-145/T-5 die Prüfdateien (App und AppDesign) nutzen nur AD.<Name> aus app und pruefungen
//   APD-145/T-6 alle Namen der Liste englisch: kein Umlaut, kein ß, kein Wort der Sperrliste deutscher Namen (checkBeans, doku.mjs) – auch als Teil
//       (camelCase, _) eines Namens
//   APD-145/T-7 kein alter Name (ALTE_NAMEN) in ui.js, App, Vorlage, Katalog, Prüfungen und Richtlinien – im Code als Name (AD.<alt> oder ohne
//       eigene Deklaration), unverwechselbare alte Namen (camelCase, _ oder ae/oe/ue) auch in Kommentaren; in den Richtlinien als Name im Code
//       (zwischen Backticks). Ausgenommen: Versionsgeschichten, CHANGELOG.md, die festen Fassungen, v4/, der Ordner ‚arbeit‘ und ZUORDNUNG
// Gegenproben (PRUEF_GEGENPROBE=schnittstelle:<fall>, lauf.mjs --gegenprobe schnittstelle): global (window.openMenu bleibt global, APD-145/T-1),
// fehlt (openMenu fehlt in AD, APD-145/T-2), ohneAD (ein Aufruf openMenu( ohne AD. in der App, APD-145/T-3), englisch (ein deutscher Name in der Liste,
// APD-145/T-6).
// Dazu wie bisher (APD-135/E-1): eine Kopie der Vorlage mit setAppearance (innerer Name) muss rot werden – sonst meldet die Prüfung sich selbst.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { woerter, deklarationen } from './schnittstelle-zerleger.mjs';
import { SPERRLISTE } from './doku.mjs';
import { arbeitsOrdner } from './version.mjs';

const hier = path.dirname(fileURLToPath(import.meta.url));
// in der festen Fassung liegt ui.js neben tests/, im Arbeitsstand AppDesign/tests unter vN/ (seit 5.0.0 v5/)
const inFassung = fs.existsSync(path.join(hier, '..', 'ui.js'));
const basis = inFassung ? path.join(hier, '..') : path.join(hier, '..', arbeitsOrdner(pathToFileURL(path.join(hier, '..') + '/')));
const VORLAGE = path.join(hier, '..', 'vorlage', 'index.html');

// Namen alt → neu (APD-145/J-4, arbeit/APD-145 0011 Namen.md): die deutschen Namen der Schnittstelle bis 4.71.1, dazu die Bean-Exemplare ohne ad
// (R-1.14 ‚Bean-Exemplare wie AD.alert‘) und rand12 (seit 5.0.0 im Teil pruefungen)
export const ALTE_NAMEN = {
  ansagen: 'announce', aufzaehlung: 'listHtml', darstellungMenuItem: 'appearanceMenuItem', ersterFehler: 'focusFirstInvalid', feldFehler: 'setFieldError',
  fokus: 'focus', glasAusBackup: 'glassFromBackup', halten: 'longPress', inhaltSchmal: 'compactWidth', leerHtml: 'contentUnavailableHtml',
  leerSuche: 'searchUnavailableHtml', messungMenuItems: 'measureMenuItems', navAnmelden: 'navRegister', navSeite: 'navSidebar', navVor: 'navPush',
  navZurueck: 'navPop', onNeuerTag: 'onDayChange', rolle: 'scrollView', rollen: 'scrollBy', sucheAnmelden: 'searchRegister',
  sucheBeendenHtml: 'searchCancelHtml', suchenMenuItems: 'searchMenuItems', wischHtml: 'scrollRowHtml',
  MESS_MAX_MS: 'MEASURE_MAX_MS', beruehrt: 'touchedAt', gemeldet: 'viewportResized', gerollt: 'scrolled', gross: 'largeContent', leer: 'blank',
  mess: 'measurement', messAus: 'measureOff', messFrei: 'measureAllowed', messStart: 'measureStart', messZeile: 'measureLine', navKandidat: 'navCandidate',
  platz: 'reserveSpace', schnell: 'fastScroll', tipp: 'tap', adAlert: 'alert', adSourcehighlight: 'sourcehighlight', rand12: 'popoverMargins',
};
// unverwechselbar: kommt so in deutschem Text nicht vor (camelCase, _, ae/oe/ue für Umlaute) – wird auch in Kommentaren gesucht
// (ohne beruehrt: so heißt auch die Klasse des berührten Elements in design.css)
const UNVERWECHSELBAR = Object.keys(ALTE_NAMEN).filter(n => /[A-Z_\d]|ae|oe|ue/.test(n) && n !== 'beruehrt');
// Sperrliste deutscher Namen: die von checkBeans (R-1.13) und die Wörter der alten Namen
const SPERR = new Set([...SPERRLISTE, 'ansagen', 'aufzaehlung', 'darstellung', 'erster', 'fehler', 'feld', 'fokus', 'glas', 'inhalt', 'schmal', 'leer',
  'suche', 'messung', 'anmelden', 'seite', 'zurueck', 'neuer', 'rolle', 'rollen', 'beenden', 'suchen', 'wisch', 'beruehrt', 'gemeldet', 'gerollt',
  'gross', 'kandidat', 'platz', 'schnell', 'tipp', 'zeile']);

// Gegenproben (APD-145/T-1 bis APD-145/T-3, APD-145/T-6): Fall → Meldung, die rot werden muss
export const GEGENPROBEN_SCHNITTSTELLE = {
  global: { zeichen: /R-1\.14 APD-145\/T-1 .*openMenu/, was: 'window.openMenu bleibt global (APD-145/T-1)' },
  fehlt: { zeichen: /R-1\.14 APD-145\/T-2 .*fehlt in AD: openMenu/, was: 'openMenu fehlt in AD (APD-145/T-2)' },
  ohneAD: { zeichen: /R-1\.14 APD-145\/T-3 index\.html .*‚openMenu‘ ohne AD\./, was: 'ein Aufruf openMenu( ohne AD. in der App (APD-145/T-3)' },
  englisch: { zeichen: /R-1\.14 APD-145\/T-6 .*menuOeffnen/, was: 'ein deutscher Name in schnittstelle.json (APD-145/T-6)' },
};
const gpFall = () => (process.env.PRUEF_GEGENPROBE || '').match(/^schnittstelle:(\w+)$/)?.[1] || '';

// Namen, die eine Datei selbst vergibt (Deklarationen, Parameter, Importe) – ein solcher Name ist kein Name von ui.js
export function lokaleNamen(s) {
  const lokal = new Set([...s.matchAll(/\b(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g)].map(m => m[1]));
  for (const m of s.matchAll(/\b(?:const|let|var)\s*[{[]([^}\]]*)[}\]]/g)) for (const t of m[1].split(',')) { const k = t.split(':').pop().split('=')[0].trim(); if (k) lokal.add(k); }
  for (const m of s.matchAll(/\(([^()]*)\)\s*=>|function\s*[\w$]*\s*\(([^()]*)\)|([A-Za-z_$][\w$]*)\s*=>/g))
    for (const t of (m[1] || m[2] || m[3] || '').split(',')) { const k = t.replace(/[{}[\]]/g, '').split(/[=:]/).pop().trim(); const k0 = t.replace(/[{}[\]]/g, '').split('=')[0].trim();
      for (const x of [k, k0]) if (/^[A-Za-z_$][\w$]*$/.test(x)) lokal.add(x); }
  // seit 5.0.0: Importe (import { a, b as c } from …, import x from …) und catch (e)
  for (const m of s.matchAll(/\bimport\s*(?:([A-Za-z_$][\w$]*)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\b/g)) {
    if (m[1]) lokal.add(m[1]);
    for (const t of (m[2] || '').split(',')) { const k = t.split(/\s+as\s+/).pop().trim(); if (k) lokal.add(k); }
  }
  for (const m of s.matchAll(/\bcatch\s*\(\s*([A-Za-z_$][\w$]*)/g)) lokal.add(m[1]);
  // weitere Namen einer Deklaration: const a = 1, b = 2 (b)
  for (const m of s.matchAll(/,\s*([A-Za-z_$][\w$]*)\s*=(?![=>])/g)) lokal.add(m[1]);
  return lokal;
}

const lies = f => { try { return fs.readFileSync(f, 'utf8'); } catch { return ''; } };
// Skripte einer Seite mit ihrer Startzeile, dazu der Code in on…="…"-Attributen
function seitenCode(htmlSrc) {
  const teile = [];
  for (const m of htmlSrc.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g))
    teile.push({ code: m[1], start: htmlSrc.slice(0, m.index + m[0].indexOf('>') + 1).split('\n').length - 1 });
  const ohneSkripte = htmlSrc.replace(/<script[\s\S]*?<\/script>/g, s => s.replace(/[^\n]/g, ' '));
  for (const m of ohneSkripte.matchAll(/\son[a-z]+="([^"]*)"/g)) teile.push({ code: m[1], start: ohneSkripte.slice(0, m.index).split('\n').length - 1 });
  return teile;
}

// Nutzer von ui.js prüfen (APD-145/T-3, APD-145/T-4, APD-145/T-5, Code von APD-145/T-7). erlaubt: Namen nach AD.; uiN: Namen von ui.js (Deklarationen und alte Namen);
// teile: [{ code, start }]; eigene: Namen, die die Datei bzw. Seite selbst vergibt.
function nutzer(name, teile, { erlaubt, uiN, eigene, nurPruef = new Set(), tc, app = false }) {
  const out = [];
  for (const { code, start } of teile) {
    const lokal = new Set([...eigene, ...lokaleNamen(code)]);
    if (app) for (const d of deklarationen(code)) if (d.name === 'AD') out.push(`R-1.14 ${tc} ${name} Z. ${start + d.zeile}: eine Deklaration heißt AD – AD gehört ui.js`);
    for (const w of woerter(code, { ad: true, schluessel: false })) {
      const z = `${name} Z. ${start + w.zeile}`;
      if (w.ad) {
        if (w.name in ALTE_NAMEN) out.push(`R-1.14 APD-145/T-7 ${z}: alter Name AD.${w.name} – heißt seit 5.0.0 AD.${ALTE_NAMEN[w.name]}`);
        else if (nurPruef.has(w.name)) out.push(`R-1.14 ${tc} ${z}: AD.${w.name} steht nur im Teil pruefungen von schnittstelle.json (nur für Prüfungen)`);
        else if (!erlaubt.has(w.name)) out.push(`R-1.14 ${tc} ${z}: AD.${w.name} steht nicht in schnittstelle.json${app ? ' (Teil app)' : ''}`);
      } else if (uiN.has(w.name) && !lokal.has(w.name) && w.name !== 'AD')
        out.push(w.name in ALTE_NAMEN ? `R-1.14 APD-145/T-7 ${z}: alter Name ‚${w.name}‘ ohne AD. – heißt seit 5.0.0 AD.${ALTE_NAMEN[w.name]}`
          : `R-1.14 ${tc} ${z}: ‚${w.name}‘ ohne AD. – ein Name von ui.js steht nur im Namensraum AD`);
    }
  }
  return out;
}
// unverwechselbare alte Namen im ganzen Text (auch Kommentare und Zeichenketten) – APD-145/T-7
function alteImText(name, text) {
  const out = [];
  text.split('\n').forEach((z, i) => { for (const n of UNVERWECHSELBAR) if (new RegExp(`(?<![\\w$])${n}(?![\\w$])`).test(z)) out.push(`R-1.14 APD-145/T-7 ${name} Z. ${i + 1}: alter Name ‚${n}‘ – heißt seit 5.0.0 ${ALTE_NAMEN[n]}`); });
  return out;
}
// Richtlinien: alte Namen als Name im Code zwischen Backticks – der Name, mit dem der Code beginnt (`rolle.ende()`, `ansagen`), und jeder Name
// nach AD. (nicht CSS-Klassen .rolle, #id, --eigenschaft, Schlüssel und Hilfen der Prüfungen wie rolle(p, y)) – APD-145/T-7
function alteInDoku(name, text) {
  const out = [];
  text.split(/\n## Versionsgeschichte/)[0].split('\n').forEach((z, i) => {
    for (const m of z.matchAll(/`([^`\n]+)`/g)) {
      const namen = [...m[1].matchAll(/\bAD\.([A-Za-z_$][\w$]*)/g)].map(t => t[1]);
      const k = m[1].match(/^\s*([A-Za-z_$][\w$]*)(?![\w$-])(?!\s*:)(?!\((?:p|page)\b)/);
      if (k) namen.push(k[1]);
      for (const n of namen) if (Object.hasOwn(ALTE_NAMEN, n))
        out.push(`R-1.14 APD-145/T-7 ${name} Z. ${i + 1}: alter Name ‚${n}‘ in \`${m[1]}\` – heißt seit 5.0.0 ${ALTE_NAMEN[n]}`);
    }
  });
  return out;
}

// APD-145/T-1, APD-145/T-2 im Browser: eine Seite mit #dlg und #msg lädt ui.js; vorher und nachher die globalen Namen
async function imBrowser(browser, uiSrc, kandidaten) {
  const URSPRUNG = 'https://schnittstelle.test/';
  const schnapp = `(k => ({ props: Object.getOwnPropertyNames(window), lex: k.filter(n => { try { return (0, eval)('typeof ' + n) !== 'undefined'; } catch (e) { return e instanceof ReferenceError; } }) }))`;
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Schnittstelle</title></head><body>
<main id="app"></main><aside id="side" hidden></aside><dialog id="dlg"></dialog><dialog id="msg"></dialog>
<script>window.__vor = ${schnapp}(${JSON.stringify(kandidaten)});</script>
<script src="ui.js"></script>
<script>window.__nach = ${schnapp}(${JSON.stringify(kandidaten)}); window.__ad = typeof AD === 'object' && AD ? Object.keys(AD) : null;</script>
</body></html>`;
  const p = await browser.newPage(), fehler = [];
  p.on('pageerror', e => fehler.push(e.message));
  await p.route(u => u.href.startsWith(URSPRUNG), r => r.fulfill(new URL(r.request().url()).pathname === '/ui.js'
    ? { contentType: 'text/javascript', body: uiSrc } : { contentType: 'text/html; charset=utf-8', body: html }));
  await p.goto(URSPRUNG + 'index.html');
  const r = await p.evaluate(() => ({ vor: window.__vor, nach: window.__nach, ad: window.__ad }));
  await p.close();
  const neu = [...new Set([...r.nach.props.filter(n => !r.vor.props.includes(n)), ...r.nach.lex.filter(n => !r.vor.lex.includes(n))])].filter(n => !/^__(vor|nach|ad)$/.test(n)).sort();
  return { neu, ad: r.ad, fehler };
}

export async function checkSchnittstelle(appDir, {
  ui = path.join(basis, 'ui.js'),
  liste = path.join(basis, 'schnittstelle.json'),
  html = path.join(appDir, 'index.html'),
  sw = path.join(appDir, 'sw.js'),
  vorlage = fs.existsSync(VORLAGE) ? VORLAGE : null,
  katalog = path.join(appDir, '..', 'AppDesign', 'katalog'),
  pruefdateien = fs.readdirSync(path.join(appDir, 'tests')).filter(f => f.endsWith('.mjs')).map(f => path.join(appDir, 'tests', f)),
  adPruefdateien = fs.readdirSync(hier).filter(f => f.endsWith('.mjs')).map(f => path.join(hier, f)),
  richtlinien = null,
  browser = null,
} = {}) {
  const fehler = [], gp = gpFall();
  let uiSrc = fs.readFileSync(ui, 'utf8');
  const L = JSON.parse(fs.readFileSync(liste, 'utf8'));
  if (gp === 'englisch') L.app = L.app.map(n => n === 'openMenu' ? 'menuOeffnen' : n);
  if (gp === 'global') uiSrc += '\nwindow.openMenu = AD.openMenu;\n';
  if (gp === 'fehlt') {
    const z = '  get openMenu() { return openMenu; }, set openMenu(v) { openMenu = v; },\n';
    if (uiSrc.split(z).length !== 2) fehler.push('R-1.14 Gegenprobe fehlt: die Zeile von openMenu im Block AD steht nicht genau einmal in ui.js');
    uiSrc = uiSrc.replace(z, '');
  }
  const app = new Set(L.app), alle = new Set([...L.app, ...L.pruefungen]), nurPruef = new Set(L.pruefungen.filter(n => !app.has(n)));
  const uiDekl = deklarationen(uiSrc).map(d => d.name);
  const uiN = new Set([...uiDekl, ...Object.keys(ALTE_NAMEN)]);
  // APD-145/T-2 (ohne Browser): jeder Name der Liste steht in ui.js; APD-145/T-7: kein alter Name in der Liste bzw. als Bindung in ui.js
  for (const n of alle) if (!uiDekl.includes(n)) fehler.push(`R-1.14 APD-145/T-2 schnittstelle.json: ‚${n}‘ gibt es in ui.js nicht`);
  for (const n of alle) if (n in ALTE_NAMEN) fehler.push(`R-1.14 APD-145/T-7 schnittstelle.json: alter Name ‚${n}‘ – heißt seit 5.0.0 ${ALTE_NAMEN[n]}`);
  for (const n of new Set(uiDekl)) if (n in ALTE_NAMEN) fehler.push(`R-1.14 APD-145/T-7 ui.js: Bindung mit dem alten Namen ‚${n}‘ – heißt seit 5.0.0 ${ALTE_NAMEN[n]}`);
  fehler.push(...alteImText('ui.js', uiSrc));
  // APD-145/T-6: Namen englisch
  for (const n of alle) {
    const teile = n.replace(/([a-zäöüß])([A-ZÄÖÜ])/g, '$1 $2').toLowerCase().split(/[\s_]+/);
    const wort = [n.toLowerCase(), ...teile].find(w => SPERR.has(w));
    if (/[ÄÖÜäöüß]/.test(n) || wort) fehler.push(`R-1.14 APD-145/T-6 schnittstelle.json: Name ‚${n}‘ ist nicht englisch${wort ? ` (‚${wort}‘ steht in der Sperrliste deutscher Namen)` : ' (Umlaut bzw. ß)'} – Zusammenarbeit 1 ‚Code englisch, Texte deutsch‘`);
  }
  // APD-145/T-1, APD-145/T-2 im Browser
  if (browser) {
    const kandidaten = [...new Set([...woerter(uiSrc).map(w => w.name), ...uiN, 'AD'])].filter(n => /^[A-Za-z_$][\w$]*$/.test(n));
    const r = await imBrowser(browser, uiSrc, kandidaten);
    for (const f of r.fehler) fehler.push(`R-1.14 APD-145/T-1 Skriptfehler beim Laden von ui.js: ${f}`);
    if (r.neu.join() !== 'AD') fehler.push(`R-1.14 APD-145/T-1 ui.js macht global ${r.neu.length ? r.neu.join(', ') : 'nichts'} statt nur AD`);
    if (!r.ad) fehler.push('R-1.14 APD-145/T-2 AD fehlt nach dem Laden von ui.js');
    else {
      const fehlt = [...alle].filter(n => !r.ad.includes(n)).sort(), mehr = r.ad.filter(n => !alle.has(n)).sort();
      if (fehlt.length) fehler.push(`R-1.14 APD-145/T-2 fehlt in AD: ${fehlt.join(', ')} (steht in schnittstelle.json)`);
      if (mehr.length) fehler.push(`R-1.14 APD-145/T-2 in AD, aber nicht in schnittstelle.json: ${mehr.join(', ')}`);
    }
  }
  // APD-145/T-3: die App
  let htmlSrc = fs.readFileSync(html, 'utf8');
  if (gp === 'ohneAD') {
    if (!htmlSrc.includes('AD.openMenu(')) fehler.push('R-1.14 Gegenprobe ohneAD: AD.openMenu( fehlt in index.html');
    htmlSrc = htmlSrc.replace('AD.openMenu(', 'openMenu(');
  }
  const seite = (src, name, tc, erlaubt = app) => {
    const teile = seitenCode(src), eigene = new Set(teile.flatMap(t => deklarationen(t.code).map(d => d.name)));
    return [...nutzer(name, teile, { erlaubt, uiN, eigene, nurPruef, tc, app: true }), ...alteImText(name, src)];
  };
  fehler.push(...seite(htmlSrc, path.basename(html), 'APD-145/T-3'));
  const swSrc = lies(sw);
  if (swSrc) fehler.push(...nutzer('sw.js', [{ code: swSrc, start: 0 }], { erlaubt: app, uiN, eigene: new Set(deklarationen(swSrc).map(d => d.name)), nurPruef, tc: 'APD-145/T-3', app: true }), ...alteImText('sw.js', swSrc));
  // APD-145/T-4: Vorlage (Prüfseite) und Bean-Katalog
  if (vorlage) {
    const v = fs.readFileSync(vorlage, 'utf8');
    fehler.push(...seite(v, 'vorlage/index.html', 'APD-145/T-4'));
    // Gegenprobe (APD-135/E-1): dieselbe Prüfung muss einen inneren Namen in der Vorlage finden
    const kopie = v.replace(/(<script(?![^>]*\bsrc=)[^>]*>)/, "$1setAppearance('auto');");
    if (!seite(kopie, 'Kopie', 'APD-145/T-4').some(f => /^R-1\.14 APD-145\/T-4 Kopie Z\. \d+: ‚setAppearance‘ ohne AD\./.test(f)))
      fehler.push('R-1.14 Gegenprobe: eine Kopie der Vorlage mit setAppearance wird nicht gemeldet');
  }
  if (fs.existsSync(path.join(katalog, 'index.html'))) {
    const idx = fs.readFileSync(path.join(katalog, 'index.html'), 'utf8');
    const js = fs.readdirSync(katalog).filter(f => f.endsWith('.js')).map(f => ({ f, code: fs.readFileSync(path.join(katalog, f), 'utf8') }));
    const eigene = new Set([...seitenCode(idx), ...js].flatMap(t => deklarationen(t.code).map(d => d.name)));
    // der Katalog führt die Beans vor – auch ihre Exemplare aus dem Teil pruefungen (AD.alert)
    fehler.push(...nutzer('katalog/index.html', seitenCode(idx), { erlaubt: alle, uiN, eigene, tc: 'APD-145/T-4', app: true }), ...alteImText('katalog/index.html', idx));
    for (const { f, code } of js) fehler.push(...nutzer(`katalog/${f}`, [{ code, start: 0 }], { erlaubt: alle, uiN, eigene, tc: 'APD-145/T-4', app: true }), ...alteImText(`katalog/${f}`, code));
    // Entwurf (Designrichtlinie 14, APD-149/J-1): Code, der nach ui.js wandert – nur ohne alte Namen
    const ent = path.join(katalog, 'entwurf');
    if (fs.existsSync(ent)) for (const f of fs.readdirSync(ent).filter(f => f.endsWith('.js'))) fehler.push(...alteImText(`katalog/entwurf/${f}`, fs.readFileSync(path.join(ent, f), 'utf8')));
  }
  // APD-145/T-5: Prüfdateien der App und von AppDesign (aus derselben Fassung)
  for (const f of [...pruefdateien, ...adPruefdateien]) {
    const s = fs.readFileSync(f, 'utf8'), name = `${path.basename(path.dirname(path.dirname(f))) === 'AppDesign' || f.startsWith(hier) ? 'AppDesign ' : ''}tests/${path.basename(f)}`;
    if (path.basename(f) === 'schnittstelle.mjs') continue;   // diese Datei nennt die alten Namen
    fehler.push(...nutzer(name, [{ code: s, start: 0 }], { erlaubt: alle, uiN, eigene: new Set(), tc: 'APD-145/T-5' }), ...alteImText(name, s));
  }
  // APD-145/T-7: Richtlinien und Doku (ohne Versionsgeschichte); Designrichtlinie und Zusammenarbeit aus derselben Fassung
  const ad = path.join(appDir, '..', 'AppDesign');
  const fassungText = f => inFassung && fs.existsSync(path.join(hier, '..', f)) ? path.join(hier, '..', f) : path.join(ad, f);
  const docs = richtlinien || [
    ['README - Designrichtlinie allgemein.md', fassungText('README - Designrichtlinie allgemein.md')], ['README - Zusammenarbeit allgemein.md', fassungText('README - Zusammenarbeit allgemein.md')],
    ['AppDesign README.md', path.join(ad, 'README.md')], ['AppDesign CLAUDE.md', path.join(ad, 'CLAUDE.md')], ['AppDesign tests/README.md', path.join(ad, 'tests', 'README.md')],
    ...fs.readdirSync(appDir).filter(f => /^README - Designrichtlinie (?!allgemein)|^(README|CLAUDE|PROMPT)\.md$/.test(f)).map(f => [f, path.join(appDir, f)]),
    ['tests/README.md', path.join(appDir, 'tests', 'README.md')]];
  for (const [name, f] of docs) { const t = lies(f); if (t) fehler.push(...alteInDoku(name, t)); }
  return fehler;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const f = await checkSchnittstelle(path.resolve(process.argv[2] || '.'));
  console.log(f.length ? f.join('\n') : 'schnittstelle: alles in Ordnung (ohne Browser)');
  process.exitCode = f.length ? 1 : 0;
}
