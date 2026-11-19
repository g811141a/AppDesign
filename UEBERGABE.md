# Übergabe an die nächste Sitzung

**Stand 19.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0133‘. Übergabe nach dem Bau von APD-135 Paket 4; die Sitzung war schon zusammengefasst
(0 Nr. 13). Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15);
die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

> **Hinweis:** Alles liegt auf `main`: die Versionen, diese Datei und die Arbeitsdateien aus 0133 (`arbeit/0133 …`, `arbeit/APD-135 Paket 4 …`). Ein
> eigener Zweig ist nicht nötig.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.5** veröffentlicht (`main` 897aeb1, Pages ‚success‘) |
| AppDesign | **4.62.0** veröffentlicht (`main` 717684a, Pages ‚success‘; danach diese Übergabe) |
| ReiseLogBuch-Import (privat) | **1.4.0** (`main` 2ec7d03), unverändert |
| Zusammenarbeit allgemein | **3.15.0** |
| `CLAUDE.md` | AppDesign **2.14.0** · Reiselogbuch 3.10.0 · Import 1.2.0 |

- **Chatnummer:** Die nächste Sitzung heißt **Reiselogbuch 0134**, die danach 0135.
- **Modell und Aufwand:** 0133 lief mit **Opus 5.5** ohne `model_fallback`. Der Aufwand war zuerst **mittel** (Start am iPhone), der Nutzer hat ihn in der
  Sitzung auf **hoch** gestellt (`effort_level: high`). Hilfsagenten gab es keine. Festlegung (0122): Fable 5.2 vorerst nicht; Hilfsagenten nur mit Opus 5.5
  und Aufwand hoch, einzeln nacheinander.
- **Nutzungsgrenze:** `rate_limit_info` war in 0133 da: Fünf-Stunden-Grenze, Status ‚erlaubt‘, keine Überziehung.
- **Hooks:** `~/.claude/settings.json` war leer (`{}`).
- **Offener Usertest:** **P-112** (nur /0 ‚Version prüfen‘). Noch keine Rückmeldung; zu Beginn im Fenster fragen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** github.io und support.apple.com sind von hier gesperrt. developer.apple.com liefert die Doku als JSON.
  Das Import-Werkzeug `pruefen.mjs <Datei>` braucht **`--zone`**.
- **Voller Prüflauf:** 164 Läufe grün in **81:24** (0133).

## 2. Ergebnisse der Sitzung 0133

- **Gebaut: AppDesign 4.62.0 / Reiselogbuch 3.57.5 (APD-135 Paket 4).** Grundsatz APD-135/W-49 und die Paare APD-135/D-27 bis APD-135/D-39 in der Designrichtlinie
  allgemein, Designrichtlinie Reiselogbuch Abweichungen 1–3, 21 Stellen im `PROMPT.md` (APD-135/W-50).
- **Rest von APD-135/W-51:** Im `PROMPT.md` sind ‚seit X.Y.Z‘ beim Wischen und ‚rechtsbündig‘ bei ‚🚶🏽‍♂️km‘ gestrichen. Wortlaut bestätigt in der
  Arbeitsdatei 0133 zum Rest (Wortlaut, 18.11.2026).
- **Prüfung:** Das Paket-4-Skript war vorher rot (46 alt, 0 neu) und ist nachher grün; die Gegenproben sind rot. `doku-regeln` ist grün,
  `--gegenprobe schema` 20 von 20 rot, der volle Lauf grün. Testfall-Liste: `arbeit/APD-135 Paket 4 Testfall-Liste.md`; Bericht: `arbeit/0133 Bericht 4.62.0.md`.
- **Wackler R-7.2 (WebKit) behoben:** `tests/start-regeln.mjs` wartet nach dem Öffnen aus der Startliste auf `navFertig`.
- **Gegenproben APD-30 (Wischen):** APD-30/W-87 rot (26 Meldungen) und APD-30/W-88 rot (6), beide wie gefordert. **Offen:** APD-30/W-89, APD-30/W-96, APD-30/W-103, APD-30/W-104. APD-30/W-89 wurde an der
  30-min-Grenze des Hintergrundauftrags abgebrochen, darum jede einzeln als eigenen Auftrag starten, je ~13 min:
  `PRUEF_GEGENPROBE=wischen:W-n node tests/ablauf-wischen.mjs`.

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten, Lagebild als eigene Antwort (Chat und Datei) mit Kachel. Im Fenster nach der Rückmeldung zu
   **Usertest P-112** fragen (0 Nr. 22: erst prüfen, dann Neues).
2. Die Gegenproben APD-30/W-89, APD-30/W-96, APD-30/W-103, APD-30/W-104 einzeln nachholen; jede muss rot sein. Das Ergebnis kommt in die Zeile von APD-30 bzw. in die
   Testfall-Liste von APD-30.
3. **APD-135 Paket 5** (mit APD-135/J-20: G-8/G-16 als R-Regeln): Wortlaut vorlegen, dann bestätigen lassen.

## 4. Danach

APD-135 Pakete 6–7 · APD-136 Umbau der Elemente · RLB-125 klären (Prio 2) · RLB-126 (Prio 3) · APD-32 · APD-55 · RLB-6 · APD-1 · APD-70 · APD-57 · APD-62 ·
APD-44 bis APD-60 · zuletzt APD-80. Später: Sobald ein iOS-Update `print()` vom Home-Bildschirm wieder zulässt, den PDF-Hinweis (RLB-124) entfernen.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign**, **ReiseLogBuch** und **ReiseLogBuch-Import** verfügbar sein.

```
Reiselogbuch 0134 – Usertest P-112, Gegenproben APD-30, APD-135 Paket 5

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.15.0) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL), hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel, im Fenster die Rückmeldung zu Usertest P-112; danach weiter nach UEBERGABE.md Abschnitt 3 (Gegenproben APD-30/W-89, APD-30/W-96, APD-30/W-103, APD-30/W-104 einzeln, dann APD-135 Paket 5: Wortlaut vorlegen). Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```
