# A-74 ‚Backup-Kachel nur, solange heute noch kein Backup erstellt wurde‘ (Reiselogbuch T-105) – Apple-Abgleich, Muster, Fall-Liste

**Stand 24.10.2026** · Sitzung ‚Reiselogbuch 0043‘ · Muster: `arbeit/A-74 Muster.html`
(https://g811141a.github.io/AppDesign/arbeit/A-74%20Muster.html, oben umschalten: A · B und Heute fällig · Nach dem Backup · Offline ·
Leere Liste) – im Muster geprüft in Chromium (iPad quer 1180 × 820, iPhone quer 844 × 390: letzte Kachel endet über Kachel bzw.
Zeile, keine Fehler)

**Vorgabe (Nutzer 24.10.2026, allgemeine Regel – Ja 24.10.2026):** die Backup-Kachel unten in Seitenleiste bzw. Startliste erscheint
nur noch, solange heute noch kein Backup erstellt wurde (gelb, blauer Knopf); danach verschwindet sie, statt weiß zu werden.
‚Backup erstellen‘ bleibt im Mehr-Menü.

## 1. Heute (15.19, R-9.1)

- Die Kachel steht immer da (bei mindestens einem Eintrag): gelb mit blauem Knopf, solange heute keines; danach weiß (`.ok`) mit
  normalem Knopf und ‚Letztes Backup erstellt am …‘.
- Leere Liste: keine Kachel – und damit auch **keine Offline-Zeile** (sie steckt in `backupTileHtml()`); das ist eine Lücke von heute.
- Kein Neuaufbau beim Tageswechsel: bleibt die App über Mitternacht offen, bleibt die Kachel weiß, bis die Liste neu gezeichnet wird.
- ‚Letztes Backup‘ gilt je Gerät; ‚Backup laden‘ und Abgleich ändern es nicht.

## 2. Apple-Abgleich (iOS 26)

| Was | So macht es Apple | Für uns |
|---|---|---|
| Aufforderung, bis es erledigt ist | Einstellungen: Hinweise wie ‚iPhone nicht gesichert‘ oder ‚Einrichtung abschließen‘ stehen oben nur, solange es etwas zu tun gibt, und verschwinden danach ohne Ersatz | Kachel nur, solange heute fällig (Variante A) |
| Wann zuletzt | Einstellungen → iCloud → iCloud-Backup: ‚Letztes erfolgreiches Backup …‘ – eine Ebene tiefer, nicht auf der Startseite | ‚Letztes Backup erstellt am …‘ grau im Mehr-Menü (wie heute) |
| Ruhige Statuszeile | Mail: unten klein und grau ‚Gerade aktualisiert‘ | Variante B: ‚Backup heute um … erstellt‘ |
| Tipp nach erledigter Handlung | TipKit: ein Tipp wird nach der Handlung ungültig (`invalidate(reason: .actionPerformed)`) und verschwindet | Kachel verschwindet direkt nach dem abgeschlossenen Teilen |

