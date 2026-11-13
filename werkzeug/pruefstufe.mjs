// AppDesign 4.58.0 · Prüfstufe einer App-Version (APD-128, Zusammenarbeit allgemein 0 Nr. 2; Testfall-Liste arbeit/APD-128 Testfall-Liste.md).
// Stufe Text, wenn sich nur Texte der App geändert haben: index.html und tests/*.mjs ohne die Inhalte der Zeichenketten und die Kommentare
// unverändert (APD-128/V-4), sonst nur Doku (*.md) und Versionsstellen, AppDesign unverändert, und die vorige Version voll geprüft (APD-128/D-4).
// Dann laufen die Grundprüfungen und alle Prüfungen mit dem alten oder neuen Text, ohne hig (APD-128/D-3). Sonst voll – im Zweifel voll (D-2).
// Rein: bewerte() bekommt alle Stände als Text; das Lesen aus Git macht veroeffentlichen.mjs.

export const GRUNDPRUEFUNGEN = ['doku-regeln', 'version-regeln', 'text-regeln'];
export const NIE_IN_STUFE_TEXT = ['hig'];
const REGEX_DAVOR = new Set([...'(,=:[!&|?{};+-*%<>~^']);
const REGEX_WORT = new Set(['return', 'typeof', 'case', 'in', 'of', 'void', 'delete', 'new', 'instanceof', 'throw', 'else', 'do']);

