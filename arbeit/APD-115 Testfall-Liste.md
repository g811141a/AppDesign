# APD-115 – Rollen wie Apple (APD-115/V-3) und Bezeichnung über dem Feld: Apple-Abgleich, Muster, Testfall-Liste

Stand 07.11.2026 · Sitzung Reiselogbuch 0090 · Grundlage `arbeit/APD-115 Befund.md` (APD-115/E-3, APD-115/E-4, APD-115/E-5) · **Muster: Variante A gewählt, Wortlaut R-4.5 bestätigt, am Gerät ‚nicht ok‘ (Einzelheiten offen)**

## Rückmeldung (Nutzer 07.11.2026, Sitzung 0091)

- APD-115/E-6 Variante A (APD-115/V-4): ‚Verlauf‘ direkt über dem Feld, Vorschläge darunter.
- APD-115/E-7 Wortlaut R-4.5 ‚Neu‘ (unten) bestätigt (0 Nr. 29) – geht mit dem Bau von APD-115.
- APD-115/E-8 Schritte am Gerät ‚nicht ok‘ – welche Schritte und was, wird erfragt; danach nach 0 Nr. 1 zuerst den Ablauf als feste Prüfung
  nachbauen (rot gegen das Muster), dann beheben.

## Befund Schritt 7 ‚Feld wechseln‘ (Nutzer 07.11.2026, Sitzung 0091: ‚am iPad und iPhone herumgesprungen, sehr irritierend‘)

Messung `arbeit/APD-115 Messungen/2026-11-07 iPad quer Quartier dann Ort.txt` (iPad quer, Safari mit Adressleiste: Seitenhöhe 702, sichtbar mit
Tastatur 274) und Nachstellung im Safari-Modell (Skript nur in der Sitzung):

- APD-115/N-1 Quartier antippen (Fenster oben): ‚V-3 fQuarter rollt 342‘, Tastatur auf – ruhig.
- APD-115/N-2 Ort antippen (iPad quer **in derselben Zeile** wie Quartier, ganz über der Tastatur): ‚V-3 fPlace rollt 178‘ – die Mitte-Regel
  (APD-115/A-2) rollt, obwohl das Feld schon ganz sichtbar ist. 136 ms danach verschiebt Safari zusätzlich die Seite um 179 px (`scrollY` 179,
  Kopfzeile 6 ms lang bei −179, dann von `placeDialogs` zurückgestellt) – das Springen.
- APD-115/N-3 beim Tippen in Ort zweimal ‚zurückgestellt fPlace 1251 → 1284‘: etwas rollt den Fensterinhalt 33 px zurück, die App stellt ihn
  wieder hin – kleines Zucken bei jedem Zeichen.
- APD-115/N-4 Safari-Modell: iPad quer rollt die App beim Wechsel 777 → 924 (147 px) statt 0; iPhone hoch zweimal (43, dann 201 px) statt einmal
  59 px bis 16 px über die Tastatur. Die Verschiebung von Safari (N-2) bildet das Modell nicht nach – darum war APD-115/M-7 grün.
- APD-115/N-5 Folgerung: beim Wechsel wie beim ersten Antippen nur so weit rollen wie nötig (ganz sichtbar: nichts); das Modell bekommt den
  Befund N-2 (Rollen der App beim Wechsel → Safari verschiebt zusätzlich), M-7 wird geschärft (gleiche Zeile: nichts rollt; Feld unter der
  Tastatur: einmal bis 16 px darüber). Ob Safari ohne das Rollen der App noch selbst verschiebt (APD-36/S-6 b), zeigt erst die nächste Messung.
- APD-115/N-6 Geschärfte Prüfung APD-115/M-7 (Fenster oben bzw. unten, Quartier antippen, tippen, Ort antippen; ‚ganz sichtbar: nichts rollt,
  sonst einmal bis 16 px über die Tastatur, ein Schub‘) gegen das Muster: **rot**, 20 Fehler in allen vier Ansichten (iPad quer 777 → 924,
  iPad hoch 385 → 756, iPhone hoch zwei Schübe 43 und 201 px bis 248 statt 433, iPhone quer 11 px zu wenig).
