# P-118/F-2 – ‚Schaltfläche‘ statt ‚Knopf‘: Wortlaut und Umfang

Stand 21.11.2026 · Sitzung 0148 · zur Freigabe nach 0 Nr. 29

## 1. Regel – alt und neu

**Designrichtlinie allgemein, Abschnitt 6 ‚Begriffe‘**

*Alt:* keine Regel zum Begriff.

*Neu (neuer Punkt am Ende von Abschnitt 6):*

> - **Schaltfläche, nie ‚Knopf‘:** Ein antippbares Bedienelement heißt in allen Texten **Schaltfläche**, auch in Zusammensetzungen
>   (Mehr-Schaltfläche, Icon-Schaltfläche, Hauptschaltfläche). Das gilt für die App, für Doku, Regeln, Katalog, Backlog, Testfälle,
>   Kommentare im Code und Prüfmeldungen und für die Antworten von Claude. Ausgenommen sind Geschichte (CHANGELOG, Versionsgeschichten,
>   ‚Erledigt‘ im Backlog, `ZUORDNUNG.md`), die festen Fassungen `fassung/X.Y.Z/`, die Arbeitsdateien in `arbeit/` und Namen im Code
>   (Zusammenarbeit 1). R-10.9.

**Regelkatalog, Abschnitt 17, Thema 10 ‚Texte und Versionen‘**

*Alt:* –

*Neu (neue Zeile):*

> | R-10.9 | **Begriff ‚Schaltfläche‘:** in Texten, Kommentaren und Prüfmeldungen nie ‚Knopf‘ bzw. ‚Knöpfe‘ (auch nicht in Zusammensetzungen), Ausnahmen wie in 6 | doku.mjs – `checkBegriffe` (AppDesign und App: Doku, `v4/`, Katalog, Prüfungen, `index.html`; Namen im Code ausgenommen; Gegenprobe `--gegenprobe begriffe`) | – | 6 |

**Zusammenarbeit allgemein, Abschnitt 1 ‚Sprache und Ton‘**

*Alt:* –

*Neu (neuer Punkt nach ‚Deutsch, kurz und klar.‘):*

> - **Begriffe** wie in Designrichtlinie 6 (R-10.9), auch im Chat.

Das ist nur ein Verweis: Die Regel selbst steht an einer Stelle (0 Nr. 3).

## 2. Was umbenannt wird

Jede Stelle wird von Hand angepasst, nicht mit Suchen und Ersetzen: aus ‚der Knopf‘ wird ‚die Schaltfläche‘, also ändern sich Artikel
und Endungen mit (‚ersten Knopf‘ → ‚erste Schaltfläche‘).

| Repo | Datei | Treffer |
|---|---|---|
| AppDesign | `README - Designrichtlinie allgemein.md` | 63 |
| AppDesign | `v4/ui.js` (Kommentare) | 51 |
| AppDesign | `v4/design.css` (Kommentare) | 22 |
| AppDesign | `katalog/sourcehighlight.js` (u. a. ‚Erster Knopf‘ → ‚Erste Schaltfläche‘, sichtbar im Katalog) | 9 |
| AppDesign | `tests/*.mjs` (Kommentare, Meldungen; u. a. `ablauf.mjs` 159, `pruefseite.mjs` 51, `hig.mjs` 23) | 249 |
| AppDesign | `BACKLOG.md` (offene Abschnitte) | einzelne |
| Reiselogbuch | `index.html` (3 Kommentare), `PROMPT.md` 4, `README - Designrichtlinie Reiselogbuch.md` 3 | 10 |
| Reiselogbuch | `tests/*.mjs` und `tests/README.md` | rund 130 |
| Reiselogbuch | `BACKLOG.md` (offene Abschnitte) | einzelne |

Die Treffer sind gezählt mit `grep -oiE 'kn(o|ö)pf'`. Darin stecken auch Namen im Code, die gezählt, aber nicht geändert werden.

**Bleibt unverändert:**

- Namen im Code, die Regeln oder Changelogs zitieren (Zusammenarbeit 1): `checkMehrKnopf`, `seitenKnopf`, `istKnopf`, `grossKnopfBei`,
  `menueknopf`, `knopfText`, `knopfImKnopf`, CSS-Klasse `bk-knoepfe`. Sie werden englisch, sobald ihr Baustein ohnehin umgebaut wird.
- CHANGELOG, Versionsgeschichten, ‚Erledigt‘, `ZUORDNUNG.md`, `fassung/`, `arbeit/`.

**AD-Bean:** keine, weil sich nur Texte und Kommentare ändern. Die Schnittstelle bleibt gleich, sichtbar ändert sich nur der Text im
Katalog (`sourcehighlight`).

## 3. Testfall-Liste (automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| Z-1 | `checkBegriffe` gegen 4.67.1 | **rot** – nennt Datei und Zeile jedes ‚Knopf‘ |
| Z-2 | nach dem Umbenennen | grün in AppDesign und Reiselogbuch |
| Z-3 | Gegenprobe: ‚Knopf‘ in einem Kommentar von `v4/ui.js`, ‚Knöpfe‘ in der Designrichtlinie, ‚Mehr-Knopf‘ im Katalog | je rot |
| Z-4 | Namen im Code (`checkMehrKnopf`, `bk-knoepfe`) | nicht gemeldet |
| Z-5 | CHANGELOG, `fassung/`, `arbeit/`, ‚Erledigt‘ | nicht geprüft |
| Z-6 | Katalog `sourcehighlight` zeigt ‚Erste Schaltfläche‘, ‚Zweite Schaltfläche‘ | `katalog.mjs` |

**Testfall (User):** im Katalog die AD-Bean ‚sourcehighlight‘ öffnen. Erwartet: ‚Erste Schaltfläche‘ und ‚Zweite Schaltfläche‘, nirgends ‚Knopf‘.

## 4. Einordnung

- **Nächste Version:** P-118/F-1 (Heben jeder Schaltfläche) und P-118/F-2 (Begriff), mit vollem Prüflauf.
- Danach APD-135/B-3.3 als eigene Version.
