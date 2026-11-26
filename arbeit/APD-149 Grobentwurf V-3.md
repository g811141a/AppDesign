# APD-149 Grobentwurf V-3 – Darstellung folgt dem Zustand (Konzept-Chat APD-149, parallel zu 0165)

**26.11.2026** · Grundlage:
- `arbeit/0164 APD-149 Recherche und Varianten.md` (Runde 1)
- `arbeit/APD-149 Recherche.md` (Runde 2 und Open Source)

Entschieden (Nutzer 26.11.2026, im Fenster):
- V-3 als Grobentwurf, nachgebaut nach Vorbild, ohne fremde Abhängigkeit.
- Die HIG-Regeln kommen als Grundsätze in den Entwurf.
- Mindestversion iOS 26.2.

Das ist ein **Entwurf zum Besprechen**: keine Regeländerung (0 Nr. 29), kein Bau (0 Nr. 21). Nummern gelten nur in dieser Datei (H-, S-, Q-).

## 1. Idee in drei Sätzen

1. Die App beschreibt **Befehle** (was es gibt und wann es möglich ist), aber keine Schaltflächen-Zustände.
2. Alles, was erscheint und wieder geht, läuft über **einen Stapel**. Die App sagt nur `present(…)` und `dismiss()`.
3. Tönung, `aria-expanded`, Fokus, Escape, Sperre und Lage **folgen aus dem Stapel**. Sie werden nach jeder Änderung und nach jedem Neuaufbau neu
   abgeleitet. Kein Code setzt sie von Hand.

## 2. Zwei neue AD-Beans (R-1.13) unter dem Namensraum `AD` (APD-145)

### 2.1 `commands` – Befehle (Bereich ‚Aktionen und Menüs‘)

Vorbilder: Apple `UIAction`/`UICommand`, `validate(_:)`, `UIMenu`; Lumino `CommandRegistry`; VS Code `when`/`enablement`.

```js
const commands = AD.createCommands();
commands.add({
  id: 'entry.delete',            // Kennung, auch Anker der Quelle im DOM: data-command="entry.delete"
  label: 'Eintrag löschen',
  shortTitle: 'Löschen',         // für Wischaktionen (wie heute bei swipeactions)
  icon: 'trash',
  role: 'destructive',           // destructive | cancel | confirm (Apple ButtonRole)
  validate: ctx => ({ enabled: ctx.selection != null }),   // vor jedem Zeichnen gefragt; auch hidden, state: 'on'|'off'|'mixed', label
  execute: ctx => askDelete(ctx.selection),
});
commands.menu('more', [          // Menü aus Befehlen, wie UIMenu: Gruppen werden durch Trennstriche getrennt
  ['entry.edit', 'entry.share'],
  { title: 'Darstellung', children: ['view.compact', 'view.large'], singleSelection: true },   // eine Ebene Untermenü
  ['entry.delete'],
]);
```

| Teil | Name | Vorbild |
|---|---|---|
| Anlegen | `AD.createCommands()` | R-1.13 |
| Methoden | `add(command)` · `menu(id, children)` · `execute(id, ctx)` · `validate(id, ctx)` → `{ enabled, hidden, state, label }` · `revalidate(id?)` | `UIAction`, Lumino `notifyCommandChanged` |
| Nur lesen | `ids` | – |
| Ereignisse | `change` (nach `revalidate`) · `execute` | – |

**Darstellung je Ort** (Grundsatz H-7). Die Bean entscheidet das, nicht die App:

| Ort | nicht möglich (`enabled: false`) | `hidden: true` | `role: 'destructive'` |
|---|---|---|---|
| Menü (Mehr-Menü, Kopfzeile) | gedimmt | fehlt | rot, unten in eigener Gruppe |
| Kontextmenü (langes Drücken) | **fehlt** | fehlt | rot, am Ende |
| Kopfzeile / Leiste | gedimmt | fehlt | – |
| Wischaktionen | fehlt | fehlt | rot, außen |

### 2.2 `presentation` – der Stapel (Bereich ‚Dienste‘)

