// AppDesign 4.32.0 · ui.js – gemeinsame Bausteine der iPad-Web-Apps von g811141a (Apple-like)
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
// Auswahl-Kapsel (capHtml, mountCap) · Tastatur/sichtbarer Bereich (placeDialogs) · iPhone (isPhone, applyLayout) ·
// Messmodus (messungMenuItems, seit 4.26.0) · Schnellroll-Griff (seit 4.30.0) · Navigation und Gesten (navAnmelden, navVor,
// navZurueck, navSeite, seit 4.30.0)
// Regeln dazu: README - Designrichtlinie allgemein.md

'use strict';
// Version der Bausteine (R-10.3): die App vergleicht sie beim Start mit der benötigten Fassung.
const AD_VERSION = '4.32.0';
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
  'chevrons-up-down': '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',   // seit 4.30.0: Schnellroll-Griff (A-37)
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
  'activity': '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  'circle-stop': '<circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
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
    timer = setTimeout(() => { if (navZug?.aktiv) return; fired = true; onLong(); }, 600);   // seit 4.30.0: nicht während einer Wischgeste (A-61)
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => btn.addEventListener(ev, () => clearTimeout(timer)));
  btn.addEventListener('contextmenu', e => e.preventDefault());
  btn.addEventListener('click', e => {
    e.preventDefault();
    if (fired) { fired = false; return; }
    onTap();
  });
}

