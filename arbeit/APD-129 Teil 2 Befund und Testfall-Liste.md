# APD-129 Teil 2 – Bild springt nach dem Zurückdrehen nach oben (Usertest P-104)

**14.11.2026 · Sitzung 0113** · Messung `arbeit/APD-129/messung-2026-11-14-2137.txt` (iPhone 402 × 874 @3, Home-Bildschirm, Safari 27.2,
Reiselogbuch 3.56.1, AppDesign 4.59.1, hell, Text xl, Ränder oben/unten 0/34). Rückmeldung: P-104/1, /2, /3 nicht ok – ‚bei allen drei springt
das Bild nach dem Zurückdrehen auf hoch nach oben; erwartet: Bildaufbau wie am iPad‘.

## Befund aus der Messung

Alle drei Fälle zeigen dasselbe Muster. Spalten: `ih` Fensterhöhe, `sy` scrollY, `lkopf`/`kopf` Oberkante des Kopfs, `tag` erster Inhalt.

| Fall | Zeilen | 1. ganze Höhe 874 | 2. Fensterhöhe 812, Kopf/Inhalt **zu tief** | 3. Safari: scrollY 62 | 4. App setzt zurück | richtig |
|---|---|---|---|---|---|---|
| 1 Startliste | 9–17 | 16910: `lkopf` 62 | 16935–17236 (**301 ms**): `lkopf` 62 | 17236: `lkopf` −62 | 17239 (**3 ms**) | `lkopf` 0 |
| 2 Reiselogbuch | 207–216 | 47110 | 47148–47426 (**278 ms**): Inhalt 62 px tiefer (`tag` −33985 statt −34047), `kopf` 0 | 47426: `kopf` −62 | 47452 (**26 ms**) | `tag` −34047 = wie vor dem Drehen (Zeile 200) |
| 3 Blatt | 263–272 | 66862: `kopf` 60 | 66906–67156 (**250 ms**): `kopf` 60 | 67156: `kopf` −2 | 67187 (**31 ms**) | `kopf` 0 |

- **Der Sprung, den du siehst:** Nach dem Zurückdrehen meldet Safari zuerst die ganze Höhe 874, mit der Statusleiste über der App. Kopf und Inhalt
  rücken dann richtig um 62 px unter die Statusleiste. Danach meldet Safari wieder 812, die Statusleiste liegt jetzt außerhalb des Fensters, aber
  Kopf und Inhalt bleiben noch **250–300 ms um 62 px (≈ 1 cm) zu tief**. Erst mit Safaris letzter Größenmeldung springen sie hoch an ihren Platz.
- **Ursache (Vermutung, gestützt auf die Messung):** Der obere sichere Rand (`env(safe-area-inset-top)`, in `design.css` `--safe-top`) bleibt nach
  dem Wechsel auf 812 noch 250–300 ms auf 62. Alles, was ihn nutzt, steht zu tief: Kopfzeile `.nb` (Inhalt darunter), Seitenleiste bzw. Startliste
  `#side`, Blatt. Mit der letzten Meldung wird er 0, und gleichzeitig verschiebt Safari die Seite um 62 (scrollY 62). Das setzt 4.59.1 nach 3–31 ms
  zurück. In der Zeit stehen Kopf und Inhalt kurz 62 px **zu hoch**, für etwa ein bis zwei Bilder.
- **Am iPad** gibt es den Wechsel 874 → 812 nicht, weil die Statusleiste beim Drehen nicht über das Fenster wandert. Darum passt es dort.
- **Vermutung:** Der Sprung gab es schon vor 3.56.1 (Messung 0948, Zeilen 20–27: `tag` 349 statt 287 von 19905 bis 20207). Er fiel neben dem
  größeren Fehler (App blieb 1 cm zu tief) nicht auf.

**Warum die Prüfung ihn übersah:** Das Safari-Modell (`tests/safari.mjs`) kennt keine sicheren Ränder. In Chromium und WebKit der Prüfumgebung ist
`env(safe-area-inset-top)` immer 0. `safariDrehenHoch` bildet die Höhe 874 und die Verschiebung 62 nach, aber nicht den Rand, der nachhinkt.
Außerdem prüft `ablauf-drehen-iphone` nur den Zustand **nach** dem Drehen, nicht jedes Bild dazwischen.

## Vorschlag zur Korrektur

