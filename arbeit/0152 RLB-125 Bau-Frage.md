# RLB-125 – Bau-Frage (Reiselogbuch sperren)

Stand 21.11.2026 · Sitzung 0152 · Grundlage: `arbeit/0148 RLB-125 Klaerung.md`, `arbeit/0149 RLB-125 Muster 3.md` (Muster 6 ok),
`arbeit/0149 RLB-125 Regel und Loeschabfrage Wortlaut.md` (R-4.14, L-4, L-5 freigegeben), `arbeit/0150 RLB-125 Rest.md` (Muster 7 ok, J-10, J-11)

**Version:** Reiselogbuch **3.58.0** · AppDesign **4.68.0** (neue Funktion bzw. neue Regel = Nebenversion, Designrichtlinie 11) · **Prüflauf voll**
(AppDesign ändert sich, dann ist Stufe Text ausgeschlossen, 0 Nr. 2).

## 1. Vor dem Bau gefunden: R-4.14 widerspricht R-4.10 und der HIG

**Befund:** Seit Muster 4 gibt es im gesperrten Reiselogbuch kein Mehr mehr. ‚Reiselogbuch einstellen‘ und ‚Reiselogbuch löschen‘ stehen deshalb
blass mit ‚Gesperrt‘ **im Kontextmenü der Kachel** (Muster `arbeit/RLB-125/index.html`, Zeilen 1306–1312). Das widerspricht:

- **R-4.10** (gilt heute): „ein Kontextmenü hat höchstens 3 Gruppen und zeigt keine gesperrten Punkte (ausblenden statt grau)“. Die Prüfung
  `hig.mjs` – `texteMenues` meldet jeden blassen Punkt in einem Kontextmenü als Fehler (Zeile 323). Der Prüflauf würde rot.
- **Apple HIG ‚Context menus‘** (heute abgerufen): „Hide unavailable menu items, don't dim them.“
- **Apple HIG ‚Menus‘** (heute abgerufen) sagt für normale Menüs dagegen: „Show people when a menu item is unavailable. An unavailable menu item
  often appears dimmed and doesn't respond to interactions.“ – darauf stützt sich R-4.14. In 0148 wurde nur diese Seite herangezogen.

Die HIG unterscheidet also: **Menü blass, Kontextmenü ausblenden.** R-4.10 folgt dem schon. R-4.14 in der freigegebenen Fassung („Ein
Menüpunkt … bleibt sichtbar … nicht weggelassen“) gilt aber auch für Kontextmenüs.

**Frage 1 – Kontextmenü der gesperrten Kachel:**

- **a) (Empfohlen) Ausblenden wie die HIG und R-4.10:** Das Kontextmenü der gesperrten Kachel zeigt nur ‚Reiselogbuch entsperren‘. Das Wischen zeigt
  nur ‚Entsperren‘ (`lock-open`, wie L-2). Den Grund zeigt das `lock` vor dem Titel. R-4.10 bleibt unverändert. R-4.14 bekommt den Zusatz, dass sie
  für Menüs gilt (Wortlaut unten). Im Reiselogbuch nutzt dann vorerst kein Menü R-4.14, denn gesperrt gibt es kein Mehr (J-8). Die Regel kommt
  trotzdem mit ihrer Prüfung auf der Prüfseite.
- **b) Blass wie besprochen (L-1):** R-4.14 bleibt wie freigegeben. R-4.10 wird geändert, ebenso die Prüfung in `hig.mjs` und Zeile 6 der HIG-Checkliste
  (Designrichtlinie 16). Das ist eine bewusste Abweichung von der HIG (Spalte ‚Entschieden‘).

### Wortlaut zu a – R-4.14 (Designrichtlinie 17, Abschnitt 4)

**Freigegeben (0149):**

> | R-4.14 | **Nicht verfügbare Menüpunkte:** Ein Menüpunkt, der gerade nicht ausführbar ist, bleibt an seiner Stelle sichtbar: blass, nicht antippbar
> (`disabled`), mit dem Grund als grauer Unterzeile (z. B. ‚Gesperrt‘). Er wird nicht weggelassen. Wischaktionen zeigen nur ausführbare Aktionen. |
> pruefseite.mjs – Teil `menue` (neuer Fall: blasser Eintrag mit `disabled` und Unterzeile, Antippen und Eingabetaste lösen nichts aus; Gegenprobe
> ohne `disabled` → rot) | – | 15.6 |

**Neu:**

