# RLB-121 – Befund beim Bau: iPad hoch neben der Seitenleiste, große Schrift

**13.11.2026** · Sitzung ‚Reiselogbuch 0110‘

## Stand des Baus

- Gebaut (lokal, noch nicht veröffentlicht): AppDesign `aufzaehlung` mit langen Einträgen (`.ict.az` als Block, ‚·‘ und Preis in `.az-n`
  ohne Umbruch), `checkAufzaehlung` erweitert (passender Eintrag nicht getrennt, Klammer nie getrennt, nichts ragt hinaus); Reiselogbuch
  `quarterRanks` mit den Zeilen ‚Teuerste Quartiere‘ und ‚Günstigste Quartiere‘, Prüfung RLB-121/M-1 bis M-14, M-16 in `ablauf-preis-km.mjs`.
- `ablauf-preis-km` (Chromium): iPad quer, iPhone hoch, iPhone quer, Vorschau und Ausgabe grün; Wetter und Smileys (RLB-122) unverändert grün.
- **Rot: iPad hoch, Text xxxl (23 px)** – die ganze Statistik ragt rechts um etwa 46 px hinaus (gemessen: rechter Rand 850 px bei
  Fensterbreite 820 px); bei Text xxl (21 px) um etwa 10 px. Ohne die zwei neuen Zeilen passt es (rechter Rand 804 px) – **der Fehler kommt von
  RLB-121.**

## Ursache

Am iPad hoch ist der Inhalt neben der Seitenleiste nur etwa 386 px breit (so schmal wie ein iPhone hoch). Die Bezeichnung ‚Günstigste
Quartiere:‘ ist breit, und das letzte Wort mit Preis und ‚·‘ (z. B. ‚Lindau (42,00 €) ·‘) darf nach R-10.5 nicht getrennt werden – zusammen
passen beide Spalten nicht nebeneinander. Das Muster hat iPad hoch nur ohne Seitenleiste nachgebildet (Spalte bis 813 px), deshalb fiel
es dort nicht auf. Am iPhone hoch tritt es nicht auf, weil die Statistik dort ab 21 px schon untereinander steht (`ts-um`).

## Varianten (Bilder iPad hoch, Text xxxl, hell)

- **heute (fehlerhaft):** `arbeit/bilder/RLB-121 iPad hoch xxxl heute.png` – Werte rechts abgeschnitten.
- **A – untereinander (Empfehlung):** `arbeit/bilder/RLB-121 iPad hoch xxxl A untereinander.png` – im schmalen Inhalt ab Text xxl
  (21 px) steht die Bezeichnung über dem Wert, genau wie am iPhone hoch. Alle Einträge bleiben am Stück, nichts ragt hinaus.
- **B – Bezeichnung umbrechen:** `arbeit/bilder/RLB-121 iPad hoch xxxl B Bezeichnung umbrechen.png` – ‚Teuerste / Quartiere:‘ in zwei
  Zeilen; die Wertspalte bleibt so schmal, dass Namen mitten im Wort brechen (‚Rosengarte-n‘) und fast jeder Eintrag getrennt ist.

**So macht es Apple:** In Einstellungen und Kontakten stehen Bezeichnung und Wert bei großen Textgrößen (Bedienungshilfen) untereinander,
sobald sie nebeneinander nicht mehr passen – die Bezeichnung wird nicht abgeschnitten oder zerteilt (HIG ‚Typography – Dynamic Type‘:
Layout bei großen Textgrößen anpassen). Das entspricht Variante A und unserem `ts-um` am iPhone.

## Vorschlag zu A

- Bedingung: Text ab 21 px **und** der Inhalt ist schmal (unter 600 px, also iPad hoch neben der Seitenleiste oder geteilter Bildschirm) –
  wie heute am iPhone hoch.
- Umsetzung **allgemein** in AppDesign (`textStufe` in `ui.js` setzt `ts-um`) – dann gilt es für jede Ansicht mit `ts-um`, nicht nur für die
  Statistik; oder **nur im Reiselogbuch** für die Statistik. Allgemein braucht einen neuen Wortlaut (Designrichtlinie, `ts-um`), den ich dir
  vorher zeige.

## Offene Usertests

keine.

## Backlog-Erinnerung

Nächste Version Reiselogbuch 3.56.0 mit AppDesign 4.59.0: 1 Punkt in Arbeit (RLB-121) · Offen im Backlog: RLB-6 · AppDesign: APD-85 Teil 6,
APD-80, APD-30, APD-62, APD-70.
