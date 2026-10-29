# APD-86 Wischzeile mit Verlauf und Pfeil – Testfall-Liste

**Stand 29.10.2026** · Sitzung Reiselogbuch 0052 · Anlass: Rückmeldung des Nutzers vom 29.10.2026 (iPhone hoch: die Reisemittel im Kopf
eines Reiselogbuchs laufen hart am Rand ab, statt weich auszulaufen mit kleinem Pfeil wie in der Auswahl-Kapsel) · entschieden: allgemeine
Regel (R-5.4 erweitert), Priorität 1, in AppDesign 4.40.0 / Reiselogbuch 3.38.0 (dein Ja vom 29.10.2026).

---

## 1. Was sich ändert (allgemein, R-5.4 und 15.12)

- **Ursache:** Verlauf und Pfeil (APD-75, 4.33.0) gab es nur in der Auswahl-Kapsel (`.cap .scroll`). Die Zeile ‚Reisemittel‘ im Kopf
  eines Reiselogbuchs ist Text, der am iPhone seitlich wischt (`dd.swipe`, Reiselogbuch) – ohne Verlauf und Pfeil. R-5.4 und ihre
  Prüfung in `hig.mjs` galten nur der Kapsel; die Navigation-Prüfung wischt die Zeile zwar, prüft dort aber nicht, ob man sieht, dass
  es weitergeht.
- **Neu:** die **Wischzeile** `.weiter` > `.scroll` + `.pf` (`wischHtml(inhalt, id)` in ui.js) – eine Zeile Text, seitlich wischbar,
  mit demselben Verlauf (48 px, die äußeren 28 px frei) und denselben Pfeilen (14 px, `--muted`, 9 px vom Rand, nur Anzeige) wie die
  Kapsel, aber ohne Kapsel-Form. `mountCap(root)` stellt Verlauf und Pfeile für Kapseln und Wischzeilen; die App ruft es nach dem
  Aufbau der Seite.
- **Regel:** jeder seitlich wischbare Bereich bis etwa zwei Zeilen Höhe ist eine Kapsel oder eine Wischzeile. Höhere Flächen
  (Vorschau, breite Tabellen) bleiben frei – dort zeigt der angeschnittene Inhalt, dass es weitergeht.
- **Reiselogbuch:** die Zeile ‚Reisemittel‘ wird eine Wischzeile (`#reisemittel`); am iPad und bei großer Schrift bricht sie wie bisher um.
- **So macht es Apple:** am iPhone zeigt Apple bei wischbaren Reihen keine Pfeile – die Pfeile sind dieselbe bewusste Abweichung wie in der
  Kapsel (15.12, APD-75), damit das Wischen erkennbar ist.

## 2. Testfälle (automatisch)

`ablauf-reisemittel-zeile.mjs` (Reiselogbuch) – gegen 3.37.0 rot (W1–W3), mit 3.38.0 grün; Grundregeln nach jedem Schritt.

| Nr. | Gerät × Lage × Darstellung | Daten | Handlung | Erwartet |
|---|---|---|---|---|
| W1 | iPhone hoch, hell | alle 8 Reisemittel | Reiselogbuch öffnen | die Zeile wischt seitlich, rechts weicher Verlauf |
| W2 | iPhone hoch, hell | alle 8 | – | rechts kleiner Pfeil ›, links keiner |
| W3 | iPhone hoch, hell | alle 8 | in die Mitte, ans Ende, zurück wischen | Mitte ‹ ›, Ende nur ‹, Anfang nur › (`checkKapsel` K1–K3) |
| W4 | iPhone hoch | alle 8 | unter dem Pfeil › antippen | der Pfeil fängt nichts ab (K9) |
| W5 | iPhone quer; iPhone hoch mit einem Reisemittel | 8 bzw. 1 | – | passt es, weder Verlauf noch Pfeil (K5) |
| W6 | iPhone hoch | alle 8 | drehen und zurück | Verlauf und Pfeile neu, Rollstand bleibt (K6) |
| W7 | iPhone hoch, dunkel | alle 8 | wie W1–W6 | Pfeil in `--muted` |
| W8 | iPhone hoch, ‚Bewegung reduzieren‘ | alle 8 | wie W3 | Pfeil ohne Überblenden (K12) |
| W9 | iPad quer hell, iPad hoch dunkel | alle 8 | – | umbrochen, nichts abgeschnitten, kein Wischen |
| W10 | alle Ansichten aller Prüfungen | – | jeder Schritt | `hig.mjs`: kein seitlich wischbarer Bereich bis etwa zwei Zeilen Höhe ohne Verlauf und Pfeil |
| W11 | alle | – | jeder Schritt | `hig.mjs`: die Wischzeile wie die Kapsel – Verlauf genau dann, wenn es weitergeht; Pfeile 14 px, 9 px vom Rand, `aria-hidden` |

Zurückwischen am iPhone (Navigation) behält die Zeile als waagerecht rollenden Bereich: `ablauf-navigation.mjs` wischt jetzt `#reisemittel`.

Gegenprobe: `PRUEF_GEGENPROBE=1` → rot; gegen 3.37.0 (dd.swipe ohne Verlauf) → W1–W3 rot (9 Fehler in Chromium, 29.10.2026).

## 3. Testfälle (User) – Usertest P-78

- iPhone hoch: Reiselogbuch mit vielen Reisemitteln – rechts Verlauf und ›; wischen: ‹ ›; am Ende nur ‹.
- iPhone quer bzw. iPad: passt es, weder Verlauf noch Pfeil.
