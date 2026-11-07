# Übergabe an die nächste Sitzung

**Stand 07.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0094‘ (APD-115 Muster W-3/W-4 grün, dritte Messung, Entscheidung W-4; Übergabe nach
0 Nr. 13, Kontext etwa 256.000 – ein Bau mit vollem Prüflauf hätte die Grenze überschritten) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest
diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.52.0** veröffentlicht (Fassung 4.54.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.54.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.9.0** (Wortlaut APD-123 bestätigt, kommt mit 4.55.0, gilt schon) | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0095**; die danach 0096.
- **Modell und Aufwand:** in 0094 Opus 5.5 (`get_session`), alle Aufrufe `"effort":"high"`, kein `model_fallback`. `~/.claude/settings.json` = `{}` (keine Hooks).
- **Arbeitsweise nach APD-123** (`arbeit/APD-123 Zusammenarbeit ohne Regelwächter Wortlaut.md`): Kachel mit Push am Ende jeder Antwort, nach der der
  Nutzer etwas tun soll; alles zum Lesen davor, bei Prüfen am Gerät zusätzlich als Datei (`SendUserFile`, `display: 'render'`); ‚(Kontext N)‘ in
  jeder Frage; keine Uhrzeit- und Zeitzeile. **Lagebild als eigene Antwort mit Kachel, bevor die Arbeit beginnt** (in 0094 fehlte es vor der ersten Frage).
- **Offener Usertest:** keiner. **Offen beim Nutzer:** nichts.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages (`g811141a.github.io`) ist aus der Sitzung nicht erreichbar (Proxy) – Muster lokal per `file://` prüfen; ob Pages
  den Stand hat, zeigt `mcp__github__actions_list` (‚pages build and deployment‘). Im Prüflauf `pgrep -f "Muster pr"` (mit ‚ü‘ findet `pgrep` nichts).
  Ein voller Lauf `node "arbeit/APD-115 Muster prüfen.mjs"` dauert über 10 Minuten – im Hintergrund starten; `PRUEF_ANSICHT='iPad quer'` prüft eine Ansicht.

## 2. Ergebnisse der Sitzung 0094

- **Muster W-3/W-4 grün** (APD-115/N-15, Commits 5a39b69 und folgende): erster M-7-Block mit `&w=3`; iPhone quer W-3 (Ort höher als der sichtbare Teil,
  Safari verschiebt 30 px) in M-7 und M-11 als Hinweis wie APD-115/A-3. Chromium und WebKit ‚alles in Ordnung‘, Gegenprobe `PRUEF_V=heute` rot (87 Fehler).
- **Dritte Messung ausgewertet** (APD-115/N-16; `arbeit/APD-115 Messungen/… dritte Messung.txt`, vier Dateien): Schritt 6 – Safari verschiebt in
  keiner Messung (`scrollY` 0); W-3 rollt vor dem Fokus einmal, W-4 rollt nicht. Schritt 8 – Rollstand bleibt, die Korrektur aus N-13 (`gemeldet`)
  wirkt am Gerät. Schritt 7 – laut Nutzer ruckelt **nur W-3 am iPad** (ganzes Fenster); die Daten zeigen nichts (Vermutung: Safari rückt den
  gesetzten Rollstand am iPad erst später nach, ‚scroll‘ kam 2,2 s danach). **Abweichung vom Modell:** das Modell lässt Safari bei W-4 verschieben
  (147 bzw. 161 px), am Gerät nicht.
- **Entscheidung APD-115/E-11 (Nutzer):** **W-4 ‚Fokus selbst setzen‘.**

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten. **Lagebild als eigene Antwort mit Kachel am Ende**, die Arbeit beginnt nach der Antwort.
2. **Bau-Frage** in der Kachel: ‚Soll ich Version AppDesign 4.55.0 / Reiselogbuch 3.53.0 mit APD-122, APD-123, APD-121 und RLB-119 erstellen?
   (Kontext N)‘ – dazu (eigene Frage) die **Korrektur `gemeldet`** aus APD-115/N-13 (Fensterinhalt springt beim Schließen der Tastatur; steckt in
   `v4/ui.js` und `fassung/4.54.0/ui.js` Zeile 2997, also im Reiselogbuch 3.52.0; am Gerät mit dem Muster bestätigt, N-16) mit in 4.55.0 (0 Nr. 8,
   Korrektur). Nach ‚Ja‘ bauen nach den Arbeitsdateien; jede neue Prüfung zuerst rot gegen 4.54.0 / 3.52.0 (0 Nr. 1); APD-123 mit der Anpassung von
   `tests/doku.mjs` (`checkCollab`, APD-123/D-9) und dem Kasten ‚Jede Antwort‘ neu; vor `los` die bestehenden Prüfungen anpassen (`ablauf-suche-*`,
   `checkSearchWords`, `checkSchichtOben`). `tests/safari.mjs` hat die Option `apd115` (Standard aus, mit `wechselVerzug`) – geht so in 4.55.0.
3. Danach **APD-115 zu Ende klären** (APD-115/E-11): (1) Safari-Modell – setzt die App den Fokus selbst (`touchend`, `focus({ preventScroll: true })`),
   verschiebt Safari nicht; M-7/M-11 für W-4 dann als Fehler statt Hinweis; (2) Fall ‚Ort unter der Tastatur, nicht hochgeschoben‘ mit W-4 messen oder als
   Testfall (User); (3) APD-115 bereit – eigene Version nach 4.55.0: W-4 als einzige Variante, Option `apd115` zum Standard, Prüfungen anpassen.

## 4. Danach

APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 · APD-80 · APD-30 übrige Teile · APD-57 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0095 – Bau AppDesign 4.55.0 / Reiselogbuch 3.53.0, danach APD-115 W-4 zu Ende klären

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein und dazu arbeit/APD-123 Zusammenarbeit ohne Regelwächter Wortlaut.md (bestätigt, gilt: Kachel am Ende, alles zum Lesen davor, keine Uhrzeit- und Zeitzeile) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort mit Kachel, dann weiter nach UEBERGABE.md Abschnitt 3: Bau-Frage 4.55.0 / 3.53.0 (mit der Korrektur gemeldet aus APD-115/N-13), danach APD-115 W-4 zu Ende klären (arbeit/APD-115 Testfall-Liste.md, APD-115/N-16, E-11).
```
