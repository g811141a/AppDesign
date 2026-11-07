// APD-115 · Muster ‚Rollen wie Apple‘ (V-3) und ‚Bezeichnung über dem Feld‘ vor der Übergabe im Safari-Modell prüfen (Zusammenarbeit 0 Nr. 20, 2.7;
// Testfall-Liste arbeit/APD-115 Testfall-Liste.md APD-115/M-1 bis M-10).
//   node "arbeit/APD-115 Muster prüfen.mjs"        (im Ordner AppDesign; Browser über PRUEF_BROWSER, Standard chromium)
//   PRUEF_V=heute …                                 Gegenprobe: das Muster mit dem Rollen von 4.54.0 (fassung/4.54.0/ui.js) – M-1 bis M-3 müssen rot werden
import { createRequire } from 'node:module';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const { pruefung } = await import('../tests/pruefe.mjs');
const { createCheck } = await import('../tests/hig.mjs');
const { checkTastaturStill, STILL_LEISTEN, STILL_LINKS } = await import('../tests/ablauf.mjs');
const { safariModell } = await import('../tests/safari.mjs');
const t = pruefung('APD-115 Muster', pw, { hig: createCheck({ skipTargets: ['.box.day .ln:not(.q) a', 'table.days .ln:not(.q) a'] }) });
const heute = process.env.PRUEF_V === 'heute';
const MUSTER = new URL('./APD-115/index.html', import.meta.url).href;
const TAG = '2026-08-25', LANG = '2026-08-27';   // kurzer Verlauf; langer Verlauf (14 Zeilen)
const b = await t.browser();

// Feld an den unteren Rand des Fensterinhalts rollen (wie im Befund ‚unten‘), so dass es gerade noch ganz sichtbar ist
const ansEnde = (p, sel) => p.evaluate(sel => { const f = document.querySelector(sel), c = f.closest('.dlg-body');
  c.scrollTop += f.getBoundingClientRect().bottom - (Math.min(c.getBoundingClientRect().bottom, innerHeight) - 4); }, sel);
// Lage nach dem Antippen (Bildschirm = Lage minus offsetTop)
const lage = (p, sel) => p.evaluate(sel => { const o = __safari.top(), f = document.querySelector(sel), r = f.getBoundingClientRect(), c = f.closest('.dlg-body');
  return { oben: Math.round(r.top - o), unten: Math.round(r.bottom - o), kb: __safari.hoehe(), ct: Math.round(c.getBoundingClientRect().top - o), cb: Math.round(c.getBoundingClientRect().bottom - o), y: Math.round(c.scrollTop),
    fokus: document.activeElement === f, offen: __safari.offen }; }, sel);
async function oeffne(p, v, iso) {
  await p.goto(MUSTER + '?v=' + v); await p.waitForTimeout(500);
  if (await p.locator('#side .side-row[data-id="muster"]').isVisible().catch(() => false)) { await p.locator('#side .side-row[data-id="muster"]').click(); await p.waitForTimeout(400); }
  await p.locator(`#app [data-day="${iso}"]`).first().click(); await p.waitForTimeout(600);
}
async function neu(ansicht, v, iso = TAG) {
  const p = await t.seite(b, ansicht, { theme: 'light' });
  if (heute) await p.route(/APD-115\/ui\.js$/, r => r.fulfill({ path: new URL('../fassung/4.54.0/ui.js', import.meta.url).pathname, contentType: 'text/javascript' }));
  await oeffne(p, v, iso);
  await safariModell(p, ansicht, { auto: true, leisten: STILL_LEISTEN, links: STILL_LINKS });
  return p;
}
const E = (regel, was) => t.liste([`${t.ort}: ${regel} ${was}`]);

