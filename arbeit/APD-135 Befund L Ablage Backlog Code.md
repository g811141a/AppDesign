# APD-135 Befund L – Ablage, Backlogs und toter Code

**Stand 17.11.2026** · Sitzung 0122 · reine Lese-Analyse (Pakete 2 und 3: Ablage, Backlog, Code; Z-5 bis Z-11 aus
`arbeit/APD-135 Konsolidierung 3 Vorschlag.md`) · Stand der Repos: AppDesign 4.59.3 (Commit `87dc7fb`), Reiselogbuch 3.56.3 (`c3c9915`),
ReiseLogBuch-Import 1.3.0 (`c747fee`).

**Zählweise:** Alle Zahlen sind gemessen; die Skripte liegen im Notizordner unter `befund/l/` (`arbeit.mjs`, `verweise.mjs`, `verweise2.mjs`,
`archiv.mjs`, …), einzelne Befehle stehen beim Befund. ‚Lese-Token‘ = Bytes / 3,5 und ist immer eine **Schätzung**. Zeilennummern beziehen sich auf
den heutigen Stand. Fertige Befunde, auf die ich verweise statt sie neu zu erarbeiten: **C** (Prüfungen, Veröffentlichungs-Skript), **U** (ui.js,
Punkt 6 toter Code), **F** (Teil D Lesekosten, Teil E Import), **D** (Designregeln).

**Oberste Regel für alle Vorschläge:** Die Wahrscheinlichkeit eines Fehlers darf nicht steigen. Deshalb steht bei jedem Vorschlag, wer die Stelle heute
liest oder prüft. Gelöscht oder verschoben wird nichts ohne Rückfrage.

---

## Z-6 · Ordner `arbeit/` (AppDesign)

### L-1 · Befund · Bestand

- **360 Dateien, 14.388.076 Bytes (14,4 MB)** in 18 Ordnern (`find arbeit -type f | wc -l`, `du -sb arbeit`); 266 Dateien liegen direkt in `arbeit/`,
  94 in 14 Unterordnern.
- Nach Art (`arbeit.mjs`): md 202 (1,58 MB) · png 45 (**9,44 MB = 66 %**) · html 40 (0,85 MB) · txt 37 (1,05 MB) · mjs 29 (0,22 MB) · js 4 (0,93 MB) ·
  json 3 (0,32 MB).
- **Größte Dateien und Ordner:** `bilder/` 35 Dateien 6,47 MB · `muster-p32/` 4 PNG 1,50 MB · `RLB-121 Muster iPad quer 1–4.png` 1,41 MB ·
  `APD-115 Messungen/` 0,47 MB · `APD-36 Messungen/` 0,32 MB · `APD-135 Messung Daten.json` 287.021 Bytes · `APD-38 Framework-Vergleich.html`
  (größte HTML) · vier **Kopien von `ui.js`** in `APD-115/`, `APD-124/`, `APD-126/`, `APD-127/app/` (je etwa 232.000 Bytes, zusammen 931.574 Bytes) –
  Muster, die über GitHub Pages geöffnet werden. Größte Einzeldatei: `bilder/RLB-114 5 Variante A2 iPad hoch.png` (424.362 Bytes).

### L-2 · Befund · Themen und Status laut Backlog

Gruppiert nach der ersten Themennummer im Pfad (APD-n, RLB-n, P-n; sonst Sitzungsnummer bzw. Version), Status aus Spalte ‚Nr.‘ beider Backlogs
(`arbeit.mjs`). **110 Gruppen.** Die Befund-Dateien von heute und `0122 …` zählen zu **APD-135**.

| Status | Gruppen | Dateien | Bytes |
|---|---|---|---|
| unter ‚Erledigt‘ (mit Version) | 92 | 305 | 13.302.176 |
| in Klärung (APD-135, APD-62) | 2 | 16 (mit `0122 Lagebild.md`) | 765.772 |
| bereit (APD-30, APD-133) | 2 | 10 | 87.177 |
| nicht im Backlog: Sitzungen 0103–0118 (11), P-37, ‚4.57.0 Testfall-Liste‘ | 13 | 29 | 232.951 |

- Die 13 Gruppen ohne Backlog-Zeile sind alle abgeschlossen: Lagebilder, Bau-Fragen und Berichte vergangener Sitzungen; `P-37 Rückmeldung.md` gehört
  zur Korrektur APD 4.14.2 (Backlog Z. 223); `4.57.0 Testfall-Liste.md` zu APD-124/APD-126 (erledigt 4.57.0).
- **Größte erledigte Themen:** RLB-121 (17 Dateien, 2,05 MB), APD-43 (16, 1,98 MB), RLB-114 (8, 1,86 MB), P-32 (5, 1,51 MB), APD-97 (6, 1,09 MB),
  APD-115 (16, 0,89 MB). Offen sind nur **APD-135, APD-62, APD-30, APD-133** (26 Dateien, 0,85 MB = 6 %).
- APD-38 (Frameworks) und APD-26 stehen unter ‚Erledigt‘ mit Version ‚–‘ (entschieden bzw. entfällt).

### L-3 · Befund · Wer liest oder prüft `arbeit/` heute

- **Zu Beginn einer Sitzung liest Claude `arbeit/` nicht** (CLAUDE.md ‚Zuerst lesen‘ nennt nur UEBERGABE, Zusammenarbeit, Überschriften). Einzelne Dateien
  werden über Verweise aus `UEBERGABE.md` (8 Verweise, Z. 39–89) oder dem Backlog gezielt geöffnet.
- **`tests/doku.mjs` `checkSchema` (Z. 265–363), Teil APD-78/S-9, Z. 318–320:** liest **jede** per `git ls-files` gelistete Textdatei der drei Repos (ohne
  `fassung/`, `Messungen/`, `messungen/`, Bilder, JSON, `ZUORDNUNG.md`, `werkzeug/umbenennen.mjs`, die zwei APD-78-Protokolle – Z. 274–275) und meldet
  jeden Verweis `arbeit/<Name>.(md|html|mjs|txt|png|jpg)`, dessen Datei in `AppDesign/arbeit/` fehlt (Platzhalter mit ‚…‘, ‚<‘, ‚APD-n‘, ‚X.Y‘ ausgenommen;
  `%20` wird über `fileURLToPath` aufgelöst). Gegenprobe Z. 292. Heute **grün**: alle 33 scheinbar toten Ziele sind Platzhalter, `%20`-Schreibweisen
  oder stehen in ausgenommenen Dateien (`ZUORDNUNG.md` 133 Verweise auf alte Dateinamen aus der Zeit vor APD-78, APD-78-Protokolle).
- Dieselbe Funktion liest dabei die `arbeit/`-Dateien selbst (S-1, S-2, S-3, S-7, S-9): **277 der 312 gelesenen AppDesign-Dateien, 3.723.847 von
  5.746.653 Bytes (65 %)** (Befehl: `git ls-files … | grep -v <daten/historisch>` → `befund/l/schema-dateien.txt`, `xargs cat | wc -c`). Die Laufzeit von
  `doku-regeln` ist trotzdem **0,0 min** (`arbeit/APD-135 Messung Laufzeiten und Abdeckung.md` Z. 81).
- **Verweise `arbeit/…` in lebenden Dateien:** 954 auf 283 Ziele (`verweise.mjs`): CHANGELOG AppDesign 138, CHANGELOG Reiselogbuch 61, `ZUORDNUNG.md` 133
  (ausgenommen), Prüfungen AppDesign 81 und Reiselogbuch 55 (fast nur Kommentare – ‚Testfall-Liste arbeit/…‘), Werkzeug 16, `v4/ui.js` 15, `v4/design.css` 2,
  `ReiseLogBuch/index.html` 1 (Z. 624), BACKLOG AppDesign 32 (18 unter ‚Erledigt‘) und Reiselogbuch 3, Designrichtlinie 23 (9 in der Versionsgeschichte,
  14 im Text als **Beleg einer Messung**, z. B. Z. 495, 500, 515, 546), Zusammenarbeit 11 (10 Versionsgeschichte), `UEBERGABE.md` 8, `VERLAUF.md` 7, Import 3,
  in `arbeit/` selbst 365.
- **Einziger Verweis im ausführbaren Code:** `tests/regelwaechter.mjs` Z. 162 (Pages-Adresse `…/AppDesign/arbeit/APD-30%20Muster.html`, Regelwächter
  abgeschaltet) und `werkzeug/umbenennen.mjs` Z. 38 (historisch). Alle anderen Treffer in `tests/`, `werkzeug/`, `v4/` sind Kommentare – oft als Beleg
  für ein Safari-Verhalten (z. B. `tests/safari.mjs` Z. 193, 247, 321 auf `arbeit/APD-129/messung-…txt`).
- **Muster laden alte Fassungen:** 28 Dateien in `arbeit/` binden `../fassung/X.Y.Z/` bzw. `../../fassung/X.Y.Z/` ein (4.25.0, 4.27.1, 4.32.2, 4.33.0, 4.48.0,
  4.48.1, 4.49.1, 4.50.0, 4.53.0, 4.54.0, 4.56.0, 4.57.0) – `grep -l -E '\.\./(v4|fassung)/' -r arbeit`. 21 Stellen in `arbeit/` und eine Prüfung nennen
  Pages-Adressen in `arbeit/` (`grep -rc 'github.io/AppDesign/arbeit'`).
