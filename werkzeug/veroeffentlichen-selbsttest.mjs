// AppDesign 4.14.1 · Selbsttest des Veröffentlichungs-Skripts (APD-5 Testfall-Liste Teil E und APD-5/D-4) in Kopien der Repos
// AppDesign und Reiselogbuch, mit lokalen Schein-Remotes (kein echter Push) und nachgebildetem Pages-Lauf.
// Aufruf in AppDesign: node werkzeug/veroeffentlichen-selbsttest.mjs (AppDesign und ReiseLogBuch liegen nebeneinander).
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const QUELLE = fileURLToPath(new URL('../../', import.meta.url)), TMP = mkdtempSync(join(tmpdir(), 'veroeff-'));
let r;   // letzte Ausgabe des Skripts – bei einem roten Fall mit ausgegeben
const fehler = [], pruefe = (ok, t) => { console.log(`${ok ? '✓' : '✗'} ${t}`); if (!ok) { fehler.push(t); console.log((r?.text || '').trim().split('\n').slice(-6).map(l => '    | ' + l).join('\n')); } };
const git = (dir, ...a) => execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const lies = (dir, f) => readFileSync(join(dir, f), 'utf8');
const schreibe = (dir, f, t) => writeFileSync(join(dir, f), t);
const ersetze = (dir, f, a, b) => schreibe(dir, f, lies(dir, f).replace(a, b));
let nr = 0;

