# Übergabe an die nächste Sitzung

**Stand 24.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0040‘ (Ende, automatische Übergabe ab 300.000 Token, 0 Nr. 13) –
Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung steht in
der AppDesign-`CLAUDE.md` (mit den Chromium-Verweisen für Chrome 153 unter ‚Tests einrichten‘).

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.30.2** online (Fassung 4.32.2) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.32.2** online (feste Fassungen 4.14.0–4.32.2) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0041**; die danach 0042.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15 (in 0040 beides richtig, Sitzungsdatei `"effort":"high"`).
- **Sitzungsgröße 0040:** etwa 280.000 Token (Übergabe fällig).
- **Offene Prüfpunkte:** **P-70** (Reiselogbuch 3.30.2, Prüfliste oben im CHANGELOG des Reiselogbuchs) – **Rückmeldung des Nutzers
  fehlt noch**: zu Beginn von 0041 die Prüfliste vollständig im Chat zeigen und mit dem Auswahlfenster nach der Rückmeldung fragen (0 Nr. 11).
- **‚0. Nächste Version‘:** leer.
- **Backlog neu (Prio 1, offen):** AppDesign **A-75** + Reiselogbuch **T-106** – Auswahl-Kapsel (Reisemittel) erkennbar wischbar,
  **Muster A + B** gewählt (Anschnitt wie Apple ‚Peek‘, Rollbalken kurz zeigen wie `flashScrollIndicators`); AppDesign **A-74** +
  Reiselogbuch **T-105** – Backup-Kachel nur, solange heute noch kein Backup erstellt wurde (allgemeine Regel, Ja zur Regel 24.10.2026;
  Muster und Fall-Liste fehlen).
- **Bereit danach:** A-43 Teil 1 + T-100 (VoiceOver, Tastatur, Kontrast, Bewegung), dann A-43 Teil 2 + T-101 (Textgröße).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0040

- **Gebaut und veröffentlicht: AppDesign 4.32.2 / Reiselogbuch 3.30.2** (Ja vom 24.10.2026): **A-73 + T-104** – ein Zug im Blatt, der
  zuerst nach oben (oder waagerecht) geht, bleibt bei offener Tastatur beobachtet (`blattZug.nurTastatur`); 8 px unter dem höchsten Punkt
  schließt die Tastatur. Neu `fokusRand(f)` (ui.js) bzw. `RING` (pruefe.mjs): Abstand über dem Feld mit Fokus für Umrandung (Safari 5 px)
  und Schatten (25 px) – quer stand das Feld bisher direkt am Rand. `checkSheet` B19 ‚erst nach oben‘ als Zeigerereignisse (mit der Maus
  nahm Chromium dem Feld schon beim Drücken den Fokus – B19 war deshalb immer grün), B10 Abstand ≥ `RING`; rot gegen 4.32.1 (15 Meldungen).
- **Voller Lauf:** viermal an Lastfehlern abgebrochen (einzeln grün): behoben `ablauf-abspielen` (Gesten-Messung ‚Blatt Zug am Rand‘
  ausgelassen – nicht nachspielbar) und `oeffnen-position` D2 (wartet mit `navFertig`, bis die Seitenleiste ausgeglitten ist); zweimal
  WebKit unter Volllast (Netzprozess abgestürzt, Zeitüberschreitung). Mit `alle.mjs --alle --jobs 2` alle 70 grün, danach `los` grün.
  Hinweis für später: unter 4 Jobs schwankt WebKit; ein weiterer Kandidat fürs Backlog ist `--jobs` im Veröffentlichungs-Skript.
- **Aufgefallen, noch nicht gefragt:** Safari zeichnet um Textfelder mit Fokus eine blaue Umrandung (`outline: auto 5px`), R-3.4 sagt
  ‚kein Fokus-Rahmen‘ (Designrichtlinie 1 und 15.2) – in 0041 fragen, ob das ins Backlog soll (Empfehlung Claude: Prio 2, bei A-43 Teil 1).

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. Lagebild, dann **Prüfliste P-70 vollständig im Chat** und Auswahlfenster zur Rückmeldung (0 Nr. 11, 22); ‚nicht ok‘ → zuerst
   Korrektur (0 Nr. 1, 8).
2. Frage zum Fokus-Rahmen (Abschnitt 2, letzter Punkt): ‚Ins Backlog übernehmen?‘ mit Priorität.
3. Danach **Muster A-75** (Varianten A und B nebeneinander, iPhone hell quer zuerst, 0 Nr. 6; Apple-Abgleich steht in A-75) mit
   Fall-Liste; bauen erst nach Ja (0 Nr. 21).

## 4. Danach

A-74 / T-105 Muster und Fall-Liste · A-43 Teil 1 + T-100 bauen · A-43 Teil 2 + T-101 bauen · A-72 iPad (Muster, Fall-Liste) ·
T-103 Prüfung tastatur-still · A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen) · A-32 ‚Problem melden‘ · A-40 Prüfungen für
G-1 bis G-19 · A-44 bis A-60 · A-70 Mehrsprachfähigkeit · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0041 – Rückmeldung P-70, dann Muster A-75 (Auswahl-Kapsel erkennbar wischbar)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (mit den Chromium-Verweisen unter ‚Tests einrichten‘). Gib das Lagebild, zeig die Prüfliste P-70 und frag nach der Rückmeldung; dann weiter nach UEBERGABE.md 3.
```
