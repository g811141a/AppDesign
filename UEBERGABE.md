# Übergabe an die nächste Sitzung

**Stand 07.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0093‘ (APD-115 zweite Messung W-1, Modell, W-3/W-4; Übergabe nach 0 Nr. 13, Kontext etwa
290.000) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.52.0** veröffentlicht (Fassung 4.54.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.54.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.9.0** (Wortlaut APD-123 bestätigt, kommt mit 4.55.0, gilt schon) | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0094**; die danach 0095.
- **Modell und Aufwand:** in 0093 Opus 5.5 (`get_session`), alle Aufrufe `"effort":"high"`, kein `model_fallback`. `~/.claude/settings.json` = `{}` (keine Hooks).
- **Arbeitsweise nach APD-123** (`arbeit/APD-123 Zusammenarbeit ohne Regelwächter Wortlaut.md`): Kachel mit Push am Ende jeder Antwort, nach der der
  Nutzer etwas tun soll; alles zum Lesen davor, bei Prüfen am Gerät zusätzlich als Datei (`SendUserFile`, `display: 'render'`); ‚(Kontext N)‘ in
  jeder Frage; keine Uhrzeit- und Zeitzeile.
- **Offener Usertest:** keiner. **Offen beim Nutzer:** nichts – die dritte Messung (W-3, W-4) bekommt er erst, wenn das Muster grün ist (Abschnitt 3).
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages (`g811141a.github.io`) ist aus der Sitzung nicht erreichbar (Proxy) – Muster lokal per `file://` prüfen. Im
  Prüflauf `pgrep -f "Muster pr"` (mit ‚ü‘ findet `pgrep` nichts).

## 2. Ergebnisse der Sitzung 0093

- **Zweite Messung W-1 ausgewertet** (APD-115/N-13 in `arbeit/APD-115 Testfall-Liste.md`; Dateien `arbeit/APD-115 Messungen/2026-11-07 … W-1 zweite
  Messung.txt`). Rückmeldung ‚7 und 8 ruckelt noch immer‘:
  - **Schritt 8:** der Fensterinhalt sprang beim Schließen (iPad 342, iPhone 307 px) – `gemeldet()` gab vor dem Wachsen des Rahmens nur bei
    `platzVon(c)` > 0 Platz, nach dem Rollen steht `--platz` aber auf `0px`. Im Bauskript behoben (jeder Rollbereich bekommt Platz, `knapp` danach),
    M-11 prüft jetzt den Rollstand (rot gegen das Muster, 6 Fehler; danach Chromium und WebKit grün, Gegenprobe rot). **Derselbe Code steht in
    4.54.0** (`v4/ui.js` und `fassung/4.54.0/ui.js`, Zeile 2997) – ob es im Reiselogbuch 3.52.0 sichtbar ist, ist nicht geprüft.
  - **Schritt 7:** die Daten zeigen beim Tippen nichts; der Nutzer bestätigt: es ruckelt **gleich nach dem Antippen von Ort** – Safari stellt das Feld
    bei offener Tastatur selbst in die Mitte und verschiebt die Seite (iPad 139, iPhone 75 px, gemeldet 135 bzw. 88 ms nach dem Fokus).
- **Entscheidung APD-115/E-10 (Nutzer):** zuerst das Modell, dann **W-3** ‚vor dem Fokus zur Mitte‘ und **W-4** ‚Fokus selbst setzen‘ als Muster
  mit Messmodus, beide am Gerät messen.
- **Umgesetzt** (Commits ea24777, 737fe3c; Stand APD-115/N-14): Safari-Modell `tests/safari.mjs` Option `apd115` mit `wechselVerzug` (Verschiebung
  beim Wechsel sofort sichtbar, verzögert gemeldet); Bauskript `&w=3` und `&w=4`; M-7 und M-11 für W-1, W-3, W-4. W-3 im Modell ruhig (Safari
  verschiebt nicht, ein Schub, Schritt 8 ruhig).

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten. Lagebild als eigene Antwort mit Kachel am Ende.
2. **Muster W-3/W-4 grün machen** (APD-115/N-14 ‚Offen‘): (a) im ersten M-7-Block (`checkTastaturStill` mit `wechsel`, `arbeit/APD-115 Muster
   prüfen.mjs` etwa Zeile 100) das Muster mit `&w=3` öffnen statt ohne `&w=` (= W-2, springt im neuen Modell); (b) iPhone quer W-3 (Ort höher als der
   sichtbare Teil, Safari verschiebt 30 px) in M-11 als Hinweis wie APD-115/A-3. Dann `node "arbeit/APD-115 Muster prüfen.mjs"` in Chromium und WebKit
   grün, `PRUEF_V=heute` rot.
3. **Dritte Messung** am Gerät: je W-3 und W-4 (`https://g811141a.github.io/AppDesign/arbeit/APD-115/?v=a&w=3` bzw. `&w=4`), iPad quer und iPhone hoch,
   Schritte wie ‚Schritte am Gerät‘ in der Testfall-Liste; bei 6 nach dem Antippen von Ort 2 Sekunden warten, bei 8 nach x die rote Schaltfläche der
   Abfrage. Fragen: wann ruckelt es (6 gleich nach dem Antippen, 7 beim Tippen, 8 beim Schließen)?
4. Auswerten (Messdateien gefiltert lesen: `grep -v 'zeiger move\|touchmove\|nav kein'`), W-3 oder W-4 wählen lassen; bei ‚ruhig‘ APD-115 bereit (eigene
   Version nach 4.55.0, 0 Nr. 8), mit ihr Option `apd115` zum Standard machen und die bestehenden Prüfungen anpassen. **Zu klären:** die Korrektur aus
   Schritt 8 (`gemeldet`) betrifft auch 4.54.0 – als Korrektur in 4.55.0 vorschlagen (0 Nr. 8, nach Rückfrage).
5. Danach die **Bau-Frage** in der Kachel: ‚Soll ich Version AppDesign 4.55.0 / Reiselogbuch 3.53.0 mit APD-122, APD-123, APD-121 und RLB-119
   erstellen? (Kontext N)‘ – nach ‚Ja‘ bauen nach den Arbeitsdateien; jede neue Prüfung zuerst rot gegen 4.54.0 / 3.52.0 (0 Nr. 1); APD-123 mit der
   Anpassung von `tests/doku.mjs` (`checkCollab`, APD-123/D-9) und dem Kasten ‚Jede Antwort‘ neu; vor `los` die bestehenden Prüfungen anpassen
   (`ablauf-suche-*`, `checkSearchWords`, `checkSchichtOben`). Achtung: `tests/safari.mjs` hat die Option `apd115` (Standard aus, jetzt mit
   `wechselVerzug`) – geht so in 4.55.0.

## 4. Danach

APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 · APD-80 · APD-30 übrige Teile · APD-57 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0094 – APD-115 Muster W-3/W-4 grün machen, dritte Messung, danach Bau 4.55.0 / 3.53.0

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein und dazu arbeit/APD-123 Zusammenarbeit ohne Regelwächter Wortlaut.md (bestätigt, gilt: Kachel am Ende, alles zum Lesen davor, keine Uhrzeit- und Zeitzeile) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort, dann weiter nach UEBERGABE.md Abschnitt 3: Muster APD-115 W-3/W-4 grün machen (arbeit/APD-115 Testfall-Liste.md, APD-115/N-13, E-10, N-14), dritte Messung beim Nutzer, auswerten, danach die Bau-Frage.
```
