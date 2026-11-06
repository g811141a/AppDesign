# Übergabe an die nächste Sitzung

**Stand 06.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0083‘ (APD-62/T-16 Testfall-Liste bestätigt, T-1 zurückgestellt, T-37 Glas geklärt;
APD-113 ‚Push und Kontextstand‘ geklärt; 6 neue Backlog-Punkte; automatische Übergabe bei Kontext 285.920, 0 Nr. 13) – Aufbau nach Zusammenarbeit
allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in
der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.50.1** veröffentlicht (Fassung 4.52.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.52.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.7.0** (3.8.0 mit APD-113 vorbereitet, Wortlaut bestätigt) | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- Alles liegt auf **`main`** (beide Repos); keine lokalen Vorbereitungs-Zweige.
- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0084**; die danach 0085.
- **Modell und Aufwand:** in 0083 Opus 5.5 (`get_session`), Aufrufe `"effort":"high"`, kein `model_fallback`; der Arbeitsprozess wurde einmal neu gestartet.
- **Regelwächter läuft** (Hooks `uhrzeit`, `fenster`, `stop` in `~/.claude/settings.json`).
- **Offene Usertests:** keine.
- **Nächste Version AppDesign 4.53.0: 3 Punkte bereit** (2 Themen) – APD-62/T-16 (R-4.13), APD-62/T-37 (R-3.9), APD-113 Teil ‚Push und Kontextstand‘ (Zusammenarbeit 3.8.0).
  **Bauen ist beauftragt** (Nutzer 06.11.2026, Sitzung 0083: ‚Ja, ich nehme deine Empfehlung an‘ – Empfehlung war: Übergabe, 0084 baut). Dazu Reiselogbuch 3.51.0 (hebt die Fassung auf 4.53.0).
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0083

- **APD-62/T-16** Menüs und Sprechblasen wachsen aus der Schaltfläche: Testfall-Liste M-1 bis M-11 bestätigt (M-11 dunkel ergänzt) – `arbeit/APD-62 Bewegung Testfall-Liste.md`.
- **APD-62/T-1** ‚Großer Titel rastet ein‘ zurückgestellt: das Reiselogbuch nutzt keinen großen Titel (`.ltitle` kommt dort nicht vor).
- **APD-62/T-37** Schwebendes aus Glas: Muster `arbeit/APD-62 Glas Muster.html` (heute, Glas 75 %, Glas 55 %; iPad quer/hoch, iPhone), **Glas 75 %** gewählt,
  allgemein, Wortlaut R-3.9 und Verweise (Designrichtlinie 1, 15.1, 15.6, 15.17) sowie Testfall-Liste L-1 bis L-10 bestätigt – `arbeit/APD-62 Glas Testfall-Liste.md`.
- **APD-113 (jetzt Prio 1)** Push und Kontextstand: Push am iPad kommt nur über ein Auswahlfenster; `PushNotification` getestet (‚Mobile push requested‘,
  kam **nicht** an). Lösung: W-17 lockern (weiteres Fenster nach beantwortetem Fenster und einem Werkzeug) und ‚(Kontext N)‘ am Ende jeder Fensterfrage –
  die Push-Mitteilung zeigt den Fragetext (am iPad bestätigt). Wortlaut 1 bis 5 und Testfall-Liste H-1 bis H-9 bestätigt –
  `arbeit/APD-113 Push und Kontext Wortlaut und Testfall-Liste.md`. **Bis zum Bau: ‚(Kontext N)‘ freiwillig in jede Fensterfrage.**
- **Neu im Backlog** (Nutzer 06.11.2026): AppDesign **APD-115** (Überschrift bleibt beim Feld sichtbar, Prio 2), **APD-116** (Dateiname im Backup-Hinweis
  nicht mitten umbrechen, `.msg-text` `overflow-wrap: anywhere`, Prio 2); Reiselogbuch **RLB-119** (Suche nach Smiley meldet 0 Treffer – `hitCount`
  zählt nur Markierungen, Prio 1, Korrektur), **RLB-120** (Schrift-/Smiley-Größe Tageskachel Spalte 1/2, Prio 2), **RLB-121** (Statistik teuerste/günstigste
  Quartiere, Prio 3), **RLB-122** (Statistik Umbruch vor der Anzahl, Prio 2).
- **Regelwächter (für APD-113):** W-15 lehnte zweimal ein Fenster mit Link ab, obwohl Link und Schritte davor standen; W-14 meldete im Stop-Hook ein schon korrigiertes Fenster.
- **Selbstkritik 0083:** eine englische Zwischenmeldung ohne Uhrzeitzeile; ein falscher Zeitabstand; einmal ein alter Kontextstand vor einem Fenster.

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; ReiseLogBuch dazuholen (`main`); Tests einrichten (AppDesign-`CLAUDE.md`).
2. **AppDesign 4.53.0 und Reiselogbuch 3.51.0 bauen (Ja liegt vor):** Vorbereitungs-Zweige, `vorbereiten --ad 4.53.0 --app reiselogbuch=3.51.0`;
   R-4.13 (Bewegung, neue Prüfung in `ablauf.mjs` für M-1 bis M-11), R-3.9 (Glas, `hig.mjs` für L-1 bis L-10), APD-113 (Zusammenarbeit 3.8.0 nach dem
   bestätigten Wortlaut, `werkzeug/regelwaechter.mjs` W-16/W-17, `tests/regelwaechter.mjs` H-1 bis H-9); CHANGELOG mit Testfällen, `fassung`, `los` im Hintergrund;
   Bericht mit Usertest. Hinweis: der Regelwächter dieser Umgebung läuft aus `/home/user/AppDesign` – nach dem Ändern von W-17 gilt die neue Fassung sofort.
3. Danach RLB-119 (Korrektur) klären und als nächste kleine Version vorschlagen.

## 4. Danach

APD-115 · APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-113 übrige Teile (1) bis (4) · APD-85 Teil 6 · APD-80 · APD-30 übrige Teile · APD-57 · APD-44 bis
APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0084 – AppDesign 4.53.0 (APD-62 Bewegung und Glas, APD-113)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch (Branch main) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild. Dann baue AppDesign 4.53.0 und Reiselogbuch 3.51.0 mit den 3 bereiten Punkten (APD-62/T-16, APD-62/T-37, APD-113 Push und Kontextstand) – das Ja des Nutzers liegt vor (UEBERGABE.md 1. und 3.).
```
