# Übergabe an die nächste Sitzung

**Stand 08.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0102‘ (Testfall-Liste 4.57.0 bestätigt, APD-124 bereit, APD-116 Muster ok;
Bau **abgelehnt**; Übergabe nach 0 Nr. 13, Kontext 279.139) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder
Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.54.0** veröffentlicht (Fassung 4.56.0) |
| AppDesign | **4.56.0** veröffentlicht |
| Zusammenarbeit allgemein | **3.10.0** (3.11.0 mit APD-125 bestätigt, kommt mit 4.57.0) |
| AppDesign-`CLAUDE.md` | **2.11.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0103**; die danach 0104.
- **Modell und Aufwand:** in 0102 Opus 5.5 (`get_session`), alle Aufrufe `"effort":"high"`, kein `model_fallback`. `~/.claude/settings.json` = `{}` (keine Hooks).
  Der Arbeitsprozess wurde einmal neu gestartet.
- **Arbeitsweise (APD-125, gilt):** vor **jeder** Kachel alle wichtigen Informationen in **einer Datei** (`SendUserFile`, `display: 'render'`) und ebenso im Chat;
  ‚(Kontext N)‘ in jeder Frage.
- **Offener Usertest:** **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – ok bis auf **P-100/1** (→ RLB-123, kommt mit 3.55.0).
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1`; `g811141a.github.io` ist aus der
  Sitzung nicht erreichbar (Proxy 403) – Muster lokal per `file://` prüfen. Videos über einen Zweig von **ReiseLogBuch-Import** (Vorgehen in
  `arbeit/APD-127 Messung und Testfall-Liste.md`); der Zweig `messung-video` enthält noch ein Video im Verlauf – der Nutzer kann ihn auf GitHub löschen.

## 2. Ergebnisse der Sitzung 0102

- **Bau-Freigabe:** In 0101 ‚Ja‘ für 4.57.0 / 3.55.0 mit APD-125, APD-126, RLB-123 und APD-127. In 0102 zuerst ‚Weiter, aber noch kein Bau‘, dann die
  Bau-Frage mit 5 Punkten (dazu APD-124): **‚Nein‘** (Nutzer 08.11.2026). **Es gibt zurzeit keine gültige Freigabe** – vor dem Bau neu fragen (0 Nr. 21).
- **Testfall-Liste 4.57.0 / 3.55.0 bestätigt** (Nutzer 08.11.2026): `arbeit/4.57.0 Testfall-Liste.md` – Ort jedes Falls in den festen Prüfungen
  (APD-126/B-1 bis B-13 als `checkFeldCursor` + Reiselogbuch `ablauf-feld-cursor.mjs`; RLB-123/B-1 bis B-8 in `verlauf-vorschlaege.mjs`, `ablauf-feld-rollen.mjs`;
  APD-124/B-1 bis B-11 in `checkClear`; APD-127/B-1 bis B-10 als `checkGleiten`; APD-125/B-1 bis B-4 `doku.mjs`, `version.mjs`) und Entwurf Usertest P-101
  (/0 bis /7 plus vier Testfälle zu APD-124 aus `arbeit/APD-124 Klärung und Testfall-Liste.md`).
- **APD-124 bereit:** Muster neu auf APD-126 (nur Variante A, vier Lagen, T-1 bis T-10 grün, Gegenprobe rot); **Muster iPad hoch und iPhone quer ok,
  auch die Zwischenablage** (‚65 Zeichen kopiert‘); **Wortlaut APD-124/W-1 bis W-3 (R-5.6, 15.11, 16) bestätigt** – AppDesign-Backlog ‚0.‘, jetzt **4 Punkte bereit**.
- **APD-116 (Prio 2) geklärt bis zum Muster:** Nachgestellt – der Backup-Name bricht heute nur an Leerzeichen (‚Ω‘ allein am Zeilenende), die Ausgabe
  nach ‚-‘. Wunsch präzisiert: **Dateiname allein in einer neuen Zeile, Umbruch nur nach einem Leerzeichen**. Muster `arbeit/APD-116/index.html` (jedes Wort
  `inline-block` in `.fname`, Satz ‚… abgebrochen – nicht gespeichert:‘), Prüfung `arbeit/APD-116 Muster prüfen.mjs` T-1 bis T-6 grün, Gegenprobe rot;
  **Muster iPad quer und iPhone hoch ok** (Nutzer 08.11.2026). Alles in `arbeit/APD-116 Klärung.md`.

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten. **Lagebild als eigene Antwort – im Chat und als Datei – mit Kachel** (APD-125).
2. **APD-116 fertig klären:** ‚Als allgemeine Regel festhalten?‘ (0 Nr. 4, Empfehlung ja – `SHARE_RESULT` in `v4/ui.js` ist allgemein); Wortlaut
   (15.19 bzw. 10 und eine Katalog-Regel mit Prüfung in `ablauf.mjs`, alt und neu, 0 Nr. 29); Muster iPad hoch und iPhone quer (0 Nr. 6); Testfälle (User).
3. **Bau-Frage neu stellen** (0 Nr. 21): AppDesign 4.57.0 / Reiselogbuch 3.55.0 mit APD-125, APD-126, RLB-123, APD-124, APD-127 (+ APD-116, wenn bereit);
   Hinweis 0 Nr. 8 (höchstens 2 Themen: Eingabefelder APD-124/126/RLB-123 und Gleiten APD-127; APD-125 und APD-116 klein). Bauen erst nach ‚Ja‘, dann nach
   AppDesign-`CLAUDE.md` ‚Veröffentlichen‘ mit `arbeit/4.57.0 Testfall-Liste.md`, CHANGELOG mit Testfällen P-101, voller Prüflauf in `… los`.

## 4. Danach

Usertest P-101 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 (Wackler WebKit) · APD-80 · APD-30 übrige Teile · APD-57 · APD-44 bis APD-60 · APD-70 ·
RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0103 – APD-116 und Bau-Frage 4.57.0

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.10.0 plus APD-125: vor jeder Kachel alle wichtigen Informationen in einer Datei und im Chat) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Datei) mit Kachel, dann weiter nach UEBERGABE.md Abschnitt 3: APD-116 fertig klären, danach die Bau-Frage für AppDesign 4.57.0 / Reiselogbuch 3.55.0 neu stellen (keine gültige Freigabe, Nutzer 08.11.2026: ‚Nein‘).
```
