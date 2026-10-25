// AppDesign 4.14.1 · Prüf-Baustein (APD-5, seit 4.13.0): jedes Prüfskript einer App meldet Fehler statt nur Werte
// auszugeben und endet bei einem Fehler mit Rückgabewert 1. Dazu Browserwahl (Chromium oder WebKit), die gemeinsamen
// Ansichten und die Grundregeln nach jedem Schritt. Einbinden im Prüfskript der App:
//   import * as pw from 'playwright';
//   import { pruefung } from '../../AppDesign/tests/pruefe.mjs';
//   import { createCheck } from '../../AppDesign/tests/hig.mjs';
//   const t = pruefung('ablauf-fenster', pw, { hig: createCheck() });   // hig: Grundregeln nach jedem Schritt (optional)
//   const b = await t.browser();  const p = await t.seite(b, 'iPad quer', { theme: 'dark' });
//   t.ist('Titel', await p.textContent('.nb-title'), 'Australien');     // Sollwert: Wert, RegExp oder Prüffunktion
//   await t.schritt(p, 'Fenster öffnen', () => p.click('#mainMore'));  // danach die Grundregeln (hig.measure ohne Drehen)
//   t.liste(await checkSync(p));                                        // Meldungen der allgemeinen Prüfungen übernehmen
//   await t.ende(b);
// Browser: Umgebungsvariable PRUEF_BROWSER (chromium | webkit, Standard chromium) – setzt das Lauf-Werkzeug (lauf.mjs).
// Gegenprobe: PRUEF_GEGENPROBE=1 macht den ersten Vergleich absichtlich falsch, PRUEF_GEGENPROBE=grundregeln legt beim
// ersten Schritt zu breiten Inhalt in die Seite (lauf.mjs --gegenprobe bzw. --gegenprobe grundregeln für alle Tests).
// Jede Fehlermeldung: ‚✗ <Regel> <Browser> · <Ansicht> · <Schritt>: <was> – ist …, soll …‘ (Testfall-Liste APD-5, APD-5/A-4).
// Seit 4.35.0 (APD-43 P1, M7, P2): PRUEF_BEDIENUNG=beide öffnet jede Seite mit ‚Kontrast erhöhen‘ und ‚Bewegung reduzieren‘ (Ort mit
// Zusatz ‚· Kontrast · ruhig‘); bei ‚Bewegung reduzieren‘ läuft der Bewegungswächter mit und meldet nach jedem Schritt (R-1.9).
// PRUEF_GEGENPROBE=bedienung:<fall> schleust einen benannten Fehler der Bedienungshilfen ein (GEGENPROBEN_BEDIENUNG, lauf.mjs).
// Seit 4.37.0 (APD-43 Teil 2, P1, P3): PRUEF_TEXT=<px> öffnet jede Seite mit dieser Textgröße (Grundgröße vor dem Laden gesetzt, wie die
// Einstellung ‚Textgröße‘ des Geräts; Ort mit Zusatz ‚· Text 53‘); PRUEF_GEGENPROBE=text:<fall> schleust einen Fehler der Textgröße ein.
import { writeFileSync, mkdirSync } from 'node:fs';

// Gemeinsame Ansichten (APD-5/C-2): iPad quer und hoch, iPhone hoch und quer – je hell oder dunkel über die Option theme.
export const ANSICHTEN = {
  'iPad quer': { viewport: { width: 1180, height: 820 } },
  'iPad hoch': { viewport: { width: 820, height: 1180 } },
  'iPhone hoch': { viewport: { width: 393, height: 852 }, isMobile: true },
  'iPhone quer': { viewport: { width: 852, height: 393 }, isMobile: true },
};

// Vergleich: RegExp prüft den Text, eine Funktion entscheidet selbst, Listen und Objekte Stück für Stück, sonst gleich.
const passt = (ist, soll) => soll instanceof RegExp ? soll.test(String(ist)) : typeof soll === 'function' ? !!soll(ist)
  : Array.isArray(soll) ? Array.isArray(ist) && ist.length === soll.length && soll.every((x, i) => passt(ist[i], x))
  : soll && typeof soll === 'object' ? !!ist && typeof ist === 'object' && Object.keys(soll).length === Object.keys(ist).length && Object.keys(soll).every(k => passt(ist[k], soll[k]))
  : JSON.stringify(ist) === JSON.stringify(soll);
const zeige = v => typeof v === 'string' ? `‚${v}‘` : JSON.stringify(v, (k, x) => x instanceof RegExp ? String(x) : x);

