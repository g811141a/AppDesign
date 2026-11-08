# APD-126 und RLB-123 – Klärung und Wortlaut

**Wortlaut bestätigt: Ja zu APD-126/W-1 bis W-7 (Nutzer 08.11.2026, Sitzung 0098).** Eingetragen wird er mit dem Bau; als Nächstes
kommt das Muster mit der Testfall-Liste.

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0098‘ · Korrektur aus Usertest P-100 (P-100/1) und allgemeine Regel des Nutzers (08.11.2026)

**Entscheidungen bisher (Nutzer 08.11.2026):**
- APD-126 (allgemein) und RLB-123 (Reiselogbuch), beide Prio 1.
- Nach einem Vorschlag geht es klein weiter (R-5.2 wird geändert).
- ‚Sonstiges …‘ kommt wie die anderen Vorschläge ans Ende.

## Apple-Abgleich (0 Nr. 23)

- **Cursor beim Antippen:** In iOS setzt Safari bzw. UIKit den Cursor beim Antippen an die Stelle des Fingers. Dazu gibt es Berichte im
  Apple-Entwicklerforum, aber keine Aussage von Apple selbst. Ein ‚Cursor ans Ende‘ geht dort nur, wenn die App ihn beim Berühren selbst
  setzt. **APD-126/W-2 weicht also bewusst von Apple ab**, weil du es so festlegst. Nur beim zweiten Antippen bleibt es wie bei Apple.
  Quellen: [Forum 734073](https://developer.apple.com/forums/thread/734073), [Forum 102219](https://developer.apple.com/forums/thread/102219).
- **Leer einzeilig, wächst mit:** So arbeitet das Eingabefeld in Nachrichten. Es beginnt einzeilig und wächst, sobald der Text umbricht.
  In SwiftUI ist das ein `TextField` mit senkrechter Achse. **Das entspricht Apple.** Anders als in Nachrichten gibt es bei uns keine
  Höchstzahl an Zeilen, denn man muss nie innerhalb eines Felds rollen (8).
  Quellen: [Hacking with Swift](https://www.hackingwithswift.com/quick-start/swiftui/how-to-make-a-textfield-expand-vertically-as-the-user-types),
  [PHFComposeBarView (Nachbau des Nachrichten-Felds)](https://github.com/splitwise/PHFComposeBarView).
- **HIG-Checkliste (16) und Katalog (17), betroffen:** R-5.2, neu R-5.11, R-4.5, Designrichtlinie 8, 13, 15.11, 15.22.

---

## Wortlaut allgemein (Designrichtlinie allgemein, AppDesign) – 0 Nr. 29

### APD-126/W-1 – Abschnitt 8, Textfelder

**Alt:**
> - Eingabefelder schlicht; Formatierung erst in Anzeige und Ausgabe. **Textfelder wachsen mit dem Inhalt** – man muss nie
>   innerhalb eines Feldes rollen (R-5.2).

**Neu:**
> - Eingabefelder schlicht; Formatierung erst in Anzeige und Ausgabe. **Textfelder sind leer einzeilig und wachsen mit dem Inhalt:**
>   ein leeres Feld ist eine Zeile hoch, auch wenn es mehrere Zeilen zulässt. Jeder Zeilenumbruch, ob mit der Eingabetaste oder automatisch,
>   und jeder eingefügte Text macht es so hoch wie seinen Inhalt; wird Text gelöscht, wird es wieder niedriger. Vorhandener Inhalt ist immer
>   ganz zu sehen. Man muss nie innerhalb eines Felds rollen (R-5.2).

### APD-126/W-2 – Abschnitt 8, neu nach ‚Eingabetaste‘

**Neu:**
> - **Cursor am Ende** (R-5.11): Wird ein Eingabefeld aktiviert (erstes Antippen, Tab, Fokus durch die App), steht der Cursor nach dem
>   letzten Zeichen, egal wohin der Finger tippt. Hat das Feld den Fokus schon, setzt Antippen den Cursor wie gewohnt an die Stelle. Das weicht
>   bewusst von Apple ab, das schon beim ersten Antippen die Stelle des Fingers nimmt. Gilt für alle Text-, Zahlen- und mehrzeiligen Felder,
>   nicht für Datumsfelder. Gebaut in `ui.js` für alle Felder; die App setzt nichts selbst.

**Neu im Katalog (17, Thema 5):**
> | R-5.11 | **Cursor am Ende:** beim Aktivieren eines Felds (Antippen, Tab, Fokus durch die App) steht der Cursor nach dem letzten Zeichen; im
> aktiven Feld setzt Antippen ihn an die Stelle | ablauf.mjs – `checkCursorEnde` (Safari-Modell: Feld mitten im Text antippen, dann
> nochmals antippen) | Antippen am Gerät | 8 |

### APD-126/W-3 – Katalog R-5.2

**Alt:**
> **Texteingabe:** Großbuchstabe am Zeilenanfang und nach einem Vorschlag, nicht nach einer Korrektur von Hand; keine doppelten
> Leerzeichen (Tippen und Einfügen, alle Textfelder); Textfelder wachsen mit; Diktieren nur über die Mikrofon-Taste der Tastatur (kein
> eigener Knopf)

**Neu:**
> **Texteingabe:** Großbuchstabe am Zeilenanfang, nicht nach einer Korrektur von Hand; nach einem Vorschlag klein weiter; keine doppelten
> Leerzeichen (Tippen und Einfügen, alle Textfelder); Textfelder leer einzeilig, wachsen mit; Diktieren nur über die Mikrofon-Taste der
> Tastatur (kein eigener Knopf)

(Spalte Prüfung neu: `checkCapital`, `checkSpaces`, dazu `checkWachsen` für ‚leer einzeilig, wächst und schrumpft‘.)

### APD-126/W-4 – Abschnitt 8, Großbuchstabe am Zeilenanfang (nur der Satz zum Vorschlag)

**Alt:**
> Nach einem Vorschlag (z. B. ‚Freetour …‘) beginnt auch das nächste Wort groß (`capNext`).

**Neu:**
> Nach einem Vorschlag (z. B. ‚Freetour …‘) geht es klein weiter; die Tastatur steht auf Kleinbuchstaben.

### APD-126/W-5 – 15.11 Eingabefeld

**Alt:**
> … Radius 10 px, 44 px hoch (Textfelder mehrzeilig), Schrift mindestens 16 px (R-1.3); … Textfelder wachsen mit dem Inhalt; …

**Neu:**
> … Radius 10 px, 44 px hoch – Textfelder ebenso, solange sie leer sind oder eine Zeile haben, mit jeder weiteren Zeile wachsen sie (8),
> Schrift mindestens 16 px (R-1.3); …

### APD-126/W-6 – R-4.5 und Designrichtlinie 13: Zeile mit dem Cursor

**Alt (13):**
> … mehrzeilig die Zeile mit dem Cursor – beim Antippen die unter dem Finger – und eine halbe Zeile darunter …

**Neu (13):**
> … mehrzeilig die Zeile mit dem Cursor – beim Aktivieren die letzte (R-5.11) – und eine halbe Zeile darunter …

**R-4.5, Spalte Prüfung**, zusätzlich *(aus der Übergabe 0097)*: ‚, Reiselogbuch `ablauf-feld-rollen` (APD-115/M-1 bis M-11)‘.

### APD-126/W-7 – 15.22 Rahmen und Rollbereich *(aus der Übergabe 0097)*

**Alt:**
> … verlängert ui.js ihn um `--platz` (ebenso `.dlg-body::after` im Fenster), damit das Feld in die obere Hälfte rollen kann (13); …

**Neu:**
> … verlängert ui.js ihn um `--platz` (ebenso `.dlg-body::after` im Fenster), damit das Feld so weit wie nötig über die Tastatur rollen
> kann (R-4.5, 13); …

---

## Reiselogbuch – RLB-123 (kein Regeltext, Funktionsbeschreibung `PROMPT.md`, kommt mit dem Bau)

- Die Vorschläge stehen wieder **über** dem Feld, unter der Überschrift ‚2 Verlauf‘.
- Ein angetippter Vorschlag kommt als neue Zeile **nach der letzten Zeile**, auch wenn der Cursor woanders steht. Danach steht der Cursor
  am Ende, die Tastatur ist offen und auf Kleinbuchstaben.
- ‚Sonstiges …‘ fügt am Ende eine leere Zeile an und setzt den Cursor hinein. Ist die letzte Zeile schon leer, kommt keine zweite dazu.
  Damit entfällt RLB-94 ‚leere erste Zeile oben‘.
- Das Feld ist leer einzeilig und wächst mit jeder Zeile (APD-126/W-1); es rollt nur so weit wie nötig über die Tastatur (R-4.5).

## Nächster Schritt nach deinem Ja

Muster hell, iPad quer (0 Nr. 6, 23) mit Testfall-Liste (0 Nr. 1), dann ‚0. Nächste Version‘. Parallel dazu APD-127: zuerst eine Messung
am Gerät (0 Nr. 20).

---

## Muster (nur hell, Vereinbarung 30.10.2026)

`arbeit/APD-126/index.html`. Die Seite lädt `design.css` der Fassung 4.56.0 und dazu nur ‚leer einzeilig‘ (APD-126/W-5); `ui.js` entsteht mit
`arbeit/APD-126 Muster bauen.mjs` aus der Fassung 4.56.0 (APD-126/W-1 wachsen und schrumpfen, APD-126/W-2 Cursor am Ende). Die Felder: Titel, Ort,
Gegangene Kilometer, Verlauf mit den Vorschlägen darüber, ‚Wie war was?‘ (leer), Fazit (lang). Link:
https://g811141a.github.io/AppDesign/arbeit/APD-126/index.html

Auffällig beim Bau: Auf dem iPhone hoch bricht ein langer Platzhalter (‚Smiley antippen, dann ein paar Worte dazu.‘) in zwei Zeilen um, und das
leere Feld wäre zwei Zeilen hoch. Im Muster bleibt der Platzhalter einzeilig und wird abgeschnitten, wie in iOS.

## Testfall-Liste (Testfall (automatisch), `arbeit/APD-126 Muster prüfen.mjs`, Chromium und WebKit, iPad quer und iPhone hoch)

- APD-126/M-1 Feld mit Text vorn antippen (Titel, Ort, Verlauf, Fazit): der Cursor steht am Ende.
- APD-126/M-2 Ins aktive Feld nochmals vorn tippen: der Cursor steht an der Stelle, nicht am Ende.
- APD-126/M-3 Mit Tab ins nächste Feld: der Cursor steht am Ende, nichts ist ausgewählt.
- APD-126/M-4 Ein leeres Textfeld ist so hoch wie ein einzeiliges Feld.
- APD-126/M-5 Nach der Eingabetaste ist das Feld eine Zeile höher.
- APD-126/M-6 Bei automatischem Umbruch wächst das Feld, der ganze Inhalt ist zu sehen.
- APD-126/M-7 Alles löschen: das Feld ist wieder eine Zeile hoch.
- APD-126/M-8 Vorhandener mehrzeiliger Inhalt (Verlauf, Fazit) ist ganz zu sehen, auch nach einem Vorschlag.
- APD-126/M-9 Vorschlag bei Cursor in der ersten Zeile: er kommt nach der letzten Zeile, der Cursor am Ende; danach getippt bleibt klein
  (‚Weiterfahrt nach rom‘).
- APD-126/M-10 ‚Sonstiges …‘ hängt eine leere Zeile an, ein zweites Antippen keine weitere.
- APD-126/M-11 Die Vorschläge stehen über dem Feld.

Ergebnis (08.11.2026): Chromium und WebKit **alles in Ordnung**. Gegenprobe mit `ui.js` der Fassung 4.56.0 (`PRUEF_V=heute`): APD-126/M-1 und
M-3 bis M-6 rot.

**Muster am Gerät: alles ok** (Schritte 1 bis 10, iPad quer und iPhone hoch, hell; Nutzer 08.11.2026, Sitzung 0098). Offen vor ‚bereit‘: Muster
iPad hoch und iPhone quer (0 Nr. 6).

**Nur am Gerät (Testfall (User) des Musters):** ob Safari den Cursor beim ersten Antippen wirklich ans Ende setzen lässt; ob die Tastatur nach
einem Vorschlag auf Kleinbuchstaben steht; wie sich Wachsen und Schrumpfen anfühlen.

**Für den Bau zusätzlich (Grundregeln nach jeder Handlung, 0 Nr. 1):** in den Prüfungen der App Drehen mit offenem Feld, R-4.5 (Feld wächst über
der Tastatur, die Cursorzeile bleibt sichtbar), dunkel, Textgröße groß, das ⓧ (R-5.6) im einzeiligen leeren Textfeld.
