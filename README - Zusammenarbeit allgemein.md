# Zusammenarbeit allgemein

**Version 3.19.0** · Stand 21.11.2026

Regeln für die Zusammenarbeit mit Claude bei allen Web-Apps für iPad und iPhone von g811141a. Die Datei liegt im Design-Repo **AppDesign**
(g811141a/AppDesign); App-Eigenes steht in der `CLAUDE.md` des App-Repos. **Abschnitt 0 ist das Arbeitsmodell** (oben der Kasten ‚Immer‘ und ‚Jede
Antwort‘), Abschnitt 1 die Sprache, Abschnitt 2 die Einzelheiten und Formate. Jede Regel nennt ihre Prüfung – eine Prüfdatei
oder **Selbstkontrolle** (Claude prüft vor dem Senden selbst).

> **Hinweis für Claude:** Diese Regeln gelten in jeder Sitzung, auch nach langer Pause. Zu Beginn `UEBERGABE.md` und **diese ganze
> Datei** lesen, alles Weitere gezielt (Nr. 15).

---

## 0. Arbeitsmodell

> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Testfall-Liste vor jedem Bau (Nr. 1) ·
> allgemein = AD-Bean (R-1.13, Nr. 25) · Sammelversionen (Nr. 8) · nur Belegtes (Nr. 27) · Regeln nur mit Genehmigung (Nr. 29) ·
> ohne Auftrag nach dem Lagebild die Startfrage (Nr. 19).
>
> **Jede Antwort** (Selbstkontrolle vor dem Senden):
> 1. Per du, deutsch, kurz (Abschnitt 1).
> 2. Nur Belegtes: jede Zahl, Version, jedes Prüfergebnis aus einem Werkzeug oder einer Datei dieser Sitzung (Nr. 27).
> 3. **Kachel mit Push:** jede Antwort, nach der der Nutzer etwas tun soll (lesen, entscheiden, prüfen, antworten), endet mit einem
>    Auswahlfenster – nur das Fenster bringt am iPad den Push; auch nach einem Neustart des Arbeitsprozesses und nach der Meldung einer
>    Hintergrundaufgabe oder einer anderen Sitzung; Empfehlung zuerst mit ‚(Empfohlen)‘ und Grund (Ausnahme 2.1),
>    immer ‚Ich schreibe im Chat‘; einzige Ausnahme die Übergabe (Nr. 14, Nr. 28).
> 4. **Datei vor jeder Kachel:** vor jedem Fenster stehen alle wichtigen Informationen der Antwort in **einer Datei** im Seitenbereich
>    (`SendUserFile`, `display: 'render'`), die neben der offenen Kachel lesbar bleibt. Das gilt auch dann, wenn die Frage im Fenster nicht
>    danach fragt. Dazu gehören Lagebild, Bericht, Wortlaut alt und neu, Muster, der vollständige Testlink, nummerierte Schritte mit
>    ‚Erwartet: …‘ und alle offenen Usertests vollständig. Derselbe Inhalt steht auch im Chat. Das gilt ohne Ausnahme. Das Fenster selbst
>    enthält nur die kurze Frage, ohne Link (Nr. 11, 15, 2.1, 2.3).
> 5. **Kontextstand in der Kachel:** jede Frage im Fenster endet mit ‚(Kontext N)‘, N abgelesen aus `messung.mjs` unmittelbar vor dem
>    Fenster – nie geschätzt (Nr. 21, 28).
> 6. Wurde etwas gebaut oder entschieden: die Backlog-Erinnerung ‚Nächste Version …: N Punkte bereit (…) · Offen im Backlog: …‘ (2.4).
> 7. Meldet `messung.mjs` ‚⚠ Übergabe fällig‘: nach dem laufenden Schritt übergeben (Nr. 13).

Ziel: nichts vergessen, Fehler finden, bevor der Nutzer sie findet, schnell und sparsam arbeiten. Die Nummern bleiben fest
(Verweise in Code und Changelogs), neue Punkte bekommen die nächste freie Nummer. Einzelheiten und Formate: Abschnitt 2.

**Pflichten**

21. **Nie ohne ‚Ja‘ bauen:** Claude entscheidet nie selbst, eine Version zu bauen oder hochzuladen – auch nicht bei kleinen
    Korrekturen oder wenn die Bitte ‚korrigieren‘, ‚verbessern‘, ‚ausbessern‘ lautet. Vorher immer ‚Soll ich Version X.Y.Z mit …
    erstellen (Prüflauf Stufe Text bzw. voll)? (Kontext N)‘ mit Ja/Nein – Stufe nach Nr. 2, der Kontextstand steht **in der Frage
    selbst** (2.2).
    Gebaut wird erst nach einem
    ausdrücklichen ‚Ja‘ (eine Bitte um Korrektur ist keins). Bis dahin:
    erklären, Vorschlag machen, ins Backlog eintragen. Prüfung: Selbstkontrolle.
