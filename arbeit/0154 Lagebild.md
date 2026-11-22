# Lagebild – Reiselogbuch 0154

**Stand 22.11.2026** · Sitzung ‚Reiselogbuch 0154 – P-120 Korrekturen (F-1 bis F-4)‘

| Teil | Version |
|---|---|
| Reiselogbuch | **3.58.0** veröffentlicht (`main` db718f3 – nach ea502c7 nur Backlog) |
| AppDesign | **4.68.0** veröffentlicht (`main` 9d38d95 – nach bc4ac5e nur Bericht, Backlog, Arbeitsdateien, Übergabe) |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03), unverändert |
| Zusammenarbeit allgemein | **3.19.0** |
| `CLAUDE.md` | AppDesign **2.14.0** · Reiselogbuch 3.10.0 · Import 1.2.0 |

## Offene Usertests

- **P-120** (Reiselogbuch 3.58.0, AppDesign 4.68.0, RLB-125 Reiselogbuch sperren): **nicht ok** (Rückmeldung 22.11.2026) –
  P-120/F-1 bis F-4, alle übrigen Testfälle ok.

## Backlog-Spitze

- **Reiselogbuch, 0. Nächste Version:** 0 Punkte bereit, 4 in Klärung aus P-120 (Korrekturversion vor allem Neuen, 0 Nr. 8, 22):
  - **P-120/F-1** (Prio 1, allgemein): Text außerhalb von Eingabefeldern auswählbar (Lupe, Markierung in der Backup-Kachel) –
    neue allgemeine Regel nötig.
  - **P-120/F-2** (Prio 1): Sperren einer Kachel weiter oben springt ans Ende der Liste – gesperrtes/entsperrtes Reiselogbuch soll
    aktiv werden und angezeigt bleiben.
  - **P-120/F-3** (Prio 2): ‚Ausgabe V…‘ zählt nach abgebrochenem Sichern hoch – offen: PDF (Drucken) meldet kein Ergebnis.
  - **P-120/F-4** (Prio 2): Hinweis ‚gesperrt‘ rollt weg, Kopfzeile bleibt – Vorschlag: ausblendbar, beim nächsten Öffnen wieder da.
- **AppDesign, 0. Nächste Version:** 1 Punkt bereit – APD-146 (Icon-Zeile Sperren/Entsperren).
- Offen: APD-135, APD-136, APD-139, APD-141, APD-142, APD-145, APD-70 · RLB-126, RLB-6.

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 (`get_session`: eingestellt `claude-opus-5-5`, zuletzt bedient `claude-opus-5-5`; Sitzungsdatei: alle 29
  Modell-Aufrufe `claude-opus-5-5`, kein `model_fallback`).
- **Aufwand:** hoch – eingestellt `high`, tatsächlich `high` in allen Modell-Aufrufen; `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** Sieben-Tage-Grenze **‚allowed_warning‘** (Warnstufe, keine Überziehung), zurückgesetzt 26.11.2026, 8:00.
  Ein voller Prüflauf (zuletzt 81:24) belastet die Grenze – sparsam prüfen.

## Umgebung

- Repos: AppDesign, ReiseLogBuch, ReiseLogBuch-Import angehängt und auf `main`-Stand; Verweise kleingeschrieben,
  `register_repo_root`.
- Tests eingerichtet: Playwright 1.56.1 in `ReiseLogBuch/tests` (`package.json`/`package-lock.json` gelöscht); Chromium 1243
  (Verweise 1194 → 1243), WebKit 2215 – beide starten; 4 Kerne.
- **Hooks:** `~/.claude/settings.json` leer (`{}`).

## Nächster Schritt (UEBERGABE 3)

1. `arbeit/0153 P-120 Auswertung.md` lesen.
2. P-120/F-1 bis F-4 je als feste Prüfung nachbauen – rot gegen 3.58.0 (0 Nr. 1).
3. F-1: Apple-Abgleich mit Quelle, Wortlaut der neuen allgemeinen Regel zur Freigabe (0 Nr. 29, Katalog 17 mit Prüfung).
   F-4: Apple-Abgleich, Muster (iPhone hoch, iPad quer), Testfall-Liste. F-3: Rückfrage zu PDF. F-2: beheben.
4. Bau-Frage: Reiselogbuch 3.58.1 mit AppDesign 4.68.1 (F-1 und APD-146), Prüflauf voll.
