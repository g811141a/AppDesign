# Bericht – P-121 Korrekturen (Reiselogbuch 3.58.2, nicht gebaut)

**Stand 22.11.2026** · Sitzung Reiselogbuch 0156 · Arbeitszweig `claude/p121-korrekturen` (cfae69c)

## Bericht

Im Arbeitszweig sind beide Rückmeldungen aus P-121 behoben. Es geht nur um die App, AppDesign bleibt 4.68.1.
**F-1:** Nach dem Sperren beginnt die Vorschau jetzt oben, auch wenn das Reiselogbuch vorher bei den offenen Tagen weiter unten stand.
**F-2:** PDF und Teilen aus der Vorschau lassen die Vorschau offen; die Meldung steht als Hinweisfenster darüber, mit der Backup-Erinnerung.
Die feste Prüfung `ablauf-p120` mit den Teilen P-121/F-1 und P-121/F-2 lief in dieser Sitzung grün in Chromium und WebKit (laut Übergabe rot gegen 3.58.1).
Das Skript schlägt den **vollen Prüflauf** vor, weil sich Code geändert hat (`index.html`, `tests/ablauf-p120.mjs`, `tests/alle.mjs`).

## Alle Änderungen

1. **P-121/F-1 – Vorschau nach dem Sperren oben** (`index.html`):
   - neue Variable `lockedShown`. `renderLocked` rollt die Vorschau einmal nach oben, wenn ein Reiselogbuch frisch gesperrt bzw. geöffnet ist.
   - Beim Neuaufbau (Drehen, Hinweis ausblenden) bleibt die Vorschau stehen.
   - Zurückgesetzt wird `lockedShown` in `setLock`, `setLockFromList` und `showTrip`.
2. **P-121/F-2 – Meldung über der Vorschau** (`index.html`):
   - `exportHtml` schließt die Vorschau nicht mehr, wenn sie offen ist (`fromPreview`).
   - `showOutputResult(…, { over })` zeigt die Meldung dann als Hinweisfenster (`inform`, `#msg`) samt Backup-Erinnerung.
   - `bindBackupReminder(root)` bindet ‚Backup erstellen‘ dort an.
   - Das Hervorheben zeigt auf `#prvShare` bzw. `#prvPdf`.
   - `exportPdf` hängt das Aufräumen (Titel, `printout`, `beforeprint`) an das Hinweisfenster statt an das Fenster.
3. **Feste Prüfung** `tests/ablauf-p120.mjs`, neue Teile:
   - **P-121/F-1** (iPad quer, iPhone hoch): Sperren über Mehr und über das Kontextmenü → Vorschau oben; nach Rollen und Neuaufbau bleibt sie stehen.
   - **P-121/F-2** (iPad quer, iPhone hoch): HTML und PDF aus der Vorschau → Vorschau offen, ‚Ausgabe V…‘ darüber; nach dem Schließen der Meldung ist die Vorschau wieder da.
4. Die Teile stehen in `tests/alle.mjs`; `tests/README.md` ist ergänzt.
5. `BACKLOG.md`: P-121/F-1 und F-2 stehen in ‚0. Nächste Version‘ (2 Punkte bereit), P-121 ist ‚nicht ok‘.

**Dieselbe Lücke anderswo** (0 Nr. 1): Ausgabe-Knöpfe gibt es nur in der Vorschau (`#prvShare`, `#prvPdf`). Das zweite `dlg.close()` gehört zu ‚Backup laden‘ und betrifft das nicht.

**Warum die Prüfung F-1 übersah:** `ablauf-sperre` und `ablauf-p120` haben nach dem Sperren nie die Rollposition der Vorschau geprüft. Gesperrt wurde nie ein Reiselogbuch, das weiter unten geöffnet war (`ablauf-sperre` prüft `scrollTop` nirgends).
**F-2** ist kein durchgerutschter Fehler, sondern ein neuer Wunsch: Bis 3.58.1 schloss `exportHtml` die Vorschau mit Absicht (`if (dlg.open) dlg.close()`).

**Apple:**
- Vorschau oben nach dem Sperren: entspricht HIG. Ein neu geöffneter Inhalt beginnt oben, wie eine gesperrte Notiz in Notizen. Das ist eine Vermutung, ich habe es in dieser Sitzung nicht neu recherchiert.
- Meldung über der offenen Vorschau: entspricht dem Muster ‚Alert über dem aktuellen Inhalt‘, die Ansicht darunter bleibt.

## Offene Usertests

**P-121** (Reiselogbuch 3.58.1, AppDesign 4.68.1): **nicht ok** bei /5 und /8. /0–/4, /6, /7 und /9–/11 sind ok (Nutzer 22.11.2026).
Mit 3.58.2 wird P-121 durch **P-122** ersetzt.

**P-121/5 – Sperren weiter oben: die Liste springt nicht (iPad und iPhone)** – nicht ok → P-121/F-1
1. iPad quer, hell; die Seitenleiste ganz nach unten rollen und das unterste Reiselogbuch antippen (es ist blau).
2. Die Seitenleiste ganz nach oben rollen, ‚Test‘ lange drücken → ‚Reiselogbuch sperren‘.
3. Erwartet iPad: die Liste bleibt stehen, ‚Test‘ ist blau, rechts steht die Vorschau mit ‚Dieses Reiselogbuch ist gesperrt.‘. ‚Test‘ lange drücken → ‚Reiselogbuch
   entsperren‘: die Liste bleibt stehen, rechts ‚Test‘ offen.
