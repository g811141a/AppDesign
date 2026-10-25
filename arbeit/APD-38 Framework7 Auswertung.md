# APD-38 Framework7 – was AppDesign davon übernehmen kann

**Stand 21.10.2026** · Sitzung ‚Reiselogbuch 0025‘ · Grundlage: Quelltext von **Framework7 9.2.0** (npm, 28.09.2026, MIT),
gelesen, nicht ausgeführt. Anlass: Nutzer – „unglaublich viele Messungen und Tests zur responsiven Entwicklung“.

## 1. Kernbefund: Die Tastatur hätte Framework7 nicht gelöst

- `components/input/input.js`: Felder werden beim Fokus **nur unter Android** in den sichtbaren Bereich gerollt
  (`scrollIntoViewOnFocus = getDevice().android`). Unter iOS überlässt Framework7 alles Safari.
- Im ganzen Paket gibt es **kein `visualViewport`** (0 Treffer). Die Tastatur-Ereignisse (`keyboardDidShow` …) kommen nur
  aus Cordova bzw. Capacitor, also aus einer echten App, nicht aus einer Home-Bildschirm-App.
- Damit hätten wir mit Framework7 dieselben Safari-Eigenheiten (S-1 bis S-9) gehabt. Unsere Lösung aus APD-36 (neuer Fokus nach
  dem Rollen, Rückstellung, `--platz`, Safari-Modell mit Prüfungen) geht weiter als Framework7.
- Die vielen Messungen kamen von Safari in der Home-Bildschirm-App, nicht von fehlenden Bausteinen. Ganz vermeiden ließe sich das
  nur als echte App (Capacitor) – das ist eine andere Frage (Mac oder Bau-Dienst nötig).

## 2. Was Framework7 besser macht – Vorschläge für AppDesign

| Nr. | Vorschlag | Framework7 | AppDesign heute | Nutzen |
|---|---|---|---|---|
| **V1** | **Sichere Ränder prüfbar machen** | alle Ränder über Variablen `--f7-safe-area-top/-bottom/-left/-right`, einmal aus `env()` gesetzt, je Element ein- oder ausschaltbar | 42 × `env(safe-area-inset-…)` direkt in `design.css`; die Prüfbrowser liefern immer 0 → **Aussparung (Dynamic Island) und Home-Leiste werden nie automatisch geprüft** | Prüfungen setzen echte iPhone-Werte (z. B. iPhone 15: hoch oben 59 / unten 34 px, quer links und rechts 59 / unten 21 px) – Überdeckungen findet die Prüfung statt du am Gerät |
| **V2** | **Rückmeldung beim Antippen** | Schaltfläche hellt beim Berühren kurz auf, erst nach 80 ms (beim Wischen blitzt nichts), aufgehoben, sobald der Finger mehr als 5 px wandert (`modules/touch`) | kein `:active` in `design.css` – beim Antippen ändert sich nichts, bis die Aktion kommt | Apple-Standard (HIG: sichtbare Rückmeldung), du siehst, dass der Tipp angekommen ist |
| **V3** | **Titel antippen = nach oben** | `scrollTopOnTitleClick: true` (Standard), rollt den Inhalt in 300 ms nach oben | nur die Kapsel; Statusleiste antippen wirkt im Rollbereich nicht (Designrichtlinie 13) | Ersatz für Apples Statusleisten-Tipp; passt zu **APD-37** |
| **V4** | **Glas-Optik (iOS 26)** | Kapseln und schwebende Schaltflächen als Glas: `backdrop-filter: saturate(180%) blur(16px)`, Fläche 75 % deckend, Lichtkante aus mehreren inneren Schatten, hell und dunkel getrennt | Kapseln deckend (`--btn`) mit Lichtkante und Schatten | näher an iOS 26; nur als Muster, weil Unschärfe auf dem iPad Leistung kosten kann |
| **V5** | **Ziehbarer Index mit Blase** | `list-index`: am rechten Rand ziehen, Blase zeigt die Stelle | – | bestätigt Variante **C** aus APD-37 als gängiges Muster |
| **V6** | **Lange Listen nur sichtbar aufbauen** | `virtual-list`: baut nur die sichtbaren Zeilen | baut alle Tage | erst ab einigen hundert Einträgen nötig – **später** |

## 3. Was ich nicht empfehle

| Nr. | Framework7 | warum nicht |
|---|---|---|
| N1 | Leisten beim Rollen ausblenden (`hideOnPageScroll`) | deine Regel: Kopfzeile und Suche bleiben immer sichtbar (R-2.1; Nutzer 08.10.2026) |
| N2 | Inhalt läuft unter einer durchscheinenden Leiste mit Verlauf durch | dein Wunsch: keine Fragmente über der Titelleiste (Nutzer 08.10.2026) |
| N3 | Feld bei Fokus nur unter Android rollen | unsere Lösung APD-36 ist für iOS gebaut und am Gerät bestätigt (P-61) |
| N4 | Framework7 selbst einbinden | Mischform nur über AppDesign 5 (siehe Chat 21.10.2026); für die Verbesserungen oben nicht nötig |

## 4. Vorschlag zum Vorgehen

- **V1** zuerst (eigene Version, ein Thema): Variablen `--safe-top/-bottom/-left/-right` in `design.css`, alle 42 Stellen
  umstellen, Prüfungen in `hig.mjs` mit den iPhone-Werten (hoch und quer) – vorher gegen 4.28.1 rot, wo heute etwas überdeckt würde.
- **V2 + V3** zusammen mit APD-37 (Thema ‚Antippen und Rollen‘), **V4** als Muster neben dem Muster APD-37.
- **V5** ist in APD-37 schon als Variante C enthalten, **V6** ins Backlog (Prio 3).
- Je Vorschlag vor dem Bau: Testfall-Liste (Zusammenarbeit 0 Nr. 1) und dein Ja.
