# A-39 Konsolidierung aller Regeln – Bestandsaufnahme und Plan (Schritt 1)

Sitzung ‚Reiselogbuch 0026‘ · 21.10.2026 · **nichts geändert** – nur diese Datei. Grundlage: Auftrag im Starttext
(Grundsätze 1–5), Zusammenarbeit 0 Nr. 3. Fragen mit Empfehlung stehen in Abschnitt 8; sie kommen einzeln im Auswahlfenster.

---

## 1. Größe vorher (Zeichen, Unicode)

| Datei | gesamt | davon Regeltext | davon Versionsgeschichte |
|---|---:|---:|---:|
| AppDesign · `README - Zusammenarbeit allgemein.md` | 38.660 | 29.530 | 9.130 |
| AppDesign · `README - Designrichtlinie allgemein.md` | 121.845 | 102.727 | 19.118 |
| – davon 13 iPad-Erfahrungen · 15 Komponenten · 16 HIG · 17 Katalog | | 8.185 · 41.400 · 3.162 · 17.773 | |
| AppDesign · `CLAUDE.md` | 3.327 | 2.347 | 980 |
| AppDesign · `UEBERGABE.md` | 10.717 | 10.717 | – |
| AppDesign · `tests/README.md` | 9.325 | 9.325 | – |
| ReiseLogBuch · `README - Designrichtlinie Reiselogbuch.md` | 22.588 | 11.797 | 10.791 |
| ReiseLogBuch · `PROMPT.md` | 34.686 | 34.686 | – |
| ReiseLogBuch · `CLAUDE.md` | 5.462 | 3.773 | 1.689 |
| ReiseLogBuch · `tests/README.md` | 6.694 | 6.694 | – |
| ReiseLogBuch-Import · `CLAUDE.md` | 1.643 | 1.643 | – |
| **Summe** | **254.947** | | |

**Lesestoff zu Beginn jeder Sitzung** (UEBERGABE + Zusammenarbeit 0 und 1 + CLAUDE.md): ≈ 30.000 Zeichen.
**Geschichte im Regeltext:** ‚seit X.Y‘ 108× in der Designrichtlinie, 30× Zusammenarbeit, 33× PROMPT, 27× tests/README AppDesign,
11× tests/README Reiselogbuch; dazu A-/T-/P-Nummern (57× Designrichtlinie) und Vermerke wie ‚Nutzer 19.10.2026‘, ‚Anlass …‘,
‚vorher …‘, ‚Die Vermutung aus 4.26.0 war falsch‘.

---

## 2. Was die Prüfungen an den Texten verlangen (darf nicht brechen)

`tests/doku.mjs` liest die Regeltexte selbst (`checkCatalog`, `checkCollab`, `checkDocs`). Weil kein Code geändert wird,
muss der neue Text diese Bedingungen erfüllen – sonst wird der volle Lauf rot:

1. Regelkatalog bleibt **`## 17.`** der Designrichtlinie, Zeilen `| R-x.y | …` am Zeilenanfang (mindestens 30), danach
   `### Zuordnung alt → neu` mit allen R-01 bis R-52; jede Nummer kommt in `tests/*.mjs` vor → **keine neuen R-Nummern
   möglich** (es gäbe keine Prüfung dafür), keine Nummer streichen.
2. Alte Nummern (`R-01` …) nur im Katalog und in Versionsgeschichten; jede genannte `R-x.y` muss es geben.
3. Jeder Verweis `Zusammenarbeit [allgemein] N`, `§N` muss auf einen vorhandenen Abschnitt `## N.` zeigen, `0 Nr. M` auf ein
   vorhandenes Nr. M – **auch die Versionszeile in PROMPT.md** (‚Zusammenarbeit allgemein 2.16.0‘ zählt als Verweis auf
   Abschnitt 2). Folge: der Abschnitt mit der Nummer der Hauptversion der Zusammenarbeit muss bestehen bleiben.
4. Code-Kommentare und Meldungen der Prüfungen nennen ‚Zusammenarbeit 0 Nr. 1, 2, 3, 5, 7, 8, 9, 10, 13, 15, 20‘,
   ‚Zusammenarbeit 2‘ (Zeitzeile), ‚Zusammenarbeit 7‘ (Prüfliste /0, Versionszeile), ‚Designrichtlinie 1, 11, 13, 14, 15.20,
   16, 17‘ → **Nummern 0 Nr. 1–20 und Abschnitte 1–17 der Designrichtlinie bleiben**, neue Punkte bekommen neue Nummern.
