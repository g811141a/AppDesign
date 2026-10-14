// AppDesign 4.13.0 · Prüf-Baustein (A-05, seit 4.13.0): jedes Prüfskript einer App meldet Fehler statt nur Werte
// auszugeben und endet bei einem Fehler mit Rückgabewert 1. Dazu Browserwahl (Chromium oder WebKit), die gemeinsamen
// Ansichten und die Grundregeln nach jedem Schritt. Einbinden im Prüfskript der App:
//   import * as pw from 'playwright';
//   import { pruefung } from '../../AppDesign/tests/pruefe.mjs';
//   import { createCheck } from '../../AppDesign/tests/hig.mjs';
//   const t = pruefung('ablauf-fenster', pw, { hig: createCheck() });   // hig: Grundregeln nach jedem Schritt (optional)
//   const b = await t.browser();  const p = await t.seite(b, 'iPad quer', { theme: 'dark' });
//   t.ist('Titel', await p.textContent('.nb-title'), 'Australien');     // Sollwert: Wert, RegExp oder Prüffunktion
//   await t.schritt(p, 'Fenster öffnen', () => p.click('#mainMore'));  // danach die Grundregeln (hig.measure ohne Drehen)
//   t.liste(await checkSync(p));                                        // Meldungen der allgemeinen Prüfungen übernehmen
//   await t.ende(b);
// Browser: Umgebungsvariable PRUEF_BROWSER (chromium | webkit, Standard chromium) – setzt das Lauf-Werkzeug (lauf.mjs).
// Gegenprobe: PRUEF_GEGENPROBE=1 macht den ersten Vergleich absichtlich falsch, PRUEF_GEGENPROBE=grundregeln legt beim
// ersten Schritt zu breiten Inhalt in die Seite (lauf.mjs --gegenprobe bzw. --gegenprobe grundregeln für alle Tests).
// Jede Fehlermeldung: ‚✗ <Regel> <Browser> · <Ansicht> · <Schritt>: <was> – ist …, soll …‘ (Fall-Liste A-05, A-4).
import { writeFileSync, mkdirSync } from 'node:fs';

// Gemeinsame Ansichten (C-2): iPad quer und hoch, iPhone hoch und quer – je hell oder dunkel über die Option theme.
export const ANSICHTEN = {
  'iPad quer': { viewport: { width: 1180, height: 820 } },
  'iPad hoch': { viewport: { width: 820, height: 1180 } },
  'iPhone hoch': { viewport: { width: 393, height: 852 }, isMobile: true },
  'iPhone quer': { viewport: { width: 852, height: 393 }, isMobile: true },
};

// Vergleich: RegExp prüft den Text, eine Funktion entscheidet selbst, Listen und Objekte Stück für Stück, sonst gleich.
const passt = (ist, soll) => soll instanceof RegExp ? soll.test(String(ist)) : typeof soll === 'function' ? !!soll(ist)
  : Array.isArray(soll) ? Array.isArray(ist) && ist.length === soll.length && soll.every((x, i) => passt(ist[i], x))
  : soll && typeof soll === 'object' ? !!ist && typeof ist === 'object' && Object.keys(soll).length === Object.keys(ist).length && Object.keys(soll).every(k => passt(ist[k], soll[k]))
  : JSON.stringify(ist) === JSON.stringify(soll);
const zeige = v => typeof v === 'string' ? `‚${v}‘` : JSON.stringify(v, (k, x) => x instanceof RegExp ? String(x) : x);

