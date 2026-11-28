# Übergabe an die nächste Sitzung

**Stand 28.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0171‘ bei Kontext 130.853 (`messung.mjs`, ‚⚠ Übergabe fällig‘), nach einer automatischen Zusammenfassung.
- Der Schritt ist abgeschlossen: Bau 3.59.2, Bericht mit P-128.
- **Mit dieser Sitzung endet die Kette Reiselogbuch.** Der Nutzer führt die Ketten zusammen (27.11.2026, im Fenster: „a: erst 3.59.2 hier“). Ab **AppDesign 0009** arbeitet nur noch die Kette AppDesign, für beide Apps.
- 0009 liest zuerst `arbeit/APD-149 Uebergabe.md`, dann diese Datei. Hier steht der Stand der Reiselogbuch-Seite.
- Aufbau nach Zusammenarbeit allgemein 2.5; die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.59.2** veröffentlicht (`a1d4e3e`, Pages ‚success‘, 28.11.2026) |
| AppDesign | **4.71.0** veröffentlicht (`f852d77`); seither auf `main` nur Backlog, Arbeitsdateien, Übergaben und der Entwurf `katalog/entwurf/presentation-commands.js` |
| ReiseLogBuch-Import (privat) | **1.4.1** (`1161b4c`) |
| Zusammenarbeit allgemein | **3.19.0** |
| `CLAUDE.md` | AppDesign **2.14.0** · Reiselogbuch 3.10.0 · Import 1.2.0 |

- **Chatnummer:** Die nächste Sitzung heißt **AppDesign 0009 – Bau v5/ (AppDesign 5.0.0)**, danach AppDesign 0010. Neue Reiselogbuch-Nummern gibt es nicht mehr.
- **Sitzungskette:** `lineage` Tiefe 8 von 8. **Der Nutzer öffnet 0009 selbst** in derselben Umgebung (Opus 5.5, Aufwand hoch) und fügt den Starttext aus `arbeit/APD-149 Uebergabe.md` Abschnitt 6 ein.
- **Modell und Aufwand:** 0171 lief mit Opus 5.5, Aufwand hoch, eingestellt und tatsächlich gleich (`last_served_model` claude-opus-5-5). Es gab keinen `model_fallback`, `CLAUDE_CODE_EFFORT_LEVEL` war ungesetzt.
  - Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** 7 Tage, Status ‚allowed_warning‘, sie setzt am 03.12.2026 um 07:00 UTC zurück.
- **Hooks:** keine. `~/.claude/settings.json` erlaubt nur `create_session`.
- **Prüfumgebung:** 4 Kerne, Chromium 158 (Verweise 1194 → 1243), WebKit 26.0, Playwright 1.56.1. Der volle Lauf dauerte 84:10 (198 Läufe).
- **Offener Usertest:** **P-128** (Reiselogbuch 3.59.2, ersetzt P-127). Der ganze Wortlaut steht im ReiseLogBuch-`CHANGELOG.md` unter 3.59.2. Die Rückmeldung nimmt 0009 entgegen.

## 2. Ergebnisse der Sitzung 0171

- **Reiselogbuch 3.59.2 mit RLB-129 veröffentlicht** (Korrektur zu RLB-128, P-127 fehlgeschlagen). Die Seitenleiste kehrt nach dem Drehen an ihre Stelle zurück.
  - Die App merkt sich nur, wohin du selbst rollst. Eine Lage, die der Browser beim Drehen erzwingt, ändert die gemerkte Lage nicht (`sideKept`).
  - Als Drehen zählen das Drehen selbst und die Zeit bis 600 ms nach dem letzten `resize` (Messung am iPhone: 326 ms; das iPad ist nicht gemessen).
  - **Reicht der Rollweg nicht,** steht die Liste so weit unten wie möglich, und der vorige oberste Eintrag bleibt sichtbar.
  - **Nach einem Drehen gewählt:** Ein Eintrag, den du nach einem Drehen wählst, rollt nach dem Zurückdrehen ins Bild (`sideFollow`).
  - Nur `index.html`; AppDesign blieb 4.71.0.
