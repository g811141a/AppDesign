// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `notice` (Hinweis-Kasten, seit 4.70.0, P-122/F-2, R-3.10).
// Kennung, Bereich, Anlegen, Schnittstelle (properties, readOnly, methods, events) und Regeln wie in der Liste der AD-Beans (Designrichtlinie 15);
// checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben AppDesign-Version nach.
// demo(el, log) baut ‚Ausprobieren‘ mit der echten Bean aus v5/ und gibt eine Abmelde-Funktion zurück.
'use strict';
catalogBean({
  id: 'notice', name: 'Hinweis-Kasten', area: 'Fenster und Meldungen', icon: 'info', since: '4.70.0', section: '4, 7',
  abstract: 'Kasten für ein Ergebnis oder eine Erinnerung im Fenster oder im Hinweisfenster: Text, darunter grau ein Detail, darunter Schaltflächen – alles mittig.',
  create: 'AD.createNotice(element, { message, detail, buttons })',
  properties: [['message', "''", 'Text des Kastens (HTML); setzen baut den Kasten neu auf.'], ['detail', "''", 'Grauer Text darunter (HTML), leer = keiner.'],
    ['buttons', '[]', 'Schaltflächen darunter, mittig – je { id, label, icon, primary }.']],
  readOnly: [],
  methods: [['remove()', 'Entfernt den Kasten.']],
  events: [['action', 'Eine Schaltfläche wurde angetippt – { id }.']],
  rules: [['R-3.10', 'Hinweise mittig'], ['R-1.13', 'AD-Beans']],
  history: [['4.70.0', 'Neu als AD-Bean (P-122/F-2, Nutzer 22.11.2026); Ergebnis und Backup-Erinnerung im Fenster und im Hinweisfenster.']],
  howTo: 'Einen Fall antippen – der Kasten zeigt ihn. ‚Mit Schaltfläche‘: antippen meldet action.',
  demo(el, log) {
    el.innerHTML = `<div class="step" id="bkNotice"></div><div class="ilist">${[['nur', 'Nur Text'], ['detail', 'Mit Detail'], ['knopf', 'Mit Schaltfläche']]
      .map(([k, t]) => `<button type="button" class="irow" data-n="${k}"><span class="t"><b>${t}</b></span>${AD.ic('chevron-right')}</button>`).join('')}</div>`;
    const n = AD.createNotice(el.querySelector('#bkNotice'), { message: '✅ Teilen-Menü abgeschlossen.' });
    const faelle = {
      nur: () => { n.buttons = []; n.detail = ''; n.message = '✅ Teilen-Menü abgeschlossen.'; },
      detail: () => { n.buttons = []; n.message = '<strong>💾 Denk daran, auch ein Backup zu erstellen.</strong>'; n.detail = 'Letztes Backup erstellt am 19.11.2026.'; },
      knopf: () => { n.message = '<strong>💾 Denk daran, auch ein Backup zu erstellen.</strong>'; n.detail = 'Letztes Backup erstellt am 19.11.2026.';
        n.buttons = [{ id: 'bkNow', label: 'Backup erstellen', icon: 'save', primary: true }]; },
    };
    el.querySelectorAll('[data-n]').forEach(b => b.onclick = () => faelle[b.dataset.n]());
    return n.on('action', ({ id }) => log(`action – ${id}`));
  },
});
