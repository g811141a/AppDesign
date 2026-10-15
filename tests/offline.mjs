// AppDesign 4.14.2 · Prüfung ‚Offline-Start‘ (Regel R-1.5, seit 4.14.2, Fund P-37/3: iPad startete offline mit weißer Seite).
// Startet einen eigenen Webserver über dem Ordner, in dem AppDesign und die App nebeneinander liegen, meldet den Service
// Worker der App an (die App selbst nur unter https) und bildet das Netz nach – Abbruch statt Antwort (‚aus‘, wie Flugmodus)
// oder keine Antwort (‚hängt‘, wie schlechtes WLAN). Je Ansicht:
//   1. ohne Netz neu öffnen → App erscheint (Inhalt und AppDesign-Fassung geladen)
//   2. ohne Netz unter anderer Adresse (index.html?…) → App erscheint
//   3. Netz hängt → App erscheint nach höchstens 3 s aus dem Speicher (Grenze mit Spielraum: 4,5 s)
// Seit 4.15.0 (A-06, Fall-Liste F-1 bis F-16 in arbeit/A-06 Muster und Fall-Liste.md) zusätzlich der Offline-Hinweis:
//   in 1–3 erscheint die Meldung ‚Du bist offline‘ und – wo die Seitenleiste bzw. Startliste sichtbar ist – die graue Zeile;
//   4. Wechsel (Safari meldet offline/online): Meldung, Zeile, Lage der Meldung (im Bild, neben der Seitenleiste, nicht über
//      ‚Nach oben / Ans Ende‘ und der Zeile), Kontrast, verschwindet nach 4 s, ‚Wieder online‘, schnelles Hin und Her, Drehen,
//      offenes Fenster, Tastatur, lange Liste (letzter Eintrag über der Backup-Kachel), Backup-Kachel gelb und weiß.
//   5. Seit 4.15.1 (Fund P-39/1 und /2 – iPad zeigte bei offener App keine Meldung): Gerät ohne Safari-Meldung – die
//      Ereignisse offline/online kommen nicht an, navigator.onLine bleibt true; Meldung und Zeile trotzdem nach höchstens
//      15 s, ebenso ‚Wieder online‘.
// Einbinden im Prüfskript der App:
//   import { checkOffline } from '../../AppDesign/fassung/X.Y.Z/tests/offline.mjs';
//   const fehler = await checkOffline(new URL('..', import.meta.url), browser, { ansichten: { 'iPad quer': {…} } });
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { basename, join, extname } from 'node:path';

const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };

