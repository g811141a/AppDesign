# A-27 – Auswertung der Messung P-57

**Stand 19.10.2026** · Sitzung Reiselogbuch 0015 · vier Dateien vom Nutzer (iPhone hoch 13:28, iPhone quer 13:32, iPad quer
13:35 und 13:37), Reiselogbuch 3.24.0 / AppDesign 4.26.0, iOS 26.6.2, Home-Bildschirm

## 1. Ergebnis in einem Satz

Das Zittern entsteht **nicht**, weil die Seite zu kurz wird (Vermutung aus A-24). Es entsteht durch ein **Hin und Her zwischen
unserem Rollen zum Treffer und Safari**. Etwa 0,5 s nach jedem Buchstaben rollt die App den Treffer unter die Suchzeile.
Am iPhone verschiebt Safari daraufhin den sichtbaren Bereich um 121 px (quer 21 px). Beim nächsten Buchstaben rechnet die App
diese Verschiebung heraus und rollt 121 px zurück, worauf Safari sie wieder aufhebt. Kopf- und Suchzeile stehen dabei jedes Mal
**2 Bilder (33 ms) um 121 px falsch**, bis unser Ausgleich `--vv-top` nachzieht.

## 2. Die Messwerte (iPhone hoch, 402 × 874, Tastatur offen: sichtbare Höhe 409 statt 812)

Ausschnitt nach ⓧ (Datei 13:28, Zeilen 182–218), immer derselbe Ablauf je Buchstabe:

| t (ms) | Ereignis | scrollY | vt (`offsetTop`) | `--vv-top` | Kopfzeile | Suchzeile |
|---|---|---|---|---|---|---|
| 35335 | Buchstabe 1 | 110 | 0 | 0 | 0 | 62 |
| 35858 | App rollt zum Treffer | **230** | 0 | 0 | **−120** | **−58** |
| 35891 | Safari meldet `vv scroll` (+33 ms) | 230 | **120** | 0 → 120 | −120 → 0 | −58 → 62 |
| 37100 | Buchstabe 2 | 230 | 120 | 120 | 0 | 62 |
| 37625 | App rollt zum Treffer | **109** | 120 | 120 | **+121** | **183** |
| 37658 | Safari meldet `vv scroll` (+33 ms) | 109 | **0** | 120 → 0 | 121 → 0 | 183 → 62 |
| 38787 | Buchstabe 3 | 109 | 0 | 0 | 0 | 62 |
| 39308 | App rollt zum Treffer | **230** | 0 | 0 | **−121** | −59 |
| … | so bei **jedem** weiteren Buchstaben (4, 5, 6, 7) | 230 ↔ 109 | 121 ↔ 0 | | ±121 | |

- **Vor ⓧ** (Zeilen 161–176) rollt die App nur beim ersten Buchstaben (1010 → 230). Danach steht der Treffer schon richtig, und es
  wird nicht mehr gerollt. Das ist das „leichte“ Zittern am Anfang: ein einzelner Sprung.
- **Nach ⓧ** rollt Safari beim neuen Fokus die Seite von selbst auf 110 (Zeile 181). Ab dann rollt die App bei **jedem** Buchstaben
  hin und her, und die Leisten springen jedes Mal um 121 px. Das ist das „massive“ Zittern.
- **Ursache im Code:** `scrollUnderBar()` (Reiselogbuch `index.html`) zieht `visualViewport.offsetTop` vom Ziel ab. Steht Safari bei
  vt = 121, rollt die App auf 109, und Safari setzt vt auf 0. Steht vt bei 0, rollt die App auf 230, und Safari setzt vt auf 121.
  So schaukelt es sich bei jedem Buchstaben auf.
- **Seitenlänge:** 2822–3782 px bei 812 px Fensterhöhe. Die Seite war also nie zu kurz, und die Vermutung aus A-24 war falsch.
- **Mit ⌃ ⌄** schließt sich die Tastatur (vh 812, vt 0), und alles steht still, genau wie gemeldet.

## 3. iPhone quer (Datei 13:32)

Derselbe Ablauf mit 21 px statt 121 px (scrollY 209 ↔ 230, vt 0 ↔ 21). Bei offener Tastatur sind nur 126 px sichtbar. Das Hin und
Her beginnt hier schon beim zweiten Buchstaben, weil Safari schon beim Öffnen der Suche um 21 px schiebt.

**Startliste:** Die App rollt dort nicht zum Treffer, also gibt es kein Hin und Her. Safari schiebt beim Fokus nur einmal um 19 px
(nach ⓧ noch einmal um 19 px), und unser Ausgleich fängt das im selben Bild auf. **Neu und auffällig:** `innerHeight` wird quer mit
jedem Fokus um 19 px kleiner (402 → 383 → 364) und ist erst nach dem Schließen der Tastatur wieder 402. Das gehört zur
iOS-26-Eigenheit aus Abschnitt 13 (Quellen dort).

## 4. iPad (Dateien 13:35 und 13:37)

`offsetTop` bleibt immer 0, Safari schiebt den sichtbaren Bereich nie. Deshalb hat das Rollen zum Treffer am iPad keine Folgen,
und dort zittert nichts. Die Datei 13:37 enthält nur Start und Ende (5 s).

## 5. Nebenbefunde

- **Messfehler im eigenen Messmodus:** In der Zeile eines `scroll`-Ereignisses ist die Lage der festen Leisten einmal um den Rollweg
  versetzt, z. B. Kopfzeile 564 bei 670 → 106. Das ist auch am iPad so, wo nichts zittert. Gemeint ist also der Messzeitpunkt
  mitten im Rollen, nicht das Bild. Für die Auswertung zählen deshalb nur die Bildzeilen und die Zeilen danach. Für das
  Safari-Modell gilt: **diese Zeilen nicht nachbilden.**
- **Zurück zur Startliste** (iPhone, Zeilen 234–242 bzw. quer 139–150): `vt` springt für ein Ereignis auf den alten Rollstand
  (1063 bzw. 209). Die Kopfzeile der Liste steht dabei für 0–1 Bild falsch. Gemeldet wurde das nicht, wird aber mit A-28 geprüft.

## 6. Was das für die nächsten Schritte heißt

1. **Safari-Modell `tests/safari.mjs`** nach diesen Werten: Tastatur offen = sichtbare Höhe 409 (hoch) bzw. 126 (quer). Ein
   `scrollTo` der App bei offener Tastatur verschiebt den sichtbaren Bereich so, wie gemessen; die Meldung `vv scroll` kommt
   2 Bilder später. `ablauf-suche-iphone.mjs` muss damit gegen 3.24.0 **rot** sein: ±121 px bei jedem Buchstaben nach ⓧ.
2. **Lösung:** Zwei Wege beheben genau dieses Muster.
   - **Kleine Korrektur:** `scrollUnderBar` rechnet `offsetTop` nicht mehr heraus und rollt nicht, wenn der Treffer schon unter der
     Suchzeile steht. Dann gibt es kein Hin und Her mehr.
   - **Umbau B (A-28):** Nur der Inhalt rollt, und Safari hat nichts mehr zu verschieben.

   Die Messung zeigt eine klare, enge Ursache. Die kleine Korrektur ist deshalb der kürzere Weg. Ob sie am Gerät reicht, zeigt
   eine zweite Messung.
3. Abschnitt 13 der Designrichtlinie wird berichtigt: Die Ursache ist das Rollen bei offener Tastatur, nicht eine zu kurze Seite.
   Dazu kommt die neue Eigenheit, dass `innerHeight` quer schrumpft.
