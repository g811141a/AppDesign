# Priorisierung der größeren Themen – Sitzung 0116

**Stand 15.11.2026** · Quelle: `BACKLOG.md` von AppDesign und ReiseLogBuch (`main`). Die Reihenfolge ist mein Vorschlag; im Backlog haben alle diese Themen Priorität 3.

**Entschieden (Nutzer 15.11.2026, Sitzung 0116):** APD-80 Kontrast dunkel bekommt die niedrigste Priorität – erst angehen, wenn alle anderen Themen erledigt sind (im Backlog eingetragen, Status ‚später‘).

## Reihenfolge

| Rang | Thema | Was offen ist | Warum an dieser Stelle |
|---|---|---|---|
| 1 | **APD-85 Teil 6** Wackler WebKit | bereit, nur Prüfungen (Testfälle APD-85/F-1 bis F-8) | Macht den Prüflauf verlässlicher, bevor Neues kommt |
| 2 | **APD-30 Rest** Kurzmeldung, Wischaktionen, ‚Gelöscht · Widerrufen‘ | Kurzmeldung als Baustein (APD-38/T-20), Wischaktionen in Listen (APD-38/T-10); Kollision mit dem Wegwischen der Seitenleiste (APD-68) zu klären | Größter Gewinn in der Bedienung; die Teile hängen laut Backlog zusammen |
| 3 | **APD-32** ‚Problem melden‘ | Messung, Version und Gerät in einer Datei | Klein, hilft bei jedem künftigen ‚nicht ok‘ vom Gerät |
| 4 | **APD-55** Inhalt unter Glas-Leisten | Muster am Gerät; bis dahin gilt ‚deckende Leiste‘ | Schließt an das Glas aus 4.53.0 an; reines Aussehen |
| 5 | **RLB-6** Ausschreibungstexte umwandeln | Titel, Zeitraum, Tage, Quartiere aus dem Text eines Veranstalters | Einziges eigenes App-Thema, unabhängig von allem anderen |
| 6 | **APD-1** Startseite mit allen Apps | Seite g811141a.github.io | Lohnt erst richtig mit einer zweiten App (Vermutung) |
| 7 | **APD-70** Mehrsprachfähigkeit | Sprachen, Texttabelle, Prüfung – alles noch zu klären | Größtes Thema, berührt jeden Text, braucht mehrere Versionen |
| zuletzt | **APD-80** Kontrast dunkel | Austausch, Varianten, Muster dunkel | Vom Nutzer ans Ende gestellt |
| – | **APD-57** Suche unten am iPhone | wartet auf eine App-Hülle (APD-38) | Jetzt nicht sinnvoll |
| – | **APD-62** Paket B | nur noch ‚Großer Titel rastet ein‘, zurückgestellt | Praktisch erledigt (4.49.0, 4.53.0) |

## Empfehlung: was wir als Nächstes zugleich machen

Nach 0 Nr. 8: 2–3 zusammengehörige Punkte, höchstens 2 Themen je Version.

**Nächste Version (AppDesign 4.60.0 / Reiselogbuch 3.57.0, Nummern als Vorschlag) – 2 Themen, 3 Punkte:**

1. **APD-85 Teil 6** – bereit, kann sofort mit.
2. **APD-30 Kurzmeldung** als allgemeiner Baustein.
3. **APD-30 Wischaktionen mit ‚Gelöscht · Widerrufen‘** – nutzt die Kurzmeldung, deshalb gehören 2 und 3 zusammen.

Vor dem Bau von 2 und 3 nötig: Apple-Abgleich, Muster (nur hell), Klärung der Kollision mit dem Wegwischen der Seitenleiste, Testfall-Liste, ‚allgemeine Regel?‘. Dateien `arbeit/APD-30 Muster.html` und `arbeit/APD-30 Testfall-Liste.md` liegen schon im Repo; ihren Inhalt habe ich noch nicht geprüft.

**Version danach:** APD-32 ‚Problem melden‘ + APD-55 Glas-Leisten (Muster am Gerät entscheidet, ob gebaut oder als bewusste Abweichung geschlossen wird).

**Je ein eigenes Vorhaben:** RLB-6, APD-1, APD-70; ganz am Ende APD-80.

## Nicht im Backlog, aber offen

- Wortlaut zum Satz ‚… dauerhaft über die Umgebungsvariable‘ in Zusammenarbeit 2.5 ‚Lagebild‘.
- Aus 0106 ohne bestätigten Wortlaut: PROMPT.md ‚Emojis klein‘, VoiceOver-Name für Rückgängig, ‚Cursor am Ende‘ in Designrichtlinie 16, `tests/README.md`, `color-mix` am Gerät.
