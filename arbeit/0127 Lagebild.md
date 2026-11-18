# Lagebild – Reiselogbuch 0127

**Stand 18.11.2026** · Thema: Bau AppDesign 4.60.1 mit Reiselogbuch 3.57.1 (P-107, APD-137, APD-134)

## Versionen

| Teil | Stand |
|---|---|
| Reiselogbuch | **3.57.0** veröffentlicht (`main` e0eaf16, `APP_VERSION` 3.57.0, lädt `fassung/4.60.0`) |
| AppDesign | **4.60.0** veröffentlicht (`main` b9157cf, `AD_VERSION` 4.60.0) |
| Arbeit aus 0126 | Zweig `claude/upbeat-johnson-spcqz3` – AppDesign 256ad0e, ReiseLogBuch 7c437d5 (nicht gebaut) |
| ReiseLogBuch-Import | c747fee (‚1.3.0‘) |
| Zusammenarbeit allgemein | 3.14.1 · AppDesign-`CLAUDE.md` 2.12.0 |

## Offene Usertests

- **P-107** (Reiselogbuch 3.57.0, AppDesign 4.60.0) mit den Fehlern **P-107/F-1 bis F-4** – behoben auf dem Zweig (Wischaktionen nacheinander von außen,
  zurück umgekehrt, ‚Bewegung reduzieren‘ nur Einblenden, Kapseln wachsen mit der Textgröße), Wortlaut P-107/V-1 bis V-3 bestätigt; Bau steht aus.

## Backlog-Spitze

- AppDesign: 0. Nächste Version leer (die Punkte stehen als Fehlerbehebung P-107 und als APD-137, APD-134 in ‚2.‘);
  APD-135 (Konsolidierung 3, Prio 1), APD-136 (AD-Beans, Prio 1), APD-137 (Prio 2, behoben auf dem Zweig), APD-134 (Prio 3, Ursache gefunden).
- Reiselogbuch: 0. Nächste Version leer.

## Modell, Aufwand, Umgebung

- **Modell:** Opus 5.5 (`get_session`: eingestellt `claude-opus-5-5`, zuletzt bedient `claude-opus-5-5`); Sitzungsdatei 18 Aufrufe Opus 5.5,
  **kein `model_fallback`**.
- **Aufwand:** eingestellt **mittel** (`effort_level`), tatsächlich **mittel** (18 × `"effort":"medium"`), `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** 5-Stunden-Fenster **‚allowed‘**, keine Überziehung.
- **Hooks:** `~/.claude/settings.json` ist leer (`{}`).
- **Repos und Tests:** ReiseLogBuch (Zweig ausgecheckt) und ReiseLogBuch-Import geklont, Verweise klein angelegt, Playwright 1.56.1 installiert
  (package-Dateien gelöscht), Chromium-Verweise 1194 → 1243 gesetzt; WebKit 2215 vorhanden; 4 Kerne.
- **Kontext:** 130.203 (vor dieser Antwort).

## Nächste Schritte (UEBERGABE.md Abschnitt 3)

1. **APD-134 Lasttest:** 4 × `PRUEF_BROWSER=webkit node tests/ablauf-markierung-menues.mjs` gleichzeitig, zweimal; R-3.1-Abweichung beobachten.
2. **Bau-Frage AppDesign 4.60.1 mit Reiselogbuch 3.57.1** (voll): P-107/F-1 bis F-4, APD-137, APD-134.
3. Usertest **P-108**, danach **APD-135 Pakete 1 und 3**.

Vereinbarung: Muster bis auf Weiteres nur hell. Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln; Fable 5.2 vorerst nicht.
