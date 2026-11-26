# RLB-126 ‚Zuletzt gelöscht‘ – Apple-Abgleich und offene Fragen

**26.11.2026, Sitzung 0164** · Grundlage:
- Eckpunkte (Nutzer 23.11.2026, Sitzung 0160): 30 Tage, ‚Zuletzt gelöscht‘ mit Löschdatum im Backup, Löschen gilt beim Abgleich auch auf dem anderen Gerät.
- RLB-126/J-1: allgemein, AD-Bean `recentlydeleted`.
- Grundform: `arbeit/0150 APD-145 APD-142 RLB-126 Klaerung.md`.

**Zu den Quellen:** Die Recherche hat ein Hilfsagent gemacht (Opus, Aufwand hoch).
- support.apple.com war aus der Prüfumgebung gesperrt (Proxy 403). Was mit **(S)** markiert ist, stammt aus Suchergebnissen von support.apple.com.
  Das sind Zusammenfassungen, keine wörtlichen Zitate.
- **Direkt gelesen** hat er nur die HIG.
- Deutsche Bedienwörter sind nur belegt, wo die Quelle eine deutsche Seite ist.

## 1. So macht es Apple

| Frage | Apple | Quelle |
|---|---|---|
| Dauer | Notizen, Fotos, Dateien, Erinnerungen, Freeform: **30 Tage**; Erinnerungen am Mac ‚bis zu 40 Tage‘ | (S) [Notizen](https://support.apple.com/guide/iphone/delete-and-recover-notes-iph904eee369/ios), [Fotos](https://support.apple.com/en-us/104967), [Dateien](https://support.apple.com/en-us/104953), [Freeform](https://support.apple.com/guide/ipad/delete-and-recover-boards-ipadec649248/ipados) |
| Name | ‚Zuletzt gelöscht‘ (für Notizen deutsch belegt) | (S) [iCloud Notizen de](https://support.apple.com/de-de/guide/icloud/mm2f42f05cb9/1.0) |
| Wo | Notizen: Ordner in der Ordnerliste, **nur sichtbar, wenn etwas drin ist**. Freeform: iPad in der Seitenleiste, iPhone in der Ordnerliste | (S) |
| Restzeit ‚noch N Tage‘ | **nicht belegt** | – |
| Öffnen | Freeform: ein Board lässt sich in ‚Zuletzt gelöscht‘ **nicht öffnen**. Notizen: unklar | (S) |
| Wiederherstellen | gedrückt halten → Wiederherstellen; mehrere über Auswählen; Fotos auch ‚Alle wiederherstellen‘ | (S) |
| Normales Löschen | Notizen und Dateien: **keine Abfrage**; Freeform am iPhone: Löschen zweimal antippen | (S) |
| Endgültig löschen | immer mit Abfrage (Notizen ‚Notiz löschen‘, Fotos ‚Von allen Geräten löschen‘) | (S); HIG [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts) (Beispiel Freeform, direkt gelesen) |
| Abgleich | Löschen gilt überall, gelöscht landet auch auf den anderen Geräten in ‚Zuletzt gelöscht‘; endgültig löschen gilt sofort überall | (S) Notizen de, Erinnerungen |
| Wohin zurück | Dateien: an den alten Ort; Notizen: in ‚Notizen‘ bzw. Ordner wählen | (S) |
| Gesperrt | Fotos: das Album ‚Zuletzt gelöscht‘ selbst ist mit Face ID gesperrt; gesperrte Notizen: nicht belegt | (S) [Fotos](https://support.apple.com/en-us/104967) |
| Backup mit Löschdatum | keine Entsprechung gefunden | – |

**HIG (direkt gelesen):**
- [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts): „Avoid displaying alerts for common, undoable actions, even when
  they’re destructive … when people take an uncommon destructive action that they can’t undo, it’s important to display an alert.“
- Immer eine Schaltfläche ‚Abbrechen‘, nie als Standardknopf; ein konkretes Verb statt ‚OK‘.
- Den roten Stil nur, wenn die Aktion nicht bewusst gewählt wurde.
- [Action Sheets](https://developer.apple.com/design/human-interface-guidelines/action-sheets): destruktive Wahl rot.

## 2. Was das für unsere Grundform heißt

- **Passt zu Apple:** 30 Tage; ‚Zuletzt gelöscht‘ am Ende der Seitenleiste bzw. Startliste, nur sichtbar, wenn nicht leer (wie Notizen);
  Löschen und Wiederherstellen gelten auf beiden Geräten; endgültig löschen nur mit Abfrage; Wiederherstellen an den alten Platz (wie Dateien).
- **Weicht ab bzw. ist offen:**
  1. **Abfrage beim normalen Löschen.** Heute fragt `deleteTrip` ‚‚Toskana‘ mit allen 42 Einträgen löschen? Das kann nicht rückgängig gemacht werden.‘
     und bietet ‚Erst Backup erstellen‘ an (RLB-125/L-4, L-5). Mit 30 Tagen ‚Zuletzt gelöscht‘ lässt sich Löschen rückgängig machen. Nach der HIG
     entfällt die Abfrage dann (wie Notizen).
  2. **Öffnen:** Unsere Grundform öffnet ein gelöschtes Reiselogbuch als Vorschau nur zum Lesen. Freeform öffnet gar nicht.
  3. **Restzeit:** ‚wird in N Tagen endgültig gelöscht‘ ist eine eigene Ergänzung, bei Apple nicht belegt.
- **Gesperrte Reiselogbücher (RLB-125):** Sie lassen sich heute nicht löschen (gesperrt nur ‚Entsperren‘). In ‚Zuletzt gelöscht‘ gibt es deshalb nie
  gesperrte Reiselogbücher, dafür ist keine eigene Regel nötig.
- **Technik (in dieser Sitzung im Code gelesen):** `createSync` führt gelöschte Reiselogbücher in `data.deleted`, nur mit `{ id, at, on }`, ohne
  Inhalt. Für ‚Zuletzt gelöscht‘ muss der Inhalt 30 Tage erhalten bleiben, auch im Backup und beim Abgleich. Das ist die AD-Bean `recentlydeleted`
  zusammen mit `createSync`, also **AppDesign** und damit auch ein Thema des neuen Frameworks.

## 3. Fragen

1. Abfrage beim normalen Löschen:
   - a) **(Empfohlen)** Sie entfällt: Die HIG verlangt keine Abfrage für Rückgängigmachbares, Notizen fragt auch nicht.
   - b) Sie bleibt kurz, mit neuem Wortlaut (z. B. ‚‚Toskana‘ löschen? Es bleibt 30 Tage unter ‚Zuletzt gelöscht‘.‘).
2. Ein gelöschtes Reiselogbuch antippen:
   - a) **(Empfohlen)** Vorschau nur zum Lesen mit Hinweis und ‚Wiederherstellen‘: So sieht man vor dem Wiederherstellen, welches es ist.
     Die Vorschau gibt es schon für gesperrte Reiselogbücher.
   - b) Wie Freeform nicht öffnen, nur Kontextmenü.
