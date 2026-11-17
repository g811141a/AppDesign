# APD-135 Konsolidierung 3 – Befund und Plan

**Stand 17.11.2026** · Sitzung 0122 · reine Lese-Analyse: nichts gebaut, nichts ausgeführt, nur diese Datei geschrieben ·
Nummern nur in dieser Datei: **W-n** = Wortlaut alt/neu, **J-n** = Entscheidungspunkt (außerhalb mit Elternnummer, z. B. APD-135/J-3).

## Kurzfassung

- 238 Einzelbefunde aus fünf Teilen (C 68 · U 47 · F 41 · D 51 · L 31), hier zu **56 Wortlauten (W-1 bis W-56)** und **35 Entscheidungen (J-1 bis J-35)** in **7 Paketen** verdichtet (Abschnitt 5).
- **Regeln:** jede der 79 R-Regeln hat eine Prüfung; aber rund 40 Widersprüche und überholte Stellen (z. B. ‚Abbruch beim ersten roten Test‘ an 4 Stellen, Seitenleiste am iPad hoch, ‚Blau nur im Fenster‘, Import nennt die abgeschaffte Zeitzeile). Fast alle ohne Risiko.
- **Lesekosten:** eine Sitzung liest zu Beginn 81.210 Bytes, davon 34 % reine Geschichte (≈ 7.800 Token, Schätzung). Versionsgeschichten auslagern spart das jede Sitzung, ohne eine Regel zu ändern.
- **Prüflauf:** ohne Risiko streichbar sind nur 3 von 160 Läufen. Der größte Gewinn liegt außerhalb der Stufen: Vorlauf `doku-regeln`/`version-regeln` mit sofortigem Abbruch (spart im Fehlerfall einen ganzen Lauf, ~75 min) und ‚lang zuerst‘ (2,5 bis 6 min je Lauf, Simulation).
- **Stufe ‚App‘** spart in Schritt 1 nur **rund 3,6 min**, in Schritt 2 (nach Gegenproben) rund 11,5 min – 114 von 160 Läufen sind Zusammenspiel von Baustein und App.
- **`ui.js`:** 46 Bausteine, 18 in sich geschlossen, 28 greifen in die Seite ein; 21 bilden einen Kreis. Kapseln bringt wenig, solange B-4 (Schnittstellenliste mit Prüfung) und B-3 (Prüfseite) fehlen.
- **Empfohlene Reihenfolge:** 4.60.0 (APD-30) wie entschieden → **1** Korrekturen → **2** Import → **3** Lesekosten und Doppeltes der Arbeitsregeln → **4** Doppeltext der Designrichtlinie → **5** Prüfwerkzeug (Vorlauf, ‚lang zuerst‘, Wackler-Ausgabe) → **6** B-4, dann B-3 in Schritten → **7** Stufen und B-5 erst danach bzw. bei Anlass. Jede AppDesign-Version läuft voll (~75 min).
- **Zuerst entscheiden:** J-1 (Reihenfolge), J-2 (Korrekturen gesammelt), J-5 (Fenster am Ende jeder Antwort), J-8 (Blau), J-14 (Versionsgeschichten auslagern).
- Stichprobe: 16 Zitate geprüft, Wortlaut 16 von 16 richtig, eine Zeilennummer um 1 verschoben (Abschnitt 6).

## Kopf

**Grundlage** (alle im Ordner `arbeit/` von AppDesign):

| Teil | Datei | Nummern | Inhalt |
|---|---|---|---|
| C | `arbeit/APD-135 Befund C Prüfungen.md` (dazu `arbeit/APD-135 Befund C Tabelle.json`) | C-1 bis C-68 | Katalog gegen Prüfungen, Tabelle Prüfung → Baustein → Regel, Überdeckungen, Reihenfolge, Veröffentlichungs-Skript, Stufen, Wackler APD-134 |
| U | `arbeit/APD-135 Befund U Bausteine ui.js.md` | U-1 bis U-47 | Karte der 46 Bausteine, Schnittstelle, Allgemeines in der App, Plan B-3 bis B-5 |
| F | `arbeit/APD-135 Befund F Arbeitsregeln.md` | F-1 bis F-41 | Zusammenarbeit, drei `CLAUDE.md`, Import |
| D | `arbeit/APD-135 Befund D Designregeln.md` | D-1 bis D-51 | Designrichtlinien, Katalog, `PROMPT.md` |
| L | `arbeit/APD-135 Befund L Ablage Backlog Code.md` | L-1 bis L-31 | `arbeit/`, `fassung/`, CHANGELOG, Backlogs, Import-Werkzeug, toter Code |
| – | `arbeit/APD-135 Messung Laufzeiten und Abdeckung.md` | – | Messlauf 4.59.3/3.56.3 (Grundlage aller Minuten) |

Stand der Repos laut Befunden: AppDesign 4.59.3 (Zusammenarbeit 3.14.1), Reiselogbuch 3.56.3, ReiseLogBuch-Import 1.3.0.

**Zählungen** (aus den Befunden, nicht neu gemessen):

| Was | Zahl | Quelle |
|---|---|---|
| R-Regeln / G-Zeilen (davon gültig) | 79 / 19 (11) | C-1, D Kopf |
| R-Regeln mit Fundstelle im Prüfcode | 79 von 79 | C-2 |
| Regeln, die an genau einer Prüfdatei hängen | 12 | C-4 |
| Prüfdateien / Läufe / Rechenzeit / Wandzeit voller Lauf | 60 / 160 / 286,8 min / 75:27 | C Grundlage |
| Läufe nach Art: Zusammenspiel · App · Baustein · Doku | 114 · 30 · 12 · 4 | C-26 |
| Funktionen in `ui.js` / davon in allen 59 Browser-Prüfdateien ausgeführt | 249 / 74 | U-1, C-27 |
| Bausteine in `ui.js` (geschlossen / greifen ein) | 46 (18 / 28) | U-1 |
| Hörer-Anmeldungen in `ui.js` (davon `resize` + visualViewport) | 169 (21) | U-2 |
| Namen App → `ui.js` / Stellen | 69 / 291 | U-8 |
| Zusammenarbeit gesamt / Versionsgeschichte | 55.557 Bytes / 21.873 Bytes (39 %) | F Zählungen |
| Designrichtlinie allgemein / davon reine Geschichte | 215,7 KB / rund 46 KB (21 %) | D-50 |
| Lesen zu Beginn einer Sitzung / davon Geschichte | 81.210 Bytes ≈ 23.200 Token / 27.453 Bytes ≈ 7.800 Token (Schätzung) | L-15 |
| Backlogs: Anteil ‚Erledigt‘ (AppDesign / Reiselogbuch) | 79,5 % / 95,3 % (zusammen 105.501 Bytes) | L-16 |
| `arbeit/` / `fassung/` | 360 Dateien, 14,4 MB / 69 Fassungen, 56 MB | L-1, L-6 |
| ‚seit X.Y‘ in Code und Prüfungen | 1.031 Stellen | L-25 |

Hinweis: der Vorschlag nennt für `arbeit/` 270 Dateien (direkt im Ordner gezählt), Befund L 360 (mit Unterordnern; 266 direkt).

**Sicherheitsregeln** (gelten für jedes Paket, Wortlaut in `arbeit/APD-135 Konsolidierung 3 Vorschlag.md` Abschnitt B): nichts fällt ohne
Gegenprobe weg · Regeln ändern nur mit deinem ‚Ja‘ zum Wortlaut (0 Nr. 29) · Nachweis-Tabelle je Verschiebung · feste Fassungen unberührt,
die App wird erst nach dem vollen Prüflauf gehoben · eigene Version nur für die Konsolidierung · erst Befund und Plan, dann die Bau-Frage.
Dazu aus den Befunden: vor dem Bau jeden neuen Wortlaut mit `doku-regeln` und `--gegenprobe schema` prüfen (F, Abschnitt ‚Nicht geprüft‘);
die Wortlaute, die Prüfungen wörtlich verlangen, stehen in Befund F (Tabelle ‚Was die Prüfungen am Wortlaut lesen‘) und Befund D (gleiche Tabelle) –
z. B. ‚**Nummern und Präfixe**‘ genau so, ‚entfällt (APD-123)‘ in 0 Nr. 26, ‚## Versionsgeschichte‘ in beiden `CLAUDE.md`.

## 1. Mehrgleisigkeiten und Widersprüche – Wortlaut alt und neu

Zusammengeführt über alle Regeldateien; Befunde verschiedener Teile zur selben Stelle stehen in einem W. ‚ZA‘ = Zusammenarbeit allgemein,
‚DR‘ = Designrichtlinie allgemein, ‚RLB-DR‘ = Designrichtlinie Reiselogbuch, Zeilen wie in den Befunden (Stand 4.59.3/3.56.3/1.3.0).
‚Leser‘ = welche Prüfung den Wortlaut liest (alle grün nach Lesen des Codes, nicht ausgeführt). Spalte ‚Paket‘ verweist auf Abschnitt 5.
Ist ein W eine echte Wahl (zwei Fassungen möglich), steht dazu ein J-Punkt.

### 1.1 Arbeitsregeln (Zusammenarbeit, `CLAUDE.md`, Backlog-Köpfe, Doku)

**W-1 · überholt · ‚Abbruch beim ersten roten Test‘ an vier Stellen** (aus F-3, C-41) · Paket 1
- alt: RLB `tests/README.md` Z. 9 ‚und bricht beim ersten roten Test ab (Rückgabewert 1, Fehlerzeilen des Tests werden gezeigt)‘ · RLB `tests/alle.mjs`
  Z. 1–2 ‚Abbruch beim ersten Fehler‘ · AppDesign `tests/lauf.mjs` Z. 2 ‚beim ersten roten Test werden die übrigen beendet.‘ · AppDesign `tests/README.md`
  Z. 81 ‚beim ersten roten Test werden die übrigen beendet und seine Fehlerzeilen gezeigt.‘ (gilt seit 4.42.0: `GRENZE = 3`, `lauf.mjs` Z. 90)
- neu: an allen vier Stellen ‚… ab dem dritten roten Lauf werden die übrigen beendet, jeder rote Lauf läuft am Ende einmal allein (Zusammenarbeit 0 Nr. 2)‘;
  in RLB `tests/README.md` Z. 9: ‚; ab dem dritten roten Lauf bricht es ab, jeder rote Lauf läuft am Ende einmal allein (Zusammenarbeit 0 Nr. 2; Rückgabewert 1,
  Fehlerzeilen werden gezeigt)‘.
- Leser: keiner auf Wortlaut. Risiko: keins (Kommentar; `tests/` → neue Fassung).

**W-2 · überholt/toter Verweis · `messung.mjs` beschreibt die abgeschaffte Zeitzeile; ‚Zusammenarbeit 7‘ in `doku.mjs`** (aus F-4, F-5) · Paket 1
- alt: `werkzeug/messung.mjs` Z. 1–2 ‚Zeile ‚Zeit und Token‘ aus den Sitzungsdaten (…; Zusammenarbeit allgemein §2). Claude ruft es am Ende jeder Antwort auf
  und übernimmt die Zeile unverändert – nie schätzen.‘ · `tests/doku.mjs` Z. 134 Meldung ‚es gilt ‚⏱ mm:ss · Token vorige Antwort …‘‘ · `doku.mjs` Z. 1, 4, 56,
  62–68, 161, 168–170 ‚Zusammenarbeit (allgemein) 7‘ (Abschnitt 7 gibt es seit 2.17.0 nicht mehr), Z. 145 ‚Abschnitte 0–9, Abschnitt 0 Nr. 1–17‘;
  RLB `tests/doku-regeln.mjs` Z. 1.
- neu: `messung.mjs` Z. 1–2 ‚Kontextstand aus den Sitzungsdaten (Zusammenarbeit allgemein 2.2): Claude ruft es unmittelbar vor jedem Auswahlfenster auf und setzt
  ‚(Kontext N)‘ ans Ende jeder Frage im Fenster – nie schätzen. Die Zeitzeile (⏱ und Token) ist nur zur Kontrolle und steht nicht in der Antwort.‘ ·
  `doku.mjs` Z. 134 ‚Zusammenarbeit 2.2: Zeitzeile mit ‚Gesamt‘ – die Zeitzeile steht nicht in der Antwort‘ · ‚Zusammenarbeit 7‘ → ‚Zusammenarbeit 2.3‘
  (Testfälle), Z. 161 → ‚Zusammenarbeit 0 Nr. 2‘, Z. 168–170 → ‚Designrichtlinie 11‘, Z. 145 → ‚(Abschnitte und Nummern, die es gibt)‘.
- Leser: keine Gegenprobe sucht diese Meldungstexte. Risiko: keins.

**W-3 · überholt · Dauer des vollen Laufs in der AppDesign-`CLAUDE.md`** (aus C-48) · Paket 1
- alt: Z. 61 ‚… wartet auf Pages; voll ~60 min, Text deutlich kürzer)‘
- neu: ‚… wartet auf Pages; voll ~75 min, Text deutlich kürzer)‘ (gemessen 75:27, Messung).
- Leser: keiner. Risiko: keins.

**W-4 · Widerspruch · Endet jede Antwort mit einem Fenster?** (aus F-6) · Paket 1 · **J-5**
- alt: Kasten 3 ‚jede Antwort, nach der der Nutzer etwas tun soll (lesen, entscheiden, prüfen, antworten), endet mit einem Auswahlfenster … einzige Ausnahme
  die Übergabe (Nr. 28, 2.1).‘ · 0 Nr. 28 ‚Jede Frage an den Nutzer kommt ins Auswahlfenster, und jede Antwort endet mit einem – nie ‚Sag Bescheid …‘ oder eine
  offene Frage im Text; Ausnahme: die Übergabe (Nr. 14).‘ · 2.1 Z. 219–220 ‚… so endet jede Antwort mit einem Fenster und einem Push am iPad.‘
