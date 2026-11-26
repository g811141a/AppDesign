# RLB-126: Was kann die AD-Bean `recentlydeleted` übernehmen?

**26.11.2026, Sitzung 0164** · Frage des Nutzers: Auch künftige Apps sollen gelöschte Objekte N Tage zurückholen können. Welche Teile kann eine
AD-Bean übernehmen, und ist das sinnvoll? Die Zahl der Tage soll je App einstellbar sein, Standard 30.

## Ist eine AD-Bean sinnvoll?

**Ja.**
- **Gleich in jeder App:** Bei Apple läuft ‚Zuletzt gelöscht‘ in Notizen, Fotos, Dateien, Erinnerungen und Freeform gleich, mit 30 Tagen
  (Apple-Abgleich 0164, Quellen in `0164 RLB-126 Apple-Abgleich.md`). Die Bedienung soll in all unseren Apps genauso einheitlich sein (R-1.13, 0 Nr. 4).
- **Fehleranfällig:** Fristen, Abgleich zwischen zwei Geräten und Backup sind genau die Teile, die man nur einmal richtig bauen und prüfen will.
  `createSync` ist heute schon allgemein und kennt gelöschte Einträge (`data.deleted`).
- **Wenig App-Eigenes:** Nur das Objekt selbst (was es ist, wie es aussieht) gehört der App.

**Zu bedenken:**
- **Speicher:** Gelöschte Inhalte bleiben bis zu N Tage im Speicher. Bei großen Objekten (z. B. Fotos, APD-60) muss man das prüfen.
- **Framework:** Die Oberfläche der Bean (Eintrag, Menü, Abfrage) soll die Befehle und die Steuer-Bean des neuen Frameworks nutzen. Die Daten
  dagegen hängen nicht davon ab.

## Aufteilung (Vorschlag)

| Teil | AD-Bean `recentlydeleted` | App |
|---|---|---|
| **Frist** | Eigenschaft **`days`** (Standard **30**), je App beim Anlegen setzbar: `createRecentlydeleted(…, { days: 30 })`. Restzeit = Löschzeitpunkt + `days` − heute, immer neu gerechnet. Ändert eine spätere Version `days`, gilt die neue Frist auch für schon Gelöschtes. | wählt `days`, wenn nicht 30 |
| **Daten** | hält je Objekt `{ id, item, at, on }` (ganzer Inhalt, Zeitpunkt, Gerät); räumt Abgelaufenes beim Start und beim Tageswechsel endgültig weg | – |
| **Methoden** | `remove(item)` verschiebt nach ‚Zuletzt gelöscht‘ · `restore(id)` · `purge(id)` (endgültig) · `purgeAll()` · `daysLeft(id)` · nur lesen: `items` | ruft `remove` statt selbst zu löschen |
| **Ereignisse** | `restore` (Objekt zurück an die App, die es an den alten Platz setzt) · `purge` · `change` | fügt das Objekt bei `restore` wieder ein |
| **Abgleich** | arbeitet mit `createSync`: Löschen gilt auf beiden Geräten, Gelöschtes kommt dort ebenfalls nach ‚Zuletzt gelöscht‘; Wiederherstellen zählt als Änderung; endgültig löschen gilt überall | – |
| **Backup** | liefert ihre Daten mit Löschdatum fürs Backup und übernimmt sie beim Laden (später mit der AD-Bean `backup`, APD-148) | – |
| **Oberfläche** | Eintrag ‚Zuletzt gelöscht‘ am Ende der Seitenleiste bzw. Startliste, nur wenn nicht leer · Zeile mit ‚noch N Tage‘ · Kontextmenü und Wischen: Wiederherstellen · Endgültig löschen · Abfrage nur beim endgültigen Löschen · Hinweis in der Vorschau ‚Gelöscht am … – wird in N Tagen endgültig gelöscht.‘ mit ‚Wiederherstellen‘ | Bezeichnung des Objekts (z. B. ‚Reiselogbuch‘, Mehrzahl ‚Reiselogbücher‘) als Eigenschaft; Titel und Untertitel der Zeile |
| **Vorschau** | Rahmen: nur lesen, Hinweis, ‚Wiederherstellen‘ | zeichnet den Inhalt, wie bei gesperrten Reiselogbüchern (RLB-125) |
| **Altdaten** | – | übernimmt alte Daten beim Wechsel des Datenmodells (`normalize`) |

## Was daraus für RLB-126 folgt

- Im Reiselogbuch ist `days` = 30 (Eckpunkt 1, 0160).
- Das Muster zeigt die Oberfläche so, wie die Bean sie bauen würde. Am Gerät sieht man also gleich das künftige Verhalten aller Apps.
- **Als allgemeine Regel?** „Gelöschte Objekte bleiben N Tage (Standard 30, je App einstellbar) unter ‚Zuletzt gelöscht‘ und lassen sich
  wiederherstellen; normales Löschen ohne Abfrage, endgültiges Löschen mit Abfrage.“ Den genauen Wortlaut und die Nummer im Katalog schlage ich mit
  dem Muster vor (0 Nr. 29).
