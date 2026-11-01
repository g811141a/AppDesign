# Zusammenarbeit allgemein

**Version 3.5.0** · Stand 31.10.2026

Regeln für die Zusammenarbeit mit Claude bei allen iPad-Web-Apps von g811141a. Die Datei liegt im Design-Repo **AppDesign**
(g811141a/AppDesign); App-Eigenes steht in der `CLAUDE.md` des App-Repos. **Abschnitt 0 ist das Arbeitsmodell** (oben der Kasten ‚Immer‘ und ‚Jede
Antwort‘), Abschnitt 1 die Sprache, Abschnitt 2 die Einzelheiten und Formate. Jede Regel nennt ihre Prüfung – den
**Regelwächter** (Hooks, 2.8), eine Prüfdatei oder **Selbstkontrolle** (Claude prüft vor dem Senden selbst).

> **Hinweis für Claude:** Diese Regeln gelten in jeder Sitzung, auch nach langer Pause. Zu Beginn `UEBERGABE.md` und **diese ganze
> Datei** lesen, alles Weitere gezielt (Nr. 15).

---

## 0. Arbeitsmodell

> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Sammelversionen (Nr. 8) · nur Belegtes (Nr. 27) ·
> Regeln nur mit Genehmigung (Nr. 29).
>
> **Jede Antwort** (was mit **W** markiert ist, prüft der Regelwächter, 2.8; der Rest ist Selbstkontrolle vor dem Senden):
> 1. Erste Zeile jeder Ausgabe: die Uhrzeitzeile, die der Regelwächter liefert – nie selbst schätzen (Nr. 26, 2.2). **W**
> 2. Per du, deutsch, kurz (Abschnitt 1).
> 3. Nur Belegtes: jede Uhrzeit, Zahl, Version, jedes Prüfergebnis aus einem Werkzeug oder einer Datei dieser Sitzung (Nr. 27).
> 4. Bericht oder Bitte, am Gerät zu prüfen: alle offenen Usertests vollständig im Chat (Nr. 11, 2.3).
> 5. Wurde etwas gebaut oder entschieden: die Backlog-Erinnerung ‚Nächste Version …: N Punkte bereit (…) · Offen im Backlog: …‘ (2.4).
> 6. Ende jeder Antwort: ein Auswahlfenster – jede Frage dort, nie ‚Sag Bescheid‘; die Empfehlung zuerst mit ‚(Empfohlen)‘ und
>    Grund in der Beschreibung, immer ‚Ich schreibe im Chat‘; einzige Ausnahme die Übergabe (Nr. 28, 2.1). **W**
> 7. Ganz am Ende, nach dem Fenster: die Zeitzeile von `messung.mjs`, unverändert (2.2). **W**
> 8. Meldet der Regelwächter ‚⚠ Modell‘, steht es in der Antwort (2.5); steht ‚⚠ Übergabe fällig‘ in der Zeitzeile: nach dem
>    laufenden Schritt übergeben (Nr. 13).
> 9. Vor **jedem Auswahlfenster**: der Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs`, abgelesen (Nr. 28). **W**

Ziel: nichts vergessen, Fehler finden, bevor der Nutzer sie findet, schnell und sparsam arbeiten. Die Nummern bleiben fest
(Verweise in Code und Changelogs), neue Punkte bekommen die nächste freie Nummer. Einzelheiten und Formate: Abschnitt 2.

**Pflichten**

21. **Nie ohne ‚Ja‘ bauen:** Claude entscheidet nie selbst, eine Version zu bauen oder hochzuladen – auch nicht bei kleinen
    Korrekturen oder wenn die Bitte ‚korrigieren‘, ‚verbessern‘, ‚ausbessern‘ lautet. Vorher immer ‚Soll ich Version X.Y.Z mit …
    erstellen? Ja/Nein‘ (Kontextstand davor: Nr. 28). Gebaut wird erst nach einem
    ausdrücklichen ‚Ja‘ (eine Bitte um Korrektur ist keins). Bis dahin:
    erklären, Vorschlag machen, ins Backlog eintragen. Prüfung: Selbstkontrolle.
22. **Erst prüfen, dann Neues:** Nach jeder Version werden alle Testfälle (User) des Usertests geprüft und gefundene Fehler beseitigt, bevor Neues
    umgesetzt wird; jeder Bericht endet mit dem Hinweis darauf (2.3). Ausnahme: Der Nutzer besteht nach dem Hinweis darauf, zuerst
    Neues umzusetzen. Prüfung: Selbstkontrolle.
26. **Uhrzeit in der ersten Zeile:** Jede Ausgabe darüber, was das System tut (jede Antwort und jede Zwischenmeldung), beginnt
    mit der Uhrzeitzeile `<sub>Aktuelle Uhrzeit: hh:mm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Zeitabstand zu vorher: hh:mm)</sub>` –
    Format 2.2. Prüfung: Regelwächter (liefert die abgelesene Uhrzeit, prüft erste Zeile, Uhrzeit und Zeitabstand).
27. **Nur Belegtes:** Uhrzeiten, Zahlen, Versionen, Prüfergebnisse, Dateiinhalte und ‚So macht es Apple‘ nur aus einem Werkzeug,
    einer Datei oder einer Quelle **dieser** Sitzung; sonst ‚weiß ich nicht – ich prüfe es‘; Vermutungen heißen ‚Vermutung‘.
    Prüfung: Uhrzeit und Zeitzeile Regelwächter; sonst Selbstkontrolle mit Quelle im Bericht.
28. **Jede Frage im Fenster:** Jede Frage an den Nutzer kommt ins Auswahlfenster, und jede Antwort endet mit einem – nie ‚Sag
    Bescheid …‘ oder eine offene Frage im Text; einzige Ausnahme die Übergabe (Nr. 14). Unmittelbar vor jedem Fenster steht im Chat
    der Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs` – abgelesen, nie geschätzt; die Zeitzeile selbst steht nur ganz am
    Ende. Format 2.1. Prüfung: Regelwächter.
29. **Regeln nur mit Genehmigung:** Claude löscht, ändert oder ergänzt keine Regel – Zusammenarbeit, Designrichtlinien mit
    Regelkatalog, App-Richtlinien, `CLAUDE.md` – ohne dein ausdrückliches ‚Ja‘ zum Wortlaut. Vorher stehen alter und neuer Text im
    Chat, die Frage im Auswahlfenster: ‚Regel … so ändern? Ja/Nein‘. Das gilt auch für Korrekturen und Zusammenfassungen (Nr. 3).
    Prüfung: Selbstkontrolle.

