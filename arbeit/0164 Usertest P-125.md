# Usertest P-125 – Reiselogbuch 3.58.5 / AppDesign 4.70.2

Wörtlich aus `ReiseLogBuch/CHANGELOG.md` (3.58.5, ‚Testfälle P-125‘).

Testfälle P-125 (Schritt für Schritt, Zusammenarbeit allgemein 3.19.0). Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Für P-125/1 bis P-125/3 ein nicht gesperrtes Reiselogbuch mit **langem Titel** verwenden,
für P-125/4 ein gesperrtes. P-125 ersetzt den offenen Punkt von P-124 (/1).

**P-125/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.58.5 · erstellt am … · AppDesign 4.70.2‘. Automatisch geprüft in `version-regeln`.

**P-125/1 – Hinweisfenster so breit wie nötig (iPad)**
1. iPad quer, hell; das Reiselogbuch mit langem Titel öffnen, oben Teilen → ‚Vorschau‘ → Teilen → ‚In Dateien sichern‘.
2. Erwartet: über der Vorschau das Hinweisfenster ‚Ausgabe V…‘ mit ‚✅ Teilen-Menü abgeschlossen für‘, darunter der Dateiname **in einer Zeile**; das Fenster ist so
   breit wie dafür nötig (breiter als bisher). Mit x schließen, Vorschau mit x schließen.
3. iPad hoch, dasselbe.
4. Erwartet: das Fenster ist hoch schmaler als quer; der Dateiname steht in einer Zeile, wenn er auf den Bildschirm passt, sonst bricht er nur nach einem Leerzeichen
   um. Automatisch geprüft in `ablauf-p120` (P-124/F-1).

**P-125/2 – Teilen danach nicht mehr hellblau (iPad)**
1. iPad quer, hell; oben Teilen → ‚HTML‘ → ‚In Dateien sichern‘.
2. Erwartet: das Hinweisfenster ‚Ausgabe V…‘; Teilen oben ist hellblau, solange es offen ist. Mit x schließen.
3. Erwartet: Teilen oben ist **nicht mehr** hellblau.
4. Oben Teilen → ‚Vorschau‘ → Teilen → ‚In Dateien sichern‘ → x → Vorschau mit x schließen.
5. Erwartet: Teilen oben ist nicht hellblau. Automatisch geprüft in `ablauf-p120` (P-124/F-2).

**P-125/3 – Teilen danach nicht mehr hellblau (iPhone)**
1. iPhone hoch, hell; das Reiselogbuch mit langem Titel öffnen, oben Teilen → ‚HTML‘ → ‚In Dateien sichern‘.
2. Erwartet: das Hinweisfenster ‚Ausgabe V…‘. Mit x schließen.
3. Erwartet: Teilen oben ist nicht hellblau. Automatisch geprüft in `ablauf-p120` (P-124/F-2).

**P-125/4 – Gesperrte Seite: die richtige Schaltfläche (iPad)**
1. iPad quer, hell; ein gesperrtes Reiselogbuch öffnen, oben ‚PDF‘ antippen, das Drucken-Menü abbrechen.
2. Erwartet: solange das Hinweisfenster ‚Ausgabe V…‘ offen ist, ist **PDF** hellblau (nicht Teilen). Mit x schließen.
3. Erwartet: weder PDF noch Teilen ist hellblau. Automatisch geprüft in `ablauf-p120` (P-124/F-2).

---

**Weitere offene Usertests:** keine. Die offenen Punkte von P-124, P-123 und P-122 sind durch P-125 bzw. die Versionen davor ersetzt.

**Rückmeldung:** im Fenster ‚P-125: alles ok / nicht ok‘ oder im Chat, z. B. ‚ok bis auf 2‘ (Nummer, ‚nicht ok‘ und ein Stichwort genügen).
