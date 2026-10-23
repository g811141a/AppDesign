# A-61 Teil 2 ‚Blatt‘ (T-15) – Apple-Abgleich, Varianten, Fall-Liste

**Stand 23.10.2026** · Sitzung ‚Reiselogbuch 0033‘ · Muster: `arbeit/A-61 Teil 2 Muster.html`
(https://g811141a.github.io/AppDesign/arbeit/A-61%20Teil%202%20Muster.html), Prüfung `arbeit/A-61 Teil 2 Muster prüfen.mjs`
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
das Ziehen folgt weiter dem Finger. Je Bild nur `transform` und `opacity` (Web-Animation, A-59).

## 4. Fall-Liste (wird beim Bau `checkSheet` in ablauf.mjs)

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
| B10 | Erfassen mit Änderung: ziehen | schließt (automatisch gespeichert) | ja (B3/B6) |
| B11 | Abdunkelung oben antippen | wie x | ja |
| B12 | Escape | wie x | ja |
| B13 | B: am Griff nach oben | groß, Seite weicht zurück | ja |
| B14 | B: von groß bis zur Mitte | mittel | ja |
| B15 | B: in mittel ein Feld antippen | groß (Platz für die Tastatur) | ja |
| B16 | B: aus mittel nach unten | schließt | ja |
| B17 | iPhone quer | volle Höhe, keine Stufen, Seite bleibt; Ziehen wie B2–B12 | ja |
| B18 | iPad hoch und quer | Fenster in der Mitte, Wischen schließt nicht, x schließt | ja (hoch) |
| B19 | Tastatur offen, nach unten ziehen | Tastatur zu und Blatt zu (bzw. Rückfrage) | Gerät |
| B20 | Tastatur offen | Blatt endet über der Tastatur, Kopf bleibt sichtbar, Feld über der Tastatur (R-4.5) | Gerät, beim Bau `checkKeyboard` |
| B21 | Drehen mit offenem Blatt | bleibt offen in der passenden Form (quer immer groß) | beim Bau |
| B22 | ‚Bewegung reduzieren‘ | Überblenden, Ziehen folgt dem Finger | beim Bau |
| B23 | Liste dahinter (R-7.3) | steht still, nach dem Schließen an derselben Stelle | beim Bau (`checkListStill`) |
| B24 | Dunkel | Blatt `--dlg-bg`, Glas dunkel | erst nach ‚hell passt‘ (0 Nr. 6) |

**Nur am Gerät (Prüfliste):** Wischgefühl, Glas und Lesbarkeit von ‚mittel‘, Tastatur (B19, B20), Rollen im Inhalt gegen Ziehen
(Safari entscheidet selbst, `touchmove` wird verhindert, sobald das Blatt gezogen wird – 13).
