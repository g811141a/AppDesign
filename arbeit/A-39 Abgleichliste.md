# A-39 Konsolidierung – Abgleichliste (Schritt 2)

Sitzung ‚Reiselogbuch 0026‘ · 21.10.2026. Jede Regel und jede Vereinbarung von vorher mit ihrer neuen Stelle. Abkürzungen:
**Z** = Zusammenarbeit allgemein (vorher 2.16.0, jetzt 2.17.0), **D** = Designrichtlinie allgemein (4.28.1 → 4.28.2),
**RL** = Designrichtlinie Reiselogbuch (3.26.1 → 3.26.2), **P** = Reiselogbuch `PROMPT.md`. Maschinell gegengeprüft: alle
Code-Namen, Texte in Anführungszeichen, Maße und Regelnummern der alten Fassungen stehen in der neuen (Ausnahmen nur Geschichte:
A-/T-/P-Nummern, ‚seit …‘, `?v=`, ‚kurze Seite‘).

## 1. Größe vorher → nachher (Zeichen)

| Datei | gesamt vorher | gesamt nachher | Regeltext vorher | Regeltext nachher |
|---|---:|---:|---:|---:|
| Z | 38.660 | 33.820 | 29.530 | 23.946 (−19 %) |
| – davon Abschnitte 0 und 1 (Lesestoff zu Beginn) | | | 13.882 | 12.312 (−11 %) |
| D | 121.845 | 120.658 | 102.727 | 100.570 (−2 %) |
| AppDesign `CLAUDE.md` (nimmt die Arbeitsumgebung auf) | 3.327 | 5.638 | 2.347 | 4.433 |
| AppDesign `UEBERGABE.md` | 10.717 | ≈ 5.000 (Schritt 4) | | |
| AppDesign `tests/README.md` (Regel je Prüfung) | 9.325 | 9.778 | | |
| RL | 22.588 | 14.148 | 11.797 | 2.494 (−79 %) |
| P | 34.686 | 20.092 (−42 %) | | |
| Reiselogbuch `CLAUDE.md` | 5.462 | 4.726 | 3.773 | 2.837 |
| Reiselogbuch `tests/README.md` (+ 7 fehlende Prüfungen) | 6.694 | 7.558 | | |
| Import `CLAUDE.md` | 1.643 | 1.714 | | |
| **Summe** | **254.947** | **≈ 223.000 (−13 %)** | **≈ 202.400** | **≈ 173.400 (−14 %)** |
| **Lesestoff zu Beginn** (UEBERGABE + Z 0 und 1 + AppDesign-CLAUDE) | ≈ 27.900 | ≈ 23.000 (−18 %) | | |

Ehrlich zum Plan (geschätzt −23 %): Die Designrichtlinie besteht fast nur aus Werten, Maßen und Bauteilen – echte Doppelungen gab
es wenig, und keine Regel durfte verloren gehen; dazu kamen die Liste G-1 bis G-19, die Spalte ‚Bau‘ und die HIG-Zuordnung. Gekürzt
hat vor allem die eine Stelle je Regel in der Zusammenarbeit, in der App-Richtlinie und im PROMPT.

## 2. Zusammenarbeit allgemein

