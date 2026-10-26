// AppDesign · Safari-Modell (Zusammenarbeit 0 Nr. 20, APD-27): das eine Modell, nach dem alle Prüfungen Safari am iPhone
// nachbilden. Jede Abweichung vom Gerät wird hier korrigiert, nie nur in einer Prüfung. Grundlage ist die Messung P-57
// (arbeit/APD-27 Auswertung P-57.md, iOS 26.6.2, Home-Bildschirm); jede Eigenheit steht mit Abschnitt dabei.
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
// - Tastatur offen (APD-27 2, 3): sichtbare Höhe 409 statt 812 (hoch, 403 px Tastatur) bzw. 126 statt 402 (quer, 276 px).
// - Rollt die App (scrollTo) oder Safari, bewegt sich zuerst nur V innerhalb von L; L folgt erst, wenn V an seinen Rand stößt.
//   offsetTop = V − L. Gemessen (APD-27 2): 110 → 230 ergibt offsetTop 120 (L bleibt 110), 230 → 109 ergibt 0 (L folgt auf 109).
// - Feste Leisten stehen auf dem Bildschirm bei ihrer Lage im Layout-Bereich minus offsetTop, sofort im selben Bild.
//   getBoundingClientRect misst in Safari gegen den sichtbaren Bereich (Kopfzeile −120 bei scrollY 230, --vv-top 0).
// - Safari meldet eine neue Lage (visualViewport.offsetTop, height, Ereignisse scroll/resize) erst 2 Bilder (33 ms) später
//   (APD-27 2: 35858 → 35891). Bis dahin liefert visualViewport die alten Werte.
// - Antippen einer Schaltfläche (z. B. ⓧ) nimmt dem Feld mit Fokus den Fokus; Chromium behält ihn (APD-27 2: neuer Fokus nach ⓧ).
// - Neuer Fokus bei offener Tastatur (Feld hatte den Fokus verloren, z. B. nach ⓧ): hoch rollt Safari die Seite von selbst um
//   120 px nach oben (APD-27 2: 230 → 110, offsetTop 0); quer schiebt Safari den sichtbaren Bereich um 21 px (APD-27 3), ebenso beim
//   Öffnen der Tastatur quer.
// - Nicht nachgebildet: die versetzte Lage fester Leisten in der Zeile eines scroll-Ereignisses (Messartefakt, APD-27 5);
//   innerHeight schrumpft quer je Fokus um 19 px (APD-27 3, Chromium kann innerHeight nicht ohne neue Seitengröße ändern);
//   iPad (offsetTop bleibt immer 0, APD-27 4 – dort das Modell nicht einsetzen).
// Seit 4.28.0 (APD-35, Messung tests/messungen/2026-10-19 iPhone quer Suche Fenster Gesamtausgaben.txt, Zeilen 404–408):
// - Feld mit Ziffern (inputmode decimal/numeric) quer: die Zifferntastatur lässt 170 statt 126 px sichtbar (Tastatur 232 px).
// - Antippen eines Felds im Rollbereich, das unter der Tastatur läge: Safari verschiebt den sichtbaren Bereich um den ganzen Raum
//   (offsetTop 232 = 402 − 170, die Seite selbst rollt nicht) – das Feld bleibt dabei, wo es im Rahmen steht, also unter der
//   Tastatur, bis die App den Inhalt rollt. Felder in Fenstern: nicht nachgebildet (gemessen 225 bei 276 px Raum, Regel unklar).
// - spieleAb (tests/abspielen.mjs, APD-31) setzt sichtbare Höhe und offsetTop aus einer Messdatei: __safari.setze({ h, top }).
// Seit 4.28.1 (APD-36, Testfall-Liste arbeit/APD-36 Testfall-Liste.md APD-36/S-1 bis APD-36/S-4; Messungen 2026-10-20 iPhone hoch und iPad quer, Fenster ‚Ort‘):
// - APD-36/S-1 Jedes Feld mit Fokus unter der künftigen Tastatur – im Inhalt und in Fenstern – verschiebt den sichtbaren Bereich, bis das
//   Feld in seiner Mitte steht, höchstens um den ganzen Raum (gemessen 403 hoch, 428 iPad quer, 232 quer im Inhalt, 225 von 276 quer
//   im Fenster; ‚bis zur Mitte‘ passt zu allen vier, ‚so weit wie nötig‘ ergäbe hoch nur 291). Ein Feld darüber verschiebt nichts.
//   Feste Leisten stehen dann auf dem Bildschirm um diesen Betrag zu hoch, bis die App die Meldung (2 Bilder später) ausgleicht.
// - APD-36/S-2 iPad quer: Tastatur 428 px (sichtbar 374 von 802). iPad hoch nicht gemessen (dort lag das Feld über der Tastatur).
// - APD-36/S-3 Safari rollt dabei die Seite selbst: scrollY = offsetTop, innerHeight = Höhe − scrollY (in allen fünf Messungen genau);
//   beides gilt ab der Meldung. Chromiums eigener Rollstand bleibt V (Modell oben); scrollY meldet zusätzlich die Verschiebung.
// - APD-36/S-4 Option auto: Fokus auf ein Feld mit Tastatur öffnet sie im nächsten Bild (Höhe für das nächste Öffnen: __safari.naechste),
//   bleibt nach dem Verlassen 100 ms kein Feld mit Fokus, schließt sie sich – wie am Gerät.
// - APD-36/S-5 (Muster APD-36, 20.10.2026): Safari verschiebt nur, wenn das Feld weniger als ABSTAND über der Tastatur endet, dann bis zur
//   Mitte. Der Schub quer (APD-27 3, 21 px) folgt aus derselben Regel (Suche 62–106 px, sichtbar 126 → Mitte 20 px) und ist kein
//   eigener Wert mehr. iPad hoch: Tastatur 340 px (gemessen, Muster V3).
//   ABSTAND gemessen (Muster 2. Fassung, 20.10.2026, arbeit/APD-36 Messungen/): Felder im Fenster 15 px (iPhone quer), 24 px (iPhone
//   hoch, iPad quer) und 40–80 px darüber → nichts; nur die Suche der Kopfzeile quer (0019) bei 20 px → verschoben. 24 = sichere
//   Seite, bis die Suche im Muster gemessen ist. Felder in Fenstern (dialog): ABSTAND_FENSTER 15 – dort am Gerät gemessen (V1 quer
//   Ort 67–111 bei sichtbar 126 → nichts); darunter nicht gemessen. Mitte bestätigt: 218 (iPhone hoch), 212 (quer), 362 (iPad quer);
//   340 iPad hoch = ganzer Raum (Mitte wäre 399).
// - APD-36/S-6 (Muster 3. Fassung, 20.10.2026 abends, arbeit/APD-36 Testfall-Liste.md 6c): die Grenze ABSTAND gilt nur beim ersten Öffnen der
//   Tastatur für ein Feld in einem Rollbereich (Inhalt, Fenster). Sonst stellt Safari das Feld in die Mitte, sobald seine Mitte
//   unter der Mitte des sichtbaren Bereichs liegt (sichere Seite – darunter nicht gemessen):
//   (a) Feld außerhalb eines Rollbereichs (Suche der Kopfzeile): quer 50–94 bei sichtbar 126 → 9 px (0019: 62–106 → 20 px);
//   (b) Feld wechseln bei offener Tastatur: iPad quer Notiz 296–340 bei sichtbar 374 (34 px darüber) → 132 px; iPhone hoch 24 px
//       darüber → bis zum Raum;
//   (c) erneutes Antippen des Felds mit Fokus, nachdem die Tastatur-Taste (iPad) nur die Tastatur geschlossen hat: die Tastatur
//       öffnet sich ohne neuen Fokus, Safari verschiebt (iPad quer 618–662 → 428 = ganzer Raum). Tastatur-Taste im Modell:
//       __safari.tastatur(false) bei bleibendem Fokus.
//   Nicht nachgebildet: Fokus, den die App am Ende einer abgefangenen Berührung selbst setzt, geht am Gerät oft nach 33–37 ms
//   verloren (12 von ~35, iPhone und iPad, 6c 1 und 6e) – Berührungen nie abfangen. Zifferntastatur iPhone hoch 376 px (Versuch 4).
// - APD-36/S-7 (Muster 5, 6g): Safari liest die Lage des Felds für das erste Öffnen **beim Fokus**, bevor die Fokus-Hörer der App laufen –
//   Rollen im focusin zählt nicht (iPad quer: Ort 527–571 → 362, Gesamtausgaben 618–662 → 428, obwohl danach in der oberen Hälfte).
// - APD-36/S-8 (Muster 6, 6h; am Gerät bestätigt 6i, 6k, 6m, 6n – iPhone hoch, iPad quer, 10 von 10): ein neuer Fokus (blur() + focus()
//   noch im focusin) zählt wie ein eigener – Safari liest die Lage dann neu (window-focusin des neuen Fokus, APD-36/S-7); die Tastatur öffnet
//   beim ersten Mal und klappt dabei nicht zu und auf. Ein Feld mit readonly öffnet keine Tastatur und verschiebt nicht (mitTastatur).
// - APD-36/S-9 (Muster 5 bis 7, 6i, 6k): Feld im Inhalt (Rollbereich außerhalb eines Fensters) – sobald die Tastatur erscheint, steht der
//   Rollbereich wieder auf dem Rollstand beim ersten Fokus, vor dem Rollen der App (Muster 6: 456 / 427, Muster 7 ohne readonly:
//   456 / 477, Muster 5: 477, dort von Safaris Verschiebung verdeckt: 618 − 428 = 190). Felder im Fenster nie (Ort, 7 von 7).
// Seit 4.32.1 (APD-71): __safari.aus() nimmt das Modell wieder heraus (echte Werte, keine Tastatur) – für Prüfungen, die es nur für einen
// Fall brauchen und danach in derselben Seite weiterprüfen (checkSheet B10, B19).
// Seit 4.38.0 (RLB-103, Messung tests/messungen/2026-10-26 iPhone quer Blatt Ort Quartier.txt, Testfall-Liste arbeit/APD-77 Testfall-Liste.md
// APD-77/F-17, APD-77/F-18):
// - Feld in einem Fenster bzw. Blatt, das beim ersten Öffnen der Tastatur ganz über ihr endet: Safari verschiebt nichts (Zeile 520 ff.:
//   ‚Ort‘ nach dem Rollen der App knapp über der Tastatur, offsetTop bleibt 0) – ABSTAND_FENSTER 0 statt 15.
// - Was Safari wegen der Tastatur verschiebt (Öffnen, Feld wechseln, Schließen), meldet es im selben Augenblick (Zeile 532 ff.: ‚scroll‘
//   und ‚vv scroll‘ bei 31711 ms, 167 px; Zeile 541 ff.: Schließen; ebenso die Messung vom 20.10. iPhone hoch, Zeilen 228–244). ‚2 Bilder
//   später‘ (APD-27 2) gilt nur noch für das Rollen.
export const ABSTAND = 24, ABSTAND_FENSTER = 0;
export const SAFARI = {
  'iPhone hoch': { tastatur: 403, ziffern: 376, fokusRollen: -120, fokusSchub: 0 },
  'iPhone quer': { tastatur: 276, ziffern: 232, fokusRollen: 0, fokusSchub: 0 },
  'iPad quer': { tastatur: 428, fokusRollen: 0, fokusSchub: 0 },
  'iPad hoch': { tastatur: 340, fokusRollen: 0, fokusSchub: 0 },
};

