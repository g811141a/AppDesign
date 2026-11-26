# RLB-126 ‚Zuletzt gelöscht‘ – Muster, Testfall-Liste, Wortlaut

**26.11.2026, Sitzung Reiselogbuch 0165** · Grundlage: Entscheidungen RLB-126/J-1 bis J-6 (`0164 RLB-126 Apple-Abgleich.md`), Aufteilung
(`0164 RLB-126 AD-Bean recentlydeleted Aufteilung.md`), Plan (`0164 RLB-126 Plan Muster.md`).

## 1. Bericht

Das Muster ist eine Kopie des Reiselogbuchs 3.58.5 mit AppDesign-Fassung 4.70.2 und eigenen Beispieldaten (`reiselogbuch.muster-rlb126`, nie deine
echten Daten, ohne Service Worker). Löschen geht jetzt ohne Abfrage (J-2) nach ‚Zuletzt gelöscht‘ am Ende der Seitenleiste. Ein gelöschtes Reiselogbuch
öffnet nur zum Lesen mit Hinweis und ‚Wiederherstellen‘ (J-3), die Zeile zeigt ‚noch N Tage‘ (J-4). Nur ‚Endgültig löschen‘ fragt noch.
Das Muster lief vorher im Safari-Modell in Chromium und WebKit (iPad quer hell, dazu iPhone hoch als Stichprobe): alle Schritte unten grün, die Grundregeln
nach jedem Schritt grün. Ein WebKit-Lauf meldete einmal die Antippfläche der Abfrage-Schaltflächen (283 × 44 px, während die Sprechblase aufgeht). Der
zweite WebKit-Lauf war grün; die Meldung wackelt also. Dieselbe Sprechblase hat auch die App, und deren Prüfung `ablauf-seitenleiste-kontextmenue` ist in
WebKit grün.

**Wichtig – Regelkonflikt:** Die geltende Regel **R-4.12 ‚Erst fragen, dann zerstören‘** verlangt bei jedem roten Lösch-Menüpunkt zuerst eine Abfrage. J-2
widerspricht ihr. Der Wortlaut unten ändert deshalb R-4.12 und einen Satz in R-7.8 mit (0 Nr. 29).

**Im Muster nicht umgebaut:** Abgleich und Backup. ‚Zuletzt gelöscht‘ liegt im Muster nur auf diesem Gerät. Wiederherstellen entfernt den Eintrag aus
`db.deleted`, damit der Abgleich es als Änderung sieht. Ob das Backup des Musters ‚Zuletzt gelöscht‘ mitnimmt, habe ich nicht geprüft.

## 2. Muster am iPad prüfen (quer, hell)

**Link:** https://g811141a.github.io/AppDesign/arbeit/RLB-126/index.html

Die Beispieldaten rechnen ab dem Tag, an dem du das Muster zum ersten Mal öffnest: Schottland gilt als vor 3 Tagen gelöscht, Wien als vor 26 Tagen.

1. iPad quer, hell: den Link in Safari öffnen.
   Erwartet: Seitenleiste ‚Reiselogbücher‘ mit Toskana (2027), Australien und Ostsee (2026); darunter die Kachel ‚Zuletzt gelöscht‘ mit Papierkorb und ‚2‘.
2. ‚Zuletzt gelöscht‘ antippen.
   Erwartet: Kopf ‹ ‚Zuletzt gelöscht‘ · ‚2 Reiselogbücher‘; darunter ‚Gelöschte Reiselogbücher bleiben hier 30 Tage. Danach werden sie endgültig gelöscht.‘;
   Schottland blau mit ‚Gelöscht am <vor 3 Tagen> · noch 27 Tage‘, Wien mit ‚… · noch 4 Tage‘. Rechts die Vorschau von Schottland mit dem Hinweis
   ‚Dieses Reiselogbuch ist gelöscht. Gelöscht am <vor 3 Tagen> – wird in 27 Tagen endgültig gelöscht.‘ und ‚Wiederherstellen‘; keine Felder, kein Mehr.
