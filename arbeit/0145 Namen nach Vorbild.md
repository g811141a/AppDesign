# Englische Namen nach Vorbild – Rückblick und Abgleich (APD-136)

Sitzung 0145, 20.11.2026. Hinweis des Nutzers: „Der Wortlaut kann grundsätzlich von Apple & Co übernommen werden und soll nicht krampfhaft erfunden
werden. Warum hast du ‚Nur lesen‘ mit `isOpen` und nicht mit `readOnly` übersetzt?“

**Stand der Freigabe** (Nutzer 20.11.2026, Sitzung 0145, im Fenster): Wortlaut Zusammenarbeit 1 (Abschnitt 4) und R-1.13 **freigegeben** · Namen
(Abschnitt 3) **offen** – der Nutzer möchte im Chat ein Brainstorming zur Benennung; die Freigabe der Namen in `0145 Code englisch Wortlaut.md` (Abschnitte 3–5)
ist damit überholt.

## 1. `isOpen` und ‚Nur lesen‘

‚Nur lesen‘ ist kein Name, sondern die **Spalte** der Liste der AD-Beans: Eigenschaften, die die App nur lesen kann. Die Spalte heißt im Katalog künftig
`readOnly` (Vorschlag Abschnitt 5 der Datei `0145 Code englisch Wortlaut.md`). Die Eigenschaft in dieser Spalte heißt heute `offen` – die habe ich mit `isOpen`
übersetzt. **Das war nicht nach Vorbild:** `isOpen` ist die Schreibweise von Swift (`isHighlighted`); im Web heißt dieselbe Eigenschaft `open`
(`<dialog>` und `<details>`, beide in Chromium und WebKit ausgelesen). Unsere Bean steckt in einem `<dialog>` – also **`open`**.

Daraus die Regel für alle Namen: **Gibt es ein Vorbild, wird sein Name übernommen** – zuerst die Web-Plattform (für dasselbe Ding im Browser), dann Apple
(für alles, was das Web nicht kennt) –, in der Schreibweise von JavaScript (`camelCase`, Wahrheitswerte ohne `is` wie `open`, `hidden`, `readOnly`).
Erfunden wird nur, wo es kein Vorbild gibt.

## 2. Quellen dieser Sitzung

| Quelle | Namen (wörtlich) |
|---|---|
| Chromium und WebKit der Prüfumgebung, `HTMLDialogElement.prototype` | `open` · `returnValue` · `show` · `showModal` · `close` · `requestClose`; beim Schließen das Ereignis `close` (dazu `toggle`, `beforetoggle`) |
| dieselben, `MutationObserver.prototype` | `observe` · `disconnect` · `takeRecords` |
| dieselben, `HTMLInputElement` | `readOnly` · `disabled` |
| Apple `UIAlertController` | „An object that displays an alert message.“ · `title` („The title of the alert.“) · `message` („Descriptive text that provides more details …“) · `actions` |
| Apple HIG Alerts | „An alert gives people critical information they need right away.“ · „alerts display a title, optional informative text, and up to three buttons“ · eine Schaltfläche ist erlaubt |
| Apple `UISwipeActionsConfiguration` | „The set of actions to perform when swiping on rows of a table.“ · `actions` |
| Apple `UIContextualAction` | „An action to display when the user swipes a table row.“ · `title` („The title displayed on the action button.“) · `image` · `style` mit `normal` / `destructive` · Handler `(action, sourceView, completionHandler)`, `sourceView` = „The view in which the action was displayed.“ |
| Apple `UIAction` / `UIMenuElement.Attributes` | `title` („The action’s title.“) · `image` · `attributes` mit `destructive`, `disabled`, `hidden` · `sender` („The object responsible for the action handler.“) |
| Apple `AppShortcut` | Parameter `shortTitle` |
| Apple `UIPopoverPresentationController` | `sourceItem` („The item on which to anchor the popover.“) · `sourceView` |
| Apple `UIControl` | `isHighlighted` („… whether the control draws a highlight.“) · `isSelected` · `isEnabled` |
| Apple-Dokumentation (JSON) allgemein | der Kurztext jeder Seite heißt `abstract` |

