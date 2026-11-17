# APD-135 Befund F – Arbeitsregeln und CLAUDE.md

**Stand 17.11.2026** · Sitzung 0122 · reine Lese-Analyse (keine Datei in den Repos geändert, keine Tests, keine Browser)

Gelesen auf dem Stand: AppDesign `3fdf6cd` (Zusammenarbeit allgemein **3.14.1**, AppDesign-`CLAUDE.md` **2.12.0**), ReiseLogBuch
`c3c9915` (Reiselogbuch 3.56.3, `CLAUDE.md` **3.9.0**), ReiseLogBuch-Import `c747fee` (README **1.3.0**, `CLAUDE.md` **1.1.0**, `PROMPT.md`
**1.2.1**). Wo ‚Zusammenarbeit Z. n‘ steht, ist `AppDesign/README - Zusammenarbeit allgemein.md` Zeile n gemeint.

## Zählungen

Gemessen mit `befund/f/teile.mjs` (Zeilen und Bytes je Abschnitt; Unterabschnitte mit `node -e` über feste Zeilenbereiche):

| Datei / Teil | Zeilen | Bytes | Anteil |
|---|---|---|---|
| **Zusammenarbeit allgemein gesamt** | 462 | 55.557 | 100 % |
| Kopf (Z. 1–14) | 14 | 729 | 1 % |
| Abschnitt 0 (Z. 15–190) – davon Kasten Z. 17–35 | 177 (19) | 16.792 (1.913) | 30 % |
| Abschnitt 1 (Z. 192–205) | 14 | 618 | 1 % |
| Abschnitt 2 (Z. 206–368) – 2.1 · 2.2 · 2.3 · 2.4 Backlog · 2.4 Nummern · 2.5 · 2.6 · 2.7 · 2.8 | 163 | 14.577 – 2.158 · 1.036 · 2.103 · 1.241 · 3.267 · 2.722 · 1.031 · 780 · 202 | 26 % |
| Zuordnung alt → neu (Z. 369–390) | 22 | 969 | 2 % |
| **Versionsgeschichte (Z. 391–462)** | 73 | **21.873** | **39 %** |
| AppDesign-`CLAUDE.md` (davon Versionsgeschichte ab Z. 67) | 86 (21) | 8.116 (2.322) | |
| ReiseLogBuch-`CLAUDE.md` (davon Versionsgeschichte ab Z. 45) | 69 (26) | 5.276 (2.289) | |
| ReiseLogBuch-Import-`CLAUDE.md` (keine Versionsgeschichte) | 28 | 1.749 | |
| `UEBERGABE.md` | 90 | 8.687 | |

- **Pflichten in Abschnitt 0:** 29 Nummern (Nr. 1–29, davon Nr. 26 ‚entfällt‘); jede nennt eine ‚Prüfung‘ (`befund/f/pruefungen.mjs`): 14 nur
  Selbstkontrolle, 14 mit Datei oder Funktion (Nr. 26 entfällt); **jede genannte Datei und Funktion gibt es** (`pruefe.mjs`, `lauf.mjs`, `lauf-selbsttest.mjs`,
  `veroeffentlichen.mjs`, `veroeffentlichen-selbsttest.mjs`, `doku.mjs` mit `checkCatalog`/`checkCollab`, `safari.mjs`, `hig.mjs`, `version.mjs`,
  `messung.mjs`, `abspielen.mjs`). Ohne ‚Prüfung:‘ sind 2.4 (Teil Backlog), 2.5, 2.6, 2.7 (F-41).
- **Geschichte im Regeltext:** 14 Zeilen der Zusammenarbeit vor der Versionsgeschichte mit ‚seit‘, Datum, ‚gemessen‘, ‚entfällt‘, Themennummer
  als Begründung oder ‚bis X.Y.Z‘ (`befund/f/geschichte.mjs`; davon 4 echte Geschichte, der Rest Beispiele, Versionszeile oder die Spalte
  ‚bereit seit‘ – F-30 bis F-33).
- **Befunde:** 41 (F-1 bis F-41) – Widerspruch 7 · überholt 6 · toter Verweis 1 · Abweichung im Wortlaut 5 · doppelt 6 · Lesekosten 4 ·
  Geschichte 4 · Import 5 · Prüfung unklar 3.

## Was die Prüfungen am Wortlaut lesen (damit ein neuer Wortlaut nicht rot wird)

Alle Stellen in `AppDesign/tests/doku.mjs`. **Wichtig:** einige Gegenproben ersetzen einen Wortlaut wörtlich – fehlt er, kann die Gegenprobe
den Fehler nicht mehr einbauen, und `lauf.mjs --gegenprobe schema` meldet ‚Test(s) meldeten die Gegenprobe nicht – sie prüfen nichts‘
(`tests/lauf.mjs` Z. 60–64, 143).

