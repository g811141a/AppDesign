// AppDesign 4.13.0 · Lauf-Werkzeug (A-05, seit 4.13.0): alle Prüfskripte einer App parallel, die schnellsten zuerst
// (nach der zuletzt gemessenen Dauer), in Chromium und WebKit; beim ersten roten Test werden die übrigen beendet.
// Einbinden in tests/alle.mjs der App:
//   import * as pw from 'playwright';
//   import { lauf } from '../../AppDesign/tests/lauf.mjs';
//   process.exit(await lauf({ dir: new URL('..', import.meta.url), pw, tests: ['ablauf-fenster', { name: 'hig', teile: { hell: { PRUEF_DARSTELLUNG: 'light' } } }] }));
// Schalter: --alle (trotz Fehler weiter, am Ende alle roten) · --browser chromium,webkit · --nur name,name ·
// --gegenprobe [grundregeln] (jeder Test muss rot werden; zusammen mit --alle) · --jobs N (Standard seit 4.16.1: so viele wie Kerne – A-10, unter Volllast mit 2 × Kernen schwankte WebKit) · --zeit S (Zeitgrenze je Test, Standard 300) · --abdeckung (Test × Ansicht ausgeben).
// Rückgabewert: 0 alles grün, 1 mindestens ein Test rot, 2 Browser fehlt (B-8).
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { cpus } from 'node:os';
import { fileURLToPath } from 'node:url';

