// APD-127 · Muster ‚Gleitbewegungen wie das Mehr-Menü‘ (R-1.12, Wortlaut bestätigt 08.11.2026) bauen – Sitzung Reiselogbuch 0100.
//   node "arbeit/APD-127 Muster bauen.mjs"   (AppDesign und ReiseLogBuch nebeneinander)
// Erzeugt arbeit/APD-127/app/index.html aus ReiseLogBuch/index.html (3.54.0) und arbeit/APD-127/app/ui.js aus fassung/4.56.0/ui.js:
// - eigener Speicher `reiselogbuch.muster-apd127` (die echten Reisedaten unter `reiselogbuch.v1` bleiben unberührt), Beispielreise beim ersten Start,
//   kein Service Worker, kein Manifest;
// - Variante über die Adresse: ohne Angabe bzw. ?v=a neu nach R-1.12 · ?v=b heute (4.56.0) zum Vergleich;
// - R-1.12: Kurve K = cubic-bezier(.32,.72,0,1); öffnen, hinein, nach oben 0,35 s; schließen, hinaus 0,25 s; nach einer Geste der Rest anteilig (≥ 0,15 s).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const AD = new URL('../', import.meta.url), RLB = new URL('../../ReiseLogBuch/', import.meta.url), ZIEL = new URL('./APD-127/app/', import.meta.url);
mkdirSync(ZIEL, { recursive: true });
// Sitzung 0101 (Messung Notizen-Seitenleiste): öffnen mit Feder ohne Nachschwingen, Antwortzeit 0,35 s, als linear()-Kurve über 0,5 s;
// schließen ease-in-out 0,25 s (Form wie Notizen, Länge wie das Mehr-Menü)
const federWert = t => 1 - (1 + 2 * Math.PI / 0.35 * t) * Math.exp(-2 * Math.PI / 0.35 * t);
const FEDER = 'linear(' + Array.from({ length: 31 }, (_, i) => (federWert(i / 30 * 0.5) / federWert(0.5)).toFixed(4)).join(', ') + ')', ZU_KURVE = 'cubic-bezier(.42,0,.58,1)';
const ersetze = (s, alt, neu) => { if (s.split(alt).length !== 2) throw new Error('nicht genau einmal: ' + alt.slice(0, 80)); return s.replace(alt, () => neu); };

