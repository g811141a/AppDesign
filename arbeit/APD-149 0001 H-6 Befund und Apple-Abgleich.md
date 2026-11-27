# APD-149 – Durchlass in der Kopfzeile (H-6): heutiges Verhalten und Apple-Abgleich (Sitzung AppDesign 0001)

**26.11.2026** · Schritt 3 aus `arbeit/APD-149 Uebergabe.md`. Nummern H-, S-, W- wie in `arbeit/APD-149 Grobentwurf V-3.md`.

## 1. Heute im Reiselogbuch 3.58.5 (AppDesign 4.70.2) – gemessen

**Aufbau der Messung:**
- Skript im Notizordner (`h6c.mjs`), Chromium 158 und WebKit 26.0.
- Ansicht iPad quer, 1180 × 820, Berührung.
- Ein Reiselogbuch ist offen.
- Zwischen zwei Tipps liegen 1000 ms.
- Kopfzeile: in der Seitenleiste ‚Neues Reiselogbuch‘ und ‚Mehr‘, im Eintrag ‚Ausgabe‘ und ‚Mehr‘.

| Fall (Chromium und WebKit gleich) | 1. Tipp | 2. Tipp |
|---|---|---|
| ‚Ausgabe‘ offen → Tipp auf ‚Mehr‘ | Menü zu, sonst nichts (Tönung und `aria-expanded` weg) | Menü ‚Mehr‘ offen |
| ‚Mehr‘ offen → Tipp auf ‚Ausgabe‘ | Menü zu, sonst nichts | Menü ‚Ausgabe‘ offen |
| ‚Ausgabe‘ offen → Tipp auf ‚Mehr‘ der Seitenleiste | Menü zu, sonst nichts | Menü ‚Mehr‘ (Seitenleiste) offen |
| ‚Mehr‘ (Seitenleiste) offen → Tipp auf ‚Mehr‘ im Eintrag | Menü zu, sonst nichts | Menü ‚Mehr‘ offen |
| ‚Ausgabe‘ offen → Tipp auf ‚Ausgabe‘ | Menü zu | – |
| ‚Ausgabe‘ offen → Tipp auf ‚Neues Reiselogbuch‘ (ohne Menü) | Menü zu, **kein** Fenster | – |

- **Ergebnis:** Heute braucht jede andere Schaltfläche der Kopfzeile bei offenem Menü **zwei Tipps**. Der erste schließt nur das Menü.
- **Ursache** (`v4/ui.js`):
  - `openMenu` legt eine Schicht über die ganze Seite (`blockingLayer`).
  - Der Tipp auf die Schicht schließt das Menü.
  - `klickVerschlucken` schluckt den Klick an dieser Stelle (40 px, bis 700 ms). Darum kommt er bei der Schaltfläche darunter nicht an.
- **Der Tipp auf die eigene Schaltfläche schließt schon heute.** Das ist wie bei Apple.

## 2. So macht es Apple (Quellen dieser Sitzung)

Ein Hilfsagent (Opus 5.5, Aufwand hoch) hat die JSON-Fassung der Apple-Doku gelesen, jeweils HTTP 200.