| vorher (2.16.0) | jetzt (2.17.0) |
|---|---|
| Kasten ‚nie ohne Freigabe bauen‘ (fragen ‚Soll ich Version X.Y.Z …‘, kein Bau bei ‚korrigieren‘, bis dahin erklären/Backlog) | 0 Nr. 21 |
| Kasten ‚Sammelversionen‘ (‚0. Nächste Version‘, nie für ein oder zwei Kleinigkeiten) | 0 Nr. 8 – geklärt F-4: keine eigene Version für eine einzelne Kleinigkeit |
| Kasten ‚erst prüfen, dann Neues‘ (Hinweis, Ausnahme auf Wunsch) | 0 Nr. 22, Wortlaut des Hinweises 2.3 |
| Hinweis für Claude (UEBERGABE und Abschnitt 0 lesen) | Hinweis oben: Abschnitte 0 **und** 1 (U-17) |
| 0 Ziel (nichts vergessen …) | 0 Einleitung |
| 0 Nr. 1 Fall-Liste; ‚nicht ok‘ → Ablauf als feste Prüfung | 0 Nr. 1 (dazu aus §7: Fehler am Gerät → Prüfung schärfen, Lücke überall suchen, Grund im Bericht; Testfälle selbst ableiten) |
| 0 Nr. 2 parallel, sparsam, ein voller Lauf je Version | 0 Nr. 2 (dazu aus §7: alle automatisch prüfbaren Regeln, Geräte-Regeln in die Prüfliste) |
| 0 Nr. 3 Regeln schlank | 0 Nr. 3 (dazu aus §3: neue Regel mit Nummer und Prüfung, sonst ‚Gerät‘; neu: nur was heute gilt) |
| 0 Nr. 4 allgemeine Regel erfragen | 0 Nr. 4 (dazu §5 Nr. 3) |
| 0 Nr. 5 Safari nachbilden | 0 Nr. 5 (Einzelheiten D 13) |
| 0 Nr. 6 Varianten | 0 Nr. 6 (dazu §5 Nr. 2: hell und quer zuerst, Viererpakete) |
| 0 Nr. 7 Auswahlfenster | 0 Nr. 7, Format 2.1 |
| 0 Nr. 8 kleine Versionen, Korrekturen sofort | 0 Nr. 8 (dazu §6) |
| 0 Nr. 9 Veröffentlichungs-Skript | 0 Nr. 9 (dazu §7: Backlog, PROMPT/CHANGELOG, ‚fertig‘ erst nach Pages); Befehle AppDesign-`CLAUDE.md` |
| 0 Nr. 10 feste Fassung | 0 Nr. 10 (dazu §9 Ablage) |
| 0 Nr. 11 Bericht, Prüfpunkte im Chat, Link und Schritte im Fenster, Rückmeldungsfenster | 0 Nr. 11; Einzelheiten 2.3 und 2.1 (geklärt F-2) |
| 0 Nr. 12 ein Thema je Sitzung | 0 Nr. 12 |
| 0 Nr. 13 neue Sitzung selbst starten (300.000), Name, Opus 5.5, Aufwand | 0 Nr. 13 **mit 150.000**; Einzelheiten 2.5 (geklärt F-3) |
| 0 Nr. 14 Übergabe, Starttext als Codeblock, ‚Die Sitzung (Chat) ist damit beendet!‘ | 0 Nr. 14, 2.5 |
| 0 Nr. 15 neue Sitzung, gezielt lesen, Lagebild, Modell und Aufwand prüfen | 0 Nr. 15, Einzelheiten 2.5 (Nutzer fügt Starttext ein → Rückfall, F-3) |
| 0 Nr. 16 Übergabe statt Gedächtnis | 0 Nr. 16 |
| 0 Nr. 17 Rückmeldung kurz | 0 Nr. 17 |
| 0 Nr. 18 massiv widersprechen, Umsetzungspflicht | 0 Nr. 18 |
| 0 Nr. 19 Startfrage | 0 Nr. 19 |
| 0 Nr. 20 erst messen; Muster mit Messung | 0 Nr. 20; Muster mit Messung 2.7 |
| §1 Sprache und Ton (deutsch, per du, jede Meldung deutsch, Lucide-Namen) | 1 |
| §2 Rückfragen (Ja/Nein, a/b/c, nummeriert, Empfehlung) | 2.1 |
| §2 Auswahlfenster (bis 4 Fragen, Empfehlung zuerst, ‚Ich schreibe im Chat‘, nach geschlossenem Fenster wieder Fenster, Antwortzeile nur bei mehr als 4 Fragen) | 2.1 |
| §2 Zeit und Token (Werkzeug, Zeit, Token, Kontext, 300.000 ⚠) | 2.2 (⚠ bleibt im Werkzeug bei 300.000, F-1; Übergabe ab 150.000) |
| §2 Muster und Erklärungen vor dem Fenster | 0 Nr. 7, 2.1 |
| §2 Reihenfolge in einer Antwort | 2.1 |
| §3 Apple-like (Recherche, ‚So macht es Apple‘, Vorschläge, Web-Grenzen) | 0 Nr. 23 |
| §3 Apple-Abgleich vor jedem Muster; Apple-Review nach jeder Version | 0 Nr. 23, 2.6, 2.3 |
| §3 neue allgemeine Regel mit Nummer und Prüfung | 0 Nr. 3 |
| §3 Vergleichsbilder (`apple-referenz/`, README, verpixeln, Freigabe) | 2.6 |
| §4 Backlog (Datei, Aufbau 0./1./2./3./Erledigt, Weg, Priorität, neue Themen, sofort eintragen, Erinnerung) | 0 Nr. 24, 2.4 |
| §5 Ablauf einer Änderung Nr. 1–6 | 0 Nr. 25 (Nr. 2 Muster → 0 Nr. 6) |
| §6 Sammelversionen (wann fragen, Korrekturen sofort, Versionsnummer, eine Prüfrunde je Version) | 0 Nr. 8, 2.3, D 11 |
| §7 Testen und Prüfskript; Geräte-Regeln in die Prüfliste | 0 Nr. 2 |
| §7 Backlog nach der Version; PROMPT/CHANGELOG/Richtlinien; Versionen, SW-Cache | 0 Nr. 9, 2.4, D 11 |
| §7 hochladen, Pages, ‚Fertig erst nach Pages‘ | 0 Nr. 9 |
| §7 Versionen in der README | D 11, R-10.4 |
| §7 Bericht, Viererpakete, Neustart; ausdrücklicher Hinweis | 0 Nr. 11, 2.3, 0 Nr. 22 |
| §7 Prüfpunkte Schritt für Schritt; /0 Version prüfen; Meldung je Gerät | 2.3 |
| §7 Fehler am Gerät → Prüfung zuerst schärfen | 0 Nr. 1 |
| §7 Testfälle selbst ableiten | 0 Nr. 1, 5 |
| §8 Versionen dreistufig, eigene Nummer und Versionsgeschichte je Datei | D 11 |
| §9 Ablage, gemeinsame Bausteine, App-Spezifisches, keine Wiederholungen | 0 Nr. 10, D 12, D 14 |