22. **Erst prüfen, dann Neues:** Nach jeder Version werden alle Testfälle (User) des Usertests geprüft und gefundene Fehler beseitigt, bevor Neues
    umgesetzt wird; jeder Bericht endet mit dem Hinweis darauf (2.3). Ausnahme: Der Nutzer besteht nach dem Hinweis darauf, zuerst
    Neues umzusetzen. Prüfung: Selbstkontrolle.
26. entfällt (APD-123).
27. **Nur Belegtes:** Uhrzeiten, Zahlen, Versionen, Prüfergebnisse, Dateiinhalte und ‚So macht es Apple‘ nur aus einem Werkzeug,
    einer Datei oder einer Quelle **dieser** Sitzung; sonst ‚weiß ich nicht – ich prüfe es‘; Vermutungen heißen ‚Vermutung‘.
    Prüfung: Selbstkontrolle mit Quelle im Bericht.
28. **Jede Frage im Fenster:** Jede Frage an den Nutzer kommt ins Auswahlfenster, und jede Antwort, nach der der Nutzer etwas tun
    soll, endet mit einem (Kasten Punkt 3) – nie ‚Sag Bescheid …‘ oder eine offene Frage im Text; Ausnahme: die Übergabe (Nr. 14). Am
    Ende jeder Frage im Fenster steht ‚(Kontext N)‘ (2.2). Format 2.1. Prüfung: Selbstkontrolle.
29. **Regeln nur mit Genehmigung:** Claude löscht, ändert oder ergänzt keine Regel – Zusammenarbeit, Designrichtlinien mit
    Regelkatalog, App-Richtlinien, `CLAUDE.md` – ohne dein ausdrückliches ‚Ja‘ zum Wortlaut. Alter und neuer Text stehen in der Datei (Kasten Punkt 4) und im Chat, danach das Fenster mit ‚Ja/Nein‘ (2.1). Das gilt auch für Korrekturen und Zusammenfassungen (Nr. 3).
    Prüfung: Selbstkontrolle.

**A. Testen und Qualität**

1. **Testfall-Liste vor jedem Bau:** Gerät (iPad, iPhone) × Lage × Darstellung × Handlung (drehen, wischen, Tastatur, abgleichen,
   teilen …) × Daten (leer, lang, viele); jeder Fall wird ein Testfall (automatisch) mit fester Prüfung, nach jeder Handlung gelten die Grundregeln (z. B. nach dem Drehen
   bleiben oberster Eintrag, Seitenleiste und Menüs). Die
   Liste kommt mit dem Muster; was nur das Gerät zeigt (Teilen-Menü, iCloud, Drucken, Silbentrennung, Wischgefühl), kommt als
   Testfall (User) in den Usertest. **‚Nicht ok‘ vom Gerät:** zuerst genau den Ablauf des Nutzers als feste Prüfung nachbauen (Ausgangszustand,
   Handgriffe, Safari-Eigenheiten einzeln und zusammen) – rot gegen den veröffentlichten Stand, für immer im vollen Lauf; dann
   beheben, dieselbe Lücke überall suchen und im Bericht nennen (Nr. 11). Gelingt das Nachstellen nicht,
   fragt Claude nach. Prüfung: Selbstkontrolle; Grundregeln nach jedem Schritt `pruefe.mjs`.
