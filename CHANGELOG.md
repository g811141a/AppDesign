# AppDesign – Versionsgeschichte

Versionsnummer **Hauptversion.Nebenversion.Korrektur** – gleich der Version der Designrichtlinie
allgemein. Hauptversion = neuer Ordner (`v5/`), Apps werden bewusst umgestellt.

## 4.24.0 – 18.10.2026

AppDesign 4.24.0 · Designrichtlinie allgemein 4.24.0 · Zusammenarbeit allgemein 2.9.0 · geprüft mit Reiselogbuch 3.22.0

Die Zeile aus einem Fenster fällt nach dem Schließen deutlicher auf (A-23, Wunsch des Nutzers: ‚mindestens doppelt so lange‘).

- **R-7.3, ui.js (`revealRow`):** die Zeile bzw. der Kasten bleibt **2 s voll blau** (`--sel-bg`) und blendet dann in **1 s** aus
  (vorher: sofort 1 s ausblenden). ‚Bewegung reduzieren‘: 2 s voll blau, dann ohne Ausblenden weg. Geht während der
  Hervorhebung das nächste Fenster auf, endet sie sofort. Dauer an einer Stelle (`REVEAL_HOLD`, `REVEAL_FADE`).
- **Prüfung `checkListStill` erweitert:** in jedem Fall Farbe kurz vor Ende des Haltens (1,95 s: voll `--sel-bg`) und
  Gesamtdauer (3 s); ein Fall mit ‚Bewegung reduzieren‘ (2 s); neuer Fall ‚nächstes Fenster während der Hervorhebung‘.
  Gegenprobe mit der alten Dauer: rot (‚dauert 1000 ms statt 3000 ms‘, ‚läuft weiter, obwohl das nächste Fenster offen ist‘).
- Fall-Liste und Muster: `arbeit/A-23 T-94 Fall-Liste.md`, `arbeit/A-23 T-94 Muster.html` (entschieden: Variante A).
- Regelkatalog R-7.3, Abschnitt 7; feste Fassung `fassung/4.24.0/`.

## 4.23.2 – 18.10.2026 (Korrektur)

AppDesign 4.23.2 · Designrichtlinie allgemein 4.23.2 · Zusammenarbeit allgemein 2.8.0 · geprüft mit Reiselogbuch 3.21.2

Korrektur aus P-52/2–4 (Reiselogbuch 3.21.1): nach dem Fenster ‚Tag‘ stand die Liste weiter nicht still – nach dem Öffnen
eines Reiselogbuchs (erster fehlender Tag oben) rückte sie nach dem Erfassen eines Tages 2–3 Zeilen tiefer nach oben, mal ganz
an den Anfang, mal irgendwohin; nach 5× ‹ › sprang sie an den Anfang (iPad) bzw. zum geänderten Tag (iPhone).

- **Ursachen (nachgestellt, alle drei):** (1) Safari rollt die Seite beim Zugehen der Tastatur **nach** dem Schließen noch einmal –
  die Wiederherstellung lief nur einmal davor. (2) Ändert die Tastatur die Fensterhöhe um mehr als 150 px, hielt ui.js das für
  **Drehen** (R-8.1) und stellte einen alten Stand her. (3) Nach ‹ › rollte `revealRow` gewollt zum zuletzt gezeigten Tag.
- **R-7.3, ui.js:** nach dem Schließen wird die oberste Zeile **1,5 s festgehalten** – jede Bewegung durch Neuaufbau, Safari oder
  Tastatur wird sofort zurückgenommen; ein Tippen oder Wischen des Nutzers beendet das Festhalten. Bei offenem bzw. gerade
  geschlossenem Fenster zählt nur eine neue **Breite** als Drehen. **Auch nach ‹ › steht die Liste wie beim Öffnen** (Wunsch des
  Nutzers); die Zeile aus dem Fenster wird nur noch hervorgehoben, wenn sie sichtbar ist – gerollt wird nie.
- **Warum die Prüfung es nicht sah:** sie begann bei Scrollstand 1200 mit lauter erfassten Tagen (nicht mit dem ersten fehlenden
  Tag oben), tippte nur die oberste Zeile an und bildete von der Tastatur nur einen Teil nach; das Nachrollen beim Zugehen und
  die kleinere Fensterhöhe fehlten. **`checkListStill` neu gefasst:** Ausgangszustand von der App (`start`, im Reiselogbuch:
  Reiselogbuch mit Lücke öffnen), 11 Fälle – oberste Zeile, 3 Zeilen tiefer, untere Hälfte, 2 px unter dem Kopf, nach 5× ‹ ›;
  Häkchen und x – mit der Safari-Tastatur **einzeln und zusammen** (zusammen hoben sich Fehler teils auf). Gegenprobe mit 4.23.1:
  22 Fälle rot, darunter genau P-52/2, /3 und /4.
- Regelkatalog R-7.3, Abschnitt 7; feste Fassung `fassung/4.23.2/`.

## 4.23.1 – 18.10.2026 (Korrektur)

AppDesign 4.23.1 · Designrichtlinie allgemein 4.23.1 · Zusammenarbeit allgemein 2.8.0 · geprüft mit Reiselogbuch 3.21.1

Korrektur aus P-51/5 (Reiselogbuch 3.21.0): nach dem Fenster ‚Tag‘ rückte die Liste 1–3 Zeilen nach oben – bei Häkchen und
bei x, sobald die Tastatur offen war.

- **Ursache:** `revealRow` maß gleich nach dem Schließen gegen den sichtbaren Bereich über der **noch offenen Tastatur**
  (`visualViewport`, etwa halbe Höhe). Eine Zeile aus der unteren Hälfte galt als verdeckt und wurde unter den Kopf gerollt.
- **R-7.3, ui.js (Wunsch des Nutzers):** Beim Öffnen merkt sich die App die **oberste Zeile unter der Leiste samt Abstand in
  px** (`lockAnchor`); nach dem Schließen und nach dem Neuaufbau durch die App steht genau sie wieder dort (`alignTop`). Gerollt
  wird nur noch, wenn im Fenster mit ‹ › auf eine andere Zeile geblättert wurde und sie verdeckt ist – gemessen gegen die
  ganze Fensterhöhe (die Tastatur geht mit dem Fenster zu). Ohne Blättern wird die Zeile nur kurz hervorgehoben.
- **Warum die Prüfung es nicht sah:** `checkListStill` bildete die Tastatur nur als Rollen der Seite nach (`scrollBy`), nicht
  den kleineren sichtbaren Bereich; geprüft wurden nur Zeilen oben. Jetzt: Tastatur nachgebildet (`visualViewport` halb so
  hoch, geht 400 ms nach dem Schließen zu) und zusätzlich Zeilen aus der unteren Hälfte (Häkchen und x). Gegenprobe mit
  4.23.0 rot (iPad quer 573 → 284 px, iPhone hoch 315 → 111 px).
- Regelkatalog R-7.3 (Text); feste Fassung `fassung/4.23.1/`.

## 4.23.0 – 17.10.2026 (Neben)

AppDesign 4.23.0 · Designrichtlinie allgemein 4.23.0 · Zusammenarbeit allgemein 2.8.0 · geprüft mit Reiselogbuch 3.21.0

A-19 (aus Reiselogbuch T-92, Variante C; Vorschläge `arbeit/T-92 Vorschläge.md`, Fall-Liste `arbeit/T-92 Fall-Liste.md`).

- **R-2.3 erweitert – Suche in der zentralen Liste:** Lupe im Kopf der Seitenleiste bzw. Startliste öffnet eine Suchzeile
  (wie 15.2, ohne Pfeile); nur Einträge mit Treffer, je Kachel ‚N Treffer‘ (je Fundstelle, gleich wie ‚1 von N‘ im
  Eintrag), ‚2 von 5 …‘ unter der Überschrift, ‚Keine Treffer‘; Antippen öffnet mit gefüllter Suche; die Liste bleibt
  gefiltert bis x bzw. Lupe; ein offener Eintrag bleibt unberührt, außer seine Suche ist offen – dann laufen beide Felder
  1:1 mit (Zusatz des Nutzers); Backup-Kachel bleibt.
- **design.css:** `#side .side-search` (Suchzeile unter dem Kopf, bleibt stehen).
- **Prüfung `checkListSearch` (tests/ablauf.mjs):** Lupe und Fokus, Filter, ‚N Treffer‘ = ‚1 von N‘, Öffnen mit Begriff,
  1:1 in beide Richtungen (iPad) bzw. zurück gefiltert (iPhone, iPad hoch), x, ‚Keine Treffer‘, Lupe schließt; Gegenprobe
  (Zählung +1, ohne 1:1) rot.
