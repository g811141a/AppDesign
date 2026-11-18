# Bau-Frage – ReiseLogBuch-Import 1.4.0 (APD-135 Paket 2)

**18.11.2026** · Sitzung 0132 · Wortlaut bestätigt (`arbeit/APD-135 Paket 2 Wortlaut.md`) · Testfall-Liste: `arbeit/APD-135 Paket 2 Testfall-Liste.md`

## Was gebaut wird

| Teil | Version | Inhalt |
|---|---|---|
| Import `CLAUDE.md` | 1.1.0 → **1.2.0** | Startfrage als Verweis auf 0 Nr. 19 (W-16), Verweis auf die Zusammenarbeit mit dem Kasten, Repos dazuholen wie AppDesign-`CLAUDE.md`, Prüfen mit `--zone` (W-29) |
| Import `PROMPT.md` | 1.2.1 → **1.4.0** | Felder `km`/`price` (J-13), Fenster nach 2.1 (J-33), Format Stand 3.57.4, Herkunft, Abgleich-Text wie 4.61.0, ohne eigene Versionsgeschichte (J-35) |
| `werkzeug/pruefen.mjs` | – | ohne `--zone` Abbruch (J-34); liest `next.x =`; neue Fälle RLB-5/F-23 (Kilometer), RLB-5/F-24 (Quartierpreis) |
| `werkzeug/beispiel.json` | – | Beispielreise mit `km` 12,5 und `price` 89 |
| Import `README.md` | **1.4.0** | Versionsgeschichte, ‚Geprüft mit‘ 3.57.4 / 4.61.0 |
| AppDesign-`CLAUDE.md` | 2.13.0 → **2.14.0** | W-19: Import-Satz gekürzt; Zeile in `CLAUDE Versionsgeschichte.md` |

**Keine** neue AppDesign- oder Reiselogbuch-Version: die App und die feste Fassung ändern sich nicht (`CLAUDE.md` gehört nicht zur Fassung).

## Prüfung

- Rot gegen heute: Selbsttest mit den neuen Fällen **12 Meldungen** (Q-1 bis Q-9).
- Nach dem Bau: `pruefen.mjs --selbsttest` (Chromium und WebKit) muss grün sein; dazu einmal die drei Prüfungen, die `stufe` nennt (**Stufe Text**:
  doku-regeln, version-regeln, text-regeln) – kein voller App-Prüflauf, weil die App unverändert bleibt.
- Hinweis aus Befund L-24: bei späteren Änderungen an `index.html`-Mustern oder `ui.js`-Klassen einmal `pruefen.mjs --selbsttest`.

## Danach

Hochladen auf `main` (Import und AppDesign), Bericht. Kein Usertest am Gerät (die App ändert sich nicht).