> | R-4.14 | **Nicht verfügbare Menüpunkte:** In einem Menü (z. B. Mehr, Ausgabe) bleibt ein Menüpunkt, der gerade nicht ausführbar ist, an seiner Stelle
> sichtbar: blass, nicht antippbar (`disabled`), mit dem Grund als grauer Unterzeile (z. B. ‚Gesperrt‘). Er wird nicht weggelassen. Kontextmenüs
> (R-4.10) und Wischaktionen zeigen nur ausführbare Aktionen. | pruefseite.mjs – Teil `menue` (neuer Fall: blasser Eintrag mit `disabled` und
> Unterzeile, Antippen und Eingabetaste lösen nichts aus; Gegenprobe ohne `disabled` → rot) | – | 15.6 |

### Wortlaut zu b – R-4.10 und HIG-Checkliste Zeile 6

R-4.14 wie freigegeben (oben).

**R-4.10 alt:** „… ein Kontextmenü hat höchstens 3 Gruppen und zeigt keine gesperrten Punkte (ausblenden statt grau)“ · Prüfung „hig.mjs – `texteMenues` …“

**R-4.10 neu:** „… ein Kontextmenü hat höchstens 3 Gruppen; nicht verfügbare Punkte zeigt es blass mit Grund (R-4.14)“ · Prüfung „hig.mjs – `texteMenues`
(… ein blasser Punkt im Kontextmenü braucht `disabled` und eine Unterzeile)“ · Spalte Entschieden: 21.11.2026 (weicht von der HIG ‚Context menus‘ ab)

**HIG-Checkliste Zeile 6 alt:** „R-4.2, R-4.10 (höchstens 3 Gruppen; nicht verfügbare Punkte **ausblenden** statt grau)“

**HIG-Checkliste Zeile 6 neu:** „R-4.2, R-4.10 (höchstens 3 Gruppen; nicht verfügbare Punkte blass mit Grund, R-4.14 – **weicht ab**: die HIG blendet sie aus)“

## 2. Wortlaut Abgleich (Designrichtlinie 15.18 und Katalog R-9.3, 0 Nr. 29)

### 15.18, Absatz ‚Technisch‘ (erster Satz)

**Alt:**

> gemeinsamer Baustein `createSync({ list, sub, subAt, maxFields, nouns, labels, values, app })` in `ui.js` – jede App mit Backup nutzt ihn (keine eigene
> Umsetzung, R-1.1).

**Neu:**

> gemeinsamer Baustein `createSync({ list, sub, subAt, maxFields, nouns, labels, values, protect, app })` in `ui.js` – jede App mit Backup nutzt ihn (keine
> eigene Umsetzung, R-1.1). **`protect`** sagt, welche Einträge gesperrt sind (z. B. `e => e.locked`): Ein gesperrter Eintrag wird beim Abgleich nie
> gelöscht, auch nicht, wenn das andere Gerät ihn gelöscht hat, ohne die Sperre zu kennen (Fall 23).

### 15.18, Tabelle – neue Zeilen 21–23 (nach Zeile 20)

| Nr. | Anwendungsfall | iPhone lädt das Backup vom iPad → ‚Abgleichen‘ | iPad lädt das Backup vom iPhone → ‚Abgleichen‘ |
|---|---|---|---|
| 21 | Auf dem iPad gesperrt, iPhone unverändert | wird gesperrt – Zeile ‚Gesperrt: ja‘ im Abgleichbericht | bleibt gesperrt – ‚nichts geändert‘, im Abgleichbericht unter ‚Auf diesem iPad neuer als im Backup – bleibt so‘ |
| 22 | Auf dem iPad gesperrt, auf dem iPhone **danach** entsperrt | bleibt entsperrt – ‚nichts geändert‘, im Abgleichbericht unter ‚Auf diesem iPhone neuer als im Backup – bleibt so‘ | wird entsperrt – Zeile ‚Gesperrt: –‘ im Abgleichbericht |
| 23 | Auf dem iPad gesperrt, auf dem iPhone **danach** gelöscht (das iPhone kannte die Sperre noch nicht) | kommt gesperrt zurück – Zeile ‚neu angelegt‘ im Abgleichbericht und Hinweis ‚Auf dem iPad gesperrt, auf diesem iPhone gelöscht: … – wiederhergestellt‘; danach sind beide Geräte gleich | bleibt erhalten und gesperrt – Hinweis ‚Auf dem iPhone gelöscht, auf diesem iPad gesperrt: … – bleibt erhalten‘ |

(‚…‘ steht wie in Fall 2 für den Titel, z. B. ‚Australien‘. ‚Gesperrt‘ und ‚ja‘ kommen aus `labels` und `values` der App.)

### Katalog R-9.3

**Alt:**

> | R-9.3 | **Abgleichen:** je Feld gilt das Neuere; leere Felder überschreiben nichts; Gelöschtes bleibt gelöscht, solange danach nicht geändert (Hinweis nennt die
> Geräte); Zähler: größerer Wert; Einstellungen je Gerät | abgleich.mjs (Fälle 1–20) | – | 15.18 |

