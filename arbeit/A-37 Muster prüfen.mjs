// Prüft das Muster A-37 in Chromium und WebKit: iPhone hoch, iPhone quer, iPad quer; hell und dunkel; Bilder für die Sichtprüfung.
import { chromium, webkit } from 'playwright';
import { pathToFileURL } from 'url';
const datei = pathToFileURL('/home/user/AppDesign/arbeit/A-37 Muster.html').href;
const aus = process.argv[2] || '.';
const GERAETE = { 'iphone-hoch': [390, 844], 'iphone-quer': [844, 390], 'ipad-quer': [1180, 820] };
let fehler = 0;
const ok = (b, t) => { if (!b) { fehler++; console.log('FEHLER', t); } };
const sicht = (p, sel) => p.evaluate(s => { const e = document.querySelector(s); if (!e || e.hidden) return false;
  const c = getComputedStyle(e); return c.display !== 'none' && +c.opacity > 0.5 && c.pointerEvents !== 'none'; }, sel);
const y = p => p.evaluate(() => document.getElementById('rolle').scrollTop);
const roll = async (p, v) => { await p.evaluate(v => { document.getElementById('rolle').scrollTop = v; }, v); await p.waitForTimeout(80); };
const warte = async p => { let a = -1, gleich = 0; for (let i = 0; i < 80 && gleich < 4; i++) { await p.waitForTimeout(60); const b = await y(p); gleich = b === a ? gleich + 1 : 0; a = b; } };
for (const [bn, browser] of [['chromium', chromium], ['webkit', webkit]]) {
  const b = await browser.launch();
  for (const [gn, [w, h]] of Object.entries(GERAETE)) for (const schema of ['light', 'dark']) {
    const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme: schema, hasTouch: true });
    const t = `${bn} ${gn} ${schema}`;
    for (const v of ['heute', 'a', 'b', 'c']) {
      await p.goto(datei + '?v=' + v); await p.waitForTimeout(150);
      ok(await p.evaluate(() => scrollY) === 0, `${t} ${v}: Seite rollt`);
      const ende = await p.evaluate(() => { const r = document.getElementById('rolle'); return r.scrollHeight - r.clientHeight - 120; });
      if (schema === 'light' && bn === 'webkit') await p.screenshot({ path: `${aus}/${gn}-${v}-oben.png` });
      if (v === 'heute') {
        ok(await sicht(p, '#fab'), `${t} heute: Kapsel fehlt`);
        await p.click('#toEnd'); await warte(p); ok(Math.abs(await y(p) - ende) < 2, `${t} heute: Ans Ende`);
        await p.click('#toTop'); await warte(p); ok(await y(p) === 0, `${t} heute: Nach oben`);
      }
      if (v === 'b') {
        ok(!(await sicht(p, '#toTop')) && await sicht(p, '#toEnd'), `${t} b oben: nur Ans Ende`);
        await roll(p, ende / 2);
        ok(await sicht(p, '#toTop') && await sicht(p, '#toEnd'), `${t} b Mitte: beide`);
        if (schema === 'light' && bn === 'webkit') await p.screenshot({ path: `${aus}/${gn}-b-mitte.png` });
        await p.click('#toEnd'); await warte(p); ok(Math.abs(await y(p) - ende) < 2, `${t} b: Ans Ende`);
        ok(await sicht(p, '#toTop') && !(await sicht(p, '#toEnd')), `${t} b Ende: nur Nach oben`);
        await p.click('#toTop'); await warte(p); ok(await y(p) === 0, `${t} b: Nach oben`);
      }
      if (v === 'a') {
        ok(await sicht(p, '#einzel') && await p.getAttribute('#einzel', 'aria-label') === 'Ans Ende', `${t} a oben: ↓ fehlt`);
        await roll(p, 600); await roll(p, 900);
        ok(await p.getAttribute('#einzel', 'aria-label') === 'Ans Ende', `${t} a nach unten gewischt: ↓`);
        await roll(p, 700);
        ok(await sicht(p, '#einzel') && await p.getAttribute('#einzel', 'aria-label') === 'Nach oben', `${t} a nach oben gewischt: ↑`);
        if (schema === 'light' && bn === 'webkit') await p.screenshot({ path: `${aus}/${gn}-a-hoch.png` });
        await p.click('#einzel'); await warte(p); ok(await y(p) === 0, `${t} a: Nach oben`);
        ok(await p.getAttribute('#einzel', 'aria-label') === 'Ans Ende', `${t} a oben angekommen: wieder ↓`);
        await p.click('#einzel'); await warte(p); ok(Math.abs(await y(p) - ende) < 2, `${t} a: Ans Ende`);
        ok(await sicht(p, '#einzel') && await p.getAttribute('#einzel', 'aria-label') === 'Nach oben', `${t} a am Ende: ↑`);
        await roll(p, 30);
        ok(!(await sicht(p, '#einzel')) || await p.getAttribute('#einzel', 'aria-label') === 'Ans Ende', `${t} a nahe oben: kein ↑`);
      }
      if (v === 'c') {
        await roll(p, 10); ok(await sicht(p, '#griff'), `${t} c: Griff beim Wischen`);
        const g = await p.locator('#griff').boundingBox();
        const s = await p.locator('#spur').boundingBox();
        await p.mouse.move(g.x + g.width / 2, g.y + g.height / 2); await p.mouse.down();
        await p.mouse.move(g.x + g.width / 2, s.y + s.height / 2, { steps: 5 }); await p.waitForTimeout(250);
        ok(await p.evaluate(() => getComputedStyle(document.getElementById('blase')).opacity) !== '0', `${t} c: Blase beim Ziehen`);
        const mitte = await y(p); ok(Math.abs(mitte - ende / 2) < ende * 0.08, `${t} c: Mitte ${mitte} statt ${ende / 2}`);
        if (schema === 'light' && bn === 'webkit') await p.screenshot({ path: `${aus}/${gn}-c-zieht.png` });
        await p.mouse.move(g.x + g.width / 2, s.y + s.height + 200, { steps: 5 });
        ok(Math.abs(await y(p) - ende) < 2, `${t} c: ganz unten = Ende`);
        await p.mouse.move(g.x + g.width / 2, s.y - 200, { steps: 5 }); ok(await y(p) === 0, `${t} c: ganz oben = Anfang`);
        await p.mouse.up(); await p.waitForTimeout(1800);
        ok(!(await sicht(p, '#griff')), `${t} c: Griff blendet nach Ruhe aus`);
        // Griff schneidet keine Leiste
        const bar = await p.locator('.bar').boundingBox();
        ok(s.y >= bar.y + bar.height, `${t} c: Spur unter der Kopfzeile`);
      }
      // Kapsel/Knopf schneidet keine Leiste und liegt im Bild
      for (const sel of ['#fab', '#einzel']) if (await sicht(p, sel)) {
        const r = await p.locator(sel).boundingBox(), bar = await p.locator('.bar').boundingBox();
        ok(r.y >= bar.y + bar.height + 8 && r.y + r.height <= h, `${t} ${v}: ${sel} außerhalb`);
      }
    }
    await p.close();
  }
  await b.close();
}
console.log(fehler ? `${fehler} Fehler` : 'alles grün');
process.exit(fehler ? 1 : 0);
