# Übergabe an die nächste Sitzung

**Stand 08.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0099‘ (Muster APD-126 iPad hoch und iPhone quer ok, Messmuster APD-127; Übergabe nach
0 Nr. 13, Kontext 287.108) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze
Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version |
|---|---|
| Reiselogbuch | **3.54.0** veröffentlicht (Fassung 4.56.0) |
| AppDesign | **4.56.0** veröffentlicht |
| Zusammenarbeit allgemein | **3.10.0** (3.11.0 mit APD-125 bestätigt, kommt mit der nächsten Version) |
| AppDesign-`CLAUDE.md` | **2.11.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0100**; die danach 0101.
- **Modell und Aufwand:** in 0099 Opus 5.5 (`get_session`), alle Aufrufe `"effort":"high"`, kein `model_fallback`. `~/.claude/settings.json` = `{}` (keine Hooks).
- **Arbeitsweise (APD-125, gilt):** vor **jeder** Kachel alle wichtigen Informationen der Antwort in **einer Datei** (`SendUserFile`, `display: 'render'`)
  und ebenso im Chat; ‚(Kontext N)‘ in jeder Frage.
- **Offener Usertest:** **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – ok bis auf **P-100/1** (→ RLB-123, jetzt bereit) und **P-100/2 Schritt 3**
  (→ APD-127, Messung läuft). Bleibt unter ‚Prüfen‘, bis die Korrektur gebaut und geprüft ist.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.
- **Hinweis Prüfumgebung:** Pages ist aus der Sitzung über `curl https://api.github.com/repos/g811141a/AppDesign/actions/runs?per_page=1` prüfbar;
  Muster lokal per `file://` prüfen. Testfall-Nummern in `arbeit/` nie mit `T-` (z. B. `M-`). Die Arbeitszweige der Sitzung (`claude/…`) werden nach
  ‚Ja‘ des Nutzers per schnellem Vorlauf nach `main` gebracht (`git push origin HEAD:main`), damit Pages die Muster zeigt.

## 2. Ergebnisse der Sitzung 0099

- **APD-126 / RLB-123:** Muster iPad hoch und iPhone quer **ok** (Nutzer 08.11.2026); Prüfung `arbeit/APD-126 Muster prüfen.mjs` jetzt in allen vier
  Lagen (Chromium, WebKit grün, Gegenprobe rot). **Beide bereit** in ‚0. Nächste Version‘ (AppDesign: APD-125, APD-126 = 2 Punkte; Reiselogbuch:
  RLB-123 = 1 Punkt).
- **APD-127 Messmuster online:** https://g811141a.github.io/AppDesign/arbeit/APD-127/index.html – alles in `arbeit/APD-127 Messung und Testfall-Liste.md`
  (Befund aus dem Code APD-127/B-1 bis B-4, Testfall-Liste APD-127/M-1 bis M-6, Chromium und WebKit grün, Gegenprobe `PRUEF_GEGEN=sprung` rot).
  - Befund aus dem Code: `ui.js` rollt beim Antippen eines Felds unten den Fensterinhalt **in einem Schritt** (`c.scrollTop += n` im `focusin`), weil
    Safari die Lage beim Fokus liest (APD-36/S-7, S-8) – das Feld **springt**; Vermutung: das ‚zu schnell‘ aus P-100/2.
  - Fälle: 1 Mehr-Menü (Vergleich) · 2 Fenster auf und zu · 3 Feld oben (Ort) · 4 Feld unten Variante A (heute) · 5 Variante B (Versuch: gleich weit
    gerollt, Inhalt gleitet per `transform` 0,35 s mit `cubic-bezier(.32,.72,0,1)`; `feldZeigen` wartet bis zum Ende) · 6 Variante A nochmals.
  - Modell: A springt 415 px in einem Bild, B gleitet 415 px in 333 ms; Menü auf gemessen 270–290 ms (0,35 s, flaches Ende), zu ~230 ms.
  - Fund beim Bau (Playwright-WebKit 26.0): ein laufendes CSS-`translate` (Blatt, R-4.6) fehlt in `getBoundingClientRect`, `transform` nicht – das
    Muster zeichnet den Versatz zusätzlich aus dem berechneten Stil auf (`bt`, `gt`); am Gerät prüfen (Spalten `blatt` und `bt`), dann ggf.
    Designrichtlinie 13 (mit Wortlaut, 0 Nr. 29).
  - Auswerten: `node "arbeit/APD-127 auswerten.mjs" <messung-APD-127-….txt>` (Datei im Notizordner der Sitzung ablegen).

## 3. Nächster Schritt

1. Lesen wie immer, Repos dazuholen, Tests einrichten. **Lagebild als eigene Antwort – im Chat und als Datei – mit Kachel am Ende** (APD-125).
2. **APD-127 Messung auswerten:** der Nutzer misst am iPhone hoch (hell) und gibt `messung-APD-127-….txt` in den Chat, dazu, ob A oder B sich besser
   anfühlt. Auswerten (Dauer und Kurve der Tastatur `vh`, Sprung bzw. Gleiten von `wie`, Verschiebung durch Safari `vt`, Menü), in die Arbeitsdatei
   eintragen, das Safari-Modell prüfen (0 Nr. 20). Dann Wortlaut ‚alle Gleitbewegungen wie das Mehr-Menü‘ (0 Nr. 29) und Testfall-Liste.
3. Dann die Bau-Frage (0 Nr. 8, 21): Korrekturversion AppDesign 4.57.0 / Reiselogbuch 3.55.0 mit APD-125, APD-126, RLB-123 (und APD-127, wenn geklärt) –
   höchstens 2 Themen, ggf. aufteilen.

## 4. Danach

APD-124 (berührt APD-126 – zusammen besprechen) · APD-116 · RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 (Wackler `ablauf-suche-woerter` und
`ablauf-seitenleiste-position` WebKit) · APD-80 · APD-30 übrige Teile · APD-57 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0100 – APD-127 Messung auswerten

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (3.10.0 plus APD-125: vor jeder Kachel alle wichtigen Informationen in einer Datei und im Chat) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, richte die Tests ein und prüfe, ob in ~/.claude/settings.json Hooks stehen. Lagebild als eigene Antwort (im Chat und als Datei) mit Kachel, dann weiter nach UEBERGABE.md Abschnitt 3: Messung APD-127 auswerten (arbeit/APD-127 Messung und Testfall-Liste.md), danach Wortlaut und Bau-Frage.
```