## 3. Designrichtlinie allgemein

| vorher (4.28.1) | jetzt (4.28.2) |
|---|---|
| Kopf, Vorbild Apple, Hinweis für Claude | Kopf mit ‚Aufbau‘ (Regeln nur in 17), Vorbild Apple, Hinweis |
| 1 Grundprinzipien (alle Punkte) | 1; ‚Leisten stehen fest‘ technisch → 15.4 (nur `.side-list` rollt, `--vv-top`) und 15.22 (`overscroll-behavior`, Rahmen) |
| 2 Farben (Tabelle, Darstellung) | 2 (Darstellung als R-1.2) |
| 3 Schrift und Abstände | 3 (Hinweise 14 px, Zusatzzeilen 13 px – U-16) |
| 4 Schaltflächen (alle Punkte, Farben, Grundsatz, Hover, Nach oben/Ans Ende) | 4; Verhalten der Kapsel ‚Nach oben / Ans Ende‘ → 15.1; Abweichung von Apple → 16 |
| 5 Icons (Tabelle, Menü-Icons vorn) | 5 (dazu Messung und Offline-Icons aus 15.20/15.21) |
| 6 Begriffe | 6 |
| 7 Fenster (Aufbau, Breite, Escape, Liste steht still, Tastatur, ‚Neues …‘, Erfassung, Vorschau, Meldung, Technik) | 7; Technik ‚Liste steht still‘ → 15.9; Tastatur-Einzelheiten → 13 und R-4.5 |
| 8 Eingaben (alle Punkte) | 8 |
| 9 Tabellen | 9 |
| 10 Ausgabe, Teilen, Meldungen | 10 |
| 11 Versionen und Aktualisierung | 11 (dazu Z §8 und die Bedeutung bei Richtlinien aus 12) |
| 12 Designrichtlinien pflegen | 12 – App-Richtlinie nur Abweichungen, Ausprägungen in PROMPT.md (F-5) |
| 13 iPad-Erfahrungen (alle Punkte, S-1 bis S-9, Quellen) | 13 ‚Safari und iPad – technische Erfahrungen‘ (Drehen/Scroll-Anker, Position beim Öffnen, zwei Bereiche, Feld unter der Tastatur, Tastatur ohne Springen, Neustart); ‚Nach Updates App neu öffnen‘ → 11 |
| 14 Design-Repo | 14 (Veröffentlichen → Z 0 Nr. 9) |
| 15.1 bis 15.22 | 15.1 bis 15.22, Nummern gleich; ‚Backup laden = Abgleich‘ aus 15.4 → 15.18/15.19; Suche in der Liste 15.4 gekürzt um das, was R-2.3 sagt |
| 15.18 Fall-Tabelle 1–20 | 15.18 unverändert |
| 16 HIG-Checkliste 1–9, Abweichungen | 16 als Tabelle HIG-Punkt → Regel → ‚außerdem‘; Abweichungen + ‚Nach oben / Ans Ende auch am iPhone‘ (aus RL) |
| 17 Katalog R-1.1 bis R-10.4 | 17, jede Nummer gleich, Wortlaut ohne ‚seit‘; Spalte ‚Bau‘ statt ‚ersetzt‘ |
| 17 Spalte ‚ersetzt‘ | Zuordnung alt → neu (alte R-Nummern) und Absatz darunter (neu dazugekommene Regeln) |
| 17 R-50 → Zusammenarbeit 7 | R-50 → Zusammenarbeit 2.3 |
| Regeln außerhalb des Katalogs ohne Prüfung | 17 ‚Regeln ohne automatische Prüfung‘ G-1 bis G-19 (Plan P-1 bis P-19), Backlog A-40 (F-8) |

