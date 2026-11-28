// AppDesign 5.0.0 · tests/presentation.mjs – AD-Beans presentation (Stapel) und commands (Befehle), R-1.13, R-1.4, R-1.8, R-3.3, R-4.1, R-4.13, R-8.1
// (seit 5.0.0, APD-149). Testfall-Liste APD-149/S-1 bis S-18 und L-1 bis L-4 (arbeit/APD-149 Grobentwurf V-3.md 5, Ergänzung arbeit/APD-149 0008
// Testfall-Listen v5.md 4) – bis 5.0.0 das Prüfskript des Musters arbeit/APD-149/muster-pruefen.mjs. Geprüft wird an der Vorführung im Bean-Katalog
// (katalog/index.html#presentation, Arbeitsstand vN/), nach jedem Schritt die Grundregeln (pruefe.mjs schritt, dieselben Prüfungen wie hig.mjs).
//   iPad quer: S-1 bis S-16 (S-10 nach H-9: Escape fragt, Antippen der Abdunkelung tut nichts), L-1 bis L-4, S-17 (navPush leert vorher den Stapel)
//   iPhone hoch: #presentation öffnet die Startliste; S-17 mit navPush (Menü auf dem Stapel) und navPop (Sprechblase bzw. Menü), Fokus auf dem Seitentitel
//   S-18: commands und presentation stehen im Katalog (gebaut, kein Entwurf) – die Liste der AD-Beans ↔ katalog/ prüft checkBeans (doku.mjs)
// Der Katalog kommt über einen eigenen Ursprung (http://katalog.test/, p.route liefert die Dateien aus AppDesign) – so lässt sich für die Gegenproben
// ui.js per Textersetzung ändern (wie pruefseite.mjs). Gegenproben: PRUEF_GEGENPROBE=presentation:<fall> (lauf.mjs --gegenprobe presentation):
//   ableitung (S-15: die Ableitung tönt nicht und setzt kein aria-expanded → S-1, S-3 rot), freigabe (S-15: beim Schließen keine Freigabe → S-2, S-3 rot),
//   navPop (S-17: navPop leert den Stapel nicht → S-17 rot), durchlass (APD-149/J-5: neben der Kopfzeile bleibt ein Geschwister frei → R-1.4 aus hig.mjs rot).
// Einbinden in der App über die Hülle des Katalogs (tests/bean-katalog.mjs, Teil ‚presentation‘):  katalog(pw, { out, teil: process.env.PRUEF_TEIL })
// Aufruf in AppDesign (Selbstprobe): node -e "import('./tests/presentation.mjs').then(m => m.presentation(require…('playwright')))"
import { readFileSync } from 'node:fs';
import { pruefung, warteBis, navFertig } from './pruefe.mjs';
import { createCheck } from './hig.mjs';
import { arbeitsOrdner } from './version.mjs';

const ORDNER = new URL(import.meta.url.includes('/fassung/') ? '../../../' : '../', import.meta.url), V = arbeitsOrdner(ORDNER);
const ORIGIN = 'http://katalog.test/';
// Gegenproben: Fall → Stelle in vN/ui.js (genau einmal) und die Meldung, die rot werden muss
export const GEGENPROBEN_PRESENTATION = {
  ableitung: { was: 'S-15: die Ableitung tönt nicht und setzt kein aria-expanded', ersetze: [['      highlightSource(h, el);\n', '']], zeichen: /APD-149 .*S-1 Quelle getönt/ },
  freigabe: { was: 'S-15: beim Schließen keine Freigabe der Quelle', ersetze: [['function releaseSource(h) {\n    const el = h.source; if (!el) return;', 'function releaseSource(h) {\n    const el = h.source; return;']], zeichen: /APD-149 .*S-2 außerhalb: Tönung weg/ },
  navPop: { was: 'S-17: navPop leert den Stapel nicht', ersetze: [['function navPop() {\n  dismissPresented();', 'function navPop() {']], zeichen: /APD-149 .*S-17 navPop/ },
  durchlass: { was: 'APD-149/J-5: neben der Kopfzeile bleibt ein Geschwister frei', ersetze: [['    if (bar) free.push(bar);\n', '    if (bar) free.push(bar.parentElement);\n']], zeichen: /R-1\.4 .*nicht gesperrt \(inert\)/ },
};
const TYPEN = { html: 'text/html', js: 'text/javascript', css: 'text/css', json: 'application/json', svg: 'image/svg+xml', png: 'image/png' };

