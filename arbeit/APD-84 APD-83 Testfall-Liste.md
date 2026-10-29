# APD-84 Regelwerk (Konsolidierung 2) · APD-83 Fensterbreite – Testfall-Liste

**Stand 26.10.2026** · Sitzung Reiselogbuch 0051 · Plan `arbeit/APD-84 Konsolidierung Regelwerk Analyse und Plan.md` (bestätigt
26.10.2026: ‚Passt‘), Bau freigegeben 26.10.2026 (‚Ja empfohlen‘). Versionen: **AppDesign 4.39.0**, **Reiselogbuch 3.37.0**,
Zusammenarbeit allgemein **3.0.0**.

---

## 1. APD-84 – Was sich ändert

- **Zusammenarbeit 3.0.0** (Hauptversion, neuer Aufbau von Abschnitt 0): ganz oben der Kasten ‚Immer‘ und ‚Jede Antwort‘
  (APD-84/M-2, Entwurf Plan 4); neu 0 Nr. 27 ‚Nur Belegtes‘ (APD-84/M-4) und 0 Nr. 28 ‚Jede Frage im Fenster, jede Antwort endet mit
  einem‘ (APD-84/M-5, statt ‚nur für Ja/Nein‘ in 0 Nr. 7); 0 Nr. 4 wieder ‚im Auswahlfenster‘, 0 Nr. 20 wieder ‚nie nur in einer
  Prüfung‘ (APD-84/V-5, V-6); 0 Nr. 15 zu Beginn die ganze Zusammenarbeit (APD-84/M-1); jede Pflicht nennt ihre Prüfung –
  Regelwächter, `doku.mjs` oder ausdrücklich Selbstkontrolle (APD-84/M-6).
- **Regelwächter** `werkzeug/regelwaechter.mjs` (APD-84/M-3) als Hooks von Claude Code, eingerichtet einmal über das Setup-Skript
  der Umgebung (Text: `node werkzeug/regelwaechter.mjs setup`):
  - `uhrzeit` – beim Senden einer Nachricht (UserPromptSubmit) und nach jedem Werkzeug (PostToolUse, nur wenn sich Minute oder
    letzte Uhrzeitzeile geändert haben): gibt Claude die abgelesene Uhrzeitzeile für die nächste Ausgabe; läuft die Sitzung nicht
    mit Opus 5.5, dazu ‚⚠ Modell …‘ mit dem Grund aus der Sitzungsdatei (Lagebild 2.5).
  - `stop` – am Ende jeder Antwort (Stop): prüft die Antwort in der Sitzungsdatei und weist sie mit Begründung zurück, bis die
    Formpflichten stimmen; höchstens zwei Zurückweisungen je Antwort.
  - **Abweichung vom Plan:** `.mjs` statt `.py` – der Wächter nutzt `werkzeug/messung.mjs` mit (Sitzungsdatei, ‚echte Nachricht
    des Nutzers‘), wie alle Werkzeuge in AppDesign. `messung.mjs` exportiert dafür nur `istNachricht`; die Zeile bleibt unverändert.
- `doku.mjs` – `checkCollab` prüft den Kasten und beide `CLAUDE.md` (APD-84/M-7).
- `werkzeug/veroeffentlichen.mjs los` prüft vor AppDesign zusätzlich die Werkzeuge (`tests/messung.mjs`, `tests/regelwaechter.mjs`).

## 2. Regelwächter – Testfälle (automatisch), `tests/regelwaechter.mjs`

Künstliche Sitzungsdaten in einem Ordner auf Zeit; die roten Fälle W-1 bis W-7 sind **echte Antworten** aus den Sitzungen 0050 und
0051 (wörtlich, `tests/regelwaechter-faelle.json`).

| Nr. | Fall | Erwartet |
|---|---|---|
| W-1 | Ausgabe ohne Uhrzeitzeile in der ersten Zeile – 0050 ‚Ich baue also nichts …‘, ‚Okay: Ich baue nichts …‘; 0051 ‚I'll start by reading …‘ (englisch, ohne Uhrzeit) | `stop` weist zurück: W-1 mit dem Anfang der Ausgabe |
| W-2 | Uhrzeit nicht abgelesen: 2 min in der Zukunft (wie 0050 ‚14:09‘), 5 min alt | W-2; abgelesen (Minute der Ausgabe oder ihres Anlasses) grün |
| W-3 | Zeitabstand falsch; erste Ausgabe der Sitzung ohne ‚–‘ | W-3 |
| W-4 | Antwort ohne Auswahlfenster – 0050 ‚… Sag Bescheid, wann und in welcher Zusammenstellung ich bauen soll.‘ | W-4; Übergabe (‚Die Sitzung (Chat) ist damit beendet!‘) ohne Fenster grün |
| W-5 | Fenster ohne ‚(Empfohlen)‘ – 0050 ‚Ja · Nein · Ich schreibe im Chat‘; ‚(Empfehlung)‘; Empfehlung nicht zuerst; ohne ‚Ich schreibe im Chat‘ | W-5 je Frage; Rückmeldung ‚P-n: …‘ ohne Empfehlung grün |
| W-6 | Zeitzeile vor dem Fenster (0050); Antwort endet ohne Zeitzeile | W-6 |
| W-7 | Zeitzeile nicht von `messung.mjs` (geschätzt bzw. abgeändert) | W-7 |
| W-8 | regelgerechte Antwort: Uhrzeit, Arbeit, Zwischenmeldung, Fenster, Antwort im Fenster, Zusammenfassung, Zeitzeile aus `messung.mjs` | keine Ausgabe, Rückgabewert 0 |
| W-9 | dieselbe Antwort dreimal zurückgewiesen; nach der ersten Zurückweisung fehlerhafte ältere Ausgaben | 1. und 2. weisen zurück, die 3. lässt durch; ältere Ausgaben werden nicht erneut gemeldet |
| W-10 | `uhrzeit`: erste Ausgabe ‚–‘, sonst Abstand zur letzten Uhrzeitzeile (auch über Mitternacht); PostToolUse in derselben Minute ohne neue Uhrzeitzeile | Uhrzeitzeile genau im Format 2.2; zweiter Aufruf in derselben Minute ohne Ausgabe |
| W-11 | `uhrzeit`: letzter Aufruf mit `claude-opus-5` nach `model_fallback` (‚due to high demand for Opus 5.5‘) | ‚⚠ Modell: claude-opus-5 statt claude-opus-5-5‘ mit Grund |
| W-12 | keine Sitzungsdatei, kaputtes JSON auf stdin, unbekannter Befehl | lässt durch, keine Ausgabe, Rückgabewert 0 |
| W-13 | `setup`: Text in einem leeren HOME ausführen, Hooks über den Starter aufrufen | `settings.json` gültig mit UserPromptSubmit, PostToolUse, Stop; der Starter findet den Wächter bzw. läuft ohne AppDesign leer durch |

