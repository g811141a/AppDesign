// A-36 · Muster (6. Fassung, V3) vor der Übergabe im Safari-Modell prüfen (Zusammenarbeit 0 Nr. 20 seit 2.15.0, Fall-Liste 6h).
//   node "arbeit/A-36 Muster prüfen.mjs" [--nur-chromium] [--muster <Datei>]   – Chromium und WebKit, alle vier Lagen
// Je Lage die Handgriffe der Versuche (Anleitung nur im Chat, Fall-Liste 6d/6h); die geteilte Datei wird mit
// auswerten.mjs bewertet (V3 muss bei jeder Handlung still sein, jede Handlung muss in der Datei stehen), dazu die Bilder des Modells
// (Lage auf dem Bildschirm, mit Safaris Verschiebung) und ob ‚Notiz‘ bei offener Tastatur im Fenster erreichbar ist (6c c).
// Gegenproben (müssen rot werden): G-1 eingebauter Sprung der Kopfzeile (50 px, 2 Bilder) bei jeder Meldung von Safari – beim Öffnen
// und Schließen der Tastatur; G-2 Variante Heute; G-3 Heute iPhone quer: ‚Notiz‘ bei offener Tastatur nicht erreichbar; G-4 V2 (rollen
// ohne neuen Fokus) – Safari verschiebt wie am Gerät (6g, S-7). Die Suche quer (6c a) wird nur berichtet.
// V3 (6h): Gesamtausgaben (Art b) bekommt bei jedem Antippen mit geschlossener Tastatur einen neuen Fokus, kein Feld bleibt readonly,
// kein neuer Fokus geht verloren (‚Fokus weg‘). Ob Safari die Lage beim neuen Fokus neu liest, ist eine Annahme (safari.mjs S-8).
// --muster: anderes Muster prüfen (z. B. die 3. Fassung aus Git – muss gegen das Modell mit 6c rot sein).
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { lies, werteAus } from './A-36 auswerten.mjs';
const pw = createRequire(new URL('../../ReiseLogBuch/tests/', import.meta.url))('playwright');
const { safariModell } = await import('../tests/safari.mjs');

const arg = process.argv.indexOf('--muster');
const URL_MUSTER = arg > 0 ? pathToFileURL(process.argv[arg + 1]).href : new URL('./A-36 Muster.html', import.meta.url).href;
const LAGEN = {
  'iPhone hoch': { viewport: { width: 402, height: 812 }, screen: { width: 402, height: 874 }, isMobile: true },
  'iPhone quer': { viewport: { width: 874, height: 402 }, screen: { width: 874, height: 402 }, isMobile: true },
  'iPad hoch': { viewport: { width: 834, height: 1162 }, screen: { width: 834, height: 1194 } },
  'iPad quer': { viewport: { width: 1194, height: 802 }, screen: { width: 1194, height: 834 } },
};
const warte = (p, ms) => p.waitForTimeout(ms);
const blur = p => p.evaluate(() => document.activeElement?.blur());
// iPad: Tastatur-Taste schließt nur die Tastatur, das Feld behält den Fokus; iPhone: ✓ bzw. ‚Fertig‘ über der Tastatur nimmt ihn
const taste = (p, ipad) => ipad ? p.evaluate(() => __safari.tastatur(false)) : blur(p);
// ‚Notiz‘ bei offener Tastatur erreichbar: gibt es einen Rollstand des Fensterinhalts, bei dem das Feld ganz im sichtbaren Teil des
// Fensterinhalts steht (Bildschirm: unter dem Fensterkopf, über der Tastatur)?
const erreichbar = p => p.evaluate(() => {
  const k = document.querySelector('#dkoerper'), f = document.querySelector('#fNotiz'), y = k.scrollTop, top = __safari.top();
  let ok = false, text = '';
  for (let s = 0; s <= k.scrollHeight && !ok; s += 2) {
    k.scrollTop = s;
    const r = f.getBoundingClientRect(), b = k.getBoundingClientRect(), oben = b.top - top, unten = Math.min(b.bottom - top, __safari.hoehe());
    ok = r.top - top >= oben && r.bottom - top <= unten;
    text = `${Math.round(r.top - top)}–${Math.round(r.bottom - top)}, Fensterinhalt sichtbar ${Math.round(oben)}–${Math.round(unten)}`;
  }
  k.scrollTop = y; return { ok, text };
});
// der kurze Versuch (Fall-Liste 6f, Anleitung im Chat): erwartete Handlungen in der Auswertung
const VERSUCH = ipad => [
  ['Fenster öffnen', p => p.tap('#fenster')],
  ['Ort', p => p.tap('#fPlace'), 'auf fPlace'],
  ['Notiz erreichbar', null],
  ['Notiz', p => p.tap('#fNotiz'), 'wechsel fNotiz'],
  ['Tastatur zu', p => taste(p, ipad), 'zu fNotiz'],
  ['Notiz erneut', p => p.tap('#fNotiz'), 'auf fNotiz'],
  ['Fertig', p => p.tap('#dlgOk'), 'zu fNotiz'],
  ['Gesamtausgaben', async p => { await p.tap('#runter'); await warte(p, 700); await p.tap('#kosten'); }, 'auf kosten'],
  ['Tastatur zu', p => taste(p, ipad), 'zu kosten'],
  ['Gesamtausgaben erneut', p => p.tap('#kosten'), 'auf kosten'],
  ['Tastatur zu', blur, 'zu kosten'],
];
const SUCHE = [
  ['Suche ein', async p => { await p.tap('#hoch'); await warte(p, 700); await p.tap('#suchknopf'); await warte(p, 200); await p.tap('#such'); }, 'auf such'],
  ['Suche aus', async p => { await blur(p); await warte(p, 400); await p.tap('#suchknopf'); }, 'zu such'],
];