- APD-115/N-7 Versuch ohne die Mitte-Regel (Sitzung 0091, nicht eingecheckt): die neuen Fälle werden grün bis auf iPhone quer, dafür wird die
  bisherige Sprungprüfung von M-7 rot – im Modell stellt Safari das Feld beim Wechsel selbst in die Mitte (APD-36/S-6 b, am Gerät gemessen:
  iPad quer Notiz 34 px über der Tastatur → 132 px), iPad hoch Ort 768 → 445, der Fensterkopf springt kurz mit. Ohne die Regel springt also
  Safari, mit ihr springen App und Safari (N-2). Grund vermutlich APD-36/S-7: Safari liest die Lage beim Fokus, vor dem Rollen der App – bei offener
  Tastatur macht das Muster keinen neuen Fokus (APD-36/S-8), Safari sieht also die alte Lage.
- APD-115/N-8 Nächster Schritt (Vorschlag): Muster mit zwei Varianten für den Wechsel, beide mit Messmodus –
  APD-115/W-1 ‚nur so weit wie nötig‘ (Safari entscheidet selbst) und APD-115/W-2 ‚Mitte-Regel und neuer Fokus (APD-36/S-8) auch bei offener
  Tastatur‘ (Safari liest die Lage nach dem Rollen, eine Bewegung). Am Gerät messen, welche ruhig ist; das Safari-Modell danach korrigieren
  (0 Nr. 20), die Erwartung von M-7 nach der gewählten Variante.
- APD-115/N-9 Stand Sitzung 0091 (Nutzer: ‚Ja, hier noch‘): Muster mit `&w=1` (APD-115/W-1) und `&w=2` (APD-115/W-2, Standard) gebaut; M-7 für beide
  Varianten (Chromium): 12 Fehler offen – (1) iPhone hoch in beiden Varianten zwei Schübe, zuerst 43 px (Feldunterkante genau an die Tastatur –
  Herkunft klären: vermutlich das Rollen des Browsers beim Fokus, vor bzw. neben dem focusin), dann 16 bzw. 201 px; (2) iPhone quer W-2: Safari
  verschiebt im Modell 30 px, weil Ort nicht bis zur Mitte rollen kann (oben am Fensterkopf) – wie APD-115/A-3 als Hinweis statt Fehler werten.
  WebKit und Gegenprobe noch nicht gelaufen; das Muster ist noch nicht zum Prüfen am Gerät freigegeben.
- APD-115/N-10 Stand Sitzung 0092: (1) der erste Schub ‚43 px‘ kam von der Prüfung selbst – `p.tap()` von Playwright rollt Ort vor dem Antippen
  bis genau an die Tastatur (aktives Element dabei noch Quartier); mit Fokus wie über den Pfeil der Tastatur ein Schub (W-1 59 px bis 16 px über
  der Tastatur, W-2 244 px bis zur Mitte). M-7 tippt Ort nur an, wenn es ganz sichtbar ist, sonst Fokus direkt; neu der Fall ‚geschoben‘ (Ort
  unter der Tastatur, Fenster mit dem Finger hochgeschoben, dann Ort antippen – wie in den Schritten am Gerät). (2) iPhone quer W-2: Ort höher als
  der sichtbare Teil, Safari verschiebt im Modell 30 px – Hinweis wie APD-115/A-3. Chromium und WebKit ohne Fehler, Gegenprobe `PRUEF_V=heute`
  rot (35 Fehler). Am Gerät zu messen, welche Variante ruhig ist.
