# v5/ (AppDesign 5.0.0) – Testfall-Listen geprüft, Fehlendes vorgelegt (Sitzung AppDesign 0008)

**27.11.2026** · nach `arbeit/APD-149 Uebergabe.md` Abschnitt 3 Nr. 2 (0 Nr. 1, 0 Nr. 29). Nichts gebaut.

## 1. Befund: welche Liste liegt vor?

| Punkt von `v5/` | Testfall-Liste | Wortlaut | Stand |
|---|---|---|---|
| APD-149/J-1 Entwurf im Katalog | 7 Prüfungen, Gegenprobe `beans:entwurf` (`arbeit/APD-149 0001 Wortlaut Entwurf im Katalog.md` Abschnitt 4) | freigegeben (J-1) | vollständig |
| APD-149/J-5 R-1.4 Durchlass | Änderung `hig.mjs` mit Gegenprobe (`arbeit/APD-149 0004 Fund 1 R-1.4 Durchlass.md`) | freigegeben (J-5) | vollständig |
| APD-152 Wiederherstellen behält Zeitpunkte | T-1 bis T-11 (`arbeit/0168 Punkt 1 Vorschlag.md`, `arbeit/0168 Aufgefallen Punkt 6.md`) | freigegeben | vollständig |
| APD-153 Gegenprobe W-97, `checkGegenproben` | T-1 bis T-3 (`arbeit/0168 Aufgefallen Punkt 2.md`) | freigegeben (0 Nr. 2) | vollständig; in `v5/` sucht `checkGegenproben` die Stellen in `v5/` |
| APD-154 Drehprüfung ‚beside‘ | T-1 bis T-11 (`arbeit/APD-154 Testfall-Liste.md`) | **Spalte Prüfung R-8.1 fehlt** | Abschnitt 3 |
| APD-151 Fenster am iPhone wie am iPad | M-1 bis M-18 (`arbeit/APD-151 Testfall-Liste.md`), am Muster | freigegeben (0007) | **Ergänzung für den Bau** in Abschnitt 5 (Weiche entfällt, Aufgefallen Nr. 1 in der App) |
| APD-149 Beans `commands`, `presentation` | S-1 bis S-16, L-1 bis L-4 (Muster, Gerät ok) | – | **Ergänzung** in Abschnitt 4 (S-10 nach H-9 neu, J-7, Katalog) |
| **APD-145 Namensraum `AD`, `v5/`** | **keine** | **R-1.14 fehlt** | **neu** in Abschnitt 2 |

## 2. APD-145 – Namensraum `AD` und `v5/` (neu)

### 2.1 Wortlaut (0 Nr. 29) – alt und neu

**R-1.14, Regel – alt:**
> **Schnittstelle von ui.js:** die App nutzt von `ui.js` nur die Namen aus `v4/schnittstelle.json` (Teil `app`), ihre Prüfungen dazu den Teil `pruefungen`; keine Deklaration der App trägt den Namen eines Bausteins von `ui.js`

**R-1.14, Regel – neu:**
> **Schnittstelle von ui.js – Namensraum `AD`:** `ui.js` stellt global nur `AD` bereit, alles andere hängt daran (`AD.openMenu(…)`, `AD.createSync(…)`, Bean-Exemplare wie `AD.alert`); die App nutzt nur `AD.<Name>` mit den Namen aus `v5/schnittstelle.json` (Teil `app`), ihre Prüfungen dazu den Teil `pruefungen`; alle Namen sind englisch (Zusammenarbeit 1); keine Deklaration der App heißt `AD`

**R-1.14, Prüfung – alt:** schnittstelle.mjs – `checkSchnittstelle` (App, Vorlage, Prüfdateien, Namensgleichheit, Liste gegen `ui.js`; Gegenprobe)

**R-1.14, Prüfung – neu:** schnittstelle.mjs – `checkSchnittstelle` (nur `AD` global, `AD` gegen die Liste, App, Vorlage und Prüfdateien nur `AD.<Name>` aus ihrem Teil, kein alter Name, Namen englisch; Gegenprobe)

**R-1.13 – alt (Teilsatz):** „die App legt sie mit `create<Kennung>(…)` an (**Anlegen**)“
**R-1.13 – neu (Teilsatz):** „die App legt sie mit `AD.create<Kennung>(…)` an (**Anlegen**)“

**Designrichtlinie 14:**

