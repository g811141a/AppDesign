# Bericht – APD-135 Paket 6 Schritt 2, Teil B-3.2 (umgesetzt, nicht committet)

**Stand 19.11.2026** · Sitzung 0140 · Hilfsagent (Opus 5.5) · Zweige AppDesign `vorbereitung-4.64.0`, Reiselogbuch `vorbereitung-3.57.7` (nichts committet,
nichts hochgeladen, `veroeffentlichen.mjs` nicht aufgerufen) · `ui.js` und `design.css` unverändert (AD-Bean: keine).

## Wichtig vorab: Fassung noch nicht nachgezogen

Die Hülle der App lädt `fassung/4.64.0/tests/pruefseite.mjs`. `fassung/4.64.0/` ist **noch der Stand von B-3.1**, weil ich `… fassung` nicht aufrufen
durfte (ein Nachbau im Repo wurde von der Rechteprüfung abgelehnt). Folge im echten Repo bis zu deinem `node werkzeug/veroeffentlichen.mjs fassung`:
- `version-regeln` rot, genau mit der erwarteten Meldung: `R-10.3 v4/ bzw. tests/ weicht von fassung/4.64.0 ab: tests/README.md, tests/pruefseite.mjs`;
- die neuen Teile der Hülle (`PRUEF_TEIL=messung` usw.) und `--gegenprobe pruefseite` kennen die neuen Teile erst danach.

Nachweis trotzdem vollständig: ich habe beide Repos in den Notizordner gespiegelt (`…/scratchpad/spiegel/`), dort `fassung/4.64.0` genau wie `legeFassungAn`
nachgezogen (Kopie nach `fassungQuellen`, Prüfsummen; Skript `…/scratchpad/fassung-im-spiegel.mjs`) und **mit der echten Hülle und `alle.mjs`** geprüft.
Die echten Repos sind davon unberührt.

## Änderungen

**AppDesign**
1. `tests/pruefseite.mjs` (242 → 634 Zeilen, +404/−9):
   - je Ablauf eine Funktion: `ablaufMessung`, `ablaufTitelBlase`, `ablaufTitelOben`, `ablaufSchichtOben`, `ablaufGrossanzeige` (dieselben Fälle wie die
     alten Prüfdateien, auf der Vorlage mit neutralen Daten); dazu `datenEintraege(liste, lastItem)` (exportiert) und Hilfen (`vorlageStart`, `zuFenster`,
     `fensterLang`);
   - `pruefseite()` startet die Teile `messung`, `titel-blase`, `titel-oben`, `schicht-oben`, `grossanzeige` (zusätzlich zu `werte`);
   - `GEGENPROBEN_PRUEFSEITE` je Ablauf ein Fall mit eigener Meldung (`zeichen`); `fall()` nimmt ein eigenes `zeichen` an;
   - Messdateien aus `tests/messungen/` (aus der Fassung: `AppDesign/tests/messungen/`, sie liegen nicht in der Fassung – wie bisher in der App).
2. `tests/README.md` (+19/−9 Zeilen): Abschnitt ‚Prüfseite‘ mit den neuen Teilen und Gegenproben, Zeile `pruefseite.mjs` in der Tabelle.
3. Nicht geändert: `lauf.mjs` (die Gegenprobe nimmt die Teile schon aus `alle.mjs`), `lauf-selbsttest.mjs`, Vorlage, `schnittstelle.json`, `ui.js`, `design.css`.

**Reiselogbuch**
4. `git rm` (439 Zeilen): `tests/ablauf-messung.mjs`, `ablauf-titel-blase.mjs`, `ablauf-titel-oben.mjs`, `ablauf-schicht-oben.mjs`, `ablauf-grossanzeige.mjs`.
5. Neu `tests/ablauf-bausteine.mjs` (164 Zeilen, noch nicht im Index): je Baustein eine kurze Zusammenspiel-Prüfung an echten Knöpfen der App und die
   Reiselogik:
   - Messung: APD-27/F-10 (leere App öffnet ‚Neues Reiselogbuch‘), dort starten und teilen; Messung mit Suche ‚Rom‘ – Kopf ‚Reiselogbuch X.Y.Z‘, `! eingabe 3`,
     kein Text der Reisen;
   - Titel-Blase (iPhone hoch, Text 53): Kopfzeile, Fenster ‚Reiselogbuch einstellen‘ mit APD-101/L-8 (Reisetitel unverändert), Fenster eines Tages mit APD-101/L-3
     ‚Do, 27.08.2026‘ (die Blase zeigt das ganze Datum);
   - Titel antippen (iPad quer): APD-62/H-1 und APD-62/H-2;
   - Sperrschicht (iPhone quer): Mehr der Reise und Sprechblase ‚Reiselogbuch löschen‘, nichts gelöscht (`db.trips.length`);
   - Großanzeige (iPad quer, Text 28): **jeder** sichtbare Knopf der Kopfzeile, der Seitenleiste und der Fenster-Kopfzeile zeigt Icon und Namen
     (aria-label) – ein neuer Knopf ohne Namen wird rot; Loslassen über ‚Mehr‘ öffnet das Menü der Reise.
