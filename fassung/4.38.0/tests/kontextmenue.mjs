// AppDesign 4.34.0 · Prüfung der Kontextmenüs in der Seitenleiste bzw. Startliste (Regel R-4.2, Designrichtlinie allgemein 15.4).
// Drückt lange auf jede sichtbare Kachel und prüft: Menü ganz sichtbar und nicht abgeschnitten, nicht über bzw. hinter der
// Backup-Kachel (ohne Kachel, seit 4.34.0: nicht über der Offline-Zeile), die Kachel bleibt sichtbar; ohne Platz daneben (iPhone)
// linksbündig unter der Kachel.
// Einbinden im Prüfskript der App (Seite mit sichtbarer Seitenleiste bzw. Startliste):
//   import { checkContextMenus } from '../../AppDesign/tests/kontextmenue.mjs';
//   const fehler = await checkContextMenus(page, 'iPhone hoch, 8 Einträge');   // [] = alles richtig
export async function checkContextMenus(page, where = '') {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-4.2 ${t}`);
  const ids = await page.evaluate(() => { const foot = document.querySelector('#side .side-foot .bhint, #side .side-foot .offl:not([hidden])')?.getBoundingClientRect(), lr = document.querySelector('#side .side-list').getBoundingClientRect(), lt = lr.top, unten = Math.min(innerHeight, lr.bottom);
    return [...document.querySelectorAll('#side .side-row')].filter(r => { const b = r.getBoundingClientRect(); return b.height && b.top >= lt - 1 && b.bottom <= unten + 1 && (!foot || b.bottom <= foot.top); }).map(r => r.dataset.id); });
  // Seit 4.11.0: zuletzt auch der letzte Eintrag bei ganz nach unten gewischter Liste (direkt über der Backup-Kachel).
  const lastId = await page.evaluate(() => [...document.querySelectorAll('#side .side-row')].pop()?.dataset.id);
  if (lastId) ids.push('ende:' + lastId);
  for (let id of ids) {
    if (id.startsWith('ende:')) { id = id.slice(5); await page.evaluate(() => { const l = document.querySelector('#side .side-list'); l.scrollTop = l.scrollHeight; }); await page.waitForTimeout(200); }
    const row = page.locator(`#side .side-row[data-id="${id}"]`), rb = await row.boundingBox();
    await page.mouse.move(rb.x + 40, rb.y + rb.height / 2); await page.mouse.down(); await page.waitForTimeout(700); await page.mouse.up(); await page.waitForTimeout(300);
    const g = await page.evaluate(id => {
      const m = document.querySelector('.menu'); if (!m) return null;
      const r = document.querySelector(`#side .side-row[data-id="${id}"]`).getBoundingClientRect(), mr = m.getBoundingClientRect();
      const t = document.querySelector('#side .side-foot .bhint, #side .side-foot .offl:not([hidden])')?.getBoundingClientRect(), l = document.querySelector('#side .side-list').getBoundingClientRect();
      const beside = mr.left >= r.right - 60;
      return { beside, below: mr.top >= r.bottom - 1, above: mr.bottom <= r.top + 1, left: Math.abs(mr.left - r.left) < 2, clipped: m.scrollHeight > m.clientHeight + 1,
        inside: mr.top >= 0 && mr.left >= 0 && mr.bottom <= innerHeight + 1 && mr.right <= innerWidth + 1,
        overTile: t ? (mr.bottom > t.top + 1 && mr.right > t.left && mr.left < t.right) : false, rowVisible: r.top >= l.top - 1 && (!t || r.bottom <= t.top + 1) };
    }, id);
    if (!g) { E(`kein Kontextmenü an Eintrag ${id}`); continue; }
    if (!g.beside && !g.left) E(`Kontextmenü an Eintrag ${id} nicht linksbündig an der Kachel`);
    if (!g.beside && !g.below && !g.above) E(`Kontextmenü an Eintrag ${id} weder unter noch (ohne Platz) über der Kachel`);
    if (g.clipped) E(`Kontextmenü an Eintrag ${id} abgeschnitten (nicht alle Punkte sichtbar)`);
    if (!g.inside) E(`Kontextmenü an Eintrag ${id} nicht ganz auf dem Bildschirm`);
    if (g.overTile) E(`Kontextmenü an Eintrag ${id} reicht über bzw. hinter die Backup-Kachel`);
    if (!g.rowVisible) E(`Eintrag ${id} nach dem Öffnen des Menüs nicht mehr sichtbar`);
    await page.mouse.click(5, 5); await page.waitForTimeout(250);
  }
  return errors;
}
