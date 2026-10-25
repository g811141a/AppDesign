# APD-43 Teil 2 ‚Textgröße (Dynamic Type)‘ – Testfall-Liste

**Stand 23.10.2026** · Sitzungen Reiselogbuch 0036 (angelegt, Fälle 1–31 durchgesprochen, alle übernommen) und 0037 (P1–P4 übernommen, Abschnitte 1–3 angeglichen; Aufbereitung aller Fälle: `arbeit/APD-43 Teil 2 Aufbereitung.md`) · Klärung und Apple-Abgleich:
`arbeit/APD-43 Teil 2 Klärung.md` · Muster: `arbeit/APD-43 Teil 2 Muster.html` (Variante A ok, hell und dunkel, iPad und iPhone)

**Entschieden (Nutzer 23.10.2026, Sitzung 0035):** Variante **A wie Apple** – alles wächst bis **AX5 (53 pt)**, Leisten nur bis
23 pt, ab AX1 (28 pt) steht Nebeneinanderliegendes untereinander, auf dem iPhone hoch schon ab 21 pt; Textstile nach Apples
Tabelle (Überschriften wachsen langsamer); **allgemeine Regel: Ja**. Am Gerät bestätigt: `-apple-system-body` meldet die Stufe bis
AX5, wechselt bei offener App, auch auf dem Home-Bildschirm.

Alles ist allgemein (AppDesign `design.css`, `ui.js`, Prüfungen in `tests/`); die App ändert nur eigene Größen und Bausteine
(Reiselogbuch: 6 Schriftgrößen, Tabelle der Tage, Kästen am iPhone).

## 1. Regeln (Katalog, Designrichtlinie 17)

Angeglichen an Abschnitt 4 (Sitzung 0037).

| Regel | Inhalt | Prüfung | Gerät |
|---|---|---|---|
| **R-1.10 neu** (Thema 1, neben R-1.8, R-1.9) | **Textgröße folgt dem Gerät:** Schrift nach der Einstellung ‚Textgröße‘ (14–53 pt), alle Textstile nach Apples Tabelle, Leisten nur bis 23 pt, ab 28 pt (iPhone hoch ab 21 pt) Nebeneinanderliegendes untereinander, nichts ragt hinaus oder überlappt, Wechsel sofort ohne Neuladen, Ausgabe unverändert (R-6.2). Werte-Tabelle (Stile × Stufen) in Designrichtlinie Abschnitt 3; Abweichung: keine Großanzeige (L4). R-10.2 (mindestens 11 pt) und R-1.3 (Felder mindestens 16 px) bleiben als Untergrenzen | hig.mjs – `checkText` in 14, 17, 23, 33, 53 px (P1, P2); Gegenprobe `--gegenprobe text` (P3) | Aussehen in mehreren Stufen, Wechsel bei offener App (P4) |
| **Grundregel neu** | **Nichts überlappt:** Textzeilen und Knöpfe schneiden sich nicht (P2 Punkt 5) | `pruefe.mjs` (in jeder Größe) | – |

## 2. Testfall-Liste

Gerät × Lage × Darstellung: iPad quer und hoch, iPhone hoch und quer, je hell und dunkel, Chromium und WebKit; zusätzlich in den
Textgrößen 14, 23, 33 und 53 px über `PRUEF_TEXT` (P1); nach jedem Fall gelten die Grundregeln (`pruefe.mjs`). Einzelheiten je Fall:
Abschnitt 4.

### R – Regel

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| R1 | Neue Katalog-Regel | R-1.10 ‚Textgröße folgt dem Gerät‘ (Abschnitt 1); R-10.2 und R-1.3 bleiben | ja (`checkCatalog`, `checkText`) |

