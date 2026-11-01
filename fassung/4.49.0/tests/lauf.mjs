// AppDesign 4.13.0 · Lauf-Werkzeug (APD-5, seit 4.13.0): alle Prüfskripte einer App parallel, die schnellsten zuerst
// (nach der zuletzt gemessenen Dauer), in Chromium und WebKit; beim ersten roten Test werden die übrigen beendet.
// Seit 4.16.1 (APD-11): erst alle Läufe des ersten Browsers, dann die des nächsten – nie beide gleichzeitig. Im gemeinsamen
// Lauf wurden einzelne WebKit-Prüfungen rot, die einzeln und im reinen WebKit-Lauf grün sind (Vergleich 15.10.2026).
// Einbinden in tests/alle.mjs der App:
//   import * as pw from 'playwright';
//   import { lauf } from '../../AppDesign/tests/lauf.mjs';
//   process.exit(await lauf({ dir: new URL('..', import.meta.url), pw, tests: ['ablauf-fenster', { name: 'hig', teile: { hell: { PRUEF_DARSTELLUNG: 'light' } } }] }));
// Schalter: --alle (trotz Fehler weiter, am Ende alle roten) · --browser chromium,webkit · --nur name,name ·
// --gegenprobe [grundregeln | bedienung | schema | text] (jeder Test muss rot werden; zusammen mit --alle; bedienung seit 4.35.0: je eingeschleustem
// Fehler der Bedienungshilfen ein Lauf der Prüfung ‚bedienung‘ der App, genau die passende Meldung muss rot werden, APD-43 P2;
// schema seit 4.36.0: je Fall APD-78/S-1 bis APD-78/S-10 ein Lauf der Doku-Prüfung der App mit genau dieser Verletzung; text seit 4.37.0: je eingeschleustem Fehler der Textgröße ein Lauf der Prüfung ‚text-regeln‘ der App, APD-43 Teil 2 P3) · --jobs N (Standard seit 4.16.1: so viele wie Kerne – APD-10, unter Volllast mit 2 × Kernen schwankte WebKit) · --zeit S (Zeitgrenze je Test, Standard 300) · --abdeckung (Test × Ansicht ausgeben).
// Rote Läufe (seit 4.42.0, APD-85 Teil 1): kein Abbruch beim ersten, erst ab dem dritten roten Lauf; am Ende jeder rote einmal allein –
// grün = ‚⚠ wackelt‘ (gilt als grün, steht in der Schlusszeile), wieder rot = Fehler; nicht in der Gegenprobe.
// Rückgabewert: 0 alles grün (auch mit Wacklern), 1 mindestens ein Test rot, 2 Browser fehlt (APD-5/B-8).
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { cpus } from 'node:os';
import { fileURLToPath } from 'node:url';
import { GEGENPROBEN_BEDIENUNG, GEGENPROBEN_TEXT } from './pruefe.mjs';
import { GEGENPROBEN_SCHEMA } from './doku.mjs';

