// AppDesign 4.14.1 · Veröffentlichungs-Skript (APD-5 Version B, Testfall-Liste Teil E; Zusammenarbeit allgemein 0 Nr. 9 und 10).
// Zwei Schritte, damit Claude dazwischen die Texte (CHANGELOG, Testfälle, Backlog) schreibt:
//   node werkzeug/veroeffentlichen.mjs vorbereiten --ad 4.14.0 --app reiselogbuch=3.13.0
//        erhöht alle Versionsnummern (AppDesign und App) und legt die feste Fassung fassung/4.14.0/ an (APD-5/D-1);
//        ohne --ad bleibt die App auf ihrer Fassung, ohne --app bleiben alle Apps unverändert (heben nur nach Rückfrage, APD-5/D-4).
//   node werkzeug/veroeffentlichen.mjs fassung
//        legt die Fassung der aktuellen AppDesign-Version neu an (nach Änderungen an v4/ oder tests/, nur vor dem Veröffentlichen).
//   node werkzeug/veroeffentlichen.mjs los [--app reiselogbuch] [--nur-app] [--jobs N]
//        prüft (Zweig, keine offenen Änderungen, Texte, Fassung, alle Tests der App) und veröffentlicht: erst AppDesign
//        (--no-ff nach main, Push, Pages-Lauf abwarten), dann die App genauso. --nur-app: AppDesign ist schon online.
//        --jobs N (seit 4.39.0, APD-85): so viele Prüfungen gleichzeitig (Standard: Kerne) – weniger Last für WebKit.
// Seit 4.14.1 ohne Git-Markierung (aus der Cloud gesperrt): veröffentlicht = fassung/X.Y.Z/ liegt auf origin/main.
// AppDesign und die Apps liegen nebeneinander (Liste werkzeug/apps.json). Rückgabewert 0 = fertig, 1 = abgebrochen.
// Für den Selbsttest: --ad-dir <Ordner>, VEROEFF_PAGES=success|failure|haengt (Pages-Lauf nachgebildet), VEROEFF_PAGES_MAX_S,
// VEROEFF_WARTE_MS (Grundzeit der Wiederholungen, Standard 1000 → 2, 4, 8, 16 s).
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { vergleiche, fassungQuellen, fassungListe, pruefsummen, checkFassungen } from '../tests/version.mjs';

