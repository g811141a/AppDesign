# Klärung APD-145 (Namensraum `AD`), APD-142 (Allgemeines nach AppDesign), RLB-126 (‚Zuletzt gelöscht‘)

Stand 21.11.2026 · Sitzung 0150 · nur Klärung, nichts gebaut

## APD-145 – Namensraum `AD`

**Heute (gezählt in dieser Sitzung):** `ui.js` stellt der App **69 Namen** bereit (`v4/schnittstelle.json`, Teil `app`) und den Prüfungen 23 weitere. Im Reiselogbuch
(`index.html`) stehen **317 Aufrufstellen**. Von den 69 Namen sind **19 deutsch oder gemischt** (`ansagen`, `aufzaehlung`, `darstellungMenuItem`, `ersterFehler`,
`feldFehler`, `fokus`, `glasAusBackup`, `halten`, `inhaltSchmal`, `leerHtml`, `leerSuche`, `messungMenuItems`, `navAnmelden`, `navSeite`, `navVor`, `navZurueck`,
`onNeuerTag`, `rolle`, `rollen`). Zusammenstöße verhindert heute R-1.14 (`checkSchnittstelle`).

**So macht es Apple bzw. das Web** (belegt in Sitzung 0145, `arbeit/0145 Praefix UI.md`): Apple setzt Präfixe nur vor Klassen, weil Objective-C keinen Namensraum
kennt („Method names do not have a prefix“), `UI` ist reserviert; SwiftUI ohne Präfix. Im Web hängen Funktionen an einem Objekt: `CSS.escape()`, `Intl.DateTimeFormat`,
`Math.max()`.

**Vorschlag:** Alles aus `ui.js` hängt an `AD` (`AD.openMenu(…)`, `AD.inform(…)`, `AD.createSync(…)`, Bean-Exemplare `AD.alert`, `AD.sourcehighlight`). Global bleibt nur
`AD`. R-1.14 prüft dann: Die App nutzt von AppDesign nur `AD.<Name aus schnittstelle.json>`.

**Frage 1 – Umfang:**
- a) **(Empfohlen)** Namensraum `AD` und dabei die 19 deutschen Namen englisch (Zusammenarbeit 1: Bestehendes wird umbenannt, wenn es ohnehin umgebaut wird). Jede
  Aufrufstelle ändert sich nur einmal statt zweimal.
- b) Nur der Namensraum, die Namen bleiben; Englisch später.

**Frage 2 – Version:** Alle Namen ändern sich, ältere Apps verstehen die neue Schnittstelle nicht.
- a) **(Empfohlen)** **Hauptversion AppDesign 5.0.0** mit eigenem Ordner `v5/` (AppDesign-`CLAUDE.md`: ‚eine Hauptversion bekommt `v5/`‘). Die festen Fassungen 4.x bleiben
  unverändert, das Reiselogbuch wird nach Rückfrage auf 5.0.0 gehoben. Keine doppelten Namen.
- b) In 4.x beide Wege: `AD.…` neu, die alten Namen bleiben als Verweis bis zur nächsten Hauptversion. Dann gibt es eine Zeit lang zwei Namen je Baustein, die Regeln
  und Prüfungen müssen beide kennen.

## APD-142 – Allgemeines aus der App nach AppDesign

**Heute** (Befund APD-135/U-14 bis U-25): rund 450 Zeilen in `index.html` sind nach Art und Name allgemein, davon rund 175 eindeutig – Versionsprüfung beim Start
(U-14, 11 Zeilen, fast wörtlich auch in `vorlage/index.html`), beide Suchzeilen (U-16, 95 Zeilen), Backup-Ablauf (U-18, 70 Zeilen), `sw.js` bis auf 2 Zeilen (U-21);
teils allgemein: Seitenleiste (U-15), Mehr-Menü (U-17), Ausgabe/PDF (U-19), Start (U-20), Kopfzeile (U-22), CSS (U-24).

