// AppDesign 4.10.1 · Prüfung der Kontextmenüs in der Seitenleiste bzw. Startliste (Regel R-40, Designrichtlinie allgemein 15.4).
// Drückt lange auf jede sichtbare Kachel und prüft: Menü ganz sichtbar und nicht abgeschnitten, nicht über bzw. hinter der
// Backup-Kachel, die Kachel bleibt sichtbar; ohne Platz daneben (iPhone) linksbündig unter der Kachel.
// Einbinden im Prüfskript der App (Seite mit sichtbarer Seitenleiste bzw. Startliste):
//   import { checkContextMenus } from '../../AppDesign/tests/kontextmenue.mjs';
//   const fehler = await checkContextMenus(page, 'iPhone hoch, 8 Einträge');   // [] = alles richtig
export async function checkContextMenus(page, where = '') {
  const errors = [], E = t => errors.push(`${where ? where + ': ' : ''}R-40 ${t}`);
  const ids = await page.evaluate(() => { const foot = document.querySelector('#side .bhint')?.getBoundingClientRect(), lt = document.querySelector('#side .side-list').getBoundingClientRect().top;
    return [...document.querySelectorAll('#side .side-row')].filter(r => { const b = r.getBoundingClientRect(); return b.height && b.top >= lt - 1 && (!foot || b.bottom <= foot.top); }).map(r => r.dataset.id); });
  for (const id of ids) {
    const row = page.locator(`#side .side-row[data-id="${id}"]`), rb = await row.boundingBox();
    await page.mouse.move(rb.x + 40, rb.y + rb.height / 2); await page.mouse.down(); await page.waitForTimeout(700); await page.mouse.up(); await page.waitForTimeout(300);
    const g = await page.evaluate(id => {
      const m = document.querySelector('.menu'); if (!m) return null;
      const r = document.querySelector(`#side .side-row[data-id="${id}"]`).getBoundingClientRect(), mr = m.getBoundingClientRect();
      const t = document.querySelector('#side .bhint')?.getBoundingClientRect(), l = document.querySelector('#side .side-list').getBoundingClientRect();
      const beside = mr.left >= r.right - 60;
      return { beside, below: mr.top >= r.bottom - 1, left: Math.abs(mr.left - r.left) < 2, clipped: m.scrollHeight > m.clientHeight + 1,
        inside: mr.top >= 0 && mr.left >= 0 && mr.bottom <= innerHeight + 1 && mr.right <= innerWidth + 1,
        overTile: t ? (mr.bottom > t.top + 1 && mr.right > t.left && mr.left < t.right) : false, rowVisible: r.top >= l.top - 1 && (!t || r.bottom <= t.top + 1) };
    }, id);
    if (!g) { E(`kein Kontextmenü an Eintrag ${id}`); continue; }
    if (!g.beside && (!g.below || !g.left)) E(`Kontextmenü an Eintrag ${id} nicht linksbündig unter der Kachel`);
    if (g.clipped) E(`Kontextmenü an Eintrag ${id} abgeschnitten (nicht alle Punkte sichtbar)`);
    if (!g.inside) E(`Kontextmenü an Eintrag ${id} nicht ganz auf dem Bildschirm`);
    if (g.overTile) E(`Kontextmenü an Eintrag ${id} reicht über bzw. hinter die Backup-Kachel`);
    if (!g.rowVisible) E(`Eintrag ${id} nach dem Öffnen des Menüs nicht mehr sichtbar`);
    await page.mouse.click(5, 5); await page.waitForTimeout(250);
  }
  return errors;
}
