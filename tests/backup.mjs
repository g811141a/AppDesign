// AppDesign 4.10.1 · Prüfung von ‚Backup erstellen‘ und ‚Backup laden‘ (Regeln R-45, R-46; Designrichtlinie allgemein 15.19).
// Bedient die App wie ein Mensch: Mehr-Menü der Seitenleiste → Backup erstellen → Meldung; Backup laden → Abfrage mit Kacheln →
// Abbrechen; unlesbare Datei → Meldung. Einbinden im Prüfskript der App:
//   import { checkBackup } from '../../AppDesign/tests/backup.mjs';
//   const fehler = await checkBackup(page, { menu: '#sideMore', list: 'trips', where: 'iPad' });   // [] = alles richtig
import { readFileSync } from 'node:fs';
export async function checkBackup(page, { menu = '#sideMore', list, where = '' }) {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}${t}`);
  const openMenu = async () => { await page.click(menu); await page.waitForTimeout(200); };
  const closeMsg = async () => { if (await page.locator('#msg[open]').count()) { await page.click('#msg [data-x]'); await page.waitForTimeout(200); } };
  // 1. Mehr-Menü: ‚Backup erstellen‘ mit grauer Zeile ‚Letztes Backup …‘, darunter ‚Backup laden‘ (R-45)
  await openMenu();
  const items = await page.locator('.menu .mi').evaluateAll(els => els.map(e => ({ text: e.textContent.trim() + (e.nextElementSibling?.classList.contains('sub') ? e.nextElementSibling.textContent.trim() : ''), icon: !!e.querySelector('svg') })));
  const iSave = items.findIndex(i => i.text.startsWith('Backup erstellen')), iLoad = items.findIndex(i => i.text.startsWith('Backup laden'));
  if (iSave < 0 || iLoad !== iSave + 1) E('R-45 Mehr-Menü: ‚Backup erstellen‘ und direkt darunter ‚Backup laden‘ fehlen');
  else {
    if (!/Backup erstellen(Letztes Backup erstellt am \d\d\.\d\d\.\d{4} um \d\d:\d\d|Noch kein Backup erstellt\.)/.test(items[iSave].text)) E(`R-45 graue Zeile unter ‚Backup erstellen‘ fehlt oder falsch: ‚${items[iSave].text}‘`);
    if (!items[iSave].icon || !items[iLoad].icon) E('R-45 Icons vor ‚Backup erstellen‘/‚Backup laden‘ fehlen');
  }
  // 2. Backup erstellen → Datei ‚Ω Backup <App> JJJJ.MM.TT hh.mm.json‘ mit Zeitpunkt und Gerät, Meldung ‚Backup‘, Kachel nicht mehr gelb
  // Dateiname direkt beim Weitergeben mitlesen (der Testbrowser meldet ihn bei Downloads aus lokalen Dateien nicht).
  await page.evaluate(() => { window.__shared = []; const orig = shareFiles; shareFiles = files => { window.__shared.push(...files.map(f => f.name)); return orig(files); }; });
  const [download] = await Promise.all([page.waitForEvent('download', { timeout: 5000 }).catch(() => null), page.locator('.menu .mi', { hasText: 'Backup erstellen' }).click()]);
  await page.waitForTimeout(400);
  let content = null;
  if (!download) E('R-45 Backup erstellen liefert keine Datei');
  else {
    const name = (await page.evaluate(() => window.__shared))[0] || '';
    if (!/^Ω Backup .+ \d{4}\.\d\d\.\d\d \d\d\.\d\d\.json$/.test(name)) E(`R-45 Dateiname ‚${name}‘ nicht ‚Ω Backup <App> JJJJ.MM.TT hh.mm.json‘`);
    content = readFileSync(await download.path(), 'utf8');
    const d = JSON.parse(content);
    if (!d.savedAt || !d.savedOn || !Array.isArray(d[list])) E('R-45 Backup ohne Zeitpunkt, Gerät oder Daten');
  }
  const msg = await page.locator('#msg[open]').count() ? await page.locator('#msg').evaluate(m => ({ title: m.querySelector('h3')?.textContent, text: m.querySelector('.msg-text')?.textContent })) : null;
  if (!msg || msg.title !== 'Backup' || !msg.text.startsWith('✅')) E('R-45 nach dem Backup fehlt das kleine Fenster ‚Backup‘ mit ✅');
  await closeMsg();
  const tile = await page.locator('#side .bhint').first().evaluate(t => ({ ok: t.classList.contains('ok'), text: t.textContent })).catch(() => null);
  if (!tile || !tile.ok || !/Letztes Backup erstellt am/.test(tile.text)) E('R-45 Backup-Kachel nach dem Backup nicht weiß bzw. ohne ‚Letztes Backup erstellt am …‘');
  // 3. Backup laden → Abfrage: Text ‚Backup vom …‘, je eine Kachel Abgleichen/Ersetzen mit Erklärung in gleicher Schrift, darunter Abbrechen (R-46)
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
    if (!pop) E('R-46 nach der Dateiauswahl erscheint keine Abfrage');
    else {
      if (!/Backup vom <b>\d\d\.\d\d\.\d{4} um \d\d:\d\d<\/b>/.test(pop.head)) E('R-46 Text ‚Backup vom …‘ oben fehlt');
      if (pop.tiles.length !== 2 || pop.tiles[0].btn !== 'Abgleichen' || pop.tiles[1].btn !== 'Ersetzen') E('R-46 nicht je eine Kachel für Abgleichen und Ersetzen');
      else {
        if (!/primary/.test(pop.tiles[0].cls) || !/danger-text/.test(pop.tiles[1].cls)) E('R-46 Abgleichen nicht blau gefüllt bzw. Ersetzen nicht in roter Schrift');
        if (pop.tiles.some(t => !t.text || !t.after)) E('R-46 Erklärung fehlt oder steht nicht über dem Knopf');
        if (pop.tiles.some(t => t.fs !== pop.headFs)) E(`R-46 Erklärung nicht in derselben Schrift wie ‚Backup vom …‘ (${pop.tiles.map(t => t.fs).join('/')} statt ${pop.headFs})`);
      }
      if (pop.rest.join('|') !== 'Abbrechen') E('R-46 unter den Kacheln nicht nur ‚Abbrechen‘');
      if (!pop.inside) E('R-46/R-39 Abfrage nicht ganz auf dem Bildschirm');
    }
    await page.locator('.pop button', { hasText: 'Abbrechen' }).click().catch(() => {}); await page.waitForTimeout(250);
    if (await page.evaluate(() => JSON.stringify(localStorage)) !== before) E('R-46 ‚Abbrechen‘ hat Daten geändert');
  }
  // 4. Unlesbare Datei → kleines Fenster ‚Backup laden‘ mit ⚠️ und Grund
  await load('kaputt.json', Buffer.from('kein Backup'));
  const bad = await page.locator('#msg[open]').count() ? await page.locator('#msg').evaluate(m => ({ title: m.querySelector('h3')?.textContent, text: m.querySelector('.msg-text')?.textContent })) : null;
  if (!bad || bad.title !== 'Backup laden' || !bad.text.startsWith('⚠️') || !/konnte nicht gelesen werden/.test(bad.text)) E('R-46 unlesbare Datei: kein kleines Fenster ‚Backup laden‘ mit ⚠️ und Grund');
  await closeMsg();
  // 5. Backup-Kachel gelb, solange heute noch kein Backup erstellt wurde
  const tiles = await page.evaluate(() => [backupTileHtml(0).includes('bhint ok'), backupTileHtml(Date.now()).includes('bhint ok')]);
  if (tiles[0] || !tiles[1]) E('R-45 Backup-Kachel: gelb ohne Backup heute, weiß nach einem Backup heute');
  return errors;
}
