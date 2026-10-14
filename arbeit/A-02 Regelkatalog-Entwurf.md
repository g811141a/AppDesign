# A-02 Schritt 2 – Entwurf: Regelkatalog nach Themen

**Entwurf 14.10.2026** · noch keine Version · ersetzt nach Freigabe Abschnitt 17 der Designrichtlinie allgemein
(R-01 bis R-52).

**Ergebnis:** aus 52 Regeln werden **34** in **10 Themen**. Jede Regel hat **genau eine** automatische Prüfung;
was nur am Gerät geht, steht zusätzlich in der Spalte ‚Gerät‘ (kommt in die Prüfliste, wenn eine Version es betrifft).
5 Regeln sind neu – sie standen bisher nur im Text, ohne Nummer und ohne Prüfung. R-50 (Prüfliste) wandert in die
Zusammenarbeit allgemein, weil es eine Arbeitsregel ist, keine Gestaltungsregel.

**Nummern:** `R-<Thema>.<Nr>` (z. B. R-6.2 = Thema 6 Tabellen, Regel 2). So kann eine neue Regel in ihr Thema
eingefügt werden, ohne alles neu zu nummerieren, und alte (R-05) und neue Nummern (R-2.1) sind nicht zu verwechseln.
Eine Zuordnung alt → neu steht am Ende.

**Aufbau der Richtlinie danach:** Der Katalog ist die **eine** Stelle je Regel; Abschnitte 1–15 beschreiben nur noch
Werte und Komponenten (Farben, Maße, Aufbau) und verweisen auf die Regel, statt sie zu wiederholen.

---

## 1. Aufbau und Grundsätze

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-1.1 | **Gleiche Funktion = gleicher Baustein, gleiche Bedienung** auf iPad und iPhone: eine Umsetzung, nur die Anordnung unterscheidet sich (Seitenleiste = Startliste); Aktionen und Suche oben in der Kapsel, unten nur feste Hinweise (Backup-Kachel) | hig.mjs – Gerätevergleich des Aufbaus | – | R-03, R-32, R-36 |
| R-1.2 | **Darstellung** folgt dem Gerät (‚Automatisch‘), im Mehr-Menü übersteuerbar (Automatisch · Hell · Dunkel) | hig.mjs | – | R-33 |
| R-1.3 | **Nie ungewollt vergrößern:** Doppeltippen vergrößert nicht; Eingabefelder mindestens 16 px (sonst vergrößert iOS beim Antippen) | hig.mjs | iOS-Tastatur | R-04, R-20 |
| R-1.4 | **Nur der Vordergrund reagiert:** offenes Fenster sperrt die Seite, Menü und Sprechblase fangen Wischen ab, daneben tippen schließt | hig.mjs | – | R-01 |

## 2. Leisten, Suche, Scrollen

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-2.1 | **Leisten stehen fest – keinen Millimeter:** Kopfzeile, Seitenkopf, Seitenleisten-Kopf, mit und ohne Suchzeile, beim Wischen, am Rand, bei offener und beim Schließen der Tastatur; nichts federt; erstes Wischen bei offener Tastatur schließt nur die Tastatur | hig.mjs – Lage der Leiste beim Scrollen gemessen (mit Tastatur nachgebildet) | Federn, Tastatur | R-05, R-28 |
| R-2.2 | **Titel in der Leiste:** Titel einer Inhaltsseite steht in der Leiste; unter dem Titel der Seitenleiste bzw. Startliste klein und grau die Anzahl | hig.mjs | – | R-09, R-21 |
| R-2.3 | **Suche:** Suchzeile unter der Leiste über die volle Breite; Treffer ‚3 von 57‘ bzw. ‚0‘; nach kurzer Pause steht der Treffer direkt unter der Suchzeile; Pfeile ohne Umlauf; gefiltert auf Einträge mit Treffern; gleich auf iPad und iPhone | Ablauf (Suche) | – | **neu** (bisher nur 15.2) |

