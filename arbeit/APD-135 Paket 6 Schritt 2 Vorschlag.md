# APD-135 Paket 6, Schritt 2 (B-3.1, B-3.2) – Vorschlag mit Wortlaut und Testfall-Liste

**Stand 19.11.2026** · Sitzung 0139 · **noch nicht bestätigt** · Grundlage: `arbeit/APD-135 Konsolidierung 3 Befund und Plan.md` (Abschnitt 3, B-3.1, B-3.2),
`arbeit/APD-135 Befund U Bausteine ui.js.md` (APD-135/U-26 bis U-32, U-45), Entscheidung APD-135/J-31 und Nutzer 19.11.2026 (Schritt 2 kommt mit in
AppDesign 4.64.0 / Reiselogbuch 3.57.7). Die Bestandsaufnahme hat ein Hilfsagent gemacht (Opus 5.5, Aufwand hoch, nur gelesen).

## Umfang und Version

- **Sammelversion AppDesign 4.64.0 / Reiselogbuch 3.57.7**, weiter 2 Themen (0 Nr. 8): APD-138 und APD-135 Paket 6 (Schritt 1 und 2).
- **Prüfstufe:** voll. **Risiko:** gering (Plan). Bedienung und Aussehen der App ändern sich nicht; `ui.js` und `design.css` ändern sich in Schritt 2
  voraussichtlich nicht.
- **Usertest:** P-114 bleibt, wie er ist (/0, /1) – die Prüfseite sieht man am Gerät nicht.
- **Aufwand (Vermutung):** groß – Vorlage etwa +150 Zeilen, eine neue Prüfbibliothek, die 5 Abläufe umziehen (heute zusammen 439 Zeilen), Gegenproben.
  Wird der Kontext knapp, übergebe ich nach B-3.1 (0 Nr. 13), und Sitzung 0140 macht B-3.2 auf denselben Zweigen weiter. Gebaut wird erst nach der
  Bau-Frage am Ende.

## Befund in Kürze (Bestandsaufnahme)

1. **Die Vorlage ist hinter der App** (U-45) und verletzt sogar R-1.14: sie nutzt `APPEARANCES`/`setAppearance` (vorlage Z. 70–71), die nicht in
   `schnittstelle.json` stehen. Es fehlen Seitenleiste, Teilen, `.fab`, Versionszeile mit Messung, Suche, Kontextmenü, Sprechblase, iPhone-Navigation.
2. **Die Prüffunktionen sind schon seitenneutral:** `checkTitelBlase`, `checkTitelOben`, `checkSchichtOben`, `checkGrossanzeige`, `checkMessung`,
   `checkWachsen` nennen keinen Namen des Reiselogbuchs, nur Klassen und Globale aus `ui.js`. Die Prüfdateien der App liefern Daten, Selektoren und
   App-Funktionen (`openTripDialog`, `openDayDialog`, `db.trips`, `phoneList`).
3. **Echte Reiselogik in den 5 Dateien** (bleibt in der App): Datum ‚Do, 27.08.2026‘ im Fenstertitel (titel-blase L-3), Reisetitel unverändert (L-8),
   nichts gelöscht (schicht-oben, `db.trips.length`), leere App öffnet ‚Neues Reiselogbuch‘ (messung F10).
4. **Technik:** `lauf.mjs` startet nur Dateien im Ordner der App; Prüfbibliotheken in AppDesign können `playwright` nicht laden (liegt nur im App-Ordner);
   die Ausgabe darf nicht in `fassung/X.Y.Z/tests/out/` landen (Prüfsummen). In die Fassung kommen nur Dateien direkt in `tests/`, `vorlage/` nicht.
5. **Laufzeit heute** (Messung 0121): die 5 Abläufe zusammen 14,7 min Rechenzeit in 10 Läufen (`ablauf-grossanzeige` 332 s, `-titel-oben` 198 s,
   `-schicht-oben` 140 s, `-messung` 107 s, `-titel-blase` 105 s). Gespart wird erst mit Stufe ‚App‘ (Paket 7) wirklich – heute laufen im vollen Lauf beide.

## Inhalt

**B-3.1 – Vorlage angleichen, Prüfseite und Mindestseite, Gruppe A**

