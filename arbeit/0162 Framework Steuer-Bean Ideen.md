# Framework mit Steuer-Bean – erste Ideen (Sitzung 0162)

**26.11.2026** · Anstoß des Nutzers: Die Fehler bei Navigation und Schaltflächen kommen immer wieder. Eine übergeordnete AD-Bean soll steuern, die Beans sollen
wie ein Dienst (SaaS) arbeiten, und die App soll sich nur noch der Beans bedienen. Ziel ist ein tragfähiges Gesamtframework für schnelle App-Entwicklung, vorerst
**ohne Eingriff** in die bestehenden Apps. Das sind nur meine ersten Gedanken, noch ohne Recherche; Quellen kommen erst in der eigenen Sitzung (0 Nr. 27).

## 1. Befund aus den letzten Runden (P-121 bis P-124, belegt in dieser Sitzung)

Den Zustand einer Schaltfläche (getönt, gehalten, Fokus, offenes Fenster darüber) setzen heute **viele Stellen von Hand**:

- In der App: `outputSource`, `sourceItem = …` an 10 Stellen, `hold`/`release` bei Backup und Import.
- In `ui.js`: der Close-Handler von `dlg`, der Close-Handler von `msg`, das Menü, das Untermenü, die Sprechblase und die Wischaktionen.

Jeder neue Weg (z. B. Ergebnis im Hinweisfenster statt im Fenster) kann so eine Freigabe vergessen. Die Fehler P-122/F-1, P-124/F-2 und der Neuaufbau bei offenem Menü
haben genau diese Ursache. Die AD-Beans kapseln einzelne Bausteine. **Das Zusammenspiel** (wer zeigt was über wem, und wer räumt danach auf) regelt aber niemand
zentral.

## 2. Idee: eine Steuer-Bean für alles, was erscheint und wieder geht

Arbeitsname nach Vorbild (Zusammenarbeit 1): **`presentation`** (Apple: *present* / *dismiss*, `UIPresentationController`, `sourceItem`).

- **Ein Stapel** für Fenster, Blatt, Hinweisfenster, Menü, Untermenü, Sprechblase und laufende Aktion (Teilen, Dateiauswahl, Drucken).
- Die App ruft nur noch `present(art, inhalt, { sourceItem })` auf und bekommt einen Griff mit `dismiss()` und `on('dismiss')`.
- Die Steuer-Bean erledigt **selbst und immer gleich**:
  - Tönung der Quelle, solange etwas aus ihr offen ist.
  - Freigabe beim Schließen, auch nach einem Neuaufbau. Das hat die App heute von Hand gemacht.
  - Fokus zurück, Escape, Sperren der Seite dahinter.
  - Lage und Größe über **eine** `layout()` für alle Arten, neu bei Drehen, Textgröße und Tastatur.
- Regeln wie ‚nur ein Hinweisfenster über einem Fenster‘ oder ‚Menü schließt, bevor ein Fenster aufgeht‘ stehen an **einer** Stelle und werden dort geprüft.

## 3. Idee: Befehle statt Schaltflächen-Code

- Die App beschreibt **Befehle**: Kennung, Text, Icon, ob er möglich ist und was er tut (Vorbild Apple `UIAction`/`UICommand`, `UIMenu`).
- Kopfzeile, Menüs, Kontextmenü und Wischaktionen baut das Framework daraus. Dieselbe Aktion sieht so überall gleich aus und verhält sich gleich.
- Der Zustand einer Schaltfläche **folgt aus dem Zustand** der App und des Stapels, statt dass jemand ihn von Hand setzt. Neu aufbauen ist dann ungefährlich.

## 4. Idee: Beans wie ein Dienst

- Jede Bean hat einen **Vertrag** (Schnittstelle, Ereignisse, garantiertes Verhalten), eine eigene Prüfung ohne App und eine Katalogseite. Das gibt es teils schon:
  R-1.13, Katalog, Prüfseite.
- Feste Fassungen (R-10.3) entsprechen schon heute versionierten Diensten.
- Die App enthält nur ihre Daten, ihre Befehle und ihre Texte.

## 5. Weg ohne Eingriff in die Apps

- Das neue Framework entsteht in **`v5/`** (passt zu APD-145, Namensraum `AD`, AppDesign 5.0.0), zuerst mit einer kleinen Beispiel-App und eigenen Prüfungen.
- Das Reiselogbuch wechselt erst später und nur nach Rückfrage (R-10.3).

## 6. Zu recherchieren in der eigenen Sitzung (mit Quellen)

- Apple: UIKit-Präsentation (`present`/`dismiss`, `sourceItem`), `UIMenu`/`UIAction`, SwiftUI `NavigationStack`, `.sheet`, `.popover`, HIG ‚Modality‘.
- Web-Plattform: `<dialog>`, Popover-API, die neuen Befehls-Attribute (`commandfor`/`command`) und Anker-Positionierung – was davon Safari auf iPad und iPhone
  schon kann.
- Muster: Zustandsautomaten (Statecharts) für die Navigation, ein Datenfluss in eine Richtung (Zustand → Anzeige), Web Components.
- Vergleich mit Frameworks, die Apps im iOS-Stil fürs Web bauen: was sie zentral steuern und was nicht.

## 7. Vorschlag zum Vorgehen

1. Neues Thema im Backlog von AppDesign (nächste freie Nummer), allgemein.
2. Eine **eigene Sitzung** nur für dieses Thema (0 Nr. 12): Recherche mit Quellen → Varianten → Austausch mit dir in mehreren Runden → Grobentwurf mit
   Testfall-Liste → erst dann `v5/`.
3. 0163 baut unabhängig davon 4.70.2 / 3.58.5 fertig. Danach kommt der Usertest P-125 (0 Nr. 22). Willst du das Framework vorher angehen, sagst du es mir einfach.
