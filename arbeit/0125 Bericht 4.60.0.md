# Bericht AppDesign 4.60.0 mit Reiselogbuch 3.57.0 – Sitzung 0125

**Stand 17.11.2026** · veröffentlicht: AppDesign Commit dbfb143, Reiselogbuch Commit e0eaf16, beide Pages-Läufe ‚success‘

## Kurz

AppDesign 4.60.0 und Reiselogbuch 3.57.0 sind veröffentlicht. Der volle Prüflauf hatte 164 Läufe in Chromium und WebKit und war ganz grün
(74:43, nichts ‚wackelt‘). Neu sind die Wischaktionen auf den Kacheln der Liste ‚Reiselogbücher‘. Jede Sprechblase graut jetzt die Umgebung ein und
lässt sich nicht mehr wegtippen. Gebaut ist das als erste AD-Bean `swipeactions` nach der neuen Regel R-1.13. **Bitte die App ganz schließen und
neu öffnen**, dann zeigt /0 die neue Version.

## Alle Änderungen

1. **APD-30 Wischaktionen** (R-7.8, 15.4):
   - Wischen nach links zeigt ‚Einstellen‘ und ‚Löschen‘ (rot, ganz außen) als Kapseln 66 × 44 mit Wort.
   - Die Kachel ist offen bei 162 px und bleibt offen ab 81 px.
   - Durchwischen ab 60 % fragt mit der Sprechblase.
   - Beim Zurückwischen werden die Kapseln kleiner und blasser.
   - Tipp auf die Kachel oder daneben in der Liste schließt nur. Knöpfe außerhalb der Liste (panel-left, plus, Mehr) wirken sofort und schließen dabei
     (deine Entscheidung zu W-42, Wortlaut APD-30/V-12 und V-13).
2. **Sprechblase graut ein und sperrt** (R-1.4): alles daneben Schwarz 20 %; daneben tippen ändert nichts; Esc bzw. ⌘. = ‚Abbrechen‘.
3. **APD-136 AD-Beans** (R-1.13):
   - Regel im Katalog, Liste der AD-Beans in Designrichtlinie 15, Satz in 14.
   - Erste Bean `createSwipeactions(liste, { kacheln, aktionen, durchwischen })`.
   - Neue Prüfung `checkBeans`.
   - Bestehende Elemente werden erst mit APD-135 Paket 6 und 7 umgebaut.
4. **APD-133/V-1:** Designrichtlinie 13 ‚Neue Fenstergröße vor `resize`‘ (nur Text).
5. **Reiselogbuch:**
   - `tripAktionen` liefert dieselben Aktionen für Kontextmenü und Wischen.
   - Beim Ausblenden der Seitenleiste ist keine Kachel offen.
   - `PROMPT.md` nachgetragen.
   - Neue Prüfung `tests/ablauf-wischen.mjs`.

**Zusätzlich angepasst (nicht im Wortlaut):**
- Testfall **W-43** erwartet jetzt, dass Mehr bzw. plus im Kopf sofort öffnen. **W-5** nennt den Kopf nicht mehr. Beides folgt aus deiner Entscheidung zu W-42.
- Die Prüfung **`ablauf-navigation`** (APD-68/Q-2) wischt schnell nach links über eine Kachel; das ist jetzt ein Durchwischen. Sie tippt deshalb ‚Abbrechen‘.
- **`masse.rand` = 11 px** (Abstand der Kapseln) kam als nur lesbares Maß dazu, damit die offene Breite genau 162 px ergibt.
- In den Einzelläufen waren W-1 und W-61 einmal in WebKit rot (Kachel noch in Bewegung). Im vollen Lauf war alles grün.
- Nicht automatisch geprüft: W-56 (Glas), W-62 (nur `transform` und `opacity`), W-69/W-70.

## HIG / Apple-Review je Punkt

