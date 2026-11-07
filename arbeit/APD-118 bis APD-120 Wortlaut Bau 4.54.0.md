# Wortlaut beim Bau 4.54.0 – APD-118, APD-119, APD-120, APD-113 Teil (6)

Stand 07.11.2026 · Sitzung Reiselogbuch 0087 · Nummern gelten nur in dieser Datei (außerhalb: APD-120/V-n). Beim Bau fiel auf, dass für diese
Stellen noch kein bestätigter Wortlaut vorliegt (0 Nr. 29). Ohne ‚Ja‘ bleibt der alte Text, Gebautes ändert sich dadurch nicht.

| Nr. | Stelle | alt | neu (Vorschlag) |
|---|---|---|---|
| V-1 | Designrichtlinie 13, neuer Punkt nach ‚Textgröße pro App‘ (APD-119) | – (bestätigt war der Text mit einer Lücke ‚…‘ in der Mitte, Sitzung 0085) | **‚Transparenz reduzieren‘ kommt in der Web-App nicht an:** die Einstellung des iPads, die Safari als `@media (prefers-reduced-transparency: reduce)` melden sollte, greift in der Web-App vom Home-Bildschirm nicht (Usertest P-97/10, 06.11.2026); die WebKit-Fassung der Prüfumgebung (26.0) kennt die Abfrage. Die Abfrage bleibt für Browser, die sie melden (R-3.9); die Texte auf Glas prüft `hig.mjs` auf Kontrast wie überall. |
| V-2 | Regelkatalog R-3.9, Regeltext (APD-120) | … ‚Transparenz reduzieren‘ des Geräts: deckend wie bisher, wo der Browser es meldet (Safari am iPad nicht, 13); Leisten, … | … ‚Transparenz reduzieren‘ des Geräts: deckend wie bisher, wo der Browser es meldet (Safari am iPad nicht, 13); **ebenso deckend mit dem Schalter ‚Glas‘ aus** (Untermenü ‚Darstellung‘, Standard ein, gilt je Gerät; ein Backup bringt die Wahl nur mit, wenn das Gerät noch keine hat); Leisten, … – Spalte Prüfung zusätzlich: `checkGlas` mit Schalter (`ablauf-glas`) |
| V-3 | Designrichtlinie 15.6 Menü, Punkt ‚Untermenü‘ (APD-120) | … der Eintrag bleibt blau, solange es offen ist. | … der Eintrag bleibt blau, solange es offen ist. **Ein Schalter** im Menü (z. B. ‚Glas‘ als eigene Gruppe im Untermenü ‚Darstellung‘) steht mit Text links und Schalter rechts wie in den Einstellungen (15.15), Rolle ‚Schalter‘; Umschalten lässt das Menü offen. |
| V-4 | Zusammenarbeit 0 Nr. 7 (Widerspruch zu APD-113/L-7, beim Einbau von 3.9.0 gefunden) | Längeres immer im Chat; Erklärungen, die der Nutzer vorher lesen muss, als Datei oder Bild vor dem Fenster. | Längeres immer im Chat – nach einem Fenster ‚… anzeigen?‘ als letzte Ausgabe ohne Fenster (2.1). |
| V-5 | Designrichtlinie 13 ‚Am oberen Rand kein Klick‘ (APD-118, letzter Satz) | … das Safari-Modell schickt dort keinen Klick. | … das Safari-Modell schickt dort keinen Klick (`obenOhneKlick`, eingeschaltet in den Prüfungen zum oberen Rand – überall an, fiele der Tipp auf die Mitte des Mehr-Knopfs, y 16, in allen Prüfungen weg). |

**Neues Thema (Vorschlag, 0 Nr. 24):** Mehr-Knopf im iPhone quer – er steht bei y 1–31; ob ein Tipp auf seine obere Hälfte (y < 23) am Gerät öffnet,
ist nicht gemessen (Vermutung: nein, wie bei der Sperrschicht). So macht es Apple: Schaltflächen der Leiste beginnen unterhalb der Statusleiste
(Vermutung, nicht geprüft). Empfehlung: ins Backlog, Priorität 2, zuerst eine Messung am Gerät.
