# RLB-125 – Muster 3 (gesperrt = nur Vorschau)

Stand 21.11.2026 · Sitzung 0149 · iPad quer, hell · Commit 5a6657a

## Link

https://g811141a.github.io/AppDesign/arbeit/RLB-125/index.html

Eigene Beispieldaten; deine echten Reiselogbücher bleiben unberührt. Bitte die Seite **ganz neu laden**. Ist ‚Australien‘ aus einem früheren
Muster noch entsperrt: Mehr (`ellipsis`) → ‚Reiselogbuch sperren‘.

## Deine Rückmeldung zu Muster 2 (Sitzung 0149)

Die Vorschau lag als Fenster über der Tabelle. Nach jeder Ausgabe (Teilen, PDF …) schloss sie, und dann war die Tabelle zu sehen. Gewünscht ist:
Ein gesperrtes Reiselogbuch zeigt **nur die Vorschau**. Sie bleibt auch nach jeder Ausgabe stehen, und die Tabelle erscheint **nie**.

## Umgesetzt (Muster 3)

- **Die Vorschau ist die Seite selbst, kein Fenster:** Ein gesperrtes Reiselogbuch zeigt rechts neben der Seitenleiste (iPhone: als ganze Seite)
  nur die Vorschau. Die Tabelle wird gar nicht erst aufgebaut. Es gibt kein x, das etwas schließen könnte.
- **Hinweis oben:** orange `lock` mit ‚Dieses Reiselogbuch ist gesperrt. Es lässt sich lesen und ausgeben, aber nicht ändern oder löschen.‘ und
  die Schaltfläche **‚Entsperren‘** in hell mit blauer Schrift (**J-6**). Darunter klein ‚Vorschau · Reiselogbuch Australien … V001‘ (der Dateiname
  der nächsten Ausgabe).
- **Ausgabe** (`share`, gleiche Stelle wie im normalen Reiselogbuch): HTML und PDF. Der Punkt ‚Vorschau‘ fehlt, weil die Seite schon die Vorschau ist.
  Nach der Ausgabe erscheint die Meldung (z. B. ‚Ausgabe V001‘) über der Vorschau. Nach dem Schließen ist wieder die Vorschau zu sehen.
- **Mehr** (`ellipsis`): ‚Reiselogbuch entsperren‘ und blass mit ‚Gesperrt‘ die Punkte ‚Reiselogbuch einstellen‘ und ‚Reiselogbuch löschen‘.
  ‚Suchen‘, ‚Alle Tage‘ und ‚Nur erfasste Tage‘ fehlen, weil es keine Tabelle gibt.
- **‚Entsperren‘** (Hinweis oder Mehr) → sofort die normale Seite mit Tabelle, keine Abfrage. **‚Reiselogbuch sperren‘** → sofort die Vorschau.
- **Kachel:** `lock` jetzt **orange** (`--warn`) auf weißem Kreis (**J-5**).
- Backup (Seitenleiste), Wechsel zu einem anderen Reiselogbuch, Drehen und Neustart: Die Vorschau bleibt.

## Bilder (iPad quer, hell)

`arbeit/RLB-125/bilder/9.png` gesperrt geöffnet · `10.png` Ausgabe-Menü · `11.png` Meldung nach HTML über der Vorschau · `12.png` nach ‚Entsperren‘

## Schritte (iPad quer, hell)

1. Link öffnen, ganz neu laden. Erwartet: Rechts steht nur die Vorschau von ‚Australien‘ mit dem orangen Hinweis ‚Dieses Reiselogbuch ist
   gesperrt.‘ und der hellen Schaltfläche ‚Entsperren‘. Keine Tabelle, kein Fenster, auf der Kachel ein oranges `lock`.
2. Oben rechts `share` → ‚HTML‘ → im Teilen-Menü ‚In Dateien sichern‘ oder abbrechen. Erwartet: Die Meldung ‚Ausgabe V001‘ erscheint über der
   Vorschau. Nach x ist wieder die Vorschau zu sehen, keine Tabelle.
3. `share` → ‚PDF‘ → das Drucken-Menü schließen, dann die Meldung schließen. Erwartet: Es ist wieder die Vorschau zu sehen, keine Tabelle.
4. In der Seitenleiste ‚Toskana‘ antippen, dann ‚Australien‘. Erwartet: ‚Toskana‘ zeigt die Tabelle, ‚Australien‘ wieder nur die Vorschau.
5. ‚Entsperren‘ antippen. Erwartet: Die normale Seite ‚Australien‘ mit Tabelle ist offen, das `lock` auf der Kachel ist weg.
6. Mehr → ‚Reiselogbuch sperren‘. Erwartet: Sofort ist wieder nur die Vorschau zu sehen.

