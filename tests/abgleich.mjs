// AppDesign 4.10.0 · Prüfung des Abgleichs zwischen iPad und iPhone (Regeln R-41 bis R-44, Designrichtlinie allgemein 15.4 und 17).
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
        const text = sync.resultText(stats, T('12:00'), there.name);
        const msg = expect[who]({ data, stats, text, has: s => text.includes(s), e: id => E(data, id) });
        if (msg) errors.push(`Abgleich Fall ${nr} (${name}) – ${who} lädt das Backup vom ${there.name}: ${msg}`);
      }
    }
    const same = r => r.has('Alles war schon auf dem gleichen Stand') ? '' : 'Meldung ‚Alles war schon auf dem gleichen Stand‘ fehlt';
    fall(1, 'nur auf dem iPad neu angelegt', [['10:00', add('n', 'Neu N')]], [],
      { iPhone: r => r.e('n') && r.has('<b>Neu:</b> Neu N') ? '' : 'neuer Eintrag kommt nicht dazu', iPad: r => r.e('n') ? same(r) : 'eigener neuer Eintrag verloren' });
    fall(2, 'auf dem iPad gelöscht, iPhone unverändert', [['10:00', del('y')]], [],
      { iPhone: r => !r.e('y') && r.has('<b>Gelöscht:</b> Eintrag Y') ? '' : 'wird nicht gelöscht', iPad: r => !r.e('y') && r.has('Hier gelöscht, im Backup noch vorhanden:</b> Eintrag Y') ? '' : 'kommt zurück oder Hinweis fehlt (R-43)' });
    fall(3, 'auf dem iPad gelöscht, auf dem iPhone danach geändert', [['10:00', del('y')]], [['11:00', setF('y', 'a', 'später')]],
      { iPhone: r => r.e('y') && r.has('Drüben gelöscht, hier danach noch geändert:</b> Eintrag Y') ? '' : 'verschwindet oder Hinweis fehlt (R-43)', iPad: r => r.e('y')?.a === 'später' && r.has('<b>Neu:</b> Eintrag Y') ? '' : 'kommt nicht mit der Änderung zurück' });
    fall(4, 'auf dem iPad gelöscht, auf dem iPhone vorher geändert', [['11:00', del('y')]], [['10:00', setF('y', 'a', 'früher')]],
      { iPhone: r => !r.e('y') ? '' : 'wird nicht gelöscht', iPad: r => !r.e('y') && r.has('Hier gelöscht, im Backup noch vorhanden') ? '' : 'kommt zurück oder Hinweis fehlt' });
    fall(5, 'auf beiden gelöscht', [['10:00', del('y')]], [['11:00', del('y')]],
      { iPhone: r => !r.e('y') && !r.has('Eintrag Y') ? '' : 'taucht auf', iPad: r => !r.e('y') && !r.has('Eintrag Y') ? '' : 'taucht auf' });
    fall(6, 'nur auf dem iPad Unterdaten erfasst', [['10:00', setS('x', 'k2', 'p', 'neu')]], [],
      { iPhone: r => S(r.e('x'), 'k2').p === 'neu' && r.has('Eintrag X (1 ') ? '' : 'nicht übernommen', iPad: r => S(r.e('x'), 'k2').p === 'neu' ? same(r) : 'verloren' });
    fall(7, 'verschiedene Unterdaten auf beiden', [['10:00', setS('x', 'k2', 'p', 'iPad')]], [['11:00', setS('x', 'k3', 'p', 'iPhone')]],
      { iPhone: r => S(r.e('x'), 'k2').p === 'iPad' && S(r.e('x'), 'k3').p === 'iPhone' ? '' : 'eines fehlt', iPad: r => S(r.e('x'), 'k2').p === 'iPad' && S(r.e('x'), 'k3').p === 'iPhone' ? '' : 'eines fehlt' });
    fall(8, 'gleiche Unterdaten, verschiedene Felder', [['10:00', setS('x', 'k1', 'p', 'P-iPad')]], [['11:00', setS('x', 'k1', 'q', 'Q-iPhone')]],
      { iPhone: r => S(r.e('x'), 'k1').p === 'P-iPad' && S(r.e('x'), 'k1').q === 'Q-iPhone' ? '' : 'ein Feld verloren (R-42)', iPad: r => S(r.e('x'), 'k1').p === 'P-iPad' && S(r.e('x'), 'k1').q === 'Q-iPhone' ? '' : 'ein Feld verloren (R-42)' });
    fall(9, 'gleiches Feld auf beiden (iPhone später)', [['10:00', setS('x', 'k1', 'p', 'iPad')]], [['11:00', setS('x', 'k1', 'p', 'iPhone')]],
      { iPhone: r => S(r.e('x'), 'k1').p === 'iPhone' ? '' : 'neuere Fassung nicht behalten', iPad: r => S(r.e('x'), 'k1').p === 'iPhone' ? '' : 'neuere Fassung nicht übernommen' });
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
    // R-41: Abfrage und Wege; R-44: ‚geändert am … · Gerät‘
    const q = sync.question(start, start, T('09:00'), 'iPhone');
    if (!/Backup vom <b>12\.10\.2026 um 09:00<\/b> \(iPhone\)/.test(q) || !/gleich alt|neuer|älter/.test(q)) errors.push('R-41 Abfrage nennt Zeitpunkt, Gerät oder neuer/älter nicht');
    if (sync.choices.map(c => `${c.label}:${c.cls || ''}`).join('|') !== 'Abgleichen:primary|Ersetzen:danger-text|Abbrechen:') errors.push('R-41/R-38 Wege nicht Abgleichen (blau) · Ersetzen (rot) · Abbrechen');
    if (!sync.changedLine(start[list][0]).includes('geändert am 12.10.2026 um 09:00 · iPad')) errors.push('R-44 Zeile ‚geändert am … · Gerät‘ fehlt');
    return errors;
  });
}
