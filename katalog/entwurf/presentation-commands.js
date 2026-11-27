// Bean-Katalog – Entwurf (APD-149, Weg W-1; Wortlaut ‚Beans im Entwurf‘ APD-149/J-1): die AD-Beans `commands` (Befehle) und `presentation` (Stapel)
// nach arbeit/APD-149 Grobentwurf V-3.md 2.1 und 2.2, mit den Grundsätzen H-1 bis H-9 und APD-149/J-3. Muster, keine AppDesign-Version: keine App lädt
// diese Datei, sie steht in keiner Fassung und nicht in der Liste der AD-Beans (15). Der Code baut auf v4/ auf (placeAt, menuHtml, blockingLayer,
// choosePop, openDialog, adAlert, adSourcehighlight …); eigenes CSS nur unter .ad-commands… bzw. .ad-presentation…. Der Namensraum AD kommt mit APD-145
// (v5/); hier hängt der Entwurf seine Teile schon an window.AD.
// Prüfung: APD-149/S-1 bis S-15 (Prüfskript der Sitzung AppDesign 0002), APD-151/M-1 bis M-18 (dasselbe Skript arbeit/APD-149/muster-pruefen.mjs, seit AppDesign 0006),
// tests/katalog.mjs (öffnet jede angemeldete Bean, auch im Entwurf).
'use strict';
(() => {
  const AD = window.AD = window.AD || {};
  const css = document.createElement('style');
  css.dataset.adEntwurf = 'presentation-commands';
  css.textContent = '.ad-commands-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 12px; padding: 4px 16px 12px; }'
    // APD-151: das Fenster des Stapels hat im iPhone-Aufbau die Maße des iPad-Fensters (dialog in v4/design.css, R-4.8); die Kopfzeile bleibt kompakt (15.17)
    + ' html.phone dialog:is(#dlg, .blatt-geist).ad-presentation-sheet { width: fit-content; min-width: min(max(480px, calc(480px * var(--f-body))), 90vw); max-width: 90vw;'
    + ' height: auto; border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,.3); }'
    + ' html.phone dialog:is(#dlg, .blatt-geist).ad-presentation-sheet form { height: auto; }'
    + ' html.phone :is(#dlg, .blatt-geist).ad-presentation-sheet .dlg-body { padding: 8px 16px 20px; }'
    + ' html.phone :is(#dlg, .blatt-geist).ad-presentation-sheet .dlg-head { padding-left: 12px; padding-right: 12px; }';
  document.head.append(css);

  /* ---------- APD-151: Fenster am iPhone wie am iPad (Muster; mit v5/ direkt in ui.js) ---------- */
  // Für das Fenster des Stapels (Klasse ad-presentation-sheet am #dlg) gilt im iPhone-Aufbau der Weg des iPad (APD-151/J-2, J-3): in der Mitte,
  // Höhe nach Inhalt, Breite nach R-4.8, Abdunkelung 0,35, die Seite bleibt groß, Tastatur wie am iPad (R-4.5), Antippen der Abdunkelung
  // schließt nicht. v4/ bleibt unverändert: die betroffenen Funktionen von ui.js werden aus ihrem eigenen Text neu gebaut; darin fragen
  // isPhone(), blattOben(), blattZu() und blattDunkel() über die Weiche. Ohne die Klasse verhalten sie sich genau wie in v4.
  // Gegenprobe APD-151/M-18: window.__adPresentationGegenprobe = 'blatt' setzt die Klasse nicht – das Fenster ist wieder das Blatt.
  const SHEET = 'ad-presentation-sheet';
  const wieIpad = () => dlg.classList.contains(SHEET);
  const WEICHE = { isPhone: '__adPhone', blattOben: '__adBlattOben', blattZu: '__adBlattZu', blattDunkel: '__adBlattDunkel' };
  const umbauen = src => src.replace(/\b(isPhone|blattOben|blattZu|blattDunkel)\(\)/g, (_, n) => WEICHE[n] + '()');
  const global = src => (0, eval)('(' + src + ')');   // im globalen Bereich: die neuen Funktionen sehen blattY, dlgFest, dlg … wie ui.js
  // neu gebaut aus dem Text der Funktion in ui.js; ohne ui.js (z. B. entwurf-regeln mit Platzhaltern: nur ‚native code‘) bleibt alles, wie es ist
  const neuBauen = (name, f) => {
    const src = typeof f === 'function' ? String(Function.prototype.toString.call(f)) : '', neu = umbauen(src);
    if (!src || /\[native code\]/.test(src)) return null;
    if (neu === src) { console.error(`presentation (APD-151): ${name} in ui.js ohne Weiche`); return null; }
    return global(neu);
  };
  window.__adPhone = () => isPhone() && !wieIpad();
  window.__adBlattOben = neuBauen('blattOben', blattOben) || blattOben;
  window.__adBlattZu = neuBauen('blattZu', blattZu) || blattZu;
  window.__adBlattDunkel = neuBauen('blattDunkel', blattDunkel) || blattDunkel;
  for (const name of ['blattBild', 'blattFahre', 'blattAuf', 'blattGeist', 'blattWeg', 'blattLos', 'placeDialogs', 'noetig', 'feldZeigen', 'gemeldet']) {
    const alt = window[name], neu = neuBauen(name, alt);
    if (!neu) continue;
    const fn = Object.assign(neu, alt);   // placeDialogs.top, gemeldet.t
    window[name] = fn;
    // gemeldet hängt direkt am sichtbaren Bereich (Tastatur auf und zu): dort austauschen
    if (name === 'gemeldet' && window.visualViewport) for (const t of ['resize', 'scroll']) { visualViewport.removeEventListener(t, alt); visualViewport.addEventListener(t, fn); }
  }
  // Tastatur zu (APD-151/M-9): v4 gibt jedem Rollbereich vor dem Wachsen des Rahmens Platz (gemeldet, APD-115/N-13) – im Fenster wächst es damit auf die
  // volle Höhe und bleibt so, mit leerem Platz unter dem Inhalt (im Safari-Modell auch am iPad mit v4: 454 → 1160 px). Passt der Inhalt ohne den Platz,
  // nimmt das Muster ihn gleich weg: das Fenster gleitet zurück in die Mitte (gleitet, runter). Langer Inhalt bleibt wie in v4.
  if (window.visualViewport) visualViewport.addEventListener('resize', () => {
    const c = dlg.querySelector('.dlg-body'), a = document.activeElement, pl = c ? platzVon(c) : 0;
    if (!wieIpad() || !dlg.open || kbOffen() || !pl || (dlg.contains(a) && a.matches?.(FELD)) || c.scrollHeight - pl > c.clientHeight + 1) return;
    c.style.removeProperty('--platz'); dlgFest = 0; placeDialogs();
  });
  // Tastatur wie am iPad: die Höhe des Fensters vor dem Antippen gilt weiter (dlgFest) – der Platz unter dem Inhalt macht es nicht höher.
  // v4 setzt sie im focusin-Hörer am document nur im iPad-Aufbau; dieser Hörer am window kommt vorher dran.
  addEventListener('focusin', e => {
    const f = e.target;
    if (!wieIpad() || neuFokus || dlgFest || !dlg.contains(f) || !f.matches?.(FELD) || (!kbOffen() && performance.now() - beruehrt > 1500)) return;
    const c = behaelter(f);
    if (c && noetig(f, c) > 0) { dlgFest = Math.round(dlg.offsetHeight); placeDialogs(); }
  }, true);
  // Antippen der Abdunkelung schließt nicht (APD-151/J-3 Nr. 4, wie am iPad): v4 schließt am iPhone im click-Hörer am #dlg – er bekommt den Klick nicht
  addEventListener('click', e => { if (wieIpad() && e.target === dlg && blattDraussen(e)) e.stopPropagation(); }, true);

  const melden = (set, daten) => set.forEach(fn => { try { fn(daten); } catch (e) { console.error(e); } });
  const anmelden = set => fn => { if (typeof fn !== 'function') return () => {}; set.add(fn); return () => { set.delete(fn); }; };

  /* ---------- presentation – der Stapel (Grobentwurf 2.2) ---------- */

  const KINDS = ['sheet', 'alert', 'menu', 'submenu', 'popover', 'activity'];
  const MENUS = new Set(['menu', 'submenu']), EXPANDS = new Set(['menu', 'submenu', 'popover']);
  function createPresentation(root = document.body) {
    const stack = [], queue = [], hoerer = { change: new Set(), reject: new Set() };
    // Gegenprobe APD-149/S-15: 'ableitung' schaltet die Ableitung ab, 'freigabe' nur das Freigeben beim Schließen
    const ohneAbleitung = () => window.__adPresentationGegenprobe === 'ableitung';
    let inertAus = null, dlgEntry = null, fokusZiel = null;

    // Quelle über die Kennung (data-command) bzw. sourceItem – nach jedem Neuaufbau neu gesucht (APD-150)
    const finder = (command, sourceItem) => () => {
      if (sourceItem instanceof Element) return sourceItem.isConnected ? sourceItem : wiederFinden(sourceItem);
      if (typeof sourceItem === 'string' && sourceItem) return root.querySelector(sourceItem);
      return command ? root.querySelector(`[data-command="${CSS.escape(command)}"]`) : null;
    };
    const sichtbar = el => !!el?.isConnected && el.getClientRects().length > 0;
    const change = () => melden(hoerer.change, { stack: stack.map(h => h.kind) });

    // Folgen aus dem Stapel (Grobentwurf 2.2): Tönung, aria-expanded, Mehr-Icon, Sperre und Lage – nach jeder Änderung und jedem Neuaufbau
    function ableiten() {
      const ohne = ohneAbleitung();
      for (const h of stack) {
        const el = h.find();
        if (el !== h.source) { if (h.source && !ohne) frei(h); h.source = el; }
        if (!el || ohne) continue;
        adSourcehighlight.hold(el);
        el.dataset.adPresentationSource = '';
        if (MENUS.has(h.kind)) el.setAttribute('aria-haspopup', 'menu');   // R-1.8: auch eine Kachel mit Kontextmenü sagt ‚öffnet Menü‘
        if (EXPANDS.has(h.kind)) el.setAttribute('aria-expanded', 'true');
        if (h.kind === 'menu') kippen(el, true);
      }
      if (ohne) { layout(); return; }
      root.querySelectorAll('[data-ad-presentation-source][aria-expanded="true"]').forEach(x => {
        if (!stack.some(h => h.source === x && EXPANDS.has(h.kind))) { x.setAttribute('aria-expanded', 'false'); kippen(x, false); }
      });
      // ein Menü ohne Schaltfläche schließt (wie openMenu, R-8.1)
      for (const h of stack.filter(h => MENUS.has(h.kind) && !sichtbar(h.source))) entfernen(h, 'app');
      sperren();
      layout();
    }
    function frei(h) {
      const el = h.source; if (!el || window.__adPresentationGegenprobe === 'freigabe') return;
      adSourcehighlight.release(el);
      if (stack.some(o => o !== h && o.source === el)) return;
      if (EXPANDS.has(h.kind)) el.setAttribute('aria-expanded', 'false');
      if (h.kind === 'menu') kippen(el, false);
    }
    // Mehr-Icon (R-4.1) nur bei Wechsel setzen – sonst meldet der MutationObserver den eigenen Tausch immer wieder
    function kippen(el, offen) { const s = el.querySelector(':scope > svg[data-mehr]'); if (s && s.dataset.adOffen !== String(offen)) { s.dataset.adOffen = String(offen); mehrKippen(el, offen); } }

    // Sperre bei offenem Menü (R-1.4): alles inert außer Menüs, Ebene und der Leiste der Quelle (Durchlass H-6, APD-149/J-3)
    function sperren() {
      inertAus?.(); inertAus = null;
      const menu = stack.find(h => h.kind === 'menu');
      if (!menu) return;
      const frei = [menu.layer, ...stack.filter(h => MENUS.has(h.kind)).map(h => h.el)];
      const leiste = menu.source?.closest('[data-ad-toolbar]');
      if (leiste) frei.push(leiste);
      const pfad = new Set(); frei.forEach(f => { for (let e = f; e && e !== menu.host.parentNode; e = e.parentElement) pfad.add(e); });
      const gesperrt = [];
      pfad.forEach(e => { if (frei.includes(e)) return; for (const c of e.children) if (!pfad.has(c) && !c.inert && !/^(SCRIPT|STYLE)$/.test(c.tagName)) { c.inert = true; gesperrt.push(c); } });
      inertAus = () => gesperrt.forEach(c => { c.inert = false; });
    }
    // Lage: eine layout() für alle Arten im Stapel; Fenster und Hinweisfenster legt v4 selbst (placeDialogs, alert.layout)
    function layout() {
      for (const h of stack) {
        if (h.kind === 'menu' && h.source) { placeAt(h.el, h.source, h.align); loch(h); }
        if (h.kind === 'submenu' && h.source) unterLage(h);
      }
    }
    // Die Ebene deckt die Leiste der Quelle nicht ab (H-6): ein Loch über ihr (clip-path wirkt auch auf das Antippen). Außerhalb schluckt die Ebene
    // den Klick nach dem Schließen weiter (blockingLayer, klickVerschlucken – Safari gibt ihn sonst an die Seite darunter).
    function loch(h) {
      const leiste = h.source.closest('[data-ad-toolbar]');
      if (!leiste) { h.layer.style.clipPath = ''; return; }
      const r = leiste.getBoundingClientRect(), W = innerWidth, H = innerHeight;
      h.layer.style.clipPath = `polygon(evenodd, 0 0, ${W}px 0, ${W}px ${H}px, 0 ${H}px, 0 0, ${r.left}px ${r.top}px, ${r.left}px ${r.bottom}px, ${r.right}px ${r.bottom}px, ${r.right}px ${r.top}px, ${r.left}px ${r.top}px)`;
    }
    function unterLage(h) {
      const s = h.el, m = h.parent.el, b = h.source;
      s.style.maxHeight = ''; s.style.overflowY = '';
      const { L, R, T, B } = rand12(), room = innerHeight - T - B;
      if (s.scrollHeight > room) { s.style.maxHeight = room + 'px'; s.style.overflowY = 'auto'; }
      const waechst = m.getAnimations?.().length, ml = parseFloat(m.style.left), w = s.offsetWidth;
      const mr = waechst ? { left: ml, right: ml + m.offsetWidth } : m.getBoundingClientRect();
      const top = waechst ? parseFloat(m.style.top) + m.clientTop + b.offsetTop - m.scrollTop : b.getBoundingClientRect().top;
      s.style.left = Math.max(L, mr.left - w - 8 >= L ? mr.left - w - 8 : Math.min(mr.right + 8, innerWidth - w - R)) + 'px';
      s.style.top = Math.max(T, Math.min(top, innerHeight - s.offsetHeight - B)) + 'px';
    }

    // Menü bzw. Untermenü aus Einträgen (Befehle über commands.items, Format wie openMenu)
    function menuZeigen(h, items) {
      const host = h.host;
      h.items = items;
      const el = h.el || document.createElement('div');
      el.className = h.kind === 'submenu' ? 'menu submenu' : 'menu' + (h.align === 'beside' ? ' kontext' : '');
      el.setAttribute('role', 'menu');
      const name = h.kind === 'submenu' ? h.label : h.source?.getAttribute('aria-label') || h.source?.textContent.trim();
      if (name) el.setAttribute('aria-label', name);
      el.innerHTML = menuHtml(items);
      el.querySelectorAll('[data-i]').forEach(b => b.onclick = () => waehlen(h, items[b.dataset.i], b));
      if (!h.el) {
        h.el = el;
        if (h.kind === 'menu') { h.layer = blockingLayer(() => anfragen(h)); host.append(h.layer); }
        host.append(el);
      }
    }
    // Neu füllen bei offenem Menü (revalidate): ein offenes Untermenü bleibt offen und bekommt seine neuen Einträge, Quelle ist der neue Eintrag
    // gleichen Namens; der Fokus bleibt auf dem Eintrag an derselben Stelle (Rückmeldung am Gerät 27.11.2026, APD-149/S-16)
    function neuZeichnen(h, items) {
      const a = document.activeElement, wo = a?.closest?.('.menu'), stelle = wo ? [...wo.querySelectorAll('.mi')].indexOf(a) : -1;
      menuZeigen(h, items);
      for (const o of stack.filter(o => o.kind === 'submenu' && o.parent === h)) {
        const i = items.findIndex(it => it && it.submenu && it.label === o.label);
        if (i < 0) { entfernen(o, 'parent'); continue; }
        o.find = () => h.el?.querySelector(`.mi[data-i="${i}"]`) || null;
        menuZeigen(o, items[i].submenu);
      }
      if (wo?.isConnected && stelle >= 0) fokus(wo.querySelectorAll('.mi')[stelle]);
      ableiten();
    }
    function waehlen(h, it, b) {
      if ('schalter' in it) { it.schalter = !it.schalter; b.setAttribute('aria-checked', String(it.schalter)); it.act(it.schalter); return; }
      if (it.submenu) {
        const offen = stack.find(o => o.kind === 'submenu' && o.parent === h);
        if (offen) entfernen(offen, offen.source === b ? 'user' : 'replaced', { fokus: offen.source === b });
        if (offen?.source !== b) bean.present('submenu', it.submenu, { sourceItem: b, label: it.label });
        return;
      }
      // Auswahl: der Befehl läuft, solange das Menü noch offen ist – ein Fenster, Hinweis oder eine Abfrage daraus schließt es (H-5, reason
      // 'replaced') und übernimmt seine Quelle; zeigt der Befehl nichts, schließt das Menü danach (reason 'user', Fokus zurück).
      try { it.act(); } finally { const m = stack.find(o => o.kind === 'menu'); if (m) entfernen(m, 'user', { fokus: true }); }
    }
    // R-4.7: Tasten für das oberste Menü (über den Tastenstapel von v4)
    function tasten(e) {
      const h = [...stack].reverse().find(o => MENUS.has(o.kind)); if (!h) return;
      if (istAbbruch(e)) { verbrauchen(e); anfragen(h); return; }
      const mis = [...h.el.querySelectorAll('.mi:not(:disabled)')]; if (!mis.length) return;
      const i = mis.indexOf(document.activeElement), k = e.key;
      const geh = j => { verbrauchen(e); fokus(mis[(j + mis.length) % mis.length]); };
      if (k === 'ArrowDown' || (k === 'Tab' && !e.shiftKey)) return geh(i + 1);
      if (k === 'ArrowUp' || (k === 'Tab' && e.shiftKey)) return geh(i < 0 ? -1 : i - 1);
      if (k === 'Home') return geh(0);
      if (k === 'End') return geh(-1);
      if (k === 'ArrowLeft' && h.kind === 'submenu') { verbrauchen(e); entfernen(h, 'user', { fokus: true }); return; }
      if (i >= 0 && ((k === 'ArrowRight' && mis[i].getAttribute('aria-haspopup')) || k === 'Enter' || k === ' ')) { verbrauchen(e); mis[i].click(); }
    }

    // Schließen durch den Nutzer (Tippen außerhalb, Escape, x, Wischen am Blatt): vorher shouldDismiss (H-9)
    async function anfragen(h) {
      if (!h.open || h.fragt) return false;
      if (h.shouldDismiss) {
        h.fragt = true;
        let ok = false;
        try { ok = await h.shouldDismiss(); } finally { h.fragt = false; }
        if (!ok || !h.open) return false;
      }
      entfernen(h, 'user', { fokus: true });
      return true;
    }
    function entfernen(h, reason, { fokus: zurueck = false } = {}) {
      if (!h.open) { const q = queue.findIndex(x => x[0] === h); if (q >= 0) queue.splice(q, 1); return; }
      for (const o of stack.filter(o => o.parent === h)) entfernen(o, 'parent');
      h.open = false;
      stack.splice(stack.indexOf(h), 1);
      if (MENUS.has(h.kind)) {
        if (h.el.isConnected) schrumpfen(h.el, h.source);
        h.el.remove(); h.layer?.remove();
        tastenStapel.splice(tastenStapel.indexOf(tasten) >>> 0, stack.some(o => MENUS.has(o.kind)) ? 0 : 1);
        document.querySelectorAll('.side-list[data-padded]').forEach(l => { l.style.paddingBottom = ''; delete l.dataset.padded; });
      }
      if (h.kind === 'popover' && h.pop?.isConnected) tastenStapel.at(-1)?.({ key: 'Escape', preventDefault() {}, stopImmediatePropagation() {} });   // choosePop schließt mit Esc
      // R-1.8: nach Fenster und Hinweisfenster zurück auf die Quelle – nach dem Fokus von v4 (dessen close-Hörer läuft zuerst)
      if ((h.kind === 'sheet' || h.kind === 'alert') && reason !== 'replaced') fokusZiel = h.find();
      if (h.kind === 'sheet') { dlgEntry = null; if (reason !== 'replaced' && dlg.open && !h.geschlossen) dlg.close('cancel'); }
      if (h.kind === 'alert' && !h.geschlossen) adAlert.close();
      if (!ohneAbleitung()) frei(h);
      sperren();
      melden(h.hoerer.dismiss, { reason, kind: h.kind });
      if (zurueck && MENUS.has(h.kind)) fokusZurueck(h.source, h.host);
      if (h.kind === 'alert' && queue.length) { const [q, content, opts] = queue.shift(); zeigen(q, content, opts); }
      change();
    }

    function griff(kind, opts) {
      const h = { kind, command: opts.command || '', open: false, queued: false, source: null, el: null, layer: null, parent: null,
        align: opts.align || 'right', label: opts.label || '', shouldDismiss: opts.shouldDismiss || null, hoerer: { dismiss: new Set() },
        dismiss: () => entfernen(h, 'app'), on: (name, fn) => name === 'dismiss' ? anmelden(h.hoerer.dismiss)(fn) : () => {} };
      h.find = finder(opts.command, opts.sourceItem);
      return h;
    }
    function zeigen(h, content, opts) {
      h.open = true; h.queued = false;
      stack.push(h);
      h.source = h.find();
      if (h.kind === 'menu' || h.kind === 'submenu') {
        const a = h.find();
        h.host = (h.kind === 'submenu' ? h.parent.host : a?.closest('dialog')) || document.body;
        const cmds = opts.commands || AD.commands, place = h.align === 'beside' ? 'context' : 'menu';
        if (typeof content === 'string') { h.commands = cmds; h.rerender = () => neuZeichnen(h, cmds.items(content, { place })); }
        menuZeigen(h, typeof content === 'string' ? cmds.items(content, { place }) : content);
        if (a) { if (h.kind === 'menu') placeAt(h.el, a, h.align); else unterLage(h); wachsen(h.el, a); }
        if (!tastenStapel.includes(tasten)) tastenStapel.push(tasten);
        fokus(h.el.querySelector('.mi:not(:disabled)'));
      } else if (h.kind === 'popover') {
        const a = h.find();
        h.result = choosePop(a, content.message, content.buttons || [{ label: 'Ok', value: true }]).then(v => { if (h.open) entfernen(h, 'user'); return v; });
        h.pop = [...document.querySelectorAll('.pop')].at(-1);
      } else if (h.kind === 'sheet') {
        dlgEntry = h;
        dlg.classList.toggle(SHEET, window.__adPresentationGegenprobe !== 'blatt');   // APD-151 (Gegenprobe M-18: ohne die Klasse das Blatt von v4)
        // H-3 mit Gleiten (APD-151/M-13): das alte Fenster gleitet als Abbild hinaus, das neue gleitet wie beim Öffnen herein; die Abdunkelung bleibt
        const ersetzt = dlg.open;
        if (ersetzt) blattGeist();
        openDialog(content, !!opts.wide);
        if (ersetzt && dlg.open) dlg.animate(bewegungRuhig() ? [{ opacity: 0 }, { opacity: 1 }] : [{ translate: `0 ${Math.round(__adBlattZu())}px` }, { translate: '0 0' }],
          bewegungRuhig() ? { duration: 200, easing: 'ease-out' } : { duration: GLEIT_AUF_MS, easing: GLEIT_FEDER });
        dlgDirty = opts.dirty || null;
        const x = dlg.querySelector('#dlgX');
        if (x) x.onclick = () => anfragen(h);   // x, Escape und ⌘. (v4 drückt dann x) und Wischen mit Änderungen fragen über shouldDismiss
      } else if (h.kind === 'alert') {
        h.result = adAlert.showModal(content.title, content.message, { wide: !!content.wide, action: content.action || null })
          .then(() => { h.geschlossen = true; if (h.open) entfernen(h, 'user'); });
      } else if (h.kind === 'activity') {
        h.result = Promise.resolve().then(content).finally(() => { if (h.open) entfernen(h, 'app'); });
      }
      ableiten();
      change();
      return h;
    }

    const bean = {
      get stack() { return [...stack]; },
      get top() { return stack.at(-1) || null; },
      present(kind, content, opts = {}) {
        if (!KINDS.includes(kind)) { console.error(`presentation: unbekannte Art ‚${kind}‘`); return null; }
        const top = stack.at(-1);
        if (kind === 'submenu' && top?.kind !== 'menu') { console.error('presentation: ein Untermenü nur aus einem Menü (H-2)'); return null; }
        if (kind === 'activity' && stack.some(h => h.kind === 'activity')) { melden(hoerer.reject, { kind, command: opts.command || '' }); return null; }   // H-8
        const h = griff(kind, opts);
        if (kind === 'submenu') { h.parent = top; h.host = top.host; }
        // H-5: aus einem offenen Menü übernimmt alles außer einem Untermenü bzw. Menü die Quelle des Menüs; Menüs schließen (replaced)
        const menu = stack.find(o => o.kind === 'menu');
        if (menu && kind !== 'submenu') {
          if (kind !== 'menu') { const f = menu.find; h.find = () => f(); h.command ||= menu.command; }
          entfernen(menu, 'replaced');
        }
        if (opts.from) { const f = opts.from.find; h.find = () => f(); }
        if (kind === 'popover') for (const o of stack.filter(o => o.kind === 'popover')) entfernen(o, 'replaced');   // H-1
        if (kind === 'sheet') { const alt = stack.find(o => o.kind === 'sheet'); if (alt) entfernen(alt, 'replaced'); }   // H-3
        if (kind === 'alert' && stack.some(o => o.kind === 'alert')) { h.queued = true; queue.push([h, content, opts]); change(); return h; }   // H-4
        return zeigen(h, content, opts);
      },
      dismiss(handle = stack.at(-1), { reason = 'app' } = {}) { if (handle) entfernen(handle, reason, { fokus: reason === 'user' }); },
      refresh() { ableiten(); },
      on(name, fn) { const s = hoerer[name]; return s ? anmelden(s)(fn) : () => {}; },
    };
    new MutationObserver(() => { if (stack.length) ableiten(); }).observe(root, { childList: true, subtree: true });
    floating.add(() => { if (stack.length) layout(); });   // Drehen, Größe, Tastatur (R-8.1)
    // Fenster: Tippen neben das Fenster schließt nicht, auch nicht über shouldDismiss (APD-151/J-3 Nr. 4: wie am iPad und bei Apple – Schließen
    // über x, Escape und Ziehen nach unten; bis zum Muster APD-151 fragte es wie x, H-9). Schließt v4 es selbst (Häkchen, Wischen), ist es zu (reason 'user').
    // Escape geht an das oberste (Grobentwurf 2.2): beim Fenster über shouldDismiss
    dlg.addEventListener('cancel', e => { if (!dlgEntry) return; e.preventDefault(); if (stack.at(-1) === dlgEntry) anfragen(dlgEntry); });
    dlg.addEventListener('close', () => {
      if (!dlg.open) dlg.classList.remove(SHEET);   // APD-151: nach dem Schließen (das Abbild hat die Klasse schon) gilt für #dlg wieder v4
      const h = dlgEntry; if (!h?.open) return;
      h.geschlossen = true; entfernen(h, 'user');
    });
    for (const d of [dlg, msg]) d.addEventListener('close', () => { const z = fokusZiel; fokusZiel = null; if (z) fokus(z); });
    return bean;
  }

  /* ---------- commands – Befehle (Grobentwurf 2.1) ---------- */

  function createCommands({ presentation = AD.presentation, context = {} } = {}) {
    const liste = new Map(), menues = new Map(), hoerer = { change: new Set(), execute: new Set() }, leisten = new Set();
    const p = presentation;
    // Darstellung je Ort (H-7): Menü gedimmt, Kontextmenü und Wischen ohne den Befehl; zerstörend rot und zuletzt
    function eintrag(id, place, ctx) {
      const c = liste.get(id); if (!c) { console.error(`commands: unbekannter Befehl ‚${id}‘`); return null; }
      const v = bean.validate(id, ctx);
      if (v.hidden || (!v.enabled && place !== 'menu')) return null;
      const it = { icon: c.icon, label: v.label, act: o => bean.execute(id, o?.sourceView ? { ...ctx, sourceView: o.sourceView } : ctx) };   // Wischen: Kapsel als Quelle
      if (c.role === 'destructive') it.red = true;
      if (!v.enabled) it.disabled = true;
      if (v.state != null) it.tick = v.state === 'on';
      if (place === 'swipe') it.shortTitle = c.shortTitle || c.label;
      return it;
    }
    function gruppe(g, place, ctx) {
      if (typeof g === 'string') return [eintrag(g, place, ctx)].filter(Boolean);
      if (Array.isArray(g)) return g.map(x => eintrag(x, place, ctx)).filter(Boolean);
      if (g?.children) {   // Untermenü, eine Ebene (H-2); singleSelection: Häkchen am gewählten, sein Name rechts
        const kinder = g.children.map(x => eintrag(x, place, ctx)).filter(Boolean);
        if (!kinder.length) return [];
        const gewaehlt = g.singleSelection ? kinder.find(k => k.tick) : null;
        return place === 'menu' ? [{ icon: g.icon, label: g.title, value: gewaehlt?.label || '', submenu: kinder }] : kinder;
      }
      return [];
    }
    const bean = {
      context,
      presentation: p,
      get ids() { return [...liste.keys()]; },
      add(c) {
        if (!c?.id || liste.has(c.id)) { console.error(`commands: Kennung ‚${c?.id}‘ fehlt oder kommt doppelt vor`); return bean; }
        liste.set(c.id, c); return bean;
      },
      menu(id, children, { label = '', icon = 'ellipsis' } = {}) { menues.set(id, { children, label, icon }); return bean; },
      validate(id, ctx = bean.context) {
        const c = liste.get(id);
        if (!c) return { enabled: false, hidden: true, state: null, label: id };
        return { enabled: true, hidden: false, state: null, label: c.label, ...(c.validate?.(ctx) || {}) };
      },
      execute(id, ctx = bean.context) {
        const c = liste.get(id), v = bean.validate(id, ctx);
        if (!c || !v.enabled || v.hidden) return false;
        melden(hoerer.execute, { id });
        c.execute?.(ctx);
        return true;
      },
      // Neu fragen: Leisten neu zeichnen, offene Menüs neu füllen (ein offenes Untermenü bleibt offen, APD-149/S-16)
      revalidate(id = null) {
        leisten.forEach(z => z());
        for (const h of p.stack) if (h.kind === 'menu' && h.commands === bean) h.rerender?.();
        melden(hoerer.change, { id });
      },
      // Einträge eines Menüs für openMenu-Format; place: menu | context | swipe (H-7); Gruppen durch Abstand getrennt, Zerstörendes zuletzt
      items(menuId, { place = 'menu', ctx = bean.context } = {}) {
        const m = menues.get(menuId); if (!m) { console.error(`commands: unbekanntes Menü ‚${menuId}‘`); return []; }
        let gruppen = m.children.map(g => gruppe(g, place, ctx)).filter(g => g.length);
        if (place !== 'menu') { const rot = gruppen.flat().filter(x => x.red); gruppen = [...gruppen.map(g => g.filter(x => !x.red)).filter(g => g.length), ...(rot.length ? [rot] : [])]; }
        return gruppen.flatMap((g, i) => i ? ['sep', ...g] : g);
      },
      // Kopfzeile aus Befehlen und Menüs (Grobentwurf 4): Tippen auf ein Menü öffnet bzw. schließt es, auf einen Befehl führt ihn aus – bei offenem
      // Menü schon beim ersten Tipp, das Menü geht dabei zu (H-6, APD-149/J-3)
      toolbar(element, ids, { label = 'Kopfzeile' } = {}) {
        const zeichnen = () => {
          if (!element.isConnected) { leisten.delete(zeichnen); return; }
          element.classList.add('ad-commands-toolbar');
          element.dataset.adToolbar = '';
          element.setAttribute('role', 'toolbar');
          element.setAttribute('aria-label', label);
          element.innerHTML = ids.map(id => {
            const m = menues.get(id), c = liste.get(id), v = m ? { enabled: true } : bean.validate(id);
            if (!m && (!c || v.hidden)) return '';
            const name = m ? m.label : v.label;
            return `<button type="button" class="round" data-command="${esc(id)}" aria-label="${esc(name)}"${m ? ' aria-haspopup="menu" aria-expanded="false"' : ''}${v.enabled ? '' : ' disabled'}>${ic(m ? m.icon : c.icon)}</button>`;
          }).join('');
          element.querySelectorAll('[data-command]').forEach(b => b.onclick = () => {
            const id = b.dataset.command, offen = p.stack.find(h => h.kind === 'menu');
            if (menues.has(id)) {
              if (offen && offen.command === id) { p.dismiss(offen, { reason: 'user' }); return; }   // eigene Schaltfläche: schließt
              p.present('menu', id, { command: id, commands: bean });   // H-1: ein anderes Menü ersetzt das offene
              return;
            }
            if (offen) p.dismiss(offen, { reason: 'replaced' });   // J-3: Menü zu, Befehl wirkt beim ersten Tipp
            bean.execute(id);
          });
          p.refresh();
        };
        leisten.add(zeichnen);
        zeichnen();
        return () => leisten.delete(zeichnen);
      },
      on(name, fn) { const s = hoerer[name]; return s ? anmelden(s)(fn) : () => {}; },
    };
    return bean;
  }

  AD.createPresentation = createPresentation;
  AD.createCommands = createCommands;
  AD.presentation = createPresentation(document.body);

  /* ---------- Ausprobieren (für beide Beans dieselbe Vorführung) ---------- */

  function demo(el, log) {
    const p = AD.presentation, ctx = { selection: true, view: 'compact', locked: false };
    const c = AD.commands = createCommands({ presentation: p, context: ctx });
    const fenster = (titel, mitWegen, quelle = {}, lang = false) => {
      // lang (APD-151/M-3): Inhalt höher als der Bildschirm – er rollt, der Fensterkopf steht still
      const orte = lang ? Array.from({ length: 14 }, (_, i) => `<div class="step"><label for="adOrt${i + 1}">Ort ${i + 1}</label><input type="text" id="adOrt${i + 1}" value="Station ${i + 1}" autocapitalize="sentences"></div>`).join('') : '';
      const html = `<form method="dialog">${dlgHead(titel)}<div class="dlg-body">
        <div class="step"><label for="adTitel">Titel</label><input type="text" id="adTitel" value="Rom" autocapitalize="sentences"></div>${orte}
        ${mitWegen ? `<div class="ilist">${[['adHinweis', 'Hinweisfenster über dem Fenster'], ['adZwei', 'Zwei Hinweisfenster nacheinander'], ['adAnderes', 'Anderes Fenster öffnen'], ['adLang', 'Fenster mit langem Inhalt']]
          .map(([id, t]) => `<button type="button" class="irow" id="${id}"><span class="t"><b>${t}</b></span>${ic('chevron-right')}</button>`).join('')}</div>` : ''}</div></form>`;
      const dirty = () => (dlg.querySelector('#adTitel')?.value ?? 'Rom') !== 'Rom';
      const h = p.present('sheet', html, { command: mitWegen ? 'entry.edit' : 'entry.add', ...quelle, dirty,
        shouldDismiss: () => !dirty() || p.present('popover', { message: 'Die Änderungen in diesem Fenster gehen verloren.',
          buttons: [{ label: 'Änderungen verwerfen', cls: 'danger', value: true }, { label: 'Weiter bearbeiten', value: false }] }, { sourceItem: dlg.querySelector('#dlgX') }).result.then(v => v === true) });
      h.on('dismiss', e => log(`Fenster ‚${titel}‘ zu`, e.reason));
      const hinweis = (t, s) => p.present('alert', { title: t, message: s }, { sourceItem: dlg.querySelector('#adHinweis') });
      dlg.querySelector('#adHinweis')?.addEventListener('click', () => hinweis('Hinweis', 'Das Hinweisfenster liegt über dem Fenster.'));
      dlg.querySelector('#adZwei')?.addEventListener('click', () => { hinweis('Erster Hinweis', 'Der zweite kommt, wenn dieser zu ist (H-4).'); hinweis('Zweiter Hinweis', 'Jetzt der zweite.'); });
      dlg.querySelector('#adAnderes')?.addEventListener('click', () => fenster('Anderes Fenster', false, { from: h }));   // H-3: das alte schließt zuerst
      dlg.querySelector('#adLang')?.addEventListener('click', () => fenster('Langes Fenster', false, { from: h }, true));
    };
    const teilen = () => {
      const name = 'Vorführung Bean-Katalog.txt';
      const h = p.present('activity', () => shareFiles([{ name, content: 'Nur Vorführung.', type: 'txt' }]), { command: 'output.share' });
      if (!h) { log('Teilen abgelehnt', 'es läuft schon eins (H-8)'); return; }
      log('Teilen läuft');
      h.result.then(r => p.present('alert', { title: 'Teilen', message: shareResultText(r, name) }, { from: h }));
    };
    c.add({ id: 'entry.add', label: 'Neuer Eintrag', icon: 'plus', execute: () => fenster('Neuer Eintrag', false) })
      .add({ id: 'output.share', label: 'Teilen', icon: 'share', execute: teilen })
      .add({ id: 'output.print', label: 'Drucken', icon: 'file-text', execute: () => p.present('alert', { title: 'Drucken', message: 'Nur Vorführung – gedruckt wird nichts.' }) })
      .add({ id: 'entry.edit', label: 'Bearbeiten', icon: 'pencil', execute: () => fenster('Eintrag bearbeiten', true) })
      .add({ id: 'entry.info', label: 'Info', icon: 'info', execute: () => p.present('alert', { title: 'Info', message: 'Das Hinweisfenster hält die Schaltfläche des Menüs, bis es zu ist.' }) })
      .add({ id: 'view.compact', label: 'Kompakt', validate: x => ({ state: x.view === 'compact' ? 'on' : 'off' }), execute: x => { x.view = 'compact'; c.revalidate(); log('Ansicht kompakt'); } })
      .add({ id: 'view.large', label: 'Groß', validate: x => ({ state: x.view === 'large' ? 'on' : 'off' }), execute: x => { x.view = 'large'; c.revalidate(); log('Ansicht groß'); } })
      .add({ id: 'entry.delete', label: 'Eintrag löschen', shortTitle: 'Löschen', icon: 'trash', role: 'destructive', validate: x => ({ enabled: x.selection }),
        execute: () => p.present('popover', { message: 'Eintrag löschen? (nur Vorführung)', buttons: [{ label: 'Löschen', cls: 'danger', value: true }, { label: 'Abbrechen', value: false }] })
          .result.then(v => log(v ? '‚Löschen‘ bestätigt' : '‚Löschen‘ abgebrochen')) })
      .menu('output', [['output.share', 'output.print']], { label: 'Ausgabe', icon: 'share' })
      .menu('more', [['entry.edit', 'entry.info'], { title: 'Ansicht', icon: 'eye', children: ['view.compact', 'view.large'], singleSelection: true }, ['entry.delete']], { label: 'Mehr', icon: 'ellipsis' });
    // Listen-Ebene wie ‚Zuletzt gelöscht‘ (RLB-126): Wiederherstellen und Endgültig löschen im Kontextmenü und beim Wischen (H-7)
    const zeilen = [{ id: 'z1', titel: 'Rom 2025', sub: 'Gelöscht am 20.11.2026 · noch 23 Tage' }, { id: 'z2', titel: 'Wien 2024 (gesperrt)', sub: 'Endgültig löschen gesperrt', locked: true }];
    let zeile = null;
    c.add({ id: 'row.restore', label: 'Wiederherstellen', shortTitle: 'Zurück', icon: 'rotate-ccw', execute: () => log('Wiederherstellen', zeile?.titel) })
      .add({ id: 'row.purge', label: 'Endgültig löschen', shortTitle: 'Löschen', icon: 'trash', role: 'destructive', validate: x => ({ enabled: !x.row?.locked && x.selection }),
        execute: x => p.present('popover', { message: `‚${esc(zeile?.titel || '')}‘ endgültig löschen? Das lässt sich nicht widerrufen.`, buttons: [{ label: 'Endgültig löschen', cls: 'danger', value: true }, { label: 'Abbrechen', value: false }] }, { sourceItem: x.sourceView })
          .result.then(v => log(v ? '‚Endgültig löschen‘ bestätigt' : '‚Endgültig löschen‘ abgebrochen', zeile?.titel)) })
      .menu('row', [['row.restore'], ['row.purge']]);
    const rowCtx = k => { zeile = zeilen.find(z => z.id === k.dataset.id); return { ...ctx, row: zeile }; };
    el.innerHTML = `<div id="adLeiste"></div>
      <div class="ilist"><div class="swlist"><label class="check sw"><span>Eintrag ausgewählt</span><input type="checkbox" switch role="switch" id="adAuswahl" checked></label></div>
        <div class="swlist"><label class="check sw"><span>Kopfzeile alle 2 s neu aufbauen</span><input type="checkbox" switch role="switch" id="adNeu"></label></div>
        <div class="irow bk-zeile"><span class="t"><b>Stapel</b><small id="adStapel">leer</small></span></div></div>
      <div class="bk-liste" id="adListe">${zeilen.map(z => `<button type="button" class="bk-kachel" data-id="${z.id}"><span class="t"><b>${esc(z.titel)}</b><small>${esc(z.sub)}</small></span>${ic('chevron-right')}</button>`).join('')}</div>`;
    const leiste = el.querySelector('#adLeiste');
    const leisteAus = c.toolbar(leiste, ['entry.add', 'output', 'more'], { label: 'Kopfzeile (Vorführung)' });
    el.querySelector('#adAuswahl').onchange = e => { ctx.selection = e.target.checked; c.revalidate(); log(`Auswahl ${ctx.selection ? 'ja' : 'nein'}`, 'revalidate'); };
    let uhr = null;
    el.querySelector('#adNeu').onchange = e => { clearInterval(uhr); uhr = e.target.checked ? setInterval(() => c.revalidate(), 2000) : null; };
    const liste = el.querySelector('#adListe');
    const w = createSwipeactions(liste, { rows: '[data-id]', actions: k => c.items('row', { place: 'swipe', ctx: rowCtx(k) }) });
    liste.querySelectorAll('[data-id]').forEach(k => onLongPress(k, () => {
      const items = c.items('row', { place: 'context', ctx: rowCtx(k) });
      if (items.length) p.present('menu', items, { sourceItem: k, align: 'beside' });
    }, () => log('Kachel angetippt', k.querySelector('b').textContent)));
    const stapel = el.querySelector('#adStapel');
    const ab = [p.on('change', ({ stack }) => { stapel.textContent = stack.length ? stack.join(' › ') : 'leer'; log('Stapel', stack.join(' › ') || 'leer'); }),
      p.on('reject', ({ kind }) => log('abgelehnt', kind)), c.on('execute', ({ id }) => log('execute', id))];
    return () => { clearInterval(uhr); ab.forEach(f => f()); leisteAus(); w.disconnect(); [...p.stack].reverse().forEach(h => p.dismiss(h)); };
  }

  const gemeinsam = {
    draft: true, since: 'Entwurf', section: '15 (geplant)', demo,
    howTo: '‚Mehr‘ öffnen und gleich auf ‚Ausgabe‘ oder ‚+‘ tippen – ein Tipp genügt · Ansicht im Untermenü · ‚Bearbeiten‘: Fenster, darin Hinweis, zwei Hinweise, anderes Fenster, langes Fenster; am iPhone steht das Fenster wie am iPad in der Mitte (APD-151) · Titel ändern und nach unten ziehen oder Escape – es fragt; neben das Fenster tippen schließt nicht · ‚Ausgabe › Teilen‘ · Kachel lange drücken oder wischen · Schalter ‚Eintrag ausgewählt‘ aus: Löschen gedimmt bzw. weg.',
    history: [['Entwurf', 'Muster im Bean-Katalog (APD-149, Sitzung AppDesign 0002): Grobentwurf V-3, H-1 bis H-9, Durchlass in der Kopfzeile auch ohne Menü (APD-149/J-3).'],
      ['Entwurf', 'Fenster am iPhone wie am iPad (APD-151, Sitzung AppDesign 0006): in der Mitte, Höhe nach Inhalt, 90 % breit; Antippen der Abdunkelung schließt nicht; Ersetzen gleitet.']],
  };
  catalogBean({
    ...gemeinsam, id: 'presentation', name: 'Stapel (Steuer-Bean)', icon: 'list-chevrons-up-down', area: 'Dienste',
    abstract: 'Alles, was erscheint und wieder geht – Fenster, Hinweisfenster, Menü, Untermenü, Sprechblase, laufende Aktion – liegt auf einem Stapel. Tönung der Quelle, aria-expanded, Sperre, Escape, Fokus und Lage folgen aus ihm, auch nach einem Neuaufbau.',
    create: 'AD.createPresentation(root)',
    properties: [],
    readOnly: [['stack', 'Die offenen Einträge von unten nach oben (Griffe).'], ['top', 'Der oberste Eintrag oder null.']],
    methods: [['present(kind, content, { command, sourceItem, from, shouldDismiss, dirty, align })', 'Zeigt sheet, alert, menu, submenu, popover oder activity; gibt einen Griff { kind, command, open, result, dismiss(), on(\'dismiss\') } zurück. Die Quelle kommt über data-command bzw. sourceItem.'],
      ['dismiss(handle, { reason })', 'Schließt den Eintrag (ohne Griff: den obersten); reason user | app | replaced | parent.'], ['refresh()', 'Leitet Tönung, aria-expanded, Sperre und Lage neu ab (nach einem Neuaufbau geschieht es von selbst).']],
    events: [['change', 'Der Stapel hat sich geändert – { stack }.'], ['reject', 'Eine zweite laufende Aktion wurde abgelehnt (H-8) – { kind, command }.']],
    rules: [['R-1.4', 'Nur der Vordergrund reagiert'], ['R-1.8', 'VoiceOver'], ['R-3.3', 'Jede Farbe hat eine Bedeutung'], ['R-4.1', 'Menüs'], ['R-4.9', 'Menümaße'],
      ['R-4.13', 'Menüs und Sprechblasen wachsen aus der Schaltfläche'], ['R-7.3', 'Liste steht still'], ['R-8.1', 'Drehen ändert nur die Anordnung'], ['R-1.13', 'AD-Beans']],
  });
  catalogBean({
    ...gemeinsam, id: 'commands', name: 'Befehle', icon: 'chevrons-up-down', area: 'Aktionen und Menüs',
    abstract: 'Die App beschreibt Befehle – was es gibt und wann es möglich ist –, nicht die Schaltflächen. Derselbe Befehl erscheint je Ort anders: im Menü gedimmt, im Kontextmenü und beim Wischen fehlt er, zerstörend steht er rot zuletzt.',
    create: 'AD.createCommands({ presentation, context })',
    properties: [['context', '{}', 'Zustand der App, den validate und execute bekommen (z. B. { selection }).'], ['presentation', 'AD.presentation', 'Der Stapel, über den Menüs der Kopfzeile erscheinen.']],
    readOnly: [['ids', 'Die Kennungen aller Befehle.']],
    methods: [['add(command)', '{ id, label, shortTitle, icon, role, validate(ctx) → { enabled, hidden, state, label }, execute(ctx) }.'], ['menu(id, children, { label, icon })', 'Menü aus Befehlen; Gruppen durch Abstand getrennt, { title, children, singleSelection } ist ein Untermenü.'],
      ['execute(id, ctx)', 'Führt den Befehl aus, wenn er möglich ist.'], ['validate(id, ctx)', 'Fragt { enabled, hidden, state, label }.'], ['revalidate(id)', 'Fragt neu und zeichnet Leisten und offene Menüs neu.'],
      ['items(id, { place, ctx })', 'Einträge eines Menüs für menu, context oder swipe (Darstellung je Ort, H-7).'], ['toolbar(element, ids, { label })', 'Kopfzeile aus Befehlen und Menüs; bei offenem Menü wirkt jede andere Schaltfläche beim ersten Tipp (H-6, J-3).']],
    events: [['change', 'Nach revalidate – { id }.'], ['execute', 'Ein Befehl läuft – { id }.']],
    rules: [['R-3.8', 'Gesperrt und Abbrechen'], ['R-4.1', 'Menüs'], ['R-4.10', 'Menütexte'], ['R-4.12', 'Erst fragen, dann zerstören'], ['R-7.8', 'Wischaktionen der Kacheln'], ['R-1.13', 'AD-Beans']],
  });
})();
