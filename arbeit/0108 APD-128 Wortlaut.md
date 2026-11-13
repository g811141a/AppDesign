# APD-128 Prüfumfang nach Art der Änderung – Wortlaut

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0108‘ · Bestätigung nach 0 Nr. 29 offen

## Deine Entscheidungen (13.11.2026, Sitzung 0108)

- **APD-128/D-1:** zwei Stufen – Text oder voll (keine Stufe ‚App‘).
- **APD-128/D-2:** das Skript schlägt die Stufe aus dem Unterschied vor, Claude nennt sie in der Bau-Frage, dein ‚Ja‘ bestätigt sie; im Zweifel voll.
- **APD-128/D-3:** Stufe Text = Grundprüfungen (Doku, Versionen, Texte) und alle Prüfungen mit dem alten oder neuen Text, ohne `hig`, in Chromium und
  WebKit (für 3.55.1 gemessen: 12 Läufe, 05:14, statt 152 Läufen, 70:19).
- **APD-128/D-4:** nach einer Version mit Stufe Text läuft die nächste immer voll.

## V-1 Zusammenarbeit 0 Nr. 2

**Alt:**

> 2. **Prüfen parallel und sparsam:** `node tests/alle.mjs` in der App (Werkzeug `tests/lauf.mjs`: parallel, schnellste zuerst,
>    Abbruch ab dem dritten roten Lauf, jeder rote Lauf am Ende einmal allein – grün heißt ‚wackelt‘ und wird gemeldet, Gegenprobe
>    `--gegenprobe`). Während der Arbeit nur die betroffenen Prüfungen; **alle** (Chromium
>    und WebKit, alle Ansichten, alle automatisch prüfbaren Regeln des Katalogs) genau **einmal je Version** im
>    Veröffentlichungs-Skript, nicht zusätzlich vorher. Geräte-Regeln des Katalogs kommen als Testfall (User) in den Usertest, wenn die Version sie betrifft. Hilfsagenten bzw.
>    eigene Sitzungen arbeiten parallel, **wenn möglich und sinnvoll**. Prüfung: `lauf.mjs` (Selbsttest `tests/lauf-selbsttest.mjs`).

**Neu:**

> 2. **Prüfen parallel und sparsam:** `node tests/alle.mjs` in der App (Werkzeug `tests/lauf.mjs`: parallel, schnellste zuerst,
>    Abbruch ab dem dritten roten Lauf, jeder rote Lauf am Ende einmal allein – grün heißt ‚wackelt‘ und wird gemeldet, Gegenprobe
>    `--gegenprobe`). Während der Arbeit nur die betroffenen Prüfungen; im Veröffentlichungs-Skript genau **ein Prüflauf je Version**,
>    nicht zusätzlich vorher, in einer von zwei Stufen: **Stufe Text**, wenn sich nur Texte der App geändert haben (`index.html` ohne die
>    Inhalte der Zeichenketten unverändert, sonst nur Doku und Versionsstellen, AppDesign unverändert) und die vorige Version voll geprüft
>    wurde – dann die Grundprüfungen (Doku, Versionen, Texte) und alle Prüfungen, die den alten oder neuen Text enthalten, in Chromium und
>    WebKit; sonst **voll** – **alle** (Chromium und WebKit, alle Ansichten, alle automatisch prüfbaren Regeln des Katalogs). Das Skript
>    schlägt die Stufe aus dem Unterschied vor, Claude nennt sie in der Bau-Frage (Nr. 21), im Zweifel voll. Geräte-Regeln des Katalogs
>    kommen als Testfall (User) in den Usertest, wenn die Version sie betrifft. Hilfsagenten bzw. eigene Sitzungen arbeiten parallel,
>    **wenn möglich und sinnvoll**. Prüfung: `lauf.mjs` (Selbsttest `tests/lauf-selbsttest.mjs`), Stufe `veroeffentlichen.mjs` (Selbsttest
>    `werkzeug/veroeffentlichen-selbsttest.mjs`).

## V-2 AppDesign-`CLAUDE.md`, Abschnitt ‚Technisch‘ – Prüfungen

**Alt:** Während der Arbeit nur die betroffenen, der volle Lauf genau einmal in `… los`.

**Neu:** Während der Arbeit nur die betroffenen, genau ein Lauf in `… los` – Stufe Text oder voll (Zusammenarbeit 0 Nr. 2).

## V-3 AppDesign-`CLAUDE.md`, Abschnitt ‚Arbeitsumgebung‘ – Veröffentlichen

**Alt:** … dann `node werkzeug/veroeffentlichen.mjs los --app reiselogbuch` im Hintergrund (prüft, führt eine neuere `main` vorher in die
Vorbereitungs-Zweige zusammen – bei Konflikt Abbruch vor dem Prüflauf –, voller Prüflauf, erst AppDesign, dann die App, wartet auf Pages; ~60 min).

**Neu:** … vor der Bau-Frage `node werkzeug/veroeffentlichen.mjs stufe --app reiselogbuch` (schlägt die Stufe vor und nennt die Prüfungen);
dann `node werkzeug/veroeffentlichen.mjs los --app reiselogbuch [--stufe text]` im Hintergrund (prüft, führt eine neuere `main` vorher in die
Vorbereitungs-Zweige zusammen – bei Konflikt Abbruch vor dem Prüflauf –, Prüflauf in der Stufe – `--stufe text` nur, wenn das Skript sie
bestätigt, sonst Abbruch vor dem Prüflauf –, erst AppDesign, dann die App, wartet auf Pages; voll ~60 min, Text deutlich kürzer).

## Danach (nur nach deinem ‚Ja‘)

Testfall-Liste für das Skript (`stufe`, `los --stufe text`, Erkennung ‚nur Texte‘, Auswahl der Prüfungen, ‚vorige Version voll‘, Abbruch, Gegenprobe),
dann AppDesign 4.58.0 mit den Regeln und dem Skript – die Bau-Frage stelle ich gesondert.
