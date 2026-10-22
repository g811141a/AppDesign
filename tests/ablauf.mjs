// AppDesign 4.12.0 · Ablauf-Prüfungen für Regeln, die eine Handlung brauchen (Designrichtlinie allgemein, Abschnitt 17):
// R-1.6 Messmodus (seit 4.26.0) · R-4.5 Feld über der Tastatur (seit 4.28.0), Tastatur ohne Springen (seit 4.28.1) · R-2.3 Suche (seit 4.23.0 auch in der zentralen Liste, seit 4.25.0 mehrere Wörter und „…“, seit 4.25.1 Suchfeld bleibt beim Tippen) · A-22 Lupe am Ende der Kapsel · R-4.4 Fenster-Kopfzeile · R-5.2 Texteingabe · R-5.3 Fehlermeldungen · R-5.5 Eingabetaste (seit 4.19.0) · R-5.6 ⓧ in Feldern (seit 4.29.0) · R-6.4 Ausgabe und Vorschau · R-7.3 Liste steht still (seit 4.18.0) · R-7.4 Position beim Öffnen und R-8.1 Seitenleiste ein/aus (seit 4.21.0) · R-3.2 Kapsel nur mit wirksamen Pfeilen und Schnellroll-Griff, R-7.5 Navigation und Gesten (seit 4.30.0).
// Jede Funktion bekommt eine Playwright-Seite und gibt eine Liste von Fehlern zurück (leer = in Ordnung), je mit Regelnummer.
// Einbinden im Prüfskript der App:  import { checkSearch, checkDialogHead } from '../../AppDesign/tests/ablauf.mjs';
//                                   fehler.push(...await checkSearch(page, { term: 'Sydney' }));
import { ROLL, rolle, rollstand } from './pruefe.mjs';
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
  await rolle(p, 0);
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

// R-5.6 ⓧ in einzeiligen Feldern (seit 4.29.0, A-63 C3, Fall-Liste arbeit/A-63 Fall-Liste.md X-1 bis X-8): open() öffnet Fenster
// bzw. Ansicht (optional); fields: [{ sel, text, warn }] – warn: Pflichtfeld, nach dem Leeren mit ⓧ steht die Fehlermeldung (X-4).
// Geprüft: leer bzw. ohne Fokus kein ⓧ; mit Text rechts im Feld, 44 × 44, Text läuft nicht darunter; Antippen leert, Fokus bleibt,
// die App bekommt ein input-Ereignis; das ⓧ rollt mit (X-7) und bleibt nach dem Drehen am Feld (X-8).
export async function checkClear(p, { open, fields = [], where = '' } = {}) {
  const errors = [], E = (sel, t) => errors.push(`${where ? where + ': ' : ''}R-5.6 ${sel}: ${t}`);
  if (open) { await open(); await wait(p, 350); }
  const lage = sel => p.evaluate(sel => {
    const f = document.querySelector(sel), x = [...document.querySelectorAll('.fclear')].find(b => b.getClientRects().length && getComputedStyle(b).visibility !== 'hidden');
    if (!x) return { x: false, fokus: document.activeElement === f, wert: f.value };
    const fr = f.getBoundingClientRect(), xr = x.getBoundingClientRect(), cs = getComputedStyle(f);
    return { x: true, fokus: document.activeElement === f, wert: f.value, w: Math.round(xr.width), h: Math.round(xr.height), rechts: Math.round(fr.right - xr.right),
      mitte: Math.round((xr.top + xr.bottom) / 2 - (fr.top + fr.bottom) / 2), platz: parseFloat(cs.paddingRight), farbe: getComputedStyle(x).color };
  }, sel);
  const amFeld = (sel, l, wann) => {
    if (!l.x) { E(sel, `kein ⓧ ${wann}`); return; }
    if (l.w < 44 || l.h < 44) E(sel, `ⓧ ${wann}: Antippfläche ${l.w} × ${l.h} statt 44 × 44`);
    if (Math.abs(l.rechts) > 2 || Math.abs(l.mitte) > 2) E(sel, `ⓧ ${wann} nicht rechts im Feld (Abstand rechts ${l.rechts} px, senkrecht ${l.mitte} px versetzt)`);
    if (l.platz < 32) E(sel, `ⓧ ${wann}: Text läuft unter das ⓧ (Abstand rechts ${l.platz} px)`);
  };
  for (const { sel, text = 'Abc', warn = false } of fields) {
    await p.locator(sel).scrollIntoViewIfNeeded(); await p.locator(sel).fill(''); await p.locator(sel).focus(); await wait(p, 100);
    if ((await lage(sel)).x) E(sel, 'ⓧ im leeren Feld (X-3)');
    await p.keyboard.type(text); await wait(p, 150);
    amFeld(sel, await lage(sel), 'mit Text (X-1)');
    // X-7: im Rollbereich des Feldes rollen – das ⓧ bleibt am Feld
    const gerollt = await p.evaluate(sel => { for (let a = document.querySelector(sel).parentElement; a; a = a.parentElement) {
      if (/auto|scroll/.test(getComputedStyle(a).overflowY) && a.scrollHeight > a.clientHeight + 20) { const y = a.scrollTop; a.scrollTop = y > 10 ? y - 10 : y + 10; return true; } } return false; }, sel);
    if (gerollt) { await wait(p, 150); amFeld(sel, await lage(sel), 'nach dem Rollen (X-7)'); }
    // X-8: drehen und zurück
    const vp = p.viewportSize();
    await p.setViewportSize({ width: vp.height, height: vp.width }); await wait(p, 400);
    if ((await lage(sel)).fokus) amFeld(sel, await lage(sel), 'nach dem Drehen (X-8)');
    await p.setViewportSize(vp); await wait(p, 400);
    if (!(await lage(sel)).fokus) await p.locator(sel).focus();
    await p.locator(sel).scrollIntoViewIfNeeded(); await wait(p, 100);   // nach dem Drehen steht oben derselbe Eintrag (R-8.1) – Feld ins Bild
    // X-2: Antippen leert, Fokus bleibt, die App erfährt es
    await p.evaluate(sel => { window.__fxInput = 0; document.querySelector(sel).addEventListener('input', () => window.__fxInput++, { once: true }); }, sel);
    const ziel = await p.evaluate(() => { const r = document.querySelector('.fclear')?.getBoundingClientRect(); return r && r.width ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null; });
    if (!ziel || ziel.y < 0 || ziel.y > p.viewportSize().height) { E(sel, `ⓧ nicht zu sehen (${JSON.stringify(ziel)}) (X-2)`); await p.locator(sel).blur(); continue; }
    await p.mouse.click(ziel.x, ziel.y); await wait(p, 150);
    const l = await lage(sel), gemeldet = await p.evaluate(() => window.__fxInput);
    if (l.wert !== '') E(sel, `ⓧ leert das Feld nicht (‚${l.wert}‘) (X-2)`);
    if (!l.fokus) E(sel, 'nach dem ⓧ hat das Feld keinen Fokus mehr – die Tastatur schließt (X-2)');
    if (l.x) E(sel, 'ⓧ bleibt im leeren Feld (X-2)');
    if (!gemeldet) E(sel, 'die App erfährt das Leeren nicht (kein input-Ereignis) (X-2)');
    if (warn) {
      await p.locator(sel).blur(); await wait(p);
      if (!await p.evaluate(() => [...document.querySelectorAll('.warn')].some(w => !w.hidden && w.getClientRects().length && w.textContent.trim()))) E(sel, 'nach dem Leeren mit ⓧ keine Fehlermeldung (X-4, R-5.3)');
    }
    // X-3: ohne Fokus kein ⓧ
    await p.locator(sel).fill(text); await p.locator(sel).blur(); await wait(p, 100);
    if ((await lage(sel)).x) E(sel, 'ⓧ ohne Fokus (X-3)');
  }
  return errors;
}

