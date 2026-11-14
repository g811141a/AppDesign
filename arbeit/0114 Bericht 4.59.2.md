# Bericht – AppDesign 4.59.2 mit Reiselogbuch 3.56.2

**14.11.2026 · Sitzung Reiselogbuch 0114** · veröffentlicht: AppDesign `7968cf3`, Reiselogbuch `99b13f0` (beide Pages-Läufe ‚success‘)

## Kurz

Am iPhone in der App vom Home-Bildschirm springt das Bild nach dem Zurückdrehen auf hoch nicht mehr nach oben. Startliste, Reiselogbuch und Blatt
stehen sofort an ihrem Platz, wie am iPad. Der volle Prüflauf war grün: 156 Läufe in Chromium und WebKit, eine Prüfung hat gewackelt (unten).
Dazu vergleicht `messung.mjs` jetzt mit dem Modell, das die Sitzung eingestellt hat. **Bitte die App vor dem Test auf beiden Geräten ganz schließen und
neu öffnen.**

## Alle Änderungen

**AppDesign 4.59.2**
- **Oberer Rand nach dem Drehen (APD-129 Teil 2, Teil A):** `ui.js` setzt `--safe-top` selbst auf 0, aber nur am iPhone vom Home-Bildschirm,
  wenn es hoch steht und das Fenster niedriger als der Bildschirm ist. Safari meldet dort den Rand noch 250–300 ms mit 62 px, das war der Sprung.
  Quer, am iPad und in Safari gilt weiter `env(…)`.
- **Verschiebung im selben Ereignis zurück (Teil B):** `drehRestWeg()` läuft direkt im `resize`, nicht erst später.
- **Nur den eigenen Wert zurücknehmen:** `randOben()` entfernt nur das `--safe-top`, das es selbst gesetzt hat. Im zweiten Prüflauf war `hig`
  (R-1.7) rot, weil der Wert der Prüfung mit entfernt wurde. Behoben, danach war alles grün.
- **Safari-Modell:** `safeOben` bildet den nachhinkenden Rand nach. Beim Drehen ohne Tastatur meldet das Modell die sichtbare Höhe schon im
  `resize` des Fensters, wie am iPhone gemessen (APD-129/M-12).
- **Prüfung `ablauf-drehen-iphone`:** nimmt jedes Bild ab der Meldung auf (APD-129/M-10 bis M-16). Die Gegenprobe APD-129/M-18 ist ohne Teil A rot,
  in Chromium und WebKit.
- **`messung.mjs` (APD-130/W-5):** vergleicht mit dem eingestellten Modell aus der Sitzungsdatei und meldet ‚⚠ Modell …‘ nur bei einem echten
  Rückfall. Der Zusatz `[1m]` zählt dabei nicht. Fünf neue Fälle in `tests/messung.mjs`.
- **Designrichtlinie allgemein 13:** neuer Punkt ‚Oberer Rand nach dem Drehen (iPhone, Home-Bildschirm)‘, Wortlaut APD-129/W-1.
- **Zusammenarbeit allgemein 3.13.1:** Satz zu ‚⚠ Modell …‘ in 2.2.

**Reiselogbuch 3.56.2**
- Lädt AppDesign 4.59.2. CHANGELOG mit Usertest P-105, Backlog, README und PROMPT nachgeführt.

## Apple-Review (HIG)

- **Kein Sprung nach dem Drehen:** entspricht HIG. Nach dem Drehen bleibt der Inhalt an seinem Platz, wie in Notizen oder Erinnerungen
  (R-8.1, R-4.6). Der obere Rand folgt der Statusleiste.
- **HIG- und Regel-Prüfskript:** `hig` grün in allen Varianten: hell, dunkel, Bedienungshilfen, Text 14, 23, 33 und 53, je in Chromium und WebKit.

## Warum die Prüfung den Fehler aus P-104 übersah

Die Prüfumgebung kennt keine sicheren Ränder. `ablauf-drehen-iphone` prüfte nur den Stand nach dem Drehen, nicht die Bilder dazwischen. Jetzt
bildet das Safari-Modell den nachhinkenden Rand nach, und die Prüfung sieht jedes Bild. Auch den roten `hig` im zweiten Lauf hatte in 0113 keine
Prüfung gezeigt: Dort liefen nur die betroffenen Prüfungen, `hig` war nicht dabei.

## Wackler im Prüflauf

`ablauf-seitenleiste-position` in WebKit war unter Last rot und allein grün. Das ist neu und betrifft nicht das Drehen. Ich habe es unter APD-85 Teil 6
im Backlog eingetragen.

## Offene Usertests

**P-104** ist mit dieser Version überholt: /1 bis /3 prüft P-105 neu.

Testfälle P-105 (Schritt für Schritt, Zusammenarbeit allgemein 3.13.1). Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.

**P-105/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.56.2 · erstellt am … · AppDesign 4.59.2‘.

**P-105/1 – Startliste drehen (iPhone)**
1. iPhone hoch, hell: die Startliste ‚Reiselogbücher‘ ansehen.
2. Auf quer drehen, kurz warten, wieder auf hoch drehen und dabei auf den oberen Rand achten.
3. Erwartet: die Startliste steht sofort direkt unter der Statusleiste und springt nicht nach oben (wie am iPad); ‚…‘ (Mehr) öffnet beim ersten Tippen das Menü.

**P-105/2 – Reiselogbuch drehen (iPhone)**
1. iPhone hoch, hell: ein Reiselogbuch öffnen und etwas nach unten rollen.
2. Auf quer drehen, kurz warten, wieder auf hoch drehen und dabei auf die Kopfzeile achten.
3. Erwartet: die Kopfzeile steht sofort direkt unter der Statusleiste und springt nicht nach oben; oben steht derselbe Tag wie vorher; der Zurück-Knopf (chevron-left) reagiert beim ersten Tippen.

**P-105/3 – Blatt drehen (iPhone)**
1. iPhone hoch, hell: im Reiselogbuch einen Tag antippen (das Blatt öffnet sich), nicht in ein Feld tippen.
2. Auf quer drehen, kurz warten, wieder auf hoch drehen und dabei auf den oberen Rand des Blatts achten.
3. Erwartet: das Blatt beginnt sofort knapp unter der Statusleiste und springt nicht nach oben; x schließt es beim ersten Tippen.

**P-105/4 – Tastatur wie bisher (iPhone)**
1. iPhone hoch, hell: einen Tag antippen und im Blatt in das Feld ‚Verlauf‘ tippen.
2. Ein paar Wörter schreiben, dann auf eine freie Stelle im Blatt tippen (die Tastatur geht zu).
3. Erwartet: das Feld bleibt beim Schreiben über der Tastatur sichtbar; nach dem Schließen der Tastatur springt nichts.

**Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.**

## Backlog

Nächste Version AppDesign: 0 Punkte bereit · Reiselogbuch: 0 Punkte bereit · Offen im Backlog: APD-85 Teil 6 (Wackler WebKit) · APD-80 ·
APD-30 · APD-57 · APD-62 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## Übergabe

Diese Sitzung wurde automatisch zusammengefasst, deshalb ist die Übergabe fällig (0 Nr. 13). Die Frage nach deiner Rückmeldung zu P-105 stellt die neue
Sitzung **Reiselogbuch 0115 – Rückmeldung P-105**.
