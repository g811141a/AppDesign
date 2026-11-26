# P-124/F-1 und P-124/F-2 – Nachbau, Ursache, Vorschlag (Sitzung 0162)

**26.11.2026** · gegen Reiselogbuch 3.58.4 / AppDesign 4.70.1 · Prüfung `ReiseLogBuch/tests/ablauf-p120.mjs`, neue Teile **P-124/F-1** und **P-124/F-2**
(noch nicht hochgeladen)

## 1. Nachbau (0 Nr. 1)

| Teil | Ablauf | Chromium | WebKit |
|---|---|---|---|
| P-124/F-1 | iPad quer und hoch · Reiselogbuch mit langem und sehr langem Titel · Vorschau → Teilen gesichert, Vorschau → PDF, Teilen → HTML | **rot, 21 Fehler** | **rot, 21 Fehler** |
| P-124/F-2 | iPad quer und iPhone hoch · 9 Wege in der Reihenfolge des Usertests P-124 (dazu Neuaufbau bei offenem Teilen-Menü), gesperrte Seite (Teilen, PDF, Teilen abgebrochen) | **rot, 16 Fehler** | **rot, 16 Fehler** |

**P-124/F-1:** Das Hinweisfenster ist quer und hoch **600 px** breit, und der Dateiname steht in **2 Zeilen**. Möglich wären quer 1148 px und hoch 788 px
(Bildschirmbreite − 32 px). Das ist genau dein Befund: quer gleich breit wie hoch.

**Warum P-123/F-1 grün war:** Die Titel dort sind kurz (‚Toskana‘), deshalb passt der Name schon in 600 px. Außerdem vergleicht die Prüfung nur mit einer zweiten
Messung derselben Bean, und die hat dieselbe Grenze von 600 px. Die neue Prüfung prüft deshalb auch die Testdaten selbst: Der Name muss länger sein, als in 600 px passt.

**P-124/F-2:** In der Nachbildung ist dein Weg Vorschau → Teilen → sichern → x → Vorschau x **sauber**: Danach ist nichts getönt, auch nach Teilen → HTML vorher.
**Rot** sind dagegen alle Wege **ohne Vorschau**:
- Teilen → HTML gesichert bzw. abgebrochen → x und Teilen → PDF → x: Teilen bleibt hellblau (`#shareBtn.on`, Quelle `#shareBtn`), auf iPad und iPhone.
- **Gesperrte Seite:** Teilen → x, PDF → x und Teilen abgebrochen → x lassen Teilen ebenfalls hellblau.
- **Gesperrte Seite, PDF:** Während das Hinweisfenster offen ist, ist **Teilen** getönt statt PDF (falsche Quelle).

**Dein Weg über die Vorschau (Rückmeldung im Fenster: ‚nach der Vorschau‘):** Ich habe Safari-Ereignisse während des Teilens nachgestellt (Seite verdeckt,
`resize`, `pageshow`, Fokus, Drehen, Neuaufbau). Danach war alles sauber, **bis auf einen Fall:** Baut die App die Kopfzeile neu auf (`render`), **während das
Teilen-Menü offen ist**, dann bleibt Teilen nach Vorschau → Teilen → x → Vorschau x hellblau. Das ist dein Bild. Der Fall ist jetzt ein fester Weg der Prüfung, rot
auf iPad und iPhone. Was den Neuaufbau am Gerät in diesem Moment auslöst, ist eine **Vermutung**, z. B. der Abgleich oder der Tageswechsel.

## 2. Ursachen (aus dem Code)

- **P-124/F-1:** `alert.fitFileName` macht das Fenster höchstens so breit wie das breite Hinweisfenster (`ad-alert-wide`, 600 px × Textgröße). So steht es auch in
  der Regel **R-10.8** („höchstens wie das breite Hinweisfenster (600 px …)“). Am iPad ist die Bildschirmbreite − 32 px quer und hoch größer als 600 px. Deshalb gilt
  in beiden Lagen dieselbe Grenze, und der lange Name bricht um. Die Bean misst also richtig, aber die Grenze ist zu eng.
- **P-124/F-2:** `exportHtml` und `exportPdf` setzen auf dem direkten Weg `adSourcehighlight.sourceItem = '#shareBtn'` (`outputSource`, Reiselogbuch `index.html`).
  Frei wird die Quelle nur, wenn das **Fenster `dlg`** schließt (`ui.js`, `dlg`-close). Seit 3.58.4 (P-123/F-2) steht das Ergebnis auf jedem Weg im
  **Hinweisfenster `#msg`**, und beim Schließen von `#msg` gibt niemand die Quelle frei. Vorher stand das Ergebnis direkt im Fenster `dlg`. Dein Verdacht aus 0161
  stimmt also, nur am direkten Weg. Auf der gesperrten Seite nimmt `outputSource` immer `#shareBtn`, auch wenn PDF angetippt wurde.