// Rollbereich (seit 4.27.0, APD-28): Die Seite rollt nie, nur der Inhalt (#app > .rolle). Alle Prüfungen rollen und messen
// darüber, damit keine aus Versehen das Fenster misst; ohne Rollbereich (App noch nicht umgebaut) gilt das Fenster.
// In der Seite: const r = eval(ROLL) → r.y, r.h (sichtbare Höhe), r.max, r.rest, r.to(y), r.by(d), r.el (null = Fenster).
export const ROLL = `(() => { const e = document.querySelector('#app > .rolle');
  const r = { el: e, get y() { return e ? e.scrollTop : scrollY; }, get h() { return e ? e.clientHeight : innerHeight; },
    get max() { return Math.max(0, (e ? e.scrollHeight : document.documentElement.scrollHeight) - r.h); }, get rest() { return r.max - r.y; },
    to(y) { (e || window).scrollTo({ top: Math.max(0, Math.round(y)), behavior: 'instant' }); }, by(d) { r.to(r.y + d); } };
  return r; })()`;
// R-4.5 (seit 4.32.2, APD-73): wie weit Fokus-Umrandung und Schatten eines Felds über seine Oberkante reichen (berechneter Stil, px) –
// so viel Abstand braucht es zum oberen Rand seines Bereichs. In der Seite: eval(RING)(feld)
export const RING = `(f => { const c = getComputedStyle(f);
  let n = c.outlineStyle !== 'none' ? (parseFloat(c.outlineWidth) || 0) + (parseFloat(c.outlineOffset) || 0) : 0;
  for (const s of c.boxShadow === 'none' ? [] : c.boxShadow.replace(/\\([^)]*\\)/g, '').split(',')) {
    if (/inset/.test(s)) continue;
    const [, y = 0, b = 0, sp = 0] = (s.match(/-?[\\d.]+px/g) || []).map(parseFloat);
    n = Math.max(n, b + sp - y);
  }
  return Math.ceil(n); })`;
// rolle(p, y): y in px, 'ende', 'N%' (Anteil des Rollwegs), { um: d } (relativ) oder { vorEnde: d } (d px vor dem Ende).
export async function rolle(p, y) {
  await p.evaluate(([R, y]) => { const r = eval(R);
    r.to(typeof y === 'number' ? y : y === 'ende' ? r.max : typeof y === 'string' && y.endsWith('%') ? r.max * parseFloat(y) / 100
      : 'um' in y ? r.y + y.um : r.max - y.vorEnde); }, [ROLL, y]);
}
// rollstand(p): { y, max, rest, h } des Rollbereichs, dazu fenster = scrollY (muss 0 bleiben).
// rollRuht(p) (seit 4.32.0): wartet, bis ein weiches Rollen (‚Nach oben / Ans Ende‘) zu Ende ist – Rollstand fünfmal hintereinander
// (je 100 ms) gleich, höchstens 4 s; unter Last steht das Rollen in Chrome zeitweise bis zu 300 ms still. Chrome 153 rollt lange Wege in gut 1,2 s statt unter 0,9 s; feste Wartezeiten maßen mitten im Rollen.
export async function rollRuht(p, { max = 4000 } = {}) {
  const y = () => p.evaluate(R => Math.round(eval(R).y), ROLL).catch(() => null);
  let alt = await y(), gleich = 0;
  for (let t = 0; t < max && gleich < 5; t += 100) { await p.waitForTimeout(100); const n = await y(); gleich = n === alt ? gleich + 1 : 0; alt = n; }
}
export const rollstand = p => p.evaluate(R => { const r = eval(R), m = Math.round;
  return { y: m(r.y), max: m(r.max), rest: m(r.rest), h: m(r.h), fenster: m(scrollY), bereich: !!r.el }; }, ROLL);

