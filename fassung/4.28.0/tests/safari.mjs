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
export const SAFARI = {
  'iPhone hoch': { tastatur: 403, fokusRollen: -120, fokusSchub: 0 },
  'iPhone quer': { tastatur: 276, ziffern: 232, fokusRollen: 0, fokusSchub: 21 },
};

export async function safariModell(p, ansicht, { leisten = { bar: '.nb, .pnav', box: '.searchbox' } } = {}) {
  const werte = SAFARI[ansicht];
  if (!werte) throw new Error(`Safari-Modell: keine Werte für ${ansicht}`);
  await p.evaluate(({ werte, leisten }) => {
    const vv = window.visualViewport;
    const s = window.__safari = {
      offen: false, L: Math.round(scrollY), gemeldet: { top: 0, h: innerHeight }, warte: null, aufnahme: null, blur: false,
      kb: werte.tastatur, pan: 0, fest: false,
      hoehe: () => s.offen ? innerHeight - s.kb : innerHeight,
      // offsetTop, wie Safari ihn gerade zeigt: L folgt V nur, wenn V an den Rand von L stößt
      top() {
        const v = Math.round(scrollY), raum = innerHeight - s.hoehe();
        if (v < s.L) s.L = v; else if (v > s.L + raum) s.L = v - raum;
        s.pan = Math.max(0, Math.min(s.pan, raum - (v - s.L)));
        return v - s.L + s.pan;
      },
      // A-35: liegt das Feld mit Fokus im Rollbereich unter der Tastatur, verschiebt Safari den sichtbaren Bereich um den ganzen Raum
      zumFeld() {
        const a = document.activeElement, r = a?.closest?.('#app > .rolle') && a.matches?.('input, textarea') ? a.getBoundingClientRect() : null;
        if (!s.offen || !r) return;
        const v = s.top();
        if (r.bottom + Math.round(scrollY) - s.L > v + s.hoehe()) s.pan = innerHeight - s.hoehe() - (Math.round(scrollY) - s.L);
      },
      // Safari meldet 2 Bilder später, was es zeigt
      melde() {
        if (s.warte) return;
        let n = 2;
        const go = () => { if (--n > 0) return requestAnimationFrame(go);
          s.warte = null;
          if (s.fest) return;
          const neu = { top: s.top(), h: s.hoehe() }, alt = s.gemeldet;
          if (neu.top === alt.top && neu.h === alt.h) return;
          s.gemeldet = neu;
          if (neu.h !== alt.h) vv.dispatchEvent(new Event('resize'));
          vv.dispatchEvent(new Event('scroll'));
        };
        s.warte = requestAnimationFrame(go);
      },
      tastatur(auf) {
        // A-35: Felder mit Ziffern bekommen quer die niedrigere Zifferntastatur (gemessen; hoch nicht gemessen – wie Buchstaben)
        const a = document.activeElement;
        s.kb = auf && werte.ziffern && /^(decimal|numeric)$/.test(a?.getAttribute?.('inputmode') || '') ? werte.ziffern : werte.tastatur;
        if (!auf) s.pan = 0;
        s.offen = auf; s.top();
        if (auf) s.zumFeld();
        if (auf && werte.fokusSchub) { const v = s.L; scrollTo(0, v + werte.fokusSchub); s.L = v; s.top(); }
        if (!auf) s.L = Math.round(scrollY);
        s.melde();
      },
      // Lage fester Leisten auf dem Bildschirm (Lage im Layout-Bereich minus offsetTop)
      lage() {
        const top = s.top(), r = { t: Math.round(performance.now()), sy: Math.round(scrollY), vt: top };
        for (const [k, sel] of Object.entries(leisten)) {
          const e = [...document.querySelectorAll(sel)].find(x => x.getClientRects().length);
          r[k] = e ? Math.round(e.getBoundingClientRect().top - top) : null;
        }
        return r;
      },
      // A-31: Werte aus einer Messdatei – so meldet Safari, sofort (die Datei zeigt den Augenblick der Meldung)
      setze({ h, top }) {
        s.fest = true; s.offen = h < innerHeight - 40; s.kb = innerHeight - h;
        const alt = s.gemeldet; s.gemeldet = { top, h };
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
        if (werte.fokusRollen) scrollTo(0, Math.max(0, Math.round(scrollY) + werte.fokusRollen));
        if (werte.fokusSchub) { s.top(); const l = s.L; scrollTo(0, Math.round(scrollY) + werte.fokusSchub); s.L = l; }
        s.top(); s.melde();
      });
    }, true);
  }, { werte, leisten });
}