- neu (engere Fassung des Kastens): 0 Nr. 28 ‚**Jede Frage im Fenster:** Jede Frage an den Nutzer kommt ins Auswahlfenster, und jede Antwort, nach der der
  Nutzer etwas tun soll, endet mit einem (Kasten Punkt 3) – nie ‚Sag Bescheid …‘ oder eine offene Frage im Text; Ausnahme: die Übergabe (Nr. 14). Am Ende jeder
  Frage im Fenster steht ‚(Kontext N)‘ (2.2). Format 2.1. Prüfung: Selbstkontrolle.‘ · Kasten 3 Schluss ‚einzige Ausnahme die Übergabe (Nr. 14, 28)‘ ·
  2.1 ‚… – so endet jede Antwort, nach der der Nutzer etwas tun soll, mit einem Fenster und einem Push am iPad (Kasten Punkt 3).‘
- Leser: `checkKachel` (‚‚(Kontext N)‘‘, ‚Prüfung: Selbstkontrolle‘ bleiben). Risiko: gering.

**W-5 · Widerspruch · ‚nicht sofort bauen (auch kleine Fehler)‘ gegen ‚Korrekturen sofort‘** (aus F-7) · Paket 1 · **J-6**
- alt: 0 Nr. 25 ‚→ in ‚0. Nächste Version‘ eintragen, nicht sofort bauen (auch kleine Fehler aus dem Testen) → bauen nur nach Nr. 8 und 21.‘ · 0 Nr. 8
  ‚**Korrekturen sofort:** Fehler aus einer Prüfrunde als eigene Korrekturversion vor allem Neuen, auch ohne Datenverlust (vorher fragen).‘
- neu: 0 Nr. 25 ‚→ in ‚0. Nächste Version‘ eintragen, nicht ohne Bau-Frage bauen (Fehler aus dem Testen als Korrekturversion nach Nr. 8) → bauen nur nach
  Nr. 8 und 21.‘
- Leser: `checkCollab` (verbotene Sätze nicht enthalten). Risiko: gering.

**W-6 · Widerspruch · ‚jedes Repo hat eine `BACKLOG.md`‘ – der Import hat keine** (aus F-8, L-22) · Paket 2
- alt: 0 Nr. 24 ‚**Backlog:** jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4); …‘ · ZA Z. 290 ‚Thema von ReiseLogBuch-Import (das erste legt dort `BACKLOG.md` an)‘
- neu: 0 Nr. 24 ‚**Backlog:** jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4), ReiseLogBuch-Import erst mit dem ersten Thema (RLI-n, 2.4); …‘ (Rest gleich);
  beim ersten RLI-Thema `BACKLOG.md` in `ERLAUBT_IM_REPO` von `pruefen.mjs` aufnehmen.
- Leser: `checkSchema` (bleibt grün). Risiko: keins.

**W-7 · Vereinbarung nur in `UEBERGABE.md`** (aus F-10) · Paket 3 · **J-7**
- alt: `UEBERGABE.md` Z. 25 ‚**Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.‘ · 0 Nr. 6
  ‚zuerst nur hell und quer, dunkel und hoch erst, wenn hell passt‘ · dazu Dauerhaftes in `UEBERGABE.md` Z. 27–34 (Pages über `curl`, `createRequire`,
  `git push origin HEAD:main` …).
- neu (Vorschlag, genauer Wortlaut von dir): 0 Nr. 6 ‚**Muster:** … zuerst nur hell und quer (bis auf Weiteres nur hell), dunkel und hoch erst, wenn hell passt
  und der Nutzer es verlangt; …‘ · Hinweise aus Z. 27–34 als Punkt ‚**Hinweise zur Prüfumgebung**‘ unter ‚Arbeitsumgebung (Cloud)‘ der AppDesign-`CLAUDE.md`.
- Leser: `checkKasten` (Nr. 6 behält ‚Prüfung‘). Risiko: gering.

**W-8 · überholt · ‚iPad‘ allein, wo iPad und iPhone gemeint sind** (aus F-11) · Paket 1
- alt: ZA 2.4 Z. 270 ‚**1. Auf dem iPad prüfen:**‘ · RLB-Backlog Z. 13 ‚**prüfen** (auf dem iPad testen)‘ · ZA Z. 5 ‚bei allen iPad-Web-Apps‘ ·
  AppDesign-README Z. 5 ‚für alle iPad-Web-Apps‘ · RLB-README Z. 3 ‚als Web-App (PWA) für das iPad‘
- neu: 2.4 ‚- **1. Auf iPad und iPhone prüfen:** je gebauter Version ein Usertest mit Testfällen.‘ · RLB-Backlog ‚**prüfen** (auf iPad und iPhone testen)‘ ·
  ZA Z. 5 und README Z. 5 ‚Web-Apps für iPad und iPhone‘ · RLB-README ‚als Web-App (PWA) für iPad und iPhone‘.
- Leser: keiner. Risiko: keins.

**W-9 · doppelt/überholt · Veröffentlichen im AppDesign-README ohne `fassung` und `stufe`** (aus F-13) · Paket 1
- alt: README Z. 59–60 ‚Veröffentlichen mit `node werkzeug/veroeffentlichen.mjs vorbereiten --ad X.Y.Z --app <app>=X.Y.Z`, Texte schreiben, committen, dann `… los` –
  **erst AppDesign, dann die App**‘