// Zerlegt JavaScript bzw. HTML mit Skript in Code-Wörter (mit Zeile), Zeichenketten und Kommentare. Zeichenketten: '…', "…" und die
// Textteile von `…` (die Ausdrücke in ${…} sind Code, auch mit Zeichenketten darin). Regex-Literale bleiben Code (APD-128/M-18).
export function zerlege(text) {
  const woerter = [], strings = [], kommentare = [];
  let i = 0, zeile = 1, code = '', codeZeile = 1;
  const n = text.length;
  const flush = () => { for (const m of code.matchAll(/\S+|\n/g)) { if (m[0] === '\n') { codeZeile++; continue; } woerter.push({ v: m[0], zeile: codeZeile }); } code = ''; codeZeile = zeile; };
  const zaehle = s => { for (const c of s) if (c === '\n') zeile++; };
  const letztesZeichen = () => { const m = code.match(/(\S)\s*$/); if (m) return m[1]; const w = woerter.at(-1); return w ? w.v.at(-1) : ''; };
  const letztesWort = () => { const m = code.match(/([A-Za-z_$][\w$]*)\s*$/); if (m) return m[1]; if (/\S/.test(code)) return ''; const w = woerter.at(-1); return w && /^[A-Za-z_$][\w$]*$/.test(w.v) ? w.v : ''; };
  const zeichenkette = q => {   // i steht auf dem öffnenden Anführungszeichen
    let j = i + 1, v = '';
    while (j < n && text[j] !== q) { if (text[j] === '\\') { v += text[j] + (text[j + 1] ?? ''); j += 2; continue; } if (text[j] === '\n' && q !== '`') break; v += text[j++]; }
    return { v, ende: j + 1 };
  };
  // Vorlage `…${…}…`: Textteile als Zeichenketten, Ausdrücke rekursiv als Code
  const vorlage = () => {
    let j = i + 1, teil = '';
    code += ' `'; flush();
    while (j < n && text[j] !== '`') {
      if (text[j] === '\\') { teil += text[j] + (text[j + 1] ?? ''); j += 2; continue; }
      if (text[j] === '$' && text[j + 1] === '{') {
        strings.push(teil); woerter.push({ v: '⟨S⟩', zeile }); zaehle(teil); teil = '';
        let tiefe = 1, k = j + 2;
        // Ausdruck bis zur passenden Klammer – Zeichenketten und Vorlagen darin überspringen
        while (k < n && tiefe) {
          const c = text[k];
          if (c === '{') tiefe++; else if (c === '}') tiefe--;
          else if (c === '"' || c === "'" || c === '`') { const s = c === '`' ? vorlagenEnde(k) : stringEnde(k, c); k = s; continue; }
          if (tiefe) k++;
        }
        const ausdruck = text.slice(j + 2, k), inner = zerlege(ausdruck);
        woerter.push({ v: '${', zeile });
        for (const w of inner.woerter) woerter.push({ v: w.v, zeile: zeile + w.zeile - 1 });
        strings.push(...inner.strings); kommentare.push(...inner.kommentare);
        woerter.push({ v: '}', zeile });
        zaehle(ausdruck); j = k + 1; continue;
      }
      teil += text[j++];
    }
    strings.push(teil); woerter.push({ v: '⟨S⟩`', zeile }); zaehle(teil);
    i = j + 1; codeZeile = zeile;
  };
  const stringEnde = (k, q) => { let j = k + 1; while (j < n && text[j] !== q && text[j] !== '\n') j += text[j] === '\\' ? 2 : 1; return j + 1; };
  const vorlagenEnde = k => {
    let j = k + 1;
    while (j < n && text[j] !== '`') {
      if (text[j] === '\\') { j += 2; continue; }
      if (text[j] === '$' && text[j + 1] === '{') { let t = 1; j += 2; while (j < n && t) { const c = text[j]; if (c === '{') t++; else if (c === '}') t--; else if (c === '"' || c === "'") { j = stringEnde(j, c); continue; } else if (c === '`') { j = vorlagenEnde(j); continue; } j++; } continue; }
      j++;
    }
    return j + 1;
  };
  while (i < n) {
    const c = text[i], d = text[i + 1];
    if (c === '/' && d === '/') { const e = text.indexOf('\n', i); const end = e < 0 ? n : e; kommentare.push(text.slice(i, end)); code += ' '; i = end; continue; }
    if (c === '/' && d === '*') { const e = text.indexOf('*/', i + 2); const end = e < 0 ? n : e + 2; const k = text.slice(i, end); kommentare.push(k); zaehle(k); code += '\n'.repeat((k.match(/\n/g) || []).length) || ' '; i = end; continue; }
    if (c === '/') {
      const vor = letztesZeichen();
      if (vor === '' || REGEX_DAVOR.has(vor) || REGEX_WORT.has(letztesWort())) {   // Regex-Literal: bis zum schließenden / (Klassen [..] beachten)
        let j = i + 1, klasse = false;
        while (j < n && text[j] !== '\n' && (klasse || text[j] !== '/')) { if (text[j] === '\\') j++; else if (text[j] === '[') klasse = true; else if (text[j] === ']') klasse = false; j++; }
        if (text[j] === '/') { j++; while (/[a-z]/i.test(text[j] ?? '')) j++; code += text.slice(i, j); i = j; continue; }
      }
      code += c; i++; continue;
    }
    if (c === "'" || c === '"') {
      code += ' '; flush();
      const { v, ende } = zeichenkette(c);
      strings.push(v); woerter.push({ v: `⟨S${c}⟩`, zeile }); zaehle(v); i = ende; codeZeile = zeile; continue;
    }
    if (c === '`') { vorlage(); continue; }
    if (c === '\n') zeile++;
    code += c; i++;
  }
  flush();
  return { woerter, strings, kommentare };
}

// Sieht eine Zeichenkette wie ein Text aus? (APD-128 Testfall-Liste ‚Wie das Skript nur Texte erkennt‘ Nr. 4)
const VERBOTEN = /[<>{};=]/;
const textartig = s => /[ \u0080-￿]/.test(s) && /[A-Z\u0080-￿]/.test(s);
export function istTextAenderung(alt, neu) {
  if (VERBOTEN.test(alt) || VERBOTEN.test(neu)) return false;
  return textartig(alt) || textartig(neu);
}

const STYLE = /<style\b[^>]*>[\s\S]*?<\/style>/g;
// Versionsstellen, die ‚vorbereiten‘ setzt – vor dem Vergleich gleich gemacht
const versionsstellen = (f, t, cache) => f === 'index.html'
  ? t.replace(/const APP_VERSION = '[^']*';/, "const APP_VERSION = '';").replace(/const APP_BUILT = '[^']*';/, "const APP_BUILT = '';")
  : f === 'sw.js' ? t.replace(new RegExp(`const CACHE = '${cache}-[\\d.]+';`), `const CACHE = '${cache}-';`) : t;
