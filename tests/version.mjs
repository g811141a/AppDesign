// AppDesign 4.11.1 · Prüfung der Versionskopplung App ↔ AppDesign (Regel R-48, Designrichtlinie allgemein 15.20).
// Prüft die Dateien der App: ui.js und design.css mit ?v=<AppDesign-Version> in index.html und sw.js, AD_NEEDED in der App
// gleich AD_VERSION (ui.js) und --ad-version (design.css), Cache-Name in sw.js mit der App-Version.
// Mit einer Seite (page) zusätzlich: lädt die App mit einer älteren ui.js und erwartet den Hinweis beim Start.
// Einbinden im Prüfskript der App (Repo-Ordner der App, AppDesign daneben):
//   import { checkVersions } from '../../AppDesign/tests/version.mjs';
//   const fehler = await checkVersions(new URL('..', import.meta.url), browser);   // [] = alles richtig
import { readFileSync } from 'node:fs';
export async function checkVersions(appDir, browser = null) {
  const errors = [], E = t => errors.push(`R-48 ${t}`);
  const read = f => readFileSync(new URL(f, appDir), 'utf8');
  const html = read('index.html'), sw = read('sw.js');
  const ui = read('../AppDesign/v4/ui.js'), css = read('../AppDesign/v4/design.css');
  const adJs = ui.match(/const AD_VERSION = '([\d.]+)'/)?.[1], adCss = css.match(/--ad-version:\s*"([\d.]+)"/)?.[1];
  const needed = html.match(/const AD_NEEDED = '([\d.]+)'/)?.[1], app = html.match(/const APP_VERSION = '([\d.]+)'/)?.[1];
  if (!adJs) E('AD_VERSION fehlt in ui.js');
  if (!adCss) E('--ad-version fehlt in design.css');
  if (adJs && adCss && adJs !== adCss) E(`ui.js (${adJs}) und design.css (${adCss}) haben verschiedene Versionen`);
  if (!needed) E('AD_NEEDED fehlt in index.html');
  else if (needed !== adJs) E(`App braucht AppDesign ${needed}, vorhanden ist ${adJs}`);
  for (const f of ['ui.js', 'design.css']) {
    const inHtml = [...html.matchAll(new RegExp(`AppDesign/v4/${f.replace('.', '\\.')}(\\?v=[\\d.]+)?"`, 'g'))].map(m => m[1] || '');
    const inSw = [...sw.matchAll(new RegExp(`AppDesign/v4/${f.replace('.', '\\.')}(\\?v=[\\d.]+)?'`, 'g'))].map(m => m[1] || '');
    if (!inHtml.length) E(`${f} nicht in index.html eingebunden`);
    if (inHtml.some(v => v !== `?v=${needed}`)) E(`${f} in index.html ohne bzw. mit falschem ?v= (${inHtml.join(', ') || 'keins'})`);
    if (inSw.length !== 1 || inSw[0] !== `?v=${needed}`) E(`${f} in sw.js ohne bzw. mit falschem ?v= (${inSw.join(', ') || 'keins'})`);
  }
  if (app && !sw.includes(`-${app}'`)) E(`Cache-Name in sw.js passt nicht zur App-Version ${app}`);
  if (browser) {
    // Ältere ui.js simulieren (ohne AD_VERSION): beim Start muss der Hinweis erscheinen.
    const p = await browser.newPage();
    await p.route(/AppDesign\/v4\/ui\.js/, async r => r.fulfill({ contentType: 'text/javascript', body: ui.replace(/const AD_VERSION = '[\d.]+';/, '') }));
    await p.goto(new URL('index.html', appDir).href); await p.waitForTimeout(400);
    const t = await p.evaluate(() => document.querySelector('#msg[open]')?.textContent || '');
    if (!/AppDesign/.test(t) || !/neu öffnen/.test(t)) E('kein Hinweis beim Start, obwohl eine ältere AppDesign-Fassung geladen ist');
    await p.unroute(/AppDesign\/v4\/ui\.js/);
    await p.goto(new URL('index.html', appDir).href); await p.waitForTimeout(400);
    if (await p.evaluate(() => /AppDesign/.test(document.querySelector('#msg[open]')?.textContent || ''))) E('Hinweis erscheint, obwohl die passende Fassung geladen ist');
    await p.close();
  }
  return errors;
}