// ---------- index.html ----------
let h = readFileSync(new URL('index.html', RLB), 'utf8');
h = ersetze(h, '<link rel="manifest" href="manifest.json">\n', '');
h = ersetze(h, '<link rel="apple-touch-icon" href="icon-180.png">', '<link rel="apple-touch-icon" href="../../../../ReiseLogBuch/icon-180.png">');
h = ersetze(h, '<title>Reiselogbuch</title>', '<title>APD-127 Muster</title>');
h = ersetze(h, 'href="../AppDesign/fassung/4.56.0/design.css">', `href="../../../fassung/4.56.0/design.css">
<style>/* APD-127 R-1.12 (0101): iPad-Fenster mit der Tastatur – hoch Feder aus Notizen (0,5 s), runter ease-in-out 0,25 s */
.muster-a dialog.gleitet { transition: top .5s ${FEDER}; }
.muster-a dialog.gleitet.runter { transition: top .25s ${ZU_KURVE}; }
@media (prefers-reduced-motion: reduce) { .muster-a dialog.gleitet { transition: none; } }</style>`);
h = ersetze(h, '<script src="../AppDesign/fassung/4.56.0/ui.js"></script>', `<script>
// APD-127 Muster: Variante aus der Adresse (?v=a bzw. ohne Angabe neu nach R-1.12, ?v=b heute)
const MUSTER_V = /[?&]v=b/.test(location.search) ? 'b' : 'a';
document.documentElement.classList.add('muster-' + MUSTER_V);
</script>
<script src="ui.js"></script>`);
h = ersetze(h, "const STORAGE_KEY = 'reiselogbuch.v1';", "const STORAGE_KEY = 'reiselogbuch.muster-apd127';   // APD-127 Muster: eigener Speicher");
h = ersetze(h, "const OLD_STORAGE_KEY = 'reisetagebuch.v1';", "const OLD_STORAGE_KEY = 'reiselogbuch.muster-apd127';");
h = ersetze(h, 'let db = load();', `let db = load();
if (!db.trips.length) {
  const days = {}, verlauf = ['Frühstück im Hotel', 'Spaziergang zum Hafen', 'Fähre nach Manly', 'Mittagessen am Strand', 'Rückfahrt mit der Fähre'];
  for (let i = 0; i < 30; i++) days[new Date(Date.UTC(2026, 7, 10 + i)).toISOString().slice(0, 10)] = { weather: '☀️', program: verlauf.slice(0, 2 + i % 4).join('\\n'),
    comment: i % 2 ? '😊 schöner Tag' : '', quarter: 'Oaks Hotel ' + (1 + (i >> 2)), place: 'Sydney, Australien' };
  db.trips.push({ id: 'muster', title: 'Muster', participants: 'Anna, Ben', start: '2026-08-10', end: '2026-09-08', transport: ['flug'], days, foodColumn: true });
  for (let j = 1; j <= 6; j++) db.trips.push({ id: 'muster' + j, title: 'Reise ' + j, participants: 'Anna', start: \`202\${j % 6}-0\${1 + j}-01\`, end: \`202\${j % 6}-0\${1 + j}-05\`, transport: ['auto'], days: {} });
  db.settings.lastTrip = 'muster'; db.settings.lastBackup = Date.now();
}
// Titel folgt der Variante der Adresse
for (const t of db.trips) if (t.id === 'muster') t.title = MUSTER_V === 'a' ? 'Muster A – neu (R-1.12)' : 'Muster B – heute (4.56.0)';`);
h = ersetze(h, "if ('serviceWorker' in navigator && location.protocol === 'https:') {", "if (false) {   // APD-127 Muster: kein Service Worker");
writeFileSync(new URL('index.html', ZIEL), h);

// ---------- ui.js ----------
let u = readFileSync(new URL('fassung/4.56.0/ui.js', AD), 'utf8');
u = `// ---------- APD-127 Muster (Sitzung 0100, Werte 0101): R-1.12 nur mit ?v=a bzw. ohne Angabe, ?v=b = 4.56.0 ----------
const R112 = !/[?&]v=b/.test(location.search), FEDER = '${FEDER}', ZU_KURVE = '${ZU_KURVE}', AUF_MS = 500, ZU_MS = 250;
// Feder aus Notizen (Antwortzeit 0,35 s, ohne Nachschwingen) für eigenes Rollen Bild für Bild: k = Anteil der 0,5 s
function feder(k) { const w = t => 1 - (1 + 2 * Math.PI / 0.35 * t) * Math.exp(-2 * Math.PI / 0.35 * t); return k >= 1 ? 1 : w(k * 0.5) / w(0.5); }
// Kurve K für eigenes Rollen Bild für Bild (Titel antippen): x(t) nach t auflösen, y(t) zurückgeben
function kurveK(x) { const x1 = .32, y1 = .72, x2 = 0, y2 = 1, b = (t, a1, a2) => 3 * a1 * t * (1 - t) ** 2 + 3 * a2 * t * t * (1 - t) + t ** 3;
  let lo = 0, hi = 1, t = x; for (let i = 0; i < 30; i++) { t = (lo + hi) / 2; if (b(t, x1, x2) < x) lo = t; else hi = t; } return b(t, y1, y2); }
` + u;
// Titel antippen = nach oben: 0,35 s, Kurve K (heute 0,3–0,7 s, kubisch auslaufend)
u = ersetze(u, 'dauer = Math.min(700, 300 + y0 / 20), lauf = titelRollt = { el };', 'dauer = R112 ? AUF_MS : Math.min(700, 300 + y0 / 20), lauf = titelRollt = { el };');
u = ersetze(u, '    el.scrollTop = y0 * Math.pow(1 - k, 3);', '    el.scrollTop = R112 ? y0 * (1 - feder(k)) : y0 * Math.pow(1 - k, 3);');
// Navigation iPhone und Seitenleiste iPad: hinein bzw. ein 0,35 s, zurück bzw. aus 0,25 s, Rest anteilig (≥ 0,15 s), Kurve K
u = ersetze(u, 'const dauer = navRuhig?.matches ? 200 : Math.max(150, NAV_DAUER * Math.abs(nach - von));',
  'const dauer = navRuhig?.matches ? 200 : Math.max(150, (R112 ? (nach > von ? AUF_MS : ZU_MS) : NAV_DAUER) * Math.abs(nach - von));');
