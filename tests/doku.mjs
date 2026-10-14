// AppDesign 4.12.0 · Prüfung der Doku einer App (Regel R-10.4, Zusammenarbeit allgemein 7) und des Regelkatalogs (checkCatalog).
// R-10.4: README.md zeigt ganz oben ‚Verwendete Versionen‘ – App, AppDesign, Designrichtlinie allgemein, Designrichtlinie <App>,
//       Zusammenarbeit allgemein – je mit Version (gleich wie in index.html bzw. den Richtlinien) und Link.
// Zusammenarbeit 7: Die Prüfliste der neuesten Version im CHANGELOG beginnt mit /0 ‚Version prüfen‘ (App- und AppDesign-Version);
//       jeder Prüfpunkt hat nummerierte Schritte und mindestens ein ‚Erwartet‘.
// Einbinden im Prüfskript der App:  import { checkDocs } from '../../AppDesign/tests/doku.mjs';
//                                   const fehler = checkDocs(new URL('..', import.meta.url), 'Reiselogbuch');
import { readFileSync, readdirSync } from 'node:fs';
export function checkDocs(appDir, app) {
  const errors = [], E = t => errors.push(t);
  const read = f => readFileSync(new URL(f, appDir), 'utf8');
  const version = text => text.match(/\*\*Version (\d+\.\d+\.\d+)\*\*/)?.[1];
  const html = read('index.html'), readme = read('README.md'), changelog = read('CHANGELOG.md');
  const own = readdirSync(appDir).find(f => /^README - Designrichtlinie (?!allgemein)/.test(f));
  const want = {
    [app]: html.match(/const APP_VERSION = '([\d.]+)'/)?.[1],
    AppDesign: html.match(/const AD_NEEDED = '([\d.]+)'/)?.[1],
    'Designrichtlinie allgemein': version(read('../AppDesign/README - Designrichtlinie allgemein.md')),
    [`Designrichtlinie ${app}`]: own ? version(read(own)) : undefined,
    'Zusammenarbeit allgemein': version(read('../AppDesign/README - Zusammenarbeit allgemein.md')),
  };
  // R-10.4
  const head = readme.split(/\n## /)[1] || '';
  if (!/^Verwendete Versionen/.test(head)) E('R-10.4 README.md: Abschnitt ‚## Verwendete Versionen‘ fehlt direkt nach der Einleitung');
  for (const [name, v] of Object.entries(want)) {
    const row = head.split('\n').find(l => l.startsWith(`| ${name} |`));
    if (!row) { E(`R-10.4 README.md: Zeile ‚${name}‘ fehlt in ‚Verwendete Versionen‘`); continue; }
    if (!v || !row.includes(`| ${v} |`)) E(`R-10.4 README.md: ‚${name}‘ nennt nicht die Version ${v || '(unbekannt)'}`);
    if (!/\]\(https:\/\/github\.com\//.test(row)) E(`R-10.4 README.md: ‚${name}‘ ohne Link`);
  }
  // Zusammenarbeit 7: neueste Version im CHANGELOG
  const newest = changelog.split(/\n## /)[1] || '';
  const items = [...newest.matchAll(/\*\*(P-\d+\/\d+) – ([^*]+)\*\*\n([\s\S]*?)(?=\n\*\*P-\d+\/|\n## |$)/g)];
  if (!items.length) E('Zusammenarbeit 7 CHANGELOG: neueste Version ohne Prüfliste');
  else {
    if (!/\/0$/.test(items[0][1]) || !/Version/.test(items[0][2])) E(`Zusammenarbeit 7 CHANGELOG: Prüfliste beginnt nicht mit /0 ‚Version prüfen‘ (sondern ${items[0][1]})`);
    else if (!items[0][3].includes(want[app]) || !items[0][3].includes(`AppDesign ${want.AppDesign}`)) E('Zusammenarbeit 7 CHANGELOG: /0 nennt nicht App- und AppDesign-Version');
    for (const [, nr, , body] of items) {
      if (!/^1\. /m.test(body)) E(`Zusammenarbeit 7 CHANGELOG: ${nr} ohne nummerierte Schritte`);
      if (!/Erwartet/.test(body)) E(`Zusammenarbeit 7 CHANGELOG: ${nr} ohne ‚Erwartet‘`);
    }
  }
  return errors;
}

// Seit 4.12.0 – Regelkatalog (Designrichtlinie allgemein 17) vollständig und überall mit den neuen Nummern R-<Thema>.<Nr>:
// jede Regel hat eine Prüfung in tests/*.mjs (AppDesign oder App), jede alte (zweistellige) Nummer ist zugeordnet, alte Nummern
// stehen nur noch im Katalog (Spalte ‚ersetzt‘, Zuordnung) und in Versionsgeschichten, jede genannte Nummer gibt es im Katalog.
export function checkCatalog(appDir, app) {
  const errors = [], E = t => errors.push(`Katalog ${t}`);
  const ad = new URL('../AppDesign/', appDir);
  const read = (base, f) => { try { return readFileSync(new URL(f, base), 'utf8'); } catch { return ''; } };
  const guide = read(ad, 'README - Designrichtlinie allgemein.md');
  const cat = guide.split('\n## 17. ')[1]?.split('\n## ')[0] || '';
  const [rules, map = ''] = cat.split('### Zuordnung alt → neu');
  const nrs = [...rules.matchAll(/^\| (R-\d+\.\d+) \|/gm)].map(m => m[1]);
  if (nrs.length < 30) E(`Abschnitt 17 enthält nur ${nrs.length} Regeln`);
  const has = (text, nr) => new RegExp(`${nr.replace('.', '\\.')}(?![\\d])`).test(text);
  const tests = [ad, appDir].flatMap(base => readdirSync(new URL('tests/', base)).filter(f => f.endsWith('.mjs')).map(f => read(base, 'tests/' + f))).join('\n');
  for (const nr of nrs) if (!has(tests, nr)) E(`${nr} hat keine Prüfung in tests/*.mjs`);
  const old = new Set([...map.matchAll(/\| (R-\d{2}) \| ([^|]+?) (?=\|)/g)].map(m => (m[2].trim().split(/, /).forEach(t => { if (!nrs.includes(t) && !/^Zusammenarbeit/.test(t)) E(`Zuordnung ${m[1]} → ${t}: gibt es nicht`); }), m[1])));
  for (let i = 1; i <= 52; i++) { const o = `R-${String(i).padStart(2, '0')}`; if (!old.has(o)) E(`alte Regel ${o} ist keiner neuen zugeordnet`); }
  const noHistory = t => t.split(/\n## Versionsgeschichte/)[0];
  const docs = { 'Designrichtlinie allgemein': noHistory(guide).replace(cat, ''),   // der Katalog selbst nennt in ‚ersetzt‘ die alten Nummern 'Zusammenarbeit allgemein': noHistory(read(ad, 'README - Zusammenarbeit allgemein.md')),
    'AppDesign README.md': read(ad, 'README.md'), 'AppDesign CLAUDE.md': read(ad, 'CLAUDE.md'), 'AppDesign tests/README.md': read(ad, 'tests/README.md'),
    [`${app} README.md`]: read(appDir, 'README.md'), [`${app} CLAUDE.md`]: read(appDir, 'CLAUDE.md'), [`${app} tests/README.md`]: read(appDir, 'tests/README.md'),
    [`Designrichtlinie ${app}`]: noHistory(read(appDir, readdirSync(appDir).find(f => /^README - Designrichtlinie (?!allgemein)/.test(f)) || 'x')),
    [`${app} PROMPT.md`]: noHistory(read(appDir, 'PROMPT.md')), 'Prüfskripte': tests,
    // Seit 4.12.1: auch die Kommentare im Code (Bausteine, Vorlage, App) – dort standen nach dem Umnummerieren dreistellige Nummern.
    'Bausteine v4/': read(ad, 'v4/ui.js') + read(ad, 'v4/design.css') + read(ad, 'vorlage/index.html'), [`${app} index.html, sw.js`]: read(appDir, 'index.html') + read(appDir, 'sw.js') };
  for (const [name, text] of Object.entries(docs)) {
    const o = [...new Set(text.match(/\bR-\d{2}(?![.\d])/g) || [])];
    if (o.length) E(`${name}: alte Nummern ${o.slice(0, 6).join(', ')}${o.length > 6 ? ' …' : ''}`);
    const u = [...new Set((text.match(/\bR-\d+\.\d+(?:\.\d+)?/g) || []).filter(n => !nrs.includes(n)))];
    if (u.length) E(`${name}: Nummern, die es im Katalog nicht gibt: ${u.join(', ')}`);
  }
  return errors;
}
