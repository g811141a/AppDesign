# RLB-5 – Anforderungen an ‚Reiselogbücher konvertieren‘ (Import-Repo)

Stand 16.10.2026 · Sitzung ‚Reiselogbuch 0007‘ · ohne Reisedaten · ergänzt die Testfall-Liste `arbeit/RLB-5 Testfall-Liste.md`

## A. Deine Punkte (zusammengefasst)

| Nr. | Anforderung |
|---|---|
| I-1 | **Versionen:** Jede Änderung im Import-Repo steht versionsgetreu in der `README.md` (Versionsgeschichte: Version, Datum, Inhalt). |
| I-2 | **Apps bleiben unberührt:** Bei einer Konvertierung wird **nie** etwas an Reiselogbuch oder AppDesign geändert – kein Commit, kein Hochladen, keine Version. Das Werkzeug prüft vorher und nachher, dass beide Repos unverändert sind, sonst Abbruch. Wünsche an die App kommen nur als Hinweis ins Protokoll. |
| I-3 | **Erkenntnisse ablegen:** Neue Erkenntnisse (z. B. ‚Excel-Vorlage mit Spalte „Hotel“ → Quartier‘) kommen ins Import-Repo (`ERKENNTNISSE.md`) und gelten ab dann für jede Konvertierung. |
| I-4 | **Format frisch lesen:** Der Aufbau der Backup-Datei wird bei **jeder** Konvertierung neu aus dem Repo ReiseLogBuch gelesen (`normalize`, Feldnamen, Reisemittel, Wetter-Symbole, Version der App) – nie aus dem Gedächtnis. |
| I-5 | **So viel wie möglich übernehmen:** Ist unklar, wohin etwas gehört, fragt Claude mit Kachelfragen (Auswahlfenster). |
| I-6 | **Konvertierungsprotokoll** bei jeder Konvertierung: was übernommen wurde, was **nicht** übernommen wurde und warum, was korrigiert wurde, Rückfragen und Antworten, Hinweise. |
| I-7 | **Pflichtangaben:** Reisetitel, Reiseteilnehmer, Reisezeitraum, Reisemittel – fehlt eine, fragt Claude; ohne sie wird **keine** Datei erstellt. |
| I-8 | **Quartierliste in der Ausgabe** einschalten, wenn Quartiere je Tag angegeben sind. |
| I-9 | **Spalten** ‚Wie war was?‘, ‚Essen und Trinken‘ und ‚Quartier‘ einschalten, wenn es Einträge dazu gibt. |
| I-10 | **Bestätigung vor der Ausgabe:** Reisetitel, Reiseteilnehmer, Reisezeitraum und Reisemittel bestätigst du per Kachelabfrage (ein Fenster, je Feld eine Frage: ‚passt‘ / ‚ändern‘). |
| I-11 | **Texte verbessern (16.10.2026):** In **Verlauf**, **Wie war was?** und **Fazit** Grammatik verbessern, ohne den Sinn zu verfälschen; Essen und Trinken, Quartier und übrige Felder nur Tippfehler korrigieren. Jede geänderte Zeile steht im Protokoll (vorher → nachher). Ersetzt dort ‚Tippfehler korrigieren, sonst unverändert‘. |
| I-12 | **Kein Wetter an heute und künftigen Tagen** (16.10.2026); bleibt ein Tag dadurch leer, entfällt er. |
| I-13 | **Uhrzeit im Dateinamen = Ortszeit des Nutzers** (16.10.2026) – per Kachelfrage klären, Zeitzone nicht speichern. |
| I-14 | **Verlauf mit dem Aufzählungszeichen der App ‚▫️‘** (16.10.2026): alle anderen Zeichen ersetzen; vergessene Zeichen erkennen, ergänzen und im Protokoll vermerken. |
| I-15 | **Fazit ohne Smiley** (16.10.2026): passenden Smiley aus dem Text wählen, einfügen und protokollieren. |

## B. Meine Ergänzungen

