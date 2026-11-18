# Übergabe an die nächste Sitzung

**Stand 18.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0131‘ (Übergabe nach dem Bau, ‚⚠ Übergabe fällig‘, Kontext ~290.000) – Aufbau nach
Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung
steht in der AppDesign-`CLAUDE.md`.

> **Hinweis:** Alles liegt auf `main` – Versionen, diese Datei und die Arbeitsdateien aus 0131 (`arbeit/0131 …`). Kein eigener Zweig nötig.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.4** veröffentlicht (`main` 0868a56, Pages ‚success‘) |
| AppDesign | **4.61.0** veröffentlicht (`main` f2c4683, Pages ‚success‘) |
| Zusammenarbeit allgemein | **3.15.0** (Versionsgeschichte jetzt in `README - Zusammenarbeit Versionsgeschichte.md`) |
| AppDesign-`CLAUDE.md` | **2.13.0** · Reiselogbuch-`CLAUDE.md` 3.10.0 |
| ReiseLogBuch-Import (privat) | Commit c747fee, in 0131 nichts geändert |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0132**; die danach 0133.
- **Modell und Aufwand:** 0131 lief mit **Opus 5.5**, Aufwand **hoch** (eingestellt und tatsächlich), kein `model_fallback`; ein Hilfsagent (Opus 5.5,
  hoch) für Versionsgeschichten und Kommentare. Festlegung (0122): Fable 5.2 vorerst nicht, Hilfsagenten nur Opus 5.5 und hoch, einzeln.
- **Nutzungsgrenze:** `get_session` auf `rate_limit_info` ansehen und im Lagebild nennen.
- **Hooks:** `~/.claude/settings.json` war leer (`{}`).
- **Offener Usertest:** **P-111** (Reiselogbuch 3.57.4, AppDesign 4.61.0) – nur P-111/0 ‚Version prüfen‘ (App unverändert); im Reiselogbuch-CHANGELOG und in
  `arbeit/0131 Bericht 4.61.0.md`. Rückmeldung steht aus.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** github.io und support.apple.com sind von hier gesperrt (Proxy 403); developer.apple.com liefert die Doku als JSON. Videos des
  Nutzers: `ffmpeg` ist vorhanden; Messen Bild für Bild mit Python/NumPy, Video und Bilder nur im Notizordner.
- **Prüfungen mit fester Uhr:** eigene Bild-für-Bild-Bewegungen nehmen die Zeit aus `performance.now()`, nicht aus dem Zeitstempel von
  `requestAnimationFrame`.
- **Voller Prüflauf** dauerte in 0131 **82:23** (164 Läufe).

## 2. Ergebnisse der Sitzung 0131

- **Usertest P-110:** alles ok (Nutzer 18.11.2026) – in beiden Backlogs unter ‚Erledigt‘.
- **Gebaut: AppDesign 4.61.0 / Reiselogbuch 3.57.4 (voll, 164 grün):** APD-135 Pakete 1 und 3 mit APD-135/W-57 und APD-135/L-18 – Versionsgeschichten in
  eigene Dateien ausgelagert, Kasten ‚Immer‘ ergänzt (Nr. 1, Nr. 19), ‚Verpflichtend‘ der AppDesign-`CLAUDE.md` ohne Wiederholung. Neue Prüfung
  `checkVersionsgeschichte` in `tests/doku.mjs` (APD-135/M-1 bis M-4, Gegenproben in `schema`), rot gegen 4.60.3 (11 Meldungen). Testfall-Liste:
  `arbeit/APD-135 Pakete 1 und 3 Testfall-Liste.md`, Bericht: `arbeit/0131 Bericht 4.61.0.md`.
- **`PROMPT.md` APD-135/W-33:** Der bestätigte Alt-Text war durch APD-30 überholt. Entscheidung nach Rückfrage: ‚mit R-7.8‘ (`arbeit/0131 PROMPT W-33 Wortlaut.md`).
  Ein erster Lauf mit der irrtümlichen Antwort wurde vor dem Veröffentlichen angehalten.
- **Offen aus 0130:** die Gegenproben APD-30/W-87, W-88, W-89, W-96, W-103, W-104 sind noch nicht einzeln gelaufen
  (`PRUEF_GEGENPROBE=wischen:W-n node tests/ablauf-wischen.mjs` im Reiselogbuch) – bei Gelegenheit nachholen.

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten, Lagebild als eigene Antwort (Chat und Datei) mit Kachel.
2. **Rückmeldung zum Usertest P-111 erfragen** (P-111/0 wörtlich in der Datei vor der Kachel). Bei ‚nicht ok‘ erst Korrektur (0 Nr. 22).
3. Ist er ok: **APD-135 Paket 2** (Lesekosten und Ablage, mit APD-135/W-19) – Wortlaut aus `arbeit/APD-135 Konsolidierung 3 Vorschlag.md` und
   `arbeit/0123 Entscheidungen APD-135.md` vorlegen und bestätigen lassen (0 Nr. 29), dann Testfall-Liste, Prüfung rot, Bau-Frage.

## 4. Danach

APD-135 Pakete 4–7 · APD-136 Umbau der Elemente (mit APD-135 Paket 6 und 7) · RLB-125 klären (Prio 2; Muster nur hell, Apple-Abgleich mit Quelle) ·
RLB-126 ‚Zuletzt gelöscht‘ (Prio 3) · APD-32 · APD-55 · RLB-6 · APD-1 · APD-70 · APD-57 · APD-62 · APD-44 bis APD-60 · zuletzt APD-80. Später: nach einem
iOS-Update, das `print()` vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign**, **ReiseLogBuch** und **ReiseLogBuch-Import** verfügbar sein.

```
Reiselogbuch 0132 – Usertest P-111, dann APD-135 Paket 2

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.15.0) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL), hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach weiter nach UEBERGABE.md Abschnitt 3 (Rückmeldung zum Usertest P-111 erfragen, dann APD-135 Paket 2: Wortlaut vorlegen). Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```
