# APD-61 Teil 2 ‚Blatt‘ (APD-38/T-15) – Apple-Abgleich, Varianten, Testfall-Liste

**Stand 23.10.2026** · Sitzung ‚Reiselogbuch 0033‘ · Muster: `arbeit/APD-61 Teil 2 Muster.html`
(https://g811141a.github.io/AppDesign/arbeit/APD-61%20Teil%202%20Muster.html), Prüfung `arbeit/APD-61 Teil 2 Muster prüfen.mjs`
(Chromium und WebKit: iPhone hoch, iPhone quer, iPad hoch – grün)

**Entschieden (Nutzer 23.10.2026):** auf dem iPhone werden **alle Fenster außer Meldungen** ein Blatt (Erfassen, Bearbeiten,
Vorschau); **am iPad** bleibt das Fenster in der Mitte und schließt wie heute nur mit x, Häkchen oder Escape; Muster mit Variante
**A** (nur groß) und **B** (mittel und groß mit Griff), zuerst hell und iPhone hoch (abweichend von 0 Nr. 6 ‚zuerst quer‘, weil
die Stufen nur hoch zu sehen sind).

## 1. Heute (7, 15.17, R-4.4, R-4.5)

- iPhone: jedes Fenster füllt den ganzen Bildschirm, ohne runde Ecken; Schließen nur mit x, Häkchen oder Escape.
- x mit Änderungen fragt ‚Änderungen verwerfen‘ / ‚Weiter bearbeiten‘ (Sprechblase am x).
- Meldungen sind kleine Fenster in der Mitte.

## 2. Apple-Abgleich (iOS 26)

| Was | So macht es Apple | Für uns |
|---|---|---|
| Form | Blatt von unten mit runden Ecken; ‚groß‘ fast bildschirmhoch und deckend, die Seite dahinter weicht leicht verkleinert und abgedunkelt zurück (‚Neuer Termin‘, ‚Neuer Kontakt‘) | A und B (groß) |
| Stufen | ‚mittel‘ schwebt als Glas mit Abstand zum Rand, Griff oben zeigt, dass man die Höhe ziehen kann (Karten, Teilen); Rollen im Inhalt bzw. ein Feld vergrößert auf ‚groß‘ | nur B |
| Schließen | nach unten ziehen – am Kopf oder im Inhalt, wenn er ganz oben steht; schnelles Wischen genügt; Antippen der Abdunkelung | A und B |
| Ungesichert | das Blatt lässt sich nicht wegziehen, federt zurück und fragt ‚Änderungen verwerfen‘ | A und B – Sprechblase am x (R-4.3, R-4.4) statt Systemabfrage unten |
| iPhone quer | immer volle Höhe, keine Stufen, die Seite weicht nicht zurück | A und B |
| iPad | Formblatt in der Mitte | bleibt wie heute (Entscheidung) |

Quellen: [HIG – Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets);
Entwicklerberichte zu ‚mittel‘ als Glas: [Apple-Entwicklerforum](https://developer.apple.com/forums/thread/794998),
[TrueSheet – Liquid Glass](https://sheet.lodev09.com/guides/liquid-glass).
**Abweichung:** die Rückfrage kommt als Sprechblase am x (R-4.3: keine Systemfenster), nicht als Abfrage am unteren Rand.

## 3. Varianten im Muster (oben umschalten: Heute · A · B)

| | Öffnet | Höhen | Seite dahinter | Vorteil | Nachteil |
|---|---|---|---|---|---|
| **Heute** | bildschirmfüllend | eine | bleibt | bekannt | wirkt nicht wie iOS, kein Wischen |
| **A** | groß, gleitet von unten | eine (groß) | weicht verkleinert zurück | wie ‚Neuer Termin‘; einfach, viel Platz für Felder und Tastatur | Inhalt dahinter nicht zu sehen |
| **B** | mittel (halb hoch, Glas) | mittel und groß, Griff | erst ab groß | Inhalt dahinter halb sichtbar; wie Karten | ein Schritt mehr bis zur Tastatur; Glas schlechter lesbar |

Gemeinsam: Ziehen am Kopf und Griff immer, im Inhalt nur nach unten, wenn er ganz oben steht (sonst rollt er); entschieden nach
8 px, deutlich senkrecht (1,2 × so weit wie waagerecht); waagerecht rollende Bereiche (Vorschau) behalten ihr Rollen. Beim
Loslassen gilt die nächste Stufe zu dem Punkt, an dem das Blatt mit dem Tempo auslaufen würde (wie iOS) – weit oder schnell
nach unten schließt, ein Stück federt zurück. Über ‚groß‘ hinaus Gummiband. ‚Bewegung reduzieren‘: Überblenden statt Gleiten,
das Ziehen folgt weiter dem Finger. Je Bild nur `transform` und `opacity` (Web-Animation, APD-59).

## 4. Testfall-Liste (wird beim Bau `checkSheet` in ablauf.mjs)

| Nr. | Fall | Erwartung | Muster-Prüfung |
|---|---|---|---|
| B1 | iPhone hoch: Erfassen, Bearbeiten, Vorschau öffnen | A: groß, gleitet von unten, Seite weicht zurück · B: mittel | ja |
| B2 | Am Kopf ein Stück ziehen, langsam loslassen | folgt dem Finger, federt zurück | ja |
| B3 | Am Kopf weit nach unten ziehen | schließt, Seite wieder normal | ja |
| B4 | Kurz und schnell nach unten wischen | schließt | ja |
| B5 | Im Inhalt nach unten, Inhalt gerollt | Inhalt rollt, Blatt bleibt | ja |
| B6 | Im Inhalt nach unten, Inhalt ganz oben | schließt | ja |
| B7 | Waagerecht ziehen (auch in der Vorschau) | Blatt bleibt | ja |
| B8 | Bearbeiten mit Änderung: weit nach unten ziehen | zäh, federt zurück, Sprechblase ‚Änderungen verwerfen‘ / ‚Weiter bearbeiten‘ | ja |
| B9 | Bearbeiten mit Änderung: x | Sprechblase; ‚Änderungen verwerfen‘ schließt, ‚Weiter bearbeiten‘ bleibt | ja |
| B10 | Erfassen mit Änderung: ziehen (auch auf einem Feld bei offener Tastatur) | wie B8: Tastatur zu, federt zurück, Sprechblase – automatisch gespeichert wird trotzdem, ‚Änderungen verwerfen‘ stellt den Zustand beim Öffnen her (R-4.4, G-7) | ja (Safari-Modell) |
| B11 | Abdunkelung oben antippen | wie x | ja |
| B12 | Escape | wie x | ja |
| B13 | B: am Griff nach oben | groß, Seite weicht zurück | ja |
| B14 | B: von groß bis zur Mitte | mittel | ja |
| B15 | B: in mittel ein Feld antippen | groß (Platz für die Tastatur) | ja |
| B16 | B: aus mittel nach unten | schließt | ja |
| B17 | iPhone quer | volle Höhe, keine Stufen, Seite bleibt; Ziehen wie B2–B12 | ja |
| B18 | iPad hoch und quer | Fenster in der Mitte, Wischen schließt nicht, x schließt | ja (hoch) |
| B19 | Tastatur offen, nach unten ziehen – am Kopf, auf einem Feld, im gerollten Inhalt | Tastatur zu; am Kopf bzw. Inhalt ganz oben auch das Blatt (bzw. Rückfrage), im gerollten Inhalt rollt er weiter | ja (Safari-Modell), Gerät |
| B20 | Feld unten antippen (Reisemittel), hoch und quer, A und B | Blatt endet über der Tastatur, Kopf bleibt sichtbar, Feld über der Tastatur (R-4.5); B springt auf groß | ja (Safari-Modell mit Sicherheitsabständen), Gerät |
| B21 | Drehen mit offenem Blatt | bleibt offen in der passenden Form (quer immer groß) | beim Bau |
| B22 | ‚Bewegung reduzieren‘ | Überblenden, Ziehen folgt dem Finger | beim Bau |
| B23 | Liste dahinter (R-7.3) | steht still, nach dem Schließen an derselben Stelle | beim Bau (`checkListStill`) |
| B24 | Dunkel | Blatt `--dlg-bg`, Glas dunkel | erst nach ‚hell passt‘ (0 Nr. 6) |

**Nur am Gerät (Testfälle):** Wischgefühl, Glas und Lesbarkeit von ‚mittel‘, Tastatur (B19, B20), Rollen im Inhalt gegen Ziehen
(Safari entscheidet selbst, `touchmove` wird verhindert, sobald das Blatt gezogen wird – 13).

## 5. Rückmeldung am Gerät (Nutzer 23.10.2026) und Korrektur des Musters

- **A: alles ok bis auf 6;** B 7.6 und quer 8.6 ebenso: Reisemittel antippen – nach dem Aufgehen der Tastatur war das Feld nicht
  mehr zu sehen; nach unten ziehen schloss die Tastatur nicht.
- **Ursache:** Safari verschob den sichtbaren Bereich zum Feld (13 S-1), das Blatt folgte dem Bereich (`offsetTop`) – das Feld lag
  wieder unter der Tastatur. Ein Zug, der auf einem Feld begann, zählte nicht; ein Zug im gerollten Inhalt schloss die Tastatur
  nicht.
- **Warum die Prüfung es übersah:** sie lief ohne Tastatur (kein Safari-Modell) und ohne die Sicherheitsabstände des iPhones –
  ohne sie lag Reisemittel zufällig knapp über der Tastatur.
- **Nachgebaut:** Prüfung mit `safariModell` (Tastatur auf, S-1 bis S-9) und Sicherheitsabständen; rot gegen das erste Muster
  (Feld 445–469, sichtbar bis 441, Safari verschob um 237 px).
- **Behoben:** das Blatt ist ein `<dialog>` mit `showModal` wie in der App (Safari rollt Felder im Fenster nicht zurück, S-9);
  beim Fokus rollt es das Feld in die obere Hälfte und gibt ihm einen neuen Fokus (S-8, wie ui.js), B springt dabei auf groß;
  ein Zug nach unten schließt die Tastatur, auch auf einem Feld; iPhone quer mit niedrigem Fensterkopf (R-2.4).
- **7.1 und 7.2 (B):** halb hoch öffnen, beim Feld ganz nach oben und auf halbe Höhe zurückfedern ist das vorgesehene Verhalten von B.

## 6. Rückmeldung 2 am Gerät (Nutzer 23.10.2026, Sitzung 0034) und Nachbesserung

- **A: alles ok bis auf 3;** **B: alles ok.** **Gewählt: A** (Empfehlung Claude), nach der Nachbesserung.
- **A 3 nicht ok:** ‚Tag erfassen‘, etwas ändern, auf einem Feld nach unten ziehen – Tastatur und Blatt gingen zu, ohne die Rückfrage
  ‚Änderungen verwerfen‘.
- **Ursache:** Das Muster schützte nur ‚Reiselogbuch bearbeiten‘ (B10 nahm an, Erfassen schließe wegen des automatischen Speicherns
  sofort). In der App fragt x aber auch beim Erfassen (R-4.4, G-7: ‚Änderungen verwerfen‘ stellt den Zustand beim Öffnen her) – Ziehen
  muss sich wie x verhalten. So macht es Apple: ‚Neuer Termin‘ mit Änderung federt beim Ziehen zurück und fragt.
- **Warum die Prüfung es übersah:** sie prüfte Ziehen mit Änderung nur in ‚Bearbeiten‘ und übernahm B10 ungeprüft aus der Annahme.
- **Nachgebaut:** Prüfung ‚Tastatur Erfassen mit Änderung‘ (Feld antippen, tippen, auf dem Feld nach unten ziehen; dann x) – rot
  gegen das Muster von 0033 (A, B, hoch und quer, Chromium und WebKit), grün jetzt.
- **Behoben:** jedes Fenster mit Änderungen seit dem Öffnen ist geschützt (nur die Vorschau nicht) – Ziehen federt zurück und fragt.
- **Dieselbe Lücke anderswo:** beim Bau muss `checkSheet` B8 bis B10 für jedes Fenster mit Eingaben prüfen (Erfassen, Bearbeiten,
  Neues Reiselogbuch …), nicht nur für eines.