### G – Grundgröße und Textstile

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| G1 | Grundgröße | Rückfall `html { font: 17px/1.45 -apple-system, … }`, nur bei `pointer: coarse` `-apple-system-body`; Mac und Chromium 17 px; `body { font-size: 1rem }` | ja |
| G2 | Textstile | wörtlich nach Apples Tabelle (12 Stufen × 11 Stile, Größe und Zeilenabstand) als Blöcke `html[data-ts]` mit `--t-…` und Faktor `--f-…`; ohne Stufe wie heute | ja |
| G3 | Umsetzung | `textStufe()` in ui.js (Probe mit `ResizeObserver` und `visibilitychange`) → `html[data-ts]`, `ts-gross` ab 21, `ts-ax` ab 28; Wechsel ohne Neuladen | ja |
| G4 | Zuordnung | jede feste Größe einem Stil zugeordnet (45 in design.css, 6 im Reiselogbuch); Standard sieht aus wie heute; keine Schrift in px außer Ausgabe und Druck | ja |
| G5 | Kleine Stufen 14–16 pt | wie Apple kleiner, nie unter 11 pt (R-10.2); Feldtext `max(16px, Body)` (R-1.3, Abweichung bei xS) | ja |
| G6 | Zeilenhöhe, Umbruch | keine Zeilenhöhe in px (Knöpfe, Griff, Fenstertitel → 1.2); Text 1.45, große Stufen enger nach Apple; Silbentrennung im Inhalt (R-6.3) | ja |

### A – Höhen, Abstände, Icons

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| A1 | Feste Höhen | im Inhalt Mindesthöhen, die mit dem Text wachsen; Untergrenzen bleiben (R-3.1); Kreise bleiben Kreise | ja |
| A2 | Abstände | senkrechte Innenabstände wachsen mit dem Body-Faktor, seitliche und sichere Ränder fest | ja |
| A3 | Icons | im Inhalt mit dem Body-Faktor (20 → 62 px bei AX5), in Leisten bis 23 pt | ja |

### L – Leisten

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| L1 | Kopfzeile, Suchzeile, Seitenleisten-Kopf, Fensterkopf, untere Leiste, Kapsel Nach oben/Ans Ende, Schnellroll-Griff | wachsen bis 23 pt (Texte bis 23, Knöpfe höchstens 60 px, Icons etwa 27 px), ab AX1 fest; Suchfeld mindestens 16 px | ja |
| L2 | iPhone quer (R-2.4, 32 px) | Leisten wachsen nicht (32 px, Titel 17, Icons 20); Inhalt wächst | ja |
| L3 | Langer Titel in der Leiste | Titel und Anzahl einzeilig mit … (auch Seitenleiste, Fensterkopf iPad); `.ltitle` im Inhalt bricht um | ja |
| L4 | Großanzeige (Apple: langes Drücken) | wird nicht nachgebaut – Abweichung bei R-1.10; Ausgleich L1 und VoiceOver (R-1.8) | – |

### U – Umbau bei großen Größen

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| U1 | Ab AX1 (28 pt, `ts-ax`) | untereinander: Datum der Kachel unter dem Titel, Menü-Wert unter dem Text, Kasten-Bezeichnung über dem Wert, Reisedaten; Pfeil › bleibt rechts oben | ja |
| U2 | iPhone hoch | Umbau aus U1 schon ab 21 pt (`ts-gross`) | ja |
| U3 | Tabellen (R-6.1) | ab AX1 (iPhone hoch immer) Zeilen als Kästen (`.box`/`.kv`); Vorschau und Ausgabe bleiben Tabellen | ja |
| U4 | Tabelle der Tage (Reiselogbuch) | iPad ab AX1 dieselben Kästen wie das iPhone (`.box.day`), derselbe Tag bleibt oben | ja |
| U5 | Kapseln, Schrittkopf | Mindesthöhe statt fest; Auswahl einzeilig wischbar (R-5.4), Options-Kapseln brechen um; Kasten-Titel bricht um; ab AX1 Knöpfe unter dem Titel (R-5.1) | ja |

