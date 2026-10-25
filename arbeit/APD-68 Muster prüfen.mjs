// Prüft das Muster APD-68 in Chromium und WebKit: iPad quer und hoch, Varianten heute, a, b; nur hell (0 Nr. 6); Bilder für die
// Sichtprüfung. Aufruf: PW=<pfad zu playwright/index.mjs> node 'APD-68 Muster prüfen.mjs' <Bilderordner>
// (ohne PW muss 'playwright' auflösbar sein). Berührung nach Safari mit safariWischen (S-10, tests/safari.mjs).
import { pathToFileURL } from 'url';
import { safariWischen } from '../tests/safari.mjs';
const { chromium, webkit } = await import(process.env.PW || 'playwright');
const datei = pathToFileURL('/home/user/AppDesign/arbeit/APD-68 Muster.html').href;
const aus = process.argv[2] || '.';
const GERAETE = { 'ipad-quer': [1180, 820], 'ipad-hoch': [820, 1180] };
const FEST = 380;   // --seite-w + 20 px: linke Kante des Inhalts neben der festen Seitenleiste
let fehler = 0;
const ok = (b, t) => { if (!b) { fehler++; console.log('FEHLER', t); } };
const links = (p, sel) => p.evaluate(s => { const e = document.querySelector(s);
  return e.classList.contains('unsichtbar') || +getComputedStyle(e).opacity < 0.5 ? null : Math.round(e.getBoundingClientRect().left); }, sel);