export async function checkOffline(appDir, browser, { ansichten, grenze = 4500, vorbereiten = null } = {}) {
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
  // Offline-Hinweis (seit 4.15.0): Zustand der Meldung und der Zeile in der Seite
  const hinweis = p => Promise.race([p.evaluate(() => {
    const vis = e => { if (!e || e.hidden) return null; const r = e.getBoundingClientRect(); return r.width && r.height ? { l: r.left, t: r.top, r: r.right, b: r.bottom } : null; };
    const side = document.getElementById('side'), phone = document.documentElement.classList.contains('phone');
    const foot = document.querySelector('#side .side-foot');
    const t = document.querySelector('.nettoast'), line = document.querySelector('#side .side-foot .offl');
    const lum = c => { const m = c.match(/[\d.]+/g).map(Number); const f = x => (x /= 255) <= .03928 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; return .2126 * f(m[0]) + .7152 * f(m[1]) + .0722 * f(m[2]); };
    const kontrast = (fg, bg) => { const a = lum(fg), b = lum(bg); return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); };
    const bgOf = e => { for (; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; if (!/rgba\(.*, 0\)$|transparent/.test(c)) return c; } return 'rgb(255,255,255)'; };
    const kl = e => e ? Math.min(...[...e.querySelectorAll('b, small, div')].concat(e).filter(x => x.childNodes.length && [...x.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()))
      .map(x => kontrast(getComputedStyle(x).color, bgOf(x)))) : null;
    return { toast: t ? t.innerText.replace(/\s+/g, ' ').trim() : null, toastR: vis(t), toastOben: t ? (() => { try { return t.matches(':popover-open'); } catch { return false; } })() : null,   // oberste Ebene: über einem offenen Fenster (Berührungen dort sperrt das Fenster)
      linie: vis(line) ? line.innerText.trim() : null, linieR: vis(line), fuss: !!vis(foot), bhint: vis(foot?.querySelector('.bhint')),
      seite: !phone && side && !side.hidden ? vis(side) : null, fab: vis(document.getElementById('fab')), vw: innerWidth, vh: innerHeight,
      kToast: kl(t), kLinie: vis(line) ? kl(line) : null, anzahl: document.querySelectorAll('.nettoast').length };
  }).catch(() => null), new Promise(r => setTimeout(() => r(null), 800))]);
  const TEXT_AUS = 'Du bist offline Die App arbeitet weiter; alles bleibt auf diesem Gerät.', TEXT_AN = 'Wieder online', LINIE = 'Offline – alles bleibt auf diesem Gerät';
  const ueber = (a, b) => a && b && a.l < b.r - 1 && b.l < a.r - 1 && a.t < b.b - 1 && b.t < a.b - 1;
  // Wartet höchstens ms, bis die Meldung den Text hat (bzw. die Zeile den gewünschten Zustand) – liefert den letzten Zustand
  const bis = async (p, ms, ok) => { const t0 = Date.now(); let h = null; while (Date.now() - t0 < ms) { h = await hinweis(p); if (h && ok(h)) return h; await p.waitForTimeout(100); } return h; };
  const pruefeAus = (name, fall, h, { toast = true } = {}) => {
    if (!h) return E(`${name}: ${fall} – Zustand nicht lesbar`);
    if (toast && h.toast !== TEXT_AUS) E(`${name}: ${fall} – Meldung ‚Du bist offline‘ fehlt (gesehen: ${h.toast ?? 'keine'})`);
    if (h.fuss && h.linie !== LINIE) E(`${name}: ${fall} – graue Zeile ‚${LINIE}‘ unter der Backup-Kachel fehlt`);
    if (h.toastR) {
      if (h.toastR.l < 0 || h.toastR.r > h.vw || h.toastR.t < 0 || h.toastR.b > h.vh) E(`${name}: ${fall} – Meldung ragt aus dem Bild`);
      if (ueber(h.toastR, h.seite)) E(`${name}: ${fall} – Meldung liegt über der Seitenleiste (nicht im freien Bereich)`);
      if (ueber(h.toastR, h.fab)) E(`${name}: ${fall} – Meldung verdeckt ‚Nach oben / Ans Ende‘`);
      if (ueber(h.toastR, h.linieR)) E(`${name}: ${fall} – Meldung verdeckt die graue Zeile`);
      if (ueber(h.toastR, h.bhint)) E(`${name}: ${fall} – Meldung verdeckt die Backup-Kachel`);
      if (h.kToast < 4.5) E(`${name}: ${fall} – Kontrast der Meldung ${h.kToast.toFixed(2)} : 1 (mindestens 4,5 : 1, R-10.2)`);
    }
    if (h.linieR && h.kLinie < 4.5) E(`${name}: ${fall} – Kontrast der grauen Zeile ${h.kLinie.toFixed(2)} : 1 (mindestens 4,5 : 1, R-10.2)`);
    if (h.anzahl > 1) E(`${name}: ${fall} – ${h.anzahl} Meldungen zugleich`);
  };
  // F-1 bis F-6, F-9 bis F-16: Wechsel online ↔ offline in der laufenden App (Safari meldet offline/online)
  async function wechsel(name, c, p) {
    // Neu öffnen, ohne auf ‚load‘ zu warten (WebKit: eine vorige Navigation bei hängendem Netz kann noch laufen)
    await p.evaluate(u => { window.__alteSeite = true; location.href = u; }, basis).catch(() => {});
    if (await wartet(p, 8000) === null) return E(`${name}: Wechsel – App lädt nicht`);
    let h = await bis(p, 1500, h => !h.linie);
    if (h?.linie) E(`${name}: online steht trotzdem die graue Zeile`);
    await c.setOffline(true);
    h = await bis(p, 2000, h => h.toast === TEXT_AUS && (!h.fuss || h.linie === LINIE));
    pruefeAus(name, 'online → offline', h);
    // F-5, F-6: iPhone – vom Inhalt zurück in die Startliste: Zeile unter der Backup-Kachel, Meldung über der Kachel
    if (await p.evaluate(() => document.documentElement.classList.contains('phone') && !!document.getElementById('back'))) {
      await p.click('#back'); await p.waitForTimeout(300);
      h = await hinweis(p);
      if (!h?.fuss) E(`${name}: Startliste ohne Backup-Kachel – Zeile nicht prüfbar`);
      pruefeAus(name, 'Startliste, offline', h, { toast: !!h?.toast });
    }
    // F-16: Backup-Kachel weiß (.ok) – Zeile unverändert
    const okZeile = await p.evaluate(() => { const b = document.querySelector('#side .bhint'); if (!b) return null; b.classList.toggle('ok'); const l = document.querySelector('#side .offl'); const v = !!l && !l.hidden && l.getBoundingClientRect().height > 0; b.classList.toggle('ok'); return v; });
    if (okZeile === false) E(`${name}: graue Zeile fehlt bei weißer Backup-Kachel`);
    // F-13: lange Liste – der letzte Eintrag lässt sich ganz über die Backup-Kachel wischen
    const unten = await p.evaluate(() => { const l = document.querySelector('#side .side-list'), b = document.querySelector('#side .bhint'); const rows = l?.querySelectorAll('.side-row'); if (!l || !b || !rows?.length || l.scrollHeight <= l.clientHeight) return null;
      const alt = l.scrollTop; l.scrollTop = l.scrollHeight; const ok = rows[rows.length - 1].getBoundingClientRect().bottom <= b.getBoundingClientRect().top + 1; l.scrollTop = alt; return ok; });
    if (unten === false) E(`${name}: lange Liste offline – der letzte Eintrag bleibt hinter der Backup-Kachel (Liste zu kurz für Zeile)`);
    // F-10: Drehen, während die Meldung steht
    const vp = p.viewportSize();
    await p.setViewportSize({ width: vp.height, height: vp.width }); await p.waitForTimeout(400);
    pruefeAus(name, 'offline, gedreht', await hinweis(p));
    await p.setViewportSize(vp); await p.waitForTimeout(400);
    // F-1: nach 4 s ist die Meldung weg, die Zeile bleibt
    h = await bis(p, 5500, h => !h.toast);
    if (h?.toast) E(`${name}: Meldung ‚Du bist offline‘ verschwindet nicht nach 4 s`);
    if (h?.fuss && h.linie !== LINIE) E(`${name}: graue Zeile nach der Meldung verschwunden`);
    // F-2: offline → online
    await c.setOffline(false);
    h = await bis(p, 4000, h => h.toast === TEXT_AN && !h.linie);
    if (h?.toast !== TEXT_AN) E(`${name}: Meldung ‚Wieder online‘ fehlt (gesehen: ${h?.toast ?? 'keine'})`);
    if (h?.linie) E(`${name}: wieder online steht trotzdem die graue Zeile`);
    // F-9: schnell hin und her – höchstens eine Meldung, der letzte Zustand gilt
    await c.setOffline(true); await c.setOffline(false); await c.setOffline(true);
    h = await bis(p, 2000, h => h.toast === TEXT_AUS);
    pruefeAus(name, 'schnell hin und her', h);
    // F-11: offenes Fenster – die Meldung steht darüber
    await c.setOffline(false); await bis(p, 4000, h => h.toast === TEXT_AN);
    const fenster = await p.evaluate(() => { if (typeof inform !== 'function') return false; inform('Test', 'Fenster offen'); return true; });
    if (fenster) {
      await c.setOffline(true);
      h = await bis(p, 2000, h => h.toast === TEXT_AUS);
      if (h?.toast !== TEXT_AUS) E(`${name}: bei offenem Fenster keine Meldung ‚Du bist offline‘`);
      else if (!h.toastOben) E(`${name}: bei offenem Fenster liegt die Meldung unter dem Fenster`);
      await p.evaluate(() => document.getElementById('msg')?.close());
      await c.setOffline(false); await bis(p, 4000, h => h.toast === TEXT_AN);
    }
    // F-12: Tastatur offen (nachgebildet über --vv-bottom) – die Meldung steht über der Tastatur
    await p.evaluate(() => document.documentElement.style.setProperty('--vv-bottom', '320px'));
    await c.setOffline(true);
    h = await bis(p, 2000, h => h.toast === TEXT_AUS);
    if (h?.toastR && h.toastR.b > h.vh - 320) E(`${name}: Meldung liegt bei offener Tastatur hinter der Tastatur`);
    await p.evaluate(() => document.documentElement.style.setProperty('--vv-bottom', '0px'));
    await c.setOffline(false); await bis(p, 4000, h => h.toast === TEXT_AN);
  }
  // F-17 (seit 4.15.1, Fund P-39/1 und /2): Gerät ohne Safari-Meldung – wie das iPad als Home-Bildschirm-App
  async function ohneMeldung(name, c, p) {
    await p.addInitScript(() => {
      for (const ev of ['online', 'offline']) window.addEventListener(ev, e => e.stopImmediatePropagation(), true);
      Object.defineProperty(Navigator.prototype, 'onLine', { get: () => true, configurable: true });
    });
    await p.evaluate(u => { window.__alteSeite = true; location.href = u; }, basis).catch(() => {});
    if (await wartet(p, 8000) === null) return E(`${name}: ohne Safari-Meldung – App lädt nicht`);
    await bis(p, 1500, h => !h.linie);
    // Netz am Webserver weg (wie WLAN aus) – setOffline erreicht in Chromium den Service Worker nicht
    netz = 'aus';
    let h = await bis(p, 15000, h => h.toast === TEXT_AUS);
    pruefeAus(name, 'ohne Safari-Meldung (iPad), online → offline', h);
    netz = 'an';
    h = await bis(p, 15000, h => h.toast === TEXT_AN && !h.linie);
    if (h?.toast !== TEXT_AN) E(`${name}: ohne Safari-Meldung (iPad) – ‚Wieder online‘ fehlt nach 15 s (gesehen: ${h?.toast ?? 'keine'})`);
    if (h?.linie) E(`${name}: ohne Safari-Meldung (iPad) – wieder online steht trotzdem die graue Zeile`);
  }
  try {
    for (const [name, a] of Object.entries(ansichten)) {
      netz = 'an';
      const c = await browser.newContext({ ...a, serviceWorkers: 'allow' }), p = await c.newPage();
      try {
        log(name, 'start'); await p.goto(basis); log(name, 'geladen');
        if (vorbereiten) { await vorbereiten(p); await p.reload(); await wartet(p, 3000); }
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
          // F-7, F-8: beim Start ohne Netz bzw. bei hängendem Netz Meldung und Zeile
          else pruefeAus(name, fall, await bis(p, 2500, h => h.toast === TEXT_AUS && (!h.fuss || h.linie === LINIE)));
          netz = 'an'; for (const r of offen) r.destroy?.(); offen.clear();
        }
        await wechsel(name, c, p);
        await ohneMeldung(name, c, p);
      } finally { await c.close(); }
    }
  } finally { netz = 'an'; for (const r of offen) r.destroy?.(); server.closeAllConnections?.(); server.close(); }
  return errors;
}