// R-2.3 (seit 4.25.0, A-21): Suche mit mehreren Begriffen wie Mail und Notizen – Leerzeichen trennt Wörter, ein Eintrag passt,
// wenn alle darin vorkommen (Reihenfolge und Groß/klein egal); „…“ sucht eine genaue Wortfolge. Was ‚ein Eintrag‘ ist, sagt
// die App (Reiselogbuch: das ganze Reiselogbuch; gezeigt werden dann die Tage mit mindestens einem Wort).
// Seit 4.29.0 (A-63 C2) ohne Akzente wie Apple: ‚Zurich‘ findet ‚Zürich‘ und umgekehrt – verglichen wird ohne Akzentzeichen
// (Unicode-Zerlegung, Zeichen der Klasse ‚Mark‘ entfernt); ß, ø, æ sind eigene Buchstaben und bleiben.
// Gemerkt je Text: beim Tippen werden dieselben Texte bei jedem Buchstaben wieder verglichen (F-11: 30 Reiselogbücher unter 50 ms)
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
function markWords(html, words) {
  if (!words.length) return html;
  const pattern = [...words].sort((a, b) => b.length - a.length)
    .map(w => (esc(w).match(/&[a-z0-9#]+;|./gsu) || []).map(ch => {
      const v = ch.length === 1 && mitAkzent(ch);
      return (v ? `[${ch}${v}]` : ch.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')) + '\\p{M}*';
    }).join('\u200B?')).join('|');
  return html.replace(new RegExp(pattern, 'giu'), m => `<mark>${m}</mark>`).replaceAll('</mark><mark>', '');
}

// R-2.3 (seit 4.25.1, A-24): Seite neu aufbauen, ohne das Feld mit dem Fokus zu ersetzen. Die App ruft setHtml(el, html) statt
// el.innerHTML = html. Liegt der Fokus in einem Eingabefeld darin (z. B. Suche beim Tippen), wird der neue Inhalt in den alten
// eingearbeitet: das Feld und seine Vorfahren bleiben dieselben Elemente (Fokus, Cursor, Tastatur bleiben), alles andere wird
// angeglichen. Sonst ersetzt Safari am iPhone mit dem Feld auch die Tastatur kurz – Kopf- und Suchzeile zittern bei jedem Buchstaben.
// Seit 4.27.0 (A-28): der Rollbereich (.rolle mit id, direkt in el) bleibt dasselbe Element – nur sein Inhalt wird ersetzt. So
// bleibt der Rollstand beim Neuaufbau erhalten (wie früher der des Fensters), und ein laufender Schwung reißt nicht ab.
function setHtml(el, html) {
  if (mess?.an) messEreignis('neuaufbau ' + (el.id || el.className || el.tagName.toLowerCase()));
  // seit 4.29.0: das ⓧ im Feld (A-63 C3) steht nicht im neuen Inhalt – vorher heraus, danach wieder an das Feld mit Fokus
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

// Komponente ⓧ in einzeiligen Feldern (seit 4.29.0, A-63 C3, R-5.6) wie Apple (UIKit ‚clearButtonMode = whileEditing‘):
// solange ein einzeiliges Textfeld den Fokus hat und etwas drinsteht, steht rechts darin ein graues ⓧ (wie im Suchfeld, 44 × 44
// Antippfläche). Antippen leert das Feld, Cursor und Tastatur bleiben; die App erfährt es über ein input-Ereignis (wie beim
// Löschen per Taste). Ein Knopf für alle Felder, gleich hinter das Feld gesetzt (rollt mit); abschaltbar mit data-noclear.
const FX = 'input:is([type=text], [type=email], [type=url], [type=tel]):not([readonly], [disabled], [data-noclear])';
const fxBtn = document.createElement('button');
fxBtn.type = 'button'; fxBtn.className = 'fclear'; fxBtn.tabIndex = -1; fxBtn.setAttribute('aria-label', 'Eingabe löschen');
fxBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M15 9l-6 6M9 9l6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
let fxFeld = null, fxTippt = false, fxRahmen = null;
function fxZeigen() {
  const f = document.activeElement, an = f?.matches?.(FX) && f.value !== '' ? f : null;
  if (fxFeld && fxFeld !== an) fxFeld.classList.remove('mitx');
  // Bezugsrahmen ist das Element um das Feld (sonst läge er womöglich außerhalb des Rollbereichs und das ⓧ rollte nicht mit)
  if (fxRahmen && fxRahmen !== an?.parentElement) { fxRahmen.style.position = ''; fxRahmen = null; }
  fxFeld = an;
  if (!an) { fxBtn.remove(); return; }
  an.classList.add('mitx');
  if (fxBtn.previousSibling !== an) an.after(fxBtn);
  // jedes Mal neu setzen – ein Neuaufbau (setHtml) gleicht die Attribute des Rahmens an und nimmt es wieder weg
  const pa = an.parentElement;
  if (fxRahmen === pa || getComputedStyle(pa).position === 'static') { fxRahmen = pa; pa.style.position = 'relative'; }
  // Lage über den Ursprung des Bezugsrahmens gemessen (gleich, wo das Feld steht – Fenster, Inhalt, Tabelle)
  fxBtn.style.left = fxBtn.style.top = '0px';
  const o = fxBtn.getBoundingClientRect(), r = an.getBoundingClientRect();
  fxBtn.style.left = Math.round(r.right - 44 - o.left) + 'px';
  fxBtn.style.top = Math.round(r.top + (r.height - 44) / 2 - o.top) + 'px';
}
// Antippen: den Fokus nicht abgeben (Tastatur bleibt), leeren, die App benachrichtigen
fxBtn.addEventListener('pointerdown', e => { fxTippt = true; e.preventDefault(); });
fxBtn.addEventListener('mousedown', e => e.preventDefault());
fxBtn.addEventListener('click', e => {
  e.preventDefault(); fxTippt = false;
  const f = fxFeld; if (!f) return;
  f.value = '';
  if (document.activeElement !== f) f.focus();
  f.dispatchEvent(new Event('input', { bubbles: true }));
  fxZeigen();
});
document.addEventListener('focusin', fxZeigen);
document.addEventListener('input', () => queueMicrotask(fxZeigen));
document.addEventListener('focusout', () => setTimeout(() => { if (!fxTippt) fxZeigen(); }, 0));
document.addEventListener('pointerup', () => setTimeout(() => { fxTippt = false; }, 400), true);
window.addEventListener('resize', () => requestAnimationFrame(fxZeigen));
// Größe des Feldes (Rahmen, nicht Innenraum – das ⓧ ändert den Innenabstand), im nächsten Bild: sonst meldet Safari eine Schleife
if (window.ResizeObserver) { const ro = new ResizeObserver(() => fxFeld && requestAnimationFrame(fxZeigen)); document.addEventListener('focusin', e => { ro.disconnect(); if (e.target.matches?.(FX)) ro.observe(e.target, { box: 'border-box' }); }); }

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

/* ---------- Rahmen und Rollbereich (seit 4.27.0, A-28, R-2.1) ---------- */

// Die Seite rollt nie, nur der Inhalt. Die App baut #app als Rahmen aus festen Zeilen: oben die Kopfzeile (.nb bzw. .pnav, mit
// Suchzeile), darunter der Rollbereich <div class="rolle" id="rolle">…Inhalt…</div>. Der Rahmen ist so hoch wie der sichtbare
// Bereich (--vv-h, Variante B1) und endet über der Tastatur. Weil das Fenster nicht rollt, hat Safari beim Tippen nichts zu
// verschieben (A-27: jedes Rollen des Fensters bei offener Tastatur verschob den sichtbaren Bereich, der Ausgleich kam 2 Bilder
// zu spät; Muster A-28 und Versuch M-1 am iPhone: 0 px). Alle Bausteine (Leiste, R-3.2, R-7.3, R-7.4, R-8.1, Messmodus) rollen
// nur über rolle; die App ruft nie window.scrollTo. Ohne Rollbereich (App noch nicht umgebaut) rollt wie bisher das Fenster.
const rolle = {
  get el() { return document.querySelector('#app > .rolle'); },
  get y() { const e = rolle.el; return e ? e.scrollTop : scrollY; },
  get max() { const e = rolle.el; return Math.max(0, e ? e.scrollHeight - e.clientHeight : document.documentElement.scrollHeight - innerHeight); },
  get rest() { return rolle.max - rolle.y; },
  to(y, smooth = false) { (rolle.el || window).scrollTo({ top: Math.max(0, Math.round(y)), behavior: smooth ? 'smooth' : 'instant' }); },
  by(d) { if (Math.round(d)) rolle.to(rolle.y + d); },
  // seit 4.28.1 (A-36): bis zum Ende des Inhalts – Platz, der nach dem Schließen der Tastatur noch darunter steht, zählt nicht
  ende(smooth = false) { rolle.to(rolle.max - platzVon(rolle.el), smooth); },
  // seit 4.30.0 (A-37 F-5, A-61 F-10): ein weiches Rollen (‚Nach oben / Ans Ende‘) sofort anhalten – WebKit hält es bei scrollTo
  // nicht an, wohl aber, wenn der Bereich kurz nicht rollen darf
  halt() { const e = rolle.el; if (!e) return; const y = e.scrollTop; e.style.overflowY = 'hidden'; e.scrollTop = y; void e.offsetHeight; e.style.overflowY = ''; e.scrollTop = y; },
};
// Rollen hören (Fenster und Rollbereich): scroll-Ereignisse von Elementen steigen nicht auf – deshalb in der Einfangphase.
const onRoll = fn => window.addEventListener('scroll', e => { if (e.target === document || e.target === rolle.el) fn(e); }, { capture: true, passive: true });

/* ---------- Menüs und Sprechblasen ---------- */

// Ebene hinter Menü und Sprechblase: daneben tippen schließt, Wischen bewegt die Seite dahinter nicht.
function blockingLayer() {
  const layer = document.createElement('div');
  layer.className = 'layer';
  layer.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  return layer;
}

// Seite sperren, solange ein Fenster offen ist: Wischen wirkt nur im Fenster (seit 4.2.0).
// R-7.3 (seit 4.18.0, A-13): Solange ein Fenster offen ist, steht die Seite dahinter still. Safari schiebt beim Öffnen der
// Tastatur trotz overflow: hidden die ganze Seite und schiebt sie nicht zurück – deshalb wird der Scrollstand beim Öffnen
// gemerkt und beim Schließen genau wiederhergestellt (position: fixed ginge nicht: der Tabellenkopf ist sticky).
// Seit 4.23.1 (P-51/5): zusätzlich die oberste Zeile unter der Leiste samt Abstand in px – nach dem Schließen und dem
// Neuaufbau durch die App steht genau sie wieder dort (auch wenn Safari die Seite für die Tastatur verschoben hat).
// Seit 4.23.2 (P-52/2–4): die Zeile wird nach dem Schließen 1,5 s lang festgehalten – Safari rollt, während die Tastatur
// zugeht, die Seite noch einmal bzw. ändert die Fensterhöhe; jede solche Bewegung wird sofort zurückgenommen. Ein Tippen
// oder Wischen des Nutzers beendet das Festhalten. Auch nach ‹ › im Fenster steht die Liste wie beim Öffnen (Wunsch des Nutzers).
let lockY = null, lockTop = null, holdTop = null, holdUntil = 0;
function lockAnchor() {
  if (rolle.y < 4) return null;
  const edge = keepEdge();
  const e = [...document.querySelectorAll(KEEP_SEL)].find(x => x.getClientRects().length && x.getBoundingClientRect().bottom > edge + 1);
  return e ? { sel: keepKey(e), top: e.getBoundingClientRect().top - edge } : null;
}
function alignTop(a) {
  if (!a) return;
  const e = [...document.querySelectorAll(KEEP_SEL.split(', ').map(s => `${s.split(' ')[0]} ${a.sel}`).join(', '))].find(x => x.getClientRects().length);
  const d = e ? Math.round(e.getBoundingClientRect().top - keepEdge() - a.top) : 0;
  rolle.by(d);
}
function lockPage() {
  if (lockY === null) { lockY = rolle.y; lockTop = lockAnchor(); holdTop = null; }
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
  if (Math.round(rolle.y) !== Math.round(y)) rolle.to(y);
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
// R-1.7 (seit 4.29.0, A-63): Abstände von Menüs und Sprechblasen zum Rand – 12 px, mindestens die sicheren Ränder
// (bei offener Tastatur liegt die Home-Leiste unter ihr)
function rand12() {
  const g = safeRand();
  return { L: Math.max(12, g.left), R: Math.max(12, g.right), T: Math.max(12, g.top), B: Math.max(12, kbOffen() ? 0 : g.bottom) };
}
function placeAt(el, anchor, align) {
  // R-4.5/R-8.1: Menü und Sprechblase stehen unter ihrer Schaltfläche und passen immer ganz auf den Bildschirm.
  // Reicht der Platz darunter nicht, scrollt ihr Inhalt darin (erst bei weniger als 200 px Platz darunter
  // öffnen sie nach oben). 'beside': rechts neben dem Eintrag (Kontextmenü in der Seitenleiste), oben bündig.
  el.style.maxHeight = ''; el.style.overflowY = '';   // nach dem Drehen neu messen
  // Seit 4.29.0 (R-1.7, A-63): Abstand 12 px vom Rand, mindestens aber die sicheren Ränder (Aussparung, Home-Leiste)
  const { L, R, T, B } = rand12();
  let r = anchor.getBoundingClientRect();
  const fit = room => { if (el.scrollHeight > room) { el.style.maxHeight = room + 'px'; el.style.overflowY = 'auto'; el.style.overscrollBehavior = 'contain'; } };
  let top;
  // Seit 4.10.0: ist neben dem Eintrag kein Platz (iPhone: Kachel so breit wie der Bildschirm), steht das Menü
  // linksbündig unter der Kachel – ganz sichtbar über der Backup-Kachel; dafür wird die Liste nötigenfalls
  // etwas nach oben geschoben (R-4.2).
  if (align === 'beside' && innerWidth - (r.right - 40) - R < el.offsetWidth) {
    const list = anchor.closest('.side-list'), tile = anchor.closest('#side')?.querySelector('.side-foot .bhint');
    const tr = tile?.getBoundingClientRect();
    const limit = tr && tr.height ? Math.min(innerHeight - B, tr.top - 12) : innerHeight - B;
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
    else fit(limit - top);
    el.style.left = Math.max(L, Math.min(r.left, innerWidth - el.offsetWidth - R)) + 'px';
    el.style.top = Math.max(T, top) + 'px';
    return;
  }
  if (align === 'beside') {
    // Neben der Kachel (iPad): nie über bzw. hinter die Backup-Kachel – unten endet das Menü über ihr (R-4.2).
    const tr = anchor.closest('#side')?.querySelector('.side-foot .bhint')?.getBoundingClientRect();
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
    const { L, R, T, B } = rand12(), room = innerHeight - T - B;
    if (subMenu.scrollHeight > room) { subMenu.style.maxHeight = room + 'px'; subMenu.style.overflowY = 'auto'; }
    const mr = menu.getBoundingClientRect(), br = subItem.getBoundingClientRect(), w = subMenu.offsetWidth;
    subMenu.style.left = Math.max(L, mr.left - w - 8 >= L ? mr.left - w - 8 : Math.min(mr.right + 8, innerWidth - w - R)) + 'px';
    subMenu.style.top = Math.max(T, Math.min(br.top, innerHeight - subMenu.offsetHeight - B)) + 'px';
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
      if (!a) { pop.style.left = (innerWidth - pop.offsetWidth) / 2 + 'px'; pop.style.top = Math.max(rand12().T, (innerHeight - pop.offsetHeight) / 2) + 'px'; return; }
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
  endReveal(); // A-23: eine laufende Hervorhebung endet, sobald das nächste Fenster aufgeht
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
const MIME = { json: 'application/json', html: 'text/html', txt: 'text/plain' };
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
  const fab = document.querySelector('.fab:not([hidden]):not(.still)');
  t.style.setProperty('--toast-w', Math.max(200, Math.round(innerWidth - left - (fab || left || innerWidth >= 700 ? 144 : 32))) + 'px');
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
  dlgFest = 0;
  dlg.returnValue = '';
  const neu = !dlg.open;
  if (neu) showModalQuiet(dlg);
  placeDialogs();
  if (neu) blattAuf();   // R-4.6 (seit 4.32.0): im iPhone-Aufbau gleitet das Blatt von unten herein
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
// Seit 4.31.0 (A-65): löscht oder ersetzt der Nutzer einen Großbuchstaben (Rücktaste, markieren und überschreiben), erzwingt die App an
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
  if (f.dataset.capFrei !== undefined && +f.dataset.capFrei === pos - 1) { delete f.dataset.capFrei; return; }   // A-65
  if (!capWanted(f, pos - 1)) return;
  delete f.dataset.capNext;
  f.setRangeText(ch.toLocaleUpperCase('de'), pos - 1, pos, 'end');
}
// R-3.2 (seit 4.20.0, A-15): ‚Nach oben / Ans Ende‘ (.fab) nur, wenn es etwas zu scrollen gibt – iPad und iPhone.
// Seit 4.27.0 (A-28) am Rollbereich gemessen; updateBar() ruft es nach jedem Aufbau der Seite. fabTop()/fabEnd() rollen den Inhalt.
// Seit 4.27.1 (A-33): die Kapsel überdeckt nie Kopf- oder Suchzeile – passt sie nicht mit 16 px Abstand oben und unten in den
// sichtbaren Teil des Rollbereichs (iPhone quer mit offener Tastatur: 126 px sichtbar, davon gut 100 px Leisten), ist sie
// ausgeblendet; neu geprüft, sobald sich der sichtbare Bereich ändert (Tastatur auf und zu).
// Seit 4.30.0 (A-37 B): nur die Pfeile, die etwas bewirken – ganz oben nur ‚Ans Ende‘, am Ende nur ‚Nach oben‘, dazwischen beide;
// näher als eine halbe Höhe des Rollbereichs an einem Ende fehlt dessen Pfeil. Die Kapsel steht unten fest (ihr unterer Rand
// bleibt, sie wird nur niedriger); gemessen wird mit ihrer vollen Höhe, damit sie nicht zwischen da und weg springt.
let fabH = 0;
const fabKnoepfe = f => [f.querySelector('button:first-of-type'), f.querySelector('button:last-of-type')];
function updateFab() {
  const f = document.querySelector('.fab');
  if (!f) return navKlassen();
  const [oben, unten] = fabKnoepfe(f), e = rolle.el, vv = window.visualViewport;
  const nah = (e ? e.clientHeight : innerHeight) / 2, ende = rolle.max - platzVon(e);
  oben.hidden = !(rolle.y > nah);
  unten.hidden = !(ende - rolle.y > nah);
  const knopf = [oben, unten].find(b => b.offsetHeight)?.offsetHeight;
  if (knopf) fabH = 2 * knopf + 1;   // volle Höhe (zwei Pfeile und Rand); ausgeblendet hat sie keine Höhe – dann die zuletzt gemessene
  const raum = e ? Math.min(e.getBoundingClientRect().bottom, vv ? vv.offsetTop + vv.height : innerHeight) - e.getBoundingClientRect().top : Infinity;
  f.classList.toggle('still', rolle.max <= 1 || (oben.hidden && unten.hidden) || raum < (fabH || 97) + 32);
  schnellZeigen(false);
  navKlassen();   // nach jedem Aufbau: wo gewischt werden kann, hängt auch vom Inhalt ab (z. B. erst ein offener Eintrag)
}
const fabTop = () => nachTastatur(() => rolle.to(0, true));
const fabEnd = () => nachTastatur(() => rolle.ende(true));
if (window.ResizeObserver) new ResizeObserver(() => requestAnimationFrame(updateFab)).observe(document.body);
window.addEventListener('resize', () => requestAnimationFrame(updateFab));
window.visualViewport?.addEventListener('resize', () => requestAnimationFrame(updateFab));

// R-3.2 (seit 4.30.0, A-37 C): Schnellroll-Griff wie in Apple Fotos – beim Rollen erscheint rechts ein Griff; ihn halten und ziehen
// springt durch den ganzen Inhalt, eine Blase links daneben zeigt die Marke des Abschnitts oben im Bild (die App setzt data-marke an
// Tage und Abschnitte, ohne Marken keine Blase). Nach 1,5 s ohne Rollen blendet er aus (nur Deckkraft, auch bei ‚Bewegung
// reduzieren‘). Da ist er nur zusammen mit der Kapsel (Inhaltsansicht, nicht bei offener Tastatur oder offenem Fenster) und erst ab
// drei Höhen des Rollbereichs Inhalt. Seine Bahn beginnt 8 px unter der Kopf- bzw. Suchzeile und endet über der Kapsel in voller
// Höhe (zwei Pfeile und 8 px Abstand) – sie springt nicht, wenn ein Pfeil wegfällt. Ganz oben bzw. unten (auch darüber hinaus)
// gezogen = Anfang bzw. Ende. VoiceOver: Regler ‚Schnell rollen‘ (Wert = Marke), Wischen nach oben/unten springt einen Abschnitt.
const SCHNELL_AB = 3, SCHNELL_RUHE = 1500, SCHNELL_KAPSEL = 2 * 48 + 8;
const schnell = document.createElement('div');
schnell.className = 'schnell aus';
schnell.hidden = true;
schnell.innerHTML = `<div class="blase" aria-hidden="true"></div><div class="griff" role="slider" tabindex="-1" aria-label="Schnell rollen"
  aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span>${ic('chevrons-up-down')}</span></div>`;
document.body.append(schnell);
const schnellGriff = schnell.querySelector('.griff'), schnellBlase = schnell.querySelector('.blase');
let schnellZieht = null, schnellRuhe = 0, schnellH = 0;
const schnellEnde = () => Math.max(0, rolle.max - platzVon(rolle.el));
function schnellMoeglich() {
  const f = document.querySelector('.fab'), e = rolle.el;
  return !!f && !!e && !f.hidden && !f.classList.contains('still') && f.getClientRects().length > 0 && !kbOffen()
    && !document.documentElement.classList.contains('locked') && e.scrollHeight >= SCHNELL_AB * e.clientHeight;
}
// Marken in der Reihenfolge des Inhalts (Tage, Überschriften der Abschnitte); es gilt die letzte, die oben schon begonnen hat –
// davor (Kopf des Inhalts) die erste. Steht oben eine Tabelle mit haftendem Kopf, zählt die Kante unter dem Kopf.
const schnellMarken = () => [...rolle.el.querySelectorAll('[data-marke]')];
function schnellKante(marken) {
  let kante = rolle.el.getBoundingClientRect().top + 4;
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
  if (!schnellMoeglich()) { schnell.hidden = true; schnell.classList.add('aus'); return; }
  schnell.hidden = false;
  const r = rolle.el.getBoundingClientRect(), f = document.querySelector('.fab').getBoundingClientRect();
  const oben = r.top + 8, h = Math.max(0, f.bottom - SCHNELL_KAPSEL - oben);
  schnell.style.top = oben + 'px'; schnell.style.height = h + 'px';
  schnellH = Math.max(0, h - schnellGriff.offsetHeight);
  const ende = schnellEnde(), a = ende ? Math.min(1, Math.max(0, rolle.y / ende)) : 0;
  schnellGriff.style.transform = `translateY(${Math.round(a * schnellH)}px)`;
  const marken = schnellMarken(), i = schnellMarke(marken), marke = i < 0 ? '' : marken[i].dataset.marke;
  schnellGriff.setAttribute('aria-valuenow', Math.round(a * 100));
  if (marke) schnellGriff.setAttribute('aria-valuetext', marke); else schnellGriff.removeAttribute('aria-valuetext');
  if (schnellBlase.textContent !== marke) schnellBlase.textContent = marke;
  schnellBlase.style.transform = `translateY(${Math.round(a * schnellH + schnellGriff.offsetHeight / 2)}px) translateY(-50%)`;
  if (!rollt) return;
  schnell.classList.remove('aus');
  clearTimeout(schnellRuhe);
  if (!schnellZieht) schnellRuhe = setTimeout(() => schnell.classList.add('aus'), SCHNELL_RUHE);
}
onRoll(() => { if (!keepBusy) schnellZeigen(true); });
schnellGriff.addEventListener('pointerdown', e => {
  if (e.button > 0 || schnell.classList.contains('aus')) return;
  e.preventDefault(); e.stopPropagation();
  rolle.halt();   // ein laufendes weiches Rollen (‚Ans Ende‘) endet, der Griff folgt dem Finger (F-5)
  try { schnellGriff.setPointerCapture(e.pointerId); } catch {}
  schnellZieht = { id: e.pointerId, y: e.clientY, a: schnellEnde() ? rolle.y / schnellEnde() : 0 };
  schnell.classList.add('zieht'); clearTimeout(schnellRuhe);
});
schnellGriff.addEventListener('pointermove', e => {
  if (schnellZieht?.id !== e.pointerId) return;
  e.preventDefault();
  const a = schnellH ? Math.min(1, Math.max(0, schnellZieht.a + (e.clientY - schnellZieht.y) / schnellH)) : 0;
  rolle.to(a * schnellEnde());
}, { passive: false });
const schnellLos = e => {
  if (schnellZieht?.id !== e.pointerId) return;
  schnellZieht = null; schnell.classList.remove('zieht'); schnellZeigen(true);
};
schnellGriff.addEventListener('pointerup', schnellLos);
schnellGriff.addEventListener('pointercancel', schnellLos);
schnellGriff.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); });
// VoiceOver (Wischen nach oben/unten) und Tastatur: einen Abschnitt weiter bzw. zurück, ohne Marken eine Höhe des Rollbereichs
schnellGriff.addEventListener('keydown', e => {
  const d = { ArrowUp: -1, ArrowLeft: -1, PageUp: -1, ArrowDown: 1, ArrowRight: 1, PageDown: 1 }[e.key];
  if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); rolle.to(e.key === 'Home' ? 0 : schnellEnde()); return; }
  if (!d) return;
  e.preventDefault();
  const marken = schnellMarken(), i = schnellMarke(marken), top = schnellKante(marken) - 4;
  if (i < 0) return rolle.to(Math.min(schnellEnde(), rolle.y + d * rolle.el.clientHeight));
  // zurück: steht der Anfang der aktuellen Marke über dem Rand, zuerst an ihren Anfang
  const j = d > 0 ? i + 1 : marken[i].getBoundingClientRect().top < top - 4 ? i : i - 1;
  const ziel = marken[Math.max(0, Math.min(marken.length - 1, j))];
  rolle.to(Math.min(schnellEnde(), rolle.y + ziel.getBoundingClientRect().top - top));
});

