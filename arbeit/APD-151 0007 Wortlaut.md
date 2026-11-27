# APD-151 – Wortlaut ‚Fenster am iPhone wie am iPad‘ (0 Nr. 29, Sitzung AppDesign 0007)

**27.11.2026** · Grundlage: Rückmeldung vom Gerät ‚alles ok‘ zum Muster APD-151 (Schritte 0 bis 15) und ‚Ja, mit APD-151‘ zu Aufgefallen Nr. 1 (beides von dir am 27.11.2026, Sitzung AppDesign 0007, im Fenster). Dazu kommen die Entscheidungen APD-151/J-2 und J-3.
Eingetragen wird der Wortlaut erst mit `v5/` (AppDesign 5.0.0), zusammen mit dem Bau. Bis dahin gilt der alte Text für `v4/`.
Datei: `README - Designrichtlinie allgemein.md`. Die Nummern der Prüfungen in der Spalte ‚Prüfung‘ (`checkSheet` …) lege ich beim Bau fest, wenn B1–B24 und APD-72/D-1 bis D-21 umgestellt sind.

## 1. Regelkatalog R-4.6

**Alt (Regel):**
> **Blatt auf dem iPhone, Fenster am iPad ziehen:** im iPhone-Aufbau (hoch und quer) ist jedes Fenster außer Meldungen ein Blatt ‚nur groß‘ wie ‚Neuer Termin‘ – gleitet von unten bis knapp unter die Statusleiste, oben runde Ecken, die Seite dahinter weicht verkleinert und abgedunkelt zurück (quer volle Höhe, die Seite bleibt); nach unten ziehen schließt wie x – am Kopf immer, im Inhalt, wenn er ganz oben steht, auch kurz und schnell gewischt; waagerecht und im gerollten Inhalt bleibt es; mit Änderungen seit dem Öffnen zieht es sich zäh, federt zurück und fragt am x (R-4.4); ein Zug nach unten schließt zuerst die Tastatur, auch nach einem Stück nach oben – beginnt er auf einem Feld, zieht er im selben Zug das Blatt wie am Kopf (ein Feld, das selbst gerollt ist, rollt weiter), im gerollten Inhalt daneben rollt er weiter; Abdunkelung antippen und Escape wie x; Drehen lässt es offen; ‚Bewegung reduzieren‘: Überblenden, die Seite bleibt groß, nach dem Loslassen steht es sofort am Ziel (R-1.9). Am iPad bleibt das Fenster in der Mitte, gleitet beim Öffnen und Schließen von unten und lässt sich ebenso nach unten ziehen – nur das Fenster fährt mit, die Abdunkelung wird heller, die Seite bleibt, Antippen der Abdunkelung schließt nicht (wie iPadOS); ein offenes Fenster ändert durch Eingaben weder Breite noch Lage, Meldungen brechen in der vorhandenen Breite um

**Neu (Regel):**
> **Fenster in der Mitte, nach unten ziehen – auf iPad und iPhone gleich:** jedes Fenster außer Meldungen steht im sichtbaren Bereich in der Mitte, hoch und quer, wie ein Formblatt in iPadOS. Es ist so hoch wie sein Inhalt, oben und unten mindestens 10 px vom Rand und nie unter Statusleiste oder Home-Leiste; zu hoher Inhalt rollt, der Kopf steht still. Ecken rundum, Breite nach R-4.8, Abdunkelung 35 %, die Seite dahinter bleibt groß. Es gleitet beim Öffnen und Schließen von unten; ein ersetztes Fenster gleitet hinaus, das neue herein (R-1.12). Nach unten ziehen schließt wie x: Nur das Fenster fährt mit, die Abdunkelung wird heller, die Seite bleibt – am Kopf immer, im Inhalt, wenn er ganz oben steht, auch kurz und schnell gewischt; waagerecht und im gerollten Inhalt bleibt es; mit Änderungen seit dem Öffnen zieht es sich zäh, federt zurück und fragt am x (R-4.4); ein Zug nach unten schließt zuerst die Tastatur, auch nach einem Stück nach oben – beginnt er auf einem Feld, zieht er im selben Zug das Fenster wie am Kopf (ein Feld, das selbst gerollt ist, rollt weiter), im gerollten Inhalt daneben rollt er weiter. Antippen der Abdunkelung schließt nicht (wie iPadOS), Escape wirkt wie x. Drehen lässt es offen: danach steht es in der Mitte, mit Fokus in einem Feld bleibt es, wo es ganz sichtbar ist. ‚Bewegung reduzieren‘: Überblenden, nach dem Loslassen steht es sofort am Ziel (R-1.9). Ein offenes Fenster ändert durch Eingaben weder Breite noch Lage, Meldungen brechen in der vorhandenen Breite um

