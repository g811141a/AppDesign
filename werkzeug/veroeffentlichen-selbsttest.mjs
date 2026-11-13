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
  // seit 4.42.0 (APD-85/W-11): SCHEIN_WACKELT=1 → ein Wackler in tests/out/wackelt.json
  // seit 4.47.0 (APD-102): tests/out/geprueft = geprüfter Stand (Baum von HEAD); SCHEIN_MAIN_NEU=[origin, datei, inhalt] → während des
  // Prüflaufs kommt ein neuer Commit auf main dieses Remotes (APD-102/M-5, M-6)
  schreibe(k.app, 'tests/alle.mjs', `import { mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
mkdirSync('tests/out', { recursive: true });
writeFileSync('tests/out/wackelt.json', JSON.stringify(process.env.SCHEIN_WACKELT ? ['ablauf-blatt · webkit'] : []));
writeFileSync('tests/out/geprueft', execFileSync('git', ['rev-parse', 'HEAD^{tree}'], { encoding: 'utf8' }).trim());
if (process.env.SCHEIN_MAIN_NEU) { const [origin, datei, inhalt] = JSON.parse(process.env.SCHEIN_MAIN_NEU), d = mkdtempSync(join(tmpdir(), 'main-neu-'));
  const g = (...a) => execFileSync('git', ['-C', d, ...a], { stdio: 'ignore' });
  execFileSync('git', ['clone', '-q', origin, d], { stdio: 'ignore' }); g('config', 'user.email', 'test@example.com'); g('config', 'user.name', 'Selbsttest');
  writeFileSync(join(d, datei), inhalt); g('add', '-A'); g('commit', '-qm', 'main während des Prüflaufs'); g('push', '-q', 'origin', 'HEAD:main'); }
process.exit(+(process.env.SCHEIN_ROT || 0));
`);
}
// APD-102: ein neuer Commit auf main des Remotes (wie eine Übergabe aus einer anderen Sitzung), der Vorbereitungs-Zweig bleibt ausgecheckt
const originVon = (k, repo) => git(k[repo], 'remote', 'get-url', 'origin');
function mainNeu(k, repo, datei, inhalt) {
  const d = join(TMP, `neu-${++nr}`);
  execFileSync('git', ['clone', '-q', originVon(k, repo), d]); git(d, 'config', 'user.email', 'test@example.com'); git(d, 'config', 'user.name', 'Selbsttest');
  schreibe(d, datei, inhalt); git(d, 'add', '-A'); git(d, 'commit', '-qm', `main neuer: ${datei}`); git(d, 'push', '-q', 'origin', 'HEAD:main');
  return git(d, 'rev-parse', 'HEAD');
}
const geprueft = k => { try { return lies(k.app, 'tests/out/geprueft').trim(); } catch { return ''; } };
const istIn = (dir, sha, ref) => { try { git(dir, 'merge-base', '--is-ancestor', sha, ref); return true; } catch { return false; } };
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
  r = skript(k, { SCHEIN_WACKELT: '1' }, 'los');
  pruefe(r.code === 0 && /⚠ 1 Prüfung wackelt \(rot unter Last, allein grün – APD-85\): Reiselogbuch: ablauf-blatt · webkit/.test(r.text), 'APD-85/W-11 Wackler in der Zusammenfassung, Version trotzdem veröffentlicht');
  pruefe(r.code === 0 && new RegExp(`AppDesign ${X.replace(/\./g, '\\.')}: Commit`).test(r.text) && new RegExp(`Reiselogbuch ${Y.replace(/\./g, '\\.')}: Commit`).test(r.text) &&
    r.text.indexOf(`✓ AppDesign ${X}: `) < r.text.indexOf(`✓ Reiselogbuch ${Y}: `) && r.text.indexOf(`✓ AppDesign ${X}: `) >= 0, 'APD-5/E-7 los: erst AppDesign, dann die App, ‚Fertig‘ mit Versionen, Commits und Pages-Läufen');
  pruefe(r.code === 0 && !/main ist neuer/.test(r.text) && !/main hat sich während/.test(r.text), 'APD-102/M-1 main nicht neuer: kein Zusammenführen vor dem Prüflauf, kein Hinweis');

  // ——— APD-102: main ist neuer als der Vorbereitungs-Zweig (M-2 bis M-7) und Gegenprobe (M-8) ———
  const bereit = () => { const k = kopie(); skript(k, {}, 'vorbereiten', '--ad', X, '--app', `reiselogbuch=${Y}`); texte(k, X, Y); commitAlle(k, 'bereit'); return k; };
  // M-2 (und M-8): AppDesign-main neuer ohne Konflikt – neue UEBERGABE.md
  const m2 = (env = {}) => {
    const k = bereit(), neu = mainNeu(k, 'ad', 'UEBERGABE.md', '# Übergabe aus einer anderen Sitzung\n');
    r = skript(k, env, 'los');
    const t = r.text, vor = t.indexOf('main ist neuer – in den Zweig zusammengeführt'), pr = t.indexOf('— Prüfung');
    return r.code === 0 && vor >= 0 && pr > vor && istIn(k.ad, neu, 'vorbereitung-test') && istIn(k.ad, neu, 'origin/main') && istIn(k.ad, 'vorbereitung-test', 'origin/main') &&
      git(k.ad, 'rev-parse', 'origin/main^{tree}') === git(k.ad, 'rev-parse', 'vorbereitung-test^{tree}') && !/main hat sich während/.test(t);
  };
  pruefe(m2(), 'APD-102/M-2 AppDesign-main neuer ohne Konflikt: vor dem Prüflauf in den Zweig zusammengeführt, veröffentlicht genau der geprüfte Stand, main enthält beides');
  // M-3 (und M-8): AppDesign-main neuer mit Konflikt (dieselbe Datei in beiden geändert, wie Sitzung 0062)
  const m3 = (env = {}) => {
    const k = bereit(); schreibe(k.ad, 'UEBERGABE.md', '# Übergabe im Zweig\n'); commitAlle(k, 'Übergabe im Zweig');
    const kopf = git(k.ad, 'rev-parse', 'HEAD'), ad0 = remote(k, 'ad'), app0 = remote(k, 'app');
    mainNeu(k, 'ad', 'UEBERGABE.md', '# Übergabe auf main\n');
    r = skript(k, env, 'los');
    return r.code === 1 && /main ist neuer als vorbereitung-test und lässt sich nicht konfliktfrei zusammenführen – UEBERGABE\.md/.test(r.text) && /Von Hand zusammenführen/.test(r.text) &&
      !/— Prüfung/.test(r.text) && !geprueft(k) && git(k.ad, 'rev-parse', 'HEAD') === kopf && !git(k.ad, 'status', '--porcelain') &&
      git(k.ad, 'rev-parse', '--abbrev-ref', 'HEAD') === 'vorbereitung-test' && remote(k, 'app') === app0 && remote(k, 'ad') !== ad0;
  };
  pruefe(m3(), 'APD-102/M-3 AppDesign-main neuer mit Konflikt: Abbruch vor dem Prüflauf, Meldung mit Datei und Weg, Zweig und Arbeitsordner unverändert, nichts gepusht');
  // M-4: dasselbe im Repo der App – ohne Konflikt zusammengeführt; mit Konflikt Abbruch vor allem, AppDesign nicht veröffentlicht
  k = bereit(); let neu = mainNeu(k, 'app', 'BACKLOG-NOTIZ.md', 'neu auf main\n');
  r = skript(k, {}, 'los');
  pruefe(r.code === 0 && /Reiselogbuch: main ist neuer – in den Zweig zusammengeführt/.test(r.text) && r.text.indexOf('Reiselogbuch: main ist neuer') < r.text.indexOf('— Prüfung') &&
    istIn(k.app, neu, 'origin/main') && geprueft(k) === git(k.app, 'rev-parse', 'origin/main^{tree}'), 'APD-102/M-4 App-main neuer ohne Konflikt: zusammengeführt, geprüft und veröffentlicht derselbe Stand');
  k = bereit(); schreibe(k.app, 'BACKLOG.md', lies(k.app, 'BACKLOG.md') + '\nZweig\n'); commitAlle(k, 'Backlog im Zweig');
  { const ad0 = remote(k, 'ad'), kopf = git(k.app, 'rev-parse', 'HEAD');
    mainNeu(k, 'app', 'BACKLOG.md', lies(k.app, 'BACKLOG.md').replace(/\nZweig\n$/, '\nmain\n'));
    r = skript(k, {}, 'los');
    pruefe(r.code === 1 && /Reiselogbuch: main ist neuer .* – BACKLOG\.md/.test(r.text) && !/— Prüfung/.test(r.text) && remote(k, 'ad') === ad0 &&
      git(k.app, 'rev-parse', 'HEAD') === kopf && !git(k.app, 'status', '--porcelain'), 'APD-102/M-4 App-main neuer mit Konflikt: Abbruch vor allem, AppDesign nicht veröffentlicht, Zweig der App unverändert'); }
  // M-5: main ändert sich während des Prüflaufs noch einmal (ohne Konflikt) – zusammengeführt beim Veröffentlichen, Hinweis im Ergebnis
  k = bereit();
  r = skript(k, { SCHEIN_MAIN_NEU: JSON.stringify([originVon(k, 'ad'), 'UEBERGABE.md', '# während des Prüflaufs\n']) }, 'los');
  pruefe(r.code === 0 && /⚠ AppDesign .*main hat sich während des Prüflaufs geändert – zusammengeführt ohne neue Prüfung/.test(r.text) &&
    git(k.ad, 'show', 'origin/main:UEBERGABE.md') === '# während des Prüflaufs', 'APD-102/M-5 main während des Prüflaufs geändert: beim Veröffentlichen zusammengeführt, Hinweis im Ergebnis');
  // M-6: wie M-5, mit Konflikt – Abbruch ohne Push, Meldung mit Datei und Weg
  k = bereit(); schreibe(k.ad, 'UEBERGABE.md', '# Übergabe im Zweig\n'); commitAlle(k, 'Übergabe im Zweig');
  { const ad0 = git(k.ad, 'ls-remote', 'origin', 'main');
    r = skript(k, { SCHEIN_MAIN_NEU: JSON.stringify([originVon(k, 'ad'), 'UEBERGABE.md', '# während des Prüflaufs\n']) }, 'los');
    const nachher = git(k.ad, 'ls-remote', 'origin', 'main');
    pruefe(r.code === 1 && /AppDesign .*: main hat sich während des Prüflaufs geändert und lässt sich nicht konfliktfrei zusammenführen – UEBERGABE\.md/.test(r.text) && /Nichts gepusht/.test(r.text) &&
      nachher !== ad0 && git(k.ad, 'show', 'origin/main:UEBERGABE.md') === '# während des Prüflaufs' && git(k.ad, 'rev-parse', '--abbrev-ref', 'HEAD') === 'vorbereitung-test' && !git(k.ad, 'status', '--porcelain'),
      'APD-102/M-6 main während des Prüflaufs geändert mit Konflikt: Abbruch ohne Push, Meldung mit Datei und Weg, zurück auf dem Zweig'); }
  // M-7: git fetch scheitert zuerst – Wiederholung
  k = bereit();
  r = skript(k, { VEROEFF_FETCH_FEHLT: '2' }, 'los');
  pruefe(r.code === 0 && /git fetch gescheitert – neuer Versuch/.test(r.text) && /Fertig/.test(r.text), 'APD-102/M-7 git fetch scheitert zuerst: Wiederholung, danach veröffentlicht');
  // M-8: Gegenprobe – ohne Zusammenführen vor dem Prüflauf werden M-2 und M-3 rot
  pruefe(!m2({ VEROEFF_OHNE_VORHER: '1' }) && !m3({ VEROEFF_OHNE_VORHER: '1' }), 'APD-102/M-8 Gegenprobe: ohne Zusammenführen vor dem Prüflauf sind M-2 und M-3 rot');
  // ——— APD-128 (seit 4.58.0): Prüfstufe Text oder voll – Testfall-Liste arbeit/APD-128 Testfall-Liste.md ———
  {
    const { bewerte, GRUNDPRUEFUNGEN } = await import(pathToFileURL(join(QUELLE, 'AppDesign/werkzeug/pruefstufe.mjs')));
    const RLB = join(QUELLE, 'ReiseLogBuch'), H = lies(RLB, 'index.html'), SW = lies(RLB, 'sw.js'), GES = lies(RLB, 'tests/ablauf-gesamt.mjs');
    const NAMEN = ['doku-regeln', 'version-regeln', 'text-regeln', 'ablauf-gesamt', 'hig', 'link-name', 'ablauf-abgleich', 'regeln-ablauf', 'ablauf-texte-ablaeufe', 'ablauf-blatt', 'start-regeln'];
    const PR = Object.fromEntries(NAMEN.map(n => [n, lies(RLB, `tests/${n}.mjs`)]));
    const LABEL = "label: 'PDF (mit iOS 27 zurzeit nicht möglich)'", KOMMENTAR = /\n *\/\/ seit 3\.55\.1 \(RLB-124\/W-1\)[^\n]*/;
    const ersetzt = (t, a, b) => { if (!(a instanceof RegExp ? a.test(t) : t.includes(a))) throw new Error(`Anker fehlt: ${a}`); return t.replace(a, b); };
    const versionHoch = t => t.replace(/const APP_VERSION = '[^']*';/, "const APP_VERSION = '9.9.9';").replace(/const APP_BUILT = '[^']*';/, "const APP_BUILT = '01.01.2030 um 10:00';");
    const md = { f: 'CHANGELOG.md', alt: '# alt\n', neu: '# neu\n' }, sw = { f: 'sw.js', alt: SW, neu: SW.replace(/const CACHE = 'reiselogbuch-[\d.]+';/, "const CACHE = 'reiselogbuch-9.9.9';") };
    const html = (alt, neu = alt) => ({ f: 'index.html', alt, neu: versionHoch(neu) });
    const B = (aen, o = {}) => bewerte({ aenderungen: aen, pruefungen: PR, cache: 'reiselogbuch', ...o });
    const istVoll = (e, re) => e.stufe === 'voll' && (!re || e.gruende.some(g => re.test(g)));
    let e;
    // M-1: Nachbau 3.55.1 ohne Kommentarzeile
    const altPdf = ersetzt(H, LABEL, "label: 'PDF'"), gesAlt = ersetzt(GES, "'PDF (mit iOS 27 zurzeit nicht möglich)'", "'PDF'");
    e = B([html(altPdf, H), sw, md, { f: 'tests/ablauf-gesamt.mjs', alt: gesAlt, neu: GES }]);
    pruefe(e.stufe === 'text' && GRUNDPRUEFUNGEN.every(p => e.pruefungen.includes(p)) && e.pruefungen.includes('ablauf-gesamt') && !e.pruefungen.includes('hig') &&
      e.pruefungen.includes('link-name') && !e.pruefungen.includes('start-regeln'), `APD-128/M-1 Menütext ‚PDF‘ → ‚PDF (mit iOS 27 …)‘: Stufe Text, Grundprüfungen + Texttreffer + geänderte Prüfdatei, ohne hig (${e.stufe}: ${e.pruefungen.join(', ') || e.gruende.join(' · ')})`);
    // M-2: nur Doku und Versionsstellen
    e = B([html(H), sw, md]);
    pruefe(e.stufe === 'text' && e.pruefungen.join() === GRUNDPRUEFUNGEN.join(), `APD-128/M-2 nur Doku und Versionsstellen: Stufe Text, nur die drei Grundprüfungen (${e.pruefungen.join(', ')})`);
    // M-3: das echte 3.55.1 – Text und eine neue Kommentarzeile (V-4)
    e = B([html(ersetzt(altPdf, KOMMENTAR, ''), H), sw, md]);
    pruefe(e.stufe === 'text', `APD-128/M-3 Text und neue Kommentarzeile: Stufe Text (V-4) (${e.gruende.join(' · ')})`);
    // M-4: Textteil einer Vorlage `…${n}…`
    e = B([html(H, ersetzt(H, '${count} erfasste${', '${count} gezählte${'))]);
    pruefe(e.stufe === 'text', `APD-128/M-4 Textteil einer Vorlage geändert: Stufe Text (${e.gruende.join(' · ')})`);
    // M-5: Ausdruck in ${…}
    const m5 = [html(H, ersetzt(H, '${count} erfasste${', '${count + 1} erfasste${'))];
    e = B(m5); pruefe(istVoll(e, /Code geändert/), `APD-128/M-5 Ausdruck in \${…} geändert: voll – Code geändert (${e.gruende.join(' · ')})`);
    // M-6: Zahl bzw. Vergleich – mit Zeile
    const z6 = H.split('\n').findIndex(l => l.includes('erfasste${count === 1')) + 1, m6 = [html(H, ersetzt(H, 'erfasste${count === 1', 'erfasste${count === 2'))];
    e = B(m6); pruefe(istVoll(e, new RegExp(`index\\.html Zeile ${z6}: Code geändert`)), `APD-128/M-6 Vergleich geändert: voll – ‚index.html Zeile ${z6}: Code geändert‘ (${e.gruende.join(' · ')})`);
    // M-7: HTML bzw. CSS in einer Zeichenkette
    const css = H.indexOf('const OUTPUT_CSS'), cssNeu = H.slice(0, css) + H.slice(css).replace(/(\d+)px/, (_, n) => `${+n + 1}px`);
    const e7a = B([html(H, ersetzt(H, "sub: 'Im Drucken-Menü Teilen,", "sub: 'Im Drucken-Menü <b>Teilen</b>,"))]), e7b = B([html(H, cssNeu)]);
    pruefe(istVoll(e7a, /kein Text/) && istVoll(e7b), `APD-128/M-7 HTML bzw. CSS in einer Zeichenkette: voll (${e7a.gruende.join(' · ')} | ${e7b.gruende.join(' · ')})`);
    // M-8: Schlüssel, Ereignis, Klasse
    const e8 = [B([html(H, ersetzt(H, "'reiselogbuch.v1'", "'reiselogbuch.v2'"))]), B([html(H, ersetzt(H, "ok.addEventListener('click'", "ok.addEventListener('pointerdown'"))]),
      B([{ f: 'index.html', alt: "<script>el.className = 'mi on';</script>", neu: "<script>el.className = 'mi off';</script>" }])];
    pruefe(e8.every(x => istVoll(x, /kein Text/)), `APD-128/M-8 Schlüssel, Ereignis, Klasse: je voll (${e8.map(x => x.stufe).join(', ')})`);
    // M-9: <style>
    const st = H.indexOf('<style>'), m9 = [html(H, H.slice(0, st) + H.slice(st).replace(/gap: 2px 14px/, 'gap: 3px 14px'))];
    e = B(m9); pruefe(istVoll(e, /<style> geändert/), `APD-128/M-9 Änderung in <style>: voll (${e.gruende.join(' · ')})`);
    // M-10: manifest.json bzw. Icon
    const e10 = [B([{ f: 'manifest.json', alt: '{}', neu: '{ }' }]), B([{ f: 'icon-180.png', alt: 'a', neu: 'b' }])];
    pruefe(istVoll(e10[0], /manifest\.json geändert/) && istVoll(e10[1], /icon-180\.png geändert/), 'APD-128/M-10 manifest.json bzw. Icon geändert: voll, Datei genannt');
    // M-11: AppDesign geändert
    const e11 = [B([html(H, H.replace(/const AD_NEEDED = '[\d.]+';/, "const AD_NEEDED = '9.9.9';"))]), B([html(H), md], { adOnline: false })];
    pruefe(e11.every(x => istVoll(x, /AppDesign geändert/)), `APD-128/M-11 AD_NEEDED geändert bzw. AppDesign vorbereitet: voll – ‚AppDesign geändert‘ (${e11.map(x => x.gruende.join(' · ')).join(' | ')})`);
    // M-12: sw.js außerhalb von CACHE
    e = B([{ f: 'sw.js', alt: SW, neu: SW.replace("'manifest.json',", "'manifest.json', 'neu.png',") }]);
    pruefe(istVoll(e, /sw\.js außerhalb von CACHE/), `APD-128/M-12 sw.js außerhalb von CACHE: voll (${e.gruende.join(' · ')})`);
    // M-13: vorige Version mit Stufe Text
    e = B([html(H), md], { vorigeText: true });
    pruefe(istVoll(e, /vorige Version mit Stufe Text/), 'APD-128/M-13 vorige Version mit Stufe Text: voll (D-4)');
    // M-18: \', URL mit //, Regex mit Anführungszeichen, Kommentar
    const S = "<script>\nconst a = 'Geht\\'s Los'; // alt\nx('https://a.b/c', 1);\ns.replace(/'/g, 'Ä');\ny = 2;\n</script>";
    const e18 = { text: B([{ f: 'index.html', alt: S, neu: S.replace("'Geht\\'s Los'", "'Geht\\'s weiter Los'") }]), kommentar: B([{ f: 'index.html', alt: S, neu: S.replace('// alt', '// neu Text') }]),
      url: B([{ f: 'index.html', alt: S, neu: S.replace("'https://a.b/c', 1", "'https://a.b/c', 2") }]), regex: B([{ f: 'index.html', alt: S, neu: S.replace('y = 2', 'y = 3') }]) };
    pruefe(e18.text.stufe === 'text' && e18.kommentar.stufe === 'text' && istVoll(e18.url, /Zeile 3: Code/) && istVoll(e18.regex, /Zeile 5: Code/),
      `APD-128/M-18 \\', URL mit // und Regex mit ' richtig zerlegt (${Object.entries(e18).map(([k, x]) => `${k} ${x.stufe}`).join(', ')})`);
    // M-17: Gegenprobe – ohne Codevergleich werden M-5, M-6 und M-9 rot
    pruefe([m5, m6, m9].every(a => B(a, { ohneCode: true }).stufe === 'text'), 'APD-128/M-17 Gegenprobe: ohne Codevergleich wären M-5, M-6 und M-9 Stufe Text (rot)');

    // M-14 bis M-16 und M-13 in Kopien: die Prüfungen der App nachgebildet (tests/alle.mjs mit der echten Liste, schreibt die Aufrufparameter)
    const appBereit = (aendere) => {
      const k = kopie(), alle = lies(k.app, 'tests/alle.mjs');
      schreibe(k.app, 'tests/alle.mjs', "import { mkdirSync, writeFileSync } from 'node:fs';\n" + alle.replace(/^import .*$/gm, '').replace(/^process\.exit\(await lauf\(.*$/m,
        "mkdirSync('tests/out', { recursive: true }); writeFileSync('tests/out/argv', JSON.stringify(process.argv.slice(2))); writeFileSync('tests/out/wackelt.json', '[]');"));
      git(k.app, 'add', '-A'); git(k.app, 'commit', '-qm', 'Prüfungen nachgebildet'); git(k.app, 'push', '-q', 'origin', 'HEAD:main'); git(k.app, 'fetch', '-q', 'origin');
      skript(k, {}, 'vorbereiten', '--app', `reiselogbuch=${Y}`);
      ersetze(k.app, 'CHANGELOG.md', /\n## /, `\n## ${Y} – 01.01.2030 (Korrektur)\n\nTestfälle P-99\n\n**P-99/0 – Version prüfen**\n1. Versionszeile ansehen. Erwartet: Reiselogbuch ${Y} · AppDesign ${X0}\n\n## `);
      aendere(k); git(k.app, 'add', '-A'); git(k.app, 'commit', '-qm', 'bereit');
      return k;
    };
    const textAenderung = k => { ersetze(k.app, 'index.html', LABEL, "label: 'PDF (mit iOS 27 leider nicht möglich)'");
      ersetze(k.app, 'tests/ablauf-gesamt.mjs', "'PDF (mit iOS 27 zurzeit nicht möglich)'", "'PDF (mit iOS 27 leider nicht möglich)'"); };
    const argvVon = k => { try { return JSON.parse(lies(k.app, 'tests/out/argv')); } catch { return null; } };
    // M-14: Code geändert, trotzdem --stufe text → Abbruch vor dem Prüflauf
    k = appBereit(k => ersetze(k.app, 'index.html', 'erfasste${count === 1', 'erfasste${count === 2'));
    { const kopf = git(k.app, 'rev-parse', 'HEAD'), app0 = remote(k, 'app');
      r = skript(k, {}, 'los', '--nur-app', '--app', 'reiselogbuch', '--stufe', 'text');
      pruefe(r.code === 1 && /Stufe Text passt nicht – index\.html Zeile \d+: Code geändert/.test(r.text) && !/— Prüfungen/.test(r.text) && argvVon(k) === null &&
        git(k.app, 'rev-parse', 'HEAD') === kopf && remote(k, 'app') === app0, 'APD-128/M-14 los --stufe text bei Code-Änderung: Abbruch vor dem Prüflauf mit Grund, Zweig unverändert, nichts gepusht');
      r = skript(k, {}, 'los', '--app', 'reiselogbuch', '--stufe', 'text');
      pruefe(r.code === 1 && /--stufe text nur mit --nur-app/.test(r.text), 'APD-128/M-14 los --stufe text ohne --nur-app: Abbruch'); }
    // M-15 (und M-1 im echten Ablauf): stufe schlägt Text vor, los --stufe text prüft genau diese Liste und markiert den Merge-Commit
    k = appBereit(textAenderung);
    r = skript(k, {}, 'stufe', '--app', 'reiselogbuch');
    const liste = (r.text.match(/Vorschlag Stufe Text – \d+ Prüfungen: (.*)/) || [])[1]?.split(', ') || [];
    pruefe(r.code === 0 && liste.includes('ablauf-gesamt') && GRUNDPRUEFUNGEN.every(p => liste.includes(p)) && !liste.includes('hig'), `APD-128/M-15 stufe: ‚Vorschlag Stufe Text‘ mit Liste (${liste.join(', ')})`);
    r = skript(k, {}, 'los', '--nur-app', '--app', 'reiselogbuch', '--stufe', 'text');
    const av = argvVon(k) || [], subj = git(k.app, 'log', '-1', '--format=%s', 'origin/main');
    pruefe(r.code === 0 && av[0] === '--nur' && av[1] === liste.join(',') && subj.endsWith('(Prüfstufe Text)') && new RegExp(`Prüfstufe Text: ${liste.length} Prüfungen`).test(r.text) &&
      !/— Prüfung AppDesign/.test(r.text), `APD-128/M-15 los --stufe text: genau die Liste, ohne messung, Merge-Commit ‚${subj}‘`);
    // M-13 im echten Ablauf: die nächste Version schlägt voll vor
    skript(k, {}, 'vorbereiten', '--app', `reiselogbuch=${hoch(Y)}`);
    r = skript(k, {}, 'stufe', '--app', 'reiselogbuch');
    pruefe(/Vorschlag voll – Grund: vorige Version mit Stufe Text/.test(r.text), 'APD-128/M-13 nach einer Version mit Stufe Text schlägt stufe voll vor (Merge-Commit auf main)');
    // M-16: ohne --stufe voll wie bisher
    k = appBereit(textAenderung);
    r = skript(k, {}, 'los', '--nur-app', '--app', 'reiselogbuch');
    pruefe(r.code === 0 && (argvVon(k) || ['x']).length === 0 && !/Prüfstufe/.test(git(k.app, 'log', '-1', '--format=%s', 'origin/main')),
      'APD-128/M-16 los ohne --stufe: voll wie bisher, Merge-Commit ohne Zusatz');
  }
} finally { rmSync(TMP, { recursive: true, force: true }); }

console.log(fehler.length ? `\n✗ ${fehler.length} Fälle rot` : '\n✓ Selbsttest Veröffentlichungs-Skript: alle Fälle grün');
process.exit(fehler.length ? 1 : 0);
