# Lagebild – Reiselogbuch 0166

**Stand 26.11.2026** · Sitzung ‚Reiselogbuch 0166 – RLB-126 Bau ‚Zuletzt gelöscht‘ abstimmen‘

## Versionen

| Teil | Version | Quelle |
|---|---|---|
| Reiselogbuch | **3.58.5** (`APP_VERSION`), lädt AppDesign 4.70.2 (`AD_NEEDED`) | `index.html` |
| AppDesign | **4.70.2** (`AD_VERSION`); seit 0165 nur `arbeit/` und `UEBERGABE.md`; Pages-Lauf für den Übergabe-Commit läuft noch | `v4/ui.js`, GitHub-API |
| ReiseLogBuch-Import | **1.4.0** laut Versionstabelle; Kopf der `README.md` nennt noch 1.3.0 (auffällig, nicht geändert) | `README.md` |
| Zusammenarbeit allgemein | **3.19.0** | Datei gelesen (ganz) |
| `CLAUDE.md` | AppDesign 2.14.0 | Datei |

## Offene Usertests

Keine (Backlog Reiselogbuch und AppDesign, Abschnitt 1 leer).

## Backlog-Spitze

- **Reiselogbuch, 0. Nächste Version:** 0 Punkte bereit.
- **RLB-126** (Prio 3, allgemein, AD-Bean `recentlydeleted`) ‚Zuletzt gelöscht‘: Muster ok (J-7), J-8 bis J-10 entschieden, Wortlaut freigegeben;
  als Nächstes Bau mit dem Framework-Chat abstimmen, dann Bau-Frage.
- **RLB-6** (Prio 3) Ausschreibungstexte in Reiselogbücher umwandeln.
- **AppDesign (ruht, solange der Framework-Chat läuft):** APD-135, APD-136, APD-149 (läuft im Chat ‚AppDesign Framework Steuer-Bean Konzept‘),
  APD-148 (alle Prio 1), APD-139 (Prio 2) …

## Modell, Aufwand, Nutzungsgrenze

- **Modell:** Opus 5.5 – eingestellt (`session_context.model`) und tatsächlich (`last_served_model`, alle 14 Aufrufe der Sitzungsdatei);
  kein `model_fallback`.
- **Aufwand:** hoch – eingestellt (`effort_level`) und tatsächlich (14 × `"effort":"high"`); `CLAUDE_CODE_EFFORT_LEVEL` ungesetzt.
- **Nutzungsgrenze:** Fünf-Stunden-Grenze, Status ‚erlaubt‘, keine Überziehung; setzt zurück am 27.11.2026 um 00:20 Uhr.

## Arbeitsumgebung

- ReiseLogBuch (`48818a0`) und ReiseLogBuch-Import (`2ec7d03`) geklont, Verweise in Kleinschreibung angelegt und registriert.
- Tests eingerichtet: Playwright 1.56.1 in `ReiseLogBuch/tests` (`package.json` und `package-lock.json` gelöscht); Verweise 1194 → 1243;
  Chromium 158.0.8127.36 und WebKit 26.0 starten. 4 Kerne.
- **Hooks:** keine – `~/.claude/settings.json` enthält nur die Regel `create_session` erlauben.

## Nächster Schritt (UEBERGABE.md Abschnitt 3)

RLB-126: Liegt die Abstimmung mit dem Framework-Chat zur AD-Bean `recentlydeleted` vor? Davon hängt ab, ob der Bau jetzt in `v4/` als
AppDesign 4.71.0 (mit Reiselogbuch-Version) kommt oder erst mit dem Framework. Danach die Bau-Frage (0 Nr. 21, Prüflauf voll); ohne
Abstimmung nach Backlog weiter mit RLB-6.

Beim Bau zu beachten (aus 0165): `checkErstFragen` (R-4.12) und die Prüfungen mit der alten Lösch-Abfrage (`ablauf-sperre` RLB-125/T-12,
`ablauf-seitenleiste-kontextmenue`, `ablauf-wischen`) anpassen; neue AD-Bean mit Katalogdatei; Abgleich und Backup (RLB-126/T-9, T-10) sind im
Muster noch nicht umgebaut; Wortlaut R-4.12, R-7.8, R-7.10 und Lösch-Abfrage kommen mit dem Bau in Designrichtlinie, Katalog und PROMPT.md.
