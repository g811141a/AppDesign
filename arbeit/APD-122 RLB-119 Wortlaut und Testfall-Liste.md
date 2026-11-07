# APD-122 und RLB-119 – Smileys in der Suche: Wortlaut und Testfall-Liste

Stand 07.11.2026 · Sitzung Reiselogbuch 0088 · **Wortlaut bestätigt** (Nutzer 07.11.2026: ‚Wortlaut ja, APD-122 Prio 1, zusammen mit RLB-119‘)

## Befund

- RLB-119 (nachgestellt, Reiselogbuch 3.52.0): führende Smileys einer Zeile (Verlauf, ‚Wie war was?‘, Essen) stehen in
  `<span class="m">` und werden nie markiert (`linesHtml`, `foodHtml` mit `esc(m)`) – ‚😀‘ an 3 Tagen: `hitCount` 1; ‚😋‘ beim
  Essen: 0; ‚1 von N‘ (`hitMarks`) ebenso. Versuch in der Seite mit `highlight(m, term)`: 3 von 3.
- APD-122 (Baustein `ui.js` 4.54.0): ‚☕‘ ↔ ‚☕️‘ gleich (in Ordnung); ‚👍‘ findet ‚👍🏽‘, `markWords` markiert aber nur ‚👍‘, der
  Hautton bleibt außerhalb der Markierung; ‚👍🏽‘ findet ‚👍‘ nicht (so gewollt).

## Wortlaut

**Designrichtlinie allgemein 15.2, neuer Punkt nach ‚Ohne Akzente‘ (APD-122/V-1):**

- **Smileys (Emoji)** werden gesucht, markiert und gezählt wie ein Wort – überall, wo sie stehen, auch in einer eigenen
  Smiley-Spalte am Zeilenanfang. Markiert wird immer das ganze Zeichen (mit Hautton). ‚☕‘ und ‚☕️‘ gelten als gleich;
  ‚👍‘ findet auch ‚👍🏽‘, ‚👍🏽‘ nur ‚👍🏽‘.

**Regelkatalog R-2.3, nach ‚die Einheit legt die App fest);‘ (APD-122/V-2):**
‚**Smileys** wie Wörter gesucht, markiert und gezählt, auch am Zeilenanfang, markiert als ganzes Zeichen;‘

## Testfall-Liste (Testfall (automatisch))

- APD-122/S-1 Smiley am Zeilenanfang im Verlauf, in ‚Wie war was?‘ und beim Essen wird markiert und gezählt (Reiselogbuch).
- APD-122/S-2 Smiley mitten im Text wird weiter gezählt, nicht doppelt.
- APD-122/S-3 mehrere Smileys am Zeilenanfang (‚😀😡 Text‘): nur der gesuchte wird markiert.
- APD-122/S-4 Zahl an der Kachel der Liste = ‚1 von N‘ im Reiselogbuch.
- APD-122/S-5 ⌄ springt zum Smiley-Treffer, der aktuelle ist hellorange.
- APD-122/S-6 ausgeschaltete Spalte (‚Wie war was?‘ aus): dort wird nichts gezählt.
- APD-122/S-7 Baustein: ‚👍‘ in ‚👍🏽 gut‘ → Markierung umfasst ‚👍🏽‘; ‚👍🏽‘ findet ‚👍‘ nicht; ‚☕‘ ↔ ‚☕️‘ (`checkSearchWords`).
- APD-122/S-8 rot gegen 3.52.0 bzw. 4.54.0 (0 Nr. 1); iPad quer und hoch, iPhone hoch und quer, hell und dunkel, Chromium und WebKit.
