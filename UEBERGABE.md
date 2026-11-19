# Übergabe an die nächste Sitzung

**Stand 19.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0134‘ bei Kontext 292.499 (0 Nr. 13). Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest
diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

> **Hinweis:** Alles liegt auf `main` (AppDesign, Reiselogbuch); Arbeitsdateien aus 0134: `arbeit/0134 …`, `arbeit/APD-135 Paket 5 Wortlaut.md`. Kein eigener Zweig nötig.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.5** veröffentlicht (Backlog-Stand `main` 966c8c0) |
| AppDesign | **4.62.0** veröffentlicht (danach nur Backlog und `arbeit/`) |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03), unverändert |
| Zusammenarbeit allgemein | **3.15.0** |
| `CLAUDE.md` | AppDesign **2.14.0** · Reiselogbuch 3.10.0 · Import 1.2.0 |

- **Chatnummer:** Die nächste Sitzung heißt **Reiselogbuch 0135**, die danach 0136.
- **Modell und Aufwand:** 0134 lief mit **Opus 5.5**, Aufwand **hoch**, ohne `model_fallback`; ein Hilfsagent (web-fetch, Opus 5.5, hoch). Festlegung (0122):
  Fable 5.2 vorerst nicht; Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander.
- **Nutzungsgrenze:** Fünf-Stunden-Grenze, ‚erlaubt‘, keine Überziehung (zuletzt neu ab 19.11.2026 12:30 MEZ).
- **Hooks:** `~/.claude/settings.json` leer (`{}`).
- **Offene Usertests:** keine (P-112 ok, Nutzer 19.11.2026).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** github.io und support.apple.com gesperrt; die HIG als JSON (`developer.apple.com/tutorials/data/design/human-interface-guidelines/<seite>.json`).
  Eine Wisch-Gegenprobe dauert 8–14 min (eigener Hintergrundauftrag).

## 2. Ergebnisse der Sitzung 0134

- **Usertest P-112 ok** (beide Backlogs).
- **Gegenproben APD-30/W-89, W-96, W-103, W-104** einzeln: **alle rot** wie gefordert (16, 18, 16, 8 Meldungen) – `arbeit/APD-30 Wischaktionen Testfall-Liste.md`.
- **APD-135 Paket 5: Wortlaut bestätigt** (`arbeit/APD-135 Paket 5 Wortlaut.md`), APD-135/C-31 mit `t.seite`, APD-135/C-33 bleibt.
- **Neu APD-138** (Prio 2, allgemein, aus RLB-127): Dateiname am iPad nie umbrechen, Fenster passt sich an – `arbeit/0134 RLB-127 Dateiname.md`.
- **Wizard (geführte Erfassung) – in Klärung, noch KEIN Backlog-Eintrag:** Vorschlag `arbeit/0134 Vorschlag geführte Eingabe.md` mit den Festlegungen 1–5 des Nutzers
  (Tageserfassung unverändert, nur zusätzlich aus der Maske aufrufbar; alle Feld-Funktionen wie Rückgängig gelten auch im Wizard; Fortschritt und Navigation erst
  bei der Umsetzung; Seiten auch als Bündel/Abschnitt, Bean zukunftsfest; eine AD-Bean nur voll prüfen, wenn sie im Inneren geändert wurde). Gestaltung:
  `arbeit/0134 Wizard Gestaltung Optionen.md` – **gewählt A + E** fürs erste Muster; Priorität 2 genannt. Der Nutzer hat den Backlog-Eintrag (vorgesehen
  **APD-139**) **noch nicht** freigegeben: ‚Lege erst nach meinem ok einen Backlog-Eintrag an‘.

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten, Lagebild als eigene Antwort (Chat und Datei) mit Kachel. Im Fenster fragen: **‚Wizard mit Festlegungen
   1–5 und Gestaltung A + E – APD-139 (Prio 2) anlegen?‘**
2. **APD-135 Paket 5 bauen:** Testfall-Liste (0 Nr. 1), Code nach Abschnitt 4–5 der Wortlaut-Datei, Gegenproben rot zeigen, `vorbereiten` (vorläufig AppDesign
   4.63.0 / Reiselogbuch 3.57.6), Wortlaut einsetzen, `stufe`, Bau-Frage (voll, dazu Vergleichslauf `--alle` für ‚lang zuerst‘).

## 4. Danach

Wizard APD-139 (Apple-Abgleich mit Quelle, Muster A + E, iPhone hoch hell) · APD-138 · APD-135 Pakete 6–7 · APD-136 · RLB-125 (Prio 2) · RLB-126 · APD-32 · APD-55 ·
RLB-6 · APD-1 · APD-70 · APD-57 · APD-62 · APD-44 bis APD-60 · zuletzt APD-80. Später: sobald ein iOS-Update `print()` vom Home-Bildschirm wieder zulässt, den
PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign**, **ReiseLogBuch** und **ReiseLogBuch-Import** verfügbar sein.

```
Reiselogbuch 0135 – APD-135 Paket 5 bauen, Wizard APD-139

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.15.0) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL), hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel, im Fenster die Frage zum Backlog-Eintrag APD-139 (Wizard); danach weiter nach UEBERGABE.md Abschnitt 3 (APD-135 Paket 5 bauen: Testfall-Liste, Code, Gegenproben, Bau-Frage). Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```
