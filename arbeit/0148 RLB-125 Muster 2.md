# RLB-125 – Muster 2 (nach deinem Wunsch)

Stand 21.11.2026 · Sitzung 0148 · iPad quer, hell · Pages ‚success‘ (AppDesign 7871757)

## Link

https://g811141a.github.io/AppDesign/arbeit/RLB-125/index.html

Das Muster hat eigene Beispieldaten, deine echten Reiselogbücher bleiben unberührt. Wer das erste Muster schon geöffnet und ‚Australien‘ dort
entsperrt hat: ‚Toskana‘ lange drücken → ‚Reiselogbuch sperren‘, dann erneut antippen.

## Umgesetzt

- **Gesperrtes Reiselogbuch öffnen** (Kachel antippen oder beim Start) → die **Vorschau** öffnet. Oben steht ein Hinweis mit `lock`:
  ‚Dieses Reiselogbuch ist gesperrt. Es lässt sich lesen und ausgeben, aber nicht ändern oder löschen.‘ Daneben die Schaltfläche **‚Entsperren‘**.
- **‚Entsperren‘** → die Vorschau schließt, die normale Seite des Reiselogbuchs ist offen. Es kommt keine Abfrage.
- **Kachel:** `lock` in **Rot** auf einem weißen Kreis unten rechts, auch auf der blauen (gewählten) Kachel gut zu sehen.

## Schritte (iPad quer, hell)

1. Link öffnen. Erwartet: Die Vorschau von ‚Australien‘ öffnet mit dem Hinweis ‚Dieses Reiselogbuch ist gesperrt.‘ und der Schaltfläche ‚Entsperren‘.
2. x antippen. Erwartet: Die Vorschau schließt, auf der Kachel ‚Australien‘ steht ein rotes `lock`.
3. ‚Toskana‘ antippen, dann ‚Australien‘. Erwartet: Die Vorschau öffnet wieder mit dem Hinweis.
4. ‚Entsperren‘ antippen. Erwartet: Die Vorschau schließt, die normale Seite ‚Australien‘ ist offen, das rote `lock` auf der Kachel ist weg.

## Zu entscheiden: zwei Abweichungen von R-3.3

R-3.3: ‚Jede Farbe hat eine Bedeutung: blau gefüllt nur die Hauptaktion – in einem Fenster … höchstens eine …; Rot nur für Löschen‘.

1. **Rotes `lock`:** Rot bedeutet heute nur Löschen.
   - a) **(Empfohlen)** Rot wie gewünscht, als bewusste Abweichung in R-3.3 genannt (‚… Rot nur für Löschen und das Schloss eines gesperrten
     Eintrags‘). Du willst, dass die Sperre sofort auffällt, und genau das leistet Rot.
   - b) Orange (`--warn`, Farbe für Warnungen). Fällt auf und hält R-3.3 ein.
2. **Zwei blaue Schaltflächen in der Vorschau** (Teilen und ‚Entsperren‘):
   - a) **(Empfohlen)** ‚Entsperren‘ als helle Schaltfläche mit blauer Schrift. Dann bleibt Teilen die einzige blaue Hauptaktion, wie in R-3.3.
   - b) Beide blau gefüllt, als Abweichung.

## Noch offen

- x ohne Entsperren: Heute zeigt das Muster danach die normale Seite, die aber gesperrt bleibt (Tage nur lesen, Menüs blass, wie im ersten
  Muster). Das klären wir beim nächsten Schritt.
- Aus dem ersten Muster: Wischaktionen, allgemeine Regel ‚blasse Menüpunkte‘.

## Rückmeldung (Nutzer 21.11.2026, Sitzung 0148, im Fenster)

- Muster 2: **nicht ok** – was nicht passt, fragt die nächste Sitzung (0149) zuerst nach.
- RLB-125/J-5: Schloss auf der Kachel **orange** (`--warn`) statt rot – R-3.3 bleibt eingehalten.
- RLB-125/J-6: ‚Entsperren‘ in der Vorschau **hell mit blauer Schrift** – Teilen bleibt die einzige blaue Hauptaktion (R-3.3).
