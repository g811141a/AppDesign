# APD-135 Befund D – Designrichtlinien gegeneinander abgeglichen

**Stand 17.11.2026** · reine Lese-Analyse: nichts geändert, keine Prüfung, kein Browser, kein verändernder git-Befehl · Grundlage:
Designrichtlinie allgemein 4.59.3 (`/home/user/AppDesign/README - Designrichtlinie allgemein.md`, 1539 Zeilen), Designrichtlinie
Reiselogbuch 3.56.3 (122 Zeilen), `ReiseLogBuch/PROMPT.md` 3.56.3 (275 Zeilen), Zusammenarbeit allgemein 0 Nr. 3, 4, 10, 23 und 2.6.

Zeilenangaben ohne Dateinamen meinen die Designrichtlinie allgemein (‚DR‘); ‚RLB-DR‘ = Designrichtlinie Reiselogbuch, ‚PROMPT‘ =
`ReiseLogBuch/PROMPT.md`, ‚ZA‘ = Zusammenarbeit allgemein. Zähl-Skripte (nur lesend) im Ordner `befund/d/`: `zaehlen.mjs`,
`doppelt.mjs` (Ausgabe `doppelt.txt`), `geschichte.mjs`, `verweise.mjs`, `code-verweise.mjs`, `namen.mjs`, `lesekosten.mjs`.

## Kopf: Zählungen (gemessen)

| Was | Zahl | Zählweise |
|---|---|---|
| R-Regeln im Katalog | **79** | `zaehlen.mjs`: Zeilen `\| R-t.n \| … \|` in DR (gleich Befund C, C-1) |
| G-Zeilen | **19**, davon **8** nur ‚ersetzt durch R-…‘, **11** gelten | `zaehlen.mjs`: Zeilen `\| G-n \|` |
| Themen mit Nummern nicht aufsteigend | 2: Thema 1 (1, 2, 3, 4, 5, 6, 8, 10, 9, 7, 11, 12), Thema 4 (… 4.5, 4.7, 4.6 …) | `zaehlen.mjs`; **keine Lücke** in einem Thema |
| R-Regeln mit mehr als einer Prüfdatei bzw. Prüffunktion in der Spalte ‚Prüfung‘ | **20** | `zaehlen.mjs` (Dateien `*.mjs` und Funktionsnamen in Backticks) |
| R-Regeln ohne Funktionsnamen in der Spalte ‚Prüfung‘ | **31** | `zaehlen.mjs` – gleich C-7 |
| Absatz in 1–16 nennt eine Regel und wiederholt ≥ 30 % ihres Katalogtexts wörtlich | **12** Paare (≥ 15 %: 32 von 215) | `doppelt.mjs`: Anteil der Wort-Dreiergruppen der Katalogregel, die im Absatz wörtlich stehen |
| ‚seit X.Y.Z‘ im Regeltext | DR **20**, RLB-DR **1**, PROMPT **16** | `geschichte.mjs` (ohne ‚seit Safari 17.4/18‘) |
| Verweise auf Unterabschnitte 15.x in DR, die es nicht gibt | **0** | `verweise.mjs` |
| Dateiverweise (`arbeit/…`, `tests/…`, `v4/…`) in DR, RLB-DR, PROMPT, die fehlen | **0** | `verweise.mjs` (`existsSync`) |
| Namen in Backticks in DR (Funktion, Klasse, CSS-Variable), die im Code nirgends stehen | **0** | `namen.mjs` gegen `v4/ui.js`, `v4/design.css`, `vorlage/index.html`, `ReiseLogBuch/index.html`, `sw.js`, alle `tests/*.mjs` |
| Verweise ‚Designrichtlinie (allgemein) N‘ in Code und Prüfungen auf den falschen Abschnitt | **2** (D-21) | `code-verweise.mjs` (Titel des Abschnitts danebengelegt) |
| Größe DR | **215,7 KB**, davon Versionsgeschichte 43,3 KB, Abschnitt 15 59,7 KB, Katalog 17 40,3 KB, Abschnitt 13 20,5 KB | `zaehlen.mjs` (Teil F) |

**Befunde: 51** – Widerspruch 17 (D-1, D-2, D-4 bis D-8, D-10 bis D-18, D-20) · überholt bzw. toter Verweis 8 (D-3, D-9, D-19, D-21 bis D-25) · doppelt 17
(D-26 bis D-40, D-45, D-46) · Katalog 4 (D-41 bis D-44) · Geschichte im Regeltext 3 (D-47 bis D-49) · Lesekosten 2 (D-50, D-51). Sortiert nach Nutzen:
Widersprüche, Überholtes und tote Verweise, Doppeltexte, Katalog, Reiselogbuch, Geschichte, Lesekosten.

## Was die Prüfungen am Wortlaut der Designrichtlinien lesen (damit ein neuer Wortlaut nicht rot wird)

`hig.mjs`, `ablauf.mjs`, `safari.mjs` und die übrigen Prüfdateien lesen **keinen** Text der Designrichtlinien (nur Kommentare
nennen Abschnitte; `grep readFileSync` in `tests/*.mjs`: nur `doku.mjs`, `version.mjs`, `lauf.mjs`, `backup.mjs` (Download),
`ablauf.mjs` Z. 3820 (Bausteine für eine Gegenprobe)). Es lesen:

| Stelle | liest | verlangt bzw. verbietet |
|---|---|---|
| `doku.mjs` `checkCatalog` Z. 81–84 | DR | Katalog = Text zwischen ‚\n## 17. ‘ und der nächsten Zeile ‚\n## ‘; darin ‚### Zuordnung alt → neu‘ als Trenner; Regeln = Zeilen `^\| (R-\d+\.\d+) \|` (mindestens 30) |
| `checkCatalog` Z. 86–88 | alle `tests/*.mjs` (AppDesign und App) | jede Regelnummer steht dort irgendwo (C-6) |
| `checkCatalog` Z. 89–90 | Zuordnung im Katalog | **jede alte Nummer R-01 … R-52 hat eine Zeile** `\| R-nn \| …` – sonst 52 Meldungen. Die Tabelle lässt sich also nicht ohne Änderung an `checkCatalog` entfernen oder verschieben (D-42) |
| `checkCatalog` Z. 93–107 | DR ohne Versionsgeschichte und ohne Katalog, RLB-DR, PROMPT, READMEs, `CLAUDE.md`, Prüfskripte, `v4/`, App-`index.html` | keine alte Nummer `R-nn`; **jede genannte Nummer `R-t.n` gibt es im Katalog** |
| `doku.mjs` `checkCollab` Z. 120–152 | RLB-DR und PROMPT (je ohne Versionsgeschichte) | verboten u. a. ‚etwa 5 Punkte‘, ‚werden ersetzt.‘, ‚Läuft nur auf dem iPad‘, ‚kein Teilen, kein Login‘; ‚Antwortzeile‘ nur mit ‚mehr als 4 Fragen‘; Verweise ‚Zusammenarbeit … n‘ nur auf vorhandene Abschnitte |
| `checkCollab` Z. 162–170 | PROMPT | Versionszeile (beginnt mit ‚Reiselogbuch ‘) nennt die aktuellen Fassungen; **verboten: ‚siehe Designrichtlinie allgemein \d‘** |
| `checkCollab` Z. 172–174 | DR | verboten: ‚gilt sofort für alle Apps‘, ‚?v=<Version>‘ |
| `checkCollab` Z. 176–181 | RLB-DR | ‚Feldnamen im Abgleichbericht (\`labels\`): ‘ und die Liste bis zum **ersten Punkt** – jedes Wort wie in `labels` der App |
| `checkDocs` Z. 21, 28–29 | DR, RLB-DR | Zeile ‚\*\*Version X.Y.Z\*\*‘ |
| `checkSchema` (Befund F, Abschnitt ‚Was die Prüfungen am Wortlaut lesen‘) | alle lebenden Dateien | keine Präfixe A-, T-, E-, N- vor einer Zahl außerhalb `arbeit/`; keine führende Null; Verweise `arbeit/…` müssen existieren |
| `werkzeug/veroeffentlichen.mjs` Z. 106, 134, 136 | DR, RLB-DR, PROMPT | DR: Zeile ‚\*\*Version X.Y.Z\*\* · Stand TT.MM.JJJJ‘; RLB-DR: dieselbe Zeile und **‚Designrichtlinie allgemein aus AppDesign (Version X.Y.Z)‘** (RLB-DR Z. 5); PROMPT: Zeile ‚Reiselogbuch X · AppDesign …‘ (Z. 3) – diese Wortlaute muss jeder Vorschlag stehen lassen |
| `version.mjs` `checkFassungen` | `fassung/X.Y.Z/README - Designrichtlinie allgemein.md` | jede Änderung am Text der DR braucht eine neue AppDesign-Version und `veroeffentlichen.mjs fassung` (Prüfsummen) |

Für jeden Vorschlag unten heißt ‚Leser‘: welche dieser Stellen den neuen Wortlaut liest. ‚keiner‘ = nur `checkCatalog` (Nummern) und
`checkSchema` (Präfixe) laufen über den Text, der Vorschlag ändert daran nichts.

---

## 1. Widersprüche (Teil B)

### D-1 · Widerspruch · R-1.10 nennt ‚keine Großanzeige‘ als Abweichung – R-2.6 legt die Großanzeige fest

- **Stelle 1:** Z. 1252 (R-1.10, Spalte ‚Regel‘, letzter Satz): ‚Abweichung: keine Großanzeige (16)‘.
- **Stelle 2:** Z. 1267 (R-2.6): ‚ab der Textgröße AX1 zeigt langes Drücken (R-3.5) auf einen Knopf einer Leiste … Icon und Namen groß in der
  Mitte des Bildschirms‘; Z. 713–716 (15.3 ‚Großanzeige … wie Apple‘); Z. 1215 (16): ‚Leisten-Knöpfe zeigen ab AX1 die Großanzeige wie Apple (R-2.6)‘.
  Die Tabelle 16 (Z. 1211–1223) hat keine Zeile ‚keine Großanzeige‘.
- **Vorschlag:** in R-1.10 den Satz ‚Abweichung: keine Großanzeige (16)‘ streichen.
- **Prüft heute:** R-1.10 `checkText` (hig.mjs); R-2.6 ‚ablauf.mjs‘ (Funktion `checkGrossanzeige`, C-7).
- **Leser:** keiner. **Risiko:** keins – der Satz beschreibt einen Stand vor R-2.6 (APD-104, RLB-DR Z. 38: AppDesign 4.48.0).
- **Nachweis:** stand in R-1.10 → steht dann nur in R-2.6 und 16 (Z. 1215) → geprüft durch `checkGrossanzeige` (ablauf-grossanzeige).

### D-2 · Widerspruch · Seitenleiste am iPad hoch ausblenden: ‚nur quer‘, ‚hoch wie quer‘ oder ‚nach links wischen‘?

- **Stelle 1:** Z. 1338 (R-7.5): ‚am iPad hoch und quer holt Wischen nach rechts die ausgeblendete Seitenleiste herein …, **ausblenden quer nur
  mit panel-left** (gleitet)‘ – lässt für hoch etwas anderes offen.
- **Stelle 2:** Z. 755–758 (15.4 ‚Gesten‘): ‚**Hoch wie quer:** … Ausblenden nur mit panel-left (gleitet, ~0,35 s) – nach links wischen ändert
  nichts‘; Z. 752: ‚quer und hoch fest links neben dem Inhalt‘.
- **Stelle 3:** PROMPT Z. 129: ‚**iPad hoch:** die Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch, **nach links wischen
  schiebt sie weg** (R-7.5).‘ – PROMPT Z. 130–131 ‚iPad quer‘ sagt dasselbe wie 15.4.
- **Code:** `ReiseLogBuch/index.html` Z. 1080: `const sideOver = () => … // seit 3.43.0 (APD-97) nie: hoch steht sie fest wie quer` (`isWide` =
  `!isPhone()`, Z. 1079) – es gibt am iPad hoch keine darübergelegte Seitenleiste mehr, also auch kein Wegwischen.
- **Vorschlag:** R-7.5: ‚…, ausblenden nur mit panel-left (gleitet).‘ · PROMPT Z. 129–131 zu einem Punkt: ‚**iPad hoch und quer:** die
  ausgeblendete Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch (R-7.5).‘
- **Prüft heute:** `checkNavigation` (ablauf.mjs). **Leser:** keiner (PROMPT: `checkCollab` – kein verbotener Wortlaut).
- **Risiko:** gering – der Text folgt dem Code; Vermutung: `checkNavigation` prüft das Wegwischen am iPad hoch nicht mehr (nicht nachgesehen).
- **Nachweis:** stand in R-7.5 (‚quer‘) und PROMPT Z. 129 (‚nach links wischen‘) → steht dann gleich in R-7.5, 15.4, PROMPT → geprüft durch `checkNavigation`.

