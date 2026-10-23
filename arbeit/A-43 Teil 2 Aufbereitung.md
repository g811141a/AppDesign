# A-43 Teil 2 ‚Textgröße‘ – Aufbereitung aller Fälle

**Stand 23.10.2026** · Sitzung Reiselogbuch 0036 · vorab aufbereitet auf Wunsch des Nutzers (danach zügige Durchsprache, je Antwort
ein Fall); Ergebnis jeweils in `arbeit/A-43 Teil 2 Fall-Liste.md` Abschnitt 4. Fall 1 (R1) und Fall 2 (G1) sind schon entschieden.

**Quellen:** Apple HIG Typography (JSON der Seite, Stand Änderungsprotokoll 16.12.2025) – Tabelle unten wörtlich; Code: AppDesign
`v4/design.css` (Fassung 4.31.0), `v4/ui.js`, Reiselogbuch `index.html`, Prüfungen `tests/`; Muster `arbeit/A-43 Teil 2 Muster.html`.

**Funde beim Nachsehen (wichtig für mehrere Fälle):**
- `button { line-height: 20px }` (design.css:85), ebenso Blase des Griffs (20 px) und Fenstertitel (28 px) – bei großer Schrift
  liegen Zeilen übereinander (G6).
- Kapseln haben **feste Höhen** (`.grp`, `.navgrp`, `.cap`, `.check.chip`: `height: 44px`) – größere Schrift passt nicht hinein (A1, L1, U5).
- Platzhalter unter der Liste fest 100/120/150 px (`.rolle::after`) – wächst die Backup-Kachel, verdeckt sie den letzten Eintrag (B7).
- Feste Breiten: Menü 340, Untermenü 260, Sprechblase 320/400, Meldung 360, Seitenleiste 340–420, Betragsfeld 130 px (B1–B5).
- `nowrap` ohne Kürzen: Titel der Seitenleiste (`.side-head h2`), Datumszeile der Kachel (`.side-row small`), Kasten-Kopf am
  iPhone (`.step-head > label`) – bei großer Schrift ragen sie hinaus (L3, U1, U5).
- Body auf dem Mac ist 13 pt (HIG ‚Ensuring legibility‘) – bestätigt G1 (Mac bleibt 17 px).

## Apples Tabelle (iOS, iPadOS) – Größe/Zeilenabstand in pt

| Stil | xS | S | M | **L (Standard)** | XL | XXL | XXXL | AX1 | AX2 | AX3 | AX4 | AX5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Large Title | 31/38 | 32/39 | 33/40 | **34/41** | 36/43 | 38/46 | 40/48 | 44/52 | 48/57 | 52/61 | 56/66 | 60/70 |
| Title 1 | 25/31 | 26/32 | 27/33 | **28/34** | 30/37 | 32/39 | 34/41 | 38/46 | 43/51 | 48/57 | 53/62 | 58/68 |
| Title 2 | 19/24 | 20/25 | 21/26 | **22/28** | 24/30 | 26/32 | 28/34 | 34/41 | 39/47 | 44/52 | 50/59 | 56/66 |
| Title 3 | 17/22 | 18/23 | 19/24 | **20/25** | 22/28 | 24/30 | 26/32 | 31/38 | 37/44 | 43/51 | 49/58 | 55/65 |
| Headline (halbfett) | 14/19 | 15/20 | 16/21 | **17/22** | 19/24 | 21/26 | 23/29 | 28/34 | 33/40 | 40/48 | 47/56 | 53/62 |
| Body | 14/19 | 15/20 | 16/21 | **17/22** | 19/24 | 21/26 | 23/29 | 28/34 | 33/40 | 40/48 | 47/56 | 53/62 |
| Callout | 13/18 | 14/19 | 15/20 | **16/21** | 18/23 | 20/25 | 22/28 | 26/32 | 32/39 | 38/46 | 44/52 | 51/60 |
| Subhead | 12/16 | 13/18 | 14/19 | **15/20** | 17/22 | 19/24 | 21/28 | 25/31 | 30/37 | 36/43 | 42/50 | 49/58 |
| Footnote | 12/16 | 12/16 | 12/16 | **13/18** | 15/20 | 17/22 | 19/24 | 23/29 | 27/33 | 33/40 | 38/46 | 44/52 |
| Caption 1 | 11/13 | 11/13 | 11/13 | **12/16** | 14/19 | 16/21 | 18/23 | 22/28 | 26/32 | 32/39 | 37/44 | 43/51 |
| Caption 2 | 11/13 | 11/13 | 11/13 | **11/13** | 13/18 | 15/20 | 17/22 | 20/25 | 24/30 | 29/35 | 34/41 | 40/48 |

