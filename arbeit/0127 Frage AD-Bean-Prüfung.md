# Ist geregelt, dass jedes allgemeine Thema auf eine AD-Bean geprüft wird?

**Stand 18.11.2026** · Sitzung 0127

## Antwort: nur zum Teil

**Was es gibt:**
- **R-1.13** (Designrichtlinie allgemein 17): *„ein allgemeines Element, das neu entsteht oder umgebaut wird, ist eine AD-Bean in `ui.js` …“* und
  *„gleiche Aufgabe in anderer Ausprägung = Eigenschaft, andere Aufgabe = eigene Bean“*. Was gebaut wird, muss also eine Bean sein, und die
  Regel sagt auch, wann es eine neue Bean braucht und wann eine Eigenschaft genügt.
- **Prüfung `checkBeans`** (`tests/doku.mjs`): Sie vergleicht die Liste der AD-Beans (15) mit `ui.js` und `design.css`, prüft, dass jede Kennung
  nur einmal vorkommt, dass das CSS nur unter dem Präfix steht und dass die App keine inneren Namen nutzt. Geprüft werden also nur Beans, die
  schon in der Liste stehen.

**Was fehlt:**
- In der **Zusammenarbeit** gibt es keinen Schritt, der bei jedem allgemeinen Thema fragt: in eine bestehende AD-Bean (als Eigenschaft) oder eine
  neue AD-Bean (mit Kennung)? Weder 0 Nr. 4 („allgemein oder App“) noch 0 Nr. 25 (Ablauf einer Änderung) noch 2.6 (Apple-Abgleich vor dem Muster)
  nennen die AD-Beans.
- **Keine Prüfung** findet ein neues allgemeines Element, das außerhalb einer Bean gebaut wurde. Was nicht in der Liste steht, sieht `checkBeans`
  nicht.
- Ein **kleiner Eingriff** in ein bestehendes Element: Ob er schon als „umgebaut“ zählt, ist offen. Bestehende Elemente kommen laut APD-136 erst mit
  APD-135 Paket 6 und 7 dran.

## Vorschlag Wortlaut (0 Nr. 29) – 0 Nr. 25 „Ablauf einer Änderung“

**Alt:**
> 25. **Ablauf einer Änderung:** nachfragen, bis alles geklärt ist → Muster (Nr. 6, 23) mit Testfall-Liste (Nr. 1) → allgemein oder App
>     (Nr. 4) → in ‚0. Nächste Version‘ eintragen, nicht sofort bauen …

**Neu:**
> 25. **Ablauf einer Änderung:** nachfragen, bis alles geklärt ist → Muster (Nr. 6, 23) mit Testfall-Liste (Nr. 1) → allgemein oder App
>     (Nr. 4) → bei allgemein: welche AD-Bean – eine bestehende mit neuer Eigenschaft oder eine neue mit Kennung (R-1.13); das steht im Muster und
>     in der Bau-Frage → in ‚0. Nächste Version‘ eintragen, nicht sofort bauen …

Prüfung: Selbstkontrolle (wie bisher bei Nr. 25). Eine automatische Prüfung, die neue Elemente außerhalb einer Bean findet, wäre ein eigenes Thema
(Vorschlag: mit APD-135 Paket 6 und 7).

**Wann:** Das ist eine Änderung der Zusammenarbeit, also Version 3.15.0. Sie käme mit der nächsten Version nach dem laufenden Bau, zusammen mit
APD-135 Pakete 1 und 3 (die ebenfalls Regeln betreffen).

## Stand des Baus

AppDesign 4.60.1 mit Reiselogbuch 3.57.1: Der volle Prüflauf läuft im Hintergrund, den Bericht schicke ich, sobald er fertig ist.
