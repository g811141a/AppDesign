# Bericht – APD-135 Paket 5 vorbereitet, noch nicht gebaut (0 Nr. 11)

**Stand 19.11.2026** · Sitzung Reiselogbuch 0135 · Zweige `vorbereitung-4.63.0` (AppDesign) und `vorbereitung-3.57.6` (Reiselogbuch), beide auf GitHub ·
Testfall-Liste mit allen Ergebnissen: `arbeit/APD-135 Paket 5 Testfall-Liste.md` (auf `vorbereitung-4.63.0`).

## Kurz

Paket 5 ist fertig vorbereitet: Lauf-Werkzeug, Doku-Prüfung, Veröffentlichungs-Skript, fünf App-Prüfungen und die Texte nach dem bestätigten Wortlaut. Jeder neue
Fall ist gegen den veröffentlichten Stand rot und mit dem neuen Stand grün; alle Gegenproben sind rot mit der passenden Meldung. Dabei kam ein alter Fehler
heraus: der Selbsttest des Veröffentlichungs-Skripts war seit 4.61.0 rot (APD-5/E-1), unbemerkt, weil ihn kein Skript startete – genau der Befund APD-135/C-47.
Er ist behoben. `stufe` schlägt **voll** vor. Die App ändert sich nicht (Bedienung und Aussehen gleich).

## Alle Änderungen

**AppDesign 4.63.0** (Designrichtlinie 4.63.0, Zusammenarbeit 3.15.0 → 3.16.0)
1. `tests/lauf.mjs`: Vorlauf `doku-regeln` und `version-regeln`, rot bricht sofort ab (nicht in der Gegenprobe); die längsten zuerst, nie gemessene vorne;
   `doku-regeln` nur im ersten Browser; Ausgabe eines Wacklers in `tests/out/wackelt-<Name>[-<Teil>]-<Browser>.txt`, Schlusszeile nennt die Datei;
   `--abdeckung` je Teil (APD-135/Z-1 bis Z-7).
2. `tests/pruefe.mjs`: `pruefung().abdeckung()` schreibt je Teil eine eigene Datei (`PRUEF_TEIL`).
3. `tests/doku.mjs`: `checkCatalog` zählt eine Regelnummer nur in Zeichenketten von Prüfdateien des Prüflaufs (neu `zeichenketten`, `pruefdateien`);
   Gegenproben `schema:APD-135/Z-8`, `Z-9` (APD-135/Z-8 bis Z-10).
4. `tests/ablauf.mjs`: neu `checkFilterAlle` für R-7.9.
5. `werkzeug/veroeffentlichen.mjs`: `los` startet die Selbsttests der seit `origin/main` geänderten Werkzeuge (lauf, Veröffentlichung/pruefstufe, messung);
   `messung` nicht mehr in jedem `los` (APD-135/Z-11 bis Z-13).
6. `tests/lauf-selbsttest.mjs`, `werkzeug/veroeffentlichen-selbsttest.mjs`: neue Fälle; dazu **Fehlerbehebung** APD-5/E-1 (lässt nach `vorbereiten` die noch
   fehlende Zeile der Versionsgeschichte zu).
7. Zusammenarbeit 0 Nr. 2 und 0 Nr. 9; Designrichtlinie 14, 15.3, 17 Kopf, R-5.1 (mit G-8), neu R-7.9 (statt G-16), G-Tabelle – wörtlich nach dem Wortlaut.
8. `tests/README.md`, Versionsgeschichten, CHANGELOG 4.63.0, Backlog (APD-135 ‚Paket 5 gebaut in …‘).

**Reiselogbuch 3.57.6** (App unverändert, Fassung 4.63.0)
9. `ablauf-gesamt`: R-7.9 – Start mit ‚Nur erfasste Tage‘ und neu Filter setzen → neu starten / Toskana öffnen → ‚Alle Tage‘; Gegenprobe `PRUEF_GEGENPROBE=filter`.
10. `ablauf-seitenleiste-position`: Seiten mit `t.seite` (Teil ‚Bedienungshilfen‘ wirkt jetzt), nach dem Start Warten auf Ruhe statt fester Pause.
11. `ablauf-tastatur-still`, `ablauf-abspielen`, `ablauf-suche-iphone`, `ablauf-texte-ablaeufe`: Grundregeln nach jedem Schritt (`hig: createCheck()`).
12. `hig`: meldet seine Ansichten für `--abdeckung`.
13. `tests/alle.mjs`, `tests/README.md`, README/PROMPT (Zusammenarbeit 3.16.0), CHANGELOG 3.57.6 mit Testfall P-113/0, Backlog (Usertest P-113).

## Prüfergebnisse (diese Sitzung)

| Prüfung | Ergebnis |
|---|---|
| `lauf-selbsttest` | grün; gegen 4.62.0 rot mit 9 Fehlern (APD-135/Z-1, Z-2, Z-3, Z-5 ×2, Z-6 ×2, Z-7; Z-4 bleibt grün wie gefordert) |
| `veroeffentlichen-selbsttest` | alle Fälle grün; gegen das alte Skript APD-135/Z-11 bis Z-13 alle rot; `main` 70b577e selbst: 1 Fall rot (APD-5/E-1, alt) |
| `doku-regeln`, `version-regeln` | grün |
| `--gegenprobe schema` | alle 22 Läufe rot mit passender Meldung (neu APD-135/Z-8, Z-9) |
| APD-135/W-54 Laufzeit (beide Browser, `--jobs 1`) | 12:55 → 13:31, alle grün; `--gegenprobe grundregeln` alle 4 rot (gegen 3.57.5: ‚prüfen nichts‘) |
| APD-135/C-31 Gegenprobe ‚verschiebung‘ | gegen 3.57.5 grün (wirkungslos); neu rot mit 4 × R-1.9 |
| R-7.9 Gegenprobe ‚filter‘ | rot mit 4 × R-7.9 |
| `ablauf-seitenleiste-position`, `ablauf-gesamt` normal | grün (beide Browser) |
| Abdeckung echt (`ablauf-fenster`, `hig`, Chromium) | 11 Läufe grün, je Teil eine Zeile |

## Offene Usertests

Keine (P-112 ok, 19.11.2026). Nach dem Bau: P-113/0 ‚Version prüfen‘ (Reiselogbuch 3.57.6 · AppDesign 4.63.0).

## Bau-Frage (in der neuen Sitzung)

‚Soll ich Version AppDesign 4.63.0 / Reiselogbuch 3.57.6 mit APD-135 Paket 5 erstellen (Prüflauf Stufe voll)? (Kontext N)‘. Der volle Lauf in `los` läuft schon
‚lang zuerst‘ und dient zugleich als Vergleichslauf (APD-135/J-26: gleiche Zahl Wackler wie zuletzt, kein Lauf über 450 s – aus der Ausgabe und `dauer.json`).
Ein zusätzlicher Lauf `--alle` vorher wäre ein zweiter Prüflauf je Version (0 Nr. 2) – nur, wenn du ihn ausdrücklich willst; wird `los` rot, folgt er ohnehin.