Body-Größe je Stufe (= `-apple-system-body`): 14 · 15 · 16 · **17** · 19 · 21 · 23 · 28 · 33 · 40 · 47 · 53. Kleinste Schrift 11 pt (R-10.2).
Das Muster hat linear genähert (Standard → AX5) – Abweichung bis 3 pt (Large Title AX1: Muster 41,9, Apple 44).

---

## Fall 3 von 35: G2 – Textstile nach Apples Tabelle

**Worum es geht:** Welche Größen die einzelnen Textarten in jeder Stufe bekommen.

**Aktuell:** feste px-Größen, die bei Standard schon fast Apples Stilen entsprechen (34 Large Title, 28 Title 1, 20 Title 3, 17 Body/Headline,
15 Subhead, 13 Footnote); dazu Größen ohne Apple-Stil (19, 14, 18, 24). Das Muster rechnet linear.

**Apple-Standard:** 11 Textstile, je Stufe feste Werte für Größe und Zeilenabstand (Tabelle oben); Überschriften wachsen langsamer als Text.

**Meine Idee:** die Tabelle wörtlich in `design.css`: je Stufe ein Block `html[data-ts="ax3"] { --t-large: 52px; --t-title1: 48px; … }`
mit Größe `--t-…` und Faktor `--f-…` (= Größe ÷ Standardgröße des Stils) für alle 11 Stile; ohne Stufe gelten die Standardwerte (heutiges
Aussehen unverändert). Keine Näherung.

**Meine Empfehlung:** Übernehmen – Apples Werte wörtlich, 12 Stufen × 11 Stile.

**Alternative:** lineare Näherung wie im Muster (eine Formel statt Tabelle; bis 3 pt Abweichung).

---

## Fall 4 von 35: G3 – Umsetzung: Stufe erkennen und Wechsel bemerken

**Worum es geht:** Wie die App die Stufe kennt und merkt, dass sie sich ändert (auch über das Kontrollzentrum bei offener App).

**Aktuell:** nichts. Das Muster fragt alle 2 s und bei Fokus/Sichtbarkeit/Größenänderung die Probe ab – am Gerät erfolgreich.

**Apple-Standard:** das System meldet den Wechsel (`UIContentSizeCategory.didChangeNotification`), Texte passen sich sofort an.

**Meine Idee:** in ui.js `textStufe()`: eine unsichtbare Probe mit `font-size: 1rem`, beobachtet mit `ResizeObserver` – ändert Safari die
Grundgröße, ändert sich die Probe und das meldet sich sofort, **ohne Abfragen im Takt**; zusätzlich bei `visibilitychange`. Die Stufe ist der
nächste der 12 Body-Werte → `html[data-ts]` (xs … ax5) und Klassen `ts-gross` (ab 21) und `ts-ax` (ab 28); danach dasselbe wie nach
dem Drehen (W1). Andere Werte (Mac, Chromium) → Standard.

**Meine Empfehlung:** Übernehmen – `ResizeObserver` plus Sichtbarkeit; am Gerät prüfen, ob der Wechsel über das Kontrollzentrum ankommt.

**Alternative:** Abfrage alle 2 s wie im Muster (am Gerät erprobt, kostet etwas Rechenzeit).

---

## Fall 5 von 35: G4 – Zuordnung jeder Schriftgröße zu einem Stil

**Worum es geht:** Jede der 45 festen Größen in `design.css` und 6 im Reiselogbuch bekommt ihren Stil.

**Aktuell (Auszug):** 34 `.ltitle` · 28 `h1` · 20 `h2`, `.side-head h2`, `.pnav-head`, `.kosten span` · 19 `.dlg-head h3`, `.emptymain` · 17
`.nb-title`, `.pnav-title`, `.side-row b`, `.menu .mi`, Knöpfe, `th` · 15 `.side-row small`, `.menu .val`, `.pop p`, `.chips`, `.nettoast` · 14
`.hint`, `.step-num`, `.progress` · 13 `.chg`, `.sub`, `.note`, `.saved`, `.box .kv .k`, `.bhint` · 12 `.tag` · Symbole 18/20/24 (Mikrofon,
Pfeile, Smileys). Ausgabe in pt (`outputCss`).

**Apple-Standard:** jeder Text hat einen Stil (Body, Headline, Subhead …), nie eine eigene Größe.

