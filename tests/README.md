# Prüfungen des Regelkatalogs

Die Dateien in `tests/` prüfen alle Regeln des Regelkatalogs (Designrichtlinie allgemein, Abschnitt 17, R-1.1 …) – **je Regel
genau eine Prüfung**; jede Meldung beginnt mit ihrer Regelnummer. Jede App bindet sie in eigene Prüfskripte ein (Beispiele in
`ReiseLogBuch/tests/`), und zwar aus **ihrer** festen Fassung (siehe unten); AppDesign liegt dazu neben dem App-Repo, Playwright
wird im Ordner `tests/` der App installiert (Einrichten: AppDesign-`CLAUDE.md`).

## HIG- und Regel-Prüfung `hig.mjs`

Misst jede Ansicht gegen die HIG-Checkliste (Abschnitt 16) und alle Regeln mit ‚hig.mjs‘ im Katalog: Antippflächen (R-3.1),
Schrift und Kontrast hell und dunkel (R-10.2), Anführungszeichen (R-10.1), Menüs (R-4.1), gedrückte Schaltfläche bleibt blau
(R-3.3), Schalter (R-5.7) usw.; dazu automatisch beim Drehen (R-8.1), Leisten beim Wischen (`barStill`, R-2.1), der Gerätevergleich
iPad ↔ iPhone (`shape`, R-1.1) und in jeder Ansicht die sicheren Ränder mit Gerätewerten (`safe`, R-1.7 – die Prüfbrowser liefern
für `env()` immer 0, deshalb setzt `safe` die Variablen `--safe-…`).

```js
import { createCheck } from '../../AppDesign/tests/hig.mjs';
const hig = createCheck({ skipTargets: [/* bewusste Abweichungen der App als Selektoren */] });
await hig.measure(page, 'Mehr-Menü (hell quer)');
process.exit(hig.report());
```

## Prüfskripte melden Fehler `pruefe.mjs`

Gemeinsamer Baustein für jedes Prüfskript einer App: Sollwerte statt ausgegebener Werte, Rückgabewert 1 bei jedem Fehler (auch bei
Skriptfehlern der Seite), Browser nach `PRUEF_BROWSER` (chromium | webkit), gemeinsame Ansichten (`ANSICHTEN`: iPad quer und hoch,
iPhone hoch und quer, je hell oder dunkel) und die **Grundregeln nach jedem Schritt**: `schritt()` führt eine Handlung aus und misst
danach mit `hig.measure(…, { schnell: true })` – dieselben Prüfungen wie `hig.mjs`, ohne Drehen, erst wenn die Seite ruht (`ruhe`:
keine Animation, Fenster und Menüs bewegen sich nicht mehr). `navFertig(p)` wartet, bis ein Seitenwechsel fertig ist (der Zustand der
App ändert sich erst am Ende der Bewegung).

```js
import * as pw from 'playwright';
import { pruefung } from '../../AppDesign/tests/pruefe.mjs';
import { createCheck } from '../../AppDesign/tests/hig.mjs';
const t = pruefung('ablauf-fenster', pw, { hig: createCheck(), out: new URL('out/', import.meta.url) });
const b = await t.browser(); const p = await t.seite(b, 'iPad quer', { theme: 'dark' });
await t.schritt(p, 'Mehr-Menü', () => p.click('#mainMore'));
t.ist('Mehr-Menü', await p.locator('.menu .mi').allTextContents(), ['Alle Tage', /Darstellung/], 'R-4.1');   // Wert, RegExp, Funktion, Liste
t.liste(await checkSync(p));                                                                                 // Meldungen allgemeiner Prüfungen
await t.ende(b);
```

Meldung: `✗ R-4.1 webkit · iPad quer dunkel · Mehr-Menü: … – ist …, soll …`. Safari nachgebildet: kein Fokus beim Antippen einer
Schaltfläche (Chromium und das Linux-WebKit setzen ihn). **Gegenprobe:** `PRUEF_GEGENPROBE=1` macht den ersten Vergleich absichtlich
falsch, `PRUEF_GEGENPROBE=grundregeln` legt beim ersten Schritt zu breiten Text in den Vordergrund (R-6.3) – der Test muss rot
werden.

**Rollbereich** (Designrichtlinie 15.22): Die Seite rollt nie, nur der Inhalt (`#app > .rolle`). Prüfungen rollen und messen nur
über `rolle(p, y)` (y in px, `'ende'`, `'50%'`, `{ um: d }`, `{ vorEnde: d }`) und `rollstand(p)` (`{ y, max, rest, h, fenster }`);
in der Seite `const r = eval(ROLL)` (`r.y`, `r.max`, `r.to(y)` …). Nie `window.scrollTo` in einer Prüfung.

