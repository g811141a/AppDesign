# Wortlaut: Hilfsagenten sichern Zwischenstände (Zusammenarbeit 0 Nr. 29)

**28.11.2026** · Sitzung AppDesign 0011 · Wunsch des Nutzers:
- Die Hilfsagenten sollen regelmäßig Zwischenstände sichern, damit nach einem Abbruch leicht wieder aufgesetzt werden kann.
- Anlass: Hilfsagent 1 (APD-145) brach an der Nutzungsgrenze für 5 Stunden ab und musste fortgesetzt werden.

## Wo

- Neuer Punkt **0 Nr. 30** in Abschnitt **E. Sitzungen und Übergabe**, direkt nach Nr. 17. Er gehört zu Nr. 16 ‚Übergabe statt Gedächtnis‘: Was nicht auf GitHub steht, ist nach einem Abbruch weg.
- Die Regel steht nur an dieser Stelle (0 Nr. 3), der Kasten oben bleibt unverändert.
- Eingetragen mit **Zusammenarbeit 3.21.0**, also mit diesem Bau (AppDesign 5.0.0). 3.21.0 bringt ohnehin APD-153.

## Alt

> (kein Text – neuer Punkt)

## Neu

> 30. **Hilfsagenten sichern Zwischenstände:** Jeder Auftrag an einen Hilfsagenten verlangt, den Stand nach jedem fertigen Teilschritt (spätestens alle
>     20–30 min) und vor jedem langen Prüflauf zu sichern. Dazu gehören eine Stand-Datei `arbeit/<Thema> <Chatnummer> Stand Hilfsagenten.md` (erledigt, gerade dran,
>     nächste Schritte, Prüfungen mit Ergebnis) und nach Änderungen an AppDesign `node werkzeug/veroeffentlichen.mjs fassung`. Danach kommen Commit und Push
>     auf den Vorbereitungs- bzw. Arbeitszweig. Bricht ein Hilfsagent ab (z. B. an der Nutzungsgrenze), setzt Claude ihn fort (`SendMessage`), statt neu zu beginnen. Der Hilfsagent
>     liest dann zuerst die Stand-Datei und `git status`. Prüfung: Selbstkontrolle.

## Schon jetzt in Kraft (vorläufig, als Anweisung an die Hilfsagenten dieses Baus)

- Der Abschnitt ‚Zwischenstand sichern‘ steht in den gemeinsamen Regeln der Aufträge.
- Hilfsagent 3 (APD-151) hält sich ab sofort daran, und für den letzten Auftrag (APD-152, APD-154, APD-153) gilt er auch.
- **Freigegeben** (Nutzer 28.11.2026, Sitzung AppDesign 0011, im Fenster: „Ja, übernehmen“), eingetragen in Zusammenarbeit 3.21.0.
