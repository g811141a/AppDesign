# APD-124 – Rückgängig im Feld nach dem Leeren: Klärung, Muster, Testfall-Liste

Stand 07.11.2026 · Sitzung Reiselogbuch 0095 · Backlog AppDesign APD-124 (Prio 1, allgemein, ändert R-5.6)

## Wunsch (Nutzer 07.11.2026)

Das Löschen in einem Eingabefeld soll ein Rückgängig bis zur ersten Eingabe anbieten: das ⓧ im Feld wird durch ein Rückgängig-Icon ersetzt,
nach dem Rückgängig steht wieder das ⓧ zum Löschen. Der ausgeschnittene Wert bleibt in der Zwischenablage, um ihn später zu verwenden.

## Heute (AppDesign 4.54.0)

- R-5.6 / Designrichtlinie 15.11: ⓧ in ein- und mehrzeiligen Feldern, solange das Feld den Fokus hat und etwas drinsteht; eine Zeile sofort leeren,
  mehr als eine Zeile erst nach der Sprechblase ‚Text löschen?‘ (APD-81, 4.41.0, Usertest P-79 ok).
- Rückgängig nur über Undo-Taste (iPad), drei Finger nach links, Schütteln (iPhone) – möglich, weil das ⓧ über den Bearbeiten-Befehl leert
  (Designrichtlinie 13 ‚Leeren und Rückgängig‘, APD-81/M-1 bis M-4). Kein Icon, keine Zwischenablage.

## Apple-Abgleich (0 Nr. 23, 2.6)

- So macht es Apple (Designrichtlinie 16 Nr. 11 und ‚bewusste Abweichungen‘, R-5.6): das ⓧ (‚whileEditing‘) leert nur; Rückgängig über Undo-Taste,
  drei Finger, Schütteln; mehrzeilige Felder (UITextView) haben kein ⓧ. Ein Icon, das nach dem Leeren zu Rückgängig wird, hat Apple nicht.
- **Bewusste Abweichung** (Wunsch des Nutzers): am iPhone gibt es keine Undo-Taste, Schütteln und drei Finger sind wenig bekannt. Das Icon steht an
  der Stelle des ⓧ, in derselben Größe (44 × 44, wächst mit der Textgröße) und Farbe (`--muted`).
- Katalog: R-5.6 (ändert sich), R-4.3 (Sprechblase – entfällt hier), R-1.10 (Textgröße), R-3.x Trefferfläche 44 × 44 (bleibt).

## Entscheidungen (Nutzer 07.11.2026, Sitzung 0095)

- APD-124/E-1 Die Sprechblase ‚Text löschen?‘ bei mehrzeiligen Feldern **entfällt** – das Rückgängig im Feld macht das Leeren sicher.
- APD-124/E-2 Verliert das leere Feld den Fokus, **verschwindet** das Rückgängig-Icon (wie das ⓧ nur mit Fokus); der Text bleibt in der Zwischenablage.
- APD-124/E-3 (aus dem Wunsch) Rückgängig bis zur ersten Eingabe; nach dem Rückgängig bzw. der ersten Eingabe wieder das ⓧ. Der geleerte Text kommt
  beim Leeren in die Zwischenablage.

- APD-124/E-4 Muster am iPad und iPhone geprüft: **Variante A (graue Linie, `undo-2`), alles ok** (Nutzer 07.11.2026, Sitzung 0095). Schritt 10
  (Undo-Taste nach dem Rückgängig) ohne eigene Angabe. Offen vor ‚bereit‘: Wortlaut R-5.6 und Designrichtlinie 15.11/16 (0 Nr. 29), Muster iPad hoch
  und iPhone quer (0 Nr. 6), Testfälle (User).

## Muster (nur hell, Vereinbarung 30.10.2026)

`arbeit/APD-124/index.html` – drei Felder (Titel, Ort, Verlauf mehrzeilig), design.css der Fassung 4.54.0, ui.js aus `arbeit/APD-124 Muster bauen.mjs`
(Kopie von `fassung/4.54.0/ui.js`). Unten zeigt die Seite, ob Safari die Zwischenablage beschreiben ließ (‚Zwischenablage: N Zeichen kopiert‘ bzw.
‚… abgelehnt‘) – nur zum Prüfen, nicht für die App.

- APD-124/V-1 Variante A (`?v=a`, Empfehlung): Rückgängig als graue Linie (Lucide `undo-2`) – leichter als das ⓧ, sofort als ‚anderer‘ Knopf erkennbar.
- APD-124/V-2 Variante B (`?v=b`): `undo-2` weiß im grauen Kreis wie das ⓧ.
- Technik: Rückgängig setzt den Text über den Bearbeiten-Befehl wieder ein (`execCommand('insertText')`, sonst über den Wert); Zwischenablage mit
  `navigator.clipboard.writeText` im Tipp (Geste des Nutzers).

