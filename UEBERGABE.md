# Übergabe an die nächste Sitzung

**Stand 21.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0026‘ (Ende) – Aufbau nach Zusammenarbeit allgemein 2.5.
**Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.26.2** online (Fassung 4.28.2) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.28.2** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.17.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0027**; die danach 0028.
- **Sitzungsgröße:** Übergabe ab etwa 150.000 Token Kontext (Zusammenarbeit 0 Nr. 13); 0026 endete deutlich darüber.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch (0026: alle Aufrufe ‚high‘) – prüfen nach 0 Nr. 15.
- **Offene Prüfpunkte:** keine (P-62 alles ok, Nutzer 21.10.2026).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0026

**A-39 Konsolidierung aller Regeln** (Plan `arbeit/A-39 Konsolidierung Plan.md`, Antworten F-1 bis F-10, Abgleichliste
`arbeit/A-39 Abgleichliste.md`), veröffentlicht als AppDesign 4.28.2 / Reiselogbuch 3.26.2, voller Prüflauf grün (66 Läufe), **P-62 alles ok**:
- **Zusammenarbeit 2.17.0:** Abschnitt 0 ist das eine Arbeitsmodell (Nr. 1–25; neu Nr. 21 nie ohne Ja bauen, 22 erst prüfen, 23
  Apple-like, 24 Backlog, 25 Ablauf einer Änderung), Abschnitt 2 ‚Einzelheiten und Formate‘ (2.1–2.7), Zuordnung alt → neu.
- **Neue Vereinbarungen** (stehen schon in den Richtlinien): Übergabe ab etwa 150.000 Token, das Werkzeug warnt weiter erst ab
  300.000 (F-1 Nein); im Auswahlfenster nur die kurze Frage, bei Bitten, am Gerät zu prüfen, auch Link und Schritte (F-2);
  Übergabe vorschlagen, bei Ja schreiben und die Sitzung selbst starten, Starttext als Rückfall (F-3); keine eigene Version für
  eine einzelne Kleinigkeit (F-4); App-Richtlinie nur Abweichungen, alles andere App-Eigene in PROMPT.md (F-5); PROMPT.md als
  gegliederte Funktionsbeschreibung (F-6); Regeln ohne automatische Prüfung als G-1 bis G-19 im Katalog, Prüfungen später als
  **A-40** (F-8, Prio 3); Arbeitsumgebung dauerhaft in der AppDesign-`CLAUDE.md` (F-9).
- Größe: Regeltext −14 %, Lesestoff zu Beginn −18 % (Einzelheiten in der Abgleichliste).

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **A-38** Frameworks mit dem Nutzer durchgehen (Prio 1): `arbeit/A-38 Framework7 Auswertung.md` (V1–V6, Mischform AppDesign 5).
2. Dann **A-37** ‚Nach oben / Ans Ende‘ (Prio 2): Muster https://g811141a.github.io/AppDesign/arbeit/A-37%20Muster.html, Erklärung und
   Fall-Liste `arbeit/A-37 Fall-Liste.md` – Link und nummerierte Schritte im Chat und im Auswahlfenster, Wahl der Variante, Ja.

## 4. Danach

A-30 Vorschläge (Rückgängig nach Löschen, leere Zustände, Ziehen zum Aktualisieren aus) · A-32 ‚Problem melden‘ · A-40 Prüfungen
für G-1 bis G-19 · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0027 – A-38 Frameworks

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild. Dann A-38 Frameworks (Prio 1) mit mir durchgehen: arbeit/A-38 Framework7 Auswertung.md, Vorschläge V1 bis V6, Mischform. Danach A-37 (Prio 2).
```
