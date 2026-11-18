# APD-135 Paket 2 – Wortlaut zur Bestätigung

**Stand 18.11.2026** · Sitzung 0132 · Quelle: `arbeit/APD-135 Konsolidierung 3 Befund und Plan.md` (Abschnitt 1: W-6, W-16, W-19, W-29, W-30;
Abschnitt 5: Paket 2; Abschnitt 7: J-13, J-33, J-34, J-35, ‚Wortlaut 1+3‘: W-19 mit Paket 2) und `arbeit/0123 Entscheidungen APD-135.md`.
Abgeglichen mit dem heutigen Stand: Import-Repo c747fee, Reiselogbuch 3.57.4 (`index.html`), AppDesign 4.61.0 (`v4/ui.js`).

> **Hinweis zum Namen:** In `UEBERGABE.md` heißt Paket 2 ‚Lesekosten und Ablage‘ – das war der Name im ersten Vorschlag (0120). Im Befund (0122),
> nach dem du entschieden hast, ist **Paket 2 = Import** (ReiseLogBuch-Import 1.4.0), dazu W-19 aus der AppDesign-`CLAUDE.md`. Die Lesekosten
> (Versionsgeschichten auslagern, W-31) sind mit Paket 3 schon gebaut (4.61.0).

## Was sich ändert

| Datei | Version | Punkte |
|---|---|---|
| Import `CLAUDE.md` | 1.1.0 → **1.2.0** | APD-135/W-16 (Import-Teil), W-29 |
| Import `PROMPT.md` | 1.2.1 → **1.4.0** | W-30 mit J-13, J-33, J-35 |
| Import `werkzeug/pruefen.mjs` | – | J-34 (ohne `--zone` Abbruch), `leseFormat` liest `next.(\w+) =`, Selbsttest mit Fall `km`/`price` |
| Import `README.md` | **1.4.0** | Versionsgeschichte, ‚Geprüft mit‘ |
| AppDesign-`CLAUDE.md` | 2.13.0 → **2.14.0** | W-19 |

**Entfällt vorerst:** der Werkzeug-Teil von W-6 (`BACKLOG.md` in `ERLAUBT_IM_REPO`) – erst beim ersten RLI-Thema; es gibt noch keins. Der Satz in 0 Nr. 24 steht
schon (4.61.0).

---

## 1. Import-`CLAUDE.md`

**W-16 – Startfrage (Z. 7–9)**
- alt: ‚- **Startfrage (Zusammenarbeit 0 Nr. 19):** Beginnt die Sitzung ohne konkreten Auftrag, zuerst das Auswahlfenster ‚Was möchtest du als Nächstes tun?‘ –
  hier mit **‚Reiselogbücher konvertieren‘**, dazu je weiterem angehängtem Repo eine Möglichkeit (Version, Backlog-Spitze) und ‚Ich schreibe im Chat‘.‘
- neu: ‚- **Startfrage** nach Zusammenarbeit 0 Nr. 19 (dort steht schon ‚Reiselogbücher konvertieren‘).‘

**W-29 – Verweis auf die Zusammenarbeit (Z. 11–13)**
- alt: ‚- Regeln der Zusammenarbeit liegen in g811141a/AppDesign (`README - Zusammenarbeit allgemein.md`: Arbeitsmodell Abschnitt 0, per du Abschnitt 1, Zeit und
  Token am Ende jeder Antwort 2.2) und gelten auch hier; die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.‘
- neu: ‚- Regeln der Zusammenarbeit liegen in g811141a/AppDesign (`README - Zusammenarbeit allgemein.md`, zu Beginn die ganze Datei – 0 Nr. 15, zuerst der Kasten
  ‚Immer‘ und ‚Jede Antwort‘) und gelten auch hier; die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.‘

**W-29 – Repos dazuholen (Technisch, Z. 25–26)**
- alt: ‚(die beiden Apps mit `add_repo` lesend dazuholen, falls nicht angehängt)‘
- neu: ‚(die beiden Apps dazuholen wie in der AppDesign-`CLAUDE.md` unter ‚Arbeitsumgebung‘, falls nicht angehängt; bei einer Konvertierung werden sie nur
  gelesen – I-2)‘

**W-29 – Prüfen (Technisch, Z. 27–28)**
- alt: ‚- Prüfen: im Ordner `werkzeug` einmalig `npm install`, dann im Repo-Ordner `node werkzeug/pruefen.mjs <Datei>` (eine Import-Datei) bzw.
  `node werkzeug/pruefen.mjs --selbsttest` (nach jeder Änderung am Werkzeug).‘