Nicht lesbar: MDN (`developer.mozilla.org` ist in dieser Umgebung gesperrt) – ersetzt durch das Auslesen in den Browsern.

## 3. Rückblick: alle Namen, Vorbild, neue Empfehlung

✓ = entspricht dem Vorbild · ✗ = war erfunden bzw. falsche Schreibweise · – = kein Vorbild gefunden (eigener Name bleibt nötig)

### Bean `hinweis` (Hinweisfenster)

| Alt | Mein Vorschlag | Vorbild | Neue Empfehlung |
|---|---|---|---|
| Kennung `hinweis` | `notice` ✗ | Apple: *alert* (Titel, Text, bis drei Schaltflächen, auch nur eine) | **`alert`** (ersetzt `hinweis`) |
| `createHinweis(fenster, …)` | `createNotice(dialog, …)` | – | **`createAlert(dialog, …)`** |
| `breiteNachDateiname` | `fitFileName` | – (eigene Funktion) | `fitFileName` |
| `offen` (nur lesen) | `isOpen` ✗ | Web `<dialog>`: `open` | **`open`** |
| `zeigen(titel, html, { breit, aktion })` | `show(title, html, { wide, action })` | Web `show()`; Apple `title`, `message` | **`show(title, message, { wide, action })`** |
| `schliessen()` | `close()` ✓ | Web `close()` | `close()` |
| Ereignis `zu` | `close` ✓ | Web Ereignis `close` | `close` |
| `adHinweis` | `adNotice` | – | **`adAlert`** |
| CSS `.ad-hinweis…` | `.ad-notice`, `-wide`, `-form`, `-head`, `-text`, `-buttons`, `-button` | – | `.ad-alert`, `-wide`, `-form`, `-head`, `-message`, `-buttons`, `-button` |
| Katalog `hinweis.js` | `notice.js` | – | **`alert.js`** |

`inform(…)` bleibt (Name aus `schnittstelle.json`, nicht Teil der Bean).

### Bean `swipeactions` (Wischaktionen)

| Alt | Mein Vorschlag | Vorbild | Neue Empfehlung |
|---|---|---|---|
| Kennung `swipeactions` | bleibt ✓ | Apple *swipe actions* | bleibt |
| `kacheln` | `tiles` ✗ | Apple: *row* („swipes a table row“) | **`rows`** |
| `aktionen` | `actions` ✓ | Apple `actions` | `actions` |
| Eintrag `kurz` | `short` ✗ | Apple `title` der Schaltfläche; `title` ist bei uns schon belegt (`label` im Menü) – Apple kennt `shortTitle` | **`shortTitle`** |
| Eintrag `red` | – (nicht angefasst) | Apple `destructive` | bleibt vorerst – `red` gehört zu `openMenu` (keine Bean, F-3); `destructive`, wenn `openMenu` eine Bean wird |
| `act({ anker, quelle: 'wischen' })` | `act({ anchor, source: 'swipe' })` ✗ | Apple: Handler bekommt `sourceView` | **`act({ sourceView })`** – `quelle` nutzt die App nicht; Apple übergibt nur die Ansicht (Vorschlag: weglassen) |
| `offen` (nur lesen) | `openTile` | – | **`openRow`** |
| `masse` | `metrics` | – | `metrics` |
| Maße `kapselBreite` … | `capsuleWidth` … | – | `buttonWidth`, `buttonHeight`, `gap`, `margin`, `openAt`, `overshootMax`, `overshootGrow`, `decideAfter`, `horizontal` (Apple: *action button*) |
| `schliessen()` | `close()` ✓ | Web `close()` | `close()` |
| `entfernen()` | `destroy()` ✗ | Web: Abmelden heißt `disconnect()` (`MutationObserver`) | **`disconnect()`** |
| Ereignisse `offen` · `zu` | `open` · `close` | Web: `close`, dazu `toggle` | `open` · `close` |
| CSS `-traeger`, `-kachel`, `-aktionen`, `-eintrag`, `-kapsel`, `.rot`, `-wort`, `.umbruch` | `-host`, `-tile`, `-actions`, `-item`, `-capsule`, `.red`, `-word`, `.wrap` | Apple: *row*, *action button*, *title*, *destructive* | `-host`, `-row`, `-actions`, `-item`, `-button`, `.destructive`, `-title`, `.wrap` |