const inhalt = p => p.evaluate(() => { const r = document.getElementById('inhalt').getBoundingClientRect(); return { l: Math.round(r.left), w: Math.round(r.width) }; });
const obenTag = p => p.evaluate(() => { const r = document.getElementById('inhaltRolle'), top = r.getBoundingClientRect().top;
  for (const b of r.querySelectorAll('.tag')) { const q = b.getBoundingClientRect(); if (q.bottom > top + 1) return { tag: b.dataset.tag, ab: Math.round(q.top - top) }; } });
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
// Berührung wie Safari: 30 Schritte nach rechts, dabei senkrecht bis dy abweichen (gemessen 10–21 px, P-65)
const zug = (dx, dy) => Array.from({ length: 30 }, (_, i) => [Math.round(dx * (i + 1) / 30), Math.round(dy * (i + 1) / 30), 16]);
for (const [bn, browser] of [['chromium', chromium], ['webkit', webkit]]) {
  const b = await browser.launch();
  for (const [gn, [w, h]] of Object.entries(GERAETE)) {
    const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme: 'light' });
    const quer = w > h;
    for (const v of ['heute', 'a', 'b']) {
      const t = `${bn} ${gn} ${v}`, bild = n => bn === 'webkit' ? p.screenshot({ path: `${aus}/${gn}-${v}-${n}.png` }) : null;
      await p.goto(datei + '?v=' + v); await p.waitForTimeout(150);
      ok(await p.evaluate(() => scrollY) === 0, `${t}: Seite rollt`);
      ok(await links(p, '#liste') === 10, `${t}: Seitenleiste fehlt beim Start`);
      if (quer) ok((await inhalt(p)).l === FEST, `${t}: Inhalt nicht neben der Seitenleiste`);
      await bild('start');
      if (!quer) {
        // hoch: wie die App heute in allen Varianten – Auswahl schließt, Wischen aus der Mitte holt herein, Abdunkelung schließt
        await p.click('.kachel[data-i="2"]'); await ruhe(p);
        ok(await p.textContent('#titel') === 'Portugal 2025', `${t}: Auswahl öffnet nicht`);
        ok(await links(p, '#liste') === null, `${t}: hoch schließt die Seitenleiste nach der Auswahl nicht`);
        await ziehe(p, 300, h * 0.85, 760, h * 0.85);
        ok(await links(p, '#liste') === 10, `${t}: hoch Wischen aus der Mitte`);
        await p.mouse.click(w - 40, h / 2); await ruhe(p);
        ok(await links(p, '#liste') === null, `${t}: Abdunkelung antippen schließt nicht`);
        continue;
      }
      // quer: Auswahl lässt die Seitenleiste stehen; Wischen nach links auf ihr ändert nichts (Ausblenden nur mit panel-left)
      await p.click('.kachel[data-i="2"]'); await ruhe(p);
      ok(await links(p, '#liste') === 10, `${t}: quer verschwindet die Seitenleiste nach der Auswahl`);
      await ziehe(p, 300, h / 2, 20, h / 2);
      ok(await links(p, '#liste') === 10, `${t}: quer schiebt Wischen nach links die Seitenleiste weg`);
      // oberster Tag bleibt beim Aus- und Einblenden
      await p.evaluate(() => { document.getElementById('inhaltRolle').scrollTop = 900; }); await p.waitForTimeout(100);
      const vorher = await obenTag(p);
      await p.click('#seitenknopf'); await ruhe(p);
      ok(await links(p, '#liste') === null, `${t}: panel-left blendet nicht aus`);
      ok((await inhalt(p)).l === 0 && (await inhalt(p)).w === w, `${t}: Inhalt nach dem Ausblenden nicht ganz breit`);
      const nachher = await obenTag(p);
      ok(nachher?.tag === vorher?.tag, `${t}: oberster Tag beim Ausblenden verloren (${vorher?.tag} → ${nachher?.tag})`);
      await bild('aus');
      // aus der Mitte nach rechts, über die halbe Breite
      await ziehe(p, 500, h * 0.8, 760, h * 0.8);
      if (v === 'heute') {
        ok(await links(p, '#liste') === null, `${t}: Heute holt Wischen quer die Seitenleiste`);
        await p.click('#seitenknopf'); await ruhe(p);
        ok(await links(p, '#liste') === 10 && (await inhalt(p)).l === FEST, `${t}: panel-left blendet nicht ein`);
        continue;
      }
      ok(await links(p, '#liste') === 10, `${t}: Wischen aus der Mitte holt die Seitenleiste nicht`);
      ok((await inhalt(p)).l === FEST && (await inhalt(p)).w === w - FEST, `${t}: Inhalt rastet nicht neben der Seitenleiste ein`);
      ok((await obenTag(p))?.tag === vorher?.tag, `${t}: oberster Tag beim Einrasten verloren`);
      await bild('ein');
      await p.click('#seitenknopf'); await ruhe(p);
      // halb ziehen: Seitenleiste folgt dem Finger, A: Inhalt bleibt stehen, B: Inhalt rückt mit; unter der Hälfte losgelassen → zurück
      await ziehe(p, 500, h * 0.8, 640, h * 0.8, { los: false });
      const l = await p.evaluate(() => document.getElementById('liste').getBoundingClientRect().left);
      ok(Math.abs(l - (10 - 380 + 136)) < 30, `${t}: Seitenleiste folgt dem Finger nicht (${Math.round(l)})`);
      const mit = (await inhalt(p)).l;
      ok(v === 'a' ? mit === 0 : Math.abs(mit - 136) < 30, `${t}: Inhalt beim Ziehen falsch (${mit})`);
      await bild('zieht');
      await p.waitForTimeout(150); await p.mouse.up(); await ruhe(p);
      ok(await links(p, '#liste') === null && (await inhalt(p)).l === 0, `${t}: unter der Hälfte losgelassen, trotzdem eingerastet`);
      // schnell wischen: kurzer Weg reicht
      await ziehe(p, 500, h * 0.8, 600, h * 0.8, { schnell: true });
      ok(await links(p, '#liste') === 10, `${t}: schnelles Wischen holt die Seitenleiste nicht`);
      await p.click('#seitenknopf'); await ruhe(p);
      // Vorrang: senkrecht, schräg (mehr senkrecht), Bilderstreifen, nach links → nichts
      await ziehe(p, 600, h * 0.7, 604, h * 0.3);
      ok(await links(p, '#liste') === null, `${t}: senkrechtes Wischen holt die Seitenleiste`);
      await ziehe(p, 600, h / 2, 630, h / 2 - 60);
      ok(await links(p, '#liste') === null, `${t}: schräges Wischen holt die Seitenleiste`);
      await p.evaluate(() => { document.getElementById('inhaltRolle').scrollTop = 0; }); await p.waitForTimeout(100);
      const s = await p.locator('#streifen').boundingBox();
      await ziehe(p, s.x + 20, s.y + s.height / 2, s.x + 400, s.y + s.height / 2);
      ok(await links(p, '#liste') === null, `${t}: Wischen im Bilderstreifen holt die Seitenleiste`);
      await ziehe(p, 900, h / 2, 300, h / 2);
      ok(await links(p, '#liste') === null, `${t}: nach links wischen bewegt etwas`);
      // Berührung wie Safari (S-10): leicht schräg, 14 px senkrecht → Geste hält den Finger, Seitenleiste kommt, nichts rollt
      const r = await safariWischen(p, 500, h * 0.6, zug(420, 14)); await ruhe(p);
      ok(!r.abgebrochen, `${t}: Safari bricht das Hereinwischen ab (${JSON.stringify(r)})`);
      ok(await links(p, '#liste') === 10, `${t}: Berührung leicht schräg holt die Seitenleiste nicht`);
      await p.click('#seitenknopf'); await ruhe(p);
      // Berührung senkrecht: Safari rollt, keine Seitenleiste
      const r2 = await safariWischen(p, 600, h * 0.7, zug(3, -200)); await ruhe(p);
      ok(r2.abgebrochen && await links(p, '#liste') === null, `${t}: senkrechte Berührung rollt nicht oder holt die Seitenleiste`);
      // Drehen während des Ziehens bricht ab, Zustand bleibt ausgeblendet (15.4)
      await ziehe(p, 500, h * 0.8, 640, h * 0.8, { los: false });
      await p.setViewportSize({ width: h, height: w }); await p.waitForTimeout(200);
      await p.mouse.up(); await ruhe(p);
      ok(await links(p, '#liste') === null, `${t}: Drehen während des Ziehens – Seitenleiste erscheint`);
      await p.setViewportSize({ width: w, height: h }); await ruhe(p);
      ok(await links(p, '#liste') === null && (await inhalt(p)).l === 0, `${t}: nach dem Zurückdrehen nicht ausgeblendet`);
    }
    await p.close();
  }
  await b.close();
}
console.log(fehler ? `${fehler} Fehler` : 'alles grün');
process.exit(fehler ? 1 : 0);
