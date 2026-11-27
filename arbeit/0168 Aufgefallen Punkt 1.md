# Aufgefallen, Punkt 1 – Wiederherstellen stempelt alle Felder neu

**27.11.2026 · Sitzung 0168** · aus `arbeit/0167 Bericht 4.71.0 – 3.59.0.md`

Usertest P-126: P-126/0 bis P-126/8 sind **alle ok**. Im Backlog des Reiselogbuchs steht das unter ‚Erledigt‘ (`7723935`).

## Befund (belegt)

- **Code:** `createSync.stamp` (AppDesign `ui.js`, Fassung 4.71.0) vergleicht mit dem zuletzt gespeicherten Stand `lastSnap`.
  - Ein wiederhergestelltes Reiselogbuch steht dort nicht mehr, weil es beim Löschen herausfiel.
  - Deshalb bekommt **jedes Feld und jeder Tag** den Zeitpunkt des Wiederherstellens.
- **Nachgespielt:** in Chromium mit `createSync` aus `fassung/4.71.0/ui.js`, zwei Datenstände, ohne die App-Oberfläche.
  1. t=1000: Beide Geräte haben ‚Test‘ mit dem Verlauf ‚alt‘.
  2. t=2000: Das iPad löscht ‚Test‘.
  3. t=3000: Das iPhone hat noch nicht abgeglichen und ändert den Verlauf in ‚neu vom iPhone‘.
  4. t=4000: Das iPad stellt ‚Test‘ wieder her. Danach stehen alle Feld-Zeitpunkte auf 4000.
  5. Dann wird abgeglichen.
  - **Ergebnis heute:** Der Verlauf ist ‚alt‘, die Änderung vom iPhone ist verloren.
- **Wann es passiert:** Nur wenn das andere Gerät ein Reiselogbuch ändert, bevor es von der Löschung weiß, und es danach auf dem ersten Gerät wiederhergestellt wird.
  - Kennt das andere Gerät die Löschung schon, kann es nichts ändern, denn in ‚Zuletzt gelöscht‘ ist es nur zum Lesen.

## Korrektur (nachgespielt)

- **Beim Wiederherstellen behalten Felder und Tage ihre Zeitpunkte.** Nur `changedAt` und `changedOn` werden neu gesetzt, damit das Wiederherstellen die Löschung schlägt.
- **Ergebnis:**
  - Der Verlauf ist ‚neu vom iPhone‘.
  - Kennt das andere Gerät die Löschung schon, kommt ‚Test‘ dort trotzdem zurück, und ‚Zuletzt gelöscht‘ ist leer.

## Möglichkeiten

- **a) In AppDesign (Empfohlen):**
  - `createSync` bekommt einen Weg für ‚wiederhergestellt‘, den die AD-Bean `recentlydeleted` beim Wiederherstellen nutzt. Das ist eine neue Eigenschaft bzw. Methode, die genaue Schnittstelle kommt mit dem Vorschlag zum Bau.
  - **Grund:** Das betrifft jede App mit `recentlydeleted` und Abgleich, also allgemein = AD-Bean (R-1.13).
  - **Bewusst nicht automatisch:** ‚Jeder Eintrag, der mit eigenen Zeitpunkten zurückkommt‘ würde auch ‚Backup laden – Ersetzen‘ verändern.
- **b) Nur im Reiselogbuch:** Beim Wiederherstellen `lastSnap` nachführen. Das ist schneller, aber jede weitere App müsste es nachbauen.
- **c) Lassen und ins Backlog:** Der Fall ist selten, aber er verliert Daten ohne Hinweis.

**Wenn a oder b:** eine Korrekturversion vor allem Neuen (0 Nr. 8), mit Bau-Frage. Dazu eine feste Prüfung in `ablauf-zuletzt-geloescht` mit zwei Geräten, die gegen 4.71.0 rot ist (0 Nr. 1). Geprüft werden auch ‚Ersetzen‘ und ‚Abgleichen‘ ohne Wiederherstellen (unverändert). Stufe voll.
- **So macht es Apple:** Das ist kein HIG-Thema, denn es betrifft den Abgleich im Inneren.

## Danach

Punkte 2 bis 7 aus dem Bericht 0167, einzeln.
