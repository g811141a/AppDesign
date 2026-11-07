# APD-121 – Mehr-Knopf am oberen Rand (iPhone quer): Wortlaut und Testfall-Liste

Stand 07.11.2026 · Sitzung Reiselogbuch 0089 · **Wortlaut zur Bestätigung** (0 Nr. 29)

## Befund (Messungen am Gerät)

Zwei Messungen am 07.11.2026, iPhone mit iOS 18.7, App vom Home-Bildschirm, quer, Text xl 19, Reiselogbuch 3.52.0 / AppDesign 4.54.0:
`tests/messungen/2026-11-07 iPhone quer Mehr-Knopf oben 1.txt` und `… oben 2.txt`.

- APD-121/B-1 Tipps auf den Mehr-Knopf ohne offenes Menü: bei y 21 öffnet er 4 von 4 Mal, bei y 23 (neben dem Knopf, Ziel `div.side-head`), 26, 27–36
  jedes Mal. Höher als y 21 kam der Finger auch halb über dem Displayrand nicht.
- APD-121/B-2 Ein Tipp ohne Klick: 796/24 → 810/22, 14 px gewischt. Vermutung: Safari wertet das als Wischen. Ob es am Wischen oder am Rand liegt,
  trennt die Messung nicht; bei P-97/6 lag der zweite Tipp ohne Klick ebenso gewischt (792/20 → 804/13).
- APD-121/B-3 Messung 06.11.2026 (P-97/6, `tests/messungen/2026-11-06 iPhone quer Mehr-Menü oberer Rand.txt`): bei y 20 auf der Sperrschicht kein Klick
  (790/20 ohne Weg).
- APD-121/B-4 Folgerung: Die Grenze liegt zwischen y 20 (kein Klick) und y 21 (Klick). Das Safari-Modell nimmt heute jeden Klick bei y < 23 weg
  (`KEIN_KLICK_OBEN` = 23) und widerspricht damit B-1.
- APD-121/B-5 Nebenbefund (nicht Teil dieses Themas): Safari schickt den Klick eines Tipps neben dem Knopf (y 23 bzw. y 56–66 auf der Kopfzeile bzw.
  der Liste) an den Mehr-Knopf. Das Safari-Modell kennt das nicht.

## Wortlaut

**Designrichtlinie allgemein 13, Punkt ‚Am oberen Rand kein Klick‘ (APD-121/V-1)**

Alt:

> - **Am oberen Rand kein Klick (iPhone quer, Home-Bildschirm):** eine Berührung bei y ≈ 20 px liefert `pointerdown`/`pointerup`, aber keinen `click` –
>   bei y = 26 und weiter unten schon (Messung 06.11.2026, P-97/6, iOS 18.7). Was beim Antippen schließen soll (Sperrschicht hinter Menüs und Sprechblasen),
>   schließt deshalb beim Loslassen (bis 20 px Weg) und verschluckt einen Klick danach; das Safari-Modell schickt dort keinen Klick (`obenOhneKlick`,
>   eingeschaltet in den Prüfungen zum oberen Rand – überall an, fiele der Tipp auf die Mitte des Mehr-Knopfs, y 16, in allen Prüfungen weg).

Neu:

> - **Am oberen Rand kein Klick (iPhone quer, Home-Bildschirm):** eine Berührung bis y 20 px liefert `pointerdown`/`pointerup`, aber keinen `click` –
>   ab y 21 schon (Messungen 06.11.2026, P-97/6, und 07.11.2026, APD-121, iOS 18.7: y 20 ohne Klick, y 21 viermal mit Klick). Der Mehr-Knopf öffnet
>   deshalb auch ganz oben angetippt; höher als y 21 kommt der Finger am Gerät nicht. Was beim Antippen schließen soll (Sperrschicht hinter Menüs und
>   Sprechblasen), schließt beim Loslassen (bis 20 px Weg) und verschluckt einen Klick danach; das Safari-Modell schickt bis y 20 keinen Klick
>   (`obenOhneKlick`, Grenze `KEIN_KLICK_OBEN` = 21, eingeschaltet in den Prüfungen zum oberen Rand – überall an, fiele der Tipp auf die Mitte des
>   Mehr-Knopfs, y 16, in allen Prüfungen weg).


## Umsetzung (Code, kein Regeltext)

- `tests/safari.mjs`: `KEIN_KLICK_OBEN` 23 → 21, Kommentar mit beiden Messungen.
- `tests/ablauf.mjs` (`checkSchichtOben`): der Tipp ohne Klick bei y 20 wie gemessen (`KEIN_KLICK_OBEN - 1` statt `- 3`), neu APD-121/Y-2 und Y-3.
- Reiselogbuch: die beiden Messungen in `ablauf-abspielen` (bzw. `ablauf-schicht-oben`) nachspielen.

## Testfall-Liste (Testfall (automatisch))

- APD-121/Y-1 Safari-Modell im iPhone quer: ein Klick bei y 20 kommt nicht an (`obenWeg` zählt), einer bei y 21 kommt an.
- APD-121/Y-2 Mehr-Knopf ohne offenes Menü, Tipp bei y 21: das Menü öffnet (iPhone quer, hell und dunkel).
- APD-121/Y-3 Mehr-Knopf ohne offenes Menü, Tipp bei y 20: es öffnet nichts, es bleibt kein Rest (kein Fokusring, `aria-expanded` false).
- APD-121/Y-4 Sperrschicht: Tipp bei y 20 über Mehr schließt das Menü und öffnet es nicht wieder (wie APD-118/X-1, jetzt mit y 20 wie gemessen).
- APD-121/Y-5 die Messungen vom 07.11.2026 nachgespielt: Kopf- und Suchzeile ± 1 px und Fokus wie gemessen.
- APD-121/Y-6 iPhone hoch, iPad quer und hoch: das Modell bleibt aus, alles wie bisher.
- APD-121/Y-7 rot gegen 4.54.0 bei Y-1 und Y-2 (0 Nr. 1); Gegenprobe: mit Grenze 23 wird Y-2 rot. Chromium und WebKit.

Was nur das Gerät zeigt, kommt als Testfall (User) in den Usertest: Mehr-Knopf im iPhone quer ganz oben antippen – das Menü öffnet.
