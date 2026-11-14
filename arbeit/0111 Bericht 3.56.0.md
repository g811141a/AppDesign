# Bericht – Reiselogbuch 3.56.0 mit AppDesign 4.59.0 (Sitzung 0111, 14.11.2026)

**Veröffentlicht:** Reiselogbuch 3.56.0 (Commit `03231da`) und AppDesign 4.59.0 (Commit `22e8b76`) auf `main`. Beide Pages-Läufe ‚success‘.
`index.html` und `sw.js` laden die Fassung 4.59.0. Prüflauf voll: **alle 154 Läufe grün** (73 min). Davon wackelten 2: unter Last rot, allein grün.

Unter den beiden Zeilen ‚Quartierkosten‘ in der Statistik stehen jetzt die teuersten und die günstigsten Quartiere (RLB-121). Lange Einträge
brechen nur im Namen um. Am iPad hoch neben der Seitenleiste steht ab Text XXL die Bezeichnung über dem Wert. Der volle Prüflauf fand
zwei Fehler in diesem Umbau. Ich habe sie vor der Veröffentlichung behoben (unten), deshalb waren drei Läufe nötig.

## Alle Änderungen

**Reiselogbuch 3.56.0**
- **Statistik:** unter ‚Quartierkosten‘ die neuen Zeilen ‚Teuerste Quartiere‘ und ‚Günstigste Quartiere‘, in App, Vorschau und Ausgabe. Je Zeile höchstens 3 Aufenthalte als
  ‚Name (Preis je Nacht)‘. Sie erscheinen erst ab 2 Aufenthalten mit Preis, und kein Aufenthalt steht in beiden Zeilen.
- **Prüfungen:** `ablauf-preis-km` RLB-121/M-1 bis M-14, M-16; `ablauf-abgleich-faelle` Fall 18 (M-15); **neu in dieser Sitzung:** `oeffnen-position`
  läuft zusätzlich mit Text 23.

**AppDesign 4.59.0**
- **`aufzaehlung` (R-10.5):** Ein Eintrag bleibt am Stück, wenn er in die Zeile passt. Sonst bricht er im Namen um, Preis und ‚·‘ bleiben beim letzten Wort.
- **`textUm` (R-1.10):** `ts-um` ab 21 px, wenn der Inhalt schmaler als 600 px ist (iPad hoch mit Seitenleiste, geteilter Bildschirm).
- **Neu in dieser Sitzung – `keepPlace` ruft `textUm()` sofort auf (R-8.1):** Am iPad hoch bei Text 23 stand nach Seitenleiste aus und ein ein anderer
  Tag oben. Beim Drehen sprang die Seite (mit 4.57.0 nicht).
- **Neu in dieser Sitzung – `textUmHalten` (R-7.4):** Ändert sich nur die Breite des Inhalts, läuft der Umbau über `keepPlace`. Sonst stand beim Öffnen am iPad hoch
  bei Text 23 der Tag nicht unter dem Kopf.
- **Warum die Prüfungen das vorher nicht sahen:** `oeffnen-position` (Seitenleiste ein/aus) lief nur in der Standard-Textgröße, und bei Text 53 ist `ts-um`
  immer an. Erst `hig (Text 23)` im vollen Lauf traf den Fall. Seitdem läuft `oeffnen-position` auch mit Text 23.
- **Designrichtlinie 4.59.0:** RLB-121/W-1 bis W-4. Dazu wurde `checkAufzaehlung` erweitert.

## Apple-Review

