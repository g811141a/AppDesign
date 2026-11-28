// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `sourcehighlight` (Hervorgehobene Quelle, seit 4.67.0).
// Kennung, Bereich, Anlegen, Schnittstelle (properties, readOnly, methods, events) und Regeln wie in der Liste der AD-Beans (Designrichtlinie 15);
// checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben AppDesign-Version nach.
// demo(el, log) baut ‚Ausprobieren‘ mit der echten Bean aus v5/ (eine für die ganze Seite) und gibt eine Abmelde-Funktion zurück.
'use strict';
catalogBean({
  id: 'sourcehighlight', name: 'Hervorgehobene Quelle', area: 'Aktionen und Menüs', icon: 'eye', since: '4.67.0', section: '4, 15.6',
  abstract: 'Die Schaltfläche, Zeile oder Kachel, aus der ein Fenster, ein Menü, eine Sprechblase oder eine laufende Aktion kommt, bleibt blau getönt, bis es fertig ist – auch nach einem Neuaufbau und nach dem Drehen.',
  create: 'AD.createSourcehighlight(root)',
  properties: [['sourceItem', "''", 'Quelle des offenen Fensters (CSS-Auswahl): setzen tönt sie und gibt die vorige frei, leer gibt frei.']],
  readOnly: [['heldItems', 'Die gehaltenen Quellen – laufende Aktion, offenes Menü, Untermenü, Sprechblase.']],
  methods: [['hold(item)', 'Hält eine Quelle (CSS-Auswahl oder Element) getönt.'], ['release(item)', 'Gibt sie frei – blau bleibt sie nur, wenn sie noch Quelle ist.'],
    ['refresh(root)', 'Tönt nach einem Neuaufbau in root alle Quellen wieder.']],
  events: [['change', 'Eine Quelle wird getönt oder frei – { item, highlighted }.']],
  rules: [['R-3.3', 'Gedrückt und Quelle blau'], ['R-4.13', 'Menüs und Sprechblasen wachsen aus der Schaltfläche'], ['R-8.1', 'Drehen']],
  history: [['4.70.2', 'Nach einem Neuaufbau bei offenem Menü, Untermenü oder offener Sprechblase merkt sich die Bean den Tausch: release und hold mit dem alten Element wirken auf das neue (P-124/F-2).'],
    ['4.67.0', 'Neu als AD-Bean (APD-136); ersetzt hold, release, setOpener, markOpener und markHeld.']],
  howTo: '‚Fenster-Quelle‘ setzen und zur zweiten Schaltfläche wechseln · ‚Halten‘ und ‚Freigeben‘ · ‚Neu aufbauen‘ – die gehaltene Quelle bleibt blau · ‚Menü‘ öffnen – die Schaltfläche ist blau, bis das Menü zu ist.',
  demo(el, log) {
    const s = AD.sourcehighlight;
    const knoepfe = () => `<div class="bk-knoepfe" id="bkQuellen"><button type="button" id="bkQ1">Erste Schaltfläche</button> <button type="button" id="bkQ2">Zweite Schaltfläche</button>
      <button type="button" class="round" id="bkMenu" aria-label="Menü">${AD.ic('ellipsis')}</button></div>`;
    el.innerHTML = `<div id="bkHost">${knoepfe()}</div><div class="ilist">${[['src1', 'Fenster-Quelle: erste Schaltfläche'], ['src2', 'Fenster-Quelle: zweite Schaltfläche'], ['src0', 'Fenster-Quelle frei'],
      ['hold', 'Erste Schaltfläche halten'], ['release', 'Erste Schaltfläche freigeben'], ['neu', 'Schaltflächen neu aufbauen (refresh)']]
      .map(([k, t]) => `<button type="button" class="irow" data-q="${k}"><span class="t"><b>${t}</b></span>${AD.ic('chevron-right')}</button>`).join('')}</div>`;
    const bindMenu = () => { el.querySelector('#bkMenu').onclick = e => AD.openMenu(e.currentTarget, [{ icon: 'info', label: 'Nur Vorführung', act: () => log('Menüpunkt gewählt') }]); };
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