### D-3 · überholt · ‚darübergelegte Seitenleiste‘ in R-4.7 und PROMPT

- **Stelle 1:** Z. 1293 (R-4.7): ‚Esc auf der Seite geht zurück bzw. **schließt die darübergelegte Seitenleiste** (Fokus auf panel-left)‘.
- **Stelle 2:** PROMPT Z. 168: ‚ohne offenes (iPhone-Startliste; **iPad hoch mit darübergelegter Seitenleiste**) in allen‘.
- **Gegenstelle:** Z. 752 (15.4: ‚quer und hoch fest links neben dem Inhalt‘); Code wie D-2 (`sideOver` nie wahr). `design.css` Z. 372 sagt
  selbst ‚schmaler als früher darübergelegt‘.
- **Vorschlag:** R-4.7: ‚Esc auf der Seite geht im iPhone-Aufbau zurück‘ · PROMPT Z. 168: ‚ohne offenes (iPhone-Startliste) in allen‘.
- **Prüft heute:** `checkFokus`, `checkCmdF`. **Leser:** keiner. **Risiko:** gering – `ui.js` kennt die darübergelegte Seitenleiste noch
  (`seite.moeglich()`, Z. 2411, 2521, 2676) für eine andere App; Vermutung: keine App nutzt sie (Befund U zu totem Code).
- **Nachweis:** stand in R-4.7 und PROMPT → steht dann nur noch, was gilt → `checkFokus` (Esc), `checkCmdF`.

### D-4 · Widerspruch · ‚schwebende Kapseln … aus Glas‘ (1) gegen R-3.9 – und in der Liste ‚bewusst verworfen‘

- **Stelle 1:** Z. 52: ‚Bewusst verworfen: eigene Kennzeichnung von Pflichtfeldern; harte, schmale Schatten; Glas-Leiste (schlechter lesbar);
  **schwebende Kapseln und Menüs sind aus Glas (R-3.9)**.‘
- **Stelle 2:** Z. 1282 (R-3.9): aus Glas sind nur ‚die Kapsel Nach oben / Ans Ende, Menü, Untermenü und Kontextmenü sowie Suchfeld und runde
  Knöpfe der unteren Leiste (iPhone)‘ – ‚Leisten, Fenster, Sprechblasen und **alle übrigen Schaltflächen bleiben deckend**‘ (also auch die
  Kapsel der Kopfzeile).
- **Vorschlag:** Z. 52: ‚Bewusst verworfen: eigene Kennzeichnung von Pflichtfeldern; harte, schmale Schatten; Glas-Leiste (schlechter lesbar).
  Was aus Glas ist: R-3.9.‘
- **Prüft heute:** `masseStile`, `checkGlas`. **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand in 1 und R-3.9 verschieden → steht dann nur in R-3.9 → `masseStile` (Unschärfe genau an diesen Bausteinen), `checkGlas`.

### D-5 · Widerspruch · Untermenü ‚Darstellung‘ ohne den Schalter ‚Glas‘ (2, 5, R-1.2) gegen R-3.9 und 15.6

- **Stelle 1:** Z. 106–108 (2): ‚Untermenü ‚Darstellung ›‘ (sun-moon, …) mit Automatisch · Hell · Dunkel (Häkchen)‘; Z. 236 (5): ‚Untermenü
  Automatisch · Hell · Dunkel‘; Z. 1246 (R-1.2): ‚(Automatisch · Hell · Dunkel)‘.
- **Stelle 2:** Z. 1282 (R-3.9): ‚mit dem Schalter ‚Glas‘ aus (Untermenü ‚Darstellung‘, Standard ein, gilt je Gerät …)‘; Z. 794 (15.6): ‚‚Glas‘ als
  eigene Gruppe im Untermenü ‚Darstellung‘‘; Code `ui.js` Z. 587: `'sep', { schalter: glasAn(), label: 'Glas', act: setGlas }`.
- **Vorschlag:** Z. 106–108: ‚… mit Automatisch · Hell · Dunkel (Häkchen), darunter als eigene Gruppe der Schalter ‚Glas‘ (R-3.9).‘ – Z. 236 und
  R-1.2 bleiben (sie nennen die Darstellung, nicht das ganze Untermenü), in 5 reicht ‚Untermenü 2‘.
- **Prüft heute:** R-1.2 hig.mjs (`measure`), R-3.9 `checkGlas`. **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand nur in R-3.9 und 15.6 → steht dann auch im Bau-Abschnitt 2 → `checkGlas` mit Schalter (ablauf-glas).

### D-6 · Widerspruch · Bezeichnung im Kasten mit Feldern: Footnote und grau – oder Textgröße und Textfarbe?

- **Stelle 1:** Z. 150 (Tabelle der Textstile, Zeile Footnote): ‚Zusatzzeilen, **Kasten-Bezeichnung**‘.
- **Stelle 2:** Z. 971 (15.17 ‚Kasten‘): ‚(`.box` mit Zeilen `.kv` = **graue Bezeichnung** `.k` links, Wert `.v` rechts)‘.
- **Stelle 3:** Z. 848–850 (15.10): ‚Text halbfett (600) wie die Kopfzeile der Tabelle, **in Textgröße und Textfarbe wie der Wert** (R-5.8)‘;
  Z. 1326 (R-6.5): ‚Text in der ersten Spalte halbfett (600), in Textgröße und Textfarbe‘; PROMPT Z. 148 ebenso.
- **Code:** `design.css` Z. 751: `.box .kv .k { … font-size: var(--t-body); font-weight: 600; color: var(--muted);` und Z. 757:
  `.box .kv .k.word, .box .kv .k .w { … color: var(--ink); }` – Text in Body und Textfarbe (grau nur, wo die Bezeichnung ein Emoji ist).
- **Vorschlag:** Z. 150: ‚Zusatzzeilen‘ · Z. 147 (Body): ‚Text, Menüeinträge, Felder (mind. 16 px), Bezeichnung im Kasten mit Feldern (halbfett)‘ ·
  Z. 971: ‚(`.box` mit Zeilen `.kv` = Bezeichnung `.k` links, Wert `.v` rechts; Aussehen 15.10)‘.
- **Prüft heute:** `kastenBezeichnung` (hig.mjs, ‚600 statt 400, Emoji-Höhe wie im Wert‘). **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand dreifach verschieden → steht dann in R-6.5 (Regel) und 15.10 (Bau) → `kastenBezeichnung` nach jedem Schritt.

### D-7 · Widerspruch · ‚Blau gefüllt nur im Fenster‘ – Backup-Kachel, fester Hinweis, gewählte Kachel und Sprechblase sind auch blau gefüllt

- **Stelle 1:** Z. 177 (4): ‚**Blau gefüllt = Hauptaktion** – nur **in Fenstern**, höchstens eine je Fenster‘; Z. 1276 (R-3.3): ‚blau gefüllt nur die
  Hauptaktion im Fenster (höchstens eine)‘; Z. 1198 (16 Nr. 3): ‚Blau = Aktion/Auswahl‘.
- **Stelle 2:** Z. 1068–1069 (15.19): Backup-Kachel ‚und der **blaue Knopf** ‚Backup erstellen‘‘ (in der Seitenleiste, kein Fenster); Z. 978 (15.17):
  fester Hinweis unten ‚mit **blau gefülltem Knopf**‘; Z. 75 (2): `--accent-fill` für ‚Hauptaktion, **gewählte Kachel**, Schritt-Nummer,
  **Backup-Knopf**‘; Z. 729 (15.4): ‚gewählter Eintrag blau gefüllt‘; Z. 810 (15.7): in der Sprechblase ‚die empfohlene Aktion blau gefüllt‘.
- **Code:** `design.css` Z. 389: `#side .bhint button, .bbar .bnote button { background: var(--accent-fill); …; box-shadow: var(--glow-accent); }`;
  die Prüfung zählt nur in Fenstern und Sprechblasen (hig.mjs Z. 765–767: `dialog[open], .pop`).
- **Vorschlag (Regeländerung – nur mit ‚Ja‘):** R-3.3: ‚blau gefüllt nur die Hauptaktion – in einem Fenster bzw. einer Sprechblase höchstens
  eine – sowie der Knopf der Backup-Kachel bzw. des festen Hinweises unten und der gewählte Eintrag der Liste‘; Z. 177 entsprechend ‚…
  Hauptaktion – in Fenstern und Sprechblasen höchstens eine; außerhalb nur der Backup-Knopf (15.19) und die gewählte Kachel (15.4)‘.
- **Prüft heute:** hig.mjs ‚höchstens eine blaue Hauptaktion‘, `stays`. **Leser:** keiner.
- **Risiko:** gering – die Prüfung bleibt, wie sie ist (sie zählte nie außerhalb von `dialog`/`.pop`); der Text sagt dann, was der Code tut.
- **Nachweis:** stand ‚nur in Fenstern‘ gegen vier Stellen mit Blau außerhalb → steht dann in R-3.3 mit den Ausnahmen → hig.mjs Z. 765–767.

### D-8 · Widerspruch · Dauer von Gleitbewegungen: 0,25 s bzw. ~0,35 s gegen R-1.12

- **Stelle 1:** Z. 275 (7): ‚Das iPad-Fenster gleitet mit der Tastatur **(0,25 s)** in die Mitte darüber und zurück‘.
- **Stelle 2:** Z. 757 (15.4): ‚Ausblenden nur mit panel-left (gleitet, **~0,35 s**)‘; Z. 953 (15.17): ‚der Zurück-Knopf schiebt ihn wieder hinaus
  (**~0,35 s**)‘.
- **Stelle 3:** Z. 1256 (R-1.12): ‚öffnen, hinein und nach oben mit einer Feder …, Antwortzeit 0,35 s (… CSS `linear()` über 0,5 s); **schließen und
  hinaus mit `ease-in-out` in 0,25 s**‘ – nennt ausdrücklich ‚das Fenster mit der Tastatur am iPad‘.
- **Code:** `ui.js` Z. 821 `GLEIT_AUF_MS = 500, GLEIT_ZU_MS = 250`; Z. 2477 (Navigation: hinaus = `GLEIT_ZU_MS`); `design.css` Z. 828–830
  (`dialog.gleitet` 0,5 s Feder, `.runter` 0,25 s).
- **Vorschlag:** Z. 275: ‚… gleitet mit der Tastatur in die Mitte darüber und zurück (R-1.12)‘; Z. 757: ‚(gleitet, R-1.12)‘; Z. 953: ‚… hinaus (R-1.12)‘.
- **Prüft heute:** `checkGleiten` (ablauf.mjs). **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand mit alten Zahlen in 7, 15.4, 15.17 → steht dann nur in R-1.12 → `checkGleiten` (Dauer und Kurve jeder Bewegung).

### D-9 · überholt · R-4.13 ‚Kurve wie das Blatt `cubic-bezier(.32,.72,0,1)`‘

- **Stelle 1:** Z. 1300 (R-4.13): ‚wachsen beim Öffnen in 0,35 s … (von 20 % auf volle Größe, **Kurve wie das Blatt** `cubic-bezier(.32,.72,0,1)`)‘ –
  Spalte ‚Prüfung‘: ‚ablauf.mjs – **neue Prüfung** (…)‘.
- **Stelle 2:** Z. 1256 (R-1.12): Fenster und Blatt gleiten mit der Feder (`linear()`); `ui.js` Z. 2700: ‚seit 4.57.0 nach R-1.12 (GLEIT_FEDER,
  GLEIT_ZU; **bis 4.56.0 BLATT_KURVE = cubic-bezier(.32,.72,0,1)**)‘; die Menüs nutzen sie weiter (`ui.js` Z. 815 `WACHS_KURVE`).
- **Vorschlag:** R-4.13 ‚… (von 20 % auf volle Größe, Kurve `cubic-bezier(.32,.72,0,1)`) …‘ · Spalte ‚Prüfung‘: ‚ablauf.mjs – `checkWachsen` (Herkunft,
  Dauer, Endlage, Schließen mitten im Öffnen, ‚Bewegung reduzieren‘)‘ (Funktion belegt in C, Tabelle Zeile R-4.13: ablauf.mjs Z. 4071).
- **Prüft heute:** `checkWachsen` (der Katalog sagt ‚neue Prüfung‘). **Leser:** `checkCatalog` (nur ‚R-4.13‘ muss in `tests/*.mjs` stehen – bleibt).
- **Risiko:** keins. **Nachweis:** stand ‚wie das Blatt‘ + ‚neue Prüfung‘ → steht dann der Wert und der Funktionsname → `checkWachsen`.

### D-10 · Widerspruch · Rand der Eingabefelder: ‚ohne Rand‘, `--field-line` oder `--btn-rim`?