### B – Bausteine

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| B1 | Menüs | Breite wächst mit dem Body-Faktor bis Bildschirm minus Rand; Einträge brechen um, Wert ab AX1 darunter; jedes Menü rollt, wenn zu hoch (R-4.5) | ja |
| B2 | Sprechblasen | wachsen wie B1; ab AX1 Knöpfe und Kacheln untereinander; zu hoch → rollt | ja |
| B3 | Seitenleiste am iPad | mindestens 340, höchstens 420 × Body-Faktor und 40 % quer bzw. 70 % hoch | ja |
| B4 | Fenster | iPad-Fenster und Meldung wachsen bis 90 % der Breite, iPhone bildschirmfüllend; Notizfeld mindestens etwa 4 Zeilen | ja |
| B5 | Eingabefelder | Feldtext mindestens 16 px; Betragsfeld in Zeichenbreite (`ch`); ⓧ und Kalender wachsen, Antippfläche mindestens 44 | ja |
| B6 | Schalter, Smileys, Wetter, Markierung | Schalter fest (R-5.7); Smileys, Wetter, Markierung und Häkchen wachsen; passt es nicht → seitlich wischen (R-5.4) | ja |
| B7 | Backup-Kachel, Meldungen, Kapsel unten, Schnellroll-Griff | wie Leisten bis 23 pt; Platzhalter unter der Liste aus der gemessenen Höhe, letzter Eintrag erreichbar (R-7.1); überdecken nie Leisten (R-3.2) | ja |

### W – Wechsel und Sonstiges

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| W1 | Einstellung bei offener App ändern | wie nach dem Drehen (R-8.1): oberster Eintrag bleibt, offenes Fenster bleibt offen, Menüs neu ausgerichtet; Reiselogbuch Tabelle ↔ Kästen mit demselben Tag oben | ja (ablauf.mjs) |
| W2 | Drehen bei großer Stufe | Umbau folgt der neuen Lage, oberster Eintrag bleibt; Drehprüfung bei 23, 33, 53 px | ja |
| W3 | Ausgabe HTML/PDF und Vorschau | unverändert (R-6.2, R-6.4), nur der Fensterkopf folgt L1; bei 17 und 53 px identisch | ja |
| W4 | Messmodus | Kopfzeile ‚Text <Stufe> <px>‘, Wechsel als Ereignis; `abspielen.mjs` stellt die Größe ein | ja (`checkMessung`) |
| W5 | Mac, Chromium, eigene Einstellung | keine eigene Textgröße in der App; Mac und Chromium 17 px; ‚Einstellungen pro App → Safari‘ am Gerät | ja |

### P – Prüfungen

| Nr. | Fall | Erwartet |
|---|---|---|
| P1 | Schalter `PRUEF_TEXT=<px>` (wie `PRUEF_BEDIENUNG`) | `t.seite()` setzt die Grundgröße vor dem Laden (‚· Text 53‘); voller Lauf: hig bei 14, 23, 33, 53 (vier Ansichten, mit Drehen), Bewegungsabläufe bei 53; Mehrzeit beim Bau messen |
| P2 | Prüfung `checkText` (hig.mjs) | keine Schrift in px, bei 53 Apples Wert je Stil (±1), Leisten bis 23-pt-Maß (iPhone quer 32), bei AX keine Tabelle und untereinander, neue Grundregel ‚nichts überlappt‘; bestehende Prüfungen in jeder Größe |
| P3 | Gegenprobe `--gegenprobe text` | je eingeschleustem Fehler (px-Schrift, Leiste ungedeckelt, Tabelle bei AX, Zeilenhöhe 20 px, Feld 14 px, Ausgabe wächst, Platzhalter fest) genau die passende Meldung rot |
| P4 | Testfälle am Gerät | /0 Versionszeile; iPhone hoch und iPad in xS, Standard, XXXL, AX2, AX5; Wechsel über das Kontrollzentrum; Tagestabelle iPad ab AX1; Notiz bei AX5; ‚Einstellungen pro App → Safari‘; Mac 17 px |

## 3. Antworten (Nutzer)

Alle 35 Fälle wie empfohlen übernommen (Sitzungen 0036 und 0037); Einzelheiten in Abschnitt 4.

## 4. Durchsprache Fall für Fall