- **Korrektur R-7.3 (Liste steht still, ui.js `revealRow`):** Nach dem Schließen eines Fensters rollte eine ganz sichtbare
  Zeile, die 0–6 px unter Leiste bzw. Tabellenkopf stand, um bis zu 6 px nach – der Abstand, den die App beim Rollen
  lässt, galt auch für die Frage ‚ganz sichtbar?‘. Jetzt: ganz sichtbar ohne Abstand (1 px Spielraum), die 6 px nur als
  Ziel, wenn wirklich gerollt werden muss (oben wie unten). Gefunden in WebKit, iPad quer (Scrollstand 1200 → 1195).
- **Warum die Prüfung es bisher nicht sah:** `checkListStill` nahm die erste Zeile unter dem Kopf, wo sie gerade lag. Bei
  340 px Seitenleiste lag dort zufällig keine Zeile 0–6 px unter dem Kopf; erst die Lupe (Seitenleiste 401 px) verschob die
  Zeilen. Die Prüfung rollt jetzt zusätzlich eine Zeile gezielt **2 px unter den Kopf** (Häkchen) – unabhängig von der
  Breite der Seitenleiste; Gegenprobe mit dem alten `revealRow` rot (Chromium und WebKit, iPad und iPhone).
- Abschnitt 15.2, 15.4, Regelkatalog Thema 2; feste Fassung `fassung/4.23.0/`.

## 4.22.0 – 17.10.2026 (Neben)

AppDesign 4.22.0 · Designrichtlinie allgemein 4.22.0 · Zusammenarbeit allgemein 2.8.0 · nur Werkzeug, Reiselogbuch bleibt auf Fassung 4.21.1

A-20: Kontext in der Zeile Zeit und Token (Fall-Liste `arbeit/A-20 Fall-Liste.md`, K-1 bis K-12).

- **`werkzeug/messung.mjs`:** die Zeile endet mit ‚Kontext N‘ – Eingabe + aus Zwischenspeicher + geschrieben des **letzten**
  eigenen Modell-Aufrufs, also die Größe der Sitzung. Ab 300.000 (`GRENZE`) oder nach einer automatischen Zusammenfassung
  steht dahinter **‚⚠ Übergabe fällig‘** (Zusammenarbeit 0 Nr. 13). Noch kein Aufruf: ‚Kontext –‘.
- Hilfsagenten zählen nicht zum Kontext (eigener Kontext), weiter aber zu ‚Token vorige Antwort‘.
- **Warum es nötig war:** ‚Token vorige Antwort‘ summiert alle Aufrufe einer Antwort und taugt nicht für die Grenze – Sitzung
  0009 lag unbemerkt bei ~451.600.
- **Prüfung** `tests/messung.mjs` um K-1 bis K-11 erweitert (Grenze 299.999/300.000, letzter Aufruf statt Summe, Aufruf auf
  mehreren Zeilen, Hilfsagent, Zusammenfassung, kein Aufruf, Darstellung); Gegenprobe weiter rot.
- Zusammenarbeit allgemein 2.8.0 (§2: Zeile mit Kontext); feste Fassung `fassung/4.22.0/`.

## 4.21.1 – 17.10.2026 (Korrektur)

AppDesign 4.21.1 · Designrichtlinie allgemein 4.21.1 · Zusammenarbeit allgemein 2.7.0 · geprüft mit Reiselogbuch 3.20.1

Korrektur aus P-48/3 (Fall-Liste `arbeit/A-17 Korrektur Fall-Liste.md`).

- **Fehler:** Drehen am Ende der Seite – die Seite stand danach nicht mehr am Ende. `rememberTop` fand oben keinen Eintrag
  (`data-day`/`data-keep`) und merkte nichts; `restoreTop` tat nichts, Safari ließ die Seite irgendwo stehen.
- **`topAnchor` (eine Stelle für Drehen und `keepPlace`):** steht oben kein Eintrag, wird der Abstand zum Ende gemerkt
  (`{ rest }`) und nach dem Drehen bzw. Umschalten wiederhergestellt – ganz unten bleibt ganz unten.
- **Warum die Prüfung es übersehen hat:** die Drehprüfung (hig.mjs) dreht in der Mitte; neu `checkTurnEnd` (tests/ablauf.mjs).
  Gegenprobe ohne Korrektur rot (u. a. ‚zurückgedreht: 360 px vor dem Ende statt 0 px‘ – genau die Rückmeldung).
- R-8.1 (Abschnitt 13) ergänzt; feste Fassung `fassung/4.21.1/`.

## 4.21.0 – 17.10.2026 (Neben)

AppDesign 4.21.0 · Designrichtlinie allgemein 4.21.0 · Zusammenarbeit allgemein 2.7.0 · geprüft mit Reiselogbuch 3.20.0

A-16 und A-17 (aus Reiselogbuch T-89 und T-90; Fall-Liste `arbeit/A-16 A-17 Fall-Liste.md`).

- **`openAt(element | null)` (R-7.4 neu):** Position beim Öffnen – ohne Element ganz oben, sonst steht das Element direkt
  unter der Leiste und einem haftenden Tabellenkopf (bisher rief die App `scrollIntoView({ block: 'center' })` – Mitte –
  und rollte ohne offenen Tag gar nicht, die Seite blieb beim vorigen Eintrag stehen).
- **`keepPlace(change)` (R-8.1 erweitert):** die App ändert die Anordnung (Seitenleiste ein/aus), oben bleibt derselbe
  Eintrag. Ursache des Fehlers: R-8.1 griff nur bei einer Größenänderung des Fensters; beim Umschalten der Seitenleiste
  ändert sich nur die Breite des Inhalts – die Zeilen werden höher bzw. niedriger und die Seite rutschte, nahe dem Ende
  sprang Safari ans Ende. Ohne Eintrag oben (Ende der Seite) bleibt der Abstand zum Ende gleich.
- `topAnchor()` aus `rememberTop()` herausgelöst (eine Stelle für ‚oberster sichtbarer Eintrag‘).
- **Prüfungen `checkOpenAt` und `checkSideToggle` (tests/ablauf.mjs);** Gegenprobe mit dem alten Verhalten rot (40 Fehler).
- Neue Regel **R-7.4**, R-8.1 erweitert (Abschnitt 13, Regelkatalog 7 und 8); feste Fassung `fassung/4.21.0/`.

## 4.20.0 – 17.10.2026 (Neben)

AppDesign 4.20.0 · Designrichtlinie allgemein 4.20.0 · Zusammenarbeit allgemein 2.7.0 · geprüft mit Reiselogbuch 3.19.0

A-15: Kapsel ‚Nach oben / Ans Ende‘ auch im iPhone-Aufbau (R-3.2 erweitert; Fall-Liste `arbeit/A-15 Fall-Liste.md`).
Widerruft E-33 (Apple-Weg Statusleiste/Scroll-Leiste war dem Nutzer zu schwerfällig).

- **design.css:** `html.phone .fab` wird nicht mehr ausgeblendet; im iPhone-Aufbau unten 120 px Platz (statt 96 px), damit
  der letzte Inhalt nicht unter der Kapsel liegt. Ob die Kapsel in der Startliste erscheint, steuert die App (`hidden`).
- **ui.js `updateFab`:** Kapsel mit der Klasse `still` ausgeblendet, wenn es nichts zu scrollen gibt (R-3.2, iPad und iPhone);
  der Offline-Hinweis lässt bei sichtbarer Kapsel seitlich 72 px frei, auch auf dem iPhone.
- Regel **R-3.2** erweitert, Abschnitt 4 und 15.17; feste Fassung `fassung/4.20.0/`.

## 4.19.0 – 17.10.2026 (Neben)

AppDesign 4.19.0 · Designrichtlinie allgemein 4.19.0 · Zusammenarbeit allgemein 2.7.0 · geprüft mit Reiselogbuch 3.17.0

A-14 (aus Reiselogbuch T-87): Eingabetaste in Eingabefeldern (neue Regel R-5.5, gilt für alle Apps; Fall-Liste
`arbeit/A-14 T-88 Fall-Liste.md`).

- **Einzeilige Felder (ui.js):** bekommen von selbst `enterkeyhint="done"` (Taste ‚Fertig‘, auch für später eingefügte
  Felder über einen MutationObserver); die Eingabetaste bestätigt und schließt die Tastatur (`blur`). Ein Feld mit eigenem
  `enterkeyhint` behält es; das Suchfeld (`type=search`) behält ‚Suchen‘ und seine eigene Eingabetaste.
- **Fehler behoben:** In Fenstern, die ein Formular sind (`<form method="dialog">`), schickte die Eingabetaste das
  Formular ab und schloss das Fenster. Jetzt bleibt es offen; gespeichert wird erst mit dem Häkchen.
- **Mehrzeilige Felder:** Eingabetaste macht wie bisher einen Zeilenumbruch (HIG).
- **Prüfung `checkEnterDone` (tests/ablauf.mjs):** alle sichtbaren einzeiligen Felder zeigen ‚Fertig‘, Eingabetaste nimmt
  den Fokus, das Fenster bleibt offen, mehrzeilige Felder behalten Zeilenumbruch und Fokus – iPad quer und iPhone hoch,
  Chromium und WebKit; Gegenprobe ohne die Änderung rot (8 Fehler).
