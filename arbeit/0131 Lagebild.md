# Lagebild – Reiselogbuch 0131

**18.11.2026** · Sitzung ‚Reiselogbuch 0131 – Usertest P-110, dann APD-135 Pakete 1 und 3‘

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| Reiselogbuch | **3.57.3** (`main` bf600c5) | `APP_VERSION` in `index.html`, `AD_NEEDED` 4.60.3 |
| AppDesign | **4.60.3** (`main` 75a1415, Fassung `fassung/4.60.3/`) | `AD_VERSION` in `v4/ui.js` |
| Zusammenarbeit allgemein | **3.14.1** | Kopf der Datei |
| AppDesign-`CLAUDE.md` / Reiselogbuch-`CLAUDE.md` | **2.12.0** / **3.9.0** | Kopf der Dateien |
| ReiseLogBuch-Import | Commit **c747fee** | Klon |

Übergabe gelesen vom Zweig `claude/gallant-fermat-e91n6w` (e3c9922).

## Modell, Aufwand, Nutzung

- **Modell:** eingestellt `claude-opus-5-5` (`get_session`: `session_context.model`, `configured_model`), tatsächlich `claude-opus-5-5`
  (`last_served_model` und alle 16 Aufrufe der Sitzungsdatei); **kein `model_fallback`**.
- **Aufwand:** eingestellt **hoch** (`session_context.effort_level`), tatsächlich **hoch** (alle 16 Aufrufe `"effort":"high"`) – stimmt überein.
  `CLAUDE_CODE_EFFORT_LEVEL` ist ungesetzt (so gewollt, 2.5).
- **Nutzungsgrenze** (`rate_limit_info`): Fünf-Stunden-Fenster, Status ‚allowed‘, keine Überziehung; Rücksetzung 18.11.2026 22:30 (MEZ).
- **Hooks:** `~/.claude/settings.json` ist leer (`{}`) – keine Hooks.

## Arbeitsumgebung

- ReiseLogBuch und ReiseLogBuch-Import dazugeholt (`add_repo`, push) und geklont, Verweise in Kleinbuchstaben angelegt, alle drei
  Repos registriert.
- Tests eingerichtet: Playwright 1.56.1 in `ReiseLogBuch/tests` (`package.json`/`package-lock.json` gelöscht), Chromium-Verweise
  1194 → 1243, `werkzeug` von ReiseLogBuch-Import mit `npm install`.
- Probelauf `tests/ablauf-leer.mjs`: Chromium ‚alles in Ordnung‘, WebKit ‚alles in Ordnung‘.

## Offener Usertest

**P-110** (Reiselogbuch 3.57.3, AppDesign 4.60.3) – Rückmeldung steht aus. Testfälle wörtlich aus dem Reiselogbuch-CHANGELOG:

Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der **App vom Home-Bildschirm**, zuerst die App ganz schließen und neu
öffnen. Es wird nichts gelöscht: nie ‚Löschen‘ antippen. Zum Vergleich Notizen daneben öffnen.

**P-110/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.3 · erstellt am … · AppDesign 4.60.3‘.

**P-110/1 – Aufwischen weich wie Notizen**
1. iPhone hoch: in der Startliste eine Kachel zügig nach links wischen und loslassen.
2. Erwartet: die Kachel gleitet weich auf ‚offen‘ und kommt sanft zum Stehen; ‚Löschen‘ und danach ‚Einstellen‘ wachsen sichtbar aus ihrer Mitte, nicht schlagartig – wie in Notizen.
3. Dasselbe am iPad quer in der Seitenleiste. Erwartet: wie in 2.

**P-110/2 – Tippen auf eine andere Kachel: weich zu**
1. iPhone hoch: eine Kachel öffnen (nach links wischen, bis sie offen bleibt).
2. Auf eine andere Kachel tippen.
3. Erwartet: beide Kapseln schrumpfen zugleich und blenden aus, die Kachel gleitet weich darüber zurück und kommt sanft zum Stehen; die angetippte Kachel öffnet sich nicht.
4. Dasselbe am iPad quer. Erwartet: wie in 3.

**P-110/3 – Zurückwischen und Tippen auf die offene Kachel**
1. iPhone hoch: eine Kachel öffnen und langsam mit dem Finger zurückwischen.
2. Erwartet: zuerst vergeht ‚Einstellen‘, dann ‚Löschen‘, jeweils wenn die Kachel sie erreicht.
3. Eine Kachel öffnen und auf die offene Kachel tippen. Erwartet: sie gleitet weich zurück, die Kapseln vergehen nacheinander.
4. Dasselbe am iPad quer. Erwartet: wie in 2 und 3.

**P-110/4 – Bewegung reduzieren**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Bewegung › ‚Bewegung reduzieren‘ ein; App neu öffnen.
2. Eine Kachel nach links wischen und loslassen, dann auf eine andere Kachel tippen.
3. Erwartet: die Kapseln stehen an ihrem Platz in voller Größe und blenden nur ein bzw. aus – sie wachsen nicht und rücken nicht; nichts wird gelöscht.
4. ‚Bewegung reduzieren‘ wieder aus.

## Backlog-Spitze

- **AppDesign:** 0 Punkte bereit · in Klärung APD-135 (Prio 1, Konsolidierung 3), APD-136 (Prio 1, AD-Beans), dann APD-62, APD-44 bis APD-55 (Prio 3).
- **Reiselogbuch:** 0 Punkte bereit · in Klärung RLB-125 (Prio 2, Reiselogbuch sperren), RLB-126 (Prio 3, ‚Zuletzt gelöscht‘), RLB-6 (Prio 3).

## Nächster Schritt (UEBERGABE.md Abschnitt 3)

1. Rückmeldung zum Usertest P-110 – bei ‚nicht ok‘ zuerst die Korrektur (0 Nr. 22).
2. Sind alle ok: APD-135 Pakete 1 und 3 mit APD-135/W-57 (eigene Version, voll; Wortlaut bestätigt in
   `arbeit/APD-135 Pakete 1 und 3 Wortlaut.md`) – Testfall-Liste, Prüfung rot gegen 4.60.3, dann die Bau-Frage.

## Hinweise

- Muster bis auf Weiteres **nur hell** (Vereinbarung 30.10.2026).
- Offen aus 0130: die Gegenproben APD-30/W-87, W-88, W-89, W-96, W-103, W-104 sind noch nicht einzeln gelaufen.
- Hilfsagenten nur Opus 5.5, Aufwand hoch, einzeln; Fable 5.2 vorerst nicht.
