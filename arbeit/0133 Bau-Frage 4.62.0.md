# Bau-Frage – AppDesign 4.62.0 / Reiselogbuch 3.57.5

**Stand 18.11.2026** · Sitzung Reiselogbuch 0133 · APD-135 Paket 4 – Doppeltext der Designrichtlinie

## Was gebaut wird

- **AppDesign 4.62.0** – Designrichtlinie allgemein 4.62.0: Grundsatz ‚Aufbau‘ (APD-135/W-49) und 21 gekürzte Absätze der Paare APD-135/D-27 bis D-39
  (2, 3, 4, 7, 8, 10, 15.3, 15.4, 15.8, 15.10, 15.11, 15.17, 16). Katalog (17) und sein Kopf bleiben. Neue Fassung `fassung/4.62.0/`.
- **Reiselogbuch 3.57.5** – App unverändert; Designrichtlinie Reiselogbuch Abweichungen 1–3 und 21 Stellen im `PROMPT.md` (APD-135/W-50).
- Zusammenarbeit 3.15.0 und alle `CLAUDE.md` bleiben.
- Wortlaut: genau der bestätigte aus `arbeit/APD-135 Paket 4 Wortlaut.md`, per Skript eingesetzt (nichts abgeschrieben).
- Texte geschrieben: beide CHANGELOGs (Testfälle P-112), beide Backlogs, Versionsgeschichte der Designrichtlinie allgemein und der Designrichtlinie Reiselogbuch.
- Unterschied: Designrichtlinie allgemein −109/+66 Zeilen, `PROMPT.md` −52/+34, Designrichtlinie Reiselogbuch −5/+5 (dazu je eine Zeile Versionsgeschichte).

## Prüfungen bis jetzt (Testfall-Liste `arbeit/APD-135 Paket 4 Testfall-Liste.md`)

| Nr. | Prüfung | vorher | nachher |
|---|---|---|---|
| APD-135/V-1, V-2 | `APD-135 Paket 4 pruefen.mjs`: alter Text weg, neuer genau einmal | **rot** (46 alt, 0 neu) | **grün** (0 alt, 46 neu) |
| APD-135/V-3, V-4 | Wert bleibt, Nummer stimmt | – | grün; Gegenproben (Wert `.fclear`, Nummer R-7.2) rot |
| APD-135/V-5 bis V-7 | `doku-regeln` (Katalog, Sätze, Schema) | rot (5 Meldungen in der Übergabe, behoben) | **grün**; `--gegenprobe schema` 20 von 20 rot |
| APD-135/V-8 | `version-regeln` (Fassung) | – | **grün** |
| APD-135/V-9 | App unverändert | – | im Prüflauf |

## Prüfstufe

`veroeffentlichen.mjs stufe`: **voll** – AppDesign geändert (Version vorbereitet), `AD_NEEDED`/Fassungs-Pfad in `index.html`, `sw.js`. Der letzte volle Lauf
dauerte 82:23 (0131).

## Usertest P-112

**P-112/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.57.5 · erstellt am … · AppDesign 4.62.0‘.

## Backlog

Nächste Version: 0 Punkte bereit · Offen im Backlog: APD-135 Pakete 5–7, APD-136 (Prio 1), RLB-125 (Prio 2), RLB-126, RLB-6, APD-70 (Prio 3).
