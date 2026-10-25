# Übergabe an die nächste Sitzung

**Stand 25.10.2026, 04:15** · geschrieben in der Sitzung ‚Reiselogbuch 0044‘ (Ende – automatische Übergabe ab 300.000 Token, 0 Nr. 13;
Schritt abgeschlossen) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst**
(0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md` (mit den Chromium-Verweisen für Chrome 153 unter ‚Tests einrichten‘).

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.33.0** online (Fassung 4.35.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.35.0** online (feste Fassungen 4.14.0–4.35.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0045**; die danach 0046.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15 (in 0044 beides richtig, Sitzungsdatei `"effort":"high"`).
- **Sitzungsgröße 0044:** etwa 540.000 Token (Übergabe erst nach dem Veröffentlichen, 0 Nr. 13). **Sitzungskette:** 0044 lag auf
  Tiefe 8 von höchstens 8 – der Nutzer öffnet den neuen Chat in derselben Umgebung mit dem Starttext (2.5).
- **Offene Prüfpunkte:** **P-73** (3.33.0 / 4.35.0, Barrierefreiheit Teil 1 mit Fokus-Rahmen) – Prüfliste P-73/0–6 im CHANGELOG des
  Reiselogbuchs; die Rückmeldung des Nutzers steht noch aus → zu Beginn von 0045 erfragen (Auswahlfenster ‚P-73: Wie ist die Prüfung
  ausgegangen?‘).
- **‚0. Nächste Version‘:** AppDesign **A-79** (Uhrzeit in der ersten Zeile → Zusammenarbeit 2.20.0, gilt schon jetzt – siehe 2.);
  Reiselogbuch leer.
- **Backlog-Spitze:** nach P-73: A-43 Teil 2 + T-101 (Textgröße folgt dem Gerät, bereit); A-38 (Prio 1, Frameworks gemeinsam
  durchgehen) wartet auf den Nutzer; neu **A-78** (Prio 2, Nummernschema der Präfixe – erst Recherche, dann intensiver Austausch im
  Chat, erst danach Umbau) und A-77 (Prio 3, ‚Messung starten‘ verstecken, Variante a).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0044

- **Fokus-Rahmen geklärt (K9, Nutzer 24.10.2026, Variante a):** Textfelder nie mit Rahmen, nur der Cursor; gemessen: `:focus-visible`
  trifft bei Textfeldern auch beim Antippen zu (WebKit und Chromium) – der eigene Ring hängt an `html.tastatur` (Designrichtlinie 13).
- **AppDesign 4.35.0 / Reiselogbuch 3.33.0 gebaut und veröffentlicht** (A-43 Teil 1, T-100): R-1.8 VoiceOver (Namen, Rollen,
  Zustände, Fokus in Menü/Sprechblase/Fenster und zurück, `ansagen`), R-1.9 ‚Kontrast erhöhen‘ (zweite Farbtabelle, `--accent-fill`)
  und ‚Bewegung reduzieren‘ (Grenze, Bewegungswächter), R-4.7 Hardware-Tastatur, R-1.4 `inert`, R-5.3 `feldFehler`/`ersterFehler`,
  R-3.4 neu gefasst. Neue Prüfungen `checkFokus`, `checkKontrast`, `checkRuhig`, `ansage`, Bewegungswächter, `PRUEF_BEDIENUNG=beide`,
  `--gegenprobe bedienung` (21 Fälle, alle 42 Läufe rot mit genau ihrer Meldung); App-Prüfung `ablauf-bedienung.mjs`; `hig` und fünf
  Abläufe zusätzlich mit beiden Bedienungshilfen.
- **Folge, im Prüfpunkt:** öffnet sich in einem Fenster eine Sprechblase oder ein Menü, gibt ein Textfeld den Fokus ab (Tastatur zu).
- **A-77** ins Backlog (Frage des Nutzers: Zweck von ‚Messung starten‘ – Werkzeug für Claude, künftig versteckt).
- **Neue Ausgaberegel (A-79, Nutzer 25.10.2026, gilt ab sofort, Regeltext erst mit Zusammenarbeit 2.20.0):** jede Ausgabe darüber,
  was das System tut, beginnt in der ersten Zeile – ohne Leerzeile davor und danach – mit
  `<sub>Aktuelle Uhrzeit: hh:mm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Zeitabstand zu vorher: hh:mm)</sub>` (deutsche Zeit Europe/Berlin,
  `TZ=Europe/Berlin date +%H:%M`; Zeitabstand seit der letzten Uhrzeitausgabe, die erste der Sitzung ‚–‘). Die Zeitzeile am Ende
  (2.2) bleibt.
- **Präfixe (A-78):** der Nutzer fragte nach den Buchstaben vor den Nummern; Antwort gegeben (A-, T-, P-, E-; R-/G-/S- im Regelwerk;
  Fall-Nummern je Liste), keine Regel in 2.4 – Recherche und Austausch folgen in 0045.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. Lagebild (kurz), dann **Rückmeldung zu P-73** erfragen (alle Prüfpunkte P-73/0–6 einzeln im Chat, 2.3). ‚Nicht ok‘ → zuerst den
   Ablauf als feste Prüfung nachbauen (0 Nr. 1), dann Korrekturversion (0 Nr. 8).
2. **A-78 Präfixe:** Recherche zu Best-Practice-Nummernschemata (Jira-Schlüssel, ISO/IEC/IEEE 29148, ADR, Testfall-IDs, über mehrere
   Projekte stabil) als Datei in `arbeit/`, dann der intensive Austausch im Chat – noch kein Umbau.
3. Ist P-73 ok: **A-43 Teil 2 + T-101** (Textgröße, Fall-Liste `arbeit/A-43 Teil 2 Fall-Liste.md` ok) – ‚Soll ich Version … erstellen?‘
   (0 Nr. 21); gebaut wird erst nach einem Ja.

## 4. Danach

A-38 Frameworks (mit dem Nutzer) · A-72 iPad (Muster, Fall-Liste) · T-103 Prüfung tastatur-still · A-77 Messung verstecken ·
A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen) · A-32 ‚Problem melden‘ · A-40 Prüfungen für G-1 bis G-19 · A-44 bis A-60 ·
A-70 Mehrsprachfähigkeit · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0045 – Rückmeldung P-73, A-78 Präfixe (Recherche und Austausch)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (mit den Chromium-Verweisen unter ‚Tests einrichten‘). Gib kurz das Lagebild und frage dann die Rückmeldung zu P-73 ab, danach A-78 (Recherche Präfixe, dann Austausch) nach UEBERGABE.md 3.
```
