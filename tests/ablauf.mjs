// AppDesign 4.12.0 · Ablauf-Prüfungen für Regeln, die eine Handlung brauchen (Designrichtlinie allgemein, Abschnitt 17):
// R-1.6 Messmodus (seit 4.26.0) · R-4.5 Feld über der Tastatur (seit 4.28.0), Tastatur ohne Springen (seit 4.28.1) · R-2.3 Suche (seit 4.23.0 auch in der zentralen Liste, seit 4.25.0 mehrere Wörter und „…“, seit 4.25.1 Suchfeld bleibt beim Tippen) · APD-91 Suche im Mehr-Menü, x ‚Suche beenden‘, ⌘F (seit 4.43.0; ersetzt APD-22 Lupe am Ende der Kapsel) · R-4.4 Fenster-Kopfzeile · R-4.6 Blatt auf dem iPhone (seit 4.32.0) · R-5.2 Texteingabe · R-5.3 Fehlermeldungen · R-5.5 Eingabetaste (seit 4.19.0) · R-5.6 ⓧ in Feldern (seit 4.29.0) · R-6.4 Ausgabe und Vorschau · R-7.3 Liste steht still (seit 4.18.0) · R-7.4 Position beim Öffnen und R-8.1 Seitenleiste ein/aus (seit 4.21.0) · R-3.2 Kapsel nur mit wirksamen Pfeilen und Schnellroll-Griff, R-7.5 Navigation und Gesten (seit 4.30.0).
// Jede Funktion bekommt eine Playwright-Seite und gibt eine Liste von Fehlern zurück (leer = in Ordnung), je mit Regelnummer.
// Einbinden im Prüfskript der App:  import { checkSearch, checkDialogHead } from '../../AppDesign/tests/ablauf.mjs';
//                                   fehler.push(...await checkSearch(page, { term: 'Sydney' }));
import { ROLL, RING, rolle, rollstand, navFertig, rollRuht } from './pruefe.mjs';
import { safariWischen, safariModell, mausWieFinger } from './safari.mjs';
const wait = (p, ms = 250) => p.waitForTimeout(ms);
// R-2.3 (seit 4.25.1, APD-24): beim Tippen bleibt das Suchfeld dasselbe Element und behält den Fokus – sonst schließt Safari am
// iPhone die Tastatur kurz und Kopf- und Suchzeile zittern bei jedem Buchstaben. Tippt Buchstabe für Buchstabe (und löscht
// wieder, wenn back), meldet den ersten Buchstaben, bei dem das Feld ersetzt wurde oder den Fokus verlor.
async function typeKeeps(p, input, text, E, back = false) {
  await p.evaluate(sel => { window.__feld = document.querySelector(sel); }, input);
  const keeps = () => p.evaluate(sel => document.querySelector(sel) === window.__feld && document.activeElement === window.__feld, input);
  await p.locator(input).focus();
  const keys = [...text].concat(back ? [...text].map(() => 'Backspace') : []);
  for (const [i, k] of keys.entries()) {
    if (k === 'Backspace') await p.keyboard.press(k); else await p.keyboard.type(k);
    await wait(p, 20);
    if (!await keeps()) { E(`beim Tippen (${k === 'Backspace' ? 'Löschen' : `‚${text.slice(0, i + 1)}‘`}) wird das Suchfeld ersetzt oder verliert den Fokus – am iPhone zittern Kopf- und Suchzeile (APD-24)`); return; }
  }
}
const rgbOf = c => (c.match(/[\d.]+/g) || [0, 0, 0]).slice(0, 3).map(Number);

// Seit 4.43.0 (APD-91, R-2.3): die Suche öffnet ‚Suchen‘ als erster Punkt im Mehr-Menü – mehr: der Mehr-Knopf (eine Funktion öffnet
// selbst); beendet wird sie mit dem runden x rechts in der Suchzeile.
export async function sucheAuf(p, mehr = '#mainMore') {
  if (typeof mehr === 'function') return mehr();
  await p.click(mehr); await wait(p, 250);
  await p.locator('.menu:not(.submenu) .mi', { hasText: /^Suchen$/ }).first().click(); await wait(p, 150);
}

// Platz der Suche – seit 4.43.0 (APD-91 S-1 bis S-3, S-12; ersetzt APD-22 ‚Lupe am Ende der Kapsel‘, R-2.3): ‚Suchen‘ mit Lupe als erster
// Punkt im Mehr-Menü, darunter ein Strich; keine eigene Lupe in einer Kapsel. ohne: es gibt keine Einträge – dann kein ‚Suchen‘.
// kapsel: Selektor der Kapseln, in denen keine Lupe stehen darf (Voreinstellung alle).
export async function checkSearchPlace(p, { mehr = '#mainMore', kapsel = null, ohne = false, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 ${t}`);
  const lupe = await p.evaluate(k => [...document.querySelectorAll(k || '.grp')].flatMap(g => [...g.querySelectorAll('button')])
    .filter(b => b.getClientRects().length && /^Suche/.test(b.getAttribute('aria-label') || '')).length, kapsel);
  if (lupe) E(`APD-91/S-3: eigene Lupe in der Kapsel (${lupe}) – die Suche steht im Mehr-Menü`);
  await p.click(mehr); await wait(p, 250);
  const m = await p.evaluate(() => {
    const menu = document.querySelector('.menu:not(.submenu)'), first = menu?.firstElementChild;
    return menu && { items: [...menu.querySelectorAll('.mi')].map(b => b.textContent.trim()), first: first?.textContent.trim() ?? null,
      icon: !!first?.querySelector('svg'), danach: first?.nextElementSibling?.className || '', suchen: [...menu.querySelectorAll('.mi')].filter(b => b.textContent.trim() === 'Suchen').length };
  });
  if (!m) { E('Mehr-Menü öffnet sich nicht'); return errors; }
  if (ohne) { if (m.suchen) E('APD-91/S-12: ohne Einträge steht ‚Suchen‘ im Menü'); }
  else {
    if (m.first !== 'Suchen' || !m.icon) E(`APD-91/S-1: erster Punkt ist nicht ‚Suchen‘ mit Lupe (${m.first ?? 'nichts'})`);
    if (m.danach !== 'line') E(`APD-91/S-1: unter ‚Suchen‘ kein Strich (${m.danach || 'nichts'})`);
    if (m.suchen !== 1) E(`APD-91: ‚Suchen‘ ${m.suchen}-mal im Menü`);
  }
  await p.keyboard.press('Escape'); await wait(p, 150);
  return errors;
}

// APD-91 S-4 bis S-6, S-15, S-18 (R-2.3): ‚Suchen‘ im Menü schließt das Menü und öffnet die Suchzeile mit dem Cursor im Feld; bei offener
// Suche bleibt der Mehr-Knopf normal (waagrecht, nicht hervorgehoben); das runde x ‚Suche beenden‘ rechts in der Suchzeile schließt sie –
// Filter und Markierung weg, der Inhalt (scroll: Rollbereich bzw. Liste) steht ganz oben. term: ein Begriff mit Treffern.
export async function checkSucheBeenden(p, { mehr = '#mainMore', input = '#search', close = '#sclose', row = '#app .nb2', item = '#app [data-day]',
  scroll = null, term, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 ${t}`);
  const lage = () => p.evaluate(({ mehr, input, close, row, item, scroll, R }) => {
    const b = document.querySelector(mehr), c = b ? [...b.querySelectorAll(':scope > svg circle')] : [], ys = new Set(c.map(k => k.getAttribute('cy')));
    const x = document.querySelector(close), xr = x?.getBoundingClientRect(), rr = document.querySelector(row)?.getBoundingClientRect();
    const sc = scroll ? document.querySelector(scroll)?.scrollTop ?? 0 : eval(R).y;
    return { menue: !!document.querySelector('.menu'), feld: !!document.querySelector(input), fokus: document.activeElement === document.querySelector(input),
      wert: document.querySelector(input)?.value ?? null, mehrOn: !!b?.classList.contains('on'), waagrecht: c.length === 3 && ys.size === 1,
      x: !!x, xName: x?.getAttribute('aria-label') || '', xRechts: xr && rr ? rr.right - xr.right < 2 && xr.left > rr.left + rr.width / 2 : false,
      marks: document.querySelectorAll(`${item} mark`).length, items: [...document.querySelectorAll(item)].filter(e => e.getClientRects().length).length, y: Math.round(sc) };
  }, { mehr, input, close, row, item, scroll, R: ROLL });
  const alle = (await lage()).items;
  await sucheAuf(p, mehr);
  let l = await lage();
  if (l.menue) E('APD-91/S-4: ‚Suchen‘ schließt das Menü nicht');
  if (!l.feld) { E('APD-91/S-4: ‚Suchen‘ im Menü öffnet keine Suchzeile'); return errors; }
  if (!l.fokus) E('APD-91/S-4: nach ‚Suchen‘ steht der Cursor nicht im Suchfeld');
  if (l.mehrOn || !l.waagrecht) E(`APD-91/S-18: bei offener Suche ist der Mehr-Knopf ${l.mehrOn ? 'hervorgehoben' : 'nicht waagrecht'} – nur bei offenem Menü`);
  if (!l.x || l.xName !== 'Suche beenden') E(`APD-91/S-15: x ‚Suche beenden‘ fehlt (${l.x ? `heißt ‚${l.xName}‘` : 'kein Knopf'})`);
  else if (!l.xRechts) E('APD-91/S-6: x ‚Suche beenden‘ steht nicht rechts in der Suchzeile');
  await p.locator(input).fill(term); await p.locator(input).dispatchEvent('input'); await wait(p, 900);
  l = await lage();
  if (!l.marks && item.startsWith('#app')) E(`Vorbereitung: ‚${term}‘ markiert nichts`);
  await p.click(close); await wait(p, 350);
  l = await lage();
  if (l.feld) E('APD-91/S-6: x ‚Suche beenden‘ schließt die Suchzeile nicht');
  if (l.marks) E(`APD-91/S-6: nach ‚Suche beenden‘ noch ${l.marks} Markierungen`);
  if (l.items !== alle) E(`APD-91/S-6: nach ‚Suche beenden‘ ${l.items} statt ${alle} Einträge – Filter nicht weg`);
  if (l.y !== 0) E(`APD-91/S-6: nach ‚Suche beenden‘ steht der Inhalt nicht ganz oben (${l.y} px)`);
  return errors;
}

// APD-91 S-8 bis S-11 (R-4.7): ⌘F öffnet die Suche (input: das Feld, das kommen soll) mit dem Cursor im Feld; bei offener Suche setzt ⌘F nur
// den Cursor ins Feld, der Begriff bleibt; bei offenem Menü (mehr) wirkt ⌘F nicht. close: beendet die Suche.
export async function checkCmdF(p, { input = '#search', close = '#sclose', mehr = '#mainMore', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-4.7 ${t}`);
  const lage = () => p.evaluate(input => ({ feld: !!document.querySelector(input)?.getClientRects().length, fokus: document.activeElement === document.querySelector(input),
    wert: document.querySelector(input)?.value ?? null, menue: !!document.querySelector('.menu') }), input);
  if ((await lage()).feld) { await p.click(close); await wait(p, 250); }
  await p.keyboard.press('Meta+f'); await wait(p, 300);
  let l = await lage();
  if (!l.feld) { E(`APD-91/S-8: ⌘F öffnet die Suche nicht (${input})`); return errors; }
  if (!l.fokus) E('APD-91/S-8: nach ⌘F steht der Cursor nicht im Suchfeld');
  await p.locator(input).pressSequentially('ab', { delay: 20 }); await wait(p, 200);
  await p.evaluate(() => document.activeElement?.blur()); await wait(p, 100);
  await p.keyboard.press('Meta+f'); await wait(p, 250);
  l = await lage();
  if (!l.feld || l.wert !== 'ab') E(`APD-91/S-10: ⌘F bei offener Suche ändert den Begriff (‚${l.wert}‘ statt ‚ab‘)`);
  if (!l.fokus) E('APD-91/S-10: ⌘F bei offener Suche setzt den Cursor nicht ins Feld');
  await p.click(close); await wait(p, 300);
  await p.click(mehr); await wait(p, 250);
  await p.keyboard.press('Meta+f'); await wait(p, 250);
  l = await lage();
  if (!l.menue) E('APD-91/S-11: ⌘F schließt das offene Menü');
  if (l.feld) E('APD-91/S-11: ⌘F öffnet bei offenem Menü die Suche');
  await p.keyboard.press('Escape'); await wait(p, 200);
  if ((await lage()).feld) { await p.click(close); await wait(p, 250); }
  return errors;
}

// R-2.3 Suche: Suchzeile unter der Leiste über die volle Breite; Treffer ‚3 von 57‘ bzw. ‚0‘; nach kurzer Pause steht der
// Treffer direkt unter der Suchzeile; Pfeile ohne Umlauf; nur Einträge mit Treffern. term: ein Begriff, der weit unten steht.
export async function checkSearch(p, { term, open = '#mainMore', close = '#sclose', input = '#search', count = '#scount', prev = '#sprev', next = '#snext',
  bar = '#bar', row = '.nb2', item = '#app [data-day]', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 ${t}`);
  await rolle(p, 0);
  await sucheAuf(p, open); await wait(p);
  await typeKeeps(p, input, term, E); await wait(p, 900);
  const state = () => p.evaluate(({ count, bar, row, item }) => {
    const c = document.querySelector(count)?.textContent.trim() || '';
    const edge = Math.max(...[bar, row].map(s => document.querySelector(s)?.getBoundingClientRect().bottom || 0));
    const hit = document.querySelector('mark.cur');
    const items = [...document.querySelectorAll(item)].filter(e => e.getClientRects().length);
    const r = document.querySelector(row)?.getBoundingClientRect(), b = document.querySelector(bar)?.getBoundingClientRect();
    return { c, edge, top: hit ? hit.getBoundingClientRect().top : null, empty: items.filter(e => !e.querySelector('mark')).length,
      rowW: r ? Math.round(r.width) : 0, barW: b ? Math.round(document.querySelector(bar).clientWidth - parseFloat(getComputedStyle(document.querySelector(bar)).paddingLeft) - parseFloat(getComputedStyle(document.querySelector(bar)).paddingRight)) : 0, rowBelow: r && b ? r.top >= b.top - 1 : false };
  }, { count, bar, row, item });
  const s = await state();
  const m = s.c.match(/^(\d+) von (\d+)$/);
  if (!m) E(`Trefferanzeige ‚${s.c}‘ statt ‚1 von n‘`);
  if (!s.rowBelow || s.rowW < s.barW - 2) E(`Suchzeile nicht unter der Leiste über die volle Breite (${s.rowW} von ${s.barW} px)`);
  if (s.top === null) E('kein aktueller Treffer markiert');
  else if (s.top < s.edge - 1 || s.top > s.edge + 120) E(`Treffer steht nach der Pause nicht direkt unter der Suchzeile (${Math.round(s.top)} px, Suchzeile endet bei ${Math.round(s.edge)} px)`);
  if (s.empty) E(`${s.empty} Einträge ohne Treffer werden gezeigt – die Liste ist nicht gefiltert`);
  const press = sel => p.locator(sel).evaluate(b => b.click());
  if (m && +m[2] >= 2) {
    const n = +m[2];
    await press(prev); await wait(p, 150);
    if ((await state()).c !== `1 von ${n}`) E('Pfeil nach oben beim ersten Treffer springt um (Umlauf)');
    for (let i = 1; i < n; i++) { await press(next); await wait(p, 60); }
    await press(next); await wait(p, 150);
    if ((await state()).c !== `${n} von ${n}`) E(`Pfeil nach unten beim letzten Treffer springt um (Umlauf) – ‚${(await state()).c}‘`);
  }
  await p.locator(input).fill(''); await typeKeeps(p, input, 'zqxzqx', E, true); await typeKeeps(p, input, 'zqxzqx', E); await wait(p, 700);
  const z = await state();
  if (z.c !== '0') E(`ohne Treffer ‚${z.c}‘ statt ‚0‘`);
  await p.click(close); await wait(p);
  return errors;
}

// R-2.3 Suche in der zentralen Liste (seit 4.23.0, APD-19; seit 4.43.0 ‚Suchen‘ im Mehr-Menü der Liste, APD-91): öffnet die Suchzeile; beim Tippen
// bleiben nur Einträge mit Treffer, jede Kachel zeigt ‚N Treffer‘ (je Fundstelle); Antippen öffnet den Eintrag mit gefüllter
// Suche ‚1 von N‘ (gleiches N); sind beide Suchfelder offen, laufen sie 1:1 mit; zurück bleibt die Liste gefiltert; x zeigt
// wieder alle; ohne Treffer ‚Keine Treffer‘; x ‚Suche beenden‘ schließt sie. term: kommt in einigen, nicht allen Einträgen vor. back(): zurück zur Liste
// (iPhone-Aufbau), sonst ist die Liste neben dem Eintrag sichtbar.
export async function checkListSearch(p, { term, open = '#sideMore', close = '#lsclose', input = '#lsearch', clear = '#lsclear', row = '#side .side-row',
  hits = 'small.hits', inner = '#search', innerCount = '#scount', back = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 Liste: ${t}`);
  const list = () => p.evaluate(({ row, hits, input }) => ({ value: document.querySelector(input)?.value ?? null,
    focus: document.activeElement?.id || '', rows: [...document.querySelectorAll(row)].filter(e => e.getClientRects().length)
      .map(e => ({ hits: e.querySelector(hits)?.textContent.trim() || '' })),
    empty: /Keine Treffer/.test(document.querySelector('#side')?.textContent || '') }), { row, hits, input });
  const all = (await list()).rows.length;
  await sucheAuf(p, open); await wait(p);
  let l = await list();
  if (l.value === null) E('‚Suchen‘ öffnet keine Suchzeile');
  else if (l.focus !== input.replace('#', '')) E('Suchzeile hat nach ‚Suchen‘ keinen Fokus');
  await typeKeeps(p, input, term, E); await wait(p, 400);
  l = await list();
  if (!l.rows.length) E(`‚${term}‘ findet keinen Eintrag`);
  else if (l.rows.length >= all) E(`nicht gefiltert – ${l.rows.length} von ${all} Einträgen sichtbar`);
  const bad = l.rows.filter(r => !/^\d+ Treffer$/.test(r.hits));
  if (bad.length) E(`${bad.length} Kacheln ohne ‚N Treffer‘ (${bad.map(r => r.hits || 'leer').join(', ')})`);
  const n = +(l.rows[0]?.hits.match(/^\d+/)?.[0] || 0);
  await p.locator(row).first().click(); await wait(p, 800);
  const inside = await p.evaluate(({ inner, innerCount }) => ({ v: document.querySelector(inner)?.value ?? null,
    c: document.querySelector(innerCount)?.textContent.trim() || '' }), { inner, innerCount });
  if (inside.v !== term) E(`Eintrag öffnet ohne den Begriff (Suchfeld ‚${inside.v ?? 'zu'}‘)`);
  else if (inside.c !== `1 von ${n}`) E(`Zählung weicht ab: Kachel ‚${n} Treffer‘, im Eintrag ‚${inside.c}‘`);
  if (!back) {
    // Beide Suchfelder offen: Eingaben laufen 1:1 in das andere Feld (beide Richtungen, auch x).
    await p.locator(input).focus(); await p.keyboard.press('End'); await p.keyboard.type('x', { delay: 20 }); await wait(p, 300);
    if (await p.inputValue(inner) !== term + 'x') E('Eingabe in der Liste kommt nicht 1:1 im Suchfeld des Eintrags an');
    if (await p.evaluate(() => document.activeElement?.id) !== input.replace('#', '')) E('Fokus springt beim Tippen aus dem Suchfeld der Liste');
    await p.locator(inner).focus(); await p.keyboard.press('End'); await p.keyboard.press('Backspace'); await wait(p, 300);
    if (await p.inputValue(input) !== term) E('Eingabe im Eintrag kommt nicht 1:1 im Suchfeld der Liste an');
  } else {
    await back(); await wait(p, 400);
    l = await list();
    if (l.value !== term || !l.rows.length || l.rows.length >= all) E('zurück in der Liste ist der Filter weg');
  }
  await p.click(clear); await wait(p, 300);
  l = await list();
  if (l.rows.length !== all || l.rows.some(r => r.hits)) E('x zeigt nicht wieder alle Einträge ohne Trefferzahl');
  if (!back && await p.inputValue(inner) !== '') E('x in der Liste leert das offene Suchfeld des Eintrags nicht');
  await p.locator(input).pressSequentially('zqxzqx', { delay: 10 }); await wait(p, 300);
  l = await list();
  if (l.rows.length || !l.empty) E('ohne Treffer nicht ‚Keine Treffer‘');
  await p.click(close); await wait(p);
  l = await list();
  if (l.value !== null || l.rows.length !== all) E('x ‚Suche beenden‘ schließt die Suchzeile nicht bzw. zeigt nicht wieder alle Einträge');
  return errors;
}

// R-4.4 Fenster-Kopfzeile: x links, Häkchen rechts – grau, nach einer Änderung blau; x ohne Änderung schließt sofort,
// x mit Änderungen fragt ‚Änderungen verwerfen‘ / ‚Weiter bearbeiten‘. open(): öffnet das Fenster, change(): ändert ein Feld.
export async function checkDialogHead(p, { open, change, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-4.4 ${t}`);
  const head = () => p.evaluate(() => { const d = document.getElementById('dlg'), x = d.querySelector('#dlgX'), ok = d.querySelector('#dlgOk');
    const h = d.querySelector('.dlg-head').getBoundingClientRect(), xr = x?.getBoundingClientRect(), or = ok?.getBoundingClientRect();
    return { open: d.open, x: !!x, ok: !!ok, blue: !!ok?.classList.contains('primary'),
      xLeft: xr ? xr.left - h.left < h.width / 3 : false, okRight: or ? h.right - or.right < h.width / 3 : false }; });
  await open(); await wait(p, 350); await navFertig(p);   // seit 4.32.0: bis das Blatt ruht (R-4.6)
  let h = await head();
  if (!h.x || !h.xLeft) E('x steht nicht links in der Kopfzeile');
  if (!h.ok || !h.okRight) E('Häkchen steht nicht rechts in der Kopfzeile');
  if (h.blue) E('Häkchen ist vor einer Änderung schon blau');
  await p.click('#dlgX'); await wait(p);
  if (await p.locator('.pop').count()) { E('x ohne Änderung fragt nach'); await p.locator('.pop button').last().click(); await wait(p); }
  if ((await head()).open) { E('x ohne Änderung schließt das Fenster nicht'); await p.evaluate(() => document.getElementById('dlg').close()); }
  await open(); await wait(p, 350); await navFertig(p);
  await change(); await wait(p);
  if (!(await head()).blue) E('Häkchen wird nach einer Änderung nicht blau');
  await p.click('#dlgX'); await wait(p);
  const pop = await p.locator('.pop button').allTextContents();
  if (!pop.some(t => /Änderungen verwerfen/.test(t)) || !pop.some(t => /Weiter bearbeiten/.test(t))) E(`x mit Änderungen fragt nicht ‚Änderungen verwerfen‘ / ‚Weiter bearbeiten‘ (${pop.join(' · ') || 'keine Abfrage'})`);
  if (pop.length) {
    await p.locator('.pop button', { hasText: 'Weiter bearbeiten' }).click(); await wait(p);
    if (!(await head()).open) E('‚Weiter bearbeiten‘ schließt das Fenster');
    else { await p.click('#dlgX'); await wait(p); await p.locator('.pop button', { hasText: 'Änderungen verwerfen' }).click(); await wait(p);
      if ((await head()).open) E('‚Änderungen verwerfen‘ schließt das Fenster nicht'); }
  }
  if ((await head()).open) await p.evaluate(() => document.getElementById('dlg').close());
  return errors;
}

// R-5.3 Fehlermeldungen: beim Öffnen keine Meldung, Pflichtfelder nicht gekennzeichnet; nach einer Eingabe (Feld geleert)
// steht die Meldung rot direkt unter dem Feld und das Feld ist rot umrandet. field: ein Pflichtfeld des Fensters.
export async function checkFieldErrors(p, { open, field, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-5.3 ${t}`);
  await open(); await wait(p, 350);
  const first = await p.evaluate(() => { const d = document.getElementById('dlg');
    return { shown: [...d.querySelectorAll('.warn')].filter(w => !w.hidden && w.getClientRects().length && w.textContent.trim()).length,
      marked: [...d.querySelectorAll('label, .lbl, .dl, h4, .k')].map(l => l.textContent).filter(t => /\*|\(Pflicht|Pflichtfeld/.test(t)) }; });
  if (first.shown) E(`${first.shown} Fehlermeldung(en) schon beim Öffnen, vor jeder Eingabe`);
  if (first.marked.length) E(`Pflichtfeld gekennzeichnet: ‚${first.marked[0].trim().slice(0, 30)}‘`);
  await p.locator(field).fill('x'); await p.locator(field).fill(''); await p.locator(field).blur(); await wait(p);
  const r = await p.evaluate(sel => { const f = document.querySelector(sel), d = document.getElementById('dlg');
    const danger = getComputedStyle(document.documentElement).getPropertyValue('--danger').trim();
    const w = [...d.querySelectorAll('.warn')].find(x => !x.hidden && x.getClientRects().length && x.textContent.trim());
    const tmp = document.createElement('i'); tmp.style.color = danger; document.body.append(tmp); const red = getComputedStyle(tmp).color; tmp.remove();
    if (!w) return { none: true };
    const fr = f.getBoundingClientRect(), wr = w.getBoundingClientRect();
    return { below: wr.top >= fr.bottom - 1 && wr.top - fr.bottom < 60, color: getComputedStyle(w).color, red, border: getComputedStyle(f).borderTopColor };
  }, field);
  if (r.none) E('nach dem Leeren des Feldes keine Fehlermeldung');
  else {
    if (!r.below) E('Fehlermeldung steht nicht direkt unter dem Feld');
    const same = (a, b) => rgbOf(a).every((v, i) => Math.abs(v - rgbOf(b)[i]) < 3);
    if (!same(r.color, r.red)) E(`Fehlermeldung nicht rot (${r.color})`);
    if (!same(r.border, r.red)) E(`Feld nicht rot umrandet (${r.border})`);
    // seit 4.35.0 (APD-43 V10, Baustein feldFehler): auch hörbar – aria-invalid, Meldung verknüpft (aria-describedby), einmal angesagt;
    // beim Häkchen hat das erste fehlerhafte Feld den Fokus
    await wait(p, 300);
    const a = await p.evaluate(sel => { const f = document.querySelector(sel), d = document.getElementById('dlg');
      const w = [...d.querySelectorAll('.warn')].find(x => !x.hidden && x.textContent.trim());
      return { invalid: f.getAttribute('aria-invalid'), verknuepft: !!w?.id && (f.getAttribute('aria-describedby') || '').split(/\s+/).includes(w.id),
        text: w?.textContent.trim(), ansage: d.querySelector(':scope > .ansage')?.textContent.trim() || '' }; }, field);
    if (a.invalid !== 'true') E('fehlerhaftes Feld ohne aria-invalid="true" (VoiceOver: ‚ungültig‘)');
    if (!a.verknuepft) E('Fehlermeldung nicht mit dem Feld verknüpft (aria-describedby)');
    if (a.ansage !== a.text) E(`Fehlermeldung nicht angesagt (Ansage-Bereich: ‚${a.ansage}‘)`);
    if (await p.locator('#dlgOk').count()) {
      await p.locator(field).blur(); await p.click('#dlgOk'); await wait(p, 600);
      const fokus = await p.evaluate(sel => document.activeElement === document.querySelector(sel), field);
      if (!fokus) E('Häkchen mit Fehler: das fehlerhafte Feld hat nicht den Fokus');
    }
  }
  await p.evaluate(() => document.getElementById('dlg').close()); await wait(p);
  return errors;
}

// R-5.2 Texteingabe: Großbuchstabe am Zeilenanfang und nach . ! ?; kein eigener Knopf zum Diktieren.
export async function checkCapital(p, { open, field, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-5.2 ${t}`);
  await open(); await wait(p, 350);
  await p.locator(field).fill(''); await p.locator(field).focus();
  await p.keyboard.type('hallo welt. neu'); await p.keyboard.press('Enter'); await p.keyboard.type('zweite');
  const v = await p.locator(field).inputValue();
  if (v !== 'Hallo welt. Neu\nZweite') E(`Großbuchstaben fehlen: ‚${v.replace(/\n/g, '⏎')}‘ statt ‚Hallo welt. Neu⏎Zweite‘`);
  // seit 4.31.0 (APD-65): einen Großbuchstaben von Hand ersetzen (markieren und überschreiben) bzw. löschen und klein neu tippen –
  // er bleibt klein (wie iOS); danach schreibt die App am nächsten Zeilenanfang wieder groß
  const setze = (a, b = a) => p.locator(field).evaluate((f, [a, b]) => f.setSelectionRange(a, b), [a, b]);
  await setze(0, 1); await p.keyboard.type('h');
  await setze(13); await p.keyboard.press('Backspace'); await p.keyboard.type('n');
  await p.locator(field).evaluate(f => f.setSelectionRange(f.value.length, f.value.length)); await p.keyboard.press('Enter'); await p.keyboard.type('dritte');
  const v2 = await p.locator(field).inputValue();
  if (v2 !== 'hallo welt. neu\nZweite\nDritte') E(`Großbuchstabe von Hand ersetzt bzw. gelöscht und klein getippt: ‚${v2.replace(/\n/g, '⏎')}‘ statt ‚hallo welt. neu⏎Zweite⏎Dritte‘ (APD-65)`);
  if (await p.evaluate(() => [...document.querySelectorAll('#dlg button')].some(b => /diktier|mikrofon/i.test(b.getAttribute('aria-label') + b.textContent)))) E('eigener Knopf zum Diktieren');
  await p.evaluate(() => document.getElementById('dlg').close()); await wait(p);
  return errors;
}

// R-5.2 doppelte Leerzeichen (seit 4.31.0, APD-64): in allen Textfeldern (ein- und mehrzeilig, auch im Suchfeld) wird ein Leerzeichen
// direkt neben einem Leerzeichen nicht eingefügt; beim Einfügen werden mehrere Leerzeichen oder Tabs zu einem, Zeilenumbrüche bleiben;
// ein einzelnes Leerzeichen am Zeilenanfang bleibt. open(): öffnet das Fenster mit field (mehrzeilig); search: ein Suchfeld (optional,
// wird mit openSearch() geöffnet).
export async function checkSpaces(p, { open, field, search = '', openSearch = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-5.2 ${t}`);
  const einfuegen = (sel, text) => p.locator(sel).evaluate((f, t) => { const d = new DataTransfer(); d.setData('text/plain', t);
    f.dispatchEvent(new ClipboardEvent('paste', { clipboardData: d, bubbles: true, cancelable: true })); }, text);
  await open(); await wait(p, 350);
  await p.locator(field).fill(''); await p.locator(field).focus();
  await p.keyboard.type('Eins  zwei'); await p.keyboard.press('Enter'); await p.keyboard.type(' drei   vier');
  await p.locator(field).evaluate(f => f.setSelectionRange(4, 4)); await p.keyboard.type(' ');
  await p.locator(field).evaluate(f => f.setSelectionRange(f.value.length, f.value.length));
  await einfuegen(field, ' fünf  \t sechs\nsieben');
  const v = await p.locator(field).inputValue(), soll = 'Eins zwei\n Drei vier fünf sechs\nsieben';
  if (v !== soll) E(`doppelte Leerzeichen: ‚${v.replace(/\n/g, '⏎').replace(/\t/g, '⇥')}‘ statt ‚${soll.replace(/\n/g, '⏎')}‘ (APD-64)`);
  await p.evaluate(() => document.getElementById('dlg').close()); await wait(p);
  if (search) {
    if (openSearch) { await openSearch(); await wait(p, 300); }
    await p.locator(search).fill(''); await p.locator(search).focus();
    await p.keyboard.type('a  b'); await einfuegen(search, '  c');
    const s = await p.locator(search).inputValue();
    if (s !== 'a b c') E(`Suchfeld: ‚${s}‘ statt ‚a b c‘ (APD-64)`);
    await p.locator(search).fill(''); await p.evaluate(() => document.activeElement?.blur?.()); await wait(p);
  }
  return errors;
}

// R-5.5 Eingabetaste (seit 4.19.0, APD-14): einzeilige Felder zeigen ‚Fertig‘ (enterkeyhint="done", Suchfeld ‚Suchen‘); die
// Eingabetaste schließt die Tastatur (Feld verliert den Fokus), ein offenes Fenster bleibt offen; mehrzeilige Felder machen
// einen Zeilenumbruch und behalten den Fokus. open(): öffnet Fenster bzw. Ansicht (optional); fields: [{ sel, text }];
// multi: ein mehrzeiliges Feld (optional). Geprüft werden außerdem alle sichtbaren einzeiligen Felder auf ‚Fertig‘.
export async function checkEnterDone(p, { open, fields = [], multi = '', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-5.5 ${t}`);
  if (open) { await open(); await wait(p, 350); }
  const dlgOpen = () => p.evaluate(() => !!document.getElementById('dlg')?.open);
  const wasOpen = await dlgOpen();
  for (const f of await p.evaluate(() => [...document.querySelectorAll('input')].filter(f => f.getClientRects().length).flatMap(f => {
    const want = f.type === 'search' ? 'search' : ['text', 'number', 'email', 'tel', 'url', 'password'].includes(f.type) ? 'done' : '';
    const has = f.getAttribute('enterkeyhint') || '';
    return want && has !== want ? [`${f.id ? '#' + f.id : f.type}: Eingabetaste ‚${has || 'Return'}‘ statt ‚${want}‘`] : [];
  }))) E(f);
  for (const { sel, text } of fields) {
    await p.locator(sel).focus(); await p.keyboard.type(text); await p.keyboard.press('Enter'); await wait(p, 150);
    if (await p.locator(sel).evaluate(f => document.activeElement === f)) E(`${sel}: Eingabetaste schließt die Tastatur nicht (Feld behält den Fokus)`);
    if (wasOpen && !await dlgOpen()) { E(`${sel}: Eingabetaste schließt das Fenster (Formular abgeschickt)`); return errors; }
  }
  if (multi) {
    await p.locator(multi).fill(''); await p.locator(multi).focus();
    await p.keyboard.type('eins'); await p.keyboard.press('Enter'); await p.keyboard.type('zwei'); await wait(p, 100);
    const r = await p.locator(multi).evaluate(f => ({ v: f.value, fokus: document.activeElement === f }));
    if (!r.v.includes('\n') || !r.fokus) E(`${multi}: Eingabetaste macht keinen Zeilenumbruch (‚${r.v.replace(/\n/g, '⏎')}‘${r.fokus ? '' : ', Fokus weg'})`);
  }
  if (wasOpen) { await p.evaluate(() => document.getElementById('dlg').close()); await wait(p); }
  return errors;
}

