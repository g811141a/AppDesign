# RLB-122 – Statistik: Umbruch vor der Anzahl – Klärung

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0103‘ · Backlog Reiselogbuch RLB-122 (Prio 2)

## Wunsch (Nutzer 06.11.2026, Sitzung 0083)

Bei Wetter und Smileys bricht die Zeile (z. B. iPhone hoch) nicht vor der Anzahl um, sondern zwischen Anzahl und Smiley. ‚Anzahl × Smiley‘ soll
immer in einer Zeile stehen.

## Nachgestellt (Sitzung 0103)

Reiselogbuch 3.54.0, 60 erfasste Tage mit 10 verschiedenen Wetter-Zeichen und 10 Smileys; Chromium und WebKit, Textgröße Standard und groß.

| Lage | Ergebnis (beide Browser gleich) |
|---|---|
| iPhone hoch | **Wetter:** Zeile 1 endet mit ‚· 8×‘, das Zeichen steht vorn in Zeile 2. **Smileys:** Zeile 1 endet mit ‚· 6×‘, ‚☹️‘ steht vorn in Zeile 2. Die Folgezeilen beginnen mit ‚·‘ |
| iPad hoch | dasselbe: Zeile 1 endet mit ‚· 8×‘ bzw. ‚· 6×‘ |
| iPhone quer | alles in einer Zeile, kein Umbruch |

Bild: `arbeit/RLB-122 heute iPhone hoch.png` (WebKit, iPhone hoch).

**Ursache:** `tripStats` (`index.html`, `fmt`) setzt den Text als ‚8×☀️ · 8×🌧️ · …‘ zusammen, mit normalen Leerzeichen. Vor einem Emoji darf der
Browser immer umbrechen (Unicode-Zeilenumbruch, Emoji-Klasse). Deshalb bricht er auch zwischen ‚8×‘ und dem Zeichen um. Dieselbe Zeile steht in
der Statistik der **Ausgabe** (gleiche Funktion).

## Frage 1 – wohin mit dem Trennpunkt ‚·‘?

- **a) ‚·‘ am Ende der Zeile, die neue Zeile beginnt mit der Anzahl** (Empfehlung): ‚8×☀️ · 8×🌧️ ·‘ / ‚8×⛅ · …‘. Das passt zu deinem Wunsch
  ‚Umbruch vor der Anzahl‘ und ist die übliche Satzregel: ein Trennzeichen bleibt am Ende der Zeile.
- **b) ‚·‘ am Anfang der neuen Zeile** (so ist es heute): ‚8×☀️ · 8×🌧️‘ / ‚· 8×⛅ · …‘.

Technischer Vorschlag für beide: jedes ‚Anzahl×Zeichen‘ am Stück (wie die Wörter des Dateinamens in APD-116), dazu bei a) ein geschütztes Leerzeichen
vor dem ‚·‘.

**Ergebnis Frage 1:** a) ‚·‘ am Zeilenende, die neue Zeile beginnt mit der Anzahl (Nutzer 08.11.2026, Sitzung 0103).

## Frage 2 – als allgemeine Regel festhalten? (0 Nr. 4)

- Es gibt schon **R-10.5** im Katalog: ‚**Icon und Text** eines Eintrags bleiben zusammen – Umbruch nur zwischen Einträgen‘ (Prüfung `checkIconText`).
  RLB-122 ist derselbe Grundsatz für Aufzählungen mit Trennpunkt: ‚Anzahl×Zeichen‘ ist ein Eintrag, umgebrochen wird nur zwischen den Einträgen.
- **Empfehlung: ja, allgemein – R-10.5 ergänzen** (keine neue Regel, 0 Nr. 3): Aufzählungen mit ‚·‘ brechen nur nach dem ‚·‘ um; jeder Eintrag
  (z. B. ‚8×☀️‘) bleibt am Stück. Dazu ein kleiner Baustein in `ui.js` (z. B. `aufzaehlung(liste)`), den die App für Wetter und Smileys nutzt –
  App und Ausgabe gleich.