5. CLAUDE.md beider Repos: unter `## Zuerst lesen` zuerst `UEBERGABE.md`, `**Version X.Y.Z**`, `## Versionsgeschichte`;
   Reiselogbuch-CLAUDE nennt `sh tests/alle.sh`. Verboten im Regeltext: ‚etwa 5 Punkte‘, ‚direkt im Fragetext‘, ‚⏱ Gesamt‘,
   ‚gilt sofort für alle Apps‘, ‚?v=<Version>‘; ‚Antwortzeile‘ nur mit ‚mehr als 4 Fragen‘ in der Nähe.
6. App-Richtlinie behält den Satz ‚Feldnamen im Abgleichbericht (`labels`): …‘ (Prüfung R-10.1) und
   ‚Designrichtlinie allgemein aus AppDesign (Version X)‘ (setzt das Veröffentlichungs-Skript).

---

## 3. Doppelungen (gleiche Regel an mehreren Stellen)

**Zusammenarbeit, CLAUDE.md, UEBERGABE**

| Nr. | Regel | steht heute in | künftig nur in |
|---|---|---|---|
| D-1 | Nie ohne ‚Ja‘ bauen | Kasten oben, §5 Nr. 5, beide CLAUDE.md | 0 Nr. 21 (neu) |
| D-2 | Sammelversionen, kleine Versionen, Korrekturen sofort | Kasten oben, 0 Nr. 8, §6, §4 | 0 Nr. 8 |
| D-3 | Erst prüfen, dann Neues (mit Hinweis) | Kasten oben, §7, beide CLAUDE.md | 0 Nr. 22 (neu) |
| D-4 | Auswahlfenster (Aufbau, ‚Ich schreibe im Chat‘, Erklärung als Datei vorher) | 0 Nr. 7, §2 (zweimal), 0 Nr. 11 | 0 Nr. 7 + Format in 2.1 |
| D-5 | Bericht und Prüfpunkte Schritt für Schritt, /0, Meldung je Gerät, Rückmeldungsfenster | 0 Nr. 11, §6, §7 (vier Absätze) | 0 Nr. 11 + Format in 2.3 |
| D-6 | Fehler am Gerät → erst Prüfung rot, dann beheben | 0 Nr. 1, §7, 0 Nr. 20 | 0 Nr. 1 (Nr. 20 nur Messen) |
| D-7 | Testfälle ableiten, Safari nachbilden | 0 Nr. 1, 0 Nr. 5, §7, Designrichtlinie 17 | 0 Nr. 1 und 5 |
| D-8 | Ein voller Prüflauf je Version | 0 Nr. 2, §7, beide CLAUDE.md, UEBERGABE 5 | 0 Nr. 2 |
| D-9 | Veröffentlichen: erst AppDesign, dann App, ‚fertig‘ erst nach Pages | 0 Nr. 9, §7, §9, Designrichtlinie 14, beide CLAUDE.md, UEBERGABE 5 | 0 Nr. 9 (Ablauf), CLAUDE.md (Befehle) |
| D-10 | Feste Fassung je App | 0 Nr. 10, Designrichtlinie 11 und 14, R-10.3, beide CLAUDE.md, beide tests/README | R-10.3 (Regel), Designrichtlinie 14 (Aufbau), 0 Nr. 10 (Rückfrage beim Heben) |
| D-11 | Versionsnummern dreistufig | §8, Designrichtlinie 11 und 12, PROMPT | Designrichtlinie 11 |
| D-12 | Versionen in README/PROMPT/CHANGELOG nennen | §7, §9, Designrichtlinie 11 und 12 | R-10.4 + 0 Nr. 9 |
| D-13 | Allgemein oder App erfragen | 0 Nr. 4, §5 Nr. 3, Designrichtlinie 12, App-Richtlinie (Hinweis) | 0 Nr. 4 |
| D-14 | Apple-Abgleich vor Muster, neue Regel mit Nummer und Prüfung | §3, 0 Nr. 3, Designrichtlinie 16 und 17 | 0 Nr. 23 (neu) und 0 Nr. 3 |
| D-15 | Gezielt lesen zu Beginn | Hinweis oben, 0 Nr. 15, beide CLAUDE.md, Starttext | 0 Nr. 15 (CLAUDE.md: nur die Liste) |
| D-16 | Modell und Aufwand | 0 Nr. 13, 0 Nr. 15, UEBERGABE | 0 Nr. 13 (setzen), 0 Nr. 15 (prüfen) |
| D-17 | Zeit und Token | §2, beide CLAUDE.md, UEBERGABE 5, Import-CLAUDE | Abschnitt 2.2 |
| D-18 | Startfrage | 0 Nr. 19, drei CLAUDE.md | 0 Nr. 19 (CLAUDE.md: ein Verweis) |
| D-19 | Muster: Varianten, zuerst hell und quer, Viererpakete | 0 Nr. 6, §5 Nr. 2 | 0 Nr. 6 |
| D-20 | Ablage (welches Repo, welche Datei) | §9, UEBERGABE 6, Designrichtlinie 14 | 0 Nr. 10 + Designrichtlinie 14 |
| D-21 | Arbeitsumgebung (klonen, Verweise, Tests einrichten, Veröffentlichen) | UEBERGABE 5, beide CLAUDE.md, beide tests/README | AppDesign CLAUDE.md ‚Technisch‘ |

