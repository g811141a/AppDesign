# RLB-120 – Schrift- und Smiley-Größe in der Tageskachel – Klärung

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0103‘ · Backlog Reiselogbuch RLB-120 (Prio 2)

## Wunsch (Nutzer 06.11.2026, Sitzung 0083)

Spalte 1 und Spalte 2 der Tageskachel haben unterschiedliche Schriftgrößen, auch die Smileys sind verschieden groß – Ursache unbekannt (messen).

## Gemessen (Sitzung 0103)

Reiselogbuch 3.54.0, WebKit, Textgröße Standard. Tageskachel = Kasten `.box.day` (iPhone immer, iPad ab AX1). Bild: `arbeit/RLB-120 heute iPhone hoch.png`.

| Stelle | Schrift | Emoji-Höhe |
|---|---|---|
| Kopf: Datum | 17 px, fett | – |
| Kopf: Wetter | **18 px** | 21 px |
| Spalte 1: Wörter (‚Verlauf‘, ‚km‘) | 17 px | – |
| Spalte 1: Emojis der Bezeichnung (🙂☹️😉, 🚶🏽‍♂️, 🍽️🍷☕️, 😴💤) | **13 px** (`--t-footnote`) | **16 px** |
| Spalte 2: Text und Smileys (😉 gut, ☹️ Regen, 📍) | 17 px | 20 px |

Am iPad (Tabelle, iPad quer): alles 17 px, nur das Wetter in Spalte 1 18 px.

**Ursache:** `.box .kv .k` hat `font-size: var(--t-footnote)` (AppDesign `design.css`, Kasten mit Feldern 15.10). Seit R-6.5 stehen die **Wörter** der
Bezeichnung in Textgröße (`.k.word`, `.k .w`), die **Emojis** der Bezeichnung aber weiter in Fußnotengröße. Deshalb sind die Smileys in Spalte 1
kleiner als in Spalte 2. Das Wetter im Kopf ist mit fest 18 px (`.box.day .h .wx`, `index.html`) etwas größer als alles andere.

## Frage 1 – welcher Unterschied ist gemeint?

- **a) Emojis in Spalte 1 kleiner als in Spalte 2** (13 statt 17 px) – Empfehlung: das ist der deutlich sichtbare Unterschied (siehe Bild).
- **b) Wetter im Kopf größer als die Smileys** (18 statt 17 px).
- **c) beides**.

**Ergebnis Frage 1:** c) beides (Nutzer 08.11.2026, Sitzung 0103).

## Vorschlag

- **Spalte 1:** die Emojis der Bezeichnung in Textgröße wie Spalte 2 (`.box .kv .k` `font-size: var(--t-body)` statt `--t-footnote`, AppDesign
  `design.css`); damit drei Emojis in eine Zeile passen, wird Spalte 1 breiter: `calc(90px * var(--f-body))` statt 74 px.
- **Kopf:** das Wetter in Textgröße (`.box.day .h .wx` `font-size: var(--t-body)` statt `calc(18px * var(--f-body))`, Reiselogbuch `index.html`).
- Apple-Abgleich: belegt ist nur unser Katalog – R-6.5 (Bezeichnung im Kasten in Textgröße; die Emojis waren dort bisher nicht erfasst), R-1.3 Schrift,
  R-6.3 nichts ragt hinaus.

## Muster (nur hell)

`arbeit/RLB-120/index.html` – zwei echte Tageskacheln des Reiselogbuchs 3.54.0 (kopiert), heute und neu nebeneinander; oben die Textgröße (Standard,
größer = xxl, groß = xxxl, sehr groß = ax3).

## Testfall-Liste (Testfall (automatisch), `arbeit/RLB-120 Muster prüfen.mjs`, Chromium und WebKit, vier Lagen, Textgröße l, xxl, xxxl, ax3)

