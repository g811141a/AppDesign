# APD-135/W-33 in `PROMPT.md` – Abweichung vom bestätigten Wortlaut (0 Nr. 29)

**18.11.2026** · Sitzung Reiselogbuch 0131

Stand: AppDesign 4.61.0 / Reiselogbuch 3.57.4 sind vorbereitet und gepusht (Zweige `vorbereitung-4.61.0`, `vorbereitung-3.57.4`).
Geprüft ist schon: `doku-regeln` (Chromium) ist ‚alles in Ordnung‘, `checkVersionsgeschichte` meldet 0 Fehler, die Gegenprobe des Schemas
meldet alle 20 Fälle rot, auch APD-135/M-1 bis M-4. `stufe` schlägt **voll** vor. Was fehlt, ist der volle Prüflauf mit `los`.

## Stand nach deiner Korrektur

- Erste Antwort im Fenster: ‚Wortlaut aus 0124‘ – eingesetzt, committed, gepusht, `los` gestartet.
- Du hast gemeldet, dass die Antwort ein Irrtum war: `los` ist angehalten (nur `messung`, `doku-regeln`, `version-regeln` waren gelaufen),
  **nichts veröffentlicht** – `main` steht weiter bei AppDesign 75a1415 und ReiseLogBuch bf600c5.
- Entscheidung nach der Korrektur: **mit R-7.8** (Nutzer 18.11.2026) – eingesetzt, `los` neu gestartet.

## Warum eine Rückfrage

Der Wortlaut zu W-33 ist in 0124 bestätigt worden. Seitdem hat APD-30 (Wischaktionen, Reiselogbuch 3.57.0 bis 3.57.3) den Punkt ‚iPad hoch‘
in `PROMPT.md` geändert. Der bestätigte Alt-Text steht so nicht mehr in der Datei.

**Alt (bestätigt in 0124):**
```
- **iPad hoch:** die Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch, nach links wischen schiebt sie weg (R-7.5).
- **iPad quer:** die ausgeblendete Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch – der Inhalt rückt mit und wird
  beim Einrasten schmaler; ausblenden nur mit panel-left (R-7.5).
```
**Neu (bestätigt in 0124):**
```
- **iPad hoch und quer:** die ausgeblendete Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch (R-7.5).
```

**Heute in der Datei (Reiselogbuch 3.57.3, nach APD-30):**
```
- **iPad hoch:** die Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch; ausblenden nur mit panel-left – nach links wischen
  blendet sie nie aus, auf einer Kachel zeigt es die Wischaktionen (R-7.5, R-7.8).
- **iPad quer:** die ausgeblendete Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch – der Inhalt rückt mit und wird
  beim Einrasten schmaler; ausblenden nur mit panel-left (R-7.5).
```

**Jetzt eingesetzt (Vorschlag):** beide Punkte zusammengeführt wie in 0124 bestätigt, der neuere Satz zu R-7.8 aus APD-30 bleibt erhalten:
```
- **iPad hoch und quer:** die ausgeblendete Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch (R-7.5); nach links
  wischen blendet sie nie aus, auf einer Kachel zeigt es die Wischaktionen (R-7.8).
```

**Andere Möglichkeit:** genau der Wortlaut aus 0124. Dann fehlt in `PROMPT.md` der Hinweis auf R-7.8 (Wischen nach links auf einer Kachel).

## Sonst noch zu wissen

- Zwei neuere ‚seit‘-Stellen in `PROMPT.md` (Z. 108 ‚seit 3.57.0‘, Z. 110 ‚seit 3.57.2‘) stehen nicht im Wortlaut und bleiben deshalb.
- In den neuen Zeilen der Versionsgeschichten 3.15.0 und 4.61.0 steht beim ersten W ‚APD-135/‘ davor, weil das Nummernschema es verlangt.
- **Offene Usertests:** P-111 (nach dem Veröffentlichen) – **P-111/0 Version prüfen:** 1. Auf iPhone und iPad die App ganz schließen und mit Netz
  neu öffnen. 2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen. 3. Erwartet auf beiden Geräten:
  unten grau ‚Reiselogbuch · Version 3.57.4 · erstellt am … · AppDesign 4.61.0‘.
