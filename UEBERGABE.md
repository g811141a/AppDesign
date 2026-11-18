# Übergabe an die nächste Sitzung

**Stand 18.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0129‘ (Übergabe nach dem Bau, ‚⚠ Übergabe fällig‘) – Aufbau nach Zusammenarbeit allgemein 2.5.
**Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der
AppDesign-`CLAUDE.md`.

> **Hinweis:** Alles liegt auf `main` (Versionen und Arbeitsdateien aus 0129). Diese Datei und `arbeit/0129 Bericht 4.60.2.md` liegen zusätzlich auf dem Zweig
> **`claude/gallant-fermat-e91n6w`** von AppDesign (Stand `main` + Übergabe). Vor der Arbeit `git fetch origin claude/gallant-fermat-e91n6w` und darauf aufsetzen.
> ReiseLogBuch: `main` genügt.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.2** veröffentlicht (`main` 21f2c74, Pages ‚success‘) |
| AppDesign | **4.60.2** veröffentlicht (`main` 7e559e1, Pages ‚success‘) |
| Zusammenarbeit allgemein | **3.14.1** |
| AppDesign-`CLAUDE.md` | **2.12.0** · Reiselogbuch-`CLAUDE.md` 3.9.0 |
| ReiseLogBuch-Import (privat) | Commit c747fee (‚1.3.0‘), in 0129 nichts geändert |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0130**; die danach 0131.
- **Modell und Aufwand:** 0129 lief mit **Opus 5.5**, Aufwand **hoch** (eingestellt und tatsächlich), kein `model_fallback`, keine Hilfsagenten. Festlegung (0122):
  Fable 5.2 vorerst nicht, Hilfsagenten nur Opus 5.5 und hoch, einzeln.
- **Nutzungsgrenze:** `get_session` auf `rate_limit_info` ansehen und im Lagebild nennen.
- **Hooks:** `~/.claude/settings.json` war leer (`{}`).
- **Offener Usertest:** **P-109** (Reiselogbuch 3.57.2, AppDesign 4.60.2) – Testfälle P-109/0 bis P-109/5 im Reiselogbuch-CHANGELOG und in `arbeit/0129 Bericht 4.60.2.md`;
  Rückmeldung steht aus.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** github.io und support.apple.com sind von hier gesperrt (Proxy 403); developer.apple.com liefert die Doku als JSON
  (`https://developer.apple.com/tutorials/data/<pfad>.json`). Ein Muster-Link gilt erst nach dem Pages-Lauf. Videos des Nutzers: `ffmpeg` ist vorhanden.
- **Doku-Prüfung (`checkSchema`):** jede lokale Nummer außerhalb ihrer Datei mit Elternnummer aus drei Buchstaben (APD-n, RLB-n) oder ganz ausgeschrieben
  (‚P-108/V-1 bis P-108/V-6‘, auch die Endnummer mit Elternnummer).
- **Voller Prüflauf** dauerte in 0129 **76:42** (164 Läufe).

## 2. Ergebnisse der Sitzung 0129

- **Muster P-108 Stand 2 ‚wie Notizen‘:** Nutzer ‚Passt‘; **Abstand 11 pt wie Notizen**; **Kapseln 66 × 44 behalten** (HIG 44 pt).
- **Wortlaut P-108/V-1 bis P-108/V-6** und **Testfall-Liste P-108/M-1 bis P-108/M-12** bestätigt (`arbeit/0129 P-108 Wortlaut.md`).
- **Gebaut: AppDesign 4.60.2 / Reiselogbuch 3.57.2 (voll):** `createSwipeactions` wie Notizen (Wachsen aus der Mitte ab halber Kapsel, ein Abstand 11 pt
  skaliert, Gummiband höchstens 60 px, Kapseln rücken mit und wachsen ≤ 6 %, Zurückfedern, kein Durchwischen, Parameter `durchwischen` entfällt); Prüfungen
  APD-30/W-91 bis APD-30/W-95 neu, APD-30/W-16 bis APD-30/W-19 entfallen; Gegenproben rot an der erwarteten Stelle. Bericht: `arbeit/0129 Bericht 4.60.2.md`.

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten, Lagebild als eigene Antwort (Chat und Datei) mit Kachel.
2. **Rückmeldung zum Usertest P-109 erfragen** (Testfälle P-109/0 bis P-109/5 wörtlich in der Datei vor der Kachel). Bei ‚nicht ok‘ erst Korrektur (0 Nr. 22).
3. Sind alle ok: **APD-135 Pakete 1 und 3 mit APD-135/W-57** (eigene Version, voll; Wortlaut bestätigt, `arbeit/APD-135 Pakete 1 und 3 Wortlaut.md`) –
   Testfall-Liste, Prüfung rot gegen 4.60.2, Bau-Frage.

## 4. Danach

APD-136 Umbau der Elemente (mit APD-135 Paket 6 und 7) · RLB-125 klären (Prio 2; Muster nur hell, Apple-Abgleich mit Quelle) · RLB-126 ‚Zuletzt gelöscht‘ (Prio 3) ·
APD-135 Pakete 2, 4–7 · APD-32 · APD-55 · RLB-6 · APD-1 · APD-70 · APD-57 · APD-62 · APD-44 bis APD-60 · zuletzt APD-80. Später: nach einem iOS-Update, das
`print()` vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign**, **ReiseLogBuch** und **ReiseLogBuch-Import** verfügbar sein.

```
Reiselogbuch 0130 – Usertest P-109, dann APD-135 Pakete 1 und 3

Lies im Repo g811141a/AppDesign zuerst UEBERGABE.md vom Zweig claude/gallant-fermat-e91n6w (git fetch origin claude/gallant-fermat-e91n6w; die Versionen AppDesign 4.60.2 und Reiselogbuch 3.57.2 sind auf main), dann die GANZE Zusammenarbeit allgemein (3.14.1) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL), hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach weiter nach UEBERGABE.md Abschnitt 3 (Rückmeldung zum Usertest P-109 erfragen, dann APD-135 Pakete 1 und 3 mit APD-135/W-57). Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```