- Neue Regel **R-5.5**, Abschnitt 8; feste Fassung `fassung/4.19.0/`.

## 4.18.0 – 16.10.2026 (Neben)

AppDesign 4.18.0 · Designrichtlinie allgemein 4.18.0 · Zusammenarbeit allgemein 2.7.0 · geprüft mit Reiselogbuch 3.16.0

A-13: Liste steht still, solange ein Fenster offen ist (neue Regel R-7.3, gilt für alle Apps, iPad und iPhone gleich).

- **Ursache des Fehlers (Reiselogbuch, iPad quer):** Nach dem Erfassen eines Tages stand die Tabelle weiter unten, der
  erfasste Tag war nach oben verschwunden. Beim Schreiben im Fenster schiebt Safari für die Tastatur die **ganze Seite**;
  die Sperre `overflow: hidden` hält das nicht auf, und Safari schiebt nicht zurück. Nachgebildet: Scrollstand 1200 → 1500.
- **`lockPage`/`unlockPage` (ui.js):** merken den Scrollstand beim Öffnen eines Fensters und stellen ihn beim Schließen
  genau wieder her (auch bei Meldungen über dem Fenster erst, wenn beide zu sind; gedreht → wie beim Drehen, R-8.1).
  `position: fixed` wurde verworfen, weil der Tabellenkopf haftet (sticky) und dabei verschwände.
- **`revealRow` (ui.js):** nach dem Schließen wird die Zeile bzw. der Kasten, aus dem das Fenster kam, kurz blau hinterlegt
  und blendet aus (~1 s, bei ‚Bewegung reduzieren‘ ohne Ausblenden); nach ‹ › im Fenster rollt die Liste nur so weit, bis
  die zuletzt gezeigte Zeile ganz sichtbar ist. Fenster aus Schaltflächen bleiben ohne Hervorhebung.
- **Prüfung `checkListStill` (tests/ablauf.mjs)** mit nachgebildeter Tastatur: Häkchen, x, ‹ › auf eine verdeckte und auf
  eine sichtbare Zeile – iPad quer und iPhone hoch, Chromium und WebKit; Gegenprobe ohne die Änderung rot (10 Fehler).
- Neue Regel **R-7.3**, Abschnitt 7; feste Fassung `fassung/4.18.0/`.

## 4.17.0 – 16.10.2026 (Neben)

AppDesign 4.17.0 · Designrichtlinie allgemein 4.17.0 · Zusammenarbeit allgemein 2.7.0 · keine App gehoben (Reiselogbuch bleibt auf 4.16.1)

A-12: Zeile Zeit und Token aus einem Werkzeug statt von Hand (Fall-Liste `arbeit/A-12 Fall-Liste.md`, M-1 bis M-14).

- **Werkzeug `werkzeug/messung.mjs`:** gibt `<sub>⏱ mm:ss · Token vorige Antwort: N neu · N aus Zwischenspeicher · N geschrieben</sub>`
  aus den Sitzungsdaten aus. Zeit ab der letzten Nachricht des Nutzers ohne Wartezeit in Auswahlfenstern; Systemmeldungen
  (Neustart, Hintergrund, Start durch eine andere Sitzung) und Werkzeug-Ergebnisse zählen nicht als Nachricht; Token der
  vorigen Antwort je Modell-Aufruf einmal, Hilfsagenten mitgezählt; ‚neu‘ = Eingabe + Ausgabe (Entscheidung des Nutzers);
  nach einem Neustart die zuletzt geänderte Sitzungsdatei; ohne Daten Fehler statt Zeile.
- **Funde beim Bau:** eine Modell-Antwort steht auf mehreren Zeilen der Sitzungsdaten – die Handmessung hatte deshalb
  mehrfach gezählt; nach einem Neustart liegt die Sitzung in einem zweiten Ordner.
- **Prüfung `tests/messung.mjs`** mit künstlichen Sitzungsdaten (alle 14 Fälle), Gegenprobe (mehrfach zählen) rot.
- **Zusammenarbeit 2.7.0** (§2 Werkzeug), **CLAUDE.md 2.4.0**; feste Fassung `fassung/4.17.0/`.

### Prüfliste (P-43)

1. In der nächsten Antwort steht am Ende die Zeile aus `messung.mjs`; die Zeit passt ungefähr zur Arbeitszeit ohne die Zeit,
   in der ein Auswahlfenster offen war.
2. Die Token gelten der **vorigen** Antwort (bei der ersten Antwort einer Sitzung ‚–‘).

## 4.16.1 – 15.10.2026 (Korrektur)

AppDesign 4.16.1 · Designrichtlinie allgemein 4.16.1 · Zusammenarbeit allgemein 2.5.0 · geprüft mit Reiselogbuch 3.15.1

A-10 und A-11 (Funde beim Veröffentlichen von 4.16.0 und 4.16.1).

- **Lauf-Werkzeug `tests/lauf.mjs`:** gleichzeitig laufen standardmäßig nur noch so viele Browser, wie der Rechner Kerne hat
  (Container: 4 statt 8); `--jobs N` überschreibt das weiter. **Anlass:** der volle Lauf für 4.16.0 war zweimal rot durch
  WebKit unter Volllast (`offline-regeln`, `hig` – Drehen am iPad), einzeln jeweils grün.
- **Browser nacheinander (A-11):** `lauf.mjs` startet erst alle Prüfungen in Chromium, dann alle in WebKit – nie beide
  gleichzeitig. **Befund:** im gemeinsamen Lauf wurden vier von fünf Läufen rot, jedes Mal eine andere WebKit-Prüfung mit
  fester Zeitgrenze (Drehen, Tastatur, Netz-Wechsel); einzeln und im reinen WebKit-Lauf grün – auch beim Stand 3.14.1, die
  Schwankung bestand also schon vorher. Selbsttest um den Fall ‚Browser nacheinander‘ ergänzt (Gegenprobe rot).
- **Ursache der ‚weißen Seite‘ in `offline.mjs` (A-11):** gemessen – nach der Installation 7 Dateien im Speicher des Service
  Workers, nach dem Fund keine, ohne dass jemand löscht, und die nächste Seite wird gar nicht angefragt: der Netzprozess von
  WebKit stürzt in der Prüfumgebung unter Last ab (Playwright hält den Speicher nur im Arbeitsspeicher). Die Prüfung erkennt
  das (App erscheint nicht **und** Speicher leer) und prüft die Ansicht einmal in einem frischen Kontext neu; zweimal → rot.
  Leerer Speicher direkt nach der Installation und weiße Seite bei gefülltem Speicher bleiben sofort rot. Gegenproben:
  Speicher einmal gelöscht → Hinweis, grün; immer gelöscht → rot. Nachweis: drei volle Läufe hintereinander grün.
- **Zusammenarbeit 2.5.0:** per du (§1); 0 Nr. 18 – bei offensichtlichem Regelbruch massiv widersprechen, umsetzen erst nach
  ausdrücklicher Umsetzungspflicht.
- **Feste Fassung `fassung/4.16.1/`**; Designrichtlinie allgemein 4.16.1 (nur Version).

## 4.16.0 – 15.10.2026 (Neben)

AppDesign 4.16.0 · Designrichtlinie allgemein 4.16.0 · Zusammenarbeit allgemein 2.4.0 · geprüft mit Reiselogbuch 3.15.0

A-07 und A-09 (entschieden 15.10.2026).

- **Neue Regel R-7.2 (A-09, aus Reiselogbuch T-84):** Jedes Neuladen beginnt im iPhone-Aufbau (auch iPad im schmalen
  Fenster) in der Startliste, ganz oben, ohne blauen Eintrag; der iPad-Aufbau öffnet wie bisher den aktuellen Eintrag;
  Rückkehr aus dem Hintergrund ändert nichts. Designrichtlinie 15.4, 15.17, Regelkatalog Thema 7.
- **Neue Prüfung `tests/start.mjs`** (`checkStart`, `checkRueckkehr`) für jede App.
- **Designrichtlinie 13:** Neustart ist in einer Web-App nicht erkennbar (iOS beendet Apps im Hintergrund).
- **Zusammenarbeit 2.4.0 (A-07):** zu Beginn gezielt lesen (Abschnitt 0, Überschriften), nur ein voller Prüflauf je
  Version im Veröffentlichungs-Skript; `CLAUDE.md` 2.2.0. Nicht übernommen: Versionsgeschichten auslagern, weniger
  Pflichtschritte bei kleinen Korrekturen; der Dunkelmodus bleibt in jedem Prüflauf.
- **Feste Fassung `fassung/4.16.0/`.**

## 4.15.1 – 15.10.2026 (Korrektur)

AppDesign 4.15.1 · Designrichtlinie allgemein 4.15.1 · Zusammenarbeit allgemein 2.3.2 · geprüft mit Reiselogbuch 3.14.1