1. **Vorlage angleichen** (`vorlage/index.html`): eine kleine neutrale App ‚Neue App‘ mit Einträgen und Unterpunkten, gebaut wie das Reiselogbuch –
   Seitenleiste (`#side` mit `.side-head` h2, `#newItem`, `#sideMore`, `#sideHide`; `.side-list` mit `.side-row[data-id]`; `.side-foot` mit Backup-Kachel),
   Kopfzeile mit Titel, Teilen `#shareBtn` und Mehr `#mainMore`, iPhone `.pnav` mit `#back` und `navAnmelden`, Rollbereich `#rolle` mit den Unterpunkten
   (`data-day`), `.fab` mit `#toTop`/`#toEnd`, Mehr-Menü der Liste mit `suchenMenuItems`, `darstellungMenuItem`, `backupMenuEntries`, `messungMenuItems` und
   Versionszeile `{ note, halten: true }`, Kontextmenü auf den Zeilen, rotes ‚Eintrag löschen‘ mit Sprechblase (`confirmPop`), Fenster ‚Eintrag bearbeiten‘
   mit `dlgHead` und Feld. Daten aus `localStorage` (`neueapp.v1`, `items` mit `sub`). `APPEARANCES`/`setAppearance` fallen weg. Nur Namen aus
   `schnittstelle.json` (Teil `app`); braucht die Vorlage einen weiteren Namen, melde ich es vor dem Bau.
2. **Die Vorlage ist die Prüfseite** (U-32): `vorlage/index.html` kommt mit in die feste Fassung (`fassung/X.Y.Z/vorlage/index.html`, `tests/version.mjs`
   `fassungQuellen`). Neu `tests/pruefseite.mjs` (AppDesign) öffnet sie: `oeffneVorlage(p, { daten, fehler })` – setzt die neutralen Daten, lädt `ui.js` und
   `design.css` der Fassung, in der die Bibliothek liegt (über `p.route`, so passen die Pfade in Arbeitsstand und Fassung), und schleust für die Gegenprobe
   einen Fehler in `ui.js` ein (Textersetzung wie `gleitenGegenprobe`).
3. **Mindestseite aus der Vorlage abgeleitet:** `oeffneMindestseite(p, { fehler })` nimmt den Text der Vorlage derselben Fassung, behält `<head>`, `#dlg`,
   `#msg` und `ui.js` und ersetzt das Skript der App durch die Platzhalter `db = { settings: { appearance: 'auto' } }`, `save() {}`, `render() {}` und eine
   Zeile `const sync = createSync({ list: 'items', sub: 'sub' })`. Fehlt der Vorlage `#dlg` oder `#msg`, ist die Mindestseite rot.
4. **Gruppe A (8 Bausteine, nur Werte)** – neu `checkWerte(p)` in `tests/pruefseite.mjs`:
   - Version: `AD_VERSION` = `--ad-version` = Ordner der Fassung (R-10.3);
   - Icons: `ic('pencil')` liefert ein `svg.ic` mit `aria-hidden`, ein unbekannter Name kein kaputtes Markup (R-1.8);
   - Leerer Zustand: `leerHtml`, `leerSuche` mit Icon, Titel und Text (R-7.7);
   - Hilfen: `esc`, `breakable`, `iconText`, `aufzaehlung`, `thousands`, `money`, `formatEuro` mit festen Beispielen (R-10.5, R-6.3, R-10.7);
   - Suche: `checkSearchWords` (wie heute in `ablauf-suche-woerter`) und `markWords` (R-2.3);
   - Teilen: `outputCss` und `shareResultText` (R-6.2, R-10.7);
   - Backup: `backupFileOf` → `readBackup` ergibt dieselben Daten, `backupTileHtml` heute/alt/nie (R-9.1);
   - Abgleich: `checkSync` (wie heute `abgleich-regeln`, R-9.2 bis R-9.4).
5. **Lauf in der App:** neu im Reiselogbuch `tests/bausteine-pruefseite.mjs` (eine dünne Hülle, ~15 Zeilen: übergibt `playwright` und den Ausgabeordner der App)
   mit Teilen in `alle.mjs`; in B-3.1 der Teil `werte`. `abgleich-regeln` bleibt in der App (prüft die Konfiguration von `createSync` der App mit, U-30 Nr. 5).
6. **Gegenprobe:** neu `--gegenprobe pruefseite` in `lauf.mjs` – jeder Teil läuft je eingeschleustem Fehler seines Bausteins und muss rot werden.

**B-3.2 – die 5 Abläufe auf die Prüfseite**

7. In `tests/pruefseite.mjs` je Ablauf eine Funktion mit denselben Fällen wie heute in der App, nur mit der Vorlage und neutralen Daten: `ablaufMessung`
   (APD-27/F-1 bis F-12), `ablaufTitelBlase` (APD-101/L-1 bis L-12), `ablaufTitelOben` (APD-62/H-1 bis H-9, APD-109/C-1 bis C-9, APD-108/W-1 bis W-7),
   `ablaufSchichtOben` (APD-118/X-1 bis X-8 mit den 3 Messdateien – deshalb behält die Vorlage `#sideMore`), `ablaufGrossanzeige` (APD-104/L-1 bis L-9).
   Ansichten, Textgrößen, ‚Bewegung reduzieren‘ und Grundregeln wie heute.