Vorbilder: UIKit `present`/`dismiss` (Stapel), `sourceItem`, `shouldDismiss`/`didDismiss`; SwiftUI `sheet(item:)`; Lion `OverlaysManager`
(`invokerNode`, `isBlocking`); Spectrum `OverlayStack` (Escape fürs oberste).

```js
const p = AD.presentation;                                  // eine je Seite
const h = p.present('sheet', html, { command: 'entry.edit',  // Quelle über die Kennung, nicht über das Element
  shouldDismiss: () => !dirty || confirmDiscard() });       // Rückfrage vor dem Schließen (Apple shouldDismiss)
h.on('dismiss', e => { if (e.reason === 'user') … });       // reason: 'user' | 'app' | 'replaced' | 'parent'
h.dismiss();
```

| Teil | Name | Vorbild |
|---|---|---|
| Arten | `sheet` (Fenster/Blatt) · `alert` (Hinweisfenster) · `menu` · `submenu` · `popover` (Sprechblase) · `activity` (Teilen, Drucken, Dateiauswahl, solange sie läuft) | UIKit-Stile, HIG |
| Methoden | `present(kind, content, { command, sourceItem, shouldDismiss, wide })` → Griff · `dismiss(handle?)` (ohne Griff: oberstes) · `refresh()` (nach Neuaufbau, sonst von selbst) | UIKit |
| Griff | `kind` · `command` · `open` · `dismiss()` · `on('dismiss')` | SwiftUI `dismiss`, Lion |
| Nur lesen | `stack` (Liste von unten nach oben) · `top` | `presentedViewController` |
| Ereignisse | `change` (nach jeder Änderung des Stapels) | – |

**Was die Bean nach jeder Änderung selbst ableitet** (eine Funktion für alle Arten; heute an 6 Stellen von Hand, siehe Recherche Abschnitt 0):

| Folge | Regel heute | wie |
|---|---|---|
| Tönung der Quelle | R-3.3, R-4.13, R-8.1 | jede Quelle im Stapel ist gehalten (heutige Bean `sourcehighlight`, nur noch von hier gerufen) |
| `aria-expanded` | R-1.8 | `true` an der Quelle jedes offenen `menu`/`submenu`/`popover`, sonst `false` (löst APD-150) |
| Quelle finden | – | `[data-command="…"]` im aktuellen DOM, **nach jedem Neuaufbau neu** (MutationObserver wie heute bei `swipeactions`) |
| Sperre dahinter | heute `lockPage`, `inert` | alles unter dem obersten modalen Eintrag `inert`. Ausnahme: der Durchlass H-6 |
| Escape | heute 6 Stellen | geht immer an `top`, über `shouldDismiss` |
| Fokus zurück | R-1.8 (APD-112) | an die Quelle über die Kennung, sonst an das Ersatzziel wie heute (`fokusNachFenster`) |
| Lage und Größe | heute `layout()`, `placeDialogs` | **eine** `layout()` je Art, neu bei Drehen, Textgröße, Tastatur |

## 3. Grundsätze aus der HIG (Frage 3: ja) – an einer Stelle durchgesetzt

| Nr. | Grundsatz | Was `present` tut | Beleg |
|---|---|---|---|
| H-1 | Nur ein Popover bzw. Menü zur Zeit, kein Popover aus einem Popover | ein neues `menu`/`popover` ersetzt das offene (`reason: 'replaced'`) | HIG Popovers |
| H-2 | Untermenü höchstens eine Ebene | `submenu` nur über `menu`; tiefer → `console.error`, nichts öffnet | HIG Menus, R-4.9 |
| H-3 | Nur ein Sheet; ein Modal schließt vor dem nächsten | ein `sheet` über einem `sheet` schließt das alte zuerst | HIG Sheets, Modality |
| H-4 | Ein Alert darf über allem liegen, aber nie zwei | ein zweiter `alert` wartet in einer **Warteschlange**, bis der erste schließt | HIG Modality |
| H-5 | Menü und Popover schließen, bevor ein Sheet oder Alert aus ihnen kommt | `sheet`/`alert` aus einem Menü: Menü zu (`reason: 'replaced'`), die Quelle bleibt die Schaltfläche des Menüs | HIG Menus |
| H-6 | Durchlass in der Kopfzeile | bei offenem Menü öffnet ein Tipp auf eine andere Schaltfläche der Kopfzeile direkt deren Menü, ein Tipp auf die eigene schließt | UIKit `barButtonItem` |
| H-7 | Gleicher Befehl, je Ort andere Darstellung | Tabelle in 2.1 | HIG Menus, Context menus |
| H-8 | Nur eine Systemaktion zur Zeit | ein zweites `activity` wird abgelehnt, solange eins läuft | MDN `navigator.share` (InvalidStateError) |
| H-9 | Schließen ohne Datenverlust | `shouldDismiss` vor jedem Schließen durch den Nutzer (Tippen außerhalb, Escape, Wischen am Blatt) | UIKit `shouldDismiss`, HIG Modality |