// R-7.4 Position beim Öffnen (seit 4.21.0, A-16): open() öffnet einen Eintrag; want = data-day (bzw. data-keep) des
// ‚nächsten offenen‘ Eintrags oder null. Mit want: genau dieser ist hervorgehoben (mark) und steht direkt unter dem Kopf
// (Leiste und haftender Tabellenkopf, ± 2 px) – ist die Seite nicht so weit rollbar, ganz unten und ganz sichtbar.
// Ohne want: ganz oben, nichts hervorgehoben.
export async function checkOpenAt(p, { open, want = null, mark = '.gap', where = '' } = {}) {
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
  const top = () => p.evaluate(R => {
    const roll = eval(R), edge = document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
    const e = [...document.querySelectorAll('#app [data-day], #app [data-keep]')].find(x => x.getClientRects().length && x.getBoundingClientRect().bottom > edge + 1);
    return { id: e ? e.dataset.day || e.dataset.keep : null, top: e ? Math.round(e.getBoundingClientRect().top) : null, y: Math.round(roll.y),
      rest: Math.round(roll.rest) };
  }, ROLL);
  const press = async () => { await p.locator(toggle).filter({ visible: true }).first().click(); await wait(p, 350); };
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
  await rolle(p, { vorEnde: back }); await wait(p, 400);
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
  const look = () => p.evaluate(({ item, edgeJs, R }) => {
    const roll = eval(R), edge = eval(edgeJs), all = [...document.querySelectorAll(item)].filter(e => e.getClientRects().length);
    const k = e => e.dataset.day || e.dataset.keep, top = all.find(e => e.getBoundingClientRect().bottom > edge + 1);
    return { y: Math.round(roll.y), key: top && k(top), top: top ? Math.round(top.getBoundingClientRect().top) : null,
      tap: all.filter(e => e.getBoundingClientRect().top >= edge - 1 && e.getBoundingClientRect().top <= innerHeight - 80).map(e => ({ key: k(e), at: e.getBoundingClientRect().top / innerHeight })) };
  }, { item, edgeJs, R: ROLL });
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
      // Safari rollt beim Öffnen der Tastatur; seit 4.27.0 (A-28) als ungünstigster Fall auch den Rollbereich (Sicherung R-7.3)
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
    // A-23: der zweite Fall läuft mit ‚Bewegung reduzieren‘ (2 s voll, dann ohne Ausblenden weg)
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
      // A-63 C2 (seit 4.29.0): ohne Akzente wie Apple
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
  // A-63 C2 (seit 4.29.0): Suche ohne Akzente – ‚Zurich‘ findet ‚Zürich‘ und umgekehrt, markiert wird das Wort, wie es dasteht
  const A = (nr, t) => E(`ohne Akzente ${nr}: ${t}`);
  if (!r.A1[0] || r.A1[1] !== 'Ankunft in <mark>Zürich</mark>') A('A-1', `‚zurich‘ findet ‚Zürich‘ nicht ganz (${r.A1})`);
  if (!r.A2[0] || !r.A2[1] || r.A2[2] !== '<mark>ZURICH</mark>') A('A-2', `‚Zürich‘ findet ‚Zurich‘/‚ZÜRICH‘ nicht (${r.A2})`);
  if (!r.A3[0] || r.A3[1] !== '<mark>Café</mark> <mark>Crème</mark>') A('A-3', `‚Sao Paulo‘ bzw. ‚cafe creme‘ (${r.A3})`);
  if (!r.A4[0] || r.A4[1] || r.A4[2] !== 'in <mark>São Paulo</mark>') A('A-4', `„Sao Paulo“ als genaue Folge (${r.A4})`);
  if (!/^Sehr​<mark>lange​Grüße<\/mark>$/.test(r.A6)) A('A-6', `Umbruchstellen und Akzent: ${JSON.stringify(r.A6)}`);
  if (r.A7[0] !== 'Sonne <mark>☀️</mark> und A <mark>&amp;</mark> <mark>B</mark>' || !r.A7[1]) A('A-7', `Emoji und Sonderzeichen: ${r.A7}`);
  if (r.A7b !== '<mark>Zu\u0308rich</mark>') A('A-7', `Akzent als eigenes Zeichen: ${JSON.stringify(r.A7b)}`);
  if (r.A8[0] || r.A8[1] || !r.A8[2]) A('A-8', `ß und ø sind eigene Buchstaben (${r.A8})`);
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
  // F-17 (seit 4.27.0, A-28): Spalte inh zeigt den Rollstand des Inhalts – nach dem Rollen um 40 px nicht 0
  if (probe.inh !== '-' && +probe.inh <= 0) E(`Spalte inh zeigt den Rollstand des Inhalts nicht (${probe.inh} nach dem Rollen)`);
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
    if (!/^# Messung · .+ \d+\.\d+\.\d+ · AppDesign \d+\.\d+\.\d+ · .+ · (Home-Bildschirm|Safari) · \d+×\d+ @[\d.]+ · Ränder [\d.]+\/[\d.]+\/[\d.]+\/[\d.]+ · (hell|dunkel) · \d{4}-/.test(f.content)) E(`Kopf der Datei unvollständig (seit 4.29.0 mit ‚Ränder o/u/l/r‘, A-63 S-8): ${f.content.split('\n')[0]}`);
    for (const s of ['Rom', ...secret]) if (f.content.includes(s)) E(`Datei enthält den Text ‚${s}‘ (Datenschutz: nur Längen und ids)`);
  }
  if (await p.evaluate(() => mess !== null)) E('nach dem Teilen ist die Messung nicht abgeschlossen');
  // F11: neu laden verwirft eine laufende Messung
  await menu(); await wait(p, 200); await item().click(); await wait(p, 200);
  await p.reload(); await wait(p, 400);
  if (await p.evaluate(() => mess !== null)) E('nach dem Neuladen läuft noch eine Messung');
  await rolle(p, 0);
  return errors;
}

