# Bau-Frage AppDesign 4.65.0 mit Reiselogbuch 3.57.8

**Stand 19.11.2026** · Sitzung 0142

## Ergebnisse dieser Sitzung (alle auf `main`)

- **APD-140 Bean-Katalog:** Wortlaut R-1.13 sowie Designrichtlinie 14 und 15 freigegeben, Symbol `hand`, als allgemeine Regel festgehalten → **bereit**
- **APD-135 Paket 7 – B-3.3 Schritt 1** (Menü, Sprechblase, Fenster auf der Prüfseite, APD-135/Q-1 bis Q-10) → **bereit**
- **APD-142** (aus APD-135/J-32, Allgemeines aus der App nach AppDesign) mit Priorität 2 ins Backlog
- **APD-136:** b1–b3 für 4.66.0 geklärt (APD-136/V-1 bis V-5), `FX_SVG` kommt mit der Bean `field`

## Inhalt von 4.65.0 (2 Themen, 2 Punkte – 0 Nr. 8)

1. **APD-140 Bean-Katalog:**
   - `katalog/index.html` (Variante A), `katalog/swipeactions.js`, `katalog/hinweis.js`
   - Symbol `hand` in `ui.js`
   - Wortlaut R-1.13, 14 und 15
   - `checkBeans` vergleicht die Liste mit `katalog/`, neu `tests/katalog.mjs` (APD-140/Z-1 bis Z-5)
   - AD-Bean: keine, weil der Katalog die Beans nur zeigt
2. **APD-135 Paket 7, B-3.3 Schritt 1:**
   - Teile `menue`, `sprechblase` und `fenster` auf der Prüfseite, mit Gegenprobe
   - danach fallen `checkMehrKnopf` und `checkWachsen` in `ablauf-markierung-menues` weg
   - AD-Bean: keine (nur Prüfungen)
3. **Reiselogbuch 3.57.8:** wird auf die Fassung 4.65.0 gehoben, sonst keine Änderung (Rückfrage 0 Nr. 10).

**Prüflauf: voll.** Der Bau ändert AppDesign (`ui.js`, `tests/`, Richtlinie), Stufe Text ist damit ausgeschlossen (0 Nr. 2). Laut AppDesign-`CLAUDE.md`
dauert ein voller Lauf rund 75 Minuten.

## Wo bauen?

- Der Kontext steht bei rund 218.000 (`messung.mjs`). Ab etwa 300.000 übergibt Claude, aber nie mitten in einem Bau (0 Nr. 13).
- Der Bau (Katalog mit 2 Bean-Dateien, 2 Prüfdateien, 3 Teile auf der Prüfseite, Texte, Prüflauf) braucht viel Kontext. Wie viel, weiß ich nicht.
  Vermutung: mehr als die 80.000, die bis zur Grenze bleiben.
- **Empfehlung:** Jetzt übergeben und in **Reiselogbuch 0143** mit frischem Kontext bauen. Die Bau-Frage gilt dann als beantwortet: Die neue Sitzung baut
  ohne erneute Frage.
