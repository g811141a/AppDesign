# P-120 Korrekturen (Sitzung 0154)

Korrekturversion vor allem Neuen (0 Nr. 1, 8, 22). Je Punkt zuerst dein Ablauf als feste Prüfung: **`ReiseLogBuch/tests/ablauf-p120.mjs`** – gegen
3.58.0 **rot in Chromium und WebKit** (je 39 Fehler, alle vier Teile). Stand jetzt im Arbeitszweig: F-2, F-3 (HTML) und F-4 umgesetzt, Teile F-2, F-3, F-4
**grün in Chromium und WebKit**, `ablauf-sperre` grün (Chromium). F-1: Versuch mit zwei CSS-Zeilen grün (Chromium und WebKit), kommt erst nach deinem ‚Ja‘
zum Wortlaut nach AppDesign `design.css`.

## P-120/F-1 Text nur in Eingabefeldern auswählbar – Wortlaut zur Freigabe (0 Nr. 29)

**Befund:** Safari markiert beim langen Drücken jeden Text, dessen `user-select` es zulässt, auch in der Nähe des Fingers (Designrichtlinie 13). Gesperrt
sind heute nur einzelne Elemente (Schaltflächen, Kacheln, Leisten). Wählbar waren u. a. die Backup-Kachel, der Titel ‚Reiselogbücher‘, die Anzahl, die Jahresköpfe,
Überschriften und Beschriftungen in den Fenstern sowie der Hinweis ‚gesperrt‘. Die Prüfung `hig.mjs` sah nur Schaltflächen.

**So macht es Apple** (HIG ‚Labels‘ und ‚Text views‘, developer.apple.com, JSON-Fassung, heute gelesen): „A label is a static piece of text that people can read
and often copy, but not edit.“ – „Make useful label text selectable. If a label contains useful information — like an error message, a location, or an IP address —
consider letting people select and copy it for pasting elsewhere.“ Wählbar ist Text also nur dort, wo das Kopieren nützt. Daher die Ausnahme **Vorschau der Ausgabe**:
Sie ist zum Lesen und Weitergeben da, und bei einem gesperrten Reiselogbuch ist sie der einzige Weg, Text zu kopieren.

**Neu – Regelkatalog 17, Thema 1:**

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-1.15 | **Text nur in Eingabefeldern auswählbar:** langes Drücken, Doppeltippen und Ziehen markieren Text und zeigen Lupe und Callout nur in Eingabefeldern (Textfeld, Textbereich, Suchfeld) und in der Vorschau der Ausgabe (Lesetext zum Kopieren, HIG ‚Labels‘); alles andere – Leisten, Titel, Kacheln, Listen und ihre Köpfe, Hinweise und Backup-Kachel, Menüs, Sprechblasen, Beschriftungen in Fenstern, Schaltflächen und die Flächen dazwischen – markiert nichts | hig.mjs – jeder sichtbare Text (jede Ansicht, nach jedem Schritt); ablauf-p120 der App | Lupe beim langen Drücken | 1, 13 |

**R-3.6 – alt (Ende):** „…; Safaris eigene Antipp-Markierung ist aus, und langes Drücken auf Schaltflächen, antippbare Zeilen, Kacheln, Leisten und die
Smiley-Leiste markiert keinen Text und zeigt keine Lupe“
**R-3.6 – neu (Ende):** „…; Safaris eigene Antipp-Markierung ist aus (Textauswahl und Lupe: R-1.15)“

**Designrichtlinie 13 – alt:** „Long-Press-Menü und Textauswahl auf Emoji-Schaltflächen und auf Zeilen, die auf langes Drücken reagieren (Versionszeile, R-1.6),
abschalten (`-webkit-touch-callout: none`, `user-select: none`).“
**Designrichtlinie 13 – neu:** „Long-Press-Menü und Textauswahl außerhalb von Eingabefeldern und Vorschau abschalten (R-1.15): `user-select: none` und
`-webkit-touch-callout: none` für die ganze Seite (`html` und `dialog` – Chromium setzt beim modalen Fenster selbst `user-select: text`), Eingabefelder und `.rt`
ausdrücklich `text`.“

**Bau:** AppDesign 4.68.1 – `design.css` zwei Zeilen; `hig.mjs` prüft jeden sichtbaren Text (die heutige Schaltflächen-Prüfung R-3.6 geht darin auf, ebenso
die Meldungen zu Textauswahl in `katalog.mjs` Z-6 und `ablauf.mjs` APD-106/H-2, H-6 → R-1.15). AD-Bean: keine, weil es eine Grundeinstellung der Seite ist, kein
Baustein. **Am Gerät zu prüfen:** in Eingabefeldern weiter tippen, markieren, Lupe (Safari hatte früher Probleme, wenn ein Elternelement `user-select: none` hat –
daher die Felder ausdrücklich `text`).

