// APD-81 · Messung aus dem Muster auswerten (arbeit/APD-81 Muster.html): holt Rückgängig den geleerten Text zurück?
//   node "arbeit/APD-81 auswerten.mjs" <messung-APD-81-….txt>
// Je Fall: wie geleert wurde (wert | befehl), ob der Bearbeiten-Befehl ausgeführt wurde, die Rückgängig-Ereignisse (inputType
// historyUndo) und ob die volle Länge vom Fallbeginn danach wieder im Feld stand (zurückgeholt). Bewertet wird nur hier, nie am Gerät.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function lies(text) {
  const kopf = [], zeilen = [];
  text.split('\n').forEach((z, i) => {
    if (!z.trim()) return;
    if (z.startsWith('#')) { kopf.push(z.slice(1).trim()); return; }
    const m = /^(\d+) (.+)$/.exec(z);
    if (!m) throw new Error(`Zeile ${i + 1}: unbekannt – ${z}`);
    zeilen.push({ t: +m[1], s: m[2] });
  });
  return { kopf, zeilen };
}

export function werteAus({ zeilen }) {
  const faelle = [];
  let fall = null;
  for (const { t, s } of zeilen) {
    let m;
    if ((m = /^fall (\d+) (\w+) laenge (\d+)$/.exec(s))) {
      fall = { nr: +m[1], art: m[2], laenge: +m[3], geleert: false, befehl: '-', undo: 0, zurueck: false, ende: null, t0: t };
      if (fall.art !== 'ende') faelle.push(fall);
      continue;
    }
    if (!fall) continue;
    if ((m = /^leeren (\w+) laenge (\d+) -> (\d+) befehl (\S+)$/.exec(s))) {
      fall.geleert = +m[3] === 0; fall.befehl = m[4]; fall.zurueck = false; fall.undo = 0;
    } else if ((m = /^input (\S+) laenge (\d+)$/.exec(s)) && fall.geleert) {
      if (m[1] === 'historyUndo') fall.undo++;
      if (+m[2] === fall.laenge) fall.zurueck = true;
    } else if ((m = /^fertig (\d+) laenge (\d+)$/.exec(s)) && +m[1] === fall.nr) {
      fall.ende = +m[2];
    }
  }
  // je Fallnummer zählt die letzte Aufnahme (‚Fall neu‘ wiederholt einen Fall)
  const letzte = new Map(faelle.filter(x => x.ende !== null).map(x => [x.nr, x]));
  return [...letzte.values()].sort((a, b) => a.nr - b.nr);
}

export function bericht(ergebnis) {
  return ergebnis.map(x => `Fall ${x.nr} (${x.art}): ${!x.geleert ? 'nicht geleert' : x.zurueck ? 'zurückgeholt' : 'nicht zurückgeholt'}` +
    ` · Rückgängig ${x.undo}× · Befehl ${x.befehl} · Länge ${x.laenge} → am Ende ${x.ende}`).join('\n');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const datei = process.argv[2];
  if (!datei) { console.error('Aufruf: node "arbeit/APD-81 auswerten.mjs" <Messdatei>'); process.exit(2); }
  const m = lies(readFileSync(datei, 'utf8'));
  console.log(m.kopf.join('\n'));
  console.log(bericht(werteAus(m)));
}
