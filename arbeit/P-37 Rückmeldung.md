# P-37 – Rückmeldung und Testfall-Liste der Korrektur

**Stand 14.10.2026** · Sitzung ‚Reiselogbuch 0004‘ · AppDesign 4.14.1 · Reiselogbuch 3.13.1

Rückmeldung: alles ok **bis auf 2 und 3**.

## Fund P-37/2 – Quartier-Kopf im iPhone-Querformat

- **Gemessen (iPhone quer, 852 × 393):** ‚Quartier wie Vortag‘ steht neben der Überschrift, ‚keinen Google-Maps Link‘ rutscht
  allein in die nächste Zeile – obwohl 800 px Platz sind und alle drei zusammen nur etwa 510 px brauchen.
- **Ursache:** `design.css` (allgemein, iPhone-Ansicht): Die Überschrift eines Schritts ist mindestens 60 % breit
  (`flex: 1 0 60%`), die Schaltflächen brechen einzeln um. **Schon vor 3.13 so** – nicht durch die feste Fassung entstanden.
- **Warum keine Prüfung es fand:** Keine Regel sagt, dass die Schaltflächen eines Schrittkopfs zusammenbleiben.
- **Korrektur (ein Muster, kleine Korrektur):** Die Schaltflächen bilden eine Gruppe. Passt die Gruppe neben die Überschrift
  (Querformat, iPad), steht alles in **einer** Zeile; sonst kommt die **ganze Gruppe** unter die Überschrift (Hochformat –
  dort reicht die Breite nicht für beide nebeneinander, also wie bisher untereinander).
- **So macht es Apple:** In Einstellungen und Formularen stehen Bedienelemente einer Zeile rechts neben ihrer Beschriftung,
  solange Platz ist; erst bei zu wenig Platz rücken sie gemeinsam darunter (z. B. große Schrift, Hochformat).
- **Regelkatalog:** betrifft Komponente Schrittkopf (Designrichtlinie 15); neue Prüfung ‚Schrittkopf: Schaltflächen
  zusammen; passt alles in eine Zeile, steht es in einer Zeile‘ – als Ergänzung einer bestehenden Regel oder neue R-Nummer
  (wird beim Bau mit dem Katalog abgeglichen, 0 Nr. 3).

Bilder: `arbeit/bilder/P-37 Quartier quer vorher.png` und `… Muster.png`.

## Fund P-37/3 – iPad startet offline mit weißer Seite

- **Deine Meldung:** iPhone offline (Flugmodus, ohne WLAN) einwandfrei; iPad im Flugmodus und ohne WLAN nur weiße Seite.
- **Nachgebaut** (lokaler Webserver mit echtem Service Worker, Chromium): Die App startet offline auf iPad und iPhone; im
  Speicher liegen alle 7 Dateien (App und Fassung 4.14.1). Beim Start fragt die App nichts im Netz ab. WebKit lässt sich in
  der Testumgebung mit Service Worker nicht offline schalten – Safari kann ich hier also nicht nachbilden.
- **Weiße Seite heißt:** Der Service Worker hat beim Start auf dem iPad nichts aus dem Speicher geliefert. Die genaue
  Ursache auf deinem iPad kann ich aus der Ferne nicht nachweisen. Wahrscheinlich (eins davon):
  1. Die Seite fragt **zuerst das Netz** und wartet; liefert das iPad keinen sofortigen Fehler, bleibt die Seite weiß.
  2. Das iPad öffnet die App unter einer **anderen Adresse** als der gespeicherten (z. B. älteres Symbol auf dem
     Home-Bildschirm), dann findet der Speicher nichts.
  3. Der neue Service Worker war auf dem iPad noch nicht fertig eingerichtet, als du offline gegangen bist.
- **Warum keine Prüfung es fand:** Die Prüfungen laden die App als Datei – ohne Service Worker; ‚offline‘ wurde nie
  automatisch geprüft (nur Testfälle am Gerät, F-c).
- **Korrektur (robust gegen alle drei):**
  - Fassung (unveränderlich) **zuerst aus dem Speicher**, die App selbst aus dem Netz mit **höchstens 3 s Wartezeit**, dann
    aus dem Speicher.
  - Beim Öffnen der App ohne Netz liefert der Service Worker **immer** die gespeicherte App, egal unter welcher Adresse.
  - Beim Einrichten alle Dateien frisch holen; der neue Service Worker übernimmt sofort.
  - **Neue Prüfung** `offline.mjs`: lokaler Webserver mit Service Worker, iPad quer/hoch und iPhone hoch/quer – Start offline,
    Start mit anderer Adresse (`index.html?…`), Start mit hängendem Netz (muss nach höchstens 3 s aus dem Speicher kommen).
    Erst rot (mit dem heutigen sw.js beim hängenden Netz), dann grün.
  - Am Gerät bleibt: P-38/… Flugmodus iPad und iPhone.

## Neuer Wunsch – Offline-Hinweis (Backlog, zuerst Muster)

- Wunsch: kurzer Hinweis, wenn die App offline arbeitet, oder eine kleine, gut sichtbare Dauer-Anzeige, z. B. ganz unten.
- **So macht es Apple:** Musik zeigt oben ein Band ‚Du bist offline‘; Mail zeigt den Zustand klein in der unteren Leiste der
  Liste; Notizen zeigt nichts (arbeitet still weiter). Vorschlag für die Muster: a) kleine graue Zeile ganz unten in der
  Seitenleiste bzw. Startliste (wie Mail), b) Band oben, c) a + kurze Meldung beim Wechsel offline/online.
- Kein Teil der Korrektur (neues Verhalten → zuerst Muster mit Varianten, Zusammenarbeit 0 Nr. 6).

## Versionen

| Version | Inhalt (höchstens 2 Themen) |
|---|---|
| **AppDesign 4.14.2 · Reiselogbuch 3.13.2** (Korrektur) | Thema 1 Schrittkopf (design.css allgemein, App: Gruppe um die Schaltflächen), Thema 2 Offline-Start (sw.js, Prüfung `offline.mjs`) |
| später | Offline-Hinweis (nach Muster) |
