# Übergabe an die nächste Sitzung

**Stand 08.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0098‘ (Rückmeldung P-100, APD-125, Klärung und Muster APD-126/RLB-123; Übergabe nach
0 Nr. 13, Kontext über 270.000) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze
Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.54.0** veröffentlicht (Fassung 4.56.0) |
| AppDesign | **4.56.0** veröffentlicht |
| Zusammenarbeit allgemein | **3.10.0** (3.11.0 mit APD-125 bestätigt, kommt mit der nächsten Version) |
| AppDesign-`CLAUDE.md` | **2.11.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0099**; die danach 0100.
- **Modell und Aufwand:** in 0098 Opus 5.5 (`get_session`), alle Aufrufe `"effort":"high"`, kein `model_fallback`. `~/.claude/settings.json` = `{}` (keine Hooks).
  Der Arbeitsprozess wurde in 0098 mehrfach neu gestartet – danach fehlte einmal das Lagebild vor der Kachel (Anlass für APD-125).
- **Arbeitsweise – gilt ab sofort (APD-125, Wortlaut bestätigt 08.11.2026, `arbeit/APD-125 Datei vor jeder Kachel Wortlaut.md`):** vor **jeder** Kachel
  alle wichtigen Informationen der Antwort (Lagebild, Bericht, Wortlaut, Muster, Testlink, Schritte, alle offenen Usertests) in **einer Datei**
  (`SendUserFile`, `display: 'render'`) und ebenso im Chat – auch wenn die Frage nicht danach fragt, ohne Ausnahme; ‚(Kontext N)‘ in jeder Frage.
- **Offener Usertest:** **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – Rückmeldung 08.11.2026: **ok bis auf P-100/1** (→ RLB-123) **und P-100/2
  Schritt 3** (Feld gleitet zu schnell → APD-127). Bleibt unter ‚Prüfen‘, bis die Korrektur gebaut und geprüft ist.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages ist aus der Sitzung nicht erreichbar (Proxy) – Muster lokal per `file://` prüfen; ob Pages den Stand hat, zeigt
  `mcp__github__actions_list`. Testfall-Nummern in `arbeit/` nie mit `T-` (alte Nummer, `doku-regeln` rot) – z. B. `M-`.

## 2. Ergebnisse der Sitzung 0098

- **APD-125 ‚Datei vor jeder Kachel‘** – Wortlaut APD-125/V-1 bis V-3 bestätigt (Ja 08.11.2026), in AppDesign ‚0. Nächste Version‘ (1 Punkt bereit).
- **Neue Themen (Nutzer 08.11.2026, alle Prio 1):**
  - **APD-126** Eingabefelder: Cursor beim Aktivieren am Ende (neu R-5.11, im aktiven Feld Antippen an die Stelle – bewusste Abweichung von Apple),
    Textfelder leer einzeilig, wachsen und schrumpfen mit. **Wortlaut APD-126/W-1 bis W-7 bestätigt** (R-5.2 ‚nach einem Vorschlag klein weiter‘, 15.11
    44 px, R-4.5/13 ‚beim Aktivieren die letzte Zeile‘, dazu die beiden Punkte aus 0097: 15.22 ‚so weit wie nötig‘ und Spalte Prüfung R-4.5 mit
    `ablauf-feld-rollen`). **Muster ok** (iPad quer, iPhone hoch; `arbeit/APD-126/index.html`, gebaut mit `arbeit/APD-126 Muster bauen.mjs`,
    Prüfung `arbeit/APD-126 Muster prüfen.mjs` APD-126/M-1 bis M-11, Chromium und WebKit grün, Gegenprobe `PRUEF_V=heute` rot). Platzhalter im
    leeren Feld einzeilig mit ‚…‘ (iPhone hoch brach er sonst um). Alles in `arbeit/APD-126 RLB-123 Klärung und Wortlaut.md`.
  - **RLB-123** (Reiselogbuch, aus P-100/1): Vorschläge wieder **über** dem Verlauf-Feld; ein Vorschlag – auch ‚Sonstiges …‘ (statt leerer erster
    Zeile oben, RLB-94) – kommt nach der letzten Zeile, Cursor am Ende, danach klein (kein `capNext`); Feld leer einzeilig (APD-126). Muster ok
    (dasselbe Muster). Beim Bau `PROMPT.md` (Verlauf) anpassen.
  - **APD-127** (aus P-100/2 Schritt 3): alle Gleitbewegungen so schnell wie das Mehr-Menü (R-4.13: 0,35 s auf, 0,25 s zu, Kurve
    `cubic-bezier(.32,.72,0,1)`); heute verschieden (iPad-Fenster mit der Tastatur 0,25 s `ease`, ‚Titel antippen‘ 0,3–0,7 s, Seitenleiste eigene
    Kurve); das Rollen beim Öffnen der Tastatur macht zum Teil Safari – **zuerst messen** (0 Nr. 20, Muster mit Messung 2.7).
- Arbeitszweig `arbeit-apd-125` (AppDesign) = Stand von `main`; kann bleiben.

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten. **Lagebild als eigene Antwort – im Chat und als Datei – mit Kachel am Ende** (APD-125).
2. **APD-126 / RLB-123 fertig klären:** Muster iPad hoch und iPhone quer am Gerät (gleicher Link
   https://g811141a.github.io/AppDesign/arbeit/APD-126/index.html), dann beide nach ‚0. Nächste Version‘ (bereit).
3. **APD-127:** Messmuster (2.7) für das Gleiten beim Öffnen der Tastatur, Auswertung, dann Wortlaut ‚alle Gleitbewegungen wie das Mehr-Menü‘
   (0 Nr. 29), Testfall-Liste.
4. Dann die Bau-Frage (0 Nr. 8, 21): Korrekturversion AppDesign 4.57.0 / Reiselogbuch 3.55.0 mit APD-125, APD-126, RLB-123 (und APD-127, wenn
   geklärt) – höchstens 2 Themen, ggf. aufteilen.

## 4. Danach

APD-124 (berührt APD-126 – zusammen besprechen) · APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 (Wackler `ablauf-suche-woerter` und
`ablauf-seitenleiste-position` WebKit) · APD-80 · APD-30 übrige Teile · APD-57 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0099 – APD-126/RLB-123 fertig klären, APD-127 messen

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.10.0 plus APD-125: vor jeder Kachel alle wichtigen Informationen in einer Datei und im Chat) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Datei) mit Kachel, dann weiter nach UEBERGABE.md Abschnitt 3: Muster APD-126 iPad hoch und iPhone quer, danach APD-127 Messmuster (arbeit/APD-126 RLB-123 Klärung und Wortlaut.md).
```