// Wartet, bis die Seite nach einer Handlung zur Ruhe gekommen ist (zwei Bildwechsel, keine laufende Animation, Lage stabil) –
// sonst messen die Grundregeln Zwischenzustände (WebKit setzt manches einige Millisekunden später als Chromium).
// Seit 4.30.0 (APD-61, R-7.5): wartet, bis ein Seitenwechsel bzw. die Bewegung der Seitenleiste fertig ist (höchstens 3 s) – der
// Zustand der App ändert sich erst am Ende der Bewegung (Zurück, Wischen).
// seit 4.32.0 (R-4.6): auch bis das Blatt auf dem iPhone ruht
export const navFertig = p => p.waitForFunction(() => !/(^|\s)(nav-|blatt-faehrt|blatt-zieht)/.test(document.documentElement.className), null, { timeout: 3000 }).catch(() => {});
export async function ruhe(p) {
  // Ruhig = keine laufende Animation, Fenster, Menüs, Sprechblasen und Scroll-Lage dreimal hintereinander gleich (je 100 ms)
  // und ein offenes Fenster ganz auf dem Bildschirm – höchstens 2 s; bleibt es danach falsch, meldet die Regel es (R-4.5).
  // WebKit setzt unter Last ein Fenster erst nach bis zu 100 ms an seinen Platz (gemessen: 4 von 12 Öffnungen, danach richtig).
  // Nur Zeitgeber von Node: in der Seite können Uhr und Bildwechsel nachgebildet sein (page.clock.install).
  // Zuerst zwei Bildwechsel abwarten (höchstens 2 s): manches setzt die App erst im nächsten Bild (z. B. den Verlauf der
  // Auswahl-Kapsel); WebKit verzögert Bildwechsel unter Last deutlich (gemessen: Verlauf kommt immer, aber verspätet).
  await Promise.race([p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))).catch(() => {}), p.waitForTimeout(2000)]);
  // Seit 4.14.1: jede Messung erst im nächsten Bild – unter Volllast (8 Browser parallel) kamen in WebKit Bildwechsel so spät,
  // dass dreimal ‚gleich‘ nach je 100 ms erreicht war, bevor die App Titel-Einblendung (R-2.2) und Verlauf der Kapsel (R-5.4)
  // gesetzt hatte (tastatur · webkit, Einstellungen iPhone). Kommt kein Bild innerhalb 2 s, gilt die Seite nicht als ruhig.
  let vorher = '', gleich = 0;
  for (let i = 0; i < 40 && gleich < 2; i++) {
    const jetzt = await Promise.race([p.evaluate(() => new Promise(r => requestAnimationFrame(() => {
      if (document.getAnimations().some(a => a.playState === 'running')) return r('läuft');
      const d = document.querySelector('dialog[open]')?.getBoundingClientRect();
      if (d && (d.top < -1 || d.bottom > innerHeight + 1)) return r('Fenster noch nicht an seinem Platz');
      r(JSON.stringify([scrollY, document.querySelector('#app > .rolle')?.scrollTop ?? 0, ...[...document.querySelectorAll('dialog[open], .menu, .pop')].map(e => { const r = e.getBoundingClientRect(); return [r.top, r.left, r.width, r.height]; })]));
    }))).catch(() => ''), new Promise(r => setTimeout(() => r('kein Bild'), 2000))]);
    gleich = jetzt.startsWith('[') && jetzt === vorher ? gleich + 1 : 0;
    vorher = jetzt; if (gleich < 2) await p.waitForTimeout(100);
  }
}

