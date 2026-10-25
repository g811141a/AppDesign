# APD-2b – Testfall-Liste für APD-2 Schritte 3 und 4

**Stand 14.10.2026** · Sitzung ‚Reiselogbuch 0002 – APD-2 Schritte 3 und 4‘ · Zusammenarbeit allgemein 0 Nr. 1
(Testfall-Liste vor jedem Bau). Grundlage: `arbeit/APD-2 Verlauf-Abgleich.md` (F-4, W-1 bis W-8), `UEBERGABE.md` Abschnitt 3.
**Freigegeben 14.10.2026** (Testfall-Liste ja · S3: alle Wiederholungen durch Verweise · S4: Abschnitt 0 bleibt vorne, 1–9 mit Verweisen · Versionen wie unten). Noch nichts gebaut.

Jeder Fall wird ein automatischer Test (Spalte ‚Test‘); was nur das Gerät zeigt, kommt in die Testfälle (E).
Beide Schritte ändern nur Texte (Richtlinien, PROMPT, CLAUDE.md, Backlog-Köpfe) und Prüfskripte – die App sieht gleich aus.

## Befund beim Lesen (vor dem Bau)

- **Schon erledigt:** W-6 (Grundprinzipien nennen iPad **und** iPhone, Abschnitt 1); F-4 steht allgemein schon in
  R-6.4 und Abschnitt 10 – es fehlt nur in Abschnitt 7 (Vorschaufenster), und die App-Richtlinie wiederholt es.
- **W-8 nur halb erledigt:** der Code nennt seit 3.11.5 ‚Reisemittel‘ (`labels.transport`), die Designrichtlinie
  Reiselogbuch (Abschnitt ‚Abgleich‘) noch ‚Verkehrsmittel‘.
- **Neu gefunden – Versionen in PROMPT.md veraltet:** Kopf ‚Stand … Version 3.11.6‘, aber Zeile 3 nennt
  Reiselogbuch 3.11.4 · AppDesign 4.11.4 · Designrichtlinie Reiselogbuch 3.11.4 · Zusammenarbeit 2.0.0; Zeile 295
  ‚Designrichtlinie allgemein 3.0.0‘. **Warum übersehen:** `doku.mjs` (H-6) prüft die README-Tabelle und die Köpfe,
  nicht die Versionszeile von PROMPT.md.
- **W-7 steht an drei Stellen:** Designrichtlinie Reiselogbuch 3a (‚… auf diesem iPhone werden ersetzt.‘) und 5
  (‚Die aktuellen Daten … werden ersetzt.‘), PROMPT.md ‚SICHERHEIT‘ (‚Backup laden ersetzt nach einer Sprechblase …
  alle Daten‘). Seit 4.10.0 gilt die Abfrage mit den Kacheln Abgleichen/Ersetzen (R-9.2, 15.19).
- **Wiederholungen in der Designrichtlinie Reiselogbuch** (allgemein schon geregelt): 3a ‚Suche wie am iPad‘ (15.17),
  ‚Abfragen als Sprechblase‘ (R-4.3), 4 ‚Diktieren über die Mikrofon-Taste‘ und ‚erster Buchstabe groß‘ (R-5.2),
  3a ‚Vorschau seitlich wischen‘ (R-6.4), Backup-Kachel gelb/weiß (R-9.1).
- **Widersprüche zu Abschnitt 0 außerhalb der Zusammenarbeit:** CLAUDE.md AppDesign ‚Fragen … mit Antwortzeile‘;
  CLAUDE.md Reiselogbuch (2.1.0) ‚etwa 5 Punkte‘, Antwortzeile, ‚⏱ Gesamt mm:ss‘, Test nur `node tests/hig.mjs`,
  UEBERGABE.md fehlt; BACKLOG Reiselogbuch (Kopf) ‚etwa 5 Punkte‘.

## A. Schritt 3 – Allgemeines nach AppDesign