**Alt (Prüfung):** ablauf.mjs – `checkSheet` (iPhone B1–B24, iPad APD-72/D-1 bis APD-72/D-15, APD-72/D-21 Breite und Lage nach einer Eingabe); App-Ablauf Buchstabe für Buchstabe (Reiselogbuch `ablauf-fenster-breite`)

**Neu (Prüfung):** ablauf.mjs – `checkSheet` (iPad und iPhone, hoch und quer: Lage und Höhe, Gleiten, Ziehen, Abdunkelung, Tastatur, Drehen; Breite und Lage nach einer Eingabe); App-Ablauf Buchstabe für Buchstabe (Reiselogbuch `ablauf-fenster-breite`)

- Spalten ‚Gerät‘ (Wischgefühl, Tastatur) und ‚Abschnitt‘ (7, 13, 15.17) bleiben.

## 2. Regelkatalog R-4.5

**Alt (Teilsatz 1):**
> zu hoher Inhalt rollt darin; Fenster auf dem iPhone als Blatt bis zum unteren Rand bzw. zur Tastatur (R-4.6).

**Neu (Teilsatz 1):**
> zu hoher Inhalt rollt darin; ein Fenster steht bei offener Tastatur über ihr (R-4.6).

**Alt (Ende):**
> … Kopfzeile, Suchzeile, Seitenleiste und Fensterkopf stehen in jedem Bild still, das Feld springt nicht, das iPad-Fenster gleitet mit der Tastatur

**Neu (Ende):**
> … Kopfzeile, Suchzeile, Seitenleiste und Fensterkopf stehen in jedem Bild still, das Feld springt nicht, das Fenster gleitet mit der Tastatur; nach dem Schließen der Tastatur ist es wieder so hoch wie vorher, ohne leeren Platz unter dem Inhalt

**Prüfung:** `checkSheet` B10 (Abstand über dem Feld ≥ `RING`) wird zu `checkSheet` (Abstand über dem Feld ≥ `RING`, Höhe nach dem Schließen der Tastatur). Der Rest der Spalte bleibt.

- Das ist die Korrektur aus Aufgefallen Nr. 1.
- **Prüfung `hig.mjs`:** Die Prüfung R-4.5 ‚Fenster nicht bildschirmbreit‘ am iPhone entfällt (`tests/hig.mjs:654–656`, sie prüfte das Blatt). Am iPhone prüft dann R-4.8 (`masseStile`) die Breite.

## 3. Designrichtlinie 15.17 iPhone-Ansicht, Absatz ‚Fenster als Blatt‘

**Alt:**
> - **Fenster als Blatt** (R-4.6, Variante A ‚nur groß‘ wie ‚Neuer Termin‘): von 10 px unter der Statusleiste (quer 8 px) bis zum unteren Rand bzw. zur Tastatur (R-4.5), oben runde Ecken (26 px, quer 18 px); die Seite dahinter hoch um 7 % verkleinert mit runden Ecken vor Schwarz, abgedunkelt mit 30 % Schwarz. Ziehen: entschieden nach 8 px, deutlich senkrecht (1,2 × so weit wie waagerecht); beim Loslassen zählt der Punkt, an dem das Blatt mit dem Tempo der letzten 100 ms auslaufen würde (Tempo × 400 ms) – liegt er näher am unteren Rand, schließt es, sonst federt es zurück; über ‚groß‘ hinaus Gummiband. Mit Änderungen (`dlgDirty`, auch beim Erfassen) zieht es sich zäh (30 %). Ein Zug auf einem Feld zieht das Blatt auch, wenn R-4.5 den Inhalt dafür gerollt hat. ‚Bewegung reduzieren‘: das Ziehen folgt weiter dem Finger. Kopfzeile kompakt mit einzeiligem Titel (kurze Form, z. B. ‚Di, 25.08.2026‘); Options-Kapseln stehen unter dem Kasten-Titel. Meldungen bleiben kleine Fenster in der Mitte.
>   **Am iPad** (Variante B wie ein Formblatt in iPadOS, z. B. ‚Neuer Kontakt‘): das Ziehen beginnt und entscheidet wie am iPhone; Abdunkelung 35 % Schwarz (statt `::backdrop`); dass Antippen der Abdunkelung nicht schließt, sperrt iPadOS bei Formblättern ebenso; kein Griff (wie iPadOS).
>   **Technisch:** `blattAuf()` aus `openDialog` (iPhone und iPad), Lage `blattOben()` in `placeDialogs` (iPad 0: das Fenster steht, wo `placeDialogs` es hinstellt), Klassen `html.blatt`, `.blatt-zurueck`, `.blatt-faehrt`, `.blatt-zieht`, an den zurückweichenden Elementen `.blatt-seite`; die App braucht nichts weiter (Schließen über x bzw. `dlg.close()`).

