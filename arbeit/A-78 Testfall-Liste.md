# A-78 (künftig APD-78) Nummernschema – Klärpunkte und Testfall-Liste des Umbaus

**Stand 25.10.2026** · Sitzung Reiselogbuch 0045 · **geklärt: K1–K9 alle wie vorgeschlagen (Nutzer 25.10.2026)** · Grundlage: Entscheidungen D1–D9 in
`arbeit/A-78 Recherche Präfixe.md` (Abschnitt 6) und der Entwurf der Präfix-Tabelle (Abschnitt 7). Gebaut wird erst nach einem
Ja (Zusammenarbeit 0 Nr. 21), voraussichtlich in der nächsten Sitzung.

---

## 1. Umfang

| Wird umgebaut (rückwirkend, D3) | Bleibt unverändert |
|---|---|
| AppDesign: `BACKLOG.md`, `CHANGELOG.md`, `UEBERGABE.md`, `VERLAUF.md`, `CLAUDE.md`, `README.md`, Designrichtlinie, Zusammenarbeit, `arbeit/` (84 Dateien, Namen und Inhalt), `v4/` (Kommentare), `tests/`, `werkzeug/` | `fassung/4.14.0/` … `fassung/4.35.0/` (fest, R-10.3) |
| Reiselogbuch: `BACKLOG.md`, `CHANGELOG.md`, `PROMPT.md`, `CLAUDE.md`, `README.md`, Designrichtlinie Reiselogbuch, `index.html` und `sw.js` (Kommentare), `tests/` | Git-Commits und ihre Texte |
| ReiseLogBuch-Import: `README.md`, `CLAUDE.md`, `PROMPT.md`, `ERKENNTNISSE.md`, `werkzeug/` | Sitzungsnamen (‚Reiselogbuch 0045‘) |

Die Übersetzung für alles, was bleibt, steht in `ZUORDNUNG.md` (AppDesign, neu). Umbenannt wird mit einem Skript
(`werkzeug/umbenennen.mjs`, neu) nach dieser Tabelle, nicht von Hand.

Gezählte Stellen (25.10.2026, ohne `fassung/`): A- 1577, T- 735, E- 351, P- 831 (Begriff), F- 798, R- 2670 (bleibt), dazu Begriffe
‚Prüfpunkt‘, ‚Prüfliste‘, ‚Fall-Liste‘, ‚Fall‘.

---

## 2. Klärpunkte (vor dem Bau)

| Nr. | Frage | Befund | Vorschlag |
|---|---|---|---|
| **K1** | Was wird aus den alten **Erledigt-Zeilen** (E-)? | AppDesign 91 Zeilen: 33 mit genau einem Thema, 35 geprüfte Usertests, 13 mit mehreren Themen, 10 ohne Thema (Korrekturen, Anfang). Reiselogbuch 135: 28 / 51 / 20 / 36 (frühe Versionen 2.1.x mit F-/B-Nummern). | Die Erledigt-Tabelle bekommt **keine eigene Nummer** mehr: Spalte ‚Nr.‘ = Thema bzw. Usertest (mehrere erlaubt: ‚APD-75, APD-76‘), ohne Thema die Version (‚RLB 2.1.3‘). Jede alte E-Nummer steht in `ZUORDNUNG.md` mit ihrer Zeile; die etwa 10 Verweise auf E-Nummern (VERLAUF, CHANGELOG, ‚widerruft E-33‘) zeigen danach auf das Thema. |
| **K2** | Dürfen Testfall-Listen **lokal** Buchstaben verwenden, die überall gelten? | K- in 4 Listen (A-02a, A-20, A-33, A-67), I- in T-05 Brainstorming, G- in 3 Listen, R- in 4, P- in 2 Arbeitsdateien. | **Nein** – diese lokalen Nummern bekommen freie Buchstaben (14 Dateien, nur in der Datei und ihren Verweisen); sonst ist ‚K-3‘ in einer Liste nicht von der Import-Erkenntnis K-3 zu unterscheiden. |
| **K3** | **T- mit zwei Bedeutungen** – wie trennt das Skript? | T-1 … T-66 sind auch die Framework-Themen aus A-38; Treffer bis T-66 in AppDesign vor allem in `BACKLOG.md` (75), A-36 (29), VERLAUF (27), A-61, A-43. | Im Reiselogbuch-Repo und ab T-67 immer RLB-; in AppDesign im Umfeld A-38 / A-43 … A-62 → APD-38/T-n, sonst RLB-. Jeder Treffer bis T-66 in AppDesign kommt in eine Prüfliste für Claude (Datei, Zeile, Entscheidung) und steht in `ZUORDNUNG.md`. |
| **K4** | **Dateinamen** in `arbeit/` umbenennen? | 84 Dateien, 35 Fall-Listen; Muster sind über Pages verlinkt (z. B. `arbeit/A-74 Muster.html`). | Ja: ‚A-74 Fall-Liste.md‘ → ‚APD-74 Testfall-Liste.md‘, ‚T-05 …‘ → ‚RLB-5 …‘; alle Verweise mit. Alte Pages-Links auf Muster gehen danach ins Leere (Muster sind Zwischenstände). |
| **K5** | **Begriffe** auch in der Geschichte (CHANGELOG, VERLAUF, Versionsgeschichten)? | ‚Prüfliste P-72‘, ‚Prüfpunkt‘, ‚Fall-Liste‘ stehen in allen alten Einträgen. | Ja (rückwirkend, D3): Usertest, Testfälle P-n, Testfall-Liste, Testfall (automatisch) / (User). |
| **K6** | Führende Nullen | A-01, T-05, E-04, K-07, B-01 … | Weg: APD-1, RLB-5, K-7, B-1. |
| **K7** | Reiselogbuch auf die neue Fassung **heben** (R-10.3, Rückfrage)? | Der Umbau ändert `v4/` (Kommentare) und `tests/` → AppDesign 4.36.0; die Prüfungen des Reiselogbuchs kommen aus seiner Fassung. | Ja: Reiselogbuch 3.34.0 lädt Fassung 4.36.0. |
| **K8** | **RLI-** ohne Backlog? | ReiseLogBuch-Import hat heute kein `BACKLOG.md`, nur die Versionsgeschichte. | RLI- ist reserviert; das erste Import-Thema legt `BACKLOG.md` dort an. |
| **K9** | Was kommt in die Version mit? | ‚0. Nächste Version‘: A-79 Uhrzeitzeile (Zusammenarbeit 2.20.0). | APD-78 + APD-79 zusammen (2 Themen, 0 Nr. 8): Zusammenarbeit 2.20.0, AppDesign 4.36.0, Reiselogbuch 3.34.0, Import 1.3.0. |