Korrektur zu P-39 (ok bis auf /1 und /2; Auswertung `arbeit/P-39 Rückmeldung.md`).

- **Fund P-39/1 und /2:** Das iPad zeigte keine Meldung, wenn das Netz bei offener App wegfiel oder zurückkam (beim Start
  ohne Netz schon). Ursache: Der Wechsel hing nur an den Safari-Ereignissen `offline`/`online` und an der Rückkehr in die
  App; das iPad als Home-Bildschirm-App meldet ihn nicht zuverlässig, und eine Antwort ‚an‘ wurde verworfen, solange
  `navigator.onLine` noch `false` sagte.
- **Behoben (`ui.js`):** solange die App sichtbar ist, fragt sie alle 10 s den Service Worker (`pruefe`); Schutz gegen das
  schnelle Hin und Her über eine laufende Nummer der Frage statt über `navigator.onLine`.
- **Prüfung geschärft (`offline.mjs`, F-17):** Gerät ohne Safari-Meldung – erst rot (10 Fehler in jedem Browser), dann grün;
  Gegenprobe ohne die Nachfrage alle 10 s: 10 Fehler. **Warum übersehen:** die Prüfung schaltete mit `setOffline()`, das in
  Chromium und WebKit immer `offline`/`online` sendet und `navigator.onLine` sofort setzt – ein Gerät ohne diese Meldung war
  nicht nachgebildet. Dabei gefunden: `setOffline()` erreicht in Chromium den Service Worker nicht – F-17 nimmt deshalb das
  Netz am Prüf-Webserver weg.
- Designrichtlinie allgemein 4.15.1 (15.20); `tests/README.md`.

## 4.15.0 – 15.10.2026 (Neben)

AppDesign 4.15.0 · Designrichtlinie allgemein 4.15.0 · Zusammenarbeit allgemein 2.3.2 · geprüft mit Reiselogbuch 3.14.0

A-06 Offline-Hinweis, Variante c als allgemeine Regel (Muster und Fall-Liste `arbeit/A-06 Muster und Fall-Liste.md`).

- **R-1.5 ergänzt (keine neue Regel):** arbeitet die App offline, sieht man es.
- **`ui.js`:** graue Zeile `.offl` (Icon `wifi-off`, ‚Offline – alles bleibt auf diesem Gerät‘) in `backupTileHtml()` – jede
  App mit Backup-Kachel hat sie ohne eigene Änderung; kurze Meldung `.nettoast` (‚Du bist offline‘ mit grauer Zeile darunter
  bzw. ‚Wieder online‘, Icon `wifi`) beim Wechsel und beim Start ohne Netz: mittig im freien Bereich neben einer sichtbaren
  Seitenleiste, Abstand zu ‚Nach oben / Ans Ende‘, auf dem iPhone über der Backup-Kachel, über der Tastatur, 4 s, Antippen
  schließt, höchstens eine, oberste Ebene (Popover) auch über einem offenen Fenster; richtet sich bei einem Seitenwechsel
  neu aus. Erkennen: Safari `offline`/`online` und Nachrichten des Service Workers (`{ netz: '?' | 'pruefe' }` →
  `{ netz: 'aus' | 'an' }`); neue Icons `wifi-off`, `wifi`; `setNet()`, `isOffline()`, `netLineHtml()`.
- **`design.css`:** Zeile, Meldung, Liste läuft auch hinter der Zeile durch (`padding-bottom` 176 px, solange offline), Druck ohne beides.
- **`tests/offline.mjs`:** Fälle F-1 bis F-16 – Meldung und Zeile beim Start ohne Netz und bei hängendem Netz, Wechsel,
  Lage (im Bild, nicht über Seitenleiste, ‚Nach oben / Ans Ende‘, Zeile und Backup-Kachel), Kontrast 4,5 : 1, 4 s,
  ‚Wieder online‘, schnelles Hin und Her, Drehen, offenes Fenster, Tastatur, lange Liste, Backup-Kachel gelb und weiß,
  iPhone-Startliste; neue Option `vorbereiten(page)`. Gegenprobe: ohne Meldung 32 Fehler. Beim Bauen gefunden (alle behoben):
  ‚Wieder online‘ fehlte, verspätete Antwort ‚an‘ beim schnellen Hin und Her, Meldung bei hängendem Netz in WebKit zu spät
  (wartete auf `load`), Meldung verdeckte am iPhone die Backup-Kachel und folgte dem Seitenwechsel nicht.
- Designrichtlinie allgemein 4.15.0 (R-1.5, Abschnitt 11, neue Komponente 15.20 Offline, 15.4); `tests/README.md`.

## 4.14.2 – 14.10.2026 (Korrektur)

AppDesign 4.14.2 · Designrichtlinie allgemein 4.14.2 · Zusammenarbeit allgemein 2.3.2 · geprüft mit Reiselogbuch 3.13.2

Korrektur zu P-37 (Auswertung und Fall-Liste `arbeit/P-37 Rückmeldung.md`).

- **Schrittkopf (R-5.1 ergänzt, allgemeine Regel):** Options-Kapseln im Kopf eines Kastens stehen als Gruppe
  `.head-checks`; passt alles in eine Zeile, neben dem Titel (auch iPhone quer), sonst die ganze Gruppe darunter
  (`design.css`, Designrichtlinie 15.10). Vorher brach im iPhone-Querformat eine Kapsel allein um, weil der Titel mindestens
  60 % breit war. Prüfung in `hig.mjs` (misst jeden angezeigten Schrittkopf, auch außerhalb des Ausschnitts).
- **Offline-Start (neue Regel R-1.5):** Service Worker mit Frist 3 s, Fassung zuerst aus dem Speicher, gespeicherte App bei
  anderer Adresse (Designrichtlinie 15.20). Neue Prüfung `tests/offline.mjs`: eigener Webserver mit echtem Service Worker,
  Netz ‚aus‘ und ‚hängt‘ nachgebildet, iPad und iPhone, Chromium und WebKit. Fand den Fehler (weiße Seite bei hängendem Netz)
  in beiden Browsern.
- **Neu im Backlog:** A-06 Offline-Hinweis (Prio 1, allgemeine Regel, zuerst Muster).
- Designrichtlinie allgemein 4.14.2 (15.10, 15.20, Regelkatalog: 35 Regeln).

## 4.14.1 – 14.10.2026 (Korrektur)

AppDesign 4.14.1 · Designrichtlinie allgemein 4.14.1 · Zusammenarbeit allgemein 2.3.2 · geprüft mit Reiselogbuch 3.13.1

Korrektur zu 4.14.0 (Fund `arbeit/A-05 Fund Markierung.md`, Entscheidung a). `v4/` nur Versionsnummer.

- **Fund:** Die Git-Markierung `v4.14.0` ließ sich nicht hochladen – der Git-Zugang der Cloud lehnt Markierungen ab (HTTP 403),
  die GitHub-Schnittstelle ebenso. `main` war schon oben, das Skript brach beim Push ab; die Links der App-README auf
  `blob/v4.14.0/…` führten zur Fehlerseite. Warum übersehen: der Selbsttest lud in ein lokales Schein-Repo, das Markierungen
  annimmt.
- **Fassung mit Richtlinien-Text (D-6 neu):** `fassung/X.Y.Z/` enthält zusätzlich `README - Designrichtlinie allgemein.md` und
  `README - Zusammenarbeit allgemein.md` (Prüfsummen); die App-README verlinkt `main/fassung/X.Y.Z/…`. `doku.mjs` liest die
  Richtlinien-Versionen aus der Fassung (geht auch in einer flachen Kopie) und prüft die Links; `version.mjs` vergleicht die
  Texte nicht mit dem Arbeitsstand (sie ändern sich auch zwischen Versionen).
- **Veröffentlichungs-Skript:** keine Markierung mehr; ‚veröffentlicht‘ heißt: `fassung/X.Y.Z/` liegt auf `origin/main`.
  Selbsttest prüft zusätzlich, dass keine Markierung gebraucht wird (20 Fälle grün).
- **`pruefe.mjs` – `ruhe()` (gefunden beim Veröffentlichen):** `tastatur · webkit` wurde im vollen Lauf (8 Browser parallel)
  rot – R-2.2 ‚Titel nicht in der Leiste‘ und R-5.4 ‚Kapsel ohne Verlauf‘ in den Einstellungen am iPhone; allein (3×) und
  unter reiner Rechenlast grün. Ursache wahrscheinlich: unter Volllast kamen Bildwechsel so spät, dass die Ruhe-Prüfung
  (dreimal gleich nach je 100 ms) erfüllt war, bevor die App diese beiden Werte im nächsten Bild setzte. Jetzt wartet jede
  Ruhe-Messung auf einen echten Bildwechsel; ohne Bild innerhalb 2 s gilt die Seite nicht als ruhig. Die App war nicht falsch.
- `fassung/4.14.0/` bleibt unverändert (ohne Texte); die lokale Markierung `v4.14.0` ist gelöscht.
- Designrichtlinie allgemein 4.14.1 (Abschnitt 14), README, CLAUDE.md 2.1.1, `tests/README.md`, Fall-Liste D-6.