8. Die Hülle `bausteine-pruefseite.mjs` bekommt die Teile `messung`, `titel-blase`, `titel-oben`, `schicht-oben`, `grossanzeige` (zusammen mit `werte`
   6 Teile × 2 Browser = 12 Läufe).
9. **Gegenprobe vor dem Wegfall:** je Ablauf ein eingeschleuster Fehler, der den alten Fehler nachbildet (z. B. keine Sprechblase am gekürzten Titel, Hörer
   von ‚Titel antippen‘ am `window`, Schicht schließt nicht beim Loslassen, Großanzeige ohne Auslösen). Derselbe Fehler muss **auf der Prüfseite und in der
   heutigen Prüfung der App** rot werden; die Nachweis-Tabelle kommt ins CHANGELOG.
10. **Danach in der App** – Frage 2 unten. Mein Vorschlag (a): die 5 Dateien fallen weg; neu `tests/ablauf-bausteine.mjs` mit einer kurzen
    Zusammenspiel-Prüfung je Baustein an echten Knöpfen der App (U-31, gegen die Falle ‚neuer Knopf der App wird von selbst Nutzer‘, C-57 Nr. 1) und den
    Teilen mit Reiselogik (Befund Nr. 3). Gegenprobe mit denselben Fehlern.

**AD-Bean (0 Nr. 25, R-1.13):** ‚AD-Bean: keine, weil nur Vorlage, Prüfseite und Prüfungen‘ – `ui.js` und `design.css` bleiben in Schritt 2 unverändert.

## Wortlaut (0 Nr. 29)

**Designrichtlinie 14, ‚Inhalt‘ – alt:** ‚`vorlage/index.html` (Startpunkt für neue Apps)‘ · **neu:** ‚`vorlage/index.html` (Startpunkt für neue Apps und
Prüfseite der Bausteine)‘

**Designrichtlinie 14, ‚Feste Fassung‘ – alt:**

> (`design.css`, `ui.js`, `tests/`, der Text dieser Richtlinie und der Zusammenarbeit; Prüfsummen in `fassung/PRUEFSUMMEN`)

**neu** (dazu die Lücke aus Schritt 1: `schnittstelle.json` liegt schon seit 4.64.0 in der Fassung):

> (`design.css`, `ui.js`, `schnittstelle.json`, `tests/`, `vorlage/index.html`, der Text dieser Richtlinie und der Zusammenarbeit; Prüfsummen in
> `fassung/PRUEFSUMMEN`)

**Designrichtlinie 14, ‚Prüfen‘ – neuer Satz am Ende:**

> Bausteine, die ohne den Inhalt einer App gleich laufen, prüft AppDesign auf der **Prüfseite** – der Vorlage derselben Fassung mit neutralen Daten –, ihre
> Werte auf der daraus abgeleiteten Mindestseite (`tests/pruefseite.mjs`); die App startet sie über eine Hülle (`tests/bausteine-pruefseite.mjs`), je
> Baustein mit eingeschleustem Fehler als Gegenprobe (`--gegenprobe pruefseite`). Was nur im Zusammenspiel mit der App sichtbar wird, prüft die App selbst.

**Designrichtlinie 17, Kopf ‚Prüfung‘ – alt:** ‚dazu `kontextmenue.mjs`, `start.mjs`, `backup.mjs`, `abgleich.mjs`, `offline.mjs`, `version.mjs`, `doku.mjs`.‘ ·
**neu:** ‚dazu `kontextmenue.mjs`, `start.mjs`, `backup.mjs`, `abgleich.mjs`, `offline.mjs`, `version.mjs`, `doku.mjs`, `pruefseite.mjs` (Bausteine auf der
Prüfseite, 14).‘

**R-1.14, Spalte Prüfung – alt:** ‚schnittstelle.mjs – `checkSchnittstelle` (App, Prüfdateien, Namensgleichheit, Liste gegen `ui.js`; Gegenprobe)‘ ·
**neu:** ‚schnittstelle.mjs – `checkSchnittstelle` (App, Vorlage, Prüfdateien, Namensgleichheit, Liste gegen `ui.js`; Gegenprobe)‘

**Doku ohne Regel** (nach demselben Wortlaut): `tests/README.md` in AppDesign (Abschnitt ‚Prüfseite‘) und im Reiselogbuch (neue Hülle, weggefallene Dateien),
AppDesign-`README.md` (Vorlage), Kopfkommentar von `alle.mjs`.

## Testfall-Liste (automatisch)

In Chromium und WebKit, soweit ein Browser nötig ist; nach jedem Schritt die Grundregeln (`pruefe.mjs`). Nummern gelten nur in dieser Datei (APD-135/E-n).