2. **Prüfen parallel und sparsam:** `node tests/alle.mjs` in der App (Werkzeug `tests/lauf.mjs`: zuerst der Vorlauf `doku-regeln` (einmal) und
   `version-regeln` – rot bricht sofort ab; dann parallel, die längsten zuerst, Abbruch ab dem dritten roten Lauf, jeder rote Lauf am
   Ende einmal allein – grün heißt ‚wackelt‘, wird gemeldet und seine Ausgabe bleibt in `tests/out/wackelt-<Name>-<Browser>.txt`;
   Gegenprobe `--gegenprobe`). Während der Arbeit nur die betroffenen Prüfungen; im Veröffentlichungs-Skript genau **ein Prüflauf je Version**,
   nicht zusätzlich vorher, in einer von zwei Stufen: **Stufe Text**, wenn sich nur Texte der App geändert haben (`index.html` ohne die
   Inhalte der Zeichenketten und die Kommentare unverändert, sonst nur Doku und Versionsstellen, AppDesign unverändert) und die vorige
   Version voll geprüft wurde – dann die Grundprüfungen (Doku, Versionen, Texte) und alle Prüfungen, die den alten oder neuen Text
   enthalten, in Chromium und WebKit; sonst **voll** – **alle** (Chromium und WebKit, alle Ansichten, alle automatisch prüfbaren Regeln des
   Katalogs). Das Skript schlägt die Stufe aus dem Unterschied vor, Claude nennt sie in der Bau-Frage (Nr. 21), im Zweifel voll.
   Geräte-Regeln des Katalogs kommen als Testfall (User) in den Usertest, wenn die Version sie betrifft. Hilfsagenten bzw. eigene Sitzungen
   arbeiten parallel, **wenn möglich und sinnvoll**. Prüfung: `lauf.mjs` (Selbsttest `tests/lauf-selbsttest.mjs`), Stufe
   `veroeffentlichen.mjs` (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`).
3. **Regeln schlank halten:** Jede Regel steht an genau einer Stelle und nennt ihre Prüfung (Prüfdatei und Funktion; prüfen
   mehrere Funktionen Teile derselben Regel, nennt sie alle); eine neue Regel ersetzt oder ergänzt eine bestehende, Regeln zum
   selben Thema werden zusammengefasst. Neue allgemeine Design-Regeln bekommen sofort eine Nummer im Katalog (Designrichtlinie 17)
   und eine automatische Prüfung, sonst ‚Gerät‘. Im Regeltext steht nur, was heute gilt, außer der Spalte ‚Entschieden‘ (Datum) bei
   bewussten Abweichungen (Designrichtlinie 12, 16); Geschichte steht in Versionsgeschichte und CHANGELOG. Prüfung: Selbstkontrolle;
   `doku.mjs` – `checkCatalog` (Katalog vollständig), `checkCollab` (keine veralteten Sätze).
4. **Allgemeine Regel immer erfragen:** Legt eine Eingabe des Nutzers eine Formatierung oder ein Verhalten fest, prüft Claude
   (mit Recherche), ob es eine allgemeine Regel werden sollte, und fragt bei jeder Design-Änderung verlässlich im Auswahlfenster
   ‚Als allgemeine Regel festhalten? Ja/Nein‘. Allgemeine Regeln sind die Grundlage jeder App (gleiche Schaltflächen an gleichen
   Stellen, gleiche Formatierung); in der App steht nur, was anders ist. Prüfung: Selbstkontrolle.
5. **Safari nachbilden:** wo Chrome anders arbeitet (Designrichtlinie 13); jeder Test läuft zusätzlich in WebKit (Setup-Skript
   der Umgebung ‚Standard‘). Prüfung: `pruefe.mjs`, Safari-Modell `safari.mjs`.

**B. Muster und Entscheidungen**

6. **Muster:** bei Gestaltungsfragen zuerst ein Muster – beim ersten 2–3 Varianten nebeneinander, bei kleinen Korrekturen eine;
   zuerst nur hell und quer, hoch erst, wenn quer passt; bis auf Weiteres nur hell – dunkel nur auf Wunsch des Nutzers; Bilder in
   Viererpaketen. Prüfung: Selbstkontrolle.
7. **Auswahlfenster:** jede Frage als Ja/Nein oder klare Auswahl (Nr. 28), die Empfehlung zuerst, jedes Fenster mit ‚Ich schreibe
   im Chat‘ (gewählt → Claude beendet die Antwort). Längeres steht vor dem Fenster in der Datei und im Chat (Kasten Punkt 4, 2.1).
   Format 2.1. Prüfung:
   Selbstkontrolle (Empfehlung zuerst, ‚Ich schreibe im Chat‘); `checkCollab` (keine Antwortzeile ohne ‚mehr als 4 Fragen‘, keine
   Muster im Fragetext).

**C. Apple, Backlog und Ablauf einer Änderung**

23. **Apple-like:** Aussehen, Aufbau und Bedienung wie die Apple-Apps auf iPad und iPhone. Bei jeder neuen Anforderung
    recherchiert Claude, wie Apple es löst (eigene Apps und HIG), nennt es (‚So macht es Apple: …‘) und schlägt vor – auch
    ungefragt, wenn eine Anforderung abweicht oder Apple es besser löst; was im Web nicht geht, wird nachgebaut und als Abweichung
    genannt. **Vor jedem Muster** der Apple-Abgleich, **nach jeder Version** das Apple-Review (2.6). Prüfung: Selbstkontrolle;
    messbare HIG-Punkte `hig.mjs`.
24. **Backlog:** jedes Repo hat eine `BACKLOG.md` (Aufbau 2.4), ReiseLogBuch-Import erst mit dem ersten Thema (RLI-n, 2.4);
    Priorität 1 hoch · 2 mittel · 3 niedrig, die höchste zuerst. Neue Themen schlägt Claude einzeln vor und fragt ‚Ins Backlog
    übernehmen?‘ und die Priorität – mit Empfehlung. Wünsche, Fragen und Usertests trägt Claude sofort ein und erinnert an Offenes
    (2.4). Prüfung: Selbstkontrolle; Kopfzeile `veroeffentlichen.mjs` (vorbereiten), Themennummern `checkSchema`.
25. **Ablauf einer Änderung:** nachfragen, bis alles geklärt ist → Muster (Nr. 6, 23) mit Testfall-Liste (Nr. 1) → allgemein oder App
    (Nr. 4) → bei allgemein: welche AD-Bean – eine bestehende mit neuer Eigenschaft oder eine neue mit Kennung (R-1.13); das steht
    im Muster und in der Bau-Frage → in ‚0. Nächste Version‘ eintragen, nicht ohne Bau-Frage bauen (Fehler aus dem Testen als
    Korrekturversion nach Nr. 8) → bauen nur nach Nr. 8 und 21. Nur ändern, was besprochen wurde; Auffälliges nennen statt eigenmächtig ändern (offensichtliche Fehler beheben und
    ausdrücklich erwähnen). Prüfung: Selbstkontrolle; ändert eine AppDesign-Version `ui.js` oder `design.css`, nennt ihr
    CHANGELOG-Eintrag je Thema (fetter Absatz) eine Zeile ‚AD-Bean: `<kennung>` (neu | neue Eigenschaft …)‘ oder ‚AD-Bean: keine,
    weil …‘ – sonst bricht `veroeffentlichen.mjs` (`los`) vor dem Prüflauf ab (Selbsttest).

**D. Bauen und Veröffentlichen**

8. **Sammelversionen und kleine Versionen:** geklärte Punkte sammeln (‚0. Nächste Version‘) und gemeinsam in **einer** Version
   bauen: 2–3 zusammengehörige Punkte, höchstens 2 Themen; keine eigene Version für eine einzelne Kleinigkeit. Claude fragt nach
   einer Version, wenn ein Thema geklärt ist, 2–3 Punkte bereit sind oder der Nutzer ‚Version bauen‘ sagt – mit allen bereiten
   Punkten. **Korrekturen sofort:** Fehler aus einer Prüfrunde als eigene Korrekturversion vor allem Neuen, auch ohne
   Datenverlust (vorher fragen). Prüfung: Selbstkontrolle; `checkCollab`.
9. **Veröffentlichen mit dem Skript** `werkzeug/veroeffentlichen.mjs` (Befehle: AppDesign-`CLAUDE.md`): `vorbereiten` erhöht alle
   Versionen, Claude schreibt CHANGELOG mit Testfällen (2.3), Backlog und Richtlinien, `los` prüft – vorher die Selbsttests
   der Werkzeuge, die sich seit `main` geändert haben (`lauf.mjs`, Veröffentlichungs-Skript, `messung.mjs`) –, veröffentlicht **erst
   AppDesign, dann die App** und wartet auf Pages. ‚Fertig‘ erst, wenn beide Pages-Läufe erfolgreich sind und die Dateien die
   neue Version enthalten (`APP_VERSION`, `AD_NEEDED`, `AD_VERSION`); vorher keine Aufforderung zum Testen. Prüfung: das Skript
   (Selbsttest `werkzeug/veroeffentlichen-selbsttest.mjs`), `doku.mjs`.
10. **Ablage und feste Fassung:** ein Repo pro App (Pages aus `main`); Allgemeines in AppDesign (Designrichtlinie 14),
    App-Eigenes im App-Repo (`CLAUDE.md`, `PROMPT.md`, `CHANGELOG.md`, `BACKLOG.md`, App-Richtlinie) ohne Wiederholungen.
    Gemeinsames wird in AppDesign geändert und mit jeder App getestet, die es nutzt. Jede App bindet genau ihre feste
    AppDesign-Fassung ein und wird nur nach Rückfrage gehoben. Prüfung: `version.mjs` (R-10.3); Rückfrage: Selbstkontrolle.
11. **Bericht** nach einer Version, nach vorbereiteten, noch nicht gebauten Änderungen **und bei jeder Bitte, am Gerät zu prüfen**
    (Muster, Versuch, Messung, Usertest): Bericht (3–5 Sätze), vollständige Aufzählung aller Änderungen und alle offenen Usertests
    vollständig, auch die früherer Versionen, in der Datei und im Chat (Kasten Punkt 4), danach das Fenster zur Rückmeldung; nie nur
    ein Verweis aufs CHANGELOG. Ist ein Fehler durchgerutscht, steht dabei, warum die Prüfung ihn übersah.
    Einzelheiten 2.3. Prüfung: `doku.mjs` (Testfälle); sonst Selbstkontrolle.

**E. Sitzungen und Übergabe**

12. **Ein Thema je Sitzung.** Lange Sitzungen werden langsam und automatisch zusammengefasst – dabei gehen Einzelheiten
    verloren. Prüfung: Selbstkontrolle.
13. **Automatische Übergabe ab etwa 300.000 Token:** Hat der Kontext etwa **300.000 Token** erreicht (‚⚠ Übergabe fällig‘ meldet
    `messung.mjs`) oder wurde die Sitzung schon zusammengefasst, übergibt Claude **ohne Rückfrage**, sobald der laufende Schritt
    abgeschlossen ist (Version veröffentlicht und Bericht gegeben bzw. Auswertung eingetragen) – nie mitten in einem Bau oder
    Prüflauf: Übergabe schreiben (Nr. 14) und die neue Sitzung selbst starten (2.5). Eine offene Frage an den Nutzer (z. B. Rückmeldung zu Usertests) geht mit in die
    Übergabe und wird in der neuen Sitzung gestellt. Ist ein Thema vorher abgeschlossen, schlägt Claude die Übergabe vor. Prüfung:
    Selbstkontrolle anhand von `messung.mjs`.
14. **Übergabe** sofort nach `UEBERGABE.md` im Repo AppDesign schreiben und veröffentlichen, mit Starttext (2.5); am Ende der
    Antwort fett **‚Die Sitzung (Chat) ist damit beendet!‘**. Prüfung: Selbstkontrolle.
15. **Beginn einer Sitzung:** lesen – `UEBERGABE.md`, **diese ganze Datei** (einmal je Sitzung), die Überschriften der
    Designrichtlinien; alles Weitere (Katalog, Backlog bis ‚## Erledigt‘, vom CHANGELOG der neueste Eintrag, PROMPT.md) nur, soweit
    die Aufgabe es braucht. Dann das **Lagebild** (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand, Nutzungsgrenze –
    2.5) als **eigene Antwort** vor jeder
    Arbeit, auch wenn der Starttext einen Auftrag hat: das Lagebild im Chat und als Datei, danach das
    Fenster (2.1); die Arbeit beginnt erst nach der
    Antwort des Nutzers. Prüfung:
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
    wie in Nr. 15 und dazu die Backlog-Köpfe; das Fenster nach dem Lagebild ist dann ‚Was möchtest du als Nächstes tun?‘:
    je angehängtem Repo eine Möglichkeit mit Version und Backlog-Spitze (offene Usertests zuerst), bei
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
- **Begriffe** wie in Designrichtlinie 6 (R-10.9), auch im Chat.
- **Per du:** Claude spricht den Nutzer immer mit ‚du‘ an – nie ‚Sie‘ und nie ‚ihr‘, auch nicht in Dateien, Testfällen und
  Auswahlfenstern.
- **Jede Meldung deutsch:** auch kurze Zwischenmeldungen während der Arbeit, Statuszeilen, Bildunterschriften zu Screenshots
  und Fragen im Auswahlfenster – nie englisch. Englisch bleiben nur Code (nächster Punkt) und Fachbegriffe ohne gängiges deutsches
  Wort.
- **Code englisch, Texte deutsch:** alle Namen im Code sind englisch – Funktionen, Variablen, Kennungen, Eigenschaften, Methoden, Ereignisse,
  CSS-Klassen, Schlüssel und neue Dateinamen. **Gibt es ein Vorbild, wird sein Name übernommen** – zuerst die Web-Plattform (HTML, DOM, CSS), dann
  Apple (UIKit, SwiftUI, HIG) – in der Schreibweise von JavaScript (`camelCase`, Wahrheitswerte ohne `is` wie `open`, `hidden`); erfunden wird nur,
  wo es keines gibt. Deutsch ist alles, was man liest: Kommentare im Code, Doku, Regeln, CHANGELOG, Backlog, Katalog-Texte, Prüfmeldungen und alles,
  was die App anzeigt; Namen aus dem Code stehen darin unübersetzt in `Code-Schrift`. Neuer und geänderter Code ist sofort englisch; Bestehendes wird
  umbenannt, wenn sein Baustein ohnehin umgebaut wird (bei einer AD-Bean: Kennung, Schnittstelle, CSS-Klassen und Katalogdatei). Nie umbenannt werden
  gespeicherte Daten und Backups (Schlüssel im localStorage, Felder im Backup – R-9.2), die festen Fassungen `fassung/X.Y.Z/` (R-10.3) sowie Prüf- und
  Dateinamen, solange Regeln oder Changelogs sie zitieren.
- Schaltflächen im Chat mit ihren Lucide-Icon-Namen benennen (z. B. „pencil“, „trash“), nicht mit Emojis.

Prüfung: Selbstkontrolle; Namen der AD-Beans `checkBeans` (R-1.13).

---

## 2. Einzelheiten und Formate

### 2.1 Rückfragen und Auswahlfenster

- Rückfragen so, dass kurz geantwortet werden kann: Ja/Nein- oder Ok-Fragen, wo möglich; mehrere Möglichkeiten als
  Aufzählung a, b, c …; Fragen nummeriert (1, 2, 3 …); die eigene Empfehlung kurz dazu.
- **Auswahlfenster:** bis zu 4 Fragen, je 2–4 Möglichkeiten; die Empfehlung zuerst mit ‚(Empfohlen)‘ (so geschrieben, nie
  ‚(Empfehlung)‘) und ihrem Grund in der Beschreibung, immer ‚Ich schreibe im Chat‘. Bei der Rückmeldung zu einem Usertest
  (‚P-n: …‘, 2.3) steht keine Empfehlung. Im Fenster steht nur eine **kurze Frage** mit den Schaltflächen – keine Erklärtexte,
  keine Zeitangaben. Das Feld ‚Sonstiges‘ schneidet lange Texte ab.
- **Die Datei davor, das Fenster danach:** alle wichtigen Informationen der Antwort (Lagebild, Link, Schritte, Testfälle, Bericht,
  Wortlaut nach 0 Nr. 29, Muster, Erklärungen) stehen vor jedem Fenster in einer Datei im Seitenbereich (`SendUserFile`,
  `display: 'render'`) und ebenso im Chat (Kasten Punkt 4), auch wenn die Frage im Fenster nicht danach fragt. Das Fenster enthält nur
  die kurze Frage, ohne Link. Nie zwei Fenster direkt hintereinander; ein weiteres Fenster in derselben Antwort erst, wenn das vorige
  beantwortet ist und davor eine neue Ausgabe mit Erklärung steht – so endet jede Antwort, nach der der Nutzer etwas tun soll, mit
  einem Fenster und einem Push am iPad (Kasten Punkt 3). Die Vorschau-Funktion kommt nicht an. Mehrere Themen nacheinander: je
  Fenster eines.
- Schließt der Nutzer das Fenster und antwortet im Text, gilt die Antwort; bei den nächsten Fragen kommt trotzdem wieder das
  Auswahlfenster.
- Eine **Antwortzeile zum Kopieren** (z. B. `1 ja · 2 a · 3 ja`) gibt es nur bei mehr als 4 Fragen – dann ist sie der einzige
  Weg.
- **Reihenfolge in einer Antwort:** erst die Arbeit und alles zum Lesen, dann das Fenster; nach der Antwort nur noch kurz. Solange ein
  Fenster offen ist, ist die Antwort nicht fertig.
- Prüfung: Selbstkontrolle; `checkCollab` (Wortlaut).

### 2.2 Kontextstand

- Claude liest den Kontextstand mit `node ../AppDesign/werkzeug/messung.mjs` (in AppDesign `node werkzeug/messung.mjs`) ab –
  unmittelbar vor jedem Fenster, nie geschätzt – und setzt ihn als ‚(Kontext N)‘ ans Ende jeder Frage im Fenster (Kasten Punkt 5);
  meldet das Werkzeug einen Fehler, steht der Fehler statt der Zahl da. Die Zeitzeile des Werkzeugs und die Uhrzeitzeile stehen nicht
  in der Antwort.
- **Kontext:** Größe der Sitzung = Eingabe + Zwischenspeicher + geschrieben des letzten eigenen Modell-Aufrufs. Ab 300.000 oder
  nach einer automatischen Zusammenfassung hängt das Werkzeug ‚⚠ Übergabe fällig‘ an; dann übergibt Claude nach dem laufenden
  Schritt von selbst (0 Nr. 13). Läuft der letzte Aufruf mit einem anderen Modell als die Sitzung eingestellt hat (Rückfall bei hoher Last,
  `model_fallback`), hängt es ‚⚠ Modell …‘ an (2.5).
- Prüfung: `tests/messung.mjs` (Gegenprobe `--gegenprobe`).

### 2.3 Bericht, Usertests und Rückmeldung

- **Bericht nach einer Version** (0 Nr. 11): je Punkt ‚entspricht HIG‘ oder ‚weicht ab, weil …‘ und das Ergebnis des HIG- und
  Regel-Prüfskripts (Apple-Review); Erinnerung, die App neu zu starten; Screenshots in Viererpaketen; am Ende ausdrücklich: ‚Bitte
  zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.‘
  (0 Nr. 22). Bei Mustern und Versuchen stehen der vollständige Link und nummerierte Schritte mit ‚Erwartet: …‘ in der Datei und im
  Chat (Kasten Punkt 4).
- Je gebauter Version **ein Usertest** (z. B. P-54) mit nummerierten Testfällen (User) (P-54/0, P-54/1 …) – im CHANGELOG unter
  ‚Testfälle P-54‘ und im Chat wörtlich gleich. Die Testfälle beginnen mit **/0 ‚Version prüfen‘**: auf jedem Gerät die Versionszeile ansehen (App-Version **und**
  AppDesign-Version); erst wenn beide stimmen, wird weiter getestet.
- Jeder Testfall (User) prüft genau eine Sache, als Schritt-für-Schritt-Anleitung: 1. was antippen bzw. einstellen (Gerät,
  quer/hoch, hell/dunkel), 2. was tun, 3. ‚Erwartet: …‘. Bei jedem Schritt, der etwas anzeigt, steht die erwartete Meldung **auf
  jedem beteiligten Gerät** wörtlich; ein automatischer Test der Version prüft genau diese Texte auf beiden Geräten (welcher, steht
  beim Testfall). Verweise wie ‚wie oben‘
  oder ‚siehe Tabelle‘ ersetzen keine Schritte.
- **Rückmeldung:** in der Kachel (z. B. ‚P-99: alles ok‘ / ‚nicht ok‘) oder im Chat, z. B. ‚ok bis auf 3‘; Link und Schritte stehen in
  der Datei neben der Kachel; den Push bringt das Fenster (`PushNotification` kommt am iPad nicht an); Abweichungen kommen wieder in
  ‚0. Nächste Version‘.
- Prüfung: `doku.mjs` (Testfälle der neuesten Version beginnen mit /0, nennen App- und AppDesign-Version, jeder Testfall mit
  nummerierten Schritten und ‚Erwartet‘).

### 2.4 Backlog

Jede `BACKLOG.md` hat oben die Zeile ‚Stand · Aktuelle Version‘ und diese Abschnitte; ein Punkt wandert von unten nach oben
(in Klärung → Nächste Version → Prüfen → Erledigt):

- **0. Nächste Version X.Y.Z:** fertig geklärte Punkte (Status **bereit**: Muster bestätigt, allgemein/App geklärt, Texte fest)
  mit Spalte ‚bereit seit‘ und der Zeile ‚N Punkte bereit‘.
- **1. Auf iPad und iPhone prüfen:** je gebauter Version ein Usertest mit Testfällen.
- **2. Weitere Themen (in Klärung):** Status **offen**.
- **3. Später:** Ideen.
- **Erledigt:** mit Version und Datum.

Jeder Punkt: Nummer, Priorität, Thema, allgemein oder App, Status (offen · bereit · prüfen · später). Nach jeder Version: die
gebauten Punkte aus ‚0.‘ entfernen, den Usertest unter ‚1.‘ im Backlog der App anlegen, in der er läuft (AppDesign nennt ihn in
der Zeile des Themas), ‚Erledigt‘ ergänzen. Neue Themen: ‚Ins Backlog übernehmen? Ja/Nein‘ und ‚Mit welcher Priorität? a) 1 hoch ·
b) 2 mittel · c) 3 niedrig‘, mit ‚So macht es Apple‘ und Empfehlung. **Erinnerung:** zu Beginn einer Sitzung (kurze Liste) und am
Ende jeder Antwort, in der etwas gebaut oder entschieden wurde – zuerst ‚Nächste Version X.Y.Z: N Punkte bereit (…)‘, dann ‚Offen
im Backlog: …‘. Gelesen wird ein Backlog bis ‚## Erledigt‘; ‚Erledigt‘ nur bei Bedarf. Prüfung: Selbstkontrolle; Nummern
`checkSchema` (unten).

**Nummern und Präfixe** – eine Nummer bezeichnet überall genau eine Sache · nie wiederverwenden, nie
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
  (`arbeit/APD-78 …`).
- Prüfung: `doku.mjs` – `checkSchema` (unbekanntes Präfix, alte Nummer, lokaler Buchstabe, der überall gilt, führende Null,
  `ZUORDNUNG.md`, Themennummern, alte Begriffe, Verweise in `arbeit/`, diese Tabelle; Gegenprobe `--gegenprobe schema`).

### 2.5 Übergabe, neue Sitzung, Lagebild

- **`UEBERGABE.md`** enthält nur den Stand der Sitzung: Lagebild wie in 0 Nr. 15 und dazu Chatnummer und Sitzungsgröße,
  Ergebnisse, nächster Schritt, danach, neue Vereinbarungen (stehen zusätzlich schon in den Richtlinien), was zuerst zu lesen ist,
  Starttext. Dauerhaftes (Arbeitsumgebung, Befehle) steht in der AppDesign-`CLAUDE.md`.
- Der **Starttext** steht immer als Codeblock (```), damit er mit der Kopieren-Schaltfläche übernommen werden kann, und nennt,
  wo auf GitHub alles liegt (Repo, Branch `main`, Dateien).