## Testfall-Liste (Testfall (automatisch), `arbeit/APD-124 Muster prüfen.mjs`, Chromium und WebKit, Varianten A und B, Titel, Ort, Verlauf)

| Nr. | Handlung | Erwartet |
|---|---|---|
| APD-124/T-1 | Feld mit Text antippen | ⓧ rechts im Feld |
| APD-124/T-2 | ⓧ antippen (auch mehrzeilig, mehrere Zeilen) | sofort leer, ohne Sprechblase, Fokus bleibt |
| APD-124/T-3 | danach | an Stelle des ⓧ das Rückgängig-Icon |
| APD-124/T-4 | danach (Chromium) | der geleerte Text liegt in der Zwischenablage |
| APD-124/T-5 | Rückgängig antippen | der ganze Text ist zurück, wieder das ⓧ |
| APD-124/T-6 | leeren, ein Zeichen tippen, per Taste löschen | nach dem Tippen das ⓧ; nach dem Löschen kein Knopf (Rückgängig verfallen) |
| APD-124/T-7 | leeren, Fokus weg, wieder ins Feld | kein Knopf (APD-124/E-2) |
| APD-124/Y-1 | Gegenprobe `PRUEF_V=heute` (ui.js 4.54.0) | APD-124/T-2 bis APD-124/T-7 rot |

Ergebnis Sitzung 0095: Chromium und WebKit ‚alles in Ordnung‘; Gegenprobe rot (APD-124/T-2 Sprechblase im Verlauf, APD-124/T-3, APD-124/T-5, APD-124/T-6, APD-124/T-7).

**Am Gerät (Testfall (User) des Musters):** ob Safari die Zwischenablage beim Tipp auf ⓧ beschreiben lässt (Meldung unten auf der Seite, dann in
Notizen einsetzen), Rückgängig per Icon mit der Undo-Taste danach, Aussehen A gegen B, iPhone ohne Undo-Taste.

---

## Sitzung 0102 (08.11.2026): Muster neu auf APD-126, Wortlaut-Vorschlag

Anlass: APD-124 berührt APD-126 (Eingabefelder, kommt mit 4.57.0). Nutzer 08.11.2026: ‚Erst APD-124 klären‘, noch kein Bau.

### Muster neu

`arbeit/APD-124/index.html` jetzt auf dem Muster APD-126 (`arbeit/APD-124 Muster bauen.mjs` nimmt `arbeit/APD-126/ui.js` = Fassung 4.56.0 mit
Cursor am Ende und leer einzeilig), design.css der Fassung 4.56.0 mit ‚leer einzeilig‘, nur Variante A (APD-124/E-4), dazu ein leeres Feld
‚Wie war was?‘. Unten zeigt die Seite weiterhin, ob Safari die Zwischenablage beschreiben ließ.
Link: https://g811141a.github.io/AppDesign/arbeit/APD-124/index.html

### Testfall-Liste ergänzt (alle vier Lagen: iPad quer, iPad hoch, iPhone hoch, iPhone quer)

| Nr. | Handlung | Erwartet |
|---|---|---|
| APD-124/T-8 | mehrzeiliges Feld (Verlauf) mit ⓧ leeren | einzeilig, so hoch wie ein einzeiliges Feld (APD-126/M-4) |
| APD-124/T-9 | nach dem Leeren | Rückgängig 44 × 44, im Feld |
| APD-124/T-10 | Rückgängig antippen | ganzer Text zu sehen (Feld wächst wieder), Cursor am Ende, Fokus bleibt |

Ergebnis (08.11.2026, Sitzung 0102): Chromium und WebKit **alles in Ordnung** (T-1 bis T-10, vier Lagen). Gegenprobe `PRUEF_V=heute`
(ui.js 4.56.0): rot in T-2 bis T-8 und T-10 (Chromium 72, WebKit 60 Fehler).

### Wortlaut-Vorschlag (0 Nr. 29) – noch nicht bestätigt

**APD-124/W-1 – Regelkatalog R-5.6**

