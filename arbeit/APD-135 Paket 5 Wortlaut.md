# APD-135 Paket 5 – Wortlaut zur Bestätigung

**Stand 19.11.2026** · Sitzung 0134 · Quelle: `arbeit/APD-135 Konsolidierung 3 Befund und Plan.md` (Abschnitt 1: W-48, W-54; Abschnitt 5: Paket 5;
Abschnitt 7: J-20, J-24, J-26, J-29, J-30), `arbeit/APD-135 Befund C Prüfungen.md` (C-6, C-11, C-12, C-29, C-31, C-33, C-37, C-41, C-43, C-44, C-47, C-68)
und `arbeit/APD-135 Befund L Ablage Backlog Code.md` (L-31). Abgeglichen mit dem heutigen Stand: AppDesign 4.62.0 (`main` ee0d764), Reiselogbuch 3.57.5
(`main` 9758fb3).

## Was sich ändert

Vorläufige Versionen (die Bau-Frage setzt sie): **AppDesign 4.63.0** (Designrichtlinie 4.63.0, Zusammenarbeit 3.15.0 → **3.16.0**) · **Reiselogbuch 3.57.6**
(nur die feste Fassung 4.63.0 und die Prüfungen, `index.html` ohne Änderung an Bedienung und Aussehen). Prüfstufe **voll**, dazu ein Vergleichslauf `--alle`
für ‚lang zuerst‘ (J-26).

| Datei | Punkte |
|---|---|
| Zusammenarbeit allgemein | 0 Nr. 2 (Vorlauf C-44, lang zuerst C-43, Wackler-Ausgabe C-68, `doku-regeln` einmal C-37), 0 Nr. 9 (Selbsttests in `los`, C-47) |
| Designrichtlinie allgemein | 14 (Messungen nie umbenennen, J-30/L-31), 15.3 (Filter, nur noch Verweis), 17 Kopf (`checkCatalog`, C-6), R-5.1 (G-8, W-48), neu **R-7.9** (G-16, W-48), G-Tabelle |
| Doku ohne Regel | AppDesign `tests/README.md`, Reiselogbuch `tests/README.md`, Kopfkommentare `tests/lauf.mjs` und App-`tests/alle.mjs` (C-41) |
| Code | `tests/lauf.mjs`, `tests/doku.mjs`, `tests/pruefe.mjs`, `tests/ablauf.mjs`, `werkzeug/veroeffentlichen.mjs`; App-Prüfungen (Abschnitt 5) |

---

## 1. Zusammenarbeit allgemein

**0 Nr. 2 – Ablauf des Prüflaufs (Z. 74–76; C-44, C-43, C-68, C-37)**
- alt: ‚`node tests/alle.mjs` in der App (Werkzeug `tests/lauf.mjs`: parallel, schnellste zuerst, Abbruch ab dem dritten roten Lauf, jeder rote Lauf am
  Ende einmal allein – grün heißt ‚wackelt‘ und wird gemeldet, Gegenprobe `--gegenprobe`).‘
- neu: ‚`node tests/alle.mjs` in der App (Werkzeug `tests/lauf.mjs`: zuerst der Vorlauf `doku-regeln` (einmal) und `version-regeln` – rot bricht sofort ab;
  dann parallel, die längsten zuerst, Abbruch ab dem dritten roten Lauf, jeder rote Lauf am Ende einmal allein – grün heißt ‚wackelt‘, wird gemeldet und
  seine Ausgabe bleibt in `tests/out/wackelt-<Name>-<Browser>.txt`; Gegenprobe `--gegenprobe`).‘

**0 Nr. 9 – Selbsttests in `los` (Z. 134–135; C-47)**
- alt: ‚`los` prüft, veröffentlicht **erst AppDesign, dann die App** und wartet auf Pages.‘
- neu: ‚`los` prüft – vorher die Selbsttests der Werkzeuge, die sich seit `main` geändert haben (`lauf.mjs`, Veröffentlichungs-Skript, `messung.mjs`) –,
  veröffentlicht **erst AppDesign, dann die App** und wartet auf Pages.‘

## 2. Designrichtlinie allgemein