- In den festen Fassungen stehen **2.365 Verweise** `arbeit/…` in 601 Dateien (Kopien von Prüfungen, Designrichtlinie, Zusammenarbeit), die nie mehr
  geändert werden dürfen (`grep -rho 'arbeit/…' fassung | wc -l`).

### L-4 · Vorschlag · Kein Umzug erledigter Dateien in `arbeit/archiv/`

- **Was:** Ein Unterordner `arbeit/archiv/` (oder je Thema) für die 305 Dateien erledigter Themen würde die Übersicht verbessern – aber:
- **Wer liest/prüft es heute:** Auf diese 305 Dateien zeigen **380 Verweise aus 57 Dateien außerhalb von `arbeit/`** (CHANGELOG 186, Prüfungen 118, Regeln 36,
  BACKLOG 18, `v4/` und `index.html` 16, Werkzeug 15, VERLAUF 7) und 310 aus `arbeit/` selbst (`archiv.mjs`). `checkSchema` S-9 (doku.mjs Z. 318–320) würde
  jeden nicht nachgezogenen Verweis rot melden – das ist gut (kein stiller Bruch), heißt aber: 16 Kommentare in `v4/ui.js`/`design.css` und 118 in `tests/`
  müssten geändert werden → **neue AppDesign-Fassung und voller Prüflauf** (R-10.3; Änderung an `tests/` → voll, Befund C Abschnitt 6). Nicht prüfbar und nicht
  änderbar: 2.365 Verweise in `fassung/`, die Pages-Links zu Mustern in alten Chats und Changelogs und die relativen Pfade `../fassung/…` in 28 Mustern
  (eine Ebene tiefer → Muster ohne CSS).
- **Einsparung:** **keine Lese-Token** (`arbeit/` wird zu Beginn nicht gelesen); Laufzeit `doku-regeln` heute 0,0 min. Gewinn nur Übersicht.
- **Risiko:** **mittel** – viele Pfadänderungen in Code-Kommentaren und Prüfungen für einen Gewinn ohne Messwert; Pages-Links brechen still.
- **Empfehlung:** nicht umziehen. Falls Ordnung gewünscht: **nur neue** Dateien ab sofort in `arbeit/APD-n/` je Thema (bricht nichts, Muster brauchen dort
  `../../fassung/`); bestehende bleiben.
- **Nachweis:** stand in `arbeit/<Name>` → bliebe dort → geprüft durch `checkSchema` S-9.

### L-5 · Vorschlag · Lagebilder, Bau-Fragen und Berichte vergangener Sitzungen

- **Was:** 46 Dateien mit Sitzungsnummer (160.671 Bytes), davon 28 Lagebild/Bau-Frage/Bericht/Stand (104.405 Bytes). Nur 9 werden von außen genannt
  (Designrichtlinie Versionsgeschichte Z. 1431–1432, Zusammenarbeit Z. 399, CHANGELOGs); 37 nie mit Pfad.
- **Wer liest/prüft es heute:** niemand außer `checkSchema` (S-1/S-2/S-7 auf ihren Text). `UEBERGABE.md` verweist nur auf die laufende Sitzung.
- **Vorschlag:** Die Regel für Lagebild-Dateien (Zusammenarbeit 0 Nr. 15, Kasten Punkt 4 ‚Datei vor jeder Kachel‘) so lassen; nach Abschluss einer Version
  bleiben sie liegen – sie sind klein. **Löschen nur mit Rückfrage**, nur die 37 nie genannten (Liste: `befund/l/arbeit.json`, Feld `files`, Präfix `01…`).
- **Einsparung:** höchstens etwa 120.000 Bytes Repo, **keine Lese-Token**. **Risiko:** gering (Belege für Entscheidungen gehen verloren, wenn ein Bericht doch
  irgendwo ohne `arbeit/`-Pfad genannt wird – Vermutung, nicht gesucht).
- **Nachweis:** stand in `arbeit/01xx …` → entfiele → `checkSchema` S-9 meldet, falls doch ein Verweis bestand.

---

## Z-7 · Ordner `fassung/`

### L-6 · Befund · Bestand und was sich je Fassung ändert

- **69 Fassungen** (4.14.0 bis 4.59.3) mit **1.378 Dateien, 55.916.025 Bytes** (plus `PRUEFSUMMEN`, 1.378 Zeilen; `du -sb fassung` = 56.043.259) –
  `befund/l/fassung-groessen.txt`. Kleinste 4.14.0 (230.203 Bytes, 13 Dateien, noch ohne Richtlinientexte), größte 4.59.3 (1.419.617 Bytes, 22 Dateien).
- Inhalt von 4.59.3 (`fassung.mjs`): Designrichtlinie 220.911 · Zusammenarbeit 55.557 · `design.css` 89.043 · `ui.js` 244.451 · `tests/` 18 Dateien, davon
  `ablauf.mjs` 380.317 und `hig.mjs` 120.456.
- **Byte-gleich zur Vorgängerin sind nur 30,4 %** der Bytes (16,9 von 55,7 MB ab der zweiten Fassung) – weil `ui.js` (`AD_VERSION`) und `design.css`
  (`--ad-version`) sich in **jeder** Fassung ändern (je ±4 Zeilen, wenn sonst nichts geändert ist) und die Richtlinientexte fast immer. Im Mittel ändern sich
  **6,3 von etwa 22 Dateien** je Fassung.
- **Stichprobe der letzten Schritte** (geänderte Dateien / Dateien, Zeilen ±):
  4.57.0→4.58.0: 4/22 (Designrichtlinie ±3, Zusammenarbeit ±16, `design.css` ±4, `ui.js` ±4 – nur Text und Versionsnummer) ·
  4.58.0→4.59.0: 4/22 (`tests/ablauf.mjs` ±40, `ui.js` ±42) · 4.59.0→4.59.1: 4/22 (`tests/safari.mjs` ±38, `ui.js` ±9) ·
  4.59.1→4.59.2: 6/22 (`safari.mjs` ±32, `messung.mjs` ±16, `ui.js` ±27) · 4.59.2→4.59.3: 11/22 (7 Prüfdateien, `ui.js` ±13).
- Im Git-Speicher kosten unveränderte Dateien nichts (gleiche Blobs); der flache Klon (50 Commits) hat 14,46 MiB Pack (`git count-objects -vH`). GitHub Pages
  veröffentlicht dagegen den ganzen Arbeitsbaum (56 MB Fassungen + 14,4 MB `arbeit/`).

### L-7 · Befund · Wer lädt oder nennt welche Fassung

- **App:** `ReiseLogBuch/index.html` Z. 14 und 137 (`../AppDesign/fassung/4.59.3/…`), `AD_NEEDED = '4.59.3'` Z. 148; `sw.js` Z. 6 (`FILES` mit derselben
  Fassung), Z. 53 (alles unter `/AppDesign/fassung/` **zuerst aus dem Speicher**, sonst Netz). `vorlage/index.html` Z. 13, 23: `../fassung/4.59.3/`.
- **Prüfungen der App:** 171 Importe `../../AppDesign/fassung/4.59.3/tests/…`; dazu **alte** Fassungen als Gegenprobe: `tests/ablauf-feld-cursor.mjs` Z. 33
  (`fassung/4.56.0/ui.js`), `tests/ablauf-feld-rollen.mjs` Z. 47 (`fassung/4.55.0/ui.js`), `tests/regeln-ablauf.mjs` Z. 23 (`fassung/4.56.0/ui.js`).
  Gegenproben ‚gegen 3.45.0 mit `PRUEF_APP=../_alt.html`‘ (z. B. `ablauf-beruehren.mjs` Z. 8, `ablauf-glas.mjs` Z. 7, `pixelvergleich.mjs` Z. 2) legen eine
  **alte `index.html`** daneben – die lädt ihre alte Fassung (bei 3.45.0: 4.47.0).
- **Werkzeuge:** `tests/version.mjs` `checkFassungen` (Z. 35–55) prüft **alle** Fassungen gegen `PRUEFSUMMEN` (eine fehlende Fassung, die noch in
  `PRUEFSUMMEN` steht, wird rot: Z. 45) und `AD_VERSION`/`--ad-version` jeder Fassung (Z. 52); `fassungListe` Z. 27; `veroeffentlichen.mjs` Z. 53 (`online`),
  75–83 (Fassung anlegen, `PRUEFSUMMEN`), 102, 108–132 (Pfade umschreiben), 297, 305, 331, 361. Siehe Befund C Abschnitt 5.
- **README-Tabellen:** ReiseLogBuch-`README.md` Z. 16–17 (4.59.3, Links auf `fassung/4.59.3/…`); AppDesign-`README.md` Z. 30, 37 (Beispiel mit 4.14.0).
- **Weitere Nennungen** (außerhalb `fassung/`, `grep -rhoE 'fassung/4\.[0-9]+\.[0-9]+'`): 39 verschiedene Fassungen, u. a. 4.14.0 (15), 4.56.0 (25),
  4.54.0 (11); CHANGELOGs mit Links (AppDesign 23 Zeilen, Reiselogbuch 6); **28 Muster in `arbeit/`** laden 12 alte Fassungen (L-3).

