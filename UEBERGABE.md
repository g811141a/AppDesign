# Übergabe an die nächste Sitzung

**Stand 30.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0054‘ (Version 4.41.0 / 3.39.0 mit APD-81 und APD-89, Usertest P-79)
– Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.39.0** (Fassung 4.41.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.41.0** (feste Fassungen 4.14.0–4.41.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md`, `ZUORDNUNG.md` |
| Zusammenarbeit allgemein | **3.1.0** | `README - Zusammenarbeit allgemein.md` (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in 0, neu 0 Nr. 29) |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0055**; die danach 0056.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – in 0054 alle Aufrufe so (Sitzungsdatei), kein `model_fallback`.
- **Sitzungsgröße 0054:** etwa 300.000 Token (‚⚠ Übergabe fällig‘ nach dem Bericht) – Übergabe nach 0 Nr. 13.
- **Regelwächter läuft** (Setup-Skript): Uhrzeitzeile nach jeder Nachricht und jedem Werkzeug.
- **Offene Usertests:** keine (P-79 alles ok, 30.10.2026).
- **Backlog-Spitze:** ‚0. Nächste Version‘ leer (0 Punkte bereit). Offen Prio 1: APD-85, APD-38; Prio 2: APD-87, APD-90, APD-91, APD-92,
  RLB-108, RLB-109, RLB-110; Prio 3: APD-80, APD-88 u. a.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0054

- **Version 4.41.0 / 3.39.0 veröffentlicht** (AppDesign d5df037, Reiselogbuch 939051f auf `main`, beide Pages ‚success‘), voller Prüflauf
  118 Läufe grün (101:20 min, `--jobs 2`). Der erste `los`-Lauf brach nach 57 grünen Läufen durch einen Neustart der Sitzung ab (nichts auf
  `main`); der zweite lief durch.
- **APD-81:** ⓧ auch in `textarea` (oben rechts auf Höhe der ersten Zeile; mehr als eine sichtbare Zeile erst nach der Sprechblase ‚Text
  löschen?‘; `choosePop`/`confirmPop` mit `{ feld }` – Fokus und Tastatur bleiben im Feld); Leeren in allen Feldern über
  `execCommand('delete')` mit Rückfall auf den Wert; R-5.6, 15.11, 13, 16; `checkClear` APD-81/C1 bis C15, Reiselogbuch `regeln-ablauf` C16.
  Gegenproben (Wert, mittig, keine Sprechblase) rot in Chromium und WebKit. **P-79 alles ok** (Nutzer 30.10.2026).
- **APD-89:** Zusammenarbeit 3.1.0, 0 Nr. 29 ‚Regeln nur mit Genehmigung‘ (Wortlaut wie bestätigt) und im Kasten ‚Immer‘.
- **Selbstkritik 0054:** eine Uhrzeitzeile (01:08) selbst gesetzt statt vom Wächter übernommen; ein Skript zum Nachtragen der Elternnummer
  (APD-81/M-…) veränderte kurz auch alte Zeilen – vor dem Commit zurückgenommen, `doku-regeln` grün. Lange Läufe mit Warteschleifen von
  höchstens 10 min abwarten (Werkzeuggrenze).

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild (Modell aus der Sitzungsdatei); Regelwächter.
2. Kein Auftrag mit Ja offen: **Startfrage** (0 Nr. 19) ‚Was möchtest du als Nächstes tun?‘ – Empfehlung APD-85 (Prio 1, voller Prüflauf
   in WebKit unter Last; in 0054 dauerte er mit `--jobs 2` 101 min).

## 4. Danach

APD-85 · APD-38 · APD-92 / RLB-108 · APD-87 · APD-90 · APD-91 (mit APD-57) · RLB-109 · RLB-110 · APD-80 · APD-88 · APD-62 Paket B ·
APD-30 · APD-32 · APD-40 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`).

```
Reiselogbuch 0055 – Startfrage (nächstes Thema)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild und stelle dann die Startfrage (0 Nr. 19) mit Empfehlung (UEBERGABE.md 3).
```
