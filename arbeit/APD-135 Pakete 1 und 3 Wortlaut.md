# APD-135 Pakete 1 und 3 – Wortlaut alt und neu (0 Nr. 29)

**Stand 17.11.2026** · Sitzung Reiselogbuch 0123 · noch nicht bestätigt

Grundlage: `arbeit/APD-135 Konsolidierung 3 Befund und Plan.md` (Abschnitt 1, 5 und 7), dazu `arbeit/APD-135 Befund F Arbeitsregeln.md`,
`arbeit/APD-135 Befund D Designregeln.md`, `arbeit/APD-135 Befund L Ablage Backlog Code.md`. Pakete 1 und 3 kommen zusammen in eine Version
(APD-135/J-4). Jeder Alt-Text ist in der heutigen Datei nachgesehen: AppDesign Commit 5bcbcbe (Zusammenarbeit 3.14.1, Designrichtlinie 4.59.3,
AppDesign-`CLAUDE.md` 2.12.0), ReiseLogBuch Commit c3c9915 (3.56.3, ReiseLogBuch-`CLAUDE.md` 3.9.0). Zeilen = heutige Zeilen.

**Schreibweise:** ‚[…]‘ kürzt unveränderten Text vor oder nach der Änderung ab. Ein ‚…‘ innerhalb von Anführungszeichen ‚ ‘ oder in
Code gehört zum Wortlaut selbst (z. B. ‚Erwartet: …‘). Wo zwei W-Punkte dieselbe Stelle ändern, steht der fertige gemeinsame Wortlaut einmal.

## Übersicht

47 W-Punkte (Paket 1: 32, Paket 3: 15) und die Backlog-Ordnung aus APD-135/L-18. Nicht dabei: APD-135/W-48 (APD-135/J-20, Paket 5), der Teil
APD-135/D-24 von W-45 (APD-135/J-19, Paket 6), APD-135/W-29, W-30 (Paket 2), APD-135/W-49, W-50 (Paket 4), APD-135/W-53 bis W-56.

| W | Paket | Datei | Art der Änderung | Risiko |
|---|---|---|---|---|
| APD-135/W-1 | 1 | RLB `tests/README.md`, RLB `tests/alle.mjs`, AD `tests/lauf.mjs`, AD `tests/README.md` | ‚Abbruch beim ersten roten Test‘ → ab dem dritten (Kommentar, Doku) | keins |
| APD-135/W-2 | 1 | `werkzeug/messung.mjs`, `tests/doku.mjs`, RLB `tests/doku-regeln.mjs` | abgeschaffte Zeitzeile, toter Verweis ‚Zusammenarbeit 7‘ (Kommentar, Meldung) | keins |
| APD-135/W-3 | 1 | AppDesign-`CLAUDE.md` Z. 61 | ~60 → ~75 min | keins |
| APD-135/W-4 | 1 | Zusammenarbeit Kasten 3, 0 Nr. 28, 2.1 | Fenster nur am Ende von Antworten, nach denen du etwas tun sollst (APD-135/J-5) | gering |
| APD-135/W-5 | 1 | Zusammenarbeit 0 Nr. 25 | ‚nicht sofort bauen‘ → Korrekturversion mit Bau-Frage (APD-135/J-6) | gering |
| APD-135/W-6 (Satz) | 1 | Zusammenarbeit 0 Nr. 24 | ReiseLogBuch-Import erst mit dem ersten Thema | keins |
| APD-135/W-7 | 3 | Zusammenarbeit 0 Nr. 6, AppDesign-`CLAUDE.md`, `UEBERGABE.md` | ‚nur hell‘ in die Regel, Hinweise zur Prüfumgebung in die `CLAUDE.md` (APD-135/J-7) | gering |
| APD-135/W-8 | 1 | Zusammenarbeit Kopf, AppDesign-README, RLB-README (RLB-Backlog: in W-26 aufgegangen) | ‚iPad‘ → ‚iPad und iPhone‘ | keins |
| APD-135/W-9 | 1 | AppDesign-README Z. 59–60 | Veröffentlichen nur als Verweis | keins |
| APD-135/W-10 | 3 | Zusammenarbeit 0 Nr. 21, 0 Nr. 28 | Bau-Frage nennt die Stufe; ‚(Kontext N)‘ einmal | gering |
| APD-135/W-11 | 1 | Zusammenarbeit 2.1, Kasten 3 | Usertest-Rückmeldung ohne Empfehlung (APD-135/J-9) | gering |
| APD-135/W-12 | 3 | Zusammenarbeit 0 Nr. 7, 0 Nr. 29, 2.3 | ‚im Chat‘ → ‚in der Datei und im Chat‘ | keins |
| APD-135/W-13 | 3 | Zusammenarbeit 0 Nr. 1, 0 Nr. 11, 2.3 | Bericht an einer Stelle | gering |
| APD-135/W-14 | 3 | Zusammenarbeit 0 Nr. 13, 2.5 | neue Sitzung nur in 2.5; Satz gestrichen | gering |
| APD-135/W-15 | 3 | Zusammenarbeit 0 Nr. 15, 2.5 | ein Lagebild, mit Nutzungsgrenze (APD-135/J-11) | keins |
| APD-135/W-16 (ZA) | 1 | Zusammenarbeit 0 Nr. 19 | erst Lagebild, dann Startfrage (APD-135/J-10) | gering |
| APD-135/W-17 | 3 | ReiseLogBuch-`CLAUDE.md` Z. 39–41 | Prüfablauf nur als Verweis | keins |
| APD-135/W-18 | 3 | Zusammenarbeit Kasten ‚Immer‘, AppDesign-`CLAUDE.md` Z. 15–17 | Auswahl aus der `CLAUDE.md` in den Kasten | gering |
| APD-135/W-19 | 3 | AppDesign-`CLAUDE.md` Z. 40–41 | Import-Anleitung als Verweis – **offene Frage 1** | gering (nur nach W-29) |
| APD-135/W-20 | 3 | Zusammenarbeit 2.1, 2.2 | Doppeltes und Erklärsätze gestrichen | keins |
| APD-135/W-21 | 3 | Zusammenarbeit 0 Nr. 15 | unbelegte Zahl ‚etwa 14.000 Token‘ gestrichen | keins |
| APD-135/W-22 | 1 | Zusammenarbeit 2.4, 2.5, 2.8; AppDesign-`CLAUDE.md` Z. 53 | Geschichte aus dem Regeltext | keins |
| APD-135/W-23 | 1 | Zusammenarbeit 0 Nr. 3, Designrichtlinie 17 Z. 1232 | ‚genau eine Prüfung‘ → ‚ihre Prüfung‘ (APD-135/J-12) | keins |
| APD-135/W-24 | 1 | Zusammenarbeit 0 Nr. 24, 2.4; AppDesign-Backlog | Prüfangabe; Abschnitt ‚3. Später‘ | keins |
| APD-135/W-25 | 1 | Zusammenarbeit 2.3, 2.5, 2.6, 2.7 | Zeile ‚Prüfung‘ ergänzt | keins |
| APD-135/W-26 | 3 | RLB-Backlog Z. 5–17, Zusammenarbeit 2.4 | Kopf als Verweis; Backlog bis ‚## Erledigt‘ lesen (APD-135/J-15) | keins |
| APD-135/W-27 | 3 | Zusammenarbeit 0 Nr. 15 | CHANGELOG nur den neuesten Eintrag (APD-135/J-16) | keins |
| APD-135/W-28 | 3 | Zusammenarbeit 2.4 | Usertest nur im Backlog der App (APD-135/J-17) | gering |
| APD-135/W-31 | 3 | Zusammenarbeit, Designrichtlinie, beide `CLAUDE.md`, RLB-Stummel, Designrichtlinie 11 | Versionsgeschichten in eigene Dateien (APD-135/J-14) | gering |
| APD-135/W-32 | 1 | Designrichtlinie R-1.10 | ‚keine Großanzeige‘ gestrichen | keins |
| APD-135/W-33 | 1 | Designrichtlinie R-7.5, R-4.7; `PROMPT.md` Z. 129–131, 168 | Seitenleiste am iPad hoch wie quer | gering |
| APD-135/W-34 | 1 | Designrichtlinie 1 Z. 52, 16; AppDesign-Backlog APD-55 | ‚aus Glas‘ nur in R-3.9; Glas-Leiste als bewusste Abweichung | keins |
| APD-135/W-35 | 1 | Designrichtlinie 2 Z. 105–108 | Schalter ‚Glas‘ im Untermenü | keins |
| APD-135/W-36 | 1 | Designrichtlinie 3, 8, 15.10, 15.17, R-5.8 | Bezeichnung im Kasten einheitlich | keins |
| APD-135/W-37 | 1 | Designrichtlinie 4 Z. 177–179, R-3.3 | ‚Blau gefüllt‘ an den gebauten Stand (APD-135/J-8) | gering |
| APD-135/W-38 | 1 | Designrichtlinie 7, 15.4, 15.17 | Zeiten durch ‚(R-1.12)‘ | keins |
| APD-135/W-39 | 1 | Designrichtlinie R-4.13, R-2.5, R-2.6, R-2.7, R-3.5, R-3.6 | Funktionsnamen der Prüfungen | keins |
| APD-135/W-40 | 1 | Designrichtlinie 2, 3, 9, 15.3, 15.4, 15.8 | Rand, Linien, Radien, Textstile | keins |
| APD-135/W-41 | 1 | Designrichtlinie 15.4, 15.21 | Mehr-Menü wie gebaut | keins |
| APD-135/W-42 | 1 | Designrichtlinie G-6, G-19, 16, 15.6 | geprüfte HIG-Punkte in Spalte ‚Regel‘ | gering |
| APD-135/W-43 | 1 | Zusammenarbeit 0 Nr. 3 | Ausnahme ‚Entschieden‘ (APD-135/J-18) | keins |
| APD-135/W-44 | 1 | `PROMPT.md` Z. 6, 158 | Katalog-Verweis, ‚Automatisch gespeichert‘ | keins |
| APD-135/W-45 | 1 | Designrichtlinie 13, 14, 15.3, 15.17, R-3.9, Z. 1374 | Überholtes und ‚wie bisher‘ gestrichen (ohne APD-135/D-24) | keins |
| APD-135/W-46 | 1 | Designrichtlinie R-6.1, 15.10, 15.13 | Kasten nicht nur iPhone; 15.13 ein Absatz | keins |
| APD-135/W-47 | 1 | Designrichtlinie 17 | Geschichte im Katalog, Reihenfolge | keins |
| APD-135/W-51 | 1 | Designrichtlinie (20 Stellen), `PROMPT.md` (18), RLB-Designrichtlinie (1) | ‚seit X.Y.Z‘ gestrichen | keins |
| APD-135/W-52 | 1 | AD `tests/abgleich.mjs`, `tests/version.mjs` Z. 1 | falscher Abschnitt im Kopfkommentar | keins |
| APD-135/L-18 | 1 | AppDesign-Backlog | APD-62 auf ‚später‘, gekürzt; Verweise in APD-46, APD-56, APD-58, APD-59 | keins |

APD-135/J-25 (‚Arbeitsumgebung (Cloud)‘ bleibt in der AppDesign-`CLAUDE.md`): kein Wortlaut, der Abschnitt bleibt; APD-135/W-7 ergänzt ihn nur.

## Offene Fragen

1. **APD-135/W-19 ohne APD-135/W-29?** Technisch geht es: die Import-`PROMPT.md` nennt `--zone` (Z. 36, 52), und auf sie verweist der neue Satz.
   Aber die automatisch geladene Import-`CLAUDE.md` nennt heute in Z. 27 den Aufruf **ohne** `--zone`, und das Werkzeug rät dann still Wien
   (APD-135/F-38; Abbruch statt Wien kommt erst mit APD-135/J-34 in Paket 2). Strichen wir jetzt die einzige `CLAUDE.md`-Stelle mit `--zone`,
   führt bis Paket 2 die erste gelesene Anleitung zum falschen Aufruf. **Empfehlung: W-19 mit Paket 2 bauen** (zusammen mit W-29); in dieser
   Version bleibt AppDesign-`CLAUDE.md` Z. 40–41 unverändert. Der Wortlaut steht unten trotzdem, damit er mit Paket 2 bestätigt ist.
2. **Kommen die neuen Versionsgeschichte-Dateien in die feste Fassung?** `tests/version.mjs` legt mit `TEXTE` (Z. 21) nur Designrichtlinie und
   Zusammenarbeit nach `fassung/X.Y.Z/`. Ohne Änderung enthält die Fassung künftig nur den Regeltext. **Empfehlung: nicht aufnehmen** – die Fassung
   soll zeigen, was galt; die Geschichte steht im Repo (und in allen älteren Fassungen bis heute). Mit Aufnahme: `TEXTE` um die zwei Dateien
   ergänzen (Änderung an `tests/`, ist mit W-1 und W-52 ohnehin eine neue Fassung).
3. **Ergänzungen aus Befund D, die der Plan bei der W-Nummer nicht ausschreibt:** APD-135/W-36 auch Designrichtlinie 8 Z. 319–320 (aus APD-135/D-18),
   APD-135/W-40 auch Z. 100 (aus APD-135/D-10), APD-135/W-46 auch 15.10 Z. 846 (aus APD-135/D-23). **Empfehlung: mitnehmen** – sonst widerspricht
   8 dem neuen R-5.8, Z. 100 nennt weiter die tote Variable `--field-line`, und 15.10 sagt weiter ‚iPhone statt Tabellenzeile‘.

## Abweichungen zwischen Plan und heutigem Text

- **AppDesign-Backlog:** seit dem Plan ist APD-136 in Z. 30 dazugekommen – APD-62 steht jetzt in **Z. 31** (Plan: 30), die 18 Zeilen ‚später‘
  in **Z. 33–49 und 51** (Plan: 32–48, 50), APD-55 in Z. 42, APD-56 Z. 43, APD-58 Z. 45, APD-59 Z. 46, APD-46 Z. 34.
- **`PROMPT.md`:** ‚seit X.Y.Z‘ steht an **18** Stellen (Plan und APD-135/D-47: 16) – Z. 165–166 über den Zeilenumbruch, Z. 232 zweimal.
- **`UEBERGABE.md`:** die Hinweise zur Prüfumgebung stehen in **Z. 27–32** (Plan: 27–34).
- **`tests/doku.mjs` Z. 134:** die Meldung beginnt mit ‚Zusammenarbeit 2:‘ (Plan zitiert nur den Schluss) – Wortlaut sonst wie im Plan.
- **RLB `tests/README.md`:** der Satz steht in Z. 8–9 (Plan: Z. 9).
- **Kasten Punkt 3 (W-4):** der Plan schreibt ‚(Nr. 14, 28)‘. `checkKasten` verlangt im Kasten die Zeichenfolge ‚Nr. 28‘ (`KASTEN_PFLICHTEN`,
  `doku.mjs` Z. 220), und Punkt 3 ist die einzige Stelle im Kasten, die sie heute enthält – deshalb hier ‚(Nr. 14, Nr. 28)‘.
- **Kasten ‚Immer‘ (W-18):** der Plan schreibt ‚ohne Auftrag zuerst die Startfrage (Nr. 19)‘ – das widerspricht APD-135/J-10 (erst das Lagebild);
  hier ‚ohne Auftrag nach dem Lagebild die Startfrage (Nr. 19)‘.
