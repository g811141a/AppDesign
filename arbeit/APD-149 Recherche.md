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

## 1. Apple – neu gegenüber Runde 1 (Hilfsagent Opus 5.5, Aufwand hoch, nur developer.apple.com)

**So macht es Apple: Präsentation**
- **Durchlass in der Kopfzeile:** Ist ein Popover an einer Schaltfläche der Leiste offen, bleiben die anderen Schaltflächen der Leiste bedienbar.
  Ein Tipp auf die eigene Schaltfläche schließt es. Der Rest der Seite ist gesperrt.
  – [barButtonItem](https://developer.apple.com/documentation/uikit/uipopoverpresentationcontroller/barbuttonitem),
  [passthroughViews](https://developer.apple.com/documentation/uikit/uipopoverpresentationcontroller/passthroughviews)
- **Zwei Wege zum Schließen:** `presentationControllerDidDismiss` kommt nur, wenn der Nutzer schließt, nicht wenn die App schließt.
  `presentationControllerShouldDismiss` → `false` verweigert das Schließen, `didAttemptToDismiss` meldet den Versuch (z. B. für ‚Änderungen verwerfen?‘).
  `isModalInPresentation` sperrt das Schließen von außen ganz.
  – [didDismiss](https://developer.apple.com/documentation/uikit/uiadaptivepresentationcontrollerdelegate/presentationcontrollerdiddismiss(_:)),
  [shouldDismiss](https://developer.apple.com/documentation/uikit/uiadaptivepresentationcontrollerdelegate/presentationcontrollershoulddismiss(_:)),
  [isModalInPresentation](https://developer.apple.com/documentation/uikit/uiviewcontroller/ismodalinpresentation)
- **Anpassung an die Breite:**
  - Ein Popover wird bei kompakter Breite (iPhone) zum Sheet.
  - Ein Sheet wird bei kompakter Höhe zum Vollbild.
  - Ein `confirmationDialog` erscheint bei normaler Breite (iPad) als Popover.
  – [popover](https://developer.apple.com/documentation/uikit/uimodalpresentationstyle/popover),
  [pageSheet](https://developer.apple.com/documentation/uikit/uimodalpresentationstyle/pagesheet),
  [confirmationDialog](https://developer.apple.com/documentation/swiftui/view/confirmationdialog(_:ispresented:titlevisibility:actions:))
- **Stapel:** `dismiss` auf einer unteren Ebene schließt alles darüber. Nur die oberste Ebene wird animiert.
  – [dismiss](https://developer.apple.com/documentation/uikit/uiviewcontroller/dismiss(animated:completion:))
- **Tönung der Quelle:** Apple beschreibt nur `tintAdjustmentMode = .dimmed` (entsättigt, wird vererbt).
  Dass UIKit beim Präsentieren selbst dimmt, steht nur bei Dritten. Bei Apple steht es **nicht**.
  Die Tönung der Quelle bleibt damit unser eigenes Merkmal.
  – [tintAdjustmentMode](https://developer.apple.com/documentation/uikit/uiview/tintadjustmentmode-swift.property)

**So macht es Apple: Befehle**
- **‚Möglich‘ wird erfragt, nicht gesetzt:**
  - `canPerformAction` fragt die Responder-Kette. Sagt kein Responder ‚ja‘, ist der Befehl gesperrt.
  - `validate(_:)` passt Titel, Zustand und Attribute direkt vor dem Zeichnen an.
  – [canPerformAction](https://developer.apple.com/documentation/uikit/uiresponder/canperformaction(_:withsender:)),
  [validate](https://developer.apple.com/documentation/uikit/uiresponder/validate(_:))
- **Merkmale eines Befehls:**
  - Attribute `disabled`, `destructive`, `hidden`, `keepsMenuPresented`.
  - Zustand `on`/`off`/`mixed`.
  - Gruppen `displayInline` (Trennlinie statt Untermenü) und `singleSelection`.
  – [Attributes](https://developer.apple.com/documentation/uikit/uimenuelement/attributes),
  [State](https://developer.apple.com/documentation/uikit/uimenuelement/state),
  [UIMenu.Options](https://developer.apple.com/documentation/uikit/uimenu/options-swift.struct)
- **Schaltfläche mit Befehl:** Mit `primaryAction` übernimmt eine Schaltfläche Titel und Bild des Befehls. Mit `menu` öffnet sie beim Tippen ein Menü.
  – [primaryAction](https://developer.apple.com/documentation/uikit/uibarbuttonitem/primaryaction),
  [menu](https://developer.apple.com/documentation/uikit/uibarbuttonitem/menu)
- **Rollen und Plätze in der Leiste:**
  - `ButtonRole` kennt `cancel`, `destructive`, `close` und `confirm`.
  - Die Plätze in der Leiste sind nach Bedeutung benannt (`confirmationAction`, `cancellationAction`, `primaryAction`).
  - Was nicht passt, kommt von selbst in ein Überlaufmenü.
  – [ButtonRole](https://developer.apple.com/documentation/swiftui/buttonrole),
  [ToolbarItemPlacement](https://developer.apple.com/documentation/swiftui/toolbaritemplacement)

**So macht es Apple: HIG, zentral prüfbar**
- **Gleicher Befehl, anderer Ort, andere Darstellung:**
  - Im Menü und in der Menüleiste ist ein nicht möglicher Befehl **gedimmt**.
  - Im Kontextmenü ist er **ausgeblendet**.
  - Jeder Punkt des Kontextmenüs steht auch in der Hauptoberfläche.
  – [Menus](https://developer.apple.com/design/human-interface-guidelines/menus),
  [Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus),
  [The menu bar](https://developer.apple.com/design/human-interface-guidelines/the-menu-bar)
- **Alert:** höchstens 3 Schaltflächen, ‚Abbrechen‘ ist nie die Standardschaltfläche, Esc bricht ab.
  – [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- **Leiste:** höchstens eine hervorgehobene Hauptaktion (rechts), höchstens 3 Gruppen.
  – [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- **Sheet:** ‚Fertig‘ immer zusammen mit ‚Abbrechen‘ (links) oder ‚Zurück‘, nie alle drei.
  – [Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- **Popover:** Schließt es von selbst, wird gespeichert. Verworfen wird nur über ‚Abbrechen‘.
  – [Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers)

**Weiter nicht belegt:** Fokus-Rückgabe nach dem Schließen (bei Apple; belegt nur im WAI-Muster, Runde 1). Was passiert, wenn man über einem schon präsentierten Fenster präsentiert.

## 2. Was das für die Varianten heißt

V-3 (Empfehlung aus Runde 1) bekommt dadurch klare Vorbilder für die Teile, die in Runde 1 noch offen waren:

- **Befehle mit Prüfung statt Zustand von Hand:** Jeder Befehl hat `validate()`. Das Framework fragt vor jedem Zeichnen, ob er möglich ist
  (wie `canPerformAction`/`validate`). Ein Neuaufbau ist dann gefahrlos.
- **Ort bestimmt die Darstellung:** Derselbe Befehl erscheint im Menü gedimmt, im Kontextmenü ausgeblendet und in der Leiste als Schaltfläche.
  Die App schreibt das nicht selbst.
- **Durchlass in der Kopfzeile:**
  - Bei offenem Menü öffnet ein Tipp auf eine andere Schaltfläche der Kopfzeile direkt deren Menü.
  - Ein Tipp auf die eigene Schaltfläche schließt das Menü.
  - **Vorschlag:** heutiges Verhalten im Reiselogbuch erst prüfen.
- **Schließen mit Rückfrage:** `shouldDismiss`. Der Stapel meldet ‚vom Nutzer geschlossen‘ und ‚von der App geschlossen‘ getrennt.
- **Anpassung je Gerät zentral:** Popover → Blatt auf dem iPhone. Bisher entscheidet das jede Art selbst (Designrichtlinie 15.17).
- Neue Web-Recherche ist nicht nötig. Runde 1 hat die Safari-Versionen belegt, und du hast iOS 26.2 oder neuer.

## 3. Antworten Runde 2 (Nutzer 26.11.2026, Sitzung 0165, im Fenster)

- Frage 3: **Ja** – die HIG-Regeln kommen als Grundsätze in den Entwurf: ein Popover, ein Alert über allem, ein Sheet, eine Ebene Untermenü,
  Hinweise in einer Warteschlange, Durchlass in der Kopfzeile, Darstellung je Ort. Neue Regeln folgen später mit Wortlaut (0 Nr. 29).
- Frage 1 (Variante): Der Nutzer schreibt im Chat.
