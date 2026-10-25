# APD-20 – Kontext in der Zeile Zeit und Token · Testfall-Liste

**Stand 17.10.2026** · Sitzung Reiselogbuch 0010 · AppDesign 4.22.0 (nur Werkzeug, keine App-Änderung)

## Ziel

`werkzeug/messung.mjs` zeigt zusätzlich, wie groß die Sitzung ist: den **Kontext des letzten Modell-Aufrufs**
(Eingabe + aus Zwischenspeicher + geschrieben). Ab 300.000 steht dahinter **‚⚠ Übergabe fällig‘** (Zusammenarbeit 0 Nr. 13).

Vorschlag für die Zeile:

```
⏱ 02:14 · Token vorige Antwort: 5.120 neu · 98.000 aus Zwischenspeicher · 3.900 geschrieben · Kontext 102.000
⏱ 02:14 · Token vorige Antwort: … · Kontext 312.400 ⚠ Übergabe fällig
```

## Fälle (je Fall eine Prüfung in `tests/messung.mjs`)

| Nr. | Fall | Erwartet |
|---|---|---|
| H-1 | Normaler Verlauf, letzter Aufruf 102.000 | ‚Kontext 102.000‘, keine Warnung |
| H-2 | Genau 299.999 | keine Warnung |
| H-3 | Genau 300.000 | ‚⚠ Übergabe fällig‘ |
| H-4 | Kontext = **letzter** Aufruf, nicht die Summe aller Aufrufe der Antwort (der Fehler aus 0009) | Wert des letzten Aufrufs |
| H-5 | Ein Aufruf steht mehrfach in der Datei (gleiche `message.id`, Fund 2 aus APD-12) | nur einmal, nicht addiert |
| H-6 | Aufrufe der Hilfsagenten (`subagents/`, `isSidechain`) | zählen **nicht** zum Kontext (eigener Kontext), weiter aber zu ‚Token vorige Antwort‘ |
| H-7 | Nach automatischer Zusammenfassung (`isCompactSummary`) | Kontext des letzten Aufrufs danach (kleiner) – Hinweis ‚⚠ Übergabe fällig‘ trotzdem, weil Nr. 13 die Übergabe auch nach einer Zusammenfassung verlangt |
| H-8 | Noch kein Modell-Aufruf mit Verbrauch | ‚Kontext –‘ |
| H-9 | Erste Antwort der Sitzung (keine vorige Antwort, ‚Token: –‘) | Kontext trotzdem angezeigt |
| H-10 | Sitzung nach Neustart in zwei Ordnern (`-home-user` und `-home-user-AppDesign`) | Datei wie bisher (M-7), Kontext aus ihr |
| H-11 | Tausenderpunkt | wie M-11 |
| H-12 | Gegenprobe (`--gegenprobe`, jede Zeile ein eigener Aufruf) | Prüfung rot; H-4/K-5 so gewählt, dass die Summe einen anderen Wert gäbe |

## Außerdem

- Grenze 300.000 als eine Konstante im Werkzeug; Zusammenarbeit §2 und `UEBERGABE.md` (Hinweis ‚bis APD-20 gebaut ist …‘) anpassen.
- Kein Usertest am Gerät nötig (nur Werkzeug); Testfälle: nächste Antwort zeigt die Zeile mit Kontext.
- Reiselogbuch bleibt auf Fassung 4.21.1 (nicht heben, außer du willst es).

## Entschieden (17.10.2026)

Warnung auch nach einer Zusammenfassung (H-7); keine Vorwarnung bei 250.000.
