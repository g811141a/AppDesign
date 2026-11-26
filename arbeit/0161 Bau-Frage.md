# Bau-Frage – AppDesign 4.70.1 / Reiselogbuch 3.58.4

**26.11.2026 · Sitzung 0161**

## Bericht

Die Korrektur aus den Zweigen `arbeit-0160` ist in die Vorbereitungs-Zweige übernommen: `vorbereitung-4.70.1` (AppDesign, 85be26c) und `vorbereitung-3.58.4` (Reiselogbuch, 23f9c01). Beide Zweige sind auf GitHub gesichert, `main` ist unverändert. Den Wortlaut für Designrichtlinie 10 und 7 hast du am 23.11.2026 bestätigt, er ist jetzt eingetragen. `doku-regeln` und `version-regeln` sind grün (Chromium). Vorher war `doku-regeln` rot, weil Nummern verkürzt zitiert waren (‚F-2‘ statt ‚P-123/F-2‘); ich habe sie ausgeschrieben, auch in `UEBERGABE.md`. Das Skript schlägt **Stufe voll** vor, weil sich AppDesign (`ui.js`) und der App-Code ändern.

## Alle Änderungen

**AppDesign 4.70.1**
- `v4/ui.js` – `createAlert`: Sobald sich der Inhalt des offenen Fensters ändert, misst `alert` die Breite neu (`MutationObserver`). Das behebt P-123/F-1. AD-Bean: `alert`, neue Eigenschaft.
- Designrichtlinie 10: Das Ergebnis jeder Ausgabe steht auf jedem Weg im Hinweisfenster, so hoch wie nötig und nie als Blatt in voller Höhe. Kommt es aus der Vorschau, steht es darüber.
- Designrichtlinie 7, Vorschaufenster: Nach Teilen bzw. PDF folgt darüber das Hinweisfenster mit dem Ergebnis und ggf. der Backup-Erinnerung.
- Versionsgeschichte, CHANGELOG, Backlog (P-124), feste Fassung `fassung/4.70.1/`.

**Reiselogbuch 3.58.4**
- `showOutputResult` nutzt immer `inform`, `exportPdf` geht über `#msg`. So steht das Ergebnis auf jedem Weg im Hinweisfenster (P-123/F-2).
- `saveBackup(anchor, { inBox })`: Der Hinweis ‚Backup‘ kommt jetzt immer, auch nach einer Ausgabe. Über der Vorschau öffnet sich kein zweites Fenster (P-123/F-3).
- Prüfungen: `ablauf-p120` hat die neuen Teile P-123/F-1 bis P-123/F-3 (rot gegen 3.58.3, mit der Korrektur grün in Sitzung 0160). Angepasst sind `ablauf-p120`, `ablauf-sperre` und `ablauf-gesamt`. Der Fassungs-Pfad zeigt überall auf 4.70.1.
- CHANGELOG mit Testfällen P-124, Backlog (P-123/F-1 bis P-123/F-3 aus ‚0.‘ genommen, P-124 unter ‚1.‘).

**Warum die Prüfungen es übersahen:** `checkDateiname` prüfte die Breite nur auf dem direkten Weg. Die Backup-Prüfungen starteten nie nach einer Ausgabe. Die Höhe des Ergebnisfensters wurde nicht zwischen den Wegen verglichen.

## Offene Usertests

- **P-123** (3.58.3) und **P-122** (3.58.2): nicht ok. Mit dem Bau ersetzt sie P-124.
- **P-124** (neu, nach dem Bau zu prüfen) – wörtlich aus dem CHANGELOG 3.58.4:

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


## Frage

Soll ich Version AppDesign 4.70.1 / Reiselogbuch 3.58.4 mit P-123/F-1 bis P-123/F-3 erstellen (Prüflauf Stufe voll)?

Nächste Version: 0 Punkte bereit · Offen im Backlog: APD-135, APD-136, APD-148 (Priorität 1), APD-139, APD-141, APD-142, APD-145, APD-147, RLB-126, RLB-6.