// R-5.5 (seit 4.19.0, A-14): in einzeiligen Feldern bestätigt die Eingabetaste und schließt die Tastatur (‚Fertig‘, HIG);
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
// Seit 4.31.0 (A-64, R-5.2): keine doppelten Leerzeichen in Textfeldern (ein- und mehrzeilig, auch im Suchfeld) – ein Leerzeichen direkt
// neben einem Leerzeichen wird nicht eingefügt; beim Einfügen werden mehrere Leerzeichen oder Tabs zu einem (Zeilenumbrüche bleiben,
// einzeilige Felder machen aus ihnen ein Leerzeichen). Der iOS-Kurzbefehl ‚.‘ (zweimal Leertaste) ersetzt das erste Leerzeichen selbst.
const LEER_FELD = 'textarea, input[type=text], input[type=search], input:not([type])';
const leer = c => c === ' ' || c === '\t';
document.addEventListener('beforeinput', e => {
  const f = e.target;
  if (e.inputType !== 'insertText' || e.data !== ' ' || !f.matches?.(LEER_FELD) || f.selectionStart == null) return;
  if (leer(f.value.charAt(f.selectionStart - 1)) || leer(f.value.charAt(f.selectionEnd))) e.preventDefault();
}, true);
document.addEventListener('paste', e => {
  const f = e.target, t = e.clipboardData?.getData('text/plain');
  if (t == null || !f.matches?.(LEER_FELD) || f.selectionStart == null) return;
  const a = f.selectionStart, b = f.selectionEnd;
  let x = (f.matches('textarea') ? t : t.replace(/\r?\n/g, ' ')).replace(/[ \t]+/g, ' ');
  if (x.startsWith(' ') && (a === 0 ? false : leer(f.value.charAt(a - 1)))) x = x.slice(1);
  if (x.endsWith(' ') && leer(f.value.charAt(b))) x = x.slice(0, -1);
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
msg.addEventListener('close', unlockPage);
dlg.addEventListener('close', () => {
  dlgFest = 0;
  unlockPage();
  if (dlg.open) return;
  const sel = dlgOpener;
  if (sel) document.querySelector(sel)?.classList.remove('on');
  dlgOpener = '';
  // R-7.3: nach dem Neuaufbau durch die App die oberste Zeile zurück an ihren Platz, die Zeile aus dem Fenster kurz hervorheben
  // (seit 4.23.2 rollt nichts mehr – auch nach ‹ › nicht)
  requestAnimationFrame(() => { holdAlign(); if (sel) revealRow(sel); });
});

// R-7.3 (seit 4.18.0, A-13): Zeile bzw. Kasten, aus dem ein Fenster kam, nach dem Schließen kurz hervorheben.
// Seit 4.23.2 rollt dafür nichts mehr (vorher: nach ‹ › bis die zuletzt gezeigte Zeile sichtbar war) – die Liste steht wie beim Öffnen.
// Seit 4.24.0 (A-23): REVEAL_HOLD voll blau, dann in REVEAL_FADE ausblenden (vorher 1 s ausblenden);
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
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  revealing = still
    ? el.animate([{ backgroundColor: from }, { backgroundColor: from }], { duration: REVEAL_HOLD })
    : el.animate([{ backgroundColor: from }, { backgroundColor: from, offset: REVEAL_HOLD / (REVEAL_HOLD + REVEAL_FADE), easing: 'ease-in' }, { backgroundColor: to }],
      { duration: REVEAL_HOLD + REVEAL_FADE });
}

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
// eine Seite nach der anderen, Fenster als Blatt (seit 4.32.0, R-4.6). <html> bekommt dann die Klasse 'phone'.
// Die App fragt isPhone() und baut ihre Seiten danach; bei einem Wechsel ruft ihr resize-Handler render().
// Seit 4.28.1 (A-36): die Höhe ohne Tastatur zählt (S-3: verschiebt Safari den sichtbaren Bereich, wird innerHeight kleiner – das
// iPad galt mit offener Tastatur als iPhone, das Fenster sprang an den linken Rand).
const isPhone = () => innerWidth < 700 || seitenHoehe() < 500;
// Seit 4.9.0: Name des Geräts für ‚geändert am … · iPad‘ und den Abgleich (iPadOS meldet sich als Mac mit Touch).
function deviceName() {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return 'iPhone';
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'iPad';
  return isPhone() ? 'iPhone' : 'iPad';
}
function applyLayout() { document.documentElement.classList.toggle('phone', isPhone()); }
applyLayout();
// Schalter (seit 4.29.0, A-63 C4, 15.15): kennt der Browser den eingebauten Schalter (Safari ab 17.4, <input type="checkbox" switch>),
// zeichnet Safari ihn selbst – gleitet, ziehbar, Haptik, VoiceOver ‚Schalter‘, Aussehen der iOS-Version; sonst unser Schalter (design.css)
document.documentElement.classList.toggle('natsw', 'switch' in HTMLInputElement.prototype);
window.addEventListener('resize', applyLayout);

// Großer Titel (iPhone): sobald er unter die Leiste geschoben ist, steht er klein in der Leiste (.pnav.titled).
// Die Leiste bekommt beim Scrollen eine Haarlinie. Die App ruft updateBar() nach jedem Aufbau der Seite.
function updateBar() {
  const bar = document.querySelector('.pnav, .nb');
  if (!bar) return;
  bar.classList.toggle('line', rolle.y > 4);
  if (bar.classList.contains('pnav')) document.documentElement.style.setProperty('--pnav-h', bar.offsetHeight + 'px');
  const big = document.querySelector('.ltitle');
  // Ohne großen Titel steht der Titel immer in der Leiste.
  if (bar.classList.contains('pnav')) bar.classList.toggle('titled', !big || big.getBoundingClientRect().bottom < bar.getBoundingClientRect().bottom);
  updateFab();
}
onRoll(updateBar);
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
// Oberster sichtbarer Eintrag unter der Leiste; ganz oben → null (ganz oben bleibt ganz oben). Steht oben kein Eintrag
// (Ende der Seite, z. B. Fazit und Statistik), zählt der Abstand zum Ende – ganz unten bleibt ganz unten (seit 4.21.1).
const scrollRest = () => rolle.rest;
function topAnchor() {
  if (rolle.y < 4) return null;
  const edge = keepEdge();
  const e = [...document.querySelectorAll(KEEP_SEL)].find(x => x.getClientRects().length && x.getBoundingClientRect().bottom > edge + 1);
  // Abstand als Anteil der Höhe: nach dem Drehen ist der Eintrag anders hoch, der sichtbare Teil bleibt gleich.
  return e ? { sel: keepKey(e), part: (e.getBoundingClientRect().top - edge) / (e.getBoundingClientRect().height || 1) } : { rest: scrollRest() };
}
function rememberTop() {
  if (keepBusy || keepTurned() || lockY !== null) return;   // bei offenem Fenster (R-7.3) und während des Drehens nichts überschreiben
  keepTop = topAnchor();
}
function restoreTop() {
  keepWidth = innerWidth; keepHeight = innerHeight;
  if (!keepTop) return;
  if ('rest' in keepTop) {
    keepBusy = true;
    rolle.to(rolle.y + scrollRest() - keepTop.rest);
    requestAnimationFrame(() => { keepBusy = false; });
    return;
  }
  const e = [...document.querySelectorAll(KEEP_SEL.split(', ').map(s => `${s.split(' ')[0]} ${keepTop.sel}`).join(', '))].find(x => x.getClientRects().length);
  if (!e) return;
  keepBusy = true;
  const r = e.getBoundingClientRect();
  rolle.by(r.top - keepEdge() - keepTop.part * r.height);
  requestAnimationFrame(() => { keepBusy = false; });
}
onRoll(() => { if (!keepBusy) rememberTop(); });

// R-8.1 (seit 4.21.0, A-17): Ändert die App die Anordnung selbst (z. B. Seitenleiste ein/aus – die Breite des Inhalts und
// damit die Zeilenhöhen ändern sich, das Fenster nicht), bleibt oben derselbe Eintrag: keepPlace(() => { …; render(); }).
function keepPlace(change) {
  const anchor = topAnchor();
  change();
  keepTop = anchor;
  if (anchor) return restoreTop();
  keepBusy = true;
  if (rolle.y) rolle.to(0);
  requestAnimationFrame(() => { keepBusy = false; });
}

// R-7.4 (seit 4.21.0, A-16): Position beim Öffnen eines Eintrags – ganz oben; gibt die App einen ‚nächsten offenen‘ Eintrag
// an, steht er direkt unter dem Kopf (Leiste und haftender Tabellenkopf), nie in der Mitte. openAt(null) = ganz oben.
function openAt(el) {
  let top = 0;
  if (el) {
    const th = el.closest('table')?.tHead?.querySelector('th');
    const head = th && getComputedStyle(th).position === 'sticky' ? th.offsetHeight : 0;
    top = Math.max(0, Math.round(rolle.y + el.getBoundingClientRect().top - keepEdge() - head));
  }
  keepBusy = true;
  rolle.to(top);
  keepTop = topAnchor();
  requestAnimationFrame(() => { keepBusy = false; });
}
// Seit 4.23.2: bei offenem bzw. gerade geschlossenem Fenster ändert nur die Tastatur die Höhe – das ist kein Drehen (R-7.3).
window.addEventListener('resize', () => { if ((lockY !== null || holdTop) && innerWidth === keepWidth) { keepHeight = innerHeight; return; } if (!keepTurned()) return; requestAnimationFrame(() => requestAnimationFrame(restoreTop)); setTimeout(restoreTop, 350); });

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

/* ---------- Navigation und Gesten (seit 4.30.0, A-61 Teil 1, R-7.5) ---------- */

// Wie iOS 26 (Variante ‚Überall‘, Nutzer 22.10.2026): Im iPhone-Aufbau schiebt sich der Inhalt beim Öffnen von rechts über die
// Startliste, die Liste weicht ein Drittel nach links und dunkelt leicht ab; zurück umgekehrt – mit dem Zurück-Knopf oder durch
// Wischen nach rechts von überall im Inhalt; die Seite folgt dem Finger. Am iPad hoch holt Wischen nach rechts von überall im
// Inhalt die darübergelegte Seitenleiste herein, Wischen nach links auf ihr oder der Abdunkelung schiebt sie weg; panel-left und
// die Abdunkelung bewegen sie genauso. iPad quer (feste Seitenleiste): keine Geste. Fertig nach halber Breite oder schnellem
// Wischen (über 0,3 px/ms in den letzten 100 ms), sonst federt die Seite zurück. ‚Bewegung reduzieren‘: Überblenden statt Schieben.
// Vorrang (T-35) an dieser einen Stelle: senkrecht rollt der Browser (touch-action pan-y), Bereiche mit eigenem waagrechtem Rollen,
// Felder, Knöpfe, Kapseln, Kapsel ‚Nach oben / Ans Ende‘ und Schnellroll-Griff behalten ihre Geste; entschieden wird nach 10 px –
// deutlich waagrecht (1,2 × so weit wie senkrecht) in der richtigen Richtung, sonst nichts; wer erst hält (langes Drücken), wischt
// nicht. Kein Wischen bei offenem Fenster, Menü oder offener Sprechblase. Drehen bricht ein Ziehen ab (Zustand wie vorher, R-8.1),
// eine laufende Bewegung springt an ihr Ziel. Je Bild nur transform und opacity (A-59), die Bewegung als Web-Animation.
// Die App meldet sich an (Startliste bzw. Seitenleiste ist #side, der Inhalt #app, die Abdunkelung am iPad .side-shade):
//   navAnmelden({ zurueck: { offen, darunter, los }, seite: { moeglich, offen, zeigen } })   (nicht ‚navigation‘ – so heißt die Navigation-API des Browsers)
//     zurueck.offen()     – iPhone-Aufbau: ein Eintrag ist offen (Zurück möglich)
//     zurueck.darunter(an) – die Startliste unter dem Inhalt aufbauen (true) bzw. wieder verbergen (false), ohne den Zustand zu ändern
//     zurueck.los()       – zurück zur Startliste (Zustand ändern und neu aufbauen)
//     seite.moeglich()    – Seitenleiste wird darübergelegt (iPad hoch), seite.offen() – sie ist sichtbar
//     seite.zeigen(an)    – Seitenleiste ein- bzw. ausblenden (Zustand ändern, nur die Seitenleiste neu aufbauen)
//     seite.fest()        – seit 4.31.0 (A-68): Seitenleiste steht fest links (iPad quer); seite.neu() – alles neu aufbauen
// Aufrufe der App: navVor(change) beim Öffnen eines Eintrags aus der Startliste, navZurueck() für den Zurück-Knopf,
// navSeite(an) für panel-left (iPad hoch und quer) und die Abdunkelung am iPad hoch.
const NAV_DAUER = 350, NAV_ENTSCHEID = 10, NAV_WAAGRECHT = 1.2, NAV_TEMPO = 0.3, NAV_HALTEN = 500, NAV_DUNKEL = 0.1;
const NAV_EIGEN = 'input, textarea, select, [contenteditable], .cap, .fab, .schnell, .searchbox, [data-eigene-geste], button:not(.side-row)';
const navRuhig = window.matchMedia?.('(prefers-reduced-motion: reduce)');
const navSchleier = document.createElement('div');
navSchleier.className = 'nav-schleier';
document.body.append(navSchleier);
let navApp = null, navZug = null, navLauf = null, navKlickWeg = false;
// seit 4.30.1 (A-67): die Entscheidungen der Gestenstelle stehen in der Messung (15.21) – ‚nav kandidat‘, ‚nav verworfen‘, ‚nav aktiv‘,
// ‚nav fertig‘, ‚nav zurück gefedert‘, ‚nav abgebrochen‘ mit Weg (Anteil der Breite) und Tempo (px/ms)
const navMess = t => { if (mess?.an) messEreignis('nav ' + t); };
function navAnmelden(app) { navApp = app; navKlassen(); }
// touch-action: pan-y nur, wo gewischt werden kann (iPhone-Aufbau, iPad hoch, seit 4.31.0 iPad quer) – sonst bleibt alles wie bisher
function navKlassen() {
  document.documentElement.classList.toggle('wischt', !!navApp && (isPhone() || !!navApp.seite?.moeglich() || !!navApp.seite?.fest?.()));
}
window.addEventListener('resize', navKlassen);
const navTeile = art => art === 'phone'
  ? [document.getElementById('app'), document.querySelector('.fab'), document.getElementById('side'), navSchleier].filter(Boolean)
  : art === 'fest' ? [document.getElementById('side'), document.getElementById('app'), document.querySelector('.fab')].filter(Boolean)
  : [document.getElementById('side'), document.querySelector('.side-shade')].filter(Boolean);
// Lage aller Ebenen zum Anteil p: iPhone 0 = Startliste, 1 = Inhalt; iPad 0 = Seitenleiste weg, 1 = Seitenleiste da.
// Seit 4.31.0 (A-68, Variante B ‚Mitschieben‘): iPad quer (art ‚fest‘) rückt der Inhalt mit – bei p = 1 steht er dort, wo er neben der
// festen Seitenleiste beginnt (ihr rechter Rand + 4 px = w − 6), und behält bis zum Einrasten seine volle Breite (html.nav-fest).
function navBild(art, el, p, w) {
  const ruhig = navRuhig?.matches;
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
  const dauer = navRuhig?.matches ? 200 : Math.max(150, NAV_DAUER * Math.abs(nach - von));
  const anims = navTeile(art).map(el => {
    const a = el.animate([navBild(art, el, von, w), navBild(art, el, nach, w)], { duration: dauer, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
    a.id = 'nav';
    return a;
  });
  navLauf = { ende, anims };
  anims[0].onfinish = () => { if (navLauf?.anims === anims) ende(); };
}
// laufende Bewegung sofort an ihr Ziel (neue Bewegung, Drehen)
function navSofort() { if (navLauf) navLauf.ende(); }
// Öffnen aus der Startliste (iPhone-Aufbau): change() baut den Inhalt auf, er schiebt sich über die Liste
function navVor(change) {
  navSofort();
  change();
  if (!navApp?.zurueck || !isPhone() || !navApp.zurueck.offen()) return;
  const w = navAnfang('phone');
  navApp.zurueck.darunter(true);
  navSetze('phone', 0, w);
  navFahre('phone', 0, 1, w, () => navApp.zurueck.darunter(false));
}
// Zurück-Knopf (iPhone-Aufbau): bei offener Tastatur erst sie schließen (A-36), dann schiebt sich der Inhalt hinaus
function navZurueck() {
  const z = navApp?.zurueck;
  if (!z || !isPhone() || !z.offen()) return z?.los();
  if (kbOffen()) document.activeElement?.blur?.();
  nachTastatur(() => {
    if (!z.offen()) return;
    const w = navAnfang('phone');
    z.darunter(true);
    navSetze('phone', 1, w);
    navFahre('phone', 1, 0, w, () => z.los());
  });
}
// panel-left und Abdunkelung am iPad hoch: die Seitenleiste gleitet herein bzw. hinaus
function navSeite(an) {
  const s = navApp?.seite;
  if (!s) return;
  if (s.fest?.() && an !== s.offen()) return navFest(an);
  if (!s.moeglich() || an === s.offen()) return s.zeigen(an);
  if (an) { s.zeigen(true); const w = navAnfang('seite'); navSetze('seite', 0, w); navFahre('seite', 0, 1, w); }
  else { const w = navAnfang('seite'); navFahre('seite', 1, 0, w, () => s.zeigen(false)); }
}
// Seit 4.31.0 (A-68): iPad quer gleitet die feste Seitenleiste herein und der Inhalt rückt mit; am Ende rastet sie ein – der Inhalt wird
// schmaler, der oberste Eintrag bleibt (keepPlace, R-8.1). Hinaus: erst wird der Inhalt wieder ganz breit (unter der Seitenleiste,
// oberster Eintrag bleibt), dann gleiten beide nach links.
function navEinrasten() { keepPlace(() => { navAufraeumen('fest'); navApp.seite.neu(); }); }
function navFest(an) {
  const s = navApp.seite;
  if (an) { navAnfang('fest'); s.zeigen(true); const w = navBreite('seite'); navSetze('fest', 0, w); navFahre('fest', 0, 1, w, navEinrasten); return; }
  let w;
  keepPlace(() => { w = navAnfang('fest'); navSetze('fest', 1, w); });
  navFahre('fest', 1, 0, w, () => keepPlace(() => { navAufraeumen('fest'); s.zeigen(false); s.neu(); }));
}
// Hat das Element (oder ein Vorfahr bis zur Seite) einen eigenen waagrechten Rollbereich, gehört ihm das Wischen.
function navEigenesRollen(t, bis) {
  for (let e = t; e && e !== bis && e !== document.body; e = e.parentElement) {
    if (e.scrollWidth > e.clientWidth + 1 && /auto|scroll/.test(getComputedStyle(e).overflowX)) return true;
  }
  return false;
}
function navKandidat(e) {
  if (!navApp || e.button > 0 || !e.isPrimary || navLauf) return null;
  const t = e.target;
  if (!(t instanceof Element) || dlg.open || msg.open || document.querySelector('.menu, .pop, .layer') || t.closest(NAV_EIGEN)) return null;
  const app = document.getElementById('app'), side = document.getElementById('side');
  if (isPhone()) {
    if (!navApp.zurueck?.offen() || !app?.contains(t) || navEigenesRollen(t, app)) return null;
    return { art: 'phone', richtung: 1, von: 1, nach: 0 };
  }
  const s = navApp.seite;
  // seit 4.31.0 (A-68): iPad quer nur herein – ausblenden nur mit panel-left (die Kacheln bleiben frei für Wischaktionen, T-10)
  if (s?.fest?.()) return !s.offen() && app?.contains(t) && !navEigenesRollen(t, app) ? { art: 'fest', richtung: 1, von: 0, nach: 1 } : null;
  if (!s?.moeglich()) return null;
  if (!s.offen() && app?.contains(t) && !navEigenesRollen(t, app)) return { art: 'seite', richtung: 1, von: 0, nach: 1 };
  if (s.offen() && (side?.contains(t) || t.closest('.side-shade')) && !navEigenesRollen(t, side)) return { art: 'seite', richtung: -1, von: 1, nach: 0 };
  return null;
}
// Wischen tippt nie an: ein Zeiger, der sich zwischen Drücken und Loslassen mehr als 10 px bewegt hat, löst kein Antippen aus (am Gerät
// erkennt iOS so kein Tippen; mit Maus und Zeichenstift schon) – außer in Feldern (Text markieren).
let navStart = null;
window.addEventListener('pointerdown', e => { navStart = e.isPrimary ? { x: e.clientX, y: e.clientY, id: e.pointerId } : navStart; }, true);
window.addEventListener('pointerup', e => {
  const a = navStart; navStart = null;
  if (!a || a.id !== e.pointerId || Math.hypot(e.clientX - a.x, e.clientY - a.y) <= NAV_ENTSCHEID || e.target.closest?.('input, textarea, select, [contenteditable]')) return;
  navKlickWeg = true; setTimeout(() => { navKlickWeg = false; });
}, true);
window.addEventListener('pointerdown', e => {
  const k = navKandidat(e);
  navZug = k && { ...k, x0: e.clientX, y0: e.clientY, t0: e.timeStamp, id: e.pointerId, aktiv: false, spur: [[e.timeStamp, e.clientX]],
    breite: innerWidth, hoehe: innerHeight };
  if (navApp) navMess(k ? `kandidat ${k.art}` : `kein kandidat${e.target.closest?.(NAV_EIGEN) ? ' eigen' : ''}`);
}, true);
function navAktiv(z, e) {
  z.aktiv = true;
  navKlickWeg = true;
  navMess(`aktiv ${z.art} ${Math.round(e.clientX - z.x0)} ${Math.round(e.clientY - z.y0)}`);
  if (kbOffen()) document.activeElement?.blur?.();   // F-16: die Tastatur schließt, zurück geht es danach
  rolle.halt();                                         // F-10: ein weiches Rollen endet, das Wischen gilt
  try { e.target.setPointerCapture?.(e.pointerId); } catch {}
  z.w = navAnfang(z.art);
  if (z.art === 'phone') navApp.zurueck.darunter(true);
  else if (z.nach === 1) { navApp.seite.zeigen(true); z.w = navBreite('seite'); }
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
  setTimeout(() => { navKlickWeg = false; });
  const spur = z.spur.filter(([t]) => t >= e.timeStamp - 100);
  const tempo = spur.length > 1 && spur.at(-1)[0] > spur[0][0] ? (spur.at(-1)[1] - spur[0][1]) / (spur.at(-1)[0] - spur[0][0]) * z.richtung : 0;
  const weg = Math.abs((z.p ?? z.von) - z.von);
  const geschafft = !abbruch && (weg > 0.5 || (tempo > NAV_TEMPO && weg > 0.05));
  const p = z.p ?? z.von;
  navMess(`${abbruch ? 'abgebrochen' : geschafft ? 'fertig' : 'zurück gefedert'} weg ${weg.toFixed(2)} tempo ${tempo.toFixed(2)}`);
  if (z.art === 'phone') {
    if (geschafft) navFahre('phone', p, 0, z.w, () => navApp.zurueck.los());
    else navFahre('phone', p, 1, z.w, () => navApp.zurueck.darunter(false));
  } else if (z.art === 'fest') navFahre('fest', p, geschafft ? 1 : 0, z.w, geschafft ? navEinrasten : () => navApp.seite.zeigen(false));
  else if (z.nach === 1) navFahre('seite', p, geschafft ? 1 : 0, z.w, geschafft ? null : () => navApp.seite.zeigen(false));
  else navFahre('seite', p, geschafft ? 0 : 1, z.w, geschafft ? () => navApp.seite.zeigen(false) : null);
}
// A-67 (Messung P-65): wo der Browser senkrecht rollen darf, beginnt Safari ab 10 px senkrechter Abweichung zu rollen und nimmt der
// Seite den Finger (pointercancel) – auch mitten im Zurückwischen. Ist die Geste entschieden, verhindert touchmove das; nur touchmove
// hält Safari auf (nicht pointermove). Vorher bleibt alles frei – senkrecht rollt der Browser wie bisher.
window.addEventListener('touchmove', e => { if (navZug?.aktiv && e.cancelable) e.preventDefault(); }, { capture: true, passive: false });
window.addEventListener('pointerup', e => navLoslassen(e, false), true);
window.addEventListener('pointercancel', e => navLoslassen(e, true), true);
// Nach einer Wischgeste kein Antippen dessen, worauf sie begann
window.addEventListener('click', e => { if (navKlickWeg) { e.preventDefault(); e.stopPropagation(); } }, true);
// F-14 (R-8.1): Drehen bricht ein Ziehen ab – Zustand wie vor dem Ziehen; eine laufende Bewegung springt an ihr Ziel
window.addEventListener('resize', () => {
  const z = navZug;
  if (z?.aktiv && (innerWidth !== z.breite || Math.abs(innerHeight - z.hoehe) > 150)) {
    navZug = null;
    navMess('abgebrochen drehen');
    // das Loslassen danach tippt nichts an
    const los = () => setTimeout(() => { navKlickWeg = false; });
    window.addEventListener('pointerup', los, { capture: true, once: true });
    window.addEventListener('pointercancel', los, { capture: true, once: true });
    if (z.art === 'phone') navApp.zurueck.darunter(false);
    else if (z.nach === 1) navApp.seite.zeigen(false);
    navAufraeumen(z.art);
  }
  navSofort();
});
// F-20 (VoiceOver): die ‚Zurück‘-Geste (Z) bzw. Escape geht zurück bzw. schließt die darübergelegte Seitenleiste
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || e.defaultPrevented || !navApp || dlg.open || msg.open || document.querySelector('.menu, .pop')) return;
  if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
  if (isPhone() && navApp.zurueck?.offen()) { e.preventDefault(); navZurueck(); }
  else if (!isPhone() && navApp.seite?.moeglich() && navApp.seite.offen()) { e.preventDefault(); navSeite(false); }
});

