// APD-149 – Muster im Bean-Katalog prüfen (Sitzung AppDesign 0002): Testfall-Liste APD-149/S-1 bis S-15 (arbeit/APD-149 Grobentwurf V-3.md 5) gegen
// katalog/index.html#presentation mit dem Entwurf katalog/entwurf/presentation-commands.js, dazu S-5 mit APD-149/J-3 und die Fälle aus RLB-126 (L-1 bis L-4).
// Nach den Schritten die Grundregeln (pruefe.mjs schritt, hig.mjs). Aufruf aus dem Ordner AppDesign:
//   node arbeit/APD-149/muster-pruefen.mjs            (PRUEF_BROWSER=webkit für WebKit)
//   APD149_GEGENPROBE=1 node arbeit/APD-149/muster-pruefen.mjs   – S-15: Ableitung bzw. Freigabe abgeschaltet, S-1 bis S-3 müssen rot werden
// Seit der Sitzung AppDesign 0006 dazu APD-151 ‚Fenster am iPhone wie am iPad‘: die Testfall-Liste APD-151/M-1 bis M-18 (arbeit/APD-151 Testfall-Liste.md):
//   MUSTER=apd151 node arbeit/APD-149/muster-pruefen.mjs        – nur APD-151 (M-1 bis M-17)
//   APD151_GEGENPROBE=1 node arbeit/APD-149/muster-pruefen.mjs  – M-18: Weiche abgeschaltet (__adPresentationGegenprobe = 'blatt'), M-1 und M-7 müssen rot werden
// Nummern S-, L-, H-, J- gelten nur im Thema APD-149, M- nur im Thema APD-151.
import { createRequire } from 'node:module';
import { pruefung, warteBis } from '../../tests/pruefe.mjs';
import { createCheck } from '../../tests/hig.mjs';
import { checkSheet, checkTastaturStill, STILL_LEISTEN, STILL_LINKS } from '../../tests/ablauf.mjs';
import { safariModell } from '../../tests/safari.mjs';

const pw = createRequire('/home/user/ReiseLogBuch/tests/')('playwright');
const GP = process.env.APD149_GEGENPROBE === '1', GP151 = process.env.APD151_GEGENPROBE === '1', NUR151 = process.env.MUSTER === 'apd151';
const S = !GP151 && !NUR151;   // die Fälle von APD-149 (S-, L-)
// Grundregeln: R-4.5 ‚Fenster nicht bildschirmbreit‘ ist im iPhone-Aufbau die gewollte Folge von APD-151 (der Wortlaut von R-4.5, R-4.6 und 15.17 kommt
// nach dem Muster, 0 Nr. 29) – erwartet, darum gemeldet, aber kein Fehler; alles andere wie hig.report
const higEcht = createCheck(), ERWARTET = /^Regel: R-4\.5 Fenster nicht bildschirmbreit$/;
const hig = { ...higEcht, report() {
  const f = higEcht.funde(), rest = f.filter(k => !ERWARTET.test(k));
  if (f.length > rest.length) console.log('ℹ erwartet (APD-151, Wortlaut folgt): R-4.5 Fenster nicht bildschirmbreit – das Fenster steht am iPhone in der Mitte');
  if (!rest.length) return 0;
  console.log(`HIG- und Regel-Prüfung: ${rest.length} Abweichung(en)\n`); for (const k of rest) console.log(`- ${k}`); return 1; } };
