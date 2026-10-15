# T-84 – iPhone startet in der Startliste: Apple-Abgleich und Fall-Liste

**Stand 15.10.2026** · Sitzung ‚Reiselogbuch 0006 – T-84 iPhone-Start‘ · nur Reiselogbuch, keine allgemeine Regel
(entschieden 14.10.2026)

## 1. Heute

Beim Laden ruft das Reiselogbuch `showTrip(pickStartTrip())` auf: laufende Reise, sonst zuletzt beendete, sonst nächste
geplante – auf iPad **und** iPhone, mit Sprung zum ersten offenen Tag. Am iPhone kommt man erst mit `chevron-left` in
die Startliste. In der Startliste ist das zuletzt geöffnete Reiselogbuch blau.

## 2. So macht es Apple

- **HIG ‚Launching‘:** Apple empfiehlt, nach einem Neustart den vorigen Zustand wiederherzustellen, damit man dort
  weitermacht, wo man aufgehört hat.
- **Notizen und Erinnerungen am iPhone:** Rückkehr aus dem Hintergrund → genau dort, wo man war. Nach einem echten
  Neustart zeigen sie meist wieder den letzten Ort; die Listen sind der Ausgangspunkt, von dem aus man alles erreicht.
- **Unsere Abweichung (bewusst, entschieden):** Am iPhone ist die Startliste der feste Ausgangspunkt nach einem Neustart
  – auf dem kleinen Bildschirm sieht man so zuerst alle Reiselogbücher und wählt selbst. Am iPad bleibt die laufende
  Reise offen, weil die Seitenleiste die Liste ohnehin zeigt.

**Betroffen – HIG-Checkliste (Abschnitt 16):** 4 Auswahl (markiert nur, solange der Inhalt offen ist → Frage 2),
8 Texte (leere Liste nennt den nächsten Schritt – unverändert).
**Regelkatalog (Abschnitt 17):** R-1.1 Startliste = Seitenleiste (unverändert) · R-7.1 höchstens ein Eintrag blau ·
R-8.1 Drehen ändert nur die Anordnung (iPhone quer bleibt, wo es ist) · R-1.5 Start ohne Netz · R-2.2 Titel und Anzahl.

## 3. Wichtiger Fund: ‚Neustart‘ ist in einer Web-App nicht eindeutig

Safari unterscheidet nicht, **warum** die Seite neu lädt. Als Neustart zählt deshalb jedes Neuladen:
- die App im App-Umschalter weggewischt und neu geöffnet (gewollt),
- **iOS hat die App im Hintergrund beendet** (Speicher), z. B. nach längerer Zeit in einer anderen App – dann landet
  man ebenfalls in der Startliste, obwohl man nur kurz weg war,
- neue Version geladen (Service Worker).

Bleibt die Seite im Speicher (kurz in einer anderen App, Bildschirm aus und an), ändert sich nichts – man ist dort, wo
man war. → **Frage 1**.

## 4. Fragen

1. **Wann Startliste?** a) bei **jedem** Neuladen (einfach, immer gleich) – *Empfehlung* · b) nur, wenn die letzte
   Nutzung länger her ist (z. B. 15 min); sonst wieder das zuletzt offene Reiselogbuch (näher an Apple, aber für den
   Nutzer nicht vorhersehbar, braucht einen gespeicherten Zeitpunkt).
2. **Blauer Eintrag in der Startliste beim Start?** a) **keiner** blau – nichts ist geöffnet (HIG 4, wie Notizen) –
   *Empfehlung* · b) die laufende Reise blau (Orientierung). Nach ‚Zurück‘ bleibt wie bisher das zuletzt geöffnete blau.
3. **iPad im schmalen Fenster** (Split View / Stage Manager unter 700 px → iPhone-Aufbau): a) entscheidet der
   **Aufbau** – im iPhone-Aufbau Startliste (gleicher Aufbau = gleiches Verhalten, R-1.1) – *Empfehlung* · b)
   entscheidet das **Gerät** – iPad öffnet immer das Reiselogbuch.