Alt:
> **ⓧ in Textfeldern (ein- und mehrzeilig):** solange ein Textfeld den Fokus hat und etwas drinsteht, rechts darin ein graues ⓧ (44 × 44, Text
> läuft nicht darunter) – mehrzeilig oben rechts auf Höhe der ersten Zeile, der Text läuft in allen Zeilen nicht darunter; Antippen: eine Zeile →
> sofort leeren; mehr als eine Zeile → Sprechblase ‚Text löschen?‘ mit ‚Löschen‘ (rot) und ‚Abbrechen‘ (R-4.3); Fokus und Tastatur bleiben, die
> App erfährt es; geleert über den Bearbeiten-Befehl, die Undo-Taste und drei Finger holen den Text zurück; rollt mit, bleibt nach dem Drehen am
> Feld; nicht in Datums- und Suchfeldern, je Feld abschaltbar (`data-noclear`) · Prüfung ablauf.mjs – `checkClear` · Gerät: Antippen, Tastatur
> bleibt, Rückgängig (Undo-Taste, drei Finger, iPhone schütteln)

Neu:
> **ⓧ in Textfeldern (ein- und mehrzeilig), Rückgängig nach dem Leeren:** solange ein Textfeld den Fokus hat und etwas drinsteht, rechts darin
> ein graues ⓧ (44 × 44, Text läuft nicht darunter) – mehrzeilig oben rechts auf Höhe der ersten Zeile, der Text läuft in allen Zeilen nicht
> darunter; Antippen leert sofort, auch mehrzeilig; Fokus und Tastatur bleiben, die App erfährt es; der geleerte Text kommt in die
> Zwischenablage; **an Stelle des ⓧ steht dann ein graues Rückgängig** (Lucide `undo-2` als Linie, 44 × 44) – Antippen holt den ganzen Text
> zurück, der Cursor steht am Ende, danach wieder das ⓧ; mit der ersten Eingabe oder wenn das Feld den Fokus verliert, verfällt es (der Text
> bleibt in der Zwischenablage); geleert und zurückgeholt über den Bearbeiten-Befehl, die Undo-Taste und drei Finger holen den Text ebenso
> zurück; rollt mit, bleibt nach dem Drehen am Feld; nicht in Datums- und Suchfeldern, je Feld abschaltbar (`data-noclear`) · Prüfung ablauf.mjs –
> `checkClear` (dazu Rückgängig, Verfallen, Zwischenablage in Chromium) · Gerät: Antippen, Tastatur bleibt, Rückgängig im Feld, Zwischenablage
> (in Notizen einsetzen), Undo-Taste, drei Finger, iPhone schütteln

**APD-124/W-2 – Designrichtlinie 15.11, Punkt ‚ⓧ zum Leeren‘ (nur die geänderten Sätze)**

Alt:
> … Antippen: eine Zeile → sofort leeren; mehr als eine Zeile → Sprechblase ‚Text löschen?‘ mit ‚Löschen‘ (rot) und ‚Abbrechen‘ (R-4.3). Fokus und
> Tastatur bleiben, die App erfährt es wie beim Löschen per Taste. Nicht in Datums- und Suchfeldern. **Technisch:** ein Knopf `.fclear` für alle
> Felder (ui.js), abschaltbar mit `data-noclear`; geleert wird über den Bearbeiten-Befehl (Text auswählen, `execCommand('delete')`) – die
> Undo-Taste der iPad-Tastatur und drei Finger holen den Text zurück (13); liefert der Befehl false, leert es über den Wert.

Neu:
> … Antippen leert sofort, auch mehrzeilig (keine Sprechblase). Fokus und Tastatur bleiben, die App erfährt es wie beim Löschen per Taste; der
> geleerte Text kommt in die Zwischenablage. **Rückgängig nach dem Leeren:** an Stelle des ⓧ steht ein graues Rückgängig (Lucide `undo-2` als
> Linie, 44 × 44, `--muted`, wächst mit der Textgröße); Antippen holt den ganzen Text zurück, das Feld wächst wieder (8), der Cursor steht am Ende,
> danach wieder das ⓧ. Mit der ersten Eingabe verfällt es (dann das ⓧ, ohne Text kein Knopf); verliert das Feld den Fokus, verschwindet es, der
> Text bleibt in der Zwischenablage. Nicht in Datums- und Suchfeldern. **Technisch:** ein Knopf `.fclear` für alle Felder (ui.js), abschaltbar mit
> `data-noclear`, mit Rückgängig Klasse `rueck`; geleert wird über den Bearbeiten-Befehl (Text auswählen, `execCommand('delete')`), zurückgeholt
> über `execCommand('insertText')` – die Undo-Taste der iPad-Tastatur und drei Finger holen den Text ebenso zurück (13); liefert ein Befehl false,
> über den Wert. Zwischenablage mit `navigator.clipboard.writeText` im Tipp (Geste des Nutzers).

**APD-124/W-3 – Designrichtlinie 16, bewusste Abweichungen**

