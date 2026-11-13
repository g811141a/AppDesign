// RLB-121 · Muster ‚Teuerste und günstigste Quartiere‘ prüfen (Testfall-Liste arbeit/RLB-121 Testfall-Liste.md, Muster-Teil RLB-121/M-1 bis M-11; Sitzung 0109).
//   node "arbeit/RLB-121 Muster prüfen.mjs"     (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_GEGEN=umbruch …   Gegenprobe: Einträge als Text ohne Schutz – RLB-121/M-8 bis M-10 müssen rot werden
//   PRUEF_GEGEN=nowrap …    Gegenprobe: Einträge wie aufzaehlung heute (.ict.az, nowrap) – RLB-121/M-10 muss rot werden (langer Name)
//   PRUEF_GEGEN=doppelt …   Gegenprobe: unten immer die 3 günstigsten (auch doppelt) – RLB-121/M-2, M-3 müssen rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', gegen = process.env.PRUEF_GEGEN || '';
const b = await pw[art].launch();
const fehler = [], F = (t, w) => fehler.push(`${t} ${w}`);
let umbrueche = 0;
// Erwartet je Fall (RLB-121/D-3, D-4): [teuerste, günstigste] als ‚Name (Preis)‘ – null = keine der beiden Zeilen
const SOLL = [
  [['Hotel Sacher (305,00 €)', 'Hotel Adlon (260,00 €)', 'Hotel Post (115,00 €)'], ['Jugendherberge Lindau (42,00 €)', 'B&B Rosengarten (74,00 €)', 'Pension Seeblick (85,00 €)']],
  [['Hotel Elephant (165,00 €)', 'Hotel Krone (120,00 €)', 'Hotel Bären (120,00 €)'], ['Gasthaus Linde (65,00 €)', 'Pension Ruth (75,00 €)']],
  [['Hotel Krone (120,00 €)'], ['Pension Ruth (75,00 €)']],
  null,
  [['Romantik-Hotel Schloss Hohenstein an der Weinstraße (199,00 €)', 'Hotel Krone (130,00 €)', 'Hotel Krone (110,00 €)'], ['Camping am See (0,00 €)', 'Pension Ruth (65,00 €)', 'Gästehaus zur alten Mühle am Mühlbach (75,00 €)']],
  null,
];
const LAGEN = { 'iPad quer': [1180, 820], 'iPad hoch': [820, 1180], 'iPhone hoch': [390, 844], 'iPhone quer': [844, 390] };
for (const [lage, [width, height]] of Object.entries(LAGEN)) {
  const p = await b.newPage({ viewport: { width, height } });
  await p.goto(new URL('./RLB-121/index.html', import.meta.url).href);
  if (gegen === 'umbruch') await p.addStyleTag({ content: '.azq { display: inline !important; } .preis { white-space: normal !important; }' });
  if (gegen === 'nowrap') await p.addStyleTag({ content: '.azq { display: inline !important; white-space: nowrap !important; }' });   // wie .ict.az heute
  if (gegen === 'doppelt') await p.evaluate(() => {
    const { FAELLE } = window.__muster;
    document.querySelectorAll('[data-fall]').forEach((r, i) => {
      const f = FAELLE[i], pr = f.preisAn ? f.stays.filter(s => s.price != null) : [];
      if (pr.length < 2) return;
      const l = pr.map((s, j) => ({ name: s.name, v: s.price / s.nights, j })).sort((a, b) => a.v - b.v || a.j - b.j).slice(0, 3);
      r.querySelectorAll('[data-z="Günstigste Quartiere"]').forEach(dd => { dd.textContent = l.map(x => `${x.name} (${x.v.toFixed(2).replace('.', ',')} €)`).join(' · '); });
    });
  });
  for (const ts of ['l', 'xxxl', 'ax3']) {
    await p.click(`#ts button[data-ts="${ts}"]`); await p.waitForTimeout(80);
    const erg = await p.evaluate(() => [...document.querySelectorAll('[data-fall]')].map(r => {
      const zeilen = el => {   // Text je dargestellter Zeile
        const rg = document.createRange(), z = []; let y = null, cur = '';
        const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n; (n = tw.nextNode());) for (const s of new Intl.Segmenter().segment(n.data)) {
          rg.setStart(n, s.index); rg.setEnd(n, s.index + s.segment.length); const bb = [...rg.getClientRects()].filter(x => x.width > 0)[0];
          if (!bb) { cur += s.segment; continue; }
          const t = Math.round(bb.top); if (y !== null && t > y + 4) { z.push(cur); cur = ''; } cur += s.segment; y = t; }
        z.push(cur); return z;
      };
      const zeile = (sp, k) => { const el = sp.querySelector(`[data-z="${k}"]`); if (!el) return null;
        const box = el.getBoundingClientRect(), spb = sp.getBoundingClientRect();
        // Einträge, die allein in die Zeile passen, aber umbrechen (Breite am Stück gemessen)
        const zerteilt = [...el.querySelectorAll('.azq')].filter(a => {
          const c = a.cloneNode(true); c.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;display:inline-block;max-width:none';
          el.appendChild(c); const nat = c.getBoundingClientRect().width; c.remove();
          const cs = getComputedStyle(el), innen = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          return nat <= innen - 1 && zeilen(a).length > 1;
        }).map(a => a.textContent);
        return { text: el.textContent, zeilen: zeilen(el), zerteilt, ragt: el.scrollWidth > el.clientWidth + 1 || box.right > spb.right + 1 || box.right > innerWidth + 1 }; };
      return [...r.querySelectorAll('.spalte')].map(sp => ({ teil: sp.querySelector('h3').textContent,
        dts: [...sp.querySelectorAll('dt, td:first-child')].map(x => x.textContent.trim()),
        teuer: zeile(sp, 'Teuerste Quartiere'), guenstig: zeile(sp, 'Günstigste Quartiere') }));
    }));
    for (const [i, fall] of erg.entries()) for (const sp of fall) {
      const w = `${art} ${lage} Text ${ts} Fall ${i + 1} ${sp.teil}:`, soll = SOLL[i];
      const teile = z => z ? z.text.replace(/ /g, ' ').split(' · ') : null;
      if (!soll) { if (sp.teuer || sp.guenstig) F('RLB-121/M-4', `${w} Zeilen da, obwohl weniger als 2 Aufenthalte mit Preis`); continue; }
      if (!sp.teuer || !sp.guenstig) { F('RLB-121/M-1', `${w} Zeile fehlt`); continue; }
      const qi = sp.dts.indexOf('Quartierkosten:');
      if (sp.dts[qi + 1] !== 'Teuerste Quartiere:' || sp.dts[qi + 2] !== 'Günstigste Quartiere:') F('RLB-121/M-1', `${w} Reihenfolge ${sp.dts.join(' | ')}`);
      const [t, g] = [teile(sp.teuer), teile(sp.guenstig)];
      if (JSON.stringify(t) !== JSON.stringify(soll[0])) F('RLB-121/M-2', `${w} teuerste ‚${t.join(' · ')}‘ statt ‚${soll[0].join(' · ')}‘`);
      if (JSON.stringify(g) !== JSON.stringify(soll[1])) F('RLB-121/M-3', `${w} günstigste ‚${g.join(' · ')}‘ statt ‚${soll[1].join(' · ')}‘`);
      for (const [name, z] of [['teuerste', sp.teuer], ['günstigste', sp.guenstig]]) {
        umbrueche += z.zeilen.length - 1;
        for (const [k, s] of z.zeilen.entries()) {
          if ((s.match(/\(/g) || []).length !== (s.match(/\)/g) || []).length) F('RLB-121/M-8', `${w} ${name} Zeile ${k + 1} trennt den Preis: ‚${s.trim()}‘`);
          if (k > 0 && /^\s*·/.test(s)) F('RLB-121/M-9', `${w} ${name} Zeile ${k + 1} beginnt mit ‚·‘`);
        }
        for (const e of z.zerteilt) F('RLB-121/M-9', `${w} ${name} Eintrag passt in die Zeile, ist aber getrennt: ‚${e.trim()}‘`);
        if (z.ragt) F('RLB-121/M-10', `${w} ${name} ragt hinaus`);
      }
    }
  }
  await p.close();
}
await b.close();
if (!umbrueche) F('RLB-121/M-11', 'kein einziger Umbruch – Muster prüft nichts');
if (process.env.PRUEF_ALLE) for (const f of fehler) console.log(f); else for (const f of fehler.slice(0, 20)) console.log('✗ ' + f);
console.log(`RLB-121 Muster (${art}${gegen ? ', Gegenprobe ' + gegen : ''}): ${fehler.length ? fehler.length + ' Fehler' : 'alles in Ordnung'} · ${umbrueche} Umbrüche geprüft`);
