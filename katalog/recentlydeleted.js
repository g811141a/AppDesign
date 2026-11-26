// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `recentlydeleted` (Zuletzt gelöscht, seit 4.71.0, RLB-126).
// Kennung, Bereich, Anlegen, Schnittstelle (properties, readOnly, methods, events) und Regeln wie in der Liste der AD-Beans (Designrichtlinie 15);
// checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben AppDesign-Version nach.
// demo(el, log) baut ‚Ausprobieren‘ mit der echten Bean aus v4/ und gibt eine Abmelde-Funktion zurück (nur Vorführung, eigene Daten im Speicher).
'use strict';
catalogBean({
  id: 'recentlydeleted', name: 'Zuletzt gelöscht', area: 'Inhalt', icon: 'trash', since: '4.71.0', section: '15.24',
  abstract: 'Gelöschte Einträge bleiben 30 Tage (je App einstellbar) unter ‚Zuletzt gelöscht‘ und lassen sich wiederherstellen – wie in Notizen. Löschen fragt nicht, nur ‚Endgültig löschen‘.',
  create: 'createRecentlydeleted(root, { data, list, field, days, nouns, label, detail, question })',
  properties: [
    ['data', 'Pflicht', 'Funktion, die die Daten der App liefert (z. B. () => db).'],
    ['list', 'Pflicht', 'Feld der zentralen Liste in den Daten (z. B. trips).'],
    ['field', "'recentlyDeleted'", 'Feld für ‚Zuletzt gelöscht‘ – je Eintrag { id, item, at, on }; kommt so ins Backup.'],
    ['days', '30', 'Frist in Kalendertagen; danach endgültig gelöscht (beim Start, um 0:00, beim Lesen).'],
    ['nouns', 'Eintrag · Einträge · Dieser Eintrag', 'Einzahl, Mehrzahl und ‚Dieser …‘ für Anzahl, Hinweis zur Frist und Hinweis über der Vorschau.'],
    ['label', 'x => x.title', 'Titel der Kachel.'], ['detail', "''", 'Zeile unter dem Titel (HTML).'],
    ['question', 'Standardtext', 'Text der Abfrage beim endgültigen Löschen (HTML).'],
  ],
  readOnly: [['items', 'Die gelöschten Einträge, zuletzt gelöschte oben, ohne Abgelaufenes.']],
  methods: [['remove(item)', 'Verschiebt einen Eintrag ohne Abfrage nach ‚Zuletzt gelöscht‘.'], ['restore(id)', 'Setzt ihn zurück in die Liste.'],
    ['purge(id)', 'Löscht endgültig (ohne Abfrage – die stellt actions()).'], ['purgeAll()', 'Löscht alle endgültig.'], ['daysLeft(id)', 'Resttage.'],
    ['entryHtml()', 'Kachel ‚Zuletzt gelöscht‘ (leer, wenn nichts gelöscht).'], ['listHtml({ current, end })', 'Kopf, Hinweis zur Frist und Kacheln.'],
    ['noticeHtml(id)', 'Hinweis über der Vorschau mit ‚Wiederherstellen‘.'], ['actions(row)', 'Einträge für Kontextmenü und Wischen.']],
  events: [['change', 'Daten geändert – die App speichert.'], ['restore', 'Wiederhergestellt – { id, item, origin }.'], ['purge', 'Endgültig gelöscht – { id }.'],
    ['open', 'Kachel ‚Zuletzt gelöscht‘ angetippt.'], ['close', '‹ angetippt.']],
  rules: [['R-7.10', 'Zuletzt gelöscht'], ['R-4.12', 'Erst fragen, dann zerstören'], ['R-7.8', 'Wischaktionen der Kacheln'], ['R-1.13', 'AD-Beans']],
  history: [['4.71.0', 'Neu (RLB-126, Nutzer 26.11.2026): Reiselogbuch 3.59.0.']],
  howTo: '‚Löschen‘ antippen – der Eintrag wandert ohne Abfrage nach ‚Zuletzt gelöscht‘ · die Kachel öffnet die Liste · lange drücken: ‚Wiederherstellen‘ · ‚Endgültig löschen‘ (fragt).',
  demo(el, log) {
    const daten = { items: [{ id: 'k1', title: 'Rom' }, { id: 'k2', title: 'Wien' }], recentlyDeleted: [], deleted: [] };
    el.innerHTML = '<div class="bk-liste" id="bkRd"></div>';
    const box = el.querySelector('#bkRd');
    const r = createRecentlydeleted(box, { data: () => daten, list: 'items', nouns: ['Eintrag', 'Einträge', 'Dieser Eintrag'] });
    let offen = false;
    const zeichne = () => {
      box.innerHTML = offen && r.items.length ? r.listHtml() : daten.items.map(x => `<div class="irow"><span class="t"><b>${esc(x.title)}</b></span><button type="button" data-del="${x.id}">${ic('trash')}Löschen</button></div>`).join('') + r.entryHtml();
      box.querySelectorAll('[data-del]').forEach(b => b.onclick = () => r.remove(daten.items.find(x => x.id === b.dataset.del)));
      box.querySelectorAll('[data-id]').forEach(b => onLongPress(b, () => openMenu(b, r.actions(b), 'beside'), () => log('Kachel angetippt', b.dataset.id)));
    };
    const ab = [r.on('change', () => { log('change'); zeichne(); }), r.on('open', () => { offen = true; zeichne(); }), r.on('close', () => { offen = false; zeichne(); }),
      r.on('restore', ({ id }) => log(`restore – ${id}`)), r.on('purge', ({ id }) => log(`purge – ${id}`))];
    zeichne();
    return () => ab.forEach(f => f());
  },
});
