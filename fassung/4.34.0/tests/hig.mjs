// AppDesign 4.13.0 · HIG- und Regel-Prüfung: misst eine App-Ansicht gegen die HIG-Checkliste (Abschnitt 16)
// und alle automatisch prüfbaren Regeln des Regelkatalogs (Abschnitt 17, R-1.1 …) der Designrichtlinie allgemein. Wird vom Prüfskript jeder App eingebunden:
//   import { createCheck } from '../../AppDesign/tests/hig.mjs';
//   const hig = createCheck({ skipTargets: ['table.days .ln:not(.q) a'] });   // bewusste Abweichungen der App
//   await hig.measure(page, 'Mehr-Menü (hell quer)');  await hig.stays(page, '#mainMore', 'Mehr-Menü');
//   await hig.shape(page, '#side', 'Seitenleiste', 'iPad');   // gleicher Baustein auf iPad und iPhone (R-1.1)
//   await hig.barStill(page, 'Hauptansicht');                  // Leisten bewegen sich beim Wischen nicht (R-2.1)
// Offene Menüs, Untermenüs und Sprechblasen dreht measure() automatisch quer ↔ hoch und prüft ihre Lage (R-8.1).
//   process.exit(hig.report());
// Geprüft: Antippflächen (R-3.1), Schrift und Kontrast (R-10.2), doppelte Anführungszeichen (R-10.1), Menüs (R-4.1),
// gedrückte Schaltfläche bleibt blau (R-3.3) und alle weiteren Regeln mit ‚hig.mjs‘ im Regelkatalog. Jede Meldung trägt
// ihre Regelnummer (seit 4.12.0). Bewusste Abweichungen allgemein: Weiß auf Systemblau, Orange --warn.
import { ruhe, ROLL, rolle, rollstand } from './pruefe.mjs';
export function createCheck({ skipTargets = [] } = {}) {
const found = new Map(), icons = new Map();
  let rotating = false;
  const note = (kind, text, where) => {
    const key = `${kind}: ${text}`;
    if (!found.has(key)) found.set(key, new Set());
    found.get(key).add(where);
  };
  
  // R-8.1: Ein offenes Menü (mit Untermenü) bzw. eine Sprechblase bleibt beim Drehen (quer ↔ hoch) an ihrer
  // Schaltfläche: darunter, an ihr ausgerichtet, ganz sichtbar; das Untermenü neben seinem Eintrag. Danach zurückdrehen.
  const rotate = async (p, anchorSel, where) => {
    const vp = p.viewportSize();
    for (const size of [{ width: vp.height, height: vp.width }, vp]) {
      await p.setViewportSize(size); await p.waitForTimeout(700);
      const bad = await p.evaluate(sel => {
        const out = [], a = document.querySelector(sel), m = document.querySelector('.menu:not(.submenu), .pop'), s = document.querySelector('.menu.submenu');
        const inside = r => r.top >= -1 && r.left >= -1 && r.bottom <= innerHeight + 1 && r.right <= innerWidth + 1;
        // Ist die Schaltfläche nach dem Drehen nicht mehr zu sehen (z. B. Seitenleiste ausgeblendet), muss das Menü zu sein.
        // Eine Abfrage (Sprechblase) bleibt dann offen und muss ganz zu sehen sein.
        if (!a || !a.getClientRects().length) return !m ? [] : m.classList.contains('pop') ? (inside(m.getBoundingClientRect()) ? [] : ['Sprechblase ohne Schaltfläche nicht ganz sichtbar']) : ['Menü offen, obwohl seine Schaltfläche nach dem Drehen nicht mehr zu sehen ist'];
        if (!m) return ['Menü bzw. Sprechblase nach dem Drehen verschwunden'];
        const mr = m.getBoundingClientRect();
        if (!inside(mr)) out.push('Menü bzw. Sprechblase nach dem Drehen nicht ganz sichtbar');
        {
          const ar = a.getBoundingClientRect();
          if (!a.classList.contains('on')) out.push('aufrufende Schaltfläche nach dem Drehen nicht mehr blau');
          if (ar.top < innerHeight / 2 && mr.top < ar.bottom) out.push('Menü nach dem Drehen nicht unterhalb der Schaltfläche');
          if (!(mr.right > ar.left - 1 && mr.left < ar.right + 1)) out.push('Menü nach dem Drehen nicht an der Schaltfläche ausgerichtet');
        }
        if (s) {
          const sr = s.getBoundingClientRect(), it = m.querySelector('.mi.on');
          if (!inside(sr)) out.push('Untermenü nach dem Drehen nicht ganz sichtbar');
          if (it) { const ir = it.getBoundingClientRect(); if (Math.abs(sr.top - Math.max(12, Math.min(ir.top, innerHeight - sr.height - 12))) > 2) out.push('Untermenü nach dem Drehen nicht neben seinem Eintrag'); }
        }
        return out;
      }, anchorSel);
      for (const x of bad) note('Regel', `R-8.1 ${x} (${size.width}×${size.height})`, where);
    }
  };
  // R-8.1: Die Seitenleiste (iPad) behält beim Drehen ihren Zustand – sichtbar bleibt sichtbar (quer fest, hoch darübergelegt),
  // ausgeblendet bleibt ausgeblendet. Wird je Seite einmal automatisch geprüft (beide Zustände, hin und zurück).
  const sideChecked = new WeakSet();
  const sideKeep = async (p, where) => {
    sideChecked.add(p);
    const vp = p.viewportSize();
    const shown = () => p.evaluate(() => { const s = document.getElementById('side'); return !!s && !s.hidden && s.getClientRects().length > 0 && s.getBoundingClientRect().right > 0; });
    const toggle = async () => {
      const all = p.locator('#sideHide, [data-side-toggle]');
      for (let i = 0; i < await all.count(); i++) if (await all.nth(i).isVisible().catch(() => false)) { await all.nth(i).click(); await p.waitForTimeout(300); return true; }
      return false;
    };
    for (const pass of [0, 1]) {
      const before = await shown();
      // Seit 4.11.0 mit Zwischenschritten wie am echten Gerät (erst die Breite, dann die Höhe bzw. umgekehrt).
      const turned = { width: vp.height, height: vp.width };
      for (const [mid, size] of [[{ width: turned.width, height: vp.height }, turned], [{ width: vp.width, height: turned.height }, vp]]) {
        await p.setViewportSize(mid); await p.waitForTimeout(60);
        await p.setViewportSize(size); await p.waitForTimeout(500);
        if (await shown() !== before) note('Regel', `R-8.1 Seitenleiste ${before ? 'sichtbar' : 'ausgeblendet'} – nach dem Drehen auf ${size.width}×${size.height} ${before ? 'verschwunden' : 'erschienen'}`, where);
      }
      if (pass === 0 && !(await toggle())) break;   // zweiter Durchgang mit dem anderen Zustand
    }
    await toggle();   // Ausgangszustand wiederherstellen
  };
  // R-8.1: oberster Eintrag bleibt beim Drehen (Safari nachgebildet: kein Scroll-Anker).
  const topChecked = new WeakSet();
  const topKeep = async (p, where) => {
    const vp = p.viewportSize(), turned = { width: vp.height, height: vp.width };
    const top = () => p.evaluate(() => { const edge = document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
      return [...document.querySelectorAll('#app [data-day], #app [data-keep]')].find(e => e.getClientRects().length && e.getBoundingClientRect().bottom > edge + 1)?.outerHTML.slice(0, 80); });
    await p.addStyleTag({ content: '* { overflow-anchor: none !important; }' });
    const y0 = (await rollstand(p)).y;
    await rolle(p, '45%'); await p.waitForTimeout(300);
    const before = await top();
    // Zwischengröße nur, wenn sie wie am echten Gerät vorkommen kann: am iPhone wird beim Drehen nie eine iPad-Größe gemeldet.
    const phone = z => z.width < 700 || z.height < 500;
    for (const [mid, size] of [[{ width: turned.width, height: vp.height }, turned], [{ width: vp.width, height: turned.height }, vp]]) {
      if (phone(mid) === phone(vp)) { await p.setViewportSize(mid); await p.waitForTimeout(60); }
      await p.setViewportSize(size); await p.waitForTimeout(600);
      const now = await top();
      if (now !== before) note('Regel', `R-8.1 nach dem Drehen auf ${size.width}×${size.height} steht oben ein anderer Eintrag`, where);
    }
    await rolle(p, y0); await p.waitForTimeout(200);
  };
  // Misst die sichtbare, oberste Ebene (Menü/Sprechblase, sonst offenes Fenster, sonst Seite).
  // schnell (seit 4.13.0): nur messen, nicht drehen – für die Grundregeln nach jedem Schritt eines Ablauf-Tests (pruefe.mjs).
  async function measure(p, where, { schnell = false } = {}) {
    // Seit 4.13.0: erst messen, wenn keine Animation mehr läuft (sonst zufällige Funde bei Last, z. B. Titel halb eingeblendet).
    await ruhe(p);
    const r = await p.evaluate(skip => {
      const vis = e => { const s = getComputedStyle(e), b = e.getBoundingClientRect();
        return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && b.bottom > 0 && b.top < innerHeight && b.right > 0 && b.left < innerWidth; };
      const onTop = e => { if (document.querySelector('.layer')) return !!e.closest('.menu, .pop');
        const d = document.querySelector('dialog[open]'); return d ? d.contains(e) : true; };
      const label = e => Array.from(((e.id ? '#' + e.id + ' ' : '') + (e.getAttribute('aria-label') || e.textContent || e.placeholder || '')).trim().replace(/\s+/g, ' ')).slice(0, 40).join('');
      const res = { target: [], font: [], contrast: [], quotes: [], menu: [], rules: [] };
      // Antippflächen: 44 pt Standard; Knöpfe in Kapseln und Schalter wie bei Apple ab 28 pt.
      document.querySelectorAll('button, a[href], input:not([type=hidden]):not([type=file]), textarea, select, [role=menuitem]').forEach(e => {
        if (!vis(e) || !onTop(e)) return;
        // Bewusste Abweichungen der App (Selektoren), werden nicht gezählt
        if (skip.some(sel => e.matches(sel))) return;
        const b = e.getBoundingClientRect(), s = getComputedStyle(e);
        // Inline-Links: die Antippfläche schließt den (unsichtbaren) Innenabstand ein.
        let h = s.display === 'inline' ? b.height + parseFloat(s.paddingTop) + parseFloat(s.paddingBottom) : b.height, wd = b.width;
        // Seit 4.13.0: eine unsichtbare, absolut gesetzte Fläche (::after) gehört zur Antippfläche – so vergrößert iOS kurze Links.
        const af = getComputedStyle(e, '::after');
        if (af.content !== 'none' && af.position === 'absolute') { wd = Math.max(wd, parseFloat(af.width) || 0); h = Math.max(h, parseFloat(af.height) || 0); }
        // seit 4.28.1 (R-2.4): das Suchfeld der niedrigen Leiste (iPhone quer, 32 px) ist eine Kapsel
        const inCap = e.closest('.cap, .grp, .navgrp') || e.closest('html.phone .pnav .searchbox') && matchMedia('(orientation: landscape) and (max-height: 500px)').matches || (e.type === 'checkbox' && /switch|toggle/.test(e.className + e.parentElement.className)) || (e.type === 'checkbox' && b.width >= 51 && b.height >= 31);
        const min = inCap ? 28 : 44;
        if (Math.min(wd, h) < min) res.target.push(`${e.tagName.toLowerCase()} ‚${label(e)}‘ ${Math.round(wd)}×${Math.round(h)} px (mind. ${min})`);
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
      // Regelkatalog (Designrichtlinie allgemein, Abschnitt 17): alle automatisch prüfbaren Regeln
      const R = (nr, t) => res.rules.push(`${nr} ${t}`);
      const cs = e => getComputedStyle(e);
      const phone = document.documentElement.classList.contains('phone');
      const hex = v => rgb(v.trim().replace(/^#(..)(..)(..)$/, (m, a, b, c) => `rgb(${parseInt(a, 16)},${parseInt(b, 16)},${parseInt(c, 16)})`));
      const openDlg = [...document.querySelectorAll('dialog')].some(d => d.open);
      // R-1.4 Nur der Vordergrund reagiert
      if (openDlg && !document.documentElement.classList.contains('locked')) R('R-1.4', 'Seite hinter dem Fenster nicht gesperrt');
      document.querySelectorAll('.layer').forEach(l => { if (cs(l).touchAction !== 'none') R('R-1.4', 'Ebene hinter Menü/Sprechblase fängt Wischen nicht ab'); });
      // R-3.4 Kein Fokus-Rahmen beim Öffnen eines Fensters
      if (openDlg && document.activeElement?.id === 'dlgX') R('R-3.4', 'x hat beim Öffnen den Fokus (blauer Rahmen)');
      document.querySelectorAll('.searchbox input').forEach(e => { if (e === document.activeElement && cs(e).outlineStyle !== 'none') R('R-3.4', 'Suchfeld mit Fokus-Rahmen'); });
      // R-1.3 Doppeltippen vergrößert nie
      if ([...document.querySelectorAll('button, a[href], input, textarea, [role=button]')].some(e => vis(e) && !['manipulation', 'none'].includes(cs(e).touchAction))) R('R-1.3', 'Doppeltippen kann die Ansicht vergrößern');
      // R-2.1 Leisten bewegen sich nie
      // Seit 4.27.0 (A-28): fest heißt position: fixed oder feste Zeile im festen Rahmen (#app fest, die Leiste nicht im Rollbereich).
      const scroller = e => { for (let x = e.parentElement; x && x !== document.body; x = x.parentElement) if (/auto|scroll/.test(cs(x).overflowY)) return x; return null; };
      document.querySelectorAll('.nb, .pnav').forEach(b => { if (vis(b) && cs(b).position !== 'fixed' && (scroller(b) || cs(b.parentElement).position !== 'fixed'))
        R('R-2.1', `Leiste .${b.classList[0]} ist ${cs(b).position} ${scroller(b) ? 'im Rollbereich' : 'ohne festen Rahmen'} statt fest – sie federt mit`); });
      if (cs(document.documentElement).overscrollBehaviorY !== 'none') R('R-2.1', 'Seite federt am Rand nach');
      // R-2.4 (seit 4.28.1, A-36): iPhone quer niedrige Leisten wie iOS – Knöpfe und Suchfeld in Kopfzeile und Fensterkopf 32 px hoch
      // (die Kopfzeile damit 32 statt 44 px); hoch die gewohnten 44 px
      if (phone) {
        const quer = matchMedia('(orientation: landscape) and (max-height: 500px)').matches, soll = quer ? 32 : 44;
        // seit 4.32.0 (R-4.6): Höhe ohne Verkleinerung – hinter dem Blatt weicht die Seite verkleinert zurück
        document.querySelectorAll('.pnav .grp, .pnav .navgrp, .pnav > span > .round, .pnav .searchbox input, #dlg[open] .dlg-head .grp, #dlg[open] .dlg-head .round').forEach(e => {
          const h = e.offsetHeight;
          if (vis(e) && Math.abs(h - soll) > 1) R('R-2.4', `iPhone ${quer ? 'quer' : 'hoch'}: ${label(e) || '.' + e.classList[0]} in der Leiste ${Math.round(h)} statt ${soll} px hoch`);
        });
      }
      const side = document.getElementById('side');
      if (side && vis(side)) side.querySelectorAll('.side-head, .bhint').forEach(e => { if (scroller(e)) R('R-2.1', `.${e.classList[0]} liegt im Scrollbereich der Seitenleiste – federt mit`); });
      // R-5.1 Bezeichnung und Feld gehören zusammen
      // R-5.1 (seit 4.14.2, P-37/2): Schaltflächen im Schrittkopf bleiben als Gruppe zusammen; passt alles in eine Zeile, steht
      // es in der Zeile der Überschrift (gemessen mit der Textbreite der Überschrift und den Abständen des Kopfs).
      // Auch außerhalb des Ausschnitts (die Anordnung hängt nicht vom Scrollen ab) – nur angezeigt muss der Kopf sein.
      const shown = e => { const b = e.getBoundingClientRect(), s = getComputedStyle(e); return b.width > 0 && b.height > 0 && s.display !== 'none' && s.visibility !== 'hidden'; };
      document.querySelectorAll('.step-head').forEach(h => {
        const chips = [...h.querySelectorAll('.head-check')].filter(shown), lab = h.querySelector(':scope > label');
        if (!shown(h) || !chips.length || !lab) return;
        const rg = document.createRange(); rg.selectNodeContents(lab);
        const gap = parseFloat(cs(h).columnGap) || 0, hw = h.clientWidth - parseFloat(cs(h).paddingLeft) - parseFloat(cs(h).paddingRight);
        const cw = chips.reduce((a, c) => a + c.getBoundingClientRect().width, 0) + gap * (chips.length - 1);
        const tops = chips.map(c => Math.round(c.getBoundingClientRect().top)), lr = lab.getBoundingClientRect();
        const zusammen = Math.max(...tops) - Math.min(...tops) < 4, inZeile = tops.every(t => t < lr.bottom - 4);
        const name = (lab.textContent || '').replace(/^\d+/, '').trim().slice(0, 20);
        if (rg.getBoundingClientRect().width + gap + cw <= hw + 1 && !(zusammen && inZeile)) R('R-5.1', `Schrittkopf ‚${name}‘: Schaltflächen brechen um, obwohl alles in die Zeile der Überschrift passt`);
        else if (cw <= hw + 1 && !zusammen) R('R-5.1', `Schrittkopf ‚${name}‘: Schaltflächen nicht zusammen in einer Zeile`);
      });
      document.querySelectorAll('.dates .dl').forEach(d => { if (vis(d) && !d.parentElement.classList.contains('pair')) R('R-5.1', 'Bezeichnung nicht mit ihrem Feld verbunden'); });
      // R-6.1 Gelbe Markierung ohne blauen Rand
      const focus = hex(root.getPropertyValue('--focus'));
      document.querySelectorAll('tr, .box, .irow, .side-row').forEach(e => { if (vis(e) && same(rgb(cs(e).backgroundColor), focus) && /inset/.test(cs(e).boxShadow)) R('R-6.1', 'gelbe Markierung mit blauem Rand'); });
      // R-2.2 Titel steht in der Leiste (ohne großen Titel)
      document.querySelectorAll('.pnav-title').forEach(t => { if (vis(t.parentElement) && !document.querySelector('.ltitle') && cs(t).opacity !== '1') R('R-2.2', 'Titel nicht in der Leiste'); });
      // R-9.1 (seit 4.34.0, A-74): Backup-Kachel nur, solange heute kein Backup erstellt wurde und es Einträge gibt; der Fuß steht immer da
      if (side && vis(side)) {
        const bh = side.querySelector('.bhint'), two = n => String(n).padStart(2, '0'), d = new Date(), heute = `${two(d.getDate())}.${two(d.getMonth() + 1)}.${d.getFullYear()}`;
        if (bh && bh.textContent.includes(`Letztes Backup erstellt am ${heute}`)) R('R-9.1', 'Backup-Kachel steht, obwohl heute schon ein Backup erstellt wurde');
        if (bh && !side.querySelector('.side-row') && !side.querySelector('.side-search')) R('R-9.1', 'Backup-Kachel steht bei leerer Liste');
        if (!side.querySelector('.side-foot')) R('R-1.5', 'Fuß der Seitenleiste fehlt (Offline-Zeile nicht möglich)');
        if (typeof isOffline === 'function' && isOffline() && !vis(side.querySelector('.side-foot .offl'))) R('R-1.5', 'offline, aber die Zeile ‚Offline – …‘ fehlt unten');
      }
      if (document.querySelector('.pnav-head') && document.querySelector('.irow') && !document.querySelector('.bnote')) R('R-9.1', 'Backup-Kachel fehlt in der Startliste');
      // R-4.5 Fenster auf dem iPhone bildschirmbreit (seit 4.32.0 als Blatt, R-4.6 – Lage und Höhe prüft checkSheet)
      const dl = document.getElementById('dlg');
      if (phone && dl?.open && Math.abs(dl.getBoundingClientRect().width - innerWidth) > 2) R('R-4.5', 'Fenster nicht bildschirmbreit');
      // R-3.2 Nach oben / Ans Ende in einer senkrechten Kapsel
      document.querySelectorAll('.fab').forEach(f => { if (vis(f) && parseFloat(cs(f).borderTopLeftRadius) < 10) R('R-3.2', 'Nach oben / Ans Ende nicht in einer Kapsel'); });
      // R-3.2 (seit 4.27.1, A-33): die Kapsel überdeckt nie Kopf- oder Suchzeile (Leisten und feste Zeilen des Rahmens)
      document.querySelectorAll('.fab').forEach(f => {
        const k = f.getBoundingClientRect();
        if (cs(f).display === 'none' || f.hidden || !k.height) return;
        new Set([...document.querySelectorAll('.nb, .pnav, #app > :not(.rolle):not(.fab)')]).forEach(l => {
          const b = l.getBoundingClientRect();
          if (cs(l).display !== 'none' && b.height && k.top < b.bottom - .5 && k.bottom > b.top + .5 && k.left < b.right - .5 && k.right > b.left + .5)
            R('R-3.2', `Kapsel Nach oben / Ans Ende überdeckt die Leiste ${l.id ? '#' + l.id : '.' + l.classList[0]} (A-33)`);
        });
      });
      // R-3.1 (seit 4.25.1, A-25) Rund ist ein Kreis: runde Schaltflächen und die Markierung (gedrückt, blau gefüllt) bei Icons und
      // Emojis in Kapseln haben gleiche Breite und Höhe; Text in Kapseln (.txt, Auswahl-Kapsel mit Text) bleibt eine Kapsel.
      document.querySelectorAll('button').forEach(e => {
        if (!vis(e)) return;
        const b = e.getBoundingClientRect();
        if (cs(e).borderRadius === '50%' && Math.abs(b.width - b.height) >= 0.5) R('R-3.1', `runde Schaltfläche ‚${label(e)}‘ ist kein Kreis (${Math.round(b.width)} × ${Math.round(b.height)} px)`);
        if (!e.closest('.grp, .navgrp, .emoji-row .cap') || e.classList.contains('txt')) return;
        const f = getComputedStyle(e, '::before');
        if (f.content === 'none' || f.position !== 'absolute') return;
        const w = /px$/.test(f.width) ? parseFloat(f.width) : b.width - parseFloat(f.left) - parseFloat(f.right);
        const h = /px$/.test(f.height) ? parseFloat(f.height) : b.height - parseFloat(f.top) - parseFloat(f.bottom);
        if (Math.abs(w - h) >= 0.5) R('R-3.1', `Markierung von ‚${label(e)}‘ ist kein Kreis (${Math.round(w)} × ${Math.round(h)} px, eiförmig)`);
      });
      // R-1.3 Eingabefelder mindestens 16 px (sonst vergrößert iOS beim Antippen)
      document.querySelectorAll('input:not([type=checkbox]):not([type=hidden]):not([type=file]), textarea').forEach(e => { if (vis(e) && parseFloat(cs(e).fontSize) < 16) R('R-1.3', `Eingabefeld ${e.id ? '#' + e.id : ''} unter 16 px – iOS vergrößert beim Antippen`); });
      // R-2.2 Anzahl unter dem Titel der Liste
      document.querySelectorAll('.side-head, .pnav-head').forEach(h => { if (vis(h) && !h.querySelector('small')) R('R-2.2', 'Anzahl unter dem Titel fehlt'); });
      // R-3.2 Schaltflächen und Suchfelder schweben (außer innerhalb von Kapseln, Menüs, Listen und als Link)
      document.querySelectorAll('button, .searchbox input').forEach(e => {
        if (!vis(e) || !onTop(e) || e.closest('.grp, .navgrp, .cap, .menu, .pop .btns, #side .side-row, .irow, .fab, .smeta, .chips') || e.matches('.link, .mi, .side-row, .irow, .sclear, .fclear, .fazit-box, [data-day]')) return;
        if (cs(e).boxShadow === 'none') R('R-3.2', `Schaltfläche ohne Schatten (schwebt nicht): ‚${label(e)}‘`);
      });
      // R-10.1 Keine englischen Systemtexte
      const ui = [...document.querySelectorAll('button, .pop, dialog[open] .dlg-head, .menu')].filter(vis).map(e => e.textContent).join(' ');
      const en = ui.match(/\b(OK|Close|Cancel|Done|Delete|Share)\b/);
      if (en) R('R-10.1', `englischer Text ‚${en[1]}‘`);
      // R-6.1 Tabellen: Trennlinien zwischen allen Spalten (App-Tabellen)
      document.querySelectorAll('#app table td + td').forEach(td => { if (vis(td) && parseFloat(cs(td).borderLeftWidth) === 0) R('R-6.1', 'Tabelle ohne Trennlinie zwischen Spalten'); });
      // R-5.1 Datumsfelder so breit wie das Datum
      document.querySelectorAll('input[type=date]').forEach(e => { if (vis(e) && e.getBoundingClientRect().width > 220) R('R-5.1', `Datumsfeld zu breit (${Math.round(e.getBoundingClientRect().width)} px)`); });
      // R-5.1 Betragsfelder rechtsbündig
      document.querySelectorAll('input[inputmode=decimal]').forEach(e => { if (vis(e) && !['right', 'end'].includes(cs(e).textAlign)) R('R-5.1', 'Betragsfeld nicht rechtsbündig'); });
      // R-6.3 Hängender Einzug
      document.querySelectorAll('#app .ln').forEach(e => { if (vis(e) && cs(e).display !== 'flex') R('R-6.3', 'Zeile ohne hängenden Einzug'); });
      // R-6.1 Kasten mit Feldern: Linien waagrecht und senkrecht
      document.querySelectorAll('.box .kv').forEach(kv => {
        if (!vis(kv)) return;
        if (kv.previousElementSibling?.classList.contains('kv') && parseFloat(cs(kv).borderTopWidth) === 0) R('R-6.1', 'keine waagrechte Linie zwischen den Feldern');
        const k = kv.querySelector('.k'); if (k && parseFloat(cs(k).borderRightWidth) === 0) R('R-6.1', 'keine senkrechte Linie zwischen Bezeichnung und Inhalt');
      });
      // R-7.1 Zentrale Liste als Kacheln, höchstens ein Eintrag blau
      document.querySelectorAll('#side .side-row, .ilist.tiles .irow').forEach(e => { if (vis(e) && parseFloat(cs(e).borderTopLeftRadius) < 12) R('R-7.1', 'Eintrag der Liste ist keine Kachel'); });
      [document.getElementById('side'), document.querySelector('.ilist.tiles')].forEach(l => { if (l && l.querySelectorAll('.current').length > 1) R('R-7.1', 'mehr als ein Eintrag blau'); });
      // R-1.1 Aktionen und Suche oben – unten nur feste Hinweise
      document.querySelectorAll('.bbar').forEach(b => { if (!vis(b)) return; if ([...b.querySelectorAll('button')].some(x => !x.closest('.bnote')) || b.querySelector('.searchbox')) R('R-1.1', 'Aktion oder Suche in der unteren Leiste statt oben in der Kapsel'); });
      // R-1.2 Darstellung folgt dem Gerät
      try { if (typeof db !== 'undefined' && db.settings?.appearance === 'auto') { const want = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; if (document.documentElement.dataset.theme !== want) R('R-1.2', 'Darstellung folgt nicht dem Gerät'); } } catch (e) {}
      // R-10.1 Teilen nur als Icon
      document.querySelectorAll('button').forEach(b => { if (vis(b) && b.querySelector('svg') && /teilen|share/i.test(b.getAttribute('aria-label') || '') && b.textContent.trim()) R('R-10.1', 'Teilen mit Text'); });
      // R-1.1 Gleiche Funktion = gleicher Baustein: die Kacheln laufen unter der Backup-Kachel durch (iPad wie iPhone)
      document.querySelectorAll('.side-foot').forEach(f => { const l = f.parentElement.querySelector('.side-list');
        if (vis(f) && l && l.getBoundingClientRect().bottom < f.getBoundingClientRect().bottom - 2) R('R-1.1', 'Liste endet über der Backup-Kachel (starre Begrenzung statt durchlaufen)'); });
      // R-4.3 Abfrage mit mehreren Wegen: empfohlene Aktion blau zuerst, zerstörende rot, Abbrechen zuletzt
      document.querySelectorAll('.pop .btns').forEach(g => { const bs = [...g.querySelectorAll('button')]; if (bs.length < 3 || !vis(g)) return;
        if (!bs[0].classList.contains('primary')) R('R-4.3', 'empfohlene Aktion nicht blau gefüllt an erster Stelle');
        if (!/Abbrechen|Weiter bearbeiten/.test(bs[bs.length - 1].textContent)) R('R-4.3', '‚Abbrechen‘ nicht zuletzt');
        bs.slice(1, -1).forEach(b => { if (/Ersetzen|löschen|Löschen/.test(b.textContent) && !b.classList.contains('danger-text')) R('R-4.3', `zerstörende Aktion ‚${b.textContent}‘ nicht in roter Schrift`); }); });
      // R-4.5 Menü, Sprechblase und Fenster passen ganz auf den Bildschirm (sonst wären Knöpfe unerreichbar)
      document.querySelectorAll('.pop, .menu, dialog[open]').forEach(e => { const b = e.getBoundingClientRect(); if (!b.width || !b.height) return;
        if (b.top < -1 || b.left < -1 || b.bottom > innerHeight + 1 || b.right > innerWidth + 1) R('R-4.5', `${e.classList[0] || e.tagName.toLowerCase()} ragt über den Bildschirm hinaus (${Math.round(b.top)}–${Math.round(b.bottom)} von ${innerHeight} px)`); });
      // R-3.3 (seit 4.12.0): blau gefüllt nur die Hauptaktion – höchstens eine je Fenster bzw. Sprechblase.
      document.querySelectorAll('dialog[open], .pop').forEach(d => { const n = [...d.querySelectorAll('button.primary')].filter(vis).length;
        if (n > 1) R('R-3.3', `${n} blau gefüllte Schaltflächen in einem ${d.tagName === 'DIALOG' ? 'Fenster' : 'Abfrage'} – höchstens eine Hauptaktion`); });
      // R-5.4 (seit 4.12.0): Auswahl-Kapsel – wischbar mit Verlauf am Rand; die Markierung ändert die Breite nicht.
      // Seit 4.33.0 (A-75 K1–K5, K8, K15): im freien Rand ein kleiner Pfeil (chevron, 14 px, --muted, 9 px vom Rand, nur Anzeige,
      // aria-hidden) genau dann, wenn es auf seiner Seite weitergeht – passt alles, weder Verlauf noch Pfeil.
      document.querySelectorAll('.cap .scroll').forEach(s => { if (!vis(s) || !onTop(s)) return;
        const more = s.scrollLeft + s.clientWidth < s.scrollWidth - 2, mask = (cs(s).maskImage || cs(s).webkitMaskImage || 'none');
        if (more && mask === 'none') R('R-5.4', 'Auswahl-Kapsel geht rechts weiter, aber ohne Verlauf am Rand');
        const cap = s.parentElement, kr = cap.getBoundingClientRect(), weiter = { l: s.scrollLeft > 2, r: more };
        if (!weiter.l && !weiter.r && mask !== 'none') R('R-5.4', 'Auswahl-Kapsel passt ganz, hat aber einen Verlauf am Rand');
        for (const seite of ['l', 'r']) { const f = cap.querySelector(`:scope > .pf.${seite}`), wo = seite === 'l' ? 'links' : 'rechts';
          if (!f) { R('R-5.4', `Auswahl-Kapsel ohne Pfeil ${wo}`); continue; }
          if (f.classList.contains('an') !== weiter[seite]) R('R-5.4', `Pfeil ${wo} ${weiter[seite] ? 'fehlt, obwohl es weitergeht' : 'steht, obwohl dort das Ende erreicht ist'}`);
          const fr = f.getBoundingClientRect(), rand = seite === 'l' ? fr.left - kr.left : kr.right - fr.right;
          if (Math.abs(fr.width - 14) > 0.5 || Math.abs(rand - 9) > 1 || Math.abs((fr.top + fr.bottom) / 2 - (kr.top + kr.bottom) / 2) > 1) R('R-5.4', `Pfeil ${wo} nicht 14 px groß, 9 px vom Rand, mittig (${Math.round(fr.width)} px, Rand ${Math.round(rand)} px)`);
          if (cs(f).pointerEvents !== 'none' || f.getAttribute('aria-hidden') !== 'true') R('R-5.4', `Pfeil ${wo} ist nicht nur Anzeige (pointer-events ${cs(f).pointerEvents}, aria-hidden ${f.getAttribute('aria-hidden')})`);
          const muted = (() => { const x = document.createElement('i'); x.style.color = 'var(--muted)'; cap.append(x); const c = cs(x).color; x.remove(); return c; })();
          if (cs(f).color !== muted) R('R-5.4', `Pfeil ${wo} nicht in --muted (${cs(f).color} statt ${muted})`); }
        s.querySelectorAll('button[aria-pressed]').forEach(b => { const was = b.getAttribute('aria-pressed'), w0 = b.getBoundingClientRect().width;
          b.setAttribute('aria-pressed', was === 'true' ? 'false' : 'true'); const w1 = b.getBoundingClientRect().width; b.setAttribute('aria-pressed', was);
          if (Math.abs(w1 - w0) > 0.5) R('R-5.4', `Auswahl ‚${label(b)}‘ ändert beim Wählen ihre Breite (${Math.round(w0)} → ${Math.round(w1)} px)`); }); });
      // R-6.1 (seit 4.12.0): Zebra je Tabellenzeile auch in den Tabellen der App – eine Tabellenzeile sind alle Zeilen unter einer
      // zusammengefassten bzw. leeren ersten Zelle; sie ist einheitlich gefärbt, weiß und grau wechseln sich ab. Gelb markierte
      // Zeilen (--focus) zählen nicht.
      document.querySelectorAll('#app table').forEach(t => { if (!vis(t)) return;
        const bgc = c => { const own = cs(c).backgroundColor; return own !== 'rgba(0, 0, 0, 0)' ? own : cs(c.parentElement).backgroundColor; };
        const units = []; let cover = 0;
        for (const r of t.querySelectorAll('tbody tr')) { if (!r.getClientRects().length) continue;
          if (cover > 0) { cover--; units[units.length - 1].push(r); continue; }
          if (units.length && !r.cells[0]?.textContent.trim()) { units[units.length - 1].push(r); continue; }
          units.push([r]); cover = (+r.cells[0]?.getAttribute('rowspan') || 1) - 1; }
        const col = units.map(u => [...new Set(u.flatMap(r => [...r.cells].map(bgc)).filter(c => !same(rgb(c), focus)))]);
        col.forEach((c, k) => { if (c.length > 1) R('R-6.1', `Tabellenzeile ${k + 1} nicht einheitlich gefärbt – Zebra gilt für die ganze Tabellenzeile`);
          else if (k && c.length === 1 && col[k - 1].length === 1 && c[0] === col[k - 1][0]) R('R-6.1', `Tabellenzeilen ${k} und ${k + 1} gleich gefärbt – weiß und grau wechseln sich ab`); }); });
      // R-6.2 (seit 4.11.3): Tabellen in Ausgaben, Vorschauen und Berichten = Mustertabelle der Ausgabe (outputCss in ui.js).
      // Verglichen wird Eigenschaft für Eigenschaft mit einer unsichtbar aufgebauten Mustertabelle: Schrift, Kopf (Farbe,
      // Schriftstärke, Rand), Linien (überall gleich stark), Innenabstände, jede zweite Zeile grau.
      const grids = [...document.querySelectorAll('.rt table.grid, .sync-report table.grid')].filter(vis);
      if (grids.length && typeof outputCss === 'function') {
        const ref = document.createElement('div'); ref.className = 'r52ref'; ref.style.cssText = 'position:absolute;left:-9999px;top:0;width:600px';
        ref.innerHTML = `<style>${outputCss('.r52ref')}</style><table class="grid"><thead><tr><th>K</th><th>K</th></tr></thead><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table>`;
        document.body.append(ref);
        const pick = (e, ks) => e ? ks.map(k => cs(e)[k]).join(' | ') : '–';
        const head = ['backgroundColor', 'fontWeight', 'borderTopColor', 'borderTopWidth', 'paddingTop', 'paddingLeft', 'fontSize', 'fontFamily'];
        const cell = ['borderTopWidth', 'borderTopColor', 'paddingTop', 'paddingLeft', 'fontSize', 'fontFamily', 'verticalAlign'];
        const want = { head: pick(ref.querySelector('thead th'), head), cell: pick(ref.querySelector('tbody tr:first-child td'), cell),
          odd: cs(ref.querySelector('tbody tr:nth-child(1)')).backgroundColor, even: cs(ref.querySelector('tbody tr:nth-child(2)')).backgroundColor };
        ref.remove();
        grids.forEach(t => {
          const name = t.closest('.sync-report') ? 'Bericht' : 'Ausgabe';
          if (pick(t.querySelector('thead th'), head) !== want.head) R('R-6.2', `${name}: Tabellenkopf anders als die Mustertabelle (${pick(t.querySelector('thead th'), head)})`);
          const td = [...t.querySelectorAll('tbody td')].find(c => !c.closest('tr').querySelector('th'));
          if (td && pick(td, cell) !== want.cell) R('R-6.2', `${name}: Zellen anders als die Mustertabelle (${pick(td, cell)})`);
          const widths = new Set();
          t.querySelectorAll('th, td').forEach(c => { const x = cs(c); for (const side of ['Top', 'Right', 'Bottom', 'Left']) { const w = parseFloat(x[`border${side}Width`]); if (w) widths.add(w); } });
          t.querySelectorAll('tbody').forEach(b => { const w = parseFloat(cs(b).borderTopWidth); if (w) widths.add(w); });
          if (widths.size > 1) R('R-6.2', `${name}: verschiedene Linienstärken (${[...widths].join(', ')} px) – wie die Mustertabelle überall gleich`);
          // Datenzellen nur weiß oder grau wie die Mustertabelle; ab zwei Zeilen bzw. Tagen kommen beide vor (Zebra).
          const bg = c => { const own = cs(c).backgroundColor; return own !== 'rgba(0, 0, 0, 0)' ? own : cs(c.parentElement).backgroundColor; };
          const white = want.odd === 'rgba(0, 0, 0, 0)' ? ['rgba(0, 0, 0, 0)', 'rgb(255, 255, 255)'] : [want.odd];
          const tds = [...t.querySelectorAll('tbody td')], colors = new Set(tds.map(bg).map(c => white.includes(c) ? 'weiß' : c === want.even ? 'grau' : c));
          [...colors].filter(c => c !== 'weiß' && c !== 'grau').forEach(c => R('R-6.2', `${name}: Zeilenfarbe ${c} nicht wie die Mustertabelle`));
          // Zebra gilt für die ganze Tabellenzeile (allgemeiner Standard): alle Zellen einer Zeile gleich, keine zusammengefasste
          // Zelle über verschieden gefärbte Zeilen.
          t.querySelectorAll('tbody [rowspan]').forEach(x => { const n = +x.getAttribute('rowspan'); if (n > 1) { const r0 = x.parentElement, rows = [...r0.parentElement.children], i0 = rows.indexOf(r0);
            if (new Set(rows.slice(i0, i0 + n).map(r => cs(r).backgroundColor === 'rgba(0, 0, 0, 0)' ? bg(r.querySelector('td') || r) : cs(r).backgroundColor)).size > 1) R('R-6.2', `${name}: zusammengefasste Zelle über weiße und graue Zeilen – Zebra gilt für die ganze Zeile`); } });
          // Tabellenzeilen zählen (seit 4.11.4): eine Zeile beginnt dort, wo die erste Spalte einen Inhalt hat und nicht von einer
          // zusammengefassten Zelle darüber bedeckt ist – zusammengefasste Zellen in der ersten Spalte gelten als eine Tabellenzeile.
          const trs = [...t.querySelectorAll('tbody tr')], units = []; let cover = 0;
          // Eine leere erste Zelle setzt die Zeile darüber fort (wirkt wie zusammengefasst).
          for (const r of trs) { if (cover > 0) { cover--; units[units.length - 1].push(r); continue; }
            if (units.length && !r.cells[0]?.textContent.trim()) { units[units.length - 1].push(r); continue; }
            units.push([r]); cover = (+r.cells[0]?.getAttribute('rowspan') || 1) - 1; }
          if (units.length >= 2 && !colors.has('grau')) R('R-6.2', `${name}: keine grauen Zeilen wie die Mustertabelle (jede zweite Zeile grau)`);
          // Alle Zellen einer Tabellenzeile in derselben Farbe wie ihre erste Spalte; die Farben wechseln von Zeile zu Zeile.
          const unitColor = u => new Set(u.flatMap(r => [...r.cells].map(bg)));
          units.forEach((u, k) => { const c = unitColor(u);
            if (c.size > 1) R('R-6.2', `${name}: Tabellenzeile ${k + 1} nicht einheitlich gefärbt – alle Zellen wie die erste Spalte`);
            if (k && c.size === 1 && [...c][0] === [...unitColor(units[k - 1])][0]) R('R-6.2', `${name}: Tabellenzeilen ${k} und ${k + 1} gleich gefärbt – weiß und grau wechseln sich ab`); });
        });
      }
      // R-6.3 Kein Text ragt über Zelle oder Kachel hinaus – zu lange Wörter brechen im Wort um
      // Seit 4.11.2: jede Tabellenzelle überall – auch in Fenstern, Vorschauen und Berichten (vorher nur #app).
      document.querySelectorAll('td, th, #app dd, #app .box, .box .kv .v, .box .ln, .irow, .side-row, .bhint, .bnote, .msg-text, .pop p, .fazit-box').forEach(e => {
        if (!vis(e) || e.closest('#printout') || cs(e).textOverflow === 'ellipsis') return;
        const right = e.getBoundingClientRect().right;
        if (e.scrollWidth > e.clientWidth + 1 || [...e.querySelectorAll('*')].some(c => vis(c) && c.getBoundingClientRect().right > right + 1)) R('R-6.3', `Text ragt über ${e.tagName.toLowerCase()}${e.classList[0] ? '.' + e.classList[0] : ''} hinaus: ‚${label(e)}‘`);
      });
      document.querySelectorAll('#app table').forEach(t => { if (vis(t) && !t.closest('.rt') && t.offsetWidth > t.parentElement.clientWidth + 1 && !/auto|scroll/.test(cs(t.parentElement).overflowX)) R('R-6.3', `Tabelle breiter als ihr Platz (${t.offsetWidth} statt ${t.parentElement.clientWidth} px)`); });
      if (document.documentElement.scrollWidth > innerWidth + 1) R('R-6.3', 'Seite breiter als der Bildschirm');
      // R-2.1 (seit 4.27.0, A-28): Die Seite rollt nie, nur der Inhalt – nach jedem Schritt steht das Fenster bei 0.
      if (Math.round(scrollY) !== 0) R('R-2.1', `Die Seite rollt (scrollY ${Math.round(scrollY)}) – nur der Inhalt darf rollen (Rollbereich .rolle)`);
      // R-5.7 (seit 4.29.0, A-63 C4): Schalter sind Safaris eingebauter Schalter (Attribut switch, role="switch" – VoiceOver sagt
      // ‚Schalter‘). Kennt der Browser ihn nicht (alle Prüfbrowser), ist es unser Schalter 51 × 31; kennt er ihn (html.natsw, hier
      // nachgebildet), zeichnet ihn Safari selbst (appearance nicht none) in Grün (accent-color = --sw-on).
      document.querySelectorAll('.check.sw input').forEach(e => {
        if (!vis(e)) return;
        const name = label(e.closest('label') || e), root = document.documentElement, nat = root.classList.contains('natsw');
        if (!e.hasAttribute('switch') || e.getAttribute('role') !== 'switch') R('R-5.7', `Schalter ‚${name}‘ ohne switch und role="switch"`);
        const b = e.getBoundingClientRect();
        if (!nat && (Math.round(b.width) !== 51 || Math.round(b.height) !== 31)) R('R-5.7', `Schalter ‚${name}‘ ${Math.round(b.width)} × ${Math.round(b.height)} statt 51 × 31`);
        const gruen = document.createElement('span'); gruen.style.color = 'var(--sw-on)'; e.parentElement.append(gruen);
        root.classList.add('natsw');
        const x = cs(e), soll = cs(gruen).color, ap = x.appearance || x.webkitAppearance, ac = x.accentColor;
        if (!nat) root.classList.remove('natsw');
        gruen.remove();
        if (e.hasAttribute('switch') && (ap === 'none' || ac !== soll)) R('R-5.7', `Schalter ‚${name}‘ mit Safaris Schalter nicht im Systemaussehen (appearance ${ap}, accent-color ${ac} statt ${soll})`);
      });
      // R-10.1 (seit 4.12.0): gleiche Aktion = gleiches Icon – Bezeichnung und Icon jeder sichtbaren Schaltfläche, verglichen in report()
      res.icons = [...document.querySelectorAll('button[aria-label]')].filter(b => vis(b) && b.querySelector('svg.ic')).map(b => [b.getAttribute('aria-label'), b.querySelector('svg.ic').innerHTML.slice(0, 80)]);
      return res;
    }, skipTargets);
    for (const [lbl, sig] of r.icons) { if (!icons.has(lbl)) icons.set(lbl, new Map()); if (!icons.get(lbl).has(sig)) icons.get(lbl).set(sig, where); }
    delete r.icons;
    for (const [k, list] of Object.entries(r)) for (const x of list) note('Regel', { target: 'R-3.1 Antippfläche ', font: 'R-10.2 Schrift ', contrast: 'R-10.2 Kontrast ', quotes: 'R-10.1 Anführungszeichen ', menu: 'R-4.1 Menü: ', rules: '' }[k] + x, where);
    if (schnell) return;
    await safe(p, where);
    // R-8.1 automatisch: einmal je Seite, wenn eine Seitenleiste da ist und nichts darüber offen ist (nur iPad).
    if (!rotating && !sideChecked.has(p) && await p.evaluate(() => !!document.getElementById('side') && !document.documentElement.classList.contains('phone') && !document.querySelector('.menu, .pop, dialog[open]'))) {
      rotating = true; try { await sideKeep(p, `${where} – Seitenleiste gedreht`); } finally { rotating = false; }
    }
    // R-8.1 automatisch (seit 4.11.2): einmal je Seite mit Einträgen (data-day/data-keep) – wie in Safari ohne Scroll-Anker
    // nach unten wischen, drehen, zurückdrehen: oben steht jedes Mal derselbe Eintrag.
    if (!rotating && !topChecked.has(p) && await p.evaluate(([sel, R]) => { const r = eval(R); return document.querySelectorAll(sel).length > 3 && r.max > r.h && !document.querySelector('.menu, .pop, dialog[open]'); }, ['#app [data-day], #app [data-keep]', ROLL])) {
      topChecked.add(p); rotating = true; try { await topKeep(p, `${where} – oberster Eintrag gedreht`); } finally { rotating = false; }
    }
    // R-8.1 automatisch: ist ein Menü, Untermenü oder eine Sprechblase offen, wird jedes Mal gedreht (quer ↔ hoch) und zurück.
    if (!rotating) {
      const anchor = await p.evaluate(() => { const a = [...document.querySelectorAll('.on')].find(e => !e.closest('.menu, .pop, dialog') && e.getClientRects().length && document.querySelector('.menu, .pop'));
        return !a ? null : a.id ? '#' + CSS.escape(a.id) : a.dataset.id ? `.${a.classList[0]}[data-id="${CSS.escape(a.dataset.id)}"]` : null; });
      if (anchor) { rotating = true; try { await rotate(p, anchor, `${where} – gedreht`); } finally { rotating = false; } }
    }
  }

  // R-1.7 (seit 4.29.0, A-63 S-2 bis S-6): Die Prüfbrowser liefern für env(safe-area-inset-…) immer 0 – deshalb setzt die Prüfung
  // echte Gerätewerte über die Variablen --safe-… (design.css) und prüft: nichts fest Stehendes (Knopf, Feld, Titel, Kachel) liegt
  // unter Statusleiste bzw. Dynamic Island, Aussparung oder Home-Leiste; Fenster, Menüs und Sprechblasen (außer dem bildschirmfüllenden
  // iPhone-Fenster) bleiben ganz innerhalb; Inhalt darf darunter rollen, sein Ende lässt sich aber bis über die Home-Leiste rollen.
  // Werte: iPhone 16 Pro / 17 Pro (402 × 874) und iPad; oben 62 am iPhone hoch ist streng (vom Home-Bildschirm liegt die Statusleiste
  // über der App, dann 0) – so bleibt auch Safari mit durchscheinender Statusleiste geprüft. Danach wieder die Werte des Browsers.
  const SAFE = { 'iPhone hoch': { top: 62, bottom: 34, left: 0, right: 0 }, 'iPhone quer': { top: 0, bottom: 20, left: 62, right: 62 }, iPad: { top: 24, bottom: 20, left: 0, right: 0 } };
  async function safe(p, where) {
    const vp = p.viewportSize(), wert = Math.min(vp.width, vp.height) < 500 ? SAFE[vp.width > vp.height ? 'iPhone quer' : 'iPhone hoch'] : SAFE.iPad;
    // Wie beim Drehen am Gerät: neue Ränder, dann meldet Safari den sichtbaren Bereich neu (Fenster werden neu platziert)
    const setze = v => p.evaluate(v => { const r = document.documentElement.style;
      for (const k of ['top', 'bottom', 'left', 'right']) v ? r.setProperty('--safe-' + k, v[k] + 'px') : r.removeProperty('--safe-' + k);
      window.visualViewport?.dispatchEvent(new Event('resize')); }, v);
    await setze(wert); await p.waitForTimeout(120); await ruhe(p);
    const bad = await p.evaluate(s => {
      const W = innerWidth, H = innerHeight, out = [], cs = e => getComputedStyle(e);
      const vis = e => { const b = e.getBoundingClientRect(), c = cs(e); return b.width > 0 && b.height > 0 && c.visibility !== 'hidden' && c.display !== 'none' && +c.opacity > 0 && b.bottom > 0 && b.top < H && b.right > 0 && b.left < W; };
      const label = e => Array.from(((e.id ? '#' + e.id + ' ' : '') + (e.getAttribute('aria-label') || e.textContent || e.placeholder || e.className || e.tagName.toLowerCase())).trim().replace(/\s+/g, ' ')).slice(0, 40).join('');
      const zonen = [['oben (Statusleiste, Dynamic Island)', 0, 0, W, s.top], ['unten (Home-Leiste)', 0, H - s.bottom, W, H], ['links (Aussparung)', 0, 0, s.left, H], ['rechts (Aussparung)', W - s.right, 0, W, H]].filter(z => z[3] > z[1] && z[4] > z[2]);
      const rollt = (e, achse) => { for (let a = e.parentElement; a && a !== document.documentElement; a = a.parentElement) { const c = cs(a);
        if (achse === 'y' ? /auto|scroll/.test(c.overflowY) && a.scrollHeight > a.clientHeight + 1 : /auto|scroll/.test(c.overflowX) && a.scrollWidth > a.clientWidth + 1) return true; } return false; };
      const gemeldet = new Set();
      document.querySelectorAll('button, a[href], input:not([type=hidden]):not([type=file]), textarea, select, label, h1, h2, h3, small, .pnav-title, .side-row, .irow, .bnote, .bhint').forEach(e => {
        if (!vis(e) || e.closest('#printout')) return;
        const b = e.getBoundingClientRect();
        for (const [n, x1, y1, x2, y2] of zonen) {
          const ix1 = Math.max(b.left, x1), iy1 = Math.max(b.top, y1), ix2 = Math.min(b.right, x2), iy2 = Math.min(b.bottom, y2);
          if (ix2 - ix1 < 1 || iy2 - iy1 < 1) continue;
          const h = document.elementFromPoint((ix1 + ix2) / 2, (iy1 + iy2) / 2);
          if (!h || !(h === e || e.contains(h) || h.contains(e))) continue;   // verdeckt (z. B. von der Leiste) – nicht zu sehen
          if (rollt(e, /oben|unten/.test(n) ? 'y' : 'x')) continue;          // Inhalt darf darunter rollen
          const k = label(e) + n; if (gemeldet.has(k)) continue; gemeldet.add(k);
          out.push(`‚${label(e)}‘ liegt ${Math.round(/oben|unten/.test(n) ? iy2 - iy1 : ix2 - ix1)} px ${n}`);
        }
      });
      // Fenster, Menüs, Sprechblasen ganz innerhalb (das iPhone-Fenster füllt den Bildschirm – sein Kopf und Inhalt halten Abstand)
      document.querySelectorAll('dialog[open], .menu, .pop').forEach(d => {
        if (!vis(d)) return;
        const b = d.getBoundingClientRect();
        if (d.matches('dialog') && b.width >= W - 2) return;
        const name = d.matches('dialog') ? 'Fenster' : d.matches('.pop') ? 'Sprechblase' : 'Menü';
        if (b.top < s.top - .5) out.push(`${name} reicht ${Math.round(s.top - b.top)} px unter die Statusleiste`);
        if (b.bottom > H - s.bottom + .5) out.push(`${name} reicht ${Math.round(b.bottom - H + s.bottom)} px unter die Home-Leiste`);
        if (b.left < s.left - .5 || b.right > W - s.right + .5) out.push(`${name} reicht in die Aussparung`);
      });
      // Inhalt, der unter die Home-Leiste reicht, lässt sich mit seinem Ende bis über sie rollen
      if (s.bottom) document.querySelectorAll('*').forEach(c => {
        const x = cs(c); if (!/auto|scroll/.test(x.overflowY) || c.scrollHeight <= c.clientHeight + 1 || !vis(c)) return;
        const b = c.getBoundingClientRect(), ueber = b.bottom - (H - s.bottom); if (ueber < 1) return;
        const kinder = [...c.children].filter(k => k.getBoundingClientRect().height > 0); if (!kinder.length) return;
        const ende = Math.max(...kinder.map(k => k.getBoundingClientRect().bottom)) - b.top + c.scrollTop, rest = c.scrollHeight - ende;
        if (rest + .5 < ueber) out.push(`Ende von ‚${c.id ? '#' + c.id : '.' + (c.classList[0] || c.tagName.toLowerCase())}‘ lässt sich nicht über die Home-Leiste rollen (${Math.round(ueber - rest)} px fehlen)`);
      });
      return out;
    }, wert);
    await setze(null); await p.waitForTimeout(120); await ruhe(p);
    const lage = `${Math.min(vp.width, vp.height) < 500 ? 'iPhone' : 'iPad'}, Ränder ${wert.top}/${wert.bottom}/${wert.left}/${wert.right}`;
    for (const x of bad) note('Regel', `R-1.7 ${x} (${lage})`, where);
  }

  // R-1.1 Gleiche Funktion = gleicher Baustein auf iPad und iPhone: Aufbau (Elemente, Klassen, Scrollbereiche,
  // feste Teile) eines Bausteins je Gerät festhalten; report() vergleicht die Geräte. allow: bewusst nur auf einem Gerät.
  const shapes = new Map();
  const shape = async (p, sel, name, device, allow = []) => {
    const sig = await p.locator(sel).first().evaluate((root, allow) => {
      if (getComputedStyle(root).display === 'none' || root.hidden) return null;
      const ignore = /^(current|on|ok|page|over|red|held)$/, out = new Set();
      const walk = (e, path, d) => { for (const c of e.children) {
        const s = getComputedStyle(c);
        if (s.display === 'none' || allow.some(a => c.matches(a))) continue;
        const cls = [...c.classList].filter(x => !ignore.test(x)).sort().join('.');
        const key = `${path} > ${c.tagName.toLowerCase()}${c.id ? '#' + c.id : ''}${cls ? '.' + cls : ''}`;
        out.add(key + (/auto|scroll/.test(s.overflowY) ? ' [scrollt]' : '') + (/absolute|fixed|sticky/.test(s.position) ? ' [fest]' : ''));
        if (d < 4) walk(c, key, d + 1);
      } };
      walk(root, '', 0);
      return [...out];
    }, allow).catch(() => null);
    if (!shapes.has(name)) shapes.set(name, new Map());
    shapes.get(name).set(device, sig);
  };
  const compareShapes = () => {
    for (const [name, byDev] of shapes) {
      const devs = [...byDev.keys()]; if (devs.length < 2) continue;
      const [d0, ...rest] = devs, a = byDev.get(d0);
      for (const d of rest) { const b = byDev.get(d);
        if (!a || !b) { note('Regel', `R-1.1 Baustein ‚${name}‘ fehlt auf ${!a ? d0 : d} – dort eigene Umsetzung statt desselben Bausteins`, `${d0} ↔ ${d}`); continue; }
        const only = (x, y) => x.filter(k => !y.includes(k)).slice(0, 3).join(' · ');
        const ab = only(a, b), ba = only(b, a);
        if (ab || ba) note('Regel', `R-1.1 Baustein ‚${name}‘ auf ${d0} und ${d} verschieden${ab ? ` – nur ${d0}: ${ab}` : ''}${ba ? ` – nur ${d}: ${ba}` : ''}`, `${d0} ↔ ${d}`);
      }
    }
  };
  // R-2.1: Eine Symbolleiste – mit oder ohne Suchzeile – bewegt sich beim Wischen keinen Millimeter.
  // Misst Lage und Höhe jeder sichtbaren Leiste, scrollt die Seite (und die Liste der Seitenleiste) in Schritten
  // bis über die Ränder hinaus und meldet jede Abweichung ab 0,5 px.
  const barStill = async (p, where) => {
    const bad = await p.evaluate(async R => {
      const roll = eval(R);
      const frame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      const sel = '.nb, .pnav, .nb2, .searchbox, #side .side-head, #side .side-foot';
      const snap = () => new Map([...document.querySelectorAll(sel)].filter(e => e.getBoundingClientRect().height > 0)
        .map(e => { const b = e.getBoundingClientRect(); return [e, [b.top, b.left, b.height]]; }));
      const base = snap(), out = new Set(), y0 = roll.y;
      const name = e => (e.id ? '#' + e.id : '') + '.' + (e.className.baseVal ?? e.className).split(' ')[0];
      const cmp = step => { for (const [e, v] of snap()) { const o = base.get(e); if (!o) { out.add(`${name(e)} erscheint beim Wischen (${step})`); continue; }
        const d = v.map((x, i) => Math.abs(x - o[i])); if (Math.max(...d) >= 0.5) out.add(`Leiste ${name(e)} bewegt sich beim Wischen um ${Math.max(...d).toFixed(1)} px (${step})`); } };
      const max = roll.max;
      for (const y of [1, 40, 300, max / 2, max, max + 300, -100, 0]) { roll.to(y); await frame(); cmp('Inhalt'); }
      // Seit 4.27.0 (A-28): auch ein Versuch, das Fenster zu rollen, bewegt nichts – die Seite rollt nie.
      if (roll.el) { scrollTo(0, 300); await frame(); if (Math.round(scrollY)) out.add(`Die Seite rollt (scrollY ${Math.round(scrollY)}) – nur der Inhalt darf rollen`); cmp('Fenster'); scrollTo(0, 0); }
      const list = document.querySelector('#side .side-list');
      if (list && list.getBoundingClientRect().height > 0) { const t0 = list.scrollTop; for (const y of [1, 200, list.scrollHeight, 0]) { list.scrollTop = y; await frame(); cmp('Seitenleiste'); } list.scrollTop = t0; }
      roll.to(y0); await frame();
      // Seit 4.12.1 (P-32/2): Safari nachgebildet – bei offener Tastatur verschiebt Safari den sichtbaren Bereich (visualViewport.offsetTop),
      // Chrome nie. Jede feste Leiste muss um genau diese Strecke mitwandern, damit sie auf dem Bildschirm an ihrem Platz bleibt.
      if (window.visualViewport) {
        const shift = 200, before = snap();
        Object.defineProperty(visualViewport, 'offsetTop', { get: () => shift, configurable: true });
        visualViewport.dispatchEvent(new Event('scroll')); await frame();
        for (const [e, v] of snap()) { const o = before.get(e); if (o && Math.abs(v[0] - o[0] - shift) >= 0.5) out.add(`Leiste ${name(e)} folgt dem von Safari verschobenen sichtbaren Bereich nicht (rückt um ${Math.round(shift - (v[0] - o[0]))} px nach oben)`); }
        delete visualViewport.offsetTop; visualViewport.dispatchEvent(new Event('scroll')); await frame();
      }
      return [...out];
    }, ROLL);
    for (const x of bad) note('Regel', `R-2.1 ${x}`, where);
  };
  const stays = async (p, sel, where) => {
    if (!await p.locator(sel).first().evaluate(e => e.classList.contains('on')).catch(() => false)) note('Regel', `R-3.3 ${sel} bleibt nicht blau, solange sein Menü, Fenster oder seine Abfrage offen ist`, where);
  };
  // still (seit 4.13.0): ohne Abweichungen nichts ausgeben (Grundregeln in den Ablauf-Tests).
  const report = ({ still = false } = {}) => {
    compareShapes();
    for (const [lbl, m] of icons) if (m.size > 1) note('Regel', `R-10.1 ‚${lbl}‘ mit ${m.size} verschiedenen Icons – gleiche Aktion, gleiches Icon`, [...m.values()].join(' ↔ '));
    if (!found.size) { if (!still) console.log('HIG- und Regel-Prüfung: keine Abweichungen.'); return 0; }
    console.log(`HIG- und Regel-Prüfung: ${found.size} Abweichung(en)\n`);
    for (const [k, where] of found) console.log(`- ${k}\n    ${[...where].slice(0, 3).join(' · ')}${where.size > 3 ? ` · +${where.size - 3}` : ''}`);
    return 1;
  };
  return { measure, stays, shape, barStill, rotate, sideKeep, safe, note, report };
}