**A. Testen und Qualität**

1. **Testfall-Liste vor jedem Bau:** Gerät (iPad, iPhone) × Lage × Darstellung × Handlung (drehen, wischen, Tastatur, abgleichen,
   teilen …) × Daten (leer, lang, viele); jeder Fall wird ein Testfall (automatisch) mit fester Prüfung, nach jeder Handlung gelten die Grundregeln (z. B. nach dem Drehen
   bleiben oberster Eintrag, Seitenleiste und Menüs). Die
   Liste kommt mit dem Muster; was nur das Gerät zeigt (Teilen-Menü, iCloud, Drucken, Silbentrennung, Wischgefühl), kommt als
   Testfall (User) in den Usertest. **‚Nicht ok‘ vom Gerät:** zuerst genau den Ablauf des Nutzers als feste Prüfung nachbauen (Ausgangszustand,
   Handgriffe, Safari-Eigenheiten einzeln und zusammen) – rot gegen den veröffentlichten Stand, für immer im vollen Lauf; dann
   beheben, dieselbe Lücke überall suchen, im Bericht sagen, warum die Prüfung sie übersah. Gelingt das Nachstellen nicht,
   fragt Claude nach. Prüfung: Selbstkontrolle; Grundregeln nach jedem Schritt `pruefe.mjs`.
2. **Prüfen parallel und sparsam:** `node tests/alle.mjs` in der App (Werkzeug `tests/lauf.mjs`: parallel, schnellste zuerst,
   Abbruch ab dem dritten roten Lauf, jeder rote Lauf am Ende einmal allein – grün heißt ‚wackelt‘ und wird gemeldet, Gegenprobe
   `--gegenprobe`). Während der Arbeit nur die betroffenen Prüfungen; **alle** (Chromium
   und WebKit, alle Ansichten, alle automatisch prüfbaren Regeln des Katalogs) genau **einmal je Version** im
   Veröffentlichungs-Skript, nicht zusätzlich vorher. Geräte-Regeln des Katalogs kommen als Testfall (User) in den Usertest, wenn die Version sie betrifft. Hilfsagenten bzw.
   eigene Sitzungen arbeiten parallel, **wenn möglich und sinnvoll**. Prüfung: `lauf.mjs` (Selbsttest `tests/lauf-selbsttest.mjs`).
3. **Regeln schlank halten:** Jede Regel steht an genau einer Stelle und nennt genau eine Prüfung; eine neue Regel ersetzt
   oder ergänzt eine bestehende, Regeln zum selben Thema werden zusammengefasst. Neue allgemeine Design-Regeln bekommen sofort
   eine Nummer im Katalog (Designrichtlinie 17) und eine automatische Prüfung, sonst ‚Gerät‘. Im Regeltext steht nur, was heute
   gilt; Geschichte steht in Versionsgeschichte und CHANGELOG. Prüfung: `doku.mjs` – `checkCatalog`, `checkCollab`.
4. **Allgemeine Regel immer erfragen:** Legt eine Eingabe des Nutzers eine Formatierung oder ein Verhalten fest, prüft Claude
   (mit Recherche), ob es eine allgemeine Regel werden sollte, und fragt bei jeder Design-Änderung verlässlich im Auswahlfenster
   ‚Als allgemeine Regel festhalten? Ja/Nein‘. Allgemeine Regeln sind die Grundlage jeder App (gleiche Schaltflächen an gleichen
   Stellen, gleiche Formatierung); in der App steht nur, was anders ist. Prüfung: Selbstkontrolle.
5. **Safari nachbilden:** wo Chrome anders arbeitet (Designrichtlinie 13); jeder Test läuft zusätzlich in WebKit (Setup-Skript
   der Umgebung ‚Standard‘). Prüfung: `pruefe.mjs`, Safari-Modell `safari.mjs`.

**B. Muster und Entscheidungen**

6. **Muster:** bei Gestaltungsfragen zuerst ein Muster – beim ersten 2–3 Varianten nebeneinander, bei kleinen Korrekturen eine;
   zuerst nur hell und quer, dunkel und hoch erst, wenn hell passt; Bilder in Viererpaketen. Prüfung: Selbstkontrolle.
7. **Auswahlfenster:** jede Frage als Ja/Nein oder klare Auswahl (Nr. 28), die Empfehlung zuerst, jedes Fenster mit ‚Ich schreibe
   im Chat‘ (gewählt → Claude beendet die Antwort). Längeres immer im Chat; Erklärungen, die der Nutzer vorher lesen muss, als
   Datei oder Bild vor dem Fenster. Format 2.1. Prüfung: Regelwächter (Empfehlung zuerst, ‚Ich schreibe im Chat‘ – schon vor dem
   Zeigen); `checkCollab` (keine Antwortzeile ohne ‚mehr als 4 Fragen‘, keine Muster im Fragetext).

**C. Apple, Backlog und Ablauf einer Änderung**

23. **Apple-like:** Aussehen, Aufbau und Bedienung wie die Apple-Apps auf iPad und iPhone. Bei jeder neuen Anforderung
    recherchiert Claude, wie Apple es löst (eigene Apps und HIG), nennt es (‚So macht es Apple: …‘) und schlägt vor – auch
    ungefragt, wenn eine Anforderung abweicht oder Apple es besser löst; was im Web nicht geht, wird nachgebaut und als Abweichung
    genannt. **Vor jedem Muster** der Apple-Abgleich, **nach jeder Version** das Apple-Review (2.6). Prüfung: Selbstkontrolle;
    messbare HIG-Punkte `hig.mjs`.
24. **Backlog:** jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4); Priorität 1 hoch · 2 mittel · 3 niedrig, die höchste zuerst.
    Neue Themen schlägt Claude einzeln vor und fragt ‚Ins Backlog übernehmen?‘ und die Priorität – mit Empfehlung. Wünsche, Fragen
    und Usertests trägt Claude sofort ein und erinnert an Offenes (2.4). Prüfung: Selbstkontrolle; `checkCollab`.
