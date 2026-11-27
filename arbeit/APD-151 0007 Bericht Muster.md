# APD-151 – Muster ‚Fenster am iPhone wie am iPad‘ am Gerät ausprobieren (Bericht aus AppDesign 0006, gegeben in AppDesign 0007)

**27.11.2026** · Nachgeprüft in 0007: Seit 52ca53d hat sich an `v4/`, `katalog/` und `tests/` nichts geändert, Pages ist ‚success‘ (GitHub-API, Stand 632f85c). Die Prüfergebnisse stammen aus der Sitzung 0006 (Bericht `arbeit/APD-151 0006 Bericht Muster.md`).

- **Neu seit dem Lagebild:** Die Kette Reiselogbuch (0170) hat Reiselogbuch **3.59.1** (RLB-128) veröffentlicht, ReiseLogBuch `main` = `d1e19d0`, `APP_VERSION` 3.59.1. AppDesign 4.71.0 ist unverändert.

## Bericht

- Das Muster ist im Entwurf `katalog/entwurf/presentation-commands.js` gebaut, nach APD-151/J-2 und J-3.
  - Am iPhone steht jedes Fenster des Stapels wie am iPad in der Mitte, so hoch wie sein Inhalt und 90 % breit.
  - Die Abdunkelung beträgt 35 %, die Seite dahinter bleibt groß. Antippen der Abdunkelung schließt nicht.
  - Die Tastatur verhält sich wie am iPad.
- `v4/` bleibt unverändert. Eine Weiche schaltet nur für die Fenster der Vorführung den Weg des iPad ein.
- Die festen Prüfungen APD-151/M-1 bis M-17 sind in Chromium und WebKit grün.
  - Die Gegenprobe M-18 ist wie verlangt rot: M-1 fünfmal, M-7 einmal.
  - Die Prüfungen von APD-149 (S-1 bis S-16, L-1 bis L-4, Gegenprobe S-15), `entwurf-regeln` und `bean-katalog` sind ebenfalls grün.
- Beim Prüfen ist ein Fehler aus v4 aufgefallen, der auch am iPad auftritt (Aufgefallen Nr. 1). Im Muster ist er für die Fenster des Stapels behoben.

## Alle Änderungen auf `main`

| Datei | Was |
|---|---|
| `katalog/entwurf/presentation-commands.js` | **Weiche APD-151:** Klasse `ad-presentation-sheet` am Fenster des Stapels. 10 Funktionen von `ui.js` werden aus ihrem eigenen Text neu gebaut, darin fragen `isPhone()`, `blattOben()`, `blattZu()` und `blattDunkel()` über die Weiche. Ohne die Klasse gilt genau v4. |
| ebenda | CSS: am iPhone die Maße des iPad-Fensters (R-4.8, Ecken 18 px rundum). Die Kopfzeile bleibt kompakt. |
| ebenda | Tastatur wie am iPad: Die Höhe vor dem Antippen gilt weiter (`dlgFest`). Nach dem Schließen der Tastatur gleitet das Fenster zurück in die Mitte (Aufgefallen Nr. 1). |
| ebenda | Antippen der Abdunkelung schließt nicht, am iPhone und am iPad (Aufgefallen Nr. 2). |
| ebenda | Ein Fenster ersetzen (H-3) gleitet: Das alte gleitet hinaus, das neue herein (M-13, Aufgefallen Nr. 3). |
| ebenda | In der Vorführung gibt es neu ‚Fenster mit langem Inhalt‘ (M-3). Anleitung und Verlauf sind ergänzt. |
| `arbeit/APD-149/muster-pruefen.mjs` | M-1 bis M-18 sind neu. Es gibt zwei neue Aufrufe: `MUSTER=apd151` (nur APD-151) und `APD151_GEGENPROBE=1` (M-18). S-10 ist angepasst: Antippen neben das Fenster schließt nicht und fragt nicht. |
| `arbeit/APD-149 0006 Lagebild.md`, diese Datei | Lagebild und Bericht |

- Keine Änderung an `v4/`, `tests/`, den Richtlinien, `CLAUDE.md` oder einer Fassung.

## Prüfungen (diese Sitzung, Stand 52ca53d)

| Prüfung | Chromium | WebKit |
|---|---|---|
| `muster-pruefen.mjs` ganz (S-, L-, M-1 bis M-17) | 0 Fehler · 1 Abweichung R-1.4 (bekannt, Nr. 5) | 0 Fehler · 1 Abweichung R-1.4 |
| Gegenprobe M-18 (Weiche aus) | M-1 5 × rot, M-7 1 × rot, Fenster wieder Blatt | ebenso |
| Gegenprobe S-15 | ohne Ableitung S-1, S-3 rot · ohne Freigabe S-2, S-3 rot | ebenso |
| `bean-katalog` (Reiselogbuch 3.59.0) | alles in Ordnung | alles in Ordnung |
| `entwurf-regeln.mjs` | alles in Ordnung, Gegenprobe `beans:entwurf` rot | – |
| `doku-regeln` (mit diesem Bericht) | alles in Ordnung – die 2 alten Fehler hat die neue `UEBERGABE.md` von 0169 behoben | – |

