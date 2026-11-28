// AppDesign · tests/schnittstelle-zerleger.mjs – zerlegt JavaScript grob in Namen (APD-135/B-4.1, R-1.14).
// Kommentare und Zeichenketten fallen weg, der Code in `${…}` bleibt; Regex-Literale werden übersprungen.
// Ergebnis: Liste { name, zeile } aller Namen außerhalb von Zeichenketten, ohne Namen nach einem Punkt (Eigenschaften).

const KW = new Set('break case catch class const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield async await of null true false undefined static get set'.split(' '));

export function woerter(src) {
  const out = []; let i = 0, zeile = 1, prev = '';
  const n = src.length; const stack = [];   // für `${ … }`: Tiefe der Klammern
  const regexErlaubt = () => prev === '' || /[(,=:[!&|?{};+\-*%<>~^]$/.test(prev) || ['return', 'typeof', 'case', 'do', 'else', 'in', 'of', 'new', 'delete', 'void', 'throw'].includes(prev);
  const vorlage = () => {           // innerhalb von `…`, i steht nach dem Backtick oder nach `}`
    while (i < n) {
      const c = src[i];
      if (c === '\\') { i += 2; continue; }
      if (c === '\n') zeile++;
      if (c === '`') { i++; prev = 'x'; return; }
      if (c === '$' && src[i + 1] === '{') { i += 2; stack.push(0); prev = '{'; return 'code'; }
      i++;
    }
  };
  while (i < n) {
    const c = src[i];
    if (c === '\n') { zeile++; i++; continue; }
    if (/\s/.test(c)) { i++; continue; }
    if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); const t = src.slice(i, e < 0 ? n : e); zeile += (t.match(/\n/g) || []).length; i = e < 0 ? n : e + 2; continue; }
    if (c === '"' || c === "'") { i++; while (i < n && src[i] !== c) { if (src[i] === '\\') i++; else if (src[i] === '\n') zeile++; i++; } i++; prev = 'x'; continue; }
    if (c === '`') { i++; vorlage(); continue; }
    if (c === '/' && regexErlaubt()) { i++; let k = false; while (i < n) { const d = src[i]; if (d === '\\') { i += 2; continue; } if (d === '[') k = true; else if (d === ']') k = false; else if (d === '/' && !k) break; else if (d === '\n') break; i++; } i++; while (/[a-z]/i.test(src[i] || '')) i++; prev = 'x'; continue; }
    if (c === '{') { if (stack.length) stack[stack.length - 1]++; prev = '{'; i++; continue; }
    if (c === '}') { if (stack.length) { if (stack[stack.length - 1] === 0) { stack.pop(); i++; vorlage(); continue; } stack[stack.length - 1]--; } prev = '}'; i++; continue; }
    const m = /^[A-Za-z_$][\w$]*/.exec(src.slice(i, i + 80));
    if (m) {
      const w = m[0]; let j = i - 1; while (j >= 0 && /[ \t]/.test(src[j])) j--;
      const nachPunkt = src[j] === '.' && src[j - 1] !== '.';
      if (!KW.has(w) && !nachPunkt) out.push({ name: w, zeile });
      prev = w; i += w.length; continue;
    }
    if (/\d/.test(c)) { while (/[\w.]/.test(src[i] || '')) i++; prev = 'x'; continue; }
    prev = c; i++;
  }
  return out;
}

// Deklarationen auf oberster Ebene (Zeilenanfang): function, async function, class, const/let/var (auch { a, b } und [a, b]).
export function deklarationen(src) {
  const namen = []; let zeile = 0;
  for (const l of src.split('\n')) {
    zeile++;
    let m = /^(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)/.exec(l) || /^class\s+([A-Za-z_$][\w$]*)/.exec(l);
    if (m) { namen.push({ name: m[1], zeile }); continue; }
    m = /^(?:const|let|var)\s+(.*)$/.exec(l);
    if (!m) continue;
    let rest = m[1];
    const d = /^[{[]([^}\]]*)[}\]]/.exec(rest);
    if (d) { for (const t of d[1].split(',')) { const k = t.split(':').pop().split('=')[0].trim(); if (/^[A-Za-z_$][\w$]*$/.test(k)) namen.push({ name: k, zeile }); } continue; }
    // mehrere: let a = 1, b = 2 – Zeichenketten vorher leeren, dann Teile auf Klammertiefe 0, je Teil ‚Name‘ oder ‚Name = …‘
    rest = rest.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g, "''");
    let tiefe = 0, teil = '';
    const teile = [];
    for (const ch of rest) {
      if ('([{'.includes(ch)) tiefe++; else if (')]}'.includes(ch)) tiefe--;
      if (tiefe === 0 && (ch === ',' || ch === ';')) { teile.push(teil); teil = ''; if (ch === ';') break; continue; }
      teil += ch;
    }
    if (teil) teile.push(teil);
    for (const t of teile) { const k = /^\s*([A-Za-z_$][\w$]*)\s*(=|$)/.exec(t); if (k) namen.push({ name: k[1], zeile }); }
  }
  return namen;
}