6. `tests/alle.mjs` (+10/−6 Zeilen): die 5 Einträge entfernt, `ablauf-bausteine` eingetragen, `bausteine-pruefseite` mit 6 Teilen (die längsten zuerst:
   grossanzeige, titel-oben, schicht-oben, messung, titel-blase, werte), Kopfkommentar.
7. `tests/bausteine-pruefseite.mjs` (Kommentar, +6/−3), `tests/README.md` (5 Zeilen weg, Zeilen `bausteine-pruefseite` und `ablauf-bausteine` neu),
   Kommentare in `ablauf-abspielen.mjs` und `ablauf-tastatur-still.mjs` (je 3 Zeilen: ‚nachgespielt in ablauf-schicht-oben‘ → ‚bausteine-pruefseite,
   Teil schicht-oben‘ usw.).
8. Weitere Verweise: keine in `lauf.mjs`, `werkzeug/`, `regeln-*.mjs` und den Gegenprobe-Listen. CHANGELOG und BACKLOG beider Repos nennen die Dateien
   nur als Geschichte (nicht geändert).

## Nachweis-Tabelle (Punkte 9 und 10, Chromium)

Eingeschleust über `PRUEF_GEGENPROBE=pruefseite:<fall>` (Prüfseite) bzw. für die alten und die neue App-Prüfung über `node --import
…/scratchpad/fehler-einschleusen.mjs` (liefert über `p.route`/`context.route` statt `ui.js` dieselbe Datei mit derselben Ersetzung aus
`GEGENPROBEN_PRUEFSEITE`; die alten Dateien liefen vor dem `git rm`).

| Ablauf · Fall | eingeschleuster Fehler (Ersetzung in `ui.js`) | Prüfseite (rot) | alte App-Prüfung (rot) | `ablauf-bausteine` (rot) |
|---|---|---|---|---|
| messung · `eingabeText` | `'eingabe ' + (e.target.value?.length ?? 0)` → `'eingabe ' + (e.target.value ?? '')` | 9 Fehler, u. a. ‚R-1.6 Datei enthält den Text ‚Rom‘ (Datenschutz …)‘ | `ablauf-messung`: 9 Fehler, gleiche Meldung | 2 Fehler: ‚… steht nur als Länge da (! eingabe 3)‘, ‚Messdatei enthält den Text ‚Rom‘‘ |
| titel-blase · `keineBlase` | Zeile `zeigeTitelBlase(t);` im Zeitgeber entfernt | 7 Fehler, u. a. ‚R-2.5 L-1 langes Drücken auf den gekürzten Titel ‚Erster Eintrag mit Unterpunkten‘ zeigt keine Sprechblase‘ | `ablauf-titel-blase`: 7 Fehler, ‚… ‚Australien und Neuseeland‘ zeigt keine Sprechblase‘ | 3 Fehler: L-2, L-1, ‚L-3 die Sprechblase zeigt das ganze Datum – ist null‘ |
| titel-oben · `hoererWindow` | `document.addEventListener('click', …titelTipp` → `window.addEventListener(…` | 10 Fehler, u. a. ‚R-2.7 H-1 Titel antippen: der Bereich steht nicht ganz oben (1160 px statt 0)‘ (iPad, iPhone-Startliste; iPhone-Kopfzeile grün wie am Gerät) | `ablauf-titel-oben`: 10 Fehler, gleiche Meldung (1704 px) | 4 Fehler: H-1 und H-2 ‚steht nicht ganz oben‘ |
| schicht-oben · `loslassen` | in `blockingLayer` pointerup: `klickVerschlucken(…); schliessen();` entfernt | 13 Fehler, u. a. ‚13 APD-118/X-1 Tipp bei y 16 ohne Klick über #mainMore schließt das Menü nicht‘ | `ablauf-schicht-oben`: 13 Fehler, gleiche Meldung | 4 Fehler: X-1, X-2 |
| grossanzeige · `ohneAusloesen` | `if (k && !k.disabled) { grossSelbst = true;` → `if (false && k && …` | 42 Fehler, u. a. ‚R-2.6 L-8 Loslassen über Ausgabe löst nicht genau einmal aus (gar nicht)‘ | `ablauf-grossanzeige`: 42 Fehler, gleiche Meldung | 1 Fehler: ‚L-8 Loslassen über ‚Mehr‘ öffnet das Menü der Reise – ist 0, soll 1‘ |

