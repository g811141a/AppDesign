# Zusammenarbeit allgemein

**Version 2.19.0** · Stand 23.10.2026

Regeln für die Zusammenarbeit mit Claude bei allen iPad-Web-Apps von g811141a. Die Datei liegt im Design-Repo **AppDesign**
(g811141a/AppDesign); App-Eigenes steht in der `CLAUDE.md` des App-Repos. **Abschnitt 0 ist das Arbeitsmodell**, Abschnitt 1
die Sprache, Abschnitt 2 die Einzelheiten und Formate. Jede Regel nennt ihre Prüfung – eine automatische (Datei) oder
**Selbstkontrolle** (Claude prüft vor dem Senden selbst).

> **Hinweis für Claude:** Diese Regeln gelten in jeder Sitzung, auch nach langer Pause. Zu Beginn nur `UEBERGABE.md` und die
> Abschnitte 0 und 1 lesen, alles Weitere gezielt (Nr. 15).

---

## 0. Arbeitsmodell

Ziel: nichts vergessen, Fehler finden, bevor der Nutzer sie findet, schnell und sparsam arbeiten. Die Nummern bleiben fest
(Verweise in Code und Changelogs), neue Punkte bekommen die nächste freie Nummer. Einzelheiten und Formate: Abschnitt 2.

**Pflichten**

21. **Nie ohne ‚Ja‘ bauen:** Claude entscheidet nie selbst, eine Version zu bauen oder hochzuladen – auch nicht bei kleinen
    Korrekturen oder wenn die Bitte ‚korrigieren‘, ‚verbessern‘, ‚ausbessern‘ lautet. Vorher immer ‚Soll ich Version X.Y.Z mit …
    erstellen? Ja/Nein‘; gebaut wird erst nach einem ausdrücklichen ‚Ja‘ (eine Bitte um Korrektur ist keins). Bis dahin:
    erklären, Vorschlag machen, ins Backlog eintragen. Prüfung: Selbstkontrolle.
22. **Erst prüfen, dann Neues:** Nach jeder Version werden alle Prüfpunkte getestet und gefundene Fehler beseitigt, bevor Neues
    umgesetzt wird; jeder Bericht endet mit dem Hinweis darauf (2.3). Ausnahme: Der Nutzer besteht nach dem Hinweis darauf, zuerst
    Neues umzusetzen. Prüfung: Selbstkontrolle.

**A. Testen und Qualität**

1. **Fall-Liste vor jedem Bau:** Gerät (iPad, iPhone) × Lage × Darstellung × Handlung (drehen, wischen, Tastatur, abgleichen,
   teilen …) × Daten (leer, lang, viele); jeder Fall wird ein automatischer Test, nach jeder Handlung gelten die Grundregeln (z. B. nach dem Drehen
   bleiben oberster Eintrag, Seitenleiste und Menüs). Die
   Liste kommt mit dem Muster; was nur das Gerät zeigt (Teilen-Menü, iCloud, Drucken, Silbentrennung, Wischgefühl), kommt in die
   Prüfliste. **‚Nicht ok‘ vom Gerät:** zuerst genau den Ablauf des Nutzers als feste Prüfung nachbauen (Ausgangszustand,
   Handgriffe, Safari-Eigenheiten einzeln und zusammen) – rot gegen den veröffentlichten Stand, für immer im vollen Lauf; dann
   beheben, dieselbe Lücke überall suchen, im Bericht sagen, warum die Prüfung sie übersah. Gelingt das Nachstellen nicht,
   fragt Claude nach. Prüfung: Selbstkontrolle; Grundregeln nach jedem Schritt `pruefe.mjs`.
2. **Prüfen parallel und sparsam:** `node tests/alle.mjs` in der App (Werkzeug `tests/lauf.mjs`: parallel, schnellste zuerst,
   Abbruch beim ersten Fehler, Gegenprobe `--gegenprobe`). Während der Arbeit nur die betroffenen Prüfungen; **alle** (Chromium
   und WebKit, alle Ansichten, alle automatisch prüfbaren Regeln des Katalogs) genau **einmal je Version** im
   Veröffentlichungs-Skript, nicht zusätzlich vorher. Geräte-Regeln des Katalogs kommen in die Prüfliste, wenn die Version sie betrifft. Hilfsagenten bzw.
   eigene Sitzungen arbeiten parallel, **wenn möglich und sinnvoll**. Prüfung: `lauf.mjs` (Selbsttest `tests/lauf-selbsttest.mjs`).
3. **Regeln schlank halten:** Jede Regel steht an genau einer Stelle und nennt genau eine Prüfung; eine neue Regel ersetzt
   oder ergänzt eine bestehende, Regeln zum selben Thema werden zusammengefasst. Neue allgemeine Design-Regeln bekommen sofort
   eine Nummer im Katalog (Designrichtlinie 17) und eine automatische Prüfung, sonst ‚Gerät‘. Im Regeltext steht nur, was heute
   gilt; Geschichte steht in Versionsgeschichte und CHANGELOG. Prüfung: `doku.mjs` – `checkCatalog`, `checkCollab`.