// Wartet, bis die Seite nach einer Handlung zur Ruhe gekommen ist (zwei Bildwechsel, keine laufende Animation, Lage stabil) –
// sonst messen die Grundregeln Zwischenzustände (WebKit setzt manches einige Millisekunden später als Chromium).
export async function ruhe(p) {
  // Ruhig = keine laufende Animation, Fenster, Menüs, Sprechblasen und Scroll-Lage dreimal hintereinander gleich (je 100 ms)
  // und ein offenes Fenster ganz auf dem Bildschirm – höchstens 2 s; bleibt es danach falsch, meldet die Regel es (R-4.5).
  // WebKit setzt unter Last ein Fenster erst nach bis zu 100 ms an seinen Platz (gemessen: 4 von 12 Öffnungen, danach richtig).
  // Nur Zeitgeber von Node: in der Seite können Uhr und Bildwechsel nachgebildet sein (page.clock.install).
  // Zuerst zwei Bildwechsel abwarten (höchstens 2 s): manches setzt die App erst im nächsten Bild (z. B. den Verlauf der
  // Auswahl-Kapsel); WebKit verzögert Bildwechsel unter Last deutlich (gemessen: Verlauf kommt immer, aber verspätet).
  await Promise.race([p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))).catch(() => {}), p.waitForTimeout(2000)]);
  let vorher = '', gleich = 0;
  for (let i = 0; i < 20 && gleich < 2; i++) {
    const jetzt = await p.evaluate(() => {
      if (document.getAnimations().some(a => a.playState === 'running')) return 'läuft';
      const d = document.querySelector('dialog[open]')?.getBoundingClientRect();
      if (d && (d.top < -1 || d.bottom > innerHeight + 1)) return 'Fenster noch nicht an seinem Platz';
      return JSON.stringify([scrollY, ...[...document.querySelectorAll('dialog[open], .menu, .pop')].map(e => { const r = e.getBoundingClientRect(); return [r.top, r.left, r.width, r.height]; })]);
    }).catch(() => '');
    gleich = jetzt.startsWith('[') && jetzt === vorher ? gleich + 1 : 0;
    vorher = jetzt; if (gleich < 2) await p.waitForTimeout(100);
  }
}

