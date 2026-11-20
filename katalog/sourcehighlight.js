// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `sourcehighlight` (Hervorgehobene Quelle, seit 4.67.0).
// Kennung, Bereich, Anlegen, Schnittstelle (properties, readOnly, methods, events) und Regeln wie in der Liste der AD-Beans (Designrichtlinie 15);
// checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben AppDesign-Version nach.
// demo(el, log) baut ‚Ausprobieren‘ mit der echten Bean aus v4/ (eine für die ganze Seite) und gibt eine Abmelde-Funktion zurück.
'use strict';
catalogBean({
  id: 'sourcehighlight', name: 'Hervorgehobene Quelle', area: 'Aktionen und Menüs', icon: 'eye', since: '4.67.0', section: '4, 15.6',
  abstract: 'Die Schaltfläche, Zeile oder Kachel, aus der ein Fenster, ein Menü, eine Sprechblase oder eine laufende Aktion kommt, bleibt blau getönt, bis es fertig ist – auch nach einem Neuaufbau und nach dem Drehen.',
  create: 'createSourcehighlight(root)',
  properties: [['sourceItem', "''", 'Quelle des offenen Fensters (CSS-Auswahl): setzen tönt sie und gibt die vorige frei, leer gibt frei.']],
  readOnly: [['heldItems', 'Die gehaltenen Quellen – laufende Aktion, offenes Menü, Untermenü, Sprechblase.']],
  methods: [['hold(item)', 'Hält eine Quelle (CSS-Auswahl oder Element) getönt.'], ['release(item)', 'Gibt sie frei – blau bleibt sie nur, wenn sie noch Quelle ist.'],
    ['refresh(root)', 'Tönt nach einem Neuaufbau in root alle Quellen wieder.']],
  events: [['change', 'Eine Quelle wird getönt oder frei – { item, highlighted }.']],
  rules: [['R-3.3', 'Gedrückt und Quelle blau'], ['R-4.13', 'Menüs und Sprechblasen wachsen aus der Schaltfläche'], ['R-8.1', 'Drehen']],
  history: [['4.67.0', 'Neu als AD-Bean (APD-136); ersetzt hold, release, setOpener, markOpener und markHeld.']],
  howTo: '‚Fenster-Quelle‘ setzen und zum zweiten Knopf wechseln · ‚Halten‘ und ‚Freigeben‘ · ‚Neu aufbauen‘ – die gehaltene Quelle bleibt blau · ‚Menü‘ öffnen – der Knopf ist blau, bis das Menü zu ist.',
  demo(el, log) {
    const s = adSourcehighlight;
    const knoepfe = () => `<div class="bk-knoepfe" id="bkQuellen"><button type="button" id="bkQ1">Erster Knopf</button> <button type="button" id="bkQ2">Zweiter Knopf</button>
      <button type="button" id="bkMenu" aria-label="Menü">${ic('ellipsis')}</button></div>`;
    el.innerHTML = `<div id="bkHost">${knoepfe()}</div><div class="ilist">${[['src1', 'Fenster-Quelle: erster Knopf'], ['src2', 'Fenster-Quelle: zweiter Knopf'], ['src0', 'Fenster-Quelle frei'],
      ['hold', 'Ersten Knopf halten'], ['release', 'Ersten Knopf freigeben'], ['neu', 'Knöpfe neu aufbauen (refresh)']]
      .map(([k, t]) => `<button type="button" class="irow" data-q="${k}"><span class="t"><b>${t}</b></span>${ic('chevron-right')}</button>`).join('')}</div>`;
    const bindMenu = () => { el.querySelector('#bkMenu').onclick = e => openMenu(e.currentTarget, [{ icon: 'info', label: 'Nur Vorführung', act: () => log('Menüpunkt gewählt') }]); };
    const tun = {
      src1: () => { s.sourceItem = '#bkQ1'; }, src2: () => { s.sourceItem = '#bkQ2'; }, src0: () => { s.sourceItem = ''; },
      hold: () => s.hold('#bkQ1'), release: () => s.release('#bkQ1'),
      neu: () => { el.querySelector('#bkHost').innerHTML = knoepfe(); bindMenu(); s.refresh(el); log('Neu aufgebaut', `gehalten: ${s.heldItems.length}`); },
    };
    el.querySelectorAll('[data-q]').forEach(b => b.onclick = () => tun[b.dataset.q]());
    bindMenu();
    const ab = s.on('change', ({ item, highlighted }) => log(`change · ${highlighted ? 'getönt' : 'frei'}`, typeof item === 'string' ? item : item?.getAttribute?.('aria-label') || item?.id || ''));
    return () => { ab(); ['#bkQ1', '#bkQ2'].forEach(x => s.release(x)); if (['#bkQ1', '#bkQ2'].includes(s.sourceItem)) s.sourceItem = ''; };
  },
});