**Meine Idee:** Größen gleich einem Apple-Stil bekommen ihn (34 Large Title, 28 Title 1, 20 Title 3, 17 Body bzw. fett Headline, 15 Subhead,
13 Footnote, 12 Caption 1). Größen ohne Stil **behalten ihre Standardgröße** und wachsen mit dem Faktor des nächsten Stils: 19 → Title 3,
14 → Subhead, Symbole → A3/B6. Dann ändert sich bei Standard **nichts** am heutigen Aussehen. Keine Schrift mehr in px (außer Ausgabe).

**Meine Empfehlung:** Übernehmen – Standard sieht aus wie heute, alles wächst nach Apple.

**Alternative:** Größen ohne Stil auf den Apple-Stil setzen (Fenstertitel 19 → 17 wie am iPhone und bei Apple, Hinweise 14 → 15) – sichtbar
anders bei Standard.

---

## Fall 6 von 35: G5 – Kleine Stufen (14–16 pt) und Untergrenzen

**Worum es geht:** Stellt jemand ‚kleiner‘ ein, wird der Text kleiner – Felder dürfen aber nicht unter 16 px (sonst vergrößert iOS).

**Aktuell:** R-1.3 (Felder ≥ 16 px), R-10.2 (≥ 11 pt), beide mit Prüfung in hig.mjs.

**Apple-Standard:** drei kleinere Stufen (xS 14, S 15, M 16), nie unter 11 pt (Caption bleibt 11).

**Meine Idee:** kleine Stufen wie Apple; Felder `max(16px, Body)` – bei xS steht der Feldtext also etwas größer als der Text daneben
(Abweichung, nötig wegen Safari). 11 pt sind durch Apples Tabelle gesichert.

**Meine Empfehlung:** Übernehmen.

**Alternative:** nie kleiner als Standard (Grundgröße mindestens 17 px) – ‚kleiner‘ wirkt dann nicht.

---

## Fall 7 von 35: G6 – Zeilenhöhe und Umbruch

**Worum es geht:** Zeilen dürfen bei großer Schrift nicht übereinanderliegen, lange Wörter sollen ordentlich umbrechen.

**Aktuell:** Text 1.45; **Knöpfe fest 20 px Zeilenhöhe**, Blase des Griffs 20 px, Fenstertitel 28 px (überlappen ab etwa 23 pt);
`overflow-wrap: anywhere` (bricht mitten im Wort ohne Strich).

**Apple-Standard:** Zeilenabstand je Stil und Stufe (Tabelle; Body 22/17 = 1,29 bis 62/53 = 1,17); Text bricht um statt abgeschnitten zu werden.

**Meine Idee:** keine Zeilenhöhe in px mehr – Knöpfe und Titel `1.2`; Text behält 1.45 bei Standard und wird bei großen Stufen enger wie
bei Apple (AX5 etwa 1,31: 1.45 × Apples Verhältnis). Silbentrennung (`hyphens: auto`, `lang="de"`) in Kacheln, Kästen, Tabellen, Fenstern;
`overflow-wrap: anywhere` bleibt als letzter Ausweg (R-6.3).

**Meine Empfehlung:** Übernehmen.

**Alternative:** Apples Zeilenabstände wörtlich (Text bei Standard 1,29 statt 1,45 – sichtbar enger als heute).

---

## Fall 8 von 35: A1 – Feste Höhen

**Worum es geht:** Was fest 44 px hoch ist, muss größere Schrift aufnehmen können.

**Aktuell:** Mindesthöhen (Knöpfe, Felder 44, Menüeintrag 46, Schalterzeile 52, Kachel 60, Notiz 96) wachsen schon mit dem Inhalt;
**feste Höhen** (Kapseln 44, Options-Kapsel 44, Schrittnummer 26, Smiley-Knopf 44) nicht.

**Apple-Standard:** Zeilen wachsen mit dem Text, 44 pt bleibt die Untergrenze.

**Meine Idee:** im Inhalt jede feste Höhe → Mindesthöhe; Untergrenzen bleiben (44 usw., R-3.1); Kreise (Schrittnummer, runde Knöpfe) wachsen
mit ihrem Inhalt und bleiben Kreise (R-3.1). Leisten: L1.

**Meine Empfehlung:** Übernehmen.

**Alternative:** auch die Untergrenzen wachsen mit (44 × Faktor) – Zeilen werden sehr hoch, wenig passt auf den Bildschirm.

---

## Fall 9 von 35: A2 – Abstände

**Worum es geht:** Wachsen die Abstände mit dem Text?

**Aktuell:** alle Abstände fest in px (z. B. Kachel 12/16, Menü 0/16).

**Apple-Standard:** Abstände zwischen Textzeilen wachsen mit (skalierte Maße), seitliche Ränder bleiben.

**Meine Idee:** wie im Muster (ok): **senkrechte** Innenabstände von Kacheln, Kästen, Menüeinträgen wachsen mit dem Body-Faktor,
**seitliche** Ränder und sichere Ränder bleiben fest.