- **0 Nr. 6 (W-7):** der Plan nennt seinen Text ‚Vorschlag‘ (‚dunkel und hoch erst, wenn hell passt und der Nutzer es verlangt‘) – das hätte
  auch ‚hoch‘ an einen Wunsch gebunden, Muster hoch gab es aber ohne Wunsch (APD-62: iPad hoch bestätigt). Hier: hoch nach quer, dunkel nur auf Wunsch.
- **W-39:** `checkAnheben` meldet als **R-3.5** (`ablauf.mjs` Z. 3443), nicht R-3.6 – deshalb steht es bei R-3.5, `checkBeruehren` bei R-3.6.
- **W-31:** ‚je Repo `CLAUDE Versionsgeschichte.md`‘ betrifft nur AppDesign und ReiseLogBuch – die Import-`CLAUDE.md` hat keine Versionsgeschichte
  (sie steht in der Import-README, I-1).
- **W-8, Teil RLB-Backlog Z. 13:** entfällt, weil W-26 die Zeilen 5–17 ganz ersetzt.
- **Nicht aufgenommen** (nicht ‚seit X.Y.Z‘, also nicht W-51): Designrichtlinie R-1.8 ‚Nutzer 23.10.2026‘, Z. 453 ‚P-75/6, 25.10.2026‘;
  `PROMPT.md` Z. 165 ‚(Entscheidung des Nutzers 18.10.2026)‘ und Z. 85 ‚Essen wie bisher‘.
- Stichprobe der übrigen Plan-Zitate: Wortlaut und Zeilen stimmen (Zusammenarbeit, beide `CLAUDE.md`, Designrichtlinie, RLB-Designrichtlinie).

---

## Zusammenarbeit allgemein (`README - Zusammenarbeit allgemein.md`)

Geordnet nach der Stelle in der Datei.

### APD-135/W-8 · Zusammenarbeit, Kopf Z. 5

**Alt:**
```
Regeln für die Zusammenarbeit mit Claude bei allen iPad-Web-Apps von g811141a. Die Datei liegt im Design-Repo **AppDesign**
```
**Neu:**
```
Regeln für die Zusammenarbeit mit Claude bei allen Web-Apps für iPad und iPhone von g811141a. Die Datei liegt im Design-Repo **AppDesign**
```

### APD-135/W-18 · Zusammenarbeit, Kasten ‚Immer‘ Z. 17–18

**Alt:**
```
> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Sammelversionen (Nr. 8) · nur Belegtes (Nr. 27) ·
> Regeln nur mit Genehmigung (Nr. 29).
```
**Neu:**
```
> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Testfall-Liste vor jedem Bau (Nr. 1) ·
> Sammelversionen (Nr. 8) · nur Belegtes (Nr. 27) · Regeln nur mit Genehmigung (Nr. 29) · ohne Auftrag nach dem Lagebild die
> Startfrage (Nr. 19).
```

### APD-135/W-4 und W-11 · Zusammenarbeit, Kasten ‚Jede Antwort‘ Punkt 3 (Z. 23–26)

**Alt:**
```
> 3. **Kachel mit Push:** jede Antwort, nach der der Nutzer etwas tun soll (lesen, entscheiden, prüfen, antworten), endet mit einem
>    Auswahlfenster – nur das Fenster bringt am iPad den Push; auch nach einem Neustart des Arbeitsprozesses und nach der Meldung einer
>    Hintergrundaufgabe oder einer anderen Sitzung; Empfehlung zuerst mit ‚(Empfohlen)‘ und Grund, immer ‚Ich schreibe im Chat‘; einzige
>    Ausnahme die Übergabe (Nr. 28, 2.1).
```
**Neu:**
```
> 3. **Kachel mit Push:** jede Antwort, nach der der Nutzer etwas tun soll (lesen, entscheiden, prüfen, antworten), endet mit einem
>    Auswahlfenster – nur das Fenster bringt am iPad den Push; auch nach einem Neustart des Arbeitsprozesses und nach der Meldung einer
>    Hintergrundaufgabe oder einer anderen Sitzung; Empfehlung zuerst mit ‚(Empfohlen)‘ und Grund (Ausnahme 2.1),
>    immer ‚Ich schreibe im Chat‘; einzige Ausnahme die Übergabe (Nr. 14, Nr. 28).
```

### APD-135/W-10 · Zusammenarbeit, 0 Nr. 21 Satz 2 (Z. 43–44)

**Alt:**
```
    Korrekturen oder wenn die Bitte ‚korrigieren‘, ‚verbessern‘, ‚ausbessern‘ lautet. Vorher immer ‚Soll ich Version X.Y.Z mit …
    erstellen? (Kontext N) Ja/Nein‘ – der Kontextstand aus `messung.mjs` steht **in der Frage selbst** (Nr. 28).
```
**Neu:**
```
    Korrekturen oder wenn die Bitte ‚korrigieren‘, ‚verbessern‘, ‚ausbessern‘ lautet. Vorher immer ‚Soll ich Version X.Y.Z mit …
    erstellen (Prüflauf Stufe Text bzw. voll)? (Kontext N)‘ mit Ja/Nein – Stufe nach Nr. 2, der Kontextstand steht **in der Frage
    selbst** (2.2).
```

### APD-135/W-4 und W-10 · Zusammenarbeit, 0 Nr. 28 (Z. 55–57)

**Alt:**
```
28. **Jede Frage im Fenster:** Jede Frage an den Nutzer kommt ins Auswahlfenster, und jede Antwort endet mit einem – nie ‚Sag
    Bescheid …‘ oder eine offene Frage im Text; Ausnahme: die Übergabe (Nr. 14). Am Ende jeder Frage im Fenster steht ‚(Kontext N)‘ aus
    `messung.mjs` – abgelesen, nie geschätzt. Format 2.1. Prüfung: Selbstkontrolle.
```
**Neu:**
```
28. **Jede Frage im Fenster:** Jede Frage an den Nutzer kommt ins Auswahlfenster, und jede Antwort, nach der der Nutzer etwas tun
    soll, endet mit einem (Kasten Punkt 3) – nie ‚Sag Bescheid …‘ oder eine offene Frage im Text; Ausnahme: die Übergabe (Nr. 14). Am
    Ende jeder Frage im Fenster steht ‚(Kontext N)‘ (2.2). Format 2.1. Prüfung: Selbstkontrolle.
```

### APD-135/W-12 · Zusammenarbeit, 0 Nr. 29 Satz 2 (Z. 59)

**Alt:**
```
    Regelkatalog, App-Richtlinien, `CLAUDE.md` – ohne dein ausdrückliches ‚Ja‘ zum Wortlaut. Alter und neuer Text stehen im Chat, danach das Fenster mit ‚Ja/Nein‘ (2.1). Das gilt auch für Korrekturen und Zusammenfassungen (Nr. 3).
```
**Neu:**
```
    Regelkatalog, App-Richtlinien, `CLAUDE.md` – ohne dein ausdrückliches ‚Ja‘ zum Wortlaut. Alter und neuer Text stehen in der Datei (Kasten Punkt 4) und im Chat, danach das Fenster mit ‚Ja/Nein‘ (2.1). Das gilt auch für Korrekturen und Zusammenfassungen (Nr. 3).
```

### APD-135/W-13 · Zusammenarbeit, 0 Nr. 1 (Z. 70)

**Alt:**
```
   beheben, dieselbe Lücke überall suchen, im Bericht sagen, warum die Prüfung sie übersah. Gelingt das Nachstellen nicht,
```
**Neu:**
```
   beheben, dieselbe Lücke überall suchen und im Bericht nennen (Nr. 11). Gelingt das Nachstellen nicht,
```

### APD-135/W-23 und W-43 · Zusammenarbeit, 0 Nr. 3 (Z. 83–86)

**Alt:**
```
3. **Regeln schlank halten:** Jede Regel steht an genau einer Stelle und nennt genau eine Prüfung; eine neue Regel ersetzt
   oder ergänzt eine bestehende, Regeln zum selben Thema werden zusammengefasst. Neue allgemeine Design-Regeln bekommen sofort
   eine Nummer im Katalog (Designrichtlinie 17) und eine automatische Prüfung, sonst ‚Gerät‘. Im Regeltext steht nur, was heute
   gilt; Geschichte steht in Versionsgeschichte und CHANGELOG. Prüfung: `doku.mjs` – `checkCatalog`, `checkCollab`.
```
**Neu:**
```
3. **Regeln schlank halten:** Jede Regel steht an genau einer Stelle und nennt ihre Prüfung (Prüfdatei und Funktion; prüfen
   mehrere Funktionen Teile derselben Regel, nennt sie alle); eine neue Regel ersetzt oder ergänzt eine bestehende, Regeln zum
   selben Thema werden zusammengefasst. Neue allgemeine Design-Regeln bekommen sofort eine Nummer im Katalog (Designrichtlinie 17)
   und eine automatische Prüfung, sonst ‚Gerät‘. Im Regeltext steht nur, was heute gilt, außer der Spalte ‚Entschieden‘ (Datum) bei
   bewussten Abweichungen (Designrichtlinie 12, 16); Geschichte steht in Versionsgeschichte und CHANGELOG. Prüfung: Selbstkontrolle;
   `doku.mjs` – `checkCatalog` (Katalog vollständig), `checkCollab` (keine veralteten Sätze).
```

### APD-135/W-7 · Zusammenarbeit, 0 Nr. 6 (Z. 96–97)

**Alt:**
```
6. **Muster:** bei Gestaltungsfragen zuerst ein Muster – beim ersten 2–3 Varianten nebeneinander, bei kleinen Korrekturen eine;
   zuerst nur hell und quer, dunkel und hoch erst, wenn hell passt; Bilder in Viererpaketen. Prüfung: Selbstkontrolle.
```
**Neu:**
```
6. **Muster:** bei Gestaltungsfragen zuerst ein Muster – beim ersten 2–3 Varianten nebeneinander, bei kleinen Korrekturen eine;
   zuerst nur hell und quer, hoch erst, wenn quer passt; bis auf Weiteres nur hell – dunkel nur auf Wunsch des Nutzers; Bilder in
   Viererpaketen. Prüfung: Selbstkontrolle.
```

### APD-135/W-12 · Zusammenarbeit, 0 Nr. 7 (Z. 98–99)

**Alt:**
```
   im Chat‘ (gewählt → Claude beendet die Antwort). Längeres immer im Chat – vor dem Fenster (2.1). Format 2.1. Prüfung:
```
**Neu:**
```
   im Chat‘ (gewählt → Claude beendet die Antwort). Längeres steht vor dem Fenster in der Datei und im Chat (Kasten Punkt 4, 2.1).
   Format 2.1. Prüfung:
```

### APD-135/W-6 (Satz) und W-24 · Zusammenarbeit, 0 Nr. 24 (Z. 110–112)

**Alt:**
```
24. **Backlog:** jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4); Priorität 1 hoch · 2 mittel · 3 niedrig, die höchste zuerst.
    Neue Themen schlägt Claude einzeln vor und fragt ‚Ins Backlog übernehmen?‘ und die Priorität – mit Empfehlung. Wünsche, Fragen
    und Usertests trägt Claude sofort ein und erinnert an Offenes (2.4). Prüfung: Selbstkontrolle; `checkCollab`.
```
**Neu:**
```
24. **Backlog:** jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4), ReiseLogBuch-Import erst mit dem ersten Thema (RLI-n, 2.4);
    Priorität 1 hoch · 2 mittel · 3 niedrig, die höchste zuerst. Neue Themen schlägt Claude einzeln vor und fragt ‚Ins Backlog
    übernehmen?‘ und die Priorität – mit Empfehlung. Wünsche, Fragen und Usertests trägt Claude sofort ein und erinnert an Offenes
    (2.4). Prüfung: Selbstkontrolle; Kopfzeile `veroeffentlichen.mjs` (vorbereiten), Themennummern `checkSchema`.
```

### APD-135/W-5 · Zusammenarbeit, 0 Nr. 25 (Z. 113–115)

**Alt:**
```
    (Nr. 4) → in ‚0. Nächste Version‘ eintragen, nicht sofort bauen (auch kleine Fehler aus dem Testen) → bauen nur nach Nr. 8
    und 21. Nur ändern, was besprochen wurde; Auffälliges nennen statt eigenmächtig ändern (offensichtliche Fehler beheben und
```
**Neu:**
```
    (Nr. 4) → in ‚0. Nächste Version‘ eintragen, nicht ohne Bau-Frage bauen (Fehler aus dem Testen als Korrekturversion nach Nr. 8)
    → bauen nur nach Nr. 8 und 21. Nur ändern, was besprochen wurde; Auffälliges nennen statt eigenmächtig ändern (offensichtliche Fehler beheben und
```

### APD-135/W-13 · Zusammenarbeit, 0 Nr. 11 Satz 1 (Z. 134–136)

**Alt:**
```
11. **Bericht** nach einer Version **und jede Bitte, am Gerät zu prüfen** (Muster, Versuch, Messung, Usertest): Bericht (3–5 Sätze),
    vollständige Aufzählung aller Änderungen und alle offenen Usertests vollständig im Chat (und als Datei, Kasten Punkt 4), danach das
    Fenster zur Rückmeldung; nie nur ein Verweis aufs CHANGELOG. Ist ein Fehler durchgerutscht, steht dabei, warum die Prüfung ihn übersah.
```
**Neu:**
```
11. **Bericht** nach einer Version, nach vorbereiteten, noch nicht gebauten Änderungen **und bei jeder Bitte, am Gerät zu prüfen**
    (Muster, Versuch, Messung, Usertest): Bericht (3–5 Sätze), vollständige Aufzählung aller Änderungen und alle offenen Usertests
    vollständig, auch die früherer Versionen, in der Datei und im Chat (Kasten Punkt 4), danach das Fenster zur Rückmeldung; nie nur
    ein Verweis aufs CHANGELOG. Ist ein Fehler durchgerutscht, steht dabei, warum die Prüfung ihn übersah.
```
(Z. 137 ‚Einzelheiten 2.3. Prüfung: […]‘ bleibt.)

### APD-135/W-14 · Zusammenarbeit, 0 Nr. 13 (Z. 146–147)

**Alt:**
```
    Prüflauf: Übergabe schreiben (Nr. 14) und die neue Sitzung selbst starten – mit dem Modell und dem Aufwand, die in diesem Chat
    gerade eingestellt sind, Name `<App> <Chatnummer> – <Thema>` (2.5). Eine offene Frage an den Nutzer (z. B. Rückmeldung zu Usertests) geht mit in die
```
**Neu:**
```
    Prüflauf: Übergabe schreiben (Nr. 14) und die neue Sitzung selbst starten (2.5). Eine offene Frage an den Nutzer (z. B. Rückmeldung zu Usertests) geht mit in die
```

### APD-135/W-15, W-21 und W-27 · Zusammenarbeit, 0 Nr. 15 (Z. 152–154) – mit APD-135/J-11

**Alt:**
```
15. **Beginn einer Sitzung:** lesen – `UEBERGABE.md`, **diese ganze Datei** (einmal je Sitzung, etwa 14.000 Token), die
    Überschriften der Designrichtlinien; alles Weitere (Katalog, Backlog, CHANGELOG, PROMPT.md) nur, soweit die Aufgabe es braucht.
    Dann das **Lagebild** (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand – 2.5) als **eigene Antwort** vor jeder
```
**Neu:**
```
15. **Beginn einer Sitzung:** lesen – `UEBERGABE.md`, **diese ganze Datei** (einmal je Sitzung), die Überschriften der
    Designrichtlinien; alles Weitere (Katalog, Backlog bis ‚## Erledigt‘, vom CHANGELOG der neueste Eintrag, PROMPT.md) nur, soweit
    die Aufgabe es braucht. Dann das **Lagebild** (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand, Nutzungsgrenze –
    2.5) als **eigene Antwort** vor jeder
```
(Z. 155–158 bleiben; die Zeile ‚Arbeit, auch wenn der Starttext einen Auftrag hat: das Lagebild im Chat und als Datei, danach das‘ bleibt
unverändert eine Zeile.)