4. **Allgemeine Regel immer erfragen:** Legt eine Eingabe des Nutzers eine Formatierung oder ein Verhalten fest, prüft Claude
   (mit Recherche), ob es eine allgemeine Regel werden sollte, und fragt bei jeder Design-Änderung ‚Als allgemeine Regel
   festhalten? Ja/Nein‘. Allgemeine Regeln sind die Grundlage jeder App (gleiche Schaltflächen an gleichen
   Stellen, gleiche Formatierung); in der App steht nur, was anders ist. Prüfung: Selbstkontrolle.
5. **Safari nachbilden:** wo Chrome anders arbeitet (Designrichtlinie 13); jeder Test läuft zusätzlich in WebKit (Setup-Skript
   der Umgebung ‚Standard‘). Prüfung: `pruefe.mjs`, Safari-Modell `safari.mjs`.

**B. Muster und Entscheidungen**

6. **Muster:** bei Gestaltungsfragen zuerst ein Muster – beim ersten 2–3 Varianten nebeneinander, bei kleinen Korrekturen eine;
   zuerst nur hell und quer, dunkel und hoch erst, wenn hell passt; Bilder in Viererpaketen. Prüfung: Selbstkontrolle.
7. **Auswahlfenster nur für Ja/Nein und klare Auswahl,** jedes mit ‚Ich schreibe im Chat‘ (gewählt → Claude beendet die
   Antwort). Längeres immer im Chat; Erklärungen, die der Nutzer vorher lesen muss, als Datei oder Bild vor dem Fenster. Format
   2.1. Prüfung: Selbstkontrolle; `checkCollab` (keine Antwortzeile ohne ‚mehr als 4 Fragen‘, keine Muster im Fragetext).

**C. Apple, Backlog und Ablauf einer Änderung**

23. **Apple-like:** Aussehen, Aufbau und Bedienung wie die Apple-Apps auf iPad und iPhone. Bei jeder neuen Anforderung
    recherchiert Claude, wie Apple es löst (eigene Apps und HIG), nennt es (‚So macht es Apple: …‘) und schlägt vor – auch
    ungefragt, wenn eine Anforderung abweicht oder Apple es besser löst; was im Web nicht geht, wird nachgebaut und als Abweichung
    genannt. **Vor jedem Muster** der Apple-Abgleich, **nach jeder Version** das Apple-Review (2.6). Prüfung: Selbstkontrolle;
    messbare HIG-Punkte `hig.mjs`.
24. **Backlog:** jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4); Priorität 1 hoch · 2 mittel · 3 niedrig, die höchste zuerst.
    Neue Themen schlägt Claude einzeln vor und fragt ‚Ins Backlog übernehmen?‘ und die Priorität – mit Empfehlung. Wünsche, Fragen
    und Prüfpunkte trägt Claude sofort ein und erinnert an Offenes (2.4). Prüfung: Selbstkontrolle; `checkCollab`.
25. **Ablauf einer Änderung:** nachfragen, bis alles geklärt ist → Muster (Nr. 6, 23) mit Fall-Liste (Nr. 1) → allgemein oder App
    (Nr. 4) → in ‚0. Nächste Version‘ eintragen, nicht sofort bauen (auch kleine Fehler aus dem Testen) → bauen nur nach Nr. 8
    und 21. Nur ändern, was besprochen wurde; Auffälliges nennen statt eigenmächtig ändern (offensichtliche Fehler beheben und
    ausdrücklich erwähnen). Prüfung: Selbstkontrolle.

**D. Bauen und Veröffentlichen**

8. **Sammelversionen und kleine Versionen:** geklärte Punkte sammeln (‚0. Nächste Version‘) und gemeinsam in **einer** Version
   bauen: 2–3 zusammengehörige Punkte, höchstens 2 Themen; keine eigene Version für eine einzelne Kleinigkeit. Claude fragt nach
   einer Version, wenn ein Thema geklärt ist, 2–3 Punkte bereit sind oder der Nutzer ‚Version bauen‘ sagt – mit allen bereiten
   Punkten. **Korrekturen sofort:** Fehler aus einer Prüfrunde als eigene Korrekturversion vor allem Neuen, auch ohne
   Datenverlust (vorher fragen). Prüfung: Selbstkontrolle; `checkCollab`.