**Meine Empfehlung:** Übernehmen (wie Muster A).

**Alternative:** alle Abstände fest – nur der Text wird größer, Zeilen wirken bei AX gedrängt.

---

## Fall 10 von 35: A3 – Icons

**Worum es geht:** Icons sollen zum Text passen.

**Aktuell:** `.ic` fest 20 × 20, Pfeile 20, Mikrofon 18.

**Apple-Standard:** SF Symbols wachsen mit ihrem Textstil.

**Meine Idee:** Icons im Inhalt (Kacheln, Menüs, Felder, Kästen) wachsen mit dem Body-Faktor (20 → 62 bei AX5); in Leisten bis 23 pt (L1);
runde Icon-Knöpfe im Inhalt = Icon + Luft, mindestens 44.

**Meine Empfehlung:** Übernehmen.

**Alternative:** Icons bleiben überall 20 px.

---

## Fall 11 von 35: L1 – Leisten bis 23 pt

**Worum es geht:** Was zu den Leisten gehört und wie weit sie wachsen.

**Aktuell:** Kopfzeile (`.nb`, iPhone `.pnav`), Suchzeile, Kapseln und runde Knöpfe darin (44), Seitenleisten-Kopf, Fensterkopf, untere Leiste
am iPhone (`.bbar`), Kapsel Nach oben/Ans Ende, Schnellroll-Griff – alles fest.

**Apple-Standard:** Leisten wachsen nicht; dafür Großanzeige (L4).

**Meine Idee (Muster A, ok):** diese Leisten wachsen mit, aber **höchstens bis Stufe XXXL (23 pt)** – Texte bis 23, Knöpfe und Kapseln
44 → höchstens 60 px, Icons bis 27; ab AX bleiben sie so. Suchfeld-Text mindestens 16 px.

**Meine Empfehlung:** Übernehmen.

**Alternative:** Leisten bleiben ganz fest (wie Apple, aber ohne Großanzeige).

---

## Fall 12 von 35: L2 – iPhone quer: niedrige Leisten

**Worum es geht:** R-2.4: quer sind Leisten 32 px, damit Felder und Suche mit Tastatur in der oberen Hälfte liegen (R-4.5).

**Aktuell:** 32 px (Knöpfe 31/32, Suchfeld 32).

**Apple-Standard:** quer bleiben Leisten niedrig, auch bei großer Schrift.

**Meine Idee:** iPhone quer wachsen die Leisten **nicht** (32 px, Titel 17) – sonst passt mit Tastatur nichts mehr.

**Meine Empfehlung:** Übernehmen.

**Alternative:** auch quer bis 23 pt (32 → 43 px) – Konflikt mit R-4.5 bei offener Tastatur.

---

## Fall 13 von 35: L3 – Langer Titel in der Leiste

**Worum es geht:** Titel und Anzahl in Leisten bei großer Schrift.

**Aktuell:** Kopf- und iPhone-Titel einzeilig mit …; **Seitenleisten-Titel einzeilig ohne Kürzen** (ragt hinaus); Fenstertitel am iPad bricht um.

**Apple-Standard:** Titel in Leisten einzeilig, mit … gekürzt; großer Titel im Inhalt bricht um.

**Meine Idee:** alle Titel in Leisten einzeilig mit … (auch Seitenleiste, Fensterkopf am iPad, Anzahl darunter); großer Titel `.ltitle` im
Inhalt bricht um (wie heute). VoiceOver liest den ganzen Titel.

**Meine Empfehlung:** Übernehmen.

**Alternative:** Titel in Leisten zweizeilig, erst dann …

---

## Fall 14 von 35: L4 – Großanzeige

**Worum es geht:** Apple zeigt bei großen Stufen beim langen Drücken auf einen Leisten-Knopf eine große Kachel mit Icon und Name.

**Aktuell:** gibt es nicht; im Web nicht eingebaut.

**Apple-Standard:** Large Content Viewer ab AX1 für Leisten-Knöpfe.

**Meine Idee:** **nicht nachbauen** – als Abweichung festhalten: dafür wachsen Leisten bis 23 pt (L1), VoiceOver nennt jeden Knopf (R-1.8).

**Meine Empfehlung:** Übernehmen (Abweichung festhalten, nicht nachbauen).

**Alternative:** nachbauen (langes Drücken ab AX1 zeigt Icon und Name groß in der Mitte) – eigenes Backlog-Thema.

---

## Fall 15 von 35: U1 – Umbau ab AX1 (28 pt)

