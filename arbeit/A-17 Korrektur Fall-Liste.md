# Fall-Liste Korrektur A-17 – Drehen am Ende der Seite (aus P-48/3)

Stand 17.10.2026 · Sitzung Reiselogbuch 0009 · geplant: **AppDesign 4.21.1** und **Reiselogbuch 3.20.1** (Korrektur)

**Rückmeldung P-48/3:** Tabelle ans Ende, dann hoch ↔ quer drehen – die Seite verschiebt sich, mit und ohne Seitenleiste.
**Ursache (nachgestellt):** R-8.1 merkt sich den obersten **Tag** (`data-day`). Am Ende der Seite (Fazit, Gesamtausgaben,
Quartierliste, Statistik) steht oben kein Tag – es wird nichts gemerkt, nach dem Drehen steht die Seite irgendwo
(quer → hoch → quer: 3243 statt 3603 px, also nicht mehr am Ende). Beim Ein-/Ausblenden der Seitenleiste war das in 4.21.0
schon gelöst (`keepPlace` hält den Abstand zum Ende), beim Drehen nicht.
**Warum die Prüfung es übersehen hat:** die Drehprüfung (hig.mjs) dreht nur in der Mitte der Tabelle; `checkSideToggle`
prüfte das Ende, aber nur fürs Umschalten der Seitenleiste.
**Lösung:** eine Stelle in `ui.js` (`topAnchor`): steht oben kein Eintrag, wird der **Abstand zum Ende** gemerkt – fürs Drehen
und fürs Umschalten gleich; ganz unten bleibt ganz unten.

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| D1 | iPad quer, ‚Ans Ende‘, mit Seitenleiste: hoch → quer | jeweils ganz am Ende | ablauf (neu `checkTurnEnd`) |
| D2 | wie D1 ohne Seitenleiste | jeweils ganz am Ende | checkTurnEnd |
| D3 | iPad hoch, ‚Ans Ende‘: quer → hoch | jeweils ganz am Ende | checkTurnEnd |
| D4 | iPhone hoch, ‚Ans Ende‘: quer → hoch | jeweils ganz am Ende | checkTurnEnd |
| D5 | Im Bereich Fazit/Statistik, nicht ganz am Ende | Abstand zum Ende bleibt (± 2 px) | checkTurnEnd |
| D6 | Mitte der Tabelle (ein Tag oben) | wie bisher: derselbe Tag oben | vorhanden (hig Drehprüfung) |
| D7 | Seitenleiste ein/aus am Ende | wie 4.21.0 | vorhanden (checkSideToggle) |
| D8 | Gegenprobe | ohne die Korrektur D1–D5 rot | Gegenprobe |

**Ergebnis (17.10.2026):** gebaut in AppDesign 4.21.1 und Reiselogbuch 3.20.1; Gegenprobe rot (u. a. ‚zurückgedreht: 360 px vor
dem Ende statt 0 px‘).
