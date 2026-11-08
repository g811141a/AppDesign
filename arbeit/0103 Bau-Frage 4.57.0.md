# Bau-Frage AppDesign 4.57.0 / Reiselogbuch 3.55.0

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0103‘ · zurzeit **keine gültige Freigabe** (Nutzer 08.11.2026, Sitzung 0102: ‚Nein‘)

## Was gebaut würde (alle bereit)

| Punkt | Thema | Inhalt |
|---|---|---|
| APD-126 | Eingabefelder | Cursor beim ersten Antippen am Ende; leeres Textfeld einzeilig, wächst und schrumpft mit |
| APD-124 | Eingabefelder | Rückgängig-Icon im Feld nach dem Leeren mit ⓧ |
| RLB-123 | Eingabefelder (App) | Verlauf: Vorschläge wieder über dem Feld, am Ende einfügen, danach klein weiter (aus P-100/1) |
| APD-127 | Gleiten | Gleitbewegungen wie die Seitenleiste in Notizen, neue Regel R-1.12 |
| APD-125 | klein (Zusammenarbeit 3.11.0) | vor jeder Kachel alle wichtigen Informationen in einer Datei und im Chat |
| APD-116 | klein | Dateiname im Hinweisfenster allein in einer Zeile, neue Regel R-10.8 |

## Hinweis 0 Nr. 8 (Sammelversionen)

Die Regel sagt: 2–3 zusammengehörige Punkte, **höchstens 2 Themen**. Hier sind es **zwei Themen** (Eingabefelder: APD-124, APD-126, RLB-123;
Gleiten: APD-127) und **zwei kleine Punkte** (APD-125 Regeltext, APD-116 eine Meldung). Das sind mehr als 2–3 Punkte; dafür ist die Testfall-Liste
für alle schon bestätigt (`arbeit/4.57.0 Testfall-Liste.md`, mit APD-116 ergänzt).

## Ablauf nach ‚Ja‘

1. Vorbereitungs-Zweige `vorbereitung-4.57.0` (AppDesign) und `vorbereitung-3.55.0` (ReiseLogBuch), `veroeffentlichen.mjs vorbereiten`.
2. Bauen nach der Testfall-Liste, dabei nur die betroffenen Prüfungen.
3. CHANGELOG mit Testfällen P-101, Backlog, Versionsgeschichten; `… fassung`; committen.
4. `veroeffentlichen.mjs los --app reiselogbuch` im Hintergrund: voller Prüflauf, erst AppDesign, dann die App, Pages (~60 min).
5. Bericht mit allen Änderungen und Usertest P-101.

## Offene Usertests

- **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0) – ok bis auf **P-100/1** (→ RLB-123, kommt mit 3.55.0).

## Backlog-Erinnerung

Nächste Version AppDesign 4.57.0: **5 Punkte bereit** (APD-125, APD-126, APD-127, APD-124, APD-116) · Reiselogbuch 3.55.0: **1 Punkt bereit**
(RLB-123) · Offen im Backlog: RLB-120 · RLB-122 · RLB-121 · APD-85 Teil 6 (Wackler WebKit) · APD-80 · APD-30 · APD-57 · APD-62.

## Ergebnis

**‚Nein‘** (Nutzer 08.11.2026, Sitzung 0103) – nicht gebaut; die sechs Punkte bleiben in ‚0. Nächste Version‘. Weiter keine gültige Freigabe.