const mmss = ms => { const s = Math.round(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

export async function lauf({ dir, pw, tests, argv = process.argv.slice(2) }) {
  const arg = (n, d) => { const i = argv.indexOf(n); return i < 0 ? d : argv[i + 1]; };
  const alle = argv.includes('--alle'), abdeckung = argv.includes('--abdeckung'), gegenprobe = argv.includes('--gegenprobe') ? (argv[argv.indexOf('--gegenprobe') + 1] === 'grundregeln' ? 'grundregeln' : '1') : '';
  const alleLaufen = alle || !!gegenprobe;   // die Gegenprobe läuft immer ganz durch
  const browsers = arg('--browser', 'chromium,webkit').split(',');
  const nur = arg('--nur', '') ? arg('--nur', '').split(',') : null;
  const jobs = +arg('--jobs', cpus().length), zeit = +arg('--zeit', 300) * 1000;
  const root = fileURLToPath(dir), out = new URL('tests/out/', dir), dauerDatei = new URL('dauer.json', out);
  mkdirSync(out, { recursive: true });

  // B-8: fehlt ein Browser, sofort abbrechen – nie stillschweigend nur mit dem anderen prüfen.
  for (const br of browsers) {
    if (!pw[br]) { console.log(`✗ Unbekannter Browser ‚${br}‘ (chromium oder webkit)`); return 2; }
    if (!existsSync(pw[br].executablePath())) {
      console.log(`✗ ${br} fehlt – im Ordner tests der App: npx playwright install ${br}${br === 'webkit' ? ' und npx playwright install-deps webkit' : ''}` +
        ' (oder im Setup-Skript der Umgebung, Fall-Liste A-05 B-8). Nur einen Browser prüfen: --browser chromium');
      return 2;
    }
  }

  let dauer = {}; try { dauer = JSON.parse(readFileSync(dauerDatei, 'utf8')); } catch {}
  const liste = [];
  for (const t of tests) {
    const name = typeof t === 'string' ? t : t.name;
    if (nur && !nur.includes(name)) continue;
    const teile = (typeof t === 'object' && t.teile) || { '': {} };
    for (const br of browsers) for (const [teil, env] of Object.entries(teile))
      liste.push({ name, teil, br, env, key: `${name}${teil ? ':' + teil : ''}|${br}`, label: `${name}${teil ? ' (' + teil + ')' : ''} · ${br}` });
  }
  // Schnellste zuerst; noch nie gemessene vorne (meist neue, kurze Tests).
  liste.sort((a, b) => (dauer[a.key] ?? 0) - (dauer[b.key] ?? 0));
  console.log(`${liste.length} Läufe (${browsers.join(' + ')}), bis zu ${jobs} gleichzeitig${alleLaufen ? ', ohne Abbruch' : ', Abbruch beim ersten Fehler'}${gegenprobe ? ` – Gegenprobe${gegenprobe === 'grundregeln' ? ' der Grundregeln' : ''}` : ''}\n`);

  const start = Date.now(), laufend = new Set(), rot = [];
  let abbruch = false, next = 0;
  const beende = c => { try { process.kill(-c.pid, 'SIGKILL'); } catch {} };
  await new Promise(fertig => {
    const weiter = () => {
      if (!laufend.size && (abbruch || next >= liste.length)) return fertig();
      while (!abbruch && laufend.size < jobs && next < liste.length) {
        const j = liste[next++], t0 = Date.now(); let text = '';
        const c = spawn(process.execPath, [`tests/${j.name}.mjs`], { cwd: root, detached: true, env: { ...process.env, ...j.env, PRUEF_BROWSER: j.br, ...(gegenprobe ? { PRUEF_GEGENPROBE: gegenprobe } : {}) } });
        laufend.add(c);
        c.stdout.on('data', d => text += d); c.stderr.on('data', d => text += d);
        const uhr = setTimeout(() => { text += `\n✗ Zeitgrenze ${zeit / 1000} s überschritten – Test abgebrochen`; beende(c); }, zeit);
        c.on('close', code => {
          clearTimeout(uhr); laufend.delete(c);
          const ms = Date.now() - t0;
          if (c.killedByUs) return weiter();
          if (code === 0) { dauer[j.key] = ms; console.log(`✓ ${j.label}  ${mmss(ms)}`); }
          else {
            rot.push({ j, text, code });
            console.log(`✗ ${j.label}  ${mmss(ms)}  (Rückgabewert ${code})`);
            if (!alleLaufen && !abbruch) { abbruch = true; for (const o of laufend) { o.killedByUs = true; beende(o); } }
          }
          weiter();
        });
      }
    };
    weiter();
  });
  writeFileSync(dauerDatei, JSON.stringify(dauer, null, 1));

  const zeitGesamt = mmss(Date.now() - start);
  if (abdeckung) {
    const m = new Map();
    for (const f of readdirSync(out).filter(f => /^abdeckung-.*\.json$/.test(f))) {
      const [, name, br] = f.match(/^abdeckung-(.+)-(chromium|webkit)\.json$/) || [];
      if (name) m.set(`${name} · ${br}`, JSON.parse(readFileSync(new URL(f, out), 'utf8')));
    }
    console.log('\nAbdeckung (Test × Ansicht):');
    for (const [k, v] of [...m].sort()) console.log(`  ${k.padEnd(44)} ${v.join(' · ') || '–'}`);
  }
  if (gegenprobe) {
    // Bei den Grundregeln zählen nur Tests mit Grundregeln (Schritte); die anderen dürfen grün bleiben.
    const pruefbar = gegenprobe === 'grundregeln' ? liste.filter(j => !/^(doku|version|abgleich|kontextmenue)-regeln$|^ablauf-abgleich-faelle$|^hig$/.test(j.name)) : liste;
    // Rot zählt nur, wenn genau die Gegenprobe gemeldet wurde (nicht ein anderer Fehler).
    const zeichen = gegenprobe === 'grundregeln' ? /R-6\.3 Text ragt über div\.msg-text hinaus: ‚#gegenprobe a/ : /Gegenprobe/;
    const gruen = pruefbar.filter(j => !rot.some(r => r.j === j && zeichen.test(r.text)));
    console.log(gruen.length ? `\n✗ Gegenprobe: ${gruen.length} Test(s) meldeten die Gegenprobe nicht – sie prüfen nichts: ${gruen.map(j => j.label).join(', ')}` : `\nGegenprobe${gegenprobe === 'grundregeln' ? ' der Grundregeln' : ''}: alle ${pruefbar.length} Läufe wurden rot – jeder meldet Fehler.`);
    return gruen.length ? 1 : 0;
  }
  if (rot.length) {
    for (const { j, text } of rot) {
      const zeilen = text.trim().split('\n'), wichtig = zeilen.filter(z => /✗|Abweichung|^- |^\s{4}|Error|error/.test(z));
      console.log(`\n── ${j.label} ──\n${(wichtig.length ? wichtig : zeilen).slice(0, 60).join('\n')}`);
    }
    const offen = liste.length - next + (abbruch ? 0 : 0);
    console.log(`\n${rot.length} Test(s) rot nach ${zeitGesamt}${abbruch && offen ? ` – ${offen} nicht mehr gestartet` : ''}${abbruch ? ' (Abbruch beim ersten Fehler; alle sehen: --alle)' : ''}`);
    return 1;
  }
  console.log(`\nAlle ${liste.length} Läufe grün in ${zeitGesamt}`);
  return 0;
}
