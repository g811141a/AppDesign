// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `hinweis` (Hinweisfenster).
// Kennung, Bereich, Fabrik, Schnittstelle (eigenschaften, lesen, methoden, ereignisse) und Regeln wie in der Liste der AD-Beans (Designrichtlinie 15);
// checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben AppDesign-Version nach.
// vorfuehren(el, protokoll) baut ‚Ausprobieren‘ mit der echten Bean aus v4/ und gibt eine Abmelde-Funktion zurück.
'use strict';
katalogBean({
  kennung: 'hinweis', name: 'Hinweisfenster', bereich: 'Fenster und Meldungen', icon: 'info', seit: '4.64.0', abschnitt: '7, 10',
  satz: 'Kleines Fenster mit rundem x für eine Meldung ohne Entscheidung, z. B. nach dem Teilen. Steht ein Dateiname darin, wird das Fenster am iPad so breit, dass er in einer Zeile steht.',
  fabrik: 'createHinweis(fenster, { breiteNachDateiname })',
  eigenschaften: [['breiteNachDateiname', 'ein', 'Am iPad wächst das Fenster mit dem Dateinamen (höchstens so breit wie das breite Fenster); am iPhone ohne Wirkung.']],
  lesen: [['offen', 'Ist das Fenster offen?']],
  methoden: [['zeigen(titel, html, { breit, aktion })', 'Zeigt das Fenster; erfüllt beim Schließen. aktion = blaue Schaltfläche unter dem Text.'], ['schliessen()', 'Schließt das Fenster.']],
  ereignisse: [['zu', 'Das Fenster ist geschlossen.']],
  regeln: [['R-10.8', 'Dateiname im Hinweisfenster'], ['R-4.3', 'Abfragen und Meldungen'], ['R-1.8', 'VoiceOver']],
  verlauf: [['4.64.0', 'Neu als AD-Bean; Dateiname am iPad in einer Zeile (APD-138).']],
  anleitung: 'Einen Fall antippen – das Fenster geht auf. Mit dem Schalter ‚Breite nach Dateiname‘ siehst du den Unterschied beim langen Dateinamen.',
  vorfuehren(el, protokoll) {
    const h = adHinweis;
    const name = 'Ω Backup Reiselogbuch 2026.11.19 20.41.json';   // wie backupFileOf
    const faelle = [
      ['Kurze Meldung', () => h.zeigen('Backup', 'Das Backup wurde gesichert.')],
      ['Langer Dateiname', () => h.zeigen('Backup', `Das Backup wurde in Dateien gesichert:${fileNameHtml(name)}`)],
      ['Breites Fenster', () => h.zeigen('Abgleich', 'Ein breites Fenster für längere Texte, z. B. den Abgleichbericht mit mehreren Absätzen.', { breit: true })],
      ['Mit Schaltfläche', () => h.zeigen('Abgleich', '3 Änderungen übernommen.', { aktion: { label: 'Abgleichbericht anzeigen', icon: 'file-text', run: () => protokoll('Aktion ‚Abgleichbericht anzeigen‘') } })],
    ];
    el.innerHTML = `<div class="ilist">${faelle.map(([t], i) => `<button type="button" class="irow" data-fall="${i}"><span class="t"><b>${t}</b></span>${ic('chevron-right')}</button>`).join('')}
      <div class="swlist"><label class="check sw"><span>Breite nach Dateiname</span><input type="checkbox" switch role="switch" id="bkBreite" ${h.breiteNachDateiname ? 'checked' : ''}></label></div></div>`;
    el.querySelectorAll('[data-fall]').forEach(b => b.onclick = () => faelle[b.dataset.fall][1]());
    el.querySelector('#bkBreite').onchange = e => { h.breiteNachDateiname = e.target.checked; protokoll(`breiteNachDateiname = ${e.target.checked ? 'ein' : 'aus'}`); };
    const ab = h.on('zu', () => protokoll('zu'));
    return ab;
  },
});
