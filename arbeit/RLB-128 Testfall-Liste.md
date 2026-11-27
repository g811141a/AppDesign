# RLB-128 – Seitenleiste bleibt beim Drehen stehen: Vorschlag und Testfall-Liste

**27.11.2026 · Sitzung Reiselogbuch 0169** · Befund und Messung: `arbeit/APD-154 Testfall-Liste.md` Abschnitte 1 und 2 · **Vorschlag und Testfall-Liste RLB-128/T-1 bis T-9 freigegeben** (Nutzer 27.11.2026, Sitzung 0169, im Fenster).

## So macht es Apple

- Laut **HIG Layout** soll alles vertraut bleiben, wenn man das Gerät dreht: „People expect your experience to remain familiar when they rotate their device, resize a window …“
- **Notizen am iPad** (Nutzer 27.11.2026, am Gerät, Sitzung 0169):
  - Die Liste in der Seitenleiste bleibt beim Drehen stehen, auch wenn die gewählte Notiz weggerollt ist.
  - Ein offenes Kontextmenü bleibt neben seiner Notiz offen.
- Das Reiselogbuch weicht heute ab: Beim Drehen springt die Liste zum gewählten Eintrag.

## Vorschlag (App, nur `index.html`)

- **Beim Drehen bzw. einer Größenänderung bleibt die Liste der Seitenleiste genau stehen.**
  - `keepSideScroll` stellt nur die Rollposition wieder her, wie mit `sideHold`.
  - Den gewählten Eintrag rollt es nicht ins Bild.
- Wie heute rollt der gewählte Eintrag ins Bild, wenn sich die Auswahl ändert: Antippen, ein neues Reiselogbuch, Suchtreffer, Wechsel nach ‚Zuletzt gelöscht‘ und zurück.
- **Allgemein oder App:** App. Die Rollposition der Seitenleiste verwaltet das Reiselogbuch selbst. Die Regel R-8.1 gilt schon allgemein, und die Prüfung kommt allgemein mit APD-154.
- **AD-Bean:** keine, weil nur App-Code.
- **Version:** Reiselogbuch 3.59.1 mit AppDesign 4.71.0 unverändert. Das hast du erlaubt (Nutzer 27.11.2026, im Fenster).

## Testfall-Liste RLB-128 (Testfälle automatisch, in `ablauf-seitenleiste-position` bzw. neu `ablauf-seitenleiste-drehen`)

Gerät iPad. Gedreht wird quer → hoch → quer und hoch → quer → hoch, hell, in Chromium und WebKit. Nach jedem Drehen gelten die Grundregeln.

| Nr. | Fall | Daten | Erwartet nach jedem Drehen |
|---|---|---|---|
| T-1 | Liste der Reiselogbücher gerollt, der gewählte Eintrag oberhalb weggerollt | 14 Reiselogbücher | oben derselbe Eintrag, `scrollTop` ±2 px |
| T-2 | wie T-1, der gewählte Eintrag unterhalb weggerollt | 14 | wie T-1 |
| T-3 | Liste ‚Zuletzt gelöscht‘ gerollt | 14 gelöschte | wie T-1 |
| T-4 | wie T-3 mit offenem Kontextmenü an der untersten sichtbaren Kachel | 14 | Liste steht, Menü daneben an seiner sichtbaren Kachel, Kachel blau |
| T-5 | wie T-1 mit Sprechblase ‚Endgültig löschen‘ (in ‚Zuletzt gelöscht‘) | 14 | Liste steht, Sprechblase daneben an ihrer Kachel |
| T-6 | Auswahl ändern nach dem Drehen: einen weggerollten Eintrag über die Suche öffnen | 14 | der gewählte Eintrag rollt ins Bild, wie heute (nicht unter Kopf oder Backup-Kachel) |
| T-7 | große Schrift (AX5), Liste gerollt | 14 | wie T-1 |
| T-8 | wenige Einträge, Liste rollt nicht | 3 | nichts springt |
| T-9 | iPhone hoch ↔ quer, Startliste gerollt | 14 | oben derselbe Eintrag |

- **Rot gegen 3.59.0** (0 Nr. 1): T-1, T-3 und T-4 sind gemessen (`scrollTop` 400 → 39 bzw. 48). T-2, T-5, T-7 und T-9 prüfe ich beim Bau.
- **Usertest (am Gerät):** iPad, ‚Zuletzt gelöscht‘ und die Liste der Reiselogbücher nach unten rollen, dann drehen. Erwartet: Oben bleibt derselbe Eintrag stehen, wie in Notizen.
