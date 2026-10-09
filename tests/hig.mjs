// AppDesign 4.0.0 · HIG-Prüfung: misst eine App-Ansicht gegen die HIG-Checkliste
// (README - Designrichtlinie allgemein.md, Abschnitt 16). Wird vom Prüfskript jeder App eingebunden:
//   import { createCheck } from '../../AppDesign/tests/hig.mjs';
//   const hig = createCheck({ skipTargets: ['table.days .ln:not(.q) a'] });   // bewusste Abweichungen der App
//   await hig.measure(page, 'Mehr-Menü (hell quer)');  await hig.stays(page, '#mainMore', 'Mehr-Menü');
//   process.exit(hig.report());
// Geprüft: Antippflächen (44 pt, in Kapseln/Schalter 28 pt), Schrift ≥ 11 pt, Kontrast (4,5 : 1 bzw. 3 : 1),
// doppelte Anführungszeichen, Löschen am Ende von Menüs, keine Linien zwischen Menüpunkten,
// gedrückte Schaltfläche bleibt blau. Bewusste Abweichungen allgemein: Weiß auf Systemblau, Orange --warn.
export function createCheck({ skipTargets = [] } = {}) {
const found = new Map();
  const note = (kind, text, where) => {
    const key = `${kind}: ${text}`;
    if (!found.has(key)) found.set(key, new Set());
    found.get(key).add(where);
  };
  
  // Misst die sichtbare, oberste Ebene (Menü/Sprechblase, sonst offenes Fenster, sonst Seite).
  async function measure(p, where) {
    const r = await p.evaluate(skip => {
      const vis = e => { const s = getComputedStyle(e), b = e.getBoundingClientRect();
        return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && b.bottom > 0 && b.top < innerHeight && b.right > 0 && b.left < innerWidth; };
      const onTop = e => { if (document.querySelector('.layer')) return !!e.closest('.menu, .pop');
        const d = document.querySelector('dialog[open]'); return d ? d.contains(e) : true; };
      const label = e => ((e.id ? '#' + e.id + ' ' : '') + (e.getAttribute('aria-label') || e.textContent || e.placeholder || '')).trim().replace(/\s+/g, ' ').slice(0, 40);
      const res = { target: [], font: [], contrast: [], quotes: [], menu: [] };
      // Antippflächen: 44 pt Standard; Knöpfe in Kapseln und Schalter wie bei Apple ab 28 pt.
      document.querySelectorAll('button, a[href], input:not([type=hidden]):not([type=file]), textarea, select, [role=menuitem]').forEach(e => {
        if (!vis(e) || !onTop(e)) return;
        // Bewusste Abweichungen der App (Selektoren), werden nicht gezählt
        if (skip.some(sel => e.matches(sel))) return;
        const b = e.getBoundingClientRect(), s = getComputedStyle(e);
        // Inline-Links: die Antippfläche schließt den (unsichtbaren) Innenabstand ein.
        const h = s.display === 'inline' ? b.height + parseFloat(s.paddingTop) + parseFloat(s.paddingBottom) : b.height;
        const inCap = e.closest('.cap, .grp, .navgrp') || (e.type === 'checkbox' && /switch|toggle/.test(e.className + e.parentElement.className)) || (e.type === 'checkbox' && b.width >= 51 && b.height >= 31);
        const min = inCap ? 28 : 44;
        if (Math.min(b.width, h) < min) res.target.push(`${e.tagName.toLowerCase()} ‚${label(e)}‘ ${Math.round(b.width)}×${Math.round(h)} px (mind. ${min})`);
      });
      // Schrift und Kontrast
      const rgb = c => (c.match(/[\d.]+/g) || [0, 0, 0, 0]).map(Number);
      const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
      const bgOf = e => { for (let x = e; x; x = x.parentElement) { const c = rgb(getComputedStyle(x).backgroundColor); if ((c[3] ?? 1) > .5) return c; } return rgb(getComputedStyle(document.body).backgroundColor); };
      const root = getComputedStyle(document.documentElement);
      const accent = rgb(root.getPropertyValue('--accent').trim().replace(/^#(..)(..)(..)$/, (m, a, b, c) => `rgb(${parseInt(a, 16)},${parseInt(b, 16)},${parseInt(c, 16)})`));
      const warn = rgb(root.getPropertyValue('--warn').trim().replace(/^#(..)(..)(..)$/, (m, a, b, c) => `rgb(${parseInt(a, 16)},${parseInt(b, 16)},${parseInt(c, 16)})`));
      const same = (a, b) => a.slice(0, 3).every((v, i) => Math.abs(v - b[i]) < 3);
      const seen = new Set();
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let t; (t = w.nextNode());) {
        const e = t.parentElement, txt = t.textContent.trim().replace(/\s+/g, ' ');
        if (!e || !txt || seen.has(e)) continue; seen.add(e);
        if (!vis(e) || !onTop(e) || e.closest('#printout, .rt, script, style, [disabled]')) continue;
        if (/[„“]/.test(txt)) res.quotes.push(`‚${txt.slice(0, 40)}‘`);
        if (/^\p{Extended_Pictographic}/u.test(txt)) continue;
        const s = getComputedStyle(e), fs = parseFloat(s.fontSize);
        if (fs < 11) res.font.push(`${fs} px ‚${txt.slice(0, 30)}‘`);
        const fg = rgb(s.color), bg = bgOf(e), a = fg[3] ?? 1;
        const mix = [0, 1, 2].map(i => fg[i] * a + bg[i] * (1 - a));
        const L1 = lum(mix), L2 = lum(bg), cr = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
        const need = fs >= 18 || parseInt(s.fontWeight) >= 700 ? 3 : 4.5;
        // Bewusste Abweichungen: Weiß auf Systemblau, Orange --warn
        if (same(bg, accent) || same(mix, accent) || same(mix, warn)) continue;
        if (cr < need) res.contrast.push(`${cr.toFixed(2)} : 1 (mind. ${need}) ${fs} px ‚${txt.slice(0, 30)}‘`);
      }
      // Menüs: Löschen (rot) steht am Ende
      document.querySelectorAll('.menu').forEach(m => {
        const items = [...m.querySelectorAll('.mi')]; const i = items.findIndex(x => x.classList.contains('red'));
        if (i >= 0 && i !== items.length - 1) res.menu.push(`‚${items[i].textContent.trim()}‘ steht nicht am Ende`);
        // Wie Apple: keine Linien zwischen einzelnen Punkten
        if ([...m.querySelectorAll('.mi, .sub')].some(x => parseFloat(getComputedStyle(x).borderBottomWidth) > 0)) res.menu.push('Linie zwischen einzelnen Menüpunkten');
      });
      return res;
    }, skipTargets);
    for (const [k, list] of Object.entries(r)) for (const x of list) note({ target: 'Antippfläche', font: 'Schrift', contrast: 'Kontrast', quotes: 'Anführungszeichen', menu: 'Menü' }[k], x, where);
  }

  const stays = async (p, sel, where) => {
    if (!await p.locator(sel).first().evaluate(e => e.classList.contains('on')).catch(() => false)) note('Markierung', `${sel} bleibt nicht blau`, where);
  };
  const report = () => {
    if (!found.size) { console.log('HIG-Prüfung: keine Abweichungen.'); return 0; }
    console.log(`HIG-Prüfung: ${found.size} Abweichung(en)\n`);
    for (const [k, where] of found) console.log(`- ${k}\n    ${[...where].slice(0, 3).join(' · ')}${where.size > 3 ? ` · +${where.size - 3}` : ''}`);
    return 1;
  };
  return { measure, stays, note, report };
}
