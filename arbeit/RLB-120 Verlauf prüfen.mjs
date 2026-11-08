// RLB-120 · Muster ‚Verlauf‘ prüfen (arbeit/RLB-120/verlauf.html, Testfall-Liste arbeit/RLB-120 Klärung.md, RLB-120/V-1 bis V-5; Sitzung 0104).
//   node "arbeit/RLB-120 Verlauf prüfen.mjs"    (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_V=heute …                             Gegenprobe: prüft die Variante ‚heute‘ (grau flach) – V-1 und V-2 müssen rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', gegen = process.env.PRUEF_V === 'heute';
const b = await pw[art].launch();
const fehler = [], F = (t, w) => fehler.push(`${t} ${w}`);
const LAGEN = { 'iPad quer': [1180, 820], 'iPad hoch': [820, 1180], 'iPhone hoch': [390, 844], 'iPhone quer': [844, 390] };
for (const [lage, [width, height]] of Object.entries(LAGEN)) {
  const p = await b.newPage({ viewport: { width, height } });
  await p.goto(new URL('./RLB-120/verlauf.html', import.meta.url).href);
  for (const ts of ['l', 'xxl', 'xxxl', 'ax3']) {
    await p.click(`#ts button[data-ts="${ts}"]`); await p.waitForTimeout(80);
    const erg = await p.evaluate(gegen => {
      const farben = s => (s.match(/rgba?\([^)]*\)/g) || []).join(' ');
      return [...document.querySelectorAll('section.var')].filter(s => gegen ? s.dataset.v === 'heute' : s.dataset.v !== 'heute').map(s => {
        const k = [...s.querySelectorAll('.box .kv .k')], th = [...s.querySelectorAll('table.days th')];
        const kb = k.map(x => getComputedStyle(x).backgroundImage), tb = th.map(x => getComputedStyle(x).backgroundImage);
        const box = s.querySelector('.box').getBoundingClientRect();
        return { v: s.dataset.v,
          v1: kb.every(x => /^linear-gradient\(to right, rgb\(255, 255, 255\)/.test(x)),                       // V-1 Spalte 1 links weiß, nach rechts verlaufend
          v2: tb.every(x => /^linear-gradient\(rgb\(255, 255, 255\)/.test(x) || /^linear-gradient\(to bottom, rgb\(255, 255, 255\)/.test(x)),   // V-2 Kopfzeile oben weiß, nach unten
          v3: kb.length > 0 && tb.length > 0 && kb.every(x => farben(x) === farben(tb[0])),                    // V-3 dieselben Farben in Kachel und Kopfzeile
          v4: [...s.querySelectorAll('.box .kv .k .l')].every(l => l.getBoundingClientRect().right <= l.parentElement.getBoundingClientRect().right + 1)
            && [...s.querySelectorAll('.box *')].every(e => e.getBoundingClientRect().right <= box.right + 1) };   // V-4 nichts ragt hinaus
      }).concat([{ v: 'Seite', v5: document.documentElement.scrollWidth <= innerWidth }]);   // V-5 keine seitliche Rollbewegung der Seite
    }, gegen);
    for (const e of erg) {
      const w = `${art} ${lage} Text ${ts} Variante ${e.v}`;
      if (e.v1 === false) F('RLB-120/V-1', `${w}: Spalte 1 nicht von links Weiß nach rechts verlaufend`);
      if (e.v2 === false) F('RLB-120/V-2', `${w}: Kopfzeile nicht von oben Weiß nach unten verlaufend`);
      if (e.v3 === false) F('RLB-120/V-3', `${w}: Kachel und Kopfzeile mit verschiedenen Farben`);
      if (e.v4 === false) F('RLB-120/V-4', `${w}: ragt hinaus`);
      if (e.v5 === false) F('RLB-120/V-5', `${w}: Seite rollt seitlich`);
    }
  }
  await p.close();
}
await b.close();
for (const f of fehler.slice(0, 12)) console.log('✗', f);
console.log(`RLB-120 Verlauf (${art}${gegen ? ', Gegenprobe' : ''}): ${fehler.length ? fehler.length + ' Fehler' : 'alles in Ordnung'}`);
process.exitCode = fehler.length && !gegen ? 1 : 0;