## 4.14.0 – 14.10.2026 (Neben)

AppDesign 4.14.0 · Designrichtlinie allgemein 4.14.0 · Zusammenarbeit allgemein 2.3.2 · geprüft mit Reiselogbuch 3.13.0

A-05 Version B – feste Fassung und Veröffentlichungs-Skript (Fall-Liste `arbeit/A-05 Fall-Liste.md`, Teile D und E).
`v4/` nur Versionsnummer und Kommentar zur Einbindung.

- **Feste Fassung `fassung/4.14.0/` (D-1):** `design.css`, `ui.js` und `tests/` je Version unveränderlich, Prüfsummen in
  `fassung/PRUEFSUMMEN`, Git-Markierung `v4.14.0`. Apps laden genau ihre Fassung (`../AppDesign/fassung/X.Y.Z/…`, ohne
  `?v=`) und prüfen mit den Prüfungen dieser Fassung; gehoben wird nur nach Rückfrage. `v4/` bleibt Arbeitsstand und zeigt die
  neueste Fassung (D-5). Ältere Versionen (bis 4.13.0) haben keine Fassung – die Apps waren bisher auf `v4/`.
- **`tests/version.mjs` (R-10.3):** Fassungs-Pfad in `index.html` und `sw.js` = `AD_NEEDED`, nichts aus `v4/`; Versionen in
  der Fassung; `checkFassungen`: keine Datei geändert, fehlt oder dazu, `v4/` und `tests/` = neueste Fassung; ein geänderter
  Arbeitsstand `v4/` (roter Knopf, Skriptfehler) erreicht die App nicht (D-3).
- **`tests/doku.mjs`:** README der App verlinkt AppDesign über die Markierung der Fassung (D-6), Richtlinien-Versionen aus der
  Markierung (`adText`); `checkCollab` meldet ‚gilt sofort für alle Apps‘ und `?v=` (D-7, W-4).
- **`werkzeug/veroeffentlichen.mjs` (neu, E):** `vorbereiten` erhöht alle Versionsnummern in AppDesign und App und legt die
  Fassung an; `fassung` legt sie nach Änderungen neu an (nur vor dem Veröffentlichen); `los` prüft Zweig, offene Änderungen,
  Texte (CHANGELOG, Prüfliste /0), Fassung und **alle Tests der App**, dann AppDesign `--no-ff` nach `main` mit Markierung,
  Push (4 Wiederholungen), Pages-Lauf über die Actions-Liste abwarten (höchstens 10 min), dann die App genauso; nennt Apps auf
  älteren Fassungen (D-4); `--nur-app`, wenn AppDesign schon online ist (E-8). Liste der Apps `werkzeug/apps.json`.
- **Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs` (neu):** 20 Fälle in Kopien beider Repos mit Schein-Remotes und
  nachgebildetem Pages-Lauf (success, failure, hängt). **Gefunden:** ‚los‘ ließ eine App aus, die auf `main` stand, und
  veröffentlichte AppDesign allein – jetzt zählt jede App, deren Version neuer ist als auf `origin/main`.
- **Vorlage** lädt `../fassung/4.14.0/…`; **README**, **CLAUDE.md 2.1.0**, `tests/README.md` nachgeführt.
- **Designrichtlinie allgemein 4.14.0** (Einleitung, 14, 15.20, R-10.3), **Zusammenarbeit allgemein 2.3.2** (0 Nr. 9 und 10).

## 4.13.0 – 14.10.2026 (Neben)

AppDesign 4.13.0 · Designrichtlinie allgemein 4.13.0 · Zusammenarbeit allgemein 2.3.1 · geprüft mit Reiselogbuch 3.12.0

A-05 Version A – Prüfungen 2.0 (Fall-Liste `arbeit/A-05 Fall-Liste.md`, Teile A, B, C). `v4/` nur Versionsnummer.

- **`tests/pruefe.mjs` (neu, A):** Prüfskripte melden Fehler mit Sollwerten (Wert, RegExp, Funktion, Liste) und
  Rückgabewert 1, jede Meldung mit Regel, Browser, Ansicht und Schritt; Skriptfehler der Seite sind Fehler; Gegenprobe
  `PRUEF_GEGENPROBE=1` (erster Vergleich absichtlich falsch).
- **Grundregeln nach jedem Schritt (C):** `schritt()` misst nach jeder Handlung mit `hig.measure(…, { schnell: true })` –
  dieselben Prüfungen wie `hig.mjs`, ohne Drehen; erst wenn die Seite ruht. Gegenprobe `PRUEF_GEGENPROBE=grundregeln`.
- **`tests/lauf.mjs` (neu, B):** alle Prüfskripte parallel, schnellste zuerst, Abbruch beim ersten Fehler, `--alle`,
  Zeitgrenze je Test, Teilung langer Prüfungen, `--abdeckung` (Test × Ansicht); Chromium **und WebKit**, fehlt ein Browser:
  Abbruch mit Hinweis. Selbsttest `tests/lauf-selbsttest.mjs` (6 Fälle, Gegenprobe rot).
- **`hig.mjs`:** `measure(…, { schnell })`, `report({ still })`; misst erst, wenn keine Animation mehr läuft (vorher
  zufällige Funde unter Last); zählt eine unsichtbare Antippfläche (`::after`, absolut) zur Antippfläche (R-3.1).
- **`version.mjs`:** zweiter Teil mit frischer Seite (WebKit nahm sonst die untergeschobene alte ui.js aus dem Speicher).
- **Safari nachgebildet:** kein Fokus beim Antippen einer Schaltfläche (Chromium und Linux-WebKit setzen ihn, iPad nicht).
- **Gefunden (Grundregeln):** Quartier-Link ‚Hotel‘ nur 42 px breit (R-3.1) – im Reiselogbuch 3.12.0 behoben (unsichtbare
  Antippfläche, Entscheidung a). Warum übersehen: `hig.mjs` lief nur mit langen Quartiernamen.
- **Gefunden (Test):** `tastatur.mjs` bildete die Tastatur durch ein kleineres Fenster nach – die App schaltete dadurch in
  die iPhone-Ansicht; jetzt über `visualViewport` wie Safari.
- **Designrichtlinie allgemein 4.13.0** (Abschnitte 14 und 17), **Zusammenarbeit allgemein 2.3.1** (0 Nr. 2 und 5).
- **Dauer:** alle Prüfungen des Reiselogbuchs in Chromium und WebKit (40 Läufe) in etwa 4 min – vorher nur Chromium
  nacheinander 9 min 15 s.

## 4.12.2 – 14.10.2026 (Korrektur)

AppDesign 4.12.2 · Designrichtlinie allgemein 4.12.2 · Zusammenarbeit allgemein 2.2.0 · geprüft mit Reiselogbuch 3.11.7

A-02 Schritte 3 und 4 (Fall-Liste `arbeit/A-02b Fall-Liste.md`) – nur Richtlinien, Zusammenarbeit und Prüfungen; `v4/` nur
Versionsnummer.

- **Designrichtlinie allgemein, Abschnitt 7 (F-4):** Vorschaufenster in voller Seitenbreite, seitlich wischen auf iPad und
  iPhone (R-6.4) – stand bisher nur in der Designrichtlinie Reiselogbuch.
- **Zusammenarbeit allgemein 2.2.0 (W-1 bis W-3):** Korrekturen sofort als Korrekturversion, auch ohne Datenverlust (§6);
  Antwortzeile nur noch bei mehr als 4 Fragen, jedes Fenster mit ‚Ich schreibe im Chat‘ (§2); Muster und Erklärungen als
  Datei vor dem Fenster (§2); Doppeltes in §5 und §7 durch Verweise auf Abschnitt 0 ersetzt.
- **CLAUDE.md 2.0.0:** zuerst UEBERGABE.md, Regeln nur noch als Verweis.
- **Neue Prüfung `checkCollab` (doku.mjs):** veraltete Stellen in Zusammenarbeit, CLAUDE.md, Backlogs, App-Richtlinie und
  PROMPT.md (‚etwa 5 Punkte‘, Korrektur nur bei Datenverlust, Muster im Fragetext, Antwortzeile, ‚⏱ Gesamt‘, ‚Backup laden
  … ersetzt‘, ‚nur auf dem iPad‘); Verweise auf die Zusammenarbeit; CLAUDE.md mit UEBERGABE.md zuerst; Versionszeile in
  PROMPT.md; Feldnamen des Abgleichberichts in der App-Richtlinie = `labels`. Vorher rot mit 23 Meldungen, jetzt grün.
- **Gefunden:** `checkCatalog` prüfte die Zusammenarbeit nie – der Eintrag stand versehentlich im Kommentar der Zeile
  davor. Behoben. Die Versionszeile in PROMPT.md des Reiselogbuchs stand seit 3.11.5 auf alten Nummern; Warum übersehen:
  `checkDocs` prüfte nur README und CHANGELOG.

## 4.12.1 – 14.10.2026 (Korrektur)

AppDesign 4.12.1 · Designrichtlinie allgemein 4.12.1 · Zusammenarbeit allgemein 2.1.1 · geprüft mit Reiselogbuch 3.11.6

- **R-2.1 – Seitenleiste bei offener Tastatur (P-32/2):** `#side` wandert wie die Kopfzeile um `--vv-top` mit, wenn Safari den
  sichtbaren Bereich verschiebt (z. B. beim Sprung zum ersten Treffer der Suche); vorher rückte sie nach oben.
  `barStill` (hig.mjs) bildet die Verschiebung von Safari jetzt nach (`visualViewport.offsetTop`) – meldete den Fehler am
  iPad und in der iPhone-Startliste, dann behoben. Warum übersehen: Chrome verschiebt den sichtbaren Bereich nie, die
  Tastatur war nur durch ein kleineres Fenster nachgebildet.
