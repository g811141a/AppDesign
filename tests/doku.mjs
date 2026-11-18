// AppDesign 4.14.1 · Prüfung der Doku einer App (Regel R-10.4, Zusammenarbeit allgemein 2.3) und des Regelkatalogs (checkCatalog).
// R-10.4: README.md zeigt ganz oben ‚Verwendete Versionen‘ – App, AppDesign, Designrichtlinie allgemein, Designrichtlinie <App>,
//       Zusammenarbeit allgemein – je mit Version (gleich wie in index.html bzw. den Richtlinien) und Link.
// Zusammenarbeit 2.3: Die Testfälle der neuesten Version im CHANGELOG beginnt mit /0 ‚Version prüfen‘ (App- und AppDesign-Version);
//       jeder Usertest hat nummerierte Schritte und mindestens ein ‚Erwartet‘.
// Einbinden im Prüfskript der App:  import { checkDocs } from '../../AppDesign/tests/doku.mjs';
//                                   const fehler = checkDocs(new URL('..', import.meta.url), 'Reiselogbuch');
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
// Seit 4.14.1 (APD-5/D-6): Richtlinie und Zusammenarbeit so, wie sie in der Fassung der App stehen (fassung/X.Y.Z/) –
// spätere AppDesign-Versionen ändern die Prüfung einer App nicht. Fassung ohne Text (4.14.0): der Arbeitsstand.
export function adText(appDir, f, needed) {
  const ad = new URL('../AppDesign/', appDir);
  for (const p of [needed && `fassung/${needed}/${f}`, f].filter(Boolean)) try { return readFileSync(new URL(p, ad), 'utf8'); } catch {}
  return '';
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
    // APD-5/D-6 (seit 4.14.1): Links nach AppDesign auf main; Richtlinie, Zusammenarbeit und Bausteine aus dem Ordner der Fassung
    for (const m of row.matchAll(/github\.com\/g811141a\/AppDesign\/blob\/([^/]+)\/([^)]*)/g)) {
      if (m[1] !== 'main') E(`R-10.4 README.md: ‚${name}‘ verlinkt AppDesign ‚${m[1]}‘ statt main`);
      if (/(?:^|\/)(?:ui\.js|design\.css|README%20-%20(?:Designrichtlinie|Zusammenarbeit)%20allgemein\.md)$/.test(m[2]) && !m[2].startsWith(`fassung/${needed}/`))
        E(`R-10.4 README.md: ‚${name}‘ verlinkt ${decodeURIComponent(m[2])} statt aus fassung/${needed}/`);
    }
  }
  // R-1.7 (seit 4.29.0, 3 APD-63/S-1): sichere Ränder nur über die Variablen --safe-… – env(safe-area-inset-…) steht nur bei ihrer
  // Festlegung in design.css (je einmal), nirgends sonst und nicht in der App; so setzen die Prüfungen echte Gerätewerte
  const css = adText(appDir, 'design.css', needed);
  if (/--safe-top:/.test(css)) {
    const env = [...css.matchAll(/env\(safe-area-inset-(top|bottom|left|right)[^)]*\)/g)];
    const def = ['top', 'bottom', 'left', 'right'].every(k => new RegExp(`--safe-${k}: env\\(safe-area-inset-${k}, 0px\\);`).test(css));
    if (env.length !== 4 || !def) E(`R-1.7 design.css: env(safe-area-inset-…) ${env.length}-mal statt nur viermal in der Festlegung von --safe-top/-bottom/-left/-right`);
    if (/env\(safe-area-inset/.test(html)) E('R-1.7 index.html: env(safe-area-inset-…) direkt in der App – sichere Ränder nur über var(--safe-…)');
  }
  // Zusammenarbeit 2.3: neueste Version im CHANGELOG
  const newest = changelog.split(/\n## /)[1] || '';
  // APD-78/S-8 (seit 4.36.0): die Liste heißt ‚Testfälle P-n‘
  const nl = (process.env.PRUEF_GEGENPROBE === 'schema:APD-78/S-8' ? newest.replace(/Testfälle P-(\d+)/g, 'Liste P-$1') : newest);
  if (!/Testfälle P-\d+/.test(nl)) E('APD-78/S-8 CHANGELOG: neueste Version ohne Zeile ‚Testfälle P-n‘ (Zusammenarbeit 2.3 und 2.4)');
  const items = [...newest.matchAll(/\*\*(P-\d+\/\d+) – ([^*]+)\*\*\n([\s\S]*?)(?=\n\*\*P-\d+\/|\n## |$)/g)];
  if (!items.length) E('Zusammenarbeit 2.3 CHANGELOG: neueste Version ohne Testfälle');
  else {
    if (!/\/0$/.test(items[0][1]) || !/Version/.test(items[0][2])) E(`Zusammenarbeit 2.3 CHANGELOG: Testfälle beginnen nicht mit /0 ‚Version prüfen‘ (sondern ${items[0][1]})`);
    else if (!items[0][3].includes(want[app]) || !items[0][3].includes(`AppDesign ${want.AppDesign}`)) E('Zusammenarbeit 2.3 CHANGELOG: /0 nennt nicht App- und AppDesign-Version');
    for (const [, nr, , body] of items) {
      if (!/^1\. /m.test(body)) E(`Zusammenarbeit 2.3 CHANGELOG: ${nr} ohne nummerierte Schritte`);
      if (!/Erwartet/.test(body)) E(`Zusammenarbeit 2.3 CHANGELOG: ${nr} ohne ‚Erwartet‘`);
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

// Seit 4.12.2 (APD-2 Schritte 3 und 4) – Zusammenarbeit, CLAUDE.md, Backlogs und App-Doku widersprechen Abschnitt 0 der
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
  // seit 4.50.0 (APD-110): Kasten ‚Jede Antwort‘ Punkt 4 nennt Link und ‚Erwartet‘ – seit 4.55.0 (APD-123) ohne **W**, mit der Datei (SendUserFile)
  const punkt4 = collab.match(/\n> 4\. ([\s\S]*?)\n> 5\. /)?.[1] || '';
  if (!/Link/.test(punkt4) || !/Erwartet/.test(punkt4) || !/SendUserFile/.test(punkt4)) E('Zusammenarbeit 0 Kasten ‚Jede Antwort‘ Punkt 4 ohne Link, ‚Erwartet‘ und Datei (`SendUserFile`, APD-123)');
  // seit 4.55.0 (APD-123/D-9, ersetzt APD-113/M-11): der Wortlaut ‚Kachel am Ende, alles zum Lesen davor‘
  errors.push(...checkKachel(collab));
  // Veraltete Stellen (Verlauf-Abgleich APD-2/W-1 bis W-3, W-5, W-7)
  const stale = [
    [/etwa 5 Punkte/, 'Zusammenarbeit 0 Nr. 8: ‚etwa 5 Punkte‘ – es gilt 2–3 Punkte, höchstens 2 Themen'],
    [/nur bei schweren Fehlern|Eigene Version außer der Reihe nur bei/, 'Zusammenarbeit 0 Nr. 8: Korrekturversion nur bei Datenverlust – es gilt ‚Korrekturen sofort‘'],
    [/direkt im Fragetext/, 'Zusammenarbeit 0 Nr. 7: Muster im Fragetext – Muster und Erklärungen kommen als Datei vor dem Fenster'],
    [/⏱ Gesamt/, 'Zusammenarbeit 2.2: Zeitzeile mit ‚Gesamt‘ – die Zeitzeile steht nicht in der Antwort'],
    [/werden ersetzt\.|ersetzt nach einer Sprechblase/, 'R-9.2: alter Text ‚Backup laden … ersetzt‘ – die Abfrage hat die Kacheln Abgleichen und Ersetzen (15.19)'],
    [/Läuft nur auf dem iPad|kein Teilen, kein Login/, 'Designrichtlinie 1: ‚nur auf dem iPad‘ – Zielgeräte sind iPad und iPhone'],
  ];
  for (const [name, text] of Object.entries(files)) {
    for (const [re, msg] of stale) if (re.test(text)) E(`${msg} (${name})`);
    // APD-2/W-2: eine Antwortzeile gibt es nur noch bei mehr als 4 Fragen
    for (const m of text.matchAll(/Antwortzeile/g)) {
      const around = text.slice(Math.max(0, m.index - 250), m.index + 250);
      if (!/mehr als 4 Fragen/.test(around)) { E(`Zusammenarbeit 0 Nr. 7: Antwortzeile ohne ‚nur bei mehr als 4 Fragen‘ (${name})`); break; }
    }
    // Verweise auf die Zusammenarbeit zeigen auf vorhandene Stellen (Abschnitte und Nummern, die es gibt)
    const sections = [...collab.matchAll(/^## (\d+)\. /gm)].map(m => +m[1]);
    const items = (collab.split(/\n## 0\. /)[1]?.split(/\n## /)[0].match(/^\d+\. /gm) || []).length;
    // seit 4.39.0: eine Versionsnummer (‚Zusammenarbeit allgemein 3.0.0‘) ist kein Verweis auf Abschnitt 3
    for (const m of text.matchAll(/(?:Zusammenarbeit(?: allgemein)?,? (?:Abschnitt )?|§)(\d+)(?!\.\d+\.\d)(?: Nr\. (\d+))?/g)) {
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
  if (read(appDir, 'tests/alle.sh') && !/sh tests\/alle\.sh/.test(read(appDir, 'CLAUDE.md'))) E(`Zusammenarbeit 0 Nr. 2: ${app} CLAUDE.md nennt nicht ‚sh tests/alle.sh‘`);
  // PROMPT.md: Versionszeile nennt die aktuellen Fassungen (wie die README, R-10.4)
  const needed = html.match(/const AD_NEEDED = '([\d.]+)'/)?.[1];
  const want = { [app]: html.match(/const APP_VERSION = '([\d.]+)'/)?.[1], AppDesign: needed,
    'Designrichtlinie allgemein': version(adText(appDir, 'README - Designrichtlinie allgemein.md', needed)), [`Designrichtlinie ${app}`]: version(read(appDir, own)),
    'Zusammenarbeit allgemein': version(adText(appDir, 'README - Zusammenarbeit allgemein.md', needed)) };
  const line = prompt.split('\n').find(l => l.startsWith(`${app} `) && /\d+\.\d+\.\d+/.test(l)) || '';
  if (!line) E(`Designrichtlinie 11: ${app} PROMPT.md ohne Versionszeile`);
  for (const [n, v] of Object.entries(want)) if (line && !line.includes(`${n} ${v}`)) E(`Designrichtlinie 11: Versionszeile in ${app} PROMPT.md nennt nicht ‚${n} ${v}‘`);
  if (/siehe Designrichtlinie allgemein \d/.test(prompt)) E(`Designrichtlinie 11: ${app} PROMPT.md verweist auf eine alte Fassung der Designrichtlinie allgemein`);
  // Seit 4.14.0 (APD-5/D-7, W-4): feste Fassung je App – ‚gilt sofort für alle Apps‘ steht nirgends mehr (außer Versionsgeschichte).
  for (const [name, text] of [['Designrichtlinie allgemein', noHistory(read(ad, 'README - Designrichtlinie allgemein.md'))], ['AppDesign README.md', noHistory(read(ad, 'README.md'))],
    ['AppDesign CLAUDE.md', noHistory(read(ad, 'CLAUDE.md'))], [`${app} CLAUDE.md`, noHistory(read(appDir, 'CLAUDE.md'))]])
    if (/(?:gilt|gelten) sofort für alle Apps|\?v=<(?:AppDesign-)?Version>/.test(text)) E(`R-10.3 APD-5/W-4: ${name} nennt noch ‚gilt sofort für alle Apps‘ bzw. ‚?v=‘ – jede App lädt ihre feste Fassung`);
  // R-10.1: Feldnamen des Abgleichberichts in der App-Richtlinie = labels in index.html
  const labels = html.match(/labels:\s*\{([^}]*)\}/)?.[1];
  const listed = guideApp.match(/Feldnamen im Abgleichbericht \(`labels`\): ([^.]*)/)?.[1];
  if (labels && listed) {
    const inCode = new Set([...labels.matchAll(/'([^']+)'/g)].map(m => m[1]));
    for (const w of listed.split(/,|;/).map(s => s.replace(/^\s*je Tag\s*/, '').trim()).filter(Boolean))
      if (!inCode.has(w)) E(`R-10.1: Designrichtlinie ${app} nennt im Abgleichbericht das Feld ‚${w}‘, die App heißt es anders`);
  }
  // Seit 4.36.0 (APD-78): das Nummernschema (Zusammenarbeit 2.4)
  errors.push(...checkSchema(appDir, app));
  // Seit 4.39.0 (APD-84): der Kasten ‚Jede Antwort‘
  errors.push(...checkKasten(appDir, app));
  // Seit 4.60.4 (APD-135 Pakete 1 und 3): ausgelagerte Versionsgeschichten, Kasten ‚Immer‘, ‚Verpflichtend‘ ohne Wiederholung
  errors.push(...checkVersionsgeschichte(appDir, app));
  return errors;
}

// Seit 4.60.4 (APD-135/W-18, W-31; Testfall-Liste `arbeit/APD-135 Pakete 1 und 3 Testfall-Liste.md` APD-135/M-1 bis M-4):
// M-1 Zusammenarbeit, Designrichtlinie allgemein und beide CLAUDE.md haben unter ‚## Versionsgeschichte‘ nur den Verweis, keine Tabellenzeile;
// M-2 die Datei daneben (`… Versionsgeschichte.md`) gibt es, ihre erste Zeile ist die eigene Version der Datei;
// M-3 der Kasten ‚Immer‘ nennt Nr. 21, 22, 1, 8, 27, 29 und 19; M-4 ‚Verpflichtend‘ der AppDesign-CLAUDE.md wiederholt keine Regel (kein ‚Nr. n‘).
// Gegenprobe: PRUEF_GEGENPROBE=schema:APD-135/T-n (lauf.mjs --gegenprobe schema).
export const IMMER_PFLICHTEN = ['Nr. 21', 'Nr. 22', 'Nr. 1', 'Nr. 8', 'Nr. 27', 'Nr. 29', 'Nr. 19'];
export function checkVersionsgeschichte(appDir, app, gp = (process.env.PRUEF_GEGENPROBE || '').match(/^schema:APD-135\/(M-\d+)$/)?.[1]) {
  const errors = [], E = t => errors.push(t);
  const ad = new URL('../AppDesign/', appDir);
  const read = (base, f) => { try { return readFileSync(new URL(f, base), 'utf8'); } catch { return ''; } };
  const version = text => text.match(/\*\*Version (\d+\.\d+\.\d+)\*\*/)?.[1];
  const paare = [['Zusammenarbeit allgemein', ad, 'README - Zusammenarbeit allgemein.md', 'README - Zusammenarbeit Versionsgeschichte.md'],
    ['Designrichtlinie allgemein', ad, 'README - Designrichtlinie allgemein.md', 'README - Designrichtlinie allgemein Versionsgeschichte.md'],
    ['AppDesign CLAUDE.md', ad, 'CLAUDE.md', 'CLAUDE Versionsgeschichte.md'], [`${app} CLAUDE.md`, appDir, 'CLAUDE.md', 'CLAUDE Versionsgeschichte.md']];
  for (const [name, base, f, vg] of paare) {
    let t = read(base, f), g = read(base, vg);
    if (gp === 'M-1' && name === 'Zusammenarbeit allgemein') t += '\n| 9.9.9 | 01.01.2026 | Neben | Gegenprobe |\n';
    if (gp === 'M-2' && name === 'AppDesign CLAUDE.md') g = g.replace(/^\| \d+\.\d+\.\d+ \|/m, '| 0.0.0 |');
    const teil = t.split(/\n## Versionsgeschichte\n/)[1];
    if (teil === undefined) { E(`APD-135/M-1 ${name}: ohne ‚## Versionsgeschichte‘`); continue; }
    if (/^\| \d+\.\d+\.\d+ \|/m.test(teil) || !teil.includes(`\`${vg}\``)) E(`APD-135/M-1 ${name}: Versionsgeschichte nicht ausgelagert – unter ‚## Versionsgeschichte‘ nur der Verweis auf \`${vg}\` (Designrichtlinie 11)`);
    const erste = g.match(/^\| (\d+\.\d+\.\d+) \|/m)?.[1];
    if (!g) E(`APD-135/M-2 ${name}: \`${vg}\` fehlt`);
    else if (erste !== version(t)) E(`APD-135/M-2 ${name}: erste Zeile in \`${vg}\` ist ${erste || 'keine Version'}, die Datei hat Version ${version(t)} – jede neue Version bekommt dort eine Zeile`);
  }
  let collab = read(ad, 'README - Zusammenarbeit allgemein.md');
  if (gp === 'M-3') collab = collab.replace('Testfall-Liste vor jedem Bau (Nr. 1) ·', '(Gegenprobe) ·');
  const immer = collab.match(/\n> \*\*Immer:\*\*([\s\S]*?)\n>\n/)?.[1] || '';
  for (const x of IMMER_PFLICHTEN) if (!new RegExp(`(?<![\\d.])${x.replace('.', '\\.')}(?![\\d])`).test(immer)) E(`APD-135/M-3 Zusammenarbeit: der Kasten ‚Immer‘ nennt ${x} nicht`);
  let pflicht = read(ad, 'CLAUDE.md').split(/\n## Verpflichtend\n/)[1]?.split(/\n## /)[0] ?? '';
  if (gp === 'M-4') pflicht += ' (0 Nr. 21)';
  if (/Nr\. \d/.test(pflicht)) E(`APD-135/M-4 AppDesign CLAUDE.md: ‚Verpflichtend‘ wiederholt Regeln (‚${pflicht.match(/[^\n]{0,40}Nr\. \d+[^\n]{0,5}/)[0].trim()}‘) – dort nur der Verweis auf den Kasten der Zusammenarbeit`);
  return errors;
}

// Seit 4.55.0 (APD-123/D-9, Wortlaut arbeit/APD-123 Zusammenarbeit ohne Regelwächter Wortlaut.md APD-123/V-1, V-2, D-1 bis D-12; ersetzt
// checkNachFenster, APD-113/M-11; seit 4.57.0 APD-125/V-1 bis V-3 ‚Datei vor jeder Kachel‘, APD-125/B-1): Kasten Punkt 3 bis 5, 0 Nr. 11, 15, 26, 28, 29, 2.1, 2.2, 2.3 und 2.8 im neuen Wortlaut; keine Fenster
// ‚… anzeigen?‘, kein **W**, keine Uhrzeit- und Zeitzeile mehr außerhalb der Versionsgeschichte. Gegenprobe: PRUEF_GEGENPROBE=schema:APD-123/K-1.
export function checkKachel(collab, gp = (process.env.PRUEF_GEGENPROBE || '') === 'schema:APD-123/K-1') {
  const errors = [], E = t => errors.push(`APD-123/K-1 Zusammenarbeit: ${t}`);
  let t = collab.split(/\n## Versionsgeschichte/)[0];
  if (gp) t = t.replace('das Lagebild im Chat und als Datei, danach das', 'Fenster ‚Lagebild bereit – anzeigen?‘, danach das Lagebild');
  const flach = x => x.replace(/\n>?[ \t]*/g, ' ');
  const teil = (von, bis) => flach(t.split(von)[1]?.split(bis)[0] || '');
  const kasten = flach(t.split('> **Jede Antwort**')[1]?.split('\n\nZiel:')[0] || ''), null0 = teil(/\n## 0\. /, /\n## 1\. /);
  const nr = n => null0.match(new RegExp(`(?:^| )${n}\\. (.*?)(?= \\d+\\. |$)`))?.[1] || '';
  const p = n => kasten.match(new RegExp(` ${n}\\. (.*?) ${n + 1}\\. `))?.[1] || '';
  const soll = [['Kasten Punkt 3', p(3), ['**Kachel mit Push:**', 'nach einem Neustart des Arbeitsprozesses', 'Ich schreibe im Chat']],
    ['Kasten Punkt 4', p(4), ['**Datei vor jeder Kachel:**', 'SendUserFile', 'ohne Ausnahme', 'ohne Link']], ['Kasten Punkt 5', p(5), ['‚(Kontext N)‘', 'nie geschätzt']],
    ['0 Nr. 11', nr(11), ['danach das Fenster zur Rückmeldung']], ['0 Nr. 15', nr(15), ['als **eigene Antwort**', 'das Lagebild im Chat und als Datei, danach das Fenster']],
    ['0 Nr. 26', nr(26), ['entfällt (APD-123)']], ['0 Nr. 28', nr(28), ['‚(Kontext N)‘', 'Prüfung: Selbstkontrolle']], ['0 Nr. 29', nr(29), ['im Chat, danach das Fenster']],
    ['2.1', teil('\n### 2.1 ', '\n### 2.2 '), ['**Die Datei davor, das Fenster danach:**', 'SendUserFile', 'vor jedem Fenster', 'ohne Link']],
    ['2.2', teil('\n### 2.2 ', '\n### 2.3 '), ['Kontextstand', '‚(Kontext N)‘', '⚠ Übergabe fällig']],
    ['2.3', teil('\n### 2.3 ', '\n### 2.4 '), ['in der Kachel']], ['2.8', teil('\n### 2.8 ', /\n---/), ['Abgeschaltet (APD-123']]];
  for (const [wo, text, woerter] of soll) for (const w of woerter) if (!text.includes(w)) E(`${wo} ohne ‚${w}‘`);
  for (const [re, was] of [[/bereit – anzeigen\?|Bericht und Testfälle anzeigen\?|Wortlaut … anzeigen\?/, 'Fenster ‚… anzeigen?‘'], [/\*\*W\*\*/, '**W** (Regelwächter)'],
    [/Uhrzeitzeile (?:\(0 Nr\. 26|liefert)|Erste Zeile jeder Ausgabe/, 'Uhrzeitzeile als Pflicht'], [/Zeitzeile von `messung\.mjs`|Zeit und Token \(Pflicht/, 'Zeitzeile als Pflicht']])
    if (re.test(flach(t))) E(`${was} steht noch im Text`);
  return errors;
}

// Seit 4.39.0 (APD-84/M-7, Testfall-Liste arbeit/APD-84 APD-83 Testfall-Liste.md APD-84/C-1 bis C-5): Abschnitt 0 der Zusammenarbeit
// beginnt mit dem Kasten ‚Immer‘ und ‚Jede Antwort‘, der jede Pflicht jeder Antwort nennt; beide CLAUDE.md und 0 Nr. 15 lassen zu Beginn
// die ganze Zusammenarbeit lesen; jede Pflicht in 0 nennt ihre Prüfung. Gegenprobe: PRUEF_GEGENPROBE=schema:APD-84/C-n.
// seit 4.55.0 (APD-123): ohne Nr. 26 (Uhrzeitzeile entfällt) und 2.2 (Zeitzeile entfällt; ‚(Kontext N)‘ steht in Punkt 5 mit Nr. 21, 28)
export const KASTEN_PFLICHTEN = ['Nr. 21', 'Nr. 22', 'Nr. 8', 'Nr. 27', 'Nr. 28', 'Nr. 11', 'Nr. 13', '2.1', '2.3', '2.4', 'Abschnitt 1'];
export function checkKasten(appDir, app, gp = (process.env.PRUEF_GEGENPROBE || '').match(/^schema:APD-84\/(C-\d+)$/)?.[1]) {
  const errors = [], E = t => errors.push(t);
  const ad = new URL('../AppDesign/', appDir);
  const read = (base, f) => { try { return readFileSync(new URL(f, base), 'utf8'); } catch { return ''; } };
  let collab = read(ad, 'README - Zusammenarbeit allgemein.md');
  const claude = { 'AppDesign CLAUDE.md': read(ad, 'CLAUDE.md'), [`${app} CLAUDE.md`]: read(appDir, 'CLAUDE.md') };
  if (gp === 'C-1') collab = collab.replace('> **Jede Antwort**', '> **Gegenprobe**');
  if (gp === 'C-2') collab = collab.replace(/^> 6\. .*$/m, '> 6. Gegenprobe ohne Backlog-Erinnerung.');
  if (gp === 'C-3') claude['AppDesign CLAUDE.md'] = claude['AppDesign CLAUDE.md'].replace('– die ganze Datei', '– nur Abschnitte 0 und 1 (Gegenprobe)');
  if (gp === 'C-4') collab = collab.replace('**diese ganze Datei** (einmal je Sitzung', 'Abschnitte 0 und 1 (Gegenprobe, einmal je Sitzung');
  if (gp === 'C-5') collab = collab.replace(/(\n28\. [\s\S]*?) Prüfung: Selbstkontrolle\./, '$1 (Gegenprobe)');
  const null0 = collab.split(/\n## 0\. [^\n]*\n/)[1]?.split(/\n## /)[0] || '';
  const kasten = null0.trimStart().split('\n').filter((z, i, a) => a.slice(0, i + 1).every(x => x.startsWith('>'))).join('\n');
  // APD-84/C-1 und C-2
  if (!/^> \*\*Immer:\*\*/.test(kasten) || !/^> \*\*Jede Antwort\*\*/m.test(kasten)) E('APD-84/C-1 Zusammenarbeit: Abschnitt 0 beginnt nicht mit dem Kasten ‚Immer‘ und ‚Jede Antwort‘');
  else for (const x of KASTEN_PFLICHTEN) if (!new RegExp(`(?<![\\d.])${x.replace('.', '\\.')}(?![\\d])`).test(kasten)) E(`APD-84/C-2 Zusammenarbeit: der Kasten ‚Jede Antwort‘ nennt ${x} nicht`);
  // APD-84/C-3 und C-4
  for (const [name, t] of Object.entries(claude)) {
    const z = t.split(/\n## Zuerst lesen/)[1]?.split(/\n## /)[0].split(/\n(?=\d+\. )/).find(l => /Zusammenarbeit allgemein/.test(l)) || '';
    if (!/die ganze Datei/.test(z) || /nur Abschnitte/.test(z)) E(`APD-84/C-3 ${name}: liest zu Beginn nicht die ganze Zusammenarbeit (‚die ganze Datei‘)`);
  }
  const nr = n => null0.match(new RegExp(`\\n${n}\\. ([\\s\\S]*?)(?=\\n\\d+\\. |\\n\\n)`))?.[1] || '';
  if (!/diese ganze Datei/.test(nr(15))) E('APD-84/C-4 Zusammenarbeit 0 Nr. 15: zu Beginn nicht ‚diese ganze Datei‘');
  // APD-84/C-5 jede Pflicht nennt ihre Prüfung
  // seit 4.55.0: eine entfallene Nummer (‚26. entfällt (APD-123).‘) hat keine Prüfung
  for (const m of null0.matchAll(/\n(\d+)\. /g)) if (!/Prüfung|^entfällt/.test(nr(m[1]))) E(`APD-84/C-5 Zusammenarbeit 0 Nr. ${m[1]} ohne ‚Prüfung:‘`);
  return errors;
}

// Seit 4.36.0 (APD-78, Zusammenarbeit allgemein 2.4 ‚Nummern und Präfixe‘, Testfall-Liste `arbeit/APD-78 Testfall-Liste.md`
// APD-78/S-1 bis S-10): das Nummernschema in allen lebenden Dateien von AppDesign, der App und – wenn es daneben liegt –
// ReiseLogBuch-Import. Ausgenommen: feste Fassungen, Messdaten, Bilder, JSON, ZUORDNUNG.md (Tabelle alt → neu) und das
// Protokoll der Entscheidung (arbeit/APD-78 Recherche Präfixe.md, arbeit/APD-78 Testfall-Liste.md) samt Umbau-Skript.
// Gegenprobe: PRUEF_GEGENPROBE=schema:APD-78/S-n baut genau eine Verletzung ein (lauf.mjs --gegenprobe schema).
const ALT = ['Prüf' + 'punkt', 'Prüf' + 'liste', 'Fall' + '-Liste'];
export const GEGENPROBEN_SCHEMA = Object.fromEntries([
  ['S-1', 'unbekanntes Präfix', 'Präfix Q- unbekannt'], ['S-2', 'alte Nummer', 'alte Nummer ' + 'A' + '-12'],
  ['S-3', 'lokaler Buchstabe, der überall gilt', 'lokale Nummer K-1'], ['S-4', 'führende Null', 'führende Null in APD-' + '07'],
  ['S-5', 'ZUORDNUNG doppelt', 'doppelt'], ['S-6', 'Themennummer doppelt', 'APD-80 doppelt'], ['S-7', 'alter Begriff', ALT[1]],
  ['S-8', 'CHANGELOG ohne Testfälle P-n', 'Testfälle P-n'], ['S-9', 'toter Verweis in arbeit/', 'APD-99 fehlt'],
  ['S-10', 'Präfix fehlt in der Tabelle', 'Präfix RLB-'],
].map(([s, was, z]) => ['APD-78/' + s, { was, zeichen: new RegExp('APD-78/' + s + ' .*' + z.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }]).concat([
  // seit 4.39.0 (APD-84/C-1 bis C-5): der Kasten ‚Jede Antwort‘ (checkKasten)
  ['C-1', 'Kasten fehlt', 'Kasten'], ['C-2', 'Pflicht fehlt im Kasten', 'nennt 2.4 nicht'], ['C-3', 'CLAUDE.md liest nur 0 und 1', 'ganze Zusammenarbeit'],
  ['C-4', '0 Nr. 15 ohne ganze Datei', 'ganze Datei'], ['C-5', 'Pflicht ohne Prüfung', 'Nr. 28 ohne'],
].map(([c, was, z]) => ['APD-84/' + c, { was, zeichen: new RegExp('APD-84/' + c + ' .*' + z) }])).concat([
  // seit 4.55.0 (APD-123/K-1, ersetzt APD-113/M-11): der Wortlaut ‚Kachel am Ende, alles zum Lesen davor‘ (checkKachel)
  ['APD-123/K-1', { was: 'alter Wortlaut ‚Lagebild bereit – anzeigen?‘', zeichen: /APD-123\/K-1 .*anzeigen\?/ }]]).concat([
  // seit 4.60.4 (APD-135/M-1 bis M-4): ausgelagerte Versionsgeschichten, Kasten ‚Immer‘, ‚Verpflichtend‘ (checkVersionsgeschichte)
  ['M-1', 'Tabellenzeile im Regeltext', 'Zusammenarbeit allgemein: Versionsgeschichte nicht ausgelagert'],
  ['M-2', 'erste Zeile ohne die eigene Version', 'AppDesign CLAUDE.md: erste Zeile .* ist 0\\.0\\.0'],
  ['M-3', 'Kasten ‚Immer‘ ohne Nr. 1', 'nennt Nr\\. 1 nicht'], ['M-4', '‚Verpflichtend‘ wiederholt eine Regel', 'wiederholt Regeln'],
].map(([t, was, z]) => ['APD-135/' + t, { was, zeichen: new RegExp('APD-135/' + t + ' .*' + z) }])));
export function checkSchema(appDir, app, gp = (process.env.PRUEF_GEGENPROBE || '').match(/^schema:APD-78\/(S-\d+)$/)?.[1]) {
  const errors = [], E = t => errors.push(t);
  const ad = new URL('../AppDesign/', appDir);
  const repos = [['AppDesign', ad], [app, appDir], ['ReiseLogBuch-Import', new URL('../ReiseLogBuch-Import/', appDir)]]
    .filter(([n, u], i, a) => existsSync(fileURLToPath(new URL('.git', u))) && a.findIndex(x => x[1].href === u.href) === i);
  const historisch = f => f === 'ZUORDNUNG.md' || f === 'werkzeug/umbenennen.mjs' || /^arbeit\/APD-78 (Recherche Präfixe|Testfall-Liste)\.md$/.test(f);
  const daten = f => /^fassung\/|node_modules\/|(^|\/)messungen\/|Messungen\/|(^|\/)out\/|\.(png|jpe?g|gif|heic|pdf|ico|webp|json)$/i.test(f);
  const text = {};
  for (const [r, u] of repos) {
    const fs = execFileSync('git', ['-C', fileURLToPath(u), 'ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' }).split('\0');
    for (const f of fs.filter(f => f && !daten(f) && !historisch(f))) try { text[`${r}/${f}`] = readFileSync(new URL(f, u), 'utf8'); } catch {}
  }
  let zu = ''; try { zu = readFileSync(new URL('ZUORDNUNG.md', ad), 'utf8'); } catch { E('APD-78/S-5 ZUORDNUNG.md fehlt in AppDesign'); }
  const collabKey = 'AppDesign/README - Zusammenarbeit allgemein.md';
  // Gegenproben
  const plus = (k, t) => { text[k] = (text[k] || '') + t; };
  if (gp === 'S-1') plus('AppDesign/BACKLOG.md', '\nGegenprobe Q-5 ohne Elternnummer\n');
  if (gp === 'S-2') plus('AppDesign/CHANGELOG.md', '\nGegenprobe ' + 'A' + '-12\n');
  if (gp === 'S-3') text['AppDesign/arbeit' + '/APD-99 Testfall-Liste.md'] = '| K-1 | Gegenprobe |\n';
  if (gp === 'S-4') plus('AppDesign/CHANGELOG.md', '\nGegenprobe APD-' + '07\n');
  if (gp === 'S-5') zu = zu.replace(/(\n## 2\. [^\n]*\n(?:[^\n]*\n)*?)(\| E-\d+ \|[^\n]*\n)/, '$1$2$2');
  if (gp === 'S-6') text['AppDesign/BACKLOG.md'] = (text['AppDesign/BACKLOG.md'] || '').replace('\n## Erledigt', '\n| APD-80 | 3 | Gegenprobe | offen |\n\n## Erledigt');
  if (gp === 'S-7') plus('AppDesign/CHANGELOG.md', '\nGegenprobe ' + ALT[1] + '\n');
  if (gp === 'S-9') plus('AppDesign/CHANGELOG.md', '\nGegenprobe `' + 'arbeit' + '/APD-99 fehlt.md`\n');
  if (gp === 'S-10') text[collabKey] = (text[collabKey] || '').replace(/\n\| \*\*RLB-n\*\* \|[^\n]*/, '');
  // Präfixe, die überall gelten: die Tabelle in Zusammenarbeit 2.4
  const tabelle = (text[collabKey] || '').split('**Nummern und Präfixe**')[1]?.split('\n### ')[0] || '';
  const global = new Set([...tabelle.matchAll(/^\| \*\*([A-Z]{1,3})-/gm)].map(m => m[1]));
  const doku = k => /(^|\/)(BACKLOG|CHANGELOG|CLAUDE|README|PROMPT|ERKENNTNISSE|UEBERGABE)\.md$|\/README - [^/]*\.md$/.test(k);
  const eltern = /(?:[A-Z]{3}-\d+[a-z]?|[A-Z]{3} \d+\.\d+\.\d+)\/$/, folge = /(?:[A-Z]{3}-\d+[a-z]?|[A-Z]{3} \d+\.\d+\.\d+)\/[A-Z]-?\d+/;
  const fest = t => new Set([...t.matchAll(/^(?:\| ?|- |\d+\. )?\**([A-Z])-(\d+)\b(?![./]\d)|<td[^>]*>\s*([A-Z])-(\d+)\b/gm)].map(m => `${m[1] || m[3]}-${+(m[2] || m[4])}`));
  const neu = { A: n => `APD-${+n}`, T: n => `RLB-${+n} bzw. APD-38/T-${+n} (ZUORDNUNG 4)`, E: () => 'Thema, Usertest oder Version (ZUORDNUNG 2 und 3)', N: n => `I-${+n}` };
  const zaehl = {}, zeigen = (s, k, z, t) => { zaehl[s + k] = (zaehl[s + k] || 0) + 1; if (zaehl[s + k] <= 3) E(`${s} ${k}:${z}: ${t}`); else if (zaehl[s + k] === 4) E(`${s} ${k}: weitere Stellen …`); };
  for (const [k, t] of Object.entries(text)) {
    const f = k.slice(k.indexOf('/') + 1), eigen = /^arbeit\//.test(f) ? fest(t) : new Set();
    t.split('\n').forEach((l, i) => {
      for (const m of l.matchAll(/(?<![\w.\\-])([A-Z]{1,3})-(\d+)([a-z]?)(?![\w])/g)) {
        const [g, L, n] = m, vor = l.slice(0, m.index), tok = `${L}-${+n}`;
        if (vor.endsWith('/')) continue;
        // APD-78/S-4 führende Null (alte zweistellige Regelnummern bleiben, D8)
        if (/^0\d/.test(n) && L !== 'R') zeigen('APD-78/S-4', k, i + 1, `führende Null in ${g} – ${L}-${+n}`);
        if (L.length > 1) continue;
        // seit 4.59.3 (APD-132, Zusammenarbeit 2.4): steht dieselbe Liste in der Zeile davor mit Elternnummer (APD-54/T-1 bis T-9), genügt die Nummer allein
        if ('ATEN'.includes(L)) { if (!eigen.has(tok) && !(/^arbeit\//.test(f) && f.includes(` ${tok}`)) && !new RegExp(`(?:[A-Z]{3}-\\d+[a-z]?|[A-Z]{3} \\d+\\.\\d+\\.\\d+)\\/${L}-\\d+`).test(vor)) zeigen('APD-78/S-2', k, i + 1, `alte Nummer ${g} – neu ${neu[L](n)}`); continue; }
        if (global.has(L) || eigen.has(tok) || !doku(k) || folge.test(vor)) continue;
        zeigen('APD-78/S-1', k, i + 1, `Präfix ${L}- unbekannt – mit Elternnummer zitieren (APD-n/${g})`);
      }
      // APD-78/S-7 alte Begriffe
      for (const w of ALT) if (new RegExp(w === ALT[2] ? '(?<!Test)' + w : w).test(l)) zeigen('APD-78/S-7', k, i + 1, `alter Begriff ‚${w}‘ – neu: Zusammenarbeit 2.4 ‚Begriffe‘`);
      // APD-78/S-9 Verweise in arbeit/
      for (const m of l.matchAll(/arbeit\/([^`'"\n)|\]*]+?\.(?:md|html|mjs|txt|png|jpe?g))/g))
        if (!/…|<|\b(?:APD|RLB|RLI)-n\b|X\.Y/.test(m[1]) && !existsSync(fileURLToPath(new URL('arbeit/' + m[1], ad)))) zeigen('APD-78/S-9', k, i + 1, `Verweis auf arbeit/${m[1]} – die Datei gibt es nicht`);
    });
    // APD-78/S-3 lokale Testfall-Nummer mit einem Buchstaben, der überall gilt
    if (/^arbeit\/.*Testfall-Liste/.test(f)) for (const x of eigen) if (global.has(x.split('-')[0]) && !x.startsWith('R-')) zeigen('APD-78/S-3', k, '', `lokale Nummer ${x} verwendet ein Präfix, das überall gilt (${[...global].join(', ')}) – freien Buchstaben wählen (ZUORDNUNG 5)`);
  }
  // APD-78/S-5 ZUORDNUNG.md
  const abschnitt = n => zu.split(new RegExp(`\\n## ${n}\\. `))[1]?.split(/\n## /)[0] || '';
  const zeilen = n => abschnitt(n).split('\n').filter(l => /^\| (?!-)/.test(l)).slice(1).map(l => l.slice(2, -2).split(' | ').map(x => x.trim()));
  const backlog = r => text[`${r}/BACKLOG.md`] || '';
  const alles = Object.values(text).join('\n') + '\n' + zu;
  const gibt = x => {
    if (/^(?:APD|RLB|RLI) \d+\.\d+\.\d+(?:\/[A-Z]-\d+)?$|^(?:Designrichtlinie allgemein|Zusammenarbeit(?: allgemein)?) \d+\.\d+\.\d+$/.test(x)) return true;
    const r = x.startsWith('APD') ? 'AppDesign' : x.startsWith('RLB') ? app : null;
    if (/^P-\d+$/.test(x)) return new RegExp(`${x}(?!\\d)`).test(backlog('AppDesign') + backlog(app));
    return !!r && new RegExp(`(?<![\\w/-])${x}(?!\\d)`).test(backlog(r));
  };
  for (const [n, name] of [[2, 'Erledigt AppDesign'], [3, `Erledigt ${app}`], [7, 'Frühe Nummern']]) {
    const z = zeilen(n); if (!z.length) { E(`APD-78/S-5 ZUORDNUNG.md: Abschnitt ${n} (${name}) fehlt oder ist leer`); continue; }
    const seen = new Set();
    for (const [alt, ziel] of z) {
      if (seen.has(alt)) E(`APD-78/S-5 ZUORDNUNG.md ${name}: ${alt} doppelt`); seen.add(alt);
      for (const x of ziel.split(/, | bis /)) if (!gibt(x)) E(`APD-78/S-5 ZUORDNUNG.md ${name}: ${alt} → ${x} – gibt es im Backlog nicht`);
    }
  }
  for (const [repo, , , , d] of zeilen(4)) if (!['RLB', 'APD-38', 'APD-36', 'Hand'].includes(d)) E(`APD-78/S-5 ZUORDNUNG.md Abschnitt 4: Entscheidung ‚${d}‘ unbekannt (${repo})`);
  // APD-78/S-6 Themennummern: keine doppelte im Backlog, keine Lücke, nie vergebene bleiben frei
  const frei = new Set(zeilen(8).map(([, x]) => x));
  for (const [r] of repos) {
    const b = backlog(r), code = [...b.matchAll(/^\| ([A-Z]{3})-\d+ \|/gm)].map(m => m[1])[0];
    if (!code) continue;
    const aktiv = b.split('\n## Erledigt')[0], nrs = [...aktiv.matchAll(new RegExp(`^\\| (${code}-\\d+) \\|`, 'gm'))].map(m => m[1]);
    for (const x of new Set(nrs.filter((x, i) => nrs.indexOf(x) !== i))) E(`APD-78/S-6 ${r} BACKLOG.md: ${x} doppelt (jede Nummer nur einmal, D1)`);
    const da = new Set();
    for (const m of alles.matchAll(new RegExp(`(?<![\\w/-])${code}-(\\d+)(?: bis (?:${code}-)?(\\d+))?`, 'g'))) for (let k = +m[1]; k <= +(m[2] || m[1]) && k - m[1] < 60; k++) da.add(k);
    const max = Math.max(...[...b.matchAll(new RegExp(`(?<![\\w/-])${code}-(\\d+)`, 'g'))].map(m => +m[1]));
    for (let k = 1; k < max; k++) if (!da.has(k) && !frei.has(`${code}-${k}`)) E(`APD-78/S-6 ${code}-${k} fehlt – Lücke in den Themennummern (neu immer höchste + 1; nie vergeben: ZUORDNUNG 8)`);
    for (const x of frei) if (x.startsWith(code + '-') && new RegExp(`(?<![\\w/-])${x}(?!\\d)`).test(repos.map(([r]) => backlog(r)).join('\n'))) E(`APD-78/S-6 ${x} ist als nie vergeben eingetragen (ZUORDNUNG 8) und steht in einem Backlog`);
  }
  // APD-78/S-10 Tabelle in 2.4 nennt jedes überall geltende Präfix
  const noetig = new Set(['P', 'R', 'G']);
  for (const [r] of repos) for (const m of backlog(r).matchAll(/^\| ([A-Z]{3})-\d+ \|/gm)) noetig.add(m[1]);
  if (repos.some(([r]) => r === 'ReiseLogBuch-Import')) ['I', 'K', 'RLI'].forEach(x => noetig.add(x));
  for (const x of noetig) if (!global.has(x)) E(`APD-78/S-10 Zusammenarbeit 2.4: Präfix ${x}- fehlt in der Tabelle ‚Nummern und Präfixe‘`);
  return errors;
}

// R-1.13 AD-Beans (seit 4.60.0, APD-136; Testfall-Liste arbeit/APD-30 Wischaktionen Testfall-Liste.md W-72, W-73, W-80): liest die Liste der AD-Beans
// (Designrichtlinie 15) aus der Fassung der App und prüft sie gegen ui.js und design.css derselben Fassung sowie gegen den Code der App (index.html):
//   W-72: je Kennung genau eine Zeile; die Fabrik heißt create<Kennung> und steht in ui.js; jede Fabrik in ui.js, die eine Bean ist (setzt
//         data-ad-bean), steht in der Liste; CSS der Bean nur unter .ad-<kennung>… (jede Regel, die die Bean nennt, zielt auf ihre Klassen)
//   W-73: die App nennt keine Klasse .ad-<kennung>… und keinen inneren Namen der Bean (Namen, die ui.js im Abschnitt der Bean außer der Fabrik
//         anlegt) – nur Fabrik, Eigenschaften, Nur lesen, Methoden, Ereignisse
// Gegenprobe W-80: PRUEF_GEGENPROBE=beans:W-80 fügt dem gelesenen index.html eine Regel für .ad-swipeactions-kapsel hinzu – W-73 wird rot.
export function checkBeans(appDir, app) {
  const errors = [], E = t => errors.push(`R-1.13 ${t}`);
  const read = f => { try { return readFileSync(new URL(f, appDir), 'utf8'); } catch { return ''; } };
  let html = read('index.html');
  const needed = html.match(/AD_NEEDED = '([\d.]+)'/)?.[1];
  if (process.env.PRUEF_GEGENPROBE === 'beans:W-80') html = html.replace('</style>', '.ad-swipeactions-kapsel { color: red; }\n</style>');
  const guide = adText(appDir, 'README - Designrichtlinie allgemein.md', needed);
  const ui = adText(appDir, needed ? 'ui.js' : 'v4/ui.js', needed) || adText(appDir, 'v4/ui.js'), css = adText(appDir, needed ? 'design.css' : 'v4/design.css', needed) || adText(appDir, 'v4/design.css');
  const abschnitt = guide.split('\n## 15. ')[1]?.split('\n### ')[0] || '';
  const tabelle = abschnitt.split('**Liste der AD-Beans**')[1] || '';
  if (!tabelle) { E('Designrichtlinie 15: ‚Liste der AD-Beans‘ fehlt'); return errors; }
  const zeilen = [...tabelle.matchAll(/^\| `([a-z]+)` \|([^\n]+)$/gm)].map(m => ({ kennung: m[1], spalten: m[2].split(' | ').map(x => x.replace(/\|\s*$/, '').trim()) }));
  if (!zeilen.length) E('Designrichtlinie 15: die Liste der AD-Beans hat keine Zeile');
  const namen = s => [...String(s).matchAll(/`([A-Za-z]\w*)/g)].map(m => m[1]);
  const gross = k => k[0].toUpperCase() + k.slice(1);
  const kennungen = zeilen.map(z => z.kennung);
  for (const k of new Set(kennungen)) if (kennungen.filter(x => x === k).length > 1) E(`W-72 Kennung ‚${k}‘ steht ${kennungen.filter(x => x === k).length}-mal in der Liste der AD-Beans`);
  // Fabriken in ui.js, die Beans sind (setzen data-ad-bean)
  const fabriken = [...ui.matchAll(/\nfunction (create[A-Z]\w*)\(/g)].map(m => { const i = m.index, ende = ui.indexOf('\n}\n', i); return { name: m[1], text: ui.slice(i, ende) }; });
  for (const f of fabriken) if (/adBean\s*=|data-ad-bean/.test(f.text) && !zeilen.some(z => `create${gross(z.kennung)}` === f.name)) E(`W-72 ${f.name} in ui.js ist eine Bean (setzt data-ad-bean), steht aber nicht in der Liste der AD-Beans`);
  for (const { kennung, spalten } of zeilen) {
    const fabrik = `create${gross(kennung)}`;
    if (!spalten[1]?.includes(fabrik)) E(`W-72 ${kennung}: Fabrik in der Liste ‚${spalten[1]}‘ statt ${fabrik}(…)`);
    const f = fabriken.find(x => x.name === fabrik);
    if (!f) { E(`W-72 ${kennung}: ${fabrik} fehlt in ui.js`); continue; }
    // W-95 (seit 4.60.2, P-108/M-12): die Eigenschaften der Liste (ohne Klammern) = die Parameter der Fabrik ({ … } im Kopf der Funktion)
    const param = (f.text.match(/function \w+\([^,{)]*,\s*\{([^}]*)\}/)?.[1] || '').split(',').map(x => x.split('=')[0].trim()).filter(Boolean).sort();
    const inListe = namen(String(spalten[2] || '').replace(/\([^()]*\)/g, '')).sort();
    if (param.join() !== inListe.join()) E(`W-95 ${kennung}: Eigenschaften in der Liste ${inListe.join(', ') || '–'} – Parameter von ${fabrik} ${param.join(', ') || '–'}`);
    if (!new RegExp(`adBean\\s*=\\s*'${kennung}'`).test(f.text)) E(`W-72 ${kennung}: ${fabrik} setzt data-ad-bean="${kennung}" nicht`);
    // CSS nur unter .ad-<kennung>…: jede Regel, die die Bean nennt, zielt mit jedem Selektor auf eine Klasse der Bean
    for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{[^{}]*\}/g)) {
      const sel = m[1].trim();
      if (!sel.includes(`ad-${kennung}`) || sel.startsWith('@')) continue;
      for (const s of sel.split(',').map(x => x.trim())) if (!new RegExp(`\\.ad-${kennung}(?:-[\\w-]+)?(?:[.:\\[][^\\s>+~]*)?$`).test(s)) E(`W-72 ${kennung}: CSS ‚${s}‘ zielt nicht auf eine Klasse .ad-${kennung}…`);
    }
    for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{[^{}]*\}/g)) for (const s of m[1].split(',').map(x => x.trim()))
      if (/\.ad-[a-z]+/.test(s) && !s.includes(`ad-${kennung}`) && !kennungen.some(k => s.includes(`ad-${k}`))) E(`W-72 CSS ‚${s}‘ nennt eine Bean, die nicht in der Liste steht`);
    // W-73: der Code der App nennt keine Klasse und keinen inneren Namen der Bean
    const klassen = [...new Set(html.match(new RegExp(`ad-${kennung}(?:-[\\w-]+)?`, 'g')) || [])];
    if (klassen.length) E(`W-73 ${app} index.html nennt CSS bzw. Klassen der Bean ${kennung}: ${klassen.join(', ')}`);
    const start = ui.indexOf(`/* ---------- AD-Bean ${kennung}`), teil = start >= 0 ? ui.slice(start, ui.indexOf('\n}\n', ui.indexOf(`function ${fabrik}(`)) + 3) : '';
    if (!teil) { E(`W-73 ${kennung}: Abschnitt ‚/* ---------- AD-Bean ${kennung}‘ fehlt in ui.js`); continue; }
    const erlaubt = new Set([fabrik, ...namen(spalten[2]), ...namen(spalten[3]), ...namen(spalten[4]), ...namen(spalten[5])]);
    const innen = [...teil.matchAll(/^(?:let|const|var|function)\s+(\w+)/gm)].map(m => m[1]).filter(n => !erlaubt.has(n));
    const code = html.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\/[^\n]*/g, '');
    const genannt = innen.filter(n => new RegExp(`\\b${n}\\b`).test(code));
    if (genannt.length) E(`W-73 ${app} index.html nennt innere Namen der Bean ${kennung}: ${genannt.join(', ')}`);
  }
  return errors;
}
