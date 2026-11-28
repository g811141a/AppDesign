# Übergabe an die nächste Sitzung

**Stand 28.11.2026** · geschrieben in ‚AppDesign 0009 – Bau v5/ (AppDesign 5.0.0)‘ bei Kontext rund 290.000 (`messung.mjs`). Die Übergabe ist vorgezogen (0 Nr. 13): Der Bau von RLB-130 braucht eine frische Sitzung (Nutzer 28.11.2026, im Fenster: „Ja, in AppDesign 0010“).
- Es gibt nur noch die Kette AppDesign für beide Apps (Ketten zusammengeführt, 27.11.2026).
- `arbeit/APD-149 Uebergabe.md` gilt weiter für den Bau `v5/`. Er kommt **nach** RLB-130.
- Vorige Fassung dieser Datei (Reiselogbuch 0171): Git-Verlauf, Commit `e3a36c1`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.59.2** veröffentlicht (`a1d4e3e`, Pages ‚success‘) |
| AppDesign | **4.71.0**; seither auf `main` nur Backlog, Arbeitsdateien, Übergaben, Entwurf |
| ReiseLogBuch-Import | 1.4.1 |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` | AppDesign 2.14.0 · Reiselogbuch 3.10.0 · Import 1.2.0 |

- **Chatnummer:** Die nächste Sitzung heißt **AppDesign 0010 – Korrektur RLB-130 (Reiselogbuch 3.59.3, AppDesign 4.71.1)**, danach 0011.
- **Modell und Aufwand:** 0009 lief mit Opus 5.5, Aufwand hoch, eingestellt und tatsächlich gleich. Es gab keinen `model_fallback`, `CLAUDE_CODE_EFFORT_LEVEL` war ungesetzt.
  - Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander; Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** 7 Tage, ‚allowed_warning‘, setzt am 03.12.2026 um 07:00 UTC zurück.
- **Sitzungskette:** 0009 hatte `lineage` Tiefe 0 von 8 und startet 0010 selbst.
- **Hooks:** keine.
- **Prüfumgebung** (in 0009 eingerichtet): 4 Kerne, Playwright 1.56.1, Chromium 158.0.8127.36 (Verweise 1194 → 1243), WebKit 26.0; `lauf-selbsttest` grün.
- **Offener Usertest:** **P-128 fehlgeschlagen** (P-128/1 Schritt 4, P-128/2 Schritte 4 und 6), wird ersetzt durch P-129 mit 3.59.3.

## 2. Ergebnisse der Sitzung 0009

- **P-128 nicht ok:** Zurück quer stand das 1. Reiselogbuch oben statt des 3., mit Kontextmenü hing das Menü an einem anderen Eintrag. Eingetragen: RLB-130.
- **Zwei Messungen am iPad Pro 2024** (Auszüge `arbeit/RLB-130/`): Zurück quer ändert sich der Rollstand gar nicht. Er bleibt auf dem Wert von hochkant (231 → 0 → 0, 339 → 0 → 0, 303 → 135 → 135).
- **Ursache** (Vermutung, gestützt auf beide Messungen): Safari meldet beim Drehen `resize`, bevor die Seitenleiste (`position: fixed`) ihre neue Höhe hat. Die App stellt in diesem `resize` zurück, und Safari kürzt den Rollstand auf den alten Rollweg.
- **Das Modell trifft beide Messungen** (Seitenleiste behält beim `resize` die alte Höhe, die neue 4 ms danach): Mit 3.59.2 ist es rot wie am Gerät, in Chromium und WebKit.
- **Korrektur ausprobiert:** `ResizeObserver` an `#side` stellt erneut zurück, solange gedreht wird (`sideTurning()`). Damit war alles grün. Der Versuch ist wieder entfernt, nichts gebaut.
  - Der ausprobierte Code: `function sideRestore()` mit dem Inhalt des bisherigen Blocks am Ende des `resize`-Hörers in `index.html` (`sideTopHold`, `sideFollowInView`, `sideMenuRow` / `sideRowInView`, `sideScroll`, `sideKept = true`), der Hörer ruft `sideRestore()`, dazu `new ResizeObserver(() => { if (sideTurning()) sideRestore(); }).observe(side);`.
  - Das Versuchsskript (nicht im Repo) setzte vor `setViewportSize` an `#side` `bottom: auto; height: <alte Höhe>px` und hob das in einem zuerst angemeldeten `resize`-Hörer mit `setTimeout(…, 4)` wieder auf.
- **Entscheidungen** (`arbeit/RLB-130 0009 Entscheidungen.md`): Möglichkeit A, keine neuen Testfälle, Bau-Frage Ja (3.59.3 / 4.71.1, voll); der Wortlaut 0 Nr. 25, 0 Nr. 1 und 0 Nr. 2 ist freigegeben.

## 3. Nächster Schritt (für AppDesign 0010)

