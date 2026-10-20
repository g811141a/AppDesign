// A-36 · Auswertung der Muster-Messungen (Zusammenarbeit 0 Nr. 20, seit 2.15.0: bewertet wird nur aus den Rohdaten).
//   node "arbeit/A-36 auswerten.mjs" <Datei> …     – je Handlung mit Tastatur eine Zeile, Fehler mit ✗
//   node "arbeit/A-36 auswerten.mjs" --selbsttest  – an den vier Messungen der 2. Fassung (Fall-Liste 6a) müssen die bekannten Werte
//                                                    herauskommen, auch die Sprünge beim Schließen, die das Muster selbst übersah
// Eine Handlung beginnt mit ‚focus <Feld>‘ (Tastatur auf oder Feld gewechselt) bzw. ‚blur <Feld>‘ ohne neues Feld (Tastatur zu).
// Ausgangslage = die Zeile des Ereignisses selbst (Safari meldet frühestens danach); Ende = nächste Handlung bzw. 900 ms nach der
// letzten Meldung von Safari (‚vv …‘). Jede Zeile dazwischen ist ein Bild: Kopfzeile, Seitenleiste und Fenster links müssen in jedem
// Bild bei der Ausgangslage bleiben (± 1 px), der Fensterkopf darf nur zwischen Anfang und Ende liegen (Gleiten).
import { readFileSync, readdirSync } from 'node:fs';

const FELD = /^(f[A-Z]\w*|kosten|such|oben|feld\d+)$/;

export function lies(text) {
  const m = { kopf: '', zeilen: [] }; let spalten = null;
  for (const z of text.replace(/\r/g, '').split('\n')) {
    if (!z.trim()) continue;
    if (z.startsWith('# ')) { if (!m.kopf) m.kopf = z; continue; }
    if (z.startsWith('t ')) { spalten = z.trim().split(/\s+/); continue; }
    if (!spalten) continue;
    const [werte, ereignis = ''] = z.split(' ! ');
    const w = werte.trim().split(/\s+/);
    if (w.length < spalten.length) continue;   // ‚1234 # neu geladen‘ u. ä.
    const r = { ereignis: ereignis.trim() };
    spalten.forEach((s, i) => { r[s] = /^-?\d+$/.test(w[i]) ? +w[i] : w[i]; });
    m.zeilen.push(r);
  }
  m.geraet = /iPad|Macintosh/.test(m.kopf) ? 'iPad' : 'iPhone';
  return m;
}

// Handlungen finden: focus auf ein Feld bzw. blur eines Felds, nach dem 100 ms lang kein Feld den Fokus bekommt
// iPad: die Tastatur-Taste schließt die Tastatur, das Feld behält den Fokus – dann zählt die Meldung (sichtbare Höhe wächst) als
// ‚zu‘, und ein erneutes Antippen desselben Felds (Höhe schrumpft ohne neuen Fokus) als ‚auf‘
function handlungen(z) {
  const h = [];
  z.forEach((r, i) => {
    const vor = z[i - 1];
    if (vor && /^vv resize/.test(r.ereignis) && FELD.test(String(r.fokus)) && zahl(r.vh) && zahl(vor.vh)) {
      // Ausgangslage ist die Zeile davor; sie bleibt zugleich das letzte Bild der vorigen Handlung (bis = i)
      if (r.vh - vor.vh > 80 && h.length && h.at(-1).offen) { h.push({ i: i - 1, bis: i, was: 'zu', feld: r.fokus + ' (Tastatur-Taste)', offen: false }); return; }
      if (vor.vh - r.vh > 80 && h.length && !h.at(-1).offen && h.at(-1).feld.startsWith(r.fokus)) { h.push({ i: i - 1, bis: i, was: 'auf', feld: r.fokus + ' (erneut)', offen: true }); return; }
    }
    const [art, id] = r.ereignis.split(' ');
    if (!FELD.test(id || '')) return;
    if (art === 'focus') h.push({ i, was: h.length && h.at(-1).offen ? 'wechsel' : 'auf', feld: id, offen: true });
    if (art === 'blur') {
      const neu = z.slice(i + 1).find(x => x.t - r.t <= 100 && /^focus /.test(x.ereignis) && FELD.test(x.ereignis.split(' ')[1]));
      if (!neu) h.push({ i, was: 'zu', feld: id, offen: false });
    }
  });
  return h;
}