/* ---------- Blatt auf dem iPhone (seit 4.32.0, A-61 Teil 2, R-4.6) ---------- */

// Wie iOS 26 (‚Neuer Termin‘, Variante A ‚nur groß‘, Nutzer 23.10.2026; Fall-Liste arbeit/A-61 Teil 2 Fall-Liste.md): im iPhone-Aufbau ist
// jedes Fenster (#dlg) ein Blatt – es gleitet von unten bis knapp unter die Statusleiste, die Seite dahinter weicht verkleinert und
// abgedunkelt zurück (quer: volle Höhe, die Seite bleibt). Nach unten ziehen schließt wie das x: am Kopf immer, im Inhalt, wenn er ganz
// oben steht, ein schnelles Wischen genügt; mit Änderungen seit dem Öffnen (dlgDirty) zieht es sich zäh, federt zurück und fragt am x
// (R-4.4). Bei offener Tastatur schließt der Zug nach unten zuerst die Tastatur. Antippen der Abdunkelung wirkt wie x. Meldungen (#msg)
// bleiben kleine Fenster in der Mitte, am iPad bleibt das Fenster in der Mitte. Entschieden nach 8 px, deutlich senkrecht (1,2 × so weit
// wie waagerecht); waagerecht rollende Bereiche behalten ihr Rollen. Beim Loslassen zählt, wo das Blatt mit dem Tempo auslaufen würde.
// Je Bild nur translate, scale und opacity (Web-Animation, damit die Prüfungen auf ihr Ende warten); ‚Bewegung reduzieren‘: Überblenden,
// das Ziehen folgt weiter dem Finger. Das Schließen bleibt sofort (dlg.close, Häkchen): ein Abbild des Blatts gleitet hinaus.
const BLATT_ENTSCHEID = 8, BLATT_SENKRECHT = 1.2, BLATT_ZAEH = 0.3, BLATT_DUNKEL = 0.3, BLATT_KLEINER = 0.07, BLATT_AUSLAUF = 400;
const BLATT_KURVE = 'cubic-bezier(.32,.72,0,1)';
const blattSchleier = document.createElement('div');
blattSchleier.className = 'blatt-schleier';
blattSchleier.setAttribute('aria-hidden', 'true');
document.body.append(blattSchleier);
let blattY = 0, blattZug = null, blattLauf = null, blattGeistEl = null, blattKlickWeg = false;
const blattQuer = () => window.matchMedia?.('(orientation: landscape) and (max-height: 500px)').matches;
// Oberkante des Blatts im sichtbaren Bereich: hoch 10 px unter der Statusleiste, quer 8 px
const blattOben = () => !isPhone() ? 0 : blattQuer() ? 8 : Math.round(safeRand().top + 10);
const blattZu = () => Math.max(innerHeight, seitenHoehe()) - blattOben();
// die Seite dahinter: was fest steht und zu sehen ist (Inhalt bzw. Startliste)
const blattSeite = () => [document.getElementById('app'), document.getElementById('side')]
  .filter(e => e && e.getClientRects().length && getComputedStyle(e).position === 'fixed');
