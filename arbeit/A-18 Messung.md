# A-18 / T-91 – Tastatur im Fenster ‚Tag‘ · Plan der Messung

**Stand 17.10.2026** · Sitzung Reiselogbuch 0010

## Was springt (vermutet)

Tippst du im Fenster ‚Tag‘ auf ein Feld, fährt die Tastatur in etwa 0,3 s hoch. Dabei geschieht Folgendes:

1. Safari meldet bei **jedem Schritt** `visualViewport` resize/scroll. `placeDialogs` setzt das Fenster jedes Mal neu
   in die Mitte des kleiner werdenden Bereichs → das Fenster wandert in vielen kleinen Sprüngen.
2. Safari schiebt zugleich die **Seite dahinter** (trotz Sperre), damit das Feld sichtbar ist → die Tabelle bewegt sich.
3. Nach 350 ms rollt `scrollIntoView` das Feld noch einmal → ein letzter Ruck.

Die Prüfung `checkListStill` setzt nur den Endzustand der Tastatur, deshalb sieht sie die Zwischenschritte nicht.

## Messseite (nur zum Messen, keine App-Änderung)

`messen/tastatur.html` in AppDesign, erreichbar über GitHub Pages. Sie baut auf der Vorlage auf (echtes `ui.js` der Fassung 4.22.0).

- Hinten eine lange Tabelle (60 Zeilen) wie die Tage im Reiselogbuch, mit haftendem Kopf.
- Antippen einer Zeile öffnet ein Fenster wie ‚Tag‘: einzeilige Felder und ein großes Textfeld (‚Verlauf‘).
- Ein Protokoll zeichnet ab dem Antippen eines Feldes 2 s lang jede Änderung auf: Zeit in ms, `visualViewport`
  (Höhe, offsetTop), `scrollY` der Seite, Oberkante des Fensters, Feld sichtbar ja/nein, und wer es ausgelöst hat
  (resize, scroll, 350 ms).
- **Drei Versuche**, umschaltbar oben auf der Seite:
  - **A – wie heute:** zum Vergleich mit der App.
  - **B – Fenster erst setzen, wenn die Tastatur steht:** während die Tastatur fährt, bleibt das Fenster stehen;
    sobald 150 ms lang nichts kommt, wird es einmal gesetzt.
  - **C – Fenster oben verankern:** das Fenster steht bei offener Tastatur oben im sichtbaren Bereich statt in der Mitte,
    dadurch muss es kaum wandern.
- Schaltfläche **‚Protokoll kopieren‘** – den Text fügst du hier im Chat ein.

## Was du tust (ca. 5 Minuten, iPad quer)

1. Seite öffnen, Versuch A, Zeile antippen, ins Textfeld tippen, Tastatur abwarten, ‚Protokoll kopieren‘, im Chat einfügen.
2. Dasselbe mit B und C. Sag dazu kurz, wie es sich angefühlt hat (springt / ruhig).
3. Wenn du magst: dasselbe einmal hochkant.

Aus dem Protokoll und deinem Eindruck mache ich dann die Fall-Liste für die Korrektur (AppDesign 4.22.1, R-7.3 erweitert),
dazu eine Prüfung, die die Tastatur **schrittweise** nachbildet, nicht nur ihren Endzustand.

## Veröffentlichung

Die Messseite liegt in AppDesign `main` (Ordner `messen/`). Sie ist keine Version und keine Fassung, und keine App lädt sie.
Nach der Korrektur wird sie gelöscht.

## Ergebnisse

**Messung 1 – Versuch A, 580 × 522 (iPhone-Aufbau), iOS 26.6.2:**
Tastatur in einem Schritt (121 ms, vv 522 → 290, oben 142); Seite dahinter rollt 132 px (`scrollY` 1747 → 1879), Fenster
für ~2 ms bei −142, dann richtig; 350 ms ohne Wirkung.

**Messung 2 – Versuch A, iPad quer 1194 × 777, iOS 26.6.2 – Eindruck: ruhig.**

```
    ms	vv-Höhe	vv-oben	scrollY	Fenster	Zeile	Feld sichtbar	Auslöser
    0	777	0	2394	31	497	ja	Antippen
  154	349	0	2394	31	497	nein	vv resize
  156	349	0	2394	10	497	ja	Bild
  170	349	146	2540	-136	351	nein	vv scroll
  171	349	146	2540	10	351	ja	Bild
  361	349	146	2540	10	351	ja	350 ms (scrollIntoView)
 1185	349	145	2539	11	352	ja	vv scroll
 1188	349	145	2539	10	352	ja	Bild
```

Befund: Die Tastatur meldet sich in **zwei** Schritten (Größe nach 154 ms, Verschiebung um 146 px nach 170 ms); das Fenster steht
jeweils nach 1–2 ms wieder richtig. Die Seite dahinter rollt 146 px. Auf der Messseite wirkt es ruhig – **das Springen der App
ist hier nicht nachgestellt**. Unterschiede zur App: echtes Fenster ‚Tag‘ (Wetter, Vorschläge, Smileys, wachsende Textfelder,
viel Text), echte Daten, Eingaben während die Tastatur fährt.

**Messung 2b – Versuch B, iPad quer 1194 × 777 – Eindruck: unruhig.**

