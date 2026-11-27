# Backlog Reiselogbuch – was ansteht (Sitzung AppDesign 0005)

**27.11.2026** · gelesen: `ReiseLogBuch/BACKLOG.md` auf `main` (052f5db, bis ‚Erledigt‘). Version Reiselogbuch 3.59.0 · AppDesign 4.71.0.

| Abschnitt | Inhalt |
|---|---|
| 0. Nächste Version | leer, 0 Punkte bereit |
| 1. Auf iPad und iPhone prüfen | leer, keine offenen Usertests |
| 2. In Klärung | **RLB-128** (Prio 1, neu aus Reiselogbuch 0169), **RLB-6** (Prio 3) |
| 3. Später | nur der Hinweis auf AppDesign |

**RLB-128 – Seitenleiste springt beim Drehen zum gewählten Eintrag** (Prio 1, offen, nur Reiselogbuch):
- **Fund:** Nach dem Neuaufbau beim Drehen rollt `keepSideScroll` den gewählten Eintrag ins Bild. Ist er weggerollt, springt die Liste.
  - Gemessen mit 3.59.0 in Chromium und WebKit: `scrollTop` 400 → 39, in ‚Zuletzt gelöscht‘ 400 → 48.
  - Ein offenes Kontextmenü bleibt dann ohne sichtbare Kachel stehen. Das verstößt gegen R-8.1 und Designrichtlinie 15.6.
- **Vorschlag:** Beim Drehen bleibt die Liste stehen. Ins Bild gerollt wird nur, wenn sich die Auswahl geändert hat.
- **Apple-Abgleich:** Die HIG ‚Layout‘ verlangt, dass alles beim Drehen vertraut bleibt. Zur Rollposition steht dort nichts. Wie Notizen und Mail es halten, zeigt nur das Gerät.
- **Freigabe:** Eine reine App-Version ist trotz der Vorgabe erlaubt (du, Sitzung 0169, im Fenster). Die Prüfung dazu steht in AppDesign APD-154 (T-6 bis T-8, T-11).

**RLB-6 – Ausschreibungstexte in Reiselogbücher umwandeln** (Prio 3, offen): Reiseprogramme von Veranstaltern werden zu Reiselogbüchern, für erledigte und für geplante Reisen.
Übernommen werden Titel, Zeitraum, Reisemittel, das Programm je Tag mit echtem Datum und die Quartiere.

**Wer daran arbeitet:** Die Kette Reiselogbuch (0169) arbeitet an APD-154 und RLB-128. Diese Sitzung ändert dort nichts.
