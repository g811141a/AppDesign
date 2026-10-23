# Übergabe an die nächste Sitzung

**Stand 23.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0033‘ (Ende, automatische Übergabe bei etwa 320.000 Token) – Aufbau
nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung
steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.29.0** online (Fassung 4.31.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.31.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0034**; die danach 0035.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15 (in 0033 beides richtig).
- **Offene Prüfpunkte:** keine (P-67 ok, E-79 / E-123).
- **Offen beim Nutzer:** Rückmeldung zum **korrigierten Muster A-61 Teil 2 ‚Blatt‘** (Tastatur) und Wahl **A oder B** – siehe 3.
- **‚0. Nächste Version‘ (bereit, Nutzer sagte zum Bau vorerst ‚Nein‘):** AppDesign **A-69** (R-7.4 erweitert: aktueller Eintrag
  oben ohne Hervorhebung, `checkOpenAt` mit `markiert`) und Reiselogbuch **T-98** (Startposition: Reise läuft → heute oben ohne
  Gelb; Reise in der Zukunft → ganz oben; Gelb nur bis heute) – Fall-Liste `arbeit/A-69 T-98 Fall-Liste.md` (F1–F11). Als
  AppDesign 4.32.0 / Reiselogbuch 3.30.0 geplant; kann mit A-61 Teil 2 in eine Sammelversion (höchstens 2 Themen, 0 Nr. 8).
- **Backlog danach:** AppDesign Prio 2 A-43 Barrierefreiheit; dann A-62 Paket B, A-30 (mit T-10), A-32.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0033

- **P-67 (3.29.0) ok** – A-68, A-64, A-65 erledigt (AppDesign E-79, Reiselogbuch E-123).
- **T-98 geklärt** (Nutzer): läuft die Reise und ist alles erfasst → heute oben; erfasstes Heute **ohne Gelb**; **Gelb nur bis
  heute**; R-7.4 **allgemein** erweitert (A-69). Beides in ‚0. Nächste Version‘.
- **A-61 Teil 2 Blatt (T-15):** entschieden – auf dem iPhone alle Fenster außer Meldungen als Blatt, am iPad bleibt das Fenster
  in der Mitte. Apple-Abgleich, Muster `arbeit/A-61 Teil 2 Muster.html` (Heute · A nur groß · B mittel und groß mit Griff),
  Fall-Liste `arbeit/A-61 Teil 2 Fall-Liste.md` (B1–B24, Abschnitt 5 Rückmeldung), Prüfung `arbeit/A-61 Teil 2 Muster prüfen.mjs`
  (Chromium und WebKit grün; Aufruf aus einem Ordner mit `node_modules` → Playwright, z. B. Notizordner mit Verweis auf
  `ReiseLogBuch/tests/node_modules`).
- **Rückmeldung am Gerät zum ersten Muster:** A alles ok bis auf 6; Fehler in A 6, B 7.6, quer 8.6 – Reisemittel nach dem
  Aufgehen der Tastatur nicht zu sehen, nach unten ziehen schloss die Tastatur nicht. **Korrigiert (57bc1d4):** Blatt als
  `<dialog>` mit `showModal` (S-9), Feld beim Fokus in die obere Hälfte und neuer Fokus (S-8 wie ui.js), B springt dabei auf groß,
  Zug nach unten schließt die Tastatur (auch auf einem Feld), iPhone quer niedriger Fensterkopf (R-2.4). Prüfung mit
  `safariModell` und Sicherheitsabständen – rot gegen das erste Muster, grün jetzt. B 7.1 und 7.2 (halb hoch, beim Feld ganz
  hoch, federt auf halbe Höhe zurück) sind das vorgesehene Verhalten von B – in 0034 kurz bestätigen lassen.
- **Gelernt:** (1) Fenster im Muster als echtes `<dialog>` bauen – sonst behandelt Safari (und das Modell) Felder darin wie Felder
  im Inhalt und rollt beim Öffnen der Tastatur zurück (S-9). (2) Tastatur-Fälle nur mit Sicherheitsabständen prüfen
  (`--st`/`--sb` setzen), sonst liegt ein Feld zufällig über der Tastatur. (3) In der Prüfumgebung blieben rAF-Bewegungen in WebKit
  hängen – Bewegungen als Web-Animation. (4) github.io ist aus der Cloud gesperrt (403) – Pages-Lauf über die GitHub-Werkzeuge prüfen.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **Rückmeldung zum korrigierten Muster einholen** (0 Nr. 11: Link, Schritte, Auswahlfenster). Link:
   https://g811141a.github.io/AppDesign/arbeit/A-61%20Teil%202%20Muster.html (vom Home-Bildschirm). Schritte für den Nutzer:
   1. A, ‚Reiselogbuch bearbeiten‘, Reisemittel antippen – erwartet: Kopf und Feld bleiben über der Tastatur.
   2. Nach unten ziehen (am Kopf, auf einem Feld) – erwartet: Tastatur zu; am Kopf bzw. Inhalt ganz oben auch das Blatt zu
      (mit Änderung: federt zurück und fragt).
   3. Im gerollten Inhalt nach unten ziehen – erwartet: nur die Tastatur geht zu, der Inhalt rollt.
   4. Dasselbe mit B (springt beim Antippen sofort auf groß) und im iPhone quer (niedriger Kopf, Feld über der Tastatur).
   Dann **A oder B** wählen (Empfehlung Claude: A), ‚Als allgemeine Regel festhalten?‘ (Empfehlung ja: 15.17/7, neue Regel im
   Katalog mit Prüfung `checkSheet`), dann in ‚0. Nächste Version‘.
2. **Version fragen** (0 Nr. 8, 21): A-61 Teil 2 und A-69/T-98 als Sammelversion AppDesign 4.32.0 / Reiselogbuch 3.30.0 –
   ‚Soll ich … erstellen? Ja/Nein‘.
3. Danach A-43 Barrierefreiheit.

## 4. Danach

A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen; Kollision Wegwischen hoch klären) · A-32 ‚Problem melden‘ · A-40 Prüfungen
für G-1 bis G-19 · A-44 bis A-60 · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0034 – A-61 Teil 2 Blatt: Rückmeldung zum korrigierten Muster

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild, zeige die Schritte zum korrigierten Muster A-61 Teil 2 (UEBERGABE.md Abschnitt 3) vollständig im Chat mit Link und warte mit dem Auswahlfenster auf meine Rückmeldung dazu.
```
