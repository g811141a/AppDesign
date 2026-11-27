# Bericht – AppDesign 4.71.0 / Reiselogbuch 3.59.0 veröffentlicht (RLB-126 ‚Zuletzt gelöscht‘)

**27.11.2026 · Sitzung 0167**

## Bericht

AppDesign 4.71.0 und Reiselogbuch 3.59.0 sind veröffentlicht: AppDesign f852d77 und Reiselogbuch 1d9d2eb auf `main`, beide Pages-Läufe ‚success‘. `main` enthält `APP_VERSION` 3.59.0, `AD_NEEDED` 4.71.0 und `AD_VERSION` 4.71.0. Die echte Seite auf github.io prüfst du mit P-126/0. Der letzte volle Lauf war grün: alle 196 Läufe in 89:45, Chromium und WebKit. Eine Prüfung wackelt: `ablauf-markierung-menues` in WebKit war unter Last rot und allein grün. Das Mehr-Menü der Seitenleiste wurde mitten im Aufgehen gemessen (302 statt 340 px breit, Einträge 41 statt 46 px hoch).

**Rote Läufe davor:**
- **Lauf 1:** Der Neustart des Containers hat ihn beendet. Danach lief `los` vom Arbeitsprozess getrennt.
- **Lauf 2:** Er war rot in `hig (Text 53)`, also bei der größten Schrift, nach 97:32.
  - Der Hinweis zur Frist verdeckte am iPhone quer die Liste.
  - ‚Wiederherstellen‘ war 524 px breit, breiter als die Vorschau.
  - Die Sprechblase ‚Endgültig löschen‘ stand nach dem Drehen unter dem Bildschirmrand.
  - Behoben ist alles in 4.71.0 (CHANGELOG ‚Größte Schrift‘).
- **Lauf 3:** Er brach gleich im Vorlauf ab (`doku-regeln`).
  - Die Parallel-Sitzung AppDesign 0002 hatte auf `main` Texte mit Verweisen auf Dateien hochgeladen, die nur auf ihrem Zweig `apd-149-muster` liegen.
  - Ich habe nur die Verweise umformuliert (3d03454) und AppDesign 0003 Bescheid gegeben.

**Warum die Prüfung es übersah:** Der Hilfsagent hat `hig` beim Bauen nur hell und dunkel laufen lassen, nicht in Text 53. Erst der volle Lauf prüfte die größte Schrift.

## Alle Änderungen

**AppDesign 4.71.0**
- **Neue AD-Bean `recentlydeleted` (`createRecentlydeleted`):**
  - Hält gelöschte Einträge 30 Kalendertage, mit Inhalt, Zeitpunkt und Gerät.
  - Bietet Kachel, Liste, Hinweis über der Vorschau, Kontextmenü und Wischen ‚Wiederherstellen‘ · ‚Endgültig löschen‘.
  - **Entspricht HIG:** Bei Apple heißt das Muster ‚Recently Deleted‘ (Fotos, Notizen, Dateien). Was rückgängig zu machen ist, fragt nicht. Nur das Endgültige fragt.
- **`createSync`, Option `recentlyDeleted`:** Beim Abgleich gilt der jüngere Löschzeitpunkt. Wiederhergestellt, endgültig gelöscht oder danach geändert gewinnt. – Kein HIG-Thema.
- **`design.css` `.ad-recentlydeleted-…`:** Die Schrift wächst mit und bricht um (R-6.3). – **entspricht HIG** (Dynamic Type).
- **Regeln (Wortlaut freigegeben, RLB-126/J-10):**
  - R-4.12 hat eine Ausnahme: Löschen nach ‚Zuletzt gelöscht‘ fragt nicht.
  - R-7.8 ist angepasst.
  - Neu sind R-7.10 ‚Zuletzt gelöscht‘ und Abschnitt 15.24.
  - **Entspricht HIG** (Alerts: nicht für Rückgängig-Machbares).
- **`placeAt`:** Bleiben unter einer Kachel weniger als 120 px, steht das Menü oder die Sprechblase bündig über der Backup-Kachel, und der Inhalt rollt. – **entspricht HIG** (Menüs ganz im Bild).
- **Katalog** `recentlydeleted.js` mit ‚Ausprobieren‘.
- **Prüfungen:**
  - `checkRecentlyDeleted` mit den Gegenproben `zuletzt:frage` und `zuletzt:frist`.
  - `checkErstFragen` und `checkWischen` haben neue Optionen.

