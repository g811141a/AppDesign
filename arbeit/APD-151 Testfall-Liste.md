# APD-151 – Testfall-Liste ‚Fenster am iPhone wie am iPad‘ (Sitzung AppDesign 0005)

**27.11.2026** · Grundlage sind die Entscheidungen APD-151/J-2 und J-3 (`arbeit/APD-151 Rueckfrage wie am iPad.md`, `arbeit/APD-151 Klaerung J-2.md`). Sie ersetzt den Vorschlag mit Stufen in
`arbeit/APD-151 Apple-Abgleich und Testfall-Liste.md` (Abschnitt 3 und 4). Die Nummern M- gelten nur in dieser Datei (außerhalb: APD-151/M-1 …).

## Was das Muster zeigt

- **Wann:** im iPhone-Aufbau (`isPhone()`), hoch und quer, für jedes Fenster außer Meldungen.
- **Wo und wie:** in der Mitte wie das Formblatt am iPad (15.17 Variante B), Höhe nach Inhalt.
- **Breite:** 90 % nach R-4.8. Quer mindestens 480 px.
- **Rand:** oben und unten mindestens 10 px, nie unter Statusleiste oder Home-Leiste. Bei langem Inhalt rollt dieser.
- **Abdunkelung:** 35 %. Die Seite bleibt groß.
- **Öffnen und Schließen:** gleitet von unten (R-1.12).
- **Ziehen nach unten** wie am iPad: Nur das Fenster fährt mit, die Abdunkelung wird heller. Mit Änderungen zieht es zäh und fragt am x (R-4.4).
- **Abdunkelung antippen:** schließt nicht. Escape wirkt wie x.
- **Tastatur** wie am iPad (R-4.5).
- **Kopfzeile:** kompakt wie heute am iPhone.
- **Meldungen** bleiben wie sie sind.
- **Technik im Muster:** Der Entwurf schaltet für die Fenster der Vorführung das Blatt im iPhone-Aufbau ab, über eine Weiche um `isPhone()` in `placeDialogs` und in den `blatt…`-Teilen. Er ändert `v4/` nicht.
  In `v5/` kommt das direkt in `ui.js` und gilt dann für alle Fenster, auch im Reiselogbuch.

## Testfälle (automatisch)

Sie stehen in `arbeit/APD-149/muster-pruefen.mjs`, in Chromium und WebKit (Safari-Modell). Nach jedem Schritt laufen die Grundregeln (`pruefe.mjs` schritt, `hig.mjs`).
Vorführung `katalog/index.html#presentation`, hell. Gerät iPhone hoch, wenn nichts anderes steht.

| Nr. | Gerät · Lage | Handlung | Erwartet |
|---|---|---|---|
| M-1 | iPhone hoch | ‚Bearbeiten‘ → ‚Anderes Fenster öffnen‘ | in der Mitte des sichtbaren Bereichs, Höhe nach Inhalt, Breite 90 %, Ecken rundum; Abdunkelung 35 %, Seite nicht verkleinert (kein `blatt-zurueck`); gleitet von unten mit der Feder (R-1.12) |
| M-2 | iPhone hoch | ‚Neuer Eintrag‘, ‚Eintrag bearbeiten‘ | ebenso Höhe nach Inhalt, in der Mitte |
| M-3 | iPhone hoch | Fenster mit Inhalt höher als der Bildschirm | oben und unten ≥ 10 px bzw. sichere Ränder; der Inhalt rollt, der Fensterkopf steht still |
| M-4 | iPhone hoch | am Kopf kurz nach unten ziehen, loslassen | nur das Fenster fährt mit, Abdunkelung heller, Seite bleibt; federt zurück |
| M-5 | iPhone hoch | weit bzw. schnell nach unten wischen; im Inhalt, wenn er ganz oben steht | zu wie x (Ereignis ‚Fenster zu‘, reason user) |
| M-6 | iPhone hoch | Titel ändern, nach unten ziehen | zäh, federt zurück, Sprechblase am x (R-4.4) |
| M-7 | iPhone hoch | neben das Fenster auf die Abdunkelung tippen | bleibt offen, nichts darunter wird angetippt; Escape fragt bzw. schließt wie x |
| M-8 | iPhone hoch | Feld ‚Titel‘ antippen (Safari-Modell Tastatur) | Fenster gleitet über die Tastatur, wird niedriger, wenn nötig; Feld steht 16 px über ihr; Kopf und Leisten still (`checkFieldVisible`, `checkTastaturStill`) |
| M-9 | iPhone hoch | Tastatur schließen | Fenster bleibt bzw. gleitet zurück wie am iPad (APD-36), kein Sprung |
| M-10 | iPhone quer | Fenster öffnen | in der Mitte, Höhe nach Inhalt, höchstens bis 10 px vom Rand; Breite mindestens 480 px, höchstens 90 % (R-4.8) |
| M-11 | iPhone hoch → quer → hoch | bei offenem Fenster drehen | bleibt offen, steht nach jedem Drehen in der Mitte, Fokus und Eingabe bleiben (R-4.6, R-8.1) |
| M-12 | iPhone hoch | Buchstaben eingeben | Fenster ändert weder Breite noch Lage (wie APD-72/D-21) |
| M-13 | iPhone hoch | Hinweisfenster über dem Fenster; Fenster ersetzen (H-3) | Meldung klein in der Mitte darüber wie heute; das neue Fenster gleitet wie M-1 herein |
| M-14 | iPhone hoch | ‚Bewegung reduzieren‘ | Öffnen und Schließen blenden über, Ziehen folgt dem Finger (R-1.9) |
| M-15 | iPhone hoch | VoiceOver-Baum, Fokus | Fokus beim Öffnen und nach dem Schließen wie heute; Abdunkelung nicht im Baum (R-1.8) |
| M-16 | iPhone hoch | Schalter ‚Kopfzeile alle 2 s neu aufbauen‘ ein, 5 s warten | Fenster bleibt offen und steht still, Stapel ‚sheet‘ |
| M-17 | iPad quer und hoch | dieselben Fenster | unverändert (`checkSheet` APD-72/D-1 bis D-21 grün) |
| M-18 | Gegenprobe | Weiche abgeschaltet (`__adPresentationGegenprobe = 'blatt'`) | M-1 und M-7 werden rot: wieder Blatt in voller Höhe, Antippen schließt |

