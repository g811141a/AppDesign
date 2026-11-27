# APD-151/J-2 – die offenen Punkte (Sitzung AppDesign 0005)

**27.11.2026** · Grundlage ist deine Entscheidung J-2: Am iPhone ist jedes Fenster außer Meldungen so wie am iPad, mit Höhe nach Inhalt und in der Mitte (`arbeit/APD-151 Rueckfrage wie am iPad.md`).

## Was ohnehin aus ‚wie am iPad‘ folgt

- **Öffnen:** Das Fenster gleitet von unten in die Mitte (R-1.12). Die Seite dahinter bleibt groß und dunkelt mit 35 % ab wie am iPad. Am iPhone weicht sie nicht mehr verkleinert zurück.
- **Ziehen nach unten:** Nur das Fenster fährt mit, die Abdunkelung wird heller, die Seite bleibt (iPad heute, APD-72). Mit Änderungen zieht es sich zäh und fragt am x (R-4.4).
- **Langer Inhalt:** Das Fenster steht oben und unten mit mindestens 10 px Abstand, und der Inhalt rollt (`placeDialogs` heute am iPad).
- **Kopfzeile:** bleibt kompakt wie heute am iPhone (15.17).

## 1. Breite am iPhone hoch

- **Heute schon im Code:** Ein Fenster ist mindestens 480 px breit, höchstens 90 % (`dialog` in `v4/design.css`, R-4.8: „schmaler nur, wenn der Bildschirm es verlangt“).
- Am iPhone hoch (etwa 390 px breit) wird es damit **90 % breit**, rund 351 px, mit etwa 20 px Rand auf jeder Seite.
- **a) 90 % wie R-4.8 heute (Empfohlen):** Die Regel bleibt unverändert und gilt gleich wie am iPad.
- **b) volle Breite mit 10 px Rand:** gibt mehr Platz für Felder, braucht aber einen Zusatz zu R-4.8.

## 2. Lage am iPhone quer

- **Heute** hat das Blatt quer die volle Höhe (R-4.6).
- **a) wie hoch (Empfohlen):** in der Mitte, Höhe nach Inhalt, höchstens bis 10 px vom Rand. Die Breite folgt R-4.8: mindestens 480 px, höchstens 90 %. Das ist dieselbe Bedienung in jeder Lage (R-1.1, R-8.1).
- **b) quer weiter volle Höhe wie heute.**

## 3. Tastatur

- **a) wie am iPad (Empfohlen):** Das Fenster gleitet über die Tastatur. Passt es nicht ganz, wird es niedriger, der Inhalt rollt, und das Feld steht über der Tastatur (R-4.5). Fensterkopf und Leisten stehen still.
- **b) Das Fenster wird bei offener Tastatur zur vollen Höhe** wie heute am iPhone.

## 4. Antippen der Abdunkelung

- **Heute** schließt es am iPhone wie x, am iPad schließt es nicht.
- **So macht es Apple:** Unter einem Blatt liegt „a noninteractive dimming view“ (UIKit `largestUndimmedDetentIdentifier`, Standard), Antippen tut dort nichts. Am iPad sperrt iPadOS es bei Formblättern ebenso (15.17).
- **a) schließt nicht, wie am iPad (Empfohlen):** gleich wie am iPad und wie bei Apple. Schließen geht über x, Escape und Ziehen nach unten.
- **b) schließt wie x, wie heute am iPhone.**

Danach kommen die neue Testfall-Liste und das Muster. Den Wortlaut für R-4.6, 15.17 und, falls nötig, R-4.8 lege ich nach 0 Nr. 29 vor.

## Entschieden (Nutzer 27.11.2026, Sitzung AppDesign 0005, im Fenster) – APD-151/J-3

1. Breite am iPhone hoch: 90 % wie heute (R-4.8 unverändert).
2. Quer: wie hoch, also in der Mitte, Höhe nach Inhalt, höchstens bis 10 px vom Rand.
3. Tastatur: wie am iPad.
4. Antippen der Abdunkelung: schließt nicht, wie am iPad.
