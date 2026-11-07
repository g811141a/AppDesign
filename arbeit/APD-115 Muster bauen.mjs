// APD-115 · Muster ‚Rollen wie Apple‘ (APD-115/E-3, V-3) und ‚Bezeichnung direkt über dem Feld‘ (APD-115/E-5) bauen – Sitzung Reiselogbuch 0090.
//   node "arbeit/APD-115 Muster bauen.mjs"   (AppDesign und ReiseLogBuch nebeneinander)
// Erzeugt arbeit/APD-115/index.html aus ReiseLogBuch/index.html (3.52.0) und arbeit/APD-115/ui.js aus fassung/4.54.0/ui.js:
// - eigener Speicher `reiselogbuch.muster-apd115` (die echten Reisedaten unter `reiselogbuch.v1` bleiben unberührt), Beispielreise beim ersten Start,
//   kein Service Worker, kein Manifest;
// - Variante über die Adresse: ?v=a (Bezeichnung ‚Verlauf‘ direkt über dem Feld, Vorschläge darunter) · ?v=b (heute: Vorschläge zwischen
//   Überschrift und Feld). Beide rollen nach V-3.
// - ui.js: Rollen nach V-3 (Abschnitt ‚APD-115 V-3‘ in ui.js).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const AD = new URL('../', import.meta.url), RLB = new URL('../../ReiseLogBuch/', import.meta.url), ZIEL = new URL('./APD-115/', import.meta.url);
mkdirSync(ZIEL, { recursive: true });
const ersetze = (s, alt, neu) => { if (!s.includes(alt)) throw new Error('nicht gefunden: ' + alt.slice(0, 80)); return s.replace(alt, () => neu); };

// ---------- index.html ----------
let h = readFileSync(new URL('index.html', RLB), 'utf8');
h = ersetze(h, '<link rel="manifest" href="manifest.json">\n', '');
h = ersetze(h, '<link rel="apple-touch-icon" href="icon-180.png">', '<link rel="apple-touch-icon" href="../../../ReiseLogBuch/icon-180.png">');
h = ersetze(h, 'content="Reiselogbuch">', 'content="APD-115 Muster">');
h = ersetze(h, '<title>Reiselogbuch</title>', '<title>APD-115 Muster</title>');
h = ersetze(h, 'href="../AppDesign/fassung/4.54.0/design.css">', 'href="../../fassung/4.54.0/design.css">\n<style>/* APD-115/E-5 Variante A: Vorschläge unter dem Feld */ .v-a #suggest { margin: 10px 0 0; }</style>');
h = ersetze(h, '<script src="../AppDesign/fassung/4.54.0/ui.js"></script>', `<script>
// APD-115 Muster: Variante aus der Adresse (?v=a Standard, ?v=b heute)
const MUSTER_V = /[?&]v=b/.test(location.search) ? 'b' : 'a';
document.documentElement.classList.add('v-' + MUSTER_V);
</script>
<script src="ui.js"></script>`);
h = ersetze(h, "const STORAGE_KEY = 'reiselogbuch.v1';", "const STORAGE_KEY = 'reiselogbuch.muster-apd115';   // APD-115 Muster: eigener Speicher");
h = ersetze(h, "const OLD_STORAGE_KEY = 'reisetagebuch.v1';", "const OLD_STORAGE_KEY = 'reiselogbuch.muster-apd115';");
// Beispielreise beim ersten Start (ein Tag mit langem Verlauf für den Cursor-Fall)
h = ersetze(h, 'let db = load();', `let db = load();
if (!db.trips.length) {
  const days = {}, verlauf = ['Frühstück im Hotel', 'Spaziergang zum Hafen', 'Fähre nach Manly', 'Mittagessen am Strand', 'Rückfahrt mit der Fähre'];
  const lang = Array.from({ length: 14 }, (_, i) => \`Punkt \${i + 1}: \${['Opera House', 'Botanischer Garten', 'Circular Quay', 'The Rocks', 'Harbour Bridge', 'Darling Harbour', 'Chinatown'][i % 7]}\`).join('\\n');
  for (let i = 0; i < 12; i++) days[new Date(Date.UTC(2026, 7, 24 + i)).toISOString().slice(0, 10)] = { weather: '☀️', program: i === 3 ? lang : verlauf.slice(0, 2 + i % 4).join('\\n'),
    comment: i % 2 ? '😊 schöner Tag' : '', quarter: 'Oaks Hotel ' + (1 + (i >> 2)), place: 'Sydney, Australien' };
  db.trips.push({ id: 'muster', title: MUSTER_V === 'a' ? 'Muster A – Verlauf über dem Feld' : 'Muster B – heute', participants: 'Anna, Ben', start: '2026-08-24', end: '2026-09-04',
    transport: ['flug'], days, foodColumn: true });
  db.settings.lastTrip = 'muster'; db.settings.lastBackup = Date.now();
}
// Titel folgt der Variante der Adresse
for (const t of db.trips) if (t.id === 'muster') t.title = MUSTER_V === 'a' ? 'Muster A – Verlauf über dem Feld' : 'Muster B – heute';`);
// Variante A: Vorschläge unter das Feld
const chips = `          <div class="chips" id="suggest">
            \${PROGRAM_SUGGESTIONS.map((s, i) => \`<button type="button" data-s="\${i}">\${esc(s.label)}</button>\`).join('')}
          </div>
`;
const ta = `          <textarea id="fProgram" autocapitalize="sentences" autocorrect="on" spellcheck="true" placeholder="Wie ist der Tag verlaufen? Eine Zeile pro Punkt.">\${esc(e.program || '')}</textarea>
`;
// verschachtelte Vorlage in \${…} braucht kein Escaping
h = ersetze(h, chips + ta, `\${MUSTER_V === 'b' ? \`\n${chips}\` : ''}\n${ta}\${MUSTER_V === 'a' ? \`\n${chips}\` : ''}\n`);
h = ersetze(h, "if ('serviceWorker' in navigator && location.protocol === 'https:') {", "if (false) {   // APD-115 Muster: kein Service Worker");
// APD-115/N-11: der Messmodus zeichnet auch Fensterkopf und Rollstand des Fensters auf (Schritt 7 war nicht messbar)
h = ersetze(h, "rollen: { lroll: '.side-list' } }),", "rollen: { lroll: '.side-list', froll: 'dialog[open] .dlg-body' } }),");
h = ersetze(h, "lkopf: '.side-head', lsuch: '.side-search' },", "lkopf: '.side-head', lsuch: '.side-search', fkopf: 'dialog[open] .dlg-head' },");
writeFileSync(new URL('index.html', ZIEL), h);

