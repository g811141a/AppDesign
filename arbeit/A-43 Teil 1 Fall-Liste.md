# A-43 Teil 1 ‚VoiceOver, Tastatur, Kontrast, Bewegung‘ – Fall-Liste

**Stand 23.10.2026** · Sitzung Reiselogbuch 0034 · Klärung und Apple-Abgleich: `arbeit/A-43 Klärung.md`

**Entschieden (Nutzer 23.10.2026):** zwei Teile – **Teil 1** (diese Liste) ohne Muster, nur Fall-Liste, Prüfungen und Ja;
**Teil 2** Textgröße nach der Einstellung des Geräts mit Muster. Tastatur: **nur Grundlagen** (keine Kurzbefehle). ‚Kontrast
erhöhen‘ mit **zweiter Farbtabelle** hell und dunkel nach Apple.

Alles ist allgemein (AppDesign `ui.js`, `design.css`, Prüfungen in `tests/`); die App ändert nur eigene Bausteine (z. B. Felder mit
Fehlermeldung, Trefferzeile), wo sie nicht über ui.js laufen.

## 1. Vorgesehene Regeln (Katalog, Designrichtlinie 17)

| Regel | Inhalt | Prüfung |
|---|---|---|
| R-1.4 erweitert | Nur der Vordergrund reagiert – **auch für VoiceOver und Tastatur**: bei offenem Menü und offener Sprechblase ist alles andere unerreichbar | hig.mjs |
| **R-1.8 neu** | **VoiceOver:** jedes Bedienelement hat Namen, Rolle und Zustand; Fenster und Sprechblasen mit Titel; der Fokus geht hinein und zurück; Ergebnisse werden angesagt | hig.mjs – `checkNamen`, ablauf.mjs – `checkFokus` |
| **R-1.9 neu** | **Bedienungshilfen des Geräts:** ‚Kontrast erhöhen‘ schaltet auf die zweite Farbtabelle; ‚Bewegung reduzieren‘ ersetzt jede Bewegung durch Überblenden bzw. Springen | hig.mjs (Kontrast), ablauf.mjs – `checkRuhig` |
| **R-4.7 neu** | **Hardware-Tastatur:** Esc und ⌘. schließen Menü, Sprechblase und Fenster (wie x bzw. Abbrechen); Pfeile in Menüs; Eingabe löst die empfohlene, nie die rote Aktion; Tab bleibt im Vordergrund | ablauf.mjs – `checkFokus` |
| R-5.3 erweitert | Fehlermeldung **auch hörbar**: mit dem Feld verknüpft und beim Erscheinen angesagt | ablauf.mjs – `checkFieldErrors` |

(R-4.6 ist für das Blatt auf dem iPhone vorgesehen, A-61/2.)

## 2. Fall-Liste

Gerät × Lage × Darstellung: iPad quer und hoch, iPhone hoch und quer, je hell und dunkel, Chromium und WebKit; nach jedem Fall
gelten die Grundregeln (`pruefe.mjs`).

### V – VoiceOver (Namen, Rollen, Fokus, Sperre, Ansagen)

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| V1 | Jede Ansicht: alle sichtbaren Schaltflächen, Felder, Schalter, Kapseln | jedes hat einen Namen (Icon-Knöpfe `aria-label`, Felder über ihr `label`); Icons selbst `aria-hidden` | ja (`checkNamen`) |
| V2 | Fenster, Meldung, Blatt öffnen | Rolle Fenster, Name = Fenstertitel (`aria-labelledby`), Zusatzzeile als Beschreibung | ja |
| V3 | Knopf, der ein Menü öffnet (ellipsis, Sortieren, Kontextmenü …) | ‚öffnet Menü‘ (`aria-haspopup="menu"`), offen/zu (`aria-expanded`) | ja |
| V4 | Menüpunkt mit Häkchen, Untermenü, deaktiviert | ‚ausgewählt‘ (`menuitemradio`/`menuitemcheckbox` mit `aria-checked`); Untermenü ‚öffnet Menü‘; deaktiviert wird angesagt | ja |
| V5 | Menü öffnen; dann wählen, daneben tippen oder Esc | Fokus auf dem ersten Eintrag; danach zurück auf dem Knopf | ja (`checkFokus`) |
| V6 | Sprechblase öffnen (Löschen, Ersetzen, Änderungen verwerfen, drei Wege) | Rolle Abfrage (`alertdialog`), der Text wird gelesen; Fokus in der Blase, danach zurück auf dem Knopf | ja |
| V7 | Menü bzw. Sprechblase offen (auf der Seite und im Fenster) | alles außerhalb ist unerreichbar (`inert`), nach dem Schließen wieder erreichbar | ja |
| V8 | Fenster offen | Seite unerreichbar (eingebautes modales Fenster), Menü und Sprechblase im Fenster wie V7 | ja |
| V9 | Suche: tippen, Treffer wechseln, keine Treffer | ‚3 von 57‘ bzw. ‚Keine Treffer‘ wird nach einer kurzen Pause angesagt (höflich, unterbricht nicht) | ja (Ansage-Bereich) |
| V10 | Fehlermeldung erscheint (nach Eingabe bzw. beim Häkchen), verschwindet | Feld ‚ungültig‘ (`aria-invalid`), Meldung mit dem Feld verknüpft (`aria-describedby`) und einmal angesagt | ja |
| V11 | ‚Automatisch gespeichert um …‘ | wird **nicht** angesagt, nur im Fensterkopf lesbar (Nutzer 23.10.2026, wie Notizen) | ja (kein Ansage-Bereich) |
| V12 | iPhone: Seite vor (Eintrag öffnen) und zurück | Fokus auf dem Titel der neuen Seite; zurück auf der Zeile, von der man kam | ja |
| V13 | Offline-Meldung | wird angesagt (heute schon `role="status"`) | ja |
| V14 | Daten leer, lang, viele (lange Menüs mit Rollen, leere Liste) | Namen und Rollen wie V1–V4, leere Liste mit lesbarem Hinweis | ja |

