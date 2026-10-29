# APD-77 ‚Messung starten‘ verstecken · RLB-103 `ablauf-tastatur-still` – Testfall-Liste

**Stand 26.10.2026** · Sitzung Reiselogbuch 0048 · Entscheidungen des Nutzers vom 26.10.2026 (Backlog APD-77) · gebaut wird erst nach
einem Ja (Zusammenarbeit 0 Nr. 21). Geplante Versionen: **AppDesign 4.38.0**, **Reiselogbuch 3.36.0**.

---

## 1. APD-77 – Was sich ändert (allgemein, R-1.6 und 15.21)

- Im Mehr-Menü der Seitenleiste bzw. Startliste steht ‚Messung starten‘ **nicht mehr ständig** (samt Abstand davor).
- **Langes Drücken** (etwa 0,5 s, wie Apples langes Drücken) auf die graue Versionszeile schaltet den Punkt frei: das Menü bleibt
  offen, ‚Messung starten‘ (grau ‚Für Claude: Bewegungen aufzeichnen‘) erscheint sofort an der heutigen Stelle (nach Backup, durch
  Abstand getrennt, über dem Strich); das Menü bleibt an seiner Schaltfläche und ganz sichtbar (R-8.1).
- Die Freischaltung gilt **bis zum Neustart** (neu laden oder App schließen versteckt den Punkt wieder); nichts wird gespeichert.
- **Läuft oder lief eine Messung** (noch nicht geteilt), steht ‚Messung beenden und teilen‘ immer da – auch ohne Freischaltung.
- Langes Drücken auf die Versionszeile wählt keinen Text aus und zeigt keine Lupe bzw. kein Safari-Menü
  (`-webkit-touch-callout: none`, `user-select: none`); kurzes Tippen tut nichts (das Menü bleibt offen).
- Schnittstelle: `messungMenuItems(opt)` liefert ohne Freischaltung und ohne Messung nichts; die Versionszeile bekommt die
  Freischaltung über ein neues Merkmal des Eintrags `{ note, halten }` (ui.js, Menü). Die App ändert nur die Zeile mit der Version.

## 2. APD-77 – Testfälle (automatisch), neu bzw. geändert in `checkMessung` (ablauf.mjs)

| Nr. | Gerät × Lage | Handlung | Erwartet |
|---|---|---|---|
| F-1 | iPhone hoch, iPad quer | Mehr-Menü öffnen (frisch geladen) | kein Eintrag ‚Messung …‘, kein doppelter Abstand bzw. Strich; Backup-Einträge und Versionszeile wie bisher |
| F-2 | iPhone hoch, iPad quer | kurz (100 ms) auf die Versionszeile tippen | Menü offen, weiter kein ‚Messung starten‘ |
| F-3 | iPhone hoch, iPad quer | 600 ms auf die Versionszeile drücken (Touch) | Menü offen, ‚Messung starten‘ mit grauer Zeile und Icon an der heutigen Stelle; Menü ganz sichtbar, an der Schaltfläche (R-8.1) |
| F-4 | iPhone hoch | 300 ms drücken, dabei 20 px wegziehen | keine Freischaltung (wie Apple: Bewegen bricht langes Drücken ab) |
| F-5 | iPhone hoch | Menü schließen und neu öffnen | ‚Messung starten‘ weiter da |
| F-6 | iPhone hoch | neu laden, Menü öffnen | ‚Messung starten‘ wieder weg |
| F-7 | iPhone hoch | freischalten, Messung starten, neu öffnen, Messung beenden und teilen | Ablauf F1–F12 aus APD-27 wie bisher (Zeilen, Ruhe, keine Texte, Grenze, Datei) |
| F-8 | iPhone hoch | Messung starten, Menü schließen, Freischaltung künstlich zurücksetzen, Menü öffnen | ‚Messung beenden und teilen‘ steht da |
| F-9 | WebKit iPhone hoch | 600 ms drücken | keine Textauswahl (`getSelection()` leer), kein `contextmenu` |
| F-10 | alle Lagen | nach jeder Handlung | Grundregeln (`pruefe.mjs`), Leisten bewegen sich nicht (APD-27 F12) |

Gegenprobe: `--gegenprobe` mit dem alten Menü (Punkt ständig da) → F-1 rot; ohne `halten` → F-3 rot.

App-Prüfungen, die heute ‚Messung starten‘ im Menü erwarten, werden angepasst: `ablauf-gesamt.mjs` (Menü ohne den Punkt),
`ablauf-messung.mjs` (erst freischalten, dann starten). Die Prüfungen, die `messStart()` direkt rufen, bleiben.

