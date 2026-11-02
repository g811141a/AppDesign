# APD-109 – Titel antippen wirkt am Gerät nur teilweise · Testfall-Liste

**Stand 02.11.2026** · Sitzung ‚Reiselogbuch 0074‘ · Anlass Usertest P-90 (3.47.0 / AppDesign 4.49.0): P-90/1, /2, /4 nicht ok.

## Befund

- Rückmeldung (Nutzer 02.11.2026): Kopfzeile am iPad ohne Wirkung (iPhone ok), Seitenleiste bzw. Startliste auf beiden Geräten
  ohne Wirkung, Fenster ok; P-90/5 am iPad ok (Blase, kein Rollen).
- Messung am iPad (`messung-2026-11-02-0846.txt`, Safari 26.6.3, Home-Bildschirm, quer): mit laufendem Messmodus kommt nach dem
  Loslassen auf `span.nb-title` der Klick (‚tippen -‘), der Inhalt rollt nach oben (zweimal). Ohne Messung (App neu gestartet)
  rollt nichts (Nutzer).
- Der Messmodus hängt seine Hörer an `document` (click, pointerdown, pointerup …); R-2.7 hört nur an `window` (`ui.js`).
  **Belegt:** mit Hörern am `document` schickt Safari den Klick, ohne nicht.
- **Vermutung:** Die iPhone-Kopfzeile geht, weil sie beim Öffnen einer Reise den Fokus für VoiceOver bekommt (`tabindex=-1`,
  R-1.8, `navVor`); Fenster gehen, weil `dialog` einen eigenen Klick-Hörer hat.
- Quellen: shdon.com ‚Why your click events don't work on Mobile Safari‘ (2013), WebKit Bug 151933.
- Warum die Prüfung es übersah: Chromium und WebKit am Rechner schicken jeden Klick; das Safari-Modell (`tests/safari.mjs`)
  bildete die Klick-Regel nicht nach.

## Testfälle (automatisch)

| Nr. | Gerät · Lage | Handlung | Erwartet | gegen 3.47.0 |
|---|---|---|---|---|
| C-1 | Safari-Modell | Tipp auf ein nicht antippbares Element ohne Hörer an ihm, darüber oder am `document` (nur `window`) | kein `click` | – (Selbsttest) |
| C-2 | Safari-Modell | dasselbe mit Klick-Hörer am `document`, an einem Element darüber, mit `tabindex` bzw. auf `button`/`a`/`input` | `click` kommt | – (Selbsttest) |
| C-3 | iPad quer und hoch | Inhalt weit gerollt, Titel der Kopfzeile kurz antippen | Inhalt rollt ganz nach oben, Kopfzeile und Seitenleiste bleiben | rot |
| C-4 | iPad quer; iPhone hoch (Startliste) | Liste der Seitenleiste bzw. Startliste gerollt, ‚Reiselogbücher‘ kurz antippen | nur die Liste rollt nach oben | rot |
| C-5 | iPad quer | Titel antippen, während es rollt einen Tag antippen; dann den Tag noch einmal | Rollen hält an, Fenster öffnet nicht; beim zweiten Tipp öffnet es | rot |
| C-6 | iPhone hoch und quer | Kopfzeile, Fenster-Kopfzeile wie C-3 | rollt nach oben (wie bisher) | grün |
| C-7 | iPad, iPhone | Titel lange drücken; ‚Bewegung reduzieren‘ | keine Bewegung bzw. sofort oben (wie bisher) | grün |
| C-8 | alle Ansichten | `ablauf-titel-oben` und die übrigen Prüfungen im Safari-Modell mit Klick-Regel | grün; jede andere Stelle, die einen Klick auf ein nicht antippbares Element braucht, fällt auf (dieselbe Lücke überall suchen) | – |
| C-9 | Gegenprobe | R-2.7 wieder an `window` | C-3 bis C-5 rot | rot |

Nach jeder Handlung gelten die Grundregeln (`pruefe.mjs`).

## Testfälle (User) – kommen als Usertest der Korrekturversion

P-90/1, /2 und /4 noch einmal am iPad und iPhone, **ohne** Messmodus, nach Neustart der App.
