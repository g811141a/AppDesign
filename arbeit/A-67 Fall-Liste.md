# A-67 Zurückwischen über einem Tageskasten – Fall-Liste Schritt 1 (Messung)

**Stand 22.10.2026** · Sitzung ‚Reiselogbuch 0031‘ · **Ja des Nutzers 22.10.2026**, gebaut in AppDesign 4.30.1 / Reiselogbuch 3.28.1
(15.21, R-7.5, `checkNavigation` F-22, Prüfliste P-65)

## 1. Befund (P-64/5)

Am iPhone (Home-Bildschirm-App) geht das Zurückwischen neben den Tageskästen, über einem Kasten federt die Seite zurück. Die Prüfung
(`checkNavigation` F-6, Maus) ist grün – die Mausnachbildung kennt keine Abbrüche durch Safari. Vermutung: Safari bricht die
Berührung über dem antippbaren Kasten (`div.box.day[role=button][tabindex]`, Maps-Links) ab – `pointercancel`, die Gestenstelle
federt zurück. Nach 0 Nr. 20 zuerst messen, dann nachbauen.

## 2. Schritt 1 – was die Messung zusätzlich aufzeichnet

| Nr. | Fall | Zeile in der Messung | Prüfung |
|---|---|---|---|
| M-1 | Finger auf (pointerdown) | `zeiger down x y touch Ziel` | F-22 (Maus: `mouse`) |
| M-2 | Finger bewegt sich (nur gedrückt) | `zeiger move x y …` | F-22 |
| M-3 | Finger hoch | `zeiger up x y …` | F-22 |
| M-4 | Safari bricht ab | `zeiger cancel x y …`, `touchcancel n Ziel` | F-22 (nachgebildet) |
| M-5 | Ziel ohne Texte | id bzw. `tag.klasse[rolle]`, `in` antippbares Element, `@` nächste id | F-22 (kein Titel in der Datei) |
| M-6 | Gestenstelle: Kandidat | `nav kandidat phone` bzw. `nav kein kandidat [eigen]` | F-22 |
| M-7 | Gestenstelle: verworfen | `nav verworfen richtung/gehalten/offen dx dy` | – (Gerät) |
| M-8 | Gestenstelle: aktiv | `nav aktiv phone dx dy` | F-22 |
| M-9 | über die Hälfte bzw. schnell | `nav fertig weg W tempo T` | F-22 |
| M-10 | unter der Hälfte | `nav zurück gefedert weg W tempo T` | F-22 |
| M-11 | Abbruch (pointercancel) | `nav abgebrochen weg W tempo T` bzw. `nav abgebrochen vor der entscheidung` | F-22 |
| M-12 | Drehen beim Ziehen | `nav abgebrochen drehen` | – (F-14 prüft den Zustand) |
| M-13 | Messung aus | keine Hörer, keine Zeilen | `checkMessung` F1, F6 |

Grenzen: Zeilen der Gestenstelle stehen vor der Zeigerzeile desselben Augenblicks (sie hört zuerst). Abgespielt werden Berührungen
nicht (`abspielen.mjs`).

## 3. Schritt 2 (nach der Messung)

Mit der Messdatei den Ablauf als feste Prüfung nachbauen (rot gegen 3.28.1, Safari-Modell `safari.mjs`), beheben, dieselbe Lücke
überall suchen – Korrektur 4.30.2 / 3.28.2 nach Ja.

## 4. A-66 (dazu)

`checkNavigation` zeichnet Öffnen und Zurück bis zum Ende der Bewegung auf (nav-Klasse gesehen und wieder weg, mindestens 0,6 s,
höchstens 3 s). Beim Bau gefunden: unter Volllast zeigt WebKit manchmal gar kein Bild mitten in der Bewegung (nur Anfang und Ziel) –
dann belegen die Keyframes der Web-Animation (`id = 'nav'`) das Schieben bzw. Überblenden. Geprüft: viermal gleichzeitig (3 × WebKit,
1 × Chromium) grün.