**Gebaut 29.10.2026 (AppDesign 4.40.0, Reiselogbuch 3.38.0, Sitzung 0052):** wie oben; langes Drücken ist das gemeinsame von R-3.5
(`onLongPress`, 0,6 s statt ‚etwa 0,5 s‘ – überall gleich lang), die Prüfung drückt 0,9 s. Die Freischaltung ist `messFrei` in ui.js;
`messungMenuItems` liefert bis dahin einen Platzhalter `{ messPlatz }` (das Menü merkt sich so die Angaben der App); ein Abstand ohne
Eintrag danach entfällt im Menü (`menuHtml`). Gegenprobe: `messFrei` von Anfang an an → F-1, F-2, F-4 rot.

## 3. RLB-103 – Ursache und Änderung

- **Ursache (nachgestellt 26.10.2026):** `ablauf-tastatur-still` spielt alle Messungen aus `tests/messungen/` nach. Jede Messung endet
  mit ‚tippen sideMore‘ und ‚tippen button‘ – dem Beenden der Messung im Mehr-Menü. Für die drei älteren Messungen schneidet eine feste
  Zeitgrenze (`BIS`) das Ende ab; für die drei neuen (22.10. Ränder hoch und quer, 24.10. Blatt) fehlt sie: ‚tippen button‘ wird
  auf die Zeile der Reise abgebildet, darüber liegt das offene Mehr-Menü – Abbruch nach 30 s.
- **Änderung (allgemein, `abspielen.mjs`):** `spieleAb` erkennt das Beenden der Messung selbst und spielt es nicht nach – die
  letzten beiden Handlungen ‚tippen <Schaltfläche des Mehr-Menüs>‘ und ‚tippen button‘ am Ende der Datei. Ab 4.38.0 schreibt die
  Messung beim Beenden zusätzlich die Zeile ‚! messung beendet‘ (eindeutig für künftige Messungen). Die festen Zeitgrenzen bleiben
  nur, wo sie mehr abschneiden als das Ende.
- **Voller Lauf:** `ablauf-tastatur-still` kommt in die Liste von `tests/alle.mjs` (Reiselogbuch).
- **Befund des Versuchs (26.10.2026, nur Chromium, Zeitgrenzen für die drei neuen Messungen von Hand gesetzt):** kein Abbruch mehr,
  aber 17 Fehler, die der Abbruch bisher verdeckt hat:
  - iPhone quer, Fenster eines Tages, ‚Ort‘ antippen bzw. zu ‚Quartier‘ wechseln bzw. Tastatur schließen (hell und dunkel): Kopfzeile
    und Fensterkopf springen in 1–2 Bildern um 23–70 px und stehen danach wieder richtig (R-4.5, APD-36/T-1, APD-36/T-2, APD-36/T-4, APD-36/T-5);
  - Messung 19.10. iPhone quer (‚tippen fPlace‘, ‚tippen dlgOk‘): Kopf- und Suchzeile springen in 2 Bildern (APD-36/T-8);
  - Messung 24.10. Blatt: ein zweites ‚tippen -‘ (Ziel ohne id) hat keine Abbildung in `ziele`.
  **Am Gerät steht der Kopf still (Nutzer 26.10.2026)** → Abweichung des Safari-Modells; RLB-103 ist hinter APD-77 zurückgestellt.
  **Eingrenzung (26.10.2026):** derselbe Fall allein (iPhone quer, hell, ‚Ort‘ → ‚Quartier‘ → Tastatur zu) in Chromium **und** WebKit
  gleich rot (6 Fehler). Gegen ältere App-Stände mit den heutigen Prüfwerkzeugen: 3.26.2 bis 3.28.2 kein Springen (nur ‚Feld nicht
  ganz über der Tastatur‘), **ab 3.30.0 (Blatt am iPhone, Usertest P-68) springt es** – P-68/3 (Tastatur im Blatt, auch quer) war am Gerät
  ok, der Nutzer sieht auch heute nichts springen. Ursache im Modell (`safari.mjs`): Safari verschiebt den sichtbaren Bereich sofort
  (quer `fokusSchub` 21 px plus `zumFeld`), meldet es aber erst 2 Bilder später (`melde`) – die App gleicht erst nach der Meldung
  aus, dazwischen stehen Kopf und Fensterkopf 1–2 Bilder falsch. Die Messung vom 19.10. (quer, Fenster vor dem Blatt) zeigt Meldung
  ‚vv resize‘ und ‚scroll‘ 2 ms nacheinander, ob Safari vorher schon verschoben zeichnet, sieht man in ihr nicht. Eine Messung des
  Blatts quer gibt es nicht. **Vorschlag (0 Nr. 20):** zuerst eine Messung am Gerät (iPhone quer, Tag öffnen, ‚Ort‘, ‚Quartier‘,
  Tastatur zu), dann das Modell danach ausrichten und die Messung in `tests/messungen/` aufnehmen.

