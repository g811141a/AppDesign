// AppDesign · Safari-Modell (Zusammenarbeit 0 Nr. 20, A-27): das eine Modell, nach dem alle Prüfungen Safari am iPhone
// nachbilden. Jede Abweichung vom Gerät wird hier korrigiert, nie nur in einer Prüfung. Grundlage ist die Messung P-57
// (arbeit/A-27 Auswertung P-57.md, iOS 26.6.2, Home-Bildschirm); jede Eigenheit steht mit Abschnitt dabei.
// Einbinden im Prüfskript der App (nach dem Laden der Seite; neu laden entfernt das Modell):
//   import { safariModell } from '../../AppDesign/tests/safari.mjs';
//   await safariModell(p, 'iPhone hoch');                  // Modell in die Seite setzen (Tastatur zu)
//   await p.evaluate(() => __safari.tastatur(true));        // Tastatur auf (z. B. nach dem Antippen der Lupe)
//   await p.evaluate(() => __safari.bilder(true));          // ab jetzt je Bild die Lage der festen Leisten auf dem Bildschirm
//   const r = await p.evaluate(() => __safari.bilder(false)); // [{ t, sy, vt, ...lage }] aufgezeichnete Bilder
//
// Das Modell (Chromium kennt nur einen Bereich; Safari hat zwei):
// - Layout-Bereich (L, Höhe innerHeight): an ihm hängen feste Leisten (position: fixed). Sichtbarer Bereich (V, Höhe
//   visualViewport.height): das, was der Bildschirm zeigt; scrollY ist seine Lage. In der Prüfung ist Chromiums Rollstand V.
// - Tastatur offen (A-27 2, 3): sichtbare Höhe 409 statt 812 (hoch, 403 px Tastatur) bzw. 126 statt 402 (quer, 276 px).
// - Rollt die App (scrollTo) oder Safari, bewegt sich zuerst nur V innerhalb von L; L folgt erst, wenn V an seinen Rand stößt.
//   offsetTop = V − L. Gemessen (A-27 2): 110 → 230 ergibt offsetTop 120 (L bleibt 110), 230 → 109 ergibt 0 (L folgt auf 109).
// - Feste Leisten stehen auf dem Bildschirm bei ihrer Lage im Layout-Bereich minus offsetTop, sofort im selben Bild.
//   getBoundingClientRect misst in Safari gegen den sichtbaren Bereich (Kopfzeile −120 bei scrollY 230, --vv-top 0).
// - Safari meldet eine neue Lage (visualViewport.offsetTop, height, Ereignisse scroll/resize) erst 2 Bilder (33 ms) später
//   (A-27 2: 35858 → 35891). Bis dahin liefert visualViewport die alten Werte.
// - Antippen einer Schaltfläche (z. B. ⓧ) nimmt dem Feld mit Fokus den Fokus; Chromium behält ihn (A-27 2: neuer Fokus nach ⓧ).
// - Neuer Fokus bei offener Tastatur (Feld hatte den Fokus verloren, z. B. nach ⓧ): hoch rollt Safari die Seite von selbst um
//   120 px nach oben (A-27 2: 230 → 110, offsetTop 0); quer schiebt Safari den sichtbaren Bereich um 21 px (A-27 3), ebenso beim
//   Öffnen der Tastatur quer.
// - Nicht nachgebildet: die versetzte Lage fester Leisten in der Zeile eines scroll-Ereignisses (Messartefakt, A-27 5);
//   innerHeight schrumpft quer je Fokus um 19 px (A-27 3, Chromium kann innerHeight nicht ohne neue Seitengröße ändern);
//   iPad (offsetTop bleibt immer 0, A-27 4 – dort das Modell nicht einsetzen).
// Seit 4.28.0 (A-35, Messung tests/messungen/2026-10-19 iPhone quer Suche Fenster Gesamtausgaben.txt, Zeilen 404–408):
// - Feld mit Ziffern (inputmode decimal/numeric) quer: die Zifferntastatur lässt 170 statt 126 px sichtbar (Tastatur 232 px).
// - Antippen eines Felds im Rollbereich, das unter der Tastatur läge: Safari verschiebt den sichtbaren Bereich um den ganzen Raum
//   (offsetTop 232 = 402 − 170, die Seite selbst rollt nicht) – das Feld bleibt dabei, wo es im Rahmen steht, also unter der
//   Tastatur, bis die App den Inhalt rollt. Felder in Fenstern: nicht nachgebildet (gemessen 225 bei 276 px Raum, Regel unklar).
// - spieleAb (tests/abspielen.mjs, A-31) setzt sichtbare Höhe und offsetTop aus einer Messdatei: __safari.setze({ h, top }).
// Seit 4.28.1 (A-36, Fall-Liste arbeit/A-36 Fall-Liste.md S-1 bis S-4; Messungen 2026-10-20 iPhone hoch und iPad quer, Fenster ‚Ort‘):
// - S-1 Jedes Feld mit Fokus unter der künftigen Tastatur – im Inhalt und in Fenstern – verschiebt den sichtbaren Bereich, bis das
//   Feld in seiner Mitte steht, höchstens um den ganzen Raum (gemessen 403 hoch, 428 iPad quer, 232 quer im Inhalt, 225 von 276 quer
//   im Fenster; ‚bis zur Mitte‘ passt zu allen vier, ‚so weit wie nötig‘ ergäbe hoch nur 291). Ein Feld darüber verschiebt nichts.
//   Feste Leisten stehen dann auf dem Bildschirm um diesen Betrag zu hoch, bis die App die Meldung (2 Bilder später) ausgleicht.
// - S-2 iPad quer: Tastatur 428 px (sichtbar 374 von 802). iPad hoch nicht gemessen (dort lag das Feld über der Tastatur).
// - S-3 Safari rollt dabei die Seite selbst: scrollY = offsetTop, innerHeight = Höhe − scrollY (in allen fünf Messungen genau);
//   beides gilt ab der Meldung. Chromiums eigener Rollstand bleibt V (Modell oben); scrollY meldet zusätzlich die Verschiebung.
// - S-4 Option auto: Fokus auf ein Feld mit Tastatur öffnet sie im nächsten Bild (Höhe für das nächste Öffnen: __safari.naechste),
//   bleibt nach dem Verlassen 100 ms kein Feld mit Fokus, schließt sie sich – wie am Gerät.
// - S-5 (Muster A-36, 20.10.2026): Safari verschiebt nur, wenn das Feld weniger als ABSTAND über der Tastatur endet, dann bis zur
//   Mitte. Der Schub quer (A-27 3, 21 px) folgt aus derselben Regel (Suche 62–106 px, sichtbar 126 → Mitte 20 px) und ist kein
//   eigener Wert mehr. iPad hoch: Tastatur 340 px (gemessen, Muster V3).
//   ABSTAND gemessen (Muster 2. Fassung, Lineal, 20.10.2026 15:53/15:54): 24 px darüber → nichts (iPhone hoch und iPad quer, Fenster
//   ‚Ort‘); 20 px (iPhone quer, Suche) → verschoben; 80 px (iPad hoch) → nichts. Die Grenze liegt über 20 und höchstens bei 24 px.
//   Mitte bestätigt: iPhone hoch Ort 400–444 bei sichtbar 409 → 218 (gemessen 218), iPad quer Ort 527–571 bei 374 → 362 (gemessen 362).
export const ABSTAND = 24;
export const SAFARI = {
  'iPhone hoch': { tastatur: 403, fokusRollen: -120, fokusSchub: 0 },
  'iPhone quer': { tastatur: 276, ziffern: 232, fokusRollen: 0, fokusSchub: 0 },
  'iPad quer': { tastatur: 428, fokusRollen: 0, fokusSchub: 0 },
  'iPad hoch': { tastatur: 340, fokusRollen: 0, fokusSchub: 0 },
};

