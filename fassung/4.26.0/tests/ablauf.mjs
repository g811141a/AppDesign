// AppDesign 4.12.0 · Ablauf-Prüfungen für Regeln, die eine Handlung brauchen (Designrichtlinie allgemein, Abschnitt 17):
// R-1.6 Messmodus (seit 4.26.0) · R-2.3 Suche (seit 4.23.0 auch in der zentralen Liste, seit 4.25.0 mehrere Wörter und „…“, seit 4.25.1 Suchfeld bleibt beim Tippen) · A-22 Lupe am Ende der Kapsel · R-4.4 Fenster-Kopfzeile · R-5.2 Texteingabe · R-5.3 Fehlermeldungen · R-5.5 Eingabetaste (seit 4.19.0) · R-6.4 Ausgabe und Vorschau · R-7.3 Liste steht still (seit 4.18.0) · R-7.4 Position beim Öffnen und R-8.1 Seitenleiste ein/aus (seit 4.21.0).
// Jede Funktion bekommt eine Playwright-Seite und gibt eine Liste von Fehlern zurück (leer = in Ordnung), je mit Regelnummer.
// Einbinden im Prüfskript der App:  import { checkSearch, checkDialogHead } from '../../AppDesign/tests/ablauf.mjs';
//                                   fehler.push(...await checkSearch(page, { term: 'Sydney' }));
const wait = (p, ms = 250) => p.waitForTimeout(ms);
// R-2.3 (seit 4.25.1, A-24): beim Tippen bleibt das Suchfeld dasselbe Element und behält den Fokus – sonst schließt Safari am
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
    if (!await keeps()) { E(`beim Tippen (${k === 'Backspace' ? 'Löschen' : `‚${text.slice(0, i + 1)}‘`}) wird das Suchfeld ersetzt oder verliert den Fokus – am iPhone zittern Kopf- und Suchzeile (A-24)`); return; }
  }
}
const rgbOf = c => (c.match(/[\d.]+/g) || [0, 0, 0]).slice(0, 3).map(Number);

// R-2.3 Suche: Suchzeile unter der Leiste über die volle Breite; Treffer ‚3 von 57‘ bzw. ‚0‘; nach kurzer Pause steht der
// Treffer direkt unter der Suchzeile; Pfeile ohne Umlauf; nur Einträge mit Treffern. term: ein Begriff, der weit unten steht.
export async function checkSearch(p, { term, open = '#searchBtn', input = '#search', count = '#scount', prev = '#sprev', next = '#snext',
  bar = '#bar', row = '.nb2', item = '#app [data-day]', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 ${t}`);
  await p.evaluate(() => scrollTo(0, 0));
  await p.click(open); await wait(p);
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
  await p.click(open); await wait(p);
  return errors;
}

// R-2.3 Suche in der zentralen Liste (seit 4.23.0, A-19): Lupe in der Kopfzeile der Liste öffnet die Suchzeile; beim Tippen
// bleiben nur Einträge mit Treffer, jede Kachel zeigt ‚N Treffer‘ (je Fundstelle); Antippen öffnet den Eintrag mit gefüllter
// Suche ‚1 von N‘ (gleiches N); sind beide Suchfelder offen, laufen sie 1:1 mit; zurück bleibt die Liste gefiltert; x zeigt
// wieder alle; ohne Treffer ‚Keine Treffer‘. term: kommt in einigen, nicht allen Einträgen vor. back(): zurück zur Liste
// (iPhone-Aufbau), sonst ist die Liste neben dem Eintrag sichtbar.
export async function checkListSearch(p, { term, open = '#listSearchBtn', input = '#lsearch', clear = '#lsclear', row = '#side .side-row',
  hits = 'small.hits', inner = '#search', innerCount = '#scount', back = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 Liste: ${t}`);
  const list = () => p.evaluate(({ row, hits, input }) => ({ value: document.querySelector(input)?.value ?? null,
    focus: document.activeElement?.id || '', rows: [...document.querySelectorAll(row)].filter(e => e.getClientRects().length)
      .map(e => ({ hits: e.querySelector(hits)?.textContent.trim() || '' })),
    empty: /Keine Treffer/.test(document.querySelector('#side')?.textContent || '') }), { row, hits, input });
  const all = (await list()).rows.length;
  await p.click(open); await wait(p);
  let l = await list();
  if (l.value === null) E('Lupe öffnet keine Suchzeile');
  else if (l.focus !== input.replace('#', '')) E('Suchzeile hat nach der Lupe keinen Fokus');
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
  await p.click(open); await wait(p);
  l = await list();
  if (l.value !== null || l.rows.length !== all) E('Lupe schließt die Suchzeile nicht bzw. zeigt nicht wieder alle Einträge');
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
  await open(); await wait(p, 350);
  let h = await head();
  if (!h.x || !h.xLeft) E('x steht nicht links in der Kopfzeile');
  if (!h.ok || !h.okRight) E('Häkchen steht nicht rechts in der Kopfzeile');
  if (h.blue) E('Häkchen ist vor einer Änderung schon blau');
  await p.click('#dlgX'); await wait(p);
  if (await p.locator('.pop').count()) { E('x ohne Änderung fragt nach'); await p.locator('.pop button').last().click(); await wait(p); }
  if ((await head()).open) { E('x ohne Änderung schließt das Fenster nicht'); await p.evaluate(() => document.getElementById('dlg').close()); }
  await open(); await wait(p, 350);
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
  if (await p.evaluate(() => [...document.querySelectorAll('#dlg button')].some(b => /diktier|mikrofon/i.test(b.getAttribute('aria-label') + b.textContent)))) E('eigener Knopf zum Diktieren');
  await p.evaluate(() => document.getElementById('dlg').close()); await wait(p);
  return errors;
}

