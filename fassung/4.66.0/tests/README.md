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
für `env()` immer 0, deshalb setzt `safe` die Variablen `--safe-…`). Seit 4.35.0 (APD-43) in jeder Ansicht auch Namen, Rollen und Zustände für
VoiceOver (R-1.8: Knöpfe und Felder benannt, Icons `aria-hidden`, Fenster mit Titel und Beschreibung, Menüknopf, Häkchen,
Sprechblase), Sperre und modale Fenster (R-1.4), Fokus-Rahmen nur mit Tastatur, Textfelder nie (R-3.4) und mit ‚Kontrast erhöhen‘
4,5 : 1 für jeden Text und jedes Icon ohne Ausnahmen (R-1.9).

```js
import { createCheck } from '../../AppDesign/tests/hig.mjs';
const hig = createCheck({ skipTargets: [/* bewusste Abweichungen der App als Selektoren */] });
await hig.measure(page, 'Mehr-Menü (hell quer)');
process.exit(hig.report());
```

Seit 4.66.0 (P-115/F-1) meldet `hig.mjs` eine sichtbare Kapsel (`.grp`, `.navgrp`) mit nur einer Icon-Schaltfläche (R-3.1, oval statt rund – eine
einzelne Schaltfläche ist ein runder Knopf `.round`); Gegenprobe `einzelkapsel` in `--gegenprobe masse`.

Seit 4.57.0 prüft `hig.mjs` mit `kopfVerlauf` den Kopfverlauf (`--kopf-verlauf`) der Tabellen-Kopfzeile und der Bezeichnung im Kasten mit Feldern
(Richtung, Anfangsfarbe der Fläche; R-6.2 vergleicht dazu auch `background-image`) und mit `kastenBezeichnung` die Bezeichnung (halbfett, Emoji so groß wie im Wert, R-6.5).

## Prüfskripte melden Fehler `pruefe.mjs`

