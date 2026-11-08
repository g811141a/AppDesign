// APD-127 · Messmuster vor der Übergabe im Safari-Modell prüfen (Zusammenarbeit 0 Nr. 20 und 2.7; Sitzung Reiselogbuch 0099).
//   node "arbeit/APD-127 Muster prüfen.mjs"          (im Ordner AppDesign; PRUEF_BROWSER=webkit für WebKit; iPhone hoch wie P-100/2)
//   PRUEF_GEGEN=sprung …                            Gegenprobe: Variante B gleitet nicht (?gegenprobe=sprung) – APD-127/M-5 muss rot werden
// Spielt die sechs Fälle so durch, wie die Anleitung im Muster sie nennt (Fingertippen im Modell, Tastatur aus tests/safari.mjs), wertet die
// geteilte Datei mit ‚APD-127 auswerten.mjs‘ aus und prüft, dass sie zum Modell und zum Code von 4.56.0 passt:
//   APD-127/M-1 Mehr-Menü: zweimal auf in 0,35 s (250–420 ms – die Kurve endet so flach, dass die letzten Bilder unter 1 px liegen), zu in 0,25 s (200–320 ms), gleitet (mehr als 2 Bilder)
//   APD-127/M-2 Fenster: gleitet herein und als Abbild hinaus (je mehr als 2 Bilder)
//   APD-127/M-3 Feld oben: kein Rollen im Fenster (froll bleibt), die Tastatur geht auf (vh kleiner)
//   APD-127/M-4 Feld unten, Variante A: ‚Wie war was?‘ kommt in einem Bild an seinen Platz (Sprung – so arbeitet 4.56.0 laut Code, R-4.5)
//   APD-127/M-5 Feld unten, Variante B: derselbe Weg, aber gleitend in 250–420 ms; Endlage wie A (± 2 px)
//   APD-127/M-6 Ablauf: am Gerät nur ‚aufgenommen‘, ‚Messung teilen‘ erst nach allen Fällen, keine Texte in der Datei, Neuladen behält die Messung
import { createRequire } from 'node:module';
import { lies, werteAus, bericht } from './APD-127 auswerten.mjs';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const { safariModell } = await import('../tests/safari.mjs');
const art = process.env.PRUEF_BROWSER || 'chromium', gegen = process.env.PRUEF_GEGEN || '';
const URL_MUSTER = new URL('./APD-127/index.html', import.meta.url).href + (gegen ? '?gegenprobe=' + gegen : '');
const fehler = [], F = (m, was) => fehler.push(`APD-127/${m} ${art}${gegen ? ' (Gegenprobe ' + gegen + ')' : ''}: ${was}`);
const b = await pw[art].launch();
const ctx = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 1, hasTouch: true });
const p = await ctx.newPage();
await p.goto(URL_MUSTER); await p.waitForTimeout(400);
await safariModell(p, 'iPhone hoch', { auto: true });
const tip = async (sel, ms = 700) => { await p.tap(sel); await p.waitForTimeout(ms); };
const tastaturZu = async () => { await p.evaluate(() => document.activeElement?.blur()); await p.waitForTimeout(700); };

// M-6: vorher kein ‚Messung teilen‘
if (!await p.locator('#teilen').isDisabled()) F('M-6', '‚Messung teilen‘ vor dem ersten Fall bedienbar');
// Fall 1 Mehr-Menü (zweimal), Fall 2 Fenster, Fall 3 Feld oben, Fälle 4–6 Feld unten A, B, A
for (let i = 0; i < 2; i++) { await tip('#mainMore', 700); await p.touchscreen.tap(60, 700); await p.waitForTimeout(600); }   // daneben tippen (Ebene .layer)
await tip('#fertig', 300);
await tip('#fensterAuf', 900); await tip('#dlgX', 800); await tip('#fertig', 300);
await tip('#fensterAuf', 900); await tip('#fOrt', 1000); await tastaturZu(); await tip('#dlgX', 800); await tip('#fertig', 300);
for (let i = 0; i < 3; i++) { await tip('#fensterAuf', 900); await tip('#fWie', 1200); await tastaturZu(); await tip('#dlgX', 800);
  if (i === 1) { await p.reload(); await p.waitForTimeout(400); await safariModell(p, 'iPhone hoch', { auto: true }); }   // M-6 Neuladen
  await tip('#fertig', 300); }

