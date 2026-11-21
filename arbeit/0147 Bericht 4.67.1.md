# Bericht – AppDesign 4.67.1 / Reiselogbuch 3.57.11

**Stand 21.11.2026** · Sitzung 0147

## Bericht

AppDesign **4.67.1** und Reiselogbuch **3.57.11** sind veröffentlicht. Der volle Prüflauf hatte **176 Läufe grün** in 80:06 min, beide Pages-Läufe waren
‚success‘ (AppDesign 59fe382, Reiselogbuch 7838192). Auf `main` stehen `APP_VERSION` 3.57.11, `AD_NEEDED` 4.67.1 und `AD_VERSION` 4.67.1. Der **erste** Prüflauf war rot
(3 Läufe `ablauf-wischen`, nichts veröffentlicht). Ursache war eine Fehlmeldung der neuen R-3.1-Prüfung bei den Kapseln der Wischaktionen (66 × 44, nach 15.4
gewollt). Die Kapseln sind jetzt ausgenommen, mein Probelauf vorher hatte keine Kachel aufgewischt. Bitte die App vor dem Test ganz schließen und neu öffnen.

## Alle Änderungen

1. **P-117/F-1:** Der Mehr-Knopf auf der Katalogseite ‚Hervorgehobene Quelle‘ ist rund (`.round`). Die Prüfung `hig.mjs` R-3.1 meldet jetzt jede Icon-Schaltfläche,
   die für sich allein steht und kein Kreis ist. Ausgenommen sind Kapseln, Menüs, Zeilen, die Kapsel Nach oben / Ans Ende und die Wischaktionen. **Entspricht HIG**
   (runde Icon-Knöpfe).
2. **P-117/F-2:** In `design.css` sind alle Schaltflächen ohne Textauswahl und Callout. **R-3.6** ist um ‚Schaltflächen‘ ergänzt (dein Ja zum Wortlaut). Neu sind
   die Prüfungen `hig.mjs` R-3.6 für jede Schaltfläche in jeder Ansicht und `katalog.mjs` APD-140/Z-6 im Safari-Modell. Auch in der App sind damit unter anderem
   ‚Backup erstellen‘, ‚Abgleichen‘, ‚Ersetzen‘, ‚Abbrechen‘, ‚Abgleichbericht anzeigen‘, das Feld ‚Fazit‘ und ‚Reiselogbuch löschen‘ nicht mehr wählbar.
   **Entspricht HIG** (Beschriftungen von Schaltflächen sind bei Apple nie auswählbar).
3. **Apple-Review:** Das HIG- und Regel-Prüfskript lief im vollen Lauf in allen Ansichten mit (in `hig`, `bean-katalog` und in den Ablauf-Prüfungen) und ist grün.
4. **Warum P-117 durchrutschte:** R-3.1 sah nur Knöpfe mit `border-radius: 50%`. R-3.6 prüfte die Textauswahl nur an ausgewählten Zeilen der App, nie im Katalog
   und nie an Schaltflächen allgemein. Beide Lücken sind jetzt geschlossen.

Bitte zuerst alle Testfälle des Usertests prüfen. Neue Punkte setze ich erst um, wenn der Usertest erledigt ist und gefundene Fehler beseitigt sind.

## Offene Usertests

Nur **P-118**. P-117 ist erledigt (Korrekturen in P-118).

Testfälle P-118 (Schritt für Schritt, Zusammenarbeit allgemein 3.18.0). Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Link des Katalogs (in Safari): https://g811141a.github.io/AppDesign/katalog/index.html

**P-118/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.11 · erstellt am … · AppDesign 4.67.1‘. Automatisch geprüft in `version-regeln`.

**P-118/1 – Katalog: Mehr-Knopf rund (P-117/F-1)**
1. iPad quer, hell; in Safari den Link des Katalogs öffnen, ganz neu laden; in der Seitenleiste unter ‚Aktionen und Menüs‘ ‚Hervorgehobene Quelle‘ antippen.
2. Unter ‚Ausprobieren‘ den Knopf ‚…‘ rechts neben ‚Zweiter Knopf‘ ansehen.
3. Erwartet: ‚…‘ ist ein Kreis (gleich breit wie hoch), nicht oval. Automatisch geprüft in `bean-katalog` (Grundregeln, R-3.1).

**P-118/2 – Katalog: Knöpfe lange drücken markiert keinen Text (P-117/F-2)**
1. iPad quer, hell; Katalog wie in P-118/1, Seite ‚Hervorgehobene Quelle‘.
2. ‚Erster Knopf‘ etwa 2 s lange drücken und loslassen, dann ebenso ‚Zweiter Knopf‘.
3. Erwartet: kein Text wird markiert, keine Lupe, kein Menü ‚Kopieren‘. Automatisch geprüft in `bean-katalog` (APD-140/Z-6) und `hig` (R-3.6).

**P-118/3 – Katalog: Kachel der Wischaktionen lange drücken (P-117/F-2)**
1. iPad quer, hell; Katalog, in der Seitenleiste unter ‚Aktionen und Menüs‘ ‚Wischaktionen‘ antippen.
2. Unter ‚Ausprobieren‘ die Kachel ‚Erster Eintrag: Rom, Florenz, Siena und Lucca‘ lange drücken, dann daneben tippen.
3. Erwartet: das Kontextmenü mit ‚Einstellungen‘ und rot ‚‚Erster Eintrag: Rom, Florenz, Siena und Lucca‘ löschen‘ erscheint; weder die Kachel noch die Seite wird
   markiert; nach dem Tippen daneben ist das Menü zu. Automatisch geprüft in `bean-katalog` (APD-140/Z-6).

**P-118/4 – App: ‚Backup erstellen‘ lange drücken (P-117/F-2)**
1. iPad quer, hell; in der App unten in der Seitenleiste die Backup-Kachel mit dem Knopf ‚Backup erstellen‘ (falls sichtbar; sonst iPhone, Startliste unten).
2. Auf ‚Backup erstellen‘ den Finger etwa 2 s liegen lassen, dann seitlich mehr als einen Fingerbreit wegziehen und loslassen.
3. Erwartet: kein Text wird markiert, keine Lupe; es wird kein Backup erstellt. Automatisch geprüft in `hig` (R-3.6).

**P-118/5 – App: Knöpfe der Sprechblase lange drücken (P-117/F-2)**
1. iPad quer, hell; mindestens zwei Reiselogbücher; in der Seitenleiste eine Kachel nach links wischen, die rote Kapsel ‚Löschen‘ antippen.
2. In der Sprechblase auf ‚Abbrechen‘ den Finger etwa 2 s liegen lassen, seitlich wegziehen und loslassen; danach ‚Abbrechen‘ kurz antippen.
3. Erwartet: beim Halten wird kein Text markiert, keine Lupe; nach dem Antippen von ‚Abbrechen‘ ist die Sprechblase zu, nichts ist gelöscht. Automatisch geprüft
   in `hig` (R-3.6, Ansicht ‚Sprechblase Löschen‘).