// R-5.6 ⓧ in Textfeldern (seit 4.29.0, APD-63 C3, Testfall-Liste arbeit/APD-63 Testfall-Liste.md APD-63/X-1 bis APD-63/X-8): open() öffnet Fenster
// bzw. Ansicht (optional); fields: [{ sel, text, warn }] – warn: Pflichtfeld, nach dem Leeren mit ⓧ steht die Fehlermeldung (APD-63/X-4).
// Geprüft: leer bzw. ohne Fokus kein ⓧ; mit Text rechts im Feld, 44 × 44, Text läuft nicht darunter; Antippen leert, Fokus bleibt,
// die App bekommt ein input-Ereignis; das ⓧ rollt mit (APD-63/X-7) und bleibt nach dem Drehen am Feld (APD-63/X-8).
// Seit 4.41.0 (APD-81, Testfall-Liste arbeit/APD-81 Testfall-Liste.md APD-81/C1 bis C16): auch mehrzeilige Felder (textarea) – ⓧ mittig
// auf der ersten Zeile (C1), auch wenn das Feld wächst (C9); eine Zeile leert sofort (C2), mehr als eine erst nach der Sprechblase
// ‚Text löschen?‘ mit ‚Löschen‘ (rot) und ‚Abbrechen‘ (C3–C5), Fokus bleibt im Feld; Rückgängig (Bearbeiten-Befehl ‚undo‘ wie die
// Undo-Taste, M-2) holt den ganzen Text zurück, input ‚historyUndo‘ (C6, einzeilig C7); in WebKit nach dem Leeren getippt mit einem
// Schritt (C8, M-4). Grau wie im Suchfeld (C12), nicht fokussierbar mit Bezeichnung ‚Eingabe löschen‘ (C15). ohne: Felder ohne ⓧ (C14).
export async function checkClear(p, { open, fields = [], ohne = [], where = '' } = {}) {
  const errors = [], E = (sel, t) => errors.push(`${where ? where + ': ' : ''}R-5.6 ${sel}: ${t}`);
  const webkit = p.context().browser()?.browserType().name() === 'webkit';
  if (open) { await open(); await wait(p, 350); }
  const lage = sel => p.evaluate(sel => {
    const f = document.querySelector(sel), x = [...document.querySelectorAll('.fclear')].find(b => b.getClientRects().length && getComputedStyle(b).visibility !== 'hidden');
    if (!x) return { x: false, fokus: document.activeElement === f, wert: f.value };
    const fr = f.getBoundingClientRect(), xr = x.getBoundingClientRect(), cs = getComputedStyle(f);
    // mehrzeilig: Mitte der ersten Zeile (Rand + Innenabstand oben + halbe Zeilenhöhe)
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    const soll = f.tagName === 'TEXTAREA' ? fr.top + parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop) + lh / 2 : (fr.top + fr.bottom) / 2;
    // grau wie das ⓧ im Suchfeld (15.2, mit ‚Kontrast erhöhen‘ --muted, R-1.9)
    const m = document.createElement('div'); m.className = 'searchbox'; m.style.cssText = 'position:absolute;visibility:hidden'; m.innerHTML = '<button class="sclear"></button>';
    document.body.append(m); const grau = getComputedStyle(m.firstChild).color; m.remove();
    return { x: true, fokus: document.activeElement === f, wert: f.value, w: Math.round(xr.width), h: Math.round(xr.height), rechts: Math.round(fr.right - xr.right),
      mitte: Math.round((xr.top + xr.bottom) / 2 - soll), platz: parseFloat(cs.paddingRight), farbe: getComputedStyle(x).color, grau,
      tab: x.tabIndex, name: x.getAttribute('aria-label') };
  }, sel);
  const amFeld = (sel, l, wann, mehr) => {
    if (!l.x) { E(sel, `kein ⓧ ${wann}`); return; }
    if (l.w < 44 || l.h < 44) E(sel, `ⓧ ${wann}: Antippfläche ${l.w} × ${l.h} statt 44 × 44`);
    if (Math.abs(l.rechts) > 2 || Math.abs(l.mitte) > 2) E(sel, `ⓧ ${wann} nicht rechts ${mehr ? 'auf Höhe der ersten Zeile (APD-81/C1)' : 'im Feld'} (Abstand rechts ${l.rechts} px, senkrecht ${l.mitte} px versetzt)`);
    if (l.platz < 32) E(sel, `ⓧ ${wann}: Text läuft unter das ⓧ (Abstand rechts ${l.platz} px)`);
    if (l.farbe !== l.grau) E(sel, `ⓧ ${wann}: Farbe ${l.farbe} statt ${l.grau} wie im Suchfeld (APD-81/C12)`);
    if (l.tab !== -1 || l.name !== 'Eingabe löschen') E(sel, `ⓧ ${wann}: fokussierbar (tabIndex ${l.tab}) oder Bezeichnung ‚${l.name}‘ statt ‚Eingabe löschen‘ (APD-81/C15)`);
  };
  const tippeX = async sel => {
    const ziel = await p.evaluate(() => { const r = document.querySelector('.fclear')?.getBoundingClientRect(); return r && r.width ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null; });
    if (!ziel || ziel.y < 0 || ziel.y > p.viewportSize().height) { E(sel, `ⓧ nicht zu sehen (${JSON.stringify(ziel)}) (APD-63/X-2)`); return false; }
    await p.mouse.click(ziel.x, ziel.y); await wait(p, 150); return true;
  };
  const blase = () => p.evaluate(() => {
    const b = [...document.querySelectorAll('.pop')].find(x => x.getClientRects().length); if (!b) return null;
    const r = b.getBoundingClientRect(), vv = window.visualViewport;
    return { text: b.querySelector('p')?.textContent.trim(), knoepfe: [...b.querySelectorAll('button')].map(k => k.textContent.trim() + (k.classList.contains('danger') ? ' (rot)' : '')),
      ganz: r.left >= -1 && r.top >= -1 && r.right <= (vv?.width ?? innerWidth) + 1 && r.bottom <= (vv?.height ?? innerHeight) + 1 };
  });
  const knopf = async t => { await p.locator('.pop button', { hasText: t }).click(); await wait(p, 200); };
  // Rückgängig wie die Undo-Taste (am Gerät gemessen gleich, APD-81/M-2); meldet die Art der input-Ereignisse
  const undo = (sel, n = 1) => p.evaluate(({ sel, n }) => { const f = document.querySelector(sel), arten = [], h = e => arten.push(e.inputType);
    f.addEventListener('input', h); for (let i = 0; i < n; i++) document.execCommand('undo'); f.removeEventListener('input', h); return { wert: f.value, arten, fokus: document.activeElement === f }; }, { sel, n });
  const pruefeUndo = async (sel, vorher, nr) => {
    const u = await undo(sel);
    if (u.wert !== vorher) E(sel, `Rückgängig nach dem ⓧ holt den Text nicht zurück (‚${u.wert.slice(0, 30)}‘ statt ‚${vorher.slice(0, 30)}‘) – leert das ⓧ über den Wert? (APD-81/${nr})`);
    else if (!u.arten.includes('historyUndo')) E(sel, `Rückgängig: die App erfährt es nicht (input ${u.arten.join(', ') || 'keins'} statt historyUndo) (APD-81/${nr})`);
  };
  for (const { sel, text = 'Abc', warn = false } of fields) {
    const mehr = await p.locator(sel).evaluate(f => f.tagName === 'TEXTAREA');
    await p.locator(sel).scrollIntoViewIfNeeded(); await p.locator(sel).fill(''); await p.locator(sel).focus(); await wait(p, 100);
    if ((await lage(sel)).x) E(sel, 'ⓧ im leeren Feld (APD-63/X-3)');
    await p.keyboard.type(text); await wait(p, 150);
    amFeld(sel, await lage(sel), 'mit Text (APD-63/X-1)', mehr);
    // APD-63/X-7: im Rollbereich des Feldes rollen – das ⓧ bleibt am Feld
    const gerollt = await p.evaluate(sel => { for (let a = document.querySelector(sel).parentElement; a; a = a.parentElement) {
      if (/auto|scroll/.test(getComputedStyle(a).overflowY) && a.scrollHeight > a.clientHeight + 20) { const y = a.scrollTop; a.scrollTop = y > 10 ? y - 10 : y + 10; return true; } } return false; }, sel);
    if (gerollt) { await wait(p, 150); amFeld(sel, await lage(sel), 'nach dem Rollen (APD-63/X-7)', mehr); }
    // APD-63/X-8: drehen und zurück
    const vp = p.viewportSize();
    await p.setViewportSize({ width: vp.height, height: vp.width }); await wait(p, 400);
    if ((await lage(sel)).fokus) amFeld(sel, await lage(sel), 'nach dem Drehen (APD-63/X-8, APD-81/C10)', mehr);
    await p.setViewportSize(vp); await wait(p, 400);
    if (!(await lage(sel)).fokus) await p.locator(sel).focus();
    await p.locator(sel).scrollIntoViewIfNeeded(); await wait(p, 100);   // nach dem Drehen steht oben derselbe Eintrag (R-8.1) – Feld ins Bild
    // APD-63/X-2, APD-81/C2: Antippen leert sofort (eine Zeile), Fokus bleibt, die App erfährt es
    await p.evaluate(sel => { window.__fxInput = 0; document.querySelector(sel).addEventListener('input', () => window.__fxInput++, { once: true }); }, sel);
    const vorher = await p.locator(sel).inputValue();
    if (!await tippeX(sel)) { await p.locator(sel).blur(); continue; }
    if (await blase()) { E(sel, 'eine Zeile: Sprechblase statt sofort leeren (APD-81/C2)'); await knopf('Abbrechen'); }
    const l = await lage(sel), gemeldet = await p.evaluate(() => window.__fxInput);
    if (l.wert !== '') E(sel, `ⓧ leert das Feld nicht (‚${l.wert}‘) (APD-63/X-2)`);
    if (!l.fokus) E(sel, 'nach dem ⓧ hat das Feld keinen Fokus mehr – die Tastatur schließt (APD-63/X-2)');
    if (l.x) E(sel, 'ⓧ bleibt im leeren Feld (APD-63/X-2)');
    if (!gemeldet) E(sel, 'die App erfährt das Leeren nicht (kein input-Ereignis) (APD-63/X-2)');
    // APD-81/C6, C7: Rückgängig holt den Text zurück (Undo-Taste, drei Finger)
    if (l.wert === '') { await pruefeUndo(sel, vorher, mehr ? 'C6' : 'C7'); await p.locator(sel).fill(''); }
    if (warn) {
      await p.locator(sel).blur(); await wait(p);
      if (!await p.evaluate(() => [...document.querySelectorAll('.warn')].some(w => !w.hidden && w.getClientRects().length && w.textContent.trim()))) E(sel, 'nach dem Leeren mit ⓧ keine Fehlermeldung (APD-63/X-4, R-5.3)');
    }
    if (mehr) {
      // APD-81/C3–C6, C8, C9: drei Zeilen – Sprechblase, Abbrechen, Löschen, Rückgängig, nach dem Leeren getippt
      const drei = `${text} eins\nzwei\ndrei`;
      await p.locator(sel).fill(drei); await p.locator(sel).focus(); await wait(p, 150);
      amFeld(sel, await lage(sel), 'mit drei Zeilen (APD-81/C1)', true);
      await p.keyboard.press('ControlOrMeta+End'); await p.keyboard.type('\nvier\nfünf'); await wait(p, 200);
      amFeld(sel, await lage(sel), 'nachdem das Feld gewachsen ist (APD-81/C9)', true);
      const voll = await p.locator(sel).inputValue();
      if (!await tippeX(sel)) { await p.locator(sel).blur(); continue; }
      const b = await blase(), f1 = await lage(sel);
      if (!b) E(sel, 'mehr als eine Zeile: keine Sprechblase ‚Text löschen?‘ (APD-81/C3)');
      else {
        if (b.text !== 'Text löschen?' || b.knoepfe.join(' · ') !== 'Löschen (rot) · Abbrechen') E(sel, `Sprechblase ‚${b.text}‘ mit ${b.knoepfe.join(' · ')} statt ‚Text löschen?‘ mit Löschen (rot) · Abbrechen (APD-81/C3)`);
        if (!b.ganz) E(sel, 'Sprechblase nicht ganz auf dem Bildschirm (APD-81/C11)');
        if (f1.wert !== voll) E(sel, 'Text ändert sich schon vor der Antwort (APD-81/C3)');
        if (!f1.fokus) E(sel, 'Sprechblase offen: das Feld hat keinen Fokus mehr – die Tastatur schließt (APD-81/F-2)');
        await knopf('Abbrechen');
        const f2 = await lage(sel);
        if (f2.wert !== voll || !f2.fokus) E(sel, `‚Abbrechen‘: Text ${f2.wert === voll ? 'unverändert' : 'geändert'}, Fokus ${f2.fokus ? 'im Feld' : 'weg'} (APD-81/C4)`);
        if (!await tippeX(sel)) continue;
        if (!await blase()) E(sel, 'zweites Antippen: keine Sprechblase (APD-81/C3)');
        else {
          await knopf('Löschen');
          const f3 = await lage(sel);
          if (f3.wert !== '' || !f3.fokus) E(sel, `‚Löschen‘: ${f3.wert === '' ? 'leer' : `‚${f3.wert.slice(0, 20)}‘`}, Fokus ${f3.fokus ? 'im Feld' : 'weg'} (APD-81/C5)`);
          if (f3.wert === '') {
            await pruefeUndo(sel, voll, 'C6');
            // APD-81/C8 (M-4): Safari fasst Leeren und Tippen zu einem Schritt zusammen – in WebKit genügt ein Rückgängig
            await p.locator(sel).fill(voll); await p.locator(sel).focus(); await wait(p, 100);
            await tippeX(sel); await knopf('Löschen'); await p.keyboard.type('Wort'); await wait(p, 100);
            const u = await undo(sel, webkit ? 1 : 2);
            if (u.wert !== voll) E(sel, `nach dem Leeren getippt: ${webkit ? 'ein' : 'zwei'}mal Rückgängig ergibt ‚${u.wert.slice(0, 20)}‘ statt des ganzen Textes (APD-81/C8)`);
          }
        }
      }
    }
    // APD-63/X-3: ohne Fokus kein ⓧ
    await p.locator(sel).fill(text); await p.locator(sel).blur(); await wait(p, 100);
    if ((await lage(sel)).x) E(sel, 'ⓧ ohne Fokus (APD-63/X-3)');
  }
  // APD-81/C14: Felder ohne ⓧ (readonly, data-noclear, Datum, Suche) – auch mit Inhalt
  for (const sel of ohne) {
    if (!await p.locator(sel).count()) { E(sel, 'Feld fehlt (APD-81/C14)'); continue; }
    await p.locator(sel).focus(); await wait(p, 150);
    const l = await lage(sel);
    if (l.x) E(sel, `ⓧ in einem Feld, das keins haben darf (APD-81/C14)`);
    await p.locator(sel).blur();
  }
  return errors;
}

// R-7.4 Position beim Öffnen (seit 4.21.0, APD-16): open() öffnet einen Eintrag; want = data-day (bzw. data-keep) des
// ‚nächsten offenen‘ Eintrags oder null. Mit want: genau dieser ist hervorgehoben (mark) und steht direkt unter dem Kopf
// (Leiste und haftender Tabellenkopf, ± 2 px) – ist die Seite nicht so weit rollbar, ganz unten und ganz sichtbar.
// Ohne want: ganz oben, nichts hervorgehoben. Seit 4.32.0 (APD-69): markiert = was hervorgehoben sein muss (Vorgabe want);
// markiert: null = ein aktueller Eintrag (z. B. heute) steht oben, aber nichts ist hervorgehoben – nur Offenes wird hervorgehoben.
export async function checkOpenAt(p, { open, want = null, markiert = want, mark = '.gap', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-7.4 ${t}`);
  await open(); await wait(p, 400);
  const r = await p.evaluate(({ want, mark, R }) => {
    const roll = eval(R);
    const bar = document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
    const marked = [...document.querySelectorAll(`#app ${mark}`)].filter(e => e.getClientRects().length).map(e => e.dataset.day || e.dataset.keep);
    const el = want ? document.querySelector(`#app [data-day="${want}"], #app [data-keep="${want}"]`) : null;
    const th = el?.closest('table')?.tHead?.querySelector('th');
    const edge = bar + (th && getComputedStyle(th).position === 'sticky' ? th.offsetHeight : 0);
    const er = el?.getBoundingClientRect();
    return { y: Math.round(roll.y), max: Math.round(roll.max), marked, edge: Math.round(edge),
      top: er ? Math.round(er.top) : null, bottom: er ? Math.round(er.bottom) : null, h: roll.el ? Math.round(roll.el.getBoundingClientRect().bottom) : innerHeight };
  }, { want, mark, R: ROLL });
  if (!want) {
    if (r.y > 1) E(`alles erfasst: nicht ganz oben (${r.y} px gerollt)`);
    if (r.marked.length) E(`alles erfasst: hervorgehoben ${r.marked.join(', ')}`);
  } else {
    if (!markiert && r.marked.length) E(`aktueller Eintrag ${want}: hervorgehoben ${r.marked.join(', ')} – ohne Offenes darf nichts hervorgehoben sein`);
    else if (markiert && r.marked.join() !== markiert) E(`hervorgehoben ‚${r.marked.join(', ')}‘ statt ‚${markiert}‘`);
    if (r.top === null) E(`Eintrag ${want} fehlt`);
    else if (Math.abs(r.top - r.edge) > 2 && !(r.y >= r.max - 1 && r.top >= r.edge - 2 && r.bottom <= r.h)) E(`${want} steht nicht direkt unter dem Kopf (oben ${r.top} px, Kopf endet bei ${r.edge} px, gerollt ${r.y} von ${r.max})`);
  }
  return errors;
}

// R-8.1 Seitenleiste ein/aus (seit 4.21.0, APD-17): der oberste sichtbare Eintrag bleibt derselbe; nach einer geraden Zahl von
// Umschaltungen steht er auf ± 2 px an derselben Stelle (kein Wandern); ganz oben bleibt ganz oben; ohne Eintrag oben (Ende der
// Seite) bleibt der Abstand zum Ende gleich – kein Sprung nach oben oder ans Ende. at: Anteil des Scrollwegs.
export async function checkSideToggle(p, { toggle = '[data-side-toggle]', at = 0.5, times = 5, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-8.1 ${t}`);
  const top = () => p.evaluate(R => {
    const roll = eval(R), edge = document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
    const e = [...document.querySelectorAll('#app [data-day], #app [data-keep]')].find(x => x.getClientRects().length && x.getBoundingClientRect().bottom > edge + 1);
    return { id: e ? e.dataset.day || e.dataset.keep : null, top: e ? Math.round(e.getBoundingClientRect().top) : null, y: Math.round(roll.y),
      rest: Math.round(roll.rest) };
  }, ROLL);
  // seit 4.31.0 (APD-68): die Seitenleiste gleitet auch quer – nach dem Klick bis zum Ende der Bewegung warten
  const press = async () => { await p.locator(toggle).filter({ visible: true }).first().click(); await wait(p, 350); await navFertig(p); };
  await rolle(p, `${at * 100}%`); await wait(p, 300);
  const vor = await top();
  for (let i = 1; i <= times * 2; i++) {
    await press();
    const n = await top();
    if (at === 0 && n.y > 1) { E(`ganz oben: nach ${i}. Umschalten ${n.y} px gerollt`); break; }
    if (at > 0 && !vor.id && Math.abs(n.rest - vor.rest) > 2) { E(`ohne Eintrag oben: nach ${i}. Umschalten ${n.rest} px statt ${vor.rest} px vor dem Ende (gerollt ${n.y} px)`); break; }
    if (at > 0 && vor.id && n.id !== vor.id) { E(`nach ${i}. Umschalten oben ${n.id} statt ${vor.id} (gerollt ${n.y} px)`); break; }
    if (at > 0 && i % 2 === 0 && Math.abs(n.top - vor.top) > 2) { E(`nach ${i}. Umschalten ${vor.id} bei ${n.top} px statt ${vor.top} px`); break; }
  }
  return errors;
}

// R-8.1 Drehen am Ende der Seite (seit 4.21.1, Korrektur aus P-48/3): steht oben kein Eintrag (Fazit, Statistik …), bleibt der
// Abstand zum Ende gleich – ganz unten bleibt ganz unten. back: Abstand zum Ende vor dem Drehen (0 = ganz unten).
// Gedreht wird hin und zurück; Safari nachgebildet (kein Scroll-Anker).
export async function checkTurnEnd(p, { back = 0, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-8.1 ${t}`);
  await p.addStyleTag({ content: '* { overflow-anchor: none !important; }' });
  const lage = () => p.evaluate(R => {
    const roll = eval(R), edge = document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
    const e = [...document.querySelectorAll('#app [data-day], #app [data-keep]')].find(x => x.getClientRects().length && x.getBoundingClientRect().bottom > edge + 1);
    return { tag: e ? e.dataset.day || e.dataset.keep : null, rest: Math.round(roll.rest), y: Math.round(roll.y) };
  }, ROLL);
  // zweimal: endet unter Last gerade noch eine Bewegung (Seitenleiste gleitet aus, keepPlace), stellt sie sonst den alten Rollstand
  // wieder her bzw. das Gedächtnis für das Drehen (keepTop) bleibt beim alten Stand – der zweite Rollschritt gilt (seit 4.37.0)
  await rolle(p, { vorEnde: back }); await wait(p, 400);
  await rolle(p, { vorEnde: back }); await wait(p, 200);
  const vor = await lage(), v = p.viewportSize();
  if (vor.tag) { E(`Vorbereitung: oben steht noch ${vor.tag} – kein Fall ‚Ende der Seite‘ (Abstand ${back} zu groß)`); return errors; }
  for (const [w, h, name] of [[v.height, v.width, 'gedreht'], [v.width, v.height, 'zurückgedreht']]) {
    await p.setViewportSize({ width: w, height: h }); await wait(p, 800);
    const n = await lage();
    if (!n.tag && Math.abs(n.rest - vor.rest) > 2) E(`${name}: ${n.rest} px vor dem Ende statt ${vor.rest} px (gerollt ${n.y} px)`);
    if (n.tag && back === 0) E(`${name}: nicht mehr am Ende – oben steht ${n.tag} (${n.rest} px vor dem Ende)`);
  }
  return errors;
}

// R-6.4 Ausgabe und Vorschau: immer hell, in voller Fensterbreite, seitlich wischbar, wenn breiter; Kapsel [PDF · Teilen].
export async function checkPreview(p, { open, body = '#dlg .dlg-body.preview', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-6.4 ${t}`);
  await open(); await wait(p, 400);
  const r = await p.evaluate(sel => {
    const b = document.querySelector(sel), d = b?.closest('dialog');
    if (!b) return null;
    const lum = c => { const [r, g, bl] = (c.match(/[\d.]+/g) || [0, 0, 0]).map(Number); return (0.2126 * r + 0.7152 * g + 0.0722 * bl) / 255; };
    const s = getComputedStyle(b), grp = d.querySelector('.dlg-head .grp'), btns = grp ? [...grp.querySelectorAll('button')] : [];
    return { light: lum(s.backgroundColor) > 0.9 && lum(s.color) < 0.3, full: b.getBoundingClientRect().width >= d.clientWidth - 2,
      wide: b.scrollWidth > b.clientWidth + 1, swipe: /auto|scroll/.test(s.overflowX),
      cap: btns.length === 2 && /PDF/.test(btns[0].textContent) && /Teilen/.test(btns[1].getAttribute('aria-label') || '') && !btns[1].textContent.trim() };
  }, body);
  if (!r) E('Vorschau öffnet sich nicht');
  else {
    if (!r.light) E('Vorschau nicht hell');
    if (!r.full) E('Vorschau nicht in voller Fensterbreite');
    if (r.wide && !r.swipe) E('Vorschau breiter als das Fenster, aber nicht seitlich wischbar');
    if (!r.cap) E('Kopfzeile ohne Kapsel [PDF · Teilen] (Teilen nur als Icon)');
  }
  await p.evaluate(() => document.getElementById('dlg').close()); await wait(p);
  return errors;
}

// R-7.3 (seit 4.18.0, APD-13; seit 4.23.2 neu gefasst nach P-52) Liste steht still: solange ein Fenster aus einer Zeile offen
// ist, bewegt sich die Liste dahinter nicht; nach dem Schließen (Häkchen oder x) steht die oberste Zeile unter der Leiste
// genau wie beim Öffnen – auch nach ‹ › im Fenster; die Zeile aus dem Fenster wird hervorgehoben (wenn sichtbar; seit 4.24.0, APD-23:
// 2 s voll, 1 s ausblenden, ‚Bewegung reduzieren‘ 2 s ohne Ausblenden; endet, sobald das nächste Fenster aufgeht).
// Safari-Tastatur nachgebildet, je Fall eine Art (einzeln und zusammen – zusammen heben sich Fehler teils auf): sie rollt die
// Seite beim Öffnen und macht den sichtbaren Bereich (visualViewport) niedriger ('vv'), dazu das Fenster ('resize') bzw. rollt
// die Seite beim Zugehen 250 ms nach dem Schließen noch einmal ('late'); 'alle' = alles zugleich.
// start: bringt die Liste in den Ausgangszustand (z. B. Eintrag öffnen → erster fehlender Tag oben); ohne: Scrollstand 1200.
// item: Zeilen bzw. Kästen; field: Eingabefeld im Fenster; next: Schaltfläche ‚Folgetag‘ im Fenster (ohne: kein Blättern).
export async function checkListStill(p, { item, field, next = '', where = '', start = null } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-7.3 ${t}`);
  const vp = p.viewportSize();
  const edgeJs = `Math.max(...[...document.querySelectorAll('.nb, .pnav, #bar, table.days:not(.static) th')].map(e => e.getBoundingClientRect().bottom), 0)`;
  // oberste Zeile unter der Leiste samt Lage; dazu die Zeilen im Bild (Kopf sichtbar und antippbar)
  const look = () => p.evaluate(({ item, edgeJs, R }) => {
    const roll = eval(R), edge = eval(edgeJs), all = [...document.querySelectorAll(item)].filter(e => e.getClientRects().length);
    const k = e => e.dataset.day || e.dataset.keep, top = all.find(e => e.getBoundingClientRect().bottom > edge + 1);
    return { y: Math.round(roll.y), key: top && k(top), top: top ? Math.round(top.getBoundingClientRect().top) : null,
      tap: all.filter(e => e.getBoundingClientRect().top >= edge - 1 && e.getBoundingClientRect().top <= innerHeight - 80).map(e => ({ key: k(e), at: e.getBoundingClientRect().top / innerHeight })) };
  }, { item, edgeJs, R: ROLL });
  const flash = key => p.evaluate(({ item, key }) => [...document.querySelectorAll(item)].some(x => (x.dataset.day || x.dataset.keep) === key && x.getAnimations().length > 0), { item, key });
  // APD-23 (seit 4.24.0): Verlauf der Hervorhebung – Farbe kurz vor Ende des Haltens (voll --sel-bg?) und Gesamtdauer; danach beenden
  const glow = (key, at) => p.evaluate(({ item, key, at }) => {
    const el = [...document.querySelectorAll(item)].find(x => (x.dataset.day || x.dataset.keep) === key && x.getAnimations().length > 0);
    const a = el?.getAnimations()[0]; if (!a) return null;
    const probe = document.body.appendChild(document.createElement('i')); probe.style.backgroundColor = 'var(--sel-bg)';
    const sel = getComputedStyle(probe).backgroundColor; probe.remove();
    const now = a.currentTime; a.currentTime = at; const bg = getComputedStyle(el).backgroundColor; a.currentTime = now;
    return { full: bg === sel, bg, sel, end: Math.round(a.effect.getComputedTiming().endTime) };
  }, { item, key, at });
  const stop = () => p.evaluate(item => document.querySelectorAll(item).forEach(x => x.getAnimations().forEach(a => a.finish())), item);
  const tap = key => p.evaluate(({ item, key }) => [...document.querySelectorAll(item)].find(x => (x.dataset.day || x.dataset.keep) === key && x.getClientRects().length).click(), { item, key });
  const keyboard = async (on, kb) => {
    const resize = kb === 'resize' || kb === 'alle', late = kb === 'late' || kb === 'alle';
    if (on) {
      // iPad bleibt iPad: unter 500 px Höhe schaltet ui.js auf die iPhone-Ansicht (isPhone) – das tut die echte Tastatur nicht
      if (resize) await p.setViewportSize({ width: vp.width, height: vp.height >= 500 ? Math.max(500, Math.round(vp.height * 0.6)) : Math.round(vp.height * 0.6) });
      // Safari rollt beim Öffnen der Tastatur; seit 4.27.0 (APD-28) als ungünstigster Fall auch den Rollbereich (Sicherung R-7.3)
      await p.evaluate(([resize, R]) => { window.__realVV ||= window.visualViewport;
        const fake = { height: resize ? innerHeight : Math.round(innerHeight * 0.6), width: innerWidth, offsetTop: 0, offsetLeft: 0, scale: 1, addEventListener() {}, removeEventListener() {} };
        Object.defineProperty(window, 'visualViewport', { configurable: true, get: () => fake }); scrollBy(0, 250); eval(R).by(250); }, [resize, ROLL]);
    } else {
      await wait(p, 250);
      if (resize) await p.setViewportSize(vp);
      await p.evaluate(([late, R]) => { Object.defineProperty(window, 'visualViewport', { configurable: true, get: () => window.__realVV }); if (late) { scrollBy(0, -250); eval(R).by(-250); } }, [late, ROLL]);
    }
  };
  const reset = async () => {
    if (start) await start();
    else { await p.evaluate(R => { const r = eval(R); r.to(Math.min(1200, r.max - 400)); }, ROLL); await wait(p, 300); }
  };
  // Fälle wie in P-51/5 und P-52/2–4: Zeile oben, 3 Zeilen tiefer, untere Hälfte, Zeile 2 px unter dem Kopf, 5 Tage vorblättern
  const cases = [['Häkchen, oberste Zeile', '#dlgOk', 'oben', 'alle'], ['x, oberste Zeile', '#dlgX', 'oben', 'late'],
    ['Häkchen, 3 Zeilen tiefer', '#dlgOk', 'tiefer', 'vv'], ['Häkchen, 3 Zeilen tiefer', '#dlgOk', 'tiefer', 'resize'], ['Häkchen, 3 Zeilen tiefer', '#dlgOk', 'tiefer', 'late'],
    ['Häkchen, untere Hälfte', '#dlgOk', 'unten', 'vv'], ['x, untere Hälfte', '#dlgX', 'unten', 'alle'], ['Häkchen, Zeile 2 px unter dem Kopf', '#dlgOk', 'nah', 'alle']];
  if (next) cases.push(['Häkchen nach 5× ‹ ›', '#dlgOk', 'blättern', 'vv'], ['Häkchen nach 5× ‹ ›', '#dlgOk', 'blättern', 'resize'], ['x nach 5× ‹ ›', '#dlgX', 'blättern', 'late']);
  for (const [n, [fall, close, wo, kb]] of cases.entries()) {
    const art = `${fall} (Tastatur ${kb})`;
    // APD-23: der zweite Fall läuft mit ‚Bewegung reduzieren‘ (2 s voll, dann ohne Ausblenden weg)
    const still = n === 1; await p.emulateMedia({ reducedMotion: still ? 'reduce' : 'no-preference' });
    await reset();
    let vor = await look();
    if (vor.tap.length < 4) { E(`${art}: zu wenige sichtbare Zeilen zum Prüfen (${vor.tap.length}, Scrollstand ${vor.y})`); continue; }
    const key = { oben: vor.tap[0], tiefer: vor.tap[3], nah: vor.tap[1], blättern: vor.tap.at(-2) }[wo]?.key ?? vor.tap.find(t => t.at > 0.55)?.key;
    if (!key) { E(`${art}: keine Zeile in der unteren Hälfte`); continue; }
    if (wo === 'nah') {
      await p.evaluate(({ item, key, edgeJs, R }) => { const e = [...document.querySelectorAll(item)].find(x => (x.dataset.day || x.dataset.keep) === key && x.getClientRects().length);
        eval(R).by(e.getBoundingClientRect().top - eval(edgeJs) - 2); }, { item, key, edgeJs, R: ROLL });
      await wait(p, 300); vor = await look();
    }
    await tap(key); await wait(p, 300);
    await p.locator(field).first().click(); await keyboard(true, kb);
    if (wo === 'blättern') for (let i = 0; i < 5; i++) { await p.click(next); await wait(p, 150); }
    if (close === '#dlgOk') await p.locator(field).first().pressSequentially(' neu', { delay: 10 });
    await p.click(close);
    const zu = keyboard(false, kb);
    // die Hervorhebung beginnt im nächsten Bildaufbau – unter Last (voller Lauf, WebKit) bis zu 800 ms warten
    let lit = wo === 'blättern'; for (let i = 0; i < 16 && !lit; i++) { await wait(p, 50); lit = await flash(key); }
    if (!lit) E(`${art}: Zeile ${key} wird nach dem Schließen nicht kurz hervorgehoben`);
    else if (wo !== 'blättern') {
      const g = await glow(key, 1950), soll = still ? 2000 : 3000;
      if (!g) E(`${art}: Hervorhebung der Zeile ${key} endet vor 2 s`);
      else {
        if (!g.full) E(`${art}: Zeile ${key} ist nach 1,95 s nicht mehr voll blau (${g.bg} statt ${g.sel})`);
        if (Math.abs(g.end - soll) > 50) E(`${art}: Hervorhebung dauert ${g.end} ms statt ${soll} ms (APD-23${still ? ', Bewegung reduzieren' : ''})`);
      }
    }
    await zu; await wait(p, 1500);
    const nach = await look();
    if (nach.key !== vor.key || Math.abs(nach.top - vor.top) > 1)
      E(`${art} (Zeile ${key}): Liste steht nach dem Schließen nicht wie beim Öffnen – oben ${vor.key} bei ${vor.top} px → ${nach.key} bei ${nach.top} px (Scrollstand ${vor.y} → ${nach.y})`);
    await stop();
  }
  await p.emulateMedia({ reducedMotion: 'no-preference' });
  // APD-23: geht während der Hervorhebung das nächste Fenster auf, endet sie sofort
  await reset();
  const z = (await look()).tap;
  if (z.length >= 4) {
    await tap(z[1].key); await wait(p, 300); await p.click('#dlgX');
    let lit = false; for (let i = 0; i < 16 && !lit; i++) { await wait(p, 50); lit = await flash(z[1].key); }
    await tap(z[3].key); await wait(p, 100);
    if (lit && await flash(z[1].key)) E(`Hervorhebung der Zeile ${z[1].key} läuft weiter, obwohl das nächste Fenster offen ist`);
    await p.click('#dlgX'); await wait(p, 300); await stop();
  }
  return errors;
}