### L-8 · Vorschlag · Alte Fassungen behalten (kein Löschen)

- **Was:** Fassungen löschen würde Repo- und Pages-Größe sparen (z. B. 4.14.0–4.53.0: 61 Fassungen), aber:
- **Wer könnte alte Fassungen laden:** (1) Ein Gerät mit installierter älterer App: `sw.js` holt `index.html` zuerst aus dem Netz mit Frist 3 s (`FRIST`,
  Z. 11, 55–64); läuft die Frist ab, kommt die **gespeicherte alte** `index.html`, die ihre alte Fassung lädt – aus dem Speicher (Z. 53), bei geleertem
  Speicher (iOS räumt Website-Daten nach längerer Nichtnutzung, Vermutung zum genauen Zeitpunkt) **aus dem Netz**. Fehlt die Fassung auf Pages, startet die alte
  App ohne Bausteine – Weißseite statt ‚Neue Version wird geladen‘ (index.html Z. 153 braucht `ui.js`). (2) Gegenproben mit `_alt.html` und die drei
  Prüfdateien mit festen alten Fassungen (L-7). (3) 28 Muster in `arbeit/`. (4) Links in CHANGELOGs und Versionsgeschichten auf Richtlinientexte in alten
  Fassungen. (5) `checkFassungen` – `PRUEFSUMMEN` müsste mitgekürzt werden.
- **Einsparung:** **keine Lese-Token** (Claude liest `fassung/` nie; `checkSchema` nimmt sie aus, doku.mjs Z. 275); Laufzeit `version-regeln` 0,1 min
  (Messung Z. 80). Nur Speicher: bis etwa 45 MB auf Pages.
- **Risiko:** **hoch** für (1) – ein Fehler auf einem Gerät, den keine Prüfung sieht; widerspricht R-10.3 (‚jede Version liegt unveränderlich‘).
- **Empfehlung:** nichts löschen. Falls Pages-Größe einmal stört (Grenze 1 GB, heute etwa 72 MB für beide Ordner), zuerst nur Fassungen ohne jede Nennung
  und älter als die älteste noch denkbare App-Version auf einem Gerät – das kann nur der Nutzer beurteilen.
- **Nachweis:** stand in `fassung/X.Y.Z/` → bliebe → `checkFassungen` (version.mjs Z. 35–55).

### L-9 · Vorschlag · Kleinere Fassungen ohne Richtlinientexte? – nein

- **Was:** Die Texte (Designrichtlinie + Zusammenarbeit, je Fassung etwa 276.000 Bytes, seit 4.14.1) machen etwa 20 % einer Fassung aus.
- **Wer liest es heute:** `checkDocs` (doku.mjs Z. 30, 40–43) verlangt, dass README-Links der App auf die Texte **in der Fassung** zeigen; `adText` liest die
  Zusammenarbeit-Version aus der Fassung (Z. 30, 166). `tests/version.mjs` `TEXTE` (Z. 21) kopiert sie.
- **Einsparung:** etwa 276.000 Bytes je künftiger Fassung, keine Lese-Token. **Risiko:** mittel (Codeänderung an Prüfung und Werkzeug, Version-Links in der App).
  **Empfehlung:** lassen.
- **Nachweis:** stand in `fassung/X.Y.Z/README - …` → bliebe → `checkDocs`.

---

## Z-8 · `VERLAUF.md`, `ZUORDNUNG.md`, CHANGELOGs

### L-10 · Befund · Größe und wer liest was (Funktion, Zeile)