**Designrichtlinie allgemein, Komponenten, Katalog, HIG-Checkliste**

| Nr. | Regel | steht heute in | künftig |
|---|---|---|---|
| D-30 | Leisten stehen fest / Seite rollt nie | 1, 13 (zweimal), 15.3, 15.17, 15.22, R-2.1 | Regel R-2.1, Bau 15.22, Safari-Grund 13 |
| D-31 | Feld über der Tastatur, ohne Springen | 7, 13 (drei Absätze), 15.3, 15.22, R-4.5, R-2.4 | Regel R-4.5, Technik 13 (S-1 bis S-9) |
| D-32 | Liste steht still nach dem Fenster | 7, R-7.3 | Regel R-7.3, Technik 15.9 |
| D-33 | Suche (ein Wort, mehrere Wörter, Liste) | 15.2, 15.4, 15.17, R-2.3 | Regel R-2.3, Bau 15.2 (Liste als Unterpunkt) |
| D-34 | Seitenleiste / Startliste | 1, 15.4, 15.17, R-7.1, R-7.2 | R-7.x, Bau 15.4 (15.17 verweist) |
| D-35 | Backup erstellen/laden | 10, 15.4, 15.19, R-9.1, R-9.2 | R-9.x, Bau 15.19 |
| D-36 | Abgleich | 15.4, 15.18, R-9.3, R-9.4 | R-9.x, Bau und Fall-Tabelle 15.18 |
| D-37 | Farben der Schaltflächen | 2, 4, R-3.3, HIG 3 | Regel R-3.3, Werte 2 und 4 |
| D-38 | Nach oben / Ans Ende | 4, 15.17, 15.22, R-3.2, App-Richtlinie, PROMPT | Regel R-3.2, Bau 15.1 |
| D-39 | Fenster-Kopfzeile, x/Häkchen, Änderungen verwerfen | 6, 7, 15.8, 15.9, R-4.4, HIG 9, PROMPT | Regel R-4.4, Bau 15.8 |
| D-40 | Eingaben, Fehlermeldungen, Eingabetaste | 8, 15.11, R-5.x, PROMPT | R-5.x, Werte 8 |
| D-41 | Tabellen und Ausgabe | 3, 9, 10, 15.13, R-6.x, PROMPT | R-6.x, Werte 9 und 10 |
| D-42 | Drehen | 13, 15.4, 15.6, R-8.1 | Regel R-8.1, Technik 13 |
| D-43 | Offline | 11, 15.20, R-1.5, PROMPT | Regel R-1.5, Bau 15.20 |
| D-44 | Messmodus | 15.21, R-1.6, Zusammenarbeit 0 Nr. 20 | Regel R-1.6, Bau 15.21 |
| D-45 | Start nach dem Neuladen | 13, 15.17, R-7.2, App-Richtlinie 3a, PROMPT | Regel R-7.2, Grund 13 |
| D-46 | **HIG-Checkliste ↔ Katalog**: HIG 1 = R-3.1 · 2 und 3 = R-10.2 · 4 = R-3.3 · 5 = R-4.1 · 6 = R-4.2 · 7 = R-4.3 · 8 = R-10.1 · 9 = R-4.4 | 16 und 17 | 16 wird eine Zuordnungstabelle HIG-Punkt → Apple-Link → Regel, nur was darüber hinausgeht steht dort als Text |
| D-47 | Spalte ‚ersetzt‘ im Katalog = Tabelle ‚Zuordnung alt → neu‘ | 17 (zweimal) | nur die Zuordnungstabelle |

**App-Richtlinie Reiselogbuch ↔ PROMPT.md ↔ Designrichtlinie allgemein**

