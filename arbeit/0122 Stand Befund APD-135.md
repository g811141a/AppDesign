# Stand Befund APD-135 – Reiselogbuch 0122

**Stand 17.11.2026, 07:00 UTC**

## Fertig und gesichert

- **Befund 1 von 5 – Prüfungen gegen Katalog:** `arbeit/APD-135 Befund C Prüfungen.md` (C-1 bis C-68) und
  `arbeit/APD-135 Befund C Tabelle.json`, auf `main` (Commit d6924cf), `doku-regeln` vorher grün.

| Vorgeschlagene Stufe | Läufe | Rechenzeit | Wandzeit (gerechnet, nicht gemessen) |
|---|---|---|---|
| ‚immer‘ | 6 | 2,6 min | 2:30 |
| ‚App‘, Schritt 1 | 150 | 272,1 min | 70:37 |
| ‚App‘, Schritt 2 (erst nach Gegenprobe) | 130 | 244,4 min | 62:45 |
| ‚Baustein‘ | 160 (= voll) | 286,8 min | 74:14 |

## Unterbrochen

- **Befund 2 von 5 – Bausteine in `ui.js`:** der Hilfsagent (Opus 5.5) brach nach wenigen Minuten ab: ‚You've hit your weekly limit ·
  resets Nov 19, 7am (UTC)‘. Gesichert ist nur der Anfang (Kopf und Hilfsdateien im Notizordner), noch kein Befund.
- Davor: der erste Hilfsagent (Fable 5.2) brach zweimal ab – an der 5-Stunden-Grenze und dann ‚You've hit your Fable limit · resets
  Nov 19, 7am (UTC)‘.
- `get_session` zeigt für diese Sitzung jetzt `rate_limit_info`: Art ‚five_hour‘, Status ‚allowed‘, Rücksetzung 17.11.2026 12:00 UTC.
  Ob die Wochengrenze auch diese Sitzung selbst stoppt, weiß ich nicht – die Hilfsagenten hat sie gestoppt.

## Modell und Kontext

- Modell jetzt **Opus 5.5** (`claude-opus-5-5`, von dir mit `/model` umgestellt; eingestellt war Fable 5.2), Aufwand hoch.
- Kontext 219.511 – Übergabe fällig ab 300.000.

## Was noch fehlt

Befunde 2 bis 5 (Bausteine · Arbeitsregeln · Designregeln · Ablage), danach die Datei ‚APD-135 Konsolidierung 3 Befund und Plan‘ und die
Bau-Frage für AppDesign 4.60.0 mit Reiselogbuch 3.57.0.

## Möglichkeiten

- **a) Übergabe jetzt, neue Sitzung ab 19.11.2026 07:00 UTC** – die Wochengrenze ist dann zurückgesetzt, die neue Sitzung beginnt mit
  vollem Platz und setzt mit Befund 2 fort.
- **b) Ich lese selbst weiter, ohne Hilfsagenten** – solange diese Sitzung nicht gestoppt wird; der Kontext wächst schnell (allein
  `ui.js` hat über 3.000 lange Zeilen), die Übergabe käme bald.
- **c) Erst die Bau-Frage 4.60.0** (APD-30, APD-133) – ein Bau mit vollem Prüflauf braucht aber ebenfalls viel Kontingent.

Offene Usertests: keine.