// Kopie beider Repos (Arbeitsstand, ohne Bilder und node_modules) mit Schein-Remote, auf einem Vorbereitungs-Zweig.
function kopie() {
  const wurzel = join(TMP, String(++nr)), dirs = {};
  for (const repo of ['AppDesign', 'ReiseLogBuch']) {
    const von = join(QUELLE, repo), nach = join(wurzel, repo), origin = join(wurzel, 'origin', repo + '.git');
    for (const f of git(von, 'ls-files', '-z', '-co', '--exclude-standard').split('\0').filter(f => f && !f.startsWith('apple-referenz/'))) {
      mkdirSync(dirname(join(nach, f)), { recursive: true }); copyFileSync(join(von, f), join(nach, f));
    }
    execFileSync('git', ['init', '-q', '--bare', '-b', 'main', origin]);
    git(nach, 'init', '-q', '-b', 'main'); git(nach, 'config', 'user.email', 'test@example.com'); git(nach, 'config', 'user.name', 'Selbsttest');
    git(nach, 'add', '-A'); git(nach, 'commit', '-qm', 'Ausgangsstand'); git(nach, 'remote', 'add', 'origin', origin); git(nach, 'push', '-q', 'origin', 'main');
    git(nach, 'checkout', '-q', '-b', 'vorbereitung-test');
    dirs[repo] = nach;
  }
  return { ad: dirs.AppDesign, app: dirs.ReiseLogBuch };
}
const skript = (k, env, ...a) => {
  const r = spawnSync(process.execPath, [join(k.ad, 'werkzeug/veroeffentlichen.mjs'), ...a, '--ad-dir', k.ad], { encoding: 'utf8',
    env: { ...process.env, VEROEFF_WARTE_MS: '1', VEROEFF_PAGES: 'success', ...env } });
  return { code: r.status, text: r.stdout + r.stderr };
};
const remote = (k, repo, ref = 'main') => git(k[repo], 'ls-remote', 'origin', ref);
const commitAlle = (k, t) => { for (const d of [k.ad, k.app]) { git(d, 'add', '-A'); git(d, 'commit', '-qm', t, '--allow-empty'); } };
// Texte, die Claude zwischen ‚vorbereiten‘ und ‚los‘ schreibt; Prüfungen der App nachgebildet (SCHEIN_ROT=1 → rot).
function texte(k, X, Y) {
  ersetze(k.ad, 'CHANGELOG.md', /\n## /, `\n## ${X} – 01.01.2030 (Neben)\n\nSelbsttest\n\n## `);
  ersetze(k.app, 'CHANGELOG.md', /\n## /, `\n## ${Y} – 01.01.2030 (Neben)\n\nTestfälle P-99\n\n**P-99/0 – Version prüfen**\n1. Versionszeile ansehen. Erwartet: Reiselogbuch ${Y} · AppDesign ${X}\n\n## `);
  schreibe(k.app, 'tests/alle.mjs', 'process.exit(+(process.env.SCHEIN_ROT || 0));\n');
}
const X0 = lies(join(QUELLE, 'AppDesign'), 'v4/ui.js').match(/const AD_VERSION = '([\d.]+)'/)[1];
const Y0 = lies(join(QUELLE, 'ReiseLogBuch'), 'index.html').match(/const APP_VERSION = '([\d.]+)'/)[1];
const hoch = v => v.replace(/^(\d+)\.(\d+)\.\d+$/, (_, a, b) => `${a}.${+b + 1}.0`);
const X = hoch(X0), Y = hoch(Y0);

try {
  // ——— Kopie 1: APD-5/D-4 und APD-5/E-2 (Fassung gibt es schon) ———
  let k = kopie();
  r = skript(k, {}, 'vorbereiten', '--ad', X);
  pruefe(r.code === 0 && new RegExp(`Reiselogbuch nutzt die Fassung ${X0.replace(/\./g, '\\.')}`).test(r.text) && lies(k.app, 'index.html').includes(`AD_NEEDED = '${X0}'`),
    'APD-5/D-4 nur AppDesign erhöht: Skript nennt die App auf der älteren Fassung und hebt sie nicht');
  mkdirSync(join(k.ad, 'fassung', hoch(X)), { recursive: true }); schreibe(k.ad, `fassung/${hoch(X)}/ui.js`, '');
  const vorher = git(k.ad, 'status', '--porcelain');
  r = skript(k, {}, 'vorbereiten', '--ad', hoch(X));
  pruefe(r.code === 1 && /gibt es schon/.test(r.text) && git(k.ad, 'status', '--porcelain') === vorher, 'APD-5/E-2 Fassung gibt es schon → Abbruch, nichts geändert');

  // ——— Kopie 2: APD-5/E-1, APD-5/E-2, APD-5/E-3, APD-5/E-4, APD-5/E-6 (hängt), APD-5/E-8 (--nur-app), APD-5/E-7 ———
  k = kopie(); const adStart = remote(k, 'ad');
  r = skript(k, {}, 'vorbereiten', '--ad', X, '--app', `reiselogbuch=${Y}`);
  pruefe(r.code === 0, `APD-5/E-1 vorbereiten --ad ${X} --app reiselogbuch=${Y} läuft durch`);
  const { checkVersions } = await import(pathToFileURL(join(k.ad, 'tests/version.mjs')));
  const { checkDocs, checkCollab } = await import(pathToFileURL(join(k.ad, 'tests/doku.mjs')));
  const appUrl = pathToFileURL(k.app + '/');
  const v = await checkVersions(appUrl);
  pruefe(!v.length, `APD-5/E-1 danach version.mjs grün${v.length ? ': ' + v.join(' | ') : ''}`);
  // CHANGELOG und Testfälle schreibt Claude erst nach ‚vorbereiten‘ – nur diese Meldungen sind hier erlaubt.
  const d = [...checkDocs(appUrl, 'Reiselogbuch'), ...checkCollab(appUrl, 'Reiselogbuch')].filter(e => !/CHANGELOG/.test(e));
  pruefe(!d.length, `APD-5/E-1 danach doku.mjs grün (außer CHANGELOG)${d.length ? ': ' + d.join(' | ') : ''}`);
  pruefe(lies(k.app, 'index.html').includes(`../AppDesign/fassung/${X}/ui.js"`) && lies(k.app, 'tests/hig.mjs').includes(`AppDesign/fassung/${X}/tests/`) &&
    lies(k.app, 'README.md').includes(`AppDesign/blob/main/fassung/${X}/README%20-%20Designrichtlinie%20allgemein.md`) && !/blob\/v\d/.test(lies(k.app, 'README.md')) &&
    lies(k.ad, `fassung/${X}/README - Zusammenarbeit allgemein.md`).length > 0,
    'APD-5/E-1 App lädt die Fassung, Prüfskripte binden ihre Prüfungen ein, README verlinkt den Richtlinien-Text der Fassung (APD-5/D-2, APD-5/D-6)');
  const stand = git(k.app, 'status', '--porcelain');
  r = skript(k, {}, 'vorbereiten', '--ad', X, '--app', `reiselogbuch=${Y}`);
  pruefe(r.code === 1 && /nicht höher/.test(r.text) && git(k.app, 'status', '--porcelain') === stand, 'APD-5/E-2 Version nicht höher → Abbruch, nichts geändert');
  r = skript(k, {}, 'los');
  pruefe(r.code === 1 && /offene Änderungen/.test(r.text), 'APD-5/E-3 offene Änderungen ohne Commit → Abbruch');
  commitAlle(k, 'Versionen');
  r = skript(k, {}, 'los');
  pruefe(r.code === 1 && /CHANGELOG/.test(r.text), 'APD-5/E-3 CHANGELOG-Eintrag fehlt → Abbruch');
  texte(k, X, Y); commitAlle(k, 'Texte');
  git(k.app, 'checkout', '-q', 'main'); git(k.app, 'merge', '-q', '--ff-only', 'vorbereitung-test');   // vorbereitet, aber auf main
  r = skript(k, {}, 'los');
  pruefe(r.code === 1 && /Reiselogbuch: steht auf main/.test(r.text) && remote(k, 'ad') === adStart, 'APD-5/E-3 falscher Zweig (main) → Abbruch vor dem Push');
  git(k.app, 'checkout', '-q', 'vorbereitung-test'); git(k.app, 'branch', '-f', 'main', 'origin/main');
  ersetze(k.ad, 'v4/ui.js', /$/, '\n// nachträglich geändert\n'); commitAlle(k, 'v4 geändert');
  r = skript(k, {}, 'los');
  pruefe(r.code === 1 && /weicht von fassung/.test(r.text), 'APD-5/E-3 v4/ nach dem Anlegen der Fassung geändert → Abbruch (APD-5/D-5)');
  r = skript(k, {}, 'fassung'); commitAlle(k, 'Fassung neu');
  pruefe(r.code === 0, 'Fassung neu angelegt (vor dem Veröffentlichen erlaubt)');
  const mainVorher = [remote(k, 'ad'), remote(k, 'app')].join();
  r = skript(k, { SCHEIN_ROT: '1' }, 'los');
  pruefe(r.code === 1 && /rot – nichts veröffentlicht/.test(r.text) && [remote(k, 'ad'), remote(k, 'app')].join() === mainVorher, 'APD-5/E-4 eine Prüfung rot → Abbruch, nichts veröffentlicht');
  r = skript(k, { VEROEFF_PAGES: 'haengt', VEROEFF_PAGES_MAX_S: '1' }, 'los');
  pruefe(r.code === 1 && /nicht fertig/.test(r.text) && /--nur-app/.test(r.text) && remote(k, 'app') === mainVorher.split(',')[1],
    'APD-5/E-6 Pages-Lauf von AppDesign hängt → Abbruch nach der Zeitgrenze, App unverändert, Hinweis ‚--nur-app‘');
  pruefe(git(k.ad, 'show', `origin/main:fassung/${X}/ui.js`).includes(`'${X}'`) && git(k.ad, 'show', 'origin/main:v4/ui.js').includes(`'${X}'`) &&
    git(k.ad, 'log', '-1', '--format=%P', 'origin/main').split(' ').length === 2 && !git(k.ad, 'ls-remote', '--tags', 'origin'),
    'APD-5/E-5 AppDesign mit Fassung --no-ff auf main, ohne Markierung (Schein-Remote)');
  r = skript(k, {}, 'los');
  pruefe(r.code === 1 && /schon veröffentlicht/.test(r.text), 'APD-5/E-2 AppDesign schon veröffentlicht → los ohne --nur-app bricht ab');
  r = skript(k, {}, 'los', '--nur-app');
  pruefe(r.code === 0 && /Fertig/.test(r.text) && git(k.app, 'show', 'origin/main:index.html').includes(`APP_VERSION = '${Y}'`) &&
    git(k.app, 'log', '-1', '--format=%P', 'origin/main').split(' ').length === 2, 'APD-5/E-7/E-8 los --nur-app: App mit --no-ff auf main, ‚Fertig‘ mit Zusammenfassung');

  // ——— Kopie 3: APD-5/E-6 (failure bei AppDesign) ———
  k = kopie();
  skript(k, {}, 'vorbereiten', '--ad', X, '--app', `reiselogbuch=${Y}`); texte(k, X, Y); commitAlle(k, 'bereit');
  const appVorher = remote(k, 'app');
  r = skript(k, { VEROEFF_PAGES: 'failure' }, 'los');
  pruefe(r.code === 1 && /failure/.test(r.text) && remote(k, 'app') === appVorher, 'APD-5/E-6 Pages-Lauf von AppDesign ‚failure‘ → Abbruch, App unverändert');

  // ——— Kopie 4: APD-5/E-7 alles grün in einem Lauf, APD-5/E-8 App scheitert ———
  k = kopie();
  skript(k, {}, 'vorbereiten', '--ad', X, '--app', `reiselogbuch=${Y}`); texte(k, X, Y); commitAlle(k, 'bereit');
  r = skript(k, { VEROEFF_PAGES: 'success,failure' }, 'los');
  pruefe(r.code === 1 && /lädt weiter ihre bisherige Fassung/.test(r.text) && /los --nur-app/.test(r.text), 'APD-5/E-8 AppDesign online, App scheitert → Hinweis, die App lädt weiter ihre alte Fassung');
  k = kopie();
  skript(k, {}, 'vorbereiten', '--ad', X, '--app', `reiselogbuch=${Y}`); texte(k, X, Y); commitAlle(k, 'bereit');
  r = skript(k, {}, 'los');
  pruefe(r.code === 0 && new RegExp(`AppDesign ${X.replace(/\./g, '\\.')}: Commit`).test(r.text) && new RegExp(`Reiselogbuch ${Y.replace(/\./g, '\\.')}: Commit`).test(r.text) &&
    r.text.indexOf(`✓ AppDesign ${X}: `) < r.text.indexOf(`✓ Reiselogbuch ${Y}: `) && r.text.indexOf(`✓ AppDesign ${X}: `) >= 0, 'APD-5/E-7 los: erst AppDesign, dann die App, ‚Fertig‘ mit Versionen, Commits und Pages-Läufen');
} finally { rmSync(TMP, { recursive: true, force: true }); }

console.log(fehler.length ? `\n✗ ${fehler.length} Fälle rot` : '\n✓ Selbsttest Veröffentlichungs-Skript: alle Fälle grün');
process.exit(fehler.length ? 1 : 0);
