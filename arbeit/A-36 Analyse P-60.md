# A-36 – Tastatur ohne Springen: Analyse nach P-60

**Stand 20.10.2026** · Sitzung Reiselogbuch 0019 (Ende) · Grundlage: Rückmeldung P-60 (Reiselogbuch 3.26.0 / AppDesign 4.28.0) und die
Messungen `tests/messungen/2026-10-20 iPhone hoch Fenster Ort.txt`, `tests/messungen/2026-10-20 iPad quer Fenster Ort.txt`, dazu
`tests/messungen/2026-10-19 iPhone quer Suche Fenster Gesamtausgaben.txt`.

## 1. Rückmeldung des Nutzers (20.10.2026, wörtlich zusammengefasst)

| P-60 | Ergebnis |
|---|---|
| /1 iPhone quer Gesamtausgaben | nicht ok: beim Ein- und Ausblenden der Tastatur ist die Kopfzeile nicht fest, sie federt mit dem Betragsfeld |
| /2 quer mit offener Suche | nicht ok: Kopf- und Suchzeile springen beim Ein- und Ausblenden; quer gibt es keine Kapsel ‚Ans Ende‘ (zu wenig Platz) – der Prüfschritt war unsinnig |
| /3 iPhone hoch | nicht ok: Kopf- und Suchzeile springen; die Tastatur liegt etwas über der Kapsel ‚Nach oben / Ans Ende‘ |
| /4 iPad | quer nicht ok: Kopfzeile, Suchzeile und Seitenleiste springen, Kapsel unten rechts nicht sichtbar. **Hoch: alles top, nichts springt** |
| /5 Fenster | nicht ok: iPhone – Kopfzeile springt hoch und quer; iPad – Kopfzeilen springen, das Fenster rutscht an den linken Rand |
| /0, Rest | ok |

Neuer Punkt fürs Backlog (allgemeine Regel): ‚Nach oben‘ und ‚Ans Ende‘ verbessern, z. B. wie in der Gemini-App für iOS → A-37.

## 2. Was die Messungen zeigen (Ursache)

**Immer dasselbe Muster** – bei jedem Feld, das dort liegt, wo die Tastatur aufgeht:

| Messung | Zeile | Ereignis | `vh` | `vt` (offsetTop) | `--vv-top` | Kopfzeile auf dem Bildschirm |
|---|---|---|---|---|---|---|
| iPhone hoch, Fenster, Feld ‚Ort‘ | 228 | vv resize (Tastatur auf) | 409 | **403** | 0 (alt) | **−403** |
| | 229 | 1 ms später, ui.js gleicht aus | 409 | 403 | 403 | 0 |
| | 238 | vv resize (Tastatur zu) | 812 | 0 | 403 (alt) | **+403** |
| iPad quer, Fenster, Feld ‚Ort‘ | 161 | vv resize (Tastatur auf) | 374 | **428** | 0 (alt) | **−428** (Seitenleiste −417) |
| | 170 | vv resize (Tastatur zu) | 802 | 0 | 428 (alt) | **+428** (Seitenleiste 439) |
| iPhone quer, Gesamtausgaben (19.10.) | 406 | vv resize (Tastatur auf) | 170 | **232** | 0 (alt) | **−232** |

1. Liegt das Feld mit Fokus unter der künftigen Tastatur, **verschiebt Safari den sichtbaren Bereich um den ganzen Raum**
   (`offsetTop` = Höhe der Tastatur: 403, 428, 232; `scrollY` ebenso, `innerHeight` schrumpft dabei auf die sichtbare Höhe).
   Das gilt für Felder im Inhalt **und in Fenstern**, am iPhone **und am iPad** (A-27 4 ‚iPad offsetTop immer 0‘ war falsch – dort
   wurde nur die Suche oben gemessen).
2. Safari meldet das **erst 2 Bilder später** (A-27). In diesen Bildern steht der Rahmen noch an der alten Stelle – die Kopfzeile
   ist um die ganze Tastaturhöhe verschoben – dann gleicht ui.js über `--vv-top` aus: **das ist das Springen bzw. Federn**. Beim
   Schließen genauso in die andere Richtung.
3. **Liegt das Feld über der künftigen Tastatur, verschiebt Safari nichts** (`offsetTop` bleibt 0) – deshalb springt am iPad hoch
   nichts und hoch bei der Suche oben nichts. ‚Hoch‘ ist also keine andere Technik: dort muss Safari nichts verschieben.