**Bewusst wie heute (Abweichung von Apple):** Eine Abfrage bleibt auch am iPhone eine Sprechblase an der Schaltfläche (Designrichtlinie 15.17).
Bei Apple wird ein Popover bei kompakter Breite zum Blatt.

## 4. So sähe die App aus (Beispiel)

**Heute:**
```js
btn.onclick = () => { adSourcehighlight.hold(btn); openMenu(btn, items); };   // halten und freigeben von Hand, aria-expanded im Menü
```

**Mit V-3:**
```js
AD.toolbar(header, ['entry.add', 'more']);   // Kopfzeile aus Befehlen und Menüs; Tippen → presentation.present('menu', …)
```

Tönung, Freigabe, Fokus und `aria-expanded` stehen nicht mehr im App-Code. Ein Neuaufbau der Seite ist gefahrlos, weil die Quelle über
`data-command` wiedergefunden wird.

## 5. Testfall-Liste (automatisch), Entwurf

Jede Zeile wird eine Prüfung in Chromium und WebKit. Nach jedem Schritt gelten die Grundregeln (0 Nr. 1, `pruefe.mjs`).

| Nr. | Fall | Erwartet |
|---|---|---|
| S-1 | Menü öffnen | Quelle getönt, `aria-expanded="true"`, Rest gesperrt außer der Kopfzeile (H-6) |
| S-2 | Menü schließen (Tippen außerhalb, Escape, Auswahl) | Tönung weg, `aria-expanded="false"`, Fokus auf der Quelle |
| S-3 | Neuaufbau bei offenem Menü | neue Schaltfläche getönt und `aria-expanded="true"`; nach dem Schließen frei (APD-150) |
| S-4 | Untermenü öffnen und schließen | Quelle im Menü `aria-expanded`; ein Untermenü im Untermenü öffnet nicht (H-2) |
| S-5 | Menü offen, andere Schaltfläche der Kopfzeile | ein Tipp öffnet deren Menü, das erste ist zu (H-1, H-6) |
| S-6 | Fenster aus dem Menü | Menü zu, Fenster offen, Quelle = Menüschaltfläche getönt (H-5); nach dem Schließen frei, Fokus zurück |
| S-7 | Hinweisfenster aus dem Fenster | über dem Fenster; nach dem Schließen ist das Fenster wieder oben |
| S-8 | Zwei Hinweisfenster nacheinander | das zweite kommt erst nach dem ersten (H-4) |
| S-9 | Fenster aus dem Fenster | das alte schließt zuerst (H-3) |
| S-10 | Fenster mit Änderungen, Tippen außerhalb bzw. Escape | `shouldDismiss` fragt, das Fenster bleibt offen (H-9) |
| S-11 | Teilen läuft, zweites Teilen | abgelehnt, Quelle bleibt getönt, bis das Teilen endet (H-8) |
| S-12 | Ergebnis im Hinweisfenster statt im Fenster (P-124-Weg) | Quelle gehalten, bis das Hinweisfenster schließt |
| S-13 | Drehen bei offenem Menü, Fenster bzw. Hinweisfenster | Lage neu, Tönung und Fokus bleiben |
| S-14 | Befehl wird unmöglich (`revalidate`) | im Menü gedimmt, im Kontextmenü fehlt er, in den Wischaktionen fehlt er (H-7) |
| S-15 | Gegenprobe: Ableitung abgeschaltet | S-1 bis S-3 werden rot |