// R-5.5 Eingabetaste (seit 4.19.0, A-14): einzeilige Felder zeigen ‚Fertig‘ (enterkeyhint="done", Suchfeld ‚Suchen‘); die
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

// R-7.4 Position beim Öffnen (seit 4.21.0, A-16): open() öffnet einen Eintrag; want = data-day (bzw. data-keep) des
// ‚nächsten offenen‘ Eintrags oder null. Mit want: genau dieser ist hervorgehoben (mark) und steht direkt unter dem Kopf
// (Leiste und haftender Tabellenkopf, ± 2 px) – ist die Seite nicht so weit rollbar, ganz unten und ganz sichtbar.
// Ohne want: ganz oben, nichts hervorgehoben.
export async function checkOpenAt(p, { open, want = null, mark = '.gap', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-7.4 ${t}`);
  await open(); await wait(p, 400);
  const r = await p.evaluate(({ want, mark }) => {
    const bar = document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
    const marked = [...document.querySelectorAll(`#app ${mark}`)].filter(e => e.getClientRects().length).map(e => e.dataset.day || e.dataset.keep);
    const el = want ? document.querySelector(`#app [data-day="${want}"], #app [data-keep="${want}"]`) : null;
    const th = el?.closest('table')?.tHead?.querySelector('th');
    const edge = bar + (th && getComputedStyle(th).position === 'sticky' ? th.offsetHeight : 0);
    const er = el?.getBoundingClientRect();
    return { y: Math.round(scrollY), max: Math.round(document.documentElement.scrollHeight - innerHeight), marked, edge: Math.round(edge),
      top: er ? Math.round(er.top) : null, bottom: er ? Math.round(er.bottom) : null, h: innerHeight };
  }, { want, mark });
  if (!want) {
    if (r.y > 1) E(`alles erfasst: nicht ganz oben (${r.y} px gerollt)`);
    if (r.marked.length) E(`alles erfasst: hervorgehoben ${r.marked.join(', ')}`);
  } else {
    if (r.marked.join() !== want) E(`hervorgehoben ‚${r.marked.join(', ')}‘ statt ‚${want}‘`);
    if (r.top === null) E(`Eintrag ${want} fehlt`);
    else if (Math.abs(r.top - r.edge) > 2 && !(r.y >= r.max - 1 && r.top >= r.edge - 2 && r.bottom <= r.h)) E(`${want} steht nicht direkt unter dem Kopf (oben ${r.top} px, Kopf endet bei ${r.edge} px, gerollt ${r.y} von ${r.max})`);
  }
  return errors;
}

