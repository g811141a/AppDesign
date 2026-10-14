# AppDesign – Versionsgeschichte

Versionsnummer **Hauptversion.Nebenversion.Korrektur** – gleich der Version der Designrichtlinie
allgemein. Hauptversion = neuer Ordner (`v5/`), Apps werden bewusst umgestellt.

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
