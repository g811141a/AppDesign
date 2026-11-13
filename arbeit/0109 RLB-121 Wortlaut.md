# RLB-121 Wortlaut – Aufzählung mit langen Einträgen (R-10.5)

**13.11.2026** · Sitzung ‚Reiselogbuch 0109‘ · allgemein: **Ja** (Nutzer 13.11.2026, RLB-121/D-6) · **Wortlaut W-1 und W-2 bestätigt (Nutzer 13.11.2026, Sitzung 0109)**

## RLB-121/W-1 – Designrichtlinie allgemein 3, Punkt ‚Icon und Text bleiben zusammen‘ (ab ‚**Aufzählungen mit Trennpunkt**‘)

**Alt:**

> **Aufzählungen mit Trennpunkt** (z. B. Wetter und Smileys der Statistik, ‚8×☀️ · 6×🌧️‘): jeder Eintrag am Stück, der ‚·‘ bleibt am Ende der
> Zeile, die neue Zeile beginnt mit dem nächsten Eintrag. **Technisch:** `aufzaehlung(liste)` (ui.js) – jeder Eintrag in `.ict`, davor ein
> geschütztes Leerzeichen und ‚· ‘.

**Neu:**

> **Aufzählungen mit Trennpunkt** (z. B. Wetter und Smileys der Statistik, ‚8×☀️ · 6×🌧️‘, Quartiere ‚Hotel Krone (120,00 €) · …‘): jeder Eintrag
> am Stück, wenn er in die Zeile passt; der ‚·‘ bleibt am Ende der Zeile, die neue Zeile beginnt mit dem nächsten Eintrag. Ist ein Eintrag allein
> breiter als die Zeile, bricht er im Text um; ein Zusatz in Klammern (z. B. der Preis) und der ‚·‘ bleiben beim letzten Wort. **Technisch:**
> `aufzaehlung(liste)` (ui.js) – jeder Eintrag als Block (`.az`, `inline-block`, höchstens so breit wie die Zeile), der ‚·‘ mit geschütztem
> Leerzeichen im Block des Eintrags davor, Zusatz in Klammern ohne Umbruch.

## RLB-121/W-2 – Regelkatalog 17, R-10.5

**Alt:**

> **Icon und Text** eines Eintrags bleiben zusammen – Umbruch nur zwischen Einträgen; **in einer Aufzählung mit ‚·‘ (z. B. ‚8×☀️ · 6×🌧️‘) bleibt
> jeder Eintrag am Stück, umgebrochen wird nur nach dem ‚·‘ – die neue Zeile beginnt mit dem nächsten Eintrag** · Prüfung: ablauf.mjs –
> `checkIconText` (Icon und erstes Wort auf derselben Zeile), **`checkAufzaehlung` (keine Zeile endet mit der Anzahl oder beginnt mit ‚·‘)**

**Neu:**

> **Icon und Text** eines Eintrags bleiben zusammen – Umbruch nur zwischen Einträgen; **in einer Aufzählung mit ‚·‘ (z. B. ‚8×☀️ · 6×🌧️‘) bleibt
> jeder Eintrag am Stück, wenn er in die Zeile passt, umgebrochen wird nur nach dem ‚·‘ – die neue Zeile beginnt mit dem nächsten Eintrag; ein
> Eintrag, der allein nicht passt, bricht im Text um, ein Zusatz in Klammern bleibt ganz, nichts ragt hinaus** · Prüfung: ablauf.mjs –
> `checkIconText` (Icon und erstes Wort auf derselben Zeile), **`checkAufzaehlung` (keine Zeile endet mit der Anzahl oder beginnt mit ‚·‘; ein
> Eintrag, der passt, ist nicht getrennt; Klammern nie getrennt; nichts ragt hinaus)**

## Danach

Bei Ja: RLB-121 in ‚0. Nächste Version‘ (voraussichtlich Reiselogbuch 3.56.0 mit AppDesign 4.59.0), dann die Bau-Frage mit Prüfstufe aus `stufe`
(voll – neue Logik). Kontext etwa 275.000 – Übergabe danach.