**Worum es geht:** Nebeneinanderliegendes, das sich sonst quetschen würde, steht untereinander.

**Aktuell:** Kachel: Titel, Datum (einzeilig, ragt bei AX hinaus), ‚geändert am‘; Menü: Wert rechts; Kasten: Bezeichnung links 74 px fest;
Reisedaten `.meta` zweispaltig; Datumsfelder `.pair` brechen schon um.

**Apple-Standard:** bei AX stehen Wert und Zusatz unter dem Text (Mail: Absender, Datum untereinander; Einstellungen: Wert unter der Zeile).

**Meine Idee:** mit `html.ts-ax`: Datum der Kachel unter den Titel (wie Muster), Menü-Wert unter den Text, Kasten-Bezeichnung über dem
Wert, `.meta` untereinander; Pfeil › bleibt rechts oben.

**Meine Empfehlung:** Übernehmen.

**Alternative:** nur Kacheln umbauen, Menüs und Kästen bleiben nebeneinander.

---

## Fall 16 von 35: U2 – iPhone hoch schon ab 21 pt

**Worum es geht:** Am schmalen iPhone wird es früher eng.

**Aktuell:** nichts; Muster ok: ab 21 pt (XXL) Datum unter dem Titel.

**Apple-Standard:** Apple baut je nach Platz um; Schwelle ist nicht fest.

**Meine Idee:** iPhone hoch (`html.phone`, hochkant) gilt U1 schon ab 21 pt (`ts-gross`); iPhone quer und iPad ab 28 pt.

**Meine Empfehlung:** Übernehmen (wie Muster).

**Alternative:** überall erst ab 28 pt.

---

## Fall 17 von 35: U3 – Tabellen in der App als Kästen

**Worum es geht:** Mehrspaltige Tabellen passen bei großer Schrift nicht.

**Aktuell:** R-6.1 (Tabelle mit Kopf, Linien, Zebra); am iPhone gibt es schon den Baustein Kasten (`.box` mit `.kv`).

**Apple-Standard:** iOS kennt keine Tabellen, nur Listen; bei großer Schrift untereinander.

**Meine Idee:** allgemeine Regel: ab AX1 (iPhone hoch immer) zeigt jede Tabelle im Inhalt ihre Zeilen als **Kästen** (Baustein `.box`,
Bezeichnung über dem Wert, U1); Vorschau und Ausgabe bleiben Tabellen (R-6.2, seitlich wischen).

**Meine Empfehlung:** Übernehmen (vorhandener Baustein statt CSS-Umbau wie im Muster).

**Alternative:** CSS-Umbau der Tabelle wie im Muster (Zellen untereinander, Spaltenname davor) – ohne neuen Aufbau, aber eigene Gestaltung.

---

## Fall 18 von 35: U4 – Tabelle der Tage (Reiselogbuch)

**Worum es geht:** Die Tagestabelle am iPad bei großer Schrift.

**Aktuell:** iPhone (hoch und quer) zeigt die Tage schon als Kästen (`renderPhone`, `.box.day`); iPad als `table.days` (Tag mit Wetter, Quartier,
Verlauf, Smileys).

**Apple-Standard:** wie U3.

**Meine Idee:** iPad ab AX1 zeigt dieselben Kästen wie das iPhone (Kopf: Datum, Hinweise, Wetter – Wetter ab AX unter dem Datum); Umschalten
beim Wechsel der Stufe mit gleichem oberstem Tag (W1); Liste steht still und Position beim Öffnen (R-7.3, R-7.4) gelten wie am iPhone.

**Meine Empfehlung:** Übernehmen.

**Alternative:** iPad behält die Tabelle, sie wischt seitlich.

---

## Fall 19 von 35: U5 – Kapseln mit Text und Schrittkopf

**Worum es geht:** Auswahl-Kapsel, Options-Kapseln und Kasten-Kopf bei großer Schrift.

**Aktuell:** Auswahl-Kapsel einzeilig, wischbar (R-5.4), **Höhe fest 44**; Options-Kapsel fest 44; Schrittkopf: Gruppe rückt unter den Titel
(R-5.1); am iPhone Kasten-Titel **einzeilig ohne Kürzen** (ragt hinaus).

**Apple-Standard:** Text in Bedienelementen wächst, sie werden höher; was nicht passt, steht darunter.

**Meine Idee:** Kapseln mit Mindest- statt fester Höhe (A1); Auswahl bleibt einzeilig wischbar; Options-Kapseln brechen als Gruppe um;
Kasten-Titel darf umbrechen; ab AX1 stehen die Knöpfe des Schrittkopfs immer unter dem Titel.

**Meine Empfehlung:** Übernehmen.

