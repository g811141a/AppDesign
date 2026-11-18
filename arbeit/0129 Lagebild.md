# Lagebild – Reiselogbuch 0129

Stand 18.11.2026, 10:56 · Sitzung ‚Reiselogbuch 0129 – Muster P-108 wie Notizen, Korrektur 4.60.2, dann APD-135 Pakete 1 und 3‘

## Versionen

| Teil | Version |
|---|---|
| Reiselogbuch | **3.57.1** veröffentlicht (`main` a9c9984) |
| AppDesign | **4.60.1** veröffentlicht (`main` bd67818 + Muster aab2381; Pages-Lauf für aab2381 ‚success‘, 18.11.2026 09:06 UTC) |
| Zusammenarbeit allgemein | 3.14.1 |
| AppDesign-`CLAUDE.md` | 2.12.0 · Reiselogbuch-`CLAUDE.md` 3.9.0 |
| ReiseLogBuch-Import (privat) | Commit c747fee (‚1.3.0‘) |

## Arbeitsumgebung

- Alle drei Repos sind in der Sitzung angehängt; Verweise `appdesign`, `reiselogbuch`, `reiselogbuch-import` angelegt.
- Arbeitszweig `claude/gallant-fermat-e91n6w` in AppDesign und ReiseLogBuch auf `claude/magical-pasteur-7ouyvs` aufgesetzt; in AppDesign
  ist `main` (Muster-Commits d5e4335, aab2381) zusammengeführt, ReiseLogBuch-`main` war schon enthalten.
- **Tests eingerichtet:** Playwright 1.56.1, Chromium-Verweise (1194 → 1243); Probe `version-regeln.mjs` grün in Chromium und WebKit.
- **Hooks:** `~/.claude/settings.json` ist leer (`{}`) – keine Hooks.

## Modell, Aufwand, Nutzung

- **Modell:** eingestellt `claude-opus-5-5` (get_session `session_context.model`), zuletzt bedient `claude-opus-5-5`; **kein `model_fallback`**
  in der Sitzungsdatei.