// R-2.3 (seit 4.25.0, APD-21; Testfall-Liste arbeit/APD-21 APD-22 Testfall-Liste.md) Suche mit mehreren Begriffen – die Bausteine aus ui.js
// (searchWords, findsAll, findsAny, markWords) in der Seite der App: Wörter zerlegen (Leerzeichen, „…“, doppelte, Ränder),
// alle müssen vorkommen (Reihenfolge egal), Markierung aller Wörter (längere zuerst, Überlappung = eine Markierung),
// Sonderzeichen, Umlaute und unsichtbare Umbruchstellen (R-6.3). Wie ein Eintrag zusammengesetzt ist, prüft die App selbst.
export async function checkSearchWords(p, { where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 Wörter: ${t}`);
  const r = await p.evaluate(() => {
    if (typeof searchWords !== 'function' || typeof markWords !== 'function') return null;
    const W = t => searchWords(t), M = (h, t) => markWords(h, W(t));
    return {
      S2: findsAll('Freetour Sydney\nBesichtigung Opera House', W('sydney opera')), S3: findsAll('Freetour Sydney\nBesichtigung Opera House', W('opera sydney')),
      S5: findsAll('Freetour Sydney', W('sydney opera')), any: findsAny('Freetour Sydney', W('sydney opera')),
      S7: W('  sydney   '), S8: W('sydney '), S9: W('rom Rom rom'), S14: W('„Opera  House“ sydney'), S14b: W('"opera house" "x"'),
      S14c: findsAll('Opera und House', W('„opera house“')), S15: W('„opera'), S15b: W('„“ ""'),
      S10: M('Opera di Roma', 'oper opera'), S10b: M('Sydney', 'syd ney'), S2m: M('Freetour Sydney, Opera House', 'opera sydney'),
      S14m: M('Opera House und Opera', '„opera house“'), S16: M('Würzburg (Main) 3.5 * x', '( würzburg 3.5 *'),
      S17: M('Sehr​lange​Wörter', 'langewörter'), empty: M('Sydney', '   '),
      // APD-63 C2 (seit 4.29.0): ohne Akzente wie Apple
      A1: [findsAll('Ankunft in Zürich', W('zurich')), M('Ankunft in Zürich', 'Zurich')], A2: [findsAll('Zurich', W('Zürich')), findsAll('ZÜRICH', W('zürich')), M('ZURICH', 'Zürich')],
      A3: [findsAll('São Paulo', W('Sao Paulo')), M('Café Crème', 'cafe creme')], A4: [findsAll('São Paulo', W('„Sao Paulo“')), findsAll('Paulo in São', W('„Sao Paulo“')), M('in São Paulo', '„sao paulo“')],
      A6: M('Sehr​lange​Grüße', 'langegruße'), A7: [M('Sonne ☀️ und A &amp; B', '☀️ & b'), findsAll('Sonne ☀️', W('☀️'))], A7b: M('Zu\u0308rich', 'zurich'),
      A8: [findsAll('Straße', W('strasse')), findsAll('Øresund', W('oresund')), findsAll('Straße', W('straße'))],
    };
  });
  if (!r) { E('Bausteine searchWords/markWords fehlen in ui.js'); return errors; }
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  if (!r.S2 || !r.S3) E('zwei Wörter am selben Ort werden nicht gefunden (Reihenfolge egal)');
  if (r.S5) E('fehlt ein Wort, darf nichts gefunden werden');
  if (!r.any) E('findsAny findet ein einzelnes Wort nicht');
  if (!eq(r.S7, ['sydney']) || !eq(r.S8, ['sydney'])) E(`Leerzeichen am Rand bzw. doppelt: ${JSON.stringify(r.S7)} / ${JSON.stringify(r.S8)}`);
  if (!eq(r.S9, ['rom'])) E(`doppelte Wörter: ${JSON.stringify(r.S9)} statt ["rom"]`);
  if (!eq(r.S14, ['opera house', 'sydney']) || !eq(r.S14b, ['opera house', 'x'])) E(`„…“ als genaue Wortfolge: ${JSON.stringify(r.S14)} / ${JSON.stringify(r.S14b)}`);
  if (r.S14c) E('„opera house“ findet auch getrennte Wörter (keine genaue Folge)');
  if (!eq(r.S15, ['opera']) || !eq(r.S15b, [])) E(`einzelnes bzw. leeres Anführungszeichen: ${JSON.stringify(r.S15)} / ${JSON.stringify(r.S15b)}`);
  if (r.S10 !== '<mark>Opera</mark> di Roma') E(`Überlappung ‚oper opera‘: ${r.S10}`);
  if (r.S10b !== '<mark>Sydney</mark>') E(`aneinanderstoßende Wörter ‚syd ney‘: ${r.S10b}`);
  if (r.S2m !== 'Freetour <mark>Sydney</mark>, <mark>Opera</mark> House') E(`Markierung aller Wörter: ${r.S2m}`);
  if (r.S14m !== '<mark>Opera House</mark> und Opera') E(`Markierung der genauen Folge: ${r.S14m}`);
  if (r.S16 !== '<mark>Würzburg</mark> <mark>(</mark>Main) <mark>3.5</mark> <mark>*</mark> x') E(`Sonderzeichen und Umlaute: ${r.S16}`);
  if (!/^Sehr​<mark>lange​Wörter<\/mark>$/.test(r.S17)) E(`unsichtbare Umbruchstellen (R-6.3): ${JSON.stringify(r.S17)}`);
  if (r.empty !== 'Sydney') E(`leere Suche markiert etwas: ${r.empty}`);
  // APD-63 C2 (seit 4.29.0): Suche ohne Akzente – ‚Zurich‘ findet ‚Zürich‘ und umgekehrt, markiert wird das Wort, wie es dasteht
  const A = (nr, t) => E(`ohne Akzente ${nr}: ${t}`);
  if (!r.A1[0] || r.A1[1] !== 'Ankunft in <mark>Zürich</mark>') A('APD-63/A-1', `‚zurich‘ findet ‚Zürich‘ nicht ganz (${r.A1})`);
  if (!r.A2[0] || !r.A2[1] || r.A2[2] !== '<mark>ZURICH</mark>') A('APD-63/A-2', `‚Zürich‘ findet ‚Zurich‘/‚ZÜRICH‘ nicht (${r.A2})`);
  if (!r.A3[0] || r.A3[1] !== '<mark>Café</mark> <mark>Crème</mark>') A('APD-63/A-3', `‚Sao Paulo‘ bzw. ‚cafe creme‘ (${r.A3})`);
  if (!r.A4[0] || r.A4[1] || r.A4[2] !== 'in <mark>São Paulo</mark>') A('APD-63/A-4', `„Sao Paulo“ als genaue Folge (${r.A4})`);
  if (!/^Sehr​<mark>lange​Grüße<\/mark>$/.test(r.A6)) A('APD-63/A-6', `Umbruchstellen und Akzent: ${JSON.stringify(r.A6)}`);
  if (r.A7[0] !== 'Sonne <mark>☀️</mark> und A <mark>&amp;</mark> <mark>B</mark>' || !r.A7[1]) A('APD-63/A-7', `Emoji und Sonderzeichen: ${r.A7}`);
  if (r.A7b !== '<mark>Zu\u0308rich</mark>') A('APD-63/A-7', `Akzent als eigenes Zeichen: ${JSON.stringify(r.A7b)}`);
  if (r.A8[0] || r.A8[1] || !r.A8[2]) A('APD-63/A-8', `ß und ø sind eigene Buchstaben (${r.A8})`);
  return errors;
}

// R-1.6 Messmodus (seit 4.26.0, APD-27, Testfall-Liste arbeit/APD-27 Testfall-Liste.md F1–F12): Start und Ende im Mehr-Menü der Seitenleiste
// (seit 4.40.0, APD-77: ‚Messung starten‘ erst nach langem Drücken auf die graue Versionszeile, bis zum Neuladen),
// eine Zeile je Bild nur bei Änderung, Ereignisse, keine Texte, Grenze, Datei, neu laden verwirft. menu: öffnet das Mehr-Menü;
// search: öffnet die Suche und gibt den Selektor des Suchfelds zurück; secret: Texte, die nie in der Datei stehen dürfen.
export async function checkMessung(p, { menu, search, secret = [], where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-1.6 ${t}`);
  const item = () => p.locator('.menu .mi', { hasText: 'Messung' }).first();
  const label = async () => { await menu(); await wait(p, 200); const t = await item().evaluate(e => e.textContent.trim() + ' | ' + (e.nextElementSibling?.classList.contains('sub') ? e.nextElementSibling.textContent.trim() : '')).catch(() => ''); return t; };
  const close = async () => { await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); if (await p.locator('.menu').count()) await p.keyboard.press('Escape'); await wait(p, 150); };
  const rows = () => p.evaluate(() => mess?.zeilen.length ?? 0);
  // F1: aus – nichts läuft
  if (await p.evaluate(() => mess !== null)) E('Messung läuft, ohne gestartet zu sein');
  const bar = () => p.evaluate(() => [...document.querySelectorAll('#bar, .side-head, .nb2')].filter(e => e.getClientRects().length).map(e => Math.round(e.getBoundingClientRect().top)).join(','));
  const vorher = await bar();
  // APD-77 (seit 4.40.0, Testfall-Liste arbeit/APD-77 Testfall-Liste.md F-1 bis F-6, F-8, F-9): ‚Messung starten‘ ist versteckt, bis langes
  // Drücken auf die graue Versionszeile ihn freischaltet – das Menü bleibt offen; kurz tippen bzw. dabei wegziehen schaltet nicht frei.
  if (await p.evaluate(() => messFrei)) E('F-1: Messmodus ist schon freigeschaltet, ohne dass jemand lange gedrückt hat');
  await menu(); await wait(p, 200);
  const menue = () => p.evaluate(() => { const m = document.querySelector('.menu'); if (!m) return null; const r = m.getBoundingClientRect();
    return { mess: [...m.querySelectorAll('.mi')].some(e => /Messung/.test(e.textContent)), doppelt: [...m.querySelectorAll('.sep, .line')].some(e => /\b(sep|line)\b/.test(e.nextElementSibling?.className || '') || !e.nextElementSibling),
      ganz: r.top >= -1 && r.left >= -1 && r.bottom <= innerHeight + 1 && r.right <= innerWidth + 1 }; });
  const druecke = async (ms, weg = 0) => { const b = await p.locator('.menu .note.halten').first().boundingBox(); const x = b.x + b.width / 2, y = b.y + b.height / 2;
    await p.mouse.move(x, y); await p.mouse.down(); await wait(p, 150); if (weg) await p.mouse.move(x + weg, y, { steps: 4 }); await wait(p, Math.max(0, ms - 150)); await p.mouse.up(); await wait(p, 300); };
  const m0 = await menue();
  if (!m0) { E('F-1: Mehr-Menü öffnet sich nicht'); return errors; }
  if (m0.mess) E('F-1: Mehr-Menü zeigt ‚Messung …‘, ohne dass die Versionszeile lange gedrückt wurde');
  if (m0.doppelt) E('F-1: Mehr-Menü mit doppeltem Abstand bzw. Strich (oder Strich am Ende) an der Stelle der Messung');
  if (!await p.locator('.menu .note.halten').count()) { E('F-1: graue Versionszeile reagiert nicht auf langes Drücken ({ note, halten })'); await close(); return errors; }
  // F-9: langes Drücken wählt keinen Text aus und zeigt kein Safari-Menü
  const css = await p.evaluate(() => { const s = getComputedStyle(document.querySelector('.menu .note.halten')); return { sel: s.userSelect || s.webkitUserSelect, callout: s.webkitTouchCallout ?? 'none' }; });
  if (css.sel !== 'none' || css.callout !== 'none') E(`F-9: Versionszeile lässt Textauswahl bzw. Safari-Menü zu (user-select ${css.sel}, touch-callout ${css.callout})`);
  await druecke(100);
  let m = await menue();
  if (!m) { E('F-2: kurzes Tippen auf die Versionszeile schließt das Menü'); await menu(); await wait(p, 200); }
  else if (m.mess) E('F-2: kurzes Tippen auf die Versionszeile schaltet den Messmodus frei');
  await druecke(900, 20);
  if ((await menue())?.mess) E('F-4: Drücken und dabei 20 px wegziehen schaltet den Messmodus frei (Bewegen bricht langes Drücken ab, R-3.5)');
  await druecke(900);
  m = await menue();
  if (!m) { E('F-3: langes Drücken auf die Versionszeile schließt das Menü'); return errors; }
  if (!m.mess) { E('F-3: nach langem Drücken auf die Versionszeile kein ‚Messung starten‘'); await close(); return errors; }
  if (!m.ganz) E('F-3: Menü nach dem Freischalten nicht ganz sichtbar (R-8.1)');
  if (await p.evaluate(() => getSelection().toString())) E(`F-9: langes Drücken hat Text ausgewählt (‚${await p.evaluate(() => getSelection().toString())}‘)`);
  await close();
  // F2: starten (F-5: nach Schließen und neu Öffnen weiter da)
  const l0 = await label();
  if (!/^Messung starten \| Für Claude: Bewegungen aufzeichnen$/.test(l0)) { E(`Mehr-Menü ohne ‚Messung starten‘ mit grauer Zeile (‚${l0}‘)`); await close(); return errors; }
  if (!await item().locator('svg').count()) E('‚Messung starten‘ ohne Icon (R-4.1)');
  await item().click(); await wait(p, 300);
  if (!await p.evaluate(() => mess?.an)) { E('‚Messung starten‘ startet keine Messung'); return errors; }
  // F12: die Messung verschiebt nichts
  if (await bar() !== vorher) E(`Leisten stehen nach dem Start anders (${vorher} → ${await bar()})`);
  const l1 = await label();
  if (!/^Messung beenden und teilen \| läuft · \d+:\d\d · [\d.]+ Zeilen$/.test(l1)) E(`Mehr-Menü während der Messung nicht ‚Messung beenden und teilen · läuft · m:ss · N Zeilen‘ (‚${l1}‘)`);
  await close();
  // F6: Ruhe – keine neuen Zeilen
  const r0 = await rows(); await wait(p, 600);
  if (await rows() !== r0) E(`in Ruhe entstehen neue Zeilen (${r0} → ${await rows()})`);
  // F3/F9: Suche öffnen, ‚Rom‘ tippen, rollen
  const input = await search();
  for (const k of 'Rom') { await p.keyboard.type(k); await wait(p, 40); }
  await wait(p, 300);
  await rolle(p, { um: 40 }); await wait(p, 300);
  // F5: drehen
  const vp = p.viewportSize(); await p.setViewportSize({ width: vp.height, height: vp.width }); await wait(p, 400);
  await p.setViewportSize(vp); await wait(p, 400);
  const z = await p.evaluate(() => mess.zeilen);
  for (const [re, was] of [[/! start$/, 'Start'], [new RegExp(`! focus ${input.replace('#', '')}$`), 'Fokus auf das Suchfeld'], [/! eingabe 1$/, 'Eingabe (Länge 1)'], [/! eingabe 3$/, 'Eingabe (Länge 3)'],
    [/! tippen /, 'Tippen'], [/! resize$/, 'Größenänderung'], [/ quer( |$)/, 'Lage quer'], [/! neuaufbau /, 'Neuaufbau']])
    if (!z.some(x => re.test(x))) E(`Datei ohne Zeile für ${was}`);
  const kopf = z[1].split(/\s+/);
  for (const k of ['t', 'sy', 'inh', 'sh', 'ih', 'vh', 'vt', 'vvtop', 'fokus', 'lage']) if (!kopf.includes(k)) E(`Spalte ‚${k}‘ fehlt (${z[1]})`);
  const daten = z.slice(2).filter(x => !x.startsWith('#'));
  if (daten.some(x => x.split('!')[0].trim().split(/\s+/).length !== kopf.length)) E('Zeilen haben nicht so viele Werte wie Spalten');
  // F4: Werte stimmen mit der Seite überein (letzte Zeile ohne Ereignis ↔ jetzt)
  await p.evaluate(() => messZeile('probe'));
  const probe = await p.evaluate(() => ({ z: mess.zeilen.at(-1).split(/\s+/), sy: Math.round(scrollY), ih: innerHeight, vh: Math.round(visualViewport?.height ?? innerHeight),
    inh: document.querySelector('#app > .rolle') ? String(Math.round(document.querySelector('#app > .rolle').scrollTop)) : '-' }));
  if (+probe.z[kopf.indexOf('sy')] !== probe.sy || +probe.z[kopf.indexOf('ih')] !== probe.ih || +probe.z[kopf.indexOf('vh')] !== probe.vh || probe.z[kopf.indexOf('inh')] !== probe.inh)
    E(`Werte der Zeile passen nicht zur Seite (${probe.z.join(' ')} – scrollY ${probe.sy}, Rollbereich ${probe.inh}, innerHeight ${probe.ih}, vv ${probe.vh})`);
  // APD-28/F-17 (seit 4.27.0, APD-28): Spalte inh zeigt den Rollstand des Inhalts – nach dem Rollen um 40 px nicht 0
  if (probe.inh !== '-' && +probe.inh <= 0) E(`Spalte inh zeigt den Rollstand des Inhalts nicht (${probe.inh} nach dem Rollen)`);
  // F7: Grenze 5 Minuten – endet von selbst, Menü zeigt ‚beendet‘
  await p.evaluate(() => { mess.start -= MESS_MAX_MS + 1000; messZeile('grenze'); });
  if (await p.evaluate(() => mess.an)) E('Messung endet nach 5 Minuten nicht von selbst');
  if (!/Grenze erreicht/.test(await p.evaluate(() => mess.zeilen.at(-1)))) E('Ende der Messung ohne Zeile ‚Grenze erreicht‘');
  const l2 = await label();
  if (!/^Messung beenden und teilen \| beendet · /.test(l2)) E(`Mehr-Menü nach der Grenze nicht ‚beendet‘ (‚${l2}‘)`);
  await close();
  // F-8 (APD-77): eine Messung, die noch nicht geteilt ist, steht auch ohne Freischaltung da
  await p.evaluate(() => { messFrei = false; });
  const l3 = await label();
  if (!/^Messung beenden und teilen \| beendet · /.test(l3)) E(`F-8: ohne Freischaltung fehlt ‚Messung beenden und teilen‘ einer noch nicht geteilten Messung (‚${l3}‘)`);
  await p.evaluate(() => { messFrei = true; });
  // F8/F9: beenden und teilen – Datei messung-JJJJ-MM-TT-hhmm.txt (geladen, wo es kein Teilen-Menü gibt)
  await p.evaluate(() => { window.__mess = []; const orig = shareFiles; shareFiles = files => { window.__mess.push(...files); return orig(files); }; });
  const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }).catch(() => null), item().click()]);
  await wait(p, 300);
  const f = (await p.evaluate(() => window.__mess.map(x => ({ name: x.name, content: x.content }))))[0];
  if (!dl || !f) E('‚Messung beenden und teilen‘ liefert keine Datei');
  else {
    if (!/^messung-\d{4}-\d\d-\d\d-\d{4}\.txt$/.test(f.name)) E(`Dateiname ‚${f.name}‘ nicht ‚messung-JJJJ-MM-TT-hhmm.txt‘`);
    if (!/^# Messung · .+ \d+\.\d+\.\d+ · AppDesign \d+\.\d+\.\d+ · .+ · (Home-Bildschirm|Safari) · \d+×\d+ @[\d.]+ · Ränder [\d.]+\/[\d.]+\/[\d.]+\/[\d.]+ · (hell|dunkel) · \d{4}-/.test(f.content)) E(`Kopf der Datei unvollständig (seit 4.29.0 mit ‚Ränder o/u/l/r‘, 3 APD-63/S-8): ${f.content.split('\n')[0]}`);
    for (const s of ['Rom', ...secret]) if (f.content.includes(s)) E(`Datei enthält den Text ‚${s}‘ (Datenschutz: nur Längen und ids)`);
  }
  if (await p.evaluate(() => mess !== null)) E('nach dem Teilen ist die Messung nicht abgeschlossen');
  // F11: neu laden verwirft eine laufende Messung
  await menu(); await wait(p, 200); await item().click(); await wait(p, 200);
  await p.reload(); await wait(p, 400);
  if (await p.evaluate(() => mess !== null)) E('nach dem Neuladen läuft noch eine Messung');
  // F-6 (APD-77): neu laden versteckt ‚Messung starten‘ wieder
  await menu(); await wait(p, 200);
  if ((await menue())?.mess) E('F-6: nach dem Neuladen steht ‚Messung starten‘ noch im Mehr-Menü');
  await close();
  await rolle(p, 0);
  return errors;
}

