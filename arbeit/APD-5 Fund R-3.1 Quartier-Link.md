# APD-5 – Fund der neuen Grundregeln: Quartier-Link zu schmal (R-3.1)

**Stand 14.10.2026** · gefunden beim Bau von Version A (AppDesign 4.13.0 · Reiselogbuch 3.12.0)

**Entschieden 14.10.2026: a (unsichtbar 44 px), in Version A.** Umgesetzt: `.ln.q a::after, #qHint a::after` (Reiselogbuch
`index.html`), `hig.mjs` zählt die Fläche mit; Prüfung vorher rot (‚Hotel‘ 42 px), danach grün; geprüft auch ‚B&B‘ (33 px
breit, Tippen 20 px links und rechts der Mitte trifft den Link). Usertest P-35/1.

## Was gefunden wurde

In der Tabelle (iPad) ist der Name des Quartiers ein Link zur Karte. Der Link ist oben und unten 12 px gepolstert, aber nur
so **breit wie sein Text**. Bei kurzen Namen ist die Antippfläche schmaler als 44 px:

- ‚Hotel‘ → 42 × 68 px (mindestens 44 × 44, R-3.1)
- Je kürzer der Name (‚B&B‘, ‚Alm‘), desto schmaler.

**Warum bisher übersehen:** `hig.mjs` misst mit Testdaten, in denen alle Quartiere lange Namen haben (‚Hotel Rocks‘,
100 × ‚a‘). Erst die neuen Grundregeln nach jedem Schritt laufen auch mit den Daten der Ablauf-Tests (‚Hotel‘).

**Gilt auch für:** die Quartierliste (`.irow`) und den Hinweis `#qHint` – gleiche Regel `.ln.q a, #qHint a { padding: 12px 0 }`.

## So macht es Apple

Die HIG verlangt 44 × 44 pt für alles, was man antippt. Bei Links mitten im Text (Notizen, Mail) bleibt der Link optisch so
breit wie das Wort; iOS vergrößert die Antippfläche unsichtbar über den Text hinaus.

## Möglichkeiten

| | Lösung | sichtbar? | Folge |
|---|---|---|---|
| **a (Empfehlung)** | Antippfläche **unsichtbar** auf mindestens 44 px verbreitern (wie iOS): eine durchsichtige Fläche um den Link, die Schrift und der Abstand bleiben genau gleich | nein | R-3.1 erfüllt für jeden Namen; die Prüfung misst die Fläche mit |
| b | Bewusste Abweichung wie bei den Essen-Links (Abschnitt 16): Quartier-Links bleiben so schmal wie der Text | nein | Prüfung zählt sie nicht mehr; kurze Namen bleiben schwer zu treffen |
| c | Link links und rechts um je 6 px polstern (mit Gegenrand, damit nichts verrutscht) | nein | reicht für ‚Hotel‘, aber nicht für sehr kurze Namen (‚B&B‘) |

Zu a: Das ist eine Änderung an der App (Reiselogbuch, CSS) und an der Messung in `hig.mjs` (Antippfläche = Link mit seiner
unsichtbaren Fläche). Sie käme in Version A mit (Prüfung zuerst rot, dann grün, Zusammenarbeit 7) oder als eigene
Korrekturversion danach.
