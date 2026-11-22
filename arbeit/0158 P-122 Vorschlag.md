# P-122 – Korrekturen (Sitzung 0158, 22.11.2026)

## 1. P-122/F-1 – Schaltflächen der Vorschau nach dem Hinweisfenster: behoben (noch nicht gebaut)

- **Feste Prüfung** `ablauf-p120`, Teil `P-122/F-1` (iPad quer, iPhone hoch): genau dein Ablauf – Teilen (Kopfzeile) → ‚Vorschau‘ →
  Teilen bzw. PDF → Meldung ‚Ausgabe V…‘ → x; dazu Teilen abgebrochen und danach Vorschau schließen.
  **Rot gegen 3.58.2** mit 12 Fehlern (Chromium), z. B. `#prvShare` nach dem Schließen ‚fill on‘ statt ‚fill‘.
- **Ursache:** Teilen/PDF aus der Vorschau setzte die Quelle des Fensters (`adSourcehighlight.sourceItem`) auf `#prvShare` bzw. `#prvPdf`. Das ersetzte die
  Quelle der Vorschau (Teilen der Kopfzeile, die verlor ihre Tönung), und beim Schließen der Meldung gab niemand `#prvShare` frei – er blieb getönt (`.on`)
  statt blau gefüllt.
- **Behebung (App, `index.html`):** neue Funktion `outputSource`: über der Vorschau ist die Schaltfläche eine *gehaltene* Quelle der Meldung
  (`hold`, freigegeben beim Schließen von `#msg`), die Quelle der Vorschau bleibt. AppDesign unverändert.
- **Ergebnis:** `P-122/F-1` grün in Chromium und WebKit; `P-121/F-2` und `F-3` (Nachbarn) grün.
- **Dieselbe Lücke gesucht:** PDF aus der Vorschau – dieselbe Ursache, mit behoben und geprüft. In `ui.js` setzt sonst niemand eine Quelle für ein
  Hinweisfenster über einem offenen Fenster. **Auffällig (nicht geändert):** im Abgleichbericht (`ui.js`, `openReport`) wird Teilen/PDF während der
  Meldung gar nicht getönt – kein Hängenbleiben, aber anders als in der Vorschau. Vorschlag: später eine Eigenschaft der AD-Bean `alert`
  (Quelle halten bis zum Schließen), dann gilt es für alle Apps.

## 2. P-122/F-2 – Ausrichtung von Schaltflächen in Hinweisen

### 2.1 So macht es Apple (Quelle: HIG, abgerufen 22.11.2026)

- [HIG – Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts): „alerts display a title, optional informative text, and up to
  three buttons.“ · „place the button people are most likely to choose on the trailing side in a row of buttons or at the top in a stack of buttons.“ ·
  „Cancel buttons are typically on the leading side of a row or at the bottom of a stack.“
- [HIG – Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons): „use a button that has a prominent visual style for the most
  likely action in a view.“ · „Keep the number of prominent buttons to one or two per view.“ (Der Satz „Prefer buttons that span the width of the
  screen“ steht im Abschnitt watchOS – gilt nicht für iPad/iPhone.)
- [HIG – Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets): Abbrechen links oben, Fertig rechts oben in der Leiste – keine
  Aussage zu Schaltflächen im Inhalt.
- **Nicht in der HIG:** ob eine einzelne Schaltfläche im Inhalt mittig oder links steht. **Vermutung** (nicht belegt, kein Vergleichsbild im Repo):
  in iOS-Hinweisen stehen Titel, Text und Schaltflächen mittig; in Listen und Formularen (Einstellungen) links an der Textkante. Gern 1–2 Bildschirmfotos
  eines Apple-Hinweises (z. B. iPad, Einstellungen → Allgemein → Info → Name ändern bzw. ein Hinweis mit einer Schaltfläche) für `apple-referenz/`.
- **Bei uns schon so:** Designrichtlinie 7 ‚Meldung: … Text zentriert‘; R-10.8 Dateiname zentriert; `.ad-alert-buttons` (‚Abgleichbericht anzeigen‘) mittig;
  leerer Zustand 15.23 mittig; Sprechblasen-Schaltflächen volle Breite.

