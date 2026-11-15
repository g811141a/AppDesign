# APD-30 Wischaktionen – Muster und Apple-Abgleich

**Stand 15.11.2026** · Sitzung Reiselogbuch 0116 · Muster `arbeit/APD-30 Wischaktionen Muster.html` (Varianten A, B, D; nur hell, iPad quer)

## Link

https://g811141a.github.io/AppDesign/arbeit/APD-30%20Wischaktionen%20Muster.html

## Schritte am iPad (quer, hell)

1. Den Link in Safari öffnen. Erwartet: drei Spalten A, B, D mit je drei Kacheln.
2. In jeder Spalte eine Kachel ein Stück nach links wischen und loslassen. Erwartet: ‚Einstellen‘ und ‚Löschen‘ bleiben neben der Kachel stehen.
3. Auf die offene Kachel tippen. Erwartet: sie gleitet zurück, nichts wird geöffnet.
4. Eine Kachel weit nach links durchwischen. Erwartet: ‚Löschen‘ wird breit; nach dem Loslassen fragt die Sprechblase ‚… mit allen Einträgen löschen? …‘.
5. ‚Abbrechen‘ antippen. Erwartet: die Kachel gleitet zurück, alles bleibt.
6. Kachel öffnen, ‚Löschen‘ antippen, ‚Reiselogbuch löschen‘ bestätigen. Erwartet: erst jetzt verschwindet die Kachel.
7. Senkrecht über die Kacheln streichen. Erwartet: keine Kachel bewegt sich seitlich.

## Die Varianten

| | Aussehen | Vorbild |
|---|---|---|
| **A** | Runde Knöpfe neben der Kachel, nur Symbol: ‚Einstellen‘ hell wie unsere runden Schaltflächen, ‚Löschen‘ rot. Die Kachel bleibt rund. | Beitrag im Apple-Entwicklerforum: Wischaktionen in iOS 26 ‚rund‘ |
| **B** | Wie A, unter jedem Knopf klein das Wort. | iOS 26 SwiftUI zeigt Symbol und Titel |
| **D** | **Kapseln** – links und rechts rund, in die Breite gezogen (66 × 44) –, darunter klein das Wort. | **Notizen und Mail am Gerät (Beobachtung des Nutzers 15.11.2026)** |

**Empfehlung: D** – so sieht es in Notizen und Mail am Gerät aus. Variante C ‚Blöcke an der Kachel‘ (iOS bis 18) ist dafür entfallen.

**Warum D zuerst fehlte (Nutzer 15.11.2026):** Ich hatte kein Bild von Notizen oder Mail in iOS 26, nur Texte – ein Forumsbeitrag nennt die Knöpfe ‚circular‘, ein Blog ‚Symbol und Titel‘. Daraus habe ich A und B gebaut, statt nach 2.6 zuerst um ein Vergleichsbild zu bitten. Die Maße von D (66 × 44, Wort 11 pt) sind geschätzt; mit einem Bildschirmfoto aus Notizen oder Mail gleiche ich sie an.

## Apple-Abgleich (0 Nr. 23, 2.6)