- **Dieselbe Lücke überall gesucht:** `sourceItem` wird sonst nur für Fenster im `dlg` gesetzt (Fazit, Neues Reiselogbuch, Einstellen, Tag, Vorschau). Die
  übrigen Hinweisfenster (`inform`: Backup, Backup laden, Speicher voll, neue Version) setzen keine Quelle. Backup und Import arbeiten mit `hold`/`release`. Die Lücke
  steckt also nur im direkten Weg der Ausgabe (Menü und gesperrte Seite).
- **P-124/F-2 nach der Vorschau (AD-Bean `sourcehighlight`):** Das offene Menü hält seine Schaltfläche als **Element** (`hold(anchor)`). Baut die App die Kopfzeile neu
  auf, tauscht `refresh` das gehaltene Element gegen das neue aus. Beim Schließen gibt das Menü aber das **alte** Element frei (`release(anchor)`), und das findet die
  Bean nicht mehr. Das neue Teilen bleibt dann gehalten und hellblau, bis zum nächsten Öffnen des Menüs. In der Nachbildung belegt:
  `hold(alt) → render → release(alt)` lässt `heldItems` bei 1 und `#shareBtn.on`.
  **Dieselbe Lücke überall:** Alles, was ein Element hält, ist betroffen: Menü, Untermenü, Sprechblase (`confirmPop`), Backup und Import mit Schaltfläche, in jeder App.
  Deshalb gehört die Korrektur in die Bean.

## 3. Apple-Abgleich

- HIG ‚Alerts‘ (developer.apple.com, Stand 2. Februar 2024, über die JSON-Fassung der Seite gelesen): Zur **Breite** eines Alerts sagt die Seite **nichts**, auch nichts
  zu iPad oder iPhone. Zum Text: „keep it as short as possible“, „avoid overly long titles that wrap to more than two lines“ und „When possible, avoid displaying an
  alert that scrolls.“ Dateinamen kommen dort nicht vor.
- Ein Fenster, das für den Dateinamen breiter wird, ist also unsere eigene Lösung (R-10.8) und keine Vorgabe von Apple. Auch die neue Grenze weicht damit von Apple ab,
  aber nur in dieselbe Richtung wie bisher. Sie hält den Namen in einer Zeile und vermeidet Umbruch und Rollen.
- Die Tönung der Quelle nur solange etwas offen ist (R-3.3), so wie bisher.

## 4. Vorschlag – Korrekturversion AppDesign 4.70.2 / Reiselogbuch 3.58.5

**P-124/F-1 (AppDesign, AD-Bean `alert`, Eigenschaft `fitFileName` geändert):** Am iPad wird das Fenster so breit, wie der Name in einer Zeile braucht, höchstens
**Bildschirmbreite − 32 px**. Die Grenze von 600 px des breiten Fensters fällt für den Dateinamen weg. Damit wird es quer breiter als hoch. Beim Drehen misst die Bean neu
(`resize`, wie bisher). Das iPhone, kurze Namen (Grundbreite) und das breite Fenster bleiben unverändert. Die Prüfung `ablauf.mjs` `checkDateiname` (Höchstbreite)
zieht mit.

**P-124/F-2 (Reiselogbuch, AD-Bean: keine, weil `sourcehighlight` schon `hold`/`release` hat):** `outputSource` hält auf **jedem** Weg die angetippte Schaltfläche,
bis das Hinweisfenster schließt (`hold`/`release`, wie über der Vorschau seit 3.58.3):
- Menü Teilen → HTML bzw. PDF: Teilen (`#shareBtn`)
- gesperrte Seite: Teilen bzw. PDF (`#pdfBtn`)

`sourceItem` setzt `outputSource` nicht mehr.

**P-124/F-2 nach der Vorschau (AppDesign, AD-Bean `sourcehighlight`, Korrektur ohne neue Eigenschaft):** Tauscht `refresh` ein gehaltenes Element gegen das neu
aufgebaute, dann merkt sich die Bean den Tausch. `release(alt)` gibt danach auch das neue frei, ebenso `hold(alt)`. Die Schnittstelle bleibt gleich, und jede App
profitiert davon.

### Wortlaut Regel R-10.8 (0 Nr. 29) – Designrichtlinie allgemein 17

**Alt:** „… Am iPad wird das Fenster so breit, dass der Name in einer Zeile steht – mindestens so breit wie sonst, höchstens wie das breite Hinweisfenster (600 px,
wächst mit der Textgröße, höchstens Bildschirmbreite − 32 px); passt er auch dann nicht, bricht er nur nach einem Leerzeichen um – …“

**Neu:** „… Am iPad wird das Fenster so breit, dass der Name in einer Zeile steht – mindestens so breit wie sonst, höchstens Bildschirmbreite − 32 px (quer also
breiter als hoch); passt er auch dann nicht, bricht er nur nach einem Leerzeichen um – …“

(Der Rest der Zeile bleibt gleich. Der Kommentar der Bean in `ui.js` wird angepasst.)

### Testfall-Liste (automatisch)

