# A-24 und A-25 – Fall-Liste

**Stand 18.10.2026** · Sitzung Reiselogbuch 0014 · geplant als Korrekturversion **AppDesign 4.25.1** und **Reiselogbuch 3.23.1**
(Reiselogbuch wird dafür auf Fassung 4.25.1 gehoben – nur mit deinem Ja). Muster A-25: `arbeit/A-25 Muster.html`,
Bilder `arbeit/bilder/A-25-muster-hell.png` und `…-dunkel.png`.

## A-24 – Kopf- und Suchzeile zittern beim Tippen am iPhone (R-2.1, R-2.3)

**Nachgebaut (Zusammenarbeit 0 Nr. 1), rot gegen 4.25.0:** neue Prüfung `ReiseLogBuch/tests/ablauf-suche-iphone.mjs`
(Kopie: `arbeit/A-24 ablauf-suche-iphone.mjs`). Ablauf wie am Gerät: Reiselogbuch mit 40 Tagen öffnen, in die Mitte bzw. ans
Ende rollen, Lupe antippen, Tastatur offen, „Sydney“ Buchstabe für Buchstabe tippen. In jedem Bild wird die Lage von Kopfzeile
und Suchfeld auf dem Bildschirm gemessen.

**Ergebnis gegen 4.25.0 (Chromium und WebKit, iPhone hoch und quer, hell und dunkel):**
- Das Suchfeld wird **bei jedem Buchstaben ersetzt** (die App baut die ganze Seite samt Kopfzeile neu auf und setzt den Fokus
  auf das neue Feld) – in allen 16 Fällen rot.
- Mit Safari nachgebildet **(‚alle‘: sichtbarer Bereich verschoben + Fokusverlust)** springen Kopf- und Suchzeile bei jedem
  Buchstaben um **120 px** für 2 Bilder – das ist das Zittern. Einzeln (nur verschoben, nur Fokusverlust, nur kürzere Seite)
  bleibt es grün – der Fehler zeigt sich erst zusammen (wie bei P-52).
- **Gegenprobe:** bleibt das Suchfeld erhalten, ist das Springen weg.

**Ursache:** Safari schließt die Tastatur ein Stück, sobald das Feld mit dem Fokus verschwindet, und öffnet sie beim neuen Fokus
wieder; dabei verschiebt es den sichtbaren Bereich und meldet das erst später – die feste Leiste rückt kurz mit. Am iPad bleibt
der sichtbare Bereich bei offener Tastatur oben stehen, deshalb dort kein Zittern.

**Korrektur (Vorschlag):** beim Tippen in der Suche wird **nur der Inhalt** neu aufgebaut (Tage, Tabelle, Trefferzahl), die
Kopfzeile mit dem Suchfeld bleibt dasselbe Element und behält den Fokus – iPad und iPhone, Suche im Reiselogbuch und in der
Seitenleiste. Allgemeine Regel R-2.3 ergänzt: ‚Beim Tippen bleibt das Suchfeld dasselbe Feld (nie neu aufbauen)‘; Prüfung als
Grundregel in `hig.mjs` (Suchfeld nach jedem Buchstaben dasselbe Element mit Fokus) für alle Apps.

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| S1 | iPhone hoch, Mitte der Seite, Tastatur offen, „Sydney“ tippen | Kopf- und Suchzeile bewegen sich in keinem Bild (0 px) | ablauf-suche-iphone (neu) |
| S2 | iPhone quer | wie S1 | ablauf-suche-iphone |
| S3 | hell und dunkel | wie S1 | ablauf-suche-iphone |
| S4 | Safari einzeln: sichtbarer Bereich verschoben / Fokusverlust / Seite wird kürzer (Ende der Seite) | wie S1 | ablauf-suche-iphone |
| S5 | Safari alle zusammen | wie S1 (heute 120 px) | ablauf-suche-iphone |
| S6 | Suchfeld nach jedem Buchstaben | dasselbe Feld, Fokus bleibt, Cursor am Ende | ablauf-suche-iphone, Grundregel neu |
| S7 | Buchstaben löschen bis leer, ⓧ, ⌃ ⌄, Eingabetaste | Trefferzahl stimmt, Zeilen fest, Fokus bleibt | ablauf-suche-iphone (erweitert), vorhanden |
| S8 | Pause 0,5 s nach dem Tippen | erst dann zum Treffer springen (R-2.3, wie heute) | ablauf-suche-tabelle, ablauf-suche-woerter |
| S9 | iPad quer und hoch (Tabelle) | wie heute, Feld bleibt ebenfalls erhalten | ablauf-suche-tabelle (erweitert um S6) |
| S10 | Suche in der Seitenleiste / Startliste (iPhone) | Feld bleibt, Zeile fest | ablauf-suche-liste (erweitert um S6) |
| S11 | „…“ und mehrere Wörter (A-21) | unverändert | ablauf-suche-woerter |
| S12 | Gegenprobe | mit dem alten Neuaufbau ist S1/S6 rot | `--gegenprobe` |

