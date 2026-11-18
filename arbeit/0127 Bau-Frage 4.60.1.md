# Bau-Frage AppDesign 4.60.1 mit Reiselogbuch 3.57.1

**Stand 18.11.2026** · Sitzung 0127

## APD-134 Lasttest – Ergebnis

- 2 Runden × 4 gleichzeitig `PRUEF_BROWSER=webkit node tests/ablauf-markierung-menues.mjs` (Zweig, ReiseLogBuch 7c437d5):
  **8 von 8 grün** (‚alles in Ordnung‘, Exit 0). Vorher (0126): je 1 von 8 rot.
- Die R-3.1-Abweichung (Antippfläche `DarstellungAutomatisch` 323×44) trat **nicht** auf.
- Damit gehört das Nachfassen (bis 5 s) in den Bau.

## Inhalt des Baus

| Nr. | Was | Wo |
|---|---|---|
| P-107/F-1 bis F-4 | Wischaktionen: Kapseln nacheinander von außen, wachsen aus dem frei werdenden Platz, zurück umgekehrt, nie über ihren Platz; ‚Bewegung reduzieren‘ nur Einblenden; Kapseln 66 × 44 mal Textgröße, Symbol mitwachsend; Prüfungen W-81 bis W-90; Wortlaut R-7.8, 15.4, R-1.13 | AppDesign `v4/ui.js`, `v4/design.css`, `tests/ablauf.mjs`; ReiseLogBuch `tests/ablauf-wischen.mjs` |
| APD-137 | `messung.mjs` übergeht die Anlage ‚model‘ der Hilfsagenten (kein Fehlalarm ‚⚠ Modell‘) | AppDesign `werkzeug/messung.mjs`, `tests/messung.mjs` |
| APD-134 | `ablauf-markierung-menues` fasst die Kachel nach dem Drehen bis 5 s nach | ReiseLogBuch `tests/ablauf-markierung-menues.mjs` |

- **Stufe: voll** – AppDesign (`v4/`) ändert sich, Stufe Text ist damit ausgeschlossen (0 Nr. 2); das Skript bestätigt es mit `stufe` vor `los`.
- Ablauf: Vorbereitungs-Zweige auf `claude/upbeat-johnson-spcqz3`, `vorbereiten --ad 4.60.1 --app reiselogbuch=3.57.1`, CHANGELOG mit Testfällen P-108,
  Backlog, `fassung`, Commit, `stufe`, `los` (~60 min).

## Usertest danach: P-108 (Entwurf der Testfälle)

/0 Version prüfen · Aufwischen nacheinander · Zurückwischen umgekehrt, nichts über die Seitenleiste · ‚Bewegung reduzieren‘ nur Einblenden ·
größte Textgröße: Kapseln größer.

## Offene Usertests

- **P-107** (Reiselogbuch 3.57.0, AppDesign 4.60.0) mit P-107/F-1 bis F-4 – wird mit diesem Bau durch P-108 abgelöst.
