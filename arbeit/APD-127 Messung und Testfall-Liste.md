# APD-127 – Gleitbewegungen wie das Mehr-Menü: Messung und Testfall-Liste

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0099‘ · aus P-100/2 Schritt 3 (‚das Feld gleitet zu schnell‘) · Zusammenarbeit 0 Nr. 20, 2.7

## Befund aus dem Code (Fassung 4.56.0, vor der Messung)

- APD-127/B-1 **Mehr-Menü** (R-4.13): wächst in 0,35 s, schrumpft in 0,25 s, Kurve `cubic-bezier(.32,.72,0,1)` (`ui.js` `WACHS_MS`, `SCHRUMPF_MS`,
  `WACHS_KURVE`).
- APD-127/B-2 **Fenster** (R-4.6): gleitet mit derselben Kurve herein (`BLATT_KURVE`), das Abbild beim Schließen in 220–420 ms je nach Weg.
- APD-127/B-3 **Feld antippen** (R-4.5, APD-115): `ui.js` rollt den Fensterinhalt beim Fokus **in einem Schritt** (`c.scrollTop += n` im Hörer
  `focusin`), noch bevor die Tastatur aufgeht. Grund: Safari liest die Lage des Felds beim Fokus und verschiebt sonst selbst den sichtbaren
  Bereich (Designrichtlinie 13, APD-36/S-7, S-8). Das Feld **springt** also an seinen Platz – das ist vermutlich das ‚zu schnell‘ aus P-100/2
  (Vermutung, die Messung soll es zeigen).
- APD-127/B-4 Die Tastatur selbst schiebt Safari herein; wie schnell, zeigt nur das Gerät (`visualViewport`-Höhe je Bild).

## Messmuster (2.7)

`arbeit/APD-127/index.html` – lädt die unveränderte Fassung 4.56.0 (design.css, ui.js), Link:
https://g811141a.github.io/AppDesign/arbeit/APD-127/index.html

- Sechs Fälle mit ‚Nächster Schritt‘, abgehakt, ‚Messung teilen‘ erst nach allen (oder ‚trotzdem teilen‘); am Gerät nur ‚aufgenommen‘.
- Aufgezeichnet je Bild, nur wenn sich etwas ändert: sichtbarer Bereich (Höhe, offsetTop), scrollY, Fenster (Lage, Versatz), Rollstand im
  Fenster, Lage von ‚Ort‘ und ‚Wie war was?‘, Menü (Lage, Höhe, Deckkraft), Abbild des Fensters, Fokus; dazu Berührungen, Fokus, Meldungen von
  Safari. Keine Texte.
- **Variante A** = heute. **Variante B** = Versuch: gleich weit gerollt, aber der Inhalt gleitet in 0,35 s mit der Kurve des Mehr-Menüs an den
  Platz (Bewegung per `transform`, der Rollstand ist sofort richtig, damit Safari beim Fokus die richtige Lage liest). Solange B gleitet,
  wartet das Nachstellen von `ui.js` beim Öffnen der Tastatur (`feldZeigen`) bis zum Ende – sonst misst es die verschobene Lage und rollt zu weit
  (im Modell gesehen: 403 statt 237 px).
- Auswertung: `node "arbeit/APD-127 auswerten.mjs" <Datei>` – je Fall und Wert die Bewegungen mit Dauer, Weg, Bildern, größtem Schritt;
  ‚SPRUNG‘ = höchstens 2 Bilder.
- Gefunden beim Bau (Playwright-WebKit 26.0): ein laufendes CSS-`translate` (Fenster, R-4.6) fehlt in `getBoundingClientRect`, der berechnete Stil
  zeigt es; `transform` (Menü, Variante B) ist dort enthalten. Das Muster zeichnet deshalb den Versatz aus dem berechneten Stil auf (`bt`, `gt`).
  Ob Safari am Gerät es genauso macht, zeigt die Messung (Spalten `blatt` und `bt` nebeneinander) – danach gegebenenfalls Designrichtlinie 13.

## Testfall-Liste (Testfall (automatisch), `arbeit/APD-127 Muster prüfen.mjs`, iPhone hoch, Chromium und WebKit mit Safari-Modell)

- APD-127/M-1 Mehr-Menü: zweimal auf in 250–420 ms, zu in 200–320 ms, gleitet (die Kurve endet so flach, dass die letzten Bilder unter 1 px liegen –
  gemessen 270–290 ms für 0,35 s).
- APD-127/M-2 Fenster: gleitet herein und als Abbild hinaus.
- APD-127/M-3 Feld oben (Ort): das Fenster rollt nicht, die Tastatur geht auf.
- APD-127/M-4 Feld unten, Variante A: ‚Wie war was?‘ kommt in einem Bild an seinen Platz (Sprung, wie 4.56.0).
- APD-127/M-5 Feld unten, Variante B: derselbe Weg, gleitend in 250–420 ms, Endlage wie A (± 2 px).
- APD-127/M-6 Ablauf: am Gerät nur ‚aufgenommen‘, ‚Messung teilen‘ erst nach allen Fällen, keine Texte in der Datei, Neuladen behält die Messung.