- **Nein** hieße: nur im Reiselogbuch beheben, Regel in der App-Richtlinie.

**Ergebnis Frage 2:** ja, allgemein – R-10.5 ergänzen (Nutzer 08.11.2026, Sitzung 0103). RLB-122 wird damit zusätzlich ein AppDesign-Punkt
(Baustein in `ui.js`, Regel); das Reiselogbuch nutzt ihn für Wetter und Smileys in App und Ausgabe.

## Apple-Abgleich (0 Nr. 23)

- Eine Apple-Vorgabe zu Aufzählungen mit Trennpunkt habe ich in dieser Sitzung nicht nachgeschlagen; belegt ist nur unser Katalog.
- Katalog: R-10.5 (Icon und Text bleiben zusammen – wird ergänzt), R-6.3 (nichts ragt hinaus), R-10.2 (Lesbarkeit) – unverändert.

## Muster (nur hell)

`arbeit/RLB-122/index.html` – drei Fälle heute und neu: 1. viele Zeichen (10 Wetter, 10 Smileys), 2. zweistellige Anzahl, 3. wenige Zeichen (kein
Umbruch). Oben die Textgröße (Standard, groß = xxxl, sehr groß = ax3).

## Testfall-Liste (Testfall (automatisch), `arbeit/RLB-122 Muster prüfen.mjs`, Chromium und WebKit, vier Lagen, Textgröße l, xxxl, ax3)

| Nr. | Fall | Erwartet |
|---|---|---|
| RLB-122/T-1 | jede umbrochene Zeile Wetter und Smileys | endet nie mit der Anzahl (‚8×‘), das Zeichen bleibt dabei |
| RLB-122/T-2 | Folgezeilen | beginnen mit der Anzahl, nie mit ‚·‘ |
| RLB-122/T-3 | umbrochene Zeilen | enden mit ‚·‘ |
| RLB-122/T-4 | danach | Text unverändert |
| RLB-122/T-5 | danach | nichts ragt hinaus |
| RLB-122/T-6 | Muster | es gibt Umbrüche (sonst prüft es nichts) |
| RLB-122/T-7 | Gegenprobe `PRUEF_V=heute` | T-1 und T-2 rot |

Ergebnis (08.11.2026, Sitzung 0103): Chromium und WebKit **alles in Ordnung** (66 Umbrüche geprüft); Gegenprobe in beiden rot (78 Fehler).

## Anleitung Muster am Gerät

**Link:** https://g811141a.github.io/AppDesign/arbeit/RLB-122/index.html – Safari, hell.

1. iPhone **hoch**: den Link öffnen. Erwartet: drei Fälle mit ‚heute‘ und ‚neu‘ untereinander.
2. Fall 1 ‚Viele Zeichen‘, Kasten ‚neu‘ ansehen. Erwartet: bei Wetter und Smileys endet jede umbrochene Zeile mit ‚·‘, die nächste beginnt mit der
   Anzahl (z. B. ‚8×⛅‘); ‚Anzahl×Zeichen‘ steht nie getrennt. Im Kasten ‚heute‘ dagegen z. B. ‚· 6×‘ am Zeilenende und das Zeichen darunter.
3. Fall 2 ‚Zweistellige Anzahl‘ ansehen. Erwartet: wie Schritt 2.
4. Oben ‚Text groß‘ und ‚Text sehr groß‘ antippen. Erwartet: rechts bzw. unten (‚neu‘) weiterhin nur Umbrüche nach ‚·‘, nichts ragt hinaus.
5. iPad **quer**: die Schritte 1 bis 4 wiederholen (‚heute‘ und ‚neu‘ stehen nebeneinander). Erwartet: wie oben.

**Ergebnis:** Muster iPhone hoch und iPad quer **alles ok** (Nutzer 08.11.2026, Sitzung 0103).

## Wortlaut (0 Nr. 29) – alt und neu

### RLB-122/W-1 Regelkatalog R-10.5 (Designrichtlinie 17, Thema 10)

