# RLB-112 – Testfall-Liste

Stand 30.10.2026 · Sitzung Reiselogbuch 0059 · Korrektur aus P-82 (P-82/1, /3, /5 nicht ok) – Zusammenarbeit 0 Nr. 1: jeder Ablauf des
Nutzers als feste Prüfung in `ReiseLogBuch/tests/ablauf-preis-km.mjs`, rot gegen 3.42.0 (28 Fehler in Chromium), grün mit der Korrektur
in Chromium und WebKit. Muster nur hell (Vereinbarung 30.10.2026).

## Ablauf in einem Satz

‚Preis der Quartiere erfassen‘ lässt sich allein einschalten und speichern; die Bezeichnungen der Kachel (‚Verlauf‘, ‚km‘) stehen
normal wie der Wert und mittig zu dessen erster Zeile (Variante B1, AppDesign APD-98, R-6.5); der Ø in der Statistik
hat ein Leerzeichen nach ‚Ø‘ und rückt, wenn die Zeile nicht reicht, linksbündig unter den Gesamtwert.

## U – Korrektur aus P-82

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| U-1 | iPad quer, iPhone hoch | Einstellungen: nur ‚Preis der Quartiere erfassen‘ antippen (echtes Tippen), Häkchen | Preis und Quartierliste aus | Schalter an, Quartierliste bleibt aus; Häkchen blau (R-4.4); gespeichert; am ersten Tag eines Aufenthalts das Feld ‚Preis‘ |
| U-2 | iPhone hoch und quer | Kachel eines Tages mit km | 14 km, mehrzeiliger Verlauf | ‚km‘ (`.w`) wie ‚Verlauf‘ und wie der Wert: 400, Textgröße, Textfarbe; Emojis klein; Icon und Text mittig zur ersten Zeile des Werts (`hig` – `kastenBezeichnung` nach jedem Schritt) |
| U-3 | alle | Statistik | 32 km an 4 Tagen, 500 € für 5 Nächte | ‚32,0 km␣␣␣␣␣(Ø␣8,0 km)‘, ‚500,00 €␣␣␣␣␣(Ø␣100,00 €)‘ – ein Leerzeichen nach ‚Ø‘ |
| U-5 | iPhone hoch und quer | Gegenprobe: Bezeichnung halbfett und 8 px tiefer | – | `kastenBezeichnung` meldet beides |
| U-4 | alle, App und Ausgabe | Statistik, Spalte schmal | wie U-3 | iPad: Ø in derselben Zeile; zu schmal: Umbruch vor der Klammer, ‚(‘ genau linksbündig unter der ersten Ziffer des Werts, der Ø selbst in einer Zeile |

## Warum die Prüfung es übersah

- **U-1:** Die Prüfung schaltete den Preis über die Daten bzw. per Skript-Klick zusammen mit anderen Schaltern und prüfte weder das
  Häkchen noch das Speichern mit diesem einen Schalter. Ursache: `#fPriceOn` fehlte im Vergleich `state()` – ohne andere Änderung
  schließt das Häkchen das Fenster nur. Deshalb ging es erst, wenn vorher ‚Quartierliste in der Ausgabe‘ geändert wurde.
- **U-2:** Die Formatierung der Bezeichnung war nicht verlangt (P-82/3 nannte nur den Text) – neue Vorgabe; Muster A (halbfett wie ‚Verlauf‘)
  und B (Apple-Standard), entschieden B1.
- **U-3, U-4:** Die Vorgabe war ‚2 Leerzeichen, immer eine Zeile‘ – geändert. Ein unsichtbarer Trennpunkt (U+200B) nach den geschützten
  Leerzeichen bricht in WebKit nicht um (WebKit-Lauf rot) – deshalb Wert und Ø als zwei Teile (`statHtml`).

## Gleiche Lücke anderswo

Alle Schalter des Einstellungsfensters stehen jetzt im Vergleich `state()`.