// R-2.3 Suche nach oben (seit 4.27.0, A-29, F-3/F-4): Lupe antippen (Suche öffnen) rollt den Inhalt ganz nach oben; ⓧ leert die
// Suche, rollt ganz nach oben und lässt den Fokus im Feld. Kopf- und Suchzeile bewegen sich dabei nicht, das Fenster rollt nie.
// term: ein Begriff, der weit unten steht (der Treffer rollt den Inhalt nach unten).
export async function checkSearchTop(p, { term, open = '#searchBtn', input = '#search', clear = '#sclear', bar = '#bar', where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-2.3 ${t}`);
  const lage = () => p.evaluate(([bar, input, R]) => { const r = eval(R), b = document.querySelector(bar)?.getBoundingClientRect();
    return { y: Math.round(r.y), fenster: Math.round(scrollY), bar: b ? Math.round(b.top) : null, fokus: document.activeElement === document.querySelector(input),
      wert: document.querySelector(input)?.value ?? null }; }, [bar, input, ROLL]);
  if (await p.locator(input).count()) { await p.click(open); await wait(p); }   // Suche zu
  await rolle(p, '50%'); await wait(p, 300);
  const vor = await lage();
  if (vor.y < 50) { E(`Vorbereitung: Inhalt lässt sich nicht in die Mitte rollen (${vor.y} px)`); return errors; }
  await p.click(open); await wait(p, 400);
  const auf = await lage();
  if (auf.y !== 0) E(`Suche öffnen rollt den Inhalt nicht ganz nach oben (${auf.y} px statt 0, A-29)`);
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
  if (zu.y !== 0) E(`ⓧ rollt den Inhalt nicht ganz nach oben (${zu.y} px statt 0, A-29)`);
  if (!zu.fokus) E('nach ⓧ liegt der Fokus nicht mehr im Suchfeld');
  if (zu.bar !== vor.bar) E(`Kopfzeile bewegt sich bei ⓧ (${vor.bar} → ${zu.bar} px)`);
  if ([vor, auf, treffer, zu].some(l => l.fenster)) E(`die Seite rollt (scrollY ${[vor, auf, treffer, zu].map(l => l.fenster).join(' → ')}) – nur der Inhalt darf rollen (R-2.1)`);
  await p.click(open); await wait(p);
  return errors;
}

// R-3.2 Nach oben / Ans Ende (seit 4.27.0, A-28, F-12): die Kapsel (.fab) ist nur da, wenn es im Inhalt etwas zu rollen gibt;
// ‚Ans Ende‘ rollt den Inhalt ganz nach unten, ‚Nach oben‘ ganz nach oben – das Fenster rollt nie. Bei offener Tastatur (sichtbarer
// Bereich niedriger, Safari nachgebildet) stehen Rahmen und Kapsel über ihr (B1). kurz(): macht den Inhalt so kurz, dass er auf
// den Bildschirm passt (z. B. Suche ohne Treffer), danach muss die Kapsel weg sein.
// Seit 4.27.1 (A-33, Fall-Liste K-1 bis K-5): die Kapsel überdeckt nie Kopf- oder Suchzeile – sie steht ganz im Rollbereich mit
// 16 px Abstand oben und unten, sonst ist sie ausgeblendet; die Schaltflächen der Leisten bleiben frei antippbar; nach dem Schließen
// der Tastatur ist sie wieder da. sichtbar: Höhe des sichtbaren Bereichs bei offener Tastatur (gemessen A-27: iPhone hoch 409,
// quer 126 px; ohne Angabe innerHeight − 300); suche: Schaltfläche, die die Suche öffnet – dann auch mit offener Suche gemessen.
// Seit 4.30.0 (A-37 B+C, Fall-Liste arbeit/A-37 Fall-Liste.md): die Kapsel zeigt nur die Pfeile, die etwas bewirken – ganz oben nur
// ‚Ans Ende‘, am Ende nur ‚Nach oben‘, dazwischen beide, näher als eine halbe Höhe des Rollbereichs an einem Ende fehlt dessen Pfeil;
// ihr unterer Rand bleibt (F-3). Dazu der Schnellroll-Griff (checkGriff, ab drei Höhen des Rollbereichs), bei offener Tastatur und
// offenem Fenster weder Kapsel noch Griff (F-6, F-9), beim Drucken ausgeblendet (F-13). fenster: öffnet ein Fenster (danach wird es
// mit Escape geschlossen); griff: false prüft nur die Kapsel.
export async function checkFab(p, { top = '.fab button:first-child', end = '.fab button:last-child', kurz = null, sichtbar = null, suche = null, fenster = null, griff = true, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-3.2 ${t}`);
  const sicht = () => p.evaluate(() => { const f = document.querySelector('.fab'); return !!f && getComputedStyle(f).display !== 'none' && !f.hidden && f.getClientRects().length > 0; });
  const st = await rollstand(p);
  if (st.max <= 1) { E('Vorbereitung: der Inhalt ist zu kurz zum Rollen'); return errors; }
  if (!await sicht()) { E(`Kapsel fehlt, obwohl es ${st.max} px zu rollen gibt`); return errors; }
  // F-3: Pfeile je Rollstand; nah = halbe Höhe des Rollbereichs, ende = Rollweg ohne den Platz unter dem Inhalt
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
    if (s.oben !== w.oben || s.unten !== w.unten) E(`${wo} (${s.y} von ${s.ende} px, halbe Höhe ${s.nah}): Pfeile ${[s.oben && '‚Nach oben‘', s.unten && '‚Ans Ende‘'].filter(Boolean).join(' und ') || 'keine'}, soll ${[w.oben && '‚Nach oben‘', w.unten && '‚Ans Ende‘'].filter(Boolean).join(' und ') || 'keine'} (A-37 B)`);
    if (s.kapsel && boden !== null && Math.abs(s.boden - boden) > 1) E(`${wo}: unterer Rand der Kapsel ${s.boden} px statt ${boden} px – sie steht unten fest (A-37 B)`);
    if (s.kapsel) boden ??= s.boden;
  }
  const fabH = await p.evaluate(() => { const b = [...document.querySelectorAll('.fab button')].find(x => x.offsetHeight); return b ? 2 * b.offsetHeight + 1 : 97; });
  await rolle(p, 0); await wait(p, 200);
  if (!await p.locator(end).isVisible()) { E('Vorbereitung: ganz oben fehlt ‚Ans Ende‘ (Inhalt zu kurz für die Prüfung)'); return errors; }
  await p.click(end); await wait(p, 1200);
  let s = await rollstand(p);
  if (s.rest > 1) E(`‚Ans Ende‘ rollt den Inhalt nicht ganz nach unten (${s.rest} px vor dem Ende)`);
  if (s.fenster) E(`‚Ans Ende‘ rollt die Seite (scrollY ${s.fenster}) statt des Inhalts`);
  await p.click(top); await wait(p, 1200);
  s = await rollstand(p);
  if (s.y > 1) E(`‚Nach oben‘ rollt den Inhalt nicht ganz nach oben (${s.y} px)`);
  if (s.fenster) E(`‚Nach oben‘ rollt die Seite (scrollY ${s.fenster}) statt des Inhalts`);
  // B1: Tastatur offen – der sichtbare Bereich wird niedriger; Rahmen und Kapsel enden darüber (K-2, K-4). A-33 (K-1): die Kapsel
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
    if (kb.schneidet.length) E(`${w} überdeckt die Kapsel (${kb.fab.top}–${kb.fab.bottom} px) die Leiste ${kb.schneidet.join(', ')} (A-33)`);
    if (kb.fab && kb.rolle && (kb.fab.top < kb.rolle.top + 16 - 1 || kb.fab.bottom > Math.min(kb.rolle.bottom, kb.h) - 16 + 1))
      E(`${w} passt die Kapsel (${kb.fab.top}–${kb.fab.bottom} px) nicht mit 16 px Abstand in den Inhalt (${kb.rolle.top}–${Math.min(kb.rolle.bottom, kb.h)} px, A-33)`);
    if (kb.verdeckt.length) E(`${w} sind Schaltflächen der Leisten verdeckt: ${kb.verdeckt.join(', ')} (A-33)`);
    if (kb.gv) E(`${w} ist der Schnellroll-Griff da – bei offener Tastatur ausgeblendet (A-37 F-6)`);
    if (!kb.fv && kb.max > 1 && kb.raum >= fabH + 32) E(`${w} fehlt die Kapsel, obwohl sie in den Inhalt passt (${kb.raum} px Platz, Kapsel ${fabH} px + 2 × 16)`);
  });
  await mitTastatur('');
  if (!await sicht()) E('nach dem Schließen der Tastatur ist die Kapsel nicht wieder da (K-5)');
  if (suche) {
    await p.click(suche); await wait(p, 400);
    await mitTastatur(', Suche offen');
    if (!await sicht()) E('nach dem Schließen der Tastatur (Suche offen) ist die Kapsel nicht wieder da (K-5)');
    await p.click(suche); await wait(p, 400);
  }
  // F-9: offenes Fenster – Kapsel und Griff nicht zu sehen und nicht bedienbar
  if (fenster) {
    await rolle(p, '50%'); await wait(p, 150);
    await fenster(); await wait(p, 500);
    const zu = await p.evaluate(() => ['.fab', '.schnell'].map(s => document.querySelector(s)).filter(Boolean)
      .filter(e => !e.hidden && getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden' && e.getClientRects().length).map(e => e.className.split(' ')[0]));
    if (zu.length) E(`bei offenem Fenster zu sehen: ${zu.join(', ')} (A-37 F-9)`);
    await p.keyboard.press('Escape'); await wait(p, 400);
    if (await p.evaluate(() => !!document.querySelector('dialog[open]'))) { await p.keyboard.press('Escape'); await wait(p, 400); }
  }
  // F-13: Drucken
  await p.emulateMedia({ media: 'print' });
  const druck = await p.evaluate(() => ['.fab', '.schnell'].map(s => document.querySelector(s)).filter(e => e && getComputedStyle(e).display !== 'none').map(e => e.className.split(' ')[0]));
  await p.emulateMedia({ media: 'screen' });
  if (druck.length) E(`beim Drucken zu sehen: ${druck.join(', ')} (A-37 F-13)`);
  if (griff) errors.push(...await checkGriff(p, { where }));
  if (kurz) {
    await kurz(); await wait(p, 400);
    const k = await rollstand(p);
    if (k.max <= 1 && await sicht()) E('Kapsel ist da, obwohl es nichts zu rollen gibt');
    if (k.max > 1) E(`Vorbereitung: kurz() macht den Inhalt nicht kurz genug (${k.max} px zu rollen)`);
    if (await p.evaluate(() => !document.querySelector('.schnell')?.hidden)) E('Schnellroll-Griff ist da, obwohl es nichts zu rollen gibt (A-37 F-2)');
  }
  return errors;
}

// R-3.2 Schnellroll-Griff (seit 4.30.0, A-37 C, Fall-Liste arbeit/A-37 Fall-Liste.md F-4, F-5, F-11, F-14 bis F-21): erscheint beim
// Rollen, blendet nach 1,5 s Ruhe aus (nur Deckkraft), erst ab drei Höhen des Rollbereichs; Bahn unter Kopf- bzw. Suchzeile bis über
// die Kapsel in voller Höhe, im sicheren Bereich; Ziehen rollt verhältnisgleich, darüber hinaus = Anfang bzw. Ende, der Inhalt rollt
// nicht zusätzlich und nichts darunter wird angetippt; die Blase links daneben zeigt die Marke des Abschnitts oben im Bild (data-marke),
// ganz im Bild; ziehen während ‚Ans Ende‘ weich rollt; Regler für VoiceOver (Pfeiltaste = ein Abschnitt); keine Meldung überdeckt ihn.
// Ruft checkFab auf; zeit: höchstens so viele ms bis ‚Ans Ende‘ ankommt (F-11, sehr langer Inhalt).
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
  if (s.sicht) E('ohne Rollen sichtbar (F-4)');
  await rolle(p, 40); await wait(p, 150);
  s = await g();
  if (s.lang < 3) { if (s.sicht || s.da) E(`bei ${s.lang.toFixed(1)} Höhen Inhalt da – erst ab drei (F-18)`); return errors; }
  if (!s.sicht) { E(`erscheint beim Rollen nicht (${s.lang.toFixed(1)} Höhen Inhalt, F-4)`); return errors; }
  // F-17: Bahn unter Kopf- bzw. Suchzeile, endet über der Kapsel in voller Höhe (zwei Pfeile + 8 px), im sicheren Bereich
  if (s.bahn.top < s.rolle_oben) E(`Bahn beginnt bei ${s.bahn.top} px über dem Inhalt (${s.rolle_oben} px) – unter Kopf- bzw. Suchzeile (F-17)`);
  if (s.kapsel && s.bahn.bottom > s.kapsel.bottom - 104 + 1) E(`Bahn endet bei ${s.bahn.bottom} px, soll über der Kapsel in voller Höhe (${s.kapsel.bottom - 104} px, F-17)`);
  if (s.griff.right > s.w - s.safeR + 0.5) E(`Griff rechts ${s.griff.right} px über dem sicheren Rand (${s.w - s.safeR} px, F-17)`);
  if (s.uebergaenge.some(t => t.split(',').some(x => !['opacity', 'all'].includes(x.trim()) && x.trim() !== 'none'))) E(`Ein- und Ausblenden nicht nur über die Deckkraft (${s.uebergaenge.join(' / ')}, F-21)`);
  if (s.aria?.role !== 'slider' || s.aria?.label !== 'Schnell rollen') E(`VoiceOver: Rolle ${s.aria?.role}, Name ${s.aria?.label} – soll Regler ‚Schnell rollen‘ (F-15)`);
  await wait(p, 1800);
  s = await g();
  if (s.sicht) E('blendet nach 1,5 s Ruhe nicht aus (F-4)');
  // Ziehen: Mitte, darüber hinaus (Ende, Anfang); Blase; kein Antippen, keine Geste
  await rolle(p, 80); await wait(p, 150);
  s = await g();
  const x = (s.griff.left + s.griff.right) / 2, h = s.bahn.bottom - s.bahn.top;
  await p.mouse.move(x, (s.griff.top + s.griff.bottom) / 2); await p.mouse.down();
  await p.mouse.move(x, s.bahn.top + h / 2, { steps: 6 }); await wait(p, 200);
  let z = await g();
  if (Math.abs(z.y - z.ende / 2) > z.ende * 0.08) E(`in die Mitte gezogen: ${z.y} px statt etwa ${Math.round(z.ende / 2)} px`);
  if (z.marke && (!z.blase?.sicht || z.blase.text !== z.marke)) E(`Blase beim Ziehen ${z.blase?.sicht ? `‚${z.blase.text}‘` : 'nicht zu sehen'}, soll ‚${z.marke}‘ (F-19)`);
  if (!z.marke && z.blase?.sicht) E('Blase ohne Marken (F-19)');
  if (z.blase?.sicht && (z.blase.right > z.griff.left + 1 || z.blase.left < 0 || z.blase.top < 0 || z.blase.bottom > z.ih)) E(`Blase nicht links neben dem Griff bzw. abgeschnitten (${JSON.stringify(z.blase)}, F-19)`);
  if (!z.sicht) E('beim Ziehen ausgeblendet (F-4)');
  await p.mouse.move(x, s.bahn.bottom + 200, { steps: 6 }); await wait(p, 150);
  z = await g();
  if (Math.abs(z.y - z.ende) > 2) E(`über das Ende der Bahn gezogen: ${z.y} px statt Ende ${z.ende} px (F-16)`);
  await p.mouse.move(x, s.bahn.top - 200, { steps: 6 }); await wait(p, 150);
  z = await g();
  if (z.y > 1) E(`über den Anfang der Bahn gezogen: ${z.y} px statt 0 (F-16)`);
  if (z.nav) E('Ziehen am Griff löst eine Wischgeste aus (F-20)');
  await p.mouse.up(); await wait(p, 400);
  z = await g();
  if (z.dialog) E('nach dem Ziehen ist ein Fenster offen – darunter wurde angetippt (F-20)');
  if (z.y > 1) E(`nach dem Loslassen weitergerollt (${z.y} px, F-20)`);
  // F-5: greifen, während ‚Ans Ende‘ weich rollt – das Rollen endet, der Griff folgt dem Finger. Der Griff wandert dabei schnell
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
  if (!f5.zieht) E('während ‚Ans Ende‘ lässt sich der Griff nicht greifen (F-5)');
  else if (Math.abs(f5.y - f5.ende / 4) > f5.ende * 0.1) E(`während ‚Ans Ende‘ gezogen: ${f5.y} px statt etwa ${Math.round(f5.ende / 4)} px – das weiche Rollen läuft weiter (F-5)`);
  await p.evaluate(() => rolle.halt()); await wait(p, 300);
  // F-11: ‚Ans Ende‘ kommt schnell an
  await rolle(p, 0); await wait(p, 200);
  const t1 = Date.now();
  await p.click('.fab button:last-of-type');
  let an = false;
  for (let i = 0; i < 40 && !an; i++) { await wait(p, 100); const a = await g(); an = Math.abs(a.ende - a.y) <= 2; }
  if (!an || Date.now() - t1 > zeit + 300) E(`‚Ans Ende‘ braucht ${Date.now() - t1} ms (höchstens ${zeit}, F-11)`);
  // F-15: Pfeiltaste springt einen Abschnitt (VoiceOver: Wischen nach oben/unten)
  await rolle(p, 0); await wait(p, 150);
  const sprung = await p.evaluate(R => { const r = eval(R), gr = document.querySelector('.schnell .griff'), m = [...r.el.querySelectorAll('[data-marke]')];
    if (m.length < 3) return null;
    gr.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    gr.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    const tab = m[2].closest('table'), th = tab?.tHead?.querySelector('th');
    const top = r.el.getBoundingClientRect().top + (th && getComputedStyle(th).position === 'sticky' ? th.getBoundingClientRect().height : 0);
    return { soll: m[2].dataset.marke, ab: Math.round(m[2].getBoundingClientRect().top - top) }; }, ROLL);
  if (sprung && Math.abs(sprung.ab) > 2) E(`zweimal Pfeil nach unten: ‚${sprung.soll}‘ steht ${sprung.ab} px unter dem Rand statt oben (F-15)`);
  // F-14: eine Meldung überdeckt Griff und Kapsel nicht
  await rolle(p, '50%'); await wait(p, 150);
  const meldung = await p.evaluate(async () => {
    if (typeof showNetToast !== 'function') return null;
    showNetToast('an'); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const t = document.querySelector('.nettoast')?.getBoundingClientRect(), teile = ['.fab', '.schnell .griff'].map(s => document.querySelector(s)).filter(e => e && e.getClientRects().length);
    const ueber = t ? teile.filter(e => { const b = e.getBoundingClientRect(); return t.left < b.right && t.right > b.left && t.top < b.bottom && t.bottom > b.top; }).map(e => e.className.split(' ')[0]) : [];
    document.querySelector('.nettoast')?.click();
    return ueber;
  });
  if (meldung?.length) E(`die Meldung überdeckt ${meldung.join(', ')} (F-14)`);
  await rolle(p, 0); await wait(p, 200);
  return errors;
}

