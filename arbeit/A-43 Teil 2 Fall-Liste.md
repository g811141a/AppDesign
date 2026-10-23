# A-43 Teil 2 ‚Textgröße (Dynamic Type)‘ – Fall-Liste

**Stand 23.10.2026** · Sitzung Reiselogbuch 0036 (angelegt, Durchsprache Fall für Fall) · Klärung und Apple-Abgleich:
`arbeit/A-43 Teil 2 Klärung.md` · Muster: `arbeit/A-43 Teil 2 Muster.html` (Variante A ok, hell und dunkel, iPad und iPhone)

**Entschieden (Nutzer 23.10.2026, Sitzung 0035):** Variante **A wie Apple** – alles wächst bis **AX5 (53 pt)**, Leisten nur bis
23 pt, ab AX1 (28 pt) steht Nebeneinanderliegendes untereinander, auf dem iPhone hoch schon ab 21 pt; Textstile nach Apples
Tabelle (Überschriften wachsen langsamer); **allgemeine Regel: Ja**. Am Gerät bestätigt: `-apple-system-body` meldet die Stufe bis
AX5, wechselt bei offener App, auch auf dem Home-Bildschirm.

Alles ist allgemein (AppDesign `design.css`, `ui.js`, Prüfungen in `tests/`); die App ändert nur eigene Größen und Bausteine
(Reiselogbuch: 6 Schriftgrößen, Tabelle der Tage, Kästen am iPhone).

## 1. Vorgesehene Regeln (Katalog, Designrichtlinie 17)

Vorschlag – wird nach der Durchsprache (Abschnitt 4) angeglichen.

| Regel | Inhalt | Prüfung | Gerät |
|---|---|---|---|
| **R-1.10 neu** | **Textgröße folgt dem Gerät** (Variante A): Grundgröße aus der Einstellung ‚Textgröße‘ (14–53 pt), alle Textstile nach Apples Tabelle, Leisten bis 23 pt, Umbau ab 28 pt (iPhone hoch ab 21 pt), Wechsel sofort; Ausgabe unverändert | hig.mjs – `checkText` in mehreren Größen (P1, P2) | Aussehen in mehreren Stufen, Wechsel bei offener App |

## 2. Fall-Liste

Gerät × Lage × Darstellung: iPad quer und hoch, iPhone hoch und quer, je hell und dunkel, Chromium und WebKit; zusätzlich in den
Textgrößen 14, 17, 23, 33 und 53 px (P1); nach jedem Fall gelten die Grundregeln (`pruefe.mjs`).

### R – Regel

| Nr. | Fall | Erwartet (Vorschlag) | Automatisch |
|---|---|---|---|
| R1 | Neue Katalog-Regel | R-1.10 ‚Textgröße folgt dem Gerät‘ (Abschnitt 1); R-10.2 (mindestens 11 pt) und R-1.3 (Felder mindestens 16 px) bleiben | ja (`checkCatalog`, `checkText`) |

### G – Grundgröße und Textstile

| Nr. | Fall | Erwartet (Vorschlag) | Automatisch |
|---|---|---|---|
| G1 | Grundgröße | `html { font: -apple-system-body }` mit Systemschrift-Familie dahinter; Mac und Chromium 17 px (Rückfall) | ja |
| G2 | Textstile | 11 Stile (Large Title … Caption 2) mit Apples Werten je Stufe (12 Stufen), Rangfolge bleibt | ja |
| G3 | Umsetzung | Stufe aus der Grundgröße, Stile als Variablen; Wechsel ohne Neuladen | ja |
| G4 | Zuordnung | jede der 45 px-Größen in `design.css` und 6 im Reiselogbuch einem Stil zugeordnet; keine Schrift mehr in px (außer Ausgabe) | ja |
| G5 | Kleine Stufen 14–16 pt | Text wird kleiner, nie unter 11 pt (R-10.2); Felder mindestens 16 px (R-1.3) | ja |
| G6 | Zeilenhöhe, Umbruch | Zeilenhöhe als Faktor; Text bricht um statt abgeschnitten (R-6.3), Silbentrennung im Inhalt | ja |

### A – Höhen, Abstände, Icons

| Nr. | Fall | Erwartet (Vorschlag) | Automatisch |
|---|---|---|---|
| A1 | Feste Höhen (44, 32, 36, 48, 60 px) | im Inhalt Mindesthöhen, die mit dem Text wachsen; 44 px bleibt Untergrenze (R-3.1) | ja |
| A2 | Abstände | Innenabstände senkrecht wachsen mit, seitliche Ränder bleiben | ja |
| A3 | Icons | im Inhalt wachsen sie mit dem Text, in Leisten bis 23 pt | ja |

### L – Leisten

| Nr. | Fall | Erwartet (Vorschlag) | Automatisch |
|---|---|---|---|
| L1 | Kopfzeile, Kapsel, Suchzeile, schwebende Knöpfe, Fensterkopf | wachsen nur bis 23 pt (Faktor 23/17), darüber fest | ja |
| L2 | iPhone quer (R-2.4, 32 px) | niedrige Leisten bleiben niedrig | ja |
| L3 | Langer Titel in der Leiste | wird mit … gekürzt, Anzahl darunter bleibt | ja |
| L4 | Großanzeige (Apple: langes Drücken) | gibt es im Web nicht – Abweichung, dafür wachsen Leisten bis 23 pt | – |

### U – Umbau bei großen Größen