- APD-115/N-11 Messung am Gerät (Nutzer 07.11.2026, Sitzung 0092; `messung-2026-11-07-2118` iPad quer W-1, `-2119` iPad quer W-2, `-2037` iPhone hoch
  W-2, `-2006` iPhone leer – nach 691 s ohne Ereignis an der Grenze; iPhone W-1 fehlt). Rückmeldung: ‚Schritte 7 und 8 haben auf allen Geräten
  geruckelt‘ – Schritt 6 nicht.
  - Schritt 6 (Ort antippen bei offener Tastatur): Safari verschiebt die Seite **in beiden Varianten** – iPad quer W-1 139 px (die App rollt 0, Ort
    war ganz sichtbar), W-2 ebenso 139 px, obwohl die App 138 px zur Mitte rollt und neu fokussiert; iPhone hoch W-2 47 px (App rollt 46). Die App
    fängt es in 4–5 ms ab (Kopfzeile kurz −139 bzw. −47, dann 0). Folgerung: der neue Fokus bei offener Tastatur hilft nicht – APD-36/S-8 gilt nur
    beim Öffnen; Safari nimmt die Lage beim Fokus vor dem Rollen der App (APD-36/S-7). Das Modell sagt für W-2 ‚Safari verschiebt nicht‘ – falsch,
    zu korrigieren (0 Nr. 20). W-2 bringt nur zusätzliches Rollen.
  - Schritt 8 (x – Tastatur schließt): Safari setzt `scrollY` sofort auf 0, meldet `offsetTop` aber noch alt – iPhone hoch 400 ms lang 47 (Kopfzeile
    47 px zu tief, 79020 → 79435 ms), iPad quer ein Bild lang (‚vv resize‘ mit offsetTop 0, die App steht noch auf 138: Kopfzeile 138 px tief,
    22400 → 22408 ms). Ebenso nach dem Schließen über den Link im Hinweis (iPhone 48661 → 49066 ms, 14 px). Nur nach einer Verschiebung durch Safari.
  - Schritt 7 (‚Rom‘ tippen): beim ersten Zeichen iPad quer W-1 Safari `scrollY` 139 → 138 (Kopfzeile 45 ms lang +1 px), W-2 zusätzlich ‚scroll div‘;
    iPhone W-2 ‚scroll div‘. Wie weit der Fensterinhalt rollt, zeichnet der Messmodus nicht auf (kein Rollstand des Fensters, kein Fensterkopf) –
    im Modell rollt beim Tippen nichts.
- APD-115/E-9 Entscheidung (Nutzer 07.11.2026, Sitzung 0092): **W-1** (‚nur so weit wie nötig‘); W-2 verworfen. Schritt 8 im Modell nachbilden, im
  Muster beheben, hier weiter.
- APD-115/N-12 Umsetzung Sitzung 0092: (1) Safari-Modell (`tests/safari.mjs`, Option `apd115` – vorerst nur im Muster, damit die Prüfungen von
  4.55.0 unberührt bleiben; mit der Version von APD-115 Standard): beim Wechsel bei offener Tastatur zählt die Lage beim ersten Fokus, ein neuer
  Fokus im focusin ändert sie nicht; beim Schließen `scrollY` sofort 0 (‚scroll‘ am document), `offsetTop` und Höhe erst nach `zuVerzug` (iPhone
  400 ms, iPad sofort). Damit zeigt das Modell die Sprünge des Geräts (APD-115/M-11 und die Sprungprüfung von M-7 rot: iPad Fensterkopf bis −130
  bzw. 157 px, iPhone Kopfzeile bis 161 px). (2) Muster (`ui.js`): mit Rollbereich zählt für `--vv-top` der kleinere Wert aus `offsetTop` und
  `scrollY`; Safaris ‚scroll‘ der Seite stellt sofort neu; das iPad-Fenster gleicht eine Verschiebung durch Safari im selben Augenblick aus
  und gleitet nur für den Rest.