### APD-135/W-16 · Zusammenarbeit, 0 Nr. 19 Satz 1 (Z. 174–176)

**Alt:**
```
19. **Startfrage:** Beginnt eine Sitzung ohne konkreten Auftrag (‚Start‘, ‚Hallo‘ oder nur angehängte Repos), liest Claude
    gezielt (Nr. 15) `UEBERGABE.md` und die Backlog-Köpfe und zeigt **zuerst** das Auswahlfenster ‚Was möchtest du als Nächstes
    tun?‘: je angehängtem Repo eine Möglichkeit mit Version und Backlog-Spitze (offene Usertests zuerst), bei
```
**Neu:**
```
19. **Startfrage:** Beginnt eine Sitzung ohne konkreten Auftrag (‚Start‘, ‚Hallo‘ oder nur angehängte Repos), liest Claude
    wie in Nr. 15 und dazu die Backlog-Köpfe; das Fenster nach dem Lagebild ist dann ‚Was möchtest du als Nächstes tun?‘:
    je angehängtem Repo eine Möglichkeit mit Version und Backlog-Spitze (offene Usertests zuerst), bei
```

### APD-135/W-11 und W-20 · Zusammenarbeit, 2.1 ‚Auswahlfenster‘ (Z. 212–215)

**Alt:**
```
- **Auswahlfenster:** bis zu 4 Fragen, je 2–4 Möglichkeiten; die Empfehlung zuerst mit ‚(Empfohlen)‘ (so geschrieben, nie
  ‚(Empfehlung)‘) und ihrem Grund in der Beschreibung, immer ‚Ich schreibe im Chat‘ – ausgenommen nur die Empfehlung bei der
  Rückmeldung zu einem Usertest (‚P-n: …‘, 2.3). Im Fenster steht nur eine **kurze Frage** mit den Schaltflächen – keine Erklärtexte,
  keine Zeitangaben, auch bei Bitten, am Gerät zu prüfen, kein Link. Das Feld ‚Sonstiges‘ schneidet lange Texte ab.
```
**Neu:**
```
- **Auswahlfenster:** bis zu 4 Fragen, je 2–4 Möglichkeiten; die Empfehlung zuerst mit ‚(Empfohlen)‘ (so geschrieben, nie
  ‚(Empfehlung)‘) und ihrem Grund in der Beschreibung, immer ‚Ich schreibe im Chat‘. Bei der Rückmeldung zu einem Usertest
  (‚P-n: …‘, 2.3) steht keine Empfehlung. Im Fenster steht nur eine **kurze Frage** mit den Schaltflächen – keine Erklärtexte,
  keine Zeitangaben. Das Feld ‚Sonstiges‘ schneidet lange Texte ab.
```

### APD-135/W-4 und W-20 · Zusammenarbeit, 2.1 ‚Die Datei davor, das Fenster danach‘ (Z. 219–221)

**Alt:**
```
  die kurze Frage, ohne Link. Nie zwei Fenster direkt hintereinander; ein weiteres Fenster in derselben Antwort erst, wenn das vorige
  beantwortet ist und davor eine neue Ausgabe mit Erklärung steht – so endet jede Antwort mit einem Fenster und einem Push am iPad. Die
  Vorschau-Funktion kommt nicht an. Mehrere Themen nacheinander: je Fenster eines (ganze Zeile, Einschätzung, Kachel).
```
**Neu:**
```
  die kurze Frage, ohne Link. Nie zwei Fenster direkt hintereinander; ein weiteres Fenster in derselben Antwort erst, wenn das vorige
  beantwortet ist und davor eine neue Ausgabe mit Erklärung steht – so endet jede Antwort, nach der der Nutzer etwas tun soll, mit
  einem Fenster und einem Push am iPad (Kasten Punkt 3). Die Vorschau-Funktion kommt nicht an. Mehrere Themen nacheinander: je
  Fenster eines.
```

### APD-135/W-20 · Zusammenarbeit, 2.1 ‚Reihenfolge‘ (Z. 226–227)

**Alt:**
```
- **Reihenfolge in einer Antwort:** erst die Arbeit und alles zum Lesen, dann das Fenster; nach der Antwort nur noch kurz. Solange ein
  Fenster offen ist, ist die Antwort nicht fertig. Die laufende Zeitanzeige während der Bearbeitung kommt von der App.
```
**Neu:**
```
- **Reihenfolge in einer Antwort:** erst die Arbeit und alles zum Lesen, dann das Fenster; nach der Antwort nur noch kurz. Solange ein
  Fenster offen ist, ist die Antwort nicht fertig.
```

### APD-135/W-20 · Zusammenarbeit, 2.2 ‚Kontextstand‘ (Z. 234–235)

**Alt:**
```
  meldet das Werkzeug einen Fehler, steht der Fehler statt der Zahl da. Die Zeitzeile des Werkzeugs und die Uhrzeitzeile stehen nicht
  in der Antwort. Nutzung in Prozent und Rücksetzzeiten zeigt nur die Claude-App.
```
**Neu:**
```
  meldet das Werkzeug einen Fehler, steht der Fehler statt der Zahl da. Die Zeitzeile des Werkzeugs und die Uhrzeitzeile stehen nicht
  in der Antwort.
```
(Der gestrichene Satz widerspräche auch APD-135/J-11: die Nutzungsgrenze steht künftig im Lagebild.)

### APD-135/W-12 · Zusammenarbeit, 2.3 ‚Bericht nach einer Version‘ (Z. 247)

**Alt:**
```
  (0 Nr. 22). Bei Mustern und Versuchen stehen im Chat der vollständige Link und nummerierte Schritte mit ‚Erwartet: …‘.
```
**Neu:**
```
  (0 Nr. 22). Bei Mustern und Versuchen stehen der vollständige Link und nummerierte Schritte mit ‚Erwartet: …‘ in der Datei und im
  Chat (Kasten Punkt 4).
```

### APD-135/W-25 · Zusammenarbeit, 2.3 Testfall (Z. 253)

**Alt:**
```
  jedem beteiligten Gerät** wörtlich; ein automatischer Test prüft genau diese Texte auf beiden Geräten. Verweise wie ‚wie oben‘
```
**Neu:**
```
  jedem beteiligten Gerät** wörtlich; ein automatischer Test der Version prüft genau diese Texte auf beiden Geräten (welcher, steht
  beim Testfall). Verweise wie ‚wie oben‘
```

### APD-135/W-13 · Zusammenarbeit, 2.3 (Z. 255–256)

**Alt:**
```
- Am Ende **jeder** Umsetzung – nach einer Version und ebenso nach vorbereiteten, noch nicht gebauten Änderungen – stehen alle
  offenen Usertests einzeln im Chat, auch die früherer Versionen.
```
**Neu:** entfällt (steht in 0 Nr. 11).

### APD-135/W-8 · Zusammenarbeit, 2.4 Abschnitt 1 (Z. 270)

**Alt:**
```
- **1. Auf dem iPad prüfen:** je gebauter Version ein Usertest mit Testfällen.
```
**Neu:**
```
- **1. Auf iPad und iPhone prüfen:** je gebauter Version ein Usertest mit Testfällen.
```

### APD-135/W-24, W-26 und W-28 · Zusammenarbeit, 2.4 Absatz ‚Jeder Punkt‘ (Z. 275–279)

**Alt:**
```
Jeder Punkt: Nummer, Priorität, Thema, allgemein oder App, Status (offen · bereit · prüfen · später). Nach jeder Version: die
gebauten Punkte aus ‚0.‘ entfernen, den Usertest unter ‚1.‘ anlegen, ‚Erledigt‘ ergänzen. Neue Themen: ‚Ins Backlog
übernehmen? Ja/Nein‘ und ‚Mit welcher Priorität? a) 1 hoch · b) 2 mittel · c) 3 niedrig‘, mit ‚So macht es Apple‘ und
Empfehlung. **Erinnerung:** zu Beginn einer Sitzung (kurze Liste) und am Ende jeder Antwort, in der etwas gebaut oder entschieden
wurde – zuerst ‚Nächste Version X.Y.Z: N Punkte bereit (…)‘, dann ‚Offen im Backlog: …‘.
```
**Neu:**
```
Jeder Punkt: Nummer, Priorität, Thema, allgemein oder App, Status (offen · bereit · prüfen · später). Nach jeder Version: die
gebauten Punkte aus ‚0.‘ entfernen, den Usertest unter ‚1.‘ im Backlog der App anlegen, in der er läuft (AppDesign nennt ihn in
der Zeile des Themas), ‚Erledigt‘ ergänzen. Neue Themen: ‚Ins Backlog übernehmen? Ja/Nein‘ und ‚Mit welcher Priorität? a) 1 hoch ·
b) 2 mittel · c) 3 niedrig‘, mit ‚So macht es Apple‘ und Empfehlung. **Erinnerung:** zu Beginn einer Sitzung (kurze Liste) und am
Ende jeder Antwort, in der etwas gebaut oder entschieden wurde – zuerst ‚Nächste Version X.Y.Z: N Punkte bereit (…)‘, dann ‚Offen
im Backlog: …‘. Gelesen wird ein Backlog bis ‚## Erledigt‘; ‚Erledigt‘ nur bei Bedarf. Prüfung: Selbstkontrolle; Nummern
`checkSchema` (unten).
```

### APD-135/W-22 · Zusammenarbeit, 2.4 ‚Nummern und Präfixe‘ (Z. 281)

**Alt:**
```
**Nummern und Präfixe** (seit 2.20.0, APD-78): eine Nummer bezeichnet überall genau eine Sache · nie wiederverwenden, nie
```
**Neu:**
```
**Nummern und Präfixe** – eine Nummer bezeichnet überall genau eine Sache · nie wiederverwenden, nie
```
(Die Zeichenfolge ‚**Nummern und Präfixe**‘ muss genau so bleiben – `checkSchema` liest die Tabelle ab dort.)

### APD-135/W-22 · Zusammenarbeit, 2.4 ‚Alte Nummern und Begriffe‘ (Z. 309–310)

**Alt:**
```
  (AppDesign, Tabelle alt → neu für die festen Fassungen und die Git-Commits) und im Protokoll der Entscheidung
  (`arbeit/APD-78 …`). Umgestellt wurde mit `werkzeug/umbenennen.mjs`.
```
**Neu:**
```
  (AppDesign, Tabelle alt → neu für die festen Fassungen und die Git-Commits) und im Protokoll der Entscheidung
  (`arbeit/APD-78 …`).
```

### APD-135/W-15 · Zusammenarbeit, 2.5 ‚UEBERGABE.md‘ (Z. 316–318)

**Alt:**
```
- **`UEBERGABE.md`** enthält nur den Stand der Sitzung: Lagebild (Versionen, Chatnummer, Sitzungsgröße, offene Usertests),
  Ergebnisse, nächster Schritt, danach, neue Vereinbarungen (stehen zusätzlich schon in den Richtlinien), was zuerst zu lesen ist,
  Starttext. Dauerhaftes (Arbeitsumgebung, Befehle) steht in der AppDesign-`CLAUDE.md`.
```
**Neu:**
```
- **`UEBERGABE.md`** enthält nur den Stand der Sitzung: Lagebild wie in 0 Nr. 15 und dazu Chatnummer und Sitzungsgröße,
  Ergebnisse, nächster Schritt, danach, neue Vereinbarungen (stehen zusätzlich schon in den Richtlinien), was zuerst zu lesen ist,
  Starttext. Dauerhaftes (Arbeitsumgebung, Befehle) steht in der AppDesign-`CLAUDE.md`.
```

### APD-135/W-22 · Zusammenarbeit, 2.5 ‚Aufwand‘ (Z. 329–330)

**Alt:**
```
  `CLAUDE_CODE_EFFORT_LEVEL` bleibt ungesetzt: Sie übergeht die Einstellung im Chat (gemessen 15.11.2026, Sitzung 0115: Chat ‚mittel‘,
  alle Aufrufe ‚hoch‘).
```
**Neu:**
```
  `CLAUDE_CODE_EFFORT_LEVEL` bleibt ungesetzt: Sie übergeht die Einstellung im Chat.
```
(Die Messung kommt in die Zeile 3.14.0 der ausgelagerten Versionsgeschichte, siehe W-31.)

### APD-135/W-14, W-15 und W-25 · Zusammenarbeit, 2.5 ‚Lagebild prüft Modell und Aufwand‘ (Z. 336–339) – mit APD-135/J-11

**Alt:**
```
  Bei hoher Last weicht die Sitzung von selbst auf das nächste Modell aus (Eintrag `model_fallback` in der Sitzungsdatei, z. B.
  ‚Switched to Opus 5 … due to high demand for Opus 5.5‘) – `messung.mjs` hängt dann ‚⚠ Modell …‘ an (2.2), Claude nennt es in der
  nächsten Ausgabe.
  Gelesen wird zu Beginn wenig, weil alles Gelesene bei jedem weiteren Schritt mitverarbeitet wird.
```
**Neu:**
```
  Bei hoher Last weicht die Sitzung von selbst auf das nächste Modell aus (Eintrag `model_fallback` in der Sitzungsdatei, z. B.
  ‚Switched to Opus 5 … due to high demand for Opus 5.5‘) – `messung.mjs` hängt dann ‚⚠ Modell …‘ an (2.2), Claude nennt es in der
  nächsten Ausgabe. Die Nutzungsgrenze liest Claude mit `get_session` (`rate_limit_info`) und nennt sie im Lagebild.
- Prüfung: Selbstkontrolle (Modell, Aufwand und Nutzungsgrenze mit `get_session`).
```
Der Plan nennt für W-25 ‚(Modell und Aufwand mit `get_session`)‘ – hier um die Nutzungsgrenze ergänzt (APD-135/J-11). Quelle für `rate_limit_info`:
`UEBERGABE.md` Z. 23.

### APD-135/W-25 · Zusammenarbeit, 2.6 (nach Z. 351)

**Alt:** – (2.6 endet mit ‚zeigt die Bilder vorher zur Freigabe.‘, ohne Zeile ‚Prüfung‘)

**Neu** (neue letzte Zeile von 2.6):
```
- Prüfung: Selbstkontrolle; messbare HIG-Punkte `hig.mjs` (0 Nr. 23).
```

### APD-135/W-25 · Zusammenarbeit, 2.7 (nach Z. 360)

**Alt:** – (2.7 endet mit ‚Rohdaten durch Claude, damit keine falsche Anzeige in die Irre führt.‘)

**Neu** (neuer Absatz am Ende von 2.7):
```
Prüfung: Safari-Modell `safari.mjs` und Gegenprobe (0 Nr. 20).
```

### APD-135/W-22 · Zusammenarbeit, 2.8 (Z. 364–365)

**Alt:**
```
- Abgeschaltet (APD-123, Nutzer 07.11.2026); Werkzeug (`werkzeug/regelwaechter.mjs`) und Prüfung (`tests/regelwaechter.mjs`) bleiben im
  Repo, eingerichtet wird er nicht mehr.
```
**Neu:**
```
- Abgeschaltet (APD-123); Werkzeug (`werkzeug/regelwaechter.mjs`) und Prüfung (`tests/regelwaechter.mjs`) bleiben im Repo und werden
  nicht eingerichtet.
```
(0 Nr. 26 ‚entfällt (APD-123).‘ bleibt unverändert.)

