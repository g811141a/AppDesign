# APD-143 – Liste bleibt beim Kontextmenü stehen – Wortlaut und Testfall-Liste

Sitzung 0144, 20.11.2026. Entscheidung des Nutzers (im Fenster): **a) Liste bleibt stehen wie bei Apple** – Menü unter der Kachel, wenn es passt, sonst
darüber.

## Befund (nachgestellt auf der Prüfseite, Arbeitsstand = 4.66.0)

iPhone quer, 3 Einträge: beim Kontextmenü der zweiten (unteren) Kachel rollt die Liste um 8 px (Chromium) bzw. 6 px (WebKit) und springt beim Schließen
in einem Bild zurück (das Polster unten wird entfernt, während das Menü in 0,25 s schrumpft). Andere Kacheln und iPhone hoch: Liste bleibt stehen.
Ursache: `placeAt` (‚beside‘ ohne Platz daneben) rollt die Liste, damit das Menü unter der Kachel Platz hat (R-4.2 ‚die Liste rückt dafür‘).

**So macht es Apple:** HIG ‚Context menus‘ (https://developer.apple.com/design/human-interface-guidelines/context-menus): „Depending on the location of the
selected content, a context menu might open above or below it, so you might also need to reverse the order of items to match the position of the menu.“
Dass die Liste dafür rollt, steht dort nicht. **Abweichung:** die Reihenfolge der Einträge bleibt auch über der Kachel gleich (die HIG sagt ‚might …
reverse‘ – Vermutung: Apple dreht sie nicht immer; wir bleiben bei einer Reihenfolge, damit die Wischaktionen R-7.8 gleich bleiben).

## Wortlaut (0 Nr. 29)

### R-4.2 (Regelkatalog, Designrichtlinie 17)

**Alt:**
> **Kontextmenü** einer Kachel: daneben bzw. (iPhone) darunter, immer vollständig und ganz über der Backup-Kachel (ohne Kachel über der Offline-Zeile bzw.
> dem Rand); die Liste rückt dafür; ohne ‚Öffnen‘ | kontextmenue.mjs

**Neu:**
> **Kontextmenü** einer Kachel: daneben bzw. (iPhone) darunter, reicht der Platz darunter nicht, darüber – immer vollständig und ganz über der Backup-Kachel
> (ohne Kachel über der Offline-Zeile bzw. dem Rand); die Liste bleibt dabei stehen, auch beim Schließen; nur wenn das Menü weder darunter noch darüber
> ganz passt (z. B. große Schrift), rückt sie dafür; ohne ‚Öffnen‘ | kontextmenue.mjs – `checkContextMenus` (Lage, Liste bleibt stehen) · pruefseite.mjs
> – Teil `menue` (zweite Kachel, Schließen ohne Sprung)

### Designrichtlinie 15.4 ‚Kontextmenü‘

**Alt:**
> … öffnet ein Menü (15.6) rechts neben der Kachel, ohne Platz daneben (iPhone) linksbündig darunter; bei wenigen Einträgen bekommt die Liste unten Platz;
> die Lage über der Backup-Kachel bzw. der Offline-Zeile liefert `sideFootRect()`. …

**Neu:**
> … öffnet ein Menü (15.6) rechts neben der Kachel, ohne Platz daneben (iPhone) linksbündig darunter, reicht der Platz darunter nicht, darüber (wie Apple);
> die Liste bleibt stehen – nur wenn das Menü auf keiner Seite ganz passt, rückt sie und bekommt bei wenigen Einträgen unten Platz; die Lage über der
> Backup-Kachel bzw. der Offline-Zeile liefert `sideFootRect()`. …

Der Rest beider Texte bleibt wörtlich. Dazu (keine Regel) die Kommentare in `v4/ui.js` (`placeAt`) und in den Prüfungen.

## Testfall-Liste (Testfall automatisch, Nummern gelten nur in dieser Datei)

| Nr. | Gerät · Lage | Handlung · Daten | Erwartet | Prüfung |
|---|---|---|---|---|
| L-1 | iPhone quer | Prüfseite, 3 Einträge; jede Kachel lange drücken | Liste rollt nicht (Lage der Liste und der Kachel vor = offen); Menü ganz sichtbar, linksbündig unter oder über der Kachel, über der Offline-Zeile; **rot gegen 4.66.0** (zweite Kachel 8 px) | `checkContextMenus` (neu: Liste bleibt stehen) |
| L-2 | iPhone quer | wie L-1, Menü schließen | kein Sprung: Lage der Liste während des Schrumpfens und danach = vorher; das Abbild schrumpft zur Kachel (R-4.13) | Prüfseite Teil `menue`: `checkWachsen` mit der zweiten Kachel |
| L-3 | iPhone hoch | 3 Einträge, jede Kachel | wie L-1 | `checkContextMenus` |
| L-4 | iPhone hoch und quer | lange Liste (20 Einträge), ganz nach unten gerollt, unterste Kachel | Menü über der Kachel, Liste bleibt stehen | `checkContextMenus` (Fall ‚ende‘) |
| L-5 | iPhone quer | ‚Bewegung reduzieren‘, zweite Kachel | wie L-1 und L-2, nur Überblenden | Prüfseite Teil `menue` (Durchgang ‚Bewegung reduzieren‘) |
| L-6 | iPhone hoch | Text 28 (AX1), Kachel in der Mitte | passt das Menü weder darunter noch darüber: Liste rückt (Rückfall), Menü ganz sichtbar, Kachel sichtbar | `checkContextMenus` (große Schrift, App `kontextmenue-regeln`) |
| L-7 | iPhone hoch → quer | Kontextmenü offen, drehen | Menü bleibt an der Kachel, ganz sichtbar (R-8.1) | bestehend `ablauf-drehen-iphone` |
| L-8 | iPad quer und hoch | jede Kachel | unverändert rechts neben der Kachel | bestehend `checkContextMenus`, `ablauf-seitenleiste-hoch` |
| L-9 | iPhone hoch (App) | oberste und unterste sichtbare Kachel | Menü unter bzw. (unterste) über der Kachel, linksbündig, über der Backup-Kachel – Erwartung ‚unter der Kachel‘ wird ‚unter oder über‘ | App `ablauf-seitenleiste-position` |
| L-10 | alle | nach jedem Schritt | Grundregeln (`hig.mjs`) | wie bisher |

**Gegenprobe:** das alte Rollen (Liste rückt, damit das Menü darunter passt) eingeschleust → L-1 und L-2 rot (`--gegenprobe pruefseite` bzw.
Gegenprobe in `kontextmenue.mjs`).

**Testfall (User)** im Usertest der Version: iPhone quer und hoch, untere Kachel lange drücken – die Liste bleibt stehen, das Menü steht darüber; schließen
– nichts springt (Gefühl am Gerät).

AD-Bean: keine, weil das Kontextmenü (`openMenu`/`placeAt`) noch keine Bean ist (Kandidat für APD-142 bzw. eine Bean `menue`).
