# Testfall-Liste RLB-86 – Link nur über den Ort (Essen und Trinken)

Stand 17.10.2026 · Sitzung Reiselogbuch 0009 · geplant: **Reiselogbuch 3.18.0** (Fassung bleibt 4.19.0)
(Zusammenarbeit 0 Nr. 1; jeder Fall wird eine automatische Prüfung, „Gerät“ = Testfälle auf iPad/iPhone)

**Heute:** Der Name (Maps-Link) endet nur an ‚ – ‘ (Strich mit Leerzeichen). Fehlt er, wird die ganze Zeile zum Link.
**Neu:** Der Name endet am **ersten** von: ‚ – ‘ bzw. ‚ - ‘, Komma, Doppelpunkt, öffnende Klammer. Der Rest ist normaler Text.
Gebaut an einer Stelle (`splitName`); sie gilt für Tabelle (iPad), Tageskästen (iPhone) und Ausgabe (HTML/PDF).
Gesucht wird in Maps wie bisher mit dem Namen und dem Ort des Quartiers.

| Nr. | Zeile im Feld ‚Essen und Trinken‘ | Link | normaler Text | Prüfung |
|---|---|---|---|---|
| L1 | `😋 Krone – sehr gut` | Krone | – sehr gut | wie bisher |
| L2 | `😋 Krone, sehr gut` | Krone | , sehr gut | neu |
| L3 | `😋 Krone: Schnitzel` | Krone | : Schnitzel | neu |
| L4 | `😋 Krone (Terrasse) – gut` | Krone | (Terrasse) – gut | neu |
| L5 | `😋 Krone(Terrasse)` (ohne Leerzeichen) | Krone | (Terrasse) | neu |
| L6 | `😋 Gasthof Müller-Bräu` (Bindestrich ohne Leerzeichen) | ganze Zeile | – | bleibt |
| L7 | `😋 St. Peter Stiftskeller` (Punkt) | ganze Zeile | – | bleibt |
| L8 | `😋 Krone` (nur Name) | Krone | – | bleibt |
| L9 | `⊘ Krone, gut` (ohne Maps-Link) | kein Link | ganze Zeile | bleibt |
| L10 | `, gut` bzw. `(gut)` am Anfang | ganze Zeile | – | bleibt (kein leerer Link) |
| L11 | Suche nach ‚Krone‘ und nach ‚gut‘ | beide gelb markiert | | Suche |
| L12 | Tabelle iPad, Kästen iPhone, Vorschau/Ausgabe | überall gleich | | alle drei Ansichten |
| L13 | Hell/dunkel | Link blau, Rest normale Schrift | | voller Lauf |
| L15 | Quartier `Hotel X (Zimmer 12)` bzw. `Hotel X: Altstadt` | Hotel X | Rest | neu |
| L16 | `😋 Café Central 8:30 – Frühstück` bzw. `Bier 4,50 €, gut` | Café Central 8:30 bzw. Bier 4,50 € | Rest | neu: Komma/Doppelpunkt vor einer Ziffer trennen nicht |
| L14 | Gegenprobe | mit altem `splitName` sind L2–L5 rot | | `--gegenprobe` |

**Quartiere (Entscheidung 17.10.2026: ja, gleich wie Essen):** Dort endet der Link heute schon am Komma (‚Hotel X, Cairns‘);
neu kommen Doppelpunkt und Klammer dazu (‚Hotel X (Zimmer 12)‘ → nur ‚Hotel X‘ ist der Link).

**Hinweistext im Feld:** ‚Eine Zeile pro Lokal: Smileys, Name – Kommentar‘ bleibt; Komma, Doppelpunkt und Klammer gehen zusätzlich.

**Nur am Gerät (Testfälle):** Antippen des Namens öffnet Google Maps mit dem Lokal; Antippen des Kommentars öffnet das Fenster ‚Tag‘.