### APD-135/W-31 · Zusammenarbeit, ‚Zuordnung alt → neu‘ und ‚Versionsgeschichte‘ (Z. 367–462)

**Alt:** Z. 367–462 – Trennlinie, ‚## Zuordnung alt → neu‘ (Z. 369–387, Absatz und Tabelle), Trennlinie, ‚## Versionsgeschichte‘ mit der Tabelle
3.14.1 bis 1.0.0 (Z. 391–462).

**Neu** (Ende der Datei):
```
---

## Versionsgeschichte

Steht in `README - Zusammenarbeit Versionsgeschichte.md` (neueste oben, am Ende die Zuordnung alt → neu bis 2.16.0); jede neue
Version bekommt dort eine Zeile.
```

**Neue Datei** `README - Zusammenarbeit Versionsgeschichte.md` (AppDesign):
```
# Zusammenarbeit allgemein – Versionsgeschichte

Versionsgeschichte von `README - Zusammenarbeit allgemein.md`, neueste oben; ausgelagert, weil die Zusammenarbeit zu Beginn jeder
Sitzung ganz gelesen wird (Designrichtlinie 11). Jede neue Version bekommt hier eine Zeile.

| Version | Datum | Art | Inhalt |
|---|---|---|---|
[Zeilen 3.14.1 bis 1.0.0 wörtlich aus Z. 395–462]

---

## Zuordnung alt → neu

[Absatz und Tabelle wörtlich aus Z. 371–387]
```
Einzige Änderung an den übernommenen Zeilen: in der Zeile 3.14.0 nach ‚‚Aufwand‘ – Umgebungsvariable `CLAUDE_CODE_EFFORT_LEVEL` bleibt
ungesetzt (APD-130/W-7)‘ ergänzt: ‚, sie übergeht die Einstellung im Chat (gemessen 15.11.2026, Sitzung 0115: Chat ‚mittel‘, alle Aufrufe
‚hoch‘)‘ (aus APD-135/W-22).

---

## AppDesign-`CLAUDE.md`

### APD-135/W-18 · AppDesign-`CLAUDE.md`, ‚Verpflichtend‘ Z. 15–17

**Alt:**
```
Alle Regeln stehen in der Zusammenarbeit allgemein (hier keine Wiederholung) – zuerst der Kasten ‚Jede Antwort‘, dazu Startfrage ohne Auftrag (0 Nr. 19),
nie ohne ‚Ja‘ bauen (0 Nr. 21), Testfall-Liste vor jedem Bau (0 Nr. 1), erst Usertests, dann Neues (0 Nr. 22), Auswahlfenster mit
‚Ich schreibe im Chat‘ (0 Nr. 7) und ‚(Kontext N)‘ in jeder Frage im Fenster (`node werkzeug/messung.mjs`, 2.2).
```
**Neu:**
```
Alle Regeln stehen in der Zusammenarbeit allgemein – zuerst der Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0; hier keine
Wiederholung.
```

### APD-135/W-19 · AppDesign-`CLAUDE.md`, ‚Arbeitsumgebung‘ Z. 40–41 – offene Frage 1 (Empfehlung: mit Paket 2)

**Alt:**
```
- **ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz) – Originale, Ergebnisse und Protokolle nur im
  Notizordner der Sitzung. Im Ordner `werkzeug` einmal `npm install`, dann `node werkzeug/pruefen.mjs <Datei> --zone <Zeitzone>`.
```
**Neu:**
```
- **ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz); Konvertieren und Prüfen nach dessen `CLAUDE.md` und `PROMPT.md`.
```

### APD-135/W-22 und W-7 · AppDesign-`CLAUDE.md`, ‚Arbeitsumgebung‘ Z. 53 (Regelwächter) → Hinweise zur Prüfumgebung

**Alt:**
```
- **Regelwächter** (Zusammenarbeit 2.8): abgeschaltet (APD-123); Werkzeug und Prüfung bleiben im Repo, nicht einrichten.
```
**Neu** (an derselben Stelle, nach ‚Tests einrichten‘ und vor ‚Veröffentlichen‘):
```
- **Hinweise zur Prüfumgebung:** Stand der Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1`;
  ein eigenes `node -e` mit Playwright braucht `createRequire('/home/user/ReiseLogBuch/tests/')('playwright')`. Einzelne Prüfungen
  dauern bis zu 3 min. `los` führt eine neuere `main` in den Vorbereitungs-Zweig zusammen – danach den Zweig hochladen. `npm install`
  im Ordner `werkzeug` von ReiseLogBuch-Import verändert `package-lock.json` – danach `git checkout -- werkzeug/package-lock.json`.
  Nach einem Neustart des Arbeitsprozesses kann der Notizordner einen neuen Pfad bekommen. AppDesign ist nach dem Klonen ohne Zweig
  (HEAD lose): committen und mit `git push origin HEAD:main` hochladen.
```
(Text aus `UEBERGABE.md` Z. 27–32, nur ‚Pages über‘ → ‚Stand der Pages über‘; dort entfällt er, siehe unten.)

### APD-135/W-3 · AppDesign-`CLAUDE.md`, ‚Veröffentlichen‘ Z. 61

**Alt:**
```
  sie bestätigt, sonst Abbruch vor dem Prüflauf –, erst AppDesign, dann die App, wartet auf Pages; voll ~60 min, Text deutlich kürzer). **Nie `… fassung` für eine schon veröffentlichte Version** – erst `vorbereiten` (neue Version),
```
**Neu:**
```
  sie bestätigt, sonst Abbruch vor dem Prüflauf –, erst AppDesign, dann die App, wartet auf Pages; voll ~75 min, Text deutlich kürzer). **Nie `… fassung` für eine schon veröffentlichte Version** – erst `vorbereiten` (neue Version),
```

### APD-135/W-31 · AppDesign-`CLAUDE.md`, ‚Versionsgeschichte‘ Z. 67–86

**Alt:** ‚## Versionsgeschichte‘ mit der Tabelle 2.12.0 bis 1.0.0 (Z. 67–86).

**Neu:**
```
## Versionsgeschichte

Steht in `CLAUDE Versionsgeschichte.md` (neueste oben); jede neue Version bekommt dort eine Zeile.
```
**Neue Datei** `CLAUDE Versionsgeschichte.md` (AppDesign):
```
# AppDesign-`CLAUDE.md` – Versionsgeschichte

Versionsgeschichte von `CLAUDE.md`, neueste oben; ausgelagert, weil die `CLAUDE.md` in jeder Sitzung geladen wird (Designrichtlinie 11).
Jede neue Version bekommt hier eine Zeile.

| Version | Datum | Inhalt |
|---|---|---|
[Zeilen 2.12.0 bis 1.0.0 wörtlich aus Z. 71–86]
```

---

## AppDesign-README (`README.md`)

### APD-135/W-8 · AppDesign-README Z. 5

**Alt:**
```
Gemeinsames Design für alle iPad-Web-Apps von g811141a – Apple-like nach den
```
**Neu:**
```
Gemeinsames Design für alle Web-Apps für iPad und iPhone von g811141a – Apple-like nach den
```

### APD-135/W-9 · AppDesign-README, ‚Versionen‘ Z. 59–60

**Alt:**
```
- Veröffentlichen mit `node werkzeug/veroeffentlichen.mjs vorbereiten --ad X.Y.Z --app <app>=X.Y.Z`, Texte schreiben,
  committen, dann `… los` – **erst AppDesign, dann die App** (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`).
```
**Neu:**
```
- Veröffentlichen mit `werkzeug/veroeffentlichen.mjs` – Befehle und Reihenfolge in der AppDesign-`CLAUDE.md` (‚Veröffentlichen‘);
  **erst AppDesign, dann die App** (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`).
```

---

## `UEBERGABE.md` (kein Regeltext, Folge von APD-135/W-7)

### APD-135/W-7 · `UEBERGABE.md`, Abschnitt 1 Z. 25 und Z. 27–32

**Alt:**
```
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
```
und Z. 27–32 ‚- **Hinweis Prüfumgebung:** Pages über `curl […]` […] mit `git push origin HEAD:main` hochladen.‘

**Neu:** beide Punkte entfallen in der nächsten Übergabe (stehen dann in 0 Nr. 6 bzw. in der AppDesign-`CLAUDE.md`).

---

## Designrichtlinie allgemein (`README - Designrichtlinie allgemein.md`)

Geordnet nach W-Nummer.

### APD-135/W-23 · Designrichtlinie 17, ‚Prüfung‘ Z. 1232

**Alt:**
```
**Prüfung:** je Regel eine automatische Prüfung in `tests/` (AppDesign): `hig.mjs` misst jede Ansicht jeder App, `ablauf.mjs`
```
**Neu:**
```
**Prüfung:** je Regel ihre automatische Prüfung in `tests/` (AppDesign), mit Datei und Funktion: `hig.mjs` misst jede Ansicht jeder App, `ablauf.mjs`
```

### APD-135/W-31 · Designrichtlinie 11, Z. 395–396

**Alt:**
```
- **Versionsnummer dreistufig Hauptversion.Nebenversion.Korrektur** (z. B. 1.2.1) – für Apps, AppDesign, Richtlinien und die
  Zusammenarbeit; jede dieser Dateien hat ihre eigene Nummer und am Ende eine Versionsgeschichte:
```
**Neu:**
```
- **Versionsnummer dreistufig Hauptversion.Nebenversion.Korrektur** (z. B. 1.2.1) – für Apps, AppDesign, Richtlinien und die
  Zusammenarbeit; jede dieser Dateien hat ihre eigene Nummer und am Ende eine Versionsgeschichte (die Zusammenarbeit, die
  Designrichtlinie allgemein und die `CLAUDE.md` in einer eigenen Datei daneben, weil sie zu Beginn gelesen bzw. geladen werden –
  Zusammenarbeit 0 Nr. 15; die Versionsgeschichte einer App-Richtlinie bekommt nur eine Zeile, wenn sich an ihren Abweichungen
  etwas ändert):
```

### APD-135/W-31 · Designrichtlinie, ‚Versionsgeschichte‘ Z. 1425–1539

**Alt:** ‚## Versionsgeschichte‘ mit der Tabelle 4.59.3 bis zur ersten Fassung (Z. 1425–1539).

**Neu:**
```
## Versionsgeschichte

Steht in `README - Designrichtlinie allgemein Versionsgeschichte.md` (neueste oben); jede neue Version bekommt dort eine Zeile.
```
**Neue Datei** `README - Designrichtlinie allgemein Versionsgeschichte.md` (AppDesign):
```
# Designrichtlinie allgemein – Versionsgeschichte

Versionsgeschichte von `README - Designrichtlinie allgemein.md`, neueste oben; ausgelagert nach Designrichtlinie 11. Alte
Regelnummern (R-01 bis R-52) stehen hier und in der Zuordnung des Katalogs (17). Jede neue Version bekommt hier eine Zeile.

[Tabellenkopf und alle Zeilen wörtlich aus Z. 1427–1539]
```

### APD-135/W-32 · Designrichtlinie 17, R-1.10 (Z. 1252)

**Alt** (Schluss der Spalte ‚Regel‘):
```
R-10.2 (mind. 11 pt) und R-1.3 (Felder mind. 16 px) bleiben Untergrenzen. Abweichung: keine Großanzeige (16) |
```
**Neu:**
```
R-10.2 (mind. 11 pt) und R-1.3 (Felder mind. 16 px) bleiben Untergrenzen. |
```

### APD-135/W-33 · Designrichtlinie 17, R-7.5 (Z. 1338)

**Alt:**
```
der Inhalt rückt mit und wird beim Einrasten schmaler, ausblenden quer nur mit panel-left (gleitet).
```
**Neu:**
```
der Inhalt rückt mit und wird beim Einrasten schmaler, ausblenden nur mit panel-left (gleitet).
```

### APD-135/W-33 · Designrichtlinie 17, R-4.7 (Z. 1293)

**Alt:**
```
Esc auf der Seite geht zurück bzw. schließt die darübergelegte Seitenleiste (Fokus auf panel-left);
```
**Neu:**
```
Esc auf der Seite geht im iPhone-Aufbau zurück;
```

### APD-135/W-34 · Designrichtlinie 1, Z. 52

**Alt:**
```
- Bewusst verworfen: eigene Kennzeichnung von Pflichtfeldern; harte, schmale Schatten; Glas-Leiste (schlechter lesbar); schwebende Kapseln und Menüs sind aus Glas (R-3.9).
```
**Neu:**
```
- Bewusst verworfen: eigene Kennzeichnung von Pflichtfeldern; harte, schmale Schatten; Glas-Leiste (schlechter lesbar). Was aus Glas ist: R-3.9.
```

### APD-135/W-34 · Designrichtlinie 16, ‚Bewusste Abweichungen‘ (neue Zeile nach Z. 1223) – offener Auftrag aus APD-55

**Alt:** – (die Tabelle nennt die Glas-Leiste nicht)

**Neu** (neue letzte Zeile der Tabelle):
```
| Deckende Leisten statt Glas-Leiste (Apple iOS 26: Inhalt läuft unter durchscheinende Leisten und wird am Rand weich ausgeblendet – Liquid Glass) | – | schlechter lesbar (1); schwebende Bausteine sind aus Glas (R-3.9); neu bewerten erst mit einem Muster am Gerät (Backlog APD-55) | 06.11.2026 |
```
Datum belegt im AppDesign-Backlog, APD-62: ‚Variante Glas 75 % gewählt (Nutzer 06.11.2026, Sitzung 0083: […] Leisten bleiben deckend)‘.

### APD-135/W-35 · Designrichtlinie 2, ‚Darstellung‘ Z. 107–108

**Alt:**
```
  Menü eines Eintrags, denn sie gilt für die ganze App: Untermenü ‚Darstellung ›‘ (sun-moon, rechts grau der aktuelle Wert) mit
  Automatisch · Hell · Dunkel (Häkchen). Gespeichert in `settings.appearance` (`auto` | `light` | `dark`).
```
**Neu:**
```
  Menü eines Eintrags, denn sie gilt für die ganze App: Untermenü ‚Darstellung ›‘ (sun-moon, rechts grau der aktuelle Wert) mit
  Automatisch · Hell · Dunkel (Häkchen), darunter als eigene Gruppe der Schalter ‚Glas‘ (R-3.9). Gespeichert in `settings.appearance`
  (`auto` | `light` | `dark`).
```

### APD-135/W-36 · Designrichtlinie 3, Textstile Z. 147 und Z. 150

**Alt:**
```
| Body | 14 | 15 | 16 | **17** | 19 | 21 | 23 | 28 | 33 | 40 | 47 | 53 | Text, Menüeinträge, Felder (mind. 16 px) |
```
```
| Footnote | 12 | 12 | 12 | **13** | 15 | 17 | 19 | 23 | 27 | 33 | 38 | 44 | Zusatzzeilen, Kasten-Bezeichnung |
```
**Neu:**
```
| Body | 14 | 15 | 16 | **17** | 19 | 21 | 23 | 28 | 33 | 40 | 47 | 53 | Text, Menüeinträge, Felder (mind. 16 px), Bezeichnung im Kasten mit Feldern (halbfett) |
```
```
| Footnote | 12 | 12 | 12 | **13** | 15 | 17 | 19 | 23 | 27 | 33 | 38 | 44 | Zusatzzeilen |
```

### APD-135/W-36 · Designrichtlinie 8, Z. 319–320 (Ergänzung aus APD-135/D-18, offene Frage 3)

**Alt:**
```
  Feld (‚€‘, ‚km‘) stehen in Textgröße (Body) und normaler Schrift, nie fett. Halbfett bleiben nur Überschriften: Schritt-Titel mit
  Nummer, Kasten-Überschriften, Tabellenköpfe und Titel.