| Stelle | Alt | Neu |
|---|---|---|
| Inhalt | `v4/design.css` (…), `v4/ui.js` (…) | `v5/design.css` (…), `v5/ui.js` (…) |
| Bean-Katalog | ‚lädt immer `v4/`‘ | ‚lädt immer `v5/`‘ |
| Feste Fassung | ‚`v4/` ist der Arbeitsstand und zeigt die neueste 4er-Fassung; eine Hauptversion (5.0.0) bekommt einen neuen Ordner `v5/`.‘ | ‚`v5/` ist der Arbeitsstand und zeigt die neueste 5er-Fassung; `v4/` bleibt auf 4.71.0 stehen; eine Hauptversion (6.0.0) bekommt einen neuen Ordner `v6/`.‘ |
| Schnittstelle von ui.js | ‚Von `ui.js` nutzt die App nur die Namen aus `v4/schnittstelle.json` (R-1.14)‘ | ‚Von `ui.js` nutzt die App nur `AD.<Name>` mit den Namen aus `v5/schnittstelle.json` (R-1.14)‘ |

**Weitere Stellen:**

| Stelle | Alt | Neu |
|---|---|---|
| 15, Einleitung | ‚(`v4/design.css`, `v4/ui.js`)‘ | ‚(`v5/design.css`, `v5/ui.js`)‘ |
| R-10.3 | ‚`v4/` = neueste Fassung‘ | ‚`v5/` = neueste Fassung, `v4/` = Fassung 4.71.0‘ |
| R-10.9, Spalte Prüfung | ‚Doku, `v4/`, Katalog‘ | ‚Doku, `v5/`, Katalog‘ |
| `CLAUDE.md` AppDesign (→ 2.15.0) | ‚`v4/` ist der Arbeitsstand (= neueste Fassung), eine Hauptversion bekommt `v5/`.‘ · ‚nach Änderungen an `v4/` oder `tests/`‘ | ‚`v5/` ist der Arbeitsstand (= neueste Fassung), `v4/` bleibt auf 4.71.0; eine Hauptversion bekommt `v6/`.‘ · ‚nach Änderungen an `v5/` oder `tests/`‘ |
| Namen in den Richtlinien | alte Namen der Tabelle 2.2 (z. B. `rolle.ende()` in 15.22, `navVor` in 13) | dieselbe Stelle mit dem neuen Namen, ohne neuen Inhalt. Fassungen, Versionsgeschichten und CHANGELOG bleiben |

- Dazu kommen ohne Regelinhalt: `README.md` (Dateitabelle `v5/`) und `tests/README.md`.

### 2.2 Namen alt → neu (APD-145/J-1: die deutschen Namen englisch)

Gezählt in dieser Sitzung: `v4/schnittstelle.json` hat **72** Namen im Teil `app`, davon **23** deutsch oder gemischt. Die Klärung 0150 nannte 19 von 69; `sucheAnmelden`, `sucheBeendenHtml`, `suchenMenuItems` und `wischHtml` standen dort nicht. Der Teil `pruefungen` hat 23 Namen, davon 15 deutsch.
Vorbild nach Zusammenarbeit 1: zuerst die Web-Plattform, dann Apple. Das ist mein **Vorschlag**.

| Alt | Neu | Vorbild bzw. Grund |
|---|---|---|
| `ansagen` | `announce` | ARIA-Live-Bereich; UIKit `UIAccessibility.post(.announcement)` |
| `aufzaehlung` | `listHtml` | baut die Aufzählung mit ‚·‘ als HTML, wie `capHtml` |
| `darstellungMenuItem` | `appearanceMenuItem` | Apple ‚Appearance‘ (Darstellung) |
| `ersterFehler` | `focusFirstInvalid` | `aria-invalid`, `:invalid` |
| `feldFehler` | `setFieldError` | setzt die Fehlerzeile und `aria-invalid` (wie `setCustomValidity`) |
| `fokus` | `focus` | `HTMLElement.focus` |
| `glasAusBackup` | `glassFromBackup` | Liquid Glass; der gespeicherte Schlüssel `db.settings.glas` bleibt (R-9.2) |
| `halten` (Eintrag `{ note, halten: true }`) | `longPress` | wie `onLongPress` |
| `inhaltSchmal` | `compactWidth` | Size class ‚compact‘; Wahrheitswert ohne `is` |
| `leerHtml` | `contentUnavailableHtml` | SwiftUI `ContentUnavailableView` |
| `leerSuche` | `searchUnavailableHtml` | `ContentUnavailableView.search` |
| `messungMenuItems` | `measureMenuItems` | Messmodus (15.21) |
| `navAnmelden` | `navRegister` | wie `searchRegister` |
| `navSeite` | `navSidebar` | `UISplitViewController` zeigt bzw. verbirgt die Seitenleiste |
| `navVor` | `navPush` | `pushViewController` |
| `navZurueck` | `navPop` | `popViewController` |
| `onNeuerTag` | `onDayChange` | `NSCalendarDayChanged` |
| `rolle` | `scrollView` | `UIScrollView` (`el`, `y`, `max`, `to`, `by`; `rest` → `remaining`, `ende` → `end`, `halt` → `stop`) |
| `rollen` | `scrollBy` | `Element.scrollBy`, gibt vorher Platz |
| `sucheAnmelden` | `searchRegister` | wie `navRegister` |
| `sucheBeendenHtml` | `searchCancelHtml` | Abbrechen der Suchleiste (`UISearchBar`) |
| `suchenMenuItems` | `searchMenuItems` | – |
| `wischHtml` | `scrollRowHtml` | eine Zeile, die seitlich rollt (R-5.4) |

