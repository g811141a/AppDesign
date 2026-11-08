// APD-124 · Muster ‚Rückgängig im Feld‘ prüfen (Testfall-Liste arbeit/APD-124 Klärung und Testfall-Liste.md, APD-124/T-1 bis APD-124/T-10).
// Seit Sitzung 0102 Variante A (APD-124/E-4) auf dem Muster APD-126, in allen vier Lagen.
//   node "arbeit/APD-124 Muster prüfen.mjs"            (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit)
//   PRUEF_V=heute …                                    Gegenprobe: ui.js der Fassung 4.56.0 – APD-124/T-2 bis APD-124/T-8 müssen rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const art = process.env.PRUEF_BROWSER || 'chromium', heute = process.env.PRUEF_V === 'heute';
const b = await pw[art].launch();
const fehler = [];
const F = (t, was) => fehler.push(`${t} ${was}`);
const LAGEN = { 'iPad quer': [1180, 820], 'iPad hoch': [820, 1180], 'iPhone hoch': [390, 844], 'iPhone quer': [844, 390] };
for (const [v, [width, height]] of Object.entries(LAGEN)) {
  const ctx = await b.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  if (art === 'chromium') await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
  const p = await ctx.newPage();
  if (heute) await p.route(/APD-124\/ui\.js$/, r => r.fulfill({ path: new URL('../fassung/4.56.0/ui.js', import.meta.url).pathname, contentType: 'text/javascript' }));
  await p.goto(new URL('./APD-124/index.html', import.meta.url).href);
  const zustand = sel => p.evaluate(sel => { const f = document.querySelector(sel), x = document.querySelector('.fclear');
    return { wert: f.value, fokus: document.activeElement === f, knopf: !!x && x.isConnected && x.previousElementSibling === f,
      rueck: !!x?.classList.contains('rueck'), blase: !!document.querySelector('.pop, [role=alertdialog]'),
      hoch: f.getBoundingClientRect().height, voll: f.scrollHeight <= f.clientHeight + 2, ende: f.selectionStart === f.value.length && f.selectionEnd === f.value.length,
      x: x && x.isConnected ? (r => { const fr = f.getBoundingClientRect(); return { w: r.width, h: r.height, drin: r.left >= fr.left - 1 && r.right <= fr.right + 1 && r.top >= fr.top - 1 }; })(x.getBoundingClientRect()) : null }; }, sel);
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
    if (z.x && (z.x.w < 43.5 || z.x.h < 43.5 || !z.x.drin)) F('APD-124/T-9', `${w} Rückgängig ${Math.round(z.x.w)} × ${Math.round(z.x.h)} bzw. nicht im Feld`);
    if (sel === '#fVerlauf') { const ein = await p.$eval('#fOrt', f => f.getBoundingClientRect().height);   // APD-126/M-4: so hoch wie ein einzeiliges Feld
      if (Math.abs(z.hoch - ein) > 1) F('APD-124/T-8', `${w} geleertes Textfeld ${Math.round(z.hoch)} px statt einzeilig ${Math.round(ein)} px (APD-126)`); }
    if (art === 'chromium') { const c = await p.evaluate(() => navigator.clipboard.readText()).catch(e => 'Fehler ' + e);
      if (c !== alt) F('APD-124/T-4', `${w} Zwischenablage ‚${String(c).slice(0, 20)}‘ statt des geleerten Texts`); }
    await tipp(); await p.waitForTimeout(150);
    z = await zustand(sel);
    if (z.wert !== alt) F('APD-124/T-5', `${w} Rückgängig holt ‚${z.wert.slice(0, 20)}‘ statt ‚${alt.slice(0, 20)}‘`);
    if (!z.knopf || z.rueck) F('APD-124/T-5', `${w} nach Rückgängig nicht wieder das ⓧ`);
    if (!z.voll || !z.ende || !z.fokus) F('APD-124/T-10', `${w} nach Rückgängig nicht ganz zu sehen, Cursor nicht am Ende oder ohne Fokus`);
    // erste Eingabe nach dem Leeren: Rückgängig verfällt, auch wenn danach wieder alles gelöscht wird
    await tipp(); await p.waitForTimeout(100); await p.keyboard.type('x'); await p.waitForTimeout(100);
    z = await zustand(sel);
    if (z.wert !== 'x' || !z.knopf || z.rueck) F('APD-124/T-6', `${w} nach der ersten Eingabe nicht das ⓧ (Wert ‚${z.wert}‘, rück ${z.rueck})`);
    await p.keyboard.press('Backspace'); await p.waitForTimeout(100);
    z = await zustand(sel);
    if (z.knopf) F('APD-124/T-6', `${w} nach Eingabe und Löschen per Taste wieder ein Knopf (${z.rueck ? 'Rückgängig' : 'ⓧ'})`);
    // Fokus weg: Rückgängig verfällt (APD-124/E-2)
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