- **R1** übernommen (Sitzung 0036): neue Regel **R-1.10** ‚Textgröße folgt dem Gerät‘ in Thema 1 (neben R-1.8, R-1.9) – Schrift nach der Einstellung ‚Textgröße‘ (14–53 pt), alle Textstile nach Apples Tabelle, Leisten nur bis 23 pt, ab 28 pt (iPhone hoch ab 21 pt) Nebeneinanderliegendes untereinander, nichts ragt hinaus oder überlappt, Wechsel sofort ohne Neuladen, Ausgabe unverändert (R-6.2); Prüfung hig.mjs – `checkText` in 14, 17, 23, 33, 53 px; Gerät: Aussehen in mehreren Stufen, Wechsel bei offener App. Werte-Tabelle (Stile × Stufen) in Designrichtlinie Abschnitt 3 (Spalte ‚Bau‘); R-10.2 und R-1.3 bleiben als Untergrenzen.
- **G1** übernommen: Grundgröße an `html` – Rückfall `font: 17px/1.45 -apple-system, …`, darüber `@media (pointer: coarse) { html { font: -apple-system-body; line-height: 1.45 } }` (Mac bleibt 17 px; vermutlich 13 px mit `-apple-system-body` – Testfälle), `body { font-size: 1rem }`, `-webkit-text-size-adjust: 100%` bleibt; Prüfungen setzen die Grundgröße immer selbst (P1). Gemessen: Chromium und WebKit der Prüfumgebung kennen `-apple-system-body` nicht und nehmen den Rückfall 17 px.
- **G2** übernommen: Textstile **wörtlich nach Apples Tabelle** (HIG, 12 Stufen × 11 Stile, Größe und Zeilenabstand; Tabelle in `arbeit/APD-43 Teil 2 Aufbereitung.md`) – je Stufe ein Block `html[data-ts="…"]` mit Größe `--t-…` und Faktor `--f-…` (Größe ÷ Standard); ohne Stufe die Standardwerte (Aussehen wie heute); keine lineare Näherung.
- **G3** übernommen: `textStufe()` in ui.js – unsichtbare Probe mit `font-size: 1rem`, beobachtet mit `ResizeObserver` (sofort, ohne Abfrage im Takt), zusätzlich bei `visibilitychange`; Stufe = nächster der 12 Body-Werte → `html[data-ts]` (xs … ax5), Klassen `ts-gross` (ab 21) und `ts-ax` (ab 28); danach wie nach dem Drehen (W1); andere Werte (Mac, Chromium) → Standard. Gerät: Wechsel über das Kontrollzentrum kommt an (Testfälle).
- **G4** übernommen: jede feste Größe einem Stil zugeordnet – 34 Large Title, 28 Title 1, 20 Title 3, 17 Body (fett Headline), 15 Subhead, 13 Footnote, 12 Caption 1; Größen ohne Stil behalten ihre Standardgröße und wachsen mit dem Faktor des nächsten Stils (19 → Title 3, 14 → Subhead); Symbole → A3/B6; bei Standard unverändertes Aussehen; keine Schrift mehr in px außer Ausgabe und Druck (betrifft 45 Größen in design.css, 6 im Reiselogbuch).
- **G5** übernommen: kleine Stufen wie Apple (xS 14, S 15, M 16 pt); Feldtext `max(16px, Body)` – bei xS steht der Feldtext etwas größer als der Text daneben (Abweichung wegen Safari, R-1.3); 11 pt durch Apples Tabelle gesichert (R-10.2, Prüfung bleibt).
- **G6** übernommen: keine Zeilenhöhe in px – Knöpfe (`button { line-height: 20px }`, design.css:85), Blase des Griffs (20 px) und Fenstertitel (28 px) auf `1.2`; Text 1.45 bei Standard, bei großen Stufen enger im Verhältnis von Apples Tabelle (AX5 etwa 1,31 = 1.45 × (62/53) ÷ (22/17)); Silbentrennung `hyphens: auto` (`lang="de"`) in Kacheln, Kästen, Tabellen, Fenstern; `overflow-wrap: anywhere` bleibt letzter Ausweg (R-6.3).
- **A1** übernommen: im Inhalt wird jede feste Höhe zur Mindesthöhe (`.cap`, `.check.chip`, Smiley-/Wetter-Knöpfe 44, Schrittnummer 26 …); Untergrenzen bleiben (44, 46, 52, 60, 96; R-3.1); Kreise (Schrittnummer, runde Knöpfe, Markierung) wachsen mit dem Inhalt und bleiben Kreise; Kapseln in Leisten → L1.
- **A2** übernommen (wie Muster A): senkrechte Innenabstände von Kacheln, Kästen, Menüeinträgen und Listenzeilen wachsen mit dem Body-Faktor (Kachel 12 → etwa 37 px bei AX5); seitliche Ränder und sichere Ränder bleiben fest.
- **A3** übernommen: Icons im Inhalt (Kacheln, Menüs, Felder, Kästen; `.ic`, ⓧ, Kalender) wachsen mit dem Body-Faktor (20 → 62 px bei AX5), in Leisten bis 23 pt (etwa 27 px, L1); runde Icon-Knöpfe im Inhalt = Icon + Luft, mindestens 44 (A1).
- **L1** übernommen (Muster A): Leisten = Kopfzeile (`.nb`, `.pnav`), Suchzeile, Seitenleisten-Kopf, Fensterkopf, untere Leiste am iPhone (`.bbar`), Kapsel Nach oben/Ans Ende, Schnellroll-Griff – wachsen höchstens bis Stufe XXXL (23 pt): Texte bis 23, Knöpfe und Kapseln 44 → höchstens 60 px, Icons bis etwa 27 px; ab AX1 fest; Suchfeld-Text mindestens 16 px.
- **L2** übernommen: iPhone quer (Höhe unter 500 px) wachsen die Leisten nicht – 32 px, Knöpfe 31/32, Titel 17, Icons 20 wie heute (R-2.4, R-4.5); der Inhalt darunter wächst normal.
- **L3** übernommen: alle Titel und Anzahlen in Leisten einzeilig mit … – auch Seitenleisten-Titel (`.side-head h2`, heute `nowrap` ohne Kürzen, ragt hinaus), Fensterkopf am iPad (`.dlg-head h3`, heute Umbruch) und die Anzahl darunter; großer Titel `.ltitle` im Inhalt bricht um wie heute; VoiceOver liest den ganzen Titel (R-1.8).
- **L4** übernommen: Großanzeige (Large Content Viewer) wird **nicht** nachgebaut – Abweichung von Apple festhalten (Designrichtlinie bei R-1.10); Ausgleich: Leisten wachsen bis 23 pt (L1), VoiceOver nennt jeden Knopf (R-1.8).
- **U1** übernommen: mit `html.ts-ax` (ab 28 pt) untereinander – Datum der Kachel unter dem Titel und umbrechend (heute `.side-row small` `nowrap`, ragt hinaus), Menü-Wert (`.mi .val`) unter dem Text, Kasten-Bezeichnung (`.box .kv .k`, heute 74 px) über dem Wert in voller Breite, Reisedaten `.meta` untereinander (App); Pfeil › bleibt rechts oben; `.pair` bricht schon heute um.
- **U2** übernommen (Muster A): iPhone hoch (`html.phone` und hochkant) gilt der Umbau aus U1 schon ab 21 pt (`ts-gross`), iPhone quer und iPad ab 28 pt (`ts-ax`).
- **U3** übernommen: allgemeine Regel – ab AX1 (iPhone hoch immer) zeigt jede Tabelle im Inhalt ihre Zeilen als **Kästen** (vorhandener Baustein `.box`/`.kv`, Bezeichnung über dem Wert nach U1); Vorschau und Ausgabe bleiben Tabellen (R-6.2, seitlich wischen); kein eigener CSS-Umbau wie im Muster.
- **U4** übernommen (Reiselogbuch): iPad ab AX1 zeigt die Tage als dieselben Kästen wie das iPhone (`.box.day` aus `renderPhone`, eine Umsetzung, R-1.1) statt `table.days`; Kopf ab AX1 mit Wetter unter dem Datum (U1); beim Wechsel Tabelle ↔ Kästen bleibt derselbe Tag oben (W1); R-7.3 und R-7.4 wie am iPhone.
- **U5** übernommen: Auswahl-Kapsel (`.cap`) und Options-Kapsel (`.check.chip`) mit Mindest- statt fester Höhe 44 (A1), Markierung wächst mit; Auswahl bleibt einzeilig wischbar (R-5.4); Options-Kapseln brechen als Gruppe um; Kasten-Titel am iPhone darf umbrechen (heute `nowrap`, ragt hinaus); ab AX1 stehen die Knöpfe des Schrittkopfs immer unter dem Titel (R-5.1).
- **B1** übernommen: Menübreite (340, Untermenü 260) wächst mit dem Body-Faktor, höchstens Bildschirmbreite minus Rand (R-1.7); Einträge brechen um, Icons wachsen (A3), Wert ab AX1 unter dem Text (U1); jedes Menü (nicht nur das Untermenü) rollt, wenn es zu hoch ist (R-4.5).
- **B2** übernommen: Sprechblase (320, mit Kacheln 400, iPhone quer 640) wächst wie B1 mit dem Body-Faktor bis Bildschirmbreite minus Rand; ab AX1 Knöpfe und Kacheln immer untereinander (auch iPhone quer, heute nebeneinander); zu hoch → Inhalt rollt (R-4.5).
- **B3** übernommen: Seitenleiste am iPad – Mindestbreite 340 bleibt, Höchstbreite 420 × Body-Faktor, höchstens 40 % der Breite quer (fest, Inhalt behält mindestens 60 %, `--side-w`) bzw. 70 % hoch (darübergelegt); Kacheln wachsen mit dem Inhalt (A1, A2, U1); Kopf = Leiste (L1).
- **B4** übernommen (Muster A): Mindestbreite von iPad-Fenster (480) und Meldung (360/600) wächst mit dem Body-Faktor bis höchstens 90 % der Breite; iPhone bleibt bildschirmfüllend; Notizfeld Mindesthöhe etwa 4 Zeilen statt 96 px (wächst mit Schrift und Inhalt, R-5.2); Fensterkopf nach L1.
- **B5** übernommen: Feldtext `max(16px, Body)` (G5); Betragsfeld (Reiselogbuch `#kosten`, heute fest 130 px) in Zeichenbreite (`ch`, ‚4.850,00 €‘ plus Luft); ⓧ und Kalender-Icon wachsen (A3), Antippfläche mindestens 44 und mit dem Zeichen wachsend (R-5.6), Ausrichtung in ui.js (heute fest 44) mit der tatsächlichen Größe; Datumsfeld misst schon mit der Schrift.
- **B6** übernommen: Schalter fest (51 × 31 bzw. Safaris eingebauter, R-5.7); Smileys und Wetter (24 in 44er-Knöpfen), Markierung (Kreis 36) und Häkchen-Feld (24) wachsen mit dem Body-Faktor, Markierung bleibt Kreis; passt es nicht → Kapsel wischt seitlich (R-5.4), auch Wetter am iPhone (40-px-Ausnahme des Reiselogbuchs gilt dann nur bei Standard).
- **B7** übernommen: Backup-Kachel (`.bhint`, iPhone `.bnote`), untere Leiste am iPhone, Kapsel Nach oben/Ans Ende und Schnellroll-Griff = Leiste (bis 23 pt, L1); Platzhalter unter der Liste (`.rolle::after`, `.side-list`, heute fest 100/120/150 px) aus der **gemessenen** Höhe der Kachel bzw. Leiste – letzter Eintrag bleibt in jeder Größe erreichbar (R-7.1); Meldung (`.nettoast`) wächst mit bis Bildschirmbreite minus Rand.
- **W1** übernommen: nach dem Erkennen (G3) dasselbe wie nach dem Drehen (R-8.1) – oberster Eintrag bleibt, `--pnav-h`, `--dlg-max`, `--side-w` neu, offenes Fenster bleibt offen (Eingabe, Fokus, Tastatur), Menüs und Sprechblasen neu ausgerichtet (`floating`, Schaltfläche bleibt blau), Reiselogbuch Tabelle ↔ Kästen mit demselben Tag oben (U4). Prüfung: ablauf.mjs – Größe wechseln mit offenem Fenster, offenem Menü, gerollter Liste.
- **W2** übernommen: beim Drehen folgt der Umbau der neuen Lage (iPhone hoch ab 21, quer ab 28 pt), oberster Eintrag bleibt, Menüs und Sprechblasen neu ausgerichtet (R-8.1); Drehprüfung in hig.mjs zusätzlich bei 23, 33 und 53 px (P1).
- **W3** übernommen: Ausgabe (`outputCss` in pt), Vorschau-Inhalt, Abgleichbericht und Druck unverändert (R-6.2, R-6.4); nur der Rahmen der Vorschau (Fensterkopf) folgt L1; Prüfung: Ausgabe und Vorschau bei 17 und 53 px identisch.
- **W4** übernommen: Kopfzeile der Messung (`messStart`) nennt ‚Text <Stufe> <px>‘ (z. B. ‚Text ax2 33‘), ein Wechsel während der Messung wird als Ereignis notiert (‚text l → ax2‘); `abspielen.mjs` stellt beim Nachspielen dieselbe Größe ein (über P1); Prüfung `checkMessung`.
- **W5** übernommen: keine eigene Textgröße in der App (immer vom Gerät); Mac und Chromium Standard 17 px (G1; HIG: Body auf dem Mac 13 pt); am Gerät prüfen, ob ‚Bedienungshilfen → Einstellungen pro App → Safari → Textgröße‘ auch auf die Web-App wirkt (Testfälle).
- **P1** übernommen (Sitzung 0037): Schalter `PRUEF_TEXT=<px>` in `pruefe.mjs` (wie `PRUEF_BEDIENUNG`) – `t.seite()` setzt die Grundgröße vor dem Laden, Ort mit Zusatz ‚· Text 53‘; im vollen Lauf hig zusätzlich bei 14, 23, 33 und 53 px (alle vier Ansichten, mit Drehen), die Abläufe mit Bewegung (Navigation, Fenster, iPhone, Suche, Seitenleiste) bei 53 px; Mehrzeit beim Bau messen.
- **P2** übernommen: neue Prüfung `checkText` in hig.mjs – (1) keine Schriftgröße in px in den Stilen der App (außer Ausgabe und Druck); (2) bei 53 px jeder Text mindestens so groß wie bei 17 px und genau Apples Wert seines Stils (±1); (3) Leisten höchstens im 23-pt-Maß, iPhone quer 32 px; (4) bei AX keine Tabelle im Inhalt, Nebeneinanderliegendes untereinander; (5) **neue Grundregel ‚nichts überlappt‘** (Textzeilen und Knöpfe schneiden sich nicht – fände die 20-px-Zeilenhöhe der Knöpfe); dazu die bestehenden Prüfungen (R-6.3, R-10.2, R-1.3, R-1.7/R-3.2) in jeder Größe.
- **P3** übernommen: Gegenprobe `--gegenprobe text` (wie `bedienung`) – je Lauf ein eingeschleuster Fehler, genau die passende Meldung rot: Schrift in px, Leiste ungedeckelt, Tabelle bei AX, Zeilenhöhe 20 px (Überlappen), Feld 14 px, Ausgabe wächst mit, Platzhalter fest; läuft beim Bau und bei jeder Änderung dieser Prüfungen.
- **P4** übernommen: Testfälle am Gerät – /0 Versionszeile; iPhone hoch und iPad in xS, Standard, XXXL, AX2, AX5 (Aussehen, nichts abgeschnitten); Wechsel über das Kontrollzentrum bei offener App (oberster Eintrag bleibt, offenes Fenster bleibt); Tagestabelle am iPad ab AX1 als Kästen; Notiz bei AX5 tippen (Feld über der Tastatur, kein Vergrößern bei xS); ‚Einstellungen pro App → Safari‘ (W5); dazu Mac 17 px (G1).