**Alternative:** Auswahl-Kapsel ab AX1 als Raster (mehrzeilig, ohne Wischen).

---

## Fall 20 von 35: B1 – Menüs

**Worum es geht:** Menü und Untermenü bei großer Schrift.

**Aktuell:** Breite fest 340 (Untermenü 260), Eintrag 46 hoch, Wert rechts 15, Zusatzinfos 13; Untermenü rollt, wenn zu hoch.

**Apple-Standard:** Menüs werden breiter (bis zur Bildschirmbreite), Einträge brechen um, das Menü rollt.

**Meine Idee:** Breite wächst mit dem Body-Faktor bis zur Breite des Bildschirms (minus Ränder), Einträge brechen um, Icons wachsen (A3),
Wert ab AX1 darunter (U1); jedes Menü rollt, wenn zu hoch (R-4.5).

**Meine Empfehlung:** Übernehmen.

**Alternative:** Breite fest, Einträge brechen nur um.

---

## Fall 21 von 35: B2 – Sprechblasen

**Worum es geht:** Abfragen bei großer Schrift.

**Aktuell:** Breite 320/400, iPhone quer 640 mit Knöpfen nebeneinander; Text 15 (Subhead).

**Apple-Standard:** Abfragen wachsen, Knöpfe stehen bei großer Schrift untereinander, der Inhalt rollt.

**Meine Idee:** Breite wächst wie B1; ab AX1 Knöpfe und Kacheln immer untereinander (auch iPhone quer); zu hoch → rollt (R-4.5).

**Meine Empfehlung:** Übernehmen.

**Alternative:** Breite fest, nur höher.

---

## Fall 22 von 35: B3 – Seitenleiste am iPad

**Worum es geht:** Breite und Kacheln der Seitenleiste.

**Aktuell:** Breite nach Inhalt 340–420 px, Kachel ab 60 hoch; Kopf = Leiste (L1).

**Apple-Standard:** die Seitenleiste wird bei großer Schrift etwas breiter, Zeilen höher.

**Meine Idee:** Mindestbreite 340 bleibt, Höchstbreite wächst mit dem Body-Faktor bis höchstens 40 % der Breite (quer, fest) bzw. 70 %
(hoch, darübergelegt); Kacheln wachsen mit dem Inhalt (A1, A2, U1).

**Meine Empfehlung:** Übernehmen.

**Alternative:** Breite fest 340–420 (bei AX5 passen nur wenige Buchstaben je Zeile).

---

## Fall 23 von 35: B4 – Fenster

**Worum es geht:** Fenster am iPad und iPhone bei großer Schrift.

**Aktuell:** iPad mindestens 480 px (bis 90 %), breit 1100, Meldung 360; iPhone bildschirmfüllend; Notizfeld ab 96 hoch, wächst mit.

**Apple-Standard:** Formularblätter bleiben, der Inhalt rollt; Text wächst.

**Meine Idee:** iPad-Fenster und Meldung: Mindestbreite wächst mit dem Body-Faktor bis 90 % (wie Muster); iPhone bleibt bildschirmfüllend;
Notizfeld Mindesthöhe etwa 4 Zeilen (wächst mit), Fensterkopf = Leiste (L1).

**Meine Empfehlung:** Übernehmen.

**Alternative:** Fensterbreite fest wie heute.

---

## Fall 24 von 35: B5 – Eingabefelder

**Worum es geht:** Felder, Datums- und Betragsfelder, ⓧ.

**Aktuell:** Felder ab 44 hoch (wachsen mit); Datumsfeld so breit wie das Datum (Reiselogbuch misst mit der Schrift – wächst mit);
**Betragsfeld fest 130 px** (bei AX zu schmal); ⓧ 44 mit Zeichen 20.

**Apple-Standard:** Felder wachsen mit dem Text.

**Meine Idee:** Feldtext `max(16px, Body)` (G5); Betragsfeld in Zeichenbreite (`ch`) statt px; ⓧ-Zeichen wächst (A3), Antippfläche mindestens 44
(R-5.6); Kalender-Icon wächst.

**Meine Empfehlung:** Übernehmen.

**Alternative:** Betragsfeld wie Datumsfeld vermessen (genauer, mehr Code).

---

## Fall 25 von 35: B6 – Schalter, Smileys, Auswahl, Häkchen-Felder

**Worum es geht:** Bedienelemente mit fester Grafik.

**Aktuell:** Schalter 51 × 31 (bzw. von Safari gezeichnet), Smiley/Wetter 24 in 44er-Knöpfen (am iPhone Wetter 40 breit), Markierung 36,
Häkchen-Feld 24.

