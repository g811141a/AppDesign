// AppDesign 4.64.0 · tests/pruefseite.mjs – Bausteine auf der Prüfseite (APD-135 Paket 6 Schritt 2, APD-135/B-3.1, APD-135/U-32; Designrichtlinie 14 ‚Prüfen‘;
// Testfall-Liste arbeit/APD-135 Paket 6 Schritt 2 Vorschlag.md APD-135/E-2 bis E-6). Bausteine, die ohne den Inhalt einer App gleich laufen,
// prüft AppDesign auf der Prüfseite – der Vorlage (vorlage/index.html) derselben Fassung mit neutralen Daten –, ihre Werte auf der daraus
// abgeleiteten Mindestseite. Kein Playwright hier: die Hülle der App (tests/bausteine-pruefseite.mjs) übergibt es (pw) und den Ausgabeordner.
//   oeffneVorlage(p, { daten, fehler })  – Vorlage mit neutralen Daten (localStorage neueapp.v1); ui.js und design.css der Fassung, in der diese
//                                           Datei liegt (Arbeitsstand: v4/), über p.route – so passen die Pfade in Arbeitsstand und Fassung
//   oeffneMindestseite(p, { fehler })    – aus dem Text der Vorlage: <head>, #dlg, #msg, ui.js; das Skript der App durch Platzhalter ersetzt
//   checkWerte(p)                         – Gruppe A (8 Bausteine mit festen Beispielwerten) auf der Mindestseite; Meldungen ‚R-x.y <Baustein>: …‘
//   pruefseite(pw, { out, teil })         – ein Teil (heute ‚werte‘) mit Ergebnis und Rückgabewert (pruefe.mjs)
// Gegenprobe (lauf.mjs --gegenprobe pruefseite): PRUEF_GEGENPROBE=pruefseite:<fall> schleust den Fehler eines Bausteins per Textersetzung in
// ui.js ein (wie gleitenGegenprobe in ablauf.mjs); der Teil muss mit der Meldung dieses Bausteins rot werden (GEGENPROBEN_PRUEFSEITE).
// Die Vorlage in der Fassung (fassung/X.Y.Z/vorlage/index.html) nennt ../fassung/X.Y.Z/… – geladen wird trotzdem nur, was p.route liefert.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pruefung } from './pruefe.mjs';
import { createCheck } from './hig.mjs';
import { checkSync } from './abgleich.mjs';
import { checkSearchWords } from './ablauf.mjs';

const hier = path.dirname(fileURLToPath(import.meta.url));
// in der festen Fassung liegen ui.js und vorlage/ neben tests/, im Arbeitsstand ui.js unter v4/
const inFassung = existsSync(path.join(hier, '..', 'ui.js'));
const basis = inFassung ? path.join(hier, '..') : path.join(hier, '..', 'v4');
const VORLAGE = path.join(hier, '..', 'vorlage', 'index.html');
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
const fall = (baustein, was, ersetze) => ({ baustein, was, ersetze, zeichen: new RegExp(`R-\\d+\\.\\d+ ${baustein}: `) });
export const GEGENPROBEN_PRUEFSEITE = { werte: {
  version: fall('Version', 'AD_VERSION falsch', [[/const AD_VERSION = '[\d.]+';/, "const AD_VERSION = '0.0.0';"]]),
  icons: fall('Icons', 'Icon ohne aria-hidden', [['viewBox="0 0 24 24" aria-hidden="true"${name', 'viewBox="0 0 24 24"${name']]),
  leer: fall('Leerer Zustand', 'Titel nicht als Überschrift', [['<h3>${esc(titel)}</h3>', '<b>${esc(titel)}</b>']]),
  hilfen: fall('Hilfen', 'Tausenderkomma statt -punkt', [[".replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.')", ".replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')"]]),
  suche: fall('Suche', 'markWords markiert nicht', [['m => `<mark>${m}</mark>`', 'm => m']]),
  teilen: fall('Teilen', 'Kopfverlauf endet nicht in #d9d9d9', [['#e9e9e9 75%, #d9d9d9 100%', '#e9e9e9 75%, #e9e9e9 100%']]),
  backup: fall('Backup', 'readBackup lässt savedAt in den Daten', [['delete data.savedAt; delete data.savedOn;', '']]),
  abgleich: fall('Abgleich', 'ältere Änderung gewinnt', [['const useR = ra > la ||', 'const useR = ra < la ||']]),
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
// ersetzt, die ui.js braucht (db, save, render), und ein globales sync für checkSync (mit subAt – ohne landen die Zeitpunkte der Unterpunkte
// unter dem Schlüssel ‚undefined‘ und der Abgleichbericht zeigt sie als Feld, R-9.4). Fehlt #dlg oder #msg, wirft sie.
export function mindestseiteHtml(vorlage = lies(VORLAGE)) {
  const teil = (re, was) => { const m = vorlage.match(re); if (!m) throw new Error(`Mindestseite: der Vorlage fehlt ${was}`); return m[0]; };
  const head = teil(/<head>[\s\S]*?<\/head>/, '<head>');
  const dlg = teil(/<dialog id="dlg"[^>]*><\/dialog>/, '#dlg'), msg = teil(/<dialog id="msg"[^>]*><\/dialog>/, '#msg');
  const ui = teil(/<script src="[^"]*ui\.js"><\/script>/, 'ui.js');
  return `<!doctype html>\n<html lang="de">\n${head}\n<body>\n${dlg}\n${msg}\n${ui}\n<script>\n'use strict';\n` +
    "let db = { settings: { appearance: 'auto' } }; function save() {} function render() {}\nconst sync = createSync({ list: 'items', sub: 'sub', subAt: 'subAt' });\n</script>\n</body>\n</html>\n";
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
      icon: svg(ic('pencil')), iconUnbekannt: svg(ic('gibt-es-nicht')), ellipsis: dom(ic('ellipsis')).firstElementChild?.hasAttribute('data-mehr'),
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
  if (r.iconUnbekannt.n !== 1 || r.iconUnbekannt.tag !== 'svg' || r.iconUnbekannt.hidden !== 'true') E('R-1.8', 'Icons', `unbekannter Name ergibt ${JSON.stringify(r.iconUnbekannt)}, soll genau ein svg mit aria-hidden`);
  if (!r.ellipsis) E('R-1.8', 'Icons', 'ic(\'ellipsis\') ohne data-mehr (Mehr-Knopf kippt nicht, R-4.1)');
  // Leerer Zustand (R-7.7): Symbol, Titel als Überschrift, Satz, getönter Knopf; klein nur Symbol und Titel; Suche mit dem Begriff als Text
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
  } else t.fehler('', `unbekannter Teil ‚${teil}‘ (werte)`);
  await t.ende(b);
}
