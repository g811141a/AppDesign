# Zusammenarbeit allgemein

**Version 1.12.1** · Stand 10.10.2026

Regeln für die Zusammenarbeit mit Claude bei allen iPad-Web-Apps von g811141a.
Diese Datei liegt im Design-Repo **AppDesign** (g811141a/AppDesign).
App-spezifische Punkte stehen in der `CLAUDE.md` des jeweiligen App-Repos.

> **VERPFLICHTEND – nie ohne Freigabe bauen:** Claude entscheidet **nie selbst**, eine neue
> Version zu bauen oder hochzuladen – auch nicht bei kleinen Korrekturen und auch nicht, wenn
> die Bitte „korrigieren“, „verbessern“ oder „ausbessern“ lautet. Vorher wird **immer** gefragt:
> „Soll ich Version X.Y.Z mit … erstellen? Ja/Nein“ – gebaut wird erst nach einem
> ausdrücklichen „Ja“. Bis dahin: erklären, Vorschlag machen, ins Backlog eintragen.
>
> **VERPFLICHTEND – Sammelversionen:** Geklärte Punkte werden **gesammelt** (Backlog-Abschnitt
> „0. Nächste Version“) und gemeinsam in **einer** Version gebaut und getestet – nie eine
> eigene Version für ein oder zwei Kleinigkeiten (Abschnitt 6).
>
> **VERPFLICHTEND – erst prüfen, dann Neues:** Nach jeder neuen Version werden **unbedingt alle
> Prüfpunkte** getestet und gefundene Fehler beseitigt, bevor neue Punkte umgesetzt werden. Claude
> weist nach jeder Version **ausdrücklich** darauf hin. Ausnahme: Der Nutzer besteht nach diesem
> Hinweis trotzdem darauf, zuerst Neues umzusetzen.

> **Hinweis für Claude:** Diese Regeln gelten in jeder Sitzung, auch nach langer Pause.
> Lies zu Beginn zusätzlich `README - Designrichtlinie allgemein.md` und die
> Designrichtlinie der App.

---

## 1. Sprache und Ton

- Deutsch, kurz und klar.
- Schaltflächen im Chat mit ihren Lucide-Icon-Namen benennen (z. B. „pencil“, „trash“),
  nicht mit Emojis.

## 2. Rückfragen – Antwortformat

- Rückfragen so stellen, dass kurz geantwortet werden kann:
  - **Ja/Nein- oder Ok-Fragen**, wo möglich.
  - Bei mehreren Möglichkeiten eine **Aufzählung mit a, b, c, d …**
  - Fragen nummerieren (1, 2, 3 …), damit die Antwort „1) a, 2) ja“ lauten kann.
- Eigene Empfehlung jeweils kurz dazuschreiben.
- **Antwortvorschläge zum Übernehmen (Pflicht, immer beides):**
  - Die Fragen kommen zusätzlich im **Auswahlfenster** (bis zu 4 Fragen, je 2–4 Möglichkeiten);
    die Empfehlung steht immer an erster Stelle mit „(Empfohlen)“ und kann einfach angetippt werden.
  - Schließt der Nutzer das Auswahlfenster und antwortet im Text, gilt die Antwort; bei den
    **nächsten** Fragen kommt **trotzdem wieder automatisch** das Auswahlfenster.
  - Am Ende jeder Antwort mit Fragen steht eine fertige **Antwortzeile zum Kopieren** mit den
    empfohlenen Antworten, z. B. `1 ja · 2 a · 3 ja` – bei mehr als 4 Fragen ist sie der einzige Weg.
  - Den Vorschlag im Eingabefeld der App erzeugt die App selbst; Claude kann ihn nicht befüllen.
- **Zeit und Token (Pflicht):** Claude misst bei jeder Antwort die Gesamtzeit (Zeitstempel zu Beginn
  und am Ende) und die Token aus den Sitzungsdaten (Unterschied zum Stand am Ende der vorigen Antwort;
  die Sitzungsdaten zählen erst nach dem Ende einer Antwort, darum stehen die Token der
  **vorigen** Antwort). Ausgabe als **eine kompakte Zeile ganz am Ende**, klein gesetzt:
  `<sub>⏱ Gesamt mm:ss · Token vorige Antwort: N neu · N aus Zwischenspeicher · N geschrieben</sub>`
  (ab 60 Minuten hh:mm:ss). Nutzung in Prozent und Rücksetzzeiten zeigt nur die Claude-App.
