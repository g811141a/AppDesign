# APD-87 – Mehr-Knopf zeigt, ob das Menü offen ist: Testfall-Liste

Stand 30.10.2026 · Sitzung Reiselogbuch 0055 · **bestätigt** (Nutzer 30.10.2026): offen zusätzlich zur Hervorhebung drei senkrechte
Punkte (`ellipsis-vertical`), allgemein für alle Mehr-Knöpfe; Muster ‚Menü zu · heute offen · Vorschlag offen‘ (iPad quer, hell).
Apple (iOS 26): Knopf geht in das Menü über, Icon bleibt – bewusste, kleine Abweichung (Nutzer).

## Regeltexte (Wortlaut bestätigt, 0 Nr. 29)

- 15.6 ‚Verhalten‘: „… die Schaltfläche ist so lange gedrückt (blau getönt); der Mehr-Knopf zeigt dabei drei senkrechte Punkte
  (`ellipsis-vertical`) statt der waagrechten – der Wechsel sofort, ohne Bewegung, beim Schließen zurück; daneben tippen schließt.“
- Icon-Tabelle (5): „| Mehr-Menü | `ellipsis`, offen `ellipsis-vertical` | nur Icon, in einer Kapsel |“
- R-4.1: „… graue Zusatzinfos unten nach dem Strich, Untermenü eine Ebene; der Mehr-Knopf zeigt bei offenem Menü drei senkrechte Punkte“

## Fälle

| Nr. | Gerät / Lage | Handlung | Erwartet |
|---|---|---|---|
| E-1 | iPad quer und hoch | Mehr der Seitenleiste antippen, dann daneben tippen | offen: senkrecht und hervorgehoben; zu: waagrecht |
| E-2 | iPad | Mehr eines Reiselogbuchs | wie E-1 |
| E-3 | iPhone hoch und quer | Mehr der Startliste und der Seite | wie E-1 |
| E-4 | alle | Menüpunkt wählen | Menü zu, waagrecht |
| E-5 | iPad mit Tastatur | Esc bzw. ⌘. (R-4.7) | Menü zu, waagrecht |
| E-6 | alle | Untermenü öffnen und schließen | Knopf bleibt senkrecht, solange das Menü offen ist |
| E-7 | iPad | Drehen mit offenem Menü; Knopf danach nicht mehr da | bleibt senkrecht; schließt sich das Menü mit dem Knopf, ist er beim nächsten Erscheinen waagrecht |
| E-8 | alle | ‚Bewegung reduzieren‘ | Wechsel sofort, Bewegungswächter grün (R-1.9) |
| E-9 | alle | hell / dunkel, große Schrift | Icon gleich groß und mittig |
| E-10 | alle | Kontextmenü, Auswahlmenü hinter anderer Schaltfläche | kein Icon-Wechsel |
| E-11 | alle | Bildschirmleser | Bezeichnung bleibt ‚Mehr‘, `aria-expanded` true/false |
| E-12 | – | Gegenprobe: Icon bleibt waagrecht | Prüfung rot |
