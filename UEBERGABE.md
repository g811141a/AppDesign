# Übergabe an die nächste Sitzung

**Stand 23.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0034‘ (Ende, automatische Übergabe bei etwa 300.000 Token) – Aufbau
nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die Arbeitsumgebung
steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.29.0** online (Fassung 4.31.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.31.0** online | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0035**; die danach 0036.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15 (in 0034 beides richtig).
- **Offene Prüfpunkte:** keine.
- **‚0. Nächste Version‘ (2 Themen bereit, Nutzer sagte zum Bau ‚Nein‘):** AppDesign **A-61/2** + Reiselogbuch **T-99** (Blatt auf dem
  iPhone, Variante A, allgemeine Regel R-4.6 mit `checkSheet`) und AppDesign **A-69** + Reiselogbuch **T-98** (Startposition) –
  als AppDesign 4.32.0 / Reiselogbuch 3.30.0. Damit ist die Version voll (höchstens 2 Themen, 0 Nr. 8).
- **In Arbeit:** **A-43 Barrierefreiheit Teil 1** – Fall-Liste Fall für Fall mit dem Nutzer durchgehen (siehe 3).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0034

- **A-61 Teil 2 Blatt abgeschlossen:** Rückmeldung 1 zum korrigierten Muster: A ok bis auf 3, B ok. A 3 (Tag erfassen mit Änderung,
  auf einem Feld nach unten ziehen → schloss ohne Rückfrage) als Prüfung nachgebaut (rot), behoben (jedes Fenster mit Änderungen
  fragt beim Ziehen wie x, R-4.4), am Gerät **ok**. **Variante A gewählt, als allgemeine Regel: Ja** → A-61/2 und T-99 in ‚0.‘
  (Fall-Liste `arbeit/A-61 Teil 2 Fall-Liste.md` Abschnitt 6).
- **Version 4.32.0 / 3.30.0 gefragt: Nein** (vorerst nicht bauen).
- **A-43 Barrierefreiheit:** Klärung mit Apple-Abgleich `arbeit/A-43 Klärung.md`. **Entschieden:** zwei Teile – **Teil 1**
  (VoiceOver, Tastatur, Kontrast, Bewegung) ohne Muster, nur Fall-Liste; **Teil 2** Textgröße **nach der Einstellung des Geräts**
  mit Muster; Tastatur **nur Grundlagen** (keine Kurzbefehle); ‚Kontrast erhöhen‘ mit **zweiter Farbtabelle**; ‚Automatisch
  gespeichert‘ **nicht ansagen**; **keine VoiceOver-Prüfung am Gerät** (nur automatisch).
- **Fall-Liste Teil 1** `arbeit/A-43 Teil 1 Fall-Liste.md`: der Nutzer sagte zuerst ‚nicht ok‘ und wünschte, **jeden Fall einzeln**
  durchzugehen. Ergebnisse stehen dort in **Abschnitt 4** (maßgeblich; die Tabellen in 1 und 2 sind der erste Vorschlag):
  V1–V14, K1–K8, H1–H5, M1–M6 übernommen (V4 nach erstem ‚Nein‘ doch übernommen; H3 mit `--accent-fill` #0060DF dunkel;
  M2 springen; M3 ohne Umbau).
- **Gelernt:** (1) Ein Muster nimmt das Verhalten der App an (hier: x fragt auch beim Erfassen) – Annahmen in der Fall-Liste gegen
  die App prüfen, bevor sie zum erwarteten Verhalten werden. (2) Bei unklarer Kurzantwort (‚X‘) nachfragen (0 Nr. 17).

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **A-43 Teil 1 weiter Fall für Fall** – genau im Format des Nutzers (Wunsch 0034): je Antwort **ein** Fall – Überschrift ‚Fall X von
   36: …‘, **Worum es geht**, dann **Aktuell** (im Code nachgesehen), **Apple-Standard**, **Meine Idee**, **Meine Empfehlung**, dann
   das Auswahlfenster (Übernehmen (Empfohlen) · Alternative · Nicht übernehmen · Ich schreibe im Chat); Antwort in Abschnitt 4 der
   Fall-Liste eintragen, committen, Zeitzeile, ‚Schreib **w** …‘. Offen: **M7** (`checkRuhig` findet jede Bewegung ohne
   Abfrage), **P1** (Grundregeln zusätzlich mit ‚Kontrast erhöhen‘ und ‚Bewegung reduzieren‘), **P2** (Gegenprobe).
2. Danach Abschnitte 1 und 2 der Fall-Liste an Abschnitt 4 angleichen (Regeln R-1.4 erw., R-1.8, R-1.9, R-4.7, R-5.3 erw.; Prüfliste
   am Gerät: Tastatur, Kontrast, Bewegung – ohne VoiceOver) und fragen ‚Fall-Liste Teil 1 ok?‘ → A-43/1 bereit; da ‚0.‘ voll ist,
   kommt es in die Version nach 4.32.0.
3. Dann **A-43 Teil 2 Textgröße**: Apple-Abgleich, Muster (Dynamic Type über `-apple-system-body`, alle Größen relativ, Leisten
   begrenzt), Fall-Liste.

## 4. Danach

A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen; Kollision Wegwischen hoch klären) · A-32 ‚Problem melden‘ · A-40 Prüfungen
für G-1 bis G-19 · A-44 bis A-60 · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0035 – A-43 Barrierefreiheit Teil 1: Fall-Liste weiter Fall für Fall (ab M7)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild und mach mit A-43 Teil 1 weiter: Fall M7 aus arbeit/A-43 Teil 1 Fall-Liste.md im Format von UEBERGABE.md Abschnitt 3 (Worum es geht, Aktuell, Apple-Standard, Meine Idee, Meine Empfehlung, Auswahlfenster), je Antwort ein Fall.
```
