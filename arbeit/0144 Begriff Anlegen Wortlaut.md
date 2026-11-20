# Begriff ‚Fabrik‘ → ‚Anlegen‘ – Wortlaut alt/neu (APD-136, 0 Nr. 29)

Gemeint ist die Funktion `create<Kennung>(…)`, mit der die App eine AD-Bean anlegt (z. B. `createHinweis(fenster, …)`). Entscheidung a) ‚Anlegen‘
(Nutzer 20.11.2026, Sitzung 0143). Gesucht in allen drei Repos (ohne Versionsgeschichten, CHANGELOG, Backlog, `arbeit/` und feste Fassungen – die
bleiben als Geschichte unverändert): ‚Fabrik‘ steht an 5 Stellen, 2 davon sind Regeln.

## 1. Regelkatalog R-1.13 (Designrichtlinie 17) – Regel

**Alt:**
> ein allgemeines Element, das neu entsteht oder umgebaut wird, ist eine **AD-Bean** in `ui.js` – eine Fabrik `create<Kennung>(…)` mit Eigenschaften
> und Standardwerten, Methoden und Ereignissen (`on(…)`), eigenem Zustand und eigenem CSS nur unter `.ad-<kennung>…`; die Liste der AD-Beans (15) nennt
> je Bean Kennung, Bereich, Fabrik, Schnittstelle, Regeln und Abschnitt. Jede Bean der Liste hat im Bean-Katalog (14) eine Datei `katalog/<kennung>.js`
> mit derselben Kennung, demselben Bereich, derselben Fabrik, Schnittstelle (…)

**Neu:**
> ein allgemeines Element, das neu entsteht oder umgebaut wird, ist eine **AD-Bean** in `ui.js` – die App legt sie mit `create<Kennung>(…)` an
> (**Anlegen**), mit Eigenschaften und Standardwerten, Methoden und Ereignissen (`on(…)`), eigenem Zustand und eigenem CSS nur unter `.ad-<kennung>…`;
> die Liste der AD-Beans (15) nennt je Bean Kennung, Bereich, Anlegen, Schnittstelle, Regeln und Abschnitt. Jede Bean der Liste hat im Bean-Katalog (14)
> eine Datei `katalog/<kennung>.js` mit derselben Kennung, demselben Bereich, demselben Anlegen, Schnittstelle (…)

Der Rest der Regel bleibt wörtlich.

## 2. Designrichtlinie 14 ‚Schnittstelle von ui.js‘ – Regeltext

**Alt:** … von einer AD-Bean nur Fabrik, Eigenschaften, Methoden und Ereignisse (R-1.13, Liste in 15).

**Neu:** … von einer AD-Bean nur Anlegen, Eigenschaften, Methoden und Ereignisse (R-1.13, Liste in 15).

## 3. Liste der AD-Beans (Designrichtlinie 15) – Spaltenkopf

**Alt:** `| Kennung | Bereich | Fabrik | Eigenschaften (Standard) | …`

**Neu:** `| Kennung | Bereich | Anlegen | Eigenschaften (Standard) | …`

Die Zeilen (`createSwipeactions(liste, …)`, `createHinweis(fenster, …)`) bleiben; `checkBeans` liest die Spalte nach ihrer Stelle, nicht nach dem Kopf.

## 4. Bean-Katalog (`katalog/`) – sichtbarer Text und Feld

- Seite einer Bean, Abschnitt ‚Schnittstelle‘, graue Zeile unter `create…`:
  - **Alt:** ‚Anlegen (Fabrik) – die App nutzt nur Fabrik, Eigenschaften, Methoden und Ereignisse (R-1.13)‘
  - **Neu:** ‚Anlegen – die App nutzt nur Anlegen, Eigenschaften, Methoden und Ereignisse (R-1.13)‘
- Feld in `katalog/swipeactions.js` und `katalog/hinweis.js`: `fabrik:` → `anlegen:` (dazu `b.fabrik` → `b.anlegen` in `katalog/index.html` und
  `tests/doku.mjs`); Kommentar oben ‚Kennung, Bereich, Fabrik, Schnittstelle …‘ → ‚Kennung, Bereich, Anlegen, Schnittstelle …‘.

## 5. Meldungen von `checkBeans` (`tests/doku.mjs`)

| Alt | Neu |
|---|---|
| `W-72 <kennung>: Fabrik in der Liste ‚…‘ statt create…(…)` | `W-72 <kennung>: Anlegen in der Liste ‚…‘ statt create…(…)` |
| `<kennung>: Fabrik im Katalog ‚…‘ – in der Liste ‚…‘` | `<kennung>: Anlegen im Katalog ‚…‘ – in der Liste ‚…‘` |

Dazu die Kommentare (W-72, W-73, Z-5) und die Namen `fabrik`/`fabriken` im Code von `checkBeans` → `anlegen`/`anlegenListe` – reine Umbenennung, keine
geänderte Prüfung.

## Was nicht geändert wird

- Versionsgeschichten, CHANGELOG, Backlog-Einträge, `arbeit/` und die festen Fassungen `fassung/X.Y.Z/` (Geschichte; R-10.3).
- Keine neue Prüfung: das Verhalten von `checkBeans` bleibt gleich (Vermutung zur Prüfstufe: wegen `tests/doku.mjs` und `katalog/` nicht ‚Text‘,
  sondern voll – das Skript schlägt die Stufe vor).

## Weiter nach der Freigabe

In ‚0. Nächste Version‘ von AppDesign eintragen (bereit seit 20.11.2026). Gebaut wird nach 0 Nr. 8 mit einem weiteren Punkt bzw. nach eigener Bau-Frage.
