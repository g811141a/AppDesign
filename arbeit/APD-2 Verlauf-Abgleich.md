# APD-2 Schritt 1 – Verlauf-Abgleich

**Stand 14.10.2026** · Grundlage: `VERLAUF.md` (04.10.–14.10.2026), von unten nach oben geprüft gegen
Designrichtlinie allgemein 4.11.4, Zusammenarbeit allgemein 2.0.0, Designrichtlinie Reiselogbuch 3.11.4, PROMPT.md,
CLAUDE.md beider Repos und die Backlogs. Arbeitsdatei für APD-2 (Schritte 2–4 bauen darauf auf).

Ergebnis: **fast alles Vereinbarte ist umgesetzt und festgehalten.** Es fehlen 4 Punkte, 9 Stellen sind veraltet oder
widersprüchlich – meist ältere Texte, die nach Arbeitsprozess 2.0 nicht nachgeführt wurden.

---

## 1. Fehlt (nicht oder nicht vollständig festgehalten)

| Nr. | Wunsch (Verlauf) | Was fehlt | Vorschlag |
|---|---|---|---|
| F-1 | 14.10. 02:38 – WebKit: die zwei gesperrten Adressen noch einmal nennen und sagen, **wo** man sie freigibt | Nirgends festgehalten, ob das geschehen ist; UEBERGABE sagt nur ‚prüfen, ob freigegeben‘ | Mit APD-5: Adressen und Einstellungsort (Umgebung → Netzwerkzugriff) in UEBERGABE/APD-5 aufnehmen |
| F-2 | 10.10. 11:22 – wöchentliche Backlog-Erinnerung (Mo 8:58) ‚so lassen‘ | Die Erinnerung läuft noch in die **alte Sitzung**, liest den alten Pfad `/home/user/reiselogbuch`, nur das App-Backlog und alte Status (‚vereinbart‘); passt nicht mehr zu ‚ein Thema je Sitzung‘ und UEBERGABE.md | **Erledigt 14.10.:** neue Erinnerung ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘, Mo 8:58, je Woche frische Sitzung, liest UEBERGABE.md und beide Backlogs, endet mit dem Starttext; alte gelöscht |
| F-3 | 14.10. 01:33 – ‚Zebra gilt für die ganze Tabellenzeile – **allgemeiner Standard**‘ | R-52 regelt das nur für Ausgaben, Vorschauen und Berichte; Abschnitt 9 (Tabellen in der App) zählt weiter ‚jede 2. sichtbare Zeile‘ | Beim Zusammenführen der Tabellenregeln (Schritt 2) für **alle** Tabellen festhalten |
| F-4 | 11.10. 14:09 – Vorschau am iPad wie am iPhone (seitlich wischen, Inhalt nie außerhalb der Tabelle) | Steht nur in der Designrichtlinie Reiselogbuch 3 (‚seit 3.5.0 auch am iPad‘); die allgemeine Regel 7 (Vorschaufenster) nennt es nicht | In Schritt 3 (allgemein statt App) nach Abschnitt 7 / 15.9 verschieben |

## 2. Veraltet oder widersprüchlich

