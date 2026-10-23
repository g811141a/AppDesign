# Fall-Liste A-69 (R-7.4 erweitert: aktueller Eintrag oben) und Reiselogbuch T-98 (Startposition beim Öffnen)

Stand 23.10.2026 · Sitzung Reiselogbuch 0033 · geplant: **AppDesign 4.32.0** und **Reiselogbuch 3.30.0** (Sammelversion,
ein Thema) · Entscheidungen des Nutzers vom 23.10.2026: läuft die Reise und ist alles erfasst, steht heute oben; heute ohne
Gelb, wenn erfasst; Gelb nur bis heute; R-7.4 allgemein erweitert.

## A-69 – R-7.4 erweitert (allgemein)

**Regel (neu gefasst):** Ein Eintrag öffnet **ganz oben**. Legt die App einen ‚nächsten offenen‘ Eintrag fest, steht er
**hervorgehoben** direkt unter dem Kopf bzw. Tabellenkopf, nie in der Mitte. Legt sie stattdessen einen **aktuellen** Eintrag
fest (z. B. heute), steht dieser ebenso direkt unter dem Kopf, aber **ohne Hervorhebung** – hervorgehoben wird nur, was offen
ist, nie Künftiges. Gebaut in `ui.js` (`openAt`, unverändert).

**Prüfung:** `checkOpenAt` bekommt `markiert` (was hervorgehoben sein muss; Vorgabe = `want`, damit bestehende Aufrufe gleich
bleiben); `markiert: null` verlangt: `want` oben, nichts hervorgehoben.

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| A1 | `want` und `markiert` gleich (bisher) | unverändert | checkOpenAt (alle bisherigen Aufrufe) |
| A2 | `want` gesetzt, `markiert: null` | `want` direkt unter dem Kopf, kein Eintrag hervorgehoben | checkOpenAt |
| A3 | Gegenprobe: `want` hervorgehoben, obwohl `markiert: null` | rot | Selbsttest / Gegenprobe |

## T-98 – Startposition im Reiselogbuch

Datum in der Prüfung fest eingestellt (Playwright-Uhr), damit ‚heute‘ in jedem Lauf gleich ist. Jeder Fall in iPad quer,
iPad hoch, iPhone hoch, iPhone quer, hell und dunkel; beim App-Start (zuletzt verwendetes Reiselogbuch) und beim Öffnen aus
der Seitenleiste bzw. der Startliste, vorher ein anderes Reiselogbuch weit unten.

| Nr. | Reise | Erfasst | Oben | Gelb | gegen 3.29.0 |
|---|---|---|---|---|---|
| F1 | vergangen | Lücke (Tag 15) | erste Lücke | erste Lücke | grün (wie bisher) |
| F2 | vergangen | alles | ganz oben | keine | grün (wie bisher) |
| F3 | läuft | Lücke vor heute | erste Lücke | erste Lücke | grün (wie bisher) |
| F4 | läuft | heute fehlt, davor alles | heute | heute | grün (wie bisher) |
| F5 | läuft | alles bis heute, danach Lücken | **heute** | **keine** | rot (morgen gelb und oben) |
| F6 | läuft | alles, auch künftige Tage | **heute** | keine | rot (ganz oben) |
| F7 | in der Zukunft | nichts | **ganz oben** | **keine** | rot (Tag 1 gelb unter dem Kopf) |
| F8 | in der Zukunft | teilweise geplant | **ganz oben** | **keine** | rot (erste Lücke gelb) |
| F9 | läuft, heute = erster Reisetag, erfasst | – | heute (= Tag 1) direkt unter dem Kopf | keine | rot |
| F10 | läuft, heute = letzter Reisetag, alles erfasst | – | heute; nicht so weit rollbar → ganz unten, heute sichtbar | keine | rot |
| F11 | iPhone, F6 und F7 | – | heute direkt unter der Leiste bzw. ganz oben mit großem Titel | keine | rot |

Danach gelten unverändert: Seitenleiste ein/aus (R-8.1) und Drehen lassen denselben Tag oben; Zurück aus dem Fenster ‚Tag‘
springt nicht (R-7.3); beim Öffnen gilt ‚Alle Tage‘; Etiketten ‚heute‘ und ‚fehlt‘ unverändert.

**Am Gerät (Prüfliste):** ein laufendes Reiselogbuch mit allen Tagen bis heute öffnen → heute oben ohne Gelb; ein geplantes
Reiselogbuch öffnen → ganz oben, nichts gelb; ein vergangenes mit Lücke → erste Lücke gelb oben (wie bisher).