Zeile ‚ⓧ auch in mehrzeiligen Textfeldern‘, Spalte Grund – alt:
> Wunsch des Nutzers (P-73/1, APD-81); mehr als eine Zeile erst nach der Sprechblase ‚Text löschen?‘, Rückgängig wie bei Apple über Undo-Taste,
> drei Finger, Schütteln (R-5.6)

neu:
> Wunsch des Nutzers (P-73/1, APD-81); leert sofort, sicher durch das Rückgängig im Feld (APD-124, R-5.6)

Neue Zeile:

| Was | Messwert | Grund | Entschieden |
|---|---|---|---|
| Rückgängig im Feld nach dem Leeren (Apple: das ⓧ leert nur, Rückgängig über Undo-Taste, drei Finger, Schütteln – ein solches Icon gibt es nicht) | – | Wunsch des Nutzers (APD-124): am iPhone gibt es keine Undo-Taste, Schütteln und drei Finger sind wenig bekannt; der geleerte Text bleibt zusätzlich in der Zwischenablage | 07.11.2026 |

**Unverändert:** Designrichtlinie 13 ‚Leeren und Rückgängig‘ (gilt weiter). Ob Safari die Zwischenablage beim Tipp auf ⓧ beschreiben lässt, ist
nicht gemessen – das zeigt das Muster unten an (Schritt 4 der Anleitung) und kommt als Testfall (User) in den Usertest.

### Testfälle (User) – Entwurf, kommen in den Usertest der Version

- **Rückgängig im Feld** – iPhone hoch, hell: Tag öffnen, ‚Ort‘ antippen, ⓧ antippen. Erwartet: das Feld ist leer, rechts im Feld ein graues
  Rückgängig-Icon. Rückgängig antippen. Erwartet: der Ort steht wieder da, Cursor am Ende, rechts wieder das ⓧ.
- **Mehrzeilig ohne Sprechblase** – iPad quer, hell: Verlauf mit mehreren Zeilen antippen, ⓧ antippen. Erwartet: sofort leer, keine Sprechblase,
  das Feld ist eine Zeile hoch; Rückgängig holt alle Zeilen zurück, das Feld ist wieder so hoch wie vorher.
- **Zwischenablage** – iPhone hoch, hell: Verlauf antippen, ⓧ antippen, dann in Notizen in eine Notiz tippen und ‚Einsetzen‘. Erwartet: der
  geleerte Verlauf wird eingesetzt.
- **Verfallen** – iPad quer, hell: ‚Quartier‘ antippen, ⓧ, dann ‚a‘ tippen. Erwartet: rechts das ⓧ statt Rückgängig. Fokus in ein anderes
  Feld, zurück in ein geleertes Feld: kein Knopf.

### Anleitung Muster am Gerät (offen nach 0 Nr. 6: iPad hoch und iPhone quer; dazu die Zwischenablage)

Link: https://g811141a.github.io/AppDesign/arbeit/APD-124/index.html – in Safari öffnen, nur hell.

1. iPad hoch, hell: den Link öffnen. Erwartet: Titel, Ort, Verlauf mit drei Zeilen, darunter ‚Wie war was?‘ leer, eine Zeile hoch, der Platzhalter
   abgeschnitten.
2. In ‚Ort‘ vorn auf den ersten Buchstaben tippen, dann rechts im Feld auf ⓧ. Erwartet: zuerst steht der Cursor am Ende; nach ⓧ ist das Feld leer,
   rechts darin ein graues Rückgängig-Icon (Pfeil zurück als Linie), die Tastatur bleibt offen.
3. Rückgängig antippen. Erwartet: ‚Cairns, Australien‘ steht wieder da, der Cursor am Ende, rechts wieder das ⓧ.
4. In den Verlauf tippen, dann ⓧ. Erwartet: sofort leer, keine Sprechblase, das Feld ist eine Zeile hoch; unten auf der Seite
   ‚Zwischenablage: 65 Zeichen kopiert‘ (oder ‚Zwischenablage abgelehnt: …‘ – dann bitte den Text der Meldung nennen).
5. Rückgängig antippen. Erwartet: alle drei Zeilen sind zurück, das Feld ist wieder drei Zeilen hoch.
6. Noch einmal ⓧ im Verlauf, dann ‚a‘ tippen. Erwartet: rechts steht das ⓧ statt Rückgängig.
7. Zu Notizen wechseln, in eine Notiz tippen, ‚Einsetzen‘. Erwartet: die drei Zeilen des Verlaufs werden eingesetzt. Danach die Notiz wieder
   leeren.
8. iPhone quer, hell: die Schritte 1 bis 6 wiederholen. Erwartet: wie oben; das Rückgängig-Icon ist ganz zu sehen und nicht vom Rand abgeschnitten.