| Nr. | Thema | steht heute in |
|---|---|---|
| D-50 | Begriffe, Leertexte, Menüpunkte | App-Richtlinie 1, PROMPT RAHMEN und Begriffe |
| D-51 | Icons (Lucide-Zuordnung) | Designrichtlinie 5, App-Richtlinie 2, PROMPT (komplette Liste noch einmal) |
| D-52 | Seitenleiste, Kopfzeile, Menüs | App-Richtlinie 3, PROMPT RAHMEN, Designrichtlinie 15.3/15.4 |
| D-53 | iPhone-Ansicht | App-Richtlinie 3a, PROMPT (iPhone und ‚Seit 3.3.0‘ bis ‚Seit 3.7.0‘) |
| D-54 | Tageserfassung, Smiley-Leisten | App-Richtlinie 4, PROMPT ERFASSUNG, Designrichtlinie 8 |
| D-55 | Abfragen, Fenster, Fehlermeldungen, Pflichtfelder | App-Richtlinie 5 und 6, PROMPT, Designrichtlinie 6–8, 15.7 |
| D-56 | Ausgabe, Dateinamen | App-Richtlinie 7, PROMPT AUSGABE, Designrichtlinie 10 |
| D-57 | Allgemeine Regeln wörtlich im PROMPT: 44 px, Kapseln, Textfelder wachsen, Versionsnummern, Apple-Look, Hover, hängender Einzug, Anführungszeichen, Sicherheitsabfrage | PROMPT ↔ Designrichtlinie 3, 4, 8, 9, 11 |

---

## 4. Widersprüche

**Echte Regel-Widersprüche (brauchen deine Entscheidung → Abschnitt 8)**

| Nr. | Widerspruch |
|---|---|
| W-1 | **Übergabe-Grenze:** 0 Nr. 13 und §2 sagen 300.000 Token, das Werkzeug `werkzeug/messung.mjs` warnt bei 300.000 (`GRENZE`); neu gilt 150.000 (Grundsatz 5). Ohne Änderung der einen Zahl im Werkzeug zeigt die Zeitzeile die Warnung zu spät. |
| W-2 | **Was im Auswahlfenster steht:** §2 ‚nur eine kurze Frage, keine Erklärtexte‘ und ‚im Fenster steht nur die kurze Frage‘ ↔ 0 Nr. 11 (2.16.0) ‚Link und Schritte zusätzlich im Auswahlfenster selbst‘. |
| W-3 | **Neue Sitzung:** 0 Nr. 13 ‚Claude startet die neue Sitzung selbstständig‘ ↔ 0 Nr. 14 ‚bei Ja schreibt Claude die Übergabe‘ ↔ 0 Nr. 15 ‚Der Nutzer öffnet einen neuen Chat und fügt den Starttext ein‘. |
| W-4 | **Sammelversion:** Kasten oben ‚nie eine eigene Version für ein oder zwei Kleinigkeiten‘ ↔ 0 Nr. 8 ‚2–3 zusammengehörige Punkte‘ und ‚Korrekturen sofort als eigene Korrekturversion‘. |
| W-5 | **App-Richtlinie:** Grundsatz 3 ‚enthält nur Abweichungen‘ ↔ Designrichtlinie 12 ‚Abweichungen **und Ausprägungen**‘; die App-Richtlinie besteht heute fast nur aus Ausprägungen, die zugleich im PROMPT stehen. |

**Überholte Beschreibungen (Text widerspricht dem gebauten Stand; Code bzw. neuere Version gilt)**