- Zwei neue Zeilen in der Statistik – **entspricht HIG** (klare Hierarchie, gleiche Form wie die übrigen Statistik-Zeilen).
- Aufzählung mit langen Einträgen – **entspricht HIG** (Text nicht abgeschnitten, kein Preis getrennt).
- Umbau bei großer Schrift im schmalen Inhalt – **entspricht HIG** (Dynamic Type: bei großer Schrift untereinander statt abschneiden).
- Position bleibt bei Seitenleiste ein/aus und beim Öffnen – **entspricht HIG** (der Ort bleibt beim Wechsel der Ansicht erhalten).
- **Prüfskripte:** HIG-Prüfung in 8 Varianten (hell, dunkel, beide mit Bedienungshilfen, Text 14, 23, 33, 53) in Chromium und WebKit grün. Regel-Prüfungen
  grün: `regeln-ablauf`, `text-regeln`, `start-regeln`, `kontextmenue-regeln` (iPad, iPhone), `abgleich-regeln`, `backup-regeln`, `offline-regeln`,
  `version-regeln`, `doku-regeln`.
- **Wackelt (APD-85 Teil 6, schon im Backlog):** `ablauf-seitenleiste-position` und `ablauf-seitenleiste-hoch` in WebKit waren unter Last rot und allein grün.

**Bitte die App ganz schließen und neu öffnen** (App vom Home-Bildschirm), damit 3.56.0 geladen wird.

## Offene Usertests

### Usertest P-103 (Reiselogbuch 3.56.0, AppDesign 4.59.0)

Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der **App vom Home-Bildschirm**. Zuerst die App ganz schließen und neu öffnen.

**P-103/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.56.0 · erstellt am … · AppDesign 4.59.0‘.

**P-103/1 – Zwei neue Zeilen (iPad quer)**
1. iPad quer, hell: ein Reiselogbuch mit mindestens 2 Quartieren mit Preis öffnen (‚Preis der Quartiere erfassen‘ an).
2. Ganz nach unten zur Statistik rollen.
3. Erwartet: direkt unter ‚Quartierkosten:‘ die Zeilen ‚Teuerste Quartiere:‘ und ‚Günstigste Quartiere:‘, je Eintrag ‚Name (Preis je Nacht €)‘,
   getrennt mit ‚·‘; kein Quartier steht in beiden Zeilen.

**P-103/2 – Lesbarkeit (iPad quer)**
1. iPad quer, hell: wie P-103/1 die Statistik ansehen.
2. Auf die Umbrüche der beiden Zeilen achten.
3. Erwartet: kein Preis ist getrennt, keine Zeile beginnt mit ‚·‘, nichts ist abgeschnitten.

**P-103/3 – Große Schrift (iPad hoch)**
1. iPad hoch, hell, Seitenleiste eingeblendet; in den Einstellungen ‚Anzeige & Helligkeit‘ → ‚Textgröße‘ die vorletzte oder letzte Stufe wählen.
2. In der App die Statistik ansehen.
3. Erwartet: Bezeichnung über dem Wert (untereinander), nichts ragt rechts hinaus. Danach die Textgröße wieder zurückstellen.

**P-103/4 – Ausgabe als PDF bzw. HTML (iPad)**
1. iPad quer, hell: im Reiselogbuch aus P-103/1 oben das Teilen-Icon (share) antippen und ‚HTML‘ wählen (PDF geht mit iOS 27 zurzeit nicht).
2. Die Datei öffnen und zur Statistik rollen.
3. Erwartet: dieselben zwei Zeilen wie in der App, in der Schrift der Ausgabe, kein Preis getrennt.

**Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.**

## Backlog

Nächste Version Reiselogbuch: 0 Punkte bereit · Offen im Backlog: P-103 (prüfen), RLB-6 (Prio 3, in Klärung).
Nächste Version AppDesign: 0 Punkte bereit · Offen: APD-85 Teil 6 (Wackler WebKit), APD-80, APD-30, APD-57, APD-62, APD-44 bis APD-60, APD-70, APD-1.

## Übergabe

Die Sitzung wurde automatisch zusammengefasst, deshalb übergebe ich jetzt ohne Rückfrage (Zusammenarbeit 0 Nr. 13). Die Rückmeldung zu P-103 kommt
in die neue Sitzung **‚Reiselogbuch 0112 – Usertest P-103‘**.
