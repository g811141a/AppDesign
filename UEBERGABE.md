# Übergabe an die nächste Sitzung

**Stand 25.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0046‘ (Version AppDesign 4.36.0 / Reiselogbuch 3.34.0 gebaut) –
Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die
Arbeitsumgebung steht in der AppDesign-`CLAUDE.md` (mit den Chromium-Verweisen für Chrome 153 unter ‚Tests einrichten‘).

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.34.0** (Fassung 4.36.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.36.0** (feste Fassungen 4.14.0–4.36.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md`, `ZUORDNUNG.md` |
| Zusammenarbeit allgemein | **2.20.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0047**; die danach 0048.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – in 0046 beides richtig (Sitzungsdatei `"effort":"high"`, `CLAUDE_CODE_EFFORT_LEVEL=high`).
- **Sitzungsgröße 0046:** etwa 530.000 Token – automatische Übergabe nach 0 Nr. 13.
- **Offene Usertests:** **P-74** (Reiselogbuch 3.34.0 · AppDesign 4.36.0) – Testfälle P-74/0 bis /3 im CHANGELOG des Reiselogbuchs:
  Version, Backlog AppDesign mit den neuen Nummern, Tabelle ‚Nummern und Präfixe‘ (Zusammenarbeit 2.4), Uhrzeitzeile.
- **‚0. Nächste Version‘:** in beiden Repos leer.
- **Backlog-Spitze danach:** APD-43 Teil 2 + RLB-101 (Textgröße, bereit – nächste Version nach P-74); APD-38 wartet auf den Nutzer;
  APD-72, RLB-103, APD-77; APD-80 (Kontrast dunkel – gesonderter Austausch im Chat) und APD-81 (ⓧ in mehrzeiligen Feldern – vorher
  klären).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0046

- **Neues Nummernschema (APD-78), rückwirkend:** Themen **APD-n** (AppDesign) und **RLB-n** (Reiselogbuch), **RLI-n** reserviert,
  Import-Regeln **I-n**; Erledigt ohne eigene Nummer (Spalte ‚Nr.‘ = Thema, Usertest oder Version); lokale Nummern außerhalb ihrer
  Datei mit Elternnummer (APD-63/X-2, APD-36/S-9, APD-38/T-21); Begriffe **Usertest P-n**, **Testfall (User) P-n/m**,
  **Testfälle P-n**, **Testfall-Liste**, **Testfall (automatisch)**. Alles steht in Zusammenarbeit 2.4 ‚Nummern und Präfixe‘.
- **`ZUORDNUNG.md`** (AppDesign): Tabelle alt → neu für die festen Fassungen und die Git-Commits (die alten Nummern gelten dort
  weiter). **`werkzeug/umbenennen.mjs`** hat umgestellt; ein zweiter Lauf ändert nichts.
- **`checkSchema`** (`doku.mjs`, über `checkCollab`) prüft das Schema – APD-78/S-1 bis S-10, Gegenprobe
  `node tests/alle.mjs --gegenprobe schema`. Die Protokolle `arbeit/APD-78 Recherche Präfixe.md` und
  `arbeit/APD-78 Testfall-Liste.md` bleiben im alten Schema (oben gekennzeichnet) und sind wie `ZUORDNUNG.md` ausgenommen.
- **APD-79 Uhrzeitzeile** steht als Pflicht in Zusammenarbeit 0 Nr. 26 und 2.2.
- **Veröffentlicht:** AppDesign 4.36.0 (4c36717) und Reiselogbuch 3.34.0 (dd7f739), Pages ‚success‘; Import 1.3.0 auf `main`. Der
  erste `los`-Lauf war rot (Zeitüberschreitung beim Klick in `ablauf-navigation (Bedienungshilfen)`, Chromium, unter Last), einzeln
  und im zweiten vollen Lauf grün (92 Läufe in 35:32) – beobachten; tritt es wieder auf, als Thema ins Backlog.

## 3. Nächster Schritt

1. Lagebild (kurz), dann die Rückmeldung zu **P-74** abfragen (Auswahlfenster nach 2.3; die Testfälle stehen im CHANGELOG des
   Reiselogbuchs unter 3.34.0).
2. Danach – wenn P-74 ok – APD-43 Teil 2 + RLB-101 Textgröße als nächste Version vorschlagen (Ja nötig, 0 Nr. 21).

## 4. Danach

APD-43 Teil 2 + RLB-101 Textgröße (bereit) · APD-38 Frameworks (mit dem Nutzer) · APD-72 iPad · RLB-103 tastatur-still · APD-77
Messung verstecken · APD-80 Kontrast dunkel (Austausch) · APD-81 ⓧ mehrzeilig · APD-62 Paket B · APD-30 · APD-32 · APD-40 ·
APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`).

```
Reiselogbuch 0047 – Usertest P-74 (Nummernschema)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (mit den Chromium-Verweisen unter ‚Tests einrichten‘). Gib kurz das Lagebild und frag dann die Rückmeldung zu P-74 ab (UEBERGABE.md 3).
```
