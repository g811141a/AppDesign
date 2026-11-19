# APD-140 Bean-Katalog – Muster iPad quer hell

**Stand 19.11.2026** · Sitzung 0141 · Aufbau nach `arbeit/0139 APD-140 Bean-Katalog Vorschlag.md` (bestätigt) · noch nichts gebaut

## Apple-Abgleich (0 Nr. 23, 2.6)

**So macht es Apple:** Apple hat für seine Bausteine eine eigene Beispiel-App, den **UIKit Catalog**. Ihre Seite sagt: „The sample uses a split-view controller
architecture to navigate UIKit views and controls.“ Links steht die Liste der Bausteine, rechts je Baustein eine Seite. Manche Bausteine zeigt sie in mehreren
Varianten („different ways“), und sie hat einen eigenen Abschnitt zu den Bedienungshilfen.
Die Liste dort ist flach, ohne Gruppen.
- **HIG Sidebars** (Stand 8.6.2026):
  - „use succinct, descriptive labels to title each group“
  - „show no more than two levels of hierarchy“
  - „Consider using familiar symbols to represent items in the sidebar“
  - „Avoid hiding the sidebar by default“
- **HIG Split Views:** „persistently highlight the current selection in each pane that leads to the detail view.“
- **Vorbild für die Bean-Seite: Einstellungen am iPad** (`apple-referenz/ipad/einstellungen/einstellungen-02-quer.png`). Oben eine Karte mit großem Symbol,
  Titel und einem Satz, darunter Gruppen mit grauer Überschrift.

Quellen (in dieser Sitzung gelesen):
- [UIKit Catalog](https://developer.apple.com/tutorials/data/documentation/uikit/uikit-catalog-creating-and-customizing-views-and-controls.md)
- [HIG Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars)
- [HIG Split Views](https://developer.apple.com/design/human-interface-guidelines/split-views)

**Übertragen auf den Katalog:** Der Katalog wird ein Split View wie unsere Apps. Die Seitenleiste ist nach Bereichen gruppiert (2 Ebenen), jede Bean hat ein
Symbol, und die gewählte Bean bleibt blau. Am iPhone ist die Liste die Startseite (R-1.1, R-7.2).

**HIG-Checkliste (16):**
- **1 Antippflächen:** Kacheln sind mindestens 60 px hoch.
- **2 Schrift:** Apple-Textstile.
- **4 Auswahl:** bleibt blau.
- **6 Kontextmenü:** Die Wischaktionen zeigen dieselben Aktionen wie das Kontextmenü.
- **8 Texte:** deutsch, ‚…‘.

**Regeln (17):**
- R-1.1, R-1.2 (Darstellung im Mehr-Menü der Seitenleiste)
- R-2.1, R-2.2
- R-7.1, R-7.2, R-7.5, R-7.6, R-8.1
- R-1.13 (Erweiterung `checkBeans`, Wortlaut vor dem Bau)

**Bewusste Abweichungen:**
- Die Seitenleiste hat keine Suche, weil es erst 2 Beans gibt. ‚Suchen‘ kommt ins Mehr-Menü, sobald die Liste wächst (R-2.3).
- Die Symbole kommen aus dem Satz von `ui.js`. Für Wischaktionen fehlt ein passendes, im Muster steht dort chevron-left.

## Das Muster

- **Seitenleiste ‚AD-Beans‘:**
  - unter dem Titel ‚2 AD-Beans · 3 geplant‘
  - darunter die Bereiche als Abschnittsköpfe
  - je Bean eine Kachel mit Symbol, Name und ‚Kennung · seit Version‘
  - die geplanten Beans (`gedrueckt`, `field`, `decimal`) grau und ohne Pfeil
  - im Mehr-Menü: Darstellung und die Versionszeile
- **Bean-Seite, Variante A** (eine Seite wie Einstellungen), von oben nach unten:
  - Karte mit Symbol, Name, Satz und Steckbrief
  - Ausprobieren: die echte Bean
  - Ereignisse: Protokoll von `on(…)`
  - Regeln
  - Fabrik, Eigenschaften (Standard rechts), Nur lesen, Methoden, Ereignisse
  - Verlauf
- **Bean-Seite, Variante B:** dieselbe Karte, darunter eine Auswahl-Kapsel ‚Ausprobieren · Regeln · Schnittstelle · Verlauf‘. Es ist immer nur ein Teil zu sehen.
- **Ausprobieren:**
  - **`hinweis`:** 4 Fälle (kurz, langer Dateiname, breit, mit Schaltfläche) und der Schalter ‚Breite nach Dateiname‘.
  - **`swipeactions`:** 3 Kacheln zum Wischen. Die erste hat einen langen Titel, die dritte keine Aktionen. ‚Löschen‘ fragt mit der Sprechblase, und
    langes Drücken öffnet das Kontextmenü.

**Bilder** (iPad quer, hell):
1. Variante A, Hinweisfenster
2. Variante A, Wischaktionen mit offener Kachel. Die Kachel läuft wie in Notizen links aus der Liste.
3. Variante A, langer Dateiname: am iPad in einer Zeile
4. Variante B, Wischaktionen mit Auswahl-Kapsel

**Zum Ausprobieren am iPad** (nach dem Hochladen, sobald Pages fertig ist):
- `https://g811141a.github.io/AppDesign/arbeit/APD-140/index.html?v=A#hinweis`
- `https://g811141a.github.io/AppDesign/arbeit/APD-140/index.html?v=B#swipeactions`

**Schritte:**
1. Die Adresse mit `v=A` öffnen. Erwartet: links ‚AD-Beans‘, ‚Hinweisfenster‘ ist blau.
2. ‚Langer Dateiname‘ antippen. Erwartet: Fenster ‚Backup‘, der Dateiname steht in einer Zeile.
3. ‚Breite nach Dateiname‘ ausschalten, dann Schritt 2 wiederholen. Erwartet: Der Dateiname bricht um, unter ‚Ereignisse‘ steht ‚zu‘.
4. Links ‚Wischaktionen‘ antippen und die erste Kachel nach links wischen. Erwartet: ‚Einstellen‘ und ‚Löschen‘, unter ‚Ereignisse‘ ‚offen · Erster Eintrag …‘.
5. Die Adresse mit `v=B` öffnen und in der Kapsel ‚Schnittstelle‘ antippen. Erwartet: Fabrik, Eigenschaften, Methoden und Ereignisse.

## Testfall-Liste

`arbeit/APD-140 Testfall-Liste.md`:
- **Muster (M-1 bis M-9):** Chromium und WebKit, je 2 Varianten × 4 Lagen. Alle grün, die Gegenproben `zeile` und `wisch` werden rot.
- **Für den Bau:** Z-1 bis Z-5.

## Allgemein oder App, AD-Bean

- **Allgemein:** Der Katalog liegt in AppDesign `katalog/`.
- **AD-Bean: keine.** Der Katalog ist keine Bean, er zeigt sie. Die Beans bleiben unverändert.
- **Neu im Bau:** Die Prüfung Z-1 erweitert `checkBeans` (R-1.13). Der Wortlaut dafür kommt vor der Bau-Frage (0 Nr. 29).

## Offene Fragen

1. Variante A oder B für die Bean-Seite?
2. Geplante Beans grau in der Seitenleiste zeigen?
3. Für Wischaktionen ein neues Lucide-Symbol in `ui.js` aufnehmen (Vorschlag `hand`), oder beim vorhandenen Satz bleiben?
