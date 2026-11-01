# APD-107 – Wortlaut (bestätigt)

Stand 01.11.2026 · Sitzung Reiselogbuch 0071 · **Ja des Nutzers zum Wortlaut, allgemein (Designrichtlinie allgemein), Bau 4.48.2: Ja**
(0 Nr. 4, 21, 29) · Muster `arbeit/APD-107 Muster.html`, Variante C · Testfall-Liste `arbeit/APD-107 Testfall-Liste.md` S-1 bis S-13

## Designrichtlinie allgemein, Abschnitt 4 ‚Berühren‘ (R-3.6)

**Alt:** „Solange der Finger auf einer Schaltfläche liegt, wird sie blass (Icon und Text 35 %); eine Listen- oder Tabellenzeile wird
grau. Schaltflächen zeigen das sofort, in Rollbereichen erst nach 80 ms, damit beim Rollen nichts aufblitzt; wandert der Finger mehr
als 10 px oder rollt die Fläche, verschwindet es ohne Auslösen. …“

**Neu:** „Solange der Finger auf einer Schaltfläche liegt, wird sie blass (Icon und Text 35 %); ein Knopf einer Leiste (Kopfzeile,
Fenster-Kopfzeile, Seitenleiste, schwebende Knöpfe) hebt sich stattdessen als helle Fläche mit Schatten auf das 1,3-Fache über seine
Kapsel – neben dem Finger zu sehen, wie Liquid Glass in iOS 26 (‚Bewegung reduzieren‘: ohne Wachsen); eine Listen- oder Tabellenzeile
wird grau. Schaltflächen zeigen das sofort, in Rollbereichen erst nach 80 ms, damit beim Rollen nichts aufblitzt; wandert der Finger
mehr als 10 px oder rollt die Fläche, verschwindet es, und das Loslassen danach löst nichts aus – auch wenn der Finger noch liegt. …“
(der Rest des Absatzes bleibt gleich)

## Regelkatalog (17), R-3.6

Ergänzt um: ‚ein Leisten-Knopf hebt sich als helle Fläche mit Schatten (1,3-fach) über die Kapsel‘ und ‚das Loslassen danach löst
nichts aus, wie lange der Finger auch liegt‘. Prüfung bleibt `ablauf.mjs` (`checkBeruehren`).

## Ohne Regeländerung (Korrektur)

- 15.12: der helle Kreis des Smileys liegt über der Leiste – auch im modalen Fenster (Kreis hängt im offenen Fenster statt an `body`).

## Quellen (Apple-Abgleich, Sitzung 0071)

- iOS 26: Leisten-Knöpfe werden beim Antippen gedimmt statt ausgeblendet – https://developer.apple.com/forums/thread/787177
- Liquid Glass interaktiv: Skalieren, Federn, Aufleuchten bei Berührung (Entwickler-Anleitungen, keine Apple-Dokumentation) –
  https://www.donnywals.com/designing-custom-ui-with-liquid-glass-on-ios-26/ ,
  https://www.atelier-socle.com/en/articles/swiftui-liquid-glass-guide
