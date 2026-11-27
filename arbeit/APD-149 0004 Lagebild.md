# Lagebild – Sitzung ‚AppDesign 0004 – APD-149 Funde klären‘

**27.11.2026** · Auftrag: die Funde aus `arbeit/APD-149 0002 Bericht Muster.md` und APD-151 klären, je Fenster eines (Übergabe `arbeit/APD-149 Uebergabe.md` Abschnitt 3).

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | 3.59.0 (`APP_VERSION` in `index.html`) |
| AppDesign | 4.71.0 (`AD_VERSION` in `v4/ui.js`) |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Chatnummer:** diese Sitzung AppDesign 0004, die nächste AppDesign 0005.
- **Stand `main`:** `4b922dd` von Reiselogbuch 0168 (15:00 UTC): Usertest P-126 ok, APD-152 bereit. Ich arbeite auf diesem Stand.
- **Parallel:** Die Kette Reiselogbuch (0168) hat APD-152 als Korrekturversion vorbereitet (Wortlaut freigegeben). Vor jedem Commit hole ich `main` neu.

## Modell, Aufwand, Grenze, Hooks

- **Modell:** Opus 5.5 (`claude-opus-5-5`), eingestellt und tatsächlich gleich (`get_session`: `session_context.model` = `last_served_model`).
- **Aufwand:** eingestellt **hoch** (`effort_level` = `high`); tatsächlich hoch (Sitzungsdatei: 15 von 15 Modell-Aufrufen `high`).
- **Rückfall:** kein `model_fallback` in der Sitzungsdatei (das Wort steht nur im Starttext).
- **`CLAUDE_CODE_EFFORT_LEVEL`:** ungesetzt.
- **Nutzungsgrenze:** five_hour · allowed, ohne Überziehung; setzt am 27.11.2026 um 20:20 Uhr zurück.
- **Hooks:** keine. `~/.claude/settings.json` erlaubt nur `create_session`.

## Prüfumgebung

- ReiseLogBuch geklont (`7723935`), Verweise `appdesign` und `reiselogbuch` angelegt und angemeldet.
- Playwright 1.56.1 in `ReiseLogBuch/tests` installiert, `package.json` und `package-lock.json` gelöscht.
- 4 Kerne. Chromium 158.0.8127.36 (Ordner 1243, Verweise 1194 → 1243), WebKit 26.0 (Ordner 2215). Beide Browser starten.
- `lauf-selbsttest`: alles in Ordnung.

## Offene Usertests

- **Keine.** P-126 (Reiselogbuch 3.59.0 / AppDesign 4.71.0) ist ‚alles ok‘ (Nutzer 27.11.2026, Sitzung 0168, Backlog Reiselogbuch ‚Erledigt‘).

## Backlog AppDesign

- **Nächste Version:** 2 Punkte bereit (APD-149/J-1 Beans im Entwurf im Bean-Katalog; APD-152 Korrektur Wiederherstellen behält Zeitpunkte).
- **Offen, Priorität 1:** APD-135, APD-136, APD-149, APD-148, APD-151.
- **Priorität 2:** APD-139, APD-141, APD-142, APD-145, APD-150.
- **Priorität 3:** APD-70, APD-147.

## Plan dieser Sitzung (Übergabe Abschnitt 3)

Je Fenster ein Fund:

1. **R-1.4 und der Durchlass (APD-149/H-6, J-3):** Ergänzung ‚außer der Leiste der Quelle‘ in R-1.4 und `hig.mjs` – Wortlaut alt/neu jetzt vorlegen oder auf den Bau der Beans verschieben.
2. **Escape am Fenster in v4:** erst prüfen, ob v4 selbst betroffen ist (0 Nr. 27), dann ggf. ins Backlog.
3. **Listen-Ebene (RLB-126):** Vorschlag, sie bleibt bei der Navigation (`navVor`, `navZurueck`), kein Eintrag im Stapel.
4. **APD-151** (Priorität 1): Muster mit Stufen am iPhone im Entwurf (`presentation`, Art `sheet`) oder erst mit `v5/`.

Danach (Übergabe Abschnitt 3 Nr. 3): die neuen Schnittstellen-Teile bestätigen lassen (`commands.toolbar`, `items`, `context`, Optionen `from`, `dirty`, `align`, Ereignis `reject`).

Nächste Version AppDesign: 2 Punkte bereit (APD-149/J-1, APD-152). Offen im Backlog: APD-135, APD-136, APD-149, APD-148, APD-151 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150 (Prio 2) · APD-70, APD-147 (Prio 3).
