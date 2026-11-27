# Usertest P-126 – Abfrage (Sitzung 0168)

Bitte je Testfall ‚ok‘, ‚nicht ok‘ oder ‚nicht getestet‘ im Fenster wählen; bei ‚nicht ok‘ genügt ein Stichwort im Chat (0 Nr. 17).

## Offener Usertest P-126 (Reiselogbuch 3.59.0 / AppDesign 4.71.0)

**P-126** – bitte die App zuerst ganz schließen und neu öffnen.

Testfälle P-126 (Schritt für Schritt, Zusammenarbeit allgemein 3.19.0). Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Vor P-126/1 auf beiden Geräten ein **Backup erstellen** (Sicherheit). Zum Probieren ein
Reiselogbuch ‚Test‘ mit mindestens einem erfassten Tag anlegen; deine echten Reiselogbücher nicht löschen.

**P-126/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.59.0 · erstellt am … · AppDesign 4.71.0‘. Automatisch geprüft in `version-regeln`.

**P-126/1 – Löschen ohne Abfrage (iPad)**
1. iPad quer, hell; ‚Test‘ öffnen, oben Mehr (ellipsis) → ‚Reiselogbuch löschen‘.
2. Erwartet: keine Sprechblase; ‚Test‘ ist aus der Liste verschwunden, die Startreise ist offen; unten in der Liste die Kachel ‚Zuletzt gelöscht‘ mit Papierkorb und ‚1‘.
   Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-1, T-2).

**P-126/2 – Liste und Vorschau (iPad)**
1. iPad quer, hell; die Kachel ‚Zuletzt gelöscht‘ antippen.
2. Erwartet: Kopf ‹ ‚Zuletzt gelöscht‘ · ‚1 Reiselogbuch‘; darunter ‚Gelöschte Reiselogbücher bleiben hier 30 Tage. Danach werden sie endgültig gelöscht.‘; ‚Test‘ blau
   mit ‚Gelöscht am <heute> · noch 30 Tage‘. Rechts die Vorschau mit ‚Dieses Reiselogbuch ist gelöscht. Gelöscht am <heute> – wird in 30 Tagen endgültig gelöscht.‘
   und ‚Wiederherstellen‘; keine Felder, kein Mehr. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-3, T-4).

**P-126/3 – Wischgefühl in ‚Zuletzt gelöscht‘ (iPad)**
1. iPad quer, hell; in ‚Zuletzt gelöscht‘ ‚Test‘ langsam nach links wischen und loslassen.
2. Erwartet: die Kachel folgt dem Finger, daneben die Kapseln ‚Wiederherstellen‘ und ‚Löschen‘ (rot, ganz außen); das Wort ‚Wiederherstellen‘ ist ganz lesbar; die
   Kachel bleibt offen bzw. federt zurück wie bei ‚Reiselogbücher‘.
3. Neben die Kachel in die Liste tippen. Erwartet: die Kachel schließt, nichts wird ausgelöst.

**P-126/4 – Endgültig löschen fragt (iPad)**
1. iPad quer, hell; in ‚Zuletzt gelöscht‘ ‚Test‘ lange drücken.
2. Erwartet: Menü ‚Wiederherstellen‘ · Strich · ‚Endgültig löschen‘ (rot).
3. ‚Endgültig löschen‘ antippen. Erwartet: Sprechblase ‚‚Test‘ mit 1 Eintrag endgültig löschen? Das kann nicht rückgängig gemacht werden.‘ (bzw. ‚mit allen N
   Einträgen‘) mit ‚Endgültig löschen‘ (rot) und ‚Abbrechen‘ – kein ‚Erst Backup erstellen‘.
4. ‚Abbrechen‘ antippen. Erwartet: ‚Test‘ bleibt in ‚Zuletzt gelöscht‘. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-7).

**P-126/5 – Wiederherstellen (iPhone)**
1. iPhone hoch, hell; in der Startliste unten ‚Zuletzt gelöscht‘ antippen, dann ‚Test‘.
2. Erwartet: eigene Seite ‚Test‘ mit ‹, darunter der Hinweis ‚Dieses Reiselogbuch ist gelöscht. …‘ mit ‚Wiederherstellen‘ und die Vorschau.
3. ‚Wiederherstellen‘ antippen. Erwartet: ‚Test‘ öffnet mit seinen Tagen; zurück in der Startliste steht ‚Test‘ wieder unter seinem Jahr, ‚Zuletzt gelöscht‘ ist weg.
   Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-4, T-5).

**P-126/6 – Abgleich zweier Geräte über ‚Backup laden‘**
1. iPad: ‚Test‘ löschen (Mehr → ‚Reiselogbuch löschen‘), dann Mehr der Seitenleiste → ‚Backup erstellen‘ und in Dateien (iCloud Drive) sichern.
2. iPhone: Mehr der Startliste → ‚Backup laden‘, das Backup vom iPad wählen, ‚Abgleichen‘.
3. Erwartet auf dem iPhone: ‚Test‘ ist aus ‚Reiselogbücher‘ verschwunden und steht unter ‚Zuletzt gelöscht‘ mit ‚Gelöscht am <Tag auf dem iPad> · noch N Tage‘.
4. iPhone: ‚Test‘ in ‚Zuletzt gelöscht‘ lange drücken → ‚Wiederherstellen‘; Backup erstellen und sichern. iPad: dieses Backup laden, ‚Abgleichen‘.
5. Erwartet auf dem iPad: ‚Test‘ steht wieder in ‚Reiselogbücher‘, ‚Zuletzt gelöscht‘ ist leer bzw. weg. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-9).

**P-126/7 – Backup in Dateien sichern und laden**
1. iPad: ‚Test‘ löschen, Backup erstellen und in Dateien sichern.
2. iPad: ‚Test‘ in ‚Zuletzt gelöscht‘ wiederherstellen; dann ‚Backup laden‘ mit dem Backup aus Schritt 1, ‚Ersetzen‘.
3. Erwartet: ‚Test‘ steht wieder unter ‚Zuletzt gelöscht‘ mit dem Löschdatum aus Schritt 1. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-10).

**P-126/8 – VoiceOver**
1. iPad, VoiceOver ein (Einstellungen → Bedienungshilfen); ein Reiselogbuch ‚Test‘ über Mehr → ‚Reiselogbuch löschen‘ löschen.
2. Erwartet: VoiceOver sagt ‚‚Test‘ nach ‚Zuletzt gelöscht‘ verschoben‘.
3. Zur Kachel ‚Zuletzt gelöscht‘ streichen. Erwartet: ‚Zuletzt gelöscht, 1, Taste‘; doppelt tippen öffnet die Liste, ‹ heißt ‚Reiselogbücher‘.
4. In der Vorschau ‚Wiederherstellen‘ doppelt tippen. Erwartet: ‚‚Test‘ wiederhergestellt‘.