- **M-17** prüft am iPad quer und hoch mit `checkSheet` (APD-72/D-1 bis D-21), alles grün.
- **M-8** prüft mit `checkTastaturStill` im Safari-Modell.
- **Grundregeln:** R-4.5 ‚Fenster nicht bildschirmbreit‘ meldet sich am iPhone, wie zu erwarten. Das ist die gewollte Folge von APD-151; der Wortlaut kommt nach deinem ‚ok‘ (0 Nr. 29).

## Aufgefallen

1. **Fehler in v4, auch am iPad: Nach dem Schließen der Tastatur wird das Fenster bildschirmhoch.**
   - Gemessen im Safari-Modell mit ‚Eintrag bearbeiten‘ und v4: am iPad hoch 454 → 1160 px, darunter 706 px leerer Platz.
   - **Ursache:** Beim Schließen gibt `gemeldet` jedem Rollbereich vorher Platz (APD-115/N-13). Im Fenster wächst es damit auf die volle Höhe und bleibt so.
   - **Im Muster:** Passt der Inhalt auch ohne den Platz, nimmt das Muster ihn gleich weg. Das Fenster gleitet zurück in die Mitte (M-9). Die Prüfung M-9 war vor der Korrektur rot.
   - **Vorschlag:** Die Korrektur kommt mit APD-151 in `v5/` direkt in `ui.js` und gilt dann für alle Fenster, auch im Reiselogbuch.
2. **Antippen neben das Fenster schließt im Entwurf jetzt auch am iPad nicht.**
   - Das folgt aus J-3 Nr. 4: „Schließen geht über x, Escape und Ziehen nach unten“, wie bei Apple.
   - Bisher fragte es im Entwurf wie x (H-9, S-10), und ein Fenster ohne Änderungen schloss sich.
   - S-10 ist angepasst. Escape fragt weiter.
3. **Ein Fenster ersetzen (H-3) gleitet jetzt auf beiden Geräten:** Das alte gleitet hinaus, das neue herein (M-13). Bisher wechselte nur der Inhalt.
4. **Drehen mit Fokus im Feld (M-11):**
   - Hat ein Feld den Fokus, bleibt das Fenster nach dem Drehen stehen, wo es ganz sichtbar ist. Das ist die Regel aus APD-36 und am iPad genauso.
   - Ohne Fokus im Feld steht es nach jedem Drehen in der Mitte. Beides wird geprüft.
5. **Abweichung R-1.4 (Durchlass der Kopfzeile, APD-149)** besteht weiter, auch auf dem Stand vor dieser Sitzung (nachgeprüft).
6. **Abweichung von Apple, bewusst (J-2):** Bei Apple liegen Blätter am iPhone unten an, in der Mitte stehen nur Meldungen. Für Fenster zum Schreiben nennt die HIG die volle Höhe. Grund für die Abweichung: dieselbe Bedienung wie am iPad (R-1.1). Quellen stehen in `arbeit/APD-151 Apple-Abgleich und Testfall-Liste.md` Abschnitt 2.

## Ausprobieren am iPhone und iPad

Link: https://g811141a.github.io/AppDesign/katalog/index.html#presentation

Vorher in Safari die Seite neu laden oder einen neuen Tab öffnen, damit der neue Stand kommt.

0. **Stand prüfen.** iPhone hoch, hell: Link öffnen. Unter ‚Entwurf‘ auf ‚Stapel (Steuer-Bean)‘ tippen und ganz nach unten rollen.
   - Erwartet: Unter ‚Verlauf‘ steht die Zeile ‚Fenster am iPhone wie am iPad (APD-151, Sitzung AppDesign 0006) …‘.
1. Nach oben rollen, unter ‚Ausprobieren‘ ‚Mehr‘ (ellipsis) und dann ‚Bearbeiten‘ antippen.
   - Erwartet: Das Fenster ‚Eintrag bearbeiten‘ gleitet von unten in die **Mitte**. Es ist so hoch wie sein Inhalt und hat rundum runde Ecken, links und rechts etwa 20 px Rand.
   - Die Seite dahinter dunkelt ab und bleibt groß, sie weicht nicht verkleinert zurück. Die Kopfzeile des Fensters ist kompakt wie bisher.
