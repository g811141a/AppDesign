# APD-140 Bean-Katalog – Regel und Bau-Frage

**Stand 19.11.2026** · Sitzung 0142

## Freigegeben (Nutzer 19.11.2026, im Fenster)

- Wortlaut 1 bis 4: R-1.13 (Regeltext und ‚Prüfung‘), Designrichtlinie 14 (Inhalt `katalog/`) und 15 (Einleitung) – `arbeit/0142 APD-140 Wortlaut R-1.13.md`
- Symbol Wischaktionen **`hand`**, Hinweisfenster bleibt `info`
- Backlog: APD-140 steht in ‚0. Nächste Version‘ (1 Punkt bereit), auf `main` hochgeladen (adc0eef)

## Als allgemeine Regel festhalten? (0 Nr. 4)

Vorschlag **ja**, als Erweiterung von R-1.13 (keine neue Nummer, 0 Nr. 3). So hat jede neue Bean in jeder App ihren Katalogeintrag, und `checkBeans`
meldet es, wenn er fehlt.

## Was gebaut wird – AppDesign 4.65.0 mit Reiselogbuch 3.57.8

1. **`katalog/index.html`:** Bean-Katalog als Split View wie im Muster, Variante A (Karte, Ausprobieren, Ereignisse, Regeln, Schnittstelle, Verlauf).
   Die Seitenleiste zeigt die Beans nach Bereichen, die geplanten (`gedrueckt`, `field`, `decimal`) grau. Er lädt `v4/`.
2. **`katalog/swipeactions.js`** und **`katalog/hinweis.js`:** je Bean eine Datei.
3. **`ui.js`:** neues Lucide-Symbol `hand`. AD-Bean: keine, weil der Katalog die Beans nur zeigt.
4. **Richtlinie:** der freigegebene Wortlaut (R-1.13, 14, 15).
5. **Prüfungen:**
   - `checkBeans` erweitert: Liste ↔ `katalog/` (Z-1), Gegenprobe Z-5
   - neu `tests/katalog.mjs`: lädt fehlerfrei in Chromium und WebKit, alle 4 Lagen, jede Bean geöffnet (Z-2), Grundregeln (Z-3), Versionszeile =
     `AD_VERSION` (Z-4)
6. **Reiselogbuch 3.57.8:** wird auf die Fassung 4.65.0 gehoben (Rückfrage nach 0 Nr. 10, mit dieser Frage), sonst keine Änderung.

## Prüfstufe

- `veroeffentlichen.mjs stufe --app reiselogbuch` schlägt **jetzt** ‚Stufe Text‘ vor, weil noch nichts geändert ist.
- Der Bau ändert AppDesign (`ui.js`, `tests/`, Richtlinie). Stufe Text gilt nur, wenn AppDesign unverändert bleibt (0 Nr. 2). Darum **Prüflauf voll**.

## Testfälle (User), wenn gebaut (Entwurf)

Version prüfen (/0) · Katalog am iPad quer öffnen, beide Beans ansehen · Wischaktionen am Gerät wischen (Wischgefühl) · Hinweisfenster mit langem
Dateinamen · am iPhone Startliste → Bean → Zurückwischen.