- APD-115/N-13 Zweite Messung W-1 (Nutzer 07.11.2026, Sitzung 0093; `2026-11-07 iPad quer W-1 zweite Messung.txt` (Home-Bildschirm), `… iPhone hoch W-1
  zweite Messung.txt` (Safari)). Rückmeldung: ‚7 und 8 ruckelt noch immer‘.
  - Schritte 4 und 5 ruhig: Quartier rollt 342 bzw. 345 px, neuer Fokus, Tastatur auf, beim Tippen nichts.
  - Schritt 6 (Ort antippen): die App rollt nicht (iPad ‚rollt 0‘, iPhone ‚rollt −74‘ – Ort war nach dem Hochschieben ganz sichtbar). Trotzdem verschiebt
    Safari die Seite 135 bzw. 87 ms nach dem Antippen: iPad `scrollY`/`offsetTop` 139, iPhone 75 – so viel, dass Ort etwa in der Mitte des sichtbaren
    Teils steht (iPad Tipp bei y 339, sichtbar 374; iPhone y 272, sichtbar 377). Die Meldung zeigt die Kopfzeile −139 bzw. −75 und den Fensterkopf −129
    bzw. −65; 5 bzw. 3 ms später steht beides wieder (`--vv-top` 138 bzw. 74). Bei Quartier (Tastatur noch zu) verschiebt Safari nicht.
  - Schritt 7 (‚Rom‘ tippen): iPad beim ersten Zeichen `scrollY` 139 → 138 (Kopfzeile und Fensterkopf 40 ms lang +1 px), sonst nichts; iPhone keine
    Bewegung in den Daten (kein ‚scroll‘, Rollstand des Fensters 1382, Fensterkopf 10). Das Ruckeln in Schritt 7 zeigen die Daten nicht. **Nachgefragt (Nutzer 07.11.2026):** es ruckelt
    **gleich nach dem Antippen von Ort** – also Safaris Verschiebung aus Schritt 6 und das Zurückstellen der App. Vermutung: Safari verschiebt
    sichtbar (etwa 130 ms) und meldet erst am Ende; das Modell meldet sofort, darum sind M-11 und M-7 dort grün – im Modell zu korrigieren
    (0 Nr. 20), bevor eine Lösung gebaut wird.
  - Schritt 8 (x): (1) Kopfzeile und Fensterkopf kurz zu tief, iPad 7 ms (‚vv resize‘, `--vv-top` noch 138), iPhone 2 ms (‚scroll‘ der Seite,
    `offsetTop` noch 75) – die App stellt im nächsten Ereignis neu. (2) **Der Fensterinhalt springt**, wenn der Rahmen mit dem Schließen wächst: iPad
    Rollstand 793 → 451 (342 px) 7 ms nach ‚vv resize‘, iPhone 1382 → 1075 (307 px) 7 ms nach ‚vv resize‘ (400 ms nach dem Antippen von x). Ursache:
    nach dem Rollen steht `--platz` auf `0px` (`knapp`), `gemeldet()` gab Platz vor dem Wachsen nur bei `platzVon(c)` > 0 – der Browser kürzte den
    Rollstand. Das Modell zeigt es auch (iPad quer 777 → 426, iPhone hoch 1137 → 807, iPad hoch 385 → 122); APD-115/M-11 prüfte nur Kopfzeile und
    Fensterkopf, nicht den Inhalt – darum grün.
  - Umsetzung: M-11 prüft beim Schließen zusätzlich den Rollstand des Fensters in jedem Bild (± 2 px) – rot gegen das Muster (6 Fehler: iPhone hoch,
    iPad quer, iPad hoch). Bauskript: jeder Rollbereich bekommt vor dem Wachsen Platz, `knapp` nimmt danach zurück, was nicht nötig ist.
    Derselbe Fehler steckt in `fassung/4.54.0/ui.js` und `v4/ui.js` (`gemeldet`, Zeile 2997) – also auch im Reiselogbuch 3.52.0.
- APD-115/E-10 Entscheidung (Nutzer 07.11.2026, Sitzung 0093): zuerst das Modell korrigieren (Safaris Verschiebung beim Wechsel sichtbar, gemeldet
  erst nach iPad 135 / iPhone 88 ms, M-11 rot), dann zwei Varianten mit Messmodus bauen und am Gerät messen: **APD-115/W-3** ‚vor dem Fokus zur Mitte‘
  (bei offener Tastatur rollt die App beim Loslassen auf einem anderen Feld, vor dem Fokus, so weit, wie Safari das Feld verschieben würde – Safari
  verschiebt dann nicht, nur der Inhalt rollt einmal) und **APD-115/W-4** ‚Fokus selbst setzen‘ (die App fängt das Loslassen ab und setzt den Fokus
  ohne Rollen; ob Safari dann verschiebt, zeigt nur das Gerät).
