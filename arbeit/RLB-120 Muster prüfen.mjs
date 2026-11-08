// RLB-120 · Muster ‚Emojis in Textgröße‘ prüfen (Testfall-Liste arbeit/RLB-120 Klärung.md, RLB-120/T-1 bis T-12; Sitzungen 0103, 0104).
//   node "arbeit/RLB-120 Muster prüfen.mjs"     (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_V=heute …                             Gegenprobe: prüft die Kästen ‚heute‘ – T-1, T-2, T-7 und T-12 müssen rot werden
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
      // T-7 (Nutzer 08.11.2026): Spalte 1 grau wie die Kopfzeile der Tabelle (--th-bg), nur in der Zelle – nicht bis zum linken und unteren Rand der Kachel
      const th = getComputedStyle(document.documentElement).getPropertyValue('--th-bg').trim(), bb = box.getBoundingClientRect();
      const ks = [...box.querySelectorAll('.kv .k')], um = document.documentElement.classList.contains('ts-um');
      // T-7 (Nutzer 08.11.2026, Sitzung 0104): Verlauf B Weiß → Grau 5 (#e5e5ea) – nebeneinander von links nach rechts, untereinander (ts-um) von oben nach unten
      const nachUnten = x => /^linear-gradient\((to bottom, )?rgb\(255, 255, 255\)/.test(x), nachRechts = x => /^linear-gradient\(to right, rgb\(255, 255, 255\)/.test(x);
      const grau = ks.every(x => { const g = getComputedStyle(x).backgroundImage; return (um ? nachUnten(g) : nachRechts(g)) && /rgb\(229, 229, 234\)[^,]*\)$/.test(g); });
      const links = ks.every(x => x.getBoundingClientRect().left - bb.left >= 15);
      const unten = bb.bottom - ks.at(-1).getBoundingClientRect().bottom >= 4;
      const luecke = um ? false : ks.slice(1).some((x, i) => x.getBoundingClientRect().top - ks[i].getBoundingClientRect().bottom > 1.5);
      // T-8: der Wert hat links mindestens 16 px Abstand zum Rand der Kachel (auch ‚untereinander‘)
      const einzug = [...box.querySelectorAll('.kv .v')].every(x => x.getBoundingClientRect().left - bb.left >= 15.5);
      // T-9: Linie vor der ersten Zeile, wie die anderen Zeilenlinien mit 16 px Abstand zum Rand (Nutzer 08.11.2026) · T-10: alle Texte in Spalte 1 fett (600)
      const erste = box.querySelector('.h + .kv'), ecs = getComputedStyle(erste), er = erste.getBoundingClientRect();
      const linie = parseFloat(ecs.borderTopWidth) >= 1 && ecs.borderTopStyle === 'solid' && Math.abs(er.left - bb.left - 16) <= 1 && Math.abs(bb.right - er.right - 16) <= 1;
      const fett = [...box.querySelectorAll('.kv .k .l')].every(l => { const tw = document.createTreeWalker(l, NodeFilter.SHOW_TEXT); let ok = true;
        for (let n; (n = tw.nextNode());) if (/\p{L}/u.test(n.data) && +getComputedStyle(n.parentElement).fontWeight < 600) ok = false; return ok; });
      // T-11: Linie auch nach der letzten Zeile (Nutzer 08.11.2026)
      const lz = getComputedStyle([...box.querySelectorAll('.kv')].at(-1)), unterste = parseFloat(lz.borderBottomWidth) >= 1 && lz.borderBottomStyle === 'solid';
      return { bi, k, v, wx, ragt, k1, boxRagt: box.scrollWidth > box.clientWidth + 1, grau, links, unten, luecke, einzug, linie, fett, unterste };
    }), seite);
    const t12 = await p.evaluate(k => { const farben = g => (g.match(/rgba?\([^)]*\)/g) || []).join(' ');
      const th = [...document.querySelectorAll(`.tab.${k} table.days th`)].map(x => getComputedStyle(x).backgroundImage);
      const kk = getComputedStyle(document.querySelector(`.spalte.${k} .box .kv .k`)).backgroundImage;
      return th.length > 0 && th.every(g => /^linear-gradient\((to bottom, )?rgb\(255, 255, 255\)/.test(g) && farben(g) === farben(kk)); }, seite);
    if (!t12) F('RLB-120/T-12', `${art} ${lage} Text ${ts} (${seite}): Kopfzeile der Tabelle nicht von oben nach unten mit dem Verlauf von Spalte 1`);
    for (const e of erg) {
      const w = `${art} ${lage} Text ${ts} Kachel ${e.bi + 1} (${seite}):`, vh = Math.max(...e.v.map(x => x.h));
      for (const x of e.k) if (Math.abs(x.h - vh) > 1) { F('RLB-120/T-1', `${w} Spalte 1 ‚${x.z}‘ ${x.h} px, Spalte 2 ${vh} px`); break; }
      for (const x of e.wx) if (Math.abs(x.h - vh) > 1) { F('RLB-120/T-2', `${w} Wetter ‚${x.z}‘ ${x.h} px, Spalte 2 ${vh} px`); break; }
      if (e.ragt) F('RLB-120/T-3', `${w} Bezeichnung ragt über Spalte 1 hinaus`);
      if (e.k1.length) F('RLB-120/T-4', `${w} Emojis der Bezeichnung in zwei Zeilen: ${e.k1.join(', ')}`);
      if (e.boxRagt) F('RLB-120/T-5', `${w} Kachel ragt hinaus`);
      if (!e.unterste) F('RLB-120/T-11', `${w} keine Linie nach der letzten Zeile`);
      if (!e.linie) F('RLB-120/T-9', `${w} keine Linie vor der ersten Zeile (mit 16 px Abstand zum Rand)`);
      if (!e.fett) F('RLB-120/T-10', `${w} Text in Spalte 1 nicht fett`);
      if (!e.einzug) F('RLB-120/T-8', `${w} Wert ohne 16 px Abstand zum linken Rand`);
      if (!e.grau || !e.links || !e.unten || e.luecke) F('RLB-120/T-7', `${w} Spalte 1 nicht mit Verlauf nur in der Zelle (Verlauf passend zur Lage ${e.grau}, Abstand links ${e.links}, Abstand unten ${e.unten}, Lücke ${e.luecke})`);
    }
  }
  await p.close();
}
await b.close();
for (const f of fehler.slice(0, 20)) console.log('✗ ' + f);
console.log(`RLB-120 Muster (${art}${seite === 'heute' ? ', Gegenprobe' : ''}): ${fehler.length ? fehler.length + ' Fehler' : 'alles in Ordnung'}`);