| Nr. | Fall | Erwartet (Vorschlag) | Automatisch |
|---|---|---|---|
| U1 | Ab AX1 (28 pt) | Nebeneinanderliegendes steht untereinander (Kachel: Datum unter dem Titel) | ja |
| U2 | iPhone hoch | Umbau schon ab 21 pt | ja |
| U3 | Tabellen (R-6.1) | ab AX1 bzw. iPhone hoch als Karten (Spaltenname über dem Wert), Zebra bleibt | ja |
| U4 | Tabelle der Tage (Reiselogbuch) | mit dem heutigen Aufbau abgleichen (Kästen am iPhone) | ja |
| U5 | Kapseln mit Text, Schrittkopf | brechen um bzw. wischbar (R-5.4); Knöpfe im Schrittkopf unter den Titel (R-5.1) | ja |

### B – Bausteine

| Nr. | Fall | Erwartet (Vorschlag) | Automatisch |
|---|---|---|---|
| B1 | Menüs | Text wächst, Breite wächst mit (bis Bildschirm), Zusatzinfos ab AX1 unter dem Text; passt immer (R-4.5) | ja |
| B2 | Sprechblasen | Text und Knöpfe wachsen, Knöpfe untereinander ab AX1 | ja |
| B3 | Seitenleiste am iPad | Breite und Zeilenhöhe wachsen begrenzt | ja |
| B4 | Fenster | iPad-Fenster breiter bis Bildschirm, iPhone bildschirmfüllend; Notizfeld wächst mit | ja |
| B5 | Eingabefelder | mindestens 16 px, Datums- und Betragsfelder so breit wie ihr Inhalt | ja |
| B6 | Schalter, Smiley-Leiste, Auswahl-Kapsel | Schalter fest (wie Apple), Smileys und Auswahl wachsen | ja |
| B7 | Backup-Kachel, Meldungen, Kapsel unten, Schnellroll-Griff | wachsen mit bzw. bis 23 pt; überdecken nie Leisten (R-3.2) | ja |

### W – Wechsel und Sonstiges

| Nr. | Fall | Erwartet (Vorschlag) | Automatisch |
|---|---|---|---|
| W1 | Einstellung bei offener App ändern | Wechsel sofort, oberster Eintrag bleibt (wie R-8.1), offene Menüs neu ausgerichtet | ja |
| W2 | Drehen bei großer Stufe | Umbau folgt der neuen Breite, oberster Eintrag bleibt | ja |
| W3 | Ausgabe HTML/PDF und Vorschau | unverändert (R-6.2) | ja |
| W4 | Messmodus | notiert die Stufe | ja |
| W5 | Mac, Chromium, eigene Einstellung | 17 px; keine eigene Textgröße in der App | ja |

### P – Prüfungen

| Nr. | Fall | Erwartet (Vorschlag) |
|---|---|---|
| P1 | Schalter `PRUEF_TEXT` (wie `PRUEF_BEDIENUNG`) | Grundregeln in 14, 17, 23, 33, 53 px |
| P2 | Prüfung `checkText` (hig.mjs) | keine Schrift in px, Rangfolge, Leisten bis 23, Umbau ab 28, nichts ragt hinaus, nichts überlappt |
| P3 | Gegenprobe `--gegenprobe text` | je eingeschleustem Fehler genau die passende Meldung rot |
| P4 | Prüfliste am Gerät | Aussehen in mehreren Stufen, Wechsel bei offener App |

## 3. Antworten (Nutzer)

(noch keine)

## 4. Durchsprache Fall für Fall

- **R1** übernommen (Sitzung 0036): neue Regel **R-1.10** ‚Textgröße folgt dem Gerät‘ in Thema 1 (neben R-1.8, R-1.9) – Schrift nach der Einstellung ‚Textgröße‘ (14–53 pt), alle Textstile nach Apples Tabelle, Leisten nur bis 23 pt, ab 28 pt (iPhone hoch ab 21 pt) Nebeneinanderliegendes untereinander, nichts ragt hinaus oder überlappt, Wechsel sofort ohne Neuladen, Ausgabe unverändert (R-6.2); Prüfung hig.mjs – `checkText` in 14, 17, 23, 33, 53 px; Gerät: Aussehen in mehreren Stufen, Wechsel bei offener App. Werte-Tabelle (Stile × Stufen) in Designrichtlinie Abschnitt 3 (Spalte ‚Bau‘); R-10.2 und R-1.3 bleiben als Untergrenzen.
- **G1** übernommen: Grundgröße an `html` – Rückfall `font: 17px/1.45 -apple-system, …`, darüber `@media (pointer: coarse) { html { font: -apple-system-body; line-height: 1.45 } }` (Mac bleibt 17 px; vermutlich 13 px mit `-apple-system-body` – Prüfliste), `body { font-size: 1rem }`, `-webkit-text-size-adjust: 100%` bleibt; Prüfungen setzen die Grundgröße immer selbst (P1). Gemessen: Chromium und WebKit der Prüfumgebung kennen `-apple-system-body` nicht und nehmen den Rückfall 17 px.
- **G2** übernommen: Textstile **wörtlich nach Apples Tabelle** (HIG, 12 Stufen × 11 Stile, Größe und Zeilenabstand; Tabelle in `arbeit/A-43 Teil 2 Aufbereitung.md`) – je Stufe ein Block `html[data-ts="…"]` mit Größe `--t-…` und Faktor `--f-…` (Größe ÷ Standard); ohne Stufe die Standardwerte (Aussehen wie heute); keine lineare Näherung.
- **G3** übernommen: `textStufe()` in ui.js – unsichtbare Probe mit `font-size: 1rem`, beobachtet mit `ResizeObserver` (sofort, ohne Abfrage im Takt), zusätzlich bei `visibilitychange`; Stufe = nächster der 12 Body-Werte → `html[data-ts]` (xs … ax5), Klassen `ts-gross` (ab 21) und `ts-ax` (ab 28); danach wie nach dem Drehen (W1); andere Werte (Mac, Chromium) → Standard. Gerät: Wechsel über das Kontrollzentrum kommt an (Prüfliste).
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