3. Wien antippen.
   Erwartet: Wien blau, rechts die Vorschau von Wien, ‚wird in 4 Tagen endgültig gelöscht.‘
4. ‚Wiederherstellen‘ antippen.
   Erwartet: Wien öffnet mit der Tabelle; die Seitenleiste zeigt wieder ‚Reiselogbücher‘, Wien steht unter 2025; ‚Zuletzt gelöscht‘ zeigt ‚1‘.
5. Toskana lange drücken, ‚Reiselogbuch löschen‘ antippen.
   Erwartet: keine Abfrage; Toskana ist weg; ‚Zuletzt gelöscht‘ zeigt ‚2‘.
6. Ostsee nach links wischen, die rote Kapsel ‚Löschen‘ antippen.
   Erwartet: keine Abfrage; Ostsee ist weg; ‚Zuletzt gelöscht‘ zeigt ‚3‘.
7. ‚Zuletzt gelöscht‘ antippen, dann Toskana lange drücken.
   Erwartet: Reihenfolge Ostsee, Toskana, Schottland (zuletzt gelöscht oben); Menü ‚Wiederherstellen‘ · Strich · ‚Endgültig löschen‘ (rot).
8. ‚Endgültig löschen‘ antippen.
   Erwartet: Sprechblase ‚‚Toskana‘ mit 1 Eintrag endgültig löschen? Das kann nicht rückgängig gemacht werden.‘ mit ‚Endgültig löschen‘ (rot) und
   ‚Abbrechen‘. ‚Abbrechen‘ antippen: Toskana bleibt.
9. Schottland nach links wischen.
   Erwartet: Kapseln ‚Zurücklegen‘ und ‚Löschen‘ (rot). ‚Zurücklegen‘ antippen: Schottland verschwindet aus der Liste, die Liste bleibt stehen.
10. Mehr (ellipsis) oben in ‚Zuletzt gelöscht‘ → ‚Muster: Löschdatum −29 Tage‘.
    Erwartet: Ostsee und Toskana zeigen ‚noch 1 Tag‘; der Hinweis rechts sagt ‚wird in 1 Tag endgültig gelöscht.‘
11. Noch einmal ‚Muster: Löschdatum −29 Tage‘.
    Erwartet: beide sind abgelaufen und endgültig weg; die Seitenleiste zeigt wieder ‚Reiselogbücher‘ ohne die Kachel ‚Zuletzt gelöscht‘.
12. Mehr (ellipsis) der Seitenleiste → ‚Muster: Beispieldaten neu‘.
    Erwartet: alles wie in Schritt 1.

## 3. So macht es Apple (Apple-Abgleich 0164, Kurzfassung)

Notizen, Fotos, Dateien, Erinnerungen und Freeform behalten Gelöschtes 30 Tage. Notizen zeigt ‚Zuletzt gelöscht‘ nur, wenn etwas drin ist. Normales
Löschen fragt in Notizen und Dateien nicht, endgültig löschen fragt immer. HIG ‚Alerts‘ (direkt gelesen in 0164): keine Abfrage für Rückgängigmachbares.
**Eigene Ergänzungen:** die Restzeit ‚noch N Tage‘ (bei Apple nicht belegt) und die Vorschau nur zum Lesen (Freeform öffnet gar nicht).
Das Wort ‚Zurücklegen‘ unter der Kapsel ist ein Vorschlag; dass der Finder es für ‚Put Back‘ verwendet, ist eine **Vermutung**, in dieser Sitzung
nicht belegt. ‚Wiederherstellen‘ ist dort 88 px breit, für Kapsel und Abstand sind 77 px Platz (gemessen im Muster); ‚Zurücklegen‘ ist 65 px breit, ‚Zurück‘ 36 px.

## 4. Testfall-Liste (Testfall (automatisch), vor dem Bau – 0 Nr. 1)