- **Schlüssel in Optionen und Rückgaben**, die die App schreibt, werden ebenfalls englisch. Beispiele: `leerHtml({ titel, satz, aktion, klein, suche })` → `{ title, description, actions, compact, search }`, `ansagen(…, { warten })` → `{ delay }`, `navAnmelden({ seite: { zeigen, offen, moeglich, fest }, zurueck: { offen, darunter, los } })` → `{ sidebar: { show, shown, possible, fixed }, back: { shown, below, go } }`. Die genaue Liste entsteht beim Bau und steht im CHANGELOG.
- **Teil `pruefungen`** (nur Prüfungen), Vorschlag: `MESS_MAX_MS` → `MEASURE_MAX_MS`, `beruehrt` → `touchedAt`, `gemeldet` → `viewportResized`, `gerollt` → `scrolled`, `gross` → `largeContent` (Large Content Viewer), `leer` → `blank`, `mess` → `measurement`, `messAus` → `measureOff`, `messFrei` → `measureAllowed`, `messStart` → `measureStart`, `messZeile` → `measureLine`, `navKandidat` → `navCandidate`, `platz` → `reserveSpace`, `schnell` → `fastScroll`, `tipp` → `tap`.
- **Bleiben:** gespeicherte Daten und Backups (Schlüssel im localStorage, Felder im Backup – R-9.2), die festen Fassungen 4.x, innere Namen von `ui.js`, die nicht in der Schnittstelle stehen (sie werden englisch, wenn ihr Baustein umgebaut wird).

### 2.3 Testfall-Liste APD-145 (Testfälle automatisch)

Chromium und WebKit, wo ein Browser läuft. Nach jedem Schritt gelten die Grundregeln (`pruefe.mjs`).

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| T-1 | `v5/ui.js` laden, die globalen Namen vorher und nachher vergleichen | neu ist nur `AD` | `checkSchnittstelle`; Gegenprobe: `window.openMenu` bleibt global → rot |
| T-2 | `AD` gegen `v5/schnittstelle.json` | `AD` hat genau die Namen aus `app` und `pruefungen`, nicht mehr und nicht weniger | `checkSchnittstelle`; Gegenprobe: ein Name fehlt in `AD` → rot |
| T-3 | Reiselogbuch `index.html` und `sw.js` | nur `AD.<Name aus app>`; kein alter Name ohne `AD.`, kein Name aus `pruefungen`, keine Deklaration `AD` | `checkSchnittstelle`; Gegenprobe: ein Aufruf `openMenu(` ohne `AD.` → rot |
| T-4 | `vorlage/index.html` und die Prüfseite | wie T-3 | `checkSchnittstelle`, `pruefseite.mjs` |
| T-5 | Prüfdateien (AppDesign und App) | nur `AD.<Name>` aus `app` und `pruefungen` | `checkSchnittstelle` |
| T-6 | Namen englisch | kein Name in `v5/schnittstelle.json` mit Umlaut, ß oder einem Wort der Sperrliste deutscher Namen | `checkSchnittstelle` mit der Sperrliste von `checkBeans`; Gegenprobe `schnittstelle:englisch` |
| T-7 | Alte Namen weg | kein Name aus Spalte ‚Alt‘ in `v5/`, App, Vorlage, Katalog, Prüfungen und Richtlinien (außer Versionsgeschichten, CHANGELOG, `fassung/`) | `checkSchnittstelle`, `checkBegriffe` |
| T-8 | Daten bleiben | ein Backup aus Reiselogbuch 3.59.1 laden → gleiche Daten; localStorage nach dem Start mit 5.0.0 hat dieselben Schlüssel | `backup.mjs`, `start.mjs` |
| T-9 | Feste Fassungen | `fassung/5.0.0/` angelegt; alle Prüfsummen 4.x unverändert; `v4/` = `fassung/4.71.0/`, `v5/` = `fassung/5.0.0/` | `version.mjs` |
| T-10 | Reiselogbuch auf 5.0.0 gehoben | `index.html` und `sw.js` laden `../AppDesign/fassung/5.0.0/`, `AD_NEEDED` = 5.0.0, Versionszeile ‚AppDesign 5.0.0‘ | `version.mjs` |
| T-11 | Katalog und Prüfseite | laden `v5/`, fehlerfrei, Versionszeile = `AD_VERSION` 5.0.0 | `katalog.mjs`, `pruefseite.mjs` |
| T-12 | Veröffentlichungs-Skript mit `v5/` | `vorbereiten` setzt die Version in `v5/ui.js` und `v5/design.css`, `v4/` bleibt unberührt; `fassung` kopiert aus `v5/` | `werkzeug/veroeffentlichen-selbsttest.mjs` |
| T-13 | Ganzer Lauf | alle Prüfungen des Reiselogbuchs grün mit 5.0.0, alle Ansichten, Chromium und WebKit | `alle.mjs` (Prüflauf voll) |