- **R-10.1 – Werte im Abgleichbericht (P-32/1):** `createSync` hat die Angabe `values` (je Feld, wie ein Wert angezeigt
  wird); der Bericht zeigt so dasselbe wie die App statt gespeicherter Kürzel. Rückwärtsverträglich.
- **Katalogprüfung:** `checkCatalog` sucht jetzt auch in den Kommentaren von `v4/`, Vorlage und App und meldet ungültige
  Nummern wie ‚R-9.1.3‘ – zwei solche Stellen aus dem Umnummerieren in 4.12.0 (design.css, index.html) behoben.

## 4.12.0 – 14.10.2026 (Neben)

AppDesign 4.12.0 · Designrichtlinie allgemein 4.12.0 · Zusammenarbeit allgemein 2.1.1 · geprüft mit Reiselogbuch 3.11.5

- **Regelkatalog neu (A-02a, Abschnitt 17):** 52 Regeln → **34 in 10 Themen**, Nummern `R-<Thema>.<Nr>` (z. B. R-6.2);
  je Regel genau eine Prüfung (Spalte ‚Prüfung‘), Spalte ‚ersetzt‘ und Zuordnung alt → neu. R-50 ist Arbeitsregel in
  Zusammenarbeit 7.
- **5 neue Regeln mit Prüfung:** R-2.3 Suche, R-4.4 Fenster-Kopfzeile, R-5.3 Fehlermeldungen, R-5.4 Auswahl-Kapsel,
  R-6.4 Ausgabe und Vorschau.
- **Prüfungen:** jede Meldung trägt ihre Regelnummer (auch Antippfläche R-3.1, Schrift/Kontrast R-10.2, Anführungszeichen
  R-10.1, Menü R-4.1, Markierung R-3.3). Neu in `hig.mjs`: Zebra je Tabellenzeile in App-Tabellen (R-6.1), Auswahl-Kapsel
  (R-5.4), höchstens eine blaue Hauptaktion (R-3.3), gleiches Icon für gleiche Bezeichnung über alle Ansichten (R-10.1).
  Neu `tests/ablauf.mjs`: `checkSearch` (R-2.3), `checkDialogHead` (R-4.4), `checkCapital` (R-5.2), `checkFieldErrors`
  (R-5.3), `checkPreview` (R-6.4). Neu `checkCatalog` in `doku.mjs`: jede Regel hat eine Prüfung, jede alte Nummer ist
  zugeordnet und wird nirgends mehr verwendet. Jede neue Prüfung schlug mit einem eingebauten Fehler an (erst rot).
- **Richtlinie gekürzt:** Abschnitte 1, 9, 10, 11, 12, 14 verweisen auf die Regel statt sie zu wiederholen; Grundprinzipien
  nennen iPad und iPhone und den Abgleich über das Backup (W-6).
- `v4/`: nur die Versionsnummer (`AD_VERSION`, `--ad-version`) und Regelnummern in Kommentaren – keine Änderung der Bausteine.
- **Lücke gefunden:** Viele Ablauf-Tests der App geben Werte nur aus und melden keine Fehler; die Regeln, die sie betreffen,
  haben jetzt eigene Prüfungen mit Fehlermeldung. Der Rest kommt mit A-05.

## 4.11.4 – 14.10.2026 (Korrektur)

AppDesign 4.11.4 · Designrichtlinie allgemein 4.11.4 · Zusammenarbeit allgemein 1.16.0

- **R-52 präzisiert:** Zusammengefasste Zellen in der ersten Spalte gelten als **eine Tabellenzeile**; alle Zellen dahinter
  haben die Farbe der ersten Spalte, weiß und grau wechseln je Tabellenzeile. Im Abgleichbericht ist jedes Reiselogbuch
  eine Tabellenzeile (Name in der ersten Spalte zusammengefasst), ganz weiß oder ganz grau. 4.11.3 färbte innerhalb eines
  Reiselogbuchs abwechselnd – vom Nutzer vor dem Test gefunden. Die Prüfung zählt jetzt Tabellenzeilen (zusammengefasste
  oder leere erste Zelle setzt die Zeile fort); sie meldete den Fehler, dann behoben.

## 4.11.3 – 14.10.2026 (Korrektur)

AppDesign 4.11.3 · Designrichtlinie allgemein 4.11.3 · Zusammenarbeit allgemein 1.16.0

- **R-52 (neu) – Mustertabelle der Ausgabe als Baustein:** `outputCss(scope)` in ui.js enthält Schrift und Tabellen der
  HTML-Ausgabe (Kopf grau und fett, Linien überall gleich stark, jede zweite Zeile grau, Innenabstände). Die Ausgabe des
  Reiselogbuchs und der Abgleichbericht verwenden ihn – eine Quelle statt Nachbildung. Anlass: Der Abgleichbericht hatte
  eine dickere Linie zwischen den Reiselogbüchern, keine grauen Zeilen und einen halbfetten Kopf (P-29/3). Die Prüfung
  vergleicht jede Tabelle Eigenschaft für Eigenschaft mit der Mustertabelle; nach Zusammenarbeit 1.16.0 zuerst geschärft
  (sie meldete die Abweichungen), dann behoben.
- **Zebra über die ganze Zeile:** Jede zweite Zeile ist über die ganze Breite grau (allgemeiner Standard); deshalb hat der
  Abgleichbericht keine zusammengefassten Zellen mehr – Reiselogbuch, Tag, Gerät und Zeitpunkt stehen nur in der ersten
  Zeile ihrer Gruppe. Die Prüfung meldet teilweise gefärbte Zeilen und zusammengefasste Zellen über weiße und graue Zeilen.

## 4.11.2 – 14.10.2026 (Korrektur)

AppDesign 4.11.2 · Designrichtlinie allgemein 4.11.2 · Zusammenarbeit allgemein 1.16.0

- **R-37 überall:** Die Prüfung erfasste nur Tabellen der App-Seite (`#app`), nicht Fenster, Vorschauen und Berichte –
  deshalb blieb unentdeckt, dass im Abgleichbericht Datum und Uhrzeit in die Nachbarzellen ragten (P-27/8). Jetzt wird
  jede sichtbare Zelle überall geprüft, auch nach seitlichem Wischen; der Bericht bricht in jeder Zelle um.
- **Abgleichbericht:** PDF in der Kapsel oben rechts wie bei der Vorschau der Ausgabe (Drucken-Menü, `#printout`).
  Zellen trennen lange Wörter mit deutscher Silbentrennung (‚Stadtrund-gang‘) statt mitten im Wort ohne Strich.
- **R-51 (neu):** Beim Drehen bleibt oben derselbe Eintrag stehen (Baustein in ui.js); das Prüfskript dreht jede Seite mit
  Einträgen einmal hin und zurück und bildet Safari nach (kein Scroll-Anker).
- **Zusammenarbeit allgemein 1.16.0:** Fehler am Gerät → zuerst die Prüfung schärfen; Testfälle selbst ableiten; Tests
  bilden Safari nach; jede Meldung deutsch.

## 4.11.1 – 13.10.2026 (Korrektur)

AppDesign 4.11.1 · Designrichtlinie allgemein 4.11.1 · Zusammenarbeit allgemein 1.15.0

- **R-49 (neu):** Die README jeder App zeigt ganz oben ‚Verwendete Versionen‘ (App, AppDesign, Designrichtlinie allgemein,
  Designrichtlinie <App>, Zusammenarbeit allgemein – je Version und Link).
- **R-50 (neu):** Jede Prüfliste beginnt mit /0 ‚Version prüfen‘; jeder Schritt nennt die Meldung je Gerät; jeder solche Fall
  hat einen automatischen Test. Neue Prüfung `tests/doku.mjs` (R-49, R-50).
- **Zusammenarbeit allgemein 1.15.0:** ‚Fertig‘ erst nach erfolgreichen Pages-Läufen beider Repos; R-49 und R-50 als
  Zusammenarbeitsregeln (Anlass: P-26/6, 7 und 9).

