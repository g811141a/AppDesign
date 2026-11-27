# Zwei Ketten am selben AppDesign – Vorschlag (Sitzung AppDesign 0004)

**27.11.2026** · Frage des Nutzers: Wie arbeiten die Kette Reiselogbuch und die Kette AppDesign so, dass sie sich nicht in die Quere kommen und nichts verloren geht?

## Was gerade parallel läuft (`git log origin/main`, letzte 6 Stunden)

| Kette | Sitzung | ändert | als Nächstes |
|---|---|---|---|
| Reiselogbuch | 0168 (wartet auf dein Fenster) | `BACKLOG.md` (APD-152 bis APD-156), `arbeit/0168 …` | baut AppDesign 4.72.0 mit 3 bereiten Punkten: APD-149/J-1, APD-152 (`createSync` in `v4/ui.js`), APD-153 (Prüfungen) |
| AppDesign | 0004 (diese) | `arbeit/APD-149 0004 …` | Funde klären, danach `katalog/entwurf/` (Kasten ‚Ereignisse‘, Kommentar), später `v5/` |

## Wo es heute knirschen kann

1. **`BACKLOG.md`:** Beide schreiben hinein. Schreiben beide gleichzeitig, scheitert der zweite Push. Nach dem Neuaufsetzen klappt er.
   Ohne neues Aufsetzen könnte er die Zeilen des anderen überschreiben.
2. **Der Bau von 4.72.0 enthält APD-149/J-1:** Die neue Prüfung `checkKatalog` prüft `katalog/entwurf/`.
   - `los` holt die neuere `main` vor dem Prüflauf.
   - Ändere ich das Muster während des Prüflaufs (bis ~75 min), prüft der Lauf einen Stand, der danach nicht mehr gilt.
   - Ändere ich es kurz vor `los`, kann der Lauf an meiner Änderung rot werden.
3. **Freigaben für später** (z. B. APD-149/J-5, Wortlaut R-1.4 erst mit `v5/`) stehen bisher nur in meiner Arbeitsdatei. Wer später baut, findet sie nur über die Backlog-Zeile.
4. **`v5/` beginnt als Kopie von `v4/`:** Kopiere ich vor 4.72.0, fehlt in `v5/` die Korrektur APD-152. Jede spätere Korrektur in `v4/` muss auch nach `v5/`.
5. **Regeln und Werkzeuge** (Richtlinien, Zusammenarbeit, `CLAUDE.md`, `tests/`, `werkzeug/`) ändern sich nur beim Bauen. Bauen zwei Ketten, stoßen ihre Vorbereitungs-Zweige aufeinander.

## Vorschlag

1. **Eine baut:** Bis `v5/` beginnt, baut und veröffentlicht nur die Kette Reiselogbuch AppDesign-Versionen.
   - Sie allein ändert `v4/`, `tests/`, `werkzeug/`, die Richtlinien, die Zusammenarbeit, die `CLAUDE.md` und `UEBERGABE.md`.
   - Die Kette AppDesign baut nichts auf `v4/`.
2. **Jede Kette ändert nur ihre Dateien:**
   - Die AppDesign-Kette ändert `katalog/entwurf/`, `arbeit/APD-149 …` und `arbeit/APD-149/`, im Backlog nur die Zeilen ihrer Themen (APD-149, APD-151) und später `v5/`.
   - Muss eine Kette eine Datei der anderen ändern, schickt sie vorher eine Nachricht (`send_message`) und wartet auf die Antwort.
3. **Immer frisch aufsetzen:** Vor jedem Commit `git fetch origin main` und darauf aufsetzen. Kleine Commits, sofort hochladen. Nie mit `--force`.
4. **Freigaben ins Backlog:** Jeder freigegebene Wortlaut für einen späteren Bau steht sofort in der Backlog-Zeile des Themas, mit Datei und Nummer (z. B. APD-149/J-5).
   So sieht ihn die Kette, die baut.
5. **Bau ankündigen:** Die bauende Kette schickt der anderen eine Nachricht bei `vorbereiten`, beim Start von `los` und nach ‚fertig‘.
   Dazwischen ändert die andere nichts unter `katalog/`.