## 3. Schaltflächen

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-3.1 | **Antippflächen** 44 pt, in Kapseln und Schaltern mindestens 28 pt; reine Icon-Schaltflächen quadratisch | hig.mjs | – | R-11 |
| R-3.2 | **Schweben und Kapseln:** alle Schaltflächen und Suchfelder schweben (Lichtkante, zierlicher Schatten); mehrere nebeneinander stehen in einer Kapsel, Nach oben / Ans Ende in einer senkrechten Kapsel | hig.mjs | – | R-19, R-22, R-35 |
| R-3.3 | **Jede Farbe hat eine Bedeutung:** blau gefüllt nur die Hauptaktion im Fenster (höchstens eine); Gewähltes bleibt blau getönt, solange sein Menü, Fenster oder seine Abfrage offen ist; Grün nur für eingeschaltete Schalter; Rot nur für Löschen | hig.mjs | – | R-16 (+ Abschnitt 4) |
| R-3.4 | **Kein Fokus-Rahmen** beim Antippen, beim Öffnen eines Fensters und im Suchfeld | hig.mjs | – | R-02 |

## 4. Menüs, Abfragen, Fenster

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-4.1 | **Menüs:** Icon vor dem Text, keine Linien zwischen einzelnen Punkten, Gruppen durch eingerückten Strich, ‚… löschen‘ rot am Ende, graue Zusatzinfos unten nach dem Strich, Untermenü eine Ebene | hig.mjs | – | R-15 |
| R-4.2 | **Kontextmenü** einer Kachel: daneben bzw. (iPhone) darunter, immer vollständig und ganz über der Backup-Kachel; die Liste rückt dafür; ohne ‚Öffnen‘ | kontextmenue.mjs | – | R-40 (Teil Kontextmenü) |
| R-4.3 | **Abfragen und Meldungen:** keine Systemfenster; Abfrage als Sprechblase an der Schaltfläche, rote Schaltfläche mit dem Verb, ‚Abbrechen‘ zuletzt; mehrere Wege: empfohlener blau zuerst, zerstörender rot; Meldung im kleinen Fenster mit höchstens einer Schaltfläche zu den Einzelheiten | hig.mjs | – | R-23 (Teil Systemfenster), R-38 |
| R-4.4 | **Fenster-Kopfzeile:** x links, Häkchen rechts – grau, nach einer Änderung blau; x mit Änderungen fragt ‚Änderungen verwerfen‘ / ‚Weiter bearbeiten‘ | Ablauf (Fenster) | – | **neu** (bisher 6, 15.8, HIG 9) |
| R-4.5 | **Passt immer auf den Bildschirm:** Menü, Sprechblase und Fenster ganz sichtbar (auch iPhone quer), zu hoher Inhalt scrollt darin; Fenster auf dem iPhone bildschirmfüllend | hig.mjs | – | R-18, R-39 |

## 5. Eingaben

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-5.1 | **Felder:** Bezeichnung und Feld gehören zusammen (Umbruch nur davor); Datumsfelder so breit wie das Datum mit Kalender-Icon; Betragsfelder rechtsbündig, ‚4.850,00 €‘ | hig.mjs | – | R-06, R-26, R-27 |
| R-5.2 | **Texteingabe:** Großbuchstabe am Zeilenanfang und nach einem Vorschlag; Textfelder wachsen mit; Diktieren nur über die Mikrofon-Taste der Tastatur (kein eigener Knopf) | Ablauf (Tastatur) | iOS-Tastatur | R-07, R-17 |
| R-5.3 | **Fehlermeldungen:** rot direkt unter dem Feld (Feld rot umrandet), erst nach einer Eingabe bzw. beim Häkchen; Pflichtfelder werden nicht gekennzeichnet | Ablauf (Fenster) | – | **neu** (bisher 8) |
| R-5.4 | **Auswahl-Kapsel:** mehrere Auswahl-Schaltflächen in einer Kapsel, seitlich wischbar mit Verlauf am Rand; Markierung als eigene Form innen, Breite ändert sich nicht | hig.mjs | Wischen | **neu** (bisher 15.12) |