// R-2.3 Suche nach oben (seit 4.27.0, APD-29, APD-28/F-3/F-4): Suche öffnen (seit 4.43.0 ‚Suchen‘ im Mehr-Menü) rollt den Inhalt ganz nach oben; ⓧ leert die
// Suche, rollt ganz nach oben und lässt den Fokus im Feld. Kopf- und Suchzeile bewegen sich dabei nicht, das Fenster rollt nie.
// term: ein Begriff, der weit unten steht (der Treffer rollt den Inhalt nach unten).
export async function checkSearchTop(p, { term, open = '#mainMore', close = '#sclose', input = '#search', clear = '#sclear', bar = '#bar', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 ${t}`);
  const lage = () => p.evaluate(([bar, input, R]) => { const r = eval(R), b = document.querySelector(bar)?.getBoundingClientRect();
    return { y: Math.round(r.y), fenster: Math.round(scrollY), bar: b ? Math.round(b.top) : null, fokus: document.activeElement === document.querySelector(input),
      wert: document.querySelector(input)?.value ?? null }; }, [bar, input, ROLL]);
  if (await p.locator(input).count()) { await p.click(close); await wait(p); }   // Suche zu
  await rolle(p, '50%'); await wait(p, 300);
  const vor = await lage();
  if (vor.y < 50) { E(`Vorbereitung: Inhalt lässt sich nicht in die Mitte rollen (${vor.y} px)`); return errors; }
  await sucheAuf(p, open); await wait(p, 400);
  const auf = await lage();
  if (auf.y !== 0) E(`Suche öffnen rollt den Inhalt nicht ganz nach oben (${auf.y} px statt 0, APD-29)`);
  if (!auf.fokus) E('nach dem Öffnen der Suche liegt der Fokus nicht im Suchfeld');
  if (auf.bar !== vor.bar) E(`Kopfzeile bewegt sich beim Öffnen der Suche (${vor.bar} → ${auf.bar} px)`);
  for (const k of term) { await p.keyboard.type(k); await wait(p, 30); }
  await wait(p, 900);
  const treffer = await lage();
  if (treffer.y < 1) E(`Vorbereitung: der Treffer ‚${term}‘ rollt den Inhalt nicht (er muss weit unten stehen)`);
  // ⓧ wie am Gerät antippen (Mitte der Schaltfläche); Playwright meldete im Rahmen quer mit Tastatur ‚outside of the viewport‘
  const x = await p.locator(clear).boundingBox();
  if (!x) { E('ⓧ fehlt bei gefüllter Suche'); return errors; }
  await p.mouse.click(x.x + x.width / 2, x.y + x.height / 2); await wait(p, 400);
  const zu = await lage();
  if (zu.wert !== '') E(`ⓧ leert die Suche nicht (‚${zu.wert}‘)`);
  if (zu.y !== 0) E(`ⓧ rollt den Inhalt nicht ganz nach oben (${zu.y} px statt 0, APD-29)`);
  if (!zu.fokus) E('nach ⓧ liegt der Fokus nicht mehr im Suchfeld');
  if (zu.bar !== vor.bar) E(`Kopfzeile bewegt sich bei ⓧ (${vor.bar} → ${zu.bar} px)`);
  if ([vor, auf, treffer, zu].some(l => l.fenster)) E(`die Seite rollt (scrollY ${[vor, auf, treffer, zu].map(l => l.fenster).join(' → ')}) – nur der Inhalt darf rollen (R-2.1)`);
  await p.click(close); await wait(p);
  return errors;
}

// R-3.2 Nach oben / Ans Ende (seit 4.27.0, APD-28, APD-28/F-12): die Kapsel (.fab) ist nur da, wenn es im Inhalt etwas zu rollen gibt;
// ‚Ans Ende‘ rollt den Inhalt ganz nach unten, ‚Nach oben‘ ganz nach oben – das Fenster rollt nie. Bei offener Tastatur (sichtbarer
// Bereich niedriger, Safari nachgebildet) stehen Rahmen und Kapsel über ihr (B1). kurz(): macht den Inhalt so kurz, dass er auf
// den Bildschirm passt (z. B. Suche ohne Treffer), danach muss die Kapsel weg sein.
// Seit 4.27.1 (APD-33, Testfall-Liste APD-33/H-1 bis APD-33/H-5): die Kapsel überdeckt nie Kopf- oder Suchzeile – sie steht ganz im Rollbereich mit
// 16 px Abstand oben und unten, sonst ist sie ausgeblendet; die Schaltflächen der Leisten bleiben frei antippbar; nach dem Schließen
// der Tastatur ist sie wieder da. sichtbar: Höhe des sichtbaren Bereichs bei offener Tastatur (gemessen APD-27: iPhone hoch 409,
// quer 126 px; ohne Angabe innerHeight − 300); suche: Mehr-Knopf mit ‚Suchen‘ (seit 4.43.0, sucheAuf) – dann auch mit offener Suche gemessen; sucheZu beendet sie.
// Seit 4.30.0 (APD-37 B+C, Testfall-Liste arbeit/APD-37 Testfall-Liste.md): die Kapsel zeigt nur die Pfeile, die etwas bewirken – ganz oben nur
// ‚Ans Ende‘, am Ende nur ‚Nach oben‘, dazwischen beide, näher als eine halbe Höhe des Rollbereichs an einem Ende fehlt dessen Pfeil;
// ihr unterer Rand bleibt (APD-37/F-3). Dazu der Schnellroll-Griff (checkGriff, ab drei Höhen des Rollbereichs), bei offener Tastatur und
// offenem Fenster weder Kapsel noch Griff (APD-37/F-6, APD-37/F-9), beim Drucken ausgeblendet (APD-37/F-13). fenster: öffnet ein Fenster (danach wird es
// mit Escape geschlossen); griff: false prüft nur die Kapsel.
export async function checkFab(p, { top = '.fab button:first-child', end = '.fab button:last-child', kurz = null, sichtbar = null, suche = null, sucheZu = '#sclose', fenster = null, griff = true, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-3.2 ${t}`);
  const sicht = () => p.evaluate(() => { const f = document.querySelector('.fab'); return !!f && getComputedStyle(f).display !== 'none' && !f.hidden && f.getClientRects().length > 0; });
  const st = await rollstand(p);
  if (st.max <= 1) { E('Vorbereitung: der Inhalt ist zu kurz zum Rollen'); return errors; }
  if (!await sicht()) { E(`Kapsel fehlt, obwohl es ${st.max} px zu rollen gibt`); return errors; }
  // APD-37/F-3: Pfeile je Rollstand; nah = halbe Höhe des Rollbereichs, ende = Rollweg ohne den Platz unter dem Inhalt
  const pfeile = () => p.evaluate(([R, top, end]) => { const r = eval(R), f = document.querySelector('.fab'), z = s => { const b = document.querySelector(s); return !!b && !b.hidden && b.getClientRects().length > 0; };
    const platz = parseFloat(r.el?.style.getPropertyValue('--platz')) || 0;
    return { oben: z(top), unten: z(end), y: Math.round(r.y), nah: Math.round(r.h / 2), ende: Math.round(r.max - platz), boden: Math.round(f.getBoundingClientRect().bottom), kapsel: getComputedStyle(f).display !== 'none' && f.getClientRects().length > 0 }; }, [ROLL, top, end]);
  const soll = s => ({ oben: s.y > s.nah, unten: s.ende - s.y > s.nah });
  let boden = null;
  for (const [wo, y] of [['ganz oben', 0], ['knapp unter dem Anfang', 'nahOben'], ['Mitte', 'mitte'], ['knapp vor dem Ende', 'nahEnde'], ['ganz am Ende', 'ende']]) {
    const a = await pfeile();
    await p.evaluate(([R, y, a]) => { const r = eval(R);
      r.to(y === 'nahOben' ? a.nah / 2 : y === 'mitte' ? a.ende / 2 : y === 'nahEnde' ? a.ende - a.nah / 2 : y === 'ende' ? a.ende : y); }, [ROLL, y, a]);
    await wait(p, 120);
    const s = await pfeile(), w = soll(s);
    if (s.oben !== w.oben || s.unten !== w.unten) E(`${wo} (${s.y} von ${s.ende} px, halbe Höhe ${s.nah}): Pfeile ${[s.oben && '‚Nach oben‘', s.unten && '‚Ans Ende‘'].filter(Boolean).join(' und ') || 'keine'}, soll ${[w.oben && '‚Nach oben‘', w.unten && '‚Ans Ende‘'].filter(Boolean).join(' und ') || 'keine'} (APD-37 B)`);
    if (s.kapsel && boden !== null && Math.abs(s.boden - boden) > 1) E(`${wo}: unterer Rand der Kapsel ${s.boden} px statt ${boden} px – sie steht unten fest (APD-37 B)`);
    if (s.kapsel) boden ??= s.boden;
  }
  const fabH = await p.evaluate(() => { const b = [...document.querySelectorAll('.fab button')].find(x => x.offsetHeight); return b ? 2 * b.offsetHeight + 1 : 97; });
  await rolle(p, 0); await wait(p, 200);
  if (!await p.locator(end).isVisible()) { E('Vorbereitung: ganz oben fehlt ‚Ans Ende‘ (Inhalt zu kurz für die Prüfung)'); return errors; }
  await p.click(end); await wait(p, 300); await rollRuht(p);
  let s = await rollstand(p);
  if (s.rest > 1) E(`‚Ans Ende‘ rollt den Inhalt nicht ganz nach unten (${s.rest} px vor dem Ende)`);
  if (s.fenster) E(`‚Ans Ende‘ rollt die Seite (scrollY ${s.fenster}) statt des Inhalts`);
  await p.click(top); await wait(p, 300); await rollRuht(p);
  s = await rollstand(p);
  if (s.y > 1) E(`‚Nach oben‘ rollt den Inhalt nicht ganz nach oben (${s.y} px)`);
  if (s.fenster) E(`‚Nach oben‘ rollt die Seite (scrollY ${s.fenster}) statt des Inhalts`);
  // B1: Tastatur offen – der sichtbare Bereich wird niedriger; Rahmen und Kapsel enden darüber (APD-33/H-2, APD-33/H-4). APD-33 (APD-33/H-1): die Kapsel
  // schneidet keine Leiste (Kopfzeile mit Suchzeile, feste Zeilen des Rahmens) und passt ganz in den Rollbereich, sonst ist sie weg;
  // jede Schaltfläche der Leisten ist in ihrer Mitte antippbar (nichts liegt darüber).
  const mitTastatur = wann => p.evaluate(async sichtbar => {
    const vv = window.visualViewport; if (!vv) return null;
    const h = Math.round(sichtbar ?? innerHeight - 300), frame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    Object.defineProperty(vv, 'height', { configurable: true, get: () => h }); vv.dispatchEvent(new Event('resize')); await frame(); await frame();
    const fe = document.querySelector('.fab'), fv = !!fe && !fe.hidden && getComputedStyle(fe).display !== 'none' && fe.getClientRects().length > 0;
    const f = fe?.getBoundingClientRect(), re = document.querySelector('#app > .rolle'), r = re?.getBoundingClientRect();
    const zeig = e => e.getClientRects().length > 0 && getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden';
    const leisten = [...new Set([...document.querySelectorAll('.nb, .pnav, #app > :not(.rolle):not(.fab)')])].filter(zeig);
    const schneidet = fv ? leisten.filter(l => { const b = l.getBoundingClientRect(); return f.top < b.bottom - .5 && f.bottom > b.top + .5 && f.left < b.right - .5 && f.right > b.left + .5; })
      .map(l => `${l.tagName.toLowerCase()}${l.id ? '#' + l.id : l.classList[0] ? '.' + l.classList[0] : ''} ${Math.round(l.getBoundingClientRect().top)}–${Math.round(l.getBoundingClientRect().bottom)}`) : [];
    const verdeckt = leisten.flatMap(l => [...l.querySelectorAll('button')]).filter(b => zeig(b) && b.getBoundingClientRect().width > 0).filter(b => {
      const q = b.getBoundingClientRect(), x = q.left + q.width / 2, y = q.top + q.height / 2;
      if (y < 0 || y > h) return false;
      const t = document.elementFromPoint(x, y); return !t || (t !== b && !b.contains(t));
    }).map(b => b.getAttribute('aria-label') || b.id || b.textContent.trim().slice(0, 12));
    const g = document.querySelector('.schnell'), gv = !!g && !g.hidden && getComputedStyle(g).display !== 'none';
    const out = { h, fv, gv, fab: fv ? { top: Math.round(f.top), bottom: Math.round(f.bottom) } : null, rolle: r ? { top: Math.round(r.top), bottom: Math.round(r.bottom) } : null,
      raum: r ? Math.round(Math.min(r.bottom, h) - r.top) : null, max: re ? Math.round(re.scrollHeight - re.clientHeight) : null, schneidet, verdeckt };
    delete vv.height; vv.dispatchEvent(new Event('resize')); await frame(); await frame();
    return out;
  }, sichtbar).then(kb => {
    if (!kb) return;
    const w = `bei offener Tastatur${wann} (sichtbar ${kb.h} px)`;
    if (kb.rolle && kb.rolle.bottom > kb.h + 1) E(`${w} endet der Inhalt unter ihr (unten ${kb.rolle.bottom} px, B1)`);
    if (kb.fab && kb.fab.bottom > kb.h + 1) E(`${w} liegt die Kapsel unter ihr (unten ${kb.fab.bottom} px, B1)`);
    if (kb.schneidet.length) E(`${w} überdeckt die Kapsel (${kb.fab.top}–${kb.fab.bottom} px) die Leiste ${kb.schneidet.join(', ')} (APD-33)`);
    if (kb.fab && kb.rolle && (kb.fab.top < kb.rolle.top + 16 - 1 || kb.fab.bottom > Math.min(kb.rolle.bottom, kb.h) - 16 + 1))
      E(`${w} passt die Kapsel (${kb.fab.top}–${kb.fab.bottom} px) nicht mit 16 px Abstand in den Inhalt (${kb.rolle.top}–${Math.min(kb.rolle.bottom, kb.h)} px, APD-33)`);
    if (kb.verdeckt.length) E(`${w} sind Schaltflächen der Leisten verdeckt: ${kb.verdeckt.join(', ')} (APD-33)`);
    if (kb.gv) E(`${w} ist der Schnellroll-Griff da – bei offener Tastatur ausgeblendet (7 APD-37/F-6)`);
    if (!kb.fv && kb.max > 1 && kb.raum >= fabH + 32) E(`${w} fehlt die Kapsel, obwohl sie in den Inhalt passt (${kb.raum} px Platz, Kapsel ${fabH} px + 2 × 16)`);
  });
  await mitTastatur('');
  if (!await sicht()) E('nach dem Schließen der Tastatur ist die Kapsel nicht wieder da (APD-33/H-5)');
  if (suche) {
    await sucheAuf(p, suche); await wait(p, 400);
    await mitTastatur(', Suche offen');
    if (!await sicht()) E('nach dem Schließen der Tastatur (Suche offen) ist die Kapsel nicht wieder da (APD-33/H-5)');
    await p.click(sucheZu); await wait(p, 400);
  }
  // APD-37/F-9: offenes Fenster – Kapsel und Griff nicht zu sehen und nicht bedienbar
  if (fenster) {
    await rolle(p, '50%'); await wait(p, 150);
    await fenster(); await wait(p, 500);
    const zu = await p.evaluate(() => ['.fab', '.schnell'].map(s => document.querySelector(s)).filter(Boolean)
      .filter(e => !e.hidden && getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden' && e.getClientRects().length).map(e => e.className.split(' ')[0]));
    if (zu.length) E(`bei offenem Fenster zu sehen: ${zu.join(', ')} (7 APD-37/F-9)`);
    await p.keyboard.press('Escape'); await wait(p, 400);
    if (await p.evaluate(() => !!document.querySelector('dialog[open]'))) { await p.keyboard.press('Escape'); await wait(p, 400); }
  }
  // APD-37/F-13: Drucken
  await p.emulateMedia({ media: 'print' });
  const druck = await p.evaluate(() => ['.fab', '.schnell'].map(s => document.querySelector(s)).filter(e => e && getComputedStyle(e).display !== 'none').map(e => e.className.split(' ')[0]));
  await p.emulateMedia({ media: 'screen' });
  if (druck.length) E(`beim Drucken zu sehen: ${druck.join(', ')} (7 APD-37/F-13)`);
  if (griff) errors.push(...await checkGriff(p, { where }));
  if (kurz) {
    await kurz(); await wait(p, 400);
    const k = await rollstand(p);
    if (k.max <= 1 && await sicht()) E('Kapsel ist da, obwohl es nichts zu rollen gibt');
    if (k.max > 1) E(`Vorbereitung: kurz() macht den Inhalt nicht kurz genug (${k.max} px zu rollen)`);
    if (await p.evaluate(() => !document.querySelector('.schnell')?.hidden)) E('Schnellroll-Griff ist da, obwohl es nichts zu rollen gibt (7 APD-37/F-2)');
  }
  return errors;
}

// R-3.2 Schnellroll-Griff (seit 4.30.0, APD-37 C, Testfall-Liste arbeit/APD-37 Testfall-Liste.md APD-37/F-4, APD-37/F-5, APD-37/F-11, APD-37/F-14 bis APD-37/F-21): erscheint beim
// Rollen, blendet nach 1,5 s Ruhe aus (nur Deckkraft), erst ab drei Höhen des Rollbereichs; Bahn unter Kopf- bzw. Suchzeile bis über
// die Kapsel in voller Höhe, im sicheren Bereich; Ziehen rollt verhältnisgleich, darüber hinaus = Anfang bzw. Ende, der Inhalt rollt
// nicht zusätzlich und nichts darunter wird angetippt; die Blase links daneben zeigt die Marke des Abschnitts oben im Bild (data-marke),
// ganz im Bild; ziehen während ‚Ans Ende‘ weich rollt; Regler für VoiceOver (Pfeiltaste = ein Abschnitt); keine Meldung überdeckt ihn.
// Ruft checkFab auf; zeit: höchstens so viele ms bis ‚Ans Ende‘ ankommt (APD-37/F-11, sehr langer Inhalt).
export async function checkGriff(p, { zeit = 2000, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-3.2 Schnellroll-Griff: ${t}`);
  const g = () => p.evaluate(R => {
    const r = eval(R), s = document.querySelector('.schnell'), gr = s?.querySelector('.griff'), bl = s?.querySelector('.blase'), f = document.querySelector('.fab');
    const box = e => { const b = e.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left), right: Math.round(b.right) }; };
    // Kante: Oberkante des Inhalts, bei einer Tabelle mit haftendem Kopf darunter (der Kopf verdeckt die Zeilen dahinter)
    const marken = [...r.el.querySelectorAll('[data-marke]')], tab = marken.find(m => m.closest('table'))?.closest('table'), th = tab?.tHead?.querySelector('th');
    let kante = r.el.getBoundingClientRect().top + 4;
    if (th && getComputedStyle(th).position === 'sticky' && tab.getBoundingClientRect().bottom > kante + th.getBoundingClientRect().height) kante += th.getBoundingClientRect().height;
    const marke = marken.length ? (marken.filter(m => m.getBoundingClientRect().top <= kante).at(-1) || marken[0]).dataset.marke : '';
    const safeR = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--safe-right')) || 0;
    return { da: !!s && !s.hidden && getComputedStyle(s).display !== 'none', sicht: !!gr && !s.hidden && +getComputedStyle(gr).opacity > 0.5 && getComputedStyle(gr).pointerEvents !== 'none',
      lang: r.el.scrollHeight / r.el.clientHeight, y: Math.round(r.y), ende: Math.round(r.max - (parseFloat(r.el.style.getPropertyValue('--platz')) || 0)),
      bahn: s && !s.hidden ? box(s) : null, griff: gr && !s.hidden ? box(gr) : null, blase: bl && getComputedStyle(bl).display !== 'none' ? { ...box(bl), text: bl.textContent, sicht: +getComputedStyle(bl).opacity > 0.5 } : null,
      rolle: box(r.el), kapsel: f && f.getClientRects().length ? box(f) : null, marke, w: innerWidth, ih: innerHeight, safeR,
      rolle_oben: Math.round(r.el.getBoundingClientRect().top), uebergaenge: gr ? [getComputedStyle(gr).transitionProperty, bl ? getComputedStyle(bl).transitionProperty : 'opacity'] : [],
      aria: gr ? { role: gr.getAttribute('role'), label: gr.getAttribute('aria-label'), wert: gr.getAttribute('aria-valuetext') } : null, dialog: !!document.querySelector('dialog[open]'),
      nav: /nav-/.test(document.documentElement.className) };
  }, ROLL);
  await rolle(p, 0); await wait(p, 1800);
  let s = await g();
  if (s.sicht) E('ohne Rollen sichtbar (APD-37/F-4)');
  // seit 4.31.0: bis zu 1 s auf das Einblenden warten (Übergang der Deckkraft) – unter voller Last in WebKit war der Griff nach festen
  // 150 ms noch nicht über 0,5 Deckkraft (voller Prüflauf 4.31.0, iPad schmal und quer), einzeln immer
  await rolle(p, 40); await wait(p, 150);
  s = await g();
  for (let i = 0; i < 9 && !s.sicht && s.lang >= 3; i++) { await wait(p, 100); s = await g(); }
  if (s.lang < 3) { if (s.sicht || s.da) E(`bei ${s.lang.toFixed(1)} Höhen Inhalt da – erst ab drei (APD-37/F-18)`); return errors; }
  if (!s.sicht) { E(`erscheint beim Rollen nicht (${s.lang.toFixed(1)} Höhen Inhalt, APD-37/F-4)`); return errors; }
  // APD-37/F-17: Bahn unter Kopf- bzw. Suchzeile, endet über der Kapsel in voller Höhe (zwei Pfeile + 8 px), im sicheren Bereich
  if (s.bahn.top < s.rolle_oben) E(`Bahn beginnt bei ${s.bahn.top} px über dem Inhalt (${s.rolle_oben} px) – unter Kopf- bzw. Suchzeile (APD-37/F-17)`);
  if (s.kapsel && s.bahn.bottom > s.kapsel.bottom - 104 + 1) E(`Bahn endet bei ${s.bahn.bottom} px, soll über der Kapsel in voller Höhe (${s.kapsel.bottom - 104} px, APD-37/F-17)`);
  if (s.griff.right > s.w - s.safeR + 0.5) E(`Griff rechts ${s.griff.right} px über dem sicheren Rand (${s.w - s.safeR} px, APD-37/F-17)`);
  if (s.uebergaenge.some(t => t.split(',').some(x => !['opacity', 'all'].includes(x.trim()) && x.trim() !== 'none'))) E(`Ein- und Ausblenden nicht nur über die Deckkraft (${s.uebergaenge.join(' / ')}, APD-37/F-21)`);
  if (s.aria?.role !== 'slider' || s.aria?.label !== 'Schnell rollen') E(`VoiceOver: Rolle ${s.aria?.role}, Name ${s.aria?.label} – soll Regler ‚Schnell rollen‘ (APD-37/F-15)`);
  await wait(p, 1800);
  s = await g();
  if (s.sicht) E('blendet nach 1,5 s Ruhe nicht aus (APD-37/F-4)');
  // Ziehen: Mitte, darüber hinaus (Ende, Anfang); Blase; kein Antippen, keine Geste
  // seit 4.31.0: Griff und Blase blenden über die Deckkraft ein – bis zu 1 s darauf warten (unter voller Last in WebKit nach festen
  // 150 bzw. 200 ms noch nicht über 0,5; voller Prüflauf 4.31.0, iPad schmal)
  const bis = async ok => { let z = await g(); for (let i = 0; i < 9 && !ok(z); i++) { await wait(p, 100); z = await g(); } return z; };
  await rolle(p, 80); await wait(p, 150);
  s = await bis(z => z.sicht);
  const x = (s.griff.left + s.griff.right) / 2, h = s.bahn.bottom - s.bahn.top;
  await p.mouse.move(x, (s.griff.top + s.griff.bottom) / 2); await p.mouse.down();
  await p.mouse.move(x, s.bahn.top + h / 2, { steps: 6 }); await wait(p, 200);
  let z = await bis(z => !z.marke || (z.blase?.sicht && z.blase.text === z.marke));   // seit 4.37.0: unter Last kommt der Text der Blase etwas später
  if (Math.abs(z.y - z.ende / 2) > z.ende * 0.08) E(`in die Mitte gezogen: ${z.y} px statt etwa ${Math.round(z.ende / 2)} px`);
  if (z.marke && (!z.blase?.sicht || z.blase.text !== z.marke)) E(`Blase beim Ziehen ${z.blase?.sicht ? `‚${z.blase.text}‘` : 'nicht zu sehen'}, soll ‚${z.marke}‘ (APD-37/F-19)`);
  if (!z.marke && z.blase?.sicht) E('Blase ohne Marken (APD-37/F-19)');
  if (z.blase?.sicht && (z.blase.right > z.griff.left + 1 || z.blase.left < 0 || z.blase.top < 0 || z.blase.bottom > z.ih)) E(`Blase nicht links neben dem Griff bzw. abgeschnitten (${JSON.stringify(z.blase)}, APD-37/F-19)`);
  if (!z.sicht) E('beim Ziehen ausgeblendet (APD-37/F-4)');
  await p.mouse.move(x, s.bahn.bottom + 200, { steps: 6 }); await wait(p, 150);
  z = await g();
  if (Math.abs(z.y - z.ende) > 2) E(`über das Ende der Bahn gezogen: ${z.y} px statt Ende ${z.ende} px (APD-37/F-16)`);
  await p.mouse.move(x, s.bahn.top - 200, { steps: 6 }); await wait(p, 150);
  z = await g();
  if (z.y > 1) E(`über den Anfang der Bahn gezogen: ${z.y} px statt 0 (APD-37/F-16)`);
  if (z.nav) E('Ziehen am Griff löst eine Wischgeste aus (APD-37/F-20)');
  await p.mouse.up(); await wait(p, 400);
  z = await g();
  if (z.dialog) E('nach dem Ziehen ist ein Fenster offen – darunter wurde angetippt (APD-37/F-20)');
  if (z.y > 1) E(`nach dem Loslassen weitergerollt (${z.y} px, APD-37/F-20)`);
  // APD-37/F-5: greifen, während ‚Ans Ende‘ weich rollt – das Rollen endet, der Griff folgt dem Finger. Der Griff wandert dabei schnell
  // (WebKit: über 2000 px in 60 ms); mit Playwright (bewegen, dann drücken) trifft der Druck ihn nicht sicher – deshalb greifen und
  // ziehen die Zeigerereignisse in der Seite, im selben Augenblick, in dem seine Lage gemessen wird.
  await rolle(p, 0); await wait(p, 200);
  const f5 = await p.evaluate(async R => {
    const r = eval(R), gr = document.querySelector('.schnell .griff'), w = ms => new Promise(x => setTimeout(x, ms));
    document.querySelector('.fab button:last-of-type').click(); await w(60);
    const b = gr.getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + b.height / 2, bahn = document.querySelector('.schnell').getBoundingClientRect();
    const ev = (t, cy) => gr.dispatchEvent(new PointerEvent(t, { pointerId: 7, isPrimary: true, pointerType: 'touch', clientX: x, clientY: cy, bubbles: true, cancelable: true }));
    ev('pointerdown', y);
    const zieht = document.querySelector('.schnell').classList.contains('zieht');
    const ziel = bahn.top + (bahn.height - b.height) / 4 + b.height / 2;
    for (let i = 1; i <= 4; i++) { ev('pointermove', y + (ziel - y) * i / 4); await w(16); }
    await w(500);
    const yy = r.y; ev('pointerup', ziel); await w(100);
    return { zieht, y: Math.round(yy), ende: Math.round(r.max - (parseFloat(r.el.style.getPropertyValue('--platz')) || 0)) };
  }, ROLL);
  if (!f5.zieht) E('während ‚Ans Ende‘ lässt sich der Griff nicht greifen (APD-37/F-5)');
  else if (Math.abs(f5.y - f5.ende / 4) > f5.ende * 0.1) E(`während ‚Ans Ende‘ gezogen: ${f5.y} px statt etwa ${Math.round(f5.ende / 4)} px – das weiche Rollen läuft weiter (APD-37/F-5)`);
  await p.evaluate(() => rolle.halt()); await wait(p, 300);
  // APD-37/F-11: ‚Ans Ende‘ kommt schnell an
  await rolle(p, 0); await wait(p, 200);
  const t1 = Date.now();
  await p.click('.fab button:last-of-type');
  let an = false;
  for (let i = 0; i < 40 && !an; i++) { await wait(p, 100); const a = await g(); an = Math.abs(a.ende - a.y) <= 2; }
  if (!an || Date.now() - t1 > zeit + 300) E(`‚Ans Ende‘ braucht ${Date.now() - t1} ms (höchstens ${zeit}, APD-37/F-11)`);
  // APD-37/F-15: Pfeiltaste springt einen Abschnitt (VoiceOver: Wischen nach oben/unten)
  await rolle(p, 0); await wait(p, 150);
  const sprung = await p.evaluate(R => { const r = eval(R), gr = document.querySelector('.schnell .griff'), m = [...r.el.querySelectorAll('[data-marke]')];
    if (m.length < 3) return null;
    gr.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    gr.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    const tab = m[2].closest('table'), th = tab?.tHead?.querySelector('th');
    const top = r.el.getBoundingClientRect().top + (th && getComputedStyle(th).position === 'sticky' ? th.getBoundingClientRect().height : 0);
    return { soll: m[2].dataset.marke, ab: Math.round(m[2].getBoundingClientRect().top - top) }; }, ROLL);
  if (sprung && Math.abs(sprung.ab) > 2) E(`zweimal Pfeil nach unten: ‚${sprung.soll}‘ steht ${sprung.ab} px unter dem Rand statt oben (APD-37/F-15)`);
  // APD-37/F-14: eine Meldung überdeckt Griff und Kapsel nicht
  await rolle(p, '50%'); await wait(p, 150);
  const meldung = await p.evaluate(async () => {
    if (typeof showNetToast !== 'function') return null;
    showNetToast('an'); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const t = document.querySelector('.nettoast')?.getBoundingClientRect(), teile = ['.fab', '.schnell .griff'].map(s => document.querySelector(s)).filter(e => e && e.getClientRects().length);
    const ueber = t ? teile.filter(e => { const b = e.getBoundingClientRect(); return t.left < b.right && t.right > b.left && t.top < b.bottom && t.bottom > b.top; }).map(e => e.className.split(' ')[0]) : [];
    document.querySelector('.nettoast')?.click();
    return ueber;
  });
  if (meldung?.length) E(`die Meldung überdeckt ${meldung.join(', ')} (APD-37/F-14)`);
  await rolle(p, 0); await wait(p, 200);
  return errors;
}

// R-4.5 (seit 4.28.0, APD-35, Testfall-Liste arbeit/APD-26 APD-31 APD-34 Testfall-Liste.md Abschnitt 10): ein Feld mit Fokus im Inhalt (Rollbereich)
// steht bei offener Tastatur ganz sichtbar, die Unterkante mindestens 16 px über der Tastatur (APD-34/F-1, APD-34/F-2, APD-34/F-6) – reicht der Platz
// dafür nicht, direkt unter Kopf- bzw. Suchzeile (APD-34/F-1a); Kopfzeile fest
// (R-2.1); ist es schon sichtbar, rollt nichts (APD-34/F-3); nach dem Schließen der Tastatur bleibt es sichtbar und die Seite rollt nie
// (APD-34/F-4). Braucht das Safari-Modell (tests/safari.mjs, safariModell vorher): Safari verschiebt beim Antippen eines Felds unter der
// Tastatur den sichtbaren Bereich, das Feld bleibt im Rahmen stehen – bis 4.27.1 unter der Tastatur (Messung iPhone quer).
// vorher: bringt das Feld an seinen Platz (z. B. Inhalt ans Ende rollen), wie am Gerät vor dem Antippen.
export async function checkFieldVisible(p, { field, vorher = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-4.5 ${t}`);
  if (!await p.evaluate(() => !!window.__safari)) { E('Vorbereitung: Safari-Modell fehlt (safariModell)'); return errors; }
  if (vorher) { await vorher(); await wait(p, 400); }
  // Bildschirm = Lage im Fenster minus offsetTop (Safari misst gegen den sichtbaren Bereich, Chromium gegen das Fenster)
  const lage = () => p.evaluate(({ field, R, RI }) => {
    const vv = visualViewport, o = vv.offsetTop, fe = document.querySelector(field), f = fe?.getBoundingClientRect();
    const re = document.querySelector('#app > .rolle')?.getBoundingClientRect(), k = document.querySelector('.nb, .pnav')?.getBoundingClientRect();
    const m = x => x == null ? null : Math.round(x - o);
    return { oben: m(f?.top), unten: m(f?.bottom), rolle: m(re?.top), kopf: m(k?.top), kb: Math.round(vv.height), y: Math.round(eval(R).y), fenster: Math.round(scrollY),
      fokus: document.activeElement === fe, ring: fe ? eval(RI)(fe) : 0 };
  }, { field, R: ROLL, RI: RING });
  const vorTastatur = await lage();
  if (vorTastatur.unten == null) { E(`Vorbereitung: ${field} fehlt`); return errors; }
  if (vorTastatur.unten > vorTastatur.kb || vorTastatur.oben < (vorTastatur.rolle ?? 0)) { E(`Vorbereitung: ${field} ist vor dem Antippen nicht sichtbar (${vorTastatur.oben}–${vorTastatur.unten} px)`); return errors; }
  await p.evaluate(sel => document.querySelector(sel).focus({ preventScroll: true }), field);
  await p.evaluate(() => __safari.tastatur(true)); await wait(p, 500);
  let l = await lage();
  const w = `mit Tastatur (sichtbar ${l.kb} px)`;
  // reicht der Platz nicht für 16 px Abstand (iPhone quer mit Suchzeile), steht das Feld unter Kopf- bzw. Suchzeile – seit 4.32.2 (APD-73,
  // P-69/3) mit so viel Abstand, wie Fokus-Umrandung und Schatten brauchen (RING), bis 4.32.1 direkt am Rand (oben abgeschnitten)
  const eng = l.unten - l.oben > l.kb - 16 - (l.rolle ?? 0) - l.ring;
  if (eng && Math.abs(l.oben - (l.rolle ?? 0) - l.ring) > 1)
    E(`APD-34/F-1a ${field} ${w} steht ${l.oben - (l.rolle ?? 0)} px unter Kopf- bzw. Suchzeile statt ${l.ring} px – Fokus-Umrandung und Schatten oben abgeschnitten bzw. Platz verschenkt (Inhalt ab ${l.rolle} px)`);
  else if (!eng && l.unten > l.kb - 16 + 1)
    E(`APD-34/F-1 ${field} ${w} nicht ganz über der Tastatur: ${l.oben}–${l.unten} px, Inhalt ab ${l.rolle} px, Tastatur ab ${l.kb} px (mindestens 16 px Abstand)`);
  if (l.oben < (l.rolle ?? 0) - 1) E(`APD-34/F-1 ${field} ${w} oben unter der Kopf- bzw. Suchzeile (${l.oben} px, Inhalt ab ${l.rolle} px)`);
  if (Math.abs(l.kopf ?? 0) > 1) E(`APD-34/F-1 ${w}: Kopfzeile verschoben (${l.kopf} px statt 0, R-2.1)`);
  if (!l.fokus) E(`APD-34/F-1 ${field} ${w} hat den Fokus verloren`);
  // APD-34/F-3: schon sichtbar – eine weitere Meldung von Safari rollt nichts
  const y = l.y;
  await p.evaluate(() => { visualViewport.dispatchEvent(new Event('resize')); visualViewport.dispatchEvent(new Event('scroll')); }); await wait(p, 400);
  l = await lage();
  if (Math.abs(l.y - y) > 1) E(`APD-34/F-3 ${field} ${w} schon sichtbar, trotzdem rollt der Inhalt (${y} → ${l.y} px)`);
  // APD-34/F-4: Tastatur zu – das Feld bleibt sichtbar, die Seite rollt nie
  await p.evaluate(sel => document.querySelector(sel).blur(), field);
  await p.evaluate(() => __safari.tastatur(false)); await wait(p, 500);
  l = await lage();
  if (l.unten > l.kb || l.oben < (l.rolle ?? 0) - 1) E(`APD-34/F-4 ${field} nach dem Schließen der Tastatur nicht mehr sichtbar (${l.oben}–${l.unten} px, sichtbar ${l.kb} px)`);
  if (Math.abs(l.kopf ?? 0) > 1) E(`APD-34/F-4 nach dem Schließen der Tastatur: Kopfzeile verschoben (${l.kopf} px)`);
  if (l.fenster) E(`APD-34/F-4 die Seite rollt (scrollY ${l.fenster}) – nur der Inhalt darf rollen (R-2.1)`);
  return errors;
}

// R-4.5 Tastatur ohne Springen (seit 4.28.1, APD-36, Testfall-Liste arbeit/APD-36 Testfall-Liste.md APD-36/T-1 bis APD-36/T-7 und APD-36/B-1 bis APD-36/B-18): Feld antippen,
// Tastatur auf, Feld wechseln, Tastatur zu – in jedem Bild (Aufnahme des Safari-Modells) stehen Kopfzeile, Suchzeile, Seitenleiste und
// der linke Rand eines Fensters still (± 1 px); der Fensterkopf darf sich nur auf seinen neuen Platz zu bewegen (iPad: gleitet in die
// Mitte über der Tastatur), nie darüber hinaus; das Feld mit Fokus springt nie (> 60 px zwischen zwei Bildern, APD-36/B-4: Safari stellt den
// Inhalt zurück, APD-36/S-9). Danach steht das Feld ganz über der Tastatur und die Kapsel (wenn sichtbar) 10 px darüber. Dazu:
// - APD-36/B-3: nach dem Antippen öffnet sich nichts (Safaris Klick nach dem Rollen trifft dort etwas anderes);
// - APD-36/B-18: das Feld sieht die Ereignisse des neuen Fokus nicht (kein blur – sonst z. B. ‚Pflichtfeld‘ beim ersten Antippen);
// - APD-36/B-16: der Messmodus schreibt ‚neu fokussiert‘ (wenn die App ihn hat);
// - taste (iPad, APD-36/B-6): Tastatur-Taste schließt nur die Tastatur – das Feld gibt den Fokus ab, erneutes Antippen ist still;
// - kapsel (Feld im Inhalt, APD-36/B-7, APD-36/B-8): ↑ bei offener Tastatur rollt mit einem Antippen ganz nach oben; danach ↓ endet am Ende des
//   Inhalts, kein Platz bleibt darunter stehen;
// - wischen (nur Chromium, APD-36/B-14): Wischen über das Feld fokussiert nicht und rollt nichts vorab.
// Gegen 4.28.0 rot: Safari verschiebt bei einem Feld unter der künftigen Tastatur den sichtbaren Bereich, ui.js gleicht erst 2 Bilder
// später aus (P-60). Braucht safariModell(p, ansicht, { auto: true, leisten: STILL_LEISTEN, links: STILL_LINKS }).
export const STILL_LEISTEN = { bar: '.nb, .pnav', box: '.searchbox', side: '#side', kopf: 'dialog[open] .dlg-head' };
export const STILL_LINKS = { links: 'dialog[open]' };
const STILL_NAME = { bar: 'Kopfzeile', box: 'Suchzeile', side: 'Seitenleiste', kopf: 'Fensterkopf', links: 'Fenster (linker Rand)' };
export async function checkTastaturStill(p, { field, vorher = null, wechsel = null, fab = '.fab', taste = false, kapsel = null, wischen = false, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-4.5 ${t}`);
  if (!await p.evaluate(() => !!window.__safari?.lage().hasOwnProperty('kopf'))) { E('Vorbereitung: Safari-Modell mit auto und STILL_LEISTEN fehlt'); return errors; }
  if (vorher) { await vorher(); await wait(p, 400); }
  if (!await p.locator(field).isVisible()) { E(`Vorbereitung: ${field} ist nicht sichtbar`); return errors; }
  // eine Handlung filmen: jedes Bild von davor bis 700 ms danach; der Fensterkopf darf nur zwischen vorher und nachher liegen
  const film = async (name, handlung) => {
    const a = await p.evaluate(() => __safari.lage());
    await p.evaluate(() => __safari.bilder(true));
    await handlung(); await wait(p, 700);
    const bilder = await p.evaluate(() => __safari.bilder(false)), e = await p.evaluate(() => __safari.lage());
    for (const k of Object.keys(STILL_NAME)) {
      if (a[k] == null || e[k] == null) continue;
      const still = k !== 'kopf', lo = Math.min(a[k], still ? a[k] : e[k]) - 1, hi = Math.max(a[k], still ? a[k] : e[k]) + 1;
      const aus = bilder.filter(b => b[k] != null && (b[k] < lo || b[k] > hi));
      if (aus.length) {
        const w = aus.reduce((m, b) => Math.abs(b[k] - a[k]) > Math.abs(m - a[k]) ? b[k] : m, aus[0][k]);
        E(`${name}: ${STILL_NAME[k]} springt in ${aus.length} von ${bilder.length} Bildern bis ${w} px (vorher ${a[k]}, danach ${e[k]} px)`);
      } else if (still && Math.abs(e[k] - a[k]) > 1) E(`${name}: ${STILL_NAME[k]} danach bei ${e[k]} statt ${a[k]} px`);
    }
    // APD-36/B-4: das Feld mit Fokus springt nicht (dasselbe Feld in zwei aufeinanderfolgenden Bildern). Seit 4.38.0 (RLB-103: die Prüfung
    // läuft im vollen Lauf mit) nur Bilder höchstens 40 ms auseinander – unter Volllast zeichnete WebKit beim Gleiten des iPad-Fensters
    // mit der Tastatur (0,25 s) so wenige Bilder, dass zwischen zweien 62–74 px lagen (iPad hoch, Fenster Ort; allein grün)
    for (let i = 1; i < bilder.length; i++) {
      const x = bilder[i - 1], y = bilder[i];
      if (x.feld != null && y.feld != null && x.feldId === y.feldId && y.t - x.t <= 40 && Math.abs(y.feld - x.feld) > 60) {
        E(`${name}: Feld ${y.feldId} springt von ${x.feld} auf ${y.feld} px (APD-36/B-4)`); break;
      }
    }
  };
  // Feld mit Fokus ganz über der Tastatur, Kapsel 10 px darüber (Bildschirm = Lage minus offsetTop, alle Rahmen sind fest)
  const ueber = async (name, sel) => {
    const l = await p.evaluate(({ sel, fab, RI }) => {
      const o = __safari.top(), f = document.querySelector(sel), r = f.getBoundingClientRect(), k = document.querySelector(fab);
      const ks = k && getComputedStyle(k).display !== 'none' && !k.hidden && k.getClientRects().length ? Math.round(k.getBoundingClientRect().bottom - o) : null;
      const c = f.closest('.dlg-body, #app > .rolle'), ct = c ? Math.round(c.getBoundingClientRect().top - o) : 0;
      return { oben: Math.round(r.top - o), unten: Math.round(r.bottom - o), ct, kb: __safari.hoehe(), offen: __safari.offen, fokus: document.activeElement === f, kapsel: ks,
        ring: eval(RI)(f) };
    }, { sel, fab, RI: RING });
    if (!l.fokus) E(`${name}: ${sel} hat nach dem Antippen keinen Fokus`);
    if (!l.offen) E(`${name}: die Tastatur ist nicht offen`);
    // reicht der Platz nicht (iPhone quer: 117 px sichtbar), steht das Feld oben im Rollbereich, so weit unter dem Rand wie Fokus-Umrandung
    // und Schatten reichen (wie checkFieldVisible APD-34/F-1a)
    if (l.unten - l.oben > l.kb - 16 - Math.max(0, l.ct) - l.ring ? Math.abs(l.oben - l.ct - l.ring) > 1 : l.unten > l.kb + 1 || l.oben < l.ct - 1)
      E(`${name}: ${sel} nicht ganz über der Tastatur (${l.oben}–${l.unten} px, Rollbereich ab ${l.ct}, Tastatur ab ${l.kb} px)`);
    if (l.kapsel != null && l.kapsel > l.kb - 10 + 1) E(`${name}: Kapsel unten bei ${l.kapsel} px – unter oder an der Tastatur (ab ${l.kb} px), APD-36/T-7`);
  };
  // APD-36/B-3, APD-36/B-18, APD-36/B-16: was die App beim Antippen sieht – geöffnete Fenster und Menüs, blur am Feld selbst, Zeilen des Messmodus
  const vorAntippen = sel => p.evaluate(sel => {
    const f = document.querySelector(sel); window.__b18 = 0; f.addEventListener('blur', () => window.__b18++, { once: true });
    if (typeof messStart === 'function' && !(typeof mess !== 'undefined' && mess?.an)) messStart({ app: 'Prüfung' });
    return { offen: document.querySelectorAll('dialog[open], .menu, .pop').length, y: f.closest('.dlg-body, #app > .rolle')?.scrollTop ?? 0, kb: __safari.offen };
  }, sel);
  const nachAntippen = async (name, sel, v) => {
    const n = await p.evaluate(sel => {
      const f = document.querySelector(sel), z = typeof mess !== 'undefined' && mess?.zeilen ? mess.zeilen.join('\n') : null;
      return { offen: document.querySelectorAll('dialog[open], .menu, .pop').length, blur: window.__b18, y: f.closest('.dlg-body, #app > .rolle')?.scrollTop ?? 0,
        neu: z == null ? null : new RegExp(`! neu fokussiert ${f.id || f.tagName.toLowerCase()}$`, 'm').test(z) };
    }, sel);
    if (n.offen !== v.offen) E(`${name}: nach dem Antippen von ${sel} hat sich etwas geöffnet (${v.offen} → ${n.offen} Fenster/Menüs) – Klick nach dem Rollen, APD-36/B-3`);
    if (n.blur && await p.evaluate(sel => document.activeElement === document.querySelector(sel), sel)) E(`${name}: ${sel} bekam beim Antippen ein blur, obwohl es den Fokus behält (neuer Fokus sichtbar für die App, APD-36/B-18)`);
    if (!v.kb && n.y !== v.y && n.neu === false) E(`${name}: ${sel} gerollt, aber im Messmodus keine Zeile ‚neu fokussiert‘ (APD-36/B-16)`);
  };
  let v = await vorAntippen(field);
  await film('APD-36/T-1/T-2 Feld antippen', () => p.tap(field));
  await ueber('APD-36/T-1/T-2 Feld antippen', field);
  await nachAntippen('APD-36/T-1/T-2 Feld antippen', field, v);
  if (taste) {
    // APD-36/B-6 (iPad): Tastatur-Taste – nur die Tastatur geht zu, das Feld gibt den Fokus ab; erneutes Antippen ist ein gewöhnliches
    await film('APD-36/B-6 Tastatur-Taste', () => p.evaluate(() => __safari.tastatur(false)));
    if (await p.evaluate(sel => document.activeElement === document.querySelector(sel), field)) E(`APD-36/B-6 nach der Tastatur-Taste hat ${field} noch den Fokus`);
    v = await vorAntippen(field);
    await film('APD-36/B-6 erneut antippen', () => p.tap(field));
    await ueber('APD-36/B-6 erneut antippen', field);
    await nachAntippen('APD-36/B-6 erneut antippen', field, v);
  }
  if (wechsel) {
    // wie am Gerät: das andere Feld erst mit dem Finger in den sichtbaren Teil wischen (Playwright rollte es sonst beim Antippen selbst)
    // (ein Wischen beginnt mit einer Berührung – sie beendet die Rückstellung, APD-36/B-4)
    await p.evaluate(sel => document.querySelector(sel).closest('.dlg-body, #app > .rolle')?.dispatchEvent(new Event('touchstart', { bubbles: true })), wechsel);
    await p.locator(wechsel).scrollIntoViewIfNeeded(); await wait(p, 300);
    await film('APD-36/T-5 Feld wechseln', () => p.tap(wechsel));
    await ueber('APD-36/T-5 Feld wechseln', wechsel);
  }
  if (kapsel) {
    // APD-36/B-8: ↑ bei offener Tastatur – ein Antippen genügt (das Antippen schließt die Tastatur, gerollt wird danach)
    await film('APD-36/B-8 ↑ bei offener Tastatur', () => p.tap(kapsel.hoch));
    await wait(p, 500);
    const r = await p.evaluate(() => ({ y: Math.round(document.querySelector('#app > .rolle').scrollTop), offen: __safari.offen }));
    if (r.offen) E('APD-36/B-8 nach ↑ ist die Tastatur noch offen');
    if (r.y > 1) E(`APD-36/B-8 ↑ bei offener Tastatur rollt nicht ganz nach oben (scrollTop ${r.y}) – zweites Antippen nötig`);
    // APD-36/B-7: danach ↓ – der Inhalt endet am Ende, kein Platz bleibt darunter
    await p.tap(kapsel.ende); await wait(p, 300); await rollRuht(p);
    const e = await p.evaluate(() => { const c = document.querySelector('#app > .rolle'), pl = parseFloat(c.style.getPropertyValue('--platz')) || 0;
      return { y: Math.round(c.scrollTop), max: Math.round(c.scrollHeight - c.clientHeight - pl), platz: pl }; });
    if (e.platz) E(`APD-36/B-7 nach ↑ und ↓ steht noch ${e.platz} px Platz unter dem Inhalt`);
    if (Math.abs(e.y - e.max) > 1) E(`APD-36/B-7 ↓ endet bei ${e.y} statt am Ende des Inhalts (${e.max})`);
  } else await film('APD-36/T-4 Tastatur schließen', () => p.evaluate(() => document.activeElement?.blur()));
  if (await p.evaluate(() => __safari.offen)) E('APD-36/T-4 die Tastatur ist nach dem Verlassen des Felds noch offen');
  if (wischen && p.context().browser()?.browserType().name() === 'chromium') {
    // APD-36/B-14: Wischen über das Feld (Berührung bewegt sich) – kein Fokus, nichts vorab gerollt
    const pt = await p.evaluate(sel => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: Math.round(r.left + 20), y: Math.round(r.top + r.height / 2) }; }, field);
    const cdp = await p.context().newCDPSession(p);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [pt] });
    for (let i = 1; i <= 6; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: pt.x, y: pt.y - i * 15 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await wait(p, 600);
    const w = await p.evaluate(sel => ({ fokus: document.activeElement === document.querySelector(sel), platz: [...document.querySelectorAll('.dlg-body, #app > .rolle')].some(c => c.style.getPropertyValue('--platz')) }), field);
    if (w.fokus) E(`APD-36/B-14 Wischen über ${field} gibt ihm den Fokus`);
    if (w.platz) E(`APD-36/B-14 Wischen über ${field} rollt vorab (Platz unter dem Inhalt)`);
  }
  return errors;
}

// R-6.4 Drucken (seit 4.27.0, APD-28, APD-28/F-16): mit Rahmen und Rollbereich druckt die Seite trotzdem ganz, nicht nur einen Bildschirm –
// im Druck ist nichts auf Bildschirmhöhe begrenzt. print(): startet das Drucken der App (window.print wird abgefangen);
// mehr: Mindestzahl der Seiten (Chromium druckt ein PDF und zählt die Seiten; WebKit misst die Höhe in der Druckansicht).
export async function checkPrint(p, { print, mehr = 2, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-6.4 Drucken: ${t}`);
  await p.evaluate(() => { window.__druck = 0; window.print = () => { window.__druck++; }; });
  await print(); await wait(p, 400);
  if (!await p.evaluate(() => window.__druck)) { E('die App startet das Drucken nicht'); return errors; }
  await p.emulateMedia({ media: 'print' });
  const r = await p.evaluate(() => { const cs = e => getComputedStyle(e), sichtbar = e => e && cs(e).display !== 'none' && e.getClientRects().length > 0;
    const inhalt = Math.max(...[...document.body.children].filter(sichtbar).map(e => e.getBoundingClientRect().bottom), 0);
    return { inhalt: Math.round(inhalt), h: innerHeight, html: cs(document.documentElement).overflowY + '/' + cs(document.documentElement).height,
      body: cs(document.body).overflowY, leisten: ['.nb', '.pnav', '.fab', '.searchbox'].filter(s => [...document.querySelectorAll(s)].some(sichtbar)) }; });
  if (/hidden/.test(r.html) || /hidden/.test(r.body)) E(`im Druck ist die Seite auf eine Bildschirmhöhe begrenzt (html ${r.html}, body ${r.body}) – es druckt nur ein Bildschirm`);
  if (r.leisten.length) E(`im Druck sind Leisten sichtbar: ${r.leisten.join(', ')}`);
  if (r.inhalt <= r.h) E(`Vorbereitung: der Druckinhalt ist nicht länger als ein Bildschirm (${r.inhalt} px)`);
  if (p.context().browser()?.browserType().name() === 'chromium') {
    const pdf = (await p.pdf({ format: 'A4', landscape: true })).toString('latin1');
    const seiten = (pdf.match(/\/Type\s*\/Page[^s]/g) || []).length;
    if (seiten < mehr) E(`das PDF hat ${seiten} Seite(n) statt mindestens ${mehr} – es druckt nur einen Bildschirm`);
  }
  await p.emulateMedia({ media: 'screen' });
  return errors;
}

// R-7.5 Navigation und Gesten (seit 4.30.0, APD-61 Teil 1, Variante ‚Überall‘, Testfall-Liste arbeit/APD-61 Teil 1 Testfall-Liste.md APD-61/F-1 bis APD-61/F-21).
// iPhone-Aufbau (Start in der Startliste): Öffnen schiebt den Inhalt herein (APD-61/F-1), Zurück-Knopf hinaus, zuletzt geöffneter Eintrag blau,
// Rollstand der Liste bleibt (APD-61/F-2); Zurückwischen vom Rand langsam über die halbe Breite (APD-61/F-3), halb ziehen folgt dem Finger und federt
// zurück (APD-61/F-4), kurz und schnell (APD-61/F-5), aus der Mitte (APD-61/F-6); senkrecht und schräg (APD-61/F-7), im waagrecht rollenden Bereich (APD-61/F-8), nach
// links, auf Knöpfen und der Kapsel (APD-61/F-9) kein Zurück; Wischen während ‚Ans Ende‘ weich rollt (APD-61/F-10); Drehen beim Ziehen (APD-61/F-14);
// offenes Menü (APD-61/F-15); Tastatur offen (APD-61/F-16); langes Drücken, dann ziehen (APD-61/F-17); Escape bzw. VoiceOver-‚Zurück‘ (APD-61/F-20); je Bild nur
// transform und opacity, keine langen Bildlücken (APD-61/F-21); die Messung zeichnet Berührungen und Gesten-Entscheidungen auf (APD-61/F-22, seit 4.30.1);
// mit Berührung nach Safari (APD-67/S-10): Zurückwischen mit 10–14 px senkrechter Abweichung über einem antippbaren Kasten (kasten) und
// daneben geht zurück, senkrecht rollt weiter (APD-67/F-23, seit 4.30.2, APD-67 – die gemessenen Züge aus P-65). iPad hoch (Start mit offenem Eintrag, Seitenleiste weg): vom Rand und aus der
// Mitte herein, folgt dem Finger mit wachsender Abdunkelung (APD-67/F-11), nach links auf Seitenleiste bzw. Abdunkelung, panel-left, Abdunkelung
// antippen (APD-61/F-12), Drehen (APD-61/F-14), Menü (APD-61/F-15), Escape. iPad quer: Wischen ändert nichts (APD-61/F-13). ‚Bewegung reduzieren‘ (Seite mit
// reducedMotion: 'reduce'): Überblenden statt Schieben (APD-61/F-19). Mit der Maus nachgebildet (Playwright kennt kein Wischen mit dem Finger).
// eintrag: Zeile der Startliste bzw. Seitenleiste, die geöffnet wird; titel: ihr Titel (steht danach in der Leiste); zurueck: Zurück-Knopf;
// waagrecht: Bereich mit eigenem waagrechtem Rollen; knopf: Schaltfläche in der Leiste; menue: öffnet ein Menü; suche: Mehr-Knopf mit ‚Suchen‘ (sucheAuf)
// (Feld bekommt den Fokus); seitenKnopf: panel-left.
export async function checkNavigation(p, { eintrag, titel, zurueck = '#back', waagrecht = null, knopf = null, menue = null, suche = null,
  seitenKnopf = '[data-side-toggle]', kasten = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-7.5 ${t}`);
  const lage = () => p.evaluate(() => {
    const H = document.documentElement, side = document.getElementById('side'), app = document.getElementById('app');
    const sicht = e => !!e && !e.hidden && getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden' && e.getClientRects().length > 0;
    const shade = document.querySelector('.side-shade');
    return { phone: H.classList.contains('phone'), liste: sicht(side) && side.classList.contains('page'), seite: sicht(side) && !side.classList.contains('page') && side.getBoundingClientRect().right > 0,
      inhalt: !!app?.querySelector(':scope > .rolle') && sicht(app), appX: Math.round(app.getBoundingClientRect().left), sideX: Math.round(side.getBoundingClientRect().left),
      sideW: Math.round(side.getBoundingClientRect().width), appO: +getComputedStyle(app).opacity, sideO: +getComputedStyle(side).opacity, appT: getComputedStyle(app).transform,
      schatten: shade ? +getComputedStyle(shade).opacity : null, nav: (H.className.match(/nav-\w+/g) || []).join(' '), w: innerWidth, h: innerHeight,
      titel: document.querySelector('#app .pnav-title, #app .nb-title')?.textContent || '', fokus: document.activeElement?.matches?.('input, textarea') || false,
      ruhig: matchMedia('(prefers-reduced-motion: reduce)').matches, menue: !!document.querySelector('.menu'),
      ta: (e => e ? getComputedStyle(e).touchAction : null)(document.querySelector('#app > .rolle')) };
  });
  // zeichnet je Bild Lage und Deckkraft von Inhalt und Liste auf (Einzelproben hängen unter Last vom Zeitpunkt ab) – seit 4.30.1 (APD-66) bis
  // zum Ende der Bewegung (nav-Klasse erst gesehen, dann weg), mindestens 0,6 s, höchstens 3 s: unter Volllast begann die Überblendung
  // in WebKit erst nach über 1 s; dazu Anfang und Ziel der Web-Animation (‚nav‘) von Inhalt und Liste – unter Volllast zeigt WebKit
  // manchmal kein Bild mitten in der Bewegung, dann belegen die Keyframes das Schieben bzw. Überblenden
  const aufzeichnen = () => p.evaluate(() => { window.__bilder = []; window.__bilderFertig = false; let gesehen = false;
    const t0 = performance.now(), H = document.documentElement, app = document.getElementById('app'), side = document.getElementById('side');
    const anim = e => { const a = e.getAnimations?.().find(x => x.id === 'nav'), k = a?.effect?.getKeyframes?.();
      return k?.length ? { t: [k[0].transform, k.at(-1).transform].map(String), o: [k[0].opacity, k.at(-1).opacity].map(Number) } : null; };
    const bild = () => { const s = getComputedStyle(side), nav = /\bnav-/.test(H.className), dt = performance.now() - t0; gesehen ||= nav;
      window.__bilder.push({ appX: app.getBoundingClientRect().left, sideX: side.getBoundingClientRect().left, appO: +getComputedStyle(app).opacity,
        appT: getComputedStyle(app).transform, liste: !side.hidden && s.display !== 'none' && side.classList.contains('page'), appA: anim(app), sideA: anim(side) });
      if (dt < 3000 && (dt < 600 || !gesehen || nav)) requestAnimationFrame(bild); else window.__bilderFertig = true; };
    requestAnimationFrame(bild); });
  const bilder = async () => { await p.waitForFunction(() => window.__bilderFertig, null, { timeout: 5000 }).catch(() => {}); return p.evaluate(() => window.__bilder); };
  const schiebt = a => !!a && a.t[0] !== a.t[1] && /translate/.test(a.t.join(' '));
  const geschoben = (b, w) => b.some(x => x.appX > 1 && x.appX < w - 1 && x.liste) || b.some(x => x.liste && schiebt(x.appA));
  const listeWeicht = b => b.some(x => x.sideX < -1) || b.some(x => schiebt(x.sideA));
  const ueberblendet = b => (b.some(x => x.appT === 'none' && x.appO > 0.02 && x.appO < 0.98) || b.some(x => x.appA && x.appA.o[0] !== x.appA.o[1] && x.appA.t.every(t => t === 'none')))
    && b.every(x => x.appT === 'none');
  const ruhig = async () => { for (let i = 0; i < 30; i++) { await wait(p, 100); if (!(await lage()).nav) return; } };
  // seit 4.45.0 (APD-68/Q-8): kein Ziehen-und-Ablegen, wenn ein Zug auf einem Link beginnt (safari.mjs mausWieFinger)
  // seit 4.31.0: vorher keine Textmarkierung – ein senkrechter Mauszug markiert in WebKit Text, der nächste Zug darauf würde ein
  // Ziehen-und-Ablegen beginnen und WebKit verschluckt die Mausereignisse (am Gerät mit dem Finger gibt es das nicht)
  // Tempo, das die App beim letzten schnellen Zug sah – wie navEnde in ui.js: die Spur der letzten 100 ms vor dem Loslassen (kommt das
  // Loslassen unter Last spät an, war es kein schnelles Wischen)
  let tempo = 0;
  const spurStart = () => p.evaluate(() => { window.__spur = []; window.__los = undefined; if (!window.__spurAn) { window.__spurAn = true;
    for (const typ of ['pointerdown', 'pointermove']) addEventListener(typ, e => window.__spur?.push([e.timeStamp, e.clientX]), true);
    addEventListener('pointerup', e => { window.__los = e.timeStamp; }, true); } });
  const spurTempo = () => p.evaluate(() => { const s = (window.__spur || []).filter(x => x[0] >= (window.__los ?? Infinity) - 100), z = s.at(-1);
    return s.length > 1 && z[0] > s[0][0] ? Math.abs(z[1] - s[0][1]) / (z[0] - s[0][0]) : 0; });
  const ziehe = async (x0, y0, x1, y1, { schnell = false, los = true, halten = 0 } = {}) => {
    await p.evaluate(() => getSelection()?.removeAllRanges()); await mausWieFinger(p);
    if (schnell) await spurStart();
    await p.mouse.move(x0, y0); await p.mouse.down();
    if (halten) await wait(p, halten);
    const n = schnell ? 4 : Math.max(6, Math.round(Math.hypot(x1 - x0, y1 - y0) / 12));
    for (let i = 1; i <= n; i++) { await p.mouse.move(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n); await wait(p, schnell ? 8 : 16); }
    if (!los) return;
    if (!schnell) await wait(p, 150);
    await p.mouse.up();
    if (schnell) tempo = await spurTempo();
    await ruhig(); await wait(p, 100);
    await keinTippen(`Wischen von ${Math.round(x0)}/${Math.round(y0)} nach ${Math.round(x1)}/${Math.round(y1)}`);
  };
  // Schnelles Wischen (seit 4.37.0, APD-82): unter Last kommen die Bewegungen langsamer bei der Seite an, als sie geschickt werden – dann
  // sah die App kein schnelles Wischen (dreimal im vollen Lauf). Es zählt nur ein Zug, den die App wirklich schnell sah (ab 0,3 px/ms);
  // sonst bis zu dreimal neu. Geprüft wird danach wie bisher.
  const schnellerZug = async (zug, geschafft) => { const t = []; for (let k = 0; k < 3; k++) { await zug(); t.push(tempo.toFixed(2)); if (tempo >= 0.3 || await geschafft()) break; } return ` (Tempo ${t.join('/')} px/ms)`; };
  // Wischen tippt nie an, worauf es begann (kein Fenster geht auf)
  const keinTippen = async wo => {
    if (!await p.evaluate(() => !!document.querySelector('dialog[open]'))) return;
    E(`${wo}: danach ist ein Fenster offen – das Wischen hat angetippt`);
    await p.keyboard.press('Escape'); await wait(p, 400);
  };
  const box = sel => p.evaluate(s => { const e = [...document.querySelectorAll(s)].find(x => x.getClientRects().length && getComputedStyle(x).visibility !== 'hidden');
    if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2, l: b.left, r: b.right, t: b.top, b: b.bottom }; }, sel);
  let l = await lage();
  const { w, h } = l;
  if (l.phone) {
    if (!l.liste) { E('Vorbereitung: Start nicht in der Startliste'); return errors; }
    const offen = async wo => { l = await lage(); if (!l.inhalt || l.liste || Math.abs(l.appX) > 1) { E(`${wo}: Inhalt nicht offen (Liste ${l.liste}, Inhalt bei ${l.appX} px)`); return false; } return true; };
    const zu = async wo => { l = await lage(); if (!l.liste || l.inhalt) { E(`${wo}: nicht zurück in der Startliste (Liste ${l.liste}, Inhalt ${l.inhalt})`); return false; } return true; };
    const oeffne = async () => { await p.locator(eintrag).first().click(); await ruhig(); await wait(p, 100); };
    // APD-67/F-1: Öffnen – der Inhalt schiebt sich herein, die Liste weicht nach links (‚Bewegung reduzieren‘: überblenden)
    // Rollstand so, dass der Eintrag im oberen Drittel steht (der gewählte Eintrag bleibt sichtbar, R-7.1)
    let listeRoll = await p.evaluate(s => { const e = document.querySelector('#side .side-list'), r = document.querySelector(s); if (!e || !r || e.scrollHeight <= e.clientHeight + 40) return null;
      e.scrollTop = e.scrollTop + r.getBoundingClientRect().top - e.getBoundingClientRect().top - Math.max(6, Math.min(e.clientHeight / 3, e.clientHeight - r.getBoundingClientRect().height - 12)); return e.scrollTop; }, eintrag);   // ganz sichtbar, auch wenn die Kachel bei großer Schrift hoch ist
    await wait(p, 150);
    if (listeRoll !== null) listeRoll = await p.evaluate(() => document.querySelector('#side .side-list').scrollTop);
    await aufzeichnen(); await p.locator(eintrag).first().click();
    let bf = await bilder();
    if (l.ruhig) { if (!ueberblendet(bf)) E(`APD-61/F-19 Öffnen mit ‚Bewegung reduzieren‘ überblendet nicht (${bf.length} Bilder, Deckkraft ${[...new Set(bf.map(x => x.appO.toFixed(2)))].join(' ')})`); }
    else if (!geschoben(bf, w) || !listeWeicht(bf)) E(`APD-67/F-1 Öffnen: kein Schieben (${bf.length} Bilder, Inhalt bei ${[...new Set(bf.map(x => Math.round(x.appX)))].join(' ')} px)`);
    await ruhig(); await wait(p, 100);
    if (!await offen('APD-67/F-1 Öffnen')) return errors;
    if (!/pan-y/.test(l.ta) || /pan-x|manipulation|auto/.test(l.ta)) E(`APD-67/F-6 touch-action des Inhalts ‚${l.ta}‘ – waagrecht muss das Wischen bei der App ankommen (pan-y, 13)`);
    if (titel && !l.titel.includes(titel)) E(`APD-67/F-1 Titel ‚${l.titel}‘ statt ‚${titel}‘`);
    // APD-61/F-2: Zurück-Knopf
    await aufzeichnen(); await p.click(zurueck);
    bf = await bilder();
    if (l.ruhig) { if (!ueberblendet(bf)) E(`APD-61/F-19 Zurück mit ‚Bewegung reduzieren‘ überblendet nicht (${bf.length} Bilder, Deckkraft ${[...new Set(bf.map(x => x.appO.toFixed(2)))].join(' ')})`); }
    else if (!geschoben(bf, w)) E(`APD-61/F-2 Zurück-Knopf: kein Schieben (${bf.length} Bilder, Inhalt bei ${[...new Set(bf.map(x => Math.round(x.appX)))].join(' ')} px)`);
    await ruhig(); await wait(p, 100);
    if (await zu('APD-61/F-2 Zurück-Knopf')) {
      const blau = await p.evaluate(() => [...document.querySelectorAll('#side .side-row.current')].map(r => r.textContent));
      if (titel && (blau.length !== 1 || !blau[0].includes(titel))) E(`APD-61/F-2 zuletzt geöffneter Eintrag nicht blau (blau: ${JSON.stringify(blau)}, R-7.2)`);
      const roll = await p.evaluate(() => document.querySelector('#side .side-list')?.scrollTop);
      if (listeRoll !== null && Math.abs(roll - listeRoll) > 1) E(`APD-61/F-2 Rollstand der Startliste ${roll} px statt ${listeRoll} px (APD-38/T-7)`);
    }
    // APD-61/F-3: vom Rand langsam über die halbe Breite
    await oeffne();
    await ziehe(4, h * 0.6, w * 0.7, h * 0.6 + 6); await zu('APD-61/F-3 vom Rand über die halbe Breite');
    // APD-61/F-4: halb ziehen, innehalten – folgt dem Finger, beide Seiten sichtbar; loslassen federt zurück
    await oeffne();
    await ziehe(4, h * 0.6, w * 0.35, h * 0.6, { los: false }); await wait(p, 60);
    l = await lage();
    if (!l.ruhig && Math.abs(l.appX - (w * 0.35 - 4)) > w * 0.06) E(`APD-61/F-4 die Seite folgt dem Finger nicht (Inhalt bei ${l.appX} px, Finger ${Math.round(w * 0.35 - 4)} px)`);
    if (!l.liste) E('APD-61/F-4 beim Ziehen ist die Startliste darunter nicht zu sehen');
    if (l.ruhig && !(l.appO > 0.3 && l.appO < 0.9)) E(`APD-61/F-19 Ziehen mit ‚Bewegung reduzieren‘: Deckkraft ${l.appO} – soll dem Finger folgen`);
    await wait(p, 150); await p.mouse.up(); await ruhig(); await wait(p, 100);
    await offen('APD-61/F-4 unter der Hälfte losgelassen');
    // APD-61/F-5: kurz und schnell vom Rand
    const t5 = await schnellerZug(() => ziehe(4, h * 0.6, 110, h * 0.6, { schnell: true }), async () => { const x = await lage(); return x.liste && !x.inhalt; });
    await zu('APD-61/F-5 schnelles Wischen vom Rand' + t5);
    // APD-67/F-6: aus der Mitte (Überall)
    await oeffne();
    await ziehe(w * 0.3, h * 0.7, w * 0.95, h * 0.7); await zu('APD-67/F-6 aus der Mitte nach rechts');
    // APD-67/F-7: senkrecht, schräg (mehr senkrecht)
    await oeffne();
    await ziehe(w * 0.3, h * 0.75, w * 0.3 + 4, h * 0.35); await offen('APD-67/F-7 senkrecht gewischt');
    await ziehe(w * 0.5, h * 0.6, w * 0.5 + 30, h * 0.6 - 60); await offen('APD-67/F-7 schräg (mehr senkrecht) gewischt');
    // APD-67/F-8: Bereich mit eigenem waagrechtem Rollen
    if (waagrecht) {
      const b = await box(waagrecht);
      const eigen = b && await p.evaluate(s => { const e = document.querySelector(s); return e.scrollWidth > e.clientWidth + 1; }, waagrecht);
      if (!b || !eigen || b.b > h - 10 || b.t < 0) E(`APD-67/F-8 Vorbereitung: ${waagrecht} nicht sichtbar oder ohne waagrechtes Rollen`);
      else { await ziehe(b.l + 10, b.y, Math.min(w - 4, b.l + 10 + w * 0.6), b.y); await offen('APD-67/F-8 im waagrecht rollenden Bereich gewischt'); }
    }
    // APD-61/F-9: nach links; auf Knopf und Kapsel
    await ziehe(w * 0.8, h * 0.6, w * 0.1, h * 0.6); await offen('APD-61/F-9 nach links gewischt');
    for (const sel of [knopf, '.fab button:not([hidden])'].filter(Boolean)) {
      const b = await box(sel);
      if (b && b.r < w * 0.7) { await ziehe(b.x, b.y, b.x + w * 0.6, b.y); await offen(`APD-61/F-9 auf ${sel} gewischt`); }
      if (await p.evaluate(() => !!document.querySelector('dialog[open], .menu'))) { await p.keyboard.press('Escape'); await wait(p, 300); await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); }
    }
    // APD-61/F-10: Wischen, während ‚Ans Ende‘ weich rollt
    if (await box('.fab button:last-of-type:not([hidden])')) {
      await p.click('.fab button:last-of-type'); await wait(p, 40);
      await ziehe(w * 0.3, h * 0.6, w * 0.95, h * 0.6); await zu('APD-61/F-10 Wischen während des weichen Rollens');
      await oeffne();
    }
    // APD-61/F-15: offenes Menü – kein Zurück
    if (menue) {
      await p.click(menue); await wait(p, 300);
      if (!(await lage()).menue) E(`APD-61/F-15 Vorbereitung: ${menue} öffnet kein Menü`);
      await ziehe(w * 0.2, h * 0.7, w * 0.9, h * 0.7); await offen('APD-61/F-15 Wischen bei offenem Menü');
      if ((await lage()).menue) { await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); }
    }
    // APD-67/F-17: erst halten, dann ziehen – kein Zurück
    await ziehe(w * 0.3, h * 0.7, w * 0.9, h * 0.7, { halten: 700 }); await offen('APD-67/F-17 nach langem Drücken gezogen');
    if ((await lage()).menue) { await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); }
    // APD-61/F-21: je Bild nur transform und opacity; keine langen Bildlücken beim Ziehen
    await p.evaluate(() => {
      const els = [document.getElementById('app'), document.getElementById('side'), document.querySelector('.fab'), document.querySelector('.nav-schleier')].filter(Boolean);
      const props = e => new Set([...e.style].map(String));
      window.__nav = { vor: els.map(props), els, mehr: new Set(), bilder: [], an: true };
      window.__nav.mo = new MutationObserver(ms => ms.forEach(m => { const i = els.indexOf(m.target); if (i >= 0) props(m.target).forEach(x => { if (!window.__nav.vor[i].has(x)) window.__nav.mehr.add(x); }); }));
      els.forEach(e => window.__nav.mo.observe(e, { attributes: true, attributeFilter: ['style'] }));
      const bild = t => { if (!window.__nav.an) return; window.__nav.bilder.push(t); requestAnimationFrame(bild); }; requestAnimationFrame(bild);
    });
    await ziehe(w * 0.2, h * 0.6, w * 0.45, h * 0.6);
    const f21 = await p.evaluate(() => { const n = window.__nav; n.an = false; n.mo.disconnect(); const b = n.bilder; let luecke = 0; for (let i = 1; i < b.length; i++) luecke = Math.max(luecke, b[i] - b[i - 1]);
      return { mehr: [...n.mehr].filter(x => !['transform', 'opacity'].includes(x)), luecke: Math.round(luecke), bilder: b.length }; });
    if (f21.mehr.length) E(`APD-61/F-21 beim Ziehen ändern sich ${f21.mehr.join(', ')} – nur transform und opacity (APD-59)`);
    if (f21.luecke > 250) E(`APD-61/F-21 beim Ziehen ${f21.luecke} ms ohne Bild (APD-59)`);
    await offen('APD-61/F-21 unter der Hälfte losgelassen');
    // APD-67/F-14: Drehen während des Ziehens – Zustand wie vorher
    await ziehe(w * 0.2, h * 0.6, w * 0.5, h * 0.6, { los: false });
    await p.setViewportSize({ width: h, height: w }); await wait(p, 400);
    await p.mouse.up(); await ruhig(); await wait(p, 300);
    await keinTippen('APD-67/F-14 Loslassen nach dem Drehen');
    l = await lage();
    if (!l.inhalt || l.liste || Math.abs(l.appX) > 1 || l.nav) E(`APD-67/F-14 nach dem Drehen beim Ziehen: Liste ${l.liste}, Inhalt bei ${l.appX} px, ${l.nav || 'keine Bewegung'} – soll wie vor dem Ziehen`);
    await p.setViewportSize({ width: w, height: h }); await wait(p, 400);
    // APD-61/F-16: Tastatur offen (Suche) – Wischen schließt sie und geht zurück
    if (suche) {
      await sucheAuf(p, suche); await wait(p, 300);
      await p.evaluate(() => document.querySelector('#app input[type=search], #app .searchbox input')?.focus());
      await ziehe(w * 0.3, h * 0.7, w * 0.95, h * 0.7);
      l = await lage();
      if (l.fokus) E('APD-61/F-16 nach dem Zurückwischen hat das Suchfeld noch den Fokus (Tastatur offen)');
      await zu('APD-61/F-16 Zurückwischen bei offener Tastatur');
      await oeffne();
    }
    // APD-67/F-22 (seit 4.30.1, APD-67 Schritt 1): die Messung zeichnet Berührungen (Zeiger mit Lage, Art und Ziel, touchcancel) und die
    // Entscheidungen der Gestenstelle auf – fertig, zurück gefedert und abgebrochen (pointercancel und touchcancel nachgebildet, wie
    // Safari sie vermutlich über einem antippbaren Kasten schickt); keine Texte
    await p.evaluate(() => { messStart({ app: 'Prüfung' }); addEventListener('pointerdown', e => { window.__zid = e.pointerId; }, true); });
    await ziehe(w * 0.3, h * 0.7, w * 0.95, h * 0.7); await zu('APD-67/F-22 Zurückwischen während der Messung');
    await oeffne();
    await ziehe(w * 0.2, h * 0.6, w * 0.4, h * 0.6); await offen('APD-67/F-22 unter der Hälfte losgelassen während der Messung');
    await ziehe(w * 0.2, h * 0.6, w * 0.4, h * 0.6, { los: false });
    await p.evaluate(([x, y]) => { const t = document.elementFromPoint(x, y) || document.body;
      t.dispatchEvent(new PointerEvent('pointercancel', { pointerId: window.__zid, isPrimary: true, pointerType: 'touch', clientX: x, clientY: y, bubbles: true }));
      t.dispatchEvent(new Event('touchcancel', { bubbles: true })); }, [w * 0.4, h * 0.6]);
    await p.mouse.up(); await ruhig(); await wait(p, 100);
    await keinTippen('APD-67/F-22 Loslassen nach dem Abbruch');
    const mz = await p.evaluate(() => { messAus(); const z = mess.zeilen; mess = null; return z; });
    for (const [re, was] of [[/! zeiger down \d+ \d+ mouse \S/, '‚zeiger down‘ mit Lage, Art und Ziel'], [/! zeiger move \d+ \d+ mouse /, '‚zeiger move‘'], [/! zeiger up \d+ \d+ mouse /, '‚zeiger up‘'],
      [/! zeiger cancel \d+ \d+ touch /, '‚zeiger cancel‘'], [/! touchcancel \d+ \S/, '‚touchcancel‘'], [/! nav kandidat phone$/, '‚nav kandidat‘'], [/! nav aktiv phone -?\d+ -?\d+$/, '‚nav aktiv‘ mit Weg'],
      [/! nav fertig weg [\d.]+ tempo -?[\d.]+$/, '‚nav fertig‘'], [/! nav zurück gefedert weg [\d.]+ tempo -?[\d.]+$/, '‚nav zurück gefedert‘'], [/! nav abgebrochen weg [\d.]+ tempo -?[\d.]+$/, '‚nav abgebrochen‘']])
      if (!mz.some(x => re.test(x))) E(`APD-67/F-22 Messung ohne Zeile ${was} (APD-67)`);
    if (titel && mz.some(x => x.includes(titel))) E(`APD-67/F-22 Messung enthält den Text ‚${titel}‘ (nur Längen und ids)`);
    l = await lage();
    if (l.nav || l.liste === l.inhalt) E(`APD-67/F-22 nach dem Abbruch halb (Liste ${l.liste}, Inhalt ${l.inhalt}, ${l.nav || 'keine Bewegung'})`);
    if (l.liste) await oeffne();
    // APD-67/F-23 (seit 4.30.2, APD-67, Messung P-65): Berührung nach Safari (safari.mjs APD-22/S-10) – ab 10 px senkrechter Abweichung rollt Safari
    // und bricht die Berührung ab, wenn die Geste touchmove nicht verhindert. Die gemessenen Züge: waagrecht 136/217/289 px bei 14/14/13 px
    // senkrecht in 180/130/250 ms, über einem Kasten und daneben (oben im Inhalt) – alle gehen zurück; senkrecht rollt Safari weiter.
    const zug = (dx, dy, n, ms) => Array.from({ length: n }, (_, i) => [Math.round(dx * (i + 1) / n), Math.round(dy * (i + 1) / n), Math.round(ms / n)]);
    const zuege = [['136/14 in 180 ms', zug(136, 14, 12, 180)], ['217/14 in 130 ms', zug(217, 14, 10, 130)], ['289/-13 in 250 ms', zug(289, -13, 11, 250)]];
    // daneben: eine Stelle im oberen Teil des Inhalts außerhalb der Kästen, an der die Gestenstelle zuständig ist (gemessen: dt im Kopf)
    const orte = [['neben den Kästen', async () => {
      await p.evaluate(() => document.querySelector('#app > .rolle')?.scrollTo(0, 0)); await wait(p, 150);
      const xy = await p.evaluate(([w, h, k]) => { for (let y = h * 0.15; y < h * 0.6; y += 12) for (let x = w * 0.08; x < w * 0.4; x += 12) {
        const t = document.elementFromPoint(x, y); if (!t || (k && t.closest(k))) continue;
        if (navKandidat({ button: 0, isPrimary: true, target: t })) return [x, y]; } return null; }, [w, h, kasten]);
      if (!xy) E('APD-67/F-23 Vorbereitung: keine Stelle neben den Kästen, an der zurückgewischt werden kann');
      return xy;
    }]];
    if (kasten) orte.unshift([`über ${kasten}`, async () => {
      await p.evaluate(s => document.querySelector(s)?.scrollIntoView({ block: 'center' }), kasten); await wait(p, 150);
      const b = await box(kasten);
      // seit 4.37.0: bei großer Schrift kann ein Kasten höher als der Bildschirm sein – dann zählt sein sichtbarer Teil
      if (!b || b.t > h - 20 || b.b < 20) { E(`APD-67/F-23 Vorbereitung: ${kasten} nicht sichtbar`); return null; }
      return [Math.min(b.x, w * 0.4), Math.min(Math.max(b.y, b.t + 10, 20), b.b - 10, h - 20)];
    }]);
    for (const [wo, ort] of orte) for (const [wie, schritte] of zuege) {
      const xy = await ort(); if (!xy) break;
      // APD-82: sah die App den Zug unter Last nicht schnell (Loslassen zu spät), bis zu dreimal neu
      let r, t = [];
      for (let k = 0; k < 3; k++) {
        await spurStart(); r = await safariWischen(p, xy[0], xy[1], schritte); tempo = await spurTempo(); await ruhig(); await wait(p, 100);
        await keinTippen(`APD-67/F-23 ${wo} ${wie}`);
        l = await lage(); t.push(tempo.toFixed(2));
        if ((l.liste && !l.inhalt) || tempo >= 0.3 || r.abgebrochen) break;
      }
      if (!l.liste || l.inhalt) E(`APD-67/F-23 Zurückwischen mit Berührung ${wo} (${wie}): ${r.abgebrochen ? 'Safari rollt und bricht ab (pointercancel)' : 'nicht zurück'} – die Seite federt zurück (Ziel ${r.ziel}, Tempo ${t.join('/')} px/ms, APD-67)`);
      if (l.liste) await oeffne();
    }
    // APD-67/H-5: die Messung zeigt, ob Safari das Rollen noch erlaubt (‚touchmove verhindert‘ nach der Entscheidung)
    { const xy = await orte.at(-1)[1](); if (xy) {
      await p.evaluate(() => messStart({ app: 'Prüfung' })); await safariWischen(p, xy[0], xy[1], zuege[0][1]); await ruhig(); await wait(p, 100);
      const mz = await p.evaluate(() => { messAus(); const z = mess.zeilen; mess = null; return z; });
      if (!mz.some(x => x.endsWith('! touchmove verhindert'))) E('APD-67/F-23 Messung ohne Zeile ‚touchmove verhindert‘ (APD-67)');
      if ((await lage()).liste) await oeffne(); } }
    const senk = await safariWischen(p, w * 0.3, h * 0.7, zug(4, -120, 10, 160)); await ruhig(); await wait(p, 100);
    if (!senk.abgebrochen || !senk.gerollt) E(`APD-67/F-23 senkrecht mit Berührung rollt nicht (gerollt ${senk.gerollt} px) – vor der Entscheidung darf nichts das Rollen verhindern`);
    await offen('APD-67/F-23 senkrecht gewischt');
    // APD-61/F-20: Escape (VoiceOver ‚Zurück‘) geht zurück
    await p.evaluate(() => document.activeElement?.blur?.());
    await p.keyboard.press('Escape'); await ruhig(); await wait(p, 100);
    await zu('APD-61/F-20 Escape bzw. VoiceOver-‚Zurück‘');
    return errors;
  }
  // iPad – seit 4.45.0 (APD-97, R-7.5) hoch wie quer: die Seitenleiste steht fest neben dem Inhalt, keine Abdunkelung mehr
  {
    // APD-68/Q-1 bis APD-68/Q-12 (seit 4.31.0, APD-68 Variante B ‚Mitschieben‘, Testfall-Liste arbeit/APD-68 Testfall-Liste.md): quer steht die Seitenleiste fest
    // links; ausgeblendet holt Wischen nach rechts von überall im Inhalt sie herein – der Inhalt rückt mit dem Finger nach rechts, fertig
    // nach halber Breite oder schnellem Wischen, dann rastet sie ein und der Inhalt wird schmaler (oberster Kasten bleibt); sonst federt
    // sie zurück. Ausblenden quer nur mit panel-left (gleitet); nach links wischen ändert nichts (Kacheln frei für Wischaktionen, APD-38/T-10).
    const fest = l => l.seite && l.sideX >= 0 && Math.abs(l.appX - (l.sideX + l.sideW + 4)) <= 2;
    const da = async (soll, wo) => { l = await lage();
      if (soll ? !fest(l) : (l.seite || Math.abs(l.appX) > 1)) E(`${wo}: Seitenleiste ${l.seite ? `da (bei ${l.sideX} px, Inhalt bei ${l.appX} px)` : `weg (Inhalt bei ${l.appX} px)`}, soll ${soll ? 'fest da' : 'weg, Inhalt ganz breit'}`); };
    // oberster sichtbarer Kasten im Rollbereich (Nummer und Abstand zum oberen Rand) – bleibt beim Ein- und Ausblenden (R-8.1)
    const oben = () => p.evaluate(k => { const r = document.querySelector('#app > .rolle'); if (!r) return null; const top = r.getBoundingClientRect().top;
      const alle = [...r.querySelectorAll(k || '.box')]; const i = alle.findIndex(b => b.getBoundingClientRect().bottom > top + 1);
      return i < 0 ? null : { i, ab: Math.round(alle[i].getBoundingClientRect().top - top) }; }, kasten);
    const gleich = (a, b) => !a || !b || (a.i === b.i && Math.abs(a.ab - b.ab) <= 3);
    const zu = async wo => { const z = await box('#sideHide'); if (!z) { E(`${wo}: panel-left in der Seitenleiste fehlt`); return; } await p.mouse.click(z.x, z.y); await ruhig(); await wait(p, 100); };
    await da(true, 'APD-68/Q-1 Start (quer und hoch)');
    if (!/pan-y/.test(l.ta) || /pan-x|manipulation|auto/.test(l.ta)) E(`APD-68/Q-1 touch-action des Inhalts ‚${l.ta}‘ – waagrecht muss das Wischen bei der App ankommen (pan-y, 13)`);
    // APD-68/Q-2: nach links auf der festen Seitenleiste – sie bleibt
    // schnell, damit es kein langes Drücken auf einer Kachel wird (Kontextmenü)
    await ziehe(l.sideX + l.sideW * 0.8, h * 0.7, 10, h * 0.7, { schnell: true });
    if ((await lage()).menue) { await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); }
    await da(true, 'APD-68/Q-2 nach links auf der Seitenleiste');
    // APD-68/Q-3: panel-left blendet aus – sie gleitet hinaus, der Inhalt wird ganz breit, der oberste Kasten bleibt
    await p.evaluate(() => { const r = document.querySelector('#app > .rolle'); r?.scrollTo(0, Math.min(900, r.scrollHeight / 3)); }); await wait(p, 150);
    let vorher = await oben();
    { const z = await box('#sideHide');
      if (z) { await aufzeichnen(); await p.mouse.click(z.x, z.y); const bf = await bilder();
        if (!l.ruhig && !bf.some(x => (x.sideX < -1 && x.sideX > -400) || schiebt(x.sideA))) E(`APD-68/Q-3 panel-left: die Seitenleiste gleitet nicht hinaus (bei ${[...new Set(bf.map(x => Math.round(x.sideX)))].join(' ')} px)`);
        await ruhig(); await wait(p, 100); } }
    await da(false, 'APD-68/Q-3 panel-left in der Seitenleiste');
    let nachher = await oben();
    if (!gleich(vorher, nachher)) E(`APD-68/Q-3 beim Ausblenden springt der Inhalt (oberster Kasten ${vorher?.i}/${vorher?.ab} px → ${nachher?.i}/${nachher?.ab} px)`);
    // APD-68/Q-4: halb ziehen – Seitenleiste folgt dem Finger, der Inhalt rückt mit; unter der Hälfte langsam losgelassen → federt zurück
    await ziehe(w * 0.45, h * 0.75, w * 0.45 + 140, h * 0.75, { los: false }); await wait(p, 60);
    l = await lage();
    if (!l.seite) E('APD-68/Q-4 beim Ziehen kommt die Seitenleiste nicht');
    else if (!l.ruhig && !(l.sideX < 0 && l.sideX > -l.sideW)) E(`APD-68/Q-4 die Seitenleiste folgt dem Finger nicht (bei ${l.sideX} px, Breite ${l.sideW})`);
    if (!l.ruhig && Math.abs(l.appX - 140) > 30) E(`APD-68/Q-4 der Inhalt rückt nicht mit dem Finger (bei ${l.appX} px statt etwa 140)`);
    await wait(p, 150); await p.mouse.up(); await ruhig(); await wait(p, 100);
    await da(false, 'APD-68/Q-4 unter der Hälfte losgelassen');
    // APD-68/Q-5: über die halbe Breite – rastet ein, Inhalt schmaler, oberster Kasten bleibt
    vorher = await oben();
    await ziehe(w * 0.4, h * 0.75, w * 0.4 + 330, h * 0.78);
    await da(true, 'APD-68/Q-5 aus der Mitte über die halbe Breite');
    l = await lage();
    if (l.seite && Math.abs((w - l.appX) - (await p.evaluate(() => document.getElementById('app').getBoundingClientRect().width))) > 2) E('APD-68/Q-5 der Inhalt wird nicht schmaler (reicht über den rechten Rand)');
    nachher = await oben();
    if (!gleich(vorher, nachher)) E(`APD-68/Q-5 beim Einrasten springt der Inhalt (oberster Kasten ${vorher?.i}/${vorher?.ab} px → ${nachher?.i}/${nachher?.ab} px)`);
    if (await box(seitenKnopf)) E(`APD-68/Q-5 nach dem Einrasten steht noch ${seitenKnopf} im Kopf`);
    // APD-68/Q-6: kurz und schnell
    await zu('APD-68/Q-6 Vorbereitung');
    const t6 = await schnellerZug(() => ziehe(w * 0.5, h * 0.75, w * 0.5 + 110, h * 0.75, { schnell: true }), async () => (await lage()).seite);
    await da(true, 'APD-68/Q-6 kurz und schnell nach rechts' + t6);
    // APD-68/Q-7: Vorrang – senkrecht, schräg (mehr senkrecht), nach links: nichts
    await zu('APD-68/Q-7 Vorbereitung');
    await ziehe(w * 0.6, h * 0.75, w * 0.6 + 4, h * 0.35); await da(false, 'APD-68/Q-7 senkrecht');
    await ziehe(w * 0.5, h * 0.6, w * 0.5 + 40, h * 0.6 - 90); await da(false, 'APD-68/Q-7 schräg (mehr senkrecht)');
    await ziehe(w * 0.8, h * 0.6, w * 0.3, h * 0.6); await da(false, 'APD-68/Q-7 nach links');
    // APD-68/Q-8: offenes Menü – keine Geste
    if (menue) {
      await p.click(menue); await wait(p, 300);
      await ziehe(w * 0.4, h * 0.85, w * 0.95, h * 0.85); await da(false, 'APD-68/Q-8 Wischen bei offenem Menü');
      if ((await lage()).menue) { await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); }
    }
    // APD-68/Q-9: Berührung nach Safari (APD-67/S-10), 14 px senkrecht – Safari bricht nicht ab, die Seitenleiste kommt; senkrecht rollt Safari
    const zug = (dx, dy, n, ms) => Array.from({ length: n }, (_, i) => [Math.round(dx * (i + 1) / n), Math.round(dy * (i + 1) / n), Math.round(ms / n)]);
    { const r = await safariWischen(p, w * 0.45, h * 0.6, zug(320, 14, 14, 250)); await ruhig(); await wait(p, 100);
      await keinTippen('APD-68/Q-9 Berührung');
      if (r.abgebrochen) E('APD-68/Q-9 Hereinwischen mit Berührung: Safari rollt und bricht ab (pointercancel, APD-67)');
      await da(true, 'APD-68/Q-9 Berührung leicht schräg'); }
    await zu('APD-68/Q-9 Vorbereitung senkrecht');
    { const r = await safariWischen(p, w * 0.6, h * 0.7, zug(4, -120, 10, 160)); await ruhig(); await wait(p, 100);
      if (!r.abgebrochen || !r.gerollt) E(`APD-68/Q-9 senkrecht mit Berührung rollt nicht (gerollt ${r.gerollt} px)`);
      await da(false, 'APD-68/Q-9 senkrecht mit Berührung'); }
    // APD-68/Q-10: Messung – ‚nav kandidat fest‘ … ‚nav fertig‘
    await p.evaluate(() => messStart({ app: 'Prüfung' }));
    await ziehe(w * 0.4, h * 0.75, w * 0.4 + 330, h * 0.75);
    { const mz = await p.evaluate(() => { messAus(); const z = mess.zeilen; mess = null; return z; });
      if (!mz.some(x => x.endsWith('! nav kandidat fest')) || !mz.some(x => /! nav fertig/.test(x))) E('APD-68/Q-10 Messung ohne ‚nav kandidat fest‘ bzw. ‚nav fertig‘'); }
    await da(true, 'APD-68/Q-10 Wischen mit Messung');
    // APD-68/Q-11: Drehen während des Ziehens – bricht ab, Zustand bleibt (weg), auch nach dem Zurückdrehen
    await zu('APD-68/Q-11 Vorbereitung');
    await ziehe(w * 0.45, h * 0.75, w * 0.45 + 160, h * 0.75, { los: false });
    await p.setViewportSize({ width: h, height: w }); await wait(p, 400);
    await p.mouse.up(); await ruhig(); await wait(p, 300);
    await keinTippen('APD-68/Q-11 Loslassen nach dem Drehen');
    l = await lage();
    if (l.nav) E(`APD-68/Q-11 nach dem Drehen beim Ziehen läuft noch ${l.nav}`);
    if (l.seite) E('APD-68/Q-11 nach dem Drehen beim Ziehen ist die Seitenleiste da');
    await p.setViewportSize({ width: w, height: h }); await wait(p, 500);
    await da(false, 'APD-68/Q-11 Drehen beim Ziehen und zurück');
    // APD-68/Q-12: panel-left im Kopf blendet ein – sie gleitet herein (Ende: fest da, wie beim Start)
    const k = await box(seitenKnopf);
    if (k) {
      await aufzeichnen(); await p.mouse.click(k.x, k.y); const bf = await bilder();
      if (!l.ruhig && !bf.some(x => (x.sideX < -1 && x.sideX > -400) || schiebt(x.sideA))) E(`APD-68/Q-12 panel-left: die Seitenleiste gleitet nicht herein (bei ${[...new Set(bf.map(x => Math.round(x.sideX)))].join(' ')} px)`);
      await ruhig(); await wait(p, 100);
    } else E(`APD-68/Q-12 Vorbereitung: ${seitenKnopf} fehlt`);
    await da(true, 'APD-68/Q-12 panel-left im Kopf');
    return errors;
  }
  return errors;
}

// R-4.6 Blatt auf dem iPhone (seit 4.32.0, APD-61 Teil 2; Testfall-Liste arbeit/APD-61 Teil 2 Testfall-Liste.md B1–B24): open() öffnet ein Fenster,
// change() ändert darin etwas (fehlt es, ist das Fenster ohne Eingaben, z. B. die Vorschau), field = ein Feld darin (Tastatur, B10).
// Seit 4.32.1 (APD-71, P-68/2.3): B10 und B19 mit dem Safari-Modell (tests/safari.mjs, für diese Fälle eingesetzt und wieder
// herausgenommen) – Feld antippen, Tastatur auf, R-4.5 rollt das Feld in die obere Hälfte; der Zug auf dem Feld zieht trotzdem das
// Blatt (wie am Kopf), im gerollten Inhalt neben dem Feld schließt er nur die Tastatur.
// iPhone-Aufbau: ein Blatt von knapp unter der Statusleiste bis unten, gleitet von unten herein (‚Bewegung reduzieren‘: überblendet), die
// Seite weicht hoch verkleinert zurück, quer nicht; Ziehen am Kopf folgt dem Finger und federt zurück, weit oder schnell schließt, im
// gerollten Inhalt bleibt es, waagerecht bleibt es; mit Änderungen federt es zurück und fragt am x; Abdunkelung und Escape wie x; Drehen
// lässt es offen. Seit 4.38.0 (APD-72, Testfall-Liste arbeit/APD-72 Testfall-Liste.md APD-72/D-1 bis APD-72/D-15) im iPad-Aufbau dieselben Fälle: das Fenster
// bleibt in der Mitte, gleitet von unten herein und hinaus, beim Ziehen fährt nur das Fenster mit, die Abdunkelung wird heller, die
// Seite bleibt; Antippen der Abdunkelung schließt nicht (APD-72/D-12). Meldungen nennen am iPad die Nummer APD-72/D-n, am iPhone Bn.
// ok = Häkchen, das ohne Änderung schließt (APD-72/D-11; nur wo die App es angibt).
export async function checkSheet(p, { open, change = null, field = null, ok = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-4.6 ${t}`);
  const ruhig = async () => { await wait(p, 120); await navFertig(p); await wait(p, 120); };
  const lage = () => p.evaluate(() => {
    const d = document.getElementById('dlg'), r = d.getBoundingClientRect(), cs = getComputedStyle(d), H = document.documentElement;
    const seite = [document.getElementById('app'), document.getElementById('side')].filter(e => e && e.getClientRects().length && getComputedStyle(e).position === 'fixed');
    const t = cs.translate && cs.translate !== 'none' ? parseFloat(cs.translate.split(' ')[1]) || 0 : 0;
    const probe = document.body.appendChild(document.createElement('i')); probe.style.backgroundColor = 'var(--dlg-bg)';
    const soll = getComputedStyle(probe).backgroundColor; probe.remove();
    return { open: d.open, top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), t: Math.round(t),
      radius: parseFloat(cs.borderTopLeftRadius) || 0, phone: H.classList.contains('phone'), blatt: H.classList.contains('blatt'), faehrt: H.classList.contains('blatt-faehrt'),
      zurueck: seite.some(e => { const s = getComputedStyle(e).scale; return s && s !== 'none' && parseFloat(s) < 0.99; }),
      vvTop: Math.round(visualViewport?.offsetTop || 0), vvH: Math.round(visualViewport?.height || innerHeight), h: innerHeight, w: innerWidth,
      pop: [...document.querySelectorAll('.pop button')].map(b => b.textContent.trim()), geist: !!document.querySelector('.blatt-geist'),
      bg: cs.backgroundColor, soll, quer: matchMedia('(orientation: landscape) and (max-height: 500px)').matches,
      // APD-72: Abdunkelung (Schleier) und ob die Seite dahinter sich bewegt (verschoben bzw. verkleinert)
      schleier: +(+getComputedStyle(document.querySelector('.blatt-schleier') || document.body).opacity || 0).toFixed(3), backdrop: getComputedStyle(d, '::backdrop').backgroundColor,
      seiteBewegt: seite.some(e => { const c = getComputedStyle(e); return (c.translate && c.translate !== 'none' && !/^0px( 0px)?$/.test(c.translate)) || (c.scale && c.scale !== 'none' && c.scale !== '1'); }),
      fokus: !!document.activeElement?.matches?.('#dlg input, #dlg textarea') };
  });
  const kopf = async () => { const b = await p.locator('#dlg .dlg-head h3').boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
  // Ziehen mit dem Zeiger: langsam (danach still, Tempo 0) oder schnell (kurz und ohne Pause)
  const zieh = async ({ x, y }, dx, dy, schnell = false) => {
    await p.mouse.move(x, y); await p.mouse.down();
    if (schnell) {
      // in einem Zug in der Seite mit festen Zeitstempeln (je 8 ms): unter Last kamen Mausbewegungen bzw. Ereignisse so verzögert an,
      // dass beim Loslassen kein Tempo mehr blieb
      await p.mouse.up();
      const mitten = await p.evaluate(({ x, y, dx, dy }) => {
        const d = document.getElementById('dlg'), el = document.elementFromPoint(x, y), opt = (cx, cy) => ({ bubbles: true, cancelable: true, composed: true, isPrimary: true, pointerId: 77, pointerType: 'touch', button: 0, clientX: cx, clientY: cy });
        const t0 = performance.now(), sende = (art, cx, cy, i) => { const e = new PointerEvent(art, opt(cx, cy)); Object.defineProperty(e, 'timeStamp', { value: t0 + 8 * i }); el.dispatchEvent(e); };
        sende('pointerdown', x, y, 0);
        for (let i = 1; i <= 4; i++) sende('pointermove', x + dx * i / 4, y + dy * i / 4, i);
        const t = getComputedStyle(d).translate, m = t && t !== 'none' ? Math.round(parseFloat(t.split(' ')[1]) || 0) : 0;
        const zieht = document.documentElement.classList.contains('blatt-zieht');
        sende('pointerup', x + dx, y + dy, 5);
        window.__b4 = `getroffen ${el.id || el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''}, ${zieht ? 'gezogen' : 'nicht gezogen'} ${m} px`;
        return m;
      }, { x, y, dx, dy });
      await ruhig();
      return { ...(await lage()), t: mitten };
    }
    else { await p.mouse.move(x + dx * 0.1, y + dy * 0.1, { steps: 3 }); await p.mouse.move(x + dx, y + dy, { steps: 10 }); await wait(p, 160); }
    const mitten = await lage();
    await p.mouse.up();
    await ruhig();
    return mitten;
  };
  const zu = async () => { const l = await lage(); if (!l.open) return; await p.evaluate(() => document.getElementById('dlg').close()); await ruhig(); };
  const auf = async () => { await zu(); await open(); await ruhig(); return lage(); };
  const weg = async (was) => {
    // unter Last (voller Lauf, WebKit) endet das Hinausgleiten verspätet – bis zu 3 s auf das Schließen warten
    await p.waitForFunction(() => !document.getElementById('dlg').open, null, { timeout: 3000 }).catch(() => {});
    const l = await lage();
    if (l.open) { E(`${was}: das Fenster bleibt offen (Blatt ${l.t} px versetzt, ${await p.evaluate(() => document.documentElement.className)}${l.pop.length ? ', Rückfrage offen' : ''})`); await zu(); return false; }
    await wait(p, 600); const n = await lage();
    if (n.blatt || n.zurueck) E(`${was}: nach dem Schließen bleibt die Seite zurückgewichen bzw. abgedunkelt`);
    if (n.geist) E(`${was}: das Abbild des Blatts bleibt nach dem Schließen stehen`);
    return true; };

  // B1 Form und Öffnen
  await zu();
  await open();
  const frueh = await lage();
  await ruhig();
  let l = await lage();
  if (!l.open) { E('das Fenster öffnet nicht'); return errors; }
  const ipad = !l.phone, nr = (b, d) => ipad ? `APD-72/${d} iPad:` : d.startsWith('D-') && b === d ? `APD-72/${d}` : b;
  const reduziert = await p.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const T = l.quer ? 8 : null;
  if (!l.blatt) E(`${nr('B1', 'D-1')} das Fenster ist kein Blatt (html.blatt fehlt)`);
  if (ipad) {
    // APD-72/D-1 (APD-72): in der Mitte, ganz sichtbar, nicht bildschirmbreit; abgedunkelt wie bisher (0,35), ::backdrop durchsichtig
    if (Math.abs(l.left - (l.w - l.right)) > 2 || l.left < 1) E(`APD-72/D-1 iPad: das Fenster steht nicht in der Mitte (${l.left}–${l.right} von ${l.w} px)`);
    if (l.top < l.vvTop || l.bottom > l.vvTop + l.vvH + 1) E(`APD-72/D-1 iPad: das Fenster ist nicht ganz sichtbar (${l.top}–${l.bottom} px, sichtbar ${l.vvTop}–${l.vvTop + l.vvH} px)`);
    if (Math.abs(l.schleier - 0.35) > 0.02) E(`APD-72/D-1 iPad: Abdunkelung ${l.schleier} statt 0,35`);
    if (!/rgba\(0, 0, 0, 0\)|transparent/.test(l.backdrop)) E(`APD-72/D-1 iPad: ::backdrop dunkelt zusätzlich ab (${l.backdrop})`);
    if (l.zurueck || l.seiteBewegt) E('D-2 iPad: die Seite dahinter weicht zurück bzw. bewegt sich');
  } else {
    if (T !== null && Math.abs(l.top - l.vvTop - T) > 1) E(`B17 quer: das Blatt beginnt bei ${l.top - l.vvTop} px statt 8 px`);
    if (T === null && (l.top - l.vvTop < 8 || l.top - l.vvTop > 70)) E(`B1 das Blatt beginnt bei ${l.top - l.vvTop} px – erwartet knapp unter der Statusleiste`);
    if (Math.abs(l.bottom - (l.vvTop + l.vvH)) > 1) E(`B1 das Blatt endet bei ${l.bottom} px statt am unteren Rand (${l.vvTop + l.vvH} px)`);
    if (l.left > 0 || l.right < l.w) E(`B1 das Blatt ist nicht bildschirmbreit (${l.left}–${l.right} von ${l.w} px)`);
    if (l.radius < 12) E(`B1 das Blatt hat oben keine runden Ecken (${l.radius} px)`);
    if (l.quer && l.zurueck) E('B17 quer: die Seite weicht zurück');
    if (!l.quer && !l.zurueck && !reduziert) E('B1 die Seite dahinter weicht nicht verkleinert zurück');
    // seit 4.35.0 (APD-43 M5, R-1.9): mit ‚Bewegung reduzieren‘ weicht die Seite nicht verkleinert zurück (kein Zoomen)
    if (reduziert && l.zurueck) E('M5 ‚Bewegung reduzieren‘: die Seite dahinter weicht verkleinert zurück');
  }
  if (l.t) E(`${nr('B1', 'D-1')} das Blatt ruht nicht an seinem Platz (${l.t} px versetzt)`);
  if (l.bg !== l.soll) E(`${nr('B24', 'D-20')} Hintergrund des Blatts ${l.bg} statt --dlg-bg (${l.soll})`);
  if (reduziert && frueh.t) E(`${nr('B22', 'D-13')} ‚Bewegung reduzieren‘: das Blatt gleitet (${frueh.t} px) statt überzublenden`);
  if (!reduziert && frueh.t < 20 && !frueh.faehrt) E(`${nr('B1', 'D-1')} das Blatt gleitet nicht von unten herein (kurz nach dem Öffnen ${frueh.t} px versetzt, keine Bewegung)`);
  // APD-72/D-14 (APD-72): Anfassen mitten im Gleiten – hält dort an und folgt dem Finger (die Bewegung wird dazu angehalten, damit der Fall
  // nicht von der Last abhängt)
  if (!reduziert) {
    await zu(); await open();
    // ein Viertel der Zeit: das Blatt ist schon zu sehen, aber noch nicht oben
    const mitten = await p.evaluate(() => { const a = document.getAnimations().filter(x => x.effect?.target?.id === 'dlg');
      a.forEach(x => { x.pause(); x.currentTime = x.effect.getTiming().duration / 4; });
      const t = getComputedStyle(document.getElementById('dlg')).translate; return { n: a.length, t: Math.round(parseFloat((t || '').split(' ')[1]) || 0) }; });
    if (!mitten.n || mitten.t < 20) E(`${nr('D-14', 'D-14')} Vorbereitung: kein Gleiten nach dem Öffnen (${mitten.n} Bewegungen, ${mitten.t} px)`);
    else {
      const b = await p.locator('#dlg .dlg-head').boundingBox(), x = b.x + b.width / 2, y = b.y + b.height / 2;
      await p.mouse.move(x, y); await p.mouse.down(); await p.mouse.move(x, y + 30, { steps: 6 }); await wait(p, 200);
      const h = await lage();
      if (h.faehrt || Math.abs(h.t - (mitten.t + 30)) > 12) E(`${nr('D-14', 'D-14')} Anfassen mitten im Gleiten: das Blatt hält nicht an bzw. folgt dem Finger nicht (${h.t} px statt ${mitten.t + 30} px${h.faehrt ? ', gleitet weiter' : ''})`);
      await p.mouse.up(); await ruhig();
      const n = await lage();
      if (!n.open) E(`${nr('D-14', 'D-14')} Anfassen mitten im Gleiten schließt das Fenster`);
      else if (n.t) E(`${nr('D-14', 'D-14')} nach dem Anfassen mitten im Gleiten federt es nicht zurück (${n.t} px)`);
    }
    l = await auf();
  }

  // B2 ein Stück ziehen, langsam loslassen: folgt dem Finger, federt zurück
  let m = await zieh(await kopf(), 0, 120);
  if (Math.abs(m.t - 120) > 12) E(`${nr('B2', 'D-2')} das Blatt folgt dem Finger nicht (${m.t} px statt 120 px)`);
  if (reduziert && Math.abs(m.t - 120) > 12) E(`${nr('B22', 'D-13')} ‚Bewegung reduzieren‘: das Ziehen folgt dem Finger nicht`);
  // APD-72/D-2 (APD-72): am iPad wird beim Ziehen nur die Abdunkelung heller, die Seite bleibt
  if (ipad && !(m.schleier < l.schleier - 0.01)) E(`APD-72/D-2 iPad: die Abdunkelung wird beim Ziehen nicht heller (${m.schleier} bei ${l.schleier})`);
  if (ipad && (m.zurueck || m.seiteBewegt)) E('D-2 iPad: beim Ziehen bewegt sich die Seite dahinter');
  l = await lage();
  if (!l.open) { E(`${nr('B2', 'D-2')} ein Stück ziehen schließt das Fenster`); l = await auf(); }
  else if (l.t) E(`${nr('B2', 'D-2')} das Blatt federt nicht zurück (${l.t} px)`);
  // B7 waagerecht ziehen: bleibt
  m = await zieh(await kopf(), 140, 10);
  if (m.t) E(`${nr('B7', 'D-7')} waagerecht ziehen bewegt das Blatt (${m.t} px)`);
  if (!(await lage()).open) { E(`${nr('B7', 'D-7')} waagerecht ziehen schließt das Fenster`); await auf(); }
  // APD-72/D-8 (APD-72): im Zug nach oben über den Platz hinaus – Gummiband, federt zurück (erst nach unten: nur so beginnt der Zug)
  // der waagerechte Mauszug davor (B7) hat den Titel markiert – ein Mauszug auf einer Markierung zieht sie (der Finger am Gerät nicht)
  await p.evaluate(() => getSelection().removeAllRanges());
  { const k = await kopf(), hoch = Math.round(Math.min(60, k.y - 4));
    await p.mouse.move(k.x, k.y); await p.mouse.down(); await p.mouse.move(k.x, k.y + 20, { steps: 4 }); await p.mouse.move(k.x, k.y - hoch, { steps: 10 }); await wait(p, 160);
    m = await lage(); await p.mouse.up(); await ruhig();
    if (!(m.t < 0 && m.t > -hoch)) E(`${nr('D-8', 'D-8')} nach oben ziehen: kein Gummiband (${m.t} px bei −${hoch} px)`); }
  l = await lage();
  if (!l.open || l.t) E(`${nr('D-8', 'D-8')} nach oben ziehen: das Blatt ${l.open ? `federt nicht zurück (${l.t} px)` : 'schließt'}`);
  if (!l.open) l = await auf();
  // B5 Inhalt gerollt: im Inhalt nach unten ziehen bewegt das Blatt nicht
  const gerollt = await p.evaluate(() => { const b = document.querySelector('#dlg .dlg-body'); b.scrollTop = 80; return b.scrollTop; });
  if (gerollt > 0) {
    const b = await p.locator('#dlg .dlg-body').boundingBox();
    m = await zieh({ x: b.x + b.width / 2, y: b.y + 60 }, 0, 250);
    if (m.t) E(`${nr('B5', 'D-5')} im gerollten Inhalt folgt das Blatt dem Finger (${m.t} px)`);
    if (!(await lage()).open) { E(`${nr('B5', 'D-5')} im gerollten Inhalt schließt Ziehen das Fenster`); await auf(); }
    await p.evaluate(() => { document.querySelector('#dlg .dlg-body').scrollTop = 0; });
  }
  // B3 weit nach unten ziehen: schließt
  m = await zieh(await kopf(), 0, Math.round(l.h * 0.6));
  if (m.t < l.h * 0.5) E(`${nr('B3', 'D-3')} das Blatt folgt dem Finger nicht nach unten (${m.t} px)`);
  await weg(`${nr('B3', 'D-3')} weit nach unten ziehen`);
  // B4 kurz und schnell wischen: schließt
  await auf();
  await zieh(await kopf(), 0, 70, true);
  await weg(`${nr('B4', 'D-4')} schnell nach unten wischen (${await p.evaluate(() => window.__b4)})`);
  // B6 im Inhalt ganz oben nach unten: schließt
  await auf();
  const b6 = await p.locator('#dlg .dlg-body').boundingBox();
  await zieh({ x: b6.x + b6.width - 8, y: b6.y + 24 }, 0, Math.round(l.h * 0.6));
  await weg(`${nr('B6', 'D-6')} im Inhalt ganz oben nach unten ziehen`);
  l = await auf();
  if (ipad) {
    // APD-72/D-12 (APD-72, wie iPadOS): Antippen der Abdunkelung schließt am iPad nicht
    await p.mouse.click(Math.max(5, l.left / 2), Math.max(5, l.top / 2)); await ruhig();
    const n = await lage();
    if (!n.open) { E('D-12 iPad: Antippen der Abdunkelung schließt das Fenster'); l = await auf(); }
    else if (n.t) E(`APD-72/D-12 iPad: nach dem Antippen der Abdunkelung ist das Fenster versetzt (${n.t} px)`);
  } else {
    // B11 Abdunkelung oben antippen: wie x
    await p.mouse.click(l.w / 2, Math.max(2, Math.round((l.top - l.vvTop) / 2) + l.vvTop)); await ruhig();
    await weg('B11 Abdunkelung antippen');
  }
  // B12 bzw. D-11 (APD-72) x, Häkchen und Escape: das Blatt gleitet nach unten hinaus (‚Bewegung reduzieren‘: das Abbild blendet aus)
  for (const [was, tu] of [['x', () => p.click('#dlg #dlgX')], ...(ok ? [['Häkchen', () => p.click(ok)]] : []), ['Escape', () => p.keyboard.press('Escape')]]) {
    if (!(await lage()).open) await auf();
    if (was === 'x' && !await p.locator('#dlg #dlgX').count()) continue;
    await tu();
    // unter Last kommt die Taste in WebKit verzögert an – bis zu 3 s auf das Schließen warten (wie weg)
    await p.waitForFunction(() => !document.getElementById('dlg').open, null, { timeout: 3000 }).catch(() => {});
    // die Bewegung des Abbilds selbst (Anfang und Ziel) – unter Last begann sie in WebKit erst nach über 120 ms (iPad hoch)
    const g = await p.evaluate(() => {
      const g = document.querySelector('.blatt-geist'), y = v => Math.round(parseFloat(String(v ?? '0 0').split(' ')[1]) || 0);
      const k = g?.getAnimations()[0]?.effect.getKeyframes() || [];
      return { da: !!g, offen: document.getElementById('dlg').open, von: y(k[0]?.translate), nach: y(k.at(-1)?.translate), aus: k.length > 1 && +k.at(-1).opacity === 0,
        unten: g ? Math.round(innerHeight - g.getBoundingClientRect().top) : 0 };
    });
    if (g.offen) E(`${nr('B12', 'D-11')} ${was}: das Fenster bleibt offen`);
    else if (!g.da) E(`${nr('B12', 'D-11')} ${was}: das Fenster verschwindet sofort (kein Abbild, das hinausgleitet)`);
    else if (!reduziert && !(g.nach > g.von && g.nach - g.von >= g.unten - 2)) E(`${nr('B12', 'D-11')} ${was}: das Abbild gleitet nicht nach unten hinaus (${g.von} → ${g.nach} px, bis unten ${g.unten} px)`);
    else if (reduziert && (!g.aus || g.nach !== g.von)) E(`${nr('B22', 'D-13')} ‚Bewegung reduzieren‘ ${was}: das Abbild ${g.aus ? 'gleitet' : 'blendet nicht aus'}`);
    await ruhig();
    await weg(`${nr('B12', 'D-11')} ${was}`);
  }
  // B21 Drehen mit offenem Blatt: bleibt offen, quer volle Höhe ohne Zurückweichen, hoch mit
  l = await auf();
  const vp = p.viewportSize();
  await p.setViewportSize({ width: vp.height, height: vp.width }); await wait(p, 400); await ruhig();
  const d = await lage();
  if (!d.open) E(`${nr('B21', 'D-15')} Drehen schließt das Blatt`);
  else if (ipad) {
    // APD-72/D-15 (APD-72): am iPad bleibt das Fenster offen in der Mitte und ganz sichtbar (R-8.1)
    if (!d.blatt) E('D-15 iPad: nach dem Drehen fehlt html.blatt');
    if (d.t) E(`APD-72/D-15 iPad: nach dem Drehen ruht das Fenster nicht an seinem Platz (${d.t} px)`);
    if (Math.abs(d.left - (d.w - d.right)) > 2) E(`APD-72/D-15 iPad: nach dem Drehen steht das Fenster nicht in der Mitte (${d.left}–${d.right} von ${d.w} px)`);
    if (d.top < d.vvTop || d.bottom > d.vvTop + d.vvH + 1) E(`APD-72/D-15 iPad: nach dem Drehen ist das Fenster nicht ganz sichtbar (${d.top}–${d.bottom} px)`);
    if (d.zurueck || d.seiteBewegt) E('D-15 iPad: nach dem Drehen weicht die Seite zurück');
  } else {
    if (!d.blatt) E('B21 nach dem Drehen ist das Fenster kein Blatt mehr');
    if (d.t) E(`B21 nach dem Drehen ruht das Blatt nicht an seinem Platz (${d.t} px)`);
    if (d.quer && d.zurueck) E('B21 nach dem Drehen quer weicht die Seite zurück');
    if (!d.quer && !d.zurueck) E('B21 nach dem Drehen hoch weicht die Seite nicht zurück');
    if (Math.abs(d.bottom - (d.vvTop + d.vvH)) > 1) E(`B21 nach dem Drehen endet das Blatt bei ${d.bottom} px statt ${d.vvTop + d.vvH} px`);
  }
  await p.setViewportSize(vp); await wait(p, 400); await ruhig();
  await zu();
  if (!change) return errors;
  // B8 mit Änderung weit ziehen: zäh, federt zurück, Sprechblase am x; ‚Weiter bearbeiten‘ lässt es offen
  const vorher = await auf();
  await change(); await wait(p);
  // APD-72/D-21 (seit 4.39.0, APD-83): am iPad ändert eine Eingabe Breite und Lage des Fensters nicht (P-76/4: die Meldung zum
  // Zeitraum machte ‚Neues Reiselogbuch‘ breiter)
  if (ipad) { const n = await lage(); if (Math.abs(n.left - vorher.left) > 1 || Math.abs(n.right - vorher.right) > 1) E(`APD-72/D-21 iPad: nach der Eingabe steht das Fenster bei ${n.left}–${n.right} px statt ${vorher.left}–${vorher.right} px (Breite und Lage bleiben)`); }
  m = await zieh(await kopf(), 0, Math.round(l.h * 0.6));
  if (m.t > l.h * 0.6 * 0.5) E(`${nr('B8', 'D-9')} mit Änderungen ist das Ziehen nicht zäh (${m.t} px bei ${Math.round(l.h * 0.6)} px)`);
  await wait(p, 300);
  l = await lage();
  if (!l.open) E(`${nr('B8', 'D-9')} mit Änderungen schließt Ziehen das Fenster ohne Rückfrage`);
  else {
    if (l.t) E(`${nr('B8', 'D-9')} mit Änderungen federt das Blatt nicht zurück (${l.t} px)`);
    if (!l.pop.some(t => /Änderungen verwerfen/.test(t)) || !l.pop.some(t => /Weiter bearbeiten/.test(t))) E(`${nr('B8', 'D-9')} mit Änderungen fragt Ziehen nicht ‚Änderungen verwerfen‘ / ‚Weiter bearbeiten‘ (${l.pop.join(' · ') || 'keine Abfrage'})`);
    else {
      await p.locator('.pop button', { hasText: 'Weiter bearbeiten' }).click(); await ruhig();
      if (!(await lage()).open) E(`${nr('B8', 'D-9')} ‚Weiter bearbeiten‘ schließt das Fenster`);
    }
  }
  // B19 und B10 bei offener Tastatur (Safari-Modell): Feld antippen – R-4.5 rollt es in die obere Hälfte, der Inhalt steht nicht mehr
  // ganz oben (am Gerät P-68/2.3: der Zug auf dem Feld schloss nur die Tastatur, erst der zweite zog das Blatt)
  if (field && (await lage()).open) {
    const eigen = !await p.evaluate(() => !!window.__safari);
    if (eigen) await safariModell(p, ipad ? (l.w > l.h ? 'iPad quer' : 'iPad hoch') : l.quer ? 'iPhone quer' : 'iPhone hoch', { auto: true });
    const tippen = async () => {
      // ein Mauszug wählt Text aus, Chromium fokussiert beim Antippen einer Auswahl nicht (der Finger am Gerät wählt nichts aus)
      await p.evaluate(() => getSelection().removeAllRanges());
      await p.locator(field).first().tap(); await wait(p, 600);
      return p.evaluate(({ sel, RI }) => {
        const f = document.querySelector(`#dlg ${sel}`) || document.querySelector(sel), b = f.closest('.dlg-body'), r = f.getBoundingClientRect(), br = b.getBoundingClientRect();
        const x = Math.round(br.left + 4), y = Math.round((r.top + r.bottom) / 2), t = document.elementFromPoint(x, y);
        return { gerollt: Math.round(b.scrollTop), tastatur: !!window.__safari?.offen, fokus: document.activeElement === f, abstand: Math.round(r.top - br.top), ring: eval(RI)(f),
          feld: { x: Math.round(r.left + Math.min(40, r.width / 2)), y: Math.round(r.top + Math.min(14, r.height / 2)) },
          daneben: t && !t.closest('input, textarea, select, button') && b.contains(t) ? { x, y } : null };
      }, { sel: field, RI: RING });
    };
    const tastaturZu = async () => { await wait(p, 300); await p.evaluate(() => { if (window.__safari?.offen) __safari.tastatur(false); }); await wait(p, 300); };
    // B19 im gerollten Inhalt neben dem Feld nach unten ziehen: nur die Tastatur schließt, das Blatt bleibt, keine Rückfrage. Seit 4.32.2
    // (APD-73, P-69/3) auch, wenn der Finger zuerst nach oben geht (gemessen am Rand: 244 → 231 → 76 → 302, entschieden war nach 8 px)
    let g;
    for (const [art, wege] of [['nach unten ziehen', [[0, 200]]], ['erst nach oben, dann nach unten ziehen', [[0, -20], [0, 200]]]]) {
      g = await tippen();
      if (!g.fokus || !g.tastatur) { E(`${nr('B10', 'D-10')} Vorbereitung: nach dem Antippen von ${field} ${g.fokus ? '' : 'kein Fokus '}${g.tastatur ? '' : 'keine Tastatur'}`); break; }
      // R-4.5 (seit 4.32.2, APD-73, P-69/3 quer): über dem Feld bleibt Platz für Fokus-Umrandung und Schatten
      if (art === 'nach unten ziehen' && g.abstand < g.ring - 1) E(`${nr('B10', 'D-10')} ${field} mit Fokus steht ${g.abstand} px unter dem oberen Rand des Inhalts – Fokus-Umrandung und Schatten (${g.ring} px) oben abgeschnitten`);
      if (g.gerollt > 0 && g.daneben) {
        // als Berührung (Zeigerereignisse in der Seite, je 16 ms wie gemessen): ein Mausklick auf den Inhalt nimmt dem Feld in Chromium
        // schon beim Drücken den Fokus – am Gerät nicht, sonst wäre der Fall nie rot
        await p.evaluate(({ x, y, wege }) => {
          const el = document.elementFromPoint(x, y), t0 = performance.now();
          const sende = (art, cx, cy, i) => { const e = new PointerEvent(art, { bubbles: true, cancelable: true, composed: true, isPrimary: true, pointerId: 78,
            pointerType: 'touch', button: 0, clientX: cx, clientY: cy }); Object.defineProperty(e, 'timeStamp', { value: t0 + 16 * i }); el.dispatchEvent(e); };
          let i = 0, cy = y;
          sende('pointerdown', x, y, i);
          for (const [, dy] of wege) { const von = cy; for (let s = 1; s <= 10; s++) sende('pointermove', x, (cy = von + (y + dy - von) * s / 10), ++i); }
          window.__b19 = sende;
        }, { ...g.daneben, wege });
        await wait(p, 160); m = await lage();
        await p.evaluate(({ x, y, wege }) => { window.__b19('pointerup', x, y + wege.at(-1)[1], 99); delete window.__b19; }, { ...g.daneben, wege }); await ruhig();
        l = await lage();
        if (l.fokus) E(`${nr('B19', 'D-10')} im gerollten Inhalt ${art} schließt die Tastatur nicht`);
        if (m.t) E(`${nr('B19', 'D-10')} im gerollten Inhalt bei offener Tastatur (${art}) folgt das Blatt dem Finger (${m.t} px)`);
        if (!l.open) { E(`${nr('B19', 'D-10')} im gerollten Inhalt bei offener Tastatur (${art}) schließt Ziehen das Fenster`); await auf(); await change(); await wait(p); }
        else if (l.pop.length) { E(`${nr('B19', 'D-10')} im gerollten Inhalt bei offener Tastatur (${art}) fragt Ziehen (${l.pop.join(' · ')})`); await p.locator('.pop button', { hasText: 'Weiter bearbeiten' }).click(); await ruhig(); }
      }
      await tastaturZu();
    }
    // B10 mit Änderung auf einem Feld nach unten ziehen: ein Zug – Tastatur zu, das Blatt folgt zäh, federt zurück und fragt
    g = await tippen();
    const w = `bei offener Tastatur${g.gerollt ? ` (Inhalt um ${g.gerollt} px gerollt)` : ''}`;
    m = await zieh(g.feld, 0, Math.round(l.h * 0.5));
    await tastaturZu();
    l = await lage();
    if (l.fokus) E(`${nr('B10', 'D-10')} nach unten ziehen auf einem Feld ${w} schließt die Tastatur nicht (Feld behält den Fokus)`);
    if (m.t < 20) E(`${nr('B10', 'D-10')} ein Zug auf einem Feld ${w} zieht das Blatt nicht (${m.t} px) – wie am Kopf erwartet`);
    if (!l.open) E(`${nr('B10', 'D-10')} mit Änderungen schließt Ziehen auf einem Feld ${w} das Fenster ohne Rückfrage`);
    else if (!l.pop.some(t => /Änderungen verwerfen/.test(t))) E(`${nr('B10', 'D-10')} mit Änderungen fragt ein Zug auf einem Feld ${w} nicht ‚Änderungen verwerfen‘${l.pop.length ? ` (${l.pop.join(' · ')})` : ''}`);
    else {   // B9: ‚Änderungen verwerfen‘ schließt
      await p.locator('.pop button', { hasText: 'Änderungen verwerfen' }).click(); await ruhig();
      await weg(`${nr('B9', 'D-9')} ‚Änderungen verwerfen‘`);
    }
    if (eigen) { await p.evaluate(() => window.__safari?.aus()); await wait(p, 300); }
  }
  await zu();
  return errors;
}

// R-3.5 (seit 4.33.0, APD-76; Testfall-Liste arbeit/APD-76 Testfall-Liste.md L1–L4, L8): langes Drücken gilt nur, solange der Finger still steht –
// wandert er mehr als 10 px oder rollt die Fläche um ihn herum, ist es abgebrochen (wie Apple: Tapback, Home-Bildschirm). Nachgebaut
// ist der Ablauf vom Gerät (24.10.2026): auf einem Smiley aufsetzen und die Leiste seitlich ziehen – Safari meldet dabei kein
// pointercancel (sonst wäre der Fehler nicht aufgetreten), die Leiste rollt mit dem Finger. Je Fall frisch aufgesetzt; die Ereignisse
// werden in der Seite nachgebildet (Playwright kennt in WebKit keine Berührung mit Bewegung). sel: Schaltfläche mit langem Drücken;
// frage: was langes Drücken öffnet (Abfrage bzw. Kontextmenü). Gibt Fehler zurück; Grundregeln danach ruft die App (t.schritt).
export async function checkLangDruecken(p, { sel, frage = '.pop, .menu', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-3.5 ${t}`);
  // schritte: [[dx, dy, ms, rollt]] – Lage seit dem Aufsetzen, Zeit seit dem vorigen Schritt; rollt: die Fläche rollt um dx mit
  // (ohne pointermove, wenn zeiger false – Safari kann den Finger zum Rollen übernehmen, ohne der Seite Bewegungen zu melden).
  const geste = (art, schritte, { zeiger = true, ende = 900 } = {}) => p.evaluate(async ({ sel, frage, art, schritte, zeiger, ende }) => {
    const warte = ms => new Promise(r => setTimeout(r, ms));
    const b = document.querySelector(sel), roll = b.closest('.scroll') || b.parentElement;
    roll.scrollLeft = 0; await warte(50);
    const r = b.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, s0 = roll.scrollLeft;
    const ev = (typ, dx, dy) => b.dispatchEvent(new PointerEvent(typ, { pointerId: 4076, pointerType: art, isPrimary: true, clientX: x + dx, clientY: y + dy,
      button: 0, buttons: typ === 'pointerup' ? 0 : 1, bubbles: true, cancelable: true, composed: true }));
    const t0 = performance.now();
    ev('pointerdown', 0, 0);
    for (const [dx, dy, ms, rollt] of schritte) {
      await warte(ms);
      if (zeiger) ev('pointermove', dx, dy);
      if (rollt) roll.scrollLeft = s0 - dx;
    }
    await warte(Math.max(0, ende - (performance.now() - t0)));
    const offen = !!document.querySelector(frage), gerollt = Math.round(roll.scrollLeft - s0);
    ev('pointerup', schritte.at(-1)?.[0] || 0, schritte.at(-1)?.[1] || 0);
    return { offen, gerollt, kann: roll.scrollWidth > roll.clientWidth + 2 };
  }, { sel, frage, art, schritte, zeiger, ende });
  const zu = async () => { await wait(p, 100);
    await p.evaluate(frage => { const f = document.querySelector(frage); if (!f) return;
      const k = [...f.querySelectorAll('.btns button, button')].at(-1); if (f.matches('.pop') && k) k.click(); else document.querySelector('.layer')?.click(); }, frage);
    await wait(p, 250); };
  const zug = (von, bis, n, ms, rollt) => Array.from({ length: n }, (_, i) => [Math.round(von + (bis - von) * (i + 1) / n), 0, ms, rollt]);
  for (const art of ['touch', 'mouse']) {
    const wer = art === 'touch' ? 'Finger' : 'Maus', rollt = art === 'touch';   // mit der Maus rollt die Leiste beim Ziehen nicht
    // L1 (L2): aufsetzen, gleich seitlich ziehen – die Leiste rollt mit –, danach stehen lassen; zusammen länger als 0,6 s
    let r = await geste(art, zug(0, -90, 12, 30, rollt));
    if (r.offen) E(`L1 ${wer}: seitlich gezogen (${-r.gerollt} px gerollt), trotzdem fragt langes Drücken – Ziehen ist kein langes Drücken`);
    await zu();
    if (art === 'touch' && r.kann) {   // Safari übernimmt den Finger zum Rollen und meldet der Seite keine Bewegung mehr
      r = await geste(art, zug(0, -90, 12, 30, true), { zeiger: false });
      if (r.offen) E(`L1 ${wer}: Leiste rollt unter dem Finger (${-r.gerollt} px), trotzdem fragt langes Drücken`);
      await zu();
    }
    // L3: erst 0,4 s still, dann ziehen (vor 0,6 s)
    r = await geste(art, [[0, 0, 400, false], ...zug(0, -60, 6, 30, rollt)]);
    if (r.offen) E(`L3 ${wer}: nach 0,4 s gezogen, trotzdem fragt langes Drücken`);
    await zu();
    // L4: still halten, der Finger wackelt höchstens 10 px – fragt wie bisher
    r = await geste(art, [[3, 2, 150, false], [-4, 6, 150, false], [6, -3, 150, false], [8, 4, 150, false]]);
    if (!r.offen) E(`L4 ${wer}: still gehalten (höchstens 10 px gewackelt), langes Drücken fragt nicht`);
    await zu();
  }
  return errors;
}

// R-5.4 (seit 4.33.0, APD-75; Testfall-Liste arbeit/APD-75 Testfall-Liste.md K1–K3, K6, K7, K9, K10, K12): Auswahl-Kapsel mit Pfeilen am Rand,
// seit 4.40.0 (APD-86) ebenso die Wischzeile .weiter (sel: ihre .scroll) –
// am Anfang nur ›, in der Mitte beide, am Ende nur ‹ (und zurück am Anfang wieder nur ›); ein Pfeil blendet in 0,2 s aus (‚Bewegung
// reduzieren‘: sofort); Antippen unter dem Pfeil wählt den Eintrag darunter (der Pfeil fängt nichts ab), Wählen ändert weder Breite
// noch Pfeile; Drehen bzw. ein schmaleres Fenster stellt Verlauf und Pfeile neu, der Rollstand bleibt. sel: die Rollfläche (.cap .scroll);
// drehen: true dreht die Ansicht hin und zurück; schmaler: Breite in px für K7 (Fenster schmaler, iPad geteilt). Gibt Fehler zurück.
export async function checkKapsel(p, { sel, drehen = false, schmaler = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-5.4 ${t}`);
  const lage = () => p.evaluate(sel => { const s = document.querySelector(sel), cap = s.parentElement, pf = x => cap.querySelector(`:scope > .pf.${x}`);
    return { sl: Math.round(s.scrollLeft), max: Math.round(s.scrollWidth - s.clientWidth), l: pf('l')?.classList.contains('an'), r: pf('r')?.classList.contains('an'),
      ol: +getComputedStyle(pf('l')).opacity, or: +getComputedStyle(pf('r')).opacity, dauer: getComputedStyle(pf('r')).transitionDuration, breite: Math.round(cap.getBoundingClientRect().width) }; }, sel);
  const rolle = async x => { await p.evaluate(([sel, x]) => { const s = document.querySelector(sel); s.scrollLeft = x === 'ende' ? s.scrollWidth : x === 'mitte' ? (s.scrollWidth - s.clientWidth) / 2 : x; }, [sel, x]); await wait(p, 300);
    // seit 4.37.0: unter Last läuft das Überblenden (0,2 s, geprüft über ‚dauer‘) später zu Ende – auf sein Ende warten, dann messen
    await p.evaluate(sel => Promise.all([...document.querySelector(sel).parentElement.querySelectorAll(':scope > .pf')].flatMap(e => e.getAnimations()).map(a => a.finished.catch(() => {}))), sel);
    return lage(); };
  const soll = (k, x, l, r) => { if (x.l !== l || x.r !== r) E(`${k}: Pfeile ${x.l ? '‹' : '–'} ${x.r ? '›' : '–'} statt ${l ? '‹' : '–'} ${r ? '›' : '–'} (Rollstand ${x.sl} von ${x.max} px)`);
    if (Math.round(x.ol) !== +l || Math.round(x.or) !== +r) E(`${k}: Pfeil nach 0,3 s nicht ein- bzw. ausgeblendet (Deckkraft ‹ ${x.ol} › ${x.or})`); };
  let x = await rolle(0);
  const ruhig = await p.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (x.dauer !== (ruhig ? '0s' : '0.2s')) E(`K12: Pfeil blendet in ${x.dauer} aus, soll ${ruhig ? 'ohne Überblenden (Bewegung reduzieren)' : '0,2 s'}`);
  if (x.max <= 2) { soll('K5 alles passt', x, false, false); }
  else {
    soll('K1 Anfang', x, false, true);
    soll('K2 Mitte', await rolle('mitte'), true, true);
    soll('K3 Ende', await rolle('ende'), true, false);
    soll('K3 zurück am Anfang', await rolle(0), false, true);
    // K9 + K10: Antippen unter dem Pfeil › wählt den Eintrag darunter; Breite und Pfeile bleiben
    const ziel = await p.evaluate(sel => { const s = document.querySelector(sel), f = s.parentElement.querySelector(':scope > .pf.r').getBoundingClientRect();
      // seit 4.40.0 (APD-86): in der Wischzeile (Text ohne Schaltflächen) genügt, dass die Rollfläche selbst unter dem Pfeil liegt
      const x = (f.left + f.right) / 2, y = (f.top + f.bottom) / 2, u = document.elementFromPoint(x, y), e = u?.closest('button');
      return { x, y, im: !!u && s.contains(u) && (!e || s.contains(e)), druck: e?.getAttribute('aria-pressed') ?? null }; }, sel);
    if (!ziel.im) E('K9: unter dem Pfeil › liegt nicht die Kapsel bzw. Wischzeile – der Pfeil fängt das Antippen ab');
    else if (ziel.druck !== null) {
      await p.mouse.click(ziel.x, ziel.y); await wait(p, 300);
      const y = await lage(), jetzt = await p.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('button')?.getAttribute('aria-pressed'), [ziel.x, ziel.y]);
      if (jetzt === ziel.druck) E('K9: Antippen unter dem Pfeil › wählt den Eintrag darunter nicht');
      if (y.breite !== x.breite) E(`K10: Wählen ändert die Breite der Kapsel (${x.breite} → ${y.breite} px)`);
      soll('K10 nach dem Wählen', y, y.sl > 2, y.sl < y.max - 2);
      await p.mouse.click(ziel.x, ziel.y); await wait(p, 300);
    }
  }
  // K6 / K7: Drehen bzw. schmaler – Verlauf und Pfeile neu, Rollstand bleibt (soweit möglich)
  const vp = p.viewportSize();
  for (const [k, gr] of [drehen && ['K6 gedreht', { width: vp.height, height: vp.width }], schmaler && ['K7 schmaler', { width: schmaler, height: vp.height }]].filter(Boolean)) {
    const vor = await rolle(x.max > 2 ? 'mitte' : 0);
    await p.setViewportSize(gr); await wait(p, 500);
    let n = await lage();
    soll(k, n, n.sl > 2, n.sl < n.max - 2);
    if (Math.abs(n.sl - Math.min(vor.sl, n.max)) > 2) E(`${k}: Rollstand der Kapsel ${vor.sl} → ${n.sl} px (Ende ${n.max}) – soll bleiben`);
    await p.setViewportSize(vp); await wait(p, 500);
    n = await lage();
    soll(`${k} und zurück`, n, n.sl > 2, n.sl < n.max - 2);
  }
  await rolle(0);
  return errors;
}

/* ---------- Bedienungshilfen (seit 4.35.0, APD-43 Teil 1: R-1.8, R-4.7, R-1.9, R-3.4; Testfall-Liste arbeit/APD-43 Teil 1 Testfall-Liste.md) ---------- */

// Text im Ansage-Bereich (oberstes offenes Fenster, sonst Seite) – nach warten ms
export async function ansage(p, warten = 0) {
  if (warten) await wait(p, warten);
  return p.evaluate(() => { const h = document.querySelector('#msg[open]') || document.querySelector('#dlg[open]') || document.body;
    return h.querySelector(':scope > .ansage')?.textContent.trim() ?? null; });
}
const aktiv = p => p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return { id: '', tag: 'body' };
  const c = getComputedStyle(a);
  return { id: a.id, tag: a.tagName.toLowerCase(), cls: a.className?.baseVal ?? a.className, rolle: a.getAttribute('role') || '', text: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 30),
    inMenu: !!a.closest('.menu'), inSub: !!a.closest('.submenu'), inPop: !!a.closest('.pop'), istPop: a.matches('.pop'), inDlg: a.closest('dialog[open]')?.id || '', ring: c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0 }; });
