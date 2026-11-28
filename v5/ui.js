// AppDesign 5.0.0 · ui.js – gemeinsame Bausteine der iPad-Web-Apps von g811141a (Apple-like)
// Einbinden am Ende von <body>, vor dem Skript der App:  <script src="../AppDesign/fassung/X.Y.Z/ui.js"></script> (feste Fassung, R-10.3)
// Klassisches Skript. Seit 5.0.0 (APD-145, R-1.14) steht global nur AD: die App ruft AD.<Name>, z. B. AD.openMenu(…), AD.createSync(…), AD.alert.
//
// Die App muss bereitstellen (Schnittstelle):
//   <dialog id="dlg"></dialog> und <dialog id="msg"></dialog> im Dokument
//   db.settings.appearance ('auto' | 'light' | 'dark'), save(), render()     – für Darstellung
//   optional: function onDialogOpen()                                       – wird bei jedem openDialog aufgerufen
// Von ui.js nutzt die App nur AD.<Name> mit den Namen aus schnittstelle.json (Teil app; R-1.14, Prüfung tests/schnittstelle.mjs, seit 4.64.0;
// Namensraum AD seit 5.0.0).
//
// Inhalt: Icons (ic) · esc · Beträge (money, formatEuro) · autoGrow · onLongPress · Darstellung
// (applyTheme, setAppearance) · Menüs (openMenu mit Untermenü) · Sprechblase (confirmPop) · gekürzter Titel (Sprechblase, seit 4.47.0) ·
// hervorgehobene Quelle (AD-Bean sourcehighlight, seit 4.67.0) · Stapel und Befehle (AD-Beans presentation und commands, seit 5.0.0) · Meldung (inform) · Hinweis-Kasten (AD-Bean notice, seit 4.70.0) · Fenster (openDialog, dlgHead) ·
// Berühren (R-3.6) und Großanzeige (R-2.6, seit 4.48.0) · Auswahl-Kapsel (capHtml, mountCap) · Tastatur/sichtbarer Bereich (placeDialogs) · iPhone (isPhone, applyLayout) ·
// Messmodus (measureMenuItems, seit 4.26.0) · Schnellroll-Griff (seit 4.30.0) · Navigation und Gesten (navRegister, navPush,
// navPop, navSidebar, seit 4.30.0) · Bedienungshilfen (announce, setFieldError, focusFirstInvalid, Fokus und Tasten in Menüs, Sprechblasen
// und Fenstern, seit 4.35.0)
// Regeln dazu: README - Designrichtlinie allgemein.md

'use strict';
// Namensraum AD (seit 5.0.0, APD-145, R-1.14): der ganze Code steht in einer Funktion, seine Namen sind innen. Ohne eigene Einrückung, damit
// Zeilen und Stellen der Gegenproben gleich bleiben. Am Ende gibt sie AD zurück – das Einzige, was global wird.
const AD = (() => {
// Version der Bausteine (R-10.3): die App vergleicht sie beim Start mit der benötigten Fassung.
const AD_VERSION = '5.0.0';
// ‚Bewegung reduzieren‘ (R-1.9) – die eine Abfrage für alle Bausteine (seit 4.64.0, APD-135/B-4.2; vorher fünfmal eigens gebaut)
const bewegungRuhig = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
// APD-129 Teil 2 (seit 4.59.2, Messung 14.11.2026 arbeit/APD-129/messung-2026-11-14-2137.txt, Zeilen 9–17, 207–216, 263–272; Designrichtlinie 13
// ‚Oberer Rand nach dem Drehen‘): iPhone vom Home-Bildschirm quer → hoch – nach der Meldung 812 bleibt env(safe-area-inset-top) noch 250–300 ms
// auf 62; alles mit --safe-top stünde so lange 62 px zu tief und spränge dann hoch. Ist das Fenster hoch und niedriger als der Bildschirm, liegt
// die Statusleiste außerhalb des Fensters: der obere Rand ist 0 (randOben). Teil B: Safaris Verschiebung nach dem Drehen im selben Ereignis
// zurück (drehRestWeg), nicht erst mit der nächsten Meldung. Beide als erste Hörer von ‚resize‘, vor allen, die messen.
// Zurückgenommen wird nur der eigene Wert (randEigen) – eine andere Angabe am Element bleibt (z. B. die Gerätewerte der Prüfung R-1.7 in hig.mjs)
let randEigen = false;
function randOben() {
  const heim = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const aus = heim && innerHeight > innerWidth && innerHeight + 1 < Math.max(screen.width, screen.height) && isPhone();
  const root = document.documentElement.style;
  if (aus) { if (root.getPropertyValue('--safe-top') !== '0px') { root.setProperty('--safe-top', '0px'); randEigen = true; return true; } }
  else if (randEigen) { randEigen = false; if (root.getPropertyValue('--safe-top') === '0px') root.removeProperty('--safe-top'); return true; }
  return false;
}
// Ändert sich der Rand, stellt placeDialogs das Blatt sofort neu (es steht über style.top, R-4.6)
addEventListener('resize', () => { if (randOben()) placeDialogs(); drehRestWeg(); });
/* ---------- Icons ---------- */

// Schaltflächen-Icons aus Lucide (ISC-Lizenz), direkt eingebettet, damit die App offline funktioniert.
const ICONS = {
  // lock, lock-open (seit 4.68.0, RLB-125): Reiselogbuch sperren und entsperren (lucide-static 1.76.0)
  'lock': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'lock-open': '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  'eye': '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  // hand (seit 4.65.0, APD-140): Symbol der Bean swipeactions im Bean-Katalog (lucide-static 1.76.0)
  'hand': '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  'book-open': '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',
  'fold-vertical': '<path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3-3-3 3"/><path d="m15 5-3 3-3-3"/>',
  'list-chevrons-up-down': '<path d="M3 5h8"/><path d="M3 12h8"/><path d="M3 19h8"/><path d="m15 8 3-3 3 3"/><path d="m15 16 3 3 3-3"/>',
  'moon': '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
  'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  'share': '<path d="M12 2v13"/><path d="m16 6-4-4-4 4"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>',
  'search': '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',
  'arrow-up-to-line': '<path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/>',
  'chevrons-up-down': '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',   // seit 4.30.0: Schnellroll-Griff (APD-37)
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
  // Seit 4.15.0 (R-1.5, APD-6): Offline-Hinweis
  'wifi-off': '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>',
  'wifi': '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>',
  'activity': '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  'circle-stop': '<circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
  'ellipsis': '<circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/><circle cx="5" cy="12" r="1.3"/>',
  'ellipsis-vertical': '<circle cx="12" cy="12" r="1.3"/><circle cx="12" cy="5" r="1.3"/><circle cx="12" cy="19" r="1.3"/>',
  'settings': '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>'
};
// Seit 4.42.0 (APD-87, R-4.1): das Icon der Mehr-Schaltfläche trägt data-mehr – bei offenem Menü zeigt es senkrechte Punkte (mehrKippen).
// Seit 4.66.0 (APD-136 b3): ein unbekannter Name gibt einen Konsolenfehler und kein svg (vorher ein unsichtbares svg mit dem Text ‚undefined‘);
// checkWerte (Icons) prüft, dass jeder Name in ic('…') in ui.js, Vorlage und App in ICONS steht.
const ic = (name, cls = '') => {
  if (!Object.hasOwn(ICONS, name)) { console.error(`ic: unbekanntes Symbol ‚${name}‘`); return ''; }
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"${name === 'ellipsis' ? ' data-mehr' : ''}>${ICONS[name]}</svg>`;
};
// R-7.7 (seit 4.50.0, APD-30, Designrichtlinie 15.23; Testfall-Liste arbeit/APD-30 Testfall-Liste.md L-1 bis L-20): leerer Zustand wie Apple
// ContentUnavailableView – Symbol (für VoiceOver verborgen), Titel als Überschrift, Satz, optional eine getönte Schaltfläche { id, label }, die dasselbe
// auslöst wie die Schaltfläche oder der Menüpunkt, für die sie steht (die App setzt ihren onclick; Schlüssel actions). compact: Seitenleiste neben dem
// Inhalt (nur Symbol und Titel, ohne description und actions aufrufen); search: ‚Keine Treffer für ‚…‘‘ – title und description werden hier maskiert
// (Begriff als Text, nie HTML). Schlüssel englisch seit 5.0.0 (APD-145; vorher titel, satz, aktion, klein, suche).
function contentUnavailableHtml({ icon, title, description = '', actions = null, compact = false, search = false } = {}) {
  return `<div class="leer${compact ? ' klein' : ''}${search ? ' suche' : ''}">${ic(icon, 'sym')}<h3>${esc(title)}</h3>${description ? `<p>${esc(description)}</p>` : ''}`
    + `${actions ? `<button type="button" class="leer-knopf" id="${esc(actions.id)}">${esc(actions.label)}</button>` : ''}</div>`;
}
const searchUnavailableHtml = (term, compact = false) => contentUnavailableHtml({ icon: 'search', title: `Keine Treffer für ‚${term}‘`, description: 'Schreibweise prüfen oder nach etwas anderem suchen.', compact, search: true });

// Feste Elemente jeder App: <dialog id="dlg"> (Fenster) und <dialog id="msg"> (Meldungen).
const dlg = document.getElementById('dlg');
const msg = document.getElementById('msg');
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
// Seit 4.42.0 (APD-90, R-10.5): Icon und Text eines Eintrags bleiben zusammen – ein Eintrag ist ein Block in der Zeile (.ict), die Zeile
// bricht nur zwischen den Einträgen um; ist ein Eintrag allein zu lang, bricht er im Text, nie direkt nach dem Icon (festes Leerzeichen).
const iconText = (icon, text) => `<span class="ict">${esc(icon)}\u00a0${esc(text)}</span>`;
// Seit 4.57.0 (RLB-122, R-10.5): Aufz\u00e4hlung mit Trennpunkt (z. B. \u201a8\u00d7\u2600\ufe0f \u00b7 6\u00d7\ud83c\udf27\ufe0f\u2018) \u2013 der \u201a\u00b7\u2018 bleibt am Ende der
// Zeile, umgebrochen wird nur danach, die neue Zeile beginnt mit dem n\u00e4chsten Eintrag.
// Seit 4.59.0 (RLB-121, R-10.5): auch lange Eintr\u00e4ge (z. B. Quartiere \u201aHotel Krone (120,00 \u20ac) \u00b7 \u2026\u2018). Jeder Eintrag ist ein Block (.ict.az,
// inline-block, h\u00f6chstens so breit wie die Zeile): passt er in die Zeile, bleibt er am St\u00fcck; ist er allein breiter, bricht er im Text um.
// Der \u201a\u00b7\u2018 steht mit gesch\u00fctztem Leerzeichen im Block des Eintrags davor (.az-n, nowrap) \u2013 nach einem inline-block br\u00e4che der Browser
// sonst vor dem \u201a\u00b7\u2018 um (Chromium und WebKit gemessen); ein Zusatz in Klammern (z. B. der Preis) steht ebenso darin und bleibt ganz.
// liste: Texte oder [Text, Zusatz], z. B. ['Hotel Krone', '(120,00\u00a0\u20ac)'].
function listHtml(liste) {
  return liste.map((x, i) => {
    const [text, zusatz] = Array.isArray(x) ? x : [x, ''];
    const n = (zusatz ? '\u00a0' + esc(zusatz) : '') + (i < liste.length - 1 ? '\u00a0\u00b7' : '');
    return `<span class="ict az">${esc(text)}${n ? `<span class="az-n">${n}</span>` : ''}</span>`;
  }).join(' ');
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
// Seit 4.57.0 (APD-126/W-1): auch niedriger – die Höhe erst auf 0 (sonst zählen die alte Höhe bzw. rows mit), leer eine Zeile (design.css
// min-height 44 px); der Rollstand des Bereichs bleibt, auch wenn das Feld dabei kurz niedriger ist.
function autoGrow(ta) {
  const c = ta.closest('.dlg-body, .rolle'), y = c?.scrollTop;
  ta.style.height = '0px';
  ta.style.height = (ta.scrollHeight + 2) + 'px';
  if (c && c.scrollTop !== y) c.scrollTop = y;
}
const growAll = () => dlg.querySelectorAll('textarea').forEach(autoGrow);

// R-3.5 (seit 4.33.0, APD-76): langes Drücken gilt nur, solange der Finger still steht – wandert er mehr als LANG_WEG oder rollt die
// Fläche um ihn herum (Smiley-Leiste seitlich ziehen), ist es abgebrochen (wie Apple). Safari meldet beim Ziehen der Leiste kein
// pointercancel – vorher fragte die Leiste nach 0,6 s, ob das Smiley unter dem Finger entfernt werden soll.
// Seit 4.48.0 (APD-105, R-3.5 ‚Anheben‘): ab LANG_HEBEN hebt sich der Eintrag an (Klasse .hebt: wächst, Schatten; ‚Bewegung reduzieren‘:
// nur Schatten) und senkt sich bei Abbruch wieder; löst das lange Drücken aus, senkt er sich und die Rückmeldung beim Berühren endet.
// Seit 4.48.1 (APD-106 Variante C, R-3.5): { entfernen: true } – langes Drücken, das etwas entfernt (Smiley), löst erst nach LANG_ENTFERNEN aus
// (Apple: Kontextmenü nach etwa 0,5 s; länger, weil Entfernen nicht rückgängig zu machen ist – Nutzer 01.11.2026). In der Kapsel hebt sich
// das Zeichen auf einem hellen Kreis mit Schatten als eigene Ebene (.schwebt) über die Leiste – die Kapsel schneidet sonst ab.
// Seit 4.48.2 (APD-107/S-7): der Kreis hängt im offenen Fenster (wie die Großanzeige) – an body lag er hinter dem modalen Fenster (P-88/4);
// gemessen und nachgerückt, falls das Fenster selbst verschoben ist.
const LANG_WEG = 10, LANG_HEBEN = 150, LANG_DAUER = 600, LANG_ENTFERNEN = 1000;
function onLongPress(btn, onLong, onTap, { entfernen = false } = {}) {
  let timer = null, heben = null, ebene = null;
  let fired = false, x0 = 0, y0 = 0;
  const rollt = e => { if (e.target.contains?.(btn)) stop(); };
  const senken = () => {
    btn.classList.remove('hebt');
    if (ebene) { const e = ebene; ebene = null; e.classList.add('weg'); setTimeout(() => e.remove(), 200); }
  };
  const anheben = () => {
    btn.classList.add('hebt');
    if (!btn.closest('.cap')) return;
    const r = btn.getBoundingClientRect(), d = Math.max(44, Math.min(r.width, r.height));
    ebene = document.createElement('div');
    ebene.className = 'schwebt'; ebene.setAttribute('aria-hidden', 'true');
    ebene.style.cssText = `left:${r.left + r.width / 2 - d / 2}px;top:${r.top + r.height / 2 - d / 2}px;width:${d}px;height:${d}px;font-size:${getComputedStyle(btn).fontSize}`;
    ebene.textContent = btn.textContent;
    (btn.closest('dialog') || document.body).append(ebene);
    const r1 = ebene.getBoundingClientRect(), x1 = r.left + r.width / 2 - d / 2, y1 = r.top + r.height / 2 - d / 2;
    if (Math.abs(r1.left - x1) > 0.5 || Math.abs(r1.top - y1) > 0.5) { ebene.style.left = `${2 * x1 - r1.left}px`; ebene.style.top = `${2 * y1 - r1.top}px`; }
    requestAnimationFrame(() => requestAnimationFrame(() => ebene?.classList.add('hoch')));
  };
  const stop = () => { clearTimeout(timer); clearTimeout(heben); timer = heben = null; senken(); removeEventListener('scroll', rollt, true); };
  btn.addEventListener('pointerdown', e => {
    stop();
    fired = false; x0 = e.clientX; y0 = e.clientY;
    addEventListener('scroll', rollt, { capture: true, passive: true });
    heben = setTimeout(() => { heben = null; if (!navZug?.aktiv && !swipeZieht) anheben(); }, LANG_HEBEN);
    timer = setTimeout(() => { stop(); if (navZug?.aktiv || swipeZieht) return; fired = true; beruehrAus(true); onLong(); }, entfernen ? LANG_ENTFERNEN : LANG_DAUER);   // seit 4.30.0: nicht während einer Wischgeste (APD-61)
  });
  btn.addEventListener('pointermove', e => { if (timer && Math.hypot(e.clientX - x0, e.clientY - y0) > LANG_WEG) stop(); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => btn.addEventListener(ev, stop));
  btn.addEventListener('contextmenu', e => e.preventDefault());
  btn.addEventListener('click', e => {
    e.preventDefault();
    if (fired) { fired = false; return; }
    onTap();
  });
}

// R-2.3 (seit 4.25.0, APD-21): Suche mit mehreren Begriffen wie Mail und Notizen – Leerzeichen trennt Wörter, ein Eintrag passt,
// wenn alle darin vorkommen (Reihenfolge und Groß/klein egal); „…“ sucht eine genaue Wortfolge. Was ‚ein Eintrag‘ ist, sagt
// die App (Reiselogbuch: das ganze Reiselogbuch; gezeigt werden dann die Tage mit mindestens einem Wort).
// Seit 4.29.0 (APD-63 C2) ohne Akzente wie Apple: ‚Zurich‘ findet ‚Zürich‘ und umgekehrt – verglichen wird ohne Akzentzeichen
// (Unicode-Zerlegung, Zeichen der Klasse ‚Mark‘ entfernt); ß, ø, æ sind eigene Buchstaben und bleiben.
// Gemerkt je Text: beim Tippen werden dieselben Texte bei jedem Buchstaben wieder verglichen (APD-61/F-11: 30 Reiselogbücher unter 50 ms)
const foldMerk = new Map();
function fold(t) {
  const s = String(t ?? '');
  let f = foldMerk.get(s);
  if (f === undefined) {
    f = /^[\x00-\x7F]*$/.test(s) ? s.toLowerCase() : s.toLocaleLowerCase('de').normalize('NFD').replace(/\p{M}/gu, '');
    if (foldMerk.size > 5000) foldMerk.clear();
    foldMerk.set(s, f);
  }
  return f;
}
const QUOTES = /["„“”]/g;
function searchWords(term) {
  const out = [];
  const rest = fold(term).replace(/["„“”]([^"„“”]*)["„“”]/g, (_, w) => {
    if ((w = w.trim().replace(/\s+/g, ' '))) out.push(w);
    return ' ';
  });
  rest.replace(QUOTES, ' ').split(/\s+/).forEach(w => w && out.push(w));
  return [...new Set(out)];
}
const findsAll = (text, words) => { const t = fold(text); return words.length > 0 && words.every(w => t.includes(w)); };
const findsAny = (text, words) => { const t = fold(text); return words.some(w => t.includes(w)); };
// Buchstaben mit Akzent je Grundbuchstabe (lateinisch und griechisch), z. B. u → ùúûüũūŭůűųǔǖǘǚǜ… – für die Markierung
let akzente = null;
function mitAkzent(ch) {
  if (!akzente) {
    akzente = {};
    for (const [a, b] of [[0xC0, 0x24F], [0x370, 0x3FF], [0x1E00, 0x1EFF], [0x1F00, 0x1FFF]]) for (let cp = a; cp <= b; cp++) {
      const c = String.fromCodePoint(cp), f = fold(c);
      if (f.length === 1 && f !== c.toLocaleLowerCase('de')) akzente[f] = (akzente[f] || '') + c;
    }
  }
  return akzente[ch] || '';
}
// Alle Wörter im (bereits maskierten) Text gelb markieren, längere zuerst; aneinanderstoßende Stellen sind eine Markierung.
// Zwischen den Zeichen darf eine unsichtbare Umbruchstelle stehen (lange Wörter, R-6.3). Seit 4.29.0 trifft jeder Buchstabe
// auch seine Formen mit Akzent (ü, ú …) und angehängte Zeichen (Akzent als eigenes Zeichen, Emoji-Variante) – markiert wird
// das ganze Wort, wie es im Text steht.
// Seit 4.55.0 (APD-122, Designrichtlinie 15.2 ‚Smileys (Emoji)‘): ein Smiley wird als ganzes Zeichen markiert – mit Hautton
// (‚👍‘ trifft ‚👍🏽‘ ganz) und als Folge mit Verbinder (‚👨‘ trifft ‚👨‍👩‍👧‘ ganz); ‚👍🏽‘ trifft ‚👍‘ nicht.
const EMOJI_REST = '(?:\\p{M}|\\p{Emoji_Modifier})*(?:\\u200D\\p{Extended_Pictographic}(?:\\p{M}|\\p{Emoji_Modifier})*)*';
function markWords(html, words) {
  if (!words.length) return html;
  const pattern = [...words].sort((a, b) => b.length - a.length)
    .map(w => (esc(w).match(/&[a-z0-9#]+;|./gsu) || []).map((ch, i, alle) => {
      const v = ch.length === 1 && mitAkzent(ch);
      // nach einem Smiley am Ende des Worts (bzw. vor einem anderen Zeichen als Hautton/Verbinder) das ganze Zeichen mitnehmen
      const rest = /\p{Extended_Pictographic}/u.test(ch) && !/^(?:\p{Emoji_Modifier}|\u200D)/u.test(alle[i + 1] || '') ? EMOJI_REST : '\\p{M}*';
      return (v ? `[${ch}${v}]` : ch.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')) + rest;
    }).join('\u200B?')).join('|');
  return html.replace(new RegExp(pattern, 'giu'), m => `<mark>${m}</mark>`).replaceAll('</mark><mark>', '');
}

// R-2.3 (seit 4.25.1, APD-24): Seite neu aufbauen, ohne das Feld mit dem Fokus zu ersetzen. Die App ruft setHtml(el, html) statt
// el.innerHTML = html. Liegt der Fokus in einem Eingabefeld darin (z. B. Suche beim Tippen), wird der neue Inhalt in den alten
// eingearbeitet: das Feld und seine Vorfahren bleiben dieselben Elemente (Fokus, Cursor, Tastatur bleiben), alles andere wird
// angeglichen. Sonst ersetzt Safari am iPhone mit dem Feld auch die Tastatur kurz – Kopf- und Suchzeile zittern bei jedem Buchstaben.
// Seit 4.27.0 (APD-28): der Rollbereich (.rolle mit id, direkt in el) bleibt dasselbe Element – nur sein Inhalt wird ersetzt. So
// bleibt der Rollstand beim Neuaufbau erhalten (wie früher der des Fensters), und ein laufender Schwung reißt nicht ab.
function setHtml(el, html) {
  if (measurement?.an) messEreignis('neuaufbau ' + (el.id || el.className || el.tagName.toLowerCase()));
  // seit 4.29.0: das ⓧ im Feld (APD-63 C3) steht nicht im neuen Inhalt – vorher heraus, danach wieder an das Feld mit Fokus
  if (el.contains(fxBtn)) { fxBtn.remove(); queueMicrotask(fxZeigen); }
  const f = document.activeElement;
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  if (!f?.matches?.('input, textarea') || !el.contains(f) || !f.id || !tpl.content.getElementById(f.id)) {
    const alt = el.querySelector(':scope > .rolle[id]'), neu = alt && tpl.content.getElementById(alt.id);
    if (!neu || neu.parentNode !== tpl.content || !neu.matches('.rolle')) { el.innerHTML = html; return; }
    for (const { name } of [...alt.attributes]) if (!neu.hasAttribute(name)) alt.removeAttribute(name);
    for (const { name, value } of [...neu.attributes]) if (alt.getAttribute(name) !== value) alt.setAttribute(name, value);
    // nie aus dem Dokument nehmen (sonst ist der Rollstand weg): Geschwister davor und danach ersetzen, Inhalt in einem Zug
    const vorher = [...tpl.content.childNodes], i = vorher.indexOf(neu);
    for (const n of [...el.childNodes]) if (n !== alt) n.remove();
    alt.before(...vorher.slice(0, i));
    alt.after(...vorher.slice(i + 1));
    alt.replaceChildren(...neu.childNodes);
    return;
  }
  // gleich = gleiches Tag und (falls vorhanden) gleiche id; Eingabefelder außer dem mit dem Fokus werden immer ersetzt
  const same = (a, b) => a.nodeType === b.nodeType && a.nodeName === b.nodeName && (a.id || '') === (b.id || '')
    && (a === f || !a.matches?.('input, textarea, select'));
  const attrs = (a, b) => {
    for (const { name } of [...a.attributes]) if (!b.hasAttribute(name) && !(a === f && name === 'value')) a.removeAttribute(name);
    for (const { name, value } of [...b.attributes]) if (a.getAttribute(name) !== value && !(a === f && name === 'value')) a.setAttribute(name, value);
  };
  const kids = (a, b) => {
    const neu = [...b.childNodes];
    neu.forEach((nb, i) => {
      const na = a.childNodes[i];
      if (na && same(na, nb)) {
        if (na.nodeType !== 1) { if (na.nodeValue !== nb.nodeValue) na.nodeValue = nb.nodeValue; }
        else if (na !== f) { attrs(na, nb); kids(na, nb); }
        else { attrs(na, nb); const v = nb.getAttribute('value') ?? ''; if (f.tagName === 'INPUT' && f.value !== v) f.value = v; }   // z. B. x leert
      } else if (na?.contains(f)) a.insertBefore(nb, na);   // den Weg zum Feld nie entfernen
      else if (na) a.replaceChild(nb, na);
      else a.appendChild(nb);
    });
    while (a.childNodes.length > neu.length) a.removeChild(a.lastChild);
  };
  kids(el, tpl.content);
}

// Komponente ⓧ in Textfeldern (seit 4.29.0, APD-63 C3, R-5.6) wie Apple (UIKit ‚clearButtonMode = whileEditing‘): solange ein
// Textfeld den Fokus hat und etwas drinsteht, steht rechts darin ein graues ⓧ (wie im Suchfeld, 44 × 44 Antippfläche). Antippen
// leert das Feld, Cursor und Tastatur bleiben; die App erfährt es über ein input-Ereignis (wie beim Löschen per Taste). Eine Schaltfläche
// für alle Felder, gleich hinter das Feld gesetzt (rollt mit); abschaltbar mit data-noclear.
// Seit 4.41.0 (APD-81, Testfall-Liste arbeit/APD-81 Testfall-Liste.md): auch in mehrzeiligen Feldern – oben rechts auf Höhe der
// ersten Zeile (APD-81/F-1). Geleert wird in allen Feldern über den Bearbeiten-Befehl (Text auswählen, execCommand('delete')) – so
// holen Undo-Taste und drei Finger den Text zurück (F-5, gemessen APD-81/M-1 bis M-4, Designrichtlinie 13); geht der Befehl nicht,
// über den Wert wie bisher.
// Seit 4.57.0 (APD-124, R-5.6, Muster arbeit/APD-124/index.html Variante A): Antippen leert sofort, auch mehrzeilig (keine Sprechblase
// ‚Text löschen?‘ mehr, APD-124/E-1); der geleerte Text kommt in die Zwischenablage. An Stelle des ⓧ steht dann ein graues Rückgängig
// (Lucide undo-2 als Linie, Klasse rueck) – es holt den ganzen Text zurück, danach wieder das ⓧ; mit der ersten Eingabe oder wenn das
// Feld den Fokus verliert, verfällt es (APD-124/E-2, APD-124/E-3).
const FX = 'input:is([type=text], [type=email], [type=url], [type=tel]):not([readonly], [disabled], [data-noclear]), textarea:not([readonly], [disabled], [data-noclear])';
const fxBtn = document.createElement('button');
fxBtn.type = 'button'; fxBtn.className = 'fclear'; fxBtn.tabIndex = -1; fxBtn.setAttribute('aria-label', 'Eingabe löschen');
// Das Zeichen ⓧ (Text löschen) – auch für die Suchfelder der App (seit 4.64.0, APD-135/B-4.2; vorher dreimal Zeichen für Zeichen gleich)
const FX_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M15 9l-6 6M9 9l6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
fxBtn.innerHTML = FX_SVG;
const FX_X = fxBtn.innerHTML;
const FX_RUECK = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>';
// fxRueck: nach dem Leeren merkt sich das Feld den Text – bis zur ersten Eingabe bzw. bis es den Fokus verliert
let fxFeld = null, fxTippt = false, fxRahmen = null, fxRueck = null, fxArt = 'x';
function fxZeigen() {
  const f = document.activeElement;
  if (fxRueck && fxRueck.feld !== f && !fxTippt) fxRueck = null;   // APD-124/E-2: Fokus weg – Rückgängig verfällt
  // ⓧ mit Text; im leeren Feld, solange es einen Text zum Zurückholen hat, das Rückgängig
  const an = f?.matches?.(FX) && (f.value !== '' || fxRueck?.feld === f) ? f : null;
  const art = an && an.value === '' ? 'rueck' : 'x';
  if (art !== fxArt) { fxArt = art; fxBtn.innerHTML = art === 'rueck' ? FX_RUECK : FX_X;
    fxBtn.setAttribute('aria-label', art === 'rueck' ? 'Löschen widerrufen' : 'Eingabe löschen'); fxBtn.classList.toggle('rueck', art === 'rueck'); }
  if (fxFeld && fxFeld !== an) { fxFeld.classList.remove('mitx'); if (fxFeld.tagName === 'TEXTAREA') autoGrow(fxFeld); }
  // Bezugsrahmen ist das Element um das Feld (sonst läge er womöglich außerhalb des Rollbereichs und das ⓧ rollte nicht mit)
  if (fxRahmen && fxRahmen !== an?.parentElement) { fxRahmen.style.position = ''; fxRahmen = null; }
  fxFeld = an;
  if (!an) { fxBtn.remove(); return; }
  // mehrzeilig: der Innenabstand rechts ändert den Umbruch – das Feld wächst gleich mit (sonst wäre die letzte Zeile abgeschnitten)
  if (!an.classList.contains('mitx')) { an.classList.add('mitx'); if (an.tagName === 'TEXTAREA') autoGrow(an); }
  if (fxBtn.previousSibling !== an) an.after(fxBtn);
  // jedes Mal neu setzen – ein Neuaufbau (setHtml) gleicht die Attribute des Rahmens an und nimmt es wieder weg
  const pa = an.parentElement;
  if (fxRahmen === pa || getComputedStyle(pa).position === 'static') { fxRahmen = pa; pa.style.position = 'relative'; }
  // Lage über den Ursprung des Bezugsrahmens gemessen (gleich, wo das Feld steht – Fenster, Inhalt, Tabelle)
  fxBtn.style.left = fxBtn.style.top = '0px';
  const o = fxBtn.getBoundingClientRect(), r = an.getBoundingClientRect();
  // seit 4.37.0 (APD-43 B5): mit der tatsächlichen Größe – das ⓧ wächst mit der Textgröße (R-1.10)
  const w = fxBtn.offsetWidth || 44, h = fxBtn.offsetHeight || 44;
  fxBtn.style.left = Math.round(r.right - w - o.left) + 'px';
  // einzeilig senkrecht in der Mitte; mehrzeilig mittig auf der ersten Zeile (APD-81/F-1) – bleibt stehen, wenn das Feld wächst
  const mitte = an.tagName === 'TEXTAREA' ? r.top + fxErsteZeile(an) : r.top + r.height / 2;
  fxBtn.style.top = Math.round(mitte - h / 2 - o.top) + 'px';
}
// Mitte der ersten Zeile, vom oberen Rand des Feldes gemessen
function fxErsteZeile(ta) {
  const cs = getComputedStyle(ta), lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
  return parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop) + lh / 2;
}
// APD-124: Text merken und in die Zwischenablage (der Tipp ist die Geste des Nutzers, die Safari dafür verlangt), dann leeren
function fxLeeren(f) {
  const text = f.value;
  try { navigator.clipboard?.writeText?.(text)?.catch?.(() => {}); } catch {}
  fxLeerenOhne(f);
  if (f.value === '') fxRueck = { feld: f, text };
}
// APD-124 Rückgängig: Text über den Bearbeiten-Befehl wieder einsetzen (die Undo-Taste kennt den Schritt dann auch), Cursor am Ende;
// liefert der Befehl false, über den Wert
function fxZurueck(f, text) {
  if (document.activeElement !== f) f.focus({ preventScroll: true });
  fxRueck = null;
  let ok = false;
  try { ok = document.execCommand('insertText', false, text); } catch {}
  if (!ok || f.value !== text) { f.value = text; f.dispatchEvent(new Event('input', { bubbles: true })); }
  try { f.setSelectionRange(text.length, text.length); } catch {}
}
// APD-81/F-5: über den Bearbeiten-Befehl leeren – Safari legt dafür einen Schritt zum Rückgängigmachen an, beim Setzen des Werts
// nicht (M-1, M-2); das input-Ereignis kommt dann vom Browser. Liefert der Befehl false oder bleibt Text stehen: über den Wert.
function fxLeerenOhne(f) {
  if (document.activeElement !== f) f.focus();
  let ok = false;
  try { f.select(); ok = document.execCommand('delete'); } catch {}
  if (ok && f.value === '') return;
  f.value = '';
  f.dispatchEvent(new Event('input', { bubbles: true }));
}
// Antippen: den Fokus nicht abgeben (Tastatur bleibt), leeren bzw. zurückholen (APD-124, ohne Sprechblase), die App benachrichtigen
fxBtn.addEventListener('pointerdown', e => { fxTippt = true; e.preventDefault(); });
fxBtn.addEventListener('mousedown', e => e.preventDefault());
fxBtn.addEventListener('click', e => {
  e.preventDefault(); fxTippt = false;
  const f = fxFeld; if (!f) return;
  if (fxArt === 'rueck' && fxRueck?.feld === f) fxZurueck(f, fxRueck.text);
  else fxLeeren(f);
  fxZeigen();
});
document.addEventListener('focusin', fxZeigen);
// APD-124/E-3: die erste Eingabe nach dem Leeren lässt das Rückgängig verfallen (danach wieder das ⓧ, ohne Text keine Schaltfläche)
document.addEventListener('input', e => { if (fxRueck && e.target === fxRueck.feld && e.target.value !== '') fxRueck = null; queueMicrotask(fxZeigen); });
document.addEventListener('focusout', () => setTimeout(() => { if (!fxTippt) fxZeigen(); }, 0));
document.addEventListener('pointerup', () => setTimeout(() => { fxTippt = false; }, 400), true);
window.addEventListener('resize', () => requestAnimationFrame(fxZeigen));
// Größe des Feldes (Rahmen, nicht Innenraum – das ⓧ ändert den Innenabstand), im nächsten Bild: sonst meldet Safari eine Schleife
if (window.ResizeObserver) { const ro = new ResizeObserver(() => fxFeld && requestAnimationFrame(fxZeigen)); document.addEventListener('focusin', e => { ro.disconnect(); if (e.target.matches?.(FX)) ro.observe(e.target, { box: 'border-box' }); }); }

// ---------- Seit 4.57.0 (APD-126, Muster arbeit/APD-126/index.html): Textfelder leer einzeilig, Cursor am Ende ----------
// APD-126/W-1 (R-5.2, 8): jedes Textfeld wächst und schrumpft beim Tippen, Einfügen und Leeren mit – in ui.js für alle Felder, die App setzt
// nichts selbst; leer ist es eine Zeile hoch (design.css).
document.addEventListener('input', e => { if (e.target.tagName === 'TEXTAREA') autoGrow(e.target); });
// APD-126/W-2 (R-5.11): wird ein Feld aktiviert (Antippen, Tab, Fokus durch die App), steht der Cursor am Ende; im aktiven Feld setzt Antippen
// ihn an die Stelle. Safari setzt den Cursor nach dem Fokus noch selbst (beim Loslassen bzw. per selectionchange) – nach Antippen und Tab kurz
// nachsetzen (ceBis). Fokus durch die App ohne Antippen des Felds: nur einmal ans Ende – setzt die App danach selbst einen Cursor (z. B. Smiley
// in der Zeile), bleibt er.
const CE = 'input:is([type=text], [type=search], [type=email], [type=url], [type=tel], [type=number], :not([type])), textarea';
let ceFeld = null, ceBis = 0, ceZeiger = null, ceTab = -1e9;
const ceEnde = f => { try { const n = f.value.length; if (f.selectionStart !== n || f.selectionEnd !== n) f.setSelectionRange(n, n); } catch {} };
addEventListener('pointerdown', e => { ceZeiger = { ziel: e.target, t: performance.now() }; }, { capture: true, passive: true });
addEventListener('click', () => setTimeout(() => { ceZeiger = null; }), true);   // die Berührung ist vorbei – ein späterer Fokus durch die App ist kein Antippen
addEventListener('keydown', e => { if (e.key === 'Tab') ceTab = performance.now(); }, true);
addEventListener('focusin', e => {
  const f = e.target;
  if (!f.matches?.(CE)) return;
  const jetzt = performance.now(), getippt = ceZeiger?.ziel === f && jetzt - ceZeiger.t < 1500, tab = jetzt - ceTab < 500;
  ceFeld = f; ceBis = getippt || tab ? jetzt + 700 : 0;
  if (ceBis) { ceEnde(f); setTimeout(() => ceFeld === f && ceEnde(f)); return; }
  // Fokus durch die App: gleich danach ans Ende – es sei denn, die App hat selbst ausgewählt bzw. den Cursor gesetzt (select() vor focus() übernimmt
  // der Browser erst nach dem Fokus; setSelectionRange danach)
  const s0 = f.selectionStart, e0 = f.selectionEnd;
  setTimeout(() => { if (ceFeld === f && document.activeElement === f && f.selectionStart === s0 && f.selectionEnd === e0 && s0 === e0) ceEnde(f); });
}, true);
document.addEventListener('selectionchange', () => { const f = document.activeElement;
  if (f === ceFeld && performance.now() <= ceBis && (f.selectionStart === f.selectionEnd || f.selectionStart === 0 && f.selectionEnd === f.value.length)) ceEnde(f); });   // Tab wählt alles aus
for (const t of ['pointerup', 'mouseup', 'touchend']) addEventListener(t, e => { if (e.target === ceFeld && performance.now() <= ceBis) setTimeout(() => ceFeld && ceEnde(ceFeld)); }, true);
addEventListener('click', e => { if (e.target !== ceFeld || performance.now() > ceBis) return;
  setTimeout(() => { if (ceFeld) ceEnde(ceFeld); ceBis = performance.now() + 120; }); }, true);   // danach gilt Antippen wieder der Stelle
addEventListener('focusout', e => { if (e.target === ceFeld) { ceFeld = null; ceBis = 0; } }, true);

/* ---------- Bedienungshilfen (seit 4.35.0, APD-43 Teil 1: R-1.8 VoiceOver, R-4.7 Hardware-Tastatur, R-5.3, R-3.4) ---------- */

// R-1.8 (V9, V13): Ergebnisse höflich ansagen – VoiceOver liest sie, sobald es fertig gesprochen hat. Der Ansage-Bereich liegt im
// obersten offenen Fenster (Meldung, Fenster bzw. Blatt – außerhalb eines modalen Fensters hört VoiceOver nichts), sonst auf der
// Seite. delay (ms, seit 5.0.0; vorher warten): erst nach einer Pause (Suche beim Tippen: 700); eine neue Ansage ersetzt eine wartende. Gleicher Text noch
// einmal: der Bereich wird erst geleert, damit VoiceOver ihn wieder liest. ‚Automatisch gespeichert‘ wird nie angesagt (V11).
let ansageUhr = 0;
function ansageBereich() {
  const host = msg.open ? msg : dlg.open ? dlg : document.body;
  let a = host.querySelector(':scope > .ansage');
  if (!a) { a = document.createElement('div'); a.className = 'ansage'; a.setAttribute('aria-live', 'polite'); a.setAttribute('aria-atomic', 'true'); host.append(a); }
  return a;
}
function announce(text, { delay = 0 } = {}) {
  clearTimeout(ansageUhr);
  ansageUhr = setTimeout(() => {
    const a = ansageBereich();
    a.textContent = '';
    ansageUhr = setTimeout(() => { ansageBereich().textContent = text; }, 50);
  }, delay);
}

// R-5.3 (V10): Fehlermeldung eines oder mehrerer Felder (felder: Feld oder Liste, zeile: Element der Meldung). Mit Text: roter Rand,
// aria-invalid, die Meldung mit den Feldern verknüpft (aria-describedby) und einmal angesagt – beim Erscheinen und bei neuem Text.
// Ohne Text: alles weg. Ergebnis: true, solange ein Fehler steht.
let fehlerNr = 0;
function setFieldError(felder, zeile, text = '') {
  felder = [felder].flat().filter(Boolean);
  const alt = zeile.hidden ? '' : zeile.textContent;
  zeile.textContent = text;
  zeile.hidden = !text;
  if (!zeile.id) zeile.id = 'fieldError' + ++fehlerNr;
  for (const f of felder) {
    f.classList.toggle('invalid', !!text);
    if (text) f.setAttribute('aria-invalid', 'true'); else f.removeAttribute('aria-invalid');
    const ids = (f.getAttribute('aria-describedby') || '').split(/\s+/).filter(x => x && x !== zeile.id);
    if (text) ids.push(zeile.id);
    if (ids.length) f.setAttribute('aria-describedby', ids.join(' ')); else f.removeAttribute('aria-describedby');
  }
  if (text && text !== alt) announce(text);
  return !!text;
}
// Häkchen mit Fehler: der Abschnitt des ersten fehlerhaften Felds rollt in die Mitte (‚Bewegung reduzieren‘: springt, R-1.9),
// danach hat das Feld den Fokus. Ergebnis: false, wenn kein Feld fehlerhaft ist.
function focusFirstInvalid(root = dlg) {
  const f = root.querySelector('[aria-invalid="true"]');
  if (!f) return false;
  const ruhig = bewegungRuhig();
  (f.closest('.step') || f).scrollIntoView({ behavior: ruhig ? 'instant' : 'smooth', block: 'center' });
  setTimeout(() => f.focus({ preventScroll: true }), ruhig ? 0 : 350);
  return true;
}

// R-3.4 / R-4.7 (K6, K9): der Fokusring steht nur bei Bedienung mit der Tastatur – html.tastatur ab einer Taste zum Bewegen
// (Tab, Pfeile, Esc, Eingabe, Leertaste …), weg bei jeder Berührung bzw. jedem Klick. Textfelder haben nie einen Ring (design.css):
// `:focus-visible` trifft bei ihnen auch beim Antippen zu (gemessen in WebKit und Chromium), der Cursor zeigt den Fokus.
const BEWEG_TASTEN = /^(Tab|Escape|Enter|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End|PageUp|PageDown| )$/;
addEventListener('keydown', e => { if (BEWEG_TASTEN.test(e.key) && !(e.key === ' ' && e.target.matches?.('input, textarea'))) document.documentElement.classList.add('tastatur'); }, true);
addEventListener('pointerdown', () => document.documentElement.classList.remove('tastatur'), true);
// Fokus ohne Rollen (R-7.3); Ziele, die sonst keinen Fokus nehmen (Kopfzeile, Titel), bekommen tabindex -1 (nicht mit Tab erreichbar)
const FOKUSBAR = 'button:not(:disabled), a[href], input:not(:disabled):not([type=hidden]), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])';
function focus(el) {
  if (!el?.isConnected || !el.getClientRects().length || el.closest('[inert]')) return false;
  if (!el.matches('button, a[href], input, textarea, select, [tabindex]')) el.tabIndex = -1;
  el.focus({ preventScroll: true });
  return document.activeElement === el;
}
// V5, V6: nach Menü bzw. Sprechblase zurück auf ihre Schaltfläche; gibt es sie nicht mehr, auf die Kopfzeile (Fenster bzw. Seite)
// R-1.8 (seit 4.50.1, APD-112): nach dem Schließen eines Fensters, Blatts bzw. einer Meldung zurück auf die Schaltfläche bzw. die Zeile, die es
// öffnete (sel: gemerkte Schaltfläche, sonst das Element, das beim Öffnen den Fokus hatte) – baut die App neu auf, das neue Element mit derselben
// Kennung; gibt es keins: die Kopfzeile des Fensters darunter bzw. der Seite. Hat die App bzw. der Browser den Fokus schon sinnvoll gesetzt
// (ein Element außerhalb geschlossener Fenster) oder ist ein Menü bzw. eine Sprechblase offen, bleibt er dort. Ring nur mit der Tastatur (K6).
let dlgVorher = null, msgVorher = null;
function wiederFinden(el) {
  if (!el || el === document.body) return null;
  if (el.isConnected) return el.closest('dialog:not([open])') ? null : el;
  const key = el.id ? '#' + CSS.escape(el.id) : el.dataset?.id ? `.${CSS.escape(el.classList[0] || '')}[data-id="${CSS.escape(el.dataset.id)}"]`
    : el.dataset?.day ? `[data-day="${CSS.escape(el.dataset.day)}"]` : '';
  return key ? document.querySelector(key) : null;
}
function fokusNachFenster(sel, vorher) {
  const a = document.activeElement;
  if (a && a !== document.body && a.isConnected && !a.closest('dialog:not([open])')) return;
  if (document.querySelector('.menu, .pop')) return;
  const k = (sel && document.querySelector(sel)) || wiederFinden(vorher);
  if (k && focus(k)) return;
  if (dlg.open) focus(dlg.querySelector('.dlg-head h3') || dlg);
  else focus(document.querySelector('#app .pnav, #app .nb, .pnav, .nb'));
}
function fokusZurueck(anchor, host) {
  const a = anchor && liveAnchor(anchor);
  if (a && focus(a)) return;
  if (host?.matches?.('dialog[open]')) focus(host.querySelector('.dlg-head h3') || host);
  else focus(document.querySelector('#app .pnav, #app .nb, .pnav, .nb'));
}
// R-1.4 (V7): bei offenem Menü und offener Sprechblase ist alles außerhalb für VoiceOver und Tastatur gesperrt (inert) – die übrigen
// Teile des Fensters bzw. der Seite; frei bleiben genau die übergebenen Teile und alles, was danach dazukommt (Untermenü).
function sperreAusser(host, frei) {
  const gesperrt = [...host.children].filter(c => !frei.includes(c) && !c.inert && c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE');
  gesperrt.forEach(c => { c.inert = true; });
  return () => gesperrt.forEach(c => { c.inert = false; });
}
// R-4.7: Tasten für das oberste Menü bzw. die oberste Sprechblase – solange eins offen ist, bekommt es jede Taste zuerst
const tastenStapel = [];
document.addEventListener('keydown', e => { const h = tastenStapel.at(-1); if (h && !e.defaultPrevented) h(e); }, true);
const verbrauchen = e => { e.preventDefault(); e.stopImmediatePropagation(); };
const istAbbruch = e => e.key === 'Escape' || (e.metaKey && e.key === '.');

/* ---------- Darstellung ---------- */

// Wie Apple: die App folgt der Darstellung des iPads; im Mehr-Menü lässt sie sich übersteuern.
const darkQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
function applyTheme() {
  const a = db.settings.appearance;
  document.documentElement.setAttribute('data-theme', a === 'auto' ? (darkQuery?.matches ? 'dark' : 'light') : a);
  applyGlas();
}
// Seit 4.54.0 (APD-120, Testfall-Liste arbeit/APD-120 Testfall-Liste.md APD-120/J-1 bis J-13): Schalter ‚Glas‘ im Untermenü ‚Darstellung‘ – aus macht
// Schwebendes deckend wie ‚Transparenz reduzieren‘ (R-3.9; die Einstellung des iPads kommt in Safari nicht an, Designrichtlinie 13). db.settings.glas:
// fehlt = noch keine Wahl auf diesem Gerät (Glas ein); die App übernimmt beim Laden eines Backups den Wert aus der Datei nur dann (glassFromBackup).
const glasAn = () => db.settings.glas !== false;
function applyGlas() { document.documentElement.classList.toggle('ohne-glas', !glasAn()); }
function setGlas(an) { db.settings.glas = !!an; save(); applyGlas(); }
// Beim Laden eines Backups (Abgleichen oder Ersetzen): vorher = db.settings.glas dieses Geräts vor dem Laden – gilt weiter, wenn hier schon gewählt.
function glassFromBackup(vorher) { if (typeof vorher === 'boolean') db.settings.glas = vorher; else if (typeof db.settings.glas !== 'boolean') delete db.settings.glas; applyGlas(); }
darkQuery?.addEventListener?.('change', () => { if (db.settings.appearance === 'auto') applyTheme(); });

function setAppearance(a) {
  db.settings.appearance = a;
  save();
  applyTheme();
  render();
}
const APPEARANCES = { auto: 'Automatisch', light: 'Hell', dark: 'Dunkel' };
// Seit 4.43.0 (APD-92, R-1.2): ‚Darstellung ›‘ steht im Mehr-Menü der Seitenleiste (iPhone: Startliste) nach Backup erstellen und
// Backup laden – nie im Menü eines Eintrags, denn sie gilt für die ganze App; rechts grau der aktuelle Wert, Untermenü mit Häkchen.
// Seit 4.54.0 (APD-120, Variante A): darunter als eigene Gruppe der Schalter ‚Glas‘ – das Menü bleibt beim Umschalten offen.
const appearanceMenuItem = () => ({ icon: 'sun-moon', label: 'Darstellung', value: APPEARANCES[db.settings.appearance],
  submenu: [...Object.entries(APPEARANCES).map(([k, l]) => ({ tick: db.settings.appearance === k, label: l, act: () => setAppearance(k) })),
    'sep', { schalter: glasAn(), label: 'Glas', act: setGlas }] });

/* ---------- Rahmen und Rollbereich (seit 4.27.0, APD-28, R-2.1) ---------- */

// Die Seite rollt nie, nur der Inhalt. Die App baut #app als Rahmen aus festen Zeilen: oben die Kopfzeile (.nb bzw. .pnav, mit
// Suchzeile), darunter der Rollbereich <div class="rolle" id="rolle">…Inhalt…</div>. Der Rahmen ist so hoch wie der sichtbare
// Bereich (--vv-h, Variante B1) und endet über der Tastatur. Weil das Fenster nicht rollt, hat Safari beim Tippen nichts zu
// verschieben (APD-27: jedes Rollen des Fensters bei offener Tastatur verschob den sichtbaren Bereich, der Ausgleich kam 2 Bilder
// zu spät; Muster APD-28 und Versuch APD-28/M-1 am iPhone: 0 px). Alle Bausteine (Leiste, R-3.2, R-7.3, R-7.4, R-8.1, Messmodus) rollen
// nur über scrollView (Namen seit 5.0.0 englisch: remaining, end, stop); die App ruft nie window.scrollTo. Ohne Rollbereich (App noch nicht umgebaut)
// rollt wie bisher das Fenster.
const scrollView = {
  get el() { return document.querySelector('#app > .rolle'); },
  get y() { const e = scrollView.el; return e ? e.scrollTop : scrollY; },
  get max() { const e = scrollView.el; return Math.max(0, e ? e.scrollHeight - e.clientHeight : document.documentElement.scrollHeight - innerHeight); },
  get remaining() { return scrollView.max - scrollView.y; },
  to(y, smooth = false) { (scrollView.el || window).scrollTo({ top: Math.max(0, Math.round(y)), behavior: smooth ? 'smooth' : 'instant' }); },
  by(d) { if (Math.round(d)) scrollView.to(scrollView.y + d); },
  // seit 4.28.1 (APD-36): bis zum Ende des Inhalts – Platz, der nach dem Schließen der Tastatur noch darunter steht, zählt nicht
  end(smooth = false) { scrollView.to(scrollView.max - platzVon(scrollView.el), smooth); },
  // seit 4.30.0 (7 APD-37/F-5, 1 APD-61/F-10): ein weiches Rollen (‚Nach oben / Ans Ende‘) sofort anhalten – WebKit hält es bei scrollTo
  // nicht an, wohl aber, wenn der Bereich kurz nicht rollen darf
  stop() { const e = scrollView.el; if (!e) return; const y = e.scrollTop; e.style.overflowY = 'hidden'; e.scrollTop = y; void e.offsetHeight; e.style.overflowY = ''; e.scrollTop = y; },
};
// Rollen hören (Fenster und Rollbereich): scroll-Ereignisse von Elementen steigen nicht auf – deshalb in der Einfangphase.
const onRoll = fn => window.addEventListener('scroll', e => { if (e.target === document || e.target === scrollView.el) fn(e); }, { capture: true, passive: true });

/* ---------- Menüs und Sprechblasen ---------- */

// Ebene hinter Menü und Sprechblase: daneben tippen schließt (seit 4.60.0 nur das Menü – die Sprechblase ruft sie ohne schliessen auf und graut
// alles daneben ein, APD-30/V-7), Wischen bewegt die Seite dahinter nicht.
// Seit 4.54.0 (APD-118, Designrichtlinie 13 ‚Am oberen Rand kein Klick‘, Testfall-Liste APD-118/X-1 bis X-9): sie schließt schon beim Loslassen
// (pointerup), wenn der Finger bzw. die Maus auf ihr aufsetzte und höchstens SCHICHT_WEG px wanderte – am oberen Rand (iPhone quer, Home-Bildschirm)
// schickt Safari keinen click. Den Klick danach verschluckt sie (sonst träfe er, was unter der Schicht lag, z. B. die Mehr-Schaltfläche: wieder offen);
// ein Klick ohne pointerdown (el.click() aus dem Skript, Tastatur) schließt wie bisher.
const SCHICHT_WEG = 20, SCHICHT_KLICK_MS = 700;
function klickVerschlucken(x, y) {
  const weg = e => { if (Math.hypot(e.clientX - x, e.clientY - y) > 40) return; e.preventDefault(); e.stopImmediatePropagation(); if (e.type === 'click') aus(); };
  const typen = ['mousedown', 'mouseup', 'click'];
  const aus = () => { clearTimeout(t); for (const typ of typen) window.removeEventListener(typ, weg, true); };
  for (const typ of typen) window.addEventListener(typ, weg, true);
  const t = setTimeout(aus, SCHICHT_KLICK_MS);
}
function blockingLayer(schliessen = () => {}) {
  const layer = document.createElement('div');
  layer.className = 'layer';
  layer.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  let start = null;
  layer.addEventListener('pointerdown', e => { start = e.isPrimary ? { id: e.pointerId, x: e.clientX, y: e.clientY } : null; });
  layer.addEventListener('pointercancel', () => { start = null; });
  layer.addEventListener('pointerup', e => {
    const s = start; start = null;
    if (!s || s.id !== e.pointerId || Math.hypot(e.clientX - s.x, e.clientY - s.y) > SCHICHT_WEG) return;
    klickVerschlucken(e.clientX, e.clientY);
    schliessen();
  });
  layer.addEventListener('click', () => { start = null; schliessen(); });
  return layer;
}

// Seite sperren, solange ein Fenster offen ist: Wischen wirkt nur im Fenster (seit 4.2.0).
// R-7.3 (seit 4.18.0, APD-13): Solange ein Fenster offen ist, steht die Seite dahinter still. Safari schiebt beim Öffnen der
// Tastatur trotz overflow: hidden die ganze Seite und schiebt sie nicht zurück – deshalb wird der Scrollstand beim Öffnen
// gemerkt und beim Schließen genau wiederhergestellt (position: fixed ginge nicht: der Tabellenkopf ist sticky).
// Seit 4.23.1 (P-51/5): zusätzlich die oberste Zeile unter der Leiste samt Abstand in px – nach dem Schließen und dem
// Neuaufbau durch die App steht genau sie wieder dort (auch wenn Safari die Seite für die Tastatur verschoben hat).
// Seit 4.23.2 (P-52/2–4): die Zeile wird nach dem Schließen 1,5 s lang festgehalten – Safari rollt, während die Tastatur
// zugeht, die Seite noch einmal bzw. ändert die Fensterhöhe; jede solche Bewegung wird sofort zurückgenommen. Ein Tippen
// oder Wischen des Nutzers beendet das Festhalten. Auch nach ‹ › im Fenster steht die Liste wie beim Öffnen (Wunsch des Nutzers).
let lockY = null, lockTop = null, holdTop = null, holdUntil = 0;
function lockAnchor() {
  if (scrollView.y < 4) return null;
  const edge = keepEdge();
  const e = [...document.querySelectorAll(KEEP_SEL)].find(x => x.getClientRects().length && x.getBoundingClientRect().bottom > edge + 1);
  return e ? { sel: keepKey(e), top: e.getBoundingClientRect().top - edge } : null;
}
function alignTop(a) {
  if (!a) return;
  const e = [...document.querySelectorAll(KEEP_SEL.split(', ').map(s => `${s.split(' ')[0]} ${a.sel}`).join(', '))].find(x => x.getClientRects().length);
  const d = e ? Math.round(e.getBoundingClientRect().top - keepEdge() - a.top) : 0;
  scrollView.by(d);
}
function lockPage() {
  if (lockY === null) { lockY = scrollView.y; lockTop = lockAnchor(); holdTop = null; }
  document.documentElement.classList.add('locked');
}
function unlockPage() {
  if (dlg.open || msg.open) return;
  document.documentElement.classList.remove('locked');
  if (lockY === null) return;
  const y = lockY, a = lockTop;
  lockY = null; lockTop = null;
  // gedreht, während das Fenster offen war (R-8.1) – nur eine neue Breite zählt: die Tastatur ändert die Höhe
  if (innerWidth !== keepWidth) return restoreTop();
  keepHeight = innerHeight;
  if (Math.round(scrollView.y) !== Math.round(y)) scrollView.to(y);
  holdTop = a; holdUntil = performance.now() + 1500; alignTop(a);
}
// Festhalten nach dem Schließen: bei jeder Bewegung (Neuaufbau, Safari, Tastatur) die Zeile zurück an ihren Platz.
function holdAlign() {
  if (!holdTop) return;
  if (performance.now() > holdUntil) { holdTop = null; return; }
  alignTop(holdTop);
}
onRoll(holdAlign);
window.addEventListener('resize', holdAlign, { passive: true });
window.visualViewport?.addEventListener('resize', holdAlign);
window.visualViewport?.addEventListener('scroll', holdAlign);
['touchstart', 'wheel', 'mousedown'].forEach(t => window.addEventListener(t, () => { if (!dlg.open && !msg.open) holdTop = null; }, { passive: true, capture: true }));

// Fenster ohne Fokus-Rahmen öffnen: der Fokus liegt auf dem Fenster selbst, nicht auf dem x.
function showModalQuiet(d) {
  d.tabIndex = -1;
  d.showModal();
  d.focus({ preventScroll: true });
  lockPage();
}

// Menü oder Sprechblase unter (bzw. über) der Schaltfläche, im Bildschirm gehalten.
// R-1.7 (seit 4.29.0, APD-63): Abstände von Menüs und Sprechblasen zum Rand – 12 px, mindestens die sicheren Ränder
// (bei offener Tastatur liegt die Home-Leiste unter ihr)
function popoverMargins() {
  const g = safeRand();
  return { L: Math.max(12, g.left), R: Math.max(12, g.right), T: Math.max(12, g.top), B: Math.max(12, kbOffen() ? 0 : g.bottom) };
}
function placeAt(el, anchor, align) {
  // R-4.5/R-8.1: Menü und Sprechblase stehen unter ihrer Schaltfläche und passen immer ganz auf den Bildschirm.
  // Reicht der Platz darunter nicht, scrollt ihr Inhalt darin (erst bei weniger als 200 px Platz darunter
  // öffnen sie nach oben). 'beside': rechts neben dem Eintrag (Kontextmenü in der Seitenleiste), oben bündig; ohne Platz daneben darunter bzw.
  // darüber (APD-143).
  el.style.maxHeight = ''; el.style.overflowY = '';   // nach dem Drehen neu messen
  // Seit 4.29.0 (R-1.7, APD-63): Abstand 12 px vom Rand, mindestens aber die sicheren Ränder (Aussparung, Home-Leiste)
  const { L, R, T, B } = popoverMargins();
  let r = anchor.getBoundingClientRect();
  const fit = room => { if (el.scrollHeight > room) { el.style.maxHeight = room + 'px'; el.style.overflowY = 'auto'; el.style.overscrollBehavior = 'contain'; } };
  let top;
  // Seit 4.10.0: ist neben dem Eintrag kein Platz (iPhone: Kachel so breit wie der Bildschirm), steht das Menü
  // linksbündig unter der Kachel – ganz sichtbar über der Backup-Kachel (R-4.2).
  // Seit 4.67.0 (APD-143, wie Apple – HIG Context menus ‚above or below‘): reicht der Platz darunter nicht, steht es über der Kachel; die Liste
  // bleibt dabei stehen, auch beim Schließen. Nur wenn das Menü weder darunter noch darüber ganz passt (z. B. große Schrift), rückt die Liste
  // dafür und bekommt bei wenigen Einträgen unten Platz (Rückfall wie bis 4.66.0).
  if (align === 'beside' && innerWidth - (r.right - 40) - R < el.offsetWidth) {
    // seit 4.34.0 (APD-74): ohne Backup-Kachel über der Offline-Zeile bzw. dem unteren Rand
    const list = anchor.closest('.side-list'), tr = sideFootRect(anchor.closest('#side'));
    const limit = tr && tr.height ? Math.min(innerHeight - B, tr.top - 12) : innerHeight - B;
    const left = Math.max(L, Math.min(r.left, innerWidth - el.offsetWidth - R));
    // seit 4.68.0: nur an einer sichtbaren Kachel – beim erneuten Platzieren (Drehen, Größe) kann sie schon nach oben hinausgerückt sein (große Schrift)
    const sichtbar = !list || r.bottom > list.getBoundingClientRect().top;
    if (sichtbar && (r.bottom + 8 + el.offsetHeight <= limit || r.top - 8 - el.offsetHeight >= T)) {
      top = r.bottom + 8 + el.offsetHeight <= limit ? r.bottom + 8 : r.top - 8 - el.offsetHeight;
      el.style.left = left + 'px';
      el.style.top = top + 'px';
      return;
    }
    // Seit 4.68.0 (RLB-125, iPhone quer): passt es weder darunter noch darüber, ist die Kachel aber mindestens doppelt so breit wie das Menü, steht
    // es rechtsbündig auf der Kachel, oben bündig mit ihr bzw. ganz über der Backup-Kachel – die Liste bleibt stehen (wie neben der Kachel am iPad).
    if (r.width >= 2 * el.offsetWidth && el.offsetHeight <= limit - T) {
      el.style.left = Math.max(L, Math.min(r.right - el.offsetWidth, innerWidth - el.offsetWidth - R)) + 'px';
      el.style.top = Math.max(T, Math.min(r.top, limit - el.offsetHeight)) + 'px';
      return;
    }
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
    if (top + el.offsetHeight > limit + 2 && r.top - 8 - el.offsetHeight >= T) top = r.top - 8 - el.offsetHeight;
    // seit 4.68.0: nie über den oberen Rand und nie über die Backup-Kachel – ist das Menü höher als der Platz (große Schrift), rollt sein Inhalt (R-4.5)
    top = Math.max(T, top);
    // seit 4.71.0 (RLB-126, größte Schrift): rückt die Liste nicht weit genug (Kachel höher als der Bildschirm, z. B. nach dem Drehen), steht das Menü
    // trotzdem ganz im Bild: bleiben darunter weniger als 120 px (und weniger als das Menü), steht es unten bündig über der Backup-Kachel, notfalls über
    // der Kachel, sein Inhalt rollt (R-4.5, R-8.1)
    if (limit - top < Math.min(120, el.scrollHeight)) top = Math.max(T, limit - el.scrollHeight);
    fit(limit - top);
    el.style.left = Math.max(L, Math.min(r.left, innerWidth - el.offsetWidth - R)) + 'px';
    el.style.top = top + 'px';
    return;
  }
  if (align === 'beside') {
    // Neben der Kachel (iPad): nie über bzw. hinter die Backup-Kachel – unten endet das Menü über ihr (R-4.2).
    const tr = sideFootRect(anchor.closest('#side'));
    const left0 = Math.max(L, Math.min(r.right - 40, innerWidth - el.offsetWidth - R));
    const bottom = tr && tr.height && left0 < tr.right ? tr.top - 12 : innerHeight - B;
    fit(bottom - T);
    top = Math.max(T, Math.min(r.top, bottom - el.offsetHeight));
  } else {
    const below = innerHeight - r.bottom - 8 - B, above = r.top - 8 - T;
    if (el.scrollHeight <= below || below >= 200 || below >= above) { fit(below); top = r.bottom + 8; }
    else { fit(above); top = r.top - 8 - el.offsetHeight; }
  }
  const w = el.offsetWidth;
  let left = align === 'right' ? r.right - w : align === 'beside' ? r.right - 40 : r.left;
  left = Math.max(L, Math.min(left, innerWidth - w - R));
  el.style.left = left + 'px';
  el.style.top = Math.max(T, top) + 'px';
}

// Einträge: { icon, label, sub, red, tick, disabled, act } (tick und icon zusammen: Häkchen vorne, dann Icon und Text) · { …, value, submenu: [Einträge] } (Untermenü ›, eine Ebene)
// · { label, schalter: true|false, act(an) } (Schalter, seit 4.54.0) · 'sep' (Abstand) · 'line' (Strich) · { note } (graue Zeile) · { note, longPress: true } (graue Zeile, langes Drücken schaltet den Messmodus frei,
// seit 4.40.0, APD-77) · { messPlatz } (Platz des versteckten Messmodus, zeigt nichts). Ein Abstand ohne Eintrag danach entfällt.
// Seit 4.35.0 (R-1.8, V3, V4): Einträge mit Häkchen-Spalte sind menuitemcheckbox mit aria-checked (‚Hell, ausgewählt‘), Einträge mit
// Untermenü haben aria-haspopup und aria-expanded, die graue Zeile darunter ist ihre Beschreibung.
let menuNr = 0;
const menuDanach = (items, i) => items.slice(i + 1).find(x => !x?.messPlatz);
const menuHtml = items => { const nr = ++menuNr; return items.map((it, i) => it?.messPlatz ? ''
  : it === 'sep' ? (n => !n || n === 'sep' || n === 'line' ? '' : '<div class="sep" role="separator"></div>')(menuDanach(items, i))
  : it === 'line' ? '<div class="line" role="separator"></div>'
  : it.note ? `<div class="note${it.longPress ? ' halten' : ''}" role="presentation">${esc(it.note)}</div>`
  // seit 4.54.0 (APD-120): Schalter im Menü – Rolle ‚Schalter‘ mit Zustand, rechts der Schalter wie in den Einstellungen (15.15)
  : 'schalter' in it ? `<button type="button" class="mi sw" data-i="${i}" role="switch" aria-checked="${it.schalter ? 'true' : 'false'}">${esc(it.label)}<span class="schalter" aria-hidden="true"></span></button>`
  : `<button type="button" class="mi ${it.red ? 'red' : ''} ${it.sub ? 'has-sub' : ''}" data-i="${i}" ${it.disabled ? 'disabled' : ''} role="${'tick' in it ? 'menuitemcheckbox' : 'menuitem'}"${
      'tick' in it ? ` aria-checked="${it.tick ? 'true' : 'false'}"` : ''}${it.submenu ? ' aria-haspopup="menu" aria-expanded="false"' : ''}${it.sub ? ` aria-describedby="mi${nr}-${i}"` : ''}>${
      'tick' in it ? `<span class="tick">${it.tick ? ic('check') : ''}</span>` : ''}${it.icon ? ic(it.icon) : ''}${esc(it.label)}${
      it.value ? `<span class="val">${esc(it.value)}</span>` : ''}${it.submenu ? ic('chevron-right', 'chev') : ''}</button>${
      it.sub ? `<div class="sub" id="mi${nr}-${i}">${esc(it.sub)}</div>` : ''}`).join(''); };
// Seit 4.10.0 (R-8.1): Menüs, Untermenüs und Sprechblasen bleiben beim Drehen (quer ↔ hoch) und bei jeder
// Größenänderung an ihrer Schaltfläche – neu ausgerichtet, ganz sichtbar. Baut die App die Leiste dabei neu
// auf, wird die Schaltfläche über ihre id wiedergefunden; gibt es sie nicht mehr, schließt sich das Menü.
const floating = new Set();
function liveAnchor(anchor) {
  if (anchor.isConnected) return anchor.getClientRects().length ? anchor : null;
  const again = wiederFinden(anchor);
  if (again) sourcehighlight.refresh(document);   // seit 4.67.0 (APD-136): die Bean tönt die wiedergefundene Schaltfläche, wenn sie Quelle ist
  return again || null;
}
function placeFloating() { floating.forEach(f => f()); }
const replaceSoon = () => { requestAnimationFrame(() => requestAnimationFrame(placeFloating)); setTimeout(placeFloating, 350); };
window.addEventListener('resize', replaceSoon);
window.addEventListener('orientationchange', replaceSoon);
window.visualViewport?.addEventListener('resize', replaceSoon);

// Seit 4.42.0 (APD-87, R-4.1): die Mehr-Schaltfläche zeigt bei offenem Menü drei senkrechte Punkte (ellipsis-vertical), beim Schließen
// wieder waagrechte – sofort, ohne Bewegung; andere Schaltflächen (Kontextmenü, Auswahl) behalten ihr Icon.
function mehrKippen(knopf, offen) {
  const s = knopf?.querySelector?.(':scope > svg[data-mehr]');
  if (s) s.innerHTML = ICONS[offen ? 'ellipsis-vertical' : 'ellipsis'];
}
// R-4.13 (seit 4.53.0, APD-38/T-16, Testfall-Liste APD-62/M-1 bis M-11): Menü, Untermenü, Kontextmenü und Sprechblase wachsen in 0,35 s aus
// ihrer Schaltfläche (20 % → volle Größe, Kurve wie das Blatt) und schrumpfen beim Schließen in 0,25 s dorthin zurück (wie Muster Variante A:
// auf 60 % und ausgeblendet). Die Lage setzt placeAt wie ohne Bewegung – die Bewegung ist nur eine Animation ohne fill, die Endlage ist dieselbe.
// Beim Schließen ist der Baustein sofort weg (Zustand, Fokus, Sperre wie bisher); ein Abbild (.zu-geist, mit den berechneten Stilen, nicht
// bedienbar, für VoiceOver verborgen) schrumpft ab der aktuellen Stelle – auch mitten im Öffnen (M-3). ‚Bewegung reduzieren‘: nur Überblenden 0,2 s.
const WACHS_KURVE = 'cubic-bezier(.32,.72,0,1)', WACHS_MS = 350, SCHRUMPF_MS = 250, RUHIG_MS = 200;
// R-1.12 (seit 4.57.0, APD-127, gemessen an der Seitenleiste in Notizen): Gleitbewegungen – öffnen, hinein und nach oben mit einer Feder ohne
// Nachschwingen, Antwortzeit 0,35 s (1 − (1 + ωt)·e^(−ωt), ω = 2π/0,35 s; als linear()-Kurve über GLEIT_AUF_MS 0,5 s, 99 % nach 370 ms – dieselbe
// Kurve steht in design.css bei dialog.gleitet); schließen und hinaus ease-in-out in GLEIT_ZU_MS 0,25 s; nach einer Geste der Rest anteilig,
// mindestens GLEIT_MIN_MS 0,15 s. Menü und Sprechblase (R-4.13) bleiben bei WACHS_KURVE.
const gleitWert = t => 1 - (1 + 2 * Math.PI / 0.35 * t) * Math.exp(-2 * Math.PI / 0.35 * t);
const GLEIT_AUF_MS = 500, GLEIT_ZU_MS = 250, GLEIT_MIN_MS = 150, GLEIT_ZU = 'ease-in-out';
const GLEIT_FEDER = 'linear(' + Array.from({ length: 31 }, (_, i) => (gleitWert(i / 30 * 0.5) / gleitWert(0.5)).toFixed(4)).join(', ') + ')';
// dieselbe Feder für eigenes Rollen Bild für Bild (Titel antippen): k = Anteil der 0,5 s
const gleitFeder = k => k >= 1 ? 1 : gleitWert(k * 0.5) / gleitWert(0.5);
function wachsUrsprung(el, anchor) {
  // Lage aus left/top (setzt placeAt) – getBoundingClientRect wäre mitten in der Bewegung verkleinert
  const b = el.getBoundingClientRect(), x = parseFloat(el.style.left), y = parseFloat(el.style.top);
  const r = { left: Number.isFinite(x) ? x : b.left, top: Number.isFinite(y) ? y : b.top };
  const a = anchor?.isConnected && anchor.getClientRects().length ? anchor.getBoundingClientRect() : null;
  return a ? `${Math.round(a.left + a.width / 2 - r.left)}px ${Math.round(a.top + a.height / 2 - r.top)}px` : '50% 50%';
}
function wachsen(el, anchor) {
  if (!el.animate) return;
  if (bewegungRuhig()) { el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: RUHIG_MS, easing: 'ease-out' }); return; }
  el.style.transformOrigin = wachsUrsprung(el, anchor);
  el.animate([{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'none' }], { duration: WACHS_MS, easing: WACHS_KURVE });
}
function schrumpfen(el, anchor) {
  if (!el.animate || !el.isConnected || !el.getClientRects().length) return;
  const ruhig = bewegungRuhig(), cs = getComputedStyle(el), von = { opacity: cs.opacity, transform: cs.transform === 'none' ? 'none' : cs.transform };
  const g = el.cloneNode(true), quellen = [el, ...el.querySelectorAll('*')], ziele = [g, ...g.querySelectorAll('*')];
  quellen.forEach((q, i) => { const s = getComputedStyle(q), z = ziele[i]; for (const p of s) z.style.setProperty(p, s.getPropertyValue(p)); z.removeAttribute('id'); });
  g.className = 'zu-geist'; g.dataset.von = el.className;   // data-von: woraus das Abbild stammt (für die Prüfung)
  g.removeAttribute('role'); g.removeAttribute('aria-label'); g.removeAttribute('aria-labelledby'); g.removeAttribute('aria-modal');
  g.setAttribute('aria-hidden', 'true'); g.inert = true;
  g.style.pointerEvents = 'none'; g.style.transition = 'none';
  if (!ruhig) g.style.transformOrigin = wachsUrsprung(el, anchor);
  el.parentNode.append(g);
  const a = g.animate(ruhig ? [{ opacity: von.opacity }, { opacity: 0 }] : [von, { opacity: 0, transform: 'scale(.6)' }],
    { duration: ruhig ? RUHIG_MS : SCHRUMPF_MS, easing: ruhig ? 'ease-out' : 'ease-in', fill: 'forwards' });
  const weg = () => g.remove();
  a.onfinish = weg; a.oncancel = weg;
  setTimeout(weg, SCHRUMPF_MS + 500);   // falls der Bildwechsel ausbleibt (Seite im Hintergrund)
}
function openMenu(anchor, items, align = 'right') {
  const host = anchor.closest('dialog') || document.body;
  const layer = blockingLayer(() => close());
  const menu = document.createElement('div');
  menu.className = 'menu';
  // seit 4.52.0 (R-4.10, APD-40 Paket B): ein Kontextmenü (neben einer Zeile bzw. Kachel) ist erkennbar – höchstens 3 Gruppen, nichts Gesperrtes
  if (align === 'beside') menu.classList.add('kontext');
  menu.setAttribute('role', 'menu');
  menu.innerHTML = menuHtml(items);
  // R-1.8 (seit 4.35.0, V3): das Menü trägt den Namen seiner Schaltfläche; die Schaltfläche sagt ‚öffnet Menü‘ und ob es offen ist
  const name = anchor.getAttribute('aria-label') || anchor.textContent.trim();
  if (name) menu.setAttribute('aria-label', name);
  let subMenu = null, subItem = null;
  const closeSub = (zurueck = false) => {
    if (subMenu) schrumpfen(subMenu, subItem);   // R-4.13: das Untermenü schrumpft zu seinem Eintrag zurück
    subMenu?.remove(); subMenu = null;
    const it = subItem; subItem = null;
    if (it) sourcehighlight.release(it);
    if (it) { it.setAttribute('aria-expanded', 'false'); if (zurueck) focus(it); }
  };
  sourcehighlight.hold(anchor);   // seit 4.67.0 (APD-136/U-1): die Schaltfläche des offenen Menüs ist eine gehaltene Quelle
  mehrKippen(anchor, true);
  anchor.setAttribute('aria-haspopup', 'menu');
  anchor.setAttribute('aria-expanded', 'true');
  // Untermenü neben dem Menü, oben bündig mit seinem Eintrag; passt es links nicht hin, rechts daneben.
  const placeSub = () => {
    if (!subMenu) return;
    subMenu.style.maxHeight = ''; subMenu.style.overflowY = '';
    const { L, R, T, B } = popoverMargins(), room = innerHeight - T - B;
    if (subMenu.scrollHeight > room) { subMenu.style.maxHeight = room + 'px'; subMenu.style.overflowY = 'auto'; }
    // R-4.13: Lage des Menüs aus left/top und Breite – während es wächst, wäre getBoundingClientRect verkleinert
    const waechst = menu.getAnimations?.().length, ml = parseFloat(menu.style.left), w = subMenu.offsetWidth;
    const mr = waechst ? { left: ml, right: ml + menu.offsetWidth } : menu.getBoundingClientRect();
    const br = waechst ? { top: parseFloat(menu.style.top) + menu.clientTop + subItem.offsetTop - menu.scrollTop } : subItem.getBoundingClientRect();
    subMenu.style.left = Math.max(L, mr.left - w - 8 >= L ? mr.left - w - 8 : Math.min(mr.right + 8, innerWidth - w - R)) + 'px';
    subMenu.style.top = Math.max(T, Math.min(br.top, innerHeight - subMenu.offsetHeight - B)) + 'px';
  };
  const place = () => {
    const a = liveAnchor(anchor);
    if (!a) return close();
    anchor = a;
    mehrKippen(anchor, true);
    anchor.setAttribute('aria-haspopup', 'menu');   // baut die App die Leiste neu auf (Drehen), trägt die neue Schaltfläche den Zustand
    anchor.setAttribute('aria-expanded', 'true');
    placeAt(menu, anchor, align);
    placeSub();
  };
  let entsperren = null;
  // APD-120 (seit 4.54.0): ein Schalter im Menü schaltet um, das Menü bleibt offen
  const schalten = (b, it) => { it.schalter = !it.schalter; b.setAttribute('aria-checked', it.schalter ? 'true' : 'false'); it.act(it.schalter); };
  const close = () => {
    if (!menu.isConnected) return;
    closeSub(); schrumpfen(menu, anchor); layer.remove(); menu.remove(); sourcehighlight.release(anchor); mehrKippen(anchor, false); anchor.setAttribute('aria-expanded', 'false'); floating.delete(place);
    entsperren?.(); tastenStapel.splice(tastenStapel.indexOf(tasten) >>> 0, 1);
    // Seit 4.11.0: den für das Kontextmenü dazugegebenen Platz unter der Liste wieder entfernen.
    document.querySelectorAll('.side-list[data-padded]').forEach(l => { l.style.paddingBottom = ''; delete l.dataset.padded; });
    fokusZurueck(anchor, host);   // V5: zurück auf die Schaltfläche, ohne Rollen
  };
  const binde = () => menu.querySelectorAll('[data-i]').forEach(b => b.onclick = () => {
    const it = items[b.dataset.i];
    if ('schalter' in it) { schalten(b, it); return; }
    if (!it.submenu) { close(); it.act(); return; }
    // Untermenü neben dem Menü, oben bündig mit dem Eintrag; der Eintrag bleibt blau.
    const again = b.classList.contains('on');
    closeSub(again);
    if (again) return;
    sourcehighlight.hold(b);
    b.setAttribute('aria-expanded', 'true');
    subMenu = document.createElement('div');
    subMenu.className = 'menu submenu';
    subMenu.setAttribute('role', 'menu');
    subMenu.setAttribute('aria-label', it.label);
    subMenu.innerHTML = menuHtml(it.submenu);
    subMenu.querySelectorAll('[data-i]').forEach(sb => sb.onclick = () => { const x = it.submenu[sb.dataset.i]; if ('schalter' in x) { schalten(sb, x); return; } close(); x.act(); });
    host.append(subMenu);
    subItem = b;
    placeSub();
    wachsen(subMenu, b);   // R-4.13: wächst aus seinem Menüpunkt
    focus(subMenu.querySelector('.mi:not(:disabled)'));   // K3: Fokus auf den ersten Eintrag des Untermenüs
  });
  binde();
  // R-1.6 (seit 4.40.0, APD-77): langes Drücken auf die graue Zeile mit der Version schaltet den Messmodus bis zum Neustart frei –
  // das Menü bleibt offen und zeigt ‚Messung starten‘ an seinem Platz; kurzes Tippen tut nichts
  menu.querySelectorAll('.note.halten').forEach(n => onLongPress(n, () => {
    if (measureAllowed) return;
    measureAllowed = true;
    items = items.flatMap(it => it?.messPlatz ? measureMenuItems(it.messPlatz) : [it]);
    menu.innerHTML = menuHtml(items); binde(); place();
  }, () => {}));
  // R-4.7 (K1–K3): Esc bzw. ⌘. schließt das oberste (Untermenü zuerst), ↑ ↓ Tab wandern mit Umlauf (Ausgegrautes, Striche und
  // graue Zeilen übersprungen), Pos1/Ende, Eingabe bzw. Leertaste wählt; → öffnet das Untermenü, ← schließt es (wie am Mac)
  const tasten = e => {
    if (istAbbruch(e)) { verbrauchen(e); if (subMenu) closeSub(true); else close(); return; }
    const liste = subMenu || menu, mis = [...liste.querySelectorAll('.mi:not(:disabled)')];
    if (!mis.length) return;
    const i = mis.indexOf(document.activeElement);
    const geh = j => {
      verbrauchen(e);
      const m = mis[(j + mis.length) % mis.length];
      focus(m);
      if (m.offsetTop < liste.scrollTop) liste.scrollTop = m.offsetTop;   // langes Menü rollt mit
      else if (m.offsetTop + m.offsetHeight > liste.scrollTop + liste.clientHeight) liste.scrollTop = m.offsetTop + m.offsetHeight - liste.clientHeight;
    };
    const k = e.key;
    if (k === 'ArrowDown' || (k === 'Tab' && !e.shiftKey)) return geh(i + 1);
    if (k === 'ArrowUp' || (k === 'Tab' && e.shiftKey)) return geh(i < 0 ? -1 : i - 1);
    if (k === 'Home') return geh(0);
    if (k === 'End') return geh(-1);
    if (k === 'ArrowLeft' && subMenu) { verbrauchen(e); closeSub(true); return; }
    if (i < 0) return;
    if ((k === 'ArrowRight' && !subMenu && mis[i].getAttribute('aria-haspopup')) || k === 'Enter' || k === ' ') { verbrauchen(e); mis[i].click(); }
  };
  host.append(layer, menu);
  placeAt(menu, anchor, align);
  wachsen(menu, anchor);   // R-4.13: wächst aus der Schaltfläche bzw. der Kachel (Kontextmenü)
  floating.add(place);
  entsperren = sperreAusser(host, [layer, menu]);
  tastenStapel.push(tasten);
  focus(menu.querySelector('.mi:not(:disabled)'));   // V5: Fokus auf den ersten wählbaren Eintrag
  // Seit 4.11.0: Kontextmenü (lange drücken) – nach dem Loslassen noch einmal ausrichten; erst dann lässt iOS
  // die Liste sicher rücken (R-4.2).
  if (align === 'beside') {
    const again = () => { document.removeEventListener('pointerup', again, true); document.removeEventListener('touchend', again, true); replaceSoon(); };
    document.addEventListener('pointerup', again, true);
    document.addEventListener('touchend', again, true);
  }
}

// Abfrage als Sprechblase an der angetippten Schaltfläche. Seit 4.60.0 (APD-30/V-7, V-8, R-1.4): alles daneben ist eingegraut (Schwarz 20 %)
// und gesperrt – daneben tippen ändert nichts; Esc bzw. ⌘. = ‚Abbrechen‘.
// Schaltflächen ohne Icons wie in Apple-Abfragen: die Aktion rot gefüllt, darunter der Weg zurück in normaler Schrift.
function confirmPop(anchor, html, act, back = { label: 'Abbrechen' }, opts) {
  return choosePop(anchor, html, [{ label: act.label, cls: act.cls || 'danger', value: true }, { label: back.label, value: false }], opts)
    .then(v => v === true);
}

// Seit 4.9.0: Abfrage mit mehreren Wegen (wie eine Apple-Abfrage mit drei Schaltflächen): die bevorzugte Aktion blau
// gefüllt (cls 'primary'), eine zerstörende in roter Schrift (cls 'danger-text'), zuletzt der Weg zurück.
// Ergebnis: value der gewählten Schaltfläche; Esc bzw. ⌘. ergibt null. Seit 4.60.0 (APD-30/V-7, V-8, R-1.4) graut die Ebene dahinter alles daneben ein
// (Schwarz 20 %, .layer.schleier) und daneben tippen ändert nichts (bis 4.59.x: ergab null). Gehört der Anker zu einer offenen Kachel der
// Wischaktionen (schleierFrei), bleiben Kachel und Kapseln frei (ein Loch im Grau, APD-30/W-22).
// Seit 4.41.0 (APD-81/F-2): feld – die Abfrage gehört zu diesem Textfeld (ⓧ); Fokus und Tastatur bleiben darin, solange sie offen ist
// (nichts wird gesperrt oder fokussiert, Antippen der Blase und daneben nimmt dem Feld den Fokus nicht).
function choosePop(anchor, html, buttons, { feld = null } = {}) {
  return new Promise(resolve => {
    const visible = anchor?.isConnected && anchor.getClientRects().length;
    const host = (visible && anchor.closest('dialog')) || (dlg.open ? dlg : document.body);
    const layer = blockingLayer();   // daneben tippen ändert nichts (APD-30/V-7)
    layer.classList.add('schleier');
    const loch = (anchor && schleierFrei.get(anchor)) || null;
    if (loch) { layer.classList.add('mit-loch'); layer.append(Object.assign(document.createElement('div'), { className: 'schleier-loch' })); }
    // das Loch folgt der offenen Kachel samt Kapseln (nach dem Drehen neu gemessen)
    const lochSetzen = () => { const l = layer.querySelector('.schleier-loch'); if (!l) return; const r = loch();
      if (!r) { layer.classList.remove('mit-loch'); l.remove(); return; }
      Object.assign(l.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' }); };
    const pop = document.createElement('div');
    pop.className = 'pop';
    // Seit 4.10.0 (R-9.2): Wege mit Erklärung (desc) stehen je in einer eigenen Kachel – Erklärung, darunter die Schaltfläche;
    // Wege ohne Erklärung (z. B. Abbrechen) darunter wie bisher.
    const btn = (b, i) => `<button type="button" class="${b.cls || ''}" data-i="${i}">${esc(b.label)}</button>`;
    const tiles = buttons.map((b, i) => b.desc ? `<div class="tile"><p>${b.desc}</p>${btn(b, i)}</div>` : '').join('');
    // R-1.8 (seit 4.35.0, V6): Abfrage für VoiceOver – alertdialog mit dem Text als Name, modal; der Fokus liegt auf der Blase
    const pid = 'pop' + ++popNr;
    pop.innerHTML = `<p id="${pid}">${html}</p>${tiles ? `<div class="tiles">${tiles}</div>` : ''}<div class="btns">${buttons.map((b, i) => b.desc ? '' : btn(b, i)).join('')}</div>`;
    pop.setAttribute('role', 'alertdialog');
    pop.setAttribute('aria-modal', 'true');
    pop.setAttribute('aria-labelledby', pid);
    pop.tabIndex = -1;
    if (tiles) pop.classList.add('wide');
    if (visible) sourcehighlight.hold(anchor);
    const place = () => {
      lochSetzen();
      if (!visible) { pop.style.left = (innerWidth - pop.offsetWidth) / 2 + 'px'; return; }
      const a = liveAnchor(anchor);
      // Schaltfläche nicht mehr zu sehen: die Abfrage bleibt offen und steht mittig (eine Entscheidung geht nicht verloren).
      if (!a) { pop.style.left = (innerWidth - pop.offsetWidth) / 2 + 'px'; pop.style.top = Math.max(popoverMargins().T, (innerHeight - pop.offsetHeight) / 2) + 'px'; return; }
      anchor = a;
      placeAt(pop, anchor, anchor.classList.contains('side-row') ? 'beside' : anchor.getBoundingClientRect().left > innerWidth / 2 ? 'right' : 'left');
    };
    floating.add(place);
    let entsperren = null;
    const done = v => {
      if (!pop.isConnected) return;
      floating.delete(place); schrumpfen(pop, visible ? anchor : null); layer.remove(); pop.remove(); if (visible) sourcehighlight.release(anchor);
      entsperren?.(); tastenStapel.splice(tastenStapel.indexOf(tasten) >>> 0, 1);
      if (!feld) fokusZurueck(visible ? anchor : null, host);   // V6: zurück auf die Schaltfläche bzw. die Kopfzeile, ohne Rollen
      resolve(v);
    };
    pop.querySelectorAll('[data-i]').forEach(b => b.onclick = () => done(buttons[b.dataset.i].value));
    // R-4.7 (K4): Eingabe = der blaue Weg, sonst der Weg zurück – nie die rote Aktion; Esc bzw. ⌘. = Abbrechen (das Fenster bleibt);
    // Tab und Pfeile markieren mit Umlauf, die Leertaste drückt die markierte Schaltfläche (auch die rote)
    const tasten = e => {
      const bs = [...pop.querySelectorAll('[data-i]')];
      if (istAbbruch(e)) { verbrauchen(e); done(null); return; }
      if (e.key === 'Enter') {
        verbrauchen(e);
        const blau = buttons.findIndex(b => b.cls === 'primary'), zurueck = buttons.findLastIndex(b => !b.cls || !/danger/.test(b.cls));
        const i = blau >= 0 ? blau : zurueck;
        done(i >= 0 ? buttons[i].value : null);
        return;
      }
      const d = { Tab: e.shiftKey ? -1 : 1, ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      verbrauchen(e);
      const i = bs.indexOf(document.activeElement);
      focus(bs[i < 0 ? (d > 0 ? 0 : bs.length - 1) : (i + d + bs.length) % bs.length]);
    };
    host.append(layer, pop);
    lochSetzen();
    if (visible) placeAt(pop, anchor, anchor.classList.contains('side-row') ? 'beside' : anchor.getBoundingClientRect().left > innerWidth / 2 ? 'right' : 'left');
    else { pop.style.left = (innerWidth - pop.offsetWidth) / 2 + 'px'; pop.style.top = '120px'; }
    wachsen(pop, visible ? anchor : null);   // R-4.13: die Sprechblase wächst aus ihrer Schaltfläche
    tastenStapel.push(tasten);
    if (feld) { for (const el of [layer, pop]) { el.addEventListener('pointerdown', e => e.preventDefault()); el.addEventListener('mousedown', e => e.preventDefault()); } return; }
    entsperren = sperreAusser(host, [layer, pop]);
    focus(pop);
  });
}
let popNr = 0;

// R-2.5 (seit 4.47.0, APD-101): gekürzter Titel – ist der Titel der Kopfzeile (15.3) bzw. der Fenster-Kopfzeile (15.8) mit ‚…‘ gekürzt,
// zeigt langes Drücken (R-3.5: still, 0,6 s) den ganzen Titel in einer Sprechblase direkt unter der Kopfzeile, Pfeil zur Mitte des Titels,
// Schrift wie der Titel, umgebrochen, ganz auf dem Bildschirm (R-4.5). Sie bleibt, bis man irgendwo tippt (dieser Tipp schließt nur sie),
// rollt, Esc drückt oder dreht. Ein ganz sichtbarer Titel und kurzes Antippen zeigen nichts. Apple zeigt hier die Großanzeige in der
// Mitte (Abweichung, Designrichtlinie 16). Für VoiceOver trägt der Titel selbst den ganzen Text (R-1.8) – die Blase ist nur zu sehen.
const TITEL_SEL = '.dlg-head h3, .nb-title, .pnav-title';
const titelGekuerzt = t => t.scrollWidth > t.clientWidth + 1 && +getComputedStyle(t).opacity > 0.5;
let titelDruck = null, titelBlase = null, titelKlickWeg = 0;
function titelDruckEnde() { if (titelDruck) { clearTimeout(titelDruck.timer); titelDruck = null; } }
function titelBlaseZu() {
  const b = titelBlase; if (!b) return false;
  titelBlase = null; b.el.remove();
  removeEventListener('resize', b.dreh); tastenStapel.splice(tastenStapel.indexOf(b.tasten) >>> 0, 1);
  return true;
}
function zeigeTitelBlase(t) {
  titelBlaseZu();
  const host = t.closest('dialog') || document.body;
  const el = document.createElement('div');
  el.className = 'titel-blase';
  el.setAttribute('aria-hidden', 'true');
  el.textContent = t.textContent.trim();
  const c = getComputedStyle(t);
  el.style.font = c.font;
  host.append(el);
  // unter der ganzen Zeile des Titels (Schaltflächen daneben eingeschlossen), waagrecht mittig unter dem Titel, im Bildschirm gehalten
  const r = t.getBoundingClientRect(), zeile = t.closest('.dlg-head') || t.parentElement;
  const unten = Math.max(r.bottom, ...[...zeile.querySelectorAll('button')].map(k => k.getBoundingClientRect())
    .filter(k => k.height && k.top < r.bottom && k.bottom > r.top).map(k => k.bottom));
  const { L, R } = popoverMargins(), w = el.offsetWidth, mitte = r.left + r.width / 2;
  const left = Math.max(L, Math.min(mitte - w / 2, innerWidth - R - w));
  el.style.left = left + 'px';
  el.style.top = (unten + 10) + 'px';
  el.style.setProperty('--pfeil', Math.max(16, Math.min(w - 16, mitte - left)) + 'px');
  const tasten = e => { if (istAbbruch(e)) { verbrauchen(e); titelBlaseZu(); } };
  const breite = innerWidth, dreh = () => { if (innerWidth !== breite) titelBlaseZu(); };
  addEventListener('resize', dreh);
  tastenStapel.push(tasten);
  titelBlase = { el, t, tasten, dreh };
}
// Ein Tipp bei offener Blase schließt nur sie: pointerdown schließt, der Klick danach (und das Fokussieren eines Felds) entfällt.
addEventListener('pointerdown', e => {
  titelDruckEnde();
  if (titelBlase) {
    if (titelBlase.el.isConnected) { titelBlaseZu(); titelKlickWeg = performance.now() + 1000; return; }
    titelBlaseZu();
  }
  const t = e.target.closest?.(TITEL_SEL);
  if (!t || !e.isPrimary || e.button > 0 || document.querySelector('.menu, .pop')) return;
  titelDruck = { t, x0: e.clientX, y0: e.clientY, timer: setTimeout(() => {
    titelDruck = null;
    if (navZug?.aktiv || blattZug?.aktiv || !t.isConnected || !titelGekuerzt(t)) return;
    titelKlickWeg = performance.now() + 1000;   // das Loslassen danach löst nichts aus
    zeigeTitelBlase(t);
  }, 600) };
}, true);
addEventListener('pointermove', e => { if (titelDruck && Math.hypot(e.clientX - titelDruck.x0, e.clientY - titelDruck.y0) > LANG_WEG) titelDruckEnde(); }, true);
['pointerup', 'pointercancel'].forEach(t => addEventListener(t, e => { titelDruckEnde(); if (e.type === 'pointercancel') titelKlickWeg = 0; }, true));
addEventListener('mousedown', e => { if (performance.now() < titelKlickWeg) e.preventDefault(); }, true);
addEventListener('click', e => { if (performance.now() < titelKlickWeg) { titelKlickWeg = 0; e.preventDefault(); e.stopImmediatePropagation(); } }, true);
addEventListener('scroll', () => { titelDruckEnde(); titelBlaseZu(); }, { capture: true, passive: true });

// R-2.7 (seit 4.49.0, APD-62 / APD-38/T-43, Testfall-Liste arbeit/APD-62 Titel antippen Testfall-Liste und Wortlaut.md H-1 bis H-10): Titel
// antippen = nach oben – kurzes Antippen des Titels rollt den zugehörigen Bereich sanft ganz nach oben: Kopfzeile (15.3) den Inhalt,
// Seitenleiste (15.4) ihre Liste, Fenster-Kopfzeile (15.8) den Inhalt des Fensters. Ersatz für das Antippen der Statusleiste bei Apple,
// das in der Home-Bildschirm-App für eigene Rollbereiche nicht wirkt (Abweichung, Designrichtlinie 16). Schon oben: nichts. Ein Tipp oder
// Wischen während des Rollens hält es an; ‚Bewegung reduzieren‘: sofort oben (Inhalt blendet über wie bei ‚Nach oben‘, R-1.9). Kein Rollen
// nach langem Drücken (R-2.5) und während eines Seitenwechsels bzw. Zurückwischens (R-7.5). Der Titel bleibt Überschrift (R-1.8).
const TITEL_OBEN = [['.nb-title, .pnav-title', () => scrollView.el || document.scrollingElement],
  ['.side-head .ttl, .side-head > h2', t => t.closest('#side')?.querySelector('.side-list')],
  ['.dlg-head h3', t => t.closest('dialog')?.querySelector('.dlg-body')]];
let titelTipp = null, titelRollt = null;
// Eigenes Rollen Bild für Bild statt scrollTo smooth: Chromium hält ein weiches Rollen unter Last nicht verlässlich an, WebKit gar nicht
// (scrollView.stop) – hier heißt Anhalten nur ‚kein weiteres Bild‘, in beiden Browsern gleich (H-6). Seit 4.57.0 (R-1.12, APD-127/B-5) mit der
// Feder aus Notizen über 0,5 s (bis 4.56.0 kubisch auslaufend in 0,3 bis 0,7 s je nach Weg).
function titelRoll(el) {
  const y0 = el.scrollTop, t0 = performance.now(), dauer = GLEIT_AUF_MS, lauf = titelRollt = { el };
  const f = jetzt => {
    if (titelRollt !== lauf || !el.isConnected) return;
    const k = Math.min(1, (jetzt - t0) / dauer);
    el.scrollTop = y0 * (1 - gleitFeder(k));
    if (k < 1) requestAnimationFrame(f); else titelRollt = null;
  };
  requestAnimationFrame(f);
}
const titelRollHalt = () => { titelRollt = null; };
// H-6: jeder Tipp bzw. jedes Wischen hält das Rollen an – und löst wie bei Apple sonst nichts aus (der Klick danach entfällt)
let titelHaltKlick = false;
addEventListener('pointerdown', e => {
  titelHaltKlick = !!titelRollt; titelRollHalt();
  titelTipp = e.isPrimary && e.button <= 0 && e.target.closest?.(TITEL_OBEN.map(([s]) => s).join(', ')) ? performance.now() : null;
}, true);
addEventListener('wheel', titelRollHalt, { capture: true, passive: true });
addEventListener('click', e => { if (titelHaltKlick) { titelHaltKlick = false; e.preventDefault(); e.stopImmediatePropagation(); } }, true);
['pointercancel', 'keydown'].forEach(t => addEventListener(t, () => { titelHaltKlick = false; }, true));   // gewischt bzw. Taste: kein Klick, der zu sperren wäre
// Seit 4.49.1 (APD-109, Usertest P-90, Messung tests/messungen/2026-11-02 iPad quer Titel antippen Messmodus.txt; Designrichtlinie 13): am
// document, nicht am window – Safari schickt den Klick auf den Titel (kein antippbares Element) nur, wenn er, ein Element darüber oder das
// document einen Hörer hat; am iPad kam er sonst nie an (Kopfzeile, Seitenleiste), am iPhone nur, weil die Kopfzeile tabindex hat (R-1.8).
document.addEventListener('click', e => {
  const start = titelTipp; titelTipp = null;
  if (start === null || performance.now() - start >= 600 || e.defaultPrevented) return;   // nur kurzes Antippen (R-2.5: lang = Blase)
  if (navZug?.aktiv || blattZug?.aktiv || /(^|\s)(nav-|blatt-faehrt|blatt-zieht)/.test(document.documentElement.className)) return;
  const treffer = TITEL_OBEN.find(([s]) => e.target.closest?.(s));
  const el = treffer && treffer[1](e.target.closest(treffer[0]));
  if (!el || el.scrollTop <= 0) return;   // H-4: schon oben
  const los = weich => { if (weich) titelRoll(el); else el.scrollTo({ top: 0, behavior: 'instant' }); };
  if (el === scrollView.el || el === document.scrollingElement) nachTastatur(() => rolleSpringt(los));
  else los(!bewegungRuhig());
});

// R-3.6 (seit 4.48.0, APD-105 Variante C, Testfall-Liste arbeit/APD-105 Testfall-Liste.md B-1 bis B-8): Rückmeldung beim Berühren wie Apple –
// solange der Finger liegt, wird eine Schaltfläche blass (Klasse .beruehrt: Icon und Text 35 %), eine Listen- oder Tabellenzeile grau
// (BERUEHR_ZEILE; Zeilen ohne <button> zählen, wenn die App ihnen ein onclick gibt). Schaltflächen sofort, in Rollbereichen (Liste,
// Smiley-Leiste, Kapsel – jede Fläche, die rollen kann) erst nach BERUEHR_VERZUG, damit beim Rollen nichts aufblitzt. Wandert der Finger
// mehr als LANG_WEG oder rollt die Fläche, verschwindet sie, und der Klick danach löst nichts aus. Loslassen blendet in 0,15 s aus
// (.beruehrt-aus). Gesperrte Schaltflächen zeigen nichts. ‚Blau getönt = gedrückt‘ (.on, offenes Menü) bleibt davon unberührt.
// Seit 4.48.2 (APD-107 Variante C, Testfall-Liste arbeit/APD-107 Testfall-Liste.md S-1 bis S-13): eine Schaltfläche einer Leiste (GROSS_SEL) hebt sich
// stattdessen als helle Fläche mit Schatten 1,3-fach über seine Kapsel (design.css); das Loslassen nach dem Abbruch ist gesperrt, wie lange
// der Finger auch liegt – Safari meldet beim Wegziehen in einer Leiste kein pointercancel und schickt beim Loslassen den Klick (Messung P-88/1:
// 843 ms nach dem Abbruch öffnete sich das Menü, die Sperre galt nur 600 ms).
const BERUEHR_VERZUG = 80;
const BERUEHR_ZEILE = '.side-row, .irow, .menu .mi, tr, .box, li';
const BERUEHR_NICHT = 'input, textarea, select, label, a, dialog, .layer, .side-shade, .nav-schleier, .menu .note';
let beruehr = null, beruehrWeg = null;
// R-3.6 (seit 4.67.2, P-118/F-1 Variante B): Maß des Hebens aus der Breite – 1,3-fach, höchstens aber 24 px breiter (design.css --press-scale)
function pressScale(el) { const w = el.offsetWidth; if (w > 0) el.style.setProperty('--press-scale', Math.min(1.3, (w + 24) / w).toFixed(3)); }
function beruehrZiel(t) {
  for (let el = t?.nodeType === 1 ? t : t?.parentElement; el && el !== document.body; el = el.parentElement) {
    if (el.matches('button')) return el.disabled || el.getAttribute('aria-disabled') === 'true' || el.closest('.menu .note') ? null : el;
    if (el.matches(BERUEHR_NICHT)) return null;
    if (typeof el.onclick === 'function' && el.matches(BERUEHR_ZEILE)) return el;
  }
  return null;
}
// Rollbereich: eine Fläche über dem Element ist zum Rollen gemacht (overflow auto/scroll – wie Apple auch, solange sie noch nicht voll
// ist); eine feste oder haftende Leiste bzw. ein Fenster davor beendet die Suche (Leisten-Schaltflächen: sofort)
function imRollbereich(el) {
  for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
    const c = getComputedStyle(p);
    if (c.position === 'fixed' || c.position === 'sticky' || p.matches('dialog')) return false;
    if (/auto|scroll/.test(c.overflowY + ' ' + c.overflowX)) return true;
  }
  const d = document.scrollingElement;
  return !!d && d.scrollHeight > d.clientHeight + 1;
}
function beruehrAus(sofort = false) {
  const b = beruehr; if (!b) return;
  beruehr = null; clearTimeout(b.timer);
  const el = b.el;
  if (!el.classList.contains('beruehrt')) return;
  if (!sofort) { el.classList.add('beruehrt-aus'); setTimeout(() => el.classList.remove('beruehrt-aus'), 200); }
  el.classList.remove('beruehrt');
}
addEventListener('pointerdown', e => {
  beruehrAus(true); beruehrWeg = null;
  if (!e.isPrimary || e.button > 0) return;
  const el = beruehrZiel(e.target); if (!el) return;
  if (!el.matches('button')) el.classList.add('tippziel');   // R-3.6 (seit 4.48.1, APD-106): keine Textauswahl und Lupe beim Halten
  else pressScale(el);
  const an = () => { if (beruehr?.el === el && el.isConnected && !el.classList.contains('hebt')) { el.classList.remove('beruehrt-aus'); el.classList.add('beruehrt'); } };
  beruehr = { el, x0: e.clientX, y0: e.clientY, timer: 0 };
  if (imRollbereich(el)) beruehr.timer = setTimeout(an, BERUEHR_VERZUG); else an();
}, true);
addEventListener('pointermove', e => {
  if (beruehr && Math.hypot(e.clientX - beruehr.x0, e.clientY - beruehr.y0) > LANG_WEG) beruehrAbbruch();
}, true);
addEventListener('pointerup', () => beruehrAus(), true);
addEventListener('pointercancel', () => beruehrAbbruch(), true);
addEventListener('scroll', e => { if (beruehr && (e.target === document || e.target.contains?.(beruehr.el))) beruehrAbbruch(); }, { capture: true, passive: true });
// der Klick nach einem abgebrochenen Berühren (gewandert, gerollt) löst nichts aus – nur dieser eine: gesperrt bis zum Loslassen, dann noch
// 400 ms für den Klick, der ihm folgt (seit 4.48.2, APD-107/S-1, S-5); die Tastatur gibt sofort frei (S-6)
function beruehrAbbruch() { if (!beruehr) return; beruehrWeg = { el: beruehr.el, bis: Infinity }; beruehrAus(true); }
['pointerup', 'pointercancel'].forEach(t => addEventListener(t, () => { if (beruehrWeg?.bis === Infinity) beruehrWeg.bis = performance.now() + 400; }, true));
addEventListener('keydown', () => { beruehrWeg = null; }, true);
addEventListener('click', e => {
  const w = beruehrWeg; beruehrWeg = null;
  if (w && performance.now() < w.bis && w.el.contains(e.target) && !grossSelbst) { e.preventDefault(); e.stopImmediatePropagation(); }
}, true);
// Seit 4.50.0 (APD-108, Testfall-Liste arbeit/APD-108 Testfall-Liste.md W-1 bis W-13; Designrichtlinie 13 ‚Klick nach dem Wischen‘): Safari
// schickt nach dem Loslassen einen Klick an das Element unter dem Aufsetzen, auch nach weitem Weg, als eigene Aufgabe 1–4 ms nach pointerup –
// nach einem setTimeout 0 (Messung APD-106, Fall 3). Eine Sperre ‚Wischen tippt nie an‘ gilt darum wie beruehrWeg: an() bis zum Loslassen,
// los() danach noch 400 ms für genau einen Klick (der erste verbraucht sie); das nächste Aufsetzen (frei()) und jede Taste geben frei.
// Klicks, die ui.js selbst auslöst (eigenKlick, z. B. das x nach dem Ziehen des Blatts), sperrt sie nicht.
let klickEigen = false;
function eigenKlick(el) { klickEigen = true; try { el.click(); } finally { klickEigen = false; } }
function klickSperre() {
  let bis = 0;
  const s = { an() { bis = Infinity; }, los() { if (bis === Infinity) bis = performance.now() + 400; }, frei() { bis = 0; },
    aktiv: () => performance.now() < bis,
    nimm() { if (klickEigen || performance.now() >= bis) return false; bis = 0; return true; } };
  addEventListener('keydown', s.frei, true);
  return s;
}

// R-2.6 (seit 4.48.0, APD-104 Variante A, Testfall-Liste arbeit/APD-104 Testfall-Liste.md L-1 bis L-9): Großanzeige für Leisten-Schaltflächen wie
// Apple (WWDC19 Session 261) – ab der Textgröße AX1 (html.ts-ax) zeigt langes Drücken (R-3.5: still, 0,6 s) auf eine Schaltfläche einer Leiste
// (Kopfzeile, Fenster-Kopfzeile, Seitenleiste, schwebende Schaltflächen) Icon und Namen groß in der Mitte des Bildschirms; gleitet der Finger über
// die Schaltflächen, wechselt die Anzeige; Loslassen über einer Schaltfläche löst sie aus, daneben schließt sie nur. Unter AX1 und bei kurzem Antippen
// nichts davon. Esc und Drehen schließen sie ohne Auslösen. Die Anzeige ist nur zu sehen (aria-hidden) – VoiceOver nennt jede Schaltfläche (R-1.8).
// Solange sie offen ist, rollt die Seite nicht mit (touchmove), damit Safari den Finger nicht übernimmt.
const GROSS_SEL = ':is(.nb, .pnav, .bbar, .dlg-head, .side-head, .side-search, .fab) button';
let largeContent = null, grossEl = null, grossKlickWeg = 0, grossSelbst = false;
const grossName = k => (k.getAttribute('aria-label') || k.textContent || '').trim();
function grossKnopfBei(x, y) {
  const k = document.elementFromPoint(x, y)?.closest?.(GROSS_SEL);
  return k && k.getClientRects().length && !k.closest('[inert]') ? k : null;
}
function grossAnzeigeZu() {
  grossEl?.remove(); grossEl = null;
  if (largeContent?.k) largeContent.k.classList.remove('beruehrt');
}
function grossZu() { if (!largeContent) return; clearTimeout(largeContent.timer); grossAnzeigeZu(); largeContent = null; }
function grossZeige(k) {
  if (largeContent.k && largeContent.k !== k) largeContent.k.classList.remove('beruehrt');
  largeContent.k = k; pressScale(k); k.classList.add('beruehrt');
  const host = k.closest('dialog') || document.body;
  if (!grossEl || grossEl.parentNode !== host) {
    grossEl?.remove();
    grossEl = document.createElement('div');
    grossEl.className = 'grossanzeige';
    grossEl.setAttribute('aria-hidden', 'true');
    host.append(grossEl);
  }
  const svg = k.querySelector('svg');
  grossEl.innerHTML = (svg ? svg.outerHTML : '') + `<span>${esc(grossName(k))}</span>`;
  // in der Mitte des sichtbaren Bereichs – gemessen und nachgerückt, falls der Rahmen (Fenster) selbst verschoben ist
  grossEl.style.left = grossEl.style.top = '0px';
  const vv = window.visualViewport, h = vv ? vv.height : innerHeight, oben = vv ? vv.offsetTop : 0;
  const r0 = grossEl.getBoundingClientRect();
  grossEl.style.left = Math.round((innerWidth - r0.width) / 2 - r0.left) + 'px';
  grossEl.style.top = Math.round(oben + Math.max(12, (h - r0.height) / 2) - r0.top) + 'px';
}
addEventListener('pointerdown', e => {
  grossZu();
  const k = e.target.closest?.(GROSS_SEL);
  if (!k || !e.isPrimary || e.button > 0 || !document.documentElement.classList.contains('ts-ax')) return;
  largeContent = { k: null, x0: e.clientX, y0: e.clientY, offen: false, timer: setTimeout(() => {
    if (!largeContent || navZug?.aktiv || blattZug?.aktiv || !k.isConnected) { largeContent = null; return; }
    largeContent.offen = true; grossKlickWeg = Infinity;   // der Klick nach dem Loslassen gehört der Großanzeige
    if (beruehr) { clearTimeout(beruehr.timer); beruehr = null; }   // die Rückmeldung beim Berühren übernimmt die Großanzeige
    grossZeige(k);
  }, 600) };
}, true);
addEventListener('pointermove', e => {
  if (!largeContent) return;
  if (!largeContent.offen) { if (Math.hypot(e.clientX - largeContent.x0, e.clientY - largeContent.y0) > LANG_WEG) grossZu(); return; }
  const k = grossKnopfBei(e.clientX, e.clientY);
  if (k && k !== largeContent.k) grossZeige(k);
}, true);
function grossEnde(e) {
  if (!largeContent) return;
  clearTimeout(largeContent.timer);
  const offen = largeContent.offen;
  if (!offen) { largeContent = null; return; }
  const k = e.type === 'pointerup' ? grossKnopfBei(e.clientX, e.clientY) : null;
  grossAnzeigeZu(); largeContent = null;
  grossKlickWeg = performance.now() + 400;
  // seit 4.50.0 (APD-108): eigener Klick – die Sperre ‚Wischen tippt nie an‘ (klickSperre) gilt für ihn nicht, der Finger glitt über die Schaltflächen
  if (k && !k.disabled) { grossSelbst = true; klickEigen = true; try { k.click(); } finally { grossSelbst = false; klickEigen = false; } }
}
addEventListener('pointerup', grossEnde, true);
addEventListener('pointercancel', grossEnde, true);
addEventListener('click', e => {
  if (grossSelbst || performance.now() >= grossKlickWeg) return;
  grossKlickWeg = 0; e.preventDefault(); e.stopImmediatePropagation();
}, true);
addEventListener('touchmove', e => { if (largeContent?.offen && e.cancelable) e.preventDefault(); }, { passive: false, capture: true });
addEventListener('contextmenu', e => { if (document.documentElement.classList.contains('ts-ax') && e.target.closest?.(GROSS_SEL)) e.preventDefault(); }, true);
addEventListener('scroll', () => { if (largeContent && !largeContent.offen) grossZu(); }, { capture: true, passive: true });
// Esc bei offener Anzeige schließt nur sie (am iPhone sonst auch ‚zurück‘)
addEventListener('keydown', e => { if (!largeContent || !istAbbruch(e)) return; if (largeContent.offen) verbrauchen(e); grossZu(); grossKlickWeg = performance.now() + 400; }, true);
{ let breite = innerWidth; addEventListener('resize', () => { if (innerWidth !== breite) grossZu(); breite = innerWidth; }); }

/* ---------- AD-Bean sourcehighlight: Hervorgehobene Quelle (seit 4.67.0, APD-136, R-3.3, R-4.13, R-8.1, R-1.13) ---------- */

// Die Schaltfläche, Zeile oder Kachel, aus der etwas kommt – ein Fenster, ein Menü, ein Untermenü, eine Sprechblase oder eine laufende Aktion
// (Teilen, Dateiauswahl) –, bleibt blau getönt (Klasse `on`, R-3.3), bis es fertig ist, auch nach einem Neuaufbau und nach dem Drehen (R-8.1).
// Ersetzt seit 4.67.0 (APD-136, Listenzeile und Testfall-Liste arbeit/0145 APD-136 Bean sourcehighlight Vorschlag.md S-1 bis S-13) hold, release,
// markHeld, setOpener, markOpener und dlgOpener sowie die Tönung in openMenu, im Untermenü und in confirmPop. Namen nach Vorbild (Zusammenarbeit 1):
// Apple `sourceItem` (UIPopoverPresentationController), `highlighted` (UIControl ohne `is`), Web-Ereignis `change`.
// Schnittstelle (R-1.13, Liste der AD-Beans in Designrichtlinie 15) – die App nutzt nur diese Namen:
//   createSourcehighlight(root) – ui.js legt die eine Bean für die Seite an (AD.sourcehighlight)
//   s.sourceItem (lesen und setzen; Standard '') – Quelle des offenen Fensters: setzen tönt sie und gibt die vorige frei, '' gibt frei
//   s.heldItems (nur lesen) – gehaltene Quellen (laufende Aktion, offenes Menü, Untermenü, Sprechblase)
//   s.hold(item) · s.release(item) · s.refresh(root) – item = CSS-Auswahl oder Element; refresh tönt nach einem Neuaufbau in root alle Quellen wieder
//   s.on('change', ({ item, highlighted }) => …) → abmelden
// Eine Stelle ist frei erst, wenn sie weder Quelle noch gehalten ist. Ein Element, das die App neu aufgebaut hat, findet refresh über id, data-id
// bzw. data-day wieder (wie fokusNachFenster); hold und release mit dem alten Element wirken danach auf das neue (seit 4.70.2, P-124/F-2).
function createSourcehighlight(root, { sourceItem = '' } = {}) {
  const hoerer = { change: new Set() };
  const gehalten = new Set();
  // Seit 4.70.2 (P-124/F-2): tauscht refresh ein gehaltenes Element gegen das neu aufgebaute, merkt die Bean den Tausch (alt → neu) – release(alt) und
  // hold(alt) wirken dann auf das neue (vorher blieb nach einem Neuaufbau bei offenem Menü die Schaltfläche gehalten und getönt)
  const getauscht = new Map();
  const aktuell = item => { for (let i = 0; item instanceof Element && getauscht.has(item) && i < 100; i++) item = getauscht.get(item); return item; };
  let quelle = '';
  const melde = (item, highlighted) => hoerer.change.forEach(fn => { try { fn({ item, highlighted }); } catch (e) { console.error(e); } });
  const finde = (item, r = root) => !item ? null : typeof item === 'string' ? (r.querySelector?.(item) || null) : item instanceof Element ? item : null;
  const getoent = el => !!el && (finde(quelle) === el || [...gehalten].some(i => finde(i) === el));
  const toenen = item => finde(item)?.classList.add('on');
  const freigeben = item => { const el = finde(item); if (el && !getoent(el)) el.classList.remove('on'); };
  const bean = {
    get sourceItem() { return quelle; },
    set sourceItem(v) {
      v = v || '';
      if (v) endReveal();   // APD-23: eine laufende Hervorhebung endet, sobald das nächste Fenster aufgeht
      if (v === quelle) { toenen(v); return; }
      const vorher = quelle; quelle = v;
      if (vorher) { freigeben(vorher); melde(vorher, false); }
      if (v) { toenen(v); melde(v, true); }
    },
    get heldItems() { return [...gehalten]; },
    hold(item) { if (!item) return; item = aktuell(item); const neu = !gehalten.has(item); gehalten.add(item); toenen(item); if (neu) melde(item, true); },
    release(item) {
      if (!item) return; item = aktuell(item);
      if (!gehalten.delete(item)) return;
      for (const alt of [...getauscht.keys()]) if (aktuell(alt) === item) getauscht.delete(alt);
      freigeben(item); melde(item, false);
    },
    refresh(r = root) {
      for (const item of [...gehalten]) if (item instanceof Element && !item.isConnected) {
        const neu = wiederFinden(item); if (neu && neu !== item) { gehalten.delete(item); gehalten.add(neu); getauscht.set(item, neu); }
      }
      [...gehalten, quelle].forEach(item => { if (item instanceof Element) { if (item.isConnected && (r === document || r.contains(item))) item.classList.add('on'); } else if (item) r.querySelector?.(item)?.classList.add('on'); });
    },
    on(name, fn) { const h = hoerer[name]; if (!h || typeof fn !== 'function') return () => {}; h.add(fn); return () => { h.delete(fn); }; },
  };
  if (!(root instanceof Node)) { console.error('sourcehighlight: root fehlt'); return bean; }
  if (root instanceof Element) root.dataset.adBean = 'sourcehighlight';
  else document.documentElement.dataset.adBean = 'sourcehighlight';
  if (sourceItem) bean.sourceItem = sourceItem;
  return bean;
}
const sourcehighlight = createSourcehighlight(document.body);

/* ---------- Backup erstellen und laden (R-9.1, R-9.2, seit 4.10.0) ---------- */

// Ergebnis des Teilen-Menüs als Text für das kleine Fenster (✅ bzw. ⚠️ davor).
// Seit 4.57.0 (APD-116, R-10.8): der Dateiname steht allein in einer eigenen Zeile unter dem Satz (.fname, fett, ohne Punkt danach); jedes
// Wort am Stück (.fw), deshalb bricht er nur nach einem Leerzeichen – nie nach ‚-‘ oder ‚.‘.
const fileNameHtml = name => `<b class="fname">${String(name).split(' ').map(w => `<span class="fw">${esc(w)}</span>`).join(' ')}</b>`;
const SHARE_RESULT = {
  shared: name => `Teilen-Menü abgeschlossen für${fileNameHtml(name)}<div class="hint">Wenn du ‚In Dateien sichern‘ gewählt hast, liegt die Datei im gewählten Ordner.</div>`,
  downloaded: name => `Wird geladen:${fileNameHtml(name)}<div class="hint">Du findest die Datei in der Dateien-App unter ‚Downloads‘.</div>`,
  aborted: name => `Teilen-Menü abgebrochen – nicht gespeichert:${fileNameHtml(name)}`,
  error: name => `Konnte nicht übergeben werden:${fileNameHtml(name)}`,
  print: name => `Drucken-Menü geöffnet für${fileNameHtml(name)}<div class="hint">Dort über ‚Teilen‘ → ‚In Dateien sichern‘ als PDF ablegen.</div>`,
};
const shareResultText = (result, name) => `${result === 'aborted' || result === 'error' ? '⚠️' : '✅'} ${SHARE_RESULT[result](name)}`;
const MIME = { json: 'application/json', html: 'text/html', txt: 'text/plain' };
// R-6.2 (seit 4.11.3): Mustertabelle der Ausgabe (Designrichtlinie allgemein 10) – eine Quelle für jede Ausgabe, Vorschau und
// jeden Bericht (z. B. HTML-Ausgabe des Reiselogbuchs, Abgleichbericht): Systemschrift 11 pt, h1 20 pt, h2 14 pt, Tabellen
// mit Linien 1 px #999 (außen und Kopf #a5a5a5), Kopf fett mit dem Kopfverlauf von oben Weiß nach unten #d9d9d9 (seit 4.57.0, RLB-120:
// #ffffff 0 %, #ffffff 25 %, #f6f6f6 50 %, #e9e9e9 75 %, #d9d9d9 100 %), jede zweite Zeile #f5f5f5, Zeilen nicht über
// Seitenumbrüche teilen, dezente letzte Zeile 9 pt grau. scope: Klasse des Inhalts (z. B. '.rt').
const outputCss = scope => `
  ${scope} { font: 11pt/1.4 -apple-system, "Segoe UI", Roboto, Arial, sans-serif; color: #000; }
  ${scope}, ${scope} * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  ${scope} h1 { font-size: 20pt; margin: 0 0 8px; }
  ${scope} h2 { font-size: 14pt; margin: 20px 0 6px; break-after: avoid; page-break-after: avoid; }
  ${scope} table { border-collapse: collapse; }
  ${scope} .ict { display: inline-block; max-width: 100%; }
  ${scope} .ict .az-n { white-space: nowrap; }
  ${scope} .meta td { border: none; padding: 1px 16px 1px 0; vertical-align: top; }
  ${scope} table.grid { width: 100%; margin-top: 12px; table-layout: auto; }
  ${scope} table.grid.fit { width: auto; }
  ${scope} table.grid th, ${scope} table.grid td { border: 1px solid #999; padding: 6px 8px; vertical-align: top; text-align: left; }
  ${scope} table.grid thead th { background: linear-gradient(to bottom, #ffffff 0%, #ffffff 25%, #f6f6f6 50%, #e9e9e9 75%, #d9d9d9 100%); border-color: #a5a5a5; font-weight: 700; }
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
// ‚Letztes Backup erstellt am …‘ (je Gerät) und ob heute schon eins erstellt wurde (sonst steht die Backup-Kachel da).
const backupLastText = ms => ms ? `Letztes Backup erstellt am ${whenText(ms)}` : 'Noch kein Backup erstellt.';
const backupToday = ms => Boolean(ms) && new Date(ms).toDateString() === new Date().toDateString();
// Backup-Datei: ‚Ω Backup <App> JJJJ.MM.TT hh.mm.json‘, mit Zeitpunkt und Gerät (für den Abgleich, R-9.2).
function backupFileOf(app, data) {
  const n = new Date(), two = x => String(x).padStart(2, '0');
  return { name: `Ω Backup ${app} ${n.getFullYear()}.${two(n.getMonth() + 1)}.${two(n.getDate())} ${two(n.getHours())}.${two(n.getMinutes())}.json`, type: 'json',
    content: JSON.stringify({ ...data, savedAt: Date.now(), savedOn: deviceName() }, null, 2) };
}
// Fuß der Seitenleiste bzw. Startliste. Seit 4.34.0 (R-9.1, APD-74): die gelbe Backup-Kachel steht nur, solange heute auf diesem
// Gerät noch kein Backup erstellt wurde und es etwas zu sichern gibt (leer = keine Einträge); danach verschwindet sie (wie die
// Hinweise in den Einstellungen) – ‚Backup erstellen‘ und ‚Letztes Backup …‘ bleiben im Mehr-Menü. Um 0:00 kommt sie wieder
// (onDayChange). Seit 4.15.0 (R-1.5): darunter grau die Zeile ‚Offline – …‘, solange die App offline arbeitet – seit 4.34.0 auch
// ohne Kachel; die App setzt den Fuß deshalb immer, auch bei leerer Liste.
const backupTileHtml = (ms, leer = false) => `<div class="side-foot">${leer || backupToday(ms) ? '' : `<div class="bhint"><div>${backupLastText(ms)}</div>
      <button type="button" id="hintBackup">${ic('save')}Backup erstellen</button></div>`}${netLineHtml()}</div>`;
// Oberstes sichtbares Element im Fuß (Backup-Kachel, sonst Offline-Zeile): Menüs und die Meldung ‚Du bist offline‘ bleiben darüber.
const sideFootRect = side => side?.querySelector('.side-foot .bhint, .side-foot .offl:not([hidden])')?.getBoundingClientRect();
// Seit 4.34.0 (APD-74): fn läuft, sobald ein neuer Kalendertag beginnt – um 0:00 und bei der Rückkehr in die App (im Hintergrund
// hält Safari Zeitgeber an). Die App zeichnet damit die Liste neu (Backup-Kachel kommt wieder).
function onDayChange(fn) {
  let tag = new Date().toDateString(), timer = null;
  const plane = () => { clearTimeout(timer); const n = new Date(); n.setHours(24, 0, 1, 0); timer = setTimeout(pruefe, n - Date.now()); };
  const pruefe = () => { const t = new Date().toDateString(); if (t !== tag) { tag = t; fn(); } plane(); };
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') pruefe(); });
  plane();
}

/* ---------- Offline-Hinweis (seit 4.15.0, R-1.5, APD-6 Variante c) ---------- */
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
  const fab = document.querySelector('.fab:not([hidden]):not(.still)');
  t.style.setProperty('--toast-w', Math.max(200, Math.round(innerWidth - left - (fab || left || innerWidth >= 700 ? 144 : 32))) + 'px');
  // Über einer festen unteren Leiste (iPhone, .bbar), sonst am unteren Rand
  // iPhone-Startliste: über der Backup-Kachel bzw. (ohne Kachel, seit 4.34.0) über der Offline-Zeile – die Meldung verdeckt sie nicht
  const bar = document.querySelector('.bbar')?.getBoundingClientRect();
  const tile = !left && side && !side.hidden ? sideFootRect(side) : null;
  const lift = Math.max(bar && bar.height ? innerHeight - bar.top : 0, tile && tile.height ? innerHeight - tile.top - 28 + 10 : 0);
  t.style.setProperty('--toast-lift', Math.round(lift) + 'px');
}
window.addEventListener('resize', () => requestAnimationFrame(placeNetToast));
function showNetToast(state) {
  netClose?.();   // höchstens eine Meldung zugleich (samt Beobachter)
  clearTimeout(netTimer);
  const t = document.createElement('div');
  t.className = 'nettoast';
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
  // R-1.8 (seit 4.35.0, V13): angesagt über den Ansage-Bereich (auch bei offenem Fenster), die Meldung selbst ohne role="status"
  announce(state === 'aus' ? 'Du bist offline. Die App arbeitet weiter; alles bleibt auf diesem Gerät.' : 'Wieder online');
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
// Zeitpunkte (seit 4.66.0 mit Standardwert `${sub}At`, APD-136 b2 – ohne Angabe landeten sie unter ‚undefined‘), maxFields = Felder ohne Zeitpunkt, beim Abgleich gilt der größere Wert (z. B. Dateinummer).
// Jede Änderung bekommt je Feld Zeitpunkt und Gerät (metaAt = { Feld: Zeitpunkt }, subAt = { Schlüssel: { Feld: Zeitpunkt } },
// changedAt/changedOn für ‚geändert am … · Gerät‘). Gelöschte Einträge stehen in data.deleted ({ id, at, on }).
// R-9.3: je Feld gilt die neuere Änderung; gleich alt: das Vorhandene hier bleibt, Fehlendes kommt dazu.
// R-9.3: ein gelöschter Eintrag bleibt gelöscht, solange er danach nicht mehr geändert wurde – mit Hinweisen.
// Seit 4.11.0: labels – Namen der Felder für die Tabelle der Änderungen ({ title: 'Titel', … }); Unterdaten mit einem
// ISO-Datum als Schlüssel erscheinen als ‚Mo 12.10.2026‘, sonst über subLabel(key).
// Seit 4.12.1: values – je Feld, wie ein Wert im Abgleichbericht angezeigt wird ({ transport: v => … }), damit dort dasselbe
// steht wie in der App (R-10.1) und nicht der gespeicherte Wert (z. B. Kürzel).
// Seit 4.68.0 (RLB-125): protect – sagt, welche Einträge gesperrt sind (z. B. e => e.locked). Ein gesperrter Eintrag wird beim Abgleich
// nie gelöscht, auch nicht, wenn das andere Gerät ihn gelöscht hat, ohne die Sperre zu kennen (15.18 Fall 23, R-9.3): auf dem Gerät, das
// gelöscht hat, kommt er gesperrt zurück (restored), auf dem Gerät mit der Sperre bleibt er (keptProtected); sein Eintrag in deleted entfällt.
// Seit 4.71.0 (RLB-126, R-7.10): recentlyDeleted – Name des Felds mit ‚Zuletzt gelöscht‘ (AD-Bean recentlydeleted, z. B. 'recentlyDeleted'). Beim Abgleich
// gilt je Eintrag der jüngere Löschzeitpunkt beider Geräte; er bleibt in ‚Zuletzt gelöscht‘, solange er nach dem Abgleich nicht in der Liste steht
// (wiederhergestellt, danach geändert oder gesperrt), sein Eintrag in deleted besteht und nicht endgültig gelöscht ist (purged – gleich alt: purged gilt).
function createSync({ list, sub, subAt = `${sub}At`, maxFields = [], nouns = ['Eintrag', 'Einträge', 'Einträgen'], labels = {}, values = {}, subLabel = null, protect = null, recentlyDeleted = null, app = document.title }) {
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
  // on }], keptChanged [{ title, on }], newer [{ title, rows, only, at, on }] (hier neuer als im Backup), same (Anzahl unverändert),
  // restored [{ title, on }] (hier gelöscht, drüben gesperrt – kommt zurück), keptProtected [{ title, on }] (drüben gelöscht, hier gesperrt).
  // on = Gerät der Änderung, soweit bekannt (sonst null: das Gerät des Backups bzw. dieses Gerät).
  function merge(local, remote) {
    const stats = { updated: [], added: [], removed: [], keptDeleted: [], keptChanged: [], newer: [], same: 0, restored: [], keptProtected: [] };
    const locked = e => !!(protect && protect(e));
    // Zeile der Tabelle: Felder, jüngster Zeitpunkt; Gerät, wenn es die letzte Änderung des Eintrags war.
    const row = (key, fields, e) => { const at = Math.max(0, ...fields.map(f => f.at || 0)); return { key, fields, at, on: at && at === e.changedAt ? e.changedOn : null }; };
    const del = new Map();
    for (const x of [...(local.deleted || []), ...(remote.deleted || [])]) if (!del.has(x.id) || del.get(x.id).at < x.at || (del.get(x.id).at === x.at && x.purged)) del.set(x.id, x);
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
        if (gone && gone.at > (l.changedAt || 0) && locked(l)) {   // Fall 23: drüben gelöscht, hier gesperrt – bleibt
          out.push(l); stats.same++; stats.keptProtected.push({ title: l.title, on: gone.on }); del.delete(id);
        } else if (gone && gone.at > (l.changedAt || 0)) stats.removed.push({ title: l.title, at: gone.at, on: gone.on });
        else {
          out.push(l); stats.same++;
          if (gone) stats.keptChanged.push({ title: l.title, on: gone.on });
          else stats.newer.push({ title: l.title, rows: [], only: true, subs: Object.keys(l[sub] || {}).length, at: l.changedAt, on: l.changedOn });   // nur hier
        }
      } else if (gone && gone.at >= (r.changedAt || 0) && !locked(r)) {
        stats.keptDeleted.push({ title: r.title, at: gone.at, on: gone.on });
      } else {
        if (gone && gone.at >= (r.changedAt || 0)) { stats.restored.push({ title: r.title, on: r.changedOn }); del.delete(id); }   // Fall 23: hier gelöscht, drüben gesperrt – kommt zurück
        out.push(structuredClone(r)); stats.added.push({ title: r.title, subs: Object.keys(r[sub] || {}).length, at: r.changedAt, on: r.changedOn });
      }
    }
    const result = { ...local, [list]: out, deleted: [...del.values()] };
    if (recentlyDeleted) {
      const rd = new Map(), inList = new Set(out.map(e => e.id));
      for (const x of [...(local[recentlyDeleted] || []), ...(remote[recentlyDeleted] || [])]) if (x?.id && (!rd.has(x.id) || rd.get(x.id).at < x.at)) rd.set(x.id, x);
      result[recentlyDeleted] = [...rd.values()].filter(x => !inList.has(x.id) && del.has(x.id) && !del.get(x.id).purged).map(x => structuredClone(x));
    }
    return { data: result, stats };
  }
  // R-9.2: Abfrage beim Laden eines Backups – Zeitpunkt und Gerät, neuer oder älter, kurze Erklärung der Wege.
  function question(local, remote, savedAt, savedOn, unit = 'Tag') {
    const n = remote[list].length, here = deviceName(), mine = latest(local), theirs = latest(remote) || savedAt;
    const cmp = !mine ? '' : `<br>Es ist <b>${theirs > mine ? 'neuer' : theirs < mine ? 'älter' : 'gleich alt'}</b> ${theirs === mine ? 'wie' : 'als'} die Daten auf diesem ${here} (zuletzt geändert am ${whenText(mine)}).`;
    return `Backup vom <b>${whenText(savedAt)}</b>${savedOn ? ` (${esc(savedOn)})` : ''} mit ${n} ${n === 1 ? nouns[0] : nouns[2]}.${cmp}`;
  }
  // R-9.2: je Weg eine Kachel mit Erklärung und Schaltfläche; Abbrechen darunter.
  // Seit 4.68.0 (RLB-125/J-3): mit protect nennt ‚Ersetzen‘ die gesperrten Einträge auf diesem Gerät – ‚Darunter 2 gesperrte Reiselogbücher.‘;
  // die Endung im Singular steht in nouns[3] (‚es‘ für ‚1 gesperrtes Reiselogbuch‘, Standard ‚er‘ für ‚1 gesperrter Eintrag‘).
  const lockedText = local => {
    const n = protect && local ? local[list].filter(e => protect(e)).length : 0;
    return !n ? '' : n === 1 ? ` Darunter 1 gesperrt${nouns[3] || 'er'} ${nouns[0]}.` : ` Darunter ${n} gesperrte ${nouns[1]}.`;
  };
  const choices = (unit = 'Tag', local = null) => [
    { label: 'Abgleichen', cls: 'primary', value: 'merge', desc: `Je ${nouns[0]} und ${unit} gilt die neuere Fassung; gelöschte ${nouns[1]} werden auch hier gelöscht.` },
    { label: 'Ersetzen', cls: 'danger-text', value: 'replace', desc: `Alle Daten auf diesem ${deviceName()} werden durch das Backup ersetzt.${lockedText(local)}` },
    { label: 'Abbrechen', value: null }];
  const ask = (anchor, local, remote, savedAt, savedOn) => choosePop(anchor, question(local, remote, savedAt, savedOn), choices(undefined, local));
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
  const worthReport = st => anything(st) || (st.newer || []).length + st.keptDeleted.length + st.keptChanged.length + (st.keptProtected || []).length > 0;
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
  const atText = at => at ? (d => `${two(d.getDate())}.${two(d.getMonth() + 1)}.${d.getFullYear()} ${two(d.getHours())}:${two(d.getMinutes())}`)(new Date(at)) : '–';
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
    // 15.18 Fall 23 (protect): gesperrt geht vor gelöscht.
    const otherDevice = on => !(on || savedOn) ? 'dem anderen Gerät' : (on || savedOn) === here ? `dem anderen ${esc(on || savedOn)}` : `dem ${esc(on || savedOn)}`;
    const restored = stats.restored || [], keptProtected = stats.keptProtected || [];
    for (const on of [...new Set(restored.map(k => k.on))]) {
      const l = restored.filter(k => k.on === on);
      notes.push(`<b>Auf ${otherDevice(on)} gesperrt, auf diesem ${esc(here)} gelöscht:</b> ${l.map(k => esc(k.title)).join(', ')} – wiederhergestellt.`);
    }
    for (const on of [...new Set(keptProtected.map(k => k.on))]) {
      const l = keptProtected.filter(k => k.on === on);
      notes.push(`<b>Auf ${otherDevice(on)} gelöscht, auf diesem ${esc(here)} gesperrt:</b> ${l.map(k => esc(k.title)).join(', ')} – ${l.length === 1 ? 'bleibt' : 'bleiben'} erhalten.`);
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
  return { snapshot, stamp, latest, merge, question, choices, ask, resultText, reportHtml, openReport, showResult, changedLine, config: { list, sub, subAt, maxFields, nouns, labels, values, protect, recentlyDeleted, app } };
}

/* ---------- Meldungen und Sicherheitsabfragen ---------- */

// Kleines Fenster mit rundem x; Abfragen mit Entscheidung sind Sprechblasen (confirmPop).
// Seit 4.11.0: { wide: true } – breiteres Fenster; { action: { label, icon, run } } – eine blaue Schaltfläche unter dem
// Text (z. B. ‚Abgleichbericht anzeigen‘, R-9.4): schließt das Fenster und führt run() aus.
/* ---------- AD-Bean alert: Hinweisfenster (seit 4.64.0, APD-138, R-10.8, R-1.13; Kennung alert seit 4.67.0, APD-136) ---------- */

// Seit 4.64.0 (APD-138, R-10.8, R-1.13): das Hinweisfenster ist eine AD-Bean (Fenster und Meldungen) auf <dialog id="msg">; ui.js legt sie
// einmal an (AD.alert), inform(…) ist der kurze Aufruf dafür. Seit 4.67.0 (APD-136, Zusammenarbeit 1 ‚Code englisch‘) heißt sie `alert` (ersetzt
// `hinweis`) – Namen nach Vorbild: Web `alert()` und `<dialog>` (`open`, `showModal()`, `close()`, Ereignis `close`), Apple *alert* (`title`, `message`).
// Eigenschaft fitFileName (Standard ein): steht ein Dateiname (.fname) im Text, wird das Fenster am iPad so breit, dass er in einer Zeile
// steht – mindestens die Grundbreite, höchstens die verfügbare Breite (Bildschirmbreite − 32 px, quer also breiter als hoch; R-10.8); darüber
// Umbruch nur nach einem Leerzeichen (.fw). Am iPhone bleibt die Breite aus design.css.
// Seit 4.70.2 (P-124/F-1, Nutzer 26.11.2026, Sitzung 0162 – arbeit/0162 AD-Bean alert – wie sie rechnet.md): eine Funktion layout() rechnet Breite,
// Höhe und Lage auf einmal – vorher Grundbreite aus design.css, Höchstbreite geborgt vom breiten Fenster (600 px), MutationObserver und Lage in
// placeDialogs. Verfügbare Fläche = sichtbarer Bereich (visualViewport) minus sichere Ränder und ein fester Rand ALERT_RAND (16 px) je Seite
// (ersetzt 32 px, 90vw und oben/unten 10 px). Breite = was der Inhalt braucht, mindestens 360 px × Textgröße (breit 600 px × Textgröße), höchstens die
// verfügbare Breite; Höhe = Inhalt, höchstens die verfügbare Höhe (darüber rollt der Text); die Bean zentriert in der Fläche. Der Inhalt ist vor dem
// Öffnen fertig: message ist HTML oder ein Element (z. B. Kästen der AD-Bean notice, vor showModal angelegt). Neu gerechnet bei resize (Drehen,
// Textgröße – textWechsel meldet resize), über placeDialogs (Tastatur, sichtbarer Bereich), wenn die AD-Bean notice im Fenster neu aufbaut, und
// wenn sich die Größe sonst ändert (ResizeObserver, im nächsten Bild – im Rückruf selbst meldete Safari eine ResizeObserver-Schleife).
// Schnittstelle (R-1.13, Liste der AD-Beans in Designrichtlinie 15) – die App nutzt nur diese Namen:
//   inform(title, message, { wide, action }) → Promise (erfüllt beim Schließen) – message: HTML oder Element
//   createAlert(dialog, { fitFileName = true }) – ui.js legt die eine Bean für #msg an
//   a.fitFileName (lesen und setzen) · a.open (nur lesen) · a.showModal(title, message, { wide, action }) → Promise · a.close() · a.on('close', fn) → abmelden
// CSS nur unter .ad-alert (Fenster), .ad-alert-wide, -form, -head, -message, -buttons, -button (seit 4.66.0 unter der Bean, APD-136 b1; englisch seit 4.67.0).
const ALERT_RAND = 16;
const alertLayouts = new Map();   // dialog → layout() jeder AD-Bean alert (placeDialogs und AD-Bean notice rufen sie)
function createAlert(dialog, { fitFileName = true } = {}) {
  const hoerer = { close: new Set() };
  let fertig = null;
  const bean = {
    get fitFileName() { return fitFileName; },
    set fitFileName(v) { fitFileName = !!v; layout(); },
    get open() { return !!dialog?.open; },
    showModal, close() { fertig?.(); },
    on(name, fn) { const h = hoerer[name]; if (!h || typeof fn !== 'function') return () => {}; h.add(fn); return () => { h.delete(fn); }; },
  };
  if (!(dialog instanceof HTMLDialogElement)) { console.error('alert: dialog fehlt'); return bean; }
  dialog.dataset.adBean = 'alert';
  dialog.classList.add('ad-alert');
  // Verfügbare Fläche: sichtbarer Bereich (bei offener Tastatur darüber) minus sichere Ränder und ALERT_RAND je Seite
  function flaeche() {
    const vv = window.visualViewport, s = safeRand(), kb = kbOffen();
    const top = vv ? Math.max(0, scrollView.el ? Math.min(vv.offsetTop, scrollY) : vv.offsetTop) : 0;   // wie placeDialogs (APD-115/N-11)
    const links = s.left + ALERT_RAND, oben = s.top + ALERT_RAND, unten = (kb ? 0 : s.bottom) + ALERT_RAND;
    return { top, left: (vv ? vv.offsetLeft : 0) + links, oben,
      breite: Math.max(0, (vv ? vv.width : innerWidth) - links - s.right - ALERT_RAND),
      hoehe: Math.max(200, (vv ? vv.height : innerHeight) - oben - unten) };
  }
  // Breite, die der Inhalt braucht: der Dateiname in einer Zeile + Rand des Fensters um den Text; ohne Dateiname die Mindestbreite
  function braucht(minimum) {
    const n = fitFileName && dialog.querySelector('.fname');
    if (!n) return minimum;
    const probe = n.cloneNode(true);
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;display:inline-block;width:auto;left:0;top:0';
    n.parentNode.append(probe);
    const name = probe.getBoundingClientRect().width;
    probe.remove();
    return Math.ceil(name + dialog.getBoundingClientRect().width - n.getBoundingClientRect().width + 1);
  }
  function layout() {
    if (!dialog.open) return;
    const f = flaeche();
    dialog.style.setProperty('--msg-max', Math.round(f.hoehe) + 'px');
    if (isPhone()) { dialog.style.width = ''; dialog.style.maxWidth = ''; }   // iPhone: Breite aus design.css
    else {
      const t = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--f-body')) || 1;
      const grund = dialog.classList.contains('ad-alert-wide') ? 600 : 360, minimum = Math.max(grund, grund * t);
      dialog.style.width = Math.floor(Math.min(f.breite, Math.max(minimum, braucht(minimum)))) + 'px';
      dialog.style.maxWidth = 'none';
    }
    const b = dialog.getBoundingClientRect();
    dialog.style.margin = '0'; dialog.style.right = 'auto'; dialog.style.bottom = 'auto';
    dialog.style.left = Math.round(f.left + Math.max(0, (f.breite - b.width) / 2)) + 'px';
    dialog.style.top = Math.round(f.top + f.oben + Math.max(0, (f.hoehe - b.height) / 2)) + 'px';
  }
  alertLayouts.set(dialog, layout);
  addEventListener('resize', layout);
  if (window.ResizeObserver) new ResizeObserver(() => requestAnimationFrame(layout)).observe(dialog);
  function showModal(title, message, { wide = false, action = null } = {}) {
    return new Promise(resolve => {
      dialog.classList.toggle('ad-alert-wide', wide);
      dialog.innerHTML = `
      <form method="dialog" class="ad-alert-form">
        <div class="dlg-head ad-alert-head"><div class="hl"><button type="button" class="round" data-x aria-label="Schließen">${ic('x')}</button></div>
          <div class="mid"><h3 id="msgTitel">${esc(title)}</h3></div><div class="hr"></div></div>
        <div class="dlg-body"><div class="ad-alert-message" id="msgText">${message instanceof Node ? '' : message}</div>${action ? `<div class="ad-alert-buttons"><button type="button" class="primary ad-alert-button" data-act>${action.icon ? ic(action.icon) : ''}${esc(action.label)}</button></div>` : ''}</div>
      </form>`;
      if (message instanceof Node) dialog.querySelector('#msgText').append(message);
      const done = () => { fertig = null; if (dialog.open) dialog.close(); hoerer.close.forEach(fn => { try { fn(); } catch (e) { console.error(e); } }); resolve(); };
      fertig = done;
      if (action) dialog.querySelector('[data-act]').onclick = () => { done(); action.run(); };
      dialog.querySelector('[data-x]').onclick = done;
      dialog.oncancel = e => { e.preventDefault(); done(); };
      dialog.setAttribute('aria-labelledby', 'msgTitel');   // R-1.8 (V2): Name = Titel, Beschreibung = Text
      dialog.setAttribute('aria-describedby', 'msgText');
      if (!dialog.open) msgVorher = document.activeElement;   // R-1.8 (APD-112)
      showModalQuiet(dialog);
      layout();
    });
  }
  return bean;
}
const alert = createAlert(msg);
const inform = (title, message, { wide = false, action = null } = {}) => alert.showModal(title, message, { wide, action });

/* ---------- AD-Bean notice: Hinweis-Kasten (seit 4.70.0, P-122/F-2, R-3.10, R-1.13) ---------- */

// Seit 4.70.0 (P-122/F-2, R-3.10, Nutzer 22.11.2026, Sitzung 0159): Hinweis-Kasten für Ergebnisse und Erinnerungen – im Fenster wie im Hinweisfenster
// (AD-Bean alert). Text, darunter grau das Detail, darunter die Schaltflächenzeile, alles mittig; die App richtet nichts selbst aus. Ein Vorbild bei
// Apple gibt es nicht (HIG: kein Baustein für einen Hinweis-Kasten im Inhalt), Kennung nach der Aufgabe; Namen wie bei alert (`message`, `label`, `icon`).
// Schnittstelle (R-1.13, Liste der AD-Beans in Designrichtlinie 15) – die App nutzt nur diese Namen:
//   createNotice(element, { message, detail, buttons }) – macht element (z. B. ein leeres <div class="step">) zum Hinweis-Kasten
//   n.message (HTML, lesen und setzen) · n.detail (HTML, Standard '') · n.buttons (Standard [], je { id, label, icon, primary }) – setzen baut neu auf
//   n.remove() · n.on('action', ({ id }) => …) → abmelden – eine Schaltfläche wurde angetippt
// CSS nur unter .ad-notice (Kasten) und .ad-notice-buttons (Schaltflächenzeile).
function createNotice(element, { message = '', detail = '', buttons = [] } = {}) {
  const hoerer = { action: new Set() };
  const stand = { message, detail, buttons };
  const melde = id => hoerer.action.forEach(fn => { try { fn({ id }); } catch (e) { console.error(e); } });
  function aufbauen() {
    if (!(element instanceof Element)) return;
    const knoepfe = (stand.buttons || []).map((b, i) => `<button type="button" data-i="${i}"${b.id ? ` id="${esc(b.id)}"` : ''}${b.primary ? ' class="primary"' : ''}>${b.icon ? ic(b.icon) : ''}${esc(b.label || '')}</button>`).join('');
    element.innerHTML = `${stand.message || ''}${stand.detail ? `<div class="hint">${stand.detail}</div>` : ''}${knoepfe ? `<div class="ad-notice-buttons">${knoepfe}</div>` : ''}`;
    element.querySelectorAll('.ad-notice-buttons button').forEach(x => x.onclick = () => melde(stand.buttons[+x.dataset.i]?.id || ''));
    // seit 4.70.2 (P-124/F-1): steht der Kasten in einem offenen Hinweisfenster (AD-Bean alert), rechnet es Breite und Lage sofort neu
    const d = element.closest('dialog'); if (d?.open) alertLayouts.get(d)?.();
  }
  const bean = {
    get message() { return stand.message; }, set message(v) { stand.message = v || ''; aufbauen(); },
    get detail() { return stand.detail; }, set detail(v) { stand.detail = v || ''; aufbauen(); },
    get buttons() { return [...stand.buttons]; }, set buttons(v) { stand.buttons = Array.isArray(v) ? v : []; aufbauen(); },
    remove() { element?.remove?.(); },
    on(name, fn) { const h = hoerer[name]; if (!h || typeof fn !== 'function') return () => {}; h.add(fn); return () => { h.delete(fn); }; },
  };
  if (!(element instanceof Element)) { console.error('notice: element fehlt'); return bean; }
  element.dataset.adBean = 'notice';
  element.classList.add('ad-notice');
  aufbauen();
  return bean;
}

/* ---------- AD-Bean recentlydeleted: Zuletzt gelöscht (seit 4.71.0, RLB-126, R-7.10, R-4.12, R-1.13) ---------- */

// Seit 4.71.0 (RLB-126, Muster AppDesign arbeit/RLB-126, Wortlaut freigegeben RLB-126/J-10): Löschen eines Eintrags der zentralen Liste verschiebt ihn
// ohne Abfrage nach ‚Zuletzt gelöscht‘ (R-4.12 Ausnahme, HIG ‚Alerts‘: rückgängig zu machen); dort bleibt er mit ganzem Inhalt `days` Kalendertage
// (Standard 30, je App), danach fällt er beim Start, beim Tageswechsel und beim Lesen weg. Vorbild Apple *Recently Deleted* (Notizen, Fotos, Dateien).
// Daten je Eintrag { id, item, at, on } (ganzer Inhalt, Zeitpunkt, Gerät) im Feld `field` der Daten der App – so kommt ‚Zuletzt gelöscht‘ mit
// Löschdatum ins Backup; der Abgleich (createSync mit recentlyDeleted) gilt auf beiden Geräten. Endgültig löschen vermerkt `purged` am Eintrag in
// data.deleted (createSync), damit es auch auf dem anderen Gerät wegfällt; Wiederherstellen nimmt den Eintrag aus data.deleted (zählt als Änderung).
// Oberfläche (R-7.10): letzte Kachel der Liste mit Papierkorb und Anzahl (entryHtml, nur wenn nicht leer) · Liste mit Kopf ‹, Titel, Anzahl, Hinweis zur
// Frist, zuletzt gelöschte oben, je Kachel ‚Gelöscht am … · noch N Tage‘ (listHtml) · Hinweis über der Vorschau mit ‚Wiederherstellen‘ (noticeHtml) ·
// Kontextmenü und Wischen ‚Wiederherstellen‘ · ‚Endgültig löschen‘ (rot, einzige Abfrage; actions). Die Kacheln tragen data-id – die App bindet
// Antippen, langes Drücken und Wischen wie bei ihren eigenen Kacheln; ‹, Kachel und ‚Wiederherstellen‘ bindet die Bean selbst.
// Schnittstelle (R-1.13, Liste der AD-Beans in Designrichtlinie 15) – die App nutzt nur diese Namen, kein CSS der Bean:
//   createRecentlydeleted(root, { data, list, field, days, nouns, label, detail, question }) – root: Liste (z. B. die Seitenleiste)
//   r.items (nur lesen, zuletzt gelöscht oben, ohne Abgelaufenes) · r.remove(item) · r.restore(id) · r.purge(id) · r.purgeAll() · r.daysLeft(id)
//   r.entryHtml() · r.listHtml({ current, end }) · r.noticeHtml(id) · r.actions(row)
//   r.on('change' | 'restore' | 'purge' | 'open' | 'close', fn) → abmelden; restore meldet { id, item, origin: 'notice' | 'menu' }
// CSS nur unter .ad-recentlydeleted… (Kachel, Anzahl, Hinweis zur Frist, Zeile, Hinweis über der Vorschau).
function createRecentlydeleted(root, { data, list, field = 'recentlyDeleted', days = 30, nouns = null, label = x => x.title || '',
  detail = () => '', question = null } = {}) {
  nouns ||= ['Eintrag', 'Einträge', 'Dieser Eintrag'];   // Einzahl, Mehrzahl, ‚Dieser …‘ (Hinweis über der Vorschau)
  const hoerer = { change: new Set(), restore: new Set(), purge: new Set(), open: new Set(), close: new Set() };
  const melde = (name, info) => hoerer[name].forEach(fn => { try { fn(info); } catch (e) { console.error(e); } });
  const store = () => { const d = data?.(); if (!d) return null; if (!Array.isArray(d[field])) d[field] = []; return d; };
  const DAY = 86400000;
  // Restzeit in ganzen Kalendertagen (auch über die Zeitumstellung): am Tag des Löschens `days`, danach je Tag einer weniger, bei 0 endgültig weg
  const left = at => { const d = new Date(at), n = new Date();
    return days - Math.round((Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) - Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / DAY); };
  const dateText = at => { const d = new Date(at); return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`; };
  const countText = n => `${n} ${n === 1 ? nouns[0] : nouns[1]}`;
  const leftText = n => n === 1 ? 'noch 1 Tag' : `noch ${n} Tage`;
  const inDays = n => n === 1 ? 'in 1 Tag' : `in ${n} Tagen`;
  // Abgelaufenes fällt weg; true, wenn etwas wegfiel
  function expire() {
    const d = store(); if (!d) return false;
    const vorher = d[field].length;
    d[field] = d[field].filter(x => x && typeof x.id === 'string' && x.item && Number.isFinite(x.at) && left(x.at) > 0);
    return d[field].length !== vorher;
  }
  const find = id => (store()?.[field] || []).find(x => x.id === id);
  const sorted = () => { expire(); return [...(store()?.[field] || [])].sort((a, b) => b.at - a.at); };
  const bean = {
    get items() { return sorted(); },
    daysLeft(id) { const x = find(id); return x ? Math.max(0, left(x.at)) : 0; },
    // verschiebt item aus der Liste der App nach ‚Zuletzt gelöscht‘ (ohne Abfrage); den Eintrag in data.deleted schreibt createSync beim Speichern
    remove(item) {
      const d = store(); if (!d || !item) return;
      d[list] = (d[list] || []).filter(e => e.id !== item.id);
      d[field] = [{ id: item.id, item: structuredClone(item), at: Date.now(), on: deviceName() }, ...d[field].filter(x => x.id !== item.id)];
      expire();
      announce(`‚${label(item)}‘ nach ‚Zuletzt gelöscht‘ verschoben`);
      melde('change');
    },
    restore(id, origin = 'menu') {
      const d = store(), x = find(id); if (!d || !x) return;
      d[field] = d[field].filter(y => y.id !== id);
      d.deleted = (d.deleted || []).filter(y => y.id !== id);
      d[list] = [...(d[list] || []).filter(e => e.id !== id), x.item];
      announce(`‚${label(x.item)}‘ wiederhergestellt`);
      melde('change'); melde('restore', { id, item: x.item, origin });
    },
    purge(id) {
      const d = store(); if (!d || !find(id)) return;
      d[field] = d[field].filter(y => y.id !== id);
      const t = (d.deleted || []).find(y => y.id === id); if (t) t.purged = true;
      melde('change'); melde('purge', { id });
    },
    purgeAll() {
      const d = store(); if (!d || !d[field].length) return;
      for (const x of d[field]) { const t = (d.deleted || []).find(y => y.id === x.id); if (t) t.purged = true; }
      const ids = d[field].map(x => x.id); d[field] = [];
      melde('change'); ids.forEach(id => melde('purge', { id }));
    },
    entryHtml() {
      const n = sorted().length; if (!n) return '';
      return `<button type="button" class="side-row ad-recentlydeleted-entry"><span class="ad-recentlydeleted-icon">${ic('trash')}</span><span class="t"><b>Zuletzt gelöscht</b></span><span class="ad-recentlydeleted-count">${n}</span>${ic('chevron-right')}</button>`;
    },
    // Der Hinweis zur Frist steht in der Liste und rollt mit (große Schrift, iPhone quer: sonst lägen die Kacheln hinter der Backup-Kachel, R-6.3)
    listHtml({ current = null, end = '' } = {}) {
      const items = sorted();
      return `<div class="side-head"><button type="button" class="round ad-recentlydeleted-back" aria-label="${esc(nouns[1])}">${ic('chevron-left')}</button>
      <div class="ttl"><h2>Zuletzt gelöscht</h2><small>${countText(items.length)}</small></div>${end}</div>
    <div class="side-list"><p class="ad-recentlydeleted-note">Gelöschte ${esc(nouns[1])} bleiben hier ${days} Tage. Danach werden sie endgültig gelöscht.</p>${items.map(x => `<button type="button" class="side-row${x.id === current ? ' current' : ''}" data-id="${esc(x.id)}"><span class="t"><b>${esc(label(x.item))}</b>${detail(x.item) ? `<small>${detail(x.item)}</small>` : ''}<small class="chg ad-recentlydeleted-left">Gelöscht am ${dateText(x.at)} · ${leftText(left(x.at))}</small></span>${ic('chevron-right')}</button>`).join('')}</div>`;
    },
    noticeHtml(id) {
      const x = find(id); if (!x) return '';
      return `<div class="ad-recentlydeleted-notice" role="status"><span class="ad-recentlydeleted-noticeicon">${ic('trash')}</span>
        <span class="ad-recentlydeleted-text"><b>${esc(nouns[2])} ist gelöscht.</b><br>Gelöscht am ${dateText(x.at)} – wird ${inDays(Math.max(1, left(x.at)))} endgültig gelöscht.</span>
        <button type="button" class="ad-recentlydeleted-restore" data-restore="${esc(id)}">${ic('rotate-ccw')}Wiederherstellen</button></div>`;
    },
    // Einträge für Kontextmenü und Wischen (wie bei openMenu, mit shortTitle; act bekommt { sourceView } von swipeactions)
    actions(row) {
      const id = row?.dataset?.id, x = find(id); if (!x) return [];
      return [
        { icon: 'rotate-ccw', label: 'Wiederherstellen', shortTitle: 'Wiederherstellen', act: () => bean.restore(id, 'menu') },
        'sep',
        { icon: 'trash', label: 'Endgültig löschen', shortTitle: 'Löschen', red: true, act: async w => {
          if (!w?.sourceView) sourcehighlight.hold(row);
          const frage = question ? question(x.item) : `‚${esc(label(x.item))}‘ endgültig löschen? Das kann nicht rückgängig gemacht werden.`;
          if (await confirmPop(w?.sourceView || row, frage, { label: 'Endgültig löschen', icon: 'trash' })) bean.purge(id);
        } },
      ];
    },
    on(name, fn) { const h = hoerer[name]; if (!h || typeof fn !== 'function') return () => {}; h.add(fn); return () => { h.delete(fn); }; },
  };
  if (!(root instanceof Element)) { console.error('recentlydeleted: root fehlt'); return bean; }
  root.dataset.adBean = 'recentlydeleted';
  document.addEventListener('click', e => {
    const b = e.target.closest?.('.ad-recentlydeleted-entry, .ad-recentlydeleted-back, .ad-recentlydeleted-restore'); if (!b) return;
    if (b.classList.contains('ad-recentlydeleted-restore')) bean.restore(b.dataset.restore, 'notice');
    else melde(b.classList.contains('ad-recentlydeleted-entry') ? 'open' : 'close');
  });
  if (expire()) setTimeout(() => melde('change'));
  onDayChange(() => { if (expire()) melde('change'); });
  return bean;
}

/* ---------- Dialoge ---------- */

// Der Dialog bleibt offen und bekommt nur neuen Inhalt; so kommt kein verspätetes Schließ-Ereignis an.
function openDialog(html, wide = false) {
  if (typeof onDialogOpen === 'function') onDialogOpen(); // App-Haken, z. B. automatisches Speichern beenden
  dlg.classList.toggle('wide', wide);
  dlg.onclose = null;
  dlgDirty = null;
  dlg.innerHTML = html;
  fensterName(dlg);
  dlgFest = 0;
  dlg.returnValue = '';
  const neu = !dlg.open;
  if (neu) dlgVorher = document.activeElement;   // R-1.8 (APD-112): Rückgabe des Fokus, wenn keine Schaltfläche gemerkt ist
  if (neu) showModalQuiet(dlg);
  placeDialogs();
  if (neu) blattAuf();   // R-4.6 (seit 4.32.0, am iPad seit 4.38.0, APD-72): das Blatt bzw. Fenster gleitet von unten herein
  dlg.querySelector('.dlg-body')?.scrollTo(0, 0);
  const x = dlg.querySelector('#dlgX');
  // x schließt; wurde etwas geändert, fragt eine Sprechblase, ob die Änderungen verworfen werden sollen.
  if (x) x.onclick = async () => {
    if (dlgDirty?.() && !await confirmPop(x, 'Die Änderungen in diesem Fenster gehen verloren.',
      { label: 'Änderungen verwerfen', icon: 'trash' }, { label: 'Weiter bearbeiten', icon: 'pencil' })) return;
    dlg.close('cancel');
  };
  sourcehighlight.refresh(document);
  mountCap(dlg);
  growAll();
  requestAnimationFrame(growAll);
}

// R-1.8 (seit 4.35.0, V2): Fenster und Blatt heißen wie ihr Titel (aria-labelledby), die graue Zusatzzeile ist die Beschreibung.
function fensterName(d) {
  const h = d.querySelector('.dlg-head h3'), s = d.querySelector('.dlg-head .sub');
  if (h) { h.id ||= d.id + 'Titel'; d.setAttribute('aria-labelledby', h.id); } else d.removeAttribute('aria-labelledby');
  if (s) { s.id ||= d.id + 'Zusatz'; d.setAttribute('aria-describedby', s.id); } else d.removeAttribute('aria-describedby');
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
// zurückschreibt. Seit 4.57.0 (APD-126/W-3, W-4, R-5.2): nach einem Vorschlag geht es klein weiter.
function capWanted(f, pos) {
  const before = f.value.slice(f.value.lastIndexOf('\n', pos - 1) + 1, pos);
  return !/[\p{L}\p{N}]/u.test(before) || /[.!?]\s+$/.test(before);
}
// Seit 4.31.0 (APD-65): löscht oder ersetzt der Nutzer einen Großbuchstaben (Rücktaste, markieren und überschreiben), erzwingt die App an
// dieser Stelle keine Großschreibung mehr – die Tastatur entscheidet (wie iOS nach einer Korrektur von Hand); data-cap-frei = Stelle.
// Nur für genau einen Buchstaben: wer ein ganzes Wort oder Feld löscht, bekommt danach wieder Großschreibung.
function capFrei(f, von, bis) {
  if (/^\p{Lu}$/u.test(f.value.slice(von, bis))) f.dataset.capFrei = String(von); else delete f.dataset.capFrei;   // genau ein Großbuchstabe
}
function capBefore(e) {
  const f = e.target;
  if (!f.matches?.('textarea, input[type=text]')) return;
  const start = f.selectionStart, end = f.selectionEnd;
  if (/^delete(ContentBackward|ContentForward)$/.test(e.inputType)) {
    if (start !== end) capFrei(f, start, end);
    else if (e.inputType === 'deleteContentBackward') capFrei(f, Math.max(0, start - 1), start);
    else capFrei(f, start, start + 1);
    return;
  }
  if (e.inputType !== 'insertText') return;
  if (start !== end) capFrei(f, start, end);
  else if (f.dataset.capFrei !== undefined && +f.dataset.capFrei !== start) delete f.dataset.capFrei;
  if (!e.data || !/^\p{Ll}/u.test(e.data)) return;
  if (f.dataset.capFrei !== undefined || !capWanted(f, start)) return;
  e.preventDefault();
  f.setRangeText(e.data.charAt(0).toLocaleUpperCase('de') + e.data.slice(1), start, end, 'end');
  f.dispatchEvent(new Event('input', { bubbles: true }));
}
// Rückfall, falls die Eingabe nicht abgefangen werden konnte: Buchstabe nachträglich groß machen.
function autoCapital(e) {
  const f = e.target;
  if (e.inputType !== 'insertText' || !e.data || !f.matches?.('textarea, input[type=text]')) return;
  const pos = f.selectionStart;
  const ch = f.value.charAt(pos - 1);
  if (!/^\p{Ll}$/u.test(ch)) return;
  if (f.dataset.capFrei !== undefined && +f.dataset.capFrei === pos - 1) { delete f.dataset.capFrei; return; }   // APD-65
  if (!capWanted(f, pos - 1)) return;
  f.setRangeText(ch.toLocaleUpperCase('de'), pos - 1, pos, 'end');
}
// R-3.2 (seit 4.20.0, APD-15): ‚Nach oben / Ans Ende‘ (.fab) nur, wenn es etwas zu scrollen gibt – iPad und iPhone.
// Seit 4.27.0 (APD-28) am Rollbereich gemessen; updateBar() ruft es nach jedem Aufbau der Seite. fabTop()/fabEnd() rollen den Inhalt.
// Seit 4.27.1 (APD-33): die Kapsel überdeckt nie Kopf- oder Suchzeile – passt sie nicht mit 16 px Abstand oben und unten in den
// sichtbaren Teil des Rollbereichs (iPhone quer mit offener Tastatur: 126 px sichtbar, davon gut 100 px Leisten), ist sie
// ausgeblendet; neu geprüft, sobald sich der sichtbare Bereich ändert (Tastatur auf und zu).
// Seit 4.30.0 (APD-37 B): nur die Pfeile, die etwas bewirken – ganz oben nur ‚Ans Ende‘, am Ende nur ‚Nach oben‘, dazwischen beide;
// näher als eine halbe Höhe des Rollbereichs an einem Ende fehlt dessen Pfeil. Die Kapsel steht unten fest (ihr unterer Rand
// bleibt, sie wird nur niedriger); gemessen wird mit ihrer vollen Höhe, damit sie nicht zwischen da und weg springt.
let fabH = 0;
const fabKnoepfe = f => [f.querySelector('button:first-of-type'), f.querySelector('button:last-of-type')];
function updateFab() {
  const f = document.querySelector('.fab');
  if (!f) return navKlassen();
  const [oben, unten] = fabKnoepfe(f), e = scrollView.el, vv = window.visualViewport;
  const nah = (e ? e.clientHeight : innerHeight) / 2, ende = scrollView.max - platzVon(e);
  oben.hidden = !(scrollView.y > nah);
  unten.hidden = !(ende - scrollView.y > nah);
  const knopf = [oben, unten].find(b => b.offsetHeight)?.offsetHeight;
  if (knopf) fabH = 2 * knopf + 1;   // volle Höhe (zwei Pfeile und Rand); ausgeblendet hat sie keine Höhe – dann die zuletzt gemessene
  const raum = e ? Math.min(e.getBoundingClientRect().bottom, vv ? vv.offsetTop + vv.height : innerHeight) - e.getBoundingClientRect().top : Infinity;
  f.classList.toggle('still', scrollView.max <= 1 || (oben.hidden && unten.hidden) || raum < (fabH || 97) + 32);
  schnellZeigen(false);
  navKlassen();   // nach jedem Aufbau: wo gewischt werden kann, hängt auch vom Inhalt ab (z. B. erst ein offener Eintrag)
}
// R-1.9 (seit 4.35.0, M2): mit ‚Bewegung reduzieren‘ springen ‚Nach oben / Ans Ende‘ direkt, der Inhalt blendet in 0,15 s über
// (WCAG 2.3.3; Apple rollt beim Antippen der Statusleiste auch dann) – sonst rollen sie sanft
function rolleSpringt(fn) {
  if (!bewegungRuhig()) return fn(true);
  fn(false);
  scrollView.el?.animate?.([{ opacity: 0.4 }, { opacity: 1 }], { duration: 150, easing: 'ease-out' });
}
const fabTop = () => nachTastatur(() => rolleSpringt(weich => scrollView.to(0, weich)));
const fabEnd = () => nachTastatur(() => rolleSpringt(weich => scrollView.end(weich)));
if (window.ResizeObserver) new ResizeObserver(() => requestAnimationFrame(updateFab)).observe(document.body);
window.addEventListener('resize', () => requestAnimationFrame(updateFab));
window.visualViewport?.addEventListener('resize', () => requestAnimationFrame(updateFab));

// R-3.2 (seit 4.30.0, APD-37 C): Schnellroll-Griff wie in Apple Fotos – beim Rollen erscheint rechts ein Griff; ihn halten und ziehen
// springt durch den ganzen Inhalt, eine Blase links daneben zeigt die Marke des Abschnitts oben im Bild (die App setzt data-marke an
// Tage und Abschnitte, ohne Marken keine Blase). Nach 1,5 s ohne Rollen blendet er aus (nur Deckkraft, auch bei ‚Bewegung
// reduzieren‘). Da ist er nur zusammen mit der Kapsel (Inhaltsansicht, nicht bei offener Tastatur oder offenem Fenster) und erst ab
// drei Höhen des Rollbereichs Inhalt. Seine Bahn beginnt 8 px unter der Kopf- bzw. Suchzeile und endet über der Kapsel in voller
// Höhe (zwei Pfeile und 8 px Abstand) – sie springt nicht, wenn ein Pfeil wegfällt. Ganz oben bzw. unten (auch darüber hinaus)
// gezogen = Anfang bzw. Ende. VoiceOver: Regler ‚Schnell rollen‘ (Wert = Marke), Wischen nach oben/unten springt einen Abschnitt.
const SCHNELL_AB = 3, SCHNELL_RUHE = 1500, SCHNELL_KAPSEL = 2 * 48 + 8;
const fastScroll = document.createElement('div');
fastScroll.className = 'schnell aus';
fastScroll.hidden = true;
fastScroll.innerHTML = `<div class="blase" aria-hidden="true"></div><div class="griff" role="slider" tabindex="-1" aria-label="Schnell rollen"
  aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span>${ic('chevrons-up-down')}</span></div>`;
document.body.append(fastScroll);
const schnellGriff = fastScroll.querySelector('.griff'), schnellBlase = fastScroll.querySelector('.blase');
let schnellZieht = null, schnellRuhe = 0, schnellH = 0;
const schnellEnde = () => Math.max(0, scrollView.max - platzVon(scrollView.el));
function schnellMoeglich() {
  const f = document.querySelector('.fab'), e = scrollView.el;
  return !!f && !!e && !f.hidden && !f.classList.contains('still') && f.getClientRects().length > 0 && !kbOffen()
    && !document.documentElement.classList.contains('locked') && e.scrollHeight >= SCHNELL_AB * e.clientHeight;
}
// Marken in der Reihenfolge des Inhalts (Tage, Überschriften der Abschnitte); es gilt die letzte, die oben schon begonnen hat –
// davor (Kopf des Inhalts) die erste. Steht oben eine Tabelle mit haftendem Kopf, zählt die Kante unter dem Kopf.
const schnellMarken = () => [...scrollView.el.querySelectorAll('[data-marke]')];
function schnellKante(marken) {
  let kante = scrollView.el.getBoundingClientRect().top + 4;
  const tab = marken.find(m => m.closest('table'))?.closest('table'), th = tab?.tHead?.querySelector('th');
  if (th && getComputedStyle(th).position === 'sticky' && tab.getBoundingClientRect().bottom > kante + th.offsetHeight) kante += th.offsetHeight;
  return kante;
}
function schnellMarke(marken = schnellMarken()) {
  if (!marken.length) return -1;
  const kante = schnellKante(marken);
  let lo = 0, hi = marken.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (marken[m].getBoundingClientRect().top <= kante) lo = m; else hi = m - 1; }
  return lo;
}
// rollt: der Inhalt hat sich bewegt – Griff einblenden und nach 1,5 s Ruhe wieder aus
function schnellZeigen(rollt) {
  if (!schnellMoeglich()) { fastScroll.hidden = true; fastScroll.classList.add('aus'); return; }
  fastScroll.hidden = false;
  const r = scrollView.el.getBoundingClientRect(), f = document.querySelector('.fab').getBoundingClientRect();
  const oben = r.top + 8, h = Math.max(0, f.bottom - SCHNELL_KAPSEL - oben);
  fastScroll.style.top = oben + 'px'; fastScroll.style.height = h + 'px';
  schnellH = Math.max(0, h - schnellGriff.offsetHeight);
  const ende = schnellEnde(), a = ende ? Math.min(1, Math.max(0, scrollView.y / ende)) : 0;
  schnellGriff.style.transform = `translateY(${Math.round(a * schnellH)}px)`;
  const marken = schnellMarken(), i = schnellMarke(marken), marke = i < 0 ? '' : marken[i].dataset.marke;
  schnellGriff.setAttribute('aria-valuenow', Math.round(a * 100));
  if (marke) schnellGriff.setAttribute('aria-valuetext', marke); else schnellGriff.removeAttribute('aria-valuetext');
  if (schnellBlase.textContent !== marke) schnellBlase.textContent = marke;
  schnellBlase.style.transform = `translateY(${Math.round(a * schnellH + schnellGriff.offsetHeight / 2)}px) translateY(-50%)`;
  if (!rollt) return;
  fastScroll.classList.remove('aus');
  clearTimeout(schnellRuhe);
  if (!schnellZieht) schnellRuhe = setTimeout(() => fastScroll.classList.add('aus'), SCHNELL_RUHE);
}
onRoll(() => { if (!keepBusy) schnellZeigen(true); });
schnellGriff.addEventListener('pointerdown', e => {
  if (e.button > 0 || fastScroll.classList.contains('aus')) return;
  e.preventDefault(); e.stopPropagation();
  scrollView.stop();   // ein laufendes weiches Rollen (‚Ans Ende‘) endet, der Griff folgt dem Finger (APD-37/F-5)
  try { schnellGriff.setPointerCapture(e.pointerId); } catch {}
  schnellZieht = { id: e.pointerId, y: e.clientY, a: schnellEnde() ? scrollView.y / schnellEnde() : 0 };
  fastScroll.classList.add('zieht'); clearTimeout(schnellRuhe);
});
schnellGriff.addEventListener('pointermove', e => {
  if (schnellZieht?.id !== e.pointerId) return;
  e.preventDefault();
  const a = schnellH ? Math.min(1, Math.max(0, schnellZieht.a + (e.clientY - schnellZieht.y) / schnellH)) : 0;
  scrollView.to(a * schnellEnde());
}, { passive: false });
const schnellLos = e => {
  if (schnellZieht?.id !== e.pointerId) return;
  schnellZieht = null; fastScroll.classList.remove('zieht'); schnellZeigen(true);
};
schnellGriff.addEventListener('pointerup', schnellLos);
schnellGriff.addEventListener('pointercancel', schnellLos);
schnellGriff.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); });
// VoiceOver (Wischen nach oben/unten) und Tastatur: einen Abschnitt weiter bzw. zurück, ohne Marken eine Höhe des Rollbereichs
schnellGriff.addEventListener('keydown', e => {
  const d = { ArrowUp: -1, ArrowLeft: -1, PageUp: -1, ArrowDown: 1, ArrowRight: 1, PageDown: 1 }[e.key];
  if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); scrollView.to(e.key === 'Home' ? 0 : schnellEnde()); return; }
  if (!d) return;
  e.preventDefault();
  const marken = schnellMarken(), i = schnellMarke(marken), top = schnellKante(marken) - 4;
  if (i < 0) return scrollView.to(Math.min(schnellEnde(), scrollView.y + d * scrollView.el.clientHeight));
  // zurück: steht der Anfang der aktuellen Marke über dem Rand, zuerst an ihren Anfang
  const j = d > 0 ? i + 1 : marken[i].getBoundingClientRect().top < top - 4 ? i : i - 1;
  const ziel = marken[Math.max(0, Math.min(marken.length - 1, j))];
  scrollView.to(Math.min(schnellEnde(), scrollView.y + ziel.getBoundingClientRect().top - top));
});

// R-5.5 (seit 4.19.0, APD-14): in einzeiligen Feldern bestätigt die Eingabetaste und schließt die Tastatur (‚Fertig‘, HIG);
// mehrzeilige Felder machen einen Zeilenumbruch. Das Suchfeld (type=search) behält ‚Suchen‘ und seine eigene Eingabetaste.
const SINGLE_LINE = 'input:not([type]), input[type=text], input[type=number], input[type=email], input[type=tel], input[type=url], input[type=password]';
function markEnterDone(n) {
  if (n.nodeType !== 1) return;
  [...(n.matches(SINGLE_LINE) ? [n] : []), ...n.querySelectorAll(SINGLE_LINE)]
    .forEach(f => { if (!f.hasAttribute('enterkeyhint')) f.setAttribute('enterkeyhint', 'done'); });
}
markEnterDone(document.documentElement);
new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(markEnterDone)))
  .observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || e.isComposing || e.defaultPrevented || !e.target.matches?.(SINGLE_LINE)) return;
  e.preventDefault();
  e.target.blur();
});
dlg.addEventListener('beforeinput', capBefore);
dlg.addEventListener('input', autoCapital);
// Seit 4.31.0 (APD-64, R-5.2): keine doppelten Leerzeichen in Textfeldern (ein- und mehrzeilig, auch im Suchfeld) – ein Leerzeichen direkt
// neben einem Leerzeichen wird nicht eingefügt; beim Einfügen werden mehrere Leerzeichen oder Tabs zu einem (Zeilenumbrüche bleiben,
// einzeilige Felder machen aus ihnen ein Leerzeichen). Der iOS-Kurzbefehl ‚.‘ (zweimal Leertaste) ersetzt das erste Leerzeichen selbst.
const LEER_FELD = 'textarea, input[type=text], input[type=search], input:not([type])';
const blank = c => c === ' ' || c === '\t';
document.addEventListener('beforeinput', e => {
  const f = e.target;
  if (e.inputType !== 'insertText' || e.data !== ' ' || !f.matches?.(LEER_FELD) || f.selectionStart == null) return;
  if (blank(f.value.charAt(f.selectionStart - 1)) || blank(f.value.charAt(f.selectionEnd))) e.preventDefault();
}, true);
document.addEventListener('paste', e => {
  const f = e.target, t = e.clipboardData?.getData('text/plain');
  if (t == null || !f.matches?.(LEER_FELD) || f.selectionStart == null) return;
  const a = f.selectionStart, b = f.selectionEnd;
  let x = (f.matches('textarea') ? t : t.replace(/\r?\n/g, ' ')).replace(/[ \t]+/g, ' ');
  if (x.startsWith(' ') && (a === 0 ? false : blank(f.value.charAt(a - 1)))) x = x.slice(1);
  if (x.endsWith(' ') && blank(f.value.charAt(b))) x = x.slice(0, -1);
  if (x === t) return;
  e.preventDefault();
  f.setRangeText(x, a, b, 'end');
  f.dispatchEvent(new Event('input', { bubbles: true }));
}, true);
dlg.addEventListener('input', refreshOk);
dlg.addEventListener('change', refreshOk);
dlg.addEventListener('click', () => setTimeout(refreshOk));
// Escape wirkt wie das x.
dlg.addEventListener('cancel', e => { e.preventDefault(); dlg.querySelector('#dlgX')?.click(); });
// R-4.7 (seit 4.35.0, K5): ⌘. wie Esc – in Fenster, Meldung und Blatt (auch aus einem Feld); Tab und Umschalt+Tab bleiben im obersten
// Fenster (mit Umlauf)
document.addEventListener('keydown', e => {
  if (e.defaultPrevented || tastenStapel.length) return;
  const d = msg.open ? msg : dlg.open ? dlg : null;
  if (!d) return;
  if (e.metaKey && e.key === '.') { verbrauchen(e); if (d === msg) msg.querySelector('[data-x]')?.click(); else if (dlg.querySelector('#dlgX')) dlg.querySelector('#dlgX').click(); else dlg.close('cancel'); return; }
  if (e.key !== 'Tab') return;
  const z = [...d.querySelectorAll(FOKUSBAR)].filter(x => x.getClientRects().length && !x.closest('[inert]') && x.tabIndex >= 0);
  if (!z.length) return;
  const i = z.indexOf(document.activeElement), j = i < 0 ? (e.shiftKey ? z.length - 1 : 0) : i + (e.shiftKey ? -1 : 1);
  if (i < 0 || j < 0 || j >= z.length) { e.preventDefault(); focus(z[(j + z.length) % z.length]); }
});
msg.addEventListener('close', unlockPage);
dlg.addEventListener('close', () => {
  dlgFest = 0;
  unlockPage();
  if (dlg.open) return;
  const sel = sourcehighlight.sourceItem;
  sourcehighlight.sourceItem = '';
  // R-7.3: nach dem Neuaufbau durch die App die oberste Zeile zurück an ihren Platz, die Zeile aus dem Fenster kurz hervorheben
  // (seit 4.23.2 rollt nichts mehr – auch nach ‹ › nicht)
  requestAnimationFrame(() => { holdAlign(); if (sel) revealRow(sel); });
  // R-1.8 (seit 4.50.1, APD-112; 4.50.0 nur bei der Schaltfläche eines leeren Zustands, APD-30/L-3): danach liegt der Fokus wieder auf der Schaltfläche bzw.
  // der Zeile, die das Fenster öffnete, ohne Rollen
  const vorher = dlgVorher; dlgVorher = null;
  requestAnimationFrame(() => requestAnimationFrame(() => { if (!dlg.open) fokusNachFenster(sel, vorher); }));
});
msg.addEventListener('close', () => { const vorher = msgVorher; msgVorher = null;
  requestAnimationFrame(() => requestAnimationFrame(() => { if (!msg.open) fokusNachFenster('', vorher); })); });

// R-7.3 (seit 4.18.0, APD-13): Zeile bzw. Kasten, aus dem ein Fenster kam, nach dem Schließen kurz hervorheben.
// Seit 4.23.2 rollt dafür nichts mehr (vorher: nach ‹ › bis die zuletzt gezeigte Zeile sichtbar war) – die Liste steht wie beim Öffnen.
// Seit 4.24.0 (APD-23): REVEAL_HOLD voll blau, dann in REVEAL_FADE ausblenden (vorher 1 s ausblenden);
// ‚Bewegung reduzieren‘: REVEAL_HOLD voll blau, dann ohne Ausblenden weg.
// Schaltflächen sind keine Zeilen und werden nicht hervorgehoben.
const REVEAL_HOLD = 2000, REVEAL_FADE = 1000;
let revealing = null;
function endReveal() { revealing?.cancel(); revealing = null; }
function revealRow(sel) {
  endReveal();
  const el = document.querySelector(sel);
  if (!el || !el.matches(KEEP_SEL) || !el.getClientRects().length) return;
  if (!el.animate) return;
  const from = getComputedStyle(document.documentElement).getPropertyValue('--sel-bg').trim(), to = getComputedStyle(el).backgroundColor;
  const still = bewegungRuhig();
  revealing = still
    ? el.animate([{ backgroundColor: from }, { backgroundColor: from }], { duration: REVEAL_HOLD })
    : el.animate([{ backgroundColor: from }, { backgroundColor: from, offset: REVEAL_HOLD / (REVEAL_HOLD + REVEAL_FADE), easing: 'ease-in' }, { backgroundColor: to }],
      { duration: REVEAL_HOLD + REVEAL_FADE });
}

// Auswahl-Kapsel (R-5.4): Schaltflächen in einer Kapsel; ist sie zu schmal, lässt sich der Inhalt wischen,
// ein Verlauf am Rand zeigt, wo es weitergeht. Seit 4.33.0 (APD-75) steht im freien Rand dazu ein kleiner Pfeil (nur Anzeige,
// aria-hidden) – nur, solange es auf seiner Seite weitergeht; Drehen und andere Größenänderungen stellen beides neu.
const capHtml = (buttons, id = '') => `<div class="cap"><div class="scroll" ${id ? `id="${id}"` : ''}>${buttons}</div>${ic('chevron-left', 'pf l')}${ic('chevron-right', 'pf r')}</div>`;
// Wischzeile (seit 4.40.0, APD-86, R-5.4): eine Zeile Text, die seitlich wischt (z. B. Reisemittel im Kopf am iPhone) – Verlauf und Pfeile
// wie in der Auswahl-Kapsel, ohne Kapsel-Form; mountCap stellt beide, die App ruft es nach dem Aufbau der Seite.
const scrollRowHtml = (inhalt, id = '') => `<div class="weiter"><div class="scroll" ${id ? `id="${id}"` : ''}>${inhalt}</div>${ic('chevron-left', 'pf l')}${ic('chevron-right', 'pf r')}</div>`;
const capFertig = new WeakSet();
function mountCap(root) {
  root.querySelectorAll('.cap .scroll, .weiter > .scroll').forEach(strip => {
    if (capFertig.has(strip)) return;
    capFertig.add(strip);
    const cap = strip.parentElement;
    const fade = () => {
      const l = strip.scrollLeft > 2, r = strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 2;
      strip.classList.toggle('fl', l);
      strip.classList.toggle('fr', r);
      cap.querySelector(':scope > .pf.l')?.classList.toggle('an', l);
      cap.querySelector(':scope > .pf.r')?.classList.toggle('an', r);
    };
    strip.addEventListener('scroll', fade, { passive: true });
    new ResizeObserver(fade).observe(strip);
    requestAnimationFrame(fade);
  });
}

/* ---------- iPhone ---------- */

// Wie Apple: auf dem iPhone (hoch und quer) und in sehr schmalen Fenstern gilt die kompakte Ansicht –
// eine Seite nach der anderen, Fenster als Blatt (seit 4.32.0, R-4.6). <html> bekommt dann die Klasse 'phone'.
// Die App fragt isPhone() und baut ihre Seiten danach; bei einem Wechsel ruft ihr resize-Handler render().
// Seit 4.28.1 (APD-36): die Höhe ohne Tastatur zählt (APD-36/S-3: verschiebt Safari den sichtbaren Bereich, wird innerHeight kleiner – das
// iPad galt mit offener Tastatur als iPhone, das Fenster sprang an den linken Rand).
// Seit 4.45.0 (APD-97, R-6.6): dieselbe Grenze für den Inhalt – ist er schmaler (z. B. am iPad hoch neben der Seitenleiste), zeigt die App
// jede Tabelle im Inhalt als Kästen wie am iPhone. Die App fragt compactWidth(#app) beim Aufbau und baut bei einem Wechsel neu.
const SCHMAL = 700;
const isPhone = () => innerWidth < SCHMAL || seitenHoehe() < 500;
const compactWidth = el => !!el && el.clientWidth < SCHMAL;
// Seit 4.9.0: Name des Geräts für ‚geändert am … · iPad‘ und den Abgleich (iPadOS meldet sich als Mac mit Touch).
function deviceName() {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return 'iPhone';
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'iPad';
  return isPhone() ? 'iPhone' : 'iPad';
}
function applyLayout() { document.documentElement.classList.toggle('phone', isPhone()); }
applyLayout();
// Schalter (seit 4.29.0, APD-63 C4, 15.15): kennt der Browser den eingebauten Schalter (Safari ab 17.4, <input type="checkbox" switch>),
// zeichnet Safari ihn selbst – gleitet, ziehbar, Haptik, VoiceOver ‚Schalter‘, Aussehen der iOS-Version; sonst unser Schalter (design.css)
document.documentElement.classList.toggle('natsw', 'switch' in HTMLInputElement.prototype);
window.addEventListener('resize', applyLayout);

// Großer Titel (iPhone): sobald er unter die Leiste geschoben ist, steht er klein in der Leiste (.pnav.titled).
// Die Leiste bekommt beim Scrollen eine Haarlinie. Die App ruft updateBar() nach jedem Aufbau der Seite.
window.visualViewport?.addEventListener('resize', () => untenMessen());   // B7: auch wenn sich die sicheren Ränder ändern
function updateBar() {
  const bar = document.querySelector('.pnav, .nb');
  if (!bar) return;
  bar.classList.toggle('line', scrollView.y > 4);
  if (bar.classList.contains('pnav')) document.documentElement.style.setProperty('--pnav-h', bar.offsetHeight + 'px');
  untenMessen();
  const big = document.querySelector('.ltitle');
  // Ohne großen Titel steht der Titel immer in der Leiste.
  if (bar.classList.contains('pnav')) bar.classList.toggle('titled', !big || big.getBoundingClientRect().bottom < bar.getBoundingClientRect().bottom);
  updateFab();
}
onRoll(updateBar);
window.addEventListener('resize', updateBar);
// B7 (seit 4.37.0, APD-43 Teil 2): der Platz unter der Liste kommt aus der gemessenen Höhe dessen, was unten fest darüber liegt –
// Kapsel Nach oben/Ans Ende bzw. untere Leiste (iPhone) und Backup-Kachel der Seitenleiste; sie wachsen mit der Textgröße (L1), der
// letzte Eintrag bleibt erreichbar (R-7.1). Ohne Messung gelten die Werte von früher (design.css).
function untenMessen() {
  const r = document.documentElement, bb = document.querySelector('.bbar');
  const fb = parseFloat(getComputedStyle(r).getPropertyValue('--fb')) || 1;
  const unten = r.classList.contains('phone')
    ? Math.max((bb?.querySelector('.bnote') ? 150 : 120) * fb, bb ? bb.offsetHeight + 30 : 0)
    : 100 * fb;   // die volle Kapsel (2 × 44 × --fb + 12) – nicht die gerade sichtbaren Pfeile, sonst wandert das Ende beim Rollen
  r.style.setProperty('--unten-h', Math.round(unten) + 'px');
  const fuss = document.querySelector('#side .side-foot');
  if (!fuss) return;
  // ein neu aufgebauter Fuß meldet sich selbst, sobald er Größe bekommt (Seitenleiste eingeblendet, Kachel neu, Textgröße)
  if (!untenBeobachtet.has(fuss)) { untenBeobachtet.add(fuss); untenRO?.observe(fuss); }
  if (fuss.querySelector('.bhint') && fuss.offsetHeight > 0) document.querySelector('#side')?.style.setProperty('--fuss-h', Math.round(fuss.offsetHeight) + 'px');
}
const untenBeobachtet = new WeakSet(), untenRO = window.ResizeObserver ? new ResizeObserver(() => requestAnimationFrame(untenMessen)) : null;

// R-8.1 (seit 4.11.2): Beim Drehen (und jeder anderen Größenänderung) bleibt oben derselbe Eintrag stehen. Safari kennt
// keinen Scroll-Anker – ohne Hilfe springt die Seite, weil sich die Höhen beim Drehen ändern. Gemerkt wird beim Scrollen
// der oberste sichtbare Eintrag unter der Leiste (Elemente mit data-day bzw. data-keep) samt Abstand; nach einer
// Größenänderung (auch nach dem Neuaufbau durch die App) wird er wieder an dieselbe Stelle gerückt.
const KEEP_SEL = '#app [data-day], #app [data-keep]';
// Als Drehen zählt eine neue Breite oder eine um mehr als 150 px andere Höhe (Leisten von Safari ändern sie weniger).
let keepTop = null, keepWidth = innerWidth, keepHeight = innerHeight, keepBusy = false;
// Seit 4.59.3 (APD-133, R-8.1): die zuletzt mit resize gemeldete Größe. Das Fenster kann die neue Größe schon haben, bevor ihr resize ankommt
// (WebKit der Prüfumgebung unter Last, rund 200 ms). Lief das von der Zwischengröße geplante restoreTop in dieser Lücke, galt das Drehen als
// erledigt; baute die App danach um und rutschte der Rollbereich ans Ende, überschrieb rememberTop das Gedächtnis mit ‚ganz am Ende‘.
// restoreTop übernimmt deshalb nur die gemeldete Größe – bis das resize da ist, bleibt keepTurned() wahr und rememberTop gesperrt.
let keepMeldW = innerWidth, keepMeldH = innerHeight;
const keepTurned = () => innerWidth !== keepWidth || Math.abs(innerHeight - keepHeight) > 150;
const keepEdge = () => document.querySelector('.pnav, .nb')?.getBoundingClientRect().bottom || 0;
// Seit 4.48.1 (RLB-115, R-8.1): Kante für einen Eintrag – unter der Leiste und, steht er in einer Tabelle mit haftendem Kopf, unter dem
// Tabellenkopf; vorher zog nur openAt den Kopf ab, nach dem Aus- und Einblenden der Seitenleiste stand der oberste Tag halb darunter
const kopfHoehe = el => { const th = el?.closest?.('table')?.tHead?.querySelector('th');
  return th && !th.closest('thead')?.contains(el) && getComputedStyle(th).position === 'sticky' ? th.offsetHeight : 0; };
const keepKante = el => keepEdge() + kopfHoehe(el);
const keepKey = e => e.dataset.day ? `[data-day="${CSS.escape(e.dataset.day)}"]` : `[data-keep="${CSS.escape(e.dataset.keep)}"]`;
// Oberster sichtbarer Eintrag unter der Leiste; ganz oben → null (ganz oben bleibt ganz oben). Steht oben kein Eintrag
// (Ende der Seite, z. B. Fazit und Statistik), zählt der Abstand zum Ende – ganz unten bleibt ganz unten (seit 4.21.1).
const scrollRest = () => scrollView.remaining;
function topAnchor() {
  if (scrollView.y < 4) return null;
  const alle = [...document.querySelectorAll(KEEP_SEL)].filter(x => x.getClientRects().length);
  const e = alle.find(x => x.getBoundingClientRect().bottom > keepKante(x) + 1);
  const edge = keepKante(e);
  // Abstand als Anteil der Höhe: nach dem Drehen ist der Eintrag anders hoch, der sichtbare Teil bleibt gleich.
  return e ? { sel: keepKey(e), part: (e.getBoundingClientRect().top - edge) / (e.getBoundingClientRect().height || 1), ab: e.getBoundingClientRect().top - edge, erstes: e === alle[0] } : { rest: scrollRest() };
}
function rememberTop() {
  if (keepBusy || keepTurned() || lockY !== null) return;   // bei offenem Fenster (R-7.3) und während des Drehens nichts überschreiben
  keepTop = topAnchor();
}
function restoreTop() {
  keepWidth = keepMeldW; keepHeight = keepMeldH;
  if (!keepTop) return;
  if ('rest' in keepTop) {
    keepBusy = true;
    scrollView.to(scrollView.y + scrollRest() - keepTop.rest);
    keepFrei();
    return;
  }
  const e = [...document.querySelectorAll(KEEP_SEL.split(', ').map(s => `${s.split(' ')[0]} ${keepTop.sel}`).join(', '))].find(x => x.getClientRects().length);
  if (!e) return;
  keepBusy = true;
  const r = e.getBoundingClientRect();
  // Seit 4.45.0 (APD-97): ändert die App die Breite (keepPlace) und steht der erste Eintrag ganz unter der Kante (darüber der Kopf des
  // Inhalts), bleibt sein Abstand in px – als Anteil seiner Höhe rückte er mit, wenn er schmaler bzw. breiter anders hoch wird (große
  // Schrift, Seitenleiste am iPad hoch). Liegt ein Eintrag darüber, bleibt es beim Anteil – sonst schaute dessen Unterkante hervor.
  scrollView.by(r.top - keepKante(e) - (keepTop.app && keepTop.erstes && keepTop.part > 0 ? keepTop.ab : keepTop.part * r.height));
  keepFrei();
}
onRoll(() => { if (!keepBusy) rememberTop(); });
// Ende einer eigenen Rollbewegung im nächsten Bild; hat inzwischen jemand anderes gerollt (Finger, unter Last auch die Prüfung), gilt
// sein Stand fürs nächste Drehen – sonst bliebe das Gedächtnis beim alten Eintrag (seit 4.37.0)
function keepFrei() {
  const ziel = scrollView.y;
  requestAnimationFrame(() => { keepBusy = false; if (Math.abs(scrollView.y - ziel) > 2) rememberTop(); });
}

// R-8.1 (seit 4.21.0, APD-17): Ändert die App die Anordnung selbst (z. B. Seitenleiste ein/aus – die Breite des Inhalts und
// damit die Zeilenhöhen ändern sich, das Fenster nicht), bleibt oben derselbe Eintrag: keepPlace(() => { …; render(); }).
function keepPlace(change) {
  const anchor = topAnchor();
  if (anchor && 'sel' in anchor) anchor.app = true;
  change();
  // Seit 4.59.0 (RLB-121/W-4, R-8.1): der Umbau bei großer Schrift folgt der neuen Breite von main sofort – kam er erst ein Bild später
  // (ResizeObserver), stand nach Seitenleiste ein/aus am iPad hoch ein anderer Eintrag oben und das Gedächtnis war veraltet
  textUm();
  keepTop = anchor;
  if (anchor) { restoreTop(); delete anchor.app; return; }   // beim nächsten Drehen wieder als Anteil
  keepBusy = true;
  if (scrollView.y) scrollView.to(0);
  keepFrei();
}

// R-7.4 (seit 4.21.0, APD-16): Position beim Öffnen eines Eintrags – ganz oben; gibt die App einen ‚nächsten offenen‘ Eintrag
// an, steht er direkt unter dem Kopf (Leiste und haftender Tabellenkopf), nie in der Mitte. openAt(null) = ganz oben.
function openAt(el) {
  let top = 0;
  if (el) {
    top = Math.max(0, Math.round(scrollView.y + el.getBoundingClientRect().top - keepKante(el)));
  }
  keepBusy = true;
  scrollView.to(top);
  keepTop = topAnchor();
  keepFrei();
}
// Seit 4.23.2: bei offenem bzw. gerade geschlossenem Fenster ändert nur die Tastatur die Höhe – das ist kein Drehen (R-7.3).
window.addEventListener('resize', () => { keepMeldW = innerWidth; keepMeldH = innerHeight; if ((lockY !== null || holdTop) && innerWidth === keepWidth) { keepHeight = innerHeight; return; } if (!keepTurned()) return; requestAnimationFrame(() => requestAnimationFrame(restoreTop)); setTimeout(restoreTop, 350); });

/* ---------- Textgröße (seit 4.37.0, APD-43 Teil 2, R-1.10) ---------- */

// G3: Safari meldet die Einstellung ‚Textgröße‘ als Grundgröße (html { font: -apple-system-body }, design.css). Eine unsichtbare Probe
// mit 1rem zeigt jeden Wechsel – ResizeObserver meldet ihn sofort (auch über das Kontrollzentrum bei offener App), dazu beim Zurückkehren
// in die App. Stufe = nächster der 12 Body-Werte von Apple → html[data-ts] (design.css: Textstile); ts-gross ab 21, ts-ax ab 28 pt,
// ts-um (Umbau: untereinander, U1/U2) ab 28 pt, auf dem iPhone hoch schon ab 21 pt. Mac und Chromium: 17 px = Standard.
const TEXT_STUFEN = { xs: 14, s: 15, m: 16, l: 17, xl: 19, xxl: 21, xxxl: 23, ax1: 28, ax2: 33, ax3: 40, ax4: 47, ax5: 53 };
let textName = '';
const textPx = () => TEXT_STUFEN[textName] || 17;
// Seit 4.59.0 (RLB-121/W-3, W-4, R-1.10): ab 21 px untereinander, wenn der Inhalt (main) schmaler als 600 px ist \u2013 iPhone hoch wie bisher,
// dazu iPad hoch neben der Seitenleiste und geteilter Bildschirm; neu berechnet beim Drehen und wenn sich die Breite von main \u00e4ndert.
const inhaltBreite = () => (document.querySelector('main') || document.documentElement).clientWidth || innerWidth;
const umSoll = () => { const px = textPx(); return px >= 28 || (px >= 21 && inhaltBreite() < 600); };
function textUm() {
  document.documentElement.classList.toggle('ts-um', umSoll());
}
// Umbau, wenn sich nur die Breite von main ändert (ResizeObserver): der oberste Eintrag bleibt (keepPlace, R-8.1) – sonst stand am iPad hoch bei
// Text 23 nach dem Öffnen der Tag nicht mehr unter dem Kopf (R-7.4); bei offenem Fenster (R-7.3) nur umschalten
function textUmHalten() {
  if (document.documentElement.classList.contains('ts-um') === umSoll()) return;
  if (lockY !== null) textUm(); else keepPlace(textUm);
}
function textStufe() {
  const px = parseFloat(getComputedStyle(document.documentElement).fontSize) || 17;
  const name = Object.keys(TEXT_STUFEN).reduce((a, k) => Math.abs(TEXT_STUFEN[k] - px) < Math.abs(TEXT_STUFEN[a] - px) ? k : a, 'l');
  if (name === textName) return;
  const erst = !textName, alt = textName;
  const setzen = () => {
    const r = document.documentElement;
    textName = name; r.dataset.ts = name;
    r.classList.toggle('ts-gross', TEXT_STUFEN[name] >= 21); r.classList.toggle('ts-ax', TEXT_STUFEN[name] >= 28); textUm();
  };
  if (erst) return setzen();
  if (measurement?.an) messEreignis(`text ${alt} → ${name}`);   // W4
  textWechsel(setzen);
}
// W1: ein Wechsel bei offener App wirkt wie das Drehen (R-8.1) – oberster Eintrag bleibt, Leisten, Menüs, Sprechblasen und Fenster
// richten sich neu aus (alle Größen-Hörer laufen), ein offenes Fenster bleibt offen; die App baut über ihren resize-Hörer neu auf.
function textWechsel(setzen) {
  // gemerkt beim letzten Rollen (rememberTop) – jetzt zu messen ginge nicht mehr: die Schrift ist schon größer, der Aufbau noch alt
  const anchor = keepTop;
  setzen();
  window.dispatchEvent(new Event('resize'));
  keepTop = anchor;
  if (!anchor) return;
  restoreTop(); requestAnimationFrame(() => requestAnimationFrame(restoreTop)); setTimeout(restoreTop, 350);
}
const textProbe = document.createElement('div');
textProbe.className = 'textprobe'; textProbe.setAttribute('aria-hidden', 'true');
textProbe.style.cssText = 'position:absolute;left:-9999px;top:0;width:1rem;height:1rem;visibility:hidden;pointer-events:none;';
document.documentElement.appendChild(textProbe);
textStufe();
// im nächsten Bild – im Rückruf selbst umgebaut, meldet Safari ‚ResizeObserver loop completed with undelivered notifications‘
if (window.ResizeObserver) new ResizeObserver(() => requestAnimationFrame(textStufe)).observe(textProbe);
document.addEventListener('visibilitychange', () => { if (!document.hidden) textStufe(); });
window.addEventListener('resize', textUm);
// Seitenleiste ein/aus \u00e4ndert die Breite von main ohne resize (RLB-121) \u2013 im n\u00e4chsten Bild, sonst meldet Safari eine ResizeObserver-Schleife
{ let umBreite = 0; const umRo = new ResizeObserver(es => { const w = Math.round(es[0].contentRect.width); if (w === umBreite) return; umBreite = w; requestAnimationFrame(textUmHalten); });
  const umMain = () => { const m = document.querySelector('main'); if (m) umRo.observe(m); else requestAnimationFrame(umMain); }; umMain(); }

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

/* ---------- Navigation und Gesten (seit 4.30.0, APD-61 Teil 1, R-7.5) ---------- */

// Wie iOS 26 (Variante ‚Überall‘, Nutzer 22.10.2026): Im iPhone-Aufbau schiebt sich der Inhalt beim Öffnen von rechts über die
// Startliste, die Liste weicht ein Drittel nach links und dunkelt leicht ab; zurück umgekehrt – mit der Zurück-Schaltfläche oder durch
// Wischen nach rechts von überall im Inhalt; die Seite folgt dem Finger. Am iPad hoch holt Wischen nach rechts von überall im
// Inhalt die darübergelegte Seitenleiste herein, Wischen nach links auf ihr oder der Abdunkelung schiebt sie weg; panel-left und
// die Abdunkelung bewegen sie genauso. iPad quer (feste Seitenleiste): keine Geste. Fertig nach halber Breite oder schnellem
// Wischen (über 0,3 px/ms in den letzten 100 ms), sonst federt die Seite zurück. ‚Bewegung reduzieren‘: Überblenden statt Schieben.
// Vorrang (APD-38/T-35) an dieser einen Stelle: senkrecht rollt der Browser (touch-action pan-y), Bereiche mit eigenem waagrechtem Rollen,
// Felder, Schaltflächen, Kapseln, Kapsel ‚Nach oben / Ans Ende‘ und Schnellroll-Griff behalten ihre Geste; entschieden wird nach 10 px –
// deutlich waagrecht (1,2 × so weit wie senkrecht) in der richtigen Richtung, sonst nichts; wer erst hält (langes Drücken), wischt
// nicht. Kein Wischen bei offenem Fenster, Menü oder offener Sprechblase. Drehen bricht ein Ziehen ab (Zustand wie vorher, R-8.1),
// eine laufende Bewegung springt an ihr Ziel. Je Bild nur transform und opacity (APD-59), die Bewegung als Web-Animation.
// Die App meldet sich an (Startliste bzw. Seitenleiste ist #side, der Inhalt #app, die Abdunkelung am iPad .side-shade):
//   navRegister({ back: { shown, below, go }, sidebar: { possible, shown, show, fixed, refresh } })   (nicht ‚navigation‘ – so heißt die Navigation-API
//   des Browsers; Namen und Schlüssel seit 5.0.0 englisch, APD-145)
//     back.shown()        – iPhone-Aufbau: ein Eintrag ist offen (Zurück möglich)
//     back.below(an)      – die Startliste unter dem Inhalt aufbauen (true) bzw. wieder verbergen (false), ohne den Zustand zu ändern
//     back.go()           – zurück zur Startliste (Zustand ändern und neu aufbauen)
//     sidebar.possible()  – Seitenleiste wird darübergelegt (iPad hoch), sidebar.shown() – sie ist sichtbar
//     sidebar.show(an)    – Seitenleiste ein- bzw. ausblenden (Zustand ändern, nur die Seitenleiste neu aufbauen)
//     sidebar.fixed()     – seit 4.31.0 (APD-68): Seitenleiste steht fest links (iPad quer); sidebar.refresh() – alles neu aufbauen
// Aufrufe der App: navPush(change) beim Öffnen eines Eintrags aus der Startliste, navPop() für die Zurück-Schaltfläche,
// navSidebar(an) für panel-left (iPad hoch und quer) und die Abdunkelung am iPad hoch.
const NAV_ENTSCHEID = 10, NAV_WAAGRECHT = 1.2, NAV_TEMPO = 0.3, NAV_HALTEN = 500, NAV_DUNKEL = 0.1;
const NAV_EIGEN = 'input, textarea, select, [contenteditable], .cap, .fab, .schnell, .searchbox, [data-eigene-geste], button:not(.side-row)';
const navSchleier = document.createElement('div');
navSchleier.className = 'nav-schleier';
document.body.append(navSchleier);
let navApp = null, navZug = null, navLauf = null;
const navSperre = klickSperre();   // seit 4.50.0 (APD-108) statt navKlickWeg
// seit 4.30.1 (APD-67): die Entscheidungen der Gestenstelle stehen in der Messung (15.21) – ‚nav kandidat‘, ‚nav verworfen‘, ‚nav aktiv‘,
// ‚nav fertig‘, ‚nav zurück gefedert‘, ‚nav abgebrochen‘ mit Weg (Anteil der Breite) und Tempo (px/ms)
const navMess = t => { if (measurement?.an) messEreignis('nav ' + t); };
function navRegister(app) { navApp = app; navKlassen(); }
// touch-action: pan-y nur, wo gewischt werden kann (iPhone-Aufbau, iPad hoch, seit 4.31.0 iPad quer) – sonst bleibt alles wie bisher
function navKlassen() {
  document.documentElement.classList.toggle('wischt', !!navApp && (isPhone() || !!navApp.sidebar?.possible() || !!navApp.sidebar?.fixed?.()));
}
window.addEventListener('resize', navKlassen);
const navTeile = art => art === 'phone'
  ? [document.getElementById('app'), document.querySelector('.fab'), document.getElementById('side'), navSchleier].filter(Boolean)
  : art === 'fest' ? [document.getElementById('side'), document.getElementById('app'), document.querySelector('.fab')].filter(Boolean)
  : [document.getElementById('side'), document.querySelector('.side-shade')].filter(Boolean);
// Lage aller Ebenen zum Anteil p: iPhone 0 = Startliste, 1 = Inhalt; iPad 0 = Seitenleiste weg, 1 = Seitenleiste da.
// Seit 4.31.0 (APD-68, Variante B ‚Mitschieben‘): iPad quer (art ‚fest‘) rückt der Inhalt mit – bei p = 1 steht er dort, wo er neben der
// festen Seitenleiste beginnt (ihr rechter Rand + 4 px = w − 6), und behält bis zum Einrasten seine volle Breite (html.nav-fest).
function navBild(art, el, p, w) {
  const ruhig = bewegungRuhig();
  if (art === 'phone') {
    if (el.id === 'side') return { transform: ruhig ? 'none' : `translate3d(${Math.round(-0.3 * w * p)}px,0,0)`, opacity: 1 };
    if (el === navSchleier) return { transform: 'none', opacity: ruhig ? 0 : NAV_DUNKEL * p };
    return ruhig ? { transform: 'none', opacity: p } : { transform: `translate3d(${Math.round((1 - p) * w)}px,0,0)`, opacity: 1 };
  }
  if (el.id === 'side') return ruhig ? { transform: 'none', opacity: p } : { transform: `translate3d(${Math.round((p - 1) * w)}px,0,0)`, opacity: 1 };
  if (art === 'fest') return { transform: ruhig ? 'none' : `translate3d(${Math.round(p * (w - 6))}px,0,0)`, opacity: 1 };
  return { transform: 'none', opacity: p };
}
const navBreite = art => art === 'phone' ? innerWidth : (document.getElementById('side')?.getBoundingClientRect().right || 360) + 10;
function navSetze(art, p, w) {
  for (const el of navTeile(art)) { const b = navBild(art, el, p, w); el.style.transform = b.transform; el.style.opacity = b.opacity; }
}
function navAnfang(art) {
  navSofort();
  const H = document.documentElement;
  H.classList.add(...art === 'phone' ? ['nav-schiebt'] : art === 'fest' ? ['nav-seite', 'nav-fest'] : ['nav-seite']);
  return navBreite(art);
}
function navAufraeumen(art) {
  for (const el of [...navTeile('phone'), ...navTeile('seite')]) {
    el.getAnimations?.().forEach(a => { if (a.id === 'nav') a.cancel(); });
    el.style.transform = ''; el.style.opacity = '';
  }
  document.documentElement.classList.remove('nav-schiebt', 'nav-seite', 'nav-fest', 'nav-zieht', 'nav-faehrt');
}
// Bewegung von p = von nach p = nach (Web-Animation, damit die Prüfungen auf ihr Ende warten); fertig() danach.
function navFahre(art, von, nach, w, fertig) {
  const H = document.documentElement;
  H.classList.remove('nav-zieht');
  const ende = () => { navLauf = null; fertig?.(); navAufraeumen(art); updateFab(); };
  if (von === nach) return ende();
  H.classList.add('nav-faehrt');
  // R-1.12 (seit 4.57.0, APD-127/B-3, B-4): hinein bzw. ein (nach > von) mit der Feder, zurück bzw. aus ease-in-out; nach einer Geste der Rest
  // anteilig, mindestens 0,15 s (bis 4.56.0 beides 0,35 s mit cubic-bezier(.2,.8,.2,1))
  const auf = nach > von, dauer = bewegungRuhig() ? 200 : Math.max(GLEIT_MIN_MS, (auf ? GLEIT_AUF_MS : GLEIT_ZU_MS) * Math.abs(nach - von));
  const anims = navTeile(art).map(el => {
    const a = el.animate([navBild(art, el, von, w), navBild(art, el, nach, w)], { duration: dauer, easing: bewegungRuhig() ? 'cubic-bezier(.2,.8,.2,1)' : auf ? GLEIT_FEDER : GLEIT_ZU, fill: 'forwards' });
    a.id = 'nav';
    return a;
  });
  navLauf = { ende, anims };
  anims[0].onfinish = () => { if (navLauf?.anims === anims) ende(); };
}
// laufende Bewegung sofort an ihr Ziel (neue Bewegung, Drehen)
function navSofort() { if (navLauf) navLauf.ende(); }
// Öffnen aus der Startliste (iPhone-Aufbau): change() baut den Inhalt auf, er schiebt sich über die Liste
function navPush(change) {
  dismissPresented();   // APD-149/J-7 (S-17): zuerst ist der Stapel leer, dann wechselt die Ebene
  navSofort();
  change();
  if (!navApp?.back || !isPhone() || !navApp.back.shown()) return;
  focus(document.querySelector('#app .pnav'));   // R-1.8 (seit 4.35.0, V12): VoiceOver beginnt mit dem Seitentitel, ohne Rollen
  const w = navAnfang('phone');
  navApp.back.below(true);
  navSetze('phone', 0, w);
  navFahre('phone', 0, 1, w, () => navApp.back.below(false));
}
// Zurück-Schaltfläche (iPhone-Aufbau): bei offener Tastatur erst sie schließen (APD-36), dann schiebt sich der Inhalt hinaus
function navPop() {
  dismissPresented();   // APD-149/J-7 (S-17): wie navPush
  const z = navApp?.back;
  if (!z || !isPhone() || !z.shown()) return z?.go();
  if (kbOffen()) document.activeElement?.blur?.();
  nachTastatur(() => {
    if (!z.shown()) return;
    const w = navAnfang('phone');
    z.below(true);
    navSetze('phone', 1, w);
    navFahre('phone', 1, 0, w, () => { z.go(); navZurueckFokus(); });
  });
}
// R-1.8 (seit 4.35.0, V12): zurück in der Startliste liegt der Fokus auf der blauen Zeile, sonst auf ihrem Titel – ohne Rollen
function navZurueckFokus() {
  focus(document.querySelector('#side .current')) || focus(document.querySelector('#side .side-head h2, #side .pnav-head, .pnav-head'));
}
// panel-left und Abdunkelung am iPad hoch: die Seitenleiste gleitet herein bzw. hinaus
function navSidebar(an) {
  const s = navApp?.sidebar;
  if (!s) return;
  if (s.fixed?.() && an !== s.shown()) return navFest(an);
  if (!s.possible() || an === s.shown()) return s.show(an);
  if (an) { s.show(true); const w = navAnfang('seite'); navSetze('seite', 0, w); navFahre('seite', 0, 1, w); }
  else { const w = navAnfang('seite'); navFahre('seite', 1, 0, w, () => s.show(false)); }
}
// Seit 4.31.0 (APD-68): iPad quer gleitet die feste Seitenleiste herein und der Inhalt rückt mit; am Ende rastet sie ein – der Inhalt wird
// schmaler, der oberste Eintrag bleibt (keepPlace, R-8.1). Hinaus: erst wird der Inhalt wieder ganz breit (unter der Seitenleiste,
// oberster Eintrag bleibt), dann gleiten beide nach links.
function navEinrasten() { keepPlace(() => { navAufraeumen('fest'); navApp.sidebar.refresh(); }); }
function navFest(an) {
  const s = navApp.sidebar;
  if (an) { navAnfang('fest'); s.show(true); const w = navBreite('seite'); navSetze('fest', 0, w); navFahre('fest', 0, 1, w, navEinrasten); return; }
  let w;
  keepPlace(() => { w = navAnfang('fest'); navSetze('fest', 1, w); });
  navFahre('fest', 1, 0, w, () => keepPlace(() => { navAufraeumen('fest'); s.show(false); s.refresh(); }));
}
// Hat das Element (oder ein Vorfahr bis zur Seite) einen eigenen waagrechten Rollbereich, gehört ihm das Wischen.
function navEigenesRollen(t, bis) {
  for (let e = t; e && e !== bis && e !== document.body; e = e.parentElement) {
    if (e.scrollWidth > e.clientWidth + 1 && /auto|scroll/.test(getComputedStyle(e).overflowX)) return true;
  }
  return false;
}
function navCandidate(e) {
  if (!navApp || e.button > 0 || !e.isPrimary || navLauf) return null;
  const t = e.target;
  if (!(t instanceof Element) || dlg.open || msg.open || document.querySelector('.menu, .pop, .layer') || t.closest(NAV_EIGEN)) return null;
  if (swipeFaengt(t)) return null;   // seit 4.60.0 (APD-30, R-7.8): auf einer wischbaren Kachel gehört das Wischen den Wischaktionen
  const app = document.getElementById('app'), side = document.getElementById('side');
  if (isPhone()) {
    if (!navApp.back?.shown() || !app?.contains(t) || navEigenesRollen(t, app)) return null;
    return { art: 'phone', richtung: 1, von: 1, nach: 0 };
  }
  const s = navApp.sidebar;
  // seit 4.31.0 (APD-68): iPad quer nur herein – ausblenden nur mit panel-left (die Kacheln bleiben frei für Wischaktionen, APD-38/T-10)
  if (s?.fixed?.()) return !s.shown() && app?.contains(t) && !navEigenesRollen(t, app) ? { art: 'fest', richtung: 1, von: 0, nach: 1 } : null;
  if (!s?.possible()) return null;
  if (!s.shown() && app?.contains(t) && !navEigenesRollen(t, app)) return { art: 'seite', richtung: 1, von: 0, nach: 1 };
  if (s.shown() && (side?.contains(t) || t.closest('.side-shade')) && !navEigenesRollen(t, side)) return { art: 'seite', richtung: -1, von: 1, nach: 0 };
  return null;
}
// Wischen tippt nie an: ein Zeiger, der sich zwischen Drücken und Loslassen mehr als 10 px bewegt hat, löst kein Antippen aus (am Gerät
// erkennt iOS so kein Tippen; mit Maus und Zeichenstift schon) – außer in Feldern (Text markieren). Seit 4.50.0 (APD-108/W-B) zählt der größte
// Weg seit dem Aufsetzen (38 px weg und zurück auf 6 px ist ein Wischen), die Sperre gilt bis zum Loslassen plus 400 ms (navSperre).
let navStart = null;
window.addEventListener('pointerdown', e => {
  if (!e.isPrimary) return;
  navSperre.frei();
  navStart = { x: e.clientX, y: e.clientY, id: e.pointerId, feld: !!e.target.closest?.('input, textarea, select, [contenteditable]') };
}, true);
const navWeit = (a, e) => !!a && a.id === e.pointerId && !a.feld && !e.target.closest?.('input, textarea, select, [contenteditable]')
  && Math.hypot(e.clientX - a.x, e.clientY - a.y) > NAV_ENTSCHEID;
window.addEventListener('pointermove', e => { if (navWeit(navStart, e)) navSperre.an(); }, true);
['pointerup', 'pointercancel'].forEach(t => window.addEventListener(t, e => {
  const a = navStart;
  if (!a || a.id !== e.pointerId) return;
  navStart = null;
  if (t === 'pointerup' && navWeit(a, e)) navSperre.an();
  navSperre.los();
}, true));
window.addEventListener('pointerdown', e => {
  const k = navCandidate(e);
  navZug = k && { ...k, x0: e.clientX, y0: e.clientY, t0: e.timeStamp, id: e.pointerId, aktiv: false, spur: [[e.timeStamp, e.clientX]],
    breite: innerWidth, hoehe: innerHeight };
  if (navApp) navMess(k ? `kandidat ${k.art}` : `kein kandidat${e.target.closest?.(NAV_EIGEN) ? ' eigen' : ''}`);
}, true);
function navAktiv(z, e) {
  z.aktiv = true;
  navSperre.an();
  navMess(`aktiv ${z.art} ${Math.round(e.clientX - z.x0)} ${Math.round(e.clientY - z.y0)}`);
  if (kbOffen()) document.activeElement?.blur?.();   // APD-68/F-16: die Tastatur schließt, zurück geht es danach
  scrollView.stop();                                         // APD-68/F-10: ein weiches Rollen endet, das Wischen gilt
  try { e.target.setPointerCapture?.(e.pointerId); } catch {}
  z.w = navAnfang(z.art);
  if (z.art === 'phone') navApp.back.below(true);
  else if (z.nach === 1) { navApp.sidebar.show(true); z.w = navBreite('seite'); }
  document.documentElement.classList.add('nav-zieht');
  navSetze(z.art, z.von, z.w);
}
window.addEventListener('pointermove', e => {
  const z = navZug;
  if (!z || e.pointerId !== z.id) return;
  const dx = e.clientX - z.x0, dy = e.clientY - z.y0;
  if (!z.aktiv) {
    if (Math.abs(dx) < NAV_ENTSCHEID && Math.abs(dy) < NAV_ENTSCHEID) return;
    const waagrecht = Math.abs(dx) > Math.abs(dy) * NAV_WAAGRECHT && Math.sign(dx) === z.richtung;
    if (!waagrecht || e.timeStamp - z.t0 > NAV_HALTEN || document.querySelector('.menu, .pop, .layer') || dlg.open) {
      navMess(`verworfen ${!waagrecht ? 'richtung' : e.timeStamp - z.t0 > NAV_HALTEN ? 'gehalten' : 'offen'} ${Math.round(dx)} ${Math.round(dy)}`);
      navZug = null; return;
    }
    navAktiv(z, e);
  }
  if (e.cancelable) e.preventDefault();
  z.spur.push([e.timeStamp, e.clientX]); if (z.spur.length > 8) z.spur.shift();
  z.p = Math.max(0, Math.min(1, z.von + (z.nach - z.von) * Math.abs(dx) / z.w));
  navSetze(z.art, z.p, z.w);
}, { capture: true, passive: false });
function navLoslassen(e, abbruch) {
  const z = navZug;
  if (!z || e.pointerId !== z.id) return;
  navZug = null;
  if (!z.aktiv) { if (abbruch) navMess('abgebrochen vor der entscheidung'); return; }
  navSperre.los();
  const spur = z.spur.filter(([t]) => t >= e.timeStamp - 100);
  const tempo = spur.length > 1 && spur.at(-1)[0] > spur[0][0] ? (spur.at(-1)[1] - spur[0][1]) / (spur.at(-1)[0] - spur[0][0]) * z.richtung : 0;
  const weg = Math.abs((z.p ?? z.von) - z.von);
  const geschafft = !abbruch && (weg > 0.5 || (tempo > NAV_TEMPO && weg > 0.05));
  const p = z.p ?? z.von;
  navMess(`${abbruch ? 'abgebrochen' : geschafft ? 'fertig' : 'zurück gefedert'} weg ${weg.toFixed(2)} tempo ${tempo.toFixed(2)}`);
  if (z.art === 'phone') {
    if (geschafft) navFahre('phone', p, 0, z.w, () => { navApp.back.go(); navZurueckFokus(); });
    else navFahre('phone', p, 1, z.w, () => navApp.back.below(false));
  } else if (z.art === 'fest') navFahre('fest', p, geschafft ? 1 : 0, z.w, geschafft ? navEinrasten : () => navApp.sidebar.show(false));
  else if (z.nach === 1) navFahre('seite', p, geschafft ? 1 : 0, z.w, geschafft ? null : () => navApp.sidebar.show(false));
  else navFahre('seite', p, geschafft ? 0 : 1, z.w, geschafft ? () => navApp.sidebar.show(false) : null);
}
// APD-67 (Messung P-65): wo der Browser senkrecht rollen darf, beginnt Safari ab 10 px senkrechter Abweichung zu rollen und nimmt der
// Seite den Finger (pointercancel) – auch mitten im Zurückwischen. Ist die Geste entschieden, verhindert touchmove das; nur touchmove
// hält Safari auf (nicht pointermove). Vorher bleibt alles frei – senkrecht rollt der Browser wie bisher.
window.addEventListener('touchmove', e => { if (navZug?.aktiv && e.cancelable) e.preventDefault(); }, { capture: true, passive: false });
window.addEventListener('pointerup', e => navLoslassen(e, false), true);
window.addEventListener('pointercancel', e => navLoslassen(e, true), true);
// Nach einer Wischgeste kein Antippen dessen, worauf sie begann
window.addEventListener('click', e => { if (navSperre.nimm()) { e.preventDefault(); e.stopPropagation(); } }, true);
// APD-67/F-14 (R-8.1): Drehen bricht ein Ziehen ab – Zustand wie vor dem Ziehen; eine laufende Bewegung springt an ihr Ziel
window.addEventListener('resize', () => {
  const z = navZug;
  if (z?.aktiv && (innerWidth !== z.breite || Math.abs(innerHeight - z.hoehe) > 150)) {
    navZug = null;
    navMess('abgebrochen drehen');
    // das Loslassen danach tippt nichts an: navSperre bleibt bis zum Loslassen (navAktiv), dann noch 400 ms (APD-108/W-12)
    if (z.art === 'phone') navApp.back.below(false);
    else if (z.nach === 1) navApp.sidebar.show(false);
    navAufraeumen(z.art);
  }
  navSofort();
});
/* ---------- AD-Bean swipeactions: Wischaktionen (seit 4.60.0, APD-30, APD-136, R-7.8, R-1.13) ---------- */

// Wie Notizen und Mail (iOS 26, Muster arbeit/APD-30 Wischaktionen Muster.html, Variante D ‚Kapsel mit Wort‘; Testfall-Liste arbeit/APD-30
// Wischaktionen Testfall-Liste.md D-1 bis D-11, W-1 bis W-80): Wischen nach links auf einer Kachel zeigt rechts neben ihr die Aktionen ihres
// Kontextmenüs als Kapseln 66 × 44 (wachsen mit der Textgröße, seit 4.60.1) mit Symbol und dem Wort darunter – gleiche Reihenfolge, die zerstörende
// rot und ganz außen, ein Abstand für alles: 11 pt (Kachel–Kapsel, zwischen den Kapseln, rechts außen; seit 4.60.2, P-108). Die Kachel folgt dem Finger,
// bleibt ab halber Aktionsbreite offen (bei zwei Aktionen 165 px), sonst federt sie zurück. Wie Notizen (gemessen 18.11.2026): jede Kapsel steht an ihrem
// Platz und wächst aus ihrer Mitte – ab dem Weg, an dem die Kachel die halbe Kapsel freigibt, bis auch der Abstand dahinter frei ist; zurück genau umgekehrt.
// Kein Durchwischen (P-108/Q-2): darüber hinaus folgt die Kachel nur mit Widerstand (höchstens 60 px), die Kapseln rücken anteilig mit und wachsen bis
// 6 %, Loslassen federt auf ‚offen‘. Gelöscht wird über die Kapsel – sie fragt mit der Sprechblase, die aus ihr wächst; die Kachel bleibt bis zur
// Entscheidung offen. Höchstens eine Kachel ist offen; sie schließt bei
// Tippen auf die Kachel oder daneben in der Liste (das Tippen löst sonst nichts aus; Schaltflächen außerhalb der Liste – auch Schaltflächen im Kopf
// der Liste wie panel-left, plus und Mehr – wirken sofort und schließen sie dabei, APD-30/V-12, W-42), Rollen, Wischen an einer anderen Kachel,
// Neuaufbau der Liste (die Bean hört an der Liste mit), Drehen und Esc; das Ausblenden der Seitenleiste meldet die App mit close(). Entschieden wird wie in R-7.5 (nach
// NAV_ENTSCHEID, deutlich waagrecht NAV_WAAGRECHT – sonst rollt die Liste); eine geschlossene Kachel bewegt sich nicht nach rechts; kein Wischen
// nach langem Drücken (NAV_HALTEN), bei offenem Fenster, Menü oder offener Sprechblase und an Kacheln ohne Aktionen. Geschlossen sind die Kapseln
// nicht im Dokument (VoiceOver und Tastatur erreichen die Aktionen über das Kontextmenü, D-7), offen sind sie Schaltflächen mit dem Namen der
// Aktion. ‚Bewegung reduzieren‘ (D-8): die Kachel folgt dem Finger, die Kapseln stehen an ihrem Platz in voller Größe und blenden an denselben Stellen
// nur ein und aus (kein Wachsen, kein Mitrücken); je Bild nur transform und opacity. Textgröße (D-9): das Wort wächst mit, die offene Breite so weit, dass kein Wort abgeschnitten wird (sonst bricht es um).
// Schnittstelle (R-1.13, Liste der AD-Beans in Designrichtlinie 15) – die App nutzt nur diese Namen, kein CSS der Bean; englisch nach Vorbild seit
// 4.67.0 (APD-136, Zusammenarbeit 1: Apple UISwipeActionsConfiguration ‚rows‘, ‚actions‘, UIContextualAction ‚sourceView‘, ‚destructive‘; Web
// ‚disconnect()‘, Ereignis ‚toggle‘ mit ‚newState‘):
//   const w = createSwipeactions(list, { rows: '[data-id]', actions: row => Einträge })   – einmal je Liste
//   Einträge wie bei openMenu: { icon, label, shortTitle, red, act } ('sep' wird übergangen; leere Liste = Kachel nicht wischbar); shortTitle = Wort
//   unter der Kapsel, label = Name für VoiceOver. act({ sourceView: Kapsel }) – gibt act ein Promise zurück, bleibt die Kachel bis dahin offen.
//   w.openRow (offene Kachel oder null) · w.metrics (Maße bei Textgröße ‚groß‘ und Schwellen, nur lesen) · w.close() · w.disconnect() ·
//   w.on('toggle', ({ row, newState: 'open' | 'closed' }) => …) → abmelden
// Messmodus (15.21): ‚wisch kandidat‘, ‚wisch verworfen dx dy‘, ‚wisch offen|zurück gefedert|abgebrochen weg W‘ (Weg in px).
let swipeZieht = false;                 // eine Kachel folgt gerade dem Finger – langes Drücken löst dann nicht aus (onLongPress)
const swipeBeans = new Set();           // angemeldete Listen – die Gestenstelle (navCandidate) überlässt ihnen das Wischen auf ihren Kacheln
const swipeFaengt = t => [...swipeBeans].some(f => f(t));
const SWIPE_BEDIENBAR = 'button, a[href], input, select, textarea, label, summary, [contenteditable], [role=button], [role=link], [role=menuitem], [role=switch]';
const schleierFrei = new WeakMap();     // Kapsel → () => Rechteck der offenen Kachel samt Kapseln (bleibt beim Grau der Sprechblase frei, choosePop)
function createSwipeactions(list, { rows, actions } = {}) {
  const liste = list, kacheln = rows, aktionen = actions;   // innere Namen bleiben (Zusammenarbeit 1: umbenannt wird nur die Schnittstelle)
  const masse = Object.freeze({ buttonWidth: 66, buttonHeight: 44, gap: 11, margin: 11, openAt: 0.5, overshootMax: 60, overshootGrow: 0.06,
    decideAfter: NAV_ENTSCHEID, horizontal: NAV_WAAGRECHT });
  const hoerer = { toggle: new Set() };
  let offen = null;
  const bean = { metrics: masse, get openRow() { return offen; }, close() {}, disconnect() {},
    on(name, fn) { const h = hoerer[name]; if (!h || typeof fn !== 'function') return () => {}; h.add(fn); return () => { h.delete(fn); }; } };
  // Pflichtangaben (APD-136/W-75): ohne sie meldet die Bean den Fehler und tut nichts – die Liste bleibt bedienbar wie ohne Wischaktionen
  const fehlt = was => { console.error(`swipeactions: ${was} fehlt`); return bean; };
  if (!(liste instanceof Element)) return fehlt('list');
  if (!kacheln || typeof kacheln !== 'string') return fehlt('rows');
  if (typeof aktionen !== 'function') return fehlt('actions');
  const melde = (newState, row) => hoerer.toggle.forEach(fn => { try { fn({ row, newState }); } catch (e) { console.error(e); } });
  const wm = t => { if (measurement?.an) messEreignis('wisch ' + t); };
  const kachelVon = t => { const k = t instanceof Element ? t.closest(kacheln) : null; return k && k !== liste && liste.contains(k) ? k : null; };
  const eintraegeVon = k => {
    let alle;
    try { alle = aktionen(k) || []; } catch (e) { console.error(e); return []; }
    const e = alle.filter(x => x && typeof x === 'object' && typeof x.act === 'function' && !x.submenu && !('schalter' in x));
    const ohne = e.find(x => !x.shortTitle);
    if (ohne) { console.error(`swipeactions: shortTitle für ‚${ohne.label || '?'}‘ fehlt`); return []; }
    return e;
  };
  const gesperrt = () => dlg.open || msg.open || !!document.querySelector('.menu, .pop, .layer');
  // ‚daneben in der Liste‘ (APD-30/V-12): andere Kachel oder Fläche ohne Bedienelement in der Liste – schließt nur; alles außerhalb der Liste und jedes
  // Bedienelement in ihr, das keine Kachel ist (Kopf, Suchzeile, Backup-Kachel), wirkt sofort
  const nurSchliessen = (t, k) => !!k || (t instanceof Element && liste.contains(t) && !t.closest(SWIPE_BEDIENBAR));
  const eigene = new WeakSet();   // Bausteine der Bean in der Liste (zählen nicht als Neuaufbau)
  let ui = null, z = null, warten = false;
  const sperre = klickSperre();   // das schließende Tippen löst sonst nichts aus (D-3)

  // Aufbau: die Kapseln liegen neben der Kachel (nie darin, W-64) in einem Kasten so groß wie die Kachel, hinter ihr; die Kachel rückt nach links.
  function aufbauen(k, e) {
    abbauen();
    const traeger = k.parentElement;
    traeger.classList.add('ad-swipeactions-host');
    k.classList.add('ad-swipeactions-row');
    const box = document.createElement('div');
    box.className = 'ad-swipeactions-actions';
    box.inert = true;   // erst offen erreichbar (D-7)
    box.innerHTML = e.map((x, i) =>
      `<div class="ad-swipeactions-action" data-i="${i}"><button type="button" class="ad-swipeactions-button${x.red ? ' destructive' : ''}" aria-label="${esc(x.label || x.shortTitle)}">${
        x.icon ? ic(x.icon) : ''}</button><span class="ad-swipeactions-title" aria-hidden="true">${esc(x.shortTitle)}</span></div>`).join('');
    eigene.add(box);
    k.after(box);
    const u = { k, e, box, traeger, r: 0,
      ein: [...box.querySelectorAll('.ad-swipeactions-action')].map((el, i) => ({ x: e[i], el, kapsel: el.firstElementChild, wort: el.lastElementChild })) };
    u.ein.forEach((d, i) => { d.kapsel.onclick = () => ausloesen(u, i); });
    messen(u);
    ui = u;
    return u;
  }
  // Maße aus der Kachel und den Wörtern (D-9): je Aktion so breit wie die Kapsel bzw. das Wort; passt es nicht, bricht das Wort um
  function messen(u) {
    const { k, box } = u, bw = k.offsetWidth, bh = k.offsetHeight, n = u.ein.length;
    const K = Math.max(masse.buttonWidth, u.ein[0]?.kapsel.offsetWidth || 0);   // Kapselbreite wächst mit der Textgröße (--fb, F-4)
    const f = K / masse.buttonWidth, A = Math.round(masse.gap * f), R = Math.round(masse.margin * f);   // Abstände wachsen mit (P-108, M-9)
    Object.assign(box.style, { left: k.offsetLeft + 'px', top: k.offsetTop + 'px', width: bw + 'px', height: bh + 'px' });
    const platz = Math.max(K, Math.floor((bw - 60 - 2 * R - (n - 1) * A) / n));   // von der Kachel bleibt etwas sichtbar (W-1, W-54)
    let x = R;
    u.ein.forEach(d => {
      d.wort.classList.remove('wrap'); d.el.style.width = '';
      const soll = Math.max(K, Math.ceil(d.wort.scrollWidth) + 4);
      d.w = Math.min(soll, Math.max(K, platz));
      d.wort.classList.toggle('wrap', soll > d.w);
      d.el.style.width = d.w + 'px';
      d.xl = x; x += d.w + A;
    });
    u.breite = x - A + R; u.bw = bw; u.A = A;
    let von = R;   // von außen: ab welchem Weg die Kapsel erscheint (W-81)
    for (let i = n - 1; i >= 0; i--) { u.ein[i].von = von; von += u.ein[i].w + A; }
    u.ein.forEach(d => { d.left = bw - u.breite + d.xl; d.el.style.left = d.left + 'px'; d.el.style.top = Math.max(0, Math.round((bh - d.el.offsetHeight) / 2)) + 'px'; });
  }
  // P-109 (seit 4.60.3, wie Notizen gemessen – Wortlaut arbeit/0130 P-109 Wortlaut.md P-109/V-1, V-2; W-100 bis W-102): die Kachel gleitet mit der
  // Feder aus Notizen (ω = 12,6/s, Antwortzeit 0,5 s, unabhängig vom Weg). Jede Kapsel hat ihre eigene Zeit: Ziel ‚da‘, sobald die Kachel sie ganz
  // freigibt (r ≥ d.von + d.w), dann wächst sie aus ihrer Mitte in 0,25 s (ease-out) und ist nach 0,1 s ganz deckend; Ziel ‚weg‘, sobald die Kachel
  // sie erreicht, beim Schließen durch Tippen daneben bzw. auf eine andere Kachel für alle zugleich (u.alleAus) – sie vergeht in 0,23 s. Über die
  // offene Breite hinaus rücken die Kapseln anteilig mit und wachsen bis 6 % (P-108). ‚Bewegung reduzieren‘ (D-8): die Kachel steht sofort, die
  // Kapseln an ihrem Platz in voller Größe, nur die Deckkraft zu denselben Zeitpunkten. Ein Bild je requestAnimationFrame (nur transform und
  // opacity); eine Uhr-Animation an der Aktionsfläche hält document.getAnimations() bis zum letzten Bild ‚laufend‘ (die Prüfungen warten darauf).
  const SW_OMEGA = 12.6, SW_FEDER_MS = 750, SW_EIN_MS = 250, SW_DECK_MS = 100, SW_AUS_MS = 230;
  const swFeder = t => 1 - (1 + SW_OMEGA * t) * Math.exp(-SW_OMEGA * t), swEnde = swFeder(SW_FEDER_MS / 1000);
  const kanal = (d, k, ziel, ms, kurve, now) => { const c = d[k] ??= { v: 0, ziel: 0, v0: 0, t0: now };
    if (ziel !== c.ziel) { c.ziel = ziel; c.v0 = c.v; c.t0 = now; }
    if (c.v !== ziel) { const t = Math.min(1, (now - c.t0) / ms); c.v = t >= 1 ? ziel : c.v0 + (ziel - c.v0) * kurve(t); }
    return c.v; };
  const linear = t => t, easeOut = t => 1 - (1 - t) * (1 - t);
  function male(u, now) {
    const ruhig = bewegungRuhig(), ueber = Math.max(0, u.r - u.breite);
    let laeuft = false;
    u.k.style.transform = u.r ? `translate3d(${-Math.round(u.r)}px,0,0)` : '';
    u.ein.forEach(d => {
      const ziel = !u.alleAus && u.r >= d.von + d.w - 0.5 ? 1 : 0;
      const g = ruhig ? 1 : kanal(d, 'g', ziel, ziel ? SW_EIN_MS : SW_AUS_MS, ziel ? easeOut : linear, now);
      const o = kanal(d, 'o', ziel, ziel ? SW_DECK_MS : SW_AUS_MS, linear, now);
      if (d.o.v !== ziel || (!ruhig && d.g.v !== ziel)) laeuft = true;
      const dx = ruhig ? 0 : -ueber * (d.von + d.w) / u.breite, s = ruhig ? 1 : g * (1 + Math.min(masse.overshootGrow, ueber * masse.overshootGrow / 30));
      d.el.style.transform = `translate3d(${dx.toFixed(1)}px,0,0) scale(${Math.max(0.001, s).toFixed(3)})`;
      d.el.style.opacity = String(+o.toFixed(3));
    });
    return laeuft;
  }
  let takt = 0, uhr = null;
  function uhrAus() { if (takt) cancelAnimationFrame(takt); takt = 0; if (uhr) { uhr.cancel(); uhr = null; } }
  // die Zeit immer aus performance.now() – der Zeitstempel von requestAnimationFrame kann davon abweichen (z. B. mit fester Uhr in den Prüfungen)
  function tick() {
    const now = performance.now();
    takt = 0;
    const u = ui; if (!u) return uhrAus();
    let weiter = false;
    const f = u.fahrt;
    if (f) { const ms = now - f.t0; if (ms >= SW_FEDER_MS) { u.r = f.nach; u.fahrt = null; } else { u.r = f.von + (f.nach - f.von) * Math.max(0, swFeder(ms / 1000)) / swEnde; weiter = true; } }
    if (male(u, now)) weiter = true;
    if (weiter) { takt = requestAnimationFrame(tick); return; }
    uhrAus();
    const fertig = u.fertig; u.fertig = null; fertig?.();
  }
  function anstossen(u) {
    if (!uhr && u.box.animate) { uhr = u.box.animate([{ opacity: 1 }, { opacity: 1 }], { duration: 60000 }); uhr.id = 'swipeactions'; }
    if (!takt) takt = requestAnimationFrame(tick);
  }
  // Finger: die Kachel steht genau unter dem Finger, die Kapseln laufen mit ihrer Zeit weiter
  function setze(u, r) { u.r = r; u.alleAus = false; if (male(u, performance.now())) anstossen(u); }
  // Gleiten mit der Feder (nicht bei ‚Bewegung reduzieren‘); fertig erst, wenn auch die Kapseln am Ziel sind
  function fahre(u, von, nach, fertig) {
    stoppe();
    const ruhig = bewegungRuhig() || von === nach || !u.k.isConnected;
    u.r = ruhig ? nach : von; u.fahrt = ruhig ? null : { von, nach, t0: performance.now() }; u.fertig = fertig;
    if (!male(u, performance.now()) && !u.fahrt) { u.fertig = null; uhrAus(); return fertig?.(); }
    anstossen(u);
  }
  // Abbruch einer laufenden Bewegung: die Kachel steht am Ziel (wie bisher), fertig läuft sofort
  function stoppe() { const u = ui; if (!u) return; if (u.fahrt) { u.r = u.fahrt.nach; u.fahrt = null; } const f = u.fertig; u.fertig = null; f?.(); }
  function abbauen() {
    const u = ui; if (!u) return;
    stoppe(); ui = null; uhrAus();
    u.box.remove(); u.k.classList.remove('ad-swipeactions-row'); u.k.style.transform = '';
    if (!u.traeger.querySelector(':scope > .ad-swipeactions-actions')) u.traeger.classList.remove('ad-swipeactions-host');
  }
  function oeffnen(u, von, fertig) {
    const war = offen === u.k;
    offen = u.k; u.box.inert = false; u.alleAus = false;
    fahre(u, von, u.breite, fertig);
    if (!war) melde('open', u.k);
  }
  // alle (P-109/V-1): Schließen durch Tippen daneben bzw. auf eine andere Kachel, Rollen, close() – alle Kapseln vergehen zugleich;
  // sonst (Tippen auf die offene Kachel, Zurückwischen) jede, sobald die Kachel sie erreicht
  function zumachen(sofort = false, alle = true) {
    const u = ui, war = offen;
    offen = null;
    if (u) { u.box.inert = true; if (sofort || !u.k.isConnected) abbauen(); else { u.alleAus = alle; fahre(u, u.r, 0, abbauen); } }
    if (war) melde('closed', war);
  }
  function ziehenAus() { if (z?.aktiv) { swipeZieht = false; sperre.los(); } z = null; }
  // Aktion: act bekommt die Kapsel als sourceView (die Sprechblase wächst aus ihr, D-6); ein Promise hält die Kachel offen, bis es erfüllt ist
  function ausloesen(u, i) {
    const d = u.ein[i];
    if (!d || ui !== u || offen !== u.k || warten) return;
    schleierFrei.set(d.kapsel, () => { if (ui !== u || !u.k.isConnected) return null;
      // sichtbarer Teil: die Kachel läuft links unter den Rand der Liste
      const a = u.k.getBoundingClientRect(), b = u.box.getBoundingClientRect(), t = u.traeger.getBoundingClientRect(), l = Math.max(a.left, t.left);
      return { left: l, top: a.top, width: Math.min(b.right, t.right) - l, height: a.height }; });
    warten = true;
    let r;
    try { r = d.x.act({ sourceView: d.kapsel }); } catch (e) { console.error(e); }
    const fertig = () => {
      warten = false;
      if (ui !== u || offen !== u.k) return;
      const a = document.activeElement, zurueck = !a || a === document.body || u.box.contains(a);
      zumachen();
      if (zurueck) focus(u.k);   // W-14: Fokus auf der Kachel
    };
    if (r && typeof r.then === 'function') r.then(fertig, fertig); else fertig();
  }

  // Gesten. Aufsetzen: Tippen daneben in der Liste schließt die offene Kachel und löst nichts aus, eine Schaltfläche außerhalb schließt sie und wirkt
  // (W-42, W-43); auf die offene Kachel entscheidet das Loslassen
  const druck = e => {
    if (!e.isPrimary) { if (z?.aktiv) los(e, true, true); return; }   // zweiter Finger = Abbruch (W-39)
    sperre.frei();
    const k = kachelVon(e.target), inBox = !!ui?.box.contains(e.target);
    if (offen && !warten && !inBox && k !== offen) { zumachen(); if (nurSchliessen(e.target, k)) sperre.an(); }
    z = null;
    if (e.button > 0 || !k || inBox || warten || gesperrt()) return;
    if (ui?.k === k) stoppe();   // P-109/F-2: nur die eigene Bewegung anhalten – das Schließen einer anderen Kachel gleitet weiter
    z = { k, id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: e.timeStamp, aktiv: false, start: offen === k && ui?.k === k ? ui.breite : 0, tipp: offen === k };
    wm('kandidat');
  };
  const zug = e => {
    if (!z || e.pointerId !== z.id) return;
    const dx = e.clientX - z.x0, dy = e.clientY - z.y0;
    if (!z.aktiv) {
      if (Math.abs(dx) < masse.decideAfter && Math.abs(dy) < masse.decideAfter) return;
      const waagrecht = Math.abs(dx) > Math.abs(dy) * masse.horizontal && (dx < 0 || z.start > 0);   // D-4: geschlossen nie nach rechts
      const eintr = waagrecht && e.timeStamp - z.t0 <= NAV_HALTEN && !gesperrt() ? (z.start ? ui.e : eintraegeVon(z.k)) : [];
      if (!eintr.length) { wm(`verworfen ${Math.round(dx)} ${Math.round(dy)}`); z = null; return; }
      if (offen && offen !== z.k) zumachen(true);
      if (ui?.k !== z.k) aufbauen(z.k, eintr);
      z.aktiv = true; swipeZieht = true; sperre.an();
      if (kbOffen()) document.activeElement?.blur?.();   // wie R-7.5: die Tastatur schließt zuerst
      try { e.target.setPointerCapture?.(e.pointerId); } catch {}
    }
    if (e.cancelable) e.preventDefault();
    // über die offene Breite hinaus mit Widerstand wie am Rand einer Rollfläche, höchstens masse.overshootMax (kein Durchwischen, P-108)
    const roh = Math.max(0, z.start - dx), M = masse.overshootMax, B = ui.breite;
    z.r = roh > B ? B + (1 - 1 / ((roh - B) * 0.55 / M + 1)) * M : roh;
    setze(ui, z.r);
  };
  function los(e, abbruch, egal = false) {
    if (!egal) sperre.los();
    if (!z || (!egal && e.pointerId !== z.id)) return;
    const a = z;
    ziehenAus();
    const u = ui;
    if (!a.aktiv) {
      // Tippen auf die offene Kachel schließt sie und öffnet nichts (W-4)
      if (!abbruch && a.tipp && offen === a.k && !warten) { sperre.an(); sperre.los(); zumachen(false, false); }
      return;
    }
    if (!u || u.k !== a.k) return;
    const r = a.r ?? a.start, weg = `weg ${Math.round(r)}`;
    if (abbruch) { wm(`abgebrochen ${weg}`); if (a.start) oeffnen(u, r); else fahre(u, r, 0, abbauen); return; }   // Zustand wie vorher
    if (r > u.breite * masse.openAt) { wm(`offen ${weg}`); oeffnen(u, r); }
    else { wm(`zurück gefedert ${weg}`); if (offen === u.k) zumachen(false, false); else fahre(u, r, 0, abbauen); }
  }
  const hoch = e => los(e, false), abbruch = e => los(e, true);
  const klick = e => { if (sperre.nimm()) { e.preventDefault(); e.stopImmediatePropagation(); } };
  const touch = e => { if (z?.aktiv && e.cancelable) e.preventDefault(); };   // Safari nimmt dem Finger die Geste sonst weg (W-65)
  const taste = e => {
    if (!offen || warten || !istAbbruch(e) || e.defaultPrevented || tastenStapel.length || dlg.open || msg.open) return;
    verbrauchen(e);
    const k = offen, f = !!ui?.box.contains(document.activeElement);
    zumachen();
    if (f) focus(k);
  };
  const roll = e => { if (!offen || warten || z?.aktiv) return; const t = e.target; if (t === document || t.contains?.(offen)) zumachen(); };
  let breiteVorher = innerWidth;
  const groesse = () => {
    if (innerWidth === breiteVorher) return;   // nur Drehen (neue Breite) – die Tastatur ändert nur die Höhe
    breiteVorher = innerWidth;
    if (z?.aktiv) { wm(`abgebrochen weg ${Math.round(z.r || 0)}`); ziehenAus(); zumachen(true); return; }
    if (warten && ui) { messen(ui); setze(ui, ui.breite); return; }
    if (offen || ui) zumachen(true);
  };
  // Neuaufbau der Liste (Abgleich, Suche, Speichern): die offene bzw. gezogene Kachel schließt sofort
  const mo = new MutationObserver(rs => {
    if (!ui) return;
    const fremd = rs.some(r => !(eigeneDrin(r.target) || [...r.addedNodes, ...r.removedNodes].every(n => eigene.has(n))));
    if (!ui.k.isConnected || fremd) { ziehenAus(); zumachen(true); }
  });
  const eigeneDrin = n => { for (let e = n; e && e !== liste; e = e.parentNode) if (eigene.has(e)) return true; return false; };
  const faengt = t => !!kachelVon(t);
  addEventListener('pointerdown', druck, true);
  addEventListener('pointermove', zug, { capture: true, passive: false });
  addEventListener('pointerup', hoch, true);
  addEventListener('pointercancel', abbruch, true);
  addEventListener('click', klick, true);
  addEventListener('touchmove', touch, { capture: true, passive: false });
  document.addEventListener('keydown', taste, true);
  addEventListener('scroll', roll, { capture: true, passive: true });
  addEventListener('resize', groesse);
  mo.observe(liste, { childList: true, subtree: true });
  swipeBeans.add(faengt);
  liste.classList.add('ad-swipeactions');
  liste.dataset.adBean = 'swipeactions';
  bean.close = () => { ziehenAus(); zumachen(); };
  bean.disconnect = () => {
    ziehenAus(); zumachen(true);
    removeEventListener('pointerdown', druck, true); removeEventListener('pointermove', zug, { capture: true });
    removeEventListener('pointerup', hoch, true); removeEventListener('pointercancel', abbruch, true); removeEventListener('click', klick, true);
    removeEventListener('touchmove', touch, { capture: true }); document.removeEventListener('keydown', taste, true);
    removeEventListener('scroll', roll, { capture: true }); removeEventListener('resize', groesse);
    mo.disconnect(); swipeBeans.delete(faengt);
    liste.classList.remove('ad-swipeactions'); delete liste.dataset.adBean;
    bean.close = () => {}; bean.disconnect = () => {};
  };
  return bean;
}

// Seit 4.43.0 (APD-91, R-2.3, R-4.7): die Suche öffnet ‚Suchen‘ als erster Punkt im Mehr-Menü (darunter ein Strich, wie ‚Find in
// Note‘ in Notizen) oder ⌘F – im offenen Eintrag, ohne offenen Eintrag in allen; das entscheidet die App (searchRegister). Ist die Suche
// schon offen, setzt die App nur den Cursor ins Feld; bei offenem Fenster, Meldung oder Menü wirkt ⌘F nicht.
const searchMenuItems = act => [{ icon: 'search', label: 'Suchen', act }, 'line'];
let sucheApp = null;
const searchRegister = fn => { sucheApp = fn; };
document.addEventListener('keydown', e => {
  if (!e.metaKey || e.altKey || e.ctrlKey || e.key?.toLowerCase() !== 'f' || !sucheApp) return;
  e.preventDefault();
  if (dlg.open || msg.open || document.querySelector('.menu, .pop')) return;
  sucheApp();
});
// Runde Schaltfläche x rechts in der Suchzeile (15.2): schließt die Suchzeile – Filter und Markierung weg, der Inhalt steht ganz oben.
const searchCancelHtml = id => `<button type="button" class="round sclose" id="${id}" aria-label="Suche beenden">${ic('x')}</button>`;

// APD-61/F-20 (VoiceOver): die ‚Zurück‘-Geste (Z) bzw. Escape geht zurück bzw. schließt die darübergelegte Seitenleiste
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || e.defaultPrevented || !navApp || dlg.open || msg.open || document.querySelector('.menu, .pop')) return;
  if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
  if (isPhone() && navApp.back?.shown()) { e.preventDefault(); navPop(); }
  else if (!isPhone() && navApp.sidebar?.possible() && navApp.sidebar.shown()) {
    e.preventDefault(); navSidebar(false);
    // R-4.7 (seit 4.35.0, K7): der Fokus geht auf panel-left (die Seitenleiste ist weg)
    focus([...document.querySelectorAll('[data-side-toggle]')].find(b => b.getClientRects().length && !b.closest('#side')));
  }
});

/* ---------- Blatt auf dem iPhone (seit 4.32.0, APD-61 Teil 2, R-4.6) ---------- */

// Wie iOS 26 (‚Neuer Termin‘, Variante A ‚nur groß‘, Nutzer 23.10.2026; Testfall-Liste arbeit/APD-61 Teil 2 Testfall-Liste.md): im iPhone-Aufbau ist
// jedes Fenster (#dlg) ein Blatt – es gleitet von unten bis knapp unter die Statusleiste, die Seite dahinter weicht verkleinert und
// abgedunkelt zurück (quer: volle Höhe, die Seite bleibt). Nach unten ziehen schließt wie das x: am Kopf immer, im Inhalt, wenn er ganz
// oben steht, ein schnelles Wischen genügt; mit Änderungen seit dem Öffnen (dlgDirty) zieht es sich zäh, federt zurück und fragt am x
// (R-4.4). Bei offener Tastatur schließt der Zug nach unten zuerst die Tastatur; beginnt er auf einem Feld, zieht er im selben Zug das
// Blatt wie am Kopf (seit 4.32.1, APD-71: R-4.5 hat den Inhalt gerollt, nicht der Nutzer – ein Feld, das selbst gerollt ist, rollt
// weiter); im gerollten Inhalt daneben rollt er weiter. Antippen der Abdunkelung wirkt wie x. Meldungen (#msg)
// bleiben kleine Fenster in der Mitte. Seit 4.38.0 (APD-72, Variante B, Testfall-Liste arbeit/APD-72 Testfall-Liste.md APD-72/D-1 bis APD-72/D-20) gilt
// der Zug auch im iPad-Aufbau wie in iPadOS: das Fenster bleibt in der Mitte, gleitet beim Öffnen und Schließen von unten, beim Ziehen
// fährt nur das Fenster mit, die Abdunkelung wird heller, die Seite bleibt; Antippen der Abdunkelung schließt dort nicht (wie ein
// Formblatt in iPadOS). Entschieden nach 8 px, deutlich senkrecht (1,2 × so weit
// wie waagerecht); waagerecht rollende Bereiche behalten ihr Rollen. Beim Loslassen zählt, wo das Blatt mit dem Tempo auslaufen würde.
// Je Bild nur translate, scale und opacity (Web-Animation, damit die Prüfungen auf ihr Ende warten); ‚Bewegung reduzieren‘: Überblenden,
// das Ziehen folgt weiter dem Finger. Das Schließen bleibt sofort (dlg.close, Häkchen): ein Abbild des Blatts gleitet hinaus.
const BLATT_ENTSCHEID = 8, BLATT_SENKRECHT = 1.2, BLATT_ZAEH = 0.3, BLATT_DUNKEL = 0.3, BLATT_KLEINER = 0.07, BLATT_AUSLAUF = 400;
// Kurven und Dauern seit 4.57.0 nach R-1.12 (GLEIT_FEDER, GLEIT_ZU; bis 4.56.0 BLATT_KURVE = cubic-bezier(.32,.72,0,1))
const blattSchleier = document.createElement('div');
blattSchleier.className = 'blatt-schleier';
blattSchleier.setAttribute('aria-hidden', 'true');
document.body.append(blattSchleier);
let blattY = 0, blattZug = null, blattLauf = null, blattGeistEl = null;
const blattSperre = klickSperre();   // seit 4.50.0 (APD-108) statt blattKlickWeg
const blattQuer = () => window.matchMedia?.('(orientation: landscape) and (max-height: 500px)').matches;
// Oberkante des Blatts im sichtbaren Bereich: hoch 10 px unter der Statusleiste, quer 8 px
const blattOben = () => !isPhone() ? 0 : blattQuer() ? 8 : Math.round(safeRand().top + 10);
// Versatz, bei dem das Blatt bzw. Fenster unten ganz hinaus ist – am iPad (APD-72) vom Platz des Fensters in der Mitte aus
const blattZu = () => Math.max(innerHeight, seitenHoehe()) - (isPhone() ? blattOben() : Math.min(innerHeight - 1, parseFloat(dlg.style.top) || 0));
// Abdunkelung: am iPhone wie iOS, am iPad so dunkel wie bisher ::backdrop (design.css)
const blattDunkel = () => isPhone() ? BLATT_DUNKEL : 0.35;
// die Seite dahinter: was fest steht und zu sehen ist (Inhalt bzw. Startliste)
const blattSeite = () => [document.getElementById('app'), document.getElementById('side')]
  .filter(e => e && e.getClientRects().length && getComputedStyle(e).position === 'fixed');
// Bild zum Versatz o (0 = offen, blattZu() = unten hinaus): Blatt, Abdunkeln und die Seite – sie weicht nur am iPhone hoch zurück
function blattBild(o) {
  // R-1.9 (seit 4.35.0, M5): mit ‚Bewegung reduzieren‘ weicht die Seite nicht verkleinert zurück (kein Zoomen), sie dunkelt nur ab
  const zu = blattZu(), q = Math.max(0, Math.min(1, 1 - o / zu)), s = !isPhone() || blattQuer() || bewegungRuhig() ? 0 : q;
  return { blatt: `0 ${Math.round(o)}px`, schleier: +(blattDunkel() * q).toFixed(3), s,
    seite: { translate: `0px ${(s * Math.max(0, blattOben() - 12)).toFixed(1)}px`, scale: (1 - BLATT_KLEINER * s).toFixed(4) } };
}
function blattSetze(o) {
  blattY = o;
  const b = blattBild(o), H = document.documentElement;
  dlg.style.translate = o ? b.blatt : '';
  blattSchleier.style.opacity = b.schleier;
  const seite = blattSeite();
  for (const e of seite) { e.style.translate = b.s ? b.seite.translate : ''; e.style.scale = b.s ? b.seite.scale : ''; e.classList.toggle('blatt-seite', b.s > 0); }
  H.classList.toggle('blatt-zurueck', b.s > 0 && seite.length > 0);
}
// laufende Bewegung an der Stelle anhalten, an der sie gerade ist (Anfassen mitten im Gleiten)
function blattStopp() {
  if (!blattLauf) return;
  const l = blattLauf; blattLauf = null;
  const t = getComputedStyle(dlg).translate, o = t && t !== 'none' ? parseFloat(t.split(' ')[1]) || 0 : 0;
  l.anims.forEach(a => a.cancel());
  document.documentElement.classList.remove('blatt-faehrt');
  if (dlg.open) blattSetze(o);
}
function blattAnimiere(teile, dauer, easing, fertig) {
  const H = document.documentElement;
  H.classList.add('blatt-faehrt');
  const anims = teile.map(([el, von, nach]) => el.animate([von, nach], { duration: dauer, easing, fill: 'forwards' }));
  const l = { anims };
  blattLauf = l;
  anims[0].onfinish = () => {
    if (blattLauf !== l) return;
    blattLauf = null;
    fertig?.();
    anims.forEach(a => a.cancel());
    H.classList.remove('blatt-faehrt');
  };
}
// weich zum Versatz nach – Kurve wie iOS (schnell los, lang auslaufend), Dauer nach dem Weg
function blattFahre(nach, fertig, dauer) {
  blattStopp();
  const von = blattY;
  // R-1.9 (seit 4.35.0, M5): mit ‚Bewegung reduzieren‘ gleitet das Blatt nach dem Loslassen nicht (kein Nachfedern) – es steht sofort am Ziel
  if (Math.abs(von - nach) < 1) { blattSetze(nach); fertig?.(); return; }
  // erst nach dem Loslassen; das x kommt trotz blattSperre an (eigenKlick in blattWieX, APD-108)
  if (bewegungRuhig()) { blattSetze(nach); setTimeout(() => fertig?.()); return; }
  // R-1.12 (seit 4.57.0, APD-127/B-1): hinauf (öffnen, zurück nach dem Loslassen) mit der Feder in 0,5 s, hinunter (zu) ease-in-out in 0,25 s –
  // je nach Weg anteilig, mindestens 0,15 s (bis 4.56.0 0,22–0,48 s je nach Weg, Kurve BLATT_KURVE)
  const zu = nach > von;
  dauer = dauer || Math.max(GLEIT_MIN_MS, (zu ? GLEIT_ZU_MS : GLEIT_AUF_MS) * Math.min(1, Math.abs(nach - von) / Math.max(1, blattZu())));
  const a = blattBild(von), b = blattBild(nach);
  blattSetze(Math.min(von, nach));   // die Seite weicht schon während der Bewegung zurück (runde Ecken, Hintergrund)
  blattAnimiere([[dlg, { translate: a.blatt }, { translate: b.blatt }], [blattSchleier, { opacity: a.schleier }, { opacity: b.schleier }],
    ...blattSeiteTeile(a, b)], dauer, zu ? GLEIT_ZU : GLEIT_FEDER, () => { blattSetze(nach); fertig?.(); });
}
// die Seite bewegt sich nur, wenn sie zurückweicht (iPhone hoch) – am iPad und quer bleibt sie ohne Animation (APD-72/D-2)
const blattSeiteTeile = (a, b) => a.s || b.s ? blattSeite().map(e => [e, a.seite, b.seite]) : [];
// Öffnen (openDialog): von unten herein (seit 4.38.0 auch am iPad, APD-72/D-1); ‚Bewegung reduzieren‘: überblenden
function blattAuf() {
  blattStopp();
  if (!dlg.open) return;
  document.documentElement.classList.add('blatt');
  if (bewegungRuhig()) {
    blattSetze(0);
    blattAnimiere([[dlg, { opacity: 0 }, { opacity: 1 }], [blattSchleier, { opacity: 0 }, { opacity: blattBild(0).schleier }]], 200, 'ease-out');
    return;
  }
  blattSetze(blattZu());
  blattFahre(0);
}
// geschlossen: alles zurück
function blattAus() {
  blattStopp();
  blattY = 0;
  dlg.style.translate = '';
  blattSchleier.style.opacity = 0;
  for (const e of [document.getElementById('app'), document.getElementById('side')]) if (e) { e.style.translate = ''; e.style.scale = ''; e.classList.remove('blatt-seite'); }
  document.documentElement.classList.remove('blatt', 'blatt-zurueck', 'blatt-zieht');
}
// Abbild des Blatts beim Schließen: dlg.close() bleibt sofort (die App baut danach neu auf), das Abbild gleitet hinaus
function blattGeist() {
  if (blattGeistEl || !dlg.open || !document.documentElement.classList.contains('blatt')) return;
  const r = dlg.getBoundingClientRect();
  if (r.top >= innerHeight - 1) return;
  const g = document.createElement('dialog');
  g.className = `${dlg.className} blatt-geist`;
  g.setAttribute('aria-hidden', 'true');
  g.inert = true;
  for (const n of dlg.childNodes) g.append(n.cloneNode(true));
  g.querySelectorAll('[id], [name]').forEach(e => { e.removeAttribute('id'); e.removeAttribute('name'); });
  g.style.cssText = `display:block;position:fixed;inset:auto;margin:0;left:${r.left}px;top:${parseFloat(dlg.style.top) || 0}px;width:${r.width}px;height:${dlg.offsetHeight}px;max-height:none;translate:0 ${Math.round(blattY)}px`;
  document.body.append(g);
  const alt = [...dlg.querySelectorAll('*')], neu = [...g.querySelectorAll('*')];
  alt.forEach((e, i) => { if ((e.scrollTop || e.scrollLeft) && neu[i]) { neu[i].scrollTop = e.scrollTop; neu[i].scrollLeft = e.scrollLeft; } });
  blattGeistEl = g;
  const weg = () => { g.remove(); if (blattGeistEl === g) blattGeistEl = null; };
  const a = bewegungRuhig() ? g.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: 'ease-out', fill: 'forwards' })
    : g.animate([{ translate: `0 ${Math.round(blattY)}px` }, { translate: `0 ${Math.round(blattZu())}px` }], { duration: GLEIT_ZU_MS, easing: GLEIT_ZU, fill: 'forwards' });   // R-1.12 (seit 4.57.0): 0,25 s ease-in-out
  a.onfinish = weg; a.oncancel = weg;
}
// geschlossen: Abdunkelung und Seite zurück, gleichzeitig mit dem Abbild
function blattWeg() {
  const H = document.documentElement;
  if (!H.classList.contains('blatt')) return;
  blattZug = null;
  blattStopp();
  const von = blattBild(blattY), nach = blattBild(blattZu());
  H.classList.remove('blatt-zieht');
  if (!blattSeite().length && !von.schleier) return blattAus();
  blattAnimiere([[blattSchleier, { opacity: von.schleier }, { opacity: 0 }], ...blattSeiteTeile(von, nach)],
    bewegungRuhig() ? 200 : GLEIT_ZU_MS, bewegungRuhig() ? 'ease-out' : GLEIT_ZU, blattAus);   // R-1.12 (seit 4.57.0): gleich mit dem Abbild (bis 4.56.0 0,38 s)
}
const dlgSchliessen = dlg.close.bind(dlg);
dlg.close = v => { blattGeist(); dlgSchliessen(v); };
// Häkchen in <form method="dialog">: der Browser schließt nach dem submit-Ereignis
dlg.addEventListener('submit', e => { if (!e.defaultPrevented && e.target.getAttribute?.('method') === 'dialog') blattGeist(); });
dlg.addEventListener('close', () => { if (!dlg.open) blattWeg(); });
// Drehen bzw. anderer Aufbau mit offenem Blatt: bleibt offen in der passenden Form (quer immer volle Höhe), am iPad in der Mitte (APD-72/D-15)
window.addEventListener('resize', () => {
  if (!dlg.open) return;
  document.documentElement.classList.add('blatt');
  if (!blattLauf && !blattZug?.aktiv) blattSetze(blattY);
});
const blattX = () => dlg.querySelector('#dlgX');
// wie das x (Escape, Abdunkelung am iPhone, Ziehen): mit Änderungen fragt die Sprechblase am x
function blattWieX() { const x = blattX(); if (x) eigenKlick(x); else dlg.close('cancel'); }
const blattDraussen = e => { if (e.target !== dlg) return false; const r = dlg.getBoundingClientRect();
  return e.clientY < r.top || e.clientY > r.bottom || e.clientX < r.left || e.clientX > r.right; };
dlg.addEventListener('click', e => { if (blattDraussen(e) && isPhone() && !blattSperre.aktiv() && !document.querySelector('.pop, .menu')) blattWieX(); });
window.addEventListener('click', e => { if (blattSperre.nimm()) { e.preventDefault(); e.stopPropagation(); } }, true);
window.addEventListener('pointerdown', e => { if (e.isPrimary) blattSperre.frei(); }, true);
// steht der Inhalt unter dem Finger schon ganz oben? (auch Bereiche mit eigenem senkrechten Rollen)
function blattGanzOben(t) {
  for (let e = t; e && e !== dlg; e = e.parentElement) if (e.scrollTop > 0 && e.scrollHeight > e.clientHeight + 1) return false;
  return true;
}
const blattFeld = () => { const a = document.activeElement; return dlg.contains(a) && a.matches?.(FELD) ? a : null; };
dlg.addEventListener('pointerdown', e => {
  blattZug = null;
  if (!dlg.open || !e.isPrimary || e.button > 0 || blattDraussen(e) || document.querySelector('.pop, .menu')) return;
  if (e.target.closest?.('[data-eigene-geste], input[type=range], .pop, .menu')) return;
  blattZug = { id: e.pointerId, x0: e.clientX, y0: e.clientY, o: blattY, kopf: !!e.target.closest('.dlg-head'), t: e.target, aktiv: false,
    feld: blattFeld() ? e.target.closest?.(FELD) : null, spur: [[e.timeStamp, e.clientY]] };
});
function blattErlaubt(z, dx, dy) {
  if (dy <= 0 || Math.abs(dy) <= Math.abs(dx) * BLATT_SENKRECHT) return false;
  if (z.feld) return !(z.feld.scrollTop > 0 && z.feld.scrollHeight > z.feld.clientHeight + 1);   // APD-71: Feld bei offener Tastatur
  return z.kopf || blattGanzOben(z.t);
}
// Ist der Zug entschieden, verhindert touchmove das Rollen (Safari entscheidet sonst selbst, 13)
dlg.addEventListener('touchmove', e => {
  const z = blattZug, t = e.touches?.[0];
  if (!z || !t || z.nurTastatur) return;
  if (e.cancelable && (z.aktiv || (Math.abs(t.clientY - z.y0) > 1 && blattErlaubt(z, t.clientX - z.x0, t.clientY - z.y0)))) e.preventDefault();
}, { passive: false });
window.addEventListener('pointermove', e => {
  const z = blattZug;
  if (!z || e.pointerId !== z.id) return;
  // seit 4.32.2 (APD-73, P-69/3): ein Zug, der das Blatt nicht zieht (zuerst nach oben oder waagerecht), bleibt bei offener Tastatur
  // beobachtet – geht der Finger danach mindestens 8 px unter seinen höchsten Punkt, deutlich senkrecht, schließt die Tastatur (wie iOS);
  // der Inhalt rollt dabei weiter (touchmove bleibt frei). Gemessen am Rand: 244 → 76 → 302, entschieden war nach 8 px ‚nach oben‘.
  if (z.nurTastatur) {
    if (e.clientY < z.hy) { z.hx = e.clientX; z.hy = e.clientY; }
    const hx = e.clientX - z.hx, hy = e.clientY - z.hy;
    if (hy >= BLATT_ENTSCHEID && hy > Math.abs(hx) * BLATT_SENKRECHT) { blattFeld()?.blur(); blattZug = null; }
    return;
  }
  const dx = e.clientX - z.x0, dy = e.clientY - z.y0;
  if (!z.aktiv) {
    if (Math.abs(dx) < BLATT_ENTSCHEID && Math.abs(dy) < BLATT_ENTSCHEID) return;
    // nach unten ziehen schließt die Tastatur (wie iOS) – im gerollten Inhalt rollt er weiter, am Kopf, auf einem Feld bzw. ganz oben
    // folgt das Blatt
    if (dy > Math.abs(dx) * BLATT_SENKRECHT) blattFeld()?.blur();
    if (!blattErlaubt(z, dx, dy)) { blattZug = blattFeld() ? Object.assign(z, { nurTastatur: true, hx: e.clientX, hy: Math.min(e.clientY, z.y0) }) : null; return; }
    z.aktiv = true;
    blattSperre.an();
    blattStopp();
    z.o = blattY;
    document.documentElement.classList.add('blatt-zieht');
    try { dlg.setPointerCapture(e.pointerId); } catch {}
  }
  if (e.cancelable) e.preventDefault();
  blattFeld()?.blur();                              // während des Ziehens bekommt kein Feld den Fokus (WebKit mit Maus)
  z.spur.push([e.timeStamp, e.clientY]);
  if (z.spur.length > 8) z.spur.shift();
  let o = z.o + dy;
  if (o < 0) o = -Math.pow(-o, 0.7);               // über ‚groß‘ hinaus: Gummiband
  z.roh = o;                                        // ungebremst – danach wird entschieden
  if (o > 0 && dlgDirty?.()) o *= BLATT_ZAEH;       // mit Änderungen zäh: es schließt nicht
  blattSetze(o);
}, { passive: false });
function blattLos(e, abbruch) {
  const z = blattZug;
  if (!z || e.pointerId !== z.id) return;
  blattZug = null;
  if (!z.aktiv) return;
  document.documentElement.classList.remove('blatt-zieht');
  blattFeld()?.blur();
  blattSperre.an(); blattSperre.los();   // APD-108: bis 400 ms nach dem Loslassen genau ein Klick
  const spur = z.spur.filter(([t]) => t >= e.timeStamp - 100);
  const tempo = spur.length > 1 && spur.at(-1)[0] > spur[0][0] ? (spur.at(-1)[1] - spur[0][1]) / (spur.at(-1)[0] - spur[0][0]) : 0;   // px/ms nach unten
  const wohin = (z.roh ?? blattY) + tempo * BLATT_AUSLAUF, zu = blattZu();
  if (abbruch || Math.abs(wohin) <= Math.abs(zu - wohin)) { blattFahre(0); return; }
  if (dlgDirty?.()) { blattFahre(0); setTimeout(() => { if (dlg.open) blattWieX(); }, 260); return; }
  blattFahre(zu, () => { blattWieX(); if (dlg.open) blattFahre(0); });   // R-1.12 (seit 4.57.0): Rest anteilig in blattFahre (bis 4.56.0 0,18–0,36 s)
}
window.addEventListener('pointerup', e => blattLos(e, false), true);
window.addEventListener('pointercancel', e => blattLos(e, true), true);

/* ---------- Tastatur und sichtbarer Bereich ---------- */

// Bei offener Tastatur verkleinert und verschiebt Safari den sichtbaren Bereich. Kopfzeile, Tabellenkopf
// und alle Fenster richten sich danach: die Kopfzeilen bleiben sichtbar, nur der Inhalt scrollt.
// Seit 4.28.1 (APD-36, Safari-Eigenheit APD-36/S-3): Höhe der Seite ohne Tastatur = innerHeight + scrollY – verschiebt Safari den sichtbaren
// Bereich, wird innerHeight um genau so viel kleiner. Daraus der Abstand der Tastatur vom unteren Rand (Kapsel) und ob sie offen ist.
// Mit Rollbereich rollt die Seite selbst nie – scrollY ist dann nur Safaris Verschiebung (ohne Rollbereich rollt das Fenster).
function seitenHoehe() { return innerHeight + (scrollView.el ? Math.max(0, scrollY) : 0); }
function kbOffen() { return !!window.visualViewport && visualViewport.height < seitenHoehe() - 80; }
// Felder, die eine Tastatur öffnen (Datum, Uhrzeit, Auswahl und Schalter öffnen keine)
const FELD = 'textarea, input:not([type=date],[type=time],[type=datetime-local],[type=month],[type=checkbox],[type=radio],[type=button],[type=submit],[type=reset],[type=range],[type=color],[type=file],[type=hidden]):not([readonly])';
let dlgFest = 0;   // seit 4.28.1: Höhe des iPad-Fensters vor dem Antippen – der Platz unter dem Inhalt macht es nicht höher
// R-1.7 (seit 4.29.0, APD-63): sichere Ränder in px – aus den Variablen --safe-… (design.css), über ein unsichtbares Element gelesen
let safeEl = null;
function safeRand() {
  if (!safeEl) { safeEl = document.createElement('div'); safeEl.setAttribute('aria-hidden', 'true');
    safeEl.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:var(--safe-top) var(--safe-right) var(--safe-bottom) var(--safe-left)';
    document.body.append(safeEl); }
  const c = getComputedStyle(safeEl);
  return { top: parseFloat(c.paddingTop) || 0, bottom: parseFloat(c.paddingBottom) || 0, left: parseFloat(c.paddingLeft) || 0, right: parseFloat(c.paddingRight) || 0 };
}
function drehRestWeg() {
  if (window.visualViewport && scrollY > 0 && (scrollView.el || document.documentElement.scrollHeight <= innerHeight + 1) && !kbOffen() && !document.activeElement?.matches?.(FELD)) scrollTo(0, 0);
}
function placeDialogs() {
  const vv = window.visualViewport;
  // APD-129 (seit 4.59.1, Messung 14.11.2026 arbeit/APD-129/messung-2026-11-14-0948.txt, iPhone vom Home-Bildschirm): nach dem Zurückdrehen auf hoch
  // lässt Safari die Seite um die Statusleiste verschoben (scrollY und offsetTop 62) – ohne Tastatur. Mit Rollbereich rollt die Seite nie; ohne
  // Tastatur und ohne Feld mit Fokus zurück auf 0, sonst stünde die App 62 px tiefer, als Safari die Antippflächen rechnet (Designrichtlinie 13).
  // Ohne Rollbereich (iPhone-Startliste) ebenso, wenn die Seite gar nicht rollen kann
  randOben();
  drehRestWeg();
  // APD-115/N-11 (Messung 07.11.2026): beim Schließen der Tastatur setzt Safari scrollY sofort auf 0, meldet offsetTop aber noch bis zu 400 ms
  // alt (iPhone) – mit Rollbereich ist scrollY nur Safaris Verschiebung, darum zählt der kleinere Wert
  const top = vv ? Math.max(0, scrollView.el ? Math.min(vv.offsetTop, scrollY) : vv.offsetTop) : 0;
  const h = vv ? vv.height : innerHeight;
  const full = isPhone();
  const root = document.documentElement.style;
  const dTop = top - (placeDialogs.top ?? top); placeDialogs.top = top;
  root.setProperty('--vv-top', top + 'px');
  // APD-28 (B1): der Rahmen ist so hoch wie der sichtbare Bereich und endet über der Tastatur.
  root.setProperty('--vv-h', Math.round(h) + 'px');
  // Abstand der Tastatur vom unteren Rand: die untere Leiste (iPhone) und die Kapsel bleiben darüber sichtbar.
  root.setProperty('--vv-bottom', Math.max(0, Math.round(seitenHoehe() - top - h)) + 'px');
  // iPad-Fenster (seit 4.29.0, 3 APD-63/S-6): oben und unten mindestens 10 px, aber nie unter Statusleiste oder Home-Leiste
  // (bei offener Tastatur liegt die Home-Leiste unter ihr)
  const s = safeRand(), oben = Math.max(10, s.top), unten = Math.max(10, kbOffen() ? 0 : s.bottom);
  // R-4.6 (seit 4.32.0): im iPhone-Aufbau ist das Fenster ein Blatt – es beginnt knapp unter der Statusleiste (blattOben)
  const blatt = full ? blattOben() : 0;
  const max = full ? h - blatt : h - oben - unten;
  root.setProperty('--dlg-max', Math.max(200, !full && dlgFest ? Math.min(max, dlgFest) : max) + 'px');
  // Die Meldung (#msg, AD-Bean alert) stellt sich seit 4.70.2 (P-124/F-1) selbst (layout(): Breite, Höhe, Lage) – hier nur das Fenster (#dlg)
  [dlg].forEach(d => {
    if (!d.open) return;
    // iPhone: das Blatt reicht bis zum unteren Rand des sichtbaren Bereichs (bei offener Tastatur bis zur Tastatur, R-4.5).
    if (full && d === dlg) { d.style.margin = '0'; d.style.bottom = 'auto'; d.style.top = Math.round(top + blatt) + 'px'; return; }
    // Fenster im sichtbaren Bereich zentrieren (bei offener Tastatur oberhalb der Tastatur). Seit 4.28.1 (APD-36): steht es dort
    // schon ganz, bleibt es stehen – auch nach dem Schließen der Tastatur, solange ein Feld darin den Fokus hat.
    d.style.margin = '0 auto';
    d.style.bottom = 'auto';
    // APD-115/N-11: eine Verschiebung durch Safari (offsetTop ändert sich) gleicht das Fenster im selben Augenblick aus – gleiten (.gleitet) nur
    // für den Rest (Tastatur auf und zu); sonst springt es erst mit Safari weg und gleitet dann zurück
    if (dTop && d.style.top) { const g = d.classList.contains('gleitet'); d.classList.remove('gleitet');
      d.style.top = Math.round(parseFloat(d.style.top) + dTop) + 'px'; void d.offsetHeight; if (g) d.classList.add('gleitet'); }
    const jetzt = parseFloat(d.style.top), ganz = jetzt >= top + oben - 1 && jetzt + d.offsetHeight <= top + h - unten + 1;
    if (ganz && (kbOffen() || d.contains(document.activeElement) && document.activeElement.matches(FELD))) return;
    d.style.top = Math.round(top + oben + Math.max(0, (h - oben - unten - d.offsetHeight) / 2)) + 'px';
  });
  alertLayouts.forEach(layout => layout());
}
placeDialogs();   // --vv-h (Höhe des Rahmens, APD-28) gleich beim Start
// Seit 4.9.1 (R-4.5): wächst ein Fenster nach dem Öffnen (Inhalt, Textfelder), wird es neu platziert –
// es ragt nie über den Bildschirm hinaus.
if (window.ResizeObserver) new ResizeObserver(() => { if (dlg.open) placeDialogs(); }).observe(dlg);   // #msg: eigener ResizeObserver der AD-Bean alert (seit 4.70.2)

// R-4.5 Tastatur ohne Springen (seit 4.28.1, APD-36, Testfall-Liste arbeit/APD-36 Testfall-Liste.md Abschnitt 8, Muster 9 am Gerät 10 von 10 still).
// Safari verschiebt den sichtbaren Bereich (und mit ihm alle Leisten), wenn das Feld beim Fokus unter der künftigen Tastatur liegt,
// und liest diese Lage beim Fokus, bevor die App etwas tun kann (Designrichtlinie 13, APD-36/S-1, APD-36/S-7). Deshalb:
// - Die Berührung bleibt bei Safari. Sobald ein Feld den Fokus hat (focusin), rollt sein Bereich (Inhalt bzw. Fenster) es in die obere
//   Hälfte des künftig sichtbaren Bereichs; ist die Tastatur noch zu, bekommt es danach sofort einen neuen Fokus (blur + focus, noch
//   in der Berührung) – Safari liest die Lage dann neu und verschiebt nichts (APD-36/S-8). Bei offener Tastatur (Feld wechseln) kein neuer
//   Fokus: die Tastatur würde flackern. Die Ereignisse des neuen Fokus sieht die App nicht (sonst z. B. ‚Pflichtfeld‘ beim ersten Antippen).
// - Der Klick, den Safari danach an derselben Stelle auslöst, trifft dort jetzt etwas anderes – er wird unterdrückt.
// - Safari stellt den Inhalt beim Erscheinen der Tastatur auf den Stand vor dem Rollen zurück (APD-36/S-9, nur im Inhalt): die App rollt ihn
//   im scroll-Ereignis sofort wieder hin (Rückstellung, solange das Feld den Fokus hat, höchstens 1,5 s; Wischen beendet sie).
// - Platz unter dem Inhalt: beim Antippen so viel wie nötig, bei jeder Meldung von Safari genau so viel, dass der Rollstand bleibt;
//   nach dem Schließen der Tastatur schrumpft er beim Rollen wieder (nur der Platz, nie scrollTop – das bräche das sanfte Rollen ab).
// - Die Tastaturhöhe vor dem ersten Öffnen ist geschätzt (am Gerät gemessen) und wird je Gerät, Lage und Tastaturart gemerkt.
// Nur bei Berührung oder offener Tastatur – am Rechner mit Maus rollt nichts vorab.
const SCHAETZUNG = { 'iPhone hoch text': 403, 'iPhone hoch ziffern': 376, 'iPhone quer text': 276, 'iPhone quer ziffern': 232,
  'iPad quer text': 428, 'iPad quer ziffern': 428, 'iPad hoch text': 340, 'iPad hoch ziffern': 340 };
const KB_SPEICHER = 'appdesign.tastatur';
let kbGemerkt = {}; try { kbGemerkt = JSON.parse(localStorage.getItem(KB_SPEICHER) || '{}') || {}; } catch {}
const kbSchluessel = f => `${Math.min(screen.width, screen.height) < 500 ? 'iPhone' : 'iPad'} ${innerWidth > seitenHoehe() ? 'quer' : 'hoch'} ${
  /^(decimal|numeric)$/.test(f.getAttribute('inputmode') || '') ? 'ziffern' : 'text'}`;
const kbHoehe = f => kbGemerkt[kbSchluessel(f)] ?? SCHAETZUNG[kbSchluessel(f)] ?? Math.round(seitenHoehe() / 2);
function kbMerken(f) {
  const k = kbSchluessel(f), h = Math.round(seitenHoehe() - visualViewport.height);
  if (kbGemerkt[k] === h) return;
  kbGemerkt[k] = h;
  try { localStorage.setItem(KB_SPEICHER, JSON.stringify(kbGemerkt)); } catch {}
}
const behaelter = f => f.closest('.dlg-body, #app > .rolle');
// Platz unter dem Inhalt: --platz verlängert den Platzhalter am Ende (::after, design.css) – ein Innenabstand machte den Bereich selbst
// höher als seinen Platz (APD-33)
const platzVon = c => parseFloat(c?.style.getPropertyValue('--platz')) || 0;
const reserveSpace = (c, px) => { c.style.setProperty('--platz', Math.max(0, Math.ceil(px)) + 'px'); };
// genau so viel Platz, dass der Rollstand bleibt
function knapp(c) {
  const y = c.scrollTop;
  reserveSpace(c, y + c.clientHeight - (c.scrollHeight - platzVon(c)));
  c.scrollTop = y;
}
// rollen, notfalls mit Platz darunter
function scrollBy(c, d) {
  d = Math.round(d);
  if (!d) return;
  const fehlt = c.scrollTop + d - (c.scrollHeight - c.clientHeight);
  if (fehlt > 0) reserveSpace(c, platzVon(c) + fehlt);
  c.scrollTop += d;
}
// seit 4.32.2 (APD-73, P-69/3 quer): wie weit Fokus-Umrandung und Schatten des Felds über seine Oberkante reichen (berechneter Stil) –
// so viel Abstand hält es zum oberen Rand seines Bereichs, sonst schneidet der Rollbereich sie ab (Reiselogbuch: Schatten 25 px)
function fokusRand(f) {
  const c = getComputedStyle(f);
  let n = c.outlineStyle !== 'none' ? (parseFloat(c.outlineWidth) || 0) + (parseFloat(c.outlineOffset) || 0) : 0;
  for (const s of c.boxShadow === 'none' ? [] : c.boxShadow.replace(/\([^)]*\)/g, '').split(',')) {
    if (/inset/.test(s)) continue;
    const [, y = 0, blur = 0, spread = 0] = (s.match(/-?[\d.]+px/g) || []).map(parseFloat);
    n = Math.max(n, blur + spread - y);
  }
  return Math.ceil(n);
}
// ---------- Seit 4.56.0 (APD-115/V-3, R-4.5): wie Apple nur so weit rollen, dass das Feld über der Tastatur liegt ----------
// - einzeilig bzw. passt das Feld ganz: es endet 16 px über der Tastatur (im Inhalt 28 px – Safari verschiebt sonst, APD-36/S-5 ABSTAND 24);
// - mehrzeilig und zu hoch: die Zeile mit dem Cursor und eine halbe Zeile darunter (beim Aktivieren die letzte, R-5.11 – seit 4.57.0, APD-126/W-6);
// - Feld wechseln bei offener Tastatur genauso (ganz sichtbar: nichts) – den Fokus setzt ui.js dann selbst (APD-115/W-4, unten bei ‚touchend‘);
// - nie höher als Umrandung und Schatten unter dem oberen Rand des Bereichs (fokusRand). ≤ 0: nichts rollen.
const zeilenHoehe = f => { const s = getComputedStyle(f), lh = parseFloat(s.lineHeight); return Number.isFinite(lh) ? lh : parseFloat(s.fontSize) * 1.45; };
// Zeile mit dem Cursor (Bildschirm): Spiegel mit dem Text bis zum Cursor
function cursorZeile(f, y) {
  const r = f.getBoundingClientRect(), s = getComputedStyle(f), lh = zeilenHoehe(f), pt = parseFloat(s.paddingTop) + parseFloat(s.borderTopWidth);
  if (y != null && y >= r.top && y <= r.bottom) {
    const n = Math.max(0, Math.floor((y - r.top - pt) / lh));
    return { top: r.top + pt + n * lh, bottom: r.top + pt + (n + 1) * lh, lh };
  }
  const m = document.createElement('div');
  for (const k of ['boxSizing', 'width', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle', 'textIndent', 'wordSpacing', 'tabSize']) m.style[k] = s[k];
  Object.assign(m.style, { position: 'absolute', visibility: 'hidden', top: '0', left: '-9999px', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', height: 'auto' });
  m.textContent = f.value.slice(0, f.selectionEnd ?? f.value.length);
  const mark = document.createElement('span'); mark.textContent = '\u200b'; m.appendChild(mark);
  document.body.appendChild(m);
  const top = r.top + parseFloat(s.borderTopWidth) + mark.offsetTop - f.scrollTop;
  m.remove();
  return { top, bottom: top + lh, lh };
}
function noetig(f, c) {
  const offen = kbOffen(), kb = offen ? seitenHoehe() - visualViewport.height : kbHoehe(f), sichtbar = seitenHoehe() - kb;
  const r = f.getBoundingClientRect(), b = c.getBoundingClientRect(), rand = Math.max(4, fokusRand(f)), d = c.closest('dialog');
  const abstand = d ? 16 : 28;
  // iPad-Fenster: es gleitet mit der Tastatur in die Mitte darüber (placeDialogs) – zählt dort; Safari liest die Lage aber jetzt (APD-36/S-7)
  let dy = 0, untenNachher = Math.min(sichtbar, b.bottom);
  if (d && !isPhone() && !offen) {
    const s = safeRand(), o = Math.max(10, s.top), dr = d.getBoundingClientRect(), dh = Math.min(d.offsetHeight, sichtbar - o - 10);   // placeDialogs: unten 10 px bei offener Tastatur
    const neu = o + Math.max(0, (sichtbar - o - 10 - dh) / 2);
    dy = neu - dr.top; untenNachher = Math.min(sichtbar, neu + dh - (dr.bottom - b.bottom));
  }
  const oben = b.top + dy + rand, unten = untenNachher - abstand, jetzt = Math.min(sichtbar, b.bottom) - (d ? 0 : abstand);
  let n;
  if (f.tagName === 'TEXTAREA' && r.height > unten - oben) {
    const z = cursorZeile(f);   // seit 4.57.0 (APD-126/W-6): beim Aktivieren die letzte Zeile – der Cursor steht am Ende (R-5.11)
    n = Math.min(z.bottom + z.lh / 2 + dy - unten, z.top + dy - oben);
  } else if (r.height > unten - oben) n = r.top + dy - oben;
  else n = Math.max(r.bottom + dy - unten, r.bottom - jetzt);
  return n;
}
// Feld ganz über der Tastatur (R-4.5, seit 4.28.0): 16 px darüber; reicht der Platz nicht, oben unter Kopf- bzw. Suchzeile mit Platz für
// Umrandung und Schatten (seit 4.32.2, fokusRand).
// Rahmen und Fenster enden über der Tastatur – Feld und Bereich werden gegeneinander gemessen (Safari wie Chromium). Gleitet das
// iPad-Fenster noch, zählt seine neue Lage.
function feldZeigen(f) {
  const c = behaelter(f);
  if (!c) return;
  const d = f.closest('dialog'), dy = d && !isPhone() ? (parseFloat(d.style.top) || 0) - d.getBoundingClientRect().top : 0;
  const r = f.getBoundingClientRect(), b = c.getBoundingClientRect(), oben = b.top + dy, unten = b.bottom + dy - 16, ro = r.top + dy, ru = r.bottom + dy;
  const rand = fokusRand(f);
  if (f.tagName === 'TEXTAREA' && r.height > unten - oben - rand) {
    // APD-115 V-3: mehrzeilig, passt nicht ganz – die Zeile mit dem Cursor und eine halbe Zeile darunter über der Tastatur
    const z = cursorZeile(f), zo = z.top + dy, zu = z.bottom + z.lh / 2 + dy, u = Math.min(unten, visualViewport.offsetTop + visualViewport.height - 16);
    if (zu > u) scrollBy(c, zu - u); else if (zo < oben + rand) scrollBy(c, zo - oben - rand);
  }
  else if (r.height > unten - oben - rand) { if (Math.abs(ro - oben - rand) > 1) scrollBy(c, ro - oben - rand); }
  else if (ru > unten) scrollBy(c, ru - unten);
  else if (ro < oben + rand) scrollBy(c, ro - oben - Math.max(16, rand));
}
let tap = null, neuFokus = false, touchedAt = -1e9, scrolled = null, fieldHold = null, kbWar = false, nachKb = null;
// die Ereignisse des neuen Fokus nicht an die App weitergeben (Safari-Modell und Safari selbst lesen die Lage vorher, auf window)
['focusout', 'blur', 'focusin', 'focus'].forEach(t => document.addEventListener(t, e => { if (neuFokus) e.stopImmediatePropagation(); }, true));
// jede neue Berührung bzw. jeder Klick mit Maus oder Trackpad beginnt hier (pointerdown kommt vor dem Fokus) – erst der Klick derselben
// Berührung, die das Feld fokussiert hat, wird unterdrückt
addEventListener('touchstart', e => { touchedAt = performance.now(); scrolled = null; fieldHold = null; tap = { y: e.touches?.[0]?.clientY, t: touchedAt }; }, { capture: true, passive: true });
addEventListener('pointerdown', e => { scrolled = null; fieldHold = null; if (e.pointerType !== 'touch') tap = { y: e.clientY, t: performance.now() }; }, { capture: true, passive: true });
addEventListener('touchend', e => {
  if (!kbOffen() || e.changedTouches?.length !== 1 || !tap || performance.now() - tap.t > 800) return;
  const f = e.target.closest?.(FELD), t = e.changedTouches[0];
  if (!f || f === document.activeElement || Math.abs(t.clientY - tap.y) > 10) return;   // nur Antippen, kein Rollen
  if (!behaelter(f)) return;
  e.preventDefault(); f.focus({ preventScroll: true }); measureLine(`W-4 ${messId(f)} Fokus selbst`);
}, { capture: true, passive: false });
addEventListener('focusout', () => { if (!neuFokus) fieldHold = null; }, true);
document.addEventListener('focusin', e => {
  const f = e.target;
  if (!f.matches?.(FELD) || !kbOffen() && performance.now() - touchedAt > 1500) return;
  const c = behaelter(f);
  if (!c) return;
  const n = noetig(f, c);
  measureLine(`V-3 ${messId(f)} rollt ${Math.round(n)}`);
  if (n <= 0) return;
  if (c.closest('dialog') === dlg && !isPhone() && !dlgFest) { dlgFest = Math.round(dlg.offsetHeight); placeDialogs(); }
  reserveSpace(c, seitenHoehe());   // reichlich – gleich danach wieder knapp
  c.scrollTop += n;
  knapp(c);
  scrolled = { f, t: performance.now() };
  fieldHold = { f, c, y: c.scrollTop, bis: performance.now() + 1500 };
  if (kbOffen()) return;
  neuFokus = true;
  try { f.blur(); f.focus({ preventScroll: true }); } finally { neuFokus = false; }
  measureLine(`neu fokussiert ${messId(f)}${document.activeElement === f ? '' : ' Fokus weg'}`);
}, true);
addEventListener('click', e => {
  const g = scrolled;
  scrolled = null;
  if (!g || performance.now() - g.t > 1000 || g.f.contains(e.target)) return;
  e.preventDefault(); e.stopImmediatePropagation();
  measureLine(`klick unterdrückt ${messId(e.target)} (Feld ${messId(g.f)})`);
}, true);
// Rückstellung (APD-36/S-9) und Platz schrumpft (nach dem Schließen der Tastatur, ohne Feld mit Fokus im Bereich)
addEventListener('scroll', e => {
  const c = e.target, h = fieldHold;
  if (h && c === h.c) {
    if (performance.now() > h.bis || document.activeElement !== h.f) fieldHold = null;
    else if (c.scrollTop < h.y - 20) { const alt = Math.round(c.scrollTop); c.scrollTop = h.y; measureLine(`zurückgestellt ${messId(h.f)} ${alt} → ${Math.round(c.scrollTop)}`); return; }
  }
  if (!c.style?.getPropertyValue('--platz') || !c.matches?.('.dlg-body, #app > .rolle') || kbOffen() || c.contains(document.activeElement)) return;
  const pad = platzVon(c), n = Math.ceil(c.scrollTop + c.clientHeight - (c.scrollHeight - pad));
  if (n <= 0) {
    c.style.removeProperty('--platz');
    measureLine(`platz weg ${messId(c)}`);
    if (dlgFest && c.closest('dialog') === dlg) { dlgFest = 0; placeDialogs(); }
  } else if (n < pad) reserveSpace(c, n);
}, { capture: true, passive: true });
document.addEventListener('input', e => {
  const f = e.target;
  if (f.tagName !== 'TEXTAREA' || !kbOffen() || document.activeElement !== f) return;
  requestAnimationFrame(() => { const c = behaelter(f); if (!c) return;
    const d = f.closest('dialog'), dy = d && !isPhone() ? (parseFloat(d.style.top) || 0) - d.getBoundingClientRect().top : 0;
    const b = c.getBoundingClientRect(), unten = Math.min(b.bottom + dy, visualViewport.offsetTop + visualViewport.height) - 16, z = cursorZeile(f), zu = z.bottom + z.lh / 2 + dy;
    if (zu > unten) { scrollBy(c, zu - unten); measureLine(`V-3 Cursor ${messId(f)} ${Math.round(zu - unten)}`); } });
});
// Jede Meldung von Safari (Tastatur auf und zu, sichtbarer Bereich verschoben): Rahmen und Fenster neu stellen, ohne dass ein Inhalt
// rutscht – vor dem Wachsen des Rahmens Platz geben, sonst kürzt der Browser den Rollstand. Das iPad-Fenster gleitet mit (R-1.12).
// Schließt die Tastatur (iPad: Tastatur-Taste), gibt das Feld den Fokus ab – erneutes Antippen ist dann ein gewöhnliches.
function viewportResized() {
  const cs = [scrollView.el, dlg.open ? dlg.querySelector('.dlg-body') : null].filter(Boolean), y = cs.map(c => c.scrollTop);
  const offen = kbOffen(), f = document.activeElement, feld = f?.matches?.(FELD) ? f : null;
  // R-1.12 (seit 4.57.0, APD-127/B-2): hoch (Tastatur auf) mit der Feder 0,5 s, runter (.runter, Tastatur zu) ease-in-out 0,25 s (design.css)
  if (dlg.open && !isPhone()) { dlg.classList.add('gleitet'); dlg.classList.toggle('runter', !offen); clearTimeout(viewportResized.t); viewportResized.t = setTimeout(() => dlg.classList.remove('gleitet', 'runter'), GLEIT_AUF_MS + 50); }
  // APD-115/N-13: wächst der Rahmen (Tastatur geht zu), bekommt jeder Rollbereich vorher Platz – sonst nur, wo schon Platz steht; Platz bei jeder
  // Meldung bräche das sanfte Rollen ab (‚Nach oben‘ bei offener Tastatur, APD-36/B-8)
  const waechst = kbWar && !offen, mit = cs.map(c => waechst || platzVon(c) > 0);
  cs.forEach((c, i) => { if (mit[i]) reserveSpace(c, 2000); });
  placeDialogs();
  cs.forEach((c, i) => { if (mit[i]) { c.scrollTop = y[i]; knapp(c); } });
  if (offen && feld) { kbMerken(feld); feldZeigen(feld); }
  if (kbWar && !offen) {
    if (feld) feld.blur();
    if (nachKb) { const fn = nachKb; nachKb = null; fn(); }
  }
  kbWar = offen;
}
if (window.visualViewport) ['resize', 'scroll'].forEach(t => visualViewport.addEventListener(t, viewportResized));
// APD-115/N-11: beim Schließen kommt Safaris ‚scroll‘ der Seite (scrollY 0) bis zu 400 ms vor ‚vv resize‘ – mit Rollbereich sofort neu stellen
addEventListener('scroll', e => { if (scrollView.el && (e.target === document || e.target === window) && Math.max(0, scrollY) !== placeDialogs.top) viewportResized(); }, { passive: true });
// Seit 4.28.1 (APD-36, 6n): ‚Nach oben / Ans Ende‘ bei offener Tastatur – das Antippen schließt die Tastatur; gerollt wird erst danach
// (sonst bricht der Ausgleich beim Schließen das sanfte Rollen ab und es braucht ein zweites Antippen), spätestens nach 600 ms.
function nachTastatur(fn) {
  if (!kbOffen()) return fn();
  nachKb = fn;
  setTimeout(() => { if (nachKb === fn) { nachKb = null; fn(); } }, 600);
}

/* ---------- AD-Bean presentation: Stapel (seit 5.0.0, APD-149, R-1.4, R-1.8, R-3.3, R-4.1, R-4.13, R-8.1, R-1.13) ---------- */

// Alles, was erscheint und wieder geht – Fenster, Hinweisfenster, Menü, Untermenü, Sprechblase, laufende Aktion –, liegt auf einem Stapel
// (arbeit/APD-149 Grobentwurf V-3.md 2.2, Muster im Bean-Katalog bis 5.0.0). Die App sagt nur present(…) und dismiss(); Tönung der Quelle
// (sourcehighlight), aria-expanded, Mehr-Icon, Sperre (R-1.4, mit Durchlass in der Kopfzeile), Escape, Fokus und Lage leitet die Bean nach jeder
// Änderung und jedem Neuaufbau selbst ab (derive). Grundsätze H-1 bis H-9: nur ein Menü bzw. eine Sprechblase (H-1), Untermenü eine Ebene (H-2),
// ein Fenster (H-3), Hinweisfenster in einer Warteschlange (H-4), Menü schließt vor Fenster und Hinweis daraus (H-5), Durchlass (H-6, APD-149/J-3),
// nur eine laufende Aktion (H-8), shouldDismiss vor jedem Schließen durch den Nutzer – Escape, Ziehen nach unten, x (H-9).
// Die Navigation (Ebenen mit ‹, navPush/navPop) ist kein Eintrag im Stapel; vor jedem Ebenenwechsel leert sie ihn (APD-149/J-7, S-17).
// ui.js legt die eine Bean für die Seite an (AD.presentation). Prüfung: tests/presentation.mjs (APD-149/S-1 bis S-18, L-1 bis L-4).
const PRESENTATION_KINDS = ['sheet', 'alert', 'menu', 'submenu', 'popover', 'activity'];
const PRESENTATION_MENUS = new Set(['menu', 'submenu']), PRESENTATION_EXPANDS = new Set(['menu', 'submenu', 'popover']);
const presentationEmit = (set, data) => set.forEach(fn => { try { fn(data); } catch (e) { console.error(e); } });
const presentationListen = set => fn => { if (typeof fn !== 'function') return () => {}; set.add(fn); return () => { set.delete(fn); }; };
function createPresentation(root = document.body) {
  const stack = [], queue = [], listeners = { change: new Set(), reject: new Set() };
  let unlock = null, sheetEntry = null, focusTarget = null;

  // Quelle über die Kennung (data-command) bzw. sourceItem – nach jedem Neuaufbau neu gesucht (APD-150)
  const sourceFinder = (command, sourceItem) => () => {
    if (sourceItem instanceof Element) return sourceItem.isConnected ? sourceItem : wiederFinden(sourceItem);
    if (typeof sourceItem === 'string' && sourceItem) return root.querySelector(sourceItem);
    return command ? root.querySelector(`[data-command="${CSS.escape(command)}"]`) : null;
  };
  const isShown = el => !!el?.isConnected && el.getClientRects().length > 0;
  const notifyChange = () => presentationEmit(listeners.change, { stack: stack.map(h => h.kind) });

  // Folgen aus dem Stapel: Tönung, aria-expanded, Mehr-Icon, Sperre und Lage – nach jeder Änderung und jedem Neuaufbau
  function derive() {
    for (const h of stack) {
      const el = h.find();
      if (el !== h.source) { if (h.source) releaseSource(h); h.source = el; }
      if (!el) continue;
      highlightSource(h, el);
    }
    root.querySelectorAll('[data-ad-presentation-source][aria-expanded="true"]').forEach(x => {
      if (!stack.some(h => h.source === x && PRESENTATION_EXPANDS.has(h.kind))) { x.setAttribute('aria-expanded', 'false'); toggleMore(x, false); }
    });
    // ein Menü ohne Schaltfläche schließt (wie openMenu, R-8.1)
    for (const h of stack.filter(h => PRESENTATION_MENUS.has(h.kind) && !isShown(h.source))) remove(h, 'app');
    lockOthers();
    layout();
  }
  function highlightSource(h, el) {
    sourcehighlight.hold(el);
    el.dataset.adPresentationSource = '';
    if (PRESENTATION_MENUS.has(h.kind)) el.setAttribute('aria-haspopup', 'menu');   // R-1.8: auch eine Kachel mit Kontextmenü sagt ‚öffnet Menü‘
    if (PRESENTATION_EXPANDS.has(h.kind)) el.setAttribute('aria-expanded', 'true');
    if (h.kind === 'menu') toggleMore(el, true);
  }
  function releaseSource(h) {
    const el = h.source; if (!el) return;
    sourcehighlight.release(el);
    if (stack.some(o => o !== h && o.source === el)) return;
    if (PRESENTATION_EXPANDS.has(h.kind)) el.setAttribute('aria-expanded', 'false');
    if (h.kind === 'menu') toggleMore(el, false);
  }
  // Mehr-Icon (R-4.1) nur bei Wechsel setzen – sonst meldet der MutationObserver den eigenen Tausch immer wieder
  function toggleMore(el, open) { const s = el.querySelector(':scope > svg[data-mehr]'); if (s && s.dataset.adOpen !== String(open)) { s.dataset.adOpen = String(open); mehrKippen(el, open); } }

  // Sperre bei offenem Menü (R-1.4): alles inert außer Menüs, Ebene und der Kopfzeile der Quelle ([data-ad-toolbar]) – Durchlass (H-6, APD-149/J-3, J-5)
  function lockOthers() {
    unlock?.(); unlock = null;
    const menu = stack.find(h => h.kind === 'menu');
    if (!menu) return;
    const free = [menu.layer, ...stack.filter(h => PRESENTATION_MENUS.has(h.kind)).map(h => h.el)];
    const bar = menu.source?.closest('[data-ad-toolbar]');
    if (bar) free.push(bar);
    const path = new Set(); free.forEach(f => { for (let e = f; e && e !== menu.host.parentNode; e = e.parentElement) path.add(e); });
    const locked = [];
    path.forEach(e => { if (free.includes(e)) return; for (const c of e.children) if (!path.has(c) && !c.inert && !/^(SCRIPT|STYLE)$/.test(c.tagName)) { c.inert = true; locked.push(c); } });
    unlock = () => locked.forEach(c => { c.inert = false; });
  }
  // Lage: eine layout() für alle Arten im Stapel; Fenster und Hinweisfenster legt ui.js selbst (placeDialogs, alert)
  function layout() {
    for (const h of stack) {
      if (h.kind === 'menu' && h.source) { placeAt(h.el, h.source, h.align); cutOut(h); }
      if (h.kind === 'submenu' && h.source) placeSubmenu(h);
    }
  }
  // Die Ebene deckt die Kopfzeile der Quelle nicht ab (H-6): ein Loch über ihr (clip-path wirkt auch auf das Antippen). Außerhalb schluckt die
  // Ebene den Klick nach dem Schließen weiter (blockingLayer, klickVerschlucken – Safari gibt ihn sonst an die Seite darunter).
  function cutOut(h) {
    const bar = h.source.closest('[data-ad-toolbar]');
    if (!bar) { h.layer.style.clipPath = ''; return; }
    const r = bar.getBoundingClientRect(), W = innerWidth, H = innerHeight;
    h.layer.style.clipPath = `polygon(evenodd, 0 0, ${W}px 0, ${W}px ${H}px, 0 ${H}px, 0 0, ${r.left}px ${r.top}px, ${r.left}px ${r.bottom}px, ${r.right}px ${r.bottom}px, ${r.right}px ${r.top}px, ${r.left}px ${r.top}px)`;
  }
  // Untermenü neben dem Menü, oben bündig mit seinem Eintrag (wie openMenu)
  function placeSubmenu(h) {
    const s = h.el, m = h.parent.el, b = h.source;
    s.style.maxHeight = ''; s.style.overflowY = '';
    const { L, R, T, B } = popoverMargins(), room = innerHeight - T - B;
    if (s.scrollHeight > room) { s.style.maxHeight = room + 'px'; s.style.overflowY = 'auto'; }
    const growing = m.getAnimations?.().length, ml = parseFloat(m.style.left), w = s.offsetWidth;
    const mr = growing ? { left: ml, right: ml + m.offsetWidth } : m.getBoundingClientRect();
    const top = growing ? parseFloat(m.style.top) + m.clientTop + b.offsetTop - m.scrollTop : b.getBoundingClientRect().top;
    s.style.left = Math.max(L, mr.left - w - 8 >= L ? mr.left - w - 8 : Math.min(mr.right + 8, innerWidth - w - R)) + 'px';
    s.style.top = Math.max(T, Math.min(top, innerHeight - s.offsetHeight - B)) + 'px';
  }

  // Menü bzw. Untermenü aus Einträgen (Befehle über commands.items, Format wie openMenu)
  function renderMenu(h, items) {
    const host = h.host;
    h.items = items;
    const el = h.el || document.createElement('div');
    el.className = h.kind === 'submenu' ? 'menu submenu' : 'menu' + (h.align === 'beside' ? ' kontext' : '');
    el.setAttribute('role', 'menu');
    const name = h.kind === 'submenu' ? h.label : h.source?.getAttribute('aria-label') || h.source?.textContent.trim();
    if (name) el.setAttribute('aria-label', name);
    el.innerHTML = menuHtml(items);
    el.querySelectorAll('[data-i]').forEach(b => b.onclick = () => choose(h, items[b.dataset.i], b));
    if (!h.el) {
      h.el = el;
      if (h.kind === 'menu') { h.layer = blockingLayer(() => requestDismiss(h)); host.append(h.layer); }
      host.append(el);
    }
  }
  // Neu füllen bei offenem Menü (revalidate): ein offenes Untermenü bleibt offen und bekommt seine neuen Einträge, Quelle ist der neue Eintrag
  // gleichen Namens; der Fokus bleibt auf dem Eintrag an derselben Stelle (APD-149/S-16)
  function rerenderMenu(h, items) {
    const a = document.activeElement, at = a?.closest?.('.menu'), place = at ? [...at.querySelectorAll('.mi')].indexOf(a) : -1;
    renderMenu(h, items);
    for (const o of stack.filter(o => o.kind === 'submenu' && o.parent === h)) {
      const i = items.findIndex(it => it && it.submenu && it.label === o.label);
      if (i < 0) { remove(o, 'parent'); continue; }
      o.find = () => h.el?.querySelector(`.mi[data-i="${i}"]`) || null;
      renderMenu(o, items[i].submenu);
    }
    if (at?.isConnected && place >= 0) focus(at.querySelectorAll('.mi')[place]);
    derive();
  }
  function choose(h, it, b) {
    if ('schalter' in it) { it.schalter = !it.schalter; b.setAttribute('aria-checked', String(it.schalter)); it.act(it.schalter); return; }
    if (it.submenu) {
      const open = stack.find(o => o.kind === 'submenu' && o.parent === h);
      if (open) remove(open, open.source === b ? 'user' : 'replaced', { restoreFocus: open.source === b });
      if (open?.source !== b) bean.present('submenu', it.submenu, { sourceItem: b, label: it.label });
      return;
    }
    // Auswahl: der Befehl läuft, solange das Menü noch offen ist – ein Fenster, Hinweis oder eine Abfrage daraus schließt es (H-5, reason
    // 'replaced') und übernimmt seine Quelle; zeigt der Befehl nichts, schließt das Menü danach (reason 'user', Fokus zurück).
    try { it.act(); } finally { const m = stack.find(o => o.kind === 'menu'); if (m) remove(m, 'user', { restoreFocus: true }); }
  }
  // R-4.7: Tasten für das oberste Menü (über den Tastenstapel von ui.js)
  function keys(e) {
    const h = [...stack].reverse().find(o => PRESENTATION_MENUS.has(o.kind)); if (!h) return;
    if (istAbbruch(e)) { verbrauchen(e); requestDismiss(h); return; }
    const mis = [...h.el.querySelectorAll('.mi:not(:disabled)')]; if (!mis.length) return;
    const i = mis.indexOf(document.activeElement), k = e.key;
    const go = j => { verbrauchen(e); focus(mis[(j + mis.length) % mis.length]); };
    if (k === 'ArrowDown' || (k === 'Tab' && !e.shiftKey)) return go(i + 1);
    if (k === 'ArrowUp' || (k === 'Tab' && e.shiftKey)) return go(i < 0 ? -1 : i - 1);
    if (k === 'Home') return go(0);
    if (k === 'End') return go(-1);
    if (k === 'ArrowLeft' && h.kind === 'submenu') { verbrauchen(e); remove(h, 'user', { restoreFocus: true }); return; }
    if (i >= 0 && ((k === 'ArrowRight' && mis[i].getAttribute('aria-haspopup')) || k === 'Enter' || k === ' ')) { verbrauchen(e); mis[i].click(); }
  }

  // Schließen durch den Nutzer (daneben tippen beim Menü, Escape, x, Ziehen nach unten): vorher shouldDismiss (H-9)
  async function requestDismiss(h) {
    if (!h.open || h.asking) return false;
    if (h.shouldDismiss) {
      h.asking = true;
      let ok = false;
      try { ok = await h.shouldDismiss(); } finally { h.asking = false; }
      if (!ok || !h.open) return false;
    }
    remove(h, 'user', { restoreFocus: true });
    return true;
  }
  function remove(h, reason, { restoreFocus = false } = {}) {
    if (!h.open) { const q = queue.findIndex(x => x[0] === h); if (q >= 0) queue.splice(q, 1); return; }
    for (const o of stack.filter(o => o.parent === h)) remove(o, 'parent');
    h.open = false;
    stack.splice(stack.indexOf(h), 1);
    if (PRESENTATION_MENUS.has(h.kind)) {
      if (h.el.isConnected) schrumpfen(h.el, h.source);
      h.el.remove(); h.layer?.remove();
      tastenStapel.splice(tastenStapel.indexOf(keys) >>> 0, stack.some(o => PRESENTATION_MENUS.has(o.kind)) ? 0 : 1);
      document.querySelectorAll('.side-list[data-padded]').forEach(l => { l.style.paddingBottom = ''; delete l.dataset.padded; });
    }
    if (h.kind === 'popover' && h.pop?.isConnected) tastenStapel.at(-1)?.({ key: 'Escape', preventDefault() {}, stopImmediatePropagation() {} });   // choosePop schließt mit Esc
    // R-1.8: nach Fenster und Hinweisfenster zurück auf die Quelle – nach dem Fokus von ui.js (dessen close-Hörer läuft zuerst)
    if ((h.kind === 'sheet' || h.kind === 'alert') && reason !== 'replaced') focusTarget = h.find();
    if (h.kind === 'sheet') { sheetEntry = null; if (reason !== 'replaced' && dlg.open && !h.closed) dlg.close('cancel'); }
    if (h.kind === 'alert' && !h.closed) alert.close();
    releaseSource(h);
    lockOthers();
    presentationEmit(h.listeners.dismiss, { reason, kind: h.kind });
    if (restoreFocus && PRESENTATION_MENUS.has(h.kind)) fokusZurueck(h.source, h.host);
    if (h.kind === 'alert' && queue.length) { const [q, content, opts] = queue.shift(); show(q, content, opts); }
    notifyChange();
  }

  function createHandle(kind, opts) {
    const h = { kind, command: opts.command || '', open: false, queued: false, source: null, el: null, layer: null, parent: null,
      align: opts.align || 'right', label: opts.label || '', shouldDismiss: opts.shouldDismiss || null, listeners: { dismiss: new Set() },
      dismiss: () => remove(h, 'app'), on: (name, fn) => name === 'dismiss' ? presentationListen(h.listeners.dismiss)(fn) : () => {} };
    h.find = sourceFinder(opts.command, opts.sourceItem);
    return h;
  }
  function show(h, content, opts) {
    h.open = true; h.queued = false;
    stack.push(h);
    h.source = h.find();
    if (h.kind === 'menu' || h.kind === 'submenu') {
      const a = h.find();
      h.host = (h.kind === 'submenu' ? h.parent.host : a?.closest('dialog')) || document.body;
      const cmds = opts.commands || null, place = h.align === 'beside' ? 'context' : 'menu';
      if (typeof content === 'string' && !cmds) console.error(`presentation: Menü ‚${content}‘ ohne commands`);
      if (typeof content === 'string' && cmds) { h.commands = cmds; h.rerender = () => rerenderMenu(h, cmds.items(content, { place })); }
      renderMenu(h, typeof content === 'string' ? (cmds ? cmds.items(content, { place }) : []) : content);
      if (a) { if (h.kind === 'menu') placeAt(h.el, a, h.align); else placeSubmenu(h); wachsen(h.el, a); }
      if (!tastenStapel.includes(keys)) tastenStapel.push(keys);
      focus(h.el.querySelector('.mi:not(:disabled)'));
    } else if (h.kind === 'popover') {
      const a = h.find();
      h.result = choosePop(a, content.message, content.buttons || [{ label: 'Ok', value: true }]).then(v => { if (h.open) remove(h, 'user'); return v; });
      h.pop = [...document.querySelectorAll('.pop')].at(-1);
    } else if (h.kind === 'sheet') {
      sheetEntry = h;
      // H-3 mit Gleiten: das alte Fenster gleitet als Abbild hinaus, das neue gleitet wie beim Öffnen herein; die Abdunkelung bleibt
      const replaced = dlg.open;
      if (replaced) blattGeist();
      openDialog(content, !!opts.wide);
      if (replaced && dlg.open) dlg.animate(bewegungRuhig() ? [{ opacity: 0 }, { opacity: 1 }] : [{ translate: `0 ${Math.round(blattZu())}px` }, { translate: '0 0' }],
        bewegungRuhig() ? { duration: 200, easing: 'ease-out' } : { duration: GLEIT_AUF_MS, easing: GLEIT_FEDER });
      dlgDirty = opts.dirty || null;
      const x = dlg.querySelector('#dlgX');
      if (x) x.onclick = () => requestDismiss(h);   // x, Escape und ⌘. (ui.js drückt dann x) und Ziehen mit Änderungen fragen über shouldDismiss
    } else if (h.kind === 'alert') {
      h.result = alert.showModal(content.title, content.message, { wide: !!content.wide, action: content.action || null })
        .then(() => { h.closed = true; if (h.open) remove(h, 'user'); });
    } else if (h.kind === 'activity') {
      h.result = Promise.resolve().then(content).finally(() => { if (h.open) remove(h, 'app'); });
    }
    derive();
    notifyChange();
    return h;
  }

  const bean = {
    get stack() { return [...stack]; },
    get top() { return stack.at(-1) || null; },
    present(kind, content, opts = {}) {
      if (!PRESENTATION_KINDS.includes(kind)) { console.error(`presentation: unbekannte Art ‚${kind}‘`); return null; }
      const top = stack.at(-1);
      if (kind === 'submenu' && top?.kind !== 'menu') { console.error('presentation: ein Untermenü nur aus einem Menü (H-2)'); return null; }
      if (kind === 'activity' && stack.some(h => h.kind === 'activity')) { presentationEmit(listeners.reject, { kind, command: opts.command || '' }); return null; }   // H-8
      const h = createHandle(kind, opts);
      if (kind === 'submenu') { h.parent = top; h.host = top.host; }
      // H-5: aus einem offenen Menü übernimmt alles außer einem Untermenü bzw. Menü die Quelle des Menüs; Menüs schließen (replaced)
      const menu = stack.find(o => o.kind === 'menu');
      if (menu && kind !== 'submenu') {
        if (kind !== 'menu') { const f = menu.find; h.find = () => f(); h.command ||= menu.command; }
        remove(menu, 'replaced');
      }
      if (opts.from) { const f = opts.from.find; h.find = () => f(); }
      if (kind === 'popover') for (const o of stack.filter(o => o.kind === 'popover')) remove(o, 'replaced');   // H-1
      if (kind === 'sheet') { const old = stack.find(o => o.kind === 'sheet'); if (old) remove(old, 'replaced'); }   // H-3
      if (kind === 'alert' && stack.some(o => o.kind === 'alert')) { h.queued = true; queue.push([h, content, opts]); notifyChange(); return h; }   // H-4
      return show(h, content, opts);
    },
    dismiss(handle = stack.at(-1), { reason = 'app' } = {}) { if (handle) remove(handle, reason, { restoreFocus: reason === 'user' }); },
    refresh() { derive(); },
    on(name, fn) { const s = listeners[name]; return s ? presentationListen(s)(fn) : () => {}; },
  };
  new MutationObserver(() => { if (stack.length) derive(); }).observe(root, { childList: true, subtree: true });
  floating.add(() => { if (stack.length) layout(); });   // Drehen, Größe, Tastatur (R-8.1)
  // Fenster: neben das Fenster tippen schließt nicht (wie am iPad und bei Apple – Schließen über x, Escape und Ziehen nach unten). Schließt ui.js
  // es selbst (Häkchen, Ziehen), ist es zu (reason 'user'). Escape geht an das oberste (Grobentwurf 2.2): beim Fenster über shouldDismiss
  dlg.addEventListener('cancel', e => { if (!sheetEntry) return; e.preventDefault(); if (stack.at(-1) === sheetEntry) requestDismiss(sheetEntry); });
  dlg.addEventListener('close', () => {
    const h = sheetEntry; if (!h?.open) return;
    h.closed = true; remove(h, 'user');
  });
  for (const d of [dlg, msg]) d.addEventListener('close', () => { const z = focusTarget; focusTarget = null; if (z) focus(z); });
  (root === document.body ? document.documentElement : root).dataset.adBean = 'presentation';
  return bean;
}
const presentation = createPresentation(document.body);
// APD-149/J-7 (S-17): vor jedem Ebenenwechsel der Navigation (navPush, navPop) ist der Stapel leer – von oben nach unten geschlossen (reason 'app')
function dismissPresented() { for (const h of [...presentation.stack].reverse()) presentation.dismiss(h); }

/* ---------- AD-Bean commands: Befehle (seit 5.0.0, APD-149, R-3.8, R-4.1, R-4.10, R-4.12, R-7.8, R-1.13) ---------- */

// Die App beschreibt Befehle – was es gibt und wann es möglich ist –, nicht die Schaltflächen (Grobentwurf 2.1; Vorbild UIAction/UICommand,
// validate, UIMenu). Derselbe Befehl erscheint je Ort anders (H-7): im Menü gedimmt, im Kontextmenü und beim Wischen fehlt er, zerstörend
// steht er rot zuletzt. Menüs der Kopfzeile erscheinen über die Bean presentation. Prüfung: tests/presentation.mjs (APD-149/S-14, L-1 bis L-3).
function createCommands({ presentation = null, context = {} } = {}) {
  const commandMap = new Map(), menuMap = new Map(), listeners = { change: new Set(), execute: new Set() }, toolbars = new Set();
  const p = presentation || pagePresentation();
  // Darstellung je Ort (H-7): Menü gedimmt, Kontextmenü und Wischen ohne den Befehl; zerstörend rot und zuletzt
  function itemFor(id, place, ctx) {
    const c = commandMap.get(id); if (!c) { console.error(`commands: unbekannter Befehl ‚${id}‘`); return null; }
    const v = bean.validate(id, ctx);
    if (v.hidden || (!v.enabled && place !== 'menu')) return null;
    const it = { icon: c.icon, label: v.label, act: o => bean.execute(id, o?.sourceView ? { ...ctx, sourceView: o.sourceView } : ctx) };   // Wischen: Kapsel als Quelle
    if (c.role === 'destructive') it.red = true;
    if (!v.enabled) it.disabled = true;
    if (v.state != null) it.tick = v.state === 'on';
    if (place === 'swipe') it.shortTitle = c.shortTitle || c.label;
    return it;
  }
  function groupItems(g, place, ctx) {
    if (typeof g === 'string') return [itemFor(g, place, ctx)].filter(Boolean);
    if (Array.isArray(g)) return g.map(x => itemFor(x, place, ctx)).filter(Boolean);
    if (g?.children) {   // Untermenü, eine Ebene (H-2); singleSelection: Häkchen am gewählten, sein Name rechts
      const children = g.children.map(x => itemFor(x, place, ctx)).filter(Boolean);
      if (!children.length) return [];
      const selected = g.singleSelection ? children.find(k => k.tick) : null;
      return place === 'menu' ? [{ icon: g.icon, label: g.title, value: selected?.label || '', submenu: children }] : children;
    }
    return [];
  }
  const bean = {
    context,
    presentation: p,
    get ids() { return [...commandMap.keys()]; },
    add(c) {
      if (!c?.id || commandMap.has(c.id)) { console.error(`commands: Kennung ‚${c?.id}‘ fehlt oder kommt doppelt vor`); return bean; }
      commandMap.set(c.id, c); return bean;
    },
    menu(id, children, { label = '', icon = 'ellipsis' } = {}) { menuMap.set(id, { children, label, icon }); return bean; },
    validate(id, ctx = bean.context) {
      const c = commandMap.get(id);
      if (!c) return { enabled: false, hidden: true, state: null, label: id };
      return { enabled: true, hidden: false, state: null, label: c.label, ...(c.validate?.(ctx) || {}) };
    },
    execute(id, ctx = bean.context) {
      const c = commandMap.get(id), v = bean.validate(id, ctx);
      if (!c || !v.enabled || v.hidden) return false;
      presentationEmit(listeners.execute, { id });
      c.execute?.(ctx);
      return true;
    },
    // Neu fragen: Kopfzeilen neu zeichnen, offene Menüs neu füllen (ein offenes Untermenü bleibt offen, APD-149/S-16)
    revalidate(id = null) {
      toolbars.forEach(z => z());
      for (const h of p.stack) if (h.kind === 'menu' && h.commands === bean) h.rerender?.();
      presentationEmit(listeners.change, { id });
    },
    // Einträge eines Menüs im Format von openMenu; place: menu | context | swipe (H-7); Gruppen durch Abstand getrennt, Zerstörendes zuletzt
    items(menuId, { place = 'menu', ctx = bean.context } = {}) {
      const m = menuMap.get(menuId); if (!m) { console.error(`commands: unbekanntes Menü ‚${menuId}‘`); return []; }
      let groups = m.children.map(g => groupItems(g, place, ctx)).filter(g => g.length);
      if (place !== 'menu') { const red = groups.flat().filter(x => x.red); groups = [...groups.map(g => g.filter(x => !x.red)).filter(g => g.length), ...(red.length ? [red] : [])]; }
      return groups.flatMap((g, i) => i ? ['sep', ...g] : g);
    },
    // Kopfzeile aus Befehlen und Menüs (Grobentwurf 4): Tippen auf ein Menü öffnet bzw. schließt es, auf einen Befehl führt ihn aus – bei offenem
    // Menü schon beim ersten Tipp, das Menü geht dabei zu (Durchlass H-6, APD-149/J-3, R-1.4)
    toolbar(element, ids, { label = 'Kopfzeile' } = {}) {
      const draw = () => {
        if (!element.isConnected) { toolbars.delete(draw); return; }
        element.classList.add('ad-commands-toolbar');
        element.dataset.adToolbar = '';
        element.dataset.adBean = 'commands';
        element.setAttribute('role', 'toolbar');
        element.setAttribute('aria-label', label);
        element.innerHTML = ids.map(id => {
          const m = menuMap.get(id), c = commandMap.get(id), v = m ? { enabled: true } : bean.validate(id);
          if (!m && (!c || v.hidden)) return '';
          const name = m ? m.label : v.label;
          return `<button type="button" class="round" data-command="${esc(id)}" aria-label="${esc(name)}"${m ? ' aria-haspopup="menu" aria-expanded="false"' : ''}${v.enabled ? '' : ' disabled'}>${ic(m ? m.icon : c.icon)}</button>`;
        }).join('');
        element.querySelectorAll('[data-command]').forEach(b => b.onclick = () => {
          const id = b.dataset.command, open = p.stack.find(h => h.kind === 'menu');
          if (menuMap.has(id)) {
            if (open && open.command === id) { p.dismiss(open, { reason: 'user' }); return; }   // eigene Schaltfläche: schließt
            p.present('menu', id, { command: id, commands: bean });   // H-1: ein anderes Menü ersetzt das offene
            return;
          }
          if (open) p.dismiss(open, { reason: 'replaced' });   // J-3: Menü zu, Befehl wirkt beim ersten Tipp
          bean.execute(id);
        });
        p.refresh();
      };
      toolbars.add(draw);
      draw();
      return () => toolbars.delete(draw);
    },
    on(name, fn) { const s = listeners[name]; return s ? presentationListen(s)(fn) : () => {}; },
  };
  return bean;
}
// der Stapel der Seite, wenn die App keinen eigenen übergibt (der Parameter presentation von createCommands verdeckt den Namen)
function pagePresentation() { return presentation; }

/* ---------- Messmodus (seit 4.26.0, APD-27, R-1.6) ---------- */

// Zeichnet am Gerät auf, was Safari beim Rollen und Tippen tut, damit Claude misst statt rät: je Bild eine Zeile, nur wenn
// sich ein Wert geändert hat, dazu jedes Ereignis sofort mit den Werten in diesem Augenblick. Aus, solange nicht gestartet
// (kein requestAnimationFrame, keine Hörer); nichts wird gespeichert (neu laden verwirft die Messung); keine Texte – vom
// Eingabefeld nur die Länge, von Schaltflächen und Fokus nur die id. Endet von selbst nach 5 Minuten oder 20 000 Zeilen.
// Die App setzt measureMenuItems({ app, elements, scrollers }) ins Mehr-Menü der Seitenleiste: elements = { Spalte: Selektor } (Oberkante
// des ersten sichtbaren Elements), scrollers = { Spalte: Selektor } (scrollTop eines eigenen Rollbereichs). Seit 5.0.0 englisch (vorher teile, rollen).
const MEASURE_MAX_MS = 5 * 60e3, MESS_MAX_ZEILEN = 20000;
let measurement = null;
const messSicht = sel => [...document.querySelectorAll(sel)].find(e => e.getClientRects().length);
const messId = e => !e || e === document.body ? '-' : e.id || e.tagName.toLowerCase();
// seit 4.30.1 (APD-67): Ziel einer Berührung ohne Texte – id bzw. Tag mit Klassen und Rolle, dazu das antippbare Element darum
// (‚in …‘) und die nächste id (‚@…‘), z. B. ‚span in div.box.day[button] @app‘
const messKurz = e => e.id || e.tagName.toLowerCase() + [...e.classList].slice(0, 3).map(c => '.' + c).join('') + (e.getAttribute('role') ? `[${e.getAttribute('role')}]` : '');
function messZiel(t) {
  if (!(t instanceof Element)) return '-';
  const tipp = t.closest('button, a, input, textarea, select, label, [role=button], [role=menuitem], [tabindex]'), aussen = tipp || t;
  const id = !aussen.id && aussen.parentElement?.closest('[id]');
  return messKurz(t) + (tipp && tipp !== t ? ' in ' + messKurz(tipp) : '') + (id ? ' @' + id.id : '');
}
function messWerte() {
  const vv = window.visualViewport, r = Math.round, w = {
    sy: r(scrollY), inh: scrollView.el ? r(scrollView.el.scrollTop) : '-', sh: document.documentElement.scrollHeight, ih: innerHeight, vh: vv ? r(vv.height) : '-', vt: vv ? r(vv.offsetTop) : '-',
    vvtop: parseInt(document.documentElement.style.getPropertyValue('--vv-top')) || 0 };
  for (const [k, sel] of Object.entries(measurement.elements)) { const e = messSicht(sel); w[k] = e ? r(e.getBoundingClientRect().top) : '-'; }
  for (const [k, sel] of Object.entries(measurement.scrollers)) { const e = messSicht(sel); w[k] = e ? r(e.scrollTop) : '-'; }
  w.fokus = messId(document.activeElement);
  w.lage = innerWidth > innerHeight ? 'quer' : 'hoch';
  return w;
}
function measureLine(ereignis) {
  if (!measurement?.an) return;
  const t = Math.round(performance.now() - measurement.start), w = messWerte(), werte = Object.values(w).join(' ');
  if (!ereignis && werte === measurement.zuletzt) return;
  measurement.zuletzt = werte;
  measurement.zeilen.push([t, ...Object.values(w)].map(v => String(v).padEnd(6)).join(' ').trimEnd() + (ereignis ? '   ! ' + ereignis : ''));
  if (t > MEASURE_MAX_MS || measurement.zeilen.length >= MESS_MAX_ZEILEN) measureOff('Grenze erreicht');
}
const messEreignis = e => measureLine(e);
function messBild() { if (!measurement?.an) return; measureLine(); measurement.bild = requestAnimationFrame(messBild); }
function measureOff(grund) {
  if (!measurement?.an) return;
  measurement.an = false;
  cancelAnimationFrame(measurement.bild);
  measurement.hoerer.forEach(([z, typ, fn]) => z.removeEventListener(typ, fn, true));
  measurement.zeilen.push(`# Ende nach ${Math.round((performance.now() - measurement.start) / 1000)} s${grund ? ' · ' + grund : ''}`);
}
function measureStart({ app = '', elements = {}, scrollers = {} } = {}) {
  measureOff();
  const st = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  measurement = { an: true, start: performance.now(), beginn: new Date(), elements, scrollers, zeilen: [], zuletzt: '', hoerer: [] };
  measurement.zeilen.push(`# Messung · ${app} · AppDesign ${AD_VERSION} · ${navigator.userAgent} · ${st ? 'Home-Bildschirm' : 'Safari'} · ${screen.width}×${screen.height} @${devicePixelRatio} · ${
    // seit 4.29.0 (3 APD-63/S-8): die sicheren Ränder des Geräts (oben/unten/links/rechts) – so kennen die Prüfungen die echten Werte
    (r => `Ränder ${r.top}/${r.bottom}/${r.left}/${r.right}`)(safeRand())} · ${
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dunkel' : 'hell'} · ${measurement.beginn.toISOString()} · ${
    // seit 4.35.0 (APD-43 H5): die Bedienungshilfen des Geräts
    matchMedia('(prefers-contrast: more)').matches ? 'Kontrast erhöht' : 'Kontrast normal'} · ${bewegungRuhig() ? 'Bewegung reduziert' : 'Bewegung normal'} · ${
    // seit 4.37.0 (APD-43 W4): die Textgröße des Geräts (Stufe und Body in px)
    `Text ${textName} ${textPx()}`}`);
  measurement.zeilen.push(['t', ...Object.keys(messWerte())].map(v => v.padEnd(6)).join(' ').trimEnd());
  const hoere = (z, typ, text) => { if (!z) return; const fn = e => { const t = text(e); if (t) messEreignis(t); }; z.addEventListener(typ, fn, true); measurement.hoerer.push([z, typ, fn]); };
  hoere(document, 'focusin', e => 'focus ' + messId(e.target));   // seit 4.28.1: der neue Fokus (R-4.5) steht als ‚neu fokussiert‘ da
  hoere(document, 'focusout', e => 'blur ' + messId(e.target));
  hoere(document, 'input', e => 'eingabe ' + (e.target.value?.length ?? 0));
  hoere(document, 'click', e => 'tippen ' + messId(e.target.closest('button, a, input, [role=menuitem]')));
  hoere(window, 'scroll', e => 'scroll' + (e.target === document ? '' : ' ' + messId(e.target)));
  hoere(window, 'orientationchange', () => 'drehen');
  hoere(window, 'resize', () => 'resize');
  hoere(window.visualViewport, 'resize', () => 'vv resize');
  hoere(window.visualViewport, 'scroll', () => 'vv scroll');
  // seit 4.30.1 (APD-67): Berührungen – Zeiger mit Lage (px), Art und Ziel, Bewegung nur bei gedrücktem Zeiger; touchcancel mit der
  // Zahl der Finger. Die Entscheidungen der Gestenstelle (‚nav …‘) stehen im selben Augenblick davor (sie hört zuerst).
  const zeiger = (art, e) => `zeiger ${art} ${Math.round(e.clientX)} ${Math.round(e.clientY)} ${e.pointerType || '-'}${e.isPrimary ? '' : ' neben'} ${messZiel(e.target)}`;
  hoere(document, 'pointerdown', e => zeiger('down', e));
  hoere(document, 'pointermove', e => e.buttons ? zeiger('move', e) : '');
  hoere(document, 'pointerup', e => zeiger('up', e));
  hoere(document, 'pointercancel', e => zeiger('cancel', e));
  hoere(document, 'touchcancel', e => `touchcancel ${e.changedTouches?.length ?? 0} ${messZiel(e.target)}`);
  // seit 4.30.2 (APD-67): ob Safari das Rollen noch erlaubt – ‚touchmove frei‘, ‚verhindert‘ (die Geste hält den Finger) bzw. ‚fest‘
  // (nicht mehr verhinderbar, Safari rollt); nur beim Wechsel, jede Berührung beginnt neu
  hoere(document, 'pointerdown', () => { measurement.tm = ''; return ''; });
  hoere(document, 'touchmove', e => { const z = e.cancelable ? e.defaultPrevented ? 'verhindert' : 'frei' : 'fest'; if (z === measurement.tm) return ''; measurement.tm = z; return 'touchmove ' + z; });
  measureLine('start');
  measurement.bild = requestAnimationFrame(messBild);
}
const messName = d => `messung-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${
  String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}.txt`;
// Beenden und teilen: bricht man das Teilen-Menü ab, bleibt die Messung und kann noch einmal geteilt werden.
async function messTeilen() {
  measureLine('messung beendet');   // seit 4.38.0 (RLB-103): das Ende ist eindeutig – das Nachspielen (abspielen.mjs) spielt das Beenden nicht nach
  measureOff();
  const res = await shareFiles([{ name: messName(measurement.beginn), content: measurement.zeilen.join('\n') + '\n', type: 'txt' }]);
  if (res === 'shared' || res === 'downloaded') measurement = null;
  return res;
}
// R-1.6 (seit 4.40.0, APD-77): ‚Messung starten‘ ist versteckt, bis langes Drücken auf die Versionszeile ihn freischaltet (bis zum
// Neustart, nichts gespeichert); bis dahin nur ein Platzhalter. Eine Messung, die läuft oder noch nicht geteilt ist, steht immer da.
let measureAllowed = false;
function measureMenuItems(opt) {
  if (!measurement && !measureAllowed) return [{ messPlatz: opt }];
  if (!measurement) return [{ icon: 'activity', label: 'Messung starten', sub: 'Für Claude: Bewegungen aufzeichnen', act: () => measureStart(opt) }];
  const s = Math.round((performance.now() - measurement.start) / 1000), n = measurement.zeilen.length - 2;
  return [{ icon: 'circle-stop', label: 'Messung beenden und teilen', act: messTeilen,
    sub: `${measurement.an ? 'läuft' : 'beendet'} · ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} · ${n.toLocaleString('de-DE')} Zeilen` }];
}
// Bei jedem resize stellt ui.js die Fenster selbst neu (placeDialogs; seit 4.64.0, APD-135/B-4.2 – bis dahin die erste Zeile im resize-Hörer
// der App). Als letzter Hörer von ui.js beim Laden: er läuft wie bisher nach allen anderen von ui.js und direkt vor dem der App.
window.addEventListener('resize', () => placeDialogs());

/* ---------- Namensraum AD (seit 5.0.0, APD-145, R-1.14) ---------- */
// Global steht nur AD; daran hängen genau die Namen aus schnittstelle.json (Teile app und pruefungen) – nicht mehr und nicht weniger
// (tests/schnittstelle.mjs, checkSchnittstelle). Jeder Name liest die Bindung hier innen; Funktionen und let-Werte lassen sich auch setzen,
// und das gilt dann auch innen: AD.dlgDirty = () => … der App, eine Prüfung ersetzt AD.shareFiles bzw. AD.confirmPop oder setzt AD.netState.
// Versiegelt: kein Name kommt dazu, keiner geht weg.
return Object.seal({
  get AD_VERSION() { return AD_VERSION; },
  get FX_SVG() { return FX_SVG; },
  get announce() { return announce; }, set announce(v) { announce = v; },
  get appearanceMenuItem() { return appearanceMenuItem; },
  get applyTheme() { return applyTheme; }, set applyTheme(v) { applyTheme = v; },
  get autoGrow() { return autoGrow; }, set autoGrow(v) { autoGrow = v; },
  get backupFileOf() { return backupFileOf; }, set backupFileOf(v) { backupFileOf = v; },
  get backupLastText() { return backupLastText; },
  get backupMenuEntries() { return backupMenuEntries; },
  get backupTileHtml() { return backupTileHtml; },
  get backupToday() { return backupToday; },
  get breakable() { return breakable; }, set breakable(v) { breakable = v; },
  get capHtml() { return capHtml; },
  get choosePop() { return choosePop; }, set choosePop(v) { choosePop = v; },
  get compactWidth() { return compactWidth; },
  get confirmPop() { return confirmPop; }, set confirmPop(v) { confirmPop = v; },
  get contentUnavailableHtml() { return contentUnavailableHtml; }, set contentUnavailableHtml(v) { contentUnavailableHtml = v; },
  get createAlert() { return createAlert; }, set createAlert(v) { createAlert = v; },
  get createCommands() { return createCommands; }, set createCommands(v) { createCommands = v; },
  get createNotice() { return createNotice; }, set createNotice(v) { createNotice = v; },
  get createPresentation() { return createPresentation; }, set createPresentation(v) { createPresentation = v; },
  get createRecentlydeleted() { return createRecentlydeleted; }, set createRecentlydeleted(v) { createRecentlydeleted = v; },
  get createSourcehighlight() { return createSourcehighlight; }, set createSourcehighlight(v) { createSourcehighlight = v; },
  get createSwipeactions() { return createSwipeactions; }, set createSwipeactions(v) { createSwipeactions = v; },
  get createSync() { return createSync; }, set createSync(v) { createSync = v; },
  get dlg() { return dlg; },
  get dlgDirty() { return dlgDirty; }, set dlgDirty(v) { dlgDirty = v; },
  get dlgHead() { return dlgHead; }, set dlgHead(v) { dlgHead = v; },
  get esc() { return esc; }, set esc(v) { esc = v; },
  get fabEnd() { return fabEnd; },
  get fabTop() { return fabTop; },
  get findsAll() { return findsAll; },
  get findsAny() { return findsAny; },
  get focus() { return focus; }, set focus(v) { focus = v; },
  get focusFirstInvalid() { return focusFirstInvalid; }, set focusFirstInvalid(v) { focusFirstInvalid = v; },
  get formatEuro() { return formatEuro; }, set formatEuro(v) { formatEuro = v; },
  get glassFromBackup() { return glassFromBackup; }, set glassFromBackup(v) { glassFromBackup = v; },
  get ic() { return ic; },
  get iconText() { return iconText; },
  get inform() { return inform; },
  get isPhone() { return isPhone; },
  get keepPlace() { return keepPlace; }, set keepPlace(v) { keepPlace = v; },
  get listHtml() { return listHtml; }, set listHtml(v) { listHtml = v; },
  get markWords() { return markWords; }, set markWords(v) { markWords = v; },
  get measureMenuItems() { return measureMenuItems; }, set measureMenuItems(v) { measureMenuItems = v; },
  get money() { return money; }, set money(v) { money = v; },
  get mountCap() { return mountCap; }, set mountCap(v) { mountCap = v; },
  get navPop() { return navPop; }, set navPop(v) { navPop = v; },
  get navPush() { return navPush; }, set navPush(v) { navPush = v; },
  get navRegister() { return navRegister; }, set navRegister(v) { navRegister = v; },
  get navSidebar() { return navSidebar; }, set navSidebar(v) { navSidebar = v; },
  get onDayChange() { return onDayChange; }, set onDayChange(v) { onDayChange = v; },
  get onLongPress() { return onLongPress; }, set onLongPress(v) { onLongPress = v; },
  get openAt() { return openAt; }, set openAt(v) { openAt = v; },
  get openDialog() { return openDialog; }, set openDialog(v) { openDialog = v; },
  get openMenu() { return openMenu; }, set openMenu(v) { openMenu = v; },
  get outputCss() { return outputCss; },
  get presentation() { return presentation; },
  get readBackup() { return readBackup; }, set readBackup(v) { readBackup = v; },
  get scrollBy() { return scrollBy; }, set scrollBy(v) { scrollBy = v; },
  get scrollRowHtml() { return scrollRowHtml; },
  get scrollView() { return scrollView; },
  get searchCancelHtml() { return searchCancelHtml; },
  get searchMenuItems() { return searchMenuItems; },
  get searchRegister() { return searchRegister; },
  get searchUnavailableHtml() { return searchUnavailableHtml; },
  get searchWords() { return searchWords; }, set searchWords(v) { searchWords = v; },
  get setFieldError() { return setFieldError; }, set setFieldError(v) { setFieldError = v; },
  get setHtml() { return setHtml; }, set setHtml(v) { setHtml = v; },
  get shareFiles() { return shareFiles; }, set shareFiles(v) { shareFiles = v; },
  get shareResultText() { return shareResultText; },
  get sourcehighlight() { return sourcehighlight; },
  get thousands() { return thousands; }, set thousands(v) { thousands = v; },
  get updateBar() { return updateBar; }, set updateBar(v) { updateBar = v; },
  get ICONS() { return ICONS; },
  get MEASURE_MAX_MS() { return MEASURE_MAX_MS; },
  get SHARE_RESULT() { return SHARE_RESULT; },
  get alert() { return alert; },
  get blank() { return blank; },
  get fastScroll() { return fastScroll; },
  get isOffline() { return isOffline; },
  get largeContent() { return largeContent; }, set largeContent(v) { largeContent = v; },
  get measureAllowed() { return measureAllowed; }, set measureAllowed(v) { measureAllowed = v; },
  get measureLine() { return measureLine; }, set measureLine(v) { measureLine = v; },
  get measureOff() { return measureOff; }, set measureOff(v) { measureOff = v; },
  get measureStart() { return measureStart; }, set measureStart(v) { measureStart = v; },
  get measurement() { return measurement; }, set measurement(v) { measurement = v; },
  get msg() { return msg; },
  get navCandidate() { return navCandidate; }, set navCandidate(v) { navCandidate = v; },
  get netState() { return netState; }, set netState(v) { netState = v; },
  get popoverMargins() { return popoverMargins; }, set popoverMargins(v) { popoverMargins = v; },
  get reserveSpace() { return reserveSpace; },
  get restoreTop() { return restoreTop; }, set restoreTop(v) { restoreTop = v; },
  get scrolled() { return scrolled; }, set scrolled(v) { scrolled = v; },
  get setNet() { return setNet; }, set setNet(v) { setNet = v; },
  get showNetToast() { return showNetToast; }, set showNetToast(v) { showNetToast = v; },
  get tap() { return tap; }, set tap(v) { tap = v; },
  get touchedAt() { return touchedAt; }, set touchedAt(v) { touchedAt = v; },
  get viewportResized() { return viewportResized; }, set viewportResized(v) { viewportResized = v; },
});
})();
