// AppDesign 4.34.0 (zuletzt 4.68.0) · Prüfung der Kontextmenüs in der Seitenleiste bzw. Startliste (Regel R-4.2, Designrichtlinie allgemein 15.4).
// Drückt lange auf jede sichtbare Kachel und prüft: Menü ganz sichtbar und nicht abgeschnitten, nicht über bzw. hinter der
// Backup-Kachel (ohne Kachel, seit 4.34.0: nicht über der Offline-Zeile), die Kachel bleibt sichtbar; ohne Platz daneben (iPhone)
// linksbündig unter der Kachel, reicht der Platz darunter nicht, darüber. Seit 4.67.0 (APD-143/L-1, L-3, L-4, L-6; arbeit/APD-143 Wortlaut und
// Testfall-Liste.md): die Liste bleibt beim Öffnen und Schließen stehen (Rollstand und Lage der Kachel wie vorher) – nur wenn das Menü weder unter
// noch über der Kachel ganz passt (z. B. große Schrift), darf sie rücken (Rückfall). Seit 4.68.0 (RLB-125, arbeit/0153 RLB-125 Kontextmenue iPhone quer.md):
// passt es weder darunter noch darüber und ist die Kachel mindestens doppelt so breit wie das Menü (iPhone quer), steht es rechtsbündig auf der Kachel,
// oben bündig mit ihr bzw. ganz über der Backup-Kachel – die Liste bleibt stehen; nur dann ist diese Lage erlaubt.
// Einbinden im Prüfskript der App (Seite mit sichtbarer Seitenleiste bzw. Startliste):
//   import { checkContextMenus } from '../../AppDesign/tests/kontextmenue.mjs';
//   const fehler = await checkContextMenus(page, 'iPhone hoch, 8 Einträge');   // [] = alles richtig
import { texteMenues } from './hig.mjs';
import { langDruecken } from './ablauf.mjs';
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
    const lage = () => page.evaluate(id => { const l = document.querySelector('#side .side-list'), r = document.querySelector(`#side .side-row[data-id="${id}"]`)?.getBoundingClientRect();
      return { st: Math.round(l.scrollTop), top: r ? Math.round(r.top) : null }; }, id);
    const vorher = await lage();
    // seit 4.59.3 (APD-85 Teil 6): Warten auf die Endlage statt fester Pause (unter Last maß die Prüfung vor dem Ausrichten – Wackler in WebKit)
    { const m = await langDruecken(page, { x: rb.x + 40, y: rb.y + rb.height / 2 }, { ms: 700, offen: '.menu' }); if (m) E(`Eintrag ${id}: ${m}`); }
    const g = await page.evaluate(id => {
      const m = document.querySelector('.menu'); if (!m) return null;
      const r = document.querySelector(`#side .side-row[data-id="${id}"]`).getBoundingClientRect(), mr = m.getBoundingClientRect();
      const t = document.querySelector('#side .side-foot .bhint, #side .side-foot .offl:not([hidden])')?.getBoundingClientRect(), l = document.querySelector('#side .side-list').getBoundingClientRect();
      const beside = mr.left >= r.right - 60, { T, B } = rand12(), limit = t && t.height ? Math.min(innerHeight - B, t.top - 12) : innerHeight - B;
      // seit 4.68.0 (RLB-125): rechtsbündig auf der Kachel, oben bündig mit ihr bzw. über der Backup-Kachel
      const onTile = !beside && mr.left >= r.left + r.width / 2 - 1 && Math.abs(mr.right - r.right) < 2 && Math.abs(mr.top - Math.max(T, Math.min(r.top, limit - mr.height))) < 2;
      return { beside, onTile, below: mr.top >= r.bottom - 1, above: mr.bottom <= r.top + 1, left: Math.abs(mr.left - r.left) < 2, clipped: m.scrollHeight > m.clientHeight + 1,
        inside: mr.top >= 0 && mr.left >= 0 && mr.bottom <= innerHeight + 1 && mr.right <= innerWidth + 1,
        overTile: t ? (mr.bottom > t.top + 1 && mr.right > t.left && mr.left < t.right) : false, rowVisible: r.top >= l.top - 1 && (!t || r.bottom <= t.top + 1) };
    }, id);
    if (!g) { E(`kein Kontextmenü an Eintrag ${id}`); continue; }
    // APD-143/L-1: die Liste bleibt stehen, außer das Menü passt weder unter noch über die Kachel (Lage vor dem Öffnen)
    const offen = await lage(), { passt, unterOderUeber } = await page.evaluate(([id, top]) => {
      const m = document.querySelector('.menu'), r = document.querySelector(`#side .side-row[data-id="${id}"]`).getBoundingClientRect(), { T, B } = rand12();
      const f = document.querySelector('#side .side-foot .bhint, #side .side-foot .offl:not([hidden])')?.getBoundingClientRect();
      const limit = f && f.height ? Math.min(innerHeight - B, f.top - 12) : innerHeight - B, h = m.offsetHeight, dy = top - r.top;
      const unterOderUeber = r.bottom + dy + 8 + h <= limit + 1 || r.top + dy - 8 - h >= T - 1;
      return { passt: m.getBoundingClientRect().left >= r.right - 60 || unterOderUeber || (r.width >= 2 * m.offsetWidth && h <= limit - T), unterOderUeber }; }, [id, vorher.top]);
    if (passt && (offen.st !== vorher.st || offen.top !== vorher.top)) E(`APD-143/L-1 Kontextmenü an Eintrag ${id}: die Liste rückt (Rollstand ${vorher.st} → ${offen.st}, Kachel ${vorher.top} → ${offen.top} px), obwohl das Menü ohne Rücken passt`);
    if (g.onTile && unterOderUeber) E(`Kontextmenü an Eintrag ${id} rechts auf der Kachel, obwohl es unter oder über die Kachel passt`);
    if (!g.beside && !g.left && !g.onTile) E(`Kontextmenü an Eintrag ${id} nicht linksbündig an der Kachel`);
    if (!g.beside && !g.below && !g.above && !g.onTile) E(`Kontextmenü an Eintrag ${id} weder unter noch (ohne Platz) über der Kachel noch (iPhone quer) rechtsbündig auf ihr`);
    if (g.clipped) E(`Kontextmenü an Eintrag ${id} abgeschnitten (nicht alle Punkte sichtbar)`);
    if (!g.inside) E(`Kontextmenü an Eintrag ${id} nicht ganz auf dem Bildschirm`);
    if (g.overTile) E(`Kontextmenü an Eintrag ${id} reicht über bzw. hinter die Backup-Kachel`);
    if (!g.rowVisible) E(`Eintrag ${id} nach dem Öffnen des Menüs nicht mehr sichtbar`);
    // seit 4.52.0 (R-4.10, APD-40/B-3, B-4): Texte, Gruppen und gesperrte Punkte jedes Kontextmenüs
    for (const x of await page.evaluate(texteMenues)) errors.push(`${where ? where + ': ' : ''}${x} (Eintrag ${id})`);
    await page.mouse.click(5, 5); await page.waitForTimeout(250);
    // APD-143/L-2: beim Schließen springt die Liste nicht zurück (bleibt, wie sie offen stand)
    const zu = await lage();
    if (passt && (zu.st !== vorher.st || zu.top !== vorher.top)) E(`APD-143/L-2 nach dem Schließen des Kontextmenüs an Eintrag ${id}: die Liste springt (Rollstand ${vorher.st} → ${zu.st}, Kachel ${vorher.top} → ${zu.top} px)`);
  }
  return errors;
}