Alle Fälle in Chromium und WebKit; nach jedem Schritt die Grundregeln. Ansichten: iPad quer und hoch, iPhone hoch und quer, hell und dunkel.

| Nr. | Fall | Erwartet |
|---|---|---|
| RLB-126/T-1 | Löschen aus Mehr (offenes Reiselogbuch), Kontextmenü und Wischen (rote Kapsel) | keine Sprechblase; Eintrag in ‚Zuletzt gelöscht‘ mit ganzem Inhalt, Zeitpunkt und Gerät; danach die Startreise bzw. die Startliste (iPhone); Ansage für VoiceOver |
| RLB-126/T-2 | Kachel ‚Zuletzt gelöscht‘ | nur wenn nicht leer, als letzte Kachel der Liste mit Papierkorb und Zahl; bei der Suche in allen ausgeblendet; ohne Reiselogbücher unter dem leeren Zustand |
| RLB-126/T-3 | Liste ‚Zuletzt gelöscht‘ | Kopf mit ‹, Titel, Anzahl; Hinweis zur Frist; zuletzt gelöscht oben; ‚Gelöscht am … · noch N Tage‘, Einzahl ‚noch 1 Tag‘; Seitenleiste nicht breiter; Backup-Kachel bzw. Offline-Zeile unten (R-1.5) |
| RLB-126/T-4 | Antippen eines gelöschten | Vorschau nur zum Lesen mit Hinweis (Datum, ‚in N Tagen‘ / ‚in 1 Tag‘) und ‚Wiederherstellen‘; keine Felder, kein Mehr, keine Ausgabe; iPad: das zuletzt gelöschte gleich offen; iPhone: eigene Seite, ‹ und Zurückwischen führen zur Liste |
| RLB-126/T-5 | Wiederherstellen aus der Vorschau | das Reiselogbuch öffnet, die Seitenleiste zeigt ‚Reiselogbücher‘, es steht an seinem Platz (Jahr); Eintrag in `deleted` entfällt; ‚geändert am …‘ neu |
| RLB-126/T-6 | Wiederherstellen aus Kontextmenü und Wischen | die Liste bleibt stehen; beim letzten zurück zu ‚Reiselogbücher‘ |
| RLB-126/T-7 | Endgültig löschen | Abfrage mit der Zahl der Einträge (keiner, 1, viele); ‚Abbrechen‘ ändert nichts (R-4.12); Bestätigen entfernt; die Kachel bleibt bis zur Entscheidung offen (R-7.8) |
| RLB-126/T-8 | Frist | am Tag des Löschens ‚noch 30 Tage‘, nach 29 Tagen ‚noch 1 Tag‘, nach 30 Tagen endgültig weg – beim Start und um 0:00; gezählt in Kalendertagen (auch über die Zeitumstellung) |
| RLB-126/T-9 | Abgleich | auf A gelöscht → auf B nach dem Abgleich ebenfalls in ‚Zuletzt gelöscht‘ (mit Inhalt); auf A wiederhergestellt → B bekommt es zurück; auf A endgültig gelöscht → auf B weg; auf B nach dem Löschen geändert → bleibt (wie heute `keptChanged`); gesperrt (15.18 Fall 23) unverändert |
| RLB-126/T-10 | Backup | ‚Zuletzt gelöscht‘ mit Löschdatum im Backup; Laden (Abgleichen und Ersetzen) übernimmt es; altes Backup ohne das Feld → leer (`normalize`); Abgelaufenes fällt beim Laden weg |
| RLB-126/T-11 | Drehen, Seitenleiste aus und ein, Textgröße (AX) | Liste und Vorschau bleiben, gewählter Eintrag bleibt, Grundregeln |
| RLB-126/T-12 | Tastatur | Esc und ⌘. schließen Kontextmenü und Sprechblase (= Abbrechen); Eingabe löst nie ‚Endgültig löschen‘ aus (R-4.7); ⌘F wirkt in ‚Zuletzt gelöscht‘ nicht |
| RLB-126/T-13 | Gesperrt | ein gesperrtes Reiselogbuch kommt nie nach ‚Zuletzt gelöscht‘ (Löschen ausgeblendet, RLB-125/J-12) |
| RLB-126/T-14 | Daten lang und viele | langer Titel, 20 gelöschte: die Liste rollt, der Kopf steht |
| RLB-126/T-15 | Gegenprobe | Löschen mit Sprechblase → T-1 rot; Frist 31 Tage → T-8 rot |