u = ersetze(u, "{ duration: dauer, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }", "{ duration: dauer, easing: R112 ? (nach > von ? FEDER : ZU_KURVE) : 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }");
// Blatt nach dem Loslassen: zurück 0,35 s, zu 0,25 s, Rest anteilig (≥ 0,15 s)
u = ersetze(u, '  dauer = dauer || Math.max(220, Math.min(480, Math.abs(nach - von) * 0.9));',
  '  dauer = dauer || (R112 ? Math.max(150, (nach > von ? ZU_MS : AUF_MS) * Math.min(1, Math.abs(nach - von) / Math.max(1, blattZu()))) : Math.max(220, Math.min(480, Math.abs(nach - von) * 0.9)));');
// Blatt schließen mit x: 0,25 s (heute 0,22–0,42 s je nach Weg)
u = ersetze(u, '{ duration: Math.max(220, Math.min(420, (blattZu() - blattY) * 0.5)), easing: BLATT_KURVE',
  '{ duration: R112 ? ZU_MS : Math.max(220, Math.min(420, (blattZu() - blattY) * 0.5)), easing: R112 ? ZU_KURVE : BLATT_KURVE');
// Blatt öffnen: blattFahre(0) – 0,35 s über die Regel oben (heute 0,22–0,48 s je nach Weg)
// Blatt schließen: die Seite dahinter kommt zurück (blattWeg) in 0,25 s (heute 0,38 s)
u = ersetze(u, "navRuhig?.matches ? 200 : 380, navRuhig?.matches ? 'ease-out' : BLATT_KURVE", "navRuhig?.matches ? 200 : R112 ? ZU_MS : 380, navRuhig?.matches ? 'ease-out' : R112 ? ZU_KURVE : BLATT_KURVE");
// Blatt nach dem Loslassen bzw. öffnen: hinunter (zu) ease-in-out, hinauf (auf, zurück) Feder
u = ersetze(u, '...blattSeiteTeile(a, b)], dauer, BLATT_KURVE,', '...blattSeiteTeile(a, b)], dauer, R112 ? (nach > von ? ZU_KURVE : FEDER) : BLATT_KURVE,');
// Blatt nach dem Loslassen zu: 0,25 s anteilig (heute 0,18–0,36 s je nach Weg)
u = ersetze(u, 'Math.max(180, Math.min(360, (zu - blattY) * 0.5)));', 'R112 ? Math.max(150, ZU_MS * Math.min(1, (zu - blattY) / Math.max(1, zu))) : Math.max(180, Math.min(360, (zu - blattY) * 0.5)));');
// iPad-Fenster mit der Tastatur: Richtung merken (runter = Tastatur zu, 0,25 s), gleiten etwas länger als die Dauer
u = ersetze(u, "if (dlg.open && !isPhone()) { dlg.classList.add('gleitet'); clearTimeout(gemeldet.t); gemeldet.t = setTimeout(() => dlg.classList.remove('gleitet'), 300); }",
  "if (dlg.open && !isPhone()) { dlg.classList.add('gleitet'); dlg.classList.toggle('runter', !kbOffen()); clearTimeout(gemeldet.t); gemeldet.t = setTimeout(() => dlg.classList.remove('gleitet'), R112 ? 550 : 300); }");
writeFileSync(new URL('ui.js', ZIEL), u);
console.log('APD-127 Muster gebaut: arbeit/APD-127/app/index.html, arbeit/APD-127/app/ui.js');