| Nr. | Punkt | Fall | Erwartet | Prüfung | gegen 4.63.0 / 3.57.6 |
|---|---|---|---|---|---|
| E-1 | 1 | Vorlage nutzt nur Namen aus `schnittstelle.json` | grün; Kopie mit `setAppearance` → rot mit ‚R-1.14‘ | `schnittstelle-regeln` (neu mit Vorlage) | rot (`APPEARANCES`, `setAppearance`) |
| E-2 | 1, 2 | Vorlage iPad quer/hoch, iPhone hoch/quer, hell und dunkel, leer und mit 60 Unterpunkten | Grundregeln grün, keine Skriptfehler | `bausteine-pruefseite` (alle Teile) | – (neu) |
| E-3 | 2 | Vorlage aus der Fassung geöffnet (Pfade über `p.route`) | lädt `ui.js` und `design.css` derselben Fassung, `AD_VERSION` stimmt | `checkWerte` | – |
| E-4 | 3 | Mindestseite aus der Vorlage abgeleitet | nur `#dlg`, `#msg`, Platzhalter, `sync`; lädt ohne Fehler; Vorlage ohne `#dlg` → rot | `checkWerte`, Gegenprobe | – |
| E-5 | 4 | Gruppe A: 8 Bausteine mit festen Beispielwerten | grün | `bausteine-pruefseite` Teil `werte` | – |
| E-6 | 4, 6 | je Baustein der Gruppe A ein eingeschleuster Fehler (8) | jeder rot | `--gegenprobe pruefseite` | – |
| E-7 | 7 | `ablaufMessung` auf der Prüfseite (3 Ansichten, voll und leer) | grün wie heute in der App | Teil `messung` | – |
| E-8 | 7 | `ablaufTitelBlase` (Text 53, iPhone hoch; L-5 in 4 Ansichten) | grün | Teil `titel-blase` | – |
| E-9 | 7 | `ablaufTitelOben` (6 Durchläufe, 2 mit ‚Bewegung reduzieren‘, Safari-Klick) | grün | Teil `titel-oben` | – |
| E-10 | 7 | `ablaufSchichtOben` mit den 3 Messdateien | grün | Teil `schicht-oben` | – |
| E-11 | 7 | `ablaufGrossanzeige` (Text 28, 53, 17; 4 Ansichten) | grün | Teil `grossanzeige` | – |
| E-12 | 9 | je Ablauf der eingeschleuste Fehler | rot auf der Prüfseite **und** in der heutigen Prüfung der App (Nachweis-Tabelle) | `--gegenprobe pruefseite`, Einzellauf der alten Datei | – |
| E-13 | 10 | Zusammenspiel in der App und Reiselogik (L-3 Datum, L-8, nichts gelöscht, F10) | grün; dieselben Fehler rot | `ablauf-bausteine` (bei Antwort a) | – |
| E-14 | 5, 8 | Teile laufen parallel; Ausgabe im Ordner der App | nichts unter `fassung/…/tests/out/`, `checkFassungen` grün | `lauf.mjs`, `version-regeln` | – |
| E-15 | 6 | neue Gegenprobe-Art in `lauf.mjs` | `lauf-selbsttest` grün | `lauf-selbsttest` | – |
| E-16 | Texte | Wortlaut 14, 17, R-1.14, README | `doku-regeln` grün (`checkCatalog`, `checkCollab`) | `doku-regeln` | rot |
| E-17 | alles | voller Prüflauf in `los` | grün | `los` (voll) | – |

## Fragen

1. **Prüfseite:** a) die angeglichene Vorlage selbst, in der Fassung (Empfohlen – kein zweites Gerüst, das auseinanderläuft, U-32; Daten über
   `localStorage` wie in der App, keine Prüf-Haken in der Vorlage) · b) eigene feste Datei `tests/pruefseite.html`, abgeleitet aus der Vorlage, mit einem
   Abgleich ‚Gerüst gleich‘ (Vorschlag des Hilfsagenten – nichts an `fassungQuellen`, dafür eine zweite Seite zum Pflegen).
2. **Die 5 Prüfdateien der App nach dem Umzug:** a) fallen weg, dafür `ablauf-bausteine` mit kurzer Zusammenspiel-Prüfung und Reiselogik (Empfohlen –
   hält C-57 Nr. 1 ab, spart den größten Teil der 14,7 min) · b) fallen ganz weg wie im Plan, die Reiselogik wandert in bestehende Prüfungen · c) bleiben
   zusätzlich (doppelt, keine Ersparnis).
3. **Umfang, Wortlaut und Testfall-Liste so?** Ja/Nein.
