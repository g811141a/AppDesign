# Übergabe an die nächste Sitzung

**Stand 25.10.2026, 11:52** · geschrieben in der Sitzung ‚Reiselogbuch 0045‘ (Ende – Thema abgeschlossen, Bau der geklärten Version
in der neuen Sitzung, 0 Nr. 13) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md` (mit den Chromium-Verweisen für Chrome 153 unter ‚Tests einrichten‘).

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.33.0** online (Fassung 4.35.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.35.0** online (feste Fassungen 4.14.0–4.35.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0046**; die danach 0047.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – in 0045 beides richtig (Sitzungsdatei `"effort":"high"`, `CLAUDE_CODE_EFFORT_LEVEL=high`).
- **Sitzungsgröße 0045:** etwa 220.000 Token.
- **Offene Usertests (bisher ‚Prüfpunkte‘):** keine – **P-73 alles ok** (Nutzer 25.10.2026; E-91 / E-135, A-43 Teil 1 und T-100 abgeschlossen).
- **‚0. Nächste Version‘ (AppDesign):** **A-78** Nummernschema (geklärt, K1–K9 ok) und **A-79** Uhrzeitzeile – **Ja zur Version
  AppDesign 4.36.0 / Reiselogbuch 3.34.0 (Nutzer 25.10.2026, Sitzung 0045)**, gebaut wird in 0046. Reiselogbuch: leer.
- **Backlog-Spitze danach:** A-43 Teil 2 + T-101 (Textgröße, bereit – nächste Version nach 4.36.0); A-38 wartet auf den Nutzer; A-72,
  T-103, A-77; neu **A-80** (Prio 3, Kontrast der Darstellung dunkel – gesonderter Austausch im Chat) und **A-81** (Prio 3, ⓧ auch
  in mehrzeiligen Feldern – vorher klären).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0045

- **P-73 geprüft:** alles ok. Zwei Wünsche daraus: P-73/1 ‚in mehrzeiligen Feldern kein ⓧ‘ ist R-5.6 wie Apple – der Nutzer möchte es
  trotzdem (A-81, Prio 3); Darstellung dunkel ‚fast kein Unterschied zwischen Kachel und Seite‘ (A-80, Prio 3, heute #000000 /
  #1c1c1e wie Apple).
- **A-78 Präfixe:** Recherche `arbeit/A-78 Recherche Präfixe.md` (Bestand, Jira, GitHub, RFC/ADR, ISO 29148, Testfälle; Grundsätze;
  Entscheidungen D1–D9 in Abschnitt 6; **Entwurf der Präfix-Tabelle in Abschnitt 7**), Klärpunkte und Testfall-Liste
  `arbeit/A-78 Testfall-Liste.md` (K1–K9 alle wie vorgeschlagen; S-1–S-10 Schema-Prüfung, U-1–U-6 Umbau-Skript, Usertest /0–/2).
  Entschieden: Thema behält seine Nummer (kein E-), Kürzel **APD · RLB · RLI**, rückwirkend (Fassungen und Git bleiben,
  `ZUORDNUNG.md`), `checkCollab` prüft das Schema, **Usertest P-n** mit **Testfall P-n/m** (‚Testfälle‘ statt Prüfliste),
  **Testfall-Liste** mit **Testfall (automatisch)** und **Testfall (User)**, R- und G- bleiben, Import-Regeln **I-** statt N-,
  Beschreibung aller Präfixe in Zusammenarbeit 2.4 ‚Nummern und Präfixe‘.
- **A-79** galt die ganze Sitzung (Uhrzeitzeile oben).

## 3. Nächster Schritt

1. Lagebild (kurz), dann **Version AppDesign 4.36.0 / Zusammenarbeit 2.20.0 / Reiselogbuch 3.34.0 (Fassung 4.36.0) /
   ReiseLogBuch-Import 1.3.0 bauen** (Ja liegt vor): A-78 nach `arbeit/A-78 Testfall-Liste.md` (zuerst `ZUORDNUNG.md` und
   `werkzeug/umbenennen.mjs` mit U-1–U-6, die T-Treffer bis T-66 in AppDesign einzeln entscheiden – K3; dann Schema-Prüfung S-1–S-10
   mit `--gegenprobe schema`; Präfix-Tabelle nach Recherche Abschnitt 7 in Zusammenarbeit 2.4) und A-79 (Regeltext Uhrzeitzeile in
   0 und 2.2). Ablauf: Vorbereitungs-Zweige, `vorbereiten --ad 4.36.0 --app reiselogbuch=3.34.0`, Umbau, Texte, `fassung`, `los`.
2. Bericht mit Usertest **P-74** (neuer Begriff) und Auswahlfenster zur Rückmeldung.

## 4. Danach

A-43 Teil 2 + T-101 Textgröße (bereit) · A-38 Frameworks (mit dem Nutzer) · A-72 iPad · T-103 tastatur-still · A-77 Messung verstecken ·
A-80 Kontrast dunkel (Austausch) · A-81 ⓧ mehrzeilig · A-62 Paket B · A-30 · A-32 · A-40 · A-44 bis A-60 · A-70 · T-06 · A-01.
(Nach dem Umbau heißen alle A- APD- und alle T- RLB-.)

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für den Umbau auch
**ReiseLogBuch-Import** (privat, Zugriff push).

```
Reiselogbuch 0046 – Version 4.36.0 / 3.34.0: Präfixe (A-78) und Uhrzeitzeile (A-79)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat, push) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (mit den Chromium-Verweisen unter ‚Tests einrichten‘). Gib kurz das Lagebild und baue dann die Version nach UEBERGABE.md 3 (das Ja liegt vor): A-78 nach arbeit/A-78 Testfall-Liste.md und arbeit/A-78 Recherche Präfixe.md (Abschnitte 6 und 7), A-79 Uhrzeitzeile.
```
