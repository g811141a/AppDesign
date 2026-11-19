// AppDesign · tests/schnittstelle.mjs – R-1.14 Schnittstelle von ui.js (APD-135/B-4.1, seit 4.64.0). Ohne Browser.
// checkSchnittstelle(appDir, { ui, liste, html, pruefdateien }) liefert Fehlertexte:
// · die App nutzt einen Namen von ui.js, der nicht im Teil `app` von schnittstelle.json steht (innerer Name)
// · eine Prüfdatei nutzt einen Namen von ui.js, der weder in `app` noch in `pruefungen` steht und in der Datei nicht selbst vergeben ist
// · eine Deklaration der App auf oberster Ebene trägt den Namen eines Bausteins von ui.js (Namensgleichheit, U-34 Nr. 4)
// · ein Name der Liste fehlt in ui.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { woerter, deklarationen } from './schnittstelle-zerleger.mjs';

const hier = path.dirname(fileURLToPath(import.meta.url));
// in der festen Fassung liegt ui.js neben tests/, im Arbeitsstand AppDesign/tests unter v4/
const basis = fs.existsSync(path.join(hier, '..', 'ui.js')) ? path.join(hier, '..') : path.join(hier, '..', 'v4');

export function lokaleNamen(s) {
  const lokal = new Set([...s.matchAll(/\b(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g)].map(m => m[1]));
  for (const m of s.matchAll(/\b(?:const|let|var)\s*[{[]([^}\]]*)[}\]]/g)) for (const t of m[1].split(',')) { const k = t.split(':').pop().split('=')[0].trim(); if (k) lokal.add(k); }
  for (const m of s.matchAll(/\(([^()]*)\)\s*=>|function\s*[\w$]*\s*\(([^()]*)\)|([A-Za-z_$][\w$]*)\s*=>/g))
    for (const t of (m[1] || m[2] || m[3] || '').split(',')) { const k = t.replace(/[{}[\]]/g, '').split('=')[0].trim(); if (/^[A-Za-z_$][\w$]*$/.test(k)) lokal.add(k); }
  return lokal;
}

export function checkSchnittstelle(appDir, {
  ui = path.join(basis, 'ui.js'),
  liste = path.join(basis, 'schnittstelle.json'),
  html = path.join(appDir, 'index.html'),
  pruefdateien = fs.readdirSync(path.join(appDir, 'tests')).filter(f => f.endsWith('.mjs')).map(f => path.join(appDir, 'tests', f)),
} = {}) {
  const fehler = [];
  const uiSrc = fs.readFileSync(ui, 'utf8');
  const uiN = new Set(deklarationen(uiSrc).map(d => d.name));
  const L = JSON.parse(fs.readFileSync(liste, 'utf8'));
  const appOk = new Set(L.app), prOk = new Set([...L.app, ...L.pruefungen]);
  for (const n of [...L.app, ...L.pruefungen]) if (!uiN.has(n)) fehler.push(`R-1.14 schnittstelle.json: ‚${n}‘ gibt es in ui.js nicht`);
  const htmlSrc = fs.readFileSync(html, 'utf8');
  // Skripte der App mit ihrer Startzeile, damit die Meldung die Zeile in index.html nennt
  for (const m of htmlSrc.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    const start = htmlSrc.slice(0, m.index + m[0].indexOf('>') + 1).split('\n').length - 1;
    const code = m[1];
    const eigene = deklarationen(code);
    const eigeneN = new Set(eigene.map(d => d.name));
    for (const d of eigene) if (uiN.has(d.name)) fehler.push(`R-1.14 ${path.basename(html)} Z. ${start + d.zeile}: ‚${d.name}‘ hat denselben Namen wie ein Baustein von ui.js`);
    for (const w of woerter(code)) if (uiN.has(w.name) && !eigeneN.has(w.name) && !appOk.has(w.name))
      fehler.push(`R-1.14 ${path.basename(html)} Z. ${start + w.zeile}: innerer Name ‚${w.name}‘ von ui.js (nicht in schnittstelle.json, Teil app)`);
  }
  for (const f of pruefdateien) {
    const s = fs.readFileSync(f, 'utf8');
    const lokal = lokaleNamen(s);
    for (const w of woerter(s)) if (uiN.has(w.name) && !prOk.has(w.name) && !lokal.has(w.name))
      fehler.push(`R-1.14 ${path.basename(f)} Z. ${w.zeile}: innerer Name ‚${w.name}‘ von ui.js (weder app noch pruefungen in schnittstelle.json)`);
  }
  return fehler;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const f = checkSchnittstelle(path.resolve(process.argv[2] || '.'));
  console.log(f.length ? f.join('\n') : 'schnittstelle: alles in Ordnung');
  process.exitCode = f.length ? 1 : 0;
}