const taste = async (p, k, n = 1) => { for (let i = 0; i < n; i++) { await p.keyboard.press(k); await wait(p, 60); } await wait(p, 120); };

// R-4.7, R-1.8 (V5, V6, K1–K6, K9): Fokus und Hardware-Tastatur.
//   menue: Knopf eines Menüs (Selektor) · untermenue: Beschriftung eines Eintrags mit Untermenü in diesem Menü
//   fenster: { open, change, feld } – Fenster öffnen, etwas ändern, ein Textfeld darin · felder: Textfelder der Seite (antippen)
//   tab: Tab-Reihenfolge der Seite prüfen (Leiste → Suche → Inhalt → Kapsel ‚Nach oben / Ans Ende‘)
export async function checkFokus(p, { menue = null, untermenue = null, fenster = null, felder = [], tab = true, where = '' } = {}) {
  const errors = [], E = (r, t) => errors.push(`${where ? where + ': ' : ''}${r} ${t}`);
  const offen = () => p.evaluate(() => ({ menu: !!document.querySelector('.menu:not(.submenu)'), sub: !!document.querySelector('.menu.submenu'), pop: !!document.querySelector('.pop'), dlg: document.getElementById('dlg')?.open, msg: document.getElementById('msg')?.open }));
  const istKnopf = async sel => p.evaluate(sel => document.activeElement === document.querySelector(sel), sel);
  if (menue) {
    // V5, K1, K2: antippen öffnet mit Fokus auf dem ersten wählbaren Eintrag; Pfeile mit Umlauf; Esc schließt, Fokus zurück, ohne Ring
    await p.click(menue); await wait(p, 200);
    let a = await aktiv(p);
    if (!a.inMenu) E('R-4.7', `Menü offen, Fokus nicht auf dem ersten Eintrag (auf ${a.tag}${a.id ? '#' + a.id : ''})`);
    const eintraege = await p.evaluate(() => [...document.querySelector('.menu').querySelectorAll('.mi:not(:disabled)')].map(m => m.textContent.trim()));
    const ist = async () => (await aktiv(p)).text;
    if (eintraege.length > 1) {
      await taste(p, 'ArrowDown'); if (await ist() !== eintraege[1].slice(0, 30)) E('R-4.7', `↓ wandert nicht zum nächsten Eintrag (${await ist()})`);
      await taste(p, 'End'); if (await ist() !== eintraege.at(-1).slice(0, 30)) E('R-4.7', 'Ende springt nicht zum letzten Eintrag');
      await taste(p, 'ArrowDown'); if (await ist() !== eintraege[0].slice(0, 30)) E('R-4.7', '↓ am letzten Eintrag läuft nicht zum ersten um');
      await taste(p, 'ArrowUp'); if (await ist() !== eintraege.at(-1).slice(0, 30)) E('R-4.7', '↑ am ersten Eintrag läuft nicht zum letzten um');
      await taste(p, 'Home'); await taste(p, 'Tab'); if (await ist() !== eintraege[1].slice(0, 30)) E('R-4.7', 'Tab wandert im Menü nicht wie ↓');
      const mark = await p.evaluate(() => { const a = document.activeElement, c = getComputedStyle(a); return { ring: c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0, bg: c.backgroundColor }; });
      if (mark.ring || /rgba\(0, 0, 0, 0\)|transparent/.test(mark.bg)) E('R-4.7', `Markierung im Menü nicht hinterlegt ohne Rahmen (Ring ${mark.ring}, Hintergrund ${mark.bg})`);
    }
    await taste(p, 'Escape');
    let o = await offen();
    if (o.menu) { E('R-4.7', 'Esc schließt das Menü nicht'); await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p); }
    else if (o.dlg && !where.includes('Fenster')) E('R-4.7', 'Esc schließt mit dem Menü auch das Fenster (Taste nicht verbraucht)');
    if (!await istKnopf(menue)) E('R-4.7', `Esc: Fokus nicht zurück auf dem Knopf ${menue} (V5)`);
    if (!(await aktiv(p)).ring) E('R-3.4', 'Tastatur: kein Fokusring am Knopf (K6 – bei Bedienung mit der Tastatur sichtbar)');
    // ⌘. wie Esc
    await p.click(menue); await wait(p, 200); await taste(p, 'Meta+Period');
    if ((await offen()).menu) { E('R-4.7', '⌘. schließt das Menü nicht'); await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p); }
    // daneben tippen: Fokus zurück, ohne Ring (Antippen, R-3.4)
    await p.click(menue); await wait(p, 200);
    await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200);
    if (!await istKnopf(menue)) E('R-4.7', `daneben tippen: Fokus nicht zurück auf dem Knopf ${menue} (V5)`);
    await p.mouse.click(2, 2); await wait(p, 100);   // Antippen beendet die Tastaturbedienung
    await p.click(menue); await wait(p, 200); await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200);
    if ((await aktiv(p)).ring) E('R-3.4', 'Fokus-Rahmen am Knopf nach dem Antippen (K6: nie beim Antippen)');
    if (untermenue) {
      // K3: → öffnet, Fokus auf dem ersten Eintrag; ← schließt, Fokus zurück auf dem ›-Eintrag; Esc schließt zuerst das Untermenü
      await p.click(menue); await wait(p, 200);
      const n = eintraege.findIndex(x => x.includes(untermenue));
      if (n < 0) E('R-4.7', `Eintrag ‚${untermenue}‘ nicht im Menü`);
      else {
        await taste(p, 'ArrowDown', n);
        await taste(p, 'ArrowRight');
        a = await aktiv(p);
        const exp = () => p.evaluate(t => [...document.querySelectorAll('.menu:not(.submenu) .mi')].find(m => m.textContent.includes(t))?.getAttribute('aria-expanded'), untermenue);
        if (!(await offen()).sub || !a.inSub) E('R-4.7', '→ öffnet das Untermenü nicht mit Fokus auf seinem ersten Eintrag');
        if (await exp() !== 'true') E('R-1.8', 'Untermenü offen, aria-expanded nicht true');
        await taste(p, 'ArrowLeft');
        a = await aktiv(p);
        if ((await offen()).sub || !a.inMenu || !a.text.includes(untermenue.slice(0, 20))) E('R-4.7', '← schließt das Untermenü nicht bzw. Fokus nicht zurück auf dem ›-Eintrag');
        if (await exp() !== 'false') E('R-1.8', 'Untermenü zu, aria-expanded nicht false');
        await taste(p, 'Enter'); await taste(p, 'Escape');
        const o2 = await offen();
        if (o2.sub || !o2.menu) E('R-4.7', 'Esc im Untermenü schließt nicht nur das Untermenü');
        await taste(p, 'Escape');
      }
      if ((await offen()).menu) await p.evaluate(() => document.querySelector('.layer')?.click());
      await wait(p);
    }
  }
  if (fenster) {
    const { open, change, feld } = fenster;
    // K5: Fenster öffnet ohne vorausgewählte Schaltfläche; Esc und ⌘. (auch aus einem Feld) wie x; Tab bleibt im Fenster
    await open(); await wait(p, 400); await navFertig(p);
    let a = await aktiv(p);
    if (a.inDlg !== 'dlg' || a.tag !== 'dialog') E('R-3.4', `Fenster öffnet mit Fokus auf ${a.tag}${a.id ? '#' + a.id : ''} statt auf dem Fenster (vorausgewählte Schaltfläche)`);
    const n = await p.evaluate(() => [...document.getElementById('dlg').querySelectorAll('button:not(:disabled), input:not([type=hidden]), textarea, select, [tabindex]:not([tabindex="-1"])')].filter(x => x.getClientRects().length && x.tabIndex >= 0).length);
    for (const k of ['Tab', 'Shift+Tab']) {
      for (let i = 0; i < n + 2; i++) { await p.keyboard.press(k); await wait(p, 30); if ((await aktiv(p)).inDlg !== 'dlg') { E('R-4.7', `${k === 'Tab' ? 'Tab' : 'Umschalt+Tab'} verlässt das Fenster (nach ${i + 1}×)`); break; } }
    }
    await taste(p, 'Escape'); await navFertig(p);
    if ((await offen()).dlg) { E('R-4.7', 'Esc ohne Änderung schließt das Fenster nicht'); await p.evaluate(() => dlg.close()); }
    await open(); await wait(p, 400); await navFertig(p);
    if (feld) { await p.locator(feld).focus(); await wait(p, 100); }
    await taste(p, 'Meta+Period'); await navFertig(p);
    if ((await offen()).dlg) { E('R-4.7', `⌘. ${feld ? 'aus einem Feld ' : ''}schließt das Fenster nicht`); await p.evaluate(() => dlg.close()); }
    // K4, V6: x mit Änderung → Sprechblase mit Fokus (ohne Rahmen); Eingabe nie die rote Aktion; Esc = Abbrechen, Fenster bleibt
    if (change) {
      await open(); await wait(p, 400); await navFertig(p); await change(); await wait(p);
      await p.locator('#dlgX').click(); await wait(p, 250);
      a = await aktiv(p);
      if (!(await offen()).pop) E('R-4.4', 'x mit Änderung zeigt keine Sprechblase');
      else {
        if (!a.istPop) E('R-1.8', `Sprechblase offen, Fokus nicht auf der Blase (auf ${a.tag}${a.id ? '#' + a.id : ''})`);
        if (a.ring) E('R-3.4', 'Sprechblase mit Fokus-Rahmen');
        await taste(p, 'Enter');
        let o = await offen();
        if (!o.dlg) E('R-4.7', 'Eingabe in der Sprechblase hat die rote Aktion ausgelöst (Fenster zu) – Eingabe nie rot');
        else {
          if (o.pop) E('R-4.7', 'Eingabe schließt die Sprechblase nicht (Weg zurück)');
          if (!await istKnopf('#dlgX')) E('R-4.7', 'nach der Sprechblase Fokus nicht zurück auf dem x (V6)');
          await p.locator('#dlgX').click(); await wait(p, 250);
          await taste(p, 'Escape');
          o = await offen();
          if (o.pop) E('R-4.7', 'Esc schließt die Sprechblase nicht');
          if (!o.dlg) E('R-4.7', 'Esc in der Sprechblase schließt auch das Fenster (Taste nicht verbraucht)');
          // Tab markiert, Leertaste drückt den markierten – auch Rot
          await p.locator('#dlgX').click(); await wait(p, 250);
          await taste(p, 'Tab');
          a = await aktiv(p);
          if (!a.inPop) E('R-4.7', 'Tab markiert keinen Knopf der Sprechblase');
          else if (!(await aktiv(p)).ring) E('R-3.4', 'Tab in der Sprechblase: kein Fokusring am markierten Knopf');
          await taste(p, ' ');
          if ((await offen()).dlg) E('R-4.7', 'Leertaste auf ‚Änderungen verwerfen‘ schließt das Fenster nicht');
        }
      }
      await p.evaluate(() => { document.querySelector('.layer')?.click(); if (dlg.open) dlg.close(); }); await wait(p);
    }
  }
  // K9, R-3.4: Textfelder nie mit Fokus-Rahmen – antippen und mit Tab erreichen
  for (const f of felder) {
    if (!await p.locator(f).first().isVisible().catch(() => false)) continue;
    await p.locator(f).first().tap(); await wait(p, 150);
    const r = await p.evaluate(sel => { const e = document.querySelector(sel), c = getComputedStyle(e); return document.activeElement === e && c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0 ? `${c.outlineStyle} ${c.outlineWidth}` : ''; }, f);
    if (r) E('R-3.4', `Textfeld ${f} mit Fokus-Rahmen nach dem Antippen (${r})`);
    await p.evaluate(() => document.activeElement?.blur());
  }
  if (tab) {
    // K6: Reihenfolge Leiste → Suche → Inhalt → Kapsel, nur Sichtbares; Textfelder ohne, Knöpfe mit Ring
    await p.mouse.click(2, 2); await p.evaluate(() => document.activeElement?.blur()); await wait(p, 100);
    const folge = [];
    for (let i = 0; i < 40; i++) {
      await p.keyboard.press('Tab'); await wait(p, 40);
      const x = await p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return null;
        const c = getComputedStyle(a), r = a.getBoundingClientRect();
        const teil = a.closest('.fab') ? 3 : a.closest('.searchbox, .nb2') ? 1 : a.closest('.nb, .pnav') ? 0 : a.closest('#app > .rolle') ? 2 : a.closest('#side') ? -1 : 9;
        return { teil, sichtbar: r.width > 0 && r.height > 0 && c.visibility !== 'hidden', feld: a.matches('input:not([type=checkbox]), textarea'), ring: c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0,
          wer: a.id ? '#' + a.id : a.tagName.toLowerCase() + (a.classList[0] ? '.' + a.classList[0] : '') }; });
      if (!x || folge.some(y => y.wer === x.wer && y.teil === x.teil) && folge.length > 3) break;
      folge.push(x);
    }
    folge.filter(x => !x.sichtbar).forEach(x => E('R-4.7', `Tab erreicht Unsichtbares (${x.wer})`));
    folge.filter(x => x.feld && x.ring).forEach(x => E('R-3.4', `Textfeld ${x.wer} mit Fokus-Rahmen (Tab, K9)`));
    folge.filter(x => !x.feld && !x.ring && x.teil !== 9).slice(0, 1).forEach(x => E('R-3.4', `Tab: ${x.wer} ohne Fokusring (K6)`));
    const app = folge.filter(x => x.teil >= 0 && x.teil < 9);
    for (let i = 1; i < app.length; i++) if (app[i].teil < app[i - 1].teil) { E('R-4.7', `Tab-Reihenfolge nicht Leiste → Suche → Inhalt → Kapsel: ${app[i - 1].wer} vor ${app[i].wer}`); break; }
    await p.mouse.click(2, 2); await p.evaluate(() => document.activeElement?.blur());
  }
  return errors;
}

