# A-23 und T-94 – Fall-Liste

**Stand 18.10.2026** · Sitzung Reiselogbuch 0013 · geplant: **AppDesign 4.24.0** und **Reiselogbuch 3.22.0**
(Reiselogbuch wird dafür auf Fassung 4.24.0 gehoben – nur mit deinem Ja). Muster: `arbeit/A-23 T-94 Muster.html`.

## A-23 – Hervorhebung nach dem Fenster länger (R-7.3, allgemein)

**Heute (4.23.2):** `revealRow` in `ui.js` – die Zeile startet hellblau (`--sel-bg`) und blendet in **1 s** aus
(`ease-in`); bei ‚Bewegung reduzieren‘ 1 s blau, dann sofort weg.
**Apple:** beim Zurückkehren in eine Liste blendet die Auswahl in ~0,3–0,5 s aus (`deselectRow`); eine eigene
‚geändert‘-Hervorhebung hat Apple nicht – unsere ist bewusst länger, damit man sieht, wo man war.

**Varianten (im Muster abspielbar):**
- **A (Vorschlag):** 2 s voll blau, dann 1 s ausblenden – zusammen 3 s.
- **B:** 1 s voll blau, dann 2 s langsam ausblenden – zusammen 3 s, wirkt weicher, fällt etwas weniger auf.
- ‚Bewegung reduzieren‘ (beide): 2 s voll blau, dann ohne Ausblenden weg.

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| H1 | iPad quer, Zeile in der Mitte öffnen, Häkchen | Zeile nach 1,5 s noch voll `--sel-bg`, nach 3,2 s wieder normal | `checkListStill` (neu: Farbe zu Zeitpunkten statt nur ‚Animation läuft‘) |
| H2 | wie H1 mit x (ohne Änderung) | gleich wie H1 | checkListStill |
| H3 | iPad hoch, iPhone hoch und quer | gleich wie H1 | checkListStill (läuft schon je Gerät) |
| H4 | hell und dunkel | Farbe ist jeweils `--sel-bg` des Modus (dunkel `#10335c`) | voller Lauf (hell + dunkel) |
| H5 | ‚Bewegung reduzieren‘ | 2 s voll, danach sofort normal, kein Zwischenton | checkListStill mit `reducedMotion` |
| H6 | Während der 3 s eine andere Zeile öffnen | alte Hervorhebung endet sofort, neue erst nach dem Schließen | checkListStill |
| H7 | Während der 3 s scrollen | Hervorhebung läuft weiter, Liste rollt normal | checkListStill |
| H8 | Nach 5× ‹ › schließen | die zuletzt gezeigte Zeile wird hervorgehoben (wie heute), nichts rollt | vorhanden (R-7.3) |
| H9 | Liste wird in den 3 s neu aufgebaut (z. B. Abgleich) | Hervorhebung darf wegfallen, nichts verschiebt sich | vorhanden (Liste steht still) |
| H10 | Kasten statt Zeile (Fazit, Quartierliste) | gleich wie H1 | checkListStill |
| H11 | Schaltflächen (keine Zeile) | weiterhin keine Hervorhebung | vorhanden |
| H12 | Gegenprobe | mit der alten Dauer (1 s) ist H1 rot | `--gegenprobe` |

**Nur am Gerät (Prüfliste):** fällt die Zeile jetzt deutlich genug auf, ohne zu stören (iPad und iPhone)?

**Regeltext R-7.3 neu (Teil):** ‚… die Zeile wird **2 s blau hinterlegt und blendet in 1 s aus** (seit 4.24.0, vorher ~1 s) …‘.

## T-94 – Verlauf im Fenster ‚Tag‘: ‚Tour …‘ und ‚Sonstiges …‘ (Reiselogbuch)

**Heute:** vier Vorschläge (Weiterfahrt nach …, Rundgang durch …, Besichtigung …, Freetour …), je an der Cursorstelle als
eigene Zeile, danach groß weiter (`capNext`).
**Neu:** dahinter **‚Tour …‘** (wie die anderen, Text ‚Tour ‘) und **‚Sonstiges …‘** (nur neue Zeile am Ende, Cursor dorthin).

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| V1 | Reihenfolge | Weiterfahrt nach … · Rundgang durch … · Besichtigung … · Freetour … · **Tour …** · **Sonstiges …** | neu `tests/verlauf-vorschlaege.mjs` |
| V2 | ‚Tour …‘ im leeren Feld, dann ‚wien‘ tippen | ‚Tour Wien‘ | verlauf-vorschlaege |
| V3 | ‚Tour …‘ mit Cursor mitten im Text | wie die anderen: eigene Zeile an der Cursorstelle | verlauf-vorschlaege |
| V4 | ‚Sonstiges …‘ im leeren Feld | nichts eingefügt, Cursor im Feld, Tastatur offen | verlauf-vorschlaege |
| V5 | ‚Sonstiges …‘, Text endet ohne Zeilenumbruch | ein Zeilenumbruch am Ende, Cursor dahinter | verlauf-vorschlaege |
| V6 | ‚Sonstiges …‘, letzte Zeile schon leer | **kein** zweiter Umbruch, Cursor ans Ende | verlauf-vorschlaege |
| V7 | ‚Sonstiges …‘ mit Cursor mitten im Text | Zeile trotzdem **am Ende**, Text davor unverändert | verlauf-vorschlaege |
| V8 | ‚Sonstiges …‘ zweimal hintereinander | nur eine neue Zeile (wie V6) | verlauf-vorschlaege |
| V9 | Nach ‚Sonstiges …‘ ‚museum‘ tippen | ‚Museum‘ (groß, wie nach den anderen) | verlauf-vorschlaege |
| V10 | Feld wächst mit, neue Zeile sichtbar (iPad und iPhone, Tastatur offen) | Cursorzeile sichtbar | verlauf-vorschlaege |
| V11 | Häkchen wird nach dem Einfügen blau, x fragt nach (R-4.4) | wie bei den anderen | vorhanden (checkDialogHead) |
| V12 | Aufbau der Reihe iPad quer/hoch, iPhone hoch/quer, hell/dunkel | je Variante (siehe Muster): nichts abgeschnitten, Ziel ≥ 44 px | hig.mjs (Zielgröße, Überlauf) |
| V13 | Gegenprobe | ohne die neuen Schaltflächen V1–V9 rot | `--gegenprobe` |

**Aufbau der Reihe (Muster):**
- **Variante 1 (Vorschlag):** wie heute umbrechen – iPad meist 2 Reihen, iPhone hoch 3 Reihen; alles auf einen Blick.
- **Variante 2:** eine Reihe als Auswahl-Kapsel zum Wischen (wie Wetter) – immer eine Reihe, die letzten Vorschläge
  muss man auf dem iPhone erst herwischen.

**Nur am Gerät (Prüfliste):** Tastatur bleibt nach ‚Sonstiges …‘ offen, Cursor blinkt in der neuen Zeile; Diktieren dort.

**Offen für dich:** Soll ‚Sonstiges …‘ wirklich nichts schreiben (nur neue Zeile)? Die drei Punkte deuten sonst ‚hier geht
es weiter‘ an – das passt, weil der Cursor dort steht.
