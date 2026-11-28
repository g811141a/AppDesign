// Bean-Katalog prüfen (seit 4.65.0, APD-140, R-1.13; Testfall-Liste arbeit/APD-140 Testfall-Liste.md Z-2 bis Z-4). Der Katalog (AppDesign katalog/)
// zeigt immer den Arbeitsstand vN/ (seit 5.0.0 v5/, arbeitsOrdner in version.mjs) – darum öffnet diese Prüfung katalog/index.html im Arbeitsstand, auch wenn sie aus einer Fassung geladen wird.
//   Z-2: lädt in Chromium und WebKit, in allen 4 Ansichten, jede Bean geöffnet, ohne Konsolen- oder Skriptfehler; Titel = Name der Bean, Adresse
//        #kennung, ‚Ausprobieren‘ zeigt die Bean; iPhone: Startliste → Bean → Zurück
//   Z-3: nach jedem Schritt die Grundregeln (pruefe.mjs schritt, dieselben Prüfungen wie hig.mjs, ohne Drehen)
//   Z-6: langes Drücken auf Schaltflächen und Kacheln unter ‚Ausprobieren‘ markiert keinen Text (R-1.15, Safari-Modell; seit 4.67.1, P-117/F-2; bis 4.68.0 R-3.6)
//   Z-4: lädt vN/ui.js und vN/design.css des Arbeitsstands; AD.AD_VERSION = --ad-version = AD_VERSION in vN/ui.js; Versionszeile im Mehr-Menü nennt AD_VERSION
// Die Liste ↔ katalog/ (Z-1, Gegenprobe Z-5) prüft checkBeans (doku.mjs, checkKatalog).
// Seit 5.0.0 (APD-149) mit Teilen: teil 'presentation' prüft die AD-Beans presentation und commands an ihrer Vorführung im Katalog (tests/presentation.mjs,
// APD-149/S-1 bis S-18, L-1 bis L-4); ohne Teil der Katalog wie bisher.
// Einbinden in der App (tests/bean-katalog.mjs):  import { katalog } from '../../AppDesign/fassung/X.Y.Z/tests/katalog.mjs';
//                                                 await katalog(pw, { out: new URL('out/', import.meta.url), teil: process.env.PRUEF_TEIL });
import { readFileSync } from 'node:fs';
import { pruefung } from './pruefe.mjs';
import { createCheck } from './hig.mjs';
import { safariHalten } from './safari.mjs';
import { checkBeruehren } from './ablauf.mjs';
import { arbeitsOrdner } from './version.mjs';
import { presentation } from './presentation.mjs';

const ORDNER = new URL(import.meta.url.includes('/fassung/') ? '../../../' : '../', import.meta.url), V = arbeitsOrdner(ORDNER);