**Neu:**

> | R-9.3 | **Abgleichen:** je Feld gilt das Neuere; leere Felder überschreiben nichts; Gelöschtes bleibt gelöscht, solange danach nicht geändert (Hinweis nennt die
> Geräte); ein gesperrter Eintrag (`protect`) wird nie gelöscht und kommt auf dem Gerät, das ihn gelöscht hat, gesperrt zurück; Zähler: größerer Wert;
> Einstellungen je Gerät | abgleich.mjs (Fälle 1–23, Gegenprobe Fall 23) | – | 15.18 |

## 3. Was gebaut wird (vollständig)

### Reiselogbuch 3.58.0 (App)

1. **Sperren und Entsperren:** Kontextmenü und Wischaktion der Kachel ‚Reiselogbuch sperren‘ (`lock`) bzw. ‚Reiselogbuch entsperren‘ (`lock-open`); im
   nicht gesperrten Reiselogbuch zusätzlich Mehr → ‚Reiselogbuch sperren‘. Feld `locked` am Reiselogbuch. Sperren und Entsperren zählen als Änderung,
   die Kachel zeigt danach ‚geändert am …‘ (J-11). Keine Abfrage, sofort wirksam.
2. **Kachel:** `lock` klein vor dem Titel, so hoch wie die Großbuchstaben und mittig, in der Farbe des Titels (J-9); nicht gesperrt kein Symbol.
3. **Gesperrt geöffnet:** statt Tabelle bzw. Kästen nur die Vorschau als Seite, kein Fenster, kein x. Sie bleibt nach jeder Ausgabe, nach Backup,
   Wechsel, Drehen und Neustart (J-7). Oben ‚PDF‘ und Teilen (blau gefüllt), kein Mehr (J-8). Darüber der orange Hinweis mit `lock`: ‚Dieses Reiselogbuch
   ist gesperrt. Es lässt sich lesen und ausgeben, aber nicht ändern oder löschen.‘ und ‚Entsperren‘ hell mit blauer Schrift (J-5, J-6). ‚Entsperren‘ führt
   sofort zur normalen Seite. Fazit und Gesamtausgaben stehen gesperrt nur in der Vorschau.
4. **iPhone hoch:** Hinweis über die ganze Breite, ‚Entsperren‘ darunter; Vorschau 960 px breit, seitlich wischen nur in der Seite (Muster 7).
5. **Kontextmenü gesperrt:** nach Frage 1 – a) nur ‚Reiselogbuch entsperren‘ · b) dazu ‚Reiselogbuch einstellen‘ und ‚Reiselogbuch löschen‘ blass mit ‚Gesperrt‘.
6. **Lösch-Abfrage (L-4, L-5, freigegeben):** ‚‚Toskana‘ mit allen 42 Einträgen löschen? Das kann nicht rückgängig gemacht werden.‘ (1 Eintrag:
   ‚mit 1 Eintrag‘; 0: ‚‚Toskana‘ ohne Einträge löschen? …‘). Schaltflächen: Abbrechen · Erst Backup erstellen · **Reiselogbuch löschen** (rot).
   ‚Erst Backup erstellen‘ steht nur, wenn heute noch kein Backup erstellt wurde und es Einträge gibt; danach kommt dieselbe Sprechblase ohne sie wieder.
7. **‚Ersetzen‘** (Backup laden) nennt ‚Darunter N gesperrte Reiselogbücher.‘ (J-3).
8. **Backup:** Die Sperre ist im Backup. Alte Backups ohne `locked` gelten als nicht gesperrt (`normalize`).
9. **Abgleich:** `createSync({ …, protect: t => t.locked })`, `labels.locked = 'Gesperrt'`, `values.locked` → ‚ja‘ bzw. ‚–‘.

### AppDesign 4.68.0 (allgemein)

1. **`createSync`, neue Eigenschaft `protect`** (Fall 23, beide Richtungen; der wiederhergestellte Eintrag verliert seinen Eintrag in `deleted`).
   AD-Bean: keine, weil `createSync` noch keine AD-Bean ist (der Umbau gehört zu APD-142).
2. **R-4.14** in Katalog 17, Abschnitt 4, mit Prüfung auf der Prüfseite (Teil `menue`). AD-Bean: keine, weil `openMenu` blasse Einträge schon kann
   (`disabled`, `sub`).
3. **15.18** (Absatz ‚Technisch‘, Fälle 21–23), **R-9.3**; `abgleich.mjs` mit den Fällen 21–23 in beide Richtungen und der Gegenprobe zu Fall 23.
4. Nur bei b): R-4.10, `hig.mjs` – `texteMenues`, HIG-Checkliste Zeile 6.

## 4. Testfall-Liste RLB-125 (Stand 0150, RLB-125/T-5 nach Frage 1)

