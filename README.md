# AppDesign

**Version 4.23.2** · Stand 18.10.2026

Gemeinsames Design für alle iPad-Web-Apps von g811141a – Apple-like nach den
[Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines).
Jede Komponente ist hier einmal beschrieben **und** einmal programmiert; alle Apps übernehmen sie.

| Datei / Ordner | Inhalt |
|---|---|
| `README - Designrichtlinie allgemein.md` | Gestaltungs- und Bedienregeln, Komponenten, HIG-Checkliste, Regelkatalog (Abschnitt 17) |
| `README - Zusammenarbeit allgemein.md` | Regeln für die Zusammenarbeit mit Claude |
| `UEBERGABE.md` | Stand der letzten Sitzung – Claude liest sie zu Beginn jeder Sitzung zuerst |
| `VERLAUF.md` | alle Wünsche und Entscheidungen des Nutzers (seit 04.10.2026) – damit nichts vergessen wird |
| `v4/design.css` | Farben, Schrift und alle Komponenten (Arbeitsstand der Hauptversion 4 = neueste Fassung) |
| `v4/ui.js` | Icons, Menüs, Sprechblasen, Fenster, Darstellung … (Arbeitsstand der Hauptversion 4 = neueste Fassung) |
| `fassung/X.Y.Z/` | feste, unveränderliche Fassung je Version seit 4.14.0: `design.css`, `ui.js`, `tests/`, seit 4.14.1 auch Designrichtlinie und Zusammenarbeit dieser Version; Prüfsummen in `fassung/PRUEFSUMMEN` |
| `werkzeug/veroeffentlichen.mjs` | Veröffentlichungs-Skript: `vorbereiten` (Versionen erhöhen, Fassung anlegen), `los` (prüfen, erst AppDesign, dann die App, Pages abwarten) |
| `apple-referenz/` | Vergleichsbilder aus Apple-Apps (private Inhalte verpixelt) |
| `tests/` | Prüfungen des Regelkatalogs (`hig.mjs`, `ablauf.mjs` u. a.), werden von den Prüfskripten jeder App eingebunden |
| `vorlage/index.html` | Startpunkt für eine neue App |
| `CHANGELOG.md` · `BACKLOG.md` | Versionsgeschichte · offene allgemeine Themen |

## Einbinden in eine App

```html
<head>
  …
  <link rel="stylesheet" href="../AppDesign/fassung/4.14.0/design.css">
  <style>/* nur, was zur App gehört */</style>
</head>
<body>
  …
  <dialog id="dlg"></dialog>
  <dialog id="msg"></dialog>
  <script src="../AppDesign/fassung/4.14.0/ui.js"></script>
  <script>/* Skript der App */</script>
</body>
```

- Die Pfade gelten für GitHub Pages (`g811141a.github.io/<App>/` → `g811141a.github.io/AppDesign/`).
- **Feste Fassung (seit 4.14.0, R-10.3):** Jede App lädt genau ihre Fassung `fassung/X.Y.Z/` (ohne `?v=`, der Pfad
  enthält die Version); `AD_NEEDED` in der App = X.Y.Z. Ihre Prüfskripte binden die Prüfungen derselben Fassung ein
  (`../../AppDesign/fassung/X.Y.Z/tests/…`).
- Der Service Worker der App nimmt `design.css` und `ui.js` ihrer Fassung in seinen Cache auf, damit die App offline
  funktioniert.
- **Schnittstelle:** Die App stellt bereit: `db.settings.appearance` (`auto` | `light` | `dark`),
  `save()`, `render()`; optional `onDialogOpen()`.

## Versionen

- Version des Repos = Version der Designrichtlinie allgemein.
- Jede Version liegt zusätzlich unveränderlich in `fassung/X.Y.Z/` – Bausteine, Prüfungen und (seit 4.14.1) der Text
  von Designrichtlinie und Zusammenarbeit dieser Version; die README der App verlinkt ihn. Eine neue AppDesign-Version ändert eine App **nicht**; eine App wird nur nach Rückfrage auf eine
  neuere Fassung gehoben (Zusammenarbeit 0 Nr. 10).
- `v4/` ist der Arbeitsstand und zeigt die neueste 4er-Fassung (für schon installierte ältere App-Stände).
- Eine Hauptversion bekommt einen neuen Ordner (`v5/`).
- Veröffentlichen mit `node werkzeug/veroeffentlichen.mjs vorbereiten --ad X.Y.Z --app <app>=X.Y.Z`, Texte schreiben,
  committen, dann `… los` – **erst AppDesign, dann die App** (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`).

## Apps

| App | Repo | nutzt |
|---|---|---|
| Reiselogbuch | [g811141a/ReiseLogBuch](https://github.com/g811141a/ReiseLogBuch) | feste Fassung (ab Reiselogbuch 3.13.0; v4 ab 3.0.0) – welche, steht in der README der App |
