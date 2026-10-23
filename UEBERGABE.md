# Übergabe an die nächste Sitzung

**Stand 23.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0036‘ (Ende, automatische Übergabe bei etwa 293.000 Token, 0 Nr. 13 – nach
Fall 31 von 35 der Fall-Liste Teil 2) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.29.0** online (Fassung 4.31.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.31.0** online (feste Fassungen 4.14.0–4.31.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0037**; die danach 0038.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15 (in 0036 beides richtig).
- **Offene Prüfpunkte:** keine.
- **‚0. Nächste Version‘ (voll, Nutzer sagte zum Bau ‚Nein‘):** AppDesign **A-61/2** + Reiselogbuch **T-99** (Blatt auf dem iPhone) und
  AppDesign **A-69** + Reiselogbuch **T-98** (Startposition) – als AppDesign 4.32.0 / Reiselogbuch 3.30.0.
- **Bereit für die Version danach:** AppDesign **A-43 Teil 1** + Reiselogbuch **T-100** (Barrierefreiheit: VoiceOver, Tastatur, Kontrast,
  Bewegung) – voraussichtlich 4.33.0 / 3.31.0.
- **In Arbeit:** **A-43 Teil 2 Textgröße** – Fall-Liste `arbeit/A-43 Teil 2 Fall-Liste.md`: Fälle **1–31 übernommen** (alle wie
  empfohlen), offen **P1–P4** (Fälle 32–35).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0036

- **Fall-Liste Teil 2 angelegt** (35 Fälle in 8 Gruppen R, G, A, L, U, B, W, P) und **alle Fälle vorab aufbereitet** (Wunsch des Nutzers, damit
  er nicht zwischen den Fällen warten muss): `arbeit/A-43 Teil 2 Aufbereitung.md` – je Fall Worum es geht, Aktuell, Apple-Standard, Meine
  Idee, Empfehlung, Alternative; dazu **Apples Tabelle wörtlich** (HIG Typography, 12 Stufen × 11 Stile mit Zeilenabstand).
- **Übernommen (Abschnitt 4 der Fall-Liste):** R1 neue Regel **R-1.10** ‚Textgröße folgt dem Gerät‘; G1–G6 (Grundgröße an `html` mit
  `-apple-system-body` nur bei Touch, Apples Tabelle wörtlich als Variablen je Stufe, `textStufe()` mit `ResizeObserver`, Zuordnung jeder
  Größe zu einem Stil – Standard sieht aus wie heute, kleine Stufen mit Feldern ≥ 16 px, keine Zeilenhöhe in px + Silbentrennung); A1–A3; L1–L4
  (Leisten bis 23 pt, iPhone quer fest 32 px, Titel einzeilig mit …, Großanzeige nicht nachgebaut); U1–U5 (Umbau ab 28 pt, iPhone hoch ab
  21; Tabellen als Kästen `.box`, Reiselogbuch-Tage am iPad ab AX1 als Kästen wie am iPhone); B1–B7; W1–W5.
- **Funde im Code** (in der Aufbereitung oben): `button { line-height: 20px }` (überlappt), feste Kapselhöhen 44, Platzhalter unter der Liste
  fest 100/120/150 px, feste Breiten (Menü 340, Sprechblase 320, Betragsfeld 130), `nowrap` ohne Kürzen (Seitenleisten-Titel, Datum der Kachel,
  Kasten-Titel am iPhone).
- **Gemessen:** Chromium und WebKit der Prüfumgebung kennen `-apple-system-body` nicht (Rückfall 17 px greift).
- **Gelernt (Format):** Der Fall muss **ganz am Anfang** der Antwort stehen – vor jedem Befehl; sonst sieht der Nutzer das Auswahlfenster vor
  dem Text (2.1). Ablauf je Fall: Nutzer schreibt **w** → Fall-Text → Auswahlfenster → eintragen, committen, Zeitzeile, ‚Schreib **w**‘.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **Fall-Liste Teil 2 zu Ende:** Fälle **32–35 (P1–P4)** wie in 0036 – Text je Fall aus `arbeit/A-43 Teil 2 Aufbereitung.md` (Abschnitte
   ‚Fall 32 von 35‘ bis ‚Fall 35 von 35‘) **am Anfang der Antwort**, dann Auswahlfenster (Übernehmen (Empfohlen) · Alternative · Nicht
   übernehmen · Ich schreibe im Chat), Antwort in Abschnitt 4 eintragen, committen, Zeitzeile, ‚Schreib **w** …‘. Mit dem ersten Fall gleich
   beginnen (nach dem Lagebild), nicht erst ‚w‘ abwarten.
2. Danach Abschnitte 1 und 2 der Fall-Liste an Abschnitt 4 angleichen (Spalte ‚Erwartet‘ statt ‚Vorschlag‘, Regeltext R-1.10 aus R1) und
   ‚Fall-Liste Teil 2 ok?‘ → A-43/2 im AppDesign-Backlog ‚bereit‘, App-Teil im Reiselogbuch-Backlog (U4, B5, B6, G4: 6 Größen) als neuer T-Punkt;
   Version erst nach Ja (0 Nr. 21), höchstens 2 Themen (0 Nr. 8).

## 4. Danach

A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen; Kollision Wegwischen hoch klären) · A-32 ‚Problem melden‘ · A-40 Prüfungen
für G-1 bis G-19 · A-44 bis A-60 · A-70 Mehrsprachfähigkeit · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0037 – A-43 Barrierefreiheit Teil 2 Textgröße: Fall-Liste P1–P4 und Abschluss

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild und mach mit A-43 Teil 2 weiter: Fälle 32–35 (P1–P4) der Fall-Liste arbeit/A-43 Teil 2 Fall-Liste.md, Text je Fall aus arbeit/A-43 Teil 2 Aufbereitung.md, je Antwort ein Fall – der Fall-Text steht ganz am Anfang der Antwort vor jedem Befehl, dann das Auswahlfenster; danach Abschnitte 1 und 2 angleichen und ‚Fall-Liste Teil 2 ok?‘.
```