export async function safariModell(p, ansicht, { leisten = { bar: '.nb, .pnav', box: '.searchbox' }, links = {}, auto = false, abstand = ABSTAND } = {}) {
  const werte = { abstand, ...SAFARI[ansicht] };
  if (!werte) throw new Error(`Safari-Modell: keine Werte für ${ansicht}`);
  await p.evaluate(({ werte, leisten, links, auto }) => {
    const vv = window.visualViewport;
    // S-3: Chromiums eigene Werte; die Seite sieht die von Safari
    const echt = n => (Object.getOwnPropertyDescriptor(window, n) || Object.getOwnPropertyDescriptor(Window.prototype, n)).get.bind(window);
    const ihEcht = echt('innerHeight'), syEcht = echt('scrollY'), H = () => ihEcht(), Y = () => Math.round(syEcht());
    const s = window.__safari = {
      offen: false, L: Y(), gemeldet: { top: 0, h: H(), pan: 0 }, warte: null, aufnahme: null, blur: false,
      kb: werte.tastatur, pan: 0, fest: false, naechste: null,
      hoehe: () => s.offen ? H() - s.kb : H(),
      // offsetTop, wie Safari ihn gerade zeigt: L folgt V nur, wenn V an den Rand von L stößt
      top() {
        const v = Y(), raum = H() - s.hoehe();
        if (v < s.L) s.L = v; else if (v > s.L + raum) s.L = v - raum;
        s.pan = Math.max(0, Math.min(s.pan, raum - (v - s.L)));
        return v - s.L + s.pan;
      },
      // S-1 (A-35, A-36): liegt das Feld mit Fokus unter der Tastatur, verschiebt Safari den sichtbaren Bereich so weit wie nötig,
      // höchstens um den ganzen Raum. Bildschirm = Lage im Fenster, bei festen Elementen (Rahmen, Fenster) minus offsetTop.
      zumFeld() {
        const a = document.activeElement;
        if (!s.offen || !a?.matches?.('input, textarea')) return;
        let fest = false;
        for (let e = a; e && e !== document.documentElement; e = e.parentElement) if (e.matches('dialog[open]') || getComputedStyle(e).position === 'fixed') { fest = true; break; }
        const v = s.top(), r = a.getBoundingClientRect(), d = fest ? v : 0;
        // S-5: zu nah über der Tastatur (weniger als abstand) – Safari stellt das Feld in die Mitte
        if (r.bottom - d > s.hoehe() - werte.abstand) s.pan = Math.min(H() - s.hoehe() - (Y() - s.L), s.pan + Math.max(0, Math.round((r.top + r.bottom) / 2 - d - s.hoehe() / 2)));
      },
      // Safari meldet 2 Bilder später, was es zeigt
      melde() {
        if (s.warte) return;
        let n = 2;
        const go = () => { if (--n > 0) return requestAnimationFrame(go);
          s.warte = null;
          if (s.fest) return;
          const neu = { top: s.top(), h: s.hoehe(), pan: s.top() - (Y() - s.L) }, alt = s.gemeldet;
          if (neu.top === alt.top && neu.h === alt.h) return;
          s.gemeldet = neu;
          if (neu.h !== alt.h) vv.dispatchEvent(new Event('resize'));
          vv.dispatchEvent(new Event('scroll'));
        };
        s.warte = requestAnimationFrame(go);
      },
      // quer schiebt Safari den sichtbaren Bereich beim Fokus um 21 px (A-27 3) – seit A-36 als Verschiebung (die Seite rollt seit
      // 4.27.0 nicht mehr, Safari verschiebt trotzdem: Messung 19.10. Zeile 11, Kopfzeile −21)
      schub() { const raum = H() - s.hoehe(); s.top(); s.pan = Math.min(raum - (Y() - s.L), s.pan + werte.fokusSchub); },
      tastatur(auf) {
        // A-35: Felder mit Ziffern bekommen quer die niedrigere Zifferntastatur (gemessen; hoch nicht gemessen – wie Buchstaben)
        const a = document.activeElement;
        s.kb = auf && s.naechste ? s.naechste : auf && werte.ziffern && /^(decimal|numeric)$/.test(a?.getAttribute?.('inputmode') || '') ? werte.ziffern : werte.tastatur;
        if (auf) s.naechste = null;
        if (!auf) s.pan = 0;
        s.offen = auf; s.top();
        if (auf) s.zumFeld();
        if (auf && werte.fokusSchub) s.schub();
        if (!auf) s.L = Y();
        s.melde();
      },
      // Lage fester Leisten auf dem Bildschirm (Lage im Layout-Bereich minus offsetTop); links = linker Rand (Fenster mittig)
      lage() {
        const top = s.top(), r = { t: Math.round(performance.now()), sy: Y(), vt: top, kb: s.hoehe() };
        const sicht = sel => [...document.querySelectorAll(sel)].find(x => x.getClientRects().length);
        for (const [k, sel] of Object.entries(leisten)) { const e = sicht(sel); r[k] = e ? Math.round(e.getBoundingClientRect().top - top) : null; }
        for (const [k, sel] of Object.entries(links)) { const e = sicht(sel); r[k] = e ? Math.round(e.getBoundingClientRect().left) : null; }
        return r;
      },
      // A-31: Werte aus einer Messdatei – so meldet Safari, sofort (die Datei zeigt den Augenblick der Meldung)
      setze({ h, top }) {
        s.fest = true; s.offen = h < H() - 40; s.kb = H() - h;
        const alt = s.gemeldet; s.gemeldet = { top, h, pan: top };
        if (h !== alt.h) vv.dispatchEvent(new Event('resize'));
        if (top !== alt.top || h !== alt.h) vv.dispatchEvent(new Event('scroll'));
      },
      bilder(an) {
        if (!an) { const b = s.aufnahme || []; s.aufnahme = null; return b; }
        s.aufnahme = [];
        const bild = () => { if (!s.aufnahme) return; s.aufnahme.push(s.lage()); requestAnimationFrame(bild); };
        requestAnimationFrame(bild);
      },
    };
    Object.defineProperty(vv, 'offsetTop', { configurable: true, get: () => s.gemeldet.top });
    Object.defineProperty(vv, 'height', { configurable: true, get: () => s.gemeldet.h });
    // S-3: Safari rollt die Seite um die Verschiebung, innerHeight schrumpft um sie (ab der Meldung)
    for (const n of ['scrollY', 'pageYOffset']) Object.defineProperty(window, n, { configurable: true, get: () => syEcht() + s.gemeldet.pan });
    Object.defineProperty(window, 'innerHeight', { configurable: true, get: () => H() - s.gemeldet.pan });
    // S-4: Tastatur folgt dem Fokus (Felder mit Tastatur; Datum, Auswahl und Schalter öffnen keine)
    const mitTastatur = e => e?.matches?.('textarea, input:not([type=date],[type=time],[type=checkbox],[type=radio],[type=button],[type=submit],[type=range],[type=color],[type=file]):not([readonly])');
    if (auto) {
      document.addEventListener('focusin', e => { if (!s.offen && mitTastatur(e.target)) requestAnimationFrame(() => { if (!s.offen && mitTastatur(document.activeElement)) s.tastatur(true); }); }, true);
      document.addEventListener('focusout', () => setTimeout(() => { if (s.offen && !mitTastatur(document.activeElement)) s.tastatur(false); }, 100), true);
    }
    // jede Bewegung (App oder Safari) zeigt sich sofort und wird 2 Bilder später gemeldet
    addEventListener('scroll', () => { s.top(); s.melde(); }, { capture: true, passive: true });
    // Antippen einer Schaltfläche nimmt dem Feld den Fokus (Chromium behält ihn); die App setzt ihn danach neu
    document.addEventListener('mousedown', e => {
      const a = document.activeElement;
      if (s.offen && a?.matches?.('input, textarea') && e.target.closest?.('button')) a.blur();
    }, true);
    document.addEventListener('focusout', e => { if (e.target.matches?.('input, textarea')) s.blur = true; }, true);
    document.addEventListener('focusin', e => {
      if (!s.offen || !s.blur || !e.target.matches?.('input, textarea')) return;
      s.blur = false;
      // neuer Fokus bei offener Tastatur: Safari rollt bzw. schiebt nach dem Fokus (im nächsten Bild)
      requestAnimationFrame(() => {
        s.zumFeld();
        if (werte.fokusRollen) scrollTo(0, Math.max(0, Y() + werte.fokusRollen));
        if (werte.fokusSchub) s.schub();
        s.top(); s.melde();
      });
    }, true);
  }, { werte, leisten, links, auto });
}