```
    ms	vv-Höhe	vv-oben	scrollY	Fenster	Zeile	Feld sichtbar	Auslöser
    1	777	0	1723	31	518	ja	Antippen
  131	349	0	1723	31	518	nein	vv resize
  131	349	0	1723	31	518	nein	vv scroll
  160	349	146	1869	-115	372	nein	vv scroll
  310	349	146	1869	-115	372	nein	B gesetzt
  326	349	146	1869	10	372	ja	Bild
  361	349	146	1869	10	372	ja	350 ms (scrollIntoView)
```

Befund: Wird das Fenster nicht **sofort** bei jeder Meldung gesetzt, steht es ~165 ms zu hoch (−115) und springt dann –
sichtbar unruhig. **Versuch B scheidet aus.** Umgekehrt heißt das: Unruhe entsteht, sobald das Fenster nach einer Meldung
nicht im selben Bild richtig steht. In der App muss also etwas das Setzen verzögern oder danach noch einmal verschieben
(z. B. wachsende Textfelder, ResizeObserver, `refreshOk`, mehr Inhalt) – das zeigt nur die Messung in der echten App.

**Messung 2c – Versuch C, iPad quer 1194 × 702 – Eindruck: ruhig.**

```
    ms	vv-Höhe	vv-oben	scrollY	Fenster	Zeile	Feld sichtbar	Auslöser
    1	702	0	0	10	560	ja	Antippen
  137	274	162	162	-152	398	nein	vv resize
  139	274	162	162	10	398	ja	vv scroll
  362	274	162	162	10	398	ja	350 ms (scrollIntoView)
```

Befund: wie A – das Fenster steht 2 ms nach der Meldung wieder richtig. Hier lag die Seite ganz oben (`scrollY` 0) und
rollte trotzdem 162 px. **A und C sind auf der Messseite gleich ruhig**; C bringt nur einen Vorteil, wenn das Fenster in der
App beim Tippen wächst (oben verankert wandert es dann nicht) – auch das zeigt erst Messung 3.

## Vorschlag für die nächste Messung (Messung 3)

Die Messseite ist ruhig, die App springt. Deshalb wird **in der echten App** gemessen:

- `messen/reiselogbuch.html` = Kopie der App Reiselogbuch 3.20.1 (Fassung 4.21.1) mit demselben Protokoll wie die Messseite.
- Sie liegt auf derselben Adresse (g811141a.github.io), deshalb sieht sie **deine echten Reiselogbücher**. Damit nichts
  passiert, kann sie **nicht speichern**: Schreiben in den Speicher ist abgeschaltet, kein Abgleich, keine Installation
  (Service Worker). Änderungen verschwinden beim Neuladen.
- Du öffnest einen Tag mit viel Text, bei dem es springt, und tippst in das Feld wie sonst. Protokoll kopieren, im Chat
  einfügen. Dazu ein Wort: springt / ruhig, und wann (beim Hochfahren der Tastatur, beim Tippen, beim Wechsel des Feldes).
- Die App selbst und ihr Repo bleiben unverändert; die Kopie wird nach der Korrektur gelöscht.

**Messung 3 gebaut (17.10.2026, ‚Ja‘):** `messen/reiselogbuch.html` (erzeugt mit `node messen/erzeuge-reiselogbuch.mjs` aus
Reiselogbuch 3.20.1). Speichern abgeschaltet (`setItem`/`removeItem`/`clear` ohne Wirkung), kein Service Worker; rotes Schild
‚Messung – speichert nicht‘ unten links mit ‚Protokoll kopieren‘. Protokoll zusätzlich: Höhe des Fensters, wie weit sein Inhalt
gerollt ist, jeder Aufruf von `placeDialogs`, jede Eingabe, Rollen der Seite und im Fenster; jede Eingabe verlängert um 1,5 s.
Geprüft in Chromium und WebKit: Daten sichtbar, Speicher nach Änderung unverändert, Protokoll vollständig.

**Messung 3 – Kopie der App, iPad quer 1194 × 802, iOS 26.6.2, Safari – Eindruck: ruhig.**
Tastatur: Größe nach 132 ms (802 → 374, Fenster sofort 354 hoch), Safari rollt die Seite nach 153 ms um 190 px, das Fenster
steht 4 ms später wieder richtig (−180 → 11). Nach 350 ms rollt der Inhalt des Fensters einmal 62 px zum Feld. Beim Tippen
(10 s, 17 Eingaben, viermal Feld neu angetippt) ruft jede Eingabe `placeDialogs` auf, das Fenster bleibt aber auf 11 px,
die Seite dahinter steht still; der Inhalt rollt nur in kleinen Schritten mit dem Text (62 → 71 → 95 → 119).
Befund: **auch in der echten App mit echten Daten ruhig.** Offener Unterschied zur Rückmeldung T-91: die App läuft beim
Nutzer vom Home-Bildschirm (ohne Safari-Leisten), die Messung lief im Safari-Tab.

**Messung 3b – Kopie der App, iPad quer 1194 × 802, iOS 26.6.2, Safari – Eindruck: ruhig.**
Wie 3: Tastatur nach 101 ms, Seite rollt nach 125 ms um 190 px, Fenster 4 ms später richtig (−180 → 11), 350 ms rollt der
Inhalt einmal 62 px. Danach 18 s Tippen (~110 Eingaben): Fenster immer auf 11 px, Höhe 354, Seite steht still, der Inhalt
rollt nur viermal mit dem Text (62 → 71 → 95 → 119). Befund: **kein Springen messbar.**