Quellen: [TipKit – Highlighting app features](https://developer.apple.com/documentation/tipkit/highlightingappfeatureswithtipkit),
[HIG – Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback),
[Hinweis ‚iPhone nicht gesichert‘](https://reincubate.com/support/ipbe/fix-iphone-not-backed-up/).

- **HIG-Checkliste (16):** Feedback ruhig und nur, wenn nötig; nichts verdeckt Inhalt ohne Grund; Ziele mindestens 44 pt (Knopf
  bleibt wie heute).
- **Katalog (17):** R-9.1 (neu gefasst), R-4.2 (Menü über der Kachel – ‚wenn sie da ist‘), R-1.5 / 15.20 (Offline-Zeile auch ohne
  Kachel), R-2.1 (Fuß liegt außerhalb des Rollbereichs, wie heute).
- **Abweichung:** keine; Apple hat keine tägliche Erinnerung, weil iCloud selbst sichert – im Web geht das nicht, daher die Kachel.

## 3. Muster (nur hell und quer, 0 Nr. 6)

| | heute fällig | nach dem Backup | offline (Backup heute erstellt) | leere Liste |
|---|---|---|---|---|
| **A** | gelbe Kachel wie heute | nichts – die Liste läuft bis an den unteren Rand | nur die Offline-Zeile | keine Kachel; Offline-Zeile, wenn offline |
| **B** | gelbe Kachel wie heute | graue Zeile ✓ ‚Backup heute um 14:32 erstellt‘ (13 pt, mittig, wie die Offline-Zeile) | beide Zeilen untereinander | wie A |

Ohne Kachel: kurzer, deckender Verlauf unter der Zeile (die Zeile steht nie über einer Kachel); die Liste hat unten nur so viel
Platz, dass der letzte Eintrag über der Zeile bzw. am Rand endet (statt 150 px für die Kachel).

**Empfehlung Claude: A** – genau die Vorgabe, wie die Einstellungen; die Uhrzeit steht im Mehr-Menü. B wiederholt dauerhaft eine
Information, die man selten braucht, und nimmt der Liste unten eine Zeile.

## 4. Zu klären (Fragen ans Muster)

1. **Variante:** A oder B?
2. **Mitternacht:** Bleibt die App über Mitternacht offen, kommt die Kachel von selbst wieder (Zeitgeber auf 0:00 und bei der
   Rückkehr in die App) – Empfehlung ja.
3. **Anderes Gerät / Abgleich / Backup laden:** zählt nicht – ‚Letztes Backup‘ bleibt je Gerät (R-9.1 wie heute), denn das Backup
   des iPads enthält nicht, was seitdem auf dem iPhone geändert wurde – Empfehlung so lassen.
4. **Suche offen:** Kachel wie heute auch während der Suche, wenn fällig – Empfehlung so lassen (nur die Bedingung ‚heute‘ ändert sich).
5. **Erscheinen und Verschwinden:** ohne Bewegung – nach dem Teilen ist die Kachel weg, wenn das Fenster ‚Backup ✅‘ schließt; die
   Liste rückt nicht sichtbar nach. Empfehlung so.

## 5. Fall-Liste (wird beim Bau eine Prüfung in `backup.mjs`, `hig.mjs`, `kontextmenue.mjs`, `offline.mjs`)

| Nr. | Fall | Erwartung | Muster |
|---|---|---|---|
| B1 | iPad quer, Seitenleiste fest, heute kein Backup | gelbe Kachel, blauer Knopf, ‚Letztes Backup erstellt am …‘ bzw. ‚Noch kein Backup erstellt.‘ | ja |
| B2 | Backup erstellen über die Kachel, Teilen abgeschlossen | Fenster ‚Backup‘ ✅; danach keine Kachel (A) bzw. graue Zeile (B); Fokus zurück auf ‚Mehr‘ (ellipsis), weil der Knopf weg ist | ja |
| B3 | Backup erstellen, Teilen abgebrochen | Fenster ⚠️, Kachel bleibt gelb | beim Bau |
| B4 | Backup erstellen über das Mehr-Menü | wie B2; im Mehr-Menü grau ‚Letztes Backup erstellt am <heute> um …‘ | beim Bau |
| B5 | Backup aus der Erinnerung nach einer Ausgabe (Reiselogbuch, `#backupNow`) | wie B2; die Erinnerung erscheint heute nicht mehr | beim Bau |
| B6 | App über Mitternacht offen (Uhr vorstellen) | um 0:00 erscheint die gelbe Kachel wieder, ohne Neuladen | beim Bau |
| B7 | App im Hintergrund über Mitternacht, dann zurück | Kachel ist sofort wieder da | beim Bau |
| B8 | Neustart am Folgetag | Kachel gelb mit dem gestrigen Zeitpunkt | ja (Heute fällig) |
| B9 | Backup auf dem anderen Gerät, dann Abgleich auf diesem | Kachel bleibt hier gelb (je Gerät) | beim Bau |
| B10 | Backup laden (Abgleichen oder Ersetzen) | ‚Letztes Backup‘ unverändert, Kachel wie vorher | beim Bau |
| B11 | Leere Liste | keine Kachel; ‚Backup erstellen‘ im Mehr-Menü grau | ja |
| B12 | Leere Liste und offline | Offline-Zeile unten (heute fehlt sie) | beim Bau |
| B13 | Ersten Eintrag anlegen (heute kein Backup) | gelbe Kachel erscheint | beim Bau |
| B14 | Letzten Eintrag löschen | Kachel und ggf. graue Zeile (B) verschwinden | beim Bau |
| B15 | Offline, heute schon Backup | nur Offline-Zeile (A) bzw. beide Zeilen (B); letzter Eintrag endet darüber | ja |
| B16 | Offline, heute kein Backup | Kachel, darunter Offline-Zeile (wie heute) | beim Bau |
| B17 | Ohne Kachel ans Ende rollen (viele Einträge) | letzter Eintrag ganz sichtbar, endet über Zeile bzw. Rand (mit Sicherheitsabstand unten) | ja |
| B18 | Wenige Einträge (passt ohne Rollen) | Liste steht oben, unten frei; kein Sprung beim Verschwinden der Kachel | ja |
| B19 | Langes Drücken auf den letzten Eintrag, Kachel da (R-4.2) | Menü ganz über der Kachel, Liste rückt | beim Bau |
| B20 | Langes Drücken auf den letzten Eintrag, keine Kachel | Menü ganz sichtbar über dem unteren Rand bzw. über der Offline-Zeile | beim Bau |
| B21 | Suche offen, Kachel fällig / nicht fällig | wie B1 bzw. B2; Treffer laufen bis unten | beim Bau |
| B22 | Meldung ‚Du bist offline‘ auf dem iPhone ohne Kachel | über der Offline-Zeile, verdeckt sie nicht | beim Bau |
| B23 | iPhone hoch und quer (Startliste) | wie B1, B2, B11, B15, B17 | quer ja |
| B24 | iPad hoch (Seitenleiste über dem Inhalt) | wie iPad quer | beim Bau |
| B25 | Drehen mit und ohne Kachel | Rollstand und oberster Eintrag bleiben (Grundregeln) | beim Bau |
| B26 | Dunkel | Kachel wie heute; graue Zeile (B) in `--muted` | beim Bau |
| B27 | VoiceOver | Kachel und Zeilen werden gelesen; ohne Kachel kein leerer Bereich im Fokus | beim Bau |
| B28 | Grundregeln nach jedem Schritt (`pruefe.mjs`) | nichts überlappt, nichts springt | beim Bau |

Geräte-Prüfliste: Teilen-Menü → ‚In Dateien sichern‘ und danach verschwindet die Kachel; über Mitternacht offen lassen (Kachel kommt
wieder); Gefühl: fehlt die Kachel am Ende des Tages?

## 6. Regeln (Entwurf)

- **R-9.1** neu: ‚Backup erstellen: Backup-Kachel nur, solange heute auf diesem Gerät noch keines erstellt wurde (gelb, blauer Knopf;
  kommt um Mitternacht wieder), Mehr-Menü mit ‚Letztes Backup …‘; Teilen-Menü; Dateiname; Fenster ✅/⚠️; zählt nur abgeschlossen, je
  Gerät‘. Prüfung `backup.mjs` und `hig.mjs` (Kachel genau dann da, wenn fällig und Liste nicht leer).
- **15.19** ‚Wo‘ und ‚Danach‘ entsprechend; `.ok` und der weiße Zustand entfallen.
- **15.20 / R-1.5:** Offline-Zeile unten auch ohne Kachel (eigener Fuß statt nur in `backupTileHtml()`).
- **R-4.2:** ‚ganz über der Backup-Kachel, wenn sie da ist‘ (der Code berücksichtigt das schon: `tr && tr.height`).
- Umsetzung in `ui.js` (`backupTileHtml` → Fuß mit Kachel nur wenn fällig, Offline-Zeile immer; Zeitgeber Mitternacht) und
  `design.css` (Platz unten in der Liste je nach Fuß); im Reiselogbuch (T-105) Fuß auch bei leerer Liste, Neuzeichnen um 0:00.
