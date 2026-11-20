// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `alert` (Hinweisfenster; bis 4.66.0 `hinweis`).
// Kennung, Bereich, Anlegen, Schnittstelle (properties, readOnly, methods, events) und Regeln wie in der Liste der AD-Beans (Designrichtlinie 15);
// checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben AppDesign-Version nach.
// demo(el, log) baut ‚Ausprobieren‘ mit der echten Bean aus v4/ und gibt eine Abmelde-Funktion zurück. Felder englisch seit 4.67.0 (APD-136).
'use strict';
catalogBean({
  id: 'alert', name: 'Hinweisfenster', area: 'Fenster und Meldungen', icon: 'info', since: '4.64.0', section: '7, 10',
  abstract: 'Kleines Fenster mit rundem x für eine Meldung ohne Entscheidung, z. B. nach dem Teilen. Steht ein Dateiname darin, wird das Fenster am iPad so breit, dass er in einer Zeile steht.',
  create: 'createAlert(dialog, { fitFileName })',
  properties: [['fitFileName', 'ein', 'Am iPad wächst das Fenster mit dem Dateinamen (höchstens so breit wie das breite Fenster); am iPhone ohne Wirkung.']],
  readOnly: [['open', 'Ist das Fenster offen?']],
  methods: [['showModal(title, message, { wide, action })', 'Zeigt das Fenster; erfüllt beim Schließen. action = blaue Schaltfläche unter dem Text.'], ['close()', 'Schließt das Fenster.']],
  events: [['close', 'Das Fenster ist geschlossen.']],
  rules: [['R-10.8', 'Dateiname im Hinweisfenster'], ['R-4.3', 'Abfragen und Meldungen'], ['R-1.8', 'VoiceOver']],
  history: [['4.67.0', 'Kennung alert (ersetzt hinweis), Schnittstelle und CSS englisch nach Vorbild (APD-136); Aussehen unverändert.'],
    ['4.66.0', 'CSS nur unter der Bean (APD-136 b1); Aussehen unverändert.'], ['4.64.0', 'Neu als AD-Bean; Dateiname am iPad in einer Zeile (APD-138).']],
  howTo: 'Einen Fall antippen – das Fenster geht auf. Mit dem Schalter ‚Breite nach Dateiname‘ siehst du den Unterschied beim langen Dateinamen.',
  demo(el, log) {
    const a = adAlert;
    const name = 'Ω Backup Reiselogbuch 2026.11.19 20.41.json';   // wie backupFileOf
    const faelle = [
      ['Kurze Meldung', () => a.showModal('Backup', 'Das Backup wurde gesichert.')],
      ['Langer Dateiname', () => a.showModal('Backup', `Das Backup wurde in Dateien gesichert:${fileNameHtml(name)}`)],
      ['Breites Fenster', () => a.showModal('Abgleich', 'Ein breites Fenster für längere Texte, z. B. den Abgleichbericht mit mehreren Absätzen.', { wide: true })],
      ['Mit Schaltfläche', () => a.showModal('Abgleich', '3 Änderungen übernommen.', { action: { label: 'Abgleichbericht anzeigen', icon: 'file-text', run: () => log('Aktion ‚Abgleichbericht anzeigen‘') } })],
    ];
    el.innerHTML = `<div class="ilist">${faelle.map(([t], i) => `<button type="button" class="irow" data-fall="${i}"><span class="t"><b>${t}</b></span>${ic('chevron-right')}</button>`).join('')}
      <div class="swlist"><label class="check sw"><span>Breite nach Dateiname</span><input type="checkbox" switch role="switch" id="bkBreite" ${a.fitFileName ? 'checked' : ''}></label></div></div>`;
    el.querySelectorAll('[data-fall]').forEach(b => b.onclick = () => faelle[b.dataset.fall][1]());
    el.querySelector('#bkBreite').onchange = e => { a.fitFileName = e.target.checked; log(`fitFileName = ${e.target.checked ? 'ein' : 'aus'}`); };
    return a.on('close', () => log('close'));
  },
});
