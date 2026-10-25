# Zuordnung alt → neu (Nummern und Präfixe)

**Stand 25.10.2026** · AppDesign 4.36.0 · APD-78 (Nummernschema, Nutzer 25.10.2026) · Schema: Zusammenarbeit allgemein 2.4
‚Nummern und Präfixe‘ · Testfall-Liste `arbeit/APD-78 Testfall-Liste.md`

Mit AppDesign 4.36.0 / Reiselogbuch 3.34.0 / ReiseLogBuch-Import 1.3.0 wurden alle lebenden Dateien der drei Repos rückwirkend
auf das neue Schema umgestellt (D3) – mit dem Skript `werkzeug/umbenennen.mjs` nach den Tabellen dieser Datei. **Unverändert
bleiben** die festen Fassungen `fassung/4.14.0/` … `fassung/4.35.0/` (R-10.3), die Git-Commits und ihre Texte, Messdateien und die
Sitzungsnamen (‚Reiselogbuch 0045‘). Für sie gilt diese Tabelle. Die Schema-Prüfung (`checkCollab`, Zusammenarbeit 2.4) prüft,
dass alte Nummern nur noch hier stehen und jede Zeile hier stimmt.

## 1. Regeln der Umstellung

| alt | neu | Erklärung |
|---|---|---|
| A-n (A-01 … A-81) | APD-n | Thema im Backlog von AppDesign, ohne führende Null (A-05 → APD-5) |
| T-n (T-01 … T-106) | RLB-n | Thema im Backlog des Reiselogbuchs (T-05 → RLB-5); T-1 … T-66 in AppDesign nach Abschnitt 4 |
| T-1 … T-66 (Framework-Themen) | APD-38/T-n | Liste der Themen in `arbeit/APD-38 Framework-Vergleich.html` (lokal) |
| E-n (Erledigt) | Thema, Usertest oder Version | Abschnitte 2 und 3 (K1) – die Erledigt-Tabelle hat keine eigene Nummer mehr |
| N-n (ReiseLogBuch-Import) | I-n | Regel einer Konvertierung (D9), auch in `arbeit/RLB-5 Anforderungen.md` |
| P-01 … P-12 | P-1 … P-12 | Usertest, ohne führende Null (K6) |
| Prüfpunkt P-n | Usertest P-n | Begriff (D6) |
| Prüfliste P-n, Punkt P-n/m | Testfälle P-n, Testfall (User) P-n/m | Begriffe (D6) |
| Fall-Liste, Fall | Testfall-Liste, Testfall (automatisch) | Begriffe (D7) |
| lokale Nummer außerhalb ihrer Datei (X-2) | APD-n/X-2 | Elternnummer davor (D7, U-5); das Skript wählt das nächste Thema im Zusammenhang, dessen Arbeitsdateien die Nummer enthalten |
| lokaler Buchstabe, der überall gilt (K-, G-, P-, I-) | neuer Buchstabe | Abschnitt 5 (K2) |
| führende Nullen (B-01, K-07) | B-1, K-7 | K6 |
| R-t.n, G-n, K-n (Import) | bleiben | D8 |
| Dateien `arbeit/A-n …`, `arbeit/T-n …` | `arbeit/APD-n …`, `arbeit/RLB-n …` | K4, mit ‚Fall-Liste‘ → ‚Testfall-Liste‘ im Namen; alte Links auf Muster (Pages) gehen ins Leere |

## 2. Erledigt AppDesign (E-n → Nr.)

