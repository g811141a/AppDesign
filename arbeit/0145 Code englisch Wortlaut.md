# Code englisch, Texte deutsch – Wortlaut und neue Namen (APD-136, 0 Nr. 29)

Sitzung 0145, 20.11.2026. **Entschieden:** APD-136/F-1 bis F-4 aus `arbeit/0144 Bean-Namen englisch Vorschlag.md` gelten (Nutzer 20.11.2026, Sitzung
0145, im Fenster: ‚Ja‘). Diese Datei enthält den Wortlaut der Regeln (Abschnitte 1 und 2), die neuen Namen der zwei Beans (3 und 4) und den Katalog (5).

**Stand der Freigabe** (Nutzer 20.11.2026, Sitzung 0145, im Fenster): Abschnitte 3 und 4 (neue Namen) **ja** · Abschnitt 5 **a) alle Felder englisch** ·
Abschnitte 1 und 2 (Wortlaut der Regeln) **offen** – der Nutzer schreibt im Chat.

## 1. Zusammenarbeit 1 ‚Sprache und Ton‘ – Regel

**Alt** (dritter Punkt, letzter Satz):
> Englisch bleiben nur Code, Dateinamen und Fachbegriffe ohne gängiges deutsches Wort.

**Neu** (dritter Punkt, letzter Satz):
> Englisch bleiben nur Code (nächster Punkt) und Fachbegriffe ohne gängiges deutsches Wort.

**Neu** (neuer vierter Punkt, vor ‚Schaltflächen im Chat …‘):
> - **Code englisch, Texte deutsch:** alle Namen im Code sind englisch – Funktionen, Variablen, Kennungen, Eigenschaften, Methoden, Ereignisse,
>   CSS-Klassen, Schlüssel und neue Dateinamen. Deutsch ist alles, was man liest: Kommentare im Code, Doku, Regeln, CHANGELOG, Backlog, Katalog-Texte,
>   Prüfmeldungen und alles, was die App anzeigt; Namen aus dem Code stehen darin unübersetzt in `Code-Schrift`. Neuer und geänderter Code ist sofort
>   englisch; Bestehendes wird umbenannt, wenn sein Baustein ohnehin umgebaut wird (bei einer AD-Bean: Kennung, Schnittstelle, CSS-Klassen und
>   Katalogdatei). Nie umbenannt werden gespeicherte Daten und Backups (Schlüssel im localStorage, Felder im Backup – R-9.2), die festen Fassungen
>   `fassung/X.Y.Z/` (R-10.3) sowie Prüf- und Dateinamen, solange Regeln oder Changelogs sie zitieren.

**Alt** (Prüfzeile des Abschnitts): `Prüfung: Selbstkontrolle.`
**Neu:** `Prüfung: Selbstkontrolle; Namen der AD-Beans `checkBeans` (R-1.13).`

## 2. Regelkatalog R-1.13 (Designrichtlinie 17) – Regel

Grundlage ist der schon freigegebene Wortlaut ‚Anlegen‘ (`arbeit/0144 Begriff Anlegen Wortlaut.md`). Die Regel steht nach 0 Nr. 3 nur einmal (in
Zusammenarbeit 1); R-1.13 verweist darauf und nennt die Prüfung.

**Alt** (Satz zur Kennung):
> Die **Kennung** ist sprechend nach der Aufgabe (nie nach Geste oder Technik, keine Nummer), fest und nie wiederverwendet: …

**Neu:**
> Die **Kennung** ist sprechend nach der Aufgabe (nie nach Geste oder Technik, keine Nummer), englisch wie die ganze Schnittstelle (Zusammenarbeit 1),
> fest und nie wiederverwendet: …

**Prüfung – neu dazu:** `checkBeans` – Namen der Liste (Kennung, Anlegen, Eigenschaften, Nur lesen, Methoden, Ereignisse) ohne Umlaut und ß und ohne
ein Wort der Sperrliste deutscher Namen (`offen`, `zu`, `zeigen`, `schliessen`, `entfernen`, `kacheln`, `aktionen`, `masse`, `breite`, `hinweis`,
`gedrueckt` …); Gegenprobe: ein deutscher Name in der Liste wird rot. Grenze: Die Prüfung erkennt nur Wörter der Sperrliste, nicht jedes deutsche Wort
(den Rest deckt die Selbstkontrolle ab).

## 3. Bean `hinweis` → `notice` (‚ersetzt `hinweis`‘ nach R-1.13)

| Teil | Alt | Neu |
|---|---|---|
| Kennung | `hinweis` | **`notice`** – ersetzt `hinweis` (die Kennung `hinweis` wird nie wieder vergeben) |
| Anlegen | `createHinweis(fenster, { breiteNachDateiname })` | `createNotice(dialog, { fitFileName })` |
| Eigenschaft | `breiteNachDateiname` (ein) | `fitFileName` (ein) |
| Nur lesen | `offen` | `isOpen` |
| Methoden | `zeigen(titel, html, { breit, aktion })` · `schliessen()` | `show(title, html, { wide, action })` · `close()` |
| Ereignis | `zu` | `close` |
| Bean in ui.js | `adHinweis` (`schnittstelle.json`) | `adNotice` |
| CSS | `.ad-hinweis`, `-breit`, `-form`, `-kopf`, `-text`, `-knoepfe`, `-knopf` | `.ad-notice`, `-wide`, `-form`, `-head`, `-text`, `-buttons`, `-button` |
| Katalog | `katalog/hinweis.js` | `katalog/notice.js` |

