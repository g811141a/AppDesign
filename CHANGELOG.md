# AppDesign – Versionsgeschichte

Versionsnummer **Hauptversion.Nebenversion.Korrektur** – gleich der Version der Designrichtlinie
allgemein. Hauptversion = neuer Ordner (`v5/`), Apps werden bewusst umgestellt.

## 4.6.0 – 11.10.2026 (Nebenversion)

AppDesign 4.6.0 · Designrichtlinie allgemein 4.6.0 · Zusammenarbeit allgemein 1.13.0

- **Regelkatalog** (Designrichtlinie allgemein, Abschnitt 17): alle allgemeinen Regeln aus der
  bisherigen Zusammenarbeit nummeriert (R-01 bis R-35), je Regel die Art der Prüfung
  (Skript, Ablauf, Gerät, Muster).
- **HIG- und Regel-Prüfung** (`tests/hig.mjs`): prüft zusätzlich zu den HIG-Punkten die 29
  automatisch prüfbaren Regeln in jeder Ansicht; Gegenprobe mit absichtlich eingebauten Fehlern.
- **Leisten fest auch am iPad (R-05):** Kopfzeile `.nb` fest positioniert (nicht sticky), neben der
  festen Seitenleiste rechts davon; in der Seitenleiste scrollen nur die Einträge (`.side-list`),
  Kopf und Backup-Kachel liegen außerhalb.
- **Zusammenarbeit allgemein 1.13.0:** Abgleich mit dem Regelkatalog vor jedem Muster, Prüfung aller
  automatisch prüfbaren Regeln nach jeder Version, neue Regeln sofort mit Nummer und Prüfung,
  Geräte-Regeln in die Prüfliste, wenn betroffen.

## 4.5.0 – 11.10.2026 (Nebenversion)

AppDesign 4.5.0 · Designrichtlinie allgemein 4.5.0 · Zusammenarbeit allgemein 1.12.5

- Leisten bewegen sich nie: `overscroll-behavior: none` auf `html`/`body` (kein Nachfedern der
  Seite); `.pnav` (iPhone) fest positioniert, der Inhalt beginnt unter ihr (`--pnav-h`, `updateBar`).

## 4.4.0 – 11.10.2026 (Nebenversion)

AppDesign 4.4.0 · Designrichtlinie allgemein 4.4.0 · Zusammenarbeit allgemein 1.12.5

- `updateBar`: ohne großen Titel steht der Titel immer in der Leiste.
- Backup-Kachel `.bhint`/`.bnote` immer sichtbar; `.ok` = heute schon gesichert (weiß, normaler Knopf).
- Anzahl klein und grau unter dem Titel (`.side-head .ttl small`, `.pnav-head small`).
- Großschreibung: `capBefore` (beforeinput) und `capNext(feld)` für das Wort nach einem Vorschlag.

## 4.3.0 – 11.10.2026 (Nebenversion)

AppDesign 4.3.0 · Designrichtlinie allgemein 4.3.0 · Zusammenarbeit allgemein 1.12.5

- Doppeltippen vergrößert die Ansicht nicht mehr (`touch-action: manipulation` für alle Elemente).
- Datumsfelder: Bezeichnung und Feld als `.pair` – Umbruch nur vor der Bezeichnung.
- `ui.js`: `autoCapital` setzt in Fenstern den ersten Buchstaben jeder Zeile (und nach . ! ?) groß.
- Seitenleiste: Hintergrund `--bg`, Kopf bleibt stehen, Einträge als Kacheln mit ›, Backup-Hinweis
  als gelbe Kachel fest unten. iPhone-Startliste: Titel links in der Leiste (`.pnav-head`).
- Bezeichnung im Kasten (`.k.word`) halbfett; Nach oben/Ans Ende in einer senkrechten Kapsel.

## 4.2.0 – 11.10.2026 (Nebenversion)

AppDesign 4.2.0 · Designrichtlinie allgemein 4.2.0 · Zusammenarbeit allgemein 1.12.5

- Nur der Vordergrund reagiert: offene Fenster sperren die Seite dahinter (`lockPage`), Menüs und
  Sprechblasen fangen das Wischen ab (`blockingLayer`), `overscroll-behavior: contain`.
- Fenster öffnen ohne Fokus-Rahmen am x (`showModalQuiet`); kein Rahmen beim Antippen.
- iPhone: großer Titel wandert beim Hochschieben in die Leiste (`updateBar`, `.pnav-title`);
  Kacheln `.ilist.tiles` mit `.irow.current`; fester Hinweis `.bbar .bnote` (gelb, blauer Knopf);
  Kasten `.box .kv` mit Linien waagrecht und senkrecht, Bezeichnung als Wort `.k.word`.
- Seitenleiste: Backup-Hinweis gelb und fest am unteren Rand.
- Korrektur: Kapsel mit Text-Schaltfläche (z. B. [PDF | share]) im Fenster-Kopf auf dem iPhone
  nicht mehr zusammengedrückt.

## 4.1.0 – 10.10.2026 (Nebenversion)

AppDesign 4.1.0 · Designrichtlinie allgemein 4.1.0 · Zusammenarbeit allgemein 1.12.5

- iPhone-Ansicht (Designrichtlinie 15.17): `isPhone()` und Klasse `phone` auf `<html>` (iPhone hoch
  und quer, sehr schmale Fenster); Komponenten Seitenkopf `.pnav`, großer Titel `.ltitle`/`.lcount`,
  Liste `.ilist`/`.irow`, Kasten `.box`/`.kv`, untere Leiste `.bbar` (wandert mit der Tastatur);
  Fenster bildschirmfüllend mit kompakter Kopfzeile; Options-Kapseln unter dem Kasten-Titel.
- Menü: Punkte mit Häkchen **und** Icon (Häkchen vorne, dann Icon und Text).
- `button[hidden]` blendet Schaltflächen zuverlässig aus.
- Rückwärtsverträglich: Apps ohne iPhone-Seiten sehen auf dem iPad unverändert aus.

## 4.0.0 – 09.10.2026 (Hauptversion)

AppDesign 4.0.0 · Designrichtlinie allgemein 4.0.0 · Zusammenarbeit allgemein 1.10.0

- Design-Repo angelegt (S-01, S-02): Designrichtlinie allgemein und Zusammenarbeit allgemein aus
  ReiseLogBuch übernommen (Versionsgeschichte bis 3.6.1 bzw. 1.9.0 siehe dort in den Dateien).
- `v4/design.css`: alle gemeinsamen Komponenten (aus Reiselogbuch 2.4.0, unverändert im Aussehen).
- `v4/ui.js`: Icons, Menüs mit Untermenü, Sprechblase, gedrückte Schaltflächen, Meldung, Fenster,
  Darstellung (folgt dem iPad), Auswahl-Kapsel, Tastatur/sichtbarer Bereich, Beträge.
- `tests/hig.mjs`: HIG-Prüfung für alle Apps; `apple-referenz/`: Vergleichsbilder (iPhone Notizen).
- `vorlage/index.html`: Startpunkt für neue Apps.
- Erste App: Reiselogbuch 3.0.0 – pixelgenau gleiches Aussehen wie 2.4.0 (40 Ansichten verglichen).
