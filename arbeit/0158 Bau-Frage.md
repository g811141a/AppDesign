# Bau-Frage – AppDesign 4.70.0 / Reiselogbuch 3.58.3 (Sitzung 0158)

**Vorbereitet, noch nicht gebaut** (Zweige `vorbereitung-4.70.0` und `vorbereitung-3.58.3`, hochgeladen):

- **P-122/F-1** (App): nach der Meldung über der Vorschau sehen Teilen und PDF der Vorschau aus wie beim Öffnen; Teilen der Kopfzeile bleibt
  Quelle (`outputSource`, hold/release). Prüfung `ablauf-p120` Teil P-122/F-1 – rot gegen 3.58.2, grün in Chromium und WebKit.
- **P-122/F-2** (allgemein, R-3.10 ‚Hinweise mittig‘, Variante B): Ergebnisfenster, Erinnerung (auch über der Vorschau) und Backup-Kachel mittig;
  ‚gesperrt‘ bleibt. `design.css` `.ad-notice`, `.ad-buttons`, `.bhint` mittig; `hig.mjs` prüft R-3.10 nach jedem Schritt; Gegenprobe rot (6 Meldungen).
  AD-Bean: keine neue Eigenschaft (allgemeines CSS wirkt in `alert` und Fenster gleich – einfacher als im Vorschlag, Wirkung gleich).
- Geprüft in dieser Sitzung (Chromium): `ablauf-p120` (ganz), `ablauf-backup-kachel`, `ablauf-leer` grün.
- **Stufe:** `veroeffentlichen.mjs stufe` schlägt **voll** vor (AppDesign geändert) – rund 75–90 min.
- Testfälle P-123/0 bis P-123/3 im CHANGELOG 3.58.3.
- Neu im Backlog: **APD-148** AD-Bean `backup` (Prio 1, nach der Korrektur und APD-145).

**Kontext:** rund 286.000 – die Übergabe ist bei 300.000 fällig (0 Nr. 13). Ein voller Lauf in dieser Sitzung würde darüber gehen.
Empfehlung: übergeben, die Sitzung 0159 baut mit `… los --app reiselogbuch` (Stufe voll) und gibt den Bericht.