Bleibt: `inform(title, html, { wide, action })` (schon englisch), `action` = `{ label, icon, run }`, der deutsche Name ‚Hinweisfenster‘ im Katalog und in
der Doku, das Aussehen.

## 4. Bean `swipeactions` – Schnittstelle (Kennung bleibt)

| Teil | Alt | Neu |
|---|---|---|
| Anlegen | `createSwipeactions(liste, { kacheln, aktionen })` | `createSwipeactions(list, { tiles, actions })` |
| Eigenschaften | `kacheln` · `aktionen` | `tiles` · `actions` |
| Eintrag | `{ icon, label, kurz, red, act }` | `{ icon, label, short, red, act }` |
| Aufruf von `act` | `act({ anker, quelle: 'wischen' })` | `act({ anchor, source: 'swipe' })` |
| Nur lesen | `offen` · `masse` | `openTile` · `metrics` |
| Maße (`metrics`) | `kapselBreite`, `kapselHoehe`, `abstand`, `rand`, `offenAb`, `ueberMax`, `ueberWachsen`, `entscheid`, `waagrecht` | `capsuleWidth`, `capsuleHeight`, `gap`, `margin`, `openAt`, `overshootMax`, `overshootGrow`, `decideAfter`, `horizontal` |
| Methoden | `schliessen()` · `entfernen()` | `close()` · `destroy()` |
| Ereignisse | `offen` · `zu` | `open` · `close` |
| CSS | `-traeger`, `-kachel`, `-aktionen`, `-eintrag`, `-kapsel`, `.rot`, `-wort`, `.umbruch` | `-host`, `-tile`, `-actions`, `-item`, `-capsule`, `.red`, `-word`, `.wrap` |

In der App (Reiselogbuch): `createSwipeactions(side, { tiles: '[data-id]', actions: tripActions })` · `wischen.schliessen()` → `swipe.close()` ·
in den Einträgen `kurz:` → `short:` und `w?.anker` → `w?.anchor`. Die App-eigenen Namen (`tripAktionen`, `wischen`) werden nach F-3 mit umbenannt, weil
die Stellen ohnehin geändert werden.

## 5. Bean-Katalog – Felder der Katalogdateien

Beide Katalogdateien werden ohnehin neu geschrieben (Kennung `notice`, neue Schnittstelle). Vorschlag: **alle Felder jetzt englisch** (F-3: der Baustein
wird umgebaut):

| Alt | Neu | Alt | Neu |
|---|---|---|---|
| `kennung` | `id` | `eigenschaften` | `properties` |
| `bereich` | `area` | `lesen` | `readOnly` |
| `seit` | `since` | `methoden` | `methods` |
| `abschnitt` | `section` | `ereignisse` | `events` |
| `satz` | `summary` | `regeln` | `rules` |
| `fabrik` | `create` | `verlauf` | `history` |
| `anleitung` | `howTo` | `vorfuehren(el, protokoll)` | `demo(el, log)` |
| `katalogBean(…)` | `catalogBean(…)` | `name`, `icon` | bleiben |

**Folge für den freigegebenen Wortlaut ‚Anlegen‘** (`arbeit/0144 Begriff Anlegen Wortlaut.md`, Abschnitte 4 und 5): Dort stand für den Code
`fabrik:` → `anlegen:` und `fabrik`/`fabriken` → `anlegen`/`anlegenListe`. Nach F-1 heißen sie **`create:`** bzw. **`create`/`createList`**. Die sichtbaren
Texte und Meldungen (‚Anlegen …‘) bleiben wie freigegeben.

Sonst (b): nur `fabrik` → `create`, die übrigen Felder bleiben deutsch, bis der Katalog umgebaut wird.

## Was nicht geändert wird (F-3, F-4)

- Innere Namen in den Beans (z. B. `hoerer`, `passen`, `aufbauen`, `NAV_ENTSCHEID`) – erst, wenn die Bean inhaltlich umgebaut wird.
- Übriges `ui.js` und `index.html` (rund 350 Namen), Prüfdateien und Prüffunktionen (`checkBeans`, `checkWachsen` …), `data-ad-bean` bleibt als
  Attributname.
- Gespeicherte Daten, Backups, `fassung/X.Y.Z/`, Versionsgeschichten, CHANGELOG, `arbeit/`.

## Weiter nach der Freigabe

Bean `sourcehighlight` neu fassen (englische Schnittstelle `held` · `source` · `hold(sel)` · `release(sel)` · `setSource(sel)` · `clearSource()` ·
`refresh(root)` · Ereignis `change`, mit Mehr-Knopf, App umgestellt): Listenzeile und Testfall-Liste zur Freigabe. Gebaut wird alles mit APD-136 in einer
Version – Bau-Frage vorher (0 Nr. 21). Prüfstufe: voll (ui.js, design.css, Prüfungen ändern sich).
