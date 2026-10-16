// AppDesign 4.17.0 · ui.js – gemeinsame Bausteine der iPad-Web-Apps von g811141a (Apple-like)
// Einbinden am Ende von <body>, vor dem Skript der App:  <script src="../AppDesign/fassung/X.Y.Z/ui.js"></script> (feste Fassung, R-10.3)
// Seit 4.11.0 (R-10.3): ui.js und design.css immer mit ?v=<AppDesign-Version> einbinden (auch in sw.js) und beim Start
// prüfen, ob genau diese Fassung geladen ist (AD_VERSION hier, --ad-version in design.css).
// Klassisches Skript: alle Funktionen sind global und für das Skript der App sichtbar.
//
// Die App muss bereitstellen (Schnittstelle):
//   <dialog id="dlg"></dialog> und <dialog id="msg"></dialog> im Dokument
//   db.settings.appearance ('auto' | 'light' | 'dark'), save(), render()     – für Darstellung
//   optional: function onDialogOpen()                                       – wird bei jedem openDialog aufgerufen
//
// Inhalt: Icons (ic) · esc · Beträge (money, formatEuro) · autoGrow · onLongPress · Darstellung
// (applyTheme, setAppearance) · Menüs (openMenu mit Untermenü) · Sprechblase (confirmPop) ·
// gedrückte Schaltflächen (hold, release, setOpener) · Meldung (inform) · Fenster (openDialog, dlgHead) ·
// Auswahl-Kapsel (capHtml, mountCap) · Tastatur/sichtbarer Bereich (placeDialogs) · iPhone (isPhone, applyLayout)
// Regeln dazu: README - Designrichtlinie allgemein.md

'use strict';
// Version der Bausteine (R-10.3): die App vergleicht sie beim Start mit der benötigten Fassung.
const AD_VERSION = '4.17.0';
/* ---------- Icons ---------- */

// Schaltflächen-Icons aus Lucide (ISC-Lizenz), direkt eingebettet, damit die App offline funktioniert.
const ICONS = {
  'eye': '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  'book-open': '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',
  'fold-vertical': '<path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3-3-3 3"/><path d="m15 5-3 3-3-3"/>',
  'list-chevrons-up-down': '<path d="M3 5h8"/><path d="M3 12h8"/><path d="M3 19h8"/><path d="m15 8 3-3 3 3"/><path d="m15 16 3 3 3-3"/>',
  'moon': '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
  'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  'share': '<path d="M12 2v13"/><path d="m16 6-4-4-4 4"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>',
  'search': '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',
  'arrow-up-to-line': '<path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/>',
  'arrow-down-to-line': '<path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/>',
  'check': '<path d="M20 6 9 17l-5-5"/>',
  'sun-moon': '<path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/>',
  'ban': '<circle cx="12" cy="12" r="10"/><path d="M4.929 4.929 19.07 19.071"/>',
  'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'save': '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
  'folder-open': '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
  'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'pencil': '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  'trash': '<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  'mic': '<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>',
  'chevron-up': '<path d="m18 15-6-6-6 6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'file-code': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/>',
  'file-text': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  'calendar': '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  'panel-left': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  // Seit 4.15.0 (R-1.5, A-06): Offline-Hinweis
  'wifi-off': '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',
  'wifi': '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
  'ellipsis': '<circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/><circle cx="5" cy="12" r="1.3"/>',
  'settings': '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>'
};
const ic = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

// Feste Elemente jeder App: <dialog id="dlg"> (Fenster) und <dialog id="msg"> (Meldungen).
const dlg = document.getElementById('dlg');
const msg = document.getElementById('msg');
let dlgOpener = '';        // Schaltfläche oder Zeile, von der das offene Fenster kommt (bleibt blau hinterlegt)
let dlgDirty = null;       // Prüft, ob im offenen Fenster etwas geändert wurde

