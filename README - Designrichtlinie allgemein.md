# Designrichtlinie allgemein

**Version 4.9.1** · Stand 12.10.2026

Allgemeine Gestaltungs- und Bedienregeln für alle iPad-Web-Apps von g811141a (seit 4.1.0 auch
auf dem iPhone, Abschnitt 15.17).
Diese Datei liegt im Design-Repo **AppDesign** (g811141a/AppDesign); ihre Versionsnummer ist
die Versionsnummer des Repos. Die Komponenten sind dort einmal programmiert (`v4/design.css`,
`v4/ui.js`) und werden von allen Apps übernommen (Abschnitt 14).
App-spezifische Regeln stehen in einer eigenen Datei je App
(z. B. `README - Designrichtlinie Reiselogbuch.md`). Regeln zur Zusammenarbeit stehen in
`README - Zusammenarbeit allgemein.md`.

> **Vorbild Apple:** Grundlage sind die Apple Human Interface Guidelines
> ([HIG](https://developer.apple.com/design/human-interface-guidelines)) und die [Apple Design Resources](https://developer.apple.com/design/resources/)
> (Vorlagen mit Maßen). Bei jedem Abschnitt bzw. jeder Komponente steht der Link zur
> passenden Apple-Richtlinie („**Apple:** …“).

> **Hinweis für Claude:** Diese Regeln gelten verbindlich für jede Weiterentwicklung.
> Bei jeder Design-Änderung wird diese Datei aktualisiert und ihre Versionsnummer erhöht
> (siehe Abschnitt 12 und Versionsgeschichte). Wiederkehrende Elemente sind in
> Abschnitt 15 „Komponenten“ einmal definiert und werden überall genau so verwendet.

---

## 1. Grundprinzipien

- Zielgerät iPad (Safari, zum Home-Bildschirm hinzugefügt, PWA, offline nutzbar);
  eine Person nutzt die App, kein Login, kein Teilen.
- Daten bleiben lokal (localStorage); beim Start fordert die App **dauerhaften Speicher** an
  (`navigator.storage.persist()`), damit Safari die Daten nicht von selbst löscht; Sicherung über
  eine Backup-Datei.
- Oberfläche Deutsch, schlicht und klar.
- Eine HTML-Datei (HTML + CSS + JS), dazu `sw.js`, `manifest.json`, Icons 180/512 px.
- Keine Hilfeseite – die Oberfläche ist selbsterklärend; Hinweise bei Bedarf hinter einem
  Info-Icon.
- Alle Aktionen sind echte Schaltflächen (kein reiner Text als Link).
- Keine Systemfenster (alert/confirm mit „OK“/„Close“) – Abfragen als **Sprechblase** an der
  angetippten Schaltfläche, reine Meldungen in einem kleinen Fenster (Abschnitt 15).
- **Apple-Look** (iPadOS): Hintergrund Hellgrau, Kästen weiß ohne Rand, schwebende Schaltflächen.
- **Aufbau wie Apple-Apps:** links eine **Seitenleiste** mit der zentralen Liste, rechts der
  Inhalt mit einer **Kopfzeile** (Titel in der Mitte, rechts eine Kapsel mit den wichtigsten
  Aktionen; Weiteres im **Mehr-Menü** ellipsis).
- **Nur der Vordergrund reagiert:** Ist ein Fenster, Menü oder eine Sprechblase offen, wirkt
  jedes Wischen und Tippen nur dort – die Seite dahinter bewegt sich nicht (Seite gesperrt,
  `overscroll-behavior: contain`). Daneben tippen schließt Menü bzw. Sprechblase.
- **Kein Fokus-Rahmen** beim Antippen oder Öffnen eines Fensters (nur bei Bedienung mit
  Tastatur); ein Fenster öffnet ohne vorausgewählte Schaltfläche.
- **Leisten bewegen sich nie – keinen Millimeter:** Eine Symbolleiste – mit oder ohne Suchzeile – steht
  immer an ihrem Platz und bewegt sich beim Wischen keinen Millimeter: nicht beim Scrollen, nicht am
  Rand, nicht bei offener Tastatur und nicht beim Schließen der Tastatur. Das gilt für Kopfzeile (iPad),
  Seitenkopf (iPhone) und Seitenleisten-Kopf; nur der Inhalt darunter scrollt. Ist die Tastatur der
  Suche offen, schließt das erste Wischen nur die Tastatur, die Seite bleibt dabei stehen. Die Seite federt am Rand nicht nach (`overscroll-behavior: none`
  auf `html`/`body`); Kopfzeile (iPad) und Seitenkopf (iPhone) sind fest positioniert
  (`position: fixed`, nicht sticky). In der Seitenleiste scrollen nur die Einträge (`.side-list`);
  Kopf und Backup-Kachel liegen außerhalb des Scrollbereichs.
- **Doppeltippen vergrößert nie** die Ansicht (`touch-action: manipulation`); Zoomen mit zwei
  Fingern bleibt möglich.
- **Gleiche Bedienung auf iPad und iPhone:** gleiche Kapseln oben (z. B. [`plus` | `ellipsis`],
  [`share` | `search` | `ellipsis`]), gleiche Suche, gleiche Menüs – das iPhone ordnet nur die
  Seiten anders an (Abschnitt 15.17).
- Bewusst verworfen: eigene Kennzeichnung von Pflichtfeldern; harte, schmale Schatten;
  Glas-Leiste (schlechter lesbar).

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

- **Darstellung wie Apple:** Die App folgt automatisch der Hell/Dunkel-Einstellung des iPads
  (Voreinstellung ‚Automatisch‘, wechselt sofort mit). Im Mehr-Menü lässt sie sich übersteuern:
  Untermenü ‚Darstellung ›‘ (sun-moon, rechts grau der aktuelle Wert) mit Automatisch · Hell ·
  Dunkel (Häkchen). Gespeichert in `settings.appearance` (`auto` | `light` | `dark`).
  [HIG – Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)

## 3. Schrift und Abstände

**Apple:** [HIG – Typography](https://developer.apple.com/design/human-interface-guidelines/typography) · [HIG – Layout](https://developer.apple.com/design/human-interface-guidelines/layout)

- Systemschrift `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
  17 px, Zeilenhöhe 1,45.
- h1 28 px, h2 20 px, Fenstertitel 19 px zentriert; Hinweise 14 px in `--muted`.
- Seitenrand 16 px bzw. iPad-Safe-Area.
- **Abstand zwischen Schaltflächen 12 px** (wie bei Apple), in Leisten, Reihen und Listen.
- Radien: Schaltflächen und Suchfelder Kapsel (22 px), Icon-Schaltflächen rund,
  Listeneinträge und Kästen 14 px, Eingabefelder 10 px, Tabelle 12 px, Fenster 18 px.
- Trennlinien und Feldränder als Haarlinie (0,5 px); Kästen und Tabelle ohne Rand.
- Keine klassischen Checkboxen: Ein/Aus-Einstellungen als **Schalter**, Optionen beim Erfassen als **Options-Kapsel** (Abschnitt 15).
- **Text steht in Schaltflächen in der Höhe genau mittig zum Icon** (Zeilenhöhe 20 px wie das Icon).
- **Tabellenüberschriften** 17 px halbfett (600), gleich groß wie der Text der Zellen (Apple-Textstil „Headline“).

## 4. Schaltflächen

**Apple:** [HIG – Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)

- **Alle Schaltflächen 44 px hoch** (auch lange Texte, Vorschläge, Auswahl-Chips).
  Ausnahmen: mehrzeilige Listeneinträge (z. B. umbrochene Titel) und Textkästen.
- **Reine Icon-, Wetter- und Smiley-Schaltflächen quadratisch 44 × 44 px**;
  Emoji 24 px, Icon 20 px.
- **Alle Schaltflächen und Suchfelder schweben** (Komponente „Schwebende Schaltfläche“):
  Fläche `--btn`, Lichtkante `--btn-rim` (0,5 px), Schatten `--float`, Kapselform;
  Icon-Schaltflächen rund. Text-Schaltflächen: Icon links, dann Text (Abstand 6 px).
- **Mehrere Schaltflächen nebeneinander stehen in einer Kapsel** (Komponente Kapsel).
- **Farben von Schaltflächen** – jede Farbe hat genau eine Bedeutung:
  - **Blau gefüllt = Hauptaktion** – nur **in Fenstern**, höchstens eine je Fenster (z. B.
    Häkchen nach einer Änderung, Teilen in der Vorschau, Backup sichern in der Erinnerung):
    `--accent`, weiße Schrift, Lichtkante, Schatten `--glow-accent`. **Menüs und die Kapsel der
    Kopfzeile werden nicht eingefärbt.**
  - **Blau getönt mit Haarlinie = eingeschaltet** (Umschalt-Schaltflächen wie Wetter,
    Reisemittel, Mikrofon während der Aufnahme): Fläche `--sel-bg`, Haarlinie (0,5 px)
    `--accent`, Schrift normal, Schatten `--glow-accent` (`aria-pressed="true"`). Die Breite
    ändert sich beim Einschalten nicht.
  - **Blau getönt = gedrückt:** Die Schaltfläche, von der ein offenes Menü, eine Sprechblase
    oder ein Fenster kommt, ist so lange `--sel-bg` mit Haarlinie `--accent`, wie es offen ist –
    man sieht, woher man kommt (Klasse `.on`). Das gilt auch für Folgeschritte (Teilen-Menü,
  Dateiauswahl, Meldung danach): die Schaltfläche bleibt blau, bis alles abgeschlossen ist.
  - **Grundsatz: Gewähltes bleibt eingefärbt, solange es sichtbar ist.** Ein angetippter Punkt
    oder eine Schaltfläche bleibt blau getönt, solange das, was er geöffnet hat, offen ist und er
    selbst sichtbar bleibt – auch Listenzeilen (Eintrag der Seitenleiste, z. B. über das
    Kontextmenü → Einstellungen), Tabellenzeilen (Tag, beim Blättern wandert die Markierung mit)
    und Kästen (Fazit). Technisch: `setOpener(selector)`.
    [HIG – Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
  - **Apple-Grün** nur für eingeschaltete **Schalter**.
  - **Rot gefüllt = Löschen/Verwerfen** (endgültige Aktionen, z. B. in Sprechblasen):
    `--danger-fill`, weiße Schrift, Schatten `--glow-danger`. In Menüs steht
    „… löschen“ als roter Text mit rotem Icon.
  - Alle übrigen Schaltflächen neutral (schwebend).
- „Abbrechen“ (in Sprechblasen): neutral, ohne Icon, normale Schrift.
- Gesperrte Schaltflächen: ausgegraut (Deckkraft 40 %).
- Keine Hover-Farbe auf dem iPad – Hover nur in `@media (hover: hover)`.
- Schaltflächen unten rechts (nach oben / ans Ende): zusammen in einer **senkrechten Kapsel**
  (`.fab`); ausgeblendet, wenn es nichts zu scrollen gibt.

## 5. Icons

**Apple:** [HIG – Icons](https://developer.apple.com/design/human-interface-guidelines/icons) · [HIG – SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols) (im Web nicht erlaubt, daher Lucide)

- Schaltflächen-Icons aus **Lucide** (Liniengrafiken, Strichstärke 2, `currentColor`),
  als SVG eingebettet (offline). SF Symbols dürfen im Web nicht verwendet werden.
- **Inhalte bleiben Emojis** (z. B. Smileys, Wetter, Spaltenköpfe).
- Allgemeine Zuordnung:

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
| Backup sichern / laden | `save` / `folder-open` | Icon + Text |
| Vorschau | `eye` | Icon + Text |
| HTML / PDF | `file-code` / `file-text` | Icon + Text |
| Info / Hinweis ein-/ausblenden | `info` | nur Icon |
| Darstellung | `sun-moon` | im Mehr-Menü, Untermenü Automatisch · Hell · Dunkel |
| Nach oben / Ans Ende | `arrow-up-to-line` / `arrow-down-to-line` | nur Icon |
| Zurücksetzen | `rotate-ccw` | nur Icon, gedämpft |

- In Menüs stehen die Icons **vor** dem Text.

## 6. Begriffe

- Fenster haben **keine Fußleiste mehr**: links oben ein rundes x, rechts oben ein rundes
  Häkchen (Komponente Fenster-Kopfzeile).
- x = Fenster schließen; wurde etwas geändert, fragt eine Sprechblase „Änderungen
  verwerfen“ / „Weiter bearbeiten“ (die Eingaben bleiben dann erhalten). So macht es auch
  Apple (z. B. Kontakte).
- Häkchen = übernehmen und schließen; ohne Änderung schließt es einfach.
- Bestätigungen immer mit dem Verb der Aktion: „Löschen“, „Entfernen“, „Zurücksetzen“,
  „Ersetzen“, „Änderungen verwerfen“.
- Menüpunkt und Fenster heißen gleich (z. B. „Einstellungen“).
- Systembeschriftungen (z. B. „Reset“ der iPad-Datumsauswahl) bleiben.
- **Anführungszeichen:** In den Texten der Apps immer **einfache** Anführungszeichen ‚…‘
  (z. B. ‚In Dateien sichern‘, Spalte ‚Wie war was?‘), **keine doppelten** „…“.

## 7. Fenster (Dialoge)

**Apple:** [HIG – Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets) · [HIG – Modality](https://developer.apple.com/design/human-interface-guidelines/modality)

- Aufbau: Kopfzeile (Komponente Fenster-Kopfzeile) · Inhalt (scrollbar).
- Breite passt sich dem Inhalt an: höchstens 90 % der Bildschirmbreite, Mindestbreite
  480 px. Erfassungs- und Vorschaufenster fast bildschirmbreit (bis 1100 px).
- Hintergrund `--dlg-bg`, Kästen darin `--dlg-card`, Radius 18 px, Schatten, abgedunkelter
  Hintergrund dahinter.
- Escape wirkt wie das x.
- **Bei sichtbarer Tastatur** passt sich jedes Fenster dem sichtbaren Bereich über der Tastatur an:
  die Kopfzeile bleibt immer sichtbar, nur der Inhalt scrollt; das angetippte Feld wird in den
  sichtbaren Teil gerollt. Das gilt ebenso für die Kopfzeile (inkl. Suchzeile) der Hauptansicht.
- Gibt es noch keinen Eintrag, öffnet sich „Neues …“ einmal von selbst; mit x bleibt die
  leere Seite mit grauem Hinweis „Noch kein … angelegt.“.
- **Erfassungsfenster** (Einträge erfassen): fast bildschirmbreit; Kopfzeile x · Titel mit
  Zusatzzeile „Automatisch gespeichert um hh:mm“ · Kapsel [chevron-left | chevron-right] zum
  Blättern · Häkchen; automatisches Speichern (Abschnitt 8).
- **Vorschaufenster**: fast bildschirmbreit, Inhalt immer hell und genau wie die
  ausgegebene Datei; Kopfzeile x · „Vorschau“ mit Dateiname als Zusatzzeile · Kapsel
  [PDF | share blau gefüllt]; nach Teilen bzw. PDF folgt das Ergebnisfenster mit ggf.
  Backup-Erinnerung.
- **Meldung** (ohne Entscheidung, z. B. Fehler): kleines Fenster, x links oben, Titel,
  Text zentriert.
- Technisch: ein Dialog, dessen Inhalt ausgetauscht wird (nicht schließen und neu öffnen);
  ein zweiter Dialog nur für Meldungen.

## 8. Eingaben, Pflichtfelder und Fehlermeldungen

**Apple:** [HIG – Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields) · [HIG – Pickers](https://developer.apple.com/design/human-interface-guidelines/pickers)

- Eingaben in nummerierten Schritten (blaue runde Nummer 26 px), jeder Schritt als
  Kasten ohne Rand; Nummern laufen fortlaufend über die sichtbaren Schritte.
- Options-Kapseln eines Schritts rechts in dessen Kopfzeile; zusammengehörige Einstellungen in
  einem gemeinsamen Kasten mit Überschrift (z. B. „Konfiguration …“).
- Eingabefelder schlicht; Formatierung erst in Anzeige und Ausgabe.
- **Pflichtfelder werden nicht gekennzeichnet** (kein Sternchen, kein „erforderlich“,
  auch kein „optional“ bei anderen Feldern).
- **Fehlermeldungen in Rot direkt unter dem betroffenen Feld**, das Feld bekommt einen
  roten Rahmen.
- Beim Öffnen eines Fensters erscheint keine Meldung. Eine Meldung erscheint erst nach
  einer Eingabe: Textfeld leer verlassen oder geleert, Datum geändert, letzte Auswahl
  abgewählt.
- Das Häkchen ist grau, bis etwas geändert wurde, dann blau. **Ein Tippen auf das Häkchen
  zeigt alle fehlenden Angaben** (falls etwas fehlt) und scrollt zur ersten.
- **Textfelder wachsen mit dem Inhalt**; man muss nie innerhalb eines Feldes scrollen.
- **Datumsfelder sind so breit wie das Datum** und haben rechts ein eigenes Kalender-Icon
  (Lucide `calendar`, auf allen Geräten gleich, kurzer Abstand zum Datum); zwei zusammengehörige
  Daten mit grauer Beschriftung „Von“ · „Bis“ in einer Zeile.
- **Bezeichnung und Feld gehören zusammen** (`.pair`): reicht der Platz nicht, bricht die Zeile
  **vor** der Bezeichnung um (z. B. auf dem iPhone ‚Bis‘ mit Datum unter ‚Von‘), nie zwischen
  Bezeichnung und Feld.
- **Großbuchstabe am Zeilenanfang:** Die App setzt den ersten Buchstaben jeder Zeile und nach
  ‚.‘, ‚!‘, ‚?‘ selbst groß – auch nach einem Smiley am Zeilenanfang (iOS macht das nicht
  zuverlässig); schon vor der Eingabe (`beforeinput`). Nach einem Vorschlag (z. B. ‚Freetour …‘)
  beginnt auch das nächste Wort groß (`capNext`).
- **Beträge** wie bei Apple (Region Deutschland): immer zwei Nachkommastellen, Tausenderpunkt,
  Währung **hinter** dem Betrag mit Leerzeichen – „4.850,00 €“. Im Eingabefeld steht das €
  rechts neben dem Feld; fehlen beim Verlassen die Nachkommastellen, ergänzt die App „,00“.
  **Betragsfelder sind immer rechtsbündig** und dynamisch breit: mindestens so breit, dass
  „100.000,00“ vollständig passt; längere Beträge lassen das Feld beim Tippen mitwachsen.
- **Smiley-Leisten** (Schnellauswahl über einem Textfeld): nur einzeilig, mit dem Finger
  nach links/rechts wischen, Verlauf am Rand als Hinweis auf weitere Smileys,
  Zurücksetzen (rotate-ccw) fest rechts daneben. Sortiert nach Häufigkeit (meistbenutzte
  vorne), nie benutzte in Standardreihenfolge dahinter. Langes Drücken entfernt einen
  Smiley (Sprechblase „Entfernen“, rot); wird er wieder verwendet, kommt er zurück.
  Zurücksetzen stellt die Standard-Smileys her und setzt die Zähler auf null (Sprechblase
  „Zurücksetzen“, rot). Ein angetippter Smiley wird angehängt, wenn der Cursor in einer leeren Zeile
  oder hinter Smileys steht, sonst beginnt eine neue Zeile.
- Diktieren **über die Mikrofon-Taste der Tastatur** (Hinweis im Fenster); keine eigene
  mic-Schaltfläche – iOS liefert Web-Apps vom Home-Bildschirm keine Spracherkennung.
- Automatisches Speichern alle 10 Sekunden in Erfassungsfenstern; „Änderungen verwerfen“
  (über x) stellt den Zustand beim Öffnen wieder her.
- Zahlen- und Betragsfelder rechtsbündig, Tausenderpunkt schon beim Tippen.

## 9. Tabellen (App, HTML und PDF)

**Apple:** [HIG – Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)

- Kopfzeile grau (`--th-bg`) mit Rändern `--th-line`; die Tabelle selbst ohne äußeren Rand,
  mit Schatten `--table-shadow`, damit die seitlichen Grenzen gut zu sehen sind.
- Jede 2. sichtbare Zeile heller (Zebra); gezählt werden nur sichtbare Zeilen; eine
  markierte Zeile bleibt gelb. Die gelbe Markierung (z. B. erster offener Tag) hat **keinen
  blauen Rand** – in Tabelle und Kachel.
- Trennlinien zwischen allen Spalten.
- Tabellenkopf bleibt beim Scrollen direkt unter der Kopfzeile stehen; Schrift 17 px halbfett wie die Zellen.
- Zwischen ganzen Wörtern umbrechen (die Spalte wird so breit wie das längste Wort). Ein zu
  langes Wort (über 20 Zeichen, z. B. 100 × ‚a‘) bricht **im Wort** um und läuft in der nächsten
  Zeile weiter – nie über die Zelle oder den Rand hinaus (R-37; `breakable()` in `ui.js`,
  `overflow-wrap` in `design.css`). Gilt auch für Kästen, Kacheln und Hinweise, iPad und iPhone.
  Das gilt auch für Reihen von Smileys ohne Leerzeichen: höchstens drei Smileys am Zeilenanfang
  werden zum Zeichen (hängender Einzug), eine längere Reihe ist Inhalt und bricht am Rand um.
  Umgebrochen wird nach ganzen Zeichen – zusammengesetzte Smileys (z. B. 🤷🏻‍♂️) bleiben ganz.
- Spaltenbreiten passen sich dem Inhalt an; kompakte Tabellen nur so breit wie nötig;
  Zahlenspalten rechtsbündig (Überschrift und Werte).
- Hängender Einzug: Folgezeilen beginnen unter dem Text, nicht unter Aufzählungszeichen
  oder Emoji.
- Links ohne Unterstreichung.
- Statistiken bleiben schlichte Listen.

## 10. Ausgabe, Teilen und Meldungen

- Ausgabe-Inhalt unter einer eigenen CSS-Klasse, damit er nicht in die App durchschlägt;
  immer hell (weiß, schwarzer Text), auch in der Vorschau.
- Vorschau vor dem Sichern im App-Fenster; erhöht keinen Zähler.
- Speichern immer über das Teilen-Menü („In Dateien sichern“); PDF über das
  Drucken-Menü. Die App meldet ehrlich, dass das Menü geöffnet bzw. abgebrochen wurde.
- **Ausgabe-Design** (HTML und PDF): Systemschrift 11 pt, h1 20 pt, h2 14 pt, schwarzer
  Text auf Weiß, Links `#1a5fb4` ohne Unterstreichung, Tabellen wie in der App
  (Kopf `#d9d9d9`, Ränder `#a5a5a5`, Zebra `#f5f5f5`), Zeilen nicht über Seitenumbrüche
  teilen. Dezente letzte Zeile (9 pt, grau): „Ausgabe V003 erstellt am TT.MM.JJJJ um
  hh:mm“. PDF im Hochformat, weißer Seitenhintergrund, Dateiname als Seitentitel.
- **Dateinamen-Muster**:
  - Ausgabe: „<App> <Titel> JJJJ.MM.TT-JJJJ.MM.TT V001“ – fortlaufender Zähler je Eintrag
    (gemeinsam für HTML und PDF, im Backup enthalten), nie zwei Leerzeichen hintereinander.
  - Backup: „Ω Backup <App> JJJJ.MM.TT hh.mm.json“ (ohne Zähler).
- Datumsformat in Texten TT.MM.JJJJ, in Dateinamen JJJJ.MM.TT, Uhrzeit hh:mm
  (im Dateinamen hh.mm).
- Sicherheitsabfrage (Sprechblase) vor jeder Lösch-, Ersetz- oder Rücksetz-Aktion.
- **Backup einmal am Tag:** Wurde heute noch keines erstellt, steht unten in der Seitenleiste
  dezent „Letztes Backup erstellt am …“ (bzw. „Noch kein Backup erstellt.“) mit der
  Schaltfläche „Backup erstellen“; nach einer Ausgabe erinnert das Ergebnisfenster daran. Nur
  ein abgeschlossenes Teilen-Menü zählt als Backup.

## 11. Versionen und Aktualisierung

- **Versionsnummer dreistufig Hauptversion.Nebenversion.Korrektur** (z. B. 1.2.1):
  - Hauptversion: grundlegende Änderung (Aufbau, Bedienkonzept, Datenstruktur).
  - Nebenversion: neue Funktion oder sichtbare Verbesserung.
  - Korrektur: Fehlerbehebung ohne neue Funktion.
  - Steigt eine Stufe, beginnen die folgenden wieder bei 0.
- Jede App hat eine `CHANGELOG.md` (Version, Datum, Art, Inhalt).
- Versionsnummer, Erstellungszeitpunkt und Cache-Name des Service Workers bei jeder
  Version erhöhen.
- Service Worker „network first“ mit `cache: 'no-cache'`: Beim Start wird immer bei
  GitHub nachgefragt, neue Versionen sind nach einem Neustart sofort da; offline läuft
  die gespeicherte Version.

## 12. Designrichtlinien pflegen

- Diese Datei und die App-spezifischen Richtlinien werden **bei jeder Design-Änderung**
  aktualisiert, gemeinsam mit der App-Version.
- **Bei jeder Design-Änderung wird geklärt, ob sie eine allgemeine Regel ist (diese
  Datei) oder nur für eine App gilt** (App-Richtlinie); Claude fragt nach und nennt dabei
  seine Einschätzung als Vorschlag.
- App-Richtlinien verweisen eingangs auf diese Datei und enthalten **keine
  Wiederholungen**, nur **Abweichungen** (bewusst anders als hier) und **Ausprägungen**
  (konkrete Ausgestaltung einer allgemeinen Regel für die App), jeweils so gekennzeichnet.
- Eigene dreistufige Versionsnummer je Datei (Bedeutung wie in Abschnitt 11, bezogen auf
  Regeln: neue Regel = Nebenversion, Präzisierung = Korrektur, grundlegend neue
  Gestaltung = Hauptversion).
- Wiederkehrende Elemente werden als **Komponente** (Abschnitt 15) definiert; Apps und
  App-Richtlinien verweisen nur noch auf den Namen der Komponente.
- In PROMPT.md und CHANGELOG.md jeder App steht, welchen Richtlinien-Versionen sie folgt,
  z. B. „Reiselogbuch 1.0.0 · Designrichtlinie allgemein 1.0.0 · Designrichtlinie
  Reiselogbuch 1.0.0“.

## 13. iPad-Erfahrungen (technisch)

- Safe-Area beachten (`env(safe-area-inset-*)`, `viewport-fit=cover`).
- Speichern über `navigator.share` mit Dateien; Download-Links funktionieren in der
  Home-Bildschirm-App nicht zuverlässig.
- Long-Press-Menü und Textauswahl auf Emoji-Schaltflächen abschalten
  (`-webkit-touch-callout: none`, `user-select: none`).
- Beim Drucken nur den Ausgabe-Inhalt zeigen: Seitenleiste, Fenster und deren Abstände
  (z. B. `padding-left` für die Seitenleiste) ausblenden bzw. auf 0 setzen.
- Bei offener Tastatur verschiebt Safari den sichtbaren Bereich: fixierte Kopfzeilen über
  `visualViewport.offsetTop` nachführen.
- Elemente mit `display` im CSS brauchen eine eigene `[hidden]`-Regel, sonst bleiben sie
  sichtbar.
- Emojis mit und ohne Variantenzeichen (z. B. ☹️/☹) als gleich behandeln.
- Nach Updates die App einmal ganz schließen und neu öffnen.

## 14. Design-Repo AppDesign

- **Inhalt:** diese Richtlinie, `README - Zusammenarbeit allgemein.md`, `v4/design.css`
  (Farben, Schrift, Schaltflächen, Suchfeld, Kapsel, Eingabe- und Datumsfelder, Kopfzeile,
  Seitenleiste, Menü, Sprechblase, schwebende Schaltflächen, Fenster, Kasten, Auswahl-Kapsel,
  Schalter, Options-Kapsel; iPhone-Ansicht: Seitenkopf, großer Titel, Liste, Kasten, untere
  Leiste), `v4/ui.js` (Icons, Menüs mit Untermenü, Sprechblase, gedrückte Schaltflächen, Meldung,
  Fenster, Darstellung, Auswahl-Kapsel, Tastatur/sichtbarer Bereich, Beträge, iPhone-Erkennung
  `isPhone()`), `apple-referenz/` (Vergleichsbilder), `tests/hig.mjs` (HIG-Prüfung) und
  `vorlage/index.html` (Startpunkt für neue Apps).
- **Einbindung (versioniert):** Jede App lädt die Bausteine von GitHub Pages aus dem Ordner der
  Hauptversion: `<link rel="stylesheet" href="../AppDesign/v4/design.css">` im `<head>` vor dem
  eigenen `<style>`, `<script src="../AppDesign/v4/ui.js"></script>` am Ende von `<body>` vor dem
  Skript der App. Der Service Worker der App nimmt beide Dateien in seinen Cache auf (offline).
- **Versionen:** Neben- und Korrekturversionen (4.x.y) ändern `v4/` rückwärtsverträglich und
  gelten sofort für alle Apps. Eine Hauptversion (5.0.0) bekommt einen neuen Ordner `v5/`; jede
  App wird bewusst umgestellt. Reihenfolge beim Veröffentlichen: **erst AppDesign, dann die App.**
- **Schnittstelle von ui.js:** Die App stellt bereit: `<dialog id="dlg">`, `<dialog id="msg">`,
  `db.settings.appearance` (`auto` | `light` | `dark`), `save()`, `render()`; optional
  `onDialogOpen()` (wird bei jedem `openDialog` aufgerufen).
- **Prüfen:** Jede App hat ein eigenes Prüfskript, das ihre Ansichten durchgeht und mit
  `AppDesign/tests/hig.mjs` misst (AppDesign liegt beim Testen neben dem App-Repo).
- **Geplant:** Startseite g811141a.github.io mit allen Apps.

## 15. Komponenten

Jede Komponente ist hier einmal beschrieben (Zweck · Aufbau · Maße · Aussehen · Zustände ·
Verhalten · technischer Name). In AppDesign ist jede Komponente einmal programmiert
(`v4/design.css`, `v4/ui.js`) und wird von allen Apps übernommen.

### 15.1 Schwebende Schaltfläche
- **Apple:** [HIG – Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- **Zweck:** jede Aktion. **Technisch:** `button` (Hauptaktion `.primary`, Löschen
  `.danger`, eingeschaltet `aria-pressed="true"`, nur Icon `.iconbtn`).
- **Aufbau:** Icon (20 px) links, dann Text; oder nur Icon bzw. Emoji (24 px).
- **Maße:** 44 px hoch, Kapsel (Radius 22 px); Icon-/Emoji-Schaltflächen 44 × 44 rund;
  Abstand zu Nachbarn 12 px.
- **Aussehen/Zustände:** neutral `--btn` + Lichtkante + `--float`; Hauptaktion,
  eingeschaltet und Löschen siehe Abschnitt 4; gesperrt 40 % Deckkraft.

### 15.2 Suchfeld
- **Apple:** [HIG – Search fields](https://developer.apple.com/design/human-interface-guidelines/search-fields)
- **Zweck:** Suchen in der aktuellen Ansicht. **Technisch:** `.searchbox`, `.navgrp`.
- **Aufbau:** Lupe (search) · Eingabe „Suchen“ · Trefferanzeige · x-Schaltfläche;
  rechts daneben Kapsel-Gruppe chevron-up / chevron-down.
- **Maße:** 44 px hoch, Kapsel; in der zweiten Zeile der Kopfzeile über die volle Breite,
  Treffer-Navigation immer am rechten Rand; Abstand 12 px.
- **Aussehen:** wie die schwebende Schaltfläche; Lupe, Trefferanzeige grau; x als grauer
  Kreis mit weißem Kreuz.
- **Zustände:**
  - leer: nur Lupe und Platzhalter, Pfeile ausgegraut
  - mit Treffern: rechtsbündig „3 von 57“ (ohne das Wort „Treffer“), x; Navigation
    sichtbar; am ersten Treffer chevron-up ausgegraut, am letzten chevron-down
  - ohne Treffer: rechtsbündig „0“, beide Pfeile ausgegraut
- **Verhalten:** Suche beim Tippen (Markierung sofort); jede Markierung ist ein Treffer; zum
  ersten wird erst nach einer kurzen Tipp-Pause (ca. 0,5 s) gesprungen. Der Treffer steht dann
  **direkt unter der Suchzeile** (und dem Tabellenkopf), nicht in der Bildmitte. Kopf- und
  Suchzeile bleiben fest oben, auch bei offener Tastatur. Treffer gelb (`--mark`), Treffer im Fokus hellorange (`--mark-cur`) und
  unter die Suchzeile gescrollt. Pfeile und Eingabetaste springen weiter, ohne Umlauf vom letzten
  zum ersten. x löscht die Eingabe, der Cursor bleibt im Feld. Gefiltert wird auf Einträge
  mit Treffern.
- **Fokus:** kein blauer Fokus-Rahmen (wie Apple) – der Cursor zeigt, dass man tippen kann; beim
  Blättern mit ⌃ ⌄ geht die Tastatur zu.

### 15.3 Kopfzeile
- **Apple:** [HIG – Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- **Zweck:** oberste Zeile des Inhalts. **Technisch:** `.nb`.
- **Aufbau:** links panel-left (nur wenn die Seitenleiste ausgeblendet ist) · Titel in der
  Mitte (17 px, fett) · rechts eine Kapsel mit den wichtigsten Aktionen, zuletzt ellipsis
  (Mehr-Menü). Suche: search in der Kapsel blendet eine **zweite Zeile** mit dem Suchfeld
  über die volle Breite ein, Treffer-Navigation rechts.
- **Verhalten:** bleibt beim Scrollen oben stehen (Hintergrund `--bg`, beim Scrollen
  Haarlinie unten); keine Glas-Leiste.
- **Filter** (z. B. „Alle / Nur erfasste“): beim Öffnen eines Eintrags und beim Start immer auf
  „Alle“.

### 15.4 Seitenleiste
- **Apple:** [HIG – Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars)
- **Zweck:** zentrale Liste der App. **Technisch:** `#side`.
- **Aufbau:** Kopf: Überschrift (20 px, fett, linksbündig) · Kapsel [plus | ellipsis] ·
  runde Schaltfläche panel-left (ausblenden); unter der Überschrift klein und grau die Anzahl
  (‚5 Reiselogbücher‘); der Kopf bleibt oben stehen. Darunter die Einträge
  als **Kacheln** (wie auf dem iPhone): Titel fett, darunter grau Zeitraum · Status, rechts ›;
  gewählter Eintrag blau gefüllt; reichen sie über den Rand, wischt man sie nach oben – sie laufen
  unter dem Kopf und **hinter der Backup-Kachel durch** (keine starre Begrenzung). Die Liste behält
  beim Neuaufbau ihre Position; der gewählte Eintrag bleibt sichtbar, auch wenn er erst durch
  Wischen sichtbar wurde. Unten fest
  **immer** die Backup-Kachel ‚Letztes Backup erstellt am …‘ – gelb mit blauem Knopf, solange heute
  noch kein Backup erstellt wurde, sonst weiß mit normalem Knopf (`.ok`).
- **Geändert am (seit 4.9.0):** jede Kachel zeigt als dritte Zeile klein und grau (13 px)
  ‚geändert am TT.MM.JJJJ um hh:mm · iPad‘ bzw. ‚· iPhone‘ (`small.chg`); das Gerät liefert
  `deviceName()`. Ohne bekannte Änderung entfällt die Zeile.
- **Maße und Aussehen:** schwebend wie in Safari – eigenes Rechteck mit 10 px Abstand oben und
  links und 4 px unten (der Schatten endet fast am unteren Bildschirmrand), Radius 22 px, Lichtkante `--btn-rim` und Schatten `--float` wie die
  Schaltflächen; so breit wie Kopf bzw. längster Titel, 340–420 px; Hintergrund `--bg` (wie die
  iPhone-Startliste, damit die weißen Kacheln sich abheben).
- **Verhalten:** beim Start immer eingeblendet (quer fest links, hoch über den Inhalt gelegt) mit
  dem aktuellen Eintrag geöffnet; quer fest links neben dem Inhalt, mit panel-left aus- und
  einblendbar (bis zum nächsten Start); im Hochformat über den Inhalt gelegt (abgedunkelt dahinter), schließt sich
  nach der Auswahl.
- **Mehr-Menü der Seitenleiste:** Backup erstellen (darunter grau „Letztes Backup erstellt am …“) ·
  Backup laden · durchgehender Strich · darunter ohne Leerzeilen grau die Versionszeile
  „<App> · Version X.Y.Z · erstellt am …“ und ein verständlicher Satz zum Speicher: „Die Daten
  bleiben in Safari gespeichert, solange <App> auf dem Home-Bildschirm nicht entfernt wird.“ bzw.
  (nicht dauerhaft) „Safari kann die Daten bei Speichermangel löschen – bitte regelmäßig ein
  Backup erstellen.“
- **Backup laden = Abgleich zwischen iPad und iPhone (seit 4.9.0):** Ein Backup enthält Zeitpunkt
  und Gerät. Nach der Dateiauswahl (z. B. aus iCloud Drive) fragt eine Sprechblase mit drei Wegen
  (R-38): ‚Backup vom … (iPhone) mit n …‘, ob es **neuer** oder **älter** ist als die Daten auf
  diesem Gerät, kurz erklärt · **Abgleichen** (blau gefüllt) · **Ersetzen** (rote Schrift) ·
  **Abbrechen**. Abgleichen nimmt je Feld die neuere Fassung (R-42), Gelöschtes bleibt gelöscht (R-43); das
  Ergebnis zeigt ein kleines Fenster (R-44). Alle Fälle: Abschnitt 15.18.
- **Kontextmenü:** Langes Drücken (ca. 0,6 s) auf einen Eintrag öffnet rechts daneben ein Menü
  (ist daneben kein Platz – iPhone –, linksbündig unter der Kachel, ganz sichtbar über der
  Backup-Kachel; die Liste rückt dafür nötigenfalls nach oben, R-40)
  (Komponente Menü) mit Einstellungen (settings) · … löschen (rot, Sprechblase) – **ohne ‚Öffnen‘**,
  weil Tippen öffnet (wie Notizen); der Eintrag ist dabei blau getönt. Kein Wischen, kein Hinweistext.
  [HIG – Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus)

### 15.5 Kapsel
- **Apple:** [HIG – Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- Mehrere Schaltflächen in einer schwebenden Kapsel (44 px hoch, je Icon 48 px breit);
  Text-Schaltflächen darin mit Innenabstand 14 px. Technisch `.grp` (`.navgrp`).
- **Alle Kapseln gleich gebaut** (Kopfzeile, Seitenleiste, Treffer-Pfeile, Blättern, Auswahl-Kapseln):
  Schaltflächen genau so hoch wie der Innenraum (44 px minus Rand); die Markierung (gedrückt bzw.
  blau gefüllt) ist eine eigene Kapsel mit 3 px Luft und liegt immer innerhalb des Randes.

### 15.6 Menü
- **Apple:** [HIG – Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- **Zweck:** weitere Aktionen hinter ellipsis bzw. Auswahl hinter einer Schaltfläche.
  **Technisch:** `.menu` (öffnen mit `openMenu`).
- **Aussehen:** Karte 340 px, Radius 14 px, Lichtkante und Schatten wie die Schaltflächen;
  Einträge 46 px hoch, Icon **vor** dem Text, **keine Linien zwischen einzelnen Punkten**; Gruppen durch eine **dünne, links und
  rechts eingerückte Linie** getrennt (wie Apple, iOS 26 – `'sep'`/`'line'`, 1 px, 20 px Einzug);
  Auswahl mit blauem Häkchen vorne (bei Punkten mit Icon: Häkchen, dann Icon und Text); graue Zusatzzeile unter einem Eintrag; graue Notizen und
  technische Informationen (Version, Speicher, Zahl der Tage, Dateiname) ganz unten nach der
  Linie, ohne Leerzeilen. Nichts blau eingefärbt, „… löschen“ rot.
- **Untermenü** (`submenu`, eine Ebene, höchstens etwa 5 Punkte): Eintrag mit grauem Wert und ›;
  öffnet neben dem Menü, oben bündig; der Eintrag bleibt blau, solange es offen ist.
- **Verhalten:** erscheint unter der Schaltfläche (darf über die Seitenleiste
  hinausragen); die Schaltfläche ist so lange gedrückt (blau getönt); daneben tippen schließt.
  Reicht der Platz darunter nicht, scrollt das Menü in sich (erst unter 200 px Platz öffnet es nach oben).
- **Beim Drehen (seit 4.10.0, R-40):** offenes Menü, Untermenü und Sprechblase werden neu ausgerichtet –
  das Menü unter der aufrufenden Schaltfläche, das Untermenü neben seinem Eintrag, ganz sichtbar.
  Liegt die Schaltfläche in der Seitenleiste, bleibt die Seitenleiste dabei sichtbar (iPad hoch: darübergelegt).
  Ist eine Schaltfläche danach nicht mehr da, schließt sich ihr Menü; eine Sprechblase (offene Entscheidung)
  bleibt und steht mittig. Das Prüfskript dreht jede Ansicht mit offenem Menü automatisch (R-40).

### 15.7 Sprechblase (Abfrage)
- **Apple:** [HIG – Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers) · [HIG – Action sheets](https://developer.apple.com/design/human-interface-guidelines/action-sheets) · [HIG – Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- **Zweck:** jede Abfrage mit Entscheidung. **Technisch:** `.pop` (`confirmPop`).
- **Aufbau:** grauer Text · rote Schaltfläche mit dem Verb der Aktion · darunter der Weg
  zurück („Abbrechen“ bzw. „Weiter bearbeiten“, normale Schrift); **Schaltflächen ohne Icons**
  wie in Apple-Abfragen; Breite 320 px.
- **Wege mit Erklärung (seit 4.10.0, R-46):** bekommt ein Weg eine Erklärung (`desc`), steht er in einer eigenen
  Kachel – Erklärung oben (gleiche Schrift wie der Text der Sprechblase), Knopf darunter; ‚Abbrechen‘ darunter.
- **Mehrere Wege (seit 4.9.0, `choosePop`, R-38):** wie eine Apple-Abfrage mit drei Knöpfen –
  die empfohlene Aktion blau gefüllt (`primary`) zuerst, eine zerstörende in roter Schrift
  (`danger-text`), zuletzt ‚Abbrechen‘; eine kurze graue Erklärung der Wege steht im Text.
- **Verhalten:** an der angetippten Schaltfläche (diese ist gedrückt); daneben tippen bricht ab.
- **Passt immer auf den Bildschirm (seit 4.9.1, R-39):** auf dem iPhone quer ist die Sprechblase
  breiter (bis 600 px) und die Knöpfe stehen nebeneinander; reicht der Platz trotzdem nicht, scrollt
  der Inhalt in ihr. Gilt ebenso für Menüs und Fenster.

### 15.8 Fenster-Kopfzeile
- **Apple:** [HIG – Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- **Aufbau:** links rundes x (44 × 44) · Mitte Titel (19 px) mit grauer Zusatzzeile (13 px) ·
  rechts ggf. eine Kapsel und das runde Häkchen. Häkchen grau, nach einer Änderung blau
  gefüllt. Technisch `dlgHead()`.

### 15.9 Fenster
- **Apple:** [HIG – Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- Typen: **Bearbeiten** (z. B. Neu, Einstellungen), **Erfassung**, **Vorschau**, **Meldung**
  – Aufbau und Verhalten siehe Abschnitt 7.

### 15.10 Kasten (Schritt)
- **Apple:** [HIG – Boxes](https://developer.apple.com/design/human-interface-guidelines/boxes)
- Fläche `--dlg-card` bzw. `--card`, Radius 14 px, ohne Rand, Innenabstand 14 px;
  Kopfzeile mit blauer Schritt-Nummer, Titel, rechts Options-Kapseln und Icon-Schaltflächen.
- **Kasten mit Feldern** (`.box` mit `.kv`, iPhone statt Tabellenzeile): Felder durch dünne
  Linien getrennt (1 px `--line`, wie die Trennlinie im Menü) – waagrecht zwischen den Feldern,
  senkrecht zwischen Bezeichnung und Inhalt. Bezeichnung als Wort in normaler Schrift
  (`.k.word`, 17 pt halbfett) oder als Emoji/klein grau.

### 15.11 Eingabefeld mit Fehlermeldung
- **Apple:** [HIG – Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields)
- Fläche weiß bzw. `--dlg-field`, Lichtkante `--btn-rim` und Schatten `--float` wie die
  schwebenden Schaltflächen (auch Zahlenfelder wie Gesamtkosten), Radius 10 px, 44 px hoch
  (Textfelder mehrzeilig); Fehler: 1 px roter Rand und rote Meldung darunter
  (Abschnitt 8). Textfelder wachsen mit dem Inhalt; Datumsfelder so breit wie das Datum.

### 15.12 Smiley-Leiste und Auswahl-Kapsel
- **Apple:** [HIG – Collections](https://developer.apple.com/design/human-interface-guidelines/collections)
- Siehe Abschnitt 8; Smileys als runde schwebende 44 × 44-Schaltflächen, Abstand 12 px.
- **Auswahl-Kapsel:** Mehrere Auswahl-Schaltflächen (Smileys, Wetter, Reisemittel …) stehen in
  **einer** schwebenden Kapsel (44 px hoch, Lichtkante, Schatten, keine Ränder dazwischen).
  Reicht der Platz nicht, lässt sich der Inhalt nach links/rechts wischen; ein weicher Verlauf am
  Rand zeigt, wo es weitergeht. Gewählte Einträge sind blau getönt (Haarlinie `--accent`), und
  zwar als eigene Form **innerhalb** der Schaltfläche mit Luft rundherum (wie Tapback): bei
  Emojis ein Kreis von 36 px, bei Text eine Kapsel mit 3 px Abstand nach innen – markierte
  Nachbarn stoßen nie aneinander. Schaltflächen füllen genau den Innenraum der Kapsel. Zurücksetzen (rotate-ccw) steht als eigene runde Schaltfläche rechts daneben.
  Vorbild: Tapback-Leiste in Nachrichten. Technisch `.cap` > `.scroll`.

### 15.13 Tabelle
- **Apple:** [HIG – Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
- Siehe Abschnitt 9.

### 15.14 Info-Icon mit Hinweis
- **Apple:** [HIG – Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Runde Icon-Schaltfläche `info`; ein Tippen blendet einen grauen Hinweis ein bzw. aus.

### 15.15 Schalter (Einstellungen ein/aus)
- **Apple:** [HIG – Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles)
- **Zweck:** Ein/Aus-Einstellungen, z. B. in Bearbeiten-Fenstern. **Technisch:** `.swlist`,
  `label.check.sw` mit `input[type=checkbox]`.
- **Aufbau:** Zeile mit Text links und Apple-Schalter rechts; Zeilen 52 px hoch, dazwischen
  Haarlinie; Schalter 51 × 31 px, weißer Knopf.
- **Zustände:** ein = `--sw-on` (Apple-Grün), Knopf rechts; aus = `--sw-off`, Knopf links;
  gesperrt 40 % Deckkraft (Text und Schalter). Kein Schein.

### 15.16 Options-Kapsel (Optionen beim Erfassen)
- **Apple:** [HIG – Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles)
- **Zweck:** einzelne Ein/Aus-Optionen in der Kopfzeile eines Kastens. **Technisch:**
  `label.check.chip` mit verstecktem `input[type=checkbox]`.
- **Aussehen:** wie eine schwebende Schaltfläche (Kapsel, 44 px, Schrift 15 px); ein =
  `--sel-bg`, Haarlinie `--accent`, Schein `--glow-accent` und **Häkchen in Akzentfarbe vor
  dem Text**; aus = neutral ohne Häkchen; gesperrt 40 % Deckkraft.

### 15.17 iPhone-Ansicht (kompakte Breite)
- **Apple:** [HIG – Layout](https://developer.apple.com/design/human-interface-guidelines/layout) ·
  [HIG – Navigation](https://developer.apple.com/design/human-interface-guidelines/navigation-and-search) ·
  Vorbild Notizen auf dem iPhone (iOS 26, `apple-referenz/iphone/notizen`).
- **Wann:** iPhone hoch **und** quer sowie sehr schmale Fenster – unter 700 px breit oder unter
  500 px hoch. **Technisch:** `isPhone()` in `ui.js`; `<html>` bekommt die Klasse `phone`
  (`applyLayout`, auch beim Drehen); die App baut ihre Seiten danach, ihr `resize`-Handler ruft
  bei einem Wechsel `render()`.
- **Seiten:** eine Seite nach der anderen statt Seitenleiste. Startliste als eigene Seite; ein
  Eintrag öffnet seine Seite.
- **Seitenkopf** (`.pnav`): bleibt fest oben stehen; links runder Zurück-Knopf mit
  `chevron-left` **ohne Text**, rechts **dieselbe Kapsel wie am iPad** (z. B. [`plus` |
  `ellipsis`] in der Startliste, [`share` | `search` | `ellipsis`] im Inhalt).
- **Titel einer Inhaltsseite** (z. B. ein Reiselogbuch) steht wie am iPad **immer in der Leiste**
  (`.pnav-title`, ohne großen Titel darüber); darunter die Angaben mit Bezeichnung, auf dem iPhone
  mit Umbruch nach dem Doppelpunkt.
- **Großer Titel** (`.ltitle`, 34 pt fett, nur noch bei Bedarf) mit grauer Zeile darunter (`.lcount`).
  Wie Notizen: Wird er hochgeschoben, erscheint der Titel klein (17 pt halbfett) in der Mitte
  der Leiste (`.pnav-title`, `.pnav.titled`, `updateBar()` in `ui.js`) und bleibt dort, bis man
  wieder ganz nach unten zieht.
- **Liste** (`.ilist` mit `.irow`): weiße Karte mit runden Ecken (22 px); Zeilen mit fettem Titel,
  grauer Zeile darunter und `chevron-right`; Haarlinie links eingerückt. Tippen öffnet, lange
  drücken zeigt das Kontextmenü; markierte Zeile `--sel-bg`.
- **Startliste = Seitenleiste (seit 4.7.0 derselbe Baustein, R-36):** die Startliste ist die
  Seitenleiste `#side` als ganze Seite (`#side.page`) – kein eigener Nachbau. Kopf wie am iPad
  (Titel links, 20 pt fett, darunter klein und grau die Anzahl, rechts [`plus` | `ellipsis`];
  panel-left entfällt), Kacheln `.side-row` in `.side-list`, Backup-Kachel `.side-foot`; die
  Kacheln laufen unter dem Kopf und hinter der Backup-Kachel durch – genau wie am iPad.
  (`.ilist.tiles` bleibt als Liste für andere Seiten.)
- **Kasten** (`.box` mit Zeilen `.kv` = graue Bezeichnung `.k` links, Wert `.v` rechts): ein
  Eintrag als Karte, z. B. ein Tag statt einer Tabellenzeile.
- **Tastatur der Suche:** wischt man den Inhalt, während die Tastatur der Suche offen ist,
  schließt sie sich (wie bei Apple). Sonst verschiebt iOS den sichtbaren Bereich und die
  Leisten zittern (R-05).
- **Suche** wie am iPad (Komponente Suchfeld): `search` in der Kapsel öffnet unter der Leiste
  die Suchzeile mit ‚1 von 4‘, ⓧ und ⌃ ⌄; gefiltert wird auf Einträge mit Treffern.
- **Fester Hinweis unten** (`.bbar` mit `.bnote`): z. B. der Backup-Hinweis – gelb getönte Karte
  (`--focus`) mit blau gefülltem Knopf, fest am unteren Rand; die Liste läuft dahinter durch
  (Verlauf), bei offener Tastatur wandert die Leiste über die Tastatur (`--vv-bottom`). Am iPad
  steht derselbe Hinweis ebenso gelb fest am unteren Rand der Seitenleiste.
- **Fenster** bildschirmfüllend (bei offener Tastatur bis zur Tastatur); Kopfzeile kompakt mit
  einzeiligem Titel (kurze Form, z. B. ‚Di, 25.08.2026‘); Options-Kapseln stehen unter dem
  Kasten-Titel. Meldungen bleiben kleine Fenster in der Mitte.
- **Abfragen** wie auf dem iPad als Sprechblase an der angetippten Schaltfläche (iOS 26 zeigt
  Abfragen ebenfalls an der Schaltfläche).
- Menüs, Kapseln und Schaltflächen wie auf dem iPad (44 pt).

### 15.18 Abgleich zwischen iPad und iPhone (seit 4.10.0, R-41 bis R-44)
- **Apple:** iCloud gleicht ohne Rückfrage ab; ohne Entwicklerkonto geht es bei uns über ein Backup in
  iCloud Drive – mit derselben Grundregel wie Apple: **die neuere Änderung gilt**, je Feld.
- **Technisch:** gemeinsamer Baustein `createSync({ list, sub, subAt, maxFields, nouns })` in `ui.js` – jede App mit
  Backup nutzt ihn (keine eigene Umsetzung, R-36). Beim Speichern stempelt `sync.stamp()` jedes geänderte Feld mit
  Zeitpunkt und Gerät (Kopfdaten `metaAt`, Unterdaten wie Tage `subAt`), gelöschte Einträge kommen nach
  `data.deleted`; das Backup enthält `savedAt` und `savedOn`.
- **Weg:** auf dem einen Gerät ‚Backup erstellen‘ → ‚In Dateien sichern‘ → iCloud Drive; auf dem anderen
  ‚Backup laden‘ → Datei wählen → Abfrage (R-41) → ‚Abgleichen‘ → Ergebnisfenster (R-44).
- **Prüfung:** `tests/abgleich.mjs` prüft alle Fälle der Tabelle in beide Richtungen für jede App automatisch.

| Nr. | Anwendungsfall | iPhone lädt das Backup vom iPad → ‚Abgleichen‘ | iPad lädt das Backup vom iPhone → ‚Abgleichen‘ |
|---|---|---|---|
| 1 | Eintrag nur auf dem iPad neu angelegt | kommt dazu – ‚Neu: …‘ | bleibt – ‚Alles war schon auf dem gleichen Stand‘ |
| 2 | Auf dem iPad gelöscht, auf dem iPhone seitdem nicht geändert | wird gelöscht – ‚Gelöscht: …‘ | bleibt gelöscht – Hinweis ‚Hier gelöscht, im Backup noch vorhanden: … (gelöscht am …) – bleibt gelöscht. Zurückholen nur mit Ersetzen‘ |
| 3 | Auf dem iPad gelöscht, auf dem iPhone **danach** noch geändert | bleibt erhalten – Hinweis ‚Drüben gelöscht, hier danach noch geändert: … – bleibt erhalten‘ | kommt mit den Änderungen vom iPhone zurück – ‚Neu: …‘ |
| 4 | Auf dem iPad gelöscht, auf dem iPhone **vorher** geändert | wird gelöscht – ‚Gelöscht: …‘ | bleibt gelöscht – Hinweis wie Fall 2 |
| 5 | Auf beiden Geräten gelöscht | bleibt weg, keine Meldung | bleibt weg, keine Meldung |
| 6 | Nur auf dem iPad Unterdaten (z. B. ein Tag) erfasst oder geändert | übernommen – ‚Aktualisiert: … (1 Tag)‘ | bleibt – ‚Alles war schon auf dem gleichen Stand‘ |
| 7 | Verschiedene Unterdaten (Tage) auf iPad und iPhone geändert | beide sind da | beide sind da |
| 8 | Gleiche Unterdaten, verschiedene Felder (iPad: Wetter, iPhone: Verlauf) | beides bleibt | beides bleibt |
| 9 | Gleiches Feld auf beiden geändert (iPhone später) | die neuere Fassung (iPhone) bleibt | die neuere Fassung (iPhone) wird übernommen |
| 10 | Feld auf dem iPad geleert, iPhone unverändert | Feld wird auch hier geleert, der Rest bleibt | bleibt leer |
| 11 | Feld auf dem iPad geleert, auf dem iPhone **danach** neu eingetragen | der neue Eintrag bleibt | der neue Eintrag wird übernommen |
| 12 | Kopfdaten: verschiedene Felder (iPad Titel, iPhone Fazit) | beides bleibt | beides bleibt |
| 13 | Kopfdaten: gleiches Feld auf beiden geändert | das Neuere gilt | das Neuere gilt |
| 14 | Auf beiden ein neuer Eintrag mit gleichem Namen | beide bleiben (verschiedene Einträge) | beide bleiben |
| 15 | Nichts geändert bzw. dasselbe Backup noch einmal | ‚Alles war schon auf dem gleichen Stand‘ | wie links |
| 16 | Daten ohne Zeitpunkt (vor dem Abgleich-Update, ältere Backups) | Vorhandenes bleibt, Fehlendes kommt dazu; unterschiedliche Werte bleiben je Gerät verschieden | wie links – Tipp: einmal ‚Ersetzen‘, dann starten beide gleich |
| 17 | Zähler ohne Zeitpunkt (`maxFields`, z. B. Dateinummer) verschieden | der größere Wert gilt | wie links |
| 18 | Einstellungen (Darstellung, Smiley-Leiste, ‚Letztes Backup‘) | bleiben die des iPhones | bleiben die des iPads |
| 19 | ‚Ersetzen‘ statt ‚Abgleichen‘ | alle Daten des iPhones werden durch das Backup ersetzt (hier Gelöschtes kommt zurück, hier Geändertes geht verloren); ‚Letztes Backup‘ bleibt | wie links |
| 20 | ‚Abbrechen‘ oder daneben tippen | nichts ändert sich | wie links |

### 15.19 Backup erstellen und Backup laden (seit 4.10.0, R-45, R-46)
- **Apple:** [HIG – Activity views](https://developer.apple.com/design/human-interface-guidelines/activity-views) (Teilen-Menü) ·
  [HIG – File management](https://developer.apple.com/design/human-interface-guidelines/file-management) (Dateien-App, iCloud Drive)
- **Technisch:** gemeinsame Bausteine in `ui.js` – `backupFileOf(app, data)`, `shareFiles()`, `shareResultText()`,
  `backupLastText()`, `backupToday()`, `backupTileHtml()`, `backupMenuEntries()`, `readBackup()`; für den Abgleich
  `createSync()` (15.18). Jede App mit Backup nutzt sie – keine eigene Umsetzung (R-36).
- **Backup erstellen** (R-45):
  - **Wo:** Backup-Kachel unten in der Seitenleiste bzw. Startliste (‚Letztes Backup erstellt am …‘ bzw. ‚Noch kein
    Backup erstellt.‘ und der Knopf ‚Backup erstellen‘ – gelb mit blauem Knopf, solange heute noch kein Backup
    erstellt wurde) und im Mehr-Menü der Seitenleiste: ‚Backup erstellen‘ (Icon `save`, darunter grau ‚Letztes Backup
    erstellt am …‘), direkt darunter ‚Backup laden‘ (Icon `folder-open`).
  - **Ablauf:** Teilen-Menü (iOS) → ‚In Dateien sichern‘ (z. B. iCloud Drive). Datei
    ‚Ω Backup <App> JJJJ.MM.TT hh.mm.json‘ mit allen Daten, Zeitpunkt und Gerät.
  - **Danach:** kleines Fenster ‚Backup‘ mit ✅ und Ort der Datei bzw. ⚠️ bei Abbruch; ‚Letztes Backup‘ zählt nur,
    wenn das Teilen abgeschlossen wurde, und gilt je Gerät; die Backup-Kachel wird weiß.
- **Backup laden** (R-46):
  - **Ablauf:** Mehr-Menü → ‚Backup laden‘ → Dateiauswahl (z. B. iCloud Drive) → Abfrage → Ergebnisfenster (R-44).
  - **Abfrage** (Sprechblase an der Schaltfläche, 400 px breit): oben grau ‚Backup vom **…** (Gerät) mit n …‘ und
    ‚Es ist **neuer/älter/gleich alt** als die Daten auf diesem Gerät (zuletzt geändert am …)‘; darunter **je Weg eine
    Kachel** (Hintergrund `--bg`, Radius 14 px): oben die Erklärung in **derselben Schrift** wie ‚Backup vom …‘
    (15 px, grau), darunter der Knopf – Kachel 1 ‚Abgleichen‘ (blau gefüllt), Kachel 2 ‚Ersetzen‘ (rote Schrift);
    unter den Kacheln ‚Abbrechen‘ wie in jeder Abfrage. iPhone quer: Kacheln nebeneinander (R-39).
  - **Unlesbare Datei:** kleines Fenster ‚Backup laden‘ mit ⚠️ und dem Grund.
  - **Abbrechen / daneben tippen:** nichts ändert sich.
- **Prüfung:** `tests/backup.mjs` bedient Menü, Backup erstellen, Backup laden (Abfrage, Abbrechen, unlesbare Datei)
  in jeder App automatisch und prüft Texte, Layout, Schriftgrößen und Ergebnis.

## 16. HIG-Checkliste

Jedes Muster und jede Version wird **vorher** an dieser Liste gemessen (Apple-Abgleich, siehe
`README - Zusammenarbeit allgemein.md`, Abschnitt 3). Abweichungen werden genannt und begründet.
Messbare Punkte prüft das HIG-Prüfskript automatisch.

1. **Antippflächen** ([Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)): Standard 44 × 44 pt, nie kleiner
   als 28 × 28 pt (Knöpfe in Kapseln und Schalter wie bei Apple ab 28 pt). Kleine Zeichen und
   Links bekommen eine unsichtbar größere Antippfläche (Innenabstand), das Layout bleibt gleich.
2. **Schrift:** Fließtext 17 pt, kleinste Schrift 11 pt, Hinweise 13 pt grau; Überschriften nach
   Apple-Textstilen (17 halbfett, 20, 22, 28, 34 pt).
3. **Kontrast und Farbe:** Kontrast mindestens 4,5 : 1 bis 17 pt, 3 : 1 ab 18 pt oder fett –
   immer hell **und** dunkel prüfen. Farbe nie als einziges Merkmal. Blau = Aktion/Auswahl,
   Rot = Löschen.
4. **Auswahl** ([Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)): Was zu einem Inhalt führt, bleibt
   markiert, solange dieser offen ist; Optionen kurz markieren, dann Häkchen. Jede Berührung
   gibt sichtbare Rückmeldung.
5. **Menüs** ([Menus](https://developer.apple.com/design/human-interface-guidelines/menus)): Gruppen durch Strich getrennt, Wichtigstes oben; Icons in
   einer Gruppe alle oder keine, für Standardaktionen die bekannten Symbole (Teilen, Suchen,
   Löschen); Beschriftung mit Verb; **kein „…“** am Ende (die HIG nennt es für weitere Eingaben,
   Apples iPhone-/iPad-Apps verwenden es nicht, z. B. ‚Move Note‘); nicht verfügbare Punkte grau; Untermenüs nur eine Ebene, höchstens etwa 5 Punkte.
6. **Kontextmenüs** ([Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus)): wenige Punkte, höchstens etwa 3 Gruppen;
   Häufigstes nah am Finger, Löschen rot am Ende; nicht verfügbare Punkte **ausblenden** statt
   grau; alles auch ohne Kontextmenü erreichbar; in der ganzen App einheitlich.
7. **Abfragen:** Löschen und Verwerfen immer bestätigen; die Schaltfläche heißt wie die Aktion
   (‚Löschen‘), ‚Abbrechen‘ ist immer da.
8. **Texte** ([Writing](https://developer.apple.com/design/human-interface-guidelines/writing)): einfach, ohne Fachbegriffe, so kurz wie möglich; kein
   ‚wir‘; ‚tippen‘ statt ‚klicken‘; Fehlermeldungen sagen, **was zu tun ist** – ohne Vorwurf,
   direkt beim Problem; ein leerer Bildschirm nennt den nächsten Schritt; ein Schalter beschreibt,
   was er eingeschaltet tut; Anführungszeichen ‚…‘.
9. **Fenster:** links x (Abbrechen), rechts Häkchen (Fertig), hervorgehoben sobald etwas
   geändert wurde; Schließen mit Änderungen fragt nach.

**Bewusste Abweichungen** (entschieden, werden vom HIG-Prüfskript nicht als Fehler gezählt):

| Was | Messwert | Grund | Entschieden |
|---|---|---|---|
| Weiße Schrift auf Systemblau (`--accent`): gewählte Zeile, ‚heute‘, Schrittnummern, Häkchen | 4,0 : 1 hell · 3,7 : 1 dunkel | Apple-Systemblau wie in allen Apple-Apps | 09.10.2026 |
| Orange `--warn` (z. B. ‚fehlt‘) | 3,1–3,5 : 1 | bleibt wie es ist | 09.10.2026 |

## 17. Regelkatalog

Alle allgemeinen Regeln mit Nummer. **Skript** = prüft das HIG- und Regel-Prüfskript
(`tests/hig.mjs`) in jeder Ansicht jeder App automatisch · **Ablauf** = prüft der Ablauf-Test der
App · **Gerät** = nur am iPad/iPhone prüfbar; diese Punkte kommen in die Prüfliste, wenn eine
Version sie betrifft. Vor jedem Muster und nach jeder Version wird gegen diesen Katalog geprüft
(`README - Zusammenarbeit allgemein.md`, Abschnitte 3 und 7). Neue allgemeine Regeln bekommen
hier sofort eine Nummer und – wo möglich – eine Prüfung im Skript.

| Nr. | Regel | Prüfung | Abschnitt |
|---|---|---|---|
| R-01 | Nur der Vordergrund reagiert: offenes Fenster sperrt die Seite, Menü/Sprechblase fangen Wischen ab | Skript | 1 |
| R-02 | Kein Fokus-Rahmen beim Antippen oder Öffnen eines Fensters (auch nicht im Suchfeld) | Skript | 1, 15.2 |
| R-03 | Gleiche Bedienung auf iPad und iPhone (gleiche Kapseln, Suche, Menüs) | Muster, Ablauf | 1 |
| R-04 | Doppeltippen vergrößert nie die Ansicht | Skript | 1 |
| R-05 | Eine Symbolleiste – mit oder ohne Suchzeile – steht immer an ihrem Platz und bewegt sich beim Wischen keinen Millimeter (auch am Rand, bei offener und beim Schließen der Tastatur); Seite federt nicht; in der Seitenleiste scrollen nur die Einträge | Skript (Lage der Leiste beim Scrollen gemessen, mit und ohne Suchzeile) · Ablauf (erstes Wischen bei offener Tastatur bewegt nichts) · Gerät (Tastatur, Federn) | 1 |
| R-06 | Bezeichnung und Feld gehören zusammen (Umbruch nur vor der Bezeichnung) | Skript | 8 |
| R-07 | Großbuchstabe am Zeilenanfang und nach einem Vorschlag | Ablauf · Gerät (iOS-Tastatur) | 8 |
| R-08 | Gelbe Markierung ohne blauen Rand | Skript | 9 |
| R-09 | Titel einer Inhaltsseite steht in der Leiste | Skript | 15.17 |
| R-10 | Backup-Kachel immer da (gelb, solange heute noch kein Backup erstellt wurde) | Skript | 15.4, 15.17 |
| R-11 | Antippflächen 44 pt (in Kapseln und Schaltern 28 pt) | Skript | 16 |
| R-12 | Schrift mindestens 11 pt | Skript | 16 |
| R-13 | Kontrast 4,5 : 1 bzw. 3 : 1, hell und dunkel | Skript | 16 |
| R-14 | Anführungszeichen ‚…‘ | Skript | 16 |
| R-15 | Menüs: Löschen rot am Ende, keine Linien zwischen einzelnen Punkten | Skript | 15.6 |
| R-16 | Gewähltes bleibt blau, solange sein Menü, Fenster oder seine Abfrage offen ist | Skript | 16 |
| R-17 | Diktieren nur über die Mikrofon-Taste der Tastatur | Muster | 8 |
| R-18 | Fenster auf dem iPhone bildschirmfüllend | Skript | 15.17 |
| R-19 | Nach oben / Ans Ende in einer senkrechten Kapsel | Skript | 4 |
| R-20 | Eingabefelder mindestens 16 px (sonst vergrößert iOS beim Antippen) | Skript · Gerät | 8 |
| R-21 | Anzahl klein und grau unter dem Titel der Seitenleiste bzw. Startliste | Skript | 15.4, 15.17 |
| R-22 | Alle Schaltflächen und Suchfelder schweben (Lichtkante und Schatten); Kapseln als Ganzes | Skript | 4, 15.1 |
| R-23 | Keine Systemfenster und keine englischen Texte (‚OK‘, ‚Close‘, ‚Cancel‘) – Abfragen als Sprechblase, Meldungen im kleinen Fenster | Skript | 1 |
| R-24 | Alle Aktionen sind echte Schaltflächen, gleiche Aktion = gleiche Bezeichnung und gleiches Icon überall | Muster | 1, 5, 6 |
| R-25 | Tabellen: Trennlinien zwischen allen Spalten | Skript | 9 |
| R-26 | Datumsfelder so breit wie das Datum (mit Kalender-Icon) | Skript | 8 |
| R-27 | Betragsfelder rechtsbündig, Betrag ‚4.850,00 €‘ | Skript | 8 |
| R-28 | Kopfzeile und Suchzeile bleiben bei offener Tastatur sichtbar | Ablauf · Gerät | 13 |
| R-29 | Hängender Einzug: Folgezeilen beginnen unter dem Text, nicht unter dem Zeichen | Skript | 9 |
| R-30 | Kasten mit Feldern: Linien waagrecht zwischen den Feldern und senkrecht zwischen Bezeichnung und Inhalt | Skript | 15.10 |
| R-31 | Zentrale Liste (Seitenleiste, Startliste) als Kacheln, höchstens ein Eintrag blau | Skript | 15.4, 15.17 |
| R-32 | Aktionen und Suche stehen oben in der Kapsel – unten nur feste Hinweise (z. B. Backup-Kachel) | Skript | 15.17 |
| R-33 | Darstellung folgt dem Gerät (‚Automatisch‘), im Mehr-Menü übersteuerbar | Skript | 2 |
| R-34 | Teilen (`share`) immer nur als Icon, nie mit Text | Skript | 5 |
| R-35 | Schatten zierlich, Seitenleiste schwebend wie in Safari, Apple-Look | Muster | 1, 15.4 |
| R-36 | Gleiche Funktion = gleicher Baustein auf iPad und iPhone: eine Umsetzung, die sich nur in der Breite unterscheidet (z. B. Seitenleiste am iPad = Startliste am iPhone; Kacheln laufen auf beiden unter der Backup-Kachel durch) – nie zwei getrennte Nachbauten | Skript (Gerätevergleich des Aufbaus) | 1, 15.4, 15.17 |
| R-37 | Kein Text ragt über Zelle, Kasten oder Kachel hinaus: zu lange Wörter brechen im Wort um und laufen in der nächsten Zeile weiter (iPad und iPhone) | Skript (Testdaten mit 100 × ‚a‘) | 9, 15.10 |
| R-38 | Abfrage mit mehreren Wegen: empfohlene Aktion blau gefüllt zuerst, zerstörende in roter Schrift, ‚Abbrechen‘ zuletzt; kurze Erklärung der Wege im Text | Skript | 15.7 |
| R-39 | Menü, Sprechblase und Fenster passen immer ganz auf den Bildschirm (auch iPhone quer); ist der Inhalt zu hoch, scrollt er darin – kein Knopf liegt außerhalb | Skript | 15.6, 15.7, 15.9 |
| R-40 | Beim Drehen (hoch ↔ quer) wird jedes offene Menü, Untermenü und jede Sprechblase sofort neu ausgerichtet: Menü unterhalb seiner aufrufenden Schaltfläche, Untermenü neben seinem Eintrag, Kontextmenü einer Kachel daneben bzw. (iPhone) linksbündig darunter über der Backup-Kachel – immer vollständig sichtbar (reicht der Platz nicht, scrollt der Inhalt darin bzw. rückt die Liste nach oben); die Schaltfläche bleibt blau. Liegt die Schaltfläche in der Seitenleiste, bleibt diese dabei sichtbar (hoch darübergelegt) | Skript – automatisch: jede Ansicht mit offenem Menü, Untermenü oder offener Sprechblase wird hoch ↔ quer gedreht und zurück, in jeder App ohne eigenen Aufruf · Ablauf (Kontextmenü iPhone) · Gerät | 15.4, 15.6, 15.7 |
| R-41 | Abgleich zwischen iPad und iPhone über das Backup: das Backup enthält Zeitpunkt und Gerät; ‚Backup laden‘ fragt (Sprechblase mit Kacheln, R-46) mit Zeitpunkt, Gerät und ‚neuer/älter als die Daten auf diesem Gerät‘ und den Wegen Abgleichen · Ersetzen · Abbrechen; jede App nutzt dafür den gemeinsamen Baustein `createSync` | Skript (`tests/abgleich.mjs`) · Ablauf | 15.4, 15.18 |
| R-42 | Beim Abgleichen gilt **je Feld** die neuere Änderung – in den Kopfdaten und in den Unterdaten (z. B. je Tag); gleich alt oder ohne Zeitpunkt: das Vorhandene hier bleibt, Fehlendes kommt dazu; Zähler ohne Zeitpunkt: der größere Wert; Einstellungen bleiben je Gerät | Skript (`tests/abgleich.mjs`, Fälle 6–18) | 15.18 |
| R-43 | Ein gelöschter Eintrag bleibt gelöscht, solange er danach nicht mehr geändert wurde (auch wenn er im Backup noch vorhanden ist – mit Hinweis); wurde er danach noch geändert, bleibt er bzw. kommt zurück (mit Hinweis); auf beiden gelöscht bleibt er weg | Skript (`tests/abgleich.mjs`, Fälle 1–5) | 15.18 |
| R-44 | Ergebnis des Abgleichs im kleinen Fenster: Aktualisiert (mit Zahl der Tage) · Neu · Gelöscht · Unverändert und die Hinweise zu Gelöschtem bzw. ‚Alles war schon auf dem gleichen Stand‘; jede Kachel zeigt ‚geändert am … · Gerät‘ | Skript (`tests/abgleich.mjs`) · Ablauf | 15.4, 15.18 |
| R-45 | Backup erstellen: Backup-Kachel unten (gelb ohne Backup heute) und Mehr-Menü (‚Backup erstellen‘ mit grauer Zeile ‚Letztes Backup …‘, darunter ‚Backup laden‘); Teilen-Menü → In Dateien sichern; Datei ‚Ω Backup <App> JJJJ.MM.TT hh.mm.json‘ mit Zeitpunkt und Gerät; danach kleines Fenster ‚Backup‘ (✅/⚠️); ‚Letztes Backup‘ je Gerät, nur nach abgeschlossenem Teilen; gemeinsame Bausteine aus ui.js | Skript (`tests/backup.mjs`) | 15.4, 15.19 |
| R-46 | Backup laden: Abfrage mit ‚Backup vom … (Gerät) mit n …‘ und ‚neuer/älter‘ oben, darunter je eine Kachel für Abgleichen (blau) und Ersetzen (rot) mit Erklärung in derselben Schrift wie der Text oben und dem Knopf darunter, zuletzt ‚Abbrechen‘; unlesbare Datei: kleines Fenster ‚Backup laden‘ mit ⚠️ und Grund; Abbrechen ändert nichts | Skript (`tests/backup.mjs`) | 15.7, 15.19 |

---

## Versionsgeschichte

| Version | Datum | Art | Inhalt |
|---|---|---|---|
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