const zahl = v => typeof v === 'number';
export function werteAus(m) {
  const z = m.zeilen, h = handlungen(z), ergebnis = [];
  h.forEach((a, n) => {
    const r0 = z[a.i], grenze = n + 1 < h.length ? h[n + 1].bis ?? h[n + 1].i : z.length;
    let ende = a.i, letzteMeldung = r0.t;
    for (let j = a.i + 1; j < grenze; j++) {
      if (/^vv /.test(z[j].ereignis)) letzteMeldung = z[j].t;
      if (z[j].t - letzteMeldung > 900) break;
      ende = j;
    }
    const bilder = z.slice(a.i + 1, ende + 1), e = z[ende], f = [];
    // 6c 1 / 6e: Fokus nach dem Antippen gleich wieder verloren (‚zu‘ desselben Felds innerhalb von 100 ms, Tastatur nie ganz offen)
    const nach = h[n + 1];
    const verloren = a.offen && a.was === 'auf' && nach && nach.was === 'zu' && nach.feld === a.feld && z[nach.i].t - r0.t <= 100;
    const vt = Math.max(0, ...bilder.map(b => Math.max(zahl(b.vt) ? b.vt : 0, zahl(b.sy) ? b.sy : 0)));
    const teile = [], E = t => { f.push(t); teile.push('✗ ' + t); };
    if (verloren) E(`Fokus nach ${z[nach.i].t - r0.t} ms verloren (Tastatur nicht geöffnet – 2× tippen)`);
    if (vt > (zahl(r0.vt) ? r0.vt : 0) + 1) E(`Safari verschiebt ${vt} px`);
    else teile.push(vt ? `Safari bleibt bei ${vt} px` : 'Safari verschiebt nicht');
    for (const [k, name, gleitet] of [['kopf', 'Kopfzeile'], ['side', 'Seitenleiste'], ['dlinks', 'Fenster links'], ['dkopf', 'Fensterkopf', true]]) {
      // Kopfzeile und Seitenleiste verschwinden nie (Heute am iPad: isPhone() blendet die Seitenleiste mit Tastatur aus)
      if (!gleitet && k !== 'dlinks') {
        const weg = zahl(r0[k]) ? bilder.findIndex(b => !zahl(b[k])) : -1, da = !zahl(r0[k]) ? bilder.findIndex(b => zahl(b[k])) : -1;
        if (weg >= 0) { E(`${name} verschwindet`); continue; }
        if (da >= 0) { E(`${name} erscheint (${bilder[da][k]} px)`); continue; }
      }
      if (!zahl(r0[k])) continue;
      const fertig = [...bilder].reverse().find(b => zahl(b[k]))?.[k] ?? r0[k];
      const lo = Math.min(r0[k], gleitet ? fertig : r0[k]) - 1, hi = Math.max(r0[k], gleitet ? fertig : r0[k]) + 1;
      const aus = bilder.filter(b => zahl(b[k]) && (b[k] < lo || b[k] > hi));
      if (aus.length) {
        const w = aus.reduce((x, b) => Math.abs(b[k] - r0[k]) > Math.abs(x - r0[k]) ? b[k] : x, aus[0][k]);
        E(`${name} springt ${w - r0[k] > 0 ? '+' : ''}${w - r0[k]} px (${r0[k]} → ${w}, ${aus.length} Bilder)`);
      } else teile.push(gleitet && Math.abs(fertig - r0[k]) > 1 ? `${name} gleitet ${r0[k]} → ${fertig}` : `${name} still`);
    }
    if (a.offen && zahl(e.vh)) {
      if (zahl(r0.fb)) teile.push(`Feld beim Fokus ${r0.ft}–${r0.fb} (${e.vh - r0.fb} px über der Tastatur)`);
      if (zahl(e.kapsel)) { const k = e.vh - e.kapsel; if (k < 10) E(`Kapsel ${k} px über der Tastatur`); else teile.push(`Kapsel ${k} px darüber`); }
      if (zahl(e.fb) && (e.fb > e.vh + 1 || e.ft < -1)) E(`Feld danach ${e.ft}–${e.fb} nicht ganz sichtbar (sichtbar ${e.vh})`);
    }
    ergebnis.push({ t: r0.t, v: r0.v, was: a.was, feld: a.feld, fehler: f, text: `${r0.t} · ${r0.v} · ${a.was} ${a.feld} · ${teile.join(' · ')}` });
  });
  const schritte = z.filter(r => /^erledigt /.test(r.ereignis)).map(r => r.ereignis.slice(9));
  return { handlungen: ergebnis, schritte };
}

