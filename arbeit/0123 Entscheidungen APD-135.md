# Restliche Entscheidungen zu APD-135 – Sitzung 0123

**Stand 17.11.2026** · Quelle: `arbeit/APD-135 Konsolidierung 3 Befund und Plan.md`, Abschnitt 1 (Wortlaute W-n), 5 (Punkte) und 7 (schon entschieden).
Offen sind noch **20** Entscheidungen. Sie kommen in fünf Fenstern zu je bis zu 4 Fragen; jede Antwort trage ich sofort in Abschnitt 7 und ins
Backlog ein. Der genaue Regel-Wortlaut kommt danach noch einmal zur Bestätigung (0 Nr. 29), mit der Bau-Frage des Pakets.

## Fenster 1 – Paket 3 (kommt mit Paket 1 in eine Version, J-4)

**APD-135/J-16 · CHANGELOG lesen (W-27)**
- alt (0 Nr. 15): ‚alles Weitere (Katalog, Backlog, CHANGELOG, PROMPT.md) nur, soweit die Aufgabe es braucht.‘
- neu: ‚alles Weitere (Katalog, Backlog bis ‚## Erledigt‘, vom CHANGELOG der neueste Eintrag, PROMPT.md) nur, soweit die Aufgabe es braucht.‘
- (a) **Regel ‚neuester Eintrag‘ (Empfohlen)** – Risiko keins, `checkDocs` liest ohnehin nur ihn; spart bis ≈ 43.000 Token je ungezieltem Lesen
- (b) Archivdatei `CHANGELOG bis X.Y.Z.md` – Risiko gering, Prüfung APD-78/S-1 liefe dort nicht mehr

**APD-135/J-17 · Usertests nur im Backlog der App (W-28)**
- alt (2.4): ‚Nach jeder Version: … den Usertest unter ‚1.‘ anlegen, ‚Erledigt‘ ergänzen.‘ – heute stehen 54 Usertests in beiden ‚Erledigt‘ mit verschiedenem Wortlaut
- neu: ‚… den Usertest unter ‚1.‘ im Backlog der App anlegen, in der er läuft (AppDesign nennt ihn in der Zeile des Themas), ‚Erledigt‘ ergänzen.‘
- (a) **ja (Empfohlen)** – eine Stelle statt zwei, `checkSchema` APD-78/S-5 bleibt grün
- (b) weiter in beiden Backlogs

**APD-135/J-7 · ‚Muster nur hell‘ (W-7)**
- alt: steht nur in `UEBERGABE.md` (‚Vereinbarung … Muster bis auf Weiteres nur hell – in jede Übergabe übernehmen‘); 0 Nr. 6 ‚zuerst nur hell und quer, dunkel und hoch erst, wenn hell passt‘
- neu: 0 Nr. 6 ‚**Muster:** … zuerst nur hell und quer (bis auf Weiteres nur hell), dunkel und hoch erst, wenn hell passt und der Nutzer es verlangt; …‘; die Hinweise zur Prüfumgebung aus der Übergabe (Pages über `curl`, `createRequire`, `git push origin HEAD:main` …) als Punkt ‚Hinweise zur Prüfumgebung‘ in die AppDesign-`CLAUDE.md`
- (a) **in 0 Nr. 6 aufnehmen, Hinweise in die `CLAUDE.md` (Empfohlen)** – was nicht in den Richtlinien steht, geht verloren (0 Nr. 16)
- (b) Vereinbarung aufheben (Muster wieder hell und dunkel)
- (c) weiter nur in der Übergabe

**APD-135/J-11 · Nutzungsgrenze im Lagebild (W-15)**
- alt (0 Nr. 15): ‚das **Lagebild** (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand – 2.5)‘; 2.5 nennt eine zweite Liste
- neu: 0 Nr. 15 ‚… (Versionen, offene Usertests, Backlog-Spitze, Modell und Aufwand, Nutzungsgrenze – 2.5)‘; 2.5 ‚Lagebild wie in 0 Nr. 15 und dazu Chatnummer und Sitzungsgröße …‘
- (a) **dauerhaft in 0 Nr. 15 (Empfohlen)** – die Grenze hat in 0122 Hilfsagenten zweimal gestoppt; `get_session` liefert sie (`rate_limit_info`)
- (b) nur bei Bedarf (dann nur W-15 ohne Nutzungsgrenze)

## Fenster 2 – Paket 3 Rest und Paket 2 (Import, ReiseLogBuch-Import 1.4.0)

**APD-135/J-25 · ‚Arbeitsumgebung (Cloud)‘ der AppDesign-`CLAUDE.md`** (4.028 B, jede Sitzung automatisch geladen, Befund L-15)
- (a) **bleibt (Empfohlen)** – sonst wird das Einrichten vergessen (Vermutung) · (b) nach `tests/README.md` auslagern

**APD-135/J-13 · Kilometer und Quartierpreis in der Konvertierung (W-30)**
- (a) **Felder `km`/`price` in Anleitung und Werkzeug, Kilometer ins Feld (Empfohlen)** – die App hat die Felder seit 3.41.0 · (b) weiter als Kachel-Frage

**APD-135/J-33 · Mehr als 4 Fragen bei einer Konvertierung**
- (a) **Fenster nacheinander, die wichtigsten 4 zuerst (Empfohlen)** · (b) Antwortzeile zum Kopieren wie 2.1

**APD-135/J-34 · Werkzeug `pruefen.mjs` ohne `--zone`**
- (a) **Abbruch statt Wien (Empfohlen)** – Erkenntnis ‚nie die Zeitzone raten‘ · (b) Wien als Vorgabe lassen

## Fenster 3 – Paket 2 Rest, Paket 4, Paket 7 (Stufen)

**APD-135/J-35 · Versionsgeschichte für das Import-`PROMPT.md`**
- (a) **nein, sie bleibt in der README (I-1) (Empfohlen)** · (b) eigene Versionsgeschichte im `PROMPT.md`

**APD-135/J-21 · Paket 4 – Doppeltext der Designrichtlinie (W-49, W-50)**
- Grundsatz neu: ‚Was gilt und geprüft wird, steht als Regel im Regelkatalog (17) … Die Abschnitte 1–15 nennen dazu nur Werte, Maße, Farben, technische Namen und Begründungen und die Nummer der Regel – sie wiederholen den Regeltext nicht.‘; 12 Absätze wiederholen heute ≥ 30 % ihrer Regel
- (a) **Grundsatz und alle Paare in einer eigenen Version (Empfohlen)** · (b) nur den Grundsatz, Paare beim nächsten Anfassen · (c) so lassen
- Risiko mittel: ein Wert kann beim Kürzen verloren gehen – je Paar die Liste ‚bleibt im Abschnitt‘ aus Befund D

**APD-135/J-22 · Stufe ‚App‘ im Prüflauf**
- (a) **erst mit Schritt 2 und der Prüfseite (Empfohlen)** – Schritt 1 spart nur ~3,6 min · (b) Schritt 1 jetzt · (c) gar nicht

**APD-135/J-23 · Nach einer kleineren Stufe die nächste Version voll?**
- (a) **ja (Empfohlen)** – lastabhängige Wackler zeigen sich nur im vollen Lauf · (b) nein

## Fenster 4 – Paket 5 (Prüfwerkzeug) und Paket 7 (B-5)

**APD-135/J-26 · Umfang Paket 5** (Vorlauf mit sofortigem Abbruch, ‚lang zuerst‘, Ausgabe eines Wacklers sichern, `checkCatalog` nur Zeichenketten in laufenden Dateien u. a.)
- (a) **alles, ‚lang zuerst‘ mit Vergleichslauf (Empfohlen)** – 2,5 bis 6 min je Lauf, im Fehlerfall bis ~75 min · (b) ohne ‚lang zuerst‘ · (c) nur Vorlauf und Wackler-Ausgabe

**APD-135/J-24 · Vier Prüfläufe ohne Grundregeln (W-54)** – `ablauf-tastatur-still`, `ablauf-abspielen`, `ablauf-suche-iphone`, `ablauf-texte-ablaeufe` versprechen im Kommentar ‚Grundregeln im Endzustand‘, prüfen sie aber nicht
- (a) **Grundregeln ergänzen, Laufzeit vorher messen (Empfohlen)** · (b) Kommentare streichen, Ausnahmeliste der Gegenprobe ergänzen

**APD-135/J-29 · APD-134 (Wackler `ablauf-markierung-menues`)**
- (a) **erst die Wackler-Ausgabe (C-68) bauen, die Ursache nach dem nächsten Wackler beheben (Empfohlen)** · (b) Vermutungen C-62 (‚Schließen mitten im Öffnen‘) und C-63 (Haltezeit 750 ms) gleich mit Gegenprobe beheben

**APD-135/J-27 · B-5 (Umbau `ui.js`)**
- (a) **nach Paket 6 neu entscheiden, Schritte nur bei konkretem Anlass (Empfohlen)** · (b) Grundbaustein und Bündelung der Hörer fest einplanen · (c) alle 8 Schritte, je Schritt eine Version

## Fenster 5 – Paket 5 Rest und Paket 6 (Bausteine)

**APD-135/J-30 · Messungen außerhalb der Fassung**
- (a) **Regel ‚Messungen in `tests/messungen/` nie umbenennen‘ (Empfohlen)** · (b) `messungen/` in die Fassung aufnehmen (Codeänderung)

**APD-135/J-31 · Umfang Paket 6**
- (a) **B-4.1, B-4.2, dann B-3.1 und B-3.2 (Empfohlen)** · (b) nur B-4 · (c) B-3 bis Gruppe C

**APD-135/J-28 · `.iconbtn` und `.lcount` (W-55)**
- (a) **`.iconbtn` mit Doku streichen, `.lcount` behalten (Empfohlen)** – der große Titel ist beschrieben, nur zurückgestellt · (b) beide behalten · (c) beide streichen

**APD-135/J-32 · Allgemeines aus der App nach AppDesign (U-14 bis U-24, `sw.js` als Basis)**
- (a) **als eigenes Thema ins Backlog, nach B-3 (Empfohlen)** · (b) mit Paket 6

## Danach

Bau-Frage für **AppDesign 4.60.0 mit Reiselogbuch 3.57.0** (APD-30 Wischaktionen, APD-133/V-1 Designrichtlinie 13; Prüflauf voll) – getrennt von der Konsolidierung (J-3).
