// AppDesign 4.28.0 · Messung abspielen (A-31, Fall-Liste arbeit/A-26 A-31 A-34 Fall-Liste.md Abschnitt 2.3, M-1 bis M-6):
// eine Messdatei des Messmodus (R-1.6, 15.21) wird in einer Prüfung nachgespielt – die Prüfung macht, was am Gerät geschah, und
// Safari meldet dabei sichtbare Höhe und offsetTop genau wie gemessen (Safari-Modell tests/safari.mjs, __safari.setze).
// Einbinden im Prüfskript der App:
//   import { lies, ansicht, spieleAb } from '../../AppDesign/fassung/X.Y.Z/tests/abspielen.mjs';
//   const m = lies(readFileSync(datei, 'utf8'));                 // M-1: Kopf, Spalten, Zeilen (Fehler mit Zeilennummer)
//   const p = await t.seite(b, ansicht(m));                       // Größe, Gerät und Darstellung aus dem Kopf
//   await safariModell(p, m.lage === 'quer' ? 'iPhone quer' : 'iPhone hoch');
//   t.liste(await spieleAb(p, m, { ziele, woerter, bis }));      // M-2 bis M-4: Fehler (leer = wie gemessen)
// Nachgespielt (M-2): ‚tippen <id>‘ (Schaltfläche anklicken, Feld antippen), ‚eingabe <Länge>‘ (Buchstaben eines Prüfworts tippen
// bzw. löschen, bis die Länge stimmt), ‚blur‘ ohne Antippen (Tastatur schließen), ‚vv resize‘/‚vv scroll‘ (Safari meldet h und offsetTop, M-3), Wechsel der Spalte lage
// (drehen). Folgen (focus, blur, neuaufbau, scroll) werden nicht ausgelöst, sondern verglichen.
// Vergleich (M-4) am Ende jedes Schritts (vor der nächsten Handlung) mit der letzten Zeile des Schritts: Kopfzeile (kopf) und
// Suchzeile (such) auf dem Bildschirm ± toleranz px, Fokus (id bzw. Elementname). Der Inhalt (inh, tag) hängt an den eigenen
// Daten und wird nicht verglichen; Wischen zeichnet die Messung nicht auf – dafür bleibt das Safari-Modell (Grenze).
// Optionen: ziele = { name: Selektor | [Selektoren, der Reihe nach] | async p => … } für Ziele ohne id (‚button‘, ‚-‘);
// woerter = { feld-id: Prüfwort }; bis = Zeit (ms) – Handlungen danach nicht mehr; nachSchritt(s) = zusätzliche Prüfung je Schritt
// ({ ereignis, zeile } → Liste von Fehlern); verschiebe = { such: 20 } verschiebt die Messung (Gegenprobe M-5, muss rot werden).

export const SPALTEN = ['t', 'sy', 'inh', 'sh', 'ih', 'vh', 'vt', 'vvtop', 'kopf', 'such', 'tag', 'lkopf', 'lsuch', 'lroll', 'fokus', 'lage'];
const ZAHL = new Set(SPALTEN.filter(s => !['fokus', 'lage'].includes(s)));

