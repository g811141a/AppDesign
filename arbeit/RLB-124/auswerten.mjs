// RLB-124 · Messdatei des Versuchs auswerten (Zusammenarbeit 2.7: bewertet wird nur aus den Rohdaten).
//   node arbeit/RLB-124/auswerten.mjs <messung-RLB-124-….txt>
// Je Fall: was der Knopf ausgelöst hat (print, Rahmen, Fenster, Teilen), ob beforeprint/afterprint kamen, Sichtbarkeit und Fokus, und die
// Antwort des Nutzers. ‚probleme‘ = Widersprüche in den Rohdaten (z. B. Druck-Fall ohne print-Aufruf, Antwort ‚kam‘ ohne afterprint).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const DRUCK = ['direkt', 'direkt-fenster', 'spaet', 'wie-app'];
export function werteAus(text) {
  const zeilen = text.split('\n').filter(z => z && !z.startsWith('#'));
  const kopf = zeilen.find(z => / start /.test(` ${z}`)) || '';
  const faelle = []; let akt = null;
  for (const z of zeilen) {
    const [, t, rest] = z.match(/^(\d+) (.*)$/) || [];
    if (!rest) continue;
    let m;
    if ((m = rest.match(/^los (\S+)/))) { akt = { id: m[1], t: +t, ereignisse: [], antwort: null }; continue; }
    if ((m = rest.match(/^antwort \d+ (\S+) (\S+)/))) { if (akt && akt.id === m[1]) { akt.antwort = m[2]; faelle.push(akt); } akt = null; continue; }
    if (akt) akt.ereignisse.push(`${+t - akt.t} ms ${rest}`);
  }
  // pro Fall nur der letzte Versuch (‚Fall neu‘ wiederholt)
  const letzte = Object.values(Object.fromEntries(faelle.map(f => [f.id, f])));
  const probleme = [];
  for (const f of letzte) {
    const e = f.ereignisse.join(' | ');
    f.druckAufruf = /print (direkt|spaet)/.test(e) && !/print fehler/.test(e) && /print zurueck/.test(e);
    f.rahmenAufruf = /rahmen print zurueck/.test(e);
    f.vorher = /beforeprint/.test(e); f.nachher = /afterprint/.test(e);
    f.weg = /sicht hidden|blur/.test(e);
    if (DRUCK.includes(f.id) && !f.druckAufruf) probleme.push(`${f.id}: kein print-Aufruf`);
    if (f.id === 'rahmen' && !f.rahmenAufruf) probleme.push('rahmen: kein print-Aufruf im Rahmen');
    if (f.id === 'wie-app' && !/fenster auf/.test(e)) probleme.push('wie-app: Fenster nicht offen');
    if (DRUCK.includes(f.id) && f.antwort === 'kam' && !f.nachher) probleme.push(`${f.id}: Antwort ‚kam‘, aber kein afterprint`);
    if (f.id === 'fenster' && !/fenster offen/.test(e)) probleme.push('fenster: kein window.open');
    if (/teilen$/.test(f.id) && !/teilen .+ canShare/.test(e)) probleme.push(`${f.id}: kein Teilen-Aufruf`);
  }
  return { kopf, home: / home /.test(` ${kopf} `), faelle: letzte, probleme };
}

export function bericht(erg) {
  const z = [`Kopf: ${erg.kopf}`, `Lauf: ${erg.home ? 'App vom Home-Bildschirm' : 'Safari (nicht Home-Bildschirm!)'}`];
  for (const f of erg.faelle) z.push(`- ${f.id}: Antwort ${f.antwort} · print ${f.druckAufruf || f.rahmenAufruf ? 'aufgerufen' : '–'} · beforeprint ${f.vorher ? 'ja' : 'nein'} · afterprint ${f.nachher ? 'ja' : 'nein'} · weg ${f.weg ? 'ja' : 'nein'}\n    ${f.ereignisse.join(' | ')}`);
  z.push(erg.probleme.length ? `Widersprüche: ${erg.probleme.join('; ')}` : 'Keine Widersprüche in den Rohdaten');
  return z.join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(bericht(werteAus(readFileSync(process.argv[2], 'utf8'))));