## 6. Weg ohne Eingriff in die Apps

1. **Entwurf** (diese Datei) mit dir abstimmen, in Runden.
2. **Muster:** eine kleine Beispiel-App in `arbeit/` mit Kopfzeile, Mehr-Menü, Untermenü, Fenster, Hinweisfenster und Teilen, nur aus den
   beiden Beans. Zum Ausprobieren am iPad und iPhone, vorher automatisch geprüft (S-1 bis S-15), mit Apple-Abgleich (2.6).
3. **`v5/`**, zusammen mit APD-145 (Namensraum `AD`, AppDesign 5.0.0). Die festen Fassungen 4.x bleiben, das Reiselogbuch bleibt bei 4.x,
   bis du den Wechsel freigibst (R-10.3).
4. Danach APD-148 (`backup`) und APD-142 schon auf `presentation`/`commands`.

## 7. Offene Punkte für die nächste Runde

- Q-1 Namen `commands` und `presentation` (Vorbild Apple, Lumino)?
- Q-2 Durchlass in der Kopfzeile (H-6) – gewünscht? Heutiges Verhalten im Reiselogbuch prüfe ich vor dem Muster.
- Q-3 Nächster Schritt: Muster (Beispiel-App) oder erst die Schnittstelle weiter ausarbeiten?

## 8. Antworten Runde 3 (Nutzer 26.11.2026, Konzept-Chat APD-149, im Fenster)

- Q-1: **Ja** – die Beans heißen `commands` und `presentation`.
- Q-2: **Ja** – Durchlass in der Kopfzeile wie bei Apple (H-6).
- Q-3 (im Fenster geschrieben): „Die Beans sollen standardmäßig auch in den Bean-Katalog. Kannst du die Muster gleich im Bean-Katalog anstatt der
  Muster-App bauen?“
  - Antwort Claude: Der erste Teil gilt schon heute. R-1.13 verlangt für jede Bean der Liste (15) eine Katalogdatei `katalog/<kennung>.js`.
  - Zum Muster im Katalog siehe Abschnitt 9.

## 9. Muster im Bean-Katalog – zwei Wege

Heute lädt der Katalog immer `v4/ui.js` (Designrichtlinie 14). `checkBeans` hält ihn gleich mit der Liste der AD-Beans (15). Beide Beans gibt es noch nicht.

**W-1 Entwurf im Katalog (Empfehlung für die Musterrunden)**
- Die beiden Beans entstehen zuerst als eigene Datei `katalog/entwurf/presentation-commands.js`.
- Der Katalog lädt sie zusätzlich und zeigt sie unter ‚Entwurf‘. Ausprobieren:
  - Kopfzeile mit zwei Menüs und Untermenü
  - Fenster, Hinweisfenster und Teilen
  - Protokoll des Stapels
- Keine AppDesign-Version, kein Prüflauf von 75 min je Runde. Die Apps bleiben unberührt.
- Die Fälle S-1 bis S-15 laufen vorher automatisch gegen die Katalogseite.
- **Braucht** eine kleine Ergänzung im Wortlaut von Designrichtlinie 14 („lädt immer `v4/`“, dazu Beans im Entwurf) und in `checkBeans`.
  Den Wortlaut alt und neu lege ich dir vorher vor (0 Nr. 29).

**W-2 gleich als Beans in `v4/` (AppDesign 4.71.0)**
- Die Beans kommen in die Liste (15) und den Katalog wie jede Bean.
- Jede Musterrunde ist eine Version mit Bau-Frage und vollem Prüflauf.
- Die Apps bleiben auf ihrer Fassung.
- Langsamer in den Runden. Später zieht `v5/` (APD-145) sie unter `AD` um.

Nach dem Muster (W-1) folgt der echte Bau in `v5/` mit APD-145, wie in Abschnitt 6.