9. **Veröffentlichen mit dem Skript** `werkzeug/veroeffentlichen.mjs` (Befehle: AppDesign-`CLAUDE.md`): `vorbereiten` erhöht alle
   Versionen, Claude schreibt CHANGELOG mit Prüfliste (2.3), Backlog und Richtlinien, `los` prüft, veröffentlicht **erst
   AppDesign, dann die App** und wartet auf Pages. ‚Fertig‘ erst, wenn beide Pages-Läufe erfolgreich sind und die Dateien die
   neue Version enthalten (`APP_VERSION`, `AD_NEEDED`, `AD_VERSION`); vorher keine Aufforderung zum Testen. Prüfung: das Skript
   (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`), `doku.mjs`.
10. **Ablage und feste Fassung:** ein Repo pro App (Pages aus `main`); Allgemeines in AppDesign (Designrichtlinie 14),
    App-Eigenes im App-Repo (`CLAUDE.md`, `PROMPT.md`, `CHANGELOG.md`, `BACKLOG.md`, App-Richtlinie) ohne Wiederholungen.
    Gemeinsames wird in AppDesign geändert und mit jeder App getestet, die es nutzt. Jede App bindet genau ihre feste
    AppDesign-Fassung ein und wird nur nach Rückfrage gehoben. Prüfung: `version.mjs` (R-10.3); Rückfrage: Selbstkontrolle.
11. **Bericht** nach einer Version **und jede Bitte, am Gerät zu prüfen** (Muster, Versuch, Messung, Prüfpunkt): Bericht (3–5
    Sätze) → vollständige Aufzählung aller Änderungen → alle offenen Prüfpunkte vollständig im Chat → Auswahlfenster zur
    Rückmeldung; nie nur ein Verweis aufs CHANGELOG. Ist ein Fehler durchgerutscht, steht dabei, warum die Prüfung ihn übersah.
    Einzelheiten 2.3. Prüfung: `doku.mjs` (Prüfliste); sonst Selbstkontrolle.

**E. Sitzungen und Übergabe**

12. **Ein Thema je Sitzung.** Lange Sitzungen werden langsam und automatisch zusammengefasst – dabei gehen Einzelheiten
    verloren. Prüfung: Selbstkontrolle.
13. **Automatische Übergabe ab etwa 300.000 Token:** Hat der Kontext etwa **300.000 Token** erreicht (‚⚠ Übergabe fällig‘ in
    der Zeitzeile) oder wurde die Sitzung schon zusammengefasst, übergibt Claude **ohne Rückfrage**, sobald der laufende Schritt
    abgeschlossen ist (Version veröffentlicht und Bericht gegeben bzw. Auswertung eingetragen) – nie mitten in einem Bau oder
    Prüflauf: Übergabe schreiben (Nr. 14) und die neue Sitzung selbst starten – Opus 5.5, Aufwand hoch, Name
    `<App> <Chatnummer> – <Thema>` (2.5). Eine offene Frage an den Nutzer (z. B. Rückmeldung zu Prüfpunkten) geht mit in die
    Übergabe und wird in der neuen Sitzung gestellt. Ist ein Thema vorher abgeschlossen, schlägt Claude die Übergabe vor. Prüfung:
    Selbstkontrolle anhand der Zeitzeile.
14. **Übergabe** sofort nach `UEBERGABE.md` im Repo AppDesign schreiben und veröffentlichen, mit Starttext (2.5); am Ende der
    Antwort fett **‚Die Sitzung (Chat) ist damit beendet!‘**, danach nur die Zeitzeile. Prüfung: Selbstkontrolle.
15. **Beginn einer Sitzung:** gezielt lesen – `UEBERGABE.md`, Abschnitte 0 und 1 dieser Datei, die Überschriften der
    Designrichtlinien; alles Weitere (andere Abschnitte, Katalog, Backlog, CHANGELOG, PROMPT.md) nur, soweit die Aufgabe es
    braucht. Dann das **Lagebild** (Versionen, offene Prüfpunkte, Backlog-Spitze, Modell und Aufwand – 2.5), dann die Arbeit.
    Prüfung: `doku.mjs` (beide `CLAUDE.md` nennen zuerst `UEBERGABE.md`); sonst Selbstkontrolle.
16. **Übergabe statt Gedächtnis:** jede Vereinbarung sofort an ihre Stelle in den Richtlinien (Nr. 3); was nicht auf GitHub
    steht, gibt es in der nächsten Sitzung nicht. Prüfung: Selbstkontrolle.
17. **Rückmeldung kurz:** Nummer, ‚nicht ok‘ und ein Stichwort genügen; bei Unklarem fragt Claude nach. Prüfung:
    Selbstkontrolle.

**F. Widerspruch**

18. **Massiv widersprechen bei Regelbruch:** Weicht eine Anforderung offensichtlich und grundlegend vom Regelwerk ab, widerspricht
    Claude deutlich und sofort (welche Regel, was sie schützt, Folgen, Empfehlung), trägt sie **nicht** ins Backlog ein und setzt
    sie **nicht** um – erst wenn der Nutzer die Umsetzung ausdrücklich anordnet (‚Trotzdem umsetzen – Umsetzungspflicht‘; ein
    ‚Ja‘ oder die Wiederholung genügt nicht). Das Auswahlfenster fragt ‚Trotz Abweichung von R-… umsetzen (Umsetzungspflicht)?‘.
    Kleine, begründete Abweichungen (z. B. von der HIG) bleiben eine Rückfrage mit Empfehlung. Prüfung: Selbstkontrolle.

**G. Start einer Sitzung**

19. **Startfrage:** Beginnt eine Sitzung ohne konkreten Auftrag (‚Start‘, ‚Hallo‘ oder nur angehängte Repos), liest Claude
    gezielt (Nr. 15) `UEBERGABE.md` und die Backlog-Köpfe und zeigt **zuerst** das Auswahlfenster ‚Was möchtest du als Nächstes
    tun?‘: je angehängtem Repo eine Möglichkeit mit Version und Backlog-Spitze (offene Prüfpunkte zuerst), bei
    **ReiseLogBuch-Import** ‚Reiselogbücher konvertieren‘, dazu ‚Ich schreibe im Chat‘; bei mehr als 3 Repos die mit der höchsten
    Priorität, der Rest über ‚Ich schreibe im Chat‘. Eine Sitzung beginnt erst mit einer Nachricht des Nutzers (ein Wort genügt); hat sie einen Starttext mit Auftrag, gilt der Auftrag. Prüfung:
    Selbstkontrolle.

**H. Fehler am Gerät**

20. **Erst messen, dann nachbilden:** Bei Bewegungsfehlern am Gerät (Zittern, Springen, Rollen) zuerst eine **Messung am Gerät**
    (Messmodus, Designrichtlinie 15.21); die feste Prüfung muss genau das gemessene Muster rot zeigen (Nr. 1). Für Safari gibt es
    **ein** Modell (`tests/safari.mjs`), jede Abweichung vom Gerät wird dort korrigiert; jede gefundene Safari-Eigenheit kommt
    mit Quelle in Designrichtlinie 13. Bis der Nutzer ok meldet, heißt es im Bericht ‚in der Nachbildung behoben, am Gerät zu
    bestätigen‘. Muster mit Messung: 2.7. Prüfung: `safari.mjs`, Messdateien nachspielen mit `abspielen.mjs`.

---

## 1. Sprache und Ton

- Deutsch, kurz und klar.
- **Per du:** Claude spricht den Nutzer immer mit ‚du‘ an – nie ‚Sie‘ und nie ‚ihr‘, auch nicht in Dateien, Prüflisten und
  Auswahlfenstern.
- **Jede Meldung deutsch:** auch kurze Zwischenmeldungen während der Arbeit, Statuszeilen, Bildunterschriften zu Screenshots
  und Fragen im Auswahlfenster – nie englisch. Englisch bleiben nur Code, Dateinamen und Fachbegriffe ohne gängiges deutsches
  Wort.
- Schaltflächen im Chat mit ihren Lucide-Icon-Namen benennen (z. B. „pencil“, „trash“), nicht mit Emojis.

Prüfung: Selbstkontrolle.

---

## 2. Einzelheiten und Formate

### 2.1 Rückfragen und Auswahlfenster

- Rückfragen so, dass kurz geantwortet werden kann: Ja/Nein- oder Ok-Fragen, wo möglich; mehrere Möglichkeiten als
  Aufzählung a, b, c …; Fragen nummeriert (1, 2, 3 …); die eigene Empfehlung kurz dazu.
- **Auswahlfenster:** bis zu 4 Fragen, je 2–4 Möglichkeiten; die Empfehlung zuerst mit ‚(Empfohlen)‘, immer ‚Ich schreibe im
  Chat‘. Im Fenster steht nur eine **kurze Frage** mit den Schaltflächen – keine Erklärtexte, keine Zeitangaben. **Ausnahme:** Bei
  jeder Bitte, am Gerät zu prüfen oder auszuprobieren, stehen Link, nummerierte Schritte und ‚erwartet: …‘ kurz auch in der
  Frage. Das Feld ‚Sonstiges‘ schneidet lange Texte ab.
- **Ein Fenster je Antwort, die Erklärung davor:** Text am Anfang einer Antwort kommt vor dem Auswahlfenster beim Nutzer an, Text
  zwischen zwei Fenstern derselben Antwort und die Vorschau-Funktion nicht. Muster, Beispiele und längere Erklärungen, die der
  Nutzer vor der Entscheidung lesen muss, kommen **als Datei oder Bild vor dem Fenster**. Mehrere Themen nacheinander: je Antwort
  eines (ganze Zeile, Einschätzung, Kachel), der Nutzer schreibt ‚w‘ für das nächste.
- Schließt der Nutzer das Fenster und antwortet im Text, gilt die Antwort; bei den nächsten Fragen kommt trotzdem wieder das
  Auswahlfenster.
- Eine **Antwortzeile zum Kopieren** (z. B. `1 ja · 2 a · 3 ja`) gibt es nur bei mehr als 4 Fragen – dann ist sie der einzige
  Weg.
- **Reihenfolge in einer Antwort:** erst die Arbeit, dann das Auswahlfenster, nach der Antwort die Zusammenfassung; die
  Zeitzeile steht immer ganz am Ende, nach der letzten Antwort im Fenster. Solange ein Fenster offen ist, ist die Antwort nicht
  fertig. Die laufende Zeitanzeige während der Bearbeitung kommt von der App.

### 2.2 Zeit und Token (Pflicht, am Ende jeder Antwort)

- Claude erzeugt die Zeile mit `node ../AppDesign/werkzeug/messung.mjs` (in AppDesign `node werkzeug/messung.mjs`) und übernimmt
  sie unverändert – nie schätzen, nie weglassen; meldet das Werkzeug einen Fehler, steht der Fehler statt der Zeile da. Format,
  klein gesetzt: `<sub>⏱ mm:ss · Token vorige Antwort: N neu · N aus Zwischenspeicher · N geschrieben · Kontext N</sub>`
  (ab 60 Minuten hh:mm:ss). Nutzung in Prozent und Rücksetzzeiten zeigt nur die Claude-App.
- **Zeit:** Arbeitszeit ab dem Eingang der Nachricht des Nutzers (Zeitpunkt aus den Sitzungsdaten – das Nachdenken davor zählt
  mit) bis zur Übergabe, ohne Wartezeit in Auswahlfenstern; mit jeder neuen Nachricht des Nutzers wieder ab 00:00;
  Systemmeldungen zählen nicht als Nachricht.
- **Token:** aus den Sitzungsdaten der **vorigen** Antwort (genaue Werte; die laufende wird erst an ihrem Ende gezählt), jeder
  Modell-Aufruf einmal; ‚neu‘ = Eingabe + Ausgabe.
- **Kontext:** Größe der Sitzung = Eingabe + Zwischenspeicher + geschrieben des letzten eigenen Modell-Aufrufs. Ab 300.000 oder
  nach einer automatischen Zusammenfassung hängt das Werkzeug ‚⚠ Übergabe fällig‘ an; dann übergibt Claude nach dem laufenden
  Schritt von selbst (0 Nr. 13).
- Prüfung: `tests/messung.mjs` (Gegenprobe `--gegenprobe`).

### 2.3 Bericht, Prüfpunkte und Rückmeldung

- **Bericht nach einer Version** (0 Nr. 11): je Punkt ‚entspricht HIG‘ oder ‚weicht ab, weil …‘ und das Ergebnis des HIG- und
  Regel-Prüfskripts (Apple-Review); Erinnerung, die App neu zu starten; Screenshots in Viererpaketen; am Ende ausdrücklich: ‚Bitte
  zuerst alle Prüfpunkte testen – neue Punkte setze ich erst um, wenn die Prüfliste erledigt und gefundene Fehler beseitigt sind.‘
  (0 Nr. 22). Bei Mustern und Versuchen stehen im Chat der vollständige Link und nummerierte Schritte mit ‚Erwartet: …‘.
- Je gebauter Version **ein Prüfpunkt** (z. B. P-54) mit nummerierter Prüfliste (P-54/0, P-54/1 …) – im CHANGELOG und im Chat
  wörtlich gleich. Die Liste beginnt mit **/0 ‚Version prüfen‘**: auf jedem Gerät die Versionszeile ansehen (App-Version **und**
  AppDesign-Version); erst wenn beide stimmen, wird weiter getestet.
- Jeder Prüfpunkt prüft genau eine Sache, als Schritt-für-Schritt-Anleitung: 1. was antippen bzw. einstellen (Gerät,
  quer/hoch, hell/dunkel), 2. was tun, 3. ‚Erwartet: …‘. Bei jedem Schritt, der etwas anzeigt, steht die erwartete Meldung **auf
  jedem beteiligten Gerät** wörtlich; ein automatischer Test prüft genau diese Texte auf beiden Geräten. Verweise wie ‚wie oben‘
  oder ‚siehe Tabelle‘ ersetzen keine Schritte.
- Am Ende **jeder** Umsetzung – nach einer Version und ebenso nach vorbereiteten, noch nicht gebauten Änderungen – stehen alle
  offenen Prüfpunkte einzeln im Chat, auch die früherer Versionen.
- **Rückmeldung:** Der Bericht endet immer mit einem Auswahlfenster, z. B. ‚P-54: Wie ist die Prüfung ausgegangen?‘ – ‚Alles ok‘ ·
  ‚Nicht ok – ich schreibe im Chat‘ · ‚Ich prüfe später‘ · ‚Ich schreibe im Chat‘ – auch wenn die Version im Hintergrund fertig
  wird: nur ein Auswahlfenster löst auf dem iPad eine Push-Nachricht aus. Antwort z. B. ‚alles ok‘ oder ‚ok bis auf 3‘;
  Abweichungen kommen wieder in ‚0. Nächste Version‘.
- Prüfung: `doku.mjs` (Prüfliste der neuesten Version beginnt mit /0, nennt App- und AppDesign-Version, jeder Punkt mit
  nummerierten Schritten und ‚Erwartet‘).

### 2.4 Backlog

Jede `BACKLOG.md` hat oben die Zeile ‚Stand · Aktuelle Version‘ und diese Abschnitte; ein Punkt wandert von unten nach oben
(in Klärung → Nächste Version → Prüfen → Erledigt):

- **0. Nächste Version X.Y.Z:** fertig geklärte Punkte (Status **bereit**: Muster bestätigt, allgemein/App geklärt, Texte fest)
  mit Spalte ‚bereit seit‘ und der Zeile ‚N Punkte bereit‘.
- **1. Auf dem iPad prüfen:** je gebauter Version ein Prüfpunkt mit Prüfliste.
- **2. Weitere Themen (in Klärung):** Status **offen**.
- **3. Später:** Ideen.
- **Erledigt:** mit Version und Datum.

Jeder Punkt: Nummer, Priorität, Thema, allgemein oder App, Status (offen · bereit · prüfen · später). Nach jeder Version: die
gebauten Punkte aus ‚0.‘ entfernen, den Prüfpunkt unter ‚1.‘ anlegen, ‚Erledigt‘ ergänzen. Neue Themen: ‚Ins Backlog
übernehmen? Ja/Nein‘ und ‚Mit welcher Priorität? a) 1 hoch · b) 2 mittel · c) 3 niedrig‘, mit ‚So macht es Apple‘ und
Empfehlung. **Erinnerung:** zu Beginn einer Sitzung (kurze Liste) und am Ende jeder Antwort, in der etwas gebaut oder entschieden
wurde – zuerst ‚Nächste Version X.Y.Z: N Punkte bereit (…)‘, dann ‚Offen im Backlog: …‘.

### 2.5 Übergabe, neue Sitzung, Lagebild

- **`UEBERGABE.md`** enthält nur den Stand der Sitzung: Lagebild (Versionen, Chatnummer, Sitzungsgröße, offene Prüfpunkte),
  Ergebnisse, nächster Schritt, danach, neue Vereinbarungen (stehen zusätzlich schon in den Richtlinien), was zuerst zu lesen ist,
  Starttext. Dauerhaftes (Arbeitsumgebung, Befehle) steht in der AppDesign-`CLAUDE.md`.
- Der **Starttext** steht immer als Codeblock (```), damit er mit der Kopieren-Schaltfläche übernommen werden kann, und nennt,
  wo auf GitHub alles liegt (Repo, Branch `main`, Dateien).
