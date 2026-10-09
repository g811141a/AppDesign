# AppDesign

**Version 4.0.0** · Stand 09.10.2026

Gemeinsames Design für alle iPad-Web-Apps von g811141a – Apple-like nach den
[Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines).
Jede Komponente ist hier einmal beschrieben **und** einmal programmiert; alle Apps übernehmen sie.

| Datei / Ordner | Inhalt |
|---|---|
| `README - Designrichtlinie allgemein.md` | Gestaltungs- und Bedienregeln, Komponenten, HIG-Checkliste |
| `README - Zusammenarbeit allgemein.md` | Regeln für die Zusammenarbeit mit Claude |
| `v4/design.css` | Farben, Schrift und alle Komponenten (Hauptversion 4) |
| `v4/ui.js` | Icons, Menüs, Sprechblasen, Fenster, Darstellung … (Hauptversion 4) |
| `apple-referenz/` | Vergleichsbilder aus Apple-Apps (private Inhalte verpixelt) |
| `tests/hig.mjs` | HIG-Prüfung, wird vom Prüfskript jeder App eingebunden |
| `vorlage/index.html` | Startpunkt für eine neue App |
| `CHANGELOG.md` · `BACKLOG.md` | Versionsgeschichte · offene allgemeine Themen |

## Einbinden in eine App

```html
<head>
  …
  <link rel="stylesheet" href="../AppDesign/v4/design.css">
  <style>/* nur, was zur App gehört */</style>
</head>
<body>
  …
  <dialog id="dlg"></dialog>
  <dialog id="msg"></dialog>
  <script src="../AppDesign/v4/ui.js"></script>
  <script>/* Skript der App */</script>
</body>
```

- Die Pfade gelten für GitHub Pages (`g811141a.github.io/<App>/` → `g811141a.github.io/AppDesign/`).
- Der Service Worker der App nimmt `../AppDesign/v4/design.css` und `../AppDesign/v4/ui.js` in seinen
  Cache auf, damit die App offline funktioniert.
- **Schnittstelle:** Die App stellt bereit: `db.settings.appearance` (`auto` | `light` | `dark`),
  `save()`, `render()`; optional `onDialogOpen()`.

## Versionen

- Version des Repos = Version der Designrichtlinie allgemein.
- 4.x.y ändert `v4/` rückwärtsverträglich – gilt sofort für alle Apps.
- Eine Hauptversion bekommt einen neuen Ordner (`v5/`); jede App wird bewusst umgestellt.
- Reihenfolge beim Veröffentlichen: **erst AppDesign, dann die App.**

## Apps

| App | Repo | nutzt |
|---|---|---|
| Reiselogbuch | [g811141a/ReiseLogBuch](https://github.com/g811141a/ReiseLogBuch) | v4 (ab Reiselogbuch 3.0.0) |
