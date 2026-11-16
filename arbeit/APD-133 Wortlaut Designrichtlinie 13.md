# APD-133 – Wortlaut für Designrichtlinie allgemein 13

**Stand 16.11.2026** · Sitzung ‚Reiselogbuch 0119‘ · Befund: `arbeit/APD-133 Befund Drehen.md`. **Wortlaut V-1 bestätigt (Nutzer 16.11.2026, Sitzung 0119).** Die Designrichtlinie
liegt in der festen Fassung 4.59.3 und ist unveränderlich – der Wortlaut wird mit der nächsten AppDesign-Version eingetragen.

## V-1 – neuer Punkt in Abschnitt 13, nach ‚Kein Scroll-Anker‘

**Alt:** (kein Text)

**Neu:**

- **Neue Fenstergröße vor `resize`** (R-8.1, gemessen 15.11.2026 im WebKit der Prüfumgebung unter Last, Sitzung 0119 –
  `arbeit/APD-133 Befund Drehen.md`): `innerWidth` und `innerHeight` können die neue Größe schon zeigen, bevor das Ereignis `resize` dafür
  ankommt (gemessen rund 200 ms). Ein Zeitgeber, der in dieser Lücke läuft, sieht die neue Größe, die App hat aber noch nicht umgebaut. ui.js
  übernimmt als ‚fertig gedreht‘ deshalb nur die mit `resize` gemeldete Größe (`keepMeldW`, `keepMeldH`); bis dahin bleibt das Gedächtnis für
  den obersten Eintrag gesperrt. Am Gerät nicht gemessen. Prüfung: Reiselogbuch `tests/ablauf-drehen-luecke.mjs` (hält `resize` zurück).
