# Übergabe an die nächste Sitzung

**Stand 06.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0085‘ (AppDesign 4.53.0 und Reiselogbuch 3.51.0 veröffentlicht, Usertest P-97 ausgewertet,
Messung zu P-97/6, Muster APD-120; Übergabe bei Kontext 301.986, 0 Nr. 13) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn
jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.51.0** veröffentlicht (Fassung 4.53.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.53.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.8.0** | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0086**; die danach 0087.
- **Modell und Aufwand:** in 0085 Opus 5.5 (`get_session`), Aufrufe `"effort":"high"`, kein `model_fallback`. Der Arbeitsprozess wurde mehrmals neu gestartet.
- **Regelwächter läuft** (Hooks `uhrzeit`, `fenster`, `stop`), seit 4.53.0 mit W-16 (‚(Kontext N)‘ in jeder Fensterfrage) und W-17.
- **Offene Usertests:** **P-97** – /0 bis /5, /7 bis /9, /11 ok; **/6 nicht ok** (→ APD-118), **/10 nicht ok** (→ APD-119).
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0085

- **Roter WebKit-Lauf nachgestellt** (`ablauf-gesamt`, unter Last 1 von 4 rot): die Prüfung klickte das Häkchen, während das Blatt noch hereinglitt (gemessen mit
  einer Messkopie) – Lücke der Prüfung, nicht der App. `ablauf-gesamt` (3 Schritte) und `ablauf-jahre` (Y-8) warten jetzt vor dem ersten Klick ins Blatt auf Ruhe;
  danach 6-mal grün unter Last. **`los` grün:** 144 Läufe in 61:29, nichts wackelt; AppDesign 4.53.0 (9572e87) und Reiselogbuch 3.51.0 (1e6ff9d), Pages ‚success‘.
- **P-97/6 gemessen** (`tests/messungen/2026-11-06 iPhone quer Mehr-Menü oberer Rand.txt`, iOS 18.7): Tipps bei y ≈ 20 auf die Sperrschicht liefern
  `pointerdown`/`pointerup`, aber **keinen click** → **APD-118 bereit** (Lösung, Testfall-Liste APD-118/X-1 bis X-9 und Regel Designrichtlinie 13 ‚Am oberen Rand kein
  Klick‘ – Wortlaut bestätigt, steht im Backlog).
- **P-97/10:** ‚Transparenz reduzieren‘ kommt in der Web-App nicht an → **APD-119 bereit** (Abweichung in Designrichtlinie 13 und R-3.9, Wortlaut bestätigt, im Backlog).
- **Bau-Frage 4.53.1 / 3.51.1 mit APD-118 und APD-119: ‚Nein‘** – der Nutzer will zuerst den Glas-Schalter.
- **Neu APD-120 (Prio 1): Glas in der App abschalten.** Muster online: https://g811141a.github.io/AppDesign/arbeit/APD-120%20Muster.html (A Schalter ‚Glas‘ als
  eigene Gruppe im Untermenü ‚Darstellung‘ – Empfehlung; B direkt im Mehr-Menü), Testfall-Liste `arbeit/APD-120 Testfall-Liste.md` (G-1 bis G-11). **Entschieden:**
  der Schalter gilt nur auf dem jeweiligen Gerät (wie ‚Darstellung‘, G-8/G-9). **Offen:** Variante A oder B (der Nutzer schreibt im Chat).
- **Selbstkritik 0085:** Lagebild nach einem Neustart ohne Text vor dem Fenster; eine geschätzte Uhrzeit (10:56 statt 10:54); mehrere Ausgaben ohne Uhrzeitzeile;
  einmal Zeitzeile vor dem Fenster; **Fenster zum Muster APD-120 ohne Link und Schritte davor** (nach einem Neustart) – der Link im Fenster lässt sich nicht kopieren.
  Vermutung (nicht belegt): W-15 prüft nach einem Neustart des Arbeitsprozesses die Ausgabe davor nicht.

## 3. Nächster Schritt

1. Lesen wie immer, **Lagebild als eigene Antwort mit Fenster** (APD-117); Repos dazuholen, Tests einrichten (AppDesign-`CLAUDE.md`).
2. **Zuerst im Chat Link und Schritte zum Muster APD-120 wiederholen**, dann im Fenster fragen: Variante A oder B?
3. Danach die Bau-Frage: AppDesign 4.53.1 / Reiselogbuch 3.51.1 (oder Nebenversion 4.54.0 / 3.52.0, weil der Schalter neu ist – Versionsart im Lagebild vorschlagen)
   mit APD-118, APD-119 und APD-120, mit Kontext in der Frage (0 Nr. 21). Erst bauen nach ‚Ja‘; Testfall-Listen stehen bereit.
4. Fragen: **Ins Backlog übernehmen – Regelwächter W-15 nach einem Neustart des Arbeitsprozesses** (Fenster mit Link ohne Link davor kam durch, Sitzung 0085)?
   Empfehlung Prio 1. Danach APD-117 (Wortlaut) und RLB-119.

## 4. Danach

APD-117 · RLB-119 · APD-115 · APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-113 übrige Teile (1) bis (4) · APD-85 Teil 6 · APD-80 · APD-30 übrige Teile · APD-57 ·
APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0086 – Glas-Schalter (APD-120) und Korrektur P-97 (APD-118, APD-119)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob der Regelwächter läuft. Gib das Lagebild als eigene Antwort mit Auswahlfenster (APD-117). Dann weiter nach UEBERGABE.md 3.: Link und Schritte zum Muster APD-120 im Chat, Frage Variante A oder B, dann die Bau-Frage mit APD-118, APD-119 und APD-120.
```