Im Spiegel mit `--gegenprobe pruefseite` zusätzlich in WebKit rot (siehe unten).

## Laufzeiten (aus der Ausgabe von `alle.mjs --nur bausteine-pruefseite,ablauf-bausteine`, Spiegel, 4 gleichzeitig)

| Lauf | Chromium | WebKit |
|---|---|---|
| bausteine-pruefseite (grossanzeige) | 02:34 | 02:38 |
| bausteine-pruefseite (titel-oben) | 01:22 | 01:28 |
| bausteine-pruefseite (schicht-oben) | 01:02 | 01:05 |
| bausteine-pruefseite (titel-blase) | 00:57 | 00:59 |
| bausteine-pruefseite (messung) | 00:46 | 00:48 |
| bausteine-pruefseite (werte) | 00:19 | 00:25 |
| ablauf-bausteine | 01:07 | 01:11 |

Zusammen 9:57 Rechenzeit für die 5 neuen Teile + `ablauf-bausteine` (beide Browser) gegen 14,7 min für die 5 alten Dateien (Messung 0121; nicht unter
gleicher Last gemessen). Die 14 Läufe brauchten 05:12.

## Ergebnisse (wörtlich)

- Spiegel, echte Hülle: `Alle 14 Läufe grün in 05:12` (6 Teile + `ablauf-bausteine`, je Chromium und WebKit, jede Zeile ‚✓‘).
- Echtes Repo einzeln: `ablauf-bausteine (chromium): alles in Ordnung`, `ablauf-bausteine (webkit): alles in Ordnung`; über die Arbeitsstand-Hülle im
  Notizordner alle 5 neuen Teile in beiden Browsern `bausteine-pruefseite (…): alles in Ordnung`.
- Spiegel `node tests/alle.mjs --gegenprobe pruefseite`: `Gegenprobe der Prüfseite: alle 26 Läufe wurden rot – jeder mit der passenden Meldung.`
  (13 Fälle × 2 Browser).
- Echtes Repo: `schnittstelle-regeln (chromium): alles in Ordnung` · `lauf-selbsttest: alles in Ordnung`.
- `version-regeln`: echtes Repo `version-regeln (chromium): 1 Fehler` (nur die Fassungs-Abweichung oben); Spiegel `version-regeln (chromium): alles in
  Ordnung`, `version-regeln (webkit): alles in Ordnung`, `schnittstelle-regeln (chromium): alles in Ordnung`.
- `doku-regeln`: echtes Repo `doku-regeln (chromium): 6 Fehler` – **alle in `AppDesign/UEBERGABE.md`** (unverändert seit Commit d7a312a, nicht von
  mir): Nummern ohne Thema in Z. 26, 37, 38, 41, 50, 53, 55, 60, 70, 72 (Teil- und Fallnummern ohne ‚APD-135/‘ bzw. ‚APD-101/‘ und der Dateiname des Berichts 0139).
  Im Spiegel mit ergänzten Nummern (`APD-135/B-3.1`, `APD-135/E-1`, `APD-101/L-3` …; Dateiname durch ‚Bericht der Sitzung 0139‘ ersetzt):
  `doku-regeln (chromium): alles in Ordnung`. Vorschlag als Diff: `…/scratchpad/uebergabe-vorschlag.diff`. Eine von mir verursachte Stelle
  (`tests/README.md` Z. 120, ‚L-1, L-3‘) ist behoben. `checkCatalog` ist grün – keine Regel hat ihre Meldung im Prüflauf verloren (APD-135/Z-10).
- `--abdeckung` (Spiegel): jeder neue Teil und `ablauf-bausteine` mit seinen Ansichten in beiden Browsern (z. B. grossanzeige 8 Ansichten,
  schicht-oben 8 inkl. der 3 Messungen, titel-oben 6 inkl. 2 × ‚Bewegung reduzieren‘).
