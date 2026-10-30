# Übergabe an die nächste Sitzung

**Stand 30.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0055‘ (Klärung: Darstellung, Preis, Gegangene Kilometer, APD-85, APD-87,
APD-90 – nichts gebaut) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die
ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.39.0** (Fassung 4.41.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.41.0** (feste Fassungen 4.14.0–4.41.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md`, `ZUORDNUNG.md` |
| Zusammenarbeit allgemein | **3.1.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0056**; die danach 0057.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – in 0055 alle Aufrufe so, kein `model_fallback`.
- **Sitzungsgröße 0055:** etwa 285.000 Token – Übergabe nach 0 Nr. 13. Die Sitzung wurde dreimal neu gestartet (Worker); zweimal fehlte
  danach die Erklärung vor einem Fenster – nachgeholt und offen gesagt.
- **Regelwächter läuft.**
- **Offene Usertests:** keine.
- **Backlog ‚0. Nächste Version‘ – zwei Versionen, alles geklärt (Muster, Regeltexte und Testfall-Listen bestätigt):**
  - **AppDesign 4.42.0 / Reiselogbuch 3.40.0** (Reiselogbuch hebt die Fassung): APD-85 Teil 1 (rote Läufe am Ende einmal allein
    wiederholen, ‚wackelt‘ melden, Abbruch ab dem dritten roten Lauf – `arbeit/APD-85 Testfall-Liste.md`), APD-87 (Mehr-Knopf offen:
    hervorgehoben **und** `ellipsis-vertical`, allgemein – `arbeit/APD-87 Testfall-Liste.md`), APD-90 (Icon und Text bleiben zusammen –
    `arbeit/APD-90 Testfall-Liste.md`).
  - **AppDesign 4.43.0 / Reiselogbuch 3.41.0:** APD-92 + RLB-108 (Darstellung ins Mehr-Menü der Seitenleiste, nach Backup), APD-93
    (schmale Zahlenfelder), RLB-109 (Preis beim Quartier), RLB-110 (Spalte 🚶🏽‍♂️km ‚Gegangene Kilometer‘, Variante A) –
    `arbeit/APD-92 APD-93 RLB-108 RLB-109 RLB-110 Testfall-Liste.md`.
  - Die bestätigten Regeltexte stehen wörtlich in den Testfall-Listen bzw. im Backlog (APD-92, APD-93); erst beim Bau eintragen.
- **Offen:** Prio 1 APD-38; Prio 2 APD-91; Prio 3 APD-80, APD-88, APD-40, APD-62, APD-30, RLB-6 u. a.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0055

- Alles oben geklärt und auf `main` (Backlog, Testfall-Listen); **nichts gebaut** (Nutzer: Bau in der nächsten Sitzung).
- **Messlauf APD-85:** Reiselogbuch, nur WebKit, `--alle --jobs 4`: alle 59 Läufe grün in 24:53 – Wackler nicht nachstellbar, deshalb
  Teil 1; Teil 3 (feste Pausen ersetzen) erst für einen wiederholt gemeldeten Wackler.
- Muster als Bilder aus der echten App (Playwright, eingespielt im Browser); die Skripte lagen im Notizordner der Sitzung.
- **Selbstkritik 0055:** eine Uhrzeitzeile (04:58) geschätzt statt übernommen (Wächter wies zurück); Testfall-Liste zuerst mit lokalem
  Präfix K- hochgeladen, bevor `doku-regeln` fertig war (K gilt überall) – mit L- behoben.

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; Tests einrichten (AppDesign-
   `CLAUDE.md`: Playwright 1.56.1, Chromium-Verweise).
2. Fragen (0 Nr. 21): ‚Soll ich Version AppDesign 4.42.0 / Reiselogbuch 3.40.0 mit APD-85, APD-87 und APD-90 erstellen?‘ – bei Ja bauen
   nach den Testfall-Listen, veröffentlichen, Bericht mit Usertest. Danach (nach dem Usertest, 0 Nr. 22) 4.43.0 / 3.41.0.

## 4. Danach

4.43.0 / 3.41.0 · APD-38 · APD-91 (mit APD-57) · APD-80 · APD-88 · APD-62 Paket B · APD-30 · APD-32 · APD-40 · APD-44 bis APD-60 ·
APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`).

```
Reiselogbuch 0056 – AppDesign 4.42.0 (APD-85, APD-87, APD-90)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild und frage dann nach dem Bau von AppDesign 4.42.0 / Reiselogbuch 3.40.0 (UEBERGABE.md 3).
```