## Testfälle (User), nur am Gerät

Die Schritte zum Ausprobieren kommen mit dem Muster (Bericht nach 0 Nr. 11).
- Aussehen und Gleiten am iPhone hoch und quer.
- Ziehgefühl nach unten.
- Tastatur bei ‚Titel‘.
- Abdunkelung antippen.
- Vergleich mit dem Fenster am iPad.

## Was danach kommt

- **Wortlaut (0 Nr. 29):** R-4.6 (‚Blatt auf dem iPhone‘ entfällt, das Fenster ist wie am iPad), 15.17 (Fenster als Blatt, Variante A entfällt), dazu der Verweis in Designrichtlinie 7.
- **Prüfungen:** `checkSheet` B1–B24 werden mit `v5/` auf das Fenster umgestellt.
- **Reiselogbuch:** `ablauf-blatt` und `ablauf-fenster` werden mit `v5/` auf das Fenster umgestellt. Die Tageserfassung zeigt am iPhone, ob M-3 und M-8 dort gelten.

## Stand der Sitzung AppDesign 0005 (zu dieser Antwort)

- **Entschieden APD-151/J-3:** Breite 90 %, quer wie hoch, Tastatur wie am iPad, Antippen der Abdunkelung schließt nicht. Das steht im Backlog und in `arbeit/APD-151 Klaerung J-2.md`.
- **Fehler von mir:**
  - Mein Commit cc5e51e hat Konfliktmarken in `BACKLOG.md` auf `main` gebracht. Reiselogbuch 0169 hatte gleichzeitig die Zeile APD-154 geändert, und das Aufsetzen ist am Konflikt gescheitert. Ich habe trotzdem committet, weil mein Befehl nach dem Fehler weiterlief.
  - Berichtigt in 281b5ca: Die Zeile von 0169 ist unverändert, APD-151 hat meinen Zusatz. 0169 hat einen Hinweis bekommen.
  - Künftig hängt in der Befehlskette nach `stash pop` alles mit `&&` daran, und vor dem Commit prüfe ich auf Konfliktmarken.
- **`doku-regeln`:** noch 2 Fehler, beide in der `UEBERGABE.md` der Kette Reiselogbuch. `BACKLOG.md:16` hat 0169 berichtigt.
- **Übergabe:** Der Kontext steht bei 273.889, die Schwelle ist 300.000. Das Muster passt nicht mehr in diese Sitzung.
  Vorschlag: nach deinem ‚Ja‘ zur Testfall-Liste an **‚AppDesign 0006 – APD-151 Muster Fenster am iPhone wie am iPad‘** übergeben.

Nächste Version AppDesign (mit `v5/`): 3 Punkte bereit (APD-149/J-1, APD-152, APD-153). Offen im Backlog: APD-135, APD-136, APD-149, APD-148, APD-151, APD-154 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150, APD-155 (Prio 2) · APD-70, APD-147, APD-156 (Prio 3).
