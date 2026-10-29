// APD-81 · Muster mit Messung vor der Übergabe prüfen (Zusammenarbeit 0 Nr. 20 und 2.7).
//   node "arbeit/APD-81 Muster prüfen.mjs" [--nur-chromium]   – Chromium und WebKit, iPad hoch und quer
// Spielt die vier Fälle so durch, wie die Anleitung im Muster sie nennt (ins Feld tippen, ⓧ, Rückgängig, ‚Fall fertig‘); die Undo-Taste
// und das Wischen mit drei Fingern sind im Modell der Bearbeiten-Befehl ‚undo‘ – genau das löst UIKit am Gerät aus (Vermutung, die die
// Messung klärt). Die geteilte Datei wird mit auswerten.mjs bewertet und muss zum Modell passen:
//   Fall 1 (wert) nicht zurückgeholt · Fälle 2–4 (befehl) zurückgeholt, Fall 4 erst mit dem zweiten Rückgängig.
// Außerdem: am Gerät nur ‚aufgenommen‘ (keine Bewertung auf dem Bildschirm), ‚Messung teilen‘ erst nach allen Fällen, abgehakte Fälle,
// ⓧ oben rechts auf Höhe der ersten Zeile (APD-81/F-1), keine Texte in der Datei, ‚Fall neu‘ und Neuladen.
// Gegenprobe (muss rot werden): ?gegenprobe=wert – auch die Fälle ‚befehl‘ leeren über den Wert.
import { createRequire } from 'node:module';
import { lies, werteAus, bericht } from './APD-81 auswerten.mjs';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');

const URL_MUSTER = new URL('./APD-81 Muster.html', import.meta.url).href;
const LAGEN = {
  'iPad hoch': { viewport: { width: 834, height: 1162 }, screen: { width: 834, height: 1194 } },
  'iPad quer': { viewport: { width: 1194, height: 802 }, screen: { width: 1194, height: 834 } },
};
const ERWARTET = { 1: false, 2: true, 3: true, 4: true };
const fehler = [];
const pruefe = (ok, was) => { if (!ok) fehler.push(was); };
const rueckgaengig = p => p.evaluate(() => document.execCommand('undo'));

async function fall(p, nr) {
  await p.tap('#feld');
  await p.tap('#fx');
  if (nr === 4) await p.keyboard.type('Hallo');
  await rueckgaengig(p);
  if (nr === 4) await rueckgaengig(p);
  await p.tap('#fertig');
}

async function lauf(browser, lage, { gegen = false } = {}) {
  const ctx = await browser.newContext({ ...LAGEN[lage], hasTouch: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  const name = `${browser.browserType().name()} ${lage}${gegen ? ' Gegenprobe' : ''}`;
  await p.goto(URL_MUSTER + (gegen ? '?gegenprobe=wert' : ''));
  await p.waitForFunction(() => window.a81);
  const anzahl = await p.evaluate(() => a81.FAELLE.length);
  if (!gegen) {
    pruefe(await p.isDisabled('#teilen'), `${name}: ‚Messung teilen‘ vor dem ersten Fall nicht gesperrt`);
    // APD-81/F-1: ⓧ erst mit Fokus, oben rechts auf Höhe der ersten Zeile; der Text läuft nicht darunter
    pruefe(!(await p.isVisible('#fx')), `${name}: ⓧ ohne Fokus sichtbar`);
    await p.tap('#feld');
    const lageX = await p.evaluate(() => {
      const f = document.querySelector('#feld').getBoundingClientRect(), x = document.querySelector('#fx').getBoundingClientRect();
      const pr = parseFloat(getComputedStyle(document.querySelector('#feld')).paddingRight);
      return { rechts: Math.round(f.right - x.right), oben: Math.round(x.top - f.top), w: x.width, h: x.height, pr };
    });
    pruefe(lageX.rechts >= 0 && lageX.rechts <= 2 && lageX.oben >= 0 && lageX.oben <= 4, `${name}: ⓧ nicht oben rechts (${JSON.stringify(lageX)})`);
    pruefe(lageX.w >= 44 && lageX.h >= 44 && lageX.pr >= 44, `${name}: ⓧ kleiner als 44 × 44 oder Text läuft darunter (${JSON.stringify(lageX)})`);
    await p.evaluate(() => document.activeElement.blur());
    // ‚Fall neu‘ füllt das Feld wieder; Neuladen behält die Aufnahme
    await p.tap('#feld'); await p.tap('#fx');
    pruefe(await p.inputValue('#feld') === '', `${name}: ⓧ leert nicht`);
    pruefe(await p.evaluate(() => document.activeElement?.id) === 'feld', `${name}: Fokus nach ⓧ weg`);
    await p.tap('#nochmal');
    pruefe((await p.inputValue('#feld')).length > 0, `${name}: ‚Fall neu‘ füllt das Feld nicht`);
    await p.reload(); await p.waitForFunction(() => window.a81);
    pruefe(/neu geladen/.test(await p.evaluate(() => a81.text())), `${name}: Aufnahme nach Neuladen verloren`);
  }
  for (let nr = 1; nr <= anzahl; nr++) {
    await fall(p, nr);
    if (!gegen && nr < anzahl) pruefe(await p.isDisabled('#teilen'), `${name}: ‚Messung teilen‘ nach Fall ${nr} schon frei`);
  }
  const text = await p.evaluate(() => a81.text());
  const sicht = await p.evaluate(() => document.body.innerText);
  const haken = await p.locator('#liste .h', { hasText: '✓' }).count();
  await ctx.close();
  const ergebnis = werteAus(lies(text));
  if (!gegen) {
    pruefe(!(await Promise.resolve(/zurück|nicht ok|Ergebnis/i.test(sicht))), `${name}: Bewertung auf dem Bildschirm`);
    pruefe(/4 von 4 aufgenommen/.test(sicht), `${name}: Zähler ‚4 von 4 aufgenommen‘ fehlt`);
    pruefe(haken === anzahl, `${name}: ${haken} statt ${anzahl} Fälle abgehakt`);
    pruefe(!/Altstadt|Nudel|Tempel|Onsen|Hallo/.test(text), `${name}: Text in der Messdatei`);
  }
  const abweichung = [];
  for (let nr = 1; nr <= anzahl; nr++) {
    const x = ergebnis.find(e => e.nr === nr);
    if (!x) { abweichung.push(`Fall ${nr} fehlt in der Datei`); continue; }
    if (!x.geleert) abweichung.push(`Fall ${nr} nicht geleert`);
    if (x.zurueck !== ERWARTET[nr]) abweichung.push(`Fall ${nr}: ${x.zurueck ? 'zurückgeholt' : 'nicht zurückgeholt'}, Modell ${ERWARTET[nr] ? 'zurückgeholt' : 'nicht zurückgeholt'}`);
  }
  return { name, bericht: bericht(ergebnis), abweichung };
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
console.log(fehler.length ? `✗ ${fehler.length} Fehler:\n` + fehler.join('\n') : '✓ Muster APD-81 passt zum Modell, Gegenprobe rot');
process.exit(fehler.length ? 1 : 0);