## Automatisch geprüft (Muster, Chromium und WebKit, iPad quer 1180 × 820 und iPhone 390 × 844)

Grün in beiden Browsern: Öffnen zeigt nur die Vorschau-Seite; im Ausgabe-Menü fehlt ‚Vorschau‘; nach HTML kommt die Meldung über der Vorschau, nach dem Schließen
bleibt die Vorschau; nach PDF bleibt die Vorschau; im Mehr-Menü fehlen ‚Suchen‘ und ‚Alle Tage‘; ‚Toskana‘ zeigt die Tabelle, ‚Australien‘ wieder die Vorschau;
das Schloss steht auf der Kachel; ‚Entsperren‘ zeigt die Tabelle; ‚Sperren‘ zeigt sofort die Vorschau; nach einem Neustart die Vorschau; nach dem Drehen auf hoch
die Vorschau (Chromium); keine Fehler auf der Seite.

## Apple-Abgleich

- HIG ‚Menus‘ (aus 0148 belegt): „Show people when a menu item is unavailable.“ → ‚Einstellen‘ und ‚Löschen‘ werden blass gezeigt statt weggelassen.
- Wie Apple ein Dokument sperrt, ist nicht belegt (0148). Muster 3 folgt deinem Wunsch. **Vermutung:** Das entspricht einem schreibgeschützten Dokument, das
  nur angezeigt wird.

## Testfall-Liste (Entwurf, angepasst an Muster 3)

| Nr. | Testfall (automatisch) |
|---|---|
| RLB-125/T-1 | Kachel gesperrt: `lock` vor dem Titel, so hoch wie die Großbuchstaben und mittig (J-9) (iPad, iPhone-Startliste, große Schrift); nicht gesperrt kein Symbol |
| RLB-125/T-2 | Gesperrt öffnen (Kachel, Start, Neustart, Wechsel, nach ‚Sperren‘): nur die Vorschau-Seite, keine Tabelle, keine Kästen, kein Fenster |
| RLB-125/T-3 | Nach jeder Ausgabe (HTML, PDF, abgebrochen, Fehler) und nach Backup erstellen bzw. laden (Abgleichen): Vorschau bleibt, nie die Tabelle |
| RLB-125/T-4 | Ausgabe-Menü ohne ‚Vorschau‘; Mehr: ‚Entsperren‘ wirkt, ‚Einstellen‘ und ‚Löschen‘ blass mit ‚Gesperrt‘, nicht antippbar |
| RLB-125/T-5 | Kontextmenü der Kachel und Wischen gesperrt: nur ‚Entsperren‘ wirkt |
| RLB-125/T-6 | ‚Entsperren‘ → Tabelle bzw. Kästen; ‚Sperren‘ → Vorschau; Fokus danach sichtbar (Grundregeln) |
| RLB-125/T-7 | Drehen und Wechsel iPad/iPhone, Seitenleiste aus/ein: Vorschau bleibt (Grundregeln) |
| RLB-125/T-8 | Abgleich: Sperre wird abgeglichen; ein gesperrtes Reiselogbuch wird nicht gelöscht; ‚Ersetzen‘ nennt ‚Darunter N gesperrte Reiselogbücher.‘ |
| RLB-125/T-9 | Backup erstellen und laden behält die Sperre; alte Backups ohne Sperre gelten als nicht gesperrt (`normalize`) |
| RLB-125/T-10 | Gegenprobe: gesperrt, aber Tabelle sichtbar → rot |

Entfallen gegenüber 0148: Lesefenster mit `lock` in der Kopfzeile (alte RLB-125/T-4) und Tagesfenster nur lesen (alte RLB-125/T-5). Ohne Tabelle öffnet kein Tagesfenster.

## Noch offen (nach deinem ok zum Muster)

- Allgemeine Regel ‚nicht verfügbare Menüpunkte blass mit Grund‘ (0 Nr. 4)
- L-4, L-5 (Löschen: Anzahl, ‚Erst Backup erstellen‘)
- Abgleich, iPhone-Bilder (hoch erst, wenn quer passt)
- Fazit: Ohne Tabelle steht es nur in der Vorschau, und dort nur zum Lesen.

## Rückmeldung (Nutzer 21.11.2026, Sitzung 0149, im Fenster)

- Muster 3: **nicht ok** – Einzelheiten folgen im Chat.
- Allgemeine Regel ‚gesperrter Eintrag zeigt nur die Vorschau‘: **Nein, App** (bisher sperrt nur das Reiselogbuch).