### 2.2 Bestand (Schaltflächen unter einem Text, außerhalb von Kopfzeile, Kapsel, Menü)

| Ort | Wer baut es | Text | Schaltfläche heute |
|---|---|---|---|
| Hinweisfenster ‚Abgleichen‘/‚Backup laden‘ → ‚Abgleichbericht anzeigen‘ | AppDesign `ui.js` (`alert`, `action`) | mittig | **mittig** |
| Hinweisfenster ‚Ausgabe V…‘ über der Vorschau → Erinnerung ‚Backup erstellen‘ | App `backupReminderHtml` (eigenes `display:flex`) | mittig | **links** ← P-122/F-2 |
| Ergebnisfenster ‚Ausgabe V…‘ (Teilen aus der Kopfzeile) → Erinnerung | App, im Fenster `#dlg` | links | links |
| Backup-Kachel unten in der Seitenleiste (15.19) | App + `design.css` `.bhint` | links | links |
| Hinweis ‚gesperrt‘ → ‚Entsperren‘ | App | links | links |
| Leerer Zustand (15.23) → getönte Schaltfläche | AppDesign `leerHtml` | mittig | mittig |
| Sprechblase (`confirmPop`) | AppDesign | mittig | volle Breite (eigene Regel, unverändert) |

Fazit: der einzige Bruch ist die Erinnerung im Hinweisfenster – Text mittig, Schaltfläche links.

### 2.3 Muster (iPad quer, hell) – Bilder in `arbeit/P-122/`

- **Heute:** `ist-3-ueber-vorschau.png` (links), `ist-4-abgleich.png` (mittig).
- **A (Empfohlen) – die Schaltfläche folgt ihrem Text:** im Hinweisfenster mittig (Bild 3 von Muster A, `ueber-vorschau`), im Fenster und in Kacheln links an der
  Textkante (Bilder 2 und 1 von Muster A, `ergebnisfenster`, `backup-kachel`). Ändert nur die Erinnerung im Hinweisfenster; eindeutig prüfbar.
- **B – überall mittig:** auch Ergebnisfenster, Erinnerung im Fenster und Backup-Kachel mittig (`B-2…`, `B-1-backup-kachel.png`). Weicht von der
  linksbündigen Seitenleiste und den Kästen ab.
- **C – wie A, und das Ergebnis immer als Hinweisfenster:** auch Teilen aus der Kopfzeile meldet ‚Ausgabe V…‘ im kleinen Hinweisfenster
  (`C-2-ergebnisfenster.png`) – dieselbe Meldung sieht dann überall gleich aus. Geht über P-122/F-2 hinaus (eigenes Thema).

### 2.4 Wortlaut (neu, nach Zusammenarbeit 0 Nr. 29) – für Variante A

**Regelkatalog, Abschnitt 3 – neu:**

> | R-3.10 | **Ausrichtung im Inhalt:** eine Schaltfläche bzw. Schaltflächenzeile unter einem Text folgt dessen Ausrichtung – im Hinweisfenster (Text zentriert)
> mittig, in Fenstern, Kästen und Kacheln (Text linksbündig) links an der Textkante; der leere Zustand steht mittig (15.23). Kopfzeilen, Kapseln, Menüs
> und Sprechblasen regeln ihre eigenen Abschnitte | hig.mjs – `ausrichtung` (jede Ansicht, jedes Fenster, nach jedem Schritt) | – | 4, 7 |

**Designrichtlinie 4 ‚Schaltflächen‘ – neuer Punkt nach ‚Alle Schaltflächen schweben‘:**

> - **Ausrichtung im Inhalt** (R-3.10): Schaltflächen unter einem Text folgen dessen Ausrichtung – im Hinweisfenster mittig (wie Text und Dateiname,
>   R-10.8), in Fenstern, Kästen und Kacheln links an der Textkante. Technisch: Schaltflächenzeile `.ad-buttons` (design.css) – mittig im Hinweisfenster
>   und im leeren Zustand, sonst links; keine eigene Ausrichtung in der App.

**Designrichtlinie 7 ‚Fenster‘, Punkt ‚Meldung‘:**