| Nr. | Stelle | Widerspruch | Vorschlag |
|---|---|---|---|
| W-1 | Zusammenarbeit §6 ‚Sofort-Korrektur nur bei Datenverlust oder unbenutzbarer App; Korrekturversion nur dafür‘ | Abschnitt 0 Nr. 8: ‚**Korrekturen sofort**, bevor Neues kommt‘ – und so gelebt (3.11.1–3.11.4 waren Korrekturversionen ohne Datenverlust) | **Entschieden 14.10.: Nr. 8 gilt** – §6 wird angepasst (Schritt 4) |
| W-2 | Zusammenarbeit §2 ‚Antwortvorschläge: Auswahlfenster (bis 4 Fragen, 2–4 Möglichkeiten) **und** Antwortzeile zum Kopieren – Pflicht‘; ebenso CLAUDE.md beider Repos | Abschnitt 0 Nr. 7: Fenster nur Ja/Nein und klare Auswahl, Option ‚Ich schreibe im Chat‘ | **Entschieden 14.10.: Antwortzeile entfällt** (nur noch bei mehr als 4 Fragen) – §2 und CLAUDE.md anpassen (Schritt 4) |
| W-3 | Zusammenarbeit §2 ‚Muster stehen direkt im Fragetext des Auswahlfensters‘ | gleicher Abschnitt: ‚im Fenster nur eine kurze Frage‘; Abschnitt 0 Nr. 7: Erklärungen als Datei **vor** dem Fenster | Nr. 7 gilt; §2 anpassen |
| W-4 | Designrichtlinie 14, README AppDesign, CLAUDE.md AppDesign: ‚4.x.y gilt sofort für alle Apps‘ | Abschnitt 0 Nr. 10: feste Fassung je App, heben nur nach Rückfrage | bleibt bis APD-5 so; dann alle drei Stellen nachführen |
| W-5 | CLAUDE.md ReiseLogBuch (Version 2.1.0, 10.10.) und BACKLOG ReiseLogBuch (Kopf) | ‚etwa 5 Punkte‘ (jetzt 2–3, höchstens 2 Themen); Antwortzeile; Zeitzeile mit ‚Gesamt‘; Einbindung ohne `?v=` (R-48); Test `node tests/hig.mjs` statt `sh tests/alle.sh`; UEBERGABE.md fehlt in ‚Zuerst lesen‘ | in Schritt 4 neu fassen (nur Verweise auf AppDesign + App-Eigenes) |
| W-6 | Designrichtlinie 1 ‚Zielgerät iPad … **kein Teilen**‘ | iPhone-Ansicht (15.17) und Abgleich iPad ↔ iPhone (15.18) | Grundprinzipien nachführen |
| W-7 | Designrichtlinie Reiselogbuch 3 und 5: ‚Backup laden … Die aktuellen Daten auf diesem iPad werden ersetzt.‘ | seit 4.10.0 Abfrage mit Kacheln Abgleichen/Ersetzen (R-46) | streichen, auf 15.19 verweisen |
| W-8 | Abgleichbericht-Feldname ‚**Verkehrsmittel**‘ (`labels` in index.html, Designrichtlinie Reiselogbuch) | überall sonst ‚Reisemittel‘ – gleiche Sache, gleiche Bezeichnung (R-24) | in die nächste App-Version (kleiner Fehler) |
| W-9 | BACKLOG AppDesign | RLB-2 noch ‚prüfen‘, obwohl P-31 ‚alles ok‘ war; APD-5 steht als ‚bereit‘ unter ‚0. Nächste Version‘, ist aber noch nicht geklärt; Kopf ‚Stand 13.10.‘ | Backlog nachführen (erledigt mit dieser Datei) |

## 3. Doppelt (für Schritt 2 – zusammenführen)

- **Leisten fest:** Grundprinzipien 1 · R-05 · R-28 · 15.3 · 15.17 (Tastatur der Suche) · 13 (visualViewport).
- **Tabellen:** 9 · 10 (Ausgabe-Design) · 15.13 · R-08, R-25, R-29, R-37, R-52.
- **Backup:** 10 (‚Backup einmal am Tag‘) · 15.4 (Mehr-Menü, Backup laden) · 15.19 · R-10, R-45, R-46.
- **Abgleich:** 15.4 (‚Backup laden = Abgleich‘) · 15.18 · R-41 bis R-44.
- **Menüs beim Drehen / Kontextmenü:** 15.4 · 15.6 · R-40 (sehr lang, mehrere Prüfungen in einer Regel).
- **Versionen:** Designrichtlinie 11, 12, 14 · Zusammenarbeit 7, 8, 9 · README AppDesign.
- **Allgemein oder App fragen:** Designrichtlinie 12 · Zusammenarbeit 5 Nr. 3 · Abschnitt 0 Nr. 4.
- **Testfälle selbst ableiten:** Zusammenarbeit 7 (seit 1.16.0) · Abschnitt 0 Nr. 1 und Nr. 5.

