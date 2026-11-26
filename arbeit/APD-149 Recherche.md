# APD-149 Framework mit Steuer-Bean – Recherche Runde 2 (Sitzung 0165)

**26.11.2026** · Ergänzt **Runde 1** aus Sitzung 0164 (`arbeit/0164 APD-149 Recherche und Varianten.md`, Commit 2443f14: Recherche, Varianten V-1 bis V-3,
Antwort iOS 26.2 oder neuer). Hier steht nur, was neu ist. Offen aus Runde 1: Frage 1 (Variante) und Frage 3 (HIG-Grundsätze).

## 0. Befund heute in `v4/ui.js` (4.70.2, 3.867 Zeilen, 71 Namen in `schnittstelle.json`)

Jede Art, die erscheint und wieder geht, regelt Tönung, Freigabe, Fokus, Sperre und Lage **selbst**:

| Art | Öffnen | Tönung der Quelle | Freigabe | Fokus zurück | Sperre dahinter |
|---|---|---|---|---|---|
| Menü | `openMenu` (886) | `adSourcehighlight.hold(anchor)` (906) | `release(anchor)` in `close` (938) | eigene `fokus(it)` (904) | eigene Ebene `layer` |
| Untermenü | in `openMenu` | `hold(b)` (952) | `release(it)` (903) | eigene | – |
| Sprechblase | 1055 | `hold(anchor)` (1055) | `release` (1069) | eigene | eigene Ebene |
| Fenster `#dlg` | `openDialog` (2048) | App setzt `sourceItem` | Close-Handler (2336 f.) | `dlgVorher` (2058, 2343) | `lockPage` / `unlockPage` |
| Hinweisfenster `#msg` | `adAlert.showModal` (1982) | App (`hold`/`release`, `outputSource`) | App | `msgVorher` (1999, 2346) | `lockPage` / `unlockPage` |
| Wischaktionen | `swipeactions` (2883) | – | – | – | eigene `inert` (2956, 3058) |
| Neuaufbau | – | `refresh(document)` (826, 2070) | Tausch alt → neu (seit 4.70.2) | – | – |

- `aria-expanded` wird an **7 Stellen** von Hand gesetzt (805–953), `inert` an 17, `showModal` an 10, Close-Handler an 4.
- **Folge:** Ein neuer Weg (z. B. Ergebnis im Hinweisfenster statt im Fenster) muss alle Spalten selbst richtig machen. P-122/F-1, P-124/F-2 und das fehlende
  `aria-expanded` nach Neuaufbau (0163) sind Lücken in genau diesen Spalten.
- Eine gemeinsame Stelle, die weiß, **was gerade über wem offen ist**, gibt es nicht. Es gibt nur `dlgVorher` und `msgVorher` je Fenster.

## 1. Apple (UIKit, SwiftUI, HIG)

*folgt (Hilfsagent 1)*

## 2. Web-Plattform in Safari

*folgt (Hilfsagent 2)*

## 3. Zustandsautomaten und iOS-artige Web-Frameworks

*folgt (Hilfsagent 3)*
