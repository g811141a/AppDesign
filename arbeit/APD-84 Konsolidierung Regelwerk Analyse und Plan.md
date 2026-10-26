# APD-84 – Regelwerk: Analyse und Plan (Konsolidierung 2)

Sitzung ‚Reiselogbuch 0050‘ · 26.10.2026. Auftrag (Nutzer): alle Regeln in AppDesign nochmals konsolidieren und so verbessern,
dass keine Regelbrüche und keine Halluzinationen mehr vorkommen; lieber mehr Zeit als immer wieder etwas vergessen.

## 1. Befund: Was ging bei der Konsolidierung APD-39 (Zusammenarbeit 2.16.0 → 2.17.0) verloren?

Maschinell verglichen (alle Code-Namen, Texte in Anführungszeichen, Maße und Regelnummern von 2.16.0 bzw. Designrichtlinie
4.28.1 gegen den heutigen Stand, Leerraum ausgeglichen) und die Treffer einzeln nachgelesen:

- **Designrichtlinie allgemein:** keine Regel verloren – die 8 Treffer sind umformuliert oder in anderen Anführungszeichen
  vorhanden (z. B. Dateiname des Abgleichberichts in 9, ‚Backup vom …‘ in 15.19) oder Geschichte (‚kurze Seite‘).
- **Zusammenarbeit:** der Inhalt ist fast vollständig noch da, aber **vier Stellen wurden abgeschwächt, und das Wichtigste liegt
  jetzt dort, wo Claude zu Beginn nicht liest:**

| Nr. | 2.16.0 (vorher) | 2.20.0 (heute) | Folge |
|---|---|---|---|
| V-1 | §2: **„Fragen kommen im Auswahlfenster“** – Pflicht für jede Frage; 1.8.0: „Antwortvorschläge immer im Auswahlfenster (Empfehlung zuerst)“ | 0 Nr. 7: „Auswahlfenster **nur** für Ja/Nein und klare Auswahl“ – die Pflicht ist zur Einschränkung geworden | Antworten enden mit ‚Sag Bescheid …‘ statt mit einem Fenster (0050, mehrfach vorher) |
| V-2 | §2: Empfehlung zuerst mit ‚(Empfohlen)‘ – Abschnitt 2 stand gleich hinter 0 und 1 | nur noch in 2.1; zu Beginn werden nur 0 und 1 gelesen (0 Nr. 15) | Fenster ohne Empfehlung oder mit falscher Schreibweise ‚(Empfehlung)‘ (0050) |
| V-3 | §2: Zeitzeile **nach** der letzten Antwort im Fenster | nur in 2.1 | Zeitzeile vor dem Fenster (0050) |
| V-4 | §4: Backlog-Erinnerung am Ende jeder Antwort, in der etwas gebaut oder entschieden wurde | nur in 2.4 | Erinnerung fehlt (0050) |
| V-5 | 0 Nr. 4: fragt **verlässlich im Auswahlfenster** ‚Als allgemeine Regel festhalten?‘ | 0 Nr. 4 ohne ‚im Auswahlfenster‘ | Frage kann im Text untergehen |
| V-6 | 0 Nr. 20: Abweichung vom Gerät im Safari-Modell korrigieren, **nie nur in einer Prüfung** | Halbsatz fehlt | Modell und Prüfung können auseinanderlaufen |
| V-7 | drei Kästen ‚VERPFLICHTEND‘ ganz oben (nie ohne Ja bauen, Sammelversionen, erst prüfen) | in 0 Nr. 21, 8, 22 zwischen anderen Punkten | weniger sichtbar |

## 2. Befund: Regelbrüche – immer dasselbe Muster