3. Restzeit in der Zeile zeigen (‚noch N Tage‘):
   - a) **(Empfohlen)** Ja: Sie zeigt, wann es endgültig weg ist.
   - b) Nein, wie bei Apple nicht belegt.
4. Wie weiter:
   - a) **(Empfohlen)** Jetzt das Muster (iPad quer, hell) mit Testfall-Liste, ohne AppDesign zu ändern. Den Bau der AD-Bean stimme ich mit dem Chat
     ‚AppDesign Framework Steuer-Bean Konzept‘ ab.
   - b) RLB-126 wartet, bis das Framework steht.

## 4. Entschieden (Nutzer 26.11.2026, Sitzung 0164, im Fenster)

- **RLB-126/J-2** (Frage 1): a – Beim normalen Löschen entfällt die Abfrage (HIG Alerts, wie Notizen). Ändert RLB-125/L-4 und L-5; der Wortlaut kommt mit dem Muster.
- **RLB-126/J-3** (Frage 2): a – Antippen öffnet eine Vorschau nur zum Lesen mit Hinweis und ‚Wiederherstellen‘.
- **RLB-126/J-4** (Frage 3): a – Die Zeile zeigt die Restzeit (‚noch N Tage‘), eine eigene Ergänzung.
- Frage 4 (wie weiter): Der Nutzer schreibt im Chat.
- **RLB-126/J-5:** Aufteilung zwischen AD-Bean und App wie in `0164 RLB-126 AD-Bean recentlydeleted Aufteilung.md`, `days` Standard 30 (Nutzer 26.11.2026, im Fenster).
- **RLB-126/J-6:** ‚Zuletzt gelöscht‘ wird allgemeine Regel, Wortlaut mit dem Muster.
- Frage 4: Muster jetzt (Nutzer im Chat: „Weiter mit Muster wie empfohlen“).