const t = pruefung(GP ? 'apd149-gegenprobe' : GP151 ? 'apd151-gegenprobe' : NUR151 ? 'apd151-muster' : 'apd149-muster', pw, { hig: GP || GP151 ? null : hig });
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
for (const gp of !S ? [] : GP ? ['ableitung', 'freigabe'] : ['']) {
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

if (S && !GP) {
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

  // S-16 Untermenü bleibt beim Neuaufbau offen (Rückmeldung am Gerät 27.11.2026, Schritt 15: ‚Ansicht‘ schloss nach 2 s): Schalter ‚Kopfzeile alle 2 s
  // neu aufbauen‘ ein, Mehr › Ansicht, 5 s warten – Untermenü offen, sein Eintrag im neu gezeichneten Menü aria-expanded und getönt, Untermenü am Eintrag
  await t.schritt(p, 'S-16 Schalter ‚Kopfzeile alle 2 s neu aufbauen‘ ein', () => tippe('label:has(#adNeu)'));
  await tippe('#adLeiste [data-command="more"]');
  await tippe('.menu .mi[aria-haspopup]');
  await t.schritt(p, 'S-16 Mehr › Ansicht, 5 s warten', () => ruhe(5000));
  u = await p.evaluate(() => {
    const it = document.querySelector('.menu:not(.submenu) .mi[aria-haspopup]'), sm = document.querySelector('.menu.submenu');
    const ri = it?.getBoundingClientRect(), rs = sm?.getBoundingClientRect();
    return { an: document.getElementById('adNeu').checked, stack: AD.presentation.stack.map(h => h.kind).join(' › '), sub: !!sm, exp: it?.getAttribute('aria-expanded'), on: it?.classList.contains('on'),
      neben: !!(ri && rs && Math.abs(rs.top - ri.top) < 2 && (rs.right <= ri.left + 1 || rs.left >= ri.right - 1)), more: document.querySelector('#adLeiste [data-command="more"]').classList.contains('on') };
  });
  fall('S-16', `Untermenü nach 5 s mit Neuaufbau offen, Eintrag aria-expanded und getönt, am Eintrag, Mehr getönt (${JSON.stringify(u)})`, u.an && u.stack === 'menu › submenu' && u.sub && u.exp === 'true' && u.on && u.neben && u.more);
  await t.schritt(p, 'S-16 Auswahl ‚Kompakt‘ im Untermenü', () => tippe('.menu.submenu .mi:nth-of-type(1)'));
  s = await z();
  fall('S-16', `Auswahl nach dem Neuaufbau: alles zu, frei, Befehl lief (Stapel ‚${s.stack}‘)`, !s.menu && !s.sub && s.more && !s.more.on && s.more.exp === 'false' && await p.evaluate(() => AD.commands.context.view === 'compact'));
  await tippe('label:has(#adNeu)');
  fall('S-16', 'Schalter wieder aus', !await p.evaluate(() => document.getElementById('adNeu').checked));

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
  // seit dem Muster APD-151 (J-3 Nr. 4, wie am iPad und bei Apple): Tippen neben das Fenster schließt nicht und fragt nicht – bis dahin fragte es (H-9)
  await t.schritt(p, 'S-10 neben das Fenster tippen', () => tippeBei(6, 400));
  s = await z();
  fall('S-10', `Tippen außerhalb: das Fenster bleibt, keine Frage (APD-151/J-3; Stapel ‚${s.stack}‘)`, !s.pop && s.dlg && s.stack === 'sheet');
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
/* ---------- APD-151 ‚Fenster am iPhone wie am iPad‘ – M-1 bis M-18 (arbeit/APD-151 Testfall-Liste.md) ---------- */
// Nach jedem Schritt die Grundregeln (t.schritt: hig.mjs, Bewegungswächter). Fenster am iPhone: in der Mitte des sichtbaren Bereichs, Höhe nach Inhalt,
// Breite nach R-4.8 (90 %, quer mindestens 480 px), Ecken rundum, Abdunkelung 0,35, die Seite bleibt groß (APD-151/J-2, J-3).
const mFunde = new Map();
const mFall = (nr, was, ok) => { if (!ok) { mFunde.set(nr, (mFunde.get(nr) || 0) + 1); if (!GP151) t.fehler('APD-151', `${nr} ${was}`); } return ok; };
const mWarte = (q, ms = 450) => q.waitForTimeout(ms);
// Lage des Fensters und was drumherum geschieht (Bildschirm = Lage minus offsetTop des sichtbaren Bereichs)
const fl = q => q.evaluate(() => {
  const d = dlg, r = d.getBoundingClientRect(), cs = getComputedStyle(d), vv = visualViewport, H = document.documentElement, o = vv.offsetTop;
  const tr = cs.translate && cs.translate !== 'none' ? parseFloat(cs.translate.split(' ')[1]) || 0 : 0;
  const body = d.querySelector('.dlg-body'), kopf = d.querySelector('.dlg-head')?.getBoundingClientRect(), s = safeRand();
  const seite = [document.getElementById('app'), document.getElementById('side')].filter(e => e && e.getClientRects().length);
  const m = x => Math.round(x * 10) / 10;
  return { open: d.open, top: m(r.top - o), bottom: m(r.bottom - o), left: m(r.left), right: m(r.right), width: m(r.width), height: m(r.height), t: Math.round(tr),
    radien: ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'].map(k => parseFloat(cs[`border${k}Radius`]) || 0),
    schleier: +(+getComputedStyle(document.querySelector('.blatt-schleier')).opacity).toFixed(3), backdrop: getComputedStyle(d, '::backdrop').backgroundColor,
    zurueck: H.classList.contains('blatt-zurueck'),
    seiteBewegt: seite.some(e => { const c = getComputedStyle(e); return (c.translate && c.translate !== 'none' && !/^0px( 0px)?$/.test(c.translate)) || (c.scale && c.scale !== 'none' && c.scale !== '1'); }),
    sichtbar: m(window.__safari ? __safari.hoehe() : vv.height), w: innerWidth, h: innerHeight, oben: Math.max(10, s.top), unten: Math.max(10, s.bottom),
    rollt: body ? body.scrollHeight > body.clientHeight + 1 : false, kopfTop: kopf ? m(kopf.top - o) : null, kopfH: kopf ? m(kopf.height) : null,
    titel: d.querySelector('.dlg-head h3')?.textContent || '', stack: AD.presentation.stack.map(h => h.kind).join(' › '),
    pop: [...document.querySelectorAll('.pop button')].map(b => b.textContent.trim()), log: [...document.querySelectorAll('#bkProt li')].map(l => l.textContent).join(' | '),
    klasse: d.classList.contains('ad-presentation-sheet'), phone: H.classList.contains('phone'), quer: matchMedia('(orientation: landscape) and (max-height: 500px)').matches,
    fokus: document.activeElement?.id || document.activeElement?.dataset?.command || document.activeElement?.tagName };
});
// in der Mitte, ganz sichtbar, Höhe nach Inhalt: passt der Inhalt, steht es mittig; sonst oben und unten mindestens 10 px (bzw. sichere Ränder)
const mitte = l => {
  const ro = l.top, ru = l.sichtbar - l.bottom, waag = Math.abs(l.left - (l.w - l.right)) <= 2;
  return waag && ro >= l.oben - 1 && ru >= l.unten - 1 && (l.rollt || Math.abs((ro - l.oben) - (ru - l.unten)) <= 2);
};
// das Protokoll (neueste zuerst): ‚Stapel · leer‘, davor ‚Fenster ‚Eintrag bearbeiten‘ zu · user‘
const zuUser = log => log.split(' | ').slice(0, 2).some(x => /Eintrag bearbeiten‘ zu · user/.test(x));
const lageText = l => `${l.left}–${l.right} × ${l.top}–${l.bottom} px von ${l.w} × ${l.sichtbar}${l.rollt ? ', Inhalt rollt' : ''}`;
// gleitet von unten herein mit der Feder (R-1.12): eine Bewegung am #dlg von unten auf 0, 0,5 s, Kurve linear(…) – gleich nach der Handlung gelesen
const gleitet = q => q.evaluate(() => dlg.getAnimations().some(a => { const k = a.effect.getKeyframes(), y = v => parseFloat(String(v ?? '0 0').split(' ')[1]) || 0, g = a.effect.getTiming();
  return k.length > 1 && y(k[0].translate) > 50 && Math.abs(y(k.at(-1).translate)) < 1 && g.duration === GLEIT_AUF_MS && /^linear\(/.test(g.easing); }));
const ueberblendet = q => q.evaluate(() => { const a = dlg.getAnimations(); return a.length > 0 && a.every(x => x.effect.getKeyframes().every(k => !k.translate || /^0(px)? 0(px)?$/.test(k.translate))) && a.some(x => x.effect.getKeyframes().some(k => k.opacity != null)); });
const mZu = async q => {
  await q.evaluate(() => [...AD.presentation.stack].reverse().forEach(h => AD.presentation.dismiss(h)));
  await warteBis(q, () => !dlg.open && !msg.open && !document.querySelector('.blatt-geist, .pop, .menu') && !document.documentElement.classList.contains('blatt'), { max: 5000 });
  await mWarte(q, 150);
};
const mTippe = async (q, sel) => { await q.tap(sel, { timeout: 4000 }).catch(e => t.fehler('APD-151', `Tippen auf ${sel}: ${e.message.split('\n')[0]}`)); };
const bearbeiten = async q => { await mTippe(q, '#adLeiste [data-command="more"]'); await mWarte(q); await mTippe(q, '.menu .mi:first-of-type'); };
const mRuhe = q => warteBis(q, () => !document.documentElement.classList.contains('blatt-faehrt') && !document.querySelector('.blatt-geist') && !document.getAnimations().some(a => a.playState === 'running'), { max: 4000 }).then(() => mWarte(q, 150));
const kopfMitte = async q => { const b = await q.locator('#dlg .dlg-head h3').boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
// Ziehen wie checkSheet: langsam mit dem Zeiger (Lage mitten im Zug) oder schnell als Berührung mit festen Zeitstempeln (je 8 ms)
const zieh = async (q, { x, y }, dx, dy, schnell = false) => {
  if (schnell) {
    const mitten = await q.evaluate(({ x, y, dx, dy }) => {
      const el = document.elementFromPoint(x, y), t0 = performance.now(), opt = (cx, cy) => ({ bubbles: true, cancelable: true, composed: true, isPrimary: true, pointerId: 151, pointerType: 'touch', button: 0, clientX: cx, clientY: cy });
      const sende = (art, cx, cy, i) => { const e = new PointerEvent(art, opt(cx, cy)); Object.defineProperty(e, 'timeStamp', { value: t0 + 8 * i }); el.dispatchEvent(e); };
      sende('pointerdown', x, y, 0); for (let i = 1; i <= 4; i++) sende('pointermove', x + dx * i / 4, y + dy * i / 4, i);
      const tr = getComputedStyle(dlg).translate, m = tr && tr !== 'none' ? Math.round(parseFloat(tr.split(' ')[1]) || 0) : 0;
      sende('pointerup', x + dx, y + dy, 5); return m;
    }, { x, y, dx, dy });
    await mRuhe(q); return { ...(await fl(q)), t: mitten };
  }
  await q.mouse.move(x, y); await q.mouse.down();
  await q.mouse.move(x + dx * 0.1, y + dy * 0.1, { steps: 3 }); await q.mouse.move(x + dx, y + dy, { steps: 10 }); await mWarte(q, 160);
  const mitten = await fl(q);
  await q.mouse.up(); await mRuhe(q);
  return mitten;
};
const mOeffnen = async (q, gp = '') => {
  await q.goto(URL_); await q.waitForFunction(() => window.__katalog);
  await q.evaluate(gp => { window.__adPresentationGegenprobe = gp; if (isPhone()) showBean('presentation'); }, gp);
  await q.waitForFunction(() => window.AD?.commands); await mWarte(q, 600);
};
const mKonsole = q => q.on('console', m => { if (m.type() === 'error') t.fehler('APD-151', `Konsolenfehler (${t.ort}): ${m.text().split('\n')[0]}`); });

// M-1 (auch Gegenprobe): Bearbeiten → Anderes Fenster öffnen
async function m1(q) {
  await t.schritt(q, 'M-1 Bearbeiten', async () => { await bearbeiten(q); await mRuhe(q); });
  await t.schritt(q, 'M-1 Anderes Fenster öffnen', async () => {
    await mTippe(q, '#adAnderes');
    mFall('M-1', 'das Fenster gleitet nicht mit der Feder von unten herein (R-1.12)', await gleitet(q));
    await mRuhe(q);
  });
  const l = await fl(q);
  mFall('M-1', `Fenster ‚Anderes Fenster‘ offen (Stapel ‚${l.stack}‘, Titel ‚${l.titel}‘)`, l.open && l.stack === 'sheet' && /Anderes Fenster/.test(l.titel));
  mFall('M-1', `in der Mitte, Höhe nach Inhalt (${lageText(l)})`, mitte(l) && !l.rollt);
  mFall('M-1', `Breite 90 % (${l.width} statt ${Math.round(l.w * 9) / 10} px)`, Math.abs(l.width - 0.9 * l.w) <= 1);
  mFall('M-1', `Ecken rundum (${l.radien.join(' ')})`, l.radien.every(x => x >= 12));
  mFall('M-1', `Abdunkelung 0,35 (${l.schleier}), ::backdrop durchsichtig (${l.backdrop})`, Math.abs(l.schleier - 0.35) <= 0.02 && /rgba\(0, 0, 0, 0\)|transparent/.test(l.backdrop));
  mFall('M-1', 'die Seite dahinter bleibt groß (kein blatt-zurueck, nicht verschoben)', !l.zurueck && !l.seiteBewegt);
  mFall('M-1', 'ruht an seinem Platz', l.t === 0);
  return l;
}
// M-7 (auch Gegenprobe): Abdunkelung antippen – auf die Kachel, wenn sie neben dem Fenster liegt, sonst über dem Fenster
async function m7(q) {
  await mZu(q); await bearbeiten(q); await mRuhe(q);
  const punkt = await q.evaluate(() => { const d = dlg.getBoundingClientRect(), k = document.querySelector('#adListe [data-id="z1"]')?.getBoundingClientRect();
    if (k && (k.bottom < d.top - 4 || k.top > d.bottom + 4)) return { x: k.left + 40, y: (k.top + k.bottom) / 2, kachel: true };
    return { x: innerWidth / 2, y: Math.max(4, d.top / 2), kachel: false }; });
  await t.schritt(q, `M-7 Abdunkelung antippen (${punkt.kachel ? 'über der Kachel' : 'über dem Fenster'})`, async () => { await q.mouse.click(punkt.x, punkt.y); await mWarte(q, 500); });
  let l = await fl(q);
  mFall('M-7', `nach dem Antippen der Abdunkelung bleibt das Fenster offen (Stapel ‚${l.stack}‘${l.pop.length ? ', Frage ' + l.pop.join(' · ') : ''})`, l.open && l.stack === 'sheet' && !l.pop.length);
  mFall('M-7', 'darunter wird nichts angetippt', !/Kachel angetippt/.test(l.log));
  if (!l.open) await bearbeiten(q), await mRuhe(q);
  await t.schritt(q, 'M-7 Escape ohne Änderungen', async () => { await q.keyboard.press('Escape'); await mRuhe(q); });
  l = await fl(q);
  mFall('M-7', `Escape ohne Änderungen schließt wie x (offen ${l.open}, ${l.log.split(' | ').slice(0, 2).join(' | ')})`, !l.open && zuUser(l.log));
  await mZu(q); await bearbeiten(q); await mRuhe(q);
  await q.fill('#adTitel', 'Rom und Florenz');
  await t.schritt(q, 'M-7 Escape mit Änderungen', async () => { await q.keyboard.press('Escape'); await mWarte(q, 500); });
  l = await fl(q);
  mFall('M-7', `Escape mit Änderungen fragt (${l.pop.join(' · ') || 'keine Frage'})`, l.open && l.pop.some(x => /Änderungen verwerfen/.test(x)));
  await mZu(q);
}

if (GP151) {
  // M-18 Gegenprobe: Weiche abgeschaltet – wieder Blatt in voller Höhe, Antippen schließt; M-1 und M-7 müssen rot werden
  const q = await t.seite(b, 'iPhone hoch'); mKonsole(q);
  await mOeffnen(q, 'blatt');
  const l = await m1(q);
  await m7(q);
  t.wahr(`M-18 Gegenprobe: Fenster wieder Blatt (Klasse ${l.klasse}, ${lageText(l)})`, !l.klasse && l.bottom >= l.sichtbar - 1, 'APD-151');
  t.wahr(`M-18 Gegenprobe: M-1 und M-7 rot (${JSON.stringify(Object.fromEntries(mFunde))})`, mFunde.get('M-1') > 0 && mFunde.get('M-7') > 0, 'APD-151');
  console.log(`M-18 Gegenprobe: ${JSON.stringify(Object.fromEntries(mFunde))}`);
} else if (!GP) {
  const q = await t.seite(b, 'iPhone hoch'); mKonsole(q);
  await t.schritt(q, 'Katalog iPhone hoch: presentation öffnen', () => mOeffnen(q));
  // M-1
  await m1(q);
  // M-13 Hinweisfenster über dem Fenster: Meldung klein in der Mitte darüber wie heute
  await mZu(q); await bearbeiten(q); await mRuhe(q);
  await t.schritt(q, 'M-13 Hinweis über dem Fenster', async () => { await mTippe(q, '#adHinweis'); await mWarte(q, 600); });
  let a = await q.evaluate(() => { const r = msg.getBoundingClientRect(); return { open: msg.open, w: Math.round(r.width), left: r.left, right: r.right, W: innerWidth,
    stack: AD.presentation.stack.map(h => h.kind).join(' › ') }; });
  let l = await fl(q);
  mFall('M-13', `Meldung klein in der Mitte über dem Fenster (Stapel ‚${a.stack}‘, ${a.w} px breit)`, a.open && a.stack === 'sheet › alert' && a.w <= 361 && Math.abs(a.left - (a.W - a.right)) <= 2);
  mFall('M-13', `das Fenster bleibt darunter in der Mitte (${lageText(l)})`, l.open && mitte(l));
  await mTippe(q, '#msg [data-x]'); await mWarte(q, 500);
  // M-13 Fenster ersetzen (H-3): das alte gleitet als Abbild hinaus, das neue wie M-1 herein
  await t.schritt(q, 'M-13 Fenster ersetzen', async () => {
    await mTippe(q, '#adAnderes');
    const g = await q.evaluate(() => { const g = document.querySelector('.blatt-geist'), y = v => parseFloat(String(v ?? '0 0').split(' ')[1]) || 0, k = g?.getAnimations()[0]?.effect.getKeyframes() || [];
      return { geist: !!g, hinaus: k.length > 1 && y(k.at(-1).translate) > y(k[0].translate) + 100 }; });
    mFall('M-13', `das alte Fenster gleitet als Abbild hinaus (${JSON.stringify(g)})`, g.geist && g.hinaus);
    mFall('M-13', 'das neue Fenster gleitet wie M-1 herein', await gleitet(q));
    await mRuhe(q);
  });
  l = await fl(q);
  mFall('M-13', `danach das neue Fenster in der Mitte (Titel ‚${l.titel}‘, ${lageText(l)})`, /Anderes Fenster/.test(l.titel) && mitte(l) && l.stack === 'sheet' && /Eintrag bearbeiten‘ zu · replaced/.test(l.log));

  // M-2 Neuer Eintrag, Eintrag bearbeiten: Höhe nach Inhalt, in der Mitte, gleitet herein
  for (const [name, auf] of [['Neuer Eintrag', () => mTippe(q, '#adLeiste [data-command="entry.add"]')], ['Eintrag bearbeiten', async () => { await mTippe(q, '#adLeiste [data-command="more"]'); await mWarte(q); await mTippe(q, '.menu .mi:first-of-type'); }]]) {
    await mZu(q);
    let glitt = false;
    await t.schritt(q, `M-2 ${name}`, async () => { await auf(); glitt = await gleitet(q); await mRuhe(q); });
    l = await fl(q);
    mFall('M-2', `‚${name}‘ gleitet von unten herein`, glitt);
    mFall('M-2', `‚${name}‘ in der Mitte, Höhe nach Inhalt, 90 % breit (${lageText(l)})`, l.open && l.titel === name && mitte(l) && !l.rollt && l.height < l.sichtbar - 21 && Math.abs(l.width - 0.9 * l.w) <= 1);
    mFall('M-2', `‚${name}‘: Kopfzeile kompakt wie am iPhone (${l.kopfH} px)`, l.kopfH != null && l.kopfH <= 70);
  }

  // M-3 Inhalt höher als der Bildschirm: oben und unten ≥ 10 px, der Inhalt rollt, der Kopf steht still
  await mZu(q); await bearbeiten(q); await mRuhe(q);
  await t.schritt(q, 'M-3 Fenster mit langem Inhalt', async () => { await mTippe(q, '#adLang'); await mRuhe(q); });
  l = await fl(q);
  mFall('M-3', `langes Fenster: oben ${l.top} px, unten ${Math.round(l.sichtbar - l.bottom)} px Rand, Inhalt rollt (${lageText(l)})`, l.open && l.rollt && l.top >= l.oben - 1 && l.sichtbar - l.bottom >= l.unten - 1 && mitte(l));
  await t.schritt(q, 'M-3 Inhalt rollen', async () => { await q.evaluate(() => { dlg.querySelector('.dlg-body').scrollTop = 400; }); await mWarte(q, 300); });
  { const n = await fl(q), y = await q.evaluate(() => dlg.querySelector('.dlg-body').scrollTop);
    mFall('M-3', `beim Rollen steht der Fensterkopf still (${l.kopfTop} → ${n.kopfTop} px), das Fenster auch (${l.top} → ${n.top})`, y > 100 && Math.abs(n.kopfTop - l.kopfTop) <= 1 && Math.abs(n.top - l.top) <= 1); }

  // M-4 am Kopf kurz ziehen: nur das Fenster fährt mit, die Abdunkelung wird heller, federt zurück
  await mZu(q); await bearbeiten(q); await mRuhe(q);
  l = await fl(q);
  let m;
  await t.schritt(q, 'M-4 am Kopf 120 px ziehen und loslassen', async () => { m = await zieh(q, await kopfMitte(q), 0, 120); });
  mFall('M-4', `das Fenster folgt dem Finger (${m.t} px statt 120)`, Math.abs(m.t - 120) <= 12);
  mFall('M-4', `die Abdunkelung wird heller (${m.schleier} bei ${l.schleier}), die Seite bleibt`, m.schleier < l.schleier - 0.01 && !m.zurueck && !m.seiteBewegt);
  { const n = await fl(q); mFall('M-4', `federt zurück (offen ${n.open}, ${n.t} px, ${lageText(n)})`, n.open && n.t === 0 && mitte(n)); }

  // M-5 weit, schnell, im Inhalt ganz oben: zu wie x (reason user)
  for (const [name, wie] of [['weit nach unten ziehen', async () => zieh(q, await kopfMitte(q), 0, Math.round(l.h * 0.6))],
    ['schnell nach unten wischen', async () => zieh(q, await kopfMitte(q), 0, 70, true)],
    ['im Inhalt ganz oben nach unten ziehen', async () => { const bb = await q.locator('#dlg .dlg-body').boundingBox(); return zieh(q, { x: bb.x + bb.width - 8, y: bb.y + 24 }, 0, Math.round(l.h * 0.6)); }]]) {
    await mZu(q); await bearbeiten(q); await mRuhe(q);
    await t.schritt(q, `M-5 ${name}`, async () => { await wie(); await warteBis(q, () => !dlg.open, { max: 3000 }); await mRuhe(q); });
    const n = await fl(q);
    mFall('M-5', `${name}: zu wie x (offen ${n.open}, ${n.log.split(' | ').slice(0, 2).join(' | ')})`, !n.open && zuUser(n.log));
  }

  // M-6 mit Änderungen ziehen: zäh, federt zurück, Sprechblase am x
  await mZu(q); await bearbeiten(q); await mRuhe(q);
  await q.fill('#adTitel', 'Rom und Florenz'); await mWarte(q, 200);
  await t.schritt(q, 'M-6 mit Änderungen weit nach unten ziehen', async () => { m = await zieh(q, await kopfMitte(q), 0, Math.round(l.h * 0.6)); await mWarte(q, 400); });
  mFall('M-6', `mit Änderungen zäh (${m.t} px bei ${Math.round(l.h * 0.6)} px)`, m.t > 0 && m.t < l.h * 0.6 * 0.5);
  { const n = await fl(q), pop = await q.evaluate(() => { const p = document.querySelector('.pop')?.getBoundingClientRect(), x = document.getElementById('dlgX')?.getBoundingClientRect();
      return p && x ? { amX: p.top >= x.bottom - 4 && p.top <= x.bottom + 40 && p.right >= x.left - 1 } : null; });
    mFall('M-6', `federt zurück und fragt am x (offen ${n.open}, ${n.t} px, ${n.pop.join(' · ') || 'keine Frage'}, ${JSON.stringify(pop)})`, n.open && n.t === 0 && n.pop.some(x => /Änderungen verwerfen/.test(x)) && n.pop.some(x => /Weiter bearbeiten/.test(x)) && pop?.amX); }
  await q.locator('.pop button', { hasText: 'Weiter bearbeiten' }).tap().catch(() => {}); await mWarte(q, 400);
  mFall('M-6', '‚Weiter bearbeiten‘ lässt das Fenster mit dem Text offen', (await fl(q)).open && await q.inputValue('#adTitel') === 'Rom und Florenz');

  // M-7
  await m7(q);

  // M-12 Buchstaben eingeben: Breite und Lage bleiben
  await bearbeiten(q); await mRuhe(q);
  l = await fl(q);
  await t.schritt(q, 'M-12 Buchstaben eingeben', async () => { await q.focus('#adTitel'); await q.keyboard.type(' und eine sehr lange Reise durch Italien'); await mWarte(q, 400); });
  { const n = await fl(q); mFall('M-12', `nach der Eingabe ${n.left}–${n.right} × ${n.top} px statt ${l.left}–${l.right} × ${l.top} px`, Math.abs(n.left - l.left) <= 1 && Math.abs(n.right - l.right) <= 1 && Math.abs(n.top - l.top) <= 1); }

  // M-11 drehen bei offenem Fenster: bleibt offen, Fokus und Eingabe bleiben (R-4.6, R-8.1). Hat ein Feld den Fokus, bleibt das Fenster stehen, wo es ganz
  // sichtbar ist (placeDialogs, APD-36 – wie am iPad); ohne Feld mit Fokus steht es nach jedem Drehen in der Mitte
  { const hoch = q.viewportSize(), quer = { width: hoch.height, height: hoch.width }, eingabe = await q.inputValue('#adTitel');
    for (const mitFokus of [true, false]) {
      if (!mitFokus) await q.evaluate(() => { document.activeElement?.blur(); document.getElementById('dlgX')?.focus(); });
      for (const [name, vp] of [['quer', quer], ['hoch', hoch]]) {
        await t.schritt(q, `M-11 ${mitFokus ? 'Fokus im Feld' : 'Fokus am x'}, drehen nach ${name}`, async () => { await q.setViewportSize(vp); await mWarte(q, 700); await mRuhe(q); });
        const n = await fl(q), v = await q.inputValue('#adTitel').catch(() => ''), soll = mitFokus ? 'adTitel' : 'dlgX';
        const lage = mitFokus ? Math.abs(n.left - (n.w - n.right)) <= 2 && n.top >= n.oben - 1 && n.sichtbar - n.bottom >= n.unten - 1 : mitte(n);
        mFall('M-11', `${mitFokus ? 'Fokus im Feld' : 'Fokus am x'}: nach dem Drehen (${name}) offen, ${mitFokus ? 'ganz sichtbar' : 'in der Mitte'}, Fokus ${n.fokus} statt ${soll}, Eingabe ‚${v}‘, Klasse ${n.klasse}, Versatz ${n.t} px (${lageText(n)})`,
          n.open && n.klasse && lage && n.fokus === soll && v === eingabe && /Italien/.test(v) && n.t === 0);
      }
    } }
  await q.evaluate(() => document.activeElement?.blur()); await mZu(q);

  // M-15 VoiceOver: Fokus beim Öffnen und nach dem Schließen wie beim Blatt (v4), Abdunkelung nicht im Baum
  { const fokusse = {};
    for (const gp of ['blatt', '']) {
      await q.evaluate(gp => { window.__adPresentationGegenprobe = gp; }, gp);
      await mTippe(q, '#adLeiste [data-command="entry.add"]'); await mRuhe(q);
      const auf = await q.evaluate(() => ({ fokus: document.activeElement === dlg ? 'dlg' : document.activeElement?.id || document.activeElement?.tagName, name: dlg.getAttribute('aria-labelledby') && document.getElementById(dlg.getAttribute('aria-labelledby'))?.textContent,
        schleier: document.querySelector('.blatt-schleier').getAttribute('aria-hidden'), modal: dlg.matches(':modal') }));
      await mTippe(q, '#dlgX'); await mRuhe(q);
      fokusse[gp || 'fenster'] = { ...auf, danach: await q.evaluate(() => document.activeElement?.dataset?.command || document.activeElement?.id || document.activeElement?.tagName) };
    }
    const f = fokusse.fenster, v = fokusse.blatt;
    mFall('M-15', `Fokus beim Öffnen und nach dem Schließen wie beim Blatt (${JSON.stringify(f)} / Blatt ${JSON.stringify(v)})`, f.fokus === v.fokus && f.danach === v.danach && f.danach === 'entry.add');
    mFall('M-15', `Fenster modal mit Namen ‚${f.name}‘, Abdunkelung aria-hidden (${f.schleier})`, f.modal && f.name === 'Neuer Eintrag' && f.schleier === 'true');
    await q.evaluate(() => { window.__adPresentationGegenprobe = ''; }); }

  // M-16 Kopfzeile alle 2 s neu aufbauen: das Fenster bleibt offen und steht still
  await t.schritt(q, 'M-16 Schalter ‚Kopfzeile alle 2 s neu aufbauen‘ ein', () => mTippe(q, 'label:has(#adNeu)'));
  await bearbeiten(q); await mRuhe(q);
  l = await fl(q);
  await t.schritt(q, 'M-16 5 s warten', () => mWarte(q, 5000));
  { const n = await fl(q); mFall('M-16', `nach 5 s mit Neuaufbau offen und still (Stapel ‚${n.stack}‘, ${n.top} px statt ${l.top})`, n.open && n.stack === 'sheet' && Math.abs(n.top - l.top) <= 1 && Math.abs(n.left - l.left) <= 1); }
  await mZu(q); await mTippe(q, 'label:has(#adNeu)'); await mWarte(q, 300);

  // M-8 und M-9 Tastatur (Safari-Modell): Fenster gleitet über die Tastatur, wird niedriger, wenn nötig; Feld 16 px darüber; Kopf und Leisten still
  await safariModell(q, 'iPhone hoch', { auto: true, leisten: STILL_LEISTEN, links: STILL_LINKS });
  for (const [name, auf, feld] of [['Eintrag bearbeiten', () => bearbeiten(q), '#adTitel'], ['Langes Fenster (Ort 6)', async () => { await bearbeiten(q); await mRuhe(q); await mTippe(q, '#adLang'); }, '#adOrt6']]) {
    await mZu(q); await auf(); await mRuhe(q);
    if (feld !== '#adTitel') await q.locator(feld).scrollIntoViewIfNeeded();
    const vor = await fl(q);
    t.liste(await checkTastaturStill(q, { field: feld, where: `APD-151/M-8 iPhone hoch · ${name}` }));
    await t.schritt(q, `M-8 ${name}: ${feld} antippen`, async () => { await q.tap(feld); await mWarte(q, 700); });
    const n = await fl(q), f = await q.evaluate(sel => { const r = document.querySelector(sel).getBoundingClientRect(), o = __safari.top(); return { unten: Math.round(r.bottom - o), fokus: document.activeElement?.id, offen: __safari.offen }; }, feld);
    mFall('M-8', `${name}: Fenster über der Tastatur (unten ${n.bottom} px, Tastatur ab ${n.sichtbar} px), Feld ${f.unten} px (16 px darüber), Fokus ${f.fokus}`, f.offen && n.bottom <= n.sichtbar + 1 && f.unten <= n.sichtbar - 16 + 1 && f.fokus === feld.slice(1));
    mFall('M-8', `${name}: das Fenster wird höchstens niedriger, bleibt 90 % breit in der Mitte (${vor.height} → ${n.height} px, ${lageText(n)})`, n.height <= vor.height + 1 && Math.abs(n.width - vor.width) <= 1 && Math.abs(n.left - (n.w - n.right)) <= 2 && n.top >= n.oben - 1);
    // M-9 Tastatur schließen: das Fenster gleitet zurück in die Mitte, kein Sprung (je Bild höchstens 60 px)
    await t.schritt(q, `M-9 ${name}: Tastatur schließen`, async () => {
      await q.evaluate(() => { window.__m9 = []; const lauf = () => { if (!window.__m9) return; window.__m9.push(dlg.getBoundingClientRect().top - __safari.top()); requestAnimationFrame(lauf); }; requestAnimationFrame(lauf); });
      await q.evaluate(() => { document.activeElement?.blur(); __safari.tastatur(false); }); await mWarte(q, 900);
    });
    const bilder = await q.evaluate(() => { const b = window.__m9; window.__m9 = null; return b; }), z = await fl(q);
    const sprung = bilder.slice(1).reduce((mx, y, i) => Math.max(mx, Math.abs(y - bilder[i])), 0);
    mFall('M-9', `${name}: nach dem Schließen der Tastatur in der Mitte wie vorher, kein Sprung (größter Schritt ${Math.round(sprung)} px, ${lageText(z)})`, z.open && mitte(z) && Math.abs(z.top - vor.top) <= 2 && sprung <= 60);
  }
  await mZu(q);

  // M-10 iPhone quer: in der Mitte, Höhe nach Inhalt, höchstens bis 10 px vom Rand; Breite mindestens 480 px, höchstens 90 %
  { const r = await t.seite(b, 'iPhone quer'); mKonsole(r);
    await t.schritt(r, 'Katalog iPhone quer: presentation öffnen', () => mOeffnen(r));
    for (const [name, auf] of [['Neuer Eintrag', () => mTippe(r, '#adLeiste [data-command="entry.add"]')], ['Eintrag bearbeiten', () => bearbeiten(r)]]) {
      await mZu(r);
      await t.schritt(r, `M-10 quer ${name}`, async () => { await auf(); await mRuhe(r); });
      const n = await fl(r), min = Math.min(480, 0.9 * n.w);
      mFall('M-10', `quer ‚${name}‘ in der Mitte, Höhe nach Inhalt, höchstens bis 10 px vom Rand (${lageText(n)})`, n.open && n.quer && mitte(n) && (n.rollt || n.height < n.sichtbar - 21));
      mFall('M-10', `quer ‚${name}‘ ${n.width} px breit (mindestens ${min}, höchstens ${Math.round(0.9 * n.w)}), Ecken rundum`, n.width >= min - 1 && n.width <= 0.9 * n.w + 1 && n.radien.every(x => x >= 12));
    }
    await mZu(r); await r.close(); }

  // M-14 ‚Bewegung reduzieren‘: Öffnen und Schließen blenden über, Ziehen folgt dem Finger (Bewegungswächter in t.schritt, R-1.9)
  { const r = await t.seite(b, 'iPhone hoch', { reducedMotion: 'reduce' }); mKonsole(r);
    await t.schritt(r, 'Katalog iPhone hoch, Bewegung reduzieren: presentation öffnen', () => mOeffnen(r));
    let ue = false;
    await t.schritt(r, 'M-14 Neuer Eintrag', async () => { await mTippe(r, '#adLeiste [data-command="entry.add"]'); ue = await ueberblendet(r); await mRuhe(r); });
    mFall('M-14', 'Öffnen blendet über (kein Gleiten)', ue);
    await t.schritt(r, 'M-14 am Kopf ziehen', async () => { m = await zieh(r, await kopfMitte(r), 0, 120); });
    mFall('M-14', `Ziehen folgt dem Finger (${m.t} px statt 120)`, Math.abs(m.t - 120) <= 12);
    await t.schritt(r, 'M-14 x', async () => {
      await mTippe(r, '#dlgX');
      const g = await r.evaluate(() => { const g = document.querySelector('.blatt-geist'), k = g?.getAnimations()[0]?.effect.getKeyframes() || []; return { da: !!g, aus: k.length > 1 && +k.at(-1).opacity === 0 && !k.some(x => x.translate && !/^0(px)? 0(px)?$/.test(x.translate)) }; });
      mFall('M-14', `Schließen blendet aus (${JSON.stringify(g)})`, g.da && g.aus);
      await mRuhe(r); });
    await bearbeiten(r); await mRuhe(r);
    await t.schritt(r, 'M-14 Fenster ersetzen', async () => { await mTippe(r, '#adAnderes'); ue = await ueberblendet(r); await mRuhe(r); });
    mFall('M-14', 'Ersetzen blendet über (kein Gleiten)', ue);
    await mZu(r); await r.close(); }

  // M-17 iPad quer und hoch: dieselben Fenster unverändert (checkSheet APD-72/D-1 bis D-21)
  for (const ansicht of ['iPad quer', 'iPad hoch']) {
    const r = await t.seite(b, ansicht); mKonsole(r);
    await t.schritt(r, `Katalog ${ansicht}: presentation öffnen`, () => mOeffnen(r));
    t.liste(await checkSheet(r, { open: () => mTippe(r, '#adLeiste [data-command="entry.add"]'), change: () => r.fill('#adTitel', 'Rom und Florenz'), field: '#adTitel', where: `APD-151/M-17 ${ansicht}` }));
    await mZu(r);
    await t.schritt(r, `M-17 ${ansicht} Bearbeiten`, async () => { await bearbeiten(r); await mRuhe(r); });
    const n = await fl(r);
    mFall('M-17', `${ansicht}: Fenster in der Mitte wie bisher (${lageText(n)}, Ecken ${n.radien.join(' ')})`, n.open && !n.phone && mitte(n) && n.radien.every(x => x >= 12) && Math.abs(n.schleier - 0.35) <= 0.02);
    await mZu(r); await r.close();
  }
}

for (const k of konsole) t.fehler('APD-149', `Konsolenfehler: ${k}`);
if (GP) {
  const a = gpFunde.get('ableitung'), f = gpFunde.get('freigabe');
  t.wahr(`S-15 ohne Ableitung: S-1 und S-3 rot (${JSON.stringify(a)})`, a['S-1'] > 0 && a['S-3'] > 0, 'APD-149');
  t.wahr(`S-15 ohne Freigabe: S-2 und S-3 rot (${JSON.stringify(f)})`, f['S-2'] > 0 && f['S-3'] > 0, 'APD-149');
  console.log(`S-15 Gegenprobe: ohne Ableitung ${JSON.stringify(a)} · ohne Freigabe ${JSON.stringify(f)}`);
}
await t.ende(b);
