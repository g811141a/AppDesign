# APD-30 Wischaktionen – Testfall-Liste

**Stand 15.11.2026** · Sitzung Reiselogbuch 0117 · **bestätigt (Nutzer 15.11.2026, mit D-1 bis D-11)** · Muster `arbeit/APD-30 Wischaktionen Muster.html` (Variante D ‚Kapsel mit Wort‘, bestätigt
15.11.2026, Sitzung 0116) · Apple-Abgleich `arbeit/APD-30 Wischaktionen Muster und Apple-Abgleich.md`
(Zusammenarbeit 0 Nr. 1: jeder Fall wird ein Testfall (automatisch) mit fester Prüfung; was nur das Gerät zeigt, kommt in den Usertest)

## Was gebaut wird (aus Klärung und Muster)

- Wischen nach links auf einer Kachel der zentralen Liste (15.4, am iPhone die Startliste) zeigt daneben zwei Kapseln 66 × 44 mit Wort
  darunter: ‚Einstellen‘ (settings) und ‚Löschen‘ (trash, rot) – dieselben Aktionen wie im Kontextmenü.
- Offen 162 px; bleibt offen ab halber Aktionsbreite (81 px), sonst federt die Kachel zurück; Durchwischen ab 60 % der Kachelbreite löst
  ‚Löschen‘ aus. Beim Zurückwischen werden die Kapseln kleiner (100 % → 50 %) und blasser (100 % → 0 %).
- ‚Löschen‘ fragt immer mit der Sprechblase (R-4.12), auch beim Durchwischen. Die Abfrage graut die Umgebung ein (Schwarz 20 %) und
  sperrt sie – daneben tippen ändert nichts.
- Das Kontextmenü (langes Drücken) bleibt unverändert.

## Annahmen für die Fälle – bestätigt (Nutzer 15.11.2026)

Im Muster nicht gezeigt, im Code bzw. in den Regeln gelesen (Sitzung 0117); jede ist meine Empfehlung.

| Nr. | Annahme | Grund |
|---|---|---|
| D-1 | **Gemeinsamer Baustein in AppDesign** (`ui.js`), die App nennt nur die Aktionen – dieselbe Liste wie für das Kontextmenü | 0 Nr. 10; Wischen und Kontextmenü können nie auseinanderlaufen |
| D-2 | **Entscheidung der Geste wie R-7.5:** nach 10 px, deutlich waagrecht (mehr als 1,2 × senkrecht), nach links; sonst gehört die Bewegung dem Rollen (Muster: 8 px, 1 ×) | ein Wert für alle Gesten (`NAV_ENTSCHEID`, `NAV_WAAGRECHT` in `ui.js`) |
| D-3 | **Höchstens eine Kachel offen.** Sie schließt bei: Tippen auf die Kachel oder daneben, Rollen der Liste, Wischen an einer anderen Kachel, Neuaufbau der Liste (Abgleich, Suche, Speichern), Drehen, Seitenleiste ausblenden, Esc. Das schließende Tippen löst sonst nichts aus | wie Mail und Notizen im Muster (Tippen schließt); nichts bleibt versteckt offen |
| D-4 | **Wischen nach rechts** bewegt eine geschlossene Kachel nicht; eine offene folgt dem Finger zurück | Muster Schritt 5 (iPhone) |
| D-5 | **Kapseln deckend wie im Muster,** kein Glas – R-3.9 bleibt unverändert | hinter den Kapseln läuft kein Inhalt durch, Glas hätte keine sichtbare Wirkung |
| D-6 | **Sprechblase wächst aus der roten Kapsel** (R-4.13) und steht ganz im Bild (R-4.5); die Kachel bleibt offen, bis entschieden ist; ‚Abbrechen‘ → Kachel gleitet zurück | Muster |
| D-7 | **VoiceOver und Tastatur:** die Kapseln sind bei geschlossener Kachel nicht erreichbar (weder Fokus noch VoiceOver); die Aktionen bleiben über das Kontextmenü erreichbar (R-1.8). Bei offener Kachel sind sie Schaltflächen mit Namen ‚Reiselogbuch einstellen‘ / ‚Reiselogbuch löschen‘ | im Web gibt es keine VoiceOver-Aktionen am Element wie bei Apple (Abweichung, in 16 zu nennen) |
| D-8 | **‚Bewegung reduzieren‘:** die Kachel folgt weiter dem Finger; Einrasten, Zurückfedern und Schließen ohne Gleiten; die Kapseln blenden nur (keine Größenänderung) | wie R-7.5 ‚überblendet‘ |
| D-9 | **Textgröße:** das Wort unter der Kapsel wächst mit; die offene Breite wächst so weit mit, dass kein Wort abgeschnitten wird; die Kapsel bleibt mindestens 66 × 44 | R-3.1, kein abgeschnittener Text |
| D-10 | **Messmodus (15.21)** zeichnet die Entscheidungen auf: ‚wisch kandidat‘, ‚wisch verworfen‘, ‚wisch offen‘, ‚wisch durch‘, ‚wisch zurück gefedert‘, ‚wisch abgebrochen‘ | Wischgefühl zeigt nur das Gerät (0 Nr. 20), wie ‚nav …‘ seit 4.30.1 |
| D-11 | **Nur Kacheln mit Kontextmenü** lassen sich wischen – nicht Abschnittsköpfe, Backup-Kachel, Offline-Zeile, leerer Zustand, Suchzeile, Kopf | dort gibt es keine Aktionen |

