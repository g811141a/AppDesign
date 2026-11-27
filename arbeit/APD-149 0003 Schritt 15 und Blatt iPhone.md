# APD-149 – Schritt 15 erneut prüfen · neues Thema ‚Blatt am iPhone mit Höhe nach Inhalt‘ (Sitzung AppDesign 0003)

**27.11.2026** · Die Korrektur zu Schritt 15 ist auf `main` (Commit e66a41c), Pages ‚success‘. Kein Bau, keine AppDesign-Version.

## 1. Schritt 15 erneut ausprobieren

Link: https://g811141a.github.io/AppDesign/katalog/index.html#presentation – vorher in Safari die Seite neu laden.

15. iPad quer, hell, ‚Stapel (Steuer-Bean)‘: Schalter ‚Kopfzeile alle 2 s neu aufbauen‘ ein, ‚Mehr‘ antippen, dann ‚Ansicht‘, 5 s warten. Erwartet: ‚Ansicht‘ bleibt offen neben dem Menü, ‚Ansicht‘ und ‚Mehr‘ bleiben blau.
15a. Dann im Untermenü ‚Kompakt‘ antippen. Erwartet: Menü und Untermenü gehen zu, ‚Mehr‘ ist nicht mehr blau, im Protokoll ‚Ansicht kompakt‘.
15b. Dasselbe am iPhone hoch. Erwartet: wie 15 und 15a.

Automatisch geprüft in `arbeit/APD-149/muster-pruefen.mjs`, Fall APD-149/S-16 (Chromium und WebKit grün).

## 2. Neues Thema: Blatt am iPhone mit Höhe nach Inhalt

**Anlass:** deine Rückmeldung zu den Schritten 4, 7 und 9: am iPhone hoch haben ‚Neuer Eintrag‘, ‚Eintrag bearbeiten‘ und ‚Anderes Fenster‘ die volle Höhe, am iPad passt sich die Höhe dem Inhalt an.

**Heute (R-4.6, Designrichtlinie 15.17):** am iPhone ein Blatt ‚nur groß‘ (Variante A wie ‚Neuer Termin‘), am iPad ein Formblatt (Variante B wie ‚Neuer Kontakt‘).

