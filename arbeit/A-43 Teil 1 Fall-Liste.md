# A-43 Teil 1 ‚VoiceOver, Tastatur, Kontrast, Bewegung‘ – Fall-Liste

**Stand 24.10.2026** · Sitzungen Reiselogbuch 0034 und 0035 (alle 36 Fälle durchgesprochen, Abschnitte 1 und 2 angeglichen), 0044 (K9 Fokus-Rahmen in Textfeldern) · Klärung und Apple-Abgleich: `arbeit/A-43 Klärung.md`

**Entschieden (Nutzer 23.10.2026):** zwei Teile – **Teil 1** (diese Liste) ohne Muster, nur Fall-Liste, Prüfungen und Ja;
**Teil 2** Textgröße nach der Einstellung des Geräts mit Muster. Tastatur: **nur Grundlagen** (keine Kurzbefehle). ‚Kontrast
erhöhen‘ mit **zweiter Farbtabelle** hell und dunkel nach Apple.

Alles ist allgemein (AppDesign `ui.js`, `design.css`, Prüfungen in `tests/`); die App ändert nur eigene Bausteine (z. B. Felder mit
Fehlermeldung, Trefferzeile), wo sie nicht über ui.js laufen.

**Gebaut in AppDesign 4.35.0 / Reiselogbuch 3.33.0 (Sitzung 0044, Prüfpunkt P-73).** Abweichungen beim Bau: der Fokusring hängt an
`html.tastatur` (Taste zum Bewegen) statt an `:focus-visible` allein (K6, K9 – Safari-Eigenheit in Designrichtlinie 13); ein Textfeld
im Fenster gibt beim Öffnen einer Sprechblase bzw. eines Menüs den Fokus ab (Folge von `inert`, V7) – im Prüfpunkt; der
Mikrofon-Knopf (M4) gilt für design.css, das Reiselogbuch hat keinen; ‚Titel antippen = nach oben‘ (M2) gibt es noch nicht (A-62).

## 1. Vorgesehene Regeln (Katalog, Designrichtlinie 17)

Angeglichen an Abschnitt 4 (Sitzung 0035); maßgeblich bleibt bei Einzelheiten Abschnitt 4.

| Regel | Inhalt | Prüfung | Gerät |
|---|---|---|---|
| R-1.4 erweitert | Nur der Vordergrund reagiert – **auch für VoiceOver und Tastatur**: bei offenem Menü und offener Sprechblase ist alles außerhalb `inert` (Seite bzw. übriger Fensterinhalt), aufgehoben bei jedem Schließen; Fenster, Meldung und Blatt sind modal | hig.mjs (V7, V8) | – |
| **R-1.8 neu** | **VoiceOver:** jedes Bedienelement hat Namen, Rolle und Zustand (Icons `aria-hidden`; Menüknöpfe ‚öffnet Menü‘ mit offen/zu; Häkchen ‚ausgewählt‘); Fenster, Meldung, Blatt und Sprechblase mit Titel; der Fokus geht hinein und ohne Rollen zurück (auch Seitenwechsel am iPhone); Ergebnisse werden über `ansagen()` höflich angesagt, ‚Automatisch gespeichert‘ nicht | hig.mjs – `checkNamen`; ablauf.mjs – `checkFokus`, Ansage-Bereich | – (keine VoiceOver-Prüfung am Gerät) |
| **R-1.9 neu** | **Bedienungshilfen des Geräts:** ‚Kontrast erhöhen‘ schaltet auf die zweite Farbtabelle (hell und dunkel, jeder Text und jedes Icon mindestens 4,5 : 1, Ausgabe unverändert hell), sofort ohne Neuladen; ‚Bewegung reduzieren‘ – erlaubt Überblenden (nur Deckkraft bzw. Farbe, bis 0,3 s), kleine Rückmeldungen unter 30 px, Bewegung direkt mit dem Finger; nicht erlaubt selbstständige Lageänderung über 30 px, Zoomen, Federn, sanftes Rollen durch die App, Dauerschleifen | hig.mjs (Kontrast); ablauf.mjs – `checkRuhig`; Bewegungswächter in pruefe.mjs | Aussehen mit ‚Kontrast erhöhen‘, Gefühl mit ‚Bewegung reduzieren‘ |
| **R-4.7 neu** | **Hardware-Tastatur (Grundlagen):** Esc und ⌘. schließen das oberste Menü, die Sprechblase (= Abbrechen) und das Fenster (wie x, mit Änderungen die Rückfrage); Pfeile, Pos1/Ende in Menüs und Untermenüs; Eingabe löst die empfohlene bzw. ‚Abbrechen‘, **nie die rote** Aktion; Tab bleibt im Vordergrund und folgt der sichtbaren Reihenfolge; Fokusring nur bei der Tastatur (`:focus-visible`), **Textfelder nie** (K9, R-3.4) | ablauf.mjs – `checkFokus`; hig.mjs (R-3.4) | Esc, ⌘., Pfeile, Eingabe, Tab (Tastatursteuerung) |
| R-5.3 erweitert | Fehlermeldung **auch hörbar**: Feld `aria-invalid`, Meldung mit dem Feld verknüpft (`aria-describedby`) und einmal angesagt; beim Häkchen Fokus aufs erste fehlerhafte Feld (Baustein `feldFehler`) | ablauf.mjs – `checkFieldErrors` | – |