| Nr. | Fall | Änderung | Test |
|---|---|---|---|
| S3-1 | F-4 Vorschau: iPad quer (passt ganz), iPad hoch und iPhone hoch/quer (seitlich wischen), hell und dunkel (Vorschau bleibt hell), Daten lang (100 × ‚a‘) und viele Tage – kein Inhalt außerhalb der Tabelle | Abschnitt 7 ‚Vorschaufenster‘ verweist auf R-6.4; App-Richtlinie 3a: Satz streichen | `checkPreview` (R-6.4) und R-6.3 in `hig.mjs` – bestehend; Fall iPad hoch prüfen, ob er läuft, sonst ergänzen (erst rot, dann grün) |
| S3-2 | W-7 Backup laden: kein alter Text mehr (‚werden ersetzt‘, ‚ersetzt … alle Daten‘) in Richtlinie und PROMPT; die echte Abfrage zeigt die Kacheln | 3a, 5 und PROMPT ‚SICHERHEIT‘ → Verweis auf 15.19 / R-9.2 | neu in `doku.mjs`: Liste veralteter Sätze (rot vor dem Bau); `backup.mjs` – bestehend |
| S3-3 | W-8 Feldnamen: die Liste in der Designrichtlinie Reiselogbuch = `labels` in `index.html` | ‚Verkehrsmittel‘ → ‚Reisemittel‘ | neu in `doku.mjs`: Feldnamen der Richtlinie gegen `labels` (rot vor dem Bau) |
| S3-4 | Versionen in PROMPT.md: Zeile 3 und Verweise nennen die aktuellen Fassungen | Zeile 3 nachführen, ‚allgemein 3.0.0‘ → ohne Nummer | `doku.mjs` H-6 um PROMPT.md erweitern (rot vor dem Bau) |
| S3-5 | Wiederholungen: die App-Richtlinie enthält nur Abweichungen und Ausprägungen (Abschnitt 12) | Wiederholungen (siehe Befund) durch ‚(R-x.y)‘ ersetzen; Ausprägungen (Texte, Emojis, Spalten) bleiben | `checkCatalog` – jeder Verweis zeigt auf eine vorhandene Regel (bestehend) |
| S3-6 | Kein Punkt der App-Richtlinie ist allgemein und fehlt in AppDesign | Durchsicht; Kandidaten werden **erfragt** (0 Nr. 4), nicht selbst verschoben | Durchsicht (keine automatische Prüfung möglich) |

## B. Schritt 4 – Zusammenarbeit allgemein und CLAUDE.md

| Nr. | Fall | Änderung | Test |
|---|---|---|---|
| S4-1 | W-1 Korrekturen: Fehler aus einer Prüfrunde kommen sofort als Korrekturversion (X.Y.Z+1), vor Neuem – auch ohne Datenverlust | §6 ‚Sofort-Korrektur nur bei …‘ ersetzen | neu `checkCollab` in `doku.mjs`: Satz ‚nur bei schweren Fehlern‘ nicht mehr vorhanden |
| S4-2 | W-2 Antwortzeile: nur noch bei mehr als 4 Fragen; jedes Fenster hat ‚Ich schreibe im Chat‘ | §2 ‚Antwortvorschläge (Pflicht, immer beides)‘ neu fassen; CLAUDE.md beider Repos | `checkCollab`: ‚Antwortzeile‘ nur mit ‚mehr als 4 Fragen‘ |
| S4-3 | W-3 Muster: Erklärungen und Muster als Datei/Bild **vor** dem Fenster, im Fenster nur kurze Frage | §2 ‚Muster im Auswahlfenster‘ neu fassen | `checkCollab`: ‚direkt im Fragetext‘ nicht mehr vorhanden |
| S4-4 | Versionsgröße: 2–3 Punkte, höchstens 2 Themen (0 Nr. 8) – überall gleich | §6 ‚Wann fragen‘ (schon angepasst) prüfen; BACKLOG Reiselogbuch (Kopf) ‚etwa 5 Punkte‘ ersetzen | `checkCollab`: ‚etwa 5 Punkte‘ in keinem Backlog, keiner CLAUDE.md, keiner Zusammenarbeit (außer Versionsgeschichte) |
| S4-5 | Doppeltes in §1–9 und Abschnitt 0 zusammenführen (Testfälle selbst ableiten §7 ↔ 0 Nr. 1/5; allgemein oder App §5 Nr. 3 ↔ 0 Nr. 4; ‚Rückfragen‘ §2 ↔ 0 Nr. 7) | an einer Stelle Text, an der anderen Verweis | `checkCollab`: jeder Verweis ‚0 Nr. N‘ bzw. ‚Abschnitt N‘ zeigt auf eine vorhandene Stelle |
| S4-6 | Zeitzeile überall gleich: `⏱ mm:ss · Token vorige Antwort: …` | CLAUDE.md Reiselogbuch ‚Gesamt‘ streichen | `checkCollab`: Zeitzeile in CLAUDE.md = §2 |
| S4-7 | W-5 CLAUDE.md Reiselogbuch neu: zuerst UEBERGABE.md, dann Verweise auf AppDesign; nur App-Eigenes (Dateien, `APP_VERSION`/`APP_BUILT`/Cache, `?v=`-Einbindung R-10.3, `normalize`, Prüfung `sh tests/alle.sh`) | neu fassen (3.0.0) | `checkCollab`: ‚Zuerst lesen‘ beginnt mit UEBERGABE.md; kein Regeltext aus Zusammenarbeit wiederholt (verbotene Sätze); Versionsgeschichte vorhanden |
| S4-8 | CLAUDE.md AppDesign neu: UEBERGABE.md zuerst, Verweis statt Wiederholung, ohne ‚Antwortzeile‘ | neu fassen (2.0.0) | wie S4-7 |
| S4-9 | W-4 (‚4.x.y gilt sofort für alle Apps‘) bleibt bis APD-5 unverändert | – | – |