// R-1.9 (APD-43 H1–H5): ‚Kontrast erhöhen‘ – zweite Farbtabelle hell und dunkel, sofort ohne Neuaufbau, Ausgabe unverändert hell.
//   vorschau: öffnet die Vorschau der Ausgabe (Fenster mit .rt) · fenster: { open, feld } – für das Umschalten bei offenem Fenster (H5)
export const KONTRAST = {
  hell: { '--accent': '#0040dd', '--danger-fill': '#d70015', '--danger': '#b3261e', '--sw-on': '#248a3d', '--warn': '#c93400', '--muted': '#3c3c43', '--ink': '#000000', '--line': '#8e8e93' },
  dunkel: { '--accent': '#409cff', '--accent-fill': '#0060df', '--danger': '#ff6961', '--danger-fill': '#d70015', '--sw-on': '#30db5b', '--warn': '#ffb340', '--muted': '#c7c7cc', '--line': '#636366' },
};
export async function checkKontrast(p, { vorschau = null, fenster = null, where = '' } = {}) {
  const errors = [], E = (r, t) => errors.push(`${where ? where + ': ' : ''}${r} ${t}`);
  const anfang = await p.evaluate(() => ({ c: matchMedia('(prefers-contrast: more)').matches ? 'more' : 'no-preference', s: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }));
  const vars = () => p.evaluate(ks => { const c = getComputedStyle(document.documentElement); return Object.fromEntries(ks.map(k => [k, c.getPropertyValue(k).trim().toLowerCase()])); }, [...new Set([...Object.keys(KONTRAST.hell), ...Object.keys(KONTRAST.dunkel)])]);
  const thema = () => p.evaluate(() => document.documentElement.dataset.theme);
  const setze = async (contrast, colorScheme) => { await p.emulateMedia({ contrast, colorScheme }); await wait(p, 150); };
  for (const [name, scheme] of [['hell', 'light'], ['dunkel', 'dark']]) {
    await setze('more', scheme);
    const v = await vars(), soll = KONTRAST[name];
    if (await thema() !== (scheme === 'light' ? 'light' : 'dark')) continue;   // Darstellung der App übersteuert
    const falsch = Object.entries(soll).filter(([k, w]) => v[k] !== w);
    if (falsch.length) E('R-1.9', `Farbtabelle ‚Kontrast erhöhen‘ ${name} fehlt oder weicht ab: ${falsch.map(([k, w]) => `${k} ${v[k] || '–'} statt ${w}`).join(', ')}`);
  }
  // H4: Ausgabe und Vorschau-Inhalt mit und ohne Kontrast, hell und dunkel identisch
  if (vorschau) {
    const bild = () => p.evaluate(() => [...document.querySelectorAll('#dlg .rt, #dlg .rt *')].slice(0, 60).map(e => { const c = getComputedStyle(e); return `${c.color}|${c.backgroundColor}|${c.borderTopColor}`; }).join(';'));
    await setze('no-preference', 'light'); await vorschau(); await wait(p, 400); await navFertig(p);
    const basis = await bild();
    for (const [c, sch] of [['more', 'light'], ['more', 'dark'], ['no-preference', 'dark']]) {
      await setze(c, sch);
      if (await bild() !== basis) { E('R-6.2', `Ausgabe in der Vorschau mit ${c === 'more' ? '‚Kontrast erhöhen‘' : 'ohne Kontrast'} ${sch === 'dark' ? 'dunkel' : 'hell'} anders als hell – sie bleibt unverändert hell (H4, Kontrast)`); break; }
    }
    await p.evaluate(() => dlg.open && dlg.close()); await wait(p);
  }
  // H5: Umschalten bei offenem Fenster mit Eingabe und gerollter Liste – kein Neuaufbau, alles bleibt
  if (fenster) {
    await setze('no-preference', 'light');
    await rolle(p, '50%'); await wait(p, 150);
    const y0 = (await rollstand(p)).y;
    await fenster.open(); await wait(p, 400); await navFertig(p);
    await p.locator(fenster.feld).focus(); await p.keyboard.type('Kontrast'); await wait(p, 100);
    await p.evaluate(() => { window.__kontrastMarke = 1; });
    const vor = await vars();
    await setze('more', 'light');
    const r = await p.evaluate(sel => ({ marke: window.__kontrastMarke, offen: document.getElementById('dlg').open, fokus: document.activeElement === document.querySelector(sel), wert: document.querySelector(sel)?.value || '' }), fenster.feld);
    const nach = await vars();
    if (r.marke !== 1) E('R-1.9', '‚Kontrast erhöhen‘ umschalten lädt die Seite neu');
    if (!r.offen || !r.fokus || !/Kontrast/.test(r.wert)) E('R-1.9', `‚Kontrast erhöhen‘ umschalten: Fenster, Fokus bzw. Eingabe verloren (offen ${r.offen}, Fokus ${r.fokus})`);
    if (nach['--accent'] === vor['--accent']) E('R-1.9', 'Farbtabelle wechselt nicht sofort beim Umschalten');
    await p.evaluate(() => dlg.close()); await wait(p, 300); await navFertig(p);
    const y1 = (await rollstand(p)).y;
    if (Math.abs(y1 - y0) > 2) E('R-1.9', `Liste nach dem Umschalten verrückt (${y0} → ${y1} px)`);
  }
  await setze(anfang.c, anfang.s);
  return errors;
}