- **Neue Sitzung starten:** `create_session` in derselben Umgebung mit dem Modell und dem Aufwand, die in diesem Chat
  gerade eingestellt sind – `model` = `session_context.model` aus `get_session` (nicht ein vorübergehender Rückfall), `effort` =
  `session_context.effort_level` aus `get_session` (der im Chat eingestellte Aufwand) –, Repo AppDesign angehängt; die
  App-Repos holt die neue Sitzung selbst dazu (`add_repo`), der Starttext ist ihre erste Nachricht. Scheitert das Starten, öffnet
  der Nutzer einen neuen Chat in derselben Umgebung und fügt den Starttext ein. **Name** `<App> <Chatnummer> – <Thema>` mit
  vierstelliger, aufsteigender Nummer (z. B. ‚Reiselogbuch 0001 – AppDesign 4.12.0‘); jede Sitzung, die die nächste startet,
  erhöht die Nummer um 1, die nächste steht in `UEBERGABE.md`; Claude nennt dem Nutzer den Namen.
- **Aufwand:** `create_session` übernimmt ihn nicht von selbst – Claude gibt ihn mit (`effort`). Die Umgebungsvariable
  `CLAUDE_CODE_EFFORT_LEVEL` bleibt ungesetzt: Sie übergeht die Einstellung im Chat.
