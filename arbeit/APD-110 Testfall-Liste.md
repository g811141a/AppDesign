# APD-110 – Link und Schritte im Chat vor dem Fenster: Testfall-Liste

Stand 02.11.2026 · Sitzung Reiselogbuch 0076 · Prio 1 (Nutzer 02.11.2026)
(Zusammenarbeit 0 Nr. 1: jeder Fall wird ein Testfall (automatisch) in `tests/regelwaechter.mjs`, rot gegen den veröffentlichten Stand)

## Anlass

Sitzung 0076, 17:14: Das Fenster zum Muster APD-30 enthielt den Link und die Schritte, im Chat standen nur eine Zusammenfassung,
danach (17:18) nur der Link – Bruch von 0 Nr. 11 und 2.3. Der Regelwächter prüft das bisher nicht, der Kasten ‚Jede Antwort‘ Punkt 4
nannte nur Usertests. Der Nutzer meldet das nicht zum ersten Mal (‚Schon wieder‘).

## Wortlaut (bestätigt Nutzer 02.11.2026, Sitzung 0076)

Kasten ‚Jede Antwort‘, Punkt 4 – alt:
> 4. Bericht oder Bitte, am Gerät zu prüfen: alle offenen Usertests vollständig im Chat (Nr. 11, 2.3).

neu:
> 4. Bericht oder Bitte, am Gerät zu prüfen (Muster, Versuch, Messung, Usertest): im Chat der vollständige Link und nummerierte
> Schritte mit ‚Erwartet: …‘ – unmittelbar vor dem Fenster, nie nur im Fenster, als Zusammenfassung oder als Verweis auf eine
> Datei –, dazu alle offenen Usertests vollständig (Nr. 11, 2.3). **W**

2.8 ‚Vor jedem Auswahlfenster‘, neuer Satz:
> Enthält das Fenster einen Link zum Prüfen am Gerät, lehnt er ab, wenn die Ausgabe davor nicht denselben Link und nummerierte
> Schritte mit ‚Erwartet: …‘ enthält.

## Umsetzung (Vorschlag)

Neue Prüfung **W-15** in `werkzeug/regelwaechter.mjs` (`pruefeLink`), beim Zeigen (Hook ‚fenster‘) und am Ende der Antwort (Hook
‚stop‘, falls der Fenster-Hook fehlte) – wie W-14: Ausgabe davor = letzte Ausgabe seit der vorigen Nachricht bzw. dem vorigen Fenster.
Link = jede `http(s)://…`-Adresse in Frage oder Beschreibung einer Möglichkeit; verglichen wird dekodiert (`%20` = Leerzeichen).
Schritte = mindestens zwei Zeilen, die mit ‚1.‘, ‚2.‘ … beginnen; dazu ‚Erwartet:‘ (groß oder klein).

## Testfälle (automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| L-1 | echte Antwort Sitzung 0076, 17:14: Fenster mit Link, Ausgabe davor ohne Link | abgelehnt, W-15 nennt den Link |
| L-2 | Ausgabe davor mit Link, ohne nummerierte Schritte | abgelehnt (‚Schritte fehlen‘) |
| L-3 | Link und Schritte, ohne ‚Erwartet:‘ | abgelehnt (‚Erwartet fehlt‘) |
| L-4 | im Chat ein anderer Link als im Fenster | abgelehnt |
| L-5 | Link, zwei Schritte, ‚Erwartet:‘ | durchgelassen |
| L-6 | echte Antwort Sitzung 0076, 17:19: Link und Schritte im Chat, Fenster ohne Link | durchgelassen (keine Prüfung) |
| L-7 | Fenster ohne Link (z. B. Bau-Frage, Rückmeldung ‚P-n: …‘) | keine Prüfung |
| L-8 | Link nur in der Beschreibung einer Möglichkeit | geprüft wie in der Frage |
| L-9 | Link im Chat mit Leerzeichen, im Fenster mit `%20` (und umgekehrt) | gleich, durchgelassen |
| L-10 | Ausgabe davor nicht wörtlich gespeichert (‚unsicher‘, 2.8 ‚Grenze‘) | durchgelassen – Selbstkontrolle |
| L-11 | Stop-Prüfung ohne Fenster-Hook, Fall L-1 | Zurückweisung mit W-15 und Anleitung zum Nachholen |
| L-12 | Gegenprobe `REGELWAECHTER_AUS=W-15` mit L-1 | durchgelassen – die Prüfung wird rot (`--gegenprobe`) |
| L-13 | Link in der Zeitzeile oder in Code (`…`) | zählt nicht als Link im Chat |

`doku.mjs` – `checkCollab`: Kasten Punkt 4 enthält ‚Link‘, ‚Erwartet‘ und **W**.

Kein Usertest am Gerät (wirkt nur in den Sitzungen); die erste Bitte, am Gerät zu prüfen, nach der Version zeigt es.