| Nr. | Vorschlag | Empfehlung |
|---|---|---|
| E-1 | **Datenschutz bleibt oberste Regel:** Originale, Ergebnisdatei und Protokoll nur im Notizordner der Sitzung und im Chat – nie in einem Repo, auch nicht im privaten. Erkenntnisse (I-3) **ohne** Namen, Orte, Hotels – nur die Regel. | ja |
| E-2 | **Spalten ohne Einträge ausschalten** (Gegenstück zu I-9): sonst stehen leere Spalten in der Tabelle. | ja – Frage 2 |
| E-3 | **Reisemittel, die die App nicht kennt** (z. B. Bus, Motorrad, Wohnwagen): Kachelfrage, welches der App passt (z. B. Bus → Leihwagen? → oder weglassen und im Verlauf nennen). Antwort kommt in die Erkenntnisse. | ja |
| E-4 | **Angaben ohne passendes Feld** (Kilometer, Tageskosten, Links, Uhrzeiten, Fotos): **immer Kachelfrage**, wohin (Entscheidung 16.10.2026). Fotos als Bilder gehen nicht (die App kennt keine Bilder) → Protokoll. | ja – Frage 3 |
| E-5 | **Währung:** Gesamtausgaben sind in Euro. DM oder fremde Währung → Kachelfrage: umrechnen (DM fest 1,95583) oder nur als Text ins Fazit. | ja |
| E-6 | **Datum:** zweistellige Jahre, ‚1. Tag‘ ohne Datum, Tage außerhalb des Zeitraums → Kachelfrage. | ja |
| E-7 | **Mehrere Reisen in einer Datei** oder **eine Reise in mehreren Dateien** (Word + Excel): erkennen, zusammenführen, Bestätigung (I-10) je Reise; eine Ergebnisdatei für alle. | ja |
| E-8 | **Schon in der App?** Auf Wunsch hängst du ein aktuelles Backup an; Claude meldet Überschneidungen (gleicher Zeitraum oder Titel) – nur im Notizordner, nie im Repo. | ja |
| E-9 | **Protokoll als Datei** (‚Ω Import Protokoll JJJJ.MM.TT hh.mm.md‘) neben der Ergebnisdatei, kurz auch im Chat; mit Version der App und des Import-Werkzeugs, aus denen das Format gelesen wurde. | ja |
| E-10 | **Testfälle zum Laden** am Ende jeder Konvertierung: vorher Backup erstellen → Datei laden → Abgleichen → Stichprobe → bei Fehler Backup mit ‚Ersetzen‘ zurück. | ja |
| E-11 | **Neue App-Version erkannt** (I-4): Hat sich das Format seit der letzten Konvertierung geändert, sagt Claude es zuerst und passt Anleitung und Werkzeug an (neue Version im Import-Repo, I-1) – die App selbst bleibt unberührt (I-2). | ja |

## C. Ablauf mit diesen Punkten

1. Startfrage → ‚Reiselogbücher konvertieren‘ → Format frisch aus ReiseLogBuch lesen (I-4, E-11).
2. Datei(en) anhängen → auslesen → zuordnen (Tippfehler korrigieren, nichts erfinden).
3. Kachelfragen: zuerst fehlende Pflichtangaben (I-7), dann Unklares (I-5, E-3 bis E-8).
4. Spalten und Quartierliste setzen (I-8, I-9, E-2).
5. Bestätigung der vier Pflichtangaben (I-10).
6. Datei bauen → Prüfwerkzeug (Testfall-Liste F-1 bis F-19, dazu I-2: Apps unverändert) → nur bei Grün weiter.
7. Ergebnisdatei + Protokoll (I-6, E-9) + Testfälle (E-10); neue Erkenntnisse ins Import-Repo (I-3, E-1), README-Version (I-1).

## D. Entscheidungen (16.10.2026, Kachelabfrage je Punkt)

- I-1 bis I-10: vom Nutzer vorgegeben.
- E-1, E-2, E-3, E-5, E-6, E-7, E-8, E-9, E-10, E-11: **ja**.
- E-4: **immer Kachelfrage** (nicht: Standard Verlauf).
- Im Import-Repo ablegen und das Repo anlegen: **Nein** (noch nicht).
- I-11 (Grammatik in Verlauf, Wie war was?, Fazit; Protokoll vorher → nachher): **ja**.