## 4. Umgesetzt und festgehalten (geprüft)

Von neu nach alt; in Klammern die Stelle.

- **14.10. Arbeitsprozess 2.0:** Testfall-Liste, parallel und sparsam, Regeln zusammenfassen, allgemeine Regel erfragen,
  Safari nachbilden, Varianten, Fenster mit ‚Ich schreibe im Chat‘, kleine Versionen, Bericht mit Aufzählung und
  ‚warum übersehen‘, ein Thema je Sitzung, Übergabe, Lagebild, kurze Rückmeldung (Zusammenarbeit 0). Feste Fassung je
  App und Veröffentlichungs-Skript beschlossen, Umsetzung APD-5.
- **14.10. Tabellen:** Mustertabelle der Ausgabe, Linien gleich stark, Zebra je Tabellenzeile, zusammengefasste erste
  Spalte = eine Zeile (R-52).
- **13./14.10.:** PDF im Abgleichbericht (15.18), R-37 überall, oberster Tag beim Drehen (R-51), jede Meldung deutsch
  (Zusammenarbeit 1), Prüfung zuerst schärfen (Zusammenarbeit 7), README ‚Verwendete Versionen‘ (R-49), Testfälle
  mit /0 und Meldung je Gerät (R-50), ‚fertig erst nach Pages‘ (Zusammenarbeit 7), Versionskopplung (R-48).
- **13.10. Abgleichbericht:** kurzes Fenster mit Schaltfläche, Bericht als Vorschau, Spaltenköpfe halbfett,
  Unverändertes nur als Anzahl, beide Spalten ‚Vom Gerät‘ und ‚Geändert am‘ behalten (R-44, 15.18).
- **12./13.10.:** Seitenleiste behält beim Drehen ihren Zustand (R-47), Kontextmenü über der Backup-Kachel (R-40),
  Gerätenamen statt ‚drüben‘ (R-43), Usertests Schritt für Schritt (Zusammenarbeit 7), Backup erstellen/laden als
  allgemeiner Standard mit Kacheln (15.19, R-45, R-46), Abgleich als allgemeine Regel mit Fall-Tabelle (15.18,
  R-41–R-44), Menüs beim Drehen (R-40), Gelöschtes bleibt gelöscht mit Hinweis (R-43), je Feld das Neuere (R-42).
- **11./12.10.:** Leiste keinen Millimeter (R-05), gewählter Eintrag bleibt sichtbar (15.4), lange Wörter und
  Smiley-Reihen brechen um (R-37, 9), gleicher Baustein iPad/iPhone (R-36), Regelkatalog mit Prüfskript (17),
  Leiste federt nicht (R-05), Titel in der Leiste (R-09, 15.17), Anzahl unter dem Titel (R-21), Backup-Kachel immer,
  gelb ohne Backup heute (R-10), senkrechte Kapsel (R-19), Großbuchstabe am Zeilenanfang und nach Vorschlag (R-07),
  Diktieren nur über die Tastatur (R-17), Doppeltippen vergrößert nie (R-04), Bezeichnung und Feld zusammen (R-06),
  gelbe Markierung ohne blauen Rand (R-08), nur der Vordergrund reagiert (R-01), Kacheln und Trennlinien im Kasten
  (R-30, R-31), ‚geändert am … · Gerät‘ (15.4), Suche gleich auf iPad und iPhone (R-03, 15.17), x ohne blauen Rahmen
  (R-02).
- **10.10.:** Zeit und Token als kleine Zeile, Arbeitszeit ohne Wartezeit, Neubeginn je Nachricht, Fenster nur mit
  Frage und Schaltflächen (Zusammenarbeit 2), Testskripte im Repo (`tests/`), Häkchen vorne bei Menüpunkten mit Icon
  (15.6), iPhone-Ansicht allgemein (15.17).