**Safari-Modell `safari.mjs`** (Zusammenarbeit 0 Nr. 20, Designrichtlinie 13): das eine Modell für Safari am iPhone – zwei Bereiche
(Layout und sichtbar), Tastatur 403 bzw. 276 px, Meldung 2 Bilder später, Rollen bzw. Schieben beim neuen Fokus; Zifferntastatur
quer (170 px sichtbar); ein Feld im Rollbereich unter der Tastatur antippen verschiebt den sichtbaren Bereich um den ganzen Raum
(quer 232 px). `await safariModell(p, 'iPhone hoch')`, dann `__safari.tastatur(true)`, `__safari.bilder(true/false)`;
`__safari.setze({ h, top })` für das Abspielen.

## Alle Prüfungen einer App `lauf.mjs`

Startet alle Prüfskripte parallel, die schnellsten zuerst (gemessene Dauer in `tests/out/dauer.json` der App), in Chromium und WebKit;
beim ersten roten Test werden die übrigen beendet und seine Fehlerzeilen gezeigt. Aufruf über `tests/alle.mjs` der App:
`node tests/alle.mjs [--alle] [--browser chromium] [--nur hig] [--abdeckung] [--gegenprobe [grundregeln]] [--jobs N] [--zeit S]`.
Gleichzeitig laufen standardmäßig so viele Browser, wie der Rechner Kerne hat (mit doppelt so vielen schwankte WebKit unter
Volllast); erst alle Prüfungen in Chromium, dann alle in WebKit – nie beide gleichzeitig. Fehlt WebKit, bricht der Lauf mit Hinweis
ab (Rückgabewert 2) – nie stillschweigend nur Chromium. Lange Prüfungen lassen sich teilen (`teile`, z. B. hig nach Darstellung).
Selbsttest mit Schein-Tests: `node tests/lauf-selbsttest.mjs` (Zusammenarbeit 0 Nr. 2).

## Weitere allgemeine Prüfungen