- APD-115/N-14 Stand Sitzung 0093: (1) Safari-Modell (Option `apd115`): Verschiebung beim Wechsel sofort sichtbar, gemeldet nach `wechselVerzug` (iPhone
  88, iPad 135 ms) – W-1 zeigt jetzt das Ruckeln (iPad quer Ort 320 → 173 → 320, iPhone hoch 362 → 201 → 362). (2) Bauskript: `&w=3` (beim Loslassen
  vor dem Fokus rollen, dann Fokus selbst – sonst trifft der Klick an der alten Stelle etwas anderes und die Tastatur geht zu) und `&w=4`. W-3 im Modell:
  Safari verschiebt nicht, ein Schub (iPad quer 147, iPhone hoch 161 px), Schritt 8 ruhig. (3) M-7 und M-11 laufen für W-1, W-3, W-4 (W-1/W-4 beim
  Antippen von Ort nur Hinweis). **Offen** (Chromium 30, WebKit 29 Fehler, Gegenprobe 99): (a) der erste M-7-Block (`checkTastaturStill` mit
  `wechsel`) läuft ohne `&w=` = W-2 und springt im neuen Modell – auf `&w=3` stellen; (b) iPhone quer W-3: Ort höher als der sichtbare Teil, kann nicht
  in die Mitte, Safari verschiebt 30 px – als Hinweis wie APD-115/A-3. Danach Chromium, WebKit grün, Gegenprobe rot, dann Messung W-3 und W-4.

## Apple-Abgleich (0 Nr. 23, 2.6)

- **So macht es Apple (Quellen dieser Sitzung):**
  - HIG ‚Text fields‘ (gelesen 07.11.2026, zitiert im Befund): eine eigene Bezeichnung neben dem Platzhalter erinnert an den Zweck des Felds,
    für mehr Text ein Textbereich (text view).
  - Archivierte UIKit-Doku ‚Table View Styles‘ (developer.apple.com, gefunden 07.11.2026): gruppierte Tabellen teilen
    zusammengehörige Zeilen in Blöcke, jeder Block kann Kopf- oder Fußtext haben. Der Kopf steht direkt über seinem Block.
  - UIKit (Zweitquellen, im Befund): Tabellen rollen das Feld mit Fokus von selbst nur über die Tastatur; ein Textbereich (UITextView)
    rollt so, dass der Cursor sichtbar ist.
- **Folgerung:** Die Bezeichnung ‚Verlauf‘ gehört direkt über das Feld, die Vorschläge darunter (Variante A). Das ist eine Vermutung
  nach dem Aufbau gruppierter Tabellen, eine Apple-App mit Vorschlägen unter einem Textbereich ist nicht belegt. Gerollt wird nur so
  weit wie nötig (APD-115/V-3).
- **HIG-Checkliste (16) und Katalog (17):** R-4.5 wird geändert (Wortlaut unten). R-5.1 (Bezeichnung und Feld gehören zusammen) stützt
  Variante A. Antippflächen der Vorschläge bleiben 44 px (R-3.1). Keine neue Regel ‚jedes Feld hat eine Bezeichnung‘ (APD-115/E-4).
- **Bewusste Abweichungen von Apple (Safari, Designrichtlinie 13):**
  - APD-115/A-1 Im Inhalt (außerhalb eines Fensters) endet das Feld 28 statt 16 px über der Tastatur. Sonst verschiebt Safari beim
    ersten Öffnen selbst (APD-36/S-5: unter 24 px).
  - APD-115/A-2 Feld wechseln bei offener Tastatur: Liegt die Mitte des Felds unter der Mitte des sichtbaren Teils, rollt es bis zur
    Mitte, sonst stellt Safari es selbst dorthin (APD-36/S-6 b, im Modell; die Grenze ist am Gerät nicht gemessen, das Muster misst).
  - APD-115/A-3 Ist ein Textbereich höher als der sichtbare Teil (iPhone quer immer, sonst bei langem Verlauf), verschiebt Safari im
    Modell beim ersten Öffnen trotzdem (das Feld endet unter der Tastatur). Das ist am Gerät nicht gemessen und bisher genauso.