## Muster 4 (Nutzer 21.11.2026, Sitzung 0149: „In der Vorschau möchte ich die gleichen Schaltflächen oben wie bei der Vorschau im Reiselogbuch, nämlich PDF und Teilen (blau eingefärbt)“)

Link unverändert: https://g811141a.github.io/AppDesign/arbeit/RLB-125/index.html – bitte ganz neu laden.

### Geändert gegenüber Muster 3

- **Oben rechts** stehen dieselben Schaltflächen wie in der Vorschau des Reiselogbuchs: **‚PDF‘** (`file-text` mit Wort) und **Teilen** (`share`, blau gefüllt).
  ‚PDF‘ öffnet direkt das Drucken-Menü, Teilen öffnet direkt das Teilen-Menü (HTML). Das Ausgabe-Menü fällt weg.
- **Mehr (`ellipsis`) fällt weg**, wie in der Vorschau. ‚Entsperren‘ geht über die Schaltfläche im Hinweis und über das Kontextmenü bzw. Wischen auf der Kachel.
  ‚Einstellen‘ und ‚Löschen‘ stehen dort weiter blass mit ‚Gesperrt‘.
- Alles andere wie Muster 3: nur die Vorschau, die Tabelle nie, die Vorschau bleibt nach jeder Ausgabe, oranges `lock`, ‚Entsperren‘ hell.

### Bilder (iPad quer, hell)

`arbeit/RLB-125/bilder/13.png` gesperrt geöffnet · `14.png` Meldung nach Teilen über der Vorschau · `16.png` nach ‚Entsperren‘

### Schritte (iPad quer, hell)

1. Link öffnen, ganz neu laden. Erwartet: oben rechts ‚PDF‘ und das blaue `share`; darunter nur die Vorschau mit orangem Hinweis und ‚Entsperren‘.
2. Das blaue `share` antippen, im Teilen-Menü sichern oder abbrechen. Erwartet: Die Meldung ‚Ausgabe V001‘ liegt über der Vorschau; nach x wieder die Vorschau.
3. ‚PDF‘ antippen, das Drucken-Menü und die Meldung schließen. Erwartet: wieder die Vorschau, keine Tabelle.
4. ‚Entsperren‘ antippen. Erwartet: normale Seite mit Tabelle, `lock` auf der Kachel weg.
5. Kachel ‚Australien‘ lange drücken → ‚Reiselogbuch sperren‘. Erwartet: sofort wieder nur die Vorschau.

### Automatisch geprüft (Chromium und WebKit, iPad quer und iPhone)

Alle Fälle sind grün. Neu ist der Fall ‚oben PDF und Teilen blau gefüllt, kein Mehr‘. Weiter geprüft: nach Teilen und nach PDF bleibt die Vorschau; Wechsel,
Entsperren, Sperren, Neustart und Drehen (Chromium) zeigen das Erwartete; keine Fehler auf der Seite.

### Testfall-Liste (Änderung)

- RLB-125/T-4 neu: oben ‚PDF‘ und Teilen (blau gefüllt) wie in der Vorschau, kein Mehr; ‚PDF‘ öffnet das Drucken-Menü, Teilen das Teilen-Menü.

## Muster 5 – Schloss auf der Kachel (Nutzer 21.11.2026, Sitzung 0149: „Die Ausgabeseite ist ok, aber das Icon für die Sperre rechts unten auf der Reiselogbuchkachel ist störend. Bitte um ein paar Alternativen“)

**Ausgabeseite (Muster 4): ok.** Allgemeine Regel: nein, App (Antwort im Fenster zu Muster 3).

### Drei Varianten (Bild `arbeit/RLB-125/bilder/17.png`, iPad quer, hell; oben ‚Australien‘ gewählt, unten nicht gewählt)

- **a) Schloss vor dem Titel:** kleines `lock` in der Farbe des Titels direkt vor ‚Australien‘ (weiß auf blau, schwarz auf weiß). Die Kachel bleibt sonst unverändert,
  der Pfeil bleibt.
- **b) Schloss statt Pfeil rechts:** `lock` steht dort, wo sonst `chevron-right` steht, in Grau (auf blau weiß).
- **c) ‚gesperrt‘ statt ‚beendet‘:** In der Datumszeile steht `lock` und ‚gesperrt‘ anstelle des Zustands (‚beendet‘, ‚läuft gerade‘, ‚geplant‘). Der Zustand ist
  dann nicht mehr zu sehen.

Alle drei ohne Farbe Orange (J-5 entfällt damit) und ohne weißen Kreis.

### Links zum Ausprobieren (bitte ganz neu laden)