/* ---------- Hilfen ---------- */

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
// Seit 4.7.0: Sehr lange Wörter (über 20 Zeichen, auch Reihen von Smileys) bekommen nach jedem Zeichen eine unsichtbare
// Umbruchstelle, damit sie auch in Tabellen genau am Spaltenrand umbrechen, statt über die Zelle hinauszuragen (R-6.3).
// Seit 4.8.0 nach ganzen Zeichen (Graphemen): zusammengesetzte Smileys wie 🤷🏻‍♂️ bleiben ganz. Normale Wörter bleiben ganz.
const graphemeSeg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter('de', { granularity: 'grapheme' }) : null;
function breakable(text) {
  return String(text ?? '').replace(/\S{21,}/gu, w => (graphemeSeg ? Array.from(graphemeSeg.segment(w), s => s.segment) : Array.from(w)).join('\u200B'));
}
// Ganze Zahl mit Tausenderpunkt, z. B. 4850 → "4.850".
function thousands(n) {
  return String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
// Betrag mit zwei Nachkommastellen wie bei Apple: "4.850,00" (ohne Währung).
function money(n) {
  const [i, d] = (Math.round((Number(n) || 0) * 100) / 100).toFixed(2).split('.');
  return thousands(i) + ',' + d;
}
function formatEuro(value) {
  return money(value) + ' €';
}

// Textfeld so hoch wie sein Inhalt (mindestens die eingestellte Höhe).
function autoGrow(ta) {
  ta.style.height = 'auto';
  ta.style.height = (ta.scrollHeight + 2) + 'px';
}
const growAll = () => dlg.querySelectorAll('textarea').forEach(autoGrow);

function onLongPress(btn, onLong, onTap) {
  let timer = null;
  let fired = false;
  btn.addEventListener('pointerdown', () => {
    fired = false;
    timer = setTimeout(() => { fired = true; onLong(); }, 600);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => btn.addEventListener(ev, () => clearTimeout(timer)));
  btn.addEventListener('contextmenu', e => e.preventDefault());
  btn.addEventListener('click', e => {
    e.preventDefault();
    if (fired) { fired = false; return; }
    onTap();
  });
}

/* ---------- Darstellung ---------- */

// Wie Apple: die App folgt der Darstellung des iPads; im Mehr-Menü lässt sie sich übersteuern.
const darkQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
function applyTheme() {
  const a = db.settings.appearance;
  document.documentElement.setAttribute('data-theme', a === 'auto' ? (darkQuery?.matches ? 'dark' : 'light') : a);
}
darkQuery?.addEventListener?.('change', () => { if (db.settings.appearance === 'auto') applyTheme(); });

function setAppearance(a) {
  db.settings.appearance = a;
  save();
  applyTheme();
  render();
}
const APPEARANCES = { auto: 'Automatisch', light: 'Hell', dark: 'Dunkel' };

/* ---------- Menüs und Sprechblasen ---------- */

// Ebene hinter Menü und Sprechblase: daneben tippen schließt, Wischen bewegt die Seite dahinter nicht.
function blockingLayer() {
  const layer = document.createElement('div');
  layer.className = 'layer';
  layer.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  return layer;
}

// Seite sperren, solange ein Fenster offen ist: Wischen wirkt nur im Fenster (seit 4.2.0).
function lockPage() { document.documentElement.classList.add('locked'); }
function unlockPage() { if (!dlg.open && !msg.open) document.documentElement.classList.remove('locked'); }

// Fenster ohne Fokus-Rahmen öffnen: der Fokus liegt auf dem Fenster selbst, nicht auf dem x.
function showModalQuiet(d) {
  d.tabIndex = -1;
  d.showModal();
  d.focus({ preventScroll: true });
  lockPage();
}

// Menü oder Sprechblase unter (bzw. über) der Schaltfläche, im Bildschirm gehalten.
function placeAt(el, anchor, align) {
  // R-4.5/R-8.1: Menü und Sprechblase stehen unter ihrer Schaltfläche und passen immer ganz auf den Bildschirm.
  // Reicht der Platz darunter nicht, scrollt ihr Inhalt darin (erst bei weniger als 200 px Platz darunter
  // öffnen sie nach oben). 'beside': rechts neben dem Eintrag (Kontextmenü in der Seitenleiste), oben bündig.
  el.style.maxHeight = ''; el.style.overflowY = '';   // nach dem Drehen neu messen
  let r = anchor.getBoundingClientRect();
  const fit = room => { if (el.scrollHeight > room) { el.style.maxHeight = room + 'px'; el.style.overflowY = 'auto'; el.style.overscrollBehavior = 'contain'; } };
  let top;
  // Seit 4.10.0: ist neben dem Eintrag kein Platz (iPhone: Kachel so breit wie der Bildschirm), steht das Menü
  // linksbündig unter der Kachel – ganz sichtbar über der Backup-Kachel; dafür wird die Liste nötigenfalls
  // etwas nach oben geschoben (R-4.2).
  if (align === 'beside' && innerWidth - (r.right - 40) - 12 < el.offsetWidth) {
    const list = anchor.closest('.side-list'), tile = anchor.closest('#side')?.querySelector('.side-foot .bhint');
    const tr = tile?.getBoundingClientRect();
    const limit = Math.min(innerHeight, tr && tr.height ? tr.top : innerHeight) - 12;
    const need = r.bottom + 8 + el.offsetHeight - limit;
    if (need > 0 && list) {
      // Reicht der Scrollweg nicht (wenige Einträge), bekommt die Liste unten so viel Platz, dass sie weit genug rückt.
      const from = list.scrollTop;
      list.scrollTop = from + need;
      if (list.scrollTop - from < need - 1) {   // Liste kürzer als nötig: unten eine Bildschirmhöhe Platz dazugeben
        list.style.paddingBottom = (parseFloat(getComputedStyle(list).paddingBottom) + list.clientHeight) + 'px';
        list.dataset.padded = '1';   // wird beim Schließen des Menüs wieder entfernt
        list.scrollTop = from + need;
      }
      r = anchor.getBoundingClientRect();
    }
    top = r.bottom + 8;
    // Seit 4.11.0: rückt die Liste trotzdem nicht weit genug (z. B. iOS hält die Liste fest, solange der Finger
    // noch liegt), steht das Menü linksbündig über der Kachel statt hinter der Backup-Kachel (wie Apple).
    if (top + el.offsetHeight > limit + 2 && r.top - 8 - el.offsetHeight >= 12) top = r.top - 8 - el.offsetHeight;
    else fit(limit - top);
    el.style.left = Math.max(12, Math.min(r.left, innerWidth - el.offsetWidth - 12)) + 'px';
    el.style.top = Math.max(12, top) + 'px';
    return;
  }
  if (align === 'beside') {
    // Neben der Kachel (iPad): nie über bzw. hinter die Backup-Kachel – unten endet das Menü über ihr (R-4.2).
    const tr = anchor.closest('#side')?.querySelector('.side-foot .bhint')?.getBoundingClientRect();
    const left0 = Math.max(12, Math.min(r.right - 40, innerWidth - el.offsetWidth - 12));
    const bottom = tr && tr.height && left0 < tr.right ? tr.top - 12 : innerHeight - 12;
    fit(bottom - 12);
    top = Math.max(12, Math.min(r.top, bottom - el.offsetHeight));
  } else {
    const below = innerHeight - r.bottom - 8 - 12, above = r.top - 8 - 12;
    if (el.scrollHeight <= below || below >= 200 || below >= above) { fit(below); top = r.bottom + 8; }
    else { fit(above); top = r.top - 8 - el.offsetHeight; }
  }
  const w = el.offsetWidth;
  let left = align === 'right' ? r.right - w : align === 'beside' ? r.right - 40 : r.left;
  left = Math.max(12, Math.min(left, innerWidth - w - 12));
  el.style.left = left + 'px';
  el.style.top = Math.max(12, top) + 'px';
}

// Einträge: { icon, label, sub, red, tick, disabled, act } (tick und icon zusammen: Häkchen vorne, dann Icon und Text) · { …, value, submenu: [Einträge] } (Untermenü ›, eine Ebene)
// · 'sep' (Abstand) · 'line' (Strich) · { note } (graue Zeile).
const menuHtml = items => items.map((it, i) => it === 'sep' ? '<div class="sep"></div>' : it === 'line' ? '<div class="line"></div>'
  : it.note ? `<div class="note">${esc(it.note)}</div>`
  : `<button type="button" class="mi ${it.red ? 'red' : ''} ${it.sub ? 'has-sub' : ''}" data-i="${i}" ${it.disabled ? 'disabled' : ''} role="menuitem">${
      'tick' in it ? `<span class="tick">${it.tick ? ic('check') : ''}</span>` : ''}${it.icon ? ic(it.icon) : ''}${esc(it.label)}${
      it.value ? `<span class="val">${esc(it.value)}</span>` : ''}${it.submenu ? ic('chevron-right', 'chev') : ''}</button>${
      it.sub ? `<div class="sub">${esc(it.sub)}</div>` : ''}`).join('');
// Seit 4.10.0 (R-8.1): Menüs, Untermenüs und Sprechblasen bleiben beim Drehen (quer ↔ hoch) und bei jeder
// Größenänderung an ihrer Schaltfläche – neu ausgerichtet, ganz sichtbar. Baut die App die Leiste dabei neu
// auf, wird die Schaltfläche über ihre id wiedergefunden; gibt es sie nicht mehr, schließt sich das Menü.
const floating = new Set();
function liveAnchor(anchor) {
  if (anchor.isConnected) return anchor.getClientRects().length ? anchor : null;
  const key = anchor.id ? '#' + CSS.escape(anchor.id)
    : anchor.dataset.id ? `.${anchor.classList[0]}[data-id="${CSS.escape(anchor.dataset.id)}"]`
    : anchor.dataset.day ? `[data-day="${CSS.escape(anchor.dataset.day)}"]` : '';
  const again = key && document.querySelector(key);
  if (again) again.classList.add('on');
  return again || null;
}
function placeFloating() { floating.forEach(f => f()); }
const replaceSoon = () => { requestAnimationFrame(() => requestAnimationFrame(placeFloating)); setTimeout(placeFloating, 350); };
window.addEventListener('resize', replaceSoon);
window.addEventListener('orientationchange', replaceSoon);
window.visualViewport?.addEventListener('resize', replaceSoon);

function openMenu(anchor, items, align = 'right') {
  const host = anchor.closest('dialog') || document.body;
  const layer = blockingLayer();
  const menu = document.createElement('div');
  menu.className = 'menu';
  menu.setAttribute('role', 'menu');
  menu.innerHTML = menuHtml(items);
  let subMenu = null, subItem = null;
  const closeSub = () => { subMenu?.remove(); subMenu = null; subItem = null; menu.querySelector('.mi.on')?.classList.remove('on'); };
  anchor.classList.add('on');
  // Untermenü neben dem Menü, oben bündig mit seinem Eintrag; passt es links nicht hin, rechts daneben.
  const placeSub = () => {
    if (!subMenu) return;
    subMenu.style.maxHeight = ''; subMenu.style.overflowY = '';
    const room = innerHeight - 24;
    if (subMenu.scrollHeight > room) { subMenu.style.maxHeight = room + 'px'; subMenu.style.overflowY = 'auto'; }
    const mr = menu.getBoundingClientRect(), br = subItem.getBoundingClientRect(), w = subMenu.offsetWidth;
    subMenu.style.left = Math.max(12, mr.left - w - 8 >= 12 ? mr.left - w - 8 : Math.min(mr.right + 8, innerWidth - w - 12)) + 'px';
    subMenu.style.top = Math.max(12, Math.min(br.top, innerHeight - subMenu.offsetHeight - 12)) + 'px';
  };
  const place = () => {
    const a = liveAnchor(anchor);
    if (!a) return close();
    anchor = a;
    placeAt(menu, anchor, align);
    placeSub();
  };
  const close = () => {
    closeSub(); layer.remove(); menu.remove(); anchor.classList.remove('on'); floating.delete(place);
    // Seit 4.11.0: den für das Kontextmenü dazugegebenen Platz unter der Liste wieder entfernen.
    document.querySelectorAll('.side-list[data-padded]').forEach(l => { l.style.paddingBottom = ''; delete l.dataset.padded; });
  };
  layer.onclick = close;
  menu.querySelectorAll('[data-i]').forEach(b => b.onclick = () => {
    const it = items[b.dataset.i];
    if (!it.submenu) { close(); it.act(); return; }
    // Untermenü neben dem Menü, oben bündig mit dem Eintrag; der Eintrag bleibt blau.
    const again = b.classList.contains('on');
    closeSub();
    if (again) return;
    b.classList.add('on');
    subMenu = document.createElement('div');
    subMenu.className = 'menu submenu';
    subMenu.setAttribute('role', 'menu');
    subMenu.innerHTML = menuHtml(it.submenu);
    subMenu.querySelectorAll('[data-i]').forEach(sb => sb.onclick = () => { close(); it.submenu[sb.dataset.i].act(); });
    host.append(subMenu);
    subItem = b;
    placeSub();
  });
  host.append(layer, menu);
  placeAt(menu, anchor, align);
  floating.add(place);
  // Seit 4.11.0: Kontextmenü (lange drücken) – nach dem Loslassen noch einmal ausrichten; erst dann lässt iOS
  // die Liste sicher rücken (R-4.2).
  if (align === 'beside') {
    const again = () => { document.removeEventListener('pointerup', again, true); document.removeEventListener('touchend', again, true); replaceSoon(); };
    document.addEventListener('pointerup', again, true);
    document.addEventListener('touchend', again, true);
  }
}

// Abfrage als Sprechblase an der angetippten Schaltfläche; daneben tippen bricht ab.
// Schaltflächen ohne Icons wie in Apple-Abfragen: die Aktion rot gefüllt, darunter der Weg zurück in normaler Schrift.
function confirmPop(anchor, html, act, back = { label: 'Abbrechen' }) {
  return choosePop(anchor, html, [{ label: act.label, cls: act.cls || 'danger', value: true }, { label: back.label, value: false }])
    .then(v => v === true);
}

// Seit 4.9.0: Abfrage mit mehreren Wegen (wie eine Apple-Abfrage mit drei Knöpfen): die bevorzugte Aktion blau
// gefüllt (cls 'primary'), eine zerstörende in roter Schrift (cls 'danger-text'), zuletzt der Weg zurück.
// Ergebnis: value des gewählten Knopfs; daneben tippen ergibt null.
function choosePop(anchor, html, buttons) {
  return new Promise(resolve => {
    const visible = anchor?.isConnected && anchor.getClientRects().length;
    const host = (visible && anchor.closest('dialog')) || (dlg.open ? dlg : document.body);
    const layer = blockingLayer();
    const pop = document.createElement('div');
    pop.className = 'pop';
    // Seit 4.10.0 (R-9.2): Wege mit Erklärung (desc) stehen je in einer eigenen Kachel – Erklärung, darunter der Knopf;
    // Wege ohne Erklärung (z. B. Abbrechen) darunter wie bisher.
    const btn = (b, i) => `<button type="button" class="${b.cls || ''}" data-i="${i}">${esc(b.label)}</button>`;
    const tiles = buttons.map((b, i) => b.desc ? `<div class="tile"><p>${b.desc}</p>${btn(b, i)}</div>` : '').join('');
    pop.innerHTML = `<p>${html}</p>${tiles ? `<div class="tiles">${tiles}</div>` : ''}<div class="btns">${buttons.map((b, i) => b.desc ? '' : btn(b, i)).join('')}</div>`;
    if (tiles) pop.classList.add('wide');
    if (visible) anchor.classList.add('on');
    const place = () => {
      if (!visible) { pop.style.left = (innerWidth - pop.offsetWidth) / 2 + 'px'; return; }
      const a = liveAnchor(anchor);
      // Schaltfläche nicht mehr zu sehen: die Abfrage bleibt offen und steht mittig (eine Entscheidung geht nicht verloren).
      if (!a) { pop.style.left = (innerWidth - pop.offsetWidth) / 2 + 'px'; pop.style.top = Math.max(12, (innerHeight - pop.offsetHeight) / 2) + 'px'; return; }
      anchor = a;
      placeAt(pop, anchor, anchor.classList.contains('side-row') ? 'beside' : anchor.getBoundingClientRect().left > innerWidth / 2 ? 'right' : 'left');
    };
    floating.add(place);
    const done = v => { floating.delete(place); layer.remove(); pop.remove(); if (visible) anchor.classList.remove('on'); resolve(v); };
    layer.onclick = () => done(null);
    pop.querySelectorAll('[data-i]').forEach(b => b.onclick = () => done(buttons[b.dataset.i].value));
    host.append(layer, pop);
    if (visible) placeAt(pop, anchor, anchor.classList.contains('side-row') ? 'beside' : anchor.getBoundingClientRect().left > innerWidth / 2 ? 'right' : 'left');
    else { pop.style.left = (innerWidth - pop.offsetWidth) / 2 + 'px'; pop.style.top = '120px'; }
  });
}

// Schaltflächen, von denen eine noch laufende Aktion kommt (Teilen-Menü, Meldung, Dateiauswahl), bleiben blau.
const held = new Set();
function hold(sel) { if (!sel) return; held.add(sel); document.querySelector(sel)?.classList.add('on'); }
function release(sel) { if (!sel) return; held.delete(sel); document.querySelector(sel)?.classList.remove('on'); }

// Die Schaltfläche oder Zeile, von der ein Fenster kommt, bleibt blau hinterlegt, solange es offen ist.
function setOpener(sel) {
  if (dlgOpener && dlgOpener !== sel) document.querySelector(dlgOpener)?.classList.remove('on');
  dlgOpener = sel;
  markOpener();
}
function markOpener() {
  if (dlgOpener) document.querySelector(dlgOpener)?.classList.add('on');
}

/* ---------- Backup erstellen und laden (R-9.1, R-9.2, seit 4.10.0) ---------- */

// Ergebnis des Teilen-Menüs als Text für das kleine Fenster (✅ bzw. ⚠️ davor).
const SHARE_RESULT = {
  shared: name => `Teilen-Menü abgeschlossen für <b>${esc(name)}</b>.<div class="hint">Wenn du ‚In Dateien sichern‘ gewählt hast, liegt die Datei im gewählten Ordner.</div>`,
  downloaded: name => `<b>${esc(name)}</b> wird geladen.<div class="hint">Du findest die Datei in der Dateien-App unter ‚Downloads‘.</div>`,
  aborted: name => `Teilen-Menü abgebrochen – <b>${esc(name)}</b> wurde nicht gespeichert.`,
  error: name => `<b>${esc(name)}</b> konnte nicht übergeben werden.`,
  print: name => `Drucken-Menü geöffnet für <b>${esc(name)}</b>.<div class="hint">Dort über ‚Teilen‘ → ‚In Dateien sichern‘ als PDF ablegen.</div>`,
};
const shareResultText = (result, name) => `${result === 'aborted' || result === 'error' ? '⚠️' : '✅'} ${SHARE_RESULT[result](name)}`;
const MIME = { json: 'application/json', html: 'text/html' };
// R-6.2 (seit 4.11.3): Mustertabelle der Ausgabe (Designrichtlinie allgemein 10) – eine Quelle für jede Ausgabe, Vorschau und
// jeden Bericht (z. B. HTML-Ausgabe des Reiselogbuchs, Abgleichbericht): Systemschrift 11 pt, h1 20 pt, h2 14 pt, Tabellen
// mit Linien 1 px #999 (außen und Kopf #a5a5a5), Kopf #d9d9d9 fett, jede zweite Zeile #f5f5f5, Zeilen nicht über
// Seitenumbrüche teilen, dezente letzte Zeile 9 pt grau. scope: Klasse des Inhalts (z. B. '.rt').
const outputCss = scope => `
  ${scope} { font: 11pt/1.4 -apple-system, "Segoe UI", Roboto, Arial, sans-serif; color: #000; }
  ${scope}, ${scope} * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  ${scope} h1 { font-size: 20pt; margin: 0 0 8px; }
  ${scope} h2 { font-size: 14pt; margin: 20px 0 6px; break-after: avoid; page-break-after: avoid; }
  ${scope} table { border-collapse: collapse; }
  ${scope} .meta td { border: none; padding: 1px 16px 1px 0; vertical-align: top; }
  ${scope} table.grid { width: 100%; margin-top: 12px; table-layout: auto; }
  ${scope} table.grid.fit { width: auto; }
  ${scope} table.grid th, ${scope} table.grid td { border: 1px solid #999; padding: 6px 8px; vertical-align: top; text-align: left; }
  ${scope} table.grid thead th { background: #d9d9d9; border-color: #a5a5a5; font-weight: 700; }
  ${scope} table.grid tr > :first-child { border-left-color: #a5a5a5; }
  ${scope} table.grid tr > :last-child { border-right-color: #a5a5a5; }
  ${scope} table.grid tbody:last-child tr:last-child > * { border-bottom-color: #a5a5a5; }
  ${scope} table.grid tbody tr:nth-child(even) { background: #f5f5f5; }
  ${scope} table.grid td.nw { white-space: nowrap; }
  ${scope} table.grid td.num, ${scope} table.grid th.num { text-align: right; white-space: nowrap; }
  ${scope} table.grid tr { break-inside: avoid; }
  ${scope} .created { margin-top: 28px; font-size: 9pt; color: #6b6b6b; }`;
// Dateien über das Teilen-Menü (iOS) weitergeben, sonst herunterladen. Ergebnis: shared · downloaded · aborted · error.
async function shareFiles(files) {
  const list = files.map(f => new File([f.content], f.name, { type: MIME[f.type] || 'application/octet-stream' }));
  if (navigator.canShare && navigator.canShare({ files: list })) {
    try { await navigator.share({ files: list }); return 'shared'; }
    catch (e) { return e.name === 'AbortError' ? 'aborted' : 'error'; }
  }
  files.forEach(f => downloadFile(f.name, f.content, MIME[f.type]));
  return 'downloaded';
}
function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
// ‚Letztes Backup erstellt am …‘ (je Gerät) und ob heute schon eins erstellt wurde (sonst ist die Backup-Kachel gelb).
const backupLastText = ms => ms ? `Letztes Backup erstellt am ${whenText(ms)}` : 'Noch kein Backup erstellt.';
const backupToday = ms => Boolean(ms) && new Date(ms).toDateString() === new Date().toDateString();
// Backup-Datei: ‚Ω Backup <App> JJJJ.MM.TT hh.mm.json‘, mit Zeitpunkt und Gerät (für den Abgleich, R-9.2).
function backupFileOf(app, data) {
  const n = new Date(), two = x => String(x).padStart(2, '0');
  return { name: `Ω Backup ${app} ${n.getFullYear()}.${two(n.getMonth() + 1)}.${two(n.getDate())} ${two(n.getHours())}.${two(n.getMinutes())}.json`, type: 'json',
    content: JSON.stringify({ ...data, savedAt: Date.now(), savedOn: deviceName() }, null, 2) };
}
// Backup-Kachel unten in der Seitenleiste bzw. Startliste: gelb, solange heute noch kein Backup erstellt wurde.
// Seit 4.15.0 (R-1.5): darunter grau die Zeile ‚Offline – …‘, solange die App offline arbeitet.
const backupTileHtml = ms => `<div class="side-foot"><div class="bhint ${backupToday(ms) ? 'ok' : ''}"><div>${backupLastText(ms)}</div>
      <button type="button" id="hintBackup">${ic('save')}Backup erstellen</button></div>${netLineHtml()}</div>`;

/* ---------- Offline-Hinweis (seit 4.15.0, R-1.5, A-06 Variante c) ---------- */
// Solange die App offline arbeitet, steht unter der Backup-Kachel (Seitenleiste bzw. Startliste) grau ‚Offline – alles
// bleibt auf diesem Gerät‘; beim Wechsel (und beim Start ohne Netz) erscheint unten kurz eine Meldung, mittig im freien
// Bereich neben einer sichtbaren Seitenleiste – sie verschwindet nach 4 s, Antippen schließt sie, sie sperrt nichts.
// Erkannt wird ‚Netz aus‘ über Safari (online/offline) und ‚Netz hängt‘ über den Service Worker der App: er liefert nach
// 3 s aus dem Speicher und meldet { netz: 'aus' | 'an' }; die Seite fragt ihn beim Start ({ netz: '?' }) und bei der
// Rückkehr in die App bzw. wenn Safari wieder Netz meldet ({ netz: 'pruefe' }).
let netState = 'an', netTimer = null, netClose = null;
const NET_TEXT = 'Offline – alles bleibt auf diesem Gerät';
const netLineHtml = () => `<div class="offl"${netState === 'aus' ? '' : ' hidden'}>${ic('wifi-off')}${NET_TEXT}</div>`;
const isOffline = () => netState === 'aus';
function placeNetToast() {
  const t = document.querySelector('.nettoast');
  if (!t) return;
  const side = document.getElementById('side');
  const r = side && !side.hidden && !document.documentElement.classList.contains('phone') ? side.getBoundingClientRect() : null;
  const left = r && r.width ? r.right : 0;
  // Mittig im freien Bereich; seitlich Platz für ‚Nach oben / Ans Ende‘ (72 px je Seite)
  t.style.setProperty('--toast-x', Math.round((left + innerWidth) / 2) + 'px');
  t.style.setProperty('--toast-w', Math.max(200, Math.round(innerWidth - left - (left || innerWidth >= 700 ? 144 : 32))) + 'px');
  // Über einer festen unteren Leiste (iPhone, .bbar), sonst am unteren Rand
  // iPhone-Startliste: über der Backup-Kachel (die Meldung verdeckt sie nicht)
  const bar = document.querySelector('.bbar')?.getBoundingClientRect();
  const tile = !left && side && !side.hidden ? side.querySelector('.side-foot .bhint')?.getBoundingClientRect() : null;
  const lift = Math.max(bar && bar.height ? innerHeight - bar.top : 0, tile && tile.height ? innerHeight - tile.top - 28 + 10 : 0);
  t.style.setProperty('--toast-lift', Math.round(lift) + 'px');
}
window.addEventListener('resize', () => requestAnimationFrame(placeNetToast));
function showNetToast(state) {
  netClose?.();   // höchstens eine Meldung zugleich (samt Beobachter)
  clearTimeout(netTimer);
  const t = document.createElement('div');
  t.className = 'nettoast';
  t.setAttribute('role', 'status');
  t.innerHTML = state === 'aus'
    ? `${ic('wifi-off')}<div><b>Du bist offline</b><small>Die App arbeitet weiter; alles bleibt auf diesem Gerät.</small></div>`
    : `${ic('wifi')}<div><b>Wieder online</b></div>`;
  // Über einem offenen Fenster sichtbar (oberste Ebene), ohne etwas zu sperren
  if (t.showPopover) t.popover = 'manual';
  document.body.appendChild(t);
  try { t.showPopover?.(); } catch {}
  placeNetToast();
  // Wechselt die Seite, solange die Meldung steht (z. B. iPhone: zurück in die Startliste), neu ausrichten
  const watch = new MutationObserver(() => requestAnimationFrame(placeNetToast));
  watch.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'class'] });
  const weg = netClose = () => { watch.disconnect(); t.remove(); netClose = null; };
  t.onclick = weg;
  netTimer = setTimeout(weg, 4000);
}
function setNet(state) {
  if (state !== 'aus' && state !== 'an') return;
  if (state === netState) return;
  netState = state;
  document.querySelectorAll('.offl').forEach(l => { l.hidden = state !== 'aus'; });
  showNetToast(state);
}
// Seit 4.15.1 (Fund P-39/1 und /2): Das iPad als Home-Bildschirm-App meldet den Wechsel nicht zuverlässig (keine
// Ereignisse offline/online, navigator.onLine bleibt stehen) – deshalb fragt die App, solange sie sichtbar ist, alle 10 s
// den Service Worker; die Ereignisse beschleunigen nur. Jede Frage hat eine laufende Nummer: Antworten auf Fragen, die vor
// einer Meldung ‚offline‘ von Safari gestellt wurden, gelten nicht (schnelles Hin und Her).
let netSeq = 0, netBlock = 0;
const netAsk = what => navigator.serviceWorker?.controller?.postMessage({ netz: what, id: ++netSeq });
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', e => {
    if (!e.data || !('netz' in e.data)) return;
    if (e.data.id && e.data.id <= netBlock) return;
    setNet(e.data.netz);
  });
  navigator.serviceWorker.startMessages?.();
}
window.addEventListener('offline', () => { netBlock = netSeq; setNet('aus'); });
window.addEventListener('online', () => { if (navigator.serviceWorker?.controller) netAsk('pruefe'); else setNet('an'); });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') netAsk('pruefe'); });
setInterval(() => { if (document.visibilityState === 'visible') netAsk('pruefe'); }, 10000);
// Beim Start: Safari meldet kein Netz → offline; sonst den Service Worker fragen (er weiß, ob die App aus dem Speicher kam).
const netStart = () => { if (navigator.onLine === false) setNet('aus'); else netAsk('?'); };
// Nicht erst bei ‚load‘ – das wartet bei hängendem Netz zusätzlich auf Manifest und Icons.
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', netStart); else setTimeout(netStart);
// Die beiden Einträge im Mehr-Menü der Seitenleiste.
const backupMenuEntries = ({ last, disabled, onSave, onLoad }) => [
  { icon: 'save', label: 'Backup erstellen', sub: backupLastText(last), disabled, act: onSave },
  { icon: 'folder-open', label: 'Backup laden', act: onLoad }];
