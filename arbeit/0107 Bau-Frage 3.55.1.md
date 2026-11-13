# Bau-Frage Reiselogbuch 3.55.1 – RLB-124

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0107‘

## Festgelegt (Nutzer 13.11.2026)

- **Wortlaut RLB-124/W-1:** Im Teilen-Menü heißt der Punkt **‚PDF (mit iOS 27 zurzeit nicht möglich)‘**. Die graue Zeile darunter bleibt: ‚Im Drucken-Menü
  Teilen, dann ‚In Dateien sichern‘‘.
- **Immer**, auch in Safari.
- **Umfang a:** nur das Teilen-Menü. Vorschau, Abgleichbericht und Hinweisfenster bleiben unverändert, ebenso die PDF-Funktion selbst.
- **Version:** Reiselogbuch **3.55.1** (Korrektur), AppDesign bleibt **4.57.0**. Usertest **P-102**.
- Backlog: RLB-124 steht in ‚0. Nächste Version‘, **1 Punkt bereit**.

## Testfall-Liste (0 Nr. 1)

| Nr. | Gerät · Lage · Darstellung | Handlung | Erwartet | Prüfung |
|---|---|---|---|---|
| RLB-124/T-1 | iPad quer und hoch, hell und dunkel | Teilen-Icon › Menü | Punkte ‚Vorschau‘, ‚HTML‘, ‚PDF (mit iOS 27 zurzeit nicht möglich)‘; graue Zeilen unverändert | `ablauf-gesamt` (Menüliste, R-6.4) |
| RLB-124/T-2 | iPhone hoch und quer | Teilen-Icon › Menü | Titel ganz lesbar, wenn nötig umbrochen, nicht abgeschnitten; Menü im Bildschirm | Grundregeln `pruefe.mjs`, `ablauf-texte-ablaeufe` |
| RLB-124/T-3 | iPad und iPhone, Textgröße ax3 | Teilen-Icon › Menü | Titel umbrochen, ganz lesbar | Grundregeln (Textgrößen) |
| RLB-124/T-4 | alle Ansichten | ‚PDF (…)‘ antippen | wie bisher: Fenster ‚Ausgabe V…‘ mit Dateiname, `print()` wird aufgerufen | `regeln-ablauf` (`checkPrint`), `ablauf-gesamt` (`checkDateiname`) |
| RLB-124/T-5 | Safari und App vom Home-Bildschirm | Menü ansehen | Hinweis in beiden gleich | Gerät (Usertest) |

## Usertest P-102 (Entwurf, kommt nach dem Bau ins CHANGELOG)

- **P-102/0** Version prüfen: ‚Reiselogbuch · Version 3.55.1 · … · AppDesign 4.57.0‘ auf iPad und iPhone.
- **P-102/1** iPad quer, App vom Home-Bildschirm: Teilen-Icon › Menü zeigt ‚PDF (mit iOS 27 zurzeit nicht möglich)‘.
- **P-102/2** iPhone hoch, App vom Home-Bildschirm: Der Titel ist ganz lesbar.
- **P-102/3** iPad, Safari: Derselbe Hinweis steht da, und ‚PDF‘ öffnet weiterhin das Drucken-Menü.

## Frage

**Soll ich Version 3.55.1 mit RLB-124 (Hinweis hinter ‚PDF‘) erstellen?** Bau mit dem Veröffentlichungs-Skript (`vorbereiten --app reiselogbuch=3.55.1`,
voller Prüflauf in `los`, etwa 60 min).

**Als allgemeine Regel festhalten? (0 Nr. 4)** Empfehlung: **Nein** – vorübergehender Text der App, kein allgemeines Verhalten.

## Offener Usertest

- **P-101** (Reiselogbuch 3.55.0, AppDesign 4.57.0): ok bis auf /16 Schritt 3 → **RLB-124**.
