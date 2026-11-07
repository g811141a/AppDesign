// APD-124 · Muster ‚Rückgängig im Feld‘ prüfen (Testfall-Liste arbeit/APD-124 Klärung und Testfall-Liste.md, APD-124/T-1 bis T-7).
//   node "arbeit/APD-124 Muster prüfen.mjs"            (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_V=heute …                                    Gegenprobe: ui.js der Fassung 4.54.0 – T-1 bis T-6 müssen rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', heute = process.env.PRUEF_V === 'heute';
const b = await pw[art].launch();
const fehler = [];
const F = (t, was) => fehler.push(`${t} ${was}`);
for (const v of ['a', 'b']) {
  const ctx = await b.newContext({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1 });
  if (art === 'chromium') await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
  const p = await ctx.newPage();
  if (heute) await p.route(/APD-124\/ui\.js$/, r => r.fulfill({ path: new URL('../fassung/4.54.0/ui.js', import.meta.url).pathname, contentType: 'text/javascript' }));
  await p.goto(new URL(`./APD-124/index.html?v=${v}`, import.meta.url).href);
  const zustand = sel => p.evaluate(sel => { const f = document.querySelector(sel), x = document.querySelector('.fclear');
    return { wert: f.value, fokus: document.activeElement === f, knopf: !!x && x.isConnected && x.previousElementSibling === f,
      rueck: !!x?.classList.contains('rueck'), blase: !!document.querySelector('.pop, [role=alertdialog]') }; }, sel);
  const tipp = () => p.click('.fclear', { timeout: 1000 }).catch(() => {});   // kein Knopf da (Gegenprobe): der Fehler kommt aus der Prüfung danach
  for (const sel of ['#fTitel', '#fOrt', '#fVerlauf']) {
    const w = `${art} ${v} ${sel}:`;
    const alt = await p.$eval(sel, f => f.value);
    await p.click(sel); await p.waitForTimeout(100);
    let z = await zustand(sel);
    if (!z.knopf || z.rueck) F('APD-124/T-1', `${w} mit Fokus und Text kein ⓧ`);
    await tipp(); await p.waitForTimeout(150);
    z = await zustand(sel);
    if (z.blase) F('APD-124/T-2', `${w} Sprechblase statt sofort leeren`);
    if (z.wert !== '' || !z.fokus) F('APD-124/T-2', `${w} nach ⓧ nicht leer bzw. ohne Fokus (‚${z.wert.slice(0, 20)}‘)`);
    if (!z.knopf || !z.rueck) F('APD-124/T-3', `${w} nach dem Leeren kein Rückgängig-Icon`);
    if (art === 'chromium') { const c = await p.evaluate(() => navigator.clipboard.readText()).catch(e => 'Fehler ' + e);
      if (c !== alt) F('APD-124/T-4', `${w} Zwischenablage ‚${String(c).slice(0, 20)}‘ statt des geleerten Texts`); }
    await tipp(); await p.waitForTimeout(150);
    z = await zustand(sel);
    if (z.wert !== alt) F('APD-124/T-5', `${w} Rückgängig holt ‚${z.wert.slice(0, 20)}‘ statt ‚${alt.slice(0, 20)}‘`);
    if (!z.knopf || z.rueck) F('APD-124/T-5', `${w} nach Rückgängig nicht wieder das ⓧ`);
    // erste Eingabe nach dem Leeren: Rückgängig verfällt, auch wenn danach wieder alles gelöscht wird
    await tipp(); await p.waitForTimeout(100); await p.keyboard.type('x'); await p.waitForTimeout(100);
    z = await zustand(sel);
    if (z.wert !== 'x' || !z.knopf || z.rueck) F('APD-124/T-6', `${w} nach der ersten Eingabe nicht das ⓧ (Wert ‚${z.wert}‘, rück ${z.rueck})`);
    await p.keyboard.press('Backspace'); await p.waitForTimeout(100);
    z = await zustand(sel);
    if (z.knopf) F('APD-124/T-6', `${w} nach Eingabe und Löschen per Taste wieder ein Knopf (${z.rueck ? 'Rückgängig' : 'ⓧ'})`);
    // Fokus weg: Rückgängig verfällt (E-2)
    await p.fill(sel, alt); await p.click(sel); await tipp(); await p.waitForTimeout(100);
    await p.click('h1'); await p.waitForTimeout(100); await p.click(sel); await p.waitForTimeout(100);
    z = await zustand(sel);
    if (z.knopf) F('APD-124/T-7', `${w} nach Fokus weg und zurück wieder ein Knopf (${z.rueck ? 'Rückgängig' : 'ⓧ'})`);
    await p.fill(sel, alt);
  }
  await ctx.close();
}
await b.close();
for (const f of fehler) console.log('✗ ' + f);
console.log(`APD-124 Muster (${art}${heute ? ', Gegenprobe' : ''}): ${fehler.length ? fehler.length + ' Fehler' : 'alles in Ordnung'}`);