// Backup-Datei lesen und prüfen; Ergebnis { data, savedAt, savedOn } – Fehler mit verständlichem Grund.
async function readBackup(file, list) {
  let data;
  try { data = JSON.parse(await file.text()); } catch (e) { throw new Error('Die Datei ist kein Backup (kein lesbarer Inhalt).'); }
  if (!data || !Array.isArray(data[list])) throw new Error('Die Datei ist kein Backup dieser App.');
  const savedAt = data.savedAt || file.lastModified, savedOn = data.savedOn;
  delete data.savedAt; delete data.savedOn;
  return { data, savedAt, savedOn };
}

/* ---------- Abgleich zwischen Geräten (R-9.2 bis R-9.4, seit 4.10.0) ---------- */

// Zeitpunkt als ‚12.10.2026 um 13:55‘.
function whenText(ms) {
  const d = new Date(ms), two = n => String(n).padStart(2, '0');
  return `${two(d.getDate())}.${two(d.getMonth() + 1)}.${d.getFullYear()} um ${two(d.getHours())}:${two(d.getMinutes())}`;
}

// Gemeinsamer Baustein für den Abgleich zwischen iPad und iPhone über ein Backup. Die App beschreibt ihre Daten:
//   const sync = createSync({ list: 'trips', sub: 'days', subAt: 'dayAt', maxFields: ['outputCounter'],
//                             nouns: ['Reiselogbuch', 'Reiselogbücher', 'Reiselogbüchern'] });
// list = Liste der Einträge (je Eintrag eine id und ein title), sub = Unterdaten je Schlüssel (z. B. Tage), subAt = Feld für deren
// Zeitpunkte, maxFields = Felder ohne Zeitpunkt, beim Abgleich gilt der größere Wert (z. B. Dateinummer).
// Jede Änderung bekommt je Feld Zeitpunkt und Gerät (metaAt = { Feld: Zeitpunkt }, subAt = { Schlüssel: { Feld: Zeitpunkt } },
// changedAt/changedOn für ‚geändert am … · Gerät‘). Gelöschte Einträge stehen in data.deleted ({ id, at, on }).
// R-9.3: je Feld gilt die neuere Änderung; gleich alt: das Vorhandene hier bleibt, Fehlendes kommt dazu.
// R-9.3: ein gelöschter Eintrag bleibt gelöscht, solange er danach nicht mehr geändert wurde – mit Hinweisen.
// Seit 4.11.0: labels – Namen der Felder für die Tabelle der Änderungen ({ title: 'Titel', … }); Unterdaten mit einem
// ISO-Datum als Schlüssel erscheinen als ‚Mo 12.10.2026‘, sonst über subLabel(key).
// Seit 4.12.1: values – je Feld, wie ein Wert im Abgleichbericht angezeigt wird ({ transport: v => … }), damit dort dasselbe
// steht wie in der App (R-10.1) und nicht der gespeicherte Wert (z. B. Kürzel).
function createSync({ list, sub, subAt, maxFields = [], nouns = ['Eintrag', 'Einträge', 'Einträgen'], labels = {}, values = {}, subLabel = null, app = document.title }) {
  const STAMPS = [sub, subAt, 'metaAt', 'changedAt', 'changedOn', ...maxFields];
  const metaKeys = e => Object.keys(e).filter(k => !STAMPS.includes(k));
  const metaObj = e => Object.fromEntries(metaKeys(e).map(k => [k, e[k]]));
  // Leere Felder ('' · false · null · []) gelten als nicht vorhanden: ein Fenster, das beim Sichern alle Felder schreibt,
  // überschreibt so beim Abgleich nichts mit ‚leer‘. Wird ein Feld geleert, zählt das als Änderung (es verschwindet).
  const filled = v => !(v === undefined || v === null || v === '' || v === false || (Array.isArray(v) && !v.length));
  const fieldsOf = o => Object.fromEntries(Object.entries(o || {}).filter(([, v]) => filled(v)).map(([k, v]) => [k, JSON.stringify(v)]));
  // Ältere Daten mit nur einem Zeitpunkt je Eintrag bzw. Unterdatum: der gilt für alle Felder.
  const metaTime = (e, k) => typeof e.metaAt === 'number' ? e.metaAt : e.metaAt?.[k] || 0;
  const subTime = (e, key, k) => { const a = e[subAt]?.[key]; return typeof a === 'number' ? a : a?.[k] || 0; };
  const snapshot = data => new Map(data[list].map(e => [e.id, { meta: fieldsOf(metaObj(e)),
    subs: Object.fromEntries(Object.entries(e[sub] || {}).map(([key, d]) => [key, fieldsOf(d)])) }]));
  // Vergleicht mit dem zuletzt gespeicherten Stand und stempelt jedes geänderte Feld; gibt den neuen Stand zurück.
  function stamp(data, before, now = Date.now(), on = deviceName()) {
    data.deleted ||= [];
    const next = snapshot(data);
    for (const e of data[list]) {
      const b = before.get(e.id), a = next.get(e.id);
      e[subAt] ||= {};
      if (typeof e.metaAt !== 'object' || !e.metaAt) e.metaAt = {};
      let changed = false;
      for (const k of new Set([...Object.keys(b?.meta || {}), ...Object.keys(a.meta)])) {
        if (!b || b.meta[k] !== a.meta[k]) { e.metaAt[k] = now; changed = true; }
      }
      for (const key of new Set([...Object.keys(b?.subs || {}), ...Object.keys(a.subs)])) {
        const bs = b?.subs[key] || {}, as = a.subs[key] || {};
        for (const k of new Set([...Object.keys(bs), ...Object.keys(as)])) {
          if (bs[k] !== as[k]) { if (typeof e[subAt][key] !== 'object' || !e[subAt][key]) e[subAt][key] = {}; e[subAt][key][k] = now; changed = true; }
        }
      }
      if (changed) { e.changedAt = now; e.changedOn = on; }
    }
    for (const id of before.keys()) if (!next.has(id)) data.deleted = [...data.deleted.filter(x => x.id !== id), { id, at: now, on }];
    return next;
  }
  // Letzte Änderung eines Datenbestands (geändert oder gelöscht).
  const latest = data => Math.max(0, ...data[list].map(e => e.changedAt || 0), ...(data.deleted || []).map(x => x.at || 0));
  // Seit 4.11.0 mit Feldlisten: taken – aus dem Backup übernommen (geleert: cleared), kept – hier neuer, das Backup ist älter.
  const same = (a, b) => (filled(a) ? JSON.stringify(a) : '') === (filled(b) ? JSON.stringify(b) : '');
  function mergeFields(l, r, timeL, timeR) {
    const out = {}, at = {}, taken = [], cleared = [], kept = [];
    for (const k of new Set([...Object.keys(l || {}), ...Object.keys(r || {})])) {
      const la = timeL(k), ra = timeR(k);
      const useR = ra > la || (ra === la && !filled(l?.[k]) && filled(r?.[k]));
      const v = useR ? r?.[k] : l?.[k];
      if (v !== undefined) out[k] = structuredClone(v);
      if (Math.max(la, ra)) at[k] = useR ? ra : la;
      if (same(l?.[k], r?.[k])) continue;
      if (useR) (filled(r?.[k]) ? taken : cleared).push({ k, v: r?.[k], old: l?.[k], at: ra, cleared: !filled(r?.[k]) });
      else kept.push({ k, v: l?.[k], old: r?.[k], at: la, cleared: !filled(l?.[k]) });
    }
    return { out, at, taken, cleared, kept, fromR: taken.length + cleared.length > 0 };
  }
  // Abgleichen: Ergebnis { data, stats } – stats: updated [{ title, subs, rows }] (rows: [{ key (null = Kopfdaten), fields:
  // [{ k, v, at, cleared }], at, on }]), added [{ title, subs, at, on }], removed [{ title, at, on }], keptDeleted [{ title, at,
  // on }], keptChanged [{ title, on }], newer [{ title, rows, only, at, on }] (hier neuer als im Backup), same (Anzahl unverändert).
  // on = Gerät der Änderung, soweit bekannt (sonst null: das Gerät des Backups bzw. dieses Gerät).
  function merge(local, remote) {
    const stats = { updated: [], added: [], removed: [], keptDeleted: [], keptChanged: [], newer: [], same: 0 };
    // Zeile der Tabelle: Felder, jüngster Zeitpunkt; Gerät, wenn es die letzte Änderung des Eintrags war.
    const row = (key, fields, e) => { const at = Math.max(0, ...fields.map(f => f.at || 0)); return { key, fields, at, on: at && at === e.changedAt ? e.changedOn : null }; };
    const del = new Map();
    for (const x of [...(local.deleted || []), ...(remote.deleted || [])]) if (!del.has(x.id) || del.get(x.id).at < x.at) del.set(x.id, x);
    const L = new Map(local[list].map(e => [e.id, e])), R = new Map(remote[list].map(e => [e.id, e]));
    const out = [];
    for (const id of new Set([...L.keys(), ...R.keys()])) {
      const l = L.get(id), r = R.get(id), gone = del.get(id);
      if (l && r) {
        const meta = mergeFields(metaObj(l), metaObj(r), k => metaTime(l, k), k => metaTime(r, k));
        const e = { id, ...meta.out, metaAt: meta.at, [sub]: {}, [subAt]: {} };
        const rows = [], newerRows = [];
        if (meta.taken.length + meta.cleared.length) rows.push(row(null, [...meta.taken, ...meta.cleared], r));
        if (meta.kept.length) newerRows.push(row(null, meta.kept, l));
        for (const key of [...new Set([...Object.keys(l[sub] || {}), ...Object.keys(r[sub] || {}), ...Object.keys(l[subAt] || {}), ...Object.keys(r[subAt] || {})])].sort()) {
          const d = mergeFields(l[sub]?.[key], r[sub]?.[key], k => subTime(l, key, k), k => subTime(r, key, k));
          if (Object.keys(d.out).length) e[sub][key] = d.out;
          if (Object.keys(d.at).length) e[subAt][key] = d.at;
          if (d.fromR) rows.push(row(key, [...d.taken, ...d.cleared], r));
          if (d.kept.length) newerRows.push(row(key, d.kept, l));
        }
        const subs = rows.filter(x => x.key !== null).length;
        const newer = (r.changedAt || 0) > (l.changedAt || 0) ? r : l;
        e.changedAt = newer.changedAt; e.changedOn = newer.changedOn;
        for (const k of maxFields) e[k] = Math.max(l[k] || 0, r[k] || 0);
        out.push(e);
        if (rows.length) stats.updated.push({ title: e.title, subs, rows }); else stats.same++;
        if (newerRows.length) stats.newer.push({ title: e.title, rows: newerRows });
      } else if (l) {
        if (gone && gone.at > (l.changedAt || 0)) stats.removed.push({ title: l.title, at: gone.at, on: gone.on });
        else {
          out.push(l); stats.same++;
          if (gone) stats.keptChanged.push({ title: l.title, on: gone.on });
          else stats.newer.push({ title: l.title, rows: [], only: true, subs: Object.keys(l[sub] || {}).length, at: l.changedAt, on: l.changedOn });   // nur hier
        }
      } else if (gone && gone.at >= (r.changedAt || 0)) {
        stats.keptDeleted.push({ title: r.title, at: gone.at, on: gone.on });
      } else {
        out.push(structuredClone(r)); stats.added.push({ title: r.title, subs: Object.keys(r[sub] || {}).length, at: r.changedAt, on: r.changedOn });
      }
    }
    return { data: { ...local, [list]: out, deleted: [...del.values()] }, stats };
  }
  // R-9.2: Abfrage beim Laden eines Backups – Zeitpunkt und Gerät, neuer oder älter, kurze Erklärung der Wege.
  function question(local, remote, savedAt, savedOn, unit = 'Tag') {
    const n = remote[list].length, here = deviceName(), mine = latest(local), theirs = latest(remote) || savedAt;
    const cmp = !mine ? '' : `<br>Es ist <b>${theirs > mine ? 'neuer' : theirs < mine ? 'älter' : 'gleich alt'}</b> ${theirs === mine ? 'wie' : 'als'} die Daten auf diesem ${here} (zuletzt geändert am ${whenText(mine)}).`;
    return `Backup vom <b>${whenText(savedAt)}</b>${savedOn ? ` (${esc(savedOn)})` : ''} mit ${n} ${n === 1 ? nouns[0] : nouns[2]}.${cmp}`;
  }
  // R-9.2: je Weg eine Kachel mit Erklärung und Knopf; Abbrechen darunter.
  const choices = (unit = 'Tag') => [
    { label: 'Abgleichen', cls: 'primary', value: 'merge', desc: `Je ${nouns[0]} und ${unit} gilt die neuere Fassung; gelöschte ${nouns[1]} werden auch hier gelöscht.` },
    { label: 'Ersetzen', cls: 'danger-text', value: 'replace', desc: `Alle Daten auf diesem ${deviceName()} werden durch das Backup ersetzt.` },
    { label: 'Abbrechen', value: null }];
  const ask = (anchor, local, remote, savedAt, savedOn) => choosePop(anchor, question(local, remote, savedAt, savedOn), choices());
  // R-9.4 (seit 4.11.0): Ergebnis in zwei Stufen. Das kleine Fenster ‚Abgleichen‘ nennt nur Backup (Gerät, Zeitpunkt) und
  // das Ergebnis in einem Satz; gibt es etwas zu berichten, öffnet die Schaltfläche ‚Abgleichbericht anzeigen‘ den Bericht –
  // eine Vorschau wie die Ausgabe der App (weiß, Tabellen mit grauem Kopf, teilbar als HTML). Ohne jede Änderung bleibt es bei
  // ‚Alles war schon auf dem gleichen Stand.‘ ohne Schaltfläche. here: dieses Gerät; savedOn: Gerät des Backups.
  const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const two = n => String(n).padStart(2, '0');
  const keyText = key => subLabel ? subLabel(key) : /^\d{4}-\d{2}-\d{2}$/.test(key)
    ? (([y, m, d]) => `${WD[new Date(y, m - 1, d).getDay()]}, ${d}.${m}.${y}`)(key.split('-')) : key;
  const valueText = (v, k) => !filled(v) ? '–' : values[k] ? String(values[k](v)) : typeof v === 'boolean' ? (v ? 'ja' : 'nein') : Array.isArray(v) ? v.join(', ') : String(v);
  const anything = st => st.updated.length + st.added.length + st.removed.length > 0;
  const worthReport = st => anything(st) || (st.newer || []).length + st.keptDeleted.length + st.keptChanged.length > 0;
  function resultText(stats, savedAt, savedOn, here = deviceName()) {
    const head = `✅ Abgeglichen mit dem Backup ${savedOn ? `vom <b>${esc(savedOn)}</b> ` : ''}(${whenText(savedAt)}).`;
    if (anything(stats)) return `${head}<br><br>Auf diesem ${esc(here)} hat sich etwas geändert – Einzelheiten im Abgleichbericht.`;
    if (worthReport(stats)) return `${head}<br><br>Auf diesem ${esc(here)} hat sich nichts geändert – Hinweise im Abgleichbericht.`;
    return `${head}<br><br>Alles war schon auf dem gleichen Stand.`;
  }
  // Tabellen wie die HTML-Ausgabe der App (R-6.2): Linien 1 px #999, Kopf #d9d9d9 mit Rand #a5a5a5, überall gleich stark.
  // Bericht: Kopf mit Gerät, Backup und Ergebnis; Tabelle ‚Änderungen auf diesem Gerät‘ (je Feld eine Zeile mit neuem Inhalt,
  // vorherigem Inhalt, Gerät und Zeitpunkt), Tabelle ‚Auf diesem Gerät neuer als im Backup – bleibt so‘, Hinweise, Unverändertes.
  // Tabellen und Schrift aus der Mustertabelle der Ausgabe (outputCss, R-6.2); hier nur, was der Bericht zusätzlich braucht:
  // feste Spaltenbreiten, Umbruch mit Silbentrennung (R-6.3), Eintrag-Zelle über ihre Zeilen weiß, Farben für neu/gelöscht.
  const REPORT_CSS = outputCss('.sync-report') + `
    .sync-report table.grid { table-layout: fixed; }
    .sync-report table.grid col.c1 { width: 15%; } .sync-report table.grid col.c2 { width: 13%; } .sync-report table.grid col.c3 { width: 13%; }
    .sync-report table.grid col.c4 { width: 22%; } .sync-report table.grid col.c5 { width: 14%; } .sync-report table.grid col.c6 { width: 10%; } .sync-report table.grid col.c7 { width: 13%; }
    .sync-report table.grid td, .sync-report table.grid th { overflow-wrap: break-word; -webkit-hyphens: auto; hyphens: auto; }
    .sync-report table.grid tbody th { font-weight: 700; }
    /* Grau je Tabellenzeile = je Eintrag (zusammengefasste erste Spalte), nicht je Feldzeile. */
    .sync-report table.grid tbody tr:nth-child(even) { background: none; }
    .sync-report table.grid tbody.z > tr { background: #f5f5f5; }
    .sync-report .new { color: #0a5bd3; font-weight: 600; } .sync-report .del { color: #c0362c; font-weight: 600; }
    .sync-report .old { color: #555; }
    .sync-report p { margin: 8px 0; }`;
  const atText = at => at ? (d => `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${two(d.getHours())}:${two(d.getMinutes())}`)(new Date(at)) : '–';
  // Eine Gruppe je Eintrag; je Feld eine Zeile; Eintrag und Tag über ihre Zeilen zusammengefasst (rowspan).
  // Je Reiselogbuch (allgemein: Eintrag) eine Tabellenzeile: sein Name ist in der ersten Spalte über alle seine Feldzeilen
  // zusammengefasst, Tag, Gerät und Zeitpunkt je Tag. Zusammengefasste Zellen in der ersten Spalte gelten als eine
  // Tabellenzeile – alle Zellen dahinter haben ihre Farbe, weiß und grau wechseln je Eintrag (R-6.2).
  function reportTable(groups, cols) {
    const body = groups.map((g, k) => {
      const lines = g.rows.flatMap(r => r.fields.map((f, i) => ({ r, f, first: !i })));
      return `<tbody data-kind="${g.kind}" data-title="${esc(g.title)}"${k % 2 ? ' class="z"' : ''}>${lines.map((x, i) => `<tr>${i ? '' : `<th scope="rowgroup" rowspan="${lines.length}">${esc(g.title)}</th>`}${
        x.first ? `<td rowspan="${x.r.fields.length}">${x.r.key === null ? '–' : esc(keyText(x.r.key))}</td>` : ''}<td>${x.f.label}</td><td>${x.f.now}</td><td class="old">${x.f.before}</td>${
        x.first ? `<td rowspan="${x.r.fields.length}">${esc(x.r.on || '–')}</td><td rowspan="${x.r.fields.length}">${atText(x.r.at)}</td>` : ''}</tr>`).join('')}</tbody>`;
    }).join('');
    return `<table class="grid"><colgroup>${[1, 2, 3, 4, 5, 6, 7].map(i => `<col class="c${i}">`).join('')}</colgroup><thead><tr><th>${esc(nouns[0])}</th><th>Tag</th><th>Feld</th><th>${cols[0]}</th><th>${cols[1]}</th><th>Vom Gerät</th><th>Geändert am</th></tr></thead>${body}</table>`;
  }


  const fieldRows = (rows, dflt) => (rows || []).map(r => ({ key: r.key, on: r.on || dflt, at: r.at, fields: r.fields.map(f => ({
    label: esc(labels[f.k] || f.k), now: f.cleared ? '<i>geleert</i>' : esc(valueText(f.v, f.k)).replace(/\n/g, '<br>'), before: esc(valueText(f.old, f.k)).replace(/\n/g, '<br>') })) }));
  const one = (now, n, unit) => [{ key: null, on: null, at: 0, fields: [{ label: '–', now: `${now}${n ? ` (${n} ${n === 1 ? unit[0] : unit[1]})` : ''}`, before: '–' }] }];
  function reportHtml(stats, savedAt, savedOn, here = deviceName(), unit = ['Tag', 'Tage'], now = Date.now()) {
    const { updated, added, removed, keptDeleted, keptChanged, same } = stats, newer = stats.newer || [];
    const withBy = (rows, on, at) => rows.map(r => ({ ...r, on, at }));
    const groups = [
      ...updated.map(u => ({ title: u.title, kind: 'updated', rows: fieldRows(u.rows, savedOn) })),
      ...added.map(a => ({ title: a.title, kind: 'added', rows: withBy(one('<span class="new">neu angelegt</span>', a.subs, unit), a.on || savedOn, a.at) })),
      ...removed.map(r => ({ title: r.title, kind: 'removed', rows: withBy(one('<span class="del">gelöscht</span>', 0, unit), r.on || savedOn, r.at) }))];
    const newerGroups = newer.map(n => ({ title: n.title, kind: 'newer', rows: n.only
      ? withBy(one('<span class="new">nur hier vorhanden</span>', n.subs, unit), n.on || here, n.at) : fieldRows(n.rows, here) }));
    const count = (n, w) => n ? [`${n} ${w}`] : [];
    const result = [...count(updated.length, 'aktualisiert'), ...count(added.length, 'neu'), ...count(removed.length, 'gelöscht'), ...count(same, 'unverändert')].join(' · ') || '–';
    const notes = [];
    if (keptDeleted.length) notes.push(`<b>Auf diesem ${esc(here)} gelöscht, im Backup vom ${savedOn ? esc(savedOn) : 'anderen Gerät'} noch vorhanden:</b> ${keptDeleted.map(k => `${esc(k.title)} (gelöscht am ${whenText(k.at)})`).join(', ')} – ${keptDeleted.length === 1 ? 'bleibt' : 'bleiben'} gelöscht. Zurückholen nur mit ‚Backup laden‘ → ‚Ersetzen‘ (ersetzt alle Daten auf diesem ${esc(here)}).`);
    for (const on of [...new Set(keptChanged.map(k => k.on))]) {
      const l = keptChanged.filter(k => k.on === on), other = !(on || savedOn) ? 'dem anderen Gerät' : (on || savedOn) === here ? `dem anderen ${esc(on || savedOn)}` : `dem ${esc(on || savedOn)}`;
      notes.push(`<b>Auf ${other} gelöscht, auf diesem ${esc(here)} danach noch geändert:</b> ${l.map(k => esc(k.title)).join(', ')} – ${l.length === 1 ? 'bleibt' : 'bleiben'} erhalten.`);
    }
    return `<div class="sync-report" lang="de"><style>${REPORT_CSS}</style>
      <h1>Abgleichbericht</h1>
      <table class="meta"><tr><td><b>Abgeglichen am:</b></td><td>${whenText(now)} auf diesem ${esc(here)}</td></tr>
        <tr><td><b>Backup:</b></td><td>vom ${savedOn ? esc(savedOn) : 'anderen Gerät'}, erstellt am ${whenText(savedAt)}</td></tr>
        <tr><td><b>Ergebnis:</b></td><td>${result} (${esc(nouns[1])})</td></tr></table>
      <h2>Änderungen auf diesem ${esc(here)}</h2>
      ${groups.length ? reportTable(groups, ['Neu', 'Vorher']) : '<p>Keine – hier hat sich nichts geändert.</p>'}
      ${same ? `<p>${same === 1 ? `1 ${esc(nouns[0])} ist` : `${same} ${esc(nouns[1])} sind`} unverändert.</p>` : ''}
      ${newerGroups.length ? `<h2>Auf diesem ${esc(here)} neuer als im Backup – bleibt so</h2>${reportTable(newerGroups, [`Auf diesem ${esc(here)}`, 'Im Backup'])}
        <p>Damit das ${savedOn ? esc(savedOn) : 'andere Gerät'} diesen Stand bekommt: hier ‚Backup erstellen‘, dort ‚Backup laden‘ → ‚Abgleichen‘.</p>` : ''}
      ${notes.length ? `<h2>Hinweise</h2>${notes.map(n => `<p>ℹ️ ${n}</p>`).join('')}` : ''}
      <div class="created">Erstellt mit ${esc(app)} am ${whenText(now)}</div></div>`;
  }
  const reportName = (now = Date.now()) => (d => `Abgleichbericht ${app} ${d.getFullYear()}.${two(d.getMonth() + 1)}.${two(d.getDate())} ${two(d.getHours())}.${two(d.getMinutes())}`)(new Date(now));
  // Bericht als Vorschau (wie die Ausgabe der App, immer hell), oben rechts Teilen (HTML-Datei).
  function openReport(stats, savedAt, savedOn) {
    const now = Date.now(), html = reportHtml(stats, savedAt, savedOn, deviceName(), undefined, now), name = reportName(now);
    openDialog(`
      <form method="dialog">
        ${dlgHead('Abgleichbericht', { sub: esc(name), check: false, right: `<span class="grp"><button type="button" class="txt" id="repPdf">${ic('file-text')}PDF</button><button type="button" class="fill" id="repShare" aria-label="Teilen">${ic('share')}</button></span>` })}
        <div class="dlg-body sync-preview">${html}</div>
      </form>`, true);
    // PDF wie bei der Ausgabe: über das Drucken-Menü, der Dateiname wird als Seitentitel vorgeschlagen (#printout, design.css).
    dlg.querySelector('#repPdf').onclick = () => {
      let out = document.getElementById('printout');
      if (!out) { out = document.createElement('div'); out.id = 'printout'; document.body.append(out); }
      out.innerHTML = html;
      const old = document.title;
      document.title = name;
      const restore = () => { document.title = old; out.innerHTML = ''; window.removeEventListener('afterprint', restore); };
      window.addEventListener('afterprint', restore);
      inform('Abgleichbericht', shareResultText('print', name + '.pdf'));
      setTimeout(() => window.print(), 50);
    };
    dlg.querySelector('#repShare').onclick = async () => {
      const result = await shareFiles([{ name: name + '.html', type: 'html', content: `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(name)}</title><style>body { margin: 24px; background: #fff; }</style></head><body>${html}</body></html>` }]);
      inform('Abgleichbericht', shareResultText(result, name + '.html'));
    };
  }
  // R-9.4: dritte Zeile der Kachel.
  const changedLine = e => e.changedAt ? `<small class="chg">geändert am ${whenText(e.changedAt)}${e.changedOn ? ' · ' + esc(e.changedOn) : ''}</small>` : '';
  // R-9.4: kleines Fenster nach dem Abgleichen; mit Schaltfläche zum Bericht, wenn es etwas zu berichten gibt.
  const showResult = (stats, savedAt, savedOn, title = 'Abgleichen') => inform(title, resultText(stats, savedAt, savedOn),
    worthReport(stats) ? { action: { label: 'Abgleichbericht anzeigen', icon: 'eye', run: () => openReport(stats, savedAt, savedOn) } } : {});
  return { snapshot, stamp, latest, merge, question, choices, ask, resultText, reportHtml, openReport, showResult, changedLine, config: { list, sub, subAt, maxFields, nouns, labels, values, app } };
}