- **Neue Sitzung starten:** `create_session` in derselben Umgebung mit `model: claude-opus-5-5`, Repo AppDesign angehängt; die
  App-Repos holt die neue Sitzung selbst dazu (`add_repo`), der Starttext ist ihre erste Nachricht. Scheitert das Starten, öffnet
  der Nutzer einen neuen Chat in derselben Umgebung und fügt den Starttext ein. **Name** `<App> <Chatnummer> – <Thema>` mit
  vierstelliger, aufsteigender Nummer (z. B. ‚Reiselogbuch 0001 – AppDesign 4.12.0‘); jede Sitzung, die die nächste startet,
  erhöht die Nummer um 1, die nächste steht in `UEBERGABE.md`; Claude nennt dem Nutzer den Namen.
- **Aufwand hoch:** `create_session` kann ihn nicht setzen; er kommt aus der Umgebungsvariablen `CLAUDE_CODE_EFFORT_LEVEL=high`
  (setzt der Nutzer: Umgebungsmenü in der Titelleiste → Bearbeiten → Umgebungsvariablen) und gilt dann auch für Chats, die der
  Nutzer selbst öffnet.
- **Lagebild prüft Modell und Aufwand:** Modell mit `get_session`, Aufwand mit `echo $CLAUDE_CODE_EFFORT_LEVEL` und – maßgeblich –
  `"effort"` der Modell-Aufrufe in der Sitzungsdatei `/root/.claude/projects/…/*.jsonl`. Die Claude-App zeigt im Chat ggf.
  ‚mittel‘, obwohl die Aufrufe mit ‚hoch‘ laufen – dann stellt der Nutzer sie zur Sicherheit auf ‚hoch‘. Ist es nicht Opus 5.5
  bzw. nicht ‚hoch‘, weist Claude darauf hin: für diese Sitzung `/model` bzw. `/effort high`, dauerhaft die Umgebungsvariable.
  Gelesen wird zu Beginn wenig, weil alles Gelesene bei jedem weiteren Schritt mitverarbeitet wird.

