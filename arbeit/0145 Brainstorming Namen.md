# Brainstorming: Namen der AD-Beans (APD-136)

Sitzung 0145, 20.11.2026. Grundlage: die freigegebene Regel „Gibt es ein Vorbild, wird sein Name übernommen – zuerst die Web-Plattform, dann Apple; erfunden
wird nur, wo es keines gibt“ (Zusammenarbeit 1, Wortlaut in `0145 Namen nach Vorbild.md`). Quellen: Abschnitt 2 dort. ‚Vermutung‘ = in dieser Sitzung
nicht nachgelesen.

## A. Grundsatz: Kennung nach Apple-Bauteil oder nach Aufgabe?

R-1.13 verlangt: Kennung „sprechend nach der Aufgabe (nie nach Geste oder Technik)“. Apple benennt Bauteile aber oft nach der Geste bzw. der Form:
*swipe actions*, *alert*, *popover*. Unsere erste Bean heißt schon `swipeactions` – wörtlich nach Geste.

- A-1: Apple-Name hat Vorrang (dann passt R-1.13 ‚nie nach Geste‘ nicht mehr ganz und sollte ‚… außer Apple nennt es so‘ bekommen)
- A-2: Aufgabe hat Vorrang (dann z. B. `rowactions` statt `swipeactions`; Apple-Namen nur für Eigenschaften und Methoden)

## B. Hinweisfenster (`hinweis`)

| | Name | Für | Gegen |
|---|---|---|---|
| B-1 | `alert` | Apple: „An object that displays an alert message.“; HIG: Titel, Text, bis 3 Schaltflächen, auch eine | bei Apple ist *alert* auch die Abfrage mit Entscheidung – unsere Abfrage ist die Sprechblase (`confirmPop`) |
| B-2 | `notice` | sagt ‚nur Information‘ | kein Vorbild (erfunden) |
| B-3 | `message` | Apple: `message` = Text des Alerts; unser Fenster ist `<dialog id="msg">` | eher der Text als das Fenster |
| B-4 | `infoalert` | ‚informational alert‘ steht in der HIG („In informational alerts only, you can use ‚OK‘“) | lang |

Offen dazu: Wie heißt später die Sprechblase (`confirmPop`)? Vermutung: SwiftUI nennt das `confirmationDialog` – prüfe ich, bevor wir B festlegen.

## C. Kacheln der Liste (`kacheln`)

| | Name | Vorbild |
|---|---|---|
| C-1 | `rows` | Apple: „swipes a table **row**“, `…ForRowAt` |
| C-2 | `items` | Apple Collection View: *item* (Vermutung, `…ForItemAt`); allgemein im Web |
| C-3 | `cells` | UIKit-Bauteil *cell* (Vermutung) |
| C-4 | `tiles` | unser deutsches Wort ‚Kachel‘ – kein Vorbild |

## D. Kurzwort unter der Kapsel (`kurz`)

Apple nennt den Text der Wisch-Schaltfläche `title`; bei uns ist `label` schon der Text im Menü (Apple: `title` von `UIAction`).

| | Name | Bemerkung |
|---|---|---|
| D-1 | `shortTitle` | Apple `AppShortcut(… shortTitle:)` |
| D-2 | `swipeTitle` | sagt, wo es steht; kein Vorbild |
| D-3 | `title` für das Kurzwort, `label` bleibt für Menü und VoiceOver | wie Apple bei der Wisch-Schaltfläche; aber `title` und `label` nebeneinander verwechselt man leicht |

## E. Aufruf der Aktion (`act({ anker, quelle: 'wischen' })`)

- E-1 `act({ sourceView })` – wie Apples Handler; `quelle` entfällt (die App nutzt es nicht)
- E-2 `act({ sourceItem })` – Apples Name für das Element, an dem ein Popover hängt (die Sprechblase wächst aus der Kapsel)
- E-3 `act({ sourceView, sender: 'swipe' })` – Apple `sender` ist aber ein Objekt, kein Wort

## F. Abmelden (`entfernen()`) und Ereignisse (`offen`/`zu`)

- F-1 `disconnect()` (Web: `MutationObserver`) · F-2 `destroy()` (verbreitet in JS-Bibliotheken – Vermutung) · F-3 `dispose()` (Vermutung)
- Ereignisse: `open`/`close` oder wie `<dialog>` `close` und `toggle`

## G. Bean `sourcehighlight`

Kennung von dir gewählt. Schnittstelle nach Vorbild: Apple `sourceItem` (Element, an dem ein Popover hängt) und `isHighlighted` → Web-Schreibweise
`highlighted`. Ideen: `source` (nur lesen), `setSource(el)`, `clearSource()` – oder näher an Apple `sourceItem`, `highlighted`.

---

## A – Überlegung und Vorschlag

