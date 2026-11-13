# RLB-124 – Hinweis ‚PDF geht mit iOS 27 zurzeit nicht‘

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0107‘

## Deine Entscheidung (Nutzer 13.11.2026)

Die PDF-Funktion bleibt, wie sie ist (Drucken-Menü). Hinter ‚PDF‘ kommt in Klammern ein kurzer Hinweis, dass sie mit der neuesten iOS-Version bis auf
Weiteres nicht funktioniert. Grund: Ein Update von iOS 27 wird das Drucken voraussichtlich wieder möglich machen, so wie es bis zum 31.10.2026 ging.

## Heute (Reiselogbuch 3.55.0, Teilen-Icon › Menü)

| Zeile | Text |
|---|---|
| Titel | PDF |
| darunter grau | Im Drucken-Menü Teilen, dann ‚In Dateien sichern‘ |

## Vorschläge für den Titel

| Nr. | Titel im Teilen-Menü |
|---|---|
| RLB-124/W-1 | **PDF (mit iOS 27 zurzeit nicht möglich)** – Empfehlung: kurz, sagt, warum und dass es vorübergehend ist |
| RLB-124/W-2 | PDF (geht mit iOS 27 bis auf Weiteres nicht) |
| RLB-124/W-3 | PDF (iOS 27: bis auf Weiteres ohne Funktion) |

Die graue Zeile darunter bleibt unverändert.

## Wo der Hinweis steht

- **Nur in der App vom Home-Bildschirm (Empfehlung).** In Safari öffnet ‚PDF‘ das Drucken-Menü weiterhin (Probe B). Dort wäre der Hinweis falsch.
- Immer, also auch in Safari.

## Weitere Stellen mit ‚PDF‘ (Auffälliges)

‚PDF‘ gibt es auch als Knopf in der Kopfzeile der **Vorschau** (Reiselogbuch) und im **Abgleichbericht** (AppDesign). Dort ist kein Platz für eine
Klammer. Außerdem meldet das Hinweisfenster danach ‚Drucken-Menü geöffnet für …‘, obwohl es sich in der App vom Home-Bildschirm nicht öffnet.

| Umfang | Was | Versionen |
|---|---|---|
| a (Empfehlung) | nur der Titel im Teilen-Menü, wie gewünscht | Reiselogbuch **3.55.1** (Korrektur), AppDesign bleibt 4.57.0 |
| b | dazu im Hinweisfenster nach ‚PDF‘ (Teilen-Menü, Vorschau, Abgleichbericht) der Satz ‚Mit iOS 27 öffnet sich das Drucken-Menü in der App vom Home-Bildschirm zurzeit nicht.‘ | Reiselogbuch 3.55.1 und AppDesign **4.57.1** |

Wird es gebaut, gibt es einen Usertest mit Testfällen (Hinweis sichtbar in der App vom Home-Bildschirm, nicht in Safari, iPhone und iPad). Gebaut wird erst
nach deinem ‚Ja‘ zur Bau-Frage (0 Nr. 21).

## Übergabe

Der Kontext liegt bei etwa 265.000 Token (Grenze 300.000). **Vorschlag:** Wortlaut und Umfang hier festlegen, als ‚bereit‘ eintragen, übergeben. Reiselogbuch
**0108** stellt die Bau-Frage und baut nach deinem ‚Ja‘ (Bau und Veröffentlichung brauchen etwa 60 min und viel Platz).

## Offener Usertest

- **P-101** (Reiselogbuch 3.55.0, AppDesign 4.57.0): ok bis auf /16 Schritt 3 → **RLB-124**.
