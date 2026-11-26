# Übergabe APD-149 – Konzept-Chat an die Muster-Sitzung

**Stand 26.11.2026**
- Geschrieben im Konzept-Chat ‚AppDesign Framework Steuer-Bean Konzept‘ bei Kontext 262.824 (`messung.mjs`). Die Übergabe kommt vor dem Muster, weil es nicht
  sicher bis 300.000 passt. Der Nutzer war im Fenster einverstanden.
- Der Konzept-Chat lief **parallel** zur Sitzung ‚Reiselogbuch 0165‘ (RLB-126). Deshalb steht diese Übergabe hier und nicht in `UEBERGABE.md`. Die
  Hauptübergabe schreibt die RLB-126-Kette.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | 3.58.5 (unverändert) |
| AppDesign | 4.70.2 (unverändert, nur Doku in `arbeit/` und Backlog) |
| Zusammenarbeit allgemein | 3.19.0 |
| `CLAUDE.md` AppDesign | 2.14.0 |

- **Modell und Aufwand:**
  - Opus 5.5; Aufwand **hoch**, eingestellt und tatsächlich.
  - Der Chat begann mit **mittel**. Der Nutzer hat auf hoch umgestellt.
  - Kein `model_fallback`; `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Hilfsagenten:** nur Opus 5.5, Aufwand hoch, einzeln nacheinander (auch web-fetch); Fable 5.2 vorerst nicht.
- **Nutzungsgrenze:** five_hour · allowed.
- **Offene Usertests:** keine.

## 2. Ergebnisse

- **Recherche:**
  - Runde 1: `arbeit/0164 APD-149 Recherche und Varianten.md`
  - Runde 2 und die Frage nach Open Source: `arbeit/APD-149 Recherche.md`
  - Ergebnis: Keine Open-Source-Lösung deckt Befehle und Stapel zusammen ab. Wir bauen nach Vorbild nach: Lumino, VS Code, Lion, Spectrum, Apple.
- **Entwurf:** `arbeit/APD-149 Grobentwurf V-3.md`
  - Abschnitte 2 bis 5: Beans, Grundsätze, Beispiel, Testfall-Liste.
  - Abschnitte 8 bis 10: die Antworten des Nutzers.
- **Entschieden (Nutzer, im Fenster):**
  - V-3, nachgebaut ohne fremde Abhängigkeit.
  - HIG-Grundsätze H-1 bis H-9 im Entwurf.
  - Namen `commands` und `presentation`.
  - Durchlass in der Kopfzeile wie bei Apple (H-6).
  - Muster als **Entwurf im Bean-Katalog** (W-1), nicht als eigene Muster-App.
  - Die Beans kommen standardmäßig in den Bean-Katalog (gilt schon nach R-1.13).
  - Mindestversion iOS 26.2 (aus 0164).
- Keine Regeländerung, kein Bau.

## 3. Nächster Schritt – Muster im Bean-Katalog (W-1)

1. Lesen, Lagebild als eigene Antwort mit Kachel (0 Nr. 15). App-Repos nur, wenn nötig; Tests einrichten (CLAUDE.md).
2. Den **Wortlaut alt und neu** für Designrichtlinie 14 vorlegen. Heute steht dort „lädt immer `v4/`“. Neu kommen Beans im Entwurf dazu, zum Beispiel
   `katalog/entwurf/`, unter ‚Entwurf‘ in der Seitenleiste. Dazu `checkBeans` beschreiben. Fenster ‚Ja/Nein‘ (0 Nr. 29). Erst nach ‚Ja‘ weiter.
3. Vor dem Muster das **heutige Verhalten im Reiselogbuch** prüfen: Tippen auf eine andere Schaltfläche der Kopfzeile bei offenem Menü (H-6).
   Dazu der Apple-Abgleich (2.6).
4. `katalog/entwurf/presentation-commands.js` nach Grobentwurf 2.1 und 2.2. Ausprobieren:
   - Kopfzeile mit zwei Menüs und Untermenü
   - Fenster und Hinweisfenster
   - Teilen
   - Protokoll des Stapels
5. Die Fälle S-1 bis S-15 automatisch gegen die Katalogseite (Chromium und WebKit), dazu die Gegenprobe S-15.
6. Bericht mit Link, nummerierten Schritten und ‚Erwartet‘. Vor dem Hochladen auf `main` fragen (0 Nr. 21; kein Release, aber Pages).

## 3a. Abstimmung mit RLB-126 (Nachricht aus Reiselogbuch 0165, 26.11.2026)

- RLB-126 baut die AD-Bean `recentlydeleted`. Das Muster ist am iPad quer ok, der Wortlaut ist freigegeben (J-10):
  - neue Regel R-7.10
  - R-4.12 mit der Ausnahme ‚Löschen nach Zuletzt gelöscht fragt nicht‘
  - R-7.8 bekommt einen Satz
  - Unterlagen: `arbeit/0165 RLB-126 Muster.md`, `arbeit/0164 RLB-126 AD-Bean recentlydeleted Aufteilung.md`.
- **Fälle für die Steuer-Bean:** Abfrage ‚Endgültig löschen‘, Kontextmenü und Wischen ‚Wiederherstellen‘, Vorschau mit Hinweis und die neue
  Listen-Ebene in der Seitenleiste (Kopf ‹, Zurück, Fokus). Im Muster als zusätzliche Fälle prüfen, ob `presentation` und `commands` sie abdecken.
  Die Befehle `restore` und `purge` sind gute Beispiele für H-7 (Darstellung je Ort).
- **Laut Nachricht wartet der Bau von RLB-126 auf die Abstimmung.**
  - Vorschlag (noch nicht entschieden): `recentlydeleted` in 4.x wie bisher bauen, mit `openMenu` und `swipeactions`. Sie zieht mit `v5/` auf
    `commands`/`presentation` um, damit RLB-126 nicht auf das Framework warten muss.
  - Das entscheidet der Nutzer.

## 4. Danach

- `v5/` mit APD-145: Namensraum `AD`, AppDesign 5.0.0.
- APD-150 wird durch S-3 gelöst.
- APD-148 und APD-142 bauen auf `presentation` und `commands`.

## 5. Starttext für die neue Sitzung

```
AppDesign 0001 – APD-149 Muster im Bean-Katalog (Framework mit Steuer-Bean)