## 4. Reiselogbuch

| vorher | jetzt |
|---|---|
| RL Kopf (gilt allgemein 4.28.1, nur Abweichungen und Ausprägungen, ‚keine Abweichungen‘) | RL Kopf: nur Abweichungen; Ausprägungen in P |
| RL Hinweis für Claude (allgemein oder App fragen) | Z 0 Nr. 4 |
| RL 1 Begriffe | P 2 |
| RL 2 Icons und Emojis (inkl. 📍-Regel, Antippfläche 44) | P 2 und P 8 |
| RL 3 Hauptansicht (Seitenleiste, Kopfzeile, Menüs, Suche mehrere Wörter, Darunter, Tagestabelle, Abschluss) | P 4, P 6, P 9 |
| RL 3a iPhone | P 5 (Startreise berichtigt – U-12) |
| RL 4 Tageserfassung | P 7 |
| RL 5 Abfragen | P 2 (Abfragen) |
| RL 6 Neues Reiselogbuch / Einstellungen, Pflichtfelder, Meldungen | P 3 (Meldung bei Überschneidung berichtigt – U-11) |
| RL 7 Ausgabe (Inhalt, feste Spaltenanteile, Dateinamen) | P 10; feste Spaltenanteile = RL Abweichung 3 |
| RL Bewusste Abweichungen: Maps-Links 19 px, Wetter 40 px | RL Abweichungen 1 und 2 |
| RL Bewusste Abweichung: Nach oben / Ans Ende am iPhone | D 16 (allgemein) |
| RL Abgleich (Ausprägung, Feldnamen `labels`) | RL 2 (Feldnamen, Prüfung R-10.1) und P 11 (Ausprägung) |
| P Kopf, Versionszeile | P Kopf (Funktionsbeschreibung), Versionszeile unverändert im Format |
| P ZIEL (Beispiel) | P 1 |
| P RAHMEN (Geräte, Daten, offline, Deutsch, Pages, Darstellung, Aufbau) | P 1; Allgemeines → D (Verweise) |
| P RAHMEN Seitenleiste, Mehr-Menü, Kontextmenü, Suche über alle, Backup-Kachel, Kopfzeile | P 4, P 6, P 11 |
| P RAHMEN iPhone, ‚Seit 3.3.0‘ bis ‚Seit 3.19.0‘ | P 5 und Verweise auf R-… (Geschichte im CHANGELOG) |
| P RAHMEN Fenster, Sprechblasen, Fehlermeldungen, Pflichtfelder, 44 px, Textfelder, Kapseln, Suche, Drucken, Tastatur, Fensterbreite, Versionsnummern, Vorschau, Icons, Begriffe, Reset | allgemein → D 4–11 (Verweise); Reiselogbuch-Eigenes → P 2, 3, 6, 10 |
| P REISEN | P 3 |
| P HAUPTANSICHT (Tabelle, erster offener Tag, Kopfzeile, Nach oben, Filter, Fortschritt, fehlt, Suche, Apple-Look, Tabellendesign, hängender Einzug) | P 4 und P 6 (Treffer unter der Suchzeile – U-6; ⬆️⬇️ → Kapsel R-3.2 – U-5; Tabellenfarben → D 9 – U-7) |
| P ERFASSUNG Schritte 1–5, Smileys, Diktieren, Großbuchstaben, Von/Bis, Speichern, Blättern | P 7 (Options-Kapseln statt ‚Checkbox‘ – U-10); ‚erfasst‘ → P 4 (U-8) |
| P QUARTIER-SPALTE | P 8 (Link-Ende berichtigt – U-9) |
| P ABSCHLUSS | P 9 |
| P AUSGABE | P 10 |
| P SICHERHEIT | P 11 |
| RL CLAUDE.md: Zuerst lesen, Verpflichtend, App-spezifisch | `CLAUDE.md` 3.6.0: Zuerst lesen, Verweis auf Z und AppDesign-CLAUDE, App-spezifisch; Einrichten der Tests → AppDesign-CLAUDE |
| RL tests/README | jede Prüfung mit Regel bzw. P-Abschnitt; ergänzt: `ablauf-messung`, `ablauf-suche-iphone`, `ablauf-suche-liste`, `ablauf-suche-woerter`, `ablauf-tastatur-still`, `offline-regeln`, `verlauf-vorschlaege`; `?v=` berichtigt (U-14) |