// Bild zum Versatz o (0 = offen, blattZu() = unten hinaus): Blatt, Abdunkeln und die Seite – sie weicht nur hoch zurück
function blattBild(o) {
  const zu = blattZu(), q = Math.max(0, Math.min(1, 1 - o / zu)), s = blattQuer() ? 0 : q;
  return { blatt: `0 ${Math.round(o)}px`, schleier: +(BLATT_DUNKEL * q).toFixed(3), s,
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
  if (dlg.open && isPhone()) blattSetze(o);
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
  if (Math.abs(von - nach) < 1) { blattSetze(nach); fertig?.(); return; }
  dauer = dauer || Math.max(220, Math.min(480, Math.abs(nach - von) * 0.9));
  const a = blattBild(von), b = blattBild(nach);
  blattSetze(Math.min(von, nach));   // die Seite weicht schon während der Bewegung zurück (runde Ecken, Hintergrund)
  blattAnimiere([[dlg, { translate: a.blatt }, { translate: b.blatt }], [blattSchleier, { opacity: a.schleier }, { opacity: b.schleier }],
    ...blattSeite().map(e => [e, a.seite, b.seite])], dauer, BLATT_KURVE, () => { blattSetze(nach); fertig?.(); });
}
// Öffnen (openDialog): von unten herein; ‚Bewegung reduzieren‘: überblenden
function blattAuf() {
  blattStopp();
  if (!dlg.open || !isPhone()) return;
  document.documentElement.classList.add('blatt');
  if (navRuhig?.matches) {
    blattSetze(0);
    blattAnimiere([[dlg, { opacity: 0 }, { opacity: 1 }], [blattSchleier, { opacity: 0 }, { opacity: blattBild(0).schleier }]], 200, 'ease-out');
    return;
  }
  blattSetze(blattZu());
  blattFahre(0);
}
// iPad-Aufbau (Drehen, breiteres Fenster) oder geschlossen: alles zurück
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
  if (blattGeistEl || !dlg.open || !isPhone() || !document.documentElement.classList.contains('blatt')) return;
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
  const a = navRuhig?.matches ? g.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: 'ease-out', fill: 'forwards' })
    : g.animate([{ translate: `0 ${Math.round(blattY)}px` }, { translate: `0 ${Math.round(blattZu())}px` }], { duration: Math.max(220, Math.min(420, (blattZu() - blattY) * 0.5)), easing: BLATT_KURVE, fill: 'forwards' });
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
  blattAnimiere([[blattSchleier, { opacity: von.schleier }, { opacity: 0 }], ...blattSeite().map(e => [e, von.seite, nach.seite])],
    navRuhig?.matches ? 200 : 380, navRuhig?.matches ? 'ease-out' : BLATT_KURVE, blattAus);
}
const dlgSchliessen = dlg.close.bind(dlg);
dlg.close = v => { blattGeist(); dlgSchliessen(v); };
// Häkchen in <form method="dialog">: der Browser schließt nach dem submit-Ereignis
dlg.addEventListener('submit', e => { if (!e.defaultPrevented && e.target.getAttribute?.('method') === 'dialog') blattGeist(); });
dlg.addEventListener('close', () => { if (!dlg.open) blattWeg(); });
// Drehen bzw. anderer Aufbau mit offenem Blatt: bleibt offen in der passenden Form (quer immer volle Höhe), am iPad wieder in der Mitte
window.addEventListener('resize', () => {
  if (!dlg.open) return;
  if (!isPhone()) return blattAus();
  document.documentElement.classList.add('blatt');
  if (!blattLauf && !blattZug?.aktiv) blattSetze(blattY);
});
const blattX = () => dlg.querySelector('#dlgX');
// wie das x (Escape, Abdunkelung, Ziehen): mit Änderungen fragt die Sprechblase am x
function blattWieX() { const x = blattX(); if (x) x.click(); else dlg.close('cancel'); }
const blattDraussen = e => { if (e.target !== dlg) return false; const r = dlg.getBoundingClientRect();
  return e.clientY < r.top || e.clientY > r.bottom || e.clientX < r.left || e.clientX > r.right; };