// M-1: Messdatei lesen. Kopf ‚# Messung · App · AppDesign · Gerät (UA) · Ort · B×H @n · hell|dunkel · Zeit‘, Spaltenzeile,
// Zeilen mit je 16 Werten (‚-‘ = nicht vorhanden) und optional ‚! ereignis‘; ‚# Ende …‘ beendet.
export function lies(text) {
  const zeilen = text.replace(/\r/g, '').split('\n'), fehler = (n, t) => { throw new Error(`Messdatei Zeile ${n}: ${t}`); };
  const k = zeilen[0]?.match(/^# Messung · (.+?) · AppDesign (\S+) · (.+?) · (.+?) · (\d+)×(\d+) @\d+ · (hell|dunkel) · (\S+)$/);
  if (!k) fehler(1, 'kein Kopf ‚# Messung · App · AppDesign · Gerät · Ort · B×H @n · hell|dunkel · Zeit‘');
  const spalten = zeilen[1]?.trim().split(/\s+/);
  if (spalten?.join(' ') !== SPALTEN.join(' ')) fehler(2, `Spalten ‚${spalten?.join(' ')}‘ statt ‚${SPALTEN.join(' ')}‘`);
  const m = { app: k[1], ad: k[2], ua: k[3], ort: k[4], breite: +k[5], hoehe: +k[6], darstellung: k[7], zeit: k[8],
    geraet: /iPad|Macintosh/.test(k[3]) ? 'iPad' : 'iPhone', zeilen: [] };
  for (const [i, z] of zeilen.slice(2).entries()) {
    const n = i + 3;
    if (!z.trim() || z.startsWith('# Ende')) continue;
    if (z.startsWith('#')) fehler(n, 'unbekannte Kopfzeile');
    const [teil, ereignis = ''] = z.split(' ! ');
    const w = teil.trim().split(/\s+/);
    if (w.length !== SPALTEN.length) fehler(n, `${w.length} statt ${SPALTEN.length} Werte`);
    const werte = {};
    for (const [j, s] of SPALTEN.entries()) {
      if (!ZAHL.has(s) || w[j] === '-') { werte[s] = w[j] === '-' ? null : w[j]; continue; }
      if (!/^-?\d+$/.test(w[j])) fehler(n, `${s} = ‚${w[j]}‘ ist keine Zahl`);
      werte[s] = +w[j];
    }
    m.zeilen.push({ nr: n, ...werte, ereignis: ereignis.trim() });
  }
  if (!m.zeilen.length) fehler(3, 'keine Zeilen');
  m.lage = m.zeilen[0].lage;
  return m;
}

// Ansicht für t.seite aus dem Kopf: Größe wie das Gerät, quer oder hoch wie die erste Zeile, Darstellung
export function ansicht(m) {
  const kurz = Math.min(m.breite, m.hoehe), lang = Math.max(m.breite, m.hoehe), quer = m.lage === 'quer';
  return { viewport: { width: quer ? lang : kurz, height: quer ? kurz : lang }, isMobile: m.geraet === 'iPhone', hasTouch: true,
    colorScheme: m.darstellung === 'dunkel' ? 'dark' : 'light' };
}

// Handlungen und die Zeilen danach bis zur nächsten Handlung. Safari meldet focus bzw. blur schon vor dem Antippen (1–2 ms):
// solche Zeilen bis 50 ms vor einem ‚tippen‘ gehören zu diesem Schritt. Ein blur ohne ‚tippen‘ in 50 ms davor oder danach ist eine
// eigene Handlung: der Nutzer schließt die Tastatur (Fertig, Wischen).
const HANDLUNG = /^(tippen|eingabe) /, NAH = 50;
function schritte(m, bis) {
  const z = m.zeilen, tippen = z.filter(x => x.ereignis.startsWith('tippen ')).map(x => x.t);
  const nahe = (t, vor, nach) => tippen.some(x => x - t <= vor && x - t >= -nach);
  const out = [];
  for (const [i, x] of z.entries()) {
    const zu = /^blur /.test(x.ereignis) && !nahe(x.t, NAH, NAH);
    if (HANDLUNG.test(x.ereignis) || zu) { if (x.t > bis) break; out.push({ ereignis: zu ? 'tastatur zu' : x.ereignis, zeile: x, folgen: [] }); continue; }
    if (!out.length) continue;
    // focus/blur kurz vor dem nächsten ‚tippen‘: zum nächsten Schritt (wird mit ihm verglichen, nicht mit diesem)
    const n = z.slice(i + 1).find(y => HANDLUNG.test(y.ereignis));
    if (/^(focus|blur) /.test(x.ereignis) && n?.ereignis.startsWith('tippen ') && n.t - x.t <= NAH) continue;
    out.at(-1).folgen.push(x);
  }
  return out;
}

export async function spieleAb(p, m, { ziele = {}, woerter = {}, bis = Infinity, nachSchritt = null, verschiebe = null, toleranz = 1, where = '' } = {}) {
  const errors = [], E = (z, t) => errors.push(`${where ? where + ': ' : ''}A-31 Messung Zeile ${z.nr} (${z.t} ms, ${z.ereignis || 'Folge'}): ${t}`);
  if (!await p.evaluate(() => !!window.__safari)) { errors.push('A-31 Vorbereitung: Safari-Modell fehlt (safariModell)'); return errors; }
  const vorrat = Object.fromEntries(Object.entries(ziele).map(([k, v]) => [k, Array.isArray(v) ? [...v] : v]));
  let lage = m.lage;
  for (const s of schritte(m, bis)) {
    const z = s.zeile, [art, arg] = [s.ereignis.split(' ')[0], s.ereignis.split(' ').slice(1).join(' ')];
    if (z.lage !== lage) {   // drehen
      const v = p.viewportSize(); await p.setViewportSize({ width: v.height, height: v.width }); lage = z.lage; await p.waitForTimeout(400);
    }
    if (art === 'tastatur') await p.evaluate(() => document.activeElement?.blur());
    else if (art === 'tippen') {
      let ziel = vorrat[arg];
      if (Array.isArray(ziel)) ziel = ziel.shift();
      if (ziel === undefined && /^[A-Za-z][\w-]*$/.test(arg) && await p.evaluate(id => !!document.getElementById(id), arg)) ziel = '#' + arg;
      if (!ziel) { E(z, `‚tippen ${arg}‘ nicht nachspielbar – Ziel ohne id, in ziele angeben`); return errors; }
      if (typeof ziel === 'function') await ziel(p);
      else if (await p.evaluate(sel => document.querySelector(sel)?.matches('input, textarea'), ziel)) await p.evaluate(sel => document.querySelector(sel).focus({ preventScroll: true }), ziel);
      else await p.click(ziel);
    } else {   // eingabe <Länge>: tippen bzw. löschen, bis das Feld so lang ist
      const soll = +arg;
      for (let i = 0; i < 40; i++) {
        const { id, n } = await p.evaluate(() => ({ id: document.activeElement?.id || '', n: document.activeElement?.value?.length ?? -1 }));
        if (n < 0) { E(z, 'Eingabe ohne Feld mit Fokus'); return errors; }
        if (n === soll) break;
        if (n > soll) await p.keyboard.press('Backspace');
        else { const w = woerter[id] || 'abcdefghij'; await p.keyboard.type(w[n % w.length]); }
        await p.waitForTimeout(20);
      }
    }
    // M-3: was Safari danach meldete, genau so
    for (const f of [z, ...s.folgen].filter(f => /^vv (resize|scroll)$/.test(f.ereignis))) {
      await p.evaluate(v => __safari.setze(v), { h: f.vh, top: f.vt });
      await p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    }
    await p.waitForTimeout(400);
    // M-4: Endzustand des Schritts wie die letzte Zeile
    const soll = { ...(s.folgen.at(-1) || z) };
    for (const [k, d] of Object.entries(verschiebe || {})) if (soll[k] != null) soll[k] += d;
    const ist = await p.evaluate(() => {
      const o = visualViewport.offsetTop, top = sel => { const e = [...document.querySelectorAll(sel)].find(x => x.getClientRects().length); return e ? Math.round(e.getBoundingClientRect().top - o) : null; };
      const a = document.activeElement, fokus = !a || a === document.body ? null : a.id || a.tagName.toLowerCase();
      return { kopf: top('#app .nb, #app .pnav'), such: top('#app .searchbox'), fokus };
    });
    for (const k of ['kopf', 'such']) {
      if ((soll[k] == null) !== (ist[k] == null)) E(soll, `${k === 'kopf' ? 'Kopfzeile' : 'Suchzeile'} ${soll[k] == null ? 'gemessen nicht da, nachgespielt bei ' + ist[k] + ' px' : 'gemessen bei ' + soll[k] + ' px, nachgespielt nicht da'}`);
      else if (soll[k] != null && Math.abs(soll[k] - ist[k]) > toleranz) E(soll, `${k === 'kopf' ? 'Kopfzeile' : 'Suchzeile'} bei ${ist[k]} px statt ${soll[k]} px wie gemessen`);
    }
    if ((soll.fokus ?? null) !== ist.fokus) E(soll, `Fokus ${ist.fokus ?? '–'} statt ${soll.fokus ?? '–'} wie gemessen`);
    if (nachSchritt) for (const x of (await nachSchritt(s)) || []) E(z, x);
  }
  return errors;
}