## Testfall-Liste (Testfälle automatisch)

Ansichten, wenn nicht anders genannt: iPad quer 1180 × 820, iPad hoch 820 × 1180, iPhone hoch 390 × 844, iPhone quer 844 × 390; hell und
dunkel; Chromium und WebKit. Nach jeder Handlung gelten die Grundregeln (`pruefe.mjs`).

### 1. Öffnen und Schließen

| Nr. | Fall | Erwartet |
|---|---|---|
| W-1 | Kachel 100 px nach links wischen, loslassen | rastet bei 162 px ein; zwei Kapseln je mindestens 66 × 44 neben der Kachel, darunter ‚Einstellen‘ und ‚Löschen‘; nichts ragt aus Seitenleiste bzw. Bild; der Titel bleibt teilweise sichtbar |
| W-2 | Kachel 60 px nach links wischen, loslassen | federt zurück, keine Kapsel sichtbar, nichts geöffnet |
| W-3 | Reihenfolge und Aussehen bei offener Kachel | links ‚Einstellen‘ (Symbol settings, nicht rot), rechts außen ‚Löschen‘ (Symbol trash, rot); Rot nur an ‚Löschen‘ (R-3.3) |
| W-4 | Auf die offene Kachel tippen | gleitet zurück; das Reiselogbuch wird nicht geöffnet, am iPad bleibt der gewählte Eintrag |
| W-5 | Bei offener Kachel daneben tippen (Kopf, leere Fläche, andere Kachel, Inhalt am iPad) | Kachel schließt; das Tippen löst nichts weiter aus |
| W-6 | Kachel 1 offen, Kachel 2 nach links wischen | Kachel 1 schließt, Kachel 2 öffnet – nie zwei offen |
| W-7 | Offene Kachel 100 px nach rechts wischen | folgt dem Finger und schließt; auf halbem Weg Kapseln 75 % groß und 50 % deckend, geschlossen nicht mehr sichtbar |
| W-8 | Geschlossene Kachel nach rechts wischen | bewegt sich nicht; am iPad (Seitenleiste sichtbar) und in der iPhone-Startliste geschieht nichts |
| W-9 | Nach jedem Wischen (W-1, W-2, W-7) | kein Antippen: kein Reiselogbuch geöffnet, kein Menü, keine Kachel ‚gedrückt‘ (R-7.5 ‚Wischen tippt nie an‘) |
| W-10 | Gewählte (blaue) Kachel am iPad wischen | wie W-1; die Kachel bleibt blau, der Inhalt daneben unverändert |
| W-11 | Esc bzw. ⌘. bei offener Kachel (Hardware-Tastatur) | Kachel schließt (R-4.7), sonst ändert sich nichts |

### 2. Aktionen