| Datei | Regeln | Prüft |
|---|---|---|
| `ablauf.mjs` | R-1.6, R-2.3, R-3.2, R-4.4, R-4.5, R-4.6, R-5.2, R-5.3, R-5.5, R-5.6, R-6.4, R-7.3, R-7.4, R-7.5, R-8.1 | Abläufe mit Handlung: Messmodus (`checkMessung`), Suche (`checkSearch`, `checkSearchWords` mit und ohne Akzente, `checkSearchPlace`, Suche öffnen und ⓧ nach oben `checkSearchTop`), Suche in der Liste (`checkListSearch`), Nach oben / Ans Ende im Rollbereich und über der Tastatur, die Kapsel schneidet keine Leiste, nur wirksame Pfeile je Rollstand, Fenster und Drucken (`checkFab` mit `sichtbar`, `suche`, `fenster`), Schnellroll-Griff (`checkGriff`, aus `checkFab`), Navigation und Gesten (`checkNavigation`: Seitenwechsel, Zurückwischen, Seitenleiste am iPad hoch und quer, Vorrang, Drehen, ‚Bewegung reduzieren‘ – mit der Maus und mit Berührung nach Safari nachgebildet), Fenster-Kopfzeile (`checkDialogHead`), Blatt auf dem iPhone (`checkSheet`: Form, Ziehen, schnelles Wischen, gerollter Inhalt, mit Änderungen Rückfrage auch auf einem Feld, Abdunkelung, Escape, Drehen, iPad unverändert), Feld über der Tastatur (`checkFieldVisible`, mit Safari-Modell) und ohne Springen (`checkTastaturStill`), Großbuchstaben auch nach einer Korrektur von Hand (`checkCapital`), keine doppelten Leerzeichen (`checkSpaces`), Fehlermeldungen (`checkFieldErrors`), Eingabetaste (`checkEnterDone`), ⓧ in einzeiligen Feldern (`checkClear`), Vorschau (`checkPreview`), Drucken der ganzen Ausgabe (`checkPrint`), Liste steht still (`checkListStill`), Position beim Öffnen (`checkOpenAt`, aktueller Eintrag ohne Hervorhebung mit `markiert: null`), Seitenleiste ein/aus (`checkSideToggle`) |
| `abspielen.mjs` | Werkzeug (für R-2.1, R-4.5) | Messdatei des Messmodus nachspielen: `lies(text)`, `ansicht(m)`, `spieleAb(p, m, { ziele, woerter, bis, nachSchritt, verschiebe })` – Tippen, Eingaben, Tastatur schließen; Safari meldet Höhe und `offsetTop` wie gemessen (`__safari.setze`); je Schritt Kopf- und Suchzeile ± 1 px und Fokus wie gemessen. Messdateien in `tests/messungen/` (Designrichtlinie 15.21) |
| `abgleich.mjs` | R-9.2 bis R-9.4 | alle Fälle des Abgleichs in beide Richtungen, kurzes Fenster und Abgleichbericht |
| `backup.mjs` | R-9.1, R-9.2 | Backup erstellen und laden (Menü, Abfrage mit Kacheln, Abbrechen, unlesbare Datei) |
| `kontextmenue.mjs` | R-4.2 | Kontextmenü jeder sichtbaren Kachel und des letzten Eintrags, ganz sichtbar, über der Backup-Kachel |
| `doku.mjs` | R-10.4, R-10.1 (Feldnamen), R-1.7 (`env()` nur in `--safe-…`), Katalog; Zusammenarbeit 0 Nr. 3, 7, 8, 9, 11 und 15, 2.3 | `checkDocs`: README mit ‚Verwendete Versionen‘ (Links nach AppDesign auf `main`, Richtlinie, Zusammenarbeit und Bausteine aus `fassung/X.Y.Z/`; Richtlinien-Versionen aus der Fassung), Prüfliste der neuesten Version beginnt mit /0, Schritte und ‚Erwartet‘ (Meldungen nennen die Prüfliste noch ‚Zusammenarbeit 7‘ – heute 2.3); `checkCatalog`: jede Regel hat eine Prüfung, alte Nummern zugeordnet und nirgends mehr verwendet; `checkCollab`: keine veralteten Formulierungen (auch kein ‚gilt sofort für alle Apps‘, kein `?v=<Version>`), Verweise auf die Zusammenarbeit gültig, beide `CLAUDE.md` beginnen mit `UEBERGABE.md` und haben Version und Versionsgeschichte, PROMPT-Versionszeile, Feldnamen des Abgleichberichts |
| `start.mjs` | R-7.2 | `checkStart(page, { inhalt, leer })` nach dem Neuladen: iPhone-Aufbau in der Startliste (`#side.page`), ganz oben, kein Eintrag blau, kein Inhalt offen; iPad-Aufbau mit Seitenleiste und genau einem blauen, geöffneten Eintrag. `checkRueckkehr(page)`: `visibilitychange` und `pageshow` (aus dem Zwischenspeicher) ändern nichts |
| `offline.mjs` | R-1.5 | eigener Webserver mit echtem Service Worker; ohne Netz, unter anderer Adresse und bei hängendem Netz (höchstens 3 s) erscheint die App – iPad und iPhone, Chromium und WebKit; der Offline-Hinweis (F-1 bis F-17): Meldung und Zeile beim Start ohne Netz, bei hängendem Netz und beim Wechsel (Safari meldet offline/online); Lage, Kontrast, 4 s, ‚Wieder online‘, schnelles Hin und Her, Drehen, offenes Fenster, Tastatur, lange Liste, Startliste (iPhone); Option `vorbereiten(page)` für Daten der App |
| `version.mjs` | R-10.3 | feste Fassung: `index.html` und `sw.js` laden genau `fassung/<AD_NEEDED>/` (nichts aus `v4/`), Versionen der Fassung stimmen, Prüfsummen `fassung/PRUEFSUMMEN` (keine Datei geändert, fehlt oder dazu), `v4/` und `tests/` = neueste Fassung; Hinweis beim Start bei älterer Fassung; ein geänderter Arbeitsstand `v4/` erreicht die App nicht (kein Abruf) |
| `messung.mjs` | Zusammenarbeit 2.2 | Werkzeug `werkzeug/messung.mjs` (Zeile Zeit und Token) mit künstlichen Sitzungsdaten; Gegenprobe `--gegenprobe` |
| `lauf-selbsttest.mjs` | Zusammenarbeit 0 Nr. 2 | `lauf.mjs` mit Schein-Tests (Reihenfolge, Abbruch, Gegenprobe) |
| `safari.mjs`, `pruefe.mjs` | Werkzeug | Safari-Modell und Baustein der Prüfskripte (oben) |

## Feste Fassung

Die Prüfskripte einer App binden die Prüfungen **ihrer** Fassung ein: `import … from '../../AppDesign/fassung/X.Y.Z/tests/pruefe.mjs'`
(das Veröffentlichungs-Skript setzt die Pfade mit `vorbereiten`). Nach Änderungen an `v4/` oder `tests/` vor dem Veröffentlichen
`node werkzeug/veroeffentlichen.mjs fassung` – sonst meldet `version.mjs` die Abweichung. Ist eine Fassung mit `los` veröffentlicht
(liegt auf `origin/main`), ist sie unveränderlich. Sie enthält auch den Text von Designrichtlinie und Zusammenarbeit; `doku.mjs` liest
die Richtlinien-Versionen daraus (keine Git-Markierung – aus der Cloud gesperrt). Diese Texte vergleicht `version.mjs` nicht mit dem
Arbeitsstand (sie ändern sich auch zwischen Versionen).

**Erst rot, dann grün:** Jede neue Prüfung wird einmal mit einem eingebauten Fehler laufen gelassen und muss ihn melden.