/* ---------- Meldungen und Sicherheitsabfragen ---------- */

// Kleines Fenster mit rundem x; Abfragen mit Entscheidung sind Sprechblasen (confirmPop).
// Seit 4.11.0: { wide: true } – breiteres Fenster; { action: { label, icon, run } } – eine blaue Schaltfläche unter dem
// Text (z. B. ‚Abgleichbericht anzeigen‘, R-9.4): schließt das Fenster und führt run() aus.
function inform(title, html, { wide = false, action = null } = {}) {
  return new Promise(resolve => {
    msg.classList.toggle('wide', wide);
    msg.innerHTML = `
      <form method="dialog">
        <div class="dlg-head"><div class="hl"><button type="button" class="round" data-x aria-label="Schließen">${ic('x')}</button></div>
          <div class="mid"><h3>${esc(title)}</h3></div><div class="hr"></div></div>
        <div class="dlg-body"><div class="msg-text">${html}</div>${action ? `<div class="msg-btns"><button type="button" class="primary" data-act>${action.icon ? ic(action.icon) : ''}${esc(action.label)}</button></div>` : ''}</div>
      </form>`;
    const done = () => { if (msg.open) msg.close(); resolve(); };
    if (action) msg.querySelector('[data-act]').onclick = () => { done(); action.run(); };
    msg.querySelector('[data-x]').onclick = done;
    msg.oncancel = e => { e.preventDefault(); done(); };
    showModalQuiet(msg);
    placeDialogs();
  });
}

