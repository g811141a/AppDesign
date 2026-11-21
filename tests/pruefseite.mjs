// AppDesign 4.64.0 · tests/pruefseite.mjs – Bausteine auf der Prüfseite (APD-135 Paket 6 Schritt 2, APD-135/B-3.1, APD-135/U-32; Designrichtlinie 14 ‚Prüfen‘;
// Testfall-Liste arbeit/APD-135 Paket 6 Schritt 2 Vorschlag.md APD-135/E-2 bis E-12). Bausteine, die ohne den Inhalt einer App gleich laufen,
// prüft AppDesign auf der Prüfseite – der Vorlage (vorlage/index.html) derselben Fassung mit neutralen Daten –, ihre Werte auf der daraus
// abgeleiteten Mindestseite. Kein Playwright hier: die Hülle der App (tests/bausteine-pruefseite.mjs) übergibt es (pw) und den Ausgabeordner.
//   oeffneVorlage(p, { daten, fehler })  – Vorlage mit neutralen Daten (localStorage neueapp.v1); ui.js und design.css der Fassung, in der diese
//                                           Datei liegt (Arbeitsstand: v4/), über p.route – so passen die Pfade in Arbeitsstand und Fassung
//   oeffneMindestseite(p, { fehler })    – aus dem Text der Vorlage: <head>, #dlg, #msg, ui.js; das Skript der App durch Platzhalter ersetzt
//   checkWerte(p)                         – Gruppe A (8 Bausteine mit festen Beispielwerten) auf der Mindestseite; Meldungen ‚R-x.y <Baustein>: …‘
//   pruefseite(pw, { out, teil })         – ein Teil mit Ergebnis und Rückgabewert (pruefe.mjs): ‚werte‘ und seit B-3.2 (APD-135/E-7 bis E-11) die Abläufe
//                                           ‚messung‘ (ablaufMessung), ‚titel-blase‘ (ablaufTitelBlase), ‚titel-oben‘ (ablaufTitelOben), ‚schicht-oben‘
//                                           (ablaufSchichtOben) und ‚grossanzeige‘ (ablaufGrossanzeige) – bis Reiselogbuch 3.57.6 eigene Prüfdateien der App;
//                                           seit 4.65.0 (APD-135/B-3.3 Schritt 1, Testfall-Liste arbeit/APD-135 Paket 7 Schritt 1 Vorschlag.md APD-135/Q-1
//                                           bis Q-10) ‚menue‘ (ablaufMenue), ‚sprechblase‘ (ablaufSprechblase) und ‚fenster‘ (ablaufFenster)
// Gegenprobe (lauf.mjs --gegenprobe pruefseite): PRUEF_GEGENPROBE=pruefseite:<fall> schleust den Fehler eines Bausteins per Textersetzung in
// ui.js ein (wie gleitenGegenprobe in ablauf.mjs); der Teil muss mit der Meldung dieses Bausteins rot werden (GEGENPROBEN_PRUEFSEITE).
// Die Vorlage in der Fassung (fassung/X.Y.Z/vorlage/index.html) nennt ../fassung/X.Y.Z/… – geladen wird trotzdem nur, was p.route liefert.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pruefung, navFertig, warteBis, ruhe } from './pruefe.mjs';
import { createCheck } from './hig.mjs';
import { checkSync } from './abgleich.mjs';
import { checkSearchWords, langDruecken, checkMessung, sucheAuf, checkTitelBlase, titelLang, titelBlaseOffen, checkTitelOben, checkSafariKlick,
  checkSafariWischKlick, checkGleiten, checkSchichtOben, checkGrossanzeige, finger, checkWachsen, checkMehrKnopf, checkFokus, checkFokusZurueck, checkRuhig,
  checkDialogHead } from './ablauf.mjs';
import { lies as liesMessung, ansicht as messAnsicht } from './abspielen.mjs';
import { obenOhneKlick } from './safari.mjs';
import { checkContextMenus } from './kontextmenue.mjs';

const hier = path.dirname(fileURLToPath(import.meta.url));
// in der festen Fassung liegen ui.js und vorlage/ neben tests/, im Arbeitsstand ui.js unter v4/
const inFassung = existsSync(path.join(hier, '..', 'ui.js'));
const basis = inFassung ? path.join(hier, '..') : path.join(hier, '..', 'v4');
const VORLAGE = path.join(hier, '..', 'vorlage', 'index.html');
// Messdateien (Designrichtlinie 15.21) gehören nicht zur Fassung (nur Dateien direkt in tests/) – aus der Fassung liest der Ablauf sie aus
// AppDesign/tests/messungen/ (wie bisher die Prüfdatei der App)
const MESSUNGEN = inFassung ? path.join(hier, '..', '..', '..', 'tests', 'messungen') : path.join(hier, 'messungen');
const lies = f => readFileSync(f, 'utf8');
// Fassung, aus der geprüft wird: Ordnername (fassung/X.Y.Z) bzw. im Arbeitsstand die Version von v4/design.css
export const FASSUNG = inFassung ? path.basename(path.join(hier, '..')) : lies(path.join(basis, 'design.css')).match(/--ad-version:\s*"([\d.]+)"/)?.[1];
export const URSPRUNG = 'http://pruefseite.test/';
export const SPEICHER = 'neueapp.v1';

// Neutrale Daten: leer bzw. drei Einträge, der erste mit n Unterpunkten (APD-135/E-2: 60).
export function datenNeutral(n = 60) {
  const sub = Object.fromEntries(Array.from({ length: n }, (_, i) => [`u${String(i + 1).padStart(3, '0')}`,
    { text: i % 7 === 3 ? `Unterpunkt mit einem längeren Text, der in einer schmalen Spalte umbrechen muss (${i + 1})` : `Text ${i + 1}` }]));
  return { items: [
    { id: 'a1', title: 'Erster Eintrag', sub },
    { id: 'b2', title: 'Zweiter Eintrag', sub: { u001: { text: 'Café Crème in Zürich' }, u002: { text: 'Rundgang' } } },
    { id: 'c3', title: 'Dritter Eintrag mit einem langen Titel, der in der Seitenleiste umbricht', sub: {} }], deleted: [], settings: { appearance: 'auto', lastItem: 'a1' } };
}
export const DATEN_LEER = { items: [], deleted: [], settings: { appearance: 'auto' } };

// Je Baustein der Gruppe A ein Fehler (APD-135/E-6): Ersetzungen in ui.js; zeichen = die Meldung, die rot werden muss.
const fall = (baustein, was, ersetze, zeichen = new RegExp(`R-\\d+\\.\\d+ ${baustein}: `)) => ({ baustein, was, ersetze, zeichen });
export const GEGENPROBEN_PRUEFSEITE = { werte: {
  version: fall('Version', 'AD_VERSION falsch', [[/const AD_VERSION = '[\d.]+';/, "const AD_VERSION = '0.0.0';"]]),
  icons: fall('Icons', 'Icon ohne aria-hidden', [['viewBox="0 0 24 24" aria-hidden="true"${name', 'viewBox="0 0 24 24"${name']]),
  leer: fall('Leerer Zustand', 'Titel nicht als Überschrift', [['<h3>${esc(titel)}</h3>', '<b>${esc(titel)}</b>']]),
  hilfen: fall('Hilfen', 'Tausenderkomma statt -punkt', [[".replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.')", ".replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')"]]),
  suche: fall('Suche', 'markWords markiert nicht', [['m => `<mark>${m}</mark>`', 'm => m']]),
  teilen: fall('Teilen', 'Kopfverlauf endet nicht in #d9d9d9', [['#e9e9e9 75%, #d9d9d9 100%', '#e9e9e9 75%, #e9e9e9 100%']]),
  backup: fall('Backup', 'readBackup lässt savedAt in den Daten', [['delete data.savedAt; delete data.savedOn;', '']]),
  abgleich: fall('Abgleich', 'ältere Änderung gewinnt', [['const useR = ra > la ||', 'const useR = ra < la ||']]),
  // seit 4.66.0 (APD-136/V-3, V-5)
  subat: fall('Abgleich', 'createSync ohne Standardwert für subAt', [['subAt = `${sub}At`, maxFields', 'subAt, maxFields']]),
  iconname: fall('Icons', 'ic(\'gibtsnicht\') im Code von ui.js', [["${ic('x')}</button></div>\n          <div class=\"mid\"><h3 id=\"msgTitel\">", "${ic('gibtsnicht')}</button></div>\n          <div class=\"mid\"><h3 id=\"msgTitel\">"]]),
},
// B-3.2 (APD-135/E-12): je Ablauf ein Fehler, der den alten Fehler nachbildet; derselbe muss auch die bisherige Prüfdatei der App rot machen
// (Nachweis-Tabelle im CHANGELOG). zeichen = die Meldung des Ablaufs.
messung: {
  eingabeText: fall('Messung', 'Messdatei zeichnet den eingegebenen Text auf statt seiner Länge (Datenschutz)',
    [["hoere(document, 'input', e => 'eingabe ' + (e.target.value?.length ?? 0));", "hoere(document, 'input', e => 'eingabe ' + (e.target.value ?? ''));"]],
    /R-1\.6 Datei enthält den Text ‚Rom‘/),
},
'titel-blase': {
  keineBlase: fall('Titel-Blase', 'langes Drücken auf den gekürzten Titel zeigt keine Sprechblase',
    [['    zeigeTitelBlase(t);\n  }, 600) };', '  }, 600) };']], /R-2\.5 .*(keine Sprechblase|Sprechblase fehlt|ohne Sprechblase)/),
},
'titel-oben': {
  hoererWindow: fall('Titel antippen', 'Hörer von ‚Titel antippen‘ am window statt am document (Safari schickt den Klick nicht)',
    [["document.addEventListener('click', e => {\n  const start = titelTipp;", "window.addEventListener('click', e => {\n  const start = titelTipp;"]], /R-2\.7 .*H-1/),
},
'schicht-oben': {
  loslassen: fall('Sperrschicht', 'Sperrschicht schließt nicht beim Loslassen (nur mit Klick)',
    [['    klickVerschlucken(e.clientX, e.clientY);\n    schliessen();\n  });', '  });']], /APD-118\/X-1 Tipp bei y \d+ ohne Klick über #mainMore schließt das Menü nicht/),
},
grossanzeige: {
  ohneAusloesen: fall('Großanzeige', 'Loslassen über einer Schaltfläche löst sie nicht aus',
    [['if (k && !k.disabled) { grossSelbst = true;', 'if (false && k && !k.disabled) { grossSelbst = true;']], /R-2\.6 .*L-8/),
},
// B-3.3 Schritt 1 (APD-135/Q-9, seit 4.65.0): je Teil ein Fehler, den bis Reiselogbuch 3.57.7 die bisherige Prüfung der App fand (ablauf-markierung-menues
// bzw. regeln-ablauf; Nachweis-Tabelle im CHANGELOG). zeichen = die Meldung der Prüffunktion.
menue: {
  mehrWaagrecht: fall('Mehr-Schaltfläche', 'Mehr-Schaltfläche kippt bei offenem Menü nicht (bleibt waagrecht)',
    [["if (s) s.innerHTML = ICONS[offen ? 'ellipsis-vertical' : 'ellipsis'];", "if (s) s.innerHTML = ICONS['ellipsis'];"]],
    /R-4\.1 APD-87\/E-1: Mehr-Schaltfläche bei offenem Menü nicht mit drei senkrechten Punkten/),
  menueWaechstNicht: fall('Menü', 'Menü wächst nicht aus seiner Schaltfläche (erscheint ohne Bewegung)',
    [['  wachsen(menu, anchor);   // R-4.13', '  // R-4.13']], /R-4\.13 APD-62\/M-[17] Menü #/),
  // seit 4.67.0 (APD-143, Gegenprobe zu L-1 und L-2): das alte Rollen – die Liste rückt, damit das Menü unter der Kachel Platz hat
  listeRueckt: fall('Kontextmenü', 'die Liste rückt für das Menü unter der Kachel (bis 4.66.0), statt es darüber zu stellen',
    [['    if (r.bottom + 8 + el.offsetHeight <= limit || r.top - 8 - el.offsetHeight >= T) {', '    if (r.bottom + 8 + el.offsetHeight <= limit) {']],
    /R-4\.2 APD-143\/L-[12] /),
},
sprechblase: {
  blaseWaechstNicht: fall('Sprechblase', 'Sprechblase wächst nicht aus ihrer Schaltfläche (erscheint ohne Bewegung)',
    [['    wachsen(pop, visible ? anchor : null);', '']], /R-4\.13 APD-62\/M-[17] Sprechblase/),
},
fenster: {
  haekchenGrau: fall('Fenster', 'Häkchen wird nach einer Änderung nicht blau',
    [["dlg.querySelector('#dlgOk')?.classList.toggle('primary', Boolean(dlgDirty?.()));", "dlg.querySelector('#dlgOk')?.classList.toggle('primary', false);"]],
    /R-4\.4 Häkchen wird nach einer Änderung nicht blau/),
  // seit 4.67.0 (APD-136, AD-Bean sourcehighlight, Gegenprobe zu S-9 und S-10)
  quelleNichtGetoent: fall('Hervorgehobene Quelle', 'sourceItem tönt die Quelle nicht (ohne on)',
    [["  const toenen = item => finde(item)?.classList.add('on');", "  const toenen = item => {};"]], /APD-136\/S-9 /),
  releaseGibtNichtFrei: fall('Hervorgehobene Quelle', 'release gibt die Quelle nicht frei',
    [["release(item) { if (!item || !gehalten.delete(item)) return; freigeben(item);", "release(item) { if (!item || !gehalten.delete(item)) return;"]], /APD-136\/S-10 /),
} };
const gpFall = () => (process.env.PRUEF_GEGENPROBE || '').match(/^pruefseite:(.+)$/)?.[1] || null;
const gpSuche = name => name && Object.values(GEGENPROBEN_PRUEFSEITE).map(t => t[name]).find(Boolean);
const gegenFehlt = [];

// ui.js mit eingeschleustem Fehler; eine Stelle, die nicht genau einmal vorkommt, wird gemeldet (die Gegenprobe wäre sonst wertlos).
function uiText(fehler) {
  let t = lies(path.join(basis, 'ui.js'));
  const g = gpSuche(fehler);
  if (fehler && !g) gegenFehlt.push(`unbekannter Fehler ‚${fehler}‘`);
  for (const [alt, neu] of g?.ersetze || []) {
    const n = typeof alt === 'string' ? t.split(alt).length - 1 : (t.match(new RegExp(alt.source, 'g')) || []).length;
    if (n !== 1) { gegenFehlt.push(`${g.baustein}: Stelle ${String(alt).slice(0, 60)} ${n}-mal`); continue; }
    t = t.replace(alt, () => neu);
  }
  return t;
}

// Mindestseite aus dem Text der Vorlage (APD-135/E-4): <head>, #dlg, #msg und ui.js bleiben, das Skript der App wird durch die Platzhalter
// ersetzt, die ui.js braucht (db, save, render), und ein globales sync für checkSync – seit 4.66.0 ohne subAt (Standardwert `${sub}At`, APD-136 b2,
// APD-136/V-3; ohne Standardwert landen die Zeitpunkte der Unterpunkte unter ‚undefined‘ und der Abgleichbericht zeigt sie als Feld, R-9.4).
// Fehlt #dlg oder #msg, wirft sie.
export function mindestseiteHtml(vorlage = lies(VORLAGE)) {
  const teil = (re, was) => { const m = vorlage.match(re); if (!m) throw new Error(`Mindestseite: der Vorlage fehlt ${was}`); return m[0]; };
  const head = teil(/<head>[\s\S]*?<\/head>/, '<head>');
  const dlg = teil(/<dialog id="dlg"[^>]*><\/dialog>/, '#dlg'), msg = teil(/<dialog id="msg"[^>]*><\/dialog>/, '#msg');
  const ui = teil(/<script src="[^"]*ui\.js"><\/script>/, 'ui.js');
  return `<!doctype html>\n<html lang="de">\n${head}\n<body>\n${dlg}\n${msg}\n${ui}\n<script>\n'use strict';\n` +
    "let db = { settings: { appearance: 'auto' } }; function save() {} function render() {}\nconst sync = createSync({ list: 'items', sub: 'sub' });\n</script>\n</body>\n</html>\n";
}

// Prüfseite über einen eigenen Ursprung (http://pruefseite.test/), damit localStorage gilt und p.route jede Datei liefern kann.
async function bereite(p, fehler, seite) {
  await p.route(u => u.href.startsWith(URSPRUNG), r => {
    const u = new URL(r.request().url());
    if (u.pathname === '/vorlage/index.html') return r.fulfill({ contentType: 'text/html; charset=utf-8', body: lies(VORLAGE) });
    if (u.pathname === '/vorlage/mindestseite.html') return r.fulfill({ contentType: 'text/html; charset=utf-8', body: seite });
    if (u.pathname.endsWith('/ui.js')) return r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: uiText(fehler) });
    if (u.pathname.endsWith('/design.css')) return r.fulfill({ contentType: 'text/css; charset=utf-8', body: lies(path.join(basis, 'design.css')) });
    return r.fulfill({ status: 404, body: '' });
  });
}
export async function oeffneVorlage(p, { daten = datenNeutral(), fehler = gpFall() } = {}) {
  await bereite(p, fehler, '');
  // die Daten nur beim ersten Laden setzen – ein Neuladen behält, was die Seite gespeichert hat
  await p.addInitScript(([k, d]) => { if (!sessionStorage.getItem('__pruefDaten')) { localStorage.setItem(k, d); sessionStorage.setItem('__pruefDaten', '1'); } },
    [SPEICHER, JSON.stringify(daten)]);
  await p.goto(URSPRUNG + 'vorlage/index.html');
  await p.waitForFunction(() => document.querySelector('#side:not([hidden]), #app #bar'), null, { timeout: 5000 }).catch(() => {});
  return p;
}
export async function oeffneMindestseite(p, { fehler = gpFall() } = {}) {
  await bereite(p, fehler, mindestseiteHtml());
  await p.goto(URSPRUNG + 'vorlage/mindestseite.html');
  return p;
}

