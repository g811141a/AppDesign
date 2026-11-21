# P-117 – Rückmeldung und Korrektur

**Stand 21.11.2026** · Sitzung 0147 · Reiselogbuch 3.57.10 · AppDesign 4.67.0

## Bericht

Deine Rückmeldung: /0, /2, /3, /5, /6 und /7 sind ok, **/1 und /4 nicht ok**. Beide Abläufe habe ich nach 0 Nr. 1 als feste Prüfung nachgebaut. Beide sind
**rot gegen den veröffentlichten Stand 4.67.0** (Katalog in Chromium: 24 Fehler, genau deine zwei Befunde in allen 4 Ansichten). Mit der Korrektur waren sie
**zur Probe grün in Chromium und WebKit**. Die Probe ist zurückgenommen, gebaut wird erst nach deinem Ja.
Dieselbe Lücke steckt auch in der **App**: 7 Schaltflächen-Arten, zum Beispiel ‚Backup erstellen‘ oder ‚Abbrechen‘ und ‚Reiselogbuch löschen‘ in der Sprechblase.

## Befunde

| Nr. | Befund | Ursache | Warum die Prüfung es übersah |
|---|---|---|---|
| **P-117/F-1** (aus /1) | Mehr-Knopf ‚…‘ der Katalogseite ‚Hervorgehobene Quelle‘ oval (50 × 44) | dem Knopf fehlt die Klasse `.round`, er hat die Kapselform der Grundschaltfläche | `hig.mjs` (R-3.1) prüfte nur Knöpfe, die schon `border-radius: 50%` haben, und seit P-115/F-1 nur die ‚Kapsel mit einer Schaltfläche‘ – ein einzelner Icon-Knopf in Kapselform fiel durch |
| **P-117/F-2** (aus /1 und /4) | langes Drücken markiert den Text von ‚Erster Knopf‘ und ‚Zweiter Knopf‘; beim Kontextmenü einer Kachel der Wischaktionen markiert Safari die ganze Seite | Schaltflächen und die Kacheln des Katalogs (`button`) haben kein `user-select: none`; nur Seitenleiste, Zeilen, Leisten und Smiley-Leiste haben es | `checkBeruehren` (R-3.6) prüft nur ausgewählte Zeilen der App; im Katalog gab es keine Prüfung auf Textauswahl, und R-3.6 nennt Schaltflächen allgemein nicht |

## Frage ‚Schaltflächen grundsätzlich rund verankern‘

Das ist schon verankert:
- **R-3.1:** ‚reine Icon-Schaltflächen quadratisch; **rund ist ein Kreis**‘
- Designrichtlinie 3 und 4: ‚Icon-Schaltflächen rund‘, Text-Schaltflächen als Kapsel (links und rechts rund, wie Apple)

Die Lücke lag in der **Prüfung**. Die erweiterte Prüfung in `hig.mjs` meldet jetzt jede Icon-Schaltfläche, die für sich allein steht und kein Kreis ist. Sie läuft
in jeder Ansicht der App, der Prüfseite und des Katalogs. Gegen 4.67.0 ist sie rot (`#bkMenu` 50 × 44), in der App grün (keine Fehlalarme). Am Regeltext ändert
sich dafür nichts.

## Vorschlag Korrekturversion (AppDesign 4.67.1 / Reiselogbuch 3.57.11)

1. **P-117/F-1:** `katalog/sourcehighlight.js` – Mehr-Knopf `class="round"`. Dazu die Prüfung `hig.mjs` R-3.1 (Icon-Schaltfläche für sich allein = Kreis).
2. **P-117/F-2:** `v4/design.css` – `button { -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; }`. Das gilt für alle Schaltflächen in
   App, Prüfseite und Katalog (so macht es Apple: die Beschriftung einer Schaltfläche lässt sich nie auswählen). Dazu die Prüfungen `hig.mjs` R-3.6
   (jede Schaltfläche, jede Ansicht) und `katalog.mjs` APD-140/Z-6 (jede Schaltfläche und Kachel unter ‚Ausprobieren‘, Safari-Modell `safariHalten`).
3. AD-Bean: keine – `button` ist Grundstil von design.css, kein Baustein.

## Regel R-3.6 – Wortlaut (0 Nr. 29, Ja/Nein)

Geändert wird nur der letzte Satzteil und die Spalte ‚Prüfung‘.

