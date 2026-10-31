# APD-97 – Testfall-Liste

Stand 31.10.2026 · Sitzung Reiselogbuch 0060 · Seitenleiste am iPad hoch fest neben dem Inhalt, Tabellen im schmalen Inhalt als Kästen
(Entscheidungen und Wortlaut: `APD-97 Klärung.md`) – Zusammenarbeit 0 Nr. 1: jeder Fall wird ein automatischer Test; was nur das Gerät
zeigt, kommt in die Testfälle (User). Muster nur hell (Vereinbarung 30.10.2026). Nach jedem Schritt die Grundregeln (`pruefe.mjs`).

## Ablauf in einem Satz

Am iPad steht die Seitenleiste hoch wie quer fest links neben dem Inhalt (ohne Abdunkelung, die Auswahl lässt sie stehen, ausblenden nur mit
panel-left, hereinwischen mit Mitschieben); ist der Inhalt schmaler als 700 px, zeigt er jede Tabelle als Kästen wie am iPhone, sonst als
Tabelle; jeder Wechsel lässt oben denselben Eintrag stehen.

## Gemessen im Muster (Reiselogbuch, Chromium, 31.10.2026)

| Ansicht | Fenster | Seitenleiste | Inhalt | Darstellung |
|---|---|---|---|---|
| iPad mini hoch | 744 × 1133 | 365 | 365 | Kästen |
| iPad 11″ hoch | 820 × 1180 | 365 | 441 | Kästen |
| iPad 13″ hoch | 1024 × 1366 | 365 | 645 | Kästen |
| iPad 11″ hoch, Leiste aus | 820 × 1180 | – | 820 | Tabelle |
| iPad 11″ quer | 1180 × 820 | 365 | 801 | Tabelle |
| iPad 13″ quer | 1366 × 1024 | 365 | 987 | Tabelle |

## L – Lage und Bedienung der Seitenleiste (15.4, R-7.5, R-8.1)

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| L-1 | iPad hoch (mini, 11″, 13″) | Start | 3 Reiselogbücher | Seitenleiste fest links neben dem Inhalt, keine Abdunkelung (`.side-shade` fehlt), aktueller Eintrag offen und blau; Inhalt bedienbar (Tag antippen öffnet das Fenster) |
| L-2 | iPad hoch | anderen Eintrag in der Leiste antippen | – | Eintrag öffnet ganz oben bzw. am aktuellen Tag (R-7.4), die Leiste bleibt stehen |
| L-3 | iPad hoch | panel-left | Leiste sichtbar | Leiste gleitet hinaus (~0,35 s), der Inhalt wird breiter, oben bleibt derselbe Tag (R-8.1); erneut panel-left → zurück |
| L-4 | iPad hoch | Wischen nach rechts im Inhalt | Leiste ausgeblendet | Leiste folgt dem Finger, der Inhalt rückt mit; über halbe Breite oder schnell → rastet ein, sonst federt zurück |
| L-5 | iPad hoch | Wischen nach links auf der Leiste bzw. im Inhalt | Leiste sichtbar | nichts ändert sich (Kacheln frei für Wischaktionen) |
| L-6 | iPad | Drehen hoch ↔ quer, hin und zurück, mit Zwischengrößen | Leiste sichtbar und ausgeblendet | Zustand der Leiste bleibt; oben bleibt derselbe Tag (R-8.1) |
| L-7 | iPad | Drehen mit offenem Mehr-Menü der Leiste (auch Untermenü ‚Darstellung‘) | – | Menü an seinem Knopf ganz sichtbar oder geschlossen; nichts gesperrt (deckt den Fall aus APD-94 ab) |
| L-8 | iPad hoch | lange drücken auf eine Kachel der Leiste | – | Kontextmenü rechts daneben, ganz sichtbar, über der Backup-Kachel (R-4.2) |
| L-9 | iPad hoch | Suche in der Leiste, Tastatur offen | – | Leiste folgt dem sichtbaren Bereich (`--vv-top`), Kopf steht fest (R-2.1) |
| L-10 | iPhone hoch und quer, iPad-Fenster unter 700 px | Start, Öffnen, Zurück | – | unverändert: Startliste ohne blauen Eintrag, Seite für Seite (R-7.2, 15.17) |

## D – Tabelle oder Kästen nach der Breite des Inhalts (15.13, R-6.6)

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| D-1 | iPad hoch mit Leiste (mini, 11″, 13″) | Reiselogbuch öffnen | 10 Tage, 6 erfasst | Tage als Kästen (`.box.day`), keine `table.days`; Quartierliste als Liste wie am iPhone |
| D-2 | iPad hoch ohne Leiste, quer mit und ohne Leiste | Reiselogbuch öffnen | wie D-1 | Tabelle (`table.days`), keine Kästen |
| D-3 | iPad | Grenze | Inhalt 699 und 700 px | 699 → Kästen, 700 → Tabelle |
| D-4 | iPad hoch | panel-left bzw. Hereinwischen | Tag 27.08. oben | Wechsel Kästen ↔ Tabelle, oben bleibt der 27.08. (R-8.1) |
| D-5 | iPad | Drehen hoch ↔ quer | Tag 27.08. oben | Wechsel Kästen ↔ Tabelle, oben bleibt der 27.08. |
| D-6 | iPad hoch (Kästen) | Tag antippen, ändern, Häkchen bzw. x | – | Liste steht still, Kasten 2 s blau hinterlegt (R-7.3); ‚heute‘ bzw. nächster offener Tag direkt unter dem Kopf (R-7.4) |
| D-7 | iPad hoch (Kästen) | Suche im Inhalt | Wort in 3 Tagen | ‚1 von 3‘, Pfeile springen von Kasten zu Kasten, Treffer markiert (R-6.1) |
| D-8 | iPad hoch (Kästen) | Teilen → Vorschau, HTML, PDF | – | Vorschau und Ausgabe bleiben Tabellen (R-6.2) |
| D-9 | iPad hoch und quer | große Schrift (AX1 bis AX5) | – | Kästen wie bisher (R-1.10), nichts ragt hinaus, nichts überlappt |
| D-10 | iPad hoch mit Leiste | Daten leer, lang, viele | ohne Tage · Programm mit 300 Zeichen und langem Wort · 60 Tage | Kästen ohne Überlauf (R-6.3), letzter Tag erreichbar, Schnellroll-Griff bei langem Inhalt (R-3.2) |
| D-11 | iPad hoch | Statistik und Reisedaten | Preis und km an | Statistik mit Ø wie am iPhone (RLB-112), Bezeichnungen normal (R-5.8, R-6.5) |

## Testfälle (User) – nur am Gerät

- Hereinwischen hoch: Wischgefühl, Rand mit dem Daumen, kein versehentliches Ausblenden.
- Drehen am iPad mit sichtbarer und ausgeblendeter Leiste: Inhalt wechselt ruhig zwischen Tabelle und Kästen, kein Springen.
- Home-Bildschirm-App und Safari: hoch steht die Leiste neben dem Inhalt.
- Fenster in Split View bzw. Stage Manager: schmal → iPhone-Aufbau, mittel → Leiste und Kästen, breit → Tabelle.
