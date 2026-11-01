// APD-106 · Messung auswerten (Zusammenarbeit 0 Nr. 20 und 2.7): liest die geteilte Datei von ‚APD-106 Messung.html‘ und fasst je Fall
// zusammen, was Safari und ui.js (Fassung 4.48.0) taten – Großanzeige, Berühren (.beruehrt), Anheben (.hebt), Frage, Abbrüche,
// Kontextmenü, Textauswahl, ausgelöste Knöpfe. Bewertet wird nur hier, nie auf dem Bildschirm des Musters.
//   node "arbeit/APD-106 auswerten.mjs" <messung.txt>
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function lies(text) {
  const kopf = [], zeilen = [];
  for (const [i, z] of text.split('\n').entries()) {
    if (!z.trim()) continue;
    if (z.startsWith('#')) { kopf.push(z); continue; }
    const m = z.match(/^(\d+) (.*)$/);
    if (!m) throw new Error(`Zeile ${i + 1}: unbekanntes Format ‚${z.slice(0, 40)}‘`);
    zeilen.push({ t: +m[1], s: m[2] });
  }
  return { kopf, zeilen };
}

// je Fall der letzte Durchgang (‚Fall neu‘ beginnt ihn neu)
export function werteAus({ zeilen }) {
  const faelle = new Map();
  let akt = null;
  for (const { t, s } of zeilen) {
    let m;
    if ((m = s.match(/^fall (\d+) ([AB]) (\w+) · ts (\S+) ax (\d)/))) {
      akt = { nr: +m[1], v: m[2], schrift: m[3], ts: m[4], ax: m[5] === '1', t0: t, zeilen: [] };
      faelle.set(akt.nr, akt); continue;
    }
    if (/^(fertig|alle faelle|neu \d)/.test(s)) {
      if ((m = s.match(/^fertig (\d+) · ts (\S+) ax (\d)/)) && akt) { akt.fertig = true; akt.tsEnde = m[2]; akt.axEnde = m[3] === '1'; }
      if (s.startsWith('fertig')) akt = null;
      continue;
    }
    if (akt) akt.zeilen.push({ t, s });
  }
  return [...faelle.values()].map(fasse);
}

function fasse(f) {
  const r = { nr: f.nr, v: f.v, schrift: f.schrift, ts: f.tsEnde || f.ts, ax: f.axEnde ?? f.ax, fertig: !!f.fertig,
    gross: 0, grossLage: [], beruehrt: [], hebt: [], frage: [], abbruch: [], kontext: [], auswahl: 0, ausgeloest: [], downs: 0 };
  let down = null;
  for (const { t, s } of f.zeilen) {
    let m;
    if ((m = s.match(/^zeiger down (\w+) (\S+)/))) { down = t; r.downs++; }
    else if ((m = s.match(/^zeiger cancel \w+ (\S+)/)) || (m = s.match(/^touchcancel (\S+)/))) r.abbruch.push({ was: s.split(' ')[0] + (s.startsWith('zeiger') ? ' cancel' : ''), ziel: m[1], nach: down === null ? null : t - down });
    else if (s === 'gross auf') r.gross++;
    else if ((m = s.match(/^gross lage (-?\d+) (-?\d+) (\d+) (\d+) innen (\d+)x(\d+) .* display (\S+) sicht (\S+) opacity (\S+)/)))
      r.grossLage.push({ l: +m[1], o: +m[2], b: +m[3], h: +m[4], drin: +m[1] >= 0 && +m[2] >= 0 && +m[1] + +m[3] <= +m[5] && +m[2] + +m[4] <= +m[6], display: m[7], sicht: m[8], opacity: +m[9] });
    else if ((m = s.match(/^klasse (\S+) \+beruehrt$/))) r.beruehrt.push({ ziel: m[1], nach: down === null ? null : t - down });
    else if ((m = s.match(/^stil (\S+) beruehrt opacity (\S+) hg (\S+)/))) { const b = r.beruehrt.findLast(x => x.ziel === m[1]); if (b) { b.opacity = +m[2]; b.hg = m[3]; } }
    else if ((m = s.match(/^klasse (\S+) \+hebt$/))) r.hebt.push({ ziel: m[1], nach: down === null ? null : t - down });
    else if ((m = s.match(/^stil (\S+) hebt(-0\.4s)? opacity \S+ hg \S+ transform (\S+) filter (\S+)/))) { const h = r.hebt.findLast(x => x.ziel === m[1]); if (h) { h[m[2] ? 'spaet' : 'frueh'] = { transform: m[3], filter: m[4] }; } }
    else if ((m = s.match(/^klasse (\S+) -hebt$/))) { const h = r.hebt.findLast(x => x.ziel === m[1] && x.bis === undefined); if (h) h.bis = down === null ? null : t - down; }
    else if ((m = s.match(/^frage (\S+)/))) r.frage.push({ ziel: m[1], nach: down === null ? null : t - down });
    else if ((m = s.match(/^(contextmenu|selectstart|dragstart) (\S+) verhindert (\w+)/))) r.kontext.push({ was: m[1], ziel: m[2], verhindert: m[3] === 'ja' });
    else if ((m = s.match(/^auswahl (\d+)/))) r.auswahl = Math.max(r.auswahl, +m[1]);
    else if ((m = s.match(/^ausgeloest (\S+)/))) r.ausgeloest.push(m[1]);
  }
  return r;
}

export function bericht(faelle) {
  return faelle.map(f => {
    const teile = [`Fall ${f.nr} ${f.v} ${f.schrift} (ts ${f.ts}${f.ax ? ', AX' : ''})${f.fertig ? '' : ' – nicht fertig'}:`];
    teile.push(`Großanzeige ${f.gross}×${f.grossLage.length ? ' ' + f.grossLage.map(g => `${g.b}×${g.h} bei ${g.l},${g.o} ${g.drin ? 'ganz drin' : 'NICHT ganz drin'} ${g.display}/${g.sicht}/${g.opacity}`).join('; ') : ''}`);
    if (f.beruehrt.length) teile.push('berührt ' + f.beruehrt.map(b => `${b.ziel} nach ${b.nach} ms opacity ${b.opacity ?? '?'} hg ${b.hg ?? '?'}`).join('; '));
    if (f.hebt.length) teile.push('hebt ' + f.hebt.map(h => `${h.ziel} ${h.nach}–${h.bis ?? '…'} ms ${h.frueh ? h.frueh.transform + ' ' + h.frueh.filter : ''}${h.spaet ? ' → ' + h.spaet.transform : ''}`).join('; '));
    if (f.frage.length) teile.push('Frage ' + f.frage.map(q => `${q.ziel} nach ${q.nach} ms`).join('; '));
    if (f.abbruch.length) teile.push('Abbruch ' + f.abbruch.map(a => `${a.was} ${a.ziel} nach ${a.nach} ms`).join('; '));
    if (f.kontext.length) teile.push(f.kontext.map(k => `${k.was} ${k.ziel}${k.verhindert ? ' (verhindert)' : ''}`).join('; '));
    teile.push(`Textauswahl ${f.auswahl} Zeichen`, `ausgelöst ${f.ausgeloest.join(', ') || 'nichts'}`);
    return teile.join(' · ');
  }).join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const m = lies(readFileSync(process.argv[2], 'utf8'));
  console.log(m.kopf.join('\n'));
  console.log(bericht(werteAus(m)));
}