| Nr. | Fall | Erwartet |
|---|---|---|
| W-12 | ‚Einstellen‘ antippen | Fenster ‚Reiselogbuch einstellen‘ für genau dieses Reiselogbuch (derselbe Weg wie im Kontextmenü); die Kachel ist geschlossen; nach x liegt der Fokus wieder auf der Kachel |
| W-13 | ‚Löschen‘ antippen | Sprechblase ‚‚<Titel>‘ mit allen Einträgen löschen? …‘ wächst aus der roten Kapsel, ganz im Bild (R-4.5, R-4.13); Speicher unverändert (R-4.12) |
| W-14 | W-13, dann ‚Abbrechen‘ | Sprechblase zu, Kachel gleitet zurück, Speicher unverändert, Fokus auf der Kachel |
| W-15 | W-13, dann ‚Reiselogbuch löschen‘ | erst jetzt ist das Reiselogbuch aus Speicher und Liste entfernt; Anzahl im Kopf stimmt; am iPad zeigt der Inhalt dasselbe wie nach dem Löschen über das Kontextmenü |
| W-16 | Kachel über 60 % ihrer Breite nach links ziehen, halten | die rote Kapsel wird breit, ‚Einstellen‘ weicht; noch keine Sprechblase |
| W-17 | W-16, loslassen | Sprechblase wie W-13; bis zur Bestätigung nichts gelöscht |
| W-18 | W-16, vor dem Loslassen unter 60 % zurückziehen, loslassen | keine Sprechblase; Kachel bleibt offen (über 81 px) bzw. federt zurück (darunter) |
| W-19 | W-17, dann Esc | = ‚Abbrechen‘ (R-4.7): Kachel zurück, Speicher unverändert |
| W-20 | Aktionen im Kontextmenü und beim Wischen vergleichen | gleiche Anzahl, gleiche Reihenfolge, gleiche Wirkung; ‚Reiselogbuch löschen‘ über beide Wege zeigt denselben Text der Sprechblase |
| W-21 | `checkErstFragen` (R-4.12) findet die rote Kapsel | wird angetippt, Speicher vorher = nachher bis zur Bestätigung – in jeder Ansicht |

### 3. Abfrage graut ein und sperrt

| Nr. | Fall | Erwartet |
|---|---|---|
| W-22 | Sprechblase aus W-13 offen | alles außer Sprechblase und offener Kachel ist eingegraut (Schwarz 20 %), auch Inhalt, Kopfzeile und Backup-Kachel |
| W-23 | Daneben tippen: andere Kachel, Kopf, Inhalt, Rand | nichts geschieht – Sprechblase bleibt, nichts geöffnet, Speicher unverändert |
| W-24 | Bei offener Sprechblase in der Liste und im Inhalt wischen (senkrecht, waagrecht) | nichts rollt, keine Kachel bewegt sich, keine Seitenleiste, kein Zurück |
| W-25 | Sprechblase zu (beide Wege) | das Grau ist weg, nichts bleibt gesperrt (Grundregel ‚bleibt nach dem Schließen gesperrt‘) |

Gilt die eingegraute, sperrende Sprechblase für **alle** Abfragen (Frage beim Wortlaut), laufen W-22 bis W-25 für jede Sprechblase der App
(`checkErstFragen`, ‚Änderungen verwerfen‘, Abgleich `choosePop`), und der Fall ‚daneben tippen bricht ab‘ entfällt überall.

### 4. Vorrang der Gesten

| Nr. | Fall | Erwartet |
|---|---|---|
| W-26 | Auf einer Kachel senkrecht wischen (viele Einträge) | Liste rollt, keine Kachel bewegt sich seitlich |
| W-27 | Schräg wischen: 30 px nach links, 40 px nach unten | gilt als Rollen – keine Kachel öffnet |
| W-28 | Schräg wischen: 40 px nach links, 20 px nach unten | gilt als Wischen – Kachel folgt, Liste rollt nicht (auch im Safari-Modell: `touchmove` verhindert das Rollen) |
| W-29 | Liste rollen, während eine Kachel offen ist | Kachel schließt |
| W-30 | Kachel 0,6 s drücken, ohne zu wischen | Kontextmenü wie bisher (R-4.2), Kachel nicht verschoben |
| W-31 | Kachel 30 px wischen, dann 1 s halten | kein Kontextmenü, Kachel nicht angehoben |
| W-32 | Kontextmenü offen, dann auf einer Kachel wischen | keine Kachel bewegt sich (wie R-7.5: nicht bei offenem Menü, Fenster, offener Sprechblase) |
| W-33 | iPad, Seitenleiste ausgeblendet: im Inhalt nach rechts wischen | Seitenleiste kommt herein wie bisher (R-7.5); alle Kacheln geschlossen |
| W-34 | iPad, Seitenleiste sichtbar: auf einer Kachel nach links wischen | Kachel öffnet, die Seitenleiste bleibt stehen |
| W-35 | iPhone, Reiselogbuch offen: im Inhalt nach rechts zurückwischen | Zurück wie bisher (R-7.5); in der Startliste danach alle Kacheln geschlossen |
| W-36 | iPhone, Startliste: Kachel offen, vom linken Rand nach rechts wischen | Kachel schließt, sonst nichts |
| W-37 | Wischen beginnt auf Abschnittskopf, Backup-Kachel, Offline-Zeile, leerem Zustand, Kopf, Suchzeile | nichts bewegt sich seitlich |
| W-38 | Kachel, die teilweise hinter der Backup-Kachel liegt, am sichtbaren Teil wischen | öffnet; Kachel und Kapseln laufen hinter der Backup-Kachel durch, nichts liegt darüber |
| W-39 | Während des Wischens zweiter Finger bzw. `pointercancel` | Kachel federt in den Zustand vor der Geste, nichts ausgelöst |
| W-40 | Während des Wischens drehen | Geste bricht ab, Kachel geschlossen (wie R-7.5, R-8.1) |