## C. Versionen und Kopplung

| Nr. | Fall | Test |
|---|---|---|
| V-1 | Versionen überall gleich: Richtlinie allgemein = README AppDesign = CHANGELOG = BACKLOG = `AD_VERSION` = `--ad-version` (entschieden: AD_VERSION steigt mit jeder AppDesign-Version) | `version.mjs`, `doku.mjs` |
| V-2 | Reiselogbuch: `AD_NEEDED` = neue AppDesign-Version, `?v=` in index.html und sw.js, README ‚Verwendete Versionen‘ (R-10.4), PROMPT Zeile 3, CHANGELOG | `version.mjs`, `doku.mjs` (mit S3-4) |
| V-3 | `v4/design.css` und `v4/ui.js`: nur Versionsnummer | `git diff` |

## D. Gesamtlauf (keine Rückschritte)

| Nr. | Fall | Test |
|---|---|---|
| Y-1 | Alle Tests des Reiselogbuchs grün (`sh tests/alle.sh`, AppDesign daneben) | `alle.sh` |
| Y-2 | `checkCatalog` grün: 34 Regeln mit Prüfung, keine alte Nummer | `doku.mjs` |
| Y-3 | Jede neue Prüfung (S3-2, S3-3, S3-4, S4-1 bis S4-7) einmal **rot** vor dem Bau, dann **grün** | Lauf vor und nach dem Bau |

## E. Nur am Gerät (Testfälle, ab /0)

- /0 Version prüfen: Versionszeile auf iPad und iPhone – App- und AppDesign-Version.
- Sonst kein sichtbarer Unterschied; keine weiteren Usertests nötig.

## Vorschlag Versionen

AppDesign 4.12.2 (Korrektur: Abschnitt 7 präzisiert, Prüfskripte; keine neue Regel) · Zusammenarbeit allgemein 2.2.0
(Neben: W-1 bis W-3 ändern Regeln) · Reiselogbuch 3.11.7 und Designrichtlinie Reiselogbuch 3.11.7 (Korrektur: Texte,
`AD_NEEDED`) · CLAUDE.md AppDesign 2.0.0, CLAUDE.md Reiselogbuch 3.0.0 (neu gefasst). Zwei Themen (Schritt 3, Schritt 4)
= Grenze nach 0 Nr. 8.

## Ergebnis (Bau 14.10.2026)

| Fall | Ergebnis |
|---|---|
| S3-1 | `regeln-ablauf.mjs` prüft die Vorschau jetzt auch iPad hoch und iPhone quer; mit nicht wischbarer Vorschau rot (iPad hoch, iPhone hoch und quer), dann grün; Abschnitt 7 verweist auf R-6.4 |
| S3-2 bis S3-4, S4-1 bis S4-8 | `checkCollab` (doku.mjs) vor dem Bau rot mit 23 Meldungen, danach grün |
| S3-5 | Wiederholungen in der Designrichtlinie Reiselogbuch durch Verweise ersetzt; `checkCatalog` grün |
| S3-6 | Durchsicht: kein weiterer allgemeiner Punkt in der App-Richtlinie (Spaltenanteile 28 : 28 : 22 : 22 bleiben bewusst App) |
| V-1 bis V-3 | 4.12.2 / 3.11.7 / 2.2.0 überall; `v4/` nur Versionsnummer |
| Y-1 bis Y-3 | `sh tests/alle.sh`: 17 Skripte ohne Fehler, HIG- und Regel-Prüfung ohne Abweichungen |
| Gefunden | `checkCatalog` prüfte die Zusammenarbeit nie (Eintrag im Kommentar) – behoben |
| E | Testfälle P-34 im CHANGELOG des Reiselogbuchs |
