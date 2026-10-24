// AppDesign 4.34.0 · Prüfung von ‚Backup erstellen‘ und ‚Backup laden‘ (Regeln R-9.1, R-9.2; Designrichtlinie allgemein 15.19).
// Bedient die App wie ein Mensch: Mehr-Menü der Seitenleiste → Backup erstellen → Meldung; Backup laden → Abfrage mit Kacheln →
// Abbrechen; unlesbare Datei → Meldung. Seit 4.34.0 (A-74): die Backup-Kachel steht nur, solange heute kein Backup erstellt wurde –
// nach dem Backup ist sie weg, ‚Letztes Backup …‘ steht mit heutigem Datum im Mehr-Menü. Einbinden im Prüfskript der App:
//   import { checkBackup } from '../../AppDesign/tests/backup.mjs';
//   const fehler = await checkBackup(page, { menu: '#sideMore', list: 'trips', where: 'iPad' });   // [] = alles richtig
import { readFileSync } from 'node:fs';
export async function checkBackup(page, { menu = '#sideMore', list, where = '' }) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}${t}`);
  const openMenu = async () => { await page.click(menu); await page.waitForTimeout(200); };
  const closeMsg = async () => { if (await page.locator('#msg[open]').count()) { await page.click('#msg [data-x]'); await page.waitForTimeout(200); } };
  // 1. Mehr-Menü: ‚Backup erstellen‘ mit grauer Zeile ‚Letztes Backup …‘, darunter ‚Backup laden‘ (R-9.1)
  await openMenu();
  const items = await page.locator('.menu .mi').evaluateAll(els => els.map(e => ({ text: e.textContent.trim() + (e.nextElementSibling?.classList.contains('sub') ? e.nextElementSibling.textContent.trim() : ''), icon: !!e.querySelector('svg') })));
  const iSave = items.findIndex(i => i.text.startsWith('Backup erstellen')), iLoad = items.findIndex(i => i.text.startsWith('Backup laden'));
  if (iSave < 0 || iLoad !== iSave + 1) E('R-9.1 Mehr-Menü: ‚Backup erstellen‘ und direkt darunter ‚Backup laden‘ fehlen');
  else {
    if (!/Backup erstellen(Letztes Backup erstellt am \d\d\.\d\d\.\d{4} um \d\d:\d\d|Noch kein Backup erstellt\.)/.test(items[iSave].text)) E(`R-9.1 graue Zeile unter ‚Backup erstellen‘ fehlt oder falsch: ‚${items[iSave].text}‘`);
    if (!items[iSave].icon || !items[iLoad].icon) E('R-9.1 Icons vor ‚Backup erstellen‘/‚Backup laden‘ fehlen');
  }
  // 2. Backup erstellen → Datei ‚Ω Backup <App> JJJJ.MM.TT hh.mm.json‘ mit Zeitpunkt und Gerät, Meldung ‚Backup‘, Kachel weg (A-74)
  // Dateiname direkt beim Weitergeben mitlesen (der Testbrowser meldet ihn bei Downloads aus lokalen Dateien nicht).
  await page.evaluate(() => { window.__shared = []; const orig = shareFiles; shareFiles = files => { window.__shared.push(...files.map(f => f.name)); return orig(files); }; });
  const [download] = await Promise.all([page.waitForEvent('download', { timeout: 5000 }).catch(() => null), page.locator('.menu .mi', { hasText: 'Backup erstellen' }).click()]);
  await page.waitForTimeout(400);
  let content = null;
  if (!download) E('R-9.1 Backup erstellen liefert keine Datei');
  else {
    const name = (await page.evaluate(() => window.__shared))[0] || '';
    if (!/^Ω Backup .+ \d{4}\.\d\d\.\d\d \d\d\.\d\d\.json$/.test(name)) E(`R-9.1 Dateiname ‚${name}‘ nicht ‚Ω Backup <App> JJJJ.MM.TT hh.mm.json‘`);
    content = readFileSync(await download.path(), 'utf8');
    const d = JSON.parse(content);
    if (!d.savedAt || !d.savedOn || !Array.isArray(d[list])) E('R-9.1 Backup ohne Zeitpunkt, Gerät oder Daten');
  }
  const msg = await page.locator('#msg[open]').count() ? await page.locator('#msg').evaluate(m => ({ title: m.querySelector('h3')?.textContent, text: m.querySelector('.msg-text')?.textContent })) : null;
  if (!msg || msg.title !== 'Backup' || !msg.text.startsWith('✅')) E('R-9.1 nach dem Backup fehlt das kleine Fenster ‚Backup‘ mit ✅');
  await closeMsg();
  if (download) {
    if (await page.locator('#side .bhint').count()) E('R-9.1 Backup-Kachel steht nach dem Backup noch da (soll verschwinden, A-74)');
    await openMenu();
    const heute = await page.evaluate(() => { const d = new Date(), two = n => String(n).padStart(2, '0'); return `${two(d.getDate())}.${two(d.getMonth() + 1)}.${d.getFullYear()}`; });
    const sub = await page.locator('.menu .mi', { hasText: 'Backup erstellen' }).evaluate(e => e.nextElementSibling?.classList.contains('sub') ? e.nextElementSibling.textContent.trim() : '').catch(() => '');
    if (!sub.includes(`Letztes Backup erstellt am ${heute} um`)) E(`R-9.1 Mehr-Menü nach dem Backup: ‚Letztes Backup erstellt am ${heute} um …‘ fehlt (gesehen: ‚${sub}‘)`);
    await page.keyboard.press('Escape'); await page.waitForTimeout(200);
    if (await page.locator('.menu').count()) { await page.mouse.click(5, 5); await page.waitForTimeout(200); }
  }
  // 3. Backup laden → Abfrage: Text ‚Backup vom …‘, je eine Kachel Abgleichen/Ersetzen mit Erklärung in gleicher Schrift, darunter Abbrechen (R-9.2)
  const before = await page.evaluate(() => JSON.stringify(localStorage));
  const load = async (name, buffer) => { await openMenu(); const [ch] = await Promise.all([page.waitForEvent('filechooser'), page.locator('.menu .mi', { hasText: 'Backup laden' }).click()]);
    await ch.setFiles({ name, mimeType: 'application/json', buffer }); await page.waitForTimeout(400); };
  if (content) {
    await load('backup.json', Buffer.from(content));
    const pop = await page.locator('.pop').evaluate(p => {
      const head = p.querySelector(':scope > p'), tiles = [...p.querySelectorAll('.tile')], rest = [...p.querySelectorAll('.btns button')], b = p.getBoundingClientRect();
      const fs = e => getComputedStyle(e).fontSize;
      return { head: head?.innerHTML || '', tiles: tiles.map(t => ({ text: t.querySelector('p')?.textContent || '', fs: t.querySelector('p') ? fs(t.querySelector('p')) : '', btn: t.querySelector('button')?.textContent, cls: t.querySelector('button')?.className, after: !!t.querySelector('p + button') })),
        headFs: head ? fs(head) : '', rest: rest.map(x => x.textContent), inside: b.top >= 0 && b.bottom <= innerHeight && b.left >= 0 && b.right <= innerWidth };
    }).catch(() => null);
    if (!pop) E('R-9.2 nach der Dateiauswahl erscheint keine Abfrage');
    else {
      if (!/Backup vom <b>\d\d\.\d\d\.\d{4} um \d\d:\d\d<\/b>/.test(pop.head)) E('R-9.2 Text ‚Backup vom …‘ oben fehlt');
      if (pop.tiles.length !== 2 || pop.tiles[0].btn !== 'Abgleichen' || pop.tiles[1].btn !== 'Ersetzen') E('R-9.2 nicht je eine Kachel für Abgleichen und Ersetzen');
      else {
        if (!/primary/.test(pop.tiles[0].cls) || !/danger-text/.test(pop.tiles[1].cls)) E('R-9.2 Abgleichen nicht blau gefüllt bzw. Ersetzen nicht in roter Schrift');
        if (pop.tiles.some(t => !t.text || !t.after)) E('R-9.2 Erklärung fehlt oder steht nicht über dem Knopf');
        if (pop.tiles.some(t => t.fs !== pop.headFs)) E(`R-9.2 Erklärung nicht in derselben Schrift wie ‚Backup vom …‘ (${pop.tiles.map(t => t.fs).join('/')} statt ${pop.headFs})`);
      }
      if (pop.rest.join('|') !== 'Abbrechen') E('R-9.2 unter den Kacheln nicht nur ‚Abbrechen‘');
      if (!pop.inside) E('R-9.2/R-4.5 Abfrage nicht ganz auf dem Bildschirm');
    }
    await page.locator('.pop button', { hasText: 'Abbrechen' }).click().catch(() => {}); await page.waitForTimeout(250);
    if (await page.evaluate(() => JSON.stringify(localStorage)) !== before) E('R-9.2 ‚Abbrechen‘ hat Daten geändert');
  }
  // 4. Unlesbare Datei → kleines Fenster ‚Backup laden‘ mit ⚠️ und Grund
  await load('kaputt.json', Buffer.from('kein Backup'));
  const bad = await page.locator('#msg[open]').count() ? await page.locator('#msg').evaluate(m => ({ title: m.querySelector('h3')?.textContent, text: m.querySelector('.msg-text')?.textContent })) : null;
  if (!bad || bad.title !== 'Backup laden' || !bad.text.startsWith('⚠️') || !/konnte nicht gelesen werden/.test(bad.text)) E('R-9.2 unlesbare Datei: kein kleines Fenster ‚Backup laden‘ mit ⚠️ und Grund');
  await closeMsg();
  // 5. Backup-Kachel nur, solange heute noch kein Backup erstellt wurde und es Einträge gibt; die Offline-Zeile steht immer im Fuß (A-74)
  const f = await page.evaluate(() => { const gestern = new Date(); gestern.setDate(gestern.getDate() - 1);
    return [backupTileHtml(0), backupTileHtml(gestern.getTime()), backupTileHtml(Date.now()), backupTileHtml(0, true)].map(h => ({ kachel: h.includes('class="bhint"'), zeile: h.includes('class="offl"') })); });
  if (!f[0].kachel || !f[1].kachel) E('R-9.1 Backup-Kachel fehlt, obwohl heute noch kein Backup erstellt wurde');
  if (f[2].kachel) E('R-9.1 Backup-Kachel steht, obwohl heute schon ein Backup erstellt wurde');
  if (f[3].kachel) E('R-9.1 Backup-Kachel steht bei leerer Liste');
  if (f.some(x => !x.zeile)) E('R-1.5 Offline-Zeile fehlt im Fuß (auch ohne Kachel und bei leerer Liste)');
  if (await page.evaluate(() => typeof onNeuerTag !== 'function')) E('R-9.1 onNeuerTag fehlt (Kachel kommt um 0:00 nicht wieder)');
  return errors;
}