**14 – Messungen (Z. 600–601; J-30, L-31)**
- alt: ‚`tests/` (Prüfungen des Regelkatalogs, Messdateien in `tests/messungen/` zum Abspielen, 15.21)‘
- neu: ‚`tests/` (Prüfungen des Regelkatalogs, Messdateien in `tests/messungen/` zum Abspielen, 15.21 – nie umbenennen oder löschen: die Prüfungen jeder
  App lesen sie aus dem Arbeitsstand, nicht aus ihrer Fassung)‘

**15.3 – Filter (Z. 715; W-48, Grundsatz W-49: der Abschnitt nennt nur die Nummer)**
- alt: ‚- **Filter** (z. B. „Alle / Nur erfasste“): beim Öffnen eines Eintrags und beim Start immer auf „Alle“.‘
- neu: ‚- **Filter** (z. B. „Alle / Nur erfasste“, R-7.9).‘

**17 Kopf – `checkCatalog` (Z. 1233; C-6)**
- alt: ‚`checkCatalog` (`doku.mjs`) prüft, dass jede Regel eine Prüfung hat und keine alte Nummer mehr verwendet wird.‘
- neu: ‚`checkCatalog` (`doku.mjs`) prüft, dass jede Regelnummer in einer Meldung (Zeichenkette, nicht nur im Kommentar) einer Prüfdatei steht, die im
  Prüflauf läuft, und keine alte Nummer mehr verwendet wird.‘

**R-5.1 – G-8 geht auf (W-48, J-20)** – die App-Prüfungen melden das Tippen schon heute als R-5.1 (`ablauf-gesamt.mjs` Z. 183, 185; `ablauf-preis-km.mjs` Z. 198)
- alt (Regel): ‚… Datumsfelder so breit wie das Datum mit Kalender-Icon; Betragsfelder rechtsbündig, ‚4.850,00 €‘‘ · Prüfung ‚hig.mjs‘
- neu (Regel): ‚… Datumsfelder so breit wie das Datum mit Kalender-Icon; Betragsfelder rechtsbündig, ‚4.850,00 €‘, der Tausenderpunkt schon beim Tippen,
  fehlende Nachkommastellen ergänzt das Feld beim Verlassen (‚,00‘)‘ · Prüfung ‚hig.mjs; Tippen und Verlassen in den Abläufen der App (Reiselogbuch
  `ablauf-gesamt.mjs`, `ablauf-preis-km.mjs`) – bis die AD-Bean `decimal` (APD-136) es allgemein prüft‘

**Neu R-7.9 – G-16 wird R-Regel (W-48, J-20)**
- neu: ‚| R-7.9 | **Filter auf ‚Alle‘:** ein Filter der Liste (z. B. ‚Alle / Nur erfasste‘) steht beim Start und beim Öffnen eines Eintrags immer auf
  ‚Alle‘ | ablauf.mjs – `checkFilterAlle` (die App nennt Filter setzen, Eintrag öffnen und ‚steht auf Alle‘) | – | 15.3 |‘

**G-Tabelle (Z. 1380, 1386, 1390)**
- alt: die Zeilen ‚| G-8 | Beträge: ‚,00‘ ergänzen, Tausenderpunkt beim Tippen | 8 | Abläufe der App |‘ und ‚| G-16 | Filter beim Öffnen und beim Start auf
  ‚Alle‘ | 15.3 | Abläufe der App |‘ · ‚Vergeben, nicht neu verwenden: G-1, G-2, G-4, G-5, G-7, G-12, G-13, G-17 (in R-Regeln aufgegangen, CHANGELOG 4.51.0 und 4.52.0).‘
- neu: beide Zeilen gestrichen · ‚Vergeben, nicht neu verwenden: G-1, G-2, G-4, G-5, G-7, G-8, G-12, G-13, G-16, G-17 (in R-Regeln aufgegangen, CHANGELOG 4.51.0,
  4.52.0 und 4.63.0).‘

## 3. Doku ohne Regel (zur Kenntnis)

