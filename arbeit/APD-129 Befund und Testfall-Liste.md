# APD-129 – Befund und Testfall-Liste

**14.11.2026 · Sitzung 0112** · Messung `arbeit/APD-129/messung-2026-11-14-0948.txt` (iPhone 402 × 874 @3, Home-Bildschirm, Safari 27.2,
Reiselogbuch 3.56.0, AppDesign 4.59.0, hell, Text xl)

## Befund aus der Messung

| Zeile | Zeit | Was Safari meldet |
|---|---|---|
| 3–13 | 0–10,8 s | hoch: `scrollY` 0, Fensterhöhe (`innerHeight`) 812, sichtbare Höhe 812, Verschiebung (`offsetTop`) 0 – richtig |
| 15–18 | 12,6 s | quer: Fensterhöhe 402 – richtig |
| 20–22 | 19,9 s | zurück auf hoch: Safari meldet kurz **874** (ganzer Bildschirm, als läge die Statusleiste über der App) |
| 23 | 19,9 s | dann wieder 812 – die Differenz ist **62 px** = Höhe der Statusleiste |
| 25–27 | 20,2 s | **Fehler:** Safari lässt die Seite um **62 px verschoben** zurück (`scrollY` 62, `offsetTop` 62), obwohl sie nicht rollbar ist (Seitenhöhe 812 = Fensterhöhe 812) und keine Tastatur offen ist |
| 28–59 | 24,8–26,8 s | du tippst sechsmal bei y ≈ 93–122 – dort, wo du die Kopfzeile siehst; getroffen wird aber der Inhalt darunter (`dd`/`dt`), die Knöpfe reagieren nicht |
| 226–231 | 43,0 s | nach dem Öffnen eines Reiselogbuchs setzt der Neuaufbau `scrollY` auf 0, Safari meldet `offsetTop` 0 – **alles stimmt wieder** |
| 233–236 | 45,4 s | Zurück-Knopf (y 34) wird sofort getroffen |

**Ursache:** `ui.js` hält eine Verschiebung durch Safari für die Tastatur und schiebt Kopfzeile, Fenster und Inhalt um diesen Betrag
nach (`--vv-top` = 62, `placeDialogs`). Ohne Tastatur ist die Verschiebung aber ein Rest vom Drehen. Darum steht die App 62 px (≈ 1 cm)
tiefer, als Safari die Antippflächen rechnet, und Tippen trifft daneben. Mit dem eigenen Rollbereich rollt die Seite selbst nie. Ein
`scrollY` ohne Tastatur ist also immer falsch, und Zurücksetzen auf 0 heilt den Fehler (Zeile 226, Beleg).

**Warum die Prüfung ihn übersah:** Das Safari-Modell (`tests/safari.mjs`) bildet beim Drehen am iPhone vom Home-Bildschirm weder die
kurze Höhe 874 noch die zurückbleibende Verschiebung um die Statusleiste nach. Es dreht von 812 direkt auf 402 und zurück.

## Vorschlag zur Korrektur

- **Safari-Modell:** iPhone vom Home-Bildschirm, Drehen quer → hoch: erst Höhe 874, dann 812, danach `scrollY` und `offsetTop` 62 –
  genau wie gemessen. Die Eigenheit kommt mit Quelle (diese Messung) in Designrichtlinie 13.
- **`ui.js`:** Steht nach Drehen bzw. Größenänderung kein Feld mit Tastatur im Fokus und ist keine Tastatur offen (`kbOffen()`), aber
  `scrollY` > 0, setzt `ui.js` die Seite auf 0 zurück (`scrollTo(0, 0)`) und stellt `--vv-top` auf 0. Danach gilt alles wie vor dem
  Drehen (R-8.1). Bei offener Tastatur bleibt die Verschiebung wie bisher (APD-36, APD-115).
- **Versionen:** Korrekturversion **AppDesign 4.59.1** mit **Reiselogbuch 3.56.1**. Gebaut wird erst nach deinem Ja zur Bau-Frage.

## Testfall-Liste (automatisch)

Gerät × Lage × Handlung × Zustand; nach jedem Schritt die Grundregeln (`pruefe.mjs`). Chromium und WebKit.

| Nr. | Gerät, Art | Ausgangszustand | Handlung | Erwartet |
|---|---|---|---|---|
| APD-129/M-1 | iPhone, Home-Bildschirm | Startliste hoch | quer → hoch | `scrollY` 0, `--vv-top` 0, Kopfzeile oben unter der Statusleiste; Antippen des Mehr-Knopfs (ellipsis) öffnet das Menü |
| APD-129/M-2 | iPhone, Home-Bildschirm | Reiselogbuch offen, gerollt | quer → hoch | wie M-1; Zurück-Knopf trifft; oberster Tag bleibt (R-8.1) |
| APD-129/M-3 | iPhone, Home-Bildschirm | Blatt (Tag bearbeiten) offen, ohne Fokus im Feld | quer → hoch | Blatt beginnt knapp unter der Statusleiste (R-4.6), x trifft |
| APD-129/M-4 | iPhone, Home-Bildschirm | Feld mit Fokus, Tastatur offen | quer → hoch | Verschiebung durch Safari bleibt erlaubt; Feld und Kopfzeile sichtbar über der Tastatur (R-4.5) – keine Verschlechterung |
| APD-129/M-5 | iPhone, Home-Bildschirm | Startliste hoch | zweimal hintereinander quer → hoch | wie M-1 |
| APD-129/M-6 | iPhone, Safari (nicht Home-Bildschirm) | Startliste hoch | quer → hoch | unverändert wie heute |
| APD-129/M-7 | iPad, Home-Bildschirm | Reiselogbuch quer | hoch → quer | unverändert wie heute (R-8.1) |
| APD-129/M-8 | iPhone, Home-Bildschirm | Messung 0948 | nachspielen (`abspielen.mjs`) | Kopfzeile ± 1 px wie vor dem Drehen |
| APD-129/M-9 | Gegenprobe | M-1 ohne die Korrektur in `ui.js` | – | rot (gegen 4.59.0) |

## Testfall (User) für den Usertest

iPhone, App vom Home-Bildschirm: hoch → quer → hoch in Startliste, im Reiselogbuch und mit offenem Blatt. Erwartet: Die App bleibt oben,
alle Knöpfe reagieren.
