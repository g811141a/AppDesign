# Lagebild – AppDesign 0001 (APD-149 Muster im Bean-Katalog)

**26.11.2026** · Thema: **APD-149 Framework mit Steuer-Bean** – Muster als Entwurf im Bean-Katalog (W-1). Die Kette RLB-126 läuft parallel.

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| Reiselogbuch | 3.58.5 | `APP_VERSION` in `index.html` |
| AppDesign | 4.70.2 | `AD_VERSION` in `v4/ui.js` |
| Zusammenarbeit allgemein | 3.19.0 | gelesen |
| `CLAUDE.md` AppDesign | 2.14.0 | gelesen |

- ReiseLogBuch-Import ist nicht dazugeholt. Für das Muster brauche ich es nicht.

## Offene Usertests

- **keine** (AppDesign-Backlog Abschnitt 1 leer, Übergabe).

## Backlog-Spitze AppDesign

- 0. Nächste Version: 0 Punkte bereit.
- Prio 1: APD-135, APD-136, **APD-149 (dieses Thema)**, APD-148.
- Prio 2: APD-139, APD-141, APD-142, APD-145, APD-150.
- Prio 3: APD-70, APD-147.
- Reiselogbuch: RLB-126 (‚Zuletzt gelöscht‘) wird in 4.x gebaut und zieht mit `v5/` um (Nutzer 26.11.2026). Danach RLB-6.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`claude-opus-5-5`). Eingestellt (`session_context.model`) und tatsächlich (`last_served_model`) gleich.
- **Aufwand:** hoch – eingestellt (`effort_level`) und tatsächlich (`"effort":"high"` in der Sitzungsdatei) gleich.
- **Kein `model_fallback`:** In der Sitzungsdatei steht kein solcher Eintrag. Die Treffer sind nur Text aus dem Starttext.
- `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt.
- **Nutzungsgrenze:** five_hour · allowed (keine Überziehung).
- **Hilfsagenten:** nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch). Fable 5.2 vorerst nicht.

## Arbeitsumgebung

- **Hooks:** keine. `~/.claude/settings.json` enthält nur die Regel ‚`create_session` erlauben‘.
- **Repos:** AppDesign und ReiseLogBuch nebeneinander, Verweise `appdesign` und `reiselogbuch`, beide angemeldet (`register_repo_root`).
- **Tests eingerichtet:**
  - Playwright 1.56.1 in `ReiseLogBuch/tests`. `package.json` und `package-lock.json` sind gelöscht.
  - Chromium 158 (Ordner 1243, Verweise 1194 → 1243) und WebKit 26.0 starten.
  - Probelauf `bean-katalog` (Chromium): **alles in Ordnung**.
- 4 Kerne.

## Nächster Schritt (nach `arbeit/APD-149 Uebergabe.md` Abschnitt 3)

1. Wortlaut alt und neu für Designrichtlinie 14 (Beans im Entwurf im Bean-Katalog, dazu `checkBeans`). Danach frage ich ‚Ja/Nein‘ (0 Nr. 29).
2. Erst nach ‚Ja‘:
   - heutiges Verhalten im Reiselogbuch prüfen (H-6) und Apple-Abgleich
   - `katalog/entwurf/presentation-commands.js`
   - S-1 bis S-15 automatisch prüfen
   - Bericht
