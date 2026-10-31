# APD-62 / APD-38/T-43 – Titel antippen rollt nach oben: Testfall-Liste und Wortlaut

Stand 31.10.2026, Sitzung 0067 · **bestätigt ohne Muster** (Nutzer 31.10.2026: Testfall-Liste und Wortlaut) · aus APD-62 (APD-38/T-43, V3) · allgemein (AppDesign) · für 4.49.0 neben APD-85 Teil 3.

## Apple-Abgleich (0 Nr. 23, 2.6)

- **So macht es Apple** (`arbeit/APD-38 Framework-Vergleich.html`, APD-38/T-43): ein Tipp auf die **Statusleiste** rollt den Inhalt
  sanft ganz nach oben. In der Home-Bildschirm-App wirkt das für eigene Rollbereiche nicht – AppDesign rollt nur im eigenen
  Rollbereich (15.22). Framework7 nimmt dafür den Titel der Leiste (`scrollTopOnTitleClick`).
- **Abweichung:** Titel statt Statusleiste – nachgebaut, weil der Apple-Weg im Web nicht wirkt (Zeile in 16).
- **Betroffen:** R-2.5 (langes Drücken auf einen gekürzten Titel zeigt die Sprechblase – kurzes Antippen zeigt dort nichts und ist
  frei), 15.1 ‚Nach oben / Ans Ende‘ (gleiche Wirkung), R-7.5 / `navFertig` (kein Tipp während eines Seitenwechsels), ‚Bewegung
  reduzieren‘.

## Verhalten (Vorschlag)

Kurzes Antippen des Titels rollt den zugehörigen Bereich sanft ganz nach oben: Titel der Kopfzeile (15.3) → Inhalt; Titel der
Seitenleiste (15.4) → Seitenleiste; Titel der Fenster-Kopfzeile (15.8) → Inhalt des Fensters. Steht der Bereich schon oben, passiert
nichts. Ein Tipp oder Wischen während des Rollens hält es an (wie ‚Nach oben‘). ‚Bewegung reduzieren‘: sofort oben. VoiceOver: der
Titel bleibt Überschrift (R-1.8); ‚Nach oben‘ (15.1) bleibt der Weg für VoiceOver.

## Testfälle (automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| H-1 | Inhalt gerollt, Titel der Kopfzeile kurz antippen | Inhalt rollt sanft nach oben, Rollstand 0; Leisten stehen fest (R-2.1) |
| H-2 | Seitenleiste gerollt, ihren Titel antippen | nur die Seitenleiste rollt nach oben, der Inhalt bleibt |
| H-3 | Fenster mit langem Inhalt gerollt, Fenstertitel antippen | Fensterinhalt nach oben, Seite dahinter steht still (R-7.3) |
| H-4 | schon oben, Titel antippen | nichts rollt, nichts springt |
| H-5 | gekürzter Titel lange drücken (R-2.5) | Sprechblase wie bisher, kein Rollen |
| H-6 | während des Rollens nach oben tippen bzw. wischen | Rollen hält sofort an |
| H-7 | ‚Bewegung reduzieren‘ | sofort oben, ohne Bewegung |
| H-8 | Tipp während eines Seitenwechsels bzw. Zurückwischens | kein Rollen |
| H-9 | alle Ansichten: iPad quer/hoch, iPhone hoch/quer (niedrige Leisten R-2.4), Chromium und WebKit | wie H-1 bis H-8 |
| H-10 | Gegenprobe: Antippen abgeschaltet | H-1 bis H-3 rot |

## Wortlaut (bestätigt 31.10.2026, 0 Nr. 29)

**Neu – Regelkatalog 17, Abschnitt 2 nach R-2.6:**

> | R-2.7 | **Titel antippen = nach oben:** kurzes Antippen des Titels in Kopfzeile, Seitenleiste oder Fenster-Kopfzeile rollt den
> zugehörigen Bereich sanft ganz nach oben (‚Bewegung reduzieren‘: sofort); schon oben nichts; Tippen oder Wischen hält das Rollen
> an | ablauf.mjs | – | 15.3, 15.4, 15.8 |

**Neu – 15.3 Kopfzeile, Punkt nach ‚Gekürzter Titel‘:**

> - **Titel antippen** (R-2.7): rollt den Inhalt sanft ganz nach oben – Ersatz für das Antippen der Statusleiste bei Apple, das in
>   der Home-Bildschirm-App für eigene Rollbereiche nicht wirkt (Abweichung, 16). Ebenso der Titel der Seitenleiste (15.4) und der
>   Fenster-Kopfzeile (15.8).

**Neu – 16 Bewusste Abweichungen:**

> | Titel antippen statt Statusleiste (Apple: Tipp auf die Statusleiste rollt nach oben) | – | wirkt in der Home-Bildschirm-App
> für eigene Rollbereiche nicht; Titel antippen rollt nach oben (R-2.7) | 31.10.2026 |
