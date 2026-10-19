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