/* ---------- Dialoge ---------- */

// Der Dialog bleibt offen und bekommt nur neuen Inhalt; so kommt kein verspätetes Schließ-Ereignis an.
function openDialog(html, wide = false) {
  if (typeof onDialogOpen === 'function') onDialogOpen(); // App-Haken, z. B. automatisches Speichern beenden
  dlg.classList.toggle('wide', wide);
  dlg.onclose = null;
  dlgDirty = null;
  dlg.innerHTML = html;
  dlg.returnValue = '';
  if (!dlg.open) showModalQuiet(dlg);
  placeDialogs();
  dlg.querySelector('.dlg-body')?.scrollTo(0, 0);
  const x = dlg.querySelector('#dlgX');
  // x schließt; wurde etwas geändert, fragt eine Sprechblase, ob die Änderungen verworfen werden sollen.
  if (x) x.onclick = async () => {
    if (dlgDirty?.() && !await confirmPop(x, 'Die Änderungen in diesem Fenster gehen verloren.',
      { label: 'Änderungen verwerfen', icon: 'trash' }, { label: 'Weiter bearbeiten', icon: 'pencil' })) return;
    dlg.close('cancel');
  };
  markOpener();
  mountCap(dlg);
  growAll();
  requestAnimationFrame(growAll);
}

