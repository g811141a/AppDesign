// Prüft das Muster A-61 Teil 1 in Chromium und WebKit: iPhone hoch und quer, iPad quer und hoch; nur hell (0 Nr. 6); Bilder für die
// Sichtprüfung. Aufruf: node 'A-61 Teil 1 Muster prüfen.mjs' <Bilderordner> (Playwright muss auflösbar sein).
import { chromium, webkit } from 'playwright';
import { pathToFileURL } from 'url';
const datei = pathToFileURL('/home/user/AppDesign/arbeit/A-61 Teil 1 Muster.html').href;
const aus = process.argv[2] || '.';
const GERAETE = { 'iphone-hoch': [390, 844], 'iphone-quer': [844, 390], 'ipad-quer': [1180, 820], 'ipad-hoch': [820, 1180] };
let fehler = 0;
const ok = (b, t) => { if (!b) { fehler++; console.log('FEHLER', t); } };
const links = (p, sel) => p.evaluate(s => { const e = document.querySelector(s);
  return e.classList.contains('unsichtbar') || +getComputedStyle(e).opacity < 0.5 ? null : Math.round(e.getBoundingClientRect().left); }, sel);
const ruhe = p => p.waitForTimeout(500);
// langsam ziehen: Schritte von 8 px alle 16 ms, vor dem Loslassen 150 ms halten (kein schnelles Wischen)
async function ziehe(p, x0, y0, x1, y1, { schnell = false, los = true } = {}) {
  await p.mouse.move(x0, y0); await p.mouse.down();
  const n = schnell ? 4 : Math.max(4, Math.round(Math.hypot(x1 - x0, y1 - y0) / 8));
  for (let i = 1; i <= n; i++) { await p.mouse.move(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n); await p.waitForTimeout(schnell ? 8 : 16); }
  if (!los) return;
  if (!schnell) await p.waitForTimeout(150);
  await p.mouse.up(); await ruhe(p);
}
for (const [bn, browser] of [['chromium', chromium], ['webkit', webkit]]) {
  const b = await browser.launch();
  for (const [gn, [w, h]] of Object.entries(GERAETE)) {
    const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme: 'light' });
    const phone = w < 700 || h < 500, hoch = h > w;
    for (const v of ['heute', 'rand', 'ueberall']) {
      const t = `${bn} ${gn} ${v}`, bild = n => bn === 'webkit' ? p.screenshot({ path: `${aus}/${gn}-${v}-${n}.png` }) : null;
      await p.goto(datei + '?v=' + v); await p.waitForTimeout(150);
      ok(await p.evaluate(() => scrollY) === 0, `${t}: Seite rollt`);
      if (phone) {
        ok(await links(p, '#inhalt') === null, `${t}: Start nicht in der Startliste`);
        await bild('start');
        await p.click('.kachel[data-i="1"]'); await ruhe(p);
        ok(await links(p, '#inhalt') === 0, `${t}: Inhalt nicht geöffnet`);
        ok(await p.textContent('#titel') === 'Island 2025', `${t}: falscher Titel`);
        await p.click('#zurueck'); await ruhe(p);
        ok(await links(p, '#inhalt') === null, `${t}: Zurück-Knopf`);
        ok(await p.getAttribute('.kachel[data-i="1"]', 'class') === 'kachel sel', `${t}: zuletzt geöffneter nicht blau (R-7.2)`);
        await p.click('.kachel[data-i="0"]'); await ruhe(p);
        // Zurückwischen vom Rand, langsam über die halbe Breite
        await ziehe(p, 4, h / 2, w * 0.7, h / 2 + 6);
        ok(await links(p, '#inhalt') === (v === 'heute' ? 0 : null), `${t}: vom Rand über die halbe Breite`);
        if (v === 'heute') continue;
        await p.click('.kachel[data-i="0"]'); await ruhe(p);
        // halb ziehen: beide Seiten zu sehen, die Seite folgt dem Finger; langsam loslassen unter der Hälfte → bleibt
        await ziehe(p, 4, h / 2, w * 0.35, h / 2, { los: false });
        const mitte = await p.evaluate(() => document.getElementById('inhalt').getBoundingClientRect().left);
        ok(Math.abs(mitte - (w * 0.35 - 4)) < w * 0.06, `${t}: Seite folgt dem Finger nicht (${Math.round(mitte)})`);
        await bild('zieht');
        await p.waitForTimeout(150); await p.mouse.up(); await ruhe(p);
        ok(await links(p, '#inhalt') === 0, `${t}: unter der Hälfte losgelassen, trotzdem zurück`);
        // schnell wischen: kurzer Weg reicht
        await ziehe(p, 4, h / 2, 110, h / 2, { schnell: true });
        ok(await links(p, '#inhalt') === null, `${t}: schnelles Wischen vom Rand geht nicht zurück`);
        await p.click('.kachel[data-i="0"]'); await ruhe(p);
        // aus der Mitte: Rand bleibt, Überall geht zurück
        await ziehe(p, w * 0.3, h * 0.85, w * 0.95, h * 0.85);   // unterhalb des Bilderstreifens
        ok(await links(p, '#inhalt') === (v === 'rand' ? 0 : null), `${t}: aus der Mitte`);
        if (v === 'ueberall') { await p.click('.kachel[data-i="0"]'); await ruhe(p); }
        // Vorrang: senkrecht bleibt, Bilderstreifen bleibt, schräg (mehr senkrecht) bleibt
        await ziehe(p, w * 0.3, h * 0.7, w * 0.3 + 4, h * 0.3);
        ok(await links(p, '#inhalt') === 0, `${t}: senkrechtes Wischen geht zurück`);
        await ziehe(p, w * 0.5, h / 2, w * 0.45 + 30, h / 2 - 60);
        ok(await links(p, '#inhalt') === 0, `${t}: schräges Wischen geht zurück`);
        const s = await p.locator('#streifen').boundingBox();
        if (s && s.y + s.height < h) {
          await ziehe(p, s.x + 20, s.y + s.height / 2, s.x + s.width - 10, s.y + s.height / 2);
          ok(await links(p, '#inhalt') === 0, `${t}: Wischen im Bilderstreifen geht zurück`);
        }
        // nach links wischen: nichts
        await ziehe(p, w * 0.8, h / 2, w * 0.1, h / 2);
        ok(await links(p, '#inhalt') === 0, `${t}: nach links wischen bewegt die Seite`);
        // Rollstand der Startliste bleibt beim Zurück (T-7)
        await p.evaluate(() => { document.getElementById('listeRolle').scrollTop = 120; });
        await p.click('#zurueck'); await ruhe(p);
        ok(await p.evaluate(() => document.getElementById('listeRolle').scrollTop) === 120 || await p.evaluate(() => { const r = document.getElementById('listeRolle'); return r.scrollHeight <= r.clientHeight; }), `${t}: Rollstand der Startliste verloren`);
      } else {
        // iPad: Start mit Seitenleiste und erstem Eintrag
        ok(await links(p, '#liste') !== null, `${t}: Seitenleiste fehlt beim Start`);
        ok(await p.getAttribute('.kachel[data-i="0"]', 'class') === 'kachel sel', `${t}: erster Eintrag nicht gewählt`);
        await bild('start');
        await p.click('.kachel[data-i="2"]'); await ruhe(p);
        ok(await p.textContent('#titel') === 'Portugal 2025', `${t}: Auswahl öffnet nicht`);
        if (!hoch) {
          ok(await links(p, '#liste') !== null, `${t}: quer verschwindet die Seitenleiste nach der Auswahl`);
          await ziehe(p, 400, h / 2, 40, h / 2);
          ok(await links(p, '#liste') !== null, `${t}: quer schiebt Wischen die Seitenleiste weg`);
          await p.click('#seitenknopf'); await ruhe(p);
          ok(await links(p, '#liste') === null, `${t}: quer panel-left blendet nicht aus`);
          await p.click('#seitenknopf'); await ruhe(p);
          continue;
        }
        ok(await links(p, '#liste') === null, `${t}: hoch schließt die Seitenleiste nach der Auswahl nicht`);
        // vom linken Rand hereinwischen
        await ziehe(p, 4, h / 2, 420, h / 2);
        ok(await links(p, '#liste') === (v === 'heute' ? null : 10), `${t}: Seitenleiste vom Rand`);
        if (v === 'heute') { await p.click('#seitenknopf'); await ruhe(p); ok(await links(p, '#liste') === 10, `${t}: panel-left`); continue; }
        await bild('seite');
        // nach links wegwischen (auf der Seitenleiste)
        await ziehe(p, 300, h / 2, 20, h / 2);
        ok(await links(p, '#liste') === null, `${t}: Seitenleiste nach links wegwischen`);
        // aus der Mitte des Inhalts: Rand nichts, Überall holt die Seitenleiste (Nutzer 22.10.2026, Prüfpunkt 9)
        await ziehe(p, 300, h * 0.85, 760, h * 0.85);
        ok(await links(p, '#liste') === (v === 'rand' ? null : 10), `${t}: Wischen aus der Mitte`);
        // Abdunkelung antippen schließt
        if (await links(p, '#liste') === null) { await p.click('#seitenknopf'); await ruhe(p); }
        await p.mouse.click(w - 40, h / 2); await ruhe(p);
        ok(await links(p, '#liste') === null, `${t}: Abdunkelung antippen schließt nicht`);
      }
    }
    await p.close();
  }
  await b.close();
}
console.log(fehler ? `${fehler} Fehler` : 'alles grün');
process.exit(fehler ? 1 : 0);
