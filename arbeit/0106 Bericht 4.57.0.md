# Bericht – AppDesign 4.57.0 / Reiselogbuch 3.55.0

**Stand 12.11.2026** · Sitzung ‚Reiselogbuch 0106‘ · gebaut mit deiner Freigabe ‚Ja, alle 10 Punkte‘ (Sitzung 0105)

**AppDesign 4.57.0 und Reiselogbuch 3.55.0 sind veröffentlicht.** Beide Pages-Läufe waren ‚success‘ (AppDesign 926dc31, Reiselogbuch cddc637). Alle 10 Punkte
aus vier Themen sind gebaut: Eingabefelder, Darstellung, Gleiten, Regeltext. Der volle Prüflauf war im zweiten Anlauf grün: **152 Läufe in 71:55 min**, davon
2 nur unter Last rot und allein grün (‚wackelt‘, APD-85). Der erste Lauf war an 3 Prüfungen rot, nicht an der App (Abschnitt ‚Warum zwei Läufe‘).

**Bitte die App auf iPhone und iPad ganz schließen und mit Netz neu öffnen**, dann zuerst P-101/0.

## Änderungen

| Punkt | Was | HIG |
|---|---|---|
| **APD-126** Cursor am Ende | Beim ersten Antippen und mit Tab steht der Cursor hinter dem letzten Zeichen (neu R-5.11); danach setzt Antippen ihn an die angetippte Stelle | weicht ab: Apple setzt den Cursor an die angetippte Stelle; abgestimmt (APD-126/W-2), damit man am Ende weiterschreibt |
| **APD-126** Leeres Feld einzeilig | Ein leeres Textfeld ist eine Zeile hoch und wächst bzw. schrumpft mit dem Text; der Rollstand bleibt | entspricht HIG (Notizen, Nachrichten) |
| **APD-126 / RLB-123** Nach einem Vorschlag klein weiter | Nach einem Vorschlag bleibt die Tastatur klein (R-5.2); ‚Sonstiges …‘ beginnt eine neue Zeile, deshalb dort groß | entspricht HIG (Autokorrektur-Verhalten von iOS) |
| **RLB-123** Verlauf-Vorschläge | Vorschläge stehen über dem Feld, der gewählte kommt als neue letzte Zeile ans Ende (behebt P-100/1) | entspricht HIG |
| **APD-124** Rückgängig im Feld | ⓧ leert sofort, auch mehrzeilig, ohne Sprechblase; der Text kommt in die Zwischenablage; an Stelle des ⓧ steht Rückgängig, bis du tippst oder das Feld verlässt | entspricht HIG (Rückgängig statt Rückfrage) |
| **RLB-120** Kopfverlauf | Bezeichnung im Kasten und Kopfzeile jeder Tabelle mit Verlauf von Weiß nach Grau, Text halbfett, Emojis in Textgröße; in der Ausgabe Weiß → `#d9d9d9` | weicht ab: Apple-Tabellen haben keinen Verlauf; abgestimmt (RLB-120/W-1 bis W-8) |
| **RLB-122** Aufzählung | Mit ‚·‘ getrennte Einträge brechen nur nach dem ‚·‘ um (z. B. ‚8×⛅‘ bleibt zusammen) | entspricht HIG |
| **APD-116** Dateiname | Der Dateiname steht fett und zentriert allein in einer Zeile unter dem Satz, ohne Punkt, umgebrochen nur an Leerzeichen (neu R-10.8) | entspricht HIG (Dateien zeigt Namen abgesetzt) |
| **APD-127** Gleiten | Öffnen und hinein mit Feder ohne Nachschwingen über 0,5 s, schließen und hinaus 0,25 s, nach einer Geste anteilig (neu R-1.12) – Blatt, Navigation, Seitenleiste, Titel antippen, iPad-Fenster mit Tastatur | entspricht HIG (wie Seitenleiste in Notizen); ‚Bewegung reduzieren‘ bleibt ohne Gleiten |
| **APD-125** Regeltext | Zusammenarbeit 3.11.0: vor jeder Kachel eine Datei, im Chat dasselbe (APD-125/V-1 bis V-3) | – |
| Doku-Schreibweise | 33 lokale Nummern mit Themennummer | – |

## Apple-Review (Prüfskripte)