## 4.11.0 – 13.10.2026 (Nebenversion)

AppDesign 4.11.0 · Designrichtlinie allgemein 4.11.0 · Zusammenarbeit allgemein 1.14.0

- **R-44 neu gestaltet – Ergebnis des Abgleichs in zwei Stufen:** kleines Fenster ‚Abgleichen‘ ohne Einzelheiten mit der
  Schaltfläche ‚Abgleichbericht anzeigen‘ (nur, wenn es etwas zu berichten gibt); der **Abgleichbericht** ist eine Vorschau
  wie die Ausgabe (immer hell, teilbar als HTML) mit Kopf, Tabelle ‚Änderungen auf diesem Gerät‘ (Eintrag · Tag · Feld ·
  Neu · Vorher · Vom Gerät · Geändert am, Spaltenköpfe halbfett), Unverändertes nur als Anzahl, Tabelle ‚Auf diesem Gerät
  neuer als im Backup – bleibt so‘ und Hinweisen. Bausteine `sync.showResult`, `sync.reportHtml`, `sync.openReport`;
  `createSync` mit `labels` (Feldnamen) und `app`; `inform(…, { action })` für eine Schaltfläche im kleinen Fenster.
- **‚Hier neuer als im Backup‘:** ist dieses Gerät neuer, heißt es nicht mehr ‚Alles war schon auf dem gleichen Stand‘,
  sondern ‚Auf diesem … hat sich nichts geändert‘ mit den neueren Feldern im Bericht (P-26/9).
- **R-48 (neu) – Versionskopplung App ↔ AppDesign:** `ui.js` und `design.css` mit `?v=<Version>` in `index.html` und
  `sw.js`, `AD_VERSION` / `--ad-version` / `AD_NEEDED`, Hinweis beim Start bei falscher Fassung, Versionszeile nennt
  AppDesign; Prüfung `tests/version.mjs`; Vorlage angepasst. Anlass: auf dem Gerät lief bei P-26 noch die alte Fassung.
- **R-47:** ein einziger Zustand der Seitenleiste für quer und hoch (nur Tippen ändert ihn); die Prüfung dreht mit
  Zwischengrößen wie am echten Gerät.
- **R-40:** Kontextmenü wird nach dem Loslassen noch einmal ausgerichtet; rückt die Liste nicht, steht es über der Kachel;
  der dazugegebene Platz unter der Liste verschwindet beim Schließen. `tests/kontextmenue.mjs` prüft zusätzlich den letzten
  Eintrag bei ganz nach unten gewischter Liste.

## 4.10.1 – 13.10.2026 (Korrektur)

AppDesign 4.10.1 · Designrichtlinie allgemein 4.10.1 · Zusammenarbeit allgemein 1.14.0

- **R-47 (neu):** Die Seitenleiste behält beim Drehen ihren Zustand – sichtbar bleibt sichtbar, ausgeblendet bleibt
  ausgeblendet. Das Prüfskript prüft das automatisch je Seite (beide Zustände).
- **R-40 ergänzt:** Kontextmenü an einer Kachel ist nie abgeschnitten und steht nie über bzw. hinter der Backup-Kachel –
  am iPhone rückt die Liste nach oben und bekommt bei wenigen Einträgen unten Platz, am iPad endet das Menü über der
  Kachel. Neue allgemeine Prüfung `tests/kontextmenue.mjs` (jede sichtbare Kachel, verschiedene Listenlängen).
- **R-42 ergänzt:** Leere Felder gelten beim Abgleich als nicht vorhanden – ein Fenster, das alle Felder speichert,
  überschreibt nichts mehr mit ‚leer‘ (Fall 8b in `tests/abgleich.mjs`).
- **R-43:** Die Hinweise nennen die Geräte beim Namen (‚Auf dem iPad gelöscht, auf diesem iPhone danach noch geändert‘).
- **Zusammenarbeit allgemein 1.14.0:** am Ende jeder Umsetzung alle offenen Prüfpunkte einzeln Schritt für Schritt.

## 4.10.0 – 12.10.2026 (Nebenversion)

AppDesign 4.10.0 · Designrichtlinie allgemein 4.10.0 · Zusammenarbeit allgemein 1.13.0

- **R-40 Drehen:** offenes Menü, Untermenü und Sprechblase werden beim Drehen (hoch ↔ quer) neu ausgerichtet –
  Menü unter der Schaltfläche, Untermenü neben seinem Eintrag, ganz sichtbar; die Seitenleiste bleibt dabei
  sichtbar. Menüs stehen immer unter ihrer Schaltfläche (zu wenig Platz: Inhalt scrollt). Kontextmenü ohne Platz
  daneben (iPhone): linksbündig unter der Kachel, über der Backup-Kachel. Das Prüfskript dreht jede Ansicht mit
  offenem Menü automatisch (`measure()`).
- **Abgleich als allgemeine Regel R-41 bis R-44:** Baustein `createSync()` in `ui.js` (je Feld das Neuere,
  gelöschte Einträge mit Hinweisen, Ergebnisfenster, ‚geändert am … · Gerät‘), Fall-Tabelle in Abschnitt 15.18,
  allgemeine Prüfung `tests/abgleich.mjs` (alle Fälle, beide Richtungen, jede App).
- **Backup erstellen und laden als Standard R-45, R-46** (Abschnitt 15.19): Bausteine `backupFileOf`, `shareFiles`,
  `shareResultText`, `backupLastText`, `backupToday`, `backupTileHtml`, `backupMenuEntries`, `readBackup`;
  Abfrage ‚Backup laden‘ mit je einer Kachel für Abgleichen und Ersetzen (`choosePop` mit `desc`);
  allgemeine Prüfung `tests/backup.mjs`.

## 4.9.1 – 12.10.2026 (Korrektur)

AppDesign 4.9.1 · Designrichtlinie allgemein 4.9.1 · Zusammenarbeit allgemein 1.13.0

- **Neue Regel R-39:** Menü, Sprechblase und Fenster passen immer ganz auf den Bildschirm. `placeAt()`
  begrenzt die Höhe (Inhalt scrollt darin) und hält sie im Bild; auf dem iPhone quer ist die
  Sprechblase breiter, die Knöpfe stehen nebeneinander. Fenster werden neu platziert, wenn sie nach
  dem Öffnen wachsen (`ResizeObserver`).
- Prüfskript: R-39 (ragt etwas über den Bildschirm hinaus?) und R-38 geprüft; Gegenprobe gemacht –
  sie fand auch das Fenster ‚Tag‘ am iPad hoch, das 10 px über den Rand ragte.

## 4.9.0 – 12.10.2026 (Nebenversion)

AppDesign 4.9.0 · Designrichtlinie allgemein 4.9.0 · Zusammenarbeit allgemein 1.13.0

- **Abgleich zwischen iPad und iPhone** (Designrichtlinie 15.4): ‚Backup laden‘ fragt mit drei Wegen
  – Abgleichen · Ersetzen · Abbrechen –, zeigt Zeitpunkt und Gerät des Backups und ob es neuer oder
  älter ist; das Ergebnis steht im kleinen Fenster.
- **`choosePop()`** in `ui.js`: Sprechblase mit mehreren Wegen; `confirmPop()` nutzt sie. Neue Regel
  **R-38** mit Prüfung im Skript (empfohlene Aktion blau zuerst, zerstörende rot, Abbrechen zuletzt).
- **`deviceName()`** in `ui.js` (iPad/iPhone, iPadOS meldet sich als Mac mit Touch); Kachelzeile
  ‚geändert am … · Gerät‘ (`.side-row small.chg`); `button.danger-text` (im Dunkeln heller für 4,5 : 1).

## 4.8.1 – 12.10.2026 (Korrektur)

AppDesign 4.8.1 · Designrichtlinie allgemein 4.8.1 · Zusammenarbeit allgemein 1.13.0

- **R-05 verschärft:** Eine Symbolleiste – mit oder ohne Suchzeile – steht immer an ihrem Platz und
  bewegt sich beim Wischen keinen Millimeter, auch am Rand, bei offener und beim Schließen der
  Tastatur. Ist die Tastatur der Suche offen, schließt das erste Wischen nur die Tastatur; die Seite
  bewegt sich dabei nicht (4.8.0 ließ sie im selben Wischen schon scrollen, die Leiste konnte zittern).
- **Prüfskript:** `hig.barStill()` misst Lage und Höhe jeder sichtbaren Leiste (Kopfzeile, Seitenkopf,
  Suchzeile, Seitenleisten-Kopf, Backup-Kachel) an acht Scroll-Stellen bis über die Ränder hinaus;
  ab 0,5 px Bewegung meldet es R-05. Gegenprobe mit absichtlich zitternder Leiste gemacht.

## 4.8.0 – 12.10.2026 (Nebenversion)

AppDesign 4.8.0 · Designrichtlinie allgemein 4.8.0 · Zusammenarbeit allgemein 1.13.0

