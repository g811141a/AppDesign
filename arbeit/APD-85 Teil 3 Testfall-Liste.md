# APD-85 Teil 3 – Testfall-Liste: Wackler beheben (`ablauf-blatt` als Vorbild)

Stand 31.10.2026, Sitzung 0067 · **bestätigt** (Nutzer 31.10.2026) · Umfang a) gewählt (Nutzer 31.10.2026): `ablauf-blatt` (einziger bisheriger Wackler, Sitzung
0061) ohne feste Pausen, dazu ein allgemeiner Baustein ‚warten, bis …‘ in `tests/pruefe.mjs` · Werkzeug, keine Regel der App ·
für AppDesign 4.49.0 (4.48.0 ist mit drei Punkten voll, Zusammenarbeit 0 Nr. 8).

## Die vier festen Pausen in `ReiseLogBuch/tests/ablauf-blatt.mjs`

| Stelle | heute | künftig (Warten auf einen Zustand) |
|---|---|---|
| Zeile 21 Vorschau | nach dem Antippen von Teilen 150 ms | bis das Menü offen ist und der Eintrag ‚Vorschau‘ ruht |
| Zeile 32 Start | nach dem Neuladen 400 ms | bis die App aufgebaut ist (Kopfzeile bzw. Seitenleiste sichtbar, zwei Bildwechsel – `ruhe`) |
| Zeile 33 Eintrag öffnen | nach dem Antippen in der Seitenleiste 600 ms | `navFertig` (Seitenwechsel fertig) |
| Zeile 38 Blatt offen | nach dem Öffnen 700 ms | bis das Fenster offen ist und das Blatt nicht mehr fährt (`blatt-faehrt` weg) |

## Baustein

`warteBis(p, bedingung, { was, max = 3000 })` in `tests/pruefe.mjs`: wartet, bis `bedingung` im Browser wahr ist (jedes Bild geprüft),
höchstens `max` ms; danach ein Fehler mit `was` (Fehler mit Rückgabewert wie die übrigen Prüfungen, nie ein Hängen).

## Testfälle (automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| Z-1 | `warteBis` mit einer Bedingung, die nach 50 ms wahr wird | kehrt nach höchstens einem Bild danach zurück, nicht nach einer festen Zeit |
| Z-2 | `warteBis` mit einer Bedingung, die nie wahr wird | nach `max` ein Fehler mit dem Text aus `was` – kein Hängen |
| Z-3 | `ablauf-blatt` ohne `waitForTimeout` | grün in Chromium und WebKit, in allen Ansichten wie heute |
| Z-4 | Gegenprobe unter Last: `ablauf-blatt` zehnmal gleichzeitig, Bewegungen vierfach verlangsamt | alter Stand: mindestens ein roter Lauf; neuer Stand: alle grün |
| Z-5 | Laufzeit von `ablauf-blatt` | nicht länger als heute (gemessen im Lauf) |
| Z-6 | Selbsttest des Bausteins (Z-1, Z-2) | im AppDesign-Selbsttest, Gegenprobe rot, wenn `warteBis` nicht wartet |

## Danach

Andere Tests stellen auf `warteBis` um, sobald sie als ‚⚠ wackelt‘ gemeldet werden; Claude zählt die Wackler weiter im Backlog.
