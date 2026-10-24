# Übergabe an die nächste Sitzung

**Stand 24.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0041‘ (Ende, automatische Übergabe vor einem Bau, 0 Nr. 13 – ein
Bau mit vollem Prüflauf passt nicht mehr unter 300.000 Token) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei
zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md` (mit den Chromium-Verweisen für
Chrome 153 unter ‚Tests einrichten‘).

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.30.2** online (Fassung 4.32.2) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.32.2** online (feste Fassungen 4.14.0–4.32.2) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0042**; die danach 0043.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15 (in 0041 beides richtig, Sitzungsdatei `"effort":"high"`).
- **Sitzungsgröße 0041:** etwa 270.000 Token.
- **Offene Prüfpunkte:** keine – **P-70 alles ok** (Nutzer 24.10.2026; AppDesign E-85, Reiselogbuch E-129: A-73 / T-104 abgeschlossen).
- **‚0. Nächste Version‘ – Ja vom 24.10.2026:** **AppDesign 4.33.0 / Reiselogbuch 3.31.0** mit
  - **A-75 + T-106** – Auswahl-Kapsel: Verlauf am Rand **48 px wie heute**, die äußeren 28 px ganz frei, darin ein kleiner Pfeil
    (chevron-left/-right, 14 px, `--muted`, 9 px vom Rand, nur Anzeige, `aria-hidden`); ein Pfeil steht nur, solange es auf seiner
    Seite weitergeht (wie `.fl`/`.fr` in `mountCap`), am Ende blendet er in 0,2 s aus (‚Bewegung reduzieren‘: ohne Überblenden).
    Vorlage: `arbeit/A-75 Muster.html` (Variante ‚48‘, `?v=e`), Fall-Liste K1–K16 `arbeit/A-75 Fall-Liste.md` (ok). Regel 15.12 /
    R-5.4 neu fassen, Prüfung `hig.mjs` erweitern. Bewusste Abweichung von Apple (am iPhone keine Pfeile) – Vorgabe des Nutzers.
  - **A-76** – Smiley-Leiste: Ziehen ist kein langes Drücken. `onLongPress` (ui.js) bricht bei Bewegung über 10 px und beim Rollen
    der umgebenden Rollfläche ab; Fall-Liste L1–L9 `arbeit/A-76 Fall-Liste.md` (ok) – **zuerst L1 als feste Prüfung, rot gegen 4.32.2**
    (0 Nr. 1).
- **Backlog neu:** Fokus-Rahmen in Textfeldern (Safari `outline: auto 5px` gegen R-3.4) bei **A-43 Teil 1** ergänzt, Prio 2.
  Die Tastaturleiste von Safari (Pfeile + Häkchen) kommt **nicht** ins Backlog (Nutzer 24.10.2026) – Web-Apps können sie nicht ausblenden.
- **Bereit danach:** A-74 + T-105 (Backup-Kachel, Muster und Fall-Liste fehlen), A-43 Teil 1 + T-100, dann A-43 Teil 2 + T-101.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0041

- P-70 geprüft: alles ok.
- A-75: erste Muster (Anschnitt, Rollbalken kurz zeigen) vom Nutzer **verworfen**; neue Vorgabe ‚bestehendes Verhalten verbessern,
  längerer Verlauf, kleine Pfeile, die am Ende verschwinden‘. Muster 2 mit 48 / 55 / 65 / 80 / 112 px – **gewählt 48 px mit Pfeilen**.
- A-76 neu (Fehler am Gerät, Prio 1), Fall-Liste ok.
- **Gelernt (Zusammenarbeit 2.1, 0 Nr. 7):** Text, der in einer Antwort **nach einem Werkzeugaufruf** steht, kommt vor dem
  Auswahlfenster nicht beim Nutzer an – zweimal fehlte so eine Fall-Liste. Fall-Listen und Muster-Erklärungen daher **ganz an den
  Anfang der Antwort** (vor jedem Werkzeugaufruf) oder als Datei vor dem Fenster. Und: der Nutzer prüft Fall-Listen nicht selbst
  – jede Frage danach sagt ausdrücklich ‚nur lesen, ob ein Fall fehlt; testen erst mit der Prüfliste nach dem Bau‘.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. Lagebild (kurz), dann **sofort bauen** (Ja liegt vor): `vorbereitung-4.33.0` in AppDesign und `vorbereitung-3.31.0` im Reiselogbuch,
   `node werkzeug/veroeffentlichen.mjs vorbereiten --ad 4.33.0 --app reiselogbuch=3.31.0`; zuerst A-76 L1 rot gegen 4.32.2, dann
   A-75 und A-76 in `v4/` mit Prüfungen (K1–K16, L1–L9), Regeln 15.12 / R-5.4, CHANGELOG mit Prüfliste P-71 (Gerät: Wischgefühl,
   Pfeile verständlich, Smiley-Leiste ziehen ohne Abfrage, langes Drücken löscht), `… fassung`, `… los --app reiselogbuch`.
2. Bericht nach 0 Nr. 11 mit Prüfliste P-71 vollständig im Chat **am Anfang der Antwort**, dann Auswahlfenster.

## 4. Danach

A-74 / T-105 Muster und Fall-Liste · A-43 Teil 1 + T-100 bauen (mit Fokus-Rahmen) · A-43 Teil 2 + T-101 bauen · A-72 iPad (Muster,
Fall-Liste) · T-103 Prüfung tastatur-still · A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen) · A-32 ‚Problem melden‘ · A-40
Prüfungen für G-1 bis G-19 · A-44 bis A-60 · A-70 Mehrsprachfähigkeit · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0042 – Version AppDesign 4.33.0 / Reiselogbuch 3.31.0 bauen (A-75 Pfeile an der Auswahl-Kapsel, A-76 Ziehen ist kein langes Drücken)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (mit den Chromium-Verweisen unter ‚Tests einrichten‘). Gib kurz das Lagebild und baue dann die Version nach UEBERGABE.md 3 – das Ja des Nutzers liegt vor (24.10.2026).
```
