# APD-108 – Testfall-Liste (Korrektur 4.49.2: Wischen tippt nie an)

Stand 02.11.2026 · Sitzung Reiselogbuch 0075 · **Testfall-Liste und Wortlaut bestätigt (Nutzer 02.11.2026), bereit für 4.49.2** · Zusammenarbeit 0 Nr. 1 (Testfall-Liste vor jedem Bau) und 0 Nr. 20 (Modell nach Gerätedaten)

## Befunde

- **W-A (Messung `arbeit/APD-106 Messungen/2026-11-01 iPhone hoch Muster.txt`, iPhone hoch, iOS 18.7, Safari 26.6.3, AppDesign 4.48.0,
  Fall 3, Zeilen 73–80):** Finger auf ‚…‘ bei 353/31, losgelassen bei 342/184 (`zeiger up … weg 154`, 505109 ms) – `navKlickWeg` hat beim
  Loslassen gesperrt (mehr als 10 px, kein Feld). 4 ms später `ausgeloest mainMore` und `klick … verhindert nein`: der Klick kam **nach**
  dem `setTimeout 0`, das die Sperre aufhebt. Safari schickt den Klick auch nach 154 px Weg, solange nichts rollt (kein `pointercancel`).
  Weitere Klicks nach dem Loslassen in derselben Messung: 1–4 ms (Zeilen 23, 68, 315, 327).
- **W-B (dieselbe Messung, Fall 4, Zeilen 320–327):** Finger 38 px weg und zurück, beim Loslassen 6 px vom Anfang – `navKlickWeg` misst nur
  Anfang–Ende und sperrt nicht; der Klick kam (`ausgeloest mainMore`).
- **W-C (Code `v4/ui.js`):** dasselbe Muster `X = true; setTimeout(() => X = false)` an drei Stellen: `navKlickWeg` beim Loslassen
  (Zeile 2309) und nach dem Zurückwischen (2353), nach Drehen beim Ziehen (2382), `blattKlickWeg` nach dem Ziehen des Blatts (2645).
- **W-D:** Seit 4.48.2 sperrt `beruehrWeg` (APD-107, R-3.6) Knöpfe und Zeilen mit `onclick` bis zum Loslassen plus 400 ms. **Ungeschützt**
  bleiben Ziele ohne Rückmeldung beim Berühren: der Titel (R-2.7, Hörer am `document`; nur ‚kürzer als 600 ms‘ zählt), Links in den Tagen
  (📍 Google Maps, `a` ist in `BERUEHR_NICHT`), der Rand neben dem Blatt (`blattDraussen`, iPhone).
- **W-E (iPad):** keine abgelegte Messung – dass es am iPad genauso ist, ist eine **Vermutung** (passt zur nicht abgelegten Messung P-88/1,
  APD-107/S-A). Bestätigung im Usertest.
- **Warum die Prüfung es übersah:** `finger()` (`tests/ablauf.mjs`) klickt synchron nach `pointerup` (`el.click()`), außer mit
  `['klickNach', ms]`; `safariWischen` (`tests/safari.mjs`) schickt nach dem Loslassen gar keinen Klick. Das Modell bildet W-A nicht ab.

**So macht es Apple** (Backlog APD-108): eine Rollbewegung bricht die Berührung eines Bedienelements ab, ein Wischen wird nie zum Tipp. Die
Regel gibt es schon (Designrichtlinie 15.17 ‚Wischen tippt nie an, worauf es begann‘, R-7.5) – es ist eine Korrektur, keine neue Regel.

## Änderung

1. **Modell (`tests/safari.mjs`, ein Modell, 0 Nr. 20):** neu `KLICK_NACH = 4` – der Klick nach dem Loslassen kommt als eigene Aufgabe
   4 ms nach `pointerup` (W-A), auch nach dem Wischen ohne Rollen. `finger()` nutzt das als Standard (statt synchron); `safariWischen` schickt
   nach `pointerup` ohne Abbruch den Klick an das Element unter dem Aufsetzen.
2. **ui.js – eine Sperre wie `beruehrWeg`:** ‚Wischen tippt nie an‘ gilt ab mehr als 10 px **größtem** Weg (nicht nur Anfang–Ende) bis zum
   Loslassen und danach noch 400 ms für **genau einen** Klick; das nächste Aufsetzen und jede Taste geben frei. Gilt für `navKlickWeg`
   (Loslassen, Zurückwischen, Drehen) und `blattKlickWeg`. Das x, das das Blatt selbst auslöst (`blattWieX`), kommt weiter an.
3. **Designrichtlinie 13** neu ‚Klick nach dem Wischen‘ – erst nach deinem Ja zum Wortlaut (0 Nr. 29, Wortlaut unten).

## Testfälle (automatisch)

