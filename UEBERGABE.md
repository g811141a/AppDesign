# Übergabe an die nächste Sitzung

**Stand 14.10.2026** · geschrieben am Ende der Sitzung ‚A-02 Richtlinien aufräumen – Schritte 1 und 2‘
(Zusammenarbeit allgemein 2.0.0, Abschnitt 0 Nr. 14). **Claude liest diese Datei zu Beginn jeder Sitzung zuerst.**

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | 3.11.4 (14.10.2026 03:59) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign (ui.js, design.css) | 4.11.4 | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Designrichtlinie allgemein | 4.11.4 (Regelkatalog R-01 bis R-52) | `README - Designrichtlinie allgemein.md` |
| Designrichtlinie Reiselogbuch | 3.11.4 | im Repo ReiseLogBuch |
| Zusammenarbeit allgemein | 2.0.0 (Abschnitt 0 = Arbeitsprozess 2.0, hat Vorrang) | `README - Zusammenarbeit allgemein.md` |

- **Offene Prüfpunkte:** keine.
- **Nächste Version AppDesign:** A-02a (freigegeben, Bau mit ‚Ja‘ bestätigt). **Reiselogbuch:** T-83 (‚Verkehrsmittel‘ →
  ‚Reisemittel‘ im Abgleichbericht).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58 – startet jede Woche eine frische
  Sitzung, liest diese Datei und beide Backlogs und endet mit dem Starttext (die alte Erinnerung ist gelöscht).

## 2. Ergebnisse dieser Sitzung (A-02 Schritte 1 und 2)

- **Schritt 1 – Verlauf-Abgleich:** `arbeit/A-02 Verlauf-Abgleich.md` – fehlt F-1 bis F-4, widersprüchlich W-1 bis W-9,
  doppelt (Liste für das Zusammenführen), umgesetzt.
- **Schritt 2 – Regelkatalog-Entwurf (freigegeben):** `arbeit/A-02 Regelkatalog-Entwurf.md` – 52 Regeln → **34 in 10
  Themen**, Nummern **R-Thema.Nr** (z. B. R-2.1), je Regel genau eine Prüfung, 5 neue Regeln mit Prüfung (R-2.3,
  R-4.4, R-5.3, R-5.4, R-6.4), R-50 wandert in Zusammenarbeit 7, Zuordnung alt → neu.
- **Entschieden (für Schritt 4, Zusammenarbeit 2.1.0):** W-1 Korrekturen nach einer Prüfung sofort als eigene
  Korrekturversion (Abschnitt 0 Nr. 8 gilt, §6 anpassen) · W-2 Antwortzeile zum Kopieren entfällt (nur noch bei mehr
  als 4 Fragen; §2 und CLAUDE.md beider Repos anpassen).

## 3. Nächster Schritt: Bau AppDesign 4.12.0 (A-02a) – ‚Ja‘ liegt vor

1. **Zuerst die Fall-Liste** (Abschnitt 0 Nr. 1) zeigen, z. B.: jede der 34 Regeln hat genau eine Prüfung, die in
   `tests/` wirklich läuft · jede alte Nummer ist zugeordnet (keine Regel verloren) · Prüfskripte melden neue Nummern ·
   die 5 neuen Prüfungen schlagen bei einem eingebauten Fehler an (erst rot, dann grün) · Zebra je Tabellenzeile in
   App-Tabellen (R-6.1) · alle Tests der App grün (`sh tests/alle.sh`) · iPad/iPhone × quer/hoch × hell/dunkel.
2. Designrichtlinie allgemein: Abschnitt 17 durch den Entwurf ersetzen; Abschnitte 1–15 kürzen (Regeltext → Verweis
   auf R-x.y; Doppeltes laut Verlauf-Abgleich Abschnitt 3 entfernen); Grundprinzipien nachführen (W-6).
3. Prüfskripte (`AppDesign/tests/*.mjs`, `ReiseLogBuch/tests/*.mjs`): Regelnummern umstellen, neue Prüfungen.
4. Verweise in Designrichtlinie Reiselogbuch, PROMPT.md, CHANGELOG (neue Einträge) auf R-x.y.
5. Version: AppDesign 4.12.0 (v4/ ändert sich nicht). Reiselogbuch nur, wenn seine Tests/Doku sich ändern
   (dann 3.11.5 mit T-83 – vorher fragen).
6. Bericht nach Abschnitt 0 Nr. 11, Prüfpunkte Schritt für Schritt (beginnend mit /0).

## 4. Danach

- **A-02 Schritte 3 und 4 (eigene Version):** Allgemeines aus Designrichtlinie Reiselogbuch und PROMPT nach AppDesign
  (F-4 Vorschau wischen, W-7 alter Text ‚Backup laden … ersetzt‘); Zusammenarbeit allgemein 2.1.0 (W-1, W-2, W-3,
  Abschnitte 1–9 an Abschnitt 0 anpassen); CLAUDE.md beider Repos neu fassen (W-5).
- **A-05 Prüfungen 2.0 (eigene Sitzung):** Veröffentlichungs-Skript; feste AppDesign-Fassung je App (danach W-4);
  Tests parallel; WebKit – gesperrte Adressen `cdn.playwright.dev`, `playwright.download.prss.microsoft.com` und den
  Ort der Freigabe nennen (F-1).
- **Danach Funktionen:** T-05, T-06.

## 5. Arbeitsumgebung (für Claude)

- Repos nebeneinander klonen: `/home/user/AppDesign` und `/home/user/ReiseLogBuch` (App lädt `../AppDesign/v4/…`).
- Tests: im Ordner `ReiseLogBuch/tests` `npm install` (Playwright 1.56, Chromium unter `/opt/pw-browsers`), dann
  `sh tests/alle.sh`.
- Veröffentlichen: Vorbereitungs-Zweig, `--no-ff` nach `main`, erst AppDesign, dann App; Pages-Läufe abwarten.
- Zeit und Token am Ende jeder Antwort aus den Sitzungsdaten (`/root/.claude/projects/…/*.jsonl`).

## 6. Starttext für die neue Sitzung

> Lies im Repo g811141a/AppDesign zuerst UEBERGABE.md, dann die Zusammenarbeit allgemein, die Designrichtlinien und
> die beiden Dateien im Ordner arbeit/, gib mir das Lagebild und beginne mit dem Bau von AppDesign 4.12.0 (A-02a) –
> zuerst die Fall-Liste.
