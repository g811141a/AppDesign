# Name für `gedrueckt` und Bean-Namen auf Englisch – Vorschlag

Sitzung 0144, 20.11.2026, Frage des Nutzers.

## 1. Englische Bean-Namen – meine Meinung: ja, für den Code

**Empfehlung: Kennung und Schnittstelle (Eigenschaften, Methoden, Ereignisse) englisch; alles, was man liest, bleibt deutsch** (Regeltexte, Katalog-Texte,
Meldungen, Spaltenköpfe wie ‚Anlegen‘). Gründe:

- **Passt zur bestehenden Regel:** Zusammenarbeit 1 sagt schon: „Englisch bleiben nur Code, Dateinamen und Fachbegriffe“ – Kennungen und Schnittstelle sind
  Code.
- **Heute gemischt:** `swipeactions` und die geplanten `field` und `decimal` sind englisch, `hinweis` ist deutsch; die Schnittstellen sind deutsch
  (`zeigen`, `schliessen`, `kacheln`, `offen`); `ui.js` selbst ist überwiegend englisch (`openMenu`, `confirmPop`, `createSync`, `setOpener`).
- **Wie Apple:** die Vorbilder heißen englisch (UIKit: `sourceItem` – „The item on which to anchor the popover.“; `isHighlighted` – „A Boolean value
  indicating whether the control draws a highlight.“, Apple-Dokumentation, gelesen über die JSON-Fassung).
- **Jetzt am billigsten:** es gibt erst 2 Beans; jede weitere macht das Umstellen teurer.

**Was es kostet** (eine eigene Version, Wortlaut nach 0 Nr. 29 vorher):
- R-1.13 ergänzen: ‚Kennung und Schnittstelle englisch, Texte deutsch‘.
- `hinweis` → neue Kennung (Vorschlag `notice`, ‚ersetzt `hinweis`‘ nach R-1.13): `zeigen` → `show`, `schliessen()` → `close()`, `offen` → `isOpen`,
  `breiteNachDateiname` → `fitFileName`, Ereignis `zu` → `close`; `inform(…)` bleibt.
- `swipeactions`: `kacheln` → `tiles`, `aktionen` → `actions`, `offen` → `openTile`, `masse` → `metrics`, `schliessen()` → `close()`, `entfernen()` →
  `destroy()`, Ereignisse `offen`/`zu` → `open`/`close` – dazu die Aufrufe in der App (Reiselogbuch).
- Katalog-Dateien, Liste der AD-Beans, Prüfungen, die die Namen nennen; `checkBeans` selbst bleibt.
- Deutsche Begriffe im Text bleiben: ‚Anlegen‘, ‚Eigenschaften‘, ‚Nur lesen‘, ‚Methoden‘, ‚Ereignisse‘.

**Sonst:** alles deutsch (dann `swipeactions`, `field`, `decimal` umbenennen) oder gemischt lassen (wie heute).

## 2. Name für `gedrueckt`

Aufgabe der Bean: die Schaltfläche, Zeile oder Kachel, aus der ein Fenster, ein Menü oder eine laufende Aktion (Teilen, Dateiauswahl) kommt, bleibt blau
getönt, bis es fertig ist (R-3.3). ‚Gedrückt‘ passt schlecht – gedrückt heißt bei uns schon die Rückmeldung, solange der Finger liegt (R-3.6).

| | Kennung | Anlegen | Bewertung |
|---|---|---|---|
| a | **`sourcehighlight`** | `createSourcehighlight(wurzel)` | **Empfehlung** – Apple nennt das Element, aus dem ein Popover kommt, *source* (`sourceItem`), *highlight* = getönt; sagt genau die Aufgabe |
| b | `opener` | `createOpener(wurzel)` | kurz, wie heute `setOpener`; klingt aber nur nach Fenster, nicht nach Menü und Teilen |
| c | `activesource` | `createActivesource(wurzel)` | ‚die Quelle, die gerade aktiv ist‘ – genau, aber weniger geläufig |
| d | deutsch `ausloeser` | `createAusloeser(wurzel)` | falls alles deutsch bleibt – ‚der Auslöser bleibt getönt‘ |

Nicht empfohlen: `highlight` allein (bei Apple heißt *highlighted* auch ‚Finger liegt‘, wie R-3.6), `selection` (Verwechslung mit dem gewählten
Listeneintrag R-7.1), `pressed` (wie ‚gedrückt‘).

Die Schnittstelle bei englischen Namen (nach APD-136/E-1 und E-3): `held` · `source` (nur lesen) · `hold(sel)` · `release(sel)` · `setSource(sel)` ·
`clearSource()` · `refresh(wurzel)` · Ereignis `change`.

## Reihenfolge, falls ‚englisch‘

1. Wortlaut R-1.13 (englische Namen) und neue Namen für `hinweis` und `swipeactions` zur Freigabe.
2. Bean `sourcehighlight` gleich englisch.
3. Bau mit der nächsten Version (APD-136, gleiches Thema) – vorher die Bau-Frage.