- neu: ‚- Prüfen: im Ordner `werkzeug` einmalig `npm install`, dann im Repo-Ordner `node werkzeug/pruefen.mjs <Datei> --zone <Zeitzone>` (eine Import-Datei,
  Zeitzone nach I-13; ohne `--zone` bricht das Werkzeug ab) bzw. `node werkzeug/pruefen.mjs --selbsttest` (nach jeder Änderung am Werkzeug).‘
  *(Ergänzung gegenüber dem Befund: ‚ohne `--zone` bricht das Werkzeug ab‘ – folgt aus J-34.)*

## 2. Import-`PROMPT.md`

**Versionszeile (Z. 3)**
- alt: ‚**Version 1.2.1** · Stand 16.10.2026 · …‘
- neu: ‚**Version 1.4.0** · Stand 18.11.2026 · …‘ (Rest gleich; keine eigene Versionsgeschichte im `PROMPT.md` – J-35, sie bleibt in der README nach I-1)

**Herkunft (Z. 8)**
- alt: ‚Herkunft der Regeln: AppDesign `arbeit/RLB-5 Anforderungen.md` (I-1 bis I-15, RLB-5/E-1 bis RLB-5/E-11), `arbeit/RLB-5 Testfall-Liste.md` (RLB-5/F-1 bis F-22).‘
- neu: ‚… `arbeit/RLB-5 Testfall-Liste.md` (RLB-5/F-1 bis F-22), `arbeit/RLB-5 Brainstorming.md` (RLB-5/J-n).‘

**Zusammenarbeit (Z. 9–10)**
- alt: ‚Zusammenarbeit allgemein (AppDesign) gilt weiter: per du, Auswahlfenster mit ‚Ich schreibe im Chat‘, Zeit und Token am Ende jeder Antwort.‘
- neu: ‚Zusammenarbeit allgemein (AppDesign) gilt weiter, zuerst der Kasten ‚Immer‘ und ‚Jede Antwort‘ (0).‘

**Format (Z. 62)**
- alt: ‚Stand bei Version 1.0.0 (Reiselogbuch 3.15.1):‘
- neu: ‚Stand bei Reiselogbuch 3.57.4:‘ *(Befund: 3.56.3 – heute ist 3.57.4 veröffentlicht)*

**Format – JSON-Muster (Z. 70 und 72–73)** *(Ergänzung gegenüber dem Befund, damit Muster und neuer Absatz zusammenpassen)*
- alt: ‚"quarterList": true|false, "foodColumn": true|false, "moodColumn": true|false, "quarterColumn": true|false,‘
- neu: ‚"quarterList": true|false, "foodColumn": true|false, "moodColumn": true|false, "quarterColumn": true|false, "kmColumn": true|false, "priceOn": true|false,‘
- alt: ‚"sameQuarter": false, "quarter": "Hotelname", "place": "Ort, Land", "noMap": false } },‘
- neu: ‚"sameQuarter": false, "quarter": "Hotelname", "place": "Ort, Land", "noMap": false, "km": 12.5, "price": 89 } },‘

**Neuer Absatz nach den Tages-Regeln (nach Z. 97, Quartier)**
- neu: ‚- **Kilometer und Quartierpreis (RLB-5/E-4):** gegangene Kilometer je Tag in `km` (Zahl mit höchstens einer Nachkommastelle, 0,1 bis 99,9), dann in der Reise
  `kmColumn: true`; der Preis einer Unterkunft in Euro in `price` am **ersten Tag** des Aufenthalts, dann in der Reise `priceOn: true`. Leere Werte weglassen.‘

**Zuordnung (Z. 120) und zwei neue Zeilen davor**
- alt: ‚| **Alles ohne passendes Feld** (Kilometer, Tageskosten, Uhrzeiten, Links, Bilder) | **immer Kachelfrage**, wohin (RLB-5/E-4) |‘
- neu:
  ‚| gegangene Kilometer | `km` (Reise: `kmColumn: true`) |‘
  ‚| Preis der Unterkunft | `price` am ersten Tag des Aufenthalts (Reise: `priceOn: true`) |‘
  ‚| **Alles ohne passendes Feld** (Tageskosten, Uhrzeiten, Links, Bilder) | **immer Kachelfrage**, wohin (RLB-5/E-4) |‘

**Rückfragen (Abschnitt 6, Z. 136–138)** – J-33
- alt: ‚- Auswahlfenster mit bis zu 4 Fragen, je 2–4 Möglichkeiten, Empfehlung zuerst mit ‚(Empfohlen)‘, immer ‚Ich schreibe im Chat‘. Mehr als 4 Fragen → mehrere
  Fenster nacheinander. Muss der Nutzer vorher etwas lesen (Ausschnitt der Unterlage), kommt es als Datei vor dem Fenster.‘