2. Im Fenster ‚Anderes Fenster öffnen‘ antippen.
   - Erwartet: Das alte Fenster gleitet nach unten hinaus, ‚Anderes Fenster‘ gleitet von unten in die Mitte. Die Abdunkelung bleibt.
3. Über oder unter dem Fenster auf die Abdunkelung tippen.
   - Erwartet: Nichts geschieht, das Fenster bleibt offen.
4. Am Fensterkopf ein Stück nach unten ziehen und loslassen.
   - Erwartet: Nur das Fenster fährt mit, die Abdunkelung wird heller, die Seite dahinter bewegt sich nicht. Das Fenster federt zurück in die Mitte.
5. Am Fensterkopf weit oder schnell nach unten wischen.
   - Erwartet: Das Fenster gleitet hinaus und ist zu. Unter ‚Ereignisse‘ steht ‚Fenster ‚Anderes Fenster‘ zu · user‘.
6. ‚Mehr › Bearbeiten‘ antippen, im Feld ‚Titel‘ einen Buchstaben anhängen, dann am Fensterkopf weit nach unten ziehen.
   - Erwartet: Das Fenster zieht zäh und federt zurück.
   - Am x erscheint die Sprechblase ‚Die Änderungen in diesem Fenster gehen verloren.‘ mit ‚Änderungen verwerfen‘ und ‚Weiter bearbeiten‘.
   - ‚Weiter bearbeiten‘ antippen. Erwartet: Das Fenster bleibt mit deinem Text offen.
7. Das Feld ‚Titel‘ antippen.
   - Erwartet: Die Tastatur erscheint. Das Fenster gleitet nach oben über die Tastatur und wird so niedrig, dass es darüber passt.
   - Das Feld ist ganz zu sehen, über der Tastatur. Nichts springt.
8. Die Tastatur mit ‚Fertig‘ bzw. dem Häkchen über der Tastatur schließen.
   - Erwartet: Das Fenster gleitet zurück in die Mitte und ist wieder so hoch wie vorher, ohne leeren Platz unter dem Inhalt.
9. x antippen, dann ‚Änderungen verwerfen‘.
   - Erwartet: Das Fenster gleitet hinaus.
10. ‚Mehr › Bearbeiten‘, dann ‚Fenster mit langem Inhalt‘ antippen.
    - Erwartet: Das Fenster ‚Langes Fenster‘ reicht oben und unten bis knapp an den Rand, nie unter die Statusleiste oder die Home-Leiste.
    - Der Inhalt rollt, der Fensterkopf steht still.
11. Im langen Fenster bis ‚Ort 10‘ rollen und das Feld antippen.
    - Erwartet: Das Feld steht ganz über der Tastatur, das Fenster endet über der Tastatur. Danach die Tastatur wieder schließen.
12. Bei offenem Fenster quer drehen.
    - Erwartet: Das Fenster bleibt offen und steht in der Mitte, oben und unten höchstens bis knapp an den Rand. Es ist deutlich breiter als hoch (mindestens 480 px), der Kopf ist niedrig.
13. Wieder hoch drehen.
    - Erwartet: Das Fenster steht wieder in der Mitte, mit etwa 20 px Rand links und rechts.
14. x antippen, dann ‚Mehr › Bearbeiten‘ und ‚Hinweisfenster über dem Fenster‘ antippen.
    - Erwartet: Eine kleine Meldung steht in der Mitte über dem Fenster, wie bisher. Nach x ist das Fenster wieder vorn.
15. **Vergleich mit dem iPad (quer, hell):** Link öffnen und in der Seitenleiste unter ‚Entwurf‘ ‚Stapel (Steuer-Bean)‘ antippen. Dann die Schritte 1 bis 8 wiederholen.
    - Erwartet: wie am iPhone, nur breiter.
    - Antippen der Abdunkelung (Schritt 3) schließt auch hier nicht. Neu im Entwurf: Bisher fragte es dort wie x (Aufgefallen Nr. 2).

## Offene Usertests

- keine.

## Danach

- Nach deinem ‚ok‘ vom Gerät lege ich den Wortlaut für R-4.6, 15.17 und Designrichtlinie 7 vor (0 Nr. 29), dazu R-4.5 (‚Fenster bildschirmbreit‘ entfällt). Eingetragen wird er mit `v5/`.

Nächste Version AppDesign (mit `v5/`): 3 Punkte bereit (APD-149/J-1, APD-152, APD-153) · Offen im Backlog: APD-135, APD-136, APD-148, APD-149, APD-151, APD-154 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150, APD-155, APD-157 (Prio 2) · APD-70, APD-147, APD-156 (Prio 3).