const mmss = ms => { const s = Math.round(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

export async function lauf({ dir, pw, tests, bedienung = 'ablauf-bedienung', text = 'text-regeln', doku = 'doku-regeln', argv = process.argv.slice(2) }) {
  const arg = (n, d) => { const i = argv.indexOf(n); return i < 0 ? d : argv[i + 1]; };
  const art = argv[argv.indexOf('--gegenprobe') + 1];
  const alle = argv.includes('--alle'), abdeckung = argv.includes('--abdeckung'), gegenprobe = argv.includes('--gegenprobe') ? (['grundregeln', 'bedienung', 'schema', 'text'].includes(art) ? art : '1') : '';
  const alleLaufen = alle || !!gegenprobe;   // die Gegenprobe läuft immer ganz durch
  const browsers = arg('--browser', 'chromium,webkit').split(',');
  const nur = arg('--nur', '') ? arg('--nur', '').split(',') : null;
  const jobs = +arg('--jobs', cpus().length), zeit = +arg('--zeit', 300) * 1000;
  const root = fileURLToPath(dir), out = new URL('tests/out/', dir), dauerDatei = new URL('dauer.json', out);
  mkdirSync(out, { recursive: true });

  // APD-5/B-8: fehlt ein Browser, sofort abbrechen – nie stillschweigend nur mit dem anderen prüfen.
  for (const br of browsers) {
    if (!pw[br]) { console.log(`✗ Unbekannter Browser ‚${br}‘ (chromium oder webkit)`); return 2; }
    if (!existsSync(pw[br].executablePath())) {
      console.log(`✗ ${br} fehlt – im Ordner tests der App: npx playwright install ${br}${br === 'webkit' ? ' und npx playwright install-deps webkit' : ''}` +
        ' (oder im Setup-Skript der Umgebung, Testfall-Liste APD-5/B-8). Nur einen Browser prüfen: --browser chromium');
      return 2;
    }
  }

  let dauer = {}; try { dauer = JSON.parse(readFileSync(dauerDatei, 'utf8')); } catch {}
  const liste = [];
  if (gegenprobe === 'bedienung') {
    // je Fall ein Lauf der Prüfung der Bedienungshilfen mit genau diesem eingeschleusten Fehler
    for (const br of browsers) for (const [fall, g] of Object.entries(GEGENPROBEN_BEDIENUNG)) if (!nur || nur.includes(fall))
      liste.push({ name: bedienung, teil: fall, br, env: { PRUEF_GEGENPROBE: 'bedienung:' + fall }, zeichen: g.zeichen, key: `${bedienung}:${fall}|${br}`, label: `${bedienung} (${fall}: ${g.was}) · ${br}` });
  } else if (gegenprobe === 'text') {
    // seit 4.37.0 (APD-43 Teil 2, P3): je eingeschleustem Fehler der Textgröße ein Lauf der Prüfung ‚text‘ der App
    for (const br of browsers) for (const [fall, g] of Object.entries(GEGENPROBEN_TEXT)) if (!nur || nur.includes(fall))
      liste.push({ name: text, teil: fall, br, env: { PRUEF_GEGENPROBE: 'text:' + fall }, zeichen: g.zeichen, key: `${text}:${fall}|${br}`, label: `${text} (${fall}: ${g.was}) · ${br}` });
  } else if (gegenprobe === 'schema') {
    // seit 4.36.0 (APD-78/S-1 bis APD-78/S-10): je Fall des Nummernschemas ein Lauf der Doku-Prüfung der App mit genau dieser Verletzung
    // (ohne Browser – nur im ersten)
    for (const [fall, g] of Object.entries(GEGENPROBEN_SCHEMA)) if (!nur || nur.includes(fall))
      liste.push({ name: doku, teil: fall, br: browsers[0], env: { PRUEF_GEGENPROBE: 'schema:' + fall }, zeichen: g.zeichen, key: `${doku}:${fall}|${browsers[0]}`, label: `${doku} (${fall}: ${g.was}) · ${browsers[0]}` });
  } else for (const t of tests) {
    const name = typeof t === 'string' ? t : t.name;
    if (nur && !nur.includes(name)) continue;
    const teile = (typeof t === 'object' && t.teile) || { '': {} };
    for (const br of browsers) for (const [teil, env] of Object.entries(teile))
      liste.push({ name, teil, br, env, key: `${name}${teil ? ':' + teil : ''}|${br}`, label: `${name}${teil ? ' (' + teil + ')' : ''} · ${br}` });
  }
  // Je Browser (in der Reihenfolge von --browser) die schnellsten zuerst; noch nie gemessene vorne (meist neue, kurze Tests).
  liste.sort((a, b) => browsers.indexOf(a.br) - browsers.indexOf(b.br) || (dauer[a.key] ?? 0) - (dauer[b.key] ?? 0));
  console.log(`${liste.length} Läufe (${browsers.join(' + ')}), bis zu ${jobs} gleichzeitig${browsers.length > 1 ? ', Browser nacheinander' : ''}${alleLaufen ? ', ohne Abbruch' : ', Abbruch ab dem dritten roten Lauf'}${gegenprobe ? ` – Gegenprobe${gegenprobe === 'grundregeln' ? ' der Grundregeln' : ''}` : ''}\n`);

  const start = Date.now(), laufend = new Set(), rot = [], wackelt = [];
  let abbruch = false, next = 0;
  const beende = c => { try { process.kill(-c.pid, 'SIGKILL'); } catch {} };
  // Ein Lauf als eigener Prozess; Zeitgrenze zählt wie rot (APD-85/W-8).
  const starte = (j, bei) => {
    const t0 = Date.now(); let text = '';
    const c = spawn(process.execPath, [`tests/${j.name}.mjs`], { cwd: root, detached: true, env: { ...process.env, PRUEF_BROWSER: j.br, ...(gegenprobe ? { PRUEF_GEGENPROBE: gegenprobe } : {}), ...j.env } });
    c.stdout.on('data', d => text += d); c.stderr.on('data', d => text += d);
    const uhr = setTimeout(() => { text += `\n✗ Zeitgrenze ${zeit / 1000} s überschritten – Test abgebrochen`; beende(c); }, zeit);
    c.on('close', code => { clearTimeout(uhr); bei(c, code, text, Date.now() - t0); });
    return c;
  };
  // APD-85 Teil 1 (seit 4.42.0): ein roter Lauf bricht nicht mehr sofort ab – erst ab dem dritten roten (ohne --alle);
  // am Ende läuft jeder rote Lauf einmal allein (W-9); grün heißt ‚wackelt‘ (gemeldet, gilt als grün), wieder rot heißt Fehler.
  const GRENZE = 3;
  await new Promise(fertig => {
    const weiter = () => {
      if (!laufend.size && (abbruch || next >= liste.length)) return fertig();
      while (!abbruch && laufend.size < jobs && next < liste.length) {
        // APD-11: der nächste Browser beginnt erst, wenn alle Läufe des vorigen fertig sind.
        if (laufend.size && next > 0 && liste[next].br !== liste[next - 1].br) break;
        const j = liste[next++];
        laufend.add(starte(j, (c, code, text, ms) => {
          laufend.delete(c);
          if (c.killedByUs) return weiter();
          if (code === 0) { dauer[j.key] = ms; console.log(`✓ ${j.label}  ${mmss(ms)}`); }
          else {
            rot.push({ j, text, code });
            console.log(`✗ ${j.label}  ${mmss(ms)}  (Rückgabewert ${code})`);
            if (!alleLaufen && !abbruch && rot.length >= GRENZE) { abbruch = true; for (const o of laufend) { o.killedByUs = true; beende(o); } }
          }
          weiter();
        }));
      }
    };
    weiter();
  });
  // Wiederholung: nicht in der Gegenprobe (rot ist dort gewollt, W-6) und nicht nach dem Abbruch (W-4); einer nach dem anderen, ohne Last;
  // die Dauer eines Wiederholungslaufs ersetzt nicht die gemessene Dauer unter Last (W-10).
  if (!gegenprobe && !abbruch && rot.length) {
    console.log(`\n${rot.length} ${rot.length > 1 ? 'rote Läufe' : 'roter Lauf'} – einmal allein wiederholen (ohne Last):`);
    for (const r of [...rot]) {
      const [code, text, ms] = await new Promise(ok => starte(r.j, (c, code, text, ms) => ok([code, text, ms])));
      if (code === 0) { rot.splice(rot.indexOf(r), 1); wackelt.push(r.j); console.log(`⚠ wackelt: ${r.j.name}${r.j.teil ? ' (' + r.j.teil + ')' : ''} · ${r.j.br} (rot unter Last, allein grün)  ${mmss(ms)}`); }
      else { r.text = text; r.code = code; console.log(`✗ ${r.j.label}  ${mmss(ms)}  allein wieder rot (Rückgabewert ${code})`); }
    }
  }
  writeFileSync(dauerDatei, JSON.stringify(dauer, null, 1));
  // APD-85/W-11: die Wackler für die Zusammenfassung des Veröffentlichungs-Skripts
  if (!gegenprobe) writeFileSync(new URL('wackelt.json', out), JSON.stringify(wackelt.map(j => j.label)));

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
    const gruen = pruefbar.filter(j => !rot.some(r => r.j === j && (j.zeichen || zeichen).test(r.text)));
    console.log(gruen.length ? `\n✗ Gegenprobe: ${gruen.length} Test(s) meldeten die Gegenprobe nicht – sie prüfen nichts: ${gruen.map(j => j.label).join(', ')}` : `\nGegenprobe${gegenprobe === 'grundregeln' ? ' der Grundregeln' : gegenprobe === 'bedienung' ? ' der Bedienungshilfen' : gegenprobe === 'text' ? ' der Textgröße' : gegenprobe === 'schema' ? ' des Nummernschemas' : ''}: alle ${pruefbar.length} Läufe wurden rot – jeder mit der passenden Meldung.`);
    return gruen.length ? 1 : 0;
  }
  if (rot.length) {
    for (const { j, text } of rot) {
      const zeilen = text.trim().split('\n'), wichtig = zeilen.filter(z => /✗|Abweichung|^- |^\s{4}|Error|error/.test(z));
      console.log(`\n── ${j.label} ──\n${(wichtig.length ? wichtig : zeilen).slice(0, 60).join('\n')}`);
    }
    const offen = liste.length - next;
    const w = wackelt.length ? ` · ${wackelt.length} wackelt: ${wackelt.map(j => j.label).join(', ')}` : '';
    console.log(`\n${rot.length} Test(s) rot nach ${zeitGesamt}${abbruch && offen ? ` – ${offen} nicht mehr gestartet` : ''}${abbruch ? ` (Abbruch ab dem ${GRENZE}. roten Lauf; alle sehen: --alle)` : ''}${w}`);
    return 1;
  }
  console.log(`\nAlle ${liste.length} Läufe grün in ${zeitGesamt}${wackelt.length ? ` – davon ${wackelt.length} wackelt: ${wackelt.map(j => j.label).join(', ')}` : ''}`);
  return 0;
}
