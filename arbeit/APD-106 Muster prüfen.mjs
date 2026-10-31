// APD-106 · Muster mit Messung vor der Übergabe prüfen (Zusammenarbeit 0 Nr. 20 und 2.7).
//   node "arbeit/APD-106 Muster prüfen.mjs" [--nur-chromium]   – Chromium und WebKit, iPhone hoch (wie P-87/1 und P-87/7) und iPad quer (P-87/6)
// Spielt die acht Fälle so durch, wie die Anleitung im Muster sie nennt – im Safari-Modell der Prüfungen: Zeiger- und Berührungsereignisse
// direkt am Element (wie `finger` in tests/ablauf.mjs), Textgröße als Grundgröße (wie PRUEF_TEXT). Die geteilte Datei wird mit
// auswerten.mjs bewertet und muss zum Modell passen (so sollte 4.48.0 am Gerät arbeiten):
//   Fälle 1–2 Großanzeige auf, ganz auf dem Bildschirm, Loslassen löst ‚Mehr‘ bzw. x genau einmal aus · Fälle 3–4 ‚Mehr‘ blass (0,35),
//   wegziehen löst nichts aus · Fälle 5–6 Zeile grau, Loslassen öffnet sie · Fälle 7–8 Smiley hebt sich ab 0,15 s, Frage nach 0,6 s,
//   ‚Abbrechen‘ · nirgends ein Abbruch (pointercancel) und keine Textauswahl.
// Außerdem: am Gerät nur ‚aufgenommen‘ (keine Bewertung auf dem Bildschirm), ‚Messung teilen‘ erst nach allen Fällen, abgehakte Fälle,
// Variante B setzt html.b, keine Texte in der Datei, ‚Fall neu‘ und Neuladen.
// Gegenprobe (muss rot werden): ?gegenprobe=ohne-ax – html.ts-ax wird immer wieder entfernt, die Großanzeige kommt nie.
import { createRequire } from 'node:module';
import { lies, werteAus, bericht } from './APD-106 auswerten.mjs';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');

const URL_MUSTER = new URL('./APD-106 Messung.html', import.meta.url).href;
const LAGEN = {
  'iPhone hoch': { viewport: { width: 393, height: 852 }, isMobile: true },
  'iPad quer': { viewport: { width: 1180, height: 820 } },
};
const fehler = [];
const pruefe = (ok, was) => { if (!ok) fehler.push(was); };

// Finger im Modell: touchstart + pointerdown am Element, warten, ggf. wegziehen, pointerup + touchend, dann der Klick (ohne Wegziehen)
const halte = (p, sel, { ms = 1000, weg = 0 } = {}) => p.evaluate(async ({ sel, ms, weg }) => {
  const warte = n => new Promise(r => setTimeout(r, n));
  const el = document.querySelector(sel); if (!el) return 'fehlt ' + sel;
  const r = el.getBoundingClientRect(); let x = r.left + r.width / 2, y = r.top + r.height / 2;
  const ziel = () => document.elementFromPoint(x, y) || el;
  const tip = typ => { try { const t = new Touch({ identifier: 7, target: el, clientX: x, clientY: y });
    el.dispatchEvent(new TouchEvent(typ, { touches: typ === 'touchend' ? [] : [t], changedTouches: [t], bubbles: true, cancelable: true, composed: true })); } catch {} };
  const zei = typ => (typ === 'pointerdown' ? el : ziel()).dispatchEvent(new PointerEvent(typ, { pointerId: 7, pointerType: 'touch', isPrimary: true,
    clientX: x, clientY: y, button: 0, buttons: typ === 'pointerup' ? 0 : 1, bubbles: true, cancelable: true, composed: true }));
  tip('touchstart'); zei('pointerdown');
  await warte(ms);
  if (weg) { for (let i = 1; i <= 4; i++) { y += weg / 4; zei('pointermove'); await warte(16); } }
  zei('pointerup'); tip('touchend');
  if (!weg && el.isConnected) el.click();
  await warte(400);
  return 'ok';
}, { sel, ms, weg });
const tippe = async (p, sel) => { await halte(p, sel, { ms: 60 }); };
const schrift = (p, px) => p.evaluate(px => {
  document.getElementById('modell-text')?.remove();
  if (px) { const s = document.createElement('style'); s.id = 'modell-text'; s.textContent = `html { font-size: ${px}px !important; }`; document.head.append(s); }
}, px).then(() => p.waitForTimeout(700));