App (Reiselogbuch): `createSwipeactions(side, { rows: '[data-id]', actions: tripActions })` · `swipe.close()` · in den Einträgen `shortTitle:` und
`w?.sourceView`.

### Katalog-Felder (Abschnitt 5, freigegeben a: alle englisch)

| Alt | Mein Vorschlag | Vorbild | Neue Empfehlung |
|---|---|---|---|
| `lesen` | `readOnly` ✓ | Web `readOnly` | `readOnly` |
| `satz` | `summary` | Apple-Dokumentation: `abstract` | **`abstract`** |
| `kennung` · `bereich` · `seit` · `abschnitt` · `fabrik` | `id` · `area` · `since` · `section` · `create` | – | unverändert |
| `eigenschaften` · `methoden` · `ereignisse` · `regeln` · `verlauf` · `anleitung` · `vorfuehren` | `properties` · `methods` · `events` · `rules` · `history` · `howTo` · `demo` | – | unverändert |

### Bean `sourcehighlight` (folgt in Schritt 4)

Die Namen aus 0144 (`held`, `hold`, `release`) waren erfunden. Vorbilder: Apple `sourceItem` (das Element, an dem ein Popover hängt) und `isHighlighted`
(Web-Schreibweise `highlighted`). Den Vorschlag dazu bringe ich mit der Listenzeile.

## 4. Neuer Wortlaut Zusammenarbeit 1 (ersetzt den Vorschlag in `0145 Code englisch Wortlaut.md`, Abschnitt 1)

**Alt** (dritter Punkt, letzter Satz):
> Englisch bleiben nur Code, Dateinamen und Fachbegriffe ohne gängiges deutsches Wort.

**Neu** (dritter Punkt, letzter Satz):
> Englisch bleiben nur Code (nächster Punkt) und Fachbegriffe ohne gängiges deutsches Wort.

**Neu** (vierter Punkt):
> - **Code englisch, Texte deutsch:** alle Namen im Code sind englisch – Funktionen, Variablen, Kennungen, Eigenschaften, Methoden, Ereignisse,
>   CSS-Klassen, Schlüssel und neue Dateinamen. **Gibt es ein Vorbild, wird sein Name übernommen** – zuerst die Web-Plattform (HTML, DOM, CSS), dann
>   Apple (UIKit, SwiftUI, HIG) – in der Schreibweise von JavaScript (`camelCase`, Wahrheitswerte ohne `is` wie `open`, `hidden`); erfunden wird nur,
>   wo es keines gibt. Deutsch ist alles, was man liest: Kommentare im Code, Doku, Regeln, CHANGELOG, Backlog, Katalog-Texte, Prüfmeldungen und alles,
>   was die App anzeigt; Namen aus dem Code stehen darin unübersetzt in `Code-Schrift`. Neuer und geänderter Code ist sofort englisch; Bestehendes wird
>   umbenannt, wenn sein Baustein ohnehin umgebaut wird (bei einer AD-Bean: Kennung, Schnittstelle, CSS-Klassen und Katalogdatei). Nie umbenannt werden
>   gespeicherte Daten und Backups (Schlüssel im localStorage, Felder im Backup – R-9.2), die festen Fassungen `fassung/X.Y.Z/` (R-10.3) sowie Prüf- und
>   Dateinamen, solange Regeln oder Changelogs sie zitieren.

Prüfzeile und R-1.13 wie in `0145 Code englisch Wortlaut.md`, Abschnitte 1 und 2 (Kennung „englisch wie die ganze Schnittstelle (Zusammenarbeit 1)“,
`checkBeans` mit Sperrliste deutscher Namen).
