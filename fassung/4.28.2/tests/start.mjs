// AppDesign 4.16.0 · Prüfung ‚Start‘ (Regel R-7.2, seit 4.16.0, A-09 aus Reiselogbuch T-84).
// Nach jedem Neuladen zeigt der iPhone-Aufbau (html.phone – iPhone hoch und quer, auch iPad im schmalen Fenster) die
// Startliste: die Seitenleiste als ganze Seite (#side.page), ganz oben, ohne blauen Eintrag (nichts ist geöffnet, HIG 4),
// kein Inhalt daneben. Der iPad-Aufbau öffnet wie bisher den aktuellen Eintrag: Seitenleiste sichtbar, genau ein Eintrag
// blau. Rückkehr aus dem Hintergrund ohne Neuladen (visibilitychange, pageshow aus dem Zwischenspeicher) ändert nichts.
// Einbinden im Prüfskript der App (die Seite ist gerade neu geladen):
//   import { checkStart, checkRueckkehr } from '../../AppDesign/fassung/X.Y.Z/tests/start.mjs';
//   t.liste(await checkStart(p, { inhalt: '.pnav-title', leer: false }));   // inhalt: Merkmal eines geöffneten Eintrags
//   t.liste(await checkRueckkehr(p));                                        // Zustand vorher = Zustand nachher

const zustand = p => p.evaluate(() => {
  const side = document.getElementById('side'), r = side?.getBoundingClientRect();
  return {
    phone: document.documentElement.classList.contains('phone'),
    seite: !!side && !side.hidden && side.classList.contains('page'),
    sichtbar: !!side && !side.hidden && r.width > 0 && r.height > 0,
    blau: [...document.querySelectorAll('#side .side-row.current')].map(e => e.dataset.id),
    eintraege: document.querySelectorAll('#side .side-row').length,
    oben: Math.round(scrollY + (document.querySelector('#app > .rolle')?.scrollTop || 0) + (document.querySelector('#side .side-list')?.scrollTop || 0)),
  };
});

export async function checkStart(p, { inhalt, leer = false } = {}) {
  const errors = [], E = t => errors.push(`R-7.2 ${t}`);
  const z = await zustand(p);
  const offen = inhalt ? await p.locator(inhalt).first().isVisible().catch(() => false) : false;
  if (z.phone) {
    if (!z.seite) E('iPhone-Aufbau: nach dem Neuladen nicht in der Startliste (#side.page fehlt)');
    if (offen) E(`iPhone-Aufbau: nach dem Neuladen ist ein Eintrag geöffnet (${inhalt} sichtbar)`);
    if (z.blau.length) E(`iPhone-Aufbau: in der Startliste ist ein Eintrag blau (${z.blau.join(', ')}) – beim Start ist nichts geöffnet`);
    if (z.oben !== 0) E(`iPhone-Aufbau: Startliste nicht ganz oben (${z.oben} px gescrollt)`);
  } else {
    if (!z.sichtbar || z.seite) E('iPad-Aufbau: Seitenleiste nach dem Start nicht eingeblendet');
    if (!leer && z.blau.length !== 1) E(`iPad-Aufbau: nach dem Start ${z.blau.length} Einträge blau statt des geöffneten`);
    if (!leer && inhalt && !offen) E(`iPad-Aufbau: nach dem Start kein Eintrag geöffnet (${inhalt} fehlt)`);
  }
  return errors;
}

// Rückkehr aus dem Hintergrund ohne Neuladen: Safari meldet nur visibilitychange und pageshow (persisted) – nichts ändert sich.
export async function checkRueckkehr(p) {
  const errors = [];
  const vorher = await zustand(p);
  await p.evaluate(() => {
    const sichtbar = v => { Object.defineProperty(document, 'visibilityState', { value: v, configurable: true }); Object.defineProperty(document, 'hidden', { value: v === 'hidden', configurable: true }); document.dispatchEvent(new Event('visibilitychange')); };
    sichtbar('hidden'); window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
    sichtbar('visible'); window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  await p.waitForTimeout(300);
  const nachher = await zustand(p);
  if (JSON.stringify(vorher) !== JSON.stringify(nachher)) errors.push(`R-7.2 Rückkehr aus dem Hintergrund ändert die Ansicht – vorher ${JSON.stringify(vorher)}, nachher ${JSON.stringify(nachher)}`);
  return errors;
}
