# Übergabe an die nächste Sitzung

**Stand 23.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0037‘ (Ende, Thema abgeschlossen, Übergabe auf Wunsch des Nutzers, 0 Nr. 13) –
Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung steht in
der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.29.0** online (Fassung 4.31.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.31.0** online (feste Fassungen 4.14.0–4.31.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0038**; die danach 0039.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15 (in 0037 beides richtig, Sitzungsdatei `"effort":"high"`).
- **Sitzungsgröße 0037:** etwa 120.000 Token.
- **Offene Prüfpunkte:** keine.
- **‚0. Nächste Version‘ (voll):** AppDesign **A-61/2** + Reiselogbuch **T-99** (Blatt auf dem iPhone) und AppDesign **A-69** + Reiselogbuch
  **T-98** (Startposition) – als AppDesign 4.32.0 / Reiselogbuch 3.30.0. Der Nutzer hat zum Bau noch **nicht Ja** gesagt (in 0036 ‚Nein‘).
- **Bereit für die Versionen danach:** AppDesign **A-43 Teil 1** + Reiselogbuch **T-100** (VoiceOver, Tastatur, Kontrast, Bewegung) –
  voraussichtlich 4.33.0 / 3.31.0; danach AppDesign **A-43 Teil 2** + Reiselogbuch **T-101** (Textgröße folgt dem Gerät) – voraussichtlich
  4.34.0 / 3.32.0.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0037

- **Fall-Liste A-43 Teil 2 abgeschlossen:** P1–P4 (Fälle 32–35) wie empfohlen übernommen – `PRUEF_TEXT=<px>` (hig bei 14, 23, 33, 53 px,
  Bewegungsabläufe bei 53), Prüfung `checkText` mit **neuer Grundregel ‚nichts überlappt‘**, Gegenprobe `--gegenprobe text`, Prüfliste am
  Gerät (xS, Standard, XXXL, AX2, AX5; Kontrollzentrum; Tagestabelle iPad; Notiz bei AX5; ‚Einstellungen pro App → Safari‘; Mac 17 px).
- **Abschnitte 1–3 der Fall-Liste angeglichen** (Spalte ‚Erwartet‘, Regeltext R-1.10 aus R1); **‚Fall-Liste Teil 2 ok‘** (Nutzer).
- **Backlogs:** AppDesign A-43 ‚Teil 2 bereit‘; Reiselogbuch **T-101** neu (App-Teil: 6 Schriftgrößen G4, Tage am iPad ab AX1 als Kästen U4/W1,
  `.meta` untereinander U1, Betragsfeld in `ch` B5, Wetter-Knöpfe B6, `PRUEF_TEXT`).

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. Lagebild, dann fragen: **‚Soll ich Version AppDesign 4.32.0 / Reiselogbuch 3.30.0 mit A-61/2 + T-99 (Blatt auf dem iPhone) und
   A-69 + T-98 (Startposition) erstellen? Ja/Nein‘** (0 Nr. 21) – gebaut wird erst nach einem ausdrücklichen Ja; vorher die Fall-Listen
   bzw. Einträge in ‚0.‘ lesen.
2. Bei Ja: bauen und veröffentlichen nach AppDesign-`CLAUDE.md` (Vorbereitungs-Zweige, `veroeffentlichen.mjs`), Bericht mit Prüfliste (0 Nr. 11).

## 4. Danach

A-43 Teil 1 + T-100 bauen · A-43 Teil 2 + T-101 bauen · A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen; Kollision Wegwischen hoch
klären) · A-32 ‚Problem melden‘ · A-40 Prüfungen für G-1 bis G-19 · A-44 bis A-60 · A-70 Mehrsprachfähigkeit · T-06 Ausschreibungstexte
(Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0038 – Version AppDesign 4.32.0 / Reiselogbuch 3.30.0 (Blatt auf dem iPhone, Startposition)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild und frag dann, ob du Version AppDesign 4.32.0 / Reiselogbuch 3.30.0 mit A-61/2 + T-99 (Blatt auf dem iPhone) und A-69 + T-98 (Startposition) erstellen sollst – gebaut wird erst nach einem ausdrücklichen Ja.
```
