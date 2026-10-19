# A-26, A-31, A-34 – Fall-Liste (Bündel für AppDesign 4.28.0 / Reiselogbuch 3.26.0)

**Stand 19.10.2026** · Sitzung Reiselogbuch 0018 · Nutzer 19.10.2026: drei offene Punkte in einer Version, damit Entwicklung und
Prüfen schneller vorangehen (Zusammenarbeit 0 Nr. 8: 3 Punkte, 2 Themen)

| Thema | Punkte |
|---|---|
| 1. Datumsfeld | A-26 Tag antippen übernimmt und schließt (allgemeine Regel) |
| 2. Messung | A-31 Messung abspielen · A-34 `--vv-top` entfernen |

---

## Thema 1 – A-26 Datumsfeld

### 1.1 Wunsch und Apple

- **Wunsch (Nutzer 18.10.2026):** nach dem Antippen eines Tages übernimmt das Datumsfeld den Tag und die Auswahl schließt.
  Heute bleibt sie offen, man muss daneben tippen.
- **Apple:** In der iOS-Datumsauswahl (kompakter Kalender, z. B. Kalender → neues Ereignis) bleibt die Auswahl nach meinem
  Stand nach dem Antippen eines Tages offen, man schließt sie durch Tippen daneben
  ([HIG – Pickers](https://developer.apple.com/design/human-interface-guidelines/pickers)). Der Wunsch weicht also bewusst und
  begründet ab: ein Datumsfeld braucht fast immer genau einen Tag, ein Tippen weniger. Das ist eine kleine Abweichung, kein
  Regelbruch (Abschnitt 3).
- **Machbarkeit:** Die Auswahl gehört Safari, nicht der App. Die App kann nur das Feld verlassen (`blur()`). Ob Safari dann die
  Auswahl schließt, zeigt nur das Gerät, deshalb das **Muster** `arbeit/A-26 Muster.html` mit Protokoll.

### 1.2 Varianten (Muster)

| | A (Vorschlag) | B |
|---|---|---|
| Tag antippen | übernimmt und schließt | übernimmt und schließt |
| leeres Feld, Tag antippen | übernimmt und schließt | übernimmt und schließt |
| Monat oder Jahr an den Rädern ändern | bleibt offen (man will danach noch den Tag wählen) | schließt sofort – man muss neu öffnen |
| Tippen mit Tastatur (iPad mit Tastatur) | bleibt offen (sonst schließt es nach der ersten Ziffer) | schließt nach der ersten Ziffer |

**Empfehlung A.**

### 1.3 Fall-Liste (jeder Fall wird eine automatische Prüfung, neu `checkDatePick` in `ablauf.mjs`)

| Nr. | Gerät / Lage | Handlung | Erwartet |
|---|---|---|---|
| D-1 | iPad und iPhone, quer und hoch, hell und dunkel | Tag ändern (gleicher Monat) | Wert übernommen, Feld ohne Fokus (Auswahl zu) |
| D-2 | alle | leeres Feld bekommt ein Datum | übernommen, Auswahl zu |
| D-3 | alle | Monat oder Jahr ändern | übernommen, Auswahl bleibt offen (Fokus bleibt) |
| D-4 | iPad mit Tastatur | Ziffer tippen (keydown) | Fokus bleibt |
| D-5 | alle | ‚Zurücksetzen‘ (Wert leer) | Feld leer, Auswahl bleibt offen |
| D-6 | Fenster ‚Einstellungen‘ (Von, Bis) | Tag wählen | Häkchen wird blau (Änderung erkannt, R-4.4), Fenster bleibt offen |
| D-7 | Fenster mit Datum und Tastatur | nach dem Schließen | Fenster springt nicht, Kopfzeile bleibt (R-4.5) |
| D-8 | – | Gegenprobe | ohne die Änderung rot (D-1, D-2) |

- **Allgemeine Regel:** R-5.1 ergänzen: ‚Datumsfelder: Tag antippen übernimmt und schließt die Auswahl; Monat und Jahr ändern
  lässt sie offen.‘ Baustein in `ui.js` für alle Datumsfelder aller Apps (keine Zeile im Reiselogbuch).
- **Nur am Gerät (Prüfliste):** schließt Safari die Auswahl wirklich – iPhone und iPad, im Fenster ‚Einstellungen‘.

---

## Thema 2 – Messung (A-31, A-34)

### 2.1 Messung am Gerät (zuerst, vor dem Bau – Zusammenarbeit 0 Nr. 20)

A-34 braucht Messungen **iPhone quer** und **iPad** (hoch ist schon gemessen, P-58/6). Dieselben Messdateien sind die ersten
Vorgaben für A-31. Gemessen wird jeweils ein Ablauf (Messmodus 15.21):

1. Suche: Lupe, Wort tippen, ⓧ, noch einmal tippen, Tastatur schließen.
2. Fenster: einen Tag öffnen, das unterste Feld (z. B. ‚Ort‘) antippen, ein paar Buchstaben tippen, Fenster schließen.
3. Gesamtausgaben (ganz unten im Inhalt) antippen, Betrag tippen, Eingabetaste.

### 2.2 A-34 `--vv-top` entfernen

- **Heute:** `placeDialogs` setzt `--vv-top` = `visualViewport.offsetTop`; der Rahmen `#app` und die Fenster stehen dort.
- **Seit 4.27.0 rollt die Seite nie;** gemessen (iPhone hoch) ist `offsetTop` immer 0.
- **Entscheidungsregel:** zeigen alle Messungen (2.1, quer und iPad, auch Fenster und Gesamtausgaben mit Tastatur) in jeder Zeile
  `vt` 0, fällt `--vv-top` weg (Rahmen und Fenster oben bei 0). Zeigt eine Zeile etwas anderes, bleibt `--vv-top` und A-34 wird
  mit Begründung geschlossen.

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| V-1 | alle Ansichten, nach jedem Schritt | `--vv-top` ist nirgends mehr gesetzt, Rahmen oben bei 0 | Grundregel in `hig.mjs` |
| V-2 | Fenster mit Tastatur (iPhone hoch, quer, iPad) | Fenster oben im sichtbaren Bereich, Kopfzeile sichtbar | `tastatur.mjs` (besteht) |
| V-3 | Messungen abgespielt (A-31) | Kopf- und Suchzeile wie gemessen | A-31 |

### 2.3 A-31 Messung abspielen

Eine Messdatei (`messung-….txt`) wird in einer Prüfung **nachgespielt**: die Prüfung macht genau, was am Gerät geschah, und
Safari verhält sich dabei so, wie das Gerät es gemessen hat.

| Nr. | Fall | Erwartet |
|---|---|---|
| M-1 | Datei einlesen | Kopf (Gerät, Bildschirm, hell/dunkel) → Ansicht; Spaltenzeile → Werte je Zeile; Fehler bei fremdem Format mit Zeilennummer |
| M-2 | Ereignisse nachspielen | `tippen <id>` → Antippen, `focus`/`blur`, `eingabe <Länge>` → so viele Buchstaben eines Prüfworts tippen bzw. löschen, `drehen` → Ansicht drehen, zeitlich in derselben Reihenfolge |
| M-3 | Safari wie gemessen | `vh` (Höhe) und `vt` (`offsetTop`) aus der Datei steuern `visualViewport` (statt der festen Werte im Safari-Modell), mit 2 Bildern Verzögerung wie gemessen |
| M-4 | Vergleich | in jeder nachgespielten Zeile: Kopfzeile und Suchzeile auf ±1 px wie gemessen, Fokus wie gemessen; Inhalt (Tage) wird nicht verglichen, er hängt an den eigenen Daten |
| M-5 | Gegenprobe | eine absichtlich verschobene Messung (Suchzeile +20 px) wird rot |
| M-6 | Ablage | Messdateien enthalten keine Texte (nur Längen, ids, Zahlen, Gerät, iOS-Version); sie liegen in `AppDesign/tests/messungen/`, jede Datei läuft im vollen Lauf mit |

- **Werkzeug:** neu `tests/abspielen.mjs` (`spieleAb(p, datei, { wort })`), aufgerufen von `ablauf-messung.mjs` im Reiselogbuch.
- **Grenze:** was die Messung nicht aufzeichnet (Wischen, Lage des Fingers), kann sie nicht nachspielen; dafür bleibt das
  Safari-Modell.

---

## 3. Fragen an dich

1. **A-26:** Variante A oder B (nach dem Ausprobieren im Muster)? Schließt die Auswahl am iPhone und am iPad überhaupt?
2. **A-26:** R-5.1 als allgemeine Regel ergänzen (alle Apps)?
3. **A-34/A-31:** Messungen quer und iPad wie in 2.1 machen und hier teilen; die Messdateien dürfen in
   `AppDesign/tests/messungen/` liegen (keine Texte, nur Gerät, iOS-Version und Zahlen)?
4. **Ja zum Bau** als AppDesign 4.28.0 / Reiselogbuch 3.26.0, sobald 1–3 geklärt sind.

## 4. Entscheidungen des Nutzers 19.10.2026

- **Bündel:** A-26 + A-31 + A-34 in einer Version, Arbeit in Sitzung 0018 begonnen.
- **A-26 allgemeine Regel: Ja** – R-5.1 wird ergänzt (alle Apps).
- Offen: Variante A/B nach dem Muster, Messungen iPhone quer und iPad, Ablage der Messdateien, Ja zum Bau.

## 5. Ergebnisse vom Gerät (19.10.2026)

**A-26 Muster (Protokoll iPad, Safari 26.6.2):**
- Das Verlassen des Felds (`blur()`) **schließt die Auswahl** – B schloss jedes Mal. Machbar.
- **A versagt:** Auf dem iPad blättert man mit ‹ › in einen anderen Monat und tippt dort einen Tag – das ändert Monat **und** Tag
  (10-19 → 11-20, leer-Feld 10-19 → 11-17). A hielt das für ‚Monat am Rad geändert‘ und blieb offen.
- Die Räder ändern den Wert sofort, aber nur Monat oder Jahr – der Tag bleibt (B: 2027-06-08 → 2030-06-08, schloss zu früh).
- **Neu Variante C:** schließen, sobald sich der **Tag des Monats** ändert (oder ein leeres Feld ein Datum bekommt); bleibt offen,
  wenn nur Monat oder Jahr ändern. Gegen das Protokoll nachgespielt: schließt bei jedem angetippten Tag, bleibt beim Rad offen.
  Grenze: am Rad vom 31. auf einen kürzeren Monat (Safari setzt z. B. den 30.) schließt C – selten.
- Muster `arbeit/A-26 Muster.html` jetzt mit Heute, C und B. iPhone noch nicht ausprobiert.

**Messung iPhone quer (Reiselogbuch 3.25.1, Home-Bildschirm, iOS 18.7 / Safari 26.6.2):**
- **A-34 entschieden – `--vv-top` bleibt:** quer ist `offsetTop` nicht 0 – Suche 21 bzw. 42 px, Feld im Fenster 225 px,
  Gesamtausgaben 232 px; Safari rollt dabei auch das Fenster (`scrollY` = `offsetTop`), obwohl die Seite selbst nie rollt.
  `--vv-top` gleicht genau das aus (Kopfzeile 0, Suchzeile 62 in jeder Zeile). Ohne `--vv-top` stünde die Kopfzeile um bis zu
  232 px über dem Bildschirm. A-34 wird geschlossen.
- **Neuer Fehler (A-35):** Gesamtausgaben antippen (ganz unten im Inhalt) – die Tastatur (sichtbar 170 px) verdeckt das Feld.
  Safari will das Feld zeigen und rollt dafür das **Fenster** um 232 px; weil der Rahmen dem sichtbaren Bereich folgt
  (`--vv-top`), bleibt das Feld, wo es war – unter der Tastatur. Der **Inhalt** (Rollbereich) wird nicht gerollt (`inh` bleibt
  1690). Seit 4.27.0 (A-28 B1, vorher rollte Safari die ganze Seite und das Feld kam in Sicht). Felder in Fenstern sind nicht
  betroffen (dort rollt `ui.js` das Feld in den sichtbaren Teil).
  Warum die Prüfungen es übersehen haben: `checkEnterDone` tippt Gesamtausgaben an, misst aber nicht, ob das Feld über der
  Tastatur sichtbar ist; das Safari-Modell kennt das Rollen des Fensters zum angetippten Feld nicht.
  **Vorschlag:** wie in Fenstern – geht die Tastatur auf und liegt das Feld mit Fokus im Rollbereich unter ihr, rollt `ui.js` den
  Inhalt, bis das Feld 16 px über der Tastatur steht (allgemein, alle Felder im Inhalt). Safari-Modell: neues Verhalten ‚Feld unter
  der Tastatur antippen → Safari rollt das Fenster um den gemessenen Betrag‘; Prüfung `checkFieldVisible` zuerst rot gegen 4.27.1.
- **A-31:** die Messdatei ist die erste Vorgabe zum Abspielen (Suche, Fenster, Gesamtausgaben – alles enthalten).

## 6. Entscheidungen des Nutzers 19.10.2026 (nach den Ergebnissen)

- **A-35 kommt ins Bündel 4.28.0** (A-35 + A-26 Variante C + A-31; A-34 entfällt).
- **Messdatei darf in `tests/messungen/` liegen:** `tests/messungen/2026-10-19 iPhone quer Suche Fenster Gesamtausgaben.txt`
  (iPhone quer, Reiselogbuch 3.25.1; Suche, Feld ‚Ort‘ im Fenster, Gesamtausgaben).
- **Ja zum Bau: noch nicht** – zuerst Variante C am Gerät (iPhone und iPad) ausprobieren.

## 7. Zweiter Versuch Variante C (Protokoll iPad, 19.10.2026)

- **Nicht ok beim leeren Feld:** Safari trägt beim Öffnen eines leeren Datumsfelds sofort das heutige Datum ein (`input` 64 ms
  nach `focus`). C hielt das für ‚leeres Feld bekommt ein Datum‘ und schloss sofort.
- **Bestätigt:** Rad nur Monat (23. → 23.12., 19.12. → 19.04.) bleibt offen; jeder angetippte Tag schließt, auch in anderen Monaten.
- **Grenzfall gesehen:** Rad vom 31.10. in den Februar setzt Safari auf den 28. – C schloss.
- **Angepasst (C2):** ein Datum, das innerhalb von 400 ms nach dem Öffnen eines leeren Felds kommt, schließt nicht; ein Wechsel
  vom höheren Tag auf den letzten Tag eines anderen Monats gilt als Rad und schließt nicht. Beide Protokolle nachgespielt: alles
  wie erwartet. Fall-Liste ergänzt: **D-2a** leeres Feld öffnen (Safari setzt heute) – bleibt offen; **D-3a** Rad vom 31. in einen
  kürzeren Monat – bleibt offen.

## 8. Dritter Versuch (Protokoll iPad, 19.10.2026) – noch die alte Fassung

- Das Protokoll stammt noch vom **Muster vor C2** (Zwischenspeicher bzw. Pages noch nicht fertig): es fehlt die Zeile
  ‚(Safari setzt heute – bleibt offen)‘, und 31.01. → 28.02. am Rad schloss – beides behandelt C2 anders. C2 gegen dieses Protokoll
  nachgespielt: das leere Feld bliebe beim Öffnen offen (Safari setzte heute nach 39 ms), 31.01. → 28.02. bliebe offen.
- Rückmeldung des Nutzers: ‚schleppend und hackig‘. Die App schließt 1–2 ms nach dem Antippen (`input` → `blur`); das Zu- und
  Wiederaufgehen ist die Animation von Safari und lässt sich von der App nicht beschleunigen.
- **Nächster Versuch:** Link mit `?v=c2` (umgeht den Zwischenspeicher). Danach entscheidet der Nutzer, ob A-26 gebaut wird oder
  entfällt (Apple lässt die Auswahl offen).

## 9. Vierter Versuch C2 (Protokoll iPad, 19.10.2026) – ok

- **Nutzer: ‚C2 habe ich getestet und ist ok.‘** Protokoll iPad (Safari 26.6.2, meldet sich als Macintosh):
  - Feld C: jeder angetippte Tag schließt (10-19 → 10-16, → 10-30, → 10-31, → 2027-06-26 in einem anderen Monat), Rad nur Monat
    (2027-06-26 → 09-26) bleibt offen, danach Tag 16 schließt.
  - Leeres Feld C: Safari setzt beim Öffnen heute (61 ms nach `focus`) – **bleibt offen** (D-2a erfüllt); danach schließt jeder Tag
    (zwölfmal, auch 31.); Rad Monat (06-28 → 12-28, 12-19 → 02-19) und Jahr (2027 → 2035) bleiben offen; der Tag 28.02.2035
    angetippt schließt.
- Nicht in diesem Protokoll: Rad vom 31. in einen kürzeren Monat (D-3a; im 3. Versuch nachgespielt) und iPhone – beides kommt in
  die Prüfliste von 4.28.0.
- **Fragen des Nutzers vor dem Bündel** (Apple-Empfehlung, andere Apps, Zeitraum durch Ziehen): Antworten in
  `arbeit/A-26 Datumserfassung Apple und andere Apps.md` – C2 verbaut nichts; Vorschlag R-5.1-Wortlaut und neuer Punkt A-36
  (Zeitraum-Kalender).

## 10. Fall-Liste A-35 – Feld im Inhalt über der Tastatur (Prüfung zuerst rot gegen 4.27.1)

Vorschlag aus Abschnitt 5: geht die Tastatur auf und liegt das Feld mit Fokus im Rollbereich (`#rolle`) unter ihr oder unter der
Suchzeile, rollt `ui.js` den **Inhalt**, bis das Feld ganz sichtbar ist und 16 px über der Tastatur steht – wie heute in Fenstern.
Allgemein für alle Felder im Inhalt aller Apps (keine Zeile im Reiselogbuch).

| Nr. | Gerät / Lage | Handlung | Erwartet | Prüfung |
|---|---|---|---|---|
| F-1 | iPhone quer (sichtbar 170 px, wie gemessen) | Gesamtausgaben (unterstes Feld) antippen | Feld ganz sichtbar, Unterkante ≥ 16 px über der Tastatur; Kopf- und Suchzeile fest (R-2.1) | neu `checkFieldVisible` (`ablauf.mjs`) |
| F-2 | iPhone hoch, iPad quer und hoch | dasselbe | dasselbe | `checkFieldVisible` |
| F-3 | alle | Feld liegt schon sichtbar über der Tastatur | Inhalt rollt nicht (Rollstand gleich) | `checkFieldVisible` |
| F-4 | alle | Tastatur schließen (Eingabetaste, R-5.5) | Inhalt bleibt, wo er ist; Seite rollt nie (Grundregel) | `checkFieldVisible`, Grundregel |
| F-5 | alle | mit ⌃ ⌄ über der Tastatur zum nächsten Feld | das neue Feld wird ebenso sichtbar | `checkFieldVisible` |
| F-6 | alle | unterstes Feld, Inhalt kurz | genug Platz zum Rollen (Platzhalter `.rolle::after`, A-33) | `checkFieldVisible` |
| F-7 | iPhone hoch und quer | Kapsel ‚Nach oben / Ans Ende‘ dabei | Kapsel überdeckt das Feld nicht (R-3.2, A-33) | `checkFab` |
| F-8 | Felder in Fenstern | antippen mit Tastatur | unverändert (rollt wie heute) | `tastatur.mjs` (besteht) |
| F-9 | Safari-Modell | Feld unter der Tastatur antippen | Safari rollt das **Fenster** um den gemessenen Betrag (`offsetTop` 232 px), `--vv-top` gleicht aus – genau der Ablauf der Messung | `tests/safari.mjs` (neu: Rollen zum Feld) |
| F-10 | Gegenprobe | `checkFieldVisible` gegen 4.27.1 | **rot** (F-1), danach grün | `--gegenprobe` |
| F-11 | A-31 | Messdatei abspielen (Gesamtausgaben-Teil) | Feld über der Tastatur | `ablauf-messung.mjs` |

- **Allgemeine Regel (Zusammenarbeit 0 Nr. 3/4):** ergänzt eine bestehende – Designrichtlinie ‚Bei sichtbarer Tastatur … das
  angetippte Feld wird in den sichtbaren Teil gerollt‘ und R-4.5 gelten bisher nur für Fenster; neu: **auch für den Inhalt der
  Hauptansicht**. Frage an dich: so festhalten?
- **Nur am Gerät (Prüfliste):** iPhone quer und hoch, iPad: Gesamtausgaben antippen – Feld über der Tastatur.
- **Warum es die Prüfungen übersehen haben:** `checkEnterDone` tippt Gesamtausgaben an, misst aber nicht, ob das Feld sichtbar ist;
  das Safari-Modell kannte das Rollen des Fensters zum Feld nicht (Abschnitt 5).

## 11. Offene Fragen vor dem Bau (19.10.2026)

1. **A-36 Zeitraum-Kalender** als neuen Backlog-Punkt aufnehmen (Empfehlung: Prio 2, offen; nicht im Bündel)?
2. **R-5.1-Wortlaut** ‚Datumsauswahl: sie schließt, sobald die Eingabe vollständig ist – beim Einzeldatum nach dem Antippen des
   Tages; Blättern in Monat und Jahr lässt sie offen‘?
3. **A-35 als allgemeine Regel:** ‚Ein Feld mit Fokus steht immer ganz über der Tastatur – in Fenstern und im Inhalt‘ (R-4.5 und
   Designrichtlinie ergänzen)?
4. **Ja zum Bau** AppDesign 4.28.0 / Reiselogbuch 3.26.0 (A-35, A-26 C2, A-31)?

## 12. Grenzen von C2 – lässt sich der 31. beheben? (20.10.2026)

**Nutzer 20.10.2026:** ‚Wenn in der Datumserfassung nicht alles funktioniert, bauen wir die Datumserfassung so nicht ein.‘
Frage: 31.10. beheben, und geht am iPhone alles analog?

**Der Fall 31. lässt sich nicht beheben.** Safari meldet der App aus seinem Kalender nur den neuen Wert (`input`/`change`), keine
Berührung und nicht, ob Tage oder Räder sichtbar sind. ‚31.10. → am Rad November‘ (Safari setzt 30.11.) und ‚31.10. → mit › in den
November blättern, 30. antippen‘ ergeben exakt dasselbe Ereignis mit demselben Wert. Die App muss raten; C2 rät ‚Rad‘ (bleibt offen).

**Alle Fälle, in denen C2 nicht schließt, obwohl ein Tag angetippt wurde** (keiner ist behebbar, alle aus demselben Grund):

| Nr. | Fall | Häufigkeit | Folge |
|---|---|---|---|
| G-1 | Feld steht auf einem höheren Tag, im anderen Monat dessen letzten Tag antippen (31.10. → 30.11., 30.01. → 28.02.) | selten | bleibt offen (wie heute) |
| G-2 | den schon gewählten Tag noch einmal antippen | gelegentlich | kein Ereignis – bleibt offen (wie heute) |
| G-3 | leeres Feld öffnen und **heute** antippen (Safari hat heute schon eingetragen) | gelegentlich | kein Ereignis – bleibt offen (wie heute) |

**Wo C2 sich auf eine Zeitannahme stützt:** ‚Safari setzt heute beim leeren Feld innerhalb von 400 ms‘ (gemessen 39–64 ms). Wäre
Safari einmal langsamer (altes Gerät, viel Last) oder ändert Apple das Verhalten in einem iOS-Update, schlösse die Auswahl beim
Öffnen sofort – der Fehler aus dem 2. Versuch käme zurück. Prüfbar ist das nur am Gerät, nicht automatisch.

**iPhone:** gleiche Safari-Version, gleicher Kalender von iOS – vermutlich gleich, aber **nicht belegt**: alle vier Protokolle
stammen vom iPad. Ob `blur()` am iPhone den Kalender schließt und wie schnell Safari dort heute einträgt, zeigt nur ein Protokoll
vom iPhone.

**Folge für die Entscheidung:** C2 kann nie *alles* – G-1 bis G-3 bleiben, und die 400 ms sind eine Annahme über Safari. Kein Fall
speichert einen falschen Wert; im schlechtesten Fall bleibt die Auswahl offen wie heute. Vollständig (und automatisch prüfbar)
ginge ‚Tag antippen schließt‘ nur mit einem **eigenen Kalender** der App (`arbeit/A-26 Datumserfassung Apple und andere Apps.md`
Abschnitt 3.2) – zusammen mit dem Zeitraum (A-36).
