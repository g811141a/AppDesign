# Zusammenarbeit allgemein

**Version 2.3.1** · Stand 14.10.2026

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
> Lies zu Beginn **`UEBERGABE.md`** (Stand der letzten Sitzung), dann `README - Designrichtlinie allgemein.md`
> und die Designrichtlinie der App.

---

## 0. Arbeitsprozess 2.0 (seit 2.0.0 – hat Vorrang vor älteren Stellen dieser Datei)

Vereinbart am 14.10.2026 nach dem Brainstorming (A-04). Ziel: **nichts mehr vergessen**, Fehler finden, bevor der
Nutzer sie findet, schneller und günstiger arbeiten.

**A. Testen und Qualität**
1. **Fall-Liste vor jedem Bau:** Zu jeder Anforderung schreibt Claude **vor dem Bauen** eine kurze Liste der Fälle –
   Gerät (iPad, iPhone) × Lage (quer, hoch) × Darstellung (hell, dunkel) × Handlung (drehen, wischen, Tastatur,
   abgleichen, teilen …) × Daten (leer, lang, viele). Jeder Fall wird ein automatischer Test. Die Liste kommt mit dem
   Muster, damit der Nutzer Lücken sieht. Was nur das echte Gerät zeigt (Teilen-Menü, iCloud, Drucken,
   Silbentrennung, Gefühl beim Wischen), kommt in die Prüfliste.
2. **Parallel arbeiten, sparsam:** Tests laufen parallel, die schnellsten zuerst, Abbruch beim ersten Fehler
   (seit AppDesign 4.13.0: `node tests/alle.mjs` in der App, Werkzeug `AppDesign/tests/lauf.mjs`; jeder Test meldet Fehler
   mit Rückgabewert, Gegenprobe mit `--gegenprobe`). Hilfsagenten nur für große, klar abgegrenzte Aufgaben mit wenig
   Token-Verbrauch.
3. **Regeln schlank halten:** Bei **jeder** neuen Regel prüft Claude, ob sie eine bestehende **ersetzt oder ergänzt**,
   und fasst Regeln zum selben Thema zusammen (z. B. alle Tabellenregeln an einer Stelle). Je Regel **genau eine**
   Prüfung. Der Regelkatalog ist nach Themen geordnet.
4. **Allgemeine Regel immer erfragen:** Legt eine Eingabe des Nutzers eine Formatierung oder ein Verhalten fest, prüft
   Claude (mit Recherche), ob daraus eine **allgemeine Regel** werden sollte, und fragt **verlässlich** im
   Auswahlfenster: ‚Als allgemeine Regel festhalten? Ja/Nein‘. Grundsatz: Allgemeine Regeln sind die Grundlage jeder
   App (gleiche Schaltflächen an gleichen Stellen, gleiche Formatierung); in der App steht nur, was anders ist.
5. **Safari nachbilden:** Tests bilden Safari nach, wo Chrome anders arbeitet; seit AppDesign 4.13.0 läuft jeder Test
   zusätzlich in WebKit (Installation im Setup-Skript der Umgebung ‚Standard‘).

**B. Muster und Entscheidungen**
6. **Varianten nebeneinander:** Beim ersten Muster 2–3 Varianten, wo sinnvoll; bei kleinen Korrekturen eine.
7. **Auswahlfenster nur für Ja/Nein und klare Auswahl.** Jedes Fenster hat die Option **‚Ich schreibe im Chat‘**;
   wählt der Nutzer sie, beendet Claude die Antwort, damit der Nutzer im Chat schreiben kann. Längere Wünsche,
   Einwände und Fragen immer im Chat (das Feld ‚Sonstiges‘ im Fenster schneidet lange Texte ab).
   Erklärungen, die der Nutzer **vor** einer Entscheidung lesen muss, schickt Claude als Datei vor dem Fenster.

**C. Bauen und Veröffentlichen**
8. **Kleine Versionen:** 2–3 zusammengehörige Punkte, **höchstens 2 Themen** je Version; nicht kreuz und quer.
   **Korrekturen sofort:** Fehler aus einer Prüfrunde kommen als eigene Korrekturversion, bevor Neues gebaut wird – auch
   ohne Datenverlust (Abschnitt 6).