## P-120/F-2 Sperren springt ans Ende – behoben (im Arbeitszweig)

**Ursache:** Sperren aus Kontextmenü bzw. Wischen baute nur neu auf. Aktiv blieb das alte (unterste) Reiselogbuch, und `keepSideScroll` rollte zu ihm (R-7.1 ‚der
gewählte Eintrag bleibt sichtbar‘). **Jetzt:** Sperren und Entsperren aus der Liste machen dieses Reiselogbuch zum aktiven. Am iPad wird es angezeigt, am iPhone bleibt die Startliste
stehen. Die Liste springt nicht. Geprüft: iPad quer, iPad hoch, iPhone hoch.

**Dieselbe Lücke überall gesucht (0 Nr. 1):** auch **‚Reiselogbuch einstellen‘** (nach dem Sichern) und **‚Reiselogbuch löschen‘** einer Kachel weiter oben
lassen die Liste ans Ende springen (gemessen 3.58.0+: ‚Wien‘ von y 306 auf −255). Vorschlag: Einstellen wie Sperren (wird das aktive und angezeigt), Löschen
lässt die Liste stehen (das aktive bleibt). Rückfrage unten.

## P-120/F-3 Ausgabe-Nummer – HTML behoben, Rückfrage PDF

**Jetzt (HTML, Teilen-Menü):** gezählt wird erst, wenn die Datei übergeben ist (‚Teilen-Menü abgeschlossen‘ bzw. geladen). Abgebrochen oder gescheitert zählt
nicht, die nächste Ausgabe heißt wieder V001. Geprüft: gesperrte Seite und Vorschau.

**PDF:** Das Drucken-Menü meldet kein Ergebnis. Dazu übergeht iOS 27.2 `print()` in der App vom Home-Bildschirm ganz (RLB-124). Heute zählt PDF beim Antippen,
auch wenn gar nichts aufgeht. Möglichkeiten:
- a) **Zählen, sobald das Drucken-Menü wirklich aufgeht** (Ereignis `beforeprint`). Geht es nicht auf, zählt nichts. Abbrechen im Drucken-Menü lässt sich nicht
  erkennen und zählt dann trotzdem. Vermutung, am Gerät zu bestätigen: iOS schickt `beforeprint` nicht, wenn es `print()` übergeht.
- b) wie heute: PDF zählt beim Antippen.
- c) PDF zählt nie, nur HTML.

## P-120/F-4 Hinweis ‚gesperrt‘ – Muster zur Freigabe

**So macht es Apple** (HIG, heute gelesen): ‚Offering help‘ – „make it easy for people to dismiss or avoid the help if they don’t need it“; Tipps als Inline-Ansicht
(TipKit, x oben rechts). ‚Feedback‘ – „display status information in a passive way so that people can view it when they need it“, „When status feedback is
available near the items it describes, people get important information without having to take action“. Deshalb bleibt der Zustand nach dem Ausblenden als Schloss
vor dem Titel sichtbar, wie auf der Kachel.

**Muster (dein Vorschlag):**
1. Der Hinweis steht beim Rollen fest unter der Kopfzeile, die Vorschau läuft darunter durch.
2. Oben rechts im Hinweis steht x ‚Hinweis ausblenden‘ (runde Schaltfläche). Danach ist der Hinweis weg, und vor dem Titel in der Kopfzeile steht das Schloss.
3. Der Hinweis bleibt weg beim Drehen und Neuaufbau. Er erscheint wieder beim nächsten Öffnen (anderes Reiselogbuch und zurück, Startliste und zurück, Neustart) und nach erneutem Sperren.

Das Muster enthält auch F-1 (keine Textauswahl außerhalb der Felder) und F-2, F-3 zum Ausprobieren. Es nutzt eigene Beispieldaten, nie deine echten.

**Link:** https://g811141a.github.io/AppDesign/arbeit/P-120/index.html (zurücksetzen: …/index.html?neu)

Bilder (iPad quer, iPhone hoch, WebKit): `arbeit/P-120/ipad-quer-1-gerollt.png`, `ipad-quer-2-ausgeblendet.png`, `iphone-hoch-1-gerollt.png`,
`iphone-hoch-2-ausgeblendet.png`.

