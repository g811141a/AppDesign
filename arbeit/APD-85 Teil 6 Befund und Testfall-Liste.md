# APD-85 Teil 6 – Befund und Testfall-Liste

**Stand 15.11.2026** · Sitzung ‚Reiselogbuch 0115‘ · Wackler in WebKit: `ablauf-seitenleiste-position`, `ablauf-gesamt`

## Versuch

Lastlauf im Notizordner der Sitzung: je Runde 4× `ablauf-seitenleiste-position` und 4× `ablauf-gesamt` gleichzeitig in WebKit (8 Browser auf
4 Kernen), 4 Runden, Stand Reiselogbuch 3.56.2 mit AppDesign 4.59.2.

| Lauf | `ablauf-seitenleiste-position` | `ablauf-gesamt` |
|---|---|---|
| unverändert | **4 von 16 rot** | **1 von 16 rot** |
| mit Warten auf ‚keine Bewegung‘ nach dem Loslassen (Versuch) | 4 von 16 rot | 0 von 16 |
| mit Ereignisprotokoll in der Seite | 2 von 16 rot | 0 von 16 |

## Befunde

- **B-1 – `ablauf-seitenleiste-position` (iPhone, Kontextmenü):** rot war immer ‚Kontextmenü (oberste/unterste Kachel) nicht linksbündig‘,
  einmal zusätzlich ‚nicht unter der Kachel‘. Das Protokoll eines roten Laufs (ms seit dem Laden):
  `1205 pointerdown · 1817 Menü neu (wächst 350 ms) · 1935 pointerup · 1938 Test: losgelassen · 2189 Test misst · 2193 Menü fertig gewachsen`.
  Das Menü wird beim langen Drücken neben die **angehobene** Kachel gesetzt (`.hebt`, `scale(1.03)`: etwa 5 px breiter). Seine Endlage bekommt
  es erst nach dem Loslassen (`ui.js`: `replaceSoon` – nach zwei Bildwechseln und nach 350 ms). Die Prüfung misst nach einer **festen Pause
  von 250 ms**. Unter Last kommen die Bildwechsel später, und die Prüfung misst vor der Ausrichtung. 1,5 s später stimmt die Lage
  (Kachel links 16, Menü links 16, unter der Kachel). **Ursache in der Prüfung, nicht in der App.**
- **B-2 – Warten auf ‚keine Bewegung‘ reicht nicht:** das Ausrichten nach dem Loslassen ist keine Bewegung (`getAnimations` leer) – die Prüfung
  muss auf die Endlage nach dem Ausrichten warten.
- **B-3 – dieselbe Lücke:** feste Pause nach dem langen Drücken auch in `ablauf-einstellen`, `ablauf-iphone`, `ablauf-markierung-menues`,
  `ablauf-messung`, `ablauf-seitenleiste-hoch` (wackelte schon in 0111), `ablauf-seitenleiste-kontextmenue`, `ablauf-texte-ablaeufe`
  (Reiselogbuch). `ablauf-jahre` wartet schon auf Ruhe. In AppDesign `tests/` gibt es die Stelle nicht.
- **B-4 – `ablauf-gesamt` (iPad quer hell, Runde 1):** die Grundregeln meldeten das Mehr-Menü mitten im Wachsen (‚Menü 92.1 px breit statt
  340‘, Einträge 12,5 px hoch) und nach ‚Nur erfasste Tage‘ mitten im Schrumpfen (203×28 px, ‚div bleibt nach dem Schließen gesperrt‘).
  `ruhe()` (`tests/pruefe.mjs`) wartet höchstens 40 Durchgänge. Bleibt die Seite so lange in Bewegung, endet die Funktion **ohne Meldung**,
  und die Grundregeln messen Zwischenstände. **Vermutung:** beim gleichzeitigen Start von 8 Browsern kamen so lange keine Bildwechsel. In den
  Läufen danach (32×) nicht wieder aufgetreten, darum nicht belegt.
- **B-5 – am Gerät (Vermutung, nicht gemeldet):** das Kontextmenü rückt nach dem Loslassen um etwa 5 px nach links oben (von der angehobenen auf
  die normale Kachel). Bisher hat das niemand gemeldet; kein Handlungsbedarf, nur genannt.

## Vorschlag

1. **AppDesign:** neuer Baustein `langDruecken(p, ziel, { ms })` in `tests/ablauf.mjs`: drückt, hält, lässt los und wartet mit `warteBis` auf die
   Endlage: Menü offen, kein `.hebt`, keine Bewegung, mindestens 350 ms und zwei Bildwechsel nach dem Loslassen (wie `replaceSoon`). Wird die
   Endlage in 10 s nicht erreicht, kommt eine Meldung mit den Maßen.
2. **AppDesign:** `ruhe()` gibt zurück, ob die Seite ruhig wurde. `schritt` meldet sonst ‚Seite nicht zur Ruhe gekommen (zuletzt: …)‘, statt
   Zwischenmaße als Regelverstöße zu melden.
3. **Reiselogbuch:** die 8 Prüfungen aus B-1 und B-3 nutzen `langDruecken`.
4. Versionen: **AppDesign 4.59.3** (nur Prüfungen) mit **Reiselogbuch 3.56.3** (nur Prüfungen, Fassung 4.59.3), Prüflauf **voll**. Usertest am
   Gerät nur /0 (Version prüfen), weil sich die App nicht ändert.

## Testfall-Liste (Testfälle automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| F-1 | iPhone hoch, Startliste, oberste Kachel lange drücken (`ablauf-seitenleiste-position`) | Messung erst in der Endlage: Menü unter der Kachel, linksbündig, über der Backup-Kachel |
| F-2 | wie F-1, unterste Kachel (Liste rückt nach oben) | wie F-1, Kachel sichtbar |
| F-3 | Kontextmenü schließen | weiter erst, wenn Menü und Abbild (`.zu-geist`) weg sind |
| F-4 | Gegenprobe: das Menü bleibt absichtlich 6 px verschoben (eingefügtes CSS) | F-1 nach 10 s rot mit Maßen – das Warten verdeckt keinen echten Fehler |
| F-5 | `ruhe()` bei einer Bewegung, die nicht endet (Selbsttest) | Meldung ‚Seite nicht zur Ruhe gekommen‘, keine Regelfunde mit Zwischenmaßen |
| F-6 | die 7 Prüfungen aus B-3 mit `langDruecken` | grün in Chromium und WebKit wie vorher |
| F-7 | Lastnachweis wie im Versuch (4 Runden, 8 Browser, WebKit) | `ablauf-seitenleiste-position` 0 von 16 rot, `ablauf-gesamt` 0 von 16 rot |
| F-8 | Gegenprobe gegen 4.59.2 unter derselben Last | `ablauf-seitenleiste-position` wieder rot (wie im Versuch) |
