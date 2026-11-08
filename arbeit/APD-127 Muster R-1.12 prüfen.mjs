// APD-127 · Muster ‚Gleitbewegungen wie das Mehr-Menü‘ prüfen (R-1.12; Testfall-Liste arbeit/APD-127 Messung und Testfall-Liste.md, APD-127/M-9 bis M-15).
//   node "arbeit/APD-127 Muster R-1.12 prüfen.mjs" (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_V=heute …                              Gegenprobe: ?v=b (4.56.0) – APD-127/M-9 und M-11 bis M-13 müssen rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', heute = process.env.PRUEF_V === 'heute';
const K = 'cubic-bezier(.32,.72,0,1)', URL_ = new URL('./APD-127/app/index.html', import.meta.url).href + (heute ? '?v=b' : '');
const b = await pw[art].launch();
const fehler = [], F = (t, was) => fehler.push(`${t} ${art}: ${was}`), log = [];
// jede Web-Animation mit Dauer und Kurve aufzeichnen
const haken = () => { window.__anim = []; const a = Element.prototype.animate;
  Element.prototype.animate = function (k, o) { const r = a.call(this, k, o); if (o && typeof o === 'object') window.__anim.push({ d: Math.round(o.duration), e: o.easing || '', k: [...new Set((Array.isArray(k) ? k : [k]).flatMap(f => Object.keys(f || {})))].filter(x => !['offset', 'easing', 'composite'].includes(x)).join(','), el: this.tagName + '.' + (this.className?.baseVal ?? this.className ?? '').toString().split(' ')[0] }); return r; }; };
const neu = async p => p.evaluate(() => { const x = window.__anim; window.__anim = []; return x; });
const erwarte = (t, w, liste, ms, kurve = K) => {
  const m = liste.filter(x => x.d >= 100 && x.k.split(',').some(k => !['opacity', 'backgroundColor', 'filter'].includes(k)));   // nur Lageänderungen
  log.push(`${w}: ${m.map(x => `${x.el} ${x.d} ms ${x.e}`).join(' · ') || '–'}`);
  if (!m.length) return F(t, `${w}: keine Bewegung`);
  for (const x of m) if (Math.abs(x.d - ms) > 2 || x.e.replace(/\s/g, '') !== kurve.replace(/\s/g, '')) return F(t, `${w}: ${x.el} ${x.d} ms ${x.e} statt ${ms} ms ${kurve}`);
};
const ruhe = p => p.waitForTimeout(700);