export async function safariModell(p, ansicht, { leisten = { bar: '.nb, .pnav', box: '.searchbox' }, links = {}, auto = false, abstand = ABSTAND, abstandFenster = ABSTAND_FENSTER } = {}) {
  const werte = { abstand, abstandFenster, ...SAFARI[ansicht] };
  if (!werte) throw new Error(`Safari-Modell: keine Werte für ${ansicht}`);
  await p.evaluate(({ werte, leisten, links, auto }) => {
    const vv = window.visualViewport;
    // APD-36/S-3: Chromiums eigene Werte; die Seite sieht die von Safari
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
      // APD-36/S-1 (APD-35, APD-36): liegt das Feld mit Fokus unter der Tastatur, verschiebt Safari den sichtbaren Bereich so weit wie nötig,
      // höchstens um den ganzen Raum. Bildschirm = Lage im Fenster, bei festen Elementen (Rahmen, Fenster) minus offsetTop.
      zumFeld(art = 'auf') {
        const a = document.activeElement;
        if (!s.offen || !a?.matches?.('input, textarea')) return;
        let fest = false;
        for (let e = a; e && e !== document.documentElement; e = e.parentElement) if (e.matches('dialog[open]') || getComputedStyle(e).position === 'fixed') { fest = true; break; }
        // APD-36/S-7: beim ersten Öffnen zählt die Lage beim Fokus (vor den Hörern der App)
        const v = s.top(), r = art === 'auf' && s.fokusLage?.el === a ? s.fokusLage.r : a.getBoundingClientRect(), d = fest ? v : 0;
        // APD-36/S-5: zu nah über der Tastatur (weniger als abstand, im Fenster abstandFenster) – Safari stellt das Feld in die Mitte;
        // APD-36/S-6: außerhalb eines Rollbereichs, beim Wechseln und erneuten Antippen genügt eine Mitte unter der Mitte
        let rolle = false;
        for (let e = a.parentElement; e && e !== document.body; e = e.parentElement) if (/(auto|scroll)/.test(getComputedStyle(e).overflowY)) { rolle = true; break; }
        const ab = art !== 'auf' || !rolle ? Infinity : a.closest('dialog[open]') ? werte.abstandFenster : werte.abstand;
        if (r.bottom - d > s.hoehe() - ab) s.pan = Math.min(H() - s.hoehe() - (Y() - s.L), s.pan + Math.max(0, Math.round((r.top + r.bottom) / 2 - d - s.hoehe() / 2)));
      },
      // Safari meldet 2 Bilder später, was es zeigt (Rollen); sofort: im selben Augenblick (Tastatur, seit 4.38.0)
      melde(sofort = false) {
        if (s.weg) return;
        if (sofort && s.warte) { cancelAnimationFrame(s.warte); s.warte = null; }
        if (s.warte) return;
        let n = sofort ? 0 : 2;
        const go = () => { if (--n > 0) return requestAnimationFrame(go);
          s.warte = null;
          if (s.fest) return;
          const neu = { top: s.top(), h: s.hoehe(), pan: s.top() - (Y() - s.L) }, alt = s.gemeldet;
          if (neu.top === alt.top && neu.h === alt.h) return;
          s.gemeldet = neu;
          if (neu.h !== alt.h) vv.dispatchEvent(new Event('resize'));
          vv.dispatchEvent(new Event('scroll'));
        };
        if (sofort) go(); else s.warte = requestAnimationFrame(go);
      },
      // quer schiebt Safari den sichtbaren Bereich beim Fokus um 21 px (APD-27 3) – seit APD-36 als Verschiebung (die Seite rollt seit
      // 4.27.0 nicht mehr, Safari verschiebt trotzdem: Messung 19.10. Zeile 11, Kopfzeile −21)
      schub() { const raum = H() - s.hoehe(); s.top(); s.pan = Math.min(raum - (Y() - s.L), s.pan + werte.fokusSchub); },
      tastatur(auf, art = 'auf') {
        if (s.weg) return;
        // APD-35: Felder mit Ziffern bekommen die niedrigere Zifferntastatur (quer 232, hoch 376 – beide gemessen)
        const a = document.activeElement;
        s.kb = auf && s.naechste ? s.naechste : auf && werte.ziffern && /^(decimal|numeric)$/.test(a?.getAttribute?.('inputmode') || '') ? werte.ziffern : werte.tastatur;
        if (auf) s.naechste = null;
        // APD-36/S-9: Feld im Inhalt – Rollbereich zurück auf den Stand beim ersten Fokus
        if (auf && s.zurueck?.el === a) s.zurueck.c.scrollTop = s.zurueck.y;
        if (auf) s.zurueck = null;
        if (!auf) s.pan = 0;
        s.offen = auf; s.top();
        if (auf) s.zumFeld(art);
        if (auf && werte.fokusSchub) s.schub();
        if (!auf) s.L = Y();
        s.melde(true);
      },
      // Lage fester Leisten auf dem Bildschirm (Lage im Layout-Bereich minus offsetTop); links = linker Rand (Fenster mittig)
      lage() {
        const top = s.top(), r = { t: Math.round(performance.now()), sy: Y(), vt: top, kb: s.hoehe() };
        const sicht = sel => [...document.querySelectorAll(sel)].find(x => x.getClientRects().length);
        for (const [k, sel] of Object.entries(leisten)) { const e = sicht(sel); r[k] = e ? Math.round(e.getBoundingClientRect().top - top) : null; }
        for (const [k, sel] of Object.entries(links)) { const e = sicht(sel); r[k] = e ? Math.round(e.getBoundingClientRect().left) : null; }
        // seit 4.28.1 (APD-36): das Feld mit Fokus (Rahmen und Fenster sind fest) – springt es, steht es zwischen zwei Bildern anders
        const a = document.activeElement;
        if (a?.matches?.('input, textarea')) { r.feld = Math.round(a.getBoundingClientRect().top - top); r.feldId = a.id || a.name || a.tagName; }
        return r;
      },
      // APD-31: Werte aus einer Messdatei – so meldet Safari, sofort (die Datei zeigt den Augenblick der Meldung)
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
    // aus(): echte Werte zurück, das Modell schweigt (seine Hörer bleiben, tun aber nichts mehr)
    const echteWerte = [[vv, 'offsetTop'], [vv, 'height'], [window, 'scrollY'], [window, 'pageYOffset'], [window, 'innerHeight']]
      .map(([o, n]) => [o, n, Object.getOwnPropertyDescriptor(o, n)]);
    s.aus = () => {
      s.weg = true; s.offen = false; s.pan = 0;
      if (s.warte) cancelAnimationFrame(s.warte);
      for (const [o, n, d] of echteWerte) { if (d) Object.defineProperty(o, n, d); else delete o[n]; }
      delete window.__safari;
      vv.dispatchEvent(new Event('resize')); vv.dispatchEvent(new Event('scroll'));
    };
    Object.defineProperty(vv, 'offsetTop', { configurable: true, get: () => s.gemeldet.top });
    Object.defineProperty(vv, 'height', { configurable: true, get: () => s.gemeldet.h });
    // APD-36/S-3: Safari rollt die Seite um die Verschiebung, innerHeight schrumpft um sie (ab der Meldung)
    for (const n of ['scrollY', 'pageYOffset']) Object.defineProperty(window, n, { configurable: true, get: () => syEcht() + s.gemeldet.pan });
    Object.defineProperty(window, 'innerHeight', { configurable: true, get: () => H() - s.gemeldet.pan });
    // APD-36/S-4: Tastatur folgt dem Fokus (Felder mit Tastatur; Datum, Auswahl und Schalter öffnen keine)
    const mitTastatur = e => e?.matches?.('textarea, input:not([type=date],[type=time],[type=checkbox],[type=radio],[type=button],[type=submit],[type=range],[type=color],[type=file]):not([readonly])');
    if (auto) {
      document.addEventListener('focusin', e => { if (!s.offen && mitTastatur(e.target)) requestAnimationFrame(() => { if (!s.offen && mitTastatur(document.activeElement)) s.tastatur(true, s.erneut === document.activeElement ? 'erneut' : 'auf'); }); }, true);
      document.addEventListener('focusout', () => setTimeout(() => { if (s.offen && !mitTastatur(document.activeElement)) s.tastatur(false); }, 100), true);
      // APD-36/S-6 (c): Antippen des Felds, das den Fokus noch hat, bei geschlossener Tastatur öffnet sie wieder (ohne neuen Fokus); wie Safari
      // es bewertet, wenn die App dabei den Fokus neu setzt, ist nicht gemessen – das Modell bleibt auf der sicheren Seite (erneut)
      window.addEventListener('touchstart', e => { s.erneut = !s.offen && e.target === document.activeElement && mitTastatur(e.target) ? e.target : null; }, true);
      document.addEventListener('touchend', e => { if (s.erneut === e.target) requestAnimationFrame(() => { if (!s.offen && s.erneut === document.activeElement) s.tastatur(true, 'erneut'); }); }, true);
    }
    // jede Bewegung (App oder Safari) zeigt sich sofort und wird 2 Bilder später gemeldet
    addEventListener('scroll', () => { if (!s.weg) { s.top(); s.melde(); } }, { capture: true, passive: true });
    // Antippen einer Schaltfläche nimmt dem Feld den Fokus (Chromium behält ihn); die App setzt ihn danach neu
    document.addEventListener('mousedown', e => {
      const a = document.activeElement;
      if (s.offen && a?.matches?.('input, textarea') && e.target.closest?.('button')) a.blur();
    }, true);
    document.addEventListener('focusout', e => { if (e.target.matches?.('input, textarea')) s.blur = true; }, true);
    // APD-36/S-7: window vor document – läuft vor jedem Fokus-Hörer der Seite
    window.addEventListener('focusin', e => { const r = e.target.getBoundingClientRect?.(); s.fokusLage = r ? { el: e.target, r: { top: r.top, bottom: r.bottom } } : null;
      // APD-36/S-9: Rollstand beim ersten Fokus eines Felds im Inhalt merken (ein neuer Fokus desselben Felds ändert ihn nicht)
      if (!s.offen && e.target.matches?.('input, textarea') && !e.target.closest('dialog') && s.zurueck?.el !== e.target) {
        let c = e.target.parentElement; while (c && c !== document.body && !/(auto|scroll)/.test(getComputedStyle(c).overflowY)) c = c.parentElement;
        s.zurueck = c && c !== document.body ? { el: e.target, c, y: c.scrollTop } : null;
      } }, true);
    document.addEventListener('focusin', e => {
      if (s.weg || !s.offen || !s.blur || !e.target.matches?.('input, textarea')) return;
      s.blur = false;
      // neuer Fokus bei offener Tastatur: Safari rollt bzw. schiebt nach dem Fokus (im nächsten Bild)
      requestAnimationFrame(() => {
        s.zumFeld('wechsel');
        if (werte.fokusRollen) scrollTo(0, Math.max(0, Y() + werte.fokusRollen));
        if (werte.fokusSchub) s.schub();
        s.top(); s.melde(true);
      });
    }, true);
  }, { werte, leisten, links, auto });
}

