# RLB-111 · APD-95 – Testfall-Liste

Stand 30.10.2026 · Sitzung Reiselogbuch 0058 · Rückmeldung P-81/6 und P-81/7 (Preis auf Wunsch, Statistik, Kilometer mit einer
Nachkommastelle) und Bezeichnungen normal statt fett (allgemein) – Zusammenarbeit 0 Nr. 1: jeder Fall wird ein automatischer Test;
was nur das Gerät zeigt, kommt in die Testfälle (User). Muster nur hell (Vereinbarung 30.10.2026).

## Ablauf in einem Satz

Der Preis eines Quartiers wird nur erfasst und gezeigt, wenn in den Einstellungen der Reise ‚Preis der Quartiere erfassen‘
eingeschaltet ist; dann steht er am Tag des Eintrags in Klammern hinter dem Quartier; die Statistik zeigt den Durchschnitt in
Klammern hinter Quartierkosten und gegangenen Kilometern; Kilometer haben immer eine Nachkommastelle; Feldbezeichnungen und
Einheiten stehen in normaler Schrift.

## P – Preis auf Wunsch (RLB-111/1, /4, /5)

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| P-1 | alle | Einstellungen der Reise | neu und alt | Schalter ‚Preis der Quartiere erfassen‘ nach ‚Quartierliste in der Ausgabe‘, Voreinstellung aus; Hinweis nennt Feld, Spalte, Quartierkosten |
| P-2 | alle | Schalter aus | Preise vorhanden | kein Feld ‚Preis‘, keine Spalte ‚Preis‘ (iPad, iPhone, Ausgabe), keine Klammer hinter dem Quartier, keine Quartierkosten; Werte bleiben, wieder ein → wieder da |
| P-3 | alle | Spalte Quartier aus | Schalter ein | Schalter gesperrt wie ‚Quartierliste in der Ausgabe‘; nichts vom Preis sichtbar |
| P-4 | iPad (Tabelle), iPhone (Kachel), Ausgabe | Quartier mit Preis | 1240 am 24.08., ‚wie Vortag‘ 25.–26.08. | nur am 24.08. ‚Hotel Adlon, Cairns (1.240,00 €)‘; Folgetage ohne Klammer |
| P-5 | alle | schmale Spalte, langer Name | – | bricht um, dann vor der Klammer; ‚(1.240,00 €)‘ nie getrennt |
| P-6 | alle | Statistik | 1.240 (3 Nächte) + 200 (2), eine ohne Preis | eine Zeile ‚Quartierkosten: 1.440,00 €␣␣␣␣␣(Ø␣␣␣288,00 €)‘ (geschützte Leerzeichen, immer eine Zeile); keine Zeile ‚Ø je Nacht‘ |
| P-7 | alle | Ausgabe HTML und PDF | – | Klammer hinter dem Quartier, Statistikzeile wie P-6, feste Breiten (R-6.2) |
| P-8 | iPad + iPhone | Backup laden / Abgleich | altes Backup | lädt fehlerfrei, Schalter aus; Schalter wird abgeglichen (Feldname ‚Preis der Quartiere erfassen‘) |

## K – Kilometer mit einer Nachkommastelle (RLB-111/6, /7, P-81/7)

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| K-1 | alle | Tippen | ‚12,5‘, ‚123‘, ‚1,25‘, ‚a‘, ‚12.5‘ | Komma-Tastatur (`inputmode="decimal"`); erlaubt 0,1–99,9: ‚12,5‘, ‚12‘, ‚1,2‘, nichts, ‚12,5‘ |
| K-2 | alle | Feldbreite, ⓧ | ‚99,9‘, normal und große Schrift | Wert passt ganz, rechtsbündig, springt nicht beim ⓧ (APD-93) |
| K-3 | alle | Anzeige | 6 und 12,5 | ‚6,0‘ und ‚12,5‘ in Feld, Tabelle, Kachel, Ausgabe |
| K-4 | iPhone | Kachel | 12,5 | Zeile ‚🚶🏽‍♂️km‘ · ‚12,5‘ (Wert ohne ‚km‘) |
| K-5 | alle | Statistik | 6, 14, 12,5, 3 | ‚Gegangene Kilometer: 35,5 km␣␣␣␣␣(Ø␣␣␣8,9 km)‘, immer eine Zeile; keine Zeile ‚Ø je Tag‘ |
| K-6 | iPad + iPhone | Backup / Abgleich | ganze Zahlen alt, Kommazahl neu | alt bleibt (14 → ‚14,0‘), Kommazahl wird abgeglichen; Unbrauchbares (0, 100, Text) fällt weg |

## B – Bezeichnungen normal (APD-95, R-5.8)

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| B-1 | alle | Fenster mit Feldern | Erfassung, Einstellungen, Backup | jede Feldbezeichnung (`label` außer Schritt- und Kasten-Überschrift) `font-weight` 400 |
| B-2 | alle | Schritt-Überschriften | ‚④ Gegangene Kilometer‘, ‚Konfiguration Tabellenspalten‘ | bleiben 600 |
| B-3 | alle | Einheit nach einem Feld | ‚€‘ bei Preis und Gesamtausgaben, ‚km‘ | 400 und Textgröße (Body) |
| B-4 | alle | große Schrift, Drehen | – | Grundregeln, Bezeichnung und Feld bleiben zusammen (R-5.1) |
| B-5 | Gegenprobe | `label` wieder 600 | – | Prüfung R-5.8 wird rot |

**Bestätigt 30.10.2026** (Nutzer, Sitzung 0058): P-1 bis P-8, K-1 bis K-6, B-1 bis B-5. Muster: Änderung folgt.