**Anzupassen beim Bau:** `checkErstFragen` (R-4.12) übergeht das Löschen nach ‚Zuletzt gelöscht‘ und prüft stattdessen, dass der Eintrag dort liegt; die
Prüfungen der App mit der alten Lösch-Abfrage (`ablauf-sperre` RLB-125/T-12, `ablauf-seitenleiste-kontextmenue`, `ablauf-wischen`) bekommen das neue Verhalten.

**Testfälle (User) am Gerät:** Wischgefühl in ‚Zuletzt gelöscht‘; Abgleich zweier Geräte über ‚Backup laden‘; Backup in Dateien sichern und laden; VoiceOver.

## 5. Wortlaut alt und neu (0 Nr. 29)

### 5.1 Lösch-Abfrage (RLB-125/L-4, L-5 – Reiselogbuch `PROMPT.md`)

**Alt:**
> Die geöffnete Reise wird über Mehr-Menü → ‚Reiselogbuch einstellen‘ bearbeitet und über Mehr-Menü → ‚Reiselogbuch löschen‘ gelöscht
> (Sprechblase ‚‚…‘ mit allen 42 Einträgen löschen? Das kann nicht rückgängig gemacht werden.‘ – ‚mit 1 Eintrag‘, ohne Einträge ‚‚…‘ ohne Einträge
> löschen? …‘; Schaltflächen ‚Erst Backup erstellen‘ (nur mit Einträgen und ohne Backup heute; danach dieselbe Sprechblase wieder) · ‚Reiselogbuch
> löschen‘ (rot) · ‚Abbrechen‘, RLB-125/L-4, L-5); danach öffnet die Startreise (iPhone: die Startliste).

**Neu:**
> Die geöffnete Reise wird über Mehr-Menü → ‚Reiselogbuch einstellen‘ bearbeitet und über Mehr-Menü → ‚Reiselogbuch löschen‘ ohne Abfrage nach
> ‚Zuletzt gelöscht‘ verschoben (R-7.10, 30 Tage); danach öffnet die Startreise (iPhone: die Startliste). In ‚Zuletzt gelöscht‘ fragt nur ‚Endgültig
> löschen‘: Sprechblase ‚‚…‘ mit allen 42 Einträgen endgültig löschen? Das kann nicht rückgängig gemacht werden.‘ – ‚mit 1 Eintrag‘, ohne Einträge
> ‚‚…‘ ohne Einträge endgültig löschen? …‘; Schaltflächen ‚Endgültig löschen‘ (rot) · ‚Abbrechen‘ (RLB-126).

‚Erst Backup erstellen‘ entfällt im Vorschlag: Endgültig löschen ist der zweite bewusste Schritt, und bis dahin ist das Reiselogbuch 30 Tage zurückzuholen.

### 5.2 R-4.12 (Designrichtlinie allgemein 17)

**Alt:**
> **Erst fragen, dann zerstören:** jede Lösch-, Ersetz- oder Rücksetz-Aktion (roter Menüpunkt, Schaltfläche mit ‚Löschen‘, ‚Entfernen‘, ‚Ersetzen‘,
> ‚Zurücksetzen‘) zeigt zuerst die Sprechblase (R-4.3); bis zur Bestätigung ändert sich nichts, ‚Abbrechen‘ lässt alles, wie es war

