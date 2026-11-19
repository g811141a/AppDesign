# Bericht – AppDesign 4.63.0 / Reiselogbuch 3.57.6 (APD-135 Paket 5)

**Stand 19.11.2026** · Sitzung Reiselogbuch 0136

## Kurz

AppDesign 4.63.0 und Reiselogbuch 3.57.6 sind veröffentlicht: Der volle Prüflauf in `los` ist **grün (163 Läufe in 80:16, Chromium und WebKit)**, beide
Pages-Läufe ‚success‘, und `main` enthält die neuen Versionen (`APP_VERSION` 3.57.6, `AD_NEEDED` 4.63.0, `AD_VERSION` 4.63.0 in `v4/` und `fassung/4.63.0/`).
Der Lauf war zugleich der Vergleichslauf ‚lang zuerst‘: **0 Wackler**, längster Lauf **416 s** (Grenze 450 s). Die App ändert sich in Bedienung und Aussehen nicht,
neu sind Prüfungen und Werkzeuge.

## Alle Änderungen

**AppDesign 4.63.0** (Designrichtlinie 4.63.0, Zusammenarbeit 3.16.0)
1. `tests/lauf.mjs`: Vorlauf `doku-regeln` und `version-regeln`, rot bricht sofort ab (nicht in der Gegenprobe); die längsten zuerst, nie gemessene vorne;
   `doku-regeln` nur im ersten Browser; Ausgabe eines Wacklers in `tests/out/wackelt-<Name>[-<Teil>]-<Browser>.txt`, Schlusszeile nennt die Datei;
   `--abdeckung` je Teil (APD-135/Z-1 bis Z-7).
2. `tests/pruefe.mjs`: `pruefung().abdeckung()` schreibt je Teil eine eigene Datei (`PRUEF_TEIL`).
3. `tests/doku.mjs`: `checkCatalog` zählt eine Regelnummer nur in Zeichenketten von Prüfdateien des Prüflaufs; Gegenproben `schema:APD-135/Z-8`, `Z-9`.
4. `tests/ablauf.mjs`: neu `checkFilterAlle` für R-7.9.
5. `werkzeug/veroeffentlichen.mjs`: `los` startet die Selbsttests der seit `origin/main` geänderten Werkzeuge; `messung` nicht mehr in jedem `los`
   (APD-135/Z-11 bis Z-13).
6. `tests/lauf-selbsttest.mjs`, `werkzeug/veroeffentlichen-selbsttest.mjs`: neue Fälle; Fehlerbehebung APD-5/E-1 (Selbsttest war seit 4.61.0 rot, weil ihn
   kein Skript startete – jetzt startet `los` ihn).
7. Zusammenarbeit 0 Nr. 2 und 0 Nr. 9; Designrichtlinie 14, 15.3, 17 Kopf, R-5.1 (mit G-8), neu R-7.9 (statt G-16), G-Tabelle.
8. `tests/README.md`, Versionsgeschichten, CHANGELOG 4.63.0, Backlog.

**Reiselogbuch 3.57.6** (App unverändert, Fassung 4.63.0)
9. `ablauf-gesamt`: R-7.9 (Filter steht nach Neustart bzw. Öffnen eines anderen Reiselogbuchs auf ‚Alle Tage‘), Gegenprobe ‚filter‘.
10. `ablauf-seitenleiste-position`: Teil ‚Bedienungshilfen‘ wirkt jetzt, nach dem Start Warten auf Ruhe.
11. `ablauf-tastatur-still`, `ablauf-abspielen`, `ablauf-suche-iphone`, `ablauf-texte-ablaeufe`: Grundregeln nach jedem Schritt.
12. `hig`: meldet seine Ansichten für `--abdeckung`.
13. `tests/alle.mjs`, `tests/README.md`, README/PROMPT, CHANGELOG 3.57.6 mit P-113/0, Backlog (Usertest P-113).

## Prüfergebnisse (diese Sitzung, aus der Ausgabe von `los`)

| Prüfung | Ergebnis |
|---|---|
| `lauf-selbsttest`, `veroeffentlichen-selbsttest` (vor dem Prüflauf) | grün |
| Vorlauf `doku-regeln` (Chromium), `version-regeln` (beide) | grün |
| voller Prüflauf (APD-135/Z-19) | ‚Alle 163 Läufe grün in 80:16‘ – 4.62.0: 164 Läufe in 81:24 (ein Lauf weniger, weil `doku-regeln` nur noch einmal läuft) |
| Vergleich (APD-135/Z-20) | 0 Wackler; längster Lauf `ablauf-wischen:iPad|webkit` 416 s, dann 388 s und 387 s (`tests/out/dauer.json`) |
| Pages | AppDesign 2506cca ‚success‘ (63 s) · Reiselogbuch 9418a4d ‚success‘ (63 s) |

## Apple-Review

Die App ändert sich nicht, deshalb gibt es keine neuen Punkte für Aussehen oder Bedienung; es **entspricht HIG** wie in 3.57.5. Das HIG- und Regel-Prüfskript
`hig` ist in allen 8 Teilen (hell, dunkel, beide mit Bedienungshilfen, Textgrößen 14/23/33/53) in Chromium und WebKit grün (16 Läufe).

## Offene Usertests

**P-113** (Reiselogbuch 3.57.6, AppDesign 4.63.0) – Link: https://g811141a.github.io/ReiseLogBuch/ – in der **App vom Home-Bildschirm**, zuerst die App ganz
schließen und neu öffnen.

**P-113/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.6 · erstellt am … · AppDesign 4.63.0‘.

Bitte die App neu starten, wie in Schritt 1.

## APD-138 (Klärung während des Laufs)

Entschieden: am iPad wächst das Hinweisfenster mit dem Dateinamen, höchstens wie `#msg.wide` (600 px mit der Textgröße, höchstens Bildschirmbreite − 32 px),
darüber Umbruch nach einem Leerzeichen; iPhone wie heute. Im Backlog eingetragen; als Nächstes Muster (iPad quer hell), Wortlaut R-10.8, Testfall-Liste –
`arbeit/0136 APD-138 Klärung.md`.

## Backlog

- **Nächste Version:** 0 Punkte bereit (AppDesign und Reiselogbuch).
- **Offen im Backlog:** APD-135 (Prio 1, Pakete 6–7) · APD-136 (Prio 1) · APD-138 (Prio 2, in Klärung – Muster als Nächstes) · APD-139 (Prio 2) · RLB-125 (Prio 2) ·
  APD-70, RLB-126, RLB-6 (Prio 3).

**Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.**
