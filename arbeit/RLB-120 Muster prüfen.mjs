// RLB-120 · Muster ‚Emojis in Textgröße‘ prüfen (Testfall-Liste arbeit/RLB-120 Klärung.md, RLB-120/T-1 bis T-8; Sitzung 0103).
//   node "arbeit/RLB-120 Muster prüfen.mjs"     (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_V=heute …                             Gegenprobe: prüft die Kästen ‚heute‘ – T-1 und T-2 müssen rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', seite = process.env.PRUEF_V === 'heute' ? 'heute' : 'neu';
const b = await pw[art].launch();
const fehler = [], F = (t, w) => fehler.push(`${t} ${w}`);
const LAGEN = { 'iPad quer': [1180, 820], 'iPad hoch': [820, 1180], 'iPhone hoch': [390, 844], 'iPhone quer': [844, 390] };
for (const [lage, [width, height]] of Object.entries(LAGEN)) {
  const p = await b.newPage({ viewport: { width, height } });
  await p.goto(new URL('./RLB-120/index.html', import.meta.url).href);
  for (const ts of ['l', 'xxl', 'xxxl', 'ax3']) {
    await p.click(`#ts button[data-ts="${ts}"]`); await p.waitForTimeout(80);
    const erg = await p.evaluate(k => [...document.querySelectorAll(`.spalte.${k} .box.day`)].map((box, bi) => {
      const rg = document.createRange(), em = [], hoehe = el => { const out = []; const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n; (n = tw.nextNode());) for (const s of new Intl.Segmenter().segment(n.data)) if (/\p{Extended_Pictographic}/u.test(s.segment) && !/[▫📍]/u.test(s.segment)) {
          rg.setStart(n, s.index); rg.setEnd(n, s.index + s.segment.length); out.push({ z: s.segment, h: Math.round(rg.getBoundingClientRect().height), top: Math.round(rg.getBoundingClientRect().top) }); }
        return out; };
      const k = [...box.querySelectorAll('.kv .k')].flatMap(hoehe), v = [...box.querySelectorAll('.kv .v')].flatMap(hoehe), wx = hoehe(box.querySelector('.h .wx'));
      const ragt = [...box.querySelectorAll('.kv .k .l')].some(l => l.scrollWidth > l.parentElement.clientWidth + 1 || l.getBoundingClientRect().right > l.parentElement.getBoundingClientRect().right + 1);
      const k1 = [...box.querySelectorAll('.kv .k .l')].filter(l => { const tops = new Set(hoehe(l).map(x => x.top)); return tops.size > 1; }).map(l => l.textContent);
      // T-7 (Nutzer 08.11.2026): Spalte 1 grau wie die Kopfzeile der Tabelle (--th-bg), vom linken Rand der Kachel an, ohne Lücke bis unten
      const th = getComputedStyle(document.documentElement).getPropertyValue('--th-bg').trim(), bb = box.getBoundingClientRect();
      const ks = [...box.querySelectorAll('.kv .k')], um = document.documentElement.classList.contains('ts-um');
      const grau = ks.every(x => { const c = getComputedStyle(x).backgroundColor, t = document.createElement('i'); t.style.color = th; document.body.append(t); const want = getComputedStyle(t).color; t.remove(); return c === want; });
      const links = ks.every(x => Math.abs(x.getBoundingClientRect().left - bb.left) <= 1);
      const unten = um || Math.abs(ks.at(-1).getBoundingClientRect().bottom - bb.bottom) <= 1;
      const luecke = um ? false : ks.slice(1).some((x, i) => x.getBoundingClientRect().top - ks[i].getBoundingClientRect().bottom > 1.5);
      // T-8: der Wert hat links mindestens 16 px Abstand zum Rand der Kachel (auch ‚untereinander‘)
      const einzug = [...box.querySelectorAll('.kv .v')].every(x => x.getBoundingClientRect().left - bb.left >= 15.5);
      return { bi, k, v, wx, ragt, k1, boxRagt: box.scrollWidth > box.clientWidth + 1, grau, links, unten, luecke, einzug };
    }), seite);
    for (const e of erg) {
      const w = `${art} ${lage} Text ${ts} Kachel ${e.bi + 1} (${seite}):`, vh = Math.max(...e.v.map(x => x.h));
      for (const x of e.k) if (Math.abs(x.h - vh) > 1) { F('RLB-120/T-1', `${w} Spalte 1 ‚${x.z}‘ ${x.h} px, Spalte 2 ${vh} px`); break; }
      for (const x of e.wx) if (Math.abs(x.h - vh) > 1) { F('RLB-120/T-2', `${w} Wetter ‚${x.z}‘ ${x.h} px, Spalte 2 ${vh} px`); break; }
      if (e.ragt) F('RLB-120/T-3', `${w} Bezeichnung ragt über Spalte 1 hinaus`);
      if (e.k1.length) F('RLB-120/T-4', `${w} Emojis der Bezeichnung in zwei Zeilen: ${e.k1.join(', ')}`);
      if (e.boxRagt) F('RLB-120/T-5', `${w} Kachel ragt hinaus`);
      if (!e.einzug) F('RLB-120/T-8', `${w} Wert ohne 16 px Abstand zum linken Rand`);
      if (!e.grau || !e.links || !e.unten || e.luecke) F('RLB-120/T-7', `${w} Spalte 1 nicht durchgehend grau vom Rand an (grau ${e.grau}, links ${e.links}, unten ${e.unten}, Lücke ${e.luecke})`);
    }
  }
  await p.close();
}
await b.close();
for (const f of fehler.slice(0, 20)) console.log('✗ ' + f);
console.log(`RLB-120 Muster (${art}${seite === 'heute' ? ', Gegenprobe' : ''}): ${fehler.length ? fehler.length + ' Fehler' : 'alles in Ordnung'}`);