- **Stelle 1:** Z. 65 (2, `--card`): ‚Kästen, Tabelle, **Eingabefelder (ohne Rand)**, …‘; Z. 73: ‚`--field-line` … **Haarlinie um Eingabefelder**‘;
  Z. 100 (Kontrast-Tabelle): ‚`--line` · `--th-line` · `--field-line`‘.
- **Stelle 2:** Z. 860 (15.11): ‚Fläche weiß bzw. `--dlg-field`, **Lichtkante `--btn-rim`** und Schatten `--float` wie die schwebenden Schaltflächen‘.
- **Code:** `design.css` Z. 238: `border: .5px solid var(--btn-rim); … box-shadow: var(--float);` – `var(--field-line)` steht in `design.css`,
  `ui.js`, `ReiseLogBuch/index.html`, `vorlage/index.html` und `tests/*.mjs` **nirgends** (`grep -c`, nur die Festlegung Z. 28, 67, 90, 93).
- **Vorschlag:** Z. 65: ‚Kästen, Tabelle, Eingabefelder, Seitenleiste, Menüs (dunkel `#2c2c2e`)‘ · Z. 73 streichen · Z. 100: ‚`--line` · `--th-line`‘.
  (Die Variable selbst in `design.css` ist dann toter Code – Sache von Befund U bzw. L.)
- **Prüft heute:** keine Regel nennt den Feldrand; R-3.2 (Schweben) hig.mjs. **Leser:** keiner. **Risiko:** gering – nur Text; wer die Variable
  aus `design.css` nimmt, ändert die Fassung (neue Version).
- **Nachweis:** stand in 2 anders als in 15.11 und im Code → steht dann nur in 15.11 → (keine eigene Prüfung).

### D-11 · Widerspruch · Trennlinien: ‚als Haarlinie (0,5 px)‘ gegen 1 px in Menü und Kasten

- **Stelle 1:** Z. 160 (3): ‚**Trennlinien und Feldränder als Haarlinie (0,5 px)**; Kästen und Tabelle ohne Rand.‘
- **Stelle 2:** Z. 790 (15.6): ‚Gruppen durch eine dünne, … eingerückte Linie getrennt (… `'sep'`/`'line'`, **1 px**, 20 px Einzug)‘; Z. 846–847 (15.10):
  ‚Felder durch dünne Linien getrennt (**1 px** `--line`, wie die Trennlinie im Menü)‘. Code `design.css` Z. 421: `.menu .sep, .menu .line { … border-top: 1px solid var(--line); …}`.
- **Vorschlag:** Z. 160: ‚Feldränder und Trennlinien in Listen als Haarlinie (0,5 px), Trennlinien in Menüs und im Kasten mit Feldern 1 px (15.6,
  15.10); Kästen und Tabelle ohne Rand.‘
- **Prüft heute:** R-6.1 `kopfVerlauf` (Linien vor dem ersten und nach dem letzten Feld), R-4.1 hig.mjs. **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand allgemein ‚0,5 px‘ → steht dann mit den zwei Ausnahmen → (Strichstärke prüft keine Regel; Vermutung).

### D-12 · Widerspruch · Radius der Listeneinträge: 14 px (3) gegen 22 px (15.17, Code)

- **Stelle 1:** Z. 158 (3): ‚Radien: … **Listeneinträge und Kästen 14 px**, Eingabefelder 10 px, Tabelle 12 px, Fenster 18 px.‘
- **Stelle 2:** Z. 969 (15.17): Liste ‚weiße Karte mit runden Ecken (**22 px**)‘; Code `design.css` Z. 361 `#side .side-row { … border-radius: 22px;`,
  Z. 724 `.ilist { … border-radius: 22px;`.
- **Vorschlag:** Z. 158: ‚… Kacheln und Listen 22 px, Kästen und Menüs 14 px, Eingabefelder 10 px, Tabelle 12 px, Fenster 18 px (Blatt oben 26 px, 15.17).‘
- **Prüft heute:** R-7.1 (hig.mjs Z. 699: Radius ≥ 12 = Kachel). **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand 14 px gegen 22 px im Code → steht dann wie im Code → R-7.1 (Kachel).

### D-13 · Widerspruch · Titel der Kopfzeile ‚17 px, fett‘ gegen ‚17 pt halbfett‘ – und px/pt gemischt, obwohl ‚keine Schriftgröße in px‘

- **Stelle 1:** Z. 704 (15.3): ‚Titel in der Mitte (**17 px, fett**)‘ – Code `design.css` Z. 285 `.nb-title { font-weight: 600; font-size: var(--tb-body);`.
- **Stelle 2:** Z. 967 (15.17): ‚erscheint der Titel klein (**17 pt halbfett**)‘.
- **Dazu dieselbe Größe mit zwei Einheiten:** Seitenleisten-Überschrift Z. 726 ‚(20 px, fett …)‘ gegen dieselbe Überschrift der Startliste Z. 943
  ‚20 pt fett‘ (‚Kopf wie am iPad‘); ‚geändert am‘ Z. 735 ‚(13 px)‘ gegen Offline-Zeile Z. 1095 ‚13 pt‘; Fenstertitel Z. 820 ‚(19 px) … (13 px)‘;
  Tabellenkopf Z. 356 ‚Schrift 17 px halbfett‘ – gegen Z. 120 (3): ‚**Keine Schriftgröße und keine Zeilenhöhe in px** (außer Ausgabe und Druck)‘.
- **Vorschlag:** Textstil statt Zahl: Z. 704 ‚Titel in der Mitte (Headline, halbfett)‘ · Z. 726 ‚Überschrift (Title 3, fett, linksbündig)‘ · Z. 735
  ‚(Footnote)‘ · Z. 820 ‚Mitte Titel (19, wächst wie Title 3) mit grauer Zusatzzeile (Footnote)‘ · Z. 356 ‚Schrift Headline halbfett wie die Zellen‘.
  Die Zahlen stehen dann nur in der Tabelle in 3.
- **Prüft heute:** R-1.10 `checkText` (‚Stile ohne px‘). **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand mit px/pt gemischt → steht dann als Textstil → `checkText` (Apples Wert je Stil).

### D-14 · Widerspruch · Mehr-Menü der Seitenleiste: 15.4 und 15.21 kennen ‚Darstellung‘ nicht

- **Stelle 1:** Z. 763–767 (15.4): ‚**Mehr-Menü der Seitenleiste:** Backup erstellen (…) · Backup laden · Abstand · Messung starten (15.21) ·
  durchgehender Strich · … Versionszeile …‘; Z. 1117 (15.21): ‚nach Backup durch Abstand getrennt: ‚Messung starten‘‘.
- **Stelle 2:** Z. 105–107 (2): Darstellung ‚im Mehr-Menü der Seitenleiste …, **nach Backup erstellen und Backup laden**‘; PROMPT Z. 105–106:
  ‚‚Suchen‘ … · Strich · Backup erstellen · Backup laden · Strich · ‚Darstellung ›‘ … · Abstand · Messung starten · Strich · Versionszeile‘.
  Code `ReiseLogBuch/index.html` Z. 1237–1250: Suchen, `backupMenuEntries`, `'sep'`, `darstellungMenuItem()`, `'sep'`, `messungMenuItems`, `'line'`, Versionszeile.
- **Vorschlag:** 15.4: ‚**Mehr-Menü der Seitenleiste:** Suchen (nur mit Einträgen) · Strich · Backup erstellen (…) · Backup laden · Abstand ·
  Darstellung › (2) · Abstand · Messung starten (15.21) · durchgehender Strich · …‘ · 15.21: ‚nach der Darstellung durch Abstand getrennt‘.
  (‚Abstand‘ = `'sep'`, ‚Strich‘ = `'line'` wie `ui.js` Z. 768; PROMPT nennt `'sep'` einmal ‚Strich‘ und einmal ‚Abstand‘ – dort gleich ziehen.)
- **Prüft heute:** R-1.2 hig.mjs, R-4.1 hig.mjs/`checkMehrKnopf`. **Leser:** PROMPT – `checkCollab` (kein verbotener Wortlaut). **Risiko:** keins.
- **Nachweis:** stand an drei Stellen verschieden → steht dann vollständig in 15.4, 2 und 15.21 verweisen → R-1.2, R-4.1.

### D-15 · Widerspruch · G-6 ‚leere Seite mit grauem Hinweis‘ gegen den leeren Zustand (7, 15.23, R-7.7)

- **Stelle 1:** Z. 1383 (G-6): ‚‚Neues …‘ öffnet einmal von selbst, **leere Seite mit grauem Hinweis**‘.
- **Stelle 2:** Z. 277 (7): ‚mit x bleibt die leere Seite **mit dem leeren Zustand (15.23)**‘; Z. 1340 (R-7.7) mit Prüfung hig.mjs.
- **Vorschlag:** G-6: ‚‚Neues …‘ öffnet einmal von selbst, wenn es noch keinen Eintrag gibt (danach der leere Zustand, R-7.7)‘.
- **Prüft heute:** G-6 ‚Abläufe der App‘ (ohne Nummer im Code, C-11); R-7.7 hig.mjs. **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand in G-6 überholt → steht dann ohne Doppel zu R-7.7 → R-7.7 (hig.mjs), G-6 Sicht.

### D-16 · Widerspruch · HIG-Checkliste: Spalte ‚außerdem‘ = ‚ohne automatische Prüfung‘ – enthält aber automatisch geprüfte Punkte, mit ‚etwa‘

- **Stelle 1:** Z. 1191–1192 (16): ‚was darüber hinausgeht, steht in der Spalte ‚außerdem‘ (**ohne automatische Prüfung: G-19**)‘.
- **Stelle 2 (in ‚außerdem‘, aber automatisch geprüft):** Z. 1200: ‚kein „…“ am Ende‘, ‚Icons in einer Gruppe alle oder keine‘ (= R-4.10),
  ‚Untermenüs höchstens etwa 5 Punkte‘ (= R-4.9); Z. 1201: ‚höchstens etwa 3 Gruppen‘, ‚nicht verfügbare Punkte **ausblenden** statt grau‘ (= R-4.10);
  Z. 1202: ‚Löschen und Verwerfen immer bestätigen (10)‘ (= R-4.12); Z. 1203: ‚kein ‚wir‘; ‚tippen‘ statt ‚klicken‘‘ (= R-10.6).
- **Zahl gegen ‚etwa‘:** Z. 1296 (R-4.9) ‚ein Untermenü hat **höchstens 5** Einträge‘, Z. 1297 (R-4.10) ‚höchstens 3 Gruppen‘ – gegen ‚höchstens etwa‘
  in Z. 1200, 1201 und Z. 793 (15.6 ‚höchstens etwa 5 Punkte‘).
- **Dazu G-19** Z. 1396: ‚Farbe nie einziges Merkmal; ein leerer Bildschirm nennt den nächsten Schritt‘ – der zweite Teil ist R-7.7 (Satz des
  leeren Zustands, Z. 1340); die übrigen ‚außerdem‘-Punkte (Wichtigstes oben, Beschriftung mit Verb, Häufigstes nah am Finger …) nennt G-19 nicht.
- **Vorschlag:** in 16 die geprüften Punkte in die Spalte ‚Regel‘ (Nr. 5: ‚R-4.1, R-4.9, R-4.10‘; Nr. 6: ‚R-4.2, R-4.10‘; Nr. 7: ‚R-4.3, R-4.12‘;
  Nr. 8: ‚R-10.1, R-10.6‘) und aus ‚außerdem‘ streichen; 15.6 Z. 793 ‚(… höchstens 5 Punkte, R-4.9)‘; G-19: ‚HIG ‚außerdem‘ (16): alle Punkte der
  Spalte‘ statt der Aufzählung.
- **Prüft heute:** R-4.9 `masseStile`, R-4.10 `texteMenues`, R-4.12 `checkErstFragen`, R-10.6 `texteMenues`. **Leser:** keiner – Achtung nur:
  ‚etwa 5 Punkte‘ ist in RLB-DR und PROMPT verboten (`checkCollab` Z. 131), in DR nicht gelesen. **Risiko:** gering.
- **Nachweis:** stand in ‚außerdem‘ und im Katalog → steht dann nur im Katalog, 16 verweist → die genannten Prüfungen.

### D-17 · Widerspruch (Arbeitsregel) · DR 12 ‚mit Grund und Datum der Entscheidung‘ gegen ZA 0 Nr. 3 ‚nur, was heute gilt‘

- **Stelle 1:** Z. 428 (12): App-Richtlinie enthält ‚nur Abweichungen … **jeweils mit Grund und Datum der Entscheidung**‘; RLB-DR Z. 7 wiederholt es;
  DR 16 Z. 1211 Spalte ‚Entschieden‘ (Daten), Z. 1218–1222 ‚Wunsch des Nutzers (P-73/1, APD-81)‘ u. a.