// Gruppe A (APD-135/E-3 bis E-5): Werte der Bausteine auf der Mindestseite – je Baustein feste Beispiele.
export async function checkWerte(p) {
  const errors = [], E = (regel, baustein, t) => errors.push(`${regel} ${baustein}: ${t}`);
  for (const f of gegenFehlt.splice(0)) E('R-10.3', 'Gegenprobe', f);
  // Mindestseite: nur #dlg, #msg, Platzhalter und sync; ohne #dlg wirft die Ableitung
  const m = await p.evaluate(() => ({ dlg: !!document.getElementById('dlg'), msg: !!document.getElementById('msg'), app: !!document.getElementById('app'),
    sync: typeof sync === 'object' && !!sync.config, db: typeof db === 'object' }));
  if (!m.dlg || !m.msg || m.app || !m.sync || !m.db) E('R-10.3', 'Mindestseite', `Aufbau ${JSON.stringify(m)}, soll #dlg, #msg, db, sync und kein #app`);
  let wirft = '';
  try { mindestseiteHtml(lies(VORLAGE).replace(/<dialog id="dlg"[^>]*><\/dialog>/, '')); } catch (e) { wirft = e.message; }
  if (!/fehlt #dlg/.test(wirft)) E('R-10.3', 'Mindestseite', `Vorlage ohne #dlg ergibt keinen Fehler (${wirft || 'keiner'})`);

  // Version (R-10.3): AD_VERSION = --ad-version = Fassung; die Vorlage braucht dieselbe (AD_NEEDED)
  const v = await p.evaluate(() => ({ js: typeof AD_VERSION === 'string' ? AD_VERSION : '–',
    css: getComputedStyle(document.documentElement).getPropertyValue('--ad-version').trim().replace(/"/g, '') }));
  if (v.js !== FASSUNG || v.css !== FASSUNG) E('R-10.3', 'Version', `AD_VERSION ${v.js}, --ad-version ${v.css || '–'}, soll beide ${FASSUNG}`);
  const needed = lies(VORLAGE).match(/const AD_NEEDED = '([\d.]+)'/)?.[1];
  if (needed !== FASSUNG) E('R-10.3', 'Version', `Vorlage braucht AppDesign ${needed || '–'}, soll ${FASSUNG}`);

  const r = await p.evaluate(() => {
    const dom = html => { const d = document.createElement('div'); d.innerHTML = html; return d; };
    const svg = html => { const d = dom(html), s = d.firstElementChild;
      return { n: d.childNodes.length, tag: s?.tagName.toLowerCase(), ic: !!s?.classList.contains('ic'), hidden: s?.getAttribute('aria-hidden'), pfade: s?.querySelectorAll('path, circle, rect').length || 0 }; };
    const leer = html => { const d = dom(html).firstElementChild;
      return { cls: d?.className, sym: !!d?.querySelector(':scope > svg.ic.sym[aria-hidden="true"]'), h3: d?.querySelector(':scope > h3')?.textContent ?? null,
        p: d?.querySelector(':scope > p')?.textContent ?? null, knopf: d?.querySelector(':scope > button.leer-knopf')?.id ?? null, knopfText: d?.querySelector(':scope > button')?.textContent ?? null }; };
    const datei = backupFileOf('Neue App', { items: [{ id: 'x', title: 'A & B', sub: { u001: { text: '„Zitat“ 👍🏽' } } }], deleted: [] });
    const tag = 864e5;
    return {
      icon: svg(ic('pencil')), iconUnbekannt: (() => { const alt = console.error; let meldung = ''; console.error = (...a) => { meldung = a.join(' '); };
        try { return { html: ic('gibt-es-nicht'), meldung }; } finally { console.error = alt; } })(), symbole: Object.keys(ICONS), ellipsis: dom(ic('ellipsis')).firstElementChild?.hasAttribute('data-mehr'),
      leer: leer(leerHtml({ icon: 'calendar', titel: 'Noch nichts <b>', satz: 'Ein Satz & mehr.', aktion: { id: 'leerNeu', label: 'Neu' } })),
      leerKlein: leer(leerHtml({ icon: 'book-open', titel: 'Noch kein Eintrag', klein: true })), leerSuche: leer(leerSuche('a<b')),
      esc: esc(`<a href="x">&'`), escLeer: esc(null), breakable: [breakable('kurz'), breakable('a'.repeat(22)), breakable('🤷🏻‍♂️'.repeat(21))],
      iconText: iconText('☀️', 'Sonne & Mond'), aufz: aufzaehlung(['8×☀️', ['Hotel Krone', '(120,00 €)'], 'Ende']),
      thousands: [thousands(4850), thousands(1234567), thousands('12'), thousands(999.6)], money: [money(4850), money(0.5), money(1234.567), money('x')],
      euro: [formatEuro(4850), formatEuro(0)],
      mark: [markWords('Café Crème in Zürich', searchWords('cafe zurich')), markWords('Sydney', []), markWords('A &amp; B', searchWords('&'))],
      css: outputCss('.rt'), share: ['shared', 'downloaded', 'aborted', 'error'].map(k => shareResultText(k, 'Neue App 2026.11.19 10.05.html')),
      datei: { name: datei.name, type: datei.type, content: datei.content },
      kachel: { heute: backupTileHtml(Date.now()), alt: backupTileHtml(Date.now() - 3 * tag), nie: backupTileHtml(0), leer: backupTileHtml(0, true) },
    };
  });
  // Icons (R-1.8): svg.ic mit aria-hidden; unbekannter Name gibt kein kaputtes Markup (genau ein svg, nichts daneben)
  if (r.icon.n !== 1 || r.icon.tag !== 'svg' || !r.icon.ic || r.icon.hidden !== 'true' || !r.icon.pfade) E('R-1.8', 'Icons', `ic('pencil') ergibt ${JSON.stringify(r.icon)}, soll ein svg.ic mit aria-hidden="true" und Pfaden`);
  // seit 4.66.0 (APD-136/V-4): ein unbekannter Name gibt kein svg und einen Konsolenfehler mit dem Namen
  if (r.iconUnbekannt.html !== '' || !/ic: unbekanntes Symbol ‚gibt-es-nicht‘/.test(r.iconUnbekannt.meldung)) E('R-1.8', 'Icons', `ic('gibt-es-nicht') ergibt ‚${r.iconUnbekannt.html.slice(0, 80)}‘ mit Meldung ‚${r.iconUnbekannt.meldung}‘, soll kein svg und ‚ic: unbekanntes Symbol ‚gibt-es-nicht‘‘`);
  // seit 4.66.0 (APD-136/V-5): jeder Name in ic('…') in ui.js (wie die Seite es lädt), in der Vorlage und in der App steht in ICONS
  const quellen = [['ui.js', await p.evaluate(async () => (await fetch(document.querySelector('script[src$="ui.js"]').src)).text())], ['Vorlage', lies(VORLAGE)]];
  const appHtml = path.join(process.cwd(), 'index.html');
  if (existsSync(appHtml) && /AD_NEEDED/.test(readFileSync(appHtml, 'utf8'))) quellen.push(['App', readFileSync(appHtml, 'utf8')]);
  for (const [wo, text] of quellen) for (const n of new Set([...text.matchAll(/\bic\('([\w-]+)'/g)].map(m => m[1])))
    if (!r.symbole.includes(n)) E('R-1.8', 'Icons', `${wo}: ic('${n}') – das Symbol steht nicht in ICONS`);
  if (!r.ellipsis) E('R-1.8', 'Icons', 'ic(\'ellipsis\') ohne data-mehr (Mehr-Schaltfläche kippt nicht, R-4.1)');
  // Leerer Zustand (R-7.7): Symbol, Titel als Überschrift, Satz, getönte Schaltfläche; klein nur Symbol und Titel; Suche mit dem Begriff als Text
  const L = r.leer;
  if (L.cls !== 'leer' || !L.sym || L.h3 !== 'Noch nichts <b>' || L.p !== 'Ein Satz & mehr.' || L.knopf !== 'leerNeu' || L.knopfText !== 'Neu')
    E('R-7.7', 'Leerer Zustand', `leerHtml ergibt ${JSON.stringify(L)}`);
  if (r.leerKlein.cls !== 'leer klein' || !r.leerKlein.sym || r.leerKlein.h3 !== 'Noch kein Eintrag' || r.leerKlein.p !== null || r.leerKlein.knopf !== null)
    E('R-7.7', 'Leerer Zustand', `leerHtml klein ergibt ${JSON.stringify(r.leerKlein)}`);
  if (r.leerSuche.cls !== 'leer suche' || !r.leerSuche.sym || r.leerSuche.h3 !== 'Keine Treffer für ‚a<b‘' || !r.leerSuche.p)
    E('R-7.7', 'Leerer Zustand', `leerSuche ergibt ${JSON.stringify(r.leerSuche)}`);
  // Hilfen: esc (R-10.1), breakable (R-6.3), iconText und aufzaehlung (R-10.5), Beträge ‚4.850,00 €‘ (R-5.1)
  if (r.esc !== '&lt;a href=&quot;x&quot;&gt;&amp;&#39;' || r.escLeer !== '') E('R-10.1', 'Hilfen', `esc ergibt ‚${r.esc}‘ bzw. ‚${r.escLeer}‘`);
  const [bk, ba, bs] = r.breakable;
  if (bk !== 'kurz' || ba !== 'a'.repeat(22).split('').join('​') || bs.split('​').length !== 21 || bs.replaceAll('​', '') !== '🤷🏻‍♂️'.repeat(21))
    E('R-6.3', 'Hilfen', `breakable bricht nicht nach jedem Zeichen eines langen Worts (${JSON.stringify(r.breakable.map(x => x.split('​').length))})`);
  if (r.iconText !== '<span class="ict">☀️ Sonne &amp; Mond</span>') E('R-10.5', 'Hilfen', `iconText ergibt ‚${r.iconText}‘`);
  if (r.aufz !== '<span class="ict az">8×☀️<span class="az-n"> ·</span></span> <span class="ict az">Hotel Krone<span class="az-n"> (120,00 €) ·</span></span> <span class="ict az">Ende</span>')
    E('R-10.5', 'Hilfen', `aufzaehlung ergibt ‚${r.aufz}‘`);
  const soll = { thousands: ['4.850', '1.234.567', '12', '1.000'], money: ['4.850,00', '0,50', '1.234,57', '0,00'], euro: ['4.850,00 €', '0,00 €'] };
  for (const k of Object.keys(soll)) if (JSON.stringify(r[k]) !== JSON.stringify(soll[k])) E('R-5.1', 'Hilfen', `${k} ergibt ${JSON.stringify(r[k])}, soll ${JSON.stringify(soll[k])}`);
  // Suche (R-2.3): Wörter, „…“, Akzente (wie ablauf-suche-woerter) und markWords
  for (const f of await checkSearchWords(p)) E('R-2.3', 'Suche', f.replace(/^R-2\.3 /, ''));
  if (r.mark[0] !== '<mark>Café</mark> Crème in <mark>Zürich</mark>' || r.mark[1] !== 'Sydney' || r.mark[2] !== 'A <mark>&amp;</mark> B')
    E('R-2.3', 'Suche', `markWords ergibt ${JSON.stringify(r.mark)}`);
  // Teilen: Mustertabelle (R-6.2) und Hinweisfenster mit Dateinamen (R-10.8)
  for (const s of ['.rt { font: 11pt/1.4', '.rt table.grid thead th { background: linear-gradient(to bottom, #ffffff 0%, #ffffff 25%, #f6f6f6 50%, #e9e9e9 75%, #d9d9d9 100%)',
    '.rt table.grid tbody tr:nth-child(even) { background: #f5f5f5; }', '.rt table.grid tr { break-inside: avoid; }', 'border: 1px solid #999'])
    if (!r.css.includes(s)) E('R-6.2', 'Teilen', `outputCss ohne ‚${s}‘`);
  const fname = '<b class="fname"><span class="fw">Neue</span> <span class="fw">App</span> <span class="fw">2026.11.19</span> <span class="fw">10.05.html</span></b>';
  r.share.forEach((t, i) => { if (!t.startsWith(i < 2 ? '✅ ' : '⚠️ ') || !t.includes(fname)) E('R-10.8', 'Teilen', `shareResultText(${['shared', 'downloaded', 'aborted', 'error'][i]}) ergibt ‚${t.slice(0, 160)}‘`); });
  // Backup: Dateiname (R-10.7), backupFileOf → readBackup ergibt dieselben Daten (R-9.1), Backup-Kachel heute/alt/nie/leer (R-9.1)
  if (!/^Ω Backup Neue App \d{4}\.\d{2}\.\d{2} \d{2}\.\d{2}\.json$/.test(r.datei.name) || r.datei.type !== 'json') E('R-10.7', 'Backup', `Dateiname ‚${r.datei.name}‘ (${r.datei.type})`);
  const rund = await p.evaluate(async c => { try { const f = new File([c], 'b.json', { type: 'application/json' }); const x = await readBackup(f, 'items');
    let fremd = ''; try { await readBackup(new File(['{"trips":[]}'], 'c.json'), 'items'); } catch (e) { fremd = e.message; }
    return { data: x.data, at: typeof x.savedAt, on: typeof x.savedOn, fremd }; } catch (e) { return { fehler: e.message }; } }, r.datei.content);
  const sollDaten = { items: [{ id: 'x', title: 'A & B', sub: { u001: { text: '„Zitat“ 👍🏽' } } }], deleted: [] };
  if (rund.fehler || JSON.stringify(rund.data) !== JSON.stringify(sollDaten) || rund.at !== 'number' || rund.on !== 'string')
    E('R-9.1', 'Backup', `readBackup(backupFileOf(…)) ergibt ${JSON.stringify(rund).slice(0, 200)}, soll dieselben Daten mit savedAt und savedOn getrennt`);
  if (!/kein Backup dieser App/.test(rund.fremd || '')) E('R-9.1', 'Backup', `Backup einer anderen App wird gelesen (${rund.fremd || 'kein Fehler'})`);
  const K = r.kachel, kachel = t => /class="bhint"/.test(t) && /id="hintBackup"/.test(t);
  if (kachel(K.heute) || !kachel(K.alt) || !kachel(K.nie) || kachel(K.leer) || ![K.heute, K.alt, K.nie, K.leer].every(t => t.startsWith('<div class="side-foot">'))
    || !/Noch kein Backup erstellt\./.test(K.nie) || !/Letztes Backup erstellt am \d{2}\.\d{2}\.\d{4} um \d{2}:\d{2}/.test(K.alt))
    E('R-9.1', 'Backup', `backupTileHtml: Kachel heute ${kachel(K.heute)}, alt ${kachel(K.alt)}, nie ${kachel(K.nie)}, ohne Einträge ${kachel(K.leer)} – soll nur alt und nie`);
  // Abgleich (R-9.2 bis R-9.4): alle Fälle wie abgleich-regeln, mit sync der Mindestseite
  for (const f of await checkSync(p)) E((f.match(/^R-9\.\d/) || ['R-9.3'])[0], 'Abgleich', f.replace(/^R-9\.\d /, ''));
  return errors;
}

// APD-135/E-2: die Vorlage in iPad quer/hoch, iPhone hoch/quer, hell und dunkel, leer und mit 60 Unterpunkten – Grundregeln nach jedem Schritt
// (t.schritt), ohne Skriptfehler (pruefe.mjs meldet sie); dazu Menü, Kontextmenü, Fenster und Sprechblase im iPad quer und iPhone hoch.
async function vorlageAnsichten(t, b) {
  for (const ansicht of ['iPad quer', 'iPad hoch', 'iPhone hoch', 'iPhone quer']) for (const theme of ['light', 'dark']) for (const voll of [false, true]) {
    const p = await t.seite(b, ansicht, { theme });
    p.setDefaultTimeout(8000);   // ein Fehler soll nicht 30 s je Handlung hängen
    const wo = voll ? 'mit 60 Unterpunkten' : 'leer';
    await t.schritt(p, `Vorlage ${wo}`, () => oeffneVorlage(p, { daten: voll ? datenNeutral(60) : DATEN_LEER }));
    const phone = ansicht.startsWith('iPhone');
    if (voll) {
      t.ist(`Einträge in der Liste (${wo})`, await p.locator('#side .side-row').count(), 3, 'R-7.2');
      if (phone) await t.schritt(p, 'Eintrag öffnen', async () => { await p.click('#side .side-row[data-id="a1"]'); await p.waitForSelector('#app #back'); });
      t.ist(`Unterpunkte im Inhalt (${wo})`, await p.locator('#rolle [data-day]').count(), 60, 'R-7.4');
      if (theme === 'light' && (ansicht === 'iPad quer' || ansicht === 'iPhone hoch')) {
        await t.schritt(p, 'Mehr-Menü des Eintrags', () => p.click('#mainMore'));
        await t.schritt(p, 'Fenster ‚Eintrag bearbeiten‘', () => p.click('.menu .mi:has-text("Eintrag bearbeiten")'));
        await t.schritt(p, 'Fenster schließen', () => p.click('#dlgX'));
        await t.schritt(p, 'Sprechblase ‚Eintrag löschen‘', async () => { await p.click('#mainMore'); await p.click('.menu .mi:has-text("Eintrag löschen")'); });
        await t.schritt(p, 'Abbrechen', () => p.click('.pop button:has-text("Abbrechen")'));
        t.ist('nichts gelöscht', await p.evaluate(() => JSON.parse(localStorage.getItem('neueapp.v1')).items.length), 3, 'R-4.4');
      }
    } else t.ist(`leerer Zustand (${wo})`, await p.evaluate(() => document.querySelector('.leer h3')?.textContent ?? null), 'Noch kein Eintrag', 'R-7.7');
    await p.close();
  }
}

// ---------- B-3.2 (APD-135/E-7 bis E-11): die 5 Abläufe auf der Prüfseite ----------
// Dieselben Fälle wie bis 3.57.6 in den Prüfdateien des Reiselogbuchs (ablauf-messung, -titel-blase, -titel-oben, -schicht-oben, -grossanzeige),
// nur auf der Vorlage mit neutralen Daten (Einträge mit Unterpunkten). Was nur das Reiselogbuch hat (Datum im Fenstertitel, Reisetitel, ‚nichts
// gelöscht‘ an db.trips, ‚Neues Reiselogbuch‘ beim Start ohne Daten), prüft die App in tests/ablauf-bausteine.mjs; hier stehen neutrale Entsprechungen.
// Jede Funktion (t, b) nimmt die Prüfung (pruefe.mjs) und den Browser; Ansichten, Textgrößen, ‚Bewegung reduzieren‘ und Grundregeln wie bisher.
const RUHE = '!document.getAnimations().some(a => a.playState === "running")';
const KOPF = '#bar .nb-title, #bar .pnav-title', FTITEL = '#dlg .dlg-head h3';
const tag = n => `u${String(n).padStart(3, '0')}`;
// Einträge für einen Ablauf: [{ id, title, n (Anzahl Unterpunkte), text(i) }] – ohne Backup-Kachel (lastBackup heute), lastItem = erster Eintrag
export function datenEintraege(liste, lastItem = liste[0]?.id) {
  return { items: liste.map(({ id, title, n = 0, text = i => `Text ${i}` }) => ({ id, title, sub: Object.fromEntries(Array.from({ length: n }, (_, i) => [tag(i + 1), { text: text(i + 1) }])) })),
    deleted: [], settings: { appearance: 'auto', lastBackup: Date.now(), ...(lastItem ? { lastItem } : {}) } };
}
// Textgröße vor dem Laden (wie die Einstellung ‚Textgröße‘ am Gerät; html font-size)
const groesse = px => { const s = () => { const e = document.createElement('style'); e.textContent = `html { font-size: ${px}px !important; }`; document.documentElement.prepend(e); };
  if (document.documentElement) s(); else new MutationObserver((m, o) => { if (document.documentElement) { o.disconnect(); s(); } }).observe(document, { childList: true }); };
const zustand = p => p.evaluate(() => `Fenster ${document.getElementById('dlg')?.open ? 'offen' : 'zu'}, Meldung ${document.getElementById('msg')?.open ? 'offen' : 'zu'}, laufend: ${document.getAnimations().filter(a => a.playState === 'running').map(a => a.animationName || a.transitionProperty || a.effect?.target?.className || '?').join(', ') || '–'}`).catch(() => '?');
const bis = async (p, bedingung, was) => { const m = await warteBis(p, bedingung, { was, max: 10000 }); if (m) throw new Error(`${m} (${await zustand(p)})`); };
// Vorlage öffnen; am iPhone (Startliste) den Eintrag id öffnen. Gewartet wird auf Zustände (warteBis), nie fest.
async function vorlageStart(p, daten, id = daten.settings.lastItem) {
  await oeffneVorlage(p, { daten });
  await bis(p, `document.readyState === 'complete' && !!document.querySelector('#side .side-row, #shareBtn') && ${RUHE}`, 'Vorlage aufgebaut'); await navFertig(p);
  if (id && await p.evaluate(() => isPhone()) && await p.locator('#side.page').isVisible()) {
    await p.locator(`#side .side-row[data-id="${id}"]`).click(); await bis(p, `currentId === '${id}' && !phoneList && !!document.querySelector('#shareBtn') && ${RUHE}`, 'Eintrag offen'); await navFertig(p);
  }
}
const fensterAuf = async p => { await bis(p, `document.getElementById('dlg').open && ${RUHE}`, 'Fenster offen'); await navFertig(p); };
// Fenster zu: das close-Ereignis kommt später als close() – erst danach baut die Vorlage neu auf (render, auch die Seitenleiste); gewartet wird
// darauf, sonst ersetzt der Neuaufbau mitten im nächsten Schritt die Liste, die eine Prüfung gerade beobachtet
const zuFenster = async p => { await p.evaluate(() => { window.__dlgZu = false; dlg.addEventListener('close', () => setTimeout(() => { window.__dlgZu = true; }), { once: true });
  dlgDirty = () => false; dlg.close(); }); await bis(p, `window.__dlgZu && !document.getElementById('dlg').open && ${RUHE}`, 'Fenster zu'); await navFertig(p); };
// Inhalt eines Fensters zum Rollen: ist er zu kurz, verlängert ihn ein Platzhalter (nur in der Prüfung; Fenster der Vorlage haben ein Feld)
const fensterLang = p => p.evaluate(() => { const b = document.querySelector('#dlg .dlg-body'); if (b.scrollHeight - b.clientHeight < 400) { const d = document.createElement('div'); d.style.height = '1200px'; b.append(d); } });
const gespeichert = p => p.evaluate(k => JSON.parse(localStorage.getItem(k) || '{"items":[]}'), SPEICHER);

// APD-27/F-1 bis F-12 (R-1.6, checkMessung; seit APD-77 erst nach langem Drücken auf die Versionszeile): iPad quer, iPhone hoch dunkel, iPhone quer,
// je mit vielen Unterpunkten und leer. F10 leer: starten und teilen (neutral statt ‚Neues Reiselogbuch‘ beim Start – das prüft die App).
export async function ablaufMessung(t, b) {
  const daten = datenEintraege([{ id: 'a', title: 'Garten', n: 60, text: i => `Zitrone ${i} und Ausflug ans Meer` }, { id: 'b', title: 'Werkstatt' }]);
  for (const [w, h, cs, dev] of [[1180, 820, 'light', 'iPad quer'], [393, 852, 'dark', 'iPhone hoch dunkel'], [852, 393, 'light', 'iPhone quer']]) {
    for (const leer of [false, true]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: w < 700 || h < 500, colorScheme: cs, acceptDownloads: true });
      const p = await ctx.newPage(); t.ort = `${dev}${leer ? ' leer' : ''}`;
      p.setDefaultTimeout(10000);
      p.on('pageerror', e => t.fehler('', `Skriptfehler der Seite: ${e.message}`));
      try {
        await oeffneVorlage(p, { daten: leer ? DATEN_LEER : daten });
        await bis(p, `document.readyState === 'complete' && !!document.querySelector('#side .side-head') && ${RUHE}`, 'Vorlage aufgebaut'); await navFertig(p);
        const menu = async () => { if (!await p.locator('#sideMore').isVisible()) { await p.locator('#back, [data-side-toggle]').first().click(); await navFertig(p); await bis(p, RUHE, 'Seitenleiste offen'); } await p.click('#sideMore'); };
        if (leer) {   // F10: leere Vorlage – nach langem Drücken auf die Versionszeile starten, Menü zeigt ‚läuft‘, teilen liefert eine Datei
          await menu(); await bis(p, `!!document.querySelector('.menu .note.halten') && ${RUHE}`, 'Mehr-Menü offen');   // gemessen erst in der Endlage
          const v = await p.locator('.menu .note.halten').boundingBox();
          { const m = await langDruecken(p, { x: v.x + v.width / 2, y: v.y + v.height / 2 }, { ms: 900, offen: '.menu' }); if (m) throw new Error(m); }
          await p.locator('.menu .mi', { hasText: 'Messung starten' }).click(); await bis(p, '!!mess?.an', 'Messung läuft').catch(() => {});
          if (!await p.evaluate(() => mess?.an)) t.fehler('', 'R-1.6 leere Vorlage: ‚Messung starten‘ startet keine Messung');
          await menu(); await bis(p, `!!document.querySelector('.menu .mi') && ${RUHE}`, 'Mehr-Menü offen');
          const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }).catch(() => null), p.locator('.menu .mi', { hasText: 'Messung beenden und teilen' }).click()]);
          if (!dl) t.fehler('', 'R-1.6 leere Vorlage: ‚Messung beenden und teilen‘ liefert keine Datei');
        } else {
          const search = async () => { await sucheAuf(p, '#sideMore'); await bis(p, `!!document.querySelector('#lsearch') && ${RUHE}`, 'Suche offen'); return '#lsearch'; };
          t.liste(await checkMessung(p, { menu, search, secret: ['Garten', 'Werkstatt', 'Zitrone', 'Ausflug'], where: t.ort }));
        }
        await t.schritt(p, 'nach der Messung', async () => {});   // Grundregeln im Endzustand
      } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
      await ctx.close();
    }
  }
}