**Neu:**
> **Erst fragen, dann zerstören:** jede Lösch-, Ersetz- oder Rücksetz-Aktion (roter Menüpunkt, Schaltfläche mit ‚Löschen‘, ‚Entfernen‘, ‚Ersetzen‘,
> ‚Zurücksetzen‘) zeigt zuerst die Sprechblase (R-4.3); bis zur Bestätigung ändert sich nichts, ‚Abbrechen‘ lässt alles, wie es war. Ausgenommen ist
> das Löschen nach ‚Zuletzt gelöscht‘ (R-7.10): es lässt sich rückgängig machen und fragt nicht

Prüfung neu: ablauf.mjs – `checkErstFragen` (wie bisher; eine Aktion nach ‚Zuletzt gelöscht‘ fragt nicht, der Eintrag liegt danach dort).

### 5.3 R-7.8 (ein Satz)

**Alt:** ‚Die rote Aktion fragt beim Antippen zuerst (R-4.12), die Kachel bleibt bis zur Entscheidung offen.‘

**Neu:** ‚Fragt die rote Aktion beim Antippen zuerst (R-4.12), bleibt die Kachel bis zur Entscheidung offen.‘

### 5.4 Neue Regel R-7.10 (Thema 7 ‚Seitenleiste und Liste‘, J-6)

| Nr. | Regel | Prüfung | Gerät | Bau |
|---|---|---|---|---|
| R-7.10 | **Zuletzt gelöscht:** Löschen eines Eintrags der zentralen Liste verschiebt ihn ohne Abfrage nach ‚Zuletzt gelöscht‘ (R-4.12); dort bleibt er mit ganzem Inhalt eine feste Zahl von Tagen (Standard 30, je App), danach wird er endgültig gelöscht. ‚Zuletzt gelöscht‘ ist die letzte Kachel der Liste, mit Papierkorb und Anzahl, nur wenn nicht leer; sie öffnet die Liste der gelöschten Einträge – Kopf mit ‹ und ‚Zuletzt gelöscht‘, darunter der Hinweis zur Frist, zuletzt gelöschte oben, je Kachel ‚Gelöscht am … · noch N Tage‘. Antippen zeigt den Eintrag nur zum Lesen, darüber der Hinweis mit Löschdatum, Restzeit und ‚Wiederherstellen‘. Kontextmenü und Wischen: ‚Wiederherstellen‘ · ‚Endgültig löschen‘ (rot, mit Abfrage). Wiederherstellen setzt den Eintrag an seinen Platz zurück. Löschen, Wiederherstellen und endgültig Löschen gelten beim Abgleich auf beiden Geräten; ‚Zuletzt gelöscht‘ kommt mit Löschdatum ins Backup | ablauf.mjs – `checkRecentlyDeleted` (neu: RLB-126/T-1 bis T-15) | Wischgefühl, Abgleich zweier Geräte | 15.24 (neu) |

Dazu in der Liste der AD-Beans (15) eine Zeile für die neue AD-Bean `recentlydeleted` (J-5): Anlegen `createRecentlydeleted(…)`, Eigenschaft `days`
(Standard 30), Methoden `remove`, `restore`, `purge`, `purgeAll`, `daysLeft`, nur lesen `items`, Ereignisse `restore`, `purge`, `change`; Regeln R-7.10,
R-4.12. Den Bau stimme ich vorher mit dem Chat ‚AppDesign Framework Steuer-Bean Konzept‘ ab.

## 6. Fragen

1. Muster am iPad quer geprüft? ok · nicht ok
2. Wort unter der Kapsel: a) ‚Zurücklegen‘ **(Empfohlen)**: passt unter die Kapsel und ist eindeutig · b) ‚Zurück‘: kürzer, sieht aber wie ‚zurückgehen‘ aus
3. ‚Erst Backup erstellen‘ beim endgültigen Löschen: a) entfällt **(Empfohlen)**: zweiter bewusster Schritt nach 30 Tagen Frist · b) bleibt wie bisher
4. Wortlaut 5.1 bis 5.4 freigeben? Ja · Nein
