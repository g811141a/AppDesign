# APD-129 – vorbereitet, Bau-Frage

**14.11.2026 · Sitzung 0112** · Zweige `vorbereitung-4.59.1` (AppDesign) und `vorbereitung-3.56.1` (ReiseLogBuch), hochgeladen

## Vorbereitet

- **`ui.js` (`placeDialogs`):** Ohne Tastatur und ohne Feld mit Fokus setzt `ui.js` die Verschiebung durch Safari auf 0 zurück, mit Rollbereich
  immer und ohne Rollbereich, wenn die Seite nicht rollen kann. Bei offener Tastatur bleibt alles wie bisher.
- **Safari-Modell:** `drehRest` (Verschiebung um die Statusleiste nach dem Drehen, Antippen trifft daneben) und `safariDrehenHoch`
  (quer → hoch wie gemessen).
- **Neue Prüfung `ablauf-drehen-iphone`:** APD-129/M-1 bis M-6.
  - Gegen 4.59.0 in Chromium und WebKit **rot** (je 6 Fehler: App 62 px tiefer, Antippen trifft daneben, oben ein anderer Tag).
  - Mit der Korrektur in Chromium und WebKit **grün**.
- **Tastatur-Prüfungen mit der Korrektur grün (Chromium):** `ablauf-feld-tastatur`, `ablauf-tastatur-still`, `ablauf-feld-rollen`, `ablauf-suche-iphone`,
  `ablauf-abspielen`, `kapsel-iphone`. Dazu `doku-regeln` und `version-regeln` grün.
- **Abweichung von der Testfall-Liste:**
  - APD-129/M-7 (iPad): deckt die bestehende Drehprüfung ab (`hig.mjs`).
  - APD-129/M-8 (Messung nachspielen): entfällt, weil `abspielen.mjs` das Drehen ohne die Verschiebung nachspielt.
  - APD-129/M-4 (Tastatur offen): ohne Grundregeln, das Feld steht dort absichtlich teils unter der Tastatur.
- **Texte:** CHANGELOG 4.59.1 und 3.56.1 mit Testfällen P-104/0 bis P-104/4, Backlogs, `tests/README.md`, `alle.mjs`.
- **Stufe:** Das Skript schlägt **voll** vor (AppDesign geändert).

## Wortlaut zur Bestätigung (Zusammenarbeit 0 Nr. 20 und 29) – Designrichtlinie allgemein 13

**Alt:** – (neu)

**Neu**, als Punkt nach ‚Kein Scroll-Anker‘:

> - **Verschiebung nach dem Drehen (iPhone, Home-Bildschirm):** quer → hoch meldet Safari kurz die ganze Bildschirmhöhe (874 statt 812), dann
>   wieder 812, und lässt die Seite danach um die Statusleiste verschoben (`scrollY` und `visualViewport.offsetTop` 62) – ohne Tastatur, obwohl
>   die Seite nicht rollen kann. Das Bild bleibt dabei unverschoben, Antippen trifft 62 px daneben; erst `scrollTo(0, 0)` bzw. ein Neuaufbau der
>   Seite stellt es richtig. ui.js setzt die Seite deshalb ohne Tastatur und ohne Feld mit Fokus auf 0 zurück (`placeDialogs`, R-8.1); Safari-Modell
>   `drehRest` (Messung 14.11.2026, Safari 27.2, APD-129).

## Bau-Frage

Soll ich Version **AppDesign 4.59.1 mit Reiselogbuch 3.56.1** (APD-129, iPhone: keine Verschiebung nach dem Drehen) erstellen, mit Prüfstufe **voll** (~60 min)?

## Offene Usertests

Keiner. P-103 ist erledigt; P-104 kommt mit der neuen Version.
