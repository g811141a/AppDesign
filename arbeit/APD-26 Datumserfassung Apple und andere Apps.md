# APD-26 Datumserfassung – Apple, andere Apps, Zeitraum durch Ziehen

**Stand 19.10.2026** · Sitzung Reiselogbuch 0019 · Fragen des Nutzers vor dem Bündel AppDesign 4.28.0 / Reiselogbuch 3.26.0
(nach ‚C2 ok‘, Testfall-Liste `arbeit/APD-26 APD-31 APD-34 Testfall-Liste.md` Abschnitt 9). Ziel: mit C2 nichts für später verbauen.

Belegt ist, was eine Quelle hat; ‚nach meinem Stand‘ heißt: aus meinem Wissen, nicht nachgeprüft – am Gerät leicht nachzusehen.

---

## 1. Was empfiehlt Apple?

**HIG – Pickers, Abschnitt iOS/iPadOS** ([Quelle](https://developer.apple.com/design/human-interface-guidelines/pickers), wörtlich):

- Stile: *Compact* (‚A button that displays editable date and time content in a modal view‘), *Inline* (‚for dates and times, an
  inline calendar view‘), *Wheels* (Räder, auch mit Tastatur), *Automatic*.
- ‚Use a compact date picker when space is constrained. […] When people tap the button, the date picker opens a modal view,
  providing access to a familiar calendar-style editor and time picker. **Within the modal view, people can make multiple edits to
  dates and times before tapping outside the view to confirm their choices.**‘
- ‚Avoid switching views to show a picker. A picker works well when displayed in context, below or in proximity to the field
  people are editing.‘
- macOS: ‚The graphical style is useful when you want to give people the option of browsing through days in a calendar or
  **selecting a range of dates**.‘ – nur auf dem Mac (`NSDatePicker`) gibt es eine Zeitraum-Auswahl im Kalender.

**iOS und iPadOS haben keine Zeitraum-Auswahl.** Auch der Kalender-Baustein `UICalendarView` (seit iOS 16) kennt nur *ein* Datum
oder *mehrere einzelne* Tage (`UICalendarSelectionSingleDate`, `UICalendarSelectionMultiDate`), keinen Zeitraum
([Quelle](https://developer.apple.com/documentation/uikit/uicalendarselection)).

**Apples eigene Apps (nach meinem Stand):** Kalender → neues Ereignis hat zwei Zeilen ‚Beginn‘ und ‚Ende‘, jede mit eigener
Auswahl; der Kalender klappt in der Zeile auf und bleibt nach dem Antippen eines Tages offen.

**Folgerung für C2:** Apple lässt die Auswahl offen, damit man mehrere Änderungen machen kann, und schließt erst beim Tippen
daneben. C2 schließt nach dem Tag – eine **kleine, begründete Abweichung** (ein Tippen weniger; ein Datumsfeld braucht fast immer
genau einen Tag). Die ‚mehreren Änderungen‘ bleiben teilweise erhalten: Monat und Jahr am Rad lassen die Auswahl offen. Die
Abweichung ist seit 19.10.2026 beschlossen (R-5.1, Testfall-Liste Abschnitt 4); das Zitat bestätigt jetzt, was dort ‚nach meinem
Stand‘ hieß. Kein Regelbruch nach Zusammenarbeit 0 Nr. 18.

---

## 2. Wie machen es andere Apps?

| App / System | Einzeldatum | Zeitraum (von – bis) | Quelle |
|---|---|---|---|
| Apple Kalender (iOS/iPadOS) | Kalender klappt auf, bleibt offen | zwei getrennte Felder ‚Beginn‘/‚Ende‘ | nach meinem Stand |
| Apple Kalender (Mac), `NSDatePicker` | – | Zeitraum im Kalender wählbar | HIG (oben) |
| Material Design (Google, Android) | Dialog mit ‚OK‘/‚Abbrechen‘ | ein Kalender: **Anfang antippen, Ende antippen**; Eingabe per Tastatur über ein Stift-Symbol | [Material](https://m2.material.io/components/date-pickers) |
| SAP Fiori (Android) | – | Anfang antippen, Ende antippen; ein dritter Tipp beginnt neu | [SAP](https://www.sap.com/design-system/fiori-design-android/v26-4/components/input-and-selection/date-pickers/usage) |
| Airbnb Gastgeber-Kalender | – | **gedrückt halten, dann über die Nächte ziehen** (auch über Wochen nach unten) | [Airbnb](https://www.airbnb.com/resources/hosting-homes/a/manage-your-calendar-654) |
| Airbnb Gäste, Booking.com, Google Flights | – | ein Kalender: Anreise antippen, Abreise antippen, dazwischen markiert | nach meinem Stand |

**Zusammengefasst:** Ein Zeitraum wird fast überall mit **zweimal Tippen in einem Kalender** gewählt. **Ziehen** gibt es nur als
Zusatz (Airbnb Gastgeber, Mac) – und dort erst nach **Gedrückthalten**, damit es sich nicht mit dem Rollen beißt. Eine Eingabe
per Tastatur bleibt immer möglich.

---

## 3. Zeitraum durch Ziehen vom Von-Tag zum Bis-Tag – geht das in der App?

### 3.1 In Safaris Kalender (heute, auch mit C2): nein

1. **Die Auswahl gehört Safari bzw. iOS**, nicht der App – sie liegt als Systemfenster über der Seite. Die App bekommt aus ihr
   keine Berührungen, nur das Ergebnis. Das Protokoll des Musters zeigt genau das: nur `focus`, `input`, `change`, `blur` – kein
   einziges Berührungs-Ereignis aus dem Kalender.
2. **Ein Datumsfeld (`<input type="date">`) hält genau ein Datum.** HTML hat kein Zeitraum-Feld.
3. **iOS selbst kann es nicht** (Abschnitt 1) – es gibt also auch nichts, was Safari nur freischalten müsste.

### 3.2 Mit einem eigenen Kalender der App: ja, machbar

Ein Monatsraster aus HTML als Baustein in `ui.js` (Pointer Events, `touch-action: none` im Raster, der Tag unter dem Finger über
`elementFromPoint`). Zu bedenken:

| Punkt | Was | Lösung |
|---|---|---|
| Ziehen gegen Rollen | im Raster darf die Seite nicht rollen, sonst rollt sie statt zu markieren | ein Monat je Ansicht mit ‹ › (wie Safari) oder Ziehen erst nach Gedrückthalten (Airbnb) |
| Über den Monatswechsel | Reise 28.12.–04.01.: beim Ziehen an den Rand müsste der Monat nach einer Pause umblättern – fummelig | Tippen–Tippen geht über Monate ohne Mühe |
| Bedienungshilfen | VoiceOver kann nicht ziehen; Apple: eine Geste nie als einziger Weg | **Tippen–Tippen ist die Grundform, Ziehen der Zusatz** |
| System statt eigenem | Apple empfiehlt Systemsteuerelemente; Räder für Monat und Jahr müssten nachgebaut werden (oder ein Menü Monat/Jahr) | bewusste, begründete Abweichung wie C2, Muster zuerst |
| Prüfbarkeit | Safaris Kalender ist nur am Gerät prüfbar (deshalb drei Muster-Versuche) | ein eigener Kalender ist **voll automatisch prüfbar** (Chromium und WebKit, hell und dunkel) – ein Vorteil |
| Aufwand | neuer Baustein (Monatsraster, Montag zuerst, deutsch, hell/dunkel, große Schrift, Tastatur), neue Regel, Testfall-Liste, Muster mit 2 Varianten | eigenes Thema, eigene Version |

### 3.3 Verbaut C2 etwas? Nein

- **C2 betrifft nur Safaris Kalender.** Kommt später ein eigener Zeitraum-Kalender, ersetzt er für Von/Bis Safaris Kalender; für
  einzelne Datumsfelder bleibt C2. Im Code: der C2-Baustein in `ui.js` hängt an `input[type=date]` – Felder mit eigenem Kalender
  sind keine solchen Felder und bleiben einfach außen vor.
- **Im Reiselogbuch sind die einzigen Datumsfelder heute genau Von und Bis der Reise** (`fStart`, `fEnd`). Dort sähe man also
  den Nutzen eines Zeitraum-Kalenders zuerst – und dort schließt C2 schon heute nach jedem Tag, man tippt danach ‚Bis‘ an.
- **Die Regel so fassen, dass sie für beide gilt** (Vorschlag für R-5.1): ‚**Datumsauswahl: sie schließt, sobald die Eingabe
  vollständig ist – beim Einzeldatum nach dem Antippen des Tages; Blättern in Monat und Jahr lässt sie offen.**‘ Ein späterer
  Zeitraum-Kalender ergänzt nur: ‚beim Zeitraum nach dem Bis-Tag‘. So bleibt das Verhalten in allen Apps gleich.
- **Bekannte Grenze von C2** (selten): steht das Feld auf dem 31. und tippst du in einem anderen Monat dessen letzten Tag an
  (z. B. 31.10. → 30.11.), hält C2 das für das Rad und lässt die Auswahl offen; Tippen daneben schließt. Safari meldet beides
  gleich – der Unterschied ist für die App nicht sichtbar.

---

## 4. Empfehlung

1. **C2 wie geplant ins Bündel 4.28.0**, R-5.1 im Wortlaut von 3.3.
2. **Zeitraum-Kalender als eigener Backlog-Punkt APD-36** (Prio 2, offen): eigener Kalender für Von–Bis, Tippen–Tippen als
   Grundform, Ziehen nach Gedrückthalten als Zusatz; zuerst Apple-Abgleich am Gerät, Testfall-Liste und Muster mit 2 Varianten. Nicht
   ins Bündel 4.28.0 (dort sind schon zwei Themen, Zusammenarbeit 0 Nr. 8).