// R-1.9 (APD-43 M1–M5): ‚Bewegung reduzieren‘ gezielt – die Seite muss mit dem Bewegungswächter geöffnet sein (pruefe.mjs t.seite).
//   fab: ‚Nach oben / Ans Ende‘ springen in einem Schritt · mic: Selektor eines Mikrofon-Knopfs bzw. true (pulsiert nicht)
//   fenster: öffnet ein Fenster (iPhone: Blatt ohne Verkleinerung der Seite, M5). Die Funde des Wächters meldet t.ruhig bzw. t.schritt.
export async function checkRuhig(p, { fab = true, mic = null, fenster = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-1.9 ${t}`);
  const vorher = await p.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  await p.emulateMedia({ reducedMotion: 'reduce' }); await wait(p, 100);
  if (fab && await p.locator('.fab:not(.still) button:not([hidden])').count()) {
    await rolle(p, '50%'); await wait(p, 200);
    for (const [knopf, ziel] of [['.fab button:first-of-type', 'oben'], ['.fab button:last-of-type', 'ende']]) {
      if (!await p.locator(knopf).isVisible().catch(() => false)) { await rolle(p, ziel === 'oben' ? '60%' : '40%'); await wait(p, 150); }
      if (!await p.locator(knopf).isVisible().catch(() => false)) continue;
      await p.click(knopf); await wait(p, 60);
      const s = await rollstand(p);
      if (ziel === 'oben' ? s.y > 1 : s.rest > 130) E(`‚${ziel === 'oben' ? 'Nach oben' : 'Ans Ende'}‘ springt nicht direkt (nach 60 ms bei ${s.y} von ${s.max} px – rollt sanft, M2)`);
      await rollRuht(p); await rolle(p, '50%'); await wait(p, 150);
    }
  }
  if (mic) {
    // ohne Selektor: ein Mikrofon-Knopf wird kurz eingesetzt (Regel aus design.css)
    const r = await p.evaluate(sel => { const neu = sel === true && Object.assign(document.createElement('button'), { className: 'mic', type: 'button' });
      if (neu) document.body.append(neu);
      const m = neu || document.querySelector(sel); if (!m) return null; const alt = m.getAttribute('aria-pressed'); m.setAttribute('aria-pressed', 'true');
      const n = m.getAnimations().length; if (alt === null) m.removeAttribute('aria-pressed'); else m.setAttribute('aria-pressed', alt); neu?.remove(); return n; }, mic);
    if (r) E(`Mikrofon pulsiert trotz ‚Bewegung reduzieren‘ (${r} Animation, M4)`);
  }
  if (fenster) {
    await fenster(); await wait(p, 300); await navFertig(p);
    const z = await p.evaluate(() => ({ zurueck: document.documentElement.classList.contains('blatt-zurueck'), scale: [...document.querySelectorAll('#app, #side')].map(e => getComputedStyle(e).scale).filter(s => s !== 'none' && s !== '1') }));
    if (z.zurueck || z.scale.length) E(`Blatt: die Seite dahinter weicht verkleinert zurück (Zoomen, M5) – ${z.scale.join(' ')}`);
    await p.evaluate(() => dlg.open && dlg.close()); await wait(p, 300); await navFertig(p);
  }
  await p.emulateMedia({ reducedMotion: vorher ? 'reduce' : 'no-preference' });
  return errors;
}

// Seit 4.42.0 (APD-87, R-4.1; Testfall-Liste arbeit/APD-87 Testfall-Liste.md APD-87/E-1 bis APD-87/E-11): der Mehr-Knopf zeigt bei offenem Menü drei
// senkrechte Punkte und ist hervorgehoben, geschlossen wieder waagrecht – sofort, auch mit ‚Bewegung reduzieren‘; Untermenü öffnen und
// schließen ändert nichts; Esc schließt (R-4.7); Name bleibt ‚Mehr‘, aria-expanded true/false. sel: der Mehr-Knopf; untermenue: Text eines
// Menüpunkts mit Untermenü (optional).
export async function checkMehrKnopf(p, { sel, untermenue = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-4.1 ${t}`);
  const lage = () => p.evaluate(sel => {
    const b = document.querySelector(sel), c = b ? [...b.querySelectorAll(':scope > svg circle')] : [];
    const xs = new Set(c.map(k => k.getAttribute('cx'))), ys = new Set(c.map(k => k.getAttribute('cy')));
    return b && { punkte: c.length, art: c.length === 3 && xs.size === 1 ? 'senkrecht' : c.length === 3 && ys.size === 1 ? 'waagrecht' : 'anders',
      on: b.classList.contains('on'), exp: b.getAttribute('aria-expanded'), name: b.getAttribute('aria-label'), menue: !!document.querySelector('.menu:not(.submenu)') };
  }, sel);
  let x = await lage();
  if (!x) { E(`Mehr-Knopf ${sel} fehlt`); return errors; }
  if (x.art !== 'waagrecht') E(`APD-87/E-1: Mehr-Knopf geschlossen nicht mit drei waagrechten Punkten (${x.art})`);
  await p.click(sel); await p.waitForTimeout(50);   // sofort – ohne Warten auf eine Bewegung
  x = await lage();
  if (!x.menue) E('APD-87/E-1: Mehr-Menü öffnet sich nicht');
  if (x.art !== 'senkrecht') E(`APD-87/E-1: Mehr-Knopf bei offenem Menü nicht mit drei senkrechten Punkten (${x.art})`);
  if (!x.on) E('APD-87/E-1: Mehr-Knopf bei offenem Menü nicht hervorgehoben');
  if (x.name !== 'Mehr' || x.exp !== 'true') E(`APD-87/E-11: Bildschirmleser – Name ‚${x.name}‘, aria-expanded ${x.exp} (soll ‚Mehr‘, true)`);
  if (untermenue) {
    await p.locator('.menu:not(.submenu) .mi', { hasText: untermenue }).first().click(); await p.waitForTimeout(150);
    if ((await lage()).art !== 'senkrecht') E('APD-87/E-6: mit offenem Untermenü nicht mehr senkrecht');
    await p.keyboard.press('Escape'); await p.waitForTimeout(150);
    if ((await lage()).art !== 'senkrecht') E('APD-87/E-6: nach dem Schließen des Untermenüs nicht mehr senkrecht');
  }
  await p.keyboard.press('Escape'); await p.waitForTimeout(150);
  x = await lage();
  if (x.menue) E('APD-87/E-5: Esc schließt das Mehr-Menü nicht');
  if (x.art !== 'waagrecht') E(`APD-87/E-5: nach dem Schließen nicht wieder waagrecht (${x.art})`);
  if (x.on || x.exp !== 'false') E(`APD-87/E-11: nach dem Schließen noch hervorgehoben bzw. aria-expanded ${x.exp}`);
  return errors;
}