1. Lagebild als eigene Antwort mit Kachel (0 Nr. 15).
2. Dem Nutzer den **Wortlaut für Designrichtlinie 13** zur Freigabe vorlegen (Abschnitt 4 in `arbeit/RLB-130 Auswertung und Testfall-Liste.md`), dann bauen:
   - Zweige `vorbereitung-4.71.1` / `vorbereitung-3.59.3`, dann `vorbereiten --ad 4.71.1 --app reiselogbuch=3.59.3`.
   - **AppDesign 4.71.1:**
     - `tests/safari.mjs` bekommt das Modell `festNachResize` mit Kopfabsatz und Quelle.
     - Designrichtlinie 13 bekommt den neuen Punkt.
     - Zusammenarbeit wird 3.20.0 mit dem freigegebenen Wortlaut (0 Nr. 25, 0 Nr. 1, 0 Nr. 2). Die Versionsgeschichte bekommt eine Zeile, `checkCollab` muss grün sein.
     - AD-Bean: keine, weil nur Prüfung und Richtlinien.
   - **Reiselogbuch 3.59.3:**
     - Die Korrektur nach Abschnitt 2. Dabei prüfen, ob sie das Zurückstellen im `resize` ganz ersetzt.
     - `ablauf-seitenleiste-drehen` dreht mit `festNachResize` und der Fenstergröße des iPads (quer 1194 × 802, hoch 834 × 1162). Neue Testfälle gibt es nicht.
     - RLB-129/T-2, T-3, T-4 und T-5 müssen gegen 3.59.2 rot sein (`PRUEF_APP`) und mit der Korrektur grün.
     - Wird eine andere Drehprüfung mit dem Modell rot, vorher fragen.
     - `ablauf-jahre` muss grün bleiben.
   - CHANGELOG mit Usertest **P-129** (ersetzt P-128): /0 Version 3.59.3 / AppDesign 4.71.1, dann die Schritte von P-128/1 und P-128/2. Dazu Backlogs und Versionsgeschichten.
   - Dann `fassung`, `stufe` (erwartet: voll) und `los` im Hintergrund.
3. Bericht mit P-129 (0 Nr. 11). Dabei nennen, warum die Prüfung den Fehler übersah: Das Drehen am iPad war nie gemessen, und das Modell kannte die Eigenheit nicht.
4. Danach `v5/` nach `arbeit/APD-149 Uebergabe.md` Abschnitt 3.
   - Es setzt auf 4.71.1 / 3.59.3 auf: `v5/` als Kopie von `v4/` mit 4.71.1, Reiselogbuch 3.60.0.
   - APD-153 bringt dann Zusammenarbeit **3.21.0** statt 3.20.0.
   - Das Ja zum Bau liegt vor (AppDesign 0008).

## 4. Danach

- APD-147 mit 0 Nr. 2 ‚Eine Bean wird einmal geprüft‘ (das Werkzeug ordnet die Prüfungen den Beans zu); vorher zählen, wie viel Zeit es spart.
- APD-142 mit ‚Lage der Seitenleiste beim Drehen behalten‘ als Bean.
- Die Regel zu parallelen Ketten klären (`arbeit/APD-149 0004 Parallele Ketten.md`). Es läuft nur noch eine Kette.

## 5. Neue Vereinbarungen

- **Freigegeben, eingetragen mit 4.71.1:**
  - **0 Nr. 25:** Möglichkeiten der Umsetzung, bei einem einfachen Einbau eine oder zwei, sonst drei. Neue Funktionen vorrangig als AD-Bean, dazu je die neuen Testfälle und die längere Bauzeit.
  - **0 Nr. 1:** Vorhandene Prüfungen erweitern statt neue anlegen.
  - **0 Nr. 2:** ‚Eine Bean wird einmal geprüft‘. Das gilt erst mit dem Werkzeug aus APD-147.
  - Der Wortlaut steht in `arbeit/RLB-130 0009 Entscheidungen.md`.
- **Der Nutzer wünscht wenige Testfälle und einen zügigen Bau.**
  - Erst überlegen, wie eingebaut wird, dann prüfen.
  - Keine langen Testfall-Listen, wenn vorhandene Prüfungen genügen.

## 6. Starttext für die neue Sitzung

In der Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein.

```
AppDesign 0010 – Korrektur RLB-130 (Reiselogbuch 3.59.3, AppDesign 4.71.1)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.19.0), die Überschriften der Designrichtlinien, dazu arbeit/RLB-130 0009 Entscheidungen.md, arbeit/RLB-130 Auswertung und Testfall-Liste.md und die Backlogs bis ‚## Erledigt‘. Prüfe Modell und Aufwand (get_session, Sitzungsdatei, CLAUDE_CODE_EFFORT_LEVEL) und Hooks; hole g811141a/ReiseLogBuch dazu und richte die Tests ein wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach UEBERGABE.md Abschnitt 3: Wortlaut Designrichtlinie 13 vorlegen, dann Bau Reiselogbuch 3.59.3 mit AppDesign 4.71.1 (RLB-130, Ja des Nutzers liegt vor, Sitzung AppDesign 0009), Prüflauf voll, keine neuen Testfälle; danach v5/. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander; Fable 5.2 vorerst nicht verwenden.
```

**Name der neuen Sitzung:** ‚AppDesign 0010 – Korrektur RLB-130 (Reiselogbuch 3.59.3, AppDesign 4.71.1)‘.
