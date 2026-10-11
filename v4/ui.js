// AppDesign 4.7.0 · ui.js – gemeinsame Bausteine der iPad-Web-Apps von g811141a (Apple-like)
// Einbinden am Ende von <body>, vor dem Skript der App:  <script src="../AppDesign/v4/ui.js"></script>
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
// Seit 4.7.0: Sehr lange Wörter (über 20 Zeichen) bekommen unsichtbare Umbruchstellen, damit sie auch in Tabellen
// im Wort umbrechen, statt über die Zelle hinauszuragen (R-37). Normale Wörter bleiben ganz.
function breakable(text) {
  return String(text ?? '').replace(/\S{21,}/gu, w => Array.from(w).reduce((acc, ch, i) => acc + (i && i % 12 === 0 ? '\u200B' : '') + ch, ''));
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
  const r = anchor.getBoundingClientRect();
  const w = el.offsetWidth, h = el.offsetHeight;
  // 'beside': rechts neben dem Eintrag (Kontextmenü in der Seitenleiste), oben bündig.
  let left = align === 'right' ? r.right - w : align === 'beside' ? r.right - 40 : r.left;
  left = Math.max(12, Math.min(left, innerWidth - w - 12));
  let top = align === 'beside' ? r.top : r.bottom + 8;
  if (top + h > innerHeight - 12) top = Math.max(12, align === 'beside' ? innerHeight - h - 12 : r.top - h - 8);
  el.style.left = left + 'px';
  el.style.top = top + 'px';
}

// Einträge: { icon, label, sub, red, tick, disabled, act } (tick und icon zusammen: Häkchen vorne, dann Icon und Text) · { …, value, submenu: [Einträge] } (Untermenü ›, eine Ebene)
// · 'sep' (Abstand) · 'line' (Strich) · { note } (graue Zeile).
const menuHtml = items => items.map((it, i) => it === 'sep' ? '<div class="sep"></div>' : it === 'line' ? '<div class="line"></div>'
  : it.note ? `<div class="note">${esc(it.note)}</div>`
  : `<button type="button" class="mi ${it.red ? 'red' : ''} ${it.sub ? 'has-sub' : ''}" data-i="${i}" ${it.disabled ? 'disabled' : ''} role="menuitem">${
      'tick' in it ? `<span class="tick">${it.tick ? ic('check') : ''}</span>` : ''}${it.icon ? ic(it.icon) : ''}${esc(it.label)}${
      it.value ? `<span class="val">${esc(it.value)}</span>` : ''}${it.submenu ? ic('chevron-right', 'chev') : ''}</button>${
      it.sub ? `<div class="sub">${esc(it.sub)}</div>` : ''}`).join('');
function openMenu(anchor, items, align = 'right') {
  const host = anchor.closest('dialog') || document.body;
  const layer = blockingLayer();
  const menu = document.createElement('div');
  menu.className = 'menu';
  menu.setAttribute('role', 'menu');
  menu.innerHTML = menuHtml(items);
  let subMenu = null;
  const closeSub = () => { subMenu?.remove(); subMenu = null; menu.querySelector('.mi.on')?.classList.remove('on'); };
  anchor.classList.add('on');
  const close = () => { closeSub(); layer.remove(); menu.remove(); anchor.classList.remove('on'); };
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
    const mr = menu.getBoundingClientRect(), br = b.getBoundingClientRect(), w = subMenu.offsetWidth;
    subMenu.style.left = (mr.left - w - 8 >= 12 ? mr.left - w - 8 : Math.min(mr.right + 8, innerWidth - w - 12)) + 'px';
    subMenu.style.top = Math.max(12, Math.min(br.top, innerHeight - subMenu.offsetHeight - 12)) + 'px';
  });
  host.append(layer, menu);
  placeAt(menu, anchor, align);
}

// Abfrage als Sprechblase an der angetippten Schaltfläche; daneben tippen bricht ab.
// Schaltflächen ohne Icons wie in Apple-Abfragen: die Aktion rot gefüllt, darunter der Weg zurück in normaler Schrift.
function confirmPop(anchor, html, act, back = { label: 'Abbrechen' }) {
  return new Promise(resolve => {
    const visible = anchor?.isConnected && anchor.getClientRects().length;
    const host = (visible && anchor.closest('dialog')) || (dlg.open ? dlg : document.body);
    const layer = blockingLayer();
    const pop = document.createElement('div');
    pop.className = 'pop';
    pop.innerHTML = `<p>${html}</p><div class="btns">
      <button type="button" class="${act.cls || 'danger'}" data-v="1">${esc(act.label)}</button>
      <button type="button" data-v="0">${esc(back.label)}</button></div>`;
    if (visible) anchor.classList.add('on');
    const done = v => { layer.remove(); pop.remove(); if (visible) anchor.classList.remove('on'); resolve(v); };
    layer.onclick = () => done(false);
    pop.querySelectorAll('[data-v]').forEach(b => b.onclick = () => done(b.dataset.v === '1'));
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

/* ---------- Meldungen und Sicherheitsabfragen ---------- */

// Kleines Fenster mit rundem x; Abfragen mit Entscheidung sind Sprechblasen (confirmPop).
function inform(title, html) {
  return new Promise(resolve => {
    msg.innerHTML = `
      <form method="dialog">
        <div class="dlg-head"><div class="hl"><button type="button" class="round" data-x aria-label="Schließen">${ic('x')}</button></div>
          <div class="mid"><h3>${esc(title)}</h3></div><div class="hr"></div></div>
        <div class="dlg-body"><div class="msg-text">${html}</div></div>
      </form>`;
    const done = () => { if (msg.open) msg.close(); resolve(); };
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
// Das angetippte Feld im Fenster in den sichtbaren Teil rollen, sobald die Tastatur offen ist.
dlg.addEventListener('focusin', e => {
  if (!e.target.matches('input, textarea')) return;
  setTimeout(() => { placeDialogs(); e.target.scrollIntoView({ block: 'nearest' }); }, 350);
});