- neu: ‚- Veröffentlichen mit `werkzeug/veroeffentlichen.mjs` – Befehle und Reihenfolge in der AppDesign-`CLAUDE.md` (‚Veröffentlichen‘); **erst AppDesign, dann die
  App** (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`).‘
- Leser: `checkCollab` (grün). Risiko: keins.

**W-10 · Abweichung · Kontextstand an fünf Stellen, Bau-Frage ohne Stufe** (aus F-15) · Paket 3
- alt: 0 Nr. 21 ‚Vorher immer ‚Soll ich Version X.Y.Z mit … erstellen? (Kontext N) Ja/Nein‘ – der Kontextstand aus `messung.mjs` steht **in der Frage selbst**
  (Nr. 28).‘ · 0 Nr. 2 Z. 79 ‚Das Skript schlägt die Stufe aus dem Unterschied vor, Claude nennt sie in der Bau-Frage (Nr. 21)‘ · AppDesign-`CLAUDE.md` Z. 17.
- neu: 0 Nr. 21 Satz 2 ‚Vorher immer ‚Soll ich Version X.Y.Z mit … erstellen (Prüflauf Stufe Text bzw. voll)? (Kontext N)‘ mit Ja/Nein – Stufe nach Nr. 2, der
  Kontextstand steht **in der Frage selbst** (2.2).‘ · 0 Nr. 28 Satz 2 ‚Am Ende jeder Frage im Fenster steht ‚(Kontext N)‘ (2.2).‘ (mit W-4) · Kasten 5 und 2.2 bleiben.
- Leser: `checkKachel`, `checkKasten` (bleiben grün). Risiko: gering.

**W-11 · Abweichung · Ausnahme bei der Empfehlung ist mehrdeutig** (aus F-16) · Paket 1 · **J-9**
- alt: 2.1 ‚… und ihrem Grund in der Beschreibung, immer ‚Ich schreibe im Chat‘ – ausgenommen nur die Empfehlung bei der Rückmeldung zu einem Usertest (‚P-n: …‘, 2.3).‘ ·
  Kasten 3 ‚Empfehlung zuerst mit ‚(Empfohlen)‘ und Grund, immer ‚Ich schreibe im Chat‘‘
- neu (Vermutung ‚keine Empfehlung‘): 2.1 ‚… und ihrem Grund in der Beschreibung, immer ‚Ich schreibe im Chat‘. Bei der Rückmeldung zu einem Usertest (‚P-n: …‘, 2.3)
  steht keine Empfehlung.‘ · Kasten 3 ‚… Empfehlung zuerst mit ‚(Empfohlen)‘ und Grund (Ausnahme 2.1), immer ‚Ich schreibe im Chat‘; …‘
- Leser: `checkKachel` (grün). Risiko: gering.

**W-12 · Abweichung · ‚Datei vor jeder Kachel‘ – vier Stellen nennen nur den Chat** (aus F-17) · Paket 3
- alt: 0 Nr. 7 ‚Längeres immer im Chat – vor dem Fenster (2.1).‘ · 0 Nr. 29 ‚Alter und neuer Text stehen im Chat, danach das Fenster mit ‚Ja/Nein‘ (2.1).‘ ·
  2.3 Z. 247 ‚Bei Mustern und Versuchen stehen im Chat der vollständige Link und nummerierte Schritte mit ‚Erwartet: …‘.‘
- neu: Nr. 7 ‚Längeres steht vor dem Fenster in der Datei und im Chat (Kasten Punkt 4, 2.1).‘ · Nr. 29 ‚Alter und neuer Text stehen in der Datei (Kasten Punkt 4) und
  im Chat, danach das Fenster mit ‚Ja/Nein‘ (2.1).‘ · 2.3 ‚Bei Mustern und Versuchen stehen der vollständige Link und nummerierte Schritte mit ‚Erwartet: …‘ in der
  Datei und im Chat (Kasten Punkt 4).‘
- Leser: `checkKachel` verlangt in Nr. 29 ‚im Chat, danach das Fenster‘ – enthalten. Risiko: keins.

**W-13 · doppelt · Bericht und ‚alle offenen Usertests‘ zweimal mit verschiedenem Umfang** (aus F-18) · Paket 3
- alt: 0 Nr. 1 ‚… im Bericht sagen, warum die Prüfung sie übersah.‘ · 0 Nr. 11 ‚**Bericht** nach einer Version **und jede Bitte, am Gerät zu prüfen** …: … alle offenen
  Usertests vollständig im Chat (und als Datei, Kasten Punkt 4)‘ · 2.3 Z. 255–256 ‚Am Ende **jeder** Umsetzung – nach einer Version und ebenso nach vorbereiteten,
  noch nicht gebauten Änderungen – stehen alle offenen Usertests einzeln im Chat, auch die früherer Versionen.‘
- neu: Nr. 1 ‚… dann beheben, dieselbe Lücke überall suchen und im Bericht nennen (Nr. 11).‘ · Nr. 11 Satz 1 ‚**Bericht** nach einer Version, nach vorbereiteten,
  noch nicht gebauten Änderungen **und bei jeder Bitte, am Gerät zu prüfen** (Muster, Versuch, Messung, Usertest): Bericht (3–5 Sätze), vollständige Aufzählung aller
  Änderungen und alle offenen Usertests vollständig, auch die früherer Versionen, in der Datei und im Chat (Kasten Punkt 4), danach das Fenster zur Rückmeldung;
  nie nur ein Verweis aufs CHANGELOG.‘ · 2.3 Z. 255–256 streichen.
- Leser: `checkKachel` (‚danach das Fenster zur Rückmeldung‘ enthalten). Risiko: gering.

**W-14 · doppelt · neue Sitzung in 0 Nr. 13 und 2.5; Satz gegen Nr. 15** (aus F-19) · Paket 3
- alt: 0 Nr. 13 ‚die neue Sitzung selbst starten – mit dem Modell und dem Aufwand, die in diesem Chat gerade eingestellt sind, Name `<App> <Chatnummer> – <Thema>` (2.5).‘ ·
  2.5 Z. 339 ‚Gelesen wird zu Beginn wenig, weil alles Gelesene bei jedem weiteren Schritt mitverarbeitet wird.‘
- neu: Nr. 13 ‚… Übergabe schreiben (Nr. 14) und die neue Sitzung selbst starten (2.5).‘ · Z. 339 streichen.
- Leser: keiner auf Wortlaut. Risiko: gering.

**W-15 · Abweichung · zwei Listen für ‚Lagebild‘** (aus F-20) · Paket 3
- alt: 0 Nr. 15 ‚das **Lagebild** (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand – 2.5)‘ · 2.5 ‚Lagebild (Versionen, Chatnummer, Sitzungsgröße, offene Usertests)‘
- neu: 2.5 Satz 1 ‚- **`UEBERGABE.md`** enthält nur den Stand der Sitzung: Lagebild wie in 0 Nr. 15 und dazu Chatnummer und Sitzungsgröße, Ergebnisse, nächster
  Schritt, danach, neue Vereinbarungen (stehen zusätzlich schon in den Richtlinien), was zuerst zu lesen ist, Starttext. Dauerhaftes (Arbeitsumgebung, Befehle)
  steht in der AppDesign-`CLAUDE.md`.‘ – Nutzungsgrenze nur, wenn du sie dauerhaft im Lagebild willst (dann in Nr. 15, **J-11**).
- Leser: keiner. Risiko: keins.

**W-16 · Abweichung · Startfrage gegen Lagebild; Import wiederholt die Startfrage** (aus F-21) · Paket 1 (ZA) und 2 (Import) · **J-10**
- alt: 0 Nr. 19 ‚liest Claude gezielt (Nr. 15) `UEBERGABE.md` und die Backlog-Köpfe und zeigt **zuerst** das Auswahlfenster ‚Was möchtest du als Nächstes tun?‘‘ ·
  Import-`CLAUDE.md` Z. 7–9 ‚zuerst das Auswahlfenster ‚Was möchtest du als Nächstes tun?‘ – hier mit **‚Reiselogbücher konvertieren‘**, dazu je weiterem angehängtem
  Repo eine Möglichkeit (Version, Backlog-Spitze) und ‚Ich schreibe im Chat‘.‘
- neu: Nr. 19 Satz 1 ‚**Startfrage:** Beginnt eine Sitzung ohne konkreten Auftrag (‚Start‘, ‚Hallo‘ oder nur angehängte Repos), liest Claude wie in Nr. 15 und dazu
  die Backlog-Köpfe; das Fenster nach dem Lagebild ist dann ‚Was möchtest du als Nächstes tun?‘: …‘ · Import Z. 7–9 ‚- **Startfrage** nach Zusammenarbeit 0 Nr. 19
  (dort steht schon ‚Reiselogbücher konvertieren‘).‘
- Leser: `checkKasten` (Nr. 19 behält ‚Prüfung‘). Risiko: gering.

**W-17 · doppelt · ReiseLogBuch-`CLAUDE.md` wiederholt 0 Nr. 2** (aus F-22) · Paket 3
- alt: RLB-`CLAUDE.md` Z. 39–41 ‚– alle Prüfungen parallel in Chromium und WebKit, Abbruch ab dem dritten roten Lauf, rote Läufe am Ende einmal allein (‚wackelt‘),
  `--alle` zeigt alle roten, Gegenprobe `--gegenprobe`‘
- neu: ‚- Prüfen: `node tests/alle.mjs` (oder `sh tests/alle.sh`) im Repo-Ordner – Ablauf und Stufen nach Zusammenarbeit 0 Nr. 2; Einrichten: AppDesign-`CLAUDE.md`;
  die Prüfungen: `tests/README.md`.‘
- Leser: `checkCollab` verlangt ‚sh tests/alle.sh‘ – enthalten. Risiko: keins.

**W-18 · doppelt · ‚Verpflichtend‘ der AppDesign-`CLAUDE.md` gegen Kasten ‚Immer‘** (aus F-23) · Paket 3
- alt: AppDesign-`CLAUDE.md` Z. 15–17 ‚Alle Regeln stehen in der Zusammenarbeit allgemein (hier keine Wiederholung) – zuerst der Kasten ‚Jede Antwort‘, dazu
  Startfrage ohne Auftrag (0 Nr. 19), nie ohne ‚Ja‘ bauen (0 Nr. 21), Testfall-Liste vor jedem Bau (0 Nr. 1), erst Usertests, dann Neues (0 Nr. 22),
  Auswahlfenster mit ‚Ich schreibe im Chat‘ (0 Nr. 7) und ‚(Kontext N)‘ in jeder Frage im Fenster (`node werkzeug/messung.mjs`, 2.2).‘
- neu: Kasten ‚> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Testfall-Liste vor jedem Bau (Nr. 1) · Sammelversionen (Nr. 8) ·
  nur Belegtes (Nr. 27) · Regeln nur mit Genehmigung (Nr. 29) · ohne Auftrag zuerst die Startfrage (Nr. 19).‘ · `CLAUDE.md` ‚Alle Regeln stehen in der Zusammenarbeit
  allgemein – zuerst der Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0; hier keine Wiederholung.‘
- Leser: `checkKasten` (Anfang ‚> **Immer:**‘, Pflichtnummern; kein ‚2.4‘ außerhalb Punkt 6). Risiko: gering.

**W-19 · doppelt · Import-Anleitung in der AppDesign-`CLAUDE.md`** (aus F-24, nach W-29) · Paket 3
- alt: Z. 40–41 ‚**ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz) – Originale, Ergebnisse und Protokolle nur im Notizordner der Sitzung. Im Ordner
  `werkzeug` einmal `npm install`, dann `node werkzeug/pruefen.mjs <Datei> --zone <Zeitzone>`.‘
- neu: ‚- **ReiseLogBuch-Import:** dort **nie Reisedaten** ablegen (Datenschutz); Konvertieren und Prüfen nach dessen `CLAUDE.md` und `PROMPT.md`.‘
- Leser: keiner auf Wortlaut. Risiko: gering, wenn W-29 (`--zone` in der Import-`CLAUDE.md`) vorher gebaut ist.

**W-20 · doppelt · 2.1 sagt Einiges zweimal** (aus F-25) · Paket 3
- alt: Z. 214–215 ‚keine Erklärtexte, keine Zeitangaben, auch bei Bitten, am Gerät zu prüfen, kein Link.‘ · Z. 221 ‚Mehrere Themen nacheinander: je Fenster eines (ganze
  Zeile, Einschätzung, Kachel).‘ · Z. 227 ‚Die laufende Zeitanzeige während der Bearbeitung kommt von der App.‘ · Z. 235 ‚Nutzung in Prozent und Rücksetzzeiten zeigt nur
  die Claude-App.‘
- neu: Z. 214–215 ‚Im Fenster steht nur eine **kurze Frage** mit den Schaltflächen – keine Erklärtexte, keine Zeitangaben. Das Feld ‚Sonstiges‘ schneidet lange Texte ab.‘ ·
  Z. 221 ‚Mehrere Themen nacheinander: je Fenster eines.‘ · Z. 227 Satz 3 und Z. 235 Satz 3 streichen.
- Leser: `checkKachel` (Pflichtwörter in Z. 216–219 bleiben). Risiko: keins.

**W-21 · unbelegte Zahl · ‚etwa 14.000 Token‘** (aus F-29) · Paket 3 (mit W-31)
- alt: 0 Nr. 15 ‚**diese ganze Datei** (einmal je Sitzung, etwa 14.000 Token)‘ · neu: ‚**diese ganze Datei** (einmal je Sitzung)‘.
- Leser: `checkKasten` Gegenprobe APD-84/C-4 ersetzt ‚**diese ganze Datei** (einmal je Sitzung‘ – bleibt erhalten. Risiko: keins.

**W-22 · Geschichte im Regeltext der Zusammenarbeit** (aus F-30, F-31, F-32) · Paket 1
- alt: Z. 281 ‚**Nummern und Präfixe** (seit 2.20.0, APD-78): eine Nummer bezeichnet überall genau eine Sache‘ · Z. 310 ‚Umgestellt wurde mit `werkzeug/umbenennen.mjs`.‘ ·
  2.5 ‚… übergeht die Einstellung im Chat (gemessen 15.11.2026, Sitzung 0115: Chat ‚mittel‘, alle Aufrufe ‚hoch‘).‘ · 2.8 ‚Abgeschaltet (APD-123, Nutzer 07.11.2026);
  Werkzeug … bleiben im Repo, eingerichtet wird er nicht mehr.‘ · AppDesign-`CLAUDE.md` Z. 53 ‚**Regelwächter** (Zusammenarbeit 2.8): abgeschaltet …‘
- neu: Z. 281 ‚**Nummern und Präfixe** – eine Nummer bezeichnet überall genau eine Sache · …‘ (Zeichenfolge ‚**Nummern und Präfixe**‘ genau so, sonst wird
  `checkSchema` überall rot) · Z. 310 streichen · 2.5 ‚… übergeht die Einstellung im Chat.‘ (Messung in die Zeile 3.14.0 der Versionsgeschichte) · 2.8 ‚- Abgeschaltet
  (APD-123); Werkzeug (`werkzeug/regelwaechter.mjs`) und Prüfung (`tests/regelwaechter.mjs`) bleiben im Repo und werden nicht eingerichtet.‘ · `CLAUDE.md` Z. 53 streichen.
  0 Nr. 26 ‚entfällt (APD-123).‘ **bleibt** (`checkKachel`, Zählung in `checkCollab`).
- Risiko: keins bei genau diesem Wortlaut.

**W-23 · Prüfung unklar · 0 Nr. 3 ‚genau eine Prüfung‘** (aus F-39, D-41, D-47) · Paket 1 · **J-12**
- alt: 0 Nr. 3 ‚Jede Regel steht an genau einer Stelle und nennt genau eine Prüfung; … Prüfung: `doku.mjs` – `checkCatalog`, `checkCollab`.‘ · DR Z. 1232
  ‚**Prüfung:** je Regel eine automatische Prüfung in `tests/` (AppDesign): …‘ (20 Regeln nennen mehrere Prüfungen, D-41; Doppeltes und Geschichte findet keine
  der beiden Prüfungen, F-39)
- neu: 0 Nr. 3 ‚Jede Regel steht an genau einer Stelle und nennt ihre Prüfung (Prüfdatei und Funktion; prüfen mehrere Funktionen Teile derselben Regel, nennt sie
  alle); … Prüfung: Selbstkontrolle; `doku.mjs` – `checkCatalog` (Katalog vollständig), `checkCollab` (keine veralteten Sätze).‘ · DR Z. 1232 ‚**Prüfung:** je Regel
  ihre automatische Prüfung in `tests/` (AppDesign), mit Datei und Funktion: …‘
- Leser: `checkKasten` (‚Prüfung‘ bleibt; kein Satzende ‚Nr. 3.‘). Risiko: keins. Alternative in J-12: neue Prüfung gegen ‚(seit X.Y.Z‘ im Regeltext.

**W-24 · Prüfung unklar · Backlog-Aufbau prüft niemand; AppDesign ohne Abschnitt 3** (aus F-40, L-17) · Paket 1
- alt: 0 Nr. 24 Schluss ‚Prüfung: Selbstkontrolle; `checkCollab`.‘ · AppDesign-Backlog: 18 Zeilen ‚später‘ stehen unter ‚## 2.‘ (Z. 32–48, 50), 2.4 verlangt ‚**3. Später:** Ideen.‘
- neu: Nr. 24 ‚Prüfung: Selbstkontrolle; Kopfzeile `veroeffentlichen.mjs` (vorbereiten), Themennummern `checkSchema`.‘ · 2.4 nach Z. 279 ‚Prüfung: Selbstkontrolle;
  Nummern `checkSchema` (unten).‘ · im AppDesign-Backlog neuer Abschnitt ‚## 3. Später‘ mit den 18 Zeilen (Text unverändert).
- Leser: `checkSchema` APD-78/S-6 liest alles vor ‚## Erledigt‘ – grün. Risiko: keins.

**W-25 · Prüfung unklar · 2.5–2.7 ohne ‚Prüfung:‘; 2.3 verspricht einen Test ohne Namen** (aus F-41) · Paket 1
- alt: ZA Kopf ‚Jede Regel nennt ihre Prüfung‘ – 2.5, 2.6, 2.7 ohne Zeile ‚Prüfung‘ · 2.3 Z. 253 ‚ein automatischer Test prüft genau diese Texte auf beiden Geräten.‘
- neu: 2.5 ‚- Prüfung: Selbstkontrolle (Modell und Aufwand mit `get_session`).‘ · 2.6 ‚- Prüfung: Selbstkontrolle; messbare HIG-Punkte `hig.mjs` (0 Nr. 23).‘ · 2.7
  ‚Prüfung: Safari-Modell `safari.mjs` und Gegenprobe (0 Nr. 20).‘ · 2.3 ‚… ein automatischer Test der Version prüft genau diese Texte auf beiden Geräten (welcher,
  steht beim Testfall).‘
- Risiko: keins (etwa 200 Bytes mehr).

**W-26 · doppelt · Kopf des Reiselogbuch-Backlogs; ‚Erledigt‘ beim Lesen überspringen** (aus F-12, L-21 Variante A) · Paket 3 · **J-15**
- alt: RLB-`BACKLOG.md` Z. 5–17 (eigene Fassung von 0 Nr. 8, 0 Nr. 24 und 2.4, z. B. ‚Claude erinnert zu Beginn und am Ende jeder Sitzung an die offenen Punkte‘) ·
  2.4 ‚**Erinnerung:** zu Beginn einer Sitzung (kurze Liste) und am Ende jeder Antwort, in der etwas gebaut oder entschieden wurde – …‘
- neu: RLB Z. 5–17 ‚Offene Themen des Reiselogbuchs; allgemeine Themen stehen im Backlog von AppDesign. Aufbau und Regeln wie in `README - Zusammenarbeit allgemein.md`
  (AppDesign), 0 Nr. 24 und 2.4.‘ · 2.4 nach ‚Erinnerung …‘ neu: ‚Gelesen wird ein Backlog bis ‚## Erledigt‘; ‚Erledigt‘ nur bei Bedarf.‘
- Leser: `checkCollab` (grün), `veroeffentlichen.mjs` ersetzt nur Z. 3. Risiko: keins. Einsparung bis 105.501 Bytes je vollständigem Lesen beider Backlogs (Schätzung ≈ 30.100 Token).

**W-27 · Lesekosten · CHANGELOG nur den neuesten Eintrag** (aus L-10, L-11) · Paket 3 · **J-16**
- alt: 0 Nr. 15 ‚alles Weitere (Katalog, Backlog, CHANGELOG, PROMPT.md) nur, soweit die Aufgabe es braucht.‘
- neu: ‚alles Weitere (Katalog, Backlog bis ‚## Erledigt‘, vom CHANGELOG der neueste Eintrag, PROMPT.md) nur, soweit die Aufgabe es braucht.‘
- Leser: `checkKachel` Nr. 15 (Pflichtwörter unberührt). Risiko: keins. Alternative: Archivdatei `CHANGELOG bis X.Y.Z.md` (Risiko gering, APD-78/S-1 liefe dort nicht mehr).

**W-28 · doppelt · Usertests in beiden Backlogs** (aus L-19) · Paket 3 · **J-17**
- alt: 2.4 ‚Nach jeder Version: … den Usertest unter ‚1.‘ anlegen, ‚Erledigt‘ ergänzen.‘ (54 Usertests stehen in beiden ‚Erledigt‘ mit verschiedenem Wortlaut)
- neu: ‚Nach jeder Version: … den Usertest unter ‚1.‘ im Backlog der App anlegen, in der er läuft (AppDesign nennt ihn in der Zeile des Themas), ‚Erledigt‘ ergänzen.‘
- Leser: `checkSchema` APD-78/S-5 sucht Usertests in beiden Backlogs – grün. Risiko: gering.

**W-29 · Import-`CLAUDE.md`** (aus F-1, F-2, F-38) · Paket 2
- alt: Z. 11–12 ‚(`README - Zusammenarbeit allgemein.md`: Arbeitsmodell Abschnitt 0, per du Abschnitt 1, Zeit und Token am Ende jeder Antwort 2.2)‘ · Z. 25–26 ‚(die
  beiden Apps mit `add_repo` lesend dazuholen, falls nicht angehängt)‘ · Z. 27–28 ‚dann im Repo-Ordner `node werkzeug/pruefen.mjs <Datei>` (eine Import-Datei)‘
- neu: Z. 11–13 ‚- Regeln der Zusammenarbeit liegen in g811141a/AppDesign (`README - Zusammenarbeit allgemein.md`, zu Beginn die ganze Datei – 0 Nr. 15, zuerst der
  Kasten ‚Immer‘ und ‚Jede Antwort‘) und gelten auch hier; die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.‘ · Z. 25–26 ‚(die beiden Apps dazuholen wie in der
  AppDesign-`CLAUDE.md` unter ‚Arbeitsumgebung‘, falls nicht angehängt; bei einer Konvertierung werden sie nur gelesen – I-2)‘ · Z. 27–28 ‚- Prüfen: im Ordner `werkzeug`
  einmalig `npm install`, dann im Repo-Ordner `node werkzeug/pruefen.mjs <Datei> --zone <Zeitzone>` (eine Import-Datei, Zeitzone nach I-13) bzw.
  `node werkzeug/pruefen.mjs --selbsttest` (nach jeder Änderung am Werkzeug).‘
- Leser: nur `checkSchema`. Risiko: keins (der alte Satz verlangt eine abgeschaffte Zeile; ohne `--zone` rät das Werkzeug Wien).

**W-30 · Import-`PROMPT.md`** (aus F-1, F-9, F-34, F-35, F-36, F-37, L-23) · Paket 2 · **J-13**
- alt: Z. 9–10 ‚Zusammenarbeit allgemein (AppDesign) gilt weiter: per du, Auswahlfenster mit ‚Ich schreibe im Chat‘, Zeit und Token am Ende jeder Antwort.‘ · Z. 137
  ‚Mehr als 4 Fragen → mehrere Fenster nacheinander.‘ · Z. 120 ‚| **Alles ohne passendes Feld** (Kilometer, Tageskosten, Uhrzeiten, Links, Bilder) | **immer
  Kachelfrage** …‘ · Z. 62 ‚Stand bei Version 1.0.0 (Reiselogbuch 3.15.1)‘ · Z. 164–165 ‚die neuen Reisen stehen unter ‚Hinzugefügt‘. Steht dort ‚bleibt gelöscht‘ …‘ ·
  Z. 8 Herkunft ohne `arbeit/RLB-5 Brainstorming.md` · Z. 3 ‚**Version 1.2.1** · Stand 16.10.2026‘
- neu: Z. 9–10 ‚Zusammenarbeit allgemein (AppDesign) gilt weiter, zuerst der Kasten ‚Immer‘ und ‚Jede Antwort‘ (0).‘ · Z. 136–138 ‚- Auswahlfenster nach Zusammenarbeit
  2.1 (bis zu 4 Fragen, Empfehlung zuerst mit ‚(Empfohlen)‘, immer ‚Ich schreibe im Chat‘); mehr als 4 offene Fragen: die wichtigsten 4 zuerst, die übrigen im nächsten
  Fenster, nachdem das vorige beantwortet ist. Muss der Nutzer vorher etwas lesen (Ausschnitt der Unterlage), steht es vor dem Fenster in der Datei und im Chat (Kasten
  Punkt 4).‘ · Z. 120 ohne ‚Kilometer‘, dazu Zeilen ‚| gegangene Kilometer | `km` |‘ und ‚| Preis der Unterkunft | `price` am ersten Tag des Aufenthalts |‘ und nach
  Z. 97 der Absatz zu `km` (0,1 bis 99,9, `kmColumn: true`) und `price` (`priceOn: true`) · Z. 62 ‚Stand bei Reiselogbuch 3.56.3:‘ · Z. 164–165 ‚4. Ergebnis: der
  Satz nennt die neuen Reiselogbücher (‚… neu‘); ‚Abgleichbericht anzeigen‘ zeigt sie mit ‚neu angelegt‘. Steht im Bericht ‚Auf diesem iPad gelöscht, im Backup …
  noch vorhanden‘ mit der Reise, Claude Bescheid geben – Claude erstellt die Datei neu.‘ (vorher in der App nachsehen) · Z. 8 um ‚`arbeit/RLB-5 Brainstorming.md`
  (RLB-5/J-n)‘ ergänzen · Versionszeilen 1.4.0 und README ‚Geprüft mit‘ 3.56.3 / 4.59.3. Werkzeug: `leseFormat` liest auch `next.(\w+) =`.
- Prüfung: `pruefen.mjs --selbsttest` mit neuem Fall `km`/`price`. Risiko: **mittel ohne Änderung** (eine Datei mit Kilometern scheitert am Werkzeug), gering mit.

**W-31 · Lesekosten · Versionsgeschichten auslagern** (aus F-26, F-27, F-28, D-50, D-51, L-14, L-15) · Paket 3 · **J-14**
- alt: DR 11 Z. 395–396 ‚jede dieser Dateien hat ihre eigene Nummer und am Ende eine Versionsgeschichte:‘ · RLB-Stummel `README - Zusammenarbeit allgemein.md` Z. 6
  ‚Die Versionsgeschichte bis 1.9.0 steht in der Datei in AppDesign.‘
- neu: neue Dateien `README - Zusammenarbeit Versionsgeschichte.md` (mit der ‚Zuordnung alt → neu‘ am Ende), `README - Designrichtlinie allgemein Versionsgeschichte.md`,
  je Repo `CLAUDE Versionsgeschichte.md`; an der alten Stelle bleibt ‚## Versionsgeschichte‘ mit ‚Steht in `…` (neueste oben); jede neue Version bekommt dort eine
  Zeile.‘ · DR 11 ‚… jede dieser Dateien hat ihre eigene Nummer und am Ende eine Versionsgeschichte (die Zusammenarbeit, die Designrichtlinie allgemein und die
  `CLAUDE.md` in einer eigenen Datei, weil sie zu Beginn gelesen bzw. geladen werden – Zusammenarbeit 0 Nr. 15):‘ · Stummel ‚Diese Datei bleibt nur als Verweis. Die
  Versionsgeschichte steht in AppDesign (`README - Zusammenarbeit Versionsgeschichte.md`).‘ · RLB-DR: künftig keine Zeile, wenn sich an den Abweichungen nichts ändert.
- Leser: `noHistory` schneidet weiter an ‚## Versionsgeschichte‘; `checkCollab` verlangt die Überschrift in beiden `CLAUDE.md` (bleibt); `version.mjs` `TEXTE`
  nimmt die neuen Dateien nicht in die Fassung (gewollt oder ergänzen – Änderung an `tests/`). DR-Versionsgeschichte: alte Nummern ‚R-nn‘ verschwinden mit.
- Einsparung: ZA ≈ 22.800 Bytes, `CLAUDE.md` 4.611 Bytes → 27.453 Bytes ≈ 7.800 Token **je Sitzung** (Schätzung); DR 44.329 Bytes nur, wenn jemand die ganze DR liest.
  Risiko: gering (keine Regel ändert sich; Begründungen stehen zu Beginn nicht mehr im Kontext).

### 1.2 Designregeln (DR, RLB-DR, `PROMPT.md`)

Alle Paket 1, wo nicht anders genannt; Leser bei allen nur `checkCatalog` (Nummern) und `checkSchema` (Präfixe) – grün; Prüfung der Regel bleibt unverändert.

| W | aus | alt (Stelle) | neu | Risiko |
|---|---|---|---|---|
| W-32 | D-1 | R-1.10 (Z. 1252) ‚Abweichung: keine Großanzeige (16)‘ | Satz streichen (R-2.6 und 16 legen die Großanzeige fest) | keins |
| W-33 | D-2, D-3 | R-7.5 (Z. 1338) ‚…, ausblenden quer nur mit panel-left (gleitet)‘ · R-4.7 (Z. 1293) ‚Esc auf der Seite geht zurück bzw. schließt die darübergelegte Seitenleiste (Fokus auf panel-left)‘ · PROMPT Z. 129 ‚**iPad hoch:** … nach links wischen schiebt sie weg (R-7.5).‘ · PROMPT Z. 168 ‚… iPad hoch mit darübergelegter Seitenleiste …‘ | R-7.5 ‚…, ausblenden nur mit panel-left (gleitet).‘ · R-4.7 ‚Esc auf der Seite geht im iPhone-Aufbau zurück‘ · PROMPT Z. 129–131 ‚**iPad hoch und quer:** die ausgeblendete Seitenleiste kommt auch durch Wischen nach rechts im Reiselogbuch (R-7.5).‘ · PROMPT Z. 168 ‚ohne offenes (iPhone-Startliste) in allen‘ (Code: `sideOver` nie wahr seit 3.43.0) | gering |
| W-34 | D-4, L-18 | DR 1 (Z. 52) ‚Bewusst verworfen: …; Glas-Leiste (schlechter lesbar); schwebende Kapseln und Menüs sind aus Glas (R-3.9).‘ | ‚Bewusst verworfen: eigene Kennzeichnung von Pflichtfeldern; harte, schmale Schatten; Glas-Leiste (schlechter lesbar). Was aus Glas ist: R-3.9.‘ – dazu den offenen Auftrag aus APD-55 erledigen (Glas-Leiste in 16 nachtragen, Wortlaut mit J-2) | keins |
| W-35 | D-5 | DR 2 (Z. 106–108) ‚Untermenü ‚Darstellung ›‘ … mit Automatisch · Hell · Dunkel (Häkchen)‘ | ‚… mit Automatisch · Hell · Dunkel (Häkchen), darunter als eigene Gruppe der Schalter ‚Glas‘ (R-3.9).‘ | keins |
| W-36 | D-6, D-18, D-34 | Z. 150 Footnote ‚Zusatzzeilen, Kasten-Bezeichnung‘ · Z. 971 ‚graue Bezeichnung `.k` links‘ · R-5.8 ‚halbfett nur Überschriften‘ · 15.10 Z. 849 ‚(R-5.8)‘ | Z. 150 ‚Zusatzzeilen‘ · Z. 147 Body ‚…, Bezeichnung im Kasten mit Feldern (halbfett)‘ · Z. 971 ‚Bezeichnung `.k` links, Wert `.v` rechts; Aussehen 15.10‘ · R-5.8 ‚… halbfett nur Überschriften und die Bezeichnung im Kasten mit Feldern (sie steht für den Tabellenkopf, R-6.5)‘ · 15.10 ‚(R-6.5)‘ | keins |
| W-37 | D-7 | DR 4 (Z. 177) ‚**Blau gefüllt = Hauptaktion** – nur in Fenstern, höchstens eine je Fenster‘ · R-3.3 ‚blau gefüllt nur die Hauptaktion im Fenster (höchstens eine)‘ | **J-8:** R-3.3 ‚blau gefüllt nur die Hauptaktion – in einem Fenster bzw. einer Sprechblase höchstens eine – sowie der Knopf der Backup-Kachel bzw. des festen Hinweises unten und der gewählte Eintrag der Liste‘; Z. 177 entsprechend (Prüfung zählt schon nur in `dialog[open], .pop`) | gering |
| W-38 | D-8 | Z. 275 ‚gleitet mit der Tastatur (0,25 s)‘ · Z. 757 ‚(gleitet, ~0,35 s)‘ · Z. 953 ‚(~0,35 s)‘ | Zahlen durch ‚(R-1.12)‘ ersetzen (Code: 500/250 ms nach R-1.12) | keins |
| W-39 | D-9, C-7 | R-4.13 ‚Kurve wie das Blatt `cubic-bezier(.32,.72,0,1)`‘, Spalte Prüfung ‚ablauf.mjs – neue Prüfung (…)‘; 31 Regeln nennen nur eine Datei | R-4.13 ‚Kurve `cubic-bezier(.32,.72,0,1)`‘, Prüfung ‚ablauf.mjs – `checkWachsen` (…)‘; Katalog nennt die vorhandenen Funktionen (`checkTitelBlase`, `checkGrossanzeige`, `checkTitelOben`, `checkBeruehren`/`checkAnheben`) | keins |
| W-40 | D-10–D-13 | Z. 65 ‚Eingabefelder (ohne Rand)‘, Z. 73 `--field-line` ‚Haarlinie um Eingabefelder‘ · Z. 160 ‚Trennlinien und Feldränder als Haarlinie (0,5 px)‘ · Z. 158 ‚Listeneinträge und Kästen 14 px‘ · Z. 704 ‚(17 px, fett)‘, Z. 726/735/820/356 px-Angaben | Z. 65 ‚Kästen, Tabelle, Eingabefelder, …‘, Z. 73 streichen · Z. 160 ‚Feldränder und Trennlinien in Listen als Haarlinie (0,5 px), Trennlinien in Menüs und im Kasten mit Feldern 1 px (15.6, 15.10); …‘ · Z. 158 ‚Kacheln und Listen 22 px, Kästen und Menüs 14 px, …‘ · Textstil statt Zahl (‚Headline, halbfett‘, ‚Title 3, fett‘, ‚Footnote‘) | keins |
| W-41 | D-14 | 15.4 (Z. 763–767) Mehr-Menü ohne ‚Darstellung‘; 15.21 ‚nach Backup durch Abstand getrennt‘ | 15.4 ‚Suchen (nur mit Einträgen) · Strich · Backup erstellen (…) · Backup laden · Abstand · Darstellung › (2) · Abstand · Messung starten (15.21) · durchgehender Strich · …‘; 15.21 ‚nach der Darstellung durch Abstand getrennt‘ | keins |
| W-42 | D-15, D-16 | G-6 ‚leere Seite mit grauem Hinweis‘ · 16 Spalte ‚außerdem (ohne automatische Prüfung: G-19)‘ mit geprüften Punkten, ‚höchstens etwa 5‘/‚etwa 3‘ | G-6 ‚‚Neues …‘ öffnet einmal von selbst, wenn es noch keinen Eintrag gibt (danach der leere Zustand, R-7.7)‘ · geprüfte Punkte in Spalte ‚Regel‘ (R-4.9, R-4.10, R-4.12, R-10.6), ‚höchstens 5‘ bzw. ‚3‘ ohne ‚etwa‘ | gering |
| W-43 | D-17 | DR 12 (Z. 428) ‚jeweils mit Grund und Datum der Entscheidung‘ gegen 0 Nr. 3 ‚Im Regeltext steht nur, was heute gilt‘ | **J-18:** 0 Nr. 3 ‚… außer der Spalte ‚Entschieden‘ (Datum) bei bewussten Abweichungen (Designrichtlinie 12, 16)‘ – oder Datum und Kennungen aus den Abweichungstabellen streichen | keins |
| W-44 | D-19, D-20 | PROMPT Z. 6 ‚(AppDesign, R-1.1 bis R-10.4)‘ · Z. 158 ‚mit ‚Gespeichert um …‘‘ | ‚(AppDesign, Abschnitt 17)‘ (nicht ‚siehe Designrichtlinie allgemein 17‘ – verboten) · ‚mit ‚Automatisch gespeichert um …‘ (7)‘ | keins |
| W-45 | D-22, D-24, D-25, D-48, D-49 | Z. 1374 ‚Automatische Prüfungen dafür: Backlog APD-40.‘ (erledigt) · 15.22 ‚Ohne Rollbereich rollt wie bisher das Fenster (ältere Apps).‘ · 14 ‚**Geplant:** Startseite …‘ (steht als APD-1 im Backlog) · ‚wie bisher‘ (Z. 716, 1000, R-3.9) · ‚Sitzung 0044‘, ‚Sitzung 0053‘ als Quelle in 13 | streichen; ‚wie bisher‘ durch den Zustand ersetzen (‚mit Namen‘, ‚deckend (Grundfarbe ganz)‘); Datum, Gerät, Safari-Version, Datei bleiben. D-24 nur nach **J-19** (braucht `ui.js` den Rückfall noch?) | keins |
| W-46 | D-23, D-40 | R-6.1 ‚Kasten mit Feldern (iPhone)‘ · 15.13 zwei Absätze ‚(seit 4.37.0, R-1.10)‘ und ‚(seit 4.45.0, R-6.6)‘ | R-6.1 ‚Kasten mit Feldern (statt Tabellenzeile, R-6.6, R-1.10)‘ · 15.13 ein Satz: ‚Im Inhalt zeigt jede Tabelle ihre Zeilen als Kästen (15.17, `.box` mit `.kv`), wenn der Inhalt schmaler als 700 px ist (R-6.6, `inhaltSchmal(#app)`) oder ab AX1 (R-1.10); Vorschau und Ausgabe bleiben Tabellen (R-6.2). Ein Wechsel wirkt wie das Drehen (R-8.1).‘ | keins |
| W-47 | D-42, D-43 | acht Zeilen ‚\| G-n \| ersetzt durch R-… \|‘, ‚Rest ersetzt durch‘ in G-10/G-15/G-18/G-19, ‚**Aus dem Katalog genommen:** R-50 …‘, ‚Die Spalte ‚ersetzt‘ (bis 4.28.1) …‘; Reihenfolge R-1.10, R-1.9, R-1.7 und R-4.7, R-4.6 | eine Zeile ‚Vergeben, nicht neu verwenden: G-1, G-2, G-4, G-5, G-7, G-12, G-13, G-17 (in R-Regeln aufgegangen, CHANGELOG 4.51.0 und 4.52.0).‘; ‚Rest ersetzt‘ streichen; die zwei Absätze streichen; Zeilen aufsteigend. Tabelle ‚Zuordnung alt → neu‘ **bleibt** (`checkCatalog` braucht sie) | keins |
| W-48 | D-44, C-11 | G-8 ‚Beträge: ‚,00‘ ergänzen, Tausenderpunkt beim Tippen‘ · G-16 ‚Filter … auf ‚Alle‘‘ (geprüft, aber ohne Nummer) | **J-20:** G-8 in R-5.1 aufgehen lassen (Prüfung meldet als R-5.1), G-16 als neue R-Regel mit App-Prüfung | gering |
| W-49 | D-26–D-39 | DR Z. 11–13 ‚**Aufbau:** Die **Regeln** stehen nur im Regelkatalog (17), jede mit ihrer Prüfung. Die Abschnitte 1–15 beschreiben Werte, Gestaltung und Bauteile und verweisen auf die Regel (R-x.y); …‘ – 12 Absätze wiederholen ≥ 30 % ihrer Regel wörtlich | Paket 4 · **J-21:** ‚**Aufbau:** Was gilt und geprüft wird, steht als Regel im Regelkatalog (17), jede mit ihrer Prüfung. Die Abschnitte 1–15 nennen dazu nur Werte, Maße, Farben, technische Namen und Begründungen (‚Bau‘) und die Nummer der Regel – sie wiederholen den Regeltext nicht. …‘; je Paar die Liste ‚bleibt im Abschnitt‘ aus Befund D (D-27 bis D-39) | **mittel** (Wert kann beim Kürzen verloren gehen) |
| W-50 | D-45, D-46 | RLB-DR Z. 16–18 (Halbsatz ‚Quartier-Links … 44 px‘, ‚seit 3.35.0‘, ‚mit 3.11.6‘) · PROMPT: 21 Stellen wiederholen DR (z. B. Z. 57, 111, 151, 176–178 ‚alle 10 Sekunden‘ statt ‚spätestens 10 s‘) | wie Tabellen D-45, D-46: streichen bzw. nur die Nummer; PROMPT Z. 206–208 nicht als ‚siehe Designrichtlinie allgemein 8‘ | gering |
| W-51 | D-47, F-33, L-25, L-26, U-46 | ‚seit X.Y.Z (Kennung)‘: DR 20, PROMPT 16, RLB-DR 1 Stelle; in Code und Prüfungen 1.031 Stellen | Regeltext: streichen (Kennung nur als nachlesbare Quelle). Code: **nicht** als eigene Version – nur beim nächsten Anfassen, nie in `normalize`, nie Kommentare mit R-Nummer in `tests/` (`checkCatalog` zählt sie, C-6) | keins / gering |

### 1.3 Code, Kommentare, Prüfungen (Fassung ändert sich, kein Regeltext)

| W | aus | alt | neu | Risiko |
|---|---|---|---|---|
| W-52 | D-21 | `tests/abgleich.mjs` Z. 1 ‚Designrichtlinie allgemein 15.4‘ · `tests/version.mjs` Z. 1 ‚15.20‘ | ‚15.18‘ bzw. ‚11, 14‘ | keins |
| W-53 | U-44, F-14 | `ui.js` Kopf Z. 3–4 ‚seit 4.11.0 … immer mit `?v=<AppDesign-Version>` einbinden‘; Schnittstelle (Z. 7–10, AppDesign-README Z. 48–49) nennt 4 Namen | Z. 3–4 streichen (feste Fassung, Z. 2); Schnittstelle als Verweis auf die Liste aus B-4 (Paket 6) | keins |
| W-54 | C-12, F (0 Nr. 1) | vier Läufe rufen `t.schritt` ohne `hig` (Kommentar ‚Grundregeln im Endzustand‘): `ablauf-tastatur-still`, `ablauf-abspielen`, `ablauf-suche-iphone`, `ablauf-texte-ablaeufe` | **J-24:** `hig: createCheck()` ergänzen oder Kommentare streichen und die Ausnahmeliste in `lauf.mjs` Z. 139 ergänzen | gering |
| W-55 | L-27, L-28, D-10 | `design.css` `.spacer` (Z. 273), `.dlg-foot` (Z. 604), Variable `--field-line`; `.iconbtn`, `.lcount` in DR genannt | `.spacer`, `.dlg-foot`, `--field-line` streichen; `.iconbtn`/`.lcount` nach **J-28** | gering |
| W-56 | U-43, U-11, U-39–U-41 | `capNext` (leer), `delete f.dataset.capNext` (3×), `isOffline` nur von `hig.mjs` genutzt; App nutzt `placeDialogs`, `held`, `dlgOpener =`; ‚Bewegung reduzieren‘ fünfmal abgefragt, ⓧ-SVG dreimal | in Paket 6 (B-4 Schritt 0): toten Code streichen, drei innere Nutzungen der App ersetzen (`resize` mit `placeDialogs` in `ui.js`, Funktion statt `held`, `setOpener`) | gering |

## 2. Prüfung → Baustein → Regel und neue Stufen

Vollständig (60 Prüfdateien, je mit Bausteinen, Regeln, Art, Orten, Stufenvorschlag): Befund C Abschnitt 2 und `arbeit/APD-135 Befund C Tabelle.json`
(Felder `stufeVorschlag`, `stufeTeile`, `stufeBedingung`). Minuten = Rechenzeit beider Browser aus der Messung (Summe 286,8 min, Lauf 75:27 bei 4 Kernen).

**Verdichtet nach Art** (C-26):

| Art | Prüfdateien | Läufe | min | Bedeutung |
|---|---|---|---|---|
| Zusammenspiel (Baustein × Inhalt der App) | 39 | 114 | 248,1 | bleibt nötig, solange sich die App ändert |
| App (Daten, Texte, Reiselogik) | 13 | 30 | 24,5 | läuft in jeder Stufe mit App-Änderung |
| Baustein (liefe ohne App gleich) | 6 | 12 | 14,7 | Kandidaten für Stufe ‚Baustein‘ bzw. Prüfseite |
| Doku (kein Browser) | 2 | 4 | 0,1 | ‚immer‘ |

**Die teuersten und die Sonderfälle** (aus C-30 bis C-38):

| Prüfung (Läufe) | min | Bausteine (Auswahl) | Regeln | Befund |
|---|---|---|---|---|
| `hig` (16, 8 Teile) | 57,7 | alle sichtbaren, Drehen, Textgröße, Bedienungshilfen | R-1.7, R-8.1, R-9.4 + 43 Grundregeln | C-30: kein Teil streichen (jede Textgröße trifft eine andere Schwelle); sparen nur durch Umbau (stilunabhängige Regeln einmal, rund 42 s feste Pausen je Teil) |
| `ablauf-navigation` (6) | 25,9 | Navigation, Seitenleiste, Wischzeile | R-7.5, R-1.12, R-7.1, R-7.2 | C-32: Varianten erst nach Gegenprobe |
| `ablauf-blatt` (4) | 21,0 | Blatt, Fenster, Tastatur | R-4.6, R-1.12, R-4.5 | längster Einzellauf 398 s (C-43) |
| `oeffnen-position` (4) | 12,7 | Rollen, Drehen, Textgröße | R-7.4, R-8.1 | C-38: bleibt (Text 23 zeigte 3.56.0) |
| `ablauf-suche-liste` (6) | 10,0 | Suchfeld, Seitenleiste | R-2.3, R-5.5, R-8.1 | – |
| `regeln-ablauf` (2) | 8,5 | Suchfeld, Fenster, Feld, Kapsel | 10 Regeln | C-35: einzige Aufruferin von 8 Prüffunktionen, bleibt |
| 5 Abläufe × Varianten ‚Bedienungshilfen‘ und ‚Text 53‘ (20) | 27,7 | wie Grundlauf | wie Grundlauf | C-32: keine eigene Gegenprobe vorhanden |
| `ablauf-seitenleiste-position (Bedienungshilfen)` (2) | 0,6 | – | – | C-31: **wirkungslos** (öffnet Seiten ohne Bedienungshilfen) |
| `doku-regeln` (2) | 0,0 | – | R-10.4 u. a. | C-37: läuft zweimal gleich; C-44: rot erst nach ~75 min bekannt |
| `ablauf-fenster` (6) | 0,7 | Seitenleiste, Kopfzeile | R-8.1, R-7.1, R-2.2 | C-33: kein Ablauf mit Bewegung – Varianten streichbar |

Weitere Befunde zur Tabelle: Grundregeln laufen in 136 von 160 Läufen (C-4); drei Prüfteile nur in `hig` (C-5); vier Läufe ohne Grundregeln (W-54);
`checkCatalog` zählt Regelnummern auch in Kommentaren (C-6); `--abdeckung` überschreibt geteilte Läufe und misst `hig` nicht (C-29); die
Ausgabe eines Wacklers geht verloren (C-68, Grund, warum APD-134 ungeklärt blieb).

**Vorschlag neue Stufen** (C-51 bis C-59; Wandzeit = Simulation mit 4 Plätzen, nicht gemessen):

| Stufe | wann | Läufe | Rechenzeit | Wandzeit (Liste / lang zuerst) |
|---|---|---|---|---|
| ‚immer‘ (`doku-regeln`, `version-regeln`, `text-regeln`) | in jeder Stufe | 6 | 2,6 min | 2:30 |
| Text (heute) | nur Texte der App | 6 + Prüfungen mit dem Text | ≥ 2,6 min | – |
| ‚App‘ Schritt 1 | Fassung der App unverändert, App-Code geändert | 150 | 272,1 min | 70:37 / 68:03 |
| ‚App‘ Schritt 2 (nach Gegenproben C-32) | wie oben | 130 | 244,4 min | 62:45 / 61:11 |
| ‚Baustein‘ | Fassung geändert | 160 (= voll) | 286,8 min | 74:14 / 71:48 |
| ‚Baustein‘ mit Abdeckung (nur seltene Funktionen) | Beispiel `ablauf-grossanzeige` | 24 | 65,8 min | 19:41 |
| voll | sonst, im Zweifel | 160 | 286,8 min | 74:14 / 71:48 |

**Ehrlich:** Stufe ‚App‘ spart in Schritt 1 nur 10 Läufe, 14,7 min Rechenzeit, **rund 3,6 min Wandzeit**; Schritt 2 rund 11,5 min. ‚Baustein‘ mit Abdeckung
hilft nur bei den 9 Funktionen, die genau eine Prüfdatei ausführt – 118 von 249 Funktionen laufen in ≥ 50 Prüfdateien (C-27, C-53). Mehr Wirkung haben
Vorlauf mit sofortigem Abbruch (C-44) und ‚lang zuerst‘ (C-43, 2:26 bis 6:21 je vollem Lauf).

**Fallen** (C-57, gekürzt): (1) neue Knöpfe der App werden von selbst Nutzer der Großanzeige, Titel-Blase und Berührung – ohne ein Wort im Diff → bei
geändertem `<style>` oder Zeichenkette mit `class`/`aria-label`/`style` laufen die Baustein-Läufe mit; (2) CSS der App überschreibt Baustein-Stile;
(3) Fehler im Baustein, sichtbar erst im Zusammenspiel (APD-133); (4) Abdeckung veraltet oder unvollständig; (5) Änderung an AppDesign `tests/` → immer voll;
(6) `adOnline` prüft die Arbeitsversion von AppDesign, nicht die Fassung der App – Stufe ‚App‘ muss an `AD_NEEDED`, Fassungs-Pfaden in `index.html`, `sw.js`
und allen Importen erkannt werden (C-55); (7) lastabhängige Wackler zeigen sich nur im vollen Lauf – regelmäßig voll; (8) Varianten ohne Gegenprobe bleiben
in ‚App‘; (9) neue Prüfdatei ohne Stufe läuft immer.

## 3. Bausteine in `ui.js` und Plan für B-3 bis B-5

**Karte verdichtet** (U-1 bis U-7; vollständige Tabelle mit Zeilen, Zustand, Hörern, CSS: Befund U Abschnitt 1):

| Einteilung | Bausteine |
|---|---|
| **in sich geschlossen (18)** | Version · Icons · Leerer Zustand · Hilfen Text und Zahlen · Langes Drücken · Neuaufbau (`setHtml`) · Ansage · Feldfehler · Menü · Wachsen und Gleiten · Sprechblase · Klicksperre · Gedrückt · Teilen und Ausgabe · Backup · Abgleich · Auswahl-Kapsel · Messmodus |
| **greift in die Seite ein (28)** | Sichtbarer Bereich · Fenster und Meldung · Textfeld wächst · Suche · Löschknopf ⓧ · Cursor am Ende · Fokus und Tasten · Darstellung und Glas · Rahmen und Rollbereich · Schwebende Ebene · Seite still · Gekürzter Titel · Titel antippen · Berühren · Großanzeige · Offline · Großschreibung · Schwebende Schaltfläche · Schnellroll-Griff · Eingabetaste · Leerzeichen · Kompakte Ansicht · Kopfzeile · Oberster Eintrag · Textgröße · Navigation · Blatt · Feld über der Tastatur |

- **Kopplung:** 39 von 160 Variablen geteilt, 11 von außen geschrieben (`dlg`, `dlgDirty`, `dlgOpener`, `dlgFest`, `keepTop`, `keepHeight` …); 21 Bausteine bilden einen
  Kreis, ohne Grundnamen bleiben vier kleine (Rollstand · Offline/Backup · Fenster-Kreis aus 8 · Gesten aus 3) (U-4, U-5).
- **Unsichtbare Reihenfolge:** acht Klicksperren in der Einfangphase und 21 Größen-Hörer wirken in der Reihenfolge der Anmeldung (U-2, U-3).
- **Feste Annahmen über die Seite:** `#dlg` und `#msg` Pflicht (fehlt `#dlg`, bricht das Skript beim Laden ab), dazu 23 Klassen und 7 Attribute der App (U-6, U-26).
- **Schnittstelle:** App nutzt 69 Namen an 291 Stellen, Prüfungen 32 Namen und schreiben in 4 innere Variablen und ersetzen Funktionen und Quelltext
  (`GLEITEN_456` tauscht 11 Textstellen) (U-8, U-12, U-13). Drei innere Nutzungen der App: `placeDialogs`, `held`, `dlgOpener =` (U-11).
- **Allgemeines in der App:** rund 450 Zeilen, davon eindeutig rund 175 (Versionsprüfung, zwei Suchzeilen, Backup-Ablauf), dazu `sw.js` bis auf 2 Zeilen (U-25).

**Plan in kleinen Schritten** (je Schritt eine AppDesign-Version, voller Prüflauf, Gegenprobe; Reihenfolge nach U-28, U-35, U-37):

| Schritt | Inhalt | Gegenprobe | Risiko |
|---|---|---|---|
| B-4.1 | Liste der öffentlichen Namen als Datei; statische Prüfung meldet jeden inneren Namen in `index.html` und Prüfungen **und jede Namensgleichheit** mit den 409 Namen von `ui.js` (U-37 Nr. 1) | einen inneren Namen in eine Kopie von `index.html` schreiben → rot | sehr gering |
| B-4.2 | die drei inneren Nutzungen der App beheben, toter Code (W-56), Kopf von `ui.js` (W-53) | voller Lauf | sehr gering |
| B-3.1 | Mindestseite (`#dlg`, `#msg`, Platzhalter `db`, `save`, `render`) aus `vorlage/index.html` abgeleitet, Vorlage vorher an die App angleichen (U-32, U-45); Gruppe A (8 Bausteine, nur Werte) | eingeschleuster Fehler je Baustein | gering |
| B-3.2 | die 5 Baustein-Prüfdateien (`ablauf-messung`, `-titel-blase`, `-titel-oben`, `-schicht-oben`, `-grossanzeige`) auf die Prüfseite | dieselben Fehler müssen dort rot werden, bevor sie in der App wegfallen | gering |
| B-3.3 | Gruppe B (25), zuerst Menü, Sprechblase, Fenster | je Baustein | mittel |
| B-3.4 | Gruppe C (11) mit Musterseite; Gruppe D (2) zuletzt oder nie (Safari zeigt nur das Gerät) | je Baustein | mittel |
| U-37 Nr. 2–3 | Zustand je Baustein bündeln; ein `resize`-Verteiler und eine sichtbare Reihenfolge der Klicksperren | Hörer-Folge vorher/nachher gleich (U-36 Nr. 2) | mittel |
| B-5 (Schritte 1–8 aus U-35) | Blätter → Grundbaustein → Eigenständige → Paare → Gesten-Kreis → Menü-Gruppe → Fenster-Kreis → Rollstand (nicht trennen, ein Baustein) | Namen und Hörer vorher/nachher, eingeschleuster Fehler, `GLEITEN_456`, `file://` und offline (U-36) | gering bis **am höchsten** |

Randbedingungen für B-5 (U-33, U-34): eine Datei, klassisches Skript (Module laden nicht von `file://`); globale Namen der App und der Prüfungen bleiben;
von außen geschriebene Variablen bleiben global oder bekommen Getter/Setter; Prüfungen, die innere Aufrufe ersetzen, wirken danach nicht mehr;
Ladereihenfolge und Hörer-Reihenfolge ändern sich mit jedem Verschieben. **Befund U empfiehlt:** B-4 und U-37 zuerst, Schritte 1–8 nur, wenn danach noch
ein konkreter Fehler auf geteilten Zustand zurückgeht – du hast B-5 mit Umbau in den Umfang genommen (Vorschlag H); deshalb **J-27**.

## 4. Nachweis-Tabelle

Je vorgeschlagene Verschiebung oder Streichung. Einsparung in Bytes bzw. Lese-Token (Token = Schätzung aus Bytes/3,5, nicht gemessen) oder Minuten
Prüflauf (Rechenzeit aus der Messung, Wandzeit aus der Simulation in Befund C). Was nur umformuliert wird, steht in Abschnitt 1.

| Vorschlag | stand in | steht dann in | geprüft durch | Einsparung | Risiko |
|---|---|---|---|---|---|
| W-1 | 4 Kommentare/Doku (falsch) | einheitlich, Verweis 0 Nr. 2 | `lauf-selbsttest.mjs` (‚kein Abbruch beim ersten‘) | – | keins |
| W-13 | 0 Nr. 1, 0 Nr. 11, 2.3 Z. 255–256 | 0 Nr. 11 | `checkKachel` | ~200 B je Sitzung | gering |
| W-14 | 0 Nr. 13 und 2.5, 2.5 Z. 339 | 2.5 | Selbstkontrolle | ~230 B je Sitzung | gering |
| W-17 | RLB-`CLAUDE.md` Z. 39–41 | 0 Nr. 2 | `lauf-selbsttest.mjs`, `checkCollab` | ~140 B (automatisch geladen) | keins |
| W-18 | AppDesign-`CLAUDE.md` Z. 15–17 | Kasten ‚Immer‘ | `checkKasten` | ~180 B netto | gering |
| W-19 | AppDesign-`CLAUDE.md` Z. 40–41 | Import-`CLAUDE.md` (nach W-29) | `pruefen.mjs` | ~150 B (automatisch geladen) | gering |
| W-20 | 2.1 doppelt | 2.1 einmal, Kasten 4 | `checkKachel` | ~250 B je Sitzung | keins |
| W-22 | ZA 2.4, 2.5, 2.8, AppDesign-`CLAUDE.md` Z. 53 | Versionsgeschichte 2.20.0/3.14.0, 2.8 | `checkSchema`, `checkKachel` | ~335 B | keins |
| W-26 | RLB-Backlog Z. 5–17; ganzes Backlog gelesen | 0 Nr. 24, 2.4; nur bis ‚## Erledigt‘ | `checkCollab`, APD-78/S-6 | ~850 B; bis 105.501 B ≈ 30.100 Token je vollem Lesen | keins |
| W-27 | ganzes CHANGELOG gelesen | neuester Eintrag | `checkDocs` (liest ohnehin nur ihn) | bis 152.000 B ≈ 43.000 Token je ungezieltem Lesen | keins |
| W-28 | Usertests in beiden Backlogs | Backlog der App | APD-78/S-5 | ~250 B je Version | gering |
| W-31 | Versionsgeschichten ZA, beide `CLAUDE.md`, DR | eigene Dateien | `noHistory`, `checkCollab` Z. 159, `checkSchema`, `checkFassungen` | 27.453 B ≈ 7.800 Token **je Sitzung**; DR 44.329 B beim vollen Lesen | gering |
| W-7 | `UEBERGABE.md` Z. 25, 27–34 | 0 Nr. 6, AppDesign-`CLAUDE.md` | Selbstkontrolle | ~1.000 B aus der Übergabe, gleich viel in der `CLAUDE.md` | gering |
| W-32–W-46 | DR 1–16 (überholt, doppelt, ‚seit‘) | Katalog bzw. eine Stelle | Prüfung der jeweiligen Regel (unverändert) | DR ‚seit‘ 815 B, Rest nicht gemessen | keins |
| W-47 | Katalog: ersetzt-Zeilen, zwei Absätze | CHANGELOG 4.51.0/4.52.0 | `checkCatalog` | ~0,9 KB | keins |
| W-49 | DR 1–15 wiederholt Regeltext (12 Paare ≥ 30 %) | Katalog; Abschnitt nur Bau-Werte | Prüfung der Regel; je Paar Liste ‚bleibt im Abschnitt‘ | nicht gemessen | **mittel** |
| W-50 | RLB-DR, PROMPT (21 Stellen) | DR, PROMPT nennt die Nummer | Prüfung der Regel, `checkCollab` | nicht gemessen | gering |
| C-31 | Lauf `ablauf-seitenleiste-position (Bedienungshilfen)` | gestrichen (oder mit `t.seite` wirksam) | Wächter-Fall `--gegenprobe bedienung` | 2 Läufe, 37 s Rechenzeit | keins |
| C-37 | `doku-regeln` in WebKit | nur erster Browser | `--gegenprobe schema` | 1 Lauf, 1 s | keins |
| C-33 | `ablauf-fenster` Varianten (4 Läufe) | gestrichen oder Vergleiche in `hig` ‚Start‘ | einen der 5 Vergleiche brechen → Grundlauf rot | < 0,7 min | gering |
| C-44 | `doku-regeln`, `version-regeln` mitten im Lauf | Vorlauf mit sofortigem Abbruch | `--gegenprobe schema` bleibt rot | im Fehlerfall bis ~75 min | keins |
| C-43 | ‚kurz zuerst‘ | ‚lang zuerst‘ | Vergleichslauf `--alle`: gleiche Wackler, kein Lauf über 450 s | 2:26 bis 6:21 je vollem Lauf (Simulation) | gering |
| C-32 | 20 Varianten-Läufe in jeder Stufe | Stufe ‚Baustein‘/voll | neue Gegenproben (a) Bewegung trotz ‚reduzieren‘, (b) Fehler nur bei 53 px nach einer Geste | ~11,5 min Wandzeit in Stufe ‚App‘ (mit Schritt 1) | mittel |
| B-3.2 | 5 Baustein-Prüfdateien in der App | Prüfseite in AppDesign | Gegenprobe je Datei auf der Prüfseite | 10 Läufe, ~3,6 min Wandzeit in Stufe ‚App‘ | gering |
| W-55 | `design.css` `.spacer`, `.dlg-foot`, `--field-line` | entfällt | `grep` (0 Nutzer), voller Lauf | ~150 B | gering |
| W-56 | `capNext`, `delete …capNext`, `isOffline`; drei innere Nutzungen der App | entfällt bzw. Funktionen von `ui.js` | B-4-Prüfung, voller Lauf | klein | gering |

**Ausdrücklich nicht empfohlen** (Befund L): `arbeit/` in ein Archiv umziehen (L-4: 380 Verweise aus 57 Dateien, keine Lese-Token gespart, Pages-Links brechen still);
alte Fassungen löschen (L-8: Geräte mit alter App laden sie, Risiko hoch); Richtlinientexte aus den Fassungen nehmen (L-9); `VERLAUF.md` verschieben (L-12);
`hig`-Teile streichen (C-30); Lagebilder vergangener Sitzungen löschen nur auf ausdrücklichen Wunsch (L-5, ~120.000 B, keine Lese-Token).

## 5. Pakete und Entscheidungspunkte

Jedes Paket ist eine eigene Version mit eigener Bau-Frage (Versionsnummern vorläufig, die Bau-Frage setzt sie). Jede AppDesign-Version läuft **voll**
(~75 min); nur das Import-Repo hat keinen App-Prüflauf. Jedes Fenster bekommt dazu ‚Ich schreibe im Chat‘.

### Vorweg (allgemein, 3 Punkte)

- **J-1 · Reihenfolge der Pakete.** (a) **1 → 2 → 3 → 4 → 5 → 6 → 7 (Empfohlen)** – erst risikolose Korrekturen, Prüfwerkzeug vor den Bausteinen, Stufen und B-5 zuletzt ·
  (b) Paket 5 (Prüfwerkzeug) zuerst – jeder spätere volle Lauf wird früher kürzer · (c) Paket 3 (Lesekosten) zuerst – jede Sitzung spart sofort ≈ 7.800 Token.
- **J-3 · Konsolidierung getrennt von 4.60.0?** (a) **ganz getrennt (Empfohlen)** – Sicherheitsnetz ‚eigene Version nur für die Konsolidierung‘ · (b) C-68 (Ausgabe
  eines Wacklers sichern, Risiko keins) schon in 4.60.0 – dann ließe sich APD-134 im nächsten vollen Lauf klären.
- **J-4 · Zuschnitt.** (a) **je Paket eine Version (Empfohlen)** – ein Fehler ist eindeutig zuzuordnen · (b) Pakete 1 und 3 in einer Version – spart einen vollen Lauf (~75 min).

### Paket 1 – Korrekturen ohne Risiko (AppDesign 4.60.1, Reiselogbuch 3.57.1 · 10 Punkte)

Umfang: W-1 bis W-5, W-8, W-9, W-11, W-16 (Zusammenarbeit), W-22 bis W-25, Satz aus W-6 in 0 Nr. 24, W-32 bis W-48, W-51 (nur Regeltext), W-52;
Backlog-Ordnung aus L-18 (APD-62 auf ‚später‘ und gekürzt, Verweise in APD-46, APD-56, APD-58, APD-59 nachführen). **Prüfstufe:** voll (Fassung ändert
sich, Kommentare in `tests/`); vorher `doku-regeln` und `--gegenprobe schema`. **Risiko:** keins bis gering. **Nutzen:** jede Regel sagt, was gilt und
was der Code tut; tote Verweise führen nicht mehr ins Leere.

- **J-2 · Wie entscheiden?** (a) **die Wortlaute ohne eigenen J-Punkt als Liste übernehmen (Empfohlen)** – reine Korrekturen, alt und neu stehen in Abschnitt 1 ·
  (b) jeden W einzeln im Fenster · (c) nur Arbeitsregeln jetzt, Designregeln mit Paket 4.
- **J-5 · Fenster am Ende (W-4, F-6).** (a) **nur Antworten, nach denen du etwas tun sollst (Empfohlen)** – so steht es im Kasten und in 3.10.0 · (b) jede Antwort – dann Kasten 3 anpassen.
- **J-6 · Korrekturen (W-5, F-7).** (a) **Nr. 25 verweist auf Nr. 8: Korrekturversion mit Bau-Frage (Empfohlen)** · (b) Fehler aus dem Testen warten auf die nächste Sammelversion – dann Nr. 8 anpassen.
- **J-8 · Blau gefüllt (W-37, D-7).** (a) **Regel an den gebauten Stand: Hauptaktion in Fenster/Sprechblase, Backup-Knopf, fester Hinweis, gewählte Kachel (Empfohlen)** – die Prüfung zählt schon so ·
  (b) Gestaltung an die Regel – eigenes Thema mit Muster.
- **J-9 · Ausnahme beim Usertest (W-11, F-16).** (a) **dort keine Empfehlung (Empfohlen, Vermutung des Befunds)** · (b) dort kein ‚Ich schreibe im Chat‘.
- **J-10 · Startfrage (W-16, F-21).** (a) **erst Lagebild, dann das Fenster ‚Was möchtest du als Nächstes tun?‘ (Empfohlen)** – Nr. 15 gilt immer · (b) Startfrage zuerst, Lagebild danach.
- **J-12 · Prüfangabe in 0 Nr. 3 (W-23).** (a) **ehrlicher Wortlaut ‚ihre Prüfung‘ (Empfohlen)** · (b) dazu neue Prüfung gegen ‚(seit X.Y.Z‘ und ‚gemessen TT.MM.‘ im Regeltext (Paket 5, mit Gegenprobe) · (c) Regeln mit mehreren Prüfungen aufteilen.
- **J-18 · Datum in den Abweichungstabellen (W-43, D-17).** (a) **Ausnahme in 0 Nr. 3 (Empfohlen)** – das Datum sagt, seit wann eine Abweichung gilt · (b) Datum und Kennungen streichen.
- **J-19 · ‚Ohne Rollbereich rollt das Fenster‘ (D-24).** (a) **erst in Paket 6 prüfen, ob `ui.js`/Vorlage den Rückfall brauchen (Empfohlen)** · (b) Satz jetzt streichen.
- **J-20 · G-8 und G-16 (W-48, D-44).** (a) **mit Paket 5 als R-Regeln mit Prüfung (Empfohlen)** · (b) so lassen.

### Paket 2 – Import (ReiseLogBuch-Import 1.4.0 · 4 Punkte)

Umfang: W-29, W-30, Import-Teil von W-16, Werkzeug-Teil von W-6; Hinweis aus L-24 in die Bau-Frage (bei Änderungen an `index.html`-Mustern oder
`ui.js`-Klassen einmal `pruefen.mjs --selbsttest`). **Prüfung:** `pruefen.mjs --selbsttest` mit neuem Fall `km`/`price`; `doku-regeln` einmal (liest das
Import-Repo mit). Kein App-Prüflauf. **Risiko:** gering. **Nutzen:** die nächste Konvertierung scheitert nicht an Kilometern oder Quartierpreis; keine abgeschaffte Zeitzeile.

- **J-13 · Kilometer und Quartierpreis (W-30, F-34).** (a) **Felder `km`/`price` in Anleitung und Werkzeug; RLB-5/E-4 neu: Kilometer ins Feld (Empfohlen)** – die App hat sie seit 3.41.0 · (b) weiter Kachelfrage.
- **J-33 · Mehr als 4 Fragen bei der Konvertierung (F-9).** (a) **Fenster nacheinander, die wichtigsten 4 zuerst (Empfohlen)** – Wortlaut W-30 · (b) Antwortzeile zum Kopieren wie 2.1.
- **J-34 · Werkzeug ohne `--zone` (F-38).** (a) **Abbruch statt Wien (Empfohlen)** – Erkenntnis ‚nie die Zeitzone raten‘ · (b) Wien als Vorgabe lassen.
- **J-35 · Versionsgeschichte für das Import-`PROMPT.md` (F-36).** (a) **nein, Versionsgeschichte bleibt in der README (I-1) (Empfohlen)** · (b) eigene Versionsgeschichte im `PROMPT.md`.

### Paket 3 – Lesekosten und Doppeltes der Arbeitsregeln (AppDesign 4.60.2, Reiselogbuch 3.57.2 · 7 Punkte)

Umfang: W-7, W-10, W-12 bis W-15, W-17 bis W-21, W-26 bis W-28, W-31. **Prüfstufe:** voll. **Risiko:** gering. **Nutzen:** ≈ 7.800 Token je Sitzung
(Schätzung), dazu bis ≈ 30.100 bzw. 43.000 Token je vollem Lesen von Backlog bzw. CHANGELOG; jede Regel an einer Stelle.

- **J-14 · Versionsgeschichten auslagern (W-31).** (a) **Zusammenarbeit, beide `CLAUDE.md` und DR (Empfohlen)** · (b) nur Zusammenarbeit und `CLAUDE.md` · (c) nichts auslagern.
- **J-15 · Backlog lesen (W-26).** (a) **Regel ‚bis ## Erledigt‘ (Empfohlen, Risiko keins)** · (b) ‚Erledigt‘ in eigene Datei – braucht Änderung an `checkSchema`.
- **J-16 · CHANGELOG lesen (W-27).** (a) **Regel ‚neuester Eintrag‘ (Empfohlen)** · (b) Archivdatei `CHANGELOG bis X.Y.Z.md`.
- **J-17 · Usertests nur im Backlog der App (W-28).** (a) **ja (Empfohlen)** · (b) weiter in beiden.
- **J-7 · ‚Muster nur hell‘ (W-7, F-10).** (a) **in 0 Nr. 6 aufnehmen, Hinweise zur Prüfumgebung in die AppDesign-`CLAUDE.md` (Empfohlen)** · (b) Vereinbarung aufheben · (c) weiter nur in der Übergabe.
- **J-11 · Nutzungsgrenze im Lagebild (W-15, F-20).** (a) **dauerhaft in 0 Nr. 15 (Empfohlen)** – sie hat Hilfsagenten dieser Sitzung zweimal gestoppt · (b) nur bei Bedarf.
- **J-25 · ‚Arbeitsumgebung (Cloud)‘ der AppDesign-`CLAUDE.md` (4.028 B, jede Sitzung geladen, L-15).** (a) **bleibt (Empfohlen)** – sonst wird das Einrichten vergessen (Vermutung) · (b) nach `tests/README.md` auslagern.

### Paket 4 – Doppeltext der Designrichtlinie (AppDesign 4.60.3, Reiselogbuch 3.57.3 · 1 Punkt)

Umfang: W-49 (D-26 bis D-39), W-50 (D-45, D-46). **Prüfstufe:** voll (der PROMPT-Teil allein wäre Stufe Text). **Risiko:** mittel – ein Wert kann beim
Kürzen verloren gehen; je Paar die Liste ‚bleibt im Abschnitt‘ aus Befund D abarbeiten. **Nutzen:** Abschnitte und Katalog laufen nicht mehr auseinander (D-8, D-14 zeigen es schon).

- **J-21 · Umfang.** (a) **Grundsatz und alle Paare in einer eigenen Version (Empfohlen)** · (b) nur den Grundsatz, Paare beim nächsten Anfassen · (c) so lassen.

### Paket 5 – Prüfwerkzeug (AppDesign 4.61.0 · 4 Punkte)

Umfang: Vorlauf mit sofortigem Abbruch (C-44), ‚lang zuerst‘ (C-43), Ausgabe eines Wacklers sichern (C-68), C-31, C-37, C-33, `checkCatalog` nur
Zeichenketten in laufenden Dateien (C-6, Gegenprobe: Nummer nur im Kommentar → rot), Teil im Dateinamen der Abdeckung und `hig` mit Abdeckung (C-29),
Selbsttests in `los`, wenn sich ihr Werkzeug geändert hat (C-47), W-54, Kopfkommentare (C-41), dazu J-12 (b) und J-20 falls gewählt. **Prüfstufe:** voll und
ein Vergleichslauf `--alle` für ‚lang zuerst‘. **Risiko:** keins bis gering. **Nutzen:** 2,5 bis 6 min je Lauf, im Fehlerfall bis ~75 min; Wackler werden klärbar.

- **J-26 · Umfang.** (a) **alles oben, ‚lang zuerst‘ mit Vergleichslauf (Empfohlen)** · (b) ohne ‚lang zuerst‘ · (c) nur Vorlauf und Wackler-Ausgabe.
- **J-24 · Vier Läufe ohne Grundregeln (W-54, C-12).** (a) **Grundregeln ergänzen, Laufzeit vorher messen (Empfohlen)** – die Kommentare versprechen sie · (b) Kommentare streichen, Ausnahmeliste der Gegenprobe ergänzen.
- **J-29 · APD-134.** (a) **erst C-68 bauen, die Ursache (C-62 ‚Schließen mitten im Öffnen‘, C-63 Haltezeit 750 ms) nach dem nächsten Wackler beheben (Empfohlen)** · (b) C-62 und C-63 gleich mit Gegenprobe beheben; dazu APD-134 umbenennen (L-18).
- **J-30 · Messungen außerhalb der Fassung (L-31).** (a) **Regel ‚Messungen in `tests/messungen/` nie umbenennen‘ (Empfohlen)** · (b) `messungen/` in die Fassung aufnehmen (Codeänderung).

### Paket 6 – B-4 und B-3 (ab AppDesign 4.62.0, je Schritt eine Version · 3 Punkte)

Umfang: Schritte B-4.1, B-4.2, B-3.1, B-3.2 aus Abschnitt 3, je mit Gegenprobe; danach B-3.3/B-3.4 und U-37 Nr. 2–3 nach neuer Bau-Frage. **Prüfstufe:** voll.
**Risiko:** sehr gering (B-4) bis mittel (B-3.3 ff.). **Nutzen:** keine stille Namensgleichheit bei einer zweiten App; Grundlage für Stufe ‚App‘ und jede neue App.

- **J-31 · Umfang.** (a) **B-4.1, B-4.2, dann B-3.1 und B-3.2 (Empfohlen)** · (b) nur B-4 · (c) B-3 bis Gruppe C.
- **J-28 · `.iconbtn` und `.lcount` (W-55, L-28).** (a) **`.iconbtn` mit Doku streichen, `.lcount` behalten (Empfohlen)** – der große Titel ist beschrieben, nur zurückgestellt · (b) beide behalten · (c) beide streichen.
- **J-32 · Allgemeines aus der App nach AppDesign (U-14 bis U-24, `sw.js` als Basis U-21).** (a) **als eigenes Thema ins Backlog, nach B-3 (Empfohlen)** · (b) mit Paket 6.

### Paket 7 – Stufen und B-5 (nur bei Anlass · 3 Punkte)

Umfang: Stufe ‚App‘ in `pruefstufe.mjs` und `los --stufe app` mit den Bedingungen aus C-55 und den Fallen aus Abschnitt 2, Regel in 0 Nr. 2 (Wortlaut zur
Bau-Frage); Gegenproben für die Varianten (C-32); B-5-Schritte aus Abschnitt 3. **Prüfstufe:** voll. **Risiko:** mittel (Stufen) bis am höchsten (B-5 Rollstand).
**Nutzen:** Stufe ‚App‘ Schritt 1 ~3,6 min, Schritt 2 ~11,5 min je App-Version; B-5 vor allem Schutz vor Kopplung in `ui.js`.

- **J-22 · Stufe ‚App‘.** (a) **erst mit Schritt 2 und der Prüfseite (Empfohlen)** – Schritt 1 spart nur ~3,6 min · (b) Schritt 1 jetzt · (c) gar nicht.
- **J-23 · Nach einer kleineren Stufe die nächste Version voll (C-59 a)?** (a) **ja (Empfohlen)** – lastabhängige Wackler zeigen sich nur im vollen Lauf · (b) nein.
- **J-27 · B-5 (Umbau `ui.js`).** (a) **nach Paket 6 neu entscheiden, Schritte nur bei konkretem Anlass (Empfohlen, Befund U-38)** · (b) Schritt 2 (Grundbaustein) und die Bündelung der Hörer fest einplanen · (c) alle 8 Schritte wie entschieden, je Schritt eine Version.

**Zahl der Entscheidungspunkte:** vorweg 3 · Paket 1: 10 · Paket 2: 4 · Paket 3: 7 · Paket 4: 1 · Paket 5: 4 · Paket 6: 3 · Paket 7: 3 – zusammen **35**.
Davon offene Fragen, die die Befunde ausdrücklich offen lassen: J-5 (F-6), J-6 (F-7), J-7 (F-10), J-8 (D-7), J-9 (F-16), J-10 (F-21), J-11 (F-20), J-13 (F-34),
J-18 (D-17), J-19 (D-24), J-22 und J-23 (C-59), J-29 (L-18), J-33 (F-9), J-35 (F-36).

## 6. Was nicht geprüft wurde

Aus den fünf Befunden gesammelt (Einzelheiten jeweils im Abschnitt ‚Nicht oder nur stichprobenartig geprüft‘):

- **Nichts ausgeführt:** keine Prüfung, kein Browser, kein Selbsttest, kein Import-Werkzeug. ‚Bleibt grün‘ heißt überall: aus dem Code von `doku.mjs` gelesen –
  vor dem Bau jeden Wortlaut mit `doku-regeln` und `--gegenprobe schema` prüfen; ob ein neuer Satz in Abschnitt 0 versehentlich ‚ n. ‘ erzeugt, nur von Hand angesehen (F).
- **Zeiten:** alle aus einem Messlauf (4.59.3/3.56.3); Wandzeiten der Stufen und von ‚lang zuerst‘ sind Simulationen ohne Lastwirkung (C). Die Kosten der Grundregeln
  in den Abläufen, die Dauer von `tests/messung.mjs` und der Pages-Läufe sind nicht gemessen (C-34, C-48).
- **Einteilung ‚Baustein/App/Zusammenspiel‘** der 60 Prüfdateien von Hand aus Kopfkommentar und Importen (C); die Bausteingrenzen in `ui.js` sind eine Einteilung
  nach Kommentaren (U). Die Abdeckung ist nur Chromium, ohne `hig`, geteilte Läufe unvollständig (C-29); ob `zeigeTitelBlase` zu Recht in 59 Dateien zählt, ist offen (U-7).
- **APD-134:** Ursachen C-62 bis C-67 sind Vermutungen ohne Nachstellen unter Last.
- **`ui.js`-Umbau:** Mindestseite, Ladereihenfolge-Falle, `importScripts` im Service Worker nur aus dem Code abgeleitet (U).
- **Designrichtlinie:** Doppeltext nur gemessen, wo ein Absatz die Regelnummer nennt; Text gegen Code nur bei Widersprüchen nachgesehen; Abschnitt 13 nicht gegen
  `safari.mjs`, Fall-Tabelle 15.18 nicht gegen die Abgleich-Prüfungen; ob `checkNavigation`/`checkFokus` die darübergelegte Seitenleiste noch prüfen, offen (D).
- **Arbeitsregeln:** Import-`pruefen.mjs` nur teilweise gelesen; weitere Felder der App seit 3.34.0 nicht vollständig gesucht; ob jede Version den in 2.3 versprochenen
  Test hat, nicht geprüft; ‚nur hell‘ nur in den gelesenen Dateien gesucht (F).
- **Ablage:** Lese-Token sind Schätzungen; wie oft Backlogs und CHANGELOGs heute ganz gelesen werden, ist nicht gemessen; nur 50 Commits Geschichte (flacher Klon);
  `tests/` von AppDesign und `werkzeug/` nicht auf toten Code untersucht (L).
- **Diese Datei:** nur die Befunde zusammengeführt, keine neue Zählung außer der Stichprobe; die Zuordnung zu Paketen und die Empfehlungen sind mein Urteil.

**Stichprobe der Zitate (16 geprüft, mit `sed -n`/`grep` gegen die Dateien):**

| Befund | Datei, Zeile | Ergebnis |
|---|---|---|
| F-1 | Import-`CLAUDE.md` Z. 11–12 ‚Zeit und Token am Ende jeder Antwort 2.2‘ | stimmt |
| F-3 | RLB `tests/README.md` Z. 9 ‚bricht beim ersten roten Test ab‘ | stimmt |
| F-3, C-41 | AppDesign `tests/lauf.mjs` Z. 2 und Z. 13; `GRENZE = 3` Z. 90 | stimmt |
| F-6 | ZA Z. 55–57 (0 Nr. 28) | stimmt |
| F-29 | ZA Z. 152 ‚etwa 14.000 Token‘ | stimmt |
| F-30 | ZA Z. 281 ‚(seit 2.20.0, APD-78)‘ | stimmt |
| F-8 | ZA Z. 110 ‚jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4)‘ | stimmt |
| D-1 | DR Z. 1252 ‚Abweichung: keine Großanzeige (16)‘ | stimmt |
| D-12 | DR Z. 158 ‚Listeneinträge und Kästen 14 px‘ | stimmt |
| D-19 | PROMPT Z. 6 ‚R-1.1 bis R-10.4‘ | stimmt |
| D-22 | DR ‚Automatische Prüfungen dafür: Backlog APD-40.‘ | Wortlaut stimmt, steht in **Z. 1374** statt Z. 1373 |
| D-25 | DR Z. 630 ‚**Geplant:** Startseite …‘ | stimmt |
| C-48 | AppDesign-`CLAUDE.md` Z. 61 ‚voll ~60 min‘ | stimmt |
| C-57, U-10 | `ui.js` Z. 1261 `GROSS_SEL` mit `.nb, .pnav, .bbar, .dlg-head, .side-head, .side-search, .fab` | stimmt |
| U-43 | `ui.js` Z. 1870 `function capNext() {}` | stimmt |
| L-18 | AppDesign-`BACKLOG.md` Z. 30 APD-62 ‚offen bleibt nur APD-38/T-1 (zurückgestellt)‘ | stimmt |

Ergebnis: 16 von 16 Wortlauten richtig, 15 von 16 Zeilen genau, eine um 1 verschoben (D-22). Nebenbei: Befund C nennt seine Tabelle ‚`C-tabelle.json`‘ – die
Datei heißt `arbeit/APD-135 Befund C Tabelle.json`.

## 7. Deine Entscheidungen (17.11.2026, Sitzung 0122, im Auswahlfenster)

| Nr. | Entscheidung |
|---|---|
| J-1 | Reihenfolge der Pakete **1 → 2 → 3 → 4 → 5 → 6 → 7** |
| J-3 | Konsolidierung **ganz getrennt** von AppDesign 4.60.0 (APD-30) |
| J-4 | **Pakete 1 und 3 zusammen in einer Version** (spart einen vollen Prüflauf); die übrigen Pakete je eine Version. Damit verschieben sich die vorläufigen Versionsnummern in Abschnitt 5 – die Bau-Frage setzt sie. |
| J-2 | Paket 1: die Wortlaute ohne eigenen J-Punkt **als Liste übernehmen** (alt und neu in Abschnitt 1) |
| J-5 | Fenster am Ende **nur bei Antworten, nach denen du etwas tun sollst** (W-4) |
| J-6 | Fehler aus dem Testen: **eigene Korrekturversion mit Bau-Frage**, Nr. 25 verweist auf Nr. 8 (W-5) |
| J-8 | ‚Blau gefüllt‘: **Regel an den gebauten Stand** – Hauptaktion in Fenster/Sprechblase, Backup-Knopf, fester Hinweis, gewählte Kachel (W-37) |
| J-9 | Ausnahme bei der Rückmeldung zu einem Usertest: **dort keine Empfehlung**, ‚Ich schreibe im Chat‘ bleibt (W-11) |
| J-10 | Sitzung ohne Auftrag: **erst das Lagebild, dann das Fenster ‚Was möchtest du als Nächstes tun?‘** (W-16) |
| J-12 | 0 Nr. 3: **‚ihre Prüfung‘** statt ‚genau eine Prüfung‘ (W-23) |
| J-18 | Datum in den Abweichungstabellen: **Ausnahme in 0 Nr. 3** (W-43) |
| J-19 | Satz ‚Ohne Rollbereich rollt das Fenster‘: **erst in Paket 6 prüfen**, ob `ui.js` oder die Vorlage den Rückfall brauchen |
| J-20 | G-8 und G-16: **mit Paket 5 zu R-Regeln mit Prüfung** (W-48), mit Gegenprobe |
| J-14 | Versionsgeschichten **auslagern: Zusammenarbeit, beide `CLAUDE.md` und Designrichtlinie** (W-31) |
| J-15 | Backlog **nur bis ‚## Erledigt‘ lesen** (W-26) |
| J-16 | CHANGELOG: **nur den neuesten Eintrag lesen** (W-27) – Sitzung 0123 |
| J-17 | Usertests **nur im Backlog der App**, AppDesign nennt ihn in der Zeile des Themas (W-28) – Sitzung 0123 |
| J-7 | ‚Muster nur hell‘ **in 0 Nr. 6**, die Hinweise zur Prüfumgebung aus der Übergabe in die AppDesign-`CLAUDE.md` (W-7) – Sitzung 0123 |
| J-11 | **Nutzungsgrenze dauerhaft im Lagebild** (0 Nr. 15, mit W-15) – Sitzung 0123 |
| J-25 | ‚Arbeitsumgebung (Cloud)‘ **bleibt** in der AppDesign-`CLAUDE.md` – Sitzung 0123 |
| J-13 | Konvertierung: **Felder `km`/`price` in Anleitung und Werkzeug**, Kilometer ins Feld (W-30) – Sitzung 0123 |
| J-33 | Mehr als 4 Fragen bei einer Konvertierung: **Fenster nacheinander, die wichtigsten 4 zuerst** (W-30) – Sitzung 0123 |
| J-34 | `pruefen.mjs` ohne `--zone`: **Abbruch** statt Wien – Sitzung 0123 |

Offen: Paket 2 J-35; Pakete 4 bis 7 J-21 bis J-24, J-26 bis J-32.
