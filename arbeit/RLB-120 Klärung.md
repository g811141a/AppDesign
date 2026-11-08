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

## Offene Usertests

- **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – ok bis auf **P-100/1** (→ RLB-123, kommt mit 3.55.0).
