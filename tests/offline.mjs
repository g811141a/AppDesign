// AppDesign 4.14.2 · Prüfung ‚Offline-Start‘ (Regel R-1.5, seit 4.14.2, Fund P-37/3: iPad startete offline mit weißer Seite).
// Startet einen eigenen Webserver über dem Ordner, in dem AppDesign und die App nebeneinander liegen, meldet den Service
// Worker der App an (die App selbst nur unter https) und bildet das Netz nach – Abbruch statt Antwort (‚aus‘, wie Flugmodus)
// oder keine Antwort (‚hängt‘, wie schlechtes WLAN). Je Ansicht:
//   1. ohne Netz neu öffnen → App erscheint (Inhalt und AppDesign-Fassung geladen)
//   2. ohne Netz unter anderer Adresse (index.html?…) → App erscheint
//   3. Netz hängt → App erscheint nach höchstens 3 s aus dem Speicher (Grenze mit Spielraum: 4,5 s)
// Einbinden im Prüfskript der App:
//   import { checkOffline } from '../../AppDesign/fassung/X.Y.Z/tests/offline.mjs';
//   const fehler = await checkOffline(new URL('..', import.meta.url), browser, { ansichten: { 'iPad quer': {…} } });
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { basename, join, extname } from 'node:path';

const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };

export async function checkOffline(appDir, browser, { ansichten, grenze = 4500 } = {}) {
  const errors = [], E = t => errors.push(`R-1.5 ${t}`), log = (...x) => process.env.PRUEF_LOG && console.error(new Date().toISOString().slice(14, 23), ...x);
  const wurzel = fileURLToPath(new URL('..', appDir)), repo = basename(fileURLToPath(appDir));
  let netz = 'an';
  const offen = new Set();
  const server = createServer(async (req, res) => {
    if (netz === 'aus') return req.socket.destroy();
    if (netz === 'haengt') { offen.add(res); return; }
    const pfad = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    try {
      const datei = join(wurzel, pfad.endsWith('/') ? pfad + 'index.html' : pfad);
      if (!datei.startsWith(wurzel)) throw new Error('außerhalb');
      res.writeHead(200, { 'content-type': TYP[extname(datei)] || 'application/octet-stream', 'cache-control': 'no-cache' }).end(await readFile(datei));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const basis = `http://127.0.0.1:${server.address().port}/${repo}/`;
  // Jede Abfrage höchstens 0,5 s: solange die Seite auf das Netz wartet, kehrt evaluate nicht zurück.
  const geladen = p => Promise.race([p.evaluate(() => !window.__alteSeite && document.body.innerText.trim().length > 0 && typeof AD_VERSION === 'string').catch(() => false), new Promise(r => setTimeout(() => r(false), 500))]);
  const wartet = async (p, ms) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await geladen(p)) return Date.now() - t0; await p.waitForTimeout(100); } return null; };
  try {
    for (const [name, a] of Object.entries(ansichten)) {
      netz = 'an';
      const c = await browser.newContext({ ...a, serviceWorkers: 'allow' }), p = await c.newPage();
      try {
        log(name, 'start'); await p.goto(basis); log(name, 'geladen');
        const sw = await p.evaluate(async () => {
          await navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' });
          await Promise.race([navigator.serviceWorker.ready, new Promise((_, x) => setTimeout(() => x(new Error('kein Service Worker nach 10 s')), 10000))]);
          return 'ok';
        }).catch(e => e.message);
        if (sw !== 'ok') { E(`${name}: ${sw}`); continue; }
        await p.reload(); await wartet(p, 3000);
        if (!(await p.evaluate(() => !!navigator.serviceWorker.controller))) { E(`${name}: Service Worker steuert die App nach dem Neuladen nicht`); continue; }
        for (const [fall, adresse, modus] of [['ohne Netz', basis, 'aus'], ['ohne Netz, andere Adresse (index.html?start=1)', basis + 'index.html?start=1', 'aus'], ['Netz hängt', basis, 'haengt']]) {
          netz = modus; log(name, fall, 'los');
          // Neu öffnen, ohne auf das Netz zu warten; die alte Seite ist markiert und zählt nicht (WebKit lässt sie stehen).
          await p.evaluate(u => { window.__alteSeite = true; location.href = u; }, adresse).catch(() => {});
          const ms = await wartet(p, modus === 'haengt' ? grenze : 6000);
          log(name, fall, ms);
          if (ms === null) E(`${name}: ${fall} – die App erscheint nicht${modus === 'haengt' ? ` innerhalb ${grenze / 1000} s` : ''} (weiße Seite)`);
          netz = 'an'; for (const r of offen) r.destroy?.(); offen.clear();
        }
      } finally { await c.close(); }
    }
  } finally { netz = 'an'; for (const r of offen) r.destroy?.(); server.closeAllConnections?.(); server.close(); }
  return errors;
}