**Wozu ‚nie nach Geste oder Technik‘?** Die Regel soll verhindern, dass wir einen Baustein nach dem *Wie* benennen (`langdruecken`, `flexbox`), obwohl er
eine Aufgabe hat, die auf mehreren Wegen erreichbar ist. Bei einem Apple-Namen ist diese Gefahr klein: *swipe actions* ist bei Apple der feste Name des
Bauteils (`UISwipeActionsConfiguration`, „The set of actions to perform when swiping on rows of a table.“), nicht eine Beschreibung der Geste.

**Für A-1 (Apple-Name hat Vorrang):** jeder, der Apple oder das Web kennt, versteht den Namen sofort; wir müssen nichts erfinden; `swipeactions` bleibt.
**Für A-2 (Aufgabe hat Vorrang):** die Kennung sagt die Aufgabe auch ohne Apple-Kenntnis; aber `swipeactions` müsste `rowactions` werden – eine Kennung, die
es bei Apple nicht gibt (erfunden), gegen die eben freigegebene Regel „Vorbild zuerst“.

**Entschieden: A-1** (Nutzer 20.11.2026, Sitzung 0145, im Fenster: ‚Ja, A-1‘) – der neue Satz zur Kennung in R-1.13 unten ist damit **freigegeben**. Folge: der Satz zur Kennung in R-1.13 (eben freigegeben) wird angepasst.

**Alt** (Stand eben freigegeben):
> Die **Kennung** ist sprechend nach der Aufgabe (nie nach Geste oder Technik, keine Nummer), englisch wie die ganze Schnittstelle (Zusammenarbeit 1),
> fest und nie wiederverwendet: …

**Neu:**
> Die **Kennung** ist englisch wie die ganze Schnittstelle: der Name des Vorbilds (Zusammenarbeit 1, z. B. `swipeactions` nach Apples *swipe actions*),
> ohne Vorbild sprechend nach der Aufgabe (nie nach Geste oder Technik); keine Nummer, fest und nie wiederverwendet: …

Folgen für B bis G: B nach Apple (*alert*-Familie), C `rows`, E `sourceView`/`sourceItem`; G hat kein Bauteil-Vorbild bei Apple – `sourcehighlight`
ist nach der Aufgabe benannt und bleibt.

---

## B – Überlegung und Vorschlag (Quellen nachgelesen)

| Quelle | wörtlich |
|---|---|
| MDN `Window.alert()` | „window.alert() instructs the browser to display a dialog with an optional message, and to wait until the user dismisses the dialog.“ |
| Apple `UIAlertController` | „An object that displays an alert message.“ |
| SwiftUI `alert(_:isPresented:actions:message:)` | „Presents an alert with a message when a given condition is true …“ – Teile: Titel, `actions`, `message` |
| SwiftUI `confirmationDialog(…)` | „Presents a confirmation dialog with a message …“; „In regular size classes in iOS, the system renders confirmation dialogs as a popover …“ |
| HIG Action sheets | „An action sheet is a modal view that presents choices related to an action people initiate.“ |
| MDN `HTMLDialogElement` | `open` – „indicating whether the dialog is available for interaction“ · `show()` – „Displays the dialog modelessly“ · `showModal()` – „Displays the dialog as a modal …“ · `close()` – „Closes the dialog.“ · Ereignis `close` – „Fired when the dialog is closed.“ |

**Ergebnis:** Im Web ist *alert* genau unser Hinweisfenster (Meldung, wegtippen, keine Entscheidung); bei Apple ist es die *alert*-Familie. Die Sprechblase
(`confirmPop`, Entscheidung, am iPad aus der Schaltfläche) entspricht Apples *confirmation dialog* bzw. *action sheet* und im Web `confirm()` – sie bekommt
später diesen Namen; es gibt also keine Überschneidung.

**Entschieden: B-1 `alert`** mit dieser Schnittstelle und **`showModal`** (Nutzer 20.11.2026, Sitzung 0145, im Fenster):

| Teil | Alt | Neu | Vorbild |
|---|---|---|---|
| Kennung | `hinweis` | `alert` (ersetzt `hinweis`) | Web `alert()`, Apple *alert* |
| Anlegen | `createHinweis(fenster, …)` | `createAlert(dialog, { fitFileName })` | – |
| Eigenschaft | `breiteNachDateiname` | `fitFileName` | – (eigene Funktion) |
| Nur lesen | `offen` | `open` | MDN `open` |
| Methode | `zeigen(titel, html, { breit, aktion })` | `showModal(title, message, { wide, action })` – oder kurz `show(…)` | MDN: `showModal()` = modal (unser Fenster ist immer modal), `show()` = **nicht** modal; Apple `message` |
| Methode | `schliessen()` | `close()` | MDN `close()` |
| Ereignis | `zu` | `close` | MDN `close` |
| Bean in ui.js | `adHinweis` | `adAlert` | – |
| CSS | `.ad-hinweis…` | `.ad-alert`, `-wide`, `-form`, `-head`, `-message`, `-buttons`, `-button` | Apple `message` |
| Katalog | `hinweis.js` | `alert.js` | – |