// R-8.1 Seitenleiste ein/aus (seit 4.21.0, A-17): der oberste sichtbare Eintrag bleibt derselbe; nach einer geraden Zahl von
// Umschaltungen steht er auf ± 2 px an derselben Stelle (kein Wandern); ganz oben bleibt ganz oben; ohne Eintrag oben (Ende der
// Seite) bleibt der Abstand zum Ende gleich – kein Sprung nach oben oder ans Ende. at: Anteil des Scrollwegs.
export async function checkSideToggle(p, { toggle = '[data-side-toggle]', at = 0.5, times = 5, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-8.1 ${t}`);
  const top = () => p.evaluate(() => {
    const edge = document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
    const e = [...document.querySelectorAll('#app [data-day], #app [data-keep]')].find(x => x.getClientRects().length && x.getBoundingClientRect().bottom > edge + 1);
    return { id: e ? e.dataset.day || e.dataset.keep : null, top: e ? Math.round(e.getBoundingClientRect().top) : null, y: Math.round(scrollY),
      rest: Math.round(document.documentElement.scrollHeight - innerHeight - scrollY) };
  });
  const press = async () => { await p.locator(toggle).filter({ visible: true }).first().click(); await wait(p, 350); };
  await p.evaluate(a => scrollTo({ top: Math.round((document.documentElement.scrollHeight - innerHeight) * a), behavior: 'instant' }), at); await wait(p, 300);
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
  await p.addStyleTag({ content: 'html, body { overflow-anchor: none !important; }' });
  const lage = () => p.evaluate(() => {
    const edge = document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
    const e = [...document.querySelectorAll('#app [data-day], #app [data-keep]')].find(x => x.getClientRects().length && x.getBoundingClientRect().bottom > edge + 1);
    return { tag: e ? e.dataset.day || e.dataset.keep : null, rest: Math.round(document.documentElement.scrollHeight - innerHeight - scrollY), y: Math.round(scrollY) };
  });
  await p.evaluate(b => scrollTo({ top: document.documentElement.scrollHeight - innerHeight - b, behavior: 'instant' }), back); await wait(p, 400);
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

// R-7.3 (seit 4.18.0, A-13; seit 4.23.2 neu gefasst nach P-52) Liste steht still: solange ein Fenster aus einer Zeile offen
// ist, bewegt sich die Liste dahinter nicht; nach dem Schließen (Häkchen oder x) steht die oberste Zeile unter der Leiste
// genau wie beim Öffnen – auch nach ‹ › im Fenster; die Zeile aus dem Fenster wird hervorgehoben (wenn sichtbar; seit 4.24.0, A-23:
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
  const look = () => p.evaluate(({ item, edgeJs }) => {
    const edge = eval(edgeJs), all = [...document.querySelectorAll(item)].filter(e => e.getClientRects().length);
    const k = e => e.dataset.day || e.dataset.keep, top = all.find(e => e.getBoundingClientRect().bottom > edge + 1);
    return { y: Math.round(scrollY), key: top && k(top), top: top ? Math.round(top.getBoundingClientRect().top) : null,
      tap: all.filter(e => e.getBoundingClientRect().top >= edge - 1 && e.getBoundingClientRect().top <= innerHeight - 80).map(e => ({ key: k(e), at: e.getBoundingClientRect().top / innerHeight })) };
  }, { item, edgeJs });
  const flash = key => p.evaluate(({ item, key }) => [...document.querySelectorAll(item)].some(x => (x.dataset.day || x.dataset.keep) === key && x.getAnimations().length > 0), { item, key });
  // A-23 (seit 4.24.0): Verlauf der Hervorhebung – Farbe kurz vor Ende des Haltens (voll --sel-bg?) und Gesamtdauer; danach beenden
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
      await p.evaluate(resize => { window.__realVV ||= window.visualViewport;
        const fake = { height: resize ? innerHeight : Math.round(innerHeight * 0.6), width: innerWidth, offsetTop: 0, offsetLeft: 0, scale: 1, addEventListener() {}, removeEventListener() {} };
        Object.defineProperty(window, 'visualViewport', { configurable: true, get: () => fake }); scrollBy(0, 250); }, resize);
    } else {
      await wait(p, 250);
      if (resize) await p.setViewportSize(vp);
      await p.evaluate(late => { Object.defineProperty(window, 'visualViewport', { configurable: true, get: () => window.__realVV }); if (late) scrollBy(0, -250); }, late);
    }
  };
  const reset = async () => {
    if (start) await start();
    else { await p.evaluate(() => scrollTo(0, Math.min(1200, document.documentElement.scrollHeight - innerHeight - 400))); await wait(p, 300); }
  };
  // Fälle wie in P-51/5 und P-52/2–4: Zeile oben, 3 Zeilen tiefer, untere Hälfte, Zeile 2 px unter dem Kopf, 5 Tage vorblättern
  const cases = [['Häkchen, oberste Zeile', '#dlgOk', 'oben', 'alle'], ['x, oberste Zeile', '#dlgX', 'oben', 'late'],
    ['Häkchen, 3 Zeilen tiefer', '#dlgOk', 'tiefer', 'vv'], ['Häkchen, 3 Zeilen tiefer', '#dlgOk', 'tiefer', 'resize'], ['Häkchen, 3 Zeilen tiefer', '#dlgOk', 'tiefer', 'late'],
    ['Häkchen, untere Hälfte', '#dlgOk', 'unten', 'vv'], ['x, untere Hälfte', '#dlgX', 'unten', 'alle'], ['Häkchen, Zeile 2 px unter dem Kopf', '#dlgOk', 'nah', 'alle']];
  if (next) cases.push(['Häkchen nach 5× ‹ ›', '#dlgOk', 'blättern', 'vv'], ['Häkchen nach 5× ‹ ›', '#dlgOk', 'blättern', 'resize'], ['x nach 5× ‹ ›', '#dlgX', 'blättern', 'late']);
  for (const [n, [fall, close, wo, kb]] of cases.entries()) {
    const art = `${fall} (Tastatur ${kb})`;
    // A-23: der zweite Fall läuft mit ‚Bewegung reduzieren‘ (2 s voll, dann ohne Ausblenden weg)
    const still = n === 1; await p.emulateMedia({ reducedMotion: still ? 'reduce' : 'no-preference' });
    await reset();
    let vor = await look();
    if (vor.tap.length < 4) { E(`${art}: zu wenige sichtbare Zeilen zum Prüfen (${vor.tap.length}, Scrollstand ${vor.y})`); continue; }
    const key = { oben: vor.tap[0], tiefer: vor.tap[3], nah: vor.tap[1], blättern: vor.tap.at(-2) }[wo]?.key ?? vor.tap.find(t => t.at > 0.55)?.key;
    if (!key) { E(`${art}: keine Zeile in der unteren Hälfte`); continue; }
    if (wo === 'nah') {
      await p.evaluate(({ item, key, edgeJs }) => { const e = [...document.querySelectorAll(item)].find(x => (x.dataset.day || x.dataset.keep) === key && x.getClientRects().length);
        scrollBy({ top: e.getBoundingClientRect().top - eval(edgeJs) - 2, behavior: 'instant' }); }, { item, key, edgeJs });
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
        if (Math.abs(g.end - soll) > 50) E(`${art}: Hervorhebung dauert ${g.end} ms statt ${soll} ms (A-23${still ? ', Bewegung reduzieren' : ''})`);
      }
    }
    await zu; await wait(p, 1500);
    const nach = await look();
    if (nach.key !== vor.key || Math.abs(nach.top - vor.top) > 1)
      E(`${art} (Zeile ${key}): Liste steht nach dem Schließen nicht wie beim Öffnen – oben ${vor.key} bei ${vor.top} px → ${nach.key} bei ${nach.top} px (Scrollstand ${vor.y} → ${nach.y})`);
    await stop();
  }
  await p.emulateMedia({ reducedMotion: 'no-preference' });
  // A-23: geht während der Hervorhebung das nächste Fenster auf, endet sie sofort
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

// R-2.3 (seit 4.25.0, A-21; Fall-Liste arbeit/A-21 A-22 Fall-Liste.md) Suche mit mehreren Begriffen – die Bausteine aus ui.js
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
  return errors;
}

// A-22 (seit 4.25.0): die Lupe steht in jeder Kapsel am Ende, dahinter höchstens das Mehr-Menü (…) – wie Apple (15.5).
export async function checkSearchPlace(p, { search = 'button[aria-label="Suchen"]', more = 'button[aria-label="Mehr"]', where = '' } = {}) {
  const errors = [];
  const r = await p.evaluate(({ search, more }) => [...document.querySelectorAll(`.grp ${search}`)].filter(b => b.getClientRects().length).map(b => {
    const after = [...b.parentElement.children].slice([...b.parentElement.children].indexOf(b) + 1).filter(x => x.getClientRects().length);
    return { id: b.id, ok: after.length === 0 || (after.length === 1 && after[0].matches(more)), after: after.map(x => x.getAttribute('aria-label') || x.id) };
  }), { search, more });
  if (!r.length) errors.push(`${where ? where + ': ' : ''}A-22 keine Lupe in einer Kapsel gefunden`);
  r.filter(x => !x.ok).forEach(x => errors.push(`${where ? where + ': ' : ''}A-22 Lupe ${x.id} steht nicht am Ende der Kapsel – dahinter ${x.after.join(', ')}`));
  return errors;
}

// R-1.6 Messmodus (seit 4.26.0, A-27, Fall-Liste arbeit/A-27 Fall-Liste.md F1–F12): Start und Ende im Mehr-Menü der Seitenleiste,
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
  // F2: starten
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
  await p.evaluate(() => scrollBy(0, 40)); await wait(p, 300);
  // F5: drehen
  const vp = p.viewportSize(); await p.setViewportSize({ width: vp.height, height: vp.width }); await wait(p, 400);
  await p.setViewportSize(vp); await wait(p, 400);
  const z = await p.evaluate(() => mess.zeilen);
  for (const [re, was] of [[/! start$/, 'Start'], [new RegExp(`! focus ${input.replace('#', '')}$`), 'Fokus auf das Suchfeld'], [/! eingabe 1$/, 'Eingabe (Länge 1)'], [/! eingabe 3$/, 'Eingabe (Länge 3)'],
    [/! tippen /, 'Tippen'], [/! resize$/, 'Größenänderung'], [/ quer( |$)/, 'Lage quer'], [/! neuaufbau /, 'Neuaufbau']])
    if (!z.some(x => re.test(x))) E(`Datei ohne Zeile für ${was}`);
  const kopf = z[1].split(/\s+/);
  for (const k of ['t', 'sy', 'sh', 'ih', 'vh', 'vt', 'vvtop', 'fokus', 'lage']) if (!kopf.includes(k)) E(`Spalte ‚${k}‘ fehlt (${z[1]})`);
  const daten = z.slice(2).filter(x => !x.startsWith('#'));
  if (daten.some(x => x.split('!')[0].trim().split(/\s+/).length !== kopf.length)) E('Zeilen haben nicht so viele Werte wie Spalten');
  // F4: Werte stimmen mit der Seite überein (letzte Zeile ohne Ereignis ↔ jetzt)
  await p.evaluate(() => messZeile('probe'));
  const probe = await p.evaluate(() => ({ z: mess.zeilen.at(-1).split(/\s+/), sy: Math.round(scrollY), ih: innerHeight, vh: Math.round(visualViewport?.height ?? innerHeight) }));
  if (+probe.z[kopf.indexOf('sy')] !== probe.sy || +probe.z[kopf.indexOf('ih')] !== probe.ih || +probe.z[kopf.indexOf('vh')] !== probe.vh)
    E(`Werte der Zeile passen nicht zur Seite (${probe.z.join(' ')} – scrollY ${probe.sy}, innerHeight ${probe.ih}, vv ${probe.vh})`);
  // F7: Grenze 5 Minuten – endet von selbst, Menü zeigt ‚beendet‘
  await p.evaluate(() => { mess.start -= MESS_MAX_MS + 1000; messZeile('grenze'); });
  if (await p.evaluate(() => mess.an)) E('Messung endet nach 5 Minuten nicht von selbst');
  if (!/Grenze erreicht/.test(await p.evaluate(() => mess.zeilen.at(-1)))) E('Ende der Messung ohne Zeile ‚Grenze erreicht‘');
  const l2 = await label();
  if (!/^Messung beenden und teilen \| beendet · /.test(l2)) E(`Mehr-Menü nach der Grenze nicht ‚beendet‘ (‚${l2}‘)`);
  // F8/F9: beenden und teilen – Datei messung-JJJJ-MM-TT-hhmm.txt (geladen, wo es kein Teilen-Menü gibt)
  await p.evaluate(() => { window.__mess = []; const orig = shareFiles; shareFiles = files => { window.__mess.push(...files); return orig(files); }; });
  const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }).catch(() => null), item().click()]);
  await wait(p, 300);
  const f = (await p.evaluate(() => window.__mess.map(x => ({ name: x.name, content: x.content }))))[0];
  if (!dl || !f) E('‚Messung beenden und teilen‘ liefert keine Datei');
  else {
    if (!/^messung-\d{4}-\d\d-\d\d-\d{4}\.txt$/.test(f.name)) E(`Dateiname ‚${f.name}‘ nicht ‚messung-JJJJ-MM-TT-hhmm.txt‘`);
    if (!/^# Messung · .+ \d+\.\d+\.\d+ · AppDesign \d+\.\d+\.\d+ · .+ · (Home-Bildschirm|Safari) · \d+×\d+ @[\d.]+ · (hell|dunkel) · \d{4}-/.test(f.content)) E(`Kopf der Datei unvollständig: ${f.content.split('\n')[0]}`);
    for (const s of ['Rom', ...secret]) if (f.content.includes(s)) E(`Datei enthält den Text ‚${s}‘ (Datenschutz: nur Längen und ids)`);
  }
  if (await p.evaluate(() => mess !== null)) E('nach dem Teilen ist die Messung nicht abgeschlossen');
  // F11: neu laden verwirft eine laufende Messung
  await menu(); await wait(p, 200); await item().click(); await wait(p, 200);
  await p.reload(); await wait(p, 400);
  if (await p.evaluate(() => mess !== null)) E('nach dem Neuladen läuft noch eine Messung');
  await p.evaluate(() => scrollTo(0, 0));
  return errors;
}
