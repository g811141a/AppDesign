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
| RLB-125/T-1 | Kachel gesperrt: oranges `lock` unten rechts, nicht über dem Text (iPad, iPhone-Startliste, große Schrift); nicht gesperrt kein Symbol |
| RLB-125/T-2 | Gesperrt öffnen (Kachel, Start, Neustart, Wechsel, nach ‚Sperren‘): nur die Vorschau-Seite, keine Tabelle, keine Kästen, kein Fenster |
| RLB-125/T-3 | Nach jeder Ausgabe (HTML, PDF, abgebrochen, Fehler) und nach Backup erstellen bzw. laden (Abgleichen): Vorschau bleibt, nie die Tabelle |
| RLB-125/T-4 | Ausgabe-Menü ohne ‚Vorschau‘; Mehr: ‚Entsperren‘ wirkt, ‚Einstellen‘ und ‚Löschen‘ blass mit ‚Gesperrt‘, nicht antippbar |
| RLB-125/T-5 | Kontextmenü der Kachel und Wischen gesperrt: nur ‚Entsperren‘ wirkt |
| RLB-125/T-6 | ‚Entsperren‘ → Tabelle bzw. Kästen; ‚Sperren‘ → Vorschau; Fokus danach sichtbar (Grundregeln) |
| RLB-125/T-7 | Drehen und Wechsel iPad/iPhone, Seitenleiste aus/ein: Vorschau bleibt (Grundregeln) |
| RLB-125/T-8 | Abgleich: Sperre wird abgeglichen; ein gesperrtes Reiselogbuch wird nicht gelöscht; ‚Ersetzen‘ nennt ‚Darunter N gesperrte Reiselogbücher.‘ |
| RLB-125/T-9 | Backup erstellen und laden behält die Sperre; alte Backups ohne Sperre gelten als nicht gesperrt (`normalize`) |
| RLB-125/T-10 | Gegenprobe: gesperrt, aber Tabelle sichtbar → rot |

Entfallen gegenüber 0148: Lesefenster mit `lock` in der Kopfzeile (alte T-4) und Tagesfenster nur lesen (alte T-5). Ohne Tabelle öffnet kein Tagesfenster.

## Noch offen (nach deinem ok zum Muster)

- Allgemeine Regel ‚nicht verfügbare Menüpunkte blass mit Grund‘ (0 Nr. 4)
- L-4, L-5 (Löschen: Anzahl, ‚Erst Backup erstellen‘)
- Abgleich, iPhone-Bilder (hoch erst, wenn quer passt)
- Fazit: Ohne Tabelle steht es nur in der Vorschau, und dort nur zum Lesen.
