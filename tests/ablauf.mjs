// AppDesign 4.12.0 · Ablauf-Prüfungen für Regeln, die eine Handlung brauchen (Designrichtlinie allgemein, Abschnitt 17):
// R-2.3 Suche (seit 4.23.0 auch in der zentralen Liste) · R-4.4 Fenster-Kopfzeile · R-5.2 Texteingabe · R-5.3 Fehlermeldungen · R-5.5 Eingabetaste (seit 4.19.0) · R-6.4 Ausgabe und Vorschau · R-7.3 Liste steht still (seit 4.18.0) · R-7.4 Position beim Öffnen und R-8.1 Seitenleiste ein/aus (seit 4.21.0).
// Jede Funktion bekommt eine Playwright-Seite und gibt eine Liste von Fehlern zurück (leer = in Ordnung), je mit Regelnummer.
// Einbinden im Prüfskript der App:  import { checkSearch, checkDialogHead } from '../../AppDesign/tests/ablauf.mjs';
//                                   fehler.push(...await checkSearch(page, { term: 'Sydney' }));
const wait = (p, ms = 250) => p.waitForTimeout(ms);
const rgbOf = c => (c.match(/[\d.]+/g) || [0, 0, 0]).slice(0, 3).map(Number);

// R-2.3 Suche: Suchzeile unter der Leiste über die volle Breite; Treffer ‚3 von 57‘ bzw. ‚0‘; nach kurzer Pause steht der
// Treffer direkt unter der Suchzeile; Pfeile ohne Umlauf; nur Einträge mit Treffern. term: ein Begriff, der weit unten steht.
export async function checkSearch(p, { term, open = '#searchBtn', input = '#search', count = '#scount', prev = '#sprev', next = '#snext',
  bar = '#bar', row = '.nb2', item = '#app [data-day]', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 ${t}`);
  await p.evaluate(() => scrollTo(0, 0));
  await p.click(open); await wait(p);
  await p.locator(input).pressSequentially(term, { delay: 20 }); await wait(p, 900);
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
  await p.locator(input).fill(''); await p.locator(input).pressSequentially('zqxzqx', { delay: 10 }); await wait(p, 700);
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
  await p.locator(input).pressSequentially(term, { delay: 20 }); await wait(p, 400);
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

// R-7.3 (seit 4.18.0, A-13) Liste steht still: solange ein Fenster aus einer Zeile offen ist, bewegt sich die Seite dahinter
// nicht; danach steht sie wie vorher, die Zeile wird kurz hervorgehoben; nach ‹ › im Fenster rollt sie nur so weit, bis die
// zuletzt gezeigte Zeile ganz sichtbar ist. Safari nachgebildet: die Tastatur schiebt beim Schreiben die ganze Seite (scrollBy).
// item: Zeilen bzw. Kästen; field: Eingabefeld im Fenster; next: Schaltfläche ‚Folgetag‘ im Fenster (ohne: kein Blättern).
export async function checkListStill(p, { item, field, next = '', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-7.3 ${t}`);
  // Zeilen im Bild: tippbar (Kopf sichtbar) bzw. ganz sichtbar (unter Leiste und Tabellenkopf, über dem unteren Rand)
  const rows = () => p.evaluate(item => {
    const edge = Math.max(...[...document.querySelectorAll('.nb, .pnav, #bar, table.days:not(.static) th')].map(e => e.getBoundingClientRect().bottom), 0);
    const all = [...document.querySelectorAll(item)].filter(e => e.getClientRects().length).map(e => ({ key: e.dataset.day || e.dataset.keep, r: e.getBoundingClientRect() }));
    return { edge, y: scrollY, n: all.length, keys: all.map(x => x.key), tap: all.filter(x => x.r.top >= edge - 1 && x.r.top <= innerHeight - 80).map(x => x.key),
      full: all.filter(x => x.r.top >= edge - 1 && (x.r.bottom <= innerHeight + 1 || x.r.top <= edge + 8)).map(x => x.key) };
  }, item);
  const state = key => p.evaluate(({ item, key }) => {
    const e = [...document.querySelectorAll(item)].find(x => (x.dataset.day || x.dataset.keep) === key && x.getClientRects().length);
    return { y: Math.round(scrollY), top: e ? Math.round(e.getBoundingClientRect().top) : null, flash: e ? e.getAnimations().length > 0 : false };
  }, { item, key });
  const tap = key => p.evaluate(({ item, key }) => [...document.querySelectorAll(item)].find(x => (x.dataset.day || x.dataset.keep) === key && x.getClientRects().length).click(), { item, key });
  await p.evaluate(() => scrollTo(0, Math.min(1200, document.documentElement.scrollHeight - innerHeight - 400))); await wait(p, 300);
  const shown = await rows();
  if (shown.tap.length < 2) { E(`zu wenige sichtbare Zeilen zum Prüfen (${shown.tap.length} von ${shown.n}, Kante ${Math.round(shown.edge)} px, Scrollstand ${Math.round(shown.y)})`); return errors; }
  // Seit 4.23.0: zusätzlich eine Zeile genau 2 px unter Leiste bzw. Tabellenkopf (ganz sichtbar, innerhalb des Abstands von 6 px,
  // den die App beim Rollen lässt) – vorher hing es von der Breite der Seitenleiste ab, ob eine Zeile so lag.
  const edge2 = key => p.evaluate(({ item, key }) => {
    const edge = Math.max(...[...document.querySelectorAll('.nb, .pnav, #bar, table.days:not(.static) th')].map(e => e.getBoundingClientRect().bottom), 0);
    const e = [...document.querySelectorAll(item)].find(x => (x.dataset.day || x.dataset.keep) === key && x.getClientRects().length);
    scrollBy({ top: e.getBoundingClientRect().top - edge - 2, behavior: 'instant' });
  }, { item, key });
  // Seit 4.23.1 (P-51/5): Tastatur nachgebildet wie in Safari – solange sie offen ist, ist der sichtbare Bereich
  // (visualViewport) nur halb so hoch; sie geht erst 400 ms nach dem Schließen des Fensters zu. Dazu Zeilen aus der unteren Hälfte.
  const keyboard = on => p.evaluate(on => {
    if (!on) return Object.defineProperty(window, 'visualViewport', { configurable: true, get: () => window.__realVV });
    window.__realVV = window.__realVV || window.visualViewport;
    const fake = { height: innerHeight / 2, width: innerWidth, offsetTop: 0, offsetLeft: 0, scale: 1, addEventListener() {}, removeEventListener() {} };
    Object.defineProperty(window, 'visualViewport', { configurable: true, get: () => fake });
  }, on);
  const lower = () => p.evaluate(item => [...document.querySelectorAll(item)].filter(e => e.getClientRects().length)
    .filter(e => e.getBoundingClientRect().top > innerHeight * 0.55 && e.getBoundingClientRect().top < innerHeight - 80).map(e => e.dataset.day || e.dataset.keep)[0], item);
  for (const [art, close, wo] of [['Häkchen', '#dlgOk'], ['x ohne Änderung', '#dlgX'], ['Häkchen, Zeile 2 px unter dem Kopf', '#dlgOk', 'nah'],
    ['Häkchen, Zeile in der unteren Hälfte', '#dlgOk', 'unten'], ['x, Zeile in der unteren Hälfte', '#dlgX', 'unten']]) {
    const key = wo === 'nah' ? shown.tap[1] : wo === 'unten' ? await lower() : shown.tap[0];
    if (!key) { E(`${art}: keine Zeile zum Prüfen`); continue; }
    if (wo === 'nah') { await edge2(key); await wait(p, 300); }
    const vor = await state(key);
    await tap(key); await wait(p, 300);
    await keyboard(true);
    if (close === '#dlgOk') { await p.locator(field).first().click(); await p.evaluate(() => scrollBy(0, 300)); await p.locator(field).first().pressSequentially(' neu', { delay: 10 }); }
    else await p.evaluate(() => scrollBy(0, 300));                   // Wischen bzw. Tastatur schiebt die Seite
    await p.click(close);
    setTimeout(() => keyboard(false).catch(() => {}), 400);
    // die Hervorhebung beginnt im nächsten Bildaufbau – unter Last (voller Lauf, WebKit) bis zu 800 ms warten
    let flash = false; for (let i = 0; i < 16 && !flash; i++) { await wait(p, 50); flash = (await state(key)).flash; }
    if (!flash) E(`${art}: Zeile ${key} wird nach dem Schließen nicht kurz hervorgehoben`);
    await wait(p, 1200);
    const ruhig = await state(key);
    if (Math.abs(ruhig.y - vor.y) > 1 || Math.abs(ruhig.top - vor.top) > 1) E(`${art}: Seite steht nach dem Schließen nicht wie vorher (Scrollstand ${vor.y} → ${ruhig.y}, Zeile ${key} ${vor.top} → ${ruhig.top} px)`);
    if (ruhig.flash) E(`${art}: Hervorhebung der Zeile ${key} endet nicht`);
  }
  if (next) {
    const first = shown.tap.at(-1); await tap(first); await wait(p, 300);
    for (let i = 0; i < 4; i++) { await p.click(next); await wait(p, 200); }
    await p.click('#dlgOk'); await wait(p, 400);
    const nach = await rows(), want = nach.keys[nach.keys.indexOf(first) + 4];
    if (!nach.full.includes(want)) E(`nach ‹ › ist die zuletzt gezeigte Zeile ${want} nicht ganz sichtbar`);
    // ‹ › auf eine Zeile, die schon ganz sichtbar ist: nichts rollt
    const key = nach.keys.find((k, i) => nach.full.includes(nach.keys[i + 1]) && nach.tap.includes(k));
    if (key) {
      const vor = await state(key); await tap(key); await wait(p, 300); await p.click(next); await wait(p, 200); await p.click('#dlgOk'); await wait(p, 400);
      const y = (await state(key)).y;
      if (y !== vor.y) E(`nach ‹ › auf eine sichtbare Zeile rollt die Seite (${vor.y} → ${y})`);
    }
  }
  return errors;
}
