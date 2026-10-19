# A-33 Kapsel ‚Nach oben / Ans Ende‘ verdeckt die Suchzeile – Fall-Liste

**Stand 19.10.2026** · Sitzung Reiselogbuch 0017 · Anlass: P-58/2 nicht ok (iPhone quer, Tastatur offen)

## 1. Was passiert und warum

Seit 4.27.0 (A-28, B1) steht die Kapsel ‚Nach oben / Ans Ende‘ über der Tastatur. Vorher lag sie unter der Tastatur und war
nicht zu sehen. Am iPhone quer ist der sichtbare Bereich bei offener Tastatur nur **126 px** hoch. Kopf- und Suchzeile
brauchen davon schon gut 100 px. Die Kapsel ist 96 px hoch und steht 16 px über der Tastatur. Sie reicht deshalb bis in die
Suchzeile und verdeckt ⌄ (vielleicht auch einen Teil der Kopfzeile).

**Warum die Prüfung es übersehen hat:** `checkFab` prüfte nur, dass die Kapsel über der Tastatur endet. Ob sie dabei
Kopf- oder Suchzeile überdeckt, hat keine Prüfung gemessen.

## 2. Zwei Wege

| | A (Vorschlag) | B (dein Vorschlag) |
|---|---|---|
| Was | Die Kapsel erscheint nur, wenn sie ganz in den Inhalt unter der Suchzeile passt (Inhalt mindestens 96 + 2 × 16 px hoch). Sonst ist sie ausgeblendet. | Die Schaltflächen der Suche rücken nach links, damit die Kapsel daneben Platz hat. |
| iPhone quer, Tastatur offen | Kapsel weg. Vom Inhalt sind nur etwa 20 px zu sehen, zum Springen gibt es ⌃ ⌄ der Suche. Nach dem Schließen der Tastatur ist die Kapsel wieder da. | Die Kapsel ist 96 px hoch und reicht auch dann noch bis in die Kopfzeile. Dort müssten Teilen, Lupe und ‚…‘ ebenfalls nach links rücken. Das Suchfeld wird schmaler. |
| iPhone hoch, Tastatur offen | Kapsel bleibt (der Inhalt ist etwa 300 px hoch) | wie heute |
| iPad | unverändert | unverändert |

**Empfehlung A.** Sie ist einfacher. Kopf- und Suchzeile bleiben überall gleich (R-1.1, gleiche Schaltflächen an gleichen
Stellen). Und dort, wo die Kapsel nicht passt, ist sowieso kaum Inhalt zu rollen.

## 3. Allgemeine Regel (Zusammenarbeit 0 Nr. 4)

Vorschlag als Ergänzung von **R-3.2**: ‚Die Kapsel Nach oben / Ans Ende überdeckt nie Kopf- oder Suchzeile. Passt sie nicht
ganz in den Inhalt, ist sie ausgeblendet.‘ Das gilt für alle Apps.

## 4. Fall-Liste (jeder Fall wird eine automatische Prüfung)

| Nr. | Gerät / Lage | Zustand | Erwartet | Prüfung |
|---|---|---|---|---|
| K-1 | iPhone quer | Suche offen, Tastatur offen (sichtbar 126 px) | Kapsel ausgeblendet; ⌃ ⌄ ⓧ frei antippbar | `checkFab` (neu: Abstand zu Kopf- und Suchzeile), Grundregel in `hig.mjs` (Kapsel schneidet keine Leiste) |
| K-2 | iPhone hoch | Suche offen, Tastatur offen (409 px) | Kapsel über der Tastatur, unter der Suchzeile, nichts verdeckt | `checkFab` |
| K-3 | iPhone hoch und quer | Tastatur zu | Kapsel wie bisher unten rechts | `checkFab`, `kapsel-iphone.mjs` |
| K-4 | iPad quer und hoch | Tastatur offen und zu | unverändert, nichts verdeckt | `checkFab` |
| K-5 | alle | Tastatur geht zu | Kapsel kommt wieder | `checkFab` |
| K-6 | – | Gegenprobe | ohne die Korrektur rot (iPhone quer, Tastatur offen) | `--gegenprobe` |

Nur am Gerät: P-59 (Suche quer mit Tastatur: ⌃ ⌄ frei, Kapsel nach dem Schließen wieder da).

## 5. Aus der Messung P-58/6 (iPhone hoch, 35 s)

- `sy` ist **immer 0**: die Seite rollt nie. `vt` (`offsetTop`) und `--vv-top` sind **immer 0**.
- Kopfzeile **0**, Suchzeile **62** in jeder Zeile, auch beim Tippen, nach ⓧ und nach ⌄: **kein Zittern**.
- Lupe und ⓧ setzen `inh` sofort auf 0. Der Treffer kommt nach der Pause (`inh` 230).
- Damit ist A-24 am Gerät bestätigt (hoch). `--vv-top` könnte wegfallen (Fall-Liste A-28, Vorschlag 5). Das kommt als
  eigener Punkt ins Backlog, nicht in diese Korrektur.

## 6. Entscheidungen des Nutzers 19.10.2026

- **Weg A:** Die Kapsel erscheint nur, wenn sie ganz in den Inhalt unter der Suchzeile passt, sonst ist sie ausgeblendet.
- **Allgemeine Regel: Ja.** R-3.2 wird ergänzt: ‚Die Kapsel Nach oben / Ans Ende überdeckt nie Kopf- oder Suchzeile; passt sie
  nicht ganz in den Inhalt, ist sie ausgeblendet.‘ Prüfung: `checkFab` und eine Grundregel in `hig.mjs`.
- **Ja zum Bau** als Korrektur AppDesign 4.27.1 / Reiselogbuch 3.25.1, in der neuen Sitzung Reiselogbuch 0018. Danach Prüfpunkte P-59.