| Wann | Regelbruch | Ursache |
|---|---|---|
| 1.15.1 (13.10.) | englische Zwischenmeldungen | Regel fehlte |
| 2.10.1 (18.10.) | Usertests nur als Verweis aufs CHANGELOG | Selbstkontrolle versagt |
| 2.12.0 (19.10.) | Link und Schritte fehlten beim Muster | Selbstkontrolle versagt |
| 2.14.0 (20.10.) | ‚Sie‘ statt ‚du‘ (0019) | Abschnitt 1 nicht gelesen |
| 2.16.0 (21.10.) | Text vor dem Fenster kam nicht an | Bedienung der App |
| 0050 (26.10.) | 3 Zwischenmeldungen mit **geschätzter, teils künftiger Uhrzeit** (13:58, 14:04, 14:09 – abgelesen danach 14:02) | **Halluzination**: Uhrzeit nicht abgelesen |
| 0050 | Zwischenmeldungen ohne Uhrzeitzeile (‚Ich klone jetzt …‘, ‚Ich stelle den Ablauf …‘) | Selbstkontrolle versagt |
| 0050 | 4 Fenster ohne ‚(Empfohlen)‘, 1 mit ‚(Empfehlung)‘ | 2.1 nicht gelesen (V-2) |
| 0050 | 2 Antworten ohne Fenster (‚Sag Bescheid …‘, ‚Okay: Ich baue nichts …‘) | V-1, Selbstkontrolle |
| 0050 | Zeitzeile vor dem Fenster | V-3 |
| 0050 | keine Backlog-Erinnerung nach Entscheidungen | V-4 |
| 0050 | `git checkout main` auf veralteten lokalen `main` (gleich zurückgesetzt) | AppDesign-`CLAUDE.md` gelesen, aber nicht befolgt |

Die Regelbrüche in 0050 hat ein Probelauf eines Prüfskripts über die Sitzungsdatei gefunden (Abschnitt 3, M-3) – alle Fälle
außer der geschätzten Uhrzeit. Die Einträge dieser Zwischenmeldungen fehlen in der Sitzungsdatei, weil der Arbeitsprozess neu
gestartet wurde.

**Drei Ursachen:** U-1 – Pflichten stehen, wo zu Beginn nicht gelesen wird. U-2 – ‚Selbstkontrolle‘ ist keine Prüfung: Claude
übersieht in langen Antworten die eigenen Formpflichten verlässlich immer wieder. U-3 – Angaben ohne Beleg (Uhrzeit geschätzt
statt abgelesen).

## 3. Plan (Maßnahmen)

- **M-1 Zu Beginn die ganze Zusammenarbeit lesen** (≈ 41.000 Zeichen ≈ 12.000 Token, einmal je Sitzung) statt nur 0 und 1 –
  beide `CLAUDE.md` und 0 Nr. 15 ändern. Designrichtlinie weiter nur die Überschriften (ihre Regeln prüfen die Tests).
- **M-2 Ganz oben in Abschnitt 0 der Kasten ‚Jede Antwort‘** – alle Pflichten, die jede Antwort betreffen, an **einer** Stelle,
  jede mit ihrer Prüfung (Entwurf unten). Die Kästen ‚VERPFLICHTEND‘ kommen als ‚Immer‘ zurück (V-7).
- **M-3 Regelwächter statt Selbstkontrolle** (`werkzeug/regelwaechter.py`, als Hooks von Claude Code):
  - *Beim Senden einer Nachricht* (UserPromptSubmit) und *nach jedem Werkzeug* (PostToolUse) gibt er Claude die abgelesene
    Uhrzeitzeile für die nächste Ausgabe (mit Zeitabstand) – nie wieder geschätzt (U-3).
  - *Am Ende jeder Antwort* (Stop) prüft er die Antwort in der Sitzungsdatei und **lässt sie nicht enden**, bis alles stimmt:
    jede Ausgabe beginnt mit der Uhrzeitzeile und ihre Uhrzeit stimmt (± 1 min) · die Antwort hat ein Auswahlfenster (einzige
    Ausnahme: Übergabe) · jede Frage hat ‚Ich schreibe im Chat‘ und eine Möglichkeit mit ‚(Empfohlen)‘ (ausgenommen
    Rückmeldungen zu Usertests ‚P-n: …‘) · die Zeitzeile steht ganz am Ende, nach dem letzten Fenster. Höchstens zwei
    Rückweisungen je Antwort, damit nichts hängen bleibt.
  - Prüfung des Wächters: `tests/regelwaechter.mjs` mit den echten Antworten aus 0050 als Gegenprobe (müssen rot werden) und
    einer regelgerechten Antwort (grün).
  - **Einrichten (einmal durch dich):** im Setup-Skript der Umgebung drei Zeilen, die `~/.claude/settings.json` mit den Hooks
    schreiben (der genaue Text kommt mit der Version). Grund: die Sitzung wechselt ihren Arbeitsordner (heute zweimal), ein
    Hook im Repo würde dann nicht geladen; das Setup-Skript gilt für jede Sitzung. Nachweis erst in der nächsten Sitzung (Testfall).
