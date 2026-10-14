// AppDesign 4.14.0 · Prüfung der Doku einer App (Regel R-10.4, Zusammenarbeit allgemein 7) und des Regelkatalogs (checkCatalog).
// R-10.4: README.md zeigt ganz oben ‚Verwendete Versionen‘ – App, AppDesign, Designrichtlinie allgemein, Designrichtlinie <App>,
//       Zusammenarbeit allgemein – je mit Version (gleich wie in index.html bzw. den Richtlinien) und Link.
// Zusammenarbeit 7: Die Prüfliste der neuesten Version im CHANGELOG beginnt mit /0 ‚Version prüfen‘ (App- und AppDesign-Version);
//       jeder Prüfpunkt hat nummerierte Schritte und mindestens ein ‚Erwartet‘.
// Einbinden im Prüfskript der App:  import { checkDocs } from '../../AppDesign/tests/doku.mjs';
//                                   const fehler = checkDocs(new URL('..', import.meta.url), 'Reiselogbuch');
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
// Seit 4.14.0 (A-05 D-6): Richtlinie und Zusammenarbeit so, wie sie in der Markierung vX.Y.Z der benutzten Fassung stehen –
// spätere AppDesign-Versionen ändern die Prüfung einer App nicht. Ohne Markierung (Version noch in Arbeit): der Arbeitsstand.
export function adText(appDir, f, needed) {
  const ad = new URL('../AppDesign/', appDir);
  if (needed) try { return execFileSync('git', ['-C', fileURLToPath(ad), 'show', `v${needed}:${f}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch {}
  try { return readFileSync(new URL(f, ad), 'utf8'); } catch { return ''; }
}
export function checkDocs(appDir, app) {
  const errors = [], E = t => errors.push(t);
  const read = f => readFileSync(new URL(f, appDir), 'utf8');
  const version = text => text.match(/\*\*Version (\d+\.\d+\.\d+)\*\*/)?.[1];
  const html = read('index.html'), readme = read('README.md'), changelog = read('CHANGELOG.md');
  const own = readdirSync(appDir).find(f => /^README - Designrichtlinie (?!allgemein)/.test(f));
  const needed = html.match(/const AD_NEEDED = '([\d.]+)'/)?.[1];
  const want = {
    [app]: html.match(/const APP_VERSION = '([\d.]+)'/)?.[1],
    AppDesign: needed,
    'Designrichtlinie allgemein': version(adText(appDir, 'README - Designrichtlinie allgemein.md', needed)),
    [`Designrichtlinie ${app}`]: own ? version(read(own)) : undefined,
    'Zusammenarbeit allgemein': version(adText(appDir, 'README - Zusammenarbeit allgemein.md', needed)),
  };
  // R-10.4
  const head = readme.split(/\n## /)[1] || '';
  if (!/^Verwendete Versionen/.test(head)) E('R-10.4 README.md: Abschnitt ‚## Verwendete Versionen‘ fehlt direkt nach der Einleitung');
  for (const [name, v] of Object.entries(want)) {
    const row = head.split('\n').find(l => l.startsWith(`| ${name} |`));
    if (!row) { E(`R-10.4 README.md: Zeile ‚${name}‘ fehlt in ‚Verwendete Versionen‘`); continue; }
    if (!v || !row.includes(`| ${v} |`)) E(`R-10.4 README.md: ‚${name}‘ nennt nicht die Version ${v || '(unbekannt)'}`);
    if (!/\]\(https:\/\/github\.com\//.test(row)) E(`R-10.4 README.md: ‚${name}‘ ohne Link`);
    // D-6: Links nach AppDesign zeigen auf die Markierung der benutzten Fassung, Bausteine auf ihren Fassungs-Ordner
    for (const m of row.matchAll(/github\.com\/g811141a\/AppDesign\/blob\/([^/]+)\/([^)]*)/g)) {
      if (m[1] !== `v${needed}`) E(`R-10.4 README.md: ‚${name}‘ verlinkt AppDesign ‚${m[1]}‘ statt der Markierung v${needed}`);
      if (/^(?:v4|fassung)\//.test(m[2]) && !m[2].startsWith(`fassung/${needed}/`)) E(`R-10.4 README.md: ‚${name}‘ verlinkt ${m[2]} statt fassung/${needed}/`);
    }
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
  // Seit 4.12.2: ‚Zusammenarbeit allgemein‘ stand bis dahin versehentlich im Kommentar und wurde nicht geprüft.
  const docs = { 'Designrichtlinie allgemein': noHistory(guide).replace(cat, ''),   // der Katalog selbst nennt in ‚ersetzt‘ die alten Nummern
    'Zusammenarbeit allgemein': noHistory(read(ad, 'README - Zusammenarbeit allgemein.md')),
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

// Seit 4.12.2 (A-02 Schritte 3 und 4) – Zusammenarbeit, CLAUDE.md, Backlogs und App-Doku widersprechen Abschnitt 0 der
// Zusammenarbeit nicht, nennen keine veralteten Abläufe und dieselben Versionen und Feldnamen wie die App.
export function checkCollab(appDir, app) {
  const errors = [], E = t => errors.push(t);
  const ad = new URL('../AppDesign/', appDir);
  const read = (base, f) => { try { return readFileSync(new URL(f, base), 'utf8'); } catch { return ''; } };
  const noHistory = t => t.split(/\n## (?:Versionsgeschichte|Erledigt)/)[0];
  const version = text => text.match(/\*\*Version (\d+\.\d+\.\d+)\*\*/)?.[1];
  const own = readdirSync(appDir).find(f => /^README - Designrichtlinie (?!allgemein)/.test(f)) || 'x';
  const collab = read(ad, 'README - Zusammenarbeit allgemein.md'), html = read(appDir, 'index.html');
  const prompt = noHistory(read(appDir, 'PROMPT.md')), guideApp = noHistory(read(appDir, own));
  const files = { 'Zusammenarbeit allgemein': noHistory(collab), 'AppDesign CLAUDE.md': noHistory(read(ad, 'CLAUDE.md')),
    [`${app} CLAUDE.md`]: noHistory(read(appDir, 'CLAUDE.md')), 'AppDesign BACKLOG.md': noHistory(read(ad, 'BACKLOG.md')),
    [`${app} BACKLOG.md`]: noHistory(read(appDir, 'BACKLOG.md')), [`Designrichtlinie ${app}`]: guideApp, [`${app} PROMPT.md`]: prompt };
  // Veraltete Stellen (Verlauf-Abgleich W-1 bis W-3, W-5, W-7)
  const stale = [
    [/etwa 5 Punkte/, 'Zusammenarbeit 0 Nr. 8: ‚etwa 5 Punkte‘ – es gilt 2–3 Punkte, höchstens 2 Themen'],
    [/nur bei schweren Fehlern|Eigene Version außer der Reihe nur bei/, 'Zusammenarbeit 0 Nr. 8: Korrekturversion nur bei Datenverlust – es gilt ‚Korrekturen sofort‘'],
    [/direkt im Fragetext/, 'Zusammenarbeit 0 Nr. 7: Muster im Fragetext – Muster und Erklärungen kommen als Datei vor dem Fenster'],
    [/⏱ Gesamt/, 'Zusammenarbeit 2: Zeitzeile mit ‚Gesamt‘ – es gilt ‚⏱ mm:ss · Token vorige Antwort …‘'],
    [/werden ersetzt\.|ersetzt nach einer Sprechblase/, 'R-9.2: alter Text ‚Backup laden … ersetzt‘ – die Abfrage hat die Kacheln Abgleichen und Ersetzen (15.19)'],
    [/Läuft nur auf dem iPad|kein Teilen, kein Login/, 'Designrichtlinie 1: ‚nur auf dem iPad‘ – Zielgeräte sind iPad und iPhone'],
  ];
  for (const [name, text] of Object.entries(files)) {
    for (const [re, msg] of stale) if (re.test(text)) E(`${msg} (${name})`);
    // W-2: eine Antwortzeile gibt es nur noch bei mehr als 4 Fragen
    for (const m of text.matchAll(/Antwortzeile/g)) {
      const around = text.slice(Math.max(0, m.index - 250), m.index + 250);
      if (!/mehr als 4 Fragen/.test(around)) { E(`Zusammenarbeit 0 Nr. 7: Antwortzeile ohne ‚nur bei mehr als 4 Fragen‘ (${name})`); break; }
    }
    // Verweise auf die Zusammenarbeit zeigen auf vorhandene Stellen (Abschnitte 0–9, Abschnitt 0 Nr. 1–17)
    const sections = [...collab.matchAll(/^## (\d+)\. /gm)].map(m => +m[1]);
    const items = (collab.split(/\n## 0\. /)[1]?.split(/\n## /)[0].match(/^\d+\. /gm) || []).length;
    for (const m of text.matchAll(/(?:Zusammenarbeit(?: allgemein)?,? (?:Abschnitt )?|§)(\d+)(?: Nr\. (\d+))?/g)) {
      if (!sections.includes(+m[1])) E(`Zusammenarbeit: Verweis ‚${m[0]}‘ – Abschnitt ${m[1]} gibt es nicht (${name})`);
      else if (m[2] && (+m[1] !== 0 || +m[2] > items)) E(`Zusammenarbeit: Verweis ‚${m[0]}‘ zeigt ins Leere (${name})`);
    }
  }
  // CLAUDE.md beider Repos: zuerst UEBERGABE.md, Version und Versionsgeschichte, Prüfung mit alle.sh
  for (const [name, base] of [['AppDesign CLAUDE.md', ad], [`${app} CLAUDE.md`, appDir]]) {
    const t = read(base, 'CLAUDE.md');
    const first = t.split(/\n## Zuerst lesen/)[1]?.match(/^\d+\. (.*)$/m)?.[1] || '';
    if (!/UEBERGABE\.md/.test(first)) E(`Zusammenarbeit 0 Nr. 15: ${name} nennt unter ‚Zuerst lesen‘ nicht zuerst UEBERGABE.md`);
    if (!version(t) || !/\n## Versionsgeschichte/.test(t)) E(`Designrichtlinie 11: ${name} ohne Version oder Versionsgeschichte`);
  }
  if (read(appDir, 'tests/alle.sh') && !/sh tests\/alle\.sh/.test(read(appDir, 'CLAUDE.md'))) E(`Zusammenarbeit 7: ${app} CLAUDE.md nennt nicht ‚sh tests/alle.sh‘`);
  // PROMPT.md: Versionszeile nennt die aktuellen Fassungen (wie die README, R-10.4)
  const needed = html.match(/const AD_NEEDED = '([\d.]+)'/)?.[1];
  const want = { [app]: html.match(/const APP_VERSION = '([\d.]+)'/)?.[1], AppDesign: needed,
    'Designrichtlinie allgemein': version(adText(appDir, 'README - Designrichtlinie allgemein.md', needed)), [`Designrichtlinie ${app}`]: version(read(appDir, own)),
    'Zusammenarbeit allgemein': version(adText(appDir, 'README - Zusammenarbeit allgemein.md', needed)) };
  const line = prompt.split('\n').find(l => l.startsWith(`${app} `) && /\d+\.\d+\.\d+/.test(l)) || '';
  if (!line) E(`Zusammenarbeit 7: ${app} PROMPT.md ohne Versionszeile`);
  for (const [n, v] of Object.entries(want)) if (line && !line.includes(`${n} ${v}`)) E(`Zusammenarbeit 7: Versionszeile in ${app} PROMPT.md nennt nicht ‚${n} ${v}‘`);
  if (/siehe Designrichtlinie allgemein \d/.test(prompt)) E(`Zusammenarbeit 7: ${app} PROMPT.md verweist auf eine alte Fassung der Designrichtlinie allgemein`);
  // Seit 4.14.0 (A-05 D-7, W-4): feste Fassung je App – ‚gilt sofort für alle Apps‘ steht nirgends mehr (außer Versionsgeschichte).
  for (const [name, text] of [['Designrichtlinie allgemein', noHistory(read(ad, 'README - Designrichtlinie allgemein.md'))], ['AppDesign README.md', noHistory(read(ad, 'README.md'))],
    ['AppDesign CLAUDE.md', noHistory(read(ad, 'CLAUDE.md'))], [`${app} CLAUDE.md`, noHistory(read(appDir, 'CLAUDE.md'))]])
    if (/(?:gilt|gelten) sofort für alle Apps|\?v=<(?:AppDesign-)?Version>/.test(text)) E(`R-10.3 W-4: ${name} nennt noch ‚gilt sofort für alle Apps‘ bzw. ‚?v=‘ – jede App lädt ihre feste Fassung`);
  // R-10.1: Feldnamen des Abgleichberichts in der App-Richtlinie = labels in index.html
  const labels = html.match(/labels:\s*\{([^}]*)\}/)?.[1];
  const listed = guideApp.match(/Feldnamen im Abgleichbericht \(`labels`\): ([^.]*)/)?.[1];
  if (labels && listed) {
    const inCode = new Set([...labels.matchAll(/'([^']+)'/g)].map(m => m[1]));
    for (const w of listed.split(/,|;/).map(s => s.replace(/^\s*je Tag\s*/, '').trim()).filter(Boolean))
      if (!inCode.has(w)) E(`R-10.1: Designrichtlinie ${app} nennt im Abgleichbericht das Feld ‚${w}‘, die App heißt es anders`);
  }
  return errors;
}