**Prüfwerkzeug:** Schalter `PRUEF_BEDIENUNG=beide` (P1) und Gegenprobe `--gegenprobe bedienung` (P2), beide in pruefe.mjs bzw. lauf.mjs.
(R-4.6 ist für das Blatt auf dem iPhone vorgesehen, A-61/2.)

**Neue Bausteine in ui.js:** `ansagen(text)` (Ansage-Bereich im offenen Fenster bzw. Blatt, sonst auf der Seite), `feldFehler(felder,
zeile, text)`, `--accent-fill`. **Reiselogbuch:** Felder mit Fehlermeldung über `feldFehler`; Ansagen der Suche und der Seitenleiste;
sanftes Rollen zum Fehler beim Häkchen (index.html:1323) springt mit ‚Bewegung reduzieren‘.

## 2. Fall-Liste

Gerät × Lage × Darstellung: iPad quer und hoch, iPhone hoch und quer, je hell und dunkel, Chromium und WebKit; zusätzlich mit
‚Kontrast erhöhen‘ und ‚Bewegung reduzieren‘ (P1); nach jedem Fall gelten die Grundregeln (`pruefe.mjs`).

### V – VoiceOver (Namen, Rollen, Fokus, Sperre, Ansagen)

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| V1 | Jede Ansicht: alle sichtbaren Schaltflächen, Felder, Schalter, Kapseln | jedes hat einen Namen (Icon-Knöpfe `aria-label`, Felder über ihr `label`); Icons `aria-hidden` | ja (`checkNamen`) |
| V2 | Fenster, Meldung, Blatt öffnen | Rolle Fenster, Name = Titel (`aria-labelledby`), Zusatzzeile als Beschreibung (`aria-describedby`) | ja (`checkNamen`) |
| V3 | Knopf, der ein Menü öffnet, und Untermenü-Eintrag | `aria-haspopup="menu"`, `aria-expanded` zentral in `openMenu` | ja (`checkNamen`) |
| V4 | Menüpunkt mit Häkchen-Spalte, Untermenü, deaktiviert | `menuitemcheckbox` mit `aria-checked` zentral in `menuHtml` („Hell, ausgewählt“); Untermenü wie V3; deaktiviert angesagt | ja (`checkNamen`: Häkchen sichtbar = `aria-checked`) |
| V5 | Menü öffnen; wählen, daneben tippen oder Esc | Fokus auf dem ersten wählbaren Eintrag (Untermenü ebenso); danach zurück auf dem Knopf ohne Rollen (`preventScroll`, R-7.3), fehlt er → Kopfzeile | ja (`checkFokus`) |
| V6 | Sprechblase öffnen (Löschen, Ersetzen, Änderungen verwerfen, drei Wege) | `role="alertdialog"`, `aria-labelledby` auf den Text, `aria-modal`; Fokus auf die Blase (ohne Rahmen), danach zurück auf den Knopf bzw. die Kopfzeile, ohne Rollen | ja (`checkFokus`) |
| V7 | Menü bzw. Sprechblase offen (auf der Seite und im Fenster) | alles außerhalb `inert`, nach jedem Schließen (auch R-8.1) wieder erreichbar | ja (hig.mjs) |
| V8 | Fenster, Meldung, Blatt offen | modal, Seite unerreichbar; Menü und Sprechblase im Fenster wie V7 | ja (hig.mjs) |
| V9 | Suche: tippen, Treffer wechseln, keine Treffer; Seitenleiste filtern | nach ca. 0,7 s Pause „3 Treffer“ bzw. „Keine Treffer“, mit ‹ › „Treffer 2 von 3“, Seitenleiste „2 von 5 Reiselogbüchern“ (App) – höflich über `ansagen` | ja (Ansage-Bereich) |
| V10 | Fehlermeldung erscheint (nach Eingabe bzw. beim Häkchen), ändert sich, verschwindet | `feldFehler`: roter Rand, `aria-invalid`, `aria-describedby`, einmal angesagt beim Erscheinen bzw. neuem Text; beim Häkchen Fokus aufs erste fehlerhafte Feld | ja (`checkFieldErrors`) |
| V11 | ‚Automatisch gespeichert um …‘ | wird **nicht** angesagt, nur im Fensterkopf lesbar | ja (kein Ansage-Bereich) |
| V12 | iPhone: Seite vor (Eintrag öffnen) und zurück | `navVor` → Fokus auf den Seitentitel (`.pnav`), `navZurueck` → auf die blaue Zeile bzw. den Titel der Startliste; ohne Rollen; iPad unverändert | ja (`checkFokus`) |
| V13 | Offline bzw. wieder online, mit und ohne offenes Fenster | über `ansagen` angesagt (Meldung ohne `role="status"`) | ja |
| V14 | Daten leer, lang, viele | Prüfungen aus V1–V13 auch hier: leerer Hinweis lesbar, langes Menü vollständig benannt, Griff mit Name und Wert | ja |

