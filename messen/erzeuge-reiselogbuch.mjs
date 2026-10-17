// A-18 / T-91 (Sitzung Reiselogbuch 0010): erzeugt messen/reiselogbuch.html – Kopie der App Reiselogbuch mit Protokoll,
// die nichts speichern kann (Plan: arbeit/A-18 Messung.md, Messung 3). Wird nach der Korrektur mit der Kopie gelöscht.
//   node messen/erzeuge-reiselogbuch.mjs   (ReiseLogBuch liegt neben AppDesign)
import { readFileSync, writeFileSync } from 'node:fs';

const quelle = new URL('../../ReiseLogBuch/index.html', import.meta.url);
let html = readFileSync(quelle, 'utf8');
const version = html.match(/const APP_VERSION = '([\d.]+)'/)[1];
const ersetze = (alt, neu) => { if (!html.includes(alt)) throw new Error(`nicht gefunden: ${alt}`); html = html.replace(alt, neu); };

ersetze('<link rel="manifest" href="manifest.json">\n', '');
ersetze('href="icon-180.png"', 'href="../../ReiseLogBuch/icon-180.png"');
html = html.replaceAll('../AppDesign/fassung/', '../fassung/');
html = html.replace(/<title>[^<]*<\/title>/, '<title>Messung Reiselogbuch</title>');
ersetze("if ('serviceWorker' in navigator && location.protocol === 'https:') {\n  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {});\n}",
  '// Messung: keine Installation (Service Worker)');

// Vor allem anderen: Speicher nur lesen. Die Seite liegt auf derselben Adresse wie die App und sieht deren Daten.
const sperre = `<script>
// Messung (A-18): nichts speichern – Schreiben in den Speicher ist abgeschaltet, Änderungen verschwinden beim Neuladen.
Storage.prototype.setItem = function () {};
Storage.prototype.removeItem = function () {};
Storage.prototype.clear = function () {};
</script>
`;
ersetze('<script src="../fassung/', sperre + '<script src="../fassung/');