// R-1.9 (seit 4.35.0, APD-43 M6, M7): Bewegungswächter – läuft mit ‚Bewegung reduzieren‘ in der Seite und misst jede Bewegung an der
// Grenze: erlaubt sind Überblenden (nur Deckkraft bzw. Farbe, bis 0,3 s), Lageänderungen bis 30 px und alles, was direkt dem Finger
// folgt (keine Animation); gemeldet werden Lage über 30 px, Zoomen (scale), Federn (Kurve über das Ziel hinaus), Dauerschleifen,
// längeres Überblenden und sanftes Rollen (scrollTo/scrollBy/scrollIntoView mit smooth). Erfasst werden Web-Animationen (el.animate)
// sowie CSS-Übergänge und -Animationen (getAnimations beim Start). Funde: window.__ruhigFunde, abgeholt mit ruhigFunde(p).
export function bewegungsWaechter() {
  if (window.__ruhigFunde) return;
  const funde = window.__ruhigFunde = [], gesehen = new WeakSet();
  const ruhig = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wo = e => !e || !e.tagName ? '-' : e.id ? '#' + e.id : e.tagName.toLowerCase() + (e.classList?.[0] ? '.' + e.classList[0] : '');
  const melde = t => { if (funde.length < 50 && !funde.includes(t)) funde.push(t); };
  const LAGE = ['top', 'left', 'right', 'bottom', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'inset'];
  const werte = (k, v) => {
    v = String(v ?? '');
    if (k === 'transform') { try { const m = new DOMMatrixReadOnly(v === 'none' || !v ? undefined : v); return { x: m.m41, y: m.m42, s: Math.hypot(m.a, m.b) }; } catch { return null; } }
    if (k === 'translate') { const [x = 0, y = 0] = v === 'none' ? [] : v.split(/\s+/).map(parseFloat); return { x: x || 0, y: y || 0, s: 1 }; }
    if (k === 'scale') return { x: 0, y: 0, s: v === 'none' || !v ? 1 : parseFloat(v) };
    if (LAGE.includes(k)) return { x: 0, y: parseFloat(v) || 0, s: 1 };
    return null;
  };
  const pruefe = (a, el) => {
    if (!a || gesehen.has(a) || !ruhig()) return;
    gesehen.add(a);
    const fx = a.effect, t = fx?.getComputedTiming?.() || {}, kf = fx?.getKeyframes?.() || [];
    el = el || fx?.target;
    if (t.iterations === Infinity) melde(`Dauerschleife ${wo(el)}`);
    const props = new Set(kf.flatMap(k => Object.keys(k)).filter(k => !['offset', 'computedOffset', 'easing', 'composite'].includes(k)));
    let bewegt = false;
    for (const k of props) {
      const vs = kf.map(f => f[k]).filter(v => v !== undefined);
      if (new Set(vs.map(String)).size < 2) continue;
      const w = vs.map(v => werte(k, v));
      if (w[0]) {
        bewegt = true;
        const d = Math.max(...w.map(x => Math.hypot(x.x - w[0].x, x.y - w[0].y)));
        if (d > 30) melde(`Lage über 30 px ${wo(el)} ${k} (${Math.round(d)} px)`);
        if (w.some(x => Math.abs(x.s - w[0].s) > 0.001)) melde(`Zoomen ${wo(el)} ${k}`);
      } else if ((t.duration || 0) > 300) melde(`Überblenden länger als 0,3 s ${wo(el)} ${k} (${Math.round(t.duration)} ms)`);
    }
    const kurven = [t.easing, ...kf.map(f => f.easing)].filter(Boolean).join(' ');
    if (bewegt && [...kurven.matchAll(/cubic-bezier\(([^)]+)\)/g)].some(m => { const n = m[1].split(',').map(Number); return n[1] > 1 || n[3] > 1 || n[1] < 0 || n[3] < 0; })) melde(`Federn ${wo(el)}`);
  };
  const animate = Element.prototype.animate;
  Element.prototype.animate = function (...args) { const a = animate.apply(this, args); pruefe(a, this); return a; };
  for (const typ of ['animationstart', 'transitionrun']) document.addEventListener(typ, e => e.target.getAnimations?.().forEach(a => pruefe(a, e.target)), true);
  const sanft = (wer, o) => { if (o && typeof o === 'object' && o.behavior === 'smooth' && ruhig()) melde(`sanftes Rollen ${wer}`); };
  for (const [ziel, namen] of [[Element.prototype, ['scrollTo', 'scrollBy', 'scrollIntoView']], [window, ['scrollTo', 'scrollBy']]]) for (const n of namen) {
    const alt = ziel[n];
    ziel[n] = function (...args) { sanft(`${n} ${wo(this === window ? null : this) === '-' ? 'Fenster' : wo(this)}`, args[0]); return alt.apply(this, args); };
  }
}
export const ruhigFunde = p => p.evaluate(() => (window.__ruhigFunde || []).splice(0)).catch(() => []);

