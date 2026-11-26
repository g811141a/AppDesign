# Lagebild – Sitzung Reiselogbuch 0165

**26.11.2026** · Thema: **APD-149 Framework mit Steuer-Bean** (Konzept, Recherche, Austausch – kein Bau)

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | 3.58.5 (laut `UEBERGABE.md`) |
| AppDesign | 4.70.2 (Backlog-Kopf, `UEBERGABE.md`) |
| ReiseLogBuch-Import | 1.4.0 (laut `UEBERGABE.md`) |
| Zusammenarbeit allgemein | 3.19.0 (gelesen) |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Chatnummer:** Sitzung 0164 hat den Usertest P-125 abgeschlossen (Commit 9ea6435, `arbeit/0164 Lagebild.md`) ohne neue Übergabe – diese Sitzung ist **0165**.
- Die App-Repos sind **nicht** dazugeholt und die Tests nicht eingerichtet: für die Konzeptarbeit nicht nötig (Thema ohne Eingriff in die Apps). Hole ich nach, sobald ich App-Code lesen muss.

## Offene Usertests

- **keine** – P-122 bis P-125 erledigt (P-125 alles ok, Sitzung 0164).

## Backlog-Spitze AppDesign

- 0. Nächste Version: 0 Punkte bereit.
- Prio 1: APD-135, APD-136, **APD-149 (dieses Thema)**, APD-148 · Prio 2: APD-139, APD-141, APD-142, APD-145 · Prio 3: APD-70, APD-147.
- **Offene Frage aus 0163:** `aria-expanded` fehlt nach Neuaufbau bei offenem Menü (R-1.8) – ins Backlog? Passt inhaltlich genau zu APD-149 (Zustand folgt aus dem Stapel); frage ich separat.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`) – eingestellt (`session_context.model`) und tatsächlich (`last_served_model`); kein `model_fallback` in der Sitzungsdatei (die Treffer sind nur Text aus `UEBERGABE.md`).
- **Aufwand:** **mittel** – eingestellt (`effort_level: medium`) und tatsächlich (`"effort":"medium"` in allen 8 Modell-Aufrufen). `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
  ⚠ **Abweichung zu 0163/0164 (hoch).** Grund: Dieser Chat wurde mit Aufwand mittel gestartet. Für Recherche und Konzept empfehle ich **`/effort high`** – du stellst es um, ich kann es nicht.
- **Hilfsagenten:** Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 nicht (Festlegung 0122).
- **Nutzungsgrenze:** five_hour · allowed (`rate_limit_info`).
- **Hooks:** keine; `~/.claude/settings.json` enthält nur die Regel `create_session` erlauben.

## Plan für das Thema (aus `arbeit/0162 Framework Steuer-Bean Ideen.md`)

1. **Recherche mit Quellen**, Hilfsagenten einzeln nacheinander:
   a. Apple UIKit: `present`/`dismiss`, `UIPresentationController`, `sourceItem`, `UIMenu`/`UIAction`/`UICommand`, Responder-Kette.
   b. SwiftUI: `NavigationStack`, `.sheet`, `.popover`, `.alert`, Zustand → Anzeige; HIG ‚Modality‘, ‚Menus‘, ‚Popovers‘.
   c. Web-Plattform in Safari iPad/iPhone: `<dialog>`, Popover-API, `commandfor`/`command`, Anker-Positionierung, `inert`, `closedby`.
   d. Zustandsautomaten (Statecharts, XState) und Datenfluss in eine Richtung.
   e. iOS-artige Web-Frameworks (z. B. Ionic, Framework7, Konsta UI, Onsen UI): was sie zentral steuern (Overlay-Stapel, Navigation).
2. **Befund heute** in `v4/ui.js`: wer setzt Tönung, Freigabe, Fokus, Lage – Stellen zählen.
3. **2–3 Varianten** für die Steuer-Bean und das Befehlsmodell, mit ‚So macht es Apple‘ – Austausch mit dir in Runden.
4. Danach Grobentwurf mit Testfall-Liste → erst dann `v5/` (nur nach deinem ‚Ja‘).