// APD-101/L-1 bis L-12 (R-2.5, checkTitelBlase): iPhone hoch bei größter Schrift (Text 53) – Kopfzeile (L-2), Fenster ‚Eintrag bearbeiten‘ (L-1),
// Fenster eines Unterpunkts (L-3, neutral: Titel ‚Unterpunkt 4‘), Titel mit 80 Zeichen (L-4); Antippen, Wandern, Rollen, Tipp daneben, Esc (L-6 bis L-10),
// L-8 neutral: nach den Tipps Fenster offen, Titel im Feld und gespeichert unverändert; Drehen (L-11); bei normaler Schrift in allen Ansichten zeigt
// ein ganz sichtbarer Titel (‚Kurz‘) nichts (L-5); Grundregeln nach jedem Schritt (L-12).
export async function ablaufTitelBlase(t, b) {
  const LANG = 'Ein sehr langer Titel eines Eintrags, der in keiner Kopfzeile und keinem Fenster Platz';   // 80 Zeichen
  const TITEL = 'Erster Eintrag mit Unterpunkten';
  const daten = id => datenEintraege([{ id: 'a', title: TITEL, n: 20, text: i => `Text ${i} am Hafen` }, { id: 'b', title: LANG }, { id: 'c', title: 'Kurz' }], id);
  // Die Fenstertitel der Vorlage (‚Eintrag bearbeiten‘, ‚Unterpunkt 4‘) passen bei Text 53 ganz hinein (im Reiselogbuch nicht: ‚Reiselogbuch
  // einstellen‘, ‚Do, 27.08.2026‘) – für L-1, L-3 und L-4 verlängert die Prüfung den Titel des offenen Fensters (nur in der Prüfung, wie der Platzhalter in H-3).
  const langerTitel = (p, zusatz) => p.evaluate(z => { const h = document.querySelector('#dlg .dlg-head h3'); h.textContent += z; }, zusatz);
  const pruefe = async (p, name, opts, soll) => {
    let r = { gekuerzt: false, errors: [] };
    await t.schritt(p, name, async () => { r = await checkTitelBlase(p, { ...opts, where: name }); t.liste(r.errors); });
    if (soll !== undefined) t.ist(`${name}: Titel gekürzt`, r.gekuerzt, soll, 'R-2.5');
    return r;
  };
  // L-1 bis L-3, L-6 bis L-11: iPhone hoch, größte Schrift
  {
    const p = await t.seite(b, 'iPhone hoch', { theme: 'light' });
    t.ort = 'iPhone hoch · Text 53';
    await p.addInitScript(groesse, 53);
    try {
      await vorlageStart(p, daten('a'));
      // L-2: Titel des Eintrags in der Kopfzeile; Tipp auf Teilen und Mehr schließt nur die Blase (kein Menü)
      await pruefe(p, `L-2 Kopfzeile ‚${TITEL}‘`, { sel: KOPF, daneben: ['#mainMore', '#shareBtn'], rollen: '#app > .rolle', esc: true }, true);
      // L-1: Fenster ‚Eintrag bearbeiten‘; Tipp auf x, Häkchen und Feld schließt nur die Blase (Fenster bleibt offen, nichts gespeichert)
      await p.evaluate(() => openItemDialog(getItem('a'))); await fensterAuf(p); await langerTitel(p, `: ${TITEL}`); await fensterLang(p);   // L-9 rollt den Inhalt
      await pruefe(p, 'L-1 Fenster ‚Eintrag bearbeiten‘', { sel: FTITEL, daneben: ['#dlgX', '#dlgOk', '#fTitle'], rollen: '#dlg .dlg-body', esc: true }, true);
      t.ist('L-8 nach den Tipps: Fenster offen, Titel im Feld und gespeichert unverändert',
        [await p.evaluate(() => dlg.open), await p.inputValue('#fTitle'), (await gespeichert(p)).items.find(e => e.id === 'a')?.title], [true, TITEL, TITEL], 'R-2.5');
      // L-11: Drehen schließt die Blase; danach Grundregeln (oberster Eintrag bleibt) – t.schritt
      await titelLang(p, FTITEL);
      t.wahr('L-11 vor dem Drehen ist die Sprechblase offen', await titelBlaseOffen(p), 'R-2.5');
      await t.schritt(p, 'L-11 drehen (hoch → quer → hoch)', async () => {
        await p.setViewportSize({ width: 852, height: 393 }); await warteBis(p, `innerWidth === 852 && !document.querySelector('.titel-blase') && ${RUHE}`, { max: 3000 });
        t.wahr('L-11 Drehen schließt die Sprechblase', !await titelBlaseOffen(p), 'R-2.5');
        await p.evaluate(() => { window.__gedreht = 0; }); await p.setViewportSize({ width: 393, height: 852 }); await bis(p, `innerWidth === 393 && ${RUHE} && (window.__gedreht = (window.__gedreht || 0) + 1) > 3`, 'zurückgedreht');
      });
      t.wahr('L-11 nach dem Drehen ist das Fenster noch offen', await p.evaluate(() => dlg.open), 'R-2.5');
      await zuFenster(p);
      // L-3: Fenster eines Unterpunkts (neutral statt des Datums im Reiselogbuch)
      await p.evaluate(k => openSubDialog(getItem('a'), k), tag(4)); await fensterAuf(p);
      t.ist('L-3 Titel des Unterpunkts', await p.textContent(FTITEL), 'Unterpunkt 4', 'R-2.5');
      await langerTitel(p, ` von ‚${TITEL}‘`);
      await pruefe(p, 'L-3 Fenster eines Unterpunkts', { sel: FTITEL, daneben: ['#dlgX'], esc: true }, true);
      await zuFenster(p);
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
  // L-4: Titel mit 80 Zeichen – mehrzeilig, ganz sichtbar, über keiner Schaltfläche
  {
    const p = await t.seite(b, 'iPhone hoch', { theme: 'light' });
    t.ort = 'iPhone hoch · Text 53';
    await p.addInitScript(groesse, 53);
    try {
      await vorlageStart(p, daten('b'));
      await pruefe(p, 'L-4 Kopfzeile, Titel mit 80 Zeichen', { sel: KOPF, esc: false }, true);
      await titelLang(p, KOPF);
      const z = await p.evaluate(() => { const e = document.querySelector('.titel-blase'); return e ? Math.round(e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight)) : 0; });
      t.wahr(`L-4 der lange Titel steht mehrzeilig in der Sprechblase (${z} Zeilen)`, z >= 2, 'R-2.5');
      await p.keyboard.press('Escape');
      await p.evaluate(() => openItemDialog(getItem('b'))); await fensterAuf(p); await langerTitel(p, `: ${LANG}`);
      await pruefe(p, 'L-4 Fenster des langen Eintrags', { sel: FTITEL, daneben: ['#dlgX'], esc: false }, true);
      await zuFenster(p);
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
  // L-5: normale Schrift, alle Ansichten, kurzer Titel ‚Kurz‘ – ganz sichtbar, langes Drücken zeigt nichts
  for (const ansicht of ['iPad quer', 'iPad hoch', 'iPhone hoch', 'iPhone quer']) {
    const p = await t.seite(b, ansicht, { theme: 'light' });
    try {
      await vorlageStart(p, daten('c'));
      await pruefe(p, 'L-5 Kopfzeile', { sel: KOPF }, false);
      await p.evaluate(() => openItemDialog(getItem('c'))); await fensterAuf(p);
      await pruefe(p, 'L-5 Fenster ‚Eintrag bearbeiten‘', { sel: FTITEL }, false);
      await zuFenster(p);
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
}

// APD-62/H-1 bis H-9 (R-2.7, checkTitelOben): Titel antippen rollt den zugehörigen Bereich sanft ganz nach oben – Kopfzeile den Inhalt (H-1),
// Seitenleiste ihre Liste (H-2), Fenster-Kopfzeile den Inhalt des Fensters (H-3); schon oben nichts, langes Drücken nicht, Tipp hält an, ‚Bewegung
// reduzieren‘ sofort oben, während eines Seitenwechsels nichts – 4 Ansichten und 2 mit ‚Bewegung reduzieren‘. APD-109/C-1 bis C-9: alles im
// Safari-Modell ‚Klick nur mit Hörer‘, Selbsttest zuerst (checkSafariKlick). APD-108/W-1 bis W-7: Selbsttest ‚Klick nach dem Wischen‘
// (checkSafariWischKlick), Wischen über den Titel rollt nicht. APD-127/B-5 (R-1.12): mit der Feder nach oben (iPad quer, iPhone hoch).
export async function ablaufTitelOben(t, b) {
  const daten = datenEintraege([{ id: 'a', title: 'Erster Eintrag', n: 40, text: i => `Text ${i}\nzweite Zeile` },
    ...Array.from({ length: 40 }, (_, i) => ({ id: `e${i}`, title: `Eintrag ${String(i + 1).padStart(2, '0')}` }))], 'a');
  const ruht = sel => `(() => { const e = document.querySelector(${JSON.stringify(sel)}); return !!e && e.getBoundingClientRect().height > 0
    && !document.getAnimations().some(a => a.playState === 'running') && !/(^|\\s)(nav-|blatt-faehrt|blatt-zieht)/.test(document.documentElement.className); })()`;
  const pruefe = async (p, name, opts) => { await t.schritt(p, name, async () => t.liste(await checkTitelOben(p, { ...opts, where: name }))); };
  // Fenster eines Unterpunkts mit langem Inhalt (H-3): ist er zu kurz zum Rollen, verlängert ihn ein Platzhalter (nur in der Prüfung)
  const fenster = async p => {
    await p.evaluate(k => openSubDialog(getItem('a'), k), tag(3)); await bis(p, ruht('#dlg[open] .dlg-body'), 'Fenster offen'); await ruhe(p);
    await fensterLang(p);
  };
  for (const [ansicht, ruhig] of [['iPad quer', false], ['iPad hoch', false], ['iPhone hoch', false], ['iPhone quer', false], ['iPad quer', true], ['iPhone hoch', true]]) {
    const p = await t.seite(b, ansicht, { theme: 'light', ...(ruhig ? { reducedMotion: 'reduce' } : {}) });
    if (ruhig) t.ort = `${t.ort} · Bewegung reduzieren`;
    try {
      await vorlageStart(p, daten, 'a'); await bis(p, ruht('#shareBtn'), 'Eintrag offen');
      if (!ruhig) await t.schritt(p, 'C-1/C-2 Safari-Modell', async () => t.liste(await checkSafariKlick(p)));
      if (!ruhig) await t.schritt(p, 'APD-108/W-1 Safari-Modell', async () => t.liste(await checkSafariWischKlick(p)));
      const seite = await p.locator('#side .side-list').isVisible();
      // H-1: Titel der Kopfzeile rollt den Inhalt; die Seitenleiste daneben bleibt
      await pruefe(p, 'H-1 Kopfzeile', { titel: KOPF, rolle: '#app > .rolle', still: seite ? ['#side .side-list'] : [], ruhig });
      // APD-127/B-5 (R-1.12): mit der Feder nach oben
      if (!ruhig && (ansicht === 'iPad quer' || ansicht === 'iPhone hoch')) await t.schritt(p, 'APD-127/B-5 Gleiten', async () =>
        t.liste(await checkGleiten(p, { titel: { sel: KOPF, rolle: '#app > .rolle' }, where: 'APD-127/B-5 Kopfzeile' })));
      if (!ruhig) {
        // H-3: Titel des Fensters rollt den Inhalt des Fensters; die Seite dahinter steht still (R-7.3)
        await fenster(p);
        await pruefe(p, 'H-3 Fenster eines Unterpunkts', { titel: FTITEL, rolle: '#dlg .dlg-body', still: ['#app > .rolle'] });
        await zuFenster(p);
        // H-2: Titel der Seitenleiste rollt nur ihre Liste (iPad quer: neben dem Inhalt; iPhone hoch: Startliste)
        if (ansicht === 'iPad quer') await pruefe(p, 'H-2 Seitenleiste', { titel: '#side .side-head h2', rolle: '#side .side-list', still: ['#app > .rolle'] });
        if (ansicht === 'iPhone hoch') {
          await p.locator('#back').click(); await navFertig(p); await bis(p, ruht('#side.page .side-row'), 'Startliste offen');
          await pruefe(p, 'H-2 Startliste', { titel: '#side .side-head h2', rolle: '#side .side-list' });
        }
      }
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
}

// APD-118/X-1 bis X-8 (Designrichtlinie 13 ‚Am oberen Rand kein Klick‘, checkSchichtOben): die Sperrschicht hinter Menü, Untermenü, Kontextmenü und
// Sprechblase schließt beim Loslassen (bis 20 px Weg) und verschluckt den Klick danach. iPhone quer hell und dunkel (am Rand), iPhone hoch, iPad quer
// und hoch (X-4 bis X-6 mit Untermenü ‚Darstellung‘, Kontextmenü und Sprechblase ‚Eintrag löschen‘); danach neutral ‚nichts gelöscht‘ (gespeicherte
// Einträge). X-8: Messung 2026-11-06 nachgespielt; APD-121/Y-5: die Tipps auf die Mehr-Schaltfläche der Liste aus den Messungen vom 07.11.2026.
export async function ablaufSchichtOben(t, b) {
  const daten = datenEintraege([{ id: 'a', title: 'Erster Eintrag', n: 12, text: i => `Text ${i} am Hafen` }, { id: 'b', title: 'Zweiter Eintrag' }], 'a');
  const messung = datei => liesMessung(readFileSync(path.join(MESSUNGEN, datei), 'utf8'));
  const loeschenFrage = async p => { await p.evaluate(() => document.querySelector('#mainMore')?.click()); await p.waitForSelector('.menu .mi');
    await p.locator('.menu .mi', { hasText: 'Eintrag löschen' }).click(); };
  const lang = async (p, n) => { const bx = await p.locator('.side-row', { hasText: n }).boundingBox(); await p.mouse.move(bx.x + 40, bx.y + 20); await p.mouse.down(); await p.waitForTimeout(750); await p.mouse.up(); };
  for (const [ansicht_, theme] of [['iPhone quer', 'light'], ['iPhone quer', 'dark'], ['iPhone hoch', 'light'], ['iPad quer', 'light'], ['iPad hoch', 'light']]) {
    const p = await t.seite(b, ansicht_, { theme });
    try {
      await vorlageStart(p, daten, 'a');
      const amRand = ansicht_ === 'iPhone quer', ipad = ansicht_.startsWith('iPad');
      const oeffner = [loeschenFrage, ...(ipad ? [
        async p => { await p.click('#sideMore'); await p.waitForSelector('.menu .mi'); await p.locator('.menu .mi', { hasText: 'Darstellung' }).click(); },
        p => lang(p, 'Zweiter Eintrag'),
        async p => { await lang(p, 'Zweiter Eintrag'); await p.waitForSelector('.menu.kontext .mi'); await p.locator('.menu.kontext .mi', { hasText: 'Eintrag löschen' }).click(); }] : [])];
      await t.schritt(p, 'Sperrschicht schließt beim Loslassen', async () => t.liste(await checkSchichtOben(p, { mehr: '#mainMore', oeffner, oben: amRand, where: t.ort })));
      t.ist('nichts gelöscht (gespeicherte Einträge)', (await gespeichert(p)).items.length, 2, 'R-4.4');
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
  // X-8: die Messung nachgespielt (Größe und Gerät aus dem Kopf, gedreht wie gemessen)
  {
    const m = messung('2026-11-06 iPhone quer Mehr-Menü oberer Rand.txt');
    const a = messAnsicht(m), { width: kurz, height: lang_ } = a.viewport;
    const p = await t.seite(b, { ...a, viewport: { width: Math.max(kurz, lang_), height: Math.min(kurz, lang_) } }, { theme: 'light' });
    t.ort = 'Messung iPhone quer';
    try {
      await vorlageStart(p, daten, 'a');
      await t.schritt(p, 'Messung nachgespielt', async () => t.liste(await checkSchichtOben(p, { mehr: '#mainMore', messung: m, where: 'X-8 Messung' })));
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
  // APD-121/Y-5: Tipps auf die Mehr-Schaltfläche der Liste aus den Messungen vom 07.11.2026 nachgespielt (Startliste, #sideMore)
  for (const datei of ['2026-11-07 iPhone quer Mehr-Knopf oben 1.txt', '2026-11-07 iPhone quer Mehr-Knopf oben 2.txt']) {
    const m = messung(datei);
    const ev = m.zeilen.map(z => z.ereignis || '').filter(e => /^(zeiger (down|move|up) \d+ \d+ touch|tippen )/.test(e));
    const tipps = [];
    ev.forEach((e, i) => { const d = e.match(/^zeiger down (\d+) (\d+) touch (?:svg\.ic in )?sideMore$/); if (!d) return;
      const j = ev.findIndex((x, k) => k > i && x.startsWith('zeiger up')), u = ev[j].match(/^zeiger up (\d+) (\d+)/);
      tipps.push({ x0: +d[1], y0: +d[2], x1: +u[1], y1: +u[2], soll: ev[j + 1] === 'tippen sideMore' }); });
    const a = messAnsicht(m), { width: kurz, height: lang_ } = a.viewport;
    const p = await t.seite(b, { ...a, viewport: { width: Math.max(kurz, lang_), height: Math.min(kurz, lang_) } }, { theme: 'light' });
    t.ort = `APD-121/Y-5 ${datei.replace(/\.txt$/, '')}`;
    try {
      await vorlageStart(p, daten, 'a');
      if (await p.locator('#back').isVisible()) { await p.click('#back'); await navFertig(p); await bis(p, `!!document.querySelector('#side.page #sideMore') && ${RUHE}`, 'Startliste offen'); }
      const offen = () => p.evaluate(() => !!document.querySelector('.menu:not(.zu-geist), .layer'));
      t.wahr('APD-121/Y-5 Messung mit Tipps auf die Mehr-Schaltfläche (sonst prüft die Prüfung nichts)', tipps.length >= 6 && (datei.includes('oben 1') || tipps.some(x => x.y0 === 21) && tipps.some(x => !x.soll)), 'APD-121');
      // waagrecht auf die Mitte der Schaltfläche verschoben (am Gerät anderer sicherer Rand: Schaltfläche weiter links), y und Weg wie gemessen
      const mx = await p.evaluate(() => { const r = document.querySelector('#sideMore').getBoundingClientRect(); return r.x + r.width / 2; });
      const dx = Math.round(mx - tipps.map(k => k.x0).sort((a, b) => a - b)[tipps.length >> 1]);
      await obenOhneKlick(p);
      try {
        for (const k of tipps) {
          await p.mouse.move(k.x0 + dx, k.y0); await p.mouse.down(); if (k.x1 !== k.x0 || k.y1 !== k.y0) await p.mouse.move(k.x1 + dx, k.y1, { steps: 3 }); await p.mouse.up();
          await p.waitForTimeout(450);
          const ist = await offen();
          if (ist !== k.soll) t.fehler('13', `APD-121/Y-5 Tipp ${k.x0}/${k.y0}${k.x1 !== k.x0 || k.y1 !== k.y0 ? ` → ${k.x1}/${k.y1}` : ''} auf #sideMore: Menü ${ist ? 'offen' : 'zu'}, gemessen ${k.soll ? 'offen' : 'zu'}`);
          for (let n = 0; n < 3 && await offen(); n++) { await p.keyboard.press('Escape'); await p.waitForTimeout(350); }
        }
      } finally { await obenOhneKlick(p, false); }
      await t.schritt(p, 'Mehr-Schaltfläche oben nachgespielt', async () => {});
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
}

// APD-104/L-1 bis L-9 (R-2.6, checkGrossanzeige): ab AX1 zeigt langes Drücken auf eine Leisten-Schaltfläche Icon und Namen groß in der Mitte; gleiten
// wechselt, Loslassen über einer Schaltfläche löst sie aus, daneben schließt sie nur. Je Ansicht bei AX1 (Text 28): Kopfzeile (Ausgabe → Mehr, daneben der
// Titel), Seitenleiste (Neuer Eintrag → Mehr), Fenster-Kopfzeile (Abbrechen → Fertig), schwebende Schaltflächen (Nach oben → Ans Ende); echt ausgelöst:
// Loslassen über ‚Mehr‘ öffnet das Menü; offenes Menü: keine Anzeige auf verdeckten Schaltflächen; Drehen schließt ohne Auslösen; APD-62/M-9 (R-4.13):
// das Menü wächst nach der Großanzeige aus die Schaltfläche; AX5 (Text 53): die Anzeige wächst mit; Text 17 (L): nichts davon (L-1, L-2).
export async function ablaufGrossanzeige(t, b) {
  const daten = datenEintraege([{ id: 'a', title: 'Erster Eintrag', n: 20, text: i => `Text ${i} mit etwas mehr Inhalt für eine lange Seite` }, { id: 'b', title: 'Zweiter Eintrag' }], 'a');
  const sichtbar = (p, s) => p.evaluate(s => { const e = document.querySelector(s); return !!e && !!e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden'; }, s);
  for (const ansicht of ['iPad quer', 'iPad hoch', 'iPhone hoch', 'iPhone quer']) {
    const p = await t.seite(b, ansicht, { theme: 'light' });
    t.ort = `${ansicht} · Text 28 (AX1)`;
    await p.addInitScript(groesse, 28);
    try {
      await vorlageStart(p, daten, 'a');
      t.wahr('Text 28 ist AX1 (html.ts-ax)', await p.evaluate(() => document.documentElement.classList.contains('ts-ax')), 'R-2.6');
      // Kopfzeile: Ausgabe → Mehr; daneben: der Titel
      await t.schritt(p, 'Kopfzeile', async () => t.liste(await checkGrossanzeige(p, { knoepfe: ['#shareBtn', '#mainMore'], daneben: KOPF, where: 'Kopfzeile' })));
      // echt ausgelöst: 0,7 s auf ‚Mehr‘, loslassen – das Menü öffnet sich genau einmal, die Anzeige ist zu
      await t.schritt(p, 'Kopfzeile – Mehr echt auslösen', async () => {
        await finger(p, '#mainMore', [['warte', 700]], { fangen: false }); await p.waitForTimeout(300);
        t.ist('L-8 Loslassen über ‚Mehr‘ öffnet das Menü', await p.locator('.menu').count(), 1, 'R-2.6');
        t.wahr('L-8 nach dem Loslassen ist die Großanzeige zu', !await p.locator('.grossanzeige').count(), 'R-2.6');
        // offenes Menü: die Schaltflächen darunter sind verdeckt – langes Drücken dort zeigt keine Anzeige
        const r = await p.evaluate(async () => {
          const k = document.querySelector('#shareBtn').getBoundingClientRect(), x = k.left + k.width / 2, y = k.top + k.height / 2, z = document.elementFromPoint(x, y);
          const ev = typ => z.dispatchEvent(new PointerEvent(typ, { pointerId: 9, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, button: 0, buttons: typ === 'pointerup' ? 0 : 1, bubbles: true, cancelable: true }));
          ev('pointerdown'); await new Promise(r => setTimeout(r, 700)); const g = !!document.querySelector('.grossanzeige'); ev('pointerup'); return g;
        });
        t.wahr('bei offenem Menü zeigt langes Drücken auf die verdeckte Schaltfläche ‚Ausgabe‘ keine Großanzeige', !r, 'R-2.6');
        // das Loslassen auf der Sperrschicht schließt das Menü schon (APD-118) – Esc nur, wenn noch eins offen ist
        if (await p.locator('.menu').count()) await p.keyboard.press('Escape');
        await p.waitForTimeout(300);
      });
      // APD-62/M-9 (R-4.13): Großanzeige auf ‚Mehr‘, dann wächst das Menü aus der Schaltfläche, Endlage wie ohne Bewegung
      await t.schritt(p, 'Kopfzeile – Mehr wächst nach der Großanzeige', async () => t.liste(await checkWachsen(p, { menue: '#mainMore', gross: true, where: 'Kopfzeile AX1' })));
      // Seitenleiste (iPad: fest links)
      if (await sichtbar(p, '#newItem'))
        await t.schritt(p, 'Seitenleiste', async () => t.liste(await checkGrossanzeige(p, { knoepfe: ['#newItem', '#sideMore'], where: 'Seitenleiste' })));
      // schwebende Schaltflächen: in der Mitte der Seite sind beide sichtbar
      await p.evaluate(() => { const r = document.querySelector('#app > .rolle'); r.scrollTop = (r.scrollHeight - r.clientHeight) / 2; }); await p.waitForTimeout(500);
      if (await sichtbar(p, '#toTop') && await sichtbar(p, '#toEnd'))
        await t.schritt(p, 'schwebende Schaltflächen', async () => t.liste(await checkGrossanzeige(p, { knoepfe: ['#toTop', '#toEnd'], where: 'schwebende Schaltflächen' })));
      else if (ansicht.startsWith('iPad')) t.fehler('R-2.6', 'schwebende Schaltflächen ‚Nach oben‘ und ‚Ans Ende‘ in der Mitte der Seite nicht beide sichtbar');
      // Fenster-Kopfzeile: Abbrechen → Fertig (Fenster ‚Eintrag bearbeiten‘)
      await p.evaluate(() => openItemDialog(getItem('a'))); await fensterAuf(p);
      await t.schritt(p, 'Fenster-Kopfzeile', async () => t.liste(await checkGrossanzeige(p, { knoepfe: ['#dlgX', '#dlgOk'], daneben: FTITEL, where: 'Fenster-Kopfzeile' })));
      // Drehen schließt die Anzeige ohne Auslösen; das Fenster bleibt offen
      await t.schritt(p, 'drehen bei offener Großanzeige', async () => {
        const vp = p.viewportSize();
        const r = await p.evaluate(async () => {
          const k = document.querySelector('#dlgX'), q = k.getBoundingClientRect(), x = q.left + q.width / 2, y = q.top + q.height / 2;
          const ev = typ => k.dispatchEvent(new PointerEvent(typ, { pointerId: 10, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, button: 0, buttons: typ === 'pointerup' ? 0 : 1, bubbles: true, cancelable: true }));
          ev('pointerdown'); await new Promise(r => setTimeout(r, 700)); window.__ev = ev; return !!document.querySelector('.grossanzeige');
        });
        t.wahr('vor dem Drehen ist die Großanzeige offen', r, 'R-2.6');
        await p.setViewportSize({ width: vp.height, height: vp.width }); await p.waitForTimeout(400);
        t.wahr('Drehen schließt die Großanzeige', !await p.locator('.grossanzeige').count(), 'R-2.6');
        await p.evaluate(() => window.__ev('pointerup')); await p.waitForTimeout(300);
        t.wahr('nach dem Drehen löst das Loslassen ‚Abbrechen‘ nicht aus – das Fenster bleibt offen', await p.evaluate(() => dlg.open), 'R-2.6');
        await p.setViewportSize(vp); await p.waitForTimeout(400);
      });
      await zuFenster(p);
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
  // AX5 (Text 53): die Anzeige wächst mit und bleibt ganz auf dem Bildschirm (iPhone quer ist am niedrigsten)
  for (const ansicht of ['iPhone hoch', 'iPhone quer']) {
    const p = await t.seite(b, ansicht, { theme: 'light' });
    t.ort = `${ansicht} · Text 53 (AX5)`;
    await p.addInitScript(groesse, 53);
    try {
      await vorlageStart(p, daten, 'a');
      await t.schritt(p, 'Kopfzeile AX5', async () => t.liste(await checkGrossanzeige(p, { knoepfe: ['#shareBtn', '#mainMore'], where: 'Kopfzeile AX5' })));
      const r = await finger(p, '#mainMore', [['warte', 700], ['merke', 'g'], ['ohneKlick']]);
      t.wahr(`AX5: die Großanzeige wächst mit der Textgröße (Schrift ${r.gemerkt.g.gross?.schrift} px)`, (r.gemerkt.g.gross?.schrift || 0) >= 52, 'R-2.6');
      await p.keyboard.press('Escape'); await p.waitForTimeout(200);
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
  // L-1, L-2: Text 17 (L) – langes Drücken zeigt nichts und wirkt wie Antippen
  for (const ansicht of ['iPad quer', 'iPhone hoch']) {
    const p = await t.seite(b, ansicht, { theme: 'light' });
    t.ort = `${ansicht} · Text 17 (L)`;
    try {
      await vorlageStart(p, daten, 'a');
      await t.schritt(p, 'Kopfzeile L', async () => t.liste(await checkGrossanzeige(p, { knoepfe: ['#shareBtn', '#mainMore'], ax: false, where: 'Kopfzeile L' })));
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
}
// ---------- B-3.3 Schritt 1 (APD-135/Q-1 bis Q-9, seit 4.65.0): Menü, Sprechblase und Fenster auf der Prüfseite ----------
// Der Baustein-Anteil, den bis Reiselogbuch 3.57.7 ablauf-markierung-menues mitprüfte (checkMehrKnopf, checkWachsen), dazu die Bedienung mit der Tastatur
// (checkFokus, checkFokusZurueck), ‚Bewegung reduzieren‘ (checkRuhig) und das Häkchen des Fensters (checkDialogHead) – dieselben Prüffunktionen wie in den
// Prüfungen der App, hier gegen die Vorlage mit neutralen Daten; Grundregeln nach jedem Schritt (Q-8, t.schritt – auch bei offenem Menü, offener
// Sprechblase und offenem Fenster: der Rest gesperrt, R-1.4; Namen und Rollen, R-1.8).
const datenB33 = () => datenEintraege([{ id: 'a', title: 'Erster Eintrag', n: 20, text: i => `Text ${i} am Hafen` }, { id: 'b', title: 'Zweiter Eintrag', n: 2 },
  { id: 'c', title: 'Dritter Eintrag' }], 'a');
const zuSehen = (p, s) => p.evaluate(s => { const e = document.querySelector(s); return !!e && !!e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden'; }, s);
const menueAuf = async (p, sel) => { await p.click(sel); await bis(p, `!!document.querySelector('.menu:not(.submenu) .mi') && ${RUHE}`, `Menü von ${sel} offen`); };
const allesZu = async p => { for (let n = 0; n < 3 && await p.evaluate(() => !!document.querySelector('.menu, .pop')); n++) await p.keyboard.press('Escape');
  await bis(p, `!document.querySelector('.menu, .pop, .zu-geist, .layer') && ${RUHE}`, 'Menü bzw. Sprechblase zu'); };
// langes Drücken auf die Kachel eines Eintrags (ohne Titel: die oberste) öffnet sein Kontextmenü; neu aufgebaut kann sie kurz fehlen – bis 5 s nachfassen
// (wie in der App, APD-134)
const kachelLang = async (p, titel = null) => { let bx = null;
  const k = titel ? p.locator('#side .side-row', { hasText: titel }) : p.locator('#side .side-row').first();
  for (let t0 = Date.now(); !bx && Date.now() - t0 < 5000; ) { bx = await k.boundingBox().catch(() => null); if (!bx) await p.waitForTimeout(50); }
  if (!bx) throw new Error(`Kachel ‚${titel || 'oben'}‘ nach 5 s nicht zu sehen`);
  await p.mouse.move(bx.x + 40, bx.y + 20); await p.mouse.down(); await p.waitForTimeout(750); await p.mouse.up(); };
// iPad: die Liste steht daneben; iPhone: zurück zur Startliste
const zurListe = async p => { if (await zuSehen(p, '#sideMore')) return;
  await p.click('#back'); await navFertig(p); await bis(p, `!!document.querySelector('#side.page #sideMore') && ${RUHE}`, 'Startliste offen'); };
// Mehr → ‚Eintrag bearbeiten‘ bzw. ‚Eintrag löschen‘ (angetippt)
const ausMehr = (p, punkt) => async () => { await menueAuf(p, '#mainMore'); await p.locator('.menu:not(.submenu) .mi', { hasText: punkt }).click(); };

// APD-135/Q-1 bis Q-3, Q-8 (seit 4.65.0; R-4.1, R-4.13, R-4.7, R-1.4, R-1.8): Mehr-Menü der Kopfzeile (#mainMore) und der Liste (#sideMore, am iPhone auf
// der Startliste) mit Untermenü ‚Darstellung‘, Kontextmenü einer Kachel. Q-2 checkMehrKnopf: die Mehr-Schaltfläche kippt und bleibt hervorgehoben, solange ihr
// Menü bzw. Untermenü offen ist; Q-1 checkWachsen: jedes Menü wächst aus seiner Schaltfläche (iPad mit Drehen beim Wachsen; ‚Bewegung reduzieren‘ nur
// Überblenden; nach der Großanzeige bei Text 28 – für Mehr der Kopfzeile im Teil grossanzeige, hier Mehr der Liste); Q-3 checkFokus: Fokus im Menü,
// Pfeile, Esc schließt (auch erst das Untermenü), Fokus zurück auf die Schaltfläche. 4 Ansichten (iPad hoch dunkel), dazu iPad quer mit ‚Bewegung reduzieren‘.
export async function ablaufMenue(t, b) {
  const daten = datenB33();
  for (const [ansicht, theme, ruhig] of [['iPad quer', 'light'], ['iPad hoch', 'dark'], ['iPhone hoch', 'light'], ['iPhone quer', 'light'], ['iPad quer', 'light', true]]) {
    const p = await t.seite(b, ansicht, { theme, ...(ruhig ? { reducedMotion: 'reduce' } : {}) });
    if (ruhig) t.ort = `${t.ort} · Bewegung reduzieren`;
    try {
      await vorlageStart(p, daten, 'a');
      const { width: w, height: h } = p.viewportSize(), ipad = ansicht.startsWith('iPad'), wo = x => `${x}${ruhig ? ' (Bewegung reduzieren)' : ''}`;
      // Kopfzeile
      await t.schritt(p, 'Q-2 Mehr der Kopfzeile', async () => t.liste(await checkMehrKnopf(p, { sel: '#mainMore', where: wo('Mehr der Kopfzeile') })));
      await t.schritt(p, 'Q-1 Menü der Kopfzeile wächst', async () => t.liste(await checkWachsen(p, { menue: '#mainMore', where: wo('Kopfzeile') })));
      if (!ruhig) {
        await t.schritt(p, 'Mehr-Menü der Kopfzeile offen', () => menueAuf(p, '#mainMore'));
        // APD-136/S-6 (seit 4.67.0, AD-Bean sourcehighlight): die Mehr-Schaltfläche ist gehaltene Quelle, solange ihr Menü offen ist, danach ist nichts gehalten
        t.wahr('APD-136/S-6 offenes Menü: Mehr-Schaltfläche in heldItems und blau', await p.evaluate(() => adSourcehighlight.heldItems.includes(document.querySelector('#mainMore'))
          && document.querySelector('#mainMore').classList.contains('on')), 'R-3.3');
        await t.schritt(p, 'Mehr-Menü der Kopfzeile zu', () => allesZu(p));
        t.ist('APD-136/S-6 Menü zu: heldItems leer, Mehr-Schaltfläche frei', await p.evaluate(() => [adSourcehighlight.heldItems.length, document.querySelector('#mainMore').classList.contains('on')]), [0, false], 'R-3.3');
        await t.schritt(p, 'Q-3 Mehr der Kopfzeile mit der Tastatur', async () => t.liste(await checkFokus(p, { menue: '#mainMore', tab: false, where: 'Mehr der Kopfzeile' })));
      }
      // Liste mit Untermenü ‚Darstellung‘ und Kontextmenü der zweiten Kachel – im iPhone quer rollte die Liste bis 4.66.0 dafür 8 px und beim Schließen
      // zurück, das Abbild schrumpfte zur alten Lage (Befund B-3.3); seit 4.67.0 steht das Menü darüber, die Liste bleibt (APD-143/L-2)
      await zurListe(p);
      await t.schritt(p, 'Q-2 Mehr der Liste mit Untermenü', async () => t.liste(await checkMehrKnopf(p, { sel: '#sideMore', untermenue: 'Darstellung', where: wo('Mehr der Liste') })));
      await t.schritt(p, 'Q-1 Menü, Untermenü und Kontextmenü der Liste wachsen', async () => t.liste(await checkWachsen(p, { menue: '#sideMore', untermenue: 'Darstellung',
        kontext: () => kachelLang(p, 'Zweiter Eintrag'), drehen: ipad && !ruhig ? [h, w] : null, where: wo('Liste') })));
      // APD-143/L-1 bis L-5, L-8 (seit 4.67.0): Kontextmenü jeder Kachel – Lage, Liste bleibt beim Öffnen und Schließen stehen
      await t.schritt(p, 'APD-143 Kontextmenüs der Liste', async () => t.liste(await checkContextMenus(p, wo(ansicht))));
      if (!ruhig) {
        await t.schritt(p, 'Mehr-Menü der Liste offen', () => menueAuf(p, '#sideMore'));
        await t.schritt(p, 'Untermenü ‚Darstellung‘ offen', async () => { await p.locator('.menu:not(.submenu) .mi', { hasText: 'Darstellung' }).click();
          await bis(p, `!!document.querySelector('.menu.submenu .mi') && ${RUHE}`, 'Untermenü offen'); });
        await t.schritt(p, 'Menü und Untermenü zu', () => allesZu(p));
        await t.schritt(p, 'Kontextmenü offen', async () => { await kachelLang(p); await bis(p, `!!document.querySelector('.menu.kontext .mi') && ${RUHE}`, 'Kontextmenü offen'); });
        await t.schritt(p, 'Kontextmenü zu', () => allesZu(p));
        if (ipad) await t.schritt(p, 'Q-3 Mehr der Liste mit der Tastatur, Untermenü', async () => t.liste(await checkFokus(p, { menue: '#sideMore', untermenue: 'Darstellung', tab: false, where: 'Mehr der Liste' })));
      }
      t.ist('nichts gelöscht (gespeicherte Einträge)', (await gespeichert(p)).items.length, 3, 'R-4.4');
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
  // Q-3 Mehr der Liste mit der Tastatur am iPhone (Startliste) auf einer eigenen Seite: im WebKit der Prüfung trägt nach checkFokus am Mehr der
  // Kopfzeile und ‚Zurück‘ zur Startliste kein Element mehr :focus-visible (html.tastatur ist gesetzt) – Befund im Bericht zu B-3.3; am iPad auf derselben Seite
  for (const ansicht of ['iPhone hoch', 'iPhone quer']) {
    const p = await t.seite(b, ansicht, { theme: 'light' });
    try {
      await vorlageStart(p, daten, 'a'); await zurListe(p);
      await t.schritt(p, 'Q-3 Mehr der Startliste mit der Tastatur, Untermenü', async () => t.liste(await checkFokus(p, { menue: '#sideMore', untermenue: 'Darstellung', tab: false, where: 'Mehr der Startliste' })));
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
  // Q-1 nach der Großanzeige (APD-62/M-9): iPad quer bei Text 28 (AX1), Mehr der Liste
  {
    const p = await t.seite(b, 'iPad quer', { theme: 'light' });
    t.ort = 'iPad quer · Text 28 (AX1)';
    await p.addInitScript(groesse, 28);
    try {
      await vorlageStart(p, daten, 'a');
      await t.schritt(p, 'Q-1 Menü der Liste wächst nach der Großanzeige', async () => t.liste(await checkWachsen(p, { menue: '#sideMore', gross: true, where: 'Liste AX1' })));
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
}

// APD-135/Q-4, Q-5, Q-8 (seit 4.65.0; R-4.13, R-4.4, R-1.4, R-1.8, R-1.9): rotes ‚Eintrag löschen‘ (Mehr der Kopfzeile, am iPad auch im Kontextmenü einer
// Kachel) – die Sprechblase wächst aus ihrer Schaltfläche (checkWachsen); offen ist der Rest gesperrt (Grundregeln: inert, alertdialog), der Fokus liegt
// auf der Blase, daneben tippen ändert nichts; Esc = Abbrechen: nichts gelöscht, Fokus zurück auf ‚Mehr‘. Q-5: dasselbe mit ‚Bewegung reduzieren‘ – nur
// Überblenden (checkWachsen APD-62/M-7, der Bewegungswächter nach jedem Schritt), dazu checkRuhig (Fenster ohne Verkleinerung der Seite dahinter).
export async function ablaufSprechblase(t, b) {
  const daten = datenB33();
  for (const [ansicht, ruhig] of [['iPad quer'], ['iPad hoch'], ['iPhone hoch'], ['iPhone quer'], ['iPad quer', true], ['iPhone hoch', true]]) {
    const p = await t.seite(b, ansicht, { theme: 'light', ...(ruhig ? { reducedMotion: 'reduce' } : {}) });
    if (ruhig) t.ort = `${t.ort} · Bewegung reduzieren`;
    const q = ruhig ? 'Q-5' : 'Q-4';
    try {
      await vorlageStart(p, daten, 'a');
      const loeschen = ausMehr(p, 'Eintrag löschen');
      await t.schritt(p, `${q} Sprechblase ‚Eintrag löschen‘ wächst aus ‚Mehr‘`, async () => t.liste(await checkWachsen(p, { blase: loeschen, where: `${q} Mehr der Kopfzeile` })));
      if (await zuSehen(p, '#side .side-row')) await t.schritt(p, `${q} Sprechblase ‚Eintrag löschen‘ wächst aus der Kachel`, async () => t.liste(await checkWachsen(p, {
        blase: async () => { await kachelLang(p, 'Zweiter Eintrag'); await bis(p, `!!document.querySelector('.menu.kontext .mi') && ${RUHE}`, 'Kontextmenü offen');
          await p.locator('.menu.kontext .mi', { hasText: 'Eintrag löschen' }).click(); }, where: `${q} Kontextmenü` })));
      // offen: Grundregeln (der Rest gesperrt), Fokus auf der Blase; daneben tippen ändert nichts (APD-30/V-7)
      await t.schritt(p, `${q} Sprechblase offen`, async () => { await loeschen(); await bis(p, `!!document.querySelector('.pop .btns button') && ${RUHE}`, 'Sprechblase offen'); });
      t.wahr(`${q} offene Sprechblase: der Fokus liegt auf der Blase`, await p.evaluate(() => !!document.activeElement?.matches('.pop')), 'R-1.8');
      await t.schritt(p, `${q} daneben tippen`, async () => { const vp = p.viewportSize(); await p.mouse.click(vp.width - 6, vp.height - 6); await bis(p, RUHE, 'nach dem Tipp daneben'); });
      t.wahr(`${q} daneben tippen ändert nichts – die Sprechblase bleibt offen`, await p.locator('.pop').count() === 1, 'R-1.4');
      await t.schritt(p, `${q} Esc = Abbrechen`, async () => { await p.keyboard.press('Escape'); await bis(p, `!document.querySelector('.pop, .zu-geist, .layer') && ${RUHE}`, 'Sprechblase zu'); });
      t.ist(`${q} Esc: nichts gelöscht (gespeicherte Einträge)`, (await gespeichert(p)).items.length, 3, 'R-4.4');
      t.wahr(`${q} Esc: der Fokus liegt wieder auf ‚Mehr‘`, await p.evaluate(() => document.activeElement === document.querySelector('#mainMore')), 'R-1.8');
      if (ruhig) await t.schritt(p, 'Q-5 Fenster mit ‚Bewegung reduzieren‘', async () => t.liste(await checkRuhig(p, { fab: false, fenster: ausMehr(p, 'Eintrag bearbeiten'), where: 'Q-5' })));
      await allesZu(p).catch(() => {});
      t.ist('nichts gelöscht (gespeicherte Einträge)', (await gespeichert(p)).items.length, 3, 'R-4.4');
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
}

// APD-135/Q-6 bis Q-8 (seit 4.65.0; R-4.4, R-4.7, R-3.4, R-1.8, R-7.3): Fenster ‚Eintrag bearbeiten‘ (Mehr der Kopfzeile). Q-6 checkDialogHead: x links,
// Häkchen rechts, erst nach einer Änderung blau, x mit Änderung fragt ‚Änderungen verwerfen‘ / ‚Weiter bearbeiten‘; Q-7 checkFokus: das Fenster öffnet mit
// dem Fokus auf sich, Tab bleibt im Fenster, Esc und ⌘. schließen, die Sprechblase am x mit der Tastatur; checkFokusZurueck: nach dem Schließen liegt der
// Fokus wieder auf der Schaltfläche bzw. der Zeile, die es öffnete (Tastatur mit Ring, angetippt ohne), ohne Rollen. Danach ist nichts gespeichert.
export async function ablaufFenster(t, b) {
  const daten = datenB33(), ZEILE = `#app [data-day="${tag(3)}"]`;
  for (const ansicht of ['iPad quer', 'iPad hoch', 'iPhone hoch', 'iPhone quer']) {
    const p = await t.seite(b, ansicht, { theme: 'light' });
    try {
      await vorlageStart(p, daten, 'a');
      const bearbeiten = ausMehr(p, 'Eintrag bearbeiten'), aendern = () => p.locator('#fTitle').fill('Erster Eintrag geändert'), esc = () => p.keyboard.press('Escape');
      // Grundregeln bei offenem Fenster, vor und nach der Änderung
      await t.schritt(p, 'Q-6 Fenster ‚Eintrag bearbeiten‘ offen', async () => { await bearbeiten(); await fensterAuf(p); });
      await t.schritt(p, 'Q-6 Titel geändert', async () => { await aendern(); await bis(p, RUHE, 'nach der Änderung'); });
      await zuFenster(p);
      await t.schritt(p, 'Q-6 Häkchen erst nach einer Änderung blau', async () => t.liste(await checkDialogHead(p, { open: bearbeiten, change: aendern, where: 'Q-6 Eintrag bearbeiten' })));
      await t.schritt(p, 'Q-7 Fenster mit der Tastatur', async () => t.liste(await checkFokus(p, { fenster: { open: bearbeiten, change: aendern, feld: '#fTitle' }, tab: false, where: 'Q-7 Fenster' })));
      await t.schritt(p, 'Q-7 Fokus zurück nach dem Schließen', async () => t.liste(await checkFokusZurueck(p, [
        { name: 'Unterpunkt mit der Tastatur, Esc', auf: async () => { await p.focus(ZEILE); await p.keyboard.press('Enter'); }, zu: esc, knopf: ZEILE, rolle: '#rolle' },
        { name: 'Mehr → Eintrag bearbeiten mit der Tastatur, Esc', auf: async () => {
          await p.focus('#mainMore'); await p.keyboard.press('Enter'); await bis(p, `!!document.querySelector('.menu .mi') && ${RUHE}`, 'Menü offen');
          for (let n = 0; n < 6 && !await p.evaluate(() => /Eintrag bearbeiten/.test(document.activeElement?.textContent || '')); n++) await p.keyboard.press('ArrowDown');
          await p.keyboard.press('Enter'); }, zu: esc, knopf: '#mainMore' },
        { name: 'Mehr → Eintrag bearbeiten angetippt, x', auf: bearbeiten, zu: () => p.click('#dlgX'), knopf: '#mainMore', tastatur: false },
      ], { where: 'Q-7' })));
      t.ist('nichts gespeichert (Titel der gespeicherten Einträge)', (await gespeichert(p)).items.map(e => e.title), ['Erster Eintrag', 'Zweiter Eintrag', 'Dritter Eintrag'], 'R-4.4');
      if (ansicht === 'iPad quer') await t.schritt(p, 'APD-136/S-9, S-10 AD-Bean sourcehighlight', async () => t.liste(await checkSourcehighlight(p)));
    } catch (e) { t.fehler('', `Ablauf bricht ab: ${e.message.split('\n')[0]}`); }
    await p.close();
  }
}
// APD-136/S-9, S-10 (seit 4.67.0; R-3.3, R-8.1, R-1.13 – arbeit/0145 APD-136 Bean sourcehighlight Vorschlag.md): die AD-Bean sourcehighlight auf der
// Vorlage. S-9: sourceItem einer zweiten Schaltfläche setzen, während der erste gilt – der erste frei, der zweite blau, sourceItem = zweiter, change je einmal;
// S-10: hold, die Schaltflächen neu aufbauen, refresh – bleibt blau; release – frei; change je einmal. Gegenproben pruefseite:quelleNichtGetoent (S-9) und
// pruefseite:releaseGibtNichtFrei (S-10).
export async function checkSourcehighlight(p) {
  const errors = [], E = t => errors.push(`R-3.3 ${t}`);
  const r = await p.evaluate(() => {
    const s = adSourcehighlight, box = document.createElement('div'), knoepfe = '<button type="button" id="shA">A</button><button type="button" id="shB">B</button>';
    box.id = 'shProbe'; box.innerHTML = knoepfe; document.body.append(box);
    const on = id => !!document.getElementById(id)?.classList.contains('on');
    const ev = [], ab = s.on('change', e => ev.push(`${typeof e.item === 'string' ? e.item : e.item?.id} ${e.highlighted}`));
    s.sourceItem = '#shA'; const a1 = on('shA');
    s.sourceItem = '#shB'; const s9 = [on('shA'), on('shB'), s.sourceItem];
    s.sourceItem = ''; const frei9 = !on('shB') && s.sourceItem === '';
    const ev9 = ev.splice(0);
    s.hold('#shA'); box.innerHTML = knoepfe; const vor = on('shA');
    s.refresh(box); const nach = on('shA'), held = s.heldItems.slice();
    s.release('#shA'); const frei10 = !on('shA'); const ev10 = ev.splice(0);
    ab(); box.remove();
    return { a1, s9, frei9, ev9, vor, nach, held, frei10, ev10, leer: s.heldItems.length };
  });
  if (!r.a1) E('APD-136/S-9 sourceItem = erste Schaltfläche: nicht blau');
  if (JSON.stringify(r.s9) !== JSON.stringify([false, true, '#shB'])) E(`APD-136/S-9 sourceItem auf die zweite Schaltfläche: erster blau ${r.s9[0]}, zweiter blau ${r.s9[1]}, sourceItem ‚${r.s9[2]}‘ (soll: erster frei, zweiter blau, ‚#shB‘)`);
  if (!r.frei9) E('APD-136/S-9 sourceItem = \'\': die zweite Schaltfläche bleibt blau');
  if (JSON.stringify(r.ev9) !== JSON.stringify(['#shA true', '#shA false', '#shB true', '#shB false'])) E(`APD-136/S-9 Ereignis change ${JSON.stringify(r.ev9)} statt je einmal getönt und frei`);
  if (r.vor) E('APD-136/S-10 die neu aufgebaute Schaltfläche ist schon vor refresh blau – die Prüfung prüft nichts');
  if (!r.nach || JSON.stringify(r.held) !== '["#shA"]') E(`APD-136/S-10 nach Neuaufbau und refresh: blau ${r.nach}, heldItems ${JSON.stringify(r.held)}`);
  if (!r.frei10 || r.leer) E(`APD-136/S-10 release: Schaltfläche ${r.frei10 ? 'frei' : 'noch blau'}, heldItems ${r.leer}`);
  if (JSON.stringify(r.ev10) !== JSON.stringify(['#shA true', '#shA false'])) E(`APD-136/S-10 Ereignis change ${JSON.stringify(r.ev10)} statt je einmal getönt und frei`);
  return errors;
}
const ABLAEUFE = { messung: ablaufMessung, 'titel-blase': ablaufTitelBlase, 'titel-oben': ablaufTitelOben, 'schicht-oben': ablaufSchichtOben, grossanzeige: ablaufGrossanzeige,
  menue: ablaufMenue, sprechblase: ablaufSprechblase, fenster: ablaufFenster };

export async function pruefseite(pw, { out, teil = process.env.PRUEF_TEIL || 'werte' } = {}) {
  const t = pruefung('bausteine-pruefseite', pw, { hig: createCheck(), out });
  const fehler = gpFall();
  if (fehler && !GEGENPROBEN_PRUEFSEITE[teil]?.[fehler]) t.fehler('R-10.3', `Gegenprobe ‚${fehler}‘ gehört nicht zum Teil ‚${teil}‘`);
  const b = await t.browser();
  if (teil === 'werte') {
    const p = await t.seite(b, 'iPad quer');
    await oeffneMindestseite(p);
    t.liste(await checkWerte(p));
    await p.close();
    // bricht ein Schritt ab (z. B. mit eingeschleustem Fehler), bleiben die Meldungen bis dahin – der Abbruch ist selbst ein Fehler
    try { await vorlageAnsichten(t, b); } catch (e) { t.fehler('', `Vorlage: Ablauf bricht ab – ${e.message.split('\n')[0]}`); }
  } else if (ABLAEUFE[teil]) await ABLAEUFE[teil](t, b);
  else t.fehler('', `unbekannter Teil ‚${teil}‘ (werte, ${Object.keys(ABLAEUFE).join(', ')})`);
  await t.ende(b);
}
