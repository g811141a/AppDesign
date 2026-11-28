# RLB-130 und Ablauf einer Änderung – Entscheidungen (Sitzung AppDesign 0009)

**28.11.2026** · Grundlage: `arbeit/RLB-130 Auswertung und Testfall-Liste.md` (Messung, Ursache, Modell).

## Entschieden (Nutzer 28.11.2026, im Fenster)

- **Wortlaut 0 Nr. 25, 0 Nr. 1 und 0 Nr. 2 freigegeben** (Abschnitt ‚Wortlaut‘ unten). Er wird mit AppDesign 4.71.1 eingetragen (Zusammenarbeit allgemein 3.20.0; APD-153 in `v5/` bekommt dann 3.21.0). 0 Nr. 2 ‚Eine Bean wird einmal geprüft‘ gilt erst, sobald APD-147 das Werkzeug dafür gebaut hat.
- **RLB-130: Möglichkeit A** – die App stellt die Liste noch einmal zurück, sobald die Seitenleiste ihre neue Höhe hat (`ResizeObserver` an `#side`, nur solange gedreht wird); beim Bau prüfen, ob das das Zurückstellen im `resize` ganz ersetzt. **Keine neuen Testfälle:** `ablauf-seitenleiste-drehen` dreht künftig wie am iPad gemessen (neues Modell `festNachResize` in `tests/safari.mjs`: die Seitenleiste behält beim `resize` die alte Höhe, die neue kommt 4 ms danach) und nutzt die Fenstergröße des iPads (quer 1194 × 802, hoch 834 × 1162); die vorhandenen Fälle RLB-129/T-2, T-3, T-4, T-5 müssen damit gegen 3.59.2 rot und mit der Korrektur grün sein. Die übrigen Drehprüfungen laufen mit dem Modell mit; wird eine rot, vorher fragen. Die lange Testfall-Liste T-1 bis T-9 und die schlanke Liste T-1 bis T-3 entfallen.
- **Später als Bean:** ‚Lage der Seitenleiste beim Drehen behalten‘ – bei APD-142 (nach `v5/`).
- **Bau-Frage: Ja** – Reiselogbuch 3.59.3 mit AppDesign 4.71.1 (RLB-130), Prüflauf voll, in AppDesign 0010. Danach `v5/`.
- **Noch offen:** der Wortlaut für Designrichtlinie 13 (neuer Punkt ‚Feste Elemente bekommen ihre neue Größe erst nach `resize`‘, Abschnitt 4 der Auswertung) – in 0010 vor `vorbereiten` zur Freigabe vorlegen (0 Nr. 29).
- Usertest P-129 (ersetzt P-128): /0 Version 3.59.3 / AppDesign 4.71.1, dann die Schritte von P-128/1 und P-128/2.

## Wortlaut (0 Nr. 29)

**0 Nr. 25, Anfang – alt:**
> **Ablauf einer Änderung:** nachfragen, bis alles geklärt ist → Muster (Nr. 6, 23) mit Testfall-Liste (Nr. 1) → …

**0 Nr. 25, Anfang – neu:**
> **Ablauf einer Änderung:** nachfragen, bis alles geklärt ist → **Möglichkeiten der Umsetzung** – bei einem einfachen Einbau eine oder zwei, sonst drei –, je mit dem, was sie kann, wie sie eingebaut wird (neue Funktionen **vorrangig als AD-Bean**, R-1.13), wie viele neue Testfälle (automatisch) dazukommen und wie viel länger der volle Prüflauf damit dauert (Schätzung), die Empfehlung zuerst → Muster (Nr. 6, 23) mit Testfall-Liste (Nr. 1) → …

**0 Nr. 1, neuer Satz nach ‚… jeder Fall wird ein Testfall (automatisch) mit fester Prüfung‘:**
> Ein Testfall erweitert, wo es geht, eine vorhandene Prüfung; eine neue Prüfung nur für das, was keine vorhandene zeigen kann – jeder neue verlängert jeden Bau.

**0 Nr. 2, neuer Satz am Ende (gilt, sobald APD-147 das Werkzeug dafür gebaut hat):**
> **Eine Bean wird einmal geprüft:** Ihre Prüfungen laufen nur, wenn eine AppDesign-Version sie ändert, oder wenn die App eine falsche oder fehlende Reaktion von ihr zeigt; der Prüflauf einer App-Version prüft das Ergebnis in der App.