**Reiselogbuch 3.59.0**
- **Löschen ohne Abfrage:** Das Reiselogbuch kommt nach ‚Zuletzt gelöscht‘, und VoiceOver sagt es an. Gesperrte lassen sich weiter nicht löschen. – **entspricht HIG**.
- **Liste ‚Zuletzt gelöscht‘:** Sie ist die letzte Kachel, mit Papierkorb und Anzahl. Darin stehen der Hinweis zur Frist und ‚noch N Tage‘. – **entspricht HIG** (wie in Fotos).
- **Vorschau nur zum Lesen:** Sie zeigt ‚Wiederherstellen‘. Am iPhone ist sie eine eigene Seite mit ‹. – **entspricht HIG**.
- **Endgültig löschen:** Es fragt, ohne ‚Erst Backup erstellen‘. – **entspricht HIG** (destruktiv, rot).
- **Abgleich und Backup:** ‚Zuletzt gelöscht‘ kommt mit ins Backup. ‚Abgleichen‘ und ‚Ersetzen‘ übernehmen es.
- **`PROMPT.md`:** Lösch-Abfrage und neuer Abschnitt ‚Zuletzt gelöscht‘.
  - Abfragen und Wischen habe ich als Folge-Änderungen nachgezogen. Das geht etwas über die freigegebene Stelle 5.1 hinaus.
- **Prüfungen:**
  - Neu: `ablauf-zuletzt-geloescht` (RLB-126/T-1 bis T-15).
  - `ablauf-wischen` hat einen dritten Teil ‚Zuletzt‘.
  - Elf Abläufe sind auf Löschen ohne Abfrage umgestellt.
  - `hig` misst ‚Zuletzt gelöscht‘ und die Sprechblase.

**Apple-Review:** `hig.mjs` und alle automatisch prüfbaren Regeln des Katalogs sind im vollen Lauf grün, in allen Textgrößen, in Chromium und WebKit.

**Backlog:** RLB-126 ist gebaut, der Usertest P-126 ist offen. APD-149/J-1 ist bereit, braucht aber eine eigene Bau-Frage. Es war nicht Teil dieses Baus.

## Aufgefallen, nicht geändert

1. **Wiederherstellen stempelt alle Felder neu:** `stamp()` setzt alle `dayAt`- und `metaAt`-Werte neu, weil `lastSnap` fehlt.
   - Folge: Hat das andere Gerät vor dem Wiederherstellen etwas geändert, verliert es beim Abgleich feldweise.
   - Das habe ich aus dem Code gefolgert, nicht mit zwei Geräten geprüft.
2. **Gegenprobe `wischen:W-97`:** Sie war schon vorher kaputt (`abstand: 11, rand: 11,` fehlt). Mehrere andere Gegenproben liefen nicht.
3. **Sprechblase am iPad:** `hig` misst sie nicht (Frage zu R-8.1, ‚beside‘).
4. **Zurückwischen am iPhone:** Es wirkt in der Vorschau nicht, so wie im gesperrten Fall (RLB-125/T-11).
5. **iPad hoch mit Seitenleiste:**
   - Die Vorschau ist nur 434 px breit, der Hinweis bricht Wort für Wort um.
   - Die Seitenleiste wird von 353 auf 340 px schmaler.
6. **Kleinere Punkte:**
   - Der Text zu `keptDeleted` in `createSync` ist veraltet.
   - Der Kopf der README von ReiseLogBuch-Import zeigt 1.3.0.
   - Die Überschrift ‚Tag‘ bricht senkrecht um.
7. **Wackler:** `ablauf-markierung-menues` (WebKit), siehe oben.

## Offene Usertests

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


**Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.**

Nächste Version AppDesign: 1 Punkt bereit (APD-149/J-1, eigene Bau-Frage) · Reiselogbuch: 0 Punkte bereit · Offen im Backlog: APD-135, APD-136, APD-149, APD-148 (Priorität 1), APD-139, APD-141, APD-142, APD-145, APD-150 (Priorität 2), APD-70, APD-147 (Priorität 3), RLB-6.