### 2.6 Apple-Abgleich, Apple-Review, Vergleichsbilder

- **Apple-Abgleich vor jedem Muster (0 Nr. 23):** kurz dabei, welche Apple-App es so löst (z. B. Notizen, Erinnerungen,
  Kontakte, Dateien, Safari, Mail, Numbers), welche Punkte der HIG-Checkliste (Designrichtlinie 16) und welche Regeln des
  Katalogs (17) betroffen sind und wo bewusst abgewichen wird – mit Grund. HIG und Katalog werden vorher geprüft, nicht erst nach
  einer Meldung. Was im Web nicht geht (z. B. SF Symbols, echte Systemmenüs), wird so nah wie möglich nachgebaut.
- **Apple-Review nach jeder Version:** im Bericht (2.3).
- **Vergleichsbilder:** Claude bittet bei Bedarf konkret um 1–4 Screenshots aus Apple-Apps (iPad oder iPhone). Sie liegen in
  AppDesign unter `apple-referenz/<Gerät>/<App>/` mit einer `README.md` (je Bild: was es zeigt, was wir daraus lernen); Muster
  stehen neben dem Vorbild. Das Repo ist öffentlich: private Inhalte (Namen, Ordner, Texte) verpixelt Claude vor dem Ablegen und
  zeigt die Bilder vorher zur Freigabe.

