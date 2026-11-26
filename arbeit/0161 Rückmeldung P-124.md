# Rückmeldung P-124 – eingetragen (Sitzung 0161)

**26.11.2026** · Usertest P-124 (Reiselogbuch 3.58.4, AppDesign 4.70.1): **nicht ok** zu /1, alle übrigen Punkte ok

## Eingetragen (Backlog Reiselogbuch ‚0.‘, AppDesign nennt es bei P-124)

| Nr. | Thema |
|---|---|
| P-124/F-1 | Vorschau → Teilen → sichern: das Hinweisfenster ‚Ausgabe V…‘ nutzt die mögliche Breite nicht, ein langer Dateiname bricht um; am iPad quer offenbar gleich breit wie hoch. Die AD-Bean `alert` soll die Breite besser nutzen. |
| P-124/F-2 | Nach dem Sichern aus der Vorschau und dem Verlassen der Vorschau ist Teilen (Kopfzeile) noch hellblau getönt. |

Gesichert: Reiselogbuch 2a2cf09, AppDesign 4c7e2fa (beide `main`).

## Auffällig

- Die feste Prüfung `ablauf-p120` Teil P-123/F-1 war grün (iPad quer und hoch, Breite 549–558 px). Sie misst also etwas anderes als das, was du siehst. **Vermutung:** Die Prüfung vergleicht nur mit der berechneten Höchstbreite und merkt nicht, wenn diese Höchstbreite quer und hoch gleich ist. Oder Safari am Gerät misst anders als das Modell.
- P-124/F-2 betrifft dieselbe Stelle wie P-122/F-1 (Quelle der Vorschau, `outputSource`, AD-Bean `sourcehighlight`). **Vermutung:** Seit 3.58.4 steht das Ergebnis auch direkt im Hinweisfenster, und die Tönung von Teilen wird dabei nicht mehr freigegeben.

## Nächster Schritt (0 Nr. 1)

1. Beide Abläufe genau so als feste Prüfung nachbauen, rot gegen 3.58.4 (Chromium und WebKit). Klären, warum P-123/F-1 grün war.
2. Ursache, Apple-Abgleich, Vorschlag mit Testfall-Liste. Danach eine Korrekturversion AppDesign 4.70.2 / Reiselogbuch 3.58.5, gebaut erst nach deinem ‚Ja‘.

## Kontext

Der Kontext steht bei 255.693, die Übergabe ist ab etwa 300.000 fällig (0 Nr. 13). Der Nachbau braucht das Lesen der Prüfungen und mehrere Läufe in zwei Browsern und passt kaum noch vollständig in diese Sitzung.