```
**Neu:**
```
  Feld (‚€‘, ‚km‘) stehen in Textgröße (Body) und normaler Schrift, nie fett. Halbfett bleiben nur Überschriften: Schritt-Titel mit
  Nummer, Kasten-Überschriften, Tabellenköpfe (auch als Bezeichnung im Kasten mit Feldern, R-6.5) und Titel.
```

### APD-135/W-36 · Designrichtlinie 15.10, Z. 849

**Alt:**
```
  ‚Verlauf‘, ‚🚶🏽‍♂️ km‘): Text halbfett (600) wie die Kopfzeile der Tabelle, in Textgröße und Textfarbe wie der Wert (R-5.8); Emojis in
```
**Neu:**
```
  ‚Verlauf‘, ‚🚶🏽‍♂️ km‘): Text halbfett (600) wie die Kopfzeile der Tabelle, in Textgröße und Textfarbe wie der Wert (R-6.5); Emojis in
```

### APD-135/W-36 · Designrichtlinie 15.17, Z. 971

**Alt:**
```
- **Kasten** (`.box` mit Zeilen `.kv` = graue Bezeichnung `.k` links, Wert `.v` rechts): ein Eintrag als Karte, z. B. ein Tag
```
**Neu:**
```
- **Kasten** (`.box` mit Zeilen `.kv` = Bezeichnung `.k` links, Wert `.v` rechts; Aussehen 15.10): ein Eintrag als Karte, z. B. ein Tag
```

### APD-135/W-36 · Designrichtlinie 17, R-5.8 (Z. 1313)

**Alt:**
```
Feldbezeichnungen und Einheiten nach einem Feld in normaler Schrift (400) und Textgröße; halbfett nur Überschriften |
```
**Neu:**
```
Feldbezeichnungen und Einheiten nach einem Feld in normaler Schrift (400) und Textgröße; halbfett nur Überschriften und die Bezeichnung im Kasten mit Feldern (sie steht für den Tabellenkopf, R-6.5) |
```

### APD-135/W-37 · Designrichtlinie 4, ‚Farben‘ Z. 177–179 (APD-135/J-8)

**Alt:**
```
  - **Blau gefüllt = Hauptaktion** – nur **in Fenstern**, höchstens eine je Fenster (z. B. Häkchen nach einer Änderung, Teilen
    in der Vorschau, Backup erstellen in der Erinnerung): `--accent`, weiße Schrift, Lichtkante, Schatten `--glow-accent`.
    Menüs und die Kapsel der Kopfzeile werden nicht eingefärbt.
```
**Neu:**
```
  - **Blau gefüllt = Hauptaktion** – in Fenstern und Sprechblasen höchstens eine (z. B. Häkchen nach einer Änderung, Teilen
    in der Vorschau, Backup erstellen in der Erinnerung): `--accent`, weiße Schrift, Lichtkante, Schatten `--glow-accent`.
    Außerhalb von Fenstern und Sprechblasen sind nur der Knopf der Backup-Kachel bzw. des festen Hinweises unten (15.19, 15.17)
    und der gewählte Eintrag der Liste (15.4) blau gefüllt. Menüs und die Kapsel der Kopfzeile werden nicht eingefärbt.
```

### APD-135/W-37 · Designrichtlinie 17, R-3.3 (Z. 1276)

**Alt:**
```
**Jede Farbe hat eine Bedeutung:** blau gefüllt nur die Hauptaktion im Fenster (höchstens eine); Gewähltes bleibt
```
**Neu:**
```
**Jede Farbe hat eine Bedeutung:** blau gefüllt nur die Hauptaktion – in einem Fenster bzw. einer Sprechblase höchstens eine – sowie der Knopf der Backup-Kachel bzw. des festen Hinweises unten und der gewählte Eintrag der Liste; Gewähltes bleibt
```

### APD-135/W-38 · Designrichtlinie 7, Z. 275

**Alt:**
```
  Suchzeile und Felder der Hauptansicht). Das iPad-Fenster gleitet mit der Tastatur (0,25 s) in die Mitte darüber und zurück; ist
```
**Neu:**
```
  Suchzeile und Felder der Hauptansicht). Das iPad-Fenster gleitet mit der Tastatur in die Mitte darüber und zurück (R-1.12); ist
```

### APD-135/W-38 · Designrichtlinie 15.4, Z. 757

**Alt:**
```
  schmaler (der oberste Eintrag bleibt), sonst federt sie zurück. Ausblenden nur mit panel-left (gleitet, ~0,35 s) – nach links wischen
```
**Neu:**
```
  schmaler (der oberste Eintrag bleibt), sonst federt sie zurück. Ausblenden nur mit panel-left (gleitet, R-1.12) – nach links wischen
```

### APD-135/W-38 · Designrichtlinie 15.17, Z. 953

**Alt:**
```
  Liste weicht ein Drittel nach links und dunkelt leicht ab; der Zurück-Knopf schiebt ihn wieder hinaus (~0,35 s). Zurück geht es
```
**Neu:**
```
  Liste weicht ein Drittel nach links und dunkelt leicht ab; der Zurück-Knopf schiebt ihn wieder hinaus (R-1.12). Zurück geht es
```

### APD-135/W-39 · Designrichtlinie 17, R-4.13 (Z. 1300)

**Alt** (Spalte ‚Regel‘, Ausschnitt):
```
(von 20 % auf volle Größe, Kurve wie das Blatt `cubic-bezier(.32,.72,0,1)`)
```
**Neu:**
```
(von 20 % auf volle Größe, Kurve `cubic-bezier(.32,.72,0,1)`)
```
**Alt** (Spalte ‚Prüfung‘, Anfang):
```
| ablauf.mjs – neue Prüfung (Herkunft, Dauer, Endlage, Schließen mitten im Öffnen, ‚Bewegung reduzieren‘) |
```
**Neu:**
```
| ablauf.mjs – `checkWachsen` (Herkunft, Dauer, Endlage, Schließen mitten im Öffnen, ‚Bewegung reduzieren‘) |
```

### APD-135/W-39 · Designrichtlinie 17, Spalte ‚Prüfung‘ von R-2.5, R-2.6, R-2.7 (Z. 1266–1268), R-3.5 und R-3.6 (Z. 1278–1279)

| Regel | Alt (Spalte ‚Prüfung‘) | Neu (Spalte ‚Prüfung‘) |
|---|---|---|
| R-2.5 | `ablauf.mjs` | ``ablauf.mjs – `checkTitelBlase` `` |
| R-2.6 | `ablauf.mjs` | ``ablauf.mjs – `checkGrossanzeige` `` |
| R-2.7 | `ablauf.mjs` | ``ablauf.mjs – `checkTitelOben` `` |
| R-3.5 | ``ablauf.mjs – `checkLangDruecken` `` | ``ablauf.mjs – `checkLangDruecken`, `checkAnheben` `` |
| R-3.6 | `ablauf.mjs` | ``ablauf.mjs – `checkBeruehren` `` |

Belegt in `tests/ablauf.mjs`: `checkTitelBlase` (Z. 3113) meldet R-2.5, `checkGrossanzeige` (Z. 3275) R-2.6, `checkBeruehren` (Z. 3349) R-3.6,
`checkAnheben` (Z. 3442) R-3.5, `checkTitelOben` (Z. 3495) R-2.7, `checkWachsen` (Z. 4071) R-4.13.

### APD-135/W-40 · Designrichtlinie 2, Farbtabelle Z. 65 und Z. 73

**Alt:**
```
| `--card` | `#ffffff` | `#1c1c1e` | Kästen, Tabelle, Eingabefelder (ohne Rand), Seitenleiste, Menüs (dunkel `#2c2c2e`) |
```
```
| `--field-line` | `#c7c7cc` | `#48484a` | Haarlinie um Eingabefelder |
```
**Neu:**
```
| `--card` | `#ffffff` | `#1c1c1e` | Kästen, Tabelle, Eingabefelder, Seitenleiste, Menüs (dunkel `#2c2c2e`) |
```
Zeile `--field-line` entfällt.

### APD-135/W-40 · Designrichtlinie 2, ‚Kontrast erhöhen‘ Z. 100 (Ergänzung aus APD-135/D-10, offene Frage 3)

**Alt:**
```
  | `--line` · `--th-line` · `--field-line` | `#8e8e93` | `#636366` |
```
**Neu:**
```
  | `--line` · `--th-line` | `#8e8e93` | `#636366` |
```

### APD-135/W-40 · Designrichtlinie 3, Z. 158–160

**Alt:**
```
- Radien: Schaltflächen und Suchfelder Kapsel (22 px), Icon-Schaltflächen rund, Listeneinträge und Kästen 14 px,
  Eingabefelder 10 px, Tabelle 12 px, Fenster 18 px.
- Trennlinien und Feldränder als Haarlinie (0,5 px); Kästen und Tabelle ohne Rand.
```
**Neu:**
```
- Radien: Schaltflächen und Suchfelder Kapsel (22 px), Icon-Schaltflächen rund, Kacheln und Listen 22 px, Kästen und Menüs 14 px,
  Eingabefelder 10 px, Tabelle 12 px, Fenster 18 px (Blatt oben 26 px, 15.17).
- Feldränder und Trennlinien in Listen als Haarlinie (0,5 px), Trennlinien in Menüs und im Kasten mit Feldern 1 px (15.6, 15.10);
  Kästen und Tabelle ohne Rand.
```

### APD-135/W-40 · Designrichtlinie 9, Z. 356; 15.3 Z. 704; 15.4 Z. 726 und 735; 15.8 Z. 820 (Textstil statt px)

| Zeile | Alt (Ausschnitt) | Neu (Ausschnitt) |
|---|---|---|
| 356 | ‚Schrift 17 px halbfett wie die Zellen.‘ | ‚Schrift Headline halbfett wie die Zellen.‘ |
| 704 | ‚· Titel in der Mitte (17 px, fett) · rechts eine‘ | ‚· Titel in der Mitte (Headline, halbfett) · rechts eine‘ |
| 726 | ‚Kopf: Überschrift (20 px, fett, linksbündig) · Kapsel‘ | ‚Kopf: Überschrift (Title 3, fett, linksbündig) · Kapsel‘ |
| 735 | ‚als dritte Zeile klein und grau (13 px) ‚geändert am‘ | ‚als dritte Zeile klein und grau (Footnote) ‚geändert am‘ |
| 820 | ‚· Mitte Titel (19 px) mit grauer Zusatzzeile (13 px) · rechts‘ | ‚· Mitte Titel (19, wächst wie Title 3) mit grauer Zusatzzeile (Footnote) · rechts‘ |

### APD-135/W-41 · Designrichtlinie 15.4, ‚Mehr-Menü der Seitenleiste‘ Z. 763–764

**Alt:**
```
- **Mehr-Menü der Seitenleiste:** Backup erstellen (darunter grau „Letztes Backup erstellt am …“) · Backup laden · Abstand ·
  Messung starten (15.21) · durchgehender Strich · darunter ohne Leerzeilen grau die Versionszeile „<App> · Version X.Y.Z ·
```
**Neu:**
```
- **Mehr-Menü der Seitenleiste:** Suchen (nur mit Einträgen) · Strich · Backup erstellen (darunter grau „Letztes Backup erstellt
  am …“) · Backup laden · Abstand · Darstellung › (2) · Abstand · Messung starten (15.21) · durchgehender Strich · darunter ohne
  Leerzeilen grau die Versionszeile „<App> · Version X.Y.Z ·