- AppDesign `tests/README.md` Z. 80–82 und Reiselogbuch `tests/README.md` Z. 8–10: ‚die schnellsten zuerst‘ → ‚nach dem Vorlauf (`doku-regeln`, `version-regeln`,
  rot bricht sofort ab) die längsten zuerst‘; dazu ‚die Ausgabe eines Wacklers bleibt in `tests/out/wackelt-<Name>-<Browser>.txt`‘.
- Kopfkommentare (C-41): `tests/lauf.mjs` Z. 1–3 und App-`tests/alle.mjs` Z. 1–3 sagen noch ‚die schnellsten zuerst‘ – an den Stand wie oben.

## 4. Code in AppDesign (kein Regeltext)

| Punkt | Änderung | Gegenprobe / Nachweis |
|---|---|---|
| C-44 Vorlauf | `lauf.mjs`: `doku-regeln` und `version-regeln` vor den Browser-Läufen, rot → sofortiger Abbruch | `--gegenprobe schema` bleibt rot; Selbsttest mit rotem Vorlauf |
| C-43 lang zuerst | `lauf.mjs` Z. 74: nach `dauer.json` absteigend, nie gemessene vorne | Vergleichslauf `--alle`: gleiche Zahl Wackler, kein Lauf über 450 s |
| C-68 Wackler-Ausgabe | `lauf.mjs` Z. 120: Ausgabe des roten Laufs nach `tests/out/wackelt-<Name>-<Browser>.txt`, Schlusszeile nennt die Datei | Selbsttest mit Schein-Wackler |
| C-37 | `doku-regeln` nur im ersten Browser | `--gegenprobe schema` bleibt rot |
| C-6 | `checkCatalog` zählt Regelnummern nur in Zeichenketten der Prüfdateien aus `alle.mjs` | Nummer nur im Kommentar → `doku-regeln` rot |
| C-29 | `--abdeckung`: Teil im Dateinamen, `hig` meldet seine Ansichten | Abdeckung von `ablauf-fenster` zeigt alle drei Teile |
| C-47 | `los` startet `lauf-selbsttest` bzw. `veroeffentlichen-selbsttest`, wenn sich ihr Werkzeug seit `origin/main` geändert hat; `messung` nur bei Änderung an `messung.mjs` | Selbsttest des Veröffentlichungs-Skripts |
| W-54 (J-24) | `hig: createCheck()` in `ablauf-tastatur-still`, `ablauf-abspielen`, `ablauf-suche-iphone`, `ablauf-texte-ablaeufe` (Laufzeit vorher messen) | `--gegenprobe grundregeln`: die vier werden rot |
| R-7.9 | neu `checkFilterAlle` in `ablauf.mjs` | Prüfkopie ohne `db.settings.hideEmpty = false` in `showTrip` → rot mit ‚R-7.9‘ |

## 5. Prüfungen im Reiselogbuch

- **R-7.9:** `ablauf-gesamt.mjs` ruft `checkFilterAlle` – Start mit ‚Nur erfasste Tage‘ (heute Z. 179–180, ohne Regelnummer) und neu: Filter setzen, ein
  anderes Reiselogbuch öffnen → ‚Alle Tage‘.
- **C-31 – `ablauf-seitenleiste-position (Bedienungshilfen)` ist wirkungslos** (öffnet Seiten mit `b.newPage`, ohne Bedienungshilfen): **Vorschlag** Seiten mit
  `t.seite` öffnen, dann prüft der Teil, was er verspricht (Gegenprobe `--gegenprobe bedienung` mit ‚verschiebung‘ für diese Prüfung → rot). Alternative:
  den Teil streichen (Risiko keins, er ist heute ein zweiter Grundlauf).
- **C-33 – `ablauf-fenster` in 3 Varianten** (6 Läufe, zusammen 0,7 min): **Vorschlag** so lassen – hell + Text 53 prüft sonst keine Prüfung, die Ersparnis
  wären Sekunden. Alternative: Varianten streichen.

## 6. Bleibt unverändert

- J-12 (b) – nicht gewählt (J-12 = (a), in 4.61.0 gebaut).
- J-29: nur C-68 jetzt; die Ursache von APD-134 nach dem nächsten Wackler (mit der dann gesicherten Ausgabe).
