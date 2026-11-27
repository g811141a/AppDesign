# Aufgefallen, Punkt 7 – Wackler `ablauf-markierung-menues` (WebKit)

**27.11.2026 · Sitzung 0168** · aus `arbeit/0167 Bericht 4.71.0 – 3.59.0.md`

Erledigt sind bisher: 6a (zu APD-152, `c583d62`), 6b (ReiseLogBuch-Import 1.4.1, `1161b4c`) und 6c (fallen gelassen).

## Befund

- **Aus 0167:** Im vollen Lauf war die Prüfung in WebKit unter Last rot, allein grün.
  - Das Mehr-Menü der Seitenleiste war 302 statt 340 px breit, die Einträge 41 statt 46 px hoch. Gemessen wurde mitten im Aufgehen.
- **Code (belegt):**
  - Der Schritt ‚Mehr-Menü der Seitenleiste‘ tippt `#sideMore` an und wartet 150 ms (`ReiseLogBuch/tests/ablauf-markierung-menues.mjs:39`).
  - Danach misst `hig.measure` mit `getBoundingClientRect()` (R-4.9, `tests/hig.mjs:180`), also mit dem Wachsen (Skalierung).
  - `measure` wartet vorher auf `ruhe()` (`tests/pruefe.mjs:99`): zwei Bildwechsel, dann dreimal hintereinander gleich, je 100 ms, und keine laufende Animation.
- **Ursache:** nicht belegt.
  - **Vermutung:** Unter Last beginnt WebKit das Wachsen erst, nachdem `ruhe()` schon ‚ruhig‘ gesehen hat. Möglich ist auch, dass das Wachsen nicht als Animation erkannt wird.

## Möglichkeiten

- **a) Eigenes Thema APD-157, Priorität 2 (Empfohlen):**
  - Erst nachstellen (WebKit unter Last, mehrfach), dann `ruhe()` bzw. `measure` so ändern, dass ein Menü oder eine Sprechblase im Aufgehen nie als ruhig gilt. Dazu eine Gegenprobe, die mit Verzögerung aufgeht.
  - Das wirkt für alle Prüfungen.
  - **Grund:** Die Ursache ist noch offen. Die Korrekturversion hat schon 2 Themen, und der Wackler ist allein grün.
- **b) Zu APD-153 in die Korrekturversion:** Das wäre ein dritter, noch ungeklärter Teil, und der Bau würde unsicherer.
- **c) Lassen:** Er wird weiter als ‚wackelt‘ gemeldet.