// M-6: Anzeige am Gerät – nur ‚aufgenommen‘, keine Bewertung; teilen erst jetzt
const anzeige = await p.locator('.mess').innerText();
if (/sprung|gleitet|ms\b|ok\b|fehler/i.test(anzeige.replace(/gleitet 0,35 s/g, ''))) F('M-6', 'die Seite zeigt eine Bewertung statt nur ‚aufgenommen‘');
if (!/6 von 6 aufgenommen/.test(anzeige)) F('M-6', `Zähler: ${anzeige.match(/\d von \d aufgenommen/)?.[0] || 'fehlt'}`);
if (await p.locator('#teilen').isDisabled()) F('M-6', '‚Messung teilen‘ nach allen Fällen nicht bedienbar');
const text = await p.evaluate(() => a127.text());
if (/Frühstück|Hafen|Fisch|Teilen|Drucken/.test(text)) F('M-6', 'Texte der Seite in der Messdatei');
if (!/neu geladen/.test(text)) F('M-6', 'Neuladen nicht vermerkt');

const m = lies(text), aus = werteAus(m), fall = id => aus.find(f => f.id === id);
if (process.env.PRUEF_BERICHT) console.log(bericht(m, aus));
if (aus.length !== 6) F('M-6', `${aus.length} statt 6 Fälle in der Datei`);
// M-1
{ const g = fall('menue')?.b.menu || [], auf = g.filter(x => x.weg > 0), zu = g.filter(x => x.weg < 0);
  if (auf.length !== 2 || auf.some(x => x.sprung || x.dauer < 250 || x.dauer > 420)) F('M-1', `Menü auf: ${auf.map(x => x.dauer + ' ms/' + x.bilder + ' Bilder').join(', ') || 'keine Bewegung'} (erwartet 2 × 250–420 ms)`);
  if (zu.length !== 2 || zu.some(x => x.sprung || x.dauer < 200 || x.dauer > 320)) F('M-1', `Menü zu: ${zu.map(x => x.dauer + ' ms/' + x.bilder + ' Bilder').join(', ') || 'keine Bewegung'} (erwartet 2 × 200–320 ms)`); }
// M-2
{ const f = fall('blatt'), rein = (f?.b.bt || []).filter(x => !x.sprung && x.weg < 0), raus = (f?.b.gt || []).filter(x => !x.sprung && x.weg > 0);
  if (!rein.length) F('M-2', 'Fenster gleitet nicht herein'); if (!raus.length) F('M-2', 'Fenster-Abbild gleitet nicht hinaus'); }
// M-3
{ const f = fall('oben');
  if ((f?.b.froll || []).some(x => f.fokus != null && x.beginn >= f.fokus && x.beginn < f.fokus + 600)) F('M-3', 'Fenster rollt beim Antippen von Ort');
  if (!(f?.b.vh || []).some(x => x.weg < 0)) F('M-3', 'Tastatur geht nicht auf (vh)'); }
// M-4, M-5: Bewegung von ‚Wie war was?‘ auf dem Bildschirm ab dem Fokus (größter Weg nach oben)
const hoch = f => (f?.b.wie || []).filter(x => f.fokus != null && x.beginn >= f.fokus - 40 && x.weg < 0).sort((a, b) => a.weg - b.weg)[0];
for (const id of ['unten-a', 'unten-a2']) {
  const x = hoch(fall(id));
  if (!x) F('M-4', `${id}: ‚Wie war was?‘ kommt nicht nach oben`);
  else if (!x.sprung) F('M-4', `${id}: gleitet ${x.dauer} ms in ${x.bilder} Bildern – erwartet ein Sprung wie 4.56.0`);
}
{ const xa = hoch(fall('unten-a')), xb = hoch(fall('unten-b'));
  if (!xb) F('M-5', '‚Wie war was?‘ kommt in Variante B nicht nach oben');
  else {
    if (xb.sprung || xb.dauer < 250 || xb.dauer > 420) F('M-5', `Variante B: ${xb.sprung ? 'SPRUNG' : 'gleitet'} ${xb.dauer} ms in ${xb.bilder} Bildern (erwartet 250–420 ms)`);
    if (xa && Math.abs(xa.nach - xb.nach) > 2) F('M-5', `Endlage B ${xb.nach} px statt wie A ${xa.nach} px`);
  }
}
await b.close();
if (fehler.length) { for (const f of fehler) console.log(f); console.log(`APD-127 Muster (${art}${gegen ? ', Gegenprobe ' + gegen : ''}): ${fehler.length} Fehler`); process.exit(1); }
console.log(`APD-127 Muster (${art}): alles in Ordnung`);
