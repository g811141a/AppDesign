# AppDesign – Backlog (allgemeine Themen)

**Stand 14.10.2026** · Aktuelle Version: AppDesign 4.12.0

Allgemeine Themen, die alle Apps betreffen. App-Themen stehen im Backlog der jeweiligen App.
Aufbau und Regeln wie in `README - Zusammenarbeit allgemein.md`, Abschnitt 4.

---

## 0. Nächste Version – gesammelt, noch nicht gebaut

| Nr. | Prio | Thema | bereit seit |
|---|---|---|---|
| – | – | zurzeit nichts bereit | – |

**0 Punkte bereit** · gebaut wird erst nach ‚Ja‘

## 1. Auf iPad und iPhone prüfen

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| P-32 | 1 | AppDesign 4.12.0 wird mit Reiselogbuch 3.11.5 geprüft (Prüfliste P-32 im CHANGELOG des Reiselogbuchs) | prüfen |

## 2. Weitere Themen (in Klärung)

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| A-02 | 1 | **In Arbeit (Sitzung 14.10.2026):** Richtlinien aufräumen – Schritt 1 Verlauf-Abgleich erledigt, Ergebnis in `arbeit/A-02 Verlauf-Abgleich.md` (fehlt F-1 bis F-4, widersprüchlich W-1 bis W-9, doppelt). Schritt 2 gebaut in AppDesign 4.12.0 (A-02a). Weiter: 3. Allgemeines aus Designrichtlinie Reiselogbuch und PROMPT nach AppDesign (F-4 Vorschau wischen, W-7) · 4. Zusammenarbeit allgemein und CLAUDE.md beider Repos an Abschnitt 0 anpassen (W-1 bis W-3, W-5, W-6; entschieden: W-1 Korrekturen sofort, W-2 Antwortzeile entfällt) | offen |
| A-05 | 1 | Prüfungen 2.0 (eigene Sitzung; begonnen in 4.11.2–4.11.4: R-37 überall, R-51, R-52): Veröffentlichungs-Skript; feste AppDesign-Fassung je App (unveränderlicher Ordner je Version, App nur nach Rückfrage heben; danach W-4 nachführen); Tests parallel, schnellste zuerst; Ablauf-Tests der App melden Fehler statt nur Werte auszugeben (gefunden in A-02a: viele `ablauf-*.mjs` geben nur aus, `alle.sh` zeigt nur Skriptfehler); Grundregeln nach jeder Handlung in jeder Ansicht; WebKit – gesperrte Adressen und Ort der Freigabe nennen (F-1) | offen |
| A-01 | 3 | Startseite g811141a.github.io mit allen Apps (früher S-03) | später |

---

## Erledigt

| Nr. | Thema | Version | Datum |
|---|---|---|---|
| E-05 | A-02a Regelkatalog neu: 34 Regeln in 10 Themen (R-<Thema>.<Nr>), je Regel eine Prüfung, 5 neue Regeln, `ablauf.mjs` und `checkCatalog` neu, Zebra auch in App-Tabellen | AppDesign 4.12.0 | 14.10.2026 |
| E-04 | T-02 iPhone-Ansicht geprüft (P-31 alles in Ordnung, Reiselogbuch 3.11.4) | AppDesign 4.11.4 | 14.10.2026 |
| E-03 | A-04 Arbeitsprozess 2.0 festgeschrieben (Zusammenarbeit allgemein 2.0.0, Abschnitt 0), Übergabe-Datei UEBERGABE.md, Verlauf VERLAUF.md | Zusammenarbeit 2.0.0 | 14.10.2026 |
| E-02 | A-03 Sprache (jede Meldung deutsch), R-37 überall geprüft, R-51 oberster Eintrag beim Drehen, Zusammenarbeit 1.16.0 (Prüfung zuerst schärfen, Testfälle selbst ableiten) | AppDesign 4.11.2 | 14.10.2026 |
| E-01 | Design-Repo angelegt (S-01) und Komponenten einmal programmiert (S-02) | AppDesign 4.0.0 | 09.10.2026 |