| alt | neu | Zeile (Anfang) |
|---|---|---|
| E-91 | P-73 | Geprüft P-73 (Reiselogbuch 3.33.0): alles ok (Nutzer 25.10.2026) – kei … |
| E-90 | APD-43 | A-43 Teil 1 (Barrierefreiheit) mit Fokus-Rahmen: R-1.8 VoiceOver (Name … |
| E-89 | P-72 | Geprüft P-72 (Reiselogbuch 3.32.0): alles ok (Nutzer 24.10.2026) – Bac … |
| E-88 | APD-74 | A-74 gebaut (Ja 24.10.2026): R-9.1 / 15.19 – die Backup-Kachel steht n … |
| E-87 | P-71 | Geprüft P-71 (Reiselogbuch 3.31.0): alles ok (Nutzer 24.10.2026) – Pfe … |
| E-86 | APD-75, APD-76 | A-75 und A-76 gebaut (Ja 24.10.2026): R-5.4 / 15.12 – wo die Auswahl-K … |
| E-85 | P-70 | Geprüft P-70 (Reiselogbuch 3.30.2): alles ok (Nutzer 24.10.2026) – ein … |
| E-84 | APD-73 | A-73 gebaut (Korrektur, Ja 24.10.2026): R-4.6 – ein Zug, der zuerst na … |
| E-83 | P-69 | Geprüft P-69 (Reiselogbuch 3.30.1): /0–/2 ok, /3 nicht ok (Nutzer 24.1 … |
| E-82 | APD-71 | A-71 gebaut (Korrektur, Ja 24.10.2026): R-4.6 – ein Zug, der bei offen … |
| E-81 | P-68 | Geprüft P-68 (Reiselogbuch 3.30.0): alles ok bis auf /2.3 (Nutzer 23.1 … |
| E-80 | APD-61, APD-69 | A-61 Teil 2 und A-69 gebaut (Sammelversion, Ja 23.10.2026): neu R-4.6 … |
| E-79 | APD-68, APD-64, APD-65 | A-68, A-64, A-65 am Gerät bestätigt (P-67, Nutzer 23.10.2026): Seitenl … |
| E-78 | APD-68, APD-64, APD-65 | A-68, A-64, A-65 gebaut (Sammelversion, Ja 23.10.2026): Seitenleiste a … |
| E-77 | APD-67 | A-67 am Gerät bestätigt (P-66, Nutzer 23.10.2026): Zurückwischen über … |
| E-76 | Zusammenarbeit 2.19.0 | Automatische Übergabe (Nutzer 23.10.2026): 0 Nr. 13 – bei ‚⚠ Übergabe … |
| E-75 | APD-67 | A-67 Korrektur: ist die Wischgeste entschieden, verhindert ui.js `touc … |
| E-74 | APD-67, APD-66 | A-67 Schritt 1 und A-66: Messmodus zeichnet Berührungen (Zeiger, touch … |
| E-73 | P-64 | Geprüft P-64 (Reiselogbuch 3.28.0): alles ok bis auf /5 (Nutzer 22.10. … |
| E-72 | APD-37, APD-61 | A-37 B+C und A-61 Teil 1 ‚Überall‘ gebaut (Fall-Listen `arbeit/A-37 Fa … |
| E-71 | P-63 | Geprüft P-63 (Reiselogbuch 3.27.0): alles ok (Nutzer 22.10.2026) – A-6 … |
| E-70 | APD-63 | A-63 Paket C gebaut (Fall-Liste `arbeit/A-63 Fall-Liste.md`, Weg b, al … |
| E-69 | APD-41, APD-42 | A-41 und A-42: Zusammenarbeit 2.18.0 (Übergabe ab etwa 300.000 Token, … |
| E-68 | P-62 | Geprüft P-62 (Reiselogbuch 3.26.2): alles ok (Nutzer 21.10.2026) – A-3 … |
| E-67 | APD-39 | A-39 Konsolidierung aller Regeln: Zusammenarbeit 2.17.0 (Abschnitt 0 = … |
| E-66 | P-61 | Geprüft P-61: alles ok (Nutzer 21.10.2026, Messungen iPhone hoch, iPho … |
| E-65 | APD-36 | A-36 gebaut: Tastatur ohne Springen (V3 aus Muster 9) in `ui.js` – neu … |
| E-64 | APD-31 | A-31 gebaut: Messung abspielen – `tests/abspielen.mjs` (`lies`, `ansic … |
| E-63 | APD-35 | A-35 gebaut: R-4.5 ergänzt – ein Feld mit Fokus steht immer ganz über … |
| E-62 | APD-26 | A-26 entfällt (Nutzer 20.10.2026): C2 am iPad ok, aber nicht vollständ … |
| E-61 | APD-34 | A-34 entschieden: `--vv-top` bleibt – Messung iPhone quer: `offsetTop` … |
| E-60 | P-59 | Geprüft P-59: alles ok – A-33 abgeschlossen (Kapsel am iPhone quer mit … |
| E-59 | APD-33 | A-33 gebaut (Weg A): die Kapsel ‚Nach oben / Ans Ende‘ überdeckt nie K … |
| E-58 | P-58 | Geprüft P-58: /0, /1, /3–/6 ok – Zittern am Gerät weg, A-24 und A-28 a … |
| E-57 | APD-28, APD-29 | A-28 Umbau B (B1) und A-29 gebaut: Rahmen mit festen Zeilen und Rollbe … |
| E-56 | P-57 | Geprüft P-57: alles ok – A-27 abgeschlossen; Auswertung `arbeit/A-27 A … |
| E-55 | APD-27 | A-27 gebaut: Messmodus als Baustein (`messungMenuItems`), Regel R-1.6, … |
| E-54 | P-56 | Geprüft P-56: /0, /3, /4 ok – A-25 abgeschlossen (Markierung als Kreis … |
| E-53 | APD-24, APD-25 | A-24 und A-25 gebaut: Ablauf als feste Prüfung nachgebaut (rot gegen 4 … |
| E-52 | P-55 | Geprüft: P-55 alles in Ordnung (Lupe am Ende, zwei Wörter, „…“, zentra … |
| E-51 | APD-21, APD-22 | A-21 und A-22 gebaut: Suche mit mehreren Wörtern (alle müssen vorkomme … |
| E-50 | P-54 | Geprüft: P-54 alles in Ordnung (Hervorhebung 2 s + 1 s, iPad und iPhon … |
| E-49 | APD-23 | A-23 gebaut: Hervorhebung nach dem Fenster 2 s voll blau, 1 s ausblend … |
| E-48 | P-53 | Geprüft: P-53 alles in Ordnung (Liste steht still nach dem Fenster ‚Ta … |
| E-47 | APD 4.23.2 | Korrektur R-7.3 gebaut (P-52/2–4): oberste Zeile nach dem Schließen 1, … |
| E-46 | P-52 | Geprüft: P-52/1 in Ordnung; P-52/2–4 nicht ok – nach dem Öffnen (erste … |
| E-45 | APD 4.23.1 | Korrektur R-7.3 gebaut (P-51/5): beim Öffnen wird die oberste Zeile sa … |
| E-44 | P-51 | Geprüft: P-51/0–4 in Ordnung; P-51/5 nicht ok – die Liste rückt nach d … |
| E-43 | APD-19 | A-19 gebaut: Suche in der zentralen Liste (R-2.3 erweitert, 15.4, `che … |
| E-42 | APD-18 | A-18 verworfen (Nutzer, 17.10.2026): Tastatur im Fenster ‚Tag‘ – das M … |
| E-41 | P-50 | Geprüft: P-50 in Ordnung (Zeile Zeit und Token mit Kontext); A-20 dami … |
| E-40 | APD-20 | A-20 gebaut: Kontext in der Zeile Zeit und Token, ab 300.000 bzw. nach … |
| E-39 | P-49 | Geprüft: P-49 alles in Ordnung (Reiselogbuch 3.20.1 mit AppDesign 4.21 … |
| E-38 | APD-17 | Korrektur A-17: Drehen am Ende der Seite – Abstand zum Ende statt nich … |
| E-37 | P-48 | Geprüft: P-48 – A-16 in Ordnung (A-16 abgeschlossen); A-17 Seitenleist … |
| E-36 | APD-16, APD-17 | A-16 Position beim Öffnen (R-7.4, `openAt`) und A-17 R-8.1 bei jeder Ä … |
| E-35 | P-47 | Geprüft: P-47 alles in Ordnung (Reiselogbuch 3.19.0 mit AppDesign 4.20 … |
| E-34 | APD-15 | A-15 Kapsel ‚Nach oben / Ans Ende‘ auch im iPhone-Aufbau (Inhaltsansic … |
| E-33 | P-45 | Entscheidung (aus P-45): iPhone ohne Kapsel ‚Nach oben / Ans Ende‘ – n … |
| E-32 | P-45 | Geprüft: P-45 alles in Ordnung (Reiselogbuch 3.17.0 mit AppDesign 4.19 … |
| E-31 | APD-14 | A-14 Eingabetaste in Eingabefeldern (R-5.5): einzeilige Felder ‚Fertig … |
| E-30 | P-44 | Geprüft: P-44 alles in Ordnung (Reiselogbuch 3.16.0 mit AppDesign 4.18 … |
| E-29 | APD-13 | A-13 Liste steht still (R-7.3): Scrollstand beim Öffnen eines Fensters … |
| E-28 | P-43 | Geprüft: P-43 alles in Ordnung (Zeile aus `messung.mjs`); A-12 damit a … |
| E-27 | APD-12 | A-12 Werkzeug `werkzeug/messung.mjs` für die Zeile Zeit und Token (Fal … |
| E-26 | RLB-5 | Geprüft: T-05 erste Konvertierung (Import-Datei mit ‚Abgleichen‘ gelad … |
| E-25 | P-42 | Geprüft: P-42 alles in Ordnung (AppDesign 4.16.1 mit Reiselogbuch 3.15 … |
| E-24 | APD-11 | A-11 Lauf-Werkzeug: Browser nacheinander (erst Chromium, dann WebKit) … |
| E-23 | APD-10 | A-10 Lauf-Werkzeug mit höchstens so vielen Browsern wie Kernen (4 stat … |
| E-22 | P-41 | Geprüft: P-41 alles in Ordnung (AppDesign 4.16.0 mit Reiselogbuch 3.15 … |
| E-21 | APD-9 | A-09 neue Regel R-7.2 (aus Reiselogbuch T-84): Start im iPhone-Aufbau … |
| E-20 | APD-7 | A-07 Schneller arbeiten: gezielt lesen, ein voller Prüflauf je Version … |
| E-19 | P-40 | Geprüft: P-40 alles in Ordnung (AppDesign 4.15.1 mit Reiselogbuch 3.14 … |
| E-18 | APD 4.15.1 | K-07 Korrektur zu P-39/1 und /2: App fragt alle 10 s den Service Worke … |
| E-17 | P-39 | Geprüft: P-39 ok bis auf /1 und /2 (iPad ohne Meldung beim Wechsel bei … |
| E-16 | APD-6 | A-06 Offline-Hinweis (Variante c, R-1.5 ergänzt): graue Zeile unter de … |
| E-15 | P-38 | Geprüft: P-38 alles in Ordnung (AppDesign 4.14.2 mit Reiselogbuch 3.13 … |
| E-14 | APD 4.14.2 | Korrektur zu P-37: Schrittkopf als Gruppe (R-5.1), Offline-Start mit F … |
| E-13 | APD 4.14.1 | Korrektur: Fassung enthält Designrichtlinie und Zusammenarbeit statt G … |
| E-12 | APD-5 | A-05 Version B: feste Fassung `fassung/X.Y.Z/` (design.css, ui.js, tes … |
| E-11 | P-35 | Geprüft: P-35 alles in Ordnung (AppDesign 4.13.0 mit Reiselogbuch 3.12 … |
| E-10 | APD-5 | A-05 Version A: `pruefe.mjs` (Fehler mit Rückgabewert, Grundregeln nac … |
| E-09 | P-34 | Geprüft: P-34 alles in Ordnung (AppDesign 4.12.2 mit Reiselogbuch 3.11 … |
| E-08 | APD-2 | A-02 Schritte 3 und 4: Allgemeines aus der App nach AppDesign (F-4, W- … |
| E-07 | P-33 | Geprüft: P-33 alles in Ordnung (AppDesign 4.12.1 mit Reiselogbuch 3.11 … |
| E-06 | APD 4.12.1 | Korrekturen aus P-32: Seitenleiste folgt dem sichtbaren Bereich (R-2.1 … |
| E-05 | APD-2 | A-02a Regelkatalog neu: 34 Regeln in 10 Themen (R-<Thema>.<Nr>), je Re … |
| E-04 | RLB-2 | T-02 iPhone-Ansicht geprüft (P-31 alles in Ordnung, Reiselogbuch 3.11. … |
| E-03 | APD-4 | A-04 Arbeitsprozess 2.0 festgeschrieben (Zusammenarbeit allgemein 2.0. … |
| E-02 | APD-3 | A-03 Sprache (jede Meldung deutsch), R-37 überall geprüft, R-51 oberst … |
| E-01 | APD 4.0.0 | Design-Repo angelegt (S-01) und Komponenten einmal programmiert (S-02) … |

## 3. Erledigt Reiselogbuch (E-n → Nr.)

| alt | neu | Zeile (Anfang) |
|---|---|---|
| E-135 | P-73 | Geprüft P-73 (3.33.0): alles ok – kein blauer Rahmen in Textfeldern, S … |
| E-134 | RLB-100 | T-100 (AppDesign A-43 Teil 1): kein blauer Rahmen mehr in Textfeldern, … |
| E-133 | P-72 | Geprüft P-72 (3.32.0): alles ok – Kachel nach dem Backup weg, Mehr-Men … |
| E-132 | RLB-105 | T-105 (AppDesign A-74): die gelbe Backup-Kachel steht nur noch, solang … |
| E-131 | P-71 | Geprüft P-71 (3.31.0): alles ok – Pfeile an der Reisemittel-Kapsel am … |
| E-130 | RLB-106 | T-106 (AppDesign A-75) und AppDesign A-76: in der Auswahl-Kapsel (Reis … |
| E-129 | P-70 | Geprüft P-70 (3.30.2): alles ok – ein Zug neben dem Feld erst nach obe … |
| E-128 | RLB-104 | T-104 (AppDesign A-73, Korrektur): auf dem iPhone schließt ein Zug neb … |
| E-127 | P-69 | Geprüft P-69 (3.30.1): /0–/2 ok – ein Zug auf einem Feld bei offener T … |
| E-126 | RLB-102 | T-102 (AppDesign A-71, Korrektur): auf dem iPhone zieht ein Zug auf ei … |
| E-125 | P-68 | Geprüft P-68 (3.30.0): alles ok bis auf /2.3 – Blatt öffnen und wegzie … |
| E-124 | RLB-98, RLB-99 | T-98 und T-99 (AppDesign A-69, A-61 Teil 2): Startposition beim Öffnen … |
| E-123 | P-67 | Geprüft P-67 (3.29.0): alles ok – Seitenleiste am iPad quer hereinwisc … |
| E-122 | APD-68, APD-64, APD-65 | AppDesign A-68, A-64, A-65: Seitenleiste am iPad quer per Wischen (Var … |
| E-121 | P-66 | Geprüft P-66 (3.28.2): alles ok – Zurückwischen über und neben den Tag … |
| E-120 | APD-67 | AppDesign A-67 Korrektur: Zurückwischen über und neben den Tageskästen … |
| E-119 | P-65 | Geprüft P-65 (3.28.1): /2 nicht ok – Messung ausgewertet (Safari brich … |
| E-118 | P-64 | Geprüft P-64 (3.28.0): alles ok bis auf /5 – weiter in P-65 … |
| E-117 | APD-67, APD-66 | AppDesign A-67 Schritt 1 und A-66: Fassung 4.30.1 – der Messmodus zeic … |
| E-116 | APD-37, APD-61 | AppDesign A-37 B+C und A-61 Teil 1: Marken `data-marke` an Tagen (‚Tag … |
| E-115 | P-63 | Geprüft P-63: alles ok (Nutzer 22.10.2026) – Version 3.27.0 mit AppDes … |
| E-114 | APD-63 | AppDesign A-63 Paket C: Suche ohne Akzente, ⓧ in Titel, Teilnehmer, Or … |
| E-113 | P-62 | Geprüft P-62: alles ok (Nutzer 21.10.2026) – Version 3.26.2 mit AppDes … |
| E-112 | APD-39 | AppDesign A-39 Konsolidierung: Designrichtlinie Reiselogbuch nur noch … |
| E-111 | P-61 | Geprüft P-61: alles ok (Nutzer 21.10.2026, mit Messungen) – T-97 abges … |
| E-110 | RLB-97 | T-97 korrigiert (AppDesign A-36): Tastatur ohne Springen – Fassung 4.2 … |
| E-109 | RLB-95 | T-95 abgeschlossen: (3) Datumsfeld ‚Tag antippen übernimmt und schließ … |
| E-108 | RLB-97 | T-97 gebaut (AppDesign A-35, A-31): Gesamtausgaben steht bei offener T … |
| E-107 | P-59 | Geprüft P-59: alles ok – T-96 abgeschlossen (Kapsel am iPhone quer mit … |
| E-106 | RLB-96 | T-96 gebaut (AppDesign A-33, Weg A): die Kapsel ‚Nach oben / Ans Ende‘ … |
| E-105 | P-58 | Geprüft P-58: /0, /1, /3–/6 ok – Zittern beim Suchen am iPhone weg, T- … |
| E-104 | RLB-95 | Umbau B gebaut (T-95 (1), AppDesign A-28 B1 und A-29): nur der Inhalt … |
| E-103 | P-57 | Geprüft P-57: alles ok (Messungen iPhone hoch und quer, iPad); Ursache … |
| E-102 | RLB-95 | Messmodus gebaut (T-95 (1), AppDesign A-27): ‚Messung starten‘ / ‚Mess … |
| E-101 | P-56 | Geprüft P-56: /0, /3, /4 ok (Markierung als Kreis, iPad unverändert, e … |
| E-100 | RLB-95 | T-95 (1) und (2) gebaut: Suchfeld bleibt beim Tippen (Kopf- und Suchze … |
| E-99 | P-55 | Geprüft: P-55 alles in Ordnung; T-93 damit abgeschlossen … |
| E-98 | RLB-93 | T-93 gebaut: Suche mit mehreren Wörtern (alle irgendwo im Reiselogbuch … |
| E-97 | P-54 | Geprüft: P-54 alles in Ordnung (Hervorhebung, ‚Tour …‘, ‚Sonstiges …‘, … |
| E-96 | RLB-94 | T-94 gebaut: Verlauf mit ‚Tour …‘ und ‚Sonstiges …‘ (leere erste Zeile … |
| E-95 | P-53 | Geprüft: P-53 alles in Ordnung (Liste steht still: tiefer erfassen, vo … |
| E-94 | RLB 3.21.2 | Korrektur R-7.3 gebaut (P-52/2–4): oben bleibt derselbe Tag – auch nac … |
| E-93 | P-52 | Geprüft: P-52/0–1 in Ordnung; P-52/2–4 nicht ok (Liste rückt nach dem … |
| E-92 | RLB 3.21.1 | Korrektur R-7.3 gebaut (P-51/5): oberste Zeile beim Öffnen des Fenster … |
| E-91 | P-51 | Geprüft: P-51/0–4 in Ordnung; P-51/5 nicht ok (Liste rückt nach dem Fe … |
| E-90 | RLB-92 | T-92 gebaut: Suche über alle Reiselogbücher in Startliste/Seitenleiste … |
| E-89 | RLB-91 | T-91 verworfen (Nutzer, 17.10.2026): Tastatur im Fenster ‚Tag‘ – Mitfa … |
| E-88 | P-49 | Geprüft: P-49 alles in Ordnung (Drehen am Ende der Seite); T-89 und T- … |
| E-87 | RLB 3.20.1 | Korrektur 3.20.1: Drehen am Ende der Seite – ganz unten bleibt ganz un … |
| E-86 | P-48 | Geprüft: P-48/0–2 in Ordnung (Öffnen iPad und iPhone, Seitenleiste ein … |
| E-85 | RLB-89, RLB-90 | T-89 und T-90 gebaut: beim Öffnen ganz oben bzw. erster offener Tag di … |
| E-84 | P-47 | Geprüft: P-47 alles in Ordnung (Kapsel ‚Nach oben / Ans Ende‘ auf dem … |
| E-83 | APD-15 | AppDesign A-15 übernommen: Kapsel ‚Nach oben / Ans Ende‘ auch auf dem … |
| E-82 | P-46 | Geprüft: P-46 alles in Ordnung (Link nur über den Namen); T-86 damit a … |
| E-81 | RLB-86 | T-86 gebaut: Maps-Link nur über den Namen – endet an ‚ – ‘, Komma, Dop … |
| E-80 | P-45 | Geprüft: P-45 alles in Ordnung (Eingabetaste ‚Fertig‘, iPhone ✓ über d … |
| E-79 | RLB-87, RLB-88 | T-87 und T-88 gebaut: Eingabetaste ‚Fertig‘ schließt die Tastatur in e … |
| E-78 | RLB-85 | T-85 geschlossen ohne Bau: Emoji-Taste statt Weltkugel kann eine Web-A … |
| E-77 | P-44 | Geprüft: P-44 alles in Ordnung (Tabelle steht still beim Erfassen, iPa … |
| E-76 | APD-13 | A-13: Tabelle bzw. Tageskästen stehen still, solange das Fenster ‚Tag‘ … |
| E-75 | RLB-5 | T-05 Alte Reiselogbücher importieren: Werkzeug im privaten Repo `Reise … |
| E-74 | P-42 | Geprüft: P-42 alles in Ordnung (Version, Offline-Start nach dem Update … |
| E-73 | APD-10 | Reiselogbuch 3.15.1: auf AppDesign-Fassung 4.16.1 gehoben (A-10, Prüfl … |
| E-72 | P-41 | Geprüft: P-41 alles in Ordnung (Version, iPhone hoch/quer startet in d … |
| E-71 | RLB-84 | Reiselogbuch 3.15.0: T-84 – Start im iPhone-Aufbau in der Startliste o … |
| E-70 | P-40 | Geprüft: P-40 alles in Ordnung (Version, iPad offline/online bei offen … |
| E-69 | RLB 3.14.1 | Reiselogbuch 3.14.1: Korrektur zu P-39/1 und /2 – iPad erkennt den Wec … |
| E-68 | P-39 | Geprüft: P-39 ok bis auf /1 und /2 (iPad: keine Meldung beim Wechsel b … |
| E-67 | APD-6 | Reiselogbuch 3.14.0: Offline-Hinweis (A-06 Variante c, R-1.5) – graue … |
| E-66 | P-38 | Geprüft: P-38 alles in Ordnung (Version, Quartier-Kopf iPhone quer/hoc … |
| E-65 | RLB 3.13.2 | Reiselogbuch 3.13.2: Quartier-Kopf als Gruppe (iPhone quer in einer Ze … |
| E-64 | RLB 3.13.1 | Reiselogbuch 3.13.1: README-Links auf den Richtlinien-Text in `fassung … |
| E-63 | APD-5 | Reiselogbuch 3.13.0: A-05 Version B – lädt die feste AppDesign-Fassung … |
| E-62 | P-35 | Geprüft: P-35 alles in Ordnung (Version, kurzer Quartiername neben dem … |
| E-61 | APD-5 | Reiselogbuch 3.12.0: A-05 Version A – alle Prüfskripte melden Fehler, … |
| E-60 | P-34 | Geprüft: P-34 alles in Ordnung … |
| E-59 | APD-2 | Reiselogbuch 3.11.7: A-02 Schritte 3 und 4 – Richtlinie mit Verweisen, … |
| E-58 | P-33 | Geprüft: P-33 alles in Ordnung … |
| E-57 | RLB 3.11.6 | Reiselogbuch 3.11.6: Korrekturen aus P-32 (Reisemittel mit Namen im Ab … |
| E-56 | P-32 | Geprüft: P-32 – 0 und 3 ok; 1 (Reisemittel klein im Bericht), 2 (Seite … |
| E-55 | RLB-83 | Reiselogbuch 3.11.5: T-83 Feldname ‚Reisemittel‘ im Abgleichbericht (R … |
| E-54 | P-31 | Geprüft: P-31 alles in Ordnung … |
| E-53 | RLB-82 | Reiselogbuch 3.11.4: T-82 Zebra je Tabellenzeile – zusammengefasste er … |
| E-52 | RLB-81 | Reiselogbuch 3.11.3: T-81 Abgleichbericht-Tabelle = Mustertabelle der … |
| E-51 | P-28, P-29 | Geprüft: P-28 ok; P-29 – 0, 1, 2, 4 ok; 3 nicht ok (Tabelle wich von d … |
| E-50 | RLB-78, RLB-79, RLB-80 | Reiselogbuch 3.11.2: T-78 oberster Tag bleibt beim Drehen (R-51), T-79 … |
| E-49 | P-27 | Geprüft: P-27 – 1 bis 7 und 9 ok; 8 nicht ok (Zellen ragen über, iPhon … |
| E-48 | RLB-77 | Reiselogbuch 3.11.1: T-77 Vorbeugen gegen P-26/6, 7, 9 – README ‚Verwe … |
| E-47 | RLB-73, RLB-74, RLB-75, RLB-76 | Reiselogbuch 3.11.0: T-73 Versionskopplung mit AppDesign (R-48), T-74 … |
| E-46 | P-26 | Geprüft: P-26 – 2, 3, 5 ok; 1, 4, 6, 7, 9 nicht ok (auf dem Gerät lief … |
| E-45 | RLB-68, RLB-69, RLB-70, RLB-71, RLB-72 | Reiselogbuch 3.10.1: T-68 Seitenleiste beim Drehen (R-47), T-69 Kontex … |
| E-44 | P-24, P-25 | Geprüft: P-24 alles in Ordnung; P-25 – 4, 6, 14, 15, 16 → T-68 bis T-7 … |
| E-43 | RLB-63, RLB-64, RLB-65, RLB-66, RLB-67 | Reiselogbuch 3.10.0: T-63 Drehen (R-40), T-64 Abgleich je Feld, T-65 K … |
| E-42 | RLB-62 | Reiselogbuch 3.9.1: T-62 Abfrage und Fenster passen immer auf den Bild … |
| E-41 | RLB-3 | Reiselogbuch 3.9.0: T-03 Abgleich iPad ↔ iPhone über ein Backup, ‚geän … |
| E-40 | P-23 | Geprüft: P-23 Version 3.8.1 – 1–4 ok … |
| E-39 | RLB-60 | Reiselogbuch 3.8.1: T-60 Symbolleiste mit oder ohne Suchzeile bewegt s … |
| E-38 | P-22 | Geprüft: P-22 Version 3.8.0 – 1–4 ok (5 → T-60) … |
| E-37 | RLB-57, RLB-58, RLB-59 | Reiselogbuch 3.8.0: T-57 Smiley-Reihen und lange Wörter brechen um, T- … |
| E-36 | P-21 | Geprüft: P-21 Version 3.7.0 – 1, 4 ok; 2 → T-58; 3, 5 → T-57; iPhone-S … |
| E-35 | RLB-55, RLB-56 | Reiselogbuch 3.7.0: T-55 Startliste = Seitenleiste (R-36), T-56 lange … |
| E-34 | P-20 | Geprüft: P-20 Version 3.6.0 – 1, 4, 5 ok; 2 am iPhone ok, am iPad → T- … |
| E-33 | RLB-53, RLB-54 | Reiselogbuch 3.6.0: T-53 Kopfzeile und Backup-Kachel am iPad fest, T-5 … |
| E-32 | P-19 | Geprüft: P-19 Version 3.5.0 – 1, 2 ok; 3 am iPhone ok, am iPad → T-53 … |
| E-31 | RLB-51, RLB-52 | Reiselogbuch 3.5.0: T-51 Vorschau am iPad in Seitenbreite, T-52 Leiste … |
| E-30 | P-18 | Geprüft: P-18 Version 3.4.0 – 1–3, 5 ok; 4 → T-52 … |
| E-29 | RLB-46, RLB-47, RLB-48, RLB-49, RLB-50 | Reiselogbuch 3.4.0: T-46 Titel in der Leiste, T-47 Bezeichnungen auf d … |
| E-28 | P-17 | Geprüft: P-17 Version 3.3.0 – 1–3, 6, 8, 9 ok; 4, 5, 7 → T-48 bis T-50 … |
| E-27 | RLB-37, RLB-38, RLB-39, RLB-40, RLB-41, RLB-42, RLB-44, RLB-45 | Reiselogbuch 3.3.0: T-37 kein Zoom durch Doppeltippen, T-38 Bezeichnun … |
| E-26 | P-16 | Geprüft: P-16 Version 3.2.0 – 1, 3–5, 8, 11, 12 ok; 2, 6, 7, 9, 10 → T … |
| E-25 | RLB-25 bis RLB-36 | Reiselogbuch 3.2.0: T-25 bis T-36 (Verlauf, iPhone wie iPad, Titel in … |
| E-24 | P-15 | Geprüft: P-15 Version 3.1.0 – 1–3, 6, 8, 11 ok; Rest → T-32 bis T-36 … |
| E-23 | RLB-2, RLB-24 | Reiselogbuch 3.1.0: T-02 iPhone-Ansicht (AppDesign 4.1.0), T-24 Icons … |
| E-22 | P-14 | Auf dem iPad geprüft und ok: P-14 Reiselogbuch 3.0.0 mit AppDesign 4.0 … |
| E-21 | RLB-23 | Reiselogbuch 3.0.0: T-23 gemeinsame Bausteine aus dem Design-Repo AppD … |
| E-20 | P-13 | Auf dem iPad geprüft und ok: P-13 Version 2.4.0 (Menüs ohne Linien zwi … |
| E-19 | RLB-20, RLB-21 | Reiselogbuch 2.4.0: T-20 Menüs ohne Linien zwischen Punkten, T-21 Such … |
| E-18 | P-12 | Auf dem iPad geprüft: P-12 Version 2.3.0 ok bis auf 3 (Linien → T-20) … |
| E-17 | RLB-7, RLB-10, RLB-11, RLB-12, RLB-13, RLB-14, RLB-15, RLB-16, RLB-17, RLB-18 | Reiselogbuch 2.3.0 (Sammelversion HIG-Prüfung): T-07, T-10, T-11, T-12 … |
| E-16 | P-11 | Auf dem iPad geprüft und ok: P-11 Anführungszeichen ‚…‘, Teilen-Menü m … |
| E-15 | RLB-9, RLB-8 | Reiselogbuch 2.2.2: T-09 Anführungszeichen ‚…‘ in der App, T-08 Teilen … |
| E-14 | P-9, P-10 | Auf dem iPad geprüft und ok: P-09 Kontextmenü und Satz zum Speicher · … |
| E-13 | RLB 2.2.1 | Reiselogbuch 2.2.1: F-11 Gewähltes bleibt blau, solange es sichtbar is … |
| E-12 | RLB-1, RLB-4 | Reiselogbuch 2.2.0: T-01 Kontextmenü in der Seitenleiste, T-04 dauerha … |
| E-11 | P-8 | Auf dem iPad geprüft und ok: P-08 Tastatur offen – Kopfzeilen bleiben … |
| E-10 | RLB 2.1.5 | Reiselogbuch 2.1.5: F-10 Kopfzeilen bei sichtbarer Tastatur sichtbar … |
| E-09 | P-1, P-2, P-3, P-4, P-5, P-6, P-7 | Auf dem iPad geprüft und ok: P-01 Datumsfelder · P-02 Seitenleiste hoc … |
| E-08 | RLB 2.1.4 | Reiselogbuch 2.1.4: F-09 Markierung in Auswahl-Kapseln rund (Kreis/Kap … |
| E-07 | RLB 2.1.3 | Reiselogbuch 2.1.3: F-08 Markierung in Auswahl-Kapseln nicht mehr abge … |
| E-06 | RLB 2.1.2 | Reiselogbuch 2.1.2: F-06 Seitenleiste beim Start eingeblendet, F-07 Ab … |
| E-05 | RLB 2.1.1 | Reiselogbuch 2.1.1: F-01 PDF ohne Seitenleiste, F-02 Suche, F-03 Wette … |
| E-04 | RLB 2.1.0 | Reiselogbuch 2.1.0: B-01 bis B-12 (schwebende Seitenleiste, immer „All … |
| E-01 | Designrichtlinie allgemein 3.0.1 | Links zu den Apple Human Interface Guidelines je Abschnitt und Kompone … |
| E-02 | Zusammenarbeit allgemein 1.2.0 | Regel „Apple-like entwickeln, Apple-Lösungen recherchieren und empfehl … |
| E-03 | RLB 2.0.0 | Neues Bedienkonzept: Seitenleiste, Kopfzeile mit Kapsel, Menüs, Sprech … |

## 4. T-Treffer bis T-66 (K3)

Jede Stelle T-1 … T-66 ohne führende Null (Stand vor dem Umbau, Commit d4b7a39 bzw. 14733c3) – einzeln entschieden: **RLB** = Thema des Reiselogbuchs, **APD-38** = Framework-Thema aus APD-38 (zitiert APD-38/T-n), **APD-36** = Testfall (automatisch) der Testfall-Liste APD-36 (Tastatur, zitiert APD-36/T-n), **Hand** = von Hand umgeschrieben (Texte über das alte Schema).

| Repo | Datei | Zeile | Nummern | Entscheidung |
|---|---|---|---|---|
| AppDesign | BACKLOG.md | 15 | T-1, T-65 | APD-38 |
| AppDesign | BACKLOG.md | 28 | T-10, T-15, T-21, T-37, T-4, T-5, T-6, T-35, T-33, T-34, T-16, T-1, T-43, T-39, T-31, T-28, T-26, T-20, T-61, T-3, T-30, T-32, T-50, T-58, T-65, T-2, T-22, T-36, T-38, T-63, T-64 | APD-38 |
| AppDesign | BACKLOG.md | 29 | T-33, T-34, T-16, T-1, T-43, T-37 | APD-38 |
| AppDesign | BACKLOG.md | 30 | T-51, T-55, T-56, T-47, T-49, T-59, T-60, T-48 | APD-38 |
| AppDesign | BACKLOG.md | 31 | T-20, T-61, T-21, T-10 | APD-38 |
| AppDesign | BACKLOG.md | 32 | T-9 | APD-38 |
| AppDesign | BACKLOG.md | 33 | T-12 | APD-38 |
| AppDesign | BACKLOG.md | 34 | T-13 | APD-38 |
| AppDesign | BACKLOG.md | 35 | T-14 | APD-38 |
| AppDesign | BACKLOG.md | 36 | T-23 | APD-38 |
| AppDesign | BACKLOG.md | 37 | T-25 | APD-38 |
| AppDesign | BACKLOG.md | 38 | T-27 | APD-38 |
| AppDesign | BACKLOG.md | 39 | T-57 | APD-38 |
| AppDesign | BACKLOG.md | 40 | T-62 | APD-38 |
| AppDesign | BACKLOG.md | 41 | T-66 | APD-38 |
| AppDesign | BACKLOG.md | 42 | T-3 | APD-38 |
| AppDesign | BACKLOG.md | 43 | T-30 | APD-38 |
| AppDesign | BACKLOG.md | 44 | T-32 | APD-38 |
| AppDesign | BACKLOG.md | 45 | T-50 | APD-38 |
| AppDesign | BACKLOG.md | 46 | T-58 | APD-38 |
| AppDesign | BACKLOG.md | 47 | T-65 | APD-38 |
| AppDesign | BACKLOG.md | 73 | T-10 | APD-38 |
| AppDesign | CHANGELOG.md | 205 | T-10 | APD-38 |
| AppDesign | CHANGELOG.md | 286 | T-4 | APD-38 |
| AppDesign | CHANGELOG.md | 287 | T-5 | APD-38 |
| AppDesign | CHANGELOG.md | 288 | T-6, T-35 | APD-38 |
| AppDesign | UEBERGABE.md | 45 | T-66 | Hand |
| AppDesign | VERLAUF.md | 1344 | T-20, T-21 | RLB |
| AppDesign | VERLAUF.md | 1430 | T-24 | RLB |
| AppDesign | VERLAUF.md | 1475 | T-25, T-36 | RLB |
| AppDesign | VERLAUF.md | 1567 | T-59 | RLB |
| AppDesign | VERLAUF.md | 1899 | T-10 | APD-38 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 58 | T-1 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 59 | T-2 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 60 | T-3 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 61 | T-4, T-1, T-3 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 62 | T-5 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 63 | T-6 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 64 | T-7 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 65 | T-8 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 66 | T-9 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 67 | T-10 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 68 | T-11 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 69 | T-12 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 71 | T-1, T-8 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 88 | T-8 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 94 | T-8, T-3 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 461 | T-1, T-2 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 462 | T-3 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 465 | T-5 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 469 | T-6 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 470 | T-6 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 471 | T-7 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 473 | T-9 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 474 | T-11 | APD-36 |
| AppDesign | arbeit/A-36 Fall-Liste.md | 497 | T-8 | APD-36 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 82 | T-1 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 91 | T-2 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 100 | T-3 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 109 | T-4 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 118 | T-5 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 127 | T-6 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 136 | T-7 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 145 | T-8 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 154 | T-9 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 164 | T-10 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 173 | T-11 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 182 | T-12 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 191 | T-13 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 200 | T-14 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 210 | T-15 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 219 | T-16 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 228 | T-17 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 238 | T-18 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 247 | T-19 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 257 | T-20 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 266 | T-21 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 275 | T-22 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 284 | T-23 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 294 | T-24 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 303 | T-25 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 312 | T-26 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 321 | T-27 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 330 | T-28 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 339 | T-29 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 348 | T-30 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 358 | T-31 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 367 | T-32 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 377 | T-33 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 386 | T-34 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 395 | T-35 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 404 | T-36 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 413 | T-37 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 422 | T-38 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 432 | T-39 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 441 | T-40 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 450 | T-41 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 459 | T-42 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 469 | T-43 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 478 | T-44 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 488 | T-45 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 497 | T-46 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 506 | T-47 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 516 | T-48 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 526 | T-49 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 535 | T-50 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 545 | T-51 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 554 | T-52 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 563 | T-53 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 572 | T-54 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 581 | T-55 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 590 | T-56 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 600 | T-57 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 609 | T-58 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 619 | T-59 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 628 | T-60 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 638 | T-61 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 647 | T-62 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 656 | T-63 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 665 | T-64 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 674 | T-65 | APD-38 |
| AppDesign | arbeit/A-38 Framework-Vergleich.html | 683 | T-66 | APD-38 |
| AppDesign | arbeit/A-38 Neubewertung T-3.md | 1 | T-3 | APD-38 |
| AppDesign | arbeit/A-38 Neubewertung T-3.md | 7 | T-3 | APD-38 |
| AppDesign | arbeit/A-43 Klärung.md | 3 | T-47, T-60 | APD-38 |
| AppDesign | arbeit/A-43 Klärung.md | 11 | T-51, T-55 | APD-38 |
| AppDesign | arbeit/A-43 Klärung.md | 12 | T-56 | APD-38 |
| AppDesign | arbeit/A-43 Klärung.md | 13 | T-47, T-49, T-59, T-60 | APD-38 |
| AppDesign | arbeit/A-43 Klärung.md | 14 | T-48 | APD-38 |
| AppDesign | arbeit/A-43 Klärung.md | 38 | T-59 | APD-38 |
| AppDesign | arbeit/A-43 Klärung.md | 39 | T-60 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Fall-Liste.md | 7 | T-4, T-5, T-6, T-35 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Fall-Liste.md | 8 | T-15, T-10 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Fall-Liste.md | 21 | T-4 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Fall-Liste.md | 22 | T-5 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Fall-Liste.md | 23 | T-6 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Fall-Liste.md | 24 | T-35 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Fall-Liste.md | 56 | T-7 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Fall-Liste.md | 81 | T-35 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Muster prüfen.mjs | 74 | T-7 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Muster.html | 12 | T-4, T-5, T-6 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Muster.html | 13 | T-35 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Muster.html | 145 | T-4 | APD-38 |
| AppDesign | arbeit/A-61 Teil 1 Muster.html | 178 | T-35 | APD-38 |
| AppDesign | arbeit/A-61 Teil 2 Fall-Liste.md | 1 | T-15 | APD-38 |
| AppDesign | arbeit/A-61 Teil 2 Muster prüfen.mjs | 1 | T-15 | APD-38 |
| AppDesign | arbeit/A-61 Teil 2 Muster.html | 8 | T-15 | APD-38 |
| AppDesign | arbeit/A-63 Fall-Liste.md | 3 | T-39, T-31, T-28, T-26 | APD-38 |
| AppDesign | arbeit/A-63 Fall-Liste.md | 53 | T-31 | APD-38 |
| AppDesign | arbeit/A-63 Fall-Liste.md | 67 | T-28 | APD-38 |
| AppDesign | arbeit/A-63 Fall-Liste.md | 85 | T-26 | APD-38 |
| AppDesign | arbeit/A-68 Fall-Liste.md | 16 | T-35 | APD-38 |
| AppDesign | arbeit/A-68 Fall-Liste.md | 17 | T-10 | APD-38 |
| AppDesign | arbeit/A-68 Fall-Liste.md | 30 | T-10 | APD-38 |
| AppDesign | arbeit/A-68 Muster.html | 16 | T-10, T-35 | APD-38 |
| AppDesign | arbeit/A-68 Muster.html | 188 | T-35 | APD-38 |
| AppDesign | arbeit/A-78 Recherche Präfixe.md | 189 | T-21 | Hand |
| AppDesign | arbeit/A-78 Testfall-Liste.md | 31 | T-1, T-66 | Hand |
| AppDesign | arbeit/A-78 Testfall-Liste.md | 65 | T-66 | Hand |
| AppDesign | tests/ablauf.mjs | 1008 | T-1, T-7 | APD-36 |
| AppDesign | tests/ablauf.mjs | 1068 | T-7 | APD-36 |
| AppDesign | tests/ablauf.mjs | 1087 | T-1 | APD-36 |
| AppDesign | tests/ablauf.mjs | 1088 | T-1 | APD-36 |
| AppDesign | tests/ablauf.mjs | 1089 | T-1 | APD-36 |
| AppDesign | tests/ablauf.mjs | 1104 | T-5 | APD-36 |
| AppDesign | tests/ablauf.mjs | 1105 | T-5 | APD-36 |
| AppDesign | tests/ablauf.mjs | 1120 | T-4 | APD-36 |
| AppDesign | tests/ablauf.mjs | 1121 | T-4 | APD-36 |
| AppDesign | tests/ablauf.mjs | 1264 | T-7 | APD-38 |
| AppDesign | tests/ablauf.mjs | 1421 | T-10 | APD-38 |
| AppDesign | tests/abspielen.mjs | 19 | T-8 | APD-36 |
| AppDesign | tests/abspielen.mjs | 96 | T-8 | APD-36 |
| AppDesign | tests/abspielen.mjs | 137 | T-8 | APD-36 |
| AppDesign | v4/ui.js | 1704 | T-35 | APD-38 |
| AppDesign | v4/ui.js | 1853 | T-10 | APD-38 |
| ReiseLogBuch | CHANGELOG.md | 795 | T-8 | APD-36 |
| ReiseLogBuch | tests/ablauf-navigation.mjs | 13 | T-7 | APD-38 |
| ReiseLogBuch | tests/ablauf-tastatur-still.mjs | 2 | T-1, T-7 | APD-36 |
| ReiseLogBuch | tests/ablauf-tastatur-still.mjs | 6 | T-8 | APD-36 |
| ReiseLogBuch | tests/ablauf-tastatur-still.mjs | 66 | T-8 | APD-36 |
| ReiseLogBuch | tests/ablauf-tastatur-still.mjs | 82 | T-8 | APD-36 |
| ReiseLogBuch | tests/ablauf-tastatur-still.mjs | 88 | T-8 | APD-36 |

## 5. Neue Buchstaben für lokale Nummern (K2)

Lokale Nummern, deren Buchstabe überall gilt (APD, RLB, RLI, P, R, G, I, K), bekommen einen freien Buchstaben – in ihrer Datei und in jedem Verweis.

| Thema oder Datei | alt | neu |
|---|---|---|
| APD-2 | K | H |
| APD-2 | G | Y |
| APD-20 | K | H |
| APD-26 | G | Y |
| APD-31 | G | Y |
| APD-34 | G | Y |
| APD-33 | K | H |
| APD-36 | G | Y |
| APD-39 | P | L |
| APD-67 | K | H |
| T-05 Brainstorming | I | J |
| RLB-5 Testfall-Liste | P | L |

## 6. Einzelne Stellen

Stellen, die die Regel oben nicht trifft (Verweise auf alte Erledigt-Nummern, Verweise ohne Zusammenhang). **bleibt** = unverändert.

| Repo | Datei | Zeile | alt | neu |
|---|---|---|---|---|
| ReiseLogBuch-Import | PROMPT.md | 82 | I-13 | RLB-5/J-13 |
| ReiseLogBuch | tests/ablauf-tastatur-still.mjs | 88 | T-8 | APD-36\/T-8 |
| AppDesign | arbeit/A-15 Fall-Liste.md | 3 | E-33 | aus P-45 |
| AppDesign | UEBERGABE.md | 19 | E-91 | bleibt |
| AppDesign | UEBERGABE.md | 19 | E-135 | bleibt |
| AppDesign | arbeit/A-27 Fall-Liste.md | 7 | E-42 | weg |
| AppDesign | CHANGELOG.md | 690 | E-33 | weg |
| AppDesign | VERLAUF.md | 1840 | E-33 | die Entscheidung aus P-45 |
| AppDesign | README - Designrichtlinie allgemein.md | 467 | S-9 | APD-36/S-9 |
| AppDesign | README - Designrichtlinie allgemein.md | 1192 | F-3 | APD-39/F-3 |
| AppDesign | tests/ablauf.mjs | 1169 | S-10 | APD-67/S-10 |
| AppDesign | tests/ablauf.mjs | 1479 | S-10 | APD-67/S-10 |
| AppDesign | tests/pruefe.mjs | 224 | B-8 | APD-5/B-8 |
| AppDesign | VERLAUF.md | 1816 | N-1 | I-1 |
| AppDesign | VERLAUF.md | 1816 | N-10 | I-10 |
| AppDesign | VERLAUF.md | 1820 | N-11 | I-11 |
| ReiseLogBuch | tests/alle.mjs | 12 | B-5 | APD-5/B-5 |
| AppDesign | CHANGELOG.md | 131 | F-1 | APD-35/F-1 |
| AppDesign | CHANGELOG.md | 135 | F-1 | APD-35/F-1 |
| AppDesign | README - Designrichtlinie allgemein.md | 459 | S-10 | APD-67/S-10 |
| AppDesign | README - Designrichtlinie allgemein.md | 1238 | W-6 | APD-2/W-6 |
| AppDesign | tests/ablauf.mjs | 1409 | F-20 | APD-61/F-20 |
| AppDesign | tests/ablauf.mjs | 1412 | F-20 | APD-61/F-20 |
| AppDesign | tests/ablauf.mjs | 1563 | F-20 | APD-61/F-20 |
| AppDesign | tests/ablauf.mjs | 1566 | F-20 | APD-61/F-20 |
| AppDesign | v4/ui.js | 1949 | F-20 | APD-61/F-20 |
| AppDesign | VERLAUF.md | 1846 | E-89 | Erledigt |
| ReiseLogBuch | tests/README.md | 50 | F-11 | APD-31/F-11 |
| ReiseLogBuch | tests/README.md | 50 | M-5 | M-5 |
| AppDesign | CHANGELOG.md | 427 | E-62 | Erledigt |
| AppDesign | VERLAUF.md | 1826 | K-12 | bleibt |
| AppDesign | VERLAUF.md | 1846 | E-42 | Erledigt |
| AppDesign | tests/offline.mjs | 148 | F-17 | APD-6/F-17 |
| AppDesign | BACKLOG.md | 119 | E-33 | die Entscheidung aus P-45 |
| AppDesign | CHANGELOG.md | 808 | F-17 | APD-6/F-17 |
| AppDesign | CHANGELOG.md | 811 | F-17 | APD-6/F-17 |
| AppDesign | CHANGELOG.md | 865 | D-6 | APD-5/D-6 |
| AppDesign | CHANGELOG.md | 877 | D-6 | APD-5/D-6 |
| AppDesign | CHANGELOG.md | 983 | W-6 | APD-2/W-6 |
| AppDesign | README - Designrichtlinie allgemein.md | 403 | M-1 | APD-28/M-1 |
| AppDesign | README - Designrichtlinie allgemein.md | 938 | F-1 | APD-6/F-1 |
| AppDesign | README - Designrichtlinie allgemein.md | 938 | F-17 | F-17 |
| AppDesign | tests/README.md | 93 | F-1 | APD-6/F-1 |
| AppDesign | tests/README.md | 93 | F-17 | F-17 |
| ReiseLogBuch | BACKLOG.md | 99 | E-42 | APD-18 |
| ReiseLogBuch | BACKLOG.md | 119 | F-17 | APD-6/F-17 |
| ReiseLogBuch | BACKLOG.md | 175 | F-11 | RLB 2.2.1/F-11 |
| ReiseLogBuch | BACKLOG.md | 175 | F-12 | F-12 |
| ReiseLogBuch | BACKLOG.md | 178 | F-10 | RLB 2.1.5/F-10 |
| ReiseLogBuch | CHANGELOG.md | 1727 | F-17 | APD-6/F-17 |
| ReiseLogBuch | CHANGELOG.md | 2871 | F-11 | RLB 2.2.1/F-11 |
| ReiseLogBuch | CHANGELOG.md | 2874 | F-12 | RLB 2.2.1/F-12 |
| ReiseLogBuch | CHANGELOG.md | 2893 | F-10 | RLB 2.1.5/F-10 |
| ReiseLogBuch | tests/README.md | 32 | A-1 | APD-63/A-1 |
| ReiseLogBuch | tests/README.md | 32 | A-3 | APD-63/A-3 |
| ReiseLogBuch | tests/README.md | 32 | A-5 | APD-63/A-5 |
| ReiseLogBuch | tests/README.md | 39 | F-1 | RLB-84/F-1 |
| ReiseLogBuch | tests/README.md | 39 | F-18 | F-18 |

## 7. Frühe Nummern

Nummern aus der Zeit vor den Backlog-Themen – sie bekommen die Version als Elternnummer.

| alt | neu | Erklärung |
|---|---|---|
| S-01 | APD 4.0.0/S-1 | alter Backlog AppDesign: Design-Repo angelegt |
| S-02 | APD 4.0.0/S-2 | alter Backlog AppDesign: Komponenten einmal programmiert |
| S-03 | APD-1 | alter Backlog AppDesign: Startseite mit allen Apps (wurde A-01) |
| K-07 | APD 4.15.1/K-7 | Korrektur zu P-39 (Sitzung 0005) |
| B-01 | RLB 2.1.0/B-1 | früher Backlog-Punkt des Reiselogbuchs |
| B-02 | RLB 2.1.0/B-2 | früher Backlog-Punkt des Reiselogbuchs |
| B-03 | RLB 2.1.0/B-3 | früher Backlog-Punkt des Reiselogbuchs |
| B-04 | RLB 2.1.0/B-4 | früher Backlog-Punkt des Reiselogbuchs |
| B-05 | RLB 2.1.0/B-5 | früher Backlog-Punkt des Reiselogbuchs |
| B-06 | RLB 2.1.0/B-6 | früher Backlog-Punkt des Reiselogbuchs |
| B-07 | RLB 2.1.0/B-7 | früher Backlog-Punkt des Reiselogbuchs |
| B-08 | RLB 2.1.0/B-8 | früher Backlog-Punkt des Reiselogbuchs |
| B-09 | RLB 2.1.0/B-9 | früher Backlog-Punkt des Reiselogbuchs |
| B-10 | RLB 2.1.0/B-10 | früher Backlog-Punkt des Reiselogbuchs |
| B-11 | RLB 2.1.0/B-11 | früher Backlog-Punkt des Reiselogbuchs |
| B-12 | RLB 2.1.0/B-12 | früher Backlog-Punkt des Reiselogbuchs |
| F-01 | RLB 2.1.1/F-1 | früher Backlog-Punkt des Reiselogbuchs |
| F-02 | RLB 2.1.1/F-2 | früher Backlog-Punkt des Reiselogbuchs |
| F-03 | RLB 2.1.1/F-3 | früher Backlog-Punkt des Reiselogbuchs |
| F-04 | RLB 2.1.1/F-4 | früher Backlog-Punkt des Reiselogbuchs |
| F-05 | RLB 2.1.1/F-5 | früher Backlog-Punkt des Reiselogbuchs |
| F-06 | RLB 2.1.2/F-6 | früher Backlog-Punkt des Reiselogbuchs |
| F-07 | RLB 2.1.2/F-7 | früher Backlog-Punkt des Reiselogbuchs |
| F-08 | RLB 2.1.3/F-8 | früher Backlog-Punkt des Reiselogbuchs |
| F-09 | RLB 2.1.4/F-9 | früher Backlog-Punkt des Reiselogbuchs |

## 8. Nie vergebene Nummern

Diese Themennummern kommen in keinem Backlog, CHANGELOG oder Verlauf vor (vermutlich nie vergeben). Sie bleiben frei und werden
nicht nachträglich vergeben (G2); die Schema-Prüfung meldet jede andere Lücke und jede Verwendung dieser Nummern.

| alt | neu | Erklärung |
|---|---|---|
| A-08 | APD-8 | nie vergeben |
| T-22 | RLB-22 | nie vergeben |
| T-61 | RLB-61 | nie vergeben |
