// AppDesign 4.13.0 · Lauf-Werkzeug (APD-5, seit 4.13.0): alle Prüfskripte einer App in Chromium und WebKit – zuerst der Vorlauf
// `doku-regeln` (einmal) und `version-regeln`, rot bricht sofort ab; dann parallel, die längsten zuerst (nach der zuletzt gemessenen
// Dauer); ab dem dritten roten Lauf werden die übrigen beendet, jeder rote Lauf läuft am Ende einmal allein (Zusammenarbeit 0 Nr. 2).
// Seit 4.63.0 (APD-135 Paket 5, Testfall-Liste APD-135/Z-1 bis Z-7): Vorlauf mit sofortigem Abbruch (C-44, nicht in der Gegenprobe),
// die längsten zuerst (C-43), `doku-regeln` nur im ersten Browser (C-37), die Ausgabe eines Wacklers bleibt in
// tests/out/wackelt-<Name>[-<Teil>]-<Browser>.txt (C-68), --abdeckung je Teil (PRUEF_TEIL, C-29).
// Seit 4.64.0 (APD-135/B-4.1, S-6): `schnittstelle-regeln` (R-1.14, ohne Browser) im Vorlauf nach `version-regeln`, nur im ersten Browser.
// Seit 4.64.0 (APD-135/B-3.1, APD-135/E-6): --gegenprobe pruefseite – jeder Teil der Prüfseite (`bausteine-pruefseite`, tests/pruefseite.mjs) läuft je
// eingeschleustem Fehler seiner Bausteine einmal (GEGENPROBEN_PRUEFSEITE) und muss mit der Meldung dieses Bausteins rot werden.
// Seit 4.16.1 (APD-11): erst alle Läufe des ersten Browsers, dann die des nächsten – nie beide gleichzeitig. Im gemeinsamen
// Lauf wurden einzelne WebKit-Prüfungen rot, die einzeln und im reinen WebKit-Lauf grün sind (Vergleich 15.10.2026).
// Einbinden in tests/alle.mjs der App:
//   import * as pw from 'playwright';
//   import { lauf } from '../../AppDesign/tests/lauf.mjs';
//   process.exit(await lauf({ dir: new URL('..', import.meta.url), pw, tests: ['ablauf-fenster', { name: 'hig', teile: { hell: { PRUEF_DARSTELLUNG: 'light' } } }] }));
// Schalter: --alle (trotz Fehler weiter, am Ende alle roten) · --browser chromium,webkit · --nur name,name ·
// --gegenprobe [grundregeln | bedienung | schema | begriffe | text | masse | pruefseite] (jeder Test muss rot werden; zusammen mit --alle; bedienung seit 4.35.0: je eingeschleustem
// Fehler der Bedienungshilfen ein Lauf der Prüfung ‚bedienung‘ der App, genau die passende Meldung muss rot werden, APD-43 P2;
// schema seit 4.36.0: je Fall APD-78/S-1 bis APD-78/S-10 ein Lauf der Doku-Prüfung der App mit genau dieser Verletzung; text seit 4.37.0: je eingeschleustem Fehler der Textgröße ein Lauf der Prüfung ‚text-regeln‘ der App, APD-43 Teil 2 P3) · --jobs N (Standard seit 4.16.1: so viele wie Kerne – APD-10, unter Volllast mit 2 × Kernen schwankte WebKit) · --zeit S (Zeitgrenze je Test, Standard 300) · --abdeckung (Test × Ansicht ausgeben). masse seit 4.51.0: je eingeschleustem Fehler der Maße und Stile (APD-40/A-1 bis APD-40/A-8) ein Lauf der Prüfung ‚hig‘ der App;
// Rote Läufe (seit 4.42.0, APD-85 Teil 1): kein Abbruch beim ersten, erst ab dem dritten roten Lauf; am Ende jeder rote einmal allein –
// grün = ‚⚠ wackelt‘ (gilt als grün, steht in der Schlusszeile), wieder rot = Fehler; nicht in der Gegenprobe.
// Rückgabewert: 0 alles grün (auch mit Wacklern), 1 mindestens ein Test rot, 2 Browser fehlt (APD-5/B-8).
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { cpus } from 'node:os';
import { fileURLToPath } from 'node:url';
import { GEGENPROBEN_BEDIENUNG, GEGENPROBEN_TEXT, GEGENPROBEN_MASSE } from './pruefe.mjs';
import { GEGENPROBEN_SCHEMA, GEGENPROBEN_BEGRIFFE } from './doku.mjs';
import { GEGENPROBEN_PRUEFSEITE } from './pruefseite.mjs';

