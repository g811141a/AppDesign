// Prüft das Muster A-43 Teil 2 in Chromium und WebKit: Variante A (gewählt) in iPad quer und hoch, iPhone hoch und quer, hell und dunkel,
// 17, 23, 33, 53 px, mit und ohne Fenster – nichts ragt rechts hinaus, Eingabefelder mindestens 16 px, ab 28 px untereinander;
// Bilder (Chromium) für die Sichtprüfung. Aufruf: PW=<pfad zu playwright/index.mjs> node 'A-43 Teil 2 Muster prüfen.mjs' <Bilderordner>
import { pathToFileURL } from 'url';
const pw = await import(process.env.PW || 'playwright');
const datei = pathToFileURL('/home/user/AppDesign/arbeit/A-43 Teil 2 Muster.html').href;
const aus = process.argv[2] || '.';
const GERAETE = { 'ipad-quer': [1180, 820], 'ipad-hoch': [820, 1180], 'iphone-hoch': [393, 852, true], 'iphone-quer': [852, 393, true] };
let fehler = 0;
for (const n of ['chromium', 'webkit']) {
  const b = await pw[n].launch(n === 'chromium' && process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  for (const [g, [w, h, mobil]] of Object.entries(GERAETE)) for (const d of ['hell', 'dunkel']) for (const t of ['17', '23', '33', '53']) for (const f of ['0', '1']) {
    const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: !!mobil && n === 'chromium', hasTouch: true });
    const err = []; p.on('pageerror', e => err.push(e.message));
    await p.goto(`${datei}?v=a&t=${t}&d=${d}${f === '1' ? '&f=1' : ''}`); await p.waitForTimeout(150);
    const m = await p.evaluate(() => {
      const W = innerWidth, raus = [];
      for (const e of document.querySelectorAll('.kopf *, .kachel *, h1, .dkopf *, .cap button, .dinhalt *, td')) { const q = e.getBoundingClientRect(); if (q.width && q.right > W + 1) raus.push(e.className || e.tagName); }
      const tb = document.querySelector('.tabelle');
      return { raus: [...new Set(raus)].slice(0, 4), rollt: tb.scrollWidth > tb.clientWidth + 1, ax: document.documentElement.classList.contains('ax'),
        input: parseFloat(getComputedStyle(document.querySelector('input')).fontSize), h1: getComputedStyle(document.querySelector('h1')).fontSize };
    });
    const ort = `${n} ${g} ${d} ${t} px${f === '1' ? ' Fenster' : ''}`;
    if (m.raus.length) { fehler++; console.log('FEHLER ragt hinaus', ort, m.raus.join(', ')); }
    if (m.rollt) { fehler++; console.log('FEHLER Tabelle rollt seitlich', ort); }
    if (m.input < 16) { fehler++; console.log('FEHLER Eingabefeld unter 16 px', ort); }
    if (m.ax !== (+t >= 28)) { fehler++; console.log('FEHLER untereinander', ort); }
    if (err.length) { fehler++; console.log('FEHLER Skript', ort, err.join(' | ')); }
    if (n === 'chromium') await p.screenshot({ path: `${aus}/${g}-${d}-${t}-${f}.png` });
    await p.close();
  }
  await b.close();
}
console.log(fehler ? `${fehler} Fehler` : 'Muster A-43 Teil 2: alles in Ordnung');