---

## 3. Testfälle (automatisch) – neue Prüfung des Schemas (D5, `doku.mjs` – `checkCollab`)

Jeder Fall wird eine Prüfung; Gegenprobe `--gegenprobe schema`: je Fall eine eingebaute Verletzung, rot mit genau seiner Meldung.

| Nr. | Fall | Erwartet |
|---|---|---|
| S-1 | Unbekanntes Präfix in Backlog, CHANGELOG, Richtlinien, Zusammenarbeit (z. B. ‚Q-5‘ ohne Elternnummer außerhalb seiner Testfall-Liste) | rot: ‚Präfix Q- unbekannt – mit Elternnummer zitieren (APD-n/Q-5)‘ |
| S-2 | Alte Nummer (A-n, T-n, E-n, N-n) außerhalb von `ZUORDNUNG.md` und `fassung/` | rot mit Datei, Zeile und der neuen Nummer aus der Tabelle |
| S-3 | Lokale Testfall-Nummer verwendet einen Buchstaben, der überall gilt (APD, RLB, RLI, P, R, G, I, K) | rot (K2) |
| S-4 | Führende Null (APD-01, P-073, B-01) | rot (K6) |
| S-5 | `ZUORDNUNG.md`: jede alte Nummer genau einmal, jede neue existiert (Thema im Backlog, Regel im Katalog) | rot bei doppelt, fehlend oder ins Leere |
| S-6 | Neue Themennummer = höchste + 1, keine doppelte Nummer im Backlog, Erledigt eingeschlossen (D1) | rot bei Lücke rückwärts oder Doppel |
| S-7 | Alte Begriffe ‚Prüfpunkt‘, ‚Prüfliste‘, ‚Fall-Liste‘ außerhalb von `ZUORDNUNG.md` und `fassung/` | rot (K5) |
| S-8 | CHANGELOG der neuesten Version: ‚Testfälle P-n‘ beginnt mit /0 ‚Version prüfen‘, jeder Testfall mit Schritten und ‚Erwartet‘ | wie heute, mit den neuen Begriffen (`doku.mjs` und `veroeffentlichen.mjs`) |
| S-9 | Jeder Verweis auf eine Datei in `arbeit/` zeigt auf eine vorhandene Datei | rot bei totem Verweis (K4) |
| S-10 | Präfix-Tabelle in Zusammenarbeit 2.4 nennt jedes überall geltende Präfix, das in den Repos vorkommt | rot bei fehlendem Präfix |

## 4. Testfälle (automatisch) – Umbau-Skript (`werkzeug/umbenennen.mjs`)

| Nr. | Fall | Erwartet |
|---|---|---|
| U-1 | Zweiter Lauf | ändert nichts (idempotent) |
| U-2 | `fassung/` und `.git/` | unverändert (Vergleich vorher/nachher) |
| U-3 | Code: nur Kommentare und Meldungstexte, keine Bezeichner, Klassen, Regex-Muster außer den Prüfmustern für P-/Begriffe | Liste aller Treffer in Code-Dateien vor dem Schreiben, von Claude durchgesehen |
| U-4 | T- bis T-66 in AppDesign (K3) | jeder Treffer nach der Liste entschieden, keiner automatisch geraten |
| U-5 | Lokale Nummern in Testfall-Listen (B6, X-2) | bleiben in ihrer Datei, außerhalb mit Elternnummer |
| U-6 | Danach `node tests/alle.mjs` im Reiselogbuch, `tests/lauf-selbsttest.mjs`, `werkzeug/veroeffentlichen-selbsttest.mjs`, Import `pruefen.mjs --selbsttest` | grün in Chromium und WebKit |

## 5. Testfälle (User) – Usertest der Version

Am Gerät ändert sich nur die Versionszeile; der Rest ist auf GitHub nachzusehen:

- /0 Version prüfen (Reiselogbuch 3.34.0 · AppDesign 4.36.0).
- /1 Backlog AppDesign auf GitHub öffnen – Themen heißen APD-n, Erledigt ohne E-Nummern, ‚Auf iPad und iPhone prüfen‘ mit Usertest P-74.
- /2 Zusammenarbeit 2.4 ‚Nummern und Präfixe‘ lesen – jede Zeile verständlich.
