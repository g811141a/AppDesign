# APD-112 Testfall-Liste – Fokus nach dem Schließen eines Fensters zurück auf den Knopf

Stand 03.11.2026 · Sitzung Reiselogbuch 0078 · Regel R-1.8 (unverändert: ‚ins Fenster auf das Fenster – danach zurück auf den Knopf (fehlt
er: Kopfzeile), immer ohne Rollen‘)

## Befund (Sitzung 0078, Chromium, Reiselogbuch 3.48.0 / AppDesign 4.50.0)

- Seitenleiste ‚Neues Reiselogbuch‘ (`#newTrip`) mit der Tastatur öffnen, mit Esc bzw. x schließen: der Fokus liegt danach auf `body`, nicht auf
  dem Knopf. Der Knopf ist nach dem Neuaufbau durch die App ein neues Element (das alte ist nicht mehr im DOM).
- Ursache: `dlg` ‚close‘ in ui.js setzt den Fokus nur für den Knopf eines leeren Zustands zurück (APD-30/L-3); sonst bleibt die Rückgabe des
  Browsers, die am alten, entfernten Element scheitert.
- Warum die Prüfung es übersah: `checkFokus` prüft beim Fenster das Öffnen, Tab, Esc, ⌘. und die Sprechblase, aber nicht, wo der Fokus nach dem
  Schließen liegt (nur bei Menüs, V5).
- WebKit war in dieser Sitzung nicht installiert (Setup-Skript der Umgebung) – im vollen Lauf mit WebKit.

## Testfälle (automatisch), jeweils Chromium und WebKit, rot gegen 4.50.0

| Nr. | Gerät · Lage | Handlung | Erwartet |
|---|---|---|---|
| F-1 | iPad quer | Fenster über einen Knopf öffnen (Seitenleiste ‚Neues Reiselogbuch‘), Esc | Fokus auf demselben Knopf (auch wenn die App ihn neu aufgebaut hat) |
| F-2 | iPad quer | wie F-1, mit x schließen | wie F-1 |
| F-3 | iPad quer | wie F-1, mit dem Häkchen speichern | Fokus auf dem Knopf, der das Fenster öffnete |
| F-4 | iPad quer | Fenster über einen Menüeintrag (Mehr → Bearbeiten) öffnen und schließen | Fokus auf dem Knopf ‚Mehr‘, der das Menü öffnete |
| F-5 | iPad quer | Fenster über eine Zeile bzw. einen Tag öffnen und schließen | Fokus auf derselben Zeile (gleiche Kennung nach dem Neuaufbau) |
| F-6 | iPad quer | Den Knopf gibt es nach dem Schließen nicht mehr (z. B. Reiselogbuch gelöscht) | Fokus auf der Kopfzeile der Seite |
| F-7 | iPhone hoch | Blatt nach unten ziehen schließt (ohne Änderungen) | Fokus auf dem öffnenden Knopf bzw. der Zeile |
| F-8 | iPad quer | Meldung (`#msg`) über einen Knopf, mit ‚OK‘ schließen | Fokus auf dem Knopf |
| F-9 | iPad quer | Fenster über Fenster bzw. Sprechblase im Fenster schließen | Fokus zurück ins darunterliegende Fenster (wie heute, V6) |
| F-10 | iPad quer, hoch | Antippen statt Tastatur | Fokus zurück, aber kein Fokusring (R-3.4, K6); mit Tastatur sichtbarer Ring |
| F-11 | iPad quer | lange Liste, Fenster aus einer Zeile weiter unten | nichts rollt, die oberste Zeile bleibt (R-7.3, ohne Rollen) |
| F-12 | iPad | Fenster offen, drehen, dann schließen | Fokus auf dem Knopf; Grundregeln nach dem Drehen (`pruefe.mjs`) |
| F-13 | alle | Gegenprobe: Rückgabe abgeschaltet | F-1 bis F-8 rot |

## Testfall (User)

Keiner: R-1.8 hat keine VoiceOver-Prüfung am Gerät (Nutzer 23.10.2026). Sichtbar ist nur der Fokusring mit Tastatur – ohne Tastatur am iPad nichts
zu sehen.