### 5. Zustände der App

| Nr. | Fall | Erwartet |
|---|---|---|
| W-41 | Kachel offen, dann drehen | Kachel geschlossen; Seitenleiste, oberster Eintrag und Auswahl wie vorher (R-8.1) |
| W-42 | Kachel offen, dann panel-left (iPad) | Seitenleiste gleitet hinaus; beim Einblenden sind alle Kacheln geschlossen |
| W-43 | Kachel offen, dann Mehr-Menü oder plus im Kopf antippen | Kachel schließt, das Tippen öffnet in diesem Fall das Menü bzw. Fenster **nicht** (D-3: schließendes Tippen löst nichts aus) |
| W-44 | Suche in der Liste offen, Treffer-Kachel wischen | wie W-1, W-12, W-15; nach dem Löschen stimmt ‚N von M Reiselogbüchern‘; die Tastatur schließt zuerst (R-7.5) |
| W-45 | Suchbegriff ändern, während eine Kachel offen ist | Liste neu, alle Kacheln geschlossen |
| W-46 | Abgleich bzw. ‚Backup laden‘ baut die Liste neu, während eine Kachel offen ist | alle Kacheln geschlossen, Position der Liste bleibt (R-7.1) |
| W-47 | Letztes Reiselogbuch über Wischen löschen | leerer Zustand (R-7.7) wie nach dem Löschen über das Kontextmenü |
| W-48 | Fenster bzw. Blatt offen (z. B. ‚Reiselogbuch einstellen‘) | Kacheln dahinter lassen sich nicht wischen |
| W-49 | Offline-Zeile sichtbar, mit und ohne Backup-Kachel | Wischen wie W-1; unterste Kachel ganz bedienbar |

### 6. Daten

| Nr. | Fall | Erwartet |
|---|---|---|
| W-50 | Kein Reiselogbuch | nichts zu wischen, keine Kapsel im Dokument erreichbar |
| W-51 | Ein Reiselogbuch | wie W-1; Sprechblase ganz im Bild |
| W-52 | Viele (30) Reiselogbücher mit Abschnittsköpfen: oberste, mittlere, unterste Kachel | wie W-1 und W-13; die Sprechblase der untersten steht ganz im Bild und über der Backup-Kachel |
| W-53 | Sehr langer Titel (80 Zeichen), mit Zeile ‚geändert am …‘ | Kachel behält Höhe und Kürzung; Kapseln mittig zur Kachel, Wörter nicht abgeschnitten |
| W-54 | Schmalstes iPhone (320 × 568) | offen ragt nichts aus dem Bild; von der Kachel bleibt etwas sichtbar; Sprechblase ganz im Bild |

### 7. Darstellung und Bedienungshilfen

| Nr. | Fall | Erwartet |
|---|---|---|
| W-55 | Dunkel | Farben aus den Variablen der Richtlinie (2): rote Kapsel wie rote Schaltflächen, ‚Einstellen‘ wie runde Schaltflächen, Wörter lesbar (Kontrast wie `hig.mjs`); Abdunkelung der Abfrage sichtbar |
| W-56 | Schalter ‚Glas‘ ein und aus | Kapseln in beiden Fällen deckend (D-5); `masseStile` (R-3.9) unverändert grün |
| W-57 | Textgröße größte Stufe | Wörter wachsen mit, nichts abgeschnitten oder überlappt; Antippflächen mindestens 66 × 44; offene Kachel ragt nicht aus dem Bild (D-9) |
| W-58 | ‚Bewegung reduzieren‘ | Kachel folgt dem Finger; Einrasten, Zurückfedern, Schließen ohne Gleiten (keine laufende Bewegung nach dem Loslassen); Kapseln ohne Größenänderung (D-8) |
| W-59 | VoiceOver-Baum bei geschlossener Kachel | Kapseln weder im Fokus-Umlauf noch im Baum (`inert` bzw. `aria-hidden`); die Kachel bleibt eine Schaltfläche mit ihrem Namen (R-1.8) |
| W-60 | VoiceOver-Baum bei offener Kachel | zwei Schaltflächen ‚Reiselogbuch einstellen‘ und ‚Reiselogbuch löschen‘, Icons `aria-hidden`; Tab erreicht sie in dieser Reihenfolge |
| W-61 | Antippflächen (R-3.1) | jede Kapsel mindestens 44 × 44, Abstand zwischen beiden mindestens 8 px |
| W-62 | Bewegung je Bild | nur `transform` und `opacity` an Kachel und Kapseln, keine Bildlücken über der Grenze von `checkNavigation` (APD-59) |

