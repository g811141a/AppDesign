# APD-91 – Suche im Mehr-Menü: Testfall-Liste

Stand 30.10.2026 · Sitzung Reiselogbuch 0056 · **bestätigt** (Nutzer 30.10.2026): Testfall-Liste, Menüs (Muster Bild 1 und 2), Suche in allen (Bild 4 und 5), x-Knopf (Bild 3). Muster iPad quer und iPhone hoch, hell, aus der echten App (Playwright); Regeltexte bestätigt (Nutzer 30.10.2026, 0 Nr. 29).

Entschieden: In der Seitenleiste (iPhone: Startliste) und auf der Seite eines Eintrags steht ‚Suchen‘ (`search`) als erster Punkt
im Mehr-Menü, darunter ein Strich. Die eigenen Lupen-Knöpfe entfallen. Die geöffnete Suchzeile bleibt oben, auch am iPhone. ⌘F sucht
im offenen Eintrag, ohne offenen Eintrag in allen. Beenden: runder x-Knopf rechts in der Suchzeile (`x`, ‚Suche beenden‘, Muster Bild 3) – entschieden (Nutzer 30.10.2026). Der Mehr-Knopf bleibt bei offener Suche normal (nicht blau, waagrecht) – blau und senkrecht heißen ‚Menü offen‘ (APD-87). Abweichungen von Apple: Seitenleiste (Suche im Menü statt sichtbar) und iPhone (Suchzeile oben statt über der Tastatur).

## Regeltexte alt → neu (Wortlaut bestätigt, 0 Nr. 29; beim Bau eintragen)

## 1. 15.2 Suchfeld – Aufbau

**alt:** Lupe (search) · Eingabe „Suchen“ · Trefferanzeige · x-Schaltfläche; rechts daneben Kapsel-Gruppe chevron-up /
chevron-down.

**neu:** Lupe (search) · Eingabe „Suchen“ · Trefferanzeige · x-Schaltfläche; rechts daneben Kapsel-Gruppe chevron-up /
chevron-down, dann der runde Knopf x ‚Suche beenden‘ (schließt die Suchzeile). **Geöffnet** wird die Suche über ‚Suchen‘ (search)
als ersten Punkt im Mehr-Menü, darunter ein Strich (wie ‚Find in Note‘ in Notizen), oder mit ⌘F (R-4.7); eine eigene Lupe in der
Kapsel gibt es nicht. Der Mehr-Knopf bleibt bei offener Suche normal (blau getönt und senkrecht nur bei offenem Menü, 15.6).

### 2. 15.3 Kopfzeile – Aufbau

**alt:** … rechts eine Kapsel mit den wichtigsten Aktionen, zuletzt ellipsis (Mehr-Menü). search in der Kapsel blendet eine
**zweite Zeile** mit dem Suchfeld über die volle Breite ein, Treffer-Navigation rechts.

**neu:** … rechts eine Kapsel mit den wichtigsten Aktionen, zuletzt ellipsis (Mehr-Menü). ‚Suchen‘ im Mehr-Menü blendet eine
**zweite Zeile** mit dem Suchfeld über die volle Breite ein, Treffer-Navigation und x ‚Suche beenden‘ rechts – auf iPad und iPhone
oben (R-4.5).

### 3. 15.4 Seitenleiste – Aufbau

**alt:** Kopf: Überschrift (20 px, fett, linksbündig) · Kapsel [plus | search | ellipsis] (search nur, wenn es Einträge gibt) · …

**neu:** Kopf: Überschrift (20 px, fett, linksbündig) · Kapsel [plus | ellipsis] · … – im Mehr-Menü zuerst ‚Suchen‘ (nur, wenn es
Einträge gibt), darunter ein Strich.

### 4. 15.4 Seitenleiste – Suche in der Liste

**alt:** search im Kopf blendet darunter eine Suchzeile ein (wie 15.2, Platzhalter ‚In allen suchen‘, x, **ohne** Pfeile;
`#side .side-search`), Fokus im Feld. … Gefiltert bleibt, bis x oder search die Suche beendet; … Vorbild Notizen (dort steht das
Feld immer unter dem Titel; hier hinter der Lupe wie im Eintrag – Entscheidung des Nutzers).

**neu:** ‚Suchen‘ im Mehr-Menü der Seitenleiste blendet unter dem Kopf eine Suchzeile ein (wie 15.2, Platzhalter ‚In allen suchen‘,
ⓧ, **ohne** Pfeile, rechts x ‚Suche beenden‘; `#side .side-search`), Fokus im Feld. … Gefiltert bleibt, bis x ‚Suche beenden‘ die
Suche beendet; … Vorbild Notizen (dort steht das Feld immer unter dem Titel; hier im Mehr-Menü wie im Eintrag – Entscheidung des
Nutzers, Abweichung in 16).

### 5. Regelkatalog R-2.3 Suche (Ausschnitt)

**alt:** … **Lupe am Ende der Kapsel**, dahinter nur ellipsis; **auch in der zentralen Liste** (Lupe im Kopf): …

