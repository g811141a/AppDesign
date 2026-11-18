# Bericht – AppDesign 4.61.0 / Reiselogbuch 3.57.4

**18.11.2026** · Sitzung Reiselogbuch 0131 · veröffentlicht mit `los`, Stufe voll

## Kurz

AppDesign 4.61.0 und Reiselogbuch 3.57.4 sind veröffentlicht: Der volle Prüflauf war grün (alle 164 Läufe, 82:23 min), der Pages-Lauf war bei
beiden ‚success‘ (AppDesign `main` f2c4683, Reiselogbuch `main` 0868a56). Die Version enthält APD-135 Pakete 1 und 3 mit APD-135/W-57. Geändert haben
sich nur Regeln, Doku und die Doku-Prüfung, **die App selbst ist unverändert**. Neu prüft `checkVersionsgeschichte`, dass die Versionsgeschichten
ausgelagert sind (APD-135/M-1 bis M-4). Diese Prüfung war gegen 4.60.3 rot (11 Meldungen) und ist jetzt grün.

## Änderungen

- **47 W-Punkte** der Pakete 1 (32) und 3 (15) sowie APD-135/W-57 (0 Nr. 25 – AD-Bean klären) und die Backlog-Ordnung APD-135/L-18, alles mit dem
  bestätigten Wortlaut.
- **Versionsgeschichten ausgelagert** (W-31) in vier neue Dateien: `README - Zusammenarbeit Versionsgeschichte.md`,
  `README - Designrichtlinie allgemein Versionsgeschichte.md` und je Repo `CLAUDE Versionsgeschichte.md`. Am alten Platz steht nur noch der Verweis.
- **Kasten ‚Immer‘** nennt jetzt Nr. 21, 22, 1, 8, 27, 29 und 19. ‚Verpflichtend‘ in der AppDesign-`CLAUDE.md` wiederholt keine Regel mehr (W-18).
- **`PROMPT.md` W-33** mit deiner Entscheidung ‚mit R-7.8‘: ‚iPad hoch und quer: die ausgeblendete Seitenleiste kommt auch durch Wischen nach
  rechts im Reiselogbuch (R-7.5); nach links wischen blendet sie nie aus, auf einer Kachel zeigt es die Wischaktionen (R-7.8).‘
- **Neue Versionen:** Zusammenarbeit 3.15.0 · Designrichtlinie allgemein 4.61.0 · Designrichtlinie Reiselogbuch 3.57.4 · AppDesign-`CLAUDE.md`
  2.13.0 · Reiselogbuch-`CLAUDE.md` 3.10.0.
- **Usertest P-110** ist ‚alles ok‘ und steht in beiden Backlogs unter ‚Erledigt‘.

## HIG und Apple-Review

- Die Bedienung ist unverändert, deshalb **entspricht HIG** wie bisher. Es gibt keine neue Abweichung und deshalb keine Screenshots.
- Prüfskript HIG und Regeln: `hig` in 8 Ansichten (hell, dunkel, Bedienungshilfen, Text 14/23/33/53), `kontextmenue-regeln`, `doku-regeln`,
  `version-regeln` – alle grün in Chromium und WebKit.

## Bitte jetzt

**App neu starten:** auf iPhone und iPad ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.

## Usertest P-111

Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der **App vom Home-Bildschirm** testen. Es wird nichts gelöscht.

**P-111/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.4 · erstellt am … · AppDesign 4.61.0‘.

Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.

## Backlog-Erinnerung

Nächste Version AppDesign/Reiselogbuch: **0 Punkte bereit** · Offen im Backlog: **P-111** (Usertest, prüfen) · APD-135 Paket 2 (als Nächstes, Wortlaut
noch zu klären), dann Pakete 4 bis 7 · APD-136 (AD-Beans) · RLB-125 (Prio 2, Reiselogbuch sperren) · RLB-126 (Prio 3, ‚Zuletzt gelöscht‘) · RLB-6 ·
APD-62, APD-70, APD-44 bis APD-55 (Prio 3).

## Übergabe

‚⚠ Übergabe fällig‘ – die Sitzung **Reiselogbuch 0132** übernimmt. Sie fragt zuerst nach deiner Rückmeldung zu P-111.
