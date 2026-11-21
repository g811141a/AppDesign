# Übergabe an die nächste Sitzung

**Stand 21.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0151‘ bei Kontext rund 140.000 (nach der Zusammenfassung; `messung.mjs` meldet ‚Übergabe fällig‘ – Übergabe nach Bau, Bericht und Usertest, 0 Nr. 13). Aufbau nach
Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in
der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.12** veröffentlicht (Fassung 4.67.2, `main` 52f2d9d; danach nur Backlog) |
| AppDesign | **4.67.2** veröffentlicht (`main` 492307c; danach nur diese Übergabe) |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03), unverändert |
| Zusammenarbeit allgemein | **3.19.0** |
| `CLAUDE.md` | AppDesign **2.14.0** · Reiselogbuch 3.10.0 · Import 1.2.0 |

- **Chatnummer:** Die nächste Sitzung heißt **Reiselogbuch 0152**, die danach 0153.
- **Modell und Aufwand:** 0151 lief mit **Opus 5.5**, Aufwand **hoch** (get_session; Modell-Aufrufe `high`, `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt); kein
  `model_fallback`. Festlegung (0122): Fable 5.2 vorerst nicht; Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander (auch web-fetch).
- **Nutzungsgrenze:** Sieben-Tage-Grenze **‚allowed_warning‘** (Warnstufe), zurückgesetzt am **26.11.2026, 8:00** (get_session zu Beginn von 0151).
- **Hooks:** `~/.claude/settings.json` leer (`{}`).
- **Usertests:** **P-119** (Reiselogbuch 3.57.12, AppDesign 4.67.2) – **alle ok** (Nutzer 21.11.2026, Sitzung 0151) – kein offener Usertest.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Umgebung:** `support.apple.com` nicht erreichbar; Apple-HIG über die JSON-Fassung (`https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<seite>.json`,
  mit `curl` erreichbar). `g811141a.github.io` mit `curl` nicht erreichbar. Muster über `file://` laden.
- **Prüfumgebung:** 4 Kerne; Chromium 157 (`chromium-1243`, Verweise 1194 → 1243 wie in der `CLAUDE.md`), WebKit 26.0.

## 2. Ergebnisse der Sitzung 0151

- **Gebaut und veröffentlicht: AppDesign 4.67.2 / Reiselogbuch 3.57.12** (Prüflauf voll):
  - **P-118/F-1** (R-3.6 Variante B): jede gedrückte Schaltfläche hebt sich und wird größer (1,3-fach, höchstens 24 px breiter; `pressScale` in `ui.js` setzt
    `--press-scale`); Auswahl-Kapsel blass, Zeilen grau, gefüllte Schaltflächen behalten ihre Farbe. `GROSS_SEL` bewusst nicht erweitert (steuert nur die
    Großanzeige R-2.6) – im Bericht genannt.
  - **P-118/F-2** (R-10.9, Designrichtlinie 6, Zusammenarbeit 1 → 3.19.0): 362 Stellen ‚Knopf‘ umbenannt; `checkBegriffe` in `doku-regeln` mit den Gegenproben
    P-118/Z-3a bis P-118/Z-3c (`--gegenprobe begriffe`). Dateinamen der Messungen vom 07.11. bleiben (Prüfungen zitieren sie).
- **Prüflauf:** erster voller Lauf nach 65 min abgebrochen – drei rote WebKit-Läufe unter Last (`ablauf-suche-menue` Menüzeilen 33 px, `offline-regeln` Absturz des
  Netzprozesses, `ablauf-blatt (iPad)` Escape ohne Abbild), einzeln je grün; zweiter voller Lauf grün. Beobachten, ob diese drei wieder wackeln.
- **Schema-Prüfung APD-78:** lokale Nummern brauchen den Elternteil (APD-n, RLB-n, P-n …); Dateinamen mit lokalen Nummern in Doku-Texten lösen sie aus.

## 3. Nächster Schritt

1. Lesen wie immer, Tests einrichten, Lagebild als eigene Antwort mit Kachel (0 Nr. 15).
2. **RLB-125** als eigene Version (Reiselogbuch sperren; Bau-Frage mit dem Wortlaut der Zeilen 21–23 der Tabelle 15.18 und der Eigenschaft `protect`,
   0 Nr. 29; Unterlagen `arbeit/0148 RLB-125 Klaerung.md`, `arbeit/0149 RLB-125 Muster 3.md`, `arbeit/0149 RLB-125 Regel und Loeschabfrage Wortlaut.md`,
   `arbeit/0150 RLB-125 Rest.md`; Testfall-Liste RLB-125/T-1 bis T-13): Bau-Frage nach 0 Nr. 21 mit Kachel (AppDesign kommt mit: R-4.14 und `createSync` mit `protect`); erst nach dem ‚Ja‘ bauen.
3. Danach: APD-135/B-3.3 Schritt 2, dann APD-145 (AppDesign 5.0.0, `v5/`).

## 4. Danach

APD-142 schrittweise · RLB-126 Muster · APD-139 · APD-141 · APD-32 · APD-55 · RLB-6 · APD-1 · APD-70 · APD-57 · APD-62 · APD-44 bis APD-60 · zuletzt APD-80. Später:
sobald ein iOS-Update `print()` vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Neue Vereinbarungen

- Wortlaute freigegeben, aber noch nicht eingetragen: mit dem Bau von RLB-125 **R-4.14** und die Lösch-Abfrage RLB-125/L-4, RLB-125/L-5.
- ‚Schaltfläche‘, nie ‚Knopf‘ – auch im Chat (Zusammenarbeit 1, R-10.9).

## 6. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign**, **ReiseLogBuch** und **ReiseLogBuch-Import** verfügbar sein.

```
Reiselogbuch 0152 – RLB-125 Reiselogbuch sperren (Bau-Frage)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.19.0) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL), hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach UEBERGABE.md Abschnitt 3 die Bau-Frage für RLB-125 (mit dem Wortlaut der Zeilen 21–23 der Tabelle 15.18 und der Eigenschaft protect, 0 Nr. 29) – erst nach dem Ja bauen. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```
