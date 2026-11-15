# APD-133 – Befund: nach dem Drehen steht der Inhalt am Ende

**Stand 15.11.2026** · Sitzung ‚Reiselogbuch 0119‘ · Stand der Zweige `vorbereitung-4.59.3` / `vorbereitung-3.56.3` · es wurde nichts gebaut.

## Ergebnis

Die Ursache liegt in der **App** (`ui.js`, Gedächtnis für den obersten Eintrag, R-8.1), nicht in der Prüfung. Ausgelöst wird sie durch eine
Eigenheit des WebKit der Prüfumgebung unter Last: Die Seite sieht die neue Fenstergröße schon, **bevor** das Ereignis `resize` dafür ankommt.

## Nachgestellt

- `ablauf-seitenleiste-hoch` in WebKit, 4 Läufe gleichzeitig: 1 von 4 rot, Zustand wie in 0118 (Rollstand 2574 von 2574, alle 30 Tage über dem Bild).
- Eigene Messung mit Protokoll (jeder Aufruf von `render`, `rememberTop`, `restoreTop`, jedes `resize` und `scroll` mit Zeit, Fenstergröße,
  Rollstand und Gedächtnis). Nur Drehen: 20 Runden, 0 rot. Mit Seitenleiste aus und ein davor (APD-97/L-3): 20 Runden, 2 rot; weitere 60 Runden, 1 rot.
- In allen 3 roten Runden derselbe Ablauf, in keiner grünen.

## Ablauf im Fehlerfall (Protokoll einer roten Runde)

| Zeit | Was geschieht | Gedächtnis |
|---|---|---|
| 1970 ms | `resize` für die Zwischengröße 1000×1000. `ui.js` plant das Wiederherstellen: nach zwei Bildern und nach 350 ms. | 20.08. |
| 2000 ms | Das geplante `restoreTop` läuft. Das Fenster misst schon 1180×820, das `resize` dafür ist noch nicht angekommen. `restoreTop` merkt sich 1180×820 als ‚fertig gedreht‘. | 20.08. |
| 2215 ms | `resize` für 1180×820 kommt an. `ui.js` hält das Drehen für erledigt und plant nichts. Die App baut die Tabelle neu; der Inhalt ist kürzer (5871 → 2574), der Rollbereich rutscht ans Ende. | 20.08. |
| 2263 ms | Das Rutschen meldet `scroll`. `rememberTop` ist nicht mehr gesperrt und überschreibt das Gedächtnis mit ‚ganz am Ende‘. | **Ende** |
| 2326 ms | Das zweite geplante `restoreTop` (350 ms) stellt ‚ganz am Ende‘ wieder her. | Ende |

Im grünen Fall kommt das `resize` für 1180×820 vor dem geplanten `restoreTop` an; dann bleibt `rememberTop` gesperrt, bis die App neu gebaut hat.

## Gegenversuch (nur in der Messung, nicht im Repo)

`restoreTop` überspringt, wenn die Fenstergröße von der zuletzt mit `resize` gemeldeten abweicht (das `resize` kommt noch und plant selbst neu).
60 Runden, 4 gleichzeitig: 0 rot; die Lage trat dabei 10-mal auf und wurde übersprungen. Ohne den Versuch: rot genau in den Runden mit dieser Lage.

## Einordnung

- **Am Gerät:** weiß ich nicht. Beim Drehen kommt dort ein `resize`; die Lücke zwischen neuer Größe und Ereignis betrug in der Prüfumgebung
  rund 200 ms. Vermutung: am Gerät allenfalls bei laufend geänderter Fenstergröße (Fenster ziehen, geteilter Bildschirm). Gemeldet wurde es nie.
- **Warum nur nach APD-97/L-3:** weiß ich nicht sicher. Vermutung: nach dem Ein- und Ausblenden ist der Neuaufbau langsamer, die Lücke wird größer.
- **Chromium:** grün (0118); dort habe ich die Lage nicht gemessen.
- **Prüfung:** sie meldet zu Recht. Ein voller Lauf wertet einen Lauf, der allein grün ist, als ‚wackelt‘ (gilt als grün, `tests/lauf.mjs`);
  in 0118 war er allein 1 von 3-mal rot.

## Vorschlag für die Korrektur (nicht gebaut)

`ui.js` merkt sich die zuletzt mit `resize` gemeldete Größe; `restoreTop` tut nichts, solange das Fenster eine andere Größe hat. Etwa 3 Zeilen.

Testfall-Liste (Entwurf, je Fall eine feste Prüfung in Chromium und WebKit):

| Nr. | Fall | Erwartet |
|---|---|---|
| B-1 | iPad hoch, 20.08. oben, Seitenleiste aus und ein; neue Größe ist sichtbar, bevor `resize` kommt (in der Prüfung fest nachgebildet: Größe ändern, geplantes `restoreTop` läuft, dann `resize`), nach quer | 20.08. bleibt oben, Tabelle |
| B-2 | dasselbe zurück nach hoch | 20.08. bleibt oben, Kästen |
| B-3 | dasselbe am Ende des Inhalts (Fazit oben) | Ende bleibt Ende |
| B-4 | dasselbe ganz oben | bleibt ganz oben |
| B-5 | Gegenprobe gegen 4.59.2 | B-1 rot |
| B-6 | Drehen ohne Lücke (wie bisher), iPad und iPhone | unverändert grün (bestehende Prüfungen R-8.1) |
