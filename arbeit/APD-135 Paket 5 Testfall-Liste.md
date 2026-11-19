# APD-135 Paket 5 – Testfall-Liste (0 Nr. 1)

**Stand 19.11.2026** · Sitzung Reiselogbuch 0135 · Wortlaut: `arbeit/APD-135 Paket 5 Wortlaut.md` (bestätigt 19.11.2026, Sitzung 0134)

Paket 5 ändert die Prüfwerkzeuge (`tests/lauf.mjs`, `tests/doku.mjs`, `tests/pruefe.mjs`, `tests/ablauf.mjs`, `werkzeug/veroeffentlichen.mjs`), fünf
Prüfungen des Reiselogbuchs und die Texte nach dem Wortlaut. Die App, `ui.js` und `design.css` ändern sich nicht. Gerät × Lage × Darstellung × Handlung trifft
deshalb am Gerät nur die Versionszeile (P-113/0); alle übrigen Fälle sind automatisch. Die Nummern Z-n gelten nur in dieser Datei (außerhalb: APD-135/Z-n).

## Umfang und Bau

- **Version (vorläufig):** AppDesign **4.63.0** (Designrichtlinie 4.63.0, Zusammenarbeit 3.15.0 → 3.16.0, neue Fassung `fassung/4.63.0/`) · Reiselogbuch
  **3.57.6** (Fassung 4.63.0 und Prüfungen; `index.html` ohne Änderung an Bedienung und Aussehen).
- **Prüfstufe: voll**, dazu ein Vergleichslauf `--alle` für ‚lang zuerst‘ (APD-135/J-26).

## Testfälle (automatisch)

