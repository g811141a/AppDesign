# Bericht – AppDesign 4.70.1 / Reiselogbuch 3.58.4 veröffentlicht

**26.11.2026 · Sitzung 0161**

## Bericht

AppDesign 4.70.1 und Reiselogbuch 3.58.4 sind veröffentlicht: AppDesign e56df03 und Reiselogbuch a3d1427 auf `main`, beide Pages-Läufe ‚success‘. `main` enthält `APP_VERSION` 3.58.4, `AD_NEEDED` 4.70.1 und `AD_VERSION` 4.70.1. Die echte Seite auf github.io kann ich von hier nicht abrufen (Proxy 403); das prüfst du mit P-124/0. Der zweite volle Lauf war grün: alle 192 Läufe in 88:18, Chromium und WebKit. Eine Prüfung wackelt: `ablauf-blatt (iPad)` in WebKit war unter Last rot (iPad hoch, ‚Neues Reiselogbuch‘, Escape: das Fenster verschwand ohne hinauszugleiten, APD-72/D-11) und allein grün. Der erste volle Lauf war rot und brach nach 52 min ab. Grund: `regeln-ablauf` und die Gegenprobe APD-116/B-7 in `ablauf-gesamt` (WebKit) waren nicht an das neue Hinweisfenster angepasst. Beide habe ich nachgezogen, das steht im CHANGELOG 3.58.4.

**Warum die Prüfung es übersah:** In Sitzung 0160 liefen die angepassten Prüfungen nur in Chromium, und `regeln-ablauf` war bei der Suche nach derselben Lücke nicht dabei.

## Alle Änderungen

**AppDesign 4.70.1**
- `createAlert` misst die Breite neu, sobald sich der Inhalt des offenen Fensters ändert (P-123/F-1). AD-Bean `alert`, neue Eigenschaft. – **entspricht HIG** (Alerts: kurz, nicht rollen).
- Designrichtlinie 10: Das Ergebnis jeder Ausgabe steht auf jedem Weg im Hinweisfenster, so hoch wie nötig und nie als Blatt in voller Höhe. Kommt es aus der Vorschau, steht es darüber. Designrichtlinie 7, Vorschaufenster: Nach Teilen bzw. PDF folgt darüber das Hinweisfenster mit Ergebnis und ggf. Backup-Erinnerung (P-123/F-2). – **entspricht HIG** (Sheets: volle Höhe nur für Inhalte zum Erstellen). **Weicht ab, weil** ein reiner Erfolgshinweis gegen ‚Avoid using an alert merely to provide information‘ spricht. Designrichtlinie 10 verlangt aber eine ehrliche Meldung, und die Backup-Erinnerung hat eine Handlung. Diese Abweichung gab es schon vorher.

**Reiselogbuch 3.58.4**
- Das Ergebnis jeder Ausgabe steht immer im Hinweisfenster (`showOutputResult`, `exportPdf`) (P-123/F-2).
- Der Hinweis ‚Backup‘ kommt immer, auch nach einer Ausgabe; über der Vorschau öffnet sich kein zweites Fenster (P-123/F-3).
- Prüfungen: `ablauf-p120` mit den Teilen P-123/F-1 bis P-123/F-3. Angepasst sind `ablauf-sperre`, `ablauf-gesamt` (Gegenprobe zählt jetzt B-1 oder B-2) und `regeln-ablauf` (schließt nach PDF das Hinweisfenster).

**Apple-Review:** `hig.mjs` und alle automatisch prüfbaren Regeln des Katalogs sind im vollen Lauf grün (Chromium und WebKit).

**Backlog:** APD-147 ‚Schneller prüfen‘ hat jetzt Priorität 3 und ist als letztes offenes Thema vermerkt, zusammen mit der Recherche dieser Sitzung (AppDesign 42e4c1a auf `main`).

## Offene Usertests

P-122 und P-123 sind durch P-124 ersetzt. **Bitte die App zuerst ganz schließen und neu öffnen.**