- **M-4 Neue Pflicht ‚Nur Belegtes‘ (0 Nr. 27):** Uhrzeiten, Zahlen, Versionen, Prüfergebnisse, Dateiinhalte und ‚So macht es
  Apple‘ nur aus einem Werkzeug, einer Datei oder einer Quelle **dieser** Sitzung; sonst ‚weiß ich nicht – ich prüfe es‘;
  Vermutungen heißen ‚Vermutung‘. Prüfung: Uhrzeit Regelwächter; Rest Selbstkontrolle mit Quelle im Bericht.
- **M-5 Abgeschwächtes zurück:** V-1 als neue Pflicht 0 Nr. 28 (jede Frage im Fenster, jede Antwort endet mit einem); V-5 und
  V-6 wörtlich wie vorher.
- **M-6 Jede ‚Selbstkontrolle‘ einzeln durchgehen:** automatisch prüfbar → Regelwächter oder `doku.mjs`; der Rest bleibt
  ausdrücklich Selbstkontrolle und steht im Kasten ‚Jede Antwort‘ bzw. ‚Immer‘.
- **M-7 `checkCollab` (doku.mjs) erweitern:** der Kasten ‚Jede Antwort‘ steht ganz oben und nennt jede Pflicht, die zu Beginn
  gelesen werden muss; beide `CLAUDE.md` nennen die ganze Zusammenarbeit.

## 4. Entwurf: Kasten ganz oben in Abschnitt 0

> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Sammelversionen (Nr. 8) · nur Belegtes (Nr. 27).
>
> **Jede Antwort** (der Regelwächter prüft, was mit ‚W‘ markiert ist; der Rest ist Selbstkontrolle vor dem Senden):
> 1. Erste Zeile jeder Ausgabe: die Uhrzeitzeile, die der Regelwächter liefert – nie selbst schätzen (Nr. 26, 2.2). **W**
> 2. Per du, deutsch, kurz (Abschnitt 1).
> 3. Nur Belegtes: jede Uhrzeit, Zahl, Version, jedes Prüfergebnis aus einem Werkzeug oder einer Datei dieser Sitzung (Nr. 27).
> 4. Bericht oder Bitte, am Gerät zu prüfen: alle offenen Usertests vollständig im Chat (Nr. 11, 2.3).
> 5. Wurde etwas gebaut oder entschieden: die Backlog-Erinnerung ‚Nächste Version …: N Punkte bereit (…) · Offen im Backlog: …‘ (2.4).
> 6. Ende jeder Antwort: ein Auswahlfenster – jede Frage dort, nie ‚Sag Bescheid‘; die Empfehlung zuerst mit ‚(Empfohlen)‘ und
>    Grund in der Beschreibung, immer ‚Ich schreibe im Chat‘; einzige Ausnahme die Übergabe (Nr. 28, 2.1). **W**
> 7. Ganz am Ende, nach dem Fenster: die Zeitzeile von `messung.mjs` (2.2). **W**
> 8. Steht ‚⚠ Übergabe fällig‘ in der Zeitzeile: nach dem laufenden Schritt übergeben (Nr. 13).

## 5. Version

**AppDesign 4.39.0 / Reiselogbuch 3.37.0**, Zusammenarbeit **3.0.0** (Hauptversion: neuer Aufbau von Abschnitt 0), mit
APD-84 (dieser Plan) und APD-83 (Fensterbreite, Korrektur aus P-76). APD-77 und P-75/6 bleiben für die Version danach.
Testfall-Liste vor dem Bau (0 Nr. 1): Regelwächter je Pflicht rot/grün, Gegenprobe mit 0050, `checkCollab`, `messung.mjs`
unverändert; Usertest: in der nächsten Sitzung absichtlich eine Antwort ohne Fenster – der Wächter muss sie zurückweisen.