- **Muster im Auswahlfenster:** Text vor einem Auswahlfenster und die Vorschau-Funktion sind in der
  App nicht zu sehen. Muster und Beispiele stehen deshalb **direkt im Fragetext** des
  Auswahlfensters (oder als Bild/Datei, die vor dem Fenster geschickt wird). **Ausnahme:** Muster,
  die von der Schriftdarstellung abhängen (klein, grau, kursiv …), zeigt das Fenster nicht – dann
  kommen Muster und Frage einmalig im Text am Ende der Antwort; bei der nächsten Frage wieder das
  Fenster.
- **Reihenfolge in einer Antwort:** Erst die Arbeit, dann das Auswahlfenster, nach der Antwort die
  Zusammenfassung – die Zeile mit Zeit und Token steht immer ganz am Ende.

## 3. Apple-like entwickeln

- Alle Apps werden **Apple-like** entwickelt: Aussehen, Aufbau und Bedienung wie in den
  Apple-Apps auf dem iPad (iPadOS).
- Bei **jeder neuen Anforderung** recherchiert Claude, wie Apple das in seinen eigenen Apps
  (z. B. Notizen, Erinnerungen, Kontakte, Dateien, Safari, Mail, Numbers) und in den Human
  Interface Guidelines löst, und nennt das kurz („So macht es Apple: …“).
- Daraus macht Claude **Vorschläge bzw. Empfehlungen**, auch ungefragt, wenn eine Anforderung
  vom Apple-Standard abweicht oder Apple eine bessere Lösung hat. Entschieden wird wie immer
  per Rückfrage.
- Was im Web nicht geht (z. B. SF Symbols, echte Systemmenüs), wird so nah wie möglich
  nachgebaut und als Abweichung genannt.
- **Apple-Abgleich vor jedem Muster (Pflicht):** Bevor Claude ein Muster zeigt, steht kurz
  dabei: welche Apple-App es so löst (z. B. Notizen, Dateien, Erinnerungen), welche Punkte der
  **HIG-Checkliste** (Designrichtlinie allgemein, Abschnitt 16) betroffen sind und wo bewusst abgewichen
  wird – mit Grund. Die HIG wird **vorher** geprüft, nicht erst nach einer Meldung.
- **Apple-Review nach jeder Version (Pflicht):** In der Zusammenfassung steht je Punkt
  „entspricht HIG“ oder „weicht ab, weil …“, dazu das Ergebnis des HIG-Prüfskripts.
- **Vergleichsbilder:** Claude bittet bei Bedarf **konkret** um 1–4 Screenshots aus
  Apple-Apps (iPad oder iPhone) zum jeweiligen Thema. Sie liegen in AppDesign im Ordner
  `apple-referenz/<Gerät>/<App>/` mit einer `README.md` (je Bild: was es zeigt, was wir daraus
  lernen); Muster werden neben das Vorbild gestellt.
  **Das Repo ist öffentlich:** Claude verpixelt private Inhalte (Namen, Ordner, Texte) **vor**
  dem Ablegen und zeigt die Bilder vorher zur Freigabe.

## 4. Backlog

- Jedes App-Repo hat eine `BACKLOG.md` mit allen offenen Themen (Nummer, **Priorität**, Thema,
  allgemein oder App, Status: offen · bereit · prüfen · später) und einem Abschnitt
  „Erledigt“.
- **Aufbau der BACKLOG.md** – ein Punkt wandert von unten nach oben:
  - **0. Nächste Version X.Y.Z** (ganz oben): fertig geklärte Punkte (Status **bereit**), die
    in die nächste Sammelversion kommen – mit Spalte „bereit seit“ und einer Zeile „N Punkte
    bereit“. Fertig geklärt heißt: Muster bestätigt, allgemein/App geklärt, Texte fest.
  - **1. Auf dem iPad prüfen:** je gebauter Version **ein** Prüfpunkt mit Prüfliste.
  - **2. Weitere Themen (in Klärung):** Status **offen**.
  - **3. Später:** Ideen.
  - **Erledigt:** mit Version und Datum.
  - Weg eines Punktes: 2. in Klärung → 0. Nächste Version → 1. Prüfen → Erledigt.
- **Priorität:** 1 hoch (als Nächstes) · 2 mittel · 3 niedrig. Gearbeitet wird immer an den
  Themen mit der höchsten Priorität zuerst; Claude schlägt die nächsten Schritte danach vor.
- **Neue Themen:** Claude schlägt Verbesserungen einzeln vor (mit „So macht es Apple“) und
  fragt jeweils: „Ins Backlog übernehmen? Ja/Nein“ und „Mit welcher Priorität? a) 1 hoch ·
  b) 2 mittel · c) 3 niedrig“ – mit eigener Empfehlung.
- Neue Wünsche, offene Fragen und Prüfpunkte trägt Claude sofort ein; Erledigtes wandert mit
  Version und Datum nach „Erledigt“.
