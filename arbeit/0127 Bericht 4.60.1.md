# Bericht AppDesign 4.60.1 mit Reiselogbuch 3.57.1

**Stand 18.11.2026** · Sitzung 0127

Beide Versionen sind veröffentlicht: AppDesign 4.60.1 (Commit bd67818, Pages-Lauf ‚success‘) und Reiselogbuch 3.57.1 (Commit a9c9984, Pages-Lauf
‚success‘). Auf `main` stehen `AD_VERSION` 4.60.1, `APP_VERSION` 3.57.1 und `AD_NEEDED` 4.60.1. github.io selbst kann ich von hier nicht abrufen,
das Netz sperrt es; das prüfst du mit P-108/0. Der volle Prüflauf war grün: **alle 164 Läufe grün in 74:45** (Chromium und WebKit), dazu
`messung` grün, kein Wackler. Das sind die Fehler P-107/F-1 bis P-107/F-4, die du im Usertest P-107 gemeldet hattest. Bitte die App vom
Home-Bildschirm einmal ganz schließen und neu öffnen.

## Alle Änderungen

| Nr. | Änderung | Apple-Review |
|---|---|---|
| P-107/F-1 | Wischaktionen: Kapseln erscheinen nacheinander von außen (zuerst ‚Löschen‘), jede wächst aus dem frei werdenden Platz und blendet ein | entspricht deiner Beobachtung in Notizen; in der HIG (Lists and tables) steht nichts zur Reihenfolge (Befund 0126) |
| P-107/F-2 | Zurückwischen und Gleiten genau umgekehrt; keine Kapsel rückt über ihren Platz, nichts ragt über Seitenleiste oder Bild | entspricht Notizen (deine Beobachtung) |
| P-107/F-3 | ‚Bewegung reduzieren‘: Kapseln stehen an ihrem Platz und blenden nur ein und aus | entspricht HIG Accessibility ‚Motion‘ (Befund 0126: Bewegung durch Überblenden ersetzen) |
| P-107/F-4 | Kapseln 66 × 44 mal Textgröße, das Symbol wächst mit | entspricht HIG Typography (Symbole wachsen mit der Schrift, Befund 0126) |
| APD-137 | `messung.mjs`: kein Fehlalarm ‚⚠ Modell‘ mehr nach Hilfsagenten | Werkzeug, ohne Oberfläche |
| APD-134 | Prüfung `ablauf-markierung-menues` fasst die Kachel nach dem Drehen bis 5 s nach; Lasttest 8 von 8 grün, im vollen Lauf grün | Prüfung, ohne Oberfläche |

**HIG- und Regel-Prüfskript:** `hig` grün in allen 8 Ansichten (hell, dunkel, Bedienungshilfen, Textgrößen 14 bis 53) in Chromium und WebKit;
`ablauf-wischen` (iPad, iPhone) grün mit den Prüfungen APD-30/W-81 bis APD-30/W-86 in beiden Browsern.

**Warum P-107/F-1 bis P-107/F-4 durchgerutscht sind:**
- APD-30/W-7 verlangte, dass die Kapseln gleichzeitig wachsen, so wie im Muster.
- Geprüft wurde nur die offene Lage, nie die Zwischenlagen.
- Die Nachbildung schnitt die herausragende Kapsel ab.
- Mit ‚Bewegung reduzieren‘ prüfte APD-30/W-7 nur die Größe, nicht die Lage.
- APD-30/W-57 verlangte nur ‚mindestens 66 × 44‘.

**Dazu in dieser Sitzung (nicht gebaut):**
- RLB-125 ‚Reiselogbuch sperren‘ (Prio 2, mit RLB-125/L-1 bis RLB-125/L-5) und RLB-126 ‚Zuletzt gelöscht‘ (Prio 3) stehen im Backlog.
- Der Wortlaut zu den AD-Beans in 0 Nr. 25 steht als APD-135/W-57 im Wortlaut zu APD-135 Pakete 1 und 3 und kommt mit dieser Version.

## Offene Usertests

**P-108** (Reiselogbuch 3.57.1, AppDesign 4.60.1) – ersetzt P-107:

Testfälle P-108 (Schritt für Schritt, Zusammenarbeit allgemein 3.14.1). Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Es wird nichts gelöscht: nie ganz durchwischen, nie ‚Löschen‘ antippen.

**P-108/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.1 · erstellt am … · AppDesign 4.60.1‘.

**P-108/1 – Aufwischen: Kapseln nacheinander von außen**
1. iPad quer: in der Seitenleiste ‚Reiselogbücher‘ eine Kachel langsam nach links wischen und dabei auf die Kapseln rechts daneben achten.
2. Erwartet: zuerst erscheint ganz außen rot ‚Löschen‘ – sie wächst aus dem frei werdenden Platz und blendet ein; erst wenn ‚Löschen‘ ganz da ist, erscheint ‚Einstellen‘ auf dieselbe Weise.
3. Loslassen, wenn die Kachel offen bleibt. Erwartet: beide Kapseln stehen in voller Größe nebeneinander.
4. Dasselbe am iPhone hoch in der Startliste. Erwartet: wie in 2 und 3.

**P-108/2 – Zurückwischen umgekehrt, nichts über die Seitenleiste**
1. iPad quer: eine Kachel öffnen (nach links wischen, bis sie offen bleibt).
2. Die offene Kachel langsam nach rechts zurückwischen.
3. Erwartet: zuerst wird ‚Einstellen‘ kleiner und blasser, bis sie weg ist, danach ‚Löschen‘; keine Kapsel rückt dabei nach rechts über den Rand der Seitenleiste hinaus.
4. Eine Kachel öffnen und auf die Kachel tippen. Erwartet: sie gleitet zurück, die Kapseln vergehen in derselben Reihenfolge (erst ‚Einstellen‘, dann ‚Löschen‘), nichts ragt über die Seitenleiste.
5. Dasselbe am iPhone hoch. Erwartet: wie in 3 und 4, nichts ragt über den rechten Bildrand.

**P-108/3 – Bewegung reduzieren: Kapseln blenden nur ein**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Bewegung › ‚Bewegung reduzieren‘ ein; App neu öffnen.
2. Eine Kachel langsam nach links wischen. Erwartet: die Kachel folgt dem Finger; die Kapseln stehen an ihrem Platz in voller Größe und blenden nur ein – sie wachsen nicht und rücken nicht herein.
3. Langsam zurückwischen. Erwartet: die Kapseln blenden nur aus, ohne kleiner zu werden oder zu rücken.
4. ‚Bewegung reduzieren‘ wieder aus.

**P-108/4 – Größte Textgröße: Kapseln größer**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Anzeige & Textgröße › Größerer Text ein, Regler ganz nach rechts; App neu öffnen.
2. Eine Kachel nach links wischen, bis sie offen bleibt.
3. Erwartet: die Kapseln ‚Einstellen‘ und ‚Löschen‘ samt Symbol sind sichtbar größer als bei normaler Textgröße (etwa so groß wie die runden Schaltflächen oben), die Wörter ganz zu lesen, nichts abgeschnitten, keine Kapsel ragt aus Seitenleiste oder Bild.
4. Textgröße wieder zurückstellen.


---

Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.

**Nächste Version:** 0 Punkte bereit · **Offen im Backlog:**
- P-108 (prüfen)
- APD-135 Pakete 1 und 3 (Prio 1, mit APD-135/W-57)
- APD-136 (Prio 1)
- RLB-125 (Prio 2)
- RLB-126 (Prio 3)
