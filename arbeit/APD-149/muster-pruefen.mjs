// APD-149 – Muster im Bean-Katalog prüfen (Sitzung AppDesign 0002): Testfall-Liste APD-149/S-1 bis S-15 (arbeit/APD-149 Grobentwurf V-3.md 5) gegen
// katalog/index.html#presentation mit dem Entwurf katalog/entwurf/presentation-commands.js, dazu S-5 mit APD-149/J-3 und die Fälle aus RLB-126 (L-1 bis L-4).
// Nach den Schritten die Grundregeln (pruefe.mjs schritt, hig.mjs). Aufruf aus dem Ordner AppDesign:
//   node arbeit/APD-149/muster-pruefen.mjs            (PRUEF_BROWSER=webkit für WebKit)
//   APD149_GEGENPROBE=1 node arbeit/APD-149/muster-pruefen.mjs   – S-15: Ableitung bzw. Freigabe abgeschaltet, S-1 bis S-3 müssen rot werden
// Nummern S-, L-, H-, J- gelten nur im Thema APD-149.
import { createRequire } from 'node:module';
import { pruefung } from '../../tests/pruefe.mjs';
import { createCheck } from '../../tests/hig.mjs';

const pw = createRequire('/home/user/ReiseLogBuch/tests/')('playwright');
const GP = process.env.APD149_GEGENPROBE === '1';
const t = pruefung(GP ? 'apd149-gegenprobe' : 'apd149-muster', pw, { hig: GP ? null : createCheck() });
const URL_ = new URL('../../katalog/index.html#presentation', import.meta.url).href;
const funde = new Map(), gpFunde = new Map();   // Fall → Fehler (für die Gegenprobe)
const fall = (nr, was, ok) => { if (!ok) { funde.set(nr, (funde.get(nr) || 0) + 1); if (!GP || !/^S-[123]$/.test(nr)) t.fehler('APD-149', `${nr} ${was}`); } return ok; };

const b = await t.browser();
const p = await t.seite(b, 'iPad quer');
const konsole = [];
p.on('console', m => { if (m.type() === 'error') konsole.push(m.text().split('\n')[0]); });
await p.addInitScript(() => {
  // Teilen steuerbar (S-11): canShare ja, share läuft, bis die Prüfung es beendet
  navigator.canShare = () => true;
  navigator.share = () => new Promise(res => { window.__teilenFertig = res; });
});
const ruhe = (ms = 450) => p.waitForTimeout(ms);
const z = () => p.evaluate(() => {
  const q = s => document.querySelector(s), k = id => q(`#adLeiste [data-command="${id}"]`);
  const st = el => el ? { on: el.classList.contains('on'), exp: el.getAttribute('aria-expanded') } : null;
  const a = document.activeElement;
  return { stack: AD.presentation.stack.map(h => h.kind).join(' › '), menu: !!q('.menu:not(.submenu)'), sub: !!q('.menu.submenu'), more: st(k('more')), output: st(k('output')), add: st(k('entry.add')),
    fokus: a?.dataset?.command || a?.id || (a?.classList.contains('mi') ? 'mi:' + a.textContent.trim() : a?.tagName), barInert: !!k('more')?.closest('[inert]'), listeInert: !!q('#adListe')?.closest('[inert]'),
    dlg: dlg.open, dlgTitel: q('#dlg .dlg-head h3')?.textContent || '', msg: msg.open, msgTitel: msg.open ? q('#msgTitel')?.textContent : '', pop: !!q('.pop'),
    items: [...document.querySelectorAll('.menu:not(.submenu) .mi')].map(m => (m.disabled ? '~' : '') + (m.classList.contains('red') ? '!' : '') + m.textContent.trim()),
    log: [...document.querySelectorAll('#bkProt li')].map(l => l.textContent).join(' | ') };
});
const tippe = async sel => { await p.tap(sel, { timeout: 4000 }).catch(e => t.fehler('APD-149', `Tippen auf ${sel}: ${e.message.split('\n')[0]}`)); await ruhe(); };
const tippeBei = async (x, y) => { await p.touchscreen.tap(x, y); await ruhe(); };
const schliessenAlles = async () => { await p.evaluate(() => [...AD.presentation.stack].reverse().forEach(h => AD.presentation.dismiss(h))); await ruhe(); };
const halten = async sel => { const r = await p.locator(sel).boundingBox({ timeout: 4000 }).catch(() => null); if (!r) { t.fehler('APD-149', `Halten: ${sel} fehlt`); return; } await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.mouse.down(); await p.waitForTimeout(900); await p.mouse.up(); await ruhe(); };