// Seit 4.42.0 (APD-90, R-10.5; Testfall-Liste arbeit/APD-90 Testfall-Liste.md U-1 bis U-7): in einer Reihe aus Einträgen mit Icon und Text
// (sel, z. B. die Reisemittel) stehen Icon und erstes Wort jedes Eintrags auf derselben Zeile, und ein Eintrag, der in die Zeile passt,
// bricht nicht in sich um (Umbruch nur zwischen den Einträgen). lang: zusätzlich ein zu langer Eintrag aus iconText in einer schmalen Spalte
// (U-5) – er bricht im Text um, nie direkt nach dem Icon, und ragt nicht hinaus.
export async function checkIconText(p, { sel, lang = false, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-10.5 ${t}`);
  const funde = await p.evaluate(({ sel, lang }) => {
    const root = document.querySelector(sel); if (!root) return null;
    const ICON = /(\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*)[\s ]+(\S+)/gu;
    const zeilen = r => [...new Set([...r.getClientRects()].filter(q => q.width > 0).map(q => Math.round(q.top)))];
    const rng = (n, a, b) => { const r = document.createRange(); r.setStart(n, a); r.setEnd(n, b); return r; };
    const pruefe = (el, breite) => {
      const out = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n; (n = w.nextNode());) {
        for (const m of n.data.matchAll(ICON)) {
          const i = rng(n, m.index, m.index + m[1].length), wort = rng(n, m.index + m[0].length - m[2].length, m.index + m[0].length);
          const ti = zeilen(i).at(-1), tw = zeilen(wort)[0];
          if (Math.abs(ti - tw) > 4) out.push(`Icon und Text getrennt: ‚${m[1]}‘ am Zeilenende, ‚${m[2]}‘ in der nächsten Zeile`);
        }
        // Einträge (durch Komma getrennt), die in die Zeile passen, brechen nicht in sich um
        let pos = 0;
        for (const teil of n.data.split(/(,\s*)/)) {
          if (teil && !/^,\s*$/.test(teil) && teil.trim()) {
            const a = pos + teil.search(/\S/), r = rng(n, a, pos + teil.trimEnd().length);
            const z = zeilen(r), bw = r.getBoundingClientRect().width;
            const einzeln = document.createElement('span'); einzeln.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap'; einzeln.textContent = teil.trim();
            el.appendChild(einzeln); const voll = einzeln.getBoundingClientRect().width; einzeln.remove();
            if (z.length > 1 && voll <= breite - 2) out.push(`Eintrag ‚${teil.trim()}‘ passt in die Zeile (${Math.round(voll)} von ${Math.round(breite)} px), bricht aber in sich um`);
          }
          pos += teil.length;
        }
      }
      return out;
    };
    const res = pruefe(root, root.getBoundingClientRect().width);
    if (lang) {
      const box = document.createElement('div'); box.style.cssText = 'width:160px;position:absolute;left:0;top:0;visibility:hidden';
      box.innerHTML = typeof iconText === 'function' ? iconText('🚐', 'Sehr langes Reisemittel mit vielen Wörtern') : '🚐 Sehr langes Reisemittel mit vielen Wörtern';
      root.appendChild(box);
      if (typeof iconText !== 'function') res.push('U-5: Baustein iconText fehlt in ui.js');
      const ict = box.firstElementChild || box, br = box.getBoundingClientRect(), ir = ict.getBoundingClientRect();
      if (ir.right > br.right + 1) res.push(`U-5: zu langer Eintrag ragt ${Math.round(ir.right - br.right)} px aus der Spalte`);
      const n = [...box.querySelectorAll('*'), box].flatMap(e => [...e.childNodes]).find(t => t.nodeType === 3 && t.data.trim());
      if (n && zeilen(rng(n, 0, n.data.length)).length < 2) res.push('U-5: zu langer Eintrag bricht nicht im Text um');
      res.push(...pruefe(box, 160).map(t => 'U-5: ' + t));
      box.remove();
    }
    return res;
  }, { sel, lang });
  if (!funde) E(`Reihe ${sel} fehlt`); else funde.forEach(f => E(f));
  return errors;
}
