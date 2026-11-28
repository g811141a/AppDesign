# RLB-130 – Auswertung der Messung, Testfall-Liste, Wortlaut und Bau-Frage (Sitzung AppDesign 0009)

**28.11.2026** · Korrektur zu RLB-129 (P-128 fehlgeschlagen). Nichts gebaut. Vorher: `arbeit/RLB-130 Rückmeldung P-128.md`.

## 1. Die Messungen (iPad Pro 2024, Safari 27.2, Home-Bildschirm, hell)

Auszüge in `arbeit/RLB-130/`. Fenster quer 1194 × 802, hoch 834 × 1162 (Spalte `ih`).

| Lauf | Liste | quer gerollt | hoch | zurück quer | erwartet zurück quer |
|---|---|---|---|---|---|
| 1 (09:08) | ‚Zuletzt gelöscht‘ | 231 | 0 (alle passen) | **0** | 231 |
| 1, mit Kontextmenü | ‚Zuletzt gelöscht‘ | 339 | 0 | **0** | 339 |
| 2 (09:11) | 7 Reiselogbücher | 303 | 135 (Rollweg hoch) | **135** | 303 |

- **Befund:** Zurück quer ändert sich der Rollstand der Liste gar nicht (`lroll` bleibt, kein ‚scroll div‘ nach dem `resize`). Er bleibt auf dem Wert von hochkant stehen.
- **Ablauf beim Drehen:** zuerst `resize` mit der neuen Größe, 4 ms später `visualViewport` resize, rund 520 ms nach `resize` ‚drehen‘ (`orientationchange`). Hochkant kommt das Kürzen des Rollstands (‚scroll div‘) erst nach der Meldung von `visualViewport`.
- Im Lauf 2 passen hochkant nicht alle 7 Reiselogbücher, der Rollweg ist dort 135 px. Die Messung zeigt dasselbe Fehlerbild wie Lauf 1.

## 2. Ursache und Modell

- **Ursache, Vermutung, gestützt auf beide Messungen:** Beim Drehen am iPad meldet Safari `resize`, während die Seitenleiste (`position: fixed`) noch ihre alte Höhe hat. Die App stellt die Liste genau in diesem `resize` zurück (`sideTopHold`). Der Rollweg ist dann noch der von hochkant, Safari kürzt den Rollstand darauf. Danach bekommt die Leiste ihre neue Höhe, die App stellt aber nicht noch einmal zurück.
- **Modell** (neu, nachgebaut in der Prüfumgebung): Die Seitenleiste behält beim `resize` ihre alte Höhe und bekommt die neue erst 4 ms danach.
  - **Mit 3.59.2:** Bei 9 Reiselogbüchern (hochkant passen alle) steht zurück quer `t0` oben, also das 1. statt des 3. Reiselogbuchs (Rollstand 0), wie Lauf 1.
  - Mit 11 Reiselogbüchern bleibt zurück quer der Rollweg von hochkant (189), wie Lauf 2. Das gilt in Chromium und WebKit.
  - **Ohne das Modell** ist alles grün. Darum hat `ablauf-seitenleiste-drehen` den Fehler nicht gesehen: Das Drehen am iPad war nie gemessen, und das Modell kannte diese Eigenheit nicht.
- **Korrektur (ausprobiert, nicht gebaut):** Die App stellt die Liste noch einmal zurück, sobald die Seitenleiste ihre neue Größe hat (`ResizeObserver` an `#side`, nur solange gedreht wird). Dann sind alle ausprobierten Fälle grün: mit 9 und 12 Reiselogbüchern 5 Arten zu drehen (mit dem Modell, in einem Schritt, über eine Zwischengröße, `resize` zurückgehalten, in 5 Schritten) in Chromium und WebKit, mit 10 und 11 Reiselogbüchern das Modell in WebKit.

## 3. Testfall-Liste RLB-130 (Testfälle automatisch, 0 Nr. 1)

Gerät **iPad quer 1194 × 802 und hoch 834 × 1162** (wie gemessen), hell, Chromium und WebKit, **mit dem neuen Modell**. Es wird gedreht: quer → hoch → quer → hoch → quer. Nach jedem Schritt gelten die Grundregeln (`pruefe.mjs`).

