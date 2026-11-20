// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `swipeactions` (Wischaktionen).
// Kennung, Bereich, Anlegen, Schnittstelle (properties, readOnly, methods, events) und Regeln wie in der Liste der AD-Beans (Designrichtlinie 15);
// checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben AppDesign-Version nach.
// demo(el, log) baut ‚Ausprobieren‘ mit der echten Bean aus v4/ und gibt eine Abmelde-Funktion zurück. Felder englisch seit 4.67.0 (APD-136).
'use strict';
catalogBean({
  id: 'swipeactions', name: 'Wischaktionen', area: 'Aktionen und Menüs', icon: 'hand', since: '4.60.0', section: '15.4',
  abstract: 'Wischen nach links auf einer Kachel zeigt rechts neben ihr die Aktionen ihres Kontextmenüs als Kapseln – wie in Notizen. Gelöscht wird nur über die rote Kapsel, sie fragt vorher.',
  create: 'createSwipeactions(list, { rows, actions })',
  properties: [
    ['rows', 'Pflicht', 'Welche Elemente der Liste Kacheln sind (CSS-Auswahl, z. B. [data-id]).'],
    ['actions', 'Pflicht', 'Funktion: Kachel → Einträge wie im Kontextmenü, je Eintrag mit shortTitle (Wort unter der Kapsel); act bekommt { sourceView } (die Kapsel).'],
  ],
  readOnly: [['openRow', 'Die offene Kachel oder null.'], ['metrics', 'Kapsel 66 × 44, Abstand 11 pt, offen ab halber Breite, Widerstand höchstens 60 px.']],
  methods: [['close()', 'Schließt die offene Kachel (z. B. beim Ausblenden der Seitenleiste).'], ['disconnect()', 'Meldet die Liste ab.']],
  events: [['toggle', 'Eine Kachel geht auf oder zu – { row, newState: open | closed }.']],
  rules: [['R-7.8', 'Wischaktionen der Kacheln'], ['R-4.12', 'Erst fragen, dann zerstören'], ['R-4.13', 'Menüs und Sprechblasen wachsen aus der Schaltfläche'],
    ['R-1.4', 'Nur der Vordergrund reagiert'], ['R-1.8', 'VoiceOver']],
  history: [['4.67.0', 'Schnittstelle englisch nach Vorbild (rows, shortTitle, sourceView, toggle, disconnect; APD-136); Verhalten unverändert.'],
    ['4.60.3', 'Weich wie Notizen: Kapseln wachsen mit eigener Zeit (P-109).'], ['4.60.2', 'Ein Abstand für alles: 11 pt; kein Durchwischen (P-108).'],
    ['4.60.1', 'Kapseln wachsen mit der Textgröße (P-107).'], ['4.60.0', 'Neu – die erste AD-Bean (APD-30).']],
  howTo: 'Eine Kachel nach links wischen · ‚Löschen‘ antippen – die Sprechblase fragt · lange drücken zeigt dieselben Aktionen als Kontextmenü · die dritte Kachel hat keine Aktionen.',
  demo(el, log) {
    el.innerHTML = `<div class="bk-liste" id="bkListe">${[['k1', 'Erster Eintrag: Rom, Florenz, Siena und Lucca', '12 Unterpunkte'], ['k2', 'Zweiter Eintrag mit einem langen Titel, der umbricht', '3 Unterpunkte'], ['k3', 'Ohne Aktionen', 'lässt sich nicht wischen']]
      .map(([id, t, s]) => `<button type="button" class="bk-kachel" data-k="${id}"><span class="t"><b>${t}</b><small>${s}</small></span>${ic('chevron-right')}</button>`).join('')}</div>`;
    const list = el.querySelector('#bkListe');
    const actions = k => k.dataset.k === 'k3' ? [] : [
      { icon: 'settings', label: 'Einstellungen', shortTitle: 'Einstellen', act: () => log('Aktion ‚Einstellen‘') },
      'sep',
      { icon: 'trash', label: `‚${k.querySelector('b').textContent}‘ löschen`, shortTitle: 'Löschen', red: true,
        act: async ({ sourceView } = {}) => { const ja = await confirmPop(sourceView || k, `‚${esc(k.querySelector('b').textContent)}‘ löschen? (nur Vorführung – nichts wird gelöscht)`, { label: 'Löschen', icon: 'trash' });
          log(ja ? 'Aktion ‚Löschen‘ bestätigt' : '‚Löschen‘ abgebrochen'); } },
    ];
    const w = createSwipeactions(list, { rows: '[data-k]', actions });
    w.on('toggle', ({ row, newState }) => log(`toggle · ${newState}`, row.querySelector('b').textContent));
    list.querySelectorAll('[data-k]').forEach(k => onLongPress(k, () => {
      const e = actions(k); if (!e.length) return;
      openMenu(k, e, 'beside');
    }, () => log('Kachel angetippt', k.querySelector('b').textContent)));
    return () => w.disconnect();
  },
});