## 5. AppDesign CLAUDE.md, UEBERGABE, tests/README, Import

| vorher | jetzt |
|---|---|
| CLAUDE.md Zuerst lesen, Verpflichtend, Technisch | CLAUDE.md 2.6.0 (gleich, Verweise auf Z 2.17.0) |
| UEBERGABE 5 Arbeitsumgebung (klonen, Verweise, flacher Klon, Import-Repo, `main` veraltet, Tests, Veröffentlichen, Zeit und Token) | AppDesign-CLAUDE ‚Arbeitsumgebung (Cloud)‘ (F-9); Zeit und Token Z 2.2 |
| UEBERGABE 6 Ablage | Z 0 Nr. 10, D 14; die neue Übergabe nennt nur noch, was die nächste Sitzung braucht |
| UEBERGABE Sitzungsgröße ‚künftig ab ~150.000‘ | Z 0 Nr. 13 |
| AppDesign tests/README (alle Absätze) | gleich, ohne ‚seit‘; `lauf.mjs` so viele wie Kerne (U-15); Tabelle mit Regel je Prüfung, dazu `messung.mjs`, `lauf-selbsttest.mjs`, Werkzeuge |
| Import CLAUDE.md: Verweis ‚Abschnitt 0 (per du, Zeit und Token)‘ | Abschnitte 0, 1 und 2.2 (U-18); Import 1.2.2 |
