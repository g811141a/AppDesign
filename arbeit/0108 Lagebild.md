# Lagebild – Reiselogbuch 0108

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0108 – Usertest P-102‘

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.55.1** veröffentlicht (Fassung 4.57.0, `main` `307d86d`) |
| AppDesign | **4.57.0** veröffentlicht (`main` `abf3b7d`, Übergabe 0107) |
| Zusammenarbeit allgemein | **3.11.0** |
| AppDesign-`CLAUDE.md` | **2.11.0** |
| ReiseLogBuch-Import (privat) | 1.3.0 |

## Sitzung

- **Modell:** Opus 5.5 – `get_session`: `claude-opus-5-5`, zuletzt bedient `claude-opus-5-5`. Kein Modellwechsel: `model_fallback` steht in der
  Sitzungsdatei nur als Text (Starttext, Systemvorgabe), kein Eintrag des Systems.
- **Aufwand:** hoch – `CLAUDE_CODE_EFFORT_LEVEL=high`, `get_session` `effort_level: high`, alle Aufrufe in der Sitzungsdatei `"effort":"high"`.
- **Hooks:** `~/.claude/settings.json` = `{}` – keine Hooks.
- **Umgebung:** alle drei Repos waren schon angehängt und geklont (lokal = `origin/main`); Verweise `appdesign`/`reiselogbuch`/`reiselogbuch-import`
  angelegt; Playwright 1.56.1 in `ReiseLogBuch/tests` (`package.json`/`package-lock.json` gelöscht); Chromium-Verweise 1194 → 1243 angelegt;
  Probelauf `version-regeln`: Chromium und WebKit ‚alles in Ordnung‘.

## Backlog

- **Nächste Version:** AppDesign 0 Punkte bereit · Reiselogbuch 0 Punkte bereit.
- **Offen im Backlog:** APD-128 (Prüfumfang nach Art der Änderung, Prio 1) · RLB-121 (Statistik teuerste/günstigste Quartiere) · APD-85 Teil 6
  (Wackler WebKit) · APD-80 · APD-30 übrige Teile · APD-57 · APD-62 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.
- **Ohne bestätigten Wortlaut (aus 0106):** PROMPT.md ‚Emojis klein‘; VoiceOver-Name für Rückgängig; ‚Cursor am Ende‘ in Designrichtlinie 16;
  `tests/README.md`; `color-mix` am Gerät.
- **Vereinbarung:** Muster bis auf Weiteres nur hell (Nutzer 30.10.2026).
- **Später zu prüfen:** nach einem iOS-Update, das `print()` in der App vom Home-Bildschirm wieder zulässt, den PDF-Hinweis entfernen.

## Offener Usertest P-102 (Reiselogbuch 3.55.1, AppDesign 4.57.0)

Wörtlich aus `ReiseLogBuch/CHANGELOG.md`:

Testfälle P-102 (Schritt für Schritt, Zusammenarbeit allgemein 3.11.0). Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.

**P-102/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.55.1 · erstellt am … · AppDesign 4.57.0‘.

**P-102/1 – Hinweis im Teilen-Menü (iPad)**
1. iPad quer, hell, App vom Home-Bildschirm: ein Reiselogbuch öffnen.
2. Oben das Teilen-Icon (share) antippen.
3. Erwartet: die Punkte ‚Vorschau‘, ‚HTML‘ und ‚PDF (mit iOS 27 zurzeit nicht möglich)‘, darunter grau ‚Im Drucken-Menü Teilen, dann ‚In Dateien
   sichern‘‘. Menü mit Antippen daneben schließen.

**P-102/2 – Hinweis ganz lesbar (iPhone)**
1. iPhone hoch, hell, App vom Home-Bildschirm: ein Reiselogbuch öffnen.
2. Oben das Teilen-Icon (share) antippen.
3. Erwartet: ‚PDF (mit iOS 27 zurzeit nicht möglich)‘ ist ganz zu lesen (bei Bedarf in zwei Zeilen), nichts abgeschnitten, das Menü liegt ganz im
   Bildschirm.

**P-102/3 – Safari druckt weiter**
1. iPad quer, hell: in **Safari** https://g811141a.github.io/ReiseLogBuch/ öffnen und ein Reiselogbuch öffnen.
2. Teilen-Icon (share) antippen, dann ‚PDF (mit iOS 27 zurzeit nicht möglich)‘.
3. Erwartet: derselbe Hinweis im Menü; danach das Fenster ‚Ausgabe V…‘ mit ‚Drucken-Menü geöffnet für‘ und das Drucken-Menü öffnet sich. Drucken-Menü
   schließen, Fenster mit x schließen.

## Danach

APD-128 klären: Stufen, Wortlaut 0 Nr. 2 (nach 0 Nr. 29), Auswahl im Skript (`los --stufe`), Selbsttest – `arbeit/0107 Brainstorming Prüfumfang.md`.

Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.