export async function presentation(pw, { out } = {}) {
  const gpName = (process.env.PRUEF_GEGENPROBE || '').match(/^presentation:(\w+)$/)?.[1] || '';
  const gp = gpName ? GEGENPROBEN_PRESENTATION[gpName] : null;
  const t = pruefung('presentation', pw, { hig: createCheck(), out });
  if (gpName && !gp) t.fehler('R-1.13', `unbekannte Gegenprobe ‚${gpName}‘`);
  // vN/ui.js mit eingeschleustem Fehler – eine Stelle, die nicht genau einmal vorkommt, ist ein Fehler (die Gegenprobe wäre sonst wertlos)
  let ui = readFileSync(new URL(`${V}/ui.js`, ORDNER), 'utf8');
  for (const [alt, neu] of gp?.ersetze || []) {
    const n = ui.split(alt).length - 1;
    if (n !== 1) { t.fehler('R-1.13', `Gegenprobe ${gpName}: Stelle ‚${alt.slice(0, 60)}‘ steht ${n}-mal in ${V}/ui.js`); continue; }
    ui = ui.replace(alt, () => neu);
  }
  const b = await t.browser();
  const konsole = [];
  const seite = async ansicht => {
    const p = await t.seite(b, ansicht);
    await p.route(u => u.href.startsWith(ORIGIN), r => {
      const pfad = decodeURIComponent(new URL(r.request().url()).pathname).slice(1);
      if (pfad === `${V}/ui.js`) return r.fulfill({ contentType: 'text/javascript; charset=utf-8', body: ui });
      try { return r.fulfill({ contentType: `${TYPEN[pfad.split('.').pop()] || 'application/octet-stream'}; charset=utf-8`, body: readFileSync(new URL(pfad, ORDNER)) }); }
      catch { return r.fulfill({ status: 404, body: '' }); }
    });
    p.on('console', m => { if (m.type() === 'error') konsole.push(`${t.ort}: ${m.text().split('\n')[0]}`); });
    // Teilen steuerbar (S-11): canShare ja, share läuft, bis die Prüfung es beendet
    await p.addInitScript(() => { navigator.canShare = () => true; navigator.share = () => new Promise(res => { window.__shareDone = res; }); });
    return p;
  };
  const fall = (nr, was, ok) => { if (!ok) t.fehler('APD-149', `${nr} ${was}`); return ok; };
  const url = ORIGIN + 'katalog/index.html#presentation';

  /* ---------- iPad quer: S-1 bis S-16, L-1 bis L-4 ---------- */
  const p = await seite('iPad quer');
  const ruhe = (ms = 450) => p.waitForTimeout(ms);
  const z = () => p.evaluate(() => {
    const q = s => document.querySelector(s), k = id => q(`#adLeiste [data-command="${id}"]`);
    const st = el => el ? { on: el.classList.contains('on'), exp: el.getAttribute('aria-expanded') } : null;
    const a = document.activeElement;
    return { stack: AD.presentation.stack.map(h => h.kind).join(' › '), menu: !!q('.menu:not(.submenu)'), sub: !!q('.menu.submenu'), more: st(k('more')), output: st(k('output')), add: st(k('entry.add')),
      fokus: a?.dataset?.command || a?.id || (a?.classList.contains('mi') ? 'mi:' + a.textContent.trim() : a?.tagName), barInert: !!k('more')?.closest('[inert]'), listeInert: !!q('#adListe')?.closest('[inert]'),
      dlg: AD.dlg.open, dlgTitel: q('#dlg .dlg-head h3')?.textContent || '', msg: AD.msg.open, msgTitel: AD.msg.open ? q('#msgTitel')?.textContent : '', pop: !!q('.pop'),
      items: [...document.querySelectorAll('.menu:not(.submenu) .mi')].map(m => (m.disabled ? '~' : '') + (m.classList.contains('red') ? '!' : '') + m.textContent.trim()),
      log: [...document.querySelectorAll('#bkProt li')].map(l => l.textContent).join(' | ') };
  });
  const tippe = async sel => { await p.tap(sel, { timeout: 4000 }).catch(e => t.fehler('APD-149', `Tippen auf ${sel}: ${e.message.split('\n')[0]}`)); await ruhe(); };
  const tippeBei = async (x, y) => { await p.touchscreen.tap(x, y); await ruhe(); };
  const halten = async sel => { const r = await p.locator(sel).boundingBox({ timeout: 4000 }).catch(() => null); if (!r) { t.fehler('APD-149', `Halten: ${sel} fehlt`); return; }
    await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.mouse.down(); await p.waitForTimeout(900); await p.mouse.up(); await ruhe(); };
  const alleZu = async () => { await p.evaluate(() => [...AD.presentation.stack].reverse().forEach(h => AD.presentation.dismiss(h))); await ruhe(); };
  const cmd = js => p.evaluate(js);
  let s;

  await t.schritt(p, 'Katalog: presentation öffnen', async () => { await p.goto(url); await p.waitForFunction(() => window.__katalog && window.__catalogCommands); await ruhe(600); });
  // S-18: beide Beans gebaut im Katalog (kein Entwurf)
  const im = await p.evaluate(() => ({ beans: window.__katalog.beans(), entwurf: [...document.querySelectorAll('#side [data-bean]')].filter(x => /Entwurf/.test(x.textContent)).map(x => x.dataset.bean) }));
  fall('S-18', `commands und presentation im Katalog, nicht im Entwurf (${JSON.stringify(im)})`, im.beans.includes('commands') && im.beans.includes('presentation') && !im.entwurf.length);

  // S-1 Menü öffnen
  await t.schritt(p, 'S-1 Mehr öffnen', () => tippe('#adLeiste [data-command="more"]'));
  s = await z();
  fall('S-1', `Menü offen (Stapel ‚${s.stack}‘)`, s.menu && s.stack === 'menu');
  fall('S-1', 'Quelle getönt', s.more?.on);
  fall('S-1', `aria-expanded="true" (ist ${s.more?.exp})`, s.more?.exp === 'true');
  fall('S-1', 'Rest gesperrt (Liste inert)', s.listeInert);
  fall('S-1', 'Kopfzeile frei (H-6, Durchlass R-1.4)', !s.barInert);
  fall('S-1', `Fokus auf dem ersten Eintrag (ist ${s.fokus})`, /^mi:/.test(s.fokus));

  // S-2 Menü schließen: Tippen außerhalb (auf eine Kachel – der Klick wird geschluckt), Escape, Auswahl
  const kachel = await p.locator('#adListe [data-id="z1"]').boundingBox();
  await t.schritt(p, 'S-2 Tippen außerhalb', () => tippeBei(kachel.x + 40, kachel.y + kachel.height / 2));
  s = await z();
  fall('S-2', 'außerhalb: Menü zu', !s.menu && !s.stack);
  fall('S-2', 'außerhalb: Tönung weg', s.more && !s.more.on);
  fall('S-2', `außerhalb: aria-expanded="false" (ist ${s.more?.exp})`, s.more?.exp === 'false');
  fall('S-2', `außerhalb: Fokus auf der Quelle (ist ${s.fokus})`, s.fokus === 'more');
  fall('S-2', 'außerhalb: der Tipp erreicht die Kachel darunter nicht', !/Kachel angetippt/.test(s.log));
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-2 Escape', async () => { await p.keyboard.press('Escape'); await ruhe(); });
  s = await z();
  fall('S-2', `Escape: Menü zu, frei, Fokus (${JSON.stringify(s.more)}, Fokus ${s.fokus})`, !s.menu && s.more && !s.more.on && s.more.exp === 'false' && s.fokus === 'more');
  await tippe('#adLeiste [data-command="more"]');
  await tippe('.menu .mi[aria-haspopup]');
  await t.schritt(p, 'S-2 Auswahl ‚Groß‘', () => tippe('.menu.submenu .mi:nth-of-type(2)'));
  s = await z();
  fall('S-2', `Auswahl: Menü und Untermenü zu, frei, Fokus (Stapel ‚${s.stack}‘, Fokus ${s.fokus})`, !s.menu && !s.sub && s.more && !s.more.on && s.more.exp === 'false' && s.fokus === 'more');
  fall('S-2', 'Auswahl: Befehl lief (Darstellung groß)', await cmd(() => window.__catalogCommands.context.view === 'large'));

  // S-3 Neuaufbau bei offenem Menü (APD-150)
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-3 Kopfzeile neu aufbauen', async () => { await cmd(() => { document.querySelector('#adLeiste [data-command="more"]').dataset.alt = '1'; window.__catalogCommands.revalidate(); }); await ruhe(); });
  s = await z();
  fall('S-3', 'die Schaltfläche ist neu aufgebaut', await cmd(() => !document.querySelector('#adLeiste [data-command="more"]').dataset.alt));
  fall('S-3', 'neue Schaltfläche getönt', s.more?.on);
  fall('S-3', `neue Schaltfläche aria-expanded="true" (ist ${s.more?.exp})`, s.more?.exp === 'true');
  fall('S-3', 'Menü bleibt offen', s.menu);
  await p.keyboard.press('Escape'); await ruhe();
  s = await z();
  fall('S-3', `nach dem Schließen frei (${JSON.stringify(s.more)})`, s.more && !s.more.on && s.more.exp === 'false');

  // S-4 Untermenü öffnen und schließen; ein Untermenü im Untermenü öffnet nicht (H-2)
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-4 Untermenü öffnen', () => tippe('.menu .mi[aria-haspopup]'));
  let u = await cmd(() => { const it = document.querySelector('.menu:not(.submenu) .mi[aria-haspopup]'); return { exp: it.getAttribute('aria-expanded'), on: it.classList.contains('on'), sub: !!document.querySelector('.menu.submenu') }; });
  fall('S-4', `Untermenü offen, Eintrag aria-expanded und getönt (${JSON.stringify(u)})`, u.sub && u.exp === 'true' && u.on);
  const vorher = konsole.length;
  const h2 = await cmd(() => { const r = AD.presentation.present('submenu', [{ label: 'Tiefer', act() {} }], { sourceItem: document.querySelector('.menu.submenu .mi') }); return { r: r === null, n: document.querySelectorAll('.menu.submenu').length }; });
  fall('S-4', `Untermenü im Untermenü öffnet nicht (H-2): ${JSON.stringify(h2)}, Meldung ${konsole.length - vorher}`, h2.r && h2.n === 1 && konsole.length - vorher === 1);
  konsole.length = vorher;   // die eine Meldung ist hier gewollt
  await tippe('.menu:not(.submenu) .mi[aria-haspopup]');
  u = await cmd(() => { const it = document.querySelector('.menu:not(.submenu) .mi[aria-haspopup]'); return { exp: it.getAttribute('aria-expanded'), on: it.classList.contains('on'), sub: !!document.querySelector('.menu.submenu'), f: document.activeElement === it }; });
  fall('S-4', `zweiter Tipp schließt das Untermenü, Fokus auf dem Eintrag (${JSON.stringify(u)})`, !u.sub && u.exp === 'false' && !u.on && u.f);
  await p.keyboard.press('Escape'); await ruhe();

  // S-16 Untermenü bleibt beim Neuaufbau offen (Rückmeldung am Gerät 27.11.2026): Kopfzeile alle 2 s neu, Mehr › Ansicht, 5 s warten
  await t.schritt(p, 'S-16 Schalter ‚Kopfzeile alle 2 s neu aufbauen‘ ein', () => tippe('label:has(#adNeu)'));
  await tippe('#adLeiste [data-command="more"]');
  await tippe('.menu .mi[aria-haspopup]');
  await t.schritt(p, 'S-16 Mehr › Ansicht, 5 s warten', () => ruhe(5000));
  u = await cmd(() => {
    const it = document.querySelector('.menu:not(.submenu) .mi[aria-haspopup]'), sm = document.querySelector('.menu.submenu');
    const ri = it?.getBoundingClientRect(), rs = sm?.getBoundingClientRect();
    return { an: document.getElementById('adNeu').checked, stack: AD.presentation.stack.map(h => h.kind).join(' › '), sub: !!sm, exp: it?.getAttribute('aria-expanded'), on: it?.classList.contains('on'),
      neben: !!(ri && rs && Math.abs(rs.top - ri.top) < 2 && (rs.right <= ri.left + 1 || rs.left >= ri.right - 1)), more: document.querySelector('#adLeiste [data-command="more"]').classList.contains('on') };
  });
  fall('S-16', `Untermenü nach 5 s mit Neuaufbau offen, Eintrag aria-expanded und getönt, am Eintrag, Mehr getönt (${JSON.stringify(u)})`, u.an && u.stack === 'menu › submenu' && u.sub && u.exp === 'true' && u.on && u.neben && u.more);
  await t.schritt(p, 'S-16 Auswahl ‚Kompakt‘ im Untermenü', () => tippe('.menu.submenu .mi:nth-of-type(1)'));
  s = await z();
  fall('S-16', `Auswahl nach dem Neuaufbau: alles zu, frei, Befehl lief (Stapel ‚${s.stack}‘)`, !s.menu && !s.sub && s.more && !s.more.on && s.more.exp === 'false' && await cmd(() => window.__catalogCommands.context.view === 'compact'));
  await tippe('label:has(#adNeu)');
  fall('S-16', 'Schalter wieder aus', !await cmd(() => document.getElementById('adNeu').checked));

  // S-5 andere Schaltfläche der Kopfzeile bei offenem Menü: ein Tipp (H-1, H-6, Durchlass R-1.4); die eigene schließt; ein Befehl wirkt auch (J-3)
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-5 Ausgabe bei offenem Mehr', () => tippe('#adLeiste [data-command="output"]'));
  s = await z();
  fall('S-5', `ein Tipp öffnet ‚Ausgabe‘, ‚Mehr‘ ist zu (Stapel ‚${s.stack}‘, Mehr ${JSON.stringify(s.more)}, Ausgabe ${JSON.stringify(s.output)})`, s.stack === 'menu' && s.output?.on && s.output.exp === 'true' && !s.more.on && s.more.exp === 'false' && s.items.some(x => /Teilen/.test(x)));
  await tippe('#adLeiste [data-command="output"]');
  s = await z();
  fall('S-5', 'eigene Schaltfläche schließt', !s.menu && !s.output.on && s.output.exp === 'false');
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-5 ‚+‘ bei offenem Mehr (J-3)', () => tippe('#adLeiste [data-command="entry.add"]'));
  s = await z();
  fall('S-5', `J-3: ein Tipp auf ‚+‘ schließt das Menü und öffnet das Fenster (Stapel ‚${s.stack}‘, Titel ‚${s.dlgTitel}‘)`, s.stack === 'sheet' && s.dlg && /Neuer Eintrag/.test(s.dlgTitel) && !s.more.on);
  fall('S-5', 'J-3: ‚+‘ ist Quelle des Fensters (getönt)', s.add?.on);
  await tippe('#dlgX');
  s = await z();
  fall('S-5', `Fenster zu, ‚+‘ frei, Fokus darauf (Fokus ${s.fokus})`, !s.dlg && !s.add.on && s.fokus === 'entry.add');

  // S-6 Fenster aus dem Menü (H-5)
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-6 Bearbeiten', () => tippe('.menu .mi:first-of-type'));
  s = await z();
  fall('S-6', `Menü zu, Fenster offen, Quelle = Mehr getönt (Stapel ‚${s.stack}‘)`, s.stack === 'sheet' && s.dlg && !s.menu && s.more.on && s.more.exp === 'false');
  // S-7 Hinweisfenster aus dem Fenster
  await t.schritt(p, 'S-7 Hinweis über dem Fenster', () => tippe('#adHinweis'));
  s = await z();
  fall('S-7', `Hinweis über dem Fenster (Stapel ‚${s.stack}‘)`, s.stack === 'sheet › alert' && s.dlg && s.msg);
  await tippe('#msg [data-x]');
  s = await z();
  fall('S-7', `danach ist das Fenster wieder oben, Fokus auf der Quelle im Fenster (Stapel ‚${s.stack}‘, Fokus ${s.fokus})`, s.stack === 'sheet' && s.dlg && !s.msg && s.fokus === 'adHinweis');
  // S-8 zwei Hinweise nacheinander (H-4)
  await t.schritt(p, 'S-8 zwei Hinweise', () => tippe('#adZwei'));
  s = await z();
  fall('S-8', `erst der erste (Titel ‚${s.msgTitel}‘, Stapel ‚${s.stack}‘)`, s.msgTitel === 'Erster Hinweis' && s.stack === 'sheet › alert');
  await tippe('#msg [data-x]');
  s = await z();
  fall('S-8', `nach dem ersten der zweite (Titel ‚${s.msgTitel}‘)`, s.msg && s.msgTitel === 'Zweiter Hinweis' && s.stack === 'sheet › alert');
  await tippe('#msg [data-x]');
  s = await z();
  fall('S-8', 'danach nur das Fenster', !s.msg && s.stack === 'sheet');
  // S-9 Fenster aus dem Fenster (H-3)
  await t.schritt(p, 'S-9 anderes Fenster', async () => { await tippe('#adAnderes'); await warteBis(p, () => !document.querySelector('.blatt-geist') && !AD.dlg.getAnimations().length, { max: 3000 }); });
  s = await z();
  fall('S-9', `das alte ist zu, nur ein Fenster (Stapel ‚${s.stack}‘, Titel ‚${s.dlgTitel}‘)`, s.stack === 'sheet' && /Anderes Fenster/.test(s.dlgTitel) && /Fenster ‚Eintrag bearbeiten‘ zu · replaced/.test(s.log));
  await tippe('#dlgX');
  s = await z();
  fall('S-6', `nach dem Schließen frei, Fokus zurück auf Mehr (Fokus ${s.fokus})`, !s.dlg && !s.more.on && s.fokus === 'more');

  // S-10 (geändert nach H-9) Fenster mit Änderungen: Escape fragt über shouldDismiss, das Fenster bleibt; Antippen der Abdunkelung tut nichts, fragt nicht
  await tippe('#adLeiste [data-command="more"]'); await tippe('.menu .mi:first-of-type');
  await p.fill('#adTitel', 'Rom und Florenz'); await ruhe(200);
  await t.schritt(p, 'S-10 Escape mit Änderungen', async () => { await p.keyboard.press('Escape'); await ruhe(); });
  s = await z();
  fall('S-10', `Escape fragt, das Fenster bleibt (Stapel ‚${s.stack}‘)`, s.pop && s.dlg && s.stack === 'sheet › popover');
  await tippe('.pop [data-i="1"]');
  s = await z();
  fall('S-10', '‚Weiter bearbeiten‘: Fenster bleibt mit Text', !s.pop && s.dlg && await p.inputValue('#adTitel') === 'Rom und Florenz');
  await t.schritt(p, 'S-10 Abdunkelung antippen', () => tippeBei(6, 400));
  s = await z();
  fall('S-10', `Antippen der Abdunkelung: das Fenster bleibt, keine Frage (Stapel ‚${s.stack}‘)`, !s.pop && s.dlg && s.stack === 'sheet');
  await p.keyboard.press('Escape'); await ruhe();
  s = await z();
  fall('S-10', 'danach fragt Escape wieder', s.pop && s.dlg);
  await tippe('.pop [data-i="0"]');
  s = await z();
  fall('S-10', `‚Änderungen verwerfen‘ schließt (Stapel ‚${s.stack}‘)`, !s.dlg && !s.stack && !s.more.on);

  // S-11 Teilen läuft, zweites Teilen abgelehnt (H-8); S-12 Ergebnis im Hinweisfenster hält die Quelle
  await tippe('#adLeiste [data-command="output"]');
  await t.schritt(p, 'S-11 Teilen', () => tippe('.menu .mi:first-of-type'));
  s = await z();
  fall('S-11', `Teilen läuft, Ausgabe getönt (Stapel ‚${s.stack}‘)`, s.stack === 'activity' && s.output.on && !s.menu);
  const zweit = await cmd(() => AD.presentation.present('activity', () => new Promise(() => {}), { command: 'output.share' }) === null);
  s = await z();
  fall('S-11', 'zweites Teilen abgelehnt, Quelle bleibt getönt', zweit && s.stack === 'activity' && s.output.on && /abgelehnt/.test(s.log));
  await t.schritt(p, 'S-12 Teilen endet', async () => { await cmd(() => window.__shareDone?.()); await ruhe(600); });
  s = await z();
  fall('S-12', `Ergebnis im Hinweisfenster, Ausgabe weiter getönt (Stapel ‚${s.stack}‘, Titel ‚${s.msgTitel}‘)`, s.stack === 'alert' && s.msgTitel === 'Teilen' && s.output.on);
  await tippe('#msg [data-x]');
  s = await z();
  fall('S-12', `nach dem Hinweis frei, Fokus auf Ausgabe (Fokus ${s.fokus})`, !s.msg && !s.output.on && s.fokus === 'output');

  // S-13 Drehen bei offenem Menü, Fenster bzw. Hinweisfenster
  const quer = p.viewportSize(), hoch = { width: quer.height, height: quer.width };
  const drehen = async () => { await p.setViewportSize(hoch); await ruhe(700); const a = await z(); await p.setViewportSize(quer); await ruhe(700); return [a, await z()]; };
  await tippe('#adLeiste [data-command="more"]');
  let gedreht = [];
  await t.schritt(p, 'S-13 Drehen mit Menü', async () => { gedreht = await drehen(); });
  for (const x of gedreht) {
    const lage = await cmd(() => { const m = document.querySelector('.menu').getBoundingClientRect(), a = document.querySelector('#adLeiste [data-command="more"]').getBoundingClientRect();
      return m.top >= a.bottom && m.right > a.left - 1 && m.left < a.right + 1 && m.bottom <= innerHeight && m.right <= innerWidth; });
    fall('S-13', `Menü nach dem Drehen an der Schaltfläche, getönt, Fokus im Menü (${x.fokus})`, x.menu && lage && x.more.on && x.more.exp === 'true' && /^mi:/.test(x.fokus));
  }
  await tippe('.menu .mi:first-of-type');
  for (const x of await drehen()) fall('S-13', 'Fenster nach dem Drehen offen, Mehr getönt', x.dlg && x.more.on && x.stack === 'sheet');
  await tippe('#adHinweis');
  for (const x of await drehen()) fall('S-13', `Hinweis nach dem Drehen offen, Quelle getönt, Fokus im Hinweis (${x.fokus})`, x.msg && x.more.on && x.stack === 'sheet › alert' && x.fokus === 'msg');
  await alleZu();

  // S-14 Befehl wird unmöglich (revalidate): im Menü gedimmt, im Kontextmenü und beim Wischen fehlt er (H-7)
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-14 Auswahl weg bei offenem Menü', async () => { await cmd(() => { window.__catalogCommands.context.selection = false; window.__catalogCommands.revalidate(); }); await ruhe(); });
  s = await z();
  fall('S-14', `im Menü gedimmt (${s.items.join(', ')})`, s.items.includes('~!Eintrag löschen') && s.menu);
  await p.keyboard.press('Escape'); await ruhe();
  await t.schritt(p, 'S-14 Kontextmenü', () => halten('#adListe [data-id="z1"]'));
  s = await z();
  fall('S-14', `im Kontextmenü fehlt ‚Endgültig löschen‘ (${s.items.join(', ')})`, s.menu && s.items.join() === 'Wiederherstellen');
  await p.keyboard.press('Escape'); await ruhe();
  const wisch = await cmd(() => { const c = window.__catalogCommands; c.context.row = { id: 'z1' }; return c.items('row', { place: 'swipe' }).filter(x => x.label).map(x => x.shortTitle); });
  fall('S-14', `beim Wischen fehlt er (${wisch.join(', ')})`, wisch.join() === 'Zurück');
  await cmd(() => { const c = window.__catalogCommands; c.context.selection = true; delete c.context.row; c.revalidate(); });

  // L-1 bis L-4 (RLB-126): Endgültig löschen und Wiederherstellen in Kontextmenü und Wischen, Neuaufbau der Liste
  await t.schritt(p, 'L-1 Kontextmenü mit Auswahl', () => halten('#adListe [data-id="z1"]'));
  s = await z();
  fall('L-1', `Kontextmenü: Wiederherstellen, Abstand, rot ‚Endgültig löschen‘ zuletzt (${s.items.join(', ')})`, s.items.join() === 'Wiederherstellen,!Endgültig löschen');
  await t.schritt(p, 'L-1 Endgültig löschen', () => tippe('.menu .mi.red'));
  s = await z();
  const kOn = () => cmd(() => document.querySelector('#adListe [data-id="z1"]').classList.contains('on'));
  fall('L-1', `Abfrage an der Kachel, Kachel getönt (Stapel ‚${s.stack}‘)`, s.pop && s.stack === 'popover' && await kOn() && !s.menu);
  await tippe('.pop [data-i="1"]');
  s = await z();
  fall('L-1', '‚Abbrechen‘ ändert nichts, Kachel frei', !s.pop && !s.stack && /abgebrochen/.test(s.log) && !await kOn());
  await halten('#adListe [data-id="z1"]');
  await t.schritt(p, 'L-2 Wiederherstellen', () => tippe('.menu .mi:first-of-type'));
  s = await z();
  fall('L-2', 'Wiederherstellen aus dem Kontextmenü läuft', /Wiederherstellen/.test(s.log) && !s.menu);
  await halten('#adListe [data-id="z2"]');
  s = await z();
  fall('L-2', `gesperrte Kachel: nur Wiederherstellen (${s.items.join(', ')})`, s.items.join() === 'Wiederherstellen');
  await p.keyboard.press('Escape'); await ruhe();
  const w2 = await cmd(() => { const c = window.__catalogCommands, r = id => { c.context.row = { id, locked: id === 'z2' }; const l = c.items('row', { place: 'swipe' }).filter(x => x.label).map(x => (x.red ? '!' : '') + x.shortTitle).join(); delete c.context.row; return l; }; return [r('z1'), r('z2')]; });
  fall('L-3', `Wischen: z1 ‚${w2[0]}‘, gesperrt z2 ‚${w2[1]}‘`, w2[0] === 'Zurück,!Löschen' && w2[1] === 'Zurück');
  await halten('#adListe [data-id="z1"]');
  await t.schritt(p, 'L-4 Liste neu aufbauen bei offenem Kontextmenü', async () => { await cmd(() => { const l = document.getElementById('adListe'); l.innerHTML = l.innerHTML; }); await ruhe(); });
  s = await z();
  fall('L-4', 'die neue Kachel ist getönt, das Kontextmenü bleibt', s.menu && await kOn());
  await p.keyboard.press('Escape'); await ruhe();
  fall('L-4', 'nach dem Schließen frei', !await kOn());

  // S-17 iPad: navPush mit offenem Menü – zuerst ist der Stapel leer, dann wechselt die Ebene
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-17 navPush bei offenem Menü', async () => {
    await cmd(() => AD.navPush(() => { window.__s17 = { stack: AD.presentation.stack.length, menu: !!document.querySelector('.menu'), on: !!document.querySelector('#adLeiste .on') }; window.__katalog.showBean('alert'); }));
    await navFertig(p); await ruhe();
  });
  let n = await cmd(() => ({ vorher: window.__s17 || null, hash: location.hash, menu: !!document.querySelector('.menu'), stack: AD.presentation.stack.length }));
  fall('S-17', `navPush iPad: vor dem Wechsel Stapel leer, Tönung weg (${JSON.stringify(n.vorher)}); danach ‚alert‘ ohne Menü (${n.hash}, Menü ${n.menu})`,
    n.vorher && !n.vorher.stack && !n.vorher.menu && !n.vorher.on && n.hash === '#alert' && !n.menu && !n.stack);
  await p.close();

  /* ---------- iPhone hoch: Startliste, S-17 mit navPush und navPop ---------- */
  const q = await seite('iPhone hoch');
  const qz = () => q.evaluate(() => ({ stack: AD.presentation.stack.length, menu: !!document.querySelector('.menu'), pop: !!document.querySelector('.pop'), hash: location.hash,
    liste: side.classList.contains('page') && !side.hidden, bean: !!document.querySelector('#app .bk-kopf'), fokus: document.activeElement?.matches?.('#app .pnav') ? 'pnav'
      : document.activeElement?.matches?.('#side .side-head h2') ? 'h2' : document.activeElement?.id || document.activeElement?.tagName, s17: window.__s17 || null }));
  await t.schritt(q, 'Katalog iPhone hoch: #presentation', async () => { await q.goto(url); await q.waitForFunction(() => window.__katalog); await q.waitForTimeout(600); });
  n = await qz();
  fall('S-18', `iPhone: #presentation öffnet die Startliste (${JSON.stringify(n)})`, n.liste && !n.bean);
  // navPush aus der Startliste, während ein Menü auf dem Stapel liegt
  await t.schritt(q, 'S-17 Menü an ‚Mehr‘ der Startliste (Stapel)', async () => { await q.evaluate(() => AD.presentation.present('menu', [{ label: 'Probe', icon: 'info', act() {} }], { sourceItem: '#sideMore' })); await q.waitForTimeout(450); });
  n = await qz();
  fall('S-17', `Menü liegt auf dem Stapel (${JSON.stringify(n)})`, n.stack === 1 && n.menu);
  await t.schritt(q, 'S-17 navPush → presentation', async () => {
    await q.evaluate(() => AD.navPush(() => { window.__s17 = { stack: AD.presentation.stack.length, menu: !!document.querySelector('.menu'), on: !!document.querySelector('#sideMore.on'), liste: !side.hidden }; window.__katalog.showBean('presentation'); }));
    await navFertig(q); await q.waitForTimeout(600);
  });
  n = await qz();
  fall('S-17', `navPush iPhone: zuerst Stapel leer, Tönung weg, noch in der Startliste (${JSON.stringify(n.s17)}); dann die Bean ohne Menü, Fokus auf dem Seitentitel (${n.fokus})`,
    n.s17 && !n.s17.stack && !n.s17.menu && !n.s17.on && n.s17.liste && n.bean && !n.liste && !n.menu && !n.stack && n.fokus === 'pnav');
  // navPop: Sprechblase bzw. Menü auf dem Stapel (Mehr › Eintrag löschen → Abfrage), dann zurück zur Startliste
  for (const [was, oeffne] of [['Sprechblase', async () => { await q.tap('#adLeiste [data-command="more"]'); await q.waitForTimeout(450); await q.tap('.menu .mi.red'); await q.waitForTimeout(450); }],
    ['Menü', async () => { await q.tap('#adLeiste [data-command="more"]'); await q.waitForTimeout(450); }]]) {
    if (was === 'Menü') {
      await t.schritt(q, 'S-17 wieder zur Bean', async () => { await q.evaluate(() => AD.navPush(() => window.__katalog.showBean('presentation'))); await navFertig(q); await q.waitForTimeout(600); });
    }
    await t.schritt(q, `S-17 ${was} öffnen`, oeffne);
    n = await qz();
    fall('S-17', `${was} liegt auf dem Stapel (${JSON.stringify(n)})`, n.stack >= 1 && (was === 'Menü' ? n.menu : n.pop));
    await t.schritt(q, `S-17 navPop mit ${was}`, async () => {
      await q.evaluate(() => { window.__s17 = null; const off = AD.presentation.on('change', ({ stack }) => { if (!stack.length && !window.__s17) { window.__s17 = { menu: !!document.querySelector('.menu'), pop: !!document.querySelector('.pop'),
        on: !!document.querySelector('#adLeiste .on'), liste: !side.hidden }; off(); } }); AD.navPop(); });
      await navFertig(q); await q.waitForTimeout(700);
    });
    n = await qz();
    fall('S-17', `navPop mit ${was}: zuerst Stapel leer, Tönung weg, noch auf der Bean (${JSON.stringify(n.s17)}); dann die Startliste ohne Menü und Sprechblase, Fokus auf dem Seitentitel (${n.fokus})`,
      n.s17 && !n.s17.menu && !n.s17.pop && !n.s17.on && !n.s17.liste && n.liste && !n.menu && !n.pop && !n.stack && n.fokus === 'h2');
    await q.evaluate(() => [...AD.presentation.stack].reverse().forEach(h => AD.presentation.dismiss(h)));
  }
  await q.close();

  for (const k of konsole) t.fehler('APD-149', `Konsolenfehler: ${k}`);
  await t.ende(b);
}