## 6. Tabellen, Kästen, Ausgabe

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-6.1 | **Tabelle und Kasten in der App:** Kopf grau, Linien zwischen allen Spalten, **Zebra je Tabellenzeile** (zusammengefasste erste Spalte = eine Zeile), gelbe Markierung ohne blauen Rand; Kasten mit Feldern (iPhone) mit Linien waagrecht und senkrecht | hig.mjs | – | R-08, R-25, R-30 (+ F-3) |
| R-6.2 | **Mustertabelle der Ausgabe** (`outputCss`): jede Tabelle in Ausgabe, Vorschau und Bericht, Zebra je Tabellenzeile, keine eigene Nachbildung | hig.mjs – Vergleich mit unsichtbarer Mustertabelle | – | R-52 |
| R-6.3 | **Kein Text ragt hinaus:** zu lange Wörter und Smiley-Reihen brechen um, hängender Einzug (Folgezeilen unter dem Text) – überall, auch in Fenstern, Vorschauen, Berichten | hig.mjs – jede sichtbare Zelle, auch nach seitlichem Wischen (100 × ‚a‘) | – | R-29, R-37 |
| R-6.4 | **Ausgabe und Vorschau:** immer hell; Vorschau zeigt genau die Datei, in voller Seitenbreite, seitlich wischen (iPad und iPhone); Kapsel [PDF · Teilen]; Dateinamen nach Muster | Ablauf (Ausgabe) | Teilen, Drucken | **neu** (bisher 7, 10; F-4) |

## 7. Seitenleiste und Liste

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-7.1 | **Zentrale Liste als Kacheln:** höchstens ein Eintrag blau; je Kachel ‚geändert am … · Gerät‘; Kacheln laufen unter dem Kopf und hinter der Backup-Kachel durch; Position bleibt beim Neuaufbau, der gewählte Eintrag bleibt sichtbar | hig.mjs | – | R-31 (+ Teil R-44, 15.4) |

## 8. Drehen

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-8.1 | **Drehen ändert nur die Anordnung:** offene Menüs, Untermenüs und Sprechblasen werden neu ausgerichtet (Schaltfläche bleibt blau); die Seitenleiste behält ihren Zustand; oben bleibt derselbe Eintrag stehen (Safari nachgebildet) | hig.mjs – Drehprüfung jeder Ansicht, hin und zurück, mit Zwischengrößen | Drehen | R-40 (Teil Drehen), R-47, R-51 |

## 9. Backup und Abgleich

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-9.1 | **Backup erstellen:** Backup-Kachel immer da (gelb, solange heute keines), Mehr-Menü; Teilen-Menü; Dateiname; Fenster ✅/⚠️; zählt nur abgeschlossen, je Gerät | backup.mjs | iCloud, Teilen | R-10, R-45 |
| R-9.2 | **Backup laden:** Abfrage mit Zeitpunkt, Gerät und ‚neuer/älter‘; Kacheln Abgleichen (blau) und Ersetzen (rot) mit Erklärung; unlesbare Datei ⚠️; Abbrechen ändert nichts | backup.mjs | – | R-41, R-46 |
| R-9.3 | **Abgleichen:** je Feld gilt das Neuere; leere Felder überschreiben nichts; Gelöschtes bleibt gelöscht, solange danach nicht geändert (Hinweis nennt die Geräte); Zähler: größerer Wert; Einstellungen je Gerät | abgleich.mjs (Fälle 1–20) | – | R-42, R-43 |
| R-9.4 | **Ergebnis:** kleines Fenster ohne Einzelheiten, Schaltfläche ‚Abgleichbericht anzeigen‘ nur bei Inhalt; Bericht als Vorschau wie die Ausgabe | abgleich.mjs | – | R-44 |

## 10. Texte und Versionen