export function pruefung(name, pw, { hig = null, out = null } = {}) {
  const browserName = process.env.PRUEF_BROWSER || 'chromium';
  const fehler = [], ansichten = new Set();
  let ort = '', gegenprobe = process.env.PRUEF_GEGENPROBE === '1', gegenprobeGrund = process.env.PRUEF_GEGENPROBE === 'grundregeln';
  const wo = schritt => [browserName, ort, schritt].filter(Boolean).join(' · ');
  const melde = (regel, was, schritt = '') => fehler.push(`✗ ${regel ? regel + ' ' : ''}${wo(schritt)}: ${was}`);

  const t = {
    browserName,
    get ort() { return ort; },
    set ort(v) { ort = v; if (v) ansichten.add(v); },
    // Startet den gewählten Browser. Fehlt WebKit, bricht der Test mit Hinweis ab (B-8) – nie stillschweigend nur Chromium.
    async browser(opts = {}) {
      const typ = pw[browserName];
      if (!typ) throw new Error(`Unbekannter Browser ‚${browserName}‘ (PRUEF_BROWSER: chromium oder webkit)`);
      try { return await typ.launch(opts); }
      catch (e) {
        if (/Executable doesn't exist|install/i.test(e.message)) {
          console.error(`✗ ${browserName} fehlt – im Ordner tests der App: npx playwright install ${browserName}` +
            (browserName === 'webkit' ? ' und npx playwright install-deps webkit (Setup-Skript der Umgebung, Fall-Liste A-05 B-8)' : ''));
          process.exit(2);
        }
        throw e;
      }
    },
    // Neue Seite in einer Ansicht (Name aus ANSICHTEN oder eigene Größe); Skriptfehler der Seite werden Fehler.
    async seite(b, ansicht = 'iPad quer', { theme, ...opts } = {}) {
      const a = typeof ansicht === 'string' ? ANSICHTEN[ansicht] : ansicht;
      if (!a) throw new Error(`Unbekannte Ansicht ‚${ansicht}‘`);
      const p = await b.newPage({ hasTouch: true, ...a, ...(theme ? { colorScheme: theme } : {}), ...opts });
      if (typeof ansicht === 'string') t.ort = ansicht + (theme ? ` ${theme === 'dark' ? 'dunkel' : 'hell'}` : '');
      p.on('pageerror', e => melde('', `Skriptfehler der Seite: ${e.message.split('\n')[0]}`));
      // Safari nachgebildet (Zusammenarbeit 0 Nr. 5): Safari auf iPad und iPhone setzt beim Antippen einer Schaltfläche keinen
      // Fokus, Chromium und das WebKit von Playwright (Linux) schon – sonst meldet R-3.4 einen Fokus am x, den es am Gerät nicht gibt.
      await p.addInitScript(() => document.addEventListener('mousedown', e => { if (e.target.closest?.('button')) e.preventDefault(); }, true));
      return p;
    },
    // Sollwert: Wert (Vergleich als JSON), RegExp (auf den Text) oder Funktion (gibt true zurück, wenn in Ordnung).
    ist(was, ist, soll, regel = '') {
      // Gegenprobe (Fall-Liste A-05, A-1): PRUEF_GEGENPROBE=1 setzt beim ersten Vergleich einen falschen Sollwert – der Test muss rot werden.
      if (gegenprobe) { gegenprobe = false; soll = '‹Gegenprobe – absichtlich falscher Sollwert›'; }
      const ok = passt(ist, soll);
      if (!ok) melde(regel, `${was} – ist ${zeige(ist)}, soll ${typeof soll === 'function' ? (soll.text || 'Bedingung erfüllt') : zeige(soll)}`);
      return ok;
    },
    wahr(was, bedingung, regel = '') { if (!bedingung) melde(regel, was); return !!bedingung; },
    // Meldungen einer allgemeinen Prüfung (checkSync, checkBackup …) übernehmen – sie tragen ihre Regelnummer schon.
    liste(meldungen = []) {
      if (gegenprobe) { gegenprobe = false; melde('', 'Gegenprobe – absichtlich eingefügte Meldung'); }
      for (const m of meldungen) melde('', m);
    },
    fehler: melde,
    // Ein Schritt: Handlung ausführen, danach die Grundregeln (C-1) in der aktuellen Ansicht – dieselben Prüfungen wie
    // hig.mjs (je Regel genau eine Prüfung), aber ohne Drehen, damit der Ablauf nicht verändert wird.
    async schritt(p, name, fn) {
      try { await fn(); }
      catch (e) { melde('', `Schritt bricht ab: ${e.message.split('\n')[0]}`, name); throw e; }
      // Gegenprobe der Grundregeln (Fall-Liste A-05, C-1): PRUEF_GEGENPROBE=grundregeln legt beim ersten Schritt einen zu
      // breiten Text sichtbar in den Vordergrund (auch in ein offenes Fenster) – R-6.3 muss ihn melden.
      if (hig && gegenprobeGrund) { gegenprobeGrund = false; await p.evaluate(() => { const d = document.createElement('div'); d.id = 'gegenprobe'; d.className = 'msg-text';
        d.style.cssText = 'position:fixed;top:120px;left:20px;width:100px;white-space:nowrap;z-index:99999'; d.textContent = 'a'.repeat(100);
        (document.querySelector('dialog[open]') || document.body).append(d); }); }
      if (hig) await hig.measure(p, wo(name), { schnell: true });   // measure wartet selbst, bis die Seite ruht
      await p.evaluate(() => document.getElementById('gegenprobe')?.remove()).catch(() => {});
    },
    get anzahl() { return fehler.length; },
    // Ende: Grundregeln und Fehler ausgeben, Abdeckung festhalten, Rückgabewert setzen.
    async ende(b) {
      if (b) await b.close().catch(() => {});
      const higRc = hig ? hig.report({ still: true }) : 0;
      if (out) {
        try { mkdirSync(out, { recursive: true }); writeFileSync(new URL(`abdeckung-${name}-${browserName}.json`, out), JSON.stringify([...ansichten])); } catch {}
      }
      if (gegenprobe) melde('', 'Gegenprobe: der Test hat keinen einzigen Vergleich gemacht – er prüft nichts');
      for (const f of fehler) console.log(f);
      const n = fehler.length + (higRc ? 1 : 0);
      console.log(n ? `${name} (${browserName}): ${fehler.length} Fehler${higRc ? ' und Abweichungen der Grundregeln (oben)' : ''}` : `${name} (${browserName}): alles in Ordnung`);
      process.exit(n ? 1 : 0);
    },
  };
  return t;
}