| Punkt | Apple | Ergebnis |
|---|---|---|
| Wischaktionen | SwiftUI `swipeActions` (Durchwischen standardmäßig an, Reihenfolge vom Rand her), `swipeActionsContainer` (iOS 27: eine Zeile offen, Tippen außerhalb schließt), `UIContextualAction` | entspricht; ‚Löschen‘ als destruktive Aktion ganz außen und rot wie bei Apple |
| Knöpfe außerhalb wirken sofort | `swipeActionsContainer` sagt nur ‚Tapping outside the active row dismisses its actions‘ | Vermutung wie in Mail und Notizen, nicht belegt |
| Sprechblase sperrt | Bestätigungen bei Apple sind modal, nur mit ihren Schaltflächen zu entscheiden | entspricht |
| AD-Beans | intern, keine Bedienung | – |
| APD-133 | nur Text | – |

## Usertest P-107

Testfälle P-107 (Schritt für Schritt, Zusammenarbeit allgemein 3.14.1). Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Bei allen Fällen mit der Sprechblase zum Schluss ‚Abbrechen‘ tippen –
dann wird nichts gelöscht.

**P-107/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.0 · erstellt am … · AppDesign 4.60.0‘.

**P-107/1 – Wischgefühl**
1. iPad quer, dann hoch: in der Seitenleiste ‚Reiselogbücher‘ eine Kachel langsam nach links wischen und dabei den Finger hin und her bewegen.
2. Erwartet: die Kachel folgt dem Finger ohne Ruckeln; rechts daneben erscheinen zwei Kapseln mit dem Wort darunter, ‚Einstellen‘ und ganz außen rot ‚Löschen‘.
3. Etwa eine Fingerbreite weit wischen und loslassen. Erwartet: die Kachel rastet weich ein und bleibt offen, vom Titel ist links noch ein Teil zu sehen.
4. Dasselbe am iPhone hoch und quer in der Startliste. Erwartet: wie in 2 und 3.

**P-107/2 – Rollen gegen Wischen**
1. iPad und iPhone, Liste ‚Reiselogbücher‘ mit mehreren Kacheln: auf einer Kachel senkrecht nach oben wischen. Erwartet: die Liste rollt, keine Kachel bewegt sich seitlich.
2. Schräg wischen, mehr nach unten als nach links. Erwartet: die Liste rollt, keine Kachel öffnet.
3. Schräg wischen, deutlich mehr nach links als nach unten. Erwartet: die Kachel folgt dem Finger, die Liste rollt nicht.

**P-107/3 – Durchwischen fragt, alles daneben ist eingegraut**
1. iPad und iPhone: eine Kachel in einem Zug weit nach links ziehen (über mehr als die halbe Kachel) und noch nicht loslassen.
2. Erwartet: die rote Kapsel ‚Löschen‘ wird breit, ‚Einstellen‘ weicht.
3. Loslassen. Erwartet: aus der roten Kapsel wächst die Sprechblase ‚‚<Titel>‘ mit allen Einträgen löschen? Das kann nicht rückgängig gemacht werden. Tipp: Vorher
   ein Backup erstellen.‘ mit ‚Reiselogbuch löschen‘ (rot) und ‚Abbrechen‘; alles daneben ist leicht eingegraut, die Kachel bleibt offen.
4. Daneben tippen (auf eine andere Kachel, den Kopf, den Inhalt). Erwartet: nichts geschieht, die Sprechblase bleibt.
5. ‚Abbrechen‘ tippen. Erwartet: die Sprechblase ist weg, das Grau ist weg, die Kachel gleitet zurück, das Reiselogbuch ist noch da.

**P-107/4 – Zurückwischen: Kapseln werden kleiner und blasser**
1. iPad und iPhone: eine Kachel nach links wischen, bis sie offen bleibt.
2. Die offene Kachel langsam nach rechts zurückwischen.
3. Erwartet: die Kapseln ‚Einstellen‘ und ‚Löschen‘ werden dabei kleiner und blasser; ist die Kachel geschlossen, ist keine Kapsel mehr zu sehen.

