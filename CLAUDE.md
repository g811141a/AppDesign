# AppDesign – Hinweise für Claude

**Version 2.0.0** · Stand 14.10.2026

## Zuerst lesen

1. `UEBERGABE.md` – Stand der letzten Sitzung, nächster Schritt, Chatnummer
2. `README - Zusammenarbeit allgemein.md` – Abschnitt 0 (Arbeitsprozess 2.0) hat Vorrang
3. `README - Designrichtlinie allgemein.md` (Abschnitt 14: Aufbau dieses Repos, 16: HIG-Checkliste, 17: Regelkatalog)
4. `README.md`, `CHANGELOG.md`, `BACKLOG.md`

## Verpflichtend

Alle Regeln der Zusammenarbeit allgemein gelten; die Regeln stehen nur dort (hier keine Wiederholung). Besonders:
nie ohne ausdrückliches ‚Ja‘ bauen, Fall-Liste vor jedem Bau (0 Nr. 1), Auswahlfenster mit ‚Ich schreibe im Chat‘
(0 Nr. 7), erst Prüfpunkte dann Neues, Zeit und Token am Ende jeder Antwort (Abschnitt 2).

## Technisch

- `v4/design.css` und `v4/ui.js` werden von den Apps über GitHub Pages geladen (`../AppDesign/v4/…?v=<Version>`, R-10.3).
  Änderungen in `v4/` müssen rückwärtsverträglich sein; sonst neuer Ordner `v5/`. `AD_VERSION` (ui.js) und `--ad-version`
  (design.css) steigen mit jeder AppDesign-Version.
- Prüfungen in `tests/` (Abschnitt 17); sie laufen über die Prüfskripte der Apps (AppDesign liegt neben dem App-Repo),
  z. B. im Reiselogbuch `sh tests/alle.sh`.
- Vor dem Veröffentlichen jede App testen, die die Bausteine nutzt. **Erst AppDesign, dann die App.**
- GitHub Pages: Branch `main`, Hauptordner.

## Versionsgeschichte

| Version | Datum | Inhalt |
|---|---|---|
| 2.0.0 | 14.10.2026 | Neu gefasst (A-02 Schritt 4): zuerst UEBERGABE.md, Regeln nur noch als Verweis auf die Zusammenarbeit (ohne Antwortzeile), Prüfungen und Versionskopplung |
| 1.1.0 | 10.10.2026 | Zeitmessung |
| 1.0.0 | 09.10.2026 | erste Fassung |