## Muster (nur hell, Vereinbarung 30.10.2026)

Eine Kopie des Reiselogbuchs 3.52.0 mit AppDesign-Fassung 4.54.0 und eigenem Speicher (`reiselogbuch.muster-apd115`, die echten Reisen
bleiben unberührt), Beispielreise ‚Muster A …‘ bzw. ‚Muster B …‘. In `ui.js` rollt sie nach APD-115/V-3. Gebaut mit `arbeit/APD-115 Muster bauen.mjs`.

- **APD-115/V-4 Variante A** (`arbeit/APD-115/index.html?v=a`, Empfehlung): ‚2 Verlauf‘ direkt über dem Feld, die Vorschläge
  (Kapseln) darunter.
- **APD-115/V-5 Variante B** (`?v=b`): wie heute, die Vorschläge zwischen Überschrift und Feld. Zum Vergleich, auch mit APD-115/V-3.
- **APD-115/V-3 in beiden:** Beim Antippen rollt der Inhalt nur, wenn das Feld sonst unter der Tastatur läge, und dann nur so weit, dass es
  16 px über ihr endet. Ist ein mehrzeiliges Feld zu hoch, liegen die Zeile mit dem Cursor (beim Antippen die Zeile unter dem Finger)
  und eine halbe Zeile darunter über der Tastatur. Beim Tippen bleibt die Cursorzeile mit einer halben Zeile darunter über der
  Tastatur. Am iPad zählt die Lage des Fensters, nachdem es mit der Tastatur in die Mitte darüber geglitten ist. Der Messmodus
  schreibt je Antippen ‚APD-115/V-3 … rollt N‘.

## Testfall-Liste (Testfall (automatisch), Muster: `arbeit/APD-115 Muster prüfen.mjs`, Chromium und WebKit mit Safari-Modell)

Gerät und Lage: iPhone hoch, iPhone quer, iPad quer, iPad hoch · Darstellung: hell · Variante A und B · Daten: kurzer Verlauf (Tag 2),
langer Verlauf mit 14 Zeilen (Tag 4).

| Nr. | Handlung | Erwartet |
|---|---|---|
| APD-115/M-1 | Verlauf an den unteren Rand des Fensters rollen, antippen | liegt das Feld schon über der Tastatur, rollt nichts; sonst endet es 16 px (± 3) über der Tastatur bzw. dem Fensterende. Kein Sprung (Kopfzeile, Fensterkopf, Feld; `checkTastaturStill`) |
| APD-115/M-2 | ebenso ‚Wie war was?‘ | wie APD-115/M-1 |
| APD-115/M-3 | ebenso Quartier und Preis | wie APD-115/M-1 |
| APD-115/M-4 | Verlauf oben im Fenster antippen (iPhone hoch, iPad hoch) | lag das Feld über der künftigen Tastatur, rollt nichts |
| APD-115/M-5 | langer Verlauf, eine Zeile unten antippen | Cursorzeile und eine halbe Zeile darunter zwischen Fensterkopf und Tastatur; verschiebt Safari im Modell, wird es berichtet (APD-115/A-3) |
| APD-115/M-6 | am Ende des langen Verlaufs zwei Zeilen tippen | die neue Zeile mit einer halben Zeile darunter bleibt über der Tastatur |
| APD-115/M-7 | Quartier antippen, dann Ort (Feld wechseln) | kein Sprung, Ort ganz über der Tastatur (APD-115/A-2) |
| APD-115/M-11 | wie am Gerät (Schritte 6 bis 8): Quartier, ‚Hotel‘, Ort antippen (unter der Tastatur: vorher hochgeschoben), ‚Rom‘ tippen, x | in jedem Bild Kopfzeile still, Fensterkopf nur zwischen vorher und nachher (Befund APD-115/N-11); beim Schließen bleibt der Rollstand des Fensters (± 2 px, APD-115/N-13) |
| APD-115/M-8 | Variante A öffnen | Feld höchstens 12 px unter der Bezeichnung ‚Verlauf‘, Vorschläge darunter |
| APD-115/M-9 | Variante B öffnen | Vorschläge zwischen Bezeichnung und Feld |
| APD-115/M-10 | jede Ansicht | Grundregeln (`pruefe.mjs`) |
| APD-115/Y-1 | Gegenprobe `PRUEF_V=heute` (ui.js 4.54.0) | APD-115/M-1 bis APD-115/M-3 rot (heute rollt das Feld in die obere Hälfte, also zu weit) |

