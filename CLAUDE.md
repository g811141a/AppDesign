# AppDesign – Hinweise für Claude

**Version 2.5.0** · Stand 20.10.2026

## Zuerst lesen (gezielt, Zusammenarbeit 0 Nr. 15)

1. `UEBERGABE.md` – Stand der letzten Sitzung, nächster Schritt, Chatnummer
2. `README - Zusammenarbeit allgemein.md` – nur Abschnitte 0 (Arbeitsprozess 2.0, hat Vorrang) und 1 (Sprache und Ton: per du)
3. `README - Designrichtlinie allgemein.md` – nur die Überschriften (`grep -n '^##'`); Abschnitte (14: Aufbau dieses Repos,
   16: HIG-Checkliste, 17: Regelkatalog), `README.md`, `CHANGELOG.md` und `BACKLOG.md` erst, wenn die Aufgabe sie braucht

## Verpflichtend

**Startfrage (Zusammenarbeit 0 Nr. 19):** Beginnt die Sitzung ohne konkreten Auftrag, zuerst das Auswahlfenster
‚Was möchtest du als Nächstes tun?‘ mit je einer Möglichkeit pro angehängtem Repo (Version, Backlog-Spitze).

Alle Regeln der Zusammenarbeit allgemein gelten; die Regeln stehen nur dort (hier keine Wiederholung). Besonders:
nie ohne ausdrückliches ‚Ja‘ bauen, Fall-Liste vor jedem Bau (0 Nr. 1), Auswahlfenster mit ‚Ich schreibe im Chat‘
(0 Nr. 7), erst Prüfpunkte dann Neues, Zeit und Token am Ende jeder Antwort mit `node werkzeug/messung.mjs` (Abschnitt 2).

## Technisch

- Feste Fassung (seit 4.14.0, R-10.3): jede Version liegt unveränderlich in `fassung/X.Y.Z/` (`design.css`, `ui.js`,
  `tests/`, Designrichtlinie und Zusammenarbeit dieser Version, Prüfsummen `fassung/PRUEFSUMMEN`); jede App lädt genau ihre Fassung
  (`../AppDesign/fassung/X.Y.Z/…`) und wird nur nach Rückfrage gehoben. `v4/` ist der Arbeitsstand (= neueste Fassung);
  Hauptversion → neuer Ordner `v5/`. Nach Änderungen an `v4/` oder `tests/` vor dem Veröffentlichen
  `node werkzeug/veroeffentlichen.mjs fassung`. `AD_VERSION` (ui.js) und `--ad-version`
  (design.css) steigen mit jeder AppDesign-Version.
- Prüfungen in `tests/` (Abschnitt 17); während der Arbeit nur die betroffenen, der volle Lauf genau einmal im
  Veröffentlichungs-Skript (Zusammenarbeit 0 Nr. 2); sie laufen über die Prüfskripte der Apps (AppDesign liegt neben dem App-Repo),
  z. B. im Reiselogbuch `sh tests/alle.sh`.
- Veröffentlichen mit `node werkzeug/veroeffentlichen.mjs vorbereiten --ad X.Y.Z --app <app>=X.Y.Z`, Texte schreiben,
  committen, dann `… los` (prüft, alle Tests der App, **erst AppDesign, dann die App**, wartet auf Pages).
- GitHub Pages: Branch `main`, Hauptordner.

## Versionsgeschichte

| Version | Datum | Inhalt |
|---|---|---|
| 2.5.0 | 20.10.2026 | Zu Beginn Abschnitte 0 und 1 der Zusammenarbeit (Sprache und Ton: per du) – Zusammenarbeit 2.14.0 |
| 2.4.0 | 16.10.2026 | Zeile Zeit und Token mit `werkzeug/messung.mjs` (A-12) |
| 2.3.0 | 16.10.2026 | Startfrage zu Beginn einer Sitzung ohne Auftrag (Zusammenarbeit 0 Nr. 19) |
| 2.2.0 | 15.10.2026 | Gezielt lesen (nur Abschnitt 0 und Überschriften), ein voller Prüflauf je Version (A-07) |
| 2.1.1 | 14.10.2026 | Fassung enthält Designrichtlinie und Zusammenarbeit statt Git-Markierung (aus der Cloud gesperrt) |
| 2.1.0 | 14.10.2026 | Feste Fassung `fassung/X.Y.Z/` statt `v4/…?v=` (A-05 Version B, W-4), Veröffentlichungs-Skript |
| 2.0.0 | 14.10.2026 | Neu gefasst (A-02 Schritt 4): zuerst UEBERGABE.md, Regeln nur noch als Verweis auf die Zusammenarbeit (ohne Antwortzeile), Prüfungen und Versionskopplung |
| 1.1.0 | 10.10.2026 | Zeitmessung |
| 1.0.0 | 09.10.2026 | erste Fassung |
