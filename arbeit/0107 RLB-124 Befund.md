# RLB-124 – PDF in der App vom Home-Bildschirm: Befund und Vorschlag

**Stand 12.11.2026** · Sitzung ‚Reiselogbuch 0107‘

## Ergebnis der Proben (Nutzer 12.11.2026)

| Probe | Ergebnis |
|---|---|
| A – iPad, App vom Home-Bildschirm | Hinweisfenster mit Dateiname erscheint, das Drucken-Menü **nicht** |
| B – iPad, **Safari** | Drucken-Menü **öffnet sich** |
| C – iPhone, App vom Home-Bildschirm | Drucken-Menü öffnet sich **nicht** |
| D – iPadOS | **27.2**, Update seit dem 31.10.2026: ja |

## Befund

- Derselbe Code (3.55.0) druckt in Safari, aber nicht in der App vom Home-Bildschirm, und das auf iPad und iPhone. Weder App noch AppDesign
  haben einen Zweig, der im Home-Bildschirm-Modus anders druckt: `display-mode: standalone` kommt in `ui.js` nur in der Kopfzeile des
  Messmodus vor. In der Nachbildung (Chromium, WebKit) wird `window.print()` beim Antippen ohne Fehler aufgerufen.
- **Die Ursache liegt also im Home-Bildschirm-Modus von Safari, nicht in einer Änderung von 3.55.0.** Vermutung, nicht belegt: Seit dem
  Update (zuletzt ok am 31.10.2026, P-84) übergeht iPadOS/iOS dort `window.print()` stillschweigend. Eine Quelle dafür habe ich nicht gefunden. Die Suche
  zeigt nur ähnliche Meldungen: [Apple-Forum: Drucken in Vollbild-Web-App](https://developer.apple.com/forums/thread/22911),
  [Shopify: window.print() scheitert still in einer App-Ansicht](https://community.shopify.dev/t/app-home-window-print-silently-fails-in-shopify-mobile-app/37762).
- **Warum die Prüfung es übersah:** Die Prüfungen laufen in Chromium und WebKit als Browser. Den Home-Bildschirm-Modus von iOS und sein
  Drucken-Menü können sie nicht nachbilden (Gerät, Designrichtlinie 13). Den Fehler als Prüfung nachstellen, die gegen 3.55.0 rot ist (0 Nr. 1), geht darum nicht.

## Mögliche Wege (zu klären)

| Weg | Was passiert | Aufwand |
|---|---|---|
| a | **PDF als Datei ins Teilen-Menü**, wie heute ‚HTML‘ (das klappt in P-101/13). Die App erzeugt das PDF selbst. | groß (PDF-Baustein, Emojis, Schrift) |
| b | **HTML-Datei teilen, im Teilen-Menü ‚Drucken‘ wählen**, dann ‚In Dateien sichern‘ als PDF. Klappt nur, wenn iOS ‚Drucken‘ für die Datei anbietet. | klein |
| c | **Ausgabe in einem eigenen Fenster öffnen** und dort drucken. Ob iOS das in der App vom Home-Bildschirm zulässt, ist offen. | klein |
| d | Nur einen Hinweis zeigen: ‚PDF in Safari erstellen‘. Die Daten der App vom Home-Bildschirm sind in Safari aber nicht vorhanden. | klein, aber unpraktisch |

Welche Wege am Gerät funktionieren, weiß ich nicht. **Vorschlag:** ein **Versuch** (Muster mit Messung, 0 Nr. 20 und 2.7). Du legst eine
kleine Seite auf den Home-Bildschirm. Sie führt dich durch die Wege b, c und ein kleines Test-PDF für a, außerdem durch `window.print()` mit und ohne offenes Fenster.
Danach wählst du mit mir den Weg, erst dann wird gebaut (nur nach deinem ‚Ja‘).

## Offener Usertest

- **P-101** (Reiselogbuch 3.55.0, AppDesign 4.57.0): ok bis auf /16 Schritt 3 → **RLB-124**.