- **So macht es Apple:** Wischaktionen stehen standardmäßig am hinteren Rand; ein volles Durchwischen löst die erste Aktion aus; eine zerstörende Aktion ist rot ([SwiftUI swipeActions](https://developer.apple.com/tutorials/data/documentation/swiftui/view/swipeactions(edge:allowsfullswipe:content:).md), [Use Your Loaf](https://useyourloaf.com/blog/swiftui-swipe-actions/)).
- **iOS 26:** Wischaktionen (`UIContextualAction`) erscheinen als runde Glas-Knöpfe statt als Rechtecke ([Apple-Entwicklerforum 844562](https://developer.apple.com/forums/thread/844562)); in Mail bekommt die Zeile beim Wischen runde Ecken ([Forum 811328](https://developer.apple.com/forums/thread/811328)); SwiftUI zeigt Symbol und Titel, nur Symbol ist wählbar ([Nil Coalescing](https://nilcoalescing.com/blog/ShowIconsOnlyInSwiftUISwipeActionsOnIOS26)).
- **Nicht belegt:** eine HIG-Seite eigens zu Wischaktionen habe ich nicht gefunden; genaue Maße und Abstände von Apple auch nicht. Im Muster: Knöpfe 44 pt, Abstand 8 pt, offen ab halber Aktionsbreite, Durchwischen ab 60 % der Kachelbreite – eigene Werte.
- **Bewusste Abweichung:** Durchwischen löscht bei Apple sofort; bei uns fragt die Sprechblase (Entscheidung 1 a, R-4.12).
- **Im Web nachgebaut:** Lucide-Icons statt SF Symbols; Glas wie R-3.9 kommt beim Bau dazu (im Muster deckend).
- **HIG-Checkliste (16) und Katalog (17), betroffen:** Antippflächen 44 pt (R-3.1), Rot nur für Löschen (R-3.3), erst fragen (R-4.12), Kontextmenü bleibt als zweiter Weg (R-4.2), Gesten-Vorrang (R-7.5), VoiceOver (R-1.8 – die Aktionen bleiben über das Kontextmenü erreichbar), Bewegung reduzieren.

## Im Muster geprüft (Chromium und WebKit, 1180 × 820)

Je Variante grün: kurz wischen öffnet, beide Aktionen sichtbar · Antippflächen mindestens 44 × 44 · Aktionen neben der Kachel, nichts über dem Rand · Tippen auf die offene Kachel schließt und öffnet nichts · senkrechtes Rollen bewegt nichts seitlich · zu kurzes Wischen federt zurück · Durchwischen zeigt die Sprechblase · ‚Abbrechen‘ lässt alles · ‚Löschen‘ fragt zuerst · gelöscht erst nach Bestätigung · keine Skriptfehler.

## Entschieden und Stand (Nutzer 15.11.2026, Sitzung 0116)

- **Variante D gewählt** – Kapsel mit Wort darunter, wie Notizen und Mail.
- Das Muster zeigt ohne Parameter nur noch D: am iPad in Breite der Seitenleiste (380 px), am iPhone als Startliste in voller Breite; `?alle=1` zeigt A, B und D nebeneinander.
- **Geprüft für D** (Chromium und WebKit; iPad quer 1180 × 820, iPad hoch 820 × 1180, iPhone hoch 390 × 844, iPhone quer 844 × 390), alles grün: nichts ragt seitlich hinaus · öffnet auf 162 px, Kapseln 66 × 44 neben der Kachel · von der offenen Kachel bleiben mindestens 176 px sichtbar · Tippen schließt · senkrecht bewegt nichts · Durchwischen fragt, Sprechblase ganz im Bild · ‚Abbrechen‘ lässt alles · keine Skriptfehler.

### Schritte am iPad hoch und am iPhone (hell)

1. Den Link neu laden – am iPad hoch, am iPhone hoch und quer. Erwartet: eine Liste ‚Reiselogbücher‘ mit drei Kacheln.
2. Eine Kachel ein Stück nach links wischen. Erwartet: zwei Kapseln, darunter ‚Einstellen‘ und ‚Löschen‘; der Titel der Kachel bleibt teilweise lesbar.
3. Die Kachel weit durchwischen. Erwartet: die rote Kapsel wird breit, nach dem Loslassen fragt die Sprechblase; sie steht ganz im Bild.
4. ‚Abbrechen‘ antippen. Erwartet: die Kachel gleitet zurück, alles bleibt.
5. Am iPhone: vom linken Rand nach rechts wischen. Erwartet: die Kachel bewegt sich nicht nach rechts.

## Rückmeldung zum Muster D (Nutzer 15.11.2026, Sitzung 0116) – nachgebessert

1. **Abfrage sperrt die Umgebung (wie Notizen):** Solange die Sprechblase offen ist, ist alles daneben leicht eingegraut (Schwarz 20 %) und ohne Wirkung – Tippen auf eine andere Kachel oder daneben ändert nichts; man entscheidet sich für ‚Reiselogbuch löschen‘ oder ‚Abbrechen‘. Im ersten Muster blieb die Blase stehen und die Liste dahinter war bedienbar – ein Fehler des Musters.
   **Unterschied zur App heute (gelesen in `v4/ui.js` `choosePop`, Designrichtlinie 15.7):** Dort liegt hinter der Sprechblase schon eine unsichtbare Sperre; daneben tippen bricht ab, nichts wird eingegraut. ‚Eingegraut, daneben tippen ändert nichts‘ wäre also eine Änderung an der Sprechblase – offen: nur hier oder als allgemeine Regel für alle Sprechblasen (0 Nr. 4, Wortlaut nach 0 Nr. 29).
2. **Beim Zurückwischen kleiner und blasser (wie Notizen):** Größe (100 % → 50 %) und Deckkraft (100 % → 0 %) der Kapseln folgen dem Weg der Kachel; beim Öffnen umgekehrt.

Geprüft (Chromium und WebKit, vier Größen), grün: daneben tippen (andere Kachel, Rand) ändert nichts, Abfrage bleibt · Umgebung eingegraut · auf halbem Rückweg Größe 75 %, Deckkraft 50 %, geschlossen 50 % und 0 %.

### Schritte (iPad und iPhone, hell)

1. Den Link neu laden.
2. Eine Kachel nach links wischen, ‚Löschen‘ antippen. Erwartet: die Sprechblase erscheint, alles andere ist leicht eingegraut.
3. Auf ein anderes Reiselogbuch oder daneben tippen. Erwartet: nichts geschieht, die Sprechblase bleibt.
4. ‚Abbrechen‘ antippen. Erwartet: das Grau verschwindet, die Kachel gleitet zurück.
5. Eine Kachel nach links wischen, loslassen, dann langsam nach rechts zurückwischen. Erwartet: die Kapseln werden kleiner und blasser und sind am Ende verschwunden.

## Danach

Testfall-Liste, ‚allgemeine Regel?‘ und Wortlaut (15.4 ‚Kein Wischen‘ entfällt, neue Regel).