- **R-37 verschärft:** Reihen von Smileys ohne Leerzeichen brechen am Rand der Zelle um; mehr als
  drei Smileys am Zeilenanfang sind Inhalt, kein Zeichen (hängender Einzug). `breakable()` setzt
  die Umbruchstellen nach ganzen Zeichen (Graphemen), zusammengesetzte Smileys bleiben ganz.
- **Seitenleiste:** die Liste behält beim Neuaufbau ihre Position, der gewählte Eintrag bleibt
  sichtbar (iPad und iPhone, derselbe Baustein).
- **Suche (iPhone):** Wischen bei offener Tastatur schließt sie wie bei Apple – die Leisten zittern
  nicht mehr (R-05).
- Prüfskript: Ansichten laufen bei einem Fehler weiter, der Bericht nennt alle Funde.

## 4.7.0 – 12.10.2026 (Nebenversion)

AppDesign 4.7.0 · Designrichtlinie allgemein 4.7.0 · Zusammenarbeit allgemein 1.13.0

- **R-36 Gleiche Funktion = gleicher Baustein auf iPad und iPhone:** die iPhone-Startliste ist die
  Seitenleiste `#side` als ganze Seite (`#side.page`), kein eigener Nachbau mehr. Die Kacheln
  laufen auf beiden Geräten unter dem Kopf und hinter der Backup-Kachel (`.side-foot`) durch.
  Das Prüfskript hält den Aufbau eines Bausteins je Gerät fest (`hig.shape()`) und meldet jeden
  Unterschied; zusätzlich prüft es, dass die Liste unter die Backup-Kachel reicht.
- **R-37 Kein Text ragt über Zelle, Kasten oder Kachel hinaus:** zu lange Wörter (über 20 Zeichen)
  brechen im Wort um (`breakable()` in `ui.js`, `overflow-wrap` in `design.css`). Das Prüfskript
  misst jede Zelle, jeden Kasten und jede Kachel; die Apps prüfen mit Testdaten aus 100 × ‚a‘.
- Gegenprobe: mit absichtlich wieder eingebauten Fehlern melden R-36 und R-37 beide Fälle.

## 4.6.0 – 11.10.2026 (Nebenversion)

AppDesign 4.6.0 · Designrichtlinie allgemein 4.6.0 · Zusammenarbeit allgemein 1.13.0

- **Regelkatalog** (Designrichtlinie allgemein, Abschnitt 17): alle allgemeinen Regeln aus der
  bisherigen Zusammenarbeit nummeriert (R-01 bis R-35), je Regel die Art der Prüfung
  (Skript, Ablauf, Gerät, Muster).
- **HIG- und Regel-Prüfung** (`tests/hig.mjs`): prüft zusätzlich zu den HIG-Punkten die 29
  automatisch prüfbaren Regeln in jeder Ansicht; Gegenprobe mit absichtlich eingebauten Fehlern.
- **Leisten fest auch am iPad (R-05):** Kopfzeile `.nb` fest positioniert (nicht sticky), neben der
  festen Seitenleiste rechts davon; in der Seitenleiste scrollen nur die Einträge (`.side-list`),
  Kopf und Backup-Kachel liegen außerhalb.
- **Zusammenarbeit allgemein 1.13.0:** Abgleich mit dem Regelkatalog vor jedem Muster, Prüfung aller
  automatisch prüfbaren Regeln nach jeder Version, neue Regeln sofort mit Nummer und Prüfung,
  Geräte-Regeln in die Prüfliste, wenn betroffen.

## 4.5.0 – 11.10.2026 (Nebenversion)

AppDesign 4.5.0 · Designrichtlinie allgemein 4.5.0 · Zusammenarbeit allgemein 1.12.5

- Leisten bewegen sich nie: `overscroll-behavior: none` auf `html`/`body` (kein Nachfedern der
  Seite); `.pnav` (iPhone) fest positioniert, der Inhalt beginnt unter ihr (`--pnav-h`, `updateBar`).

## 4.4.0 – 11.10.2026 (Nebenversion)

AppDesign 4.4.0 · Designrichtlinie allgemein 4.4.0 · Zusammenarbeit allgemein 1.12.5

- `updateBar`: ohne großen Titel steht der Titel immer in der Leiste.
- Backup-Kachel `.bhint`/`.bnote` immer sichtbar; `.ok` = heute schon gesichert (weiß, normaler Knopf).
- Anzahl klein und grau unter dem Titel (`.side-head .ttl small`, `.pnav-head small`).
- Großschreibung: `capBefore` (beforeinput) und `capNext(feld)` für das Wort nach einem Vorschlag.

## 4.3.0 – 11.10.2026 (Nebenversion)

AppDesign 4.3.0 · Designrichtlinie allgemein 4.3.0 · Zusammenarbeit allgemein 1.12.5

- Doppeltippen vergrößert die Ansicht nicht mehr (`touch-action: manipulation` für alle Elemente).
- Datumsfelder: Bezeichnung und Feld als `.pair` – Umbruch nur vor der Bezeichnung.
- `ui.js`: `autoCapital` setzt in Fenstern den ersten Buchstaben jeder Zeile (und nach . ! ?) groß.
- Seitenleiste: Hintergrund `--bg`, Kopf bleibt stehen, Einträge als Kacheln mit ›, Backup-Hinweis
  als gelbe Kachel fest unten. iPhone-Startliste: Titel links in der Leiste (`.pnav-head`).
- Bezeichnung im Kasten (`.k.word`) halbfett; Nach oben/Ans Ende in einer senkrechten Kapsel.

## 4.2.0 – 11.10.2026 (Nebenversion)

AppDesign 4.2.0 · Designrichtlinie allgemein 4.2.0 · Zusammenarbeit allgemein 1.12.5

- Nur der Vordergrund reagiert: offene Fenster sperren die Seite dahinter (`lockPage`), Menüs und
  Sprechblasen fangen das Wischen ab (`blockingLayer`), `overscroll-behavior: contain`.
- Fenster öffnen ohne Fokus-Rahmen am x (`showModalQuiet`); kein Rahmen beim Antippen.
- iPhone: großer Titel wandert beim Hochschieben in die Leiste (`updateBar`, `.pnav-title`);
  Kacheln `.ilist.tiles` mit `.irow.current`; fester Hinweis `.bbar .bnote` (gelb, blauer Knopf);
  Kasten `.box .kv` mit Linien waagrecht und senkrecht, Bezeichnung als Wort `.k.word`.
- Seitenleiste: Backup-Hinweis gelb und fest am unteren Rand.
- Korrektur: Kapsel mit Text-Schaltfläche (z. B. [PDF | share]) im Fenster-Kopf auf dem iPhone
  nicht mehr zusammengedrückt.

## 4.1.0 – 10.10.2026 (Nebenversion)

AppDesign 4.1.0 · Designrichtlinie allgemein 4.1.0 · Zusammenarbeit allgemein 1.12.5

- iPhone-Ansicht (Designrichtlinie 15.17): `isPhone()` und Klasse `phone` auf `<html>` (iPhone hoch
  und quer, sehr schmale Fenster); Komponenten Seitenkopf `.pnav`, großer Titel `.ltitle`/`.lcount`,
  Liste `.ilist`/`.irow`, Kasten `.box`/`.kv`, untere Leiste `.bbar` (wandert mit der Tastatur);
  Fenster bildschirmfüllend mit kompakter Kopfzeile; Options-Kapseln unter dem Kasten-Titel.
- Menü: Punkte mit Häkchen **und** Icon (Häkchen vorne, dann Icon und Text).
- `button[hidden]` blendet Schaltflächen zuverlässig aus.
- Rückwärtsverträglich: Apps ohne iPhone-Seiten sehen auf dem iPad unverändert aus.

## 4.0.0 – 09.10.2026 (Hauptversion)

AppDesign 4.0.0 · Designrichtlinie allgemein 4.0.0 · Zusammenarbeit allgemein 1.10.0

- Design-Repo angelegt (S-01, S-02): Designrichtlinie allgemein und Zusammenarbeit allgemein aus
  ReiseLogBuch übernommen (Versionsgeschichte bis 3.6.1 bzw. 1.9.0 siehe dort in den Dateien).
- `v4/design.css`: alle gemeinsamen Komponenten (aus Reiselogbuch 2.4.0, unverändert im Aussehen).
- `v4/ui.js`: Icons, Menüs mit Untermenü, Sprechblase, gedrückte Schaltflächen, Meldung, Fenster,
  Darstellung (folgt dem iPad), Auswahl-Kapsel, Tastatur/sichtbarer Bereich, Beträge.
- `tests/hig.mjs`: HIG-Prüfung für alle Apps; `apple-referenz/`: Vergleichsbilder (iPhone Notizen).
- `vorlage/index.html`: Startpunkt für neue Apps.
- Erste App: Reiselogbuch 3.0.0 – pixelgenau gleiches Aussehen wie 2.4.0 (40 Ansichten verglichen).