6. **`v5/` erst nach dem letzten v4-Bau beginnen,** also nach 4.72.0. Danach geht jede v4-Korrektur auch nach `v5/`. Das prüft die Bau-Frage.
7. **Übergaben nennen die andere Kette:** jede Übergabe mit Sitzung, Stand und offenen Absprachen der anderen, wie bisher in beiden Übergaben.

## Als Regel festhalten (0 Nr. 4, 0 Nr. 29)

Damit das in jeder neuen Sitzung gilt, gehört es in die AppDesign-`CLAUDE.md`, Abschnitt ‚Arbeitsumgebung (Cloud)‘.

**Alt:** – (keine Regel zu parallelen Ketten)

**Neu** (ein neuer Punkt nach ‚Repos nebeneinander‘):
> - **Parallele Ketten** (z. B. Reiselogbuch und AppDesign): Eine Kette baut alle AppDesign-Versionen und ändert allein `v4/`, `tests/`, `werkzeug/`, Richtlinien,
>   Zusammenarbeit, `CLAUDE.md` und `UEBERGABE.md`. Die andere ändert nur ihre Muster (`katalog/entwurf/`), ihre `arbeit/APD-n …`-Dateien, ihre Zeilen im Backlog
>   und später `v5/`. Vor jedem Commit `git fetch origin main` und darauf aufsetzen, sofort hochladen. Freigegebener Wortlaut für einen späteren Bau steht in
>   der Backlog-Zeile des Themas. Vor einer Änderung an einer Datei der anderen Kette und bei `vorbereiten`, Start von `los` und ‚fertig‘ eine Nachricht an die andere
>   Sitzung (`send_message`); während ihres `los` nichts unter `katalog/` ändern. `v5/` beginnt erst nach dem letzten v4-Bau.

Die Kette Reiselogbuch trägt das mit ihrer nächsten Version ein (`CLAUDE.md` 2.15.0, Versionsgeschichte). Nach Vorschlag Punkt 1 gehört die `CLAUDE.md` ihr.
Bis dahin halten sich beide Ketten schon daran.

## Sofort, wenn du zustimmst

- Ich trage APD-149/J-5 in die Backlog-Zeile von APD-149 ein (Vorschlag Punkt 4).
- Ich schicke Reiselogbuch 0168 eine Nachricht mit dieser Absprache und dem Wortlaut, mit der Bitte, mir `vorbereiten`, `los` und ‚fertig‘ zu melden.
- Bis 4.72.0 fertig ist, ändere ich am Muster nur, was du freigibst, und nicht während ihres `los`.

## Entschieden (Nutzer 27.11.2026, Sitzung AppDesign 0004, im Chat)

- „Ich möchte, dass der parallel chat im backlog des appdesign nur mehr reinschreibt aber vorerst nicht mehr weiter umsetzt bis wir hier /v5 finalisiert haben.“
- Das ersetzt Vorschlag Punkt 1 (‚Eine baut‘). Bis `v5/` fertig ist, schreibt die Kette Reiselogbuch in AppDesign nur ins Backlog. Sie baut und ändert sonst nichts.
- Am 27.11.2026 an Reiselogbuch 0168 geschickt (`send_message`), mit der Bitte, es in `UEBERGABE.md` zu übernehmen.
- **Die bereiten Punkte APD-149/J-1, APD-152 und APD-153 kommen mit `v5/`** (AppDesign 5.0.0), nicht als 4.72.0 (Nutzer 27.11.2026, im Fenster).
  Die Korrektur APD-152 bleibt bewusst bis dahin offen. Das ist ebenfalls an 0168 geschickt.
- Offen bleibt, ob die Regel in die `CLAUDE.md` kommt.

Nächste Version AppDesign: 3 Punkte bereit (APD-149/J-1, APD-152, APD-153). Offen im Backlog: APD-135, APD-136, APD-149, APD-148, APD-151, APD-154 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150, APD-155 (Prio 2) · APD-70, APD-147, APD-156 (Prio 3).
