# APD-149 Framework mit Steuer-Bean – Recherche und Varianten (Runde 1)

**26.11.2026, Sitzung 0164** · Grundlage: `arbeit/0162 Framework Steuer-Bean Ideen.md`.
Die Recherche hat ein Hilfsagent gemacht (Opus, Aufwand hoch). Belegt ist nur, was er selbst geöffnet hat: Apple-Doku, Safari-Release-Notes,
MDN mit Kompatibilitätsdaten und die Quelltexte der Frameworks auf GitHub. webkit.org, caniuse.com, ionicframework.com, framework7.io und w3.org
waren aus der Prüfumgebung nicht erreichbar.

## 1. Befund heute (gezählt in dieser Sitzung)

Wie oft die Quelle eines offenen Elements von Hand gesetzt wird:

| Stelle | `v4/ui.js` | Reiselogbuch `index.html` |
|---|---|---|
| `sourceItem =` | 3 | 7 |
| `.hold(` | 4 | 4 |
| `.release(` | 4 | 7 |
| `aria-expanded` | 7 | 0 |

Zusammen sind das rund 30 Stellen, an denen ein neuer Weg eine Freigabe vergessen kann. Genau das war die Ursache von P-122/F-1, P-124/F-2 und APD-150.

## 2. So macht es Apple (belegt)

