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
