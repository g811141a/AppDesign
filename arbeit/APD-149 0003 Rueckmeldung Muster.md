# APD-149 – Rückmeldung zum Muster und Korrektur (Sitzung AppDesign 0003)

**27.11.2026** · Kein Bau, keine AppDesign-Version (0 Nr. 21). Die Korrektur liegt auf dem Zweig `apd-149-muster` (Commit 3bf1311), noch nicht auf `main`.

## Deine Rückmeldung

| Schritt | Rückmeldung | Einordnung |
|---|---|---|
| 0–3, 5, 6, 8, 10–14, 16 | ok | – |
| 4, 7, 9 | iPhone hoch: ‚Neuer Eintrag‘, ‚Eintrag bearbeiten‘, ‚Anderes Fenster‘ haben die volle Höhe; am iPad passt sich die Höhe dem Inhalt an | **so festgelegt** (unten) |
| 15 | Das Untermenü ‚Ansicht‘ schließt nach 2 s; Untermenüs müssen offen bleiben | **Fehler im Entwurf, behoben** |

## Bericht

Schritt 15 war ein Fehler im Entwurf: `commands.revalidate()` schloss ein offenes Untermenü absichtlich, und der Schalter ‚Kopfzeile alle 2 s neu aufbauen‘ ruft es alle 2 s auf.
Jetzt füllt der Neuaufbau Menü und Untermenü neu, das Untermenü bleibt offen am neuen Eintrag gleichen Namens, der Fokus bleibt auf dem Eintrag an derselben Stelle.
Deinen Ablauf habe ich zuerst als feste Prüfung APD-149/S-16 nachgebaut; sie war gegen den Stand auf `main` rot (Stapel nur ‚menu‘, Untermenü zu) und ist jetzt in Chromium und WebKit grün.
Warum die Prüfung es übersah: S-3 prüfte den Neuaufbau nur mit offenem Menü, nicht mit offenem Untermenü, und das Schließen des Untermenüs stand als gewollt im Code.
Die Schritte 4, 7 und 9 folgen der Regel R-4.6 (Designrichtlinie 15.17): am iPhone ist ein Fenster ein Blatt ‚nur groß‘ wie ‚Neuer Termin‘, am iPad ein Formblatt wie ‚Neuer Kontakt‘ – der Entwurf öffnet Fenster über `openDialog` von v4 und ändert daran nichts.

## Alle Änderungen (Zweig `apd-149-muster`)

| Datei | Was |
|---|---|
| `katalog/entwurf/presentation-commands.js` | `revalidate` schließt kein Untermenü mehr; neu `neuZeichnen`: Menü und offenes Untermenü neu füllen, Quelle des Untermenüs = neuer Eintrag gleichen Namens (fehlt er, schließt das Untermenü), Fokus bleibt |
| `arbeit/APD-149/muster-pruefen.mjs` | neuer Fall APD-149/S-16: Schalter ein, Mehr › Ansicht, 5 s warten → Untermenü offen, Eintrag `aria-expanded` und getönt, Untermenü am Eintrag, Mehr getönt; danach Auswahl ‚Kompakt‘ schließt alles und wirkt |

- Dieselbe Lücke anderswo: Das Neufüllen gilt für jedes Menü aus Befehlen, auch das Kontextmenü (gleicher Weg `rerender`). v4 hat kein `revalidate`; dort schließt ein Menü nur, wenn seine Schaltfläche verschwindet (R-8.1) – nicht dieselbe Lücke.

## Prüfungen (diese Sitzung, nach der Korrektur)

| Prüfung | Chromium | WebKit |
|---|---|---|
| S-16 gegen den Stand auf `main` (vor der Korrektur) | rot, wie verlangt | – |
| `muster-pruefen.mjs` S-1 bis S-14, S-16, L-1 bis L-4 | 0 Fehler, 1 Abweichung R-1.4 (bekannt) | 0 Fehler, 1 Abweichung R-1.4 (bekannt) |
| Gegenprobe S-15 | ohne Ableitung S-1, S-3 rot · ohne Freigabe S-2, S-3 rot | ebenso |
| `entwurf-regeln.mjs` | alles in Ordnung | – |
| `bean-katalog` | alles in Ordnung | alles in Ordnung |
| `doku-regeln` | alles in Ordnung | – |

## Nach dem Hochladen erneut ausprobieren

Link: https://g811141a.github.io/AppDesign/katalog/index.html#presentation – vorher in Safari die Seite neu laden.

15. iPad quer, hell, ‚Stapel (Steuer-Bean)‘: Schalter ‚Kopfzeile alle 2 s neu aufbauen‘ ein, ‚Mehr‘ antippen, dann ‚Ansicht‘, 5 s warten. Erwartet: ‚Ansicht‘ bleibt offen neben dem Menü, ‚Ansicht‘ und ‚Mehr‘ bleiben blau.
15a. Dann im Untermenü ‚Kompakt‘ antippen. Erwartet: Menü und Untermenü gehen zu, ‚Mehr‘ ist nicht mehr blau, im Protokoll ‚Ansicht kompakt‘.
15b. Dasselbe am iPhone hoch. Erwartet: wie 15 und 15a.

## Alle offenen Usertests

### P-126 – Reiselogbuch 3.59.0 / AppDesign 4.71.0 (aus Sitzung 0167, weiter in Reiselogbuch 0168)

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


Nächste Version AppDesign: 1 Punkt bereit (APD-149/J-1). Offen im Backlog: APD-135, APD-136, APD-149, APD-148 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150 (Prio 2) · APD-70, APD-147 (Prio 3).