- **Stelle 2:** ZA Z. 85–86 (0 Nr. 3): ‚**Im Regeltext steht nur, was heute gilt; Geschichte steht in Versionsgeschichte und CHANGELOG.**‘
- **Vorschlag (Entscheidung des Nutzers):** ZA 0 Nr. 3 um eine Ausnahme ergänzen: ‚… außer der Spalte ‚Entschieden‘ (Datum) bei bewussten
  Abweichungen (Designrichtlinie 12, 16)‘ – oder Spalte ‚Entschieden‘ und Kennungen (P-…, APD-…) aus den Abweichungstabellen streichen.
- **Prüft heute:** 0 Nr. 3 `checkCatalog`, `checkCollab` (prüfen das nicht – F-39). **Leser:** `checkCollab` liest ZA (Wortlaut von 0 Nr. 3 nicht).
- **Risiko:** keins. **Nachweis:** stand widersprüchlich → steht dann als Ausnahme in 0 Nr. 3 → Selbstkontrolle.

### D-18 · Widerspruch · ‚halbfett nur Überschriften‘ (8, R-5.8) gegen ‚Bezeichnung im Kasten halbfett‘ (15.10, R-6.5)

- **Stelle 1:** Z. 318–320 (8): ‚Bezeichnungen von Feldern … stehen in Textgröße (Body) und normaler Schrift, nie fett. **Halbfett bleiben nur Überschriften:
  Schritt-Titel mit Nummer, Kasten-Überschriften, Tabellenköpfe und Titel.**‘; Z. 1313 (R-5.8): ‚Feldbezeichnungen … in normaler Schrift (400) …; **halbfett nur
  Überschriften**‘.
- **Stelle 2:** Z. 848–849 (15.10): Bezeichnung im Kasten mit Feldern ‚Text **halbfett (600)** wie die Kopfzeile der Tabelle, … (R-5.8)‘; Z. 1326 (R-6.5): ‚Text in der
  ersten Spalte halbfett (600)‘. Die Bezeichnung im Kasten ist keine der in 8 aufgezählten Überschriften – sie ersetzt den Tabellenkopf (‚wie die Kopfzeile der
  Tabelle‘), das steht aber nirgends als Ausnahme. Die Prüfung von R-5.8 nimmt nur `.step-head label`, `.step > label` aus (Katalog Z. 1313); `.k` ist kein
  `label` und wird deshalb nicht rot (Vermutung aus dem Text der Spalte, Code nicht gelesen).
- **Vorschlag:** R-5.8: ‚… halbfett nur Überschriften und die Bezeichnung im Kasten mit Feldern (sie steht für den Tabellenkopf, R-6.5)‘; 8 Z. 320: ‚…
  Kasten-Überschriften, Tabellenköpfe (auch als Bezeichnung im Kasten mit Feldern, R-6.5) und Titel.‘; 15.10 Z. 849: ‚(R-6.5)‘ statt ‚(R-5.8)‘.
- **Prüft heute:** R-5.8 `bezeichnungen`, R-6.5 `kastenBezeichnung`. **Leser:** keiner (`checkCatalog`: R-6.5 gibt es). **Risiko:** keins – nur Text.
- **Nachweis:** stand als stiller Widerspruch → steht dann als genannte Ausnahme in R-5.8 → `bezeichnungen`, `kastenBezeichnung`.

## 2. Tote Verweise und Überholtes (Teil C)

Per grep belegt: alle 15.x-Verweise in DR zeigen auf vorhandene Abschnitte; alle Dateiverweise in DR, RLB-DR und PROMPT gibt es; jeder Name
in Backticks in DR steht im Code (Kopf). Alle im Katalog genannten Prüffunktionen gibt es (C-3). Übrig bleiben:

### D-19 · überholt · PROMPT ‚Regelkatalog (AppDesign, R-1.1 bis R-10.4)‘

- **Stelle 1:** PROMPT Z. 6: ‚Es gelten die Designrichtlinie allgemein und ihr Regelkatalog (AppDesign, **R-1.1 bis R-10.4**)‘.
- **Stelle 2:** DR Z. 1368: die letzte Regel ist R-10.8 (R-10.5 bis R-10.8: Z. 1365–1368).
- **Vorschlag:** ‚Es gelten die Designrichtlinie allgemein und ihr Regelkatalog (AppDesign, Abschnitt 17); …‘ – ohne Spanne, die veraltet.
- **Prüft heute:** `checkCollab` (Versionszeile, nicht dieser Satz). **Leser:** `checkCatalog` (R-1.1 und R-10.4 gibt es – deshalb nie rot);
  `checkCollab` – nicht ‚siehe Designrichtlinie allgemein 17‘ schreiben (verboten, Z. 170). **Risiko:** keins.
- **Nachweis:** stand mit veralteter Spanne → steht dann als Verweis auf 17 → `checkCatalog`.

### D-20 · Widerspruch (PROMPT intern) · Zusatzzeile der Tageserfassung am iPhone ‚Gespeichert um …‘

- **Stelle 1:** PROMPT Z. 158: ‚**Tageserfassung** als Blatt, Titel kurz ‚Di, 25.08.2026‘ mit **‚Gespeichert um …‘**‘.
- **Stelle 2:** PROMPT Z. 177: ‚darunter grau **‚Automatisch gespeichert um hh:mm‘**‘; DR Z. 278–279 (7) ebenso; Code `ReiseLogBuch/index.html` Z. 1699,
  1756: `` `Automatisch gespeichert um ${…}` `` (ein Text für beide Geräte).
- **Vorschlag:** PROMPT Z. 158: ‚… Titel kurz ‚Di, 25.08.2026‘ mit ‚Automatisch gespeichert um …‘ (7); …‘.
- **Prüft heute:** R-5.10 `checkAutoSpeichern` (Speichern, nicht den Text). **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand verschieden → steht dann wie im Code → (Text prüft keine Regel).

### D-21 · toter Verweis (Code) · zwei Kopfkommentare zeigen auf den falschen Abschnitt

- **Stelle 1:** `AppDesign/tests/abgleich.mjs` Z. 1: ‚Prüfung des Abgleichs … (Regeln R-9.2 bis R-9.4, **Designrichtlinie allgemein 15.4** und 17)‘ –
  15.4 ist ‚Seitenleiste‘, der Abgleich steht in **15.18** (DR Z. 1004).
- **Stelle 2:** `AppDesign/tests/version.mjs` Z. 1: ‚Prüfung der Versionskopplung … (Regel R-10.3, **Designrichtlinie allgemein 15.20**)‘ – 15.20 ist
  ‚Offline‘, die Versionskopplung steht in **11 und 14** (DR Z. 409–414, 618–623; R-10.3 Bau ‚11, 14‘).
- **Vorschlag:** ‚… Designrichtlinie allgemein 15.18 …‘ bzw. ‚… Designrichtlinie allgemein 11, 14 …‘ (gefunden mit `code-verweise.mjs`; alle übrigen
  48 Verweise ‚Designrichtlinie N‘ in Code, Prüfungen und READMEs passen zum Titel des Abschnitts).
- **Prüft heute:** – (Kommentar). **Leser:** `checkCatalog` liest Prüfskripte nur auf R-Nummern. **Risiko:** keins (Änderung an `tests/` braucht
  eine neue Fassung). **Nachweis:** stand falsch im Kommentar → steht dann richtig → –.

### D-22 · toter Verweis · ‚Automatische Prüfungen dafür: Backlog APD-40‘ – APD-40 ist erledigt

- **Stelle 1:** DR Z. 1373 (Einleitung ‚Regeln ohne automatische Prüfung‘): ‚Automatische Prüfungen dafür: **Backlog APD-40**.‘
- **Stelle 2:** `AppDesign/BACKLOG.md` Z. 93 und 96: APD-40 Pakete A, B und C – beide Zeilen stehen unter ‚## Erledigt‘ (Z. 54).
- **Vorschlag:** den Satz streichen (für eine neue Prüfung entsteht ein neues Thema, ZA 0 Nr. 24).
- **Prüft heute:** –. **Leser:** `checkSchema` (Kennung APD-40 ist gültig, auch nach dem Streichen nichts zu prüfen). **Risiko:** keins.
- **Nachweis:** stand Verweis auf Erledigtes → steht dann nichts → –.

### D-23 · überholt · R-6.1 ‚Kasten mit Feldern (iPhone)‘

- **Stelle 1:** Z. 1322 (R-6.1): ‚Kasten mit Feldern **(iPhone)** mit Linien waagrecht …‘.
- **Stelle 2:** Z. 905–910 (15.13): Kästen auch ab AX1 und im schmalen Inhalt unter 700 px (iPad hoch neben der Seitenleiste, R-6.6); Z. 846 (15.10)
  ‚iPhone statt Tabellenzeile‘ ebenso zu eng.
- **Vorschlag:** R-6.1: ‚Kasten mit Feldern (statt Tabellenzeile, R-6.6, R-1.10) mit Linien …‘; 15.10 Z. 846: ‚(`.box` mit `.kv`, statt Tabellenzeile – 15.13, R-6.1)‘.
- **Prüft heute:** hig.mjs `kopfVerlauf`. **Leser:** `checkCatalog` (R-6.6, R-1.10 gibt es). **Risiko:** keins.
- **Nachweis:** stand ‚iPhone‘ → steht dann ‚statt Tabellenzeile‘ mit Verweis → `kopfVerlauf`, R-6.6 hig.mjs.

### D-24 · überholt (Vermutung) · ‚Ohne Rollbereich rollt wie bisher das Fenster (ältere Apps)‘

- **Stelle:** Z. 1171 (15.22): ‚Die App ruft **nie** `window.scrollTo`. **Ohne Rollbereich rollt wie bisher das Fenster (ältere Apps).**‘
- **Gegenstelle:** Z. 44 und R-2.1 (Z. 1262): ‚Die Seite rollt nie, nur der Inhalt‘; einzige App ist das Reiselogbuch (RLB-DR 3.25.0: Inhalt im Rollbereich).
- **Vorschlag:** den Satz streichen, wenn keine App ohne Rollbereich mehr gebaut wird (Vermutung – ob `ui.js` den Rückfall noch braucht, z. B.
  für `vorlage/index.html`, habe ich nicht geprüft; Befund U).
- **Prüft heute:** R-2.1 `barStill`, ‚Seite rollt nie‘. **Leser:** keiner. **Risiko:** gering (nur Text). **Nachweis:** stand Rückfall → steht dann nur die Regel → R-2.1.

### D-25 · überholt · ‚Geplant: Startseite‘ im Regeltext

- **Stelle 1:** Z. 630 (14): ‚**Geplant:** Startseite g811141a.github.io mit allen Apps.‘
- **Stelle 2:** `AppDesign/BACKLOG.md` Z. 48: ‚APD-1 | 3 | Startseite g811141a.github.io mit allen Apps | später‘.
- **Vorschlag:** in 14 streichen – ein Plan steht im Backlog (ZA 0 Nr. 24). **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand doppelt (DR 14, Backlog APD-1) → steht dann nur im Backlog → –.

## 3. Echte Doppeltexte (Teil A)

### D-26 · doppelt (Grundsatz) · ‚Regeln stehen nur im Katalog‘ – die Abschnitte 1–16 legen dasselbe noch einmal fest

- **Stelle 1:** Z. 11–12: ‚Die **Regeln** stehen nur im Regelkatalog (17), jede mit ihrer Prüfung. Die Abschnitte 1–15 beschreiben Werte, Gestaltung
  und Bauteile und verweisen auf die Regel (R-x.y)‘; Z. 1227: ‚Jede allgemeine Regel steht **nur hier**‘.
- **Stelle 2:** Z. 1371: ‚Diese Gestaltungsregeln stehen **an ihrer Stelle in 1–16**‘ (G-Regeln) – und gemessen (`doppelt.mjs`, `doppelt.txt`): von 215
  Paaren ‚Absatz nennt Regel‘ wiederholen **12 mindestens 30 %** der Wort-Dreiergruppen ihrer Katalogregel wörtlich, **32 mindestens 15 %**.
  Dazu stehen in 13 und 15 verbindliche Festlegungen ohne Katalognummer (z. B. Z. 521–522 ‚**Berührungen nie abfangen**‘, Z. 689–690
  ‚Tipp-Pause (ca. 0,5 s)‘, Z. 884–886 Pfeil 14 px, 9 px vom Rand) – so gewollt (Bau), aber dann ‚beschreiben‘, nicht ‚Regeln stehen nur im Katalog‘.
- **Vorschlag Wortlaut neu (Z. 11–13):** ‚**Aufbau:** Was gilt und geprüft wird, steht als Regel im Regelkatalog (17), jede mit ihrer Prüfung. Die
  Abschnitte 1–15 nennen dazu nur Werte, Maße, Farben, technische Namen und Begründungen (‚Bau‘) und die Nummer der Regel – sie wiederholen den
  Regeltext nicht. Was ohne automatische Prüfung gilt, listet 17 als G-1 …; 16 ordnet die HIG-Checkliste den Regeln zu.‘ Danach je Paar
  (D-27 bis D-36) im Abschnitt nur behalten, was **nicht** im Katalog steht.