**Ergebnis (08.11.2026, Sitzung 0099):** Chromium und WebKit **alles in Ordnung** (Modell: A springt 415 px in einem Bild, B gleitet 415 px in
333 ms). Gegenprobe `PRUEF_GEGEN=sprung` (B ohne Gleiten): APD-127/M-5 rot in Chromium und WebKit.

**Am Gerät (Testfall (User) des Musters):** wie schnell die Tastatur aufgeht; ob Safari bei A oder B selbst etwas verschiebt (Spalte `vt`); ob B
ruhig gleitet oder flackert; welche Variante sich besser anfühlt.

## Messung am Gerät (08.11.2026, Sitzung 0100)

Messung 1: iPhone hoch, hell, iOS 18_7 / Safari 26.6.3, **im Safari-Tab** (innen 402 × 714, nicht vom Home-Bildschirm), alle 6 Fälle, AppDesign 4.56.0.
Rohdaten im Notizordner der Sitzung (nicht im Repo), ausgewertet mit `arbeit/APD-127 auswerten.mjs`. Nutzer: **‚Bei A und B war eigentlich kein
Unterschied zu merken.‘**

- APD-127/W-1 **Mehr-Menü:** auf 319 und 324 ms (13–14 Bilder), zu 247 und 252 ms (15 Bilder) – gleitet; Modell 270–290 / ~230 ms, passt.
- APD-127/W-2 **Fenster:** herein 421–425 ms (26 Bilder), Abbild hinaus 306–318 ms (18–20 Bilder) – gleitet.
- APD-127/W-3 **Tastatur (`vh`):** 714 → 377 in **einem** Bild (337 px), gemeldet 95–110 ms nach dem Fokus; zu 463–498 ms nach `focusout`. Die
  Bewegung der Tastatur selbst zeigt `visualViewport` nicht – ihre Dauer bleibt am Gerät unmessbar (APD-127/B-4).
- APD-127/W-4 **Variante A:** ‚Wie war was?‘ springt 602 → 252 (349 px) in einem Bild, 90–91 ms nach dem Fokus, etwa 19 ms **vor** der Meldung der
  Tastatur; Rollstand 272 → 622. Zweimal gleich (Fall 4 und 6).
- APD-127/W-5 **Variante B:** derselbe Weg (602 → 252), gleitet 351 ms in 19 Bildern (größter Schritt 64 px), erstes Bild 88 ms nach dem Fokus,
  zugleich mit der Tastatur; Endlage wie A (252).
- APD-127/W-6 **Safari verschiebt nichts:** `vt` und `sy` bleiben in allen Fällen 0 (auch bei ‚Ort‘ oben) – das Rollen von `ui.js` beim Fokus
  (APD-36/S-7, S-8) verhindert die Verschiebung durch Safari, wie im Modell.
- APD-127/W-7 **Erstes Bild nach dem Fokus:** in A und B 88–91 ms nach `focusin` (bei ‚Ort‘ ohne Rollen schon nach 3 ms). Vermutung: Safari zeichnet,
  während die Tastatur startet, kein neues Bild – der Sprung von A wird so erst im selben Augenblick sichtbar, in dem die Tastatur hereinkommt.
- APD-127/W-8 **Fenster-Versatz (`blatt`, `bt`):** am Gerät ist `blatt` in jedem Bild genau `bt` + 10 – Safari rechnet das laufende `translate` in
  `getBoundingClientRect` ein. Die Lücke ist nur in Playwright-WebKit 26.0 (Prüfumgebung), keine Safari-Eigenheit → kein Eintrag in Designrichtlinie 13.

**Safari-Modell (0 Nr. 20):**
- Weg: Modell 415 px, Gerät 349 px. Unterschied 66 px = Tastatur Modell 403 px (iPhone hoch) − Gerät 337 px. Vermutung: der Safari-Tab hat eine
  andere Tastaturhöhe als die App vom Home-Bildschirm (für die das Modell gilt); am Home-Bildschirm nicht gemessen.
- Abweichung: das Modell meldet die Tastatur ein Bild nach dem Fokus, das Gerät nach 95–110 ms (W-3); im Modell kommt das erste Bild nach dem Fokus
  sofort, am Gerät nach 88–91 ms (W-7). Beides gehört ins Modell (`tests/safari.mjs`), mit Quelle in Designrichtlinie 13 (Wortlaut, 0 Nr. 29).

**Bewertung:** A springt, B gleitet – am Gerät messbar verschieden, aber **nicht spürbar** (Nutzer). Vermutung: der Sprung fällt mit dem Start der
Tastatur zusammen (W-4, W-7) und geht in ihrer Bewegung unter. B bringt also nichts, kostet aber Code (Warten in `feldZeigen`).

**Entscheidung (Nutzer 08.11.2026, Sitzung 0100):** Variante **A bleibt**, P-100/2 Schritt 3 ohne Änderung erledigt; kein Wortlaut ‚alle
Gleitbewegungen wie das Mehr-Menü‘ für das Feld.

## Wortlaut bestätigt (Nutzer 08.11.2026, Sitzung 0100)