| Nr. | Regel | Prüfung | Gerät | ersetzt |
|---|---|---|---|---|
| R-10.1 | **Texte:** deutsch, kein ‚OK‘/‚Close‘/‚Cancel‘; Anführungszeichen ‚…‘; gleiche Aktion = gleiche Bezeichnung und gleiches Icon überall; Teilen nur als Icon | hig.mjs | – | R-14, R-23 (Teil Texte), R-24, R-34 |
| R-10.2 | **Lesbarkeit:** Schrift mindestens 11 pt; Kontrast 4,5 : 1 bzw. 3 : 1, hell und dunkel | hig.mjs | – | R-12, R-13 |
| R-10.3 | **Versionskopplung:** ui.js/design.css mit `?v=`; Versionen stimmen überein, sonst Hinweis beim Start; Versionszeile nennt AppDesign (mit A-05: feste Fassung je App) | version.mjs | – | R-48 |
| R-10.4 | **README ‚Verwendete Versionen‘** ganz oben, je Version und Link | doku.mjs | – | R-49 |

**Aus dem Katalog genommen:** R-50 (Prüfliste mit /0, Meldung je Gerät) → Zusammenarbeit allgemein 7 als Arbeitsregel,
Prüfung doku.mjs bleibt.

---

## Zuordnung alt → neu

| alt | neu | alt | neu | alt | neu | alt | neu |
|---|---|---|---|---|---|---|---|
| R-01 | R-1.4 | R-14 | R-10.1 | R-27 | R-5.1 | R-40 | R-4.2, R-8.1 |
| R-02 | R-3.4 | R-15 | R-4.1 | R-28 | R-2.1 | R-41 | R-9.2 |
| R-03 | R-1.1 | R-16 | R-3.3 | R-29 | R-6.3 | R-42 | R-9.3 |
| R-04 | R-1.3 | R-17 | R-5.2 | R-30 | R-6.1 | R-43 | R-9.3 |
| R-05 | R-2.1 | R-18 | R-4.5 | R-31 | R-7.1 | R-44 | R-9.4 |
| R-06 | R-5.1 | R-19 | R-3.2 | R-32 | R-1.1 | R-45 | R-9.1 |
| R-07 | R-5.2 | R-20 | R-1.3 | R-33 | R-1.2 | R-46 | R-9.2 |
| R-08 | R-6.1 | R-21 | R-2.2 | R-34 | R-10.1 | R-47 | R-8.1 |
| R-09 | R-2.2 | R-22 | R-3.2 | R-35 | R-3.2 | R-48 | R-10.3 |
| R-10 | R-9.1 | R-23 | R-4.3, R-10.1 | R-36 | R-1.1 | R-49 | R-10.4 |
| R-11 | R-3.1 | R-24 | R-10.1 | R-37 | R-6.3 | R-50 | Zusammenarbeit 7 |
| R-12 | R-10.2 | R-25 | R-6.1 | R-38 | R-4.3 | R-51 | R-8.1 |
| R-13 | R-10.2 | R-26 | R-5.1 | R-39 | R-4.5 | R-52 | R-6.2 |

## Was beim Bau dazugehört (für die Version)

- Designrichtlinie allgemein: Abschnitt 17 ersetzen; Abschnitte 1–15 kürzen (Regeltext durch Verweis ersetzen,
  Doppeltes aus Verlauf-Abgleich Abschnitt 3 entfernen); Grundprinzipien nachführen (W-6).
- Prüfskripte: Regelnummern in den Meldungen umstellen; die 5 neuen Regeln bekommen ihre Prüfung (R-2.3, R-4.4, R-5.3
  in vorhandenen Abläufen der App, R-5.4 und R-6.4 neu); Zebra je Tabellenzeile auch in App-Tabellen prüfen (R-6.1).
- Designrichtlinie Reiselogbuch und PROMPT: Verweise auf neue Nummern.
- Vorschlag für die Versionen (höchstens 2 Themen je Version): `v4/` ändert sich nicht, nur Richtlinie und
  Prüfskripte → **AppDesign 4.12.0** (Thema: Regelkatalog neu); danach eine eigene Version für Schritt 3 und 4
  (allgemein statt App, Zusammenarbeit allgemein 2.1.0).