### K – Hardware-Tastatur am iPad (nur Grundlagen)

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| K1 | Menü offen: Esc bzw. ⌘. | schließt, Fokus zurück auf dem Knopf | ja |
| K2 | Menü offen: Pfeil ab/auf, Pos1/Ende, Eingabe bzw. Leertaste | wandert durch die Einträge (deaktivierte und Zwischenzeilen übersprungen), Eingabe wählt | ja |
| K3 | Untermenü: Pfeil rechts bzw. Eingabe am Eintrag, Pfeil links bzw. Esc | öffnet das Untermenü mit Fokus auf dem ersten Eintrag; schließt es, Fokus zurück auf dem Eintrag | ja |
| K4 | Sprechblase: Eingabe, Esc bzw. ⌘., Tab bzw. Pfeile | Eingabe = empfohlene Aktion (blau) bzw. ‚Abbrechen‘, **nie die rote**; Esc = Abbrechen; Tab bleibt in der Blase | ja |
| K5 | Fenster: Esc bzw. ⌘. | wie x (mit Änderungen die Rückfrage, R-4.4); Tab bleibt im Fenster | ja |
| K6 | Tab durch eine Seite | alle Bedienelemente in sichtbarer Reihenfolge; Fokusrahmen nur bei der Tastatur, nie beim Antippen (R-3.4) | ja |
| K7 | Esc auf der Seite (iPhone-Aufbau bzw. darübergelegte Seitenleiste) | zurück bzw. Seitenleiste zu (heute schon, F-20) | ja |
| K8 | Eingabe in einem einzeiligen Feld | beendet das Feld (R-5.5), löst kein Häkchen aus | ja |

### H – ‚Kontrast erhöhen‘ (zweite Farbtabelle)

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| H1 | Hell mit ‚Kontrast erhöhen‘ | Apples kontrastreiche Farben (z. B. Blau #0040DD, Rot #D70015, Grün #248A3D, Orange #C93400), graue Texte dunkler, Linien dunkler, Glas undurchsichtiger | ja (Farbwerte, Kontrast) |
| H2 | Dunkel mit ‚Kontrast erhöhen‘ | z. B. Blau #409CFF, Rot #FF6961, Grün #30DB5B, Orange #FFB340; graue Texte heller, Linien heller | ja |
| H3 | Kontrast aller Texte | mindestens 4,5 : 1 – auch Weiß auf Blau und Orange (ohne ‚Kontrast erhöhen‘ bleiben die bewussten Ausnahmen) | ja (hig.mjs) |
| H4 | Ausgabe HTML/PDF | unverändert hell (R-6.2) | ja |
| H5 | Einstellung bei offener App umschalten | Farben wechseln sofort, ohne Neuladen | ja |

### M – ‚Bewegung reduzieren‘

| Nr. | Fall | Erwartet | Automatisch |
|---|---|---|---|
| M1 | Seitenwechsel, Zurückwischen, Seitenleiste, Fenster gleitet, Hervorheben | wie heute: Überblenden bzw. ohne Bewegung | ja (heute schon) |
| M2 | ‚Nach oben‘ / ‚Ans Ende‘ | springt statt sanft zu rollen | ja |
| M3 | Schalter umlegen | ohne Gleiten | ja |
| M4 | Mikrofon beim Diktieren | pulsiert nicht, bleibt sichtbar aktiv | ja |
| M5 | Blatt auf dem iPhone (A-61/2) | Überblenden, Ziehen folgt dem Finger (Fall B22) | beim Bau von A-61/2 |
| M6 | Überblenden (opacity) | bleibt erlaubt (wie Apple) | – |
| M7 | Jede neue Bewegung | fragt `prefers-reduced-motion` ab – Prüfung sucht Bewegungen, die es nicht tun | ja (`checkRuhig`) |

### P – Prüfungen

| Nr. | Fall | Erwartet |
|---|---|---|
| P1 | Grundregeln zusätzlich mit ‚Kontrast erhöhen‘ und ‚Bewegung reduzieren‘ (Playwright `contrast: 'more'`, `reducedMotion: 'reduce'`) | alle Ansichten grün (T-60) |
| P2 | Gegenprobe | ohne Namen, ohne `inert`, mit Eingabe = rot, ohne Farbtabelle bzw. mit Bewegung trotz ‚reduzieren‘ wird die Prüfung rot |

**Nur am Gerät (Prüfliste):** Hardware-Tastatur am iPad (Esc, ⌘., Pfeile, Eingabe); Aussehen mit ‚Kontrast erhöhen‘; Gefühl mit
‚Bewegung reduzieren‘.

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