**Am Gerät (Testfall (User) des Musters):** Gefühl beim Rollen, ob Safari bei Feldwechsel (APD-115/A-2) und hohem Textbereich (APD-115/A-3)
verschiebt (Messmodus), Lesbarkeit von Variante A gegen B.

**Schritte am Gerät – Feld wechseln, APD-115/W-1 gegen W-2 (Sitzung 0092).** Je Link (zuerst `&w=1`, dann `&w=2`), am iPad quer und am
iPhone hoch, in Safari – vier Messungen:

1. Link öffnen: `https://g811141a.github.io/AppDesign/arbeit/APD-115/?v=a&w=1` bzw. `…?v=a&w=2`. Erwartet: Reise ‚Muster A – Verlauf über
   dem Feld‘.
2. Mehr-Menü der Seitenleiste (iPhone: Startliste) öffnen, die graue Versionszeile lange drücken, ‚Messung starten‘ antippen. Erwartet: die
   Messung läuft (im Menü ‚Messung beenden und teilen‘, grau ‚läuft · …‘).
3. Tag 2 (25.08.) antippen, nicht rollen. Erwartet: die Tageserfassung ist offen, ganz oben.
4. Quartier antippen. Erwartet: die Tastatur öffnet sich, Quartier steht über ihr, nichts springt.
5. ‚Hotel‘ tippen. Erwartet: nichts zuckt.
6. Ort antippen; liegt Ort unter der Tastatur (iPhone hoch), vorher das Fenster mit dem Finger hochschieben, bis Ort ganz zu sehen ist.
   Erwartet: W-1 – nichts rollt; W-2 – Ort gleitet einmal ruhig zur Mitte; in beiden springt nichts (Kopfzeile, Fensterkopf).
7. ‚Rom‘ tippen. Erwartet: nichts zuckt.
8. Tageserfassung mit x (Abbrechen) schließen, Mehr-Menü → ‚Messung beenden und teilen‘, die Datei in den Chat teilen. Erwartet: Datei
   `messung-JJJJ-MM-TT-hhmm.txt`.

**Zweite Messung (Sitzung 0092, nur W-1, Muster nach APD-115/N-12):** Link `…?v=a&w=1`, Seite neu laden, Schritte wie oben; Erwartet bei 6: nichts rollt,
nichts springt; bei 8 (x): die Tastatur geht zu, Kopfzeile und Fenster bleiben ruhig (iPad: das Fenster gleitet ruhig in die Mitte). Auswertung in 0093.

## Wortlaut R-4.5 (0 Nr. 29, zum ‚Ja‘ vor dem Bau)

- **Alt (Designrichtlinie 17, Satz 2):** ‚Ein Feld mit Fokus steht immer ganz über der Tastatur – in Fenstern und im Inhalt, 16 px
  darüber (reicht der Platz nicht, oben unter Kopf- bzw. Suchzeile, mit Platz für Fokus-Umrandung und Schatten) – und zwar **ohne
  Springen**: beim Antippen rollt das Feld in die obere Hälfte, Safari verschiebt nichts; …‘
- **Neu:** ‚Ein Feld mit Fokus steht immer über der Tastatur, **wie bei Apple nur so weit gerollt wie nötig**: es endet 16 px über
  ihr (im Inhalt 28 px); ein mehrzeiliges Feld, das nicht ganz passt, zeigt die Zeile mit dem Cursor und eine halbe Zeile darunter,
  auch beim Tippen; liegt es schon darüber, rollt nichts; beim Wechsel bei offener Tastatur höchstens bis zur Mitte des sichtbaren
  Teils. Das alles **ohne Springen**: Safari verschiebt nichts; …‘ (der Rest bleibt; Designrichtlinie 13 ‚Lösung in ui.js‘ wird
  entsprechend angepasst).
