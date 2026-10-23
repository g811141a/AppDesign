// Prüft das Muster A-43 Teil 2 in Chromium und WebKit (iPad quer, hell): Varianten a, b, c × 17, 23, 33, 53 px, mit und ohne Fenster –
// nichts ragt rechts hinaus, Eingabefelder mindestens 16 px; Bilder für die Sichtprüfung. Aufruf: node 'A-43 Teil 2 Muster prüfen.mjs' <Bilderordner>
import { pathToFileURL } from 'url';
const pw = await import('/home/user/ReiseLogBuch/tests/node_modules/playwright/index.mjs');
const datei = pathToFileURL('/home/user/AppDesign/arbeit/A-43 Teil 2 Muster.html').href;
const aus = process.argv[2];
for (const n of ['chromium', 'webkit']) {
  const b = await pw[n].launch(n === 'chromium' ? { executablePath: '/opt/pw-browsers/chromium' } : {});
  for (const t of ['17', '23', '33', '53']) for (const f of ['0', '1']) for (const v of ['a', 'b', 'c']) {
    const p = await b.newPage({ viewport: { width: 1180, height: 820 } });
    const err = []; p.on('pageerror', e => err.push(e.message));
    await p.goto(`${datei}?v=${v}&t=${t}${f === '1' ? '&f=1' : ''}`); await p.waitForTimeout(200);
    const m = await p.evaluate(() => {
      const r = []; const W = innerWidth;
      for (const e of document.querySelectorAll('.kopf *, .kachel *, h1, .dkopf *, .cap button')) { const q = e.getBoundingClientRect(); if (q.width && q.right > W + 1) r.push(e.className || e.tagName); }
      const tb = document.querySelector('.tabelle'); return { raus: [...new Set(r)].slice(0, 4), tabelleRollt: tb.scrollWidth > tb.clientWidth + 1, ax: document.documentElement.classList.contains('ax'),
        s: getComputedStyle(document.documentElement).getPropertyValue('--s'), l: getComputedStyle(document.documentElement).getPropertyValue('--l'),
        input: getComputedStyle(document.querySelector('input')).fontSize };
    });
    console.log(n, `t=${t} f=${f} v=${v}`, JSON.stringify(m), err.join(' | '));
    if (n === 'chromium') await p.screenshot({ path: `${aus}/${t}-${f}-${v}.png` });
    await p.close();
  }
  await b.close();
}