- **Prüft heute:** `checkCatalog` (Nummern), keine Prüfung für Doppeltext (F-39). **Leser:** keiner. **Risiko:** mittel, wenn beim Kürzen ein Wert
  verloren geht, der nur im Abschnitt steht (z. B. ‚Markierung 25 × 25‘ nur in 15.3, nicht in R-2.4) – deshalb je Paar die Liste ‚bleibt im Abschnitt‘.
- **Nachweis:** stand zweimal → Regeltext dann nur im Katalog, Bau-Werte nur im Abschnitt → Prüfung je Regel wie im Katalog.

### D-27 bis D-36 · doppelt · die Paare mit der größten Überdeckung

Je Zeile: Stelle 1 = Absatz in 1–16, Stelle 2 = Katalogzeile; ‚%‘ = wörtliche Überdeckung (`doppelt.mjs`). Vorschlag immer: **im Abschnitt den
Regeltext streichen und durch ‚(R-x.y)‘ ersetzen; nur das in der Spalte ‚bleibt im Abschnitt‘ Genannte behalten.** Leser bei allen: keiner
(`checkCatalog` – die Nummer bleibt genannt). Nachweis bei allen: ‚stand in Abschnitt und Katalog → steht dann im Katalog, der Abschnitt nennt
die Nummer und die Bau-Werte → geprüft durch die Prüfung der Regel‘.

| Nr. | Stelle 1 (Abschnitt) | Stelle 2 (Katalog) | % | Wortlaut alt (entscheidender Satz, Abschnitt) | bleibt im Abschnitt | Prüfung laut Katalog | Risiko |
|---|---|---|---|---|---|---|---|
| D-27 | Z. 717–719 (15.3 ‚iPhone quer niedrig‘) | Z. 1265 R-2.4 | 67 | ‚Kopfzeile, Suchzeile und Fensterkopf 32 statt 44 px hoch – Knöpfe in Kapseln 31 px, … runde Knöpfe 32 × 32 mit unsichtbarer Antippfläche 44 × 44‘ | ‚Markierung 25 × 25‘ (steht nicht in R-2.4); Fensterkopf: Z. 821 ‚iPhone quer 32 px (R-2.4, wie 15.3)‘ wird ‚(R-2.4)‘ | hig.mjs – Höhe der Knöpfe und des Suchfelds | gering |
| D-28 | Z. 867–877 (15.11 ‚ⓧ zum Leeren‘, 233 Wörter) | Z. 1311 R-5.6 | 51 | ‚ein- und mehrzeilige Textfelder zeigen rechts ein graues ⓧ (…, 44 × 44), solange sie den Fokus haben und etwas drinsteht – mehrzeilig oben rechts auf Höhe der ersten Zeile‘ | Technik: `.fclear`, `data-noclear`, Klasse `rueck`, `execCommand('delete'/'insertText')`, Rückfall über den Wert, `navigator.clipboard.writeText` im Tipp, VoiceOver-Namen ‚Eingabe löschen‘/‚Löschen widerrufen‘, `undo-2` in `--muted` | `checkClear` | gering |
| D-29 | Z. 189–197 (4 ‚Berühren‘) | Z. 1279 R-3.6 | 49 | ‚Solange der Finger auf einer Schaltfläche liegt, wird sie blass (Icon und Text 35 %); ein Knopf einer Leiste … hebt sich … auf das 1,3-Fache‘ | ‚wie Liquid Glass in iOS 26‘, ‚Bewegung reduzieren: ohne Wachsen‘ (fehlt in R-3.6 – in R-3.6 aufnehmen oder hier lassen) | ablauf.mjs (`checkBeruehren`, C-7) | gering |
| D-30 | Z. 310–313 (8 ‚Cursor am Ende‘) und Z. 1220 (16, Abweichung) | Z. 1316 R-5.11 | 48 / 44 | ‚steht der Cursor nach dem letzten Zeichen, egal wohin der Finger tippt. Hat das Feld den Fokus schon, setzt Antippen den Cursor wie gewohnt an die Stelle‘ | 8: ‚Gilt für alle Text-, Zahlen- und mehrzeiligen Felder, nicht für Datumsfelder. Gebaut in `ui.js` …‘ (fehlt in R-5.11); 16: Grund und Datum der Abweichung | `checkCursorEnde` (läuft nur über `checkFeldCursor`, C-8) | gering |
| D-31 | Z. 768–772 (15.4 ‚Kontextmenü‘) | Z. 1289 R-4.2 | 43 | ‚immer vollständig und ganz oberhalb der Backup-Kachel, nie über oder hinter ihr (die Liste rückt dafür nach oben …)‘ | ‚ca. 0,6 s‘ (R-3.5), `sideFootRect()`, Inhalt ‚Einstellungen (settings) · … löschen‘, ‚Kein Wischen, kein Hinweistext‘ | `kontextmenue.mjs` | gering |
| D-32 | Z. 105–108 (2 ‚Darstellung‘) | Z. 1246 R-1.2 | 41 | ‚folgt automatisch der Hell/Dunkel-Einstellung des Geräts (Voreinstellung ‚Automatisch‘ …); im Mehr-Menü der Seitenleiste … übersteuerbar …, nie im Menü eines Eintrags‘ | `sun-moon`, ‚rechts grau der aktuelle Wert‘, Häkchen, `settings.appearance` (`auto`/`light`/`dark`), Glas-Schalter (D-5) | hig.mjs | keins |
| D-33 | Z. 266–271 (7 ‚iPhone: Blatt‘, ‚iPad: Fenster nach unten ziehen‘) und Z. 981–1000 (15.17 ‚Fenster als Blatt‘, 432 Wörter) | Z. 1294 R-4.6 | 13 / 38 | 7: ‚gleitet von unten bis knapp unter die Statusleiste, die Seite dahinter weicht verkleinert und abgedunkelt zurück (quer volle Höhe, die Seite bleibt); nach unten ziehen schließt wie das x‘ – dreimal fast gleich (7, 15.17, R-4.6) | 7: nur ‚iPhone: Blatt, iPad: Fenster ziehen (R-4.6, Bau 15.17)‘; 15.17: Maße (10/8 px, 26/18 px, 7 %, 30 %/35 % Schwarz, 8 px, 1,2 ×, Tempo × 400 ms, zäh 30 %) und Technik (`blattAuf`, `blattOben`, Klassen) | `checkSheet` (B1–B24, APD-72/D-1 bis APD-72/D-21) | mittel – drei Fassungen, die schon auseinanderlaufen (7 nennt ‚Antippen der Abdunkelung wie x‘ nur fürs iPhone, R-4.6 und 15.17 gleich; Maße nur in 15.17) |
| D-34 | Z. 846–856 (15.10 ‚Kasten mit Feldern‘) | Z. 1322 R-6.1, Z. 1326 R-6.5 | 16 / 38 | ‚Text halbfett (600) wie die Kopfzeile der Tabelle, in Textgröße und Textfarbe wie der Wert (R-5.8) …; Icon und Text der Bezeichnung stehen waagrecht mittig zur ersten Zeile des Werts‘ | `calc(98px * var(--f-body))`, 8 px Innenabstand, `--kachel-bg` je Zustand, Technik `.k`, `.l`, `.k.word`, `.w`, `html.ts-um`. Achtung: ‚(R-5.8)‘ verweist auf die Regel ‚halbfett nur Überschriften‘ – siehe D-18; richtig ‚(R-6.5)‘ | `kopfVerlauf`, `kastenBezeichnung` | gering |
| D-35 | Z. 713–716 (15.3 ‚Großanzeige‘), Z. 823–827 (15.8 ‚Gekürzter Titel‘), Z. 710–712 (15.3 ‚Titel antippen‘), Z. 1215–1216 (16) | Z. 1267 R-2.6, Z. 1266 R-2.5, Z. 1268 R-2.7 | 36 / 26 / – | 15.8: ‚langes Drücken auf ihn zeigt den ganzen Titel in einer Sprechblase direkt darunter … Sie bleibt stehen, bis man irgendwo tippt (dieser Tipp schließt nur die Sprechblase), rollt, Esc drückt oder dreht‘ | 15.8: ‚Pfeil zur Mitte des Titels, Schrift wie der Titel, bricht um‘; 15.3: ‚Ebenso der Titel der Seitenleiste und der Fenster-Kopfzeile‘ (steht schon in R-2.7 – streichen); Grund der Abweichung nur in 16 | ablauf.mjs (`checkTitelBlase`, `checkGrossanzeige`, `checkTitelOben`, C-7) | keins |
| D-36 | Z. 122–129 (3 ‚Icon und Text bleiben zusammen‘, ‚Aufzählungen mit Trennpunkt‘) | Z. 1365 R-10.5 | 33 | ‚jeder Eintrag am Stück, wenn er in die Zeile passt; der ‚·‘ bleibt am Ende der Zeile, die neue Zeile beginnt mit dem nächsten Eintrag‘ | Technik `iconText`, `.ict` (auch in `outputCss`), `aufzaehlung`, `.az` (`inline-block`), geschütztes Leerzeichen | `checkIconText`, `checkAufzaehlung` | keins |

**Weitere Doppelstellen in DR (dreifach, mit Verweis – Teilüberdeckung, Art (c)):**

- **D-37 · doppelt · Start und Neustart an drei Stellen:** Z. 945–949 (15.17 ‚Start‘, 31 % von R-7.2), Z. 598–601 (13 ‚Neustart ist nicht erkennbar‘,
  ‚Was ‚beim Start‘ gilt, gilt also bei jedem Neuladen‘), Z. 1335 (R-7.2 ‚jedes Neuladen zeigt im iPhone-Aufbau … die Startliste ganz oben ohne blauen
  Eintrag; … Rückkehr aus dem Hintergrund ändert nichts‘). **Vorschlag:** 15.17 ‚**Start** (R-7.2): … die App merkt sich den Start-Eintrag trotzdem,
  damit ein breiteres Fenster ihn mit der Seitenleiste zeigt.‘ (nur das bleibt, es steht nicht in R-7.2); 13 bleibt (Safari-Erfahrung mit Quelle).
  **Prüfung** `start.mjs`. **Risiko** keins. **Nachweis** stand dreimal → R-7.2 + Bau-Rest in 15.17 + Erfahrung in 13 → `start.mjs`.
- **D-38 · doppelt · ‚Nach oben / Ans Ende‘ an vier Stellen:** Z. 205–207 (4: ‚zeigt nur die Pfeile, die etwas bewirken, und ist ausgeblendet, wenn es
  nichts zu rollen gibt (R-3.2)‘), Z. 645–651 (15.1), Z. 973–974 (15.17 ‚dieselbe senkrechte Kapsel … wie am iPad, nicht in der Startliste‘), Z. 1275
  (R-3.2). **Vorschlag:** 4 Z. 205–207: ‚**Nach oben / Ans Ende** unten rechts in einer senkrechten Kapsel (R-3.2, Bau 15.1) – bewusste Abweichung von
  Apple (16).‘; 15.17 Z. 973–974: ‚**Nach oben / Ans Ende** und Schnellroll-Griff wie am iPad (15.1, R-3.2)‘. 15.1 bleibt Bau (Maße 16 px, 120 px Platz,
  `updateFab`, 34 × 48, 8 px, `--safe-right`). **Prüfung** `checkFab`, `checkGriff`. **Risiko** keins.
- **D-39 · doppelt · Backup einmal am Tag an vier Stellen:** Z. 390–391 (10 ‚Backup einmal am Tag‘), Z. 731–732 (15.4 ‚Unten fest die Backup-Kachel,
  solange heute noch kein Backup erstellt wurde‘), Z. 1066–1071 (15.19), Z. 1352 (R-9.1). **Vorschlag:** 10: ‚Nach einer Ausgabe erinnert das
  Ergebnisfenster an ein Backup (R-9.1, 15.19).‘ – Rest streichen; 15.4: ‚Unten fest die Backup-Kachel (15.19)‘. **Prüfung** `backup.mjs`. **Risiko** keins.