### K – Hardware-Tastatur am iPad (nur Grundlagen)

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| K1 | Menü offen: Esc bzw. ⌘. | schließt das oberste Menü (offenes Untermenü zuerst), Taste verbraucht (kein Fenster-x, kein Seitenwechsel), Fokus zurück auf dem Knopf | ja (`checkFokus`) |
| K2 | Menü offen: ↑/↓, Pos1/Ende, Eingabe bzw. Leertaste, Tab | wandert mit Umlauf (ausgegraute, Striche, Zusatzzeilen übersprungen), Tab wie ↓, Markierung hinterlegt ohne Rahmen, langes Menü rollt mit; Eingabe/Leertaste wählt | ja (`checkFokus`) |
| K3 | Untermenü: → bzw. Eingabe/Leertaste am Eintrag, ← bzw. Esc | öffnet mit Fokus auf dem ersten Eintrag; schließt, Fokus zurück auf dem ›-Eintrag; feste Richtung wie am Mac; `aria-expanded` wechselt | ja (`checkFokus`) |
| K4 | Sprechblase: Eingabe, Esc bzw. ⌘., Tab bzw. Pfeile, Leertaste | Eingabe = blauer Weg bzw. Abbrechen, **nie Rot**; Esc/⌘. = Abbrechen (verbraucht, Fenster bleibt); Tab/Pfeile markieren mit Umlauf; Leertaste drückt den markierten (auch Rot) | ja (`checkFokus`) |
| K5 | Fenster, Meldung, Blatt: Esc bzw. ⌘. (auch aus einem Feld), Tab und Umschalt+Tab | wie x (ohne Änderung schließt, mit Änderung die Rückfrage, R-4.4); Tab bleibt im Fenster | ja (`checkFokus`) |
| K6 | Tab durch eine Seite | Reihenfolge Leiste → Suche → Inhalt → schwebende Knöpfe, nur Sichtbares; eigener Fokusring nur bei `:focus-visible` (Akzentfarbe, Abstand, folgt dem Radius) für Knöpfe, Schalter, Kapseln, Zeilen; Textfelder nie (K9); nie beim Antippen (R-3.4) | ja (`checkFokus`) |
| K7 | Esc auf der Seite (iPhone-Aufbau bzw. darübergelegte Seitenleiste) | zurück bzw. Seitenleiste zu (F-20), kein ⌘.; Fokus auf der Zeile bzw. panel-left | ja (`checkNavigation`) |
| K8 | Eingabe in Feldern | einzeilig: Feld fertig, Fenster offen, kein Häkchen (R-5.5); Suche behält Treffer; mehrzeilig Zeilenumbruch; Tab nächstes Feld; kein ⌘Eingabe | ja (`checkFokus`) |
| K9 | Textfeld (einzeilig, mehrzeilig, Datum, Zahl, Suchfeld; Seite, Fenster, Blatt) antippen bzw. mit Tab erreichen | **nie ein Fokus-Rahmen** – auch nicht Safaris `outline: auto 5px`, obwohl `:focus-visible` bei Textfeldern immer zutrifft (gemessen WebKit und Chromium, 0044); der Cursor zeigt den Fokus, Fehlerrand (`feldFehler`) bleibt; `fokusRand` rechnet dann nur noch mit dem Schatten | ja (hig.mjs R-3.4 für jedes Textfeld nach Antippen und Tab) |

