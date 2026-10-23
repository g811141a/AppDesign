# A-43 Teil 2 ‚Textgröße (Dynamic Type)‘ – Apple-Abgleich und Klärung

**Stand 23.10.2026** · Sitzung Reiselogbuch 0035 · entschieden in Teil 1: Textgröße **nach der Einstellung des Geräts**, mit Muster
(`arbeit/A-43 Klärung.md`, Punkt 4)

## 1. Aktuell (im Code nachgesehen)

- `design.css`: Grundschrift `font: 17px/1.45 -apple-system, …` am `body`; **45 feste Schriftgrößen in px** (17, 15, 13, 20, 19,
  14, 18, 24, 28, 34), praktisch nichts in `rem`/`em`; feste Höhen in px (20 × 44 px Knöpfe/Zeilen, 32, 36, 48, 60 px).
- `-webkit-text-size-adjust: 100%` – Safari vergrößert nichts von selbst; die Einstellung ‚Textgröße‘ des Geräts wirkt heute nicht.
- Reiselogbuch: 6 eigene Schriftgrößen, Tabelle der Tage (`table.days`), Ausgabe über `outputCss` (R-6.2).
- Regel R-1.3: Eingabefelder mindestens 16 px (sonst vergrößert iOS beim Antippen).

## 2. So macht es Apple

- **Einstellung:** Einstellungen → Anzeige & Helligkeit → Textgröße bzw. Bedienungshilfen → Anzeige & Textgröße → Größerer Text.
  12 Stufen für ‚Body‘: 14 · 15 · 16 · **17 (Standard)** · 19 · 21 · 23 pt, dazu 5 Bedienungshilfe-Größen AX1–AX5: 28 · 33 · 40 · 47 ·
  53 pt (über 300 %).
- **Alle Textstile wachsen mit** (Large Title, Title 1–3, Headline, Body, Callout, Subhead, Footnote, Caption); die Rangfolge
  bleibt. Icons (SF Symbols) wachsen mit dem Text.
- **Leisten wachsen nicht oder nur begrenzt:** Tab-Leiste bleibt, ‚Zurück‘ und ‚Bearbeiten‘ bleiben klein (wiederkehrende
  Bedienelemente); dafür zeigt langes Drücken die **Großanzeige** (Large Content Viewer).
- **Bei großen Größen:** Listenzeilen werden höher, Text bricht um statt abgeschnitten zu werden; was nebeneinander steht und sich
  überlappen würde, steht untereinander (Beispiel Mail: Absender, Empfänger, Datum); Hauptknöpfe dürfen die volle Breite nehmen.
- **App Store (Bewertung ‚Größerer Text‘):** unterstützt, wenn der Haupttext bis **mindestens 200 %** wächst (bei iOS ab AX3), ohne
  Überlappen und ohne starkes Abschneiden; Prüfen bei kleinen, mittleren, großen und sehr großen Bedienungshilfe-Größen; bei jeder
  Version neu bewerten.
- Quellen: [HIG – Typography](https://developer.apple.com/design/human-interface-guidelines/typography),
  [Larger Text evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria),
  [Dynamic Type im Web (Vispero)](https://vispero.com/resources/text-resizing-web-pages-ios-using-dynamic-type/).

## 3. Was im Web geht – und Abweichungen

- **Grundgröße:** `font: -apple-system-body` an `html` liefert in Safari (iPhone, iPad) die Body-Größe der Einstellung; alle Größen
  in `rem` wachsen mit, Rangfolge über Faktoren (Titel 28/17 rem usw.). Auf dem Mac und in Chromium 17 px (Rückfall).
- **Am Gerät zu klären:** (a) gilt es auch für die Web-App auf dem Home-Bildschirm; (b) reichen die AX-Größen bis 53 pt durch;
  (c) wechselt die Größe bei offener App oder erst nach Neustart (Quellen: oft erst nach Neuladen).
- **Abweichung Eingabefelder:** bei 14–16 pt würde iOS beim Antippen vergrößern (R-1.3) – Felder mindestens 16 px.
- **Abweichung Großanzeige:** gibt es im Web nicht – Leisten wachsen daher begrenzt mit statt gar nicht.
- **Ausgabe HTML/PDF:** unverändert (R-6.2).
- **Prüfungen:** Playwright kennt keine Textgröße – die Prüfungen setzen die Grundgröße selbst (z. B. 14, 17, 23, 33, 53 px) und
  prüfen die Grundregeln (nichts ragt hinaus, nichts überlappt, nichts unter den Leisten).

## 4. Varianten für das Muster

- **A – wie Apple:** alles wächst bis AX5; Leisten (Kopf, Kapsel, Suche, schwebende Knöpfe) wachsen nur bis etwa 23 pt; ab AX1
  steht Nebeneinanderliegendes untereinander (z. B. Tabelle der Tage als Karten, Menü-Zusatzinfos unter dem Text).
- **B – nur Inhalt:** Listen, Fenster-Inhalte und Tabellen wachsen bis AX5; Leisten, Menüs und Knöpfe bleiben fest.
- **C – begrenzt:** alles wächst, aber nur bis 23 pt (135 %), kein Umbau des Aufbaus – erfüllt Apples 200 % nicht.

## 5. Antworten (Nutzer 23.10.2026, Sitzung 0035)

1. Muster zeigt **A, B und C nebeneinander** (A empfohlen), zuerst hell und quer.
2. Höchstgröße **bis 53 pt** (AX5, alle Stufen wie Apple).
3. Nächster Schritt: Muster in den Größen 17, 23, 33 und 53 pt mit kleinem Versuch am Gerät (Home-Bildschirm, AX-Stufen, Wechsel bei offener App).