Zu `show` oder `showModal`: nach der Regel ‚Vorbild zuerst‘ `showModal`, weil `show()` im Web ein Fenster **ohne** Sperre öffnet; `show` wäre kürzer, sagt
aber nach Web-Vorbild etwas anderes. Die App ruft ohnehin `inform(…)` auf, nicht die Methode.

---

## C bis F – Wischaktionen (`swipeactions`): Überlegung und Vorschlag

| Quelle | wörtlich |
|---|---|
| Apple `UISwipeActionsConfiguration` | „The set of actions to perform when swiping on rows of a table.“ · `actions` |
| Apple `UIContextualAction` | „An action to display when the user swipes a table row.“ · `title` – „The title displayed on the action button.“ · Stil `destructive` · Handler `(action, sourceView, completionHandler)`, `sourceView` – „The view in which the action was displayed.“ |
| Apple `AppShortcut` | Parameter `shortTitle` |
| MDN `ResizeObserver.disconnect()` | „unobserves all observed Element or SVGElement targets.“ · `MutationObserver.disconnect()` – „tells the observer to stop watching for mutations.“ |
| MDN `toggle`-Ereignis | „fires on a popover element, <dialog> element, or <details> element just after it is shown or hidden“; `newState` = `open` bzw. `closed` |
| Apple `collectionView(_:contextMenuConfigurationForItemsAt:point:)` | „… for the items at the specified index paths.“ (Kontextmenü: *items*; Wischaktionen: *rows*) |

| Teil | Alt | Neu | Vorbild |
|---|---|---|---|
| C Eigenschaft | `kacheln` | `rows` | Apple „swipes a table row“ |
| Eigenschaft | `aktionen` | `actions` | Apple `actions` |
| D Eintrag | `kurz` | `shortTitle` | Apple `shortTitle`; `title` der Wisch-Schaltfläche – bei uns ist `label` schon der Text im Menü |
| E Aufruf | `act({ anker, quelle: 'wischen' })` | `act({ sourceView })` – `quelle` entfällt (die App nutzt es nicht; Apple übergibt nur die Ansicht) | Apple Handler `sourceView` |
| Nur lesen | `offen` | `openRow` | – (aus Apple *row* und Web *open*) |
| Nur lesen | `masse` | `metrics` mit `buttonWidth`, `buttonHeight`, `gap`, `margin`, `openAt`, `overshootMax`, `overshootGrow`, `decideAfter`, `horizontal` | Apple *action button*; sonst – |
| Methode | `schliessen()` | `close()` | MDN `close()` |
| F Methode | `entfernen()` | `disconnect()` | MDN `disconnect()` (hört auf zu beobachten) |
| F Ereignisse | `offen` · `zu` (mit Kachel) | **a)** `toggle` mit `{ row, newState: 'open' \| 'closed' }` · **b)** `open` · `close` (mit Zeile) | a) MDN `toggle`; b) nur `close` hat ein Web-Vorbild |
| CSS | `-traeger`, `-kachel`, `-aktionen`, `-eintrag`, `-kapsel`, `.rot`, `-wort`, `.umbruch` | `-host`, `-row`, `-actions`, `-action`, `-button`, `.destructive`, `-title`, `.wrap` | Apple *row*, *action*, *action button*, `destructive`, `title`; Web *wrap* |

Unverändert: Kennung `swipeactions` (A-1), Eintrag `red` (gehört zu `openMenu`, F-3), `label`, `icon`, `act`. Die App nutzt die Ereignisse heute nicht.
App: `createSwipeactions(side, { rows: '[data-id]', actions: tripActions })` · `swipe.close()` · `shortTitle:` · `w?.sourceView`.

**Entschieden** (Nutzer 20.11.2026, Sitzung 0145, im Fenster): die Namen der Tabelle **ja**; Ereignisse **a) `toggle`** – das ist der Web-Name für ‚geöffnet oder geschlossen‘; ein Ereignis `open` gibt es im Web nicht.

---

## Katalog-Felder (Abschnitt 5 in `0145 Code englisch Wortlaut.md`, dort a) alle englisch freigegeben)

Nach Vorbild geprüft: nur ein Feld hat ein Vorbild – der Kurztext einer Seite der Apple-Dokumentation heißt `abstract` (in jeder gelesenen JSON-Seite).
**Entschieden** (Nutzer 20.11.2026, Sitzung 0145, im Fenster): `satz` → **`abstract`** statt `summary`; alle übrigen Felder wie freigegeben (`id`, `area`, `since`, `section`, `create`, `properties`,
`readOnly` – Web-Vorbild `readOnly` –, `methods`, `events`, `rules`, `history`, `howTo`, `demo(el, log)`, `catalogBean(…)`; `name`, `icon` bleiben).