- **Claude erinnert an die offenen Themen:** zu Beginn einer Sitzung (kurze Liste) und am Ende
  jeder Antwort, in der etwas gebaut oder entschieden wurde – zuerst die Zeile „Nächste
  Version X.Y.Z: N Punkte bereit (…)“, danach „Offen im Backlog: …“.

## 5. Ablauf einer Änderung

1. Ideen sammeln und **nachfragen** („Frag nach“), bis alles geklärt ist.
2. Bei Gestaltungsfragen zuerst ein **Muster** (Screenshot) zeigen, bei Bedarf mit
   Varianten (a, b, c).
   - Muster zuerst **nur hell und quer**; dunkel und hoch erst, wenn hell passt.
   - Muster und Screenshots **in Viererpaketen** schicken (je Sendung höchstens 4 Bilder),
     damit man sie nacheinander durchsehen kann.
3. **Bei jeder Design-Änderung fragen, ob sie allgemein gilt oder nur für die App**
   (eigene Einschätzung als Vorschlag).
4. Zusammenfassen und in den Backlog-Abschnitt **„0. Nächste Version“** eintragen (Status
   bereit) – **nicht** sofort bauen. Auch kleine Fehler aus dem Testen kommen dorthin.
5. Gebaut wird nur nach Abschnitt 6 und **erst nach ausdrücklichem „Ja“ – verpflichtend,
   ohne Ausnahme** (siehe Hinweis oben). Eine Bitte um Korrektur ist kein „Ja“ zum Bauen.
6. Nur das ändern, was besprochen wurde – keine ungefragten Änderungen. Fällt beim Bauen
   etwas auf, es nennen statt es eigenmächtig zu ändern (Ausnahme: offensichtliche
   Fehler, dann ausdrücklich erwähnen).

## 6. Sammelversionen

- **Wann Claude nach einer Version fragt:** erst, wenn sich eine Version lohnt –
  - ein **größeres Thema** ist fertig geklärt, **oder**
  - etwa **5 Punkte** sind in „0. Nächste Version“ gesammelt, **oder**
  - der Nutzer sagt jederzeit „Version bauen“.
  Dann: „Soll ich Version X.Y.Z mit [Liste aller bereiten Punkte] erstellen? Ja/Nein“.
- **Sofort-Korrektur** (eigene kleine Version außer der Reihe) nur bei schweren Fehlern:
  **Datenverlust** droht oder die App ist **nicht benutzbar**. Claude fragt auch dann vorher.
  Alles andere wartet auf die nächste Sammelversion.
- **Versionsnummer:** Sammelversion = in der Regel **Nebenversion** (z. B. 2.3.0);
  Korrekturversion (z. B. 2.3.1) nur für Sofort-Korrekturen.
- **Eine Prüfrunde je Version:** Claude legt einen Prüfpunkt mit nummerierter Prüfliste an
  (je Punkt der Version: was auf dem iPad zu prüfen ist). Antwort z. B. „alles ok“ oder
  „ok bis auf 3“; Abweichungen kommen wieder in „0. Nächste Version“.

## 7. Nach jeder Version

- Testen (hell und dunkel, iPad quer und hoch, alle betroffenen Abläufe) und das
  HIG-Prüfskript laufen lassen (Antippflächen, Schriftgrößen, Kontraste, Markierung bleibt,
  Anführungszeichen …).
- Im Backlog die gebauten Punkte aus „0. Nächste Version“ entfernen, die Prüfliste unter
  „1. Auf dem iPad prüfen“ anlegen und „Erledigt“ ergänzen.
- PROMPT.md, CHANGELOG.md und betroffene Designrichtlinien aktualisieren; in PROMPT.md und
  CHANGELOG.md die Versionen vermerken (z. B. „Reiselogbuch 1.1.0 · Designrichtlinie
  allgemein 2.0.0 · Designrichtlinie Reiselogbuch 1.1.0 · Zusammenarbeit allgemein 1.0.0“).
- Versionsnummer, Erstellungszeitpunkt und Cache-Name des Service Workers erhöhen.
- Auf `main` hochladen, prüfen, ob GitHub Pages die Version online gestellt hat.
- Screenshots in Viererpaketen schicken und die Änderungen auf Deutsch zusammenfassen; an
  den Neustart der App erinnern.
- **Ausdrücklicher Hinweis** am Ende des Berichts: „Bitte zuerst alle Prüfpunkte testen – neue
  Punkte setze ich erst um, wenn die Prüfliste erledigt und gefundene Fehler beseitigt sind.“

## 8. Versionen

- Dreistufig **Hauptversion.Nebenversion.Korrektur** für Apps, Richtlinien und diese
  Datei (Bedeutung siehe Designrichtlinie allgemein, Abschnitt 11).
