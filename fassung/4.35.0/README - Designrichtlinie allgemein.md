# Designrichtlinie allgemein

**Version 4.35.0** · Stand 25.10.2026

Allgemeine Gestaltungs- und Bedienregeln für alle Web-Apps von g811141a auf iPad und iPhone. Die Datei liegt im Design-Repo
**AppDesign** (g811141a/AppDesign); ihre Versionsnummer ist die des Repos. Die Komponenten sind dort einmal programmiert und
werden von allen Apps übernommen (Abschnitt 14). Was eine App bewusst anders macht, steht in ihrer
`README - Designrichtlinie <App>.md`, ihr übriges Eigenes in `PROMPT.md` (Abschnitt 12); die Zusammenarbeit in
`README - Zusammenarbeit allgemein.md`.

**Aufbau:** Die **Regeln** stehen nur im Regelkatalog (17), jede mit ihrer Prüfung. Die Abschnitte 1–15 beschreiben Werte,
Gestaltung und Bauteile und verweisen auf die Regel (R-x.y); was dort ohne automatische Prüfung gilt, listet 17 als G-1 … auf.
16 ordnet die HIG-Checkliste den Regeln zu.

> **Vorbild Apple:** Grundlage sind die Apple Human Interface Guidelines
> ([HIG](https://developer.apple.com/design/human-interface-guidelines)) und die [Apple Design Resources](https://developer.apple.com/design/resources/)
> (Vorlagen mit Maßen). Bei jedem Abschnitt bzw. jeder Komponente steht der Link zur passenden Apple-Richtlinie („**Apple:** …“).

> **Hinweis für Claude:** Diese Regeln gelten verbindlich für jede Weiterentwicklung. Wiederkehrende Elemente sind in 15 einmal
> definiert und werden überall genau so verwendet; gepflegt wird die Datei nach Abschnitt 12.

---

## 1. Grundprinzipien

- Zielgeräte iPad und iPhone (Safari, zum Home-Bildschirm hinzugefügt, PWA, offline nutzbar – R-1.5; iPhone-Ansicht 15.17);
  eine Person nutzt die App auf ihren Geräten, kein Login; abgeglichen wird über das Backup (15.18).
- Daten bleiben lokal (localStorage); beim Start fordert die App **dauerhaften Speicher** an (`navigator.storage.persist()`),
  damit Safari die Daten nicht von selbst löscht; Sicherung über eine Backup-Datei (15.19).
- Oberfläche Deutsch, schlicht und klar.
- Eine HTML-Datei (HTML + CSS + JS), dazu `sw.js`, `manifest.json`, Icons 180/512 px.
- **Kein UI-Framework:** reines HTML, CSS und JavaScript – ohne Framework, Build-Werkzeug und CDN; die Bausteine sind einmal in
  AppDesign programmiert (14). Gute Ideen aus Frameworks werden einzeln in eigenen Code übernommen (Vergleich und Begründung:
  `arbeit/A-38 Framework-Vergleich.html`).
- Keine Hilfeseite – die Oberfläche ist selbsterklärend; Hinweise bei Bedarf hinter einem Info-Icon (15.14).
- Alle Aktionen sind echte Schaltflächen; gleiche Aktion = gleiche Bezeichnung und gleiches Icon (R-10.1).
- Keine Systemfenster – Abfragen als **Sprechblase** (15.7), Meldungen im kleinen Fenster (R-4.3).
- **Apple-Look** (iPadOS): Hintergrund Hellgrau, Kästen weiß ohne Rand, schwebende Schaltflächen (R-3.2).
- **Aufbau wie Apple-Apps:** links eine **Seitenleiste** mit der zentralen Liste (15.4), rechts der Inhalt mit einer
  **Kopfzeile** (15.3): Titel in der Mitte, rechts eine Kapsel mit den wichtigsten Aktionen, Weiteres im **Mehr-Menü** ellipsis.
- **Gleiche Bedienung auf iPad und iPhone** (R-1.1): gleiche Kapseln oben (z. B. [`plus` | `ellipsis`],
  [`share` | `search` | `ellipsis`]), gleiche Suche, gleiche Menüs – das iPhone ordnet nur die Seiten anders an (15.17).
- **Nur der Vordergrund reagiert** (R-1.4): Seite gesperrt (`html.locked`), `overscroll-behavior: contain`.
- **Leisten stehen fest, die Seite rollt nie – nur der Inhalt** (R-2.1, Bau 15.22).
- **Nie ungewollt vergrößern** (R-1.3): `touch-action: manipulation`; Zoomen mit zwei Fingern bleibt möglich.
- **Kein Fokus-Rahmen** (R-3.4): Fokus-Rahmen nur bei Bedienung mit Tastatur; ein Fenster öffnet ohne vorausgewählte
  Schaltfläche.
- Bewusst verworfen: eigene Kennzeichnung von Pflichtfeldern; harte, schmale Schatten; Glas-Leiste (schlechter lesbar).

## 2. Farben

**Apple:** [HIG – Color](https://developer.apple.com/design/human-interface-guidelines/color) · [HIG – Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)

CSS-Variablen auf `:root`; Dunkelmodus über `data-theme="dark"`. Helligkeitsstufen wie bei
Apple: Hintergrund → Kasten/Fenster → Schaltfläche (im Dunkelmodus Schwarz → Dunkelgrau →
heller).

| Variable | Hell | Dunkel | Verwendung |
|---|---|---|---|
| `--bg` | `#f2f2f7` | `#000000` | Seitenhintergrund, Kopfzeile |
| `--card` | `#ffffff` | `#1c1c1e` | Kästen, Tabelle, Eingabefelder (ohne Rand), Seitenleiste, Menüs (dunkel `#2c2c2e`) |
| `--dlg-bg` / `--dlg-card` / `--dlg-field` | `#f2f2f7` / `#ffffff` / `#ffffff` | `#1c1c1e` / `#2c2c2e` / `#1c1c1e` | Fenster, Kästen im Fenster, Felder im Fenster |
| `--btn` | `#f9f9f9` | `#3a3a3c` | Fläche der Schaltflächen und Suchfelder |
| `--btn-rim` | `#ffffff` | `rgba(255,255,255,.16)` | Lichtkante (Haarlinie 0,5 px) |
| `--float` | `0 3px 28px rgba(0,0,0,.16)` | `0 3px 28px rgba(0,0,0,.7)` | Schatten „schwebend“ (Apple Mail gemessen) |
| `--ink` | `#1c1c1e` | `#ffffff` | Text |
| `--muted` | `#6e6e73` | `#98989d` | dezente Texte, Hinweise (Kontrast ≥ 4,5 : 1) |
| `--line` | `#d1d1d6` | `#38383a` | Trennlinien (Haarlinie) |
| `--field-line` | `#c7c7cc` | `#48484a` | Haarlinie um Eingabefelder |
| `--accent` | `#007aff` | `#0a84ff` | **Akzentfarbe Apple-Blau:** Hauptaktion, Auswahl, Schritt-Nummern, Links, Rahmen und Markierungen |
| `--accent-ink` | `#ffffff` | `#ffffff` | Text auf Akzentfarbe |
| `--sel-bg` | `#dcebff` | `#10335c` | Fläche eingeschalteter und gedrückter Schaltflächen, Options-Kapseln |
| `--sw-on` / `--sw-off` | `#34c759` / `#e9e9eb` | `#30d158` / `#39393d` | Schalter ein (Apple-Grün) / aus |
| `--glow-accent` | `0 2px 4px rgba(0,0,0,.10), 0 5px 18px rgba(0,122,255,.50)` | `0 2px 4px rgba(0,0,0,.5), 0 5px 18px rgba(10,132,255,.50)` | leuchtender Schein der Hauptaktion und eingeschalteter Elemente |
| `--table-shadow` | `0 1px 3px rgba(0,0,0,.12), 0 8px 24px rgba(0,0,0,.12)` | zusätzlich `0 0 0 .5px rgba(255,255,255,.12)`, Schatten `.6` | Schatten um Tabellen |
| `--danger` | `#b3261e` | `#ff6961` | Fehlermeldungen, Icon ban, roter Feldrahmen |
| `--danger-fill` | `#d70015` | `#d70015` | Lösch-Schaltfläche (gefüllt; dunkel gleiches Rot, damit Weiß lesbar bleibt) |
| `--glow-danger` | `0 2px 4px rgba(0,0,0,.12), 0 5px 14px rgba(215,0,21,.35)` | `0 2px 4px rgba(0,0,0,.5), 0 5px 16px rgba(255,69,58,.35)` | Schatten der Lösch-Schaltfläche |
| `--warn` | `#c07a12` | `#e2a64b` | Markierungen („fehlt“) |
| `--focus` | `#fff1c2` | `#45391a` | markierte Zeile (gelb) |
| `--th-bg` / `--th-line` | `#e5e5ea` / `#c7c7cc` | `#2c2c2e` / `#48484a` | Tabellen-Kopfzeile und ihre Ränder |
| `--zebra` | `#f7f7f9` | `#161618` | jede 2. sichtbare Tabellenzeile |
| `--mark` / `--mark-cur` | `#ffe45c` / `#ffc46b` | `#8a6d00` / `#e08a1e` (schwarze Schrift) | Suchtreffer / Treffer im Fokus |

- **Darstellung** (R-1.2): folgt automatisch der Hell/Dunkel-Einstellung des Geräts (Voreinstellung ‚Automatisch‘, wechselt
  sofort mit); im Mehr-Menü übersteuerbar: Untermenü ‚Darstellung ›‘ (sun-moon, rechts grau der aktuelle Wert) mit Automatisch ·
  Hell · Dunkel (Häkchen). Gespeichert in `settings.appearance` (`auto` | `light` | `dark`).

## 3. Schrift und Abstände

**Apple:** [HIG – Typography](https://developer.apple.com/design/human-interface-guidelines/typography) · [HIG – Layout](https://developer.apple.com/design/human-interface-guidelines/layout)

- Systemschrift `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`, 17 px, Zeilenhöhe 1,45.
- h1 28 px, h2 20 px, Fenstertitel 19 px zentriert; Hinweise (`.hint`) 14 px, Zusatzzeilen und Notizen in Menüs und
  Fensterköpfen 13 px, beide in `--muted`.
- Seitenrand 16 px bzw. iPad-Safe-Area.
- **Abstand zwischen Schaltflächen 12 px** (wie bei Apple), in Leisten, Reihen und Listen.
- Radien: Schaltflächen und Suchfelder Kapsel (22 px), Icon-Schaltflächen rund, Listeneinträge und Kästen 14 px,
  Eingabefelder 10 px, Tabelle 12 px, Fenster 18 px.
- Trennlinien und Feldränder als Haarlinie (0,5 px); Kästen und Tabelle ohne Rand.
- Keine klassischen Checkboxen: Ein/Aus-Einstellungen als **Schalter** (15.15), Optionen beim Erfassen als **Options-Kapsel**
  (15.16).
- **Text steht in Schaltflächen in der Höhe genau mittig zum Icon** (Zeilenhöhe 20 px wie das Icon).
- **Tabellenüberschriften** 17 px halbfett (600), gleich groß wie der Text der Zellen (Apple-Textstil „Headline“).

## 4. Schaltflächen

**Apple:** [HIG – Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)

- **Alle Schaltflächen 44 px hoch** (auch lange Texte, Vorschläge, Auswahl-Chips; Ausnahmen: mehrzeilige Listeneinträge und
  Textkästen; iPhone quer niedrige Leisten R-2.4). **Reine Icon-, Wetter- und Smiley-Schaltflächen quadratisch 44 × 44 px**;
  Emoji 24 px, Icon 20 px (R-3.1).
- **Alle Schaltflächen und Suchfelder schweben** (15.1, R-3.2): Fläche `--btn`, Lichtkante `--btn-rim` (0,5 px), Schatten
  `--float`, Kapselform; Icon-Schaltflächen rund. Text-Schaltflächen: Icon links, dann Text (Abstand 6 px). Mehrere
  Schaltflächen nebeneinander stehen in einer **Kapsel** (15.5).
- **Farben – jede Farbe hat genau eine Bedeutung** (R-3.3):
  - **Blau gefüllt = Hauptaktion** – nur **in Fenstern**, höchstens eine je Fenster (z. B. Häkchen nach einer Änderung, Teilen
    in der Vorschau, Backup erstellen in der Erinnerung): `--accent`, weiße Schrift, Lichtkante, Schatten `--glow-accent`.
    Menüs und die Kapsel der Kopfzeile werden nicht eingefärbt.
  - **Blau getönt mit Haarlinie = eingeschaltet** (Umschalt-Schaltflächen wie Wetter, Reisemittel): Fläche `--sel-bg`,
    Haarlinie (0,5 px) `--accent`, Schrift normal, Schatten `--glow-accent` (`aria-pressed="true"`). Die Breite ändert sich
    beim Einschalten nicht.
  - **Blau getönt = gedrückt** (Klasse `.on`): Die Schaltfläche, von der ein offenes Menü, eine Sprechblase oder ein Fenster
    kommt, ist so lange `--sel-bg` mit Haarlinie `--accent`, wie es offen ist – auch über Folgeschritte (Teilen-Menü,
    Dateiauswahl, Meldung danach), bis alles abgeschlossen ist. **Grundsatz: Gewähltes bleibt eingefärbt, solange es sichtbar
    ist** – auch Listenzeilen (Eintrag der Seitenleiste, z. B. über das Kontextmenü → Einstellungen), Tabellenzeilen (Tag; beim
    Blättern wandert die Markierung mit) und Kästen (Fazit). Technisch `setOpener(selector)`.
    [HIG – Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
  - **Apple-Grün** nur für eingeschaltete **Schalter**.
  - **Rot gefüllt = Löschen/Verwerfen** (endgültige Aktionen, z. B. in Sprechblasen): `--danger-fill`, weiße Schrift, Schatten
    `--glow-danger`. In Menüs steht „… löschen“ als roter Text mit rotem Icon.
  - Alle übrigen Schaltflächen neutral (schwebend).
- „Abbrechen“ (in Sprechblasen): neutral, ohne Icon, normale Schrift.
- Gesperrte Schaltflächen: ausgegraut (Deckkraft 40 %).
- Keine Hover-Farbe auf dem iPad – Hover nur in `@media (hover: hover)` (sie bliebe nach dem Antippen hängen).
- **Nach oben / Ans Ende** unten rechts: zusammen in einer **senkrechten Kapsel** (`.fab`), auch im iPhone-Aufbau in der
  Inhaltsansicht (nicht in der Startliste); sie zeigt nur die Pfeile, die etwas bewirken, und ist ausgeblendet, wenn es nichts zu
  rollen gibt (R-3.2) – bewusste Abweichung von Apple (16). Bei langem Inhalt kommt der **Schnellroll-Griff** dazu (15.1).

## 5. Icons

**Apple:** [HIG – Icons](https://developer.apple.com/design/human-interface-guidelines/icons) · [HIG – SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols) (im Web nicht erlaubt, daher Lucide)

- Schaltflächen-Icons aus **Lucide** (Liniengrafiken, Strichstärke 2, `currentColor`), als SVG eingebettet (offline).
  SF Symbols dürfen im Web nicht verwendet werden.
- **Inhalte bleiben Emojis** (z. B. Smileys, Wetter, Spaltenköpfe).
- In Menüs stehen die Icons **vor** dem Text (R-4.1). Zuordnung (gleiche Bezeichnung = gleiches Icon: R-10.1):

| Aktion | Lucide-Icon | Darstellung |
|---|---|---|
| Fertig (Fenster) | `check` | rund, nur Icon; grau, nach einer Änderung weiß auf Blau |
| Abbrechen / Schließen (Fenster) | `x` | rund, nur Icon, links oben |
| Seitenleiste aus-/einblenden | `panel-left` | rund, nur Icon |
| Mehr-Menü | `ellipsis` | nur Icon, in einer Kapsel |
| Einstellungen | `settings` | im Mehr-Menü |
| Neu anlegen | `plus` | nur Icon, in einer Kapsel |
| Teilen / Ausgabe | `share` | **immer nur Icon, nie mit Text** |
| Suchen | `search` | in der Kapsel und im Suchfeld |
| Voriger / nächster Treffer | `chevron-up` / `chevron-down` | nur Icon, als Kapsel |
| Zurück / Weiter (Blättern) | `chevron-left` / `chevron-right` | nur Icon, als Kapsel |
| Löschen / Entfernen / Verwerfen | `trash` | weiß auf Rot (Sprechblase), rot (Menü) |
| Weiter bearbeiten | `pencil` | Icon + Text |
| Backup erstellen / laden | `save` / `folder-open` | Icon + Text |
| Vorschau | `eye` | Icon + Text |
| HTML / PDF | `file-code` / `file-text` | Icon + Text |
| Info / Hinweis ein-/ausblenden | `info` | nur Icon |
| Darstellung | `sun-moon` | im Mehr-Menü, Untermenü Automatisch · Hell · Dunkel |
| Nach oben / Ans Ende | `arrow-up-to-line` / `arrow-down-to-line` | nur Icon |
| Zurücksetzen | `rotate-ccw` | nur Icon, gedämpft |
| Messung starten / beenden | `activity` / `circle-stop` | im Mehr-Menü der Seitenleiste (15.21) |
| Offline / wieder online | `wifi-off` / `wifi` | Zeile und Meldung (15.20) |

## 6. Begriffe

- Fenster haben **keine Fußleiste**: links oben ein rundes x (schließen), rechts oben ein rundes Häkchen (übernehmen und
  schließen; ohne Änderung schließt es einfach). Wurde etwas geändert, fragt x mit einer Sprechblase „Änderungen verwerfen“ /
  „Weiter bearbeiten“ (die Eingaben bleiben dann erhalten) – so macht es auch Apple (z. B. Kontakte). R-4.4, 15.8.
- Bestätigungen immer mit dem Verb der Aktion: „Löschen“, „Entfernen“, „Zurücksetzen“, „Ersetzen“, „Änderungen verwerfen“
  (R-4.3).
- Menüpunkt und Fenster heißen gleich (z. B. „Einstellungen“).
- Systembeschriftungen (z. B. „Reset“ der iPad-Datumsauswahl) bleiben.
- **Anführungszeichen:** In den Texten der Apps immer **einfache** Anführungszeichen ‚…‘ (z. B. ‚In Dateien sichern‘, Spalte
  ‚Wie war was?‘), **keine doppelten** „…“ (R-10.1).

## 7. Fenster (Dialoge)

**Apple:** [HIG – Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets) · [HIG – Modality](https://developer.apple.com/design/human-interface-guidelines/modality)

- Aufbau: Kopfzeile (15.8) · Inhalt (rollbar).
- Breite passt sich dem Inhalt an: höchstens 90 % der Bildschirmbreite, Mindestbreite 480 px. Erfassungs- und
  Vorschaufenster fast bildschirmbreit (bis 1100 px); auf dem iPhone ein **Blatt** von unten (R-4.6, 15.17).
- Hintergrund `--dlg-bg`, Kästen darin `--dlg-card`, Radius 18 px, Schatten, abgedunkelter Hintergrund dahinter.
- Escape wirkt wie das x.
- **iPhone: Blatt** (R-4.6, wie ‚Neuer Termin‘): gleitet von unten bis knapp unter die Statusleiste, die Seite dahinter weicht
  verkleinert und abgedunkelt zurück (quer volle Höhe, die Seite bleibt); nach unten ziehen schließt wie das x – mit Änderungen
  federt es zurück und fragt; Antippen der Abdunkelung wie x. Am iPad bleibt das Fenster in der Mitte und schließt nur mit x,
  Häkchen oder Escape.
- Solange ein Fenster offen ist, steht die Liste dahinter still (R-7.3, Technik 15.9).
- **Bei sichtbarer Tastatur** passt sich jedes Fenster dem sichtbaren Bereich über der Tastatur an: die Kopfzeile bleibt immer
  sichtbar, nur der Inhalt rollt, und das Feld mit Fokus steht ganz über der Tastatur, ohne Springen (R-4.5; ebenso für Kopf- und
  Suchzeile und Felder der Hauptansicht). Das iPad-Fenster gleitet mit der Tastatur (0,25 s) in die Mitte darüber und zurück; ist
  es ganz sichtbar, bleibt es stehen. Technik und Safari-Eigenheiten: 13.
- Gibt es noch keinen Eintrag, öffnet sich „Neues …“ einmal von selbst; mit x bleibt die leere Seite mit grauem Hinweis „Noch
  kein … angelegt.“.
- **Erfassungsfenster** (Einträge erfassen): fast bildschirmbreit; Kopfzeile x · Titel mit Zusatzzeile „Automatisch gespeichert
  um hh:mm“ · Kapsel [chevron-left | chevron-right] zum Blättern · Häkchen; automatisches Speichern (8).
- **Vorschaufenster** (R-6.4): fast bildschirmbreit, Inhalt immer hell und genau wie die ausgegebene Datei, in voller
  Seitenbreite – ist das Fenster schmaler (iPad hoch, iPhone), wischt man seitlich; kein Inhalt ragt aus der Tabelle (R-6.3);
  Kopfzeile x · „Vorschau“ mit Dateiname als Zusatzzeile · Kapsel [PDF | share blau gefüllt]; nach Teilen bzw. PDF folgt das
  Ergebnisfenster mit ggf. Backup-Erinnerung.
- **Meldung** (ohne Entscheidung, z. B. Fehler): kleines Fenster, x links oben, Titel, Text zentriert; höchstens eine
  Schaltfläche zu den Einzelheiten (10).
- Technisch: ein Dialog, dessen Inhalt ausgetauscht wird (nicht schließen und neu öffnen); ein zweiter Dialog nur für Meldungen.

## 8. Eingaben, Pflichtfelder und Fehlermeldungen

**Apple:** [HIG – Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields) · [HIG – Pickers](https://developer.apple.com/design/human-interface-guidelines/pickers)

- Eingaben in nummerierten Schritten (blaue runde Nummer 26 px), jeder Schritt als Kasten ohne Rand (15.10); Nummern laufen
  fortlaufend über die sichtbaren Schritte.
- Options-Kapseln eines Schritts rechts in dessen Kopfzeile; zusammengehörige Einstellungen in einem gemeinsamen Kasten mit
  Überschrift (z. B. „Konfiguration …“).
- Eingabefelder schlicht; Formatierung erst in Anzeige und Ausgabe. **Textfelder wachsen mit dem Inhalt** – man muss nie
  innerhalb eines Feldes rollen (R-5.2).
- **Pflichtfelder werden nicht gekennzeichnet** (kein Sternchen, kein „erforderlich“, auch kein „optional“). **Fehlermeldungen in
  Rot direkt unter dem betroffenen Feld**, das Feld bekommt einen roten Rahmen. Beim Öffnen eines Fensters erscheint keine
  Meldung, erst nach einer Eingabe: Textfeld leer verlassen oder geleert, Datum geändert, letzte Auswahl abgewählt. Das Häkchen
  ist grau, bis etwas geändert wurde, dann blau; **ein Tippen auf das Häkchen zeigt alle fehlenden Angaben** und rollt zur
  ersten (R-5.3).
- **Eingabetaste** (R-5.5): in einzeiligen Feldern heißt sie ‚Fertig‘ (`enterkeyhint="done"`), auch in Fenstern mit mehreren
  Feldern (kein ‚Weiter‘) – das Fenster bleibt offen, gespeichert wird erst mit dem Häkchen. Das Suchfeld behält ‚Suchen‘ (nächster
  Treffer). In mehrzeiligen Feldern macht sie einen Zeilenumbruch; die Tastatur schließt mit Häkchen bzw. x des Fensters oder
  durch Tippen daneben (HIG). Ziffernfelder auf dem iPhone haben keine Eingabetaste – dort schließt ‚Fertig‘ bzw. ✓ in der
  Leiste über der Tastatur. Gebaut in `ui.js` für alle Felder; die App setzt nichts selbst.
- **Datumsfelder sind so breit wie das Datum** und haben rechts ein eigenes Kalender-Icon (Lucide `calendar`, auf allen Geräten
  gleich, kurzer Abstand zum Datum); zwei zusammengehörige Daten mit grauer Beschriftung „Von“ · „Bis“ in einer Zeile (R-5.1).
- **Bezeichnung und Feld gehören zusammen** (`.pair`, R-5.1): reicht der Platz nicht, bricht die Zeile **vor** der Bezeichnung
  um (z. B. auf dem iPhone ‚Bis‘ mit Datum unter ‚Von‘), nie zwischen Bezeichnung und Feld.
- **Großbuchstabe am Zeilenanfang** (R-5.2): Die App setzt den ersten Buchstaben jeder Zeile und nach ‚.‘, ‚!‘, ‚?‘ selbst groß –
  auch nach einem Smiley am Zeilenanfang (iOS macht das nicht zuverlässig); schon vor der Eingabe (`beforeinput`). Nach einem
  Vorschlag (z. B. ‚Freetour …‘) beginnt auch das nächste Wort groß (`capNext`). Ersetzt oder löscht der Nutzer einen Großbuchstaben
  von Hand (markieren und überschreiben, Rücktaste), erzwingt die App an dieser Stelle keine Großschreibung mehr – die Tastatur
  entscheidet, wie iOS nach einer Korrektur (seit 4.31.0, A-65).
- **Keine doppelten Leerzeichen** (R-5.2, seit 4.31.0, A-64): in allen Textfeldern (ein- und mehrzeilig, auch im Suchfeld) wird ein
  Leerzeichen direkt neben einem Leerzeichen nicht eingefügt; beim Einfügen werden mehrere Leerzeichen oder Tabs zu einem,
  Zeilenumbrüche bleiben; ein einzelnes Leerzeichen am Zeilenanfang bleibt. Der iOS-Kurzbefehl ‚.‘ (zweimal Leertaste) wirkt
  weiter.
- **Beträge** wie bei Apple (Region Deutschland, R-5.1): immer zwei Nachkommastellen, Tausenderpunkt schon beim Tippen, Währung
  **hinter** dem Betrag mit Leerzeichen – „4.850,00 €“. Im Eingabefeld steht das € rechts neben dem Feld; fehlen beim Verlassen
  die Nachkommastellen, ergänzt die App „,00“. **Zahlen- und Betragsfelder sind rechtsbündig** und dynamisch breit: mindestens so
  breit, dass „100.000,00“ vollständig passt; längere Beträge lassen das Feld beim Tippen mitwachsen.
- **Smiley-Leisten** (Schnellauswahl über einem Textfeld, Bau 15.12): nur einzeilig, mit dem Finger nach links/rechts wischen,
  Verlauf am Rand als Hinweis auf weitere Smileys, Zurücksetzen (rotate-ccw) fest rechts daneben. Sortiert nach Häufigkeit
  (meistbenutzte vorne), nie benutzte in Standardreihenfolge dahinter. Langes Drücken auf derselben Stelle entfernt einen Smiley
  (Sprechblase „Entfernen“, rot; Ziehen der Leiste nicht, R-3.5); wird er wieder verwendet, kommt er zurück. Zurücksetzen stellt die Standard-Smileys her und setzt die
  Zähler auf null (Sprechblase „Zurücksetzen“, rot). Ein angetippter Smiley wird angehängt, wenn der Cursor in einer leeren Zeile
  oder hinter Smileys steht, sonst beginnt eine neue Zeile.
- **Diktieren** nur über die Mikrofon-Taste der Tastatur (Hinweis im Fenster); keine eigene mic-Schaltfläche – iOS liefert
  Web-Apps vom Home-Bildschirm keine Spracherkennung (R-5.2).
- **Automatisches Speichern** alle 10 Sekunden in Erfassungsfenstern; „Änderungen verwerfen“ (über x) stellt den Zustand beim
  Öffnen wieder her.

## 9. Tabellen (App, HTML und PDF)

**Apple:** [HIG – Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)

- Kopfzeile grau (`--th-bg`) mit Rändern `--th-line`; die Tabelle selbst ohne äußeren Rand, mit Schatten `--table-shadow`,
  damit die seitlichen Grenzen gut zu sehen sind.
- **Zebra je Tabellenzeile** (gezählt werden nur sichtbare Zeilen), Trennlinien zwischen allen Spalten, gelbe Markierung ohne
  blauen Rand; eine markierte Zeile bleibt gelb (R-6.1).
- Tabellenkopf bleibt beim Rollen direkt unter der Kopfzeile stehen; Schrift 17 px halbfett wie die Zellen.
- **Kein Text ragt hinaus** (R-6.3): zwischen ganzen Wörtern umbrechen (die Spalte wird so breit wie das längste Wort); ein Wort
  über 20 Zeichen bricht im Wort um (`breakable()` in `ui.js`, `overflow-wrap` in `design.css`). Höchstens drei Smileys am
  Zeilenanfang werden zum Zeichen (hängender Einzug), eine längere Reihe ist Inhalt; zusammengesetzte Smileys (z. B. 🤷🏻‍♂️)
  bleiben ganz.
- Spaltenbreiten passen sich dem Inhalt an; kompakte Tabellen nur so breit wie nötig; Zahlenspalten rechtsbündig (Überschrift und
  Werte).
- Links ohne Unterstreichung.
- Statistiken bleiben schlichte Listen.

## 10. Ausgabe, Teilen und Meldungen

- Ausgabe-Inhalt unter einer eigenen CSS-Klasse, damit er nicht in die App durchschlägt; Ausgabe und Vorschau immer hell,
  Vorschau in voller Breite und seitlich wischbar, Kapsel [PDF · Teilen] (R-6.4, Fenster 7).
- Vorschau vor dem Sichern im App-Fenster; sie erhöht keinen Zähler.
- Speichern immer über das Teilen-Menü („In Dateien sichern“); PDF über das Drucken-Menü. Die App meldet ehrlich, dass das Menü
  geöffnet bzw. abgebrochen wurde.
- **Ausgabe-Design** (HTML und PDF) = **Mustertabelle der Ausgabe** (R-6.2), ein Baustein `outputCss(scope)` in ui.js für jede
  Ausgabe, Vorschau und jeden Bericht (z. B. HTML-Ausgabe des Reiselogbuchs, Abgleichbericht), keine eigenen Nachbildungen:
  Systemschrift 11 pt, h1 20 pt, h2 14 pt, schwarzer Text auf Weiß, Links `#1a5fb4` ohne Unterstreichung, Tabellen wie in der App
  (Kopf `#d9d9d9`, Ränder `#a5a5a5`, Zebra `#f5f5f5`), Zeilen nicht über Seitenumbrüche teilen. Dezente letzte Zeile (9 pt,
  `#6b6b6b`, Kontrast 4,5 : 1): „Ausgabe V003 erstellt am TT.MM.JJJJ um hh:mm“. PDF im Hochformat, weißer Seitenhintergrund,
  Dateiname als Seitentitel; das PDF druckt die ganze Ausgabe (R-6.4).
- **Dateinamen-Muster**:
  - Ausgabe: „<App> <Titel> JJJJ.MM.TT-JJJJ.MM.TT V001“ – fortlaufender Zähler je Eintrag (gemeinsam für HTML und PDF, im Backup
    enthalten), nie zwei Leerzeichen hintereinander.
  - Backup: „Ω Backup <App> JJJJ.MM.TT hh.mm.json“ (ohne Zähler).
  - Abgleichbericht: „Abgleichbericht <App> JJJJ.MM.TT hh.mm.html“.
- Datumsformat in Texten TT.MM.JJJJ, in Dateinamen JJJJ.MM.TT, Uhrzeit hh:mm (im Dateinamen hh.mm).
- Sicherheitsabfrage (Sprechblase) vor jeder Lösch-, Ersetz- oder Rücksetz-Aktion.
- **Meldung mit Weiterweg:** ein kleines Fenster darf unter dem Text **eine** blaue Schaltfläche haben, die zu den Einzelheiten
  führt (`inform(titel, text, { action: { label, icon, run } })`, z. B. ‚Abgleichbericht anzeigen‘); sie schließt das Fenster und
  öffnet die Einzelheiten. Ohne Einzelheiten keine Schaltfläche (R-4.3).
- **Backup einmal am Tag:** Backup-Kachel (nur, solange heute keines erstellt wurde) und ‚Backup erstellen‘ (R-9.1, 15.19); nach
  einer Ausgabe erinnert das Ergebnisfenster daran.

## 11. Versionen und Aktualisierung

- **Versionsnummer dreistufig Hauptversion.Nebenversion.Korrektur** (z. B. 1.2.1) – für Apps, AppDesign, Richtlinien und die
  Zusammenarbeit; jede dieser Dateien hat ihre eigene Nummer und am Ende eine Versionsgeschichte:
  - Hauptversion: grundlegende Änderung (Aufbau, Bedienkonzept, Datenstruktur; bei Richtlinien: grundlegend neue Gestaltung).
  - Nebenversion: neue Funktion oder sichtbare Verbesserung (bei Richtlinien: neue Regel).
  - Korrektur: Fehlerbehebung ohne neue Funktion (bei Richtlinien: Präzisierung).
  - Steigt eine Stufe, beginnen die folgenden wieder bei 0.
- Jede App hat eine `CHANGELOG.md` (Version, Datum, Art, Inhalt, Prüfliste – Zusammenarbeit 2.3).
- Versionsnummer, Erstellungszeitpunkt und Cache-Name des Service Workers steigen mit jeder Version (das
  Veröffentlichungs-Skript setzt sie, Zusammenarbeit 0 Nr. 9).
- **Service Worker** ‚network first‘ mit `cache: 'no-cache'`: beim Start wird immer bei GitHub nachgefragt, neue Versionen sind
  nach einem Neustart sofort da. Das Netz wird höchstens 3 s abgewartet, dann kommt die App aus dem Speicher (sonst bliebe die
  Seite bei schlechtem oder abgeschaltetem Netz weiß); die feste Fassung (unveränderlich) zuerst aus dem Speicher; ohne Netz unter
  anderer Adresse geöffnet → die gespeicherte App; beim Einrichten alle Dateien frisch holen. Der Service Worker meldet der Seite,
  ob die App offline arbeitet (`{ netz: 'aus' | 'an' }`, 15.20). Regel R-1.5.
- **Versionskopplung App ↔ AppDesign** (R-10.3): `ui.js` und `design.css` kommen aus der festen Fassung der App,
  `../AppDesign/fassung/X.Y.Z/` – in `index.html` und in der Dateiliste von `sw.js`, ohne Versionsanhang (der Pfad enthält die
  Version; kein alter Zwischenspeicher). Eine neue AppDesign-Version ändert die App nicht. `ui.js` nennt ihre Version in
  `AD_VERSION`, `design.css` in `--ad-version`; die App nennt die benötigte in `AD_NEEDED` und zeigt beim Start ein kleines Fenster
  ‚Neue Version wird geladen‘ (⚠️ benötigt/geladen, ‚App ganz schließen und nach ein paar Minuten neu öffnen‘), wenn eine andere
  Fassung geladen ist (z. B. GitHub Pages noch nicht fertig). Die Versionszeile im Mehr-Menü nennt auch ‚AppDesign X.Y.Z‘.
- **Verwendete Versionen** (R-10.4): ganz oben in der README jeder App eine Tabelle mit App, AppDesign, Designrichtlinie
  allgemein, Designrichtlinie <App> und Zusammenarbeit allgemein – je Version und Link (GitHub, Richtlinien und Bausteine aus dem
  Ordner der Fassung). Dieselben Versionen nennen die Versionszeile in `PROMPT.md` und der CHANGELOG-Eintrag. So ist auf GitHub
  auf einen Blick zu sehen, welche Fassung der allgemeinen Regeln die App verwendet.
- Nach Updates die App einmal ganz schließen und neu öffnen.

## 12. Designrichtlinien pflegen

- Diese Datei und die App-Richtlinien werden **bei jeder Design-Änderung** aktualisiert, gemeinsam mit der Version
  (Abschnitt 11).
- **Allgemein oder App?** Bei jeder Design-Änderung fragt Claude, ob sie eine allgemeine Regel wird (Zusammenarbeit 0 Nr. 4);
  allgemeine Regeln stehen im Regelkatalog (17).
- **App-Richtlinie** (`README - Designrichtlinie <App>.md`): verweist eingangs auf diese Datei und enthält **nur Abweichungen**
  – was die App bewusst anders macht als hier, jeweils mit Grund und Datum der Entscheidung – sowie die Feldnamen ihres
  Abgleichberichts (R-10.1). Alles andere App-Eigene (Begriffe, Texte, Menüs, Leertexte, Ausgestaltung der Komponenten) steht
  in der Funktionsbeschreibung `PROMPT.md` der App; dort werden allgemeine Regeln nur genannt (R-…), nie wiederholt.
- Wiederkehrende Elemente werden als **Komponente** (15) definiert; Apps und App-Dateien nennen nur den Namen der Komponente.

## 13. Safari und iPad – technische Erfahrungen

Gemessene bzw. belegte Eigenheiten mit Quelle; sie gelten für alle Apps, die Prüfungen bilden sie nach (Safari-Modell
`tests/safari.mjs`, Zusammenarbeit 0 Nr. 5 und 20).

- Sichere Ränder (Dynamic Island, Ecken, Home-Leiste) mit `viewport-fit=cover`; `env(safe-area-inset-*)` steht nur in den
  Variablen `--safe-top/-bottom/-left/-right` (design.css), alles andere nutzt sie (R-1.7). Die Prüfbrowser liefern für `env()`
  immer 0 – die Prüfung setzt die Variablen auf Gerätewerte. Vom Home-Bildschirm (Statusleiste ‚default‘) liegt die Statusleiste
  über der App: Fensterhöhe am iPhone 16 Pro hoch 812 statt 874, am iPad Pro 11" quer 802 statt 834 (Messungen 19./20.10.2026).
- Rollt ein Bereich seitlich, zählt Safari (WebKit) seinen rechten Innenabstand nicht zur Rollbreite (Chromium schon): breiter
  Inhalt endet am Rand, ein Rand rechts muss am Inhalt selbst stehen (gemessen in WebKit 22.10.2026, Abgleichbericht am iPhone
  quer, R-1.7).
- Eingebauter Schalter `<input type="checkbox" switch>` seit Safari 17.4, Haptik seit Safari 18; mit `appearance: none` zeichnet
  Safari ihn nicht mehr selbst. Die Prüfbrowser (Chromium, WebKit der Prüfumgebung) kennen ihn nicht und zeigen ein
  Kontrollkästchen (R-5.7).
- Speichern über `navigator.share` mit Dateien; Download-Links funktionieren in der Home-Bildschirm-App nicht zuverlässig.
- Long-Press-Menü und Textauswahl auf Emoji-Schaltflächen abschalten (`-webkit-touch-callout: none`, `user-select: none`).
- Beim Drucken nur den Ausgabe-Inhalt zeigen: Seitenleiste, Fenster und deren Abstände (z. B. `padding-left` für die
  Seitenleiste) ausblenden bzw. auf 0 setzen; im Druck ist nichts auf Bildschirmhöhe begrenzt (15.22).
- Elemente mit `display` im CSS brauchen eine eigene `[hidden]`-Regel, sonst bleiben sie sichtbar.
- Emojis mit und ohne Variantenzeichen (z. B. ☹️/☹) als gleich behandeln.
- **Kein Scroll-Anker:** ändern sich beim Drehen die Höhen, springt die Seite. ui.js merkt sich beim Rollen den obersten
  sichtbaren Eintrag unter der Leiste (`data-day` bzw. `data-keep`) und den sichtbaren Anteil und rückt ihn nach dem Drehen und
  nach jeder Änderung der Anordnung durch die App (z. B. Seitenleiste ein/aus: `keepPlace(() => { …; render(); })`) wieder an
  dieselbe Stelle. Steht oben kein Eintrag (Ende der Seite: Fazit, Statistik), bleibt der Abstand zum Ende gleich; ganz oben
  bleibt ganz oben, ganz unten bleibt ganz unten. Tests bilden das nach (`overflow-anchor: none`), sonst verdeckt Chrome den
  Fehler (R-8.1).
- **Position beim Öffnen:** `openAt(element | null)` in ui.js (R-7.4) – ein ‚nächster offener‘ bzw. aktueller Eintrag steht unter
  der Leiste und einem haftenden Tabellenkopf; ist die Seite nicht so weit rollbar, ganz unten. Ob er hervorgehoben ist, legt die App
  mit ihrer Klasse fest (nur Offenes).
- **Zwei Bereiche – nur der Inhalt rollt:** Safari am iPhone unterscheidet den **Layout-Bereich** (an ihm hängen feste Leisten,
  Höhe `innerHeight`) und den **sichtbaren Bereich** (`visualViewport`). Die Tastatur verkleinert nur den sichtbaren Bereich
  (gemessen hoch 409 statt 812 px, quer 126 statt 402 px); `innerHeight` bleibt (quer schrumpft es je Fokus um 19 px). Rollt das
  **Fenster** bei offener Tastatur, bewegt sich zuerst nur der sichtbare Bereich (`offsetTop` = Abstand der beiden), der
  Layout-Bereich folgt erst am Rand; Safari meldet die neue Lage **2 Bilder (33 ms) später** – jeder Ausgleich über `--vv-top`
  kommt zu spät, feste Leisten zittern. Beim neuen Fokus (z. B. nach ⓧ) rollt Safari hoch um 120 px bzw. schiebt quer um 21 px.
  Ursache ist jedes Rollen des Fensters bei offener Tastatur. Deshalb rollt die Seite nie, nur der Inhalt (R-2.1, 15.22): dann hat
  Safari beim Tippen nichts zu verschieben (Versuch M-1 am iPhone: 0 px hoch und quer); Felder mit Fokus werden nie ersetzt
  (`setHtml`). Unter iOS 26 setzt sich `offsetTop` nach dem Schließen der Tastatur teils nicht auf 0 zurück – der Rahmen folgt
  deshalb `--vv-top` (`visualViewport.offsetTop`) und ist so hoch wie der sichtbare Bereich (`--vv-h`). Antippen der Statusleiste
  rollt einen eigenen Rollbereich nicht nach oben (iOS); dafür gibt es ‚Nach oben‘. Quellen: Messung P-57
  (`arbeit/A-27 Auswertung P-57.md`), developer.apple.com/forums/thread/824765, bugs.webkit.org/show_bug.cgi?id=300523.
- **Feld unter der Tastatur antippen:** Liegt ein Feld im Rollbereich dort, wo die Tastatur aufgeht, verschiebt Safari den
  **sichtbaren Bereich** um den ganzen Raum (gemessen iPhone quer, Gesamtausgaben: `offsetTop` 232 = 402 − 170) und rollt den
  Inhalt nicht; die Zifferntastatur (`inputmode="decimal"`) lässt quer 170 statt 126 px sichtbar. Felder in Fenstern verhalten
  sich gleich. Quelle: `tests/messungen/2026-10-19 iPhone quer Suche Fenster Gesamtausgaben.txt` (Zeilen 404–408).
- **Tastatur ohne Springen (R-4.5)** – gemessen mit dem Muster A-36 (9 Fassungen, `arbeit/A-36 Fall-Liste.md` 6 bis 6n, Messungen
  `arbeit/A-36 Messungen/`):
  - **S-1** Verschoben wird jedes Feld mit Fokus unter der künftigen Tastatur (Inhalt und Fenster), bis es in der Mitte steht,
    höchstens um den ganzen Raum. **S-2** Tastatur iPad quer 428 px, hoch 340 px; iPhone hoch 403 (Ziffern 376), quer 276
    (Ziffern 232). **S-3** Dabei rollt Safari die Seite selbst: `scrollY` = Verschiebung, `innerHeight` = Höhe − `scrollY` – die
    Höhe ohne Tastatur ist `innerHeight + scrollY` (sonst gilt ein iPad mit Tastatur als iPhone).
  - **S-5/S-6** Beim ersten Öffnen verschiebt Safari nur, wenn das Feld weniger als 24 px (im Fenster 15 px) über der Tastatur
    endet; beim Wechsel bei offener Tastatur, außerhalb eines Rollbereichs (Suche) und beim erneuten Antippen nach der
    Tastatur-Taste (iPad) schon, wenn seine Mitte unter der Mitte des sichtbaren Bereichs liegt.
  - **S-7** Safari liest die Lage **beim Fokus**, bevor die App etwas tun kann – Rollen im `focusin` allein hilft nicht.
  - **S-8** Ein **neuer Fokus** (`blur()` + `focus({ preventScroll: true })` noch im `focusin`, also in der Berührung) lässt
    Safari die Lage neu lesen; die Tastatur öffnet beim ersten Mal und klappt nicht zu und auf (am Gerät 10 von 10, iPhone hoch
    und iPad quer).
  - **S-9** Ein Feld im **Inhalt**: beim Erscheinen der Tastatur stellt Safari den Rollbereich auf den Stand vor dem Rollen der
    App zurück (iPhone +456, iPad +477 px); im Fenster nie.
  - Abfangen der Berührung (`preventDefault`, eigener Fokus) verlor am Gerät oft nach 34–37 ms den Fokus – **Berührungen nie
    abfangen**.
  - **Lösung in ui.js:** die Berührung bleibt bei Safari; im `focusin` rollt der Bereich das Feld in die obere Hälfte (Mitte ≤
    Mitte des künftig sichtbaren Bereichs − 24 px, nie näher am Rand als Fokus-Umrandung und Schatten) und gibt ihm bei geschlossener Tastatur einen neuen Fokus
    (S-8) – dessen Ereignisse sieht die App nicht. Den Klick, den Safari danach an derselben Stelle auslöst, unterdrückt ui.js.
    Springt der Inhalt zurück (S-9), rollt ui.js ihn im scroll-Ereignis sofort wieder hin (Rückstellung, ≤ 1,5 s, Wischen beendet
    sie). Platz unter dem Inhalt (`--platz`, Platzhalter `::after`) schrumpft nach dem Schließen der Tastatur beim Rollen wieder.
    Die Tastatur-Taste (iPad) schließt die Tastatur – das Feld gibt den Fokus ab. ‚Nach oben / Ans Ende‘ bei offener Tastatur
    rollt erst nach dem Schließen. Die Tastaturhöhe vor dem ersten Öffnen ist geschätzt und wird je Gerät, Lage und Tastaturart
    gemerkt (`localStorage` `appdesign.tastatur`). Liegt das Feld nicht in der oberen Hälfte, rollt es höchstens so weit, dass es
    16 px über der Tastatur steht – reicht der Platz nicht, oben unter Kopf- bzw. Suchzeile (`feldZeigen`), mit so viel Abstand, wie
    Fokus-Umrandung und Schatten des Felds über seine Oberkante reichen (`fokusRand`, aus dem berechneten Stil; Reiselogbuch:
    Schatten 25 px, Safaris Umrandung 5 px) – der Rollbereich schneidet sonst beides oben ab (seit 4.32.2, A-73, P-69/3 iPhone quer).
  - **Grenzen:** iPhone quer mit offener Suchzeile bleibt für ein Feld im Inhalt zu wenig Platz (59 px) – dort verschiebt Safari
    weiter etwas; ein Feld, das höher ist als der sichtbare Teil (z. B. ‚Programm‘ im Fenster iPhone quer), ist nicht gemessen.
- **Wischgesten** (R-7.5): Sauber nur in der Home-Bildschirm-App – in Safari selbst gehört das Wischen vom linken Rand Safari
  (eine Seite zurück im Verlauf). Damit waagrechtes Wischen bei der App ankommt, braucht der Bereich `touch-action: pan-y` (sonst
  übernimmt Safari die Berührung mit `pointercancel`); Bereiche mit eigenem waagrechtem Rollen sind selbst Rollbereiche und behalten
  ihr Wischen. Ein Antippen nach einer Bewegung über 10 px unterdrückt ui.js (Maus und Zeichenstift lösen es sonst aus).
  **Langes Drücken in einem waagrechten Rollbereich** (R-3.5): zieht der Finger die Smiley-Leiste seitlich, meldet Safari der Seite
  kein `pointercancel` – ein Zeitgeber für langes Drücken lief weiter und fragte nach 0,6 s (Fehler am Gerät, 24.10.2026, A-76).
  `onLongPress` bricht deshalb selbst ab: bei mehr als 10 px Weg (`pointermove`) und beim `scroll` einer Fläche, die die Schaltfläche
  enthält (Hörer in der Einfangphase, nur solange der Zeitgeber läuft).
  **Später Abbruch:** auch mit `pan-y` beginnt Safari zu rollen, sobald der Finger seit dem Aufsetzen 10 px senkrecht abweicht –
  mitten in einer waagrechten Geste – und nimmt der Seite den Finger (`pointercancel`, Lage 0 0); `preventDefault` auf
  `pointermove` hält Safari nicht auf, nur auf `touchmove` (solange es `cancelable` ist). ui.js verhindert `touchmove`, sobald die
  Geste entschieden ist (nicht passiver Hörer); vorher nie, damit senkrecht weiter der Browser rollt. Nachgebildet in `safari.mjs`
  (S-10, `safariWischen`). Quelle: Messung P-65 (iOS 26.6.2, Home-Bildschirm): 22 von 25 Zügen bei 10–21 px senkrecht abgebrochen.
  Quelle: [Apple-Forum – iOS 26 swipe to navigate back](https://developer.apple.com/forums/thread/791605), Muster A-61 am Gerät.
  **Blatt ziehen** (R-4.6, seit 4.32.0): dieselbe Technik senkrecht – ui.js verhindert `touchmove` erst, wenn der Zug nach unten
  entschieden ist (am Kopf, im Inhalt ganz oben oder bei offener Tastatur auf einem Feld – seit 4.32.1, A-71); im gerollten Inhalt
  rollt Safari weiter. **Rollt Safari den Inhalt, schickt es die Zeigerbewegungen weiter** (kein `pointercancel`; Messung P-69/3,
  iOS 26.6.2): ein Zug, der das Blatt nicht zieht (zuerst nach oben oder waagerecht), bleibt bei offener Tastatur beobachtet – geht
  der Finger danach mindestens 8 px unter seinen höchsten Punkt, deutlich senkrecht, schließt die Tastatur; `touchmove` bleibt
  dabei frei (seit 4.32.2, A-73 – am Rand ging der Finger zuerst nach oben, 244 → 76 → 302, entschieden war nach 8 px). Das Blatt ist `<dialog>` mit
  `showModal` (S-9), bewegt wird es mit `translate` statt `transform`, die Seite dahinter mit `translate` und `scale` – so bleiben
  die Lagen der Navigation (`transform`) unberührt. `dlg.close()` bleibt sofort (die App baut gleich danach neu auf); was beim
  Schließen hinausgleitet, ist ein Abbild des Blatts (`.blatt-geist`, ohne ids). Muster A-61 Teil 2 am Gerät (Rückmeldungen
  23.10.2026: Feld bei offener Tastatur, Ziehen auf einem Feld, Erfassen mit Änderung).
- **Weiches Rollen anhalten:** WebKit hält ein laufendes `scrollTo({ behavior: 'smooth' })` bei einem neuen `scrollTo` ohne
  Bewegung nicht an (gemessen im Prüf-WebKit beim Bau von 4.30.0, am Gerät nicht gemessen); es endet, wenn der Rollbereich kurz
  `overflow: hidden` bekommt – `rolle.halt()` (ui.js).
- **Neustart ist nicht erkennbar** (R-7.2): Safari meldet nicht, **warum** eine Seite neu lädt. Als Neustart zählt jedes
  Neuladen: App im App-Umschalter weggewischt, **von iOS im Hintergrund beendet** (Speicher – auch nach kurzer Zeit in einer
  anderen App) oder neue Version geladen. Bleibt die Seite im Speicher, kommen nur `visibilitychange` und `pageshow` (aus dem
  Zwischenspeicher) – dann ändert sich nichts. Was ‚beim Start‘ gilt, gilt also bei jedem Neuladen.

## 14. Design-Repo AppDesign

- **Inhalt:** diese Richtlinie, `README - Zusammenarbeit allgemein.md`, `v4/design.css` (Farben, Schrift, Schaltflächen,
  Suchfeld, Kapsel, Eingabe- und Datumsfelder, Kopfzeile, Seitenleiste, Menü, Sprechblase, schwebende Schaltflächen, Fenster,
  Kasten, Auswahl-Kapsel, Schalter, Options-Kapsel, Rahmen und Rollbereich; iPhone-Ansicht: Seitenkopf, großer Titel, Liste,
  Kasten, untere Leiste), `v4/ui.js` (Icons, Menüs mit Untermenü, Sprechblase, gedrückte Schaltflächen, Meldung, Fenster,
  Darstellung, Auswahl-Kapsel, Tastatur/sichtbarer Bereich, Beträge, Backup und Abgleich, Offline, Messmodus, Rollbereich,
  iPhone-Erkennung `isPhone()`), `apple-referenz/` (Vergleichsbilder), `tests/` (Prüfungen des Regelkatalogs, Messdateien in
  `tests/messungen/` zum Abspielen, 15.21), `vorlage/index.html` (Startpunkt für neue Apps), `werkzeug/` (Veröffentlichen,
  Zeitzeile), `arbeit/` (Muster, Fall-Listen, Auswertungen).
- **Einbindung:** Jede App lädt die Bausteine von GitHub Pages aus **ihrer** Fassung:
  `<link rel="stylesheet" href="../AppDesign/fassung/X.Y.Z/design.css">` im `<head>` vor dem eigenen `<style>`,
  `<script src="../AppDesign/fassung/X.Y.Z/ui.js"></script>` am Ende von `<body>` vor dem Skript der App. Der Service Worker der
  App nimmt beide Dateien in seinen Cache auf (offline). Die Prüfskripte der App binden die Prüfungen derselben Fassung ein
  (`fassung/X.Y.Z/tests/`).
- **Feste Fassung** (R-10.3): Jede AppDesign-Version liegt zusätzlich unveränderlich in `fassung/X.Y.Z/` (`design.css`, `ui.js`,
  `tests/`, der Text dieser Richtlinie und der Zusammenarbeit; Prüfsummen in `fassung/PRUEFSUMMEN`); die README der App verlinkt
  die Richtlinien in ihrer Fassung (eine Git-Markierung ist aus der Cloud nicht möglich). Eine neue AppDesign-Version ändert eine
  App **nicht**; gehoben wird eine App nur nach Rückfrage (Zusammenarbeit 0 Nr. 10). `v4/` ist der Arbeitsstand und zeigt die
  neueste 4er-Fassung; eine Hauptversion (5.0.0) bekommt einen neuen Ordner `v5/`. Veröffentlicht wird mit
  `werkzeug/veroeffentlichen.mjs` (Zusammenarbeit 0 Nr. 9).
- **Schnittstelle von ui.js:** Die App stellt bereit: `<dialog id="dlg">`, `<dialog id="msg">`, `db.settings.appearance`
  (`auto` | `light` | `dark`), `save()`, `render()`; optional `onDialogOpen()` (wird bei jedem `openDialog` aufgerufen).
- **Prüfen:** Jede App hat eigene Prüfskripte, die ihre Ansichten und Fenster durchgehen und mit den Bausteinen aus
  `AppDesign/tests/` messen (AppDesign liegt beim Testen neben dem App-Repo): Fehler mit Sollwerten und Rückgabewert
  (`pruefe.mjs`), nach jedem Schritt die Grundregeln (dieselben Prüfungen wie `hig.mjs`, ohne Drehen), Chromium **und WebKit**;
  `lauf.mjs` startet alle Prüfskripte einer App (`node tests/alle.mjs`). Einzelheiten `tests/README.md`.
- **Geplant:** Startseite g811141a.github.io mit allen Apps.

## 15. Komponenten

Jede Komponente ist hier einmal beschrieben (Zweck · Aufbau · Maße · Aussehen · Zustände · Verhalten · technischer Name ·
Regel). In AppDesign ist jede Komponente einmal programmiert (`v4/design.css`, `v4/ui.js`) und wird von allen Apps übernommen.

### 15.1 Schwebende Schaltfläche
- **Apple:** [HIG – Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- **Zweck:** jede Aktion. **Technisch:** `button` (Hauptaktion `.primary`, Löschen `.danger`, eingeschaltet
  `aria-pressed="true"`, nur Icon `.iconbtn`).
- **Aufbau:** Icon (20 px) links, dann Text; oder nur Icon bzw. Emoji (24 px).
- **Maße:** 44 px hoch, Kapsel (Radius 22 px); Icon-/Emoji-Schaltflächen 44 × 44 rund; Abstand zu Nachbarn 12 px.
- **Aussehen/Zustände:** neutral `--btn` + Lichtkante + `--float`; Hauptaktion, eingeschaltet, gedrückt und Löschen siehe 4;
  gesperrt 40 % Deckkraft. Regeln R-3.1 bis R-3.3.
- **Nach oben / Ans Ende** (`.fab`): senkrechte Kapsel unten rechts (4), rollt den Rollbereich (15.22) und steht bei offener
  Tastatur über ihr; passt sie nicht mit 16 px Abstand oben und unten in den sichtbaren Teil des Rollbereichs (z. B. iPhone quer
  mit offener Tastatur), ist sie ausgeblendet (`updateFab`). **Nur wirksame Pfeile:** ganz oben nur `arrow-down-to-line`, am Ende
  nur `arrow-up-to-line`, dazwischen beide; näher als eine halbe Höhe des Rollbereichs an einem Ende fehlt dessen Pfeil. Die Kapsel
  steht unten fest (ihr unterer Rand bleibt, sie wird nur niedriger); ob sie passt, entscheidet ihre volle Höhe. Solange ein
  Fenster offen ist, ist sie nicht zu sehen. Im iPhone-Aufbau unten 120 px Platz, damit der letzte Inhalt nicht verdeckt wird.
  VoiceOver nennt nur die sichtbaren Pfeile (‚Nach oben‘, ‚Ans Ende‘). Regel R-3.2.
- **Schnellroll-Griff** (`.schnell` mit `.griff` und `.blase`, legt ui.js an) – Vorbild Apple Fotos und Kontakte (Rollbalken
  ziehen): ab **drei Höhen des Rollbereichs** Inhalt erscheint beim Rollen rechts ein schwebender Griff (34 × 48 px,
  `chevrons-up-down`, Antippfläche 44 × 48) und blendet nach **1,5 s** ohne Rollen wieder aus – nur über die Deckkraft, auch bei
  ‚Bewegung reduzieren‘. Ihn halten und ziehen springt verhältnisgleich durch den ganzen Inhalt; ganz oben bzw. unten (auch über
  die Bahn hinaus) = Anfang bzw. Ende; der Inhalt rollt dabei nicht zusätzlich, nichts darunter wird angetippt, ein weiches Rollen
  (‚Ans Ende‘) endet. Die **Bahn** beginnt 8 px unter Kopf- bzw. Suchzeile und endet über der Kapsel in deren voller Höhe (2 × 48 px
  und 8 px Abstand), rechts im sicheren Bereich (`--safe-right`, mindestens 2 px). Beim Ziehen zeigt eine **Blase** links daneben
  (15 px halbfett, schwebend wie eine Schaltfläche, nie abgeschnitten) die **Marke** des Abschnitts oben im Bild: die App setzt
  `data-marke` an Tage bzw. Abschnitte (z. B. ‚Tag 19 · Fr 20.03.‘, ‚Fazit‘), es gilt die letzte Marke, die oben schon begonnen
  hat; ohne Marken keine Blase. Wie die Kapsel nur in der Inhaltsansicht, nicht bei offener Tastatur, offenem Fenster und im
  Druck. VoiceOver: Regler ‚Schnell rollen‘ mit der Marke als Wert; Wischen nach oben bzw. unten (Pfeiltasten) springt einen
  Abschnitt. Regel R-3.2.

### 15.2 Suchfeld
- **Apple:** [HIG – Search fields](https://developer.apple.com/design/human-interface-guidelines/search-fields)
- **Zweck:** Suchen in der aktuellen Ansicht und in der zentralen Liste (15.4). **Technisch:** `.searchbox`, `.navgrp`;
  `searchWords`, `findsAll`, `findsAny`, `markWords` (ui.js). Regel R-2.3.
- **Aufbau:** Lupe (search) · Eingabe „Suchen“ · Trefferanzeige · x-Schaltfläche; rechts daneben Kapsel-Gruppe chevron-up /
  chevron-down.
- **Maße:** 44 px hoch (iPhone quer 32 px, R-2.4), Kapsel; in der zweiten Zeile der Kopfzeile über die volle Breite,
  Treffer-Navigation immer am rechten Rand; Abstand 12 px.
- **Aussehen:** wie die schwebende Schaltfläche; Lupe, Trefferanzeige grau; x als grauer Kreis mit weißem Kreuz.
- **Zustände:**
  - leer: nur Lupe und Platzhalter, Pfeile ausgegraut
  - mit Treffern: rechtsbündig „3 von 57“ (ohne das Wort „Treffer“), x; Navigation sichtbar; am ersten Treffer chevron-up
    ausgegraut, am letzten chevron-down
  - ohne Treffer: rechtsbündig „0“, beide Pfeile ausgegraut
- **Mehrere Wörter:** Leerzeichen trennt Wörter; ein Eintrag passt, wenn **jedes** Wort darin vorkommt – Reihenfolge und
  Groß/klein egal (wie Mail, Notizen, Fotos); **„…“ sucht eine genaue Wortfolge** (‚„Opera House“ sydney‘). Markiert und gezählt
  werden alle Wörter, längere zuerst, aneinanderstoßende Stellen als eine Markierung. Was ‚ein Eintrag‘ ist, legt die App fest.
- **Ohne Akzente** (wie Apple): ‚Zurich‘ findet ‚Zürich‘ und umgekehrt, ‚cafe‘ findet ‚Café‘; markiert wird das Wort, wie es im
  Text steht. ß, ø, æ sind eigene Buchstaben (‚Strasse‘ findet ‚Straße‘ nicht).
- **Verhalten:** Suche beim Tippen (Markierung sofort); jede Markierung ist ein Treffer; zum ersten wird erst nach einer kurzen
  Tipp-Pause (ca. 0,5 s) gesprungen. Der Treffer steht dann **direkt unter der Suchzeile** (und dem Tabellenkopf), nicht in der
  Bildmitte. Kopf- und Suchzeile bleiben fest oben, auch bei offener Tastatur. Treffer gelb (`--mark`), Treffer im Fokus
  hellorange (`--mark-cur`). Pfeile und Eingabetaste springen weiter, ohne Umlauf vom letzten zum ersten. x löscht die Eingabe,
  der Cursor bleibt im Feld. Gefiltert wird auf Einträge mit Treffern. Suche öffnen und ⓧ rollen den Inhalt ganz nach oben, der
  Fokus bleibt im Feld.
- **Fokus:** kein blauer Fokus-Rahmen (wie Apple) – der Cursor zeigt, dass man tippen kann; beim Blättern mit ⌃ ⌄ geht die
  Tastatur zu.
- **Feld bleibt beim Tippen:** beim Tippen wird nur der Inhalt neu aufgebaut; das Suchfeld bleibt dasselbe Element und behält
  den Fokus (Baustein `setHtml` statt `innerHTML`) – sonst schließt Safari am iPhone die Tastatur kurz und Kopf- und Suchzeile
  zittern bei jedem Buchstaben.

### 15.3 Kopfzeile
- **Apple:** [HIG – Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- **Zweck:** oberste Zeile des Inhalts. **Technisch:** `.nb`.
- **Aufbau:** links panel-left (nur wenn die Seitenleiste ausgeblendet ist) · Titel in der Mitte (17 px, fett) · rechts eine
  Kapsel mit den wichtigsten Aktionen, zuletzt ellipsis (Mehr-Menü). search in der Kapsel blendet eine **zweite Zeile** mit dem
  Suchfeld über die volle Breite ein, Treffer-Navigation rechts.
- **Verhalten:** feste Zeile des Rahmens (15.22) – nur der Inhalt darunter rollt (Hintergrund `--bg`, sobald der Inhalt gerollt
  ist, Haarlinie unten); keine Glas-Leiste. Regel R-2.1.
- **iPhone quer niedrig** (R-2.4, wie iOS quer): Kopfzeile, Suchzeile und Fensterkopf 32 statt 44 px hoch – Knöpfe in Kapseln
  31 px, Markierung 25 × 25, runde Knöpfe 32 × 32 mit unsichtbarer Antippfläche 44 × 44, das Suchfeld als Kapsel 32 px (R-3.1
  erlaubt Kapseln ab 28) –, damit Suche und Felder darunter bei offener Tastatur in der oberen Hälfte liegen (R-4.5).
- **Filter** (z. B. „Alle / Nur erfasste“): beim Öffnen eines Eintrags und beim Start immer auf „Alle“.

### 15.4 Seitenleiste
- **Apple:** [HIG – Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars)
- **Zweck:** zentrale Liste der App; im iPhone-Aufbau dieselbe als Startliste (15.17). **Technisch:** `#side`, Kacheln
  `.side-row` in `.side-list`, Backup-Kachel `.side-foot`. Regeln R-7.1, R-7.2, R-8.1.
- **Aufbau:** Kopf: Überschrift (20 px, fett, linksbündig) · Kapsel [plus | search | ellipsis] (search nur, wenn es Einträge
  gibt) · runde Schaltfläche panel-left (ausblenden); unter der Überschrift klein und grau die Anzahl (‚5 Reiselogbücher‘); der
  Kopf bleibt oben stehen. Darunter die Einträge als **Kacheln** (wie auf dem iPhone): Titel fett, darunter grau Zeitraum ·
  Status, rechts ›; gewählter Eintrag blau gefüllt; reichen sie über den Rand, wischt man sie nach oben – sie laufen unter dem Kopf
  und **hinter der Backup-Kachel durch** (keine starre Begrenzung); nur `.side-list` rollt, Kopf und Backup-Kachel nie. Die Liste
  behält beim Neuaufbau ihre Position; der gewählte Eintrag bleibt sichtbar, auch wenn er erst durch Wischen sichtbar wurde. Unten
  fest die Backup-Kachel, **solange heute noch kein Backup erstellt wurde** (15.19, auch während der Suche); darunter, solange die
  App offline arbeitet, die Zeile ‚Offline – alles bleibt auf diesem Gerät‘ (15.20) – auch ohne Kachel und bei leerer Liste. Ohne
  Kachel läuft die Liste bis an den unteren Rand bzw. bis über die Zeile.
- **Geändert am:** jede Kachel zeigt als dritte Zeile klein und grau (13 px) ‚geändert am TT.MM.JJJJ um hh:mm · iPad‘ bzw.
  ‚· iPhone‘ (`small.chg`); das Gerät liefert `deviceName()`. Ohne bekannte Änderung entfällt die Zeile.
- **Suche in der Liste** (Regel R-2.3): search im Kopf blendet darunter eine Suchzeile ein (wie 15.2, Platzhalter ‚In allen
  suchen‘, x, **ohne** Pfeile; `#side .side-search`), Fokus im Feld. Jede Kachel mit Treffer zeigt ‚N Treffer‘ statt ‚geändert am
  …‘ (nur sichtbare Felder), unter der Überschrift ‚2 von 5 <Einträgen>‘. Gefiltert bleibt, bis x oder search die Suche beendet;
  Neuladen beginnt ohne Suche. Ein daneben offener Eintrag (iPad) bleibt unberührt, solange seine Suche zu ist; sind beide
  Suchfelder offen, wird jede Eingabe (auch x) übernommen. Die Eingabetaste ‚Suchen‘ schließt nur die Tastatur (R-5.5). Vorbild
  Notizen (dort steht das Feld immer unter dem Titel; hier hinter der Lupe wie im Eintrag – Entscheidung des Nutzers).
- **Maße und Aussehen:** schwebend wie in Safari – eigenes Rechteck mit 10 px Abstand oben und links und 4 px unten (der Schatten
  endet fast am unteren Bildschirmrand), Radius 22 px, Lichtkante `--btn-rim` und Schatten `--float` wie die Schaltflächen; so
  breit wie Kopf bzw. längster Titel, 340–420 px; Hintergrund `--bg` (wie die iPhone-Startliste, damit die weißen Kacheln sich
  abheben).
- **Verhalten:** beim Start immer eingeblendet (quer fest links, hoch über den Inhalt gelegt) mit dem aktuellen Eintrag geöffnet
  (im iPhone-Aufbau stattdessen die Startliste ohne blauen Eintrag, R-7.2); quer fest links neben dem Inhalt, mit panel-left aus-
  und einblendbar (gleitet, bis zum nächsten Start); im Hochformat über den Inhalt gelegt (abgedunkelt dahinter), schließt sich nach der
  Auswahl. Bei offener Tastatur folgt sie dem sichtbaren Bereich (`--vv-top`).
- **Gesten** (R-7.5): **Hochformat** – Wischen nach rechts **von überall im Inhalt** (auch vom linken Rand) holt die Seitenleiste
  herein – sie folgt dem Finger, die Abdunkelung wächst mit; Wischen nach links auf der Seitenleiste oder der Abdunkelung schiebt
  sie weg; fertig nach halber Breite oder schnellem Wischen, sonst federt sie zurück. panel-left und Antippen der Abdunkelung
  bewegen sie genauso (gleiten, ~0,35 s). **Querformat** (seit 4.31.0, A-68): ist sie ausgeblendet, holt Wischen nach rechts von
  überall im Inhalt sie herein – sie folgt dem Finger und der Inhalt **rückt mit** (Variante ‚Mitschieben‘); fertig wie hoch, dann
  rastet sie fest links ein und der Inhalt wird schmaler (der oberste Eintrag bleibt), sonst federt sie zurück. Ausblenden quer
  **nur mit panel-left** (gleitet ebenso) – nach links wischen ändert nichts, damit die Kacheln für Wischaktionen frei bleiben.
  Apple löst das Hereinwischen quer je nach App unterschiedlich; Vorbild ist das Hochformat, am Ende liegt sie wie bei Apple quer
  neben dem Inhalt.
- **Drehen** (R-8.1): die Seitenleiste behält ihren Zustand – sichtbar bleibt sichtbar (quer fest, hoch darübergelegt),
  ausgeblendet bleibt ausgeblendet; technisch **ein einziger Zustand** für quer und hoch, den nur Tippen bzw. ein fertiges Wischen
  ändert (Knopf panel-left, Abdunkelung, Auswahl im Hochformat, R-7.5) – nie das Drehen und keine Zwischengrößen, die iOS beim
  Drehen meldet; Drehen während des Ziehens bricht es ab.
- **Mehr-Menü der Seitenleiste:** Backup erstellen (darunter grau „Letztes Backup erstellt am …“) · Backup laden · Abstand ·
  Messung starten (15.21) · durchgehender Strich · darunter ohne Leerzeilen grau die Versionszeile „<App> · Version X.Y.Z ·
  erstellt am …“ (mit ‚AppDesign X.Y.Z‘, 11) und ein verständlicher Satz zum Speicher: „Die Daten bleiben in Safari gespeichert,
  solange <App> auf dem Home-Bildschirm nicht entfernt wird.“ bzw. (nicht dauerhaft) „Safari kann die Daten bei Speichermangel
  löschen – bitte regelmäßig ein Backup erstellen.“ Backup laden = Abgleich zwischen den Geräten (15.18, 15.19).
- **Kontextmenü** (R-4.2): Langes Drücken (ca. 0,6 s) auf einen Eintrag öffnet rechts daneben ein Menü (15.6) – ist daneben kein
  Platz (iPhone), linksbündig unter der Kachel; immer vollständig und ganz oberhalb der Backup-Kachel, nie über oder hinter ihr
  (die Liste rückt dafür nach oben und bekommt bei wenigen Einträgen unten Platz; am iPad endet das Menü daneben ebenfalls über
  der Backup-Kachel); ohne Kachel ebenso über der Offline-Zeile bzw. dem unteren Rand (`sideFootRect()`). Inhalt: Einstellungen (settings) · … löschen (rot, Sprechblase) – **ohne ‚Öffnen‘**, weil Tippen öffnet
  (wie Notizen); der Eintrag ist dabei blau getönt. Kein Wischen, kein Hinweistext.
  [HIG – Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus)

### 15.5 Kapsel
- **Apple:** [HIG – Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- Mehrere Schaltflächen in einer schwebenden Kapsel (44 px hoch, je Icon 48 px breit); Text-Schaltflächen darin mit
  Innenabstand 14 px. Technisch `.grp` (`.navgrp`). Regel R-3.2.
- **Suche am Ende:** die Lupe steht in jeder Kapsel am Ende, dahinter höchstens das Mehr-Menü (ellipsis) – wie Apple; z. B.
  [plus | search | ellipsis], [share | search | ellipsis] (R-2.3).
- **Alle Kapseln gleich gebaut** (Kopfzeile, Seitenleiste, Treffer-Pfeile, Blättern, Auswahl-Kapseln): Schaltflächen genau so
  hoch wie der Innenraum (44 px minus Rand); die Markierung (gedrückt bzw. blau gefüllt) ist eine eigene Form innerhalb des
  Randes: **bei Icons ein Kreis 36 × 36** wie bei Wetter und Smileys (R-3.1), bei Text eine Kapsel mit 3 px Luft.

### 15.6 Menü
- **Apple:** [HIG – Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- **Zweck:** weitere Aktionen hinter ellipsis bzw. Auswahl hinter einer Schaltfläche. **Technisch:** `.menu` (öffnen mit
  `openMenu`). Regel R-4.1.
- **Aussehen:** Karte 340 px, Radius 14 px, Lichtkante und Schatten wie die Schaltflächen; Einträge 46 px hoch, Icon **vor** dem
  Text, **keine Linien zwischen einzelnen Punkten**; Gruppen durch eine **dünne, links und rechts eingerückte Linie** getrennt (wie
  Apple, iOS 26 – `'sep'`/`'line'`, 1 px, 20 px Einzug); Auswahl mit blauem Häkchen vorne (bei Punkten mit Icon: Häkchen, dann
  Icon und Text); graue Zusatzzeile unter einem Eintrag; graue Notizen und technische Informationen (Version, Speicher, Zahl der
  Tage, Dateiname) ganz unten nach der Linie, ohne Leerzeilen. Nichts blau eingefärbt, „… löschen“ rot.
- **Untermenü** (`submenu`, eine Ebene, höchstens etwa 5 Punkte): Eintrag mit grauem Wert und ›; öffnet neben dem Menü, oben
  bündig; der Eintrag bleibt blau, solange es offen ist.
- **Verhalten:** erscheint unter der Schaltfläche (darf über die Seitenleiste hinausragen); die Schaltfläche ist so lange gedrückt
  (blau getönt); daneben tippen schließt. Reicht der Platz darunter nicht, rollt das Menü in sich (erst unter 200 px Platz öffnet
  es nach oben).
- **Beim Drehen** (R-8.1): offenes Menü, Untermenü und Sprechblase werden neu ausgerichtet – das Menü unter der aufrufenden
  Schaltfläche, das Untermenü neben seinem Eintrag, ganz sichtbar. Liegt die Schaltfläche in der Seitenleiste, bleibt die
  Seitenleiste dabei sichtbar (iPad hoch: darübergelegt). Ist eine Schaltfläche danach nicht mehr da, schließt sich ihr Menü;
  eine Sprechblase (offene Entscheidung) bleibt und steht mittig.

### 15.7 Sprechblase (Abfrage)
- **Apple:** [HIG – Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers) · [HIG – Action sheets](https://developer.apple.com/design/human-interface-guidelines/action-sheets) · [HIG – Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- **Zweck:** jede Abfrage mit Entscheidung. **Technisch:** `.pop` (`confirmPop`, mehrere Wege `choosePop`). Regel R-4.3.
- **Aufbau:** grauer Text · rote Schaltfläche mit dem Verb der Aktion · darunter der Weg zurück („Abbrechen“ bzw. „Weiter
  bearbeiten“, normale Schrift); **Schaltflächen ohne Icons** wie in Apple-Abfragen; Breite 320 px.
- **Mehrere Wege** (`choosePop`): wie eine Apple-Abfrage mit drei Knöpfen – die empfohlene Aktion blau gefüllt (`primary`)
  zuerst, eine zerstörende in roter Schrift (`danger-text`), zuletzt ‚Abbrechen‘; eine kurze graue Erklärung der Wege steht im
  Text. Bekommt ein Weg eine Erklärung (`desc`), steht er in einer eigenen Kachel – Erklärung oben (gleiche Schrift wie der Text
  der Sprechblase), Knopf darunter; ‚Abbrechen‘ darunter.
- **Verhalten:** an der angetippten Schaltfläche (diese ist gedrückt); daneben tippen bricht ab.
- **Passt immer auf den Bildschirm** (R-4.5): auf dem iPhone quer ist die Sprechblase breiter (bis 600 px) und die Knöpfe stehen
  nebeneinander; reicht der Platz trotzdem nicht, rollt der Inhalt in ihr. Gilt ebenso für Menüs und Fenster.

### 15.8 Fenster-Kopfzeile
- **Apple:** [HIG – Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- **Aufbau:** links rundes x (44 × 44) · Mitte Titel (19 px) mit grauer Zusatzzeile (13 px) · rechts ggf. eine Kapsel und das
  runde Häkchen. Häkchen grau, nach einer Änderung blau gefüllt. iPhone quer 32 px (R-2.4, wie 15.3). Technisch `dlgHead()`.
  Regel R-4.4.

### 15.9 Fenster
- **Apple:** [HIG – Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- Typen: **Bearbeiten** (z. B. Neu, Einstellungen), **Erfassung**, **Vorschau**, **Meldung** – Aufbau und Verhalten siehe 7.
- **Liste steht still** (R-7.3), technisch: ui.js merkt beim Öffnen den Rollstand und die oberste Zeile unter der Leiste samt
  Abstand und richtet sie nach dem Schließen und nach dem Neuaufbau genau dort aus (Safari schiebt beim Öffnen der Tastatur sonst
  die ganze Seite; `position: fixed` ginge nicht, weil der Tabellenkopf haftet); nach dem Schließen hält ui.js diese Zeile 1,5 s
  lang fest (Safari rollt beim Zugehen der Tastatur noch einmal bzw. ändert die Fensterhöhe – jede solche Bewegung wird
  zurückgenommen; ein Tippen oder Wischen beendet das Festhalten). Solange ein Fenster offen ist, steht der Rollbereich still
  (`html.locked`).

### 15.10 Kasten (Schritt)
- **Apple:** [HIG – Boxes](https://developer.apple.com/design/human-interface-guidelines/boxes)
- Fläche `--dlg-card` bzw. `--card`, Radius 14 px, ohne Rand, Innenabstand 14 px; Kopfzeile mit blauer Schritt-Nummer, Titel,
  rechts Options-Kapseln und Icon-Schaltflächen.
- **Schaltflächen im Schrittkopf als Gruppe** (R-5.1): mehrere Options-Kapseln (`.head-check`) stehen in
  `<span class="head-checks">`. Passt alles in eine Zeile, stehen sie rechts neben dem Titel (auch iPhone quer); sonst rückt die
  ganze Gruppe unter den Titel – nie eine Kapsel allein.
- **Kasten mit Feldern** (`.box` mit `.kv`, iPhone statt Tabellenzeile, R-6.1): Felder durch dünne Linien getrennt (1 px
  `--line`, wie die Trennlinie im Menü) – waagrecht zwischen den Feldern, senkrecht zwischen Bezeichnung und Inhalt.
  Bezeichnung als Wort in normaler Schrift (`.k.word`, 17 pt halbfett) oder als Emoji/klein grau.

### 15.11 Eingabefeld mit Fehlermeldung
- **Apple:** [HIG – Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields)
- Fläche weiß bzw. `--dlg-field`, Lichtkante `--btn-rim` und Schatten `--float` wie die schwebenden Schaltflächen (auch
  Zahlenfelder), Radius 10 px, 44 px hoch (Textfelder mehrzeilig), Schrift mindestens 16 px (R-1.3); Fehler: 1 px roter Rand und
  rote Meldung darunter (8, R-5.3). Textfelder wachsen mit dem Inhalt; Datumsfelder so breit wie das Datum.
- **ⓧ zum Leeren** (R-5.6, wie Apple ‚whileEditing‘): einzeilige Textfelder zeigen rechts ein graues ⓧ (wie im Suchfeld, 44 × 44),
  solange sie den Fokus haben und etwas drinsteht; Antippen leert, Cursor und Tastatur bleiben, die App erfährt es wie beim
  Löschen per Taste. Nicht in mehrzeiligen Feldern, Datums- und Suchfeldern. **Technisch:** ein Knopf `.fclear` für alle Felder
  (ui.js), abschaltbar mit `data-noclear`.

### 15.12 Smiley-Leiste und Auswahl-Kapsel
- **Apple:** [HIG – Collections](https://developer.apple.com/design/human-interface-guidelines/collections)
- Smiley-Leiste: Verhalten siehe 8; Smileys als runde schwebende 44 × 44-Schaltflächen, Abstand 12 px.
- **Auswahl-Kapsel** (R-5.4): Mehrere Auswahl-Schaltflächen (Smileys, Wetter, Reisemittel …) stehen in **einer** schwebenden
  Kapsel (44 px hoch, Lichtkante, Schatten, keine Ränder dazwischen). Reicht der Platz nicht, lässt sich der Inhalt nach
  links/rechts wischen; am Rand, wo es weitergeht, ein weicher Verlauf (48 px, die äußeren 28 px ganz frei) und darin ein kleiner
  Pfeil (`chevron-left`/`-right`, 14 px, `--muted`, 9 px vom Rand, nur Anzeige: fängt kein Antippen ab, `aria-hidden`). Ein Pfeil
  steht nur, solange es auf seiner Seite weitergeht; am Ende blendet er in 0,2 s aus (‚Bewegung reduzieren‘: ohne Überblenden).
  Passt alles, gibt es weder Verlauf noch Pfeil; Drehen und andere Größenänderungen stellen beides neu. Bewusste Abweichung von
  Apple: am iPhone zeigt Apple bei wischbaren Reihen keine Pfeile (nur Mac und iPad mit Zeiger) – die Pfeile machen das Wischen
  erkennbar. Gewählte Einträge sind blau getönt (Haarlinie
  `--accent`), und zwar als eigene Form **innerhalb** der Schaltfläche mit Luft rundherum (wie Tapback): bei Emojis ein Kreis von
  36 px, bei Text eine Kapsel mit 3 px Abstand nach innen – markierte Nachbarn stoßen nie aneinander. Schaltflächen füllen genau
  den Innenraum der Kapsel. Zurücksetzen (rotate-ccw) steht als eigene runde Schaltfläche rechts daneben. Vorbild: Tapback-Leiste
  in Nachrichten. Technisch `.cap` > `.scroll` + `.pf` (`capHtml`, `mountCap`).
- **Langes Drücken** (R-3.5) auf einem Smiley entfernt ihn (8) – Ziehen ist kein langes Drücken: wandert der Finger mehr als 10 px
  oder rollt die Leiste, ist es abgebrochen (`onLongPress`).

### 15.13 Tabelle
- **Apple:** [HIG – Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
- Siehe 9; Regeln R-6.1 bis R-6.3.

### 15.14 Info-Icon mit Hinweis
- **Apple:** [HIG – Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Runde Icon-Schaltfläche `info`; ein Tippen blendet einen grauen Hinweis ein bzw. aus.

### 15.15 Schalter (Einstellungen ein/aus)
- **Apple:** [HIG – Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles)
- **Zweck:** Ein/Aus-Einstellungen, z. B. in Bearbeiten-Fenstern. **Technisch:** `.swlist`, `label.check.sw` mit
  `<input type="checkbox" switch role="switch">` (R-5.7). Kennt der Browser den eingebauten Schalter (Safari ab 17.4; ui.js setzt
  `html.natsw`), zeichnet Safari ihn selbst – er gleitet, lässt sich ziehen, gibt Haptik, VoiceOver sagt ‚Schalter‘, und er hat das
  Aussehen der iOS-Version; Grün über `accent-color: var(--sw-on)`. Sonst unser Schalter wie unten.
- **Aufbau:** Zeile mit Text links und Apple-Schalter rechts; Zeilen 52 px hoch, dazwischen Haarlinie; Schalter 51 × 31 px,
  weißer Knopf.
- **Zustände:** ein = `--sw-on` (Apple-Grün), Knopf rechts; aus = `--sw-off`, Knopf links; gesperrt 40 % Deckkraft (Text und
  Schalter). Kein Schein.

### 15.16 Options-Kapsel (Optionen beim Erfassen)
- **Apple:** [HIG – Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles)
- **Zweck:** einzelne Ein/Aus-Optionen in der Kopfzeile eines Kastens. **Technisch:** `label.check.chip` mit verstecktem
  `input[type=checkbox]`.
- **Aussehen:** wie eine schwebende Schaltfläche (Kapsel, 44 px, Schrift 15 px); ein = `--sel-bg`, Haarlinie `--accent`, Schein
  `--glow-accent` und **Häkchen in Akzentfarbe vor dem Text**; aus = neutral ohne Häkchen; gesperrt 40 % Deckkraft.

### 15.17 iPhone-Ansicht (kompakte Breite)
- **Apple:** [HIG – Layout](https://developer.apple.com/design/human-interface-guidelines/layout) ·
  [HIG – Navigation](https://developer.apple.com/design/human-interface-guidelines/navigation-and-search) · Vorbild Notizen auf dem
  iPhone (iOS 26, `apple-referenz/iphone/notizen`).
- **Wann:** iPhone hoch **und** quer sowie sehr schmale Fenster – unter 700 px breit oder unter 500 px hoch. **Technisch:**
  `isPhone()` in `ui.js`; `<html>` bekommt die Klasse `phone` (`applyLayout`, auch beim Drehen); die App baut ihre Seiten danach,
  ihr `resize`-Handler ruft bei einem Wechsel `render()`. Regel R-1.1: gleiche Bausteine und Bedienung wie am iPad, nur eine
  Seite nach der anderen statt Seitenleiste.
- **Startliste = Seitenleiste:** die Startliste ist die Seitenleiste `#side` als ganze Seite (`#side.page`) – kein eigener
  Nachbau. Kopf wie am iPad (Titel links, 20 pt fett, darunter klein und grau die Anzahl, rechts [`plus` | `search` |
  `ellipsis`]; panel-left entfällt), Kacheln und Backup-Kachel wie 15.4. (`.ilist.tiles` bleibt als Liste für andere Seiten.)
- **Start** (R-7.2): jedes Neuladen beginnt in der Startliste, ganz oben, **kein Eintrag blau** (nichts ist geöffnet, HIG 4);
  nach ‚Zurück‘ ist der zuletzt geöffnete blau. Es entscheidet der **Aufbau** (`isPhone()`), nicht das Gerät – auch ein iPad im
  schmalen Fenster beginnt in der Startliste; der iPad-Aufbau öffnet den aktuellen Eintrag (15.4). Rückkehr aus dem Hintergrund
  ohne Neuladen ändert nichts (13). Die App merkt sich den Start-Eintrag trotzdem, damit ein breiteres Fenster ihn mit der
  Seitenleiste zeigt.
- **Seitenkopf** (`.pnav`): bleibt fest oben stehen; links runder Zurück-Knopf mit `chevron-left` **ohne Text**, rechts
  **dieselbe Kapsel wie am iPad** (z. B. [`share` | `search` | `ellipsis`] im Inhalt).
- **Seitenwechsel und Zurückwischen** (R-7.5, wie iOS 26): Öffnen aus der Startliste schiebt den Inhalt von rechts herein, die
  Liste weicht ein Drittel nach links und dunkelt leicht ab; der Zurück-Knopf schiebt ihn wieder hinaus (~0,35 s). Zurück geht es
  auch durch **Wischen nach rechts von überall im Inhalt** – die Seite folgt dem Finger, die Startliste ist darunter zu sehen;
  fertig nach halber Breite oder schnellem Wischen (über 0,3 px/ms in den letzten 100 ms), sonst federt sie zurück. Vorrang haben
  das senkrechte Rollen, Bereiche mit eigenem waagrechtem Rollen, Felder, Knöpfe, Kapseln, Kapsel und Schnellroll-Griff; entschieden
  wird nach 10 px (deutlich waagrecht, 1,2 × so weit wie senkrecht, nach rechts); wer erst hält (langes Drücken), wischt nicht.
  Kein Wischen bei offenem Fenster, Menü oder offener Sprechblase. Bei offener Tastatur schließt das Wischen sie und geht zurück.
  Der Rollstand der Startliste bleibt, der zuletzt geöffnete Eintrag ist blau (R-7.2). ‚Bewegung reduzieren‘: Überblenden statt
  Schieben, auch beim Wischen. VoiceOver: Zurück-Knopf, ‚Zurück‘-Geste (Escape). Wischen tippt nie an, worauf es begann.
  **Technisch:** `navAnmelden({ zurueck, seite })` meldet die App an, `navVor(change)`, `navZurueck()`, `navSeite(an)` (ui.js); je
  Bild nur `transform` und `opacity` (Web-Animation), wo gewischt werden kann `touch-action: pan-y pinch-zoom` (`html.wischt`);
  ist die Geste entschieden, verhindert ui.js `touchmove` – Safari rollt dann nicht mehr dazwischen (13 Wischgesten).
- **Titel einer Inhaltsseite** steht wie am iPad **immer in der Leiste** (`.pnav-title`, ohne großen Titel darüber, R-2.2);
  darunter die Angaben mit Bezeichnung, auf dem iPhone mit Umbruch nach dem Doppelpunkt.
- **Großer Titel** (`.ltitle`, 34 pt fett, nur bei Bedarf) mit grauer Zeile darunter (`.lcount`). Wie Notizen: wird er
  hochgeschoben, erscheint der Titel klein (17 pt halbfett) in der Mitte der Leiste (`.pnav-title`, `.pnav.titled`, `updateBar()`
  in `ui.js`) und bleibt dort, bis man wieder ganz nach unten zieht.
- **Liste** (`.ilist` mit `.irow`): weiße Karte mit runden Ecken (22 px); Zeilen mit fettem Titel, grauer Zeile darunter und
  `chevron-right`; Haarlinie links eingerückt. Tippen öffnet, lange drücken zeigt das Kontextmenü; markierte Zeile `--sel-bg`.
- **Kasten** (`.box` mit Zeilen `.kv` = graue Bezeichnung `.k` links, Wert `.v` rechts): ein Eintrag als Karte, z. B. ein Tag
  statt einer Tabellenzeile (15.10).
- **Nach oben / Ans Ende:** in einer Inhaltsseite dieselbe senkrechte Kapsel unten rechts wie am iPad, nicht in der Startliste,
  dazu bei langem Inhalt der Schnellroll-Griff (15.1, R-3.2).
- **Tastatur der Suche:** wischt man den Inhalt, während die Tastatur der Suche offen ist, schließt sie sich (wie bei Apple) –
  sonst verschiebt iOS den sichtbaren Bereich und die Leisten zittern (R-2.1).
- **Suche** wie am iPad (15.2): `search` in der Kapsel öffnet unter der Leiste die Suchzeile mit ‚1 von 4‘, ⓧ und ⌃ ⌄.
- **Fester Hinweis unten** (`.bbar` mit `.bnote`): z. B. der Backup-Hinweis – gelb getönte Karte (`--focus`) mit blau gefülltem
  Knopf, fest am unteren Rand; die Liste läuft dahinter durch (Verlauf), bei offener Tastatur wandert die Leiste über die Tastatur
  (`--vv-bottom`). Am iPad steht derselbe Hinweis ebenso gelb fest am unteren Rand der Seitenleiste.
- **Fenster als Blatt** (R-4.6, Variante A ‚nur groß‘ wie ‚Neuer Termin‘): von 10 px unter der Statusleiste (quer 8 px) bis zum
  unteren Rand bzw. zur Tastatur (R-4.5), oben runde Ecken (26 px, quer 18 px), gleitet von unten herein; die Seite dahinter weicht
  hoch um 7 % verkleinert mit runden Ecken vor Schwarz zurück, abgedunkelt wird mit 30 % Schwarz; quer bleibt die Seite. Nach unten
  ziehen am Kopf (immer) oder im Inhalt (wenn er ganz oben steht) folgt dem Finger: entschieden nach 8 px, deutlich senkrecht (1,2 ×
  so weit wie waagerecht); beim Loslassen zählt der Punkt, an dem das Blatt mit dem Tempo der letzten 100 ms auslaufen würde
  (Tempo × 400 ms) – liegt er näher am unteren Rand, schließt es wie das x, sonst federt es zurück; über ‚groß‘ hinaus Gummiband.
  Mit Änderungen seit dem Öffnen (`dlgDirty`, auch beim Erfassen) zieht es sich zäh (30 %), federt zurück und fragt am x (R-4.4).
  Ein Zug nach unten schließt zuerst die Tastatur; beginnt er bei offener Tastatur auf einem Feld, zieht er im selben Zug das Blatt
  wie am Kopf – auch wenn R-4.5 den Inhalt dafür gerollt hat (seit 4.32.1, A-71; ein Feld, das selbst gerollt ist, rollt weiter);
  im gerollten Inhalt daneben rollt er weiter und schließt die Tastatur – auch, wenn der Finger zuerst ein Stück nach oben geht
  (seit 4.32.2, A-73). Antippen der Abdunkelung und Escape wie x; Drehen lässt es
  offen. ‚Bewegung reduzieren‘: Überblenden, das Ziehen folgt weiter dem Finger. Kopfzeile kompakt mit einzeiligem Titel (kurze
  Form, z. B. ‚Di, 25.08.2026‘); Options-Kapseln stehen unter dem Kasten-Titel. Meldungen bleiben kleine Fenster in der Mitte.
  **Technisch:** `blattAuf()` aus `openDialog`, Lage `blattOben()` in `placeDialogs`, Klassen `html.blatt`, `.blatt-zurueck`,
  `.blatt-faehrt`, `.blatt-zieht`, an den zurückweichenden Elementen `.blatt-seite`; die App braucht nichts weiter (Schließen über x bzw. `dlg.close()` wie bisher).
- **Abfragen** wie auf dem iPad als Sprechblase an der angetippten Schaltfläche (iOS 26 zeigt Abfragen ebenfalls an der
  Schaltfläche). Menüs, Kapseln und Schaltflächen wie auf dem iPad (44 pt).

### 15.18 Abgleich zwischen iPad und iPhone
- **Apple:** iCloud gleicht ohne Rückfrage ab; ohne Entwicklerkonto geht es bei uns über ein Backup in iCloud Drive – mit
  derselben Grundregel wie Apple: **die neuere Änderung gilt**, je Feld. Regeln R-9.2 bis R-9.4.
- **Technisch:** gemeinsamer Baustein `createSync({ list, sub, subAt, maxFields, nouns, labels, values, app })` in `ui.js` – jede
  App mit Backup nutzt ihn (keine eigene Umsetzung, R-1.1). Beim Speichern stempelt `sync.stamp()` jedes geänderte Feld mit
  Zeitpunkt und Gerät (Kopfdaten `metaAt`, Unterdaten wie Tage `subAt`), gelöschte Einträge kommen nach `data.deleted`; das
  Backup enthält `savedAt` und `savedOn`.
- **Weg:** auf dem einen Gerät ‚Backup erstellen‘ → ‚In Dateien sichern‘ → iCloud Drive; auf dem anderen ‚Backup laden‘ → Datei
  wählen → Abfrage (15.19) → ‚Abgleichen‘ → Ergebnis.
- **Ergebnis in zwei Stufen** – `sync.showResult(stats, savedAt, savedOn)`:
  1. **Kleines Fenster ‚Abgleichen‘** (wie jede Meldung): ‚✅ Abgeglichen mit dem Backup vom **iPad** (13.10.2026 um 10:05).‘ und
     ein Satz – ‚Auf diesem iPhone hat sich etwas geändert – Einzelheiten im Abgleichbericht.‘ bzw. ‚… nichts geändert – Hinweise
     im Abgleichbericht.‘; darunter die blaue Schaltfläche **‚Abgleichbericht anzeigen‘** (Icon `eye`). Keine Einzelheiten im
     Fenster. Ohne jede Änderung und ohne Hinweis nur ‚Alles war schon auf dem gleichen Stand.‘ – **ohne** Schaltfläche.
  2. **Abgleichbericht** (`sync.openReport`): Vorschau wie die Ausgabe der App – großes Fenster, immer hell, Kopf
     ‚Abgleichbericht‘ mit Dateiname, oben rechts die Kapsel wie bei der Vorschau der Ausgabe: **PDF** (Drucken-Menü) und Teilen
     (HTML-Datei, Dateiname 10); auf dem iPhone und am iPad hoch seitlich wischen – der Inhalt jeder Zelle bricht um und ragt nie in
     die Nachbarzelle (R-6.3). Inhalt:
     - Kopf: ‚Abgeglichen am … auf diesem iPhone‘ · ‚Backup: vom iPad, erstellt am …‘ · ‚Ergebnis: 1 aktualisiert · 1 neu ·
       1 gelöscht · 3 unverändert‘.
     - **‚Änderungen auf diesem iPhone‘** – Tabelle wie in der Ausgabe (grauer Kopf, Spaltenköpfe halbfett, Linien): Eintrag
       (z. B. Reiselogbuch) · Tag (‚Mo, 12.10.2026‘, ‚–‘ für Kopfdaten) · Feld (Namen aus `labels`) · Neu · Vorher (Werte wie in
       der App über `values`) · Vom Gerät · Geändert am; je Feld eine Zeile; der Eintrag ist in der ersten Spalte über alle seine
       Zeilen zusammengefasst (Tag, Gerät und Zeitpunkt je Tag) und bildet eine Tabellenzeile – sie ist ganz weiß oder ganz grau,
       im Wechsel je Eintrag (R-6.2); neu angelegte Einträge ‚**neu angelegt** (n Tage)‘ blau, gelöschte ‚**gelöscht**‘ rot.
       Unveränderte Einträge stehen **nicht** in der Tabelle, darunter nur ‚n Reiselogbücher sind unverändert.‘
     - **‚Auf diesem iPhone neuer als im Backup – bleibt so‘** – gleiche Tabelle (Spalten ‚Auf diesem iPhone‘ · ‚Im Backup‘) und
       ‚Damit das iPad diesen Stand bekommt: hier ‚Backup erstellen‘, dort ‚Backup laden‘ → ‚Abgleichen‘.‘
     - **Hinweise** zu Gelöschtem (R-9.3), zuletzt ‚Erstellt mit <App> am …‘.
- **Prüfung:** `tests/abgleich.mjs` prüft alle Fälle der Tabelle in beide Richtungen für jede App, dazu kurzes Fenster und
  Abgleichbericht (keine Einzelheiten im Fenster, Spalten, Zeilen, Unverändertes nur als Anzahl, Gerät im Kopf, ‚hier neuer‘);
  das Prüfskript misst Fenster und Bericht (HIG).

| Nr. | Anwendungsfall | iPhone lädt das Backup vom iPad → ‚Abgleichen‘ | iPad lädt das Backup vom iPhone → ‚Abgleichen‘ |
|---|---|---|---|
| 1 | Eintrag nur auf dem iPad neu angelegt | kommt dazu – Zeile ‚neu angelegt‘ im Abgleichbericht | bleibt – ‚nichts geändert‘, im Abgleichbericht unter ‚Auf diesem iPad neuer als im Backup‘ als ‚nur hier vorhanden‘ |
| 2 | Auf dem iPad gelöscht, auf dem iPhone seitdem nicht geändert | wird gelöscht – Zeile ‚gelöscht‘ im Abgleichbericht | bleibt gelöscht – Hinweis ‚Auf diesem iPad gelöscht, im Backup vom iPhone noch vorhanden: … (gelöscht am …) – bleibt gelöscht. Zurückholen nur mit Ersetzen‘ |
| 3 | Auf dem iPad gelöscht, auf dem iPhone **danach** noch geändert | bleibt erhalten – Hinweis ‚Auf dem iPad gelöscht, auf diesem iPhone danach noch geändert: … – bleibt erhalten‘ | kommt mit den Änderungen vom iPhone zurück – Zeile ‚neu angelegt‘ im Abgleichbericht |
| 4 | Auf dem iPad gelöscht, auf dem iPhone **vorher** geändert | wird gelöscht – Zeile ‚gelöscht‘ im Abgleichbericht | bleibt gelöscht – Hinweis wie Fall 2 |
| 5 | Auf beiden Geräten gelöscht | bleibt weg, keine Meldung | bleibt weg, keine Meldung |
| 6 | Nur auf dem iPad Unterdaten (z. B. ein Tag) erfasst oder geändert | übernommen – Zeilen mit Tag und Feldern im Abgleichbericht | bleibt – ‚nichts geändert‘, im Abgleichbericht unter ‚hier neuer als im Backup‘ |
| 7 | Verschiedene Unterdaten (Tage) auf iPad und iPhone geändert | beide sind da | beide sind da |
| 8 | Gleiche Unterdaten, verschiedene Felder (iPad: Wetter, iPhone: Verlauf) – auch wenn der Tag auf beiden neu angelegt wurde und das Fenster leere Felder mitspeichert | beides bleibt | beides bleibt |
| 9 | Gleiches Feld auf beiden geändert (iPhone später) | die neuere Fassung (iPhone) bleibt – ‚nichts geändert‘, im Abgleichbericht unter ‚Auf diesem iPhone neuer als im Backup – bleibt so‘ | die neuere Fassung (iPhone) wird übernommen – Zeile mit Tag und Feld im Abgleichbericht |
| 10 | Feld auf dem iPad geleert, iPhone unverändert | Feld wird auch hier geleert, der Rest bleibt | bleibt leer |
| 11 | Feld auf dem iPad geleert, auf dem iPhone **danach** neu eingetragen | der neue Eintrag bleibt | der neue Eintrag wird übernommen |
| 12 | Kopfdaten: verschiedene Felder (iPad Titel, iPhone Fazit) | beides bleibt | beides bleibt |
| 13 | Kopfdaten: gleiches Feld auf beiden geändert | das Neuere gilt | das Neuere gilt |
| 14 | Auf beiden ein neuer Eintrag mit gleichem Namen | beide bleiben (verschiedene Einträge) | beide bleiben |
| 15 | Nichts geändert bzw. dasselbe Backup noch einmal | ‚Alles war schon auf dem gleichen Stand‘ | wie links |
| 16 | Daten ohne Zeitpunkt (ältere Backups) | Vorhandenes bleibt, Fehlendes kommt dazu; unterschiedliche Werte bleiben je Gerät verschieden | wie links – Tipp: einmal ‚Ersetzen‘, dann starten beide gleich |
| 17 | Zähler ohne Zeitpunkt (`maxFields`, z. B. Dateinummer) verschieden | der größere Wert gilt | wie links |
| 18 | Einstellungen (Darstellung, Smiley-Leiste, ‚Letztes Backup‘) | bleiben die des iPhones | bleiben die des iPads |
| 19 | ‚Ersetzen‘ statt ‚Abgleichen‘ | alle Daten des iPhones werden durch das Backup ersetzt (hier Gelöschtes kommt zurück, hier Geändertes geht verloren); ‚Letztes Backup‘ bleibt | wie links |
| 20 | ‚Abbrechen‘ oder daneben tippen | nichts ändert sich | wie links |

### 15.19 Backup erstellen und Backup laden
- **Apple:** [HIG – Activity views](https://developer.apple.com/design/human-interface-guidelines/activity-views) (Teilen-Menü) ·
  [HIG – File management](https://developer.apple.com/design/human-interface-guidelines/file-management) (Dateien-App, iCloud Drive)
- **Technisch:** gemeinsame Bausteine in `ui.js` – `backupFileOf(app, data)`, `shareFiles()`, `shareResultText()`,
  `backupLastText()`, `backupToday()`, `backupTileHtml()`, `backupMenuEntries()`, `readBackup()`; für den Abgleich `createSync()`
  (15.18). Jede App mit Backup nutzt sie – keine eigene Umsetzung (R-1.1). Regeln R-9.1, R-9.2.
- **Backup erstellen:**
  - **Wo:** Backup-Kachel unten in der Seitenleiste bzw. Startliste – **nur, solange heute auf diesem Gerät noch kein Backup
    erstellt wurde** und es Einträge gibt: gelb, ‚Letztes Backup erstellt am …‘ bzw. ‚Noch kein Backup erstellt.‘ und der blaue
    Knopf ‚Backup erstellen‘; danach verschwindet sie (wie die Hinweise ‚iPhone nicht gesichert‘ in den Einstellungen), um 0:00
    und bei der Rückkehr am nächsten Tag kommt sie von selbst wieder (`onNeuerTag()`). Immer im Mehr-Menü der Seitenleiste: ‚Backup erstellen‘ (Icon `save`, darunter grau ‚Letztes Backup
    erstellt am …‘), direkt darunter ‚Backup laden‘ (Icon `folder-open`).
  - **Ablauf:** Teilen-Menü (iOS) → ‚In Dateien sichern‘ (z. B. iCloud Drive). Datei ‚Ω Backup <App> JJJJ.MM.TT hh.mm.json‘ mit
    allen Daten, Zeitpunkt und Gerät.
  - **Danach:** kleines Fenster ‚Backup‘ mit ✅ und Ort der Datei bzw. ⚠️ bei Abbruch; ‚Letztes Backup‘ zählt nur, wenn das Teilen
    abgeschlossen wurde, und gilt je Gerät (ein Backup des anderen Geräts, Abgleich und ‚Backup laden‘ zählen nicht); die
    Backup-Kachel verschwindet ohne Bewegung, der Fokus geht auf ‚Mehr‘. Muster und Fall-Liste: `arbeit/A-74 Fall-Liste.md`.
- **Backup laden:**
  - **Ablauf:** Mehr-Menü → ‚Backup laden‘ → Dateiauswahl (z. B. iCloud Drive) → Abfrage → Ergebnis (15.18).
  - **Abfrage** (Sprechblase an der Schaltfläche, 400 px breit, R-4.3): oben grau ‚Backup vom **…** (Gerät) mit n …‘ und ‚Es ist
    **neuer/älter/gleich alt** als die Daten auf diesem Gerät (zuletzt geändert am …)‘, kurz erklärt; darunter **je Weg eine
    Kachel** (Hintergrund `--bg`, Radius 14 px): oben die Erklärung in **derselben Schrift** wie ‚Backup vom …‘ (15 px, grau),
    darunter der Knopf – Kachel 1 ‚Abgleichen‘ (blau gefüllt), Kachel 2 ‚Ersetzen‘ (rote Schrift); unter den Kacheln ‚Abbrechen‘
    wie in jeder Abfrage. iPhone quer: Kacheln nebeneinander (R-4.5).
  - **Unlesbare Datei:** kleines Fenster ‚Backup laden‘ mit ⚠️ und dem Grund.
  - **Abbrechen / daneben tippen:** nichts ändert sich.
- **Prüfung:** `tests/backup.mjs` bedient Menü, Backup erstellen, Backup laden (Abfrage, Abbrechen, unlesbare Datei) in jeder App
  und prüft Texte, Layout, Schriftgrößen und Ergebnis.

### 15.20 Offline (Start und Hinweis)
- **Apple:** Vorbild Mail (Zustand klein und grau unten in der Liste) und Musik (‚Du bist offline‘); HIG *Feedback* und *Writing* –
  Zustand ruhig zeigen, sagen, was weiter geht. Muster und Fall-Liste: `arbeit/A-06 Muster und Fall-Liste.md`. Regel R-1.5.
- **Start:** der Service Worker wartet höchstens 3 s auf das Netz, dann aus dem Speicher (11).
- **Zeile:** solange die App offline arbeitet, unten in Seitenleiste (iPad) bzw. Startliste (iPhone) – unter der Backup-Kachel
  bzw., ohne Kachel und bei leerer Liste, allein am unteren Rand – grau, 13 pt, Icon `wifi-off`: ‚Offline – alles bleibt auf
  diesem Gerät‘ (`.offl` im Fuß aus `backupTileHtml()`, den die App immer setzt); die Liste läuft auch hinter der Zeile durch,
  der letzte Eintrag endet darüber.
- **Meldung beim Wechsel und beim Start ohne Netz:** weiße Karte unten (`.nettoast`), Icon grau, ‚Du bist offline‘ und darunter
  grau ‚Die App arbeitet weiter; alles bleibt auf diesem Gerät.‘ bzw. ‚Wieder online‘ (`wifi`); mittig im freien Bereich neben
  einer sichtbaren Seitenleiste, mit Abstand zu ‚Nach oben / Ans Ende‘, auf dem iPhone über der Backup-Kachel bzw. der Zeile, bei offener
  Tastatur darüber; verschwindet nach 4 s, Antippen schließt sie; höchstens eine zugleich; sie ist kein Fenster (R-4.3), sperrt
  nichts und steht in der obersten Ebene auch über einem offenen Fenster.
- **Technisch:** `ui.js` – `setNet()`, `isOffline()`, `netLineHtml()`; ‚Netz aus‘ meldet Safari (`offline`/`online`), ‚Netz
  hängt‘ meldet der Service Worker der App mit `postMessage({ netz: 'aus' | 'an' })` (‚aus‘, sobald er aus dem Speicher liefert;
  ‚an‘, sobald das Netz antwortet). Die Seite fragt ihn beim Start `{ netz: '?' }` (bei `DOMContentLoaded`, nicht erst bei
  `load`) und bei der Rückkehr in die App bzw. wenn Safari wieder Netz meldet `{ netz: 'pruefe' }`; er antwortet immer. Solange
  die App sichtbar ist, fragt sie alle 10 s (`pruefe`, der Service Worker ruft `./` mit `HEAD` ab) – das iPad als
  Home-Bildschirm-App meldet den Wechsel nicht zuverlässig (keine Ereignisse `offline`/`online`, `navigator.onLine` bleibt
  stehen); die Ereignisse beschleunigen nur. Jede Frage trägt eine laufende Nummer (`id`), die Antwort ebenso; Antworten auf
  Fragen von vor einer Meldung ‚offline‘ gelten nicht (schnelles Hin und Her). Jede App übernimmt diese Nachrichten in ihren
  `sw.js` (Vorbild Reiselogbuch).
- **Prüfung:** `tests/offline.mjs` (Fälle F-1 bis F-17; F-17 = Gerät ohne Safari-Meldung).

### 15.21 Messmodus
- **Wozu:** Bewegungsfehler am Gerät (Zittern, Springen, Rollen) werden zuerst **gemessen**, nicht erraten (Zusammenarbeit 0
  Nr. 20). Die App zeichnet auf, was Safari tut; Claude richtet damit das Safari-Modell der Prüfungen aus. Regel R-1.6.
- **Bedienung:** Mehr-Menü der Seitenleiste (iPhone: Startliste), nach Backup durch Abstand getrennt: ‚Messung starten‘
  (`activity`, grau ‚Für Claude: Bewegungen aufzeichnen‘); während und nach der Messung ‚Messung beenden und teilen‘
  (`circle-stop`, grau ‚läuft · 0:42 · 1.318 Zeilen‘ bzw. ‚beendet · …‘). Kein Zeichen auf dem Bildschirm – es würde selbst
  mitrutschen. Teilen-Menü mit `messung-JJJJ-MM-TT-hhmm.txt` (ohne Teilen-Menü: laden); abgebrochen bleibt die Messung.
- **Inhalt:** Kopf mit App, AppDesign, Gerät, Home-Bildschirm/Safari, Bildschirm, Darstellung, Startzeit; dann je Bild eine
  Zeile, **nur wenn sich ein Wert geändert hat**: `t` (ms), `scrollY`, `inh` (Rollstand des Inhalts), Seitenhöhe, `innerHeight`,
  `visualViewport` Höhe und `offsetTop`, `--vv-top`, Oberkante der Teile der App (Kopf, Suchzeile, erster Inhalt …), Rollstand
  eigener Bereiche, Fokus (id), Lage. Ereignisse sofort mit den Werten im Augenblick: focus/blur, Eingabe (Länge), Tippen (id),
  scroll, resize, Drehen, `visualViewport` resize/scroll, Neuaufbau (`setHtml`), und was ui.js bei der Tastatur tut: ‚neu
  fokussiert <id>‘, ‚klick unterdrückt <id>‘, ‚zurückgestellt <id> alt → neu‘, ‚platz weg <id>‘.
- **Berührungen und Gesten:** ‚zeiger down|move|up|cancel x y Art Ziel‘ (Lage in px, Art touch/mouse/pen, ‚neben‘ für einen
  weiteren Finger; move nur bei gedrücktem Zeiger), ‚touchcancel Finger Ziel‘, ‚touchmove frei|verhindert|fest‘ (beim Wechsel:
  Safari darf noch rollen, die Geste hält den Finger, Safari rollt schon). Ziel ohne Texte: id bzw. Tag mit Klassen und Rolle,
  ‚in …‘ das antippbare Element darum, ‚@…‘ die nächste id (z. B. ‚span in div.box.day[button] @app‘). Dazu die Entscheidungen der
  Gestenstelle (R-7.5): ‚nav kandidat <art>‘ bzw. ‚nav kein kandidat [eigen]‘, ‚nav verworfen richtung|gehalten|offen dx dy‘,
  ‚nav aktiv <art> dx dy‘, ‚nav fertig|zurück gefedert|abgebrochen weg W tempo T‘ (Weg als Anteil der Breite, Tempo in px/ms),
  ‚nav abgebrochen vor der entscheidung‘, ‚nav abgebrochen drehen‘ – sie stehen vor der Zeigerzeile desselben Augenblicks.
- **Grenzen:** aus, solange nicht gestartet (kein `requestAnimationFrame`, keine Hörer); keine Texte; nichts gespeichert (neu laden
  verwirft); Ende nach 5 Minuten oder 20 000 Zeilen.
- **Technisch:** `ui.js` – `messungMenuItems({ app, teile, rollen })` ins Menü der Seitenleiste; `teile`/`rollen` = Spalte →
  Selektor (erstes sichtbares Element). Prüfung `checkMessung` (Fall-Liste `arbeit/A-27 Fall-Liste.md`, F1–F12), Berührungen und
  Gesten `checkNavigation` F-22 und F-23 (`arbeit/A-67 Fall-Liste.md`).
- **Abspielen:** Messdateien liegen in `tests/messungen/` (nur Zahlen, Längen und ids, keine Texte) und laufen in den Prüfungen
  der App mit: `tests/abspielen.mjs` – `lies(text)` (Kopf, Spalten, Zeilen; Fehler mit Zeilennummer), `ansicht(m)` (Größe und
  Darstellung des Geräts), `spieleAb(p, m, { ziele, woerter, bis, nachSchritt })` spielt Tippen, Eingaben und das Schließen der
  Tastatur nach, Safari meldet sichtbare Höhe und `offsetTop` genau wie gemessen (`__safari.setze`). Am Ende jedes Schritts:
  Kopf- und Suchzeile ± 1 px und Fokus wie gemessen; der Inhalt hängt an den eigenen Daten und wird nicht verglichen. Gegenprobe:
  dieselbe Messung um 20 px verschoben wird rot. Grenze: Berührungen und Gesten stehen in der Messung, nachgespielt werden sie nicht –
  dafür bleibt das Safari-Modell.
  Fall-Liste `arbeit/A-26 A-31 A-34 Fall-Liste.md` (2.3, M-1 bis M-6).

### 15.22 Rahmen und Rollbereich
- **Apple:** [HIG – Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views) – wie in den Apps von
  Apple rollt nur der Inhalt unter der Leiste, nie die Leiste selbst.
- **Zweck:** Die Seite rollt nie, nur der Inhalt; damit hat Safari bei offener Tastatur nichts zu verschieben (13). Regel R-2.1.
- **Aufbau:** `#app` ist ein Rahmen aus festen Zeilen: oben die Kopfzeile (`.nb` bzw. `.pnav`, mit Suchzeile), darunter der
  **Rollbereich** `<div class="rolle" id="rolle">` mit dem ganzen Inhalt. Neben der festen Seitenleiste beginnt der Rahmen rechts
  davon. Tabellenköpfe haften im Rollbereich mit `top: 0`. Keine Feder am Rand (`overscroll-behavior: none` auf `html`/`body`).
- **Höhe:** der Rahmen ist so hoch wie der sichtbare Bereich (`--vv-h`) und endet bei offener Tastatur über ihr – das letzte
  Ergebnis lässt sich bis über die Tastatur rollen; die Kapsel ‚Nach oben / Ans Ende‘ steht über der Tastatur (`--vv-bottom`,
  15.1). Der Platz unter dem Inhalt ist ein Platzhalter am Ende (`.rolle::after`), kein Innenabstand – so wird der Rollbereich nie
  höher als sein Platz. Beim Antippen eines Felds verlängert ui.js ihn um `--platz` (ebenso `.dlg-body::after` im Fenster), damit
  das Feld in die obere Hälfte rollen kann (13); `rolle.ende()` zählt diesen Platz nicht.
- **Verhalten:** Treffer, Nach oben / Ans Ende, Schnellroll-Griff, Öffnen (R-7.4), Drehen (R-8.1), Liste steht still (R-7.3) und
  der Messmodus rollen bzw. messen nur den Rollbereich. Beim Neuaufbau bleibt der Rollbereich dasselbe Element (`setHtml`), der Rollstand bleibt.
  Solange ein Fenster offen ist, steht er still (`html.locked`). Im Druck ist nichts auf Bildschirmhöhe begrenzt (R-6.4).
- **Technisch:** `design.css` (`#app:has(> .rolle)`, `.rolle`), `ui.js` – `rolle` (`rolle.y`, `rolle.max`, `rolle.rest`,
  `rolle.to(y, weich)`, `rolle.by(d)`, `rolle.ende()`, `rolle.halt()`), `onRoll(fn)`, `fabTop()`/`fabEnd()`. Die App ruft **nie**
  `window.scrollTo`. Ohne Rollbereich rollt wie bisher das Fenster (ältere Apps). In Prüfungen rollen und messen `rolle(p, y)` und
  `rollstand(p)` (`pruefe.mjs`); die Regeln dazu prüft der Katalog (R-2.1, R-2.3, R-3.2, R-4.5, R-6.4). Fall-Liste und Muster:
  `arbeit/A-28 Fall-Liste.md`, `arbeit/A-28 Muster.html`.

## 16. HIG-Checkliste

Jedes Muster und jede Version wird **vorher** an dieser Liste gemessen (Apple-Abgleich, Zusammenarbeit 0 Nr. 23); Abweichungen
werden genannt und begründet. Die Spalte ‚Regel‘ nennt, wo der Punkt im Katalog steht und geprüft wird; was darüber hinausgeht,
steht in der Spalte ‚außerdem‘ (ohne automatische Prüfung: G-19).

| Nr. | HIG-Punkt | Regel | außerdem |
|---|---|---|---|
| 1 | **Antippflächen** ([Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)): Standard 44 × 44 pt, nie kleiner als 28 × 28 pt (Knöpfe in Kapseln und Schalter wie bei Apple ab 28 pt) | R-3.1 | kleine Zeichen und Links bekommen eine unsichtbar größere Antippfläche (Innenabstand), das Layout bleibt gleich |
| 2 | **Schrift:** Fließtext 17 pt, kleinste Schrift 11 pt; Überschriften nach Apple-Textstilen (17 halbfett, 20, 22, 28, 34 pt) | R-10.2 | Hinweise und Zusatzzeilen grau (3) |
| 3 | **Kontrast und Farbe:** mindestens 4,5 : 1 bis 17 pt, 3 : 1 ab 18 pt oder fett – immer hell **und** dunkel | R-10.2, R-3.3 | Farbe nie als einziges Merkmal; Blau = Aktion/Auswahl, Rot = Löschen |
| 4 | **Auswahl** ([Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)): was zu einem Inhalt führt, bleibt markiert, solange dieser offen ist | R-3.3 | Optionen kurz markieren, dann Häkchen; jede Berührung gibt sichtbare Rückmeldung |
| 5 | **Menüs** ([Menus](https://developer.apple.com/design/human-interface-guidelines/menus)): Gruppen durch Strich getrennt, Untermenüs nur eine Ebene | R-4.1 | Wichtigstes oben; Icons in einer Gruppe alle oder keine, für Standardaktionen die bekannten Symbole (Teilen, Suchen, Löschen); Beschriftung mit Verb; **kein „…“** am Ende (die HIG nennt es für weitere Eingaben, Apples iPhone-/iPad-Apps verwenden es nicht, z. B. ‚Move Note‘); nicht verfügbare Punkte grau; Untermenüs höchstens etwa 5 Punkte |
| 6 | **Kontextmenüs** ([Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus)): ganz sichtbar, ohne ‚Öffnen‘ | R-4.2 | wenige Punkte, höchstens etwa 3 Gruppen; Häufigstes nah am Finger, Löschen rot am Ende; nicht verfügbare Punkte **ausblenden** statt grau; alles auch ohne Kontextmenü erreichbar; in der ganzen App einheitlich |
| 7 | **Abfragen:** Schaltfläche heißt wie die Aktion (‚Löschen‘), ‚Abbrechen‘ ist immer da | R-4.3 | Löschen und Verwerfen immer bestätigen (10) |
| 8 | **Texte** ([Writing](https://developer.apple.com/design/human-interface-guidelines/writing)): deutsch, Anführungszeichen ‚…‘ | R-10.1 | einfach, ohne Fachbegriffe, so kurz wie möglich; kein ‚wir‘; ‚tippen‘ statt ‚klicken‘; Fehlermeldungen sagen, **was zu tun ist** – ohne Vorwurf, direkt beim Problem; ein leerer Bildschirm nennt den nächsten Schritt; ein Schalter beschreibt, was er eingeschaltet tut |
| 9 | **Fenster:** links x (Abbrechen), rechts Häkchen (Fertig), hervorgehoben, sobald etwas geändert wurde; Schließen mit Änderungen fragt nach | R-4.4 | – |
| 10 | **Sichere Ränder** ([Layout](https://developer.apple.com/design/human-interface-guidelines/layout)): nichts Bedienbares unter Dynamic Island, Ecken oder Home-Leiste; Inhalt darf darunter rollen | R-1.7 | – |
| 11 | **Textfelder** ([Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields)): ⓧ zum Leeren beim Bearbeiten; Suche ohne Akzente | R-5.6, R-2.3 | – |
| 12 | **Schalter** ([Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles)): gleitet, ziehbar, Haptik, VoiceOver ‚Schalter‘ | R-5.7 | Haptik und Ziehen nur am Gerät |

**Bewusste Abweichungen** (entschieden, werden vom HIG-Prüfskript nicht als Fehler gezählt):

| Was | Messwert | Grund | Entschieden |
|---|---|---|---|
| Weiße Schrift auf Systemblau (`--accent`): gewählte Zeile, ‚heute‘, Schrittnummern, Häkchen | 4,0 : 1 hell · 3,7 : 1 dunkel | Apple-Systemblau wie in allen Apple-Apps | 09.10.2026 |
| Orange `--warn` (z. B. ‚fehlt‘) | 3,1–3,5 : 1 | bleibt wie es ist | 09.10.2026 |
| Kapsel ‚Nach oben / Ans Ende‘ auch auf dem iPhone (Apple: Statusleiste antippen bzw. Scroll-Leiste ziehen) | – | der Apple-Weg war dem Nutzer zu schwerfällig (R-3.2); das Ziehen der Scroll-Leiste gibt es dazu als Schnellroll-Griff | 17.10.2026 |

## 17. Regelkatalog

Jede allgemeine Regel steht **nur hier**, nach Themen geordnet; die Abschnitte 1–16 beschreiben Werte und Bauteile (Spalte
‚Bau‘) und verweisen auf die Regel. Nummer `R-<Thema>.<Nr>` (z. B. R-6.2 = Thema 6, Regel 2) – eine neue Regel wird in ihr Thema
eingefügt, ohne die anderen umzunummerieren, und bekommt sofort Nummer und Prüfung (Zusammenarbeit 0 Nr. 3).

**Prüfung:** je Regel eine automatische Prüfung in `tests/` (AppDesign): `hig.mjs` misst jede Ansicht jeder App, `ablauf.mjs`
prüft Regeln, die eine Handlung brauchen (die App ruft sie mit ihren Fenstern auf), dazu `kontextmenue.mjs`, `start.mjs`,
`backup.mjs`, `abgleich.mjs`, `offline.mjs`, `version.mjs`, `doku.mjs`. Jede Meldung beginnt mit der Regelnummer.
`checkCatalog` (`doku.mjs`) prüft, dass jede Regel eine Prüfung hat und keine alte Nummer mehr verwendet wird. **Grundregeln:**
die Ablauf-Prüfungen der Apps messen nach jedem Schritt mit denselben Prüfungen aus `hig.mjs` (ohne Drehen) – keine zweite
Prüfung je Regel, nur mehr Zustände. Safari nachgebildet (13): Tastatur über `visualViewport`, kein Fokus beim Antippen einer
Schaltfläche, kein Scroll-Anker; jede Prüfung zusätzlich in WebKit. **Gerät** = zusätzlich am iPad/iPhone zu prüfen; kommt in
die Prüfliste, wenn eine Version es betrifft.

### 1. Aufbau und Grundsätze

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-1.1 | **Gleiche Funktion = gleicher Baustein, gleiche Bedienung** auf iPad und iPhone: eine Umsetzung, nur die Anordnung unterscheidet sich (Seitenleiste = Startliste); Aktionen und Suche oben in der Kapsel, unten nur feste Hinweise (Backup-Kachel) | hig.mjs – Gerätevergleich des Aufbaus | – | 1, 15.17 |
| R-1.2 | **Darstellung** folgt dem Gerät (‚Automatisch‘), im Mehr-Menü übersteuerbar (Automatisch · Hell · Dunkel) | hig.mjs | – | 2 |
| R-1.3 | **Nie ungewollt vergrößern:** Doppeltippen vergrößert nicht; Eingabefelder mindestens 16 px (sonst vergrößert iOS beim Antippen) | hig.mjs | iOS-Tastatur | 1, 15.11 |
| R-1.4 | **Nur der Vordergrund reagiert:** offenes Fenster sperrt die Seite, Menü und Sprechblase fangen Wischen ab, daneben tippen schließt | hig.mjs | – | 1 |
| R-1.5 | **Offline nutzbar und erkennbar:** die App startet ohne Netz aus dem Speicher – auch unter anderer Adresse und bei hängendem Netz nach höchstens 3 s, nie eine weiße Seite; arbeitet sie offline, steht unten in Seitenleiste bzw. Startliste (unter der Backup-Kachel bzw. ohne sie) grau ‚Offline – alles bleibt auf diesem Gerät‘, beim Wechsel und beim Start ohne Netz kurz die Meldung ‚Du bist offline‘ bzw. ‚Wieder online‘ | offline.mjs | Gerät (Flugmodus) | 11, 15.20 |
| R-1.6 | **Messmodus:** im Mehr-Menü der Seitenleiste bzw. Startliste ‚Messung starten‘ (grau ‚Für Claude: Bewegungen aufzeichnen‘) und ‚Messung beenden und teilen‘ (grau ‚läuft · m:ss · N Zeilen‘); aus, solange nicht gestartet; je Bild eine Zeile nur bei Änderung, dazu jedes Ereignis; keine Texte (nur Längen und ids); endet nach 5 min bzw. 20 000 Zeilen; Datei `messung-JJJJ-MM-TT-hhmm.txt` über das Teilen-Menü; neu laden verwirft | ablauf.mjs – `checkMessung` | Gerät (Messung, Teilen) | 15.21 |
| R-1.7 | **Sichere Ränder:** nichts fest Stehendes (Knopf, Feld, Titel, Kachel, Leiste) liegt unter Statusleiste bzw. Dynamic Island, Aussparung oder Home-Leiste; Fenster, Menüs und Sprechblasen bleiben ganz innerhalb (am iPad mindestens 10 px bzw. der sichere Rand, das iPhone-Fenster füllt den Bildschirm); Inhalt darf darunter rollen, sein Ende lässt sich bis über die Home-Leiste rollen. `env(safe-area-inset-*)` nur in `--safe-top/-bottom/-left/-right` | hig.mjs – `safe` in jeder gemessenen Ansicht mit Gerätewerten (iPhone hoch 62/34, quer 62 links und rechts/20 unten, iPad 24/20); doku.mjs – nur die vier Festlegungen | Dynamic Island, Home-Leiste | 13 |

### 2. Leisten, Suche, Rollen

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-2.1 | **Leisten stehen fest – keinen Millimeter:** Kopfzeile, Seitenkopf, Seitenleisten-Kopf, mit und ohne Suchzeile, beim Wischen, am Rand, bei offener und beim Schließen der Tastatur; nichts federt; erstes Wischen bei offener Tastatur schließt nur die Tastatur. **Die Seite rollt nie, nur der Inhalt** – Rahmen mit festen Zeilen und Rollbereich, so hoch wie der sichtbare Bereich | hig.mjs – `barStill`: Lage der Leiste beim Rollen des Inhalts gemessen, auch mit nachgebildeter Tastatur; Grundregel ‚Seite rollt nie‘ (`scrollY` bleibt 0) | Federn, Tastatur, Wischgefühl | 13, 15.22 |
| R-2.2 | **Titel in der Leiste:** Titel einer Inhaltsseite steht in der Leiste; unter dem Titel der Seitenleiste bzw. Startliste klein und grau die Anzahl | hig.mjs | – | 15.4, 15.17 |
| R-2.3 | **Suche:** Suchzeile unter der Leiste über die volle Breite; Treffer ‚3 von 57‘ bzw. ‚0‘; nach kurzer Pause steht der Treffer direkt unter der Suchzeile; Pfeile ohne Umlauf; gefiltert auf Einträge mit Treffern; gleich auf iPad und iPhone; beim Tippen bleibt das Suchfeld dasselbe Feld mit Fokus; **mehrere Wörter** (alle müssen vorkommen, Reihenfolge egal, „…“ = genaue Folge, alle markiert; die Einheit legt die App fest); **Lupe am Ende der Kapsel**, dahinter nur ellipsis; **auch in der zentralen Liste** (Lupe im Kopf): filtert die Einträge, Kachel ‚N Treffer‘ je Fundstelle wie ‚1 von N‘, Öffnen mit gefüllter Suche, beide Suchfelder offen = 1:1, ‚Keine Treffer‘; **Suche öffnen und ⓧ rollen den Inhalt ganz nach oben**, der Fokus bleibt im Feld; **ohne Akzente** (‚Zurich‘ findet ‚Zürich‘ und umgekehrt, markiert wird das Wort wie im Text; ß, ø, æ sind eigene Buchstaben) | ablauf.mjs – `checkSearch`, `checkListSearch`, `checkSearchWords`, `checkSearchPlace`, Feld bleibt beim Tippen, `checkSearchTop` | – | 15.2, 15.4, 15.5 |
| R-2.4 | **iPhone quer: niedrige Leisten** (wie iOS quer): Kopfzeile, Suchzeile und Fensterkopf 32 statt 44 px hoch – Knöpfe in Kapseln 31 px, runde Knöpfe 32 × 32 mit Antippfläche 44 × 44, das Suchfeld als Kapsel 32 px (R-3.1: Kapseln ab 28); damit liegen Suche und Felder darunter bei offener Tastatur in der oberen Hälfte (R-4.5). Hoch und am iPad 44 px | hig.mjs – Höhe der Knöpfe und des Suchfelds in Kopfzeile und Fensterkopf (iPhone quer 32, hoch 44) | – | 15.3, 15.8 |

### 3. Schaltflächen

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-3.1 | **Antippflächen** 44 pt, in Kapseln und Schaltern mindestens 28 pt; reine Icon-Schaltflächen quadratisch; **rund ist ein Kreis** – runde Schaltflächen und die Markierung bei Icons in Kapseln (36 × 36) haben gleiche Breite und Höhe | hig.mjs | – | 4, 15.5 |
| R-3.2 | **Schweben und Kapseln:** alle Schaltflächen und Suchfelder schweben (Lichtkante, zierlicher Schatten); mehrere nebeneinander stehen in einer Kapsel; Nach oben / Ans Ende in einer senkrechten Kapsel unten rechts – am iPad und am iPhone in der Inhaltsansicht, nur wenn es etwas zu rollen gibt, **nur mit den Pfeilen, die etwas bewirken** (nah an einem Ende – halbe Höhe des Rollbereichs – fehlt dessen Pfeil; unten fest); sie rollt den Inhalt, steht bei offener Tastatur über ihr und überdeckt **nie Kopf- oder Suchzeile** – passt sie nicht ganz in den Inhalt (volle Kapsel + 2 × 16 px), ist sie ausgeblendet; bei offenem Fenster und im Druck nicht zu sehen. **Schnellroll-Griff** ab drei Höhen Inhalt: erscheint beim Rollen, blendet nach 1,5 s aus (nur Deckkraft), Bahn unter Kopf- bzw. Suchzeile bis über die volle Kapsel, Ziehen springt verhältnisgleich (darüber hinaus = Anfang/Ende), Blase mit der Marke des Abschnitts oben (`data-marke`), Regler für VoiceOver; nicht bei offener Tastatur | hig.mjs (Grundregel ‚Kapsel schneidet keine Leiste‘), ablauf.mjs – `checkFab` (Pfeile je Rollstand, Tastatur quer und Suche, Fenster, Drucken) mit `checkGriff` | Gefühl beim Ziehen, Daumen | 4, 15.1, 15.5 |
| R-3.3 | **Jede Farbe hat eine Bedeutung:** blau gefüllt nur die Hauptaktion im Fenster (höchstens eine); Gewähltes bleibt blau getönt, solange sein Menü, Fenster oder seine Abfrage offen ist; Grün nur für eingeschaltete Schalter; Rot nur für Löschen | hig.mjs – höchstens eine blaue Hauptaktion, `stays` | – | 4 |
| R-3.4 | **Kein Fokus-Rahmen** beim Antippen, beim Öffnen eines Fensters und im Suchfeld | hig.mjs | – | 1, 15.2 |
| R-3.5 | **Langes Drücken** (0,6 s) gilt nur, solange der Finger still steht: wandert er mehr als 10 px oder rollt die Fläche um ihn herum (Leiste seitlich ziehen), ist es abgebrochen – Finger und Maus; kurz antippen bleibt Antippen | ablauf.mjs – `checkLangDruecken` | Smiley-Leiste ziehen | 8, 13, 15.12 |

### 4. Menüs, Abfragen, Fenster

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-4.1 | **Menüs:** Icon vor dem Text, keine Linien zwischen einzelnen Punkten, Gruppen durch eingerückten Strich, ‚… löschen‘ rot am Ende, graue Zusatzinfos unten nach dem Strich, Untermenü eine Ebene | hig.mjs | – | 15.6 |
| R-4.2 | **Kontextmenü** einer Kachel: daneben bzw. (iPhone) darunter, immer vollständig und ganz über der Backup-Kachel (ohne Kachel über der Offline-Zeile bzw. dem Rand); die Liste rückt dafür; ohne ‚Öffnen‘ | kontextmenue.mjs | – | 15.4 |
| R-4.3 | **Abfragen und Meldungen:** keine Systemfenster; Abfrage als Sprechblase an der Schaltfläche, rote Schaltfläche mit dem Verb, ‚Abbrechen‘ zuletzt; mehrere Wege: empfohlener blau zuerst, zerstörender rot; Meldung im kleinen Fenster mit höchstens einer Schaltfläche zu den Einzelheiten | hig.mjs | – | 6, 10, 15.7 |
| R-4.4 | **Fenster-Kopfzeile:** x links, Häkchen rechts – grau, nach einer Änderung blau; x mit Änderungen fragt ‚Änderungen verwerfen‘ / ‚Weiter bearbeiten‘ | ablauf.mjs – `checkDialogHead` | – | 6, 15.8 |
| R-4.5 | **Passt immer auf den Bildschirm:** Menü, Sprechblase und Fenster ganz sichtbar (auch iPhone quer), zu hoher Inhalt rollt darin; Fenster auf dem iPhone als Blatt bis zum unteren Rand bzw. zur Tastatur (R-4.6). Ein Feld mit Fokus steht immer ganz über der Tastatur – in Fenstern und im Inhalt, 16 px darüber (reicht der Platz nicht, oben unter Kopf- bzw. Suchzeile, mit Platz für Fokus-Umrandung und Schatten) – und zwar **ohne Springen**: beim Antippen rollt das Feld in die obere Hälfte, Safari verschiebt nichts; Kopfzeile, Suchzeile, Seitenleiste und Fensterkopf stehen in jedem Bild still, das Feld springt nicht, das iPad-Fenster gleitet mit der Tastatur | hig.mjs, ablauf.mjs – `checkFieldVisible` (Safari-Modell: Feld unter der Tastatur antippen), `checkTastaturStill` (jedes Bild), `checkSheet` B10 (Abstand über dem Feld ≥ `RING`) | – | 7, 13, 15.7 |
| R-4.6 | **Blatt auf dem iPhone:** im iPhone-Aufbau (hoch und quer) ist jedes Fenster außer Meldungen ein Blatt ‚nur groß‘ wie ‚Neuer Termin‘ – gleitet von unten bis knapp unter die Statusleiste, oben runde Ecken, die Seite dahinter weicht verkleinert und abgedunkelt zurück (quer volle Höhe, die Seite bleibt); nach unten ziehen schließt wie x – am Kopf immer, im Inhalt, wenn er ganz oben steht, auch kurz und schnell gewischt; waagerecht und im gerollten Inhalt bleibt es; mit Änderungen seit dem Öffnen zieht es sich zäh, federt zurück und fragt am x (R-4.4); ein Zug nach unten schließt zuerst die Tastatur, auch nach einem Stück nach oben – beginnt er auf einem Feld, zieht er im selben Zug das Blatt wie am Kopf (ein Feld, das selbst gerollt ist, rollt weiter), im gerollten Inhalt daneben rollt er weiter; Abdunkelung antippen und Escape wie x; Drehen lässt es offen; ‚Bewegung reduzieren‘: Überblenden. Am iPad bleibt das Fenster in der Mitte und schließt nur mit x, Häkchen oder Escape | ablauf.mjs – `checkSheet` | Gerät (Wischgefühl, Tastatur) | 7, 13, 15.17 |

### 5. Eingaben

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-5.1 | **Felder:** Bezeichnung und Feld gehören zusammen (Umbruch nur davor); Schaltflächen im Schrittkopf bleiben als Gruppe zusammen und stehen neben dem Titel, wenn alles in eine Zeile passt; Datumsfelder so breit wie das Datum mit Kalender-Icon; Betragsfelder rechtsbündig, ‚4.850,00 €‘ | hig.mjs | – | 8, 15.10 |
| R-5.2 | **Texteingabe:** Großbuchstabe am Zeilenanfang und nach einem Vorschlag, nicht nach einer Korrektur von Hand; keine doppelten Leerzeichen (Tippen und Einfügen, alle Textfelder); Textfelder wachsen mit; Diktieren nur über die Mikrofon-Taste der Tastatur (kein eigener Knopf) | ablauf.mjs – `checkCapital`, `checkSpaces` | iOS-Tastatur, Kurzbefehl ‚.‘ | 8 |
| R-5.3 | **Fehlermeldungen:** rot direkt unter dem Feld (Feld rot umrandet), erst nach einer Eingabe bzw. beim Häkchen; Pflichtfelder werden nicht gekennzeichnet | ablauf.mjs – `checkFieldErrors` | – | 8, 15.11 |
| R-5.4 | **Auswahl-Kapsel:** mehrere Auswahl-Schaltflächen in einer Kapsel, seitlich wischbar; wo es weitergeht, Verlauf und kleiner Pfeil am Rand (nur Anzeige), am jeweiligen Ende verschwinden beide; Markierung als eigene Form innen, Breite ändert sich nicht | hig.mjs – Verlauf und Pfeile am Rand, Breite beim Wählen (Ablauf: `checkKapsel`) | Wischen, Pfeile verständlich | 15.12 |
| R-5.5 | **Eingabetaste:** einzeilige Felder – ‚Fertig‘, die Eingabetaste schließt die Tastatur, ein Fenster bleibt offen; mehrzeilige Felder – Zeilenumbruch; Suchfeld – ‚Suchen‘ | ablauf.mjs – `checkEnterDone` | iOS-Tastatur (Beschriftung, iPhone-Ziffernfeld) | 8 |
| R-5.6 | **ⓧ in einzeiligen Feldern:** solange ein einzeiliges Textfeld den Fokus hat und etwas drinsteht, rechts darin ein graues ⓧ (44 × 44, Text läuft nicht darunter); Antippen leert, Cursor und Tastatur bleiben, die App erfährt es; rollt mit, bleibt nach dem Drehen am Feld; nicht in mehrzeiligen, Datums- und Suchfeldern | ablauf.mjs – `checkClear` | Antippen, Tastatur bleibt | 15.11 |
| R-5.7 | **Schalter:** Safaris eingebauter Schalter (`switch`, `role="switch"` – VoiceOver ‚Schalter‘), von Safari gezeichnet in Grün; ohne ihn unser Schalter 51 × 31 | hig.mjs – Attribute, Größe ohne, Systemaussehen und Grün mit eingebautem Schalter (nachgebildet) | Aussehen, Gleiten, Ziehen, Haptik, VoiceOver | 15.15 |

### 6. Tabellen, Kästen, Ausgabe

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-6.1 | **Tabelle und Kasten in der App:** Kopf grau, Linien zwischen allen Spalten, **Zebra je Tabellenzeile** (zusammengefasste erste Spalte = eine Zeile), gelbe Markierung ohne blauen Rand; Kasten mit Feldern (iPhone) mit Linien waagrecht und senkrecht | hig.mjs (Zebra auch in App-Tabellen) | – | 9, 15.10 |
| R-6.2 | **Mustertabelle der Ausgabe** (`outputCss`): jede Tabelle in Ausgabe, Vorschau und Bericht, Zebra je Tabellenzeile, keine eigene Nachbildung | hig.mjs – Vergleich mit unsichtbarer Mustertabelle | – | 10, 15.18 |
| R-6.3 | **Kein Text ragt hinaus:** zu lange Wörter und Smiley-Reihen brechen um, hängender Einzug (Folgezeilen unter dem Text) – überall, auch in Fenstern, Vorschauen, Berichten | hig.mjs – jede sichtbare Zelle, auch nach seitlichem Wischen (100 × ‚a‘) | – | 9 |
| R-6.4 | **Ausgabe und Vorschau:** immer hell; Vorschau zeigt genau die Datei, in voller Seitenbreite, seitlich wischen (iPad und iPhone); Kapsel [PDF · Teilen]; Dateinamen nach Muster; das PDF druckt die ganze Ausgabe, nie nur einen Bildschirm | ablauf.mjs – `checkPreview`, `checkPrint` | Teilen, Drucken | 7, 10, 15.22 |

### 7. Seitenleiste und Liste

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-7.1 | **Zentrale Liste als Kacheln:** höchstens ein Eintrag blau; je Kachel ‚geändert am … · Gerät‘; Kacheln laufen unter dem Kopf und hinter der Backup-Kachel durch; Position bleibt beim Neuaufbau, der gewählte Eintrag bleibt sichtbar | hig.mjs | – | 15.4 |
| R-7.2 | **Start im iPhone-Aufbau in der Startliste:** jedes Neuladen zeigt im iPhone-Aufbau (auch iPad im schmalen Fenster) die Startliste ganz oben ohne blauen Eintrag; der iPad-Aufbau öffnet den aktuellen Eintrag; Rückkehr aus dem Hintergrund ändert nichts | start.mjs | Gerät (App neu öffnen) | 13, 15.17 |
| R-7.3 | **Liste steht still:** solange ein Fenster aus einer Zeile (bzw. einem Kasten) offen ist, bewegt sich die Liste dahinter nicht – auch wenn Safari beim Schreiben die Seite für die Tastatur schiebt; nach dem Schließen (Häkchen oder x) steht sie genau wie vorher – die oberste Zeile an derselben Stelle, auch wenn die Tastatur offen war –, die Zeile wird 2 s blau hinterlegt und blendet in 1 s aus (‚Bewegung reduzieren‘: 2 s ohne Ausblenden; endet, sobald das nächste Fenster aufgeht); auch nach ‹ › im Fenster steht die Liste wie beim Öffnen; iPad und iPhone gleich | ablauf.mjs – `checkListStill` (Start z. B. mit dem ersten fehlenden Tag oben; Zeile oben, 3 tiefer, untere Hälfte, 2 px unter dem Kopf, nach 5× ‹ ›; Häkchen und x; Safari-Tastatur einzeln und zusammen: sichtbarer Bereich, Fensterhöhe, Nachrollen beim Zugehen) | Gerät (echte Tastatur, Diktieren) | 7, 15.9 |
| R-7.4 | **Position beim Öffnen:** ein Eintrag öffnet ganz oben; ein ‚nächster offener‘ Eintrag (von der App bestimmt) steht hervorgehoben direkt unter dem Kopf bzw. Tabellenkopf, nie in der Mitte; legt die App stattdessen einen aktuellen Eintrag fest (z. B. heute), steht er ebenso direkt unter dem Kopf, aber ohne Hervorhebung – hervorgehoben wird nur Offenes, nie Künftiges | ablauf.mjs – `checkOpenAt` (mit `markiert`) | – | 13 |
| R-7.5 | **Navigation und Gesten** (wie iOS 26): im iPhone-Aufbau schiebt sich der Inhalt beim Öffnen herein und beim Zurück hinaus; **Zurückwischen von überall im Inhalt** folgt dem Finger, fertig nach halber Breite oder schnellem Wischen, sonst federt es zurück; am iPad hoch holt Wischen nach rechts von überall die Seitenleiste, nach links auf ihr bzw. der Abdunkelung geht sie, panel-left und Abdunkelung lassen sie gleiten; quer holt Wischen nach rechts die ausgeblendete Seitenleiste herein, der Inhalt rückt mit und wird beim Einrasten schmaler, ausblenden quer nur mit panel-left (gleitet). Vorrang an einer Stelle: senkrechtes Rollen, eigenes waagrechtes Rollen, Felder, Knöpfe, Kapseln, Schnellroll-Griff; nicht nach langem Drücken und nicht bei offenem Fenster, Menü oder offener Sprechblase; Tastatur schließt zuerst; Drehen beim Ziehen = Zustand wie vorher; Wischen tippt nie an; ‚Bewegung reduzieren‘ überblendet; je Bild nur transform und opacity | ablauf.mjs – `checkNavigation` | Wischgefühl, Rand mit dem Daumen, versehentliches Zurück, Home-Bildschirm-App, VoiceOver | 13, 15.4, 15.17 |

### 8. Drehen

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-8.1 | **Drehen ändert nur die Anordnung:** offene Menüs, Untermenüs und Sprechblasen werden neu ausgerichtet (Schaltfläche bleibt blau); die Seitenleiste behält ihren Zustand; oben bleibt derselbe Eintrag stehen (Safari nachgebildet) – ebenso bei jeder anderen Änderung der Anordnung, z. B. Seitenleiste ein/aus | hig.mjs – Drehprüfung jeder Ansicht, hin und zurück, mit Zwischengrößen; ablauf.mjs – `checkSideToggle` | Drehen | 13, 15.4, 15.6 |

### 9. Backup und Abgleich

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-9.1 | **Backup erstellen:** Backup-Kachel nur, solange heute auf diesem Gerät keines erstellt wurde und es Einträge gibt (kommt um 0:00 wieder), Mehr-Menü mit ‚Letztes Backup …‘; Teilen-Menü; Dateiname; Fenster ✅/⚠️; zählt nur abgeschlossen, je Gerät | backup.mjs | iCloud, Teilen | 15.19 |
| R-9.2 | **Backup laden:** Abfrage mit Zeitpunkt, Gerät und ‚neuer/älter‘; Kacheln Abgleichen (blau) und Ersetzen (rot) mit Erklärung; unlesbare Datei ⚠️; Abbrechen ändert nichts | backup.mjs | – | 15.19 |
| R-9.3 | **Abgleichen:** je Feld gilt das Neuere; leere Felder überschreiben nichts; Gelöschtes bleibt gelöscht, solange danach nicht geändert (Hinweis nennt die Geräte); Zähler: größerer Wert; Einstellungen je Gerät | abgleich.mjs (Fälle 1–20) | – | 15.18 |
| R-9.4 | **Ergebnis:** kleines Fenster ohne Einzelheiten, Schaltfläche ‚Abgleichbericht anzeigen‘ nur bei Inhalt; Bericht als Vorschau wie die Ausgabe | abgleich.mjs | – | 15.18 |

### 10. Texte und Versionen

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-10.1 | **Texte:** deutsch, kein ‚OK‘/‚Close‘/‚Cancel‘; Anführungszeichen ‚…‘; gleiche Aktion = gleiche Bezeichnung und gleiches Icon überall; Teilen nur als Icon; die Feldnamen des Abgleichberichts heißen wie in der App | hig.mjs – auch Icon je Bezeichnung über alle Ansichten; Feldnamen: doku.mjs | – | 5, 6, 12 |
| R-10.2 | **Lesbarkeit:** Schrift mindestens 11 pt; Kontrast 4,5 : 1 bzw. 3 : 1, hell und dunkel | hig.mjs | – | 3, 16 |
| R-10.3 | **Versionskopplung:** ui.js/design.css aus der festen Fassung `fassung/X.Y.Z/` (index.html, sw.js), Fassungen unverändert (Prüfsummen), `v4/` = neueste Fassung; Versionen stimmen überein, sonst Hinweis beim Start; Versionszeile nennt AppDesign | version.mjs | – | 11, 14 |
| R-10.4 | **README ‚Verwendete Versionen‘** ganz oben, je Version und Link | doku.mjs – `checkDocs`; Katalog selbst: `checkCatalog` | – | 11 |

### Regeln ohne automatische Prüfung

Diese Gestaltungsregeln stehen an ihrer Stelle in 1–16 und haben (noch) keine allgemeine automatische Prüfung. Geprüft werden sie
**beim Apple-Abgleich vor dem Muster und im Apple-Review nach der Version** (Zusammenarbeit 0 Nr. 23, 2.3 – ‚Sicht‘), teils am
**Gerät** oder in den **Abläufen der App** (Reiselogbuch: `ablauf-gesamt.mjs` u. a.). Automatische Prüfungen dafür: Backlog A-40.

| Nr. | Regel | Stelle | Prüfung |
|---|---|---|---|
| G-1 | keine Hover-Farbe auf dem iPad | 4 | Sicht |
| G-2 | gesperrt 40 % Deckkraft; ‚Abbrechen‘ ohne Icon, normale Schrift | 4, 15.15, 15.16 | Sicht |
| G-3 | Icon-Zuordnung der Tabelle (gleiche Bezeichnung = gleiches Icon prüft R-10.1) | 5 | Sicht |
| G-4 | Menüpunkt und Fenster heißen gleich; Systembeschriftungen bleiben | 6 | Sicht |
| G-5 | Fensterbreite höchstens 90 %, mindestens 480 px, Erfassung und Vorschau bis 1100 px | 7 | Sicht |
| G-6 | ‚Neues …‘ öffnet einmal von selbst, leere Seite mit grauem Hinweis | 7 | Abläufe der App |
| G-7 | automatisches Speichern alle 10 s; ‚Änderungen verwerfen‘ stellt den Zustand beim Öffnen her | 8 | Sicht |
| G-8 | Beträge: ‚,00‘ ergänzen, Tausenderpunkt beim Tippen | 8 | Abläufe der App |
| G-9 | Smiley-Leiste: Häufigkeit, Entfernen, Zurücksetzen, Anhängen in der Zeile | 8, 15.12 | Abläufe der App (teilweise) |
| G-10 | Tabellenkopf haftet; Links ohne Unterstreichung; Statistik als Liste; Zahlenspalten rechtsbündig | 9 | Sicht |
| G-11 | Speichern über das Teilen-Menü, ehrliche Meldung über Teilen- und Drucken-Menü | 10 | Gerät |
| G-12 | Dateinamen-, Datums- und Zeitformat | 10 | teilweise `checkPreview` (R-6.4) |
| G-13 | Sicherheitsabfrage vor jeder Lösch-, Ersetz- oder Rücksetz-Aktion | 10, 16 | Abläufe der App (Löschen) |
| G-14 | Service Worker ‚network first‘; Versionsnummer, Erstellungszeitpunkt und Cache-Name steigen mit jeder Version | 11 | teilweise `offline.mjs`, `version.mjs`; Veröffentlichungs-Skript |
| G-15 | `[hidden]`-Regel bei Elementen mit `display`; Emoji-Varianten gleich behandeln | 13 | Sicht |
| G-16 | Filter beim Öffnen und beim Start auf ‚Alle‘ | 15.3 | Abläufe der App |
| G-17 | Menü 340 px, Einträge 46 px; Untermenü höchstens etwa 5 Punkte | 15.6 | Sicht |
| G-18 | Info-Icon; Schalterzeilen 52 px; Options-Kapsel Schrift 15 px | 15.14–15.16 | Sicht |
| G-19 | HIG ‚außerdem‘: Farbe nie einziges Merkmal; kein ‚…‘ am Menüende, Icons einer Gruppe alle oder keine; im Kontextmenü Unverfügbares ausblenden, höchstens etwa 3 Gruppen; Texte ohne ‚wir‘, ‚tippen‘ statt ‚klicken‘, ein leerer Bildschirm nennt den nächsten Schritt | 16 | Sicht |

**Aus dem Katalog genommen:** R-50 (Prüfliste mit /0, Meldung je Gerät) ist Arbeitsregel der Zusammenarbeit (2.3); Prüfung
`doku.mjs`.

### Zuordnung alt → neu

Die alten Nummern R-01 bis R-52 gelten nicht mehr; sie stehen nur noch in Versionsgeschichten und Changelogs.

| alt | neu | alt | neu | alt | neu | alt | neu |
|---|---|---|---|---|---|---|---|
| R-01 | R-1.4 | R-14 | R-10.1 | R-27 | R-5.1 | R-40 | R-4.2, R-8.1 |
| R-02 | R-3.4 | R-15 | R-4.1 | R-28 | R-2.1 | R-41 | R-9.2 |
| R-03 | R-1.1 | R-16 | R-3.3 | R-29 | R-6.3 | R-42 | R-9.3 |
| R-04 | R-1.3 | R-17 | R-5.2 | R-30 | R-6.1 | R-43 | R-9.3 |
| R-05 | R-2.1 | R-18 | R-4.5 | R-31 | R-7.1 | R-44 | R-9.4 |
| R-06 | R-5.1 | R-19 | R-3.2 | R-32 | R-1.1 | R-45 | R-9.1 |
| R-07 | R-5.2 | R-20 | R-1.3 | R-33 | R-1.2 | R-46 | R-9.2 |
| R-08 | R-6.1 | R-21 | R-2.2 | R-34 | R-10.1 | R-47 | R-8.1 |
| R-09 | R-2.2 | R-22 | R-3.2 | R-35 | R-3.2 | R-48 | R-10.3 |
| R-10 | R-9.1 | R-23 | R-4.3, R-10.1 | R-36 | R-1.1 | R-49 | R-10.4 |
| R-11 | R-3.1 | R-24 | R-10.1 | R-37 | R-6.3 | R-50 | Zusammenarbeit 2.3 |
| R-12 | R-10.2 | R-25 | R-6.1 | R-38 | R-4.3 | R-51 | R-8.1 |
| R-13 | R-10.2 | R-26 | R-5.1 | R-39 | R-4.5 | R-52 | R-6.2 |

Die Spalte ‚ersetzt‘ (bis 4.28.1) nannte zusätzlich, welche Regeln aus früheren Abschnitten bzw. Backlog-Punkten neu dazukamen:
R-2.3 (15.2), R-4.4 (6, 15.8, HIG 9), R-5.3 (8), R-5.4 (15.12), R-5.5 (A-14), R-6.4 (7, 10), R-7.2 (T-84), R-7.3 (A-13), R-7.4
(A-16), R-1.6 und R-2.4 neu; R-3.3 umfasst auch Abschnitt 4, R-6.1 auch F-3, R-6.4 auch F-4, R-7.1 auch einen Teil von R-44.

## Versionsgeschichte

| Version | Datum | Art | Inhalt |
|---|---|---|---|
| 4.34.0 | 24.10.2026 | Neben | **A-74:** R-9.1 und 15.19 – die Backup-Kachel steht nur noch, solange heute auf diesem Gerät kein Backup erstellt wurde (und es Einträge gibt); danach verschwindet sie statt weiß zu werden, um 0:00 bzw. bei der Rückkehr am nächsten Tag kommt sie wieder (`onNeuerTag`); ‚Letztes Backup …‘ im Mehr-Menü; R-1.5 / 15.20 – die Offline-Zeile steht auch ohne Kachel und bei leerer Liste unten; R-4.2 und 15.4 – ohne Kachel über der Zeile bzw. dem Rand; Prüfungen `backup.mjs`, `hig.mjs`, `kontextmenue.mjs` (nur sichtbare Einträge), `offline.mjs` (F-16 ohne Kachel) |
| 4.33.0 | 24.10.2026 | Neben | **A-75:** R-5.4 und 15.12 – wo die Auswahl-Kapsel weitergeht, steht im freien Rand (28 px) des Verlaufs (48 px) ein kleiner Pfeil `chevron-left`/`-right` (14 px, `--muted`, nur Anzeige), der am jeweiligen Ende in 0,2 s ausblendet; bewusste Abweichung von Apple (am iPhone keine Pfeile); Prüfungen `hig.mjs` (Pfeil genau dann, wenn es weitergeht) und `checkKapsel`. **A-76:** neu R-3.5 langes Drücken – Ziehen über 10 px oder Rollen bricht ab (8, 13, 15.12); Prüfung `checkLangDruecken` |
| 4.32.2 | 24.10.2026 | Korrektur | **A-73 (P-69/3):** R-4.6 – ein Zug, der zuerst nach oben (oder waagerecht) geht und das Blatt nicht zieht, schließt die Tastatur, sobald der Finger danach 8 px unter seinen höchsten Punkt geht (13 Blatt ziehen, neue Safari-Eigenheit: Zeigerbewegungen kommen beim Rollen weiter); R-4.5 – reicht der Platz nicht, steht das Feld mit Platz für Fokus-Umrandung und Schatten unter Kopf- bzw. Suchzeile statt direkt am Rand (13) |
| 4.32.1 | 24.10.2026 | Korrektur | **A-71 (P-68/2.3):** R-4.6 – ein Zug, der bei offener Tastatur auf einem Feld beginnt, zieht das Blatt im selben Zug wie am Kopf, auch wenn R-4.5 den Inhalt gerollt hat; im gerollten Inhalt daneben schließt er nur die Tastatur (13, 15.17); Prüfung `checkSheet` B10 und B19 mit dem Safari-Modell |
| 4.32.0 | 23.10.2026 | Neben | **A-61 Teil 2 (Variante A):** neu R-4.6 Blatt auf dem iPhone – jedes Fenster außer Meldungen gleitet als Blatt von unten, die Seite weicht zurück, nach unten ziehen schließt wie x, mit Änderungen federt es zurück und fragt (7, 13 Wischgesten, 15.17; R-4.5 angepasst); Prüfung `checkSheet` (B1–B24). **A-69:** R-7.4 erweitert – ein aktueller Eintrag (z. B. heute) steht oben ohne Hervorhebung, hervorgehoben wird nur Offenes (13); `checkOpenAt` mit `markiert` |
| 4.31.0 | 23.10.2026 | Neben | **A-68:** R-7.5 und 15.4 – am iPad quer holt Wischen nach rechts die ausgeblendete Seitenleiste herein, der Inhalt rückt mit (Variante B ‚Mitschieben‘) und wird beim Einrasten schmaler; panel-left gleitet auch quer; ausblenden quer nur mit panel-left; Prüfung `checkNavigation` Q-1 bis Q-12. **A-64, A-65:** R-5.2 und 8 – keine doppelten Leerzeichen (neu `checkSpaces`), keine erzwungene Großschreibung nach einer Korrektur von Hand (`checkCapital`) |
| 4.30.2 | 23.10.2026 | Korrektur | **A-67 (Messung P-65):** 13 Wischgesten – Safari bricht auch mit `pan-y` ab 10 px senkrechter Abweichung ab, ist die Geste entschieden, verhindert ui.js `touchmove` (15.17); 15.21 Zeile ‚touchmove‘; Safari-Modell S-10 (`safariWischen`), Prüfung `checkNavigation` F-23 |
| 4.30.1 | 22.10.2026 | Korrektur | **A-67 Schritt 1 und A-66:** 15.21 – der Messmodus zeichnet Berührungen (Zeiger, touchcancel mit Ziel) und die Entscheidungen der Gestenstelle (R-7.5) auf, für die Messung ‚Zurückwischen über einem Tageskasten‘ (P-64/5); Prüfung `checkNavigation` F-22, F-1/F-2/F-19 zeichnen bis zum Ende der Bewegung auf |
| 4.30.0 | 22.10.2026 | Neben | **A-37 B+C und A-61 Teil 1 (Variante ‚Überall‘):** R-3.2 ergänzt – Kapsel ‚Nach oben / Ans Ende‘ nur mit wirksamen Pfeilen, unten fest, bei offenem Fenster und im Druck nicht zu sehen; neu der Schnellroll-Griff mit Blase und Marken `data-marke` (4, 15.1, 15.17, 15.22; A-45 damit entschieden); neu R-7.5 Navigation und Gesten – Seitenwechsel als Schieben, Zurückwischen von überall, Seitenleiste am iPad hoch per Wischen, Vorrang an einer Stelle (15.4, 15.17, 13 Wischgesten); Prüfungen `checkFab` mit `checkGriff`, neu `checkNavigation` |
| 4.29.0 | 22.10.2026 | Neben | **A-63 Paket C und A-42:** neu R-1.7 sichere Ränder (Variablen `--safe-…`, Prüfung mit Gerätewerten; iPad-Fenster, Menüs und Sprechblasen halten Abstand), R-5.6 ⓧ in einzeiligen Feldern (15.11), R-5.7 Safaris eingebauter Schalter (15.15, G-18 ohne Schaltergröße); R-2.3 Suche ohne Akzente (15.2); 1 Grundsatz ‚kein UI-Framework‘; 13 sichere Ränder und Schalter; HIG-Checkliste 10–12 |
| 4.28.2 | 21.10.2026 | Korrektur | **A-39 Konsolidierung (keine neue Regel):** Regeln nur noch im Katalog (17), die Abschnitte 1–16 verweisen darauf; Geschichte (‚seit …‘, A-/T-/P-Nummern, ‚Nutzer …‘, ‚vorher …‘) nur noch hier; Katalog mit Spalte ‚Bau‘ statt ‚ersetzt‘ (Inhalt unter ‚Zuordnung alt → neu‘), neu die Liste ‚Regeln ohne automatische Prüfung‘ G-1 bis G-19 (Prüfungen dafür: Backlog A-40); HIG-Checkliste 16 als Zuordnung HIG-Punkt → Regel, dazu die bewusste Abweichung ‚Nach oben / Ans Ende auch am iPhone‘ aus der App-Richtlinie; 11 nimmt die Versionsregeln der Zusammenarbeit (bisher §8) auf; 12: die App-Richtlinie enthält nur Abweichungen, alles andere App-Eigene steht in PROMPT.md (Nutzer 21.10.2026, F-5); 13 heißt ‚Safari und iPad – technische Erfahrungen‘ und nennt nur den heutigen Stand; überholte Stellen dem gebauten Stand angeglichen (F-7): Hinweise 14 px, Zusatzzeilen 13 px (3, HIG 2), Startliste mit [plus \| search \| ellipsis] (15.17) |
| 4.28.1 | 21.10.2026 | Korrektur | **A-36 (P-60): Tastatur ohne Springen** – R-4.5 ergänzt: beim Antippen rollt das Feld in die obere Hälfte und bekommt einen neuen Fokus, Safari verschiebt nichts; Rückstellung, Platz unter dem Inhalt (`--platz`), Klick nach dem Rollen unterdrückt, Tastatur-Taste (iPad) gibt den Fokus ab, ‚Nach oben / Ans Ende‘ bei offener Tastatur mit einem Antippen, iPad-Fenster gleitet, `isPhone()` und Kapsel nach der Höhe ohne Tastatur (Abschnitte 7, 13 mit S-1 bis S-9, 15.21, 15.22); **R-2.4 neu:** iPhone quer niedrige Leisten 32 px (15.3, 15.8); Prüfungen `checkTastaturStill` erweitert, R-2.4 in `hig.mjs` |
| 4.28.0 | 20.10.2026 | Neben | **A-35:** R-4.5 ergänzt – ein Feld mit Fokus steht immer ganz über der Tastatur, auch im Inhalt (16 px darüber, sonst direkt unter Kopf- bzw. Suchzeile; `fieldIntoView`, Abschnitt 7); neue Safari-Eigenheit in 13 (Feld unter der Tastatur: Safari verschiebt nur den sichtbaren Bereich, quer 232 px; Zifferntastatur 170 px sichtbar); `checkFieldVisible`, Safari-Modell erweitert. **A-31:** Messung abspielen (15.21, `tests/abspielen.mjs`, Messdateien in `tests/messungen/`). A-26 entfällt (Datumsfelder bleiben) |
| 4.27.1 | 19.10.2026 | Korrektur | **A-33 (P-58/2):** R-3.2 ergänzt – die Kapsel ‚Nach oben / Ans Ende‘ überdeckt nie Kopf- oder Suchzeile, passt sie nicht ganz in den Inhalt, ist sie ausgeblendet (`updateFab`, 15.17, 15.22); Platz unter dem Inhalt als Platzhalter `.rolle::after` statt Innenabstand; `checkFab` mit Tastatur quer (126 px) und Suche, Grundregel ‚Kapsel schneidet keine Leiste‘ |
| 4.27.0 | 19.10.2026 | Neben | **A-28 Umbau B (Variante B1):** Die Seite rollt nie, nur der Inhalt – Rahmen mit festen Zeilen und Rollbereich `rolle`, so hoch wie der sichtbare Bereich (neu 15.22, R-2.1 ergänzt, 15.3); **A-29:** Suche öffnen und ⓧ rollen ganz nach oben (R-2.3 ergänzt); Abschnitt 13 berichtigt (zwei Bereiche, Ursache ist das Rollen des Fensters bei offener Tastatur); Messmodus mit Spalte `inh` (15.21); Prüfungen `rolle`/`rollstand`, `checkSearchTop`, `checkFab`, `checkPrint`, Grundregel ‚Seite rollt nie‘, Safari-Modell `tests/safari.mjs` |
| 4.26.0 | 19.10.2026 | Neben | **R-1.6 neu (A-27):** Messmodus im Mehr-Menü der Seitenleiste – zeichnet am Gerät Scrollstand, `visualViewport`, Lage der Leisten, Fokus und Ereignisse auf, ‚Messung teilen‘ als Textdatei (15.21); Abschnitt 13: Safari schiebt den sichtbaren Bereich bei kurzer Seite (mit Quellen) |
| 4.25.1 | 19.10.2026 | Korrektur | **A-24:** beim Tippen bleibt das Suchfeld dasselbe Feld mit Fokus (Baustein `setHtml`), Kopf- und Suchzeile zittern am iPhone nicht mehr (15.2, R-2.3); **A-25:** Markierung bei Icons in Kapseln als Kreis 36 × 36 statt 42 × 36 (15.5, R-3.1, Grundregel ‚rund ist ein Kreis‘) |
| 4.25.0 | 18.10.2026 | Neben | **R-2.3 erweitert (A-21, A-22):** Suche mit mehreren Wörtern (alle müssen vorkommen, Reihenfolge egal) und „…“ als genaue Wortfolge – allgemeine Regel; Lupe am Ende der Kapsel vor ellipsis (15.2, 15.4, 15.5); Bausteine `searchWords`/`findsAll`/`findsAny`/`markWords`, Prüfungen `checkSearchWords`, `checkSearchPlace` |
| 4.24.0 | 18.10.2026 | Neben | **R-7.3 (A-23):** Hervorhebung nach dem Fenster länger – 2 s voll blau, 1 s ausblenden (vorher ~1 s); `checkListStill` prüft Farbe und Dauer |
| 4.23.2 | 18.10.2026 | Korrektur | **R-7.3 (P-52/2–4):** oberste Zeile nach dem Schließen 1,5 s festhalten (Safari rollt beim Zugehen der Tastatur nach bzw. ändert die Fensterhöhe – kein Drehen), auch nach ‹ › kein Rollen mehr; `checkListStill` neu gefasst (Start mit Lücke, 11 Fälle, Tastatur einzeln und zusammen) – Abschnitt 7, Regelkatalog Thema 7 |
| 4.23.1 | 18.10.2026 | Korrektur | **R-7.3 (P-51/5):** oberste Zeile beim Öffnen merken und nach dem Schließen genau dort ausrichten; gerollt wird nur nach ‹ ›, gegen die ganze Fensterhöhe statt gegen den Bereich über der Tastatur – Abschnitt 7, Regelkatalog Thema 7, `checkListStill` mit nachgebildeter Tastatur |
| 4.23.0 | 17.10.2026 | Neben | **R-2.3 erweitert (A-19 aus Reiselogbuch T-92):** Suche in der zentralen Liste – Lupe im Kopf der Seitenleiste/Startliste, Filter, ‚N Treffer‘ je Fundstelle, Öffnen mit gefüllter Suche, beide Suchfelder 1:1 – Abschnitt 15.2, 15.4, Regelkatalog Thema 2, Prüfung `checkListSearch` |
| 4.22.0 | 17.10.2026 | Neben | Keine Regeländerung – Werkzeug `messung.mjs` zeigt den Kontext (A-20, Zusammenarbeit 2.8.0) |
| 4.21.1 | 17.10.2026 | Korrektur | R-8.1: auch beim Drehen bleibt am Ende der Seite der Abstand zum Ende (ganz unten bleibt ganz unten) – Prüfung `checkTurnEnd` |
| 4.21.0 | 17.10.2026 | Neben | Neue Regel **R-7.4** Position beim Öffnen (A-16); **R-8.1** erweitert auf jede Änderung der Anordnung, auch Seitenleiste ein/aus (A-17) – Abschnitt 13, Regelkatalog Themen 7 und 8, Prüfungen `checkOpenAt`, `checkSideToggle` |
| 4.20.0 | 17.10.2026 | Neben | R-3.2 erweitert (A-15): Kapsel ‚Nach oben / Ans Ende‘ auch im iPhone-Aufbau (Inhaltsansicht), ausgeblendet ohne Scrollen – Abschnitt 4, 15.17, Regelkatalog Thema 3 |
| 4.19.0 | 17.10.2026 | Neben | Neue Regel **R-5.5** (A-14 aus Reiselogbuch T-87): Eingabetaste in einzeiligen Feldern ‚Fertig‘ und schließt die Tastatur, in mehrzeiligen Zeilenumbruch – Abschnitt 8, Regelkatalog Thema 5, Prüfung `checkEnterDone` |
| 4.18.0 | 16.10.2026 | Neben | Neue Regel **R-7.3** (A-13): Liste steht still, solange ein Fenster offen ist; danach wie vorher, Zeile kurz hervorgehoben, nach ‹ › nur so weit rollen wie nötig – Abschnitt 7, Regelkatalog Thema 7, Prüfung `checkListStill` |
| 4.17.0 | 16.10.2026 | Neben | Keine Regeländerung; Werkzeug `werkzeug/messung.mjs` für die Zeile Zeit und Token (A-12, Zusammenarbeit 2.7.0) |
| 4.16.1 | 15.10.2026 | Korrektur | Keine Regeländerung; Lauf-Werkzeug mit höchstens so vielen Browsern wie Kernen (A-10) |
| 4.16.0 | 15.10.2026 | Neben | Neue Regel **R-7.2** (A-09, aus Reiselogbuch T-84): Start im iPhone-Aufbau in der Startliste ohne blauen Eintrag, der Aufbau entscheidet, iPad-Aufbau unverändert – 15.4, 15.17, Regelkatalog Thema 7, Prüfung `start.mjs`; Abschnitt 13: Neustart ist in einer Web-App nicht erkennbar |
| 4.15.1 | 15.10.2026 | Korrektur | Fund P-39/1 und /2 (iPad ohne Meldung beim Wechsel): 15.20 – die App fragt alle 10 s den Service Worker, laufende Nummer statt `navigator.onLine` |
| 4.15.0 | 15.10.2026 | Neben | A-06 Offline-Hinweis (Variante c): R-1.5 ergänzt – graue Zeile unter der Backup-Kachel, kurze Meldung beim Wechsel und beim Start ohne Netz; neue Komponente 15.20, Abschnitt 11 (Nachrichten des Service Workers) |
| 4.14.2 | 14.10.2026 | Korrektur | Fund P-37: R-5.1 ergänzt (Schaltflächen im Schrittkopf als Gruppe, 15.10), neue Regel R-1.5 (Offline-Start, Service Worker mit Frist 3 s, 15.20) |
| 4.14.1 | 14.10.2026 | Korrektur | Abschnitt 14: die Fassung enthält auch den Text dieser Richtlinie und der Zusammenarbeit; keine Git-Markierung mehr (aus der Cloud gesperrt, Fund 4.14.0) |
| 4.14.0 | 14.10.2026 | Neben | A-05 Version B: feste Fassung je Version `fassung/X.Y.Z/` (Einleitung, 15.20, Abschnitt 14 – W-4 nachgeführt: Versionen gelten nicht mehr sofort für alle Apps), R-10.3 angepasst (Fassungs-Pfad statt `?v=`, Prüfsummen, `v4/` = neueste Fassung), Veröffentlichungs-Skript |
| 4.13.0 | 14.10.2026 | Neben | A-05 Version A (Prüfungen 2.0): Abschnitt 14 ‚Prüfen‘ und 17 ‚Grundregeln‘ – Prüfskripte melden Fehler mit Rückgabewert (`pruefe.mjs`), Grundregeln nach jedem Schritt, Chromium und WebKit, paralleler Lauf (`lauf.mjs`); `hig.mjs` zählt eine unsichtbare Antippfläche (`::after`) mit (R-3.1). Keine neue Regel |
| 4.12.2 | 14.10.2026 | Korrektur | A-02 Schritt 3: Abschnitt 7 – Vorschaufenster in voller Seitenbreite, seitlich wischen auf iPad und iPhone (R-6.4, bisher nur in der Designrichtlinie Reiselogbuch, F-4); neue Prüfung `checkCollab` (doku.mjs): Zusammenarbeit, CLAUDE.md, Backlogs und App-Doku ohne veraltete Stellen, Versionszeile in PROMPT.md, Feldnamen des Abgleichberichts; `checkCatalog` prüft jetzt auch die Zusammenarbeit |
| 4.12.1 | 14.10.2026 | Korrektur | Aus P-32: Seitenleiste folgt bei offener Tastatur dem von Safari verschobenen sichtbaren Bereich wie die Kopfzeile (R-2.1, Prüfung bildet Safari nach); `createSync` mit `values` – der Abgleichbericht zeigt Werte wie die App (R-10.1); Katalogprüfung auch in Code-Kommentaren |
| 4.12.0 | 14.10.2026 | Neben | **Regelkatalog neu (A-02a):** 52 Regeln → 34 in 10 Themen, Nummern R-<Thema>.<Nr>, je Regel genau eine Prüfung (Spalte ‚Prüfung‘), 5 neue Regeln R-2.3, R-4.4, R-5.3, R-5.4, R-6.4; Zebra je Tabellenzeile auch in App-Tabellen (R-6.1); R-50 → Zusammenarbeit 7; Zuordnung alt → neu; Abschnitte 1, 9, 10, 11, 12, 14 verweisen auf die Regeln statt sie zu wiederholen; Grundprinzipien: iPad und iPhone, Abgleich über das Backup (W-6) |
| 4.11.4 | 14.10.2026 | Korrektur | R-52: zusammengefasste Zellen in der ersten Spalte gelten als eine Tabellenzeile – alle Zellen dahinter in ihrer Farbe, Wechsel weiß/grau je Tabellenzeile; Abgleichbericht je Reiselogbuch eine Tabellenzeile; Prüfung zählt Tabellenzeilen |
| 4.11.3 | 14.10.2026 | Korrektur | Neue Regel R-52: Mustertabelle der Ausgabe als Baustein `outputCss` für jede Ausgabe, Vorschau und jeden Bericht; Prüfung vergleicht jede Tabelle Eigenschaft für Eigenschaft mit ihr – Anlass: Abgleichbericht mit dickerer Linie, ohne graue Zeilen und mit halbfettem Kopf (P-29/3) |
| 4.11.2 | 14.10.2026 | Korrektur | R-37 gilt überall (auch Fenster, Vorschau, Bericht) und wird in jeder Zelle geprüft – Anlass: Abgleichbericht ragte in Nachbarzellen; Abgleichbericht mit PDF in der Kapsel; neue Regel R-51 (oberster Eintrag bleibt beim Drehen, Baustein in ui.js, Prüfung mit nachgebildetem Safari) |
| 4.11.1 | 13.10.2026 | Korrektur | Neue Regeln R-49 (README ‚Verwendete Versionen‘) und R-50 (Prüfliste beginnt mit /0 ‚Version prüfen‘, Meldung je Gerät und Schritt) mit Prüfung `tests/doku.mjs`; Zusammenarbeit allgemein 1.15.0 |
| 4.11.0 | 13.10.2026 | Neben | R-44 Ergebnis des Abgleichs in zwei Stufen: kleines Fenster mit ‚Abgleichbericht anzeigen‘, Bericht als Vorschau wie die Ausgabe (Tabellen ‚Änderungen‘ und ‚hier neuer als im Backup‘, Unverändertes nur als Anzahl, teilbar als HTML); neue Regel R-48 Versionskopplung App ↔ AppDesign (`?v=`, Startprüfung, `tests/version.mjs`); R-47 mit einem einzigen Zustand und Prüfung mit Zwischengrößen; R-40 Kontextmenü wird nach dem Loslassen nachgeführt, ohne Platz darunter steht es über der Kachel |
| 4.10.1 | 13.10.2026 | Korrektur | Neue Regel R-47 (Seitenleiste behält beim Drehen ihren Zustand); R-40 ergänzt (Kontextmenü nie abgeschnitten, nie über/hinter der Backup-Kachel; Prüfung `tests/kontextmenue.mjs`); R-42 ergänzt (leere Felder überschreiben nichts); R-43 Hinweise mit Gerätenamen |
| 4.10.0 | 12.10.2026 | Neben | R-40 Menüs, Untermenüs und Sprechblasen beim Drehen (automatische Drehprüfung, Kontextmenü am iPhone unter der Kachel); Abgleich als allgemeine Regeln R-41 bis R-44 mit Baustein `createSync`, Fall-Tabelle 15.18 und Prüfung `tests/abgleich.mjs` (je Feld das Neuere, Hinweise zu Gelöschtem); Backup erstellen und laden als Standard R-45, R-46 (15.19, Abfrage mit Kacheln, Bausteine in ui.js, Prüfung `tests/backup.mjs`) |
| 4.9.1 | 12.10.2026 | Korrektur | Neue Regel R-39: Menü, Sprechblase und Fenster passen immer ganz auf den Bildschirm (iPhone quer: Sprechblase breiter, Knöpfe nebeneinander; sonst scrollt der Inhalt darin); Fenster werden neu platziert, wenn sie wachsen |
| 4.9.0 | 12.10.2026 | Neben | Backup laden = Abgleich zwischen iPad und iPhone (Zeitpunkt und Gerät im Backup, neuer/älter, Abgleichen · Ersetzen · Abbrechen, Ergebnis im kleinen Fenster); Sprechblase mit mehreren Wegen (`choosePop`, R-38); Kachelzeile ‚geändert am … · Gerät‘ (`deviceName`) |
| 4.8.1 | 12.10.2026 | Korrektur | R-05 verschärft: eine Symbolleiste – mit oder ohne Suchzeile – bewegt sich beim Wischen keinen Millimeter (auch bei offener und beim Schließen der Tastatur); bei offener Tastatur schließt das erste Wischen nur die Tastatur, die Seite bleibt stehen; Prüfskript misst die Lage der Leisten beim Scrollen |
| 4.8.0 | 12.10.2026 | Neben | R-37 verschärft: Reihen von Smileys ohne Leerzeichen brechen um (mehr als drei Smileys am Zeilenanfang sind Text, kein Zeichen), Umbruch nach ganzen Zeichen; Liste der Seitenleiste behält beim Neuaufbau ihre Position, der gewählte Eintrag bleibt sichtbar; Wischen bei offener Tastatur der Suche schließt sie (wie Apple) |
| 4.7.0 | 12.10.2026 | Neben | Regeln R-36 (gleiche Funktion = gleicher Baustein auf iPad und iPhone, mit Gerätevergleich im Prüfskript) und R-37 (zu lange Wörter brechen im Wort um, nichts ragt über Zelle oder Kachel hinaus); iPhone-Startliste ist jetzt die Seitenleiste als ganze Seite; Kacheln laufen auch am iPad hinter der Backup-Kachel durch |
| 4.6.0 | 11.10.2026 | Neben | Regelkatalog (Abschnitt 17) mit Nummern R-01 bis R-35; HIG- und Regel-Prüfung prüft alle automatisch prüfbaren Regeln; Leisten fest auch am iPad (Kopfzeile fest, in der Seitenleiste scrollen nur die Einträge) |
| 4.5.0 | 11.10.2026 | Neben | Leisten bewegen sich nie (Seite federt nicht nach, iPhone-Seitenkopf fest) |
| 4.4.0 | 11.10.2026 | Neben | Titel der Inhaltsseite immer in der Leiste (iPhone wie iPad); Anzahl unter dem Titel von Seitenleiste und Startliste; Backup-Kachel immer sichtbar (gelb nur ohne Backup heute); Großschreibung schon vor der Eingabe und nach Vorschlägen |
| 4.3.0 | 11.10.2026 | Neben | Kein Zoom durch Doppeltippen; Bezeichnung und Feld bleiben zusammen (Umbruch vor der Bezeichnung); App setzt Großbuchstaben am Zeilenanfang; Diktieren nur über die Tastatur; gelbe Markierung ohne blauen Rand; Seitenleiste mit Kacheln und gelber Backup-Kachel, iPhone-Startliste gleich wie die Seitenleiste; Bezeichnung im Kasten halbfett; Nach oben/Ans Ende in senkrechter Kapsel |
| 4.2.0 | 11.10.2026 | Neben | Grundprinzipien: nur der Vordergrund reagiert, kein Fokus-Rahmen, gleiche Bedienung iPad/iPhone; iPhone (15.17): Titel wandert in die Leiste, Kapseln oben wie am iPad, Suche wie am iPad, Kacheln mit aktuellem Eintrag blau, fester Hinweis unten (gelb, blauer Knopf, auch in der Seitenleiste); Kasten mit Linien waagrecht und senkrecht (15.10) |
| 4.1.0 | 10.10.2026 | Neben | iPhone-Ansicht (15.17): Seitenkopf, großer Titel, Liste, Kasten, untere Leiste, Fenster bildschirmfüllend, `isPhone()`; Menüpunkte mit Häkchen **und** Icon (Häkchen vorne, dann Icon und Text); `button[hidden]` blendet aus |
| 4.0.0 | 09.10.2026 | Haupt | Umzug ins Design-Repo AppDesign; Komponenten einmal programmiert in `v4/design.css` und `v4/ui.js` (versioniert eingebunden); HIG-Prüfung `tests/hig.mjs` für alle Apps; Vorlage für neue Apps; Abschnitt 14 neu |
| 3.6.1 | 09.10.2026 | Korrektur | Menüs ohne Linien zwischen einzelnen Punkten (wie iOS 26); Suchfeld ohne blauen Fokus-Rahmen |
| 3.6.0 | 09.10.2026 | Neben | Darstellung folgt dem iPad (Untermenü zum Übersteuern); Untermenüs; Trennlinie in Menüs dünn und eingerückt; alle Kapseln gleich gebaut; Sprechblasen ohne Icons; Kontextmenü ohne ‚Öffnen‘; `--muted` und Rot im Dunkelmodus kontrastreicher; unsichtbar vergrößerte Antippflächen; HIG-Prüfskript `tests/hig.mjs` |
| 3.5.1 | 09.10.2026 | Korrektur | HIG-Checkliste: kein „…“ in Menüs (wie Apples iPhone-/iPad-Apps); Liste der bewussten Abweichungen (Weiß auf Systemblau, Orange) |
| 3.5.0 | 09.10.2026 | Neben | Neuer Abschnitt 16 HIG-Checkliste (Antippflächen, Schrift, Kontrast, Auswahl, Menüs, Kontextmenüs, Abfragen, Texte, Fenster) mit Links zu den Apple-Seiten |
| 3.4.1 | 09.10.2026 | Korrektur | Menü: graue Notizen in allen Menüs (auch Teilen-Menü) nach durchgehendem Strich |
| 3.4.0 | 09.10.2026 | Neben | Vorgabe: in den Texten der Apps einfache Anführungszeichen ‚…‘ statt doppelter „…“ |
| 3.3.1 | 09.10.2026 | Korrektur | Grundsatz „Gewähltes bleibt eingefärbt, solange es sichtbar ist“ (auch Listen- und Tabellenzeilen, Kästen); Menü: technische Informationen nach durchgehendem Strich ohne Leerzeilen; verständlicher Satz zum Speicher statt „Speicher: dauerhaft“ |
| 3.3.0 | 09.10.2026 | Neben | Kontextmenü in der Seitenleiste (langes Drücken); dauerhafter Speicher mit Anzeige im Menü der Seitenleiste und Hinweis zum Entfernen vom Home-Bildschirm |
| 3.2.3 | 08.10.2026 | Korrektur | Fenster und Kopfzeilen bleiben bei sichtbarer Tastatur sichtbar (Ausrichtung am sichtbaren Bereich) |
| 3.2.2 | 08.10.2026 | Korrektur | Auswahl-Kapsel: Markierung als Kreis bzw. Kapsel innerhalb der Schaltfläche mit Abstand; Schaltflächen so hoch wie der Innenraum |
| 3.2.1 | 08.10.2026 | Korrektur | Seitenleiste beim Start immer eingeblendet (auch hoch, darübergelegt); unten 4 px Abstand wie Safari |
| 3.2.0 | 08.10.2026 | Neben | Auswahl-Kapsel (Smileys, Wetter, Reisemittel in einer wischbaren Kapsel); Suche springt nach Tipp-Pause und zeigt den Treffer unter der Suchzeile, Kopfzeile bleibt bei Tastatur fest; Betragsfelder dynamisch breit (mind. „100.000,00“); Drucken ohne Seitenleiste und ohne deren Abstand |
| 3.1.0 | 08.10.2026 | Neben | Schwebende Seitenleiste wie in Safari; Kalender-Icon in Datumsfeldern; Beträge „4.850,00 €“, rechtsbündig, „,00“ wird ergänzt; Tabellenüberschriften 17 px halbfett (Headline); Filter beim Öffnen auf „Alle“; gedrückte Schaltfläche bleibt auch bei Folgeschritten blau; „Backup erstellen“ / „Letztes Backup erstellt am …“ |
| 3.0.1 | 08.10.2026 | Korrektur | Links zu den Apple Human Interface Guidelines bei den Abschnitten und bei jeder Komponente |
| 3.0.0 | 08.10.2026 | Haupt | Neues Bedienkonzept wie Apple-Apps: Seitenleiste, Kopfzeile mit Kapsel und Mehr-Menü, Suche als zweite Zeile; Fenster ohne Fußleiste mit rundem x und Häkchen (grau bis zur Änderung); Abfragen als Sprechblase, „Änderungen verwerfen“ beim x; gedrückte Schaltfläche blau getönt; Hauptaktion nur in Fenstern blau; share immer ohne Text; Icons in Menüs vor dem Text; Text mittig zum Icon; Textfelder wachsen mit; Datumsfelder so breit wie das Datum; Backup-Hinweis einmal am Tag; neue Komponenten Kopfzeile, Seitenleiste, Kapsel, Menü, Sprechblase, Fenster-Kopfzeile |
| 2.1.0 | 07.10.2026 | Neben | Akzentfarbe Apple-Blau (Hauptaktion, Auswahl, Nummern, Links, Rahmen); Auswahl mit Haarlinie ohne Breitenänderung und leuchtenderem Schein; Schatten um Tabellen und bei allen Eingabefeldern; neue Komponenten Schalter (Apple-Grün) und Options-Kapsel statt Checkboxen |
| 2.0.0 | 07.10.2026 | Haupt | Apple-Look: neue Farben (Hellgrau, Weiß, Apple-Dunkel), schwebende Schaltflächen und Suchfelder, Haarlinien, Abstände 12 px; Farbbedeutungen Grün/Auswahl/Rot; neuer Abschnitt „Komponenten“ (u. a. Suchfeld mit Treffer-Navigation); Zusammenarbeit in eigene Datei ausgelagert |
| 1.1.0 | 06.10.2026 | Neben | Neu: Regel „allgemein oder App?“ klären, App-Richtlinien nur mit Abweichungen/Ausprägungen; aus der Reiselogbuch-Richtlinie übernommen: Smiley-Leisten, Erfassungsfenster, Vorschaufenster, Liste in Spalten, Ausgabe-Design, Dateinamen-Muster |
| 1.0.0 | 06.10.2026 | erste Fassung | Zusammenfassung aller bisher vereinbarten allgemeinen Regeln (Stand Reiselogbuch 1.0.0) |
