# Priorisierung der größeren Themen – Sitzung 0116

**Stand 15.11.2026** · Quelle: `BACKLOG.md` von AppDesign und ReiseLogBuch (`main`). Die Reihenfolge ist mein Vorschlag; im Backlog haben alle diese Themen heute Priorität 3.

## Reihenfolge

| Rang | Thema | Was offen ist | Warum an dieser Stelle |
|---|---|---|---|
| 1 | **APD-80** Kontrast dunkel | Kachel und Seite im Dunkeln kaum zu unterscheiden; noch kein Austausch, kein Muster | Einziges größeres Thema aus einer Rückmeldung vom Gerät (P-73) – ein sichtbarer Mangel, kein Wunsch |
| 2 | **APD-30** Rest: Kurzmeldung, Wischaktionen, Rückgängig | Kurzmeldung als Baustein (APD-38/T-20), Wischaktionen in Listen (APD-38/T-10), dazu ‚Gelöscht · Widerrufen‘; Kollision mit dem Wegwischen der Seitenleiste (APD-68) zu klären | Größter Gewinn in der Bedienung; die drei Teile hängen zusammen (so im Backlog entschieden: Rückgängig erst mit Wischaktionen und Kurzmeldung) |
| 3 | **APD-55** Inhalt unter Glas-Leisten | Muster am Gerät; bis dahin gilt ‚deckende Leiste‘ | Schließt an das Glas aus 4.53.0 an; reines Aussehen, früher schon einmal verworfen |
| 4 | **APD-32** ‚Problem melden‘ | Messung, Version und Gerät in einer Datei | Klein, hilft bei jedem künftigen ‚nicht ok‘ vom Gerät |
| 5 | **RLB-6** Ausschreibungstexte umwandeln | Titel, Zeitraum, Tage, Quartiere aus dem Text eines Veranstalters | Einziges eigenes App-Thema; neue Funktion, unabhängig von allem anderen |
| 6 | **APD-1** Startseite mit allen Apps | Seite g811141a.github.io | Lohnt erst richtig mit einer zweiten App (Vermutung) |
| 7 | **APD-70** Mehrsprachfähigkeit | Sprachen, Texttabelle, Prüfung – alles noch zu klären | Größtes Thema, berührt jeden Text; braucht mehrere Versionen |
| – | **APD-57** Suche unten am iPhone | wartet auf eine App-Hülle (APD-38) | Jetzt nicht sinnvoll |
| – | **APD-62** Paket B | nur noch ‚Großer Titel rastet ein‘, zurückgestellt | Praktisch erledigt (4.49.0, 4.53.0) |

## Empfehlung für Versionen

Nach 0 Nr. 8: 2–3 zusammengehörige Punkte, höchstens 2 Themen je Version.

**Version 1 – APD-85 Teil 6 + APD-80 (Empfohlen)**
- APD-85 Teil 6 ist bereit und betrifft nur Prüfungen; es macht den Prüflauf verlässlicher, bevor Neues kommt.
- APD-80 braucht zuerst den Austausch (Apple-Abgleich, Varianten, Muster dunkel). Hinweis: Die Vereinbarung ‚Muster nur hell‘ passt hier nicht – für dieses Thema bräuchte es ausdrücklich Muster dunkel.
- Dauert die Klärung von APD-80 länger, geht APD-85 Teil 6 allein voraus.

**Version 2 – APD-30 Rest (ein Thema, drei Punkte)**
- Kurzmeldung, Wischaktionen, ‚Gelöscht · Widerrufen‘ gemeinsam; Muster und Testfall-Liste gibt es schon als Grundlage (`arbeit/APD-30 Muster.html`, `arbeit/APD-30 Testfall-Liste.md`).

**Version 3 – APD-55 Glas-Leisten**, falls du es nach dem Muster am Gerät willst; sonst als bewusste Abweichung festhalten und schließen.

**Einzeln dazwischen:** APD-32 passt als kleiner zweiter Punkt in Version 2 oder 3. RLB-6 und APD-70 sind je ein eigenes Vorhaben mit Klärung vorab.

## Nicht im Backlog, aber offen

- Wortlaut zum Satz ‚… dauerhaft über die Umgebungsvariable‘ in Zusammenarbeit 2.5 ‚Lagebild‘.
- Aus 0106 ohne bestätigten Wortlaut: PROMPT.md ‚Emojis klein‘, VoiceOver-Name für Rückgängig, ‚Cursor am Ende‘ in Designrichtlinie 16, `tests/README.md`, `color-mix` am Gerät.