- **D-40 · doppelt · Tabelle als Kästen zweimal in 15.13:** Z. 905–906 ‚**Große Schrift** (seit 4.37.0, R-1.10): ab AX1 – **auf dem iPhone hoch immer** –
  zeigt jede Tabelle im Inhalt ihre Zeilen als Kästen‘ und Z. 907–910 ‚**Schmaler Inhalt** (seit 4.45.0, R-6.6): ist der Inhalt schmaler als 700 px …‘ –
  ‚iPhone hoch immer‘ ist ein Fall von ‚unter 700 px‘; dazu Z. 138 (3) ‚ab AX1 … Tabellen im Inhalt als Kästen (15.13)‘. **Vorschlag:** 15.13: ‚Im Inhalt
  zeigt jede Tabelle ihre Zeilen als Kästen (15.17, `.box` mit `.kv`), wenn der Inhalt schmaler als 700 px ist (R-6.6, `inhaltSchmal(#app)`) oder ab AX1
  (R-1.10); Vorschau und Ausgabe bleiben Tabellen (R-6.2). Ein Wechsel wirkt wie das Drehen (R-8.1).‘ **Prüfung** hig.mjs (R-6.6), `checkText` (R-1.10).
  **Risiko** keins. **Nachweis** stand zweimal mit ‚seit‘ → steht dann einmal → R-6.6, R-1.10.

## 4. Katalog-Hygiene (Teil D)

Grundlage: Befund C Abschnitt 1 (`arbeit/APD-135 Befund C Prüfungen.md`) – **79 R-Regeln, 19 G-Zeilen (8 ersetzt, 11 gültig), jede R-Regel hat
eine Fundstelle im Prüfcode, jede genannte Prüffunktion gibt es** (C-1 bis C-5); 31 Regeln nennen nur eine Datei (C-7), `checkCatalog` belegt
schwächer als behauptet (C-6), R-1.9 meldet als R-10.2 (C-9), R-9.3 ‚Fälle 1–20‘ (C-10), G-Regeln ohne Nummer im App-Code (C-11), doppelt
prüfende Regeln (C-16 bis C-25). Das wiederhole ich nicht. **Ergänzungen:**

### D-41 · Katalog · ‚genau eine Prüfung‘ (ZA 0 Nr. 3, DR 17) gegen 20 Regeln mit mehreren Prüfungen

- **Stelle 1:** ZA Z. 83: ‚Jede Regel steht an genau einer Stelle und **nennt genau eine Prüfung**‘; DR Z. 1232: ‚**je Regel eine automatische Prüfung**
  in `tests/`‘.
- **Stelle 2:** 20 Katalogzeilen nennen mehr als eine Prüfdatei oder mehr als eine Funktion (`zaehlen.mjs`): R-1.7 (hig.mjs, doku.mjs), R-1.8, R-1.9
  (hig.mjs, ablauf.mjs, pruefe.mjs), R-2.3 (7 Funktionen), R-3.2, R-3.4, R-3.9, R-4.1, R-4.5 (+ App-Ablauf), R-4.6 (+ App-Ablauf), R-4.7, R-4.10, R-5.2,
  R-6.4, R-6.5 (+ App-Ablauf), R-8.1, R-10.1, R-10.4, R-10.5, R-10.7.
- **Vorschlag Wortlaut neu:** ZA 0 Nr. 3: ‚Jede Regel steht an genau einer Stelle und nennt ihre Prüfung (Prüfdatei und Funktion; prüfen mehrere
  Funktionen Teile derselben Regel, nennt sie alle) …‘ – DR Z. 1232: ‚**Prüfung:** je Regel ihre automatische Prüfung in `tests/` (AppDesign), mit Datei
  und Funktion: …‘. Alternative: die Regeln mit mehreren Teilen aufteilen (neue Nummern im selben Thema) – mehr Zeilen, aber ‚eine Regel, eine Prüfung‘.
- **Leser:** ZA Nr. 3 – `checkKasten` verlangt, dass jede Nummer in Abschnitt 0 das Wort ‚Prüfung‘ enthält (Befund F, Tabelle Z. 238–246): der neue
  Satz muss ‚Prüfung: `doku.mjs` – …‘ behalten; Satzende nicht mit ‚Nr. 3.‘ (Befund F: ‚kein Satz in Abschnitt 0 darf mit nackter Zahl und Punkt
  enden‘). DR: keiner. **Risiko:** keins (Text an die Wirklichkeit). **Nachweis:** stand ‚genau eine‘ → steht dann ‚ihre Prüfung(en)‘ → `checkCatalog`.

### D-42 · Katalog · Geschichte im Katalog: ‚ersetzt durch‘, ‚Rest ersetzt‘, ‚Aus dem Katalog genommen‘, ‚Spalte ersetzt (bis 4.28.1)‘, Zuordnung

- **Stellen:** Z. 1378–1394: acht Zeilen ‚| G-n | ersetzt durch R-… | – | – |‘ (G-1, G-2, G-4, G-5, G-7, G-12, G-13, G-17; 343 Bytes); ‚Rest ersetzt durch‘ in
  G-10 (Z. 1387), G-15 (Z. 1392), G-18 (Z. 1395: ‚Info-Icon (Rest ersetzt durch R-5.9)‘ – R-5.9 sind Schalterzeilen und Options-Kapsel, der Bezug ist nur
  geschichtlich, BACKLOG Z. 96), G-19 (Z. 1396); Z. 1398–1399 ‚**Aus dem Katalog genommen:** R-50 …‘ (138 Bytes); Z. 1421–1424 ‚Die Spalte ‚ersetzt‘ (bis
  4.28.1) nannte zusätzlich …‘ (409 Bytes); Z. 1401–1420 Tabelle ‚Zuordnung alt → neu‘ (R-01 … R-52).
- **Vorschlag:** (1) die acht ‚ersetzt durch‘-Zeilen durch **eine** Zeile ersetzen: ‚Vergeben, nicht neu verwenden: G-1, G-2, G-4, G-5, G-7, G-12, G-13,
  G-17 (in R-Regeln aufgegangen, CHANGELOG 4.51.0 und 4.52.0).‘ (2) G-10 ‚Statistik als schlichte Liste‘, G-15 ‚Emoji-Varianten gleich behandeln‘, G-18
  ‚Info-Icon: ein Tippen blendet den grauen Hinweis ein bzw. aus‘, G-19 siehe D-16. (3) Z. 1398–1399 und Z. 1421–1424 streichen. (4) Die Tabelle
  ‚Zuordnung alt → neu‘ nur verschieben, wenn `checkCatalog` mitgeändert wird.
- **Leser:** (1)–(3) keiner – kein Werkzeug liest G-Nummern (`grep` in `tests/*.mjs`, `werkzeug/*.mjs`: nur ein Kommentar hig.mjs Z. 135); die Absätze
  stehen in `cat` vor bzw. nach der Zuordnung und werden von `checkCatalog` nur auf Nummern gelesen. (4) **`checkCatalog` Z. 83 und 89–90**: ohne
  ‚### Zuordnung alt → neu‘ im Abschnitt 17 meldet es 52-mal ‚alte Regel R-nn ist keiner neuen zugeordnet‘ – also entweder Tabelle nach `ZUORDNUNG.md`
  und `checkCatalog` dort lesen lassen, oder sie unter ‚## Versionsgeschichte‘ stellen und den Schnitt in Z. 82 anpassen.
- **Risiko:** (1)–(3) keins; (4) mittel (Prüfung muss mit, Gegenprobe: eine Zeile der Zuordnung löschen → `doku-regeln` rot).
- **Nachweis:** stand Geschichte im Katalog → steht dann in CHANGELOG/Versionsgeschichte bzw. `ZUORDNUNG.md` → `checkCatalog` (unverändert bzw. angepasst).

### D-43 · Katalog · Reihenfolge der Nummern in Thema 1 und 4

- **Stelle:** Z. 1251–1254: R-1.8, **R-1.10, R-1.9, R-1.7**, dann R-1.11; Z. 1292–1294: R-4.5, **R-4.7, R-4.6**, dann R-4.8. Keine Lücke in irgendeinem Thema.
- **Vorschlag:** die Zeilen aufsteigend sortieren (Nummern bleiben, nur die Reihenfolge der Zeilen). **Leser:** `checkCatalog` liest die Reihenfolge nicht
  (Z. 84 `matchAll`). **Risiko:** keins. **Nachweis:** Reihenfolge → gleiche Regeln, sortiert → `checkCatalog`.

### D-44 · Katalog · G-Regeln, die eindeutig schon automatisch geprüft werden (in der App)

- **G-16** Z. 1393 ‚Filter beim Öffnen und beim Start auf ‚Alle‘‘ (Prüfung ‚Abläufe der App‘): `ReiseLogBuch/tests/ablauf-gesamt.mjs` Z. 177 prüft
  ‚‚Nur erfasste Tage‘ gilt nicht nach dem Start‘ – ohne G-Nummer (C-11).
- **G-8** Z. 1385 ‚Beträge: ‚,00‘ ergänzen, Tausenderpunkt beim Tippen‘: `ReiseLogBuch/tests/regeln-ablauf.mjs` Z. 106 prüft ‚4.850,00‘ – meldet aber als
  ‚R-5.5‘ (Eingabetaste), nicht als Betrag (R-5.1 nennt ‚‚4.850,00 €‘‘ schon, Z. 1306).
- **Vorschlag:** G-8 in R-5.1 aufgehen lassen (R-5.1 nennt das Format bereits; Prüfung um ‚,00 ergänzt‘ erweitern und als R-5.1 melden) und G-16 als neue
  Regel im Thema 4 oder 7 mit der App-Prüfung bzw. einem Baustein-Teil – beides Regeländerung, nur mit ‚Ja‘. Weitere G-Regeln habe ich **nicht** als
  eindeutig prüfbar eingestuft (G-3 Icon-Tabelle wäre gegen `ic(…)`-Aufrufe vergleichbar – Vermutung).
- **Leser:** keiner. **Risiko:** gering (neue Regel braucht eine Prüfung in `tests/`, sonst `checkCatalog` rot – Z. 88).
- **Nachweis:** stand G (Sicht/Abläufe) → steht dann R mit Prüfung → App-Prüfung bzw. Baustein-Prüfung mit Regelnummer.

## 5. Designrichtlinie Reiselogbuch und PROMPT.md (Teil E)

### D-45 · doppelt · Designrichtlinie Reiselogbuch wiederholt Allgemeines (keine Abweichung)

| Stelle RLB-DR | Wortlaut alt | allgemein steht schon | Vorschlag |
|---|---|---|---|
| Z. 16 (Abweichung 1, Spalte ‚Was‘) | ‚…; **Quartier-Links haben die unsichtbare Antippfläche von 44 px**‘ | DR Z. 1196 (16 Nr. 1 ‚kleine Zeichen und Links bekommen eine unsichtbar größere Antippfläche‘), R-3.1 | Halbsatz streichen – keine Abweichung; die Abweichung ist ‚Maps-Links der Lokale nur so hoch wie der Text‘ |
| Z. 17 (Abweichung 2) | ‚– **seit 3.35.0** nur bei Standard; bei größerer Schrift wachsen sie (R-1.10) und die Kapsel wischt seitlich‘ | R-1.10 (wachsen), R-5.4 (Kapsel wischt) | ‚… 40 px breit (in der Kapsel, über dem Minimum von 28 pt), nur bei Textgröße Standard‘ – Rest gilt allgemein |
| Z. 18 (Abweichung 3, Spalte ‚Grund‘) | ‚Entscheidung des Nutzers **mit 3.11.6** (gilt nur für das Reiselogbuch, nicht allgemein)‘ | – (Geschichte) | ‚Entscheidung des Nutzers (gilt nur für das Reiselogbuch)‘ – Datum steht in ‚Entschieden‘ |
| Z. 23–24 (2) | ‚Es gelten R-9.2 bis R-9.4 und die Fall-Tabelle der Designrichtlinie allgemein (15.18)‘ | – | bleibt (Verweis, Art (b)) |

