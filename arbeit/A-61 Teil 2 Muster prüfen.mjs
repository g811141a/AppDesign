// Prüft das Muster A-61 Teil 2 (Blatt, T-15) in Chromium und WebKit: iPhone hoch und quer, iPad hoch; nur hell (0 Nr. 6); Bilder für
// die Sichtprüfung. Aufruf: node 'A-61 Teil 2 Muster prüfen.mjs' <Bilderordner> (Playwright muss auflösbar sein).
import { chromium, webkit } from 'playwright';
import { pathToFileURL } from 'url';
import { safariModell } from '/home/user/AppDesign/tests/safari.mjs';
const datei = pathToFileURL('/home/user/AppDesign/arbeit/A-61 Teil 2 Muster.html').href;
const aus = process.argv[2] || '.';
const GERAETE = { 'iphone-hoch': [390, 844], 'iphone-quer': [844, 390], 'ipad-hoch': [820, 1180] };
let fehler = 0;
const ok = (b, t) => { if (!b) { fehler++; console.log('FEHLER', t); } };
const ruhe = p => p.waitForTimeout(650);
const zustand = p => p.evaluate(() => {
  const b = document.getElementById('blatt'), r = b.getBoundingClientRect();
  return { offen: b.classList.contains('offen'), oben: Math.round(r.top), mittel: b.classList.contains('mittel'),
    pop: document.getElementById('pop').classList.contains('an'), seite: document.getElementById('seite').style.transform };
});
// langsam ziehen (Markierung vorher aufheben): Schritte von 8 px alle 16 ms, vor dem Loslassen 150 ms halten; schnell: 4 Schritte, sofort los
async function ziehe(p, x0, y0, x1, y1, { schnell = false, los = true } = {}) {
  await p.evaluate(() => getSelection().removeAllRanges());   // eine Markierung machte den nächsten Zug zum Ziehen-und-Ablegen (0032)
  await p.mouse.move(x0, y0); await p.mouse.down();
  const n = schnell ? 4 : Math.max(4, Math.round(Math.hypot(x1 - x0, y1 - y0) / 8));
  for (let i = 1; i <= n; i++) { await p.mouse.move(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n); await p.waitForTimeout(schnell ? 8 : 16); }
  if (!los) return;
  if (!schnell) await p.waitForTimeout(150);
  await p.mouse.up(); await ruhe(p);
}
// geschlossen: auf den Zustand warten (bis 1,5 s), nie fest – unter Last endet die Bewegung in WebKit später (0032)
const zu = p => p.waitForFunction(() => !document.getElementById('blatt').classList.contains('offen'), null, { timeout: 1500 }).then(() => true, () => false);
const kopfY = async p => { const r = await p.locator('#btitel').boundingBox(); return r.y + r.height / 2; };
for (const [bn, browser] of [['chromium', chromium], ['webkit', webkit]]) {
  const b = await browser.launch();
  for (const [gn, [w, h]] of Object.entries(GERAETE)) {
    const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme: 'light' });
    const phone = w < 700 || h < 500, quer = phone && h < 500;
    for (const v of ['heute', 'a', 'b']) {
      const t = `${bn} ${gn} ${v}`, bild = n => bn === 'webkit' ? p.screenshot({ path: `${aus}/${gn}-${v}-${n}.png` }) : null;
      await p.goto(datei + '?v=' + v); await p.waitForTimeout(150);
      const oeffne = async art => { await p.click(`.kachel[data-art="${art}"]`); await ruhe(p); };
      await oeffne('erfassen');
      let s = await zustand(p);
      ok(s.offen, `${t}: Erfassen öffnet nicht`);
      if (!phone) {   // iPad: Fenster in der Mitte, Wischen schließt nicht
        ok(Math.abs(s.oben - (h - Math.min(720, h * 0.86)) / 2) < 3, `${t}: iPad-Fenster nicht in der Mitte (${s.oben})`);
        await bild('offen');
        const y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, y + 500);
        ok((await zustand(p)).offen, `${t}: iPad – Wischen schließt das Fenster`);
        await p.click('#bx'); await ruhe(p);
        ok(await zu(p), `${t}: iPad – x schließt nicht`);
        continue;
      }
      if (v === 'heute') {   // bildschirmfüllend, kein Wischen
        ok(s.oben === 0, `${t}: nicht bildschirmfüllend (${s.oben})`);
        await bild('offen');
        const y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, y + h * 0.7);
        s = await zustand(p); ok(s.offen && s.oben === 0, `${t}: Heute – Wischen bewegt das Fenster`);
        await p.keyboard.press('Escape'); await ruhe(p);
        ok(await zu(p), `${t}: Escape schließt nicht`);
        continue;
      }
      const T = quer ? 8 : 10, stufen = v === 'b' && !quer, mT = h - 8 - Math.round(h * 0.5);
      ok(s.oben === (stufen ? mT : T), `${t}: öffnet nicht ${stufen ? 'mittel' : 'groß'} (oben ${s.oben})`);
      ok(s.mittel === stufen, `${t}: Form ${s.mittel ? 'mittel' : 'groß'}`);
      ok(!!s.seite === (!quer && !stufen), `${t}: Seite dahinter ${s.seite ? 'weicht zurück' : 'bleibt'}`);
      await bild('offen');
      if (stufen) {
        // B: am Griff nach oben → groß; Feld antippen in mittel → groß
        await ziehe(p, w / 2, mT + 8, w / 2, mT - 300);
        s = await zustand(p); ok(s.oben === T && !s.mittel, `${t}: nach oben ziehen → nicht groß (${s.oben})`);
        ok(!!s.seite, `${t}: groß – Seite weicht nicht zurück`);
        await bild('gross');
        // langsam bis etwa zur Mitte → mittel
        let y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, y + (mT - T) + 20);
        s = await zustand(p); ok(s.oben === mT && s.mittel, `${t}: zur Mitte gezogen → nicht mittel (${s.oben})`);
        await p.click('#binhalt input'); await ruhe(p);
        s = await zustand(p); ok(s.oben === T && !s.mittel, `${t}: Feld antippen → nicht groß (${s.oben})`);
        await p.evaluate(() => document.activeElement.blur());
        y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, y + (mT - T));
        // aus mittel nach unten bis fast zum Rand → zu
        y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, h - 20);
        ok(await zu(p), `${t}: aus mittel nach unten → schließt nicht`);
        await oeffne('erfassen');
        y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, y - 300);
      }
      // groß: ein Stück ziehen → federt zurück; Mitte des Ziehens zeigt Bewegung
      let y = await kopfY(p);
      await ziehe(p, w / 2, y, w / 2, y + 80, { los: false });
      s = await zustand(p); ok(Math.abs(s.oben - (T + 80)) < 12, `${t}: Blatt folgt dem Finger nicht (${s.oben})`);
      await bild('zieht'); await p.waitForTimeout(150); await p.mouse.up(); await ruhe(p);
      s = await zustand(p); ok(s.offen && s.oben === T, `${t}: kurz gezogen → nicht zurückgefedert (${s.oben})`);
      // weit nach unten → zu
      y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, h - 10);
      s = await zustand(p); ok(!s.offen, `${t}: weit nach unten → schließt nicht`);
      ok(!s.seite, `${t}: Seite bleibt nach dem Schließen verkleinert`);
      // schnell und kurz → zu
      await oeffne('erfassen'); if (stufen) { y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, y - 300); }
      y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, y + 120, { schnell: true });
      ok(await zu(p), `${t}: schnell nach unten → schließt nicht`);
      // im Inhalt: gerollt → kein Schließen; ganz oben → schließt; waagerecht → nichts
      await oeffne('erfassen'); if (stufen) { y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, y - 300); }
      const scrollbar = await p.evaluate(() => { const r = document.getElementById('binhalt'); r.scrollTop = 60; return r.scrollTop; });
      const lbl = (await p.locator('#binhalt .feld label').nth(2).boundingBox());
      if (scrollbar > 0) {
        await ziehe(p, w / 2, lbl.y, w / 2, lbl.y + h * 0.5);
        ok((await zustand(p)).offen, `${t}: Inhalt gerollt – Ziehen nach unten schließt`);
        await p.evaluate(() => { document.getElementById('binhalt').scrollTop = 0; });
      }
      const lb = (await p.locator('#binhalt .feld label').first().boundingBox());
      await ziehe(p, 40, lb.y, w - 20, lb.y + 10);
      s = await zustand(p); ok(s.offen && s.oben === T, `${t}: waagerecht ziehen bewegt das Blatt`);
      await ziehe(p, w / 2, lb.y, w / 2, h - 10);
      ok(await zu(p), `${t}: Inhalt ganz oben – Ziehen nach unten schließt nicht`);
      // Bearbeiten mit Änderung: Ziehen schließt nicht, federt zurück und fragt (R-4.4)
      await oeffne('bearbeiten'); if (stufen) { y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, y - 300); }
      await p.locator('#binhalt input').first().fill('Japan 2026 – Frühling'); await p.evaluate(() => document.activeElement.blur());
      ok(await p.evaluate(() => document.getElementById('bok').classList.contains('blau')), `${t}: Häkchen nach Änderung nicht blau`);
      y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, h - 10);
      s = await zustand(p); ok(s.offen && s.oben === T, `${t}: mit Änderung – Ziehen schließt bzw. federt nicht zurück (${s.oben})`);
      ok(s.pop, `${t}: mit Änderung – keine Rückfrage nach dem Ziehen`);
      await bild('rueckfrage');
      await p.click('#weiter'); await ruhe(p);
      s = await zustand(p); ok(s.offen && !s.pop, `${t}: ‚Weiter bearbeiten‘`);
      await p.click('#bx'); await ruhe(p);
      ok((await zustand(p)).pop, `${t}: x mit Änderung fragt nicht`);
      await p.click('#verwerfen'); await ruhe(p);
      ok(await zu(p), `${t}: ‚Änderungen verwerfen‘ schließt nicht`);
      // Bearbeiten ohne Änderung: Abdunkelung antippen schließt; Escape schließt
      await oeffne('bearbeiten');
      await p.mouse.click(w / 2, 4); await ruhe(p);
      ok(await zu(p), `${t}: Abdunkelung antippen schließt nicht`);
      await oeffne('vorschau'); await bild('vorschau');
      await p.keyboard.press('Escape'); await ruhe(p);
      ok(await zu(p), `${t}: Escape schließt die Vorschau nicht`);
      ok(await p.evaluate(() => scrollY) === 0, `${t}: Seite rollt`);
      // Tastatur (Nutzer 23.10.2026, Prüfpunkte 6, 7.6, 8.6): Reisemittel antippen – im Safari-Modell (13 S-1 bis S-8) stehen Feld
      // und Kopf über der Tastatur; nach unten ziehen schließt die Tastatur – am Kopf auch das Blatt, im gerollten Inhalt nur sie
      await p.goto(datei + '?v=' + v); await p.waitForTimeout(150);
      // wie am Gerät mit Sicherheitsabständen (iPhone hoch oben 47, unten 34; quer links und rechts 47, unten 21) – sonst liegt
      // Reisemittel zufällig knapp über der Tastatur
      await p.addStyleTag({ content: quer ? ':root{--sl:47px;--sr:47px;--sb:21px}' : ':root{--st:47px;--sb:34px}' }); await p.evaluate(() => dispatchEvent(new Event('resize')));
      await safariModell(p, quer ? 'iPhone quer' : 'iPhone hoch', { auto: true });
      const sicht = () => p.evaluate(() => {
        const vv = visualViewport, a = document.activeElement, k = document.getElementById('btitel').getBoundingClientRect();
        const r = a?.matches?.('input, textarea') ? a.getBoundingClientRect() : null;
        return { tastatur: __safari.offen, vt: Math.round(vv.offsetTop), h: Math.round(vv.height), kopf: Math.round(k.top - vv.offsetTop),
          feld: r && [Math.round(r.top - vv.offsetTop), Math.round(r.bottom - vv.offsetTop)], offen: document.getElementById('blatt').classList.contains('offen'),
          rolle: document.getElementById('binhalt').scrollTop };
      });
      for (const zug of ['kopf', 'inhalt']) {
        const tz = `${t} Tastatur ${zug}`;
        await oeffne('bearbeiten');
        await p.locator('#binhalt input').nth(4).click(); await p.waitForTimeout(500);
        let k = await sicht();
        ok(k.tastatur, `${tz}: Tastatur geht nicht auf`);
        ok(k.feld && k.feld[0] >= k.kopf && k.feld[1] <= k.h, `${tz}: Reisemittel nicht über der Tastatur (Feld ${k.feld}, sichtbar bis ${k.h}, offsetTop ${k.vt})`);
        ok(k.kopf >= 0 && k.kopf < k.h, `${tz}: Kopf nicht sichtbar (${k.kopf})`);
        await bild('tastatur');
        if (zug === 'kopf') {
          const y = await kopfY(p); await ziehe(p, w / 2, y, w / 2, h - 10); await p.waitForTimeout(200);
          k = await sicht(); ok(!k.tastatur && !k.offen, `${tz}: am Kopf nach unten – Tastatur ${k.tastatur ? 'offen' : 'zu'}, Blatt ${k.offen ? 'offen' : 'zu'}`);
          continue;
        }
        await p.evaluate(() => { const r = document.getElementById('binhalt'); if (r.scrollTop < 20) r.scrollTop = 20; });
        const b0 = await p.locator('#btitel').boundingBox(), y0 = b0.y + b0.height + 30;
        await ziehe(p, w / 2, y0, w / 2, y0 + 60); await p.waitForTimeout(200);
        k = await sicht(); ok(!k.tastatur && k.offen, `${tz}: im gerollten Inhalt nach unten – Tastatur ${k.tastatur ? 'offen' : 'zu'}, Blatt ${k.offen ? 'offen' : 'zu'}`);
        await p.click('#bx'); await ruhe(p);
        if ((await sicht()).offen) { await p.click('#verwerfen'); await ruhe(p); }
      }
    }
    await p.close();
  }
  await b.close();
}
console.log(fehler ? `${fehler} Fehler` : 'alles grün');
process.exit(fehler ? 1 : 0);