### H – ‚Kontrast erhöhen‘ (zweite Farbtabelle)

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| H1 | Hell mit ‚Kontrast erhöhen‘ | `@media (prefers-contrast: more)`: Akzent #0040DD, Rot gefüllt #D70015, Rot Text #B3261E, Grün #248A3D, Orange #C93400, Grau Text #3C3C43, Text #000000, Linien #8E8E93, Glas fast deckend mit Haarlinie; nur Variablen | ja (Farbwerte) |
| H2 | Dunkel mit ‚Kontrast erhöhen‘ (Gerät oder App dunkel) | Akzent #409CFF, Rot Text #FF6961, Rot gefüllt #D70015, Grün #30DB5B, Orange #FFB340, Grau Text #C7C7CC, Linien #636366, Glas wie H1 | ja (Farbwerte) |
| H3 | Kontrast aller Texte und Icons mit ‚Kontrast erhöhen‘ | mindestens 4,5 : 1 ohne Ausnahmen; gefüllte blaue Knöpfe über `--accent-fill` (dunkel #0060DF, Weiß 5,6), Schrift/Icons #409CFF | ja (hig.mjs) |
| H4 | Ausgabe HTML/PDF und Vorschau | Inhalt unverändert hell (R-6.2), Rahmen der Vorschau folgt H1/H2; mit/ohne Kontrast, hell/dunkel identisch | ja |
| H5 | Einstellung bei offener App umschalten (offenes Fenster, Eingabe, gerollte Liste) | reines CSS, wechselt sofort ohne Neuaufbau; Messmodus notiert den Kontrast-Zustand | ja |

### M – ‚Bewegung reduzieren‘

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| M1 | Seitenwechsel, Zurückwischen, Seitenleiste, gleitendes Fenster, Hervorheben | wie heute: nur Deckkraft, keine Lage | ja (`checkRuhig`) |
| M2 | ‚Nach oben‘ / ‚Ans Ende‘ / Titel antippen | springt direkt (Überblenden ca. 0,15 s), sonst sanft wie heute; Abweichung von Apples Statusleiste begründet (WCAG 2.3.3) | ja (`checkRuhig`: ein Rollschritt) |
| M3 | Schalter umlegen | kein Umbau: eigener Schalter springt, eingebauter (`natsw`) folgt dem System; erlaubte kleine Bewegung | ja (`checkRuhig`) |
| M4 | Mikrofon beim Diktieren | kein Pulsieren, ruhig gedrückt (`.mic[aria-pressed=true]` ohne Animation) | ja (`checkRuhig`) |
| M5 | Blatt auf dem iPhone (A-61/2) | Überblenden, Seite ohne Verkleinerung, Ziehen folgt dem Finger, ohne Nachfedern (B22) | `checkSheet`, mit Teil 1 in `checkRuhig` |
| M6 | Grenze | erlaubt Überblenden (bis 0,3 s), unter 30 px, mit dem Finger; nicht erlaubt Lage über 30 px, Zoomen, Federn, sanftes Rollen, Dauerblinken (R-1.9) | – (Regeltext) |
| M7 | Jede Bewegung, auch künftige und in der App | Bewegungswächter in pruefe.mjs erfasst bei ‚reduzieren‘ CSS-Übergänge und -Animationen, `el.animate` und sanftes Rollen und misst an M6; Meldung mit Element, Eigenschaft, Ansicht; Fundstelle index.html:1323 springt | ja (Wächter, `checkRuhig`) |

### P – Prüfungen

| Nr. | Fall | Erwartet |
|---|---|---|
| P1 | Grundregeln mit beiden Bedienungshilfen: `PRUEF_BEDIENUNG=beide` (`contrast: 'more'`, `reducedMotion: 'reduce'` in `t.seite`) | im vollen Lauf `hig` zusätzlich ‚hell/dunkel Bedienungshilfen‘ (alle vier Ansichten) und die Abläufe mit Bewegung (Navigation, Fenster, iPhone, Suche in der Liste, Seitenleiste); alle grün; Mehrzeit beim Bau messen |
| P2 | Gegenprobe `--gegenprobe bedienung` | je Lauf ein eingeschleuster Fehler (Liste in Abschnitt 4), genau die passende Meldung wird rot; beim Bau und bei Änderung dieser Prüfungen, nicht in jedem `los` |

**Nur am Gerät (Prüfliste, ohne VoiceOver):**
1. Hardware-Tastatur am iPad: Esc, ⌘. (gibt Safari es weiter?), Pfeile und Eingabe in Menü und Sprechblase, Tab (erreicht es Knöpfe – Einstellung Tastatursteuerung?).
2. Aussehen mit ‚Kontrast erhöhen‘ hell und dunkel; Umschalten bei offener App.
3. Gefühl mit ‚Bewegung reduzieren‘: Seitenwechsel, ‚Nach oben‘ springt, Mikrofon ruhig.

## 3. Antworten (Nutzer 23.10.2026)

1. ‚Automatisch gespeichert um …‘ wird **nicht** angesagt (V11).
2. **Keine Prüfung mit VoiceOver am Gerät** – VoiceOver wird nur automatisch geprüft (Rollen, Namen, Fokus, Sperre, Ansage-Bereiche).
3. Fall-Liste: **nicht ok** – Rückmeldung im Chat folgt.

## 4. Durchsprache Fall für Fall (Nutzer 23.10.2026)

- **V1** übernommen: R-1.8, `checkNamen` in hig.mjs (heute alle benannt, Prüfung fehlt).
- **V2** übernommen: Fenster, Meldung und Blatt mit `aria-labelledby` (Titel) und `aria-describedby` (Zusatzzeile); heute nur „Dialog“ ohne Namen.
- **V3** übernommen: Menüknöpfe und Untermenü-Einträge `aria-haspopup="menu"`, `aria-expanded` zentral in `openMenu` (heute nirgends).
- **V4** übernommen (Korrektur des Nutzers nach erstem ‚Nein‘): Einträge mit Häkchen-Spalte `menuitemcheckbox` mit `aria-checked` zentral in `menuHtml` („Hell, ausgewählt“), Untermenü-Einträge `aria-haspopup`/`aria-expanded` (V3); Prüfung in `checkNamen` (Häkchen sichtbar = `aria-checked`).
- **V5** übernommen: Fokus ins Menü (erster wählbarer Eintrag, Untermenü ebenso) und zurück zum Knopf ohne Rollen (`preventScroll`, R-7.3); fehlt der Knopf → Kopfzeile; `checkFokus` in ablauf.mjs.
- **V6** übernommen: Sprechblase `role="alertdialog"`, `aria-labelledby` auf den Text, `aria-modal`; Fokus auf die Blase (ohne Rahmen), danach zurück zum Knopf bzw. zur Kopfzeile, ohne Rollen; `checkFokus`.
- **V7** übernommen: bei offenem Menü und offener Sprechblase alles außerhalb `inert` (Seite bzw. übriger Fensterinhalt), Aufheben bei jedem Schließen (auch R-8.1); R-1.4 „auch für VoiceOver und Tastatur“; Prüfung hig.mjs mit Gegenprobe.
- **V8** übernommen: nur Prüfung (hig.mjs) – jedes Fenster, Meldung, Blatt modal, Seite unerreichbar; Menü/Sprechblase im Fenster wie V7; Gegenprobe nicht modal.
- **V9** übernommen: Baustein `ansagen(text)` in ui.js (höflicher Ansage-Bereich); Suche sagt nach ca. 0,7 s Pause „3 Treffer“/„Keine Treffer“, mit ‹ › „Treffer 2 von 3“, Seitenleiste „2 von 5 Reiselogbüchern“ (App).
- **V10** übernommen: Baustein `feldFehler(felder, zeile, text)` – roter Rand, `aria-invalid`, `aria-describedby`, einmal ansagen beim Erscheinen bzw. neuem Text; beim Häkchen Fokus aufs erste fehlerhafte Feld; Reiselogbuch nutzt ihn; `checkFieldErrors` erweitert, R-5.3 „auch hörbar“.
- **V11** entschieden (3.1): nicht ansagen.
- **V12** übernommen: `navVor` → Fokus auf den Seitentitel (`.pnav`), `navZurueck` → auf die blaue Zeile bzw. den Titel der Startliste; ohne Rollen; iPad unverändert; `checkFokus`.
- **V13** übernommen: Offline/Wieder online über `ansagen` (Meldung ohne `role="status"`); `ansagen` legt den Ansage-Bereich ins offene Fenster/Blatt, sonst auf die Seite (gilt für alle Ansagen); Prüfung mit und ohne Fenster.
- **V14** übernommen: Prüfungen aus V1–V13 zusätzlich in den Daten-Fällen leer, lang, viele (leerer Hinweis lesbar, langes Menü vollständig benannt, Griff mit Name und Wert).
- **K1** übernommen: Esc und ⌘. schließen das oberste Menü (offenes Untermenü zuerst), Taste verbraucht (kein Fenster-x, kein Seitenwechsel); `checkFokus`; Gerät: gibt Safari ⌘. weiter?
- **K2** übernommen: ↑/↓ mit Umlauf (ausgegraute, Striche, Zusatzzeilen übersprungen), Pos1/Ende, Eingabe/Leertaste wählt, Tab wie ↓ im Menü, Markierung hinterlegt ohne Rahmen, langes Menü rollt mit; `checkFokus`.
- **K3** übernommen: → bzw. Eingabe/Leertaste öffnet das Untermenü (Fokus auf den ersten Eintrag), ← bzw. Esc schließt es (Fokus zurück auf den ›-Eintrag), feste Richtung wie auf dem Mac; `aria-expanded` wechselt; `checkFokus`.
- **K4** übernommen: Eingabe = blauer Weg bzw. Abbrechen (nie Rot), Esc/⌘. = Abbrechen (verbraucht, Fenster bleibt), Tab/Pfeile markieren mit Umlauf, Leertaste drückt den markierten (auch Rot); `checkFokus` mit Gegenprobe.
- **K5** übernommen: ⌘. wie Esc in Fenster, Meldung, Blatt (auch aus einem Feld), Esc wie heute; `checkFokus`: ohne/mit Änderung, Tab und Umschalt+Tab nur im Fenster.
- **K6** übernommen: eigener Fokusring nur bei `:focus-visible` (Akzentfarbe, Abstand, folgt dem Radius; auch Suchfeld), R-3.4 bleibt; Tab-Reihenfolge Leiste → Suche → Inhalt → schwebende Knöpfe, nur Sichtbares; `checkFokus`; Gerät: erreicht Tab Knöpfe (Tastatursteuerung)?
- **K9** entschieden (Nutzer 24.10.2026, Sitzung 0044, Variante a): Textfelder nie mit Fokus-Rahmen, nur der Cursor – wie Apple ohne ‚Tastatursteuerung‘ (Kontakte, Kalender, Einstellungen: kein Rahmen, auch nicht mit Tab); verworfen b) Ring nur nach Tab (Eingabeart merken). Grund: `:focus-visible` trifft bei Textfeldern auch beim Antippen zu, K6 allein hätte Safaris blauen Rahmen gelassen; heute ist nur das Suchfeld ohne Rahmen (design.css:113) und nur das prüft hig.mjs. Prüfung: hig.mjs R-3.4 für jedes Textfeld, Gegenprobe in P2.
- **K7** übernommen: Esc auf der Seite wie heute (F-20), kein ⌘.; `checkNavigation` prüft zusätzlich den Fokus (Zeile bzw. panel-left).
- **K8** übernommen: R-5.5 bleibt; `checkFokus` mit Hardware-Tastatur (einzeilig: Feld fertig, Fenster offen, kein Häkchen; Suche behält Treffer; mehrzeilig Zeilenumbruch; Tab nächstes Feld); kein ⌘Eingabe.
- **H1** übernommen: `@media (prefers-contrast: more)` hell – Akzent #0040DD, Rot gefüllt #D70015, Rot Text #B3261E, Grün #248A3D, Orange #C93400, Grau Text #3C3C43, Text #000000, Linien #8E8E93, Glas fast deckend mit Haarlinie; nur Variablen; R-1.9.
- **H2** übernommen: dunkel mit „Kontrast erhöhen“ (Gerät oder App dunkel) – Akzent #409CFF, Rot Text #FF6961, Rot gefüllt #D70015, Grün #30DB5B, Orange #FFB340, Grau Text #C7C7CC, Linien #636366, Glas wie H1; gefüllte blaue Knöpfe → H3.
- **H3** übernommen: mit „Kontrast erhöhen“ 4,5 : 1 für jeden Text und jedes Icon ohne Ausnahmen (hig.mjs); neue Variable `--accent-fill`, dunkel mit Kontrast #0060DF (Weiß 5,6), Schrift/Icons #409CFF; Gegenprobe #409CFF als Fläche → rot. Gemessen: hell Weiß/#0040DD 7,6, Weiß/#C93400 5,3.
- **H4** übernommen: Ausgabe und Vorschau-Inhalt unverändert hell (R-6.2), Rahmen der Vorschau folgt H1/H2; Prüfung: Ausgabe mit/ohne Kontrast, hell/dunkel identisch.
- **H5** übernommen: reines CSS (`prefers-contrast: more` mit `data-theme`), wechselt sofort ohne Neuaufbau; Messmodus notiert den Kontrast-Zustand; Prüfung: Umschalten mit offenem Fenster, Eingabe, gerollter Liste.
- **M1** übernommen: Seitenwechsel, Zurückwischen, Seitenleiste, gleitendes Fenster, Hervorheben bleiben wie heute, unter R-1.9 mit `checkRuhig` (nur Deckkraft, keine Lage).
- **M2** übernommen: mit „Bewegung reduzieren“ springen „Nach oben“/„Ans Ende“/Titel antippen direkt (Überblenden ca. 0,15 s), sonst sanft wie heute; Abweichung von Apples Statusleiste (rollt) begründet (WCAG 2.3.3); `checkRuhig`: ein Rollschritt.
- **M3** so übernommen: kein Umbau – unser Schalter springt schon (Verlauf wird nicht überblendet), der eingebaute (`natsw`) folgt dem System; in `checkRuhig` erlaubte kleine Bewegung (unter 30 px, unter 0,3 s).
- **M4** übernommen: mit „Bewegung reduzieren“ kein Pulsieren (`.mic[aria-pressed=true]` ohne Animation, ruhig gedrückt), sonst wie heute; `checkRuhig`.
- **M5** übernommen: Blatt wie A-61 Teil 2 B22 (Überblenden, Seite ohne Verkleinerung, Ziehen folgt dem Finger, ohne Nachfedern), unter R-1.9; zuerst `checkSheet`, mit Teil 1 in `checkRuhig`.
- **M6** übernommen: Grenze in R-1.9 – erlaubt Überblenden (nur Deckkraft, bis 0,3 s), kleine Rückmeldungen unter 30 px, Bewegung direkt mit dem Finger; nicht erlaubt selbstständige Lageänderung über 30 px, Zoomen/Verkleinern, Federn, sanftes Rollen durch die App, Dauerblinken.
- **M7** übernommen (Sitzung 0035): Bewegungswächter in `pruefe.mjs` – läuft in jeder Prüfung mit `reducedMotion: 'reduce'` und erfasst CSS-Übergänge und -Animationen, Web-Animationen (`el.animate`) und sanftes Rollen (`scrollTo`/`scrollBy`/`scrollIntoView` mit `smooth`, `scroll-behavior: smooth`); gemessen an der Grenze aus M6 (erlaubt: Deckkraft/Farbe bis 0,3 s, unter 30 px, mit dem Finger; rot: Lage über 30 px, Zoomen, Federn, sanftes Rollen, Dauerschleife); Meldung nennt Element, Eigenschaft, Ansicht. `checkRuhig` geht M1–M5 gezielt durch, über P1 alle Ansichten; Gegenprobe eingeschleuste Verschiebung und sanftes Rollen → rot. Fundstelle Reiselogbuch `index.html` (Häkchen mit Fehler rollt sanft zum Fehler, `scrollIntoView` smooth) wird mitbehoben (mit ‚Bewegung reduzieren‘ springen; zusammen mit V10).
- **P1** übernommen (Sitzung 0035): Schalter `PRUEF_BEDIENUNG=beide` in `pruefe.mjs` – `t.seite()` öffnet dann jede Seite mit `contrast: 'more'` und `reducedMotion: 'reduce'`, Ort mit Zusatz „· Kontrast · ruhig“, keine Prüfung einzeln ändern. Im vollen Lauf (`alle.mjs`): `hig` zusätzlich mit den Teilen „hell Bedienungshilfen“ und „dunkel Bedienungshilfen“ (alle vier Ansichten, mit 4,5 : 1 aus H3), dazu die Abläufe mit Bewegung (Navigation, Fenster, iPhone, Suche in der Liste, Seitenleiste) als eigener Teil mit dem Schalter (Bewegungswächter M7); beide Einstellungen zusammen, die Einzelfälle H5 und M1–M4 prüfen jede für sich; `--abdeckung` zeigt die neuen Orte. Mehrzeit beim Bau messen und nennen. Nachgemessen: Playwright 1.56.1 bildet beides in Chromium und WebKit nach. Nebenbefund: Chromium startet in der Cloud nur mit `executablePath: '/opt/pw-browsers/chromium'` (Abbild Shell 1243, Playwright 1.56.1 erwartet 1194) – vor dem ersten Prüflauf klären.
- **P2** übernommen (Sitzung 0035): dritte Art `--gegenprobe bedienung` – `pruefe.mjs` schleust je Lauf **einen** benannten Fehler ein (`PRUEF_GEGENPROBE=bedienung:<fall>`), `lauf.mjs` erwartet genau die passende Meldung (anderer Fehler zählt nicht). Fehler: Icon-Knopf ohne Namen, Fenster ohne Titelbezug (V1, V2); Menüknopf ohne `aria-haspopup`/`aria-expanded`, Häkchen ohne `aria-checked` (V3, V4); Fokus nicht zurück (V5, V6); ohne `inert`, Fenster nicht modal (V7, V8); kein Ansage-Bereich, Fehlermeldung ohne `aria-describedby`, ‚Automatisch gespeichert‘ angesagt (V9–V11); Esc schließt Menü nicht, Eingabe löst Rot, Tab verlässt Fenster (K1, K4, K5); Fokusring beim Antippen (K6), Textfeld mit Fokus-Rahmen (K9); Farbtabelle fehlt, #409CFF als Fläche, Ausgabe dunkel (H1–H4); Verschiebung über 30 px, sanftes Rollen, Pulsieren trotz ‚reduzieren‘ (M2, M4, M7). Bündelt die Gegenproben aus V7, V8, K4, H3, M7. Läuft beim Bau von A-43/1 und wenn sich eine dieser Prüfungen ändert, nicht in jedem `los` (0 Nr. 2); Ergebnis im Bericht.
