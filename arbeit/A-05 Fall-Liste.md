# A-05 – Fall-Liste für Prüfungen 2.0

**Stand 14.10.2026** · Sitzung ‚Reiselogbuch 0003 – A-05 Prüfungen 2.0‘ · Zusammenarbeit allgemein 0 Nr. 1
(Fall-Liste vor jedem Bau). Grundlage: `UEBERGABE.md` Abschnitte 3 und 4, `BACKLOG.md` A-05, Zusammenarbeit 0 Nr. 2,
5, 9, 10, `arbeit/A-02 Verlauf-Abgleich.md` (F-1, W-4). **Freigegeben 14.10.2026** (Fall-Liste ja · feste Fassung mit `design.css`, `ui.js` und `tests/` · zwei Versionen: erst A 4.13.0/3.12.0, dann B 4.14.0/3.13.0). Noch nichts gebaut.

Jeder Fall wird ein automatischer Test (Spalte ‚Test‘); was nur das Gerät zeigt, kommt in die Prüfliste (Teil F).
A-05 ändert Prüfskripte, Werkzeuge und die Art, wie die App AppDesign einbindet – **die App sieht gleich aus**.

## Befund beim Lesen und Messen (vor dem Bau)

Gemessen heute in dieser Sitzung: Reiselogbuch 3.11.7, AppDesign 4.12.2, Chromium, 4 Kerne.

| Test | Dauer | meldet Fehler? |
|---|---|---|
| `kontextmenue-regeln` | 197 s | ja (ERR-Liste), Rückgabewert immer 0 |
| `hig` | 189 s | ja, Rückgabewert 1 bei Abweichung – **als einziger** |
| `regeln-ablauf` | 36 s | ja (ERR-Liste), Rückgabewert immer 0 |
| `ablauf-abgleich-ui` | 34 s | ja (ERR-Liste), Rückgabewert immer 0 |
| `backup-regeln` | 22 s | ja (ERR-Liste), Rückgabewert immer 0 |
| `ablauf-markierung-menues` | 19 s | **nein** – gibt nur Werte aus (29 Zeilen) |
| `ablauf-gesamt` | 10 s | **nein** – gibt nur Werte aus (67 Zeilen) |
| `ablauf-iphone` | 10 s | ja (ERR-Liste), Rückgabewert immer 0 |
| `ablauf-seitenleiste-position` | 9 s | ja (ERR-Liste), Rückgabewert immer 0 |
| `ablauf-abgleich-faelle` | 8 s | ja (ERR-Liste), Rückgabewert immer 0 |
| `ablauf-abgleich` | 6 s | ja (ERR-Liste), Rückgabewert immer 0 |
| `ablauf-seitenleiste-kontextmenue` | 6 s | **nein** – gibt nur Werte aus |
| `ablauf-suche-tabelle` | 2 s | **nein** – gibt nur Werte aus |
| `ablauf-fenster` | 2 s | **nein** – gibt nur Werte aus (z. B. ‚gap bottom 4‘) |
| `tastatur` | 2 s | **nein** – gibt nur Werte aus |
| `version-regeln`, `abgleich-regeln`, `doku-regeln` | je ≤ 2 s | ja, Rückgabewert immer 0 |
| **zusammen** | **≈ 9 min 15 s** nacheinander | alle grün (‚ERR []‘, ‚keine Abweichungen‘) |

- **`alle.sh` sieht nur Zeilen mit ‚err‘:** Ein Test, der nur Werte ausgibt, kann nie rot werden; ein Absturz ohne
  ‚error‘ im Text fällt nicht auf; der Rückgabewert von `alle.sh` ist immer 0. `pixelvergleich` braucht `_alt.html` und
  läuft nicht in `alle.sh` (bleibt Handwerkzeug).
- **Zwei Tests bestimmen die Dauer** (kontextmenue 197 s, hig 189 s). Parallel auf 4 Kernen wäre die Grenze ≈ 200 s;
  erst wenn beide in iPad und iPhone geteilt werden, sind etwa 2 min erreichbar.
- **Veröffentlichen heute von Hand:** Versionen an 8–10 Stellen je Repo, Zweig, `--no-ff`, Push, Pages abwarten.
  `github.io` ist aus der Cloud gesperrt; die Pages-Läufe sind aber über die GitHub-Schnittstelle lesbar (`gh api …
  /actions/runs` geht hier – geprüft, letzter Lauf ‚pages build and deployment · success · 1de09a7‘).
- **Feste Fassung fehlt:** Die App lädt `../AppDesign/v4/…?v=4.12.2`. `v4/` ändert sich mit jeder AppDesign-Version
  – `?v=` verhindert nur den alten Zwischenspeicher, nicht, dass eine neue AppDesign-Version die App verändert.
  W-4 (‚4.x.y gilt sofort für alle Apps‘) steht in Designrichtlinie 14, README AppDesign und CLAUDE.md AppDesign.