// ---------- iPhone hoch ----------
{
  const ctx = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(haken);
  const p = await ctx.newPage();
  await p.goto(URL_); await ruhe(p);
  const w = t => `iPhone hoch ${t}`;
  // Startliste: zuerst zurück, falls die App die letzte Reise öffnet
  if (!(await p.$('.side-row:visible'))) { await p.click('.pnav button >> nth=0'); await ruhe(p); }
  await neu(p);
  // M-11 Navigation hinein 0,35 s
  await p.click('.side-row[data-id="muster"]'); await ruhe(p);
  erwarte('APD-127/M-11', w('Navigation hinein'), await neu(p), 350);
  // M-9 Blatt öffnen 0,35 s, mit x schließen 0,25 s
  await p.click('[data-day]:visible >> nth=2'); await ruhe(p);
  erwarte('APD-127/M-9', w('Blatt öffnen'), await neu(p), 350);
  await p.click('dialog[open] .dlg-head button >> nth=0'); await ruhe(p);
  erwarte('APD-127/M-9', w('Blatt mit x schließen'), await neu(p), 250);
  // M-13 Titel antippen: 0,35 s (Rollstand Bild für Bild)
  await p.evaluate(() => { const c = document.querySelector('.rolle'); c.scrollTop = 1500;
    window.__titel = new Promise(r => { let t0 = 0, y0 = 0; addEventListener('pointerdown', () => { t0 = performance.now(); y0 = c.scrollTop; window.__y0 = y0; }, { once: true, capture: true }); const f = () => { const y = c.scrollTop; if (t0 && !window.__anteil && performance.now() - t0 >= 100) window.__anteil = { ms: Math.round(performance.now() - t0), a: +(1 - y / y0).toFixed(3), y0 };
      if (t0 && y <= 0) return r(Math.round(performance.now() - t0)); if (t0 && performance.now() - t0 > 2000) return r(-2); requestAnimationFrame(f); }; requestAnimationFrame(f); }); });
  await p.waitForTimeout(300); await p.click('.pnav-title');
  const dauer = await p.evaluate(() => Promise.race([window.__titel, new Promise(r => setTimeout(() => r(-1), 3000))]));
  const anteil = await p.evaluate(() => window.__anteil);
  log.push(w(`Titel antippen: ${dauer} ms, nach ${anteil?.ms} ms ${anteil?.a} des Wegs (Start ${anteil?.y0})`));
  // die Kurve endet so flach, dass der Rollstand vor dem Ende gerundet 0 ist (wie das Menü, APD-127/M-1): 250–420 ms; heute 300 + Weg/20 = 375 ms
  // Kurve K: nach 100–120 ms 0,83–0,88 des Wegs (heute kubisch über 0,375 s: 0,61–0,69)
  if (dauer < 250 || dauer > 420) F('APD-127/M-13', w(`Titel antippen ${dauer} ms statt 0,35 s`));
  if (!anteil || anteil.a < 0.78 || anteil.a > 0.93) F('APD-127/M-13', w(`Titel antippen: nach ${anteil?.ms} ms ${anteil?.a} des Wegs statt 0,83–0,88 (Kurve K)`));
  await ruhe(p); await neu(p);   // ein Tipp während des Rollens hält es nur an
  // M-11 Navigation zurück 0,25 s
  await p.click('.pnav button >> nth=0'); await ruhe(p);
  erwarte('APD-127/M-11', w('Navigation zurück'), await neu(p), 250);
  await ctx.close();
}
// ---------- iPad quer ----------
{
  const ctx = await b.newContext({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(haken);
  const p = await ctx.newPage();
  await p.goto(URL_); await ruhe(p);
  const w = t => `iPad quer ${t}`;
  await neu(p);
  // M-12 Seitenleiste aus 0,25 s, ein 0,35 s
  await p.click('[aria-label="Seitenleiste ausblenden"]'); await ruhe(p);
  erwarte('APD-127/M-12', w('Seitenleiste aus'), await neu(p), 250);
  await p.click('[aria-label="Seitenleiste einblenden"]'); await ruhe(p);
  erwarte('APD-127/M-12', w('Seitenleiste ein'), await neu(p), 350);
  // M-10 Fenster mit der Tastatur: hoch 0,35 s, runter 0,25 s, Kurve K (Übergang aus design.css)
  await p.click('[data-day]:visible >> nth=2'); await ruhe(p);
  const tr = await p.evaluate(() => { const d = document.querySelector('dialog[open]'); d.classList.add('gleitet'); const s1 = getComputedStyle(d);
    const hoch = [s1.transitionDuration, s1.transitionTimingFunction]; d.classList.add('runter'); const s2 = getComputedStyle(d);
    const r = { hoch, runter: [s2.transitionDuration, s2.transitionTimingFunction] }; d.classList.remove('gleitet', 'runter'); return r; });
  log.push(w(`Fenster mit Tastatur: hoch ${tr.hoch.join(' ')}, runter ${tr.runter.join(' ')}`));
  if (tr.hoch[0] !== '0.35s' || !/0\.32, 0\.72, 0, 1/.test(tr.hoch[1])) F('APD-127/M-10', w(`Fenster hoch ${tr.hoch.join(' ')} statt 0.35s K`));
  if (tr.runter[0] !== '0.25s') F('APD-127/M-10', w(`Fenster runter ${tr.runter[0]} statt 0.25s`));
  await ctx.close();
}
// ---------- M-14 ‚Bewegung reduzieren‘: Blatt blendet über wie heute (iPhone hoch) ----------
{
  const ctx = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await ctx.addInitScript(haken);
  const p = await ctx.newPage();
  await p.goto(URL_); await ruhe(p);
  if (!(await p.$('[data-day]:visible'))) { await p.click('.side-row[data-id="muster"]'); await ruhe(p); }
  await neu(p); await p.click('[data-day]:visible >> nth=2'); await ruhe(p);
  const m = (await neu(p)).filter(x => x.d > 200);
  log.push(`iPhone hoch reduziert Blatt: ${m.map(x => `${x.el} ${x.d} ms ${x.e}`).join(' · ') || 'keine Bewegung über 200 ms'}`);
  if (m.length) F('APD-127/M-14', `‚Bewegung reduzieren‘: Bewegung über 200 ms (${m.map(x => x.d).join(', ')})`);
  await ctx.close();
}
await b.close();
console.log(log.join('\n'));
console.log(fehler.length ? fehler.join('\n') + `\nAPD-127 Muster R-1.12 (${art}${heute ? ', Gegenprobe' : ''}): ${fehler.length} Fehler` : `APD-127 Muster R-1.12 (${art}${heute ? ', Gegenprobe' : ''}): alles in Ordnung`);
process.exit(fehler.length ? 1 : 0);