9. **Veröffentlichungs-Skript:** erhöht alle Versionen, prüft, veröffentlicht AppDesign vor der App und wartet auf
   Pages (A-05).
10. **Feste Fassung der allgemeinen Regeln je App:** Jede AppDesign-Version liegt zusätzlich in einem eigenen,
    unveränderlichen Ordner; jede App bindet **genau ihre** Fassung ein. Eine App wird nur auf eine neuere Fassung
    gehoben, wenn Claude **vorher fragt** und der Nutzer zustimmt (Umsetzung mit A-05).
11. **Bericht nach einer Version:** 3–5 Sätze, dazu eine **vollständige Aufzählung aller Änderungen**, dann die
    Prüfpunkte Schritt für Schritt. Ist ein Fehler durchgerutscht, steht immer dabei, **warum** die Prüfung ihn
    übersehen hat.

**D. Sitzungen und Übergabe**
12. **Ein Thema je Sitzung.** Eine Sitzung ist ein Chat in der Claude-Code-App. Lange Sitzungen fasst das System
    automatisch zusammen – dabei gehen Einzelheiten verloren. Deshalb:
13. **Claude startet die neue Sitzung selbst (seit 2.1.0):** Sobald ein Thema abgeschlossen ist, die Sitzung groß
    wird (etwa ab 300.000 Token Kontext) oder bereits automatisch zusammengefasst wurde, schreibt Claude die Übergabe
    (Nr. 14) und startet **selbstständig** eine neue Sitzung in derselben Umgebung (`create_session`): Repo AppDesign
    angehängt, die App-Repos holt die neue Sitzung selbst dazu (`add_repo`), der Starttext ist ihre erste Nachricht.
    **Name:** `<App> <Chatnummer>` mit vierstelliger, aufsteigender Nummer und kurzem Thema, z. B.
    ‚Reiselogbuch 0001 – AppDesign 4.12.0‘; jede Sitzung, die die nächste startet, erhöht die Nummer um 1. Die
    nächste Nummer steht in `UEBERGABE.md`. Braucht eine Sitzung eine Entscheidung des Nutzers, bleibt sie dort stehen
    und startet keine neue. Claude nennt dem Nutzer den Namen der neuen Sitzung.
