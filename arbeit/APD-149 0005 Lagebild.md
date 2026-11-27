# Lagebild – Sitzung AppDesign 0005 (APD-151 Muster Stufen am iPhone)

**27.11.2026** · gelesen: `arbeit/APD-149 Uebergabe.md`, `UEBERGABE.md` (nur Lagebild), die ganze Zusammenarbeit allgemein 3.19.0, die Überschriften der Designrichtlinie,
`arbeit/APD-149 0004 Stand.md`, `… 0004 APD-151 Wie weiter.md`, `… 0003 Schritt 15 und Blatt iPhone.md`, Backlog-Kopf.

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | 3.59.0 (`main` 7723935) |
| AppDesign | 4.71.0; auf `main` seither nur Arbeitsdateien, Backlog und ein Kommentar im Entwurf (zuletzt 95e6f0a) |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

## Sitzung

- **Chatnummer:** AppDesign 0005, die nächste heißt AppDesign 0006.
- **Modell:** Opus 5.5 (`claude-opus-5-5`), eingestellt und tatsächlich gleich (`get_session`, Sitzungsdatei); kein `model_fallback`.
- **Aufwand:** hoch – eingestellt (`effort_level` high) und tatsächlich (`"effort":"high"` in allen Modell-Aufrufen der Sitzungsdatei) gleich; `CLAUDE_CODE_EFFORT_LEVEL` ist nicht gesetzt.
- **Nutzungsgrenze:** seven_day · **allowed_warning** (Warnstufe, noch erlaubt), setzt am 03.12.2026 um 07:00 UTC zurück; keine Überziehung.
- **Hooks:** keine – `~/.claude/settings.json` erlaubt nur `create_session`.
- **Prüfumgebung:** 4 Kerne, ReiseLogBuch geklont, Playwright 1.56.1 im Ordner `ReiseLogBuch/tests`, Chromium 158 (Verweise 1194 → 1243) und WebKit 26.0 starten.
- **Kontext:** 137.737 (`messung.mjs`).

## Offene Usertests

Keine (P-126 alles ok, Sitzung Reiselogbuch 0168).

## Backlog-Spitze

- **Nächste Version AppDesign (mit `v5/`):** 3 Punkte bereit (APD-149/J-1, APD-152, APD-153).
- **Offen, Priorität 1:** APD-135, APD-136, APD-149, APD-148, APD-151, APD-154.

## Parallel

- Die Kette Reiselogbuch schreibt bis `v5/` in AppDesign nur ins Backlog (Vorgabe vom 27.11.2026). Ob Reiselogbuch 0169 das übernommen hat, prüfe ich als ersten Arbeitsschritt.
- **Nachtrag (Nachricht von AppDesign 0004, nach dem Start dieser Sitzung):** Reiselogbuch 0168 hat die Vorgabe bestätigt und an Reiselogbuch 0169 weitergeleitet.
  0169 pflegt jetzt `UEBERGABE.md`. Auf `main` steht das in `arbeit/APD-149 Uebergabe.md` Abschnitt 2 (588cacc, gelesen).

## Als Nächstes (nach `arbeit/APD-149 Uebergabe.md` Abschnitt 3)

1. Prüfen, ob die Kette Reiselogbuch die Vorgabe übernommen hat, und die 3 Fehler in `doku-regeln`.
2. **APD-151 Stufen am iPhone:** Apple-Abgleich, Vorschlag zur Schnittstelle (`detents`, Griff), Testfall-Liste, dann das Muster im Entwurf mit festen Prüfungen und Ausprobieren am Gerät.
