# Bau-Frage AppDesign 4.60.2 / Reiselogbuch 3.57.2 – Korrektur P-108 (Sitzung 0129)

Stand 18.11.2026 · Stufe **voll** (Vorschlag des Skripts: AppDesign geändert) · Prüflauf etwa 60 min

## Was die Version enthält

- **Kapseln wie Notizen (P-108/F-1, P-108/F-4):** Jede Kapsel steht an ihrem Platz und wächst aus ihrer Mitte. Sie beginnt, wenn die Kachel die halbe Kapsel
  freigibt, und ist voll, wenn auch der Abstand dahinter frei ist. Zurück läuft es genau umgekehrt.
- **Kein Durchwischen (P-108/F-2):** Über die Kapseln hinaus geht die Kachel nur mit Widerstand weiter (höchstens 60 px). Die Kapseln rücken etwas mit und werden
  höchstens 6 % größer. Beim Loslassen federt die Kachel auf ‚offen‘ zurück, ohne Sprechblase. Gelöscht wird nur über die Kapsel ‚Löschen‘, die wie bisher fragt.
- **Ein Abstand 11 pt (P-108/F-3):** gilt für Kachel–Kapsel, zwischen den Kapseln und rechts außen. Offen ist die Kachel bei zwei Aktionen 165 px breit. Die Kapseln bleiben 66 × 44.
- **Texte:** R-7.8, 15.4, 15 (AD-Beans ohne `durchwischen`), 15.21, 16, `PROMPT.md` – Wortlaut P-108/V-1 bis P-108/V-6, wie bestätigt.
- **Prüfungen:**
  - Neu sind APD-30/W-91 bis APD-30/W-94 (Schwelle, Mitte, Abstände, Überwischen, Zurückfedern) und APD-30/W-95 (Eigenschaften der AD-Bean = Parameter der Fabrik).
  - Angepasst sind APD-30/W-1, APD-30/W-67 und APD-30/W-76; APD-30/W-16 bis APD-30/W-19 entfallen.

## Ergebnisse dieser Sitzung (vor dem vollen Lauf)

| Prüfung | Ergebnis |
|---|---|
| Neue Prüfungen gegen 4.60.1 (veröffentlicht) | **rot:** APD-30/W-1, APD-30/W-76, APD-30/W-91, APD-30/W-92, APD-30/W-93, APD-30/W-94 |
| `ablauf-wischen` mit Korrektur, Chromium | grün (alle Ansichten) |
| `ablauf-wischen` mit Korrektur, WebKit | grün (alle Ansichten) |
| Gegenproben APD-30/W-87, W-88, W-89, W-96, W-97, W-98 (iPad, Chromium) | alle rot an der erwarteten Stelle (W-81 bis W-83, W-91 · W-85, W-93 · W-84, W-91 · W-91 · W-1, W-92 · W-93) |
| `doku-regeln` (mit `checkBeans` APD-30/W-95, `checkSchema`) | grün |

**Warum die Prüfung es nicht fand:** `checkWischen` prüfte R-7.8 so, wie die Regel geschrieben war. Die Regel wich aber von Notizen ab: Erscheinen ab dem ersten Pixel,
8 px zwischen den Kapseln, Durchwischen. Die Lücke lag also in der Regel, nicht in der Prüfung.

## Offener Usertest

**P-108** (3.57.1 / 4.60.1): /0, /3 und /4 sind ok, /1 und /2 nicht ok – diese Version korrigiert sie. Danach folgt Usertest **P-109** (Testfälle im CHANGELOG, nach dem
Bau im Bericht vollständig).

## Backlog

Nächste Version: AppDesign 4.60.2 / Reiselogbuch 3.57.2 – 1 Thema bereit (Korrektur P-108). Offen: APD-135 Pakete 1 und 3 · APD-136 · RLB-125 · RLB-126 · RLB-6.