// Gegenprobe der Bedienungshilfen (seit 4.35.0, APD-43 P2): je Fall ein eingeschleuster Fehler (Init-Skript der Seite), die passende
// Meldung (zeichen) muss rot werden. lauf.mjs --gegenprobe bedienung läuft jeden Fall einmal mit der Prüfung der Bedienungshilfen.
export const GEGENPROBEN_BEDIENUNG = {
  name: { zeichen: /R-1\.8 .*ohne Namen/, was: 'Icon-Knopf ohne Namen (V1)' },
  titel: { zeichen: /R-1\.8 Fenster .*ohne Titel/, was: 'Fenster ohne Titelbezug (V2)' },
  menueknopf: { zeichen: /R-1\.8 Knopf des offenen Menüs/, was: 'Menüknopf ohne aria-haspopup/aria-expanded (V3)' },
  haekchen: { zeichen: /R-1\.8 Menüpunkt .*aria-checked/, was: 'Häkchen ohne aria-checked (V4)' },
  zurueck: { zeichen: /R-4\.7 .*Fokus nicht zurück/, was: 'Fokus nicht zurück auf den Knopf (V5, V6)' },
  inert: { zeichen: /R-1\.4 .*nicht gesperrt \(inert\)/, was: 'ohne inert (V7)' },
  modal: { zeichen: /R-1\.4 Fenster .*nicht modal/, was: 'Fenster nicht modal (V8)' },
  ansage: { zeichen: /R-1\.8 .*Ansage/, was: 'kein Ansage-Bereich (V9)' },
  beschreibung: { zeichen: /R-5\.3 .*aria-describedby/, was: 'Fehlermeldung ohne aria-describedby (V10)' },
  gespeichert: { zeichen: /R-1\.8 ‚Automatisch gespeichert‘ wird angesagt/, was: '‚Automatisch gespeichert‘ angesagt (V11)' },
  esc: { zeichen: /R-4\.7 Esc schließt das Menü nicht/, was: 'Esc schließt Menü nicht (K1)' },
  rot: { zeichen: /R-4\.7 Eingabe .*rot/, was: 'Eingabe löst Rot (K4)' },
  tab: { zeichen: /R-4\.7 Tab verlässt/, was: 'Tab verlässt Fenster (K5)' },
  ring: { zeichen: /R-3\.4 .*Fokus-Rahmen.*(ohne Tastatur|nach dem Antippen)/, was: 'Fokusring beim Antippen (K6)' },
  feldrahmen: { zeichen: /R-3\.4 Textfeld .*Fokus-Rahmen/, was: 'Textfeld mit Fokus-Rahmen (K9)' },
  farben: { zeichen: /R-1\.9 Farbtabelle/, was: 'Farbtabelle ‚Kontrast erhöhen‘ fehlt (H1, H2)' },
  flaeche: { zeichen: /R-1[0][.]2 Kontrast .*mind[.] 4[.]5/, was: '#409CFF als Fläche (H3)' },
  ausgabe: { zeichen: /R-6\.2 .*Kontrast/, was: 'Ausgabe mit ‚Kontrast erhöhen‘ dunkel (H4)' },
  verschiebung: { zeichen: /R-1\.9 .*Bewegung: Lage über 30 px/, was: 'Verschiebung über 30 px trotz ‚reduzieren‘ (M7)' },
  sanft: { zeichen: /R-1\.9 .*Bewegung: sanftes Rollen/, was: 'sanftes Rollen trotz ‚reduzieren‘ (M2, M7)' },
  pulsieren: { zeichen: /R-1\.9 .*(Dauerschleife|pulsiert)/, was: 'Pulsieren trotz ‚reduzieren‘ (M4)' },
};
// Gegenprobe der Textgröße (seit 4.37.0, APD-43 Teil 2, P3): je Fall ein eingeschleuster Fehler, die passende Meldung muss rot werden
// (lauf.mjs --gegenprobe text, Prüfung ‚text‘ der App mit checkText).
export const GEGENPROBEN_TEXT = {
  px: { zeichen: /R-1\.10 Schrift in px/, was: 'Schrift in px' },
  leiste: { zeichen: /R-1\.10 Leiste/, was: 'Leiste wächst über XXXL' },
  tabelle: { zeichen: /R-1\.10 Tabelle bei/, was: 'Tabelle bei AX' },
  zeilen: { zeichen: /R-1\.10 .*überlappen/, was: 'Zeilenhöhe 20 px (Überlappen)' },
  feld: { zeichen: /R-1\.3 /, was: 'Feld 14 px' },
  ausgabe: { zeichen: /R-6\.2 Ausgabe wächst/, was: 'Ausgabe wächst mit' },
  platz: { zeichen: /R-7\.1 .*verdeckt/, was: 'Platzhalter fest' },
};
function gegenprobeText(fall) {
  const stil = css => document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.append(s); });
  const f = {
    px: () => stil('.side-row b { font-size: 17px !important; }'),
    leiste: () => stil('.nb-title, .pnav-title, .side-head h2, .dlg-head h3 { font-size: var(--t-title3) !important; }'),
    tabelle: () => { const alt = DOMTokenList.prototype.toggle; DOMTokenList.prototype.toggle = function (n, an) { return alt.call(this, n, n === 'ts-ax' ? false : an); }; },
    zeilen: () => stil('button { line-height: 20px !important; }'),
    feld: () => stil('input[type=text], textarea { font-size: 14px !important; }'),
    ausgabe: () => stil('.rt, .rt * { font-size: var(--t-body) !important; }'),
    platz: () => stil('.rolle::after { height: 100px !important; } #side .side-list, #side.page .side-list { padding-bottom: 150px !important; }'),
  }[fall];
  if (!f) throw new Error('Unbekannter Fall der Gegenprobe: ' + fall);
  f();
}
// Textgröße des Geräts nachgebildet (P1): die Grundgröße steht fest, bevor ui.js sie misst
function textGroesse(px) {
  const setze = () => { const s = document.createElement('style'); s.id = 'pruef-text'; s.textContent = `html { font-size: ${px}px !important; }`; document.documentElement.prepend(s); };
  if (document.documentElement) setze();
  else new MutationObserver((m, o) => { if (document.documentElement) { o.disconnect(); setze(); } }).observe(document, { childList: true });
}
// Für Prüfskripte, die Seiten selbst öffnen (browser.newPage statt t.seite, z. B. hig): Textgröße aus PRUEF_TEXT und die
// Gegenprobe der Textgröße anwenden; liefert den Zusatz für die Ortsangabe (‚ Text 53‘ bzw. leer).
export async function textSeite(p) {
  const px = Number(process.env.PRUEF_TEXT) || 0, gp = (process.env.PRUEF_GEGENPROBE || '').match(/^text:(.+)$/)?.[1];
  if (px) await p.addInitScript(textGroesse, px);
  if (gp) await p.addInitScript(gegenprobeText, gp);
  return px ? ` Text ${px}` : '';
}
// Die eingeschleusten Fehler (laufen in der Seite vor ihren Skripten)
function gegenprobeBedienung(fall) {
  const beob = fn => new MutationObserver(() => fn()).observe(document, { subtree: true, childList: true, attributes: true });
  const stil = css => document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.append(s); });
  const f = {
    name: () => beob(() => document.querySelectorAll('button[aria-label]').forEach(b => { if (b.querySelector('svg') && !b.textContent.trim()) b.removeAttribute('aria-label'); })),
    titel: () => beob(() => document.querySelectorAll('dialog[aria-labelledby]').forEach(d => d.removeAttribute('aria-labelledby'))),
    menueknopf: () => beob(() => document.querySelectorAll('[aria-haspopup]:not(.mi)').forEach(b => { b.removeAttribute('aria-haspopup'); b.removeAttribute('aria-expanded'); })),
    haekchen: () => beob(() => document.querySelectorAll('[aria-checked]').forEach(b => b.removeAttribute('aria-checked'))),
    zurueck: () => { const alt = HTMLElement.prototype.focus; HTMLElement.prototype.focus = function (o) { if (this.closest('.menu, .pop') || this.matches('dialog, input, textarea, select')) return alt.call(this, o); }; },
    inert: () => beob(() => document.querySelectorAll('[inert]').forEach(e => { if (!e.closest('.blatt-geist')) e.inert = false; })),
    modal: () => { HTMLDialogElement.prototype.showModal = HTMLDialogElement.prototype.show; },
    ansage: () => beob(() => document.querySelectorAll('[aria-live]').forEach(e => e.remove())),
    beschreibung: () => beob(() => document.querySelectorAll('[aria-describedby][aria-invalid]').forEach(e => e.removeAttribute('aria-describedby'))),
    gespeichert: () => beob(() => document.querySelectorAll('.dlg-head .sub:not([aria-live]), .saved:not([aria-live])').forEach(e => e.setAttribute('aria-live', 'polite'))),
    esc: () => addEventListener('keydown', e => { if (e.key === 'Escape' && document.querySelector('.menu')) e.stopImmediatePropagation(); }, true),
    rot: () => addEventListener('keydown', e => { const r = document.querySelector('.pop button.danger, .pop button.danger-text'); if (e.key === 'Enter' && r) { e.stopImmediatePropagation(); e.preventDefault(); r.click(); } }, true),
    tab: () => addEventListener('keydown', e => { if (e.key === 'Tab' && document.querySelector('dialog[open]')) { e.stopImmediatePropagation(); e.preventDefault(); document.activeElement?.blur(); } }, true),
    ring: () => stil('button:focus { outline: 3px solid red !important; }'),
    feldrahmen: () => stil('input:focus, textarea:focus { outline: auto 5px !important; }'),
    farben: () => stil('@media (prefers-contrast: more) { :root, :root[data-theme] { --accent: #007aff !important; --muted: #6e6e73 !important; --line: #d1d1d6 !important; } }'),
    flaeche: () => stil(':root[data-theme] { --accent-fill: #409cff !important; }'),
    ausgabe: () => stil('@media (prefers-contrast: more) { .rt, .rt * { color: #fff !important; background: #1c1c1e !important; } }'),
    verschiebung: () => addEventListener('load', () => setTimeout(() => document.body.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(100px)' }], 200), 200)),
    sanft: () => addEventListener('load', () => setTimeout(() => (document.querySelector('#app > .rolle') || document.scrollingElement).scrollTo({ top: 1, behavior: 'smooth' }), 200)),
    pulsieren: () => stil('.mic[aria-pressed="true"] { animation: pulse 1s infinite !important; }'),
  }[fall];
  if (!f) throw new Error('Unbekannter Fall der Gegenprobe: ' + fall);
  f();
}

export function pruefung(name, pw, { hig = null, out = null } = {}) {
  const browserName = process.env.PRUEF_BROWSER || 'chromium';
  const fehler = [], ansichten = new Set();
  let ort = '', gegenprobe = process.env.PRUEF_GEGENPROBE === '1', gegenprobeGrund = process.env.PRUEF_GEGENPROBE === 'grundregeln';
  const bedienung = process.env.PRUEF_BEDIENUNG === 'beide', gpBedienung = (process.env.PRUEF_GEGENPROBE || '').match(/^bedienung:(.+)$/)?.[1];
  const textPx = Number(process.env.PRUEF_TEXT) || 0, gpText = (process.env.PRUEF_GEGENPROBE || '').match(/^text:(.+)$/)?.[1];
  const seiten = new Set();
  const wo = schritt => [browserName, ort, schritt].filter(Boolean).join(' · ');
  const melde = (regel, was, schritt = '') => fehler.push(`✗ ${regel ? regel + ' ' : ''}${wo(schritt)}: ${was}`);

  const t = {
    browserName,
    get ort() { return ort; },
    set ort(v) { ort = v; if (v) ansichten.add(v); },
    // Startet den gewählten Browser. Fehlt WebKit, bricht der Test mit Hinweis ab (APD-5/B-8) – nie stillschweigend nur Chromium.
    async browser(opts = {}) {
      const typ = pw[browserName];
      if (!typ) throw new Error(`Unbekannter Browser ‚${browserName}‘ (PRUEF_BROWSER: chromium oder webkit)`);
      try { return await typ.launch(opts); }
      catch (e) {
        if (/Executable doesn't exist|install/i.test(e.message)) {
          console.error(`✗ ${browserName} fehlt – im Ordner tests der App: npx playwright install ${browserName}` +
            (browserName === 'webkit' ? ' und npx playwright install-deps webkit (Setup-Skript der Umgebung, Testfall-Liste APD-5/B-8)' : ''));
          process.exit(2);
        }
        throw e;
      }
    },
    // Neue Seite in einer Ansicht (Name aus ANSICHTEN oder eigene Größe); Skriptfehler der Seite werden Fehler.
    async seite(b, ansicht = 'iPad quer', { theme, ...opts } = {}) {
      const a = typeof ansicht === 'string' ? ANSICHTEN[ansicht] : ansicht;
      if (!a) throw new Error(`Unbekannte Ansicht ‚${ansicht}‘`);
      const hilfen = bedienung ? { contrast: 'more', reducedMotion: 'reduce' } : {};
      const p = await b.newPage({ hasTouch: true, ...a, ...(theme ? { colorScheme: theme } : {}), ...hilfen, ...opts });
      if (typeof ansicht === 'string') t.ort = ansicht + (theme ? ` ${theme === 'dark' ? 'dunkel' : 'hell'}` : '') + (bedienung ? ' · Kontrast · ruhig' : '') + (textPx ? ` · Text ${textPx}` : '');
      // R-1.9 (M7): der Bewegungswächter misst jede Bewegung, sobald ‚Bewegung reduzieren‘ gilt (auch später per emulateMedia)
      await p.addInitScript(bewegungsWaechter);
      seiten.add(p);
      if (gpBedienung) await p.addInitScript(gegenprobeBedienung, gpBedienung);
      await textSeite(p);
      p.on('pageerror', e => melde('', `Skriptfehler der Seite: ${e.message.split('\n')[0]}`));
      // Safari nachgebildet (Zusammenarbeit 0 Nr. 5): Safari auf iPad und iPhone setzt beim Antippen einer Schaltfläche keinen
      // Fokus, Chromium und das WebKit von Playwright (Linux) schon – sonst meldet R-3.4 einen Fokus am x, den es am Gerät nicht gibt.
      await p.addInitScript(() => document.addEventListener('mousedown', e => { if (e.target.closest?.('button')) e.preventDefault(); }, true));
      return p;
    },
    // Sollwert: Wert (Vergleich als JSON), RegExp (auf den Text) oder Funktion (gibt true zurück, wenn in Ordnung).
    ist(was, ist, soll, regel = '') {
      // Gegenprobe (Testfall-Liste APD-5, APD-5/A-1): PRUEF_GEGENPROBE=1 setzt beim ersten Vergleich einen falschen Sollwert – der Test muss rot werden.
      if (gegenprobe) { gegenprobe = false; soll = '‹Gegenprobe – absichtlich falscher Sollwert›'; }
      const ok = passt(ist, soll);
      if (!ok) melde(regel, `${was} – ist ${zeige(ist)}, soll ${typeof soll === 'function' ? (soll.text || 'Bedingung erfüllt') : zeige(soll)}`);
      return ok;
    },
    wahr(was, bedingung, regel = '') { if (!bedingung) melde(regel, was); return !!bedingung; },
    // Meldungen einer allgemeinen Prüfung (checkSync, checkBackup …) übernehmen – sie tragen ihre Regelnummer schon.
    liste(meldungen = []) {
      if (gegenprobe) { gegenprobe = false; melde('', 'Gegenprobe – absichtlich eingefügte Meldung'); }
      for (const m of meldungen) melde('', m);
    },
    fehler: melde,
    // Ein Schritt: Handlung ausführen, danach die Grundregeln (APD-5/C-1) in der aktuellen Ansicht – dieselben Prüfungen wie
    // hig.mjs (je Regel genau eine Prüfung), aber ohne Drehen, damit der Ablauf nicht verändert wird.
    async schritt(p, name, fn) {
      try { await fn(); }
      catch (e) { melde('', `Schritt bricht ab: ${e.message.split('\n')[0]}`, name); throw e; }
      // Gegenprobe der Grundregeln (Testfall-Liste APD-5, APD-5/C-1): PRUEF_GEGENPROBE=grundregeln legt beim ersten Schritt einen zu
      // breiten Text sichtbar in den Vordergrund (auch in ein offenes Fenster) – R-6.3 muss ihn melden.
      if (hig && gegenprobeGrund) { gegenprobeGrund = false; await p.evaluate(() => { const d = document.createElement('div'); d.id = 'gegenprobe'; d.className = 'msg-text';
        d.style.cssText = 'position:fixed;top:120px;left:20px;width:100px;white-space:nowrap;z-index:99999'; d.textContent = 'a'.repeat(100);
        (document.querySelector('dialog[open]') || document.body).append(d); }); }
      if (hig) await hig.measure(p, wo(name), { schnell: true });   // measure wartet selbst, bis die Seite ruht
      await p.evaluate(() => document.getElementById('gegenprobe')?.remove()).catch(() => {});
      await t.ruhig(p, name);
    },
    // R-1.9 (seit 4.35.0, M7): Funde des Bewegungswächters seit dem letzten Abholen melden
    async ruhig(p, schritt = '') { for (const f of await ruhigFunde(p)) melde('R-1.9', `Bewegung: ${f} trotz ‚Bewegung reduzieren‘`, schritt); },
    get anzahl() { return fehler.length; },
    // Ende: Grundregeln und Fehler ausgeben, Abdeckung festhalten, Rückgabewert setzen.
    async ende(b) {
      for (const p of seiten) if (!p.isClosed()) await t.ruhig(p, 'Ende');
      if (b) await b.close().catch(() => {});
      const higRc = hig ? hig.report({ still: true }) : 0;
      if (out) {
        try { mkdirSync(out, { recursive: true }); writeFileSync(new URL(`abdeckung-${name}-${browserName}.json`, out), JSON.stringify([...ansichten])); } catch {}
      }
      if (gegenprobe) melde('', 'Gegenprobe: der Test hat keinen einzigen Vergleich gemacht – er prüft nichts');
      for (const f of fehler) console.log(f);
      const n = fehler.length + (higRc ? 1 : 0);
      console.log(n ? `${name} (${browserName}): ${fehler.length} Fehler${higRc ? ' und Abweichungen der Grundregeln (oben)' : ''}` : `${name} (${browserName}): alles in Ordnung`);
      process.exit(n ? 1 : 0);
    },
  };
  return t;
}
