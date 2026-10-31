# APD-102 – Testfall-Liste

Stand 31.10.2026 · Sitzung Reiselogbuch 0065 · allgemein (AppDesign, Werkzeug `werkzeug/veroeffentlichen.mjs`). Kein Muster, kein
Apple-Abgleich (reines Werkzeug).

## Anlass

Sitzung 0062: `los` prüfte 51 min lang alle 124 Läufe grün und brach erst beim Zusammenführen nach `main` ab – auf `main` lag eine neuere
`UEBERGABE.md` (Konflikt); von Hand behoben. Heute führt `veroeffentliche()` den Vorbereitungs-Zweig erst **nach** dem Prüflauf in
`origin/main` zusammen; geprüft wird also nicht genau der Stand, der veröffentlicht wird, und ein Konflikt zeigt sich erst am Ende.

## Vorschlag (Variante a)

`los` holt **vor** dem Prüflauf `origin/main` (beide Repos). Hat `main` Commits, die im Vorbereitungs-Zweig fehlen, führt `los` sie in den
Zweig zusammen (Merge-Commit ‚Merge origin/main in vorbereitung-X.Y.Z‘) und prüft diesen Stand; bei einem Konflikt bricht es **vor** dem
Prüflauf ab (Zusammenführung zurückgenommen, Zweig unverändert) und nennt die Dateien. Ändert sich `main` während des Prüflaufs noch einmal,
bleibt es wie heute: zusammenführen, bei Konflikt Abbruch ohne Push.

## M – Testfälle (automatisch, im Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`)

| Nr. | Ausgangslage | Erwartet |
|---|---|---|
| M-1 | `main` nicht neuer als der Zweig | wie bisher: keine Zusammenführung vor dem Prüflauf, Veröffentlichung wie heute |
| M-2 | AppDesign-`main` neuer, ohne Konflikt (z. B. neue `UEBERGABE.md`, die im Zweig unverändert ist) | Meldung ‚main ist neuer – in den Zweig zusammengeführt‘ vor dem Prüflauf; der Zweig enthält den Commit von `main`; veröffentlicht wird genau der geprüfte Stand; danach enthält `main` beides |
| M-3 | AppDesign-`main` neuer, mit Konflikt (dieselbe Datei in beiden geändert, wie 0062) | Abbruch **vor** dem Prüflauf (kein Aufruf von `tests/alle.mjs`), Meldung nennt die Dateien und den Weg (‚von Hand zusammenführen, dann los‘); Zweig und Arbeitsordner unverändert (kein halbes Zusammenführen); nichts gepusht |
| M-4 | wie M-2 und M-3, aber im Repo der App | dasselbe für die App; AppDesign wird bei einem Konflikt der App **nicht** veröffentlicht (Abbruch vor allem) |
| M-5 | `main` ändert sich nach dem Zusammenführen vor dem Prüflauf noch einmal (ohne Konflikt) | wie heute: Zusammenführung beim Veröffentlichen, Hinweis im Ergebnis ‚main hat sich während des Prüflaufs geändert‘ |
| M-6 | wie M-5, mit Konflikt | Abbruch ohne Push wie heute, Meldung klar (Datei, Weg) |
| M-7 | `git fetch` scheitert zuerst | Wiederholung wie bei den übrigen Netzaufrufen (`mitWiederholung`) |
| M-8 | Gegenprobe: Zusammenführen vor dem Prüflauf ausgeschaltet | M-2 und M-3 werden rot |

Dazu in der AppDesign-`CLAUDE.md` (Veröffentlichen) der Satz zu `los` – Wortlaut vorher bestätigen (Zusammenarbeit 0 Nr. 29).
