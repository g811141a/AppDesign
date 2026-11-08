// APD-127 · Messung auswerten (Sitzung Reiselogbuch 0099; Zusammenarbeit 0 Nr. 20, 2.7) – bewertet wird nur hier, aus den Rohdaten.
//   node "arbeit/APD-127 auswerten.mjs" <messung-APD-127-….txt>
// Je Fall und je Wert die Bewegungen: aufeinanderfolgende Änderungen (Lücke höchstens 120 ms) bilden eine Bewegung mit Beginn, Dauer
// (letzte − erste Änderung + 1 Bild), Weg, Anzahl Bilder und größtem Schritt je Bild. ‚Sprung‘ = höchstens 2 Bilder.
// Werte: wie/ort auf dem Bildschirm (Lage − vt), froll (Rollstand im Fenster), vh (Tastatur), vt (Safari verschiebt), blatt (Fenster),
// menu (Höhe des Menüs bzw. seines Abbilds), bt/gt (Versatz des Fensters bzw. seines Abbilds beim Schließen, aus dem berechneten Stil –
// WebKit rechnet ein laufendes ‚translate‘ nicht in die Lage ein). blatt und geist (Lage) stehen in der Datei, ausgewertet werden bt und gt.
import { readFileSync } from 'node:fs';

const LUECKE = 120;
export function lies(text) {
  const faelle = [], kopf = [];
  let f = null, sp = [];
  for (const [i, roh] of text.split('\n').entries()) {
    const z = roh.trim();
    if (!z) continue;
    if (z.startsWith('#')) { if (!f) kopf.push(z); continue; }
    const m = z.match(/^(-?\d+) (.*)$/);
    if (!m) throw new Error(`Zeile ${i + 1}: unbekannt ‚${z.slice(0, 40)}‘`);
    const t = +m[1], r = m[2];
    let g;
    if ((g = r.match(/^fall (\d+) (\S+) (\S+)/))) { f = { nr: +g[1], id: g[2], v: g[3], bilder: [], ereignisse: [] }; if (g[2] !== 'ende') faelle.push(f); continue; }
    if (r.startsWith('# ')) { sp = r.slice(2).split(' '); continue; }
    if (!f) { kopf.push(z); continue; }
    if (r.startsWith('= ')) {
      const w = r.slice(2).split(' '), o = { t };
      sp.forEach((k, j) => { o[k] = w[j]; });
      f.bilder.push(o);
    } else f.ereignisse.push({ t, e: r });
  }
  // ‚Fall neu‘ und Wiederholungen: der letzte Durchgang je Fall zählt
  const letzte = new Map();
  for (const x of faelle) letzte.set(x.nr, x);
  return { kopf, faelle: [...letzte.values()].sort((a, b) => a.nr - b.nr) };
}

const zahl = v => v != null && v !== '-' && Number.isFinite(+v) ? +v : null;
// Reihe (t, Wert) eines Werts; null, wo er fehlt
function reihe(bilder, art) {
  return bilder.map(b => {
    let v;
    if (art === 'wie' || art === 'ort') v = zahl(b[art]) == null ? null : zahl(b[art]) - (zahl(b.vt) || 0);
    else if (art === 'menu') v = b.menu && b.menu !== '-' ? +b.menu.split('/')[1] : null;
    else v = zahl(b[art]);
    return { t: b.t, v };
  });
}
export function bewegungen(bilder, art) {
  const r = reihe(bilder, art), aus = [], schritte = [];
  for (let i = 1; i < r.length; i++) if (r[i].v != null && r[i - 1].v != null && r[i].v !== r[i - 1].v) schritte.push({ t: r[i].t, d: r[i].v - r[i - 1].v, von: r[i - 1].v, nach: r[i].v });
  // Bildabstand: Median der Abstände aufeinanderfolgender Bilder
  const ab = bilder.slice(1).map((b, i) => b.t - bilder[i].t).filter(x => x > 0 && x < 50).sort((a, b) => a - b);
  const bildMs = ab.length ? ab[ab.length >> 1] : 16;
  let g = null;
  for (const s of schritte) {
    if (!g || s.t - g.bis > LUECKE) { g = { beginn: s.t, bis: s.t, von: s.von, nach: s.nach, bilder: 0, max: 0 }; aus.push(g); }
    g.bis = s.t; g.nach = s.nach; g.bilder++; g.max = Math.max(g.max, Math.abs(s.d));
  }
  for (const x of aus) { x.dauer = x.bis - x.beginn + bildMs; x.weg = x.nach - x.von; x.sprung = x.bilder <= 2; x.bildMs = bildMs; }
  return aus;
}
const WERTE = ['wie', 'ort', 'froll', 'vh', 'vt', 'bt', 'gt', 'menu'];
export function werteAus(m) {
  return m.faelle.map(f => {
    const fokus = f.ereignisse.find(e => /^focusin f(Wie|Ort)\b/.test(e.e))?.t ?? null;
    const b = {};
    for (const w of WERTE) b[w] = bewegungen(f.bilder, w);
    return { nr: f.nr, id: f.id, v: f.v, fokus, bilder: f.bilder.length, b, ereignisse: f.ereignisse };
  });
}
export function bericht(m, aus) {
  const z = [...m.kopf.slice(0, 3)];
  for (const f of aus) {
    z.push('', `Fall ${f.nr} ${f.id} (Variante ${f.v}) – ${f.bilder} Bilder${f.fokus != null ? `, Fokus bei ${f.fokus} ms` : ''}`);
    for (const w of WERTE) for (const x of f.b[w]) {
      const rel = f.fokus != null ? ` (${x.beginn - f.fokus >= 0 ? '+' : ''}${x.beginn - f.fokus} ms nach dem Fokus)` : '';
      z.push(`  ${w.padEnd(5)} ${String(x.von).padStart(5)} → ${String(x.nach).padEnd(5)} Weg ${String(x.weg).padStart(5)} · ${x.sprung ? 'SPRUNG' : 'gleitet'} ${x.dauer} ms in ${x.bilder} Bildern, größter Schritt ${x.max} px · ab ${x.beginn} ms${rel}`);
    }
  }
  return z.join('\n');
}
if (process.argv[1] && import.meta.url.endsWith(encodeURI(process.argv[1].split('/').pop()))) {
  const datei = process.argv[2];
  if (!datei) { console.error('Aufruf: node "arbeit/APD-127 auswerten.mjs" <Messdatei>'); process.exit(2); }
  const m = lies(readFileSync(datei, 'utf8'));
  console.log(bericht(m, werteAus(m)));
}
