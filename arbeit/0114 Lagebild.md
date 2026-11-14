# Lagebild – Sitzung Reiselogbuch 0114

**Stand 14.11.2026** · Bau AppDesign 4.59.2 mit Reiselogbuch 3.56.2 fortsetzen (das ‚Ja‘ zum Bau liegt vor, Nutzer 14.11.2026)

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.56.1** veröffentlicht · **3.56.2** in Vorbereitung (Zweig `vorbereitung-3.56.2`, Stand `834579f`) |
| AppDesign | **4.59.1** veröffentlicht · **4.59.2** in Vorbereitung (Zweig `vorbereitung-4.59.2`, Stand `1892fa6`) |
| Zusammenarbeit allgemein | **3.13.0** (auf `main`) |
| AppDesign-`CLAUDE.md` | **2.12.0** |

## Sitzung und Umgebung

- **Modell:** `claude-opus-5-5` (`get_session`: eingestellt und zuletzt bedient); **kein** `model_fallback` in der Sitzungsdatei.
- **Aufwand:** hoch (alle 12 Modell-Aufrufe `"effort":"high"`; `CLAUDE_CODE_EFFORT_LEVEL=high`).
- **Hooks:** `~/.claude/settings.json` = `{}` – keine Hooks.
- **Repos:** AppDesign und ReiseLogBuch nebeneinander, Verweise klein angelegt, beide registriert; Zweige `vorbereitung-4.59.2` bzw.
  `vorbereitung-3.56.2` ausgecheckt.
- **Tests eingerichtet:** Playwright 1.56.1, Chromium-Verweise (1194 → 1243), WebKit 2215 vorhanden, 4 Kerne.

## Prüfstand zum Start (`tests/ablauf-drehen-iphone.mjs`, ein Lauf je Browser)

- **Chromium:** rot nur **APD-129/M-12** (Blatt, 2 Bilder Kopf 72 statt 10) – wie in der Übergabe beschrieben (Modell meldet die sichtbare Höhe
  nach dem Drehen zu spät).
- **WebKit:** rot **APD-129/M-11** (Reiselogbuch, 2 Bilder Kopf 62 statt 0) – laut Übergabe war WebKit in 0113 grün. Vermutung: Wackler im
  Zeitverlauf (vgl. APD-85 Teil 6); ich prüfe es beim Weiterbauen.

## Offene Usertests

- **P-104** (Reiselogbuch 3.56.1 mit AppDesign 4.59.1): /0 und /4 ok; **/1, /2, /3 nicht ok** – das Bild springt nach dem Zurückdrehen
  auf hoch nach oben (erwartet: wie am iPad). Die Korrektur ist Inhalt von 4.59.2 / 3.56.2; danach folgt Usertest **P-105**.

## Backlog-Spitze

- **AppDesign – Nächste Version 4.59.2: 2 Punkte bereit** (APD-129 Teil 2 Korrektur iPhone-Sprung, APD-130/W-5 `messung.mjs` mit dem
  eingestellten Modell).
- **Reiselogbuch – Nächste Version:** 0 Punkte bereit.
- **Danach:** APD-85 Teil 6 (Wackler WebKit) · APD-80 · APD-30 · APD-57 · APD-62 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.
- Vereinbarung: Muster bis auf Weiteres **nur hell**.

## Nächste Schritte im Bau (UEBERGABE.md Abschnitt 3)

1. Modell APD-129/M-12 in Chromium (`s.gemeldet.h` beim Drehen nachführen), WebKit APD-129/M-11 klären.
2. Gegenprobe APD-129/M-18 (ohne Teil A gegen 4.59.1 rot, Chromium und WebKit).
3. APD-130/W-5: `messung.mjs` vergleicht mit dem eingestellten Modell, Prüfung `tests/messung.mjs`, Zusammenarbeit 2.2.
4. Designrichtlinie 13 nach APD-129/W-1 mit Versionsgeschichte.
5. CHANGELOG 3.56.2 mit Usertest **P-105**, Backlogs, `fassung`, committen, `stufe` (voll erwartet), `los --app reiselogbuch` im
   Hintergrund.
6. Bericht, danach Rückmeldung zu P-105.