## 5. Fall-Liste (je Fall ein automatischer Test, hell und dunkel, Chromium und WebKit)

| Nr. | Gerät · Lage | Handlung · Daten | Erwartet |
|---|---|---|---|
| F-1 | iPhone hoch | Start, laufende Reise vorhanden | Startliste ‚Reiselogbücher‘ mit Anzahl, kein Reiselogbuch offen, Liste ganz oben, Backup-Kachel unten; blau nach Frage 2 |
| F-2 | iPhone quer | Start | wie F-1 |
| F-3 | iPhone hoch/quer | Start nur mit beendeten bzw. nur geplanten Reisen | wie F-1 |
| F-4 | iPhone | Start mit **leerer** Liste | wie bisher: ‚Noch kein Reiselogbuch angelegt.‘ und Fenster ‚Neues Reiselogbuch‘ |
| F-5 | iPhone | Start mit **vielen** Reisen (lange Liste) | Liste beginnt oben, Kopf steht fest, Kacheln laufen hinter der Backup-Kachel durch (R-7.1) |
| F-6 | iPhone | nach dem Start einen Eintrag antippen | Reiselogbuch öffnet, Sprung zum ersten offenen Tag (wie bisher) |
| F-7 | iPhone | danach `chevron-left` | Startliste, das eben geöffnete blau (wie bisher) |
| F-8 | iPhone | in der Startliste drehen (hoch ↔ quer) | bleibt Startliste, gleicher oberster Eintrag (R-8.1) |
| F-9 | iPhone | im Reiselogbuch drehen | bleibt im Reiselogbuch (R-8.1, wie bisher) |
| F-10 | iPhone | Rückkehr aus dem Hintergrund ohne Neuladen (`visibilitychange`, `pageshow` aus dem Zwischenspeicher) | bleibt, wo es war – Startliste **oder** Reiselogbuch |
| F-11 | iPhone | Neuladen, während ein Reiselogbuch offen ist (iOS hat die App beendet) | Startliste (Frage 1 a) |
| F-12 | iPhone | Start ohne Netz | Startliste, Meldung ‚Du bist offline‘ über der Backup-Kachel, graue Offline-Zeile (R-1.5) |
| F-13 | iPad quer | Start | **unverändert:** laufende Reise offen, Seitenleiste fest links, Sprung zum ersten offenen Tag |
| F-14 | iPad hoch | Start | **unverändert:** laufende Reise offen, Seitenleiste darübergelegt |
| F-15 | iPad schmales Fenster | Start | nach Frage 3 |
| F-16 | Wechsel iPhone-Aufbau → iPad-Aufbau | in der Startliste Fenster verbreitern | iPad-Aufbau mit Seitenleiste und der Startreise; zurück schmal → Startliste |
| F-17 | iPhone | nach dem Start ‚Backup laden‘ → ‚Abgleichen‘ | bleibt in der Startliste, Ergebnisfenster wie bisher |
| F-18 | iPhone | Reiselogbuch löschen | Startliste (wie bisher) |

Nach jedem Fall die Grundregeln (`pruefe.mjs`).

**Nur am Gerät (Prüfliste):** App im App-Umschalter wegwischen und neu öffnen → Startliste · kurz in eine andere App
und zurück → bleibt, wo es war · iPad quer und hoch neu öffnen → laufende Reise.

## 6. Umfang einer Version (nach den Antworten)

Nur Reiselogbuch **3.15.0** (AppDesign bleibt 4.15.1, Fassung unverändert): Start am iPhone in der Startliste,
Markierung nach Frage 2, Test `ablauf-iphone.mjs` (bisher erwartet er den Start im laufenden Reiselogbuch) und neue
Fälle F-1 bis F-18, Designrichtlinie Reiselogbuch Abschnitt 3a, `PROMPT.md`, `CHANGELOG.md`, `BACKLOG.md`. Kein Muster
nötig – die Startliste sieht aus wie bisher.