- **09.10.:** Design-Repo AppDesign, öffentlich, versioniert eingebunden (14), erst prüfen dann Neues, Auswahlfenster
  immer wieder (Zusammenarbeit oben, 2), Apple-Abgleich und HIG-Checkliste (Zusammenarbeit 3, Designrichtlinie 16),
  Vergleichsbilder (`apple-referenz/`), Sammelversionen (6), einfache Anführungszeichen (R-14), Gewähltes bleibt
  blau (R-16), Mehr-Menü mit Strich ohne Leerzeilen und Speicher-Satz (15.4), dauerhafter Speicher (1).
- **08.10.:** nie ohne ‚Ja‘ bauen (Zusammenarbeit oben), Backlog mit Priorität und Erinnerung (Zusammenarbeit 4),
  Apple-like mit HIG-Links (Zusammenarbeit 3, Designrichtlinie), Auswahl-Kapsel wischbar mit Markierung als Kreis
  (15.12), Seitenleiste wie Safari und beim Start offen (15.4), Leiste bei offener Tastatur sichtbar (R-28), Suche
  springt nach Pause unter die Suchzeile (15.2), PDF ohne Seitenleiste (13), Betragsfelder rechtsbündig und
  dynamisch (8, R-27), Tabellenköpfe so groß wie Zellen (3), Viererpakete und ‚erst hell und quer‘ (Zusammenarbeit
  5), Häkchen grau → blau (8, 15.8), Textfelder wachsen (8), share nur Icon (R-34), Datumsfelder schmal mit Von/Bis
  (R-26), x mit Rückfrage ‚Änderungen verwerfen‘ (6), Text mittig zum Icon (3), Menü-Icons vor dem Text (5, 15.6),
  ‚Einstellungen‘ statt ‚Reiselogbuch bearbeiten‘ (6), Darstellung als Untermenü (2), Filter beim Öffnen ‚Alle‘
  (15.3), leer → ‚Neues …‘ öffnet von selbst (7).
- **07.10.:** Seitenleiste, Kopfzeile mit Kapsel und Mehr-Menü, Suche als zweite Zeile, keine Glas-Leiste (1, 15.3),
  alle Schaltflächen und Suchfelder schweben (R-22), Suchfeld-Komponente (15.2), Treffer im Fokus hellorange (2),
  zierliche Schatten (R-35), Apple-Blau nur für die Hauptaktion (4), Options-Kapsel ohne Kästchen (15.16), Breite
  ändert sich beim Einschalten nicht (4), Schatten um Tabellen und Eingabefelder (9, 15.11), Antwortformat ja/nein
  und a/b/c (Zusammenarbeit 2), allgemein oder App fragen (Designrichtlinie 12).
- **05./06.10.:** dreistufige Versionen (11), Designrichtlinien als eigene Dateien mit Verweis statt Wiederholung
  (12), Pflichtfelder nicht kennzeichnen, Meldung beim Feld und erst nach Eingabe (8), alle Schaltflächen 44 px,
  Icon-Schaltflächen quadratisch (4), gleiche Bezeichnung für gleiche Aktion, echte Schaltflächen, kein ‚Close‘
  (R-23, R-24), Tabellenkopf grau mit dunkleren Rändern, Zebra, äußerer Rand wie Kopf, alle Tabellen gleich (2, 9),
  Lucide-Icons (5), Fensterbreite nach Inhalt, höchstens 90 % (7), Vorschau immer hell (10), Links ohne
  Unterstreichung (9), keine zwei Leerzeichen im Dateinamen (10), Versionszeile im Mehr-Menü (15.4).
- **04.10.:** App-Funktionen (Reiselogbuch) – in PROMPT.md und Designrichtlinie Reiselogbuch; spätere Wünsche haben
  frühere ersetzt (z. B. ganze Euro → zwei Nachkommastellen, Hilfeseite entfällt, Kurzbefehl verworfen).

Bewusst verworfen und so festgehalten: Glas-Leiste, Kennzeichnung von Pflichtfeldern, harte Schatten, KI-Angabe in
der Versionszeile, Maps-Treffer prüfen.
