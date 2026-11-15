# APD-30 Wischaktionen – Muster und Apple-Abgleich

**Stand 15.11.2026** · Sitzung Reiselogbuch 0116 · Muster `arbeit/APD-30 Wischaktionen Muster.html` (Varianten A, B, C; nur hell, iPad quer)

## Link

https://g811141a.github.io/AppDesign/arbeit/APD-30%20Wischaktionen%20Muster.html

## Schritte am iPad (quer, hell)

1. Den Link in Safari öffnen. Erwartet: drei Spalten A, B, C mit je drei Kacheln.
2. In jeder Spalte eine Kachel ein Stück nach links wischen und loslassen. Erwartet: ‚Einstellen‘ und ‚Löschen‘ bleiben neben der Kachel stehen.
3. Auf die offene Kachel tippen. Erwartet: sie gleitet zurück, nichts wird geöffnet.
4. Eine Kachel weit nach links durchwischen. Erwartet: ‚Löschen‘ wird breit; nach dem Loslassen fragt die Sprechblase ‚… mit allen Einträgen löschen? …‘.
5. ‚Abbrechen‘ antippen. Erwartet: die Kachel gleitet zurück, alles bleibt.
6. Kachel öffnen, ‚Löschen‘ antippen, ‚Reiselogbuch löschen‘ bestätigen. Erwartet: erst jetzt verschwindet die Kachel.
7. Senkrecht über die Kacheln streichen. Erwartet: keine Kachel bewegt sich seitlich.

## Die Varianten

| | Aussehen | Vorbild |
|---|---|---|
| **A** | Runde Knöpfe neben der Kachel, nur Symbol: ‚Einstellen‘ hell wie unsere runden Schaltflächen, ‚Löschen‘ rot. Die Kachel bleibt rund. | iOS 26: Wischaktionen sind runde Knöpfe, die Zeile bekommt runde Ecken (Mail) |
| **B** | Wie A, unter jedem Knopf klein das Wort. | iOS 26 SwiftUI zeigt Symbol und Titel |
| **C** | Graue und rote Blöcke direkt an der Kachel, Symbol und Wort. | iOS bis 18 |

**Empfehlung: A.** Es entspricht iOS 26 und unseren runden Schaltflächen; die Symbole settings und trash kennt man aus dem Kontextmenü. B ist deutlicher, braucht aber mehr Breite. C wirkt neben Glas und runden Knöpfen alt.

## Apple-Abgleich (0 Nr. 23, 2.6)

- **So macht es Apple:** Wischaktionen stehen standardmäßig am hinteren Rand; ein volles Durchwischen löst die erste Aktion aus; eine zerstörende Aktion ist rot ([SwiftUI swipeActions](https://developer.apple.com/tutorials/data/documentation/swiftui/view/swipeactions(edge:allowsfullswipe:content:).md), [Use Your Loaf](https://useyourloaf.com/blog/swiftui-swipe-actions/)).
- **iOS 26:** Wischaktionen (`UIContextualAction`) erscheinen als runde Glas-Knöpfe statt als Rechtecke ([Apple-Entwicklerforum 844562](https://developer.apple.com/forums/thread/844562)); in Mail bekommt die Zeile beim Wischen runde Ecken ([Forum 811328](https://developer.apple.com/forums/thread/811328)); SwiftUI zeigt Symbol und Titel, nur Symbol ist wählbar ([Nil Coalescing](https://nilcoalescing.com/blog/ShowIconsOnlyInSwiftUISwipeActionsOnIOS26)).
- **Nicht belegt:** eine HIG-Seite eigens zu Wischaktionen habe ich nicht gefunden; genaue Maße und Abstände von Apple auch nicht. Im Muster: Knöpfe 44 pt, Abstand 8 pt, offen ab halber Aktionsbreite, Durchwischen ab 60 % der Kachelbreite – eigene Werte.
- **Bewusste Abweichung:** Durchwischen löscht bei Apple sofort; bei uns fragt die Sprechblase (Entscheidung 1 a, R-4.12).
- **Im Web nachgebaut:** Lucide-Icons statt SF Symbols; Glas wie R-3.9 kommt beim Bau dazu (im Muster deckend).
- **HIG-Checkliste (16) und Katalog (17), betroffen:** Antippflächen 44 pt (R-3.1), Rot nur für Löschen (R-3.3), erst fragen (R-4.12), Kontextmenü bleibt als zweiter Weg (R-4.2), Gesten-Vorrang (R-7.5), VoiceOver (R-1.8 – die Aktionen bleiben über das Kontextmenü erreichbar), Bewegung reduzieren.

## Im Muster geprüft (Chromium und WebKit, 1180 × 820)

Je Variante grün: kurz wischen öffnet, beide Aktionen sichtbar · Antippflächen mindestens 44 × 44 · Aktionen neben der Kachel, nichts über dem Rand · Tippen auf die offene Kachel schließt und öffnet nichts · senkrechtes Rollen bewegt nichts seitlich · zu kurzes Wischen federt zurück · Durchwischen zeigt die Sprechblase · ‚Abbrechen‘ lässt alles · ‚Löschen‘ fragt zuerst · gelöscht erst nach Bestätigung · keine Skriptfehler.

## Danach

Hoch und iPhone erst, wenn quer passt (0 Nr. 6); dann Testfall-Liste, ‚allgemeine Regel?‘ und Wortlaut (15.4 ‚Kein Wischen‘ entfällt, neue Regel).