| Stelle | liest | verlangt (wörtlich) |
|---|---|---|
| `checkCollab` Z. 125–126 | Kasten Punkt 4 | ‚Link‘, ‚Erwartet‘, ‚SendUserFile‘ |
| `checkKachel` Z. 202–209 | Kasten 3, 4, 5; 0 Nr. 11, 15, 26, 28, 29; 2.1, 2.2, 2.3, 2.8 | Kasten 3: ‚**Kachel mit Push:**‘, ‚nach einem Neustart des Arbeitsprozesses‘, ‚Ich schreibe im Chat‘ · Kasten 4: ‚**Datei vor jeder Kachel:**‘, ‚SendUserFile‘, ‚ohne Ausnahme‘, ‚ohne Link‘ · Kasten 5: ‚‚(Kontext N)‘‘, ‚nie geschätzt‘ · Nr. 11: ‚danach das Fenster zur Rückmeldung‘ · Nr. 15: ‚als **eigene Antwort**‘, ‚das Lagebild im Chat und als Datei, danach das Fenster‘ · **Nr. 26: ‚entfällt (APD-123)‘** · Nr. 28: ‚‚(Kontext N)‘‘, ‚Prüfung: Selbstkontrolle‘ · Nr. 29: ‚im Chat, danach das Fenster‘ · 2.1: ‚**Die Datei davor, das Fenster danach:**‘, ‚SendUserFile‘, ‚vor jedem Fenster‘, ‚ohne Link‘ · 2.2: ‚Kontextstand‘, ‚‚(Kontext N)‘‘, ‚⚠ Übergabe fällig‘ · 2.3: ‚in der Kachel‘ · **2.8: ‚Abgeschaltet (APD-123‘** |
| `checkKachel` Z. 210–211 | ganzer Regeltext (vor Versionsgeschichte) | verboten: ‚bereit – anzeigen?‘, ‚**W**‘, ‚Uhrzeitzeile (0 Nr. 26‘, ‚Erste Zeile jeder Ausgabe‘, ‚Zeitzeile von `messung.mjs`‘, ‚Zeit und Token (Pflicht‘ |
| `checkKachel` Z. 200 | Nummern in Abschnitt 0 (Text zusammengezogen) | eine Nummer beginnt bei ‚ n. ‘ – **kein Satz in Abschnitt 0 darf mit einer nackten Zahl und Punkt enden** (‚… nach Nr. 13. …‘ würde als Beginn von Nr. 13 gelesen) |
| `checkKasten` Z. 220, 235–236 | Kasten | beginnt mit ‚> **Immer:**‘ und ‚> **Jede Antwort**‘; nennt ‚Nr. 21‘, ‚Nr. 22‘, ‚Nr. 8‘, ‚Nr. 27‘, ‚Nr. 28‘, ‚Nr. 11‘, ‚Nr. 13‘, ‚2.1‘, ‚2.3‘, ‚2.4‘, ‚Abschnitt 1‘ |
| `checkKasten` Gegenproben Z. 227–231 | Wortlaut zum Ersetzen | C-1 ‚> **Jede Antwort**‘ · C-2 eine Zeile ‚> 6. …‘ und **‚2.4‘ nur in Punkt 6** · C-3 ‚– die ganze Datei‘ in der AppDesign-`CLAUDE.md` · C-4 ‚**diese ganze Datei** (einmal je Sitzung‘ in Nr. 15 · C-5 ‚ Prüfung: Selbstkontrolle.‘ in Nr. 28 |
| `checkKasten` Z. 238–246 | beide `CLAUDE.md` (AppDesign, App), Nr. 15, alle Nummern | Zeile mit ‚Zusammenarbeit allgemein‘ unter ‚Zuerst lesen‘ enthält ‚die ganze Datei‘; Nr. 15 ‚diese ganze Datei‘; jede Nummer ‚Prüfung‘ oder beginnt mit ‚entfällt‘ |
| `checkCollab` Z. 130–152 | Zusammenarbeit, beide `CLAUDE.md`, beide `BACKLOG.md`, App-Richtlinie, App-`PROMPT.md` (je ohne Versionsgeschichte/Erledigt) | keine veralteten Sätze (‚etwa 5 Punkte‘, ‚direkt im Fragetext‘, ‚⏱ Gesamt‘ …); ‚Antwortzeile‘ nur mit ‚mehr als 4 Fragen‘ im Umkreis von 250 Zeichen; Verweise ‚Zusammenarbeit … n‘ bzw. ‚… 0 Nr. n‘ nur auf vorhandene Abschnitte und **n ≤ Zahl der Nummern in Abschnitt 0** (heute 29 – die Zeile ‚26. entfällt‘ zählt mit) |
| `checkCollab` Z. 155–161 | beide `CLAUDE.md` | erste Zeile unter ‚Zuerst lesen‘ nennt `UEBERGABE.md`; **‚**Version X.Y.Z**‘ und ‚## Versionsgeschichte‘**; App-`CLAUDE.md` nennt ‚sh tests/alle.sh‘ |
| `checkCatalog` Z. 91–105 | Zusammenarbeit, beide `CLAUDE.md`, READMEs, `tests/README.md`, Prüfskripte, Code | keine alten Nummern R-nn, nur R-Nummern aus dem Katalog |
| `checkSchema` Z. 274–322 | alle lebenden Dateien der drei Repos (`git ls-files`, ohne `fassung/`, JSON, Bilder, `ZUORDNUNG.md`) | Präfix-Tabelle aus der Zusammenarbeit zwischen ‚**Nummern und Präfixe**‘ und dem nächsten ‚### ‘ (Z. 295); A-, T-, E-, N- vor einer Zahl nur in `arbeit/` als eigene Liste; in Doku-Dateien keine unbekannten Ein-Buchstaben-Präfixe ohne Elternnummer; keine führende Null; Verweise auf `arbeit/…` müssen existieren |
| `veroeffentlichen.mjs` Z. 52, 117 | Zusammenarbeit | nur die Zeile ‚**Version X.Y.Z**‘ (für README und `PROMPT.md` der App) – die Versionsgeschichte liest kein Werkzeug |

---

## 1. Widersprüche, Überholtes, tote Verweise

### F-1 · überholt · Import nennt ‚Zeit und Token am Ende jeder Antwort‘ und liest nur Teile der Zusammenarbeit

- **Stellen:** ReiseLogBuch-Import `CLAUDE.md` Z. 11–13; ReiseLogBuch-Import `PROMPT.md` Z. 9–10; dagegen Zusammenarbeit Z. 230–235 (2.2),
  Z. 152 (0 Nr. 15), Versionsgeschichte Z. 401 (3.10.0).
- **Wortlaut alt:**
  - Import-`CLAUDE.md` Z. 11–12: ‚(`README - Zusammenarbeit allgemein.md`: Arbeitsmodell Abschnitt 0, per du Abschnitt 1, Zeit und Token am
    Ende jeder Antwort 2.2)‘
  - Import-`PROMPT.md` Z. 9–10: ‚Zusammenarbeit allgemein (AppDesign) gilt weiter: per du, Auswahlfenster mit ‚Ich schreibe im Chat‘, Zeit und
    Token am Ende jeder Antwort.‘
  - Zusammenarbeit Z. 234–235 (2.2): ‚Die Zeitzeile des Werkzeugs und die Uhrzeitzeile stehen nicht in der Antwort.‘ · Z. 152 (0 Nr. 15):
    ‚**diese ganze Datei** (einmal je Sitzung …)‘
- **Vorschlag Wortlaut neu:**
  - Import-`CLAUDE.md` Z. 11–13: ‚- Regeln der Zusammenarbeit liegen in g811141a/AppDesign (`README - Zusammenarbeit allgemein.md`, zu Beginn
    die ganze Datei – 0 Nr. 15, zuerst der Kasten ‚Immer‘ und ‚Jede Antwort‘) und gelten auch hier; die Arbeitsumgebung steht in der
    AppDesign-`CLAUDE.md`.‘
  - Import-`PROMPT.md` Z. 9–10: ‚Zusammenarbeit allgemein (AppDesign) gilt weiter, zuerst der Kasten ‚Immer‘ und ‚Jede Antwort‘ (0).‘
  - dazu Import-README neue Version (I-1) und `CLAUDE.md` 1.1.1, `PROMPT.md` 1.2.2.
- **Prüfung liest:** keine Prüfung liest die Import-`CLAUDE.md` oder das Import-`PROMPT.md` auf Wortlaut – nur `checkSchema` (Präfixe;
  der neue Wortlaut enthält keine Nummer mit Buchstaben). `checkCollab` und `checkKasten` C-3 prüfen nur AppDesign- und App-`CLAUDE.md`
  (doku.mjs Z. 155, 226) – deshalb blieb der alte Satz seit 3.10.0 unentdeckt.
- **Einsparung:** keine (gleich lang). **Risiko:** keins – der alte Satz verlangt eine abgeschaffte Zeile.
- **Nachweis:** stand in Import-`CLAUDE.md` Z. 12 und `PROMPT.md` Z. 10 → steht dann nur noch als Verweis auf 0 (Kasten) und 0 Nr. 15 →
  geprüft durch Selbstkontrolle (Vorschlag: `checkKasten` C-3 auf die Import-`CLAUDE.md` ausdehnen, wenn sie daneben liegt – Codeänderung).

### F-2 · Widerspruch · ‚lesend dazuholen‘ gegen ‚Zugriff push‘

- **Stellen:** ReiseLogBuch-Import `CLAUDE.md` Z. 25–26; AppDesign-`CLAUDE.md` Z. 31–32.
- **Wortlaut alt:** Import Z. 25–26: ‚(die beiden Apps mit `add_repo` lesend dazuholen, falls nicht angehängt)‘ · AppDesign Z. 31–32:
  ‚ReiseLogBuch und ReiseLogBuch-Import (privat) mit `add_repo` (Zugriff push) dazuholen‘.
- **Vorschlag Wortlaut neu (Import Z. 25–26):** ‚(die beiden Apps dazuholen wie in der AppDesign-`CLAUDE.md` unter ‚Arbeitsumgebung‘, falls
  nicht angehängt; bei einer Konvertierung werden sie nur gelesen – I-2)‘
- **Prüfung liest:** nur `checkSchema` (‚I-2‘: Präfix I steht in der Tabelle 2.4 → grün).
- **Einsparung:** keine. **Risiko:** keins – die Pflicht ‚Apps nie ändern‘ bleibt in I-2 und Import-`CLAUDE.md` Z. 19.
- **Nachweis:** stand in Import Z. 26 (‚lesend‘) und AppDesign Z. 32 (‚push‘) → steht dann nur in AppDesign Z. 32 → Selbstkontrolle;
  I-2 prüft `pruefen.mjs` (Zustand beider Repos vorher und nachher, `pruefen.mjs` Z. 47, 228, 276).

### F-3 · überholt · ‚Abbruch beim ersten roten Test‘ an vier Stellen

- **Stellen:** ReiseLogBuch `tests/README.md` Z. 8–9; ReiseLogBuch `tests/alle.mjs` Z. 1–2; AppDesign `tests/lauf.mjs` Z. 2 (widerspricht
  Z. 13 derselben Datei); AppDesign `tests/README.md` Z. 80–81; dagegen Zusammenarbeit Z. 72–73 (0 Nr. 2), ReiseLogBuch-`CLAUDE.md` Z. 39–40,
  Befund C-41 (`lauf.mjs` `GRENZE = 3`).
- **Wortlaut alt:** RLB `tests/README.md` Z. 9: ‚und bricht beim ersten roten Test ab (Rückgabewert 1, Fehlerzeilen des Tests werden
  gezeigt)‘ · RLB `alle.mjs` Z. 1–2: ‚Abbruch beim ersten Fehler‘ · AD `lauf.mjs` Z. 2: ‚beim ersten roten Test werden die übrigen beendet.‘ ·
  AD `tests/README.md` Z. 81: ‚beim ersten roten Test werden die übrigen beendet und seine Fehlerzeilen gezeigt.‘ · dagegen 0 Nr. 2 Z. 73:
  ‚Abbruch ab dem dritten roten Lauf, jeder rote Lauf am Ende einmal allein – grün heißt ‚wackelt‘‘.
- **Vorschlag Wortlaut neu:** an allen vier Stellen ‚… ab dem dritten roten Lauf werden die übrigen beendet, jeder rote Lauf läuft am Ende
  einmal allein (Zusammenarbeit 0 Nr. 2)‘ – in RLB `tests/README.md` Z. 9 statt ‚und bricht beim ersten roten Test ab (…)‘: ‚; ab dem dritten
  roten Lauf bricht es ab, jeder rote Lauf läuft am Ende einmal allein (Zusammenarbeit 0 Nr. 2; Rückgabewert 1, Fehlerzeilen werden gezeigt)‘.
- **Prüfung liest:** `checkCatalog` (R-Nummern in `tests/README.md` und `tests/*.mjs` – keine im Vorschlag), `checkSchema` (keine Präfixe),
  `checkCollab` liest `tests/README.md` nicht. ‚Zusammenarbeit 0 Nr. 2‘ wäre für `checkCollab` gültig (Abschnitt 0, 2 ≤ 29).
- **Einsparung:** keine. **Risiko:** gering – nur Kommentare und Doku; `lauf.mjs` und `alle.mjs` liegen in `tests/` → neue Fassung (R-10.3),
  ein Kommentar ändert den Ablauf nicht (Stufe Text erkennt nur App-Texte – Befund C Abschnitt 6).
- **Nachweis:** stand in 4 Dateien falsch, richtig nur in 0 Nr. 2, RLB-`CLAUDE.md` Z. 39–40 und `lauf.mjs` Z. 13 → steht dann einheitlich mit
  Verweis auf 0 Nr. 2 → geprüft durch `lauf-selbsttest.mjs` (Fall APD-5/B-2, Z. 36 ‚kein Abbruch beim ersten‘).

### F-4 · überholt · `messung.mjs` beschreibt noch die Zeile ‚Zeit und Token am Ende jeder Antwort‘

- **Stellen:** AppDesign `werkzeug/messung.mjs` Z. 1–2 (Kopf), Z. 117–118 (Ausgabe); AppDesign `tests/doku.mjs` Z. 134; dagegen Zusammenarbeit
  Z. 232–235 (2.2).
- **Wortlaut alt:** `messung.mjs` Z. 1–2: ‚Zeile ‚Zeit und Token‘ aus den Sitzungsdaten (…; Zusammenarbeit allgemein §2). Claude ruft es am Ende
  jeder Antwort auf und übernimmt die Zeile unverändert – nie schätzen.‘ · Z. 118 gibt weiter ‚`<sub>⏱ … · Token vorige Antwort: … · Kontext …</sub>`‘
  aus · `doku.mjs` Z. 134 (Meldung): ‚es gilt ‚⏱ mm:ss · Token vorige Antwort …‘‘ · dagegen 2.2 Z. 232–235: ‚unmittelbar vor jedem Fenster … setzt
  ihn als ‚(Kontext N)‘ ans Ende jeder Frage im Fenster … Die Zeitzeile des Werkzeugs und die Uhrzeitzeile stehen nicht in der Antwort.‘
- **Vorschlag Wortlaut neu:** `messung.mjs` Z. 1–2: ‚// AppDesign … · Kontextstand aus den Sitzungsdaten (Zusammenarbeit allgemein 2.2):
  Claude ruft es unmittelbar vor jedem Auswahlfenster auf und setzt ‚(Kontext N)‘ ans Ende jeder Frage im Fenster – nie schätzen. Die
  Zeitzeile (⏱ und Token) ist nur zur Kontrolle und steht nicht in der Antwort.‘ · `doku.mjs` Z. 134: ‚Zusammenarbeit 2.2: Zeitzeile mit
  ‚Gesamt‘ – die Zeitzeile steht nicht in der Antwort‘.
- **Prüfung liest:** `checkCatalog` (R-Nummern in Prüfskripten – keine), `checkSchema` (keine Präfixe). Das Muster `/⏱ Gesamt/` (Z. 134)
  bleibt gleich, nur die Meldung ändert sich. `tests/messung.mjs` prüft die Ausgabe, nicht den Kopf.
- **Einsparung:** keine. **Risiko:** gering – Vermutung: eine neue Sitzung, die den Kopf liest, gibt sonst die Zeitzeile wieder aus.
- **Nachweis:** stand in `messung.mjs` Z. 1–2 → steht dann wie 2.2 → geprüft durch `tests/messung.mjs` (Ausgabe) und Selbstkontrolle.

### F-5 · toter Verweis · ‚Zusammenarbeit 7‘ und ‚§2‘ in Prüfung und Werkzeug

- **Stellen:** AppDesign `tests/doku.mjs` Z. 1, 4, 56, 62, 64, 65, 67, 68, 161, 168, 169, 170 (‚Zusammenarbeit (allgemein) 7‘), Z. 145
  (‚Abschnitte 0–9, Abschnitt 0 Nr. 1–17‘); ReiseLogBuch `tests/doku-regeln.mjs` Z. 1; `werkzeug/messung.mjs` Z. 2 (‚§2‘). Abschnitt 7 gibt es
  seit Zusammenarbeit 2.17.0 nicht mehr (Zuordnung Z. 385: ‚Abschnitt 7 Nach jeder Version … | 0 Nr. 1, 2, 9, 11 und 22; 2.3‘); Abschnitt 0 hat
  29 Nummern.
- **Wortlaut alt (Beispiel):** `doku.mjs` Z. 62: ‚E('Zusammenarbeit 7 CHANGELOG: neueste Version ohne Testfälle')‘.
- **Vorschlag neu:** ‚Zusammenarbeit 7‘ → ‚Zusammenarbeit 2.3‘ (Testfälle, Z. 1, 4, 56, 62–68 und doku-regeln Z. 1), Z. 161 → ‚Zusammenarbeit 0 Nr. 2‘
  (Aufruf `sh tests/alle.sh`), Z. 168–170 → ‚Designrichtlinie 11‘ (Versionszeile `PROMPT.md`, R-10.4); Z. 145 → ‚(Abschnitte und Nummern, die es
  gibt)‘; `messung.mjs` ‚§2‘ → ‚2.2‘ (in F-4 enthalten).
- **Prüfung liest:** die Meldungstexte werden von keiner Gegenprobe gesucht (`GEGENPROBEN_SCHEMA` Z. 256–268 sucht nur ‚APD-78/S-n‘, ‚APD-84/C-n‘,
  ‚APD-123/K-1‘). `checkCatalog`/`checkSchema`: keine Nummern betroffen.
- **Einsparung:** keine. **Risiko:** keins – nur Meldungs- und Kommentartext; wer einer roten Meldung folgt, landet heute im Leeren.
- **Nachweis:** Verweise auf Abschnitt 7 → dann auf 2.3, 0 Nr. 2, Designrichtlinie 11 → geprüft durch Lesen (eine Prüfung, die
  Prüfskripte auf Verweise in die Zusammenarbeit liest, gibt es nicht: `checkCollab` Z. 146–152 liest nur Doku-Dateien).

### F-6 · Widerspruch · Endet **jede** Antwort mit einem Fenster oder nur die, nach der der Nutzer etwas tun soll?

- **Stellen:** Zusammenarbeit Z. 23–26 (Kasten Punkt 3), Z. 55–57 (0 Nr. 28), Z. 219–220 (2.1).
- **Wortlaut alt:**
  - Kasten 3: ‚jede Antwort, nach der der Nutzer etwas tun soll (lesen, entscheiden, prüfen, antworten), endet mit einem Auswahlfenster … einzige
    Ausnahme die Übergabe (Nr. 28, 2.1).‘
  - 0 Nr. 28: ‚Jede Frage an den Nutzer kommt ins Auswahlfenster, und jede Antwort endet mit einem – nie ‚Sag Bescheid …‘ oder eine offene Frage
    im Text; Ausnahme: die Übergabe (Nr. 14).‘
  - 2.1 Z. 219–220: ‚… so endet jede Antwort mit einem Fenster und einem Push am iPad.‘ (2.1 nennt keine Ausnahme, obwohl der Kasten für die
    Ausnahme auf 2.1 verweist.)
- **Vorschlag Wortlaut neu:** Kasten 3 bleibt (er ist die genauere Fassung). 0 Nr. 28: ‚**Jede Frage im Fenster:** Jede Frage an den Nutzer kommt
  ins Auswahlfenster, und jede Antwort, nach der der Nutzer etwas tun soll, endet mit einem (Kasten Punkt 3) – nie ‚Sag Bescheid …‘ oder eine
  offene Frage im Text; Ausnahme: die Übergabe (Nr. 14). Am Ende jeder Frage im Fenster steht ‚(Kontext N)‘ (2.2). Format 2.1. Prüfung:
  Selbstkontrolle.‘ · Kasten 3 Schluss: ‚einzige Ausnahme die Übergabe (Nr. 14, 28)‘ · 2.1 Z. 219–220: ‚… – so endet jede Antwort, nach der der
  Nutzer etwas tun soll, mit einem Fenster und einem Push am iPad (Kasten Punkt 3).‘
- **Prüfung liest:** `checkKachel` Kasten 3 (‚**Kachel mit Push:**‘, ‚nach einem Neustart des Arbeitsprozesses‘, ‚Ich schreibe im Chat‘ – bleibt),
  Nr. 28 (‚‚(Kontext N)‘‘, ‚Prüfung: Selbstkontrolle‘ – bleibt), 2.1 (‚vor jedem Fenster‘, ‚ohne Link‘ – unberührt); `checkKasten` C-5
  (‚ Prüfung: Selbstkontrolle.‘ am Ende von Nr. 28 – bleibt), `KASTEN_PFLICHTEN` ‚Nr. 28‘ im Kasten – bleibt.
- **Einsparung:** Nr. 28 etwa 40 Bytes (zweiter Satz kürzer, siehe F-15). **Risiko:** gering – Entscheidung des Nutzers nötig, welche Fassung gilt;
  der Vorschlag nimmt die engere (Kasten, 3.10.0 ‚Kachel mit Push am Ende jeder Antwort, nach der der Nutzer etwas tun soll‘, Z. 401).
- **Nachweis:** stand dreifach mit zwei Bedeutungen → steht dann einmal im Kasten, Nr. 28 und 2.1 verweisen → Selbstkontrolle; Wortlaut
  durch `checkKachel` gesichert.

### F-7 · Widerspruch · ‚nicht sofort bauen (auch kleine Fehler)‘ gegen ‚Korrekturen sofort‘

- **Stellen:** Zusammenarbeit Z. 113–115 (0 Nr. 25), Z. 123–124 (0 Nr. 8).
- **Wortlaut alt:** Nr. 25: ‚→ in ‚0. Nächste Version‘ eintragen, nicht sofort bauen (auch kleine Fehler aus dem Testen) → bauen nur nach Nr. 8
  und 21.‘ · Nr. 8: ‚**Korrekturen sofort:** Fehler aus einer Prüfrunde als eigene Korrekturversion vor allem Neuen, auch ohne Datenverlust (vorher
  fragen).‘
- **Vorschlag Wortlaut neu (Nr. 25):** ‚→ in ‚0. Nächste Version‘ eintragen, nicht ohne Bau-Frage bauen (Fehler aus dem Testen als
  Korrekturversion nach Nr. 8) → bauen nur nach Nr. 8 und 21.‘
- **Prüfung liest:** `checkCollab` Z. 131–132 (‚etwa 5 Punkte‘, ‚nur bei schweren Fehlern‘ dürfen nirgends stehen – der Vorschlag enthält beides
  nicht); `checkKasten` C-5 (Nr. 25 behält ‚Prüfung: Selbstkontrolle.‘).
- **Einsparung:** keine. **Risiko:** gering – beide Stellen meinen vermutlich ‚eintragen und fragen‘; heute kann Nr. 25 als ‚Korrektur warten
  lassen‘ gelesen werden (Vermutung).
- **Nachweis:** stand in Nr. 25 und Nr. 8 gegensätzlich → steht dann in Nr. 8, Nr. 25 verweist → Selbstkontrolle.

### F-8 · Widerspruch · ‚jedes Repo hat eine `BACKLOG.md`‘ – ReiseLogBuch-Import hat keine, und ihr Werkzeug würde eine neue ablehnen

- **Stellen:** Zusammenarbeit Z. 110 (0 Nr. 24), Z. 290 (Tabelle 2.4, RLI-n); Import-README Z. 28–29; Import `werkzeug/pruefen.mjs` Z. 18–19,
  56–57; Import-Repo ohne `BACKLOG.md` (`ls`: `.gitignore`, `CLAUDE.md`, `ERKENNTNISSE.md`, `PROMPT.md`, `README.md`, `werkzeug/`).
- **Wortlaut alt:** Nr. 24: ‚jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4)‘ · Z. 290: ‚Thema von ReiseLogBuch-Import (das erste legt dort
  `BACKLOG.md` an)‘ · `pruefen.mjs` Z. 18–19: `DATEN_ENDUNG` enthält `md`, `ERLAUBT_IM_REPO` nennt nur README, CLAUDE, PROMPT, ERKENNTNISSE.
- **Vorschlag Wortlaut neu (Nr. 24):** ‚**Backlog:** jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4), ReiseLogBuch-Import erst mit dem ersten Thema
  (RLI-n, 2.4); …‘ (Rest unverändert). Dazu beim ersten RLI-Thema `BACKLOG.md` in `ERLAUBT_IM_REPO` aufnehmen (Werkzeug, Import-Version).
- **Prüfung liest:** `checkSchema` (‚RLI-n‘ ohne Zahl → kein Treffer; S-10 verlangt RLI in der Tabelle – bleibt); `checkKasten` C-5 (Nr. 24 behält
  ‚Prüfung‘).
- **Einsparung:** keine. **Risiko:** keins (Regeltext); beim Anlegen der `BACKLOG.md` meldet `pruefen.mjs` RLB-5/F-18 rot, solange die Datei nicht
  committet ist (`git status --porcelain`, Z. 56) – aus dem Code gelesen, nicht ausgeführt.
- **Nachweis:** stand widersprüchlich in Nr. 24 und Z. 290 → steht dann in Nr. 24 mit Verweis auf 2.4 → Selbstkontrolle; `pruefen.mjs --selbsttest`
  nach der Werkzeug-Änderung.

### F-9 · Widerspruch · Import-`PROMPT.md`: ‚mehrere Fenster nacheinander‘ gegen 2.1

- **Stellen:** Import-`PROMPT.md` Z. 136–137; Zusammenarbeit Z. 219–220, 224–225 (2.1).
- **Wortlaut alt:** PROMPT: ‚Mehr als 4 Fragen → mehrere Fenster nacheinander.‘ · 2.1: ‚Nie zwei Fenster direkt hintereinander; ein weiteres Fenster
  in derselben Antwort erst, wenn das vorige beantwortet ist und davor eine neue Ausgabe mit Erklärung steht‘ und ‚Eine **Antwortzeile zum Kopieren**
  … gibt es nur bei mehr als 4 Fragen – dann ist sie der einzige Weg.‘
- **Vorschlag Wortlaut neu (PROMPT Z. 136–138):** ‚- Auswahlfenster nach Zusammenarbeit 2.1 (bis zu 4 Fragen, Empfehlung zuerst mit ‚(Empfohlen)‘,
  immer ‚Ich schreibe im Chat‘); mehr als 4 offene Fragen: die wichtigsten 4 zuerst, die übrigen im nächsten Fenster, nachdem das vorige beantwortet
  ist. Muss der Nutzer vorher etwas lesen (Ausschnitt der Unterlage), steht es vor dem Fenster in der Datei und im Chat (Kasten Punkt 4).‘
- **Prüfung liest:** keine (Import-`PROMPT.md` liest `checkCollab` nicht; ‚Antwortzeile‘ kommt im Vorschlag nicht vor). `checkSchema`: keine Präfixe.
- **Einsparung:** keine. **Risiko:** gering – Entscheidung nötig, ob bei der Konvertierung die Antwortzeile (2.1) oder Fenster nacheinander gelten soll.
- **Nachweis:** stand in PROMPT Z. 137 gegen 2.1 → steht dann als Verweis auf 2.1 → Selbstkontrolle.

### F-10 · Widerspruch · Dauerhaftes und eine Vereinbarung stehen nur in `UEBERGABE.md`

- **Stellen:** `UEBERGABE.md` Z. 25 (Vereinbarung), Z. 27–34 (Hinweis Prüfumgebung); Zusammenarbeit Z. 159–160 (0 Nr. 16), Z. 316–318 (2.5);
  AppDesign-`CLAUDE.md` Z. 36–39.
- **Wortlaut alt:**
  - `UEBERGABE.md` Z. 25: ‚**Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.‘
  - Nr. 16: ‚jede Vereinbarung sofort an ihre Stelle in den Richtlinien (Nr. 3)‘ · 2.5 Z. 317–318: ‚neue Vereinbarungen (stehen zusätzlich schon in den
    Richtlinien) … Dauerhaftes (Arbeitsumgebung, Befehle) steht in der AppDesign-`CLAUDE.md`.‘ · Nr. 6 Z. 97: ‚zuerst nur hell und quer, dunkel und
    hoch erst, wenn hell passt‘ (weicht von ‚nur hell‘ ab).
  - `UEBERGABE.md` Z. 27–34 nennt Dauerhaftes (Pages über `curl api.github.com`, `createRequire`, Zeitgrenze 3 min, nach `los` den Zweig hochladen,
    `git checkout -- werkzeug/package-lock.json` nach `npm install`, Notizordner nach Neustart, ‚AppDesign … HEAD lose: committen und mit
    `git push origin HEAD:main` hochladen‘) – Letzteres neben AppDesign-`CLAUDE.md` Z. 38–39 ‚vor dem ersten Commit `git fetch origin main` und auf
    `origin/main` aufsetzen (`git checkout -b <zweig> origin/main`)‘.
- **Vorschlag Wortlaut neu:** 0 Nr. 6: ‚**Muster:** … zuerst nur hell und quer (bis auf Weiteres nur hell), dunkel und hoch erst, wenn hell passt
  und der Nutzer es verlangt; …‘ – genauer Wortlaut vom Nutzer (die Vereinbarung ist nur in `UEBERGABE.md` belegt). Die Hinweise aus
  `UEBERGABE.md` Z. 27–34 als neuer Punkt ‚**Hinweise zur Prüfumgebung**‘ unter ‚Arbeitsumgebung (Cloud)‘ der AppDesign-`CLAUDE.md`, der Satz zu
  `HEAD:main` als Ergänzung zu ‚Flacher Klon‘ (‚Arbeitsdateien ohne Version: `git push origin HEAD:main`; Versionen: Vorbereitungs-Zweige‘ –
  Vermutung, wie es gemeint ist, vom Nutzer zu bestätigen).
- **Prüfung liest:** `checkKasten` C-5 (Nr. 6 behält ‚Prüfung: Selbstkontrolle.‘); AppDesign-`CLAUDE.md`: `checkCollab` (veraltete Sätze,
  Verweise), `checkCatalog`, `checkSchema` – der Vorschlag enthält weder Nummern noch ‚Antwortzeile‘. `UEBERGABE.md` liest nur `checkSchema`.
- **Einsparung:** in `UEBERGABE.md` etwa 1.000 Bytes (Z. 25, 27–34), in der `CLAUDE.md` gleich viel mehr – keine Einsparung, aber eine Stelle.
  **Risiko:** gering – heute hängt ‚nur hell‘ daran, dass jede Übergabe den Satz abschreibt.
- **Nachweis:** stand nur in `UEBERGABE.md` → steht dann in 0 Nr. 6 bzw. AppDesign-`CLAUDE.md` → Selbstkontrolle.

### F-11 · überholt · ‚iPad‘ allein, wo iPad und iPhone gemeint sind; Name des Backlog-Abschnitts 1

- **Stellen:** Zusammenarbeit Z. 270 (2.4) gegen Z. 292 (Tabelle) und beide `BACKLOG.md` (RLB Z. 29, AppDesign Z. 20); ReiseLogBuch `BACKLOG.md`
  Z. 13; Zusammenarbeit Z. 5; AppDesign `README.md` Z. 5; ReiseLogBuch `README.md` Z. 3; dagegen ReiseLogBuch-`CLAUDE.md` Z. 23 ‚für iPad und
  iPhone‘.
- **Wortlaut alt:** 2.4 Z. 270: ‚**1. Auf dem iPad prüfen:**‘ · Tabelle Z. 292: ‚Backlog ‚Auf iPad und iPhone prüfen‘‘ · beide Backlogs: ‚## 1. Auf iPad
  und iPhone prüfen‘ · RLB-Backlog Z. 13: ‚**prüfen** (auf dem iPad testen)‘ · Zusammenarbeit Z. 5: ‚bei allen iPad-Web-Apps‘ · AD-README Z. 5:
  ‚für alle iPad-Web-Apps‘ · RLB-README Z. 3: ‚als Web-App (PWA) für das iPad‘.
- **Vorschlag Wortlaut neu:** 2.4 Z. 270: ‚- **1. Auf iPad und iPhone prüfen:** je gebauter Version ein Usertest mit Testfällen.‘ · RLB-Backlog Z. 13:
  ‚**prüfen** (auf iPad und iPhone testen)‘ (oder ganz nach F-12) · Zusammenarbeit Z. 5 und AD-README Z. 5: ‚Web-Apps für iPad und iPhone‘ ·
  RLB-README Z. 3: ‚als Web-App (PWA) für iPad und iPhone‘.
- **Prüfung liest:** `checkCollab` Z. 136 sucht nur ‚Läuft nur auf dem iPad|kein Teilen, kein Login‘ (trifft hier nicht); `checkSchema`: keine
  Präfixe; `checkDocs` liest RLB-README nur ab ‚## Verwendete Versionen‘ (Z. 33) – Z. 3 unberührt.
- **Einsparung:** keine. **Risiko:** keins.
- **Nachweis:** stand an 6 Stellen abweichend → einheitlich ‚iPad und iPhone‘ → Selbstkontrolle (Vorschlag: Muster in `checkCollab` Z. 136 um
  ‚iPad-Web-Apps|für das iPad\b|Auf dem iPad prüfen‘ erweitern – Codeänderung).

### F-12 · Widerspruch · Kopf des Reiselogbuch-Backlogs wiederholt Regeln mit anderem Wortlaut

- **Stellen:** ReiseLogBuch `BACKLOG.md` Z. 5–17; Zusammenarbeit Z. 278–279 (2.4 Erinnerung), Z. 110 (0 Nr. 24), Z. 120–123 (0 Nr. 8); dagegen
  AppDesign `BACKLOG.md` Z. 5–6 (nur Verweis).
- **Wortlaut alt:** RLB Z. 6–7: ‚Claude erinnert zu Beginn und am Ende jeder Sitzung an die offenen Punkte‘ · 2.4 Z. 278–279: ‚**Erinnerung:** zu
  Beginn einer Sitzung (kurze Liste) und am Ende jeder Antwort, in der etwas gebaut oder entschieden wurde‘ · RLB Z. 15–17 wiederholt 0 Nr. 8
  (‚2–3 zusammengehörige Punkte (höchstens 2 Themen)‘), Z. 9–13 Priorität und Status aus 0 Nr. 24 und 2.4.
- **Vorschlag Wortlaut neu (RLB Z. 5–17 ersetzen):** ‚Offene Themen des Reiselogbuchs; allgemeine Themen stehen im Backlog von AppDesign. Aufbau und
  Regeln wie in `README - Zusammenarbeit allgemein.md` (AppDesign), 0 Nr. 24 und 2.4.‘
- **Prüfung liest:** `checkCollab` liest die RLB-`BACKLOG.md` bis ‚## Erledigt‘: veraltete Sätze, ‚Antwortzeile‘, Verweise – ‚allgemein.md` (AppDesign),
  0 Nr. 24‘ ist für das Muster in Z. 149 kein Verweis (nach ‚allgemein‘ folgt ‚.md‘), genau wie im AppDesign-Backlog heute; `checkSchema` S-6
  (Themennummern) unberührt; `veroeffentlichen.mjs` Z. 137 ersetzt nur Z. 3 (‚**Stand …** · Aktuelle Version: …‘) – bleibt.
- **Einsparung:** 10 Zeilen, etwa 850 Bytes. **Risiko:** gering – die Erklärung für Leser auf GitHub entfällt, sie steht in 0 Nr. 24 und 2.4.
- **Nachweis:** stand in RLB-Backlog Z. 5–17 (abweichend) → steht dann nur in 0 Nr. 8, 0 Nr. 24, 2.4 → Selbstkontrolle; `checkCollab`.

### F-13 · überholt · AppDesign-README beschreibt Veröffentlichen ohne `fassung` und `stufe`

- **Stellen:** AppDesign `README.md` Z. 59–60; AppDesign-`CLAUDE.md` Z. 54–61; Zusammenarbeit Z. 125–129 (0 Nr. 9).
- **Wortlaut alt:** README: ‚Veröffentlichen mit `node werkzeug/veroeffentlichen.mjs vorbereiten --ad X.Y.Z --app <app>=X.Y.Z`, Texte schreiben,
  committen, dann `… los` – **erst AppDesign, dann die App**‘ · `CLAUDE.md` Z. 56–59: ‚… `node werkzeug/veroeffentlichen.mjs fassung`; committen; vor
  der Bau-Frage `node werkzeug/veroeffentlichen.mjs stufe --app reiselogbuch` …‘.
- **Vorschlag Wortlaut neu (README Z. 59–60):** ‚- Veröffentlichen mit `werkzeug/veroeffentlichen.mjs` – Befehle und Reihenfolge in der
  AppDesign-`CLAUDE.md` (‚Veröffentlichen‘); **erst AppDesign, dann die App** (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`).‘
- **Prüfung liest:** `checkCollab` Z. 172–174 (AppDesign-README: kein ‚gilt sofort für alle Apps‘/‚?v=‘), `checkCatalog` (R-Nummern) – beides erfüllt.
- **Einsparung:** etwa 60 Bytes. **Risiko:** keins.
- **Nachweis:** stand doppelt und unvollständig → steht dann nur in der `CLAUDE.md` → geprüft durch `veroeffentlichen-selbsttest.mjs`.

### F-14 · überholt · Schnittstelle App ↔ ui.js in README und `CLAUDE.md` nur mit 4 Namen

- **Stellen:** AppDesign `README.md` Z. 48–49; ReiseLogBuch-`CLAUDE.md` Z. 37–38; dagegen Befund U-8 (69 Namen, 291 Stellen) und U-44.
- **Wortlaut alt:** README: ‚**Schnittstelle:** Die App stellt bereit: `db.settings.appearance` (…), `save()`, `render()`; optional `onDialogOpen()`.‘
- **Vorschlag:** hier nicht neu fassen – unverändert lassen und mit Plan B-4 aus Befund U (Schnittstellenliste als eigene Datei mit
  statischer Prüfung) ersetzen; dann in README und `CLAUDE.md` nur noch der Verweis auf diese Datei.
- **Prüfung liest:** keine. **Risiko:** keins (nur Hinweis).
- **Nachweis:** Verweis auf `arbeit/APD-135 Befund U Bausteine ui.js.md` U-8, U-44.

---

## 2. Doppelstellen: Abweichungen im Wortlaut und echter Doppeltext (Teil A)

**Gewollte Kurzfassungen mit Verweis (a) – kein Befund:** Kasten ‚Immer‘ → 0 Nr. 21, 22, 8, 27, 29 · Kasten 1 → Abschnitt 1 · Kasten 2 → Nr. 27
(enger: ohne ‚Quelle‘ und ‚So macht es Apple‘ – als Merkzeile harmlos) · Kasten 6 → 2.4 Z. 278–279 (gleicher Wortlaut ‚Nächste Version …: N Punkte
bereit (…)‘, ‚Offen im Backlog: …‘) · Kasten 7 → Nr. 13 und 2.2 · Hinweis Z. 10–11 → Nr. 15 · Nr. 9 → AppDesign-`CLAUDE.md` (Befehle) · Nr. 20 → 2.7 ·
Nr. 25 → Nr. 1, 4, 6, 8, 21, 23 · AppDesign-`CLAUDE.md` Z. 26 → 0 Nr. 2 (Stufen; Einzelheiten Befund C Abschnitt 5 und 6) · AppDesign-`BACKLOG.md`
Z. 6 → 0 Nr. 24 und 2.4 · `UEBERGABE.md` Z. 4–5 → 0 Nr. 15 · ReiseLogBuch-`CLAUDE.md` Z. 18–19 → Zusammenarbeit und AppDesign-`CLAUDE.md`.

### F-15 · Abweichung im Wortlaut · Kontextstand an fünf Stellen, die Bau-Frage ohne Stufe

- **Stellen:** Zusammenarbeit Z. 32–33 (Kasten 5), Z. 43–44 (0 Nr. 21), Z. 56–57 (0 Nr. 28), Z. 232–235 (2.2), Z. 79 (0 Nr. 2); AppDesign-`CLAUDE.md` Z. 17.
- **Wortlaut alt:**
  - Kasten 5: ‚jede Frage im Fenster endet mit ‚(Kontext N)‘, N abgelesen aus `messung.mjs` unmittelbar vor dem Fenster – nie geschätzt (Nr. 21, 28).‘
  - Nr. 21: ‚Vorher immer ‚Soll ich Version X.Y.Z mit … erstellen? (Kontext N) Ja/Nein‘ – der Kontextstand aus `messung.mjs` steht **in der Frage
    selbst** (Nr. 28).‘ (hier steht ‚(Kontext N)‘ **vor** ‚Ja/Nein‘, nicht am Ende)
  - Nr. 28: ‚Am Ende jeder Frage im Fenster steht ‚(Kontext N)‘ aus `messung.mjs` – abgelesen, nie geschätzt.‘
  - 2.2: ‚unmittelbar vor jedem Fenster, nie geschätzt – und setzt ihn als ‚(Kontext N)‘ ans Ende jeder Frage im Fenster (Kasten Punkt 5); meldet das
    Werkzeug einen Fehler, steht der Fehler statt der Zahl da.‘
  - AppDesign-`CLAUDE.md` Z. 17: ‚‚(Kontext N)‘ in jeder Frage im Fenster (`node werkzeug/messung.mjs`, 2.2)‘
  - Nr. 2 Z. 79: ‚Das Skript schlägt die Stufe aus dem Unterschied vor, Claude nennt sie in der Bau-Frage (Nr. 21)‘ – das Muster der Bau-Frage in Nr. 21
    nennt die Stufe nicht.
- **Vorschlag Wortlaut neu:**
  - Nr. 21 Satz 2: ‚Vorher immer ‚Soll ich Version X.Y.Z mit … erstellen (Prüflauf Stufe Text bzw. voll)? (Kontext N)‘ mit Ja/Nein – Stufe nach Nr. 2, der
    Kontextstand steht **in der Frage selbst** (2.2).‘
  - Nr. 28 Satz 2: ‚Am Ende jeder Frage im Fenster steht ‚(Kontext N)‘ (2.2).‘ (siehe F-6)
  - AppDesign-`CLAUDE.md` Z. 17: entfällt mit F-23.
  - Kasten 5 und 2.2 bleiben (Kasten = Merkzeile, 2.2 = einzige ausführliche Stelle).
- **Prüfung liest:** `checkKachel` Kasten 5 (‚‚(Kontext N)‘‘, ‚nie geschätzt‘ – bleibt), Nr. 28 (‚‚(Kontext N)‘‘, ‚Prüfung: Selbstkontrolle‘ – bleibt), 2.2
  (bleibt); Nr. 21 liest keine Prüfung außer `checkKasten` C-5 (‚Prüfung‘ bleibt); der Satz ‚Stufe nach Nr. 2, der …‘ endet nicht mit ‚Nr. 2.‘ (Z. 200).
- **Einsparung:** etwa 50 Bytes. **Risiko:** gering – die Stufe in der Bau-Frage steht heute nur in Nr. 2 und in `UEBERGABE.md` Z. 67 (‚Prüflauf voll‘).
- **Nachweis:** stand an 5 Stellen ausführlich → ausführlich nur 2.2, Muster der Bau-Frage nur Nr. 21 → geprüft durch `checkKachel`, Stufe durch
  `veroeffentlichen.mjs stufe` (Befund C).

### F-16 · Abweichung im Wortlaut · Ausnahme bei der Empfehlung steht nur in 2.1 und ist mehrdeutig

- **Stellen:** Zusammenarbeit Z. 25 (Kasten 3), Z. 98–99 (0 Nr. 7), Z. 212–214 (2.1), Z. 177 (0 Nr. 19); Import-`PROMPT.md` Z. 136.
- **Wortlaut alt:** Kasten 3: ‚Empfehlung zuerst mit ‚(Empfohlen)‘ und Grund, immer ‚Ich schreibe im Chat‘‘ · Nr. 7: ‚die Empfehlung zuerst, jedes Fenster mit
  ‚Ich schreibe im Chat‘‘ · 2.1: ‚die Empfehlung zuerst mit ‚(Empfohlen)‘ (…) und ihrem Grund in der Beschreibung, immer ‚Ich schreibe im Chat‘ – ausgenommen
  nur die Empfehlung bei der Rückmeldung zu einem Usertest (‚P-n: …‘, 2.3).‘ – es bleibt offen, ob die Ausnahme ‚keine Empfehlung‘ oder ‚kein Ich schreibe
  im Chat‘ heißt.
- **Vorschlag Wortlaut neu (Bedeutung vom Nutzer zu bestätigen; Vermutung: keine Empfehlung):** 2.1: ‚… und ihrem Grund in der Beschreibung, immer ‚Ich
  schreibe im Chat‘. Bei der Rückmeldung zu einem Usertest (‚P-n: …‘, 2.3) steht keine Empfehlung.‘ · Kasten 3: ‚… Empfehlung zuerst mit ‚(Empfohlen)‘ und
  Grund (Ausnahme 2.1), immer ‚Ich schreibe im Chat‘; …‘
- **Prüfung liest:** `checkKachel` Kasten 3 (‚Ich schreibe im Chat‘ bleibt) und 2.1 (Pflichtwörter unberührt); `checkKasten` C-2: der Kasten nennt ‚2.1‘
  schon, ‚2.4‘ kommt nicht dazu.
- **Einsparung:** keine. **Risiko:** gering.
- **Nachweis:** stand in 2.1 mehrdeutig, im Kasten ohne Ausnahme → steht dann eindeutig in 2.1, Kasten verweist → Selbstkontrolle.

### F-17 · Abweichung im Wortlaut · ‚Datei vor jeder Kachel‘ – fünf Stellen nennen nur den Chat

- **Stellen:** Zusammenarbeit Z. 27–31 (Kasten 4: Datei **und** Chat, ‚ohne Ausnahme‘); dagegen Z. 99 (0 Nr. 7), Z. 59 (0 Nr. 29), Z. 247 (2.3), Z. 255–256 (2.3);
  Import-`PROMPT.md` Z. 137–138 (nur Datei).
- **Wortlaut alt:** Nr. 7: ‚Längeres immer im Chat – vor dem Fenster (2.1).‘ · Nr. 29: ‚Alter und neuer Text stehen im Chat, danach das Fenster mit ‚Ja/Nein‘
  (2.1).‘ · 2.3 Z. 247: ‚Bei Mustern und Versuchen stehen im Chat der vollständige Link und nummerierte Schritte mit ‚Erwartet: …‘.‘ · 2.3 Z. 255–256: ‚stehen
  alle offenen Usertests einzeln im Chat, auch die früherer Versionen.‘ · PROMPT Z. 137–138: ‚kommt es als Datei vor dem Fenster.‘
- **Vorschlag Wortlaut neu:**
  - Nr. 7: ‚Längeres steht vor dem Fenster in der Datei und im Chat (Kasten Punkt 4, 2.1).‘
  - Nr. 29: ‚Alter und neuer Text stehen in der Datei (Kasten Punkt 4) und im Chat, danach das Fenster mit ‚Ja/Nein‘ (2.1).‘
  - 2.3 Z. 247: ‚Bei Mustern und Versuchen stehen der vollständige Link und nummerierte Schritte mit ‚Erwartet: …‘ in der Datei und im Chat (Kasten Punkt 4).‘
  - 2.3 Z. 255–256: siehe F-18 (in Nr. 11 zusammengeführt).
  - Import-PROMPT: in F-9 enthalten.
- **Prüfung liest:** `checkKachel` Nr. 29 verlangt wörtlich ‚im Chat, danach das Fenster‘ – im Vorschlag enthalten; Nr. 7: `checkCollab` (‚direkt im Fragetext‘
  darf nicht stehen – steht nicht), `checkKasten` C-5 (Nr. 7 und 29 behalten ‚Prüfung‘); 2.3: `checkKachel` verlangt ‚in der Kachel‘ (Z. 257, unberührt).
- **Einsparung:** keine. **Risiko:** keins – heute verleitet jede der vier Stellen allein gelesen dazu, die Datei wegzulassen (Anlass von 3.11.0: ‚das Lagebild
  fehlte vor der Kachel‘, Z. 400).
- **Nachweis:** stand in Kasten 4 vollständig, an 4 Stellen verkürzt → überall ‚Datei und Chat‘ mit Verweis auf Kasten 4 → `checkKachel` (Kasten 4, Nr. 29, 2.1).

### F-18 · doppelt · Bericht: ‚warum die Prüfung ihn übersah‘ und ‚alle offenen Usertests‘ je zweimal, mit verschiedenem Umfang

- **Stellen:** Zusammenarbeit Z. 70 (0 Nr. 1), Z. 134–137 (0 Nr. 11), Z. 255–256 (2.3), Z. 29–30 (Kasten 4).
- **Wortlaut alt:** Nr. 1: ‚dann beheben, dieselbe Lücke überall suchen, im Bericht sagen, warum die Prüfung sie übersah.‘ · Nr. 11: ‚Ist ein Fehler
  durchgerutscht, steht dabei, warum die Prüfung ihn übersah.‘ · Nr. 11: ‚**Bericht** nach einer Version **und jede Bitte, am Gerät zu prüfen** …: … alle
  offenen Usertests vollständig im Chat (und als Datei, Kasten Punkt 4)‘ · 2.3: ‚Am Ende **jeder** Umsetzung – nach einer Version und ebenso nach
  vorbereiteten, noch nicht gebauten Änderungen – stehen alle offenen Usertests einzeln im Chat, auch die früherer Versionen.‘ (weiterer Umfang als Nr. 11)
- **Vorschlag Wortlaut neu:**
  - Nr. 1: ‚… dann beheben, dieselbe Lücke überall suchen und im Bericht nennen (Nr. 11).‘
  - Nr. 11 Satz 1: ‚**Bericht** nach einer Version, nach vorbereiteten, noch nicht gebauten Änderungen **und bei jeder Bitte, am Gerät zu prüfen** (Muster,
    Versuch, Messung, Usertest): Bericht (3–5 Sätze), vollständige Aufzählung aller Änderungen und alle offenen Usertests vollständig, auch die früherer
    Versionen, in der Datei und im Chat (Kasten Punkt 4), danach das Fenster zur Rückmeldung; nie nur ein Verweis aufs CHANGELOG.‘ (Rest unverändert)
  - 2.3 Z. 255–256: streichen (bleibt in Nr. 11).
- **Prüfung liest:** `checkKachel` Nr. 11 verlangt ‚danach das Fenster zur Rückmeldung‘ – enthalten; `checkKasten` `KASTEN_PFLICHTEN` ‚Nr. 11‘ im Kasten –
  unberührt; Nr. 1 und 11 behalten ‚Prüfung‘ (C-5). ‚(Nr. 11)‘ endet mit Klammer, nicht mit ‚11.‘ (Z. 200).
- **Einsparung:** etwa 200 Bytes. **Risiko:** gering – der weitere Umfang aus 2.3 wandert in Nr. 11, nichts fällt weg.
- **Nachweis:** stand in Nr. 1, Nr. 11 und 2.3 → steht dann in Nr. 11 → `doku.mjs` (Testfälle, `checkDocs`) und Selbstkontrolle.

### F-19 · doppelt · Neue Sitzung: Modell, Aufwand und Name in 0 Nr. 13 und 2.5; ein Satz in 2.5 steht falsch

- **Stellen:** Zusammenarbeit Z. 146–147 (0 Nr. 13), Z. 321–327 (2.5 ‚Neue Sitzung starten‘), Z. 339 (2.5, letzter Satz unter ‚Lagebild prüft …‘).
- **Wortlaut alt:** Nr. 13: ‚die neue Sitzung selbst starten – mit dem Modell und dem Aufwand, die in diesem Chat gerade eingestellt sind, Name `<App>
  <Chatnummer> – <Thema>` (2.5).‘ · 2.5: ‚`create_session` in derselben Umgebung mit dem Modell und dem Aufwand, die in diesem Chat gerade eingestellt sind …
  **Name** `<App> <Chatnummer> – <Thema>` mit vierstelliger, aufsteigender Nummer‘ · Z. 339: ‚Gelesen wird zu Beginn wenig, weil alles Gelesene bei jedem
  weiteren Schritt mitverarbeitet wird.‘ (steht unter ‚Lagebild prüft Modell und Aufwand‘ und widerspricht dem Wortsinn von Nr. 15 ‚diese ganze Datei‘)
- **Vorschlag Wortlaut neu:** Nr. 13: ‚… Übergabe schreiben (Nr. 14) und die neue Sitzung selbst starten (2.5).‘ · Z. 339 streichen.
- **Prüfung liest:** Nr. 13: keine Wortlaut-Prüfung (`checkKachel` liest Nr. 13 nicht); Kasten 7 nennt ‚Nr. 13‘ (`KASTEN_PFLICHTEN`) – unberührt; C-5
  (‚Prüfung: Selbstkontrolle anhand von `messung.mjs`‘ bleibt). 2.5 liest keine Prüfung.
- **Einsparung:** etwa 230 Bytes. **Risiko:** gering – 2.5 enthält alles aus Nr. 13 und mehr (`model`, `effort` aus `get_session`).
- **Nachweis:** stand in Nr. 13 und 2.5 → steht dann in 2.5 → Selbstkontrolle.

### F-20 · Abweichung im Wortlaut · ‚Lagebild‘ meint an zwei Stellen verschiedene Inhalte

- **Stellen:** Zusammenarbeit Z. 154 (0 Nr. 15), Z. 316 (2.5); `UEBERGABE.md` Z. 7–34, Z. 22–23 (‚rate_limit_info … im Lagebild nennen‘).
- **Wortlaut alt:** Nr. 15: ‚das **Lagebild** (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand – 2.5)‘ · 2.5: ‚Lagebild (Versionen, Chatnummer,
  Sitzungsgröße, offene Usertests)‘ (als Teil von `UEBERGABE.md`) · `UEBERGABE.md` Z. 22–23 verlangt zusätzlich die Nutzungsgrenze – nur dort.
- **Vorschlag Wortlaut neu (2.5 Satz 1):** ‚- **`UEBERGABE.md`** enthält nur den Stand der Sitzung: Lagebild wie in 0 Nr. 15 und dazu Chatnummer und
  Sitzungsgröße, Ergebnisse, nächster Schritt, danach, neue Vereinbarungen (stehen zusätzlich schon in den Richtlinien), was zuerst zu lesen ist, Starttext.
  Dauerhaftes (Arbeitsumgebung, Befehle) steht in der AppDesign-`CLAUDE.md`.‘ – die Nutzungsgrenze nur aufnehmen, wenn der Nutzer sie dauerhaft im Lagebild
  will (dann in Nr. 15).
- **Prüfung liest:** `checkKachel` Nr. 15 (Pflichtwörter unberührt); 2.5 liest keine Prüfung; ‚0 Nr. 15‘ ist ein gültiger Verweis (Abschnitt 0, 15 ≤ 29).
- **Einsparung:** keine. **Risiko:** keins.
- **Nachweis:** stand mit zwei Listen → eine Liste in Nr. 15, 2.5 verweist → Selbstkontrolle.

### F-21 · Abweichung im Wortlaut · Startfrage (0 Nr. 19) gegen Lagebild (0 Nr. 15); Import wiederholt die Startfrage gekürzt

- **Stellen:** Zusammenarbeit Z. 174–178 (0 Nr. 19), Z. 152–157 (0 Nr. 15); Import-`CLAUDE.md` Z. 7–9; Import-README Z. 12–13.
- **Wortlaut alt:** Nr. 19: ‚liest Claude gezielt (Nr. 15) `UEBERGABE.md` und die Backlog-Köpfe und zeigt **zuerst** das Auswahlfenster ‚Was möchtest du als
  Nächstes tun?‘‘ · Nr. 15: ‚lesen – `UEBERGABE.md`, **diese ganze Datei** …, die Überschriften der Designrichtlinien; alles Weitere (Katalog, Backlog, …) nur,
  soweit die Aufgabe es braucht. Dann das **Lagebild** … als **eigene Antwort** vor jeder Arbeit … danach das Fenster‘ – Nr. 19 nennt die ganze Zusammenarbeit
  nicht, Nr. 15 die Backlog-Köpfe nicht; ob zuerst das Lagebild oder das Fenster der Startfrage kommt, sagt keine Stelle. · Import Z. 7–9: ‚zuerst das
  Auswahlfenster ‚Was möchtest du als Nächstes tun?‘ – hier mit **‚Reiselogbücher konvertieren‘**, dazu je weiterem angehängtem Repo eine Möglichkeit
  (Version, Backlog-Spitze) und ‚Ich schreibe im Chat‘.‘ (ohne ‚offene Usertests zuerst‘, ‚(Empfohlen)‘, ‚mehr als 3 Repos‘ aus Nr. 19)
- **Vorschlag Wortlaut neu (Entscheidung zur Reihenfolge nötig):** Nr. 19 Satz 1: ‚**Startfrage:** Beginnt eine Sitzung ohne konkreten Auftrag (‚Start‘, ‚Hallo‘
  oder nur angehängte Repos), liest Claude wie in Nr. 15 und dazu die Backlog-Köpfe; das Fenster nach dem Lagebild ist dann ‚Was möchtest du als Nächstes
  tun?‘: …‘ (Rest unverändert) · Import Z. 7–9: ‚- **Startfrage** nach Zusammenarbeit 0 Nr. 19 (dort steht schon ‚Reiselogbücher konvertieren‘).‘
- **Prüfung liest:** Nr. 19: nur `checkKasten` C-5 (‚Prüfung: Selbstkontrolle.‘ bleibt). Import-`CLAUDE.md`: nur `checkSchema` (keine Präfixe).
- **Einsparung:** Import-`CLAUDE.md` etwa 200 Bytes. **Risiko:** gering – heute kann eine Sitzung ohne Auftrag die Startfrage ohne Lagebild stellen oder
  umgekehrt.
- **Nachweis:** stand in Nr. 15, Nr. 19 und Import Z. 7–9 → steht dann in Nr. 15 (Lesen, Lagebild) und Nr. 19 (Inhalt des Fensters) → Selbstkontrolle.

### F-22 · doppelt · ReiseLogBuch-`CLAUDE.md` wiederholt 0 Nr. 2; ‚feste Fassung‘ an vier Stellen

- **Stellen:** ReiseLogBuch-`CLAUDE.md` Z. 39–41 gegen Zusammenarbeit Z. 72–74 (0 Nr. 2); feste Fassung: Zusammenarbeit Z. 130–133 (0 Nr. 10),
  AppDesign-`CLAUDE.md` Z. 21–24, AppDesign-`README.md` Z. 43–58, ReiseLogBuch-`CLAUDE.md` Z. 25–28 (dazu Designrichtlinie 11 und 14).
- **Wortlaut alt:** RLB Z. 39–40: ‚– alle Prüfungen parallel in Chromium und WebKit, Abbruch ab dem dritten roten Lauf, rote Läufe am Ende einmal allein
  (‚wackelt‘), `--alle` zeigt alle roten, Gegenprobe `--gegenprobe`‘ (heute gleich wie 0 Nr. 2 – aber eine zweite Stelle, die bei der nächsten Änderung
  vergessen werden kann, wie in F-3 geschehen). ‚wird nur nach Rückfrage gehoben‘ steht in Nr. 10, AppDesign-`CLAUDE.md` Z. 22 und README Z. 55–56.
- **Vorschlag Wortlaut neu (RLB Z. 39–41):** ‚- Prüfen: `node tests/alle.mjs` (oder `sh tests/alle.sh`) im Repo-Ordner – Ablauf und Stufen nach Zusammenarbeit
  0 Nr. 2; Einrichten: AppDesign-`CLAUDE.md`; die Prüfungen: `tests/README.md`.‘ · feste Fassung: unverändert lassen (README ist die Beschreibung für Leser auf
  GitHub, die `CLAUDE.md`-Zeilen sind kurz) – nur bei der nächsten Änderung an R-10.3 alle vier Stellen mitziehen.
- **Prüfung liest:** `checkCollab` Z. 161 verlangt ‚sh tests/alle.sh‘ in der RLB-`CLAUDE.md` – enthalten; Verweis ‚Zusammenarbeit 0 Nr. 2‘ gültig (Z. 149–151);
  `checkCatalog` (keine R-Nummer), `checkSchema` (keine Präfixe).
- **Einsparung:** etwa 140 Bytes in einer Datei, die jede Sitzung automatisch geladen wird. **Risiko:** keins.
- **Nachweis:** stand in 0 Nr. 2 und RLB-`CLAUDE.md` → steht dann in 0 Nr. 2 → `lauf-selbsttest.mjs`.

### F-23 · doppelt · AppDesign-`CLAUDE.md` ‚Verpflichtend‘ wiederholt eine Auswahl – zwei davon stehen nicht im Kasten

- **Stellen:** AppDesign-`CLAUDE.md` Z. 15–17; Zusammenarbeit Z. 17–18 (Kasten ‚Immer‘).
- **Wortlaut alt:** ‚Alle Regeln stehen in der Zusammenarbeit allgemein (hier keine Wiederholung) – zuerst der Kasten ‚Jede Antwort‘, dazu Startfrage ohne Auftrag
  (0 Nr. 19), nie ohne ‚Ja‘ bauen (0 Nr. 21), Testfall-Liste vor jedem Bau (0 Nr. 1), erst Usertests, dann Neues (0 Nr. 22), Auswahlfenster mit ‚Ich schreibe im
  Chat‘ (0 Nr. 7) und ‚(Kontext N)‘ in jeder Frage im Fenster (`node werkzeug/messung.mjs`, 2.2).‘ · Kasten ‚Immer‘: ‚nie ohne ‚Ja‘ bauen (Nr. 21) · erst
  Usertests, dann Neues (Nr. 22) · Sammelversionen (Nr. 8) · nur Belegtes (Nr. 27) · Regeln nur mit Genehmigung (Nr. 29).‘ – Startfrage (Nr. 19) und
  Testfall-Liste (Nr. 1) stehen nur in der `CLAUDE.md`; ‚Datei vor jeder Kachel‘ (Kasten 4) fehlt in ihrer Auswahl.
- **Vorschlag Wortlaut neu:**
  - Kasten ‚Immer‘: ‚> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Testfall-Liste vor jedem Bau (Nr. 1) · Sammelversionen
    (Nr. 8) · nur Belegtes (Nr. 27) · Regeln nur mit Genehmigung (Nr. 29) · ohne Auftrag zuerst die Startfrage (Nr. 19).‘
  - AppDesign-`CLAUDE.md` Z. 15–17: ‚Alle Regeln stehen in der Zusammenarbeit allgemein – zuerst der Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0;
    hier keine Wiederholung.‘
- **Prüfung liest:** `checkKasten` Z. 235 (Kasten beginnt mit ‚> **Immer:**‘ – bleibt), Z. 236 (`KASTEN_PFLICHTEN` – alle bleiben), Gegenprobe C-2 (‚2.4‘ nur in
  Punkt 6 – der neue Text enthält kein ‚2.4‘); AppDesign-`CLAUDE.md`: `checkKasten` C-3 liest nur ‚Zuerst lesen‘ (unberührt), `checkCollab` (Verweis-Muster
  trifft ‚Zusammenarbeit allgemein –‘ nicht), `checkCatalog`, `checkSchema` – grün.
- **Einsparung:** etwa 270 Bytes in der automatisch geladenen `CLAUDE.md`, etwa 90 Bytes mehr im Kasten. **Risiko:** gering – die beiden Pflichten, die heute nur
  in der `CLAUDE.md` hervorgehoben sind, kommen in den Kasten.
- **Nachweis:** stand als Auswahl in der `CLAUDE.md` → steht dann im Kasten ‚Immer‘ → `checkKasten`.

### F-24 · doppelt · AppDesign-`CLAUDE.md` wiederholt die Import-Anleitung

- **Stellen:** AppDesign-`CLAUDE.md` Z. 40–41; Import-`CLAUDE.md` Z. 17–18, 27–28; Import-`PROMPT.md` Z. 16–18, 38–39, 52.
- **Wortlaut alt:** AppDesign Z. 40–41: ‚**ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz) – Originale, Ergebnisse und Protokolle nur im
  Notizordner der Sitzung. Im Ordner `werkzeug` einmal `npm install`, dann `node werkzeug/pruefen.mjs <Datei> --zone <Zeitzone>`.‘
- **Vorschlag Wortlaut neu:** ‚- **ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz); Konvertieren und Prüfen nach dessen `CLAUDE.md` und
  `PROMPT.md`.‘ – erst nach F-38 (sonst geht der Hinweis auf `--zone` verloren, den die Import-`CLAUDE.md` heute nicht hat).
- **Prüfung liest:** `checkCollab`, `checkCatalog`, `checkSchema` auf der AppDesign-`CLAUDE.md` – keine Nummern, kein ‚Antwortzeile‘.
- **Einsparung:** etwa 150 Bytes (automatisch geladen). **Risiko:** gering, wenn F-38 vorher umgesetzt ist.
- **Nachweis:** stand in AppDesign-`CLAUDE.md` und Import → steht dann in Import → `pruefen.mjs` (RLB-5/F-18).

### F-25 · doppelt · 2.1 sagt Einiges zweimal und enthält Erklärsätze ohne Pflicht

- **Stellen:** Zusammenarbeit Z. 214–215 und 218–219 (Link), Z. 219–221 und Kasten 3 Z. 23–24 und 2.3 Z. 258 (Push), Z. 221 (‚(ganze Zeile, Einschätzung,
  Kachel)‘), Z. 227 und Z. 235 (Erklärsätze).
- **Wortlaut alt:** Z. 214–215: ‚keine Erklärtexte, keine Zeitangaben, auch bei Bitten, am Gerät zu prüfen, kein Link.‘ · Z. 218–219: ‚Das Fenster enthält nur
  die kurze Frage, ohne Link.‘ · Z. 221: ‚Mehrere Themen nacheinander: je Fenster eines (ganze Zeile, Einschätzung, Kachel).‘ (Klammer unklar – Vermutung: Rest aus
  2.18.0 ‚w‘, Z. 414) · Z. 227: ‚Die laufende Zeitanzeige während der Bearbeitung kommt von der App.‘ · Z. 235: ‚Nutzung in Prozent und Rücksetzzeiten zeigt nur die
  Claude-App.‘
- **Vorschlag Wortlaut neu:** Z. 214–215: ‚Im Fenster steht nur eine **kurze Frage** mit den Schaltflächen – keine Erklärtexte, keine Zeitangaben. Das Feld
  ‚Sonstiges‘ schneidet lange Texte ab.‘ · Z. 221: ‚Mehrere Themen nacheinander: je Fenster eines.‘ · Z. 227 Satz 3 und Z. 235 Satz 3 streichen. ‚Die
  Vorschau-Funktion kommt nicht an.‘ bleibt (verhindert einen Fehler).
- **Prüfung liest:** `checkKachel` 2.1 verlangt ‚**Die Datei davor, das Fenster danach:**‘, ‚SendUserFile‘, ‚vor jedem Fenster‘, ‚ohne Link‘ – alle in Z. 216–219,
  bleiben; 2.2 verlangt ‚Kontextstand‘ (Überschrift), ‚‚(Kontext N)‘‘, ‚⚠ Übergabe fällig‘ – bleiben; `checkCollab` Z. 140–144 (‚Antwortzeile‘ mit ‚mehr als 4
  Fragen‘ in Z. 224 – unberührt).
- **Einsparung:** etwa 250 Bytes. **Risiko:** keins.
- **Nachweis:** stand doppelt in 2.1 → einmal in 2.1 (‚ohne Link‘) und Kasten 4 → `checkKachel`.

---

## 3. Lesekosten zu Beginn einer Sitzung (Teil D)

Grundlage: 0 Nr. 15 (Z. 152) lässt zu Beginn `UEBERGABE.md` und ‚**diese ganze Datei** (einmal je Sitzung, etwa 14.000 Token)‘ lesen; die drei
`CLAUDE.md` lagen in dieser Sitzung vollständig samt Versionsgeschichte im Kontext (Systemhinweis zu Beginn), werden also ohne Zutun geladen.
Per grep belegt: **keine Prüfung und kein Werkzeug liest die Versionsgeschichte der Zusammenarbeit.** `checkCatalog` (doku.mjs Z. 91), `checkCollab`
(Z. 116) und `checkKachel` (Z. 195) schneiden sie ab (`noHistory`); `veroeffentlichen.mjs` liest nur ‚**Version X.Y.Z**‘ (Z. 52, 117) und erhöht die Version der
Zusammenarbeit nicht; `checkSchema` liest jede lebende Datei ganz (auch eine neue). `tests/version.mjs` Z. 21 kopiert die Datei als Ganzes in jede Fassung
(`TEXTE`). Für die `CLAUDE.md` verlangt `checkCollab` Z. 159 dagegen ‚## Versionsgeschichte‘.

### F-26 · Lesekosten · Versionsgeschichte der Zusammenarbeit in eine eigene Datei

- **Stellen:** Zusammenarbeit Z. 391–462 (73 Zeilen, 21.873 Bytes = 39 %); Designrichtlinie allgemein Z. 395–396 (11); ReiseLogBuch-Stummel
  `README - Zusammenarbeit allgemein.md` Z. 6.
- **Wortlaut alt:** Designrichtlinie 11: ‚jede dieser Dateien hat ihre eigene Nummer und am Ende eine Versionsgeschichte‘ · Stummel Z. 6: ‚Die Versionsgeschichte bis
  1.9.0 steht in der Datei in AppDesign.‘
- **Vorschlag Wortlaut neu:**
  - neue Datei `README - Zusammenarbeit Versionsgeschichte.md` (Kopf ‚# Zusammenarbeit allgemein – Versionsgeschichte‘, darunter die Tabelle unverändert und die
    Zuordnung alt → neu aus F-27);
  - in der Zusammenarbeit statt Z. 391–462: ‚## Versionsgeschichte‘ und darunter ‚Steht in `README - Zusammenarbeit Versionsgeschichte.md` (neueste oben); jede
    neue Version bekommt dort eine Zeile.‘ (die Überschrift bleibt, damit `noHistory` und `checkKachel` gleich schneiden);
  - Designrichtlinie 11: ‚… jede dieser Dateien hat ihre eigene Nummer und am Ende eine Versionsgeschichte (die Zusammenarbeit in einer eigenen Datei, weil sie in
    jeder Sitzung ganz gelesen wird – Zusammenarbeit 0 Nr. 15):‘;
  - Stummel Z. 6: ‚Diese Datei bleibt nur als Verweis. Die Versionsgeschichte steht in AppDesign (`README - Zusammenarbeit Versionsgeschichte.md`).‘
- **Prüfung liest:** keine Prüfung liest die Tabelle (siehe oben); `checkSchema` liest die neue Datei wie heute die alte Stelle (gleicher Text, gleicher Befund:
  grün; Schlüssel ‚AppDesign/README - Zusammenarbeit Versionsgeschichte.md‘ ist eine Doku-Datei nach Z. 297); `checkCatalog` liest die Designrichtlinie ohne
  Katalog auf R-Nummern – der neue Satz hat keine. `tests/version.mjs` `TEXTE` kann bleiben (die Fassung enthält dann den Regeltext ohne Geschichte) oder um die
  neue Datei ergänzt werden (Änderung in `tests/` → neue Fassung, voller Lauf).
- **Einsparung:** etwa 21.700 Bytes je Sitzung; nach der Angabe in Nr. 15 (14.000 Token für 55.557 Bytes) hochgerechnet etwa 5.500 Token – **nicht gemessen**.
- **Risiko:** gering – keine Regel ändert sich; die Begründungen (‚Anlass …‘) stehen zu Beginn nicht mehr im Kontext. Regeländerung an Designrichtlinie 11 (0 Nr. 29:
  Wortlaut-Ja).
- **Nachweis:** stand in Zusammenarbeit Z. 391–462 → steht dann in der eigenen Datei → geprüft durch `checkSchema` (Präfixe); dass Regeltext und Geschichte getrennt
  bleiben: `noHistory` in `checkCollab`/`checkCatalog`.

### F-27 · Lesekosten (und Geschichte) · ‚Zuordnung alt → neu‘ ist reine Geschichte

- **Stellen:** Zusammenarbeit Z. 369–388 (20 Zeilen, 964 Bytes).
- **Wortlaut alt:** Z. 371: ‚Bis 2.16.0 gab es neben Abschnitt 0 die Abschnitte 2–9 und drei Kästen oben; … Sie stehen jetzt hier (Verweise in Changelogs, im Verlauf
  und in Kommentaren der Prüfungen nennen noch die alten Stellen)‘.
- **Vorschlag:** an Stelle Zusammenarbeit Z. 367–388 streichen, bleibt als ‚## Zuordnung alt → neu (bis 2.16.0)‘ am Ende von `README - Zusammenarbeit
  Versionsgeschichte.md` (F-26) – oder, ohne F-26, unter die Überschrift ‚## Versionsgeschichte‘ verschieben (dann schneidet `noHistory` sie ab).
- **Prüfung liest:** keine – `checkCollab` Z. 146 zählt nur ‚## n. ‘-Abschnitte; Verweise wie ‚Abschnitt 7‘ in der Tabelle stehen ohne ‚Zusammenarbeit‘ davor und
  werden nicht als Verweis gelesen.
- **Einsparung:** 964 Bytes. **Risiko:** keins – die alten Verweise (z. B. ‚Zusammenarbeit 7‘ in `doku.mjs`, F-5) bleiben nachschlagbar.
- **Nachweis:** stand im Regelteil → steht dann in der Versionsgeschichte → keine Prüfung nötig.

### F-28 · Lesekosten · Versionsgeschichten der beiden `CLAUDE.md` werden in jeder Sitzung automatisch geladen

- **Stellen:** AppDesign-`CLAUDE.md` Z. 67–86 (2.322 Bytes), ReiseLogBuch-`CLAUDE.md` Z. 45–69 (2.289 Bytes); `doku.mjs` Z. 159; Designrichtlinie 11 Z. 396.
- **Wortlaut alt:** `doku.mjs` Z. 159: ‚if (!version(t) || !/\n## Versionsgeschichte/.test(t)) E(`Designrichtlinie 11: ${name} ohne Version oder Versionsgeschichte`)‘.
- **Vorschlag:** beide Tabellen in je eine Datei `CLAUDE Versionsgeschichte.md` im selben Repo; in der `CLAUDE.md` bleibt ‚## Versionsgeschichte‘ mit dem Satz
  ‚Steht in `CLAUDE Versionsgeschichte.md`.‘ – dann bleibt `checkCollab` Z. 159 ohne Codeänderung grün (die Überschrift bleibt). Designrichtlinie 11 wie in F-26 um
  ‚(die `CLAUDE.md` ebenso)‘ ergänzen.
- **Prüfung liest:** `checkCollab` Z. 158–159 (‚**Version X.Y.Z**‘ und ‚## Versionsgeschichte‘ – bleiben), `checkKasten` C-3 (nur ‚Zuerst lesen‘), `checkSchema` (neue
  Dateien wie heute die Tabellen).
- **Einsparung:** etwa 4.400 Bytes, die jede Sitzung ohne Zutun im Kontext hat. **Risiko:** gering – Regeländerung an Designrichtlinie 11.
- **Nachweis:** stand am Ende beider `CLAUDE.md` → steht dann in eigener Datei → `checkCollab` Z. 159 (Überschrift), `checkSchema`.

### F-29 · Lesekosten · was nicht ausgelagert werden sollte, und eine unbelegte Zahl

- **Nicht auslagern ohne Codeänderung:** 2.4 ‚Nummern und Präfixe‘ (Z. 281–313, 3.267 Bytes) – `checkSchema` liest die Präfix-Tabelle aus genau dieser Datei
  (doku.mjs Z. 295, Schlüssel Z. 282) und die Gegenprobe S-10 entfernt dort die Zeile ‚| **RLB-n** |‘ (Z. 293). Kasten (Z. 17–35) – `checkKasten` verlangt ihn am
  Anfang von Abschnitt 0. **Nicht auslagern wegen Fehlerrisiko:** 2.6 und 2.7 (1.811 Bytes) – Regeln, die nur ‚gezielt‘ gelesen würden, gehen leichter verloren
  (Vermutung; 0 Nr. 15 setzt ‚die ganze Datei‘ gerade deshalb, Versionsgeschichte 3.0.0 Z. 411).
- **Unbelegte Zahl:** 0 Nr. 15 Z. 152 ‚(einmal je Sitzung, etwa 14.000 Token)‘ – die Zahl hat keine Quelle in der Datei und stimmt nach F-26 nicht mehr (0 Nr. 27 ‚Nur
  Belegtes‘). **Vorschlag:** ‚**diese ganze Datei** (einmal je Sitzung)‘.
- **Prüfung liest:** `checkKasten` C-4: Nr. 15 muss ‚diese ganze Datei‘ enthalten, die Gegenprobe C-4 (Z. 230) ersetzt wörtlich ‚**diese ganze Datei** (einmal je
  Sitzung‘ – der Vorschlag behält genau diesen Anfang; `checkKachel` Nr. 15 (‚als **eigene Antwort**‘, ‚das Lagebild im Chat und als Datei, danach das Fenster‘ –
  unberührt).
- **Einsparung:** 21 Bytes. **Risiko:** keins.
- **Nachweis:** stand mit unbelegter Zahl → ohne Zahl → `checkKasten` C-4.

---

## 4. Geschichte im Regeltext (Teil C)

Zählung `befund/f/geschichte.mjs` (Zusammenarbeit vor der Versionsgeschichte): 14 Zeilen mit Treffern; davon **keine Geschichte**: Z. 3 (Versionszeile),
Z. 184 (‚gemessene Muster‘), Z. 269 (Spalte ‚bereit seit‘), Z. 288–289, 302–303 (Beispielnummern in der Tabelle). **Geschichte:** Z. 281, 310, 329–330, 364; dazu
Z. 51 (Nr. 26) und Z. 371–375 (F-27). In den drei `CLAUDE.md` außerhalb der Versionsgeschichte: AppDesign Z. 48 (‚zurzeit Chrome 153 = 1243‘ – Zustand der
Umgebung, darf bleiben) und Z. 53 (F-32).

### F-30 · Geschichte · ‚seit 2.20.0, APD-78‘ und ‚Umgestellt wurde mit …‘ in 2.4

- **Stellen:** Zusammenarbeit Z. 281, Z. 308–310.
- **Wortlaut alt:** Z. 281: ‚**Nummern und Präfixe** (seit 2.20.0, APD-78): eine Nummer bezeichnet überall genau eine Sache‘ · Z. 310: ‚Umgestellt wurde mit
  `werkzeug/umbenennen.mjs`.‘
- **Vorschlag Wortlaut neu:** Z. 281: ‚**Nummern und Präfixe** – eine Nummer bezeichnet überall genau eine Sache · …‘ · Z. 310: den Satz streichen (steht in
  Versionsgeschichte 2.20.0, Z. 412, und `ZUORDNUNG.md`). ‚(bis AppDesign 4.35.0: A-, T-, E-, N- …)‘ in Z. 308 bleibt – es legt fest, welche Nummern alt sind.
- **Prüfung liest:** `checkSchema` Z. 295 schneidet die Tabelle bei der Zeichenfolge ‚**Nummern und Präfixe**‘ – sie muss **genau so** bleiben (‚**Nummern und
  Präfixe:**‘ mit Doppelpunkt im Fettdruck würde die Präfix-Tabelle leer machen und überall S-1/S-10 rot melden); ‚A-, T-‘ ohne Zahl trifft das Muster nicht.
- **Einsparung:** etwa 90 Bytes. **Risiko:** keins bei genau diesem Wortlaut.
- **Nachweis:** stand in 2.4 → steht dann in der Versionsgeschichte 2.20.0 → `checkSchema`.

### F-31 · Geschichte · ‚gemessen 15.11.2026, Sitzung 0115‘ in 2.5

- **Stellen:** Zusammenarbeit Z. 328–330 (2.5 ‚Aufwand‘); Versionsgeschichte 3.14.0 Z. 396.
- **Wortlaut alt:** ‚Die Umgebungsvariable `CLAUDE_CODE_EFFORT_LEVEL` bleibt ungesetzt: Sie übergeht die Einstellung im Chat (gemessen 15.11.2026, Sitzung 0115: Chat
  ‚mittel‘, alle Aufrufe ‚hoch‘).‘
- **Vorschlag Wortlaut neu:** ‚Die Umgebungsvariable `CLAUDE_CODE_EFFORT_LEVEL` bleibt ungesetzt: Sie übergeht die Einstellung im Chat.‘ – die Messung als ‚Anlass:
  gemessen 15.11.2026, Sitzung 0115 – Chat ‚mittel‘, alle Aufrufe ‚hoch‘‘ in die Zeile 3.14.0 der Versionsgeschichte.
- **Prüfung liest:** keine. **Einsparung:** etwa 70 Bytes. **Risiko:** keins.
- **Nachweis:** stand in 2.5 → steht dann in Versionsgeschichte 3.14.0 → keine Prüfung nötig.

### F-32 · Geschichte · Regelwächter: was gehen kann und was die Prüfung festhält

- **Stellen:** Zusammenarbeit Z. 51 (0 Nr. 26), Z. 362–365 (2.8); AppDesign-`CLAUDE.md` Z. 53.
- **Wortlaut alt:** Nr. 26: ‚entfällt (APD-123).‘ · 2.8: ‚Abgeschaltet (APD-123, Nutzer 07.11.2026); Werkzeug (`werkzeug/regelwaechter.mjs`) und Prüfung
  (`tests/regelwaechter.mjs`) bleiben im Repo, eingerichtet wird er nicht mehr.‘ · `CLAUDE.md` Z. 53: ‚**Regelwächter** (Zusammenarbeit 2.8): abgeschaltet (APD-123);
  Werkzeug und Prüfung bleiben im Repo, nicht einrichten.‘
- **Vorschlag Wortlaut neu:** Nr. 26 **bleibt** (die Nummern bleiben fest, Z. 37–38; `checkKachel` Z. 205 verlangt ‚entfällt (APD-123)‘; `checkCollab` Z. 147 zählt
  die Nummern – ohne die Zeile wären es 28 und ein Verweis ‚0 Nr. 29‘ in einer geprüften Datei würde rot). · 2.8: ‚- Abgeschaltet (APD-123); Werkzeug
  (`werkzeug/regelwaechter.mjs`) und Prüfung (`tests/regelwaechter.mjs`) bleiben im Repo und werden nicht eingerichtet.‘ · `CLAUDE.md` Z. 53: streichen (bleibt 2.8).
  Ganz streichen lässt sich 2.8 erst mit einer Änderung an `checkKachel` (Eintrag ‚2.8‘ in der Liste Z. 208).
- **Prüfung liest:** `checkKachel` 2.8 ‚Abgeschaltet (APD-123‘ – bleibt; AppDesign-`CLAUDE.md`: keine Prüfung verlangt die Zeile.
- **Einsparung:** etwa 150 Bytes in der automatisch geladenen `CLAUDE.md`, 25 Bytes in 2.8. **Risiko:** keins.
- **Nachweis:** stand in 2.8 und `CLAUDE.md` → steht dann in 2.8 → `checkKachel`.

### F-33 · Geschichte · ‚seit …‘ in Doku und Kopfkommentaren (kein Regeltext)

- **Stellen (Zählung `grep -c 'seit [0-9]'`):** ReiseLogBuch `tests/README.md` 16 Zeilen (z. B. Z. 11–12 ‚(seit 3.33.0)‘, ‚(seit 3.35.0)‘), ReiseLogBuch `tests/alle.mjs`
  12 Zeilen (Z. 4–12 Liste ‚seit 3.36.0 läuft … mit‘), AppDesign `README.md` 5 Zeilen (Z. 14, 17, 18, 43, 54).
- **Vorschlag:** keine Regeländerung nötig (0 Nr. 3 gilt für Regeltext). Bei der nächsten Berührung: `alle.mjs` Z. 4–12 streichen (die Liste der Prüfungen steht im
  Code darunter, die Geschichte im CHANGELOG); README Z. 17–18 ‚seit 4.14.0 …‘, ‚seit 4.58.0‘ streichen.
- **Prüfung liest:** `checkCatalog` (R-Nummern), `checkSchema` (Präfixe) – keine betroffen. **Einsparung:** etwa 1.200 Bytes (nicht zu Beginn gelesen). **Risiko:** keins.
- **Nachweis:** stand in Doku/Kommentar → CHANGELOG → keine Prüfung nötig.

---

## 5. ReiseLogBuch-Import (Teil E)

Stand des Import-Repos: README ‚Geprüft mit‘ Reiselogbuch 3.34.0 und AppDesign 4.36.0 (Import-README Z. 36–37), heute 3.56.3 und 4.59.3 (`APP_VERSION` index.html
Z. 144; README ReiseLogBuch Z. 15–16). Gleich geblieben (index.html gegen `PROMPT.md`): Reisemittel (`TRANSPORT` Z. 169–178, dieselben 8 Kennungen wie PROMPT Z. 69),
Wetter (`WEATHER` Z. 168, dieselben 7 Zeichen wie PROMPT Z. 117), Smileys der Beispiele in PROMPT Z. 101 (alle in `DEFAULT_MOODS` Z. 179), Backup-Format
(`readBackup` ui.js Z. 1524–1530: Liste `trips`, `savedAt`, `savedOn`), Abfrage ‚Abgleichen‘/‚Ersetzen‘ (ui.js Z. 1665–1666). Der Satz ‚Hat sich die App-Version seit
der letzten Konvertierung geändert …, **zuerst melden** und Anleitung und Werkzeug hier anpassen (RLB-5/E-11)‘ (PROMPT Z. 40–41) greift also bei der nächsten
Konvertierung – die Befunde F-34 bis F-36 sind genau diese Anpassung.

### F-34 · Import · Kilometer und Quartierpreis gibt es seit Reiselogbuch 3.41.0 – Anleitung und Werkzeug kennen sie nicht

- **Stellen:** Import-`PROMPT.md` Z. 62 (‚Stand bei Version 1.0.0 (Reiselogbuch 3.15.1)‘), Z. 64–79 (Format ohne `kmColumn`, `priceOn`, `km`, `price`), Z. 47–49 (Spalten
  setzen), Z. 120 (‚**Alles ohne passendes Feld** (Kilometer, Tageskosten, Uhrzeiten, Links, Bilder) | **immer Kachelfrage**‘); Import `werkzeug/pruefen.mjs` Z. 36–37
  (Tagesfelder nur aus dem Block `const next = {…}`), Z. 90 (unbekanntes Tagesfeld → RLB-5/F-13 rot); ReiseLogBuch `index.html` Z. 210 (`labels`: ‚kmColumn: ‚Spalte
  Gegangene Kilometer‘, km: ‚Gegangene Kilometer‘, price: ‚Preis‘, priceOn: …‘), Z. 258–259 (`normalize`: ‚t.kmColumn ??= false;   // seit 3.41.0 (RLB-110)‘, ‚t.priceOn
  ??= false;    // seit 3.42.0 (RLB-111)‘), Z. 265–266 (`price` ≥ 0, `km` 0,1–99,9 mit einer Nachkommastelle), Z. 1520–1521 (`target.kmColumn`, `target.priceOn`), Z. 1669
  und 1683–1684 (`next` ohne `price`/`km`; danach ‚if (price != null) next.price = price;‘, ‚if (km != null) next.km = km;‘).
- **Folge (aus dem Code gelesen, nicht ausgeführt):** `leseFormat` findet `kmColumn` und `priceOn` als Reisefelder (Muster `target.(\w+) =`, Z. 38), aber `km` und `price`
  nicht als Tagesfelder – eine Import-Datei mit Kilometern oder Quartierpreis würde `pruefen.mjs` mit ‚unbekanntes Feld ‚km‘‘ rot melden, obwohl die App sie liest.
  Und PROMPT Z. 120 schickt ‚Kilometer‘ heute in eine Kachelfrage ‚wohin‘, obwohl es das Feld gibt.
- **Vorschlag Wortlaut neu (PROMPT, Import-Version 1.4.0 – Wortlaut-Ja nach 0 Nr. 29, weil I-Regeln betroffen):**
  - Z. 62: ‚Claude liest dieselben Stellen selbst, bevor es baut. Stand bei Reiselogbuch 3.56.3:‘ und im Beispiel `"kmColumn": true|false, "priceOn": true|false` bei der
    Reise sowie `"km": 12.5, "price": 120` beim Tag;
  - neu nach Z. 97: ‚- **Gegangene Kilometer** (`km`): Zahl mit einer Nachkommastelle, 0,1 bis 99,9; gibt es Einträge, `kmColumn: true`. **Preis des Quartiers**
    (`price`, Euro): nur am ersten Tag des Aufenthalts; gibt es Einträge, `priceOn: true`.‘
  - Z. 120: ‚| **Alles ohne passendes Feld** (Tageskosten, Uhrzeiten, Links, Bilder) | **immer Kachelfrage**, wohin (RLB-5/E-4) |‘ und neue Zeilen ‚| gegangene
    Kilometer | `km` |‘, ‚| Preis der Unterkunft | `price` am ersten Tag des Aufenthalts |‘;
  - Werkzeug: `leseFormat` liest Tagesfelder zusätzlich aus `next.(\w+) =` (index.html Z. 1683–1684).
- **Prüfung liest:** `pruefen.mjs --selbsttest` (nach jeder Werkzeug-Änderung, Import-`CLAUDE.md` Z. 28); `checkSchema` liest PROMPT (Präfixe: RLB-5/E-4 hat Elternnummer).
  Die Entscheidung RLB-5/E-4 (‚Kilometer … immer Kachelfrage‘, AppDesign `arbeit/RLB-5 Anforderungen.md` Z. 32) stammt von vor 3.41.0 – sie mit dem Nutzer neu
  entscheiden.
- **Einsparung:** keine. **Risiko:** mittel, wenn nichts geändert wird (eine Konvertierung mit Kilometern scheitert am Werkzeug oder verliert sie); gering mit Vorschlag.
- **Nachweis:** stand in index.html seit 3.41.0, fehlte in PROMPT und `pruefen.mjs` → steht dann in PROMPT 3 und 4 → `pruefen.mjs` (RLB-5/F-13 mit `km`, `price`; neuer
  Fall im Selbsttest).

### F-35 · Import · Testfall 4 nennt Texte, die die App nicht mehr zeigt

- **Stellen:** Import-`PROMPT.md` Z. 164–165; AppDesign `v4/ui.js` Z. 1727 (‚neu angelegt‘), Z. 1732 (Zählung ‚… neu‘), Z. 1734 (‚Auf diesem … gelöscht, im Backup vom
  … noch vorhanden:‘), Z. 1782 (‚Abgleichbericht anzeigen‘).
- **Wortlaut alt:** ‚Ergebnisfenster: die neuen Reisen stehen unter ‚Hinzugefügt‘. Steht dort ‚bleibt gelöscht‘ (frühere Fassung gelöscht, K-12), Claude Bescheid geben‘ ·
  ‚Hinzugefügt‘ kommt in `v4/ui.js`, `fassung/4.36.0/ui.js` und `index.html` nicht vor (`grep -c` = 0); ‚bleibt gelöscht‘ stand in `fassung/4.36.0/ui.js` (1 Treffer),
  heute nicht mehr.
- **Vorschlag Wortlaut neu (Z. 164–165):** ‚4. Ergebnis: der Satz nennt die neuen Reiselogbücher (‚… neu‘); ‚Abgleichbericht anzeigen‘ zeigt sie mit ‚neu angelegt‘. Steht im
  Bericht ‚Auf diesem iPad gelöscht, im Backup … noch vorhanden‘ mit der Reise (frühere Fassung gelöscht, K-12), Claude Bescheid geben – Claude erstellt die Datei neu.‘ –
  vor der Übernahme den Wortlaut in der App nachsehen (I-4: Format immer frisch lesen).
- **Prüfung liest:** keine (Import-PROMPT liest keine Wortlaut-Prüfung). **Einsparung:** keine. **Risiko:** gering – der Nutzer sucht heute nach einem Wort, das nicht kommt.
- **Nachweis:** stand mit alten Texten → steht dann mit den Texten aus ui.js → Usertest der nächsten Konvertierung (Abschnitt 8).

### F-36 · Import · Versionsangaben stehen still

- **Stellen:** Import-`PROMPT.md` Z. 3 (‚**Version 1.2.1** · Stand 16.10.2026‘); Import-`ERKENNTNISSE.md` Z. 3 (‚**Stand 16.10.2026** (README 1.2.1)‘); Import-README Z. 36–37
  (3.34.0 / 4.36.0); Git: Commit `1248426` (‚1.3.0: Nummernschema …‘) ändert `PROMPT.md` (84 Zeilen) und `ERKENNTNISSE.md` (12 Zeilen), ohne die Versionszeilen zu
  heben (`git show --stat`).
- **Vorschlag:** mit F-34: `PROMPT.md` ‚**Version 1.4.0** · Stand TT.MM.2026‘, `ERKENNTNISSE.md` ‚**Stand …** (README 1.4.0)‘, README ‚Geprüft mit‘ 3.56.3 / 4.59.3 nach
  grünem `--selbsttest`. Regel I-1 (README) bleibt; ob `PROMPT.md` eine eigene Versionsgeschichte braucht (Designrichtlinie 11 nennt Apps, AppDesign, Richtlinien,
  Zusammenarbeit), entscheidet der Nutzer.
- **Prüfung liest:** keine – keine Prüfung vergleicht die Versionen des Import-Repos (`checkDocs`/`checkCollab` laufen nur für die App). **Einsparung:** keine.
  **Risiko:** gering.
- **Nachweis:** stand veraltet → steht dann aktuell → Selbstkontrolle (Vorschlag: `pruefen.mjs --selbsttest` vergleicht ‚Geprüft mit‘ mit `APP_VERSION` und meldet ‚zuerst
  melden‘ nach RLB-5/E-11 – Codeänderung).

### F-37 · Import · ‚RLB-5/J-13‘ zeigt in eine Datei, die die Anleitung nicht nennt

- **Stellen:** Import-`PROMPT.md` Z. 8 (Herkunft: `arbeit/RLB-5 Anforderungen.md`, `arbeit/RLB-5 Testfall-Liste.md`), Z. 82 (‚Kennung (RLB-5/F-12, RLB-5/J-13)‘); AppDesign
  `arbeit/RLB-5 Brainstorming.md` Z. 62 (‚**J-13 Feste Kennungen (Empfehlung):**‘) – J-13 kommt in Anforderungen und Testfall-Liste nicht vor (`grep -c` = 0).
- **Vorschlag Wortlaut neu (Z. 8):** ‚Herkunft der Regeln: AppDesign `arbeit/RLB-5 Anforderungen.md` (I-1 bis I-15, RLB-5/E-1 bis RLB-5/E-11), `arbeit/RLB-5
  Testfall-Liste.md` (RLB-5/F-1 bis F-22), `arbeit/RLB-5 Brainstorming.md` (RLB-5/J-n).‘
- **Prüfung liest:** `checkSchema` S-9 prüft, dass `arbeit/RLB-5 Brainstorming.md` existiert (ja); ‚RLB-5/J-n‘ hat Elternnummer, ‚J-n‘ ohne Zahl trifft das Muster nicht.
- **Einsparung:** keine. **Risiko:** keins.
- **Nachweis:** Verweis ohne Datei → mit Datei → `checkSchema` S-9.

### F-38 · Import · `--zone` fehlt in der Import-`CLAUDE.md`, das Werkzeug rät sonst Wien

- **Stellen:** Import-`CLAUDE.md` Z. 27–28; Import-`PROMPT.md` Z. 36, 52; AppDesign-`CLAUDE.md` Z. 41; Import `werkzeug/pruefen.mjs` Z. 3, 23–24;
  Import-`ERKENNTNISSE.md` Z. 18 (K-10).
- **Wortlaut alt:** Import-`CLAUDE.md`: ‚dann im Repo-Ordner `node werkzeug/pruefen.mjs <Datei>` (eine Import-Datei)‘ · PROMPT Z. 52: ‚`node werkzeug/pruefen.mjs <Datei>
  --zone <Zeitzone> [--bestand <Backup>]`‘ · `pruefen.mjs` Z. 24: ‚const ZONE = args.includes('--zone') ? … : 'Europe/Vienna';‘ · K-10: ‚nie die Zeitzone raten‘.
- **Vorschlag Wortlaut neu (Import-`CLAUDE.md` Z. 27–28):** ‚- Prüfen: im Ordner `werkzeug` einmalig `npm install`, dann im Repo-Ordner `node werkzeug/pruefen.mjs <Datei>
  --zone <Zeitzone>` (eine Import-Datei, Zeitzone nach I-13) bzw. `node werkzeug/pruefen.mjs --selbsttest` (nach jeder Änderung am Werkzeug).‘ – dazu als Option im
  Werkzeug: ohne `--zone` Abbruch statt Wien (Codeänderung, Import-Version).
- **Prüfung liest:** keine Prüfung liest die Import-`CLAUDE.md` (nur `checkSchema`; ‚I-13‘ hat ein bekanntes Präfix). **Einsparung:** keine. **Risiko:** gering – heute
  kann eine Prüfung mit falschem ‚heute‘ laufen (I-12 Wetter ab heute), wenn die Zeile aus der `CLAUDE.md` statt aus PROMPT genommen wird.
- **Nachweis:** stand mit `--zone` in PROMPT und AppDesign-`CLAUDE.md`, ohne in Import-`CLAUDE.md` → überall mit `--zone` → `pruefen.mjs` (I-12, RLB-5/F-20).

---

## 6. Regeln mit unklarer Prüfung (Teil F)

Jede in Abschnitt 0 genannte Prüfdatei und Funktion gibt es (siehe Zählungen). Unklar ist, **was** sie prüfen:

| Nr. | genannte Prüfung | was sie tatsächlich prüft (belegt) |
|---|---|---|
| 0 Nr. 1 | `pruefe.mjs` (Grundregeln nach jedem Schritt) | vier Läufe führen keine Grundregeln aus – Befund C-12 |
| 0 Nr. 2 | `lauf.mjs` mit `lauf-selbsttest.mjs`, `veroeffentlichen.mjs` mit `veroeffentlichen-selbsttest.mjs` | kein Skript startet die Selbsttests – Befund C-47 |
| 0 Nr. 3 | `checkCatalog`, `checkCollab` | weder Doppelstellen noch Geschichte im Regeltext (F-39) |
| 0 Nr. 7 | `checkCollab` | ‚Antwortzeile‘ nur mit ‚mehr als 4 Fragen‘ (Z. 140–144), ‚direkt im Fragetext‘ verboten (Z. 133) – passt |
| 0 Nr. 8 | `checkCollab` | nur ‚etwa 5 Punkte‘ und ‚nur bei schweren Fehlern‘ verboten (Z. 131–132) – schwach, aber vorhanden |
| 0 Nr. 24 | `checkCollab` | nichts zum Aufbau der Backlogs (F-40) |
| 2.1 | `checkCollab` (Wortlaut) | genauer: `checkKachel` (aus `checkCollab` Z. 128 aufgerufen) – passt |
| 2.2 | `tests/messung.mjs` | läuft nur in `los` ohne `--nur-app` – Befund C-14 |

### F-39 · Prüfung unklar · 0 Nr. 3 ‚Regeln schlank halten‘ nennt Prüfungen, die weder Doppeltes noch Geschichte finden

- **Stellen:** Zusammenarbeit Z. 83–86; `doku.mjs` `checkCatalog` Z. 77–108 (Katalog vollständig, R-Nummern), `checkCollab` Z. 112–190 (veraltete Sätze aus einer festen Liste,
  Verweise, Versionen).
- **Wortlaut alt:** ‚Jede Regel steht an genau einer Stelle … Im Regeltext steht nur, was heute gilt; Geschichte steht in Versionsgeschichte und CHANGELOG. Prüfung:
  `doku.mjs` – `checkCatalog`, `checkCollab`.‘ – die Befunde F-6 bis F-33 zeigen, dass beides heute nicht maschinell auffällt.
- **Vorschlag Wortlaut neu:** ‚Prüfung: Selbstkontrolle; `doku.mjs` – `checkCatalog` (Katalog vollständig), `checkCollab` (keine veralteten Sätze).‘ – oder eine neue
  Prüfung in `checkCollab`: im Regeltext der Zusammenarbeit und der `CLAUDE.md` (ohne Versionsgeschichte) kein ‚(Nutzer TT.MM.JJJJ‘, ‚gemessen TT.MM.‘, ‚(seit X.Y.Z‘
  (Codeänderung mit Gegenprobe; Ausnahme ‚entfällt (APD-123)‘ und ‚Abgeschaltet (APD-123‘, die `checkKachel` verlangt).
- **Prüfung liest:** `checkKasten` C-5 (Nr. 3 behält ‚Prüfung‘). **Einsparung:** keine. **Risiko:** keins (ehrlicher Wortlaut) bzw. gering (neue Prüfung).
- **Nachweis:** Prüfung genannt, prüft es nicht → Wortlaut sagt, was geprüft wird, oder neue Prüfung → `checkCollab` mit Gegenprobe.

### F-40 · Prüfung unklar · 0 Nr. 24 (Backlog) nennt `checkCollab`, den Aufbau prüft niemand

- **Stellen:** Zusammenarbeit Z. 110–112 (Nr. 24), Z. 263–279 (2.4 Backlog, ohne ‚Prüfung:‘); `doku.mjs` `checkCollab` (liest die Backlogs nur auf veraltete Sätze und Verweise,
  Z. 128–152), `checkSchema` S-6 (Themennummern, Z. 345–357); `veroeffentlichen.mjs` Z. 63–64 bricht ab, wenn die Kopfzeile ‚**Stand …** · Aktuelle Version: …‘ fehlt
  (Z. 107, 137).
- **Vorschlag Wortlaut neu (Nr. 24 Schluss):** ‚Prüfung: Selbstkontrolle; Kopfzeile `veroeffentlichen.mjs` (vorbereiten), Themennummern `checkSchema`.‘ · 2.4 nach Z. 279:
  ‚Prüfung: Selbstkontrolle; Nummern `checkSchema` (unten).‘
- **Prüfung liest:** `checkKasten` C-5 (Nr. 24 behält ‚Prüfung‘). **Einsparung:** keine. **Risiko:** keins.
- **Nachweis:** Prüfung genannt, die den Aufbau nicht prüft → die tatsächlichen Prüfstellen genannt → `veroeffentlichen.mjs`, `checkSchema`.

### F-41 · Prüfung unklar · 2.4 (Backlog), 2.5, 2.6, 2.7 ohne ‚Prüfung:‘; 2.3 verspricht einen Test ohne Namen

- **Stellen:** Zusammenarbeit Kopf Z. 7–8 (‚Jede Regel nennt ihre Prüfung‘); 2.4 Z. 263–279, 2.5 Z. 314–339, 2.6 Z. 341–351, 2.7 Z. 353–360 – keine Zeile ‚Prüfung‘ (`checkKasten`
  C-5 prüft nur Abschnitt 0, Z. 246); 2.3 Z. 253: ‚ein automatischer Test prüft genau diese Texte auf beiden Geräten.‘ – die Prüfung von 2.3 (Z. 260–261) nennt nur `doku.mjs`
  (Form der Testfälle).
- **Vorschlag Wortlaut neu:** je eine Zeile am Ende: 2.4 Backlog siehe F-40 · 2.5 ‚- Prüfung: Selbstkontrolle (Modell und Aufwand mit `get_session`).‘ · 2.6 ‚- Prüfung:
  Selbstkontrolle; messbare HIG-Punkte `hig.mjs` (0 Nr. 23).‘ · 2.7 ‚Prüfung: Safari-Modell `safari.mjs` und Gegenprobe (0 Nr. 20).‘ · 2.3 Z. 253: ‚… ein automatischer Test
  der Version prüft genau diese Texte auf beiden Geräten (welcher, steht beim Testfall).‘ – oder die Pflicht streichen, wenn es keinen solchen Test je Version gibt
  (Vermutung; nicht geprüft, ob jede Version einen hat).
- **Prüfung liest:** `checkKachel` 2.3 (‚in der Kachel‘ – unberührt); 2.5–2.7 liest keine Prüfung; ‚0 Nr. 23‘, ‚0 Nr. 20‘ gültige Verweise.
- **Einsparung:** keine (etwa 200 Bytes mehr). **Risiko:** keins.
- **Nachweis:** Regeln ohne genannte Prüfung → je Abschnitt eine Zeile ‚Prüfung‘ → Selbstkontrolle bzw. genannte Datei.

---

## Nicht oder nur stichprobenartig geprüft

- Kein Lauf von `doku.mjs` auf die Vorschläge – die Aussage ‚grün‘ beruht auf dem Lesen von `checkCollab`, `checkCatalog`, `checkSchema`, `checkKachel`, `checkKasten`
  (doku.mjs Z. 77–364 ganz gelesen). **Vor dem Bau** jeden Wortlaut mit `node tests/doku-regeln.mjs` und `--gegenprobe schema` prüfen.
- `checkKachel` liest Nummern im zusammengezogenen Text (Z. 200); ob ein Vorschlag versehentlich eine Folge ‚ n. ‘ erzeugt, habe ich je Vorschlag von Hand angesehen, nicht
  maschinell.
- Import `pruefen.mjs`: nur `leseFormat`, `pruefeInhalt` (Anfang), Datenschutz und Aufruf gelesen (Z. 1–95, 200–230); nicht ausgeführt (Auftrag). Die Folge in F-34 ist aus dem
  Code abgeleitet.
- Index.html: nur `normalize`, die Felder des Fensters ‚Tag‘, ‚Reiselogbuch einstellen‘ und der Backup-Import gelesen; ob weitere Felder (z. B. Einstellungen je Reise) seit
  3.34.0 dazukamen, die in einer Import-Datei sinnvoll wären, nicht vollständig geprüft.
- `ERKENNTNISSE.md` K-1 bis K-12 nur gegen die hier gelesenen Stellen geprüft (K-12 gegen ui.js Z. 1734: der Fall ‚gelöscht, im Backup noch vorhanden‘ existiert weiter);
  K-3, K-4, K-11 betreffen das Lesen alter Unterlagen, nicht die App.
- 0 Nr. 5 ‚Setup-Skript der Umgebung ‚Standard‘‘ (Z. 91–92): den Namen der Umgebung nicht nachgesehen.
- `VERLAUF.md`, `CHANGELOG.md`, Designrichtlinien (außer Abschnitt 11 und den Überschriften), `AppDesign/tests/README.md` (außer Z. 78–83) nicht gelesen.
- Ob die Vereinbarung ‚Muster nur hell‘ (F-10) irgendwo außer `UEBERGABE.md` steht: nur in den hier gelesenen Dateien gesucht.
