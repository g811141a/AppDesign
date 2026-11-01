# APD-107 – Testfall-Liste (Korrektur 4.48.2 aus Usertest P-88)

Stand 01.11.2026 · Sitzung Reiselogbuch 0071 · Zusammenarbeit 0 Nr. 1 (Testfall-Liste vor jedem Bau) und 0 Nr. 20 (erst messen)

## Befunde

- **S-A (P-88/1, Messung `messung-2026-11-01-1603.txt`, iPad quer, Safari 26.6.3):** Wegziehen auf ‚…‘ der Kopfzeile bzw.
  Seitenleiste – Safari meldet kein pointercancel (dort rollt nichts) und löst beim Loslassen ‚tippen‘ aus. Die Sperre
  `beruehrWeg` gilt nur 600 ms ab dem Abbruch: Loslassen 843 ms danach → Menü offen (Zeile 153–154), 558 ms danach → gesperrt
  (Zeile 102–103). `checkBeruehren` lässt sofort nach dem Wegziehen los; Chromium meldet bei echter Touch-Eingabe pointercancel.
- **S-B (P-88/4):** Der Kreis `.schwebt` hängt an `body`; das Fenster des Tages ist modal (oberste Ebene) und liegt darüber – der
  Kreis ist nicht zu sehen (Bild in Chromium und WebKit). `checkAnheben` prüfte nur, ob es den Kreis gibt, nicht, ob er zuoberst liegt.
- **S-C (P-88/1 ‚Icon ändert sich gar nicht‘):** Am Gerät berechnet Safari am Knopf Deckkraft 0,35 (Messung APD-106, iPhone, Zeile
  ‚stil mainMore beruehrt opacity 0.35‘) – die Klasse wirkt, zu sehen ist nichts. **Nicht Teil von 4.48.2** – erst ein Muster
  (0 Nr. 6), Vermutung: der Finger deckt das Icon, die Kapsel ändert sich nicht.

## Testfälle (automatisch)

| Nr. | Gerät · Lage | Handlung | Erwartet | Prüfung | gegen 4.48.1 |
|---|---|---|---|---|---|
| S-1 | iPad quer, iPhone hoch | Finger auf ‚…‘ der Kopfzeile, 20 px wegziehen, **1 s liegen lassen**, loslassen – wie Safari ohne pointercancel, mit Klick | kein Menü, Knopf nicht mehr blass | `checkBeruehren` (`liegen`) | rot |
| S-2 | iPad quer | dasselbe auf ‚…‘ der Seitenleiste | kein Menü | `ablauf-beruehren` | rot |
| S-3 | iPad quer, iPhone hoch | dasselbe, Loslassen sofort (bisheriger Fall) | kein Menü | `checkBeruehren` | grün |
| S-4 | iPad quer, iPhone hoch | Tageszeile: 20 px wegziehen, 1 s liegen lassen, loslassen | kein Fenster des Tages | `checkBeruehren` | rot |
| S-5 | iPad quer, iPhone hoch | nach S-1 denselben Knopf kurz antippen | Menü öffnet sich genau einmal (Sperre nur für das eine Loslassen) | `checkBeruehren` | grün |
| S-6 | iPad quer | nach S-1 den Knopf mit der Tastatur (Leertaste) auslösen | Menü öffnet sich | `checkBeruehren` | grün |
| S-7 | iPhone hoch, iPad quer | Smiley im Fenster des Tages halten (0,4 s) | der Kreis liegt zuoberst: an seiner Mitte ist er das oberste Element, er hängt im offenen Fenster | `checkAnheben` | rot |
| S-8 | iPhone hoch, iPad quer | weiter halten bis 1 s; ebenso Wegziehen | Frage kommt, der Kreis verschwindet; nach dem Schließen des Fensters bleibt kein Kreis zurück | `checkAnheben` | grün |
| S-9 | alle Ansichten | nach jedem Schritt | Grundregeln (`pruefe.mjs`) | `ablauf-beruehren` | grün |

## Testfälle (User) für den Usertest P-89

- /0 Version prüfen (Reiselogbuch 3.46.2 · AppDesign 4.48.2)
- ‚…‘ der Kopfzeile und der Seitenleiste: wegziehen, 1 s liegen lassen, loslassen – kein Menü (iPad quer, iPhone hoch)
- Smiley halten: heller Kreis mit Schatten über der Leiste, nach 1 s die Frage
