# APD-97 – iPad hoch: Seitenleiste neben dem Inhalt, Tabellen als Kästen

Wunsch des Nutzers aus P-82 ‚Sonstiges‘ (30.10.2026, Sitzung 0058); geklärt in Sitzung 0060 (31.10.2026). Allgemein, Priorität 1.

## Entscheidungen (Nutzer 31.10.2026)

| Nr. | Frage | Entscheidung |
|---|---|---|
| E-1 | Was heißt ‚iPad hoch mit eingeschalteter Seitenleiste‘? | Die Seitenleiste steht hoch **neben** dem Inhalt wie quer (Apple `tile` statt `overlay`); der schmalere Inhalt zeigt Tabellen als Kästen wie am iPhone |
| E-2 | Priorität | 1 hoch |
| E-3 | Wonach umschalten? | Nach der Breite des Inhalts: unter 700 px Kästen (gleiche Grenze wie `isPhone()`), sonst Tabelle |
| E-4 | Gesten hoch | Wie quer: Hereinwischen mit Mitschieben, Ausblenden nur mit panel-left; keine Abdunkelung, kein Wischen nach links |
| E-5 | Regelwortlaut | Bestätigt (unten), wird mit der Version eingetragen |
| E-6 | Vorbild | Der Nutzer schickt ein Bildschirmfoto einer Apple-App am iPad hoch mit Seitenleiste (`apple-referenz/ipad/`) |

## Apple-Abgleich

- UIKit `UISplitViewController.SplitBehavior.tile`: „The sidebars and secondary view controller appear tiled side-by-side … The
  secondary view controller’s view is fully interactive.“ – https://developer.apple.com/documentation/uikit/uisplitviewcontroller/splitbehavior-swift.enum/tile
- `overlay`: „The sidebars are layered on top of the secondary view controller“ – https://developer.apple.com/documentation/uikit/uisplitviewcontroller/splitbehavior-swift.enum/overlay
- `preferredSplitBehavior`, Voreinstellung `automatic`: wählt nach dem verfügbaren Platz – https://developer.apple.com/documentation/uikit/uisplitviewcontroller/preferredsplitbehavior
- HIG Sidebars: Seitenleiste ausblendbar, nicht von vornherein ausgeblendet – https://developer.apple.com/design/human-interface-guidelines/sidebars
- Offen: welche Apple-App hoch `tile` zeigt (Bild des Nutzers, E-6).

## Bestätigter Wortlaut (Designrichtlinie allgemein)

1. **15.4 Verhalten** – neu: „beim Start immer eingeblendet, **quer und hoch fest links neben dem Inhalt** (wie Apple `tile`), mit
   dem aktuellen Eintrag geöffnet (…); mit panel-left aus- und einblendbar (gleitet, bis zum nächsten Start); keine Abdunkelung,
   die Auswahl lässt sie stehen.“
2. **15.4 Gesten (R-7.5)** – neu: „**Hoch wie quer:** ist sie ausgeblendet, holt Wischen nach rechts von überall im Inhalt sie
   herein – sie folgt dem Finger und der Inhalt rückt mit; fertig nach halber Breite oder schnellem Wischen, dann rastet sie links
   ein und der Inhalt wird schmaler, sonst federt sie zurück. Ausblenden nur mit panel-left.“ Abdunkelung und Wischen nach links
   entfallen.
3. **15.4 Drehen** – „sichtbar bleibt sichtbar (neben dem Inhalt)“; **15.6 Beim Drehen** – die Klammer ‚(iPad hoch: darübergelegt)‘
   entfällt.
4. **15.13 Tabelle** – neuer Absatz: „**Schmaler Inhalt** (R-6.6): ist der Inhalt schmaler als 700 px (dieselbe Grenze wie
   `isPhone()`, z. B. am iPad hoch neben der Seitenleiste), zeigt jede Tabelle im Inhalt ihre Zeilen als Kästen wie am iPhone
   (15.17, `.box` mit `.kv`); Vorschau und Ausgabe bleiben Tabellen (R-6.2). Ein Wechsel (Drehen, Seitenleiste ein/aus) wirkt wie
   das Drehen (R-8.1).“
5. **17 Regelkatalog** – neu R-6.6: „**Tabelle im schmalen Inhalt als Kästen:** Inhalt unter 700 px breit → Tabellen im Inhalt als
   Kästen, sonst Tabelle; Ausgabe und Vorschau unverändert; oben bleibt derselbe Eintrag | hig.mjs (iPad hoch mit und ohne Leiste,
   quer) | – | 15.13“. R-7.5: „am iPad hoch holt Wischen … geht sie, panel-left und Abdunkelung lassen sie gleiten“ wird zu „am
   iPad hoch und quer holt Wischen nach rechts die ausgeblendete Seitenleiste herein, der Inhalt rückt mit …“.

## Noch offen

Bild des Nutzers (E-6) → Muster (nur hell) mit gemessener Inhaltsbreite je iPad → Testfall-Liste (`APD-97 Testfall-Liste.md`).
