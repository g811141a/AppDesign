# P-120 – Auswertung (Sitzung 0153)

Rückmeldung 22.11.2026: **nicht ok** – vier Punkte, alle übrigen ok. Eingetragen im Backlog des Reiselogbuchs (‚0. Nächste Version‘, Status offen)
als Korrekturversion vor allem Neuen (0 Nr. 8, 22).

| Nr. | Punkt | Befund 0153 | Gilt |
|---|---|---|---|
| P-120/F-1 | Lupe und Textauswahl in der Backup-Kachel (langes Drücken auf den Rand einer Kachel oder auf den Text der Backup-Kachel); Wunsch: Text nur in Eingabefeldern auswählbar | **Keine allgemeine Regel vorhanden** – nur Designrichtlinie 13 (Emoji-Schaltflächen, Zeilen mit langem Drücken) und R-3.6 (Schaltflächen); `user-select: none` nur für einzelne Elemente, nicht für `.bhint` | allgemein – neue Regel, Wortlaut zur Freigabe (0 Nr. 29) |
| P-120/F-2 | Sperren einer weiter oben liegenden Kachel springt ans Ende der Liste; Wunsch: das gesperrte bzw. entsperrte Reiselogbuch wird aktiv und angezeigt | noch nicht nachgestellt | Reiselogbuch |
| P-120/F-3 | ‚Ausgabe V…‘ zählt nach abgebrochenem Sichern trotzdem hoch | `nextOutput` erhöht den Zähler vor dem Teilen; offen: PDF (Drucken) meldet kein Ergebnis | Reiselogbuch |
| P-120/F-4 | Hinweis ‚gesperrt‘ rollt weg, die Kopfzeile bleibt; Vorschlag: Hinweis ausblendbar, beim nächsten Öffnen wieder da | Apple-Abgleich und Muster fehlen | Reiselogbuch |

## Nächste Schritte

1. Jeden Ablauf als feste Prüfung nachbauen – rot gegen 3.58.0 (0 Nr. 1).
2. F-1: Apple-Abgleich (mit Quelle), Wortlaut der neuen Regel; F-4: Muster und Testfall-Liste; F-3: Frage zu PDF.
3. Bau-Frage für die Korrekturversion (Reiselogbuch 3.58.1, mit AppDesign 4.68.1 wegen F-1 und APD-146).

**Kontext:** 274.196 – die Übergabe ist bald fällig (ab 300.000, 0 Nr. 13). Empfehlung: diese Arbeit in einer neuen Sitzung (Reiselogbuch 0154) beginnen.

Nächste Version: 1 Punkt bereit (APD-146) · Offen: P-120/F-1 bis F-4 (in Klärung), APD-135/B-3.3 Schritt 2, APD-145, APD-142, APD-136, APD-139,
APD-141, APD-70 · RLB-126, RLB-6.