Testfälle P-124 (Schritt für Schritt, Zusammenarbeit allgemein 3.19.0). Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Für P-124/1 bis P-124/3 ein nicht gesperrtes Reiselogbuch mit langem Titel verwenden
(z. B. ‚Test‘); heute **noch kein Backup** erstellen, sonst fehlt die Erinnerung (‚Backup erstellen‘ erst in P-124/3). P-124 ersetzt die offenen Punkte von P-123 (/2 und /3).

**P-124/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.58.4 · erstellt am … · AppDesign 4.70.1‘. Automatisch geprüft in `version-regeln`.

**P-124/1 – Dateiname in einer Zeile über der Vorschau (iPad)**
1. iPad quer, hell; ‚Test‘ öffnen, oben Teilen → ‚Vorschau‘.
2. Teilen der Vorschau antippen, im Teilen-Menü ‚In Dateien sichern‘ wählen und sichern.
3. Erwartet: über der Vorschau das Hinweisfenster ‚Ausgabe V…‘ mit ‚✅ Teilen-Menü abgeschlossen für‘ und darunter der Dateiname **in einer Zeile**; das Fenster
   ist so breit wie dafür nötig. Mit x schließen.
4. In der Vorschau ‚PDF‘ antippen, das Drucken-Menü abbrechen.
5. Erwartet: wie in Schritt 3, der Dateiname endet auf ‚.pdf‘. Mit x schließen, Vorschau mit x schließen.
6. Dasselbe iPad hoch. Erwartet: wie in Schritt 3 und 5. Automatisch geprüft in `ablauf-p120` (P-123/F-1).

**P-124/2 – Ergebnis auf jedem Weg im Hinweisfenster (iPhone)**
1. iPhone hoch, hell; ‚Test‘ öffnen, oben Teilen → ‚HTML‘ → im Teilen-Menü ‚In Dateien sichern‘.
2. Erwartet: das Hinweisfenster ‚Ausgabe V…‘ mittig, nur so hoch wie nötig (kein Blatt in voller Höhe), mit ‚✅ Teilen-Menü abgeschlossen für‘, dem Dateinamen
   und darunter ‚💾 Denk daran, auch ein Backup zu erstellen.‘. Mit x schließen.
3. Oben Teilen → ‚Vorschau‘ → Teilen → ‚In Dateien sichern‘.
4. Erwartet: über der Vorschau dasselbe Hinweisfenster, genauso hoch wie in Schritt 2. Mit x schließen, Vorschau mit x schließen.
5. Dasselbe am iPad quer. Erwartet: wie in Schritt 2 und 4, das Hinweisfenster mittig. Automatisch geprüft in `ablauf-p120` (P-123/F-2).

**P-124/3 – Backup aus der Erinnerung ohne zweites Fenster (iPad)**
1. iPad quer, hell; ‚Test‘ → Teilen → ‚Vorschau‘ → Teilen → ‚In Dateien sichern‘.
2. Erwartet: über der Vorschau das Hinweisfenster ‚Ausgabe V…‘ mit der Erinnerung ‚💾 Denk daran, auch ein Backup zu erstellen.‘ und ‚Backup erstellen‘.
3. ‚Backup erstellen‘ antippen und im Teilen-Menü sichern.
4. Erwartet: im selben Hinweisfenster steht statt der Erinnerung ‚✅ Teilen-Menü abgeschlossen für‘ mit dem Namen des Backups; es öffnet sich **kein** zweites
   Fenster ‚Backup‘. Automatisch geprüft in `ablauf-p120` (P-122/F-2).


**Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.**

Nächste Version: 0 Punkte bereit · Offen im Backlog: APD-135, APD-136, APD-148 (Priorität 1), APD-139, APD-141, APD-142, APD-145 (Priorität 2), APD-70, APD-147 (Priorität 3, zuletzt), RLB-126, RLB-6.