| Nr. | Punkt | Fall | Erwartet | Prüfung | gegen heute (4.62.0 / 3.57.5) |
|---|---|---|---|---|---|
| Z-1 | C-44 | Vorlauf: `doku-regeln` rot | sofortiger Abbruch vor den übrigen Läufen, Rückgabewert 1, kein weiterer Lauf gestartet, Ausgabe des roten Laufs steht da | `lauf-selbsttest.mjs` (Schein-`doku-regeln` rot) | rot (heute laufen die übrigen weiter) |
| Z-2 | C-44 | Vorlauf: `version-regeln` rot (je Browser) | wie Z-1 | `lauf-selbsttest.mjs` | rot |
| Z-3 | C-44, C-37 | Vorlauf grün, zwei Browser | erst `doku-regeln` (nur im ersten Browser) und `version-regeln` (je Browser), dann die übrigen; `doku-regeln` genau einmal | `lauf-selbsttest.mjs` | rot (heute `doku-regeln` zweimal, nicht zuerst) |
| Z-4 | C-44 | Gegenprobe (`--gegenprobe …`) | kein Abbruch durch den Vorlauf – die Gegenprobe läuft ganz durch; `--gegenprobe schema` bleibt rot (jeder Fall) | `lauf-selbsttest.mjs`; `node tests/alle.mjs --gegenprobe schema` | grün (bleibt) |
| Z-5 | C-43 | Reihenfolge mit gemessener Dauer, ein Platz | `langsam, mittel, schnell` (die längsten zuerst), nie gemessene vorne | `lauf-selbsttest.mjs` (APD-5/B-1 umgedreht) | rot (heute `schnell, mittel, langsam`) |
| Z-6 | C-68 | Lauf rot unter Last, allein grün | die Ausgabe des roten Laufs steht in `tests/out/wackelt-<Name>[-<Teil>]-<Browser>.txt`, die Schlusszeile nennt die Datei | `lauf-selbsttest.mjs` (Schein-Wackler, auch mit Teil) | rot (heute geht die Ausgabe verloren) |
| Z-7 | C-29 | `--abdeckung` mit geteilten Läufen und `hig` | je Teil eine eigene Datei (`abdeckung-<Name>~<Teil>-<Browser>.json`), die Ausgabe nennt `ablauf-fenster` mit allen drei Teilen und `hig` mit seinen Ansichten | `lauf-selbsttest.mjs` (Schein-Läufe mit Teilen); echter Lauf `--nur ablauf-fenster,hig --browser chromium --abdeckung` | rot (heute überschreibt der letzte Teil, `hig` fehlt) |
| Z-8 | C-6 | Regelnummer nur noch im Kommentar einer Prüfdatei | `doku-regeln` rot: ‚Katalog R-… hat keine Meldung in einer Prüfdatei des Prüflaufs‘ | Gegenprobe `--gegenprobe schema` Fall APD-135/Z-8 | rot erwartet; heute grün (Kommentar genügt) |
| Z-9 | C-6 | Regelnummer nur in einer Prüfdatei, die nicht im Prüflauf läuft (z. B. `pixelvergleich.mjs`) | `doku-regeln` rot | Gegenprobe `--gegenprobe schema` Fall APD-135/Z-9 | rot erwartet; heute grün |
| Z-10 | C-6 | heutiger Stand: jede R-Regel | steht in einer Meldung einer Prüfdatei des Prüflaufs (R-7.9 neu in `ablauf.mjs`) | `doku-regeln` | grün nach dem Bau |
| Z-11 | C-47 | `los` mit geändertem `tests/lauf.mjs` | startet `lauf-selbsttest` vor den Prüfungen; rot → Abbruch, nichts veröffentlicht | `veroeffentlichen-selbsttest.mjs` (Schein-Selbsttest) | rot (heute startet `los` ihn nie) |
| Z-12 | C-47 | `los` mit geändertem Veröffentlichungs-Skript bzw. `pruefstufe.mjs` | startet `veroeffentlichen-selbsttest`; rot → Abbruch | `veroeffentlichen-selbsttest.mjs` | rot |
| Z-13 | C-47 | `los` ohne Änderung an den Werkzeugen | kein Selbsttest, auch `messung` nicht (nur bei Änderung an `werkzeug/messung.mjs` oder `tests/messung.mjs`) | `veroeffentlichen-selbsttest.mjs` | rot (heute läuft `messung` immer) |
| Z-14 | W-54 (J-24) | die vier Abläufe `ablauf-tastatur-still`, `ablauf-abspielen`, `ablauf-suche-iphone`, `ablauf-texte-ablaeufe` | prüfen nach jedem Schritt die Grundregeln: `--gegenprobe grundregeln --nur …` wird in allen vier rot; Laufzeit vorher und nachher gemessen | `node tests/alle.mjs --gegenprobe grundregeln --nur …` | grün = rot im Sinn der Gegenprobe (heute prüfen sie keine Grundregeln) |
| Z-15 | R-7.9 | Start mit ‚Nur erfasste Tage‘ und neu: Filter setzen, ein anderes Reiselogbuch öffnen | der Filter steht auf ‚Alle Tage‘, Meldung mit ‚R-7.9‘ | `ablauf-gesamt.mjs` – `checkFilterAlle` (`ablauf.mjs`) | grün (App erfüllt es) |
| Z-16 | R-7.9 | Gegenprobe: Prüfkopie der App ohne `db.settings.hideEmpty = false` in `showTrip` | `checkFilterAlle` rot mit ‚R-7.9‘ | Prüfkopie (`PRUEF_GEGENPROBE=filter`) | rot erwartet |
| Z-17 | C-31 | `ablauf-seitenleiste-position (Bedienungshilfen)` öffnet die Seiten mit `t.seite` | Bedienungshilfen wirken (Kontrast, ‚Bewegung reduzieren‘, Bewegungswächter): `--gegenprobe` mit ‚verschiebung‘ für diese Prüfung wird rot | `PRUEF_BEDIENUNG=beide PRUEF_GEGENPROBE=bedienung:verschiebung node tests/ablauf-seitenleiste-position.mjs` | grün = wirkungslos (heute) |
| Z-18 | Texte | Zusammenarbeit 0 Nr. 2 und 0 Nr. 9, Designrichtlinie 14, 15.3, 17 Kopf, R-5.1, R-7.9, G-Tabelle, beide `tests/README.md`, Kopfkommentare | alter Text steht nicht mehr da, neuer genau einmal; R-7.9 hat eine Zeile im Katalog, G-8 und G-16 stehen bei ‚Vergeben‘ | `doku-regeln` (`checkCatalog`, `checkCollab`, `checkSchema`); Handprüfung mit `grep` | rot (alte Texte da) |
| Z-19 | alles | voller Prüflauf (Chromium und WebKit, alle Ansichten) | grün | `… los` (voll) | – |
| Z-20 | C-43 | Vergleichslauf `node tests/alle.mjs --alle` mit ‚lang zuerst‘ | gleiche Zahl Wackler wie zuletzt, kein Lauf über 450 s | Vergleichslauf (Ausgabe und `dauer.json`) | – |

## Testfälle (User) – Usertest P-113

**P-113/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.6 · erstellt am … · AppDesign 4.63.0‘.

## Ergebnisse (wird beim Bau ergänzt)

