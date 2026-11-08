// APD-124 · Muster ‚Rückgängig im Feld nach dem Leeren‘ bauen (Sitzung Reiselogbuch 0095, neu aufgesetzt in 0102). Seit 0102 auf dem Muster
// APD-126 (`arbeit/APD-126/ui.js` = fassung/4.56.0/ui.js mit Cursor am Ende und leer einzeilig – vorher `node "arbeit/APD-126 Muster bauen.mjs"`)
// mit dem geänderten ⓧ (APD-124/E-1 bis APD-124/E-3) nach `arbeit/APD-124/ui.js`; die Seite `arbeit/APD-124/index.html` lädt sie mit
// fassung/4.56.0/design.css und ‚leer einzeilig‘ (APD-126/W-5). Gegenprobe: PRUEF_V=heute lädt fassung/4.56.0/ui.js.
//   node "arbeit/APD-124 Muster bauen.mjs"      (im Ordner AppDesign)
// Variante über ?v=a (Rückgängig als graue Linie, Lucide undo-2) bzw. ?v=b (weiß im grauen Kreis wie das ⓧ).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const QUELLE = new URL('./APD-126/ui.js', import.meta.url), ZIEL = new URL('./APD-124/', import.meta.url);
mkdirSync(ZIEL, { recursive: true });
let u = readFileSync(QUELLE, 'utf8');
const ersetze = (alt, neu) => { if (u.split(alt).length !== 2) throw new Error('nicht genau einmal: ' + alt.slice(0, 80)); u = u.replace(alt, () => neu); };

// Icons: ⓧ wie bisher; Rückgängig nach Variante
ersetze("let fxFeld = null, fxTippt = false, fxRahmen = null, fxFrage = false;",
`const FX_X = fxBtn.innerHTML, FX_V = new URLSearchParams(location.search).get('v') === 'b' ? 'b' : 'a';
const FX_RUECK = FX_V === 'b'
  ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><g transform="translate(5.5 5.5) scale(.54)" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></g></svg>'
  : '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>';
// APD-124: nach dem Leeren merkt sich das Feld den Text (fxRueck) – bis zur ersten Eingabe bzw. bis es den Fokus verliert (APD-124/E-2)
let fxFeld = null, fxTippt = false, fxRahmen = null, fxFrage = false, fxRueck = null, fxArt = 'x';
const fxMeld = t => { const m = document.getElementById('meldung'); if (m) m.textContent = t; };`);

// Zeigen: auch im leeren Feld, solange es einen Text zum Zurückholen hat – dann mit dem Rückgängig-Icon
ersetze("  const f = document.activeElement, an = f?.matches?.(FX) && f.value !== '' ? f : null;",
`  const f = document.activeElement;
  if (fxRueck && fxRueck.feld !== f && !fxTippt) fxRueck = null;   // APD-124/E-2: Fokus weg – Rückgängig verfällt
  const an = f?.matches?.(FX) && (f.value !== '' || fxRueck?.feld === f) ? f : null;
  const art = an && an.value === '' ? 'rueck' : 'x';
  if (art !== fxArt) { fxArt = art; fxBtn.innerHTML = art === 'rueck' ? FX_RUECK : FX_X;
    fxBtn.setAttribute('aria-label', art === 'rueck' ? 'Löschen widerrufen' : 'Eingabe löschen'); fxBtn.classList.toggle('rueck', art === 'rueck'); }`);

// Leeren: Text merken und in die Zwischenablage (Tipp = Geste des Nutzers), dann wie bisher über den Bearbeiten-Befehl
ersetze("function fxLeeren(f) {\n  if (document.activeElement !== f) f.focus();",
`function fxLeeren(f) {
  const text = f.value;
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => fxMeld('Zwischenablage: ' + text.length + ' Zeichen kopiert'),
    e => fxMeld('Zwischenablage abgelehnt: ' + (e?.name || e)));
  else fxMeld('Zwischenablage: nicht verfügbar');
  fxLeerenOhne(f);
  if (f.value === '') fxRueck = { feld: f, text };
}
// Rückgängig: Text über den Bearbeiten-Befehl wieder einsetzen (die Undo-Taste kennt den Schritt dann auch); sonst über den Wert
function fxZurueck(f, text) {
  if (document.activeElement !== f) f.focus({ preventScroll: true });
  fxRueck = null;
  let ok = false;
  try { ok = document.execCommand('insertText', false, text); } catch {}
  if (ok && f.value === text) return;
  f.value = text;
  f.dispatchEvent(new Event('input', { bubbles: true }));
}
function fxLeerenOhne(f) {
  if (document.activeElement !== f) f.focus();`);

// Antippen: Rückgängig oder Leeren – ohne Sprechblase, auch mehrzeilig (APD-124/E-1)
ersetze(`  if (f.tagName === 'TEXTAREA' && fxZeilen(f) > 1) {
    fxFrage = true;
    let ja = false;
    try { ja = await confirmPop(fxBtn, 'Text löschen?', { label: 'Löschen' }, { label: 'Abbrechen' }, { feld: f }); } finally { fxFrage = false; }
    if (document.activeElement !== f) f.focus({ preventScroll: true });
    if (ja && f.isConnected) fxLeeren(f);
  } else fxLeeren(f);`,
`  if (fxArt === 'rueck' && fxRueck?.feld === f) fxZurueck(f, fxRueck.text);
  else fxLeeren(f);`);

// erste Eingabe nach dem Leeren: Rückgängig verfällt (APD-124/E-3: danach wieder das ⓧ)
ersetze("document.addEventListener('input', () => queueMicrotask(fxZeigen));",
"document.addEventListener('input', e => { if (fxRueck && e.target === fxRueck.feld && e.target.value !== '') fxRueck = null; queueMicrotask(fxZeigen); });");

writeFileSync(new URL('ui.js', ZIEL), u);
console.log('APD-124 Muster gebaut: arbeit/APD-124/ui.js');
