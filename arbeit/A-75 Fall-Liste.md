# A-75 ‚Auswahl-Kapsel erkennbar wischbar‘ (Reiselogbuch T-106) – Apple-Abgleich, Muster, Fall-Liste

**Stand 24.10.2026** · Sitzung ‚Reiselogbuch 0041‘ · **gebaut in AppDesign 4.33.0 (Sitzung 0042), Prüfungen `hig.mjs` und `checkKapsel`** · Muster: `arbeit/A-75 Muster.html`
(https://g811141a.github.io/AppDesign/arbeit/A-75%20Muster.html, oben umschalten: Heute · 48 · 55 · 65 · 80 · 112) – im Muster geprüft
in Chromium und WebKit (iPhone hoch und quer, Anfang, Mitte, Ende: Pfeile wie erwartet, keine Fehler)

**Vorgabe (Nutzer 24.10.2026):** die ersten Muster (Anschnitt, Rollbalken kurz zeigen) sind verworfen. Das bestehende Verhalten
wird verbessert: **längerer Verlauf** zum Rand und **kleine Pfeile** (‹ ›) am Rand, die verschwinden, sobald das jeweilige Ende
erreicht ist.

## 1. Heute (15.12, R-5.4)

- Reicht der Platz nicht, lässt sich der Inhalt der Auswahl-Kapsel seitlich wischen; ein weicher Verlauf (48 px) am Rand zeigt,
  wo es weitergeht (`.fl`/`.fr`, `mountCap`).
- Am iPhone wirkt der Verlauf wie das Ende der Zeile.

## 2. Apple-Abgleich (iOS 26)

| Was | So macht es Apple | Für uns |
|---|---|---|
| Wischbare Reihen am iPhone | kein Pfeil; das letzte Element ist angeschnitten (Karten-Kategorien, App Store, Musik) | Verlauf bleibt, länger |
| Pfeile am Rand | bei Reihen auf dem Mac und am iPad mit Zeiger (App Store, Musik, TV: Pfeil-Knöpfe am Rand, beim Ende ausgeblendet) | Pfeile als Anzeige, am Ende ausgeblendet |
| Bewegung reduzieren | Ein- und Ausblenden ohne Bewegung | Pfeile ohne Überblenden |

Quellen: [HIG – Collections](https://developer.apple.com/design/human-interface-guidelines/collections),
[HIG – Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views).
**Abweichung (bewusst, Vorgabe des Nutzers):** am iPhone zeigt Apple keine Pfeile. Die Pfeile sind bei uns nur Anzeige – zu klein
für ein Ziel von 44 pt (R-3.x), Antippen geht an den Eintrag darunter wie heute.

## 3. Muster

| | Verlauf | Pfeile |
|---|---|---|
| **Heute** | 48 px | keine |
| **E** | 48 px wie heute; die äußeren 28 px ganz frei | wie A |
| **A** | 55 px; die äußeren 28 px ganz frei | chevron-left/-right 14 px, grau (`--muted`), 9 px vom Rand, im freien Rand |
| **B** | 65 px; ebenso | wie A |
| **C** | 80 px; ebenso | wie A |
| **D** | 112 px; ebenso | wie A |

Ein Pfeil steht nur, solange es auf seiner Seite weitergeht (wie der Verlauf: mehr als 2 px Rest); am Ende blendet er in 0,2 s aus.
Passt alles, gibt es weder Verlauf noch Pfeile. A 55, B 65 und E 48 px auf Wunsch des Nutzers ergänzt (24.10.2026). Empfehlung Claude: **C 80 px** – deutlich länger als heute, bei
schmalen Kapseln (iPhone hoch, 300 px) bleibt in der Mitte genug klar lesbar; D verblasst hoch auf beiden Seiten fast je einen
Eintrag; bei A und B ist der Verlauf neben dem freien Rand für den Pfeil (28 px) nur 27 bzw. 37 px lang.

**Gewählt (Nutzer 24.10.2026): E – Verlauf 48 px wie heute, dazu die Pfeile.** Länge des Verlaufs bleibt; die äußeren 28 px
bleiben frei für den Pfeil.

## 4. Fall-Liste (wird beim Bau eine Prüfung in `hig.mjs` bzw. `ablauf.mjs`)

| Nr. | Fall | Erwartung | Muster |
|---|---|---|---|
| K1 | iPhone hoch: Reise bearbeiten, Reisemittel, Anfang | Verlauf rechts, Pfeil › rechts, links nichts | ja |
| K2 | Bis zur Mitte wischen | Verlauf und Pfeil auf beiden Seiten | ja |
| K3 | Bis ans Ende wischen | Pfeil › verschwindet, ‹ bleibt; zurück ganz an den Anfang: ‹ verschwindet | ja |
| K4 | iPhone quer: dasselbe | wie K1–K3 | ja |
| K5 | Alles passt (Wetter, Smileys quer, iPad) | kein Verlauf, keine Pfeile | ja |
| K6 | Drehen hoch ↔ quer mit offenem Blatt | Verlauf und Pfeile neu; passt dann alles, verschwinden beide; Rollstand bleibt | ja |
| K7 | Platz wird knapp (Fenster schmaler, iPad geteilt) | Verlauf und Pfeile erscheinen | ja |
| K8 | Smiley-Leiste mit rotate-ccw | Pfeile innerhalb der Kapsel, rotate-ccw bleibt rechts daneben | ja |
| K9 | Antippen am Rand (unter dem Pfeil) | wählt den Eintrag darunter wie heute; der Pfeil fängt nichts ab | ja |
| K10 | Wählen und Abwählen | Breite der Kapsel ändert sich nicht (R-5.4), Pfeile bleiben | ja |
| K11 | Smileys ausblenden/zurücksetzen (Zahl ändert sich) | Verlauf und Pfeile neu, Rollstand bleibt | beim Bau |
| K12 | ‚Bewegung reduzieren‘ | Pfeile ohne Überblenden | ja |
| K13 | Dunkel | Pfeile in `--muted` der dunklen Farbtabelle, gut sichtbar | beim Bau |
| K14 | Größere Textgröße (A-43 Teil 2) | Verlauf und Pfeile nach den neuen Breiten | beim Bau |
| K15 | VoiceOver | Pfeile werden nicht vorgelesen (`aria-hidden`) | beim Bau |
| K16 | Grundregeln nach jedem Schritt (`pruefe.mjs`) | nichts überlappt, nichts springt | beim Bau |

Geräte-Prüfliste: Wischgefühl, ob Verlauf und Pfeile am iPhone als ‚geht weiter‘ gelesen werden, ob die Pfeile stören.

## 5. Regeln

- **15.12 / R-5.4** neu gefasst: ‚seitlich wischbar; ein Verlauf von 80 px (bzw. der gewählten Länge) und ein kleiner Pfeil
  (chevron-left/-right) am Rand zeigen, wo es weitergeht; am jeweiligen Ende verschwinden beide‘. Prüfung `hig.mjs` erweitert:
  Pfeil sichtbar genau dann, wenn es auf seiner Seite weitergeht; Länge des Verlaufs.
- Umsetzung in `design.css` (Maske mit `--fade`) und `ui.js` (`capHtml` mit Pfeilen, `mountCap` schaltet sie); die App ändert
  nichts. Im Reiselogbuch (T-106) nichts Eigenes außer der bewussten Abweichung ‚Wetter 40 px‘ (bleibt).
- Mit **A-76** (Ziehen der Smiley-Leiste ist kein langes Drücken) in einer Version – gleiche Komponente.