4. Dasselbe am iPhone hoch in der Startliste. Erwartet iPhone: die Startliste bleibt stehen.

**P-121/8 – Teilen abgebrochen zählt nicht (iPad)** – nicht ok → P-121/F-2
1. iPad quer, hell; ein Reiselogbuch ‚Test‘ anlegen und öffnen, oben Teilen → ‚HTML‘.
2. Im Teilen-Menü ‚Abbrechen‘ (bzw. daneben tippen), die Meldung schließen; nochmals Teilen → ‚HTML‘.
3. Erwartet: beide Male oben ‚Ausgabe V001‘ und ‚⚠️ Teilen-Menü abgebrochen – nicht gespeichert: Reiselogbuch Test … V001‘. Beim zweiten Mal ‚In Dateien sichern‘
   wählen, danach nochmals Teilen → ‚HTML‘. Erwartet: jetzt ‚Ausgabe V002‘.

## Testfall-Liste für 3.58.2 → Usertest P-122 (geplant, kommt so ins CHANGELOG)

- **Automatisch:** `ablauf-p120` P-121/F-1 (iPad quer, iPhone hoch; Mehr und Kontextmenü; Neuaufbau bleibt stehen).
- **Automatisch:** `ablauf-p120` P-121/F-2 (iPad quer, iPhone hoch; HTML und PDF; Meldung schließen → Vorschau wieder da).
- **Automatisch:** der volle Lauf mit den Grundregeln je Ansicht.
- **Nur am Gerät:** das echte Teilen-Menü, das Drucken-Menü und die Backup-Erinnerung als User-Testfälle.

**P-122/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen und mit Netz neu öffnen.
2. ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: ‚Reiselogbuch · Version 3.58.2 · erstellt am … · AppDesign 4.68.1‘.

**P-122/1 – Sperren mit offenen Tagen weiter unten: Vorschau oben (iPad und iPhone)**
1. iPad quer, hell; ein Reiselogbuch öffnen, das bei offenen Tagen weiter unten aufgeht (oder ‚Test‘ weit nach unten rollen).
2. Oben Mehr → ‚Reiselogbuch sperren‘; danach entsperren, wieder öffnen und über langes Drücken in der Seitenleiste → ‚Reiselogbuch sperren‘.
3. Erwartet beide Male: rechts die Vorschau **ganz oben** mit dem Titel und ‚Dieses Reiselogbuch ist gesperrt.‘ Dasselbe am iPhone hoch.
   Automatisch geprüft in `ablauf-p120` (P-121/F-1).

**P-122/2 – Teilen aus der Vorschau: Vorschau bleibt, Meldung darüber (iPad)**
1. iPad quer, hell; ‚Test‘ öffnen, oben Teilen → ‚Vorschau‘.
2. In der Vorschau oben Teilen antippen, im Teilen-Menü ‚In Dateien sichern‘ wählen.
3. Erwartet: die Vorschau bleibt offen. Darüber steht das Hinweisfenster ‚Ausgabe V…‘ mit ‚✅ Teilen-Menü abgeschlossen für Reiselogbuch Test … V…‘.
   Nach dem Schließen ist die Vorschau wieder da. Dasselbe am iPhone hoch.
   Automatisch geprüft in `ablauf-p120` (P-121/F-2).

**P-122/3 – PDF aus der Vorschau: Vorschau bleibt, Meldung darüber (iPad)**
1. iPad quer, hell; in der Vorschau von ‚Test‘ oben ‚PDF‘ antippen.
2. Das Drucken-Menü schließen bzw. abwarten (vom Home-Bildschirm geht es mit iOS 27 zurzeit nicht auf, RLB-124).
3. Erwartet: die Vorschau bleibt offen. Darüber steht ‚Ausgabe V…‘ mit ‚✅ Drucken-Menü geöffnet für Reiselogbuch Test … V….pdf‘ und ‚Dort über ‚Teilen‘ →
   ‚In Dateien sichern‘ als PDF ablegen.‘ Nach dem Schließen ist die Vorschau wieder da.
   Automatisch geprüft in `ablauf-p120` (P-121/F-2).

**P-122/4 – Backup-Erinnerung im Hinweisfenster (iPad)**
1. iPad quer, hell, an einem Tag ohne Backup; in der Vorschau von ‚Test‘ Teilen → ‚In Dateien sichern‘.
2. Im Hinweisfenster über der Vorschau ‚Backup erstellen‘ antippen und das Backup sichern.
3. Erwartet: im Hinweisfenster steht ‚💾 Denk daran, auch ein Backup zu erstellen.‘ mit ‚Backup erstellen‘. Danach steht dort der Dateiname des Backups, die Vorschau bleibt darunter offen.
   Zum Schluss ‚Test‘ löschen.

## Bau-Frage

**Reiselogbuch 3.58.2** mit P-121/F-1 und P-121/F-2 (nur App, AppDesign bleibt 4.68.1), **Prüflauf voll** (rund 75 min). Grund: Code geändert, Vorschlag von `veroeffentlichen.mjs stufe`.

**Nächste Version 3.58.2:** 2 Punkte bereit (P-121/F-1, P-121/F-2) · **Offen im Backlog:** P-121 (nicht ok) · APD-135/B-3.3 · APD-145 · APD-142 · RLB-126.

Bitte nach dem Bau zuerst alle Testfälle des Usertests prüfen. Neue Punkte setze ich erst um, wenn der Usertest erledigt ist und gefundene Fehler beseitigt sind.