- **HIG-Prüfung (`hig`):** grün in Chromium und WebKit, hell und dunkel, mit Bedienungshilfen, Textgrößen 14, 23, 33, 53.
- **Regel-Prüfungen** (`start-regeln`, `regeln-ablauf`, `kontextmenue-regeln`, `doku-regeln`): grün; `kontextmenue-regeln (iPad)` in WebKit nur unter Last rot.
- **Neue Prüfungen:** `checkFeldCursor`, `checkCursorEnde`, `checkClear` (erweitert), `kopfVerlauf`, `checkAufzaehlung`, `checkDateiname`, `checkGleiten`; jede mit
  Gegenprobe gegen die alte Fassung rot, z. B. APD-126/B-13 mit 60 Meldungen, APD-124/B-11 mit 158, `kopfVerlauf` mit 35, Dateiname ohne Zentrierung mit 8.
- **Wackelt (APD-85):** `ablauf-seitenleiste-hoch` und `kontextmenue-regeln (iPad)`, beide WebKit.

## Warum zwei Läufe

Der erste volle Lauf war an 3 Prüfungen rot, veröffentlicht wurde da nichts. Das neue Hineingleiten dauert 0,5 s, und mehrere Prüfungen haben nach einer festen,
kürzeren Wartezeit gemessen, während die Bewegung noch lief (`oeffnen-position`, `kapsel-iphone`). Die Prüfungen warten jetzt auf das Ende der Bewegung,
vorsorglich in 25 Prüfdateien. `ablauf-iphone` erwartete noch ‚Freetour Sydney‘; nach R-5.2 ist ‚Freetour sydney‘ richtig.

## Selbst entschieden oder noch offen

- **‚Sonstiges …‘:** Die neue Zeile beginnt groß (Zeilenanfang nach R-5.2) – abweichend von der Testfall-Liste RLB-123/B-5, die klein erwartete.
- **Aufzählung:** `inline` statt `inline-block`, sonst bricht ein langer Eintrag nicht mehr um.
- **APD-127/B-8** geprüft als ‚Endlage wie ohne Bewegung‘; APD-127/B-2 im iPad hoch.
- **Nicht am Gerät belegt:** `color-mix` (Kopfverlauf) in iOS-Safari; P-101/15 zeigt es.
- **Ohne bestätigten Wortlaut, daher unverändert:** PROMPT.md ‚Emojis klein‘ (Zeilen 148–149); ein VoiceOver-Name ‚Löschen widerrufen‘ für Rückgängig;
  eine Zeile für ‚Cursor am Ende‘ in Designrichtlinie Abschnitt 16; `tests/README.md` nur zum Teil nachgeführt.

## Offene Usertests

- **P-101** (Reiselogbuch 3.55.0, AppDesign 4.57.0) – die Testfälle unten. Andere Usertests sind nicht offen (P-100 erledigt, P-100/1 wiederholt in P-101/3).

## Testfälle P-101

Testfälle P-101 (Schritt für Schritt, Zusammenarbeit allgemein 3.11.0). Link: https://g811141a.github.io/ReiseLogBuch/ – bitte in der
**App vom Home-Bildschirm**, zuerst die App ganz schließen und neu öffnen.

**P-101/0 – Version prüfen**
1. Auf iPhone und iPad die App ganz schließen (vom unteren Rand nach oben wischen und wegschieben) und mit Netz neu öffnen.
2. In der Startliste (iPhone) bzw. Seitenleiste (iPad) ‚Reiselogbücher‘ oben auf ‚…‘ (Mehr) tippen.
3. Erwartet auf beiden Geräten: unten grau ‚Reiselogbuch · Version 3.55.0 · erstellt am … · AppDesign 4.57.0‘.

**P-101/1 – Cursor am Ende**
1. iPad quer, hell: ein Reiselogbuch öffnen und einen Tag antippen.
2. In ‚Quartier‘ (mit Text) vorn auf den ersten Buchstaben tippen; danach noch einmal vorn tippen.
3. Erwartet: nach dem ersten Antippen steht der Cursor hinter dem letzten Zeichen; nach dem zweiten an der angetippten Stelle.

