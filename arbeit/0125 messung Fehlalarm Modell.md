# APD-137: Fehlalarm ‚⚠ Modell‘ in `messung.mjs` nach einem Hilfsagenten (Sitzung 0125)

**Stand 17.11.2026** · **ins Backlog übernommen als APD-137, Priorität 2 (Nutzer 17.11.2026, Sitzung 0125)**

## Befund

- In 0125 meldete `node werkzeug/messung.mjs` nach einem Abruf über den Helfer `web-fetch` (lief mit Haiku 5.5) ‚Kontext 215.416 ⚠ Modell claude-opus-5-5‘.
  Die Sitzung lief aber durchgehend mit Opus 5.5 (alle eigenen Aufrufe `claude-opus-5-5`, `get_session`: eingestellt `claude-opus-5-5`).
- Ursache (gelesen in `werkzeug/messung.mjs`): Das Werkzeug liest auch die Zeilen der Hilfsagenten (`<sitzung>/subagents/*.jsonl`). Bei der Suche nach
  dem eingestellten Modell (letzte Anlage ‚model‘, APD-130/W-5) fehlt die Bedingung `!isSidechain`. Gefunden wurde die Anlage des Helfers
  (`modelId: claude-haiku-5-5`). Die Suche nach dem letzten Aufruf hat diese Bedingung schon.
- Folge: ein Fehlalarm nach jedem Hilfsagenten mit einem anderen Modell. Ein echter Rückfall (`model_fallback`) ließe sich daneben nicht mehr erkennen.

## Vorschlag

- Korrektur: Die Anlage ‚model‘ nur aus dem Hauptstrang lesen (`!z.isSidechain`).
- Testfall (automatisch) in `tests/messung.mjs`: Sitzung mit eigenem Aufruf `claude-opus-5-5` und einem Hilfsagenten mit Anlage `claude-haiku-5-5`
  → kein ‚⚠ Modell‘. Gegenprobe: dieselbe Anlage im Hauptstrang → ‚⚠ Modell‘.
- Allgemein (betrifft alle Apps über AppDesign), nur Werkzeug und Prüfung, kein Regeltext.
- Priorität: Empfehlung **2 mittel**. Der Alarm ist irreführend, die Arbeit läuft aber weiter. Nicht in 4.60.0, weil dort schon zwei Themen
  sind (APD-30 mit APD-136, APD-133) – Sammelversionen höchstens 2 Themen (0 Nr. 8).
- Bis dahin: Nach einem Hilfsagenten prüfe ich ein ‚⚠ Modell‘ in der Sitzungsdatei nach, bevor ich es melde. Hilfsagenten rufe ich immer mit
  `model: opus` und `effort: high` auf, auch den Helfer `web-fetch`.