// Kopfzeile der Fenster: rundes x links, Titel (mit grauer Zusatzzeile) in der Mitte,
// rechts weitere Schaltflächen und das runde Häkchen (grau, bis etwas geändert wurde).
function dlgHead(title, { sub = '', right = '', check = true } = {}) {
  return `<div class="dlg-head">
      <div class="hl"><button type="button" class="round" id="dlgX" aria-label="${check ? 'Abbrechen' : 'Schließen'}">${ic('x')}</button></div>
      <div class="mid"><h3>${title}</h3><span class="sub" id="dlgSub">${sub}</span></div>
      <div class="hr">${right}${check ? `<button class="round" value="ok" id="dlgOk" aria-label="Fertig">${ic('check')}</button>` : ''}</div>
    </div>`;
}

// Häkchen blau, sobald etwas geändert wurde; Textfelder wachsen mit.
function refreshOk() {
  dlg.querySelector('#dlgOk')?.classList.toggle('primary', Boolean(dlgDirty?.()));
  growAll();
  placeDialogs();
}
// Seit 4.3.0: Der erste Buchstabe jeder Zeile (und nach . ! ?) wird groß – iOS macht das nicht zuverlässig,
// z. B. nach einem Smiley am Zeilenanfang. Seit 4.4.0 schon vor der Eingabe (beforeinput), damit die Tastatur nicht
// zurückschreibt; capNext(feld) macht auch den nächsten Buchstaben groß (z. B. nach einem Vorschlag ‚Freetour …‘).
function capNext(f) { f.dataset.capNext = '1'; }
function capWanted(f, pos) {
  if (f.dataset.capNext) return true;
  const before = f.value.slice(f.value.lastIndexOf('\n', pos - 1) + 1, pos);
  return !/[\p{L}\p{N}]/u.test(before) || /[.!?]\s+$/.test(before);
}
function capBefore(e) {
  const f = e.target;
  if (e.inputType !== 'insertText' || !e.data || !/^\p{Ll}/u.test(e.data) || !f.matches?.('textarea, input[type=text]')) return;
  const start = f.selectionStart, end = f.selectionEnd;
  if (!capWanted(f, start)) return;
  e.preventDefault();
  delete f.dataset.capNext;
  f.setRangeText(e.data.charAt(0).toLocaleUpperCase('de') + e.data.slice(1), start, end, 'end');
  f.dispatchEvent(new Event('input', { bubbles: true }));
}
// Rückfall, falls die Eingabe nicht abgefangen werden konnte: Buchstabe nachträglich groß machen.
function autoCapital(e) {
  const f = e.target;
  if (e.inputType !== 'insertText' || !e.data || !f.matches?.('textarea, input[type=text]')) return;
  const pos = f.selectionStart;
  const ch = f.value.charAt(pos - 1);
  if (!/^\p{Ll}$/u.test(ch)) { if (/\p{L}/u.test(ch)) delete f.dataset.capNext; return; }
  if (!capWanted(f, pos - 1)) return;
  delete f.dataset.capNext;
  f.setRangeText(ch.toLocaleUpperCase('de'), pos - 1, pos, 'end');
}
dlg.addEventListener('beforeinput', capBefore);
dlg.addEventListener('input', autoCapital);
dlg.addEventListener('input', refreshOk);
dlg.addEventListener('change', refreshOk);
dlg.addEventListener('click', () => setTimeout(refreshOk));
// Escape wirkt wie das x.
dlg.addEventListener('cancel', e => { e.preventDefault(); dlg.querySelector('#dlgX')?.click(); });
msg.addEventListener('close', unlockPage);
dlg.addEventListener('close', () => {
  unlockPage();
  if (dlg.open) return;
  if (dlgOpener) document.querySelector(dlgOpener)?.classList.remove('on');
  dlgOpener = '';
});