25. **Ablauf einer Änderung:** nachfragen, bis alles geklärt ist → Muster (Nr. 6, 23) mit Testfall-Liste (Nr. 1) → allgemein oder App
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
   Versionen, Claude schreibt CHANGELOG mit Testfällen (2.3), Backlog und Richtlinien, `los` prüft, veröffentlicht **erst
   AppDesign, dann die App** und wartet auf Pages. ‚Fertig‘ erst, wenn beide Pages-Läufe erfolgreich sind und die Dateien die
   neue Version enthalten (`APP_VERSION`, `AD_NEEDED`, `AD_VERSION`); vorher keine Aufforderung zum Testen. Prüfung: das Skript
   (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`), `doku.mjs`.
10. **Ablage und feste Fassung:** ein Repo pro App (Pages aus `main`); Allgemeines in AppDesign (Designrichtlinie 14),
    App-Eigenes im App-Repo (`CLAUDE.md`, `PROMPT.md`, `CHANGELOG.md`, `BACKLOG.md`, App-Richtlinie) ohne Wiederholungen.
    Gemeinsames wird in AppDesign geändert und mit jeder App getestet, die es nutzt. Jede App bindet genau ihre feste
    AppDesign-Fassung ein und wird nur nach Rückfrage gehoben. Prüfung: `version.mjs` (R-10.3); Rückfrage: Selbstkontrolle.
11. **Bericht** nach einer Version **und jede Bitte, am Gerät zu prüfen** (Muster, Versuch, Messung, Usertest): Bericht (3–5
    Sätze) → vollständige Aufzählung aller Änderungen → alle offenen Usertests vollständig im Chat → Auswahlfenster zur
    Rückmeldung; nie nur ein Verweis aufs CHANGELOG. Ist ein Fehler durchgerutscht, steht dabei, warum die Prüfung ihn übersah.
    Einzelheiten 2.3. Prüfung: `doku.mjs` (Testfälle); sonst Selbstkontrolle.

**E. Sitzungen und Übergabe**

12. **Ein Thema je Sitzung.** Lange Sitzungen werden langsam und automatisch zusammengefasst – dabei gehen Einzelheiten
    verloren. Prüfung: Selbstkontrolle.
13. **Automatische Übergabe ab etwa 300.000 Token:** Hat der Kontext etwa **300.000 Token** erreicht (‚⚠ Übergabe fällig‘ in
    der Zeitzeile) oder wurde die Sitzung schon zusammengefasst, übergibt Claude **ohne Rückfrage**, sobald der laufende Schritt
    abgeschlossen ist (Version veröffentlicht und Bericht gegeben bzw. Auswertung eingetragen) – nie mitten in einem Bau oder
    Prüflauf: Übergabe schreiben (Nr. 14) und die neue Sitzung selbst starten – Opus 5.5, Aufwand hoch, Name
    `<App> <Chatnummer> – <Thema>` (2.5). Eine offene Frage an den Nutzer (z. B. Rückmeldung zu Usertests) geht mit in die
    Übergabe und wird in der neuen Sitzung gestellt. Ist ein Thema vorher abgeschlossen, schlägt Claude die Übergabe vor. Prüfung:
    Selbstkontrolle anhand der Zeitzeile.
14. **Übergabe** sofort nach `UEBERGABE.md` im Repo AppDesign schreiben und veröffentlichen, mit Starttext (2.5); am Ende der
    Antwort fett **‚Die Sitzung (Chat) ist damit beendet!‘**, danach nur die Zeitzeile. Prüfung: Selbstkontrolle.
15. **Beginn einer Sitzung:** lesen – `UEBERGABE.md`, **diese ganze Datei** (einmal je Sitzung, etwa 14.000 Token), die
    Überschriften der Designrichtlinien; alles Weitere (Katalog, Backlog, CHANGELOG, PROMPT.md) nur, soweit die Aufgabe es braucht.
    Dann das **Lagebild** (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand – 2.5), dann die Arbeit. Prüfung:
    `doku.mjs` (beide `CLAUDE.md` nennen zuerst `UEBERGABE.md`, dann die ganze Zusammenarbeit); sonst Selbstkontrolle.
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
    tun?‘: je angehängtem Repo eine Möglichkeit mit Version und Backlog-Spitze (offene Usertests zuerst), bei
    **ReiseLogBuch-Import** ‚Reiselogbücher konvertieren‘, die Empfehlung zuerst mit ‚(Empfohlen)‘, dazu ‚Ich schreibe im Chat‘; bei mehr als 3 Repos die mit der höchsten
    Priorität, der Rest über ‚Ich schreibe im Chat‘. Eine Sitzung beginnt erst mit einer Nachricht des Nutzers (ein Wort genügt); hat sie einen Starttext mit Auftrag, gilt der Auftrag. Prüfung:
    Selbstkontrolle.

**H. Fehler am Gerät**

20. **Erst messen, dann nachbilden:** Bei Bewegungsfehlern am Gerät (Zittern, Springen, Rollen) zuerst eine **Messung am Gerät**
    (Messmodus, Designrichtlinie 15.21); die feste Prüfung muss genau das gemessene Muster rot zeigen (Nr. 1). Für Safari gibt es
    **ein** Modell (`tests/safari.mjs`), jede Abweichung vom Gerät wird dort korrigiert, nie nur in einer Prüfung; jede gefundene
    Safari-Eigenheit kommt
    mit Quelle in Designrichtlinie 13. Bis der Nutzer ok meldet, heißt es im Bericht ‚in der Nachbildung behoben, am Gerät zu
    bestätigen‘. Muster mit Messung: 2.7. Prüfung: `safari.mjs`, Messdateien nachspielen mit `abspielen.mjs`.

---

## 1. Sprache und Ton

- Deutsch, kurz und klar.
- **Per du:** Claude spricht den Nutzer immer mit ‚du‘ an – nie ‚Sie‘ und nie ‚ihr‘, auch nicht in Dateien, Testfällen und
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
- **Auswahlfenster:** bis zu 4 Fragen, je 2–4 Möglichkeiten; die Empfehlung zuerst mit ‚(Empfohlen)‘ (so geschrieben, nie
  ‚(Empfehlung)‘) und ihrem Grund in der Beschreibung, immer ‚Ich schreibe im Chat‘ – ausgenommen nur die Empfehlung bei der
  Rückmeldung zu einem Usertest (‚P-n: …‘, 2.3). Der Regelwächter lehnt ein Fenster ohne das schon vor dem Zeigen ab. Im Fenster steht nur eine **kurze Frage** mit den Schaltflächen – keine Erklärtexte, keine Zeitangaben. **Ausnahme:** Bei
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
- Prüfung: Regelwächter (Fenster, Empfehlung, ‚Ich schreibe im Chat‘, Zeitzeile nach dem letzten Fenster); sonst Selbstkontrolle.

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
- **Uhrzeitzeile (0 Nr. 26, erste Zeile jeder Ausgabe):** `<sub>Aktuelle Uhrzeit: hh:mm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Zeitabstand zu
  vorher: hh:mm)</sub>` – deutsche Zeit (Europe/Berlin), klein gesetzt wie die Zeitzeile, ein Leerzeichen nach ‚Uhrzeit:‘, fünf
  geschützte Leerzeichen vor der Klammer, ohne Leerzeile davor und danach; Zeitabstand = seit der letzten Uhrzeitzeile, bei der
  ersten Ausgabe einer Sitzung ‚–‘. Die fertige Zeile liefert der Regelwächter nach jeder Nachricht des Nutzers und nach jedem
  Werkzeug, sobald sich die Minute ändert (2.8); ohne Wächter liest Claude die Uhrzeit ab (`TZ=Europe/Berlin date +%H:%M`) –
  nie geschätzt. Prüfung: Regelwächter.

### 2.3 Bericht, Usertests und Rückmeldung

- **Bericht nach einer Version** (0 Nr. 11): je Punkt ‚entspricht HIG‘ oder ‚weicht ab, weil …‘ und das Ergebnis des HIG- und
  Regel-Prüfskripts (Apple-Review); Erinnerung, die App neu zu starten; Screenshots in Viererpaketen; am Ende ausdrücklich: ‚Bitte
  zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.‘
  (0 Nr. 22). Bei Mustern und Versuchen stehen im Chat der vollständige Link und nummerierte Schritte mit ‚Erwartet: …‘.
- Je gebauter Version **ein Usertest** (z. B. P-54) mit nummerierten Testfällen (User) (P-54/0, P-54/1 …) – im CHANGELOG unter
  ‚Testfälle P-54‘ und im Chat wörtlich gleich. Die Testfälle beginnen mit **/0 ‚Version prüfen‘**: auf jedem Gerät die Versionszeile ansehen (App-Version **und**
  AppDesign-Version); erst wenn beide stimmen, wird weiter getestet.
- Jeder Testfall (User) prüft genau eine Sache, als Schritt-für-Schritt-Anleitung: 1. was antippen bzw. einstellen (Gerät,
  quer/hoch, hell/dunkel), 2. was tun, 3. ‚Erwartet: …‘. Bei jedem Schritt, der etwas anzeigt, steht die erwartete Meldung **auf
  jedem beteiligten Gerät** wörtlich; ein automatischer Test prüft genau diese Texte auf beiden Geräten. Verweise wie ‚wie oben‘
  oder ‚siehe Tabelle‘ ersetzen keine Schritte.
- Am Ende **jeder** Umsetzung – nach einer Version und ebenso nach vorbereiteten, noch nicht gebauten Änderungen – stehen alle
  offenen Usertests einzeln im Chat, auch die früherer Versionen.
- **Rückmeldung:** Der Bericht endet immer mit einem Auswahlfenster, z. B. ‚P-54: Wie ist die Prüfung ausgegangen?‘ – ‚Alles ok‘ ·
  ‚Nicht ok – ich schreibe im Chat‘ · ‚Ich prüfe später‘ · ‚Ich schreibe im Chat‘ – auch wenn die Version im Hintergrund fertig
  wird: nur ein Auswahlfenster löst auf dem iPad eine Push-Nachricht aus. Antwort z. B. ‚alles ok‘ oder ‚ok bis auf 3‘;
  Abweichungen kommen wieder in ‚0. Nächste Version‘.
- Prüfung: `doku.mjs` (Testfälle der neuesten Version beginnen mit /0, nennen App- und AppDesign-Version, jeder Testfall mit
  nummerierten Schritten und ‚Erwartet‘).

### 2.4 Backlog

Jede `BACKLOG.md` hat oben die Zeile ‚Stand · Aktuelle Version‘ und diese Abschnitte; ein Punkt wandert von unten nach oben
(in Klärung → Nächste Version → Prüfen → Erledigt):

- **0. Nächste Version X.Y.Z:** fertig geklärte Punkte (Status **bereit**: Muster bestätigt, allgemein/App geklärt, Texte fest)
  mit Spalte ‚bereit seit‘ und der Zeile ‚N Punkte bereit‘.
- **1. Auf dem iPad prüfen:** je gebauter Version ein Usertest mit Testfällen.
- **2. Weitere Themen (in Klärung):** Status **offen**.
- **3. Später:** Ideen.
- **Erledigt:** mit Version und Datum.

Jeder Punkt: Nummer, Priorität, Thema, allgemein oder App, Status (offen · bereit · prüfen · später). Nach jeder Version: die
gebauten Punkte aus ‚0.‘ entfernen, den Usertest unter ‚1.‘ anlegen, ‚Erledigt‘ ergänzen. Neue Themen: ‚Ins Backlog
übernehmen? Ja/Nein‘ und ‚Mit welcher Priorität? a) 1 hoch · b) 2 mittel · c) 3 niedrig‘, mit ‚So macht es Apple‘ und
Empfehlung. **Erinnerung:** zu Beginn einer Sitzung (kurze Liste) und am Ende jeder Antwort, in der etwas gebaut oder entschieden
wurde – zuerst ‚Nächste Version X.Y.Z: N Punkte bereit (…)‘, dann ‚Offen im Backlog: …‘.

**Nummern und Präfixe** (seit 2.20.0, APD-78): eine Nummer bezeichnet überall genau eine Sache · nie wiederverwenden, nie
umnummerieren (Ersatz = neue Nummer mit ‚ersetzt …‘ / ‚ersetzt durch …‘) · das Präfix sagt Ort oder Art, nie den Zustand (Status,
Priorität, Version sind Spalten) · Großbuchstaben, Bindestrich, Nummer ohne führende Nullen · Unterpunkte mit Schrägstrich und
Elternnummer.

| Präfix | Bedeutung | Wo festgelegt | Beispiel |
|---|---|---|---|
| **APD-n** | Thema im Backlog von AppDesign – behält die Nummer bis ‚Erledigt‘ | AppDesign `BACKLOG.md` | APD-78 |
| **RLB-n** | Thema im Backlog des Reiselogbuchs | ReiseLogBuch `BACKLOG.md` | RLB-101 |
| **RLI-n** | Thema von ReiseLogBuch-Import (das erste legt dort `BACKLOG.md` an) | ReiseLogBuch-Import | RLI-1 |
| *weitere App* | drei Buchstaben, beim Anlegen der App hier eingetragen | Zusammenarbeit 2.4 | – |
| **P-n** | **Usertest:** alle Testfälle (User) einer Version, ein Zähler über alle Repos | Backlog ‚Auf iPad und iPhone prüfen‘, CHANGELOG | P-74 |
| **P-n/m** | **Testfall (User):** ein Schritt-für-Schritt-Test am Gerät, /0 = Version prüfen | CHANGELOG ‚Testfälle P-n‘ | P-74/1 |
| **R-t.n** | Regel mit automatischer Prüfung, Thema t, Regel n | Designrichtlinie allgemein 17 | R-5.6 |
| **G-n** | Gestaltungsregel ohne automatische Prüfung (Sicht, Gerät) | Designrichtlinie allgemein 17 | G-1 |
| **I-n** | Regel einer Konvertierung (Import) | ReiseLogBuch-Import `PROMPT.md` | I-3 |
| **K-n** | Erkenntnis aus einer Konvertierung | ReiseLogBuch-Import `ERKENNTNISSE.md` | K-12 |
| *0 Nr. n, 2.x* | Pflichten und Abschnitte der Zusammenarbeit (kein Präfix) | Zusammenarbeit | 0 Nr. 21 |

- **Nur in ihrer Datei gelten** die Nummern einer Testfall-Liste (**Testfall (automatisch)**, `arbeit/APD-n Testfall-Liste.md`)
  und die Entscheidungen, Befunde, Varianten und Themenlisten einer Arbeitsdatei – mit einem freien Buchstaben, nie einem der
  Präfixe oben. Außerhalb ihrer Datei steht immer die Nummer des Themas davor: APD-63/X-2, APD-5/D-4, APD-38/T-21; folgen in
  derselben Zeile weitere Nummern derselben Liste, genügt die Nummer allein (APD-61/F-1 bis F-21). Nummern aus der Zeit vor
  den Themen haben die Version als Elternnummer (RLB 2.1.3/F-8).
- **Erledigt** hat keine eigene Nummer: Spalte ‚Nr.‘ = Thema bzw. Usertest (mehrere erlaubt), ohne Thema die Version (RLB 2.1.3).
- **Begriffe:** Usertest P-n (alle Testfälle (User) einer Version) · Testfall (User) P-n/m · Testfälle P-n (die Liste im
  CHANGELOG) · Testfall-Liste (je Thema, vor dem Bau) · Testfall (automatisch) (ein Fall der Testfall-Liste, wird eine Prüfung).
- **Alte Nummern und Begriffe** (bis AppDesign 4.35.0: A-, T-, E-, N- und die alten Namen der Begriffe) stehen nur noch in `ZUORDNUNG.md`
  (AppDesign, Tabelle alt → neu für die festen Fassungen und die Git-Commits) und im Protokoll der Entscheidung
  (`arbeit/APD-78 …`). Umgestellt wurde mit `werkzeug/umbenennen.mjs`.
- Prüfung: `doku.mjs` – `checkSchema` (unbekanntes Präfix, alte Nummer, lokaler Buchstabe, der überall gilt, führende Null,
  `ZUORDNUNG.md`, Themennummern, alte Begriffe, Verweise in `arbeit/`, diese Tabelle; Gegenprobe `--gegenprobe schema`).

### 2.5 Übergabe, neue Sitzung, Lagebild

- **`UEBERGABE.md`** enthält nur den Stand der Sitzung: Lagebild (Versionen, Chatnummer, Sitzungsgröße, offene Usertests),
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
  Bei hoher Last weicht die Sitzung von selbst auf das nächste Modell aus (Eintrag `model_fallback` in der Sitzungsdatei, z. B.
  ‚Switched to Opus 5 … due to high demand for Opus 5.5‘) – der Regelwächter meldet dann ‚⚠ Modell …‘ mit diesem Grund, Claude
  nennt es in der nächsten Ausgabe (Kasten ‚Jede Antwort‘ 8).
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

### 2.8 Regelwächter

- `werkzeug/regelwaechter.mjs` läuft als Hook von Claude Code in jeder Sitzung der Umgebung (eingerichtet einmal über das
  Setup-Skript, Text und Befehle: AppDesign-`CLAUDE.md`). Er sucht AppDesign unter `/home/user`; fehlt es, läuft er leer durch.
- **Nach jeder Nachricht und jedem Werkzeug:** die fertige Uhrzeitzeile für die nächste Ausgabe (Zeitabstand ab der letzten
  Uhrzeitzeile in der Sitzungsdatei) und ‚⚠ Modell …‘, wenn der letzte Aufruf nicht Opus 5.5 war.
- **Vor jedem Auswahlfenster:** lehnt es ab, wenn eine Frage keine Empfehlung zuerst oder kein ‚Ich schreibe im Chat‘ hat oder
  wenn die Ausgabe davor keinen Satz mit ‚Kontext N‘ aus `messung.mjs` enthält; steht diese Ausgabe (noch) nicht wörtlich in der
  Sitzungsdatei, lehnt er ab, wenn seit der vorigen Nachricht bzw. dem vorigen Fenster `messung.mjs` keinen Kontext gemeldet hat.
- **Am Ende jeder Antwort:** prüft die Antwort in der Sitzungsdatei – jede Ausgabe beginnt mit der Uhrzeitzeile und ihre Uhrzeit
  ist abgelesen (± 1 min um ihren Anlass), der Zeitabstand passt, die Antwort hat ein Fenster (außer der Übergabe), die Zeitzeile
  steht ganz am Ende nach dem letzten Fenster und kommt unverändert aus `messung.mjs`. Fehlt etwas, lässt er die Antwort nicht enden
  und sagt, was nachzuholen ist – höchstens zweimal je Antwort; danach prüft er nur noch Neues.
- **Grenze:** Ausgaben, die in derselben Nachricht nach einem Denkschritt stehen, speichert die Sitzungsdatei nicht wörtlich
  (Befund 26.10.2026) – für sie bleiben die Uhrzeitzeile und der Satz ‚Kontext N‘ Selbstkontrolle; geprüft wird nur der Aufruf
  von `messung.mjs`.
- Prüfung: `tests/regelwaechter.mjs` mit echten Antworten aus den Sitzungen 0050 und 0051 (Gegenprobe `--gegenprobe`).

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
| Abschnitt 7 Nach jeder Version (Testfälle mit /0, Meldung je Gerät, Fehler am Gerät) | 0 Nr. 1, 2, 9, 11 und 22; 2.3 |
| Abschnitt 8 Versionen | Designrichtlinie allgemein 11 |
| Abschnitt 9 Ablage | 0 Nr. 10 |

---

## Versionsgeschichte

| Version | Datum | Art | Inhalt |
|---|---|---|---|
| 3.5.0 | 31.10.2026 | Neben | **APD-103 (Nutzer 31.10.2026, Sitzungen 0065 und 0067, Wortlaut bestätigt):** 2.8 ‚Vor jedem Auswahlfenster‘ – ist die Ausgabe davor (noch) nicht wörtlich in der Sitzungsdatei, lehnt der Regelwächter ab, wenn seit der vorigen Nachricht bzw. dem vorigen Fenster `messung.mjs` keinen Kontext gemeldet hat (Rückfall statt Durchlassen, APD-103/D-1 bis D-9); 2.8 ‚Grenze‘ – Uhrzeitzeile und Satz ‚Kontext N‘ bleiben dort Selbstkontrolle |
| 3.4.0 | 31.10.2026 | Neben | **APD-99 (Nutzer 31.10.2026, Sitzungen 0060 und 0062, Wortlaut bestätigt):** der Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs` vor **jedem** Auswahlfenster – Kasten ‚Jede Antwort‘ Punkt 9 (jetzt **W**), 0 Nr. 28, 0 Nr. 21 verweist darauf; 2.8 der Regelwächter lehnt ein Fenster ohne diesen Satz ab (APD-84/W-14) |
| 3.3.0 | 30.10.2026 | Neben | **APD-96 (Nutzer 30.10.2026, Sitzungen 0058 und 0059, Wortlaut bestätigt):** 0 Nr. 21 – unmittelbar vor der Bau-Frage der Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs`, abgelesen; dazu Kasten ‚Jede Antwort‘ Punkt 9 |
| 3.2.0 | 30.10.2026 | Neben | **APD-85 Teil 1 (Nutzer 30.10.2026, Wortlaut bestätigt):** 0 Nr. 2 – `lauf.mjs` bricht erst ab dem dritten roten Lauf ab, jeder rote Lauf läuft am Ende einmal allein (grün = ‚wackelt‘, gemeldet) |
| 3.1.0 | 30.10.2026 | Neben | **APD-89 (Nutzer 30.10.2026, Wortlaut bestätigt):** neu 0 Nr. 29 ‚Regeln nur mit Genehmigung‘ – keine Regel ohne ‚Ja‘ des Nutzers zum Wortlaut löschen, ändern oder ergänzen; dazu im Kasten ‚Immer‘ |
| 3.0.0 | 26.10.2026 | Haupt | **APD-84 Regelwerk, Konsolidierung 2 (Nutzer 26.10.2026, Plan bestätigt):** ganz oben in 0 der Kasten ‚Immer‘ und ‚Jede Antwort‘ (alle Pflichten jeder Antwort an einer Stelle, jede mit ihrer Prüfung); neu 0 Nr. 27 ‚Nur Belegtes‘ und 0 Nr. 28 ‚Jede Frage im Fenster, jede Antwort endet mit einem‘ (0 Nr. 7 war seit 2.17.0 zu ‚nur für Ja/Nein‘ abgeschwächt); 0 Nr. 4 wieder ‚im Auswahlfenster‘, 0 Nr. 20 wieder ‚nie nur in einer Prüfung‘; 0 Nr. 15 zu Beginn die ganze Datei; 0 Nr. 19 Startfrage mit Empfehlung; 2.1 Schreibweise ‚(Empfohlen)‘ mit Grund; neu 2.8 Regelwächter (Hooks: Uhrzeit liefern, Fenster vor dem Zeigen prüfen, Antwort am Ende prüfen; Prüfung `tests/regelwaechter.mjs`); 2.5 Rückfall des Modells bei hoher Last melden |
| 2.20.0 | 25.10.2026 | Neben | **APD-78 Nummernschema (Nutzer 25.10.2026):** 2.4 ‚Nummern und Präfixe‘ neu (APD-, RLB-, RLI-, P-, R-, G-, I-, K-; lokale Nummern mit Elternnummer; Erledigt ohne eigene Nummer; Begriffe Usertest, Testfall (User), Testfälle P-n, Testfall-Liste, Testfall (automatisch); `ZUORDNUNG.md`, Prüfung `checkSchema`); alle Regeltexte rückwirkend umgestellt. **APD-79:** 0 Nr. 26 und 2.2 Uhrzeitzeile in der ersten Zeile jeder Ausgabe |
| 2.19.0 | 23.10.2026 | Neben | **0 Nr. 13 automatische Übergabe (Nutzer 23.10.2026):** bei ‚⚠ Übergabe fällig‘ übergibt Claude ohne Rückfrage, sobald der laufende Schritt abgeschlossen ist, und startet die neue Sitzung selbst; offene Fragen gehen mit in die Übergabe (2.2) |
| 2.18.0 | 22.10.2026 | Neben | **APD-41:** 0 Nr. 13 Übergabe wieder erst ab etwa 300.000 Token (gleiche Grenze wie das Werkzeug, 2.2); 0 Nr. 2 Hilfsagenten bzw. eigene Sitzungen parallel, wenn möglich und sinnvoll; 2.1 ein Auswahlfenster je Antwort mit der Erklärung davor, Themen einzeln nacheinander (‚w‘) |
| 2.17.0 | 21.10.2026 | Neben | **APD-39 Konsolidierung:** Abschnitt 0 ist das eine Arbeitsmodell – die Kästen oben und die Abschnitte 2–9 sind in 0 Nr. 8, 21–25 und den neuen Abschnitt 2 ‚Einzelheiten und Formate‘ eingegangen (Zuordnung alt → neu); jede Regel nennt ihre Prüfung; Geschichte (‚seit …‘, ‚Nutzer …‘, ‚Anlass …‘) nur noch hier. Neu 0 Nr. 13: Übergabe schon ab etwa 150.000 Token Kontext (statt 300.000; das Werkzeug warnt weiter ab 300.000). Geklärt (Nutzer 21.10.2026, APD-39/F-2 bis F-4): im Auswahlfenster nur die kurze Frage, bei Bitten, am Gerät zu prüfen, auch Link und Schritte; Übergabe vorschlagen, bei Ja schreiben und die neue Sitzung selbst starten, Starttext als Rückfall; keine eigene Version für eine einzelne Kleinigkeit |
| 2.16.0 | 21.10.2026 | Neben | 0 Nr. 11 ergänzt: Link und Schritte jeder Bitte, am Gerät zu prüfen, zusätzlich im Auswahlfenster selbst – der Text davor kam nicht an (Nutzer 21.10.2026, Sitzung 0023) |
| 2.15.0 | 20.10.2026 | Neben | 0 Nr. 20 ergänzt: Muster mit Messung vor der Übergabe im Safari-Modell gegen die Rohdaten geprüft (mit Gegenprobe), führen Schritt für Schritt durch den Versuch, zeigen am Gerät nur ‚aufgenommen‘ (Nutzer 20.10.2026, APD-36) |
| 2.14.1 | 20.10.2026 | Korrektur | 0 Nr. 15: Aufwand aus der Sitzungsdatei (`"effort"`) nennen; die App zeigte ‚mittel‘, obwohl alle Aufrufe mit ‚hoch‘ liefen – dann in der App auf ‚hoch‘ stellen (Nutzer 20.10.2026) |
| 2.14.0 | 20.10.2026 | Korrektur | 0 Nr. 15: zu Beginn auch Abschnitt 1 ‚Sprache und Ton‘ lesen – in 0019 sprach Claude den Nutzer mit ‚Sie‘ an, weil Abschnitt 1 (per du) nicht im Startumfang lag (Nutzer 20.10.2026) |
| 2.13.0 | 19.10.2026 | Neben | 0 Nr. 13 und 15 ergänzt: neue Sitzungen mit Opus 5.5 und Aufwand hoch (`CLAUDE_CODE_EFFORT_LEVEL=high` in der Umgebung); zu Beginn Modell und Aufwand prüfen und im Lagebild nennen (Nutzer 19.10.2026) |
| 2.12.0 | 19.10.2026 | Neben | 0 Nr. 11 ergänzt: jede Bitte, etwas am Gerät zu prüfen oder auszuprobieren (Muster, Versuch, Messung), enthält im Chat den vollständigen Link und nummerierte Schritte mit ‚Erwartet: …‘ (Nutzer 19.10.2026) |
| 2.11.0 | 19.10.2026 | Neben | 0 Nr. 20 neu (Abschnitt G): bei Bewegungsfehlern am Gerät zuerst messen, ein Safari-Modell, Bericht ‚in der Nachbildung behoben, am Gerät zu bestätigen‘, Safari-Eigenheiten mit Quelle in Designrichtlinie 13 (Nutzer 19.10.2026) |
| 2.10.1 | 18.10.2026 | Korrektur | 0 Nr. 11 verschärft: alle Usertests vollständig Schritt für Schritt im Chat (nie nur Verweis aufs CHANGELOG), danach das Auswahlfenster (Regel war nach 3.22.0 nicht eingehalten) |
| 2.10.0 | 18.10.2026 | Neben | 0 Nr. 11: Bericht nach einer Version endet immer mit einem Auswahlfenster zur Rückmeldung (Push-Nachricht auf dem iPad, Wunsch des Nutzers) |
| 2.9.0 | 18.10.2026 | Neben | 0 Nr. 1: bei ‚nicht ok‘ zuerst den Ablauf des Nutzers als feste Prüfung nachbauen, rot gegen den veröffentlichten Stand, dann korrigieren (aus P-51/5 und P-52) |
| 2.8.0 | 17.10.2026 | Neben | §2: Zeile Zeit und Token endet mit ‚Kontext N‘, ab 300.000 ‚⚠ Übergabe fällig‘ (APD-20) |
| 2.7.0 | 16.10.2026 | Neben | §2: Zeile Zeit und Token mit dem Werkzeug `werkzeug/messung.mjs`, ‚neu‘ = Eingabe + Ausgabe (APD-12) |
| 2.6.0 | 16.10.2026 | Neben | Abschnitt 0 Nr. 19: Startfrage – Sitzung ohne Auftrag beginnt mit dem Auswahlfenster ‚Was möchtest du als Nächstes tun?‘ je angehängtem Repo (RLB-5) |
| 2.5.0 | 15.10.2026 | Neben | Abschnitt 1: per du (nie ‚Sie‘ oder ‚ihr‘); Abschnitt 0 Nr. 18: bei offensichtlichem Regelbruch massiv widersprechen, umsetzen erst nach ausdrücklicher Umsetzungspflicht |
| 2.4.0 | 15.10.2026 | Neben | APD-7: zu Beginn gezielt lesen (0 Nr. 15, Hinweis oben) und nur ein voller Prüflauf je Version im Veröffentlichungs-Skript (0 Nr. 2, §7) |
| 2.3.2 | 14.10.2026 | Korrektur | Abschnitt 0 Nr. 9 und 10: Verweise auf das Veröffentlichungs-Skript und die feste Fassung (APD-5 Version B) |
| 2.3.1 | 14.10.2026 | Korrektur | Abschnitt 0 Nr. 2 und 5: Verweise auf die Werkzeuge aus APD-5 Version A (`tests/alle.mjs`, `lauf.mjs`, Gegenprobe) und WebKit in jedem Test |
| 2.3.0 | 14.10.2026 | Neben | Abschnitt 0 Nr. 14: nach der Übergabe am Ende der Antwort fett ‚Die Sitzung (Chat) ist damit beendet!‘ |
| 2.2.0 | 14.10.2026 | Neben | APD-2 Schritt 4 – Abschnitte 1–9 an Abschnitt 0 angepasst: Korrekturen sofort als Korrekturversion, auch ohne Datenverlust (§6, 0 Nr. 8); Antwortzeile nur noch bei mehr als 4 Fragen, jedes Fenster mit ‚Ich schreibe im Chat‘ (§2, 0 Nr. 7); Muster und Erklärungen als Datei vor dem Fenster statt im Fragetext (§2); Doppeltes durch Verweise auf Abschnitt 0 ersetzt (§5 Nr. 3, §7 Testfälle und Bericht) |
| 2.1.1 | 14.10.2026 | Korrektur | Regelnummern nach dem neuen Regelkatalog (Designrichtlinie allgemein 4.12.0): R-1.1 …, R-10.4; die frühere R-50 (Testfälle mit /0, Meldung je Gerät) ist Arbeitsregel in Abschnitt 7 |
| 2.1.0 | 14.10.2026 | Neben | Abschnitt 0 Nr. 13: Claude startet die neue Sitzung selbst, Name ‚<App> <vierstellige Chatnummer> – Thema‘, Nummer in UEBERGABE.md |
| 2.0.1 | 14.10.2026 | Korrektur | Abschnitt 0 Nr. 14: Starttext immer als Codeblock (Kopieren-Schaltfläche) und Angabe, wo auf GitHub alles liegt |
| 2.0.0 | 14.10.2026 | Haupt | Arbeitsprozess 2.0 (Abschnitt 0, Vorrang): Testfall-Liste vor jedem Bau, parallel und sparsam arbeiten, Regeln bei jeder neuen Regel zusammenfassen, allgemeine Regel immer erfragen, Safari nachbilden, Varianten nebeneinander, Fenster nur Ja/Nein mit ‚Ich schreibe im Chat‘, kleine Versionen (höchstens 2 Themen), Veröffentlichungs-Skript, feste AppDesign-Fassung je App, Bericht mit vollständiger Aufzählung, ein Thema je Sitzung, Übergabe-Datei `UEBERGABE.md`, Lagebild, kurze Rückmeldung |
| 1.16.0 | 14.10.2026 | Neben | Fehler aus der Prüfung am Gerät: zuerst die automatische Prüfung so schärfen, dass sie den Fehler findet, dann beheben, dann dieselbe Lücke überall suchen; Testfälle selbst ableiten; Tests bilden Safari nach. §1: jede Meldung deutsch (aus 1.15.1) |
| 1.15.1 | 13.10.2026 | Korrektur | §1: jede Meldung deutsch – auch Zwischenmeldungen, Statuszeilen, Bildunterschriften und Fragen im Auswahlfenster |
| 1.15.0 | 13.10.2026 | Neben | ‚Fertig‘ erst nach erfolgreichen Pages-Läufen beider Repos; README mit Tabelle ‚Verwendete Versionen‘ (R-49); Testfälle beginnen mit /0 ‚Version prüfen‘, jeder Schritt nennt die Meldung je Gerät, mit automatischem Test (R-50) |
| 1.14.0 | 13.10.2026 | Neben | Verpflichtend: am Ende jeder Umsetzung alle offenen Usertests einzeln als Schritt-für-Schritt-Anleitung (Gerät/Lage/Darstellung · Handgriffe · erwartetes Ergebnis), mit Nummer, ohne Verweise |
| 1.13.0 | 11.10.2026 | Neben | Regelkatalog: Abgleich vor jedem Muster, Prüfung aller automatisch prüfbaren Regeln nach jeder Version; neue Regeln sofort mit Nummer und Prüfung; Geräte-Regeln in die Testfälle, wenn betroffen |
| 1.12.5 | 10.10.2026 | Korrektur | Auswahlfenster nur mit kurzer Frage und Schaltflächen; Zeit und Token nur am Ende der Antwort |
| 1.12.4 | 10.10.2026 | Korrektur | Zeit ab Eingang der Nachricht (inkl. Nachdenken), Neubeginn bei jeder Nachricht; Token genau je Antwort aus den Sitzungsdaten |
| 1.12.3 | 10.10.2026 | Korrektur | Arbeitszeit bei jeder Übergabe (auch im Auswahlfenster) |
| 1.12.2 | 10.10.2026 | Korrektur | Arbeitszeit ohne Wartezeit im Auswahlfenster; Zeile mit Zeit und Token nach der letzten Fensterantwort |
| 1.12.1 | 10.10.2026 | Korrektur | Zeit und Token als eine kompakte, kleine Zeile am Ende; Ausnahme für Muster mit Schriftdarstellung; Reihenfolge in einer Antwort |
| 1.12.0 | 10.10.2026 | Neben | Nutzungsstatistik (Token, Nutzungsfenster, Rücksetzung) mit der Zeitmessung; Muster direkt im Fragetext des Auswahlfensters |
| 1.11.0 | 10.10.2026 | Neben | Pflicht: Zeitmessung je Aktion, Ausgabe am Ende der Rückmeldung im Format mm:ss |
| 1.10.0 | 09.10.2026 | Neben | Umzug ins Design-Repo AppDesign; Ablage, Vergleichsbilder und Reihenfolge beim Veröffentlichen (erst AppDesign, dann Apps) |
| 1.9.0 | 09.10.2026 | Neben | Verpflichtend: nach jeder Version erst alle Usertests testen und Fehler beseitigen, dann Neues (Hinweis, Ausnahme nur auf Wunsch); Auswahlfenster auch nach einem geschlossenen Fenster wieder verwenden |
| 1.8.0 | 09.10.2026 | Neben | Pflicht: Antwortvorschläge immer im Auswahlfenster (Empfehlung zuerst) und als Antwortzeile zum Kopieren |
| 1.7.1 | 09.10.2026 | Korrektur | Vergleichsbilder: Ablage `apple-referenz/<Gerät>/<App>/` mit README; private Inhalte vorher verpixeln und zur Freigabe zeigen |
| 1.7.0 | 09.10.2026 | Neben | Pflicht: Apple-Abgleich vor jedem Muster (HIG-Checkliste) und Apple-Review nach jeder Version; Vergleichsbilder aus Apple-Apps auf Anfrage (`apple-referenz/`); HIG-Prüfskript bei jedem Test |
| 1.6.0 | 09.10.2026 | Neben | Verpflichtend: Sammelversionen – geklärte Punkte in „0. Nächste Version“ sammeln, Version erst bei größerem Thema, etwa 5 Punkten oder auf Wunsch; Sofort-Korrektur nur bei Datenverlust/unbenutzbarer App; Testfälle je Version; Status „bereit“ statt „vereinbart“ |
| 1.5.0 | 08.10.2026 | Neben | Verpflichtend: nie selbst entscheiden, eine Version zu bauen – immer vorher fragen, auch bei Korrekturen |
| 1.4.0 | 08.10.2026 | Neben | Backlog mit Priorität; neue Themen einzeln vorschlagen und Übernahme samt Priorität erfragen |
| 1.3.0 | 08.10.2026 | Neben | Neu: Backlog-Datei je App und Erinnerung an offene Themen |
| 1.2.0 | 08.10.2026 | Neben | Neu: Apple-like entwickeln – bei jeder Anforderung recherchieren, wie Apple es löst, und Vorschläge/Empfehlungen machen |
| 1.1.0 | 08.10.2026 | Neben | Muster zuerst nur hell und quer; Muster und Screenshots in Viererpaketen |
| 1.0.0 | 07.10.2026 | erste Fassung | Aus der Designrichtlinie allgemein ausgelagert; neu: Antwortformat (ja/nein, a/b/c), Frage „allgemein oder App?“ |