- **Stapel:** `dismiss` spricht von einem Stapel nacheinander präsentierter Ansichten. Schließt eine tiefere, gehen alle darüber mit zu.
  `presentedViewController` ist ein einzelner Wert. –
  [dismiss](https://developer.apple.com/documentation/uikit/uiviewcontroller/dismiss(animated:completion:)),
  [presentedViewController](https://developer.apple.com/documentation/uikit/uiviewcontroller/presentedviewcontroller)
- **Was über was darf (HIG):**
  - Immer nur ein Popover, nie eine Kaskade. Über einem Popover nur ein Alert.
  - Ein Modal schließt, bevor das nächste kommt.
  - Ein Alert darf über allem liegen, aber nie mehr als einer.
  - Nur ein Sheet zur Zeit.
  - Untermenüs möglichst nur eine Ebene tief; nicht verfügbare Punkte erscheinen gedimmt.
  - Quellen: [Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers),
    [Modality](https://developer.apple.com/design/human-interface-guidelines/modality),
    [Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets),
    [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- **Zustand am Befehl, nicht an der Schaltfläche:** `UIAction` trägt `attributes` (z. B. gesperrt) und `state` (z. B. ein) selbst.
  `UIDeferredMenuElement.uncached` baut das Menü bei jedem Erscheinen neu. –
  [UIAction](https://developer.apple.com/documentation/uikit/uiaction),
  [uncached](https://developer.apple.com/documentation/uikit/uideferredmenuelement/uncached(_:))
- **Darstellung folgt dem Zustand (SwiftUI):**
  - `.sheet`, `.popover`, `.alert` und `.confirmationDialog` hängen an einem Wert (`isPresented` bzw. `item`).
  - Ändert sich `item`, schließt das System das alte Sheet und zeigt das neue.
  - `NavigationStack(path:)` führt die Navigation als Liste.
  - Quellen: [sheet(item:)](https://developer.apple.com/documentation/swiftui/view/sheet(item:ondismiss:content:)),
    [NavigationStack](https://developer.apple.com/documentation/swiftui/navigationstack)
- **Quelle:** Seit iOS 26 wächst ein Popover aus seiner Schaltfläche heraus und ersetzt sie, bis es schließt
  ([sourceItem](https://developer.apple.com/documentation/uikit/uipopoverpresentationcontroller/sourceitem)). Eine Tönung der Schaltfläche,
  solange etwas offen ist, ist **nicht belegt**. Ebenfalls nicht belegt: was passiert, wenn die Quelle verschwindet.

## 3. Web-Plattform in Safari (belegt)

| Baustein | Safari ab | Quelle |
|---|---|---|
| `<dialog>` mit `showModal` (Top-Layer, Rest der Seite gesperrt), `cancel`-Ereignis | 15.4 | MDN-Kompatibilitätsdaten |
| `inert` | 15.5 | MDN-Kompatibilitätsdaten |
| Popover-API (`popover`, `popovertarget` meldet den Aufklapp-Zustand an Hilfstechnik) | 17 | [Safari 17](https://developer.apple.com/documentation/safari-release-notes/safari-17-release-notes) |
| Popover: Tippen außerhalb schließt auf iPad/iPhone | 18.3 | [Safari 18.3](https://developer.apple.com/documentation/safari-release-notes/safari-18_3-release-notes) |
| `dialog.requestClose()` | 18.4 | MDN-Kompatibilitätsdaten |
| CSS Anchor Positioning (Lage am Auslöser) | 26 | [Safari 26](https://developer.apple.com/documentation/safari-release-notes/safari-26-release-notes) |
| Befehle `command`/`commandfor` an Schaltflächen | 26.2 | [Safari 26.2](https://developer.apple.com/documentation/safari-release-notes/safari-26_2-release-notes) |
| `closedby`, Close-Watcher, Korrekturen der Fokus-Rückgabe | 27.3 (**Beta**) | [Safari 27.3](https://developer.apple.com/documentation/safari-release-notes/safari-27_3-release-notes) |

Außerdem lehnt `navigator.share` ein zweites, gleichzeitiges Teilen mit `InvalidStateError` ab und braucht ein Antippen (MDN).

## 4. Andere Frameworks und Muster (belegt aus den Quelltexten)

- **Ionic:**
  - Zentrale Controller für Alert, Modal und Popover mit **einem** Stapel.
  - Esc bzw. Zurück schließt nur das oberste Element.
  - Fokusfalle und Sperre der Seite sind zentral geregelt.
  - Tönung und `aria-expanded` am Auslöser gibt es nicht.
  - `isOpen` wird beim Schließen nicht zurückgesetzt, das ist eine bekannte Falle.
- **Framework7:** eine gemeinsame Liste der offenen Elemente und eine Warteschlange für Dialoge. Modals lassen sich als Routen anlegen.
  Fokus-Rückgabe gibt es nicht.
- **Konsta UI:** kein zentraler Controller, nur die Eigenschaft `opened`. **Onsen UI:** ein zentraler Verteiler für die Zurück-Taste.
- **Zag.js:** Ein Dialog ist ein Zustandsautomat (offen/zu). Fokusfalle, Sperre und Fokus-Rückgabe laufen als Effekte des Zustands.
  Ein zentraler Stapel kennt das oberste Element.
- **WAI-Muster:** Beim Schließen geht der Fokus an den Auslöser zurück. Gibt es ihn nicht mehr, geht er an ein sinnvolles Ersatzziel.
  Ein Menü-Knopf trägt `aria-expanded`, solange das Menü offen ist.

**Kein** untersuchtes Framework regelt die Tönung der Quelle zentral. Sie wäre bei uns eigene Arbeit.

## 5. Drei Varianten

**V-1 Steuer-Bean über dem heutigen Aufbau**
- `presentation` führt einen Stapel (Art, Befehls-Kennung, Quelle).
- Alle heutigen Wege (`dlg`, `msg`, Menü, Untermenü, Sprechblase, Wischen, Teilen, Drucken) melden sich dort an und ab.
- Die Quelle wird über die **Kennung** gefunden, nicht über das Element. Ein Neuaufbau ist deshalb ungefährlich.
- Eigene Umsetzung wie heute (Safari ab 15.5).
- Kleinster Schritt, aber die App ruft weiter Schaltflächen-Code auf.

**V-2 Plattform zuerst**
- Wie V-1, aber Menü und Sprechblase als Popover-API, Lage über Anchor Positioning, Schaltflächen über `command`/`commandfor`.
- Weniger eigener Code. Braucht aber **iOS 26.2** auf allen Geräten. Esc, Tippen außerhalb und Fokus-Rückgabe bleiben bis 27.3 eigene Arbeit.

**V-3 Darstellung folgt dem Zustand (wie SwiftUI)**
- Die App beschreibt nur noch **Befehle** (Kennung, Text, Icon, möglich ja/nein, ein/aus, Aktion) und ruft `present(art, inhalt, { command })`
  bzw. `dismiss()` auf.
- Kopfzeile, Menüs, Kontextmenü und Wischaktionen baut das Framework aus den Befehlen, bei jedem Öffnen neu.
- Tönung, `aria-expanded`, Fokus, Escape, Sperre und Lage folgen aus dem Stapel. Kein Code setzt sie von Hand.
- Die HIG-Regeln aus Abschnitt 2 stehen an einer Stelle (z. B. Hinweise in einer Warteschlange) und werden dort geprüft.
- Technisch mit den Mitteln von V-1. Plattformteile aus V-2 nur, soweit die Mindestversion von iOS sie sicher hat.
- Größter Umbau, aber das Ziel ‚schnelle App-Entwicklung‘ trifft nur V-3.

**Empfehlung: V-3 in `v5/`.**
- Nur V-3 beseitigt die Ursache: Kein Weg setzt den Zustand einer Schaltfläche noch von Hand.
- Nur V-3 macht neue Apps schnell.
- V-1 behebt die Fehler, hilft aber nicht beim Bauen neuer Apps. V-2 hängt an iOS 26.2.
- Die Apps bleiben unberührt, bis du den Wechsel freigibst (R-10.3).

## 6. Fragen dieser Runde

1. Welche Variante soll ich als Grobentwurf ausarbeiten?
2. Welche iOS-Version haben iPad und iPhone (Einstellungen → Allgemein → Info → iOS-Version)? Davon hängt ab, welche Plattformteile
   nutzbar sind.
3. Sollen die HIG-Regeln aus Abschnitt 2 (ein Popover, ein Alert über allem, ein Sheet, eine Ebene Untermenü, Hinweise in Warteschlange)
   als Grundsätze in den Entwurf? Das ist noch keine Regeländerung. Neue Regeln schlage ich später mit Wortlaut vor (0 Nr. 29).

## 7. Danach

Grobentwurf der gewählten Variante: Schnittstelle von `presentation` und Befehlen, Testfall-Liste, kleine Beispiel-App in `v5/` und Apple-Abgleich
(2.6). Dann die nächste Runde mit dir, gebaut wird erst nach einem ‚Ja‘ (0 Nr. 21).

## 8. Antworten Runde 1 (Nutzer 26.11.2026, Sitzung 0164, im Fenster)

- Frage 2: iPad und iPhone haben **iOS 26.2 oder neuer**.
- Fragen 1 und 3: Der Nutzer schreibt im Chat.