### 2.7 Muster mit Messung (0 Nr. 20)

Ein Muster, das am Gerät misst, wird wie die App geprüft, **bevor** der Nutzer es bekommt: es läuft automatisch im Safari-Modell
(Chromium und WebKit), jeder Fall des Versuchs wird durchgespielt, was das Muster aufzeichnet und auswertet, muss zu den Bildern
des Modells passen, und eine **Gegenprobe** mit absichtlich eingebautem Sprung muss rot werden. Das Muster **führt durch den
Versuch**: feste Liste der Fälle, oben ‚Nächster Schritt: …‘, erledigte Fälle abgehakt, ‚Messung teilen‘ erst, wenn alle Fälle
drin sind (oder ausdrücklich ‚trotzdem teilen‘). Am Gerät zeigt es nur **‚aufgenommen‘** – bewertet wird ausschließlich aus den
Rohdaten durch Claude, damit keine falsche Anzeige in die Irre führt.

---

## Zuordnung alt → neu

Bis 2.16.0 gab es neben Abschnitt 0 die Abschnitte 2–9 und drei Kästen oben; 0 Nr. 13–15 und 20 waren
ausführlicher (jetzt 2.5 und 2.7). Sie stehen jetzt hier (Verweise in Changelogs,
im Verlauf und in Kommentaren der Prüfungen nennen noch die alten Stellen):

