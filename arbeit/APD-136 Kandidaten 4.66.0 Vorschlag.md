# APD-136 – Kandidaten für AppDesign 4.66.0

**Stand 19.11.2026** · Sitzung 0142 · Vorschlag, noch nichts gebaut · Nummern V-n gelten nur in dieser Datei (außerhalb: APD-136/V-1 …)

Herkunft: Backlog APD-136 ‚Kandidaten (Sitzung 0138)‘, `arbeit/0139 Bericht B-3.1.md` (Zeilen 30, 32), `arbeit/0137 Vorschlag AD-Bean hinweis und
Absicherung.md` (Abschnitt 2). Code gelesen in `v4/ui.js` und `v4/design.css` (Stand 4.64.0).

## Die vier Kandidaten

| | Kandidat | Befund im Code | Vorschlag |
|---|---|---|---|
| b1 | **CSS von `#msg` unter `.ad-hinweis`** | `createHinweis` setzt nur `data-ad-bean="hinweis"` (ui.js 1832). Das CSS des Hinweisfensters hängt an `#msg`, `.msg-text`, `.msg-btns`, `.wide` (design.css 581–593, 792–793). R-1.13 verlangt CSS nur unter `.ad-<kennung>…`. Deshalb kann `checkBeans` das CSS dieser Bean heute nicht prüfen. | `createHinweis` setzt die Klasse `ad-hinweis` an das Fenster. Das CSS zieht um nach `.ad-hinweis`, `.ad-hinweis-text`, `.ad-hinweis-knoepfe` und `.ad-hinweis-breit`. Die App nennt keine dieser Klassen (heute 0 Treffer für `msg-text`/`msg-btns` in `index.html`). **Aussehen unverändert.** |
| b2 | **`subAt` mit Standardwert** | `createSync({ list, sub, subAt, … })` hat für `subAt` keinen Standardwert (ui.js 1571). Ohne `subAt` landen die Zeitpunkte unter dem Schlüssel ‚undefined‘, und der Abgleichbericht zeigt sie als Feld (R-9.4 rot, Bericht B-3.1). | Standardwert `` subAt = `${sub}At` ``. Die Vorlage (`sub: 'sub'`) braucht die Angabe dann nicht mehr. Das Reiselogbuch gibt weiter `dayAt` an und ändert sich nicht. |
| b3 | **`ic('unbekannt')`** | `ic` setzt `ICONS[name]` ungeprüft ein (ui.js 87). Ein unbekannter Name ergibt ein unsichtbares `svg` mit dem Text ‚undefined‘ (Bericht B-3.1). | Ein unbekannter Name gibt einen Konsolenfehler ‚ic: unbekanntes Symbol …‘ und kein `svg`. Dazu prüft `checkWerte` (Icons) fest, dass jeder Name in `ic('…')` in `ui.js`, in der Vorlage und in der App in `ICONS` steht. |
| b4 | **`FX_SVG` (ⓧ)** | 0137 entschieden: bewusst ohne Bean, weil `FX_SVG` nur das Zeichen ⓧ ist, kein Element mit Verhalten. | **Nicht in 4.66.0.** Das ⓧ gehört zum Feld und kommt mit der geplanten Grund-Bean `field` (R-1.13: Feldarten bauen auf `field` auf). |

## Testfall-Liste (V-n)

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| V-1 | b1: Hinweisfenster (kurz, langer Dateiname, breit, mit Schaltfläche), iPad und iPhone, hell und dunkel | gleiche Maße wie in 4.64.0, `checkHinweisBreite` grün | bestehende Prüfungen, dazu Maße vorher/nachher |
| V-2 | b1: `checkBeans` | CSS der Bean `hinweis` nur unter `.ad-hinweis…`. Eine Regel `#msg .msg-text` in `design.css` → rot. | `checkBeans` (Gegenprobe) |
| V-3 | b2: `createSync` ohne `subAt` auf der Mindestseite | Zeitpunkte unter `subAt` (bei `sub: 'sub'`), R-9.4 grün. Gegenprobe ohne Standardwert → rot. | `checkWerte` (Abgleich) |
| V-4 | b3: `ic('gibtsnicht')` | Rückgabe ohne `svg`, Konsolenfehler mit dem Namen | `checkWerte` (Icons) |
| V-5 | b3: alle `ic('…')` in `ui.js`, Vorlage und App | jeder Name steht in `ICONS`. Eine Kopie mit `ic('gibtsnicht')` → rot. | `checkWerte` (Icons), Gegenprobe |

## Für die spätere Bau-Frage (4.66.0)

- Ein Thema (APD-136), 3 Punkte (b1–b3). Das passt zu 0 Nr. 8.
- AD-Bean: `hinweis` (CSS unter `.ad-hinweis`, Schnittstelle unverändert); b2 und b3: keine, weil `createSync` und `ic` keine Beans sind.
- Prüflauf voll. Keine neue Regel: b1 setzt R-1.13 um, b3 ist eine Prüfung ohne neuen Regeltext.
- Reihenfolge: erst 4.65.0 (APD-140, B-3.3) und dessen Usertest (0 Nr. 22), dann 4.66.0.