### 8. Kontextmenü bleibt, Safari, Messung

| Nr. | Fall | Erwartet |
|---|---|---|
| W-63 | Alle bisherigen Prüfungen zum Kontextmenü (`kontextmenue-regeln`, `ablauf-seitenleiste-kontextmenue`, `ablauf-seitenleiste-position`) | unverändert grün – Lage, Inhalt, blau getönte Kachel |
| W-64 | Kachel im Dokument | die Kachel ist weiter eine Schaltfläche (`.side-row`), Kapseln liegen daneben, nie darin (keine Schaltfläche in einer Schaltfläche) |
| W-65 | Safari-Modell (`safari.mjs`): Wischen mit Berührung statt Maus, einzeln und mit Gummiband am Listenende | wie W-1, W-2, W-17, W-26; Safari nimmt dem Finger die Geste nicht weg (kein `pointercancel` nach der Entscheidung) |
| W-66 | Maus bzw. Trackpad am iPad: Kachel mit gedrückter Taste ziehen | wie W-1; Zeiger über einer Kapsel zeigt keinen anderen Zustand als andere Schaltflächen |
| W-67 | Messmodus an, W-1, W-2, W-17, W-39 | Messung enthält ‚wisch offen‘, ‚wisch zurück gefedert‘, ‚wisch durch‘, ‚wisch abgebrochen‘ mit Weg (D-10); `abspielen.mjs` spielt sie nach |
| W-68 | Gegenprobe: Schwelle ‚Durchwischen‘ absichtlich auf 20 % | W-1 wird rot (Sprechblase statt offener Kachel) |
| W-69 | Gegenprobe: Sperre der Abfrage entfernt | W-23 wird rot |
| W-70 | Gegenprobe: Kapseln bei geschlossener Kachel erreichbar | W-59 wird rot |
| W-71 | Doku: 15.4, Katalog (neue Regel), 16 ‚Bewusste Abweichungen‘ (Durchwischen fragt; keine VoiceOver-Aktionen) | `doku.mjs` – `checkCatalog` grün |

## Usertest – was nur das Gerät zeigt (Testfälle (User), mit /0 ‚Version prüfen‘)

| Fall | iPad | iPhone |
|---|---|---|
| Wischgefühl: Kachel folgt dem Finger ohne Ruckeln, rastet weich ein | quer, hoch | hoch, quer |
| Rollen gegen Wischen: senkrecht rollt, schräg entscheidet sich eindeutig | ja | ja |
| Durchwischen: rote Kapsel wird breit, Sprechblase fragt, eingegraut, daneben tippen ändert nichts | ja | ja |
| Zurückwischen: Kapseln werden kleiner und blasser | ja | ja |
| Hereinwischen der Seitenleiste und Zurückwischen im Inhalt wie bisher | ja | ja |
| Kontextmenü (langes Drücken) wie bisher | ja | ja |
| VoiceOver: Kacheln einzeln ansagbar, Kontextmenü erreichbar | ja | ja |
| ‚Bewegung reduzieren‘, größte Textgröße, dunkel | ja | ja |

## Prüfungen (Vorschlag)

- **AppDesign:** neu `checkWischen` in `tests/ablauf.mjs` (W-1 bis W-62, je Ansicht), Erweiterung `checkErstFragen` (W-21),
  `checkNavigation` (W-33 bis W-36), `hig.mjs` (W-55 bis W-57, W-61), `safari.mjs` (W-65), Gegenproben W-68 bis W-70.
- **Reiselogbuch:** neu `tests/ablauf-wischen.mjs` (ruft `checkWischen` in allen Ansichten, dazu W-44 bis W-49, W-52 bis W-54 mit den
  Daten der App); bestehende Prüfungen zum Kontextmenü unverändert (W-63).
- Prüflauf der Version: **voll** (Code in AppDesign und App geändert).