**Neu:**
> - **Fenster wie am iPad** (R-4.6, wie ein Formblatt in iPadOS, z. B. ‚Neuer Kontakt‘): in der Mitte des sichtbaren Bereichs, so hoch wie der Inhalt, oben und unten mindestens 10 px vom Rand und nie unter Statusleiste oder Home-Leiste; Breite nach R-4.8 (quer mindestens 480 px), Ecken 18 px rundum. Abdunkelung 35 % Schwarz (statt `::backdrop`), die Seite dahinter bleibt groß; Antippen der Abdunkelung schließt nicht, wie iPadOS bei Formblättern; kein Griff. Ziehen: entschieden nach 8 px, deutlich senkrecht (1,2 × so weit wie waagerecht); beim Loslassen zählt der Punkt, an dem das Fenster mit dem Tempo der letzten 100 ms auslaufen würde (Tempo × 400 ms) – liegt er näher am unteren Rand, schließt es, sonst federt es zurück in die Mitte. Mit Änderungen (`dlgDirty`, auch beim Erfassen) zieht es sich zäh (30 %). Ein Zug auf einem Feld zieht das Fenster auch, wenn R-4.5 den Inhalt dafür gerollt hat. ‚Bewegung reduzieren‘: das Ziehen folgt weiter dem Finger. Kopfzeile kompakt mit einzeiligem Titel (kurze Form, z. B. ‚Di, 25.08.2026‘); Options-Kapseln stehen unter dem Kasten-Titel. Meldungen bleiben kleine Fenster in der Mitte.
>   **Abweichung von Apple, bewusst:** Bei Apple liegen Blätter am iPhone unten an; hier gilt dieselbe Bedienung wie am iPad (R-1.1, APD-151/J-2).
>   **Technisch:** ein Weg für iPad und iPhone in `ui.js` (öffnen aus `openDialog`, Lage in `placeDialogs`); die App braucht nichts weiter (Schließen über x bzw. `dlg.close()`).

- Die Namen der Funktionen und Klassen im Satz ‚Technisch‘ trage ich beim Bau so ein, wie sie in `v5/` heißen (APD-145).

## 4. Designrichtlinie 7 Fenster (Dialoge)

**Alt (Breite):**
> - Breite passt sich dem Inhalt an: höchstens 90 % der Bildschirmbreite, Mindestbreite 480 px. Erfassungs- und Vorschaufenster fast bildschirmbreit (bis 1100 px); auf dem iPhone ein **Blatt** von unten (R-4.6, 15.17).

**Neu (Breite):**
> - Breite passt sich dem Inhalt an: höchstens 90 % der Bildschirmbreite, Mindestbreite 480 px (schmaler nur, wenn der Bildschirm es verlangt). Erfassungs- und Vorschaufenster fast bildschirmbreit (bis 1100 px). Auf dem iPhone gilt dasselbe (R-4.6, R-4.8, 15.17).

**Alt (Escape):**
> - Escape wirkt wie das x.

**Neu (Escape, mit dem Verweis zu Antippen der Abdunkelung):**
> - Escape wirkt wie das x. Antippen der Abdunkelung schließt nicht, auf iPad und iPhone (R-4.6, wie iPadOS).

**Alt (Ziehen):**
> - **iPhone: Blatt, iPad: Fenster nach unten ziehen** (R-4.6, wie ‚Neuer Termin‘ bzw. ein Formblatt in iPadOS; Bau 15.17).

**Neu (Ziehen):**
> - **Fenster in der Mitte, nach unten ziehen – auf iPad und iPhone gleich** (R-4.6, wie ein Formblatt in iPadOS; Bau 15.17).

