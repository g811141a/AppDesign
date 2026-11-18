# Bericht AppDesign 4.60.3 / Reiselogbuch 3.57.3 (Sitzung 0130)

Stand 18.11.2026 · veröffentlicht: AppDesign `main` 75a1415, Reiselogbuch `main` bf600c5, beide Pages-Läufe ‚success‘ · voller Prüflauf: **alle 164 Läufe grün in 81:41**
(Chromium und WebKit).

## Bericht

Die Wischaktionen sind jetzt so weich wie in Notizen: Die Kachel gleitet auf und zu mit der Feder, die ich in deiner Notizen-Aufnahme gemessen habe
(Antwortzeit 0,5 s, egal wie weit). Jede Kapsel hat ihre eigene Zeit: Sie wächst in 0,25 s aus ihrer Mitte und vergeht in 0,23 s, beim Schließen durch
Tippen daneben oder auf eine andere Kachel alle zugleich. Tippen auf eine andere Kachel ließ die offene bisher sofort zuschnappen – das kam von einem
Abbruch der Bewegung beim Antippen jeder Kachel; jetzt hält nur die eigene Bewegung an. Bitte die App vom Home-Bildschirm ganz schließen und neu öffnen.

**Warum die Prüfung es übersah:** Die Prüfungen maßen die Kapseln nur am Weg und die Dauer des Schließens gar nicht; das Tempo kam aus R-1.12, das an der
Seitenleiste gemessen war, nicht an den Wischaktionen.

## Alle Änderungen

- `createSwipeactions` (`v4/ui.js`): Feder 0,5 s auf und zu; Kapseln mit eigener Zeit (0,25 s ein, Deckkraft nach 0,1 s, 0,23 s aus); Schließen durch Tippen
  daneben, auf eine andere Kachel, Rollen und `schliessen()`: alle zugleich; Zurückwischen und Tippen auf die offene Kachel: jede, sobald die Kachel sie
  erreicht; ‚Bewegung reduzieren‘: nur Ein- und Ausblenden zu denselben Zeitpunkten; Tippen auf eine andere Kachel bricht das Schließen nicht mehr ab.
- Designrichtlinie allgemein 4.60.3: 15.4, R-7.8, R-1.12 nach dem bestätigten Wortlaut P-109/V-1 bis P-109/V-3.
- Prüfungen (`tests/ablauf.mjs`, `checkWischen`): neu APD-30/W-100 bis APD-30/W-102; APD-30/W-83 und APD-30/W-91 ersetzt; APD-30/W-81, APD-30/W-82 prüfen die
  Reihenfolge; Gegenproben APD-30/W-87, APD-30/W-88, APD-30/W-89, APD-30/W-96 auf den neuen Code umgestellt, neu APD-30/W-103 und APD-30/W-104 (die Gegenproben
  habe ich nicht einzeln laufen lassen – das steht noch aus). Gegen 4.60.2 rot an APD-30/W-100 bis APD-30/W-102, mit 4.60.3 grün.
- CHANGELOG beider Repos, Backlogs (P-109 erledigt, Usertest P-110 offen), Designrichtlinie Reiselogbuch 3.57.3.

## Apple-Review

- Feder und Kapsel-Zeiten: **entspricht Notizen** (gemessen, `arbeit/0130 P-109 Notizen Messung.md`).
- Kapseln 66 × 44 statt 60 × 34 wie Notizen: **weicht ab, weil** HIG-Mindestgröße zum Antippen 44 pt (bestätigt 18.11.2026).
- HIG- und Regel-Prüfskript (`hig.mjs` in allen Ansichten, Chromium und WebKit): grün im vollen Lauf.

## Offener Usertest P-110 (Reiselogbuch 3.57.3, AppDesign 4.60.3)

Testfälle P-110 (Schritt für Schritt, Zusammenarbeit allgemein 3.14.1). Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Es wird nichts gelöscht: nie ‚Löschen‘ antippen. Zum Vergleich Notizen daneben öffnen.

**P-110/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.3 · erstellt am … · AppDesign 4.60.3‘.

**P-110/1 – Aufwischen weich wie Notizen**
1. iPhone hoch: in der Startliste eine Kachel zügig nach links wischen und loslassen.
2. Erwartet: die Kachel gleitet weich auf ‚offen‘ und kommt sanft zum Stehen; ‚Löschen‘ und danach ‚Einstellen‘ wachsen sichtbar aus ihrer Mitte, nicht schlagartig – wie in Notizen.
3. Dasselbe am iPad quer in der Seitenleiste. Erwartet: wie in 2.

**P-110/2 – Tippen auf eine andere Kachel: weich zu**
1. iPhone hoch: eine Kachel öffnen (nach links wischen, bis sie offen bleibt).
2. Auf eine andere Kachel tippen.
3. Erwartet: beide Kapseln schrumpfen zugleich und blenden aus, die Kachel gleitet weich darüber zurück und kommt sanft zum Stehen; die angetippte Kachel öffnet sich nicht.
4. Dasselbe am iPad quer. Erwartet: wie in 3.

**P-110/3 – Zurückwischen und Tippen auf die offene Kachel**
1. iPhone hoch: eine Kachel öffnen und langsam mit dem Finger zurückwischen.
2. Erwartet: zuerst vergeht ‚Einstellen‘, dann ‚Löschen‘, jeweils wenn die Kachel sie erreicht.
3. Eine Kachel öffnen und auf die offene Kachel tippen. Erwartet: sie gleitet weich zurück, die Kapseln vergehen nacheinander.
4. Dasselbe am iPad quer. Erwartet: wie in 2 und 3.

**P-110/4 – Bewegung reduzieren**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Bewegung › ‚Bewegung reduzieren‘ ein; App neu öffnen.
2. Eine Kachel nach links wischen und loslassen, dann auf eine andere Kachel tippen.
3. Erwartet: die Kapseln stehen an ihrem Platz in voller Größe und blenden nur ein bzw. aus – sie wachsen nicht und rücken nicht; nichts wird gelöscht.
4. ‚Bewegung reduzieren‘ wieder aus.


Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.
