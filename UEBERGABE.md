# Übergabe an die nächste Sitzung

**Stand 07.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0090‘ (APD-115 Muster; Übergabe nach 0 Nr. 13, Kontext etwa 291.000) – Aufbau nach
Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die
Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.52.0** veröffentlicht (Fassung 4.54.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.54.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.9.0** (Wortlaut APD-123 bestätigt, kommt mit 4.55.0) | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0091**; die danach 0092.
- **Modell und Aufwand:** in 0090 Opus 5.5 (`get_session`), alle Aufrufe `"effort":"high"`, kein `model_fallback`.
- **APD-123 bestätigt (Nutzer 07.11.2026, Sitzung 0089, lief parallel zu 0090):** Regelwächter abgeschaltet – Hooks in der Umgebung entfernt, das
  Setup-Skript ‚Standard‘ ohne ihn gilt ab der nächsten frischen Sitzung. **Ab sofort** (Wortlaut `arbeit/APD-123 Zusammenarbeit ohne Regelwächter
  Wortlaut.md`, APD-123/V-1, V-2, D-1 bis D-12): Kachel (Auswahlfenster) mit Push am Ende jeder Antwort, nach der der Nutzer etwas tun soll; **alles zum
  Lesen vor der Kachel**, bei Prüfen am Gerät zusätzlich als Datei im Seitenbereich (`SendUserFile`, `display: 'render'`); ‚(Kontext N)‘ am Ende jeder
  Frage (N aus `messung.mjs`); **Uhrzeitzeile und Zeitzeile entfallen**. Prüfe zu Beginn `cat ~/.claude/settings.json` – steht dort noch `hooks`, bitte
  den Nutzer, sie zu entfernen (in 0090 lehnte die Freigabe das Ändern durch Claude ab).
- **Offener Usertest:** keiner.
- **Offene Frage an den Nutzer (geht mit, 0 Nr. 13):** Rückmeldung zum Muster APD-115 (Variante A oder B, Wortlaut R-4.5 ja/nein) – siehe 3.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0090

- **APD-115 Muster** (`arbeit/APD-115 Testfall-Liste.md`: Apple-Abgleich, Abweichungen APD-115/A-1 bis A-3, Varianten APD-115/V-4 und V-5,
  Testfall-Liste APD-115/M-1 bis M-10 und Y-1, Wortlaut R-4.5): Kopie des Reiselogbuchs 3.52.0 mit eigenem Speicher (`reiselogbuch.muster-apd115`),
  gebaut mit `arbeit/APD-115 Muster bauen.mjs`; `ui.js` 4.54.0 mit V-3 (`noetigV3`, `cursorZeile`, Cursorzeile beim Tippen, iPad-Fenster nach dem
  Gleiten). Links: https://g811141a.github.io/AppDesign/arbeit/APD-115/?v=a (A: ‚Verlauf‘ direkt über dem Feld, Vorschläge darunter, Empfehlung) und
  `?v=b` (wie heute). Prüfung `arbeit/APD-115 Muster prüfen.mjs`: Chromium und WebKit grün, Gegenprobe `PRUEF_V=heute` rot (31 Fehler). Dem Nutzer
  mit Link und Schritten gezeigt – Rückmeldung steht aus.
- **Selbstkritik 0090:** eine Zwischenmeldung ohne Uhrzeitzeile, vor dem Muster-Fenster kein eigener Satz mit ‚Kontext N‘; Lagebild zuerst ohne Link.
  In der Testfall-Liste lokale Nummern ohne Elternnummer (von 0089 gemeldet, behoben).

## 3. Nächster Schritt

1. Lesen wie immer (nach APD-123: Lagebild mit Kachel am Ende, alles zum Lesen davor). Repos dazuholen, Tests einrichten.
2. **Rückmeldung zum Muster APD-115** erfragen (Kachel): Variante A oder B, Schritte 1–7 am Gerät ok, Wortlaut R-4.5 (0 Nr. 29) ja/nein. Bei ‚ok‘:
   APD-115 als bereit in ‚0. Nächste Version‘ (eigenes Thema – zusammen mit 4.55.0 nur, wenn höchstens 2 Themen, sonst die Version danach, 0 Nr. 8);
   beim Bau R-4.5 und Designrichtlinie 13 ‚Lösung in ui.js‘ anpassen, die Prüfungen `checkFieldVisible`/`checkTastaturStill` (Lage ‚obere Hälfte‘
   bzw. ‚ganz über der Tastatur‘ für hohe Textfelder) nach V-3 umstellen, M-1 bis M-7 als feste Prüfung ins Reiselogbuch.
3. Danach die **Bau-Frage** in der Kachel: ‚Soll ich Version AppDesign 4.55.0 / Reiselogbuch 3.53.0 mit APD-122, APD-123, APD-121 und RLB-119
   erstellen? (Kontext N)‘ – nach ‚Ja‘ bauen nach den Arbeitsdateien; jede neue Prüfung zuerst rot gegen 4.54.0 / 3.52.0 (0 Nr. 1); APD-123 mit der
   Anpassung von `tests/doku.mjs` (`checkCollab`, APD-123/D-9) und dem Kasten ‚Jede Antwort‘ neu; vor `los` die bestehenden Prüfungen anpassen
   (`ablauf-suche-*`, `checkSearchWords`, `checkSchichtOben`).

## 4. Danach

APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 · APD-80 · APD-30 übrige Teile · APD-57 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0091 – Rückmeldung Muster APD-115, danach Bau 4.55.0 / 3.53.0

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein und dazu arbeit/APD-123 Zusammenarbeit ohne Regelwächter Wortlaut.md (bestätigt, gilt ab sofort: Kachel am Ende, alles zum Lesen davor, keine Uhrzeit- und Zeitzeile) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json noch Hooks stehen. Lagebild als eigene Antwort, dann weiter nach UEBERGABE.md Abschnitt 3: Rückmeldung zum Muster APD-115 (arbeit/APD-115 Testfall-Liste.md), danach die Bau-Frage.
```