- **Designrichtlinie 13** ‚Tastatur ohne Springen‘, neuer Punkt nach APD-36/S-9: ‚**APD-127/W-3, W-7 Zeitpunkt der Tastatur** (Messung 08.11.2026, iPhone hoch,
  Safari-Tab, Safari 26.6.3, `arbeit/APD-127 Messung und Testfall-Liste.md`): `visualViewport` meldet die Tastatur in **einem** Schritt (`resize`, gleich
  mit der Endhöhe) 95–110 ms nach dem Fokus, beim Schließen 460–500 ms nach `focusout`; ihre Bewegung selbst ist nicht messbar. Rollt die App im
  `focusin`, kommt das erste Bild erst 88–91 ms nach dem Fokus (ohne Rollen nach 3 ms) – ein Sprung dort fällt mit dem Start der Tastatur zusammen und
  war am Gerät nicht von einem Gleiten über 0,35 s zu unterscheiden. Im Safari-Tab nahm die Tastatur 337 px vom sichtbaren Bereich (APD-36/S-2:
  403 px). Ein laufendes CSS-`translate` rechnet Safari in `getBoundingClientRect` ein (Playwright-WebKit 26.0 der Prüfumgebung nicht).‘
- **Safari-Modell** `tests/safari.mjs`: iPhone hoch `aufVerzug` 100 ms (APD-127/M-7, M-8); das fehlende Bild nach dem Fokus als ‚nicht nachgebildet‘.
- **Regelkatalog R-1.12 (neu):** ‚**Gleitbewegungen wie das Mehr-Menü:** jede Bewegung, mit der die App selbst etwas an einen anderen Ort bringt – Menü
  und Sprechblase (R-4.13), Fenster und Blatt (R-4.6), Navigation und Seitenleiste (R-7.5), das Fenster mit der Tastatur am iPad, ‚Titel antippen = nach
  oben‘ –, läuft mit der Kurve `cubic-bezier(.32,.72,0,1)`: öffnen, hinein und nach oben in 0,35 s, schließen und hinaus in 0,25 s; nach einer Geste
  (Ziehen, Zurückwischen) der Rest anteilig, mindestens 0,15 s. Ausgenommen: das Feld beim Antippen springt (Safari, 13, APD-127/W-4), Rückmeldungen
  beim Drücken und Überblenden; ‚Bewegung reduzieren‘ nach R-1.9‘ · Prüfung ablauf.mjs (neu: Dauer und Kurve jeder Bewegung, Endlage unverändert) ·
  Gerät: Gefühl am Gerät · 15.
- **R-4.13** letzter Satzteil: ‚Fenster und Blatt gleiten wie bisher (R-4.6)‘ → ‚Fenster und Blatt gleiten nach R-1.12‘.

## Muster R-1.12 (Sitzung 0100)

`arbeit/APD-127/app/index.html` (gebaut mit `arbeit/APD-127 Muster bauen.mjs`): Reiselogbuch 3.54.0 mit eigenem Speicher und Beispielreisen, `ui.js` aus
Fassung 4.56.0 mit R-1.12; `?v=b` = heute zum Vergleich. Prüfung `arbeit/APD-127 Muster R-1.12 prüfen.mjs`:

- APD-127/M-9 Blatt: öffnen 0,35 s, x 0,25 s (Blatt, Schleier, Seite), nach dem Loslassen zurück 0,35 s bzw. zu 0,25 s anteilig – Kurve K.
- APD-127/M-10 iPad-Fenster mit der Tastatur: hoch 0,35 s, runter 0,25 s, Kurve K.
- APD-127/M-11 Navigation iPhone: hinein 0,35 s, zurück 0,25 s, Kurve K.
- APD-127/M-12 Seitenleiste iPad: ein 0,35 s, aus 0,25 s, Kurve K.
- APD-127/M-13 ‚Titel antippen‘: fertig in 250–420 ms (die Kurve endet flach), nach 100–120 ms 0,78–0,93 des Wegs (heute 0,61–0,69).
- APD-127/M-14 ‚Bewegung reduzieren‘: das Blatt bewegt sich nicht über 200 ms.
- APD-127/M-15 Gegenprobe `PRUEF_V=heute`: M-9 bis M-13 rot.

**Ergebnis:** Chromium alles in Ordnung; WebKit 2 von 3 Läufen grün, 1 rot (M-13 knapp an der Grenze – der Startwert des Rollens liegt nur bei 86–100 px,
dadurch grob); Gegenprobe in Chromium und WebKit je 8 Fehler (M-9 bis M-13). Beim Bau gefunden: das Schließen mit x ließ Schleier und Seite noch
0,38 s gleiten (`blattWeg`) – im Muster behoben.

## Nächster Schritt

~~Entscheidung A behalten oder B bauen~~ (A) → Muster R-1.12 am Gerät (iPhone hoch, iPad quer, hell) → → bei A kein Wortlaut ‚alle Gleitbewegungen wie das Mehr-Menü‘; Modell und Designrichtlinie 13 nach W-3 und
W-7 (Wortlaut) → Bau-Frage.
