# Übergabe an die nächste Sitzung

**Stand 07.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0091‘ (APD-115 Rückmeldung und Feldwechsel; Übergabe nach 0 Nr. 13, Kontext etwa
275.000) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.52.0** veröffentlicht (Fassung 4.54.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.54.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.9.0** (Wortlaut APD-123 bestätigt, kommt mit 4.55.0, gilt schon) | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0092**; die danach 0093.
- **Modell und Aufwand:** in 0091 Opus 5.5 (`get_session`), alle Aufrufe `"effort":"high"`, kein `model_fallback`. `~/.claude/settings.json` = `{}` (keine Hooks).
- **Arbeitsweise nach APD-123** (`arbeit/APD-123 Zusammenarbeit ohne Regelwächter Wortlaut.md`): Kachel mit Push am Ende jeder Antwort, nach der der
  Nutzer etwas tun soll; alles zum Lesen davor, bei Prüfen am Gerät zusätzlich als Datei (`SendUserFile`, `display: 'render'`); ‚(Kontext N)‘ in
  jeder Frage; keine Uhrzeit- und Zeitzeile.
- **Offener Usertest:** keiner.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages (`g811141a.github.io`) ist aus der Sitzung nicht erreichbar (Proxy) – Muster lokal per `file://` prüfen.

## 2. Ergebnisse der Sitzung 0091

- **APD-115 Rückmeldung (Nutzer 07.11.2026):** Variante A (APD-115/E-6), Wortlaut R-4.5 ‚Neu‘ bestätigt (APD-115/E-7), am Gerät **nicht ok**:
  Schritt 7 ‚Feld wechseln‘ (Quartier → Ort) springt am iPad und iPhone, ‚sehr irritierend‘ (APD-115/E-8).
- **Befund** (`arbeit/APD-115 Testfall-Liste.md` APD-115/N-1 bis N-9, Messung `arbeit/APD-115 Messungen/2026-11-07 iPad quer Quartier dann Ort.txt`,
  iPad quer im Safari-Browser, sichtbar mit Tastatur 274): die Mitte-Regel (APD-115/A-2) rollt Ort (iPad quer in derselben Zeile, ganz sichtbar)
  178 px, danach verschiebt Safari zusätzlich 179 px; ohne die Regel stellt im Modell Safari das Feld selbst in die Mitte (APD-36/S-6 b).
  Vermutung: Safari liest die Lage beim Fokus (APD-36/S-7), bei offener Tastatur macht das Muster keinen neuen Fokus (APD-36/S-8).
- **Prüfung zuerst (0 Nr. 1):** M-7 geschärft (Ablauf des Nutzers: Fenster oben bzw. unten, Quartier, tippen, Ort) – rot gegen das gezeigte Muster
  (20 Fehler).
- **Muster mit zwei Wechsel-Varianten** (Nutzer ‚Ja, hier noch‘): `&w=1` APD-115/W-1 ‚nur so weit wie nötig‘, `&w=2` APD-115/W-2 ‚Mitte-Regel und
  neuer Fokus auch bei offener Tastatur‘ (Standard); gebaut mit `arbeit/APD-115 Muster bauen.mjs`, Commit c45ae57. **Noch nicht fertig:**
  M-7 (Chromium) 12 Fehler, siehe 3.
- **Selbstkritik 0091:** für die Schritte zum Muster das Protokoll von 0090 gelesen (teuer, etwa 50.000 Token) – Schritte stehen jetzt in der
  Testfall-Liste nicht, sondern nur im Chat; künftig Schritte zum Muster in die Testfall-Liste schreiben.

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten. Lagebild als eigene Antwort mit Kachel am Ende.
2. **APD-115 Muster W-1/W-2 fertigstellen** (`node "arbeit/APD-115 Muster prüfen.mjs"`, dann `PRUEF_BROWSER=webkit`, Gegenprobe `PRUEF_V=heute`):
   (1) iPhone hoch zwei Schübe – zuerst 43 px (Feldunterkante genau an die Tastatur; Herkunft klären, vermutlich das Rollen des Browsers beim Fokus),
   dann V-3; Ziel ein Schub; (2) iPhone quer W-2: Safari verschiebt im Modell 30 px, weil Ort nicht bis zur Mitte kann – als Hinweis werten (wie
   APD-115/A-3); (3) ggf. die enge Lage aus der Messung (Safari mit Adressleiste, sichtbar 274) als Ansicht prüfen.
3. Dem Nutzer zeigen (Kachel): Links `https://g811141a.github.io/AppDesign/arbeit/APD-115/?v=a&w=1` und `…?v=a&w=2`, Messmodus an, je Variante am
   iPad quer und iPhone hoch: Fenster oben, Quartier antippen, tippen, Ort antippen, tippen; Messung teilen. Schritte in die Testfall-Liste schreiben.
   Nach der Messung das Safari-Modell korrigieren (0 Nr. 20), M-7 nach der gewählten Variante, APD-115 bereit (eigene Version nach 4.55.0, 0 Nr. 8).
4. Danach die **Bau-Frage** in der Kachel: ‚Soll ich Version AppDesign 4.55.0 / Reiselogbuch 3.53.0 mit APD-122, APD-123, APD-121 und RLB-119
   erstellen? (Kontext N)‘ – nach ‚Ja‘ bauen nach den Arbeitsdateien; jede neue Prüfung zuerst rot gegen 4.54.0 / 3.52.0 (0 Nr. 1); APD-123 mit der
   Anpassung von `tests/doku.mjs` (`checkCollab`, APD-123/D-9) und dem Kasten ‚Jede Antwort‘ neu; vor `los` die bestehenden Prüfungen anpassen
   (`ablauf-suche-*`, `checkSearchWords`, `checkSchichtOben`).

## 4. Danach

APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 · APD-80 · APD-30 übrige Teile · APD-57 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0092 – APD-115 Muster Feldwechsel (W-1/W-2) fertigstellen, danach Bau 4.55.0 / 3.53.0

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein und dazu arbeit/APD-123 Zusammenarbeit ohne Regelwächter Wortlaut.md (bestätigt, gilt: Kachel am Ende, alles zum Lesen davor, keine Uhrzeit- und Zeitzeile) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort, dann weiter nach UEBERGABE.md Abschnitt 3: APD-115 Muster W-1/W-2 fertigstellen (arbeit/APD-115 Testfall-Liste.md, APD-115/N-1 bis N-9) und dem Nutzer zum Messen zeigen, danach die Bau-Frage.
```