- **Usertest (am Gerät):** /0 Version (Reiselogbuch und AppDesign 5.0.0), dann ein Rundgang durch alle Fenster und Menüs. Die Schritte kommen mit dem CHANGELOG.
- **AD-Bean:** keine neue; alle Beans bekommen Anlegen unter `AD` (`AD.createSync` …), Katalog und Liste 15 ziehen mit (R-1.13).

## 3. APD-154 – Wortlaut Spalte Prüfung R-8.1 (0 Nr. 29)

R-8.1 selbst bleibt.

**Alt:** hig.mjs – Drehprüfung jeder Ansicht, hin und zurück, mit Zwischengrößen; ablauf.mjs – `checkSideToggle`

**Neu:** hig.mjs – Drehprüfung jeder Ansicht, hin und zurück, mit Zwischengrößen (Menü und Sprechblase an ihrer Schaltfläche bzw. neben ihrer Kachel, ‚beside‘), `topKeep` (Inhalt und Seitenleiste); ablauf.mjs – `checkSideToggle`

## 4. APD-149 – Beans in `v5/`: Ergänzung der Testfall-Liste

Übernommen aus dem Muster: APD-149/S-1 bis S-16 und L-1 bis L-4, mit den Grundregeln nach jedem Schritt. Sie wandern von `arbeit/APD-149/muster-pruefen.mjs` nach `tests/`. Ergänzt bzw. geändert:

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| S-10 (geändert, H-9) | Fenster mit Änderungen: Escape; Antippen der Abdunkelung | Escape: `shouldDismiss` fragt, das Fenster bleibt offen. Antippen der Abdunkelung: nichts geschieht, es fragt nicht (R-4.6 neu) | wie heute im Muster |
| S-17 (neu, APD-149/J-7) | Etwas liegt auf dem Stapel (Menü, Sprechblase), dann geht die Navigation eine Ebene vor bzw. zurück (`navPush`, `navPop`) | zuerst ist der Stapel leer, die Tönung ist weg, dann wechselt die Ebene; kein Menü steht über der neuen Ebene; Fokus auf dem Seitentitel | neu; Gegenprobe: `dismiss` in `navPop` entfernt → rot |
| S-18 (neu, R-1.13) | Liste der AD-Beans (15) und Katalog | `commands` und `presentation` stehen in der Liste und haben `katalog/commands.js` bzw. `katalog/presentation.js`; die Entwurfsdatei `katalog/entwurf/presentation-commands.js` entfällt; jede Bean öffnet fehlerfrei | `checkBeans`, `katalog.mjs` |