// Auswahl-Kapsel: Schaltflächen in einer Kapsel; ist sie zu schmal, lässt sich der Inhalt wischen,
// ein Verlauf am Rand zeigt, wo es weitergeht.
const capHtml = (buttons, id = '') => `<div class="cap"><div class="scroll" ${id ? `id="${id}"` : ''}>${buttons}</div></div>`;
function mountCap(root) {
  root.querySelectorAll('.cap .scroll').forEach(strip => {
    const fade = () => {
      strip.classList.toggle('fl', strip.scrollLeft > 2);
      strip.classList.toggle('fr', strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 2);
    };
    strip.addEventListener('scroll', fade, { passive: true });
    requestAnimationFrame(fade);
  });
}

/* ---------- iPhone ---------- */

// Wie Apple: auf dem iPhone (hoch und quer) und in sehr schmalen Fenstern gilt die kompakte Ansicht –
// eine Seite nach der anderen, Fenster bildschirmfüllend. <html> bekommt dann die Klasse 'phone'.
// Die App fragt isPhone() und baut ihre Seiten danach; bei einem Wechsel ruft ihr resize-Handler render().
const isPhone = () => innerWidth < 700 || innerHeight < 500;
// Seit 4.9.0: Name des Geräts für ‚geändert am … · iPad‘ und den Abgleich (iPadOS meldet sich als Mac mit Touch).
function deviceName() {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return 'iPhone';
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'iPad';
  return isPhone() ? 'iPhone' : 'iPad';
}
function applyLayout() { document.documentElement.classList.toggle('phone', isPhone()); }
applyLayout();
window.addEventListener('resize', applyLayout);

