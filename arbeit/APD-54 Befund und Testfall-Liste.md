# APD-54 Fremden Text bereinigen – Befund und Testfall-Liste

**Bestätigt: Ja zu D-1 bis D-3 und T-1 bis T-9; allgemeine Regel: nein (Nutzer 15.11.2026, Sitzung 0118).**

**Stand 15.11.2026** · Sitzung ‚Reiselogbuch 0118‘ · nichts gebaut

## Befund

Durchgesehen habe ich alle Meldungen: Sprechblasen (`confirmPop`, `choosePop`), Hinweisfenster (`inform`), Menüs (`menuHtml`), die Meldung nach dem Teilen (`shareResultText`) und die Smiley-Leiste – in `v4/ui.js` und in `index.html` des Reiselogbuchs.

| Nr. | Stelle | Befund |
|---|---|---|
| B-1 | `ui.js` Menüs (`menuHtml`: Beschriftung, Wert, Zusatzzeile, Hinweis) | bereinigt mit `esc()` – in Ordnung |
| B-2 | `ui.js` Hinweisfenster-Titel, Schaltflächen der Sprechblase, Dateiname (`fileNameHtml`) | bereinigt – in Ordnung |
| B-3 | `index.html` ‚… mit allen Einträgen löschen?‘ (Titel des Reiselogbuchs), ‚Backup laden‘ (Fehlertext) | bereinigt – in Ordnung |
| B-4 | **`index.html` Zeile 1336 – Smiley-Leiste:** jeder Smiley der Schnellauswahl kommt ohne `esc()` in `data-m="…"` und in die Schaltfläche | **Lücke** |
| B-5 | **`index.html` Zeile 1343 – Sprechblase ‚… aus der Schnellauswahl entfernen?‘:** der Smiley kommt ohne `esc()` in den Text | **Lücke** |

- **Woher der fremde Text kommen kann:** Die Schnellauswahl liest die Schlüssel aus `moodUsage` und `foodUsage`. Beim Tippen entstehen dort nur Emojis (`emojisIn`). Über **Backup laden** und den **Abgleich** kommen die Schlüssel aber ungeprüft aus der Datei bzw. vom anderen Gerät.
- **Nicht durchgesehen:** die übrige Anzeige der App (Listen, Tabellen, Kästen, Ausgabe). Für die Tabelle gibt es schon die Prüfung RLB-121/M-12 ‚Sonderzeichen wörtlich, kein HTML‘.
- **Text der Sprechblase bleibt HTML:** `confirmPop` und `inform` nehmen weiter HTML an (z. B. der fette Dateiname); die App bereinigt, was aus den Daten kommt.

## Annahmen

- **D-1:** Behoben wird in `index.html` an beiden Stellen mit `esc()`; `ui.js` bleibt unverändert.
- **D-2:** Zusätzlich übernimmt `normalize` aus `moodUsage`, `foodUsage`, `hiddenMoods` und `hiddenFood` nur Schlüssel, die ganz aus Emojis bestehen (`emojisIn`) – so bleibt fremder Text gar nicht erst in den Daten. Vorhandene Smileys und Zähler bleiben unverändert.
- **D-3:** Am Aussehen und an der Bedienung ändert sich nichts; kein Muster.

## Testfälle (automatisch)

Neue Prüfung `tests/ablauf-fremdtext.mjs` im Reiselogbuch, iPad quer und iPhone hoch, Chromium und WebKit.

| Nr. | Ausgang und Handlung | Erwartet |
|---|---|---|
| T-1 | Daten mit `moodUsage` = `{ "<b>x</b>": 3, "🙂": 2 }` ohne `normalize` gesetzt, Tageserfassung öffnen | in der Smiley-Leiste kein Element `<b>`; der Text steht wörtlich da |
| T-2 | wie T-1, den Eintrag lang drücken | Sprechblase zeigt ‚<b>x</b> aus der Schnellauswahl entfernen?‘ wörtlich, kein Element `<b>` in der Blase |
| T-3 | Schlüssel mit Anführungszeichen `"` und `'` | `data-m` enthält den ganzen Schlüssel, kein zusätzliches Attribut an der Schaltfläche |
| T-4 | Backup mit `moodUsage` = `{ "<img src=x onerror=…>": 5, "🙂": 2 }` laden | der fremde Schlüssel ist nicht in den Daten und nicht in der Leiste; 🙂 mit Zähler 2 bleibt |
| T-5 | dasselbe für `foodUsage`, `hiddenMoods`, `hiddenFood` | nur Emoji-Schlüssel bleiben |
| T-6 | Abgleich: das andere Gerät liefert einen fremden Schlüssel | nach dem Abgleich nicht in den Daten |
| T-7 | Backup mit zusammengesetzten Smileys (🚶🏽‍♂️, ☹️ mit und ohne Variantenzeichen) laden | alle bleiben mit ihren Zählern |
| T-8 | Reiselogbuch mit Titel `<b>x</b>` löschen | Sprechblase zeigt den Titel wörtlich (schon heute so; sichert B-3) |
| T-9 | Gegenprobe gegen 3.56.2 (`PRUEF_APP=../_alt.html`) | T-1, T-2 und T-4 rot |
| T-10 | (ergänzt und bestätigt, Nutzer 15.11.2026, Sitzung 0118) ein Reiselogbuch, in dem jedes Textfeld (Titel, Teilnehmer, Ort, Verlauf, Quartier, Lokal, Fazit, Reisemittel) `<b>x</b>` enthält; jede Ansicht öffnen (Seitenleiste, Startliste, Reiselogbuch, Tageserfassung, Einstellen, Suche, Ausgabe-Vorschau) | in keiner Ansicht entsteht aus den Daten ein Element `<b>`; gefundene Stellen werden mit `esc()` behoben und im Bericht genannt |

## Usertest

Nichts, was nur das Gerät zeigt – nur ‚Version prüfen‘ (/0).

## Allgemeine Regel?

Empfehlung: **nein**. Die Bausteine in `ui.js` bereinigen schon, die Lücke liegt nur in der App. Eine Regel im Katalog bräuchte eine eigene allgemeine Prüfung für alle Meldungen jeder App – das wäre ein größeres Thema.
