# Übergabe an die nächste Sitzung

**Stand 07.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0087‘ (4.54.0 / 3.52.0 gebaut und veröffentlicht; Übergabe nach 0 Nr. 13 bei Kontext
über 300.000) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.52.0** veröffentlicht (Fassung 4.54.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.54.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.9.0** | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0088**; die danach 0089.
- **Modell und Aufwand:** in 0087 Opus 5.5 (`get_session`), Aufrufe `"effort":"high"`, kein `model_fallback`. Der Arbeitsprozess wurde einmal neu gestartet (nach 01:13).
- **Regelwächter läuft** – seit 4.54.0 mit APD-84/W-4 ohne Grenze, APD-84/W-15 neu, APD-84/W-17 mit Commit und Zurückweisung (`tests/regelwaechter.mjs` APD-113/M-1 bis M-17 in Ordnung).
- **Offener Usertest:** **P-98** (Reiselogbuch 3.52.0, AppDesign 4.54.0) – Testfälle P-98/0 bis P-98/7 im CHANGELOG des Reiselogbuchs; Rückmeldung noch nicht erfragt.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0087

- APD-113/M-13 bis M-17 und Zusatz zu APD-113/N-3 (eine Zurückweisung zählt für APD-84/W-17 wie ein Werkzeug) bestätigt; Wortlaut APD-120/V-1 bis V-5 bestätigt
  (`arbeit/APD-118 bis APD-120 Wortlaut Bau 4.54.0.md`; darin 0 Nr. 7 angepasst).
- **Gebaut 4.54.0 / 3.52.0:** APD-118 (Sperrschicht schließt beim Loslassen, Safari-Modell `obenOhneKlick`), APD-119 (Designrichtlinie 13), APD-120 (Schalter ‚Glas‘
  im Untermenü ‚Darstellung‘, je Gerät, aus dem Backup nur ohne eigene Wahl), APD-113 Teil (6) und APD-117 (Zusammenarbeit 3.9.0, Regelwächter).
- `los` lief dreimal: zweimal Abbruch wegen Prüfungen, die noch nicht angepasst waren (`ablauf-gesamt`, `ablauf-grossanzeige`, Messung P-97/6 in `ablauf-abspielen`
  und `ablauf-tastatur-still`); im dritten Lauf alle 148 Läufe grün, ‚wackelt‘: `oeffnen-position` und `hig (Text 14)` in Chromium (unter Last rot, allein grün).
- **Neu im Backlog:** APD-121 (Prio 2) – Mehr-Knopf im iPhone quer, obere Hälfte; zuerst Messung am Gerät.
- **Funde für APD-113 (1):** APD-84/W-6 zählt vom Wächter abgelehnte Fenster mit und meldete in 0087 eine Zeitzeile aus einer früheren Ausgabe derselben
  ‚Antwort‘ (seit der letzten Nachricht des Nutzers), obwohl Hintergrundmeldungen dazwischen lagen.
- **Selbstkritik 0087:** Zwischenmeldung ohne Uhrzeitzeile (APD-84/W-1); einmal 00:52 statt abgelesen 00:51; Zeitzeile mitten in einer Antwort vor einem
  späteren Fenster (APD-84/W-6); beim Bau drei bestehende Prüfungen nicht vorher angepasst – kostete zwei Läufe von `los`.

## 3. Nächster Schritt

1. Lesen wie immer; Lagebild als eigene Antwort (Fenster ‚Lagebild bereit – anzeigen?‘, danach als letzte Ausgabe). Repos dazuholen, Tests einrichten.
2. **Usertest P-98:** Fenster ‚Usertest P-98 anzeigen?‘, danach P-98/0 bis P-98/7 vollständig aus dem CHANGELOG des Reiselogbuchs mit Link
   https://g811141a.github.io/ReiseLogBuch/ als letzte Ausgabe; Rückmeldung im Chat, Ergebnis ins Backlog (0 Nr. 22).
3. Danach nach dem Backlog (Abschnitt 4).

## 4. Danach

APD-113 (1) bis (4) · APD-121 · RLB-119 · APD-115 · APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 · APD-80 · APD-30 übrige Teile · APD-57 ·
APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0088 – Usertest P-98 (Glas-Schalter, oberer Rand, Zusammenarbeit 3.9.0)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob der Regelwächter läuft. Lagebild als eigene Antwort (Fenster ‚Lagebild bereit – anzeigen?‘, danach das Lagebild als letzte Ausgabe), dann die Rückmeldung zum Usertest P-98 erfragen (Fenster ‚Usertest P-98 anzeigen?‘, danach P-98/0 bis P-98/7 vollständig mit Link als letzte Ausgabe, Antwort im Chat).
```