const adNeeded = t => t.match(/const AD_NEEDED = '([\d.]+)'/)?.[1];
const fassungsPfade = t => (t.match(/\.\.\/AppDesign\/(?:v4|fassung\/[\d.]+)\//g) || []).join();

// aenderungen: [{ f, alt, neu }] (alt bzw. neu null = neu angelegt bzw. gelöscht); pruefungen: { name: Inhalt der Prüfdatei (neuer Stand) },
// nur die Prüfungen aus tests/alle.mjs; adOnline: die AppDesign-Version der App ist veröffentlicht (nichts vorbereitet); vorigeText: die
// vorige Version lief mit Stufe Text. ohneCode: Gegenprobe APD-128/M-17 (Code und <style> werden nicht verglichen).
export function bewerte({ aenderungen, pruefungen = {}, cache = '', adOnline = true, vorigeText = false, ohneCode = false }) {
  const gruende = [], texte = [], geaenderteTests = [];
  if (vorigeText) gruende.push('vorige Version mit Stufe Text geprüft – diese voll (APD-128/D-4)');
  if (!adOnline) gruende.push('AppDesign geändert (Version vorbereitet, noch nicht veröffentlicht)');
  for (const { f, alt, neu } of aenderungen) {
    if (/\.md$/i.test(f)) continue;
    const istTest = /^tests\/[^/]+\.mjs$/.test(f);
    if (!['index.html', 'sw.js'].includes(f) && !istTest) { gruende.push(`${f} geändert`); continue; }
    if (alt == null || neu == null) { gruende.push(`${f} ${alt == null ? 'neu' : 'gelöscht'}`); continue; }
    if (istTest) geaenderteTests.push(f.slice(6, -4));
    if (f === 'index.html' && (adNeeded(alt) !== adNeeded(neu) || fassungsPfade(alt) !== fassungsPfade(neu))) { gruende.push('AppDesign geändert (AD_NEEDED bzw. Fassungs-Pfad in index.html)'); continue; }
    const a = versionsstellen(f, alt, cache), b = versionsstellen(f, neu, cache);
    if (f === 'sw.js') { if (a !== b && !ohneCode) gruende.push('sw.js außerhalb von CACHE geändert'); continue; }
    if (!ohneCode && (a.match(STYLE) || []).join('\0') !== (b.match(STYLE) || []).join('\0')) { gruende.push(`${f}: <style> geändert`); continue; }
    const za = zerlege(a), zb = zerlege(b);
    if (!ohneCode) {
      const len = Math.max(za.woerter.length, zb.woerter.length);
      let k = 0; while (k < len && za.woerter[k]?.v === zb.woerter[k]?.v) k++;
      if (k < len) { gruende.push(`${f} Zeile ${(zb.woerter[k] || zb.woerter.at(-1) || { zeile: 1 }).zeile}: Code geändert`); continue; }
    }
    if (za.strings.length !== zb.strings.length) { gruende.push(`${f}: Zahl der Zeichenketten geändert`); continue; }
    for (let k = 0; k < za.strings.length; k++) {
      const s = za.strings[k], t = zb.strings[k];
      if (s === t) continue;
      if (!istTextAenderung(s, t)) { gruende.push(`${f}: Zeichenkette ‚${kurz(s)}‘ → ‚${kurz(t)}‘ ist kein Text`); continue; }
      texte.push(s, t);
    }
  }
  if (gruende.length) return { stufe: 'voll', gruende, pruefungen: [] };
  const such = [...new Set(texte.filter(Boolean))];
  const auswahl = new Set(GRUNDPRUEFUNGEN.filter(p => p in pruefungen));
  for (const [name, inhalt] of Object.entries(pruefungen)) if (such.some(s => inhalt.includes(s)) || geaenderteTests.includes(name)) auswahl.add(name);
  for (const p of NIE_IN_STUFE_TEXT) auswahl.delete(p);
  return { stufe: 'text', gruende: [], pruefungen: [...auswahl], texte: such };
}
const kurz = s => s.length > 40 ? s.slice(0, 37) + '…' : s;

// Namen der Prüfungen aus tests/alle.mjs (in Anführungszeichen, als Datei vorhanden)
export const pruefungenAusListe = (alle, dateien) => [...new Set([...alle.matchAll(/['"]([\w-]+)['"]/g)].map(m => m[1]).filter(n => dateien.includes(n)))];
