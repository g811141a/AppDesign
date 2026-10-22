# Übergabe an die nächste Sitzung

**Stand 22.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0028‘ (Ende) – Aufbau nach Zusammenarbeit allgemein 2.5.
**Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.27.0** online (Fassung 4.29.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.29.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.18.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0029**; die danach 0030.
- **Sitzungsgröße:** Übergabe ab etwa **300.000** Token (0 Nr. 13, seit Zusammenarbeit 2.18.0); 0028 endete bei etwa 422.000.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch (0028: alle Aufrufe ‚high‘, `CLAUDE_CODE_EFFORT_LEVEL=high`) – prüfen nach 0 Nr. 15.
- **Offene Prüfpunkte:** keine (P-63 alles ok, 22.10.2026).
- **AppDesign ‚0. Nächste Version‘:** nichts bereit.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0028 – A-63 Paket C, A-41, A-42

- **AppDesign 4.29.0 / Reiselogbuch 3.27.0** gebaut und veröffentlicht (66 Läufe grün), **P-63 alles ok**. Fall-Liste mit Ergebnis:
  `arbeit/A-63 Fall-Liste.md`.
- **R-1.7 sichere Ränder:** `env(safe-area-inset-…)` nur in `--safe-top/-bottom/-left/-right`; Prüfung `safe` (hig.mjs) in jeder
  gemessenen Ansicht mit Gerätewerten. Gefunden und behoben: iPad-Fenster unter der Home-Leiste, Menü und Sprechblase am iPhone quer,
  Abgleichbericht quer in Safari nicht ganz rollbar. Echte Ränder (iPhone 402 × 874, Home-Bildschirm): hoch 0/34/0/0, quer
  0/20/62/62 (`tests/messungen/2026-10-22 …`); der Messmodus nennt sie im Kopf.
- **R-2.3 Suche ohne Akzente**, **R-5.6 ⓧ in einzeiligen Feldern**, **R-5.7 Safaris Schalter** (Weg b: Safari zeichnet ihn, sonst
  unser Schalter 51 × 31).
- **A-41** Zusammenarbeit 2.18.0, **A-42** Designrichtlinie 1 ‚kein UI-Framework‘.
- **Neue Safari-Eigenheiten in 13:** rechter Innenabstand eines seitlich rollenden Bereichs zählt nicht; eingebauter Schalter.
- **Gelernt:** `los` brach zweimal ab, weil ich nicht alle betroffenen Prüfungen vorher einzeln laufen ließ (`ablauf-messung` prüft
  den Kopf der Messung; F-11 in `ablauf-suche-liste` misst die Geschwindigkeit der Suche) – bei Änderungen an Suche oder Messmodus
  diese beiden vorher einzeln laufen lassen.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **A-37** ‚Nach oben / Ans Ende‘ (Prio 2): Muster online https://g811141a.github.io/AppDesign/arbeit/A-37%20Muster.html, Fall-Liste
   `arbeit/A-37 Fall-Liste.md` – der Nutzer wählt die Variante (Heute · A · B · C oder Kombination); A-45/A-46 und Paket B (A-62)
   gehören thematisch dazu.
2. Danach Prio 2: **A-61** Muster ‚Navigation und Gesten‘, **A-43** Barrierefreiheit.

## 4. Danach

A-62 Paket B · A-30 (mit Paket D) · A-32 ‚Problem melden‘ · A-40 Prüfungen für G-1 bis G-19 · A-44 bis A-60 · T-06
Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0029 – A-37

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild. Dann A-37 ‚Nach oben / Ans Ende‘ (Prio 2) aus BACKLOG.md: Muster arbeit/A-37 Muster.html und Fall-Liste arbeit/A-37 Fall-Liste.md – frag nach der Variante. Danach A-61 und A-43.
```
