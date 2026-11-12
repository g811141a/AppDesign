// RLB-124 · Versuch vor der Übergabe prüfen (Zusammenarbeit 0 Nr. 20 und 2.7).
//   node arbeit/RLB-124/pruefen.mjs      – Chromium und WebKit, iPad quer (wie P-101/16) und iPhone hoch
// Spielt die acht Fälle so durch, wie die Anleitung im Versuch sie nennt. window.print, navigator.share und window.open sind im Modell
// ersetzt (sie zeichnen nur auf). Die geteilte Datei wird mit auswerten.mjs bewertet und muss zum Modell passen: in jedem Druck-Fall genau
// ein print() (Fall 4 nach 50 ms bei offenem Fenster ‚Ausgabe V001‘, wie ‚PDF‘ im Reiselogbuch 3.55.0), Fall 5 print() im Rahmen, Fall 6 ein
// Fenster mit der Probeseite, Fall 7 eine HTML-Datei, Fall 8 ein gültiges PDF; dazu: am Gerät keine Bewertung, ‚Messung teilen‘ erst nach allen
// Fällen, abgehakte Fälle, ‚Fall neu‘, Neuladen.
// Gegenprobe (muss rot werden): ?gegenprobe=ohne-druck – die Druckknöpfe rufen print() nicht auf.
import { createRequire } from 'node:module';
import { werteAus } from './auswerten.mjs';
const pw = createRequire(new URL('../../../ReiseLogBuch/tests/', import.meta.url))('playwright');

const URL_V = new URL('./index.html', import.meta.url).href;
const LAGEN = { 'iPad quer': { viewport: { width: 1180, height: 820 }, hasTouch: true }, 'iPhone hoch': { viewport: { width: 393, height: 852 }, isMobile: true, hasTouch: true } };
const fehler = [];
const pruefe = (ok, was) => { if (!ok) fehler.push(was); };

// wie die Anleitung: ist das Fenster offen, zuerst mit x schließen, dann antworten
async function antworte(p, a) {
  if (await p.evaluate(() => document.getElementById('dlg').open)) { await p.click('#dlg[open] #dlgX'); await p.waitForFunction(() => !document.getElementById('dlg').open); await p.waitForTimeout(350); }
  await p.click(`#antworten [data-a="${a}"]`);
}
async function lauf(b, lage, gegen) {
  const ctx = await b.newContext(LAGEN[lage]);
  const p = await ctx.newPage();
  const konsole = [];
  p.on('pageerror', e => konsole.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/Origin null|manifest/i.test(m.text())) konsole.push(m.text()); });
  await p.addInitScript(() => {
    // das Modell überlebt das Neuladen (wie die Messung selbst, sessionStorage)
    try { window.__modell = JSON.parse(sessionStorage.getItem('modell')) || { print: [], share: [], open: [] }; } catch { window.__modell = { print: [], share: [], open: [] }; }
    const merk = () => { try { if (window === top) sessionStorage.setItem('modell', JSON.stringify(window.__modell)); } catch {} };
    addEventListener('pagehide', merk);
    window.print = () => { window.__modell.print.push({ fenster: document.getElementById('dlg')?.open || false, ausgabe: document.getElementById('printout')?.textContent.includes('Probedruck') || false });
      dispatchEvent(new Event('beforeprint')); dispatchEvent(new Event('afterprint')); merk(); };
    navigator.share = async d => { const f = d.files[0]; window.__modell.share.push({ name: f.name, type: f.type, text: await f.text() }); merk(); };
    navigator.canShare = () => true;
    window.open = url => { window.__modell.open.push(url); merk(); return {}; };
  });
  await p.goto(URL_V + (gegen ? '?gegenprobe=ohne-druck' : ''));
  await p.waitForFunction(() => !!window.r124);
  const wo = `${b.browserType().name()} ${lage}${gegen ? ' Gegenprobe' : ''}`;
  // am Gerät keine Bewertung: kein ‚ok‘, ‚Fehler‘, ‚bestanden‘ auf der Seite
  const txt0 = await p.textContent('body');
  pruefe(!/bestanden|nicht ok|\bok\b|Fehler gefunden/i.test(txt0), `${wo}: Seite zeigt eine Bewertung`);
  pruefe(await p.isDisabled('#teilen'), `${wo}: ‚Messung teilen‘ vor allen Fällen frei`);
  pruefe(await p.isVisible('#hinweis'), `${wo}: Hinweis ‚läuft in Safari‘ fehlt (Modell ist nicht Home-Bildschirm)`);
  const faelle = await p.evaluate(() => window.r124.FAELLE.map(f => ({ id: f.id, a: f.antworten[0].a })));
  for (const [i, f] of faelle.entries()) {
    pruefe((await p.textContent('#schritt')).includes(`Fall ${i + 1} von ${faelle.length}`), `${wo}: ‚Nächster Schritt‘ nennt nicht Fall ${i + 1}`);
    if (i === 2) { await p.click('#losKnopf'); await p.click('#nochmal'); }   // ‚Fall neu‘ einmal
    await p.click('#losKnopf');
    await p.waitForTimeout(f.id === 'rahmen' ? 600 : 250);
    if (i === 3) { await p.reload(); await p.waitForFunction(() => !!window.r124); }   // Neuladen mitten im Versuch
    else await antworte(p, f.a);
    if (i === 3) { await p.click('#losKnopf'); await p.waitForTimeout(250); await antworte(p, f.a); }
    pruefe(await p.evaluate(n => document.querySelectorAll('#liste .h')[n].textContent === '✓', i), `${wo}: Fall ${i + 1} nicht abgehakt`);
  }
  pruefe(!(await p.isDisabled('#teilen')), `${wo}: ‚Messung teilen‘ nach allen Fällen gesperrt`);
  await p.click('#teilen');
  await p.waitForTimeout(200);
  const m = await p.evaluate(() => window.__modell);
  const datei = m.share.find(s => s.name.startsWith('messung-RLB-124'));
  pruefe(!!datei, `${wo}: keine Messdatei geteilt`);
  // Rahmen: print im iframe – im Modell über contentWindow.print (nicht ersetzt) → zählt als ‚rahmen print zurueck‘ in der Datei
  const erg = werteAus(datei?.text || '');
  await ctx.close();
  return { wo, erg, m, konsole };
}