1. **`UIPopoverPresentationController.barButtonItem`** – [Seite](https://developer.apple.com/documentation/uikit/uipopoverpresentationcontroller/barbuttonitem):
   - „Prior to presentation, the presentation controller adds all sibling bar button items of the specified item (but not the item itself) to the
     popover's list of passthrough views.“
   - „UIKit automatically intercepts taps in the specified item and uses them to dismiss the popover.“
   - „If you want taps in the other bar button items to dismiss the popover, you must add code to the action handlers of those items.“
   - Laut Seite ist die Eigenschaft ab iOS/iPadOS 27.0 veraltet. Der Ersatz ist **`sourceItem`**. Das passt zu unserem Namen im Grobentwurf.
2. **`passthroughViews`** – [Seite](https://developer.apple.com/documentation/uikit/uipopoverpresentationcontroller/passthroughviews):
   - „When a popover is active, interactions with other views are normally disabled until the popover is dismissed.“
3. **`UIPopoverController.present(from:…)`** (alt, iOS 9) – [Seite](https://developer.apple.com/documentation/uikit/uipopovercontroller/present(from:permittedarrowdirections:animated:)):
   - „Thus, taps in the toolbar result in the action methods of the corresponding toolbar items being called.“
4. **`UIBarButtonItem.menu`** – [Seite](https://developer.apple.com/documentation/uikit/uibarbuttonitem/menu): Diese Seite sagt dazu nichts.

**Daraus:**
- Bei Apple wirkt ein Tipp auf eine **andere** Schaltfläche der Leiste sofort. Ihre Aktion läuft, auch wenn sie kein Menü hat.
- Ein Tipp auf die **eigene** schließt.
- Der Rest der Seite ist gesperrt.
- **Nicht belegt** in diesen Quellen sind zwei Punkte:
  - ob der Tipp außerhalb nur schließt,
  - wie sich ein UIKit-`menu` an einer Schaltfläche der Leiste genau verhält.

## 3. Folgen für das Muster

- **APD-149/H-6 bleibt** (Nutzer: Q-2 ja). Die Schicht von `presentation` lässt Tipps auf die Kopfzeile durch. Der Tipp auf eine andere Schaltfläche schließt das
  offene Menü. Das ist H-1: nur ein Popover zur Zeit, `reason: 'replaced'`. Dann führt die Schaltfläche ihren Befehl aus.
- **Neu zu entscheiden:** Was gilt für eine Schaltfläche der Kopfzeile **ohne** Menü (z. B. ‚Neues Reiselogbuch‘)? Laut Apple läuft auch ihre Aktion
  direkt. Im Grobentwurf nennt H-6 nur Schaltflächen mit Menü.
  - **Empfehlung:** wie Apple. Jede andere Schaltfläche der Kopfzeile wirkt beim ersten Tipp, das Menü geht dabei zu.
- **Was davon betroffen ist:**
  - HIG-Checkliste (Designrichtlinie 16): Punkt 4 Auswahl, 5 Menüs, 7 Abfragen, 9 Fenster.
  - Katalog: R-1.8, R-3.3, R-4.1, R-4.9, R-4.13, R-7.3, R-8.1, R-1.13.
- **Bewusste Abweichung** (bleibt wie im Grobentwurf 3): Am iPhone bleibt eine Abfrage eine Sprechblase. Apple macht daraus ein Blatt.
- **Bekannte Grenze im Web:** `klickVerschlucken` gibt es, weil Safari nach dem Schließen sonst den Klick an die Seite darunter gibt. Im Muster
  darf die Schicht die Kopfzeile nicht abdecken. Nur außerhalb der Kopfzeile wird weiter geschluckt. Das prüfe ich mit
  APD-149/S-5 in Chromium und WebKit (Safari-Modell).

## 4. Stand und Vorschlag

- Wortlaut freigegeben (APD-149/J-1, J-2), auf `main` (Commit 72a9894).
- Schritt 3 (Befund und Apple-Abgleich) ist fertig.
- **Kontext 237.877.** Das Muster umfasst die Schritte 4 und 5 der Übergabe:
  - zwei Beans mit Kopfzeile, Menüs, Untermenü, Fenster, Hinweisfenster, Teilen und Protokoll,
  - APD-149/S-1 bis S-15 in Chromium und WebKit.
- Das passt nicht mehr sicher bis 300.000 (0 Nr. 13). **Vorschlag:** jetzt übergeben. Das Muster baut die Sitzung ‚AppDesign 0002‘ von Anfang an.

## 5. Entschieden (Nutzer 27.11.2026, Sitzung AppDesign 0001, im Fenster)

- **APD-149/J-3:** Bei offenem Menü wirkt **jede andere Schaltfläche der Kopfzeile beim ersten Tipp**, auch eine ohne Menü (z. B. ‚Neues Reiselogbuch‘),
  wie bei Apple. Das Menü geht dabei zu (`reason: 'replaced'`). Der Tipp auf die eigene Schaltfläche schließt. H-6 im Grobentwurf ist damit erweitert.
- **APD-149/J-4:** Jetzt übergeben. Das Muster baut die Sitzung ‚AppDesign 0002‘.
