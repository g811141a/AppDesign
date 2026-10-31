# APD-99 – Kontextstand vor jedem Auswahlfenster

Frage des Nutzers (31.10.2026, Sitzung 0060): „Warum gibst du mir vor einer Rückfrage die Kontextgröße nicht aus?“ – bisher nur vor
der Bau-Frage (0 Nr. 21, Kasten 9). Wortlaut bestätigt (Nutzer 31.10.2026), Priorität 1; wird mit der nächsten Version der
Zusammenarbeit eingetragen. Bis dahin hält Claude ihn schon ein (Selbstkontrolle).

## Bestätigter Wortlaut (Zusammenarbeit allgemein)

1. **Kasten ‚Jede Antwort‘ Punkt 9** – alt: „Vor der Frage ‚Soll ich Version … erstellen?‘: der Kontextstand als Satz mit
   ‚Kontext N‘ aus `messung.mjs`, abgelesen (Nr. 21).“ – neu: „Vor **jedem Auswahlfenster**: der Kontextstand als Satz mit
   ‚Kontext N‘ aus `messung.mjs`, abgelesen (Nr. 28). **W**“
2. **0 Nr. 28** – angehängt: „Unmittelbar vor jedem Fenster steht im Chat der Kontextstand als Satz mit ‚Kontext N‘ aus
   `messung.mjs` – abgelesen, nie geschätzt; die Zeitzeile selbst steht nur ganz am Ende.“
3. **0 Nr. 21** – der Satz „Unmittelbar davor steht im Chat der aktuelle Kontextstand …“ wird zu „(Kontextstand davor: Nr. 28)“.

## Zu tun

- Regelwächter (`werkzeug/regelwaechter.mjs`, PreToolUse vor dem Auswahlfenster): lehnt ein Fenster ab, wenn davor in der Antwort
  kein Satz mit ‚Kontext N‘ steht; Prüfung in `tests/regelwaechter.mjs` mit Gegenprobe.
- Testfall-Liste vor dem Bau (0 Nr. 1).