**P-107/5 – Hereinwischen der Seitenleiste und Zurückwischen wie bisher**
1. iPad quer oder hoch: die Seitenleiste mit panel-left ausblenden, dann im Reiselogbuch von irgendwo nach rechts wischen.
2. Erwartet: die Seitenleiste ‚Reiselogbücher‘ kommt herein wie bisher, keine Kachel ist offen.
3. iPhone: ein Reiselogbuch öffnen und im Inhalt nach rechts wischen. Erwartet: zurück zur Startliste wie bisher, keine Kachel ist offen.

**P-107/6 – Kontextmenü wie bisher**
1. iPad und iPhone: eine Kachel ohne zu wischen etwa eine halbe Sekunde drücken.
2. Erwartet: das Kontextmenü mit ‚Reiselogbuch einstellen‘ und ‚Reiselogbuch löschen‘ (rot) wie bisher, die Kachel ist blau getönt und nicht verschoben.
3. Daneben tippen. Erwartet: das Menü schließt, sonst geschieht nichts.

**P-107/7 – VoiceOver**
1. iPad und iPhone: VoiceOver einschalten (Einstellungen › Bedienungshilfen › VoiceOver).
2. In der Liste ‚Reiselogbücher‘ mit einem Finger nach rechts wischen, von Kachel zu Kachel. Erwartet: jede Kachel wird einzeln angesagt (Titel, Zeitraum, Zustand), keine
   Kapsel ‚Einstellen‘ oder ‚Löschen‘ dazwischen.
3. Auf einer Kachel doppeltippen und beim zweiten Tippen halten. Erwartet: das Kontextmenü mit ‚Reiselogbuch einstellen‘ und ‚Reiselogbuch löschen‘ wird angesagt.
4. Das Menü schließen (mit zwei Fingern ein ‚Z‘ zeichnen), VoiceOver wieder ausschalten.

**P-107/8 – Bewegung reduzieren**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Bewegung › ‚Bewegung reduzieren‘ ein; App neu öffnen.
2. Eine Kachel nach links wischen. Erwartet: die Kachel folgt weiter dem Finger; die Kapseln blenden nur ein, ohne zu wachsen.
3. Loslassen bzw. auf die Kachel tippen. Erwartet: die Kachel steht sofort offen bzw. sofort wieder an ihrem Platz, ohne Gleiten.
4. ‚Bewegung reduzieren‘ wieder aus.

**P-107/9 – Größte Textgröße**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Anzeige & Textgröße › Größerer Text ein, Regler ganz nach rechts; App neu öffnen.
2. Eine Kachel nach links wischen, bis sie offen bleibt.
3. Erwartet: die Wörter ‚Einstellen‘ und ‚Löschen‘ sind größer und ganz zu lesen, nichts ist abgeschnitten oder überlappt, keine Kapsel ragt aus dem Bild.
4. Textgröße wieder zurückstellen.

**P-107/10 – Dunkel**
1. iPad und iPhone: Mehr (‚…‘) der Liste ‚Reiselogbücher‘ › ‚Darstellung ›‘ › ‚Dunkel‘.
2. Eine Kachel nach links wischen, bis sie offen bleibt. Erwartet: ‚Löschen‘ rot wie andere rote Schaltflächen, ‚Einstellen‘ wie runde Schaltflächen, beide Wörter gut lesbar.
3. ‚Löschen‘ antippen. Erwartet: die Sprechblase ‚‚<Titel>‘ mit allen Einträgen löschen? …‘; das Eingrauen daneben ist auch dunkel zu sehen.
4. ‚Abbrechen‘ tippen, Darstellung wieder wie vorher (‚Automatisch‘).


**Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.**

## Backlog-Erinnerung

- APD-30 und APD-133 stehen auf Prüfen (P-107).
- Als Nächstes: APD-135 Pakete 1 und 3 (Wortlaut bestätigt, eigene Version, voll).
- Danach: APD-137 (Fehlalarm ‚⚠ Modell‘, Prio 2), APD-136 Umbau bestehender Elemente (mit APD-135 Paket 6 und 7), APD-62, APD-134, APD-44 bis APD-52.