export async function katalog(pw, { out, teil = '' } = {}) {
  if (teil === 'presentation') return presentation(pw, { out });
  if (teil) { console.log(`✗ R-1.13 bean-katalog: unbekannter Teil ‚${teil}‘ (presentation oder ohne)`); process.exit(1); }
  const t = pruefung('bean-katalog', pw, { hig: createCheck(), out });
  const url = new URL('katalog/index.html', ORDNER).href;
  const ver = readFileSync(new URL(`${V}/ui.js`, ORDNER), 'utf8').match(/const AD_VERSION = '([\d.]+)'/)?.[1];
  const b = await t.browser();
  for (const ansicht of ['iPad quer', 'iPad hoch', 'iPhone hoch', 'iPhone quer']) {
    const phone = ansicht.startsWith('iPhone');
    const p = await t.seite(b, ansicht);
    p.on('console', m => { if (m.type() === 'error') t.fehler('R-1.13', `Z-2 Konsolenfehler: ${m.text().split('\n')[0]}`); });
    await t.schritt(p, 'Katalog öffnen', async () => { await p.goto(url); await p.waitForFunction(() => window.__katalog); await p.waitForTimeout(400); });
    // Z-4: Arbeitsstand vN
    const v = await p.evaluate(V => ({ ui: [...document.scripts].some(s => s.src.endsWith(`/${V}/ui.js`)), css: [...document.querySelectorAll('link[rel=stylesheet]')].some(l => l.href.endsWith(`/${V}/design.css`)),
      ad: typeof AD.AD_VERSION === 'string' ? AD.AD_VERSION : '', cssVer: getComputedStyle(document.documentElement).getPropertyValue('--ad-version').trim().replace(/['"]/g, ''),
      beans: window.__katalog.beans() }), V);
    t.wahr(`Z-4 lädt ${V}/ui.js und ${V}/design.css`, v.ui && v.css, 'R-1.13');
    t.ist('Z-4 AD_VERSION der Seite', v.ad, ver, 'R-1.13');
    t.ist('Z-4 --ad-version', v.cssVer, ver, 'R-1.13');
    if (phone) t.wahr('Z-2 iPhone: Startliste ohne blauen Eintrag', await p.evaluate(() => side.classList.contains('page') && !side.hidden && !side.querySelector('.current')), 'R-7.2');
    await t.schritt(p, 'Mehr-Menü der Seitenleiste', () => p.click('#sideMore'));
    t.ist('Z-4 Versionszeile', await p.evaluate(() => document.querySelector('.menu')?.textContent || ''), new RegExp(`AppDesign ${ver.replace(/\./g, '\\.')}`), 'R-1.13');
    await t.schritt(p, 'Mehr-Menü schließen', () => p.keyboard.press('Escape'));
    // Z-2: jede Bean öffnen
    for (const kennung of v.beans) {
      await t.schritt(p, `Bean ${kennung} öffnen`, async () => {
        if (phone && !(await p.evaluate(() => side.classList.contains('page') && !side.hidden))) { await p.evaluate(() => AD.navPop()); await p.waitForTimeout(900); }
        await p.click(`#side [data-bean="${kennung}"]`); await p.waitForTimeout(900);
      });
      const s = await p.evaluate(k => ({ titel: document.querySelector('#bar .nb-title, #bar .pnav-title')?.textContent || '', hash: location.hash,
        name: document.querySelector('.bk-kopf h1')?.textContent || '', probe: document.querySelector('#bkProbe')?.children.length || 0,
        blau: document.querySelector('#side .current')?.dataset.bean || null }), kennung);
      t.ist(`Z-2 ${kennung}: Titel = Name`, s.titel, s.name || '‹Name fehlt›', 'R-2.2');
      t.ist(`Z-2 ${kennung}: Adresse`, s.hash, `#${kennung}`, 'R-1.13');
      t.wahr(`Z-2 ${kennung}: ‚Ausprobieren‘ zeigt die Bean`, s.probe > 0, 'R-1.13');
      if (!phone) t.ist(`Z-2 ${kennung}: Kachel blau`, s.blau, kennung, 'R-7.1');
      // Z-6 (P-117/1, P-117/4, P-117/F-2): langes Drücken auf eine Schaltfläche oder Kachel unter ‚Ausprobieren‘ markiert keinen Text und zeigt
      // keine Lupe (Safari-Modell safariHalten) – am iPad markierte Safari den Text von ‚Erste Schaltfläche‘ und beim Kontextmenü der Kachel die ganze Seite.
      const n = await p.evaluate(() => { const k = [...document.querySelectorAll('#bkProbe button')]; k.forEach((x, i) => x.dataset.pruefHalten = i); return k.length; });
      // Z-7 (P-118/1, P-118/F-1): jede Schaltfläche hebt sich beim Berühren und wird größer (R-3.6 Variante B) – auch außerhalb der Leisten
      if (kennung === 'sourcehighlight') for (const k of ['#bkMenu', '#bkQ1']) {
        if (!(await p.$(k))) { t.fehler('R-3.6', `Z-7 ${kennung}: ${k} fehlt`); continue; }
        // in die Mitte rollen wie der Finger, der nur eine sichtbare Schaltfläche drückt (iPhone quer: sonst halb unter dem Rand)
        await p.evaluate(k => document.querySelector(k).scrollIntoView({ block: 'center' }), k); await p.waitForTimeout(300);
        t.liste(await checkBeruehren(p, { knopf: k, where: `Z-7 ${kennung}` }));
        if (await p.$('.menu')) { await p.keyboard.press('Escape'); await p.waitForTimeout(400); }
      }
      for (let i = 0; i < n; i++) {
        const h = await safariHalten(p, `#bkProbe [data-pruef-halten="${i}"]`);
        const name = await p.evaluate(i => document.querySelector(`#bkProbe [data-pruef-halten="${i}"]`)?.textContent.trim().slice(0, 40) || 'Icon', i);
        if (h.markiert || h.callout) t.fehler('R-1.15', `Z-6 ${kennung}: langes Drücken auf ‚${name}‘ würde in Safari ${[h.markiert && 'Text markieren (Lupe)', h.callout && 'das Callout zeigen'].filter(Boolean).join(' und ')}`);
      }
    }
    if (phone) {
      await t.schritt(p, 'Zurück zur Startliste', async () => { await p.click('#back'); await p.waitForTimeout(900); });
      t.wahr('Z-2 iPhone: Zurück führt zur Startliste', await p.evaluate(() => side.classList.contains('page') && !side.hidden), 'R-7.2');
    }
    await p.close();
  }
  await t.ende(b);
}