- alt: „**Meldung** (ohne Entscheidung, z. B. Fehler): kleines Fenster, x links oben, Titel, Text zentriert; höchstens eine Schaltfläche zu den
  Einzelheiten (10).“
- neu: „**Meldung** (ohne Entscheidung, z. B. Fehler): kleines Fenster, x links oben, Titel, Text und Schaltflächen zentriert (R-3.10); höchstens eine
  Schaltfläche zu den Einzelheiten (10).“

**AD-Bean:** `alert` – neue Eigenschaft: Schaltflächenzeilen `.ad-buttons` im Text des Hinweisfensters stehen mittig (CSS unter `.ad-alert`);
`.ad-buttons` selbst ist allgemeines CSS in `design.css`. Die App ersetzt in `backupReminderHtml` ihr eigenes `display:flex` durch `class="ad-buttons"`.

### 2.5 Testfall-Liste (automatisch, Variante A)

| Nr. | Fall | Ansichten | Erwartet |
|---|---|---|---|
| P-122/X-1 | Vorschau → Teilen → Hinweisfenster mit Erinnerung | iPad quer, iPad hoch, iPhone hoch · hell, dunkel | ‚Backup erstellen‘ mittig unter dem Text (Mitte ± 1 px) |
| P-122/X-2 | Teilen aus der Kopfzeile → Ergebnisfenster mit Erinnerung | iPad quer, iPhone hoch | ‚Backup erstellen‘ links an der Textkante (± 1 px) |
| P-122/X-3 | Backup laden → ‚Abgleichbericht anzeigen‘ | iPad quer, iPhone hoch | mittig, unverändert |
| P-122/X-4 | Backup-Kachel, Hinweis ‚gesperrt‘ | iPad quer, iPhone hoch | links an der Textkante, unverändert |
| P-122/X-5 | größte Textgröße, Drehen mit offenem Hinweisfenster | iPad quer → hoch | bleibt mittig, kein Abschneiden |
| P-122/X-6 | `ausrichtung` in `hig.mjs` nach jedem Schritt aller Prüfungen | alle | keine Meldung |
| P-122/X-7 | Gegenprobe: Erinnerung im Hinweisfenster wieder links | iPad quer | `ausrichtung` wird rot |

Am Gerät (Testfall (User)): die Erinnerung im Hinweisfenster über der Vorschau ansehen (iPad und iPhone).

## 3. Offene Usertests

- **P-122** (Reiselogbuch 3.58.2 / AppDesign 4.69.0): P-122/0, /1, /3, /5 ok; **P-122/2 nicht ok** (→ P-122/F-1, oben behoben, noch nicht gebaut);
  **P-122/4 nicht ok** (→ P-122/F-2, oben in Klärung).

## 4. Danach

Korrekturversion Reiselogbuch 3.58.3 (P-122/F-1) – mit Variante A zusammen auch AppDesign 4.69.1 (`.ad-buttons`, R-3.10, `ausrichtung`); Bau-Frage erst
nach deinem Ja zum Wortlaut.

## 5. Entscheidung und neuer Wortlaut (Variante B)

**Entscheidung (Nutzer 22.11.2026, Sitzung 0158, im Fenster):** Variante B – alles mittig; der Hinweis ‚gesperrt‘ auf der Vorschauseite bleibt, wie er ist.
Muster: `arbeit/P-122/B2-2-ergebnisfenster.png` (Ergebnisfenster ganz mittig), `B2-3-ueber-vorschau.png`, `B2-1-backup-kachel.png`, `B2-4-abgleich.png`.

Was sich ändert: Ergebnisfenster ‚Ausgabe V…‘ (beide Kästen: Text und ‚Backup erstellen‘ mittig), Erinnerung im Hinweisfenster (‚Backup erstellen‘
mittig), Backup-Kachel der Seitenleiste (Text und Schaltfläche mittig). Unverändert: ‚Abgleichbericht anzeigen‘ (schon mittig), leerer Zustand (schon
mittig), Hinweis ‚gesperrt‘ (Leiste: Symbol, Text, x in einer Zeile – bleibt links).

**Regelkatalog, Abschnitt 3 – neu:**

