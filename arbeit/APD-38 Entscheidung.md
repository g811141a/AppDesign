# APD-38 Frameworks – Entscheidungsgrundlage

**Stand 21.10.2026** · Sitzung ‚Reiselogbuch 0027‘ · Grundlage: `arbeit/APD-38 Framework7 Auswertung.md` (Framework7 9.2.0, Quelltext gelesen)

## 1. Mischform (Framework7 als Unterbau, AppDesign 5) – Empfehlung: **nein**

| Frage | Befund |
|---|---|
| Hätte Framework7 die vielen Messungen erspart? | **Nein.** Unter iOS rollt Framework7 Felder nicht selbst und nutzt kein `visualViewport`; die Safari-Eigenheiten S-1 bis S-9 wären dieselben. Unsere Lösung aus APD-36 geht weiter. |
| Was würde es kosten? | AppDesign 5 (`v5/`): Seitenleiste, Kopfzeile, Kapsel, Menüs, Fenster, Suche neu auf Framework7-Bausteinen; alle Prüfungen (Grundregeln, Safari-Modell, HIG, Drehen, Abgleich) neu ausrichten; die Vorgabe ‚keine Frameworks‘ ersetzen. Mehrere Sitzungen, ohne neue Funktion für dich. |
| Was würde es kollidieren? | Framework7 bringt eigene Regeln mit, die deinen widersprechen: Leisten beim Rollen ausblenden (R-2.1), Inhalt unter durchscheinender Leiste (dein Wunsch 08.10.2026), eigenes Seiten-Routing. Wir müssten es an vielen Stellen abschalten. |
| Langfristigkeit | Framework7: MIT, seit 2014, im Kern von einem Entwickler getragen. Ionic: Firma dahinter (OutSystems), größere Gemeinschaft. Beides ist eine fremde Abhängigkeit, deren Updates wir mittragen müssten. |
| Echte App (App Store) | Dafür braucht es **kein** UI-Framework: **Capacitor** verpackt auch unsere bestehende `index.html` als App (dann mit nativer Tastatursteuerung – das würde die Safari-Eigenheiten wirklich beenden). Nötig: Mac mit Xcode oder ein Bau-Dienst und das Apple-Entwicklerprogramm (99 $/Jahr). Eigene Frage, nicht Teil von APD-38. |

**Fazit:** Der Nutzen von Framework7 liegt in einzelnen guten Ideen, nicht im Unterbau. Diese Ideen übernehmen wir in unseren
eigenen Code (V1–V4); die Vorgabe ‚keine Frameworks‘ bleibt. Framework7 vs. Ionic wird erst wieder wichtig, wenn du eine App im
App Store willst – und dann zuerst die Frage Capacitor ja/nein.

## 2. Die Vorschläge V1 bis V6 – Empfehlung je Punkt

| Nr. | Vorschlag | So macht es Apple | Empfehlung |
|---|---|---|---|
| **V1** | Sichere Ränder über Variablen `--safe-top/-bottom/-left/-right` (heute 42 × `env(safe-area-inset-…)` direkt in `v4/design.css`); Prüfungen setzen echte iPhone-Werte (hoch oben 59 / unten 34 px, quer links und rechts 59 / unten 21 px) | Inhalte halten sich an die ‚Safe Area‘ (Dynamic Island, Home-Leiste); Leisten dürfen bis an den Rand, Bedienelemente nicht | **Als nächstes eigenes Thema** (eine Version, AppDesign + Reiselogbuch): Testfall-Liste, Prüfung zuerst rot, dann bauen. Sichtbar ändert sich nichts, aber Überdeckungen findet künftig die Prüfung statt du am Gerät. |
| **V2** | Rückmeldung beim Antippen: Schaltfläche hellt kurz auf (nach 80 ms, beim Wischen nicht, aufgehoben nach 5 px Bewegung) | Jede Schaltfläche zeigt beim Berühren sofort den ‚hervorgehobenen‘ Zustand (abgedunkelt bzw. aufgehellt) | **Mit APD-37** (Thema ‚Antippen und Rollen‘), im Muster zeigen |
| **V3** | Titel in der Kopfzeile antippen = nach oben (300 ms) | Statusleiste antippen = nach oben; in der Home-Bildschirm-App wirkt das im Rollbereich nicht (Designrichtlinie 13) – V3 wäre der Ersatz, also eine **Abweichung** von Apple | **Mit APD-37**, im Muster zeigen |
| **V4** | Glas-Optik (iOS 26) für Kapseln und schwebende Schaltflächen: Unschärfe, 75 % deckend, Lichtkante | iOS 26 ‚Liquid Glass‘ auf Leisten und Schaltflächen | **Nur als Muster** neben APD-37 (hell/dunkel, Leistung am iPad prüfen), dann entscheiden |
| **V5** | Ziehbarer Index mit Blase | Index am rechten Rand (Kontakte) | Ist schon **Variante C in APD-37** – nichts Eigenes |
| **V6** | Lange Listen nur sichtbar aufbauen | Listen bauen nur sichtbare Zeilen | **Ins Backlog, Prio 3** – erst ab einigen hundert Tagen nötig |

## 3. Ablauf, wenn du zustimmst

1. APD-38 wird abgeschlossen; Backlog: **V1** als neues Thema (Prio 1), V2 + V3 + V4 wandern zu **APD-37**, **V6** als neues Thema
   (Prio 3); ‚keine Frameworks‘ bleibt.
2. Danach **APD-37** mit dem Muster (Varianten Heute/A/B/C) – erweitert um V2, V3 und V4.
3. **V1**: Testfall-Liste, dann dein Ja für die Version.
