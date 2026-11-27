# Übergabe APD-149 – Sitzung ‚AppDesign 0002‘ an ‚AppDesign 0003‘

**Stand 27.11.2026** · geschrieben in ‚AppDesign 0002 – APD-149 Muster im Bean-Katalog bauen‘ bei Kontext 329.988 (`messung.mjs`, ‚⚠ Übergabe fällig‘;
automatisch nach 0 Nr. 13, nach dem abgeschlossenen Schritt ‚Muster bauen und prüfen‘).
- Die Kette Reiselogbuch läuft **parallel** (Sitzung 0167, AppDesign 4.71.0 / Reiselogbuch 3.59.0 mit RLB-126). Darum steht diese Übergabe hier und nicht in
  `UEBERGABE.md`.
- Vorige Fassung dieser Datei (0001 → 0002): Git-Verlauf, Commit 7f79372.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | 3.58.5 (0167 baut 3.59.0) |
| AppDesign | 4.70.2 (0167 baut 4.71.0); von 0002 auf `main` nur `arbeit/` |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Chatnummer:** AppDesign-Kette, nächste Sitzung **AppDesign 0003**, danach 0004.
- **Modell und Aufwand:** 0002 lief mit Opus 5.5, Aufwand **hoch** (eingestellt und tatsächlich; kein `model_fallback`; `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt).
  Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** seven_day · allowed_warning (setzt am 03.12.2026 um 08:00 Uhr zurück).
- **Hooks:** keine (`~/.claude/settings.json` nur `create_session` erlauben).
- **Prüfumgebung:** 4 Kerne, Chromium 158 (Verweise 1194 → 1243), WebKit (Ordner 2215), Playwright 1.56.1.
- **Offene Usertests:** keine.

## 2. Ergebnisse der Sitzung 0002

- **Muster gebaut:** `katalog/entwurf/presentation-commands.js` mit den Beans `commands` und `presentation` (Grobentwurf V-3 2.1 und 2.2, H-1 bis H-9, J-3).
  `katalog/index.html` lädt die Datei und zeigt die Gruppe ‚Entwurf‘. Regeln aus dem Wortlaut J-1 eingehalten.
- **Liegt auf dem Zweig `apd-149-muster`**, nicht auf `main` (Übergabe 0001 Abschnitt 3.5: vor dem Hochladen fragen).
- **Automatisch geprüft, Chromium und WebKit:** APD-149/S-1 bis S-14 und APD-149/L-1 bis L-4 (RLB-126) mit 0 Fehlern; Gegenprobe S-15 rot wie verlangt;
  `bean-katalog` grün; Skript zum Wortlaut Abschnitt 4 grün (Gegenprobe `beans:entwurf` rot); `doku-regeln` grün.
- **Ein Fund der Grundregeln:** R-1.4 meldet `#app` nicht inert bei offenem Menü. Das folgt aus dem Durchlass (H-6, J-3) und braucht später eine Ergänzung
  der Regel und ihrer Prüfung (Wortlaut nach 0 Nr. 29).
- Alles Weitere: `arbeit/APD-149 0002 Bericht Muster.md` (Änderungen, Funde, 16 Schritte zum Ausprobieren mit ‚Erwartet‘). Lagebild:
  `arbeit/APD-149 0002 Lagebild.md`.

## 3. Nächster Schritt

1. Lesen, Lagebild als eigene Antwort mit Kachel (0 Nr. 15). Tests einrichten (CLAUDE.md, ReiseLogBuch dazuholen). `git fetch origin main` und den Zweig
   `apd-149-muster` holen (`git fetch origin apd-149-muster`).
2. **Bericht zeigen** (Datei `arbeit/APD-149 0002 Bericht Muster.md` und Chat) und im Fenster fragen: ‚Soll ich das Muster auf `main` hochladen (Pages)?‘
   - Vorher: Hat 0167 inzwischen `katalog/` oder `v4/` auf `main` geändert, den Zweig auf `origin/main` setzen und die Prüfungen erneut laufen lassen:
     `node arbeit/APD-149/muster-pruefen.mjs` (auch `PRUEF_BROWSER=webkit`, auch `APD149_GEGENPROBE=1`), `node arbeit/APD-149/entwurf-regeln.mjs`,
     im Reiselogbuch `node tests/bean-katalog.mjs` in beiden Browsern.
   - Grund der Frage: Der volle Lauf des Reiselogbuchs öffnet jede angemeldete Bean im Katalog, auch die im Entwurf. Läuft 0167 gerade voll, besser danach.
3. Nach dem Hochladen: Pages abwarten, dann Ausprobieren am iPad und iPhone nach den 16 Schritten im Bericht, Rückmeldung im Fenster.
4. Danach die Funde aus dem Bericht (R-1.4 und Durchlass, Escape am Fenster in v4, Listen-Ebene) mit dem Nutzer klären.

## 4. Danach

- `v5/` mit APD-145 (Namensraum `AD`, AppDesign 5.0.0), darin die Beans `commands` und `presentation` aus dem Entwurf.
- APD-150 wird durch S-3 gelöst. APD-148 und APD-142 bauen auf `presentation` und `commands`. `recentlydeleted` zieht mit `v5/` um (RLB-126/J-11).

## 5. Neue Vereinbarungen

- keine neuen. APD-149/J-1 kommt mit der nächsten AppDesign-Version in die Richtlinie (J-2).

## 6. Starttext für die neue Sitzung

```
AppDesign 0003 – APD-149 Muster hochladen und am Gerät prüfen

Lies im Repo g811141a/AppDesign (Branch main) zuerst arbeit/APD-149 Uebergabe.md, dann UEBERGABE.md (nur Lagebild, die Kette Reiselogbuch läuft parallel), dann die GANZE Zusammenarbeit allgemein (3.19.0) und die Überschriften der Designrichtlinien, dazu arbeit/APD-149 0002 Bericht Muster.md. Das Muster liegt auf dem Zweig apd-149-muster (git fetch origin apd-149-muster). Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL) und ob in ~/.claude/settings.json Hooks stehen; richte die Tests ein, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (ReiseLogBuch dazuholen). Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach arbeit/APD-149 Uebergabe.md Abschnitt 3: Bericht zeigen und fragen, ob das Muster auf main kommt; dann am Gerät prüfen. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```

**Name der neuen Sitzung:** ‚AppDesign 0003 – APD-149 Muster hochladen und am Gerät prüfen‘.