dlg.addEventListener('click', e => { if (blattDraussen(e) && isPhone() && !blattKlickWeg && !document.querySelector('.pop, .menu')) blattWieX(); });
window.addEventListener('click', e => { if (blattKlickWeg) { e.preventDefault(); e.stopPropagation(); } }, true);
// steht der Inhalt unter dem Finger schon ganz oben? (auch Bereiche mit eigenem senkrechten Rollen)
function blattGanzOben(t) {
  for (let e = t; e && e !== dlg; e = e.parentElement) if (e.scrollTop > 0 && e.scrollHeight > e.clientHeight + 1) return false;
  return true;
}
const blattFeld = () => { const a = document.activeElement; return dlg.contains(a) && a.matches?.(FELD) ? a : null; };
dlg.addEventListener('pointerdown', e => {
  blattZug = null;
  if (!dlg.open || !isPhone() || !e.isPrimary || e.button > 0 || blattDraussen(e) || document.querySelector('.pop, .menu')) return;
  if (e.target.closest?.('[data-eigene-geste], input[type=range], .pop, .menu')) return;
  blattZug = { id: e.pointerId, x0: e.clientX, y0: e.clientY, o: blattY, kopf: !!e.target.closest('.dlg-head'), t: e.target, aktiv: false,
    spur: [[e.timeStamp, e.clientY]] };
});
function blattErlaubt(z, dx, dy) {
  if (dy <= 0 || Math.abs(dy) <= Math.abs(dx) * BLATT_SENKRECHT) return false;
  return z.kopf || blattGanzOben(z.t);
}
// Ist der Zug entschieden, verhindert touchmove das Rollen (Safari entscheidet sonst selbst, 13)
dlg.addEventListener('touchmove', e => {
  const z = blattZug, t = e.touches?.[0];
  if (!z || !t) return;
  if (e.cancelable && (z.aktiv || (Math.abs(t.clientY - z.y0) > 1 && blattErlaubt(z, t.clientX - z.x0, t.clientY - z.y0)))) e.preventDefault();
}, { passive: false });
window.addEventListener('pointermove', e => {
  const z = blattZug;
  if (!z || e.pointerId !== z.id) return;
  const dx = e.clientX - z.x0, dy = e.clientY - z.y0;
  if (!z.aktiv) {
    if (Math.abs(dx) < BLATT_ENTSCHEID && Math.abs(dy) < BLATT_ENTSCHEID) return;
    // nach unten ziehen schließt die Tastatur (wie iOS) – im gerollten Inhalt rollt er weiter, am Kopf bzw. ganz oben folgt das Blatt
    if (dy > Math.abs(dx) * BLATT_SENKRECHT) blattFeld()?.blur();
    if (!blattErlaubt(z, dx, dy)) { blattZug = null; return; }
    z.aktiv = true;
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
  blattKlickWeg = true; setTimeout(() => { blattKlickWeg = false; });
  const spur = z.spur.filter(([t]) => t >= e.timeStamp - 100);
  const tempo = spur.length > 1 && spur.at(-1)[0] > spur[0][0] ? (spur.at(-1)[1] - spur[0][1]) / (spur.at(-1)[0] - spur[0][0]) : 0;   // px/ms nach unten
  const wohin = (z.roh ?? blattY) + tempo * BLATT_AUSLAUF, zu = blattZu();
  if (abbruch || Math.abs(wohin) <= Math.abs(zu - wohin)) { blattFahre(0); return; }
  if (dlgDirty?.()) { blattFahre(0); setTimeout(() => { if (dlg.open) blattWieX(); }, 260); return; }
  blattFahre(zu, () => { blattWieX(); if (dlg.open) blattFahre(0); }, Math.max(180, Math.min(360, (zu - blattY) * 0.5)));
}
window.addEventListener('pointerup', e => blattLos(e, false), true);
window.addEventListener('pointercancel', e => blattLos(e, true), true);

/* ---------- Tastatur und sichtbarer Bereich ---------- */

// Bei offener Tastatur verkleinert und verschiebt Safari den sichtbaren Bereich. Kopfzeile, Tabellenkopf
// und alle Fenster richten sich danach: die Kopfzeilen bleiben sichtbar, nur der Inhalt scrollt.
// Seit 4.28.1 (A-36, Safari-Eigenheit S-3): Höhe der Seite ohne Tastatur = innerHeight + scrollY – verschiebt Safari den sichtbaren
// Bereich, wird innerHeight um genau so viel kleiner. Daraus der Abstand der Tastatur vom unteren Rand (Kapsel) und ob sie offen ist.
// Mit Rollbereich rollt die Seite selbst nie – scrollY ist dann nur Safaris Verschiebung (ohne Rollbereich rollt das Fenster).
function seitenHoehe() { return innerHeight + (rolle.el ? Math.max(0, scrollY) : 0); }
function kbOffen() { return !!window.visualViewport && visualViewport.height < seitenHoehe() - 80; }
// Felder, die eine Tastatur öffnen (Datum, Uhrzeit, Auswahl und Schalter öffnen keine)
const FELD = 'textarea, input:not([type=date],[type=time],[type=datetime-local],[type=month],[type=checkbox],[type=radio],[type=button],[type=submit],[type=reset],[type=range],[type=color],[type=file],[type=hidden]):not([readonly])';
let dlgFest = 0;   // seit 4.28.1: Höhe des iPad-Fensters vor dem Antippen – der Platz unter dem Inhalt macht es nicht höher
// R-1.7 (seit 4.29.0, A-63): sichere Ränder in px – aus den Variablen --safe-… (design.css), über ein unsichtbares Element gelesen
let safeEl = null;
function safeRand() {
  if (!safeEl) { safeEl = document.createElement('div'); safeEl.setAttribute('aria-hidden', 'true');
    safeEl.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:var(--safe-top) var(--safe-right) var(--safe-bottom) var(--safe-left)';
    document.body.append(safeEl); }
  const c = getComputedStyle(safeEl);
  return { top: parseFloat(c.paddingTop) || 0, bottom: parseFloat(c.paddingBottom) || 0, left: parseFloat(c.paddingLeft) || 0, right: parseFloat(c.paddingRight) || 0 };
}
function placeDialogs() {
  const vv = window.visualViewport;
  const top = vv ? Math.max(0, vv.offsetTop) : 0;
  const h = vv ? vv.height : innerHeight;
  const full = isPhone();
  const root = document.documentElement.style;
  root.setProperty('--vv-top', top + 'px');
  // A-28 (B1): der Rahmen ist so hoch wie der sichtbare Bereich und endet über der Tastatur.
  root.setProperty('--vv-h', Math.round(h) + 'px');
  // Abstand der Tastatur vom unteren Rand: die untere Leiste (iPhone) und die Kapsel bleiben darüber sichtbar.
  root.setProperty('--vv-bottom', Math.max(0, Math.round(seitenHoehe() - top - h)) + 'px');
  // iPad-Fenster (seit 4.29.0, A-63 S-6): oben und unten mindestens 10 px, aber nie unter Statusleiste oder Home-Leiste
  // (bei offener Tastatur liegt die Home-Leiste unter ihr)
  const s = safeRand(), oben = Math.max(10, s.top), unten = Math.max(10, kbOffen() ? 0 : s.bottom);
  // R-4.6 (seit 4.32.0): im iPhone-Aufbau ist das Fenster ein Blatt – es beginnt knapp unter der Statusleiste (blattOben)
  const blatt = full ? blattOben() : 0;
  const max = full ? h - blatt : h - oben - unten;
  root.setProperty('--dlg-max', Math.max(200, !full && dlgFest ? Math.min(max, dlgFest) : max) + 'px');
  [dlg, msg].forEach(d => {
    if (!d.open) return;
    // iPhone: das Blatt reicht bis zum unteren Rand des sichtbaren Bereichs (bei offener Tastatur bis zur Tastatur, R-4.5).
    if (full && d === dlg) { d.style.margin = '0'; d.style.bottom = 'auto'; d.style.top = Math.round(top + blatt) + 'px'; return; }
    // Fenster im sichtbaren Bereich zentrieren (bei offener Tastatur oberhalb der Tastatur). Seit 4.28.1 (A-36): steht es dort
    // schon ganz, bleibt es stehen – auch nach dem Schließen der Tastatur, solange ein Feld darin den Fokus hat.
    d.style.margin = '0 auto';
    d.style.bottom = 'auto';
    const jetzt = parseFloat(d.style.top), ganz = jetzt >= top + oben - 1 && jetzt + d.offsetHeight <= top + h - unten + 1;
    if (ganz && (kbOffen() || d.contains(document.activeElement) && document.activeElement.matches(FELD))) return;
    d.style.top = Math.round(top + oben + Math.max(0, (h - oben - unten - d.offsetHeight) / 2)) + 'px';
  });
}
placeDialogs();   // --vv-h (Höhe des Rahmens, A-28) gleich beim Start
// Seit 4.9.1 (R-4.5): wächst ein Fenster nach dem Öffnen (Inhalt, Textfelder), wird es neu platziert –
// es ragt nie über den Bildschirm hinaus.
if (window.ResizeObserver) [dlg, msg].forEach(d => new ResizeObserver(() => { if (d.open) placeDialogs(); }).observe(d));

// R-4.5 Tastatur ohne Springen (seit 4.28.1, A-36, Fall-Liste arbeit/A-36 Fall-Liste.md Abschnitt 8, Muster 9 am Gerät 10 von 10 still).
// Safari verschiebt den sichtbaren Bereich (und mit ihm alle Leisten), wenn das Feld beim Fokus unter der künftigen Tastatur liegt,
// und liest diese Lage beim Fokus, bevor die App etwas tun kann (Designrichtlinie 13, S-1, S-7). Deshalb:
// - Die Berührung bleibt bei Safari. Sobald ein Feld den Fokus hat (focusin), rollt sein Bereich (Inhalt bzw. Fenster) es in die obere
//   Hälfte des künftig sichtbaren Bereichs; ist die Tastatur noch zu, bekommt es danach sofort einen neuen Fokus (blur + focus, noch
//   in der Berührung) – Safari liest die Lage dann neu und verschiebt nichts (S-8). Bei offener Tastatur (Feld wechseln) kein neuer
//   Fokus: die Tastatur würde flackern. Die Ereignisse des neuen Fokus sieht die App nicht (sonst z. B. ‚Pflichtfeld‘ beim ersten Antippen).
// - Der Klick, den Safari danach an derselben Stelle auslöst, trifft dort jetzt etwas anderes – er wird unterdrückt.
// - Safari stellt den Inhalt beim Erscheinen der Tastatur auf den Stand vor dem Rollen zurück (S-9, nur im Inhalt): die App rollt ihn
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
// höher als seinen Platz (A-33)
const platzVon = c => parseFloat(c?.style.getPropertyValue('--platz')) || 0;
const platz = (c, px) => { c.style.setProperty('--platz', Math.max(0, Math.ceil(px)) + 'px'); };
// genau so viel Platz, dass der Rollstand bleibt
function knapp(c) {
  const y = c.scrollTop;
  platz(c, y + c.clientHeight - (c.scrollHeight - platzVon(c)));
  c.scrollTop = y;
}
// rollen, notfalls mit Platz darunter
function rollen(c, d) {
  d = Math.round(d);
  if (!d) return;
  const fehlt = c.scrollTop + d - (c.scrollHeight - c.clientHeight);
  if (fehlt > 0) platz(c, platzVon(c) + fehlt);
  c.scrollTop += d;
}
// wie weit das Feld rollen muss, damit seine Mitte höchstens 24 px über der Mitte des künftig sichtbaren Bereichs steht, nie über dem
// oberen Rand seines Bereichs (+4 px; passt es nicht zweimal in den sichtbaren Teil, direkt an den Rand wie R-4.5); ≤ 0: nichts
function noetig(f, c) {
  const kb = kbOffen() ? seitenHoehe() - visualViewport.height : kbHoehe(f), sichtbar = seitenHoehe() - kb;
  const r = f.getBoundingClientRect(), b = c.getBoundingClientRect(), oben = 2 * r.height > sichtbar - b.top ? b.top : b.top + 4;
  return (r.top + r.bottom) / 2 - Math.max(oben + r.height / 2, sichtbar / 2 - 24);
}
// Feld ganz über der Tastatur (R-4.5, seit 4.28.0): 16 px darüber; reicht der Platz nicht, direkt unter Kopf- bzw. Suchzeile.
// Rahmen und Fenster enden über der Tastatur – Feld und Bereich werden gegeneinander gemessen (Safari wie Chromium). Gleitet das
// iPad-Fenster noch, zählt seine neue Lage.
function feldZeigen(f) {
  const c = behaelter(f);
  if (!c) return;
  const d = f.closest('dialog'), dy = d && !isPhone() ? (parseFloat(d.style.top) || 0) - d.getBoundingClientRect().top : 0;
  const r = f.getBoundingClientRect(), b = c.getBoundingClientRect(), oben = b.top + dy, unten = b.bottom + dy - 16, ro = r.top + dy, ru = r.bottom + dy;
  if (r.height > unten - oben) { if (Math.abs(ro - oben) > 1) rollen(c, ro - oben); }
  else if (ru > unten) rollen(c, ru - unten);
  else if (ro < oben) rollen(c, ro - oben - 16);
}
let neuFokus = false, beruehrt = -1e9, gerollt = null, halten = null, kbWar = false, nachKb = null;
// die Ereignisse des neuen Fokus nicht an die App weitergeben (Safari-Modell und Safari selbst lesen die Lage vorher, auf window)
['focusout', 'blur', 'focusin', 'focus'].forEach(t => document.addEventListener(t, e => { if (neuFokus) e.stopImmediatePropagation(); }, true));
// jede neue Berührung bzw. jeder Klick mit Maus oder Trackpad beginnt hier (pointerdown kommt vor dem Fokus) – erst der Klick derselben
// Berührung, die das Feld fokussiert hat, wird unterdrückt
addEventListener('touchstart', () => { beruehrt = performance.now(); gerollt = null; halten = null; }, { capture: true, passive: true });
addEventListener('pointerdown', () => { gerollt = null; halten = null; }, { capture: true, passive: true });
addEventListener('focusout', () => { if (!neuFokus) halten = null; }, true);
document.addEventListener('focusin', e => {
  const f = e.target;
  if (!f.matches?.(FELD) || !kbOffen() && performance.now() - beruehrt > 1500) return;
  const c = behaelter(f);
  if (!c) return;
  const n = noetig(f, c);
  if (n <= 0) return;
  if (c.closest('dialog') === dlg && !isPhone() && !dlgFest) { dlgFest = Math.round(dlg.offsetHeight); placeDialogs(); }
  platz(c, seitenHoehe());   // reichlich – gleich danach wieder knapp
  c.scrollTop += n;
  knapp(c);
  gerollt = { f, t: performance.now() };
  halten = { f, c, y: c.scrollTop, bis: performance.now() + 1500 };
  if (kbOffen()) return;
  neuFokus = true;
  try { f.blur(); f.focus({ preventScroll: true }); } finally { neuFokus = false; }
  messZeile(`neu fokussiert ${messId(f)}${document.activeElement === f ? '' : ' Fokus weg'}`);
}, true);
addEventListener('click', e => {
  const g = gerollt;
  gerollt = null;
  if (!g || performance.now() - g.t > 1000 || g.f.contains(e.target)) return;
  e.preventDefault(); e.stopImmediatePropagation();
  messZeile(`klick unterdrückt ${messId(e.target)} (Feld ${messId(g.f)})`);
}, true);
// Rückstellung (S-9) und Platz schrumpft (nach dem Schließen der Tastatur, ohne Feld mit Fokus im Bereich)
addEventListener('scroll', e => {
  const c = e.target, h = halten;
  if (h && c === h.c) {
    if (performance.now() > h.bis || document.activeElement !== h.f) halten = null;
    else if (c.scrollTop < h.y - 20) { const alt = Math.round(c.scrollTop); c.scrollTop = h.y; messZeile(`zurückgestellt ${messId(h.f)} ${alt} → ${Math.round(c.scrollTop)}`); return; }
  }
  if (!c.style?.getPropertyValue('--platz') || !c.matches?.('.dlg-body, #app > .rolle') || kbOffen() || c.contains(document.activeElement)) return;
  const pad = platzVon(c), n = Math.ceil(c.scrollTop + c.clientHeight - (c.scrollHeight - pad));
  if (n <= 0) {
    c.style.removeProperty('--platz');
    messZeile(`platz weg ${messId(c)}`);
    if (dlgFest && c.closest('dialog') === dlg) { dlgFest = 0; placeDialogs(); }
  } else if (n < pad) platz(c, n);
}, { capture: true, passive: true });
// Jede Meldung von Safari (Tastatur auf und zu, sichtbarer Bereich verschoben): Rahmen und Fenster neu stellen, ohne dass ein Inhalt
// rutscht – vor dem Wachsen des Rahmens Platz geben, sonst kürzt der Browser den Rollstand. Das iPad-Fenster gleitet (0,25 s) mit.
// Schließt die Tastatur (iPad: Tastatur-Taste), gibt das Feld den Fokus ab – erneutes Antippen ist dann ein gewöhnliches.
function gemeldet() {
  const cs = [rolle.el, dlg.open ? dlg.querySelector('.dlg-body') : null].filter(Boolean), y = cs.map(c => c.scrollTop);
  const offen = kbOffen(), f = document.activeElement, feld = f?.matches?.(FELD) ? f : null;
  if (dlg.open && !isPhone()) { dlg.classList.add('gleitet'); clearTimeout(gemeldet.t); gemeldet.t = setTimeout(() => dlg.classList.remove('gleitet'), 300); }
  cs.forEach(c => { if (platzVon(c)) platz(c, 2000); });
  placeDialogs();
  cs.forEach((c, i) => { if (platzVon(c)) { c.scrollTop = y[i]; knapp(c); } });
  if (offen && feld) { kbMerken(feld); feldZeigen(feld); }
  if (kbWar && !offen) {
    if (feld) feld.blur();
    if (nachKb) { const fn = nachKb; nachKb = null; fn(); }
  }
  kbWar = offen;
}
if (window.visualViewport) ['resize', 'scroll'].forEach(t => visualViewport.addEventListener(t, gemeldet));
// Seit 4.28.1 (A-36, 6n): ‚Nach oben / Ans Ende‘ bei offener Tastatur – das Antippen schließt die Tastatur; gerollt wird erst danach
// (sonst bricht der Ausgleich beim Schließen das sanfte Rollen ab und es braucht ein zweites Antippen), spätestens nach 600 ms.
function nachTastatur(fn) {
  if (!kbOffen()) return fn();
  nachKb = fn;
  setTimeout(() => { if (nachKb === fn) { nachKb = null; fn(); } }, 600);
}

/* ---------- Messmodus (seit 4.26.0, A-27, R-1.6) ---------- */

// Zeichnet am Gerät auf, was Safari beim Rollen und Tippen tut, damit Claude misst statt rät: je Bild eine Zeile, nur wenn
// sich ein Wert geändert hat, dazu jedes Ereignis sofort mit den Werten in diesem Augenblick. Aus, solange nicht gestartet
// (kein requestAnimationFrame, keine Hörer); nichts wird gespeichert (neu laden verwirft die Messung); keine Texte – vom
// Eingabefeld nur die Länge, von Schaltflächen und Fokus nur die id. Endet von selbst nach 5 Minuten oder 20 000 Zeilen.
// Die App setzt messungMenuItems({ app, teile, rollen }) ins Mehr-Menü der Seitenleiste: teile = { Spalte: Selektor } (Oberkante
// des ersten sichtbaren Elements), rollen = { Spalte: Selektor } (scrollTop eines eigenen Rollbereichs).
const MESS_MAX_MS = 5 * 60e3, MESS_MAX_ZEILEN = 20000;
let mess = null;
const messSicht = sel => [...document.querySelectorAll(sel)].find(e => e.getClientRects().length);
const messId = e => !e || e === document.body ? '-' : e.id || e.tagName.toLowerCase();
// seit 4.30.1 (A-67): Ziel einer Berührung ohne Texte – id bzw. Tag mit Klassen und Rolle, dazu das antippbare Element darum
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
    sy: r(scrollY), inh: rolle.el ? r(rolle.el.scrollTop) : '-', sh: document.documentElement.scrollHeight, ih: innerHeight, vh: vv ? r(vv.height) : '-', vt: vv ? r(vv.offsetTop) : '-',
    vvtop: parseInt(document.documentElement.style.getPropertyValue('--vv-top')) || 0 };
  for (const [k, sel] of Object.entries(mess.teile)) { const e = messSicht(sel); w[k] = e ? r(e.getBoundingClientRect().top) : '-'; }
  for (const [k, sel] of Object.entries(mess.rollen)) { const e = messSicht(sel); w[k] = e ? r(e.scrollTop) : '-'; }
  w.fokus = messId(document.activeElement);
  w.lage = innerWidth > innerHeight ? 'quer' : 'hoch';
  return w;
}
function messZeile(ereignis) {
  if (!mess?.an) return;
  const t = Math.round(performance.now() - mess.start), w = messWerte(), werte = Object.values(w).join(' ');
  if (!ereignis && werte === mess.zuletzt) return;
  mess.zuletzt = werte;
  mess.zeilen.push([t, ...Object.values(w)].map(v => String(v).padEnd(6)).join(' ').trimEnd() + (ereignis ? '   ! ' + ereignis : ''));
  if (t > MESS_MAX_MS || mess.zeilen.length >= MESS_MAX_ZEILEN) messAus('Grenze erreicht');
}
const messEreignis = e => messZeile(e);
function messBild() { if (!mess?.an) return; messZeile(); mess.bild = requestAnimationFrame(messBild); }
function messAus(grund) {
  if (!mess?.an) return;
  mess.an = false;
  cancelAnimationFrame(mess.bild);
  mess.hoerer.forEach(([z, typ, fn]) => z.removeEventListener(typ, fn, true));
  mess.zeilen.push(`# Ende nach ${Math.round((performance.now() - mess.start) / 1000)} s${grund ? ' · ' + grund : ''}`);
}
function messStart({ app = '', teile = {}, rollen = {} } = {}) {
  messAus();
  const st = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  mess = { an: true, start: performance.now(), beginn: new Date(), teile, rollen, zeilen: [], zuletzt: '', hoerer: [] };
  mess.zeilen.push(`# Messung · ${app} · AppDesign ${AD_VERSION} · ${navigator.userAgent} · ${st ? 'Home-Bildschirm' : 'Safari'} · ${screen.width}×${screen.height} @${devicePixelRatio} · ${
    // seit 4.29.0 (A-63 S-8): die sicheren Ränder des Geräts (oben/unten/links/rechts) – so kennen die Prüfungen die echten Werte
    (r => `Ränder ${r.top}/${r.bottom}/${r.left}/${r.right}`)(safeRand())} · ${
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dunkel' : 'hell'} · ${mess.beginn.toISOString()}`);
  mess.zeilen.push(['t', ...Object.keys(messWerte())].map(v => v.padEnd(6)).join(' ').trimEnd());
  const hoere = (z, typ, text) => { if (!z) return; const fn = e => { const t = text(e); if (t) messEreignis(t); }; z.addEventListener(typ, fn, true); mess.hoerer.push([z, typ, fn]); };
  hoere(document, 'focusin', e => 'focus ' + messId(e.target));   // seit 4.28.1: der neue Fokus (R-4.5) steht als ‚neu fokussiert‘ da
  hoere(document, 'focusout', e => 'blur ' + messId(e.target));
  hoere(document, 'input', e => 'eingabe ' + (e.target.value?.length ?? 0));
  hoere(document, 'click', e => 'tippen ' + messId(e.target.closest('button, a, input, [role=menuitem]')));
  hoere(window, 'scroll', e => 'scroll' + (e.target === document ? '' : ' ' + messId(e.target)));
  hoere(window, 'orientationchange', () => 'drehen');
  hoere(window, 'resize', () => 'resize');
  hoere(window.visualViewport, 'resize', () => 'vv resize');
  hoere(window.visualViewport, 'scroll', () => 'vv scroll');
  // seit 4.30.1 (A-67): Berührungen – Zeiger mit Lage (px), Art und Ziel, Bewegung nur bei gedrücktem Zeiger; touchcancel mit der
  // Zahl der Finger. Die Entscheidungen der Gestenstelle (‚nav …‘) stehen im selben Augenblick davor (sie hört zuerst).
  const zeiger = (art, e) => `zeiger ${art} ${Math.round(e.clientX)} ${Math.round(e.clientY)} ${e.pointerType || '-'}${e.isPrimary ? '' : ' neben'} ${messZiel(e.target)}`;
  hoere(document, 'pointerdown', e => zeiger('down', e));
  hoere(document, 'pointermove', e => e.buttons ? zeiger('move', e) : '');
  hoere(document, 'pointerup', e => zeiger('up', e));
  hoere(document, 'pointercancel', e => zeiger('cancel', e));
  hoere(document, 'touchcancel', e => `touchcancel ${e.changedTouches?.length ?? 0} ${messZiel(e.target)}`);
  // seit 4.30.2 (A-67): ob Safari das Rollen noch erlaubt – ‚touchmove frei‘, ‚verhindert‘ (die Geste hält den Finger) bzw. ‚fest‘
  // (nicht mehr verhinderbar, Safari rollt); nur beim Wechsel, jede Berührung beginnt neu
  hoere(document, 'pointerdown', () => { mess.tm = ''; return ''; });
  hoere(document, 'touchmove', e => { const z = e.cancelable ? e.defaultPrevented ? 'verhindert' : 'frei' : 'fest'; if (z === mess.tm) return ''; mess.tm = z; return 'touchmove ' + z; });
  messZeile('start');
  mess.bild = requestAnimationFrame(messBild);
}
const messName = d => `messung-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${
  String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}.txt`;
// Beenden und teilen: bricht man das Teilen-Menü ab, bleibt die Messung und kann noch einmal geteilt werden.
async function messTeilen() {
  messAus();
  const res = await shareFiles([{ name: messName(mess.beginn), content: mess.zeilen.join('\n') + '\n', type: 'txt' }]);
  if (res === 'shared' || res === 'downloaded') mess = null;
  return res;
}
function messungMenuItems(opt) {
  if (!mess) return [{ icon: 'activity', label: 'Messung starten', sub: 'Für Claude: Bewegungen aufzeichnen', act: () => messStart(opt) }];
  const s = Math.round((performance.now() - mess.start) / 1000), n = mess.zeilen.length - 2;
  return [{ icon: 'circle-stop', label: 'Messung beenden und teilen', act: messTeilen,
    sub: `${mess.an ? 'läuft' : 'beendet'} · ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} · ${n.toLocaleString('de-DE')} Zeilen` }];
}
