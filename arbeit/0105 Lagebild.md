# Lagebild – Reiselogbuch 0105

08.11.2026 · Quelle: UEBERGABE.md, beide BACKLOG.md, get_session, Sitzungsdatei

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.54.0** veröffentlicht (Fassung 4.56.0) |
| AppDesign | **4.56.0** veröffentlicht |
| Zusammenarbeit allgemein | **3.10.0** (3.11.0 mit APD-125 bestätigt, kommt mit 4.57.0) |
| AppDesign-`CLAUDE.md` | **2.11.0** |

## Modell, Aufwand, Umgebung

- Modell **Opus 5.5** (`get_session`)
- Aufwand **hoch** – Umgebungsvariable `high`, alle Aufrufe `"effort":"high"`
- kein `model_fallback` in dieser Sitzung
- `~/.claude/settings.json` = `{}` – **keine Hooks**
- ReiseLogBuch geklont, Verweise angelegt, Tests eingerichtet; Probelauf ‚RLB-120 Muster prüfen‘: Chromium und WebKit grün

## Offener Usertest

- **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0): ok bis auf **P-100/1** (Verlauf-Vorschläge) → RLB-123, kommt mit 3.55.0

## Nächste Version – bereit

- **AppDesign 4.57.0** (6): APD-125 Datei vor jeder Kachel · APD-126 Cursor am Ende, leer einzeilig · APD-127 Gleitbewegungen · APD-124 Rückgängig im Feld · APD-116 Dateiname im Hinweisfenster · RLB-122-Teil
- **Reiselogbuch 3.55.0** (2): RLB-123 · RLB-122
- **RLB-120** fast fertig (fehlt W-8, B-11, ‚bereit‘)

## Offen im Backlog

RLB-121 · RLB-6 · APD-62 Rest · APD-30 Rest · APD-44 bis APD-59 (später)

## Heute vor

1. RLB-120 abschließen
2. Bau-Frage 4.57.0 / 3.55.0 – bisher keine Bau-Freigabe