> | R-3.10 | **Hinweise mittig:** in Hinweisen – Hinweisfenster, Ergebnisfenster (z. B. ‚Ausgabe V…‘), Erinnerungen, Hinweis-Kacheln (Backup-Kachel) und leerer
> Zustand – stehen Text und Schaltflächen mittig, die Schaltfläche in ihrer Breite (nicht über die ganze Breite). Ausnahme: Hinweisleisten mit Symbol, Text
> und x in einer Zeile (z. B. ‚gesperrt‘) bleiben links. Kopfzeilen, Kapseln, Menüs, Sprechblasen und Eingabefenster regeln ihre eigenen Abschnitte |
> hig.mjs – `ausrichtung` (jede Ansicht, jedes Fenster, nach jedem Schritt) | – | 4, 7, 15.19, 15.23 |

**Designrichtlinie 4 ‚Schaltflächen‘ – neuer Punkt nach ‚Alle Schaltflächen schweben‘:**

> - **Hinweise mittig** (R-3.10, wie Text und Dateiname im Hinweisfenster, R-10.8): in Hinweisfenstern, Ergebnisfenstern, Erinnerungen, Hinweis-Kacheln
>   und im leeren Zustand stehen Text und Schaltflächen mittig; Hinweisleisten (Symbol, Text, x in einer Zeile) bleiben links. Technisch: Hinweis-Kasten
>   `.ad-notice` und Schaltflächenzeile `.ad-buttons` (design.css) – keine eigene Ausrichtung in der App.

**Designrichtlinie 7 ‚Fenster‘, Punkt ‚Meldung‘:**

- alt: „**Meldung** (ohne Entscheidung, z. B. Fehler): kleines Fenster, x links oben, Titel, Text zentriert; höchstens eine Schaltfläche zu den
  Einzelheiten (10).“
- neu: „**Meldung** (ohne Entscheidung, z. B. Fehler) **und Ergebnisfenster**: x links oben, Titel, Text und Schaltflächen zentriert (R-3.10); höchstens
  eine Schaltfläche zu den Einzelheiten (10).“

**15.19 Backup-Kachel** – Ergänzung: „Text und Schaltfläche mittig (R-3.10).“

**AD-Bean:** `alert` – neue Eigenschaft (Schaltflächenzeilen im Text mittig); neu allgemein in `design.css`: `.ad-notice` (Hinweis-Kasten, mittig) und
`.ad-buttons` (Schaltflächenzeile, folgt dem Kasten). App: Ergebnisfenster und Erinnerung nutzen `.ad-notice`/`.ad-buttons` statt eigenem `display:flex`;
Backup-Kachel `.bhint` mittig in `design.css`.

**Testfall-Liste (automatisch) – ersetzt 2.5:**

| Nr. | Fall | Ansichten | Erwartet |
|---|---|---|---|
| P-122/X-1 | Vorschau → Teilen → Hinweisfenster mit Erinnerung | iPad quer, iPad hoch, iPhone hoch · hell, dunkel | Text und ‚Backup erstellen‘ mittig (± 1 px) |
| P-122/X-2 | Teilen aus der Kopfzeile → Ergebnisfenster mit Erinnerung | iPad quer, iPhone hoch | beide Kästen: Text und Schaltfläche mittig |
| P-122/X-3 | Backup laden → ‚Abgleichbericht anzeigen‘ | iPad quer, iPhone hoch | mittig, unverändert |
| P-122/X-4 | Backup-Kachel | iPad quer, iPad hoch, iPhone hoch (Startliste) | Text und Schaltfläche mittig |
| P-122/X-5 | Hinweis ‚gesperrt‘ | iPad quer, iPhone hoch | unverändert links (Ausnahme) |
| P-122/X-6 | größte Textgröße, Drehen mit offenem Hinweis | iPad quer → hoch | bleibt mittig, kein Abschneiden |
| P-122/X-7 | `ausrichtung` in `hig.mjs` nach jedem Schritt aller Prüfungen | alle | keine Meldung |
| P-122/X-8 | Gegenprobe: Erinnerung im Hinweisfenster wieder links | iPad quer | `ausrichtung` wird rot |
