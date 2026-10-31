# RLB-113 – Testfall-Liste

Stand 31.10.2026 · Sitzung Reiselogbuch 0063 · nur App (Nutzer 31.10.2026). Der Menüpunkt ‚Einstellungen‘ heißt in **beiden** Menüs
‚Reiselogbuch einstellen‘ (Mehr-Menü `#mainMore` und Kontextmenü der Zeile in der Seitenleiste bzw. Startliste), Icon `settings`
bleibt; das Fenster heißt ebenso (Designrichtlinie allgemein 6: Menüpunkt und Fenster heißen gleich). Kein Muster, weil sich nur
ein Text ändert.

## Ablauf in einem Satz

Wer ein Reiselogbuch einstellen will, tippt im Mehr-Menü oder im Kontextmenü auf ‚Reiselogbuch einstellen‘ und bekommt das
Fenster ‚Reiselogbuch einstellen‘ mit genau diesem Reiselogbuch; ‚Neues Reiselogbuch‘ bleibt unverändert.

## So macht es Apple

Notizen (iPhone, `apple-referenz/iphone/notizen/notizen-02-ordner-kontextmenue.png`): Das Kontextmenü eines Ordners nennt bei den
meisten Punkten Verb und Gegenstand (‚Share Folder‘, ‚Add Folder‘, ‚Move This Folder‘), daneben kurze Punkte ohne Gegenstand
(‚Rename‘, ‚Delete‘). ‚Reiselogbuch einstellen‘ passt dazu und zu ‚Reiselogbuch löschen‘ direkt darunter.

## E – Testfälle (automatisch)

| Nr. | Gerät | Handlung | Daten | Erwartet |
|---|---|---|---|---|
| E-1 | iPad quer und hoch, iPhone hoch | Mehr-Menü des Reiselogbuchs öffnen | ein Reiselogbuch | Punkte genau ‚Suchen‘ · ‚Alle Tage‘ · ‚Nur erfasste Tage‘ · ‚Reiselogbuch einstellen‘ · ‚Reiselogbuch löschen‘; Icon `settings` (R-4.1) |
| E-2 | iPad quer und hoch (Seitenleiste), iPhone hoch (Startliste) | Zeile lange drücken | zwei Reiselogbücher | Kontextmenü genau ‚Reiselogbuch einstellen‘ · ‚Reiselogbuch löschen‘ (R-4.2) |
| E-3 | alle | Mehr-Menü → ‚Reiselogbuch einstellen‘ | zwei Reiselogbücher | Fenstertitel ‚Reiselogbuch einstellen‘, Reisetitel des geöffneten Reiselogbuchs |
| E-4 | alle | Kontextmenü → ‚Reiselogbuch einstellen‘ | zwei Reiselogbücher, das andere gedrückt | Fenstertitel ‚Reiselogbuch einstellen‘, Reisetitel des gedrückten; Zeile blau (`.on`) |
| E-5 | alle | plus → neues Reiselogbuch | – | Fenstertitel weiter ‚Neues Reiselogbuch‘ |
| E-6 | iPhone hoch und quer, iPad hoch; Textgröße normal und größte | Fenster ‚Reiselogbuch einstellen‘ und beide Menüs | – | Titel ganz sichtbar zwischen x und Häkchen, ohne Überlappung; Menüpunkte ganz im Menü; Grundregeln nach jedem Schritt (`pruefe.mjs`) |
| E-7 | iPad quer | Gegenprobe: Menüpunkt bzw. Titel wieder ‚Einstellungen‘ | – | E-1 bis E-4 werden rot |

Dazu: alle Prüfungen, die heute ‚Einstellungen‘ suchen oder erwarten (13 Dateien in `ReiseLogBuch/tests/`), auf den neuen Namen
umstellen; in `PROMPT.md` die Stellen zum Menüpunkt und zum Fenster nachziehen (der Schalter ‚… in den Einstellungen‘ bei Zeile 198
heißt dann ‚im Fenster Reiselogbuch einstellen‘).

## Testfälle (User), nur am Gerät

- iPad und iPhone: beide Menüs ansehen und ‚Reiselogbuch einstellen‘ antippen; das Fenster heißt ebenso.
- iPhone hoch mit größter Textgröße: Titel des Fensters ganz lesbar.