- **WebKit (F-1) – erledigt 14.10.2026:** Der Nutzer hat `cdn.playwright.dev` und
  `playwright.download.prss.microsoft.com` unter Umgebung ‚Standard‘ → Netzwerkzugriff → Erlaubte Domains freigegeben
  (auf claude.ai/code in Safari; in der iPad-App war das Umgebungsmenü nicht zu finden). Wirkt sofort, ohne neue Sitzung.
  WebKit 26.0 (Playwright 1.56.1, Revision 2215) mit `install-deps` installiert; Probelauf Reiselogbuch 3.11.7 iPad quer
  und iPhone hoch ohne Skriptfehler. Dauerhaft über das Setup-Skript der Umgebung (Zeilen siehe Teil G).

## A. Tests melden Fehler (Version A)

| Nr. | Fall | Änderung | Test |
|---|---|---|---|
| A-1 | Jeder Test endet mit Rückgabewert ≠ 0, wenn eine Prüfung fehlschlägt, die Seite einen Skriptfehler wirft (`pageerror`) oder der Test abstürzt | gemeinsamer Baustein `AppDesign/tests/pruefe.mjs`: `pruefe(name, ist, soll)` sammelt, `ende()` gibt aus und setzt den Rückgabewert | Gegenprobe je Skript: einmal mit absichtlich falschem Sollwert laufen lassen → muss rot werden (erst rot, dann grün) |
| A-2 | Die 6 Tests, die nur Werte ausgeben (fenster, gesamt, markierung-menues, seitenleiste-kontextmenue, suche-tabelle, tastatur), prüfen jeden ausgegebenen Wert gegen einen Sollwert | jede `console.log`-Messung → `pruefe(…)`; Sollwerte = heutiger, auf dem Gerät geprüfter Stand (P-34 ok) | Gegenprobe wie A-1; Ausgabe nur noch bei Fehlern (eine Zeile je Fehler mit Regelnummer, Ansicht, ist/soll) |
| A-3 | Die Tests mit ERR-Liste setzen den Rückgabewert | `ende()` statt `console.log('ERR', …)` | wie A-1 |
| A-4 | Jede Fehlermeldung nennt Regel (R-x.y), Gerät, Lage, Darstellung und Schritt | Format in `pruefe.mjs` | Meldung im Gegenprobe-Lauf wird gegen das Format geprüft |
| A-5 | Ein Test, der zu lange hängt, wird abgebrochen und gilt als rot | Zeitgrenze je Test (Standard 5 min) im Lauf-Werkzeug (B) | Gegenprobe mit einem Test, der absichtlich wartet |

## B. Tests parallel, schnellste zuerst, Abbruch beim ersten Fehler (Version A)

| Nr. | Fall | Änderung | Test |
|---|---|---|---|
| B-1 | Alle Tests laufen parallel (so viele wie Kerne), die schnellsten zuerst (Reihenfolge nach der zuletzt gemessenen Dauer) | neu `tests/alle.mjs` in der App (nutzt `AppDesign/tests/lauf.mjs`); `alle.sh` ruft nur noch das auf | Lauf-Werkzeug hat eigenen Selbsttest mit drei Schein-Tests (schnell/langsam/rot) |
| B-2 | Beim ersten roten Test werden die übrigen beendet; Ausgabe: der rote Test mit seinen Fehlerzeilen, Rückgabewert 1 | `lauf.mjs` | Selbsttest: roter Schein-Test → andere beendet, Rückgabewert 1 |
| B-3 | Alles grün: eine Zeile je Test (Dauer) und ‚Alle N Tests grün in mm:ss‘ | `lauf.mjs` | Selbsttest |
| B-4 | `--alle` läuft trotz Fehler weiter und zeigt am Ende alle roten Tests | Schalter | Selbsttest |
| B-5 | Die zwei langen Tests werden geteilt (iPad / iPhone), damit die Gesamtdauer sinkt | `hig.mjs` und `kontextmenue-regeln.mjs` mit Schalter `--geraet` | Ziel: ≤ 3 min gesamt; die Dauer steht im Bericht. Abdeckung bleibt gleich (Zahl der geprüften Ansichten vorher = nachher) |
| B-7 | Jeder Test läuft zusätzlich in **WebKit** (Safari-Engine), nicht nur in Chromium; Nachbildungen (C-3) bleiben für Chromium | `lauf.mjs --browser chromium,webkit` (Standard: beide); `pruefe.mjs` startet den gewählten Browser | Gegenprobe: ein Unterschied, den nur WebKit zeigt, wird gemeldet; Dauer beider zusammen im Bericht |
| B-8 | WebKit fehlt in einer Sitzung (Setup-Skript nicht gelaufen) | Lauf bricht mit Hinweis ab: ‚WebKit fehlt – `npx playwright install webkit` und `install-deps webkit`‘, nicht stillschweigend nur Chromium | Selbsttest ohne WebKit-Pfad |
| B-6 | Gleichzeitig laufende Tests stören sich nicht (eigene Seiten, eigene Ausgabedateien in `tests/out/`) | Dateinamen je Test | `--alle` zweimal hintereinander → gleiches Ergebnis |

