// Bean-Katalog (AppDesign katalog/, APD-140, seit 4.65.0) – AD-Bean `commands` (Befehle, seit 5.0.0, APD-149; bis dahin Muster als Entwurf
// katalog/entwurf/presentation-commands.js). Kennung, Bereich, Anlegen, Schnittstelle (properties, readOnly, methods, events) und Regeln wie in der
// Liste der AD-Beans (Designrichtlinie 15); checkBeans (R-1.13, tests/doku.mjs) vergleicht beides. Wer die Bean ändert, zieht diese Datei in derselben
// AppDesign-Version nach. demo(el, log) ist dieselbe Vorführung wie bei der Bean presentation (presentationDemo in katalog/presentation.js, davor geladen).
'use strict';
catalogBean({
  id: 'commands', name: 'Befehle', area: 'Aktionen und Menüs', icon: 'chevrons-up-down', since: '5.0.0', section: '15.3, 15.6',
  abstract: 'Die App beschreibt Befehle – was es gibt und wann es möglich ist –, nicht die Schaltflächen. Derselbe Befehl erscheint je Ort anders: im Menü gedimmt, im Kontextmenü und beim Wischen fehlt er, zerstörend steht er rot zuletzt.',
  create: 'AD.createCommands({ presentation, context })',
  properties: [['presentation', 'AD.presentation', 'Der Stapel, über den die Menüs der Kopfzeile erscheinen.'], ['context', '{}', 'Zustand der App, den validate und execute bekommen (z. B. { selection }).']],
  readOnly: [['ids', 'Die Kennungen aller Befehle.']],
  methods: [['add(command)', '{ id, label, shortTitle, icon, role, validate(ctx) → { enabled, hidden, state, label }, execute(ctx) }.'], ['menu(id, children, { label, icon })', 'Menü aus Befehlen; Gruppen durch Abstand getrennt, { title, children, singleSelection } ist ein Untermenü.'],
    ['execute(id, ctx)', 'Führt den Befehl aus, wenn er möglich ist.'], ['validate(id, ctx)', 'Fragt { enabled, hidden, state, label }.'], ['revalidate(id)', 'Fragt neu und zeichnet Kopfzeilen und offene Menüs neu.'],
    ['items(id, { place, ctx })', 'Einträge eines Menüs für menu, context oder swipe (Darstellung je Ort, H-7).'], ['toolbar(element, ids, { label })', 'Kopfzeile aus Befehlen und Menüs; bei offenem Menü wirkt jede andere Schaltfläche beim ersten Tipp (Durchlass, R-1.4).']],
  events: [['change', 'Nach revalidate – { id }.'], ['execute', 'Ein Befehl läuft – { id }.']],
  rules: [['R-3.8', 'Gesperrt und Abbrechen'], ['R-4.1', 'Menüs'], ['R-4.10', 'Menütexte'], ['R-4.12', 'Erst fragen, dann zerstören'], ['R-7.8', 'Wischaktionen der Kacheln'], ['R-1.13', 'AD-Beans']],
  history: [['5.0.0', 'Neu als AD-Bean in ui.js (APD-149): Befehle mit validate und execute, Menüs mit Untermenü (eine Ebene), Darstellung je Ort (H-7), Kopfzeile mit Durchlass (J-3). Vorher Muster im Bean-Katalog als Entwurf (Sitzungen AppDesign 0002 bis 0006).']],
  howTo: 'Dieselbe Vorführung wie beim Stapel: ‚Mehr‘ mit Untermenü ‚Ansicht‘, ‚Ausgabe‘, ‚+‘ · Schalter ‚Eintrag ausgewählt‘ aus: ‚Eintrag löschen‘ im Menü gedimmt, ‚Endgültig löschen‘ im Kontextmenü und beim Wischen weg · gesperrte Kachel: nur ‚Wiederherstellen‘.',
  demo: (el, log) => presentationDemo(el, log),
});