const protokoll = `<div id="messung" style="position:fixed;left:12px;bottom:12px;z-index:9999;display:flex;gap:8px;align-items:center;
  font:600 13px -apple-system,system-ui;background:#ff3b30;color:#fff;border-radius:16px;padding:6px 6px 6px 12px">
  Messung – speichert nicht <button type="button" id="mD" style="font:inherit;border:0;border-radius:12px;padding:6px 10px;background:#fff;color:#ff3b30">Versuch D an</button> <button type="button" id="mKopie" style="font:inherit;border:0;border-radius:12px;padding:6px 10px;background:#fff;color:#ff3b30">Protokoll kopieren</button></div>
<script>
'use strict';
// Messung (A-18): ab dem Antippen eines Feldes im Fenster 3 s lang jede Änderung; jede Eingabe verlängert um 1,5 s.
(() => {
  const vv = window.visualViewport, body = () => dlg.querySelector('.dlg-body');
  let t0 = null, ende = 0, zeilen = [], letzte = '', zeile = null;
  document.addEventListener('click', e => { const z = e.target.closest?.('#app [data-day]'); if (z) zeile = z; }, true);
  const stand = () => {
    const f = document.activeElement, d = dlg.getBoundingClientRect(), z = zeile?.isConnected ? zeile.getBoundingClientRect() : null;
    const oben = vv ? vv.offsetTop : 0, unten = vv ? vv.offsetTop + vv.height : innerHeight, fr = f?.getBoundingClientRect?.();
    return [vv ? Math.round(vv.height) : '-', vv ? Math.round(oben) : '-', Math.round(scrollY), Math.round(d.top), Math.round(d.height),
      Math.round(body()?.scrollTop ?? 0), z ? Math.round(z.top) : '-',
      fr && f !== dlg ? (fr.top >= oben && fr.bottom <= unten ? 'ja' : 'nein') : '-'].join('\\t');
  };
  const notiere = q => {
    if (t0 === null || performance.now() > ende || zeilen.length > 400) return;
    const s = stand();
    if (s === letzte && q === 'Bild') return;
    letzte = s;
    zeilen.push(String(Math.round(performance.now() - t0)).padStart(5) + '\\t' + s + '\\t' + q);
  };
  const bild = () => { notiere('Bild'); if (performance.now() < ende) requestAnimationFrame(bild); };
  const verlaengere = ms => { const lief = performance.now() < ende; ende = Math.max(ende, performance.now() + ms); if (!lief) requestAnimationFrame(bild); };
  // Versuch D: beim Antippen eines Feldes – bevor die Tastatur kommt – nimmt das Fenster schon die Höhe an, die es mit
  // Tastatur haben wird, und rollt seinen Inhalt so, dass die Schreibstelle im oberen, frei bleibenden Teil liegt. Dann muss
  // Safari die Ansicht nicht hochschieben. Höhe der Tastatur: zuletzt gemessen, sonst geschätzt (quer 53 %, hoch 32 %).
  let versuchD = true, tastatur = 0, vorabBis = 0, tippY = null;
  const offen = () => vv && vv.height < innerHeight - 80;
  const erwartet = () => innerHeight - (tastatur || Math.round(innerHeight * (innerWidth > innerHeight ? 0.53 : 0.32)));
  const setzeVorab = () => {
    const h = erwartet(), full = isPhone();
    document.documentElement.style.setProperty('--dlg-max', Math.max(200, full ? h : h - 20) + 'px');
    dlg.style.top = full ? '0px' : Math.round(Math.max(10, (h - dlg.offsetHeight) / 2)) + 'px';
    return h;
  };
  dlg.addEventListener('pointerdown', e => { tippY = e.target.matches?.('input, textarea') ? e.clientY - e.target.getBoundingClientRect().top : null; }, true);
  dlg.addEventListener('focusin', e => {
    if (!versuchD || !e.target.matches('input, textarea') || offen()) return;
    const f = e.target, body = dlg.querySelector('.dlg-body');
    vorabBis = performance.now() + 1500;
    const h = setzeVorab();
    // Schreibstelle: dort, wo getippt wurde (sonst 30 px unter der Oberkante des Feldes); höchstens bis zur Mitte des freien Teils
    const r = f.getBoundingClientRect(), stelle = r.top + Math.min(tippY ?? 30, r.height - 10), ziel = Math.round(h * 0.5);
    if (body && stelle > ziel) body.scrollTop += stelle - ziel;
    setTimeout(() => notiere('D vorab (frei ' + h + ')'));
  }, true);
  if (vv) vv.addEventListener('resize', () => { if (offen()) { tastatur = innerHeight - Math.round(vv.height); vorabBis = 0; } });
  const orig = placeDialogs;
  placeDialogs = function () { orig(); if (versuchD && performance.now() < vorabBis && !offen()) setzeVorab(); notiere('placeDialogs'); };
  document.getElementById('mD').onclick = e => { versuchD = !versuchD; e.currentTarget.textContent = 'Versuch D ' + (versuchD ? 'an' : 'aus'); };
  if (vv) {
    vv.addEventListener('resize', () => notiere('vv resize'));
    vv.addEventListener('scroll', () => notiere('vv scroll'));
  }
  addEventListener('scroll', () => notiere('Seite rollt'), { passive: true });
  dlg.addEventListener('scroll', () => notiere('Fenster rollt'), { capture: true, passive: true });
  if (window.ResizeObserver) new ResizeObserver(() => notiere('Fenster Größe')).observe(dlg);
  dlg.addEventListener('focusin', e => {
    if (!e.target.matches('input, textarea')) return;
    if (t0 === null || performance.now() > ende) {
      t0 = performance.now(); ende = 0; letzte = '';
      zeilen = ['Reiselogbuch ${version} (Kopie) · Versuch D ' + (versuchD ? 'an' : 'aus') + ' · ' + innerWidth + '×' + innerHeight + ' · ' + (navigator.userAgent.match(/Version\\/[\\d.]+/)?.[0] || ''),
        '    ms\\tvv-Höhe\\tvv-oben\\tscrollY\\tFenster\\tF-Höhe\\tF-gerollt\\tZeile\\tFeld sichtbar\\tAuslöser'];
    }
    verlaengere(3000);
    notiere('Antippen ' + (e.target.id || e.target.tagName));
    setTimeout(() => notiere('350 ms (scrollIntoView)'), 360);
  });
  dlg.addEventListener('input', () => { notiere('Eingabe'); verlaengere(1500); });
  document.getElementById('mKopie').onclick = async () => {
    const text = zeilen.join('\\n') || 'Noch kein Protokoll – im Fenster ein Feld antippen.';
    try { await navigator.clipboard.writeText(text); inform('Kopiert', 'Das Protokoll ist in der Zwischenablage. Füge es im Chat ein.'); }
    catch (e) { inform('Nicht kopiert', 'Kopieren ging nicht.'); }
  };
})();
</script>
`;
// Ans echte Ende: </body> steht auch in der Ausgabe-Vorlage der App
const ende = html.lastIndexOf('</body>');
html = html.slice(0, ende) + protokoll + html.slice(ende);
html = html.replace('<head>', `<head>\n<!-- Erzeugt von messen/erzeuge-reiselogbuch.mjs aus Reiselogbuch ${version} – Messung A-18, speichert nicht. Nicht von Hand ändern. -->`);
writeFileSync(new URL('reiselogbuch.html', import.meta.url), html);
console.log(`✓ messen/reiselogbuch.html aus Reiselogbuch ${version}`);