- a) https://g811141a.github.io/AppDesign/arbeit/RLB-125/index.html?kachel=a
- b) https://g811141a.github.io/AppDesign/arbeit/RLB-125/index.html?kachel=b
- c) https://g811141a.github.io/AppDesign/arbeit/RLB-125/index.html?kachel=c

### Schritte (iPad quer, hell)

1. Link a öffnen. Erwartet: Auf der Kachel ‚Australien‘ steht das `lock` vor dem Titel; ‚Toskana‘ hat kein Schloss.
2. ‚Toskana‘ antippen. Erwartet: ‚Australien‘ ist weiß, das `lock` ist schwarz vor dem Titel.
3. Dasselbe mit Link b. Erwartet: Bei ‚Australien‘ steht das `lock` rechts statt des Pfeils.
4. Dasselbe mit Link c. Erwartet: Bei ‚Australien‘ steht in der Datumszeile ‚gesperrt‘ mit `lock` statt ‚beendet‘.

### Automatisch geprüft (Chromium und WebKit, iPad quer und iPhone)

Für jede Variante grün: Das Symbol steht innerhalb der Kachel, kein Text ist abgeschnitten, nur das Symbol der gewählten Variante ist da, ‚Toskana‘ hat kein
Schloss, keine Fehler auf der Seite. Die Kachel ist bei allen drei gleich hoch wie ohne Sperre (iPad 80 px in Chromium).

### Empfehlung und Apple

- **Empfohlen a):** Das Schloss fällt beim Lesen des Titels sofort auf, stört die Kachel aber nicht. Pfeil und Zustand bleiben erhalten.
- b) nimmt den Pfeil weg, der zeigt, dass die Kachel etwas öffnet. c) nimmt den Zustand weg.
- Apple: **Vermutung** – Notizen zeigt bei gesperrten Notizen ein kleines Schloss in der Zeile der Liste. In dieser Sitzung ist das nicht belegt
  (support.apple.com ist aus der Umgebung nicht erreichbar).

## Muster 6 – Variante a, mittig zum Titel (Nutzer 21.11.2026, Sitzung 0149: „A) vor dem Titel, aber in der Höhe zentriert mit dem Text und nicht tiefergestellt, so wie es im Muster aussieht“)

Link (Variante a ist jetzt der Normalfall): https://g811141a.github.io/AppDesign/arbeit/RLB-125/index.html – bitte ganz neu laden.

### Geändert

- Das `lock` ist so hoch wie die Großbuchstaben des Titels (0,76 der Schriftgröße, bei 17 pt rund 13 px statt 15 px). Es steht mittig zu ihnen und reicht nicht
  mehr unter die Grundlinie. Vorher war es 14 px hoch und ragte 1,5 px unter die Buchstaben. Weil die Größe in em angegeben ist, wächst das Schloss mit der Textgröße
  mit.
- Bild `arbeit/RLB-125/bilder/19.png` (Ausschnitt, stark vergrößert), `17.png` (alle drei Varianten, a jetzt mittig).

### Gemessen (Pixel der Bilder: Mitte des Schlosses gegen Mitte des ‚A‘, positiv = Schloss tiefer)

| | Chromium iPad | Chromium iPhone | WebKit iPad | WebKit iPhone |
|---|---|---|---|---|
| vorher (15 px) | +0,63 px | +0,63 px | +1,13 px | +0,63 px |
| jetzt, 2× | +0,44 px | +0,44 px | −0,16 px | +1,34 px |
| jetzt, 3× | +0,27 px | +0,27 px | +0,01 px | +1,34 px |

In WebKit am iPhone liegt das Schloss in der Prüfumgebung noch 1,3 px tiefer, obwohl es gleich angeordnet ist wie am iPad (3,84 px unter der Oberkante des
Titels). **Vermutung:** WebKit rundet die Lage des Symbols hier anders. Am Gerät bitte genau darauf achten.

### Schritte (iPad quer, hell, dann iPhone hoch)

1. Link öffnen, ganz neu laden. Erwartet: Das `lock` steht vor ‚Australien‘, genauso hoch wie das ‚A‘ und auf derselben Höhe – oben und unten bündig.
2. ‚Toskana‘ antippen. Erwartet: Auf der weißen Kachel ‚Australien‘ steht das `lock` schwarz, wieder bündig mit dem ‚A‘.
3. Am iPhone in der Startliste ansehen. Erwartet: wie in Schritt 2.

## Rückmeldung Muster 6 (Nutzer 21.11.2026, im Fenster): **ok** – eingetragen im Backlog des Reiselogbuchs (J-7 bis J-9).