for (const ansicht of ['iPhone hoch', 'iPad quer', 'iPad hoch', 'iPhone quer']) {
  for (const v of ['a', 'b']) {
    t.ort = `${ansicht} Variante ${v.toUpperCase()}${heute ? ' (Gegenprobe heute)' : ''}`;
    const quer = ansicht === 'iPhone quer';
    // APD-115/M-1, M-2, M-3: Feld am unteren Rand antippen – es rollt nur so weit, dass es 16 px über der Tastatur endet (± 3); kein Sprung
    for (const [m, sel] of [['M-1', '#fProgram'], ['M-2', '#fComment'], ['M-3', '#fQuarter'], ['M-3', '#fPrice']]) {
      const p = await neu(ansicht, v);
      if (sel === '#fPrice' && !await p.locator(sel).isVisible()) { await p.close(); continue; }
      await ansEnde(p, sel); await p.waitForTimeout(300);
      const y0 = await p.evaluate(sel => document.querySelector(sel).closest('.dlg-body').scrollTop, sel);
      await p.tap(sel); await p.waitForTimeout(800);
      const l = await lage(p, sel), lim = Math.min(l.kb, l.cb) - 16, passt = l.unten - l.oben <= lim - l.ct - 25, still = Math.abs(l.y - y0) <= 1;
      if (!l.fokus || !l.offen) E(`APD-115/${m}`, `${sel}: kein Fokus bzw. keine Tastatur`);
      else if (passt && (still ? l.unten > lim + 3 : Math.abs(l.unten - lim) > 3)) E(`APD-115/${m}`, `${sel} endet bei ${l.unten} px statt ${lim} (16 px über Tastatur ab ${l.kb} bzw. Fensterende ${l.cb}, gerollt ${y0} → ${l.y}) – ${l.unten < lim ? 'rollt zu weit (nicht wie Apple)' : 'zu wenig'}`);
      else if (!passt) console.log(`ℹ ${t.ort} APD-115/${m} ${sel} höher als der sichtbare Teil: ${l.oben}–${l.unten} px, Tastatur ab ${l.kb}`);
      await p.close();
      // kein Sprung (R-4.5, APD-36/B-4); ‚nicht ganz über der Tastatur‘ gilt für hohe Textfelder nach V-3 nicht mehr (dort M-5)
      const q = await neu(ansicht, v);
      t.liste((await checkTastaturStill(q, { field: sel, vorher: () => ansEnde(q, sel), where: `${t.ort} ${m} ${sel}` })).filter(x => passt || !/nicht ganz über der Tastatur/.test(x)));
      await q.close();
    }
    // APD-115/M-4: Feld liegt schon über der Tastatur – nichts rollt (Verlauf oben im Fenster, iPad hoch und iPhone hoch)
    if (!quer && ansicht !== 'iPad quer') {
      const p = await neu(ansicht, v);
      const v0 = await p.evaluate(() => ({ y: document.querySelector('.dlg-body').scrollTop, ueber: document.querySelector('#fProgram').getBoundingClientRect().bottom <= innerHeight - __safari.kb - 16 }));
      const y0 = v0.y;
      await p.tap('#fProgram'); await p.waitForTimeout(700);
      const l = await lage(p, '#fProgram');
      if (v0.ueber && Math.abs(l.y - y0) > 1) E('APD-115/M-4', `Verlauf lag über der Tastatur, trotzdem rollt der Inhalt (${y0} → ${l.y} px)`);
      await p.close();
    }
    // APD-115/M-5: langer Verlauf (14 Zeilen) – eine Zeile unten antippen: Cursorzeile und eine halbe Zeile darunter über der Tastatur (nur berichtet, wenn
    // Safari im Modell verschiebt: hohe Felder sind nicht gemessen)
    {
      const p = await neu(ansicht, v, LANG);
      await ansEnde(p, '#fProgram').catch(() => {});
      await p.evaluate(() => { const f = document.querySelector('#fProgram'), c = f.closest('.dlg-body'), r = f.getBoundingClientRect();
        if (r.top < c.getBoundingClientRect().top) c.scrollTop -= c.getBoundingClientRect().top - r.top - 10; });
      const z = await p.evaluate(() => { const f = document.querySelector('#fProgram'), r = f.getBoundingClientRect(), lh = parseFloat(getComputedStyle(f).lineHeight);
        const sicht = Math.min(f.closest('.dlg-body').getBoundingClientRect().bottom, innerHeight); return { x: r.left + 40, y: Math.min(r.bottom, sicht) - lh, lh }; });
      await p.touchscreen.tap(z.x, z.y); await p.waitForTimeout(800);
      const l = await p.evaluate(() => { const o = __safari.top(), f = document.querySelector('#fProgram'), s = getComputedStyle(f), lh = parseFloat(s.lineHeight);
        // Cursorzeile aus dem Spiegel (wie ui.js)
        const r = f.getBoundingClientRect(), m = document.createElement('div');
        for (const k of ['boxSizing', 'width', 'fontFamily', 'fontSize', 'lineHeight', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'borderTopWidth', 'borderLeftWidth', 'borderRightWidth', 'borderStyle']) m.style[k] = s[k];
        Object.assign(m.style, { position: 'absolute', visibility: 'hidden', left: '-9999px', top: '0', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' });
        m.textContent = f.value.slice(0, f.selectionEnd); const k = document.createElement('span'); k.textContent = '​'; m.append(k); document.body.append(m);
        const top = r.top + parseFloat(s.borderTopWidth) + k.offsetTop - o; m.remove();
        return { top: Math.round(top), unten: Math.round(top + lh * 1.5), kb: __safari.hoehe(), pan: __safari.top(), fokus: document.activeElement === f, ct: Math.round(f.closest('.dlg-body').getBoundingClientRect().top - o) }; });
      if (!l.fokus) E('APD-115/M-5', 'langer Verlauf: kein Fokus');
      else if (l.unten > l.kb + 1 || l.top < l.ct - 1) E('APD-115/M-5', `langer Verlauf: Cursorzeile ${l.top}–${l.unten} px (mit ½ Zeile) nicht zwischen Fensterkopf (${l.ct}) und Tastatur (${l.kb})${l.pan ? ` · Safari verschiebt im Modell ${l.pan} px` : ''}`);
      else if (l.pan) console.log(`ℹ ${t.ort} APD-115/M-5: Safari verschiebt im Modell ${l.pan} px (hohes Feld, am Gerät nicht gemessen)`);
      // APD-115/M-6: am Ende zwei neue Zeilen tippen – die Cursorzeile bleibt über der Tastatur
      await p.evaluate(() => { const f = document.querySelector('#fProgram'); f.setSelectionRange(f.value.length, f.value.length); });
      for (let i = 0; i < 2; i++) { await p.keyboard.press('Enter'); await p.keyboard.type('Neue Zeile ' + (i + 1)); await p.waitForTimeout(250); }
      const n = await p.evaluate(() => { const o = __safari.top(), f = document.querySelector('#fProgram'), r = f.getBoundingClientRect(), lh = parseFloat(getComputedStyle(f).lineHeight);
        return { unten: Math.round(r.bottom - parseFloat(getComputedStyle(f).paddingBottom) - o + lh / 2), kb: __safari.hoehe(), fokus: document.activeElement === f }; });
      if (n.fokus && n.unten > n.kb + 1) E('APD-115/M-6', `nach dem Tippen am Ende: letzte Zeile (mit ½ Zeile) endet bei ${n.unten} px, Tastatur ab ${n.kb}`);
      await p.close();
    }
    // APD-115/M-7: Feld wechseln bei offener Tastatur (Quartier → Ort) – kein Sprung
    {
      const p = await neu(ansicht, v);
      t.liste(await checkTastaturStill(p, { field: '#fQuarter', vorher: () => ansEnde(p, '#fQuarter'), wechsel: '#fPlace', where: `${t.ort} APD-115/M-7` }));
      await p.close();
    }
    // APD-115/M-7 geschärft (Befund APD-115/N-1 bis N-4, Messung 07.11.2026): wie am Gerät – Fenster oben, Quartier antippen, tippen, Ort antippen.
    // Wie Apple nur so weit wie nötig: ist Ort ganz über der Tastatur, rollt nichts; sonst einmal, bis es 16 px (± 3) über ihr endet.
    for (const vorher of ['oben', 'unten']) {
      const p = await neu(ansicht, v);
      if (vorher === 'unten') await ansEnde(p, '#fQuarter');
      await p.tap('#fQuarter'); await p.waitForTimeout(900);
      await p.keyboard.type('Hotel'); await p.waitForTimeout(300);
      const a = await lage(p, '#fPlace');
      await p.evaluate(() => { const c = document.querySelector('.dlg-body'); window.__schuebe = []; let y = c.scrollTop;
        c.addEventListener('scroll', () => { if (Math.abs(c.scrollTop - y) > 1) { __schuebe.push(Math.round(c.scrollTop - y)); y = c.scrollTop; } }); });
      await p.tap('#fPlace'); await p.waitForTimeout(900);
      const l = await lage(p, '#fPlace'), schuebe = await p.evaluate(() => __schuebe), lim = Math.min(l.kb, l.cb) - 16, war = a.unten <= Math.min(a.kb, a.cb) - 16 && a.oben >= a.ct;
      const wo = `Fenster ${vorher}, Ort vorher ${a.oben}–${a.unten} px, Tastatur ab ${a.kb}`;
      if (!l.fokus || !l.offen) E('APD-115/M-7', `${wo}: Ort ohne Fokus bzw. Tastatur`);
      else if (war && Math.abs(l.y - a.y) > 1) E('APD-115/M-7', `${wo}: Ort war ganz sichtbar, trotzdem rollt der Inhalt ${a.y} → ${l.y} px (Sprung, nicht wie Apple)`);
      else if (!war && Math.abs(l.unten - lim) > 3) E('APD-115/M-7', `${wo}: Ort endet bei ${l.unten} px statt ${lim} (16 px über der Tastatur) – ${l.unten < lim ? 'rollt zu weit' : 'zu wenig'}`);
      if (schuebe.length > 1) E('APD-115/M-7', `${wo}: rollt in ${schuebe.length} Schüben (${schuebe.join(', ')} px) statt in einem`);
      await p.close();
    }
    // APD-115/M-8 (Variante A): Bezeichnung ‚Verlauf‘ direkt über dem Feld, Vorschläge darunter; M-9 (B): Vorschläge zwischen Bezeichnung und Feld
    {
      const p = await neu(ansicht, v);
      const g = await p.evaluate(() => { const h = document.querySelector('#fProgram').closest('.step').querySelector('.step-head').getBoundingClientRect(),
        f = document.querySelector('#fProgram').getBoundingClientRect(), s = document.querySelector('#suggest').getBoundingClientRect();
        return { abstand: Math.round(f.top - h.bottom), vorschlaegeUnten: s.top >= f.bottom - 1 }; });
      if (v === 'a' && (g.abstand > 12 || !g.vorschlaegeUnten)) E('APD-115/M-8', `Variante A: Feld ${g.abstand} px unter der Bezeichnung, Vorschläge ${g.vorschlaegeUnten ? 'darunter' : 'darüber'}`);
      if (v === 'b' && g.vorschlaegeUnten) E('APD-115/M-9', 'Variante B: Vorschläge stehen unter dem Feld');
      await t.schritt(p, 'Tageserfassung offen', async () => {});   // APD-115/M-10 Grundregeln
      await p.close();
    }
  }
}
await t.ende(b);