| Nr. | Stelle | steht da | gebaut ist |
|---|---|---|---|
| U-1 | PROMPT Kopf | ‚Web-App für das iPad‘, Bausteine ‚aus AppDesign v4‘ | iPad und iPhone; feste Fassung `fassung/X.Y.Z/` |
| U-2 | PROMPT Begriffe | Überschrift ‚Reiselogbuch – <Titel>‘ in App und Ausgabe | nur in der Ausgabe (seit 3.4.0) |
| U-3 | PROMPT iPhone | großer Titel, ‚Teilnehmer · Zeitraum‘ grau, Startliste mit großem Titel ‚ohne … Anzahl‘ | Titel in der Leiste, Angaben mit Bezeichnung, Anzahl klein und grau (R-2.2) |
| U-4 | PROMPT Seitenleiste | Kapsel [plus \| ellipsis] | [plus \| search \| ellipsis] |
| U-5 | PROMPT Hauptansicht | ⬆️ ⬇️ ‚wie die Dunkel-Schaltfläche, ohne Schatten‘ | senkrechte schwebende Kapsel mit Lucide-Icons (R-3.2) |
| U-6 | PROMPT Suche | Treffer ‚in die Bildmitte gescrollt‘ | direkt unter der Suchzeile (R-2.3) |
| U-7 | PROMPT Tabellendesign | dunkel #3b3a37/#625f5a/#2e2d2a, äußere Umrandung | Farben aus AppDesign (`--th-bg` …), ohne äußeren Rand, mit Schatten (Designrichtlinie 9) |
| U-8 | PROMPT Erfassung | ‚erfasst, sobald mindestens ein Feld ausgefüllt ist‘ | Wetter, Verlauf, ‚Wie war was?‘ oder Quartier (sichtbare Spalten); Essen zählt nicht (`isRecorded`, PROMPT REISEN) |
| U-9 | PROMPT Quartier-Spalte | Link bis vor den ersten Bindestrich oder das erste Komma | Ende an ‚ – ‘, Komma, Doppelpunkt, Klammer, nicht vor Ziffer (T-86) |
| U-10 | PROMPT Erfassung | ‚Checkbox‘, ‚☐ Quartier wie Vortag‘ | Options-Kapseln (15.16) |
| U-11 | App-Richtlinie 6 | Meldung ‚Der Zeitraum überschneidet sich mit „…“ (…). Bitte korrigieren.‘ | ‚Wähle einen Zeitraum, der sich nicht mit ‚…‘ (…) überschneidet.‘ (Code, PROMPT) |
| U-12 | App-Richtlinie 3a | Startreise ‚laufende, sonst zuletzt beendete, sonst nächste‘ | zuerst die zuletzt verwendete dieses Geräts (seit 3.17.0, `pickStartTrip`) |
| U-13 | App-Richtlinie Kopf | ‚Derzeit gibt es keine Abweichungen‘, Komponenten ‚aus AppDesign/v4‘ | Abweichungen gibt es: feste Spaltenanteile der Ausgabe (gegen 9 ‚passen sich dem Inhalt an‘), Wetter 40 px, Maps-Links 19 px; feste Fassung |
| U-14 | tests/README Reiselogbuch | `version-regeln.mjs`: ‚`?v=` in index.html und sw.js‘; `npm install playwright` | feste Fassung; `playwright@1.56.1` (UEBERGABE 5) |
| U-15 | tests/README AppDesign | `lauf.mjs` ‚Standard 2 × Kerne‘ (und zwei Sätze später ‚so viele wie Kerne‘) | so viele wie Kerne (`lauf.mjs`) |
| U-16 | Designrichtlinie 3 ↔ HIG 2 | Hinweise 14 px ↔ Hinweise 13 pt | `.hint` 14 px, Zusatzzeilen und Notizen 13 px (`design.css`) |
| U-17 | Zusammenarbeit Hinweis oben | ‚Lies … Abschnitt 0‘ | Abschnitte 0 **und** 1 (0 Nr. 15) |
| U-18 | Import-CLAUDE | ‚Abschnitt 0 (per du, Auswahlfenster, Zeit und Token)‘ | per du in Abschnitt 1, Zeit und Token in Abschnitt 2 |
| U-19 | Designrichtlinie 13 | ‚Vermutung aus 4.26.0 war falsch‘, ‚vorerst‘, ‚(seit 4.12.1 auch die Seitenleiste)‘ u. ä. | nur der heutige Stand; die Geschichte steht in der Versionsgeschichte |

---

## 5. Regeln ohne Prüfung

Im Katalog hat jede Regel ihre Prüfung (`checkCatalog`). Ohne automatische Prüfung sind aber **Regeln außerhalb des Katalogs**
(Abschnitte 1–15 und HIG 16 der Designrichtlinie, App-Texte) und alle **Arbeitsregeln** der Zusammenarbeit. Gesucht in
`tests/*.mjs` beider Repos – nicht gefunden:

| Nr. | Regel (Stelle) | heute |
|---|---|---|
| P-1 | Keine Hover-Farbe auf dem iPad (4) | keine Prüfung |
| P-2 | Gesperrte Schaltflächen 40 % (4, 15.15, 15.16); ‚Abbrechen‘ ohne Icon, normale Schrift (4) | keine |
| P-3 | Icon-Zuordnung der Tabelle (5) – geprüft wird nur ‚gleiche Bezeichnung = gleiches Icon‘ (R-10.1) | teilweise |
| P-4 | Menüpunkt und Fenster heißen gleich; Systembeschriftungen bleiben (6) | keine |
| P-5 | Fensterbreite 90 % / mindestens 480 px / bis 1100 px (7) | keine |
| P-6 | ‚Neues …‘ öffnet einmal von selbst, leere Seite mit Hinweis (7) | nur App-Ablauf (`ablauf-gesamt`) |
| P-7 | Automatisches Speichern alle 10 s, ‚Änderungen verwerfen‘ stellt den Zustand her (8) | nur App-Ablauf |
| P-8 | Beträge ‚,00‘ ergänzen, Tausenderpunkt beim Tippen (8) | nur App-Ablauf |
| P-9 | Smiley-Leiste: Häufigkeit, Entfernen, Zurücksetzen, Anhängen in der Zeile (8, 15.12) | nur App-Ablauf |
| P-10 | Tabellenkopf haftet, Links ohne Unterstreichung, Statistik als Liste, Zahlenspalten rechtsbündig (9) | keine |
| P-11 | Speichern über das Teilen-Menü, ehrliche Meldung (10) | keine (nur am Gerät prüfbar) |
| P-12 | Dateinamen-, Datums- und Zeitformat (10) | teilweise (`checkPreview`) |
| P-13 | Sicherheitsabfrage vor jeder Lösch-, Ersetz- oder Rücksetz-Aktion (10, HIG 7) | keine allgemeine |
| P-14 | Service Worker ‚network first‘, Versionsnummer und Cache-Name bei jeder Version (11) | teilweise (`version.mjs`, `offline.mjs`) |
| P-15 | `[hidden]`-Regel bei `display`, Emoji-Varianten gleich (13) | keine |
| P-16 | Filter beim Öffnen und Start auf ‚Alle‘ (15.3) | nur App-Ablauf |
| P-17 | Menü 340 px, Einträge 46 px; Untermenü höchstens etwa 5 Punkte (15.6) | keine |
| P-18 | Info-Icon, Schalter 51 × 31, Zeilen 52 px; Options-Kapsel 15 px (15.14–15.16) | keine |
| P-19 | HIG 3 Farbe nie einziges Merkmal · HIG 5 kein ‚…‘ am Menüende, Icons in einer Gruppe alle oder keine · HIG 6 nicht Verfügbares ausblenden, höchstens 3 Gruppen · HIG 8 kein ‚wir‘, ‚tippen‘ statt ‚klicken‘, leerer Bildschirm nennt den nächsten Schritt | keine |
| P-20 | Zusammenarbeit: fast alle Arbeitsregeln (Auswahlfenster, Bericht, Übergabe, Backlog …) | Selbstkontrolle; automatisch nur: Prüfliste /0 mit Schritten und ‚Erwartet‘, veraltete Formulierungen, CLAUDE.md-Aufbau, PROMPT-Versionszeile (`doku.mjs`), Zeitzeile (`tests/messung.mjs`) |

