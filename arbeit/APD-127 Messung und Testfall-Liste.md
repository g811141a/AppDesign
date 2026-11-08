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

## Nächster Schritt

Messung am Gerät (iPhone hoch, hell) → Auswertung hier eintragen → Wortlaut ‚alle Gleitbewegungen wie das Mehr-Menü‘ (0 Nr. 29) → Testfall-Liste
für den Bau.