**Nur am Gerät (Prüfliste):** iPhone, Reiselogbuch in der Mitte, Lupe, langsam und schnell tippen – nichts zittert.

## A-25 – runde Schaltflächen eiförmig (R-3.1/R-3.2, 15.5)

**Gemessen (4.25.0):** einzelne runde Schaltflächen (‹ zurück, Seitenleiste, Nach oben/Ans Ende) sind **44 × 44, kreisrund – ok**.
Eiförmig ist die **blaue Markierung ‚gedrückt‘ in der Kapsel** (Lupe bei offener Suche, … bei offenem Menü, Teilen bei offenem
Menü, blaue Füllung `.fill`): **42 × 36 px**, weil die Schaltfläche 48 × 42 groß ist und die Markierung 3 px Luft hat.

**Seit wann:** seit **Reiselogbuch 2.3.0 (09.10.2026)**, in AppDesign seit **4.0.0** unverändert – vorher war die ganze
Schaltfläche (48 × 44) hinterlegt, also ebenfalls nicht rund. **Rund sind seit Reiselogbuch 2.1.4 die Markierungen bei Wetter und
Smileys (36 × 36, wie Tapback)** – die Regel in design.css lautet schon heute ‚bei Emojis ein Kreis, bei Text eine Kapsel‘; die
Icons in der Kapsel waren davon nicht erfasst. *Falls du eine andere Stelle meinst, die schon einmal rund war: bitte nennen.*

**Varianten (Muster):**
- **A (Vorschlag):** Kreis 36 × 36 mittig, genau wie Wetter und Smileys – eine Form für alle Icon-Markierungen.
- **B:** Kreis 38 × 38 – größer, fast so hoch wie der Innenraum der Kapsel.
- Text-Schaltflächen in der Kapsel (z. B. ‚Fertig‘) bleiben eine Kapsel.

| Nr. | Fall | Erwartung | Prüfung |
|---|---|---|---|
| K1 | Lupe bei offener Suche (iPad Kopfzeile, iPhone Leiste, Seitenleiste) | Markierung Kreis: Breite = Höhe | Grundregel neu ‚Kreis‘ (hig.mjs) |
| K2 | … und Teilen bei offenem Menü | Kreis | Grundregel |
| K3 | blaue Füllung `.fill` (z. B. Häkchen im Fenster) | Kreis | Grundregel |
| K4 | einzelne runde Schaltflächen (`.round`, Nach oben/Ans Ende, Mikrofon) | 44 × 44, Kreis | Grundregel |
| K5 | Wetter, Smileys | unverändert 36 × 36 | Grundregel |
| K6 | Text in der Kapsel | Kapsel (keine Prüfung auf Kreis) | Grundregel nimmt `.txt` aus |
| K7 | iPad quer/hoch, iPhone hoch/quer, hell/dunkel | Kreis überall; Markierung innerhalb des Randes | voller Lauf |
| K8 | zwei Markierungen nebeneinander (Lupe und …) | stoßen nicht aneinander (12 px Luft) | Grundregel |
| K9 | Gegenprobe | mit 42 × 36 ist K1 rot | `--gegenprobe grundregeln` |

**Regeltext 15.5 neu (Teil):** ‚Die Markierung ‚gedrückt‘ ist bei Icons ein **Kreis 36 × 36** (wie Wetter und Smileys), bei
Text eine Kapsel (seit 4.25.1, vorher 42 × 36).‘