Neue automatische Prüfungen wären Code (ausgeschlossen) – Vorschlag in Frage F-8.

## 6. Prüfungen ohne Regel

| Nr. | Prüfung | fehlt |
|---|---|---|
| Q-1 | `doku.mjs` – `checkCollab`: veraltete Formulierungen, ‚Antwortzeile‘, Verweise auf die Zusammenarbeit | im Regeltext nicht als Prüfung der Arbeitsregeln genannt |
| Q-2 | `doku.mjs`: CLAUDE.md beginnt mit UEBERGABE.md, hat Version und Versionsgeschichte, nennt `sh tests/alle.sh` | Regel steht nirgends ausdrücklich (nur in den CLAUDE.md selbst) |
| Q-3 | `doku.mjs`: PROMPT-Versionszeile nennt alle Fassungen | Regel nur in §7 der Zusammenarbeit (‚Versionen vermerken‘) |
| Q-4 | `tests/messung.mjs` (Zeitzeile mit Gegenprobe) | in der Zusammenarbeit nicht als Prüfung genannt |
| Q-5 | `lauf-selbsttest.mjs`, `werkzeug/veroeffentlichen-selbsttest.mjs` | Prüfungen der Werkzeuge, keiner Regel zugeordnet |
| Q-6 | Reiselogbuch `link-name.mjs` (T-86), `ablauf-gesamt.mjs`, `ablauf-iphone.mjs`, `ablauf-abgleich-ui.mjs`, `ablauf-abspielen.mjs`, `pixelvergleich.mjs` | prüfen App-Verhalten aus PROMPT bzw. R-Regeln, nennen die Regel nicht |

Plan: jede dieser Prüfungen wird in der Tabelle der zugehörigen Datei (tests/README) **einer Regel zugeordnet**, Q-5 als
‚Werkzeug‘ gekennzeichnet.

---

## 7. Geplanter neuer Aufbau

**Grundsätze für alle Dateien:** nur was heute gilt (keine ‚seit X.Y‘, A-/T-/P-Nummern, ‚Nutzer TT.MM.‘, ‚Anlass‘, ‚vorher‘ –
alles, was noch nicht in der Versionsgeschichte steht, kommt dorthin); jede Regel an einer Stelle, sonst ein kurzer Verweis;
jede Regel nennt ihre Prüfung; Nummern bleiben.

### 7.1 Zusammenarbeit allgemein → 2.17.0

