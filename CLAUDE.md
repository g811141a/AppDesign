# AppDesign – Hinweise für Claude

**Version 1.0.0** · Stand 09.10.2026

## Verpflichtend

Es gelten alle Regeln aus `README - Zusammenarbeit allgemein.md` – insbesondere: nie ohne
ausdrückliches „Ja“ bauen, Sammelversionen, erst Prüfpunkte dann Neues, Fragen im Auswahlfenster
mit Antwortzeile, Apple-Abgleich vor jedem Muster.

## Zuerst lesen

1. `README - Zusammenarbeit allgemein.md`
2. `README - Designrichtlinie allgemein.md` (Abschnitt 14: Aufbau dieses Repos, Abschnitt 16: HIG-Checkliste)
3. `README.md`, `CHANGELOG.md`, `BACKLOG.md`

## Technisch

- `v4/design.css` und `v4/ui.js` werden von den Apps über GitHub Pages geladen
  (`../AppDesign/v4/…`). Änderungen in `v4/` müssen rückwärtsverträglich sein; sonst neuer Ordner `v5/`.
- Vor dem Veröffentlichen jede App testen, die die Bausteine nutzt (ihr Prüfskript bindet
  `tests/hig.mjs` ein; AppDesign liegt dazu neben dem App-Repo). **Erst AppDesign, dann die App.**
- GitHub Pages: Branch `main`, Hauptordner.

## Versionsgeschichte

| Version | Datum | Inhalt |
|---|---|---|
| 1.0.0 | 09.10.2026 | erste Fassung |