```
Belegt: `ReiseLogBuch/index.html` `backupMenuItems` (Suchen mit `'line'` aus `suchenMenuItems`, Backup, `'sep'`, Darstellung, `'sep'`, Messung).

### APD-135/W-41 · Designrichtlinie 15.21, Z. 1117

**Alt:**
```
- **Bedienung:** Mehr-Menü der Seitenleiste (iPhone: Startliste), nach Backup durch Abstand getrennt: ‚Messung starten‘
```
**Neu:**
```
- **Bedienung:** Mehr-Menü der Seitenleiste (iPhone: Startliste), nach der Darstellung durch Abstand getrennt: ‚Messung starten‘
```

### APD-135/W-42 · Designrichtlinie 17, G-6 (Z. 1383)

**Alt:**
```
| G-6 | ‚Neues …‘ öffnet einmal von selbst, leere Seite mit grauem Hinweis | 7 | Abläufe der App |
```
**Neu:**
```
| G-6 | ‚Neues …‘ öffnet einmal von selbst, wenn es noch keinen Eintrag gibt (danach der leere Zustand, R-7.7) | 7 | Abläufe der App |
```

### APD-135/W-42 und W-47 · Designrichtlinie 17, G-19 (Z. 1396)

**Alt:**
```
| G-19 | HIG ‚außerdem‘: Farbe nie einziges Merkmal; ein leerer Bildschirm nennt den nächsten Schritt (Rest ersetzt durch R-4.10 und R-10.6) | 16 | Sicht |
```
**Neu:**
```
| G-19 | HIG ‚außerdem‘ (16): alle Punkte der Spalte | 16 | Sicht |
```

### APD-135/W-42 · Designrichtlinie 16, HIG-Checkliste Nr. 5 bis 8 (Z. 1200–1203)

**Alt:**
```
| 5 | **Menüs** ([Menus](https://developer.apple.com/design/human-interface-guidelines/menus)): Gruppen durch Strich getrennt, Untermenüs nur eine Ebene | R-4.1 | Wichtigstes oben; Icons in einer Gruppe alle oder keine, für Standardaktionen die bekannten Symbole (Teilen, Suchen, Löschen); Beschriftung mit Verb; **kein „…“** am Ende (die HIG nennt es für weitere Eingaben, Apples iPhone-/iPad-Apps verwenden es nicht, z. B. ‚Move Note‘); nicht verfügbare Punkte grau; Untermenüs höchstens etwa 5 Punkte |
| 6 | **Kontextmenüs** ([Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus)): ganz sichtbar, ohne ‚Öffnen‘ | R-4.2 | wenige Punkte, höchstens etwa 3 Gruppen; Häufigstes nah am Finger, Löschen rot am Ende; nicht verfügbare Punkte **ausblenden** statt grau; alles auch ohne Kontextmenü erreichbar; in der ganzen App einheitlich |
| 7 | **Abfragen:** Schaltfläche heißt wie die Aktion (‚Löschen‘), ‚Abbrechen‘ ist immer da | R-4.3 | Löschen und Verwerfen immer bestätigen (10) |
| 8 | **Texte** ([Writing](https://developer.apple.com/design/human-interface-guidelines/writing)): deutsch, Anführungszeichen ‚…‘ | R-10.1 | einfach, ohne Fachbegriffe, so kurz wie möglich; kein ‚wir‘; ‚tippen‘ statt ‚klicken‘; Fehlermeldungen sagen, **was zu tun ist** – ohne Vorwurf, direkt beim Problem; ein leerer Bildschirm nennt den nächsten Schritt; ein Schalter beschreibt, was er eingeschaltet tut |
```
**Neu:**
```
| 5 | **Menüs** ([Menus](https://developer.apple.com/design/human-interface-guidelines/menus)): Gruppen durch Strich getrennt, Untermenüs nur eine Ebene | R-4.1, R-4.9 (Untermenü höchstens 5 Punkte), R-4.10 (Icons in einer Gruppe alle oder keine; **kein „…“** am Ende – die HIG nennt es für weitere Eingaben, Apples iPhone-/iPad-Apps verwenden es nicht, z. B. ‚Move Note‘) | Wichtigstes oben; für Standardaktionen die bekannten Symbole (Teilen, Suchen, Löschen); Beschriftung mit Verb; nicht verfügbare Punkte grau |
| 6 | **Kontextmenüs** ([Context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus)): ganz sichtbar, ohne ‚Öffnen‘ | R-4.2, R-4.10 (höchstens 3 Gruppen; nicht verfügbare Punkte **ausblenden** statt grau) | wenige Punkte; Häufigstes nah am Finger, Löschen rot am Ende; alles auch ohne Kontextmenü erreichbar; in der ganzen App einheitlich |
| 7 | **Abfragen:** Schaltfläche heißt wie die Aktion (‚Löschen‘), ‚Abbrechen‘ ist immer da | R-4.3, R-4.12 (Löschen und Verwerfen immer bestätigen, 10) | – |
| 8 | **Texte** ([Writing](https://developer.apple.com/design/human-interface-guidelines/writing)): deutsch, Anführungszeichen ‚…‘ | R-10.1, R-10.6 (kein ‚wir‘; ‚tippen‘ statt ‚klicken‘) | einfach, ohne Fachbegriffe, so kurz wie möglich; Fehlermeldungen sagen, **was zu tun ist** – ohne Vorwurf, direkt beim Problem; ein leerer Bildschirm nennt den nächsten Schritt; ein Schalter beschreibt, was er eingeschaltet tut |
```
Die Begründung zu ‚kein „…“‘ steht damit in der Spalte ‚Regel‘ und geht nicht verloren.

### APD-135/W-42 · Designrichtlinie 15.6, ‚Untermenü‘ Z. 793

**Alt:**
```
- **Untermenü** (`submenu`, eine Ebene, höchstens etwa 5 Punkte): Eintrag mit grauem Wert und ›; öffnet neben dem Menü, oben
```
**Neu:**
```
- **Untermenü** (`submenu`, eine Ebene, höchstens 5 Punkte, R-4.9): Eintrag mit grauem Wert und ›; öffnet neben dem Menü, oben
```

### APD-135/W-44 – siehe Abschnitt ‚Reiselogbuch-Dateien‘ (`PROMPT.md`)

### APD-135/W-45 · Designrichtlinie 13, Z. 541 und Z. 546 (Sitzungsnummern)

**Alt:**
```
- **Fokus-Rahmen in Textfeldern** (R-3.4, gemessen 24.10.2026 in WebKit und Chromium der Prüfumgebung, Sitzung 0044):
```
```
- **Leeren und Rückgängig** (R-5.6, gemessen am iPad hoch, Safari 26.6.3, 29.10.2026, Sitzung 0053 – `arbeit/APD-81 Klärung.md`
```
**Neu:**
```
- **Fokus-Rahmen in Textfeldern** (R-3.4, gemessen 24.10.2026 in WebKit und Chromium der Prüfumgebung):
```
```
- **Leeren und Rückgängig** (R-5.6, gemessen am iPad hoch, Safari 26.6.3, 29.10.2026 – `arbeit/APD-81 Klärung.md`
```

### APD-135/W-45 · Designrichtlinie 14, Z. 630

**Alt:**
```
- **Geplant:** Startseite g811141a.github.io mit allen Apps.
```
**Neu:** entfällt (steht als APD-1 im Backlog).

### APD-135/W-45 · Designrichtlinie 15.3, Z. 716; 15.17, Z. 1000; R-3.9, Z. 1282 (‚wie bisher‘)

| Zeile | Alt (Ausschnitt) | Neu (Ausschnitt) |
|---|---|---|
| 716 | ‚Die Anzeige ist nur zu sehen – VoiceOver nennt jeden Knopf wie bisher (R-1.8).‘ | ‚Die Anzeige ist nur zu sehen – VoiceOver nennt jeden Knopf mit Namen (R-1.8).‘ |
| 1000 | ``(Schließen über x bzw. `dlg.close()` wie bisher).`` | ``(Schließen über x bzw. `dlg.close()`).`` |
| 1282 | ‚‚Transparenz reduzieren‘ des Geräts: deckend wie bisher, wo der Browser es meldet‘ | ‚‚Transparenz reduzieren‘ des Geräts: deckend (Grundfarbe ganz), wo der Browser es meldet‘ |

Z. 1171 ‚Ohne Rollbereich rollt wie bisher das Fenster (ältere Apps).‘ bleibt (APD-135/D-24, APD-135/J-19: Paket 6).

### APD-135/W-45 · Designrichtlinie 17, ‚Regeln ohne automatische Prüfung‘ Z. 1372–1374

**Alt:**
```
**Gerät** oder in den **Abläufen der App** (Reiselogbuch: `ablauf-gesamt.mjs` u. a.). Automatische Prüfungen dafür: Backlog APD-40.
```
**Neu:**
```
**Gerät** oder in den **Abläufen der App** (Reiselogbuch: `ablauf-gesamt.mjs` u. a.).
```

### APD-135/W-46 · Designrichtlinie 17, R-6.1 (Z. 1322)

**Alt:**
```
Kasten mit Feldern (iPhone) mit Linien waagrecht
```
**Neu:**
```
Kasten mit Feldern (statt Tabellenzeile, R-6.6, R-1.10) mit Linien waagrecht
```

### APD-135/W-46 · Designrichtlinie 15.10, Z. 846 (Ergänzung aus APD-135/D-23, offene Frage 3)

**Alt:**
```
- **Kasten mit Feldern** (`.box` mit `.kv`, iPhone statt Tabellenzeile, R-6.1): Felder durch dünne Linien getrennt (1 px
```
**Neu:**
```
- **Kasten mit Feldern** (`.box` mit `.kv`, statt Tabellenzeile – 15.13, R-6.1): Felder durch dünne Linien getrennt (1 px
```

### APD-135/W-46 · Designrichtlinie 15.13, Z. 905–910 (enthält auch die zwei ‚seit‘ aus W-51)

**Alt:**
```
- **Große Schrift** (seit 4.37.0, R-1.10): ab AX1 – auf dem iPhone hoch immer – zeigt jede Tabelle im Inhalt ihre Zeilen als
  Kästen (15.17, `.box` mit `.kv`, Bezeichnung über dem Wert); Vorschau und Ausgabe bleiben Tabellen (R-6.2).
- **Schmaler Inhalt** (seit 4.45.0, R-6.6): ist der Inhalt schmaler als 700 px (dieselbe Grenze wie `isPhone()`, z. B. am iPad hoch
  neben der Seitenleiste), zeigt jede Tabelle im Inhalt ihre Zeilen als Kästen wie am iPhone (15.17, `.box` mit `.kv`); Vorschau und
  Ausgabe bleiben Tabellen (R-6.2). Ein Wechsel (Drehen, Seitenleiste ein/aus) wirkt wie das Drehen (R-8.1). **Technisch:**
  `inhaltSchmal(#app)` in `ui.js`.
```
**Neu:**
```
- Im Inhalt zeigt jede Tabelle ihre Zeilen als Kästen (15.17, `.box` mit `.kv`), wenn der Inhalt schmaler als 700 px ist (R-6.6,
  `inhaltSchmal(#app)`) oder ab AX1 (R-1.10); Vorschau und Ausgabe bleiben Tabellen (R-6.2). Ein Wechsel wirkt wie das Drehen (R-8.1).
```

### APD-135/W-47 · Designrichtlinie 17, Reihenfolge in Thema 1 (Z. 1251–1254) und Thema 4 (Z. 1292–1294)

**Alt** (Zeilenfolge): Thema 1 ‚R-1.6 · R-1.8 · R-1.10 · R-1.9 · R-1.7 · R-1.11‘ · Thema 4 ‚R-4.5 · R-4.7 · R-4.6 · R-4.8‘.

**Neu** (Zeilenfolge): Thema 1 ‚R-1.6 · R-1.7 · R-1.8 · R-1.9 · R-1.10 · R-1.11‘ · Thema 4 ‚R-4.5 · R-4.6 · R-4.7 · R-4.8‘. Text der Zeilen
unverändert (außer den Änderungen aus W-32, W-33 oben).

### APD-135/W-47 · Designrichtlinie 17, G-Zeilen ‚ersetzt durch‘ und ‚Rest ersetzt‘ (Z. 1378–1395)

**Alt** (acht Zeilen, entfallen):
```
| G-1 | ersetzt durch R-3.7 | – | – |
| G-2 | ersetzt durch R-3.8 | – | – |
| G-4 | ersetzt durch R-4.11 | – | – |
| G-5 | ersetzt durch R-4.8 | – | – |
| G-7 | ersetzt durch R-5.10 | – | – |
| G-12 | ersetzt durch R-10.7 | – | – |
| G-13 | ersetzt durch R-4.12 | – | – |
| G-17 | ersetzt durch R-4.9 | – | – |
```
**Neu** (Satz direkt unter der Tabelle, an der Stelle von ‚Aus dem Katalog genommen‘):
```
Vergeben, nicht neu verwenden: G-1, G-2, G-4, G-5, G-7, G-12, G-13, G-17 (in R-Regeln aufgegangen, CHANGELOG 4.51.0 und 4.52.0).
```
Belegt: AppDesign-Backlog, Erledigt APD-40 Paket A (4.51.0: G-1, G-2, G-5, G-17) und Pakete B und C (4.52.0: G-4, G-7, G-12, G-13).

| Zeile | Alt | Neu |
|---|---|---|
| G-10 (1387) | ‚Statistik als Liste (Rest ersetzt durch R-6.7)‘ | ‚Statistik als schlichte Liste‘ |
| G-15 (1392) | ‚Emoji-Varianten gleich behandeln (Rest ersetzt durch R-1.11)‘ | ‚Emoji-Varianten gleich behandeln‘ |
| G-18 (1395) | ‚Info-Icon (Rest ersetzt durch R-5.9)‘ | ‚Info-Icon: ein Tippen blendet den grauen Hinweis ein bzw. aus‘ |

(G-19: siehe W-42. Für G-18 belegt in 15.14 Z. 914 ‚Runde Icon-Schaltfläche `info`; ein Tippen blendet einen grauen Hinweis ein bzw. aus.‘)

### APD-135/W-47 · Designrichtlinie 17, Z. 1398–1399 und Z. 1421–1424

**Alt:**
```
**Aus dem Katalog genommen:** R-50 (Testfälle mit /0, Meldung je Gerät) ist Arbeitsregel der Zusammenarbeit (2.3); Prüfung
`doku.mjs`.
```
```
Die Spalte ‚ersetzt‘ (bis 4.28.1) nannte zusätzlich, welche Regeln aus früheren Abschnitten bzw. Backlog-Punkten neu dazukamen:
R-2.3 (15.2), R-4.4 (6, 15.8, HIG 9), R-5.3 (8), R-5.4 (15.12), R-5.5 (APD-14), R-6.4 (7, 10), R-7.2 (RLB-84), R-7.3 (APD-13), R-7.4
(APD-16), R-1.6 und R-2.4 neu; R-3.3 umfasst auch Abschnitt 4, R-6.1 auch APD-39/F-3, R-6.4 auch RLB-84/F-4, R-7.1 auch einen Teil von R-44.
```
**Neu:** beide Absätze entfallen. Die Tabelle ‚### Zuordnung alt → neu‘ (Z. 1401–1419) **bleibt** (`checkCatalog` liest sie).

### APD-135/W-51 · Designrichtlinie, ‚seit X.Y.Z‘ an 20 Stellen

| Zeile | Alt (Ausschnitt) | Neu (Ausschnitt) |
|---|---|---|
| 48 | ‚**Bedienungshilfen** (seit 4.35.0, APD-43 Teil 1): VoiceOver‘ | ‚**Bedienungshilfen**: VoiceOver‘ |
| 75 | ‚eigener Wert nur mit ‚Kontrast erhöhen‘ (seit 4.35.0)‘ | ‚eigener Wert nur mit ‚Kontrast erhöhen‘‘ |
| 91 | ‚**Kontrast erhöhen** (R-1.9, seit 4.35.0, APD-43 H1–H5):‘ | ‚**Kontrast erhöhen** (R-1.9):‘ |
| 325 | ‚entscheidet, wie iOS nach einer Korrektur (seit 4.31.0, APD-65).‘ | ‚entscheidet, wie iOS nach einer Korrektur.‘ |
| 326 | ‚**Keine doppelten Leerzeichen** (R-5.2, seit 4.31.0, APD-64):‘ | ‚**Keine doppelten Leerzeichen** (R-5.2):‘ |
| 527 | ‚nie näher am Rand als Fokus-Umrandung und Schatten; seit 4.56.0, APD-115/V-3) und gibt‘ | ``nie näher am Rand als Fokus-Umrandung und Schatten; Testfall-Liste `arbeit/APD-115 Testfall-Liste.md`) und gibt`` |
| 538 | ‚der Rollbereich schneidet sonst beides oben ab (seit 4.32.2, APD-73, P-69/3 iPhone quer).‘ | ‚der Rollbereich schneidet sonst beides oben ab (Messung P-69/3, iPhone quer).‘ |
| 570 | ‚**Blatt ziehen** (R-4.6, seit 4.32.0):‘ | ‚**Blatt ziehen** (R-4.6):‘ |
| 571 | ‚oder bei offener Tastatur auf einem Feld – seit 4.32.1, APD-71); im gerollten Inhalt‘ | ‚oder bei offener Tastatur auf einem Feld); im gerollten Inhalt‘ |
| 575 | ‚dabei frei (seit 4.32.2, APD-73 – am Rand ging der Finger zuerst nach oben, 244 → 76 → 302, entschieden war nach 8 px). Das Blatt‘ | ‚dabei frei. Das Blatt‘ |
| 583 | ‚**Klick nur mit Hörer (seit 4.49.1, APD-109, Messung P-90 vom 02.11.2026):**‘ | ‚**Klick nur mit Hörer (Messung P-90 vom 02.11.2026):**‘ |
| 588 | ‚**Klick nach dem Wischen (seit 4.50.0, APD-108, Messung APD-106 vom 01.11.2026, iPhone):**‘ | ‚**Klick nach dem Wischen (Messung APD-106 vom 01.11.2026, iPhone):**‘ |
| 864 | ‚**Technisch** (seit 4.35.0, R-5.3):‘ | ‚**Technisch** (R-5.3):‘ |
| 905 | ‚(seit 4.37.0, R-1.10)‘ | in W-46 neu gefasst |
| 907 | ‚(seit 4.45.0, R-6.6)‘ | in W-46 neu gefasst |
| 989 | ‚auch wenn R-4.5 den Inhalt dafür gerollt hat (seit 4.32.1, APD-71; ein Feld, das selbst gerollt ist, rollt weiter);‘ | ‚auch wenn R-4.5 den Inhalt dafür gerollt hat (ein Feld, das selbst gerollt ist, rollt weiter);‘ |
| 990–991 | ‚auch, wenn der Finger zuerst ein Stück nach oben geht (seit 4.32.2, APD-73). Antippen der Abdunkelung‘ | ‚auch, wenn der Finger zuerst ein Stück nach oben geht. Antippen der Abdunkelung‘ |
| 994 | ‚**Am iPad** (seit 4.38.0, APD-72, Variante B wie ein Formblatt in iPadOS, z. B. ‚Neuer Kontakt‘):‘ | ‚**Am iPad** (Variante B wie ein Formblatt in iPadOS, z. B. ‚Neuer Kontakt‘):‘ |
| 1129–1130 | ‚beim Beenden im Menü ‚messung beendet‘ (seit 4.38.0, RLB-103).‘ | ‚beim Beenden im Menü ‚messung beendet‘.‘ |
| 1149–1150 | ‚zählt als Antippen des Felds (seit 4.38.0, RLB-103). Grenze:‘ | ‚zählt als Antippen des Felds. Grenze:‘ |

Zu Z. 538 und 575: die Messung P-69/3 steht schon in Z. 572 (‚Messung P-69/3, iOS 26.6.2‘); in Z. 575 bleibt deshalb nichts als Quelle stehen.

---

## Reiselogbuch-Dateien

### APD-135/W-17 · ReiseLogBuch-`CLAUDE.md`, ‚App-spezifisch‘ Z. 39–41

**Alt:**
```
- Prüfen: `node tests/alle.mjs` (oder `sh tests/alle.sh`) im Repo-Ordner – alle Prüfungen parallel in Chromium und WebKit, Abbruch
  ab dem dritten roten Lauf, rote Läufe am Ende einmal allein (‚wackelt‘), `--alle` zeigt alle roten, Gegenprobe `--gegenprobe`; Einrichten: AppDesign-`CLAUDE.md`; die Prüfungen:
  `tests/README.md`.
```
**Neu:**
```
- Prüfen: `node tests/alle.mjs` (oder `sh tests/alle.sh`) im Repo-Ordner – Ablauf und Stufen nach Zusammenarbeit 0 Nr. 2;
  Einrichten: AppDesign-`CLAUDE.md`; die Prüfungen: `tests/README.md`.
```

### APD-135/W-31 · ReiseLogBuch-`CLAUDE.md`, ‚Versionsgeschichte‘ Z. 45–69

**Alt:** ‚## Versionsgeschichte‘ mit der Tabelle 3.9.0 bis 1.0.0 (Z. 45–69).

**Neu:**
```
## Versionsgeschichte

Steht in `CLAUDE Versionsgeschichte.md` (neueste oben); jede neue Version bekommt dort eine Zeile.
```
**Neue Datei** `CLAUDE Versionsgeschichte.md` (ReiseLogBuch):
```
# Reiselogbuch-`CLAUDE.md` – Versionsgeschichte

Versionsgeschichte von `CLAUDE.md`, neueste oben; ausgelagert, weil die `CLAUDE.md` in jeder Sitzung geladen wird (Designrichtlinie
allgemein 11). Jede neue Version bekommt hier eine Zeile.

| Version | Datum | Inhalt |
|---|---|---|
[Zeilen 3.9.0 bis 1.0.0 wörtlich aus Z. 49–69]
```

### APD-135/W-31 · ReiseLogBuch, Stummel `README - Zusammenarbeit allgemein.md` Z. 6

**Alt:**
```
Diese Datei bleibt nur als Verweis. Die Versionsgeschichte bis 1.9.0 steht in der Datei in AppDesign.
```
**Neu:**
```
Diese Datei bleibt nur als Verweis. Die Versionsgeschichte steht in AppDesign (`README - Zusammenarbeit Versionsgeschichte.md`).
```

### APD-135/W-8 · ReiseLogBuch-README Z. 3

**Alt:**
```
Einfaches Reiselogbuch als Web-App (PWA) für das iPad – offline nutzbar, alle Daten bleiben lokal auf dem Gerät.
```
**Neu:**
```
Einfaches Reiselogbuch als Web-App (PWA) für iPad und iPhone – offline nutzbar, alle Daten bleiben lokal auf dem Gerät.
```

### APD-135/W-51 · Designrichtlinie Reiselogbuch, Abweichung 2 (Z. 17)

**Alt:**
```
(in der Kapsel, über dem Minimum von 28 pt) – seit 3.35.0 nur bei Standard; bei größerer Schrift
```
**Neu:**
```
(in der Kapsel, über dem Minimum von 28 pt) – nur bei Standard; bei größerer Schrift
```
(Der Rest von APD-135/D-45 – Halbsatz ‚Quartier-Links …‘, ‚mit 3.11.6‘ – kommt mit W-50 in Paket 4.)

### APD-135/W-44 · `PROMPT.md` Z. 6 und Z. 158

**Alt:**
```
Regelkatalog (AppDesign, R-1.1 bis R-10.4); sie werden hier nur genannt, nie wiederholt. Was das Reiselogbuch bewusst anders macht,
```
```
- **Tageserfassung** als Blatt, Titel kurz ‚Di, 25.08.2026‘ mit ‚Gespeichert um …‘; Wetter-Symbole 40 px breit (Abweichung 2, bei Standard-Textgröße).
```
**Neu:**
```
Regelkatalog (AppDesign, Abschnitt 17); sie werden hier nur genannt, nie wiederholt. Was das Reiselogbuch bewusst anders macht,
```
```
- **Tageserfassung** als Blatt, Titel kurz ‚Di, 25.08.2026‘ mit ‚Automatisch gespeichert um …‘ (7); Wetter-Symbole 40 px breit (Abweichung 2, bei Standard-Textgröße).
```
(Nicht ‚siehe Designrichtlinie allgemein 17‘ – das verbietet `checkCollab`.)

### APD-135/W-33 · `PROMPT.md` Z. 129–131

**Alt:**
```
- **iPad hoch:** die Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch, nach links wischen schiebt sie weg (R-7.5).
- **iPad quer:** die ausgeblendete Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch – der Inhalt rückt mit und wird
  beim Einrasten schmaler; ausblenden nur mit panel-left (R-7.5).
```
**Neu:**
```
- **iPad hoch und quer:** die ausgeblendete Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch (R-7.5).
```

### APD-135/W-33 · `PROMPT.md` Z. 168–169

**Alt:**
```
  Startliste) oder ⌘F mit Hardware-Tastatur – im offenen Reiselogbuch, ohne offenes (iPhone-Startliste; iPad hoch mit darübergelegter
  Seitenleiste) in allen; beendet mit dem runden x ‚Suche beenden‘ rechts in der Suchzeile.
```
**Neu:**
```
  Startliste) oder ⌘F mit Hardware-Tastatur – im offenen Reiselogbuch, ohne offenes (iPhone-Startliste) in allen; beendet mit dem
  runden x ‚Suche beenden‘ rechts in der Suchzeile.
```

### APD-135/W-51 · `PROMPT.md`, ‚seit X.Y.Z‘ an 18 Stellen

| Zeile | Alt (Ausschnitt) | Neu (Ausschnitt) |
|---|---|---|
| 48 | ‚- Leer (seit 3.48.0 leerer Zustand, AppDesign 15.23 / R-7.7):‘ | ‚- Leer (leerer Zustand, AppDesign 15.23 / R-7.7):‘ |
| 83 | ‚‚Spalte 🚶🏽‍♂️km ‚Gegangene Kilometer‘‘ (seit 3.41.0, RLB-110), ‚Spalte‘ | ‚‚Spalte 🚶🏽‍♂️km ‚Gegangene Kilometer‘‘, ‚Spalte‘ |
| 102 | ‚bei der Suche nur Jahre mit Treffern; seit 3.44.0, RLB-114, R-7.6)‘ | ‚bei der Suche nur Jahre mit Treffern; R-7.6)‘ |
| 106 | ‚· ‚Darstellung ›‘ (seit 3.41.0, RLB-108) · Abstand‘ | ‚· ‚Darstellung ›‘ · Abstand‘ |
| 117 | ‚**Startposition** (R-7.4, seit 3.30.0 RLB-98): beim‘ | ‚**Startposition** (R-7.4): beim‘ |
| 156 | ‚**Fenster als Blatt** (R-4.6, seit 3.30.0 RLB-99):‘ | ‚**Fenster als Blatt** (R-4.6):‘ |
| 165–166 | ‚**Ohne Akzente** wie Apple (seit‘ / ‚3.27.0): ‚Zurich‘ findet‘ | ‚**Ohne Akzente** wie Apple: ‚Zurich‘ findet‘ |
| 167 | ‚**Öffnen und beenden** (seit 3.41.0, AppDesign APD-91): ‚Suchen‘‘ | ‚**Öffnen und beenden**: ‚Suchen‘‘ |
| 183 | ‚unter der Überschrift ‚2 Verlauf‘ (seit 3.55.0, RLB-123): ‚Weiterfahrt‘ | ‚unter der Überschrift ‚2 Verlauf‘: ‚Weiterfahrt‘ |
| 189 | ‚**Gegangene Kilometer** (seit 3.41.0, RLB-110; nur mit sichtbarer Spalte,‘ | ‚**Gegangene Kilometer** (nur mit sichtbarer Spalte,‘ |
| 190 | ‚mit ‚km‘ rechts daneben, seit 3.42.0 (RLB-111) mit einer‘ | ‚mit ‚km‘ rechts daneben, mit einer‘ |
| 200 | ‚(nicht unterstrichen). Darunter (seit 3.41.0, RLB-109)‘ | ‚(nicht unterstrichen). Darunter‘ |
| 202 | ‚eingetragen ist); seit 3.42.0 (RLB-111) nur mit‘ | ‚eingetragen ist); nur mit‘ |
| 232 | ‚Preis (seit 3.41.0, ‚1.240,00 €‘, ohne Preis leer; seit 3.42.0 nur mit ‚Preis der Quartiere erfassen‘)‘ | ‚Preis (‚1.240,00 €‘, ohne Preis leer; nur mit ‚Preis der Quartiere erfassen‘)‘ |
| 235 | ‚‚Gegangene Kilometer‘ (seit 3.42.0, RLB-111: Summe mit einer‘ | ‚‚Gegangene Kilometer‘ (Summe mit einer‘ |
| 236 | ‚5 geschützte Leerzeichen davor, seit 3.42.1 (RLB-112)‘ | ‚5 geschützte Leerzeichen davor,‘ |
| 239 | ‚darunter seit 3.56.0 (RLB-121) ‚Teuerste Quartiere‘‘ | ‚darunter ‚Teuerste Quartiere‘‘ |

Z. 232 zählt zweimal (18 Stellen in 17 Zeilen). Z. 236 geht danach unverändert weiter mit ‚1 nach ‚Ø‘; […]‘.

---

## Backlogs

### APD-135/W-24 und APD-135/L-18 · AppDesign-`BACKLOG.md`, Abschnitt 2 (Z. 25–51) und neuer Abschnitt 3

**Alt:** unter ‚## 2. Weitere Themen (in Klärung)‘ stehen APD-135, APD-136, APD-62 (offen), APD-134, die 18 Zeilen mit Status ‚später‘
(Z. 33–49: APD-44, APD-46 bis APD-53, APD-55 bis APD-60, APD-32, APD-1; Z. 51: APD-80) und APD-70 (offen, Z. 50).

**Neu:** unter ‚## 2.‘ bleiben APD-135, APD-136, APD-134, APD-70 (Text unverändert). Darunter neu:
```
## 3. Später

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| APD-62 | 3 | **Großer Titel rastet ein (APD-38/T-1, Rest von Paket B aus APD-38 ‚Antippen, Bewegung, Rollen‘, Nutzer 22.10.2026):** zurückgestellt (Nutzer 06.11.2026, Sitzung 0083) – das Reiselogbuch nutzt keinen großen Titel (`.ltitle`, 15.17), ohne ihn keine Wirkung und nicht prüfbar; neu bewerten, sobald eine App ihn nutzt. Die übrigen Teile sind gebaut (APD-38/T-43 in 4.49.0, APD-38/T-16 und APD-38/T-37 in 4.53.0 – siehe Erledigt), APD-38/T-33 und APD-38/T-34 stehen in APD-105 | später |
[die 18 Zeilen ‚später‘ aus Z. 33–49 und 51 in derselben Reihenfolge, Text unverändert außer APD-46, APD-55, APD-56, APD-58, APD-59 unten]
```

**APD-62 – Alt** (Z. 31, 2.361 Zeichen, Anfang und Schluss):
```
| APD-62 | 3 | **Paket B aus APD-38 – ‚Antippen, Bewegung, Rollen‘ (Nutzer 22.10.2026):** Fenster/Menüs/Sprechblasen mit Bewegung (APD-38/T-16), […] – **Teile APD-38/T-16 und APD-38/T-37 gebaut in 4.53.0** (R-4.13, R-3.9, Usertest P-97); offen bleibt nur APD-38/T-1 (zurückgestellt) | offen |
```
Die gestrichene Vorgeschichte steht in ‚Erledigt‘ (APD-62, Z. 91 und Z. 108).

**APD-46 (Z. 34) – Alt:**
```
Warum später: Erst bei vielen Einträgen sinnvoll (z. B. Reiselogbücher nach Jahr); mit APD-37 zusammen entscheiden. | später |
```
**Neu:**
```
Warum später: Erst bei vielen Einträgen sinnvoll; für die Quartierliste haftet der Tabellenkopf schon (R-6.7, Reiselogbuch RLB-116) – als allgemeiner Baustein neu bewerten, sobald eine zweite Liste ihn braucht. | später |
```

**APD-55 (Z. 42) – Alt** (Schluss, aus APD-135/W-34):
```
bis dahin gilt ‚deckende Leiste‘ (Designrichtlinie 1, ‚Glas-Leiste verworfen‘) – die Abweichung von iOS 26 in ‚Bewusste Abweichungen‘ (16) nachtragen | später |
```
**Neu:**
```
bis dahin gilt ‚deckende Leiste‘ (Designrichtlinie 1, bewusste Abweichung in 16) | später |
```

**APD-56 (Z. 43) – Alt:**
```
heute formatiert das Reiselogbuch Beträge selbst (index.html:784-793); als Baustein in ui.js für alle Apps (Beträge, Telefon, Uhrzeit, IBAN) | später |
```
**Neu:**
```
heute formatiert das Reiselogbuch Beträge selbst (`bindMoney` in `index.html`); als Baustein in ui.js für alle Apps (Beträge, Telefon, Uhrzeit, IBAN) | später |
```

**APD-58 (Z. 45) – Alt:**
```
Dauer und Kurven aller Bewegungen an einer Stelle (Variablen), ‚Bewegung reduzieren‘ zentral – **mit Paket B (APD-37) bauen** | später |
```
**Neu:**
```
Dauer und Kurven aller Bewegungen an einer Stelle (Variablen), ‚Bewegung reduzieren‘ zentral – Paket B (APD-62) ist ohne gemeinsame Bewegungswerte gebaut; heute feste Werte in `ui.js` (`WACHS_KURVE`, `GLEIT_AUF_MS` …, R-1.12, R-4.13) | später |
```

**APD-59 (Z. 46) – Alt:**
```
gemessen in der Prüfung; Messen und Ändern je Bild bündeln – **mit Paket A**. Für die Navigation umgesetzt
```
**Neu:**
```
gemessen in der Prüfung; Messen und Ändern je Bild bündeln (Paket A, APD-40, ist erledigt – 4.51.0). Für die Navigation umgesetzt
```

### APD-135/W-26 · ReiseLogBuch-`BACKLOG.md`, Kopf Z. 5–17 (enthält W-8, Teil Z. 13)

**Alt:**
```
Hier stehen alle offenen Themen. Erledigte Punkte wandern mit Version und Datum nach unten
in „Erledigt“. Claude erinnert zu Beginn und am Ende jeder Sitzung an die offenen Punkte
(siehe `README - Zusammenarbeit allgemein.md`).

Priorität: **1 hoch** (als Nächstes) · **2 mittel** · **3 niedrig** – gearbeitet wird immer an
den Themen mit der höchsten Priorität zuerst.

Status: **bereit** (fertig geklärt, kommt in die nächste Version) · **offen** (noch zu klären) ·
**prüfen** (auf dem iPad testen) · **später** (Idee, noch nicht dran)

Weg eines Punktes: 2. in Klärung → 0. Nächste Version → 1. Prüfen → Erledigt. Gebaut wird
gesammelt – Claude fragt erst, wenn ein Thema fertig ist oder 2–3 zusammengehörige Punkte (höchstens 2 Themen) bereit
sind (oder auf Wunsch); siehe `README - Zusammenarbeit allgemein.md`, 0 Nr. 8.
```
**Neu:**
```
Offene Themen des Reiselogbuchs; allgemeine Themen stehen im Backlog von AppDesign. Aufbau und Regeln wie in
`README - Zusammenarbeit allgemein.md` (AppDesign), 0 Nr. 24 und 2.4.
```
(Z. 3 ‚Stand · Aktuelle Version‘ bleibt – nur sie ändert `veroeffentlichen.mjs`.)

---

## Kommentare und Meldungen in Prüfungen und Werkzeug (kein Regeltext)

### APD-135/W-1 · RLB `tests/README.md` Z. 8–9

**Alt:**
```
**Chromium und WebKit**, und bricht beim ersten roten Test ab (Rückgabewert 1, Fehlerzeilen des Tests werden gezeigt). `--alle` läuft
```
**Neu:**
```
**Chromium und WebKit**; ab dem dritten roten Lauf bricht es ab, jeder rote Lauf läuft am Ende einmal allein (Zusammenarbeit 0 Nr. 2;
Rückgabewert 1, Fehlerzeilen werden gezeigt). `--alle` läuft
```

### APD-135/W-1 · RLB `tests/alle.mjs` Z. 1–2

**Alt:**
```
// Alle Prüfungen des Reiselogbuchs (seit 3.12.0, APD-5): parallel, die schnellsten zuerst, in Chromium und WebKit, Abbruch
// beim ersten Fehler – über das Lauf-Werkzeug aus AppDesign (tests/lauf.mjs). AppDesign muss neben dem Repo liegen.
```
**Neu:**
```
// Alle Prüfungen des Reiselogbuchs (seit 3.12.0, APD-5): parallel, die schnellsten zuerst, in Chromium und WebKit; ab dem dritten
// roten Lauf werden die übrigen beendet, jeder rote Lauf läuft am Ende einmal allein (Zusammenarbeit 0 Nr. 2) – über das
// Lauf-Werkzeug aus AppDesign (tests/lauf.mjs). AppDesign muss neben dem Repo liegen.
```

### APD-135/W-1 · AppDesign `tests/lauf.mjs` Z. 2

**Alt:**
```
// (nach der zuletzt gemessenen Dauer), in Chromium und WebKit; beim ersten roten Test werden die übrigen beendet.
```
**Neu:**
```
// (nach der zuletzt gemessenen Dauer), in Chromium und WebKit; ab dem dritten roten Lauf werden die übrigen beendet, jeder rote
// Lauf läuft am Ende einmal allein (Zusammenarbeit 0 Nr. 2).
```

### APD-135/W-1 · AppDesign `tests/README.md` Z. 80–81

**Alt:**
```
Startet alle Prüfskripte parallel, die schnellsten zuerst (gemessene Dauer in `tests/out/dauer.json` der App), in Chromium und WebKit;
beim ersten roten Test werden die übrigen beendet und seine Fehlerzeilen gezeigt. Aufruf über `tests/alle.mjs` der App:
```
**Neu:**
```
Startet alle Prüfskripte parallel, die schnellsten zuerst (gemessene Dauer in `tests/out/dauer.json` der App), in Chromium und WebKit;
ab dem dritten roten Lauf werden die übrigen beendet, jeder rote Lauf läuft am Ende einmal allein (Zusammenarbeit 0 Nr. 2), die
Fehlerzeilen der roten Läufe werden gezeigt. Aufruf über `tests/alle.mjs` der App:
```

### APD-135/W-2 · AppDesign `werkzeug/messung.mjs` Z. 1–2

**Alt:**
```
// AppDesign 4.22.0 · Zeile ‚Zeit und Token‘ aus den Sitzungsdaten (APD-12, Testfall-Liste arbeit/APD-12 Testfall-Liste.md APD-12/M-1 bis APD-12/M-14;
// Zusammenarbeit allgemein §2). Claude ruft es am Ende jeder Antwort auf und übernimmt die Zeile unverändert – nie schätzen.
```
**Neu:**
```
// AppDesign 4.22.0 · Kontextstand aus den Sitzungsdaten (APD-12, Testfall-Liste arbeit/APD-12 Testfall-Liste.md APD-12/M-1 bis APD-12/M-14;
// Zusammenarbeit allgemein 2.2): Claude ruft es unmittelbar vor jedem Auswahlfenster auf und setzt ‚(Kontext N)‘ ans Ende jeder Frage
// im Fenster – nie schätzen. Die Zeitzeile (⏱ und Token) ist nur zur Kontrolle und steht nicht in der Antwort.
```

### APD-135/W-2 · AppDesign `tests/doku.mjs` und RLB `tests/doku-regeln.mjs`

| Datei, Zeile | Alt (Ausschnitt) | Neu (Ausschnitt) |
|---|---|---|
| `doku.mjs` 1 | ‚(Regel R-10.4, Zusammenarbeit allgemein 7)‘ | ‚(Regel R-10.4, Zusammenarbeit allgemein 2.3)‘ |
| `doku.mjs` 4 | ‚// Zusammenarbeit 7: Die Testfälle‘ | ‚// Zusammenarbeit 2.3: Die Testfälle‘ |
| `doku.mjs` 56 | ‚// Zusammenarbeit 7: neueste Version im CHANGELOG‘ | ‚// Zusammenarbeit 2.3: neueste Version im CHANGELOG‘ |
| `doku.mjs` 62, 64, 65, 67, 68 | ‚Zusammenarbeit 7 CHANGELOG:‘ (je einmal) | ‚Zusammenarbeit 2.3 CHANGELOG:‘ |
| `doku.mjs` 134 | ‚'Zusammenarbeit 2: Zeitzeile mit ‚Gesamt‘ – es gilt ‚⏱ mm:ss · Token vorige Antwort …‘'‘ | ‚'Zusammenarbeit 2.2: Zeitzeile mit ‚Gesamt‘ – die Zeitzeile steht nicht in der Antwort'‘ |
| `doku.mjs` 145 | ‚(Abschnitte 0–9, Abschnitt 0 Nr. 1–17)‘ | ‚(Abschnitte und Nummern, die es gibt)‘ |
| `doku.mjs` 161 | ‚Zusammenarbeit 7: ${app} CLAUDE.md nennt nicht‘ | ‚Zusammenarbeit 0 Nr. 2: ${app} CLAUDE.md nennt nicht‘ |
| `doku.mjs` 168, 169, 170 | ‚Zusammenarbeit 7: ${app} PROMPT.md‘ bzw. ‚Zusammenarbeit 7: Versionszeile‘ | ‚Designrichtlinie 11: ${app} PROMPT.md‘ bzw. ‚Designrichtlinie 11: Versionszeile‘ |
| RLB `doku-regeln.mjs` 1 | ‚(AppDesign/tests/doku.mjs, R-10.4, Zusammenarbeit allgemein 7)‘ | ‚(AppDesign/tests/doku.mjs, R-10.4, Zusammenarbeit allgemein 2.3)‘ |

Das Muster `/⏱ Gesamt/` in Z. 134 bleibt; nur der Meldungstext ändert sich. Keine Gegenprobe sucht diese Texte.

### APD-135/W-52 · AppDesign `tests/abgleich.mjs` Z. 1 und `tests/version.mjs` Z. 1

**Alt:**
```
// AppDesign 4.11.0 · Prüfung des Abgleichs zwischen iPad und iPhone (Regeln R-9.2 bis R-9.4, Designrichtlinie allgemein 15.4 und 17).
```
```
// AppDesign 4.14.1 · Prüfung der Versionskopplung App ↔ AppDesign (Regel R-10.3, Designrichtlinie allgemein 15.20).
```
**Neu:**
```
// AppDesign 4.11.0 · Prüfung des Abgleichs zwischen iPad und iPhone (Regeln R-9.2 bis R-9.4, Designrichtlinie allgemein 15.18 und 17).
```
```
// AppDesign 4.14.1 · Prüfung der Versionskopplung App ↔ AppDesign (Regel R-10.3, Designrichtlinie allgemein 11, 14).
```

---

## Folgen beim Bau (kein Regeltext)

**APD-135/W-31 – neue Dateien:** `README - Zusammenarbeit Versionsgeschichte.md`, `README - Designrichtlinie allgemein Versionsgeschichte.md`,
`CLAUDE Versionsgeschichte.md` (AppDesign) und `CLAUDE Versionsgeschichte.md` (ReiseLogBuch). Was die Prüfungen dazu lesen (Code gelesen, nicht ausgeführt):

| Prüfung | Stelle | Folge |
|---|---|---|
| `noHistory` in `checkCatalog` | `tests/doku.mjs` Z. 91, 93–98 | schneidet Designrichtlinie, Zusammenarbeit, RLB-Designrichtlinie und `PROMPT.md` an ‚\n## Versionsgeschichte‘. Die Überschrift bleibt in jedem Stummel → keine Änderung. Die alten Nummern R-01 bis R-52 aus der Designrichtlinien-Geschichte stehen dann in der neuen Datei, die `checkCatalog` nicht liest → keine Meldung. |
| `noHistory` in `checkCollab` | Z. 116, 121–123 | schneidet an ‚\n## Versionsgeschichte‘ bzw. ‚\n## Erledigt‘ – unverändert grün. Die verbotenen Sätze, die heute nur in der Zusammenarbeits-Geschichte stehen, sind dann in einer Datei, die keine Prüfung liest. |
| `checkCollab` (beide `CLAUDE.md`) | Z. 155–160 | verlangt ‚**Version X.Y.Z**‘ und ‚\n## Versionsgeschichte‘ – bleibt durch den Stummel erfüllt; die Überschrift darf **nicht** wegfallen. |
| `checkCollab` Verweise | Z. 145–153 | `sections` (‚## n. ‘) und `items` (Nummern in 0) ändern sich nicht – ‚## Zuordnung alt → neu‘ und ‚## Versionsgeschichte‘ tragen keine Nummer. |
| `checkKachel` | Z. 195 | schneidet die Zusammenarbeit an ‚\n## Versionsgeschichte‘ – unverändert. |
| `checkKasten` | Z. 221–248 | liest Kasten, 0 und die ‚Zuerst lesen‘-Zeilen – unberührt. |
| `checkSchema` | Z. 269–364 | liest alle lebenden Dateien (`git ls-files`, auch noch nicht hochgeladene) → die vier neuen Dateien werden automatisch mitgeprüft, ihr Inhalt ist schon heute geprüft (er stand in lebenden Dateien). `doku()` (Z. 297) zählt `README - … Versionsgeschichte.md` als Doku (strenge Präfix-Prüfung wie heute), `CLAUDE Versionsgeschichte.md` nicht (milder als heute) – keine Änderung nötig. Die Präfix-Tabelle (‚**Nummern und Präfixe**‘ bis ‚### ‘) bleibt an ihrer Stelle. |
| `checkDocs` | Z. 18–72 | liest nur die Zeile ‚**Version X.Y.Z**‘ (Designrichtlinien, Zusammenarbeit) – unberührt. |
| `checkFassungen`, `TEXTE` | `tests/version.mjs` Z. 21–66 | Designrichtlinie und Zusammenarbeit ändern sich → nach den Texten `node werkzeug/veroeffentlichen.mjs fassung` (Prüfsummen). Die neuen Dateien kommen ohne Änderung an `TEXTE` nicht in die Fassung – offene Frage 2. |
| `veroeffentlichen.mjs` | Z. 106, 117, 134, 143 | liest bzw. ersetzt nur Versionszeilen; Z. 143 erinnert an ‚Richtlinien-Versionsgeschichte schreiben‘ – die Zeilen gehen künftig in die neuen Dateien (Text der Erinnerung kann bleiben). |
| `pruefstufe.mjs` | Z. 115 | überspringt `*.md` – neue Dateien ändern die Stufe nicht; die Version läuft ohnehin **voll** (AppDesign und `tests/` ändern sich). |

**Fassung und Prüflauf:** W-1 (`tests/lauf.mjs`, `tests/README.md`), W-2 (`tests/doku.mjs`) und W-52 (`tests/abgleich.mjs`, `tests/version.mjs`)
ändern Dateien in AppDesign `tests/` → neue Fassung, `… fassung` nach dem letzten Text, Prüflauf **voll** (Plan Abschnitt 5). Vorher
`timeout 400 node tests/doku-regeln.mjs` und `node tests/alle.mjs --gegenprobe schema` im Reiselogbuch.

**Zeilenumbruch in Abschnitt 0 (Zusammenarbeit):** keine Folgezeile darf mit ‚Zahl Punkt Leerzeichen‘ beginnen (`checkKasten` liest jede
solche Zeile als neue Nummer). Diese Zeichenfolgen müssen wörtlich bleiben: ‚das Lagebild im Chat und als Datei, danach das‘ in **einer** Zeile
(Gegenprobe APD-123/K-1), ‚**diese ganze Datei** (einmal je Sitzung‘ (APD-84/C-4), ‚ Prüfung: Selbstkontrolle.‘ in 0 Nr. 28 (APD-84/C-5),
‚Nr. 28‘ im Kasten (APD-84/C-2), ‚2.4‘ im Kasten nur in Punkt 6, ‚entfällt (APD-123)‘ in 0 Nr. 26, ‚Abgeschaltet (APD-123‘ in 2.8,
‚im Chat, danach das Fenster‘ in 0 Nr. 29, ‚danach das Fenster zur Rückmeldung‘ in 0 Nr. 11. Die Wortlaute oben halten das ein.

**Versionen:** Zusammenarbeit, Designrichtlinie, beide `CLAUDE.md`, RLB-Designrichtlinie und `PROMPT.md` bekommen neue Versionen; deren Zeilen
in der Versionsgeschichte gehen schon in die neuen Dateien. Die Version der RLB-Designrichtlinie steigt mit `vorbereiten`; ihre Versionsgeschichte
bekommt nach dem neuen Satz in Designrichtlinie 11 nur dann eine Zeile, wenn sich an den Abweichungen etwas ändert (hier: W-51, Z. 17 – also ja).

**AppDesign-README:** die Tabelle ‚Datei / Ordner‘ (Z. 9–23) nennt die neuen Dateien noch nicht – beim Bau eine Zeile ergänzen (README ist
kein Regeltext; Vorschlag: ‚`… Versionsgeschichte.md` | ausgelagerte Versionsgeschichten (Designrichtlinie 11)‘).

**Danach:** `UEBERGABE.md` ohne Z. 25 und 27–32 (W-7); Usertests ab der nächsten Version nur noch im Backlog der App (W-28, bestehende Zeilen
bleiben); `--field-line` bleibt in `design.css`, bis APD-135/W-55 (Paket 6) es streicht; W-19 nach offener Frage 1 erst mit Paket 2.