| Nr. | Testfall (automatisch) |
|---|---|
| RLB-125/T-1 | Kachel gesperrt: `lock` vor dem Titel, so hoch wie die Großbuchstaben und mittig (J-9) (iPad, iPhone-Startliste, große Schrift); nicht gesperrt kein Symbol |
| RLB-125/T-2 | Gesperrt öffnen (Kachel, Start, Neustart, Wechsel, nach ‚Sperren‘): nur die Vorschau-Seite, keine Tabelle, keine Kästen, kein Fenster |
| RLB-125/T-3 | Nach jeder Ausgabe (HTML, PDF, abgebrochen, Fehler) und nach Backup erstellen bzw. laden (Abgleichen): Vorschau bleibt, nie die Tabelle |
| RLB-125/T-4 | Oben ‚PDF‘ und Teilen (blau gefüllt) wie in der Vorschau, kein Mehr; ‚PDF‘ öffnet das Drucken-Menü, Teilen das Teilen-Menü |
| RLB-125/T-5 | Kontextmenü und Wischen der gesperrten Kachel: nur ‚Entsperren‘ wirkt – **a)** Kontextmenü nur ‚Reiselogbuch entsperren‘, keine blassen Punkte (R-4.10) · **b)** ‚Einstellen‘ und ‚Löschen‘ blass mit ‚Gesperrt‘ (R-4.14); Wischen nur ‚Entsperren‘ (`lock-open`) |
| RLB-125/T-6 | ‚Entsperren‘ → Tabelle bzw. Kästen; ‚Sperren‘ → Vorschau; Fokus danach sichtbar (Grundregeln) |
| RLB-125/T-7 | Drehen und Wechsel iPad/iPhone, Seitenleiste aus/ein: Vorschau bleibt (Grundregeln) |
| RLB-125/T-8 | Abgleich Fälle 21–23 in beide Richtungen (`abgleich.mjs`); ‚Ersetzen‘ nennt ‚Darunter N gesperrte Reiselogbücher.‘ |
| RLB-125/T-9 | Backup erstellen und laden behält die Sperre; alte Backups ohne Sperre gelten als nicht gesperrt (`normalize`) |
| RLB-125/T-10 | Gegenprobe: gesperrt, aber Tabelle sichtbar → rot; Gegenprobe Fall 23: gesperrter Eintrag wird gelöscht → rot |
| RLB-125/T-11 | iPhone hoch: Hinweis über die ganze Breite, ‚Entsperren‘ darunter und im Bildschirm; Vorschau 960 px, seitlich wischen nur in der Seite |
| RLB-125/T-12 | Lösch-Abfrage (nicht gesperrt): Anzahl der Einträge (1 / 42 / ohne); ‚Erst Backup erstellen‘ nur ohne Backup heute und mit Einträgen (L-4, L-5) |
| RLB-125/T-13 | R-4.14 auf der Prüfseite, Teil `menue`: blasser Eintrag mit `disabled` und Unterzeile, Antippen und Eingabetaste lösen nichts aus; Gegenprobe ohne `disabled` → rot |

Was nur das Gerät zeigt (Teilen-Menü, Drucken-Menü, iCloud-Abgleich zwischen zwei Geräten, Wischgefühl), kommt als Testfall (User) in den Usertest.

## 5. Apple-Abgleich

- **HIG ‚Menus‘:** nicht verfügbare Punkte blass zeigen – belegt (heute abgerufen).
- **HIG ‚Context menus‘:** nicht verfügbare Punkte ausblenden, nicht blass – belegt (heute abgerufen).
- **Abgleich:** Grundregel ‚die neuere Änderung gilt‘ wie heute (15.18). Wie iCloud eine gesperrte Notiz gegen Löschen auf einem anderen Gerät behandelt, ist
  **nicht belegt** (support.apple.com aus der Umgebung nicht erreichbar).
- Allgemein oder App: App (RLB-125), allgemein nur R-4.14 und `createSync` mit `protect` (entschieden 0149 und 0150).

## Rückmeldung (Nutzer 21.11.2026, Sitzung 0152, im Fenster)

- **RLB-125/J-12** (Frage 1): a – das Kontextmenü der gesperrten Kachel blendet ‚Einstellen‘ und ‚Löschen‘ aus (HIG ‚Context menus‘, R-4.10 bleibt);
  R-4.14 im neuen Wortlaut (‚In einem Menü …‘, Kontextmenüs nach R-4.10) freigegeben.
- Wortlaut 15.18 (‚Technisch‘ mit `protect`, Fälle 21–23) und R-9.3: **Ja**.
- Bau-Frage: **Ja** – Reiselogbuch 3.58.0 mit AppDesign 4.68.0, Prüflauf voll.
