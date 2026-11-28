# APD-145 – Namen alt → neu in `v5/` (AppDesign 5.0.0, Sitzung AppDesign 0011)

**28.11.2026** · Grundlage: `arbeit/APD-149 0008 Testfall-Listen v5.md` Abschnitt 2.2 (APD-145/J-4). Das CHANGELOG verweist auf diese Liste.

Seit 5.0.0 stellt `ui.js` global nur `AD` bereit (R-1.14). Jeder Name der Schnittstelle heißt jetzt `AD.<Name>`, z. B. `AD.openMenu(…)`,
`AD.createSync(…)` und `AD.alert`. Namen, die schon englisch waren, bleiben gleich und bekommen nur `AD.` davor.

## 1. Teil `app` – 23 Namen

| Alt | Neu |
|---|---|
| `ansagen` | `announce` |
| `aufzaehlung` | `listHtml` |
| `darstellungMenuItem` | `appearanceMenuItem` |
| `ersterFehler` | `focusFirstInvalid` |
| `feldFehler` | `setFieldError` |
| `fokus` | `focus` |
| `glasAusBackup` | `glassFromBackup` |
| `halten` | – (war nur der Schlüssel im Menüeintrag, siehe 2; kein Name in `AD`) |
| `inhaltSchmal` | `compactWidth` |
| `leerHtml` | `contentUnavailableHtml` |
| `leerSuche` | `searchUnavailableHtml` |
| `messungMenuItems` | `measureMenuItems` |
| `navAnmelden` | `navRegister` |
| `navSeite` | `navSidebar` |
| `navVor` | `navPush` |
| `navZurueck` | `navPop` |
| `onNeuerTag` | `onDayChange` |
| `rolle` | `scrollView` |
| `rollen` | `scrollBy` |
| `sucheAnmelden` | `searchRegister` |
| `sucheBeendenHtml` | `searchCancelHtml` |
| `suchenMenuItems` | `searchMenuItems` |
| `wischHtml` | `scrollRowHtml` |

Dazu im Teil `app` das Bean-Exemplar `adSourcehighlight` → `sourcehighlight` (R-1.14: ‚Bean-Exemplare wie `AD.alert`‘).

## 2. Schlüssel in Optionen und Rückgaben

| Name | Alt | Neu |
|---|---|---|
| `contentUnavailableHtml({ … })` | `titel`, `satz`, `aktion`, `klein`, `suche` | `title`, `description`, `actions`, `compact`, `search` (`actions` ist wie bisher eine Schaltfläche `{ id, label }`) |
| `searchUnavailableHtml(term, compact)` | `(begriff, klein)` | `(term, compact)` (Stellen, keine Schlüssel) |
| `announce(text, { … })` | `warten` | `delay` |
| `navRegister({ … })` | `zurueck: { offen, darunter, los }` | `back: { shown, below, go }` |
| `navRegister({ … })` | `seite: { moeglich, fest, offen, zeigen, neu }` | `sidebar: { possible, fixed, shown, show, refresh }` |
| `measureMenuItems({ … })`, `measureStart({ … })` | `app`, `teile`, `rollen` | `app`, `elements`, `scrollers` |
| Eintrag in `openMenu(…)` | `{ note, halten: true }` | `{ note, longPress: true }` |
| `scrollView` | `el`, `y`, `max`, `to`, `by`, `rest`, `ende`, `halt` | `el`, `y`, `max`, `to`, `by`, `remaining`, `end`, `stop` |
| Liste der AD-Beans (15), Katalog | Anlegen `createAlert(…)` … | `AD.createAlert(…)` … (R-1.13) |

## 3. Teil `pruefungen` – 15 Namen

| Alt | Neu |
|---|---|
| `MESS_MAX_MS` | `MEASURE_MAX_MS` |
| `beruehrt` | `touchedAt` |
| `gemeldet` | `viewportResized` |
| `gerollt` | `scrolled` |
| `gross` | `largeContent` |
| `leer` | `blank` |
| `mess` | `measurement` |
| `messAus` | `measureOff` |
| `messFrei` | `measureAllowed` |
| `messStart` | `measureStart` |
| `messZeile` | `measureLine` |
| `navKandidat` | `navCandidate` |
| `platz` | `reserveSpace` |
| `schnell` | `fastScroll` |
| `tipp` | `tap` |

Dazu im Teil `pruefungen`:
- das Bean-Exemplar `adAlert` → `alert`;
- **neu** `ICONS` und `rand12` → `popoverMargins`: zwei innere Namen, die Prüfungen von AppDesign schon nutzten (`pruefseite.mjs` und
  `kontextmenue.mjs`). Die Schnittstelle prüft jetzt auch die Prüfdateien von AppDesign (APD-145/T-5), und innen sind sie nicht mehr erreichbar.

## 4. Was bleibt

- **Gespeicherte Daten und Backups** (R-9.2): Schlüssel im localStorage (z. B. `reiselogbuch.v1`) und Felder im Backup (z. B. `db.settings.glas`).
- **CSS-Klassen und ids** in `design.css` und im erzeugten HTML, z. B. `.rolle`, `#rolle`, `.leer`, `.leer.klein`, `.note.halten`, `--platz`,
  `.beruehrt`.
- **Innere Namen** von `ui.js`, die nicht in der Schnittstelle stehen (z. B. `messPlatz`, `schalter` im Menüeintrag, Felder von `AD.measurement`
  wie `zeilen` und `an`). Sie werden englisch, wenn ihr Baustein umgebaut wird.
- **Innere Bindung** `halten` in `ui.js` (Festhalten des Felds nach dem Fokus) heißt jetzt `fieldHold`, damit kein alter Name in `v5/` steht.
- Die festen Fassungen 4.x und `v4/` (= Fassung 4.71.1).