| Nr. | Fall | Erwartet | rot gegen 3.59.2 |
|---|---|---|---|
| T-1 | Reiselogbücher, hochkant passen alle; quer so gerollt, dass das 3. oben steht (dein Ablauf P-128/1) | zurück quer steht oben wieder das 3. (±2 px), nach jedem Drehen | ja (oben das 1.) |
| T-2 | Reiselogbücher, hochkant kürzerer Rollweg (wie Lauf 2: quer 303) | hochkant so weit unten wie möglich, voriger oberster sichtbar; zurück quer oben wieder derselbe | ja (bleibt auf dem Rollweg hochkant) |
| T-3 | ‚Zuletzt gelöscht‘, hochkant passen alle, quer gerollt (P-128/2 Schritt 4) | wie T-1 | ja |
| T-4 | ‚Zuletzt gelöscht‘, Kontextmenü an der untersten ganz sichtbaren Kachel offen (P-128/2 Schritt 6) | nach jedem Drehen: Menü offen neben seiner Kachel, Kachel blau und ganz sichtbar; zurück quer oben derselbe Eintrag; neben das Menü tippen schließt es, nichts wird ausgelöst | ja |
| T-5 | Dieselbe Lücke überall: alle Fälle RLB-128/T-1 bis T-9 und RLB-129/T-1 bis T-8 zusätzlich mit dem Modell | wie freigegeben | – |
| T-6 | Dieselbe Lücke im Inhalt: Tabelle der Tage und Kästen, iPad quer ↔ hoch mit dem Modell (auch `#app` behält beim `resize` die alte Höhe) | oben bleibt derselbe Tag (R-8.1) | ist zu prüfen |
| T-7 | Modell gegen Messung: Daten mit dem Rollweg der Messungen, 3.59.2 | ergibt genau das Gemessene (zurück quer 0 bzw. = Rollweg hochkant) | – (Probe des Modells) |
| T-8 | Gegenprobe: Zurückstellen nach der neuen Größe entfernt | T-1 bis T-4 werden rot | `--gegenprobe` |
| T-9 | `ablauf-jahre` (RLB-114/Y-7) und `ablauf-seitenleiste-drehen` RLB-129/T-6 (gewählter Eintrag rollt nach dem Drehen ins Bild) | bleiben grün | – |

- **Usertest (am Gerät), P-129:** /0 Version (Reiselogbuch 3.59.3, AppDesign 4.71.1), dann deine Schritte aus P-128/1 und P-128/2 (ersetzt P-128).

## 4. Wortlaut (0 Nr. 29, 0 Nr. 20) – Designrichtlinie 13, neuer Punkt nach ‚Neue Fenstergröße vor `resize`‘

**Alt:** – (neu)

**Neu:**
> - **Feste Elemente bekommen ihre neue Größe erst nach `resize` (iPad, Home-Bildschirm)** (R-8.1, Messung 28.11.2026, iPad Pro 2024, Safari 27.2, RLB-130 – `arbeit/RLB-130/`): Beim Drehen meldet Safari `resize` mit der neuen Fenstergröße, während feste Elemente (`position: fixed`, z. B. die Seitenleiste) noch die alte Höhe haben; die neue haben sie kurz danach (`visualViewport` meldet 4 ms später). Ein Rollstand, den die App im `resize` setzt, wird vom alten Rollweg gekürzt. Darum stellt die App die Liste noch einmal zurück, sobald die Leiste ihre neue Größe hat (`ResizeObserver`, solange gedreht wird). Ursache als Vermutung: Das Modell bildet beide Messungen genau nach. Safari-Modell `festNachResize`. Prüfung: Reiselogbuch `tests/ablauf-seitenleiste-drehen.mjs` (RLB-130/T-1 bis T-9).

- Dazu kommt im Kopf von `tests/safari.mjs` ein Absatz mit derselben Quelle (0 Nr. 20: ein Modell).

## 5. Bau-Frage (0 Nr. 21, 0 Nr. 8)

- **Korrekturversion vor allem Neuen**, also vor `v5/`:
  - **AppDesign 4.71.1:** Safari-Modell `festNachResize` in `tests/safari.mjs` und Designrichtlinie 13 (Abschnitt 4). AD-Bean: keine, weil nur Prüfung und Richtlinie.
  - **Reiselogbuch 3.59.3:** Korrektur in `index.html`, Prüfung `ablauf-seitenleiste-drehen` mit RLB-130/T-1 bis T-9, gehoben auf AppDesign 4.71.1.
- **Prüflauf voll.** `stufe` schlägt ‚voll‘ vor; der Code von `index.html` und das Modell ändern sich.
- **Danach** folgt `v5/` (AppDesign 5.0.0) mit Reiselogbuch 3.60.0. Es setzt auf 4.71.1 und 3.59.3 auf.