- **Grobentwurf H-9** (Abschnitt 5 der Freigabe APD-151): ‚Tippen außerhalb‘ fällt als Weg zum Schließen weg. Neu: ‚`shouldDismiss` vor jedem Schließen durch den Nutzer (Escape, Ziehen nach unten, x)‘.
- **Vorschlag zur App:** Das Reiselogbuch nutzt die Beans in `v5/` noch nicht. Es bleibt bei `AD.openDialog`, `AD.openMenu` …, so sagt es der Grobentwurf, Abschnitt 6 (‚zuerst ohne Eingriff in die Apps‘). APD-151 gilt trotzdem für alle Fenster, weil es in `ui.js` selbst steckt. Die App stellt später um (APD-148, APD-142).

## 5. APD-151 – Ergänzung für den Bau

Die Weiche des Musters entfällt, der Weg gilt in `ui.js` für alle Fenster. Darum ändern sich M-17 und M-18, und M-19 und M-20 kommen dazu.

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| M-1 bis M-16 | wie freigegeben, jetzt mit `checkSheet` im Reiselogbuch (`ablauf-blatt`, `ablauf-fenster`) statt nur am Muster | wie freigegeben | `ablauf.mjs` – `checkSheet` |
| M-17 (geändert) | iPad quer und hoch | APD-72/D-1 bis D-21 grün, iPad und iPhone haben jetzt **eine** Prüfung | `checkSheet` |
| M-18 (geändert) | Gegenprobe: die Stelle ‚Mitte‘ in `v5/ui.js` setzt das Fenster am iPhone wieder unten an | M-1 und M-10 werden rot | `--gegenprobe`, Stelle genau einmal in `v5/` (APD-153) |
| M-19 (neu, Aufgefallen Nr. 1) | Reiselogbuch ‚Eintrag bearbeiten‘, iPad hoch und iPhone hoch: Feld antippen (Tastatur auf), Tastatur schließen | danach so hoch wie vorher (±2 px), kein leerer Platz unter dem Inhalt; das Fenster gleitet zurück in die Mitte | `checkSheet` (Höhe nach dem Schließen der Tastatur, R-4.5 neu); **rot gegen 4.71.0 / 3.59.1** (gemessen in 0007 im Safari-Modell mit v4: iPad hoch 454 → 1160 px) |
| M-20 (neu) | Reiselogbuch Tageserfassung am iPhone hoch und quer | M-3 (zu hoher Inhalt rollt, Kopf steht) und M-8 (Feld 16 px über der Tastatur) gelten auch hier | `checkSheet`, `checkFieldVisible`, `checkTastaturStill` |

- **`hig.mjs`:** R-4.5 ‚Fenster nicht bildschirmbreit‘ am iPhone entfällt (`tests/hig.mjs:654–656`). R-4.8 (`masseStile`) prüft dann auch am iPhone (freigegeben in 0007).

## 6. Was danach kommt

- Nach deinem Ja zum Wortlaut (Abschnitte 2.1 und 3), zu den Namen (2.2) und zu den Listen (2.3, 4, 5) sind alle Punkte von `v5/` bereit.
- Dann `node werkzeug/veroeffentlichen.mjs stufe --app reiselogbuch` und die **Bau-Frage**: AppDesign 5.0.0 mit Reiselogbuch, gehoben auf 5.0.0, Prüflauf voll.
- Vor `vorbereiten` informiere ich die Kette Reiselogbuch (`send_message`), weil der Bau auch `index.html` des Reiselogbuchs ändert.

## 7. Entschieden (Nutzer 27.11.2026, Sitzung AppDesign 0008, im Fenster)

- **APD-145/J-3:** Wortlaut Abschnitt 2.1 (R-1.14, R-1.13, Designrichtlinie 14, 15, R-10.3, R-10.9, `CLAUDE.md`) **freigegeben**, eingetragen mit `v5/`.
- **APD-154/J-1:** Wortlaut Spalte Prüfung R-8.1 (Abschnitt 3) **freigegeben**, eingetragen mit `v5/`.
- **APD-145/J-4:** Englisch werden alle deutschen Namen der Schnittstelle mit ihren Schlüsseln: 23 App-Namen, ihre Optionsschlüssel und die 15 Namen im Teil `pruefungen` (Abschnitt 2.2).
- **APD-149/J-9:** Das Reiselogbuch nutzt die Beans `commands` und `presentation` in `v5/` noch nicht (Grobentwurf 6); APD-151 wirkt trotzdem für alle Fenster.
- **Testfall-Listen freigegeben:** APD-145/T-1 bis T-13, APD-149/S-10 (geändert), S-17, S-18, APD-151/M-17 bis M-20.
- Damit sind alle Punkte von `v5/` bereit. Als Nächstes kommt die Bau-Frage für AppDesign 5.0.0.
