# APD-113 Teil ‚Push und Kontextstand‘ – Wortlaut und Testfall-Liste

Stand 06.11.2026 · Sitzung Reiselogbuch 0083. Die Nummern gelten nur in dieser Datei (außerhalb APD-113/H-n).

**Anlass (Nutzer 06.11.2026):** Ein Push am iPad kommt nur über ein Auswahlfenster (2.3). W-17 (ein Fenster je Antwort) lässt nach einer schon
beantworteten Frage kein Fenster mehr zu – die nächste Frage rutscht in die nächste Antwort ohne Fenster und ohne Push (‚w‘). `PushNotification`
getestet: ‚Mobile push requested‘, kam am iPad nicht an. Die Push-Mitteilung zeigt den Fragetext (mit ‚(Kontext N)‘ am iPad bestätigt).
**Entscheidungen:** Prio 1; Lösung W-17 lockern und ‚(Kontext N)‘ in jeder Fensterfrage; Wortlaut 1 bis 5 bestätigt (Nutzer 06.11.2026, Sitzung 0083).

## Wortlaut (bestätigt – Zusammenarbeit 3.8.0, kommt mit dem Bau)

1. **Kasten ‚Jede Antwort‘, Punkt 9** – neu: ‚Vor **jedem Auswahlfenster**: der Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs`, abgelesen,
   und derselbe Wert als ‚(Kontext N)‘ am Ende **jeder Frage** im Fenster – die Push-Mitteilung am iPad zeigt den Fragetext (Nr. 21, 28). **W**‘
2. **0 Nr. 28** – neu: ‚Unmittelbar vor jedem Fenster steht im Chat der Kontextstand als Satz mit ‚Kontext N‘ aus `messung.mjs` – abgelesen, nie
   geschätzt –, im Fenster am Ende jeder Frage ‚(Kontext N)‘; die Zeitzeile selbst steht nur ganz am Ende.‘
3. **2.1** – neu: ‚**Fenster nacheinander, die Erklärung davor:** nie zwei Fenster direkt hintereinander; ein weiteres Fenster in derselben Antwort
   erst, wenn das vorige beantwortet ist, danach ein Werkzeug lief (z. B. Eintrag ins Backlog) und davor eine neue Ausgabe mit Erklärung und
   ‚Kontext N‘ steht – so endet jede Antwort mit einem Fenster und einem Push am iPad (2.3). Die Vorschau-Funktion kommt nicht an.‘ … ‚Mehrere
   Themen nacheinander: je Fenster eines (…).‘
4. **2.3** – neu: ‚… nur ein Auswahlfenster löst auf dem iPad eine Push-Nachricht aus (`PushNotification` kommt am iPad nicht an).‘
5. **2.8 ‚Vor jedem Auswahlfenster‘** – neu: ‚Er lehnt jede Frage ohne ‚(Kontext N)‘ im Fragetext ab, ebenso ein weiteres Fenster in derselben
   Antwort, solange seit dem vorigen Fenster kein Werkzeug lief.‘

Dazu: Regelwächter `werkzeug/regelwaechter.mjs` (W-16 für jede Frage, W-17 mit Werkzeug dazwischen, Stop-Hook: Zeitzeile nach dem letzten
Fenster), Prüfung `tests/regelwaechter.mjs`, Versionsgeschichte.

## Testfall-Liste (bestätigt, Nutzer 06.11.2026, Sitzung 0083, 0 Nr. 1)

| Nr. | Fall | Erwartet |
|---|---|---|
| H-1 | Fenster, eine Frage ohne ‚(Kontext N)‘ | abgelehnt (W-16), Hinweis nennt die Frage |
| H-2 | Fenster mit zwei Fragen, nur eine mit ‚(Kontext N)‘ | abgelehnt (W-16) |
| H-3 | ‚(Kontext N)‘ mit einem anderen Wert als der letzte von `messung.mjs` | abgelehnt (W-14/W-16, geschätzt) |
| H-4 | ‚(Kontext N)‘ in jeder Frage, Satz ‚Kontext N‘ davor, gleicher Wert | zugelassen |
| H-5 | zweites Fenster direkt nach dem ersten, kein Werkzeug dazwischen | abgelehnt (W-17) |
| H-6 | zweites Fenster, nachdem das erste beantwortet ist und ein Werkzeug lief, neue Ausgabe mit ‚Kontext N‘ davor | zugelassen |
| H-7 | Stop-Hook nach H-6: Zeitzeile nach dem letzten Fenster | Antwort fertig, keine Zurückweisung |
| H-8 | Bau-Frage (‚Soll ich Version …‘) wie bisher | weiter ‚(Kontext N)‘ im Fragetext verlangt (W-16) |
| H-9 | echte Antworten aus 0050, 0051 und 0083 (`tests/regelwaechter.mjs`) | unverändertes Ergebnis außer H-5/H-6; Gegenprobe rot gegen die alte Fassung (H-6 abgelehnt) |