const argv = process.argv.slice(2), befehl = argv[0];
const opt = n => { const i = argv.indexOf(n); return i < 0 ? undefined : argv[i + 1]; };
const opts = n => argv.flatMap((a, i) => a === n ? [argv[i + 1]] : []);
const AD = opt('--ad-dir') ? new URL(opt('--ad-dir').replace(/\/?$/, '/'), `file://${process.cwd()}/`) : new URL('../', import.meta.url);
const APPS = JSON.parse(readFileSync(new URL('werkzeug/apps.json', AD), 'utf8')).map(a => ({ ...a, dir: new URL(`../${a.repo}/`, AD) }));
const WARTE = +(process.env.VEROEFF_WARTE_MS ?? 1000);
const pfad = u => fileURLToPath(u);
const lies = (base, f) => readFileSync(new URL(f, base), 'utf8');
const git = (dir, ...a) => execFileSync('git', ['-C', pfad(dir), ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const gitOk = (dir, ...a) => { try { return git(dir, ...a); } catch { return null; } };
const sleep = ms => new Promise(r => setTimeout(r, ms));
class Abbruch extends Error {}
const abbruch = t => { throw new Abbruch(t); };
const heute = () => new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
const jetzt = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', day: '2-digit', month: '2-digit',
  year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return `${p.day}.${p.month}.${p.year} um ${p.hour}:${p.minute}`; };
const adVersion = () => lies(AD, 'v4/ui.js').match(/const AD_VERSION = '([\d.]+)'/)?.[1];
const appVersion = a => lies(a.dir, 'index.html').match(/const APP_VERSION = '([\d.]+)'/)?.[1];
const appFassung = a => lies(a.dir, 'index.html').match(/const AD_NEEDED = '([\d.]+)'/)?.[1];
const version = text => text.match(/\*\*Version (\d+\.\d+\.\d+)\*\*/)?.[1];
const online = v => { gitOk(AD, 'fetch', '-q', 'origin', 'main'); return gitOk(AD, 'cat-file', '-e', `origin/main:fassung/${v}/ui.js`) !== null; };

// Änderungen erst sammeln, dann alle zusammen schreiben – bei einem Fehler bleibt alles unverändert (APD-5/E-2).
function aenderungen() {
  const neu = new Map();
  return {
    ersetze(base, f, pairs) {
      const key = new URL(f, base).href;
      let t = neu.get(key) ?? lies(base, f);
      for (const [re, by, wie = 1] of pairs) {
        const n = (t.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')) || []).length;
        if (wie === 1 ? n !== 1 : n < 1) abbruch(`${pfad(new URL(f, base))}: Stelle ${re} ${n ? n + '-mal' : 'nicht'} gefunden – nichts geändert`);
        t = t.replace(re, by);
      }
      neu.set(key, t);
    },
    schreibe() { for (const [k, t] of neu) writeFileSync(new URL(k), t); return [...neu.keys()].map(k => pfad(new URL(k))); },
  };
}

function legeFassungAn() {
  const v = adVersion();
  if (online(v)) abbruch(`AppDesign ${v} ist schon veröffentlicht (fassung/${v}/ auf main) – eine Fassung ist unveränderlich, neue Version mit ‚vorbereiten‘`);
  const ziel = new URL(`fassung/${v}/`, AD);
  rmSync(ziel, { recursive: true, force: true });
  for (const [z, q] of Object.entries(fassungQuellen(AD))) { mkdirSync(new URL('.', new URL(z, ziel)), { recursive: true }); copyFileSync(new URL(q, AD), new URL(z, ziel)); }
  // Nur die Zeilen dieser Fassung neu – die Prüfsummen veröffentlichter Fassungen bleiben, wie sie sind (sonst verdeckt).
  let alt = ''; try { alt = lies(AD, 'fassung/PRUEFSUMMEN'); } catch {}
  const zeilen = [...alt.split('\n').filter(l => l && !l.includes(`  ${v}/`)), ...pruefsummen(AD, v).trim().split('\n')];
  writeFileSync(new URL('fassung/PRUEFSUMMEN', AD), zeilen.sort((a, b) => a.split('  ')[1].localeCompare(b.split('  ')[1])).join('\n') + '\n');
  console.log(`✓ Fassung fassung/${v}/ angelegt (${Object.keys(fassungQuellen(AD)).length} Dateien) und fassung/PRUEFSUMMEN geschrieben`);
}

// APD-5/D-4: Apps auf älteren Fassungen nennen, nichts heben.
function aeltereFassungen(neueste) {
  for (const a of APPS) if (existsSync(new URL('index.html', a.dir))) {
    const f = appFassung(a);
    if (f && vergleiche(f, neueste) < 0) console.log(`ℹ ${a.titel} nutzt die Fassung ${f} (neueste ${neueste}) – heben nur nach Rückfrage (Zusammenarbeit 0 Nr. 10): vorbereiten --ad … --app ${a.name}=X.Y.Z`);
  }
}

function vorbereiten() {
  const X = opt('--ad'), apps = opts('--app').map(s => { const [n, v] = s.split('='); const a = APPS.find(x => x.name === n); if (!a) abbruch(`App ‚${n}‘ steht nicht in werkzeug/apps.json`); return { ...a, Y: v }; });
  if (!X && !apps.length) abbruch('Nichts zu tun: --ad X.Y.Z und/oder --app name=X.Y.Z');
  const re = /^\d+\.\d+\.\d+$/, ch = aenderungen(), d = heute();
  const altX = adVersion();
  if (X) {
    if (!re.test(X)) abbruch(`--ad ${X}: keine Version X.Y.Z`);
    if (vergleiche(X, altX) <= 0) abbruch(`AppDesign ${X} ist nicht höher als ${altX} – nichts geändert`);
    if (fassungListe(AD).includes(X) || online(X)) abbruch(`Fassung ${X} gibt es schon – nichts geändert`);
    if (X.split('.')[0] !== altX.split('.')[0]) abbruch(`Hauptversion ${X}: neuer Ordner v${X.split('.')[0]}/ (Designrichtlinie 14) – das macht das Skript nicht`);
    ch.ersetze(AD, 'v4/ui.js', [[/^\/\/ AppDesign [\d.]+ ·/m, `// AppDesign ${X} ·`], [/const AD_VERSION = '[\d.]+';/, `const AD_VERSION = '${X}';`]]);
    ch.ersetze(AD, 'v4/design.css', [[/^\/\* AppDesign [\d.]+ ·/m, `/* AppDesign ${X} ·`], [/--ad-version: "[\d.]+";/, `--ad-version: "${X}";`]]);
    for (const f of ['README.md', 'README - Designrichtlinie allgemein.md']) ch.ersetze(AD, f, [[/\*\*Version [\d.]+\*\* · Stand [\d.]+/, `**Version ${X}** · Stand ${d}`]]);
    ch.ersetze(AD, 'BACKLOG.md', [[/\*\*Stand [\d.]+\*\* · Aktuelle Version: AppDesign [\d.]+/, `**Stand ${d}** · Aktuelle Version: AppDesign ${X}`]]);
    ch.ersetze(AD, 'vorlage/index.html', [[/\(AppDesign [\d.]+\)/, `(AppDesign ${X})`], [/\.\.\/(?:v4|fassung\/[\d.]+)\/(ui\.js|design\.css)(?:\?v=[\d.]+)?"/g, `../fassung/${X}/$1"`, 2],
      [/const AD_NEEDED = '[\d.]+';/, `const AD_NEEDED = '${X}';`]]);
  }
  // Texte so, wie sie in der Fassung der App stehen (ohne --ad: ihre bisherige Fassung; mit --ad: der Arbeitsstand, der die Fassung wird).
  const text = (F, f) => { try { if (F !== X) return lies(AD, `fassung/${F}/${f}`); } catch {} return lies(AD, f); };
  for (const a of apps) {
    const altY = appVersion(a), F = X || appFassung(a), T = a.titel;
    if (!re.test(a.Y)) abbruch(`--app ${a.name}=${a.Y}: keine Version X.Y.Z`);
    if (vergleiche(a.Y, altY) <= 0) abbruch(`${T} ${a.Y} ist nicht höher als ${altY} – nichts geändert`);
    const RA = X || version(text(F, 'README - Designrichtlinie allgemein.md')), zus = version(text(F, 'README - Zusammenarbeit allgemein.md'));
    const ref = /\.\.\/AppDesign\/(?:v4|fassung\/[\d.]+)\/(ui\.js|design\.css)(?:\?v=[\d.]+)?(["'])/g;
    ch.ersetze(a.dir, 'index.html', [[/const APP_VERSION = '[\d.]+';/, `const APP_VERSION = '${a.Y}';`], [/const APP_BUILT = '[^']*';/, `const APP_BUILT = '${jetzt()}';`],
      [/const AD_NEEDED = '[\d.]+';/, `const AD_NEEDED = '${F}';`], [ref, `../AppDesign/fassung/${F}/$1$2`, 2]]);
    ch.ersetze(a.dir, 'sw.js', [[new RegExp(`const CACHE = '${a.cache}-[\\d.]+';`), `const CACHE = '${a.cache}-${a.Y}';`], [ref, `../AppDesign/fassung/${F}/$1$2`, 2]]);
    // Die App wird mit den Prüfungen ihrer Fassung geprüft (APD-5/D-1).
    for (const f of execFileSync('git', ['-C', pfad(a.dir), 'ls-files', 'tests/*.mjs'], { encoding: 'utf8' }).split('\n').filter(Boolean)) {
      const t = lies(a.dir, f), r = /((?:from|import\()\s*)'\.\.\/\.\.\/AppDesign\/(?:tests|fassung\/[\d.]+\/tests)\//g;
      if (r.test(t)) ch.ersetze(a.dir, f, [[r, `$1'../../AppDesign/fassung/${F}/tests/`, 2]]);
    }
    const row = (name, v) => [new RegExp(`^(\\| ${name} \\| )[\\d.]+( \\|)`, 'm'), `$1${v}$2`];
    ch.ersetze(a.dir, 'README.md', [row(T, a.Y), row('AppDesign', F), row('Designrichtlinie allgemein', RA), row(`Designrichtlinie ${T}`, a.Y), row('Zusammenarbeit allgemein', zus),
      // APD-5/D-6 (seit 4.14.1): Richtlinien und Bausteine aus dem Ordner der benutzten Fassung auf main
      [/(github\.com\/g811141a\/AppDesign\/blob\/)(?:main|v[\d.]+)\//g, '$1main/', 2],
      [/(AppDesign\/blob\/main\/)(?:v4\/|fassung\/[\d.]+\/)?(ui\.js|design\.css|README%20-%20(?:Designrichtlinie|Zusammenarbeit)%20allgemein\.md)\)/g, `$1fassung/${F}/$2)`, 2],
      [/\[(?:v4|fassung\/[\d.]+)\/(ui\.js|design\.css)\]/g, `[fassung/${F}/$1]`, 2]]);
    const own = `README - Designrichtlinie ${T}.md`;
    ch.ersetze(a.dir, own, [[/\*\*Version [\d.]+\*\* · Stand [\d.]+/, `**Version ${a.Y}** · Stand ${d}`], [/(Designrichtlinie allgemein aus AppDesign \(Version )[\d.]+\)/, `$1${RA})`]]);
    ch.ersetze(a.dir, 'PROMPT.md', [[/\(Stand [\d.]+, Version [\d.]+\)/, `(Stand ${d}, Version ${a.Y})`],
      [new RegExp(`^${T} [\\d.]+ · AppDesign .*$`, 'm'), `${T} ${a.Y} · AppDesign ${F} (Designrichtlinie allgemein ${RA}) · Designrichtlinie ${T} ${a.Y} · Zusammenarbeit allgemein ${zus}`]]);
    ch.ersetze(a.dir, 'BACKLOG.md', [[/\*\*Stand [\d.]+\*\* · Aktuelle Version: .*$/m, `**Stand ${d}** · Aktuelle Version: ${T} ${a.Y} · AppDesign ${F}`]]);
  }
  const geschrieben = ch.schreibe();
  console.log(`✓ Versionen erhöht${X ? ` – AppDesign ${altX} → ${X}` : ''}${apps.map(a => ` – ${a.titel} → ${a.Y} (Fassung ${X || appFassung(a)})`).join('')}\n  ${geschrieben.length} Dateien geändert`);
  if (X) legeFassungAn();
  aeltereFassungen(X || altX);
  console.log('Weiter: CHANGELOG, Testfälle (/0), Backlog und Richtlinien-Versionsgeschichte schreiben, committen, dann ‚los‘.');
}

async function mitWiederholung(name, fn) {
  for (let i = 0; ; i++) {
    try { return fn(); } catch (e) {
      if (i === 4) abbruch(`${name} nach 5 Versuchen gescheitert: ${(e.stderr || e.message || '').toString().trim().split('\n').at(-1)}`);
      const w = WARTE * 2 ** (i + 1); console.log(`  ${name} gescheitert – neuer Versuch in ${w / 1000} s`); await sleep(w);
    }
  }
}

// APD-5/E-6: Pages-Lauf über die GitHub-Liste der Actions für genau diesen Commit (github.io ist aus der Cloud gesperrt, APD-5/E-9).
async function warteAufPages(dir, sha, name) {
  // Nachbildung für den Selbsttest: VEROEFF_PAGES=success | failure | haengt, mehrere mit Komma (je Repo der Reihe nach).
  const scheine = process.env.VEROEFF_PAGES?.split(','), schein = scheine && (scheine[warteAufPages.n = (warteAufPages.n ?? -1) + 1] ?? scheine.at(-1));
  const max = +(process.env.VEROEFF_PAGES_MAX_S ?? 600) * 1000, t0 = Date.now();
  const [owner, repo] = git(dir, 'remote', 'get-url', 'origin').replace(/\.git$/, '').split('/').slice(-2);
  process.stdout.write(`  warte auf den Pages-Lauf von ${name} (${sha.slice(0, 7)}) `);
  while (Date.now() - t0 < max) {
    let lauf;
    if (schein) lauf = schein === 'haengt' ? { status: 'in_progress' } : { status: 'completed', conclusion: schein };
    else try {
      const j = JSON.parse(execFileSync('gh', ['api', `repos/${owner}/${repo}/actions/runs?head_sha=${sha}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
      lauf = j.workflow_runs.find(r => /pages/i.test(r.name));
    } catch {}
    if (lauf?.status === 'completed') {
      console.log(`→ ${lauf.conclusion} (${Math.round((Date.now() - t0) / 1000)} s)`);
      if (lauf.conclusion !== 'success') abbruch(`Pages-Lauf von ${name} endete mit ‚${lauf.conclusion}‘`);
      return Math.round((Date.now() - t0) / 1000);
    }
    process.stdout.write('.'); await sleep(schein ? 50 : 15000);
  }
  console.log('→ Zeitüberschreitung');
  abbruch(`Pages-Lauf von ${name} nach ${max / 60000} min nicht fertig`);
}

function pruefeRepo(dir, name, branchName) {
  const b = gitOk(dir, 'rev-parse', '--abbrev-ref', 'HEAD');
  if (!b || b === 'HEAD') abbruch(`${name}: kein Zweig ausgecheckt`);
  if (b === 'main') abbruch(`${name}: steht auf main – veröffentlicht wird aus einem Vorbereitungs-Zweig (z. B. ${branchName})`);
  const offen = git(dir, 'status', '--porcelain');
  if (offen) abbruch(`${name}: offene Änderungen ohne Commit:\n${offen.split('\n').slice(0, 8).map(l => '    ' + l).join('\n')}`);
  return b;
}

async function veroeffentliche(dir, name, branch, pruefe) {
  const t0 = Date.now();
  await mitWiederholung(`${name}: git fetch`, () => git(dir, 'fetch', 'origin', 'main'));
  git(dir, 'checkout', '-q', '-B', 'main', 'origin/main');
  git(dir, 'merge', '-q', '--no-ff', branch, '-m', `Merge ${branch}: ${name}`);
  const sha = git(dir, 'rev-parse', 'HEAD');
  await mitWiederholung(`${name}: git push`, () => git(dir, 'push', '-q', 'origin', 'main'));
  console.log(`✓ ${name}: ${sha.slice(0, 7)} auf main`);
  const pages = await warteAufPages(dir, sha, name);
  await mitWiederholung(`${name}: git fetch`, () => git(dir, 'fetch', 'origin', 'main'));
  pruefe(f => git(dir, 'show', `origin/main:${f}`));
  return { name, sha, pages, dauer: Math.round((Date.now() - t0) / 1000) };
}

async function los() {
  const nurApp = argv.includes('--nur-app'), namen = opts('--app');
  const X = adVersion(), apps = (namen.length ? namen.map(n => APPS.find(a => a.name === n) || abbruch(`App ‚${n}‘ steht nicht in werkzeug/apps.json`)) :
    // ohne --app: jede App, deren Version neuer ist als auf origin/main (also vorbereitet) – egal auf welchem Zweig sie steht
    APPS.filter(a => existsSync(new URL('index.html', a.dir)) && appVersion(a) !== (gitOk(a.dir, 'show', 'origin/main:index.html') || '').match(/const APP_VERSION = '([\d.]+)'/)?.[1]));
  // APD-5/E-3: vor dem Push – Zweig, offene Änderungen, Texte, Fassung
  if (!nurApp && online(X)) abbruch(`AppDesign ${X} ist schon veröffentlicht (fassung/${X}/ auf main) – nur die App: los --nur-app`);
  const adBranch = nurApp ? null : pruefeRepo(AD, 'AppDesign', `vorbereitung-${X}`);
  if (nurApp) { if (!online(X)) abbruch(`--nur-app: AppDesign ${X} ist noch nicht veröffentlicht (fassung/${X}/ fehlt auf main)`); }
  else {
    if (!new RegExp(`^## ${X.replace(/\./g, '\\.')} – `, 'm').test(lies(AD, 'CHANGELOG.md'))) abbruch(`AppDesign CHANGELOG.md: Eintrag ‚## ${X} – …‘ fehlt`);
    if (!fassungListe(AD).includes(X)) abbruch(`fassung/${X}/ fehlt – node werkzeug/veroeffentlichen.mjs fassung`);
    const f = checkFassungen(AD); if (f.length) abbruch(`Fassung nicht in Ordnung:\n${f.map(e => '    ' + e).join('\n')}`);
  }
  const appBranches = apps.map(a => {
    const Y = appVersion(a), b = pruefeRepo(a.dir, a.titel, `vorbereitung-${Y}`), neu = lies(a.dir, 'CHANGELOG.md').split(/\n## /)[1] || '';
    if (!neu.startsWith(`${Y} `)) abbruch(`${a.titel} CHANGELOG.md: neuester Eintrag ist nicht ${Y}`);
    if (!/\/0 – [^*]*Version/.test(neu)) abbruch(`${a.titel} CHANGELOG.md: Testfälle mit /0 ‚Version prüfen‘ fehlen`);
    if (!/Testfälle P-\d+/.test(neu)) abbruch(`${a.titel} CHANGELOG.md: Zeile ‚Testfälle P-n‘ fehlt (APD-78/S-8)`);
    if (!fassungListe(AD).includes(appFassung(a))) abbruch(`${a.titel} braucht die Fassung ${appFassung(a)}, die es in AppDesign nicht gibt`);
    return b;
  });
  if (!apps.length && nurApp) abbruch('--nur-app, aber keine App ist vorbereitet (Version wie auf origin/main)');
  if (!apps.length) console.log(`ℹ Keine App vorbereitet – nur AppDesign ${X} (Apps bleiben auf ihrer Fassung)`);
  // Seit 4.39.0 (APD-84): zuerst die Werkzeuge von AppDesign (Zeitzeile, Regelwächter) – sie laufen in keiner App mit
  if (!nurApp) for (const t of ['messung', 'regelwaechter'].filter(t => existsSync(new URL(`tests/${t}.mjs`, AD)))) {
    console.log(`\n— Prüfung AppDesign (node tests/${t}.mjs) —`);
    const r = spawnSync(process.execPath, [`tests/${t}.mjs`], { cwd: pfad(AD), stdio: 'inherit' });
    if (r.status !== 0) abbruch(`AppDesign tests/${t}.mjs rot – nichts veröffentlicht`);
  }
  // APD-5/E-4: alle Tests jeder App – einer rot: nichts veröffentlichen
  for (const a of apps) {
    console.log(`\n— Prüfungen ${a.titel} (node tests/alle.mjs) —`);
    const r = spawnSync(process.execPath, ['tests/alle.mjs', ...(opt('--jobs') ? ['--jobs', opt('--jobs')] : [])], { cwd: pfad(a.dir), stdio: 'inherit' });
    if (r.status !== 0) abbruch(`Prüfungen von ${a.titel} rot – nichts veröffentlicht`);
  }
  const ergebnis = [];
  if (!nurApp) try {
    ergebnis.push(await veroeffentliche(AD, `AppDesign ${X}`, adBranch, show => {
      if (!show('v4/ui.js').includes(`const AD_VERSION = '${X}'`) || !show(`fassung/${X}/ui.js`).includes(`const AD_VERSION = '${X}'`)) abbruch(`AppDesign: main enthält nicht die Version ${X}`);
    }));
  } catch (e) {
    if (e instanceof Abbruch) e.message += `\n  Die App${apps.length > 1 ? 's bleiben' : ' bleibt'} unverändert. Ist AppDesign ${X} schon auf main (fassung/${X}/) und der Pages-Lauf später doch ‚success‘: los --nur-app`;
    throw e;
  }
  for (const [i, a] of apps.entries()) {
    const Y = appVersion(a), F = appFassung(a);
    try {
      ergebnis.push(await veroeffentliche(a.dir, `${a.titel} ${Y}`, appBranches[i], show => {
        const h = show('index.html');
        if (!h.includes(`const APP_VERSION = '${Y}'`) || !h.includes(`const AD_NEEDED = '${F}'`)) abbruch(`${a.titel}: main enthält nicht ${Y} mit Fassung ${F}`);
      }));
    } catch (e) {
      // APD-5/E-8: dank fester Fassung kein Schaden – die App lädt weiter ihre alte Fassung.
      if (e instanceof Abbruch && !nurApp) e.message += `\n  AppDesign ${X} ist online; die App lädt weiter ihre bisherige Fassung. Nach der Behebung: node werkzeug/veroeffentlichen.mjs los --nur-app --app ${a.name}`;
      throw e;
    }
  }
  console.log('\n✓ Fertig – alle Pages-Läufe ‚success‘, main enthält die neuen Versionen:');
  for (const r of ergebnis) console.log(`  ${r.name}: Commit ${r.sha.slice(0, 7)}, Pages ${r.pages} s, zusammen ${r.dauer} s`);
  console.log('  Die echte Seite (github.io) prüft der Nutzer mit /0 ‚Version prüfen‘ (APD-5/E-9).');
  aeltereFassungen(X);
}

try {
  if (befehl === 'vorbereiten') vorbereiten();
  else if (befehl === 'fassung') { legeFassungAn(); const f = checkFassungen(AD); if (f.length) abbruch(f.join('\n')); }
  else if (befehl === 'los') await los();
  else abbruch('Aufruf: node werkzeug/veroeffentlichen.mjs vorbereiten --ad X.Y.Z --app name=X.Y.Z | fassung | los [--app name] [--nur-app]');
} catch (e) {
  if (!(e instanceof Abbruch)) throw e;
  console.log(`✗ Abbruch: ${e.message}`); process.exit(1);
}