**Leser:** `checkCollab` (RLB-DR ohne Versionsgeschichte: verbotene Sätze – keiner betroffen; Z. 25 ‚Feldnamen im Abgleichbericht (\`labels\`): …‘ bleibt
unverändert); `checkCatalog` (R-3.1, R-1.10, R-5.4 gibt es). **Prüfung** Abweichung 1 `skipTargets` in den App-Prüfskripten (`.ln:not(.q) a`, belegt in
`ablauf-abgleich.mjs` Z. 10). **Risiko:** keins. **Nachweis:** stand in RLB-DR als ‚Abweichung‘ → steht dann nur in DR → R-3.1 hig.mjs.

### D-46 · doppelt · PROMPT.md legt Gestaltung fest, die schon in einer Designrichtlinie steht

PROMPT Z. 5–6 sagt selbst: ‚sie werden hier nur genannt, nie wiederholt‘. Gefunden (Lesen, nicht gezählt):

| PROMPT | Wortlaut alt | steht schon in | Vorschlag |
|---|---|---|---|
| Z. 57 | ‚Die ‚Reset‘-Schaltfläche der iPad-Datumsauswahl bleibt (Systembeschriftung).‘ | DR Z. 250 (6), R-4.11 ‚Systembeschriftungen bleiben‘ | streichen |
| Z. 80, 181 | ‚gewählte eingeschaltet (blau getönt mit Haarlinie)‘ | DR Z. 180–182 (4), R-5.4 | ‚gewählte eingeschaltet (R-5.4)‘ |
| Z. 111 | ‚(Häkchen vorne, dann Icon und Text)‘ | DR Z. 790 (15.6) | streichen |
| Z. 112–113 | ‚Beim Öffnen eines Reiselogbuchs und beim Start gilt immer ‚Alle Tage‘.‘ | DR Z. 720 (15.3 ‚Filter‘), G-16 | ‚(G-16)‘ |
| Z. 117–121 | ‚gelb markiert (ohne blauen Rand) … Künftige Tage sind nie gelb.‘ | DR Z. 354–355 (9), R-6.1; R-7.4 ‚hervorgehoben wird nur Offenes, nie Künftiges‘ | die App-Logik (erste Lücke, heute ohne Gelb) bleibt, ‚(ohne blauen Rand)‘ und ‚Künftige Tage sind nie gelb‘ streichen (R-7.4) |
| Z. 129–131 | iPad hoch/quer Wischen | R-7.5, DR 15.4 Z. 755–758 | siehe D-2 |
| Z. 138 | ‚jedes Neuladen beginnt in der Startliste ‚Reiselogbücher‘ ganz oben ohne blauen Eintrag (R-7.2)‘ | R-7.2, DR 15.17 Z. 945 | ‚Start in der Startliste (R-7.2); ein Reiselogbuch öffnet an seiner Startposition (4) …‘ |
| Z. 140–143 | ‚fest stehende Leiste … (darunter klein und grau die Anzahl) und der Kapsel [plus \| ellipsis] …, ohne großen Titel; … Backup-Kachel fest am unteren Rand …, die Kacheln laufen dahinter durch‘ | DR 15.17 Z. 942–944 (‚Startliste = Seitenleiste‘), R-2.2, R-7.1, R-9.1 | ‚**Startliste = Seitenleiste** (Komponente, 15.17): ‚Reiselogbücher‘, Kacheln gruppiert nach dem Jahr des Reisebeginns wie am iPad; Langes Drücken … Leertexte: 2.‘ |
| Z. 148–150 | ‚Text der Bezeichnungen halbfett in Textgröße und Textfarbe, Emojis so groß wie im Wert und in einer Zeile, mittig zur ersten Zeile des Werts (AppDesign R-6.5); Linien wie im Kasten mit Feldern (R-6.1)‘ | R-6.5, R-6.1 | ‚Kasten mit Feldern (R-6.1, R-6.5)‘ |
| Z. 151, 228–229 | ‚der angetippte Kasten bleibt blau, solange die Tageserfassung offen ist‘ / ‚der Kasten bleibt blau, solange das Fenster offen ist‘ | DR Z. 185–187 (4 ‚Gewähltes bleibt eingefärbt, solange es sichtbar ist‘), R-3.3 | streichen (R-3.3) |
| Z. 154–157 | Seitenwechsel, Blatt: ‚nach unten ziehen schließt wie x, mit Änderungen fragt es‘ | R-7.5, R-4.6 | nur die Liste der Fenster als Blatt (Tageserfassung, …) behalten, ‚(R-4.6)‘ |
| Z. 158 | ‚Wetter-Symbole 40 px breit (Abweichung 2, bei Standard-Textgröße)‘ | RLB-DR Abweichung 2 | ‚(Abweichung 2)‘ |
| Z. 176–178 | ‚Kopfzeile: x · … darunter grau ‚Automatisch gespeichert um hh:mm‘ · Kapsel [chevron-left \| chevron-right] … · Häkchen. **Automatisches Speichern alle 10 Sekunden.**‘ | DR Z. 278–279 (7 ‚Erfassungsfenster‘); R-5.10 ‚**spätestens** 10 s‘ | ‚Erfassungsfenster (7, R-5.10); Titel Wochentag mit vollem Datum (‚Sonntag, 04.10.2026‘)‘ – ‚alle 10 Sekunden‘ weicht im Wortlaut von R-5.10 ab, auch Z. 228 |
| Z. 206–208 | ‚Verhalten wie Designrichtlinie allgemein 8: wischen, Häufigkeit, lange drücken entfernt – Ziehen nicht (R-3.5) –, rotate-ccw setzt zurück, Anhängen in der Zeile‘ | DR Z. 336–341 (8), G-9, R-3.5 | ‚(Designrichtlinie allgemein 8, G-9)‘ – Achtung: nicht ‚siehe Designrichtlinie allgemein 8‘ schreiben (`checkCollab` Z. 170) |
| Z. 222 | ‚Quartier-Links haben die unsichtbare Antippfläche von 44 px (R-3.1), Links der Lokale nicht (Abweichung 1)‘ | R-3.1, RLB-DR Abweichung 1 | ‚Links der Lokale: Abweichung 1.‘ |
| Z. 230–231 | ‚die Eingabetaste heißt ‚Fertig‘ und schließt die Tastatur (R-5.5)‘ | R-5.5 | ‚(R-5.5)‘ |
| Z. 233 | ‚‚Nächte‘ und ‚Preis‘ rechtsbündig‘ | DR Z. 361–362 (9 ‚Zahlenspalten rechtsbündig‘), R-6.7 | streichen (R-6.7) |
| Z. 250–252 | ‚die Vorschau zeigt die Nummer der nächsten Datei, ohne den Zähler zu erhöhen‘ | DR Z. 370 (10 ‚sie erhöht keinen Zähler‘) | ‚… zeigt die Nummer der nächsten Datei (10)‘ |
| Z. 255 | ‚dezent ‚Ausgabe V003 erstellt am TT.MM.JJJJ um hh:mm‘‘ | DR Z. 377–378 (10) | streichen (R-6.2 ‚Mustertabelle‘) |
| Z. 259–260 | ‚Hochformat (Safari ignoriert die Querformat-Vorgabe), weißer Seitenhintergrund‘ | DR Z. 378–379 (10 ‚PDF im Hochformat, weißer Seitenhintergrund‘) | ‚PDF nach 10; nur das Reiselogbuch, ohne Seitenleiste‘ |
| Z. 264–268 | ‚Einmal am Tag: nur solange heute auf diesem Gerät noch kein Backup erstellt wurde …, steht die gelbe Backup-Kachel; danach verschwindet sie, um 0:00 …‘ | R-9.1, DR 15.19 Z. 1066–1071 | ‚**Backup** (R-9.1, R-9.2, 15.19): Name ‚Ω Backup Reiselogbuch …‘; Erinnerung nach der Ausgabe ‚Denk daran …‘‘ |
| Z. 273–274 | ‚Beim Start fragt die App immer bei GitHub nach einer neuen Version; ohne Netz oder bei hängendem Netz (mehr als 3 s) läuft die gespeicherte Version‘ | DR Z. 404–408 (11), R-1.5 | ‚**Offline** (R-1.5, 15.20).‘ |

**Leser:** `checkCollab` (PROMPT ohne Versionsgeschichte): kein vorgeschlagener Wortlaut enthält ‚etwa 5 Punkte‘, ‚werden ersetzt.‘, ‚kein Teilen, kein Login‘ oder
‚siehe Designrichtlinie allgemein \d‘; die Versionszeile Z. 3 bleibt. `checkCatalog`: genannt werden nur vorhandene Nummern (R-1.5, R-3.1, R-3.3, R-4.6, R-5.4,
R-5.5, R-5.10, R-6.1, R-6.2, R-6.5, R-6.7, R-7.2, R-7.4, R-7.5, R-9.1, R-9.2). **Prüfung:** die jeweilige Regel; PROMPT selbst prüft nur `checkCollab`.
**Risiko:** gering – PROMPT ist die Funktionsbeschreibung für Claude; wer nur PROMPT liest, muss dann der Nummer folgen (so verlangt es DR 12, Z. 430).
**Nachweis:** stand in PROMPT und DR → steht dann in DR, PROMPT nennt die Nummer → Prüfung der Regel.

## 6. Geschichte im Regeltext (Teil C)

### D-47 · Geschichte im Regeltext · ‚seit X.Y.Z (Kennung)‘ – 20 Stellen in DR, 16 in PROMPT, 1 in RLB-DR

- **Stellen DR** (`geschichte.mjs`): Z. 48 ‚(seit 4.35.0, APD-43 Teil 1)‘, Z. 75 ‚(seit 4.35.0)‘, Z. 91 ‚(R-1.9, seit 4.35.0, APD-43 H1–H5)‘, Z. 325 ‚(seit 4.31.0,
  APD-65)‘, Z. 326 ‚(R-5.2, seit 4.31.0, APD-64)‘, Z. 527 ‚seit 4.56.0, APD-115/V-3‘, Z. 538 ‚(seit 4.32.2, APD-73, P-69/3 iPhone quer)‘, Z. 570 ‚(R-4.6, seit
  4.32.0)‘, Z. 571 ‚seit 4.32.1, APD-71‘, Z. 575 ‚(seit 4.32.2, APD-73 – am Rand ging der Finger zuerst nach oben, 244 → 76 → 302, …)‘, Z. 583 ‚(seit 4.49.1, …)‘,
  Z. 588 ‚(seit 4.50.0, …)‘, Z. 864 ‚(seit 4.35.0, R-5.3)‘, Z. 905 ‚(seit 4.37.0, R-1.10)‘, Z. 907 ‚(seit 4.45.0, R-6.6)‘, Z. 989 ‚(seit 4.32.1, APD-71; …)‘, Z. 991
  ‚(seit 4.32.2, APD-73)‘, Z. 994 ‚(seit 4.38.0, APD-72, Variante B …)‘, Z. 1130 und Z. 1150 ‚(seit 4.38.0, RLB-103)‘. Dazu Z. 1251 (R-1.8, Spalte ‚Gerät‘):
  ‚(keine VoiceOver-Prüfung am Gerät, **Nutzer 23.10.2026**)‘.
- **Stellen PROMPT:** Z. 48 ‚(seit 3.48.0 leerer Zustand …)‘, Z. 83 ‚(seit 3.41.0, RLB-110)‘, Z. 102 ‚seit 3.44.0, RLB-114‘, Z. 106 ‚(seit 3.41.0, RLB-108)‘, Z. 117
  ‚(R-7.4, seit 3.30.0 RLB-98)‘, Z. 156 ‚(R-4.6, seit 3.30.0 RLB-99)‘, Z. 165–166 ‚(Entscheidung des Nutzers 18.10.2026)‘, ‚(seit 3.27.0)‘, Z. 167 ‚(seit 3.41.0,
  AppDesign APD-91)‘, Z. 183 ‚(seit 3.55.0, RLB-123)‘, Z. 189–190 ‚(seit 3.41.0, RLB-110; …)‘, ‚seit 3.42.0 (RLB-111)‘, Z. 200, 202, 232 (zweimal), 235–236 ‚seit
  3.42.1 (RLB-112)‘, Z. 239 ‚seit 3.56.0 (RLB-121)‘. Dazu Z. 85 ‚(bestehende Reiselogbücher: … Essen wie bisher …)‘ (Übernahme alter Daten – gehört als
  Datenmodell-Hinweis zu `normalize`, nicht zur Gestaltung).
- **Stelle RLB-DR:** Z. 17 ‚– seit 3.35.0 nur bei Standard‘ (D-45).
- **Gegenstelle:** ZA Z. 85–86 (0 Nr. 3): ‚Im Regeltext steht nur, was heute gilt; Geschichte steht in Versionsgeschichte und CHANGELOG.‘
- **Vorschlag:** die Angabe ‚seit X.Y.Z‘ samt Kennung streichen; eine Kennung bleibt nur, wo sie auf eine Quelle zeigt, die man nachlesen muss (Abschnitt 13:
  Messung, Testfall-Liste, z. B. Z. 527 ‚APD-115/V-3‘ → ‚(Testfall-Liste `arbeit/APD-115 Testfall-Liste.md`)‘). Beispiel Z. 905: ‚- **Große Schrift** (R-1.10): …‘.
  Z. 575 ‚– am Rand ging der Finger zuerst nach oben, 244 → 76 → 302, entschieden war nach 8 px‘ ist Messgeschichte → streichen oder als Quelle ‚(Messung P-69/3)‘.
- **Prüft heute:** 0 Nr. 3 nennt `checkCatalog`, `checkCollab` – keine erkennt ‚seit‘ (F-39). **Leser:** `checkSchema` (Kennungen – Streichen macht nichts rot;
  wer eine Kennung als Quelle behält, braucht eine gültige mit vorhandener Datei). **Risiko:** keins. Einsparung DR rund 0,8 KB (`lesekosten.mjs`: 20 Angaben,
  815 Bytes). **Nachweis:** stand im Regeltext → steht in Versionsgeschichte und CHANGELOG (schon heute, z. B. DR-Versionsgeschichte 4.35.0) → Selbstkontrolle.

### D-48 · Geschichte im Regeltext · ‚wie bisher‘ in Regeln und Bau

- **Stellen:** Z. 716 (15.3): ‚VoiceOver nennt jeden Knopf **wie bisher** (R-1.8)‘; Z. 1000 (15.17): ‚(Schließen über x bzw. `dlg.close()` **wie bisher**)‘; Z. 1282
  (R-3.9): ‚‚Transparenz reduzieren‘ des Geräts: deckend **wie bisher**‘; Z. 1171 (D-24).
- **Vorschlag:** Z. 716 ‚VoiceOver nennt jeden Knopf mit Namen (R-1.8)‘; Z. 1000 ‚(Schließen über x bzw. `dlg.close()`)‘; R-3.9 ‚… des Geräts: deckend (Grundfarbe
  ganz), wo der Browser es meldet …‘ – ‚wie bisher‘ setzt voraus, dass man den früheren Stand kennt.
- **Prüft heute:** R-3.9 `masseStile`, `checkGlas`. **Leser:** keiner. **Risiko:** keins. **Nachweis:** stand ‚wie bisher‘ → steht dann der Zustand → Prüfung der Regel.

### D-49 · Geschichte im Regeltext · Sitzungsnummern und Usertest-Kennungen als Quelle in 13

- **Stellen:** Z. 541 ‚(R-3.4, gemessen 24.10.2026 in WebKit und Chromium der Prüfumgebung, **Sitzung 0044**)‘; Z. 546 ‚(R-5.6, gemessen am iPad hoch, Safari 26.6.3,
  29.10.2026, **Sitzung 0053** – `arbeit/APD-81 Klärung.md` …)‘; Z. 453 ‚(Auskunft des Nutzers am iPhone, P-75/6, 25.10.2026)‘.
- **Gegenstelle:** Z. 435 (13): ‚Gemessene bzw. belegte Eigenheiten **mit Quelle**‘ – Quelle ist gewollt; eine Sitzungsnummer ist aber keine nachlesbare Quelle
  (die Datei `arbeit/APD-81 Klärung.md` schon).
- **Vorschlag:** Sitzungsnummern streichen, Datum, Gerät, Safari-Version und Datei bleiben. **Leser:** keiner. **Risiko:** keins.
- **Nachweis:** stand Sitzung als Quelle → steht dann Messdatum und Datei → Safari-Modell in `safari.mjs` (Zusammenarbeit 0 Nr. 5).

## 7. Lesekosten (Teil F)

### D-50 · Lesekosten · Größe je Hauptabschnitt der Designrichtlinie allgemein – was davon reine Geschichte ist

Gemessen mit `zaehlen.mjs` (Bytes der Zeilen bis zur nächsten Überschrift) und `lesekosten.mjs`; Datei gesamt **215,7 KB** (220 911 Bytes laut `wc -c`).

| Teil | Zeilen | KB | davon reine Geschichte | Beleg |
|---|---|---|---|---|
| 13 Safari und iPad | 433–602 | 20,5 | ~0,3 KB ‚seit …‘ (Z. 527, 538, 570–575, 583, 588); Quellenangaben ~1,0 KB sind gewollt | `lesekosten.mjs`: Quellen in Klammern 1055 Bytes von 20 978 |
| 15 Komponenten | 632–1187 | 59,7 | ~0,4 KB ‚seit …‘ (Z. 864, 905, 907, 989–994, 1130, 1150) – dazu Doppeltext zum Katalog (D-26 bis D-40), nicht Geschichte | `geschichte.mjs` |
| 16 HIG-Checkliste | 1188–1224 | 6,3 | Spalte ‚Entschieden‘ und ‚Wunsch des Nutzers (P-…, APD-…)‘ – Gültigkeitsangabe oder Geschichte, D-17 | – |
| 17 Regelkatalog (bis vor ‚Regeln ohne …‘) | 1225–1369 | 40,3 | Kennungen und Testfallnummern in der Spalte ‚Prüfung‘ (z. B. ‚APD-72/D-1 bis APD-72/D-15‘, ‚APD-115/M-1 bis M-11‘) – sind Prüfbelege, keine Geschichte | – |
| Regeln ohne automatische Prüfung | 1370–1400 | 2,1 | 0,5 KB: acht ‚ersetzt durch‘-Zeilen (343 B), ‚Aus dem Katalog genommen‘ (138 B) | D-42 |
| Zuordnung alt → neu | 1401–1424 | 1,4 | **ganz** (1473 B); davon 409 B Absatz ‚Spalte ersetzt (bis 4.28.1)‘ | D-42 (Tabelle braucht `checkCatalog`) |
| Versionsgeschichte | 1425–1539 | 43,3 | **ganz** (44 329 B, 115 Zeilen = 20 % der Datei) | `lesekosten.mjs` |

**Summe reine Geschichte in DR: rund 46 KB von 216 KB (21 %)** – 43,3 Versionsgeschichte + 1,4 Zuordnung + 0,5 G-Zeilen/R-50 + 0,8 ‚seit‘.

- **Vorschlag:** Versionsgeschichte in eine eigene Datei `README - Designrichtlinie allgemein Versionsgeschichte.md` (wie F-26 für die Zusammenarbeit), in DR
  nur ‚Versionsgeschichte: eigene Datei‘. **Leser:** `checkCatalog` und `checkCollab` schneiden mit `noHistory` an ‚\n## Versionsgeschichte‘ – fehlt die Überschrift,
  lesen sie die ganze Datei: dann dürfen in DR keine alten Nummern `R-nn` mehr außerhalb des Katalogs stehen (heute stehen sie in der Versionsgeschichte, z. B.
  ‚R-01‘, ‚R-05‘) – mit dem Auslagern verschwinden sie mit, also kein Problem. `checkDocs` und `veroeffentlichen.mjs` Z. 106 lesen nur die Zeile
  ‚\*\*Version X.Y.Z\*\* · Stand …‘ (bleibt). `version.mjs` `TEXTE` (Z. 21) legt nur DR und ZA in die feste Fassung – die neue Datei käme nicht mit (gewollt
  oder `TEXTE` ergänzen). **Risiko:** gering. Wird DR heute nur gezielt gelesen (CLAUDE.md: ‚nur die Überschriften‘), spart das beim Lesen einzelner
  Abschnitte nichts; es spart, wenn jemand die ganze Datei liest oder sucht (grep-Treffer in alter Geschichte).
- **Nachweis:** stand in DR → steht dann in eigener Datei → `checkCatalog`/`checkCollab` (ohne Versionsgeschichte), `checkFassungen` (Prüfsummen).

### D-51 · Lesekosten · Designrichtlinie Reiselogbuch: 85 % Versionsgeschichte, 28 Zeilen ‚keine (eigene) Abweichung‘

- **Stellen:** RLB-DR Z. 1–28 Regelteil **3 236 Bytes**, Z. 29–122 Versionsgeschichte **18 431 Bytes** (95 Zeilen); davon **28 Zeilen** mit ‚keine (eigene) Abweichung‘
  – sie beschreiben nur, was AppDesign geändert hat (z. B. Z. 33–38, 41–47, 50–61), stehen also schon in der AppDesign-Versionsgeschichte und im CHANGELOG.
  PROMPT.md: 27 970 Bytes.
- **Vorschlag:** künftig keine Zeile in der RLB-DR-Versionsgeschichte, wenn sich an den Abweichungen nichts ändert (die Version steigt laut
  `veroeffentlichen.mjs` Z. 134 trotzdem mit – dann eine Sammelzeile ‚angepasst an AppDesign X.Y.Z, keine Abweichung‘ oder gar keine); die 28 alten Zeilen in die
  CHANGELOG-Einträge der App verweisen lassen oder bündeln.
- **Leser:** `veroeffentlichen.mjs` Z. 134 (Zeile ‚\*\*Version …\*\* · Stand …‘ und ‚(Designrichtlinie allgemein aus AppDesign (Version X.Y.Z))‘ in RLB-DR Z. 5 –
  **dieser Wortlaut muss bleiben**); `checkCollab` schneidet die Versionsgeschichte ab. **Risiko:** keins.
- **Nachweis:** stand in RLB-DR → steht im CHANGELOG der App und der AppDesign-Versionsgeschichte → –.

## Die fünf wichtigsten

1. **D-2 / D-3** Seitenleiste am iPad hoch: R-7.5 (‚ausblenden quer nur‘), R-4.7 und PROMPT (‚nach links wischen schiebt sie weg‘, ‚darübergelegte Seitenleiste‘)
   beschreiben einen Stand vor APD-97; 15.4 und der Code (`sideOver` nie wahr) sagen ‚hoch wie quer‘.
2. **D-1** R-1.10 nennt ‚keine Großanzeige‘ als Abweichung – R-2.6 und 16 legen die Großanzeige fest.
3. **D-7** ‚Blau gefüllt nur im Fenster‘ (4, R-3.3) – Backup-Knopf, fester Hinweis, gewählte Kachel, Sprechblase sind auch blau gefüllt (Regeländerung nötig).
4. **D-6 / D-18** Bezeichnung im Kasten: Footnote und grau (3, 15.17) gegen Textgröße, Textfarbe, halbfett (15.10, R-6.5) und ‚halbfett nur Überschriften‘ (R-5.8).
5. **D-26 mit D-27 bis D-40** Grundsatz ‚Regeln nur im Katalog‘ gilt nicht: 12 Absätze wiederholen ≥ 30 % ihrer Regel wörtlich; dreifach beschrieben (Blatt, Start,
   ‚Nach oben‘, Backup) laufen die Fassungen schon auseinander (D-8, D-14).

## Nicht oder nur stichprobenartig geprüft

- **Doppeltext nur gemessen, wo der Absatz die Regelnummer nennt** (`doppelt.mjs`): Absätze ohne Nummer, die eine Regel wiederholen, finde ich so nicht; die
  Liste D-27 bis D-40 ist eine Auswahl nach Überdeckung, keine vollständige Liste aller 215 Paare (alle Paare: `befund/d/doppelt.txt`).
- **Komponente gegen Komponente** (15.x untereinander) nur beim Lesen verglichen, nicht gemessen; gefunden D-8, D-12, D-13, D-14, D-40.
- **Text gegen Code** nur dort nachgesehen, wo zwei Textstellen sich widersprachen (welche gilt?) – `design.css`/`ui.js` nicht systematisch gegen die Maße in
  2, 3, 15 geprüft (z. B. alle Radien, Breiten, Dauern). Die Maße, die ich nachgesehen habe, stimmen außer in D-6, D-10, D-12, D-13 (Gewicht), D-8.
- **Abschnitt 13** nur auf Geschichte und Verweise gelesen, die Messwerte selbst (Pixel, ms, Safari-Versionen) nicht gegen `safari.mjs` abgeglichen.
- **15.18 Fall-Tabelle** (20 Fälle) nicht gegen `abgleich.mjs` bzw. App-`ablauf-abgleich-faelle.mjs` abgeglichen (dazu C-10).
- **Versionsgeschichten** (DR, RLB-DR) nicht auf innere Widersprüche gelesen – nur gemessen (Teil F). Einzelfall gesehen: RLB-DR Z. 41 (3.42.1) ‚R-6.5: Bezeichnung
  im Kasten mit Feldern normal‘ widerspricht dem heutigen R-6.5 (600) – Geschichte, kein Befund.
- **Zusammenarbeit** nur 0 Nr. 3, 4, 10, 23 und 2.6 (Auftrag); der Rest ist Befund F.
- **Code-Kommentare** in `ui.js` mit überholtem Stand (z. B. Z. 2396–2399 ‚Am iPad hoch … darübergelegte Seitenleiste … Wischen nach links … schiebt sie weg‘) nur
  nebenbei gesehen – Sache von Befund U.
- **Ob `checkNavigation` und `checkFokus` das Wegwischen bzw. Esc an einer darübergelegten Seitenleiste noch prüfen** (D-2, D-3): nicht nachgesehen.
- **Info-Icon (15.14, G-18):** das Icon `info` steht in `ui.js` Z. 46, eine Verwendung in `ReiseLogBuch/index.html` habe ich nicht gefunden (`grep "ic('info')"`) –
  ob die Komponente noch gebraucht wird, nicht weiter verfolgt.
- **‚Was die Prüfungen lesen‘** für DR, RLB-DR, PROMPT vollständig in `doku.mjs`, `version.mjs`, `veroeffentlichen.mjs` gesucht (`grep readFileSync`, Dateinamen);
  in `werkzeug/` lesen nur `veroeffentlichen.mjs` und `veroeffentlichen-selbsttest.mjs` (Z. 104, nur die App-README) die Richtlinien (`grep -l Designrichtlinie`).