// APD-67/S-10 (seit 4.30.2, APD-67, Messung P-65 ‚messung-2026-10-23-0633.txt‘, iOS 26.6.2, Home-Bildschirm, 25 Züge): Berührung, wo der
// Browser senkrecht rollen darf (touch-action auto, manipulation oder pan-y bis hinauf) – Safari beginnt zu rollen, sobald der Finger
// seit dem Aufsetzen **10 px senkrecht** abweicht (gemessen 10–21, 20 von 22 bei 10–16), auch mitten in einer waagrechten Geste
// (bis 289 px waagrecht), und nimmt der Seite den Finger: pointercancel (Lage 0 0), danach rollt der Bereich mit dem Finger;
// touchmove kommt weiter, ist aber nicht mehr verhinderbar. Hat die Seite touchmove bis dahin verhindert, rollt Safari nicht.
// Playwright kennt in WebKit keine Berührung mit Bewegung – die Ereignisse werden in der Seite nachgebildet (isTrusted false).
// safariWischen(p, x, y, schritte): Finger bei x/y aufsetzen, schritte = [[dx, dy, ms], …] (Lage seit dem Aufsetzen, Zeit seit dem
// vorigen Schritt), loslassen. Ergebnis { abgebrochen, gerollt } (gerollt = Änderung des Rollstands in px).
export const WISCH_SCHWELLE = 10;
export async function safariWischen(p, x, y, schritte, { schwelle = WISCH_SCHWELLE } = {}) {
  return p.evaluate(async ({ x, y, schritte, schwelle }) => {
    const warte = ms => new Promise(r => setTimeout(r, ms));
    const t = document.elementFromPoint(x, y) || document.body;
    const senkrecht = [];
    for (let e = t; e; e = e.parentElement) senkrecht.push(getComputedStyle(e).touchAction);
    const darf = senkrecht.every(a => /auto|manipulation|pan-y/.test(a));
    let roll = t;
    while (roll && roll !== document.documentElement && !(/(auto|scroll)/.test(getComputedStyle(roll).overflowY) && roll.scrollHeight > roll.clientHeight)) roll = roll.parentElement;
    roll ||= document.scrollingElement;
    const r0 = roll.scrollTop, id = 4067;
    const zeiger = (typ, px, py) => t.dispatchEvent(new PointerEvent(typ, { pointerId: id, pointerType: 'touch', isPrimary: true, clientX: px, clientY: py,
      buttons: typ === 'pointerup' || typ === 'pointercancel' ? 0 : 1, bubbles: true, cancelable: typ !== 'pointercancel', composed: true }));
    const finger = (typ, cancelable) => { const e = new Event(typ, { bubbles: true, cancelable, composed: true }); t.dispatchEvent(e); return e; };
    zeiger('pointerdown', x, y); finger('touchstart', true);
    let rollt = false, ab = 0, letzt = [0, 0];
    for (const [dx, dy, ms] of schritte) {
      await warte(ms);
      letzt = [dx, dy];
      if (!rollt) zeiger('pointermove', x + dx, y + dy);
      const tm = finger('touchmove', !rollt);
      if (!rollt && darf && !tm.defaultPrevented && Math.abs(dy) >= schwelle) { rollt = true; ab = dy; zeiger('pointercancel', 0, 0); }
      if (rollt) roll.scrollTop = r0 - (dy - ab);
    }
    finger('touchend', !rollt);
    if (!rollt) zeiger('pointerup', x + letzt[0], y + letzt[1]);
    return { abgebrochen: rollt, gerollt: Math.round(roll.scrollTop - r0), ziel: t.tagName.toLowerCase() + [...t.classList].map(c => '.' + c).join('') + (t.id ? '#' + t.id : '') };
  }, { x, y, schritte, schwelle });
}