// Selbsttest an den vier Messungen der 2. Fassung (Werte aus der Fall-Liste 6a, von Hand aus den Zeilen gelesen)
const ERWARTET = {
  '2026-10-20 15-54 Muster 2 iPhone hoch Fenster Ort.txt': [
    ['heute', 'auf', 'Safari verschiebt 218 px'], ['heute', 'auf', 'Kopfzeile springt -218 px'], ['heute', 'zu', 'Kopfzeile springt +218 px'],
    ['v1', 'auf', 'Safari verschiebt nicht'], ['v1', 'auf', 'Kopfzeile still'], ['v1', 'zu', 'Kopfzeile still'], ['lineal', 'auf', 'Safari verschiebt nicht']],
  '2026-10-20 16-00 Muster 2 iPhone quer Fenster Ort.txt': [
    ['heute', 'auf', 'Safari verschiebt 212 px'], ['heute', 'zu', 'Kopfzeile springt +212 px'],
    ['v1', 'auf', '(15 px über der Tastatur)'], ['v1', 'auf', 'Safari verschiebt nicht'], ['v1', 'zu', 'Kopfzeile still']],
  '2026-10-20 15-53 Muster 2 iPad quer Fenster Ort.txt': [
    ['heute', 'auf', 'Safari verschiebt 362 px'], ['heute', 'auf', 'Fenster links springt -327 px'], ['heute', 'zu', 'Kopfzeile springt +362 px'],
    ['heute', 'auf', 'Seitenleiste verschwindet'], ['heute', 'zu', 'Seitenleiste erscheint'], ['v1', 'auf', 'Safari verschiebt nicht'], ['v1', 'auf', 'Fenster links still'], ['lineal', 'auf', '(24 px über der Tastatur)']],
  '2026-10-20 22-58 Muster 4 iPhone.txt': [
    ['v1', 'auf', 'Fokus nach 33 ms verloren'], ['v1', 'auf', 'Fokus nach 34 ms verloren'], ['v1', 'wechsel', 'Safari verschiebt nicht']],
  '2026-10-20 23-01 Muster 4 iPad.txt': [
    ['v1', 'auf', 'Fokus nach 36 ms verloren'], ['v1', 'auf', 'Fokus nach 35 ms verloren'], ['v1', 'auf', 'Fensterkopf gleitet 127 → 10']],
  '2026-10-20 16-01 Muster 2 iPad hoch Fenster Notiz Ort.txt': [
    ['heute', 'auf', 'Safari verschiebt 340 px'], ['heute', 'auf', 'Seitenleiste springt -340 px'], ['heute', 'wechsel', 'Safari bleibt bei 340 px'],
    ['heute', 'zu', 'Kopfzeile springt +340 px'], ['v1', 'auf', 'Safari verschiebt nicht'], ['v1', 'zu', 'Kopfzeile still']],
};

if (process.argv[1] && import.meta.url.endsWith(encodeURI(process.argv[1].split('/').pop()))) {
  const args = process.argv.slice(2);
  if (args[0] === '--selbsttest') {
    const ordner = new URL('./A-36 Messungen/', import.meta.url);
    let fehler = 0;
    for (const [datei, soll] of Object.entries(ERWARTET)) {
      const { handlungen: h } = werteAus(lies(readFileSync(new URL(encodeURIComponent(datei), ordner), 'utf8')));
      for (const [v, was, text] of soll) {
        const ok = h.some(x => x.v === v && x.was === was && x.text.includes(text));
        if (!ok) { fehler++; console.log(`✗ ${datei}: ${v} ${was} – erwartet ‚${text}‘`); }
      }
    }
    console.log(fehler ? `Selbsttest: ${fehler} Fehler` : `Selbsttest: alle ${Object.values(ERWARTET).flat().length} Werte wie von Hand gelesen ✓`);
    process.exit(fehler ? 1 : 0);
  }
  for (const d of args) {
    const m = lies(readFileSync(d, 'utf8')), { handlungen: h, schritte } = werteAus(m);
    console.log(`\n${d}\n${m.kopf}`);
    for (const x of h) console.log((x.fehler.length ? '✗ ' : '✓ ') + x.text);
    if (schritte.length) console.log('Schritte: ' + schritte.join(', '));
  }
}