- **Aufwand:** eingestellt **hoch** (`effort_level: high`), tatsächlich **hoch** (alle 13 Modell-Aufrufe `"effort":"high"`);
  `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt – wie vorgesehen.
- **Nutzungsgrenze:** 5-Stunden-Fenster ‚allowed‘, ohne Überziehung; Rücksetzung 12:00 Uhr.
- **Kontext:** 141.869 (messung.mjs).

## Offener Usertest P-108 (Reiselogbuch 3.57.1, AppDesign 4.60.1)

Rückmeldung (18.11.2026, Sitzung 0128): **/0, /3, /4 ok; /1 und /2 nicht ok** (P-108/F-1 bis P-108/F-4 – Kapsel erst ab halber Breite,
nichts langziehen und zurückfedern, Abstand Kachel–Kapsel wie zwischen den Kapseln, zurück umgekehrt – wie Notizen). Die Korrektur
kommt als AppDesign 4.60.2 / Reiselogbuch 3.57.2. Die Testfälle wörtlich:

**P-108/0 – Version prüfen** ✓
1. Auf iPhone und iPad die App ganz schließen und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.1 · erstellt am … · AppDesign 4.60.1‘.

**P-108/1 – Aufwischen: Kapseln nacheinander von außen** ✗
1. iPad quer: in der Seitenleiste eine Kachel langsam nach links wischen.
2. Erwartet: zuerst erscheint außen rot ‚Löschen‘, wächst und blendet ein; erst danach ‚Einstellen‘ ebenso.
3. Loslassen, wenn die Kachel offen bleibt. Erwartet: beide Kapseln in voller Größe nebeneinander.
4. Dasselbe am iPhone hoch. Erwartet: wie 2 und 3.

**P-108/2 – Zurückwischen umgekehrt, nichts über die Seitenleiste** ✗
1. iPad quer: eine Kachel öffnen.
2. Langsam nach rechts zurückwischen.
3. Erwartet: zuerst wird ‚Einstellen‘ kleiner und blasser bis weg, danach ‚Löschen‘; nichts rückt über den Rand der Seitenleiste.
4. Kachel öffnen und auf sie tippen. Erwartet: sie gleitet zurück, Kapseln vergehen in derselben Reihenfolge.
5. Dasselbe am iPhone hoch. Erwartet: wie 3 und 4, nichts über den rechten Bildrand.

**P-108/3 – Bewegung reduzieren: Kapseln blenden nur ein** ✓
1. ‚Bewegung reduzieren‘ ein, App neu öffnen.
2. Kachel langsam nach links wischen. Erwartet: Kapseln stehen an ihrem Platz in voller Größe und blenden nur ein.
3. Zurückwischen. Erwartet: Kapseln blenden nur aus.
4. ‚Bewegung reduzieren‘ wieder aus.

**P-108/4 – Größte Textgröße: Kapseln größer** ✓
1. Größerer Text ein, Regler ganz rechts; App neu öffnen.
2. Kachel öffnen.
3. Erwartet: Kapseln samt Symbol sichtbar größer, Wörter ganz lesbar, nichts ragt hinaus.
4. Textgröße zurückstellen.

## Offene Frage aus 0128 – Muster P-108 Stand 2 ‚N wie Notizen‘

Link (Pages-Lauf erfolgreich): **https://g811141a.github.io/AppDesign/arbeit/0128%20P-108%20Wischaktionen%20Muster.html?v=4**

1. Link in Safari öffnen, iPad quer. Erwartet: zwei Felder ‚N · wie Notizen – Reiselogbuch (2 Aktionen)‘ und ‚… zum Vergleich mit 3 Aktionen‘.
2. Im ersten Feld eine Kachel langsam nach links wischen. Erwartet: ‚Löschen‘ wächst aus seiner Mitte, sobald die halbe Kapsel frei ist, und ist
   voll, wenn auch der Abstand frei ist; danach ebenso ‚Einstellen‘.
3. Langsam zurückwischen. Erwartet: genau umgekehrt – erst schrumpft ‚Einstellen‘ zur Mitte, dann ‚Löschen‘.
4. Aufwischen und weit darüber hinaus ziehen. Erwartet: die Kachel geht nur noch wenig und schwer mit, die Kapseln rücken etwas mit und werden
   minimal größer, nichts wird langgezogen; loslassen – federt auf ‚offen‘ zurück.
5. Abstände ansehen. Erwartet: Kachel–Kapsel, zwischen den Kapseln und rechts außen gleich (11 pt).
6. Im zweiten Feld dasselbe und daneben Notizen öffnen. Erwartet: Ablauf wie in Notizen.

Dazu zu entscheiden: **Abstand 11 pt wie Notizen** statt der früher gewählten 8 px (P-108/Q-4) und **Kapselgröße** 66 × 44 behalten oder
60 × 32 wie Notizen.

## Backlog-Spitze

- **0. Nächste Version:** AppDesign 0 Punkte, Reiselogbuch 0 Punkte bereit.
- **Als Nächstes:** Korrektur P-108 → AppDesign 4.60.2 / Reiselogbuch 3.57.2 (voll), vor allem Neuen (0 Nr. 8, 22).
- **Danach:** APD-135 Pakete 1 und 3 mit APD-135/W-57 (Wortlaut bestätigt) · APD-136 Umbau der Elemente (mit APD-135 Paket 6 und 7) ·
  RLB-125 Reiselogbuch sperren (Prio 2) · RLB-126 ‚Zuletzt gelöscht‘ (Prio 3) · RLB-6 · APD-62 Rest (zurückgestellt).
- **Vereinbarung:** Muster bis auf Weiteres nur hell (Nutzer 30.10.2026). Erinnerung ‚Backlog-Erinnerung‘ montags 8:58.
