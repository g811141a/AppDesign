# APD-116 – Dateiname im Hinweisfenster: Klärung, Muster, Testfall-Liste

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0102‘ · Backlog AppDesign APD-116 (Prio 2, allgemein)

## Wunsch

- Backlog (Nutzer 06.11.2026, Sitzung 0083): der Dateiname bricht im Hinweisfenster nach ‚Backup erstellen‘ an beliebiger Stelle.
- **Nachgestellt (0102):** Fassung 4.56.0, iPad quer und iPhone hoch, Textgröße l, xxxl und ax5, Chromium und WebKit. Der Backup-Name bricht dort
  nur an Leerzeichen, nicht mitten im Wort; ‚Ω‘ steht aber allein am Zeilenende. Der Name der Ausgabe bricht im Muster (heute) nach dem ‚-‘ in
  ‚2026.08.24-2026.11.11‘.
- **Präzisiert (Nutzer 08.11.2026, Sitzung 0102):** ‚Der Dateiname steht im Hinweisfenster allein in einer neuen Zeile oder bricht aus
  Platzgründen nach einem Leerzeichen um.‘

## Apple-Abgleich (0 Nr. 23)

- WWDC17 ‚Writing Great Alerts‘ (developer.apple.com/videos/play/wwdc2017/813/): den Dateinamen im Hinweis nennen; im Beispiel steht er im Satz
  in Anführungszeichen. Eine Regel ‚Name in eigener Zeile‘ habe ich bei Apple nicht gefunden. Die eigene Zeile ist damit eine kleine, bewusste
  Abweichung (Wunsch des Nutzers): ein langer Name ist so besser zu lesen.
- Katalog: R-1.3 Schrift (unverändert), nichts abgeschnitten (Grundregeln), 15.19 Backup, 10 Meldungen.

## Vorschlag

- In `SHARE_RESULT` (`v4/ui.js`) steht der Name als eigener Block `.fname` unter dem Satz, fett und zentriert, ohne Punkt danach. Jedes Wort des
  Namens ist am Stück (`inline-block`), deshalb bricht er nur an Leerzeichen. Nur ein Wort, das länger ist als die ganze Zeile, bricht in sich.
- Satz bei ‚abgebrochen‘: ‚⚠️ Teilen-Menü abgebrochen – nicht gespeichert:‘ + Name (heute: ‚… – **Name** wurde nicht gespeichert.‘).
- Bei `error` wird der Satz entsprechend umgestellt: ‚⚠️ Konnte nicht übergeben werden:‘ + Name.

## Muster (nur hell)

`arbeit/APD-116/index.html` – vier Fälle heute und neu nebeneinander: Backup abgeschlossen, Ausgabe (langer Name mit ‚-‘), Backup abgebrochen,
Abgleichbericht PDF (der Name des Abgleichberichts ist ein **Beispiel**, nicht aus der App belegt). Oben die Umschaltung der Textgröße (Standard,
groß = xxxl, sehr groß = ax3). Link: https://g811141a.github.io/AppDesign/arbeit/APD-116/index.html

## Testfall-Liste (Testfall (automatisch), `arbeit/APD-116 Muster prüfen.mjs`, Chromium und WebKit, vier Lagen, Textgröße l, xxxl, ax3)

| Nr. | Fall | Erwartet |
|---|---|---|
| APD-116/T-1 | jedes Hinweisfenster mit Dateinamen | der Name beginnt in einer neuen Zeile unter dem Satz |
| APD-116/T-2 | langer Name, schmales Fenster, große Schrift | Umbruch nur nach einem Leerzeichen (nicht nach ‚-‘ oder ‚.‘) |
| APD-116/T-3 | danach | der Name ist unverändert (keine Zeichen ersetzt) |
| APD-116/T-4 | danach | nichts ragt aus dem Fenster |
| APD-116/T-5 | Name in einer Zeile | zentriert |
| APD-116/T-6 | Gegenprobe `PRUEF_V=heute` | T-1 und T-2 rot |

Ergebnis (08.11.2026, Sitzung 0102): Chromium und WebKit **alles in Ordnung**; Gegenprobe in beiden rot (T-1 14-mal, T-2 6-mal). Beim Bau gefunden:
mit `display: block` allein brach die Ausgabe nach ‚2026.08.24-‘ – deshalb jedes Wort als `inline-block`.

**Für den Bau:** `checkShareResult` o. Ä. in `tests/ablauf.mjs` mit den echten Fenstern (Backup im Reiselogbuch, Abgleichbericht), dazu R-… im
Katalog (Wortlaut folgt nach ‚Muster ok‘).
