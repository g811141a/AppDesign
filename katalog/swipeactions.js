// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `swipeactions` (Wischaktionen).
// Kennung, Bereich, Fabrik, Schnittstelle (eigenschaften, lesen, methoden, ereignisse) und Regeln wie in der Liste der AD-Beans (Designrichtlinie 15);
// checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben AppDesign-Version nach.
// vorfuehren(el, protokoll) baut ‚Ausprobieren‘ mit der echten Bean aus v4/ und gibt eine Abmelde-Funktion zurück.
'use strict';
katalogBean({
  kennung: 'swipeactions', name: 'Wischaktionen', bereich: 'Aktionen und Menüs', icon: 'hand', seit: '4.60.0', abschnitt: '15.4',
  satz: 'Wischen nach links auf einer Kachel zeigt rechts neben ihr die Aktionen ihres Kontextmenüs als Kapseln – wie in Notizen. Gelöscht wird nur über die rote Kapsel, sie fragt vorher.',
  fabrik: 'createSwipeactions(liste, { kacheln, aktionen })',
  eigenschaften: [
    ['kacheln', 'Pflicht', 'Welche Elemente der Liste Kacheln sind (CSS-Auswahl, z. B. [data-id]).'],
    ['aktionen', 'Pflicht', 'Funktion: Kachel → Einträge wie im Kontextmenü, je Eintrag mit kurz (Wort unter der Kapsel).'],
  ],
  lesen: [['offen', 'Die offene Kachel oder null.'], ['masse', 'Kapsel 66 × 44, Abstand 11 pt, offen ab halber Breite, Widerstand höchstens 60 px.']],
  methoden: [['schliessen()', 'Schließt die offene Kachel (z. B. beim Ausblenden der Seitenleiste).'], ['entfernen()', 'Meldet die Liste ab.']],
  ereignisse: [['offen', 'Eine Kachel ist offen.'], ['zu', 'Die Kachel ist wieder zu.']],
  regeln: [['R-7.8', 'Wischaktionen der Kacheln'], ['R-4.12', 'Erst fragen, dann zerstören'], ['R-4.13', 'Menüs und Sprechblasen wachsen aus der Schaltfläche'],
    ['R-1.4', 'Nur der Vordergrund reagiert'], ['R-1.8', 'VoiceOver']],
  verlauf: [['4.60.3', 'Weich wie Notizen: Kapseln wachsen mit eigener Zeit (P-109).'], ['4.60.2', 'Ein Abstand für alles: 11 pt; kein Durchwischen (P-108).'],
    ['4.60.1', 'Kapseln wachsen mit der Textgröße (P-107).'], ['4.60.0', 'Neu – die erste AD-Bean (APD-30).']],
  anleitung: 'Eine Kachel nach links wischen · ‚Löschen‘ antippen – die Sprechblase fragt · lange drücken zeigt dieselben Aktionen als Kontextmenü · die dritte Kachel hat keine Aktionen.',
  vorfuehren(el, protokoll) {
    el.innerHTML = `<div class="bk-liste" id="bkListe">${[['k1', 'Erster Eintrag: Rom, Florenz, Siena und Lucca', '12 Unterpunkte'], ['k2', 'Zweiter Eintrag mit einem langen Titel, der umbricht', '3 Unterpunkte'], ['k3', 'Ohne Aktionen', 'lässt sich nicht wischen']]
      .map(([id, t, s]) => `<button type="button" class="bk-kachel" data-k="${id}"><span class="t"><b>${t}</b><small>${s}</small></span>${ic('chevron-right')}</button>`).join('')}</div>`;
    const liste = el.querySelector('#bkListe');
    const aktionen = k => k.dataset.k === 'k3' ? [] : [
      { icon: 'settings', label: 'Einstellungen', kurz: 'Einstellen', act: () => protokoll('Aktion ‚Einstellen‘') },
      'sep',
      { icon: 'trash', label: `‚${k.querySelector('b').textContent}‘ löschen`, kurz: 'Löschen', red: true,
        act: async ({ anker } = {}) => { const ja = await confirmPop(anker || k, `‚${esc(k.querySelector('b').textContent)}‘ löschen? (nur Vorführung – nichts wird gelöscht)`, { label: 'Löschen', icon: 'trash' });
          protokoll(ja ? 'Aktion ‚Löschen‘ bestätigt' : '‚Löschen‘ abgebrochen'); } },
    ];
    const w = createSwipeactions(liste, { kacheln: '[data-k]', aktionen });
    w.on('offen', k => protokoll('offen', k.querySelector('b').textContent));
    w.on('zu', k => protokoll('zu', k.querySelector('b').textContent));
    liste.querySelectorAll('[data-k]').forEach(k => onLongPress(k, () => {
      const e = aktionen(k); if (!e.length) return;
      k.classList.add('on');
      openMenu(k, e, 'beside');
      const fertig = () => { if (!document.querySelector('.menu')) { k.classList.remove('on'); } else setTimeout(fertig, 120); };
      setTimeout(fertig, 300);
    }, () => protokoll('Kachel angetippt', k.querySelector('b').textContent)));
    return () => w.entfernen();
  },
});
