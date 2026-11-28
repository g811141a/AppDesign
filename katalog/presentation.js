// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `presentation` (Stapel, seit 5.0.0, APD-149; bis dahin Muster als Entwurf
// katalog/entwurf/presentation-commands.js). Kennung, Bereich, Anlegen, Schnittstelle (properties, readOnly, methods, events) und Regeln wie in der
// Liste der AD-Beans (Designrichtlinie 15); checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben
// AppDesign-Version nach. demo(el, log) baut ‚Ausprobieren‘ mit den echten Beans aus v5/ (AD.presentation und AD.createCommands) und gibt eine
// Abmelde-Funktion zurück; dieselbe Vorführung zeigt die Bean commands (katalog/commands.js). Prüfung: tests/presentation.mjs (APD-149/S-1 bis S-18,
// L-1 bis L-4) gegen katalog/index.html#presentation.
'use strict';
// Vorführung für beide Beans: Kopfzeile aus Befehlen (+, Ausgabe, Mehr mit Untermenü), Fenster, Hinweisfenster, Teilen, Kacheln wie ‚Zuletzt gelöscht‘
// (RLB-126) mit Kontextmenü und Wischen. Die Prüfung erreicht die Befehle über window.__catalogCommands.
function presentationDemo(el, log) {
  const p = AD.presentation, ctx = { selection: true, view: 'compact', locked: false };
  const c = window.__catalogCommands = AD.createCommands({ presentation: p, context: ctx });
  const sheet = (title, withWays, source = {}, long = false) => {
    // long: Inhalt höher als der Bildschirm – er rollt, der Fensterkopf steht still
    const places = long ? Array.from({ length: 14 }, (_, i) => `<div class="step"><label for="adOrt${i + 1}">Ort ${i + 1}</label><input type="text" id="adOrt${i + 1}" value="Station ${i + 1}" autocapitalize="sentences"></div>`).join('') : '';
    const html = `<form method="dialog">${AD.dlgHead(title)}<div class="dlg-body">
      <div class="step"><label for="adTitel">Titel</label><input type="text" id="adTitel" value="Rom" autocapitalize="sentences"></div>${places}
      ${withWays ? `<div class="ilist">${[['adHinweis', 'Hinweisfenster über dem Fenster'], ['adZwei', 'Zwei Hinweisfenster nacheinander'], ['adAnderes', 'Anderes Fenster öffnen'], ['adLang', 'Fenster mit langem Inhalt']]
        .map(([id, t]) => `<button type="button" class="irow" id="${id}"><span class="t"><b>${t}</b></span>${AD.ic('chevron-right')}</button>`).join('')}</div>` : ''}</div></form>`;
    const dirty = () => (AD.dlg.querySelector('#adTitel')?.value ?? 'Rom') !== 'Rom';
    const h = p.present('sheet', html, { command: withWays ? 'entry.edit' : 'entry.add', ...source, dirty,
      shouldDismiss: () => !dirty() || p.present('popover', { message: 'Die Änderungen in diesem Fenster gehen verloren.',
        buttons: [{ label: 'Änderungen verwerfen', cls: 'danger', value: true }, { label: 'Weiter bearbeiten', value: false }] }, { sourceItem: AD.dlg.querySelector('#dlgX') }).result.then(v => v === true) });
    h.on('dismiss', e => log(`Fenster ‚${title}‘ zu`, e.reason));
    const notice = (t, s) => p.present('alert', { title: t, message: s }, { sourceItem: AD.dlg.querySelector('#adHinweis') });
    AD.dlg.querySelector('#adHinweis')?.addEventListener('click', () => notice('Hinweis', 'Das Hinweisfenster liegt über dem Fenster.'));
    AD.dlg.querySelector('#adZwei')?.addEventListener('click', () => { notice('Erster Hinweis', 'Der zweite kommt, wenn dieser zu ist (H-4).'); notice('Zweiter Hinweis', 'Jetzt der zweite.'); });
    AD.dlg.querySelector('#adAnderes')?.addEventListener('click', () => sheet('Anderes Fenster', false, { from: h }));   // H-3: das alte schließt zuerst
    AD.dlg.querySelector('#adLang')?.addEventListener('click', () => sheet('Langes Fenster', false, { from: h }, true));
  };
  const share = () => {
    const name = 'Vorführung Bean-Katalog.txt';
    const h = p.present('activity', () => AD.shareFiles([{ name, content: 'Nur Vorführung.', type: 'txt' }]), { command: 'output.share' });
    if (!h) { log('Teilen abgelehnt', 'es läuft schon eins (H-8)'); return; }
    log('Teilen läuft');
    h.result.then(r => p.present('alert', { title: 'Teilen', message: AD.shareResultText(r, name) }, { from: h }));
  };
  c.add({ id: 'entry.add', label: 'Neuer Eintrag', icon: 'plus', execute: () => sheet('Neuer Eintrag', false) })
    .add({ id: 'output.share', label: 'Teilen', icon: 'share', execute: share })
    .add({ id: 'output.print', label: 'Drucken', icon: 'file-text', execute: () => p.present('alert', { title: 'Drucken', message: 'Nur Vorführung – gedruckt wird nichts.' }) })
    .add({ id: 'entry.edit', label: 'Bearbeiten', icon: 'pencil', execute: () => sheet('Eintrag bearbeiten', true) })
    .add({ id: 'entry.info', label: 'Info', icon: 'info', execute: () => p.present('alert', { title: 'Info', message: 'Das Hinweisfenster hält die Schaltfläche des Menüs, bis es zu ist.' }) })
    .add({ id: 'view.compact', label: 'Kompakt', validate: x => ({ state: x.view === 'compact' ? 'on' : 'off' }), execute: x => { x.view = 'compact'; c.revalidate(); log('Ansicht kompakt'); } })
    .add({ id: 'view.large', label: 'Groß', validate: x => ({ state: x.view === 'large' ? 'on' : 'off' }), execute: x => { x.view = 'large'; c.revalidate(); log('Ansicht groß'); } })
    .add({ id: 'entry.delete', label: 'Eintrag löschen', shortTitle: 'Löschen', icon: 'trash', role: 'destructive', validate: x => ({ enabled: x.selection }),
      execute: () => p.present('popover', { message: 'Eintrag löschen? (nur Vorführung)', buttons: [{ label: 'Löschen', cls: 'danger', value: true }, { label: 'Abbrechen', value: false }] })
        .result.then(v => log(v ? '‚Löschen‘ bestätigt' : '‚Löschen‘ abgebrochen')) })
    .menu('output', [['output.share', 'output.print']], { label: 'Ausgabe', icon: 'share' })
    .menu('more', [['entry.edit', 'entry.info'], { title: 'Ansicht', icon: 'eye', children: ['view.compact', 'view.large'], singleSelection: true }, ['entry.delete']], { label: 'Mehr', icon: 'ellipsis' });
  // Listen-Ebene wie ‚Zuletzt gelöscht‘ (RLB-126): Wiederherstellen und Endgültig löschen im Kontextmenü und beim Wischen (H-7)
  const rows = [{ id: 'z1', title: 'Rom 2025', sub: 'Gelöscht am 20.11.2026 · noch 23 Tage' }, { id: 'z2', title: 'Wien 2024 (gesperrt)', sub: 'Endgültig löschen gesperrt', locked: true }];
  let row = null;
  c.add({ id: 'row.restore', label: 'Wiederherstellen', shortTitle: 'Zurück', icon: 'rotate-ccw', execute: () => log('Wiederherstellen', row?.title) })
    .add({ id: 'row.purge', label: 'Endgültig löschen', shortTitle: 'Löschen', icon: 'trash', role: 'destructive', validate: x => ({ enabled: !x.row?.locked && x.selection }),
      execute: x => p.present('popover', { message: `‚${AD.esc(row?.title || '')}‘ endgültig löschen? Das lässt sich nicht widerrufen.`, buttons: [{ label: 'Endgültig löschen', cls: 'danger', value: true }, { label: 'Abbrechen', value: false }] }, { sourceItem: x.sourceView })
        .result.then(v => log(v ? '‚Endgültig löschen‘ bestätigt' : '‚Endgültig löschen‘ abgebrochen', row?.title)) })
    .menu('row', [['row.restore'], ['row.purge']]);
  const rowCtx = k => { row = rows.find(z => z.id === k.dataset.id); return { ...ctx, row }; };
  el.innerHTML = `<div id="adLeiste"></div>
    <div class="ilist"><div class="swlist"><label class="check sw"><span>Eintrag ausgewählt</span><input type="checkbox" switch role="switch" id="adAuswahl" checked></label></div>
      <div class="swlist"><label class="check sw"><span>Kopfzeile alle 2 s neu aufbauen</span><input type="checkbox" switch role="switch" id="adNeu"></label></div>
      <div class="irow bk-zeile"><span class="t"><b>Stapel</b><small id="adStapel">leer</small></span></div></div>
    <div class="bk-liste" id="adListe">${rows.map(z => `<button type="button" class="bk-kachel" data-id="${z.id}"><span class="t"><b>${AD.esc(z.title)}</b><small>${AD.esc(z.sub)}</small></span>${AD.ic('chevron-right')}</button>`).join('')}</div>`;
  const bar = el.querySelector('#adLeiste');
  const barOff = c.toolbar(bar, ['entry.add', 'output', 'more'], { label: 'Kopfzeile (Vorführung)' });
  el.querySelector('#adAuswahl').onchange = e => { ctx.selection = e.target.checked; c.revalidate(); log(`Auswahl ${ctx.selection ? 'ja' : 'nein'}`, 'revalidate'); };
  let timer = null;
  el.querySelector('#adNeu').onchange = e => { clearInterval(timer); timer = e.target.checked ? setInterval(() => c.revalidate(), 2000) : null; };
  const list = el.querySelector('#adListe');
  const swipe = AD.createSwipeactions(list, { rows: '[data-id]', actions: k => c.items('row', { place: 'swipe', ctx: rowCtx(k) }) });
  list.querySelectorAll('[data-id]').forEach(k => AD.onLongPress(k, () => {
    const items = c.items('row', { place: 'context', ctx: rowCtx(k) });
    if (items.length) p.present('menu', items, { sourceItem: k, align: 'beside' });
  }, () => log('Kachel angetippt', k.querySelector('b').textContent)));
  const stackText = el.querySelector('#adStapel');
  const off = [p.on('change', ({ stack }) => { stackText.textContent = stack.length ? stack.join(' › ') : 'leer'; log('Stapel', stack.join(' › ') || 'leer'); }),
    p.on('reject', ({ kind }) => log('abgelehnt', kind)), c.on('execute', ({ id }) => log('execute', id))];
  return () => { clearInterval(timer); off.forEach(f => f()); barOff(); swipe.disconnect(); [...p.stack].reverse().forEach(h => p.dismiss(h)); };
}
catalogBean({
  id: 'presentation', name: 'Stapel', area: 'Dienste', icon: 'list-chevrons-up-down', since: '5.0.0', section: '15.6, 15.7, 15.9',
  abstract: 'Alles, was erscheint und wieder geht – Fenster, Hinweisfenster, Menü, Untermenü, Sprechblase, laufende Aktion – liegt auf einem Stapel. Tönung der Quelle, aria-expanded, Sperre, Escape, Fokus und Lage folgen aus ihm, auch nach einem Neuaufbau.',
  create: 'AD.createPresentation(root)',
  properties: [],
  readOnly: [['stack', 'Die offenen Einträge von unten nach oben (Griffe).'], ['top', 'Der oberste Eintrag oder null.']],
  methods: [['present(kind, content, { command, sourceItem, from, shouldDismiss, dirty, align })', 'Zeigt sheet, alert, menu, submenu, popover oder activity; gibt einen Griff { kind, command, open, result, dismiss(), on(\'dismiss\') } zurück. Die Quelle kommt über data-command bzw. sourceItem.'],
    ['dismiss(handle, { reason })', 'Schließt den Eintrag (ohne Griff: den obersten); reason user | app | replaced | parent.'], ['refresh()', 'Leitet Tönung, aria-expanded, Sperre und Lage neu ab (nach einem Neuaufbau geschieht es von selbst).']],
  events: [['change', 'Der Stapel hat sich geändert – { stack }.'], ['reject', 'Eine zweite laufende Aktion wurde abgelehnt (H-8) – { kind, command }.']],
  rules: [['R-1.4', 'Nur der Vordergrund reagiert'], ['R-1.8', 'VoiceOver'], ['R-3.3', 'Jede Farbe hat eine Bedeutung'], ['R-4.1', 'Menüs'], ['R-4.9', 'Menümaße'],
    ['R-4.13', 'Menüs und Sprechblasen wachsen aus der Schaltfläche'], ['R-7.3', 'Liste steht still'], ['R-8.1', 'Drehen ändert nur die Anordnung'], ['R-1.13', 'AD-Beans']],
  history: [['5.0.0', 'Neu als AD-Bean in ui.js (APD-149): Grobentwurf V-3 mit H-1 bis H-9, Durchlass in der Kopfzeile (J-3, R-1.4); navPush und navPop leeren vorher den Stapel (J-7). Vorher Muster im Bean-Katalog als Entwurf (Sitzungen AppDesign 0002 bis 0006).']],
  howTo: '‚Mehr‘ öffnen und gleich auf ‚Ausgabe‘ oder ‚+‘ tippen – ein Tipp genügt · Ansicht im Untermenü · ‚Bearbeiten‘: Fenster, darin Hinweis, zwei Hinweise, anderes Fenster, langes Fenster · Titel ändern und nach unten ziehen oder Escape – es fragt; neben das Fenster tippen schließt nicht · ‚Ausgabe › Teilen‘ · Kachel lange drücken oder wischen · Schalter ‚Eintrag ausgewählt‘ aus: Löschen gedimmt bzw. weg.',
  demo: (el, log) => presentationDemo(el, log),
});