// ---------- ui.js ----------
let u = readFileSync(new URL('fassung/4.54.0/ui.js', AD), 'utf8');
u = ersetze(u, `addEventListener('touchstart', () => { beruehrt = performance.now(); gerollt = null; halten = null; }, { capture: true, passive: true });
addEventListener('pointerdown', () => { gerollt = null; halten = null; }, { capture: true, passive: true });`,
`addEventListener('touchstart', e => { beruehrt = performance.now(); gerollt = null; halten = null; tipp = { y: e.touches?.[0]?.clientY, t: beruehrt }; }, { capture: true, passive: true });
addEventListener('pointerdown', e => { gerollt = null; halten = null; if (e.pointerType !== 'touch') tipp = { y: e.clientY, t: performance.now() }; }, { capture: true, passive: true });`);
u = ersetze(u, 'let neuFokus = false, beruehrt = -1e9,', 'let tipp = null, neuFokus = false, beruehrt = -1e9,');
// focusin: V-3 statt ‚obere Hälfte‘
u = ersetze(u, `  const n = noetig(f, c);
  if (n <= 0) return;`, `  const n = noetigV3(f, c);
  messZeile(\`V-3 \${messId(f)} rollt \${Math.round(n)} (W-\${WECHSEL})\`);
  if (n <= 0) return;`);
// APD-115/W-2: neuer Fokus (APD-36/S-8) auch bei offener Tastatur – Safari liest die Lage nach dem Rollen (APD-36/S-7)
u = ersetze(u, `  halten = { f, c, y: c.scrollTop, bis: performance.now() + 1500 };
  if (kbOffen()) return;`, `  halten = { f, c, y: c.scrollTop, bis: performance.now() + 1500 };
  if (kbOffen() && WECHSEL !== 2) return;`);
u = ersetze(u, 'let tipp = null, neuFokus = false,', 'const WECHSEL = new URLSearchParams(location.search).get(\'w\') === \'1\' ? 1 : 2;   // APD-115/W-1, W-2\nlet tipp = null, neuFokus = false,');
// feldZeigen: Ziel statt ganzes Feld (mehrzeilig: Cursorzeile)
u = ersetze(u, `  const rand = fokusRand(f);
  if (r.height > unten - oben - rand) { if (Math.abs(ro - oben - rand) > 1) rollen(c, ro - oben - rand); }
  else if (ru > unten) rollen(c, ru - unten);
  else if (ro < oben + rand) rollen(c, ro - oben - Math.max(16, rand));`, `  const rand = fokusRand(f);
  if (f.tagName === 'TEXTAREA' && r.height > unten - oben - rand) {
    // APD-115 V-3: mehrzeilig, passt nicht ganz – die Zeile mit dem Cursor und eine halbe Zeile darunter über der Tastatur
    const z = cursorZeile(f), zo = z.top + dy, zu = z.bottom + z.lh / 2 + dy, u = Math.min(unten, visualViewport.offsetTop + visualViewport.height - 16);
    if (zu > u) rollen(c, zu - u); else if (zo < oben + rand) rollen(c, zo - oben - rand);
  }
  else if (r.height > unten - oben - rand) { if (Math.abs(ro - oben - rand) > 1) rollen(c, ro - oben - rand); }
  else if (ru > unten) rollen(c, ru - unten);
  else if (ro < oben + rand) rollen(c, ro - oben - Math.max(16, rand));`);