**Alt:** | R-10.5 | **Icon und Text** eines Eintrags bleiben zusammen – Umbruch nur zwischen Einträgen | ablauf.mjs – `checkIconText` (Icon und erstes
Wort auf derselben Zeile) | – | 3 |

**Neu:** | R-10.5 | **Icon und Text** eines Eintrags bleiben zusammen – Umbruch nur zwischen Einträgen; **in einer Aufzählung mit ‚·‘ (z. B.
‚8×☀️ · 6×🌧️‘) bleibt jeder Eintrag am Stück, umgebrochen wird nur nach dem ‚·‘ – die neue Zeile beginnt mit dem nächsten Eintrag** |
ablauf.mjs – `checkIconText` (Icon und erstes Wort auf derselben Zeile), **`checkAufzaehlung` (keine Zeile endet mit der Anzahl oder beginnt
mit ‚·‘)** | – | 3 |

### RLB-122/W-2 Designrichtlinie 3 ‚Schrift und Abstände‘, Punkt ‚Icon und Text bleiben zusammen‘ – neuer Satz am Ende

**Alt:** … ist ein Eintrag allein breiter als die Zeile, bricht er im Text um, nie direkt nach dem Icon. **Technisch:** `iconText(icon, text)`
(ui.js) – `.ict` (design.css, auch in `outputCss`).

**Neu:** … ist ein Eintrag allein breiter als die Zeile, bricht er im Text um, nie direkt nach dem Icon. **Technisch:** `iconText(icon, text)`
(ui.js) – `.ict` (design.css, auch in `outputCss`). **Aufzählungen mit Trennpunkt** (z. B. Wetter und Smileys der Statistik, ‚8×☀️ · 6×🌧️‘):
jeder Eintrag am Stück, der ‚·‘ bleibt am Ende der Zeile, die neue Zeile beginnt mit dem nächsten Eintrag. **Technisch:** `aufzaehlung(liste)`
(ui.js) – jeder Eintrag in `.ict`, davor ein geschütztes Leerzeichen und ‚· ‘.

### RLB-122/W-3 Reiselogbuch `PROMPT.md` (Statistik, Zeilen 238–239)

**Alt:** … Smileys aus Tagen und Fazit absteigend nach Anzahl (z. B. ‚5×😊 · 3×😉 · 2×☹️‘; Varianten wie ☹️/☹ zählen gemeinsam, Anzahl vor dem
Symbol ohne Leerzeichen).

**Neu:** … Smileys aus Tagen und Fazit absteigend nach Anzahl (z. B. ‚5×😊 · 3×😉 · 2×☹️‘; Varianten wie ☹️/☹ zählen gemeinsam, Anzahl vor dem
Symbol ohne Leerzeichen; **Wetter und Smileys als Aufzählung nach R-10.5 – umgebrochen wird nur nach dem ‚·‘, App und Ausgabe**).

**Ergebnis:** Wortlaut W-1 bis W-3 bestätigt (Nutzer 08.11.2026, Sitzung 0103).

## Muster iPhone quer und iPad hoch (0 Nr. 6)

Das Muster ist unverändert (automatisch schon in allen vier Lagen grün). **Link:** https://g811141a.github.io/AppDesign/arbeit/RLB-122/index.html

1. iPad **hoch**: den Link öffnen. Erwartet: drei Fälle, ‚heute‘ und ‚neu‘ nebeneinander.
2. Fall 1 und 2, Kasten ‚neu‘ ansehen. Erwartet: jede umbrochene Zeile endet mit ‚·‘, die nächste beginnt mit der Anzahl; ‚Anzahl×Zeichen‘ nie
   getrennt.
3. Oben ‚Text groß‘ und ‚Text sehr groß‘ antippen. Erwartet: weiterhin nur Umbrüche nach ‚·‘, nichts ragt hinaus.
4. iPhone **quer**: die Schritte 1 bis 3 wiederholen. Erwartet: wie oben (bei Standardschrift gibt es dort evtl. keinen Umbruch – dann mit ‚Text
   sehr groß‘ prüfen).

## Offene Usertests

- **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – ok bis auf **P-100/1** (→ RLB-123, kommt mit 3.55.0).
