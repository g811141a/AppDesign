# A-12 – Werkzeug `werkzeug/messung.mjs` (Zeit und Token) – Fall-Liste

**Stand 16.10.2026** · Sitzung Reiselogbuch 0008 · Grundlage: Zusammenarbeit §2 (Zeit und Token)

## Ziel

Claude ruft am Ende jeder Antwort `node ../AppDesign/werkzeug/messung.mjs` auf (oder aus AppDesign `node werkzeug/messung.mjs`)
und übernimmt die ausgegebene Zeile unverändert:

`<sub>⏱ mm:ss · Token vorige Antwort: N neu · N aus Zwischenspeicher · N geschrieben</sub>`

## Was die Sitzungsdaten hergeben (heute geprüft)

- Je Sitzung eine Datei `/root/.claude/projects/<Ordner>/<Sitzungskennung>.jsonl`; die Kennung steht in der Umgebung
  (`CLAUDE_CODE_SESSION_ID`).
- **Fund 1:** Nach einem Neustart des Arbeitsprozesses (heute 11:12) legt das System einen **zweiten Ordner** an
  (`-home-user` statt `-home-user-AppDesign`) – mit der ganzen bisherigen Sitzung. Gültig ist die **zuletzt geänderte** Datei.
- **Fund 2:** Eine Antwort des Modells steht auf **mehreren Zeilen** (eine je Baustein: Denken, Text, Werkzeug) mit
  **derselben** Kennung und denselben Token. Wer jede Zeile zählt, zählt mehrfach (meine Handmessung am Anfang dieser
  Sitzung war deshalb zu hoch: 774.507 statt richtig etwa 400.000 aus Zwischenspeicher). → je Kennung nur einmal zählen.
- **Fund 3:** Antworten im Auswahlfenster kommen als Werkzeug-Ergebnis, nicht als neue Nachricht des Nutzers.

## Fälle

| Nr. | Fall | Erwartet |
|---|---|---|
| M-1 | Normale Antwort ohne Auswahlfenster | Zeit = jetzt − Eingang der letzten Nachricht des Nutzers |
| M-2 | Antwort mit einem oder mehreren Auswahlfenstern | Wartezeit (Fenster gezeigt → beantwortet) wird abgezogen |
| M-3 | Nachricht des Nutzers ist eine Systemmeldung (Start durch eine andere Sitzung, Neustart-Hinweis, Hintergrund-Meldung) | zählt **nicht** als neue Nachricht; die Zeit läuft ab der letzten echten Nachricht – beim Start durch eine andere Sitzung ab dem Starttext |
| M-4 | Werkzeug-Ergebnisse (Bash, Lesen …) | zählen nicht als Nachricht des Nutzers |
| M-5 | Token der vorigen Antwort | Summe über alle Modell-Aufrufe zwischen der vorletzten und der letzten Nachricht des Nutzers, je Kennung einmal |
| M-6 | Erste Antwort einer Sitzung (keine vorige) | ‚Token vorige Antwort: –‘ |
| M-7 | Zwei Dateien nach Neustart (Fund 1) | die zuletzt geänderte Datei der Sitzungskennung |
| M-8 | Kennung fehlt in der Umgebung | zuletzt geänderte `.jsonl` unter `/root/.claude/projects` |
| M-9 | Keine Sitzungsdaten / unlesbare Zeile | klare Fehlermeldung, Rückgabewert ≠ 0; kaputte Zeilen überspringen und nennen – **nie** eine geschätzte Zeile |
| M-10 | 60 Minuten oder mehr | `hh:mm:ss` |
| M-11 | Große Zahlen | mit Tausenderpunkt (`1.234.567`) |
| M-12 | Hilfsagenten (Nebenstränge `isSidechain`) | werden zur Antwort mitgezählt, in der sie liefen |
| M-13 | Zusammenfassung (Kompaktierung) in der Antwort | Zeitpunkte bleiben gültig; Token des Zusammenfassens zählen mit |
| M-14 | Aufruf mitten in der Antwort | misst bis jetzt (die laufende Antwort wird nicht als ‚vorige‘ gezählt) |

## Begriffe in der Zeile (zu entscheiden, Frage 1)

- **aus Zwischenspeicher** = `cache_read_input_tokens`, **geschrieben** = `cache_creation_input_tokens` – eindeutig.
- **neu** – Vorschlag **a**: neue Eingabe **plus** Ausgabe (`input_tokens + output_tokens`) – das ist, was die Antwort
  wirklich neu erzeugt bzw. ungepuffert verbraucht. Alternative **b**: nur Ausgabe des Modells. Alternative **c**: nur
  ungepufferte Eingabe (fast immer einstellig, wenig aussagekräftig).

## Prüfung (genau eine, Zusammenarbeit 0 Nr. 3)

`tests/messung.mjs` mit künstlichen Sitzungsdaten für M-1 bis M-14 (inkl. Gegenprobe: mehrfach gezählte Zeilen müssen auffallen);
läuft im AppDesign-Selbsttest `node tests/lauf-selbsttest.mjs`.

## Umfang der Version (AppDesign 4.17.0, ohne App-Version)

1. `werkzeug/messung.mjs` und `tests/messung.mjs`
2. Zusammenarbeit §2: Verweis ‚Zeile mit `node werkzeug/messung.mjs` erzeugen, nie schätzen‘ → Zusammenarbeit 2.7.0
3. CLAUDE.md AppDesign 2.4.0 (Reiselogbuch und Import verweisen schon auf §2 – keine Änderung)
4. Fassung `fassung/4.17.0/`; das Reiselogbuch bleibt auf 4.16.1 (nur Werkzeug, kein Heben nötig)