for (const typ of ['chromium', 'webkit']) {
  const b = await pw[typ].launch();
  for (const lage of Object.keys(LAGEN)) {
    const { wo, erg, m, konsole } = await lauf(b, lage, false);
    pruefe(konsole.length === 0, `${wo}: Konsole ${konsole.join(' | ')}`);
    pruefe(erg.probleme.length === 0, `${wo}: Auswertung meldet ${erg.probleme.join('; ')}`);
    pruefe(erg.faelle.length === 8 && erg.faelle.every(f => f.antwort), `${wo}: nicht alle 8 Fälle mit Antwort in der Datei`);
    const pr = m.print;
    pruefe(pr.length === 6, `${wo}: ${pr.length}× print() statt 6 (Fälle 1–4, dazu ‚Fall neu‘ in Fall 3 und Neuladen in Fall 4)`);
    pruefe(pr.every(x => x.ausgabe), `${wo}: print() ohne Probeausgabe in #printout`);
    pruefe(pr.filter(x => x.fenster).length === 3, `${wo}: print() bei offenem Fenster nicht genau in Fall 2 und 4 (2×)`);
    pruefe(m.open.length === 1 && m.open[0].startsWith('blob:'), `${wo}: Fall 6 öffnet kein Fenster mit der Probeseite`);
    const html = m.share.find(s => s.type === 'text/html'), pdf = m.share.find(s => s.type === 'application/pdf');
    pruefe(html && /RLB-124 Probedruck/.test(html.text) && html.name.endsWith('.html'), `${wo}: Fall 7 teilt keine HTML-Datei`);
    pruefe(pdf && pdfGueltig(pdf.text), `${wo}: Fall 8 teilt kein gültiges PDF`);
    const g = await lauf(b, lage, true);
    pruefe(g.erg.probleme.some(x => /print/.test(x)), `${g.wo}: Gegenprobe ohne print() wird nicht gemeldet (${g.erg.probleme.join('; ') || 'nichts'})`);
    console.log(`${wo}: ${erg.probleme.length ? 'Auswertung meldet ' + erg.probleme.join('; ') : 'Auswertung passt zum Modell'} · Gegenprobe meldet: ${g.erg.probleme.join('; ') || '–'}`);
  }
  await b.close();
}

// PDF: Kopf, Ende und alle Querverweise zeigen auf ‚n 0 obj‘
function pdfGueltig(s) {
  if (!s.startsWith('%PDF-1.') || !s.trimEnd().endsWith('%%EOF')) return false;
  const sx = +s.match(/startxref\n(\d+)/)?.[1]; if (s.slice(sx, sx + 4) !== 'xref') return false;
  const pos = [...s.slice(sx).matchAll(/^(\d{10}) 00000 n $/gm)].map(x => +x[1]);
  return pos.length === 5 && pos.every((p, i) => s.slice(p).startsWith(`${i + 1} 0 obj`));
}

console.log(fehler.length ? `ROT – ${fehler.length} Fehler:\n- ${fehler.join('\n- ')}` : 'GRÜN – Versuch passt zum Modell, Gegenprobe rot');
process.exit(fehler.length ? 1 : 0);