- `git diff --stat` AppDesign: nur `tests/README.md` und `tests/pruefseite.mjs` – `ui.js` und `design.css` (v4 und Fassung) unverändert.

## Abweichungen vom Vorschlag

1. **Fenstertitel verlängert (titel-blase):** die Fenstertitel der Vorlage (‚Eintrag bearbeiten‘, ‚Unterpunkt 4‘) passen bei Text 53 ganz hinein
   (234 px, 23 px Schrift), im Reiselogbuch nicht. Für APD-101/L-1, APD-101/L-3 und APD-101/L-4 hängt der Ablauf an den Titel des offenen Fensters einen Zusatz an, für APD-101/L-9 und APD-62/H-3
   verlängert ein Platzhalter den Inhalt (beides nur in der Prüfung, wie bisher der Platzhalter in H-3). Alternative wäre ein längerer Fenstertitel in
   der Vorlage – nicht gemacht (keine Prüf-Haken in der Vorlage).
2. **Neutrale Entsprechungen:** APD-101/L-3 prüft ‚Unterpunkt 4‘ statt des Datums; APD-101/L-8 ‚Fenster offen, Titel im Feld und gespeichert unverändert‘;
   schicht-oben ‚nichts gelöscht (gespeicherte Einträge)‘ über `localStorage`; messung F10: leere Vorlage starten und teilen (ohne ‚Neues …‘-Fenster).
3. **APD-127/B-10** (`gleitenGegenprobe`, nur mit `PRUEF_V=heute`) nicht auf die Prüfseite übernommen – sie liest `ui.js` über den Pfad der URL von der
   Platte, das geht unter `http://pruefseite.test/` nicht. B-10 bleibt in `ablauf-blatt` und `ablauf-feld-tastatur`.
4. **Warten auf das close-Ereignis:** die Vorlage baut nach dem Schließen eines Fensters (verspätetes `close`) die Seitenleiste neu auf; ohne Warten
   ersetzte der Neuaufbau in APD-62/H-2 mitten in der Prüfung die beobachtete Liste (‚springt nach oben‘, unter Last). `zuFenster` wartet jetzt darauf.
5. **messung:** die Versionszeile wird erst in der Endlage des Menüs gemessen (`RUHE` statt 200 ms) – sonst traf das lange Drücken während des Wachsens daneben.
6. `ablauf-bausteine` prüft Titel-Blase APD-101/L-3 mit `titelLang` und dem Text der Blase statt eines ganzen `checkTitelBlase` (kürzer); die übrigen Teile wie
   beschrieben. Kein neuer Name in `schnittstelle.json` nötig, die Vorlage ist unverändert.

## Regeltext-Stellen

Keine: weder Designrichtlinie (inkl. Regelkatalog – R-1.6, R-2.5, R-2.6, R-2.7 nennen `ablauf.mjs` mit `checkMessung`, `checkTitelBlase`,
`checkGrossanzeige`, `checkTitelOben`, die bleiben) noch Zusammenarbeit, App-Richtlinie, beide `CLAUDE.md` oder `PROMPT.md` nennen die 5 Dateien.
Der Satz in Designrichtlinie 14 ‚Prüfen‘ (bestätigter Wortlaut aus B-3.1) passt auch zu B-3.2. Nur Doku ohne Regel: `UEBERGABE.md` (siehe oben).

## Auffälliges

- Für die CHANGELOG-Testfälle: APD-135/E-7 bis E-13 grün bzw. rot wie erwartet; E-14: Ausgabe der Hülle in `ReiseLogBuch/tests/out/`, nichts unter
  `fassung/…/tests/out/`.
- In `ReiseLogBuch/tests/out/` liegen noch `abdeckung-ablauf-messung-…json` usw. aus früheren Läufen – `--abdeckung` zeigt sie, bis sie gelöscht sind.
- Hilfsdateien nur im Notizordner (`/tmp/claude-0/-home-user-AppDesign/8c093528-1c0e-5dcd-9836-5ae1e066f131/scratchpad/`): `huelle.mjs`,
  `fehler-einschleusen.mjs`, `fassung-im-spiegel.mjs`, `spiegel/`, Ausgaben `alt-*.txt`, `ab-gp-*.txt`, `gp-*.txt`, `spiegel-*.txt`.
- Kein `package.json`/`package-lock.json` im Repo entstanden.
