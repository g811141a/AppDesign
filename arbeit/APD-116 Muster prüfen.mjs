// APD-116 · Muster ‚Dateiname in eigener Zeile‘ prüfen (Testfall-Liste arbeit/APD-116 Klärung.md, APD-116/T-1 bis T-5; Sitzung 0102).
//   node "arbeit/APD-116 Muster prüfen.mjs"     (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_V=heute …                             Gegenprobe: prüft die Kästen ‚heute‘ – T-1 muss rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', seite = process.env.PRUEF_V === 'heute' ? 'heute' : 'neu';
const b = await pw[art].launch();
const fehler = [], F = (t, w) => fehler.push(`${t} ${w}`);
const LAGEN = { 'iPad quer': [1180, 820], 'iPad hoch': [820, 1180], 'iPhone hoch': [390, 844], 'iPhone quer': [844, 390] };
for (const [lage, [width, height]] of Object.entries(LAGEN)) {
  const p = await b.newPage({ viewport: { width, height } });
  await p.goto(new URL('./APD-116/index.html', import.meta.url).href);
  for (const ts of ['l', 'xxxl', 'ax3']) {
    await p.click(`#ts button[data-ts="${ts}"]`); await p.waitForTimeout(80);
    const erg = await p.evaluate(k => [...document.querySelectorAll(`.mbox.${k}`)].map(m => {
      const t = m.querySelector('.msg-text'), n = t.querySelector('b');
      const zeilen = []; const r = document.createRange(); let y = null, cur = '';
      const tw = document.createTreeWalker(n, NodeFilter.SHOW_TEXT);
      for (let txt; (txt = tw.nextNode());) for (let i = 0; i < txt.length; i++) { r.setStart(txt, i); r.setEnd(txt, i + 1); const rr = r.getBoundingClientRect();
        if (rr.width === 0 && txt.data[i] === ' ') { cur += ' '; continue; }   // Leerzeichen am Zeilenende hat keine Breite
        const top = Math.round(rr.top); if (y !== null && Math.abs(top - y) > 2) { zeilen.push(cur); cur = ''; } cur += txt.data[i]; y = top; }
      zeilen.push(cur);
      // Text davor: letzte Zeile endet über dem Namen?
      const vor = document.createRange(); vor.setStart(t, 0); vor.setEndBefore(n); const vr = [...vor.getClientRects()].filter(x => x.width > 0);
      const unterVor = vr.length ? Math.max(...vr.map(x => x.bottom)) : 0, nTop = n.getClientRects()[0].top;
      return { name: n.textContent, zeilen, eigen: nTop >= unterVor - 1, ragt: t.scrollWidth > t.clientWidth + 1 || m.getBoundingClientRect().right > innerWidth + 1,
        mitte: Math.abs((n.getBoundingClientRect().left + n.getBoundingClientRect().right) / 2 - (t.getBoundingClientRect().left + t.getBoundingClientRect().right) / 2) };
    }), seite);
    for (const [i, e] of erg.entries()) {
      const w = `${art} ${lage} Text ${ts} Fall ${i + 1} (${seite}):`;
      if (!e.eigen) F('APD-116/T-1', `${w} Name beginnt nicht in einer neuen Zeile`);
      for (const z of e.zeilen.slice(0, -1)) if (!/ $/.test(z)) F('APD-116/T-2', `${w} Umbruch nicht nach einem Leerzeichen: ‚${z.slice(-12)}|‘`);
      if (e.zeilen.join('') !== e.name) F('APD-116/T-3', `${w} Name verändert`);
      if (e.ragt) F('APD-116/T-4', `${w} ragt aus dem Fenster`);
      if (seite === 'neu' && e.zeilen.length === 1 && e.mitte > 2) F('APD-116/T-5', `${w} Name nicht zentriert (${Math.round(e.mitte)} px)`);
    }
  }
  await p.close();
}
await b.close();
for (const f of fehler.slice(0, 20)) console.log('✗ ' + f);
console.log(`APD-116 Muster (${art}${seite === 'heute' ? ', Gegenprobe' : ''}): ${fehler.length ? fehler.length + ' Fehler' : 'alles in Ordnung'}`);