4. **Folgerung:** Ausgleichen kommt immer zu spät. Das Springen verschwindet nur, wenn **Safari nie verschieben muss** – das Feld
   muss beim Antippen schon über der künftigen Tastatur liegen bzw. Safari darf es nicht dafür halten.

Weitere Befunde (gleiche Ursache oder Folge):
- **Kapsel unter der Tastatur (P-60/3) und am iPad weg (P-60/4):** `--vv-bottom` = `innerHeight − top − h` – mit schrumpfendem
  `innerHeight` (409 bzw. 374) und `offsetTop` 403/428 wird es negativ (0), die Kapsel steht dann zu tief.
- **iPad: Fenster rutscht an den linken Rand (P-60/5):** noch nicht geklärt – `placeDialogs` setzt `margin: 0 auto`, während
  Safari `innerHeight`/Breite des Layout-Bereichs ändert; im nächsten Schritt nachbilden.
- **P-60/2:** der Schritt ‚Ans Ende‘ setzte eine Kapsel voraus, die quer mit Suche und Tastatur ausgeblendet ist – Fehler in der
  Prüfliste (Claude).

## 3. Warum es die Prüfungen nicht gefunden haben

- Die Zeile mit der verschobenen Kopfzeile **stand schon in der Messung vom 19.10.** (Zeile 406: Kopfzeile −232). Claude hat
  beim Bau von A-35 und A-31 nur das **Feld** behandelt und diese Zeile als ‚Übergang‘ übergangen; `spieleAb` vergleicht nur den
  Endzustand je Schritt, `checkFieldVisible` misst 500 ms danach – das Springen dazwischen sieht keine Prüfung. Das war der Fehler.
- Das Safari-Modell verschob den sichtbaren Bereich nur für Felder im Rollbereich und gar nicht am iPad; Fenster und iPad liefen
  ohne das Verschieben – dort konnte nichts springen.
- Die Prüfungen laufen in Chromium/WebKit unter Linux ohne echte Tastatur; was Safari zwischen zwei Bildern tut, zeigt nur das
  Modell – es muss deshalb **jedes Bild** prüfen, nicht den Endzustand.

## 4. Vorschlag für die nächste Sitzung (Korrektur 4.28.1 / 3.26.1, erst Fall-Liste und Ja)

1. **Prüfungen zuerst rot (0 Nr. 1):**
   - Safari-Modell: Verschieben um den ganzen Raum für **jedes** Feld unter der künftigen Tastatur (Inhalt und Fenster), iPhone
     **und iPad** (iPad quer gemessen: Tastatur 428 px, sichtbar 374 von 802), `innerHeight` schrumpft mit.
   - Grundregel ‚Leisten stehen in **jedem Bild** still‘ beim Öffnen und Schließen der Tastatur (Aufnahme `__safari.bilder`):
     Kopfzeile, Suchzeile, Seitenleiste, Fensterkopf; Fenster bleibt mittig; Kapsel über der Tastatur.
   - `spieleAb` vergleicht **jede** Zeile (auch die Meldung ‚vv resize‘): Kopfzeile auf dem Bildschirm 0 ± 1 – gegen 4.28.0 rot
     mit den drei Messungen.
2. **Lösung so, dass Safari nie verschieben muss** – zuerst ein Muster am Gerät mit Messung (0 Nr. 20), Varianten:
   - **V1 Feld vorher nach oben:** beim Antippen (vor dem Fokus, `touchstart`) rollt ui.js Inhalt bzw. Fenster so, dass das Feld
     über der künftigen Tastatur liegt (Höhe aus der letzten Messung je Gerät und Lage, sonst Schätzung 50 %).
   - **V2 Fokus oben:** das Feld wird für den Augenblick des Fokus oben platziert (Safari sieht es oben, verschiebt nicht), danach
     rollt ui.js es über die Tastatur.
   - **V3 Systemweg:** prüfen, ob iOS 26 `interactive-widget=resizes-content` (Viewport-Meta) oder `navigator.virtualKeyboard`
     kennt – dann verkleinert Safari den Bereich, statt zu verschieben.
3. `--vv-bottom` aus `visualViewport` allein berechnen; iPad-Fenster am linken Rand nachbilden und beheben.
