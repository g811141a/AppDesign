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
- **V4** nicht übernommen: Häkchen in Menüs bleiben ohne `aria-checked` (Untermenü-Einträge sind über V3 abgedeckt).
- **V5** übernommen: Fokus ins Menü (erster wählbarer Eintrag, Untermenü ebenso) und zurück zum Knopf ohne Rollen (`preventScroll`, R-7.3); fehlt der Knopf → Kopfzeile; `checkFokus` in ablauf.mjs.
- **V6** übernommen: Sprechblase `role="alertdialog"`, `aria-labelledby` auf den Text, `aria-modal`; Fokus auf die Blase (ohne Rahmen), danach zurück zum Knopf bzw. zur Kopfzeile, ohne Rollen; `checkFokus`.