**Alt:** … gesperrte Schaltflächen zeigen nichts; Safaris eigene Antipp-Markierung ist aus, und langes Drücken auf antippbare Zeilen, Kacheln, Leisten und die
Smiley-Leiste markiert keinen Text und zeigt keine Lupe | ablauf.mjs – `checkBeruehren` |

**Neu:** … gesperrte Schaltflächen zeigen nichts; Safaris eigene Antipp-Markierung ist aus, und langes Drücken auf **Schaltflächen,** antippbare Zeilen, Kacheln,
Leisten und die Smiley-Leiste markiert keinen Text und zeigt keine Lupe | ablauf.mjs – `checkBeruehren`**; hig.mjs – jede Schaltfläche in jeder Ansicht;
katalog.mjs – APD-140/Z-6** |

## Belege (Läufe dieser Sitzung)

- Katalog gegen 4.67.0 (Chromium): R-3.1 `#bkMenu` 50 × 44 und R-3.6 APD-140/Z-6 auf ‚Erster Knopf‘, ‚Zweiter Knopf‘, Mehr-Knopf und allen drei Kacheln der
  Wischaktionen, alle 4 Ansichten, rot.
- Katalog mit Korrektur zur Probe: Chromium und WebKit ‚alles in Ordnung‘.
- App-HIG (Chromium, hell) mit der neuen R-3.1-Prüfung: keine Abweichungen. Mit der neuen R-3.6-Prüfung: 7 Abweichungen (`#hintBackup`, ‚Abgleichen‘,
  ‚Ersetzen‘, ‚Abbrechen‘, ‚Abgleichbericht anzeigen‘, `#fazit`, ‚Reiselogbuch löschen‘).

## Backlog

- AppDesign ‚0. Nächste Version‘: P-117/F-1 bereit; ‚2. In Klärung‘: P-117/F-2 (wartet auf das Ja zum Wortlaut R-3.6).
- Reiselogbuch: Usertest P-117 mit der Rückmeldung eingetragen (bleibt ‚prüfen‘).

---

## Entscheidung und Bau-Frage (21.11.2026)

- **Wortlaut R-3.6:** freigegeben (Ja im Fenster).
- **Backlog AppDesign ‚0. Nächste Version‘:** 2 Punkte bereit – P-117/F-1 (Mehr-Knopf rund) und P-117/F-2 (Schaltflächen ohne Textauswahl).
- **Bau-Frage:** AppDesign **4.67.1** / Reiselogbuch **3.57.11** mit P-117/F-1 und P-117/F-2, Prüflauf **Stufe voll** (`v4/design.css` und die Prüfungen
  ändern sich, also nicht nur Texte; voll ~75 min). Die App wird dabei auf die Fassung 4.67.1 gehoben. Nach dem Bau kommt ein neuer Usertest (P-118) mit /1 und /4
  und den App-Schaltflächen.

---

## Offener Usertest: Usertest P-117 – Reiselogbuch 3.57.10 · AppDesign 4.67.0

Offen ist nur dieser Usertest. Testfälle wörtlich aus dem CHANGELOG des Reiselogbuchs 3.57.10.

Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der **App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.
Link des Katalogs (in Safari): https://g811141a.github.io/AppDesign/katalog/index.html

**P-117/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.10 · erstellt am … · AppDesign 4.67.0‘. Automatisch geprüft in `version-regeln`.

**P-117/1 – Katalog ‚Hervorgehobene Quelle‘ am iPad (APD-136 sourcehighlight)**
1. iPad quer, hell; in Safari den Link des Katalogs öffnen, ganz neu laden.
2. In der Seitenleiste unter ‚Aktionen und Menüs‘ ‚Hervorgehobene Quelle‘ antippen; unter ‚Ausprobieren‘ nacheinander ‚Fenster-Quelle: erster Knopf‘, ‚Fenster-Quelle:
   zweiter Knopf‘, ‚Fenster-Quelle frei‘ antippen.
3. Erwartet: zuerst ist ‚Erster Knopf‘ blau getönt, dann nur ‚Zweiter Knopf‘, zuletzt keiner; unter ‚Ereignisse‘ steht oben ‚change · frei · #bkQ2‘. Automatisch
   geprüft in `bausteine-pruefseite` (Teil `fenster`, APD-136/S-9) und `bean-katalog`.