| Datei | Bytes | Zeilen | wer liest es (Code) | wie viel |
|---|---|---|---|---|
| `AppDesign/VERLAUF.md` | 183.967 | 1.899 | nur `checkSchema` (doku.mjs Z. 276–278, als lebende Datei für S-1, S-2, S-7, S-9) | ganz |
| `AppDesign/ZUORDNUNG.md` | 43.907 | 581 | `checkSchema` S-5 (Z. 281, 333–345: Abschnitte 2–6 alt → neu gegen Backlog), S-6 (Z. 350–356: Abschnitt 8 ‚nie vergeben‘); von S-1 bis S-9 ausgenommen (Z. 274); `werkzeug/umbenennen.mjs` Z. 26 (historisch) | ganz |
| `AppDesign/CHANGELOG.md` | 216.243 | 2.221 | `checkSchema` (ganz); `veroeffentlichen.mjs` Z. 296 (sucht ‚## X.Y.Z – ‘ in der ganzen Datei) | ganz bzw. Kopfzeile der neuen Version |
| `ReiseLogBuch/CHANGELOG.md` | 391.213 | 5.145 | `checkDocs` doku.mjs Z. 57–68 (**nur die neueste Version**: `split(/\n## /)[1]`, ‚Testfälle P-n‘, /0, Schritte, ‚Erwartet‘); `veroeffentlichen.mjs` Z. 301–304 (nur neueste); `checkSchema` (ganz) | neueste bzw. ganz |

(`wc -c -l`; grep nach `VERLAUF`, `ZUORDNUNG`, `CHANGELOG` in `tests/`, `werkzeug/` beider Repos und im Import-Werkzeug, Kommentare ausgenommen.) Die App
lädt kein CHANGELOG (`index.html` nennt es nur im Kommentar Z. 143); die README-Tabelle verlinkt die Datei ohne Anker (ReiseLogBuch-README Z. 15–16).

- **CHANGELOG nach Einträgen** (Skript in der Zeile oben, `split(/\n(?=## )/)`): AppDesign 92 Einträge – neuester 4.911 Bytes, die 10 neuesten 31.839,
  der Rest 184.097 (85 %); Reiselogbuch 108 Einträge – neuester 3.737, die 10 neuesten 49.938, der Rest 340.479 (87 %).
- **VERLAUF.md** ist eingefroren: Titel ‚04.10.–14.10.2026‘, Grundlage für APD-2 (erledigt 4.12.2); keine Regel verlangt, ihn zu lesen (AppDesign-README Z. 14
  beschreibt ihn nur).
- **Was Claude lesen muss:** zu Beginn keine der vier Dateien (Zusammenarbeit 0 Nr. 15 Z. 153: ‚CHANGELOG … nur, soweit die Aufgabe es braucht‘). Während
  einer Version: den neuesten CHANGELOG-Eintrag (Testfälle, Usertest im Chat nach 0 Nr. 11) und beim Schreiben den Kopf; `ZUORDNUNG.md` nur bei einer alten
  Nummer. **Vermutung:** Ein `Read` ohne Bereich lädt bis 2.000 Zeilen – beim Reiselogbuch-CHANGELOG etwa 152.000 Bytes (≈ 43.000 Token, Schätzung), beim
  AppDesign-CHANGELOG fast die ganze Datei; gezielt (`limit`) sind es 4.000–5.000 Bytes.

### L-11 · Vorschlag · Ältere CHANGELOG-Einträge in eine Archivdatei

- **Was:** In beiden Repos alles unterhalb der etwa 10 neuesten Einträge nach `CHANGELOG bis X.Y.Z.md` (z. B. AppDesign bis 4.52.0, Reiselogbuch bis 3.50.1)
  verschieben; im CHANGELOG am Ende ein Satz ‚Ältere Versionen: `CHANGELOG bis X.Y.Z.md`‘. Später je Hauptversion oder je 50 Einträge nachschieben.
- **Wer liest/prüft es heute:** `checkDocs` Z. 57–68 und `veroeffentlichen.mjs` Z. 301–304 lesen nur den neuesten Eintrag – **bleiben grün**.
  `veroeffentlichen.mjs` Z. 296 sucht die **neue** Version – grün. `checkSchema` liest die neue Datei als lebende Datei (Name passt nicht auf das Muster `doku`,
  Z. 297: `CHANGELOG\.md$` – **S-1 würde in der Archivdatei nicht mehr laufen**, S-2/S-4/S-7/S-9 schon). Verweise ‚CHANGELOG 4.36.0‘ in Regeln und Kommentaren
  nennen keine Datei-Zeile – sie zeigen dann in die Archivdatei (Mensch muss dort suchen).
- **Einsparung:** AppDesign etwa 184.000 Bytes, Reiselogbuch etwa 340.000 Bytes aus der Datei, die bei jeder Version geöffnet wird – **nur wirksam, wenn
  Claude heute ohne `limit` liest** (dann bis etwa 43.000 Token je Lesen, Schätzung). Kein Gewinn beim Prüflauf.
- **Risiko:** **gering** – keine Prüfung liest alte Einträge; einzige Lücke S-1 in der Archivdatei (unkritisch, Text ändert sich nicht mehr). Würde rot:
  nichts (nach Lesen des Codes; nicht ausgeführt). Name besser `CHANGELOG-archiv.md`? – dann passt er ebenfalls nicht auf `doku`; wenn S-1 bleiben soll:
  `doku`-Muster in doku.mjs Z. 297 um `CHANGELOG[^/]*\.md` erweitern (Codeänderung → neue Fassung).
- **Nachweis:** stand in `CHANGELOG.md` unten → steht dann in `CHANGELOG bis X.Y.Z.md` → geprüft durch `checkSchema` S-2/S-4/S-7/S-9 (dort) und `checkDocs`
  (neuester Eintrag, unverändert).
- **Billigere Alternative ohne Umzug (Risiko keins):** in der Zusammenarbeit 0 Nr. 15 bzw. 2.3 ‚CHANGELOG nur den neuesten Eintrag lesen (bis zur zweiten
  ‚## ‘-Zeile)‘ – spart dasselbe, ändert keine Datei außer dem Regeltext (Wortlaut-Ja nötig).

### L-12 · Vorschlag · `VERLAUF.md` nach `arbeit/` verschieben – nicht lohnend

- **Was:** VERLAUF ist Geschichte (APD-2) und liegt in der Wurzel neben den Regeldateien.
- **Wer liest/prüft es heute:** nur `checkSchema` (lebende Datei); Nennungen: AppDesign-README Z. 14, BACKLOG Z. 234 (Erledigt APD-4), `ZUORDNUNG.md` Z. 300–304,
  488, 494–495 (Zeilennummern in VERLAUF!), Zusammenarbeit Z. 373.
- **Einsparung:** 0 Lese-Token (wird nicht gelesen), 1 Datei weniger in der Wurzel. **Risiko:** gering, aber die Zeilenangaben in `ZUORDNUNG.md` müssten
  den neuen Pfad nennen; `ZUORDNUNG.md` prüft das nicht (Z. 274 ausgenommen). **Empfehlung:** lassen.
- **Nachweis:** stand in `VERLAUF.md` → bliebe → `checkSchema`.

### L-13 · Befund · `ZUORDNUNG.md` bleibt nötig

- `checkSchema` S-5 und S-6 lesen Abschnitte 2–6 und 8 (doku.mjs Z. 333–356); ohne die Datei meldet Z. 281 ‚ZUORDNUNG.md fehlt‘. Abschnitt 8 (‚nie vergeben‘)
  verhindert eine Lücke in den Themennummern (S-6, Z. 355). Die 133 Verweise auf alte `arbeit/`-Namen (vor APD-78) sind beabsichtigt (Tabelle alt →
  neu) und von S-9 ausgenommen. **Kein Vorschlag**; Lesekosten nur bei Bedarf.

---

## Z-5 · Lesekosten zu Beginn (nur messen)

Gemessen mit einem node-Einzeiler, der an jeder Zeile `^## ` teilt (Bytes UTF-8, Zeilen von–bis); Vorschläge dazu stehen in **Befund F** (F-26 bis F-29) –
hier nur die Zahlen und was dort fehlt.

### L-14 · Befund · Teile der Zusammenarbeit und der drei `CLAUDE.md`

| Datei · Teil | Zeilen | Anzahl | Bytes | Anteil | Lese-Token (Schätzung) |
|---|---|---|---|---|---|
| Zusammenarbeit · Kopf | 1–14 | 14 | 729 | 1,3 % | 208 |
| Zusammenarbeit · 0 Arbeitsmodell (darin Kasten Z. 17–35: 1.913 Bytes) | 15–191 | 177 | 16.792 | 30,2 % | 4.798 |
| Zusammenarbeit · 1 Sprache und Ton | 192–205 | 14 | 618 | 1,1 % | 177 |
| Zusammenarbeit · 2 Einzelheiten und Formate | 206–368 | 163 | 14.577 | 26,2 % | 4.165 |
| Zusammenarbeit · Zuordnung alt → neu | 369–390 | 22 | 969 | 1,7 % | 277 |
| Zusammenarbeit · Versionsgeschichte | 391–463 | 73 | 21.873 | 39,4 % | 6.249 |
| **Zusammenarbeit gesamt** | | 463 | **55.557** | | 15.873 |
| AppDesign-`CLAUDE.md` · Regelteil (Kopf bis ‚Arbeitsumgebung‘) | 1–66 | 66 | 5.795 | 71,4 % | 1.656 |
| AppDesign-`CLAUDE.md` · davon ‚Arbeitsumgebung (Cloud)‘ | 29–66 | 38 | 4.028 | 49,6 % | 1.151 |
| AppDesign-`CLAUDE.md` · Versionsgeschichte | 67–87 | 21 | 2.322 | 28,6 % | 663 |
| ReiseLogBuch-`CLAUDE.md` · Regelteil | 1–44 | 44 | 2.987 | 56,6 % | 853 |
| ReiseLogBuch-`CLAUDE.md` · Versionsgeschichte | 45–70 | 26 | 2.289 | 43,4 % | 654 |
| Import-`CLAUDE.md` · Regelteil (keine Versionsgeschichte) | 1–29 | 29 | 1.749 | 100 % | 500 |

### L-15 · Befund · Summe, die eine Sitzung zu Beginn liest

- Automatisch geladen: drei `CLAUDE.md` = 15.141 Bytes. Nach ‚Zuerst lesen‘: `UEBERGABE.md` 8.687 (heute, 90 Zeilen) + Zusammenarbeit 55.557 +
  Überschriften der Designrichtlinie 1.746 (`grep -n '^##' | wc -c`) + der Reiselogbuch-Richtlinie 79 = **81.210 Bytes ≈ 23.200 Token (Schätzung)**.
- Davon reine Geschichte: Versionsgeschichte Zusammenarbeit 21.873 + Zuordnung 969 + Versionsgeschichten der zwei `CLAUDE.md` 4.611 = **27.453 Bytes (34 %)
  ≈ 7.800 Token (Schätzung)** – genau die Teile, die F-26, F-27, F-28 auslagern wollen.
- **Ergänzung zu F:** Der größte Regelblock der `CLAUDE.md` ist ‚Arbeitsumgebung (Cloud)‘ der AppDesign-`CLAUDE.md` (4.028 Bytes, 50 %), mit Befehlen, die nur
  beim Einrichten gebraucht werden (Chromium-Verweise Z. 46–50: 555 Bytes, Import Z. 40–42). Er wird in **jeder** Sitzung geladen, auch in Sitzungen ohne
  Tests. Lesekosten-Vorschlag dazu nur als Hinweis: keine Prüfung liest diesen Abschnitt (`checkKasten` C-3 liest nur ‚Zuerst lesen‘, `checkCollab` Z. 158–159
  nur Version und ‚## Versionsgeschichte‘ – Befund F); eine Auslagerung nach `tests/README.md` hätte aber das Risiko, dass das Einrichten vergessen wird
  (Vermutung). **Risiko:** gering bis mittel; Entscheidung beim Nutzer.
- `UEBERGABE.md` schwankt je Sitzung; die Zahl gilt für heute.

---

## Z-9 · Backlogs

Skript `befund/l/backlog.mjs` (teilt an `^## `, liest jede Tabellenzeile, Länge in Zeichen und Bytes); Ergebnis `befund/l/backlog.json`.

### L-16 · Befund · Größe, Abschnitte, Themen je Status

| Backlog · Abschnitt | Zeilen ab | Tabellenzeilen | Bytes | Anteil |
|---|---|---|---|---|
| AppDesign gesamt | | 203 | 72.580 | |
| · 0 Nächste Version | Z. 10 | 2 (APD-30, APD-133 – **bereit**) | 3.903 | 5,4 % |
| · 1 Auf iPad und iPhone prüfen | Z. 20 | 0 | 86 | 0,1 % |
| · 2 Weitere Themen | Z. 25 | 22 (**offen** 4: APD-135, APD-62, APD-134, APD-70 · **später** 18) | 10.568 | 14,6 % |
| · Erledigt | Z. 54 | 179 (davon 56 Usertests P-n) | **57.737** | **79,5 %** |
| Reiselogbuch gesamt | | 197 | 50.102 | |
| · 0 Nächste Version | Z. 21 | 1 (AppDesign APD-30 – Verweis, **bereit**) | 663 | 1,3 % |
| · 1 Prüfen | Z. 29 | 0 | 86 | 0,2 % |
| · 2 Weitere Themen | Z. 34 | 1 (RLB-6 **offen**) | 426 | 0,9 % |
| · 3 Später | Z. 40 | 1 (Platzhalter ‚–‘: ‚allgemeine Themen … stehen jetzt im Backlog von AppDesign‘) | 185 | 0,4 % |
| · Erledigt | Z. 48 | 194 (davon 88 Usertests P-n) | **47.764** | **95,3 %** |

**Offene Themen zusammen: 26** (bereit 2 + 1 Verweis, offen 5, später 18 + 1 Platzhalter); erledigt 373 Zeilen. Unter ‚Erledigt‘ stehen zusammen
**105.501 Bytes ≈ 30.100 Token (Schätzung)**, die offenen Teile beider Dateien zusammen 15.173 Bytes.

### L-17 · Befund · Aufbau weicht von 2.4 ab

- Zusammenarbeit 2.4 (Z. 263–280): ‚**2. Weitere Themen (in Klärung):** Status **offen**. **3. Später:** Ideen.‘ – das AppDesign-Backlog hat **keinen Abschnitt 3**; 18
  Zeilen mit Status ‚später‘ stehen unter ‚2.‘ (Z. 32–48, 50). Das Reiselogbuch-Backlog hat Abschnitt 3 nur mit einem Platzhalter.
- **Wer prüft es:** niemand – `checkCollab` liest Backlogs nur auf veraltete Wörter (doku.mjs Z. 122–134), `checkSchema` S-6 nur die Nummern vor ‚## Erledigt‘
  (Z. 349–351). Befund F-40 hält schon fest, dass den Aufbau niemand prüft.
- **Vorschlag:** die 18 Zeilen unter ein neues ‚## 3. Später‘ im AppDesign-Backlog verschieben (Text unverändert). **Einsparung:** keine. **Risiko:** keins – S-6
  liest weiter alles vor ‚## Erledigt‘ (Z. 350). **Nachweis:** stand unter ‚2.‘ → steht unter ‚3. Später‘ → `checkSchema` S-6 (keine doppelte Nummer).

### L-18 · Befund · Punkte unter ‚offen‘/‚später‘, die laut eigenem Text oder ‚Erledigt‘ gebaut oder überholt sind

| Stelle | Befund | Beleg |
|---|---|---|
| AppDesign Z. 30 **APD-62** (Status ‚offen‘) | Text endet mit ‚Teile APD-38/T-16 und APD-38/T-37 **gebaut in 4.53.0** … **offen bleibt nur APD-38/T-1 (zurückgestellt)**‘ – also ‚später‘, nicht ‚offen‘; 2.361 Zeichen, fast alles Vorgeschichte | Erledigt Z. 90 (4.53.0), Z. 107 (APD-38/T-43, 4.49.0) |
| AppDesign Z. 44 **APD-58** | ‚mit Paket B (**APD-37**) bauen‘ – APD-37 ist erledigt (4.30.0), Paket B heißt heute APD-62 und ist ohne gemeinsame Bewegungswerte gebaut (0,35 s/0,25 s fest) | Erledigt Z. 165, Z. 90; `grep -E '\-\-(dauer|bewegung|ease|kurve)' v4/design.css` = 0 |
| AppDesign Z. 45 **APD-59** | ‚– **mit Paket A**‘ – APD-40 Paket A ist erledigt (4.51.0); Teil Navigation laut eigenem Text gebaut (4.30.0, R-7.5) | Erledigt Z. 96 |
| AppDesign Z. 33 **APD-46** | ‚mit **APD-37** zusammen entscheiden‘ – APD-37 erledigt; haftender Kopf für die Quartierliste schon gebaut (R-6.7) | Erledigt Z. 165; Reiselogbuch-Backlog Z. 78 (RLB-116, 3.49.0) |
| AppDesign Z. 42 **APD-56** | Verweis ‚index.html:784-793‘ zeigt heute in Code von `render` – das Betragsfeld steht in Z. 880 | `sed -n 784,793p` bzw. `grep -n 'Betragsfeld' index.html` |
| AppDesign Z. 41 **APD-55** | enthält einen kleinen offenen Auftrag: ‚die Abweichung von iOS 26 in ‚Bewusste Abweichungen‘ (16) nachtragen‘ – Abschnitt 16 nennt die Glas-Leiste nicht | `awk '/^## 16\./,/^## 17\./' … \| grep -i glas` = 0 Treffer (Designrichtlinie Z. 52 nennt sie unter ‚verworfen‘, Befund D zu Z. 52) |
| AppDesign Z. 31 **APD-134** | Titel ‚Wackler `ablauf-markierung-menues`‘, laut eigenem Text war genau dieser im Messlauf grün, dafür zwei andere Wackler | eigener Text (Sitzung 0121) |

Kein Punkt unter ‚offen‘/‚später‘ ist vollständig gebaut. **Vorschlag:** APD-62 auf ‚später‘ setzen und auf den offenen Rest kürzen (Vorgeschichte steht in
Erledigt Z. 90, 107); bei APD-46, APD-58, APD-59, APD-56 die Verweise nachführen; APD-134 umbenennen oder mit APD-85 zusammenführen (Entscheidung Nutzer).
**Wer prüft es:** niemand (S-6 nur Nummern). **Einsparung:** APD-62 etwa 2.000 Bytes. **Risiko:** keins (Text, keine Nummer ändert sich).

### L-19 · Befund · Themen in beiden Backlogs – Verweis oder doppelt gepflegt?

- **29 Themennummern** stehen in Spalte ‚Nr.‘ beider Backlogs (`backlog.mjs`), alle unter ‚Erledigt‘ außer **APD-30** (bereit in beiden: AppDesign Z. 14 mit 3.383
  Zeichen, Reiselogbuch Z. 25 als ‚AppDesign APD-30‘ mit 508 Zeichen). Muster: AppDesign beschreibt den Baustein (‚APD-104 Großanzeige … | 4.48.0‘), das
  Reiselogbuch die Übernahme in der App mit eigener Version (‚APD-104, APD-105 | AppDesign APD-104 und APD-105 gebaut: … neue Prüfungen … | 3.46.0‘). Das ist
  **gewollt als Verweis** (andere Version, App-Teil), enthält aber jeweils eine Kurzfassung desselben Inhalts (Doppeltext).
- **Usertests doppelt gepflegt:** **54 Usertests P-n stehen in beiden ‚Erledigt‘** (AppDesign 14.006 Bytes, Reiselogbuch 11.106 Bytes), mit verschiedenem Wortlaut –
  z. B. P-106: AppDesign Z. 58 (275 Zeichen, mit Begründung), Reiselogbuch Z. 52 (152 Zeichen). Nur in AppDesign 2, nur im Reiselogbuch 46.
- **Wer liest es heute:** `checkSchema` S-5 `gibt` (doku.mjs Z. 330–335) sucht ein P-n in **beiden** Backlogs zusammen, ein APD-n nur im AppDesign-Backlog, ein
  RLB-n nur im App-Backlog; S-6 (Z. 346–357) zählt Nummern je Präfix im eigenen Backlog.
- **Vorschlag:** Usertests nur noch im Backlog der App eintragen, in der sie laufen (heute immer das Reiselogbuch); AppDesign nennt den Usertest in der Zeile des
  Themas (‚Usertest P-n‘ steht dort schon, z. B. Z. 111–112). Bestehende Zeilen bleiben (Geschichte). Regeländerung in 2.4 (Wortlaut-Ja).
- **Einsparung:** künftig je Version eine Zeile (etwa 250 Bytes) weniger zu schreiben und abzugleichen. **Risiko:** gering – S-5 findet P-n weiter (sucht in beiden);
  falls ein Usertest nur AppDesign betrifft (kein App-Test), bliebe er im AppDesign-Backlog.
- **Nachweis:** stand in beiden ‚Erledigt‘ → steht nur im App-Backlog → `checkSchema` S-5 (Z. 333).

### L-20 · Befund · Längste Zeilen (Lesekosten der Vorgeschichte)

| Backlog | Zeile | Zeichen | Bytes | Nr. | Abschnitt |
|---|---|---|---|---|---|
| AppDesign | 14 | 3.383 | 3.497 | APD-30 | 0 Nächste Version |
| AppDesign | 114 | 3.103 | 3.201 | APD-38 | Erledigt |
| AppDesign | 30 | 2.361 | 2.430 | APD-62 | 2 (offen) |
| AppDesign | 29 | 1.295 | 1.315 | APD-135 | 2 (offen) |
| AppDesign | 151 | 735 | 753 | APD-75, APD-76 | Erledigt |
| AppDesign | 137 | 692 | 719 | APD-84 | Erledigt |
| AppDesign | 157 | 685 | 707 | APD-61, APD-69 | Erledigt |
| AppDesign | 50 | 640 | 649 | APD-80 | 2 (später) |
| AppDesign | 140 | 640 | 652 | APD-72 | Erledigt |
| AppDesign | 31 | 619 | 629 | APD-134 | 2 (offen) |

Die Vorgeschichte ist Teil des Themas – nur als Lesekosten: die vier Zeilen über 1.000 Zeichen kosten zusammen 10.443 Bytes (≈ 3.000 Token, Schätzung). Die
längste Reiselogbuch-Zeile hat 521 Zeichen (Z. 25). Zeilen über 500 Zeichen unter ‚Erledigt‘: AppDesign 17, Reiselogbuch 2.

### L-21 · Vorschlag · ‚Erledigt‘ beim Lesen überspringen (statt auslagern)

- **Was:** ‚Erledigt‘ ist 79,5 % bzw. 95,3 % der Backlogs. Zu Beginn (Erinnerung ‚kurze Liste‘, 2.4 Z. 278–280) und vor jeder Bau-Frage braucht Claude nur die
  Abschnitte 0–3. **Variante A (empfohlen):** Regeltext in 2.4: ‚Backlog lesen bis ‚## Erledigt‘; ‚Erledigt‘ nur bei Bedarf.‘ **Variante B:** ‚Erledigt‘ in eine
  eigene Datei `BACKLOG Erledigt.md` je Repo.
- **Wer liest/prüft es heute:** `checkSchema` S-5 `gibt` (doku.mjs Z. 328–335) sucht die Ziele aus `ZUORDNUNG.md` (z. B. P-35, APD-5) **im Backlog-Text** – die
  stehen fast alle unter ‚Erledigt‘. Bei Variante B würden sehr viele S-5-Meldungen rot (‚gibt es im Backlog nicht‘), außer `backlog()` (Z. 328) liest die neue Datei
  mit (Codeänderung in `tests/` → neue Fassung, voller Lauf). S-6 `max` (Z. 353) nimmt die höchste Nummer aus dem Backlog – fehlen erledigte Nummern, sinkt `max`,
  das ist unkritisch. `veroeffentlichen.mjs` Z. 107, 137 ändern nur die Stand-Zeile. `checkCollab` Z. 122–123 liest die Backlogs ganz (veraltete Wörter).
- **Einsparung:** bis etwa 105.500 Bytes ≈ 30.100 Token (Schätzung) je Mal, wenn heute beide Backlogs ganz gelesen werden (Vermutung – wie oft, ist nicht gemessen).
- **Risiko:** A **keins** (nur Regeltext, Wortlaut-Ja); B **mittel** (Codeänderung an `checkSchema`, sonst rot).
- **Nachweis A:** Regel in 2.4 → geprüft durch nichts (Lesegewohnheit); **B:** stand unter ‚## Erledigt‘ → steht in `BACKLOG Erledigt.md` → `checkSchema` S-5 mit
  erweitertem `backlog()`.

---

## Z-10 · ReiseLogBuch-Import (Ablage und Werkzeug)

Wortlaut der I-Regeln, Kilometer/Preis, Testfall 4, Versionsangaben und `--zone`: **Befund F, F-34 bis F-38** – hier nur, was dort fehlt.

### L-22 · Befund · Was im Repo liegt

- **9 Dateien, 48.050 Bytes** ohne `.git` (`find … -printf '%s %p'`): `PROMPT.md` 13.311 · `README.md` 3.767 · `ERKENNTNISSE.md` 3.135 · `CLAUDE.md` 1.749 ·
  `.gitignore` 290 · `werkzeug/pruefen.mjs` 21.319 (283 Zeilen) · `werkzeug/beispiel.json` 2.550 · `werkzeug/package.json` 239 · `package-lock.json` 1.690.
- Keine Reisedaten im Repo: `.gitignore` sperrt `*.json` (außer den drei Werkzeug-Dateien), Office-, Bild-, Text- und HTML-Dateien und `daten/`; `pruefen.mjs`
  `datenschutz` (Z. 47–57) meldet jede andere Daten-Datei im Import-Repo rot (`ERLAUBT_IM_REPO` Z. 18–19).
- Kein `BACKLOG.md`, kein `CHANGELOG.md`, keine `tests/` – Versionsgeschichte steht in `README.md` (Befund F-8 zur fehlenden `BACKLOG.md`).

### L-23 · Befund · Wogegen `werkzeug/pruefen.mjs` arbeitet – und ob es mit 3.56.3 / 4.59.3 läuft

- **Feste Pfade, keine Versionen:** `BASIS` = Ordner über dem Import-Repo (Z. 12–14), `APP_REPO = <BASIS>/ReiseLogBuch`, `AD_REPO = <BASIS>/AppDesign` (Z. 16). Es liest
  **immer den Arbeitsstand** `../ReiseLogBuch/index.html` (Z. 32) und liefert über einen eigenen Webserver nur diese beiden Ordner aus (Z. 214–221); die App lädt
  dann ihre Fassung `../AppDesign/fassung/4.59.3/…` (index.html Z. 14, 137) – also **die Fassung, die die App heute nennt**, keine im Werkzeug feste Version.
  Großschreibung zählt: `/home/user/ReiseLogBuch` und `/home/user/AppDesign` gibt es (die kleingeschriebenen Verweise aus der AppDesign-`CLAUDE.md` stören nicht).
- **`leseFormat` (Z. 31–43) gegen den heutigen Stand** – dieselben regulären Ausdrücke in `befund/l/import-format.mjs` gegen `index.html` angewandt (nur gelesen,
  das Werkzeug **nicht** ausgeführt): `APP_VERSION` Z. 144 → ‚3.56.3‘; `TRANSPORT` Z. 169 → 8 Kennungen; `WEATHER` Z. 168 → 7 Zeichen; Block `const next = {` Z. 1669
  → Tagesfelder `weather, program, comment, sameQuarter, quarter, place, noMap, food`; `const target = trip || {` Z. 1511 und `target.x =` → 16 Reisefelder inkl.
  `kmColumn`, `priceOn`, `outputCounter`. **Alle Muster treffen** – kein ‚Format der App nicht lesbar‘ (Z. 41). Es fehlen nur `price`/`km` (Z. 1683–1684,
  nachträglich `next.price =`, `next.km =`) – genau F-34.
- **Bedienung in der App** (Z. 112–135, 141–207): `#sideMore` (index.html 6 Treffer), Menüpunkt ‚Backup laden‘ (`.menu .mi`, ui.js Z. 779–780), Sprechblase
  `.pop button` ‚Abgleichen‘ (ui.js Z. 1002), `#msg`, `#msg [data-x]` (ui.js 3 Treffer), globale `dlg` (ui.js), `db.trips`, `showTrip`, `getTrip` (index.html Z. 363),
  `normalize`, `save`, `render`, `outputDocument` (Z. 1939), `table.days tbody tr[data-day]` (Z. 754) – **alle vorhanden** (grep-Zählung in `import-format.mjs`).
- **Laufzeit-Voraussetzungen:** `package.json` `playwright ^1.56.1`, `package-lock.json` 1.56.1 – dieselbe Version wie die Prüfungen; braucht Chromium und WebKit
  (Z. 207) mit den Verweisen aus der AppDesign-`CLAUDE.md` (‚Tests einrichten‘). `git status` beider App-Repos muss sauber sein (Z. 275–277, I-2) – in einer
  Sitzung mit offenen Änderungen in AppDesign meldet es rot.
- **Einschätzung (aus dem Code gelesen, nicht ausgeführt):** läuft mit dem heutigen Stand, solange die Import-Datei keine Kilometer und keinen Quartierpreis enthält
  (F-34). Der Selbsttest (`beispiel.json`) enthält beides nicht. Die README-Zeile ‚Geprüft mit 3.34.0 / 4.36.0‘ ist veraltet (F-36).

### L-24 · Befund · Bruchstellen bei künftigen Umbauten (für die Konsolidierung)

- `leseFormat` hängt an **Textmustern** in `index.html` (`pruefen.mjs` Z. 33–38): ein Umbenennen von `const next = {`, `const target = trip || {` (einzeilig!), `TRANSPORT`, `WEATHER`
  oder `APP_VERSION` – etwa beim Auslagern in ui.js (Plan B-3/B-5, Befund U) – bricht das Werkzeug mit ‚Format der App nicht lesbar‘. Die Bedienung hängt an
  ui.js-Klassen `.menu .mi`, `.pop`, `#msg`, `[data-x]`. **Keine Prüfung** von AppDesign oder Reiselogbuch ruft `pruefen.mjs` auf (`grep -rn 'pruefen.mjs'` in
  `tests/`, `werkzeug/` beider Repos: 0 Treffer) – ein Bruch fällt erst bei der nächsten Konvertierung auf.
- **Vorschlag:** in der Bau-Frage, wenn `index.html` an diesen Stellen oder ui.js an diesen Klassen geändert wird, `node werkzeug/pruefen.mjs --selbsttest`
  einmal laufen lassen (Handbefehl, keine neue Prüfung). **Wer prüft es heute:** niemand. **Einsparung:** keine. **Risiko:** keins (zusätzlicher Lauf, nur lesend; das
  Werkzeug prüft selbst I-2). **Nachweis:** Bruch heute unentdeckt → dann beim Bau entdeckt → `pruefen.mjs --selbsttest` (RLB-5/F-19, F-1).

---

## Z-11 · Code und Kommentare (höchstes Risiko)

### L-25 · Befund · Geschichte in Kommentaren (‚seit N.N‘)

Skript `befund/l/seit.mjs`: zählt `\b[Ss]eit \d+\.\d+` je Datei, Kommentarzeilen (Zeile beginnt mit `//`, `/*`, `*`, `<!--` oder liegt in einem `/* … */`) und
Kommentar-Bytes (dazu Zeilenend-Kommentare ab ` // ` bzw. `/* `). Alle Treffer in `v4/` und `index.html` stehen in Kommentaren (geprüft: `grep … | grep -v` der
Kommentaranfänge zeigt nur Zeilenend-Kommentare).

| Datei(en) | ‚seit‘ | Zeilen mit ‚seit‘ | Zeilen | Kommentarzeilen | Kommentar-Bytes / Bytes | Bytes der ‚seit‘-Zeilen |
|---|---|---|---|---|---|---|
| `v4/ui.js` | 197 | 194 | 3.326 | 701 (21 %) | 86.941 / 244.451 (36 %) | 25.104 (10,3 %) |
| `v4/design.css` | 97 | 97 | 883 | 216 (24 %) | 26.432 / 89.043 (30 %) | 12.385 (13,9 %) |
| `ReiseLogBuch/index.html` | 90 | 82 | 2.136 | 257 (12 %) | 28.967 / 119.346 (24 %) | 10.801 (9,1 %) |
| `AppDesign/tests/*.mjs` (16) | 332 | 312 | 8.350 | 1.533 (18 %) | 181.796 / 780.285 (23 %) | 44.185 (5,7 %) |
| `ReiseLogBuch/tests/*.mjs` (62) | 268 | 260 | 5.721 | 931 (16 %) | 113.367 / 553.801 (20 %) | 36.320 (6,6 %) |
| `AppDesign/werkzeug/*.mjs` (6) | 47 | 42 | 1.585 | 247 (16 %) | 28.628 / 131.166 (22 %) | 5.654 (4,3 %) |
| **zusammen** | **1.031** | 987 | 22.001 | 3.885 (18 %) | 466.131 / 1.918.092 (24 %) | 134.449 (7,0 %) |

Die Zahlen für `ui.js` stimmen mit Befund U-46 überein (197). Der reine Text ‚seit X.Y.Z (APD-n):‘ ist klein: in `ui.js` 197 Vorkommen mit zusammen 4.176 Bytes
(`grep -oE 'seit …( \(…\))?:?' | awk`); 71 davon nennen ein Thema (APD-n/RLB-n). Reine Vorgeschichte ‚(bis X.Y.Z …)‘ bzw. ‚statt altName‘: `ui.js` 8, Prüfungen 1.

**Fünf typische Beispiele:**

1. `v4/ui.js` Z. 2423: `const navSperre = klickSperre();   // seit 4.50.0 (APD-108) statt navKlickWeg` – **nur Geschichte** (welcher Name vorher galt).
2. `v4/ui.js` Z. 2828: `… blattAus);   // R-1.12 (seit 4.57.0): gleich mit dem Abbild (bis 4.56.0 0,38 s)` – Regel + Warum + alter Wert; ‚(bis 4.56.0 0,38 s)‘ ist Geschichte.
3. `v4/ui.js` Z. 2938: `let dlgFest = 0;   // seit 4.28.1: Höhe des iPad-Fensters vor dem Antippen – der Platz unter dem Inhalt macht es nicht höher` –
   ‚seit 4.28.1:‘ ist Geschichte, der Rest erklärt **warum** (Schutz vor Rückfall).
4. `ReiseLogBuch/index.html` Z. 258–259 (`normalize`): `t.kmColumn ??= false;   // seit 3.41.0 (RLB-110): …` – hier **ist die Version die Begründung**: Daten
   vor 3.41.0 haben das Feld nicht (Datenübernahme, CLAUDE.md Reiselogbuch ‚immer mit Übernahme alter Daten‘).
5. `AppDesign/tests/ablauf.mjs` Z. 375: `// Seit 4.41.0 (APD-81, Testfall-Liste arbeit/APD-81 Testfall-Liste.md APD-81/C1 bis C16): auch mehrzeilige Felder …` –
   Rückverfolgung Prüfung → Testfall-Liste; der `arbeit/`-Pfad wird von `checkSchema` S-9 geprüft.
   (Gegenbeispiel ohne ‚seit‘-Nutzen, aber mit Warum: `v4/design.css` Z. 276 ‚Seit 4.5.1 fest positioniert (nicht sticky), damit sie auch beim Nachfedern der Seite
   stehen bleibt‘.)

### L-26 · Vorschlag · ‚seit‘-Kommentare nur gezielt kürzen

- **Gefahrlos kürzbar (Vorschlag):** die reine Vorgeschichte – ‚(bis X.Y.Z …)‘ und ‚statt altName‘ (9 Stellen) – und in **reinen Code-Kommentaren von `ui.js`
  und `design.css`** das Präfix ‚seit X.Y.Z‘ **ohne** Thema (etwa 126 der 197 in `ui.js`), wenn derselbe Kommentar das Warum nennt. Das Warum und die Regelnummer
  (R-x.y) bleiben immer.
- **Nicht kürzen:** (1) `normalize` in `index.html` (die Version sagt, welche alten Daten betroffen sind); (2) Kommentare mit Regelnummer R-x.y in `tests/*.mjs` –
  `checkCatalog` (doku.mjs Z. 86–88) sucht die Regelnummer **irgendwo im Text** der Prüfdateien, auch in Kommentaren (Befund C-6); fällt der Kommentar weg, kann eine
  Regel ‚ohne Prüfung‘ rot werden – oder schlimmer, ein Kommentar täuscht eine Prüfung vor; (3) Kommentare mit `arbeit/`-Pfad oder Testfall-Nummern (Rückverfolgung,
  S-9); (4) Safari-Belege mit Messdatei (`tests/safari.mjs`, z. B. Z. 193, 247, 321 – 0 Nr. 27 ‚Nur Belegtes‘).
- **Wer liest/prüft es heute:** `checkCatalog` (Kommentare in `tests/`), `checkSchema` S-2/S-4/S-9 (Nummern und `arbeit/`-Pfade in Kommentaren, alle lebenden
  Dateien), `werkzeug/pruefstufe.mjs` (Z. 2, 67–68: Kommentare in `index.html` und `tests/*.mjs` zählen als ‚Text‘ → Stufe Text möglich). Kommentare in `ui.js`/
  `design.css` ändern die Fassung → **neue AppDesign-Version, voller Prüflauf** (Änderung an `design.css` → voll, Befund C Abschnitt 6).
- **Einsparung:** gering – grob die 4.176 Bytes ‚seit …‘ in `ui.js` plus etwa 1.000 Bytes Vorgeschichte; Lese-Token nur, wenn Claude `ui.js` liest (≈ 1.500 Token,
  Schätzung). Nicht beim Sitzungsbeginn (Code wird dort nicht gelesen).
- **Risiko:** **gering** für ui.js/design.css, wenn nur das Präfix fällt und es mit einer ohnehin anstehenden Version gebaut wird; **mittel** für Prüfdateien
  (Regelnummern, S-9). **Empfehlung:** nicht als eigene Version; höchstens ‚beim nächsten Anfassen der Stelle‘ (Regel 0 Nr. 3 ‚schlank halten‘).
- **Nachweis:** stand ‚seit X.Y.Z (APD-n): Warum‘ → steht ‚Warum‘ (Thema im CHANGELOG) → geprüft durch `checkCatalog` (unverändert grün, Regelnummern bleiben),
  `checkSchema` S-9.

### L-27 · Befund · Unbenutzte CSS-Klassen

Skript `befund/l/css.mjs`: liest alle Klassen-Selektoren aus `v4/design.css` (Kommentare entfernt, Attribut-Selektoren und `url()` ausgenommen) und sucht jeden
Namen als ganzes Wort in `v4/ui.js`, `ReiseLogBuch/index.html`, `vorlage/index.html`, `AppDesign/tests/*.mjs`, `ReiseLogBuch/tests/*.mjs`; zweiter Lauf ohne
Kommentare (gleiches Ergebnis). **Zusammengesetzte Namen:** einziges gefundenes Präfix ist ‚`messung-`‘ (in Zeichenketten `'messung-' +` bzw. `` `…messung-${` ``);
keine design.css-Klasse fällt nur darüber.

- **design.css: 178 Klassen, 4 ohne Fundstelle:**

| Klasse | Stelle | Beleg (grep -rnw in v4, vorlage, tests, werkzeug, index.html, Prüfungen der App, Richtlinien) | Risiko beim Entfernen |
|---|---|---|---|
| `.spacer` | design.css Z. 273 | 1 Treffer (nur die Definition); `arbeit/` 0; in allen 69 Fassungen | gering |
| `.dlg-foot` | Z. 604 | 1 Treffer (Definition); `arbeit/` 0 | gering |
| `.iconbtn` | Z. 622 (in einer Liste mit `.mic`, `.emoji-row button.reset`) | Definition + Designrichtlinie Z. 640 (‚nur Icon `.iconbtn`‘) | gering – **Doku mitändern** (Designrichtlinie, Wortlaut-Ja) |
| `.lcount` | Z. 722 | Definition + Designrichtlinie Z. 966 (‚Großer Titel (`.ltitle`) mit grauer Zeile darunter (`.lcount`)‘) | gering – Baustein ‚großer Titel‘ ist beschrieben, aber von keiner App genutzt (APD-38/T-1 zurückgestellt); **eher behalten** |

  Keine Prüfung liest diese Klassen (0 Treffer in `tests/`). Ältere Apps sind nicht betroffen – sie laden ihre feste Fassung (R-10.3). `git log -S<Name> -- index.html`
  im flachen Klon (50 Commits): 0 – ob das Reiselogbuch sie früher nutzte, ist nicht geprüft.
- **`<style>` in `ReiseLogBuch/index.html`: 39 Klassen, 0 ohne Fundstelle.**
- **Grenze der Methode:** ein Klassenname, der zugleich ein gewöhnliches Wort im Code ist (z. B. `on`, `red`, `sw`), zählt als benutzt – unbenutzte solche Klassen
  findet das Skript nicht (Vermutung: wenige).

### L-28 · Vorschlag · `.spacer` und `.dlg-foot` entfernen, `.iconbtn`/`.lcount` klären

- **Was:** `.spacer` (1 Zeile) und `.dlg-foot` (1 Zeile) aus `v4/design.css` streichen; bei `.iconbtn` und `.lcount` zuerst entscheiden, ob der Baustein
  gilt (Designrichtlinie Z. 640, 966) – sonst Doku und CSS gemeinsam ändern.
- **Wer liest/prüft es heute:** niemand außer der Designrichtlinie (2 Stellen); 0 Treffer in `tests/` beider Repos.
- **Einsparung:** etwa 150 Bytes. **Risiko:** gering (betrifft nur künftige Fassungen; eine App, die die Klasse bräuchte, sieht sie beim Heben der Fassung im
  Prüflauf nicht – CSS hat keine Abdeckung, Befund C). Änderung an `design.css` → voller Lauf; nur zusammen mit einer anderen Version bauen.
- **Nachweis:** stand in design.css Z. 273/604 → entfällt → geprüft durch `grep -rnw` (0 Nutzer) und den vollen Prüflauf der nächsten Version.

### L-29 · Befund · Unbenutzte Funktionen in `ReiseLogBuch/index.html` – keine

Skript `befund/l/funk.mjs`: **161 Funktionen** (98 `function`, 63 Pfeilfunktionen `const x = (…) =>`); jeder Name als ganzes Wort in `index.html` (ohne die
Definition, mit `onclick`-Attributen und Zeichenketten), `v4/ui.js`, allen Prüfdateien beider Repos, `sw.js` und dem Import-Werkzeug. **Ergebnis: 0 ohne weitere
Nennung, 0 nur in Prüfungen, 0 nur in Kommentaren.** Drei Namen sind zweimal definiert (`refocus`, `persist`, `restore`) – Vermutung: lokale Hilfsfunktionen in
verschiedenen Fenstern (nicht einzeln geprüft). Grenze: Funktionen, die nur sich selbst rekursiv aufrufen, würden als benutzt gelten.

### L-30 · Befund · Dateien in Wurzeln, `v4/`, `vorlage/`, `apple-referenz/`, `werkzeug/` – alle genannt

Skript `befund/l/dateien.mjs`: jede getrackte Datei dieser Orte (AppDesign Wurzel, `v4/`, `vorlage/`, `apple-referenz/`, `werkzeug/`; Reiselogbuch-Wurzel; ganzes
Import-Repo) als Dateiname in allen lebenden Textdateien der drei Repos (ohne `fassung/`) gesucht. **Keine Datei ist unerwähnt.** Am schwächsten genannt:

- 13 PNG in `apple-referenz/` (3.933.780 Bytes für den Ordner) – je 1 Treffer, nur in `apple-referenz/README.md`; zwei zusätzlich in `arbeit/RLB-113` bzw. `RLB-114
  Testfall-Liste.md`. Keine Prüfung liest sie. **Risiko beim Entfernen:** gering für den Code, aber sie sind die Apple-Belege (Designrichtlinie ‚Apple-Abgleich‘) –
  **behalten**.
- `werkzeug/apps.json` – 2 Treffer: `CHANGELOG.md` und `werkzeug/veroeffentlichen.mjs` (liest sie) – nötig.
- `ReiseLogBuch/icon-512.png` – 3 Treffer (`manifest.json`, `sw.js` `FILES`, `VERLAUF.md`) – nötig.
- Die beiden Stummel `ReiseLogBuch/README - Designrichtlinie allgemein.md` (302 Bytes) und `… Zusammenarbeit allgemein.md` (299 Bytes) – nur Verweise auf AppDesign;
  `doku.mjs` `adText` (Z. 13–16) liest **nicht** sie, sondern die Datei in AppDesign. Befund F-26 nennt den Stummel; **Vorschlag:** behalten (alte Links auf GitHub).

### L-31 · Nebenbefund · Prüfungen der App lesen Messungen aus dem Arbeitsstand von AppDesign

- `ReiseLogBuch/tests/ablauf-abspielen.mjs` Z. 13, `ablauf-schicht-oben.mjs` Z. 23 und 64, `ablauf-tastatur-still.mjs` Z. 68 lesen
  `../../AppDesign/tests/messungen/` – **nicht** aus `fassung/X.Y.Z/` (die Fassung kopiert nur Dateien direkt in `tests/`, `version.mjs` `fassungQuellen` Z. 22–25;
  `messungen/` steht nicht in `PRUEFSUMMEN`). Ein Umbenennen oder Löschen einer Messung in AppDesign macht also Prüfungen einer App mit **älterer** Fassung rot – gegen
  den Sinn von R-10.3. Heute harmlos (11 Dateien, 437.575 Bytes, nichts geändert); **beim Aufräumen von Messungen nichts umbenennen** oder `messungen/` in die Fassung
  aufnehmen (Codeänderung, Entscheidung Nutzer). Nicht in Befund C erwähnt (grep ‚tests/messungen‘ = 0).
- Doppelte Datei: `arbeit/RLB-103 Messung 2026-10-26 iPhone quer Blatt Ort Quartier.txt` ist Byte für Byte gleich `tests/messungen/2026-10-26 iPhone quer Blatt Ort
  Quartier.txt` (`cmp`, 86.157 Bytes); die Kopie in `arbeit/` nennt nur `arbeit/APD-77 Testfall-Liste.md`. Kein Vorschlag (klein, Beleg einer Entscheidung).

---

## Übersicht · die lohnendsten Vorschläge

| Rang | Vorschlag | Einsparung (Schätzung) | Risiko |
|---|---|---|---|
| 1 | **L-21 A** Backlog nur bis ‚## Erledigt‘ lesen (Regeltext 2.4) | bis 105.500 Bytes ≈ 30.100 Token je vollständigem Lesen beider Backlogs | keins |
| 2 | **L-11** CHANGELOG nur den neuesten Eintrag lesen (Regeltext) – oder ältere Einträge in `CHANGELOG bis X.Y.Z.md` | bis 152.000 Bytes ≈ 43.000 Token je ungezieltem Lesen (Reiselogbuch) | keins (Regel) / gering (Archiv: S-1 läuft dort nicht mehr) |
| 3 | **F-26/F-28** (Messung L-14/L-15) Versionsgeschichten der Zusammenarbeit und der zwei `CLAUDE.md` auslagern | 27.453 Bytes ≈ 7.800 Token **jede Sitzung** | gering (Befund F) |
| 4 | **L-19** Usertests nur im Backlog der App eintragen | eine Doppelzeile je Version weniger (54 doppelte bisher) | gering |
| 5 | **L-17/L-18** Backlog-Ordnung: Abschnitt ‚3. Später‘ in AppDesign, APD-62 auf ‚später‘ und gekürzt, veraltete Verweise in APD-46/56/58/59 | etwa 2.000 Bytes, vor allem weniger Irrtum | keins |

**Ausdrücklich nicht empfohlen:** `arbeit/` umziehen (L-4: 380 Verweise aus 57 Dateien, Code-Kommentare → neue Fassung; keine Lese-Token gespart), alte Fassungen
löschen (L-8: Geräte mit alter App, Gegenproben, Muster – Risiko hoch, Gewinn nur Speicher), Richtlinientexte aus den Fassungen nehmen (L-9). Code: 0 unbenutzte
Funktionen in `index.html`, 4 unbenutzte CSS-Klassen (L-27/L-28, zusammen etwa 150 Bytes), ‚seit‘-Kommentare nur beim nächsten Anfassen kürzen (L-26).
**Sicherheitsgewinn ohne Ersparnis:** L-24 (Import-Selbsttest bei Umbauten an `index.html`-Mustern oder ui.js-Klassen), L-31 (Messungen der App-Prüfungen liegen
außerhalb der Fassung).

## Nicht oder nur stichprobenartig geprüft

- **Nichts ausgeführt:** keine Prüfung, kein Browser, das Import-Werkzeug nicht; ‚läuft mit 3.56.3/4.59.3‘ (L-23) ist aus dem Code gelesen. Die regulären Ausdrücke
  von `leseFormat` habe ich in einem eigenen Skript gegen `index.html` angewandt.
- **Lesekosten** sind Bytes/3,5 (Schätzung). Wie oft Claude Backlogs oder CHANGELOGs heute ganz liest, ist nicht gemessen (L-11, L-21 – Vermutung).
- **Themen-Gruppierung in `arbeit/`** nach der ersten Nummer im Dateinamen; Dateien mit mehreren Nummern zählen beim ersten Thema. Status nur aus Spalte ‚Nr.‘ der Backlogs.
- **Verweise ohne Pfad** (z. B. ‚Testfall-Liste APD-81‘ ohne `arbeit/`) sind nicht gezählt – die Zahl ‚110 Dateien nie mit Pfad genannt‘ ist eine Obergrenze für
  wirklich ungenannte Dateien.
- **Fassungen:** Unterschiede nur für die letzten 6 Schritte im Einzelnen angesehen; ‚Byte-gleich 30,4 %‘ über alle. Wann iOS Website-Daten einer Home-Bildschirm-App
  räumt, ist Vermutung (L-8).
- **CSS:** Klassen, die zugleich gewöhnliche Wörter sind, können als benutzt durchgerutscht sein; Klassen in `arbeit/`-Mustern zählen nicht als Verwendung. Ob die
  4 Klassen früher in der App genutzt wurden: nur 50 Commits Geschichte (flacher Klon).
- **Funktionen:** nur `index.html`; die von `ui.js` stehen in Befund U-43. Die drei doppelt definierten Namen nicht einzeln angesehen.
- **‚seit‘-Zählung:** Kommentar-Erkennung zeilenweise (Zeichenketten mit `//` oder `/*` können vereinzelt mitzählen); die Einteilung ‚mit Warum / ohne Warum‘ nur an
  Beispielen, nicht für alle 1.031 Stellen.
- **Nicht untersucht:** `tests/` von AppDesign auf tote Funktionen, `werkzeug/` auf tote Teile (außer Erwähnung der Dateien), Größe und Inhalt von `tests/messungen/`
  über L-31 hinaus, GitHub-Pages-Verhalten (nur aus dem Code von `sw.js` gelesen).