**Schritte (iPad quer und iPhone hoch, hell):**
1. Link öffnen, ganz neu laden. Erwartet: Liste mit 14 Reiselogbüchern, unten die Backup-Kachel ‚Letztes Backup erstellt am …‘, ‚Mallorca‘ (unten) aktiv.
2. (F-1) Lange auf den Text der Backup-Kachel drücken, dann auf die Lücke zwischen zwei Kacheln. Erwartet: keine Lupe, nichts markiert.
3. (F-2) Liste ganz nach oben rollen, ‚Toskana‘ lange drücken → ‚Reiselogbuch sperren‘. Erwartet iPad: die Liste bleibt stehen, ‚Toskana‘ blau, rechts die
   Vorschau mit Hinweis ‚Dieses Reiselogbuch ist gesperrt.‘. Erwartet iPhone: die Startliste bleibt stehen.
4. (F-4) ‚Australien‘ öffnen, nach unten rollen. Erwartet: Der Hinweis ‚Dieses Reiselogbuch ist gesperrt.‘ bleibt unter der Kopfzeile stehen.
5. (F-4) x oben rechts im Hinweis antippen. Erwartet: Der Hinweis ist weg, in der Kopfzeile steht ‚🔒 Australien‘ (Schloss-Icon).
6. (F-4) Ein anderes Reiselogbuch öffnen und wieder ‚Australien‘. Erwartet: Der Hinweis ist wieder da.
7. (F-3) Teilen antippen, im Teilen-Menü abbrechen, Meldung schließen, nochmals Teilen. Erwartet: beide Male ‚Ausgabe V001‘.
8. (F-1) Ein nicht gesperrtes Reiselogbuch öffnen, einen Tag antippen, im Feld ‚Verlauf‘ lange drücken. Erwartet: Lupe und Markierung wie gewohnt.

**Testfall-Liste F-4 (automatisch, `ablauf-p120` Teil F-4, iPad quer und iPhone hoch):** F-4/1 nach dem Rollen steht der Hinweis unter der Kopfzeile ·
F-4/2 x ‚Hinweis ausblenden‘ vorhanden · F-4/3 nach x weg, Vorschau bleibt · F-4/4 nach Neuaufbau weiter weg · F-4/5 beim nächsten Öffnen wieder da · F-4/6
nach Neustart wieder da. Dazu kommen die Grundregeln nach jedem Schritt. Im vollen Lauf kommen dazu: iPad hoch, iPhone quer, dunkel, Text 53 (Hinweis höher als ein Drittel des
Bildschirms?). Für den Usertest: Rollen und x am Gerät.

## Offene Usertests

- **P-120** (3.58.0 / 4.68.0): nicht ok – P-120/F-1 bis F-4, in Arbeit (diese Datei).

## Bau danach

Reiselogbuch 3.58.1 mit AppDesign 4.68.1 (F-1 und APD-146), Prüflauf voll – Bau-Frage nach deinen Antworten.

## Entscheidungen (Nutzer 22.11.2026, Sitzung 0154, im Fenster)

- **F-1:** Wortlaut R-1.15 (mit Vorschau als Ausnahme), R-3.6 und Designrichtlinie 13 wie oben **freigegeben** – noch einzutragen (Katalog, R-3.6, 13), dazu
  `design.css` (zwei Zeilen), `hig.mjs` (jeder sichtbare Text, R-1.15; Schaltflächen-Prüfung R-3.6 geht darin auf), `katalog.mjs` Z-6 und `ablauf.mjs`
  APD-106/H-2, H-6 → R-1.15.
- **F-2:** dieselbe Lücke mitbeheben – ‚Reiselogbuch einstellen‘ aus der Liste: das Reiselogbuch wird das aktive und angezeigt; ‚Reiselogbuch löschen‘: die
  Liste bleibt stehen (das aktive bleibt). Noch umzusetzen, mit Teil F-2 in `ablauf-p120` (rot gegen 3.58.0 zuerst).
- **F-3:** a) PDF zählt erst, wenn das Drucken-Menü wirklich aufgeht (`beforeprint`) – noch umzusetzen (heute in `exportPdf` noch `countOutput` beim Antippen);
  Testfall (User): am Gerät vom Home-Bildschirm PDF antippen → Nummer bleibt.
- **F-4:** Muster übernommen, **mit Änderung:** x horizontal zentriert auf derselben Linie wie ‚Entsperren‘ (vorher höher gestellt) – umgesetzt in App und Muster
  (`.li-x { align-self: center }`, iPhone rechts in der Zeile von ‚Entsperren‘), `ablauf-p120` F-4 grün in Chromium und WebKit, Bilder neu.