**neu:** … **geöffnet über ‚Suchen‘ als ersten Punkt im Mehr-Menü** (darunter ein Strich) oder ⌘F, **beendet mit dem runden x
rechts in der Suchzeile**, keine Lupe in der Kapsel; **auch in der zentralen Liste** (‚Suchen‘ im Mehr-Menü der Seitenleiste): …

### 6. Regelkatalog R-4.7 Hardware-Tastatur (Ausschnitt)

**alt:** … Esc auf der Seite geht zurück bzw. schließt die darübergelegte Seitenleiste (Fokus auf panel-left); keine Kurzbefehle

**neu:** … Esc auf der Seite geht zurück bzw. schließt die darübergelegte Seitenleiste (Fokus auf panel-left); **⌘F** öffnet die
Suche im offenen Eintrag, ohne offenen Eintrag die Suche in allen; ist die Suche offen, setzt ⌘F nur den Cursor ins Feld; bei
offenem Fenster oder Menü wirkt ⌘F nicht; sonst keine Kurzbefehle

### 7. 16 Bewusste Abweichungen – zwei neue Zeilen

| Was | Messwert | Grund | Entschieden |
|---|---|---|---|
| Suche in der Liste (Seitenleiste, iPhone-Startliste) im Mehr-Menü (Apple: Suchfeld in der Liste immer sichtbar, iPhone unten) | – | Wunsch des Nutzers (APD-91): gleich wie im Eintrag, ruhiger Kopf | 30.10.2026 |
| Geöffnete Suchzeile am iPhone oben (Apple iOS 26: über der Tastatur) | – | oben ohne Springen gemessen (R-4.5, APD-36); in Safaris Leiste über der Tastatur kann eine Web-App nichts einbauen – unten erst mit einer App-Hülle (APD-38, APD-57) | 30.10.2026 |

## Fälle

| Nr. | Gerät / Lage | Handlung | Erwartet |
|---|---|---|---|
| S-1 | iPad quer und hoch, iPhone hoch und quer | Mehr der Seitenleiste bzw. Startliste antippen | ‚Suchen‘ mit Lupe als erster Punkt, darunter ein Strich, dann Backup erstellen, Backup laden, Darstellung |
| S-2 | wie S-1 | Mehr der Seite eines Eintrags antippen | ‚Suchen‘ als erster Punkt, darunter ein Strich, dann Alle Tage … |
| S-3 | alle | Kopfzeilen ansehen | keine eigene Lupe mehr in Seitenleiste und Seite; Kapseln ohne Lücke |
| S-4 | alle | ‚Suchen‘ im Menü der Seitenleiste wählen | Menü zu, Suchzeile ‚In allen suchen‘ offen, Cursor im Feld, Tastatur offen (R-2.3) |
| S-5 | alle | ‚Suchen‘ im Menü der Seite wählen | Menü zu, Suchzeile offen, Cursor im Feld; Verhalten wie heute (15.2) |
| S-6 | alle | runden x-Knopf rechts in der Suchzeile antippen (Seite und Seitenleiste bzw. Startliste) | Suchzeile zu, Filter und Markierung weg, Inhalt ganz oben |
| S-7 | iPhone hoch und quer | Suche öffnen, tippen | Suchzeile oben, springt nicht (R-4.5), niedrig quer 32 px (R-2.4) |
| S-8 | iPad mit Tastatur | ⌘F mit offenem Eintrag | Suche im Eintrag offen, Cursor im Feld |
| S-9 | iPad mit Tastatur | ⌘F ohne offenen Eintrag (Start, iPhone-Liste) | Suche in allen offen |
| S-10 | iPad mit Tastatur | ⌘F bei offener Suche | nur Cursor ins Feld, Begriff bleibt |
| S-11 | iPad mit Tastatur | ⌘F bei offenem Fenster oder Menü | nichts |
| S-12 | alle | ohne Reiselogbuch | kein ‚Suchen‘ im Menü der Seitenleiste (heute: keine Lupe, RLB-92/F-10) |
| S-13 | alle | Drehen mit offener Suche | Begriff, Filter und Treffer bleiben (R-8.1) |
| S-14 | alle | hell / dunkel, große Schrift, Kontrast erhöhen | Menü und Suchzeile lesbar, Strich sichtbar |
| S-15 | alle | Bildschirmleser | ‚Suchen‘ als Menüpunkt; x-Knopf heißt ‚Suche beenden‘ |
| S-16 | alle | Mehr-Knopf bei offenem Menü (APD-87) | senkrechte Punkte auch mit ‚Suchen‘ im Menü |
| S-18 | alle | Suche offen, Menü zu | Mehr-Knopf normal: waagrecht, nicht blau (APD-87 nur bei offenem Menü) |
| S-17 | – | Gegenprobe: Lupe wieder in der Kapsel bzw. ‚Suchen‘ nicht zuerst | Prüfung rot |

## Testfälle (User)

- ⌘F in der Home-Bildschirm-App am iPad mit Hardware-Tastatur: kommt das Kürzel an (Vermutung: ja)?
- Menü und Suchzeile am Gerät ansehen (iPad quer, iPhone hoch).
