// APD-140 · Muster ‚Bean-Katalog‘ prüfen (Testfall-Liste arbeit/APD-140 Testfall-Liste.md, Muster-Teil APD-140/M-1 bis M-10; Sitzung 0141).
//   node "arbeit/APD-140 Muster prüfen.mjs"            (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_BILDER=1 …     dazu die Bilder ‚APD-140 Muster iPad quer 1–4.png‘ (iPad quer hell, 2-fach)
//   PRUEF_GEGEN=zeile …  Gegenprobe: der Dateiname bricht im Hinweisfenster um (wie vor 4.64.0) – APD-140/M-5 muss rot werden
//   PRUEF_GEGEN=wisch …  Gegenprobe: Wischaktionen nicht angemeldet – APD-140/M-6 muss rot werden
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', gegen = process.env.PRUEF_GEGEN || '', bilder = !!process.env.PRUEF_BILDER;
const b = await pw[art].launch();
const fehler = [], F = (nr, lage, w) => fehler.push(`APD-140/${nr} (${lage}): ${w}`);
const URL0 = new URL('./APD-140/index.html', import.meta.url).href;
const LAGEN = { 'iPad quer': [1180, 820], 'iPad hoch': [820, 1180], 'iPhone hoch': [393, 852], 'iPhone quer': [852, 393] };
const ruhig = p => p.waitForTimeout(450);
const wisch = (p, sel, dx) => p.evaluate(async ([s, dx]) => {
  const k = document.querySelector(s); if (!k) return 'fehlt';
  const r = k.getBoundingClientRect(), x0 = r.left + r.width * 0.7, y0 = r.top + r.height / 2;
  const ev = (typ, x) => k.dispatchEvent(new PointerEvent(typ, { pointerId: 4501, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y0, button: 0,
    buttons: typ === 'pointerup' ? 0 : 1, bubbles: true, cancelable: true }));
  ev('pointerdown', x0);
  for (let i = 1; i <= 12; i++) { await new Promise(r => setTimeout(r, 16)); ev('pointermove', x0 + dx * i / 12); }
  ev('pointerup', x0 + dx); return 'ok';
}, [sel, dx]);
// Grundregeln des Musters: nichts ragt waagrecht hinaus, die Seite rollt nie (R-2.1), Leiste oben steht
const grund = async (p, lage, nr) => {
  const g = await p.evaluate(() => ({ breit: document.documentElement.scrollWidth - innerWidth, y: scrollY,
    raus: [...document.querySelectorAll('#app *, #side *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1) && !e.closest('.ad-swipeactions-aktionen, [hidden], .cap .scroll'); }).length }));
  if (g.breit > 0) F(nr, lage, `Seite ${g.breit} px zu breit`);
  if (g.y) F(nr, lage, `Seite gerollt (scrollY ${g.y})`);
  if (g.raus) F(nr, lage, `${g.raus} Elemente ragen hinaus`);
};

for (const v of ['A', 'B']) for (const [lage, [width, height]] of Object.entries(LAGEN)) {
  const phone = lage.startsWith('iPhone');
  const ctx = await b.newContext({ viewport: { width, height }, hasTouch: true, isMobile: phone && art === 'chromium', deviceScaleFactor: bilder && lage === 'iPad quer' ? 2 : 1 });
  const p = await ctx.newPage();
  const err = []; p.on('pageerror', e => err.push(e.message)); p.on('console', m => m.type() === 'error' && err.push(m.text()));
  await p.goto(`${URL0}?v=${v}#hinweis`); await ruhig(p);
  if (gegen === 'zeile') await p.addStyleTag({ content: '.fname .fw { display: inline !important; }' }).then(() => p.evaluate(() => { adHinweis.breiteNachDateiname = false; }));
  const L = `${lage}, ${v}`;
  // M-1: lädt ohne Fehler, AppDesign aus v4
  const ver = await p.evaluate(() => typeof AD_VERSION === 'string' && AD_VERSION);
  if (!ver) F('M-1', L, 'AppDesign nicht geladen');
  // M-2: Seitenleiste – Abschnittsköpfe als Überschrift, Beans als Kacheln, geplante nicht antippbar; iPhone: Startliste ohne blauen Eintrag
  if (phone) {
    const s = await p.evaluate(() => ({ seite: side.classList.contains('page') && !side.hidden, blau: !!side.querySelector('.current') }));
    if (!s.seite) F('M-2', L, 'Startliste fehlt'); if (s.blau) F('M-2', L, 'Startliste mit blauem Eintrag');
  }
  const s2 = await p.evaluate(() => ({ koepfe: [...side.querySelectorAll('.side-sec')].map(h => h.tagName), beans: side.querySelectorAll('button[data-bean]').length,
    geplant: [...side.querySelectorAll('.geplant')].map(g => g.tagName) }));
  if (s2.koepfe.length < 2 || s2.koepfe.some(t => !/^H[1-6]$/.test(t))) F('M-2', L, `Abschnittsköpfe ${s2.koepfe.join(',')}`);
  if (s2.beans !== 2) F('M-2', L, `${s2.beans} Beans statt 2`);
  if (!s2.geplant.length || s2.geplant.some(t => t === 'BUTTON')) F('M-2', L, 'geplante Beans fehlen oder sind antippbar');
  await grund(p, L, 'M-8');
  // M-3: Bean antippen → Titel in der Leiste, Adresse #kennung, Kachel blau (iPad)
  await p.click('#side [data-bean="swipeactions"]'); await p.waitForTimeout(1000);
  const s3 = await p.evaluate(() => ({ titel: document.querySelector('#bar .nb-title, #bar .pnav-title')?.textContent, hash: location.hash,
    blau: document.querySelector('#side .current')?.dataset.bean || null }));
  if (s3.titel !== 'Wischaktionen') F('M-3', L, `Titel ‚${s3.titel}‘`);
  if (s3.hash !== '#swipeactions') F('M-3', L, `Adresse ${s3.hash}`);
  if (!phone && s3.blau !== 'swipeactions') F('M-3', L, `blau: ${s3.blau}`);
  await grund(p, L, 'M-8');
  // M-6: Wischen öffnet die Kachel, Protokoll ‚offen‘; die Kachel ohne Aktionen bleibt zu
  if (gegen === 'wisch') await p.evaluate(() => window.__bkWisch.entfernen());
  await wisch(p, '[data-k="k1"]', -200); await ruhig(p);
  const s6 = await p.evaluate(() => ({ offen: !!document.querySelector('.ad-swipeactions-kapsel'), prot: document.querySelector('#bkProt')?.textContent || '' }));
  if (!s6.offen) F('M-6', L, 'Kachel nicht offen'); if (!/offen · Erster Eintrag/.test(s6.prot)) F('M-6', L, 'Protokoll ohne ‚offen‘');
  if (bilder && lage === 'iPad quer') await p.screenshot({ path: fileURLToPath(new URL(`./APD-140 Muster iPad quer ${v === 'A' ? 2 : 4}.png`, import.meta.url)) });
  await p.mouse.click(5, height - 5).catch(() => {}); await ruhig(p);
  await wisch(p, '[data-k="k3"]', -200); await ruhig(p);
  const s6b = await p.evaluate(() => [...document.querySelectorAll('.ad-swipeactions-kachel')].map(k => k.dataset.k));
  if (s6b.includes('k3')) F('M-6', L, 'Kachel ohne Aktionen ließ sich wischen');
  // M-4, M-5: Hinweisfenster – langer Dateiname am iPad in einer Zeile; Schalter aus → Umbruch; Protokoll ‚zu‘
  if (phone) { await p.evaluate(() => navZurueck()); await p.waitForTimeout(1000); }
  await p.click('#side [data-bean="hinweis"]'); await p.waitForTimeout(1000);
  if (bilder && lage === 'iPad quer' && v === 'A') await p.screenshot({ path: fileURLToPath(new URL('./APD-140 Muster iPad quer 1.png', import.meta.url)) });
  await p.click('[data-fall="1"]'); await ruhig(p);
  const zeilen = () => p.evaluate(() => { if (!msg.open) return 0; const tops = [...msg.querySelectorAll('.fname .fw')].map(w => w.getBoundingClientRect().top).sort((x, y) => x - y);
    return tops.filter((t, i) => !i || t - tops[i - 1] > 4).length; });
  const z1 = await zeilen();
  if (!z1) F('M-4', L, 'Fenster nicht offen');
  if (!phone && z1 !== 1) F('M-5', L, `Dateiname in ${z1} Zeilen`);
  if (bilder && lage === 'iPad quer' && v === 'A') await p.screenshot({ path: fileURLToPath(new URL('./APD-140 Muster iPad quer 3.png', import.meta.url)) });
  await p.click('#msg [data-x]'); await ruhig(p);
  const prot = await p.evaluate(() => document.querySelector('#bkProt').textContent);
  if (!/zu/.test(prot)) F('M-4', L, 'Protokoll ohne ‚zu‘');
  if (gegen !== 'zeile') {
    await p.evaluate(() => { const c = document.querySelector('#bkBreite'); if (c.checked) c.click(); }); await ruhig(p);
    await p.click('[data-fall="1"]'); await ruhig(p);
    const z2 = await zeilen();
    if (!phone && z2 < 2) F('M-5', L, 'Schalter aus – Dateiname trotzdem in einer Zeile');
    await p.click('#msg [data-x]'); await ruhig(p);
  }
  // M-7: Variante B – die Auswahl-Kapsel wechselt den Teil, gewählt ist genau einer
  if (v === 'B') {
    await p.click('[data-teil="schnitt"]'); await ruhig(p);
    const s7 = await p.evaluate(() => ({ an: [...document.querySelectorAll('[data-teil][aria-pressed="true"]')].map(x => x.dataset.teil), fabrik: /createHinweis/.test(document.querySelector('#rolle').textContent) }));
    if (s7.an.join() !== 'schnitt' || !s7.fabrik) F('M-7', L, `Teil ${s7.an.join()} · Fabrik ${s7.fabrik}`);
  }
  await grund(p, L, 'M-8');
  // M-9: iPhone – Zurück führt zur Startliste; iPad – panel-left blendet die Seitenleiste aus und wieder ein
  if (phone) {
    await p.click('#back'); await p.waitForTimeout(1000);
    if (!(await p.evaluate(() => side.classList.contains('page') && !side.hidden))) F('M-9', L, 'Zurück ohne Startliste');
  } else {
    await p.click('#sideHide'); await p.waitForTimeout(700);
    const aus = await p.evaluate(() => side.hidden || side.getBoundingClientRect().right <= 0);
    await p.click('[data-side-toggle]'); await p.waitForTimeout(700);
    const an = await p.evaluate(() => !side.hidden && side.getBoundingClientRect().right > 100);
    if (!aus || !an) F('M-9', L, `Seitenleiste aus ${aus} · ein ${an}`);
  }
  if (err.length) F('M-1', L, `Fehler: ${err.join(' | ')}`);
  await ctx.close();
}
await b.close();
console.log(fehler.length ? `APD-140 Muster (${art}${gegen ? ', Gegenprobe ' + gegen : ''}): ${fehler.length} Fehler\n  ${fehler.join('\n  ')}` : `APD-140 Muster (${art}): alles in Ordnung`);
process.exitCode = fehler.length ? 1 : 0;