| Nr. | Fall | Erwartet |
|---|---|---|
| RLB-120/T-1 | Emojis der Bezeichnung in Spalte 1 | gleich hoch wie die Smileys in Spalte 2 (±1 px) |
| RLB-120/T-2 | Wetter im Kopf | gleich hoch wie die Smileys in Spalte 2 (±1 px) |
| RLB-120/T-3 | Bezeichnung | ragt nicht über Spalte 1 hinaus |
| RLB-120/T-4 | Emojis der Bezeichnung | in einer Zeile (außer bei ‚untereinander‘, ts-um) |
| RLB-120/T-5 | Kachel | ragt nicht hinaus |
| RLB-120/T-6 | Gegenprobe `PRUEF_V=heute` | T-1 und T-2 rot |

Ergebnis (08.11.2026, Sitzung 0103): Chromium und WebKit **alles in Ordnung**; Gegenprobe in beiden rot (62 Fehler).

## Anleitung Muster am Gerät

**Link:** https://g811141a.github.io/AppDesign/arbeit/RLB-120/index.html – Safari, hell.

1. iPhone **hoch**: den Link öffnen. Erwartet: zwei Tageskacheln ‚heute‘, darunter zwei ‚neu‘.
2. Die Kacheln ‚neu‘ ansehen. Erwartet: die Emojis in Spalte 1 (🙂☹️😉, 🚶🏽‍♂️, 🍽️🍷☕️, 😴💤) sind so groß wie die Smileys in Spalte 2 und stehen je in einer
   Zeile; das Wetter oben rechts ist ebenso groß; Spalte 1 ist etwas breiter.
3. Oben ‚Text größer‘, ‚Text groß‘ und ‚Text sehr groß‘ antippen. Erwartet: in ‚neu‘ bleiben alle Emojis gleich groß, nichts ragt hinaus.
4. iPad **quer**: die Schritte 1 bis 3 wiederholen (‚heute‘ und ‚neu‘ nebeneinander). Erwartet: wie oben.

## Muster ok – dazu Spalte 1 grau (Nutzer 08.11.2026, Sitzung 0103)

- **Ergebnis:** Muster iPhone hoch und iPad quer **ok**; dazu: ‚in der Tageskachel die 1. Spalte mit derselben grauen Hintergrundfarbe hinterlegen wie
  die 1. Zeile in der Tabelle im Reiselogbuch‘ – gleich mit.
