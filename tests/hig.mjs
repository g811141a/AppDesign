// AppDesign 4.7.0 · HIG- und Regel-Prüfung: misst eine App-Ansicht gegen die HIG-Checkliste (Abschnitt 16)
// und alle automatisch prüfbaren Regeln des Regelkatalogs (Abschnitt 17, R-01 …) der Designrichtlinie allgemein. Wird vom Prüfskript jeder App eingebunden:
//   import { createCheck } from '../../AppDesign/tests/hig.mjs';
//   const hig = createCheck({ skipTargets: ['table.days .ln:not(.q) a'] });   // bewusste Abweichungen der App
//   await hig.measure(page, 'Mehr-Menü (hell quer)');  await hig.stays(page, '#mainMore', 'Mehr-Menü');
//   await hig.shape(page, '#side', 'Seitenleiste', 'iPad');   // gleicher Baustein auf iPad und iPhone (R-36)
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
      const res = { target: [], font: [], contrast: [], quotes: [], menu: [], rules: [] };
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
      // Regelkatalog (Designrichtlinie allgemein, Abschnitt 17): alle automatisch prüfbaren Regeln
      const R = (nr, t) => res.rules.push(`${nr} ${t}`);
      const cs = e => getComputedStyle(e);
      const phone = document.documentElement.classList.contains('phone');
      const hex = v => rgb(v.trim().replace(/^#(..)(..)(..)$/, (m, a, b, c) => `rgb(${parseInt(a, 16)},${parseInt(b, 16)},${parseInt(c, 16)})`));
      const openDlg = [...document.querySelectorAll('dialog')].some(d => d.open);
      // R-01 Nur der Vordergrund reagiert
      if (openDlg && !document.documentElement.classList.contains('locked')) R('R-01', 'Seite hinter dem Fenster nicht gesperrt');
      document.querySelectorAll('.layer').forEach(l => { if (cs(l).touchAction !== 'none') R('R-01', 'Ebene hinter Menü/Sprechblase fängt Wischen nicht ab'); });
      // R-02 Kein Fokus-Rahmen beim Öffnen eines Fensters
      if (openDlg && document.activeElement?.id === 'dlgX') R('R-02', 'x hat beim Öffnen den Fokus (blauer Rahmen)');
      document.querySelectorAll('.searchbox input').forEach(e => { if (e === document.activeElement && cs(e).outlineStyle !== 'none') R('R-02', 'Suchfeld mit Fokus-Rahmen'); });
      // R-04 Doppeltippen vergrößert nie
      if ([...document.querySelectorAll('button, a[href], input, textarea, [role=button]')].some(e => vis(e) && !['manipulation', 'none'].includes(cs(e).touchAction))) R('R-04', 'Doppeltippen kann die Ansicht vergrößern');
      // R-05 Leisten bewegen sich nie
      document.querySelectorAll('.nb, .pnav').forEach(b => { if (vis(b) && cs(b).position !== 'fixed') R('R-05', `Leiste .${b.classList[0]} ist ${cs(b).position} statt fest – sie federt mit`); });
      if (cs(document.documentElement).overscrollBehaviorY !== 'none') R('R-05', 'Seite federt am Rand nach');
      const side = document.getElementById('side');
      const scroller = e => { for (let x = e.parentElement; x && x !== document.body; x = x.parentElement) if (/auto|scroll/.test(cs(x).overflowY)) return x; return null; };
      if (side && vis(side)) side.querySelectorAll('.side-head, .bhint').forEach(e => { if (scroller(e)) R('R-05', `.${e.classList[0]} liegt im Scrollbereich der Seitenleiste – federt mit`); });
      // R-06 Bezeichnung und Feld gehören zusammen
      document.querySelectorAll('.dates .dl').forEach(d => { if (vis(d) && !d.parentElement.classList.contains('pair')) R('R-06', 'Bezeichnung nicht mit ihrem Feld verbunden'); });
      // R-08 Gelbe Markierung ohne blauen Rand
      const focus = hex(root.getPropertyValue('--focus'));
      document.querySelectorAll('tr, .box, .irow, .side-row').forEach(e => { if (vis(e) && same(rgb(cs(e).backgroundColor), focus) && /inset/.test(cs(e).boxShadow)) R('R-08', 'gelbe Markierung mit blauem Rand'); });
      // R-09 Titel steht in der Leiste (ohne großen Titel)
      document.querySelectorAll('.pnav-title').forEach(t => { if (vis(t.parentElement) && !document.querySelector('.ltitle') && cs(t).opacity !== '1') R('R-09', 'Titel nicht in der Leiste'); });
      // R-10 Backup-Kachel immer da, sobald es Einträge gibt
      if (side && vis(side) && side.querySelector('.side-row') && !side.querySelector('.bhint')) R('R-10', 'Backup-Kachel fehlt in der Seitenleiste');
      if (document.querySelector('.pnav-head') && document.querySelector('.irow') && !document.querySelector('.bnote')) R('R-10', 'Backup-Kachel fehlt in der Startliste');
      // R-18 Fenster auf dem iPhone bildschirmfüllend
      const dl = document.getElementById('dlg');
      if (phone && dl?.open && Math.abs(dl.getBoundingClientRect().width - innerWidth) > 2) R('R-18', 'Fenster nicht bildschirmfüllend');
      // R-19 Nach oben / Ans Ende in einer senkrechten Kapsel
      document.querySelectorAll('.fab').forEach(f => { if (vis(f) && parseFloat(cs(f).borderTopLeftRadius) < 10) R('R-19', 'Nach oben / Ans Ende nicht in einer Kapsel'); });
      // R-20 Eingabefelder mindestens 16 px (sonst vergrößert iOS beim Antippen)
      document.querySelectorAll('input:not([type=checkbox]):not([type=hidden]):not([type=file]), textarea').forEach(e => { if (vis(e) && parseFloat(cs(e).fontSize) < 16) R('R-20', `Eingabefeld ${e.id ? '#' + e.id : ''} unter 16 px – iOS vergrößert beim Antippen`); });
      // R-21 Anzahl unter dem Titel der Liste
      document.querySelectorAll('.side-head, .pnav-head').forEach(h => { if (vis(h) && !h.querySelector('small')) R('R-21', 'Anzahl unter dem Titel fehlt'); });
      // R-22 Schaltflächen und Suchfelder schweben (außer innerhalb von Kapseln, Menüs, Listen und als Link)
      document.querySelectorAll('button, .searchbox input').forEach(e => {
        if (!vis(e) || !onTop(e) || e.closest('.grp, .navgrp, .cap, .menu, .pop .btns, #side .side-row, .irow, .fab, .smeta, .chips') || e.matches('.link, .mi, .side-row, .irow, .sclear, .fazit-box, [data-day]')) return;
        if (cs(e).boxShadow === 'none') R('R-22', `Schaltfläche ohne Schatten (schwebt nicht): ‚${label(e)}‘`);
      });
      // R-23 Keine englischen Systemtexte
      const ui = [...document.querySelectorAll('button, .pop, dialog[open] .dlg-head, .menu')].filter(vis).map(e => e.textContent).join(' ');
      const en = ui.match(/\b(OK|Close|Cancel|Done|Delete|Share)\b/);
      if (en) R('R-23', `englischer Text ‚${en[1]}‘`);
      // R-25 Tabellen: Trennlinien zwischen allen Spalten (App-Tabellen)
      document.querySelectorAll('#app table td + td').forEach(td => { if (vis(td) && parseFloat(cs(td).borderLeftWidth) === 0) R('R-25', 'Tabelle ohne Trennlinie zwischen Spalten'); });
      // R-26 Datumsfelder so breit wie das Datum
      document.querySelectorAll('input[type=date]').forEach(e => { if (vis(e) && e.getBoundingClientRect().width > 220) R('R-26', `Datumsfeld zu breit (${Math.round(e.getBoundingClientRect().width)} px)`); });
      // R-27 Betragsfelder rechtsbündig
      document.querySelectorAll('input[inputmode=decimal]').forEach(e => { if (vis(e) && !['right', 'end'].includes(cs(e).textAlign)) R('R-27', 'Betragsfeld nicht rechtsbündig'); });
      // R-29 Hängender Einzug
      document.querySelectorAll('#app .ln').forEach(e => { if (vis(e) && cs(e).display !== 'flex') R('R-29', 'Zeile ohne hängenden Einzug'); });
      // R-30 Kasten mit Feldern: Linien waagrecht und senkrecht
      document.querySelectorAll('.box .kv').forEach(kv => {
        if (!vis(kv)) return;
        if (kv.previousElementSibling?.classList.contains('kv') && parseFloat(cs(kv).borderTopWidth) === 0) R('R-30', 'keine waagrechte Linie zwischen den Feldern');
        const k = kv.querySelector('.k'); if (k && parseFloat(cs(k).borderRightWidth) === 0) R('R-30', 'keine senkrechte Linie zwischen Bezeichnung und Inhalt');
      });
      // R-31 Zentrale Liste als Kacheln, höchstens ein Eintrag blau
      document.querySelectorAll('#side .side-row, .ilist.tiles .irow').forEach(e => { if (vis(e) && parseFloat(cs(e).borderTopLeftRadius) < 12) R('R-31', 'Eintrag der Liste ist keine Kachel'); });
      [document.getElementById('side'), document.querySelector('.ilist.tiles')].forEach(l => { if (l && l.querySelectorAll('.current').length > 1) R('R-31', 'mehr als ein Eintrag blau'); });
      // R-32 Aktionen und Suche oben – unten nur feste Hinweise
      document.querySelectorAll('.bbar').forEach(b => { if (!vis(b)) return; if ([...b.querySelectorAll('button')].some(x => !x.closest('.bnote')) || b.querySelector('.searchbox')) R('R-32', 'Aktion oder Suche in der unteren Leiste statt oben in der Kapsel'); });
      // R-33 Darstellung folgt dem Gerät
      try { if (typeof db !== 'undefined' && db.settings?.appearance === 'auto') { const want = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; if (document.documentElement.dataset.theme !== want) R('R-33', 'Darstellung folgt nicht dem Gerät'); } } catch (e) {}
      // R-34 Teilen nur als Icon
      document.querySelectorAll('button').forEach(b => { if (vis(b) && b.querySelector('svg') && /teilen|share/i.test(b.getAttribute('aria-label') || '') && b.textContent.trim()) R('R-34', 'Teilen mit Text'); });
      // R-36 Gleiche Funktion = gleicher Baustein: die Kacheln laufen unter der Backup-Kachel durch (iPad wie iPhone)
      document.querySelectorAll('.side-foot').forEach(f => { const l = f.parentElement.querySelector('.side-list');
        if (vis(f) && l && l.getBoundingClientRect().bottom < f.getBoundingClientRect().bottom - 2) R('R-36', 'Liste endet über der Backup-Kachel (starre Begrenzung statt durchlaufen)'); });
      // R-37 Kein Text ragt über Zelle oder Kachel hinaus – zu lange Wörter brechen im Wort um
      document.querySelectorAll('#app td, #app th, #app dd, #app .box, .box .kv .v, .box .ln, .irow, .side-row, .bhint, .bnote, .msg-text, .pop p, .fazit-box').forEach(e => {
        if (!vis(e) || e.closest('.rt, #printout') || cs(e).textOverflow === 'ellipsis') return;
        const right = e.getBoundingClientRect().right;
        if (e.scrollWidth > e.clientWidth + 1 || [...e.querySelectorAll('*')].some(c => vis(c) && c.getBoundingClientRect().right > right + 1)) R('R-37', `Text ragt über ${e.tagName.toLowerCase()}${e.classList[0] ? '.' + e.classList[0] : ''} hinaus: ‚${label(e)}‘`);
      });
      document.querySelectorAll('#app table').forEach(t => { if (vis(t) && !t.closest('.rt') && t.offsetWidth > t.parentElement.clientWidth + 1 && !/auto|scroll/.test(cs(t.parentElement).overflowX)) R('R-37', `Tabelle breiter als ihr Platz (${t.offsetWidth} statt ${t.parentElement.clientWidth} px)`); });
      if (document.documentElement.scrollWidth > innerWidth + 1) R('R-37', 'Seite breiter als der Bildschirm');
      return res;
    }, skipTargets);
    for (const [k, list] of Object.entries(r)) for (const x of list) note({ target: 'Antippfläche', font: 'Schrift', contrast: 'Kontrast', quotes: 'Anführungszeichen', menu: 'Menü', rules: 'Regel' }[k], x, where);
  }

  // R-36 Gleiche Funktion = gleicher Baustein auf iPad und iPhone: Aufbau (Elemente, Klassen, Scrollbereiche,
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
        if (!a || !b) { note('Regel', `R-36 Baustein ‚${name}‘ fehlt auf ${!a ? d0 : d} – dort eigene Umsetzung statt desselben Bausteins`, `${d0} ↔ ${d}`); continue; }
        const only = (x, y) => x.filter(k => !y.includes(k)).slice(0, 3).join(' · ');
        const ab = only(a, b), ba = only(b, a);
        if (ab || ba) note('Regel', `R-36 Baustein ‚${name}‘ auf ${d0} und ${d} verschieden${ab ? ` – nur ${d0}: ${ab}` : ''}${ba ? ` – nur ${d}: ${ba}` : ''}`, `${d0} ↔ ${d}`);
      }
    }
  };
  const stays = async (p, sel, where) => {
    if (!await p.locator(sel).first().evaluate(e => e.classList.contains('on')).catch(() => false)) note('Markierung', `${sel} bleibt nicht blau`, where);
  };
  const report = () => {
    compareShapes();
    if (!found.size) { console.log('HIG- und Regel-Prüfung: keine Abweichungen.'); return 0; }
    console.log(`HIG- und Regel-Prüfung: ${found.size} Abweichung(en)\n`);
    for (const [k, where] of found) console.log(`- ${k}\n    ${[...where].slice(0, 3).join(' · ')}${where.size > 3 ? ` · +${where.size - 3}` : ''}`);
    return 1;
  };
  return { measure, stays, shape, note, report };
}
