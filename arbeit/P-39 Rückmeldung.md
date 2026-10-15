# P-39 Rückmeldung (AppDesign 4.15.0 · Reiselogbuch 3.14.0)

Stand 15.10.2026 · Sitzung Reiselogbuch 0005

| Punkt | Ergebnis |
|---|---|
| /0 Version | ok |
| /1 iPad: offline gehen, während die App offen ist | **nicht ok – keine Meldung sichtbar** |
| /2 iPad: wieder online | **nicht ok – keine Meldung sichtbar** |
| /3 iPad: Start ohne Netz, hoch, dunkel | ok |
| /4 iPhone: Wechsel in Startliste und Reiselogbuch | ok |
| /5 iPhone: Start ohne Netz, quer | ok |

## Auswertung

- Die Meldung selbst funktioniert auf dem iPad (beim Start ohne Netz, /3). Es fehlt also das **Erkennen des Wechsels**,
  solange die App offen bleibt.
- Der Wechsel hängt nur an zwei Signalen: Safari-Ereignisse `offline`/`online` und die Rückkehr in die App
  (`visibilitychange`). Auf dem iPad als Home-Bildschirm-App kamen sie offenbar nicht an – das Kontrollzentrum
  (Flugmodus) verlässt die App nicht, und iPadOS meldet den Wechsel der Seite nicht zuverlässig.
- /2 zusätzlich: Selbst wenn der Service Worker ‚an‘ meldet, verwirft `setNet()` es, solange `navigator.onLine` noch
  `false` sagt (Schutz gegen das schnelle Hin und Her) – meldet iPadOS `onLine` verspätet, bleibt ‚offline‘ stehen.
- **Warum die Prüfung es übersah:** `offline.mjs` schaltet mit `setOffline()` – Chromium und WebKit (Playwright) senden
  dabei immer `offline`/`online` und setzen `navigator.onLine` sofort. Ein Gerät, das beides nicht oder spät tut, war nicht
  nachgebildet.

## Vorschlag Korrektur (AppDesign 4.15.1 · Reiselogbuch 3.14.1)

1. **Prüfung zuerst schärfen (rot):** in `offline.mjs` einen Fall ‚iPad ohne Safari-Meldung‘ – Ereignisse `offline`/`online`
   werden unterdrückt, `navigator.onLine` bleibt `true`; erwartet: Meldung und Zeile spätestens nach etwa 15 s, ebenso
   ‚Wieder online‘.
2. **Beheben (grün):** solange die App sichtbar ist, fragt sie alle 10 s den Service Worker (‚pruefe‘ – kleiner Abruf
   ohne Inhalt, `HEAD`); die Safari-Ereignisse beschleunigen nur. Den Schutz gegen das schnelle Hin und Her über eine
   laufende Nummer der Anfrage statt über `navigator.onLine`.
3. Dieselbe Lücke überall suchen (andere Stellen, die sich auf `online`/`offline` verlassen).