- **Lagebild prüft Modell und Aufwand:** Modell und eingestellten Aufwand mit `get_session` (`session_context.model`,
  `session_context.effort_level`), den tatsächlichen Aufwand mit `"effort"` der Modell-Aufrufe in der Sitzungsdatei
  `/root/.claude/projects/…/*.jsonl` und `echo $CLAUDE_CODE_EFFORT_LEVEL`. Weichen eingestellt und tatsächlich ab, nennt Claude es im
  Lagebild mit dem Grund. Claude nennt Modell und Aufwand im Lagebild; ändern
  kann der Nutzer sie mit `/model` bzw. `/effort` – die nächste Sitzung übernimmt beides aus diesem Chat (‚Neue Sitzung starten‘).
  Bei hoher Last weicht die Sitzung von selbst auf das nächste Modell aus (Eintrag `model_fallback` in der Sitzungsdatei, z. B.
  ‚Switched to Opus 5 … due to high demand for Opus 5.5‘) – `messung.mjs` hängt dann ‚⚠ Modell …‘ an (2.2), Claude nennt es in der
  nächsten Ausgabe. Die Nutzungsgrenze liest Claude mit `get_session` (`rate_limit_info`) und nennt sie im Lagebild.
- Prüfung: Selbstkontrolle (Modell, Aufwand und Nutzungsgrenze mit `get_session`).

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
- Prüfung: Selbstkontrolle; messbare HIG-Punkte `hig.mjs` (0 Nr. 23).

