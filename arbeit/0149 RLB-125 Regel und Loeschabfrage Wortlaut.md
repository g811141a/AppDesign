# RLB-125 – Regel ‚nicht verfügbare Menüpunkte‘ und Wortlaut der Lösch-Abfrage (L-4, L-5)

Stand 21.11.2026 · Sitzung 0149 · nur Wortlaut. Eingetragen und gebaut wird mit RLB-125 (Bau-Frage folgt).

## a) Neue allgemeine Regel (0 Nr. 4, 0 Nr. 29)

**Belegt:** Apple HIG ‚Menus‘ (Sitzung 0148): „Show people when a menu item is unavailable.“
**Heute:** Keine Regel. `openMenu` in `ui.js` kann Einträge schon blass zeigen (`disabled`, graue Unterzeile `sub`). Das Muster RLB-125 nutzt das für ‚Reiselogbuch
einstellen‘ und ‚Reiselogbuch löschen‘ mit ‚Gesperrt‘.

**Alt:** – (keine Regel)

**Neu – Katalog R-4.14** (Designrichtlinie 17, Abschnitt 4):

> | R-4.14 | **Nicht verfügbare Menüpunkte:** Ein Menüpunkt, der gerade nicht ausführbar ist, bleibt an seiner Stelle sichtbar: blass, nicht antippbar (`disabled`), mit dem
> Grund als grauer Unterzeile (z. B. ‚Gesperrt‘). Er wird nicht weggelassen. Wischaktionen zeigen nur ausführbare Aktionen. | pruefseite.mjs – Teil `menue` (neuer Fall:
> blasser Eintrag mit `disabled` und Unterzeile, Antippen und Eingabetaste lösen nichts aus; Gegenprobe ohne `disabled` → rot) | – | 15.6 |

- AD-Bean: keine neue, `openMenu` kann es schon (`disabled`, `sub`). Die Prüfung kommt in den Teil `menue` der Prüfseite.

## b) Lösch-Abfrage mit Anzahl und Backup (RLB-125/L-4, L-5 – entschieden 18.11.2026)

**Alt** (Reiselogbuch 3.57.11, `deleteTrip`), Sprechblase an der Schaltfläche:

> ‚Toskana‘ mit allen Einträgen löschen? Das kann nicht rückgängig gemacht werden. Tipp: Vorher ein Backup erstellen.
> Schaltflächen: Abbrechen · **Reiselogbuch löschen** (rot)

**Neu:**

> ‚Toskana‘ mit allen 42 Einträgen löschen? Das kann nicht rückgängig gemacht werden.
> Schaltflächen: Abbrechen · Erst Backup erstellen · **Reiselogbuch löschen** (rot)

- Anzahl = erfasste Tage: ‚mit 1 Eintrag‘ · ‚mit allen 42 Einträgen‘ · bei 0 ‚‚Toskana‘ ohne Einträge löschen? …‘ (dann ohne ‚Erst Backup erstellen‘).
- **‚Erst Backup erstellen‘** startet das Backup wie in der Seitenleiste (Teilen-Menü). Danach kommt dieselbe Sprechblase wieder, ohne die Schaltfläche ‚Erst Backup
  erstellen‘, wenn das Backup gesichert wurde.
- Frage: Steht ‚Erst Backup erstellen‘ **nur, wenn heute noch kein Backup** erstellt wurde (wie der Hinweis in der Seitenleiste), oder **immer**?
  - **Empfohlen: nur ohne Backup heute.** Dann stehen in der Sprechblase meist nur zwei Schaltflächen, wie bei Apple. Die Backup-Kachel folgt derselben Regel.

## Freigabe (Nutzer 21.11.2026, Sitzung 0149, im Fenster)

- R-4.14: **Ja**
- Lösch-Abfrage (L-4, L-5): **Ja**
- ‚Erst Backup erstellen‘: **nur ohne Backup heute**