| Abschnitt | Inhalt |
|---|---|
| Kopf | Version, Zweck, ein Satz: ‚Abschnitt 0 ist das Arbeitsmodell, 1 die Sprache, 2 die genauen Formate.‘ Die drei Kästen oben entfallen (→ Nr. 21, 22, 8). |
| **0. Arbeitsmodell** | Nr. 1–20 behalten ihre Bedeutung (Verweise im Code). Neu: **Pflichten** Nr. 21 nie ohne Ja bauen · Nr. 22 erst prüfen, dann Neues; **Apple und Backlog** Nr. 23 Apple-like und Apple-Abgleich (aus §3) · Nr. 24 Backlog (aus §4) · Nr. 25 Ablauf einer Änderung (aus §5). §6 geht in Nr. 8 auf, §7 in Nr. 9 und 11, §8 in Designrichtlinie 11, §9 in Nr. 10. **Nr. 13 neu: Übergabe ab etwa 150.000 Token.** Jede Nummer endet mit ‚Prüfung: …‘ (automatisch oder ‚Selbstkontrolle‘). |
| **1. Sprache und Ton** | unverändert (ohne ‚seit‘). |
| **2. Formate** | 2.1 Rückfragen und Auswahlfenster · 2.2 Zeit und Token · 2.3 Bericht, Prüfpunkte und Rückmeldung · 2.4 Aufbau des Backlogs · 2.5 Übergabe und Starttext. (Abschnitt 2 bleibt – ‚Zusammenarbeit 2‘ im Code und in der Versionszeile zeigt weiter richtig.) |
| Zuordnung alt → neu | alte Abschnitte 2–9 → neue Stelle (für Verweise in CHANGELOG, VERLAUF und Code). |
| Versionsgeschichte | wie bisher, plus 2.17.0. |

Geschätzt: Regeltext 29.500 → **≈ 19.000**, gesamt 38.700 → **≈ 29.000** (−25 %).

### 7.2 Designrichtlinie allgemein → 4.28.2 (Abschnittsnummern 1–17 und 15.1–15.22 bleiben)

| Abschnitt | Änderung |
|---|---|
| Kopf | ohne Doppelungen mit 12 und 14; Hinweis für Claude nur noch: Regeln stehen in 17, alles andere sind Werte und Bauteile. |
| 1–10 | Werte und Gestaltung; Regeltexte, die im Katalog stehen, werden zu Verweisen (z. B. 7: ‚Liste steht still (R-7.3)‘ statt eines Absatzes Geschichte). |
| 11 | Versionen (aus Zusammenarbeit §8 und 12 zusammengeführt) und Aktualisierung. |
| 12 | Richtlinien pflegen – ohne Doppelungen mit Zusammenarbeit 0 Nr. 3/4; Rolle der App-Richtlinie nach F-5. |
| 13 | ‚Safari-Eigenheiten (technisch)‘: nur gemessene Eigenheiten mit Quelle (S-1 bis S-9 bleiben), ohne ‚berichtigt‘, ‚Vermutung war falsch‘. |
| 14 | Design-Repo: Inhalt, Einbindung, feste Fassung, Prüfen – einmal. |
| 15 | Komponenten: Zweck · Aufbau · Maße · Zustände · Technisch · Regel(n); Verhalten, das im Katalog steht, nur als Verweis. |
| 16 | HIG-Checkliste als Tabelle: HIG-Punkt · Apple-Link · Regel(n) · was darüber hinaus gilt · Prüfung; bewusste Abweichungen (dazu ‚Nach oben / Ans Ende auch am iPhone‘ aus der App-Richtlinie, weil allgemein). |
| 17 | Katalog: Spalten Nr. · Regel · Prüfung · Gerät · Abschnitt (statt ‚ersetzt‘); Regeltexte ohne ‚seit‘; Zuordnung alt → neu bleibt. Danach ‚Regeln ohne automatische Prüfung‘ (P-1 bis P-19, siehe F-8) – ohne R-Nummer. |

Geschätzt: Regeltext 102.700 → **≈ 76.000**, gesamt 121.800 → **≈ 98.000** (−20 %).

### 7.3 Reiselogbuch

| Datei | Änderung | geschätzt |
|---|---|---|
| `README - Designrichtlinie Reiselogbuch.md` → 3.26.2 | nach F-5: nur **Abweichungen** (Spaltenanteile der Ausgabe, Wetter 40 px, Maps-Links 19 px) und die Ausprägung des Abgleichs (Satz `labels` – Prüfung R-10.1); alles andere in PROMPT | 22.600 → ≈ 14.500 (Regeltext 11.800 → ≈ 3.500) |
| `PROMPT.md` | nach F-6: Funktionsbeschreibung in Abschnitten (Rahmen · Aufbau iPad · iPhone · Reisen · Hauptansicht · Erfassung · Abschluss · Ausgabe · Sicherheit · Texte und Icons), nur Reiselogbuch-Eigenes, allgemeine Regeln als Verweis (R-…), ohne ‚Seit 3.x‘, U-1 bis U-12 berichtigt; Kopf und Versionszeile bleiben (Skript, Prüfung) | 34.700 → ≈ 23.000 |
| `CLAUDE.md` → 3.6.0 | Zuerst lesen (bleibt), Verpflichtend nur als Verweis, App-spezifisch ohne Doppelung mit AppDesign-CLAUDE | 5.500 → ≈ 4.300 |
| `tests/README.md` | jede Prüfung mit ihrer Regel (Q-6), ohne ‚seit‘, U-14 | 6.700 → ≈ 5.500 |