- Jede Datei mit eigener Versionsnummer und Versionsgeschichte am Ende.

## 9. Ablage

- Ein Repo pro App, Bereitstellung über GitHub Pages aus `main`/Hauptordner.
- Allgemeines liegt im Design-Repo **AppDesign**: diese Datei, Designrichtlinie allgemein,
  `v4/design.css`, `v4/ui.js`, Vergleichsbilder, HIG-Prüfung, Vorlage für neue Apps.
- **Gemeinsame Bausteine ändern:** Änderung in AppDesign (Version dort erhöhen), testen mit
  jeder App, die sie nutzt; **erst AppDesign veröffentlichen, dann die Apps.** In PROMPT.md und
  CHANGELOG.md jeder App steht die AppDesign-Version, mit der sie gebaut wurde.
- App-Spezifisches: `CLAUDE.md`, `PROMPT.md`, `CHANGELOG.md`, `BACKLOG.md`,
  `README - Designrichtlinie <App>.md` im App-Repo.
- Keine Wiederholungen: App-Dateien verweisen auf die allgemeinen Dateien und enthalten nur
  Abweichungen und Ausprägungen.

---

## Versionsgeschichte

| Version | Datum | Art | Inhalt |
|---|---|---|---|
| 1.12.1 | 10.10.2026 | Korrektur | Zeit und Token als eine kompakte, kleine Zeile am Ende; Ausnahme für Muster mit Schriftdarstellung; Reihenfolge in einer Antwort |
| 1.12.0 | 10.10.2026 | Neben | Nutzungsstatistik (Token, Nutzungsfenster, Rücksetzung) mit der Zeitmessung; Muster direkt im Fragetext des Auswahlfensters |
| 1.11.0 | 10.10.2026 | Neben | Pflicht: Zeitmessung je Aktion, Ausgabe am Ende der Rückmeldung im Format mm:ss |
| 1.10.0 | 09.10.2026 | Neben | Umzug ins Design-Repo AppDesign; Ablage, Vergleichsbilder und Reihenfolge beim Veröffentlichen (erst AppDesign, dann Apps) |
| 1.9.0 | 09.10.2026 | Neben | Verpflichtend: nach jeder Version erst alle Prüfpunkte testen und Fehler beseitigen, dann Neues (Hinweis, Ausnahme nur auf Wunsch); Auswahlfenster auch nach einem geschlossenen Fenster wieder verwenden |
| 1.8.0 | 09.10.2026 | Neben | Pflicht: Antwortvorschläge immer im Auswahlfenster (Empfehlung zuerst) und als Antwortzeile zum Kopieren |
| 1.7.1 | 09.10.2026 | Korrektur | Vergleichsbilder: Ablage `apple-referenz/<Gerät>/<App>/` mit README; private Inhalte vorher verpixeln und zur Freigabe zeigen |
| 1.7.0 | 09.10.2026 | Neben | Pflicht: Apple-Abgleich vor jedem Muster (HIG-Checkliste) und Apple-Review nach jeder Version; Vergleichsbilder aus Apple-Apps auf Anfrage (`apple-referenz/`); HIG-Prüfskript bei jedem Test |
| 1.6.0 | 09.10.2026 | Neben | Verpflichtend: Sammelversionen – geklärte Punkte in „0. Nächste Version“ sammeln, Version erst bei größerem Thema, etwa 5 Punkten oder auf Wunsch; Sofort-Korrektur nur bei Datenverlust/unbenutzbarer App; eine Prüfliste je Version; Status „bereit“ statt „vereinbart“ |
| 1.5.0 | 08.10.2026 | Neben | Verpflichtend: nie selbst entscheiden, eine Version zu bauen – immer vorher fragen, auch bei Korrekturen |
| 1.4.0 | 08.10.2026 | Neben | Backlog mit Priorität; neue Themen einzeln vorschlagen und Übernahme samt Priorität erfragen |
| 1.3.0 | 08.10.2026 | Neben | Neu: Backlog-Datei je App und Erinnerung an offene Themen |
| 1.2.0 | 08.10.2026 | Neben | Neu: Apple-like entwickeln – bei jeder Anforderung recherchieren, wie Apple es löst, und Vorschläge/Empfehlungen machen |
| 1.1.0 | 08.10.2026 | Neben | Muster zuerst nur hell und quer; Muster und Screenshots in Viererpaketen |
| 1.0.0 | 07.10.2026 | erste Fassung | Aus der Designrichtlinie allgemein ausgelagert; neu: Antwortformat (ja/nein, a/b/c), Frage „allgemein oder App?“ |
