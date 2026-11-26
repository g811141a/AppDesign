# RLB-126 – Plan fürs Muster (Sitzung 0164)

**Kontext:** etwa 245.000 (`messung.mjs`); ab 300.000 ist die Übergabe fällig (0 Nr. 13). Muster, Prüfung in Chromium und WebKit, Testfall-Liste und
Wortlaut der Regel brauchen nach meiner Schätzung mehr als die verbleibenden rund 55.000. Das ist eine Schätzung, keine Messung.

## Plan (gelesen im Code von Reiselogbuch 3.58.5)

- **Ablage:** `AppDesign/arbeit/RLB-126/index.html`
  - Kopie von `ReiseLogBuch/index.html` mit Fassung `../../fassung/4.70.2/`.
  - Eigene Daten unter `reiselogbuch.muster-rlb126`, nie die echten (wie RLB-125).
  - Link: https://g811141a.github.io/AppDesign/arbeit/RLB-126/index.html
- **`deleteTrip`:** ohne Abfrage (J-2). Das Reiselogbuch wandert mit Löschzeitpunkt und Gerät nach `db.recentlyDeleted`, `days` = 30.
- **`renderSide`:** Am Ende der Liste steht der Eintrag ‚Zuletzt gelöscht‘ mit Zahl, nur wenn er nicht leer ist (iPad Seitenleiste, iPhone Startliste).
  Er öffnet die Liste der gelöschten Reiselogbücher. Jede Zeile zeigt Titel, Zeitraum und ‚noch N Tage‘ (J-4).
- **Antippen:** öffnet die Vorschau nur zum Lesen, nach `renderLocked` (J-3), mit dem Hinweis ‚Gelöscht am … – wird in N Tagen endgültig gelöscht.‘
  und ‚Wiederherstellen‘.
- **Kontextmenü und Wischen** (`tripActions`): Wiederherstellen · Endgültig löschen (rot). Abfrage nur beim endgültigen Löschen, mit ‚Abbrechen‘.
- **Muster-Knopf:** ‚Löschdatum −29 Tage‘, um ‚noch 1 Tag‘ und das Aufräumen nach Ablauf zu zeigen.
- **Mitliefern:**
  - Testfall-Liste (0 Nr. 1)
  - Wortlaut alt/neu der Lösch-Abfrage (L-4/L-5 entfallen)
  - Vorschlag Wortlaut und Nummer der neuen allgemeinen Regel (J-6, 0 Nr. 29)
  - Schritte mit ‚Erwartet: …‘

## Empfehlung

Übergabe jetzt. Die neue Sitzung **Reiselogbuch 0165 – RLB-126 Muster ‚Zuletzt gelöscht‘** baut das Muster nach diesem Plan, mit vollem Kontext.