const oeffnen = async (gp = '') => { await p.goto(URL_ + (gp ? '' : '')); await p.waitForFunction(() => window.__katalog && window.AD?.commands); await p.evaluate(m => { window.__adPresentationGegenprobe = m; }, gp); await ruhe(600); };
let s;
for (const gp of GP ? ['ableitung', 'freigabe'] : ['']) {
await t.schritt(p, `Katalog: presentation öffnen${gp ? ' – Gegenprobe ' + gp : ''}`, () => oeffnen(gp));

// S-1 Menü öffnen
await t.schritt(p, 'S-1 Mehr öffnen', () => tippe('#adLeiste [data-command="more"]'));
s = await z();
fall('S-1', `Menü offen (Stapel ‚${s.stack}‘)`, s.menu && s.stack === 'menu');
fall('S-1', 'Quelle getönt', s.more?.on);
fall('S-1', `aria-expanded="true" (ist ${s.more?.exp})`, s.more?.exp === 'true');
fall('S-1', 'Rest gesperrt (Liste inert)', s.listeInert);
fall('S-1', 'Kopfzeile frei (H-6)', !s.barInert);
fall('S-1', `Fokus auf dem ersten Eintrag (ist ${s.fokus})`, /^mi:/.test(s.fokus));

// S-2 Menü schließen: Tippen außerhalb (auf eine Kachel – der Klick wird geschluckt), Escape, Auswahl
const kachel = await p.locator('#adListe [data-id="z1"]').boundingBox();
await t.schritt(p, 'S-2 Tippen außerhalb', () => tippeBei(kachel.x + 40, kachel.y + kachel.height / 2));
s = await z();
fall('S-2', 'außerhalb: Menü zu', !s.menu && !s.stack);
fall('S-2', 'außerhalb: Tönung weg', s.more && !s.more.on);
fall('S-2', `außerhalb: aria-expanded="false" (ist ${s.more?.exp})`, s.more?.exp === 'false');
fall('S-2', `außerhalb: Fokus auf der Quelle (ist ${s.fokus})`, s.fokus === 'more');
fall('S-2', 'außerhalb: der Tipp erreicht die Kachel darunter nicht (Übergabe 3.3)', !/Kachel angetippt/.test(s.log));
await tippe('#adLeiste [data-command="more"]');
await t.schritt(p, 'S-2 Escape', async () => { await p.keyboard.press('Escape'); await ruhe(); });
s = await z();
fall('S-2', 'Escape: Menü zu, frei, Fokus', !s.menu && s.more && !s.more.on && s.more.exp === 'false' && s.fokus === 'more');
await tippe('#adLeiste [data-command="more"]');
await tippe('.menu .mi[aria-haspopup]');
await t.schritt(p, 'S-2 Auswahl ‚Groß‘', () => tippe('.menu.submenu .mi:nth-of-type(2)'));
s = await z();
fall('S-2', `Auswahl: Menü und Untermenü zu, frei, Fokus (Stapel ‚${s.stack}‘, Fokus ${s.fokus})`, !s.menu && !s.sub && s.more && !s.more.on && s.more.exp === 'false' && s.fokus === 'more');
fall('S-2', 'Auswahl: Befehl lief (Darstellung groß)', await p.evaluate(() => AD.commands.context.view === 'large'));

// S-3 Neuaufbau bei offenem Menü (APD-150)
await tippe('#adLeiste [data-command="more"]');
await t.schritt(p, 'S-3 Kopfzeile neu aufbauen', async () => { await p.evaluate(() => { document.querySelector('#adLeiste [data-command="more"]').dataset.alt = '1'; AD.commands.revalidate(); }); await ruhe(); });
s = await z();
const neu = await p.evaluate(() => !document.querySelector('#adLeiste [data-command="more"]').dataset.alt);
fall('S-3', 'die Schaltfläche ist neu aufgebaut', neu);
fall('S-3', 'neue Schaltfläche getönt', s.more?.on);
fall('S-3', `neue Schaltfläche aria-expanded="true" (ist ${s.more?.exp})`, s.more?.exp === 'true');
fall('S-3', 'Menü bleibt offen', s.menu);
await p.keyboard.press('Escape'); await ruhe();
s = await z();
fall('S-3', 'nach dem Schließen frei', s.more && !s.more.on && s.more.exp === 'false');
if (GP) { gpFunde.set(gp, Object.fromEntries(funde)); funde.clear(); }
}

