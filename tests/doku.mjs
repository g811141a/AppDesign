// AppDesign 4.11.1 · Prüfung der Doku einer App (Regeln R-49, R-50; Zusammenarbeit allgemein 7).
// R-49: README.md zeigt ganz oben ‚Verwendete Versionen‘ – App, AppDesign, Designrichtlinie allgemein, Designrichtlinie <App>,
//       Zusammenarbeit allgemein – je mit Version (gleich wie in index.html bzw. den Richtlinien) und Link.
// R-50: Die Prüfliste der neuesten Version im CHANGELOG beginnt mit /0 ‚Version prüfen‘ (App- und AppDesign-Version);
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
  // R-49
  const head = readme.split(/\n## /)[1] || '';
  if (!/^Verwendete Versionen/.test(head)) E('R-49 README.md: Abschnitt ‚## Verwendete Versionen‘ fehlt direkt nach der Einleitung');
  for (const [name, v] of Object.entries(want)) {
    const row = head.split('\n').find(l => l.startsWith(`| ${name} |`));
    if (!row) { E(`R-49 README.md: Zeile ‚${name}‘ fehlt in ‚Verwendete Versionen‘`); continue; }
    if (!v || !row.includes(`| ${v} |`)) E(`R-49 README.md: ‚${name}‘ nennt nicht die Version ${v || '(unbekannt)'}`);
    if (!/\]\(https:\/\/github\.com\//.test(row)) E(`R-49 README.md: ‚${name}‘ ohne Link`);
  }
  // R-50: neueste Version im CHANGELOG
  const newest = changelog.split(/\n## /)[1] || '';
  const items = [...newest.matchAll(/\*\*(P-\d+\/\d+) – ([^*]+)\*\*\n([\s\S]*?)(?=\n\*\*P-\d+\/|\n## |$)/g)];
  if (!items.length) E('R-50 CHANGELOG: neueste Version ohne Prüfliste');
  else {
    if (!/\/0$/.test(items[0][1]) || !/Version/.test(items[0][2])) E(`R-50 CHANGELOG: Prüfliste beginnt nicht mit /0 ‚Version prüfen‘ (sondern ${items[0][1]})`);
    else if (!items[0][3].includes(want[app]) || !items[0][3].includes(`AppDesign ${want.AppDesign}`)) E('R-50 CHANGELOG: /0 nennt nicht App- und AppDesign-Version');
    for (const [, nr, , body] of items) {
      if (!/^1\. /m.test(body)) E(`R-50 CHANGELOG: ${nr} ohne nummerierte Schritte`);
      if (!/Erwartet/.test(body)) E(`R-50 CHANGELOG: ${nr} ohne ‚Erwartet‘`);
    }
  }
  return errors;
}
