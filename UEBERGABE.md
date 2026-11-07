# Übergabe an die nächste Sitzung

**Stand 07.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0089‘ (APD-121 gemessen und geklärt, APD-115 nachgestellt und entschieden; Übergabe
nach 0 Nr. 13, Kontext etwa 275.000) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die
ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.52.0** veröffentlicht (Fassung 4.54.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.54.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.9.0** | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0090**; die danach 0091.
- **Modell und Aufwand:** in 0089 Opus 5.5 (`get_session`), Aufrufe `"effort":"high"`, kein `model_fallback`. Der Arbeitsprozess wurde mehrfach neu gestartet.
- **Regelwächter läuft** (`tests/regelwaechter.mjs` in Ordnung).
- **Offener Usertest:** keiner.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0089

- **Bau-Frage 4.55.0 / 3.53.0 zweimal mit ‚Nein‘ beantwortet** (einmal mit APD-122, APD-113 Teile (1) bis (4), RLB-119; einmal zusätzlich mit APD-121) –
  alle Punkte bleiben bereit in ‚0. Nächste Version‘.
- **APD-121 geklärt, bereit (Wortlaut bestätigt):** zwei Messungen am iPhone quer (`tests/messungen/2026-11-07 iPhone quer Mehr-Knopf oben 1.txt`,
  `… 2.txt`): der Mehr-Knopf öffnet auch ganz oben (y 21 viermal); kein Klick bis y 20 (P-97/6). Das Safari-Modell (`KEIN_KLICK_OBEN` = 23) wird auf 21
  gesetzt, Designrichtlinie 13 ‚Am oberen Rand kein Klick‘ neu gefasst – `arbeit/APD-121 Wortlaut und Testfall-Liste.md` (APD-121/V-1, Y-1 bis Y-7).
  Nebenbefund APD-121/B-5: Safari schickt einen Tipp neben dem Knopf an den Knopf – nicht als Thema eingetragen.
- **APD-115 nachgestellt und entschieden** – `arbeit/APD-115 Befund.md`: die App rollt nur nach dem Feld, nie nach der Überschrift (B-1 bis B-6);
  entschieden E-3 (V-3 wie Apple: nur so weit rollen, dass das Feld über der Tastatur liegt; mehrzeilig Cursorzeile + ½ Zeile; ändert R-4.5),
  E-4 (keine neue Regel zur Bezeichnung, ‚nur Apple-like‘), E-5 (Muster für den Verlauf: Bezeichnung direkt über dem Feld).
- **Selbstkritik 0089:** nach Neustarts des Arbeitsprozesses dreimal ein Fenster ohne Uhrzeitzeile und Satz ‚Kontext N‘ davor; einmal ‚Mehr-Knöpf‘ im
  Fenster. Abhilfe: nach jedem Neustart zuerst die Ausgabe mit Uhrzeitzeile und ‚Kontext N‘, dann das Fenster.

## 3. Nächster Schritt

1. Lesen wie immer; Lagebild als eigene Antwort (Fenster ‚Lagebild bereit – anzeigen?‘, danach als letzte Ausgabe). Repos dazuholen, Tests einrichten.
2. **APD-115 Muster** (E-5): Apple-Abgleich, Testfall-Liste, Muster nur hell – Tageserfassung mit V-3 (Rollen wie Apple) und der Bezeichnung
   ‚Verlauf‘ direkt über dem Feld; dazu Wortlaut R-4.5 (0 Nr. 29).
3. Danach die **Bau-Frage** im Fenster: ‚Soll ich Version AppDesign 4.55.0 / Reiselogbuch 3.53.0 mit APD-122, APD-113 Teile (1) bis (4), APD-121 und
   RLB-119 erstellen? (Kontext N) Ja/Nein‘ – nach ‚Ja‘ bauen nach den Arbeitsdateien; jede neue Prüfung zuerst rot gegen 4.54.0 / 3.52.0 (0 Nr. 1);
   vor `los` die bestehenden Prüfungen anpassen (`ablauf-suche-*`, `checkSearchWords`, `tests/regelwaechter.mjs`, `checkSchichtOben`).

## 4. Danach

APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 · APD-80 · APD-30 übrige Teile · APD-57 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0090 – APD-115 Muster (Rollen wie Apple), danach Bau 4.55.0 / 3.53.0

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob der Regelwächter läuft. Lagebild als eigene Antwort (Fenster ‚Lagebild bereit – anzeigen?‘, danach das Lagebild als letzte Ausgabe), dann weiter nach UEBERGABE.md Abschnitt 3: APD-115 Muster (arbeit/APD-115 Befund.md, E-3 bis E-5), danach die Bau-Frage.
```
