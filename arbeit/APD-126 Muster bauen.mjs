// APD-126 / RLB-123 · Muster ‚Cursor am Ende, leer einzeilig, Vorschläge über dem Feld‘ bauen (Sitzung Reiselogbuch 0098). Kopie von
// fassung/4.56.0/ui.js mit APD-126/W-1 (Textfelder leer einzeilig, wachsen und schrumpfen) und APD-126/W-2 (R-5.11 Cursor am Ende) nach
// `arbeit/APD-126/ui.js`; die Seite `arbeit/APD-126/index.html` lädt sie mit fassung/4.56.0/design.css.
//   node "arbeit/APD-126 Muster bauen.mjs"      (im Ordner AppDesign)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const QUELLE = new URL('../fassung/4.56.0/ui.js', import.meta.url), ZIEL = new URL('./APD-126/', import.meta.url);
mkdirSync(ZIEL, { recursive: true });
let u = readFileSync(QUELLE, 'utf8');
const ersetze = (alt, neu) => { if (u.split(alt).length !== 2) throw new Error('nicht genau einmal: ' + alt.slice(0, 80)); u = u.replace(alt, () => neu); };

// APD-126/W-1: so hoch wie der Inhalt – auch niedriger (Höhe erst auf 0, sonst zählt die alte Höhe bzw. rows mit); mindestens 44 px (design.css)
ersetze("function autoGrow(ta) {\n  ta.style.height = 'auto';", "function autoGrow(ta) {\n  ta.style.height = '0px';");

u = `
// ---------- Muster APD-126 (vorn: der Rest von ui.js bricht ohne die App-Seite ab) (Sitzung 0098) ----------
// APD-126/W-1: jedes Textfeld wächst und schrumpft beim Tippen, Einfügen und Leeren mit – in ui.js für alle Felder, die App setzt nichts selbst
document.addEventListener('input', e => { if (e.target.tagName === 'TEXTAREA') autoGrow(e.target); });
document.querySelectorAll('textarea').forEach(autoGrow);
// APD-126/W-2 (R-5.11): wird ein Feld aktiviert (Antippen, Tab, Fokus durch die App), steht der Cursor am Ende; im aktiven Feld setzt
// Antippen ihn an die Stelle. Safari setzt den Cursor nach dem Fokus noch selbst (beim Loslassen bzw. per selectionchange) – kurz nachsetzen.
const CE = 'input:is([type=text], [type=search], [type=email], [type=url], [type=tel], [type=number], :not([type])), textarea';
let ceFeld = null, ceBis = 0;
const ceEnde = f => { try { const n = f.value.length; if (f.selectionStart !== n || f.selectionEnd !== n) f.setSelectionRange(n, n); } catch {} };
window.addEventListener('focusin', e => { const f = e.target; if (!f.matches?.(CE)) return; ceFeld = f; ceBis = performance.now() + 700; ceEnde(f); setTimeout(() => ceFeld === f && ceEnde(f)); }, true);
document.addEventListener('selectionchange', () => { const f = document.activeElement;
  if (f === ceFeld && performance.now() <= ceBis && (f.selectionStart === f.selectionEnd || f.selectionStart === 0 && f.selectionEnd === f.value.length)) ceEnde(f); });   // Tab wählt alles aus
for (const t of ['pointerup', 'mouseup', 'touchend']) window.addEventListener(t, e => { if (e.target === ceFeld && performance.now() <= ceBis) setTimeout(() => ceEnde(ceFeld)); }, true);
window.addEventListener('click', e => { if (e.target !== ceFeld || performance.now() > ceBis) return;
  setTimeout(() => { if (ceFeld) ceEnde(ceFeld); ceBis = performance.now() + 120; }); }, true);   // danach gilt Antippen wieder der Stelle
window.addEventListener('focusout', e => { if (e.target === ceFeld) { ceFeld = null; ceBis = 0; } }, true);
` + u;
writeFileSync(new URL('ui.js', ZIEL), u);
console.log('APD-126 Muster gebaut: arbeit/APD-126/ui.js');