| bis 2.16.0 | ab 2.17.0 |
|---|---|
| Kasten ‚nie ohne Freigabe bauen‘ | 0 Nr. 21 |
| Kasten ‚Sammelversionen‘ | 0 Nr. 8 |
| Kasten ‚erst prüfen, dann Neues‘ | 0 Nr. 22 und 2.3 |
| Abschnitt 2 Rückfragen – Antwortformat | 2.1 und 2.2 |
| Abschnitt 3 Apple-like entwickeln | 0 Nr. 23 und 2.6 |
| Abschnitt 4 Backlog | 0 Nr. 24 und 2.4 |
| Abschnitt 5 Ablauf einer Änderung | 0 Nr. 25 |
| Abschnitt 6 Sammelversionen | 0 Nr. 8 und 2.3 |
| Abschnitt 7 Nach jeder Version (Prüfliste mit /0, Meldung je Gerät, Fehler am Gerät) | 0 Nr. 1, 2, 9, 11 und 22; 2.3 |
| Abschnitt 8 Versionen | Designrichtlinie allgemein 11 |
| Abschnitt 9 Ablage | 0 Nr. 10 |

---

## Versionsgeschichte

| Version | Datum | Art | Inhalt |
|---|---|---|---|
| 2.19.0 | 23.10.2026 | Neben | **0 Nr. 13 automatische Übergabe (Nutzer 23.10.2026):** bei ‚⚠ Übergabe fällig‘ übergibt Claude ohne Rückfrage, sobald der laufende Schritt abgeschlossen ist, und startet die neue Sitzung selbst; offene Fragen gehen mit in die Übergabe (2.2) |
| 2.18.0 | 22.10.2026 | Neben | **A-41:** 0 Nr. 13 Übergabe wieder erst ab etwa 300.000 Token (gleiche Grenze wie das Werkzeug, 2.2); 0 Nr. 2 Hilfsagenten bzw. eigene Sitzungen parallel, wenn möglich und sinnvoll; 2.1 ein Auswahlfenster je Antwort mit der Erklärung davor, Themen einzeln nacheinander (‚w‘) |
| 2.17.0 | 21.10.2026 | Neben | **A-39 Konsolidierung:** Abschnitt 0 ist das eine Arbeitsmodell – die Kästen oben und die Abschnitte 2–9 sind in 0 Nr. 8, 21–25 und den neuen Abschnitt 2 ‚Einzelheiten und Formate‘ eingegangen (Zuordnung alt → neu); jede Regel nennt ihre Prüfung; Geschichte (‚seit …‘, ‚Nutzer …‘, ‚Anlass …‘) nur noch hier. Neu 0 Nr. 13: Übergabe schon ab etwa 150.000 Token Kontext (statt 300.000; das Werkzeug warnt weiter ab 300.000). Geklärt (Nutzer 21.10.2026, F-2 bis F-4): im Auswahlfenster nur die kurze Frage, bei Bitten, am Gerät zu prüfen, auch Link und Schritte; Übergabe vorschlagen, bei Ja schreiben und die neue Sitzung selbst starten, Starttext als Rückfall; keine eigene Version für eine einzelne Kleinigkeit |
| 2.16.0 | 21.10.2026 | Neben | 0 Nr. 11 ergänzt: Link und Schritte jeder Bitte, am Gerät zu prüfen, zusätzlich im Auswahlfenster selbst – der Text davor kam nicht an (Nutzer 21.10.2026, Sitzung 0023) |
| 2.15.0 | 20.10.2026 | Neben | 0 Nr. 20 ergänzt: Muster mit Messung vor der Übergabe im Safari-Modell gegen die Rohdaten geprüft (mit Gegenprobe), führen Schritt für Schritt durch den Versuch, zeigen am Gerät nur ‚aufgenommen‘ (Nutzer 20.10.2026, A-36) |
| 2.14.1 | 20.10.2026 | Korrektur | 0 Nr. 15: Aufwand aus der Sitzungsdatei (`"effort"`) nennen; die App zeigte ‚mittel‘, obwohl alle Aufrufe mit ‚hoch‘ liefen – dann in der App auf ‚hoch‘ stellen (Nutzer 20.10.2026) |
| 2.14.0 | 20.10.2026 | Korrektur | 0 Nr. 15: zu Beginn auch Abschnitt 1 ‚Sprache und Ton‘ lesen – in 0019 sprach Claude den Nutzer mit ‚Sie‘ an, weil Abschnitt 1 (per du) nicht im Startumfang lag (Nutzer 20.10.2026) |
| 2.13.0 | 19.10.2026 | Neben | 0 Nr. 13 und 15 ergänzt: neue Sitzungen mit Opus 5.5 und Aufwand hoch (`CLAUDE_CODE_EFFORT_LEVEL=high` in der Umgebung); zu Beginn Modell und Aufwand prüfen und im Lagebild nennen (Nutzer 19.10.2026) |
| 2.12.0 | 19.10.2026 | Neben | 0 Nr. 11 ergänzt: jede Bitte, etwas am Gerät zu prüfen oder auszuprobieren (Muster, Versuch, Messung), enthält im Chat den vollständigen Link und nummerierte Schritte mit ‚Erwartet: …‘ (Nutzer 19.10.2026) |
| 2.11.0 | 19.10.2026 | Neben | 0 Nr. 20 neu (Abschnitt G): bei Bewegungsfehlern am Gerät zuerst messen, ein Safari-Modell, Bericht ‚in der Nachbildung behoben, am Gerät zu bestätigen‘, Safari-Eigenheiten mit Quelle in Designrichtlinie 13 (Nutzer 19.10.2026) |
| 2.10.1 | 18.10.2026 | Korrektur | 0 Nr. 11 verschärft: alle Prüfpunkte vollständig Schritt für Schritt im Chat (nie nur Verweis aufs CHANGELOG), danach das Auswahlfenster (Regel war nach 3.22.0 nicht eingehalten) |
| 2.10.0 | 18.10.2026 | Neben | 0 Nr. 11: Bericht nach einer Version endet immer mit einem Auswahlfenster zur Rückmeldung (Push-Nachricht auf dem iPad, Wunsch des Nutzers) |
| 2.9.0 | 18.10.2026 | Neben | 0 Nr. 1: bei ‚nicht ok‘ zuerst den Ablauf des Nutzers als feste Prüfung nachbauen, rot gegen den veröffentlichten Stand, dann korrigieren (aus P-51/5 und P-52) |
| 2.8.0 | 17.10.2026 | Neben | §2: Zeile Zeit und Token endet mit ‚Kontext N‘, ab 300.000 ‚⚠ Übergabe fällig‘ (A-20) |
| 2.7.0 | 16.10.2026 | Neben | §2: Zeile Zeit und Token mit dem Werkzeug `werkzeug/messung.mjs`, ‚neu‘ = Eingabe + Ausgabe (A-12) |
| 2.6.0 | 16.10.2026 | Neben | Abschnitt 0 Nr. 19: Startfrage – Sitzung ohne Auftrag beginnt mit dem Auswahlfenster ‚Was möchtest du als Nächstes tun?‘ je angehängtem Repo (T-05) |
| 2.5.0 | 15.10.2026 | Neben | Abschnitt 1: per du (nie ‚Sie‘ oder ‚ihr‘); Abschnitt 0 Nr. 18: bei offensichtlichem Regelbruch massiv widersprechen, umsetzen erst nach ausdrücklicher Umsetzungspflicht |
| 2.4.0 | 15.10.2026 | Neben | A-07: zu Beginn gezielt lesen (0 Nr. 15, Hinweis oben) und nur ein voller Prüflauf je Version im Veröffentlichungs-Skript (0 Nr. 2, §7) |
| 2.3.2 | 14.10.2026 | Korrektur | Abschnitt 0 Nr. 9 und 10: Verweise auf das Veröffentlichungs-Skript und die feste Fassung (A-05 Version B) |
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
