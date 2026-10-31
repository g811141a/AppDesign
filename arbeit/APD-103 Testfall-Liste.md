# APD-103 – Testfall-Liste: Lücke im Regelwächter bei W-14 schließen

Stand 31.10.2026, Sitzung 0067 · **bestätigt** (Nutzer 31.10.2026: Testfall-Liste und Wortlaut so übernehmen) · Prüfung `tests/regelwaechter.mjs` (W-14, Gegenprobe `--gegenprobe`).

## Die Lücke (aus `werkzeug/regelwaechter.mjs`, `pruefeKontext` und `fuehreAus`)

W-14 lässt ein Fenster heute in zwei Fällen ungeprüft durch:

1. **Ausgabe davor ‚unsicher‘:** Steht vor dem Fenster ein Denkschritt, speichert die Sitzungsdatei die Ausgabe nicht wörtlich
   (Zusammenarbeit 2.8 ‚Grenze‘). Dann wird gar nichts geprüft (APD-99/C-7).
2. **Fenster noch nicht in der Sitzungsdatei:** Vor dem Zeigen (PreToolUse) fehlt das Fenster oft noch in der Datei. Dann wird
   W-14 vor dem Zeigen übersprungen (APD-99/C-8), erst der Stop prüft – zu spät, das Fenster ist schon gezeigt.

In 0065 ging so ein Fenster ohne Satz ‚Kontext N‘ durch.

## Vorschlag: Rückfall statt Durchlassen

Lässt sich der Satz nicht prüfen (Fall 1 oder 2), prüft der Wächter das, was **sicher** in der Datei steht: Seit der vorigen
Nachricht bzw. dem vorigen Fenster muss `messung.mjs` aufgerufen worden sein und einen Kontext gemeldet haben. Fehlt der Aufruf,
lehnt er ab. Werkzeug-Aufrufe und ihre Ergebnisse stehen beim Zeigen schon in der Datei, weil das Fenster erst nach ihnen kommt.

Was offen bleibt (Selbstkontrolle): ob der Satz ‚Kontext N‘ in der unsicheren Ausgabe wirklich dasteht und die Zahl stimmt.

## Testfälle (automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| D-1 | Ausgabe vor dem Fenster ‚unsicher‘, `messung.mjs` seit der vorigen Nachricht aufgerufen (Ergebnis mit ‚Kontext N‘) | durch (vor dem Zeigen und beim Stop) |
| D-2 | Ausgabe ‚unsicher‘, seit der vorigen Nachricht kein Aufruf von `messung.mjs` | vor dem Zeigen abgelehnt, beim Stop W-14 ‚messung.mjs davor nicht aufgerufen‘ |
| D-3 | Ausgabe ‚unsicher‘, `messung.mjs` nur vor dem vorigen Fenster derselben Antwort | abgelehnt, W-14 |
| D-4 | Fenster noch nicht in der Sitzungsdatei, `messung.mjs` seit der vorigen Nachricht aufgerufen | vor dem Zeigen durch; beim Stop wie bisher der Satz geprüft |
| D-5 | Fenster noch nicht in der Sitzungsdatei, kein Aufruf von `messung.mjs` | vor dem Zeigen abgelehnt (bisher durch, APD-99/C-8) |
| D-6 | `messung.mjs` aufgerufen, Ergebnis ohne ‚Kontext N‘ (Werkzeug meldet einen Fehler) | abgelehnt, W-14; Ausweg wie bisher `REGELWAECHTER_AUS=W-14` |
| D-7 | Ablauf aus 0065 nachgebaut: Fenster nach einem Neustart des Arbeitsprozesses, Ausgabe davor ‚unsicher‘, kein `messung.mjs` | rot gegen 4.47.0 (durch), grün nach der Änderung (abgelehnt) |
| D-8 | bisherige Fälle APD-99/C-1 bis C-13 und W-1 bis W-13 | unverändert grün; C-7 und C-8 bekommen einen Aufruf von `messung.mjs` davor |
| D-9 | Gegenprobe: Rückfall abgeschaltet | D-2, D-3, D-5, D-7 rot |

## Wortlaut (bestätigt 31.10.2026, Zusammenarbeit 2.8, 0 Nr. 29)

**Alt** (2.8, ‚Vor jedem Auswahlfenster‘):

> lehnt es ab, wenn eine Frage keine Empfehlung zuerst oder kein ‚Ich schreibe im Chat‘ hat oder wenn die Ausgabe davor keinen
> Satz mit ‚Kontext N‘ aus `messung.mjs` enthält.

**Neu:**

> lehnt es ab, wenn eine Frage keine Empfehlung zuerst oder kein ‚Ich schreibe im Chat‘ hat oder wenn die Ausgabe davor keinen
> Satz mit ‚Kontext N‘ aus `messung.mjs` enthält; steht diese Ausgabe (noch) nicht wörtlich in der Sitzungsdatei, lehnt er ab,
> wenn seit der vorigen Nachricht bzw. dem vorigen Fenster `messung.mjs` keinen Kontext gemeldet hat.

**Alt** (2.8, ‚Grenze‘):

> Ausgaben, die in derselben Nachricht nach einem Denkschritt stehen, speichert die Sitzungsdatei nicht wörtlich
> (Befund 26.10.2026) – für sie bleibt die Uhrzeitzeile Selbstkontrolle.

**Neu:**

> Ausgaben, die in derselben Nachricht nach einem Denkschritt stehen, speichert die Sitzungsdatei nicht wörtlich
> (Befund 26.10.2026) – für sie bleiben die Uhrzeitzeile und der Satz ‚Kontext N‘ Selbstkontrolle; geprüft wird nur der Aufruf
> von `messung.mjs`.

## Umfang

`werkzeug/regelwaechter.mjs` (`pruefeKontext`, `fuehreAus`), `tests/regelwaechter.mjs` (D-1 bis D-9), Zusammenarbeit 2.8 (Version
3.5.0). Allgemein (AppDesign), keine App-Änderung; ein einzelner Punkt – nach 0 Nr. 8 in ‚0. Nächste Version‘ sammeln.
