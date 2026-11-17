# APD-136 AD-Beans – Wortlaut der allgemeinen Regel, alt und neu (0 Nr. 29)

**Stand 17.11.2026** · Sitzung Reiselogbuch 0125 · **Wortlaut APD-136/V-1 bis V-4 bestätigt (Nutzer 17.11.2026)** · Grundlage: Entscheidungen in `arbeit/0123 Kapselung Klärung.md` (AD-Bean, Fabrik-Funktion, Kennung nach
Aufgabe, Bereiche als Gruppe, Feldarten auf `field`) und `arbeit/0125 APD-136 Schnittstelle swipeactions.md` (Schnittstelle, Maße fest). Gilt ab dem Bau
mit AppDesign 4.60.0 (zusammen mit APD-30). Die Regel steht an **einer** Stelle (Katalog R-1.13, 0 Nr. 3); 14 und 15 verweisen darauf.

## APD-136/V-1 · Katalog 17, Thema 1 – neue Regel R-1.13 (nach R-1.12)

**Alt:** – (keine Regel)

**Neu:**

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-1.13 | **AD-Beans – allgemeine Elemente gekapselt:** ein allgemeines Element, das neu entsteht oder umgebaut wird, ist eine **AD-Bean** in `ui.js` – eine Fabrik `create<Kennung>(…)` mit Eigenschaften und Standardwerten, Methoden und Ereignissen (`on(…)`), eigenem Zustand und eigenem CSS nur unter `.ad-<kennung>…`; die Liste der AD-Beans (15) nennt je Bean Kennung, Bereich, Fabrik, Schnittstelle, Regeln und Abschnitt. Die **Kennung** ist sprechend nach der Aufgabe (nie nach Geste oder Technik, keine Nummer), fest und nie wiederverwendet: gleiche Aufgabe in anderer Ausprägung = Eigenschaft, andere Aufgabe = eigene Bean, Ablösung mit ‚ersetzt …‘. Feldarten bauen auf der Grund-Bean `field` auf; ihre Gültigkeitsregeln, Meldungen und Prüfbeispiele stehen in der Bean. Maße und Schwellen der Bedienung sind fest in der Bean (nur lesbar). Die App nutzt nur die Schnittstelle – kein CSS und keine inneren Namen einer Bean | doku.mjs – `checkBeans` (Liste ↔ `ui.js` und `design.css`, Kennung einmal, CSS nur unter dem Präfix, Namen in der App) | – | 14, 15 |

## APD-136/V-2 · Designrichtlinie 15 ‚Komponenten‘ – Einleitung und Liste der AD-Beans

**Alt:**

> Jede Komponente ist hier einmal beschrieben (Zweck · Aufbau · Maße · Aussehen · Zustände · Verhalten · technischer Name ·
> Regel). In AppDesign ist jede Komponente einmal programmiert (`v4/design.css`, `v4/ui.js`) und wird von allen Apps übernommen.

**Neu:**

> Jede Komponente ist hier einmal beschrieben (Zweck · Aufbau · Maße · Aussehen · Zustände · Verhalten · technischer Name ·
> Regel). In AppDesign ist jede Komponente einmal programmiert (`v4/design.css`, `v4/ui.js`) und wird von allen Apps übernommen.
> Komponenten, die als in sich geschlossener Baustein gebaut sind – analog einer Java Bean –, heißen **AD-Beans** (R-1.13); die
> folgende Liste ist ihre einzige Aufzählung, `checkBeans` liest sie. Bereiche: Aktionen und Menüs · Navigation und Suche · Fenster
> und Meldungen · Eingabe · Inhalt · Dienste (ohne eigene Oberfläche).
>
> **Liste der AD-Beans**
>
> | Kennung | Bereich | Fabrik | Eigenschaften (Standard) | Nur lesen | Methoden | Ereignisse | Regeln | Abschnitt |
> |---|---|---|---|---|---|---|---|---|
> | `swipeactions` | Aktionen und Menüs | `createSwipeactions(liste, …)` | `kacheln` (Pflicht) · `aktionen` (Pflicht, dieselbe Funktion wie für das Kontextmenü; Einträge wie bei `openMenu` mit `kurz`) · `durchwischen` (`true`) | `offen` · `masse` | `schliessen()` · `entfernen()` | `offen` · `zu` | R-7.8, R-4.12, R-4.13, R-1.4, R-1.8 | 15.4 |

## APD-136/V-3 · Designrichtlinie 14 ‚Schnittstelle von ui.js‘ – Satz am Ende

**Alt:**

> **Schnittstelle von ui.js:** Die App stellt bereit: `<dialog id="dlg">`, `<dialog id="msg">`, `db.settings.appearance`
> (`auto` | `light` | `dark`), `save()`, `render()`; optional `onDialogOpen()` (wird bei jedem `openDialog` aufgerufen).

**Neu:**

> **Schnittstelle von ui.js:** Die App stellt bereit: `<dialog id="dlg">`, `<dialog id="msg">`, `db.settings.appearance`
> (`auto` | `light` | `dark`), `save()`, `render()`; optional `onDialogOpen()` (wird bei jedem `openDialog` aufgerufen). Von einer
> AD-Bean nutzt die App nur Fabrik, Eigenschaften, Methoden und Ereignisse (R-1.13, Liste in 15).

## APD-136/V-4 · 15.4 ‚Wischaktionen‘ – letzter technischer Satz (bestätigter, noch nicht gebauter Wortlaut APD-30/V-3)

**Alt (APD-30/V-3, bestätigt 15.11.2026):**

> Technisch: gemeinsamer Baustein in `ui.js`, die App übergibt dieselbe Aktionsliste wie dem Kontextmenü.

**Neu:**

> Technisch: AD-Bean `swipeactions` (R-1.13, Liste in 15), die App übergibt dieselbe Aktionsliste wie dem Kontextmenü.

## Folgen beim Bau (kein Regeltext)

- `checkBeans` neu in `tests/doku.mjs` (Testfälle APD-30/W-72 bis W-80); `checkCatalog` findet die Prüfung zu R-1.13.
- Versionsgeschichte der Designrichtlinie; Backlog APD-136 (Teil ‚Regel‘ gebaut), APD-56 bleibt in APD-136 aufgegangen.
- Bestehende Elemente werden **nicht** mit 4.60.0 umgebaut – das kommt mit APD-135 Paket 6 und 7 (APD-135/B-5).