**Apple-Standard:** Schalter wachsen nicht; Emojis und Symbole wachsen mit dem Text.

**Meine Idee:** Schalter fest; Smileys, Wetter, Markierung und Häkchen-Feld wachsen mit dem Body-Faktor; passen sie nicht, wischt die Kapsel
seitlich (R-5.4, auch Wetter am iPhone).

**Meine Empfehlung:** Übernehmen.

**Alternative:** Smileys und Wetter bleiben fest (immer alle sieben ohne Wischen).

---

## Fall 26 von 35: B7 – Backup-Kachel, Meldungen, Kapsel unten, Griff

**Worum es geht:** Was fest am Rand liegt.

**Aktuell:** Backup-Kachel (13 + Knopf 17) fest unten, Platzhalter unter der Liste **fest 100/120/150 px**; Meldung ‚Du bist offline‘ 15/13 bis
420 breit; Kapsel unten und Griff fest.

**Apple-Standard:** Leisten am Rand wachsen nicht; Meldungen wachsen mit dem Text.

**Meine Idee:** Backup-Kachel, untere Leiste, Kapsel unten und Griff = Leiste (bis 23 pt, L1); Platzhalter unter der Liste aus der
**gemessenen** Höhe der Kachel, damit der letzte Eintrag erreichbar bleibt (R-7.1); Meldung wächst mit (bis Bildschirmbreite).

**Meine Empfehlung:** Übernehmen.

**Alternative:** Backup-Kachel wächst voll mit (bis AX5) – nimmt am iPhone viel Höhe.

---

## Fall 27 von 35: W1 – Wechsel bei offener App

**Worum es geht:** Was passiert, wenn die Textgröße bei offener App wechselt (Kontrollzentrum).

**Aktuell:** am Gerät bestätigt: Safari meldet den Wechsel ohne Neuladen.

**Apple-Standard:** sofort, Inhalt bleibt an seiner Stelle.

**Meine Idee:** nach dem Erkennen (G3) dasselbe wie beim Drehen (R-8.1): oberster Eintrag bleibt, Leisten- und Fensterhöhen neu,
offenes Fenster bleibt offen (Eingabe, Fokus, Tastatur bleiben), Menüs und Sprechblasen neu ausgerichtet, Tabelle ↔ Kästen (U4).

**Meine Empfehlung:** Übernehmen.

**Alternative:** Wechsel erst beim nächsten Öffnen der App.

---

## Fall 28 von 35: W2 – Drehen bei großer Stufe

**Worum es geht:** Drehen ändert am iPhone die Schwelle (hoch 21, quer 28).

**Aktuell:** R-8.1 mit Drehprüfung jeder Ansicht.

**Apple-Standard:** Drehen ordnet neu, Inhalt bleibt.

**Meine Idee:** Umbau folgt der neuen Lage, oberster Eintrag bleibt; die Drehprüfung läuft zusätzlich bei 33 und 53 px (P1).

**Meine Empfehlung:** Übernehmen.

**Alternative:** –

---

## Fall 29 von 35: W3 – Ausgabe HTML/PDF und Vorschau

**Worum es geht:** Die Ausgabe ist ein Dokument, keine Bedienung.

**Aktuell:** `outputCss` in pt (11 pt, Titel 20 pt) – hängt nicht an der Grundgröße.

**Apple-Standard:** Dokumentinhalte folgen nicht der Textgröße (nur die Bedienung).

**Meine Idee:** Ausgabe, Vorschau-Inhalt und Druck unverändert (R-6.2); der Rahmen der Vorschau (Fensterkopf) folgt L1. Prüfung: Ausgabe bei
17 und 53 px identisch.

**Meine Empfehlung:** Übernehmen.

**Alternative:** Vorschau wächst mit (weicht von der Datei ab, R-6.4).

---

## Fall 30 von 35: W4 – Messmodus

**Worum es geht:** Messungen sollen die Stufe kennen.

**Aktuell:** Kopfzeile der Messung mit Gerät, Home-Bildschirm, Rändern, hell/dunkel.

**Apple-Standard:** –

**Meine Idee:** Kopfzeile nennt ‚Text <Stufe> <px>‘, ein Wechsel wird als Ereignis notiert (‚text l → ax2‘).

**Meine Empfehlung:** Übernehmen.

**Alternative:** –

---

## Fall 31 von 35: W5 – Mac, Chromium, eigene Einstellung

**Worum es geht:** Andere Geräte und ob die App eine eigene Textgröße braucht.

**Aktuell:** keine Einstellung; Mac und Chromium 17 px (G1).

