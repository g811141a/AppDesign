# APD-92 / RLB-108 · RLB-109 · APD-93 / RLB-110 – Testfall-Liste

Stand 30.10.2026 · Sitzung Reiselogbuch 0055 · Darstellung im Mehr-Menü der Seitenleiste (nach Backup), Preis beim Quartier,
Spalte ‚Gegangene Kilometer‘ (Muster Variante A) – Zusammenarbeit 0 Nr. 1: jeder Fall wird ein automatischer Test; was nur
das Gerät zeigt, kommt in die Testfälle (User).

## Ablauf in einem Satz

‚Darstellung ›‘ wandert aus dem Menü eines Reiselogbuchs ins Mehr-Menü der Seitenleiste (nach Backup); beim ersten Tag
eines Aufenthalts steht unter ‚Ort‘ das Feld ‚Preis‘ (gesamt, €), Quartierliste und Statistik zeigen Preis, Quartierkosten
und Ø je Nacht; die neue, abschaltbare Spalte 🚶🏽‍♂️km nach ‚Wie war was?‘ nimmt je Tag höchstens 99 gegangene Kilometer auf
(schmales Feld, ‚km‘ daneben, ⓧ-Platz immer frei).

## D – Darstellung (APD-92, RLB-108)

| Nr. | Gerät / Lage | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| D-1 | iPad quer und hoch | Mehr (ellipsis) der Seitenleiste | 2 Reiselogbücher | Backup erstellen · Backup laden · Trennlinie · Darstellung › (rechts grau der Wert) · Trennlinie · Messmodus (falls frei) · Versionszeile |
| D-2 | iPhone hoch und quer | Mehr der Startliste | 2 Reiselogbücher | wie D-1 |
| D-3 | alle | Mehr eines Reiselogbuchs | – | keine ‚Darstellung‘ mehr: Alle Tage · Nur erfasste Tage · Einstellungen · Reiselogbuch löschen |
| D-4 | alle | Darstellung › Hell / Dunkel / Automatisch | Gerät dunkel | wechselt sofort, Häkchen am gewählten Wert, Menü zeigt ihn grau; Automatisch folgt wieder dem Gerät |
| D-5 | alle | Mehr der Seitenleiste | 0 Reiselogbücher | Darstellung erreichbar (Backup erstellen ausgegraut) |
| D-6 | iPad | Drehen mit offenem Untermenü | – | Grundregeln (Menü schließt oder bleibt am Anker, nichts springt) |
| D-7 | iPad + iPhone | Abgleich | verschiedene Darstellung | Darstellung bleibt je Gerät (15.18 Zeile 18) |
| D-8 | – | `hig.mjs` R-1.2 | – | prüft die Stelle; Gegenprobe ‚Darstellung im Menü eines Eintrags‘ wird rot |

## Q – Preis beim Quartier (RLB-109)

| Nr. | Gerät / Lage | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| Q-1 | alle | erster Tag eines Aufenthalts, Preis tippen | ‚1240‘ | Feld ‚Preis‘ unter ‚Ort‘, € rechts daneben, rechtsbündig, beim Tippen ‚1.240‘, beim Verlassen ‚1.240,00‘ (R-5.1) |
| Q-2 | alle | Folgetag mit ‚Quartier wie Vortag‘ | – | kein Preisfeld; Haken weg → Feld erscheint leer |
| Q-3 | iPad (Tabelle), iPhone (Liste) | Quartierliste ansehen | 2 Aufenthalte, einer ohne Preis | Spalte ‚Preis‘ nach ‚Nächte‘: ‚1.240,00 €‘ bzw. leer; iPhone: Preis hinter ‚N Nächte‘ |
| Q-4 | alle | Statistik | 3 + 2 Nächte, Preise 300 und 200 | ‚Quartierkosten 500,00 €‘ · ‚Ø je Nacht 100,00 €‘ unter ‚Nächte‘; ohne Preis fehlen beide Zeilen; Ø nur über Nächte mit Preis |
| Q-5 | alle | Spalte Quartier aus | Preise vorhanden | Feld, Spalte ‚Preis‘ und beide Statistikzeilen fehlen; Werte bleiben, wieder ein → wieder da |
| Q-6 | alle | Ausgabe HTML und PDF | – | Quartierliste mit ‚Preis‘, Statistik mit beiden Zeilen, feste Breiten (R-6.2) |
| Q-7 | alle | ⓧ im Preisfeld, langer Betrag | ‚100.000,00‘ | ⓧ leert; Betrag passt vollständig (R-5.1) |
| Q-8 | iPad + iPhone | Backup laden / Abgleich | altes Backup ohne Preis | lädt fehlerfrei (`normalize`), Preis wird abgeglichen |
| Q-9 | alle | hell / dunkel, große Schrift | – | Grundregeln, Feld und € bleiben zusammen (R-5.1) |

## K – Gegangene Kilometer (RLB-110, APD-93)

| Nr. | Gerät / Lage | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| K-1 | alle | Einstellungen eines Reiselogbuchs | neu und alt | Schalter ‚Spalte 🚶🏽‍♂️km ‚Gegangene Kilometer‘‘ nach ‚Wie war was?‘, Voreinstellung aus |
| K-2 | iPad | Spalte ein, Tabelle ansehen | 3 Tage, einer ohne km | Spalte nach ‚Wie war was?‘, Kopf ‚🚶🏽‍♂️km‘, Zellen nur die Zahl, rechtsbündig; ohne Wert leer |
| K-3 | alle | Tag erfassen | – | Schritt ‚Gegangene Kilometer‘ nach ‚Wie war was?‘, folgende Schritte +1; Feld in eigener Zeile, ‚km‘ rechts daneben (Variante A) |
| K-4 | alle | Tippen | ‚123‘, ‚1,5‘, ‚a‘ | nur Ziffern, höchstens zwei (‚12‘); Ziffernblock (`inputmode="numeric"`) |
| K-5 | alle | Fokus, ⓧ | ‚14‘ | ⓧ erscheint, die Ziffern bleiben an derselben Stelle (± 0,5 px); ⓧ leert, Fokus bleibt |
| K-6 | alle | Feldbreite | normal und große Schrift | Breite = ‚99‘ + Innenabstände + ⓧ-Platz (APD-93), wächst mit der Schrift (R-1.10) |
| K-7 | alle | Spalte aus | Werte vorhanden | Schritt, Spalte und Statistikzeilen fehlen; Werte bleiben |
| K-8 | alle | Statistik | 6, 14, 3 km und ein Tag ohne | ‚Gegangene Kilometer 23 km‘ · ‚Ø je Tag 8 km‘ (gerundet, nur Tage mit km); Summe mit Tausenderpunkt |
| K-9 | iPhone | Tageskachel ansehen | 14 km | Vorschlag: Zeile ‚🚶🏽‍♂️ 14 km‘ nach ‚Wie war was?‘ |
| K-10 | alle | Tag nur mit km | – | Vorschlag: zählt nicht als erfasst (wie Essen) |
| K-11 | alle | Ausgabe HTML und PDF | alle Spalten an | Anteile Verlauf 28 · Wie war was? 28 · km 8 · Essen 22 · Quartier 22, Kopf in einer Zeile |
| K-12 | iPad + iPhone | Backup laden / Abgleich | altes Backup | lädt fehlerfrei, `kmColumn` aus, km abgeglichen |
| K-13 | alle | hell / dunkel, Drehen mit Fokus im Feld | – | Grundregeln, Feld bleibt sichtbar über der Tastatur |
