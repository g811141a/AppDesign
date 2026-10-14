# AppDesign – Versionsgeschichte

Versionsnummer **Hauptversion.Nebenversion.Korrektur** – gleich der Version der Designrichtlinie
allgemein. Hauptversion = neuer Ordner (`v5/`), Apps werden bewusst umgestellt.

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
