# Übergabe an die nächste Sitzung

**Stand 23.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0032‘ (Ende, automatische Übergabe bei etwa 300.000 Token) – Aufbau
nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung
steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.29.0** online (Fassung 4.31.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.31.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0033**; die danach 0034.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15.
- **Offener Prüfpunkt P-67 (3.29.0):** Seitenleiste am iPad quer hereinwischen (/1, /2), keine doppelten Leerzeichen (/3),
  Großschreibung zurücknehmen (/4) – Rückmeldung des Nutzers steht aus (Prüfliste vollständig im Reiselogbuch-CHANGELOG 3.29.0).
  **In 0033 zuerst die Prüfliste P-67 vollständig im Chat zeigen und das Auswahlfenster zur Rückmeldung** (0 Nr. 11, 13).
- **Backlog-Spitze:** Reiselogbuch **T-98 (Prio 1)** Startposition beim Öffnen – offene Frage darin (alle Tage erfasst, Reise
  läuft: heutiger Tag oben? Empfehlung ja). AppDesign: A-68, A-64, A-65 ‚prüfen‘ (P-67); Prio 2 A-61 Teil 2 Blatt (T-15), A-43.
- **‚0. Nächste Version‘:** leer in beiden Backlogs.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0032

- **P-66 (3.28.2) ok** – Zurückwischen am Gerät bestätigt (A-67 erledigt, E-77 / E-121). P-66/4 war zuerst quer geprüft – die
  Messung zeigte ‚quer‘ in jeder Zeile; quer gab es kein Wischen (15.4) → daraus A-68.
- **A-68 Seitenleiste am iPad quer hereinwischen** – Apple löst es je nach App unterschiedlich (Nutzer); Muster
  `arbeit/A-68 Muster.html` (A Darüber / **B Mitschieben gewählt**), Fall-Liste `arbeit/A-68 Fall-Liste.md`, allgemeine Regel.
  Ausblenden quer nur mit panel-left (Kacheln frei für Wischaktionen T-10; Kollision hoch bei A-30 vermerkt).
- **A-64 doppelte Leerzeichen, A-65 Großschreibung zurücknehmen** geklärt und gebaut.
- **AppDesign 4.31.0 / Reiselogbuch 3.29.0 (Ja 23.10.2026):** Gestenart ‚fest‘ (`navFest`, `navEinrasten`, `html.nav-fest`,
  Schnittstelle `seite.fest()`, `seite.neu()`), `capFrei` (nur genau ein Großbuchstabe), Leerzeichen-Hörer auf `document`
  (beforeinput, paste). Prüfungen: `checkNavigation` Q-1 bis Q-12, `checkSpaces`, `checkCapital` ergänzt – rot gegen 4.30.2.
- **Gelernt:** (1) Senkrechter Mauszug markiert in WebKit Text, der nächste Zug darauf startet Ziehen-und-Ablegen und WebKit
  verschluckt die Mausereignisse – `ziehe` hebt die Markierung vorher auf. (2) Prüfungen mit festen Wartezeiten auf
  Deckkraft-Übergänge werden unter voller Last in WebKit rot (`checkGriff`, zweimal im vollen Lauf) – auf den Zustand warten (bis
  1 s), nie fest. (3) Gleiten statt Springen verlangt in Prüfungen `navFertig` nach dem Klick (`checkSideToggle`,
  `oeffnen-position`). (4) `los` braucht mit dem vollen Lauf etwa 25 min + Pages 5 min.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **Rückmeldung zu P-67** einholen (0 Nr. 22: erst prüfen, dann Neues). Bei ‚nicht ok‘ bei /1 oder /2: Messung (P-67/5) auswerten,
   Ablauf als feste Prüfung nachbauen (0 Nr. 1, 20), Korrektur nach Ja.
2. Danach **T-98** (Prio 1) klären (offene Frage), Fall-Liste, Prüfung rot gegen 3.29.0, dann Version nach Ja.
3. Dann Prio 2: A-61 Teil 2 Muster ‚Blatt‘ (T-15), A-43 Barrierefreiheit.

## 4. Danach

A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen; Kollision Wegwischen hoch klären) · A-32 ‚Problem melden‘ · A-40 Prüfungen
für G-1 bis G-19 · A-44 bis A-60 · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0033 – P-67 Seitenleiste quer, Leerzeichen, Großschreibung

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild, zeige die Prüfliste P-67 (Reiselogbuch 3.29.0) vollständig im Chat und warte mit dem Auswahlfenster auf meine Rückmeldung dazu.
```
