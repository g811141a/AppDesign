# APD-149 Framework mit Steuer-Bean – Recherche Runde 2 (Konzept-Chat APD-149, parallel zu 0165)

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

## 3. Antworten Runde 2 (Nutzer 26.11.2026, Konzept-Chat APD-149, im Fenster)

- Frage 3: **Ja** – die HIG-Regeln kommen als Grundsätze in den Entwurf: ein Popover, ein Alert über allem, ein Sheet, eine Ebene Untermenü,
  Hinweise in einer Warteschlange, Durchlass in der Kopfzeile, Darstellung je Ort. Neue Regeln folgen später mit Wortlaut (0 Nr. 29).
- Frage 1 (Variante): Der Nutzer schreibt im Chat.

## 4. Gibt es V-3 schon als Open Source? (Frage des Nutzers, Hilfsagent Opus 5.5, Aufwand hoch)

Belegt aus Quelltext, README und npm-Daten. unpkg.com und die GitHub-API für fremde Repos waren gesperrt (403).

**Teile von V-3:** 1 = Befehle · 2 = Stapel und Zustand am Auslöser · 3 = HIG-Regeln zentral

| Kandidat | 1 Befehle | 2 Stapel / Auslöser | 3 HIG | ohne Build und ohne React/Vue | Lizenz · gepflegt |
|---|---|---|---|---|---|
| **Lumino** (JupyterLab) | **ja** – `isEnabled`, `isToggled`, `isVisible`, `execute`, `notifyCommandChanged`; Menü, Menüleiste, Kontextmenü und Palette werden aus den Befehlen gebaut | teilweise – kein `aria-expanded`, kein allgemeiner Stapel | nein | ja (UMD) | BSD-3 · 11/2026 |
| **Lion** (ING) `OverlaysManager` | nein | **ja** – `invokerNode`, `aria-expanded` und Fokus zurück, `isBlocking`, `hidesOnEsc` | teilweise – Popover → unteres Blatt nach Breite | nur mit Import-Map oder Build (`lit`) | MIT · 11/2026 |
| **Spectrum Web Components** `sp-overlay` | nein | **ja** – `OverlayStack`, Escape fürs oberste, `aria-expanded` am Auslöser | teilweise | nur mit Import-Map oder Build (`lit`) | Apache-2.0 · 11/2026 |
| React Aria, Radix, Headless UI, Ark UI, Bits UI | nein | ja | nein | nein (React, Svelte, Vue) | MIT/Apache |
| **VS Code** (nur Vorbild) | **ja** – `when` (ausblenden je Menü) und `enablement` (sperren überall) | nein | nein | – | – |
| CKEditor 5, ProseMirror, Tiptap | ja (`isEnabled`/`refresh`, `can()`) | kaum | nein | Editor-Bausteine | GPL bzw. MIT |
| OpenUI5 | teilweise | Popup-System | teilweise (`ResponsivePopover`: iPhone als Dialog) | groß, eigener Rahmen | Apache-2.0 |
| HTML-Plattform (popover, `commandfor`) | teilweise | teilweise (`aria-expanded` von selbst, Fokus zurück bei Esc) | teilweise (ein auto-Popover) | ja, Safari 26.2 | – |
| XState · Floating UI · Puppertino | Automat · nur Lage · nur Optik (HIG-Stil, CSS) | – | – | ja | MIT |

Quellen (Auswahl): [Lumino commands](https://raw.githubusercontent.com/jupyterlab/lumino/main/packages/commands/src/index.ts),
[Lumino menu](https://raw.githubusercontent.com/jupyterlab/lumino/main/packages/widgets/src/menu.ts),
[Lion configuration](https://raw.githubusercontent.com/ing-bank/lion/master/docs/fundamentals/systems/overlays/configuration.md),
[Spectrum OverlayStack](https://raw.githubusercontent.com/adobe/spectrum-web-components/main/1st-gen/packages/overlay/src/OverlayStack.ts),
[VS Code contribution points](https://raw.githubusercontent.com/microsoft/vscode-docs/main/api/references/contribution-points.md),
[React Aria](https://registry.npmjs.org/react-aria/-/react-aria-3.53.1.tgz) (`FocusScope`),
[MDN Invoker Commands](https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/api/invoker_commands_api/index.md),
[MDN Popover](https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/api/popover_api/using/index.md),
[CKEditor Command](https://raw.githubusercontent.com/ckeditor/ckeditor5/master/packages/ckeditor5-core/src/command.ts),
[OpenUI5 ResponsivePopover](https://raw.githubusercontent.com/SAP/openui5/master/src/sap.m/src/sap/m/ResponsivePopover.js).

**Was es nicht gibt (in keinem Kandidaten belegt):**
- **Befehle und Stapel zusammen:** Lumino hat Befehle ohne Stapel. Lion, Spectrum und React Aria haben einen Stapel ohne Befehle.
- **Tönung der Quelle, solange etwas offen ist:** Nur CKEditor hat sie, und dort nur im eigenen Ausklappmenü.
- **Quelle nach Neuaufbau über die Kennung wiederfinden:** React Aria gibt einen verschwundenen Auslöser auf und weicht auf einen übergeordneten Bereich aus. Spectrum kennt nur das gespeicherte Element.
- **HIG-Regeln als Regelwerk an einer Stelle:** Belegt sind nur Teile davon, siehe Spalte 3.
- **Laufende Systemaktion als Eintrag im Stapel:** Teilen, Drucken und Dateiauswahl werden nirgends so geführt.
- **Zustand ‚gemischt‘ und Kennzeichen ‚destruktiv‘ am Befehl:** nicht in Lumino und nicht in VS Code.

**Einschätzung (nicht belegt):**
- **Keine Abhängigkeit übernehmen:**
  - Lion und Spectrum brauchen `lit` und weitere Pakete über Paketnamen, also Build oder Import-Map. Das passt nicht zu ‚feste Fassung per `<script>`‘.
  - React Aria, Radix und Ark brauchen React.
  - Lumino ließe sich laden, hat aber weder Apple-Stil noch Kopfzeile, Blatt oder Alert.
- **Nach Vorbild nachbauen, das Zusammenspiel selbst erfinden.**
  - Begriffe aus Lumino: `isEnabled`, `isToggled`, `isVisible`, `notifyCommandChanged`.
  - Trennung aus VS Code: `when` (ausblenden je Ort) und `enablement` (sperren überall).
  - Aus Lion: `invokerNode`, `isBlocking`, Umschalten nach Breite.
  - Aus Spectrum: Arten und Escape fürs oberste Element.
  - Unterbau aus der Plattform: `popover`, `inert`, `commandfor`.