**So macht es Apple** (HIG ‚Sheets‘, Stand März 2026, https://developer.apple.com/design/human-interface-guidelines/sheets – gelesen über die JSON-Fassung der Seite):
- „The system defines two detents: large is the height of a fully expanded sheet and medium is about half of the fully expanded height. Sheets can have one or more custom detent values.“
- „Sheets automatically support the large detent. Adding the medium detent allows the sheet to rest at both heights, whereas specifying only medium prevents the sheet from expanding to full height.“
- „In an iPhone app, consider supporting the medium detent to allow progressive disclosure of the sheet’s content. … In contrast, you might not want to support the medium detent if a sheet’s content is more useful when it displays at full height. For example, the compose sheets in Messages and Mail display only at full height to give people enough room to create content.“
- „Include a grabber in a resizable sheet.“
- iPad: „Prefer using the page or form sheet presentation styles in an iPadOS app. Each style uses a default size for the sheet …“
- Eine Höhe nach Inhalt geht über eine eigene Stufe: `UISheetPresentationController.Detent.custom(identifier:resolver:)` – „The value you return from this closure is a height within the safe area of the sheet“ (iOS 16.0, https://developer.apple.com/documentation/uikit/uisheetpresentationcontroller/detent/custom(identifier:resolver:)); SwiftUI `presentationDetents(_:)`, „By default, sheets support the large detent“ (iOS 16.0).

**Einordnung:** Groß als Standard entspricht Apple; für Fenster zum Schreiben (Erfassung, Bearbeiten mit Tastatur) nennt Apple ausdrücklich die volle Höhe. Für kurze Fenster ohne viel Eingabe erlaubt Apple eine kleinere Stufe (mittel oder eigene Höhe), dann mit Griff und Ziehen zwischen den Stufen.

**Vorschlag für den Backlog-Eintrag:**

| Nr. | Prio | Thema | Status |
|---|---|---|---|
| APD-151 | 2 | **Blatt am iPhone mit Höhe nach Inhalt (Rückmeldung am Gerät 27.11.2026, Sitzung AppDesign 0003, Muster APD-149 Schritte 4, 7, 9):** am iPhone hoch hat jedes Fenster als Blatt die volle Höhe (R-4.6, Variante A ‚nur groß‘), am iPad passt sich die Höhe dem Inhalt an. Klären, ob kurze Fenster am iPhone eine kleinere Stufe bekommen (Höhe nach Inhalt wie `custom` detent oder mittel), mit Griff und Ziehen zwischen den Stufen; Erfassen und Bearbeiten mit Tastatur bleiben groß (HIG: Mail, Nachrichten). So macht es Apple: HIG ‚Sheets‘ (large Standard, medium und eigene Stufen möglich) – `arbeit/APD-149 0003 Schritt 15 und Blatt iPhone.md`. Berührt R-4.6 und 15.17 (Wortlaut nach 0 Nr. 29); mit APD-149 (`presentation`, Art `sheet`) klären, Bau mit `v5/` · allgemein | offen |

**Empfehlung Priorität 2 (mittel):** kein Fehler – die Regel ist so entschieden und entspricht Apples Standard; das Thema gehört zur Art `sheet` der Steuer-Bean und wird am besten mit APD-149 für `v5/` geklärt.

## Alle offenen Usertests

### P-126 – Reiselogbuch 3.59.0 / AppDesign 4.71.0 (aus Sitzung 0167, weiter in Reiselogbuch 0168)

Testfälle P-126 (Schritt für Schritt, Zusammenarbeit allgemein 3.19.0). Link der App: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen. Vor P-126/1 auf beiden Geräten ein **Backup erstellen** (Sicherheit). Zum Probieren ein
Reiselogbuch ‚Test‘ mit mindestens einem erfassten Tag anlegen; deine echten Reiselogbücher nicht löschen.

**P-126/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.59.0 · erstellt am … · AppDesign 4.71.0‘. Automatisch geprüft in `version-regeln`.

**P-126/1 – Löschen ohne Abfrage (iPad)**
1. iPad quer, hell; ‚Test‘ öffnen, oben Mehr (ellipsis) → ‚Reiselogbuch löschen‘.
2. Erwartet: keine Sprechblase; ‚Test‘ ist aus der Liste verschwunden, die Startreise ist offen; unten in der Liste die Kachel ‚Zuletzt gelöscht‘ mit Papierkorb und ‚1‘.
   Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-1, T-2).

**P-126/2 – Liste und Vorschau (iPad)**
1. iPad quer, hell; die Kachel ‚Zuletzt gelöscht‘ antippen.
2. Erwartet: Kopf ‹ ‚Zuletzt gelöscht‘ · ‚1 Reiselogbuch‘; darunter ‚Gelöschte Reiselogbücher bleiben hier 30 Tage. Danach werden sie endgültig gelöscht.‘; ‚Test‘ blau
   mit ‚Gelöscht am <heute> · noch 30 Tage‘. Rechts die Vorschau mit ‚Dieses Reiselogbuch ist gelöscht. Gelöscht am <heute> – wird in 30 Tagen endgültig gelöscht.‘
   und ‚Wiederherstellen‘; keine Felder, kein Mehr. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-3, T-4).

**P-126/3 – Wischgefühl in ‚Zuletzt gelöscht‘ (iPad)**
1. iPad quer, hell; in ‚Zuletzt gelöscht‘ ‚Test‘ langsam nach links wischen und loslassen.
2. Erwartet: die Kachel folgt dem Finger, daneben die Kapseln ‚Wiederherstellen‘ und ‚Löschen‘ (rot, ganz außen); das Wort ‚Wiederherstellen‘ ist ganz lesbar; die
   Kachel bleibt offen bzw. federt zurück wie bei ‚Reiselogbücher‘.
3. Neben die Kachel in die Liste tippen. Erwartet: die Kachel schließt, nichts wird ausgelöst.