// Großer Titel (iPhone): sobald er unter die Leiste geschoben ist, steht er klein in der Leiste (.pnav.titled).
// Die Leiste bekommt beim Scrollen eine Haarlinie. Die App ruft updateBar() nach jedem Aufbau der Seite.
function updateBar() {
  const bar = document.querySelector('.pnav, .nb');
  if (!bar) return;
  bar.classList.toggle('line', scrollY > 4);
  if (bar.classList.contains('pnav')) document.documentElement.style.setProperty('--pnav-h', bar.offsetHeight + 'px');
  const big = document.querySelector('.ltitle');
  // Ohne großen Titel steht der Titel immer in der Leiste.
  if (bar.classList.contains('pnav')) bar.classList.toggle('titled', !big || big.getBoundingClientRect().bottom < bar.getBoundingClientRect().bottom);
}
window.addEventListener('scroll', updateBar, { passive: true });
window.addEventListener('resize', updateBar);

// R-8.1 (seit 4.11.2): Beim Drehen (und jeder anderen Größenänderung) bleibt oben derselbe Eintrag stehen. Safari kennt
// keinen Scroll-Anker – ohne Hilfe springt die Seite, weil sich die Höhen beim Drehen ändern. Gemerkt wird beim Scrollen
// der oberste sichtbare Eintrag unter der Leiste (Elemente mit data-day bzw. data-keep) samt Abstand; nach einer
// Größenänderung (auch nach dem Neuaufbau durch die App) wird er wieder an dieselbe Stelle gerückt.
const KEEP_SEL = '#app [data-day], #app [data-keep]';
// Als Drehen zählt eine neue Breite oder eine um mehr als 150 px andere Höhe (Leisten von Safari ändern sie weniger).
let keepTop = null, keepWidth = innerWidth, keepHeight = innerHeight, keepBusy = false;
const keepTurned = () => innerWidth !== keepWidth || Math.abs(innerHeight - keepHeight) > 150;
const keepEdge = () => document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
const keepKey = e => e.dataset.day ? `[data-day="${CSS.escape(e.dataset.day)}"]` : `[data-keep="${CSS.escape(e.dataset.keep)}"]`;
function rememberTop() {
  if (keepBusy || keepTurned()) return;   // während des Drehens nichts überschreiben
  if (scrollY < 4) { keepTop = null; return; }       // ganz oben bleibt ganz oben
  const edge = keepEdge();
  const e = [...document.querySelectorAll(KEEP_SEL)].find(x => x.getClientRects().length && x.getBoundingClientRect().bottom > edge + 1);
  // Abstand als Anteil der Höhe: nach dem Drehen ist der Eintrag anders hoch, der sichtbare Teil bleibt gleich.
  keepTop = e ? { sel: keepKey(e), part: (e.getBoundingClientRect().top - edge) / (e.getBoundingClientRect().height || 1) } : null;
}
function restoreTop() {
  keepWidth = innerWidth; keepHeight = innerHeight;
  if (!keepTop) return;
  const e = [...document.querySelectorAll(KEEP_SEL.split(', ').map(s => `${s.split(' ')[0]} ${keepTop.sel}`).join(', '))].find(x => x.getClientRects().length);
  if (!e) return;
  keepBusy = true;
  const r = e.getBoundingClientRect();
  window.scrollBy(0, Math.round(r.top - keepEdge() - keepTop.part * r.height));
  requestAnimationFrame(() => { keepBusy = false; });
}
window.addEventListener('scroll', () => { if (!keepBusy) rememberTop(); }, { passive: true });
window.addEventListener('resize', () => { if (!keepTurned()) return; requestAnimationFrame(() => requestAnimationFrame(restoreTop)); setTimeout(restoreTop, 350); });

// R-2.1: Die Leiste (mit oder ohne Suchzeile) bewegt sich beim Wischen keinen Millimeter.
// Bei offener Tastatur würde iOS beim Wischen den sichtbaren Bereich verschieben; die Leiste müsste ihm
// hinterherlaufen und zittert. Deshalb schließt das erste Wischen nur die Tastatur – die Seite bewegt sich
// bei diesem Wischen nicht (seit 4.8.1; 4.8.0 ließ die Seite dabei schon scrollen). Das nächste Wischen scrollt.
document.addEventListener('touchmove', e => {
  const a = document.activeElement;
  if (!a?.matches?.('.searchbox input') || e.target.closest?.('.searchbox, dialog')) return;
  if (e.cancelable) e.preventDefault();
  a.blur();
}, { passive: false });

/* ---------- Tastatur und sichtbarer Bereich ---------- */

// Bei offener Tastatur verkleinert und verschiebt Safari den sichtbaren Bereich. Kopfzeile, Tabellenkopf
// und alle Fenster richten sich danach: die Kopfzeilen bleiben sichtbar, nur der Inhalt scrollt.
function placeDialogs() {
  const vv = window.visualViewport;
  const top = vv ? Math.max(0, vv.offsetTop) : 0;
  const h = vv ? vv.height : innerHeight;
  const full = isPhone();
  const root = document.documentElement.style;
  root.setProperty('--vv-top', top + 'px');
  // Abstand der Tastatur vom unteren Rand: die untere Leiste (iPhone) bleibt darüber sichtbar.
  root.setProperty('--vv-bottom', Math.max(0, Math.round(innerHeight - top - h)) + 'px');
  root.setProperty('--dlg-max', Math.max(200, full ? h : h - 20) + 'px');
  [dlg, msg].forEach(d => {
    if (!d.open) return;
    // iPhone: das Fenster füllt den sichtbaren Bereich (bei offener Tastatur bis zur Tastatur).
    if (full && d === dlg) { d.style.margin = '0'; d.style.bottom = 'auto'; d.style.top = Math.round(top) + 'px'; return; }
    // Fenster im sichtbaren Bereich zentrieren (bei offener Tastatur oberhalb der Tastatur).
    d.style.margin = '0 auto';
    d.style.bottom = 'auto';
    d.style.top = Math.round(top + Math.max(10, (h - d.offsetHeight) / 2)) + 'px';
  });
}
if (window.visualViewport) {
  visualViewport.addEventListener('scroll', placeDialogs);
  visualViewport.addEventListener('resize', placeDialogs);
}
// Seit 4.9.1 (R-4.5): wächst ein Fenster nach dem Öffnen (Inhalt, Textfelder), wird es neu platziert –
// es ragt nie über den Bildschirm hinaus.
if (window.ResizeObserver) [dlg, msg].forEach(d => new ResizeObserver(() => { if (d.open) placeDialogs(); }).observe(d));
// Das angetippte Feld im Fenster in den sichtbaren Teil rollen, sobald die Tastatur offen ist.
dlg.addEventListener('focusin', e => {
  if (!e.target.matches('input, textarea')) return;
  setTimeout(() => { placeDialogs(); e.target.scrollIntoView({ block: 'nearest' }); }, 350);
});
