# Übergabe an die nächste Sitzung

**Stand 22.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0029‘ (Ende) – Aufbau nach Zusammenarbeit allgemein 2.5.
**Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.27.0** online (Fassung 4.29.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.29.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.18.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0030**; die danach 0031.
- **Sitzungsgröße:** Übergabe ab etwa **300.000** Token (0 Nr. 13); 0029 endete bei etwa 230.000.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch (0029: alle Aufrufe ‚high‘, `CLAUDE_CODE_EFFORT_LEVEL=high`) – prüfen nach 0 Nr. 15.
- **Offene Prüfpunkte:** keine.
- **‚0. Nächste Version‘:** **A-37** und **A-61/1** bereit – **Ja des Nutzers liegt vor** (22.10.2026): AppDesign 4.30.0 /
  Reiselogbuch 3.28.0.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0029 – A-37 und A-61 Teil 1 geklärt

- **A-37 ‚Nach oben / Ans Ende‘: B+C gewählt, allgemeine Regel**, Muster am Gerät abgenommen (inkl. Prüfpunkt 6). Kapsel zeigt nur
  wirksame Pfeile; dazu Schnellroll-Griff rechts wie Apple Fotos (ab drei Bildschirmhöhen, Bahn bis über die Kapsel, Blase mit
  `data-marke`). Entscheidet A-45. Fall-Liste `arbeit/A-37 Fall-Liste.md` (F-1 bis F-22), Muster `?v=bc` (`&tage=N` wählbar).
- **A-61 aufgeteilt:** Teil 1 Navigation (T-4, T-5, T-6, T-35, A-59), Teil 2 Blatt (T-15); **Wischaktionen T-10 erst mit A-30**
  (Rückgängig; dann wie Apple: Durchwischen löscht sofort).
- **A-61 Teil 1: Variante Überall gewählt, allgemeine Regel**, Muster abgenommen. Seitenwechsel als Schieben, Zurückwischen am
  iPhone von überall im Inhalt (iOS 26), am iPad hoch holt Wischen nach rechts von überall die Seitenleiste (Festlegung des
  Nutzers); nach der Auswahl schließt sie sich weiter (15.4, bestätigt). Fall-Liste `arbeit/A-61 Teil 1 Fall-Liste.md` (F-1 bis
  F-22), Muster `arbeit/A-61 Teil 1 Muster.html?v=ueberall`.
- **Gelernt:** Ein Prüfpunkt ist immer ein Handgriff mit erwartetem Ergebnis – keine Entscheidungsfrage (P 6 bei A-37 war nicht
  prüfbar); jede Festlegung einer Variante ausdrücklich für iPhone **und** iPad nennen (P 9 bei A-61: ‚Überall‘ galt nur am iPhone).
  github.io ist aus dem Container gesperrt – Pages-Läufe mit `mcp__github__actions_list` prüfen. Muster-Prüfskripte in `arbeit/`
  laufen aus dem Notizordner mit Verweis `node_modules` → `ReiseLogBuch/tests/node_modules`.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **Bauen: AppDesign 4.30.0 / Reiselogbuch 3.28.0** mit **A-37 B+C** und **A-61 Teil 1 Überall** (Ja liegt vor, 0 Nr. 21). Grundlage:
   die beiden Fall-Listen (jeder Fall eine automatische Prüfung, Chromium und WebKit, hell und dunkel), Muster als Vorlage für
   `ui.js`/`design.css`. Regeln: R-3.2 erweitern (`checkFab` für Kapsel und Griff), neue Regel für Navigation und Gesten mit
   Prüfung; Designrichtlinie 4, 15.1, 15.4, 15.17, 15.22, 13. Im Reiselogbuch `data-marke` an Tageskästen und Abschnitten.
   Ablauf nach AppDesign-`CLAUDE.md` ‚Veröffentlichen‘; vor `los` alle betroffenen Prüfungen einzeln (besonders `ablauf-iphone`,
   `kapsel-iphone`, `ablauf-seitenleiste-*`, `ablauf-tastatur-still`, Messmodus). Danach Bericht mit Prüfliste (0 Nr. 11).
2. Danach Prio 2: **A-61 Teil 2** Muster ‚Blatt‘ (T-15), **A-43** Barrierefreiheit.

## 4. Danach

A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen) · A-32 ‚Problem melden‘ · A-40 Prüfungen für G-1 bis G-19 · A-44 bis
A-60 · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0030 – AppDesign 4.30.0

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild. Dann baue AppDesign 4.30.0 / Reiselogbuch 3.28.0 mit A-37 B+C und A-61 Teil 1 Überall (Ja des Nutzers vom 22.10.2026 liegt vor) nach den Fall-Listen arbeit/A-37 Fall-Liste.md und arbeit/A-61 Teil 1 Fall-Liste.md und veröffentliche sie. Danach A-61 Teil 2 und A-43.
```