**Frage 3 – Reihenfolge:**
- a) **(Empfohlen)** Erst APD-145 als Grundlage, dann APD-142 in kleinen Versionen, jede neue Bean gleich unter `AD`: 1. Versionsprüfung (U-14) und `sw.js` (U-21),
  2. die Suchzeile als **eine** Bean für beide Stellen (U-16), 3. Backup-Ablauf (U-18), 4. Ausgabe/PDF zusammen mit dem Abgleichbericht (U-19), dann der Rest. Je Schritt
  eine Version mit Gegenprobe (APD-135/B-3).
- b) Erst APD-142, dann APD-145. Dann bekommen die neuen Beans zuerst globale Namen, die APD-145 gleich wieder ändert.

**Zeitplan (Vorschlag):** nach 4.67.2, RLB-125 und B-3.3 Schritt 2, weil die drei schon bereit bzw. bestätigt sind.

## RLB-126 – ‚Zuletzt gelöscht‘

**So macht es Apple:** belegt (HIG ‚Alerts‘, `developer.apple.com/…/alerts.json`, in dieser Sitzung gelesen): In Freeform gibt es zuletzt gelöschte Boards. Wer eines
**endgültig** löscht, bekommt eine Abfrage („someone chooses to permanently delete a recently deleted Freeform board. An alert then appears … to ask for
confirmation“). **Vermutung** (nicht belegt, support.apple.com nicht erreichbar): Notizen und Fotos halten Gelöschtes 30 Tage in ‚Zuletzt gelöscht‘.

**Vorschlag (Grundform):**
- Ein gelöschtes Reiselogbuch kommt nach **‚Zuletzt gelöscht‘** am Ende der Seitenleiste bzw. Startliste – nur sichtbar, wenn dort etwas liegt.
- Es bleibt **30 Tage**, danach verschwindet es beim nächsten Start endgültig.
- Antippen öffnet es **als Vorschau nur zum Lesen**, wie ein gesperrtes (RLB-125), mit dem Hinweis ‚Gelöscht am … – wird in N Tagen endgültig gelöscht.‘ und
  **‚Wiederherstellen‘**. Kontextmenü: Wiederherstellen · Endgültig löschen (rot, mit Abfrage wie bei Freeform).
- **Abgleich:** Löschen gleicht sich wie heute ab; Wiederherstellen zählt als Änderung und holt es auch auf dem anderen Gerät zurück (wie Fall 3 in 15.18). Das gelöschte
  Reiselogbuch steht im Backup, damit Wiederherstellen auch nach einer Neuinstallation geht (das Backup wird größer).
- **Folge für RLB-125:** Die freigegebene Lösch-Abfrage L-4 sagt ‚Das kann nicht rückgängig gemacht werden.‘ Mit RLB-126 stimmt das nicht mehr; neu wäre z. B.
  ‚‚Toskana‘ mit allen 42 Einträgen löschen? Es bleibt 30 Tage unter ‚Zuletzt gelöscht‘.‘ und ‚Erst Backup erstellen‘ (L-5) entfiele. Wortlaut erst mit RLB-126.

**Frage 4 – allgemein oder App:**
- a) **(Empfohlen)** Allgemein: neue AD-Bean `recentlydeleted` (Vorbild Apples *Recently Deleted*), denn jede App mit Einträgen braucht dasselbe; `createSync` muss es
  ohnehin kennen.
- b) Nur im Reiselogbuch.

Danach (bei RLB-126, Priorität 3): Muster iPad quer hell mit Testfall-Liste, später.

## Entschieden (Nutzer 21.11.2026, Sitzung 0150, im Fenster)

- **APD-145/J-1** (Frage 1): a – Namensraum `AD` und dabei die 19 deutschen Namen englisch.
- **APD-145/J-2** (Frage 2): a – Hauptversion AppDesign 5.0.0 mit `v5/`; feste Fassungen 4.x bleiben, das Reiselogbuch wird nach Rückfrage gehoben.
- **APD-142/J-1** (Frage 3): a – erst APD-145, dann APD-142 in kleinen Versionen (U-14 + U-21, U-16, U-18, U-19, Rest), jede neue Bean unter `AD`.
- **RLB-126/J-1** (Frage 4): a – allgemein, AD-Bean `recentlydeleted`; Grundform wie oben als Vorschlag, Muster später.