- **Messung am Gerät (26.10.2026, 08:57, iPhone quer, Blatt, Reiselogbuch 3.35.0 · AppDesign 4.37.0)** – abgelegt als
  `arbeit/RLB-103 Messung 2026-10-26 iPhone quer Blatt Ort Quartier.txt`, kommt beim Bau nach `tests/messungen/`:
  - **‚Ort‘ antippen** (Zeile 520 ff.): Tastatur auf (sichtbare Höhe 402 → 126), Safari **verschiebt nichts** (offsetTop 0, scrollY 0) –
    das Modell schiebt quer um 21 px (`fokusSchub`) und mit `zumFeld` → Kopf −31 px. **Modell:** im Blatt (Feld über der Tastatur) kein Schub.
  - **zu ‚Quartier‘ wechseln** (Zeile 532 ff.): das Feld lag unter der Tastatur (Antippen bei y = 125, Tastatur ab 126); Safari
    verschiebt um 167 px und **meldet es im selben Augenblick** (‚scroll‘ und ‚vv scroll‘ bei 31711 ms); 3 ms später steht der Kopf
    wieder bei 0 – kein Bild dazwischen. Das Modell meldet 2 Bilder später → Kopf 1–2 Bilder falsch. **Modell:** Meldung im selben Bild.
  - **Tastatur zu** (Zeile 541 ff.): ‚vv resize‘ (Höhe 402, offsetTop noch 167), 6 ms später ‚scroll‘ und ‚vv scroll‘ (0) – kein Bild
    dazwischen, nichts springt sichtbar. **Modell:** ebenso im selben Bild.
  - Die Messung endet ohne ‚tippen sideMore‘ + ‚tippen button‘ (der Nutzer beendete sie über ‚…‘, die Zeile davor ist ‚focus sideMore‘):
    die Erkennung des Endes darf sich nicht darauf verlassen – sie schneidet nur ab, was da ist; ab 4.38.0 eindeutig mit
    ‚! messung beendet‘.
  - **Folge:** Das Springen in der Prüfung ist eine Abweichung des Modells (Nutzer: am Gerät steht alles still). Änderung in
    `safari.mjs` nach dieser Messung; die früheren Annahmen (‚2 Bilder später‘, Schub 21 px) gelten nur noch, wo eine Messung sie
    zeigt (19.10., Fenster vor dem Blatt) – beim Bau prüfen, dass `ablauf-abspielen` und die übrigen Abläufe grün bleiben.

## 4. RLB-103 – Testfälle (automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| F-11 | alle 6 Messungen nachspielen (`ablauf-tastatur-still`, Chromium und WebKit) | grün, kein Abbruch; die Ränder-Messungen ohne Schritte nach dem Start |
| F-12 | `abspielen`-Selbstprüfung: Messung mit ‚tippen sideMore‘ + ‚tippen button‘ am Ende | beide Schritte nicht nachgespielt |
| F-13 | dasselbe mitten in der Messung (Menü öffnen, Backup erstellen, weiter) | wird nachgespielt (nur das Ende fällt weg) |
| F-14 | Messung mit ‚! messung beendet‘ | Ende genau dort |
| F-15 | Gegenprobe: Erkennung ausgeschaltet | F-11 rot (wie heute) |
| F-17 | neue Messung 26.10. nachspielen (Safari meldet wie gemessen) | Kopf und Fensterkopf in jedem Bild still, Felder wie gemessen |
| F-18 | Modell ohne die Messung: iPhone quer, Blatt, ‚Ort‘ → ‚Quartier‘ → Tastatur zu (hell und dunkel) | kein Springen, Feld ganz über der Tastatur |
| F-16 | `node tests/alle.mjs` | `ablauf-tastatur-still` steht in der Liste und läuft im vollen Lauf mit |

## 5. Testfälle (User) – Vorschlag für den Usertest

- /0 Version prüfen (Reiselogbuch 3.36.0 · AppDesign 4.38.0).
- /1 iPhone hoch: Mehr-Menü ohne ‚Messung starten‘; Versionszeile lang drücken → Punkt erscheint, Menü bleibt offen, kein Text markiert.
- /2 iPad quer: dasselbe in der Seitenleiste.
- /3 App ganz schließen und neu öffnen → Punkt wieder weg.

RLB-103 betrifft nur die Prüfungen – kein Testfall (User).
