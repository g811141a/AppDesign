# Übergabe an die nächste Sitzung

**Stand 28.11.2026** · geschrieben in ‚AppDesign 0010 – Korrektur RLB-130 (Reiselogbuch 3.59.3, AppDesign 4.71.1)‘ bei Kontext rund 250.000 (`messung.mjs`). Das Thema RLB-130 ist abgeschlossen. Der Bau von `v5/` passt nicht mehr unter 300.000. Deshalb übergebe ich vorzeitig (0 Nr. 12, 13; Nutzer 28.11.2026, im Fenster: „Ja, übergeben“).
- Es gibt nur eine Kette, AppDesign, für beide Apps.
- `arbeit/APD-149 Uebergabe.md` gilt weiter für den Bau von `v5/`.
- Vorige Fassung dieser Datei (AppDesign 0009): Git-Verlauf, Commit `7ca0260`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.59.3** veröffentlicht (`bf41f86`, Pages ‚success‘); danach auf `main` nur das Backlog (`182c4ae`) |
| AppDesign | **4.71.1** veröffentlicht (`d61961e`, Pages ‚success‘); danach auf `main` nur Backlog und diese Übergabe |
| ReiseLogBuch-Import | 1.4.1 (laut voriger Übergabe, nicht angehängt) |
| Zusammenarbeit allgemein | **3.20.0** |
| `CLAUDE.md` | AppDesign 2.14.0 · Reiselogbuch 3.10.0 · Import 1.2.0 |

- **Chatnummer:** Die nächste Sitzung heißt **AppDesign 0011 – Bau v5/ (AppDesign 5.0.0, Reiselogbuch 3.60.0)**, danach 0012.
- **Modell und Aufwand:** 0010 lief mit Opus 5.5, Aufwand hoch, eingestellt und tatsächlich gleich. Es gab keinen `model_fallback`, `CLAUDE_CODE_EFFORT_LEVEL` war ungesetzt.
  - Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander; Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** 7 Tage, ‚allowed_warning‘, setzt am 03.12.2026 um 07:00 UTC zurück.
- **Sitzungskette:** 0010 hatte `lineage` Tiefe 1 von 8 und startet 0011 selbst.
- **Hooks:** keine.
- **Prüfumgebung** (in 0010 eingerichtet): 4 Kerne, Playwright 1.56.1, Chromium 158.0.8127.36 (Verweise 1194 → 1243), WebKit (Build 2215); `lauf-selbsttest` grün.
- **Offene Usertests:** keine. P-129 ist ok (Nutzer 28.11.2026) und ersetzt die fehlgeschlagenen P-128 und P-127.

## 2. Ergebnisse der Sitzung 0010

- **Wortlaut Designrichtlinie 13 freigegeben** (im Fenster). Gegenüber dem Entwurf ist nur der Prüfverweis anders: RLB-129/T-2 bis T-5 statt der entfallenen Liste RLB-130/T-1 bis T-9.
- **AppDesign 4.71.1:**
  - Safari-Modell `festNachResize` in `tests/safari.mjs`: das feste Element behält seine alte Höhe bis 4 ms nach `resize`.
  - Designrichtlinie 13 hat den neuen Punkt.
  - Zusammenarbeit 3.20.0 mit 0 Nr. 25, 1 und 2.
- **Reiselogbuch 3.59.3:**
  - `sideRestore()` und ein `ResizeObserver` an `#side`, nur solange gedreht wird.
  - Das Zurückstellen im `resize` bleibt. Ohne es war die Prüfung in Chromium auch grün, aber es gilt auch bei Größenänderungen ohne Drehen.
  - `ablauf-seitenleiste-drehen` dreht am iPad wie gemessen (1194 × 802 / 834 × 1162, mit `festNachResize`).
  - Gegen 3.59.2 waren RLB-129/T-2 bis T-5 in Chromium und WebKit rot, mit der Korrektur grün.
- **Voller Prüflauf:** alle 198 Läufe grün (88:51), kein Lauf hat gewackelt.
- **P-129 alles in Ordnung** – am Gerät bestätigt.

## 3. Nächster Schritt (für AppDesign 0011)

1. Lagebild als eigene Antwort mit Kachel (0 Nr. 15).
2. Bau `v5/` nach `arbeit/APD-149 Uebergabe.md` Abschnitt 3 (das Ja zum Bau liegt aus AppDesign 0008 vor):
   - `v5/` als Kopie von `v4/` mit dem Stand 4.71.1, Reiselogbuch 3.60.0.
   - APD-153 bringt die Zusammenarbeit **3.21.0** (nicht 3.20.0, die ist mit 4.71.1 vergeben).
   - Die 7 bereiten Punkte im AppDesign-Backlog: APD-149/J-1, APD-152, APD-153, APD-151, APD-145, APD-149 (Beans), APD-154.
3. Bericht mit Usertest (0 Nr. 11), nächster Usertest P-130.

## 4. Danach

- APD-147 mit 0 Nr. 2 ‚Eine Bean wird einmal geprüft‘ (das Werkzeug ordnet die Prüfungen den Beans zu); vorher zählen, wie viel Zeit es spart.
- APD-142 mit ‚Lage der Seitenleiste beim Drehen behalten‘ als Bean.
  - Dabei `sideRestore` / `ResizeObserver` aus `index.html` mitnehmen.
- Die Regel zu parallelen Ketten klären (`arbeit/APD-149 0004 Parallele Ketten.md`).

## 5. Neue Vereinbarungen

- **Eingetragen mit 4.71.1:** Zusammenarbeit 3.20.0 mit 0 Nr. 25, 0 Nr. 1 und 0 Nr. 2. 0 Nr. 2 gilt erst mit dem Werkzeug aus APD-147.
- **Designrichtlinie 13:** neuer Punkt ‚Feste Elemente bekommen ihre neue Größe erst nach `resize`‘.
- **Der Nutzer wünscht** wenige Testfälle und einen zügigen Bau: erst überlegen, wie eingebaut wird, dann prüfen.

## 6. Starttext für die neue Sitzung

In der Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein.

```
AppDesign 0011 – Bau v5/ (AppDesign 5.0.0, Reiselogbuch 3.60.0)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.20.0), die Überschriften der Designrichtlinien, dazu arbeit/APD-149 Uebergabe.md und die Backlogs bis ‚## Erledigt‘. Prüfe Modell und Aufwand (get_session, Sitzungsdatei, CLAUDE_CODE_EFFORT_LEVEL) und Hooks; hole g811141a/ReiseLogBuch dazu und richte die Tests ein wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach UEBERGABE.md Abschnitt 3: Bau v5/ (AppDesign 5.0.0, Reiselogbuch 3.60.0) nach arbeit/APD-149 Uebergabe.md Abschnitt 3 (Ja des Nutzers liegt vor, Sitzung AppDesign 0008), Zusammenarbeit 3.21.0 mit APD-153. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander; Fable 5.2 vorerst nicht verwenden.
```

**Name der neuen Sitzung:** ‚AppDesign 0011 – Bau v5/ (AppDesign 5.0.0, Reiselogbuch 3.60.0)‘.