## C. Grundregeln nach jeder Handlung in jeder Ansicht (Version A)

Keine neue Regel: Es werden **dieselben** Prüfungen aus `hig.mjs` benutzt (je Regel genau eine Prüfung, 0 Nr. 3),
nur zusätzlich nach jedem Schritt der Ablauf-Tests.

| Nr. | Fall | Änderung | Test |
|---|---|---|---|
| C-1 | Nach jedem Schritt (Antippen, Drehen, Wischen, Tastatur, Abgleichen, Fenster auf/zu): kein Text ragt hinaus (R-6.3), Leisten stehen (R-2.1), offenes Menü/Fenster ganz sichtbar (R-4.5), kein Fokus-Rahmen (R-3.4), höchstens eine blaue Hauptaktion (R-3.3), kein Skriptfehler | `hig.mjs` stellt die Einzelprüfungen als `grundregeln(page)` bereit; `schritt(p, 'Name', fn)` ruft sie nach jedem Schritt | Gegenprobe: ein Schritt mit absichtlich zu langem Wort → R-6.3 rot |
| C-2 | Jeder Ablauf-Test läuft in den Ansichten, die für ihn gelten: iPad quer und hoch, iPhone hoch und quer, je hell und dunkel | gemeinsame Liste `ANSICHTEN` in `pruefe.mjs`; Tests wählen daraus | Abdeckungstabelle (Test × Ansicht) wird von `alle.mjs --abdeckung` ausgegeben; Lücken nur mit Begründung im Test |
| C-3 | Safari nachgebildet, wo Chrome anders arbeitet (Scroll-Anker aus, Tastatur verschiebt den sichtbaren Bereich) | bestehende Nachbildungen in `pruefe.mjs` gebündelt | bestehende Tests R-2.1 und R-8.1 |

## D. Feste AppDesign-Fassung je App (Version B)

| Nr. | Fall | Änderung | Test |
|---|---|---|---|
| D-1 | Jede AppDesign-Version liegt zusätzlich unveränderlich in `fassung/X.Y.Z/` (`design.css`, `ui.js` und `tests/` – entschieden 14.10.2026; die App wird mit den Prüfungen ihrer Fassung geprüft) | Ordner wird beim Veröffentlichen angelegt (E) | `version.mjs`: Prüfsummenliste `fassung/PRUEFSUMMEN` – jede vorhandene Datei unverändert, keine fehlt; `AD_VERSION` im Ordner = Ordnername |
| D-2 | Die App lädt **genau ihre** Fassung: `../AppDesign/fassung/4.14.0/ui.js` (index.html und sw.js); `AD_NEEDED` = Ordnername | Reiselogbuch umstellen; `?v=` entfällt, weil der Pfad die Version schon enthält (R-10.3 wird angepasst, nicht neu) | `version.mjs` (R-10.3): Pfad in index.html = sw.js = `AD_NEEDED`; Ordner vorhanden |
| D-3 | Eine neue AppDesign-Version ändert eine App **nicht**, solange sie nicht gehoben wird | – | Test: App mit Fassung N, AppDesign-Arbeitsstand N+1 mit absichtlich geändertem Knopf → App unverändert |
| D-4 | Heben nur nach Rückfrage (0 Nr. 10): das Veröffentlichungs-Skript nennt Apps auf älteren Fassungen, hebt aber nichts | Hinweiszeile im Skript | Selbsttest des Skripts |
| D-5 | `v4/` bleibt bestehen und zeigt weiter die neueste 4er-Fassung (für schon installierte ältere App-Stände) | – | `version.mjs`: `v4/` = neueste `fassung/4.*` |
| D-6 | Richtlinien-Text je Fassung: Git-Markierung (Tag) `v4.14.0` je AppDesign-Version; die README der App verlinkt die Richtlinien dieser Markierung statt `main` | README ‚Verwendete Versionen‘ (R-10.4) | `doku.mjs`: Links zeigen auf die Markierung der benutzten Fassung |
| D-7 | W-4 nachführen: Designrichtlinie 14, README AppDesign, CLAUDE.md AppDesign | Text | `checkCollab`: ‚gelten sofort für alle Apps‘ nirgends mehr (außer Versionsgeschichte) |
| D-8 | Offline: die App läuft mit ihrer Fassung aus dem Zwischenspeicher | sw.js-Dateiliste mit dem Fassungs-Pfad | bestehende sw-Prüfung in `version.mjs` |