**P-101/2 – Leeres Feld einzeilig, wächst mit**
1. iPhone hoch, hell: einen Tag mit leerem ‚Wie war was?‘ öffnen.
2. Das Feld ansehen, antippen, ‚Gut‘ tippen, Eingabetaste, ‚Essen‘ tippen; dann alles löschen.
3. Erwartet: leer ist das Feld eine Zeile hoch; nach der Eingabetaste zwei Zeilen; nach dem Löschen wieder eine Zeile; der Cursor bleibt über der
   Tastatur sichtbar.

**P-101/3 – Verlauf: Vorschlag über dem Feld, am Ende, klein weiter** (wiederholt P-100/1)
1. iPad quer, hell: einen Tag mit zwei Zeilen im Verlauf öffnen.
2. In die erste Zeile des Verlaufs tippen, oben über dem Feld auf ‚Weiterfahrt nach …‘ tippen, dann ‚rom‘ tippen.
3. Erwartet: die Vorschläge stehen über dem Feld; ‚Weiterfahrt nach rom‘ steht als neue letzte Zeile, die Tastatur blieb auf Kleinbuchstaben.

**P-101/4 – ‚Sonstiges …‘**
1. iPhone hoch, hell: einen Tag mit Verlauf öffnen.
2. Über dem Feld auf ‚Sonstiges …‘ tippen, noch einmal auf ‚Sonstiges …‘ tippen.
3. Erwartet: am Ende steht genau eine neue leere Zeile mit dem Cursor, sie ist zu sehen. Danach mit x ‚Änderungen verwerfen‘.

**P-101/5 – Seitenleiste gleitet wie in Notizen**
1. iPad quer, hell: die Seitenleiste mit dem Knopf links oben aus- und wieder einblenden; zum Vergleich in Notizen dasselbe.
2. Mehrmals wiederholen.
3. Erwartet: einblenden weich, ohne Nachschwingen, etwa so schnell wie in Notizen; ausblenden etwas schneller und ruhig.

**P-101/6 – Blatt und Navigation am iPhone**
1. iPhone hoch, hell: ein Reiselogbuch öffnen und mit ‚<‘ zurück; einen Tag öffnen und mit x schließen; einen Tag öffnen, das Blatt halb nach unten
   ziehen und loslassen.
2. Jeweils mehrmals.
3. Erwartet: hinein und öffnen weich (nicht ‚extrem schnell‘), zurück und schließen ruhig; nach dem Loslassen gleitet das Blatt zurück; nichts springt.

**P-101/7 – Titel antippen = nach oben**
1. iPad quer, hell: ein langes Reiselogbuch öffnen, weit nach unten rollen.
2. Auf den Titel oben in der Kopfzeile tippen.
3. Erwartet: der Inhalt gleitet weich ganz nach oben, ohne Nachschwingen.

**P-101/8 – Rückgängig im Feld**
1. iPhone hoch, hell: einen Tag öffnen, ‚Ort‘ antippen.
2. ⓧ antippen. Erwartet: das Feld ist leer, rechts im Feld ein graues Rückgängig-Icon.
3. Rückgängig antippen. Erwartet: der Ort steht wieder da, der Cursor am Ende, rechts wieder das ⓧ.

**P-101/9 – Mehrzeilig ohne Sprechblase**
1. iPad quer, hell: einen Tag mit mehreren Zeilen im Verlauf öffnen, den Verlauf antippen.
2. ⓧ antippen. Erwartet: sofort leer, keine Sprechblase, das Feld ist eine Zeile hoch.
3. Rückgängig antippen. Erwartet: alle Zeilen sind zurück, das Feld ist wieder so hoch wie vorher.

**P-101/10 – Zwischenablage**
1. iPhone hoch, hell: einen Tag öffnen, den Verlauf antippen, ⓧ antippen.
2. In Notizen in eine Notiz tippen und ‚Einsetzen‘ wählen.
3. Erwartet: der geleerte Verlauf wird eingesetzt. Danach im Reiselogbuch mit x ‚Änderungen verwerfen‘.

**P-101/11 – Rückgängig verfällt**
1. iPad quer, hell: einen Tag öffnen, ‚Quartier‘ antippen, ⓧ antippen, dann ‚a‘ tippen.
2. Erwartet: rechts das ⓧ statt Rückgängig.
3. In ein anderes Feld tippen, dort ⓧ antippen, dann zurück in ‚Quartier‘ und wieder in das geleerte Feld. Erwartet: im geleerten Feld kein Knopf.
   Danach mit x ‚Änderungen verwerfen‘.