async function lauf(b, name, { heute = false, variante, gegenprobe = false, ablauf } = {}) {
  const p = await b.newPage({ hasTouch: true, ...LAGEN[name] }), fehler = [], ipad = name.startsWith('iPad');
  p.on('pageerror', e => fehler.push('Skriptfehler: ' + e.message));
  await p.goto(URL_MUSTER + (heute ? '?v=heute' : ''));
  if (heute || variante) await p.evaluate(v => window.a36.variante?.(v), heute ? 'heute' : variante);
  await safariModell(p, name, { auto: true, leisten: { kopf: '#kopf', side: '#side', dkopf: '#dkopf' }, links: { dlinks: '#dlg' } });
  if (gegenprobe) await p.evaluate(() => visualViewport.addEventListener('resize', () => {
    const k = document.querySelector('#kopf'); k.style.transform = 'translateY(-50px)';
    requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => { k.style.transform = ''; })));
  }));
  const lage = await p.evaluate(() => a36.lage());
  if (lage !== name) fehler.push(`Muster erkennt ‚${lage}‘ statt ‚${name}‘`);
  await p.evaluate(() => __safari.bilder(true));
  const schritte = ablauf || VERSUCH(ipad).slice(0, heute ? 2 : undefined), erwartet = [], hinweise = [];
  for (const [was, tu, soll] of schritte) {
    if (!tu) { const r = await erreichbar(p); (r.ok ? hinweise : fehler).push(`Notiz bei offener Tastatur ${r.ok ? 'erreichbar' : 'NICHT erreichbar'} (${r.text})`); continue; }
    await tu(p); await warte(p, 1300);
    if (soll) erwartet.push(soll);
  }
  const bilder = await p.evaluate(() => __safari.bilder(false)), text = await p.evaluate(() => a36.text());
  const lesend = await p.evaluate(() => [...document.querySelectorAll('input, textarea')].filter(x => x.readOnly).map(x => x.id));
  await p.close();
  const { handlungen } = werteAus(lies(text));
  // jede Handlung des Versuchs muss in der Datei stehen, in dieser Reihenfolge (‚wechsel‘ und ‚erneut‘ eingeschlossen)
  let i = 0;
  for (const h of handlungen) if (i < erwartet.length && `${h.was} ${h.feld}`.startsWith(erwartet[i])) i++;
  if (i < erwartet.length) fehler.push(`Handlung ‚${erwartet[i]}‘ fehlt in der Datei (gefunden: ${handlungen.map(h => h.was + ' ' + h.feld).join(', ')})`);
  for (const h of handlungen) for (const f of h.fehler) fehler.push(`Auswertung ${h.was} ${h.feld}: ${f}`);
  // 6e: keine Berührung abfangen – auf jeden Fokus eines Felds durch Antippen folgt Safaris eigenes ‚tippen‘ (Klick) desselben Felds
  if (!heute) { const z = text.split('\n'), fokus = z.filter(x => / ! focus (f[A-Z]\w*|kosten|such)$/.test(x)).length, tippen = z.filter(x => / ! (tippen (f[A-Z]\w*|kosten|such)|klick unterdrückt .*)$/.test(x)).length;
    if (tippen < fokus) fehler.push(`Berührung abgefangen: ${fokus} Felder mit Fokus, nur ${tippen}-mal ‚tippen‘ bzw. ‚klick unterdrückt‘ (Safari)`); }
  // V3 (6h): neuer Fokus – Art b bei jedem Antippen von Gesamtausgaben, nie verloren, kein Feld bleibt readonly
  if (!heute && !variante) {
    const z = text.split('\n'), neuB = z.filter(x => / ! neu fokussiert kosten b$/.test(x)).length, soll = erwartet.filter(x => x === 'auf kosten').length;
    if (neuB < soll) fehler.push(`V3 b: ${soll}× Gesamtausgaben angetippt, nur ${neuB}× neu fokussiert`);
    for (const x of z.filter(x => / ! neu fokussiert .* Fokus weg$/.test(x))) fehler.push(`V3: ${x.split(' ! ')[1]}`);
    for (const x of z.filter(x => / ! neu fokussiert /.test(x))) hinweise.push(x.split(' ! ')[1]);
  }
  if (lesend.length) fehler.push(`readonly geblieben: ${lesend.join(', ')}`);
  // Bilder des Modells: Kopf- und Seitenleiste still, Safari verschiebt nie
  const vt = Math.max(0, ...bilder.map(x => x.vt));
  if (vt) fehler.push(`Modell: Safari verschiebt ${vt} px`);
  for (const k of ['kopf', 'side']) { const w = bilder.map(x => x[k]).filter(x => x != null); if (w.length && Math.max(...w) - Math.min(...w) > 1) fehler.push(`Modell: ${k} ${Math.min(...w)}…${Math.max(...w)}`); }
  return { fehler, handlungen, hinweise };
}