## E. Veröffentlichungs-Skript (Version B)

`AppDesign/werkzeug/veroeffentlichen.mjs`, zwei Schritte, damit Claude dazwischen die Texte (CHANGELOG, Prüfliste)
schreibt: **`vorbereiten`** erhöht alle Versionsnummern, **`los`** prüft und veröffentlicht.

| Nr. | Fall | Erwartet | Test |
|---|---|---|---|
| E-1 | `vorbereiten --ad 4.14.0 --app reiselogbuch=3.13.0` | erhöht: `AD_VERSION`, `--ad-version`, README/Richtlinie/Backlog-Kopf AppDesign; App: `APP_VERSION`, `APP_BUILT` (Europe/Berlin), Cache-Name, Fassungs-Pfad, `AD_NEEDED`, README-Tabelle, PROMPT-Zeile 3 | Selbsttest in einer Kopie der Repos: danach `version.mjs` und `doku.mjs` grün |
| E-2 | Version nicht höher als die vorige, oder Fassung existiert schon | Abbruch, nichts geändert | Selbsttest |
| E-3 | `los`: offene Änderungen ohne Commit, falscher Zweig, Texte fehlen (CHANGELOG-Eintrag, Prüfliste mit /0) | Abbruch vor dem Push mit Grund | Selbsttest |
| E-4 | `los`: alle Tests der App (B) – einer rot | Abbruch, **nichts** veröffentlicht | Selbsttest mit rotem Schein-Test |
| E-5 | `los` grün: AppDesign – Fassung anlegen, Prüfsumme, Tag, `--no-ff` nach `main`, Push (bei Netzfehler 4 Versuche: 2, 4, 8, 16 s) | – | Selbsttest gegen ein lokales Schein-Repo (kein echter Push) |
| E-6 | Auf den Pages-Lauf von AppDesign warten: über die GitHub-Liste der Actions für genau diesen Commit, bis ‚success‘ (höchstens 10 min) | erst dann die App; bei ‚failure‘ oder Zeitüberschreitung Abbruch mit Hinweis, die App bleibt unverändert | Selbsttest mit nachgebildeter Antwort (success / failure / hängt) |
| E-7 | Danach die App genauso; ‚Fertig‘ erst, wenn beide Läufe ‚success‘ sind und die Dateien auf `main` die neuen Versionen enthalten | Zusammenfassung: Versionen, Commits, Pages-Läufe, Dauer | Selbsttest |
| E-8 | AppDesign online, App scheitert | dank fester Fassung kein Schaden: die App lädt weiter ihre alte Fassung; Skript sagt, wie es weitergeht (`los --nur-app`) | Selbsttest |
| E-9 | Grenze: `github.io` selbst ist aus der Cloud nicht lesbar | Nachweis über Pages-Lauf + Commit; die echte Seite prüft der Nutzer mit /0 ‚Version prüfen‘ | – (steht im Bericht) |

## F. Nur am Gerät (Prüfliste)

| Nr. | Was | Version |
|---|---|---|
| F-a | /0 Versionszeile: App- und AppDesign-Version (beide Geräte) | A und B |
| F-b | Nach Version B: App startet, sieht unverändert aus (iPad quer/hoch, iPhone hoch, hell/dunkel); kein Hinweis ‚Neue Version wird geladen‘ | B |
| F-c | Nach Version B offline (Flugmodus): App startet mit ihrer Fassung | B |

## G. Versionen

| Version | Inhalt (höchstens 2 Themen, 0 Nr. 8) |
|---|---|
| **AppDesign 4.13.0 · Reiselogbuch 3.12.0** | Thema 1 Tests melden Fehler (A, C), Thema 2 Lauf-Werkzeug parallel mit WebKit (B). App ändert sich nicht sichtbar. |
| **AppDesign 4.14.0 · Reiselogbuch 3.13.0** | Thema 1 Feste Fassung (D, mit W-4), Thema 2 Veröffentlichungs-Skript (E) – 4.14.0 wird schon mit dem Skript veröffentlicht. |
| WebKit | **in Version A** (entschieden 14.10.2026, B-7, B-8). Setup-Skript der Umgebung ‚Standard‘ (vom Nutzer eingetragen 14.10.2026, mit `#!/bin/bash`; wirkt ab der nächsten Sitzung – dort prüfen, ob `/opt/pw-browsers/webkit-2215` da ist): `npx -y playwright@1.56.1 install webkit` und `npx -y playwright@1.56.1 install-deps webkit` |

Dazu bei beiden: Regelkatalog R-10.3 angepasst (D-2), Designrichtlinie 14, Zusammenarbeit 0 Nr. 2/9/10 (nur Verweise
auf die Werkzeuge), CHANGELOG, Backlog, Übergabe.