- **Umgesetzt im Muster:** Spalte 1 in `--th-bg` (Kopfzeile der Tabelle, hell #e5e5ea), vom linken Rand der Kachel bis zur Linie und ohne Lücke bis
  unten; die Zeilenlinien gehen von Rand zu Rand. Bei ‚untereinander‘ (große Schrift) ist die Bezeichnung ein grauer Streifen über dem Wert.
- **Prüfung ergänzt:** RLB-120/T-7 Spalte 1 durchgehend grau vom Rand an · T-8 der Wert hat links mindestens 16 px Abstand. Chromium und WebKit **alles
  in Ordnung**, Gegenprobe rot (94 Fehler). Beim Bauen des Musters gefunden: Spalte 1 rechnete mit festen 7 px, die Zeile mit der Schrift – bei großer
  Schrift entstand eine Lücke (jetzt beide mit der Schrift).

**Link:** https://g811141a.github.io/AppDesign/arbeit/RLB-120/index.html – Safari, hell.

1. iPhone **hoch**: den Link öffnen (neu laden). Erwartet: in den Kacheln ‚neu‘ ist Spalte 1 grau wie die Kopfzeile der Tabelle, vom linken Rand bis
   zur Linie, von der ersten Zeile bis ganz unten ohne Lücke.
2. Oben ‚Text sehr groß‘ antippen. Erwartet: jede Bezeichnung als grauer Streifen über ihrem Wert, der Wert mit Abstand zum linken Rand.
3. iPad **quer**: die Schritte 1 und 2 wiederholen. Erwartet: wie oben.

## Linie vor der ersten Zeile, Spalte 1 fett (Nutzer 08.11.2026, Sitzung 0103)

- **Ergebnis:** Farbe ok; dazu ‚vor der ersten Zeile eine Linie einziehen und alle Texte in der ersten Spalte fett formatieren‘.
- **Umgesetzt im Muster:** Linie unter dem Kopf vor der ersten Zeile, von Rand zu Rand (wie die anderen Zeilenlinien); alle Texte in Spalte 1 fett
  (600, wie die Kopfzeile der Tabelle).
- **Hinweis:** ‚fett‘ widerspricht **R-6.5** (‚Text in der ersten Spalte normal (400)‘) – R-6.5 wird geändert; den Wortlaut lege ich vor (0 Nr. 29).
- **Prüfung ergänzt:** RLB-120/T-9 Linie vor der ersten Zeile · T-10 Text in Spalte 1 fett. Chromium und WebKit **alles in Ordnung**, Gegenprobe rot
  (158 Fehler).

**Link:** https://g811141a.github.io/AppDesign/arbeit/RLB-120/index.html – Safari, hell.

1. iPhone **hoch**: den Link öffnen (neu laden). Erwartet: in ‚neu‘ unter dem Datum eine Linie von Rand zu Rand; ‚Verlauf‘ und ‚km‘ in Spalte 1 fett.
2. iPad **quer**: Schritt 1 wiederholen. Erwartet: wie oben.

## Linien schwarz (Nutzer 08.11.2026, Sitzung 0103)

- **Ergebnis:** Linie und fett ok; dazu ‚in der Tageskachel die Linie zwischen den Zeilen in Schwarz, ebenso in der Überschrift der
  Reiselogbuchtabelle‘.
- **Umgesetzt im Muster (nur hell):** Tageskachel – alle waagrechten Linien zwischen den Zeilen (auch vor der ersten) `#000`; die senkrechte Linie
  nach Spalte 1 bleibt grau. Tabelle der Tage (iPad, neu im Muster) – Linie unter der Kopfzeile und die Linien zwischen den Spalten der Kopfzeile `#000`.
- **So macht es Apple:** Trennlinien sind in Apple-Apps hellgrau (Systemfarbe ‚separator‘); schwarze Linien sind eine bewusste Abweichung (Wunsch).
  Vermutung, nicht in dieser Sitzung nachgeschlagen. Für ‚dunkel‘ fehlt noch eine Farbe (Muster nur hell).
- **Prüfung ergänzt:** RLB-120/T-11 Linien zwischen den Zeilen schwarz · T-12 Linien der Kopfzeile der Tabelle schwarz. Chromium und WebKit **alles in
  Ordnung**, Gegenprobe rot (206 Fehler).

**Link:** https://g811141a.github.io/AppDesign/arbeit/RLB-120/index.html – Safari, hell.

1. iPhone **hoch**: den Link öffnen (neu laden). Erwartet: in den Kacheln ‚neu‘ sind die Linien zwischen den Zeilen schwarz.
2. iPad **quer**: ganz nach unten zu ‚Tabelle der Tage (iPad)‘ rollen. Erwartet: in ‚neu‘ sind die Linie unter der Kopfzeile und die Linien zwischen
   ‚Tag‘, ‚Verlauf‘ … schwarz; sonst wie ‚heute‘.

## Schwarz zurück, Grau nur in der Zelle (Nutzer 08.11.2026, Sitzung 0103)

- **Ergebnis:** ‚Nicht ok‘ – ‚Setze die schwarzen Linien wieder zurück wie es vorher war. Außerdem hinterlege die 1. Spalte in der Tageskachel nur im
  Bereich der Tabellenzelle mit der Hintergrundfarbe. Zum linken und unteren Rand aber nicht.‘
- **Umgesetzt im Muster:** Linien wieder grau (`--line`), die Tabelle der Tage ist wieder aus dem Muster; Spalte 1 grau nur in ihrer Zelle – links mit
  16 px Abstand zum Rand der Kachel, unten endet das Grau an der Zelle; die Zeilenlinien bleiben von Rand zu Rand, Linie vor der ersten Zeile und Spalte 1
  fett bleiben.
- **Prüfung:** T-11 und T-12 entfallen; T-7 jetzt ‚grau nur in der Zelle‘ (Abstand links ≥ 15 px, unten ≥ 4 px, ohne Lücke zwischen den Zeilen).
  Chromium und WebKit **alles in Ordnung**, Gegenprobe rot (158 Fehler).

**Link:** https://g811141a.github.io/AppDesign/arbeit/RLB-120/index.html – Safari, hell.

1. iPhone **hoch**: den Link öffnen (neu laden). Erwartet: in ‚neu‘ alle Linien grau; Spalte 1 grau nur in der Zelle – links ein weißer Rand, unten
   endet das Grau mit der letzten Zelle, darunter weiß.
2. Oben ‚Text sehr groß‘ antippen. Erwartet: jede Bezeichnung als grauer Streifen über ihrem Wert, links und rechts mit weißem Rand.
3. iPad **quer**: die Schritte 1 und 2 wiederholen. Erwartet: wie oben.

## Linien wie heute (Nutzer 08.11.2026, Sitzung 0103)

- **Ergebnis:** ‚Die Linien sollen nicht bis zum linken und rechten Rand reichen, sondern so wie im Muster heute.‘
- **Umgesetzt:** alle Zeilenlinien (auch die neue Linie vor der ersten Zeile) wieder mit 16 px Abstand zum linken und rechten Rand wie heute; Spalte 1
  grau nur in ihrer Zelle. Prüfung T-9 jetzt ‚Linie vor der ersten Zeile mit 16 px Abstand zum Rand‘. Chromium und WebKit **alles in Ordnung**,
  Gegenprobe rot (158 Fehler).

**Link:** https://g811141a.github.io/AppDesign/arbeit/RLB-120/index.html – Safari, hell.

1. iPhone **hoch**: den Link öffnen (neu laden). Erwartet: in ‚neu‘ reichen die Linien wie in ‚heute‘ nicht bis zum Rand; die erste Linie steht unter
   dem Datum; Spalte 1 grau nur in der Zelle, fett.
2. iPad **quer**: Schritt 1 wiederholen. Erwartet: wie oben.

## Linie ganz unten (Nutzer 08.11.2026, Sitzung 0103)

- **Ergebnis:** ‚Linie ganz unten fehlt noch.‘ – **Umgesetzt:** Linie auch nach der letzten Zeile, mit Abstand zum Rand wie die anderen. Prüfung
  RLB-120/T-11 ‚Linie nach der letzten Zeile‘.
- **Link und Schritte:** wie oben; zusätzlich Erwartet: unter der letzten Zeile (😴💤) eine Linie wie zwischen den Zeilen.

## Offene Usertests

- **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – ok bis auf **P-100/1** (→ RLB-123, kommt mit 3.55.0).

## Verlauf statt Grau (Nutzer 08.11.2026, Sitzung 0104)

- **Rückmeldung zur Linie ganz unten:** ‚Die Hintergrundfarbe in der ersten Spalte der Tageskachel ist nicht ansprechend.‘ Wunsch: drei Muster, in denen
  die Hintergrundfarbe von links nach rechts von Weiß nach Grau verläuft, mit unterschiedlichem Verlaufscharakter; Empfehlungen, welche Farben es in der
  Apple-Welt sonst noch gibt; die Fläche verläuft in jedem Fall von links nach rechts. Dieselbe Verlaufsfarbe in der Kopfzeile der Tabelle im
  Reiselogbuch, dort von oben nach unten.
- **Muster** `arbeit/RLB-120/verlauf.html` (nur hell; Grundlage der Stand von `index.html`): heute (grau flach) · **A gleichmäßig** Weiß → Grau 5
  `#e5e5ea` · **B weich, spät** lange weiß, Grau erst zum Ende hin, Weiß → Grau 5 · **C kräftig** früh grau, Weiß → Grau 5 → Grau 4 `#d1d1d6`.
  Weitere Farben (Verlauf wie A): **F1** Grau 6 `#f2f2f7` · **F2** Grau 4 `#d1d1d6` · **F3** Blau zart (Apple-Blau 8 %, ≈ `#ebf4ff`) · **F4** Blau hell
  `#dcebff` (= `--sel-bg`, Fläche ‚ausgewählt‘).
- **Apple-Abgleich:** Grau 4 bis 6 sind Apple-Systemfarben (hell `#d1d1d6`, `#e5e5ea`, `#f2f2f7`; Quellen der Sitzung: Apple-Dokumentation UIKit
  ‚Standard colors‘ und Tabellen der dynamischen Farben). Einen Verlauf als Fläche von Tabellen oder Listen habe ich in Apple-Apps nicht belegt – Vermutung:
  Apple nutzt dort flache Flächen; der Verlauf ist eine bewusste Abweichung (Wunsch). Betroffen: R-6.1 (‚Kopf grau‘), Farbtabelle Designrichtlinie 2
  (`--th-bg`), 9 und 15.10.
- **Testfall-Liste** (Testfall (automatisch), `arbeit/RLB-120 Verlauf prüfen.mjs`, Chromium und WebKit, vier Lagen, Textgröße l, xxl, xxxl, ax3):

| Nr. | Fall | Erwartet |
|---|---|---|
| RLB-120/V-1 | Spalte 1 der Tageskachel | links weiß, nach rechts verlaufend |
| RLB-120/V-2 | Kopfzeile der Tabelle | oben weiß, nach unten verlaufend |
| RLB-120/V-3 | Kachel und Kopfzeile | dieselben Farben |
| RLB-120/V-4 | Kachel | nichts ragt hinaus |
| RLB-120/V-5 | Seite | rollt nicht seitlich |
| RLB-120/V-6 | Gegenprobe `PRUEF_V=heute` | V-1 und V-2 rot |

Ergebnis (08.11.2026, Sitzung 0104): Chromium und WebKit **alles in Ordnung**; Gegenprobe rot (32 Fehler).

## Verlauf B, Richtung je nach Anordnung, allgemeine Regel (Nutzer 08.11.2026, Sitzung 0104)

- **Ergebnis:** ‚Bitte B umsetzen. Beide Tabellenverläufe (Tabellenüberschrift seitlich links und Tabellenüberschrift oben in der ersten Zeile) sind als
  allgemeine Regel zu verankern.‘ Dazu: steht bei großer Schrift die Bezeichnung (Spalte 1) über den Daten, verläuft der Verlauf von oben nach unten statt
  von links nach rechts – dynamisch. Muster für alle Fälle mit B.
- **Allgemein oder App (0 Nr. 4):** **allgemein** (Nutzer) – Kasten mit Feldern (15.10, R-6.1, R-6.5) und Kopfzeile jeder Tabelle (9, R-6.1, `--th-bg`)
  in AppDesign. Wortlaut folgt (0 Nr. 29).
- **Umgesetzt im Muster** `arbeit/RLB-120/index.html` (nur hell): Variable `--kopf-verlauf` (B: Weiß 0 %, Weiß 25 %, `#f9f9fb` 50 %, `#f0f0f3` 75 %, Grau 5
  `#e5e5ea` 100 %); Spalte 1 nebeneinander `linear-gradient(to right, …)`, untereinander (`html.ts-um`) `linear-gradient(to bottom, …)` – die Richtung
  wechselt mit der Anordnung, ohne Neuaufbau; neu darunter die Tabelle der Tage (iPad) heute/neu, Kopfzeile in ‚neu‘ von oben nach unten.
- **Prüfung** (`arbeit/RLB-120 Muster prüfen.mjs`): T-7 jetzt ‚Verlauf passend zur Anordnung nur in der Zelle‘ (nebeneinander nach rechts, untereinander
  nach unten, endet bei Grau 5) · neu **T-12** ‚Kopfzeile der Tabelle von oben nach unten mit demselben Verlauf wie Spalte 1‘. Chromium und WebKit **alles
  in Ordnung**; Gegenprobe `PRUEF_V=heute` rot (206 Fehler, darunter T-7 und T-12); zweite Gegenprobe ohne die Regel für ‚untereinander‘: T-7 rot genau in
  den Fällen ‚untereinander‘ (12 Fehler).
- **Noch offen:** dunkel (Muster nur hell), Ausgabe HTML/PDF (R-6.2, eigene helle Gestaltung) – mit dem Wortlaut klären.
- **Muster Verlauf B ok** in allen Fällen (Nutzer 08.11.2026, Sitzung 0104). Wortlaut: `arbeit/RLB-120 Wortlaut.md` (RLB-120/W-1 bis W-5).