Gemeinsamer Baustein für jedes Prüfskript einer App: Sollwerte statt ausgegebener Werte, Rückgabewert 1 bei jedem Fehler (auch bei
Skriptfehlern der Seite), Browser nach `PRUEF_BROWSER` (chromium | webkit), gemeinsame Ansichten (`ANSICHTEN`: iPad quer und hoch,
iPhone hoch und quer, je hell oder dunkel) und die **Grundregeln nach jedem Schritt**: `schritt()` führt eine Handlung aus und misst
danach mit `hig.measure(…, { schnell: true })` – dieselben Prüfungen wie `hig.mjs`, ohne Drehen, erst wenn die Seite ruht (`ruhe`:
keine Animation, Fenster und Menüs bewegen sich nicht mehr; kommt die Seite nicht zur Ruhe, meldet `measure` seit 4.59.3 nur ‚Seite nicht zur Ruhe gekommen (zuletzt: …)‘ statt Regelfunden mit Zwischenmaßen – APD-85 Teil 6). `navFertig(p)` wartet, bis ein Seitenwechsel fertig ist (der Zustand der
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
werden; `PRUEF_GEGENPROBE=bedienung:<fall>` schleust einen benannten Fehler der Bedienungshilfen ein (`GEGENPROBEN_BEDIENUNG`, seit
4.35.0).

**Textgröße** (seit 4.37.0, APD-43 Teil 2, R-1.10): `PRUEF_TEXT=<px>` öffnet jede Seite von `t.seite` mit dieser Grundgröße (wie die
Einstellung ‚Textgröße‘, vor dem Laden gesetzt; Ort mit Zusatz ‚· Text 53‘). `hig.checkText(p, wo)` wechselt bei offener Seite auf 53 px
und zurück und prüft Apples Wert je Textstil, Leisten bis XXXL, keine Tabelle bei AX, Bezeichnung über dem Wert, die Ausgabe
unverändert und den letzten Eintrag; jede Messung prüft Stile ohne px und die Grundregel ‚nichts überlappt‘.
`PRUEF_GEGENPROBE=text:<fall>` schleust einen Fehler der Textgröße ein (`GEGENPROBEN_TEXT`, 7 Fälle).

**Bedienungshilfen** (seit 4.35.0, APD-43 Teil 1, R-1.8, R-1.9, R-4.7): `PRUEF_BEDIENUNG=beide` öffnet jede Seite von `t.seite` mit
‚Kontrast erhöhen‘ und ‚Bewegung reduzieren‘ (Ort mit Zusatz ‚· Kontrast · ruhig‘). In jeder Seite läuft der **Bewegungswächter**
(`bewegungsWaechter`): gilt ‚Bewegung reduzieren‘, misst er jede Web-Animation, jeden CSS-Übergang und jede CSS-Animation sowie jedes
sanfte Rollen an der Grenze von R-1.9 (Lage über 30 px, Zoomen, Federn, Dauerschleife, Überblenden über 0,3 s, `smooth`);
`schritt()` meldet die Funde (R-1.9), `t.ruhig(p)` holt sie zwischendurch ab, `t.ende` zum Schluss.

**Rollbereich** (Designrichtlinie 15.22): Die Seite rollt nie, nur der Inhalt (`#app > .rolle`). Prüfungen rollen und messen nur
über `rolle(p, y)` (y in px, `'ende'`, `'50%'`, `{ um: d }`, `{ vorEnde: d }`) und `rollstand(p)` (`{ y, max, rest, h, fenster }`);
in der Seite `const r = eval(ROLL)` (`r.y`, `r.max`, `r.to(y)` …). Nie `window.scrollTo` in einer Prüfung.

**Safari-Modell `safari.mjs`** (Zusammenarbeit 0 Nr. 20, Designrichtlinie 13): das eine Modell für Safari am iPhone – zwei Bereiche
(Layout und sichtbar), Tastatur 403 bzw. 276 px, Meldung beim Rollen 2 Bilder später, bei der Tastatur im selben Augenblick (seit 4.38.0), Rollen bzw. Schieben beim neuen Fokus; Zifferntastatur
quer (170 px sichtbar); ein Feld im Rollbereich unter der Tastatur antippen verschiebt den sichtbaren Bereich um den ganzen Raum
(quer 232 px). `await safariModell(p, 'iPhone hoch')`, dann `__safari.tastatur(true)`, `__safari.bilder(true/false)`;
`__safari.setze({ h, top })` für das Abspielen.

## Alle Prüfungen einer App `lauf.mjs`

Startet alle Prüfskripte in Chromium und WebKit: nach dem Vorlauf (`doku-regeln`, `version-regeln`, seit 4.64.0 `schnittstelle-regeln` – ohne Browser, einmal; rot bricht sofort ab) parallel, die
längsten zuerst (gemessene Dauer in `tests/out/dauer.json` der App); ab dem dritten roten Lauf werden die übrigen beendet, jeder rote
Lauf läuft am Ende einmal allein (Zusammenarbeit 0 Nr. 2), die Fehlerzeilen der roten Läufe werden gezeigt; die Ausgabe eines Wacklers
bleibt in `tests/out/wackelt-<Name>-<Browser>.txt`. Aufruf über `tests/alle.mjs` der App:
`node tests/alle.mjs [--alle] [--browser chromium] [--nur hig] [--abdeckung] [--gegenprobe [grundregeln | bedienung | text | pruefseite]] [--jobs N] [--zeit S]`.
`--gegenprobe bedienung` (seit 4.35.0) läuft die Prüfung der Bedienungshilfen der App (`ablauf-bedienung`) je eingeschleustem Fehler
einmal; rot zählt nur mit genau der passenden Meldung – beim Bau von APD-43/1 und wenn sich eine dieser Prüfungen ändert, nicht in jedem
`los`.
`--gegenprobe text` (seit 4.37.0) ebenso mit der Prüfung der Textgröße der App (`text-regeln`).
`--gegenprobe pruefseite` (seit 4.64.0) läuft jeden Teil der Prüfseite (`bausteine-pruefseite`) je eingeschleustem Fehler seiner Bausteine einmal
(`GEGENPROBEN_PRUEFSEITE`, Teil `werte` 8 Fehler, `menue` 2, die übrigen 7 Abläufe je 1); rot zählt nur mit der Meldung dieses Bausteins, ein Teil ohne Fehler bricht ab.
Gleichzeitig laufen standardmäßig so viele Browser, wie der Rechner Kerne hat (mit doppelt so vielen schwankte WebKit unter
Volllast); erst alle Prüfungen in Chromium, dann alle in WebKit – nie beide gleichzeitig. Fehlt WebKit, bricht der Lauf mit Hinweis
ab (Rückgabewert 2) – nie stillschweigend nur Chromium. Lange Prüfungen lassen sich teilen (`teile`, z. B. hig nach Darstellung).
Selbsttest mit Schein-Tests: `node tests/lauf-selbsttest.mjs` (Zusammenarbeit 0 Nr. 2); `los` startet ihn, wenn sich `lauf.mjs` seit `main` geändert hat (0 Nr. 9).

## Prüfseite `pruefseite.mjs`

Seit 4.64.0 (APD-135 Paket 6 Schritt 2, APD-135/B-3.1; Designrichtlinie 14 ‚Prüfen‘): Bausteine, die ohne den Inhalt einer App gleich laufen, prüft AppDesign auf der
**Prüfseite** – der Vorlage (`vorlage/index.html`) derselben Fassung mit neutralen Daten (Einträge `items` mit Unterpunkten `sub`, localStorage `neueapp.v1`) –,
ihre Werte auf der daraus abgeleiteten **Mindestseite**. Die Vorlage liegt dazu in der festen Fassung (`fassung/X.Y.Z/vorlage/index.html`). Was nur im
Zusammenspiel mit der App sichtbar wird, prüft die App selbst.

- `oeffneVorlage(p, { daten, fehler })` – öffnet die Vorlage unter `http://pruefseite.test/`; `ui.js` und `design.css` kommen über `p.route` aus der Fassung, in
  der `pruefseite.mjs` liegt (Arbeitsstand: `v4/`), so passen die Pfade überall; `daten` werden nur beim ersten Laden gesetzt (`datenNeutral(n)`, `DATEN_LEER`).
- `oeffneMindestseite(p, { fehler })` – aus dem Text der Vorlage: `<head>`, `#dlg`, `#msg`, `ui.js`; das Skript der App durch die Platzhalter `db`, `save()`,
  `render()` und `const sync = createSync({ list: 'items', sub: 'sub', subAt: 'subAt' })` ersetzt. Fehlt der Vorlage `#dlg` oder `#msg`, ist das ein Fehler.
- `checkWerte(p)` – Gruppe A mit festen Beispielwerten, Meldung ‚R-x.y <Baustein>: …‘: Version (`AD_VERSION` = `--ad-version` = Fassung = `AD_NEEDED` der
  Vorlage, R-10.3), Icons (R-1.8; seit 4.66.0 unbekannter Name ohne `svg` mit Konsolenfehler, jeder Name in `ic('…')` in `ui.js`, Vorlage und App steht
  in `ICONS` – APD-136/V-4, V-5), Leerer Zustand (R-7.7), Hilfen (`esc` R-10.1, `breakable` R-6.3, `iconText`/`aufzaehlung` R-10.5, Beträge R-5.1), Suche
  (`checkSearchWords`, `markWords`, R-2.3), Teilen (`outputCss` R-6.2, `shareResultText` R-10.8), Backup (Dateiname R-10.7, `backupFileOf` → `readBackup`,
  `backupTileHtml`, R-9.1), Abgleich (`checkSync`, R-9.2 bis R-9.4; seit 4.66.0 die Mindestseite ohne `subAt`, APD-136/V-3).
- `pruefseite(pw, { out, teil })` – ein Teil mit Ergebnis und Rückgabewert (`pruefe.mjs`); Teil `werte`: `checkWerte` auf der Mindestseite, dann die Vorlage
  in iPad quer und hoch, iPhone hoch und quer, hell und dunkel, leer und mit 60 Unterpunkten mit den Grundregeln nach jedem Schritt (Menü, Fenster,
  Sprechblase im iPad quer und iPhone hoch).
- Seit 4.64.0 (APD-135/B-3.2, APD-135/E-7 bis E-11) die 5 Abläufe als Teile – dieselben Fälle wie bis Reiselogbuch 3.57.6 in dessen Prüfdateien, auf der
  Vorlage mit neutralen Daten (`datenEintraege`): `messung` (`ablaufMessung`, APD-27/F-1 bis F-12, `checkMessung`; iPad quer, iPhone hoch dunkel, iPhone
  quer, je voll und leer), `titel-blase` (`ablaufTitelBlase`, APD-101/L-1 bis L-12, `checkTitelBlase`; Text 53 iPhone hoch, L-5 in 4 Ansichten),
  `titel-oben` (`ablaufTitelOben`, APD-62/H-1 bis H-9, APD-109/C-1 bis C-9, APD-108/W-1 bis W-7, APD-127/B-5; 6 Durchläufe, 2 mit ‚Bewegung reduzieren‘),
  `schicht-oben` (`ablaufSchichtOben`, APD-118/X-1 bis X-8 mit den 3 Messdateien aus `tests/messungen/`, APD-121/Y-5), `grossanzeige`
  (`ablaufGrossanzeige`, APD-104/L-1 bis L-9, APD-62/M-9; Text 28, 53 und 17). Die Fenstertitel der Vorlage passen bei Text 53 ganz hinein – für
  APD-101/L-1, APD-101/L-3 und APD-101/L-4 verlängert der Ablauf den Titel des offenen Fensters, für das Rollen (APD-101/L-9, APD-62/H-3) den Inhalt (nur in
  der Prüfung). Was nur die App
  hat (Datum im Fenstertitel, Reisetitel, Daten der App, Fenster beim Start ohne Daten) und das Zusammenspiel mit ihren Knöpfen prüft die App selbst
  (Reiselogbuch: `ablauf-bausteine`).
- Seit 4.65.0 (APD-135/B-3.3 Schritt 1, APD-135/Q-1 bis Q-9) Menü, Sprechblase und Fenster als Teile, auf der Vorlage mit neutralen Daten in allen 4 Ansichten, Grundregeln nach jedem Schritt: `menue` (`ablaufMenue`: Mehr der Kopfzeile und der Liste, Untermenü ‚Darstellung‘, Kontextmenü – `checkMehrKnopf`, `checkWachsen` mit Drehen am iPad, ‚Bewegung reduzieren‘ und nach der Großanzeige bei Text 28, `checkFokus`), `sprechblase` (`ablaufSprechblase`: ‚Eintrag löschen‘ aus Mehr und aus dem Kontextmenü – `checkWachsen`, offen der Rest gesperrt, Fokus auf der Blase, daneben tippen ändert nichts, Esc = Abbrechen mit Fokus zurück; mit ‚Bewegung reduzieren‘ nur Überblenden und `checkRuhig`), `fenster` (`ablaufFenster`: ‚Eintrag bearbeiten‘ – `checkDialogHead`, `checkFokus`, `checkFokusZurueck`). Bis Reiselogbuch 3.57.7 prüfte `ablauf-markierung-menues` Mehr-Knopf und Wachsen mit.
- Die App startet sie über eine Hülle – Playwright und der Ausgabeordner kommen von ihr, nie wird in die Fassung geschrieben:

```js
import * as pw from 'playwright';
import { pruefseite } from '../../AppDesign/fassung/X.Y.Z/tests/pruefseite.mjs';
await pruefseite(pw, { out: new URL('out/', import.meta.url), teil: process.env.PRUEF_TEIL || 'werte' });
```

**Gegenprobe:** `PRUEF_GEGENPROBE=pruefseite:<fall>` schleust den Fehler eines Bausteins per Textersetzung in `ui.js` ein (`GEGENPROBEN_PRUEFSEITE`; eine Stelle,
die nicht genau einmal vorkommt, wird gemeldet); `node tests/alle.mjs --gegenprobe pruefseite` läuft alle Fehler jedes Teils. Je Ablauf ein Fehler, der den
alten Fehler nachbildet (seit 4.64.0, APD-135/E-12): `messung` – die Messdatei zeichnet den eingegebenen Text auf statt seiner Länge; `titel-blase` – keine
Sprechblase am gekürzten Titel; `titel-oben` – Hörer von ‚Titel antippen‘ am `window` statt am `document`; `schicht-oben` – die Sperrschicht schließt nicht
beim Loslassen; `grossanzeige` – Loslassen über einem Knopf löst ihn nicht aus.

## Weitere allgemeine Prüfungen

| Datei | Regeln | Prüft |
|---|---|---|
| `ablauf.mjs` | R-1.6, R-1.8, R-1.9, R-2.3, R-3.2, R-3.4, R-3.5, R-4.4, R-4.5, R-4.6, R-4.7, R-5.2, R-5.3, R-5.4, R-5.5, R-5.6, R-5.11, R-6.4, R-7.3, R-7.4, R-7.5, R-8.1, R-7.8 | Abläufe mit Handlung: Suche im Mehr-Menü (seit 4.43.0, APD-91: `sucheAuf` öffnet über das Menü, `checkSearchPlace` ‚Suchen‘ zuerst ohne Lupe in der Kapsel, `checkSucheBeenden` x ‚Suche beenden‘, `checkCmdF` ⌘F); Bedienungshilfen (seit 4.35.0: `checkFokus` – Fokus in Menü, Untermenü, Sprechblase und Fenster und zurück, Esc und ⌘., Pfeile mit Umlauf, Pos1/Ende, Eingabe nie rot, Tab bleibt im Fenster, Tab-Reihenfolge der Seite, Fokusring nur mit Tastatur, Textfelder nie; `checkKontrast` – zweite Farbtabelle hell und dunkel, Ausgabe unverändert, Umschalten ohne Neuaufbau; `checkRuhig` – ‚Nach oben / Ans Ende‘ springen, Mikrofon ruhig, Blatt ohne Verkleinern; `ansage(p)` – Text im Ansage-Bereich), Messmodus (`checkMessung`), Suche (`checkSearch`, `checkSearchWords` mit und ohne Akzente, `checkSearchPlace`, Suche öffnen und ⓧ nach oben `checkSearchTop`), Suche in der Liste (`checkListSearch`), Nach oben / Ans Ende im Rollbereich und über der Tastatur, die Kapsel schneidet keine Leiste, nur wirksame Pfeile je Rollstand, Fenster und Drucken (`checkFab` mit `sichtbar`, `suche`, `fenster`), Schnellroll-Griff (`checkGriff`, aus `checkFab`), Navigation und Gesten (`checkNavigation`: Seitenwechsel, Zurückwischen, Seitenleiste am iPad hoch und quer, Vorrang, Drehen, ‚Bewegung reduzieren‘ – mit der Maus und mit Berührung nach Safari nachgebildet), Fenster-Kopfzeile (`checkDialogHead`), Blatt auf dem iPhone (`checkSheet`: Form, Ziehen, schnelles Wischen, gerollter Inhalt, mit Änderungen Rückfrage auch auf einem Feld, Abdunkelung, Escape, Drehen, iPad unverändert), Feld über der Tastatur (`checkFieldVisible`, mit Safari-Modell) und ohne Springen (`checkTastaturStill`), Großbuchstaben auch nach einer Korrektur von Hand (`checkCapital`), keine doppelten Leerzeichen (`checkSpaces`), Fehlermeldungen (`checkFieldErrors`), Eingabetaste (`checkEnterDone`), ⓧ in ein- und mehrzeiligen Feldern, seit 4.57.0 sofort leer mit Rückgängig im Feld und Zwischenablage (`checkClear`, APD-124/B-1 bis B-10), Cursor am Ende (`checkCursorEnde`, R-5.11) und Textfelder leer einzeilig, wachsen und schrumpfen (`checkFeldCursor`, APD-126/B-1 bis B-12), Vorschau (`checkPreview`), Drucken der ganzen Ausgabe (`checkPrint`), Liste steht still (`checkListStill`), Position beim Öffnen (`checkOpenAt`, aktueller Eintrag ohne Hervorhebung mit `markiert: null`), Seitenleiste ein/aus (`checkSideToggle`), langes Drücken – Ziehen und Rollen brechen ab, Finger und Maus (`checkLangDruecken`), Auswahl-Kapsel mit Pfeilen am Anfang, in der Mitte und am Ende, Antippen unter dem Pfeil, Drehen und schmaler (`checkKapsel`) · Seit 4.57.0: `checkGleiten` (R-1.12, APD-127: Dauer und Kurve jeder Gleitbewegung, Mehr-Menü, ‚Bewegung reduzieren‘, Endlage; Gegenprobe `gleitenGegenprobe`), `checkAufzaehlung` (Aufzählung bricht um), `checkDateiname` (Dateiname im Hinweisfenster: Backup, Ausgabe, Abgleichbericht bei Textgröße l, xxxl, ax3) und `textGroesseSetzen` (Textgröße für eine Prüfung setzen). Seit 4.59.3 (APD-85 Teil 6): `langDruecken(p, ziel, { ms, offen, mitte, max })` – langes Drücken mit Warten auf die Endlage (kein `.hebt`, keine Bewegung, 350 ms und zwei Bildwechsel nach dem Loslassen, das Erwartete zweimal an derselben Stelle) statt einer festen Pause, Rückgabe null oder die Meldung mit Maßen; `menueZu(p)` wartet, bis Menü und Abbild weg sind; seit 4.60.0 (APD-30, APD-136) `checkWischen` – Wischaktionen der Kacheln (AD-Bean `swipeactions`, APD-30/W-1 bis APD-30/W-79; Tipp daneben in der Liste schließt nur, Knöpfe außerhalb wirken sofort – W-5, W-43, mit `seitenleiste` W-42 panel-left am iPad) samt eingegrauter, sperrender Sprechblase (R-1.4), Gegenprobe APD-30/W-68 mit `wischenGegenprobe` (`PRUEF_GEGENPROBE=wischen:W-68`) |
| `abspielen.mjs` | Werkzeug (für R-2.1, R-4.5) | Messdatei des Messmodus nachspielen: `lies(text)`, `ansicht(m)`, `spieleAb(p, m, { ziele, woerter, bis, nachSchritt, verschiebe })` – Tippen, Eingaben, Tastatur schließen; Safari meldet Höhe und `offsetTop` wie gemessen (`__safari.setze`); je Schritt Kopf- und Suchzeile ± 1 px und Fokus wie gemessen; das Beenden der Messung im Mehr-Menü (bzw. ab ‚! messung beendet‘) spielt es nicht nach, ‚klick unterdrückt … (Feld x)‘ zählt wie ‚tippen x‘ (seit 4.38.0, RLB-103; `schritte(m)` für Selbstprüfungen). Messdateien in `tests/messungen/` (Designrichtlinie 15.21) |
| `abgleich.mjs` | R-9.2 bis R-9.4 | alle Fälle des Abgleichs in beide Richtungen, kurzes Fenster und Abgleichbericht |
| `backup.mjs` | R-9.1, R-9.2 | Backup erstellen und laden (Menü, Abfrage mit Kacheln, Abbrechen, unlesbare Datei); seit 4.34.0: Backup-Kachel nach dem Backup weg, ‚Letztes Backup …‘ mit heutigem Datum im Menü, Kachel nur ohne Backup heute und mit Einträgen, Offline-Zeile immer im Fuß |
| `kontextmenue.mjs` | R-4.2 | Kontextmenü jeder sichtbaren Kachel und des letzten Eintrags, ganz sichtbar, über der Backup-Kachel (ohne Kachel über der Offline-Zeile bzw. dem Rand) |
| `doku.mjs` | R-10.4, R-10.1 (Feldnamen), R-1.7 (`env()` nur in `--safe-…`), Katalog; Zusammenarbeit 0 Nr. 3, 7, 8, 9, 11 und 15, 2.3, R-1.13 | `checkDocs`: README mit ‚Verwendete Versionen‘ (Links nach AppDesign auf `main`, Richtlinie, Zusammenarbeit und Bausteine aus `fassung/X.Y.Z/`; Richtlinien-Versionen aus der Fassung), Testfälle der neuesten Version beginnen mit /0, Schritte und ‚Erwartet‘ (Meldungen nennen die Testfälle noch ‚Zusammenarbeit 7‘ – heute 2.3); `checkCatalog`: jede Regel hat eine Prüfung, alte Nummern zugeordnet und nirgends mehr verwendet; `checkCollab`: keine veralteten Formulierungen (auch kein ‚gilt sofort für alle Apps‘, kein `?v=<Version>`), Verweise auf die Zusammenarbeit gültig, beide `CLAUDE.md` beginnen mit `UEBERGABE.md` und haben Version und Versionsgeschichte, PROMPT-Versionszeile, Feldnamen des Abgleichberichts; `checkKasten` (seit 4.39.0, APD-84/C-1 bis C-5): Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in 0 mit allen Pflichten, beide `CLAUDE.md` und 0 Nr. 15 lassen die ganze Zusammenarbeit lesen, jede Pflicht nennt ihre Prüfung (Gegenprobe `--gegenprobe schema`); seit 4.60.0 (APD-136) `checkBeans`: Liste der AD-Beans (Designrichtlinie 15) ↔ `ui.js` und `design.css`, Kennung einmal, CSS nur unter `.ad-<kennung>…`, keine Klassen und inneren Namen einer Bean in der App (APD-30/W-72, APD-30/W-73; Gegenprobe APD-30/W-80 `PRUEF_GEGENPROBE=beans:W-80`) · seit 4.65.0 (APD-140/Z-1, Z-5) `checkKatalog` (aus `checkBeans`): Liste der AD-Beans im Arbeitsstand ↔ `katalog/` – je Bean `katalog/<kennung>.js` (in `index.html` geladen) mit Kennung, Bereich, Fabrik, Schnittstelle und Regeln wie in der Liste, keine Katalogdatei ohne Bean; Gegenprobe `PRUEF_GEGENPROBE=beans:katalog` |
| `katalog.mjs` | R-1.13, R-2.2, R-7.1, R-7.2 | Seit 4.65.0 (APD-140/Z-2 bis Z-4): öffnet `katalog/index.html` im Arbeitsstand (auch aus einer Fassung geladen) in allen 4 Ansichten, jede Bean, ohne Konsolen- oder Skriptfehler, Grundregeln nach jedem Schritt; lädt `v4/`, `AD_VERSION` = `--ad-version` = `v4/ui.js`, Versionszeile im Mehr-Menü; in der App über die Hülle `bean-katalog.mjs` |
| `start.mjs` | R-7.2 | `checkStart(page, { inhalt, leer })` nach dem Neuladen: iPhone-Aufbau in der Startliste (`#side.page`), ganz oben, kein Eintrag blau, kein Inhalt offen; iPad-Aufbau mit Seitenleiste und genau einem blauen, geöffneten Eintrag. `checkRueckkehr(page)`: `visibilitychange` und `pageshow` (aus dem Zwischenspeicher) ändern nichts |
| `offline.mjs` | R-1.5 | eigener Webserver mit echtem Service Worker; ohne Netz, unter anderer Adresse und bei hängendem Netz (höchstens 3 s) erscheint die App – iPad und iPhone, Chromium und WebKit; der Offline-Hinweis (APD-6/F-1 bis F-17): Meldung und Zeile beim Start ohne Netz, bei hängendem Netz und beim Wechsel (Safari meldet offline/online); Lage, Kontrast, 4 s, ‚Wieder online‘, schnelles Hin und Her, Drehen, offenes Fenster, Tastatur, lange Liste, Startliste (iPhone); Option `vorbereiten(page)` für Daten der App |
| `pruefseite.mjs` | R-10.3, R-1.8, R-7.7, R-10.1, R-6.3, R-10.5, R-5.1, R-2.3, R-6.2, R-10.8, R-10.7, R-9.1 bis R-9.4; Abläufe R-1.6, R-2.5, R-2.6, R-2.7, R-1.12, R-4.13, R-4.1, R-4.4, R-4.7, R-3.4, R-1.4, R-1.8, R-1.9, Designrichtlinie 13 | Bausteine auf der Prüfseite (oben) |
| `version.mjs` | R-10.3 | feste Fassung: `index.html` und `sw.js` laden genau `fassung/<AD_NEEDED>/` (nichts aus `v4/`), Versionen der Fassung stimmen, Prüfsummen `fassung/PRUEFSUMMEN` (keine Datei geändert, fehlt oder dazu), `v4/` und `tests/` = neueste Fassung; Hinweis beim Start bei älterer Fassung; ein geänderter Arbeitsstand `v4/` erreicht die App nicht (kein Abruf) |
| `schnittstelle.mjs` | R-1.14 | Schnittstelle von `ui.js` ohne Browser (`checkSchnittstelle`, Zerleger `schnittstelle-zerleger.mjs`): die App und seit 4.64.0 die Vorlage nutzen nur den Teil `app` von `schnittstelle.json` (Gegenprobe: Kopie der Vorlage mit `setAppearance`), Prüfdateien dazu `pruefungen`; keine Deklaration der App mit dem Namen eines Bausteins; jeder Name der Liste steht in `ui.js` |
| `messung.mjs` | Zusammenarbeit 2.2 | Werkzeug `werkzeug/messung.mjs` (Zeile Zeit und Token) mit künstlichen Sitzungsdaten; Gegenprobe `--gegenprobe` |
| `regelwaechter.mjs` | Zusammenarbeit 0 (Kasten ‚Jede Antwort‘), 0 Nr. 26–28, 2.1, 2.2, 2.8 | Werkzeug `werkzeug/regelwaechter.mjs` (Hooks: Uhrzeitzeile liefern, Fenster vor dem Zeigen, Antwort am Ende prüfen; Setup-Text) mit künstlichen Sitzungsdaten und echten Antworten aus 0050 und 0051 (`regelwaechter-faelle.json`), APD-84/W-1 bis W-13; Gegenprobe `--gegenprobe` (je Prüfung des Wächters abgeschaltet). Läuft mit `messung.mjs` in `veroeffentlichen.mjs los` |
| `lauf-selbsttest.mjs` | Zusammenarbeit 0 Nr. 2 | `lauf.mjs` mit Schein-Tests (Vorlauf, Reihenfolge, Abbruch, Gegenprobe, Ausgabe der Wackler, Abdeckung je Teil) |
| `safari.mjs`, `pruefe.mjs` | Werkzeug | Safari-Modell und Baustein der Prüfskripte (oben) |

## Feste Fassung

Die Prüfskripte einer App binden die Prüfungen **ihrer** Fassung ein: `import … from '../../AppDesign/fassung/X.Y.Z/tests/pruefe.mjs'`
(das Veröffentlichungs-Skript setzt die Pfade mit `vorbereiten`). Nach Änderungen an `v4/` oder `tests/` vor dem Veröffentlichen
`node werkzeug/veroeffentlichen.mjs fassung` – sonst meldet `version.mjs` die Abweichung. Ist eine Fassung mit `los` veröffentlicht
(liegt auf `origin/main`), ist sie unveränderlich. Sie enthält auch den Text von Designrichtlinie und Zusammenarbeit; `doku.mjs` liest
die Richtlinien-Versionen daraus (keine Git-Markierung – aus der Cloud gesperrt). Diese Texte vergleicht `version.mjs` nicht mit dem
Arbeitsstand (sie ändern sich auch zwischen Versionen).

**Erst rot, dann grün:** Jede neue Prüfung wird einmal mit einem eingebauten Fehler laufen gelassen und muss ihn melden.
