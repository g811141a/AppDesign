// RLB-122 · Muster ‚Umbruch vor der Anzahl‘ prüfen (Testfall-Liste arbeit/RLB-122 Klärung.md, RLB-122/T-1 bis RLB-122/T-5; Sitzung 0103).
//   node "arbeit/RLB-122 Muster prüfen.mjs"     (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_V=heute …                             Gegenprobe: prüft die Spalten ‚heute‘ – RLB-122/T-1 und RLB-122/T-2 müssen rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', seite = process.env.PRUEF_V === 'heute' ? 'heute' : 'neu';
const b = await pw[art].launch();
const fehler = [], F = (t, w) => fehler.push(`${t} ${w}`);
let umbrueche = 0;
const LAGEN = { 'iPad quer': [1180, 820], 'iPad hoch': [820, 1180], 'iPhone hoch': [390, 844], 'iPhone quer': [844, 390] };
for (const [lage, [width, height]] of Object.entries(LAGEN)) {
  const p = await b.newPage({ viewport: { width, height } });
  await p.goto(new URL('./RLB-122/index.html', import.meta.url).href);
  for (const ts of ['l', 'xxxl', 'ax3']) {
    await p.click(`#ts button[data-ts="${ts}"]`); await p.waitForTimeout(80);
    const erg = await p.evaluate(k => [...document.querySelectorAll(`.spalte.${k} dd[data-z]`)].map(dd => {
      const rg = document.createRange(), z = []; let y = null, cur = '';
      const tw = document.createTreeWalker(dd, NodeFilter.SHOW_TEXT);
      for (let n; (n = tw.nextNode());) for (const s of new Intl.Segmenter().segment(n.data)) {
        rg.setStart(n, s.index); rg.setEnd(n, s.index + s.segment.length); const bb = [...rg.getClientRects()].filter(x => x.width > 0)[0];
        if (!bb) { cur += s.segment; continue; }   // Leerzeichen am Zeilenende hat keine Breite
        const t = Math.round(bb.top); if (y !== null && t > y + 4) { z.push(cur); cur = ''; } cur += s.segment; y = t; }
      z.push(cur);
      return { fall: +dd.closest('.reihe').dataset.fall + 1, zeile: dd.dataset.z, zeilen: z, text: dd.textContent,
        ragt: dd.scrollWidth > dd.clientWidth + 1 || dd.getBoundingClientRect().right > innerWidth + 1 };
    }), seite);
    for (const e of erg) {
      const w = `${art} ${lage} Text ${ts} Fall ${e.fall} ${e.zeile} (${seite}):`;
      umbrueche += e.zeilen.length - 1;
      for (const [i, z] of e.zeilen.entries()) {
        if (i < e.zeilen.length - 1 && /\d×\s*$/.test(z)) F('RLB-122/T-1', `${w} Zeile endet mit der Anzahl ‚…${z.trim().slice(-6)}‘ – Zeichen in der nächsten Zeile`);
        if (i > 0 && !/^\d/.test(z.trim())) F('RLB-122/T-2', `${w} Zeile ${i + 1} beginnt nicht mit der Anzahl: ‚${z.trim().slice(0, 6)}…‘`);
        if (i < e.zeilen.length - 1 && !/·\s*$/.test(z)) F('RLB-122/T-3', `${w} Zeile ${i + 1} endet nicht mit ‚·‘`);
      }
      if (e.zeilen.join('').replace(/\s/g, '') !== e.text.replace(/\s/g, '')) F('RLB-122/T-4', `${w} Text verändert`);
      if (e.ragt) F('RLB-122/T-5', `${w} ragt hinaus`);
    }
  }
  await p.close();
}
await b.close();
if (!umbrueche) F('RLB-122/T-6', 'kein einziger Umbruch – Muster prüft nichts');
for (const f of fehler.slice(0, 20)) console.log('✗ ' + f);
console.log(`RLB-122 Muster (${art}${seite === 'heute' ? ', Gegenprobe' : ''}): ${fehler.length ? fehler.length + ' Fehler' : 'alles in Ordnung'} · ${umbrueche} Umbrüche geprüft`);
