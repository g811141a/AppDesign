# APD-123 – Zusammenarbeit ohne Regelwächter: Wortlaut

Stand 07.11.2026 · Sitzung Reiselogbuch 0089 · **Wortlaut zur Bestätigung** (0 Nr. 29)

## Entscheidungen (Nutzer 07.11.2026, Sitzung 0089)

- APD-123/E-1 Der Regelwächter wird abgeschaltet: Hooks in dieser Sitzung entfernt (`~/.claude/settings.json` = `{}`), Setup-Skript der Umgebung
  ‚Standard‘ ohne Regelwächter (gilt ab der nächsten Sitzung; WebKit-Installation bleibt).
- APD-123/E-2 Jede Antwort, nach der der Nutzer etwas tun soll, endet mit einer Kachel (Auswahlfenster) – sie bringt den Push.
- APD-123/E-3 Alles zum Lesen steht vor der Kachel.
- APD-123/E-4 Uhrzeitzeile und Zeitzeile entfallen.
- APD-123/E-5 Der Kontextstand steht immer in der Kachel: am Ende jeder Frage ‚(Kontext N)‘.

## Wortlaut

### Zusammenarbeit allgemein, Abschnitt 0 – Kasten oben (APD-123/V-1)

Alt: der Kasten ‚Immer‘ und ‚Jede Antwort‘ mit den Punkten 1 bis 9 (Zeilen 17–41 in 3.9.0).

Neu:

> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Sammelversionen (Nr. 8) · nur Belegtes (Nr. 27) ·
> Regeln nur mit Genehmigung (Nr. 29).
>
> **Jede Antwort** (Selbstkontrolle vor dem Senden):
> 1. Per du, deutsch, kurz (Abschnitt 1).
> 2. Nur Belegtes: jede Zahl, Version, jedes Prüfergebnis aus einem Werkzeug oder einer Datei dieser Sitzung (Nr. 27).
> 3. **Kachel mit Push:** jede Antwort, nach der der Nutzer etwas tun soll (lesen, entscheiden, prüfen, antworten), endet mit einem
>    Auswahlfenster – nur das Fenster bringt am iPad den Push; auch nach einem Neustart des Arbeitsprozesses und nach der Meldung einer
>    Hintergrundaufgabe oder einer anderen Sitzung; Empfehlung zuerst mit ‚(Empfohlen)‘ und Grund, immer ‚Ich schreibe im Chat‘; einzige
>    Ausnahme die Übergabe (Nr. 28, 2.1).
> 4. **Alles zum Lesen vor der Kachel:** Link, nummerierte Schritte mit ‚Erwartet: …‘, Bericht, Wortlaut, Muster und alle offenen
>    Usertests stehen im Chat vor dem Fenster, das Fenster selbst nur mit der kurzen Frage, ohne Link (Nr. 11, 2.1, 2.3).
> 5. **Kontextstand in der Kachel:** jede Frage im Fenster endet mit ‚(Kontext N)‘, N abgelesen aus `messung.mjs` unmittelbar vor dem
>    Fenster – nie geschätzt (Nr. 21, 28).
> 6. Wurde etwas gebaut oder entschieden: die Backlog-Erinnerung ‚Nächste Version …: N Punkte bereit (…) · Offen im Backlog: …‘ (2.4).
> 7. Meldet `messung.mjs` ‚⚠ Übergabe fällig‘: nach dem laufenden Schritt übergeben (Nr. 13).

### Weitere Stellen (APD-123/V-2, gleicher Inhalt, nur angepasst)

- **0 Nr. 11 Bericht:** Bericht, Aufzählung aller Änderungen und alle offenen Usertests im Chat, danach das Fenster zur Rückmeldung (statt ‚… fertig –
  Bericht und Testfälle anzeigen?‘ davor).
- **0 Nr. 15 Lagebild:** das Lagebild als eigene Antwort im Chat, danach das Fenster (statt ‚Lagebild bereit – anzeigen?‘ davor).
- **0 Nr. 21:** ‚Soll ich Version X.Y.Z mit … erstellen? (Kontext N) Ja/Nein‘ – der Satz ‚und davor im Chat‘ entfällt.
- **0 Nr. 26** entfällt (Nummer bleibt frei: ‚26. entfällt (APD-123)‘).
- **0 Nr. 27:** ‚Prüfung: Selbstkontrolle mit Quelle im Bericht‘ (ohne Regelwächter).
- **0 Nr. 28:** jede Frage ins Fenster, jede Antwort endet mit einem (Ausnahme die Übergabe); am Ende jeder Frage ‚(Kontext N)‘ – der Satz mit
  ‚Kontext N‘ davor im Chat entfällt. Prüfung: Selbstkontrolle.
- **0 Nr. 29:** alter und neuer Text im Chat, danach das Fenster (statt ‚Wortlaut … anzeigen?‘ davor).
- **2.1:** ‚Fenster nacheinander, der Text danach‘ wird ‚Der Text davor, das Fenster danach‘ – alles zum Lesen steht vor dem Fenster, das Fenster nur
  mit der kurzen Frage, ohne Link; nie zwei Fenster direkt hintereinander.
- **2.2:** die Zeitzeile am Ende und die Uhrzeitzeile entfallen; `messung.mjs` bleibt als Werkzeug für den Kontextstand (‚Kontext N‘, ‚⚠ Übergabe
  fällig‘). Überschrift ‚2.2 Kontextstand‘.
- **2.8 Regelwächter:** ‚abgeschaltet (APD-123, Nutzer 07.11.2026); Werkzeug und Prüfung bleiben im Repo, eingerichtet wird er nicht mehr.‘
- **AppDesign-`CLAUDE.md`:** unter ‚Verpflichtend‘ ‚die Zeile mit Zeit und Token am Ende jeder Antwort‘ ersetzt durch ‚(Kontext N) in jeder Frage im
  Fenster (`node werkzeug/messung.mjs`)‘; der Punkt ‚Regelwächter‘ unter ‚Arbeitsumgebung‘ entfällt.

## Folgen

- Prüfungen: `doku.mjs` (`checkCollab`) und `tests/regelwaechter.mjs` an den neuen Text anpassen bzw. aus dem vollen Lauf nehmen – mit der nächsten
  Version.
- Vermutung, am iPad zu prüfen: ist die Kachel geschlossen (beantwortet oder ‚Ich schreibe im Chat‘), lässt sich der Text davor lesen und kopieren.
