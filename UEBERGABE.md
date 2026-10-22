# Übergabe an die nächste Sitzung

**Stand 22.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0027‘ (Ende) – Aufbau nach Zusammenarbeit allgemein 2.5.
**Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.26.2** online (Fassung 4.28.2) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.28.2** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.17.0** (2.18.0 bereit als A-41) | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0028**; die danach 0029.
- **Sitzungsgröße:** Übergabe wieder erst ab etwa **300.000** Token (Nutzer 22.10.2026, steht als A-41 bereit – gilt ab sofort);
  0027 endete bei etwa 280.000.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch (0027: alle Aufrufe ‚high‘) – prüfen nach 0 Nr. 15.
- **Offene Prüfpunkte:** keine.
- **AppDesign ‚0. Nächste Version‘ – 2 Punkte bereit:** A-41 Zusammenarbeit 2.18.0 (Übergabe ab 300.000; Hilfsagenten bzw.
  eigene Sitzungen parallel, wenn möglich und sinnvoll; 2.1 präzisiert) · A-42 Grundsatz ‚kein UI-Framework‘ in Designrichtlinie 1.
  Gebaut wird mit der nächsten Version (Nutzer: keine eigene Version dafür).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0027 – A-38 Frameworks abgeschlossen

- **Vergleich** Framework7 9.2.0 / Ionic 9.0.9 (Quelltext aus npm, drei Hilfsagenten parallel, ein vierter führte zusammen):
  https://g811141a.github.io/AppDesign/arbeit/A-38%20Framework-Vergleich.html – 66 Themen mit Apple, AppDesign-Fundstelle,
  Aufwand, Empfehlung (unabhängig vom Aufwand), dazu Gesamtvergleich (Z3), drei Wege mit Rückblick (Z4), weitere Kandidaten (Z5).
- **Grundsatz entschieden: Weg a) eigener Code**, kein Framework (A-42). Mischform verworfen; Capacitor (echte App) nur bei Bedarf.
- **Ins Backlog (AppDesign):** A-43 Barrierefreiheit (Prio 2) · **A-63 Paket C (Prio 1):** sichere Ränder als Variablen mit
  Prüfung (V1), Suche ohne Akzente, ⓧ in Feldern, Safaris Schalter · **A-61 Paket A (Prio 2):** Muster ‚Navigation und Gesten‘
  (inkl. Wischaktionen statt 15.4 und Blatt auf dem iPhone statt 15.17) · **A-62 Paket B (Prio 3):** ‚Antippen, Bewegung,
  Rollen‘ inkl. Glas · Paket D (Kurzmeldung, leere Zustände, Rückgängig statt Abfrage) → A-30 · A-44 bis A-54 (‚später‘, Prio 3)
  · A-55 bis A-60 (Neubewertung ‚zukunftsfit‘, Prio 3).
- **Gelernt zur App (in A-41):** Text am Anfang einer Antwort kommt vor dem Auswahlfenster an, Text zwischen zwei Fenstern
  derselben Antwort nicht – je Antwort ein Fenster mit Erklärung davor. Der Nutzer will Themen **einzeln**: ganze Zeile,
  Einschätzung, Kachel; mehrere Themen nacheinander → je Antwort eines, der Nutzer schreibt ‚w‘.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **A-63 Paket C** (Prio 1): Apple-Abgleich, Fall-Liste (0 Nr. 1); V1 zuerst als Prüfung rot gegen 4.28.2 (iPhone-Werte hoch
   oben 59 / unten 34 px, quer links und rechts 59 / unten 21 px). Dann Frage nach der Version: AppDesign 4.29.0 / Reiselogbuch
   3.27.0 mit A-63 und den bereiten A-41, A-42 (höchstens 2 Themen: Regeln + Paket C).
2. Danach Prio 2: **A-37** ‚Nach oben / Ans Ende‘ (Muster online: https://g811141a.github.io/AppDesign/arbeit/A-37%20Muster.html,
   Fall-Liste `arbeit/A-37 Fall-Liste.md` – Wahl der Variante), **A-61** Muster ‚Navigation und Gesten‘, **A-43** Barrierefreiheit.

## 4. Danach

A-62 Paket B · A-30 (mit Paket D) · A-32 ‚Problem melden‘ · A-40 Prüfungen für G-1 bis G-19 · A-44 bis A-60 · T-06
Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0028 – A-63 Paket C

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild. Dann A-63 Paket C (Prio 1) aus BACKLOG.md: sichere Ränder als Variablen mit Prüfung (V1), Suche ohne Akzente, ⓧ in einzeiligen Feldern, Safaris Schalter – Apple-Abgleich, Fall-Liste, dann Frage nach der Version mit A-41 und A-42. Danach A-37 (Prio 2).
```