const browser = process.argv.includes('--nur-chromium') ? ['chromium'] : ['chromium', 'webkit'];
let rot = 0;
for (const bn of browser) {
  const b = await pw[bn].launch();
  for (const name of Object.keys(LAGEN)) {
    const r = await lauf(b, name);
    console.log(`${r.fehler.length ? '✗' : '✓'} ${bn} · ${name} · V3, Versuch: ${r.fehler.length ? r.fehler.join(' | ') : `${r.handlungen.length} Handlungen still`}`);
    for (const h of [...r.hinweise, ...r.handlungen.map(h => h.text)]) console.log('    ' + h);
    rot += r.fehler.length ? 1 : 0;
  }
  for (const name of ['iPhone quer', 'iPad quer']) {
    const r = await lauf(b, name, { ablauf: SUCHE });
    console.log(`${r.fehler.length ? '○' : '✓'} ${bn} · ${name} · Suche (nur berichtet, Entscheidung offen): ${r.fehler.length ? r.fehler.join(' | ') : 'still'}`);
  }
  // Gegenproben – müssen rot werden
  const g1 = await lauf(b, 'iPhone hoch', { gegenprobe: true });
  const auf = g1.fehler.some(f => /auf fPlace: Kopfzeile springt -50/.test(f)), zu = g1.fehler.some(f => /zu \w+: Kopfzeile springt -50/.test(f));
  console.log(`${auf && zu ? '✓' : '✗'} ${bn} · G-1 Sprung 50 px beim Öffnen und Schließen erkannt: auf ${auf ? 'ja' : 'NEIN'}, zu ${zu ? 'ja' : 'NEIN'}`);
  const g2 = await lauf(b, 'iPad quer', { heute: true });
  const g2ok = g2.fehler.some(f => /Safari verschiebt \d+ px/.test(f));
  console.log(`${g2ok ? '✓' : '✗'} ${bn} · G-2 Heute zeigt ‚Safari verschiebt‘: ${g2.fehler.filter(f => /Auswertung/.test(f)).slice(0, 2).join(' | ') || 'NEIN'}`);
  const g3 = await lauf(b, 'iPhone quer', { heute: true, ablauf: VERSUCH(false).slice(0, 3) });
  const g3ok = g3.fehler.some(f => /NICHT erreichbar/.test(f));
  console.log(`${g3ok ? '✓' : '✗'} ${bn} · G-3 Heute iPhone quer: ‚Notiz‘ bei offener Tastatur nicht erreichbar (wie am Gerät, 6c c): ${g3ok ? 'ja' : 'NEIN'}`);
  const g4 = await lauf(b, 'iPad quer', { variante: 'v2' });
  const g4ok = g4.fehler.some(f => /Auswertung auf fPlace: Safari verschiebt \d+ px/.test(f));
  console.log(`${g4ok ? '✓' : '✗'} ${bn} · G-4 V2 ohne neuen Fokus zeigt ‚Safari verschiebt‘ (wie am Gerät, 6g): ${g4.fehler.filter(f => /Safari verschiebt/.test(f)).slice(0, 2).join(' | ') || 'NEIN'}`);
  rot += (auf && zu ? 0 : 1) + (g2ok ? 0 : 1) + (g3ok ? 0 : 1) + (g4ok ? 0 : 1);
  await b.close();
}
console.log(rot ? `Muster-Prüfung: ${rot} rot` : 'Muster-Prüfung: alles grün, Gegenproben rot wie verlangt');
process.exit(rot ? 1 : 0);
