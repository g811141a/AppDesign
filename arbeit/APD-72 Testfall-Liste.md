# APD-72 iPad: Fenster per Ziehen nach unten schließen – Apple-Abgleich, Entscheidungen, Testfall-Liste

**Stand 26.10.2026** · Sitzung Reiselogbuch 0048 · Muster `arbeit/APD-72 Muster.html` · gebaut wird erst nach einem Ja
(Zusammenarbeit 0 Nr. 21).

---

## 1. Apple-Abgleich (iPadOS)

- Formblätter in der Mitte (z. B. ‚Neuer Kontakt‘) lassen sich nach unten wegziehen: nur das Blatt fährt mit, die Abdunkelung wird
  heller, beim Loslassen gleitet es unten hinaus oder federt zurück.
- Mit ungesicherten Änderungen sperrt die App das Wegziehen (`isModalInPresentation`): das Blatt federt zurück, die App fragt
  (`presentationControllerDidAttemptToDismiss` – ‚Änderungen verwerfen‘). Quelle: Apple, ‚Disabling the pull-down gesture for a sheet‘.
- Antippen der Abdunkelung schließt ein Formblatt nicht. Öffnen und Schließen gleiten von unten (Darstellung ‚cover vertical‘).

## 2. Entscheidungen (Nutzer 26.10.2026)

| Nr. | Frage | Entschieden |
|---|---|---|
| W-1 | Wo beginnt der Zug? | wie am iPhone (R-4.6): am Kopf immer, im Inhalt, wenn er ganz oben steht, auch kurz gewischt |
| W-2 | Aussehen | wie iPadOS: nur das Fenster fährt mit, die Abdunkelung wird heller, die Seite bleibt, kein Griff |
| W-3 | Allgemein oder App | allgemeine Regel: R-4.6 (letzter Satz ändern), 15.17, `checkSheet` auch am iPad |
| W-4 | Muster | Variante **B**: dazu gleitet das Fenster beim Öffnen und Schließen (x, Häkchen, Escape) immer von unten wie in iPadOS; ‚Bewegung reduzieren‘ überblendet weiter |
| W-5 | Abdunkelung antippen | schließt am iPad weiter nicht (wie heute und wie iPadOS) |
| W-6 | Tastatur | ein Zug nach unten schließt zuerst die Tastatur (Nutzer 24.10.2026), sonst wie R-4.6 |

## 3. Testfall-Liste (wird beim Bau `checkSheet` in ablauf.mjs, iPad hoch und quer, Chromium und WebKit)

| Nr. | Fall | Erwartet |
|---|---|---|
| D-1 | Erfassen, Bearbeiten, Vorschau öffnen | Fenster in der Mitte, gleitet von unten herein (je Bild nur transform und opacity), Abdunkelung erscheint |
| D-2 | am Kopf ein Stück ziehen, langsam loslassen | folgt dem Finger 1 : 1, Abdunkelung heller, federt zurück; Seite dahinter unverändert (kein Zurückweichen) |
| D-3 | am Kopf weit nach unten ziehen | gleitet unten hinaus, schließt; Abdunkelung weg |
| D-4 | kurz und schnell nach unten wischen | schließt |
| D-5 | im Inhalt nach unten, Inhalt gerollt | Inhalt rollt, Fenster bleibt |
| D-6 | im Inhalt nach unten, Inhalt ganz oben | schließt |
| D-7 | waagerecht ziehen (auch in der Vorschau) | Fenster bleibt, Vorschau rollt seitlich |
| D-8 | nach oben ziehen | Gummiband, federt zurück |
| D-9 | mit Änderung weit nach unten ziehen (Bearbeiten und Erfassen) | zäh, federt zurück, Sprechblase am x ‚Änderungen verwerfen‘ / ‚Weiter bearbeiten‘; ‚verwerfen‘ schließt (gleitet hinaus) |
| D-10 | Tastatur offen, nach unten ziehen – am Kopf, auf einem Feld, im gerollten Inhalt | Tastatur zu; am Kopf bzw. Inhalt ganz oben auch das Fenster (bzw. Rückfrage), im gerollten Inhalt rollt er weiter |
| D-11 | x, Häkchen, Escape | gleitet nach unten hinaus (mit Änderung: x und Escape fragen zuerst) |
| D-12 | Abdunkelung antippen | nichts geschieht |
| D-13 | ‚Bewegung reduzieren‘ | Öffnen und Schließen überblenden, Ziehen folgt dem Finger, nach dem Loslassen sofort am Ziel |
| D-14 | Anfassen mitten im Gleiten | hält dort an und folgt dem Finger |
| D-15 | Drehen mit offenem Fenster | bleibt offen in der Mitte, ganz sichtbar (R-8.1) |
| D-16 | Liste dahinter (R-7.3) | steht still, nach dem Schließen an derselben Stelle (`checkListStill`) |
| D-17 | Feld antippen (Tastatur, R-4.5) | Fenster gleitet mit der Tastatur wie heute, nichts springt (`checkTastaturStill` iPad) |
| D-18 | iPhone (hoch, quer) | unverändert wie R-4.6 (B1–B23 aus APD-61 Teil 2 weiter grün) |
| D-19 | Gegenprobe | mit dem alten Verhalten (iPad schließt nur mit x) D-3, D-4, D-6 rot; ohne Gleiten D-1 und D-11 rot |
| D-20 | dunkel | wie hell, Fenster `--dlg-bg` (nach ‚hell passt‘, 0 Nr. 6) |

Nach jeder Handlung gelten die Grundregeln (`pruefe.mjs`).

## 4. Testfälle (User) – Vorschlag für den Usertest

- /0 Version prüfen.
- /1 iPad quer: Tag öffnen – gleitet von unten herein; am Kopf nach unten ziehen – fährt mit, gleitet hinaus.
- /2 iPad hoch: im Inhalt ganz oben kurz nach unten wischen – schließt; im gerollten Inhalt – rollt nur.
- /3 iPad: im Verlauf tippen, dann nach unten ziehen – Tastatur zu, zäh, federt zurück, fragt.
- /4 iPad: x und Häkchen – gleitet nach unten hinaus; Abdunkelung antippen – nichts geschieht.