**Apple-Standard:** keine eigene Textgröße in Apps; iOS hat ‚Einstellungen pro App‘ (Bedienungshilfen) – gilt vermutlich auch für Safari bzw.
die Web-App.

**Meine Idee:** keine eigene Einstellung in der App; Mac und Chromium Standard; am Gerät prüfen, ob ‚Einstellungen pro App → Safari‘ wirkt.

**Meine Empfehlung:** Übernehmen.

**Alternative:** Textgröße zusätzlich im Mehr-Menü übersteuerbar (wie Darstellung, R-1.2).

---

## Fall 32 von 35: P1 – Schalter `PRUEF_TEXT`

**Worum es geht:** Die Prüfungen müssen in mehreren Größen laufen; Playwright kennt keine Textgröße.

**Aktuell:** alles bei 17 px; Teil 1 bringt `PRUEF_BEDIENUNG=beide` (noch nicht gebaut).

**Apple-Standard:** App Store prüft kleine, mittlere, große und sehr große Bedienungshilfe-Größen.

**Meine Idee:** `PRUEF_TEXT=<px>` in `pruefe.mjs` – `t.seite()` setzt die Grundgröße vor dem Laden (Ort mit Zusatz ‚· Text 53‘). Im vollen
Lauf: hig zusätzlich bei 14, 23, 33, 53 (alle vier Ansichten, mit Drehen), die Abläufe mit Bewegung (Navigation, Fenster, iPhone, Suche,
Seitenleiste) bei 53; Mehrzeit beim Bau messen.

**Meine Empfehlung:** Übernehmen.

**Alternative:** nur 17 und 53 (schneller, kleine und mittlere Stufen ungeprüft).

---

## Fall 33 von 35: P2 – Prüfung `checkText` (hig.mjs)

**Worum es geht:** Was die neue Prüfung zu R-1.10 misst.

**Aktuell:** R-6.3 (nichts ragt hinaus), R-10.2 (≥ 11), R-1.3 (Felder ≥ 16), R-1.7/R-3.2 (nichts unter Leisten) prüfen schon Teile.

**Apple-Standard:** kein Überlappen, kein starkes Abschneiden, Haupttext mindestens 200 %.

**Meine Idee:** `checkText`: (1) keine Schriftgröße in px in den Stilen der App (außer Ausgabe/Druck); (2) bei 53 jeder Text mindestens so groß
wie bei 17 und genau Apples Wert seines Stils (±1); (3) Leisten höchstens 23-pt-Maß, iPhone quer 32; (4) bei AX keine Tabelle im Inhalt,
Nebeneinanderliegendes untereinander; (5) **neue Grundregel ‚nichts überlappt‘** (Textzeilen und Knöpfe schneiden sich nicht – fände die
20-px-Zeilenhöhe); dazu die bestehenden Prüfungen in jeder Größe.

**Meine Empfehlung:** Übernehmen.

**Alternative:** ohne die Grundregel ‚nichts überlappt‘ (nur R-6.3).

---

## Fall 34 von 35: P3 – Gegenprobe `--gegenprobe text`

**Worum es geht:** Beweisen, dass die Prüfung Fehler findet.

**Aktuell:** Gegenproben `1`, `grundregeln`, in Teil 1 `bedienung`.

**Apple-Standard:** –

**Meine Idee:** wie `bedienung`: je Lauf ein eingeschleuster Fehler, genau die passende Meldung rot – Schrift in px, Leiste ungedeckelt,
Tabelle bei AX, Zeilenhöhe 20 px (Überlappen), Feld 14 px, Ausgabe wächst mit, Platzhalter fest; beim Bau und bei Änderung dieser Prüfungen.

**Meine Empfehlung:** Übernehmen.

**Alternative:** nur die allgemeine Gegenprobe `grundregeln`.

---

## Fall 35 von 35: P4 – Prüfliste am Gerät

**Worum es geht:** Was nur das Gerät zeigt.

**Aktuell:** Versuch am Gerät war ok (Stufe bis AX5, Wechsel bei offener App, Home-Bildschirm).

**Apple-Standard:** Prüfen in kleinen bis sehr großen Stufen.

**Meine Idee:** Prüfliste: /0 Versionszeile; iPhone hoch und iPad in xS, Standard, XXXL, AX2, AX5 (Aussehen, nichts abgeschnitten);
Wechsel über das Kontrollzentrum bei offener App (oberster Eintrag bleibt, offenes Fenster bleibt); Tagestabelle am iPad ab AX1 als Kästen;
Notiz bei AX5 tippen (Feld über der Tastatur, kein Vergrößern bei xS); ‚Einstellungen pro App → Safari‘ (W5).

**Meine Empfehlung:** Übernehmen.

**Alternative:** –