**P-117/2 – Gehaltene Quelle bleibt nach dem Neuaufbau blau (APD-136 sourcehighlight)**
1. iPad quer, hell; Katalog wie in P-117/1, Seite ‚Hervorgehobene Quelle‘.
2. ‚Ersten Knopf halten‘ antippen, dann ‚Knöpfe neu aufbauen (refresh)‘, dann ‚Ersten Knopf freigeben‘.
3. Erwartet: nach ‚halten‘ und nach dem Neuaufbau ist ‚Erster Knopf‘ blau, unter ‚Ereignisse‘ ‚Neu aufgebaut · gehalten: 1‘; nach ‚freigeben‘ ist er nicht mehr blau,
   oben ‚change · frei · #bkQ1‘. Automatisch geprüft in `bausteine-pruefseite` (Teil `fenster`, APD-136/S-10).

**P-117/3 – Mehr-Knopf blau, solange das Menü offen ist (APD-136 sourcehighlight)**
1. iPhone hoch, hell; in der App in der Startliste oben auf ‚…‘ (Mehr) tippen.
2. Das Menü ansehen, dann daneben tippen.
3. Erwartet: solange das Menü offen ist, ist ‚…‘ blau hinterlegt und zeigt drei senkrechte Punkte; nach dem Schließen ist ‚…‘ wieder grau mit waagrechten Punkten.
   Automatisch geprüft in `bausteine-pruefseite` (Teil `menue`, APD-136/S-6, APD-135/Q-2).

**P-117/4 – Wischaktionen unverändert (APD-136 Namen)**
1. iPad quer, hell; mindestens zwei Reiselogbücher; in der Seitenleiste eine Kachel langsam nach links wischen.
2. Die rote Kapsel ‚Löschen‘ antippen, dann in der Sprechblase ‚Abbrechen‘.
3. Erwartet: rechts neben der Kachel zwei Kapseln mit den Wörtern ‚Einstellen‘ und ‚Löschen‘ darunter (‚Löschen‘ rot, außen); die Sprechblase wächst aus der roten
   Kapsel mit ‚‚<Titel>‘ mit allen Einträgen löschen? Das kann nicht rückgängig gemacht werden. Tipp: Vorher ein Backup erstellen.‘ und den Knöpfen ‚Reiselogbuch
   löschen‘ und ‚Abbrechen‘; nach ‚Abbrechen‘ gleitet die Kachel zurück, nichts ist gelöscht. Automatisch geprüft in `ablauf-wischen`.

**P-117/5 – Hinweisfenster unverändert (APD-136 Namen)**
1. iPad quer, hell; Katalog, Seite ‚Hinweisfenster‘.
2. Unter ‚Ausprobieren‘ ‚Langer Dateiname‘ antippen, dann das x.
3. Erwartet: Fenster ‚Backup‘ mit ‚Das Backup wurde in Dateien gesichert:‘ und darunter fett in einer Zeile ‚Ω Backup Reiselogbuch 2026.11.19 20.41.json‘; unter
   ‚Ereignisse‘ nach dem x oben ‚close‘. Automatisch geprüft in `bean-katalog` und `backup-regeln` (Breite nach Dateiname).

**P-117/6 – iPhone quer: Liste bleibt beim Kontextmenü stehen (APD-143)**
1. iPhone quer, hell; in der App mindestens zwei Reiselogbücher, Startliste ganz oben.
2. Die untere sichtbare Kachel lange drücken, dann daneben tippen.
3. Erwartet: die Liste bewegt sich nicht; das Menü mit ‚Reiselogbuch einstellen‘ und rot ‚Reiselogbuch löschen‘ steht linksbündig über der Kachel (passt es darunter,
   darunter); beim Schließen schrumpft es zur Kachel, nichts springt. Automatisch geprüft in `bausteine-pruefseite` (Teil `menue`, APD-143/L-1, L-2) und
   `kontextmenue-regeln`.

**P-117/7 – iPhone hoch: unterste Kachel (APD-143)**
1. iPhone hoch, hell; in der App so viele Reiselogbücher, dass die Startliste rollt; ganz nach unten rollen.
2. Die unterste Kachel (über der Backup-Kachel bzw. der Offline-Zeile) lange drücken, dann daneben tippen.
3. Erwartet: das Menü mit ‚Reiselogbuch einstellen‘ und ‚Reiselogbuch löschen‘ steht über der Kachel, ganz über der Backup-Kachel; die Liste bleibt stehen, auch beim
   Schließen. Automatisch geprüft in `ablauf-seitenleiste-position` (APD-143/L-9) und `kontextmenue-regeln` (Fall ‚ende‘, APD-143/L-4).
