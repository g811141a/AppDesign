# Übergabe an die nächste Sitzung

**Stand 24.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0042‘ (Ende – Thema abgeschlossen, Übergabe vorgeschlagen und vom
Nutzer bestätigt, 0 Nr. 13) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md` (mit den Chromium-Verweisen für Chrome 153 unter ‚Tests einrichten‘).

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.31.0** online (Fassung 4.33.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.33.0** online (feste Fassungen 4.14.0–4.33.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0043**; die danach 0044.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15 (in 0042 beides richtig, Sitzungsdatei `"effort":"high"`).
- **Sitzungsgröße 0042:** etwa 245.000 Token.
- **Offene Prüfpunkte:** keine – **P-71 alles ok** (Nutzer 24.10.2026; AppDesign E-87, Reiselogbuch E-131: A-75, A-76, T-106
  abgeschlossen).
- **‚0. Nächste Version‘:** leer (beide Repos).
- **Backlog-Spitze:** **A-74 + T-105** (Prio 1) – Backup-Kachel nur, solange heute noch kein Backup erstellt wurde; allgemeine Regel
  (Ja 24.10.2026); **Apple-Abgleich, Muster und Fall-Liste fehlen**. Danach A-43 Teil 1 + T-100 (mit Fokus-Rahmen), A-43 Teil 2 + T-101.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0042

- **AppDesign 4.33.0 / Reiselogbuch 3.31.0 gebaut und veröffentlicht** (voller Lauf: 74 Läufe grün, Chromium und WebKit):
  - A-75 / T-106: Pfeile `chevron-left`/`-right` im freien Rand des Verlaufs der Auswahl-Kapsel (R-5.4, 15.12), `mountCap` mit
    ResizeObserver; Prüfungen `hig.mjs` (Pfeile) und `checkKapsel`, App `ablauf-kapsel-pfeile.mjs`.
  - A-76: neu **R-3.5** langes Drücken – `onLongPress` bricht bei mehr als 10 px Weg und beim Rollen der umgebenden Fläche ab
    (Safari meldet beim Ziehen der Leiste kein `pointercancel`, 13); Prüfung `checkLangDruecken`, App `ablauf-smiley-leiste.mjs` –
    gegen 4.32.2 rot (40 Meldungen).
- P-71 am Gerät: alles ok.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. Lagebild (kurz), dann **A-74 / T-105**: Apple-Abgleich (2.6), Muster (0 Nr. 6, zuerst hell und quer) und Fall-Liste (0 Nr. 1) in
   `arbeit/`. Zu klären (Backlog A-74): Mitternacht (Kachel kommt wieder), Backup auf dem anderen Gerät bzw. nach Abgleich, leere
   Liste, Suche, Platz der Liste und Menü über der Kachel (R-4.2), Offline-Zeile darunter, Prüfung `backup.mjs`; ‚Backup erstellen‘
   bleibt im Mehr-Menü.
2. Muster und Fall-Liste **am Anfang der Antwort bzw. als Datei vor dem Auswahlfenster** zeigen (2.1); bei der Fall-Liste
   ausdrücklich ‚nur lesen, ob ein Fall fehlt; testen erst mit der Prüfliste nach dem Bau‘. Gebaut wird erst nach einem Ja (0 Nr. 21).

## 4. Danach

A-43 Teil 1 + T-100 bauen (mit Fokus-Rahmen) · A-43 Teil 2 + T-101 bauen · A-72 iPad (Muster, Fall-Liste) · T-103 Prüfung
tastatur-still · A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen) · A-32 ‚Problem melden‘ · A-40 Prüfungen für G-1 bis G-19 ·
A-44 bis A-60 · A-70 Mehrsprachfähigkeit · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0043 – A-74 / T-105 Backup-Kachel nur, solange heute noch kein Backup erstellt wurde (Apple-Abgleich, Muster, Fall-Liste)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (mit den Chromium-Verweisen unter ‚Tests einrichten‘). Gib kurz das Lagebild und beginne dann mit A-74 / T-105 nach UEBERGABE.md 3 (Apple-Abgleich, Muster, Fall-Liste – noch nicht bauen).
```