**Alt (Tastatur, Ende):**
> … Das iPad-Fenster gleitet mit der Tastatur in die Mitte darüber und zurück (R-1.12); ist es ganz sichtbar, bleibt es stehen. Technik und Safari-Eigenheiten: 13.

**Neu (Tastatur, Ende):**
> … Das Fenster gleitet mit der Tastatur in die Mitte darüber und zurück (R-1.12); ist es ganz sichtbar, bleibt es stehen. Nach dem Schließen der Tastatur ist es wieder so hoch wie vorher, ohne leeren Platz unter dem Inhalt. Technik und Safari-Eigenheiten: 13.

## 5. Stellen, die davon abhängen (Folge, ohne neuen Inhalt)

| Stelle | Alt | Neu |
|---|---|---|
| 3 Radien | ‚Fenster 18 px (Blatt oben 26 px, 15.17)‘ | ‚Fenster 18 px‘ |
| 10 Ausgabe | ‚(AD-Bean `alert`, so hoch wie nötig, kein Blatt in voller Höhe; aus der Vorschau darüber)‘ | ‚(AD-Bean `alert`, so hoch wie nötig; aus der Vorschau darüber)‘ |
| 13 Wischgesten | ‚**Blatt ziehen** (R-4.6)‘ … ‚das Blatt nicht zieht‘ … ‚Das Blatt ist `<dialog>` mit `showModal` (APD-36/S-9), bewegt wird es mit `translate` statt `transform`, die Seite dahinter mit `translate` und `scale` – so bleiben …‘ … ‚ein Abbild des Blatts (`.blatt-geist`, ohne ids)‘ | ‚**Fenster ziehen** (R-4.6)‘ … ‚das Fenster nicht zieht‘ … ‚Das Fenster ist `<dialog>` mit `showModal` (APD-36/S-9), bewegt wird es mit `translate` statt `transform` – so bleiben …‘ … ‚ein Abbild des Fensters (ohne ids)‘ |
| 15.22 Rahmen und Rollbereich, Höhe | ‚… `rolle.ende()` zählt diesen Platz nicht.‘ | ‚… `rolle.ende()` zählt diesen Platz nicht. Schließt sich die Tastatur und passt der Inhalt eines Fensters ohne diesen Platz, fällt er sofort weg – das Fenster wird nicht höher (R-4.5).‘ |
| R-1.4 | ‚(Fenster, Meldung und Blatt sind modal)‘ | ‚(Fenster und Meldung sind modal)‘ – der übrige Wortlaut kommt mit APD-149/J-5 |
| R-1.12 | ‚– Fenster und Blatt (R-4.6), …, das Fenster mit der Tastatur am iPad, …‘ | ‚– Fenster (R-4.6), …, das Fenster mit der Tastatur, …‘ |
| R-4.8, Spalte Prüfung | ‚(jedes Fenster nach jedem Schritt, iPad quer und hoch; im iPhone-Aufbau gilt das Blatt, R-4.6)‘ | ‚(jedes Fenster nach jedem Schritt, iPad und iPhone, quer und hoch)‘ |

- **Bleiben, wie sie sind:** die Messungen in 13 mit ‚Blatt‘ im Namen der Messdatei (Quellen, RLB-103) und die Versionsgeschichte der Reiselogbuch-Richtlinie.
- **Außerhalb der Richtlinie, mit dem Bau:** Im Grobentwurf (`arbeit/APD-149 Grobentwurf V-3.md`) nennt H-9 noch ‚Tippen außerhalb‘ als Weg zum Schließen. Das passe ich beim Bau der Bean `presentation` an.

## 6. Was danach kommt

- **Backlog:** In der Zeile APD-151 sind eingetragen: Gerät ok, die Korrektur aus Aufgefallen Nr. 1 kommt mit, und der Wortlaut ist vorgelegt.
- **Nach deinem Ja zum Wortlaut** ist APD-151 bereit für `v5/` (Nächste Version, 4 Punkte). Eingetragen wird der Wortlaut mit dem Bau.
- **Nächster Schritt danach:** `v5/` mit APD-145 (Namensraum `AD`, AppDesign 5.0.0), nach `arbeit/APD-149 Uebergabe.md` Abschnitt 4. Vorher kommt die Bau-Frage (0 Nr. 21).

**Freigegeben:** Wortlaut Abschnitte 1 bis 5 (Nutzer 27.11.2026, Sitzung AppDesign 0007, im Fenster). Eingetragen wird er mit `v5/`.