So macht es Apple: Beim Drehen gleitet der Inhalt in einer Bewegung an die neue Stelle, ohne nachträglichen Sprung. Das passt zu R-8.1, wo nach
dem Drehen alles an seinem Platz bleibt. Am iPad läuft es in der App schon so.

- **A – oberen Rand selbst bestimmen (`ui.js`):** Nur in der App vom Home-Bildschirm am iPhone. Ist die Fensterhöhe kleiner als die
  Bildschirmhöhe, liegt die Statusleiste außerhalb des Fensters, und der obere Rand ist 0. Dann setzt `ui.js` `--safe-top` sofort bei der
  Größenmeldung auf 0. Sonst gilt weiter `env(…)`: bei Höhe 874, quer, im iPad und in Safari ohne Home-Bildschirm. So rutschen Kopf und Inhalt
  mit der Meldung 812 sofort an den richtigen Platz.
- **B – Safaris Verschiebung im selben Augenblick zurücksetzen:** Die Rückstellung auf scrollY 0 aus 4.59.1 läuft direkt im Ereignis (resize
  bzw. scroll), nicht erst später (heute 3–31 ms). Ob Safari das Bild mit −62 trotzdem kurz zeigt, kann nur das Gerät sagen (Vermutung).
- **Safari-Modell:** Neu ist ein oberer Rand, der nachhinkt (`safeOben`), wie gemessen: 874 mit Rand 62 → 812 mit Rand 62 für 280 ms → Rand 0
  und scrollY 62. Die Eigenheit kommt mit Quelle (Messung 2137) in Designrichtlinie 13. Der Wortlaut folgt getrennt (0 Nr. 29).
- **Versionen:** Korrekturversion **AppDesign 4.59.2** mit **Reiselogbuch 3.56.2**. Gebaut wird erst nach deinem ‚Ja‘ zur Bau-Frage (0 Nr. 21).

## Testfall-Liste (automatisch)

Gerät × Lage × Handlung × Zustand; die Prüfung nimmt **jedes Bild** (`__safari.bilder`) von der Meldung 812 an auf. Nach jedem Schritt gelten die
Grundregeln (`pruefe.mjs`). Chromium und WebKit, Erweiterung von `ablauf-drehen-iphone`.

| Nr. | Gerät, Art | Ausgangszustand | Handlung | Erwartet |
|---|---|---|---|---|
| APD-129/M-10 | iPhone, Home-Bildschirm | Startliste hoch | quer → hoch (Rand hinkt nach) | Kopf der Startliste in **jedem** Bild ab der Meldung 812 ± 1 px an seinem Platz vor dem Drehen; Mehr (ellipsis) trifft |
| APD-129/M-11 | iPhone, Home-Bildschirm | Reiselogbuch offen, gerollt | quer → hoch | Kopfzeile und oberster Tag in jedem Bild ± 1 px; oberster Tag wie vorher (R-8.1); Zurück (chevron-left) trifft |
| APD-129/M-12 | iPhone, Home-Bildschirm | Blatt offen, ohne Fokus | quer → hoch | Kopf des Blatts in jedem Bild ± 1 px; x trifft |
| APD-129/M-13 | iPhone, Home-Bildschirm | Startliste hoch | zweimal hintereinander quer → hoch | wie M-10 |
| APD-129/M-14 | iPhone, Home-Bildschirm | Feld mit Fokus, Tastatur offen | quer → hoch | wie APD-129/M-4, keine Verschlechterung (R-4.5) |
| APD-129/M-15 | iPhone, Home-Bildschirm | Reiselogbuch quer | ansehen | oberer Rand unverändert aus `env(…)`, links und rechts unverändert |
| APD-129/M-16 | iPhone, Safari (nicht Home-Bildschirm) | Startliste hoch | quer → hoch | unverändert wie heute, kein eigener Rand |
| APD-129/M-17 | iPad, Home-Bildschirm | Reiselogbuch quer | hoch → quer → hoch | unverändert wie heute (R-8.1) |
| APD-129/M-18 | Gegenprobe | M-10 bis M-12 ohne Teil A | – | rot (gegen 4.59.1: 250–300 ms um 62 px zu tief) |

## Testfall (User) für den Usertest

iPhone, App vom Home-Bildschirm, hoch → quer → hoch in der Startliste, im Reiselogbuch und mit offenem Blatt. Erwartet: Das Bild gleitet in einer
Bewegung an seinen Platz, danach springt nichts mehr, wie am iPad. Alle Knöpfe reagieren beim ersten Tippen.