const mmss = ms => { const s = Math.round(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

export async function lauf({ dir, pw, tests, bedienung = 'ablauf-bedienung', text = 'text-regeln', doku = 'doku-regeln', masse = 'hig', schnittstelle = 'schnittstelle-regeln', pruefseite = 'bausteine-pruefseite', vorlauf = [doku, 'version-regeln', schnittstelle], argv = process.argv.slice(2) }) {
  const arg = (n, d) => { const i = argv.indexOf(n); return i < 0 ? d : argv[i + 1]; };
  const art = argv[argv.indexOf('--gegenprobe') + 1];
  const alle = argv.includes('--alle'), abdeckung = argv.includes('--abdeckung'), gegenprobe = argv.includes('--gegenprobe') ? (['grundregeln', 'bedienung', 'schema', 'begriffe', 'text', 'masse', 'pruefseite'].includes(art) ? art : '1') : '';
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
  } else if (gegenprobe === 'masse') {
    // seit 4.51.0 (APD-40 Paket A, APD-40/A-1 bis APD-40/A-8): je eingeschleustem Fehler der Maße und Stile ein Lauf der Prüfung ‚hig‘ der App
    for (const br of browsers) for (const [fall, g] of Object.entries(GEGENPROBEN_MASSE)) if (!nur || nur.includes(fall))
      liste.push({ name: g.test || masse, teil: fall, br, env: { PRUEF_GEGENPROBE: 'masse:' + fall }, zeichen: g.zeichen, key: `${g.test || masse}:${fall}|${br}`, label: `${g.test || masse} (${fall}: ${g.was}) · ${br}` });   // seit 4.52.0: g.test (APD-40 B, C)
  } else if (gegenprobe === 'schema') {
    // seit 4.36.0 (APD-78/S-1 bis APD-78/S-10): je Fall des Nummernschemas ein Lauf der Doku-Prüfung der App mit genau dieser Verletzung
    // (ohne Browser – nur im ersten)
    for (const [fall, g] of Object.entries(GEGENPROBEN_SCHEMA)) if (!nur || nur.includes(fall))
      liste.push({ name: doku, teil: fall, br: browsers[0], env: { PRUEF_GEGENPROBE: 'schema:' + fall }, zeichen: g.zeichen, key: `${doku}:${fall}|${browsers[0]}`, label: `${doku} (${fall}: ${g.was}) · ${browsers[0]}` });
  } else if (gegenprobe === 'begriffe') {
    // seit 4.67.2 (P-118/Z-3, R-10.9): je eingeschleustem Sperrwort (Kommentar in v4/ui.js, Mehrzahl in der Designrichtlinie, Zusammensetzung im
    // Katalog) ein Lauf der Doku-Prüfung der App – genau die Meldung R-10.9 mit dieser Datei muss rot werden (ohne Browser – nur im ersten)
    for (const [fall, g] of Object.entries(GEGENPROBEN_BEGRIFFE)) if (!nur || nur.includes(fall))
      liste.push({ name: doku, teil: fall, br: browsers[0], env: { PRUEF_GEGENPROBE: 'begriffe:' + fall }, zeichen: g.zeichen, key: `${doku}:${fall}|${browsers[0]}`, label: `${doku} (${fall}: ${g.was}) · ${browsers[0]}` });
  } else if (gegenprobe === 'pruefseite') {
    // seit 4.64.0 (APD-135/B-3.1, APD-135/E-6): je Teil der Prüfseite und je eingeschleustem Fehler seiner Bausteine ein Lauf; ein Teil ohne Fehler prüft nichts
    const t = tests.find(x => (typeof x === 'string' ? x : x.name) === pruefseite);
    const teile = (typeof t === 'object' && t.teile) || {};
    const ohne = Object.keys(teile).filter(teil => !Object.keys(GEGENPROBEN_PRUEFSEITE[teil] || {}).length);
    if (!t || !Object.keys(teile).length || ohne.length) {
      console.log(`✗ Gegenprobe der Prüfseite: ${!t ? `‚${pruefseite}‘ steht nicht in tests/alle.mjs` : !Object.keys(teile).length ? `‚${pruefseite}‘ ohne Teile` : `Teil ohne eingeschleusten Fehler: ${ohne.join(', ')}`}`);
      return 1;
    }
    for (const br of browsers) for (const [teil, env] of Object.entries(teile)) for (const [fall, g] of Object.entries(GEGENPROBEN_PRUEFSEITE[teil])) if (!nur || nur.includes(pruefseite) || nur.includes(teil) || nur.includes(fall))
      liste.push({ name: pruefseite, teil: `${teil}:${fall}`, br, env: { PRUEF_TEIL: teil, ...env, PRUEF_GEGENPROBE: 'pruefseite:' + fall }, zeichen: g.zeichen,
        key: `${pruefseite}:${teil}:${fall}|${br}`, label: `${pruefseite} (${teil}: ${g.baustein} – ${g.was}) · ${br}` });
  } else for (const t of tests) {
    const name = typeof t === 'string' ? t : t.name;
    if (nur && !nur.includes(name)) continue;
    const teile = (typeof t === 'object' && t.teile) || { '': {} };
    // APD-135/Z-3 (C-37): die Doku-Prüfung startet keinen Browser – nur im ersten
    for (const br of name === doku || name === schnittstelle ? browsers.slice(0, 1) : browsers) for (const [teil, env] of Object.entries(teile))
      liste.push({ name, teil, br, env: { ...(teil ? { PRUEF_TEIL: teil } : {}), ...env }, key: `${name}${teil ? ':' + teil : ''}|${br}`, label: `${name}${teil ? ' (' + teil + ')' : ''} · ${br}` });
  }
  // Je Browser (in der Reihenfolge von --browser) die längsten zuerst (APD-135/Z-5, C-43: die kurzen füllen am Ende die Lücken);
  // noch nie gemessene ganz vorne.
  const lang = j => dauer[j.key] ?? Number.MAX_SAFE_INTEGER;
  liste.sort((a, b) => browsers.indexOf(a.br) - browsers.indexOf(b.br) || lang(b) - lang(a));
  // APD-135/Z-1 bis Z-4 (C-44): der Vorlauf (`doku-regeln`, `version-regeln`, seit 4.64.0 `schnittstelle-regeln`) läuft vor allen anderen, einer nach dem anderen – rot bricht sofort ab
  // (eine falsche Versionstabelle kostet sonst einen ganzen Lauf). Nicht in der Gegenprobe: dort ist rot gewollt, sie läuft ganz durch.
  const vor = gegenprobe ? [] : liste.filter(j => vorlauf.includes(j.name));
  for (const j of vor) liste.splice(liste.indexOf(j), 1);
  console.log(`${vor.length + liste.length} Läufe (${browsers.join(' + ')}), bis zu ${jobs} gleichzeitig${browsers.length > 1 ? ', Browser nacheinander' : ''}${alleLaufen ? ', ohne Abbruch' : ', Abbruch ab dem dritten roten Lauf'}${gegenprobe ? ` – Gegenprobe${gegenprobe === 'grundregeln' ? ' der Grundregeln' : ''}` : ''}\n`);

  const start = Date.now(), laufend = new Set(), rot = [], wackelt = [];
  const dateiName = j => `${j.name}${j.teil ? '-' + j.teil : ''}-${j.br}`.replace(/[^\wäöüÄÖÜß.-]+/g, '_');
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
  if (vor.length) {
    console.log(`Vorlauf: ${vor.map(j => j.label).join(', ')}`);
    for (const j of vor) {
      const [code, text, ms] = await new Promise(ok => starte(j, (c, code, text, ms) => ok([code, text, ms])));
      if (code === 0) { dauer[j.key] = ms; console.log(`✓ ${j.label}  ${mmss(ms)}`); continue; }
      console.log(`✗ ${j.label}  ${mmss(ms)}  (Rückgabewert ${code})`);
      writeFileSync(dauerDatei, JSON.stringify(dauer, null, 1));
      if (!gegenprobe) writeFileSync(new URL('wackelt.json', out), '[]');
      const zeilen = text.trim().split('\n');
      console.log(`\n── ${j.label} ──\n${zeilen.slice(0, 60).join('\n')}`);
      console.log(`\nVorlauf rot: ${j.label} – Abbruch vor den übrigen ${liste.length} Läufen nach ${mmss(Date.now() - start)} (APD-135/Z-1)`);
      return 1;
    }
    console.log('');
  }
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
      if (code === 0) {
        // APD-135/Z-6 (C-68): die Ausgabe des roten Laufs unter Last bleibt erhalten – sonst lässt sich ein Wackler nie klären (APD-134)
        const datei = `tests/out/wackelt-${dateiName(r.j)}.txt`;
        writeFileSync(new URL(datei, dir), `${r.j.label} – rot unter Last (Rückgabewert ${r.code}), allein grün\n\n${r.text}`);
        rot.splice(rot.indexOf(r), 1); wackelt.push({ ...r.j, datei });
        console.log(`⚠ wackelt: ${r.j.name}${r.j.teil ? ' (' + r.j.teil + ')' : ''} · ${r.j.br} (rot unter Last, allein grün)  ${mmss(ms)} – Ausgabe: ${datei}`);
      }
      else { r.text = text; r.code = code; console.log(`✗ ${r.j.label}  ${mmss(ms)}  allein wieder rot (Rückgabewert ${code})`); }
    }
  }
  writeFileSync(dauerDatei, JSON.stringify(dauer, null, 1));
  // APD-85/W-11: die Wackler für die Zusammenfassung des Veröffentlichungs-Skripts
  if (!gegenprobe) writeFileSync(new URL('wackelt.json', out), JSON.stringify(wackelt.map(j => j.label)));

  const zeitGesamt = mmss(Date.now() - start);
  if (abdeckung) {
    const m = new Map();
    // APD-135/Z-7 (C-29): je Teil eine eigene Datei abdeckung-<Name>~<Teil>-<Browser>.json (PRUEF_TEIL, pruefe.mjs)
    for (const f of readdirSync(out).filter(f => /^abdeckung-.*\.json$/.test(f))) {
      const [, name, teil, br] = f.match(/^abdeckung-(.+?)(?:~(.+))?-(chromium|webkit)\.json$/) || [];
      if (name) m.set(`${name}${teil ? ' (' + teil.replace(/_/g, ' ') + ')' : ''} · ${br}`, JSON.parse(readFileSync(new URL(f, out), 'utf8')));
    }
    console.log('\nAbdeckung (Test × Ansicht):');
    for (const [k, v] of [...m].sort()) console.log(`  ${k.padEnd(44)} ${v.join(' · ') || '–'}`);
  }
  if (gegenprobe) {
    // Bei den Grundregeln zählen nur Tests mit Grundregeln (Schritte); die anderen dürfen grün bleiben.
    const pruefbar = gegenprobe === 'grundregeln' ? liste.filter(j => !/^(doku|version|abgleich|kontextmenue)-regeln$|^ablauf-abgleich-faelle$|^hig$/.test(j.name)) : liste;
    // Rot zählt nur, wenn genau die Gegenprobe gemeldet wurde (nicht ein anderer Fehler).
    const zeichen = gegenprobe === 'grundregeln' ? /R-6\.3 Text ragt über div\.ad-alert-message hinaus: ‚#gegenprobe a/ : /Gegenprobe/;
    const gruen = pruefbar.filter(j => !rot.some(r => r.j === j && (j.zeichen || zeichen).test(r.text)));
    console.log(gruen.length ? `\n✗ Gegenprobe: ${gruen.length} Test(s) meldeten die Gegenprobe nicht – sie prüfen nichts: ${gruen.map(j => j.label).join(', ')}` : `\nGegenprobe${gegenprobe === 'grundregeln' ? ' der Grundregeln' : gegenprobe === 'bedienung' ? ' der Bedienungshilfen' : gegenprobe === 'text' ? ' der Textgröße' : gegenprobe === 'masse' ? ' der Maße und Stile' : gegenprobe === 'schema' ? ' des Nummernschemas' : gegenprobe === 'pruefseite' ? ' der Prüfseite' : ''}: alle ${pruefbar.length} Läufe wurden rot – jeder mit der passenden Meldung.`);
    return gruen.length ? 1 : 0;
  }
  if (rot.length) {
    for (const { j, text } of rot) {
      const zeilen = text.trim().split('\n'), wichtig = zeilen.filter(z => /✗|Abweichung|^- |^\s{4}|Error|error/.test(z));
      console.log(`\n── ${j.label} ──\n${(wichtig.length ? wichtig : zeilen).slice(0, 60).join('\n')}`);
    }
    const offen = liste.length - next;
    const w = wackelt.length ? ` · ${wackelt.length} wackelt: ${wackelt.map(j => `${j.label} (Ausgabe: ${j.datei})`).join(', ')}` : '';
    console.log(`\n${rot.length} Test(s) rot nach ${zeitGesamt}${abbruch && offen ? ` – ${offen} nicht mehr gestartet` : ''}${abbruch ? ` (Abbruch ab dem ${GRENZE}. roten Lauf; alle sehen: --alle)` : ''}${w}`);
    return 1;
  }
  console.log(`\nAlle ${vor.length + liste.length} Läufe grün in ${zeitGesamt}${wackelt.length ? ` – davon ${wackelt.length} wackelt: ${wackelt.map(j => `${j.label} (Ausgabe: ${j.datei})`).join(', ')}` : ''}`);
  return 0;
}