**P-126/4 – Endgültig löschen fragt (iPad)**
1. iPad quer, hell; in ‚Zuletzt gelöscht‘ ‚Test‘ lange drücken.
2. Erwartet: Menü ‚Wiederherstellen‘ · Strich · ‚Endgültig löschen‘ (rot).
3. ‚Endgültig löschen‘ antippen. Erwartet: Sprechblase ‚‚Test‘ mit 1 Eintrag endgültig löschen? Das kann nicht rückgängig gemacht werden.‘ (bzw. ‚mit allen N
   Einträgen‘) mit ‚Endgültig löschen‘ (rot) und ‚Abbrechen‘ – kein ‚Erst Backup erstellen‘.
4. ‚Abbrechen‘ antippen. Erwartet: ‚Test‘ bleibt in ‚Zuletzt gelöscht‘. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-7).

**P-126/5 – Wiederherstellen (iPhone)**
1. iPhone hoch, hell; in der Startliste unten ‚Zuletzt gelöscht‘ antippen, dann ‚Test‘.
2. Erwartet: eigene Seite ‚Test‘ mit ‹, darunter der Hinweis ‚Dieses Reiselogbuch ist gelöscht. …‘ mit ‚Wiederherstellen‘ und die Vorschau.
3. ‚Wiederherstellen‘ antippen. Erwartet: ‚Test‘ öffnet mit seinen Tagen; zurück in der Startliste steht ‚Test‘ wieder unter seinem Jahr, ‚Zuletzt gelöscht‘ ist weg.
   Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-4, T-5).

**P-126/6 – Abgleich zweier Geräte über ‚Backup laden‘**
1. iPad: ‚Test‘ löschen (Mehr → ‚Reiselogbuch löschen‘), dann Mehr der Seitenleiste → ‚Backup erstellen‘ und in Dateien (iCloud Drive) sichern.
2. iPhone: Mehr der Startliste → ‚Backup laden‘, das Backup vom iPad wählen, ‚Abgleichen‘.
3. Erwartet auf dem iPhone: ‚Test‘ ist aus ‚Reiselogbücher‘ verschwunden und steht unter ‚Zuletzt gelöscht‘ mit ‚Gelöscht am <Tag auf dem iPad> · noch N Tage‘.
4. iPhone: ‚Test‘ in ‚Zuletzt gelöscht‘ lange drücken → ‚Wiederherstellen‘; Backup erstellen und sichern. iPad: dieses Backup laden, ‚Abgleichen‘.
5. Erwartet auf dem iPad: ‚Test‘ steht wieder in ‚Reiselogbücher‘, ‚Zuletzt gelöscht‘ ist leer bzw. weg. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-9).

**P-126/7 – Backup in Dateien sichern und laden**
1. iPad: ‚Test‘ löschen, Backup erstellen und in Dateien sichern.
2. iPad: ‚Test‘ in ‚Zuletzt gelöscht‘ wiederherstellen; dann ‚Backup laden‘ mit dem Backup aus Schritt 1, ‚Ersetzen‘.
3. Erwartet: ‚Test‘ steht wieder unter ‚Zuletzt gelöscht‘ mit dem Löschdatum aus Schritt 1. Automatisch geprüft in `ablauf-zuletzt-geloescht` (RLB-126/T-10).

**P-126/8 – VoiceOver**
1. iPad, VoiceOver ein (Einstellungen → Bedienungshilfen); ein Reiselogbuch ‚Test‘ über Mehr → ‚Reiselogbuch löschen‘ löschen.
2. Erwartet: VoiceOver sagt ‚‚Test‘ nach ‚Zuletzt gelöscht‘ verschoben‘.
3. Zur Kachel ‚Zuletzt gelöscht‘ streichen. Erwartet: ‚Zuletzt gelöscht, 1, Taste‘; doppelt tippen öffnet die Liste, ‹ heißt ‚Reiselogbücher‘.
4. In der Vorschau ‚Wiederherstellen‘ doppelt tippen. Erwartet: ‚‚Test‘ wiederhergestellt‘.


Nächste Version AppDesign: 1 Punkt bereit (APD-149/J-1). Offen im Backlog: APD-135, APD-136, APD-149, APD-148 (Prio 1) · APD-139, APD-141, APD-142, APD-145, APD-150 (Prio 2) · APD-70, APD-147 (Prio 3).