**P-101/12 – Dateiname nach ‚Backup erstellen‘**
1. iPad hoch, hell: in der Seitenleiste oben ‚…‘ (Mehr) → ‚Backup erstellen‘.
2. Im Teilen-Menü ‚In Dateien sichern‘ wählen und sichern.
3. Erwartet: kleines Fenster ‚Backup‘ mit ‚✅ Teilen-Menü abgeschlossen für‘, darunter fett, zentriert und allein ‚Ω Backup Reiselogbuch JJJJ.MM.TT
   hh.mm.json‘; bricht der Name um, dann nur an einem Leerzeichen.

**P-101/13 – Dateiname nach abgebrochener Ausgabe**
1. iPhone quer, hell: ein Reiselogbuch öffnen, oben das Teilen-Icon (share) → ‚HTML‘.
2. Das Teilen-Menü ohne Auswahl schließen.
3. Erwartet: Fenster ‚Ausgabe V…‘ mit ‚⚠️ Teilen-Menü abgebrochen – nicht gespeichert:‘, darunter fett, zentriert und allein der Name ‚Reiselogbuch
   <Titel> JJJJ.MM.TT-JJJJ.MM.TT V….html‘; das Datum ‚JJJJ.MM.TT-JJJJ.MM.TT‘ bleibt zusammen.

**P-101/14 – Statistik: Umbruch nur nach ‚·‘**
1. iPhone hoch, hell: ein Reiselogbuch mit vielen verschiedenen Wetter-Zeichen und Smileys öffnen, nach unten zur ‚Statistik‘ rollen.
2. Die Zeilen ‚Wetter‘ und ‚Smileys‘ ansehen.
3. Erwartet: jede umbrochene Zeile endet mit ‚·‘, die nächste beginnt mit der Anzahl (z. B. ‚8×⛅‘); Anzahl und Zeichen stehen nie getrennt.

**P-101/15 – Tageskachel mit Verlauf**
1. iPhone hoch, hell: ein Reiselogbuch öffnen.
2. Die Tageskacheln ansehen. Erwartet: Spalte 1 links weiß, nach rechts grau, Text fett; Emojis in Spalte 1 und das Wetter oben rechts so groß wie die
   Smileys in Spalte 2; eine Linie unter dem Datum und eine unter der letzten Zeile.
3. iPhone-Einstellungen › Anzeige & Helligkeit › Textgröße ganz groß (Größere Textgrößen ein), zurück in die App. Erwartet: jede Bezeichnung als Streifen
   über dem Wert, oben weiß, nach unten grau.
4. Darstellung dunkel. Erwartet: der Verlauf zart von Dunkelgrau zu etwas hellerem Grau, Text gut lesbar.

**P-101/16 – Kopfzeile in Tabelle und Ausgabe**
1. iPad quer, hell: ein Reiselogbuch öffnen. Erwartet: die Kopfzeile der Tabelle der Tage und der Quartiere oben weiß, nach unten grau.
2. Teilen-Icon (share) › ‚Vorschau‘. Erwartet: die Kopfzeilen der Tabellen oben weiß, nach unten grau.
3. Vorschau schließen, Teilen-Icon (share) › ‚PDF‘, im Drucken-Menü die Vorschau ansehen. Erwartet: im PDF dieselben Kopfzeilen mit Verlauf.

**Bitte zuerst alle Testfälle des Usertests prüfen – neue Punkte setze ich erst um, wenn der Usertest erledigt und gefundene Fehler beseitigt sind.**

## Backlog-Erinnerung

Nächste Version: **0 Punkte bereit** · Offen im Backlog: RLB-121 · APD-85 Teil 6 (Wackler WebKit) · APD-80 · APD-30 · APD-57 · APD-62 · RLB-6.

## Übergabe

Die Sitzung wurde zusammengefasst; deshalb übergebe ich jetzt (0 Nr. 13). Die neue Sitzung **‚Reiselogbuch 0107 – Usertest P-101‘** fragt dich nach deiner
Rückmeldung zu P-101.
