# A-61 Teil 1 ‚Navigation und Gesten‘ – Apple-Abgleich, Varianten, Fall-Liste

**Stand 22.10.2026** · Sitzung ‚Reiselogbuch 0029‘ · **gewählt: Überall, allgemeine Regel, Ja zum Bau** (Nutzer 22.10.2026) ·
Muster: `arbeit/A-61 Teil 1 Muster.html`
(https://g811141a.github.io/AppDesign/arbeit/A-61%20Teil%201%20Muster.html), Prüfung `arbeit/A-61 Teil 1 Muster prüfen.mjs`

Teil 1 umfasst T-4 Seitenwechsel als Schieben, T-5 Zurückwischen, T-6 Seitenleiste hereinwischen, T-35 Gesten mit Vorrang und
A-59 ohne Ruckeln. Teil 2 ist das Blatt (T-15); die Wischaktionen (T-10) kommen erst mit A-30 (Nutzer 22.10.2026).

## 1. Heute (15.4, 15.17)

- iPhone: Startliste und Inhalt wechseln **ohne Übergang**; zurück nur mit dem runden Zurück-Knopf.
- iPad hoch: Die Seitenleiste kommt nur mit panel-left und liegt dann abgedunkelt über dem Inhalt; sie schließt nach der Auswahl
  oder beim Antippen der Abdunkelung.
- Gesten gibt es nur für langes Drücken und das Schließen der Tastatur beim Wischen – keine gemeinsame Regel.

## 2. Apple-Abgleich (iOS 26)

| Was | So macht es Apple | Für uns |
|---|---|---|
| Seitenwechsel (T-4) | Die neue Seite schiebt sich von rechts herein, die alte weicht etwa ein Drittel nach links und dunkelt leicht ab; zurück umgekehrt. Mit ‚Bewegung reduzieren‘ wird überblendet. | nachbauen (`transform`, ~0,35 s) |
| Zurückwischen (T-5) | Klassisch vom linken Rand (`interactivePopGestureRecognizer`); **seit iOS 26 zusätzlich von überall im Inhalt** (`interactiveContentPopGestureRecognizer`), ausgenommen Elemente mit eigener Geste (Regler, waagerecht rollende Bereiche). Die Seite folgt dem Finger; fertig nach halber Breite oder schnellem Wischen, sonst federt sie zurück. | Variante **Rand** bzw. **Überall** |
| Seitenleiste (T-6) | iPad hoch: Wischen vom linken Rand holt die Seitenleiste herein, nach links wischen schiebt sie weg; Antippen daneben schließt. Ob iPadOS 26 sie auch aus der Mitte holt, ist nicht belegt. | Rand: nur vom Rand · Überall: auch aus der Mitte (Festlegung des Nutzers 22.10.2026: am iPad ist die Seitenleiste die Liste) |
| Vorrang (T-35) | Das System entscheidet: Rollen und eigene Gesten von Elementen vor dem Zurückwischen. | eine Stelle im Code; senkrecht entscheidet der Browser (`touch-action: pan-y`) |

Quellen: [Apple-Forum – iOS 26 swipe to navigate back](https://developer.apple.com/forums/thread/791605),
[MobileSyrup – iOS 26 back gesture](https://mobilesyrup.com/2025/06/10/apple-ios-26-improve-iphone-back-gesture/),
[HIG – Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures).
**Web:** Die Gesten funktionieren nur in der Home-Bildschirm-App sauber; in Safari selbst gehört das Wischen vom linken Rand Safari
(eine Seite zurück im Verlauf) – das Muster deshalb vom Home-Bildschirm aus prüfen.

## 3. Varianten im Muster (Umschalter in der Startliste bzw. Seitenleiste: Heute · Rand · Überall)

| | Seitenwechsel | Zurück am iPhone | Seitenleiste am iPad hoch | Vorteil | Nachteil |
|---|---|---|---|---|---|
| **Heute** | ohne Übergang | nur Knopf | nur Knopf | bekannt | wirkt nicht wie eine Apple-App |
| **Rand** | Schieben | Knopf und Wischen vom linken Rand (24 px) | zusätzlich Wischen vom Rand / nach links | klassisch iOS, kein versehentliches Zurück | Rand mit dem Daumen schwer zu treffen (große iPhones) |
| **Überall** | Schieben | Knopf und Wischen von überall im Inhalt | Wischen nach rechts von überall im Inhalt (Nutzer 22.10.2026) | wie iOS 26, mit dem Daumen bequem | versehentliches Zurück beim schrägen Wischen möglich |

Gemeinsam: fertig nach halber Breite oder schnellem Wischen (über 0,3 px/ms in den letzten 100 ms), sonst zurück; der Bilderstreifen
und das Rollen haben Vorrang (Entscheidung nach 10 px: deutlich waagerecht – mehr als 1,2 × so weit wie senkrecht – in der
richtigen Richtung); der Rollstand der Startliste bleibt; ‚Bewegung reduzieren‘ überblendet.

**Gewählt: Überall** (Nutzer 22.10.2026, alle Prüfpunkte ok). Festlegungen dabei: am iPad hoch holt Wischen nach rechts von
überall im Inhalt die Seitenleiste (Prüfpunkt 9); nach der Auswahl eines Eintrags schließt sie sich weiter wie heute und wie
Apple (15.4, bestätigt).

## 4. Fall-Liste Überall (für den Bau)

Jeder Fall wird eine automatische Prüfung (Chromium und WebKit, hell und dunkel), Ausnahmen in der Prüfliste. Im Muster schon
geprüft: F-1, F-2, F-3, F-4, F-5, F-6, F-7, F-8, F-9 (Teil), F-11, F-12.

| Nr. | Fall | Erwartet |
|---|---|---|
| F-1 | iPhone hoch/quer: Eintrag antippen | Inhalt schiebt sich herein, Startliste weicht nach links; Titel stimmt |
| F-2 | Zurück-Knopf | Inhalt schiebt sich hinaus; zuletzt geöffneter Eintrag blau (R-7.2); Rollstand der Startliste wie vorher (T-7) |
| F-3 | Wischen vom linken Rand über die halbe Breite, langsam | zurück |
| F-4 | halb ziehen, innehalten, loslassen | Seite folgt dem Finger, beide Seiten sichtbar; federt zurück, Inhalt bleibt offen |
| F-5 | kurz und schnell vom Rand wischen | zurück |
| F-6 | aus der Mitte nach rechts wischen | Rand: nichts · Überall: zurück |
| F-7 | senkrecht oder schräg (mehr senkrecht) wischen | rollt, kein Zurück |
| F-8 | im Bilderstreifen (waagerecht rollender Bereich) wischen | Streifen rollt, kein Zurück |
| F-9 | nach links wischen; Wischen auf Knöpfen und Kapseln | nichts |
| F-10 | Wischen, während der Inhalt noch weich rollt (A-37 ‚Ans Ende‘) | Rollen stoppt, Wischen gilt |
| F-11 | iPad hoch: vom linken Rand nach rechts wischen | Seitenleiste folgt dem Finger, Abdunkelung wächst mit; fertig nach halber Breite |
| F-12 | iPad hoch: auf der Seitenleiste oder der Abdunkelung nach links wischen · Abdunkelung antippen · aus der Mitte des Inhalts nach rechts wischen | Seitenleiste geht; aus der Mitte kommt sie bei Überall, bei Rand nicht |
| F-13 | iPad quer | Seitenleiste fest wie heute, Wischen ändert nichts (panel-left bleibt) |
| F-14 | Drehen während des Ziehens bzw. der Bewegung | Bewegung bricht ab, Zustand wie vor dem Ziehen (R-8.1: ein Zustand, nur Tippen bzw. fertiges Wischen ändert ihn) |
| F-15 | Fenster, Menü oder Sprechblase offen | keine Wischgeste; Menü bzw. Sprechblase schließt beim Antippen wie heute |
| F-16 | Tastatur offen (Suche, Feld im Inhalt) | Zurückwischen schließt erst die Tastatur, dann zurück (wie der Knopf, A-36) |
| F-17 | Langes Drücken (Kontextmenü) und Ziehen nach dem Halten | Kontextmenü wie heute; Wischen nach dem Halten löst kein Zurück aus |
| F-18 | Schnellroll-Griff (A-37) am rechten Rand ziehen | Griff gilt, kein Zurück |
| F-19 | ‚Bewegung reduzieren‘ | Überblenden statt Schieben, auch beim Wischen |
| F-20 | VoiceOver | Zurück-Knopf und panel-left bleiben; Drei-Finger-Wischen bzw. ‚Zurück‘-Geste (Z-Geste) ruft Zurück auf |
| F-21 | ohne Ruckeln (A-59) | nur `transform` und `opacity` je Bild, Messen und Ändern gebündelt; Prüfung misst die Bildfolge beim Ziehen |
| F-22 | nur am Gerät (Prüfliste) | Gefühl beim Wischen (Folgen, Federn, Tempo), Rand mit dem Daumen, versehentliches Zurück bei Überall, Home-Bildschirm-App |

## 5. Danach

Gewählte Variante → neue Regel im Katalog (Abschnitt 7 ‚Seitenleiste und Liste‘ bzw. 2) mit Prüfung, Designrichtlinie 15.4,
15.17, 13 (Safari: Randgeste nur in der Home-Bildschirm-App); Baustein in `ui.js` (eine Gestenstelle für alle Gesten, T-35), dann
Teil 2 (Blatt). **Bau als AppDesign 4.30.0 / Reiselogbuch 3.28.0 zusammen mit A-37 B+C** (Ja des Nutzers 22.10.2026).
