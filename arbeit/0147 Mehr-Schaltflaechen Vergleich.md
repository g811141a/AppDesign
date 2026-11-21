# Mehr-Schaltflächen im Katalog – Vergleich

**Stand 21.11.2026** · Sitzung 0147 · AppDesign 4.67.1 · nur Abklärung, keine Änderung

## Die beiden Schaltflächen

| | Seitenleiste (`#sideMore`) | Seite ‚Hervorgehobene Quelle‘ (`#bkMenu`) |
|---|---|---|
| Aussehen | rund (`.round`), schwebend, Icon `ellipsis` | gleich: rund (`.round`, seit 4.67.1), schwebend, Icon `ellipsis` |
| Funktion | öffnet ein Menü | öffnet ein Menü |
| Ort | Kopf der Seitenleiste (`.side-head`) | Inhalt der Seite unter ‚Ausprobieren‘ (`.bk-knoepfe`) |
| Beim Drücken | hebt sich als helle Fläche mit Schatten auf das **1,3-fache** | wird **blass** (Icon 35 %) |
| Warum | `design.css` vergrößert nur Schaltflächen in Leisten: `.nb`, `.pnav`, `.bbar`, `.dlg-head`, `.side-head`, `.side-search`, `.fab` (`GROSS_SEL` in `ui.js`) | alle übrigen Schaltflächen werden blass (`button.beruehrt { opacity: .35 }`) |

## Was sagt das Regelwerk

- **R-3.6:** ‚solange der Finger liegt, wird eine Schaltfläche blass (Icon und Text 35 %), ein Leisten-Knopf hebt sich als helle Fläche mit Schatten (1,3-fach) über
  die Kapsel …‘. Die Regel unterscheidet also nach dem **Ort** (in einer Leiste oder nicht), nicht nach der Art der Schaltfläche.
- **Nach dem Wortlaut sind beide regelkonform.** `#sideMore` steht in einer Leiste und vergrößert sich, `#bkMenu` steht im Inhalt und wird blass.
- **Aber die Regel selbst hat eine Lücke.** Zwei gleich aussehende Schaltflächen mit derselben Funktion reagieren verschieden. Das widerspricht dem Grundsatz
  ‚gleiche Funktion = gleicher Baustein, gleiche Bedienung‘ (Designrichtlinie 1, R-1.1). Auch der Grund für das Vergrößern gilt für beide: Laut Kommentar in
  `design.css` (APD-107, P-88/1) war ‚blass‘ am Gerät unter dem Finger nicht zu sehen. Eine runde Schaltfläche im Inhalt verdeckt der Finger genauso.
- **Abweichend vom erwarteten Verhalten ist also `#bkMenu`.** Die Ursache liegt aber nicht in der Katalogseite, sondern in R-3.6 und im Selektor `GROSS_SEL`, die
  nach dem Ort statt nach der Schaltfläche entscheiden.
- In der App betrifft das heute alle Schaltflächen außerhalb der Leisten, z. B. ‚Backup erstellen‘, die Schaltflächen der Sprechblasen und die Schaltflächen
  in Fenstern unterhalb der Kopfzeile. Sie werden blass.

## Abklärung vor einer Änderung

Welche Schaltflächen sollen sich beim Drücken vergrößern?

- **a) Alle Schaltflächen:** entspricht deinem Wunsch ‚grundsätzlich‘. Offen ist, wie stark breite Text-Schaltflächen wachsen. 1,3-fach wäre bei
  ‚Abgleichbericht anzeigen‘ deutlich breiter als der Platz. Das klärt der Apple-Abgleich (Liquid Glass in iOS 26 – ob und wie stark Apple Text-Schaltflächen
  vergrößert, prüfe ich mit Quelle; bisher nur Vermutung).
- **b) Nur runde Icon-Schaltflächen (überall), Text-Schaltflächen bleiben blass:** gleich aussehende Schaltflächen verhalten sich gleich, die kleinste
  Änderung.

Danach folgen Apple-Abgleich, Muster, Testfall-Liste, Wortlaut R-3.6 (dein Ja) und eine Prüfung, die gegen 4.67.1 rot ist. Dann kommt die Bau-Frage.

## Übergabe

Notiert: In dieser Sitzung übergebe ich erst nach deinem Ok. Ab der nächsten Sitzung gilt wieder die Grundeinstellung (0 Nr. 13).