| Nr. | Gerät · Lage | Handlung | Erwartet | Prüfung | gegen 4.49.1 |
|---|---|---|---|---|---|
| W-1 | – | Selbsttest Modell: Wischen 40 px ohne Rollen, loslassen | der Klick kommt als eigene Aufgabe nach einem `setTimeout 0` der Seite, an das Element unter dem Aufsetzen; mit Rollen (`pointercancel`) kein Klick | `checkSafariWischKlick` (Selbsttest) | – |
| W-2 | iPad quer, iPad hoch, iPhone hoch | Inhalt weit unten; Finger auf den Titel der Kopfzeile, 40 px waagrecht ziehen (unter 600 ms), loslassen | der Inhalt bleibt, wo er war (kein Rollen nach oben) | `checkTitelOben` (`wischen`) | rot |
| W-3 | iPad quer | Liste der Seitenleiste unten; auf ‚Reiselogbücher‘ 40 px waagrecht ziehen, loslassen | die Liste bleibt | `checkTitelOben` | rot |
| W-4 | iPad quer | Fenster des Tages, Inhalt unten; auf das Datum 40 px waagrecht ziehen, loslassen | der Inhalt des Fensters bleibt | `checkTitelOben` | rot |
| W-5 | iPad quer, iPhone hoch | auf 📍-Link in einem Tag 30 px waagrecht ziehen, loslassen | der Link öffnet nicht (Klick verhindert), kein Fenster des Tages | `ablauf-beruehren` | rot |
| W-6 | iPad quer, iPhone hoch | Titel: 38 px weg und zurück auf 6 px, loslassen (W-B) | nichts rollt | `checkTitelOben` | rot |
| W-7 | iPad quer, iPhone hoch | nach W-2 bzw. W-5 sofort kurz antippen | Titel rollt nach oben bzw. Link wird angetippt – genau einmal (Sperre nur für den einen Klick) | `checkTitelOben`, `ablauf-beruehren` | grün |
| W-8 | iPad quer | nach W-2 die Tastatur (Leertaste auf ‚…‘) | löst aus | `checkBeruehren` | grün |
| W-9 | iPhone hoch | Blatt am Griff 60 px ziehen und loslassen (federt zurück), Finger über einem Knopf im Blatt | nichts wird angetippt | `ablauf-blatt` | rot |
| W-10 | iPhone hoch | Blatt mit Änderungen nach unten ziehen | die Frage ‚Änderungen verwerfen?‘ kommt (das x des Blatts kommt an) | `ablauf-blatt` | grün |
| W-11 | iPhone hoch, iPad hoch | Zurückwischen bzw. Seitenleiste wischen, Loslassen über einem Tag | kein Fenster des Tages | `ablauf` (`keinTippen`) | rot |
| W-12 | iPad quer | Ziehen, dabei drehen, loslassen | nichts wird angetippt | `ablauf` (Drehen) | rot |
| W-13 | alle Ansichten | nach jedem Schritt | Grundregeln (`pruefe.mjs`) | alle | grün |

‚rot gegen 4.49.1‘ heißt: mit dem neuen Modell (Klick 4 ms nach dem Loslassen) gegen die veröffentlichte Fassung 4.49.1 – so wie am Gerät.

## Wortlaut Designrichtlinie 13 (bestätigt Nutzer 02.11.2026, 0 Nr. 29)

Neu nach ‚Klick nur mit Hörer‘:

> - **Klick nach dem Wischen (seit 4.49.2, APD-108, Messung APD-106 vom 01.11.2026, iPhone):** Safari schickt nach dem Loslassen einen
>   `click` an das Element unter dem Aufsetzen, auch wenn der Finger weit gewandert ist (gemessen bis 154 px), solange nichts gerollt hat
>   (kein `pointercancel`) – als eigene Aufgabe 1–4 ms nach `pointerup`, also nach einem `setTimeout 0`. Eine Sperre ‚Wischen tippt nie an‘
>   gilt deshalb bis zum Loslassen und danach noch 400 ms für genau diesen einen Klick und zählt den größten Weg. iPad: Vermutung.

## Testfälle (User) für den Usertest P-92

- /0 Version prüfen (Reiselogbuch 3.47.2 · AppDesign 4.49.2)
- iPad quer und hoch: Inhalt weit unten, über den Titel der Reise waagrecht wischen – nichts rollt; danach kurz antippen – rollt nach oben
- iPad quer: über ‚Reiselogbücher‘ der Seitenleiste wischen – die Liste bleibt
- iPad quer, iPhone hoch: über einen 📍-Link in einem Tag waagrecht wischen – Google Maps öffnet nicht; kurz antippen – öffnet
- iPhone hoch: Blatt am Griff ein Stück ziehen und loslassen – nichts wird angetippt; mit Änderungen nach unten ziehen – Frage kommt