**Gegenprobe** `node tests/regelwaechter.mjs --gegenprobe`: je W-1 bis W-7 wird genau diese Prüfung im Wächter abgeschaltet
(`REGELWAECHTER_AUS`) – die Prüfung muss jedes Mal rot werden.

**Am Gerät nicht prüfbar, Usertest:** ob Claude Code die Hooks lädt (Setup-Skript) – in der nächsten Sitzung absichtlich eine
Antwort ohne Fenster; der Wächter muss sie zurückweisen (Plan 5).

## 3. `checkCollab` (doku.mjs) – Testfälle (automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| C-1 | Abschnitt 0 beginnt nicht mit dem Kasten ‚Immer‘ / ‚Jede Antwort‘ | rot |
| C-2 | Kasten ohne eine der Pflichten (Nr. 21, 22, 8, 27, 26, 28, 11, 13, 2.1, 2.2, 2.4, Abschnitt 1) | rot, nennt die fehlende |
| C-3 | eine `CLAUDE.md` liest zu Beginn nur Abschnitte 0 und 1 | rot |
| C-4 | 0 Nr. 15 nennt nicht die ganze Zusammenarbeit | rot |
| C-5 | Pflicht ohne Prüfung (Zeile von 0 ohne ‚Prüfung:‘) | rot |

Gegenprobe über `node tests/alle.mjs --gegenprobe schema` (je Fall eine eingebaute Verletzung `APD-84/C-n`).

## 4. APD-83 – Was sich ändert (allgemein, R-4.6, Designrichtlinie 7)

- **Regel:** Ein offenes Fenster ändert Breite und Lage nicht, solange die Ansicht gleich bleibt; Meldungen im Fenster brechen in
  der vorhandenen Breite um. Drehen bzw. eine andere Fenstergröße darf die Breite neu bestimmen.
- **Technik:** `dialog .warn { contain: inline-size; }` in `design.css` – die Meldung trägt nicht zur Breite des Fensters
  (`width: fit-content`) bei. Im Versuch in 0050 grün in Chromium und WebKit.

## 5. APD-83 – Testfälle (automatisch)

| Nr. | Gerät × Lage × Darstellung | Handlung | Erwartet |
|---|---|---|---|
| F-1 | iPad quer hell, iPad hoch hell, iPad quer dunkel | laufende Reise mit langem Titel, plus, Reisetitel antippen, ‚Test‘ Buchstabe für Buchstabe (P-76/4 Schritt 3) | nach jedem Buchstaben Breite und Lage wie beim Öffnen (RLB-107, `ablauf-fenster-breite`) |
| F-2 | ebenso | Teilnehmer ‚G‘ tippen | Breite und Lage bleiben |
| F-3 | ebenso | Einstellungen, Beginn so, dass sich der Zeitraum mit ‚Toskana‘ überschneidet; Titel ändern | Breite und Lage bleiben |
| F-4 | ebenso | Erfassen: Programm, Kommentar, Quartier, Ort je ‚Ab‘ | Breite und Lage bleiben |
| F-5 | ebenso | Fazit ‚Ab‘ | Breite und Lage bleiben |
| F-6 | iPad (alle Fenster in `ablauf-blatt` mit Eingabe) | `checkSheet`: nach der Änderung | linker und rechter Rand wie beim Öffnen (APD-72/D-21, neu) |
| F-7 | alle | nach jeder Handlung | Grundregeln (`pruefe.mjs`) |

Gegenprobe: F-1 bis F-5 sind rot gegen 3.36.0 (je 6 Fehler in Chromium und WebKit, 0050); `contain` entfernt → wieder rot.
RLB-107 kommt in `tests/alle.mjs` und `tests/README.md` des Reiselogbuchs (für immer im vollen Lauf).

**Usertest am Gerät:** P-76/4 Schritt 3 wiederholen (iPad quer, laufende Reise, plus, ‚Test‘ in den Reisetitel) – das Fenster
bleibt stehen.