14. **Bei Ja schreibt Claude sofort die Übergabe** nach `UEBERGABE.md` im Repo AppDesign und veröffentlicht sie:
    Versionen, offene Prüfpunkte, nächste Schritte, neue Vereinbarungen (die zusätzlich schon in den Richtlinien
    stehen) und was zuerst zu lesen ist. Dazu gibt Claude einen **Starttext** zum Kopieren – **immer als Codeblock**
    (```), damit er mit der Kopieren-Schaltfläche übernommen werden kann – und nennt, **wo auf GitHub** alles liegt
    (Repo, Branch `main`, Dateien), damit die neue Sitzung es findet. **Abschluss (seit 2.3.0):** Am Ende der Antwort
    mit der Übergabe steht in fetter Schrift **‚Die Sitzung (Chat) ist damit beendet!‘** – danach nur noch die Zeile mit
    Zeit und Token.
15. **Neue Sitzung:** Der Nutzer öffnet einen neuen Chat mit derselben Umgebung und fügt den Starttext ein. Claude
    liest die Übergabe und die Richtlinien und gibt zuerst das **Lagebild** (Version, offene Prüfpunkte,
    Backlog-Spitze), dann wird gearbeitet.
16. **Übergabe statt Gedächtnis:** Jede Vereinbarung kommt **sofort** in die Richtlinien, nicht erst am Ende. Was
    nicht auf GitHub steht, gibt es in der nächsten Sitzung nicht.
17. **Rückmeldung kurz:** Nummer, ‚nicht ok‘ und ein Stichwort genügen; bei Unklarem fragt Claude nach.

---

## 1. Sprache und Ton

- Deutsch, kurz und klar.
- **Jede Meldung deutsch (seit 1.15.1):** auch kurze Zwischenmeldungen während der Arbeit, Statuszeilen,
  Bildunterschriften zu Screenshots und Fragen im Auswahlfenster – nie englisch. Englisch bleiben nur Code,
  Dateinamen und Fachbegriffe ohne gängiges deutsches Wort.
- Schaltflächen im Chat mit ihren Lucide-Icon-Namen benennen (z. B. „pencil“, „trash“),
  nicht mit Emojis.

## 2. Rückfragen – Antwortformat

- Rückfragen so stellen, dass kurz geantwortet werden kann:
  - **Ja/Nein- oder Ok-Fragen**, wo möglich.
  - Bei mehreren Möglichkeiten eine **Aufzählung mit a, b, c, d …**
  - Fragen nummerieren (1, 2, 3 …), damit die Antwort „1) a, 2) ja“ lauten kann.
- Eigene Empfehlung jeweils kurz dazuschreiben.
- **Auswahlfenster (0 Nr. 7):**
  - Fragen kommen im **Auswahlfenster** (bis zu 4 Fragen, je 2–4 Möglichkeiten): nur eine **kurze Frage** und die
    Schaltflächen, keine Erklärtexte, keine Zeitangaben. Die Empfehlung steht an erster Stelle mit „(Empfohlen)“;
    jedes Fenster hat die Option **‚Ich schreibe im Chat‘**.
  - Schließt der Nutzer das Auswahlfenster und antwortet im Text, gilt die Antwort; bei den
    **nächsten** Fragen kommt **trotzdem wieder automatisch** das Auswahlfenster.
  - Eine **Antwortzeile zum Kopieren** (z. B. `1 ja · 2 a · 3 ja`) gibt es nur noch bei mehr als 4 Fragen –
    dann ist sie der einzige Weg.
- **Zeit und Token (Pflicht):** Gemessen wird die **Arbeitszeit ab dem Eingang der Nachricht des
  Nutzers** (Zeitpunkt aus den Sitzungsdaten, nicht erst ab Claudes erstem Schritt – das Nachdenken
  davor zählt mit) bis zur Übergabe; Wartezeit in Auswahlfenstern zählt nicht. Die Gesamtzeit beginnt
  mit **jeder neuen Nachricht** des Nutzers wieder bei 00:00. Die Token stammen aus den Sitzungsdaten
  der **vorigen** Antwort (genaue Werte je Antwort; die laufende Antwort wird erst an ihrem Ende
  gezählt). Ausgabe als **eine kompakte Zeile**, klein gesetzt:
  `<sub>⏱ mm:ss · Token vorige Antwort: N neu · N aus Zwischenspeicher · N geschrieben</sub>`
  (ab 60 Minuten hh:mm:ss). Nutzung in Prozent und Rücksetzzeiten zeigt nur die Claude-App.
- **Muster und Erklärungen vor dem Fenster (0 Nr. 7, seit 2.2.0):** Text vor einem Auswahlfenster und die
  Vorschau-Funktion sind in der App nicht zu sehen. Muster, Beispiele und Erklärungen, die der Nutzer vor der
  Entscheidung lesen muss, schickt Claude deshalb **als Datei oder Bild vor dem Fenster**; im Fenster steht nur die
  kurze Frage.
- **Reihenfolge in einer Antwort:** Erst die Arbeit, dann das Auswahlfenster, nach der Antwort die
  Zusammenfassung – die Zeile mit Zeit und Token steht immer ganz am Ende, also **nach** der letzten
  Antwort im Auswahlfenster. Solange ein Fenster offen ist, ist die Antwort noch nicht fertig.
  Die laufende Zeitanzeige während der Bearbeitung kommt von der App, nicht von Claude.

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
  **HIG-Checkliste** (Designrichtlinie allgemein, Abschnitt 16) und welche Regeln des
  **Regelkatalogs** (Abschnitt 17, R-1.1 …) betroffen sind und wo bewusst abgewichen wird – mit
  Grund. HIG und Regelkatalog werden **vorher** geprüft, nicht erst nach einer Meldung.
- **Apple-Review nach jeder Version (Pflicht):** In der Zusammenfassung steht je Punkt
  „entspricht HIG“ oder „weicht ab, weil …“, dazu das Ergebnis des HIG- und Regel-Prüfskripts.
- **Neue allgemeine Regel:** bekommt sofort eine Nummer im Regelkatalog und – wo es geht – eine
  automatische Prüfung im Skript; sonst steht dort ‚Gerät‘.
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
3. **Allgemein oder App** – bei jeder Design-Änderung erfragen (Abschnitt 0 Nr. 4).
4. Zusammenfassen und in den Backlog-Abschnitt **„0. Nächste Version“** eintragen (Status
   bereit) – **nicht** sofort bauen. Auch kleine Fehler aus dem Testen kommen dorthin.
5. Gebaut wird nur nach Abschnitt 6 und **erst nach ausdrücklichem „Ja“ – verpflichtend,
   ohne Ausnahme** (siehe Hinweis oben). Eine Bitte um Korrektur ist kein „Ja“ zum Bauen.
6. Nur das ändern, was besprochen wurde – keine ungefragten Änderungen. Fällt beim Bauen
   etwas auf, es nennen statt es eigenmächtig zu ändern (Ausnahme: offensichtliche
   Fehler, dann ausdrücklich erwähnen).

## 6. Sammelversionen

- **Wann Claude nach einer Version fragt** (0 Nr. 8): erst, wenn sich eine Version lohnt –
  - ein **Thema** ist fertig geklärt, **oder**
  - **2–3 zusammengehörige Punkte** (höchstens 2 Themen, Abschnitt 0 Nr. 8) sind in „0. Nächste Version“ gesammelt, **oder**
  - der Nutzer sagt jederzeit „Version bauen“.
  Dann: „Soll ich Version X.Y.Z mit [Liste aller bereiten Punkte] erstellen? Ja/Nein“.
- **Korrekturen sofort (0 Nr. 8, seit 2.2.0):** Fehler aus einer Prüfrunde kommen als eigene Korrekturversion,
  **bevor** Neues gebaut wird – auch ohne Datenverlust. Claude fragt auch dann vorher.
- **Versionsnummer:** Sammelversion = in der Regel **Nebenversion** (z. B. 2.3.0);
  Korrekturversion (z. B. 2.3.1) für Korrekturen.
- **Eine Prüfrunde je Version:** Claude legt einen Prüfpunkt mit nummerierter Prüfliste an
  (je Punkt der Version: was auf dem iPad zu prüfen ist). Antwort z. B. „alles ok“ oder
  „ok bis auf 3“; Abweichungen kommen wieder in „0. Nächste Version“.

## 7. Nach jeder Version

- Testen (hell und dunkel, iPad quer und hoch, iPhone hoch und quer, alle betroffenen Abläufe)
  und das **HIG- und Regel-Prüfskript** laufen lassen: es prüft in jeder Ansicht die HIG-Punkte
  und **alle automatisch prüfbaren Regeln des Regelkatalogs** – nicht nur die geänderten.
- Regeln, die nur am Gerät prüfbar sind (Regelkatalog ‚Gerät‘, z. B. Federn, iOS-Tastatur),
  kommen in die Prüfliste, **wenn die Version sie betrifft**.
- Im Backlog die gebauten Punkte aus „0. Nächste Version“ entfernen, die Prüfliste unter
  „1. Auf dem iPad prüfen“ anlegen und „Erledigt“ ergänzen.
- PROMPT.md, CHANGELOG.md und betroffene Designrichtlinien aktualisieren; in PROMPT.md und
  CHANGELOG.md die Versionen vermerken (z. B. „Reiselogbuch 1.1.0 · Designrichtlinie
  allgemein 2.0.0 · Designrichtlinie Reiselogbuch 1.1.0 · Zusammenarbeit allgemein 1.0.0“).
- Versionsnummer, Erstellungszeitpunkt und Cache-Name des Service Workers erhöhen.
- Auf `main` hochladen, prüfen, ob GitHub Pages die Version online gestellt hat.
- **Fertig erst nach Pages (seit 1.15.0):** ‚Fertig‘ meldet Claude erst, wenn die Pages-Läufe **beider** Repos
  (erst AppDesign, dann die App) erfolgreich abgeschlossen sind und die veröffentlichten Dateien die neue Version
  enthalten (`APP_VERSION`, `AD_NEEDED`, `AD_VERSION`); vorher wird nicht zum Testen aufgefordert.
- **Versionen in der README (seit 1.15.0, R-10.4):** Die README jeder App zeigt ganz oben die Tabelle ‚Verwendete
  Versionen‘ – App, AppDesign, Designrichtlinie allgemein, Designrichtlinie <App>, Zusammenarbeit allgemein – je mit
  Version und Link; bei jeder Version nachführen.
- Bericht nach 0 Nr. 11; Screenshots in Viererpaketen; an den Neustart der App erinnern.
- **Ausdrücklicher Hinweis** am Ende des Berichts: „Bitte zuerst alle Prüfpunkte testen – neue
  Punkte setze ich erst um, wenn die Prüfliste erledigt und gefundene Fehler beseitigt sind.“
- **Prüfpunkte Schritt für Schritt (seit 1.14.0, verpflichtend):** Am Ende **jeder Umsetzung** – nach
  einer Version und ebenso nach vorbereiteten, noch nicht gebauten Änderungen – gibt Claude **alle
  offenen Prüfpunkte einzeln** aus, jeden mit Nummer (z. B. P-26/3) und als **Schritt-für-Schritt-
  Anleitung**: 1. was antippen bzw. einstellen (Gerät, quer/hoch, hell/dunkel), 2. was tun,
  3. was zu sehen sein muss (erwartetes Ergebnis). Ein Prüfpunkt prüft genau eine Sache; Verweise
  wie „wie oben“ oder „siehe Tabelle“ ersetzen keine Schritte. Noch offene Prüfpunkte früherer
  Versionen stehen mit dabei.
- **Fehler am Gerät gefunden → Prüfung zuerst schärfen (seit 1.16.0):** Findet der Nutzer einen Fehler, den eine Regel
  verbietet, ist auch die automatische Prüfung lückenhaft. Reihenfolge: 1. die Prüfung so erweitern, dass sie den
  Fehler findet (rot), 2. beheben (grün), 3. dieselbe Lücke in allen Ansichten, Fenstern und Apps suchen (z. B. eine
  Prüfung, die nur einen Bereich abdeckt), 4. im Bericht nennen, warum die Prüfung den Fehler übersehen hat.
- **Testfälle selbst ableiten:** Fall-Liste vor jedem Bau (0 Nr. 1), Safari nachbilden (0 Nr. 5); nach jeder Handlung
  die allgemeinen Grundregeln prüfen (z. B. nach dem Drehen: oberster Eintrag, Seitenleiste, Menüs bleiben).
- **Prüfliste beginnt mit /0 (seit 1.15.0; Arbeitsregel, Prüfung `doku.mjs`):** Jede Prüfliste beginnt mit dem Prüfpunkt **/0 ‚Version prüfen‘** –
  auf jedem Gerät die Versionszeile ansehen (App-Version **und** AppDesign-Version); erst wenn beide stimmen, wird
  weiter getestet. So fällt ein noch nicht geladener Stand sofort auf (Anlass: P-26/6 und 7).
- **Jede Meldung je Gerät (seit 1.15.0; Arbeitsregel):** Ein Prüfpunkt nennt bei **jedem** Schritt, der etwas anzeigt, die
  erwartete Meldung **auf jedem beteiligten Gerät** (wörtlich), nicht nur das Endergebnis. Für jeden solchen Fall
  prüft ein automatischer Test genau diese Texte auf beiden Geräten (Anlass: P-26/9 – die Meldung des ersten Geräts
  war nicht beschrieben und irreführend).

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
| 2.3.1 | 14.10.2026 | Korrektur | Abschnitt 0 Nr. 2 und 5: Verweise auf die Werkzeuge aus A-05 Version A (`tests/alle.mjs`, `lauf.mjs`, Gegenprobe) und WebKit in jedem Test |
| 2.3.0 | 14.10.2026 | Neben | Abschnitt 0 Nr. 14: nach der Übergabe am Ende der Antwort fett ‚Die Sitzung (Chat) ist damit beendet!‘ |
| 2.2.0 | 14.10.2026 | Neben | A-02 Schritt 4 – Abschnitte 1–9 an Abschnitt 0 angepasst: Korrekturen sofort als Korrekturversion, auch ohne Datenverlust (§6, 0 Nr. 8); Antwortzeile nur noch bei mehr als 4 Fragen, jedes Fenster mit ‚Ich schreibe im Chat‘ (§2, 0 Nr. 7); Muster und Erklärungen als Datei vor dem Fenster statt im Fragetext (§2); Doppeltes durch Verweise auf Abschnitt 0 ersetzt (§5 Nr. 3, §7 Testfälle und Bericht) |
| 2.1.1 | 14.10.2026 | Korrektur | Regelnummern nach dem neuen Regelkatalog (Designrichtlinie allgemein 4.12.0): R-1.1 …, R-10.4; die frühere R-50 (Prüfliste mit /0, Meldung je Gerät) ist Arbeitsregel in Abschnitt 7 |
| 2.1.0 | 14.10.2026 | Neben | Abschnitt 0 Nr. 13: Claude startet die neue Sitzung selbst, Name ‚<App> <vierstellige Chatnummer> – Thema‘, Nummer in UEBERGABE.md |
| 2.0.1 | 14.10.2026 | Korrektur | Abschnitt 0 Nr. 14: Starttext immer als Codeblock (Kopieren-Schaltfläche) und Angabe, wo auf GitHub alles liegt |
| 2.0.0 | 14.10.2026 | Haupt | Arbeitsprozess 2.0 (Abschnitt 0, Vorrang): Fall-Liste vor jedem Bau, parallel und sparsam arbeiten, Regeln bei jeder neuen Regel zusammenfassen, allgemeine Regel immer erfragen, Safari nachbilden, Varianten nebeneinander, Fenster nur Ja/Nein mit ‚Ich schreibe im Chat‘, kleine Versionen (höchstens 2 Themen), Veröffentlichungs-Skript, feste AppDesign-Fassung je App, Bericht mit vollständiger Aufzählung, ein Thema je Sitzung, Übergabe-Datei `UEBERGABE.md`, Lagebild, kurze Rückmeldung |
| 1.16.0 | 14.10.2026 | Neben | Fehler aus der Prüfung am Gerät: zuerst die automatische Prüfung so schärfen, dass sie den Fehler findet, dann beheben, dann dieselbe Lücke überall suchen; Testfälle selbst ableiten; Tests bilden Safari nach. §1: jede Meldung deutsch (aus 1.15.1) |
| 1.15.1 | 13.10.2026 | Korrektur | §1: jede Meldung deutsch – auch Zwischenmeldungen, Statuszeilen, Bildunterschriften und Fragen im Auswahlfenster |
| 1.15.0 | 13.10.2026 | Neben | ‚Fertig‘ erst nach erfolgreichen Pages-Läufen beider Repos; README mit Tabelle ‚Verwendete Versionen‘ (R-49); Prüfliste beginnt mit /0 ‚Version prüfen‘, jeder Schritt nennt die Meldung je Gerät, mit automatischem Test (R-50) |
| 1.14.0 | 13.10.2026 | Neben | Verpflichtend: am Ende jeder Umsetzung alle offenen Prüfpunkte einzeln als Schritt-für-Schritt-Anleitung (Gerät/Lage/Darstellung · Handgriffe · erwartetes Ergebnis), mit Nummer, ohne Verweise |
| 1.13.0 | 11.10.2026 | Neben | Regelkatalog: Abgleich vor jedem Muster, Prüfung aller automatisch prüfbaren Regeln nach jeder Version; neue Regeln sofort mit Nummer und Prüfung; Geräte-Regeln in die Prüfliste, wenn betroffen |
| 1.12.5 | 10.10.2026 | Korrektur | Auswahlfenster nur mit kurzer Frage und Schaltflächen; Zeit und Token nur am Ende der Antwort |
| 1.12.4 | 10.10.2026 | Korrektur | Zeit ab Eingang der Nachricht (inkl. Nachdenken), Neubeginn bei jeder Nachricht; Token genau je Antwort aus den Sitzungsdaten |
| 1.12.3 | 10.10.2026 | Korrektur | Arbeitszeit bei jeder Übergabe (auch im Auswahlfenster) |
| 1.12.2 | 10.10.2026 | Korrektur | Arbeitszeit ohne Wartezeit im Auswahlfenster; Zeile mit Zeit und Token nach der letzten Fensterantwort |
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