- **Prüfung:** `ablauf-seitenleiste-drehen` vergleicht jetzt mit der Lage vor dem ersten Drehen, auch bei RLB-128/T-1 bis T-9.
  - Neu sind RLB-129/T-1 bis T-8.
  - Gegen 3.59.1 waren in Chromium und WebKit rot: T-2 bis T-8, dazu RLB-128/T-3, T-4 und T-5.
  - **Abweichungen, im Bericht genannt:**
    - Bei T-6 ‚hoch selbst rollen‘ habe ich 14 Reiselogbücher genommen, weil die Liste mit den Daten von T-2 hoch nicht rollt.
    - Bei T-7 (AX5) ist die Vorbedingung jetzt ‚auf min(Rolle, Rollweg) gerollt und > 0‘, weil WebKit dort nur 44 px Rollweg hat. Die Erwartungen sind unverändert.
- **Erster voller Lauf rot:** `ablauf-jahre` RLB-114/Y-7 auf dem iPhone, Chromium und WebKit (oben ‚z5‘ statt ‚z3‘).
  - Ursache: `sideFollow` hielt den gewählten Eintrag auch dann im Bild, wenn er vor jedem Drehen gewählt war.
  - Behoben: nur, wenn er nach einem Drehen gewählt wurde (`3dd0b0a`). Der zweite volle Lauf war grün.
  - Lehre: Vor dem Bau auch `ablauf-jahre` laufen lassen, wenn sich die Lage der Seitenleiste ändert.
- **Nicht geprüft:** wie die Notizen am iPad mit wenigen Notizen zurückdrehen. Das kann der Nutzer nachreichen.
- **Nachrichten an AppDesign 0008:** bei `vorbereiten` und beim Start von `los`. ‚Fertig‘ steht in dieser Datei, weil 0008 beendet ist.

## 3. Nächster Schritt (für AppDesign 0009)

1. Nach `arbeit/APD-149 Uebergabe.md` Abschnitt 3: Bau AppDesign 5.0.0 mit Reiselogbuch **3.60.0**. Das Ja des Nutzers liegt vor (AppDesign 0008).
   - Die Bedingung ‚erst nach 3.59.2 auf `main`‘ ist erfüllt: `a1d4e3e`, Pages ‚success‘.
   - 3.60.0 setzt auf 3.59.2 auf.
   - `ablauf-seitenleiste-drehen` und `ablauf-jahre` müssen grün bleiben.
2. **Rückmeldung zu P-128:**
   - **Nicht ok:** zuerst genau den Ablauf des Nutzers als feste Prüfung nachbauen, rot gegen 3.59.2 (0 Nr. 1), dann beheben. Die Korrektur kommt sofort (0 Nr. 8).
   - **Ok:** P-128 im Backlog Reiselogbuch auf ‚erledigt‘ setzen.

## 4. Danach

- Nach `v5/` die dauerhafte Regel zu parallelen Ketten klären (`arbeit/APD-149 0004 Parallele Ketten.md`).
- Weitere Themen nach dem Backlog: APD-157, APD-155, APD-156, RLB-6 …

## 5. Neue Vereinbarungen

- **Ketten zusammengeführt** (Nutzer 27.11.2026, Sitzung 0171, im Fenster „a: erst 3.59.2 hier“). Ab AppDesign 0009 gibt es nur eine Kette für beide Apps.
  - Die Vorgabe parallele Ketten (`arbeit/APD-149 0004 Parallele Ketten.md`) gilt nur, solange zwei Ketten laufen. Es läuft keine zweite Kette mehr.
  - Aufgehoben hat der Nutzer die Vorgabe nicht ausdrücklich. Im Zweifel in 0009 nachfragen.
- **Die freigegebenen Erwartungen gelten wörtlich** – nie eine Prüfung ohne Rückfrage abschwächen.
- Keine neuen Regeln in Kraft.

## 6. Starttext für die neue Sitzung

Der Starttext für 0009 steht in `arbeit/APD-149 Uebergabe.md` Abschnitt 6. Er nennt diese Datei als zweite. In der Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein, für den Import zusätzlich **ReiseLogBuch-Import**.

**Name der neuen Sitzung:** ‚AppDesign 0009 – Bau v5/ (AppDesign 5.0.0)‘.
