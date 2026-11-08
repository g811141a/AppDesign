// APD-126 / RLB-123 · Muster prüfen (Testfall-Liste arbeit/APD-126 RLB-123 Klärung und Wortlaut.md, APD-126/T-1 bis APD-126/T-11).
//   node "arbeit/APD-126 Muster prüfen.mjs"            (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_V=heute …                                    Gegenprobe: ui.js der Fassung 4.56.0 – APD-126/T-1 und T-3 bis T-6 müssen rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', heute = process.env.PRUEF_V === 'heute';
const b = await pw[art].launch();
const fehler = [], F = (t, was) => fehler.push(`${t} ${art}: ${was}`);
for (const [name, vp] of [['iPad quer', { width: 1180, height: 820 }], ['iPhone hoch', { width: 393, height: 852 }]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, hasTouch: false });
  const p = await ctx.newPage();
  if (heute) await p.route(/APD-126\/ui\.js$/, r => r.fulfill({ path: new URL('../fassung/4.56.0/ui.js', import.meta.url).pathname, contentType: 'text/javascript' }));
  await p.goto(new URL('./APD-126/index.html', import.meta.url).href);
  const w = t => `${name} ${t}`;
  const cur = sel => p.$eval(sel, f => ({ s: f.selectionStart, e: f.selectionEnd, n: f.value.length, fokus: document.activeElement === f }));
  const hoehe = sel => p.$eval(sel, f => ({ h: Math.round(f.getBoundingClientRect().height), sh: f.scrollHeight, ch: f.clientHeight, v: f.value }));
  const weg = async () => { await p.evaluate(() => document.activeElement?.blur()); await p.waitForTimeout(80); };

  // T-1: Feld mit Text vorn bzw. mitten antippen → Cursor am Ende
  for (const sel of ['#fTitel', '#fOrt', '#fVerlauf', '#fFazit']) {
    await weg(); await p.click(sel, { position: { x: 30, y: 18 } }); await p.waitForTimeout(250);
    const c = await cur(sel);
    if (!c.fokus || c.s !== c.n || c.e !== c.n) F('APD-126/T-1', w(`${sel} vorn angetippt: Cursor ${c.s}–${c.e} statt am Ende ${c.n}`));
    // T-2: im aktiven Feld nochmals vorn antippen → Cursor an der Stelle (nicht am Ende)
    await p.waitForTimeout(300); await p.click(sel, { position: { x: 30, y: 18 } }); await p.waitForTimeout(150);
    const d = await cur(sel);
    if (d.s === d.n) F('APD-126/T-2', w(`${sel} zweites Antippen: Cursor wieder am Ende statt an der Stelle`));
  }
  // T-3: mit Tab ins nächste Feld → Cursor am Ende
  await weg(); await p.click('#fTitel'); await p.waitForTimeout(250); await p.keyboard.press('Tab'); await p.waitForTimeout(150);
  { const c = await cur('#fOrt'); if (!c.fokus || c.s !== c.n) F('APD-126/T-3', w(`Tab nach Ort: Cursor ${c.s} statt ${c.n}`)); }
  // T-4: leeres Textfeld eine Zeile hoch (44 px wie die einzeiligen)
  await weg();
  { const z = await hoehe('#fWie'), t = await hoehe('#fTitel'); if (Math.abs(z.h - t.h) > 1) F('APD-126/T-4', w(`leeres ‚Wie war was?‘ ${z.h} px statt ${t.h} px`)); }
  // T-5: Eingabetaste → eine Zeile höher; T-6: automatischer Umbruch → höher; T-7: löschen → wieder 44 px
  await p.click('#fWie'); await p.keyboard.type('Schön'); const h1 = (await hoehe('#fWie')).h;
  await p.keyboard.press('Enter'); await p.keyboard.type('Zweite'); const h2 = (await hoehe('#fWie')).h;
  if (h2 - h1 < 15) F('APD-126/T-5', w(`nach der Eingabetaste ${h1} → ${h2} px, nicht eine Zeile höher`));
  await p.keyboard.type(' sehr langer Text, der in dieser Zeile ganz sicher automatisch umbricht, weil er breiter ist als das Feld selbst'.repeat(2));
  const h3 = await hoehe('#fWie');
  if (h3.h - h2 < 15 || h3.sh > h3.ch + 1) F('APD-126/T-6', w(`automatischer Umbruch ${h2} → ${h3.h} px (Inhalt ${h3.sh}, sichtbar ${h3.ch})`));
  await p.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A'); await p.keyboard.press('Backspace'); await p.waitForTimeout(50);
  { const z = await hoehe('#fWie'); if (z.v !== '' || z.h > h1 + 1) F('APD-126/T-7', w(`nach dem Löschen ${z.h} px statt ${h1} px`)); }
  // T-8: vorhandener mehrzeiliger Inhalt ganz sichtbar
  await weg();
  for (const sel of ['#fVerlauf', '#fFazit']) { const z = await hoehe(sel); if (z.sh > z.ch + 1) F('APD-126/T-8', w(`${sel} Inhalt ${z.sh} px, sichtbar nur ${z.ch} px`)); }
  // T-11: Vorschläge über dem Feld
  { const [k, f] = await p.evaluate(() => ['#suggest', '#fVerlauf'].map(s => document.querySelector(s).getBoundingClientRect().bottom - (s === '#fVerlauf' ? document.querySelector(s).getBoundingClientRect().height : 0)));
    if (k > f + 1) F('APD-126/T-11', w(`Vorschläge enden bei ${Math.round(k)}, Feld beginnt bei ${Math.round(f)}`)); }
  // T-9: Vorschlag bei Cursor in der ersten Zeile → nach der letzten Zeile, Cursor am Ende, danach klein weiter
  const alt = (await hoehe('#fVerlauf')).v;
  await p.click('#fVerlauf'); await p.waitForTimeout(400); await p.click('#fVerlauf', { position: { x: 30, y: 18 } }); await p.waitForTimeout(150);
  await p.click('#suggest button:nth-child(1)'); await p.waitForTimeout(100);
  { const c = await cur('#fVerlauf'), v = (await hoehe('#fVerlauf')).v;
    if (v !== alt + '\nWeiterfahrt nach ' || !c.fokus || c.s !== c.n) F('APD-126/T-9', w(`Vorschlag: ‚${v.slice(-40).replace(/\n/g, '⏎')}‘, Cursor ${c.s}/${c.n}, Fokus ${c.fokus}`)); }
  await p.keyboard.type('rom');
  { const v = (await hoehe('#fVerlauf')).v; if (!v.endsWith('\nWeiterfahrt nach rom')) F('APD-126/T-9', w(`nach dem Vorschlag nicht klein: ‚${v.slice(-25)}‘`)); }
  { const z = await hoehe('#fVerlauf'); if (z.sh > z.ch + 1) F('APD-126/T-8', w(`Verlauf nach dem Vorschlag nicht ganz sichtbar`)); }
  // T-10: ‚Sonstiges …‘ hängt eine leere Zeile an, ein zweites Mal keine weitere
  await p.click('#suggest button:nth-child(6)'); await p.click('#suggest button:nth-child(6)'); await p.waitForTimeout(80);
  { const c = await cur('#fVerlauf'), v = (await hoehe('#fVerlauf')).v;
    if (!v.endsWith('Weiterfahrt nach rom\n') || v.endsWith('\n\n') || c.s !== c.n) F('APD-126/T-10', w(`Sonstiges: ‚${v.slice(-25).replace(/\n/g, '⏎')}‘, Cursor ${c.s}/${c.n}`)); }
  await ctx.close();
}
await b.close();
if (fehler.length) { console.log(fehler.join('\n')); console.log(`APD-126 Muster (${art}${heute ? ', Gegenprobe heute' : ''}): ${fehler.length} Fehler`); process.exit(1); }
console.log(`APD-126 Muster (${art}${heute ? ', Gegenprobe heute' : ''}): alles in Ordnung`);