if (!GP) {
  // S-4 Untermenü öffnen und schließen; ein Untermenü im Untermenü öffnet nicht (H-2)
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-4 Untermenü öffnen', () => tippe('.menu .mi[aria-haspopup]'));
  let u = await p.evaluate(() => { const it = document.querySelector('.menu:not(.submenu) .mi[aria-haspopup]'); return { exp: it.getAttribute('aria-expanded'), on: it.classList.contains('on'), sub: !!document.querySelector('.menu.submenu') }; });
  fall('S-4', `Untermenü offen, Eintrag aria-expanded und getönt (${JSON.stringify(u)})`, u.sub && u.exp === 'true' && u.on);
  const vorher = konsole.length;
  const h2 = await p.evaluate(() => { const r = AD.presentation.present('submenu', [{ label: 'Tiefer', act() {} }], { sourceItem: document.querySelector('.menu.submenu .mi') }); return { r: r === null, n: document.querySelectorAll('.menu.submenu').length }; });
  fall('S-4', `Untermenü im Untermenü öffnet nicht (H-2): ${JSON.stringify(h2)}, Meldung ${konsole.length - vorher}`, h2.r && h2.n === 1 && konsole.length - vorher === 1);
  konsole.length = vorher;
  await tippe('.menu:not(.submenu) .mi[aria-haspopup]');
  u = await p.evaluate(() => { const it = document.querySelector('.menu:not(.submenu) .mi[aria-haspopup]'); return { exp: it.getAttribute('aria-expanded'), on: it.classList.contains('on'), sub: !!document.querySelector('.menu.submenu'), f: document.activeElement === it }; });
  fall('S-4', `zweiter Tipp schließt das Untermenü, Fokus auf dem Eintrag (${JSON.stringify(u)})`, !u.sub && u.exp === 'false' && !u.on && u.f);
  await p.keyboard.press('Escape'); await ruhe();

  // S-5 andere Schaltfläche der Kopfzeile bei offenem Menü: ein Tipp (H-1, H-6); eigene schließt; ohne Menü wirkt sie auch (J-3)
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
  await t.schritt(p, 'S-9 anderes Fenster', () => tippe('#adAnderes'));
  s = await z();
  fall('S-9', `das alte ist zu, nur ein Fenster (Stapel ‚${s.stack}‘, Titel ‚${s.dlgTitel}‘)`, s.stack === 'sheet' && /Anderes Fenster/.test(s.dlgTitel) && /Fenster ‚Eintrag bearbeiten‘ zu · replaced/.test(s.log));
  await tippe('#dlgX');
  s = await z();
  fall('S-6', `nach dem Schließen frei, Fokus zurück auf Mehr (Fokus ${s.fokus})`, !s.dlg && !s.more.on && s.fokus === 'more');

  // S-10 Fenster mit Änderungen: Escape bzw. Tippen außerhalb fragen (H-9)
  await tippe('#adLeiste [data-command="more"]'); await tippe('.menu .mi:first-of-type');
  await p.fill('#adTitel', 'Rom und Florenz'); await ruhe(200);
  await t.schritt(p, 'S-10 Escape mit Änderungen', async () => { await p.keyboard.press('Escape'); await ruhe(); });
  s = await z();
  fall('S-10', `Escape fragt, das Fenster bleibt (Stapel ‚${s.stack}‘)`, s.pop && s.dlg && s.stack === 'sheet › popover');
  await tippe('.pop [data-i="1"]');
  s = await z();
  fall('S-10', '‚Weiter bearbeiten‘: Fenster bleibt mit Text', !s.pop && s.dlg && await p.inputValue('#adTitel') === 'Rom und Florenz');
  await t.schritt(p, 'S-10 neben das Fenster tippen', () => tippeBei(6, 400));
  s = await z();
  fall('S-10', 'Tippen außerhalb fragt ebenfalls', s.pop && s.dlg);
  await tippe('.pop [data-i="0"]');
  s = await z();
  fall('S-10', `‚Änderungen verwerfen‘ schließt (Stapel ‚${s.stack}‘)`, !s.dlg && !s.stack && !s.more.on);

  // S-11 Teilen läuft, zweites Teilen abgelehnt (H-8); S-12 Ergebnis im Hinweisfenster hält die Quelle
  await tippe('#adLeiste [data-command="output"]');
  await t.schritt(p, 'S-11 Teilen', () => tippe('.menu .mi:first-of-type'));
  s = await z();
  fall('S-11', `Teilen läuft, Ausgabe getönt (Stapel ‚${s.stack}‘)`, s.stack === 'activity' && s.output.on && !s.menu);
  const zweit = await p.evaluate(() => AD.presentation.present('activity', () => new Promise(() => {}), { command: 'output.share' }) === null);
  s = await z();
  fall('S-11', 'zweites Teilen abgelehnt, Quelle bleibt getönt', zweit && s.stack === 'activity' && s.output.on && /abgelehnt/.test(s.log));
  await t.schritt(p, 'S-12 Teilen endet', async () => { await p.evaluate(() => window.__teilenFertig?.()); await ruhe(600); });
  s = await z();
  fall('S-12', `Ergebnis im Hinweisfenster, Ausgabe weiter getönt (Stapel ‚${s.stack}‘, Titel ‚${s.msgTitel}‘)`, s.stack === 'alert' && s.msgTitel === 'Teilen' && s.output.on);
  await tippe('#msg [data-x]');
  s = await z();
  fall('S-12', `nach dem Hinweis frei, Fokus auf Ausgabe (Fokus ${s.fokus})`, !s.msg && !s.output.on && s.fokus === 'output');

  // S-13 Drehen bei offenem Menü, Fenster bzw. Hinweisfenster
  const quer = p.viewportSize(), hoch = { width: quer.height, height: quer.width };
  const drehen = async () => { await p.setViewportSize(hoch); await ruhe(700); const a = await z(); await p.setViewportSize(quer); await ruhe(700); return [a, await z()]; };
  await tippe('#adLeiste [data-command="more"]');
  for (const x of await drehen()) {
    const lage = await p.evaluate(() => { const m = document.querySelector('.menu').getBoundingClientRect(), a = document.querySelector('#adLeiste [data-command="more"]').getBoundingClientRect();
      return m.top >= a.bottom && m.right > a.left - 1 && m.left < a.right + 1 && m.bottom <= innerHeight && m.right <= innerWidth; });
    fall('S-13', `Menü nach dem Drehen an der Schaltfläche, getönt, Fokus im Menü (${x.fokus})`, x.menu && lage && x.more.on && x.more.exp === 'true' && /^mi:/.test(x.fokus));
  }
  await tippe('.menu .mi:first-of-type');
  for (const x of await drehen()) fall('S-13', `Fenster nach dem Drehen offen, Mehr getönt`, x.dlg && x.more.on && x.stack === 'sheet');
  await tippe('#adHinweis');
  for (const x of await drehen()) fall('S-13', `Hinweis nach dem Drehen offen, Quelle getönt, Fokus im Hinweis (${x.fokus})`, x.msg && x.more.on && x.stack === 'sheet › alert' && x.fokus === 'msg');
  await schliessenAlles();

  // S-14 Befehl wird unmöglich (revalidate): im Menü gedimmt, im Kontextmenü und beim Wischen fehlt er (H-7)
  await tippe('#adLeiste [data-command="more"]');
  await t.schritt(p, 'S-14 Auswahl weg bei offenem Menü', async () => { await p.evaluate(() => { AD.commands.context.selection = false; AD.commands.revalidate(); }); await ruhe(); });
  s = await z();
  fall('S-14', `im Menü gedimmt (${s.items.join(', ')})`, s.items.includes('~!Eintrag löschen') && s.menu);
  await p.keyboard.press('Escape'); await ruhe();
  await t.schritt(p, 'S-14 Kontextmenü', () => halten('#adListe [data-id="z1"]'));
  s = await z();
  fall('S-14', `im Kontextmenü fehlt ‚Endgültig löschen‘ (${s.items.join(', ')})`, s.menu && s.items.join() === 'Wiederherstellen');
  await p.keyboard.press('Escape'); await ruhe();
  const wisch = await p.evaluate(() => { const k = document.querySelector('#adListe [data-id="z1"]'); AD.commands.context.row = { id: 'z1' }; return AD.commands.items('row', { place: 'swipe' }).filter(x => x.label).map(x => x.shortTitle); });
  fall('S-14', `beim Wischen fehlt er (${wisch.join(', ')})`, wisch.join() === 'Zurück');
  await p.evaluate(() => { AD.commands.context.selection = true; delete AD.commands.context.row; AD.commands.revalidate(); });

  // L-1 bis L-4 (RLB-126): Endgültig löschen und Wiederherstellen in Kontextmenü und Wischen, die Listen-Ebene
  await t.schritt(p, 'L-1 Kontextmenü mit Auswahl', () => halten('#adListe [data-id="z1"]'));
  s = await z();
  fall('L-1', `Kontextmenü: Wiederherstellen, Abstand, rot ‚Endgültig löschen‘ zuletzt (${s.items.join(', ')})`, s.items.join() === 'Wiederherstellen,!Endgültig löschen');
  await t.schritt(p, 'L-1 Endgültig löschen', () => tippe('.menu .mi.red'));
  s = await z();
  const kOn = await p.evaluate(() => document.querySelector('#adListe [data-id="z1"]').classList.contains('on'));
  fall('L-1', `Abfrage an der Kachel, Kachel getönt (Stapel ‚${s.stack}‘)`, s.pop && s.stack === 'popover' && kOn && !s.menu);
  await tippe('.pop [data-i="1"]');
  s = await z();
  fall('L-1', '‚Abbrechen‘ ändert nichts, Kachel frei', !s.pop && !s.stack && /abgebrochen/.test(s.log) && !await p.evaluate(() => document.querySelector('#adListe [data-id="z1"]').classList.contains('on')));
  await halten('#adListe [data-id="z1"]');
  await t.schritt(p, 'L-2 Wiederherstellen', () => tippe('.menu .mi:first-of-type'));
  s = await z();
  fall('L-2', 'Wiederherstellen aus dem Kontextmenü läuft', /Wiederherstellen/.test(s.log) && !s.menu);
  await halten('#adListe [data-id="z2"]');
  s = await z();
  fall('L-2', `gesperrte Kachel: nur Wiederherstellen (${s.items.join(', ')})`, s.items.join() === 'Wiederherstellen');
  await p.keyboard.press('Escape'); await ruhe();
  const w2 = await p.evaluate(() => { const r = (id) => { AD.commands.context.row = { id, locked: id === 'z2' }; const l = AD.commands.items('row', { place: 'swipe' }).filter(x => x.label).map(x => (x.red ? '!' : '') + x.shortTitle).join(); delete AD.commands.context.row; return l; }; return [r('z1'), r('z2')]; });
  fall('L-3', `Wischen: z1 ‚${w2[0]}‘, gesperrt z2 ‚${w2[1]}‘`, w2[0] === 'Zurück,!Löschen' && w2[1] === 'Zurück');
  await halten('#adListe [data-id="z1"]');
  await t.schritt(p, 'L-4 Liste neu aufbauen bei offenem Kontextmenü', async () => { await p.evaluate(() => { const l = document.getElementById('adListe'); l.innerHTML = l.innerHTML; }); await ruhe(); });
  s = await z();
  const k4 = await p.evaluate(() => document.querySelector('#adListe [data-id="z1"]').classList.contains('on'));
  fall('L-4', 'die neue Kachel ist getönt, das Kontextmenü bleibt', s.menu && k4);
  await p.keyboard.press('Escape'); await ruhe();
  fall('L-4', 'nach dem Schließen frei', !await p.evaluate(() => document.querySelector('#adListe [data-id="z1"]').classList.contains('on')));
}
for (const k of konsole) t.fehler('APD-149', `Konsolenfehler: ${k}`);
if (GP) {
  const a = gpFunde.get('ableitung'), f = gpFunde.get('freigabe');
  t.wahr(`S-15 ohne Ableitung: S-1 und S-3 rot (${JSON.stringify(a)})`, a['S-1'] > 0 && a['S-3'] > 0, 'APD-149');
  t.wahr(`S-15 ohne Freigabe: S-2 und S-3 rot (${JSON.stringify(f)})`, f['S-2'] > 0 && f['S-3'] > 0, 'APD-149');
  console.log(`S-15 Gegenprobe: ohne Ableitung ${JSON.stringify(a)} · ohne Freigabe ${JSON.stringify(f)}`);
}
await t.ende(b);
