// A-36 · Muster (3. Fassung) vor der Übergabe im Safari-Modell prüfen (Zusammenarbeit 0 Nr. 20 seit 2.15.0, Fall-Liste 6b).
//   node "arbeit/A-36 Muster prüfen.mjs"            – Chromium und WebKit, alle vier Lagen (Playwright aus ReiseLogBuch/tests)
// Je Lage: der Prüfer macht genau den Schritt, den das Muster anzeigt, bis alle 9 Schritte aufgenommen sind; die geteilte Datei wird
// mit auswerten.mjs bewertet (V1 muss in jedem Schritt still sein, jede Handlung muss in der Datei stehen), dazu die Bilder des
// Modells selbst (Lage auf dem Bildschirm, mit Safaris Verschiebung). Gegenproben (müssen rot werden): G-1 eingebauter Sprung der
// Kopfzeile (50 px, 2 Bilder) bei jeder Meldung von Safari – beim Öffnen und Schließen der Tastatur; G-2 Variante Heute.
import { createRequire } from 'node:module';
import { lies, werteAus } from './A-36 auswerten.mjs';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const { safariModell } = await import('../tests/safari.mjs');

const URL_MUSTER = new URL('./A-36 Muster.html', import.meta.url).href;
const LAGEN = {
  'iPhone hoch': { viewport: { width: 402, height: 812 }, screen: { width: 402, height: 874 }, isMobile: true },
  'iPhone quer': { viewport: { width: 874, height: 402 }, screen: { width: 874, height: 402 }, isMobile: true },
  'iPad hoch': { viewport: { width: 834, height: 1162 }, screen: { width: 834, height: 1194 } },
  'iPad quer': { viewport: { width: 1194, height: 802 }, screen: { width: 1194, height: 834 } },
};
const warte = (p, ms) => p.waitForTimeout(ms);
const blur = p => p.evaluate(() => document.activeElement?.blur());
const HANDLUNG = [
  p => p.tap('#fenster'),
  p => p.tap('#fPlace'),
  p => p.tap('#fNotiz'),
  blur,
  p => p.tap('#dlgOk'),
  async p => { await p.tap('#runter'); await warte(p, 700); await p.tap('#kosten'); },
  blur,
  async p => { await p.tap('#hoch'); await warte(p, 700); await p.tap('#suchknopf'); await warte(p, 200); await p.tap('#such'); },
  async p => { await blur(p); await warte(p, 400); await p.tap('#suchknopf'); },
];

async function lauf(b, name, { v = 'v1', gegenprobe = false } = {}) {
  const p = await b.newPage({ hasTouch: true, ...LAGEN[name] }), fehler = [];
  p.on('pageerror', e => fehler.push('Skriptfehler: ' + e.message));
  await p.goto(URL_MUSTER + '?v=' + v);
  await safariModell(p, name, { auto: true, leisten: { kopf: '#kopf', side: '#side', dkopf: '#dkopf' }, links: { dlinks: '#dlg' } });
  if (gegenprobe) await p.evaluate(() => visualViewport.addEventListener('resize', () => {
    const k = document.querySelector('#kopf'); k.style.transform = 'translateY(-50px)';
    requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => { k.style.transform = ''; })));
  }));
  const lage = await p.evaluate(() => a36.lage());
  if (lage !== name) fehler.push(`Muster erkennt ‚${lage}‘ statt ‚${name}‘`);
  await p.evaluate(() => __safari.bilder(true));
  for (let i = 0; i < HANDLUNG.length; i++) {
    const n = await p.evaluate(() => a36.schritt());
    if (v === 'v1' && n !== i) { fehler.push(`Schritt S${i + 1}: Muster zeigt Schritt ${n + 1}`); break; }
    await HANDLUNG[i](p); await warte(p, 1300);
    if (v !== 'v1' && i === 1) break;   // G-2: Heute nur bis ‚Ort antippen‘
  }
  const bilder = await p.evaluate(() => __safari.bilder(false)), text = await p.evaluate(() => a36.text());
  await p.close();
  const { handlungen, schritte } = werteAus(lies(text));
  if (v === 'v1' && !gegenprobe && schritte.filter(s => s.startsWith(name)).length !== 9) fehler.push(`nur ${schritte.length} von 9 Schritten in der Datei: ${schritte.join(', ')}`);
  const erwartet = v === 'v1' ? 7 : 1;   // auf Ort, wechsel Notiz, zu, auf kosten, zu, auf such, zu
  if (handlungen.length < erwartet) fehler.push(`nur ${handlungen.length} Handlungen mit Tastatur in der Datei (erwartet ${erwartet})`);
  for (const h of handlungen) for (const f of h.fehler) fehler.push(`Auswertung ${h.was} ${h.feld}: ${f}`);
  // Bilder des Modells: Lage auf dem Bildschirm (mit Safaris Verschiebung) – Kopf- und Seitenleiste still, Safari verschiebt nie
  const vt = Math.max(0, ...bilder.map(x => x.vt));
  if (vt) fehler.push(`Modell: Safari verschiebt ${vt} px`);
  for (const k of ['kopf', 'side']) { const w = bilder.map(x => x[k]).filter(x => x != null); if (w.length && Math.max(...w) - Math.min(...w) > 1) fehler.push(`Modell: ${k} ${Math.min(...w)}…${Math.max(...w)}`); }
  return { fehler, handlungen };
}

const browser = process.argv.includes('--nur-chromium') ? ['chromium'] : ['chromium', 'webkit'];
let rot = 0;
for (const bn of browser) {
  const b = await pw[bn].launch();
  for (const name of Object.keys(LAGEN)) {
    const r = await lauf(b, name);
    console.log(`${r.fehler.length ? '✗' : '✓'} ${bn} · ${name} · V1, 9 Schritte: ${r.fehler.length ? r.fehler.join(' | ') : `${r.handlungen.length} Handlungen still`}`);
    for (const h of r.handlungen) console.log('    ' + h.text);
    rot += r.fehler.length ? 1 : 0;
  }
  // Gegenproben – müssen rot werden
  const g1 = await lauf(b, 'iPhone hoch', { gegenprobe: true });
  const auf = g1.fehler.some(f => /auf fPlace: Kopfzeile springt -50/.test(f)), zu = g1.fehler.some(f => /zu \w+: Kopfzeile springt -50/.test(f));
  console.log(`${auf && zu ? '✓' : '✗'} ${bn} · G-1 Sprung 50 px beim Öffnen und Schließen erkannt: auf ${auf ? 'ja' : 'NEIN'}, zu ${zu ? 'ja' : 'NEIN'}`);
  const g2 = await lauf(b, 'iPad quer', { v: 'heute' });
  const g2ok = g2.fehler.some(f => /Safari verschiebt \d+ px/.test(f));
  console.log(`${g2ok ? '✓' : '✗'} ${bn} · G-2 Heute zeigt ‚Safari verschiebt‘: ${g2.fehler.filter(f => /Auswertung/.test(f)).join(' | ') || 'NEIN'}`);
  rot += (auf && zu ? 0 : 1) + (g2ok ? 0 : 1);
  await b.close();
}
console.log(rot ? `Muster-Prüfung: ${rot} rot` : 'Muster-Prüfung: alles grün, Gegenproben rot wie verlangt');
process.exit(rot ? 1 : 0);
