# APD-113 Teile (1) bis (4) – Befund und Testfall-Liste

Stand 07.11.2026 · Sitzung Reiselogbuch 0088 · **Vorschlag und Testfall-Liste Q-1 bis Q-8 bestätigt** (Nutzer 07.11.2026: ‚Vorschlag und Q-1 bis Q-8 ok, Bau in 0089‘). Nachgestellt mit künstlichen Sitzungsdaten gegen
`werkzeug/regelwaechter.mjs` 4.54.0 (`pruefe`) – alle drei Funde rot.

## Befund

| Teil | Befund (4.54.0) | Ursache | Vorschlag |
|---|---|---|---|
| (1) | Ein vom Wächter abgelehntes Fenster, danach korrigiert gezeigt: der Stop-Hook meldet für das abgelehnte noch W-14 und W-16 – eine überflüssige Zurückweisung (‚2 von 2‘, Belege 0078, 0080, 0083) | `pruefe` prüft W-5, W-14, W-15, W-16 an allen Fenstern, nur W-17 an den gezeigten | auch W-5, W-14, W-15, W-16 nur an gezeigten Fenstern (ein abgelehntes wurde nie gezeigt) |
| (2) | W-15 lehnte ein Fenster mit Link ab, obwohl Link und Schritte davor standen | – | **entfällt:** seit 4.54.0 (APD-113/L-6) wird jedes Fenster mit Link abgelehnt |
| (3) | ‚Vorhin Kontext 161.093, jetzt Kontext 172.152‘ vor dem Fenster: W-14 nimmt 161.093 und meldet ‚nicht abgelesen‘ (Beleg 0080) | `pruefeKontext` nimmt die **erste** Zahl hinter ‚Kontext‘ | die **letzte** Zahl ‚Kontext N‘ der Ausgabe vor dem Fenster |
| (4) | Teil 1 einer Antwort endet mit Fenster und Zeitzeile, dann kommt die Meldung einer Hintergrundaufgabe, Teil 2 hat wieder ein Fenster: W-6 meldet die Zeitzeile aus Teil 1 als ‚vor dem Fenster‘ (Belege 0080 15:52, 0087) | W-6 prüft alles seit der letzten Nachricht des Nutzers | W-6 prüft nur den laufenden Abschnitt – seit der letzten Nachricht, Meldung (Hintergrundaufgabe, Neustart) bzw. Zurückweisung, wie W-4 seit 4.54.0 |

Die Teile (5) und (7) bis (9) sind mit Zusammenarbeit 3.9.0 erledigt (APD-113/N-1 bis APD-113/N-4). Am Regeltext ändert sich nichts (2.8 beschreibt
schon, was gelten soll) – es sind Fehler im Werkzeug.

## Testfall-Liste (Testfall (automatisch), `tests/regelwaechter.mjs`)

- APD-113/Q-1 abgelehntes Fenster (ohne Kontext davor), danach Kontext gemessen und korrigiert gezeigt: der Stop-Hook meldet nichts.
- APD-113/Q-2 nur ein abgelehntes Fenster, keines gezeigt: weiter W-4 (keine Antwort ohne beantwortetes Fenster).
- APD-113/Q-3 gezeigtes Fenster ohne ‚Kontext N‘ davor (Hook ‚fenster‘ fehlte): der Stop-Hook meldet weiter W-14.
- APD-113/Q-4 ‚Vorhin Kontext 161.093, jetzt Kontext 172.152‘, gemessen 172.152: grün.
- APD-113/Q-5 nur ‚Kontext 161.093‘, gemessen 172.152: weiter W-14 rot.
- APD-113/Q-6 Zeitzeile am Ende von Teil 1, danach Meldung einer Hintergrundaufgabe, Teil 2 mit Fenster und Zeitzeile am Ende: grün.
- APD-113/Q-7 Zeitzeile vor dem Fenster im selben Abschnitt: weiter W-6 rot; ebenso nach einer Zurückweisung im neuen Abschnitt.
- APD-113/Q-8 Gegenprobe: `REGELWAECHTER_AUS=W-5-gezeigt,W-14-letzte,W-6-Abschnitt` – je Teil abgeschaltet wird die Prüfung rot.
