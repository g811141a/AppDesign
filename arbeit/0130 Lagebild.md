# Lagebild – Reiselogbuch 0130

Stand 18.11.2026, 13:05 · Sitzung ‚Reiselogbuch 0130 – Usertest P-109, dann APD-135 Pakete 1 und 3‘

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.2** veröffentlicht (`main` 21f2c74) |
| AppDesign | **4.60.2** veröffentlicht (`main` 7e559e1; Übergabe auf Zweig `claude/gallant-fermat-e91n6w`, 486b549) |
| Zusammenarbeit allgemein | 3.14.1 |
| AppDesign-`CLAUDE.md` | 2.12.0 · Reiselogbuch-`CLAUDE.md` 3.9.0 |
| ReiseLogBuch-Import (privat) | Commit c747fee (‚1.3.0‘) |

## Arbeitsumgebung

- Alle drei Repos angehängt und geklont; Verweise `appdesign`, `reiselogbuch`, `reiselogbuch-import` angelegt und registriert.
- AppDesign auf Zweig `claude/gallant-fermat-e91n6w` (Stand `main` + Übergabe).
- **Tests eingerichtet:** Playwright 1.56.1 (package-Dateien gelöscht), Chromium-Verweise 1194 → 1243; Probe `ablauf-leer.mjs` grün in
  Chromium und WebKit, `lauf-selbsttest.mjs` grün. Import-Werkzeug: `npm install` erledigt. 4 Kerne.
- **Hooks:** `~/.claude/settings.json` ist leer (`{}`) – keine Hooks.

## Modell, Aufwand, Nutzung

- **Modell:** eingestellt `claude-opus-5-5` (get_session `session_context.model`), zuletzt bedient `claude-opus-5-5`; **kein `model_fallback`**
  in der Sitzungsdatei.
- **Aufwand:** eingestellt **hoch** (`effort_level: high`), tatsächlich **hoch** (alle 16 Modell-Aufrufe `"effort":"high"`);
  `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt – wie vorgesehen.
- **Nutzungsgrenze:** 5-Stunden-Fenster ‚allowed‘, ohne Überziehung; Rücksetzung 17:30 Uhr.
- **Kontext:** 145.074 (messung.mjs).

## Backlog-Spitze

- **AppDesign:** 0 Punkte bereit · offen: **APD-135** (Prio 1, Konsolidierung 3 – als Nächstes Pakete 1 und 3 mit APD-135/W-57, Wortlaut
  bestätigt) · **APD-136** (Prio 1, Umbau der Elemente mit APD-135 Paket 6 und 7) · danach APD-62, APD-44 bis APD-55 (Prio 3).
- **Reiselogbuch:** 0 Punkte bereit · offen: **RLB-125** Reiselogbuch sperren (Prio 2) · **RLB-126** ‚Zuletzt gelöscht‘ (Prio 3) · RLB-6 (Prio 3).
- Vereinbarung: Muster bis auf Weiteres **nur hell**.

## Nächster Schritt

1. Deine Rückmeldung zum Usertest P-109 (unten). Bei ‚nicht ok‘ zuerst die Korrektur (0 Nr. 22).
2. Sind alle ok: **APD-135 Pakete 1 und 3 mit APD-135/W-57** – Testfall-Liste, Prüfung rot gegen 4.60.2, dann die Bau-Frage.

## Offener Usertest P-109 (Reiselogbuch 3.57.2, AppDesign 4.60.2)

Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der **App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.
Es wird nichts gelöscht: nie ‚Löschen‘ antippen. Zum Vergleich Notizen daneben öffnen.

**P-109/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.2 · erstellt am … · AppDesign 4.60.2‘.

**P-109/1 – Aufwischen wie Notizen: ab halber Kapsel, aus der Mitte**
1. iPad quer: in der Seitenleiste ‚Reiselogbücher‘ eine Kachel langsam nach links wischen und auf die Kapseln rechts daneben achten.
2. Erwartet: zuerst ist nichts zu sehen; sobald etwa die halbe Kapsel frei ist, wächst rot ‚Löschen‘ aus ihrer Mitte und ist ganz da, wenn auch der Abstand daneben frei ist; danach erscheint ‚Einstellen‘ auf dieselbe Weise.
3. Loslassen, wenn die Kachel offen bleibt. Erwartet: beide Kapseln in voller Größe; die Abstände Kachel–‚Einstellen‘, ‚Einstellen‘–‚Löschen‘ und ‚Löschen‘–rechter Rand sind gleich groß.
4. Dasselbe am iPhone hoch in der Startliste. Erwartet: wie in 2 und 3.

**P-109/2 – Zurückwischen und Tippen: genau umgekehrt**
1. iPad quer: eine Kachel öffnen (nach links wischen, bis sie offen bleibt).
2. Die offene Kachel langsam nach rechts zurückwischen.
3. Erwartet: zuerst schrumpft ‚Einstellen‘ zu ihrer Mitte, bis sie weg ist, danach ‚Löschen‘; keine Kapsel ragt über den Rand der Seitenleiste.
4. Eine Kachel öffnen und auf die Kachel tippen. Erwartet: sie gleitet zurück, die Kapseln vergehen in derselben Reihenfolge (erst ‚Einstellen‘, dann ‚Löschen‘).
5. Dasselbe am iPhone hoch. Erwartet: wie in 3 und 4, nichts ragt über den rechten Bildrand.

**P-109/3 – Über die Kapseln hinaus: kein Durchwischen, Zurückfedern**
1. iPad quer: eine Kachel langsam nach links wischen und weit über die Kapseln hinaus weiterziehen, ohne loszulassen.
2. Erwartet: die Kachel geht nur noch wenig und schwer mit; die Kapseln rücken etwas mit und werden minimal größer; keine Kapsel wird langgezogen, keine verschwindet.
3. Loslassen. Erwartet: die Kachel federt auf ‚offen‘ zurück, beide Kapseln stehen da, es erscheint keine Sprechblase, nichts wird gelöscht.
4. Dasselbe am iPhone hoch und zum Vergleich in Notizen. Erwartet: wie in 2 und 3, Ablauf wie in Notizen.

**P-109/4 – Bewegung reduzieren: Kapseln blenden nur ein**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Bewegung › ‚Bewegung reduzieren‘ ein; App neu öffnen.
2. Eine Kachel langsam nach links wischen. Erwartet: die Kachel folgt dem Finger; die Kapseln stehen an ihrem Platz in voller Größe und blenden ab etwa der halben Kapsel nur ein – sie wachsen nicht und rücken nicht.
3. Weit darüber hinaus ziehen und loslassen. Erwartet: die Kapseln bleiben stehen, die Kachel federt auf ‚offen‘ zurück, keine Sprechblase.
4. ‚Bewegung reduzieren‘ wieder aus.

**P-109/5 – Größte Textgröße: Kapseln und Abstände größer**
1. iPad und iPhone: Einstellungen › Bedienungshilfen › Anzeige & Textgröße › Größerer Text ein, Regler ganz nach rechts; App neu öffnen.
2. Eine Kachel nach links wischen, bis sie offen bleibt.
3. Erwartet: die Kapseln samt Symbol und die Abstände dazwischen sind sichtbar größer als bei normaler Textgröße, die Wörter ganz zu lesen, nichts abgeschnitten, keine Kapsel ragt aus Seitenleiste oder Bild.
4. Textgröße wieder zurückstellen.