Lies im Repo g811141a/AppDesign (Branch main) zuerst arbeit/APD-149 Uebergabe.md, dann UEBERGABE.md (nur Lagebild, die Kette RLB-126 läuft parallel), dann die GANZE Zusammenarbeit allgemein (3.19.0) und die Überschriften der Designrichtlinien, dazu arbeit/APD-149 Grobentwurf V-3.md. Prüfe Modell und Aufwand (get_session: eingestellt, dazu rate_limit_info; Sitzungsdatei: tatsächlich, auch model_fallback; Umgebungsvariable CLAUDE_CODE_EFFORT_LEVEL) und ob in ~/.claude/settings.json Hooks stehen; richte die Tests ein, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (ReiseLogBuch dazuholen). Lagebild als eigene Antwort (im Chat und als Markdown-Datei) mit Kachel; danach nach arbeit/APD-149 Uebergabe.md Abschnitt 3: zuerst den Wortlaut für Designrichtlinie 14 (Beans im Entwurf im Bean-Katalog) alt/neu vorlegen und im Fenster fragen. Hilfsagenten nur mit Opus 5.5 und Aufwand hoch, einzeln nacheinander, auch web-fetch; Fable 5.2 vorerst nicht verwenden.
```

**Name der neuen Sitzung:** ‚AppDesign 0001 – APD-149 Muster im Bean-Katalog‘. Eine eigene Nummernkette für AppDesign, weil die Reiselogbuch-Kette
parallel weiterläuft. Der Nutzer kann das ändern.