async function fall(p, nr) {
  if (nr === 1) await schrift(p, 53);
  if (nr === 3) await schrift(p, 0);
  if (nr === 1) await halte(p, '#mainMore');
  if (nr === 2) { await p.click('#fensterAuf'); await p.waitForTimeout(1000); await halte(p, '#dlgX'); }
  if (nr === 3 || nr === 4) await halte(p, '#mainMore', { weg: 40 });
  if (nr === 5 || nr === 6) { await halte(p, '#zeile td + td'); await p.waitForTimeout(100); }
  if (nr === 7 || nr === 8) {
    await p.click('#fensterAuf'); await p.waitForTimeout(1000);
    await halte(p, '[data-m="0"]', { ms: 900 });
    await p.locator('.pop button', { hasText: 'Abbrechen' }).click(); await p.waitForTimeout(300);
    await p.click('#dlgX'); await p.waitForTimeout(300);
  }
  await p.click('#fertig'); await p.waitForTimeout(150);
}

async function lauf(browser, lage, { gegen = false } = {}) {
  const ctx = await browser.newContext({ ...LAGEN[lage], hasTouch: true, colorScheme: 'light' });
  const p = await ctx.newPage();
  const skriptfehler = []; p.on('pageerror', e => skriptfehler.push(e.message.split('\n')[0]));
  const name = `${browser.browserType().name()} ${lage}${gegen ? ' Gegenprobe' : ''}`;
  await p.goto(URL_MUSTER + (gegen ? '?gegenprobe=ohne-ax' : ''));
  await p.waitForFunction(() => window.a106);
  const anzahl = await p.evaluate(() => a106.FAELLE.length);
  if (!gegen) {
    pruefe(await p.isDisabled('#teilen'), `${name}: ‚Messung teilen‘ vor dem ersten Fall nicht gesperrt`);
    await p.click('#nochmal');
    await p.reload(); await p.waitForFunction(() => window.a106);
    pruefe(/neu geladen/.test(await p.evaluate(() => a106.text())), `${name}: Aufnahme nach Neuladen verloren`);
  }
  const varianten = [];
  for (let nr = 1; nr <= anzahl; nr++) {
    varianten.push(await p.evaluate(() => document.documentElement.classList.contains('b') ? 'B' : 'A'));
    await fall(p, nr);
    if (!gegen && nr < anzahl) pruefe(await p.isDisabled('#teilen'), `${name}: ‚Messung teilen‘ nach Fall ${nr} schon frei`);
  }
  const text = await p.evaluate(() => a106.text());
  const sicht = await p.evaluate(() => document.querySelector('.mess:last-of-type')?.innerText + document.querySelector('#schritt').innerText);
  const haken = await p.locator('#liste .h', { hasText: '✓' }).count();
  const faelleDef = await p.evaluate(() => a106.FAELLE.map(f => f.v));
  await ctx.close();
  const ergebnis = werteAus(lies(text));
  pruefe(!skriptfehler.length, `${name}: Skriptfehler ${skriptfehler.join(' | ')}`);
  if (!gegen) {
    pruefe(!/grau|blass|Ergebnis|nicht ok|Großanzeige \d/i.test(sicht.replace(/merke dir: grau oder blass\?|grau oder blass\?|grau, größer/g, '')), `${name}: Bewertung auf dem Bildschirm`);
    pruefe(new RegExp(`${anzahl} von ${anzahl} aufgenommen`).test(sicht), `${name}: Zähler ‚${anzahl} von ${anzahl} aufgenommen‘ fehlt`);
    pruefe(haken === anzahl, `${name}: ${haken} statt ${anzahl} Fälle abgehakt`);
    pruefe(JSON.stringify(varianten) === JSON.stringify(faelleDef), `${name}: Variante je Fall ${varianten.join('')} statt ${faelleDef.join('')}`);
    pruefe(!/Altstadt|Markt|Verlauf|Mehr|Ausgabe|Abbrechen|entfernen\?|Fr, 23/.test(text.replace(/^#.*$/gm, '')), `${name}: Text in der Messdatei`);
  }
  const ab = [];
  const F = n => ergebnis.find(e => e.nr === n);
  for (let nr = 1; nr <= anzahl; nr++) if (!F(nr)?.fertig) ab.push(`Fall ${nr} fehlt in der Datei`);
  for (const n of [1, 2]) {
    const f = F(n); if (!f) continue;
    if (!f.ax) ab.push(`Fall ${n}: Schrift nicht AX (ts ${f.ts})`);
    if (f.gross < 1) ab.push(`Fall ${n}: keine Großanzeige`);
    else if (!f.grossLage.every(g => g.drin && g.display !== 'none' && g.sicht === 'visible' && g.opacity > 0.5)) ab.push(`Fall ${n}: Großanzeige nicht ganz zu sehen`);
    const soll = n === 1 ? 'mainMore' : 'dlgX';
    if (f.ausgeloest.filter(a => a === soll).length !== 1) ab.push(`Fall ${n}: ${soll} ${f.ausgeloest.filter(a => a === soll).length}-mal ausgelöst`);
  }
  for (const n of [3, 4]) {
    const f = F(n); if (!f) continue;
    const b = f.beruehrt.find(x => x.ziel === 'mainMore');
    if (!b) ab.push(`Fall ${n}: ‚Mehr‘ nicht berührt`); else if (Math.abs(b.opacity - 0.35) > 0.02) ab.push(`Fall ${n}: ‚Mehr‘ opacity ${b.opacity} statt 0,35`);
    if (f.ausgeloest.length) ab.push(`Fall ${n}: nach Wegziehen ausgelöst ${f.ausgeloest.join(', ')}`);
  }
  for (const n of [5, 6]) {
    const f = F(n); if (!f) continue;
    if (!f.beruehrt.some(x => x.ziel.startsWith('zeile'))) ab.push(`Fall ${n}: Zeile nicht grau`);
    if (!f.ausgeloest.includes('zeile')) ab.push(`Fall ${n}: Zeile nicht geöffnet`);
  }
  for (const n of [7, 8]) {
    const f = F(n); if (!f) continue;
    const h = f.hebt[0];
    if (!h) ab.push(`Fall ${n}: Smiley hebt sich nicht`);
    else {
      if (h.nach < 100 || h.nach > 300) ab.push(`Fall ${n}: hebt nach ${h.nach} ms statt etwa 150`);
      if (!h.frueh || h.frueh.transform === 'none' || !/drop-shadow/.test(h.frueh.filter)) ab.push(`Fall ${n}: angehoben ohne Größe/Schatten (${JSON.stringify(h.frueh)})`);
    }
    if (!f.frage.length) ab.push(`Fall ${n}: keine Frage`); else if (f.frage[0].nach < 550 || f.frage[0].nach > 800) ab.push(`Fall ${n}: Frage nach ${f.frage[0].nach} ms statt etwa 600`);
  }
  for (const f of ergebnis) {
    if (f.abbruch.length) ab.push(`Fall ${f.nr}: Abbruch ${f.abbruch.map(a => a.was).join(', ')}`);
    if (f.auswahl) ab.push(`Fall ${f.nr}: Textauswahl ${f.auswahl}`);
  }
  return { name, bericht: bericht(ergebnis), abweichung: ab };
}

const browser = process.argv.includes('--nur-chromium') ? ['chromium'] : ['chromium', 'webkit'];
for (const art of browser) {
  const b = await pw[art].launch();
  for (const lage of Object.keys(LAGEN)) {
    const r = await lauf(b, lage);
    console.log(`— ${r.name}\n${r.bericht}`);
    for (const a of r.abweichung) fehler.push(`${r.name}: ${a}`);
    const g = await lauf(b, lage, { gegen: true });
    console.log(`— ${g.name}: ${g.abweichung.length ? 'rot wie erwartet (' + g.abweichung.join('; ') + ')' : 'NICHT rot'}`);
    pruefe(g.abweichung.length > 0, `${g.name}: Gegenprobe nicht rot`);
  }
  await b.close();
}
console.log(fehler.length ? `✗ ${fehler.length} Fehler:\n` + fehler.join('\n') : '✓ Muster APD-106 passt zum Modell, Gegenprobe rot');
process.exit(fehler.length ? 1 : 0);
