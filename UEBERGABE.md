# Übergabe an die nächste Sitzung

**Stand 08.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0097‘ (Bau AppDesign 4.56.0 / Reiselogbuch 3.54.0; Übergabe nach 0 Nr. 13,
Kontext über 300.000) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze
Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.54.0** veröffentlicht (Fassung 4.56.0) |
| AppDesign | **4.56.0** veröffentlicht |
| Zusammenarbeit allgemein | **3.10.0** |
| AppDesign-`CLAUDE.md` | **2.11.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0098**; die danach 0099.
- **Modell und Aufwand:** in 0097 Opus 5.5 (`get_session`), alle Aufrufe `"effort":"high"`, kein `model_fallback`. `~/.claude/settings.json` = `{}` (keine Hooks).
- **Arbeitsweise (Zusammenarbeit 3.10.0, Kasten ‚Jede Antwort‘):** Kachel am Ende jeder Antwort, nach der der Nutzer etwas tun soll; alles zum Lesen davor, bei
  Prüfen/Entscheiden zusätzlich als Datei (`SendUserFile`, `display: 'render'`); ‚(Kontext N)‘ in jeder Frage, abgelesen aus `messung.mjs`; keine Uhrzeit- und Zeitzeile.
- **Offener Usertest:** **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – Testfälle P-100/0 bis P-100/6 im Reiselogbuch-CHANGELOG 3.54.0. **Offen beim Nutzer:** P-100
  (der Bericht mit den Testfällen stand in 0097 im Chat; die Frage nach der Rückmeldung stellt 0098).
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages ist aus der Sitzung nicht erreichbar (Proxy) – Muster lokal per `file://` prüfen; ob Pages den Stand hat, zeigt
  `mcp__github__actions_list`.

## 2. Ergebnisse der Sitzung 0097

- **Usertest P-99: alles ok** (Nutzer 08.11.2026) – im Reiselogbuch-Backlog nach ‚Erledigt‘.
- **Bau-Frage APD-115: Ja** (Nutzer 08.11.2026). Gebaut 4.56.0 / 3.54.0: `ui.js` rollt nach APD-115/V-3 (nur so weit wie nötig, R-4.5), setzt beim Wechsel
  bei offener Tastatur den Fokus selbst (APD-115/W-4), Korrektur `gemeldet` (APD-115/N-13 – Platz nur, wenn der Rahmen wächst; bei jeder Meldung brach er
  ‚Nach oben‘ ab, APD-36/B-8), Safari-Modell `apd115`/`fokusSelbst` Standard; R-4.5 und Designrichtlinie 13 (APD-115/L-1, APD-115/L-2) im bestätigten Wortlaut;
  Reiselogbuch ‚Verlauf‘ über dem Feld (APD-115/E-6), nach ‚Sonstiges …‘ bleibt die erste Zeile im Bild; neue Prüfung `ablauf-feld-rollen`
  (APD-115/M-1 bis APD-115/M-11, Gegenprobe `PRUEF_V=alt` rot). Angepasst: `checkSheet` B10 (hohe Textfelder nach R-4.5), `hig` R-2.1 (Safaris Verschiebung
  auch über `scrollY`, wie gemessen). Voller Lauf: 150 Läufe grün (68:13), davon 2 wackeln – `ablauf-suche-woerter` WebKit (wieder, Liste ‚😀‘ leer; im ersten
  `los` auch Chromium rot) und `ablauf-seitenleiste-position (Text 53)` WebKit. Pages beider Repos ‚success‘ (AppDesign 89f2dce, Reiselogbuch 397a71f).
- **Auffällig, nicht geändert (0 Nr. 25, Regeltext):** Designrichtlinie 15.22 sagt noch, der Platz unter dem Inhalt sei da, damit ‚das Feld in die obere
  Hälfte rollen kann‘ – seit R-4.5 neu nur noch ‚so weit wie nötig‘; Wortlaut beim Nutzer erfragen (0 Nr. 29). In der Spalte ‚Prüfung‘ von R-4.5 fehlt
  `ablauf-feld-rollen` (Reiselogbuch) – ebenfalls nur mit ‚Ja‘ ergänzen.
- **Nebenbei behoben:** `UEBERGABE.md` APD-121/Y-1 bis Y-4 mit Elternnummer (`doku-regeln` war rot).

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten. **Lagebild als eigene Antwort mit Kachel am Ende.**
2. **Rückmeldung P-100** (0 Nr. 22: erst Usertest, dann Neues) – Testfälle P-100/0 bis P-100/6 vollständig vor der Kachel und als Datei.
3. Danach die beiden Wortlaute aus Abschnitt 2 ‚Auffällig‘ (15.22, Spalte Prüfung R-4.5) vorlegen (0 Nr. 29).
4. **APD-124 weiter klären:** Wortlaut R-5.6, Designrichtlinie 15.11 und 16 (0 Nr. 29), Muster iPad hoch und iPhone quer, Testfälle (User) –
   `arbeit/APD-124 Klärung und Testfall-Liste.md`.

## 4. Danach

APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 (dazu die Wackler `ablauf-suche-woerter` und `ablauf-seitenleiste-position` WebKit) · APD-80 ·
APD-30 übrige Teile · APD-57 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0098 – Usertest P-100, danach APD-124 klären

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.10.0: Kachel am Ende, alles zum Lesen davor, keine Uhrzeit- und Zeitzeile) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort mit Kachel, dann weiter nach UEBERGABE.md Abschnitt 3: Rückmeldung Usertest P-100, danach die Wortlaute 15.22 und Spalte Prüfung R-4.5, danach APD-124 weiter klären (arbeit/APD-124 Klärung und Testfall-Liste.md).
```