| Nr. | Gerät × Lage | Handlung | Daten | Erwartet | Prüfung |
|---|---|---|---|---|---|
| F-1.1 | iPad quer, iPad hoch | Vorschau → Teilen gesichert, Vorschau → PDF, Teilen → HTML | langer Titel (Name > 600 px) | Name in 1 Zeile, Breite = Name + Rand | `ablauf-p120` P-124/F-1 |
| F-1.2 | iPad quer, iPad hoch | dieselben 3 Wege | sehr langer Titel (passt nur quer) | quer 1 Zeile; hoch Breite 788 px, Umbruch nur nach Leerzeichen | `ablauf-p120` P-124/F-1 |
| F-1.3 | iPad, 4 Lagen, Textgrößen L, XXXL, AX3 | Backup, Ausgabe, Abgleichbericht; drehen bei offenem Fenster | kurz und lang | Grundbreite ≤ Breite ≤ Bildschirm − 32 px | `ablauf.mjs` `checkDateiname` (Höchstbreite neu) |
| F-1.4 | iPhone hoch und quer | dieselben Wege | lang | Breite jedes Hinweisfensters, nichts Eigenes | `checkDateiname` |
| F-2.1 | iPad quer, iPhone hoch | 8 Wege in der Reihenfolge des Usertests P-124 | langer Titel | danach alle Fenster zu, nichts getönt, keine Quelle | `ablauf-p120` P-124/F-2 |
| F-2.2 | iPad quer, iPhone hoch | gesperrt: Teilen gesichert, PDF, Teilen abgebrochen | gesperrt | offen: nur die angetippte Schaltfläche getönt; danach nichts | `ablauf-p120` P-124/F-2 |
| F-2.3 | iPad quer, iPhone hoch | Teilen-Menü offen → Neuaufbau → Vorschau → Teilen → x → Vorschau x | – | nichts getönt, `heldItems` leer | `ablauf-p120` P-124/F-2 |
| F-2.4 | – | Bean allein: `hold(alt)` → Neuaufbau → `release(alt)`, ebenso Untermenü und Sprechblase | – | frei, nicht getönt | AppDesign-Prüfung der Bean (`sourcehighlight`, neue Fälle) |
| F-2.5 | iPad quer, iPhone hoch | Vorschau-Wege wie bisher | – | P-122/F-1 bleibt grün | `ablauf-p120` P-122/F-1 |
| – | alle | nach jedem Schritt | – | Grundregeln | `pruefe.mjs` |

Prüflauf: **Stufe voll** (AppDesign `ui.js` ändert sich). Vorher laufen die betroffenen Prüfungen in Chromium **und** WebKit (Lehre aus 0161).

### Entwurf Usertest P-125 (Reiselogbuch 3.58.5, AppDesign 4.70.2)

Für P-125/1 bis P-125/3 ein nicht gesperrtes Reiselogbuch mit **langem Titel**, für P-125/4 ein gesperrtes.

**P-125/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen und mit Netz neu öffnen.
2. In der Startliste bzw. Seitenleiste ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.58.5 · erstellt am … · AppDesign 4.70.2‘.

**P-125/1 – Hinweisfenster so breit wie nötig (iPad)**
1. iPad quer, hell; das Reiselogbuch mit langem Titel öffnen, oben Teilen → ‚Vorschau‘ → Teilen → ‚In Dateien sichern‘.
2. Erwartet: über der Vorschau das Hinweisfenster ‚Ausgabe V…‘, der Dateiname **in einer Zeile**, das Fenster so breit wie dafür nötig (breiter als bisher). Mit x
   schließen, Vorschau mit x schließen.
3. iPad hoch, dasselbe. Erwartet: das Fenster ist hoch schmaler als quer; der Dateiname in einer Zeile, wenn er auf den Bildschirm passt, sonst Umbruch nur nach
   einem Leerzeichen.

**P-125/2 – Teilen danach nicht mehr hellblau (iPad)**
1. iPad quer, hell; oben Teilen → ‚HTML‘ → ‚In Dateien sichern‘.
2. Erwartet: Hinweisfenster ‚Ausgabe V…‘; Teilen oben ist hellblau, solange es offen ist. Mit x schließen.
3. Erwartet: Teilen oben ist **nicht mehr** hellblau.
4. Oben Teilen → ‚Vorschau‘ → Teilen → ‚In Dateien sichern‘ → x → Vorschau mit x schließen.
5. Erwartet: Teilen oben ist nicht hellblau.

**P-125/3 – Teilen danach nicht mehr hellblau (iPhone)**
1. iPhone hoch, hell; das Reiselogbuch öffnen, oben Teilen → ‚HTML‘ → ‚In Dateien sichern‘ → x.
2. Erwartet: Teilen oben ist nicht hellblau.

**P-125/4 – Gesperrte Seite: die richtige Schaltfläche (iPad)**
1. iPad quer, hell; ein gesperrtes Reiselogbuch öffnen, oben ‚PDF‘ antippen, das Drucken-Menü abbrechen.
2. Erwartet: Solange das Hinweisfenster ‚Ausgabe V…‘ offen ist, ist **PDF** hellblau (nicht Teilen). Mit x schließen.
3. Erwartet: weder PDF noch Teilen ist hellblau.

## 5. Offene Usertests

- **P-124** (3.58.4 / 4.70.1): nicht ok zu /1 (P-124/F-1, P-124/F-2), alle übrigen Punkte ok – wird durch P-125 ersetzt.
