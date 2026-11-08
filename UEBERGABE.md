# Übergabe an die nächste Sitzung

**Stand 08.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0100‘ (APD-127 Messung ausgewertet, Wortlaut bestätigt, Muster R-1.12 ‚nicht ok‘;
Übergabe nach 0 Nr. 13, Kontext 289.895) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die
ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.54.0** veröffentlicht (Fassung 4.56.0) |
| AppDesign | **4.56.0** veröffentlicht |
| Zusammenarbeit allgemein | **3.10.0** (3.11.0 mit APD-125 bestätigt, kommt mit der nächsten Version) |
| AppDesign-`CLAUDE.md` | **2.11.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0101**; die danach 0102.
- **Modell und Aufwand:** in 0100 Opus 5.5 (`get_session`), alle Aufrufe `"effort":"high"`, kein `model_fallback`. `~/.claude/settings.json` = `{}` (keine Hooks).
  Der Arbeitsprozess wurde einmal neu gestartet (Repos und Einrichtung blieben).
- **Arbeitsweise (APD-125, gilt):** vor **jeder** Kachel alle wichtigen Informationen der Antwort in **einer Datei** (`SendUserFile`, `display: 'render'`)
  und ebenso im Chat; ‚(Kontext N)‘ in jeder Frage.
- **Offener Usertest:** **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – ok bis auf **P-100/1** (→ RLB-123, bereit). **P-100/2 Schritt 3 ohne
  Änderung erledigt** (APD-127: Variante A bleibt, Nutzer 08.11.2026). Bleibt unter ‚Prüfen‘, bis RLB-123 gebaut und geprüft ist.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1` prüfbar (github.io selbst ist aus
  der Sitzung nicht erreichbar); Muster lokal per `file://` prüfen. Testfall-Nummern in `arbeit/` nie mit `T-` oder `G-` (globale Präfixe).
  Arbeitszweige `claude/…` per schnellem Vorlauf nach `main` (`git push origin HEAD:main`), damit Pages die Muster zeigt.
  Achtung: `arbeit/APD-127 Muster prüfen.mjs` ist die Prüfung des **Messmusters** – die Prüfung des Musters R-1.12 heißt `arbeit/APD-127 Muster R-1.12 prüfen.mjs`.

## 2. Ergebnisse der Sitzung 0100

Alles in `arbeit/APD-127 Messung und Testfall-Liste.md` (auf `main`, 786a8bb):

- **Messung APD-127** (iPhone hoch, Safari-Tab, APD-127/W-1 bis W-8): Menü auf 319–324 / zu 247–252 ms, Fenster herein ~425 / hinaus ~310 ms;
  Tastatur in **einem** Schritt 95–110 ms nach dem Fokus; A springt 349 px, B gleitet 351 ms, **kein Unterschied spürbar** (Nutzer) → **A bleibt**.
  Safari verschiebt nichts (`vt` 0). Erstes Bild nach dem Fokus erst nach 88–91 ms. Safari rechnet laufendes `translate` in `getBoundingClientRect` ein
  (nur Playwright-WebKit nicht). Weg 349 statt 415 px im Modell: Tastatur im Safari-Tab 337 statt 403 px (Vermutung: Tab statt Home-Bildschirm).
- **Wortlaut bestätigt (Nutzer 08.11.2026):** Designrichtlinie 13 neuer Punkt APD-127/W-3, W-7 (Zeitpunkt der Tastatur), Safari-Modell iPhone hoch
  `aufVerzug` 100 ms (APD-127/M-7, M-8), **neue Regel R-1.12 ‚Gleitbewegungen wie das Mehr-Menü‘** (alle: 0,35 s auf / 0,25 s zu, Kurve
  `cubic-bezier(.32,.72,0,1)`, Rest nach einer Geste anteilig ≥ 0,15 s; Ausnahme Feld beim Antippen), R-4.13 verweist darauf. Wortlaut wörtlich in der
  Arbeitsdatei, Abschnitt ‚Wortlaut bestätigt‘.
- **Muster R-1.12** online: https://g811141a.github.io/AppDesign/arbeit/APD-127/app/index.html (heute: `?v=b`), gebaut mit `arbeit/APD-127 Muster bauen.mjs`
  (Blatt öffnen/x/Loslassen, `blattWeg` 0,25 s, iPad-Fenster mit Tastatur, Navigation, Seitenleiste, Titel antippen). Prüfung M-9 bis M-15: Chromium
  grün, WebKit 2 von 3 grün (M-13 an der Grenze, Startwert nur 86–100 px – grob), Gegenprobe rot.
- **Rückmeldung zum Muster: ‚nicht ok‘** (Nutzer 08.11.2026) – **was genau, ist noch offen**.

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten. **Lagebild als eigene Antwort – im Chat und als Datei – mit Kachel** (APD-125).
2. **Zuerst fragen (offene Frage aus 0100):** Muster R-1.12 ‚nicht ok‘ – welcher Schritt (1–8 der Anleitung in der Arbeitsdatei bzw. unten) und was passt nicht
   (zu schnell, zu langsam, Kurve, Ruck, etwas anderes)? Dann das Muster anpassen (Bauskript), prüfen, nach `main`, erneut am Gerät.
   Die Schritte: 1 Link öffnen · 2 iPhone ‚Muster A‘ und zurück · 3 Tag antippen, x · 4 Blatt ziehen und loslassen · 5 Titel antippen · 6 iPad Seitenleiste
   aus/ein · 7 iPad Fenster mit Tastatur · 8 Vergleich mit `?v=b`.
3. Dann die Bau-Frage (0 Nr. 8, 21): AppDesign 4.57.0 / Reiselogbuch 3.55.0 mit APD-125, APD-126, RLB-123 und APD-127 Modell plus Designrichtlinie 13
   (höchstens 2 Themen) – R-1.12 als eigene Version, sobald das Muster ok ist.

## 4. Danach

APD-124 (berührt APD-126 – zusammen besprechen) · APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 (Wackler `ablauf-suche-woerter` und
`ablauf-seitenleiste-position` WebKit; dazu in 0100: `APD-127 Muster prüfen.mjs` wackelt in WebKit, 1 von 4 grün) · APD-80 · APD-30 übrige Teile · APD-57 ·
APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0101 – APD-127 Muster R-1.12 nicht ok

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.10.0 plus APD-125: vor jeder Kachel alle wichtigen Informationen in einer Datei und im Chat) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Datei) mit Kachel, dann weiter nach UEBERGABE.md Abschnitt 3: zuerst fragen, was am Muster R-1.12 nicht ok ist (arbeit/APD-127 Messung und Testfall-Liste.md), anpassen, danach die Bau-Frage.
```
