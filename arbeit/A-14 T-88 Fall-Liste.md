# Fall-Liste A-14 (Eingabetaste) und T-88 (zuletzt verwendetes Reiselogbuch)

Stand 17.10.2026 · Sitzung Reiselogbuch 0009 · geplant: **AppDesign 4.19.0** und **Reiselogbuch 3.17.0**
(Zusammenarbeit 0 Nr. 1; jeder Fall wird eine automatische Prüfung, „Gerät“ = Prüfliste auf iPad/iPhone)

## A-14 / T-87 – Eingabetaste in Eingabefeldern (neue Regel R-5.5)

**Regel (Vorschlag, HIG):** Einzeilige Felder: die Eingabetaste bestätigt die Eingabe und schließt die Tastatur
(Tastenbeschriftung über `enterkeyhint`: ‚Fertig‘, beim Suchfeld ‚Suchen‘). Mehrzeilige Felder: die Eingabetaste macht
einen Zeilenumbruch; geschlossen wird mit dem Häkchen bzw. x des Fensters oder durch Tippen daneben.
In Fenstern mit mehreren Feldern ebenfalls ‚Fertig‘ (kein ‚Weiter‘, Entscheidung 17.10.2026).
Gebaut zentral in `ui.js` (gilt für alle Apps), damit kein Feld vergessen wird.

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| E1 | Gesamtausgaben, iPad: Zahl tippen, Eingabetaste | Tastatur zu, Betrag formatiert ‚4.850,00‘, gespeichert | ablauf.mjs (neu `checkEnterDone`) |
| E2 | Gesamtausgaben, iPhone (Zifferntastatur ohne Eingabetaste) | Schließen über ‚Fertig‘/✓ der Leiste über der Tastatur | Gerät |
| E3 | Fenster ‚Neues Reiselogbuch/Einstellungen‘: Titel, Teilnehmer – Eingabetaste | Tastatur zu, Fenster bleibt offen, nichts gespeichert, bis Häkchen | ablauf.mjs |
| E4 | Fenster ‚Tag‘: Quartier, Ort – Eingabetaste (auch bei offener Vorschlagsliste) | Tastatur zu, Fenster bleibt offen | ablauf.mjs |
| E5 | Mehrzeilig (Verlauf, Wie war was?, Essen, Fazit) – Eingabetaste | neue Zeile, Tastatur bleibt | ablauf.mjs |
| E6 | Suchfeld – Eingabetaste | wie bisher: nächster Treffer (‚Suchen‘), keine Änderung | vorhandene Prüfung |
| E7 | Datumsfelder | ohne Tastatur (Auswahlrad), nicht betroffen | – |
| E8 | Jedes einzeilige Feld hat `enterkeyhint` | Taste zeigt ‚Fertig‘ statt ‚Return‘ | ablauf.mjs `checkEnterDone` (alle sichtbaren Felder) |
| E9 | Nach Schließen der Tastatur | Seite steht wie vorher (R-7.3), kein Sprung | ablauf.mjs + Gerät |
| E10 | Hell/dunkel, quer/hoch | keine Unterschiede | im vollen Lauf |
| E11 | Gegenprobe | ohne die Änderung bleibt die Tastatur offen → Prüfung rot | `--gegenprobe` |

## T-88 – zuletzt verwendetes Reiselogbuch beim Start

Neu `settings.lastTrip` (je Gerät, wie `lastBackup`); gesetzt bei jedem Öffnen eines Reiselogbuchs; alte Daten ohne
Eintrag starten wie bisher nach Datum (`pickStartTrip`).

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| S1 | iPad quer: B öffnen, App neu laden | B offen, in der Seitenleiste blau | start.mjs |
| S2 | Reise A läuft gerade, zuletzt verwendet B | B (Entscheidung: immer das zuletzt verwendete) | start.mjs |
| S3 | Zuletzt verwendetes gelöscht | Wahl nach Datum wie bisher | start.mjs |
| S4 | Alte Daten ohne `lastTrip` | Wahl nach Datum, keine Fehlermeldung | start.mjs (normalize) |
| S5 | Kein Reiselogbuch | leere Seite, ‚Neues Reiselogbuch‘ wie bisher | vorhanden |
| S6 | Neues Reiselogbuch angelegt | gilt als zuletzt verwendet | start.mjs |
| S7 | Backup laden ‚Ersetzen‘ | `lastTrip` dieses Geräts bleibt; ist das Reiselogbuch in der Datei, öffnet es, sonst nach Datum | ablauf.mjs |
| S8 | Backup laden ‚Abgleichen‘ | aktuelle Ansicht bleibt; `lastTrip` wird nicht vom anderen Gerät übernommen | sync-Prüfung |
| S9 | iPad hoch (Seitenleiste als Überlagerung) | B offen, Seitenleiste nach `settings.sidebar` | start.mjs |
| S10 | Rückkehr aus dem Hintergrund | nichts ändert sich (R-7.2) | vorhanden |
| S11 | iPhone / iPad schmal: Startliste | ohne blauen Eintrag – R-7.2 bleibt (Entscheidung 17.10.2026); T-88 gilt für den iPad-Aufbau | start.mjs |
| S12 | iPhone: B öffnen, zurück zur Liste | B blau wie bisher (R-7.1) | vorhanden |
| S13 | Gegenprobe | ohne `lastTrip` öffnet die Wahl nach Datum → Prüfung rot | `--gegenprobe` |

**Nur am Gerät (Prüfliste):** E2 (iPhone-Zifferntastatur), Tastenbeschriftung ‚Fertig‘ auf iPad und iPhone, S1 nach echtem
Schließen der App (aus dem App-Umschalter wischen).

**Ergebnis (17.10.2026):** gebaut in AppDesign 4.19.0 und Reiselogbuch 3.17.0. Gegenproben rot: ohne `ui.js`-Änderung 8 Fehler
(dabei gefunden: die Eingabetaste schickte die Fenster ‚Tag‘ und ‚Einstellungen‘ ab), ohne `lastTrip` 8 Fehler.
