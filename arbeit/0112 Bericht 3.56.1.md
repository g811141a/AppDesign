# Bericht – Reiselogbuch 3.56.1 mit AppDesign 4.59.1

**14.11.2026 · Sitzung 0112** · Prüfstufe voll · veröffentlicht: AppDesign `7dffc70`, Reiselogbuch `f5be8d2`, beide Pages-Läufe ‚success‘

## Bericht

Am iPhone rutschte die App vom Home-Bildschirm nach hoch → quer → hoch um etwa 1 cm nach unten, und Antippen traf daneben. Die Messung zeigt die
Ursache: Safari lässt die Seite danach um die Statusleiste (62 px) verschoben, obwohl keine Tastatur offen ist. `ui.js` hielt das für die Tastatur
und schob die App mit. Jetzt setzt `ui.js` die Seite ohne Tastatur und ohne Feld mit Fokus auf 0 zurück. Bei offener Tastatur bleibt alles wie bisher.
Der Fehler ist **in der Nachbildung behoben, am Gerät noch zu bestätigen** (0 Nr. 20). Alle 156 Prüfläufe in Chromium und WebKit sind grün.

## Alle Änderungen

- **AppDesign 4.59.1, `ui.js` (`placeDialogs`):** Ohne Tastatur und ohne Feld mit Fokus setzt `ui.js` die Seite auf 0 zurück (`scrollTo(0, 0)`), mit
  Rollbereich immer, ohne Rollbereich (iPhone-Startliste), wenn die Seite nicht rollen kann. – entspricht HIG (Inhalt bleibt im sicheren Bereich,
  Antippflächen liegen dort, wo die Knöpfe zu sehen sind)
- **Safari-Modell (`tests/safari.mjs`):** neu `drehRest` (Verschiebung um die Statusleiste nach dem Drehen, Antippen trifft daneben) und
  `safariDrehenHoch` (quer → hoch wie gemessen: kurz 874, dann 812, danach um 62 px verschoben).
- **Neue Prüfung `ablauf-drehen-iphone`** (Reiselogbuch, APD-129/M-1 bis M-6): Startliste, zweimal gedreht, Drehen ohne Verschiebung, Reiselogbuch
  gerollt, Blatt offen, Tastatur offen. Gegen 4.59.0 rot (je 6 Fehler in Chromium und WebKit), mit der Korrektur grün.
- **Designrichtlinie allgemein 13:** neuer Punkt ‚Verschiebung nach dem Drehen (iPhone, Home-Bildschirm)‘ mit Quelle (Wortlaut von dir bestätigt).
- **Texte:** CHANGELOG 4.59.1 und 3.56.1 mit Testfällen P-104, beide Backlogs (APD-129 und P-103 erledigt, P-104 offen), `tests/README.md`, `alle.mjs`.

## Warum die Prüfung den Fehler übersah

Das Safari-Modell drehte das iPhone direkt von hoch auf quer und zurück. Die kurze Höhe 874 und die zurückbleibende Verschiebung um die
Statusleiste fehlten darin. Jetzt bildet das Modell beides wie gemessen nach.

## Apple-Review

- HIG-Prüfskript `hig` (hell, dunkel, Bedienungshilfen, Text 14 bis 53) in Chromium und WebKit: **grün** – entspricht HIG.
- Regel-Prüfskripte `regeln-ablauf`, `text-regeln`, `kontextmenue-regeln` (iPhone, iPad), `doku-regeln`, `version-regeln`: **grün**.
- Ein Lauf wackelt: `ablauf-seitenleiste-position` (Text 53) in WebKit war unter Last rot und allein grün. Das gehört zu APD-85 Teil 6, der schon
  bekannt ist.

**Bitte die App auf iPhone und iPad ganz schließen und neu öffnen**, damit die neue Version geladen wird.

## Usertest P-104 (offen)

Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der **App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.

**P-104/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.56.1 · erstellt am … · AppDesign 4.59.1‘.

**P-104/1 – Startliste drehen (iPhone)**
1. iPhone hoch, hell: die Startliste ‚Reiselogbücher‘ ansehen.
2. Auf quer drehen, kurz warten, wieder auf hoch drehen.
3. Erwartet: die Startliste steht wie vorher direkt unter der Statusleiste; ‚…‘ (Mehr) öffnet beim ersten Tippen das Menü.

**P-104/2 – Reiselogbuch drehen (iPhone)**
1. iPhone hoch, hell: ein Reiselogbuch öffnen und etwas nach unten rollen.
2. Auf quer drehen, kurz warten, wieder auf hoch drehen.
3. Erwartet: die Kopfzeile steht direkt unter der Statusleiste, oben steht derselbe Tag wie vorher; der Zurück-Knopf (chevron-left) reagiert beim ersten Tippen.

**P-104/3 – Blatt drehen (iPhone)**
1. iPhone hoch, hell: im Reiselogbuch einen Tag antippen (das Blatt öffnet sich), nicht in ein Feld tippen.
2. Auf quer drehen, kurz warten, wieder auf hoch drehen.
3. Erwartet: das Blatt beginnt wie vorher knapp unter der Statusleiste; x schließt es beim ersten Tippen.

**P-104/4 – Tastatur wie bisher (iPhone)**
1. iPhone hoch, hell: einen Tag antippen und im Blatt in das Feld ‚Verlauf‘ tippen.
2. Ein paar Wörter schreiben, dann auf eine freie Stelle im Blatt tippen (die Tastatur geht zu).
3. Erwartet: das Feld bleibt beim Schreiben über der Tastatur sichtbar; nach dem Schließen der Tastatur springt nichts.

Weitere offene Usertests: keine.

Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.

**Backlog-Erinnerung:** montags 8:58 (AppDesign und Reiselogbuch).

## Übergabe

Diese Sitzung ist einmal zusammengefasst worden. Deshalb übergebe ich jetzt ohne Rückfrage (0 Nr. 13). Die Rückmeldung zu P-104 erfragt die neue Sitzung
**Reiselogbuch 0113 – Usertest P-104**.
