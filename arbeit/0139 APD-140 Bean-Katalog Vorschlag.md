# APD-140 (Vorschlag) – Bean-Katalog: je AD-Bean eine Seite zum Ansehen, Ausprobieren und Prüfen

**Stand 19.11.2026** · Sitzung 0139 · Wunsch des Nutzers (19.11.2026) · **im Backlog als APD-140, Priorität 1** (Nutzer 19.11.2026: ja, eigener Unterordner auf GitHub)

## Dein Wunsch (zusammengefasst)

1. Je AD-Bean **eine eigene Seite**: sie zeigt, was die Bean kann (zum Ausprobieren), und beschreibt sie.
2. Die Seite wird **mit jeder Änderung der Bean nachgezogen** und nutzt **immer die neueste gültige Fassung** der Bean.
3. Eine **Übersicht `index.html`** listet alle Beans mit Link; jede Bean-Seite hat **‚Zurück zur Übersicht‘**.
4. Zweck: jederzeit sehen, welche Beans es gibt und wie sie funktionieren – als Grundlage für Gestaltungsüberlegungen.
5. Die Seite soll beim **Testen** helfen: bei einem Änderungswunsch wird sie um den neuen Fall erweitert und beim Prüfen genutzt.

## So macht es Apple

Apple liefert für UIKit eine eigene Beispiel-App **‚UIKit Catalog: Creating and customizing views and controls‘**. Sie ist mit einer Split-View aufgebaut:
links die Liste der Bausteine, rechts je Baustein eine Seite mit Beispielen und Anpassungen, Bedienungshilfen (VoiceOver) eingeschlossen. Die Dokumentation
‚Views and controls‘ verweist darauf als Beispiel für die Bausteine. Quellen: [UIKit Catalog (Apple Developer)](https://developer.apple.com/tutorials/data/documentation/uikit/uikit-catalog-creating-and-customizing-views-and-controls.md) ·
[Views and controls](https://developer.apple.com/documentation/uikit/views-and-controls.md).
**Übertragen:** Übersicht = Seitenleiste bzw. Startliste (iPad links, iPhone als eigene Seite, R-1.1), Bean-Seite = Inhalt rechts mit ‚Zurück‘ – also genau der
Aufbau unserer Apps.

## Vorschlag: so angelegt hat er den höchsten Nutzen

**A. Ort und Fassung**
- Ordner **`AppDesign/katalog/`**: `index.html` (Übersicht) und je Bean `<kennung>.html` (z. B. `katalog/hinweis.html`, `katalog/swipeactions.html`).
  Auf GitHub Pages: `https://g811141a.github.io/AppDesign/katalog/` – am iPad und iPhone direkt aufrufbar, auch als Lesezeichen.
- Die Seiten laden **`v4/ui.js` und `v4/design.css`** – das ist immer die neueste veröffentlichte Fassung (Wunsch 2). Oben steht die geladene Version.
- **Vergleich vorher/nachher:** mit `?fassung=4.63.0` lädt dieselbe Seite eine ältere Fassung – so sieht man eine Änderung im direkten Vergleich, und eine
  Prüfung kann gegen die alte Fassung rot zeigen (Gegenprobe).

**B. Aufbau einer Bean-Seite** (wie unsere Apps: Kopfzeile mit ‚Zurück‘ zur Übersicht, Titel = Name der Bean)
1. **Steckbrief:** Kennung, Bereich, Fabrik, seit welcher Version, zuletzt geändert, Regeln (R-…) und Abschnitt der Designrichtlinie.
2. **Was sie tut:** kurze Beschreibung in Alltagssprache, dazu die Schnittstelle (Eigenschaften mit Standardwert, Methoden, Ereignisse).
3. **Ausprobieren:** die echte Bean mit Schaltern für jede Eigenschaft; ein **Ereignis-Protokoll** zeigt, welche Ereignisse (`on(…)`) kommen.
4. **Fälle:** jeder Fall der Testfall-Liste der Bean als nummerierte Zeile mit Knopf ‚Zeigen‘ (z. B. ‚D-3 langer Dateiname am iPad‘). Der Knopf stellt den
   Zustand her. Jeder Fall hat einen eigenen Link (`hinweis.html#D-3`).
5. **Verlauf:** je Version eine Zeile mit der Änderung an der Bean.

**C. Übersicht `index.html`**
- Die Beans **nach Bereichen gruppiert** (Aktionen und Menüs, Navigation und Suche, Fenster und Meldungen, Eingabe, Inhalt, Dienste – APD-136), je Zeile Icon,
  Name, ein Satz, Version. **Geplante Beans** (Kandidaten wie `gedrueckt`, `decimal`, `field`) grau, ohne Link – so sieht man auch, was kommt.

**D. Nutzen beim Testen – der Kern**
1. **Ein Fall, drei Nutzer:** derselbe Fall auf der Seite ist (a) der Testfall (automatisch): die Prüfung ruft ‚Zeigen‘ auf und misst; (b) der Testfall (User)
   am Gerät: der Usertest verlinkt direkt auf den Fall (`…/katalog/hinweis.html#D-3`) statt langer Schritte durch die App; (c) das Anschauungsbeispiel für dich.
2. **Ablauf bei einer Änderung** (passt zu 0 Nr. 1 und 25): zuerst kommt der neue Fall auf die Seite → die Prüfung ist gegen die alte Fassung **rot** →
   die Bean wird geändert → grün; mit `?fassung=` vergleichst du am Gerät alt und neu.
3. **Gegenprobe je Bean:** ein eingeschleuster Fehler muss auf der Seite rot werden (wie bei der Prüfseite aus APD-135/B-3).
4. **Pflicht und Prüfung:** jede Bean in der Liste der AD-Beans (15) hat eine Seite und steht in der Übersicht; die Seite nennt dieselbe Kennung, Fabrik,
   Schnittstelle und Regeln wie die Liste – sonst rot (Erweiterung von `checkBeans`, R-1.13; Wortlaut zur Umsetzung nach 0 Nr. 29). So kann die Seite nicht
   veralten (Wunsch 2).
5. **Eine Quelle:** die Beschreibung steht auf der Seite, die Liste der AD-Beans (15) verlinkt darauf – kein zweiter Text, der auseinanderläuft (0 Nr. 3).

**E. Zusammenhang mit der laufenden Arbeit**
- Die Bean-Seiten sind genau die **Prüfseiten für Gruppe B** aus APD-135 (B-3.3: ‚eigene Elemente genügen‘ – Menü, Sprechblase, Fenster …). Die Vorlage bleibt
  die Prüfseite für den Rahmen der App (B-3.1, B-3.2, läuft gerade). Mit dem Katalog würde B-3.3 gleich so gebaut, dass du die Seiten auch ansehen kannst.
- Heute gibt es **2 Beans** (`swipeactions`, `hinweis`) – der Katalog beginnt klein und wächst mit jedem Umbau aus APD-136.
- Die laufende Version 4.64.0 / 3.57.7 ändert sich dadurch nicht.

## Empfehlung

- **Ins Backlog: ja**, als **APD-140**, allgemein (AppDesign), Status offen.
- **Priorität 1** – er ist die Grundlage für APD-135/B-3.3 und für jeden Umbau aus APD-136; Reihenfolge: nach Version 4.64.0 / 3.57.7, zusammen mit APD-135/B-3.3.
- Vor dem Bau: Muster der Übersicht und einer Bean-Seite (`hinweis`) am iPad quer hell (0 Nr. 6), Testfall-Liste, Wortlaut der Erweiterung von R-1.13.

---

## Nachtrag 19.11.2026 – deine Präzisierung und meine Meinung

**Dein Wunsch (Nutzer 19.11.2026):**
1. Die Anforderung zum Testen ziehst du zurück (könnte unübersichtlich werden). Die Entscheidung liegt bei mir.
2. Keine eigene Übersichtsseite: Aufbau wie eine App mit **Seitenleiste**. Darin blätterst du durch die Bereiche und rufst die einzelnen Beans auf. Ist eine
   Bean offen, tritt die Seitenleiste in den Hintergrund, und du kannst schnell hin und her wechseln.
3. Erster Schritt: für die **Beans, die es schon gibt** (`swipeactions`, `hinweis`).
4. Im Browser aufrufbar, keine eigene App-Gestaltung nötig, aber **responsive**: gut auf iPad und iPhone, nach dem bestehenden Regelwerk.

**Meine Meinung**
- **Seitenleiste statt Übersichtsseite: ja.** Genau so baut Apple den UIKit Catalog (Split-View: Liste links, Baustein rechts). Bei uns ist es derselbe
  Aufbau wie im Reiselogbuch (R-1.1): am iPad die Seitenleiste ein- und ausblendbar, am iPhone die Liste als Startseite und die Bean als Seite mit ‚Zurück‘.
  Das kostet fast nichts, weil `design.css` und `ui.js` Seitenleiste, Navigation und Wischen schon mitbringen. So sieht der Katalog von selbst wie unsere Apps
  aus, ohne eigene Gestaltung.
- **Eine Seite `katalog/index.html` mit der Seitenleiste, je Bean eine eigene Datei** (`katalog/hinweis.js`, `katalog/swipeactions.js`: Beschreibung und
  Vorführung). Jede Bean hat einen eigenen Link (`katalog/#hinweis`). So bleibt ‚je Bean eine eigene Seite‘ für die Pflege erhalten, und du wechselst ohne
  Neuladen.
- **Testen – meine Entscheidung: schlank.** Der Katalog ist zum Ansehen und Ausprobieren da. Die Fälle stehen dort nur als Beispiele (‚Zeigen‘). Geprüft wird
  nur, dass er nicht veraltet und nicht kaputt ist: jede Bean der Liste (15) hat ihre Datei im Katalog (`checkBeans`), und der Katalog lädt am iPad und iPhone
  ohne Fehler und hält die Grundregeln ein. Die eigentlichen Prüfungen der Beans bleiben auf der Prüfseite (APD-135/B-3).
- **Reihenfolge:** eigene Version **AppDesign 4.65.0** (die laufende Version hat schon 2 Themen, 0 Nr. 8), nach Version 4.64.0 / 3.57.7 und dem Usertest
  P-114 (0 Nr. 22). Vorher ein Muster am iPad quer hell (0 Nr. 6) mit Testfall-Liste. **Vermutung:** in dieser Sitzung reicht der Kontext dafür nicht mehr
  (Übergabe ab 300.000) – das Muster kommt in der nächsten Sitzung.