// R-4.5 (seit 4.28.0, A-35, Fall-Liste arbeit/A-26 A-31 A-34 Fall-Liste.md Abschnitt 10): ein Feld mit Fokus im Inhalt (Rollbereich)
// steht bei offener Tastatur ganz sichtbar, die Unterkante mindestens 16 px über der Tastatur (F-1, F-2, F-6) – reicht der Platz
// dafür nicht, direkt unter Kopf- bzw. Suchzeile (F-1a); Kopfzeile fest
// (R-2.1); ist es schon sichtbar, rollt nichts (F-3); nach dem Schließen der Tastatur bleibt es sichtbar und die Seite rollt nie
// (F-4). Braucht das Safari-Modell (tests/safari.mjs, safariModell vorher): Safari verschiebt beim Antippen eines Felds unter der
// Tastatur den sichtbaren Bereich, das Feld bleibt im Rahmen stehen – bis 4.27.1 unter der Tastatur (Messung iPhone quer).
// vorher: bringt das Feld an seinen Platz (z. B. Inhalt ans Ende rollen), wie am Gerät vor dem Antippen.
export async function checkFieldVisible(p, { field, vorher = null, where = '' } = {}) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-4.5 ${t}`);
  if (!await p.evaluate(() => !!window.__safari)) { E('Vorbereitung: Safari-Modell fehlt (safariModell)'); return errors; }
  if (vorher) { await vorher(); await wait(p, 400); }
  // Bildschirm = Lage im Fenster minus offsetTop (Safari misst gegen den sichtbaren Bereich, Chromium gegen das Fenster)
  const lage = () => p.evaluate(({ field, R }) => {
    const vv = visualViewport, o = vv.offsetTop, f = document.querySelector(field)?.getBoundingClientRect();
    const re = document.querySelector('#app > .rolle')?.getBoundingClientRect(), k = document.querySelector('.nb, .pnav')?.getBoundingClientRect();
    const m = x => x == null ? null : Math.round(x - o);
    return { oben: m(f?.top), unten: m(f?.bottom), rolle: m(re?.top), kopf: m(k?.top), kb: Math.round(vv.height), y: Math.round(eval(R).y), fenster: Math.round(scrollY),
      fokus: document.activeElement === document.querySelector(field) };
  }, { field, R: ROLL });
  const vorTastatur = await lage();
  if (vorTastatur.unten == null) { E(`Vorbereitung: ${field} fehlt`); return errors; }
  if (vorTastatur.unten > vorTastatur.kb || vorTastatur.oben < (vorTastatur.rolle ?? 0)) { E(`Vorbereitung: ${field} ist vor dem Antippen nicht sichtbar (${vorTastatur.oben}–${vorTastatur.unten} px)`); return errors; }
  await p.evaluate(sel => document.querySelector(sel).focus({ preventScroll: true }), field);
  await p.evaluate(() => __safari.tastatur(true)); await wait(p, 500);
  let l = await lage();
  const w = `mit Tastatur (sichtbar ${l.kb} px)`;
  // reicht der Platz nicht für 16 px Abstand (iPhone quer mit Suchzeile), steht das Feld direkt unter Kopf- bzw. Suchzeile
  const eng = l.unten - l.oben > l.kb - 16 - (l.rolle ?? 0);
  if (eng ? l.unten > l.kb || Math.abs(l.oben - (l.rolle ?? 0)) > 1 : l.unten > l.kb - 16 + 1)
    E(`F-1 ${field} ${w} nicht ganz über der Tastatur: ${l.oben}–${l.unten} px, Inhalt ab ${l.rolle} px, Tastatur ab ${l.kb} px (${eng ? 'zu wenig Platz: direkt unter der Kopf- bzw. Suchzeile' : 'mindestens 16 px Abstand'})`);
  if (l.oben < (l.rolle ?? 0) - 1) E(`F-1 ${field} ${w} oben unter der Kopf- bzw. Suchzeile (${l.oben} px, Inhalt ab ${l.rolle} px)`);
  if (Math.abs(l.kopf ?? 0) > 1) E(`F-1 ${w}: Kopfzeile verschoben (${l.kopf} px statt 0, R-2.1)`);
  if (!l.fokus) E(`F-1 ${field} ${w} hat den Fokus verloren`);
  // F-3: schon sichtbar – eine weitere Meldung von Safari rollt nichts
  const y = l.y;
  await p.evaluate(() => { visualViewport.dispatchEvent(new Event('resize')); visualViewport.dispatchEvent(new Event('scroll')); }); await wait(p, 400);
  l = await lage();
  if (Math.abs(l.y - y) > 1) E(`F-3 ${field} ${w} schon sichtbar, trotzdem rollt der Inhalt (${y} → ${l.y} px)`);
  // F-4: Tastatur zu – das Feld bleibt sichtbar, die Seite rollt nie
  await p.evaluate(sel => document.querySelector(sel).blur(), field);
  await p.evaluate(() => __safari.tastatur(false)); await wait(p, 500);
  l = await lage();
  if (l.unten > l.kb || l.oben < (l.rolle ?? 0) - 1) E(`F-4 ${field} nach dem Schließen der Tastatur nicht mehr sichtbar (${l.oben}–${l.unten} px, sichtbar ${l.kb} px)`);
  if (Math.abs(l.kopf ?? 0) > 1) E(`F-4 nach dem Schließen der Tastatur: Kopfzeile verschoben (${l.kopf} px)`);
  if (l.fenster) E(`F-4 die Seite rollt (scrollY ${l.fenster}) – nur der Inhalt darf rollen (R-2.1)`);
  return errors;
}

// R-4.5 Tastatur ohne Springen (seit 4.28.1, A-36, Fall-Liste arbeit/A-36 Fall-Liste.md T-1 bis T-7 und B-1 bis B-18): Feld antippen,
// Tastatur auf, Feld wechseln, Tastatur zu – in jedem Bild (Aufnahme des Safari-Modells) stehen Kopfzeile, Suchzeile, Seitenleiste und
// der linke Rand eines Fensters still (± 1 px); der Fensterkopf darf sich nur auf seinen neuen Platz zu bewegen (iPad: gleitet in die
// Mitte über der Tastatur), nie darüber hinaus; das Feld mit Fokus springt nie (> 60 px zwischen zwei Bildern, B-4: Safari stellt den
// Inhalt zurück, S-9). Danach steht das Feld ganz über der Tastatur und die Kapsel (wenn sichtbar) 10 px darüber. Dazu:
// - B-3: nach dem Antippen öffnet sich nichts (Safaris Klick nach dem Rollen trifft dort etwas anderes);
// - B-18: das Feld sieht die Ereignisse des neuen Fokus nicht (kein blur – sonst z. B. ‚Pflichtfeld‘ beim ersten Antippen);
// - B-16: der Messmodus schreibt ‚neu fokussiert‘ (wenn die App ihn hat);
// - taste (iPad, B-6): Tastatur-Taste schließt nur die Tastatur – das Feld gibt den Fokus ab, erneutes Antippen ist still;
// - kapsel (Feld im Inhalt, B-7, B-8): ↑ bei offener Tastatur rollt mit einem Antippen ganz nach oben; danach ↓ endet am Ende des
//   Inhalts, kein Platz bleibt darunter stehen;
// - wischen (nur Chromium, B-14): Wischen über das Feld fokussiert nicht und rollt nichts vorab.
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
    // B-4: das Feld mit Fokus springt nicht (dasselbe Feld in zwei aufeinanderfolgenden Bildern)
    for (let i = 1; i < bilder.length; i++) {
      const x = bilder[i - 1], y = bilder[i];
      if (x.feld != null && y.feld != null && x.feldId === y.feldId && Math.abs(y.feld - x.feld) > 60) {
        E(`${name}: Feld ${y.feldId} springt von ${x.feld} auf ${y.feld} px (B-4)`); break;
      }
    }
  };
  // Feld mit Fokus ganz über der Tastatur, Kapsel 10 px darüber (Bildschirm = Lage minus offsetTop, alle Rahmen sind fest)
  const ueber = async (name, sel) => {
    const l = await p.evaluate(({ sel, fab }) => {
      const o = __safari.top(), f = document.querySelector(sel), r = f.getBoundingClientRect(), k = document.querySelector(fab);
      const ks = k && getComputedStyle(k).display !== 'none' && !k.hidden && k.getClientRects().length ? Math.round(k.getBoundingClientRect().bottom - o) : null;
      const c = f.closest('.dlg-body, #app > .rolle'), ct = c ? Math.round(c.getBoundingClientRect().top - o) : 0;
      return { oben: Math.round(r.top - o), unten: Math.round(r.bottom - o), ct, kb: __safari.hoehe(), offen: __safari.offen, fokus: document.activeElement === f, kapsel: ks };
    }, { sel, fab });
    if (!l.fokus) E(`${name}: ${sel} hat nach dem Antippen keinen Fokus`);
    if (!l.offen) E(`${name}: die Tastatur ist nicht offen`);
    // reicht der Platz nicht (iPhone quer: 117 px sichtbar), steht das Feld oben im Rollbereich (wie checkFieldVisible F-1a)
    if (l.unten - l.oben > l.kb - Math.max(0, l.ct) ? Math.abs(l.oben - l.ct) > 1 : l.unten > l.kb + 1 || l.oben < l.ct - 1)
      E(`${name}: ${sel} nicht ganz über der Tastatur (${l.oben}–${l.unten} px, Rollbereich ab ${l.ct}, Tastatur ab ${l.kb} px)`);
    if (l.kapsel != null && l.kapsel > l.kb - 10 + 1) E(`${name}: Kapsel unten bei ${l.kapsel} px – unter oder an der Tastatur (ab ${l.kb} px), T-7`);
  };
  // B-3, B-18, B-16: was die App beim Antippen sieht – geöffnete Fenster und Menüs, blur am Feld selbst, Zeilen des Messmodus
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
    if (n.offen !== v.offen) E(`${name}: nach dem Antippen von ${sel} hat sich etwas geöffnet (${v.offen} → ${n.offen} Fenster/Menüs) – Klick nach dem Rollen, B-3`);
    if (n.blur && await p.evaluate(sel => document.activeElement === document.querySelector(sel), sel)) E(`${name}: ${sel} bekam beim Antippen ein blur, obwohl es den Fokus behält (neuer Fokus sichtbar für die App, B-18)`);
    if (!v.kb && n.y !== v.y && n.neu === false) E(`${name}: ${sel} gerollt, aber im Messmodus keine Zeile ‚neu fokussiert‘ (B-16)`);
  };
  let v = await vorAntippen(field);
  await film('T-1/T-2 Feld antippen', () => p.tap(field));
  await ueber('T-1/T-2 Feld antippen', field);
  await nachAntippen('T-1/T-2 Feld antippen', field, v);
  if (taste) {
    // B-6 (iPad): Tastatur-Taste – nur die Tastatur geht zu, das Feld gibt den Fokus ab; erneutes Antippen ist ein gewöhnliches
    await film('B-6 Tastatur-Taste', () => p.evaluate(() => __safari.tastatur(false)));
    if (await p.evaluate(sel => document.activeElement === document.querySelector(sel), field)) E(`B-6 nach der Tastatur-Taste hat ${field} noch den Fokus`);
    v = await vorAntippen(field);
    await film('B-6 erneut antippen', () => p.tap(field));
    await ueber('B-6 erneut antippen', field);
    await nachAntippen('B-6 erneut antippen', field, v);
  }
  if (wechsel) {
    // wie am Gerät: das andere Feld erst mit dem Finger in den sichtbaren Teil wischen (Playwright rollte es sonst beim Antippen selbst)
    // (ein Wischen beginnt mit einer Berührung – sie beendet die Rückstellung, B-4)
    await p.evaluate(sel => document.querySelector(sel).closest('.dlg-body, #app > .rolle')?.dispatchEvent(new Event('touchstart', { bubbles: true })), wechsel);
    await p.locator(wechsel).scrollIntoViewIfNeeded(); await wait(p, 300);
    await film('T-5 Feld wechseln', () => p.tap(wechsel));
    await ueber('T-5 Feld wechseln', wechsel);
  }
  if (kapsel) {
    // B-8: ↑ bei offener Tastatur – ein Antippen genügt (das Antippen schließt die Tastatur, gerollt wird danach)
    await film('B-8 ↑ bei offener Tastatur', () => p.tap(kapsel.hoch));
    await wait(p, 500);
    const r = await p.evaluate(() => ({ y: Math.round(document.querySelector('#app > .rolle').scrollTop), offen: __safari.offen }));
    if (r.offen) E('B-8 nach ↑ ist die Tastatur noch offen');
    if (r.y > 1) E(`B-8 ↑ bei offener Tastatur rollt nicht ganz nach oben (scrollTop ${r.y}) – zweites Antippen nötig`);
    // B-7: danach ↓ – der Inhalt endet am Ende, kein Platz bleibt darunter
    await p.tap(kapsel.ende); await wait(p, 1200);
    const e = await p.evaluate(() => { const c = document.querySelector('#app > .rolle'), pl = parseFloat(c.style.getPropertyValue('--platz')) || 0;
      return { y: Math.round(c.scrollTop), max: Math.round(c.scrollHeight - c.clientHeight - pl), platz: pl }; });
    if (e.platz) E(`B-7 nach ↑ und ↓ steht noch ${e.platz} px Platz unter dem Inhalt`);
    if (Math.abs(e.y - e.max) > 1) E(`B-7 ↓ endet bei ${e.y} statt am Ende des Inhalts (${e.max})`);
  } else await film('T-4 Tastatur schließen', () => p.evaluate(() => document.activeElement?.blur()));
  if (await p.evaluate(() => __safari.offen)) E('T-4 die Tastatur ist nach dem Verlassen des Felds noch offen');
  if (wischen && p.context().browser()?.browserType().name() === 'chromium') {
    // B-14: Wischen über das Feld (Berührung bewegt sich) – kein Fokus, nichts vorab gerollt
    const pt = await p.evaluate(sel => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: Math.round(r.left + 20), y: Math.round(r.top + r.height / 2) }; }, field);
    const cdp = await p.context().newCDPSession(p);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [pt] });
    for (let i = 1; i <= 6; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: pt.x, y: pt.y - i * 15 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await wait(p, 600);
    const w = await p.evaluate(sel => ({ fokus: document.activeElement === document.querySelector(sel), platz: [...document.querySelectorAll('.dlg-body, #app > .rolle')].some(c => c.style.getPropertyValue('--platz')) }), field);
    if (w.fokus) E(`B-14 Wischen über ${field} gibt ihm den Fokus`);
    if (w.platz) E(`B-14 Wischen über ${field} rollt vorab (Platz unter dem Inhalt)`);
  }
  return errors;
}

// R-6.4 Drucken (seit 4.27.0, A-28, F-16): mit Rahmen und Rollbereich druckt die Seite trotzdem ganz, nicht nur einen Bildschirm –
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

// R-7.5 Navigation und Gesten (seit 4.30.0, A-61 Teil 1, Variante ‚Überall‘, Fall-Liste arbeit/A-61 Teil 1 Fall-Liste.md F-1 bis F-21).
// iPhone-Aufbau (Start in der Startliste): Öffnen schiebt den Inhalt herein (F-1), Zurück-Knopf hinaus, zuletzt geöffneter Eintrag blau,
// Rollstand der Liste bleibt (F-2); Zurückwischen vom Rand langsam über die halbe Breite (F-3), halb ziehen folgt dem Finger und federt
// zurück (F-4), kurz und schnell (F-5), aus der Mitte (F-6); senkrecht und schräg (F-7), im waagrecht rollenden Bereich (F-8), nach
// links, auf Knöpfen und der Kapsel (F-9) kein Zurück; Wischen während ‚Ans Ende‘ weich rollt (F-10); Drehen beim Ziehen (F-14);
// offenes Menü (F-15); Tastatur offen (F-16); langes Drücken, dann ziehen (F-17); Escape bzw. VoiceOver-‚Zurück‘ (F-20); je Bild nur
// transform und opacity, keine langen Bildlücken (F-21); die Messung zeichnet Berührungen und Gesten-Entscheidungen auf (F-22, seit 4.30.1). iPad hoch (Start mit offenem Eintrag, Seitenleiste weg): vom Rand und aus der
// Mitte herein, folgt dem Finger mit wachsender Abdunkelung (F-11), nach links auf Seitenleiste bzw. Abdunkelung, panel-left, Abdunkelung
// antippen (F-12), Drehen (F-14), Menü (F-15), Escape. iPad quer: Wischen ändert nichts (F-13). ‚Bewegung reduzieren‘ (Seite mit
// reducedMotion: 'reduce'): Überblenden statt Schieben (F-19). Mit der Maus nachgebildet (Playwright kennt kein Wischen mit dem Finger).
// eintrag: Zeile der Startliste bzw. Seitenleiste, die geöffnet wird; titel: ihr Titel (steht danach in der Leiste); zurueck: Zurück-Knopf;
// waagrecht: Bereich mit eigenem waagrechtem Rollen; knopf: Schaltfläche in der Leiste; menue: öffnet ein Menü; suche: öffnet die Suche
// (Feld bekommt den Fokus); seitenKnopf: panel-left.
export async function checkNavigation(p, { eintrag, titel, zurueck = '#back', waagrecht = null, knopf = null, menue = null, suche = null,
  seitenKnopf = '[data-side-toggle]', where = '' } = {}) {
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
  // zeichnet je Bild Lage und Deckkraft von Inhalt und Liste auf (Einzelproben hängen unter Last vom Zeitpunkt ab) – seit 4.30.1 (A-66) bis
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
  const ziehe = async (x0, y0, x1, y1, { schnell = false, los = true, halten = 0 } = {}) => {
    await p.mouse.move(x0, y0); await p.mouse.down();
    if (halten) await wait(p, halten);
    const n = schnell ? 4 : Math.max(6, Math.round(Math.hypot(x1 - x0, y1 - y0) / 12));
    for (let i = 1; i <= n; i++) { await p.mouse.move(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n); await wait(p, schnell ? 8 : 16); }
    if (!los) return;
    if (!schnell) await wait(p, 150);
    await p.mouse.up(); await ruhig(); await wait(p, 100);
    await keinTippen(`Wischen von ${Math.round(x0)}/${Math.round(y0)} nach ${Math.round(x1)}/${Math.round(y1)}`);
  };
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
    // F-1: Öffnen – der Inhalt schiebt sich herein, die Liste weicht nach links (‚Bewegung reduzieren‘: überblenden)
    // Rollstand so, dass der Eintrag im oberen Drittel steht (der gewählte Eintrag bleibt sichtbar, R-7.1)
    let listeRoll = await p.evaluate(s => { const e = document.querySelector('#side .side-list'), r = document.querySelector(s); if (!e || !r || e.scrollHeight <= e.clientHeight + 40) return null;
      e.scrollTop = e.scrollTop + r.getBoundingClientRect().top - e.getBoundingClientRect().top - e.clientHeight / 3; return e.scrollTop; }, eintrag);
    await wait(p, 150);
    if (listeRoll !== null) listeRoll = await p.evaluate(() => document.querySelector('#side .side-list').scrollTop);
    await aufzeichnen(); await p.locator(eintrag).first().click();
    let bf = await bilder();
    if (l.ruhig) { if (!ueberblendet(bf)) E(`F-19 Öffnen mit ‚Bewegung reduzieren‘ überblendet nicht (${bf.length} Bilder, Deckkraft ${[...new Set(bf.map(x => x.appO.toFixed(2)))].join(' ')})`); }
    else if (!geschoben(bf, w) || !listeWeicht(bf)) E(`F-1 Öffnen: kein Schieben (${bf.length} Bilder, Inhalt bei ${[...new Set(bf.map(x => Math.round(x.appX)))].join(' ')} px)`);
    await ruhig(); await wait(p, 100);
    if (!await offen('F-1 Öffnen')) return errors;
    if (!/pan-y/.test(l.ta) || /pan-x|manipulation|auto/.test(l.ta)) E(`F-6 touch-action des Inhalts ‚${l.ta}‘ – waagrecht muss das Wischen bei der App ankommen (pan-y, 13)`);
    if (titel && !l.titel.includes(titel)) E(`F-1 Titel ‚${l.titel}‘ statt ‚${titel}‘`);
    // F-2: Zurück-Knopf
    await aufzeichnen(); await p.click(zurueck);
    bf = await bilder();
    if (l.ruhig) { if (!ueberblendet(bf)) E(`F-19 Zurück mit ‚Bewegung reduzieren‘ überblendet nicht (${bf.length} Bilder, Deckkraft ${[...new Set(bf.map(x => x.appO.toFixed(2)))].join(' ')})`); }
    else if (!geschoben(bf, w)) E(`F-2 Zurück-Knopf: kein Schieben (${bf.length} Bilder, Inhalt bei ${[...new Set(bf.map(x => Math.round(x.appX)))].join(' ')} px)`);
    await ruhig(); await wait(p, 100);
    if (await zu('F-2 Zurück-Knopf')) {
      const blau = await p.evaluate(() => [...document.querySelectorAll('#side .side-row.current')].map(r => r.textContent));
      if (titel && (blau.length !== 1 || !blau[0].includes(titel))) E(`F-2 zuletzt geöffneter Eintrag nicht blau (blau: ${JSON.stringify(blau)}, R-7.2)`);
      const roll = await p.evaluate(() => document.querySelector('#side .side-list')?.scrollTop);
      if (listeRoll !== null && Math.abs(roll - listeRoll) > 1) E(`F-2 Rollstand der Startliste ${roll} px statt ${listeRoll} px (T-7)`);
    }
    // F-3: vom Rand langsam über die halbe Breite
    await oeffne();
    await ziehe(4, h * 0.6, w * 0.7, h * 0.6 + 6); await zu('F-3 vom Rand über die halbe Breite');
    // F-4: halb ziehen, innehalten – folgt dem Finger, beide Seiten sichtbar; loslassen federt zurück
    await oeffne();
    await ziehe(4, h * 0.6, w * 0.35, h * 0.6, { los: false }); await wait(p, 60);
    l = await lage();
    if (!l.ruhig && Math.abs(l.appX - (w * 0.35 - 4)) > w * 0.06) E(`F-4 die Seite folgt dem Finger nicht (Inhalt bei ${l.appX} px, Finger ${Math.round(w * 0.35 - 4)} px)`);
    if (!l.liste) E('F-4 beim Ziehen ist die Startliste darunter nicht zu sehen');
    if (l.ruhig && !(l.appO > 0.3 && l.appO < 0.9)) E(`F-19 Ziehen mit ‚Bewegung reduzieren‘: Deckkraft ${l.appO} – soll dem Finger folgen`);
    await wait(p, 150); await p.mouse.up(); await ruhig(); await wait(p, 100);
    await offen('F-4 unter der Hälfte losgelassen');
    // F-5: kurz und schnell vom Rand
    await ziehe(4, h * 0.6, 110, h * 0.6, { schnell: true }); await zu('F-5 schnelles Wischen vom Rand');
    // F-6: aus der Mitte (Überall)
    await oeffne();
    await ziehe(w * 0.3, h * 0.7, w * 0.95, h * 0.7); await zu('F-6 aus der Mitte nach rechts');
    // F-7: senkrecht, schräg (mehr senkrecht)
    await oeffne();
    await ziehe(w * 0.3, h * 0.75, w * 0.3 + 4, h * 0.35); await offen('F-7 senkrecht gewischt');
    await ziehe(w * 0.5, h * 0.6, w * 0.5 + 30, h * 0.6 - 60); await offen('F-7 schräg (mehr senkrecht) gewischt');
    // F-8: Bereich mit eigenem waagrechtem Rollen
    if (waagrecht) {
      const b = await box(waagrecht);
      const eigen = b && await p.evaluate(s => { const e = document.querySelector(s); return e.scrollWidth > e.clientWidth + 1; }, waagrecht);
      if (!b || !eigen || b.b > h - 10 || b.t < 0) E(`F-8 Vorbereitung: ${waagrecht} nicht sichtbar oder ohne waagrechtes Rollen`);
      else { await ziehe(b.l + 10, b.y, Math.min(w - 4, b.l + 10 + w * 0.6), b.y); await offen('F-8 im waagrecht rollenden Bereich gewischt'); }
    }
    // F-9: nach links; auf Knopf und Kapsel
    await ziehe(w * 0.8, h * 0.6, w * 0.1, h * 0.6); await offen('F-9 nach links gewischt');
    for (const sel of [knopf, '.fab button:not([hidden])'].filter(Boolean)) {
      const b = await box(sel);
      if (b && b.r < w * 0.7) { await ziehe(b.x, b.y, b.x + w * 0.6, b.y); await offen(`F-9 auf ${sel} gewischt`); }
      if (await p.evaluate(() => !!document.querySelector('dialog[open], .menu'))) { await p.keyboard.press('Escape'); await wait(p, 300); await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); }
    }
    // F-10: Wischen, während ‚Ans Ende‘ weich rollt
    if (await box('.fab button:last-of-type:not([hidden])')) {
      await p.click('.fab button:last-of-type'); await wait(p, 40);
      await ziehe(w * 0.3, h * 0.6, w * 0.95, h * 0.6); await zu('F-10 Wischen während des weichen Rollens');
      await oeffne();
    }
    // F-15: offenes Menü – kein Zurück
    if (menue) {
      await p.click(menue); await wait(p, 300);
      if (!(await lage()).menue) E(`F-15 Vorbereitung: ${menue} öffnet kein Menü`);
      await ziehe(w * 0.2, h * 0.7, w * 0.9, h * 0.7); await offen('F-15 Wischen bei offenem Menü');
      if ((await lage()).menue) { await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); }
    }
    // F-17: erst halten, dann ziehen – kein Zurück
    await ziehe(w * 0.3, h * 0.7, w * 0.9, h * 0.7, { halten: 700 }); await offen('F-17 nach langem Drücken gezogen');
    if ((await lage()).menue) { await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); }
    // F-21: je Bild nur transform und opacity; keine langen Bildlücken beim Ziehen
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
    if (f21.mehr.length) E(`F-21 beim Ziehen ändern sich ${f21.mehr.join(', ')} – nur transform und opacity (A-59)`);
    if (f21.luecke > 250) E(`F-21 beim Ziehen ${f21.luecke} ms ohne Bild (A-59)`);
    await offen('F-21 unter der Hälfte losgelassen');
    // F-14: Drehen während des Ziehens – Zustand wie vorher
    await ziehe(w * 0.2, h * 0.6, w * 0.5, h * 0.6, { los: false });
    await p.setViewportSize({ width: h, height: w }); await wait(p, 400);
    await p.mouse.up(); await ruhig(); await wait(p, 300);
    await keinTippen('F-14 Loslassen nach dem Drehen');
    l = await lage();
    if (!l.inhalt || l.liste || Math.abs(l.appX) > 1 || l.nav) E(`F-14 nach dem Drehen beim Ziehen: Liste ${l.liste}, Inhalt bei ${l.appX} px, ${l.nav || 'keine Bewegung'} – soll wie vor dem Ziehen`);
    await p.setViewportSize({ width: w, height: h }); await wait(p, 400);
    // F-16: Tastatur offen (Suche) – Wischen schließt sie und geht zurück
    if (suche) {
      await p.click(suche); await wait(p, 300);
      await p.evaluate(() => document.querySelector('#app input[type=search], #app .searchbox input')?.focus());
      await ziehe(w * 0.3, h * 0.7, w * 0.95, h * 0.7);
      l = await lage();
      if (l.fokus) E('F-16 nach dem Zurückwischen hat das Suchfeld noch den Fokus (Tastatur offen)');
      await zu('F-16 Zurückwischen bei offener Tastatur');
      await oeffne();
    }
    // F-22 (seit 4.30.1, A-67 Schritt 1): die Messung zeichnet Berührungen (Zeiger mit Lage, Art und Ziel, touchcancel) und die
    // Entscheidungen der Gestenstelle auf – fertig, zurück gefedert und abgebrochen (pointercancel und touchcancel nachgebildet, wie
    // Safari sie vermutlich über einem antippbaren Kasten schickt); keine Texte
    await p.evaluate(() => { messStart({ app: 'Prüfung' }); addEventListener('pointerdown', e => { window.__zid = e.pointerId; }, true); });
    await ziehe(w * 0.3, h * 0.7, w * 0.95, h * 0.7); await zu('F-22 Zurückwischen während der Messung');
    await oeffne();
    await ziehe(w * 0.2, h * 0.6, w * 0.4, h * 0.6); await offen('F-22 unter der Hälfte losgelassen während der Messung');
    await ziehe(w * 0.2, h * 0.6, w * 0.4, h * 0.6, { los: false });
    await p.evaluate(([x, y]) => { const t = document.elementFromPoint(x, y) || document.body;
      t.dispatchEvent(new PointerEvent('pointercancel', { pointerId: window.__zid, isPrimary: true, pointerType: 'touch', clientX: x, clientY: y, bubbles: true }));
      t.dispatchEvent(new Event('touchcancel', { bubbles: true })); }, [w * 0.4, h * 0.6]);
    await p.mouse.up(); await ruhig(); await wait(p, 100);
    await keinTippen('F-22 Loslassen nach dem Abbruch');
    const mz = await p.evaluate(() => { messAus(); const z = mess.zeilen; mess = null; return z; });
    for (const [re, was] of [[/! zeiger down \d+ \d+ mouse \S/, '‚zeiger down‘ mit Lage, Art und Ziel'], [/! zeiger move \d+ \d+ mouse /, '‚zeiger move‘'], [/! zeiger up \d+ \d+ mouse /, '‚zeiger up‘'],
      [/! zeiger cancel \d+ \d+ touch /, '‚zeiger cancel‘'], [/! touchcancel \d+ \S/, '‚touchcancel‘'], [/! nav kandidat phone$/, '‚nav kandidat‘'], [/! nav aktiv phone -?\d+ -?\d+$/, '‚nav aktiv‘ mit Weg'],
      [/! nav fertig weg [\d.]+ tempo -?[\d.]+$/, '‚nav fertig‘'], [/! nav zurück gefedert weg [\d.]+ tempo -?[\d.]+$/, '‚nav zurück gefedert‘'], [/! nav abgebrochen weg [\d.]+ tempo -?[\d.]+$/, '‚nav abgebrochen‘']])
      if (!mz.some(x => re.test(x))) E(`F-22 Messung ohne Zeile ${was} (A-67)`);
    if (titel && mz.some(x => x.includes(titel))) E(`F-22 Messung enthält den Text ‚${titel}‘ (nur Längen und ids)`);
    l = await lage();
    if (l.nav || l.liste === l.inhalt) E(`F-22 nach dem Abbruch halb (Liste ${l.liste}, Inhalt ${l.inhalt}, ${l.nav || 'keine Bewegung'})`);
    if (l.liste) await oeffne();
    // F-20: Escape (VoiceOver ‚Zurück‘) geht zurück
    await p.evaluate(() => document.activeElement?.blur?.());
    await p.keyboard.press('Escape'); await ruhig(); await wait(p, 100);
    await zu('F-20 Escape bzw. VoiceOver-‚Zurück‘');
    return errors;
  }
  // iPad
  const hoch = h > w;
  if (!hoch) {
    // F-13: quer steht die Seitenleiste fest – Wischen ändert nichts; der Inhalt behält sein touch-action
    const vor = await lage();
    if (vor.ta && vor.ta !== 'manipulation') E(`F-13 iPad quer: touch-action des Inhalts ‚${vor.ta}‘ statt ‚manipulation‘`);
    await ziehe(w * 0.5, h * 0.7, w * 0.9, h * 0.7);
    if (vor.seite) await ziehe(vor.sideX + vor.sideW * 0.8, h * 0.7, 10, h * 0.7);
    l = await lage();
    if (l.seite !== vor.seite || Math.abs(l.sideX - vor.sideX) > 1 || l.nav) E(`F-13 iPad quer: Wischen ändert die Seitenleiste (vorher ${vor.seite ? 'da' : 'weg'}, nachher ${l.seite ? 'da' : 'weg'})`);
    return errors;
  }
  let bf;
  const da = async (soll, wo) => { l = await lage(); if (l.seite !== soll || (soll && l.sideX < 0)) E(`${wo}: Seitenleiste ${l.seite ? `da (bei ${l.sideX} px)` : 'weg'}, soll ${soll ? 'da' : 'weg'}`); };
  if ((await lage()).seite) { E('Vorbereitung: Seitenleiste am iPad hoch ist offen'); return errors; }
  l = await lage();
  if (!/pan-y/.test(l.ta) || /pan-x|manipulation|auto/.test(l.ta)) E(`F-12 touch-action des Inhalts ‚${l.ta}‘ – waagrecht muss das Wischen bei der App ankommen (pan-y, 13)`);
  // F-11: vom Rand herein – folgt dem Finger, die Abdunkelung wächst mit
  await ziehe(4, h * 0.6, 200, h * 0.6, { los: false }); await wait(p, 60);
  l = await lage();
  if (!l.seite) E('F-11 beim Ziehen vom Rand kommt die Seitenleiste nicht');
  else if (!l.ruhig && !(l.sideX < 0 && l.sideX > -l.sideW)) E(`F-11 die Seitenleiste folgt dem Finger nicht (bei ${l.sideX} px, Breite ${l.sideW})`);
  if (l.schatten !== null && !(l.schatten > 0.05 && l.schatten < 0.95)) E(`F-11 die Abdunkelung wächst nicht mit (Deckkraft ${l.schatten})`);
  await p.mouse.move(460, h * 0.6, { steps: 6 }); await wait(p, 150); await p.mouse.up(); await ruhig(); await wait(p, 100);
  await da(true, 'F-11 vom Rand über die halbe Breite');
  // F-12: nach links auf der Seitenleiste, aus der Mitte des Inhalts herein, nach links auf der Abdunkelung, panel-left, antippen
  l = await lage();
  await ziehe(l.sideX + l.sideW * 0.8, h * 0.7, 20, h * 0.7); await da(false, 'F-12 nach links auf der Seitenleiste');
  await ziehe(w * 0.35, h * 0.85, w * 0.95, h * 0.85); await da(true, 'F-12 aus der Mitte des Inhalts nach rechts');
  await ziehe(w - 40, h * 0.5, w - 420, h * 0.5); await da(false, 'F-12 nach links auf der Abdunkelung');
  const k = await box(seitenKnopf);
  if (k) {
    await aufzeichnen(); await p.mouse.click(k.x, k.y);
    bf = await bilder();
    if (!l.ruhig && !bf.some(x => (x.sideX < -1 && x.sideX > -400) || schiebt(x.sideA))) E(`F-12 panel-left: die Seitenleiste gleitet nicht herein (bei ${[...new Set(bf.map(x => Math.round(x.sideX)))].join(' ')} px)`);
    await ruhig(); await wait(p, 100); await da(true, 'F-12 panel-left');
    await p.mouse.click(w - 40, h * 0.5); await ruhig(); await wait(p, 100); await da(false, 'F-12 Abdunkelung antippen');
  } else E(`F-12 Vorbereitung: ${seitenKnopf} fehlt`);
  // F-15: offenes Menü – keine Geste
  if (menue) {
    await p.click(menue); await wait(p, 300);
    await ziehe(w * 0.3, h * 0.85, w * 0.95, h * 0.85); await da(false, 'F-15 Wischen bei offenem Menü');
    if ((await lage()).menue) { await p.evaluate(() => document.querySelector('.layer')?.click()); await wait(p, 200); }
  }
  // F-14: Drehen während des Ziehens – Zustand wie vorher (weg)
  await ziehe(4, h * 0.6, 220, h * 0.6, { los: false });
  await p.setViewportSize({ width: h, height: w }); await wait(p, 400);
  await p.mouse.up(); await ruhig(); await wait(p, 300);
  await keinTippen('F-14 Loslassen nach dem Drehen');
  l = await lage();
  if (l.nav) E(`F-14 nach dem Drehen beim Ziehen läuft noch ${l.nav}`);
  await p.setViewportSize({ width: w, height: h }); await wait(p, 500);
  await da(false, 'F-14 Drehen beim Ziehen und zurück');
  // F-20: Escape schließt die darübergelegte Seitenleiste
  await ziehe(w * 0.35, h * 0.85, w * 0.95, h * 0.85);
  await p.keyboard.press('Escape'); await ruhig(); await wait(p, 100);
  await da(false, 'F-20 Escape');
  return errors;
}
