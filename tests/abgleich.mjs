// AppDesign 4.11.0 · Prüfung des Abgleichs zwischen iPad und iPhone (Regeln R-41 bis R-44, Designrichtlinie allgemein 15.4 und 17).
// Prüft für jede App, die den gemeinsamen Baustein createSync (ui.js) nutzt, alle Anwendungsfälle der Tabelle ‚Abgleich‘ in beiden
// Richtungen (iPhone lädt das Backup vom iPad und umgekehrt) – mit neutralen Testdaten nach der Beschreibung der App (sync.config).
// Einbinden im Prüfskript der App (Seite mit geladener App, globales `sync`):
//   import { checkSync } from '../../AppDesign/tests/abgleich.mjs';
//   const fehler = await checkSync(page);   // [] = alles richtig
export async function checkSync(page) {
  return page.evaluate(() => {
    const errors = [];
    if (typeof sync === 'undefined' || !sync.config) return ['R-41 die App nutzt den Baustein createSync nicht (globales sync fehlt)'];
    const { list, sub, maxFields } = sync.config;
    const T = h => new Date(`2026-10-12T${h}:00`).getTime();
    const clone = x => structuredClone(x);
    const base = { [list]: [
      { id: 'x', title: 'Eintrag X', a: 'eins', b: 'zwei', [sub]: { k1: { p: 'P1', q: 'Q1' } }, ...Object.fromEntries(maxFields.map(k => [k, 1])) },
      { id: 'y', title: 'Eintrag Y', a: 'eins', [sub]: {} }], deleted: [] };
    // Gemeinsamer Ausgangsstand um 09:00 auf dem iPad, das iPhone übernimmt ihn (wie ‚Ersetzen‘).
    const start = clone(base); sync.stamp(start, new Map(), T('09:00'), 'iPad');
    const dev = name => { const d = { name, data: clone(start) }; d.snap = sync.snapshot(d.data); return d; };
    const act = (d, time, fn) => { fn(d.data); d.snap = sync.stamp(d.data, d.snap, T(time), d.name); };
    const E = (data, id) => data[list].find(e => e.id === id);
    const add = (id, title) => data => data[list].push({ id, title, a: 'neu', [sub]: {} });
    const del = id => data => { data[list] = data[list].filter(e => e.id !== id); };
    const setF = (id, k, v) => data => { E(data, id)[k] = v; };
    const setS = (id, key, k, v) => data => { const e = E(data, id); e[sub][key] ||= {}; if (v === null) { delete e[sub][key][k]; if (!Object.keys(e[sub][key]).length) delete e[sub][key]; } else e[sub][key][k] = v; };
    const legacy = d => { d.data[list].forEach(e => { delete e.metaAt; delete e[sync.config.subAt]; delete e.changedAt; delete e.changedOn; }); d.data.deleted = []; d.snap = sync.snapshot(d.data); };
    const S = (d, key) => d?.[sub]?.[key] || {};
    // Je Fall: Änderungen auf iPad und iPhone, dann Abgleich in beide Richtungen; erwartet je Richtung eine Prüffunktion (Rückgabe: Fehlertext oder '').
    function fall(nr, name, onIpad, onIphone, expect, opts = {}) {
      const ipad = dev('iPad'), iphone = dev('iPhone');
      if (opts.legacy) { legacy(ipad); legacy(iphone); }
      onIpad.forEach(([t, fn]) => opts.legacy ? fn(ipad.data) : act(ipad, t, fn));
      onIphone.forEach(([t, fn]) => opts.legacy ? fn(iphone.data) : act(iphone, t, fn));
      for (const [who, here, there] of [['iPhone', iphone, ipad], ['iPad', ipad, iphone]]) {
        const { data, stats } = sync.merge(clone(here.data), clone(there.data));
        // Seit 4.11.0: kurzes Fenster (resultText) und Abgleichbericht (reportHtml) zusammen geprüft.
        const text = sync.resultText(stats, T('12:00'), there.name, here.name) + sync.reportHtml(stats, T('12:00'), there.name, here.name);
        const msg = expect[who]({ data, stats, text, has: s => text.includes(s), e: id => E(data, id),
          row: (kind, title) => text.includes(`<tbody data-kind="${kind}" data-title="${title}"`) });
        if (msg) errors.push(`Abgleich Fall ${nr} (${name}) – ${who} lädt das Backup vom ${there.name}: ${msg}`);
      }
    }
    const same = r => r.has('Alles war schon auf dem gleichen Stand') ? '' : 'Meldung ‚Alles war schon auf dem gleichen Stand‘ fehlt';
    // Seit 4.11.0: hier neuer als im Backup – keine Meldung ‚gleicher Stand‘, sondern ‚nichts geändert‘ und der Hinweis ‚neuer‘.
    const newer = r => r.has('hat sich nichts geändert') && r.has('neuer als im Backup') && !r.has('gleichen Stand') ? '' : 'Meldung ‚hier neuer als im Backup‘ fehlt (R-44)';
    fall(1, 'nur auf dem iPad neu angelegt', [['10:00', add('n', 'Neu N')]], [],
      { iPhone: r => r.e('n') && r.row('added', 'Neu N') ? '' : 'neuer Eintrag kommt nicht dazu', iPad: r => r.e('n') ? newer(r) : 'eigener neuer Eintrag verloren' });
    fall(2, 'auf dem iPad gelöscht, iPhone unverändert', [['10:00', del('y')]], [],
      { iPhone: r => !r.e('y') && r.row('removed', 'Eintrag Y') ? '' : 'wird nicht gelöscht', iPad: r => !r.e('y') && r.has('Auf diesem iPad gelöscht, im Backup vom iPhone noch vorhanden:</b> Eintrag Y') ? '' : 'kommt zurück oder Hinweis (mit Gerätenamen) fehlt (R-43)' });
    fall(3, 'auf dem iPad gelöscht, auf dem iPhone danach geändert', [['10:00', del('y')]], [['11:00', setF('y', 'a', 'später')]],
      { iPhone: r => r.e('y') && r.has('Auf dem iPad gelöscht, auf diesem iPhone danach noch geändert:</b> Eintrag Y') ? '' : 'verschwindet oder Hinweis (mit Gerätenamen) fehlt (R-43)', iPad: r => r.e('y')?.a === 'später' && r.row('added', 'Eintrag Y') ? '' : 'kommt nicht mit der Änderung zurück' });
    fall(4, 'auf dem iPad gelöscht, auf dem iPhone vorher geändert', [['11:00', del('y')]], [['10:00', setF('y', 'a', 'früher')]],
      { iPhone: r => !r.e('y') ? '' : 'wird nicht gelöscht', iPad: r => !r.e('y') && r.has('Auf diesem iPad gelöscht, im Backup vom iPhone noch vorhanden') ? '' : 'kommt zurück oder Hinweis fehlt' });
    fall(5, 'auf beiden gelöscht', [['10:00', del('y')]], [['11:00', del('y')]],
      { iPhone: r => !r.e('y') && !r.has('Eintrag Y') ? '' : 'taucht auf', iPad: r => !r.e('y') && !r.has('Eintrag Y') ? '' : 'taucht auf' });
    fall(6, 'nur auf dem iPad Unterdaten erfasst', [['10:00', setS('x', 'k2', 'p', 'neu')]], [],
      { iPhone: r => S(r.e('x'), 'k2').p === 'neu' && r.row('updated', 'Eintrag X') ? '' : 'nicht übernommen', iPad: r => S(r.e('x'), 'k2').p === 'neu' ? newer(r) : 'verloren' });
    fall(7, 'verschiedene Unterdaten auf beiden', [['10:00', setS('x', 'k2', 'p', 'iPad')]], [['11:00', setS('x', 'k3', 'p', 'iPhone')]],
      { iPhone: r => S(r.e('x'), 'k2').p === 'iPad' && S(r.e('x'), 'k3').p === 'iPhone' ? '' : 'eines fehlt', iPad: r => S(r.e('x'), 'k2').p === 'iPad' && S(r.e('x'), 'k3').p === 'iPhone' ? '' : 'eines fehlt' });
    fall(8, 'gleiche Unterdaten, verschiedene Felder', [['10:00', setS('x', 'k1', 'p', 'P-iPad')]], [['11:00', setS('x', 'k1', 'q', 'Q-iPhone')]],
      { iPhone: r => S(r.e('x'), 'k1').p === 'P-iPad' && S(r.e('x'), 'k1').q === 'Q-iPhone' ? '' : 'ein Feld verloren (R-42)', iPad: r => S(r.e('x'), 'k1').p === 'P-iPad' && S(r.e('x'), 'k1').q === 'Q-iPhone' ? '' : 'ein Feld verloren (R-42)' });
    // Fenster, die beim Sichern alle Felder schreiben (leere mit ''), dürfen beim Abgleich nichts mit ‚leer‘ überschreiben.
    fall('8b', 'neue Unterdaten auf beiden, verschiedene Felder, leere Felder mitgespeichert', [['10:00', d => { E(d, 'x')[sub].k5 = { p: 'P iPad', q: '' }; }]], [['11:00', d => { E(d, 'x')[sub].k5 = { p: '', q: 'Q iPhone' }; }]],
      { iPhone: r => S(r.e('x'), 'k5').p === 'P iPad' && S(r.e('x'), 'k5').q === 'Q iPhone' ? '' : 'ein Feld durch ein leeres Feld überschrieben (R-42)', iPad: r => S(r.e('x'), 'k5').p === 'P iPad' && S(r.e('x'), 'k5').q === 'Q iPhone' ? '' : 'ein Feld durch ein leeres Feld überschrieben (R-42)' });
    fall(9, 'gleiches Feld auf beiden (iPhone später)', [['10:00', setS('x', 'k1', 'p', 'iPad')]], [['11:00', setS('x', 'k1', 'p', 'iPhone')]],
      { iPhone: r => S(r.e('x'), 'k1').p !== 'iPhone' ? 'neuere Fassung nicht behalten' : !r.row('newer', 'Eintrag X') || !r.has('hat sich nichts geändert') ? 'Tabelle ‚hier neuer als im Backup‘ fehlt (R-44, P-26/9)' : '',
        iPad: r => S(r.e('x'), 'k1').p !== 'iPhone' ? 'neuere Fassung nicht übernommen' : !r.row('updated', 'Eintrag X') ? 'Zeile in der Tabelle der Änderungen fehlt (R-44)' : '' });
    fall(10, 'Feld auf dem iPad geleert', [['10:00', setS('x', 'k1', 'p', null)]], [],
      { iPhone: r => !S(r.e('x'), 'k1').p && S(r.e('x'), 'k1').q === 'Q1' ? '' : 'nicht geleert oder Rest verloren', iPad: r => !S(r.e('x'), 'k1').p ? '' : 'wieder da' });
    fall(11, 'Feld auf dem iPad geleert, auf dem iPhone danach neu', [['10:00', setS('x', 'k1', 'p', null)]], [['11:00', setS('x', 'k1', 'p', 'neu')]],
      { iPhone: r => S(r.e('x'), 'k1').p === 'neu' ? '' : 'neuer Eintrag verloren', iPad: r => S(r.e('x'), 'k1').p === 'neu' ? '' : 'neuer Eintrag nicht übernommen' });
    fall(12, 'Kopfdaten: verschiedene Felder', [['10:00', setF('x', 'title', 'Titel iPad')]], [['11:00', setF('x', 'b', 'B iPhone')]],
      { iPhone: r => r.e('x').title === 'Titel iPad' && r.e('x').b === 'B iPhone' ? '' : 'ein Feld verloren (R-42)', iPad: r => r.e('x').title === 'Titel iPad' && r.e('x').b === 'B iPhone' ? '' : 'ein Feld verloren (R-42)' });
    fall(13, 'Kopfdaten: gleiches Feld (iPad später)', [['11:00', setF('x', 'title', 'iPad')]], [['10:00', setF('x', 'title', 'iPhone')]],
      { iPhone: r => r.e('x').title === 'iPad' ? '' : 'neueres Feld nicht übernommen', iPad: r => r.e('x').title === 'iPad' ? '' : 'neueres Feld nicht behalten' });
    fall(14, 'gleicher Name auf beiden neu angelegt', [['10:00', add('n1', 'Gleich')]], [['11:00', add('n2', 'Gleich')]],
      { iPhone: r => r.e('n1') && r.e('n2') ? '' : 'nicht beide da', iPad: r => r.e('n1') && r.e('n2') ? '' : 'nicht beide da' });
    fall(15, 'nichts geändert', [], [], { iPhone: same, iPad: same });
    fall(16, 'ohne Zeitpunkte (ältere Daten)', [['10:00', d => { E(d, 'x')[sub].k1.p = 'alt iPad'; E(d, 'x')[sub].k9 = { p: 'nur iPad' }; }]], [['10:00', d => { E(d, 'x')[sub].k1.p = 'alt iPhone'; }]],
      { iPhone: r => S(r.e('x'), 'k1').p === 'alt iPhone' && S(r.e('x'), 'k9').p === 'nur iPad' ? '' : 'Vorhandenes überschrieben oder Fehlendes nicht dazu', iPad: r => S(r.e('x'), 'k1').p === 'alt iPad' ? '' : 'Vorhandenes überschrieben' }, { legacy: true });
    if (maxFields.length) { const k = maxFields[0];
      fall(17, `${k}: größerer Wert`, [['10:00', setF('x', k, 5)]], [['11:00', setF('x', k, 3)]],
        { iPhone: r => r.e('x')[k] === 5 ? '' : 'größerer Wert nicht übernommen', iPad: r => r.e('x')[k] === 5 ? '' : 'größerer Wert verloren' }); }
    // R-44 (seit 4.11.0): kurzes Fenster mit Schaltfläche ‚Abgleichbericht anzeigen‘ (nur, wenn es etwas zu berichten gibt),
    // Bericht wie die Ausgabe: Kopf (abgeglichen am, Backup mit Gerät, Ergebnis), Tabelle der Änderungen (Eintrag · Tag · Feld ·
    // Neu · Vorher · Vom Gerät · Geändert am) ohne Unverändertes, dessen Anzahl darunter, Tabelle ‚hier neuer‘.
    { const ipad = dev('iPad'), iphone = dev('iPhone'), R = t => errors.push('R-44 ' + t);
      act(ipad, '10:00', setS('x', '2026-10-12', 'p', 'neu')); act(ipad, '10:00', add('n', 'Neu N'));
      const { stats } = sync.merge(clone(iphone.data), clone(ipad.data));
      const short = sync.resultText(stats, T('10:05'), 'iPad', 'iPhone');
      if (/<table/.test(short)) R('das kurze Fenster enthält Einzelheiten – die gehören in den Abgleichbericht');
      if (!short.includes('vom <b>iPad</b>')) R('Gerät des Backups fehlt im kurzen Fenster');
      const box = document.createElement('div'); box.innerHTML = sync.reportHtml(stats, T('10:05'), 'iPad', 'iPhone');
      const tbl = box.querySelector('table.grid');
      if (!tbl) R('Abgleichbericht ohne Tabelle der Änderungen');
      else {
        const heads = [...tbl.querySelectorAll('thead th')].map(t => t.textContent).join('|'), want = `${sync.config.nouns[0]}|Tag|Feld|Neu|Vorher|Vom Gerät|Geändert am`;
        if (heads !== want) R(`Spaltenköpfe ‚${heads}‘ statt ‚${want}‘`);
        const titles = [...tbl.querySelectorAll('tbody')].map(t => t.dataset.title);
        if (titles.join('|') !== 'Eintrag X|Neu N') R(`Zeilen ‚${titles.join(', ')}‘ statt ‚Eintrag X, Neu N‘ (Unverändertes gehört nicht in die Tabelle)`);
        const cells = [...(tbl.querySelector('tbody[data-kind="updated"] tr')?.cells || [])].map(c => c.textContent);
        if (!/12\.10\./.test(cells[1]) || cells[2] !== (sync.config.labels?.p || 'p') || cells[3] !== 'neu' || cells[5] !== 'iPad' || !/12\.10\.2026 10:00/.test(cells[6])) R(`Zeile mit Tag, Feld, neuem Inhalt, Gerät und Zeitpunkt falsch: ${cells.join(' | ')}`);
        if (!tbl.querySelector('tbody[data-kind="added"] .new')) R('Neu nicht gekennzeichnet');
        if (!/unverändert/.test(tbl.nextElementSibling?.textContent || '')) R('Anzahl der unveränderten Einträge fehlt unter der Tabelle');
        if (!box.querySelector('.meta')?.textContent.includes('vom iPad')) R('Gerät des Backups fehlt im Kopf des Berichts');
      }
      const none = sync.merge(clone(iphone.data), clone(iphone.data)).stats;
      if (!sync.resultText(none, T('10:05'), 'iPhone', 'iPhone').includes('Alles war schon auf dem gleichen Stand')) R('ohne Änderung fehlt ‚Alles war schon auf dem gleichen Stand‘');
    }
    // R-41: Abfrage und Wege; R-44: ‚geändert am … · Gerät‘
    const q = sync.question(start, start, T('09:00'), 'iPhone');
    if (!/Backup vom <b>12\.10\.2026 um 09:00<\/b> \(iPhone\)/.test(q) || !/gleich alt|neuer|älter/.test(q)) errors.push('R-41 Abfrage nennt Zeitpunkt, Gerät oder neuer/älter nicht');
    if (sync.choices().map(c => `${c.label}:${c.cls || ''}:${c.desc ? 'Kachel' : ''}`).join('|') !== 'Abgleichen:primary:Kachel|Ersetzen:danger-text:Kachel|Abbrechen::') errors.push('R-41/R-46 Wege nicht Abgleichen (blau, Kachel) · Ersetzen (rot, Kachel) · Abbrechen');
    if (!sync.changedLine(start[list][0]).includes('geändert am 12.10.2026 um 09:00 · iPad')) errors.push('R-44 Zeile ‚geändert am … · Gerät‘ fehlt');
    return errors;
  });
}
