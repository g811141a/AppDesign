# A-13 – Tabelle steht still, solange das Fenster ‚Tag‘ offen ist – Klärung und Fall-Liste

**Stand 16.10.2026** · Sitzung Reiselogbuch 0008 · neu gefasst nach den Antworten des Nutzers

## Wunsch (Nutzer, 16.10.2026)

‚Nach dem Wählen eines Tages soll die Tabelle eingefroren bleiben, bis man von der Tageserfassung zurück ist.‘ Heute
steht nach dem Schließen ein **späterer** Tag oben, der erfasste Tag ist **nach oben verschwunden** (iPad quer).
Danach (Antwort 2): Tabelle genau wie vorher, die Zeile kurz blau; nach ‹ › nur so weit rollen, bis der zuletzt gezeigte
Tag sichtbar ist. Der frühere Wunsch ‚immer ganz oben‘ entfällt.

## Ursache (Befund)

- Die App selbst rollt beim Schließen nicht: in Chromium und WebKit ohne Tastatur bleibt die Tabelle vorher, mit offenem
  Fenster und nach dem Häkchen auf derselben Stelle (Nachbildung 16.10.2026).
- Beim Schreiben im Fenster öffnet sich die **Tastatur**. Safari schiebt dann die **ganze Seite** nach oben, damit das
  Eingabefeld frei bleibt. Die Sperre der Seite hinter dem Fenster (`lockPage`: `overflow: hidden`) wirkt in Safari
  nicht – die Tabelle rollt mit. Geht die Tastatur zu, schiebt Safari nicht zurück → die Tabelle steht um etwa eine
  Tastaturhöhe weiter unten. Dasselbe beim Wischen über das Ende des Fensters hinaus.
- Betrifft **jedes** Fenster (AppDesign `ui.js`), sichtbar wird es beim Fenster ‚Tag‘, weil man dort schreibt.
- **Gilt allgemein (Nutzer, 16.10.2026):** iPhone und iPad verhalten sich gleich, soweit sinnvoll; die Änderung liegt in
  AppDesign und gilt für alle Apps (Tabellenzeile am iPad, Kasten am iPhone).

## Lösung

1. **AppDesign `lockPage`/`unlockPage`:** beim Öffnen eines Fensters die Seite wirklich festhalten (Scrollstand merken,
   Seite fest an diese Stelle setzen), beim Schließen genau dort freigeben. Kopfzeile und Seitenleiste bleiben, wo sie sind
   (R-2.1).
2. **Nach dem Schließen** (Fenster aus einer Zeile): die Zeile ist ganz sichtbar? → nichts rollt. Nach ‹ › nicht sichtbar? →
   nur so weit rollen, bis sie ganz sichtbar ist (wie Apple). Die Zeile wird kurz blau hinterlegt und blendet aus (~1 s).
3. **Neue allgemeine Regel R-7.3** (Thema 7, Listen): ‚Liste steht still, solange ein Fenster offen ist; danach wie vorher,
   Zeile kurz hervorgehoben.‘ Abgrenzung: R-7.1 (Position beim Neuaufbau der zentralen Liste) bleibt; R-2.1 (Leisten fest).

## Fall-Liste (je Fall ein automatischer Test)

| Nr. | Fall | Erwartet |
|---|---|---|
| Z-1 | iPad quer, Tag in der Mitte, schreiben mit **nachgebildeter Tastatur** (Safari schiebt die Seite), Häkchen | Tabelle danach auf demselben Scrollstand (± 1 px), Zeile an derselben Stelle |
| Z-2 | wie Z-1, Fenster offen | Tabelle hinter dem Fenster bewegt sich nicht, auch beim Wischen über das Fensterende |
| Z-3 | x ohne Änderung / x → ‚Änderungen verwerfen‘ | wie Z-1; Daten wie vorher |
| Z-4 | im Fenster mit ‹ › weiter, letzter gezeigter Tag liegt unterhalb | nach dem Schließen nur so weit gerollt, dass seine Zeile ganz sichtbar ist |
| Z-5 | ‹ › auf einen Tag, der schon sichtbar ist | nichts rollt |
| Z-6 | letzte Tage, Seite ganz unten | Stand bleibt, kein Sprung nach oben |
| Z-7 | iPad hoch (Seitenleiste darübergelegt), iPhone hoch und quer (Tageskästen) | wie Z-1 und Z-4 |
| Z-8 | Suche offen | wie Z-1; Suchzeile und Trefferzähler bleiben |
| Z-9 | Leisten | Kopfzeile, Suchzeile und Seitenleiste bewegen sich keinen Millimeter (R-2.1), auch nicht beim Öffnen und Schließen |
| Z-10 | Hervorhebung | Zeile ~1 s blau, blendet aus; hell und dunkel; bei ‚Bewegung reduzieren‘ ohne Ausblenden |
| Z-11 | andere Fenster (Fazit, Reise, Einstellungen, Backup) und Meldungen | Seite bleibt ebenfalls stehen; keine Hervorhebung (kommen nicht aus einer Zeile) |
| Z-12 | Fenster öffnet ein zweites (Meldung über dem Fenster) | erst wenn beide zu sind, wird freigegeben – auf denselben Stand |
| Z-13 | Drehen bei offenem Fenster | nach dem Schließen ist die Zeile sichtbar |
| Z-14 | Seite ganz oben (Stand 0) | nichts springt; der große Titel auf dem iPhone bleibt groß |

**Nur auf dem Gerät prüfbar (Prüfliste):** echte Tastatur und Diktieren im Fenster ‚Tag‘ am iPad quer, Gefühl der
Hervorhebung.

## Umfang

- **AppDesign 4.18.0:** `lockPage`/`unlockPage` (Seite festhalten), Baustein für ‚Zeile zeigen und kurz hervorheben‘,
  Regel R-7.3, Prüfung mit nachgebildeter Tastatur.
- **Reiselogbuch 3.16.0:** auf Fassung 4.18.0 heben (Rückfrage nach 0 Nr. 10 – hiermit gestellt), nach dem Schließen des
  Fensters ‚Tag‘ den Baustein aufrufen.