u = ersetze(u, `// Feld ganz über der Tastatur (R-4.5, seit 4.28.0)`, `// ---------- APD-115 V-3 (Muster, Sitzung 0090): wie Apple nur so weit rollen, dass das Feld über der Tastatur liegt ----------
// - einzeilig bzw. passt das Feld ganz: es endet 16 px über der Tastatur (im Inhalt 28 px – Safari verschiebt sonst, APD-36/S-5 ABSTAND 24);
// - mehrzeilig und zu hoch: die Zeile mit dem Cursor und eine halbe Zeile darunter (beim Antippen die Zeile unter dem Finger);
// - Feld wechseln bei offener Tastatur: APD-115/W-1 (?w=1) genauso, ganz sichtbar: nichts; APD-115/W-2 (Standard) zusätzlich höchstens bis
//   zur Mitte des sichtbaren Teils und neuer Fokus, damit Safari die Lage danach liest (Befund APD-115/N-1 bis N-8, Messung 07.11.2026);
// - nie höher als Umrandung und Schatten unter dem oberen Rand des Bereichs (fokusRand). ≤ 0: nichts rollen.
const zeilenHoehe = f => { const s = getComputedStyle(f), lh = parseFloat(s.lineHeight); return Number.isFinite(lh) ? lh : parseFloat(s.fontSize) * 1.45; };
// Zeile mit dem Cursor (Bildschirm): Spiegel mit dem Text bis zum Cursor
function cursorZeile(f, y) {
  const r = f.getBoundingClientRect(), s = getComputedStyle(f), lh = zeilenHoehe(f), pt = parseFloat(s.paddingTop) + parseFloat(s.borderTopWidth);
  if (y != null && y >= r.top && y <= r.bottom) {
    const n = Math.max(0, Math.floor((y - r.top - pt) / lh));
    return { top: r.top + pt + n * lh, bottom: r.top + pt + (n + 1) * lh, lh };
  }
  const m = document.createElement('div');
  for (const k of ['boxSizing', 'width', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle', 'textIndent', 'wordSpacing', 'tabSize']) m.style[k] = s[k];
  Object.assign(m.style, { position: 'absolute', visibility: 'hidden', top: '0', left: '-9999px', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', height: 'auto' });
  m.textContent = f.value.slice(0, f.selectionEnd ?? f.value.length);
  const mark = document.createElement('span'); mark.textContent = '\\u200b'; m.appendChild(mark);
  document.body.appendChild(m);
  const top = r.top + parseFloat(s.borderTopWidth) + mark.offsetTop - f.scrollTop;
  m.remove();
  return { top, bottom: top + lh, lh };
}
function noetigV3(f, c) {
  const offen = kbOffen(), kb = offen ? seitenHoehe() - visualViewport.height : kbHoehe(f), sichtbar = seitenHoehe() - kb;
  const r = f.getBoundingClientRect(), b = c.getBoundingClientRect(), rand = Math.max(4, fokusRand(f)), d = c.closest('dialog');
  const abstand = d ? 16 : 28;
  // iPad-Fenster: es gleitet mit der Tastatur in die Mitte darüber (placeDialogs) – zählt dort; Safari liest die Lage aber jetzt (APD-36/S-7)
  let dy = 0, untenNachher = Math.min(sichtbar, b.bottom);
  if (d && !isPhone() && !offen) {
    const s = safeRand(), o = Math.max(10, s.top), dr = d.getBoundingClientRect(), dh = Math.min(d.offsetHeight, sichtbar - o - 10);   // placeDialogs: unten 10 px bei offener Tastatur
    const neu = o + Math.max(0, (sichtbar - o - 10 - dh) / 2);
    dy = neu - dr.top; untenNachher = Math.min(sichtbar, neu + dh - (dr.bottom - b.bottom));
  }
  const oben = b.top + dy + rand, unten = untenNachher - abstand, jetzt = Math.min(sichtbar, b.bottom) - (d ? 0 : abstand);
  let n;
  if (f.tagName === 'TEXTAREA' && r.height > unten - oben) {
    const t = tipp && performance.now() - tipp.t < 1500 ? tipp.y : null, z = cursorZeile(f, t);
    n = Math.min(z.bottom + z.lh / 2 + dy - unten, z.top + dy - oben);
  } else if (r.height > unten - oben) n = r.top + dy - oben;
  else n = Math.max(r.bottom + dy - unten, r.bottom - jetzt);
  // APD-115/W-1 (?w=1): beim Wechsel nur so weit wie nötig; APD-115/W-2 (Standard): zusätzlich bis zur Mitte, mit neuem Fokus (focusin)
  if (offen && WECHSEL === 2) n = Math.max(n, Math.min((r.top + r.bottom) / 2 - sichtbar / 2, r.top - oben));
  return n;
}
// Feld ganz über der Tastatur (R-4.5, seit 4.28.0)`);
// beim Tippen: wächst das Feld, bleibt die Cursorzeile mit einer halben Zeile darunter über der Tastatur (wie Apple, UITextView)
u = ersetze(u, `// Jede Meldung von Safari (Tastatur auf und zu`, `document.addEventListener('input', e => {
  const f = e.target;
  if (f.tagName !== 'TEXTAREA' || !kbOffen() || document.activeElement !== f) return;
  requestAnimationFrame(() => { const c = behaelter(f); if (!c) return;
    const d = f.closest('dialog'), dy = d && !isPhone() ? (parseFloat(d.style.top) || 0) - d.getBoundingClientRect().top : 0;
    const b = c.getBoundingClientRect(), unten = Math.min(b.bottom + dy, visualViewport.offsetTop + visualViewport.height) - 16, z = cursorZeile(f), zu = z.bottom + z.lh / 2 + dy;
    if (zu > unten) { rollen(c, zu - unten); messZeile(\`V-3 Cursor \${messId(f)} \${Math.round(zu - unten)}\`); } });
});
// Jede Meldung von Safari (Tastatur auf und zu`);
// APD-115/N-11 (Sitzung 0092): Schließen der Tastatur und Verschiebung durch Safari ohne Springen
u = ersetze(u, "  const top = vv ? Math.max(0, vv.offsetTop) : 0;\n  const h = vv ? vv.height : innerHeight;\n  const full = isPhone();\n  const root = document.documentElement.style;\n  root.setProperty('--vv-top', top + 'px');", "  // APD-115/N-11 (Messung 07.11.2026): beim Schließen der Tastatur setzt Safari scrollY sofort auf 0, meldet offsetTop aber noch bis zu 400 ms\n  // alt (iPhone) – mit Rollbereich ist scrollY nur Safaris Verschiebung, darum zählt der kleinere Wert\n  const top = vv ? Math.max(0, rolle.el ? Math.min(vv.offsetTop, scrollY) : vv.offsetTop) : 0;\n  const h = vv ? vv.height : innerHeight;\n  const full = isPhone();\n  const root = document.documentElement.style;\n  const dTop = top - (placeDialogs.top ?? top); placeDialogs.top = top;\n  root.setProperty('--vv-top', top + 'px');");
u = ersetze(u, "    d.style.margin = '0 auto';\n    d.style.bottom = 'auto';\n    const jetzt = parseFloat(d.style.top),", "    d.style.margin = '0 auto';\n    d.style.bottom = 'auto';\n    // APD-115/N-11: eine Verschiebung durch Safari (offsetTop ändert sich) gleicht das Fenster im selben Augenblick aus – gleiten (.gleitet) nur\n    // für den Rest (Tastatur auf und zu); sonst springt es erst mit Safari weg und gleitet dann zurück\n    if (dTop && d.style.top) { const g = d.classList.contains('gleitet'); d.classList.remove('gleitet');\n      d.style.top = Math.round(parseFloat(d.style.top) + dTop) + 'px'; void d.offsetHeight; if (g) d.classList.add('gleitet'); }\n    const jetzt = parseFloat(d.style.top),");
u = ersetze(u, "if (window.visualViewport) ['resize', 'scroll'].forEach(t => visualViewport.addEventListener(t, gemeldet));", "if (window.visualViewport) ['resize', 'scroll'].forEach(t => visualViewport.addEventListener(t, gemeldet));\n// APD-115/N-11: beim Schließen kommt Safaris ‚scroll‘ der Seite (scrollY 0) bis zu 400 ms vor ‚vv resize‘ – mit Rollbereich sofort neu stellen\naddEventListener('scroll', e => { if (rolle.el && (e.target === document || e.target === window) && Math.max(0, scrollY) !== placeDialogs.top) gemeldet(); }, { passive: true });");
writeFileSync(new URL('ui.js', ZIEL), u);
console.log('APD-115 Muster gebaut: arbeit/APD-115/index.html, arbeit/APD-115/ui.js');