### 7.4 AppDesign sonst

| Datei | Änderung | geschätzt |
|---|---|---|
| `CLAUDE.md` → 2.6.0 | übernimmt die dauerhafte **Arbeitsumgebung** aus UEBERGABE 5 (klonen, Verweise, Tests einrichten, Veröffentlichen) – nach F-9 | 3.300 → ≈ 5.000 |
| `UEBERGABE.md` | nur Sitzungsstand: Lagebild, Ergebnisse, nächster Schritt, Starttext; Ablage-Tabelle entfällt (steht in 0 Nr. 10) | 10.700 → ≈ 5.500 |
| `tests/README.md` | ohne ‚seit‘, U-15, Q-1 bis Q-5 zugeordnet | 9.300 → ≈ 7.000 |
| ReiseLogBuch-Import `CLAUDE.md` | nur Verweise prüfen: U-18 berichtigen (Abschnitt 0, 1 und 2.2) | gleich |

### 7.5 Summe

| | vorher | nachher (geschätzt) |
|---|---:|---:|
| alle Dateien im Umfang | 254.900 | **≈ 195.000 (−23 %)** |
| Lesestoff zu Beginn (UEBERGABE + Zusammenarbeit 0 und 1 + CLAUDE.md) | ≈ 30.000 | **≈ 22.000** |

### 7.6 Veröffentlichung (Schritt 3, nach F-10)

AppDesign **4.28.2** (Korrektur: keine neue Regel im Design, nur neu geordnet – Code ändert sich nur in den Versionsnummern, die
das Skript setzt) mit neuer Fassung `fassung/4.28.2/`; Zusammenarbeit **2.17.0** (Nebenversion wegen Nr. 13);
Reiselogbuch **3.26.2** auf Fassung 4.28.2 gehoben (Rückfrage 0 Nr. 10). Ein voller Prüflauf in `… los`, er muss unverändert
grün sein. Danach Abgleichliste (jede Regel und Vereinbarung alt → neu), Größe vorher/nachher, Bericht nach 0 Nr. 11, Übergabe.

---

## 8. Fragen (kommen einzeln im Auswahlfenster)

| Nr. | Frage | Empfehlung |
|---|---|---|
| F-1 | W-1: Übergabe-Grenze 150.000 auch im Werkzeug `messung.mjs` (eine Zahl, Werkzeug – nicht App, nicht Prüfung)? | **Ja**, sonst warnt die Zeitzeile erst bei 300.000 |
| F-2 | W-2: Auswahlfenster – kurze Frage ohne Erklärtext; **Ausnahme** jede Bitte, am Gerät zu prüfen: Link und nummerierte Schritte stehen auch im Fenster | **Ja** (neuere Regel 2.16.0 gilt) |
| F-3 | W-3: Übergabe – Claude schlägt sie vor, bei Ja schreibt Claude sie und startet die neue Sitzung selbst; der Starttext im Codeblock bleibt als Rückfall, falls das Starten scheitert | **Ja** (so lief 0025 → 0026) |
| F-4 | W-4: Sammelversion – neue Punkte gesammelt, 2–3 zusammengehörige, höchstens 2 Themen; **keine eigene Version für eine einzelne Kleinigkeit**; Korrekturen aus einer Prüfrunde sofort | **Ja** |
| F-5 | W-5: App-Richtlinie nur Abweichungen; Ausprägungen (Texte, Menüs, Leertexte …) wandern in PROMPT.md; Designrichtlinie 12 entsprechend | **Ja** (dein Grundsatz 3) |
| F-6 | PROMPT.md als gegliederte Funktionsbeschreibung statt Prompt-Codeblock ‚Baue mir …‘ | **Ja** |
| F-7 | Überholte Beschreibungen U-1 bis U-19 an den gebauten Stand angleichen (Code und neuere Version gelten) | **Ja** |
| F-8 | Regeln ohne Prüfung (P-1 bis P-19): im Katalog als Liste ‚ohne automatische Prüfung – Gerät/Sicht‘ führen, neue Prüfungen als Backlog-Punkt A-40 (Code, später) | **Ja** |
| F-9 | Arbeitsumgebung dauerhaft in AppDesign-CLAUDE.md, UEBERGABE nur Sitzungsstand | **Ja** |
| F-10 | Veröffentlichen als AppDesign 4.28.2 / Zusammenarbeit 2.17.0 / Reiselogbuch 3.26.2, Reiselogbuch auf Fassung 4.28.2 heben (nur Versionsnummern im Code) | **Ja** |