- neu: ‚- Auswahlfenster nach Zusammenarbeit 2.1 (bis zu 4 Fragen, Empfehlung zuerst mit ‚(Empfohlen)‘, immer ‚Ich schreibe im Chat‘); mehr als 4 offene Fragen:
  die wichtigsten 4 zuerst, die übrigen im nächsten Fenster, nachdem das vorige beantwortet ist. Muss der Nutzer vorher etwas lesen (Ausschnitt der Unterlage),
  steht es vor dem Fenster in der Datei und im Chat (Kasten Punkt 4).‘

**Testfälle für den Nutzer (Abschnitt 8, Schritt 4, Z. 164–165)** *(an den heutigen Abgleich angepasst – der Befund schrieb ‚der Satz nennt die neuen
Reiselogbücher‘, der Satz in `ui.js` 4.61.0 lautet aber anders)*
- alt: ‚4. Ergebnisfenster: die neuen Reisen stehen unter ‚Hinzugefügt‘. Steht dort ‚bleibt gelöscht‘ (frühere Fassung gelöscht, K-12), Claude Bescheid geben –
  Claude erstellt die Datei neu.‘
- neu: ‚4. Ergebnis: ‚Abgeglichen mit dem Backup … Auf diesem iPad hat sich etwas geändert – Einzelheiten im Abgleichbericht.‘ – ‚Abgleichbericht anzeigen‘ zeigt die
  neuen Reisen mit ‚neu angelegt‘. Steht unter den Hinweisen ‚Auf diesem iPad gelöscht, im Backup … noch vorhanden:‘ mit der Reise (frühere Fassung gelöscht,
  K-12), Claude Bescheid geben – Claude erstellt die Datei neu.‘

## 3. Import-Werkzeug `pruefen.mjs` (Code, kein Regeltext)

- J-34: ohne `--zone` **Abbruch** mit Meldung ‚--zone <Zeitzone> fehlt (I-13: nie die Zeitzone raten)‘ statt Vorgabe Europe/Vienna; Kommentar Z. 23 entsprechend.
- `leseFormat` liest die Tagesfelder auch aus `next.(\w+) =` (heute stehen `price` und `km` so in `index.html`, Z. 1687–1688).
- Selbsttest: neuer Fall mit `km` und `price` (muss grün sein) und Gegenprobe (`km` 120 → rot).

## 4. Import-`README.md`

- Versionsgeschichte neu oben: ‚| 1.4.0 | 18.11.2026 | AppDesign APD-135 Paket 2: `CLAUDE.md` 1.2.0 (Startfrage nach 0 Nr. 19, Verweise, `--zone`), `PROMPT.md` 1.4.0
  (Felder `km`/`price`, Fenster nach 2.1, Abgleich-Text wie 4.61.0, Format Stand 3.57.4), `pruefen.mjs` ohne `--zone` Abbruch, liest `next.x =`, Selbsttest
  `km`/`price` |‘
- ‚Geprüft mit‘: Reiselogbuch **3.57.4**, AppDesign **4.61.0** (bisher 3.34.0 / 4.36.0).

## 5. AppDesign-`CLAUDE.md` – W-19 (Arbeitsumgebung)

- alt: ‚- **ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz) – Originale, Ergebnisse und Protokolle nur im Notizordner der Sitzung. Im Ordner
  `werkzeug` einmal `npm install`, dann `node werkzeug/pruefen.mjs <Datei> --zone <Zeitzone>`.‘
- neu: ‚- **ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz); Konvertieren und Prüfen nach dessen `CLAUDE.md` und `PROMPT.md`.‘
- Der Satz unter ‚Hinweise zur Prüfumgebung‘ zu `npm install` im Ordner `werkzeug` (`git checkout -- werkzeug/package-lock.json`) bleibt.
- Versionszeile 2.14.0, Zeile in `CLAUDE Versionsgeschichte.md`.

---

## Prüfung und Bau (nach deinem ‚Ja‘ zum Wortlaut)

1. Testfall-Liste `arbeit/APD-135 Paket 2 Testfall-Liste.md`.
2. Selbsttest `pruefen.mjs --selbsttest` mit dem neuen Fall – zuerst **rot** gegen den heutigen Stand (Fall `km`/`price` scheitert), dann grün.
3. `doku-regeln` einmal (liest das Import-Repo mit).
4. Bau-Frage: das Import-Repo hat keinen App-Prüflauf; W-19 ändert die AppDesign-`CLAUDE.md` – ob dafür eine AppDesign-Version nötig ist und welche Stufe,
   lasse ich vorher `veroeffentlichen.mjs stufe` vorschlagen und nenne es in der Bau-Frage. Hinweis aus L-24: bei Änderungen an `index.html`-Mustern oder
   `ui.js`-Klassen einmal `pruefen.mjs --selbsttest`.