### 2.7 Muster mit Messung (0 Nr. 20)

Ein Muster, das am Gerät misst, wird wie die App geprüft, **bevor** der Nutzer es bekommt: es läuft automatisch im Safari-Modell
(Chromium und WebKit), jeder Fall des Versuchs wird durchgespielt, was das Muster aufzeichnet und auswertet, muss zu den Bildern
des Modells passen, und eine **Gegenprobe** mit absichtlich eingebautem Sprung muss rot werden. Das Muster **führt durch den
Versuch**: feste Liste der Fälle, oben ‚Nächster Schritt: …‘, erledigte Fälle abgehakt, ‚Messung teilen‘ erst, wenn alle Fälle
drin sind (oder ausdrücklich ‚trotzdem teilen‘). Am Gerät zeigt es nur **‚aufgenommen‘** – bewertet wird ausschließlich aus den
Rohdaten durch Claude, damit keine falsche Anzeige in die Irre führt.

Prüfung: Safari-Modell `safari.mjs` und Gegenprobe (0 Nr. 20).

### 2.8 Regelwächter

- Abgeschaltet (APD-123); Werkzeug (`werkzeug/regelwaechter.mjs`) und Prüfung (`tests/regelwaechter.mjs`) bleiben im Repo und werden
  nicht eingerichtet.

---

## Versionsgeschichte

Steht in `README - Zusammenarbeit Versionsgeschichte.md` (neueste oben, am Ende die Zuordnung alt → neu bis 2.16.0); jede neue
Version bekommt dort eine Zeile.
