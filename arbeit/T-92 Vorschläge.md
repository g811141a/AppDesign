# T-92 – Suche über alle Reiselogbücher: Vorschläge

Stand 17.10.2026 · Sitzung Reiselogbuch 0009 · Reiselogbuch-Backlog T-92 (Prio 2, offen)

**Heute:** Suche nur **im** geöffneten Reiselogbuch (R-2.3, Komponente 15.2): Lupe in der Kapsel → Suchzeile unter der
Leiste, Markierung gelb, ‚3 von 57‘, Pfeile ‹ › ohne Umlauf, nur Tage mit Treffern sichtbar. Der Suchbaustein
(`matchesSearch`) durchsucht Verlauf, ‚Wie war was?‘, Essen, Quartier und Ort.

**Apple-Vorbild:** Notizen – das Suchfeld über der **Liste** durchsucht alle Notizen; die Liste zeigt nur noch Notizen mit
Treffer. Öffnet man eine, ist der Suchbegriff markiert. Die Suche **in** einer Notiz (‚In Notiz suchen‘) bleibt getrennt.
Mail und Dateien kennen zusätzlich eine Bereichsauswahl (‚Dieses Postfach | Alle‘).

## A – Trefferliste (wie Spotlight)

Suchfeld oben in der Startliste/Seitenleiste. Statt der Kacheln erscheint eine Liste der **Treffer**, nach Reiselogbuch
gruppiert: je Zeile Datum und ein kurzer Ausschnitt mit markiertem Begriff. Antippen öffnet das Reiselogbuch genau bei
diesem Tag.
- \+ man sieht sofort *wo* etwas vorkommt, ohne zu öffnen
- − neue Darstellung (Ausschnitte, Gruppen), mehr Bau und Prüfung; zwei verschiedene Suchen nebeneinander

## B – Eine Suche mit Bereich (‚Dieses Reiselogbuch | Alle‘)

Die bestehende Suchzeile bekommt eine kleine Auswahl-Kapsel. ‚Alle‘ zeigt die Tage aller Reiselogbücher untereinander,
mit Zwischenüberschrift je Reiselogbuch; ‚3 von 57‘ und die Pfeile laufen über alle.
- \+ wirklich **eine** Suche
- − die Tabelle müsste mehrere Reiselogbücher (mit verschiedenen Spalten) gleichzeitig zeigen – weicht vom Aufbau ab,
  am iPhone unübersichtlich

## C – Liste filtern, dann im Reiselogbuch weitersuchen (Empfehlung, wie Notizen)

Suchfeld oben in der Startliste/Seitenleiste (gleiches Aussehen wie 15.2). Beim Tippen bleiben nur die Reiselogbücher mit
Treffer stehen; jede Kachel zeigt statt ‚geändert am …‘ die **Anzahl** (‚12 Treffer‘). Antippen öffnet das Reiselogbuch
**mit bereits gefüllter Suche**: erster Treffer markiert, ‚1 von 12‘, Pfeile wie gewohnt. Das Suchfeld der Liste behält den
Begriff, bis man ihn löscht (x) – zurück in der Liste stehen die gefilterten Kacheln noch da.
- \+ **beide Suchen kombiniert**: ein Suchbaustein, eine Bedienung; drinnen funktioniert alles wie bisher
- \+ wenig Neues zu lernen und zu bauen; passt zu R-1.1 (Startliste = Seitenleiste, ein Baustein)
- − ein Treffer-Ausschnitt fehlt (könnte später als A-Zusatz kommen: unter der Anzahl der erste Ausschnitt)

**Allgemeine Regel?** Ja, empfohlen: ‚Suchfeld in der zentralen Liste filtert die Einträge, zeigt die Trefferzahl und
übergibt den Begriff an die Suche im Eintrag‘ – als Erweiterung von 15.2/15.4 und R-2.3 in AppDesign, damit jede App mit
Liste es gleich macht.

**Offene Einzelheiten (nach der Wahl):** Wo sitzt das Feld – unter dem Titel ‚Reiselogbücher‘ (wie Notizen) oder hinter einer
Lupe in der Kopfzeile? Wird die Trefferzahl je Tag oder je Fundstelle gezählt (heute im Reiselogbuch: je Fundstelle)?
